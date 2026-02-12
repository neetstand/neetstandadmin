import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/actions/auth";
import { db } from "@drizzle/index";
import { settings } from "@drizzle/schema/tables/settings";
import { eq } from "drizzle-orm";
import { adminAuthClient } from "@/utils/supabase/admin";
import OwnerSetupWizard from "@/components/dashboard/OwnerSetupWizard";
import SessionGuard from "@/components/auth/SessionGuard";

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

    // Fetch Role for Sidebar Visibility
    const { db } = await import("@drizzle/index");
    const { profiles } = await import("@drizzle/schema/tables/profiles");
    const { eq } = await import("drizzle-orm");

    const profile = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);
    const userRole = profile[0]?.role || "user";

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
            <SessionGuard />
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
                    <Link href="/dashboard/profile" className="block px-4 py-2 hover:bg-slate-800 rounded">
                        Profile
                    </Link>

                    {/* Owner & Superadmin Section */}
                    {(userRole === "owner" || userRole === "superadmin") && (
                        <div className="mt-6">
                            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                Global Settings
                            </h3>
                            <div className="space-y-1">
                                <Link
                                    href="/dashboard/settings/global"
                                    className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-slate-800 hover:text-white"
                                >
                                    <svg className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    General
                                </Link>
                                <Link
                                    href="/dashboard/settings/email"
                                    className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-slate-800 hover:text-white"
                                >
                                    <svg className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email Service
                                </Link>

                                {userRole === "owner" && (
                                    <Link
                                        href="/dashboard/settings/ownership"
                                        className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        <svg className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Ownership
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

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
