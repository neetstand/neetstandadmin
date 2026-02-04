-- Enable RLS
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Admins can view roles" ON public.roles;

DROP POLICY IF EXISTS "Admins can manage roles" ON public.roles;
CREATE POLICY "Admins can manage roles" ON public.roles FOR ALL TO authenticated USING (is_app_admin());
