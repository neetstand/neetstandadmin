-- Enable RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Admins can view departments" ON public.departments;

DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL TO authenticated USING (is_app_admin());
