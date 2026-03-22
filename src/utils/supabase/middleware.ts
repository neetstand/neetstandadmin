import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create an unmodified response first to handle cookie operations
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookieOptions: {
                name: "sb-admin-auth-token",
            },
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) => {
                        // Strip maxAge and expires to make it a session cookie
                        const { maxAge, expires, ...sessionOptions } = options;
                        response.cookies.set(name, value, sessionOptions);
                    })
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Check system status
    // Returns { owner_exists: boolean, owner_active: boolean, superadmin_exists: boolean }
    const { data: systemStatus } = await supabase.rpc('check_system_status')

    const ownerExists = systemStatus?.owner_exists ?? false;
    const ownerActive = systemStatus?.owner_active ?? false;
    const superAdminExists = systemStatus?.superadmin_exists ?? false;

    const path = request.nextUrl.pathname

    // Exclude static assets, api, and _next
    if (
        !path.startsWith('/_next') &&
        !path.startsWith('/static') &&
        !path.startsWith('/api') &&
        !path.includes('.') // exclude files like favicon.ico
    ) {
        // 1. Owner Setup Phase (Not Exists OR Inactive)
        if (!ownerExists || !ownerActive) {
            if (path !== '/setup') {
                const redirectResponse = NextResponse.redirect(new URL('/setup', request.url));
                response.cookies.getAll().forEach(cookie => {
                    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
                });
                return redirectResponse;
            }
        }
        else if (!superAdminExists) {
            // Strict Setup Phase
            // Exclude auth routes from being blocked so the owner can actually log in
            if (path.startsWith('/auth') || path === '/login') {
                // allow
            } else if (!user && path !== '/setup') {
                // Public users are forced to setup/login
                const redirectResponse = NextResponse.redirect(new URL('/setup', request.url));
                response.cookies.getAll().forEach(cookie => {
                    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
                });
                return redirectResponse;
            } else if (user && path !== '/setup' && path !== '/login') {
                // Authenticated Owner is forced to /setup to finish initialization
                const redirectResponse = NextResponse.redirect(new URL('/setup', request.url));
                response.cookies.getAll().forEach(cookie => {
                    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
                });
                return redirectResponse;
            }
        }
        else {
            // Block Setup
            if (path === '/setup') {
                const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.getAll().forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie));
                return redirectResponse;
            }

            // Protected routes pattern: Dashboard AND Root
            if (path.startsWith('/dashboard') || path === '/') {
                if (!user) {
                    const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
                    response.cookies.getAll().forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie));
                    return redirectResponse;
                }
            }

            // Redirect to dashboard if logged in and visiting login or root
            if ((path === '/login' || path === '/') && user) {
                const redirectResponse = NextResponse.redirect(new URL('/dashboard', request.url));
                response.cookies.getAll().forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie));
                return redirectResponse;
            }
        }
    }

    return response
}
