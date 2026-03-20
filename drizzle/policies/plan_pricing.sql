-- Enable RLS
ALTER TABLE public.plan_pricing ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Public Read Access on plan_pricing" ON public.plan_pricing;
DROP POLICY IF EXISTS "Admin Access on plan_pricing" ON public.plan_pricing;
DROP POLICY IF EXISTS "Service Role Access on plan_pricing" ON public.plan_pricing;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on plan_pricing" 
ON public.plan_pricing 
FOR SELECT 
USING (true);

-- 3. "Admin Access"
CREATE POLICY "Admin Access on plan_pricing" 
ON public.plan_pricing 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 4. "Service Role Access"
CREATE POLICY "Service Role Access on plan_pricing" 
ON public.plan_pricing 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
