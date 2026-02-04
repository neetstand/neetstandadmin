"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, verifyLogin } from "@/app/actions/auth";

interface LoginFormProps {
    mode: "login" | "activation";
}

export default function LoginForm({ mode }: LoginFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialEmail = searchParams.get("email") || "";

    const [email, setEmail] = useState(initialEmail);
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"EMAIL" | "CODE">(initialEmail ? "CODE" : "EMAIL");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (initialEmail && step === "EMAIL") {
            // initial handling
        }
    }, [initialEmail, step]);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            await login(email);
            setStep("CODE");
            setMessage("Code sent to your email.");
        } catch (error: any) {
            setIsError(true);
            setMessage(error.message || "Failed to send code.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            await verifyLogin(email, code);
            router.push("/dashboard");
        } catch (error: any) {
            setIsError(true);
            setMessage(error.message || "Invalid code or login failed.");
            setLoading(false);
        }
    };

    const title = mode === "activation" ? "Owner Activation" : "Admin Login";
    const subtitle = mode === "activation"
        ? "Please login to activate the system."
        : "";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-slate-200">
                <h1 className="text-2xl font-bold mb-2 text-center text-slate-900">{title}</h1>
                {subtitle && <p className="text-sm text-gray-500 text-center mb-6">{subtitle}</p>}
                {!subtitle && <div className="mb-6"></div>}

                {step === "EMAIL" ? (
                    <form onSubmit={handleSendCode} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black focus:ring-slate-500 focus:border-slate-500"
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Sending..." : "Send Code"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                        <div className="text-center mb-4">
                            <span className="text-sm text-gray-500">Code sent to {email}</span>
                            <button
                                type="button"
                                onClick={() => setStep("EMAIL")}
                                className="ml-2 text-sm text-blue-600 hover:underline"
                            >
                                Change
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Enter 8-digit Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black tracking-[0.5em] text-center font-mono text-lg focus:ring-slate-500 focus:border-slate-500"
                                required
                                maxLength={8}
                                placeholder="XXXXXXXX"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Verifying..." : "Verify & Login"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleSendCode({ preventDefault: () => { } } as any);
                            }}
                            disabled={loading}
                            className="w-full text-sm text-gray-600 hover:text-gray-900 mt-2"
                        >
                            Resend Code
                        </button>
                    </form>
                )}

                {message && (
                    <div className={`mt-6 p-3 rounded-md text-sm text-center ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
