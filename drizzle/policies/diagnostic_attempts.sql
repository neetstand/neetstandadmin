-- Enable RLS
ALTER TABLE public.diagnostic_attempts ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "User Access on diagnostic_attempts" ON public.diagnostic_attempts;
DROP POLICY IF EXISTS "User Update on diagnostic_attempts" ON public.diagnostic_attempts;
DROP POLICY IF EXISTS "User Insert on diagnostic_attempts" ON public.diagnostic_attempts;
DROP POLICY IF EXISTS "Admin Access on diagnostic_attempts" ON public.diagnostic_attempts;
DROP POLICY IF EXISTS "Service Role Access on diagnostic_attempts" ON public.diagnostic_attempts;

-- 2. "User Access"
CREATE POLICY "User Access on diagnostic_attempts" 
ON public.diagnostic_attempts 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 3. "User Update"
CREATE POLICY "User Update on diagnostic_attempts" 
ON public.diagnostic_attempts 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 4. "User Insert"
CREATE POLICY "User Insert on diagnostic_attempts" 
ON public.diagnostic_attempts 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 5. "Admin Access"
CREATE POLICY "Admin Access on diagnostic_attempts" 
ON public.diagnostic_attempts 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 6. "Service Role Access"
CREATE POLICY "Service Role Access on diagnostic_attempts" 
ON public.diagnostic_attempts 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
