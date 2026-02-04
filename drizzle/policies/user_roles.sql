-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Admins can view user_roles" ON public.user_roles;

DROP POLICY IF EXISTS "Admins can manage user_roles" ON public.user_roles;
CREATE POLICY "Admins can manage user_roles" ON public.user_roles FOR ALL TO authenticated USING (is_app_admin());
