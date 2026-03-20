-- Enable RLS
ALTER TABLE public.sub_chapters ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Public Read Access on sub_chapters" ON public.sub_chapters;
DROP POLICY IF EXISTS "Service Role Access on sub_chapters" ON public.sub_chapters;
DROP POLICY IF EXISTS "Allow public read access on sub_chapters" ON public.sub_chapters;
DROP POLICY IF EXISTS "Allow full access for service role on sub_chapters" ON public.sub_chapters;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on sub_chapters" 
ON public.sub_chapters 
FOR SELECT 
USING (true);

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on sub_chapters" 
ON public.sub_chapters 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
