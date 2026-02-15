
-- Enable RLS (idempotent if already enabled)
alter table public.settings enable row level security;

-- Drop existing policy if it exists to avoid conflicts
drop policy if exists "Public Read Settings" on public.settings;
drop policy if exists "Enable read access for all users" on public.settings;

-- Create policy allowing everyone to read settings
create policy "Public Read Settings" on public.settings for select using (true);

-- Grant select permission to anon (for Web App) and authenticated (for owner/admin)
grant select on public.settings to anon;
grant select on public.settings to authenticated;
grant select on public.settings to service_role;
