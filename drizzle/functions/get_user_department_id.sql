DROP FUNCTION IF EXISTS public.get_user_department_id(uuid);

CREATE OR REPLACE FUNCTION public.get_user_department_id(user_uuid uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (SELECT department_id FROM public.profiles WHERE id = user_uuid);
END;
$$;
