
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SetupForm from "../setup/SetupForm";
import EmailSetupForm from "./EmailSetupForm";
import { SetupService } from "@/services/setup";
import { checkEmailSettingsConfigured, getEmailSettings } from "@/actions/settings";

export default async function OwnerDashboardPage() {
    const supabase = await createClient();

    // 1. Verify User is Logged In
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        redirect("/login");
    }

    // 2. Verify User is Owner (Strict Security)
    const ownerStatus = await SetupService.getOwnerStatus();

    // Check Email Configuration
    const isEmailConfigured = await checkEmailSettingsConfigured();
    const currentEmailSettings = await getEmailSettings();

    // 3. Routing Logic
    // Step 1: Email Setup
    if (!isEmailConfigured) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-slate-200">
                    <EmailSetupForm initialConfig={currentEmailSettings} />
                </div>
            </div>
        );
    }

    // Step 2: Super Admin Setup
    if (!ownerStatus.superAdminExists) {
        const superadminRoleId = await SetupService.getSuperadminRoleId();
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-slate-200">
                    <div className="mb-6">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                            <span>Step 1: Email Setup</span>
                            <span className="text-green-600 font-bold">✓ Done</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 text-center">Step 2: Super Admin Setup</h1>
                    </div>
                    <SetupForm
                        isOwnerSetup={false}
                        mode="superadmin_setup"
                        currentUser={user}
                        superadminRoleId={superadminRoleId || undefined}
                    />
                </div>
            </div>
        );
    }

    // All done
    redirect("/dashboard");
}
