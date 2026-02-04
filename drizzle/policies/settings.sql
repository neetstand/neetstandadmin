-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow full access to Owner and Superadmin
CREATE POLICY "Allow full access to Owner and Superadmin" ON public.settings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            JOIN public.roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND (r.name = 'owner' OR r.name = 'superadmin')
        )
    );

-- Explicitly deny everyone else (implicit in RLS, but for clarity)
-- No other policies.
