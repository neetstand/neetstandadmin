import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome, {user?.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Admins</h2>
                    <p className="text-gray-600">Manage admin users and roles.</p>
                    <a href="/dashboard/admins" className="text-indigo-600 mt-4 inline-block hover:underline">Manage Admins &rarr;</a>
                </div>
                {/* Placeholders for other features */}
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Users</h2>
                    <p className="text-gray-600">View and manage customer accounts.</p>
                </div>
            </div>
        </div>
    );
}
