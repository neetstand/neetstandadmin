DROP POLICY IF EXISTS "Users can view and manage their own questions" ON public.user_questions;
DROP POLICY IF EXISTS "Enable all access for service role only" ON public.user_questions;

ALTER TABLE public.user_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and manage their own questions" ON public.user_questions 
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable all access for service role only" ON public.user_questions USING (auth.jwt() ->> 'role' = 'service_role');
