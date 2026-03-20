
import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";
import { db } from "@drizzle/index";
import { profiles } from "@drizzle/schema/tables/profiles";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch role for access-level display
    const profileRows = user
        ? await db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1)
        : [];
    const userRole = profileRows[0]?.role || "user";
    const isOwner = userRole === "owner";

    // Sections visible to everyone (superadmin+)
    const commonApps = [
        {
            name: "Authentication and Authorization",
            ownerOnly: false,
            models: [
                {
                    name: "Admins",
                    addUrl: "/dashboard/admins/new",
                    changeUrl: "/dashboard/admins",
                    description: "Manage system administrators",
                    ownerOnly: false,
                },
                {
                    name: "Users",
                    addUrl: "#",
                    changeUrl: "#",
                    disabled: true,
                    description: "Manage customer accounts",
                    ownerOnly: false,
                },
                {
                    name: "Roles",
                    addUrl: "#",
                    changeUrl: "#",
                    disabled: true,
                    description: "Configure system roles",
                    ownerOnly: false,
                },
            ],
        },
        {
            name: "Organization",
            ownerOnly: false,
            models: [
                {
                    name: "Departments",
                    addUrl: "#",
                    changeUrl: "#",
                    disabled: true,
                    description: "Manage organization units",
                    ownerOnly: false,
                },
            ],
        },
        // Owner-only section
        {
            name: "System",
            ownerOnly: true,
            models: [
                {
                    name: "Global Settings",
                    addUrl: "/dashboard/settings/global",
                    changeUrl: "/dashboard/settings/global",
                    description: "Platform-wide configuration",
                    ownerOnly: true,
                },
                {
                    name: "Email Service",
                    addUrl: "/dashboard/settings/email",
                    changeUrl: "/dashboard/settings/email",
                    description: "Configure email provider",
                    ownerOnly: true,
                },
                {
                    name: "Ownership",
                    addUrl: "/dashboard/settings/ownership",
                    changeUrl: "/dashboard/settings/ownership",
                    description: "Transfer or manage ownership",
                    ownerOnly: true,
                },
            ],
        },
    ];

    // Filter: non-owners see all sections except ownerOnly ones
    const visibleApps = isOwner
        ? commonApps
        : commonApps.filter((app) => !app.ownerOnly);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Site Administration</h1>
                    <p className="text-slate-500 mt-2">
                        Welcome, <span className="font-medium text-slate-700">{user?.email}</span>.
                        {isOwner && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                👑 Owner
                            </span>
                        )}
                    </p>
                </div>
                <div className="text-sm text-slate-400 font-mono">NEET Stand Admin</div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {visibleApps.map((app) => (
                        <div key={app.name} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className={`px-5 py-3 border-b border-slate-200 flex justify-between items-center ${app.ownerOnly ? "bg-amber-900" : "bg-slate-900"}`}>
                                <h2 className="text-base font-semibold text-white tracking-wide">{app.name}</h2>
                                {app.ownerOnly && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-500 text-amber-950">
                                        👑 Owner Only
                                    </span>
                                )}
                            </div>
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {app.models.map((model) => (
                                        <tr key={model.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                                            <td className="px-5 py-3 w-full">
                                                <div className="flex items-center gap-2">
                                                    {model.disabled ? (
                                                        <span className="text-slate-400 font-medium text-base cursor-not-allowed">{model.name}</span>
                                                    ) : (
                                                        <Link href={model.changeUrl} className="text-indigo-600 font-semibold hover:underline text-base">
                                                            {model.name}
                                                        </Link>
                                                    )}
                                                    {model.ownerOnly && (
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                                            Owner
                                                        </span>
                                                    )}
                                                </div>
                                                {model.description && (
                                                    <p className="text-xs text-slate-400 mt-0.5">{model.description}</p>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-6 text-xs uppercase font-bold tracking-wider">
                                                    {model.disabled ? (
                                                        <>
                                                            <span className="text-slate-300 flex items-center gap-1 cursor-not-allowed opacity-50">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                                                                Add
                                                            </span>
                                                            <span className="text-slate-300 flex items-center gap-1 cursor-not-allowed opacity-50">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                                Change
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Link href={model.addUrl} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                                                                Add
                                                            </Link>
                                                            <Link href={model.changeUrl} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                                Change
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

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Role Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Your Access Level</h3>
                        <div className={`rounded-md p-3 text-center ${isOwner ? "bg-amber-50 border border-amber-200" : "bg-slate-50 border border-slate-200"}`}>
                            <div className="text-2xl mb-1">{isOwner ? "👑" : "🛡️"}</div>
                            <p className={`text-sm font-bold capitalize ${isOwner ? "text-amber-800" : "text-slate-700"}`}>
                                {userRole}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {isOwner
                                    ? "Full system access including owner-only settings"
                                    : "Admin access to all standard management features"}
                            </p>
                        </div>
                    </div>

                    {/* Recent Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Recent Actions</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-xs font-medium text-slate-800">Admin &quot;John Doe&quot; created</p>
                                    <p className="text-[10px] text-slate-400">Authentication &gt; Admins</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-xs font-medium text-slate-800">Role &quot;Editor&quot; updated</p>
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
