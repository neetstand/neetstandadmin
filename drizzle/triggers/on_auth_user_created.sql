-- Trigger function to handle user creation
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
  DECLARE
    v_role_name text;
    v_role_id uuid;
  BEGIN
    -- 1. Determine Role
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'owner') THEN
      v_role_name := 'owner';
    ELSE
      v_role_name := 'user';
    END IF;

    -- 2. Insert into profiles
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
      new.id, 
      new.raw_user_meta_data->>'full_name', 
      new.raw_user_meta_data->>'avatar_url',
      v_role_name
    );

    -- 3. Sync with user_roles (Critical for permissions)
    SELECT id INTO v_role_id FROM public.roles WHERE name = v_role_name;
    
    IF v_role_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role_id)
      VALUES (new.id, v_role_id);
    END IF;

    RETURN new;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
