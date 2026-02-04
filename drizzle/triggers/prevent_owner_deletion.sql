-- Trigger function to prevent owner deletion
CREATE OR REPLACE FUNCTION public.prevent_owner_deletion()
RETURNS TRIGGER AS $$
BEGIN
  IF old.role = 'owner' THEN
    RAISE EXCEPTION 'Cannot delete the owner account.';
  END IF;
  RETURN old;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS check_owner_deletion ON public.profiles;
CREATE TRIGGER check_owner_deletion
  BEFORE DELETE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.prevent_owner_deletion();
