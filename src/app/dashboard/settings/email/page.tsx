
import EmailSettings from "@/components/dashboard/EmailSettings";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { settings } from "@drizzle/schema/tables/settings";
import { eq } from "drizzle-orm";

export default async function EmailSettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // RBAC Check
    // RBAC Check
    const profile = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);
    if (!profile.length || (profile[0].role !== "owner" && profile[0].role !== "superadmin")) {
        redirect("/dashboard");
    }

    let emailUrl = "https://api.brevo.com/v3/smtp/email";

    try {
        const record = await db.select().from(settings).where(eq(settings.variable, "email_provider_url")).limit(1);
        if (record.length > 0 && record[0].value) {
            emailUrl = record[0].value;
        }
    } catch (e) {
        // ignore error
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Email Service Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <EmailSettings initialUrl={emailUrl} />
            </div>
        </div>
    );
}
