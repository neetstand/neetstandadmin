-- Function to lookup user by phone number
-- Returns JSON: { found: boolean, multiple: boolean, email: string (if unique) }
DROP FUNCTION IF EXISTS public.lookup_user_by_phone(text) CASCADE;

CREATE OR REPLACE FUNCTION public.lookup_user_by_phone(p_phone text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
    v_emails text[];
    v_count int;
BEGIN
    -- Normalize phone? Assuming input is normalized or matching exactly for now.
    
    -- Select distinct emails matching phone or metadata phone
    SELECT ARRAY(
        SELECT DISTINCT email 
        FROM auth.users 
        WHERE phone = p_phone 
        OR raw_user_meta_data->>'phone_number' = p_phone
        OR raw_user_meta_data->>'phone' = p_phone
        AND email IS NOT NULL
    ) INTO v_emails;

    v_count := array_length(v_emails, 1);

    IF v_count IS NULL THEN
        RETURN json_build_object('found', false);
    ELSIF v_count = 1 THEN
        RETURN json_build_object(
            'found', true, 
            'multiple', false, 
            'email', v_emails[1]
        );
    ELSE
        -- Multiple emails found
        RETURN json_build_object(
            'found', true, 
            'multiple', true
        );
    END IF;
END;
$$;
