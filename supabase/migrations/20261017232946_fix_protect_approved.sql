create or replace function private.protect_approved() returns trigger
language plpgsql security invoker set search_path = '' as $$
declare r text := coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb->>'role', '');
begin
  if r in ('authenticated','anon') and not private.is_admin() then
    if tg_op = 'INSERT' then new.approved := false;
    else new.approved := old.approved; end if;
  end if;
  return new;
end $$;
revoke all on function private.handle_new_user() from public, anon, authenticated;
