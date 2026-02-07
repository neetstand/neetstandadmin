"use server";

import { db } from "@drizzle/index";
import { profiles, roles, userRoles } from "@drizzle/schema/index";
import { eq } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";

export async function checkSuperAdminExists() {
    const superAdminRole = await db.query.roles.findFirst({
        where: eq(roles.name, "superadmin"),
    });

    if (!superAdminRole) return false;

    const existingSuperAdmin = await db.query.userRoles.findFirst({
        where: eq(userRoles.roleId, superAdminRole.id),
    });

    return !!existingSuperAdmin;
}

export async function claimSuperAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return { error: "Not authenticated" };
    }

    // 1. Check if superadmin exists
    const exists = await checkSuperAdminExists();
    if (exists) {
        return { error: "Superadmin already claimed." };
    }

    // 2. Ensure roles exist
    let saRole = await db.query.roles.findFirst({
        where: eq(roles.name, "superadmin"),
    });

    if (!saRole) {
        // Create superadmin role if missing
        const [newRole] = await db.insert(roles).values({
            name: "superadmin",
            description: "Root administrator with full access",
        }).returning();
        saRole = newRole;
    }

    // 3. Create or Update User in DB
    // Check if user already in DB (synced from Auth)
    let dbUser = await db.query.profiles.findFirst({
        where: eq(profiles.id, user.id),
    });

    if (!dbUser) {
        const [newUser] = await db.insert(profiles).values({
            id: user.id,
        }).returning();
        dbUser = newUser;
    }

    // 4. Assign Role
    await db.insert(userRoles).values({
        userId: dbUser.id,
        roleId: saRole.id,
    });

    return { success: true };
}
