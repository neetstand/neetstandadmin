-- 1. Create the new profiles table (structure only first)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    department_id UUID REFERENCES public.departments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. Migrate data from users to profiles
-- We map users.auth_id -> profiles.id
INSERT INTO public.profiles (id, email, full_name, avatar_url, is_active, department_id, created_at, updated_at)
SELECT auth_id, email, full_name, avatar_url, is_active, department_id, created_at, updated_at
FROM public.users
ON CONFLICT (id) DO NOTHING;

-- 3. Update user_roles to point to profiles
-- Current: user_roles.user_id points to users.id (random uuid)
-- Target: user_roles.user_id should point to profiles.id (which is the auth_id)

-- Add a temporary column
ALTER TABLE public.user_roles ADD COLUMN new_user_id UUID;

-- Populate new_user_id by joining with users table
UPDATE public.user_roles ur
SET new_user_id = u.auth_id
FROM public.users u
WHERE ur.user_id = u.id;

-- Delete orphaned user_roles (those that couldn't be mapped)
DELETE FROM public.user_roles WHERE new_user_id IS NULL;

-- Drop old constraint and column
ALTER TABLE public.user_roles DROP CONSTRAINT user_roles_user_id_fkey;
ALTER TABLE public.user_roles DROP CONSTRAINT user_roles_pkey;
ALTER TABLE public.user_roles DROP COLUMN user_id;

-- Rename new column and add constraints
ALTER TABLE public.user_roles RENAME COLUMN new_user_id TO user_id;
ALTER TABLE public.user_roles ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.user_roles ADD PRIMARY KEY (user_id, role_id);

-- 4. Drop the old users table
DROP TABLE public.users CASCADE;

-- 5. Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
