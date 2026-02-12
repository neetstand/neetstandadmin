"use server";

import { db } from "@drizzle/index";
import { settings } from "@drizzle/schema/tables/settings";
import { profiles } from "@drizzle/schema/tables/profiles";
import { sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function saveEmailSettings(formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify Owner Role
        const profile = await db.query.profiles.findFirst({
            where: (p, { eq }) => eq(p.id, user.id),
        });

        if (!profile || profile.role !== "owner") {
            return { success: false, error: "Only the Owner can change settings." };
        }

        const apiKey = formData.get("email_api_key") as string;
        const providerUrl = formData.get("email_provider_url") as string;
        const emailSiteUrl = formData.get("email_site_url") as string; // Optional if we want it

        if (!apiKey) {
            return { success: false, error: "API Key is required" };
        }

        const valuesToInsert = [
            { variable: "email_api_key", value: apiKey, description: "API KEY" },
            { variable: "email_provider_url", value: providerUrl || "https://api.brevo.com/v3/smtp/email", description: "Email Provider URL" },
        ];

        if (emailSiteUrl) {
            valuesToInsert.push({ variable: "email_site_url", value: emailSiteUrl, description: "Email Site URL" });
        }

        // Upsert settings
        for (const item of valuesToInsert) {
            await db.insert(settings).values({
                variable: item.variable,
                value: item.value,
                description: item.description,
                updatedAt: new Date()
            }).onConflictDoUpdate({
                target: settings.variable,
                set: {
                    value: item.value,
                    description: item.description,
                    updatedAt: new Date()
                }
            });
        }

        updateTag("settings");
        return { success: true };

    } catch (error: any) {
        console.error("Failed to save email settings:", error);
        return { success: false, error: error.message };
    }
}

export async function sendTestEmail() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || !user.email) {
            return { success: false, error: "User not found" };
        }

        // Verify Owner Role
        const profile = await db.query.profiles.findFirst({
            where: (p, { eq }) => eq(p.id, user.id),
        });

        if (!profile || profile.role !== "owner") {
            return { success: false, error: "Only the Owner can send test emails." };
        }

        const { error } = await supabase.rpc("send_email", {
            to_email: user.email,
            from_email: "no-reply@neetstand.com", // Default sender
            subject: "Email Configuration Verified - NEET Stand",
            html_body: `
                <div style="font-family: sans-serif; color: #333;">
                    <h3>Email Setup Successful</h3>
                    <p>Dear System Owner,</p>
                    <p>This email confirms that your email service configuration for <strong>NEET Stand</strong> has been successfully set up.</p>
                    <p>Please return to the setup wizard and click the <strong>"Yes, I got the Email"</strong> button to proceed with the Super Admin configuration.</p>
                    <br/>
                    <p>Best regards,<br/>The NEET Stand Team</p>
                </div>
            `
        });

        if (error) {
            console.error("Test email failed:", error);
            // The RPC might return a JSON string with error field if manually thrown
            return { success: false, error: error.message || "Failed to send test email" };
        }

        return { success: true };

    } catch (error: any) {
        console.error("Test email exception:", error);

        return { success: false, error: error.message };
    }
}

export async function getMaintenanceMode() {
    try {
        const result = await db.query.settings.findFirst({
            where: (s, { eq }) => eq(s.variable, "maintenance_mode"),
        });

        return { isEnabled: result?.value === "true" };
    } catch (error) {
        console.error("Failed to fetch maintenance mode:", error);
        return { isEnabled: false };
    }
}

export async function saveMaintenanceMode(enabled: boolean) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify Owner or Super Admin Role
        const profile = await db.query.profiles.findFirst({
            where: (p, { eq }) => eq(p.id, user.id),
        });

        if (!profile || !["owner", "superadmin"].includes(profile.role)) {
            return { success: false, error: "Only Admins can change maintenance mode." };
        }

        // Refresh Web App Cache FIRST
        console.log("Refreshing Web App Settings. URL:", process.env.WEB_URL);

        if (!process.env.WEB_URL || !process.env.ADMIN_API_KEY) {
            console.error("Missing WEB_URL or ADMIN_API_KEY environment variables.");
            return { success: false, error: "System Configuration Error: Missing Environment Variables" };
        }

        try {
            const response = await fetch(`${process.env.WEB_URL}/api/settings/refresh`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.ADMIN_API_KEY}`,
                    "Origin": process.env.ADMIN_URL || "http://localhost:4000" // Send origin for validation
                },
                cache: "no-store",
            });

            if (!response.ok) {
                const errorText = await response.text();
                // console.error("Failed to refresh web app settings. Status:", response.status, errorText);
                return { success: false, error: `Web App Refresh Failed: ${response.status} ${response.statusText}` };
            } else {
                console.log("Successfully refreshed web app settings");
            }
        } catch (err: any) {
            console.error("Failed to connect to web app for settings refresh:", err);
            // Per user instruction: "If it worked then we can upsert". 
            // If connection fails (e.g. timeout), do NOT update DB.
            return { success: false, error: `Connection to Web App Failed: ${err.message}` };
        }

        // Upsert setting ONLY if API call succeeded
        await db.insert(settings).values({
            variable: "maintenance_mode",
            value: String(enabled),
            description: "Maintenance Mode Status",
            updatedAt: new Date()
        }).onConflictDoUpdate({
            target: settings.variable,
            set: {
                value: String(enabled),
                updatedAt: new Date()
            }
        });

        updateTag("settings");

        return { success: true };

    } catch (error: any) {
        console.error("Failed to save maintenance mode:", error);
        return { success: false, error: error.message };
    }
}
