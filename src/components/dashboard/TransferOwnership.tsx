"use client";

import { useState } from "react";
import { initiateTransfer } from "@/app/actions/owner-transfer";
import { toast } from "sonner";

export default function TransferOwnership() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        if (!confirm(`Are you sure you want to transfer ownership to ${email}? You will lose Owner privileges immediately upon their acceptance. You will become a Super Admin.`)) {
            return;
        }

        setLoading(true);
        try {
            await initiateTransfer(email);
            toast.success("Transfer initiated. An email has been sent to the new owner.");
            setIsOpen(false);
            setEmail("");
        } catch (error: any) {
            toast.error(error.message || "Failed to initiate transfer");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Owner Transfer</h2>
                        <p className="text-sm text-slate-600">Transfer system ownership. You will be demoted to Super Admin.</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-md border border-red-200 hover:bg-red-100 font-medium text-sm transition-colors"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Owner Transfer</h2>
            <p className="text-sm text-slate-600 mb-6">
                Transfer full system ownership to another user. This action is irreversible by you once accepted.
            </p>

            <form onSubmit={handleTransfer} className="bg-slate-50 p-4 rounded-md border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">New Owner Email</label>
                <div className="flex gap-3">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter.email@example.com"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                        {loading ? "Sending..." : "Send Invite"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-slate-500 px-3 py-2 hover:text-slate-700 text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
