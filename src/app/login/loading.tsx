export default function LoginLoading() {
    return (
        <div className="flex bg-gray-100 min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-slate-200 animate-pulse">
                {/* Logo / Header Skeleton */}
                <div className="h-8 w-48 bg-gray-200 rounded mb-6 mx-auto" />

                {/* Form Field Skeletons */}
                <div className="space-y-4">
                    <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                        <div className="h-10 w-full bg-gray-200 rounded" />
                    </div>
                    <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                        <div className="h-10 w-full bg-gray-200 rounded" />
                    </div>
                </div>

                {/* Button Skeleton */}
                <div className="h-10 w-full bg-gray-200 rounded mt-6" />

                {/* Footer Link Skeleton */}
                <div className="h-4 w-32 bg-gray-200 rounded mt-4 mx-auto" />
            </div>
        </div>
    );
}
