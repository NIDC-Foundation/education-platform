-- The live handle_new_user() trigger had drifted from this repo's migrations
-- and was inserting blank first_name/last_name/email into public.profiles
-- regardless of signup metadata, causing the UI to always fall back to a
-- placeholder name (e.g. sidebar showing "John Doe" for every account).
-- This restores the intended trigger and backfills rows it already broke.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id,
        email,
        first_name,
        last_name,
        phone,
        state_of_origin,
        role,
        account_type
    )
    values (
        new.id,
        coalesce(new.email, ''),
        coalesce(nullif(trim(new.raw_user_meta_data ->> 'first_name'), ''), 'Applicant'),
        coalesce(nullif(trim(new.raw_user_meta_data ->> 'last_name'), ''), 'User'),
        new.raw_user_meta_data ->> 'phone',
        new.raw_user_meta_data ->> 'state_of_origin',
        coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'applicant'::public.app_role),
        coalesce((new.raw_user_meta_data ->> 'account_type')::public.app_role, 'applicant'::public.app_role)
    )
    on conflict (id) do update
    set
        email = excluded.email,
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        phone = excluded.phone,
        state_of_origin = excluded.state_of_origin,
        role = excluded.role,
        account_type = excluded.account_type;

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- Create profile rows for auth users who have none at all (trigger never
-- fired for them, or ran before any profiles-creation trigger existed).
insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    phone,
    state_of_origin,
    role,
    account_type
)
select
    au.id,
    coalesce(au.email, ''),
    coalesce(nullif(trim(au.raw_user_meta_data ->> 'first_name'), ''), 'Applicant'),
    coalesce(nullif(trim(au.raw_user_meta_data ->> 'last_name'), ''), 'User'),
    nullif(trim(au.raw_user_meta_data ->> 'phone'), ''),
    nullif(trim(au.raw_user_meta_data ->> 'state_of_origin'), ''),
    case
        when au.raw_user_meta_data ->> 'role' in ('applicant', 'donor', 'scholar', 'admin', 'reviewer', 'partner')
            then (au.raw_user_meta_data ->> 'role')::public.app_role
        else 'applicant'::public.app_role
    end,
    case
        when au.raw_user_meta_data ->> 'account_type' in ('applicant', 'donor', 'scholar', 'admin', 'reviewer', 'partner')
            then (au.raw_user_meta_data ->> 'account_type')::public.app_role
        else 'applicant'::public.app_role
    end
from auth.users au
where not exists (
    select 1
    from public.profiles p
    where p.id = au.id
);

-- Backfill profile rows the broken trigger already created with blank data.
update public.profiles p
set
    email = coalesce(nullif(p.email, ''), au.email, p.email),
    first_name = coalesce(nullif(trim(p.first_name), ''), nullif(trim(au.raw_user_meta_data ->> 'first_name'), ''), 'Applicant'),
    last_name = coalesce(nullif(trim(p.last_name), ''), nullif(trim(au.raw_user_meta_data ->> 'last_name'), ''), 'User')
from auth.users au
where au.id = p.id
  and (p.first_name = '' or p.last_name = '' or p.email is null or p.email = '');
