-- Add JSONB columns for the new Commitment and Reality Check application sections.

alter table public.applications
add column if not exists commitment jsonb not null default '{}'::jsonb;

alter table public.applications
add column if not exists reality_check jsonb not null default '{}'::jsonb;
