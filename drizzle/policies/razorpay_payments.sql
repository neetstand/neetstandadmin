-- Enable RLS
ALTER TABLE public.razorpay_payments ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove all previous policies
DROP POLICY IF EXISTS "User Insert on razorpay_payments" ON public.razorpay_payments;
DROP POLICY IF EXISTS "Admin Access on razorpay_payments" ON public.razorpay_payments;
DROP POLICY IF EXISTS "Service Role Access on razorpay_payments" ON public.razorpay_payments;

-- 2. "User Insert"
CREATE POLICY "User Insert on razorpay_payments"
ON public.razorpay_payments
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.razorpay_orders 
    WHERE public.razorpay_orders.razorpay_order_id = razorpay_order_id 
    AND public.razorpay_orders.user_id = auth.uid()
  )
);

-- 3. "Admin Access"
CREATE POLICY "Admin Access on razorpay_payments" 
ON public.razorpay_payments 
FOR ALL 
TO authenticated 
USING (is_app_admin()) 
WITH CHECK (is_app_admin());

-- 3. "Service Role Access"
CREATE POLICY "Service Role Access on razorpay_payments" 
ON public.razorpay_payments 
FOR ALL 
TO service_role 
USING (true) WITH CHECK (true);
