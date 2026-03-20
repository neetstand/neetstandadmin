-- Enable RLS
ALTER TABLE public.question_challenges ENABLE ROW LEVEL SECURITY;

-- 1. CLEANUP: Remove previous policies
DROP POLICY IF EXISTS "Admins can view all challenges" ON public.question_challenges;
DROP POLICY IF EXISTS "Users can view own challenges" ON public.question_challenges;
DROP POLICY IF EXISTS "Users can create own challenges" ON public.question_challenges;
DROP POLICY IF EXISTS "Admins can update challenges" ON public.question_challenges;
DROP POLICY IF EXISTS "Unified Challenge Access" ON public.question_challenges;
DROP POLICY IF EXISTS "admin_select_all_challenges" ON public.question_challenges;

-- 2. "Unified Challenge Access" (Single SELECT policy)
-- Covers: Higher roles (Full Access), Regular Users (Own Access)
CREATE POLICY "Unified Challenge Access" ON public.question_challenges
FOR SELECT TO authenticated
USING (
    is_app_admin()                              -- Owners & Superadmins
    OR 
    (SELECT auth.uid()) = user_id               -- The student who reported it
    OR
    EXISTS (                                    -- SMEs assigned as reviewers
        SELECT 1 FROM public.user_roles ur
        JOIN public.roles r ON r.id = ur.role_id
        WHERE ur.user_id = auth.uid()
        AND r.name = 'sme'
    )
);

-- 3. "Users can create own challenges"
CREATE POLICY "Users can create own challenges" ON public.question_challenges
FOR INSERT TO authenticated
WITH CHECK (
    (SELECT auth.uid()) = user_id
);

-- 4. "Admins can update challenges" (Status & SME Comments)
CREATE POLICY "Admins can update challenges" ON public.question_challenges
FOR UPDATE TO authenticated
USING (
    is_app_admin()
    OR
    EXISTS (
        SELECT 1 FROM public.user_roles ur
        JOIN public.roles r ON r.id = ur.role_id
        WHERE ur.user_id = auth.uid()
        AND r.name = 'sme'
    )
)
WITH CHECK (
    is_app_admin()
    OR
    EXISTS (
        SELECT 1 FROM public.user_roles ur
        JOIN public.roles r ON r.id = ur.role_id
        WHERE ur.user_id = auth.uid()
        AND r.name = 'sme'
    )
);
