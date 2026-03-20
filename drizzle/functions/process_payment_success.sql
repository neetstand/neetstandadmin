DROP FUNCTION IF EXISTS public.process_payment_success(UUID, TEXT, TEXT, TEXT, UUID, UUID, INTEGER, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION public.process_payment_success(
    p_user_id UUID,
    p_razorpay_order_id TEXT,
    p_razorpay_payment_id TEXT,
    p_razorpay_signature TEXT,
    p_plan_id UUID,
    p_plan_pricing_id UUID,
    p_mrp_price INTEGER,
    p_paid_price INTEGER,
    p_duration_days INTEGER
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_purchase_id UUID;
    v_start_date TIMESTAMP WITH TIME ZONE := now();
    v_end_date TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Ensure the user executing this function matches the parameter, unless it's a superuser/service role
    -- auth.uid() gives the UUID of the authenticated Supabase user
    IF auth.uid() IS NOT NULL AND auth.uid() != p_user_id THEN
        RAISE EXCEPTION 'Unauthorized: Session user ID does not match parameter user ID';
    END IF;

    -- Calculate the end date based on duration
    v_end_date := v_start_date + (p_duration_days || ' days')::INTERVAL;

    -- 1. Insert into user_plan_purchases
    INSERT INTO public.user_plan_purchases (
        user_id, plan_id, plan_pricing_id, mrp_price, paid_price, currency, start_date, end_date, status
    ) VALUES (
        p_user_id, p_plan_id, p_plan_pricing_id, p_mrp_price, p_paid_price, 'INR', v_start_date, v_end_date, 'active'
    ) RETURNING id INTO v_purchase_id;

    -- 2. Update razorpay_orders
    UPDATE public.razorpay_orders 
    SET status = 'paid', user_purchase_id = v_purchase_id
    WHERE razorpay_order_id = p_razorpay_order_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Razorpay order (%) not found', p_razorpay_order_id;
    END IF;

    -- 3. Insert into razorpay_payments
    INSERT INTO public.razorpay_payments (
        razorpay_payment_id, razorpay_order_id, user_purchase_id, amount, currency, status, razorpay_signature
    ) VALUES (
        p_razorpay_payment_id, p_razorpay_order_id, v_purchase_id, p_paid_price * 100, 'INR', 'paid', p_razorpay_signature
    );

    -- 4. Update profiles legacy flag
    UPDATE public.profiles
    SET has_paid = true
    WHERE id = p_user_id;

    RETURN v_purchase_id;
EXCEPTION
    WHEN OTHERS THEN
        -- Automatic rollback on exception
        RAISE;
END;
$$;
