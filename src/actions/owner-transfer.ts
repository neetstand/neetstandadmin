
"use server";

import { createAdminClient } from "@/utils/supabase/admin";

import { createClient } from "@/utils/supabase/server";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Helper to check hierarchy
async function verifyOwnerAccess() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const profile = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);
    if (!profile.length || profile[0].role !== "owner") {
        throw new Error("Only the current Owner can perform this action.");
    }
    return user.id;
}

export async function initiateTransfer(newOwnerEmail: string) {
    const currentOwnerId = await verifyOwnerAccess();

    // 1. Check if potential new owner exists in profiles
    // We allow transfer to existing users or new emails (invited). 
    // If user exists, we verify they represent a valid person.

    // For simplicity: We generate a transfer token.
    // In a production system, store this token in a 'transfer_requests' table with expiration.
    // Here, we'll embed it in the link as a signed JWT or simple obscure token if valid for short time.
    // BETTER: Use Supabase admin.inviteUserByEmail but customized?
    // OR just send a custom email with a link to a public page: /owner-transfer/accept?token=...

    // Let's assume we store the token in a new table or just use a secure random string and store in Redis/DB.
    // Since we don't have a 'transfer_requests' table yet, let's create a temporary solution:
    // We will use the `auth.users.user_metadata` of the CURRENT OWNER to store pending transfer info? No, insecure.
    // Let's create a transfer token by signing data.

    // Actually, we should probably add a table for this or use `settings` table if single active transfer?
    // Let's keep it simple: We will use a special "transfer_token" setting in our existing `settings` table 
    // (value: { email: string, token: string, expires: number }).

    // TODO: Ideally create a `transfer_requests` table. For now, let's just send the link and verify on acceptance.
    // Wait, verification needs server-side state.

    // PLAN: 
    // 1. Store pending transfer in a new `settings` key: "pending_owner_transfer"
    // 2. Value: JSON string { "target_email": "...", "token": "...", "expires": ... }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const payload = JSON.stringify({
        target_email: newOwnerEmail,
        token: token,
        expires: expiresAt,
        from_owner_id: currentOwnerId
    });

    // We need to import settings table.
    // Ensuring we don't break existing codebase, checked `settings` usage in layout.
    // We'll upsert into settings.
    const { settings } = await import("@drizzle/schema/tables/settings");

    await db.insert(settings).values({
        variable: "pending_owner_transfer",
        value: payload
    }).onConflictDoUpdate({
        target: settings.variable,
        set: { value: payload }
    });

    // 3. Send Email
    const link = `${process.env.ADMIN_URL}/owner/transfer/accept?token=${token}`;
    const adminAuthClient = createAdminClient();
    const { error: emailError } = await adminAuthClient.rpc("send_email", {
        to_email: newOwnerEmail,
        from_email: "no-reply@neetstand.com",
        subject: "Action Required: Accept Ownership Transfer",
        html_body: `
            <h1>Ownership Transfer Request</h1>
            <p>The current owner has initiated a transfer of ownership to you.</p>
            <p>Please click the button below to accept and become the new System Owner.</p>
            <a href="${link}" style="padding: 10px 20px; background-color: #0f172a; color: white; text-decoration: none; border-radius: 5px;">Accept Ownership</a>
            <p><strong>Security Warning:</strong> This will give you full control over the system. Ensure you trust the sender.</p>
            <p>Link expires in 24 hours.</p>
        `
    });

    if (emailError) throw new Error("Failed to send transfer email.");

    return { success: true };
}

export async function validateTransferToken(token: string) {
    const { settings } = await import("@drizzle/schema/tables/settings");
    const record = await db.select().from(settings).where(eq(settings.variable, "pending_owner_transfer")).limit(1);

    if (!record.length || !record[0].value) {
        return { valid: false, error: "No pending transfer found." };
    }

    const data = JSON.parse(record[0].value);

    if (data.token !== token) {
        return { valid: false, error: "Invalid token." };
    }

    if (Date.now() > data.expires) {
        return { valid: false, error: "Token expired." };
    }

    return { valid: true, data };
}

export async function completeTransfer(token: string, newOwnerEmail: string) {
    // 1. Validate Token
    const validation = await validateTransferToken(token);
    if (!validation.valid) throw new Error(validation.error);

    const { target_email, from_owner_id } = validation.data;

    // Verify email matches (security check)
    // The user accepting MUST differ from the old owner? Not necessarily, but logically yes.
    // The user accepting needs to be logged in? 
    // Scenario A: New owner is already a user.
    // Scenario B: New owner is new.

    // We require the user to be logged in to accept?
    // Or we create the user if not exists?
    // Let's enforce: The user MUST be logged in as the `target_email`.

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Please log in with the new owner email to accept.");
    if (user.email !== target_email) throw new Error("Logged in email does not match transfer target.");

    const newOwnerId = user.id;

    // 2. Perform Swap
    // Start Transaction (Drizzle doesn't support convenient transactions with this client setup easily, so we execute sequentially carefully)

    // A. Demote Old Owner -> Superadmin
    await db.update(profiles)
        .set({ role: "superadmin" })
        .where(eq(profiles.id, from_owner_id));

    // B. Promote New Owner -> Owner
    await db.update(profiles)
        .set({ role: "owner", isActive: true }) // Ensure active
        .where(eq(profiles.id, newOwnerId));

    // C. Update Metadata in Auth for both (optional but good for syncing)
    const adminAuthClient = createAdminClient();
    await adminAuthClient.auth.admin.updateUserById(from_owner_id, {
        user_metadata: { role: 'superadmin' }
    });
    await adminAuthClient.auth.admin.updateUserById(newOwnerId, {
        user_metadata: { role: 'owner' }
    });

    // 3. Clear pending transfer
    const { settings } = await import("@drizzle/schema/tables/settings");
    await db.delete(settings).where(eq(settings.variable, "pending_owner_transfer"));

    return { success: true };
}
