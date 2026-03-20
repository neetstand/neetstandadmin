-- Enable RLS
ALTER TABLE public.sprint_plans ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP
DROP POLICY IF EXISTS "Public Read Access on sprint_plans" ON public.sprint_plans;
DROP POLICY IF EXISTS "Enable read access for all sprint_plans" ON public.sprint_plans;
DROP POLICY IF EXISTS "Service Role Access on sprint_plans" ON public.sprint_plans;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on sprint_plans" 
ON public.sprint_plans 
FOR SELECT 
USING (true);

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on sprint_plans" 
ON public.sprint_plans 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
