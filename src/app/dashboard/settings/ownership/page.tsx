
import TransferOwnership from "@/components/dashboard/TransferOwnership";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { eq } from "drizzle-orm";

export default async function OwnershipSettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // RBAC Check
    const profile = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);
    if (!profile.length || profile[0].role !== "owner") {
        redirect("/dashboard");
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Ownership Transfer</h1>
            <div className="space-y-6">
                <TransferOwnership />
            </div>
        </div>
    );
}
