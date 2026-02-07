
import { createClient } from "@/utils/supabase/server";

export default async function OwnerDashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Premium Aesthetics: Rich colors, glassmorphism hints, refined typography
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Owner Dashboard</h1>
                    <p className="mt-2 text-lg text-slate-600">Welcome back, Owner. System status is <span className="text-green-600 font-medium">Active</span>.</p>
                </div>
                <div className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-md">
                    v1.0.0
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Admins</h3>
                        <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">3</div>
                    <p className="mt-2 text-sm text-green-600 flex items-center font-medium">
                        <span className="mr-1">↑</span> Active
                    </p>
                </div>

                {/* Stats Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">System Health</h3>
                        <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">Good</div>
                    <p className="mt-2 text-sm text-slate-500">All services operational</p>
                </div>

                {/* Quick Action Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
                    <p className="text-indigo-100 text-sm mb-4">Manage your system configurations and security.</p>
                    <div className="flex flex-col gap-2">
                        <button className="w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium">
                            Invite New Admin
                        </button>
                        <button className="w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium">
                            Review Security Logs
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-900">Recent Activity</h3>
                    <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                                <span className="font-mono text-xs">LOG</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">System updated successfully</p>
                                <p className="text-xs text-slate-500">2 hours ago</p>
                            </div>
                            <div className="text-xs text-slate-400 font-mono">ID: a7f8...</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
