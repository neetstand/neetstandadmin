export default function AdminsLoading() {
    return (
        <div>
            {/* Title Skeleton */}
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-6 animate-pulse" />

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
                    <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 w-48 bg-gray-200 rounded" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="h-4 w-24 bg-gray-200 rounded ml-auto" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Info Box Skeleton */}
            <div className="mt-8 bg-blue-50/50 border border-blue-100 p-6 rounded-lg animate-pulse">
                <div className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-blue-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-40 bg-blue-200 rounded" />
                        <div className="h-3 w-full max-w-lg bg-blue-100 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
