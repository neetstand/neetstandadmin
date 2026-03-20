import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SetupForm from "./SetupForm";
import { SetupService } from "@/services/setup";

export default async function SetupPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const status = await SetupService.getOwnerStatus();
    console.log("Current Setup Status:", status);

    // System fully setup — send to dashboard (if logged in) or login
    if (status.exists && status.active && status.superAdminExists) {
        if (user) redirect("/dashboard");
        redirect("/login");
    }

    // Determine mode:
    // 1. No Owner         -> "create"
    // 2. Owner, Not Active -> "verify"
    // 3. Owner Active, No Email -> "email_setup"
    // 4. Owner Active, Email Ok -> "superadmin_setup"
    let mode: "create" | "verify" | "email_setup" | "superadmin_setup" = "create";

    if (status.exists) {
        if (!status.active) {
            mode = "verify";
        } else {
            const isEmailOk = await SetupService.isEmailConfigured();
            console.log("Is Email Configured:", isEmailOk);
            mode = isEmailOk ? "superadmin_setup" : "email_setup";
        }
    }

    // For superadmin_setup we need the superadmin role ID and the current user
    const superadminRoleId = (mode === "superadmin_setup" || mode === "email_setup")
        ? (await SetupService.getSuperadminRoleId()) ?? undefined
        : undefined;

    // Fetch email settings if in email_setup mode
    const emailSettings = mode === "email_setup"
        ? await SetupService.getEmailSettings()
        : undefined;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-slate-200">
                <SetupForm
                    isOwnerSetup={true}
                    mode={mode}
                    currentUser={user}
                    superadminRoleId={superadminRoleId}
                    initialEmailSettings={emailSettings}
                />
            </div>
        </div>
    );
}
