"use client";

import { useState } from "react";
import { transferOwnershipAction } from "@/app/actions/setup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TransferOwnership() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        // Confirmation?
        if (!confirm("Are you sure you want to transfer ownership? This action is irreversible.")) return;

        setLoading(true);
        const res = await transferOwnershipAction(null, formData);
        setLoading(false);

        if (res.success) {
            toast.success("Ownership Transferred!");
            router.refresh();
        } else {
            toast.error(res.error || "Transfer failed");
        }
    }

    if (!isOpen) {
        return (
            <div className="p-6 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-2 text-red-600">Danger Zone</h2>
                <p className="text-gray-600 mb-4">Transfer ownership of the system to another user.</p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Transfer Ownership &rarr;
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded shadow border-l-4 border-red-500">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Transfer Ownership</h2>
            <p className="text-gray-600 mb-4 text-sm">
                Please enter the email of the existing user you wish to transfer ownership to.
                You will be demoted to Super Admin.
            </p>
            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Owner Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder="user@example.com"
                    />
                </div>
                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Confirm Transfer"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
