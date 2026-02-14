
import { db } from "@drizzle/index";
import { sql } from "drizzle-orm";
// We need to define the table schema for Drizzle since it was created via raw SQL
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { settings } from "@drizzle/schema/tables/settings";
import { eq } from "drizzle-orm";

const emailQueue = pgTable("email_queue", {
    id: uuid("id").primaryKey().defaultRandom(),
    toEmail: text("to_email").notNull(),
    fromEmail: text("from_email").notNull(),
    subject: text("subject").notNull(),
    htmlBody: text("html_body").notNull(),
    status: text("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    processedAt: timestamp("processed_at"),
    error: text("error"),
});

export async function processEmailQueue() {
    console.log("Processing Email Queue...");

    // 1. Fetch Pending Emails
    const pending = await db.select().from(emailQueue).where(eq(emailQueue.status, "pending")).limit(5);

    if (pending.length === 0) {
        console.log("No pending emails.");
        return;
    }

    // 2. Fetch Settings
    const apiKeyResult = await db.select().from(settings).where(eq(settings.variable, "email_api_key"));
    const providerUrlResult = await db.select().from(settings).where(eq(settings.variable, "email_provider_url"));

    const apiKey = apiKeyResult[0]?.value;
    const providerUrl = providerUrlResult[0]?.value || "https://api.brevo.com/v3/smtp/email";

    if (!apiKey) {
        console.error("Cannot process queue: Missing API Key.");
        return;
    }

    // 3. Process Each
    for (const email of pending) {
        try {
            console.log(`Sending email to ${email.toEmail}...`);
            const response = await fetch(providerUrl, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": apiKey,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    sender: { name: "NEET Stand", email: email.fromEmail }, // simplified sender name for now
                    to: [{ email: email.toEmail }],
                    subject: email.subject,
                    htmlContent: email.htmlBody
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`API Error ${response.status}: ${errText}`);
            }

            // Mark Success
            await db.update(emailQueue)
                .set({ status: "sent", processedAt: new Date() })
                .where(eq(emailQueue.id, email.id));

            console.log(`Email ${email.id} sent successfully.`);

        } catch (error: any) {
            console.error(`Failed to send email ${email.id}:`, error);
            // Mark Failed
            await db.update(emailQueue)
                .set({ status: "failed", error: error.message, processedAt: new Date() })
                .where(eq(emailQueue.id, email.id));
        }
    }
}
