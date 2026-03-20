-- Enable RLS
ALTER TABLE public.user_plan_purchases ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "User Access on user_plan_purchases" ON public.user_plan_purchases;
DROP POLICY IF EXISTS "User Update on user_plan_purchases" ON public.user_plan_purchases;
DROP POLICY IF EXISTS "User Insert on user_plan_purchases" ON public.user_plan_purchases;
DROP POLICY IF EXISTS "Admin Access on user_plan_purchases" ON public.user_plan_purchases;
DROP POLICY IF EXISTS "Service Role Access on user_plan_purchases" ON public.user_plan_purchases;

-- 2. "User Access"
CREATE POLICY "User Access on user_plan_purchases" 
ON public.user_plan_purchases 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 3. "User Update"
CREATE POLICY "User Update on user_plan_purchases" 
ON public.user_plan_purchases 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 4. "User Insert"
CREATE POLICY "User Insert on user_plan_purchases" 
ON public.user_plan_purchases 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 5. "Admin Access"
CREATE POLICY "Admin Access on user_plan_purchases" 
ON public.user_plan_purchases 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 5. "Service Role Access"
CREATE POLICY "Service Role Access on user_plan_purchases" 
ON public.user_plan_purchases 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
