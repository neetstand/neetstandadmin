import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import { db } from "@drizzle/index";
import { settings } from "@drizzle/schema/tables/settings";
import { eq } from "drizzle-orm";
import { adminAuthClient } from "@/utils/supabase/admin";
import OwnerSetupWizard from "@/components/dashboard/OwnerSetupWizard";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // --- Blocking Setup Check ---
    // 1. Check Email Settings
    // We strictly need fetching the API Key to function.
    const emailSetting = await db.select().from(settings).where(eq(settings.variable, "email_api_key")).limit(1);
    const hasEmailConfig = emailSetting.length > 0 && !!emailSetting[0].value;

    // 2. Check Super Admin Status
    const { data: status } = await adminAuthClient.rpc("check_system_status");
    const hasSuperAdmin = status?.superadmin_exists || false;

    // If either is missing, BLOCK dashboard access and show Wizard
    if (!hasEmailConfig || !hasSuperAdmin) {
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
    // ---------------------------

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-xl font-bold">NeetStand Admin</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Overview
                    </Link>
                    <Link href="/dashboard/admins" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Admins
                    </Link>
                    <form action={signOutAction}>
                        <button className="w-full text-left px-4 py-2 hover:bg-slate-800 rounded text-red-400 cursor-pointer">
                            Sign Out
                        </button>
                    </form>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
