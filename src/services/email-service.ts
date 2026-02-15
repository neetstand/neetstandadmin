import { db } from "@drizzle/index";
import { settings } from "@drizzle/schema/tables/settings";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/utils/supabase/admin";


export const getCachedEmailSettings = unstable_cache(
    async () => {
        const result = await db.select().from(settings).where(eq(settings.variable, "email_site_url"));
        const apiKeyResult = await db.select().from(settings).where(eq(settings.variable, "email_api_key"));

        return {
            emailSiteUrl: result[0]?.value,
            emailApiKey: apiKeyResult[0]?.value
        };
    },
    ["email-settings"],
    { tags: ["settings"] }
);

export async function sendEmail({
    to,
    subject,
    html,
    overrideSettings
}: {
    to: string;
    subject: string;
    html: string;
    overrideSettings?: { apiKey: string; siteUrl: string };
}) {
    let apiKey = overrideSettings?.apiKey;
    let siteUrl = overrideSettings?.siteUrl; // Not used in current RPC but kept for future

    if (!apiKey) {
        const cached = await getCachedEmailSettings();
        apiKey = cached.emailApiKey;
    }

    if (!apiKey) {
        throw new Error("Email configuration missing");
    }

    // Use the RPC function `send_email`
    // Signature: send_email(to_email, from_email, subject, html_body)
    const adminAuthClient = createAdminClient();
    const { data, error } = await adminAuthClient.rpc("send_email", {
        to_email: to,
        from_email: "no-reply@neetstand.com", // Default sender
        subject: subject,
        html_body: html
    });

    if (error) {
        console.error("Email Send Error:", error);
        throw new Error(error.message);
    }

    return data;
}

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
    const subject = "Welcome to NEETStand Admin";
    const html = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Welcome, ${name}!</h2>
            <p>You are the appointed <strong>Superadmin</strong> and you hold a responsible position.</p>
            <p>Make responsible decisions.</p>
            <br/>
            <p>Regards,<br/>The Team</p>
        </div>
    `;

    return sendEmail({ to, subject, html });
}
