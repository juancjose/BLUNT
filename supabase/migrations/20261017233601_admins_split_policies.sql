drop policy "admins_manage" on public.admins;
create policy "admins_insert" on public.admins for insert to authenticated with check ((select private.is_admin()));
create policy "admins_update" on public.admins for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admins_delete" on public.admins for delete to authenticated using ((select private.is_admin()));
