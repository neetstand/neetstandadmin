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
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
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
                return NextResponse.redirect(new URL('/setup', request.url))
            }
        }
        // 2. Super Admin Setup Phase (Owner Active, but No Super Admin)
        else if (!superAdminExists) {
            // Strict Setup Phase for Public: Block everything except /setup
            // But allow Authenticated User (Owner) to proceed (e.g. to Dashboard)
            if (!user && path !== '/setup') {
                return NextResponse.redirect(new URL('/setup', request.url))
            }
        }
        // 3. System Complete (Super Admin Exists)
        else {
            // Block Setup
            if (path === '/setup') {
                return NextResponse.redirect(new URL('/login', request.url))
            }

            // Protected routes pattern: Dashboard AND Root AND Owner Dashboard
            if (path.startsWith('/dashboard') || path.startsWith('/owner-dashboard') || path === '/') {
                if (!user) {
                    return NextResponse.redirect(new URL('/login', request.url))
                }
            }

            // Redirect to dashboard if logged in and visiting login or root
            if ((path === '/login' || path === '/') && user) {
                // Determine where to redirect based on role is hard in middleware without DB access.
                // However, since we are doing client-side redirect in LoginForm, the LOGIN page visit is less critical.
                // But for Root '/', we need to pick one.
                // Middleware runs on Edge, so no DB access typically unless via API.
                // We'll stick to /dashboard for generic redirect for now, 
                // OR checking user metadata? User metadata has 'role'.

                const role = user.user_metadata?.role;
                if (role === 'owner') {
                    return NextResponse.redirect(new URL('/dashboard', request.url))
                }

                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        }
    }

    return response
}
