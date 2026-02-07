import { redirect } from "next/navigation";
import { SetupService } from "@/services/setup";
import LoginForm from "./LoginForm";

import { createClient } from "@/utils/supabase/server";

interface SearchParams {
    code?: string;
}

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const status = await SetupService.getOwnerStatus();

    // If owner does not exist, force setup
    if (!status.exists) {
        redirect("/setup");
    }

    const { code } = await searchParams;
    let message = "";
    let isError = false;

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            message = "Code is invalidated please start the process again.";
            isError = true;
        } else {
            message = "Thanks for confirming.";
            // Ideally we could redirect to dashboard, but user asked for message.
            // However, after confirming, they should probably be logged in. 
            // Let's redirect to dashboard if success? Or just show message on login form?
            // "Thanks for confirming" implies they are done. 
            // If they are logged in, the LoginForm usually redirects to dashboard or shows logged in state.
            // Let's pass the message to the form.
        }
    }

    // Determine mode based on active status
    const mode = "login";

    return <LoginForm mode={mode} initialMessage={message} initialIsError={isError} />;
}
