import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/dashboard'

    if (token_hash && type) {
        const supabase = await createClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })

        if (!error) {
            // Upon successful verification:
            // 1. The trigger `on_auth_user_email_confirmed` will fire automatically in DB.
            // 2. The trigger will update `profiles.is_active = true` for the Owner.
            // 3. We redirect to dashboard where middleware will allow access.

            // We explicitly clear the 'next' param to avoid open redirect vulnerabilities, 
            // but here we default to /dashboard or what Supabase sent.
            return NextResponse.redirect(new URL(next, request.url))
        }
    }

    // return the user to an error page with some instructions
    // For now, redirect to login with error
    return NextResponse.redirect(new URL('/login?error=Verification failed', request.url))
}
