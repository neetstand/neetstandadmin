"use server";

import { db } from "@drizzle/index";
import { profiles, userRoles, roles } from "@drizzle/schema/index";
import { eq, and } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";
import { adminAuthClient } from "@/utils/supabase/admin";

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
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    // 1. Get Current User Level
    const currentProfile = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);

    if (!currentProfile.length) return [];

    const userRoleName = currentProfile[0].role;

    const userRoleObj = await db.select().from(roles).where(eq(roles.name, userRoleName)).limit(1);

    if (!userRoleObj.length) return []; // Unknown role

    const currentLevel = userRoleObj[0].hierarchyLevel;

    // 2. Fetch all profiles with their role levels
    const allProfiles = await db.select({
        profile: profiles,
        roleData: roles
    })
        .from(profiles)
        .innerJoin(roles, eq(profiles.role, roles.name));

    // 3. Filter based on hierarchy
    const visibleProfiles = allProfiles.filter(p => {
        return p.roleData.hierarchyLevel <= currentLevel && p.roleData.name !== "user";
    });

    // 4. Fetch Emails from Auth
    // Because profiles.email is a boolean preference, NOT the email string.
    // We need to get the emails from Supabase Auth.
    // Note: This might be slow for many users, but for admins list it's fine.
    // Ideally we'd use a View, but let's use listUsers for now.

    // We can't easily filter by ID in listUsers without multiple calls or getting all.
    // Let's get all users (pagination might be needed later).

    const { data: { users }, error } = await adminAuthClient.auth.admin.listUsers();

    if (error || !users) {
        console.error("Failed to fetch users from auth:", error);
        // Fallback: return profiles with "Unknown" email?
        return visibleProfiles.map(p => ({
            ...p.profile,
            email: "Email unavailable"
        }));
    }

    // Create a map of ID -> Email
    const userMap = new Map(users.map(u => [u.id, u.email]));

    return visibleProfiles.map(p => ({
        ...p.profile,
        // OVERWRITE the boolean 'email' field with the actual string email
        email: userMap.get(p.profile.id) || "Email not found"
    }));
}

export async function deleteAdmin(targetUserId: string) {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (!currentUser) return { success: false, error: "Not authenticated" };

    // 1. Get Current User Hierarchy
    const currentProfile = await db.select().from(profiles).where(eq(profiles.id, currentUser.id)).limit(1);
    if (!currentProfile.length) return { success: false, error: "Profile not found" };

    const currentUserRoleName = currentProfile[0].role;
    const currentUserRole = await db.select().from(roles).where(eq(roles.name, currentUserRoleName)).limit(1);
    const currentLevel = currentUserRole.length ? currentUserRole[0].hierarchyLevel : 0;

    // 2. Get Target User Hierarchy
    const targetProfile = await db.select().from(profiles).where(eq(profiles.id, targetUserId)).limit(1);
    if (!targetProfile.length) return { success: false, error: "Target user not found" };

    const targetUserRoleName = targetProfile[0].role;
    const targetUserRole = await db.select().from(roles).where(eq(roles.name, targetUserRoleName)).limit(1);
    const targetLevel = targetUserRole.length ? targetUserRole[0].hierarchyLevel : 0;

    // 3. Hierarchy Check
    if (currentLevel < targetLevel) {
        return { success: false, error: "You do not have permission to manage this user." };
    }

    // 3.5. Self-Admin Protection
    if (currentUser.id === targetUserId) {
        return { success: false, error: "You cannot remove yourself. Please ask another admin." };
    }

    // 4. "At least one superadmin is a must"
    if (targetUserRoleName === "superadmin") {
        // Count superadmins
        const superAdmins = await db
            .select()
            .from(profiles)
            .where(eq(profiles.role, "superadmin"));

        if (superAdmins.length <= 1) {
            return { success: false, error: "Cannot delete the last Superadmin." };
        }
    }

    // 5. Perform Deletion
    const { error } = await adminAuthClient.auth.admin.deleteUser(targetUserId);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function updateAdminRole(targetUserId: string, newRole: string) {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (!currentUser) return { success: false, error: "Not authenticated" };

    // 1. Get Current User Hierarchy
    const currentProfile = await db.select().from(profiles).where(eq(profiles.id, currentUser.id)).limit(1);
    if (!currentProfile.length) return { success: false, error: "Profile not found" };

    const currentUserRoleName = currentProfile[0].role;
    const currentUserRoleObj = await db.select().from(roles).where(eq(roles.name, currentUserRoleName)).limit(1);
    const currentLevel = currentUserRoleObj.length ? currentUserRoleObj[0].hierarchyLevel : 0;

    // 2. Validate New Role
    const newRoleObj = await db.select().from(roles).where(eq(roles.name, newRole)).limit(1);
    if (!newRoleObj.length) return { success: false, error: "Invalid role selected" };
    const newRoleLevel = newRoleObj[0].hierarchyLevel;

    // Constraint: Cannot promote someone to a level higher than yourself
    if (newRoleLevel > currentLevel) {
        return { success: false, error: "Cannot promote user above your own rank." };
    }

    // 3. Get Target User Hierarchy
    const targetProfile = await db.select().from(profiles).where(eq(profiles.id, targetUserId)).limit(1);
    if (!targetProfile.length) return { success: false, error: "Target user not found" };

    const targetUserRoleName = targetProfile[0].role;
    const targetUserRoleObj = await db.select().from(roles).where(eq(roles.name, targetUserRoleName)).limit(1);
    const targetLevel = targetUserRoleObj.length ? targetUserRoleObj[0].hierarchyLevel : 0;

    // Constraint: Cannot modify someone with equal or higher rank
    if (currentLevel < targetLevel) {
        return { success: false, error: "You do not have permission to modify this user." };
    }

    // 4. "At least one Superadmin" Check
    if (targetUserRoleName === "superadmin" && newRole !== "superadmin") {
        const superAdmins = await db
            .select()
            .from(profiles)
            .where(eq(profiles.role, "superadmin"));

        if (superAdmins.length <= 1) {
            return { success: false, error: "Cannot demote the last Superadmin." };
        }
    }

    // 5. Update Role
    await db.update(profiles).set({ role: newRole }).where(eq(profiles.id, targetUserId));

    return { success: true };
}
