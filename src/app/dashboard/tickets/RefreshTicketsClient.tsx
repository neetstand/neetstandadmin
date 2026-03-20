"use client";

import { useState } from "react";
import { approveRefreshTicket, rejectRefreshTicket } from "@/actions/tickets";
import { toast } from "sonner";
import { Check, X, Mail, Loader2, User, Phone, Calendar, Hash } from "lucide-react";

interface Ticket {
    id: string;
    userId: string;
    email: string | null;
    phone: string | null;
    iteration: number | null;
    status: string | null;
    createdAt: Date | null;
}

export function RefreshTicketsClient({ initialTickets }: { initialTickets: Ticket[] }) {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setLoadingId(id);
        try {
            const res = await approveRefreshTicket(id);
            if (res.success) {
                toast.success("Ticket approved and test refreshed.");
                setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "completed" } : t));
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to approve ticket");
        } finally {
            setLoadingId(null);
        }
    };

    const handleReject = async (id: string) => {
        setLoadingId(id);
        try {
            const res = await rejectRefreshTicket(id);
            if (res.success) {
                toast.success("Ticket rejected.");
                setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "rejected" } : t));
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to reject ticket");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Iteration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{ticket.email || "No Email"}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <Phone className="w-3 h-3" /> {ticket.phone || "No Phone"}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-xs text-gray-500 flex flex-col gap-1">
                                    <span className="flex items-center gap-1 font-mono uppercase">
                                        <Hash className="w-3 h-3" /> ID: {ticket.userId.slice(0, 8)}...
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                {ticket.iteration}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    ticket.status === "completed" ? "bg-green-100 text-green-800" :
                                    ticket.status === "rejected" ? "bg-red-100 text-red-800" :
                                    "bg-yellow-100 text-yellow-800"
                                }`}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {ticket.status === "pending" && (
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleApprove(ticket.id)}
                                            disabled={loadingId === ticket.id}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
                                            title="Approve & Reset Test"
                                        >
                                            {loadingId === ticket.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => handleReject(ticket.id)}
                                            disabled={loadingId === ticket.id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                            title="Reject"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <a
                                            href={`mailto:${ticket.email}?subject=Diagnostic Test Refresh Request`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            title="Send Manual Email"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {tickets.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                No tickets found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
