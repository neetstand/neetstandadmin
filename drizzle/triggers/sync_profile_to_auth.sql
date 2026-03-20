-- Trigger function to handle updating auth.users when profile full_name changes
DROP FUNCTION IF EXISTS public.sync_profile_to_auth() CASCADE;

CREATE OR REPLACE FUNCTION public.sync_profile_to_auth() 
RETURNS TRIGGER AS $$
BEGIN
  -- Only trigger an update if the full_name actually changed
  IF NEW.full_name IS DISTINCT FROM OLD.full_name THEN
      UPDATE auth.users 
      SET raw_user_meta_data = jsonb_set(
          COALESCE(raw_user_meta_data, '{}'::jsonb), 
          '{full_name}', 
          to_jsonb(NEW.full_name)
      )
      WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger
DROP TRIGGER IF EXISTS on_profile_name_update ON public.profiles;

CREATE TRIGGER on_profile_name_update
  AFTER UPDATE OF full_name ON public.profiles
  FOR EACH ROW 
  EXECUTE PROCEDURE public.sync_profile_to_auth();
