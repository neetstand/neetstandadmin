"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveEmailSettings } from "@/app/actions/settings";
import { useRouter } from "next/navigation";
import EmailSettings from "./EmailSettings";


// Step 1: Email Configuration
function EmailSetupStep({ onNext }: { onNext: () => void }) {
    return <EmailSettings onSave={onNext} />;
}

// Step 2: Super Admin Setup (Simplified integration)
function SuperAdminSetupStep({ onComplete }: { onComplete: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isMe, setIsMe] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        let success = false;
        try {
            // Server Action Call
            const { setupSuperAdmin } = await import("@/actions/superadmin");

            const result = await setupSuperAdmin({
                isMe,
                email: isMe ? undefined : email,
                name: isMe ? "Owner (Superadmin)" : name,
            });

            if (!result.success) {
                throw new Error(result.error || "Failed to setup superadmin");
            }

            toast.success("Super Admin Configured!");
            success = true;

        } catch (error: any) {
            toast.error(error.message || "Error setting up");
            setLoading(false);
        }

        if (success) {
            // Force Signout and Redirect
            const { signOutAction } = await import("@/app/actions/auth");
            await signOutAction();
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Step 2: Super Admin</h2>
                <p className="text-sm text-slate-500">Assign the first Super Admin to manage the system.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <input
                        type="checkbox"
                        id="isMe"
                        checked={isMe}
                        onChange={(e) => setIsMe(e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded"
                    />
                    <label htmlFor="isMe" className="font-medium text-blue-900 cursor-pointer">
                        I am the Superadmin
                    </label>
                </div>

                {!isMe && (
                    <div className="space-y-4 pt-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-slate-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-slate-500"
                            />
                        </div>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Finishing..." : "Complete Setup"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function OwnerSetupWizard({ initialStep = 1 }: { initialStep?: number }) {
    const router = useRouter();
    const [step, setStep] = useState(initialStep);

    const onFinish = () => {
        router.refresh(); // Refresh to let layout re-evaluate the check
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">System Setup</h1>
                    <p className="text-slate-400 text-sm mt-1">Complete these steps to access your dashboard.</p>
                </div>

                <div className="p-8">
                    {/* Progress Indicator */}
                    <div className="flex items-center mb-8 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'} z-10 transition-colors`}>1</div>
                        <div className="flex-1 h-1 bg-slate-200 mx-2 relative">
                            <div className={`absolute left-0 top-0 h-full bg-slate-900 transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'} z-10 transition-colors`}>2</div>
                    </div>

                    {step === 1 && <EmailSetupStep onNext={() => setStep(2)} />}
                    {step === 2 && <SuperAdminSetupStep onComplete={onFinish} />}
                </div>
            </div>
        </div>
    );
}
