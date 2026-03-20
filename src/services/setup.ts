import { db } from "@drizzle/index";
import { roles, userRoles, profiles, settings } from "@drizzle/schema/index";
import { eq } from "drizzle-orm";
import { createAdminClient } from "@/utils/supabase/admin";


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
        const adminAuthClient = createAdminClient();
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

    static async isEmailConfigured(): Promise<boolean> {
        try {
            const config = await db.select()
                .from(settings)
                .where(eq(settings.variable, 'email_verified'))
                .limit(1);
            
            if (!config.length) return false;
            return String(config[0].value).toLowerCase().trim() === 'true';
        } catch (error) {
            console.error("IsEmailConfigured Check Error:", error);
            return false;
        }
    }

    static async getEmailSettings() {
        const rows = await db.select().from(settings);
        const apiKey = rows.find(r => r.variable === 'email_api_key')?.value || "";
        const providerUrl = rows.find(r => r.variable === 'email_provider_url')?.value || "https://api.brevo.com/v3/smtp/email";
        const senderEmail = rows.find(r => r.variable === 'email_sender_email')?.value || "";
        const senderName = rows.find(r => r.variable === 'email_sender_name')?.value || "System Admin";

        return { apiKey, providerUrl, senderEmail, senderName };
    }
}
