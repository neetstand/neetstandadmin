import { createClient } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // Redirect to setup so the owner can immediately finish superadmin setup
            return NextResponse.redirect(new URL("/setup", request.url));
        }
        console.error("Auth Callback Error:", error.message, error.status);
    }

    // return the user to an error page with instructions
    console.warn("Auth Callback Failed or No Code Found.");
    return NextResponse.redirect(new URL("/login?error=invalid_code", request.url));
}
