-- Enable RLS
ALTER TABLE public.sprint_plan_days ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP
DROP POLICY IF EXISTS "Public Read Access on sprint_plan_days" ON public.sprint_plan_days;
DROP POLICY IF EXISTS "Enable read access for all sprint_plan_days" ON public.sprint_plan_days;
DROP POLICY IF EXISTS "Service Role Access on sprint_plan_days" ON public.sprint_plan_days;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on sprint_plan_days" 
ON public.sprint_plan_days 
FOR SELECT 
USING (true);

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on sprint_plan_days" 
ON public.sprint_plan_days 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
