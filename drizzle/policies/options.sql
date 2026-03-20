DROP POLICY IF EXISTS "Enable read access for all users" ON public.options;
DROP POLICY IF EXISTS "Enable all access for service role only" ON public.options;

ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.options FOR SELECT USING (true);
CREATE POLICY "Enable all access for service role only" ON public.options USING (auth.jwt() ->> 'role' = 'service_role');
