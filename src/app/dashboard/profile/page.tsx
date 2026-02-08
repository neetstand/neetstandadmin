
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { eq } from "drizzle-orm";
import { updateProfile } from "@/actions/profile";
import { toast } from "sonner";
import ProfileForm from "@/components/dashboard/ProfileForm"; // Client component

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const profileData = await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1);

    // If no profile, something is wrong, but let's handle gracefully or redirect
    if (!profileData.length) {
        // Should not happen for authenticated users in this app structure
        return <div>Profile not found.</div>;
    }

    const profile = profileData[0];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xl font-bold">
                            {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">{profile.fullName || "Admin User"}</h2>
                            <p className="text-sm text-slate-500">{user.email}</p>
                            <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${profile.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                                    profile.role === 'superadmin' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'}`}>
                                {profile.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <ProfileForm
                        initialData={profile}
                        userEmail={user.email || ""}
                    />
                </div>
            </div>
        </div>
    );
}
