
import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Data for the dashboard sections (Apps/Models)
    const apps = [
        {
            name: "Authentication and Authorization",
            models: [
                {
                    name: "Admins",
                    addUrl: "/dashboard/admins/new",
                    changeUrl: "/dashboard/admins",
                    description: "Manage system administrators"
                },
                {
                    name: "Users",
                    addUrl: "#",
                    changeUrl: "#",
                    disabled: true,
                    description: "Manage customer accounts"
                },
                {
                    name: "Roles",
                    addUrl: "#",
                    changeUrl: "#",
                    disabled: true,
                    description: "Configure system roles"
                },
            ]
        },
        {
            name: "Organization",
            models: [
                {
                    name: "Departments",
                    addUrl: "#",
                    changeUrl: "#",
                    disabled: true,
                    description: "Manage organization units"
                },
            ]
        },
        // We omit System/Settings for Super Admins as it's Owner only
    ];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Site Administration</h1>
                    <p className="text-slate-500 mt-2">Welcome, <span className='font-medium text-slate-700'>{user?.email}</span>.</p>
                </div>
                {/* Optional: Quick links or time */}
                <div className="text-sm text-slate-400 font-mono">
                    NEET Stand Admin
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content: Model Lists */}
                <div className="lg:col-span-3 space-y-8">
                    {apps.map((app) => (
                        <div key={app.name} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-900 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                <h2 className="text-base font-semibold text-white tracking-wide">{app.name}</h2>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {app.models.map((model) => (
                                        <tr key={model.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                                            <td className="px-5 py-3 w-full">
                                                {model.disabled ? (
                                                    <span className="text-slate-400 font-medium text-base cursor-not-allowed">{model.name}</span>
                                                ) : (
                                                    <Link href={model.changeUrl} className="text-indigo-600 font-semibold hover:underline text-base block">
                                                        {model.name}
                                                    </Link>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-6 text-xs uppercase font-bold tracking-wider">
                                                    {model.disabled ? (
                                                        <>
                                                            <span className="text-slate-300 flex items-center gap-1 cursor-not-allowed opacity-50"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg> Add</span>
                                                            <span className="text-slate-300 flex items-center gap-1 cursor-not-allowed opacity-50"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Change</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Link href={model.addUrl} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg> Add
                                                            </Link>
                                                            <Link href={model.changeUrl} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Change
                                                            </Link>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>

                {/* Sidebar: Recent Actions (Mocked) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Recent Actions</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-xs font-medium text-slate-800">Admin "John Doe" created</p>
                                    <p className="text-[10px] text-slate-400">Authentication &gt; Admins</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-xs font-medium text-slate-800">Role "Editor" updated</p>
                                    <p className="text-[10px] text-slate-400">Authentication &gt; Roles</p>
                                </div>
                            </div>
                            <div className="text-center pt-2">
                                <span className="text-xs text-indigo-600 cursor-not-allowed opacity-50">View all history</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
