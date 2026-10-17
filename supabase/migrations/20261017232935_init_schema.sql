create schema if not exists private;
grant usage on schema private to anon, authenticated;

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.artists (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  slug text unique,
  discipline text,
  discipline_en text,
  bio_es text,
  bio_en text,
  photo_url text,
  city text,
  instagram text,
  email_public text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.works (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  title text not null,
  title_en text,
  medium text,
  medium_en text,
  size text,
  year int,
  price_usd numeric(10,2),
  sold boolean not null default false,
  description text,
  description_en text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index works_artist_id_idx on public.works(artist_id);

-- helper
create or replace function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins a where a.user_id = (select auth.uid()));
$$;
grant execute on function private.is_admin() to anon, authenticated;

alter table public.admins enable row level security;
alter table public.artists enable row level security;
alter table public.works enable row level security;

-- admins
create policy "admins_select_self_or_admin" on public.admins for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));
create policy "admins_manage" on public.admins for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

-- artists
create policy "artists_public_read" on public.artists for select to anon, authenticated
  using (approved or id = (select auth.uid()) or (select private.is_admin()));
create policy "artists_insert_own" on public.artists for insert to authenticated
  with check (id = (select auth.uid()) or (select private.is_admin()));
create policy "artists_update_own" on public.artists for update to authenticated
  using (id = (select auth.uid()) or (select private.is_admin()))
  with check (id = (select auth.uid()) or (select private.is_admin()));
create policy "artists_delete_own" on public.artists for delete to authenticated
  using (id = (select auth.uid()) or (select private.is_admin()));

-- works
create policy "works_read" on public.works for select to anon, authenticated
  using (
    (published and exists (select 1 from public.artists ar where ar.id = artist_id and ar.approved))
    or artist_id = (select auth.uid()) or (select private.is_admin()));
create policy "works_insert_own" on public.works for insert to authenticated
  with check (artist_id = (select auth.uid()) or (select private.is_admin()));
create policy "works_update_own" on public.works for update to authenticated
  using (artist_id = (select auth.uid()) or (select private.is_admin()))
  with check (artist_id = (select auth.uid()) or (select private.is_admin()));
create policy "works_delete_own" on public.works for delete to authenticated
  using (artist_id = (select auth.uid()) or (select private.is_admin()));

-- artists cannot approve themselves
create or replace function private.protect_approved() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_admin() and coalesce(current_setting('request.jwt.claims', true)::jsonb->>'role','') <> 'service_role'
     and current_user in ('authenticated','anon') then
    if tg_op = 'INSERT' then new.approved := false;
    else new.approved := old.approved; end if;
  end if;
  return new;
end $$;
create trigger artists_protect_approved before insert or update on public.artists
  for each row execute function private.protect_approved();

-- on signup: create artist profile; auto-admin for owner email
create or replace function private.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.artists (id, name, email_public)
  values (new.id, coalesce(nullif(new.raw_user_meta_data->>'name',''), split_part(new.email,'@',1)), null)
  on conflict (id) do nothing;
  if lower(new.email) = 'juanjosecaceres95@hotmail.com' then
    insert into public.admins (user_id) values (new.id) on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.handle_new_user();

-- if owner already exists
insert into public.admins (user_id)
  select id from auth.users where lower(email) = 'juanjosecaceres95@hotmail.com'
  on conflict do nothing;

grant select on public.artists, public.works to anon;
grant select, insert, update, delete on public.artists, public.works to authenticated;
grant select on public.admins to authenticated;

-- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('artworks','artworks', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('avatars','avatars', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "own_folder_insert" on storage.objects for insert to authenticated
  with check (bucket_id in ('artworks','avatars') and ((storage.foldername(name))[1] = (select auth.uid())::text or (select private.is_admin())));
create policy "own_folder_update" on storage.objects for update to authenticated
  using (bucket_id in ('artworks','avatars') and ((storage.foldername(name))[1] = (select auth.uid())::text or (select private.is_admin())));
create policy "own_folder_delete" on storage.objects for delete to authenticated
  using (bucket_id in ('artworks','avatars') and ((storage.foldername(name))[1] = (select auth.uid())::text or (select private.is_admin())));
create policy "own_folder_select" on storage.objects for select to authenticated
  using (bucket_id in ('artworks','avatars') and ((storage.foldername(name))[1] = (select auth.uid())::text or (select private.is_admin())));
