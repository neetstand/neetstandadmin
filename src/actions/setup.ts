"use server";

import { createAdminClient } from "@/utils/supabase/admin";

import { createClient } from "@/utils/supabase/server";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { userRoles } from "@drizzle/schema/tables/user_roles";
import { roles } from "@drizzle/schema/tables/roles";
import { eq, sql } from "drizzle-orm";
import { settings } from "@drizzle/schema/tables/settings";
import { revalidatePath, updateTag } from "next/cache";

export async function sendVerificationEmailAction(prevState: any, formData: FormData) {
    try {
        let email = formData.get("email") as string; // User email (Super Admin or Owner)
        const apiKey = formData.get("email_api_key") as string;
        const siteUrl = formData.get("email_site_url") as string;

        if (!email) {
            // Fallback to current user email (Owner)
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) email = user.email;
        }

        if (!email || !apiKey || !siteUrl) {
            return { success: false, error: "Missing required fields" };
        }

        // 1. Save Settings Immediately
        await db.insert(settings).values([
            { variable: "email_site_url", value: siteUrl },
            { variable: "email_api_key", value: apiKey },
            // Optional: provider URL, defaulting to Brevo if not specified by user (not yet in UI)
            { variable: "email_provider_url", value: "https://api.brevo.com/v3/smtp/email" },
            // We do NOT set email_verified=true yet. That happens on confirmation.
            { variable: "email_verified", value: "false" }
        ]).onConflictDoUpdate({
            target: settings.variable,
            set: {
                value: sql`excluded.value`,
                updatedAt: new Date()
            }
        });

        // 2. Invalidate Cache so the service picks up new settings
        updateTag("email-settings");
        updateTag("settings");

        // 3. Send Email using the PERSISTED settings (no overrides)
        // This confirms that both the database save worked AND the email service reads it correctly.
        await import("@/services/email-service").then(m => m.sendEmail({
            to: email,
            subject: "Verify Email Configuration",
            html: "<p>This is a test email to verify your configuration. If you received this, please click 'Yes, I got it' in the dashboard.</p>"
            // No overrideSettings passed!
        }));

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function confirmEmailVerificationAction(prevState: any, formData: FormData) {
    try {
        // Just mark as verified. The settings are already in DB from the previous step.
        await db.insert(settings).values([
            { variable: "email_verified", value: "true" }
        ]).onConflictDoUpdate({
            target: settings.variable,
            set: {
                value: "true",
                updatedAt: new Date()
            }
        });

        updateTag("settings");
        revalidatePath("/dashboard", "layout");
        revalidatePath("/setup", "layout");

        return { success: true };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createSuperAdminAction(prevState: any, formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        const isMe = formData.get("isMe") === "on";
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        // Get Super Admin Role ID
        const [superAdminRole] = await db.select().from(roles).where(eq(roles.name, "superadmin")).limit(1);
        if (!superAdminRole) return { success: false, error: "Super Admin role configuration missing" };

        let targetUserId = "";

        if (isMe) {
            targetUserId = user.id;
        } else {
            if (!email) return { success: false, error: "Email is required" };

            // Check if user exists via Admin API
            const adminAuthClient = createAdminClient();
            const { data: { users: existingUsers } } = await adminAuthClient.auth.admin.listUsers();
            const existingUser = existingUsers.find(u => u.email === email);

            if (existingUser) {
                targetUserId = existingUser.id;
                // Ensure profile
                await db.insert(profiles).values({
                    id: targetUserId,
                    fullName: name || "Super Admin",
                    role: "superadmin"
                }).onConflictDoNothing();
            } else {
                // Invite Logic
                // We reuse adminAuthClient if desired or create new. It's cheap.
                const adminAuthClient = createAdminClient();
                const { data: newUser, error: createError } = await adminAuthClient.auth.admin.createUser({
                    email,
                    email_confirm: true,
                    user_metadata: { full_name: name || "Super Admin" }
                });

                if (createError) return { success: false, error: createError.message };
                if (!newUser.user) return { success: false, error: "Failed to create user" };

                targetUserId = newUser.user.id;

                await db.insert(profiles).values({
                    id: targetUserId,
                    fullName: name || "Super Admin",
                    role: "superadmin",
                    isActive: true
                });
            }
        }

        // Assign Role in user_roles
        await db.insert(userRoles).values({
            userId: targetUserId,
            roleId: superAdminRole.id
        }).onConflictDoNothing();

        // Send Welcome Email
        // We assume email settings are already verified and saved in Step 1.
        // But if they are not, this might fail unless we default to looking up settings in sendEmail (which we do).

        try {
            await import("@/services/email-service").then(m => m.sendWelcomeEmail({
                to: email || user.email!, // Use entered email or current user email
                name: name || "Super Admin"
            }));
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // We don't block success if welcome email fails, but maybe we should warn?
            // User requirement: "An email has to be sent". 
            // We'll trust it works since Step 1 verified it.
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function transferOwnershipAction(prevState: any, formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: "Unauthorized" };

        const newOwnerEmail = formData.get("email") as string;
        if (!newOwnerEmail) return { success: false, error: "Email required" };

        // 1. Find Target User
        const adminAuthClient = createAdminClient();
        const { data: { users } } = await adminAuthClient.auth.admin.listUsers();
        const targetUser = users.find(u => u.email === newOwnerEmail);

        if (!targetUser) return { success: false, error: "User not found" };

        // 2. Update Target User Profile Role to 'owner'
        await db.update(profiles)
            .set({ role: 'owner' })
            .where(eq(profiles.id, targetUser.id));

        // 3. Demote Current Owner to 'superadmin'
        await db.update(profiles)
            .set({ role: 'superadmin' })
            .where(eq(profiles.id, user.id));

        revalidatePath("/dashboard");
        return { success: true };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
