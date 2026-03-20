DROP FUNCTION IF EXISTS public.create_razorpay_order(UUID, UUID, UUID, TEXT, INTEGER, TEXT) CASCADE;

CREATE OR REPLACE FUNCTION public.create_razorpay_order(
    p_user_id UUID,
    p_plan_id UUID,
    p_plan_pricing_id UUID,
    p_razorpay_order_id TEXT,
    p_amount INTEGER,
    p_currency TEXT DEFAULT 'INR'
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_id UUID;
BEGIN
    -- Ensure the user executing this function matches the parameter, unless it is a service connection
    IF auth.uid() IS NOT NULL AND auth.uid() != p_user_id THEN
        RAISE EXCEPTION 'Unauthorized: Session user ID does not match parameter user ID';
    END IF;

    -- Insert the order record atomically
    INSERT INTO public.razorpay_orders (
        user_id, plan_id, plan_pricing_id, razorpay_order_id, amount, currency, status
    ) VALUES (
        p_user_id, p_plan_id, p_plan_pricing_id, p_razorpay_order_id, p_amount, p_currency, 'created'
    ) RETURNING id INTO v_id;

    RETURN v_id;
END;
$$;

-- RLS / Access rules mapping
REVOKE EXECUTE ON FUNCTION public.create_razorpay_order(UUID, UUID, UUID, TEXT, INTEGER, TEXT) FROM public;
GRANT EXECUTE ON FUNCTION public.create_razorpay_order(UUID, UUID, UUID, TEXT, INTEGER, TEXT) TO authenticated, service_role;
