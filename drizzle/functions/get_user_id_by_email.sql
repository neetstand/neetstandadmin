-- Create a secure function to look up user ID by email
-- This is needed because 'profiles' does not store the email string (auth.users does)
-- and we need to find the user ID to update their password via Admin API.

DROP FUNCTION IF EXISTS public.get_user_id_by_email(text);

create or replace function public.get_user_id_by_email(p_email text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
begin
  select id into uid from auth.users where email = p_email;
  return uid;
end;
$$;

revoke execute on function public.get_user_id_by_email(text) from public;
grant execute on function public.get_user_id_by_email(text) to service_role;
