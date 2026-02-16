-- Trigger function to handle auth user deletion
-- 1. Prevents deletion of Owner accounts
-- 2. Ensures profile deletion for non-owners (manual cascade)

CREATE OR REPLACE FUNCTION public.handle_delete_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    v_role text;
BEGIN
    -- Check if the user trying to be deleted is an owner (check profiles table)
    SELECT role INTO v_role FROM public.profiles WHERE id = OLD.id;

    IF v_role = 'owner' THEN
        RAISE EXCEPTION 'Cannot delete a user with the Owner role.';
    END IF;

    -- If not an owner, ensure profile is deleted.
    -- (This effectively acts as a cascade if the FK constraint doesn't automatically do it)
    DELETE FROM public.profiles WHERE id = OLD.id;
    
    RETURN OLD;
END;
$$;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  BEFORE DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_delete_user();
