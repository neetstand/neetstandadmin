drop function if exists public.send_email(text,text,text,text,text);

create or replace function public.send_email(
  to_email text,
  from_email text,
  subject text,
  html_body text
) returns text language plpgsql set search_path = public as $$
declare
  resp jsonb;
  api_key_val text;
  provider_url_val text;
begin
  -- Fetch API Key
  select value into api_key_val from public.settings where variable = 'email_api_key';
  
  -- Fetch Provider URL (Default to Brevo if missing)
  select value into provider_url_val from public.settings where variable = 'email_provider_url';
  
  if provider_url_val is null or provider_url_val = '' then
    provider_url_val := 'https://api.brevo.com/v3/smtp/email';
  end if;

  if api_key_val is null then
    return '{"error": "Missing email_api_key in settings"}';
  end if;

  select net.http_post(
    url := provider_url_val,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'api-key', api_key_val
    ),
    body := jsonb_build_object(
      'sender', jsonb_build_object(
        'name', 'WaHPACT',
        'email', from_email
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
