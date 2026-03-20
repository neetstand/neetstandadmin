import { getAdminChallenges } from "@/actions/challenge";
import ChallengeStatusForm from "./ChallengeStatusForm";

function formatDateTime(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default async function AdminChallengesPage() {
    const response = await getAdminChallenges();
    const rawChallenges = response.data || [];

    const challengesByQuestion = rawChallenges.reduce((acc: any, challenge: any) => {
        if (!acc[challenge.question_id]) {
            acc[challenge.question_id] = {
                ...challenge,
                reports_count: 1,
                user_reports: [{
                    profile: challenge.profiles,
                    created_at: challenge.created_at,
                    issue_type: challenge.issue_type,
                    user_comment: challenge.user_comment
                }]
            };
        } else {
            acc[challenge.question_id].reports_count += 1;
            acc[challenge.question_id].user_reports.push({
                profile: challenge.profiles,
                created_at: challenge.created_at,
                issue_type: challenge.issue_type,
                user_comment: challenge.user_comment
            });
        }
        return acc;
    }, {});

    const groupedChallenges = Object.values(challengesByQuestion) as any[];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Academic SME Challenge Review</h1>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
                    {rawChallenges.length} Issues Reported
                </div>
            </div>

            {groupedChallenges.length === 0 ? (
                <div className="text-center py-24 text-slate-500 bg-white shadow-sm border rounded-xl">
                    No active challenges found. Good job!
                </div>
            ) : (
                <div className="space-y-6">
                    {groupedChallenges.map((item: any) => {
                        const question = item.questions;
                        const subChapter = question?.sub_chapters;
                        const chapter = subChapter?.chapters;

                        let badgeColor = "bg-gray-100 text-gray-800";
                        if (item.status === 'Accepted') badgeColor = "bg-red-100 text-red-800"; // Question incorrect
                        if (item.status === 'Rejected') badgeColor = "bg-green-100 text-green-800"; // Question correct

                        return (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${badgeColor}`}>
                                                {item.status}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-600">
                                                {chapter?.subject} / {chapter?.chapter_name} / {subChapter?.sub_chapter_name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            Reported by <span className="font-semibold text-slate-700">{item.reports_count} {item.reports_count === 1 ? 'user' : 'users'}</span>
                                        </span>
                                    </div>
                                    <div className="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded select-all cursor-pointer">
                                        Q-ID: {item.question_id?.split('-')[0]}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Original Question Content</h4>
                                        <div className="prose max-w-none p-4 rounded bg-slate-50 text-slate-800 font-serif border border-dashed border-slate-200"
                                            dangerouslySetInnerHTML={{ __html: question?.question_text || 'No text found' }} />
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">User Reports ({item.reports_count})</h4>
                                        <div className="flex flex-col gap-3">
                                            {item.user_reports.map((report: any, idx: number) => (
                                                <div key={idx} className="bg-amber-50 rounded border border-amber-100 p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <p className="text-sm font-medium text-amber-900">{report.issue_type || "General Issue"}</p>
                                                        <span className="text-[10px] text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                                                            {report.profile?.full_name || report.profile?.email} • {formatDateTime(report.created_at)}
                                                        </span>
                                                    </div>
                                                    {report.user_comment && (
                                                        <p className="text-sm text-amber-800 italic flex border-l-2 border-amber-300 pl-3">"{report.user_comment}"</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        {question?.options?.map((opt: any) => (
                                            <div key={opt.answer_id} className={`p-3 rounded border ${opt.is_correct ? 'border-green-400 bg-green-50' : 'border-slate-200'}`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`font-bold text-xs ${opt.is_correct ? 'text-green-700' : 'text-slate-500'}`}>Option {opt.answer_id.slice(-1)} {opt.is_correct && "(Correct Answer)"}</span>
                                                </div>
                                                <div className="text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: opt.option_text }} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <ChallengeStatusForm challenge={item} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
