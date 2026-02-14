drop extension if exists pg_net cascade;
drop schema if exists net cascade;

create extension if not exists pg_net;

drop function if exists public.send_email(text,text,text,text,text);

create or replace function public.send_email(
  to_email text,
  from_email text,
  subject text,
  html_body text
) returns text language plpgsql security definer set search_path = public, net as $$
declare
  resp jsonb;
  api_key_val text;
  provider_url_val text;
  sender_email_val text;
  sender_name_val text;
  final_from_email text;
  final_sender_name text;
begin
  -- Fetch API Key
  select value into api_key_val from public.settings where variable = 'email_api_key';
  
  -- Fetch Provider URL (Default to Brevo if missing)
  select value into provider_url_val from public.settings where variable = 'email_provider_url';
  
  -- Fetch Sender Email
  select value into sender_email_val from public.settings where variable = 'email_sender_email';
  
  -- Fetch Sender Name
  select value into sender_name_val from public.settings where variable = 'email_sender_name';

  if provider_url_val is null or provider_url_val = '' then
    provider_url_val := 'https://api.brevo.com/v3/smtp/email';
  end if;

  if api_key_val is null then
    return '{"error": "Missing email_api_key in settings"}';
  end if;

  -- Logic: Settings > Argument > Default
  final_from_email := coalesce(nullif(sender_email_val, ''), nullif(from_email, ''), 'no-reply@neetstand.com');
  final_sender_name := coalesce(nullif(sender_name_val, ''), 'NEET Stand');

  select net.http_post(
    url := provider_url_val,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'api-key', api_key_val
    ),
    body := jsonb_build_object(
      'sender', jsonb_build_object(
        'name', final_sender_name,
        'email', final_from_email
      ),
      'to', jsonb_build_array(
        jsonb_build_object('email', to_email)
      ),
      'subject', subject,
      'htmlContent', html_body
    )
  ) into resp;

  return resp::text;
end;
$$;

revoke execute on function public.send_email(text,text,text,text) from public;
grant execute on function public.send_email(text,text,text,text) to authenticated;
grant execute on function public.send_email(text,text,text,text) to service_role;