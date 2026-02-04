import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";

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
