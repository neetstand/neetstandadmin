"use server";

import { db } from "@drizzle/index";
import { profiles, userRoles, roles } from "@drizzle/schema/index";
import { eq, and } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";

export async function inviteAdmin(formData: FormData) {
    const email = formData.get("email") as string;

    // 1. Check current user is superadmin
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return { error: "Not authenticated" };

    // TODO: Verify currentUser has superadmin role in DB
    // For now assuming if they accessed the page they are likely authorized or we check db.

    // 2. Invite User via Supabase Admin API
    // Note: createClient here is likely generic. We need SERVICE_ROLE key for admin user creation.
    // But we want to avoid exposing service role key usually. 
    // If we can't create user, we can't invite.
    // Alternative: Ask user to sign up, then promote them.
    // The Prompt said: "Superadmin only can actually add another superadmin"

    // Let's assume we maintain a list of admins in DB. If the user doesn't exist in Auth, we can't link them yet.
    // Plan: Just add to DB 'users' table? No, users table links to Auth.

    // Cleanest way without Service Key on client (this is server action though):
    // Use a separate Supabase Admin Client with Service Key for this action.

    return { error: "Invitation feature requires Service Role setup (Pending)." };
}

export async function getAdmins() {
    // Return list of users with 'superadmin' role
    const superAdminRole = await db.query.roles.findFirst({
        where: eq(roles.name, "superadmin"),
    });

    if (!superAdminRole) return [];

    const admins = await db.query.userRoles.findMany({
        where: eq(userRoles.roleId, superAdminRole.id),
        with: {
            profile: true,
        },
    });

    return admins.map(ur => ur.profile);
}
