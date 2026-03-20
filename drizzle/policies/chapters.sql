-- Enable RLS
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Public Read Access on chapters" ON public.chapters;
DROP POLICY IF EXISTS "Service Role Access on chapters" ON public.chapters;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on chapters" 
ON public.chapters 
FOR SELECT 
USING (true);

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on chapters" 
ON public.chapters 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
