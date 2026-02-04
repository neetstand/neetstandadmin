DROP FUNCTION IF EXISTS public.is_maintenance_mode();

CREATE OR REPLACE FUNCTION public.is_maintenance_mode()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    is_maintenance boolean;
BEGIN
    SELECT value INTO is_maintenance
    FROM public.settings
    WHERE variable = 'maintenance_mode';

    RETURN COALESCE(is_maintenance, false);
END;
$$;

-- Grant execute to everyone (anon and authenticated)
GRANT EXECUTE ON FUNCTION public.is_maintenance_mode() TO anon, authenticated, service_role;
