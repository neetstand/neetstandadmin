import { redirect } from "next/navigation";
import { SetupService } from "@/services/setup";
import LoginForm from "./LoginForm";

import { createClient } from "@/utils/supabase/server";

interface SearchParams {
    code?: string;
    error?: string;
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

    const { error: errorParam } = await searchParams;
    let message = "";
    let isError = false;

    if (errorParam === "invalid_code") {
        message = "Code is invalidated please start the process again.";
        isError = true;
    } else if (errorParam === "confirmed") {
        message = "Thanks for confirming. Please log in.";
    }

    // Determine mode based on active status
    const mode = "login";

    return <LoginForm mode={mode} initialMessage={message} initialIsError={isError} />;
}
