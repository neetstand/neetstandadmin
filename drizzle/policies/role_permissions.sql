-- Enable RLS
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Admins can view role_permissions" ON public.role_permissions;

DROP POLICY IF EXISTS "Admins can manage role_permissions" ON public.role_permissions;
CREATE POLICY "Admins can manage role_permissions" ON public.role_permissions FOR ALL TO authenticated USING (is_app_admin());
