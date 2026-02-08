"use client";

import { useState } from "react";
import { createSuperAdminAction, sendVerificationEmailAction, confirmEmailVerificationAction } from "@/actions/setup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SuperAdminSetup() {
    const [step, setStep] = useState<1 | 2>(1);

    // Step 1 State: Email Config
    const [emailLoading, setEmailLoading] = useState(false);
    const [subStep, setSubStep] = useState<"form" | "verify">("form");
    const [pendingConfig, setPendingConfig] = useState<{ apiKey: string; siteUrl: string } | null>(null);

    // Step 2 State: Super Admin
    const [adminLoading, setAdminLoading] = useState(false);
    const [isMe, setIsMe] = useState(true);

    const router = useRouter();

    // --------------------------------------------------------
    // Step 1: Email Configuration & Verification
    // --------------------------------------------------------
    async function handleEmailConfigSubmit(formData: FormData) {
        setEmailLoading(true);
        // Verify via Email
        const verifyRes = await sendVerificationEmailAction(null, formData);

        if (verifyRes.success) {
            setPendingConfig({
                apiKey: formData.get("email_api_key") as string,
                siteUrl: formData.get("email_site_url") as string
            });
            setSubStep("verify");
            toast.success("Validation email sent!");
        } else {
            toast.error("Failed to send test email: " + verifyRes.error);
        }
        setEmailLoading(false);
    }

    async function handleEmailConfirm() {
        if (!pendingConfig) {
            toast.error("Configuration lost. Please try again.");
            setSubStep("form");
            return;
        }

        setEmailLoading(true);

        const formData = new FormData();
        formData.append("email_api_key", pendingConfig.apiKey);
        formData.append("email_site_url", pendingConfig.siteUrl);

        const res = await confirmEmailVerificationAction(null, formData);

        if (res.success) {
            toast.success("Email Configuration Verified & Saved!");
            setStep(2); // Proceed to Step 2
        } else {
            toast.error(res.error || "Failed to save settings");
        }
        setEmailLoading(false);
    }

    // --------------------------------------------------------
    // Step 2: Super Admin Setup
    // --------------------------------------------------------
    async function handleAdminSubmit(formData: FormData) {
        setAdminLoading(true);
        const res = await createSuperAdminAction(null, formData);

        if (res.success) {
            toast.success("Super Admin Created & Welcome Email Sent!");
            router.refresh(); // Redirects to dashboard/login
        } else {
            toast.error(res.error || "Failed to create super admin");
        }
        setAdminLoading(false);
    }

    // --------------------------------------------------------
    // UI Render
    // --------------------------------------------------------
    return (
        <div className="max-w-2xl mx-auto mt-10">
            {/* Stepper Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    {/* Progress Bar */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                    <div className={cn("absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300 -z-10", step === 1 ? "w-1/2" : "w-full")}></div>

                    {/* Step 1 Indicator */}
                    <div className="flex flex-col items-center bg-white px-2">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors",
                            step >= 1 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 text-gray-500")}>
                            1
                        </div>
                        <span className={cn("text-sm mt-2 font-medium", step >= 1 ? "text-blue-900" : "text-gray-500")}>Email Setup</span>
                    </div>

                    {/* Step 2 Indicator */}
                    <div className="flex flex-col items-center bg-white px-2">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors",
                            step === 2 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 text-gray-500")}>
                            2
                        </div>
                        <span className={cn("text-sm mt-2 font-medium", step === 2 ? "text-blue-900" : "text-gray-500")}>Super Admin</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200 min-h-[400px]">

                {/* STEP 1 CONTENT */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <h2 className="text-2xl font-bold mb-2 text-slate-800">Email Configuration</h2>
                        <p className="text-gray-600 mb-6">
                            Configure your email service provider. We must verify this first.
                        </p>

                        {/* VERIFY VIEW */}
                        <div className={cn("text-center py-6", subStep === "form" ? "hidden" : "block")}>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4 animate-bounce">
                                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Check your inbox!</h3>
                            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                We sent a test email to the address provided.
                                <br />
                                <strong>Did you receive it?</strong>
                            </p>

                            <div className="flex space-x-4 justify-center">
                                <button
                                    onClick={() => setSubStep("form")}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                                    disabled={emailLoading}
                                >
                                    No, try again
                                </button>
                                <button
                                    onClick={handleEmailConfirm}
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 shadow-sm transition transform active:scale-95"
                                    disabled={emailLoading}
                                >
                                    {emailLoading ? "Saving..." : "Yes, I got it"}
                                </button>
                            </div>
                        </div>

                        {/* FORM VIEW (Always mounted, hidden when validating) */}
                        <form
                            id="email-config-form"
                            action={handleEmailConfigSubmit}
                            className={cn("space-y-6", subStep === "verify" ? "hidden" : "block")}
                            noValidate
                        >
                            {/* Email is inferred from the logged-in owner. No input needed. */}

                            <div className="grid grid-cols-1 gap-4 pt-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Site URL</label>
                                    <input
                                        type="url"
                                        name="email_site_url"
                                        placeholder="https://api.email-provider.com"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email API Key</label>
                                    <input
                                        type="text"
                                        name="email_api_key"
                                        placeholder="sk_..."
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={emailLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                                {emailLoading ? "Sending Test Email..." : "Send Test Email"}
                            </button>
                        </form>
                    </div>
                )}


                {/* STEP 2 CONTENT */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-bold mb-2 text-slate-800">Super Admin Setup</h2>
                        <p className="text-gray-600 mb-6">
                            Create the primary administrator account. A welcome email will be sent.
                        </p>

                        <form action={handleAdminSubmit} className="space-y-6" noValidate>
                            <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-md border border-blue-100">
                                <input
                                    type="checkbox"
                                    name="isMe"
                                    id="isMe"
                                    checked={isMe}
                                    onChange={(e) => setIsMe(e.target.checked)}
                                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isMe" className="font-medium text-blue-900 cursor-pointer select-none">
                                    I am the Super Admin
                                </label>
                            </div>

                            <div className={cn("space-y-4 pt-4 transition-all duration-300 origin-top overflow-hidden", !isMe ? "opacity-100 max-h-96" : "opacity-50 max-h-0 pt-0")}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required={!isMe}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required={!isMe}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={adminLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors"
                            >
                                {adminLoading ? "Creating & Sending Welcome Email..." : "Complete Setup"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
