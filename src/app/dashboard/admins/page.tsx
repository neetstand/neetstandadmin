import { getAdmins } from "@/actions/admins";

export default async function AdminsPage() {
    const admins = await getAdmins();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Admins</h1>

            <div className="bg-white rounded shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {/* Add remove/edit actions here */}
                                    <button className="text-red-600 hover:text-red-900">Remove</button>
                                </td>
                            </tr>
                        ))}
                        {admins.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No admins found (System error if you are seeing this).</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-white p-6 rounded shadow-sm">
                <h2 className="text-lg font-medium mb-4">Invite New Admin</h2>
                <p className="text-sm text-gray-500 mb-4">
                    To add an admin, the user must first sign up via the setup page or login page if enabled.
                    (Implementation pending robust invite system).
                </p>
            </div>
        </div>
    );
}
