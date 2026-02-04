-- Function to handle owner activation on email confirmation
CREATE OR REPLACE FUNCTION public.handle_owner_activation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if email was just confirmed
  IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
    -- Update the profile isActive status for this user if they are an owner
    UPDATE public.profiles
    SET "is_active" = true
    WHERE id = NEW.id AND role = 'owner';
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_email_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_email_confirmed
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_owner_activation();
