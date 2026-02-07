import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import { db } from "@drizzle/index";
import { settings } from "@drizzle/schema/tables/settings";
import { eq } from "drizzle-orm";
import { adminAuthClient } from "@/utils/supabase/admin";
import OwnerSetupWizard from "@/components/dashboard/OwnerSetupWizard";

export default async function OwnerSetupPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // --- Blocking Setup Check ---
    // 1. Check Email Settings
    const emailSetting = await db.select().from(settings).where(eq(settings.variable, "email_api_key")).limit(1);
    const hasEmailConfig = emailSetting.length > 0 && !!emailSetting[0].value;

    // 2. Check Super Admin Status
    const { data: status } = await adminAuthClient.rpc("check_system_status");
    const hasSuperAdmin = status?.superadmin_exists || false;

    // If fully setup, redirect to dashboard
    if (hasEmailConfig && hasSuperAdmin) {
        redirect("/dashboard");
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-900">NeetStand Admin Setup</h1>
                <form action={signOutAction}>
                    <button className="text-sm text-red-500 hover:text-red-700 font-medium">Sign Out</button>
                </form>
            </nav>
            <OwnerSetupWizard initialStep={hasEmailConfig ? 2 : 1} />
        </div>
    );
}
