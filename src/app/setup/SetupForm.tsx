"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setupOwner, resendOwnerOTP, verifyLogin } from "@/actions/auth";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

import EmailSetupForm from "./EmailSetupForm";

interface SetupFormProps {
    ownerId?: string;
    superadminRoleId?: string;
    isOwnerSetup?: boolean;
    mode?: "create" | "verify" | "email_setup" | "superadmin_setup";
    currentUser?: User | null;
    initialEmailSettings?: any;
}

export default function SetupForm({ ownerId, superadminRoleId, isOwnerSetup = false, mode = "create", currentUser, initialEmailSettings }: SetupFormProps) {
    const [isMe, setIsMe] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    // Password state used for: Owner Creation AND Login
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // If mode is verify, show verification screen
    const [isVerificationSent, setIsVerificationSent] = useState(mode === "verify");

    const router = useRouter();

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            const result = await resendOwnerOTP(email);
            if (result.success && (result as any).message) {
                toast.success((result as any).message);
            } else {
                toast.success(`Verification email resent to ${email}.`);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to resend email.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Custom Validation
        if (!validateEmail(email) && (mode !== "superadmin_setup" || !currentUser)) {
            // Validate email unless we are in superadmin setup AND authenticated (where we might just check "Is Me")
            // Wait, if "Is Me", we don't need email.
            // If Login, we need email.
            if (!currentUser) {
                if (!validateEmail(email)) {
                    toast.error("Please enter a valid email address.");
                    return;
                }
            } else if (!isMe) {
                if (!validateEmail(email)) {
                    toast.error("Please enter a valid email address.");
                    return;
                }
            }
        }

        if (mode === "create" && password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            if (mode === "create") {
                // Owner Creation
                await setupOwner(email, password, "System Owner");
                // Immediately switch to ensure UI updates without reload if possible, 
                // though page might redirect if we didn't prevent it.
                // We stay on page for verification.
                setIsVerificationSent(true);
                toast.success(`Account created! Please verify your email.`);
            } else if (mode === "superadmin_setup") {
                if (!currentUser) {
                    // Login
                    const result = await verifyLogin(email, password);
                    if (!result.success) {
                        toast.error(result.error || "Login failed");
                        return;
                    }
                    sessionStorage.setItem("admin_session", "active");
                    toast.success("Logged in successfully.");
                    router.push("/dashboard");
                } else {
                    // Superadmin Setup
                    // Server action
                    const { setupSuperAdmin } = await import("@/actions/superadmin");
                    const result = await setupSuperAdmin({
                        isMe,
                        email: isMe ? undefined : email,
                        name: isMe ? "Owner (Superadmin)" : name,
                        superadminRoleId
                    });

                    if (!result.success) {
                        throw new Error(result.error || "Failed to setup");
                    }

                    toast.success("Super Admin configured!");
                    // Hard navigation so layout Server Component fully re-executes
                    // with fresh DB state (bypasses Next.js client-side cache).
                    window.location.href = "/dashboard";
                }
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Error setting up");
        } finally {
            setLoading(false);
        }
    };

    const renderHeader = () => {
        const isEmailDone = mode === "superadmin_setup";
        const isEmailActive = mode === "email_setup";
        const isSuperActive = mode === "superadmin_setup";

        // Only show steps after registration is confirmed
        const showSteps = isEmailActive || isSuperActive;

        return (
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-slate-900 text-center">Owner Configuration</h1>
                <p className="text-gray-500 mb-6 text-center text-sm">Follow the steps below to finish setup.</p>
                
                {showSteps && (
                    <div className="flex items-center justify-center space-x-4 mb-2">
                        {/* Step 1: Email Configuration */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                isEmailDone ? "bg-green-500 border-green-500 text-white" : 
                                isEmailActive ? "bg-slate-900 border-slate-900 text-white" : 
                                "bg-white border-slate-200 text-slate-400"
                            }`}>
                                {isEmailDone ? "✓" : "1"}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${
                                isEmailDone || isEmailActive ? "text-slate-900" : "text-slate-400"
                            }`}>Email Setup</span>
                        </div>

                        {/* Line */}
                        <div className={`w-8 h-[2px] mb-6 ${isEmailDone ? "bg-green-500" : "bg-slate-200"}`}></div>

                        {/* Step 2: Superadmin Setup */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                isSuperActive ? "bg-slate-900 border-slate-900 text-white" : 
                                "bg-white border-slate-200 text-slate-400"
                            }`}>
                                2
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${
                                isSuperActive ? "text-slate-900" : "text-slate-400"
                            }`}>Super Admin</span>
                        </div>
                    </div>
                )}

                {/* Legacy text instructions for Create/Verify paths */}
                {!showSteps && (
                     <p className="text-gray-600 text-center">
                        {(mode === "verify" || isVerificationSent)
                            ? "Please verify your ownership via email."
                            : "Provide your email to begin the setup."}
                    </p>
                )}
            </div>
        );
    };

    if (mode === "verify" || isVerificationSent) {
        // ... (existing Check Inbox logic, ensure `handleResend` works)
        return (
            <div>
                {renderHeader()}
                <div className="space-y-6 text-center">
                    <div className="bg-green-50 p-6 rounded-md border border-green-100">
                        <h3 className="text-lg font-medium text-green-900 mb-2">Verification email sent</h3>
                        <p className="text-gray-700">
                            We have sent a verification email to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Sending..." : "Resend verification email"}
                    </button>
                </div>
            </div>
        );
    }

    if (mode === "email_setup") {
        return (
            <div>
                {renderHeader()}
                <EmailSetupForm initialConfig={initialEmailSettings} />
            </div>
        );
    }

    // Owner Creation OR Login Phase (SuperAdmin Setup but not logged in)
    if (mode === "create" || (mode === "superadmin_setup" && !currentUser)) {
        const isLogin = mode === "superadmin_setup";

        return (
            <div>
                {renderHeader()}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black focus:ring-slate-500 focus:border-slate-500"
                            placeholder="owner@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black focus:ring-slate-500 focus:border-slate-500"
                            placeholder={isLogin ? "" : "Min 6 chars"}
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors items-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isLogin ? "Logging in..." : "Sending..."}
                                </>
                            ) : (
                                isLogin ? "Login" : "Send Verification Email"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            {renderHeader()}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <input
                        type="checkbox"
                        id="isMe"
                        checked={isMe}
                        onChange={(e) => setIsMe(e.target.checked)}
                        disabled={loading}
                        className="h-5 w-5 text-blue-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label htmlFor="isMe" className="font-medium text-blue-900">
                        I am the Superadmin
                    </label>
                </div>

                {!isMe && (
                    <div className="space-y-4 pt-4 border-t">
                        <p className="text-sm font-semibold text-gray-700">Invite Superadmin</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                                required={!isMe}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                                required={!isMe}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50"
                >
                    {loading ? "Setting up..." : "Complete Setup"}
                </button>
            </form>
        </div>
    );
}

