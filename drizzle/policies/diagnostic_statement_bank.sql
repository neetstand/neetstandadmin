-- Enable RLS
ALTER TABLE public.diagnostic_statement_bank ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "Public Read Access on diagnostic_statement_bank" ON public.diagnostic_statement_bank;
DROP POLICY IF EXISTS "Admin Access on diagnostic_statement_bank" ON public.diagnostic_statement_bank;
DROP POLICY IF EXISTS "Service Role Access on diagnostic_statement_bank" ON public.diagnostic_statement_bank;

-- 2. "Public Read Access"
CREATE POLICY "Public Read Access on diagnostic_statement_bank" 
ON public.diagnostic_statement_bank 
FOR SELECT 
USING (true);

-- 3. "Admin Access"
CREATE POLICY "Admin Access on diagnostic_statement_bank" 
ON public.diagnostic_statement_bank 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 4. "Service Role Access"
CREATE POLICY "Service Role Access on diagnostic_statement_bank" 
ON public.diagnostic_statement_bank 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
