-- RideIE database setup.
-- Paste all of this in Supabase → SQL Editor → New query, then click Run.

-- 1. The table: one row per scooter request.
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  description text not null check (char_length(description) between 1 and 500),
  licence text not null default 'not_sure' check (licence in ('not_sure', 'am', 'b3', 'a')),
  budget_eur integer check (budget_eur is null or budget_eur between 0 and 20000),
  status text not null default 'searching' check (status in ('searching', 'found', 'paperwork', 'delivered')),
  created_at timestamptz not null default now()
);

create index if not exists requests_user_id_idx on public.requests (user_id);

-- 2. Row Level Security: the database itself checks who is asking.
alter table public.requests enable row level security;

-- Logged-in students see only their own requests. Visitors who are not logged in see nothing.
create policy "Students read their own requests"
  on public.requests for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Students can only create requests for themselves, always starting as 'searching'.
create policy "Students create their own requests"
  on public.requests for insert
  to authenticated
  with check ((select auth.uid()) = user_id and status = 'searching');

-- Students can cancel (delete) their own requests while they are still 'searching'.
create policy "Students cancel their own open requests"
  on public.requests for delete
  to authenticated
  using ((select auth.uid()) = user_id and status = 'searching');

-- There is no update policy: only you (from the Supabase dashboard) can change the status.
