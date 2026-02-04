drop function if exists public.send_email(text,text,text,text,text);

create or replace function public.send_email(
  api_key text,
  to_email text,
  from_email text,
  subject text,
  html_body text
) returns text language plpgsql set search_path = public as $$
declare
  resp jsonb;
begin
  select net.http_post(
    url := 'https://api.brevo.com/v3/smtp/email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'api-key', api_key
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

revoke execute on function public.send_email(text,text, text, text, text) from public;
grant execute on function public.send_email(text,text, text, text, text) to authenticated;
