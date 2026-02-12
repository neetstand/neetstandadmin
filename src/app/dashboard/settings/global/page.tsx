import { getMaintenanceMode } from "@/actions/settings";
import GlobalSettingsForm from "@/components/dashboard/GlobalSettingsForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@drizzle/index";

export default async function GlobalSettingsPage() {
    // Permission Check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await db.query.profiles.findFirst({
        where: (p, { eq }) => eq(p.id, user.id),
    });

    if (!profile || !["owner", "superadmin"].includes(profile.role)) {
        return (
            <div className="p-8 text-center text-red-600">
                You do not have permission to view this page.
            </div>
        );
    }

    const { isEnabled } = await getMaintenanceMode();

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Global Settings</h1>
                <p className="text-slate-500">Manage system-wide configurations.</p>
            </div>

            <div className="space-y-6">
                <GlobalSettingsForm initialMaintenanceMode={isEnabled || false} />
            </div>
        </div>
    );
}
