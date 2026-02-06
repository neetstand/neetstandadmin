"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveEmailSettings } from "@/app/actions/settings";
import { useRouter } from "next/navigation";

// Step 1: Email Configuration
function EmailSetupStep({ onNext }: { onNext: () => void }) {
    const [loading, setLoading] = useState(false);
    const [sendingTest, setSendingTest] = useState(false);
    const [testEmailSent, setTestEmailSent] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            // 1. Save Settings
            const res = await saveEmailSettings(formData);
            if (!res.success) {
                toast.error(res.error || "Failed to save settings");
                setLoading(false);
                return;
            }
            toast.success("Email settings saved!");

            // 2. Trigger Test Email
            handleSendTestEmail();

        } catch (e: any) {
            toast.error("An error occurred");
            setLoading(false);
        }
    }

    async function handleSendTestEmail() {
        setSendingTest(true);
        try {
            // Dynamically import to ensure we aren't bundling server code if not needed, 
            // though sendTestEmail is a server action imported above.
            const { sendTestEmail } = await import("@/app/actions/settings");
            const res = await sendTestEmail();

            if (!res.success) {
                toast.error(res.error || "Failed to send test email. Please check your API key.");
                setSendingTest(false);
                setLoading(false); // Enable form again to fix
                return;
            }

            toast.success("Test email sent!");
            setTestEmailSent(true);
        } catch (e) {
            toast.error("Failed to trigger test email");
        } finally {
            setSendingTest(false);
        }
    }

    if (testEmailSent) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                <div className="bg-green-50 p-6 rounded-md border border-green-100">
                    <h3 className="text-lg font-medium text-green-900 mb-2">Test Email Sent</h3>
                    <p className="text-gray-700">
                        We have sent a test email to your registered address. Please check your inbox to verify the setup.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onNext}
                        className="w-full bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 transition-colors shadow-sm font-medium"
                    >
                        Yes, I got the Email
                    </button>

                    <button
                        onClick={handleSendTestEmail}
                        disabled={sendingTest}
                        className="w-full bg-white text-slate-700 border border-slate-300 py-3 px-4 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                        {sendingTest ? "Sending..." : "Resend Email"}
                    </button>

                    <button
                        onClick={() => { setTestEmailSent(false); setLoading(false); }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                        Go back to edit settings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Step 1: Email Configuration</h2>
                <p className="text-sm text-slate-500">Configure the email service to ensure system emails are delivered.</p>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Provider URL</label>
                    <input
                        name="email_provider_url"
                        type="url"
                        defaultValue="https://api.brevo.com/v3/smtp/email"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                        placeholder="https://api.brevo.com/v3/smtp/email"
                    />
                    <p className="text-xs text-slate-500 mt-1">Currently, integration with Brevo is done. Integration with your choice of email provider is complimentary.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">API Key <span className="text-red-500">*</span></label>
                    <input
                        name="email_api_key"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                        placeholder="xkeysib-..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        disabled={loading || sendingTest}
                        className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                        {(loading || sendingTest) ? "Processing..." : "Save & Verify"}
                    </button>
                </div>
            </form>
        </div>
    );
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

        try {
            const response = await fetch("/api/setup/superadmin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    isMe,
                    email: isMe ? undefined : email,
                    name: isMe ? "Owner (Superadmin)" : name,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to setup");
            }

            toast.success("Super Admin Configured!");
            onComplete(); // Triggers reload or redirect in parent
            router.refresh();

        } catch (error: any) {
            toast.error(error.message || "Error setting up");
        } finally {
            setLoading(false);
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
