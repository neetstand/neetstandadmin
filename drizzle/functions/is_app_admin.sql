-- Function to check if the current user is an admin
DROP FUNCTION IF EXISTS public.is_app_admin();

CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid()
    AND r.name IN ('owner', 'superadmin')
  );
END;
$$;
