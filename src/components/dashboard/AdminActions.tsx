
"use client";

import { useState } from "react";
import { deleteAdmin, updateAdminRole } from "@/actions/admins";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminActionsProps {
    userId: string;
    currentRole: string;
    isActive?: boolean;
    currentUserId: string;
}

export default function AdminActions({ userId, currentRole, isActive, currentUserId }: AdminActionsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRole, setSelectedRole] = useState(currentRole);

    const isSelf = userId === currentUserId;

    if (isSelf) {
        return (
            <span className="text-xs font-medium text-slate-400 italic px-2">
                Cannot edit self
            </span>
        );
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to remove this user? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const res = await deleteAdmin(userId);
            if (!res.success) {
                toast.error(res.error || "Failed to delete user");
            } else {
                toast.success("User deleted successfully");
                router.refresh();
            }
        } catch (e) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRole = async () => {
        setLoading(true);
        try {
            const res = await updateAdminRole(userId, selectedRole);
            if (!res.success) {
                toast.error(res.error || "Failed to update role");
            } else {
                toast.success("Role updated successfully");
                setIsEditing(false);
                router.refresh();
            }
        } catch (e) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 justify-end">
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                >
                    <option value="user">User</option>
                    <option value="superadmin">Superadmin</option>
                    {/* Only show Owner if current user is owner? Logic handled by server, UI can be loose for now */}
                    <option value="owner">Owner</option>
                </select>
                <button
                    onClick={handleUpdateRole}
                    disabled={loading}
                    className="text-xs text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    Save
                </button>
                <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-gray-600 hover:text-gray-900 border border-gray-200 px-2 py-1 rounded"
                >
                    Cancel
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3 justify-end">
            <button
                onClick={() => setIsEditing(true)}
                className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
            >
                Edit Role
            </button>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="text-red-600 hover:text-red-900 font-medium transition-colors disabled:opacity-50"
            >
                {loading ? "Processing..." : "Remove"}
            </button>
        </div>
    );
}
