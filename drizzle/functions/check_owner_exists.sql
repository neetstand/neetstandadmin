-- Function to check if an owner exists in the system
-- SECURITY: definer (runs as creator to bypass RLS if needed, though profiles should be readable)
-- Grants execute to anon/authenticated so middleware/setup page can check it.

DROP FUNCTION IF EXISTS public.check_owner_exists() CASCADE;

CREATE OR REPLACE FUNCTION public.check_owner_exists()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  owner_record record;
  result json;
BEGIN
  SELECT * INTO owner_record
  FROM public.profiles 
  WHERE role = 'owner'
  LIMIT 1;
  
  IF FOUND THEN
    result := json_build_object('exists', true, 'active', COALESCE(owner_record."is_active", false));
  ELSE
    result := json_build_object('exists', false, 'active', false);
  END IF;

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.check_owner_exists() TO anon, authenticated, service_role;
