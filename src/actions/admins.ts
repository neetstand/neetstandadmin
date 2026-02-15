"use server";

import { db } from "@drizzle/index";
import { profiles, roles } from "@drizzle/schema/index";
import { eq } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

import { revalidatePath } from "next/cache";

// Helper: Get user hierarchy level
async function getUserLevel(userId: string) {
    const profile = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
    if (!profile.length) return { level: 0, role: "", error: "Profile not found" };

    const roleName = profile[0].role;
    const roleObj = await db.select().from(roles).where(eq(roles.name, roleName)).limit(1);

    return {
        level: roleObj.length ? roleObj[0].hierarchyLevel : 0,
        role: roleName,
        error: null
    };
}

export async function inviteAdmin(formData: FormData) {
    // 1. Check current user is superadmin (Simulated check, real check should use DB)
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return { error: "Not authenticated" };

    return { error: "Invitation feature requires Service Role setup (Pending)." };
}

export async function getAdmins() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    // 1. Get Current User Level
    const { level: currentLevel, error } = await getUserLevel(user.id);
    if (error) return [];

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
    const adminAuthClient = createAdminClient();
    const { data: { users }, error: authError } = await adminAuthClient.auth.admin.listUsers();

    if (authError || !users) {
        console.error("Failed to fetch users from auth:", authError);
        return visibleProfiles.map(p => ({
            ...p.profile,
            email: "Email unavailable"
        }));
    }

    // Create a map of ID -> Email
    const userMap = new Map(users.map(u => [u.id, u.email]));

    return visibleProfiles.map(p => ({
        ...p.profile,
        email: userMap.get(p.profile.id) || "Email not found"
    }));
}

export async function deleteAdmin(targetUserId: string) {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (!currentUser) return { success: false, error: "Not authenticated" };

    // 1. Get Hierarchy Levels
    const { level: currentLevel, error: currentError } = await getUserLevel(currentUser.id);
    if (currentError) return { success: false, error: currentError };

    const { level: targetLevel, role: targetRole, error: targetError } = await getUserLevel(targetUserId);
    if (targetError) return { success: false, error: targetError };

    // 2. Hierarchy Check
    if (currentLevel < targetLevel) {
        return { success: false, error: "You do not have permission to manage this user." };
    }

    // 3. Self-Admin Protection
    if (currentUser.id === targetUserId) {
        return { success: false, error: "You cannot remove yourself. Please ask another admin." };
    }

    // 4. "At least one superadmin is a must"
    if (targetRole === "superadmin") {
        const superAdmins = await db
            .select()
            .from(profiles)
            .where(eq(profiles.role, "superadmin"));

        if (superAdmins.length <= 1) {
            return { success: false, error: "Cannot delete the last Superadmin." };
        }
    }

    // 5. Perform Deletion
    const adminAuthClient = createAdminClient();
    const { error } = await adminAuthClient.auth.admin.deleteUser(targetUserId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/dashboard/admins");
    return { success: true };
}

export async function updateAdminRole(targetUserId: string, newRole: string) {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (!currentUser) return { success: false, error: "Not authenticated" };

    // 1. Get Hierarchy Levels
    const { level: currentLevel, error: currentError } = await getUserLevel(currentUser.id);
    if (currentError) return { success: false, error: currentError };

    const { level: targetLevel, role: targetRole, error: targetError } = await getUserLevel(targetUserId);
    if (targetError) return { success: false, error: targetError };

    // 2. Validate New Role
    const newRoleObj = await db.select().from(roles).where(eq(roles.name, newRole)).limit(1);
    if (!newRoleObj.length) return { success: false, error: "Invalid role selected" };
    const newRoleLevel = newRoleObj[0].hierarchyLevel;

    // Constraint: Cannot promote someone to a level higher than yourself
    if (newRoleLevel > currentLevel) {
        return { success: false, error: "Cannot promote user above your own rank." };
    }

    // Constraint: Cannot modify someone with equal or higher rank
    if (currentLevel < targetLevel) {
        return { success: false, error: "You do not have permission to modify this user." };
    }

    // 3. "At least one Superadmin" Check
    if (targetRole === "superadmin" && newRole !== "superadmin") {
        const superAdmins = await db
            .select()
            .from(profiles)
            .where(eq(profiles.role, "superadmin"));

        if (superAdmins.length <= 1) {
            return { success: false, error: "Cannot demote the last Superadmin." };
        }
    }

    // 4. Update Role
    await db.update(profiles).set({ role: newRole }).where(eq(profiles.id, targetUserId));

    revalidatePath("/dashboard/admins");
    return { success: true };
}
