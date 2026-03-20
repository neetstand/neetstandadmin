-- Enable RLS
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Public Read Access on plans" ON public.plans;
DROP POLICY IF EXISTS "Service Role Access on plans" ON public.plans;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on plans" 
ON public.plans 
FOR SELECT 
USING (true);

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on plans" 
ON public.plans 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
