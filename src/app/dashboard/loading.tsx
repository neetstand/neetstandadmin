export default function DashboardLoading() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4 animate-pulse">
            {/* Header Skeleton */}
            <header className="mb-10 flex justify-between items-end border-b border-slate-200 pb-6">
                <div>
                    <div className="h-9 w-64 bg-slate-200 rounded mb-3"></div>
                    <div className="h-5 w-48 bg-slate-200 rounded"></div>
                </div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-3 space-y-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-900 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                <div className="h-5 w-48 bg-slate-700 rounded"></div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="h-12 w-full bg-slate-100 rounded"></div>
                                <div className="h-12 w-full bg-slate-100 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Skeleton */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                        <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-3/4 bg-slate-200 rounded mb-1"></div>
                                        <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
