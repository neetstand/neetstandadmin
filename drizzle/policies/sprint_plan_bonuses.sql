-- Enable RLS
ALTER TABLE public.sprint_plan_bonuses ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP
DROP POLICY IF EXISTS "Public Read Access on sprint_plan_bonuses" ON public.sprint_plan_bonuses;
DROP POLICY IF EXISTS "Enable read access for all sprint_plan_bonuses" ON public.sprint_plan_bonuses;
DROP POLICY IF EXISTS "Service Role Access on sprint_plan_bonuses" ON public.sprint_plan_bonuses;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on sprint_plan_bonuses" 
ON public.sprint_plan_bonuses 
FOR SELECT 
USING (true);

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on sprint_plan_bonuses" 
ON public.sprint_plan_bonuses 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
