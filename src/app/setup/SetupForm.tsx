"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setupOwner, resendOwnerOTP, verifyLogin } from "@/app/actions/auth";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface SetupFormProps {
    ownerId?: string;
    superadminRoleId?: string;
    isOwnerSetup?: boolean;
    mode?: "create" | "verify" | "superadmin_setup";
    currentUser?: User | null;
}

export default function SetupForm({ ownerId, superadminRoleId, isOwnerSetup = false, mode = "create", currentUser }: SetupFormProps) {
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
            await resendOwnerOTP(email);
            toast.success(`Verification email resent to ${email}.`);
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
                    toast.success("Logged in successfully.");
                    router.push("/dashboard");
                } else {
                    // Superadmin Setup
                    const response = await fetch("/api/setup/superadmin", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            isMe,
                            email: isMe ? undefined : email,
                            name: isMe ? "Owner (Superadmin)" : name,
                            superadminRoleId
                        }),
                    });

                    if (!response.ok) {
                        const err = await response.json();
                        throw new Error(err.error || "Failed to setup");
                    }

                    toast.success("Super Admin configured!");
                    router.push("/dashboard");
                }
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Error setting up");
        } finally {
            setLoading(false);
        }
    };

    const renderHeader = () => (
        <>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 text-center">Owner Setup</h1>
            <p className="text-gray-600 mb-8 text-center">
                {(mode === "verify" || isVerificationSent)
                    ? "Please verify your ownership."
                    : "Setting up the Owner Account. Please provide your email to begin."}
            </p>
        </>
    );

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

    // Owner Creation OR Login Phase (SuperAdmin Setup but not logged in)
    if (mode === "create" || (mode === "superadmin_setup" && !currentUser)) {
        const isLogin = mode === "superadmin_setup";

        return (
            <div>
                {!isLogin && renderHeader()}
                {isLogin && (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-slate-900 text-center">Admin Login</h1>
                        <p className="text-gray-600 mb-8 text-center">Please login to continue setup.</p>
                    </>
                )}

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
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Processing..." : (isLogin ? "Login" : "Send Verification Email")}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 text-center">Super Admin Setup</h1>
            <p className="text-gray-600 mb-8 text-center">Configure the first Super Admin account.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <input
                        type="checkbox"
                        id="isMe"
                        checked={isMe}
                        onChange={(e) => setIsMe(e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded"
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

