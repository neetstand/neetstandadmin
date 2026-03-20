DROP POLICY IF EXISTS "Enable read access for all users" ON public.questions;
DROP POLICY IF EXISTS "Enable all access for service role only" ON public.questions;

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Enable all access for service role only" ON public.questions USING (auth.jwt() ->> 'role' = 'service_role');
