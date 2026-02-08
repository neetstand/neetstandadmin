
// Client Component Wrapper needed for interactivity? 
// Actually, sticking to Server Components for the page, but adding a Client Component for the "Actions" cell is cleaner.
// Let's create `AdminActions.tsx` and use it here.

import { getAdmins } from "@/actions/admins";
import AdminActions from "@/components/dashboard/AdminActions"; // New component
import { createClient } from "@/utils/supabase/server";

export default async function AdminsPage() {
    const admins = await getAdmins();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-slate-900">Manage Admins</h1>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{admin.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                                        admin.role === 'superadmin' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {admin.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${admin.isActive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {admin.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <AdminActions
                                        userId={admin.id}
                                        currentRole={admin.role}
                                        isActive={admin.isActive ?? false}
                                        currentUserId={user?.id || ""}
                                    />
                                </td>
                            </tr>
                        ))}
                        {admins.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    <p className="text-base font-medium text-slate-900">No admins found</p>
                                    <p className="text-sm">This shouldn't happen while logged in.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-lg">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Assigning New Admins</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <p>
                                To add a new admin, they must first sign up. Then, an existing Superadmin or Owner can promote them from the list above using the "Edit Role" action.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
