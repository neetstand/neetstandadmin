-- Drop the function if it exists
DROP FUNCTION IF EXISTS public.check_system_status();

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
    -- Check if Owner Exists
    SELECT EXISTS (
        SELECT 1 FROM public.profiles WHERE role = 'owner'
    ) INTO owner_exists;

    -- Check if Owner is Active
    SELECT EXISTS (
        SELECT 1 FROM public.profiles WHERE role = 'owner' AND is_active = true
    ) INTO owner_active;

    -- Check if Super Admin Exists
    SELECT EXISTS (
        SELECT 1 FROM public.profiles WHERE role = 'superadmin'
    ) INTO superadmin_exists;

    -- Check if Email is Verified (Source of Truth: auth.users for Owner)
    -- We join profiles to find the owner, then check auth.tokens/users
    SELECT EXISTS (
        SELECT 1 
        FROM auth.users au
        JOIN public.profiles pp ON pp.id = au.id
        WHERE pp.role = 'owner' 
        AND au.email_confirmed_at IS NOT NULL
    ) INTO email_verified;

    -- Return JSON object
    RETURN jsonb_build_object(
        'owner_exists', owner_exists,
        'owner_active', COALESCE(owner_active, false),
        'superadmin_exists', superadmin_exists,
        'email_verified', COALESCE(email_verified, false)
    );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.check_system_status() TO anon, authenticated, service_role;
