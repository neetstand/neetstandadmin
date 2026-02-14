
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveEmailSettings, sendTestEmail, verifyEmailSetup, type EmailSettings } from "@/actions/settings";

export default function EmailSetupForm({ initialConfig }: { initialConfig?: Partial<EmailSettings> }) {
    const [loading, setLoading] = useState(false);
    const [testing, setTesting] = useState(false);

    const [formData, setFormData] = useState<EmailSettings>({
        apiKey: initialConfig?.apiKey || "",
        providerUrl: initialConfig?.providerUrl || "https://api.brevo.com/v3/smtp/email",
        senderEmail: initialConfig?.senderEmail || "",
        senderName: initialConfig?.senderName || "System Admin",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await saveEmailSettings(formData);
            if (result.success) {
                toast.success("Email settings saved. Now click 'Save & Send Test Email' to verify.");
                // window.location.reload(); // Do not reload, stay to verify
            } else {
                toast.error(result.error || "Failed to save settings.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const [confirmationReady, setConfirmationReady] = useState(false);

    const handleTestEmail = async () => {
        setTesting(true);
        console.log("Starting Test Email Flow...");
        try {
            // 1. Save Settings First
            const saveResult = await saveEmailSettings(formData);
            console.log("Save Result:", saveResult);
            if (!saveResult.success) {
                toast.error(saveResult.error || "Failed to save settings.");
                return;
            }

            // 2. Send Test Email
            const result = await sendTestEmail();
            console.log("Send Email Result:", result);

            if (result.success) {
                toast.success("Test email sent! Please check your inbox.");
                setConfirmationReady(true);
            } else {
                toast.error("Failed to send test email: " + result.error);
            }
        } catch (error) {
            console.error("Handle Test Email Error:", error);
            toast.error("Error sending test email.");
        } finally {
            setTesting(false);
        }
    };

    const handleProceed = async () => {
        const result = await verifyEmailSetup();
        if (result.success) {
            toast.success("Email configuration confirmed!");
            window.location.reload();
        } else {
            toast.error("Failed to confirm setup. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900">Step 1: Email Configuration</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Enter your email provider details (e.g., Brevo API Key) to enable system emails.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">API Key</label>
                    <input
                        name="apiKey"
                        type="password"
                        required
                        value={formData.apiKey}
                        onChange={handleChange}
                        placeholder="xkeysib-..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Get your key from <a href="https://app.brevo.com/settings/keys/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Brevo API Keys</a>.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Provider URL</label>
                    <input
                        name="providerUrl"
                        type="text"
                        required
                        value={formData.providerUrl}
                        onChange={handleChange}
                        placeholder="https://api.brevo.com/v3/smtp/email"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sender Email</label>
                        <input
                            name="senderEmail"
                            type="email"
                            required
                            value={formData.senderEmail}
                            onChange={handleChange}
                            placeholder="no-reply@example.com"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sender Name</label>
                        <input
                            name="senderName"
                            type="text"
                            required
                            value={formData.senderName}
                            onChange={handleChange}
                            placeholder="System Admin"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black text-sm"
                        />
                    </div>
                </div>

                <div className="pt-4 flex flex-col space-y-3">
                    {!confirmationReady ? (
                        <>
                            <button
                                type="button"
                                onClick={handleTestEmail}
                                disabled={testing || loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none"
                            >
                                {testing ? "Sending Test..." : "Save & Send Test Email"}
                            </button>
                        </>
                    ) : (
                        <div className="space-y-3 p-4 bg-green-50 border border-green-200 rounded-md">
                            <div className="text-center">
                                <p className="text-green-800 font-medium mb-1">Email Sent Successfully</p>
                                <p className="text-green-600 text-sm">Please check your inbox for the confirmation email.</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleProceed}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                            >
                                Yes, I received the email
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmationReady(false)}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                                No, I did not receive the email
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
