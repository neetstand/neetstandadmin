"use server";

import { db } from "@drizzle/index";
import { settings } from "@drizzle/schema/tables/settings";
import { sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function saveEmailSettings(formData: FormData) {
    try {
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
