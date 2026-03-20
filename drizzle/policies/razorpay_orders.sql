-- Enable RLS
ALTER TABLE public.razorpay_orders ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "User Access on razorpay_orders" ON public.razorpay_orders;
DROP POLICY IF EXISTS "User Update on razorpay_orders" ON public.razorpay_orders;
DROP POLICY IF EXISTS "User Insert on razorpay_orders" ON public.razorpay_orders;
DROP POLICY IF EXISTS "Admin Access on razorpay_orders" ON public.razorpay_orders;
DROP POLICY IF EXISTS "Service Role Access on razorpay_orders" ON public.razorpay_orders;

-- 2. "User Access"
CREATE POLICY "User Access on razorpay_orders" 
ON public.razorpay_orders 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 3. "User Update"
CREATE POLICY "User Update on razorpay_orders" 
ON public.razorpay_orders 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 4. "User Insert"
CREATE POLICY "User Insert on razorpay_orders" 
ON public.razorpay_orders 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 5. "Admin Access"
CREATE POLICY "Admin Access on razorpay_orders" 
ON public.razorpay_orders 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 4. "Service Role Access"
CREATE POLICY "Service Role Access on razorpay_orders" 
ON public.razorpay_orders 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
