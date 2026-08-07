-- Messaging: threaded, categorized communication between scholars/donors and admin staff.

create table if not exists public.message_threads (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references public.profiles (id) on delete cascade,
    owner_role public.app_role not null check (owner_role in ('scholar', 'donor')),
    category text not null,
    subject text,
    status text not null default 'open',
    last_message_at timestamptz not null default timezone('utc', now()),
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.messages (
    id uuid primary key default gen_random_uuid(),
    thread_id uuid not null references public.message_threads (id) on delete cascade,
    sender_id uuid not null references public.profiles (id) on delete cascade,
    sender_role public.app_role not null,
    body text not null,
    created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.thread_reads (
    thread_id uuid not null references public.message_threads (id) on delete cascade,
    user_id uuid not null references public.profiles (id) on delete cascade,
    last_read_at timestamptz not null default timezone('utc', now()),
    primary key (thread_id, user_id)
);

create index if not exists message_threads_owner_id_idx on public.message_threads (owner_id);
create index if not exists messages_thread_id_created_at_idx on public.messages (thread_id, created_at);
create index if not exists thread_reads_user_id_idx on public.thread_reads (user_id);

-- Keep thread.last_message_at fresh whenever a message is inserted.
create or replace function public.touch_message_thread()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    update public.message_threads
    set last_message_at = new.created_at,
        updated_at = timezone('utc', now())
    where id = new.thread_id;
    return new;
end;
$$;

drop trigger if exists messages_touch_thread on public.messages;
create trigger messages_touch_thread
after insert on public.messages
for each row
execute function public.touch_message_thread();

drop trigger if exists message_threads_set_updated_at on public.message_threads;
create trigger message_threads_set_updated_at
before update on public.message_threads
for each row
execute function public.set_updated_at();

-- RLS
alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.thread_reads enable row level security;

drop policy if exists "Owners can view their own threads" on public.message_threads;
create policy "Owners can view their own threads"
on public.message_threads
for select
using (auth.uid() = owner_id);

drop policy if exists "Admins and reviewers can view all threads" on public.message_threads;
create policy "Admins and reviewers can view all threads"
on public.message_threads
for select
using (public.is_admin_or_reviewer());

drop policy if exists "Owners can create their own threads" on public.message_threads;
create policy "Owners can create their own threads"
on public.message_threads
for insert
with check (auth.uid() = owner_id and owner_role in ('scholar', 'donor'));

drop policy if exists "Admins and reviewers can update threads" on public.message_threads;
create policy "Admins and reviewers can update threads"
on public.message_threads
for update
using (public.is_admin_or_reviewer());

drop policy if exists "Owners can view messages in their threads" on public.messages;
create policy "Owners can view messages in their threads"
on public.messages
for select
using (
    exists (
        select 1 from public.message_threads t
        where t.id = thread_id and t.owner_id = auth.uid()
    )
);

drop policy if exists "Admins and reviewers can view all messages" on public.messages;
create policy "Admins and reviewers can view all messages"
on public.messages
for select
using (public.is_admin_or_reviewer());

drop policy if exists "Owners can send messages in their threads" on public.messages;
create policy "Owners can send messages in their threads"
on public.messages
for insert
with check (
    sender_id = auth.uid()
    and exists (
        select 1 from public.message_threads t
        where t.id = thread_id and t.owner_id = auth.uid()
    )
);

drop policy if exists "Admins and reviewers can send messages in any thread" on public.messages;
create policy "Admins and reviewers can send messages in any thread"
on public.messages
for insert
with check (sender_id = auth.uid() and public.is_admin_or_reviewer());

drop policy if exists "Users can view their own read state" on public.thread_reads;
create policy "Users can view their own read state"
on public.thread_reads
for select
using (auth.uid() = user_id);

drop policy if exists "Users can set their own read state" on public.thread_reads;
create policy "Users can set their own read state"
on public.thread_reads
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own read state" on public.thread_reads;
create policy "Users can update their own read state"
on public.thread_reads
for update
using (auth.uid() = user_id);

-- Ensure authenticated users can reach these tables through PostgREST.
-- RLS policies above still enforce which rows are visible/writable.
grant usage on schema public to authenticated;

grant select, insert, update
on table public.message_threads
to authenticated;

grant select, insert
on table public.messages
to authenticated;

grant select, insert, update
on table public.thread_reads
to authenticated;
