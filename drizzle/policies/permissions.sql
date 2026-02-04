-- Enable RLS
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Admins can view permissions" ON public.permissions;

DROP POLICY IF EXISTS "Admins can manage permissions" ON public.permissions;
CREATE POLICY "Admins can manage permissions" ON public.permissions FOR ALL TO authenticated USING (is_app_admin());
