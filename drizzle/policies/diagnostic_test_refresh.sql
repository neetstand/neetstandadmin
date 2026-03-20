-- Enable RLS
ALTER TABLE public.diagnostic_test_refresh ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Unified View Access" ON public.diagnostic_test_refresh;
DROP POLICY IF EXISTS "Users can insert own requests" ON public.diagnostic_test_refresh;
DROP POLICY IF EXISTS "Admins can manage requests" ON public.diagnostic_test_refresh;

-- 2. SELECT Policy
-- Users can see their own requests. Admins can see all.
CREATE POLICY "Unified View Access" ON public.diagnostic_test_refresh 
FOR SELECT TO authenticated 
USING (
    is_app_admin()                              -- Admins can view all
    OR 
    (select auth.uid()) = user_id               -- Users can view own
);

-- 3. INSERT Policy
-- Users can only insert requests for themselves.
CREATE POLICY "Users can insert own requests" ON public.diagnostic_test_refresh 
FOR INSERT TO authenticated 
WITH CHECK (
    (select auth.uid()) = user_id
);

-- 4. Admin Management (UPDATE, DELETE)
-- Admins can manage the status and other fields.
CREATE POLICY "Admins can manage requests" ON public.diagnostic_test_refresh 
FOR ALL TO authenticated 
USING (is_app_admin());
