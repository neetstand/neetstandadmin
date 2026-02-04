import { db } from "@drizzle/index";
import { roles, userRoles, profiles } from "@drizzle/schema/index";
import { eq } from "drizzle-orm";
import { adminAuthClient } from "@/utils/supabase/admin";

interface SetupStatus {
    ownerExists: boolean;
    isUserInternal: boolean;
    superadminExists: boolean;
    missingRole?: string;
}

export class SetupService {
    static async getStatus(userId: string): Promise<SetupStatus> {
        // Check Owner Role Definition
        const ownerRole = await db.select().from(roles).where(eq(roles.name, "owner")).limit(1);
        if (!ownerRole.length) {
            return {
                ownerExists: false,
                isUserInternal: false,
                superadminExists: false,
                missingRole: "owner"
            };
        }

        // Check if user is internal (exists in profiles)
        const internalUser = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
        const isUserInternal = internalUser.length > 0;

        // Check Superadmin Role Definition
        const superadminRole = await db.select().from(roles).where(eq(roles.name, "superadmin")).limit(1);
        if (!superadminRole.length) {
            return {
                ownerExists: true,
                isUserInternal,
                superadminExists: false,
                missingRole: "superadmin"
            };
        }

        // Check if a Superadmin is assigned
        const superadmins = await db.select().from(userRoles).where(eq(userRoles.roleId, superadminRole[0].id));
        const superadminExists = superadmins.length > 0;

        return {
            ownerExists: true,
            isUserInternal,
            superadminExists,
        };
    }

    static async getSuperadminRoleId() {
        const superadminRole = await db.select().from(roles).where(eq(roles.name, "superadmin")).limit(1);
        return superadminRole.length ? superadminRole[0].id : null;
    }

    static async getOwnerStatus(): Promise<{ exists: boolean, active: boolean, superAdminExists: boolean }> {
        // Use the new system status RPC
        const { data, error } = await adminAuthClient.rpc("check_system_status");

        if (error || !data) {
            return { exists: false, active: false, superAdminExists: false };
        }

        // RPC returns { owner_exists, owner_active, superadmin_exists }
        return {
            exists: data.owner_exists,
            active: data.owner_active,
            superAdminExists: data.superadmin_exists
        };
    }

    static async checkOwnerExists(): Promise<boolean> {
        const owners = await db.select().from(profiles).where(eq(profiles.role, "owner")).limit(1);
        return owners.length > 0;
    }
}
