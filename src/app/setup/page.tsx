import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SetupForm from "./SetupForm"; // Reusing SetupForm for now, but configured for Owner
import { SetupService } from "@/services/setup";

export default async function SetupPage() {
    const supabase = await createClient(); // Await the promise!

    // Check if ANY owner exists in the system (using service role to bypass RLS potentially, or public view)
    // We can't use public client easily for this if RLS is tight. 
    // Ideally we have a public RPC or we check based on auth state?
    // BUT: The requirement is: "If an owner is not set then only this screen will open."
    // This implies we need a way to check owner existence without being logged in.

    // For now, let's try to fetch using a Service that can use Admin context if needed, 
    // or we assume this page is public but checks DB.
    // If strict RLS prevents reading profiles, we might need an edge function or RPC. 
    // However, let's assume `profiles` is publicly readable for 'role' or we use a specific query.

    // Let's rely on SetupService to have a method "isOwnerExists".
    // I will need to implement `isOwnerExists` in SetupService or check here.

    const status = await SetupService.getOwnerStatus();

    // System is only "closed" if Owner exists, is active, AND Super Admin is set.
    if (status.exists && status.active && status.superAdminExists) {
        // System fully setup
        const { data: { user } } = await supabase.auth.getUser();
        if (user) redirect("/dashboard");
        redirect("/login");
    }

    // Determine mode:
    // 1. No Owner -> "create"
    // 2. Owner Exists, Not Active -> "verify"
    // 3. Owner Exists & Active -> "superadmin_setup"
    let mode: "create" | "verify" | "superadmin_setup" = "create";
    if (status.exists) {
        mode = status.active ? "superadmin_setup" : "verify";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-slate-200">
                <h1 className="text-3xl font-bold mb-4 text-slate-900 text-center">Owner Setup</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Setting up the Owner Account. Please provide your email to begin.
                </p>

                <SetupForm isOwnerSetup={true} mode={mode} />
            </div>
        </div>
    );
}
