
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { saveEmailSettings } from "@/app/actions/settings";

interface EmailSettingsProps {
    onSave?: () => void;
    initialUrl?: string;
    hasApiKey?: boolean; // To show if key is set without revealing it
}

export default function EmailSettings({ onSave, initialUrl = "https://api.brevo.com/v3/smtp/email" }: EmailSettingsProps) {
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

            if (onSave) onSave();

        } catch (e: any) {
            toast.error("An error occurred");
            setLoading(false);
        }
    }

    async function handleSendTestEmail() {
        setSendingTest(true);
        try {
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
                        onClick={() => { if (onSave) onSave(); }}
                        className="w-full bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 transition-colors shadow-sm font-medium"
                    >
                        Done / Verify Later
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
                <h2 className="text-lg font-bold text-slate-900 mb-2">Email Configuration</h2>
                <p className="text-sm text-slate-500">Configure the email service to ensure system emails are delivered.</p>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Provider URL</label>
                    <input
                        name="email_provider_url"
                        type="url"
                        defaultValue={initialUrl}
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
