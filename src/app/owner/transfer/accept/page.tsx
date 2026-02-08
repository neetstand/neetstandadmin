
import { validateTransferToken, completeTransfer } from "@/app/actions/owner-transfer";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AcceptTransferPage({
    searchParams,
}: {
    searchParams: { token?: string };
}) {
    const token = searchParams.token;
    if (!token) {
        return <ErrorState message="Missing transfer token." />;
    }

    const verification = await validateTransferToken(token);

    if (!verification.valid) {
        return <ErrorState message={verification.error || "Invalid link."} />;
    }

    // Check if user is logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const targetEmail = verification.data.target_email;
    const isCorrectUser = user && user.email === targetEmail;

    async function handleAccept() {
        "use server";
        try {
            await completeTransfer(token!, targetEmail);
        } catch (e: any) {
            // We can't easily catch here in RSC for UI feedback without a client component wrapper,
            // but for simplicity we rely on success redirect or error boundary.
            // Ideally this would be a client component firing the action.
            throw e;
        }
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-slate-900 p-6 text-white text-center">
                    <h1 className="text-2xl font-bold">Accept Ownership</h1>
                    <p className="text-slate-300 mt-2">NeetStand Admin System</p>
                </div>

                <div className="p-8">
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 mb-2">You have been invited to become the new <strong>System Owner</strong>.</p>
                        <p className="text-sm text-gray-500 bg-gray-100 py-2 px-3 rounded inline-block">
                            Target Email: {targetEmail}
                        </p>
                    </div>

                    {!user ? (
                        <div className="text-center space-y-4">
                            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-sm">
                                Please log in with the account <strong>{targetEmail}</strong> to accept this transfer.
                            </div>
                            <Link
                                href={`/login?email=${encodeURIComponent(targetEmail)}&next=${encodeURIComponent(`/owner/transfer/accept?token=${token}`)}`}
                                className="block w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                Log In to Accept
                            </Link>
                        </div>
                    ) : !isCorrectUser ? (
                        <div className="text-center space-y-4">
                            <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm">
                                You are logged in as <strong>{user.email}</strong>, but this transfer is for <strong>{targetEmail}</strong>.
                            </div>
                            <form action={async () => {
                                "use server";
                                const sb = await createClient();
                                await sb.auth.signOut();
                                redirect(`/owner/transfer/accept?token=${token}`);
                            }}>
                                <button className="text-indigo-600 hover:underline">
                                    Sign out and switch account
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm border border-green-200">
                                Ready to accept ownership. This will grant you full control.
                            </div>
                            <form action={handleAccept}>
                                <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm">
                                    Confirm & Accept Ownership
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Transfer Error</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
