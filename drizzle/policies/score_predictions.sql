DROP POLICY IF EXISTS "Users can view their own predictions" ON public.score_predictions;
DROP POLICY IF EXISTS "Enable all access for service role only" ON public.score_predictions;

ALTER TABLE public.score_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own predictions" ON public.score_predictions 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable all access for service role only" ON public.score_predictions USING (auth.jwt() ->> 'role' = 'service_role');
