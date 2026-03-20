-- Enable RLS
ALTER TABLE public.diagnostic_results ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "User Access on diagnostic_results" ON public.diagnostic_results;
DROP POLICY IF EXISTS "User Update on diagnostic_results" ON public.diagnostic_results;
DROP POLICY IF EXISTS "User Insert on diagnostic_results" ON public.diagnostic_results;
DROP POLICY IF EXISTS "Admin Access on diagnostic_results" ON public.diagnostic_results;
DROP POLICY IF EXISTS "Service Role Access on diagnostic_results" ON public.diagnostic_results;

-- 2. "User Access"
CREATE POLICY "User Access on diagnostic_results" 
ON public.diagnostic_results 
FOR SELECT 
TO authenticated 
USING (attempt_id IN (SELECT id FROM public.diagnostic_attempts WHERE user_id = auth.uid()));

-- 3. "User Update"
CREATE POLICY "User Update on diagnostic_results" 
ON public.diagnostic_results 
FOR UPDATE 
TO authenticated 
USING (attempt_id IN (SELECT id FROM public.diagnostic_attempts WHERE user_id = auth.uid())) 
WITH CHECK (attempt_id IN (SELECT id FROM public.diagnostic_attempts WHERE user_id = auth.uid()));

-- 4. "User Insert"
CREATE POLICY "User Insert on diagnostic_results" 
ON public.diagnostic_results 
FOR INSERT 
TO authenticated 
WITH CHECK (attempt_id IN (SELECT id FROM public.diagnostic_attempts WHERE user_id = auth.uid()));

-- 5. "Admin Access"
CREATE POLICY "Admin Access on diagnostic_results" 
ON public.diagnostic_results 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 6. "Service Role Access"
CREATE POLICY "Service Role Access on diagnostic_results" 
ON public.diagnostic_results 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
