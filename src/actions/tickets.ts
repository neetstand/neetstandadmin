"use server";

import { db } from "@drizzle/index";
import { diagnosticTestRefresh, diagnosticAttempts, profiles } from "@drizzle/schema/index";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/services/email-service";

export async function approveRefreshTicket(ticketId: string) {
    // 1. Get ticket details
    const ticketResult = await db.select().from(diagnosticTestRefresh).where(eq(diagnosticTestRefresh.id, ticketId)).limit(1);
    const ticket = ticketResult[0];
    if (!ticket) throw new Error("Ticket not found");

    const { userId, attemptId, email } = ticket;

    // 2. Delete the specific attempt (cascades to questions & results)
    if (attemptId) {
        await db.delete(diagnosticAttempts).where(eq(diagnosticAttempts.id, attemptId));
    }

    // 3. Reset user's onboarding status
    await db.update(profiles)
        .set({ onboardingStatus: "DIAGNOSTIC_NOT_STARTED" })
        .where(eq(profiles.id, userId));

    // 4. Mark ticket as completed
    await db.update(diagnosticTestRefresh)
        .set({ status: "completed", updatedAt: new Date() })
        .where(eq(diagnosticTestRefresh.id, ticketId));

    // 5. Notify user via email
    if (email) {
        try {
            await sendEmail({
                to: email,
                subject: "Diagnostic Test Refresh Request Approved",
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h3>Request Approved</h3>
                        <p>Your request to refresh your diagnostic test has been approved.</p>
                        <p>You can now log in and take the test again.</p>
                        <br/>
                        <p>Best regards,<br/>NEETStand Team</p>
                    </div>
                `
            });
        } catch (e) {
            console.error("Failed to send approval email:", e);
        }
    }

    revalidatePath("/dashboard/tickets");
    return { success: true };
}

export async function rejectRefreshTicket(ticketId: string) {
    await db.update(diagnosticTestRefresh)
        .set({ status: "rejected", updatedAt: new Date() })
        .where(eq(diagnosticTestRefresh.id, ticketId));

    revalidatePath("/dashboard/tickets");
    return { success: true };
}
