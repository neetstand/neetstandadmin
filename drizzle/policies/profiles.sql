-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all users" ON public.profiles;
DROP POLICY IF EXISTS "Staff can view department users" ON public.profiles;
DROP POLICY IF EXISTS "Staff can view relevant users" ON public.profiles;
DROP POLICY IF EXISTS "Staff can view relevant profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage users" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Staff can view department profiles" ON public.profiles;
DROP POLICY IF EXISTS "Unified View Access" ON public.profiles;
DROP POLICY IF EXISTS "Admins can modify profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

-- 2. "Unified View Access" (Single SELECT policy for performance)
-- Covers: Admins, Own Profile, Department Staff
CREATE POLICY "Unified View Access" ON public.profiles 
FOR SELECT TO authenticated 
USING (
    is_app_admin()                              -- Admins can view all
    OR 
    (select auth.uid()) = id                    -- Users can view own
    OR 
    (                                           -- Staff can view department 
        department_id IS NOT NULL 
        AND 
        department_id = get_user_department_id((select auth.uid())) 
    )
);

-- 3. "Admins can modify profiles" (INSERT, UPDATE, DELETE only)
-- We separate this from SELECT to avoid "Multiple Permissive Policies" on SELECT.
CREATE POLICY "Admins can modify profiles" ON public.profiles 
FOR INSERT TO authenticated 
WITH CHECK (is_app_admin());

CREATE POLICY "Admins can update profiles" ON public.profiles 
FOR UPDATE TO authenticated 
USING (is_app_admin());

CREATE POLICY "Admins can delete profiles" ON public.profiles 
FOR DELETE TO authenticated 
USING (is_app_admin());
