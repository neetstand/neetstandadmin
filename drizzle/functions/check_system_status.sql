-- Drop the function if it exists
DROP FUNCTION IF EXISTS public.check_system_status() CASCADE;

-- Create the function
CREATE OR REPLACE FUNCTION public.check_system_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    owner_exists boolean;
    owner_active boolean;
    superadmin_exists boolean;
    email_verified boolean;
BEGIN
    -- 1. Check if Owner Profile Exists
    SELECT EXISTS (
        SELECT 1 FROM public.profiles WHERE role = 'owner'
    ) INTO owner_exists;

    -- 2. Check if Owner Email is Verified (Source of Truth: auth.users)
    -- This determines if they should see the 'Verify' screen or the 'Login' screen.
    SELECT EXISTS (
        SELECT 1
        FROM auth.users au
        JOIN public.profiles pp ON pp.id = au.id
        WHERE pp.role = 'owner'
        AND au.email_confirmed_at IS NOT NULL
    ) INTO email_verified;

    -- For the setup wizard, 'owner_active' should mean they have verified their email.
    -- Once verified, they can move to Step 2 (Superadmin setup / Login).
    owner_active := email_verified;

    -- 3. Check if Super Admin Exists:
    -- Case 1: profiles.role = 'superadmin'
    -- Case 2: auth.users.is_super_admin = true
    SELECT EXISTS (
        SELECT 1 FROM public.profiles WHERE role = 'superadmin'
        UNION
        SELECT 1 FROM auth.users WHERE is_super_admin = true
    ) INTO superadmin_exists;

    -- Return JSON object
    RETURN jsonb_build_object(
        'owner_exists',      owner_exists,
        'owner_active',      COALESCE(owner_active, false),
        'superadmin_exists', superadmin_exists,
        'email_verified',    COALESCE(email_verified, false)
    );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.check_system_status() TO anon, authenticated, service_role;
