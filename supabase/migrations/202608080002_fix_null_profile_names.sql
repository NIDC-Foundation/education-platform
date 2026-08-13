-- The previous backfill (202608080001) only matched blank-string names
-- (first_name = ''). Some rows created by the broken trigger may instead
-- have NULL names, which that WHERE clause doesn't catch. Broaden it.

update public.profiles p
set
    email = coalesce(nullif(p.email, ''), au.email, p.email),
    first_name = coalesce(nullif(trim(p.first_name), ''), nullif(trim(au.raw_user_meta_data ->> 'first_name'), ''), 'Applicant'),
    last_name = coalesce(nullif(trim(p.last_name), ''), nullif(trim(au.raw_user_meta_data ->> 'last_name'), ''), 'User')
from auth.users au
where au.id = p.id
  and (
    p.first_name is null or p.first_name = ''
    or p.last_name is null or p.last_name = ''
    or p.email is null or p.email = ''
  );
