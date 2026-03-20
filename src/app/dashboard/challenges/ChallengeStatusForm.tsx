"use client";

import { useState } from "react";
import { updateChallengeStatus } from "@/actions/challenge";

export default function ChallengeStatusForm({ challenge }: { challenge: any }) {
    const [status, setStatus] = useState<"Under Review" | "Accepted" | "Rejected">(challenge.status);
    const [comment, setComment] = useState(challenge.sme_comment || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const res = await updateChallengeStatus(challenge.question_id, status, comment);

        setLoading(false);
        if (res.status === "success") {
            setMessage("Status updated successfully.");
            setTimeout(() => setMessage(""), 3000);
        } else {
            setMessage(res.message || "Failed to update status.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 border rounded-lg flex flex-col gap-3 max-w-xl">
            <h4 className="text-sm font-semibold text-slate-700">SME Review Action</h4>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500 font-medium">Status Resolution</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Under Review">Under Review</option>
                    <option value="Accepted">Accepted (Question is Incorrect, Needs Fix)</option>
                    <option value="Rejected">Rejected (Question is Correct as is)</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500 font-medium">SME Comment / Feedback (Visible to User)</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Explain to the student why the question is correct or confirm the error..."
                    className="p-3 border rounded-md text-sm bg-white min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-center gap-4 mt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Updating..." : "Save Resolution"}
                </button>
                {message && <span className="text-sm font-medium text-slate-600">{message}</span>}
            </div>
        </form>
    );
}
