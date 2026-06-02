-- Enable Row-Level Security on Lumii-Waitlist tables.
-- API surface (app/api/waitlist/route.ts):
--   Waitlist  : anon INSERT (signup); service-role SELECT for count
--   Referrers : service-role only (lookup + point updates)
-- Service-role bypasses RLS, so the only anon-facing policy needed is INSERT on Waitlist.

alter table public."Waitlist"  enable row level security;
alter table public."Referrers" enable row level security;

drop policy if exists "anon can insert waitlist signups" on public."Waitlist";
create policy "anon can insert waitlist signups"
  on public."Waitlist"
  for insert
  to anon
  with check (true);

-- No anon policies on Referrers; service-role bypass handles all reads/writes.
