create extension if not exists pgcrypto;
create type public.member_role as enum ('owner', 'manager', 'barber', 'receptionist');
create type public.onboarding_step as enum ('barbershop', 'services', 'team', 'complete');

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.barbershops (
 id uuid primary key default gen_random_uuid(),
 name text not null check (length(trim(name)) between 2 and 120),
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 phone text not null default '', address text not null default '',
 timezone text not null default 'America/Sao_Paulo',
 opening_hours jsonb not null default '{"mon":{"open":"09:00","close":"19:00","closed":false},"tue":{"open":"09:00","close":"19:00","closed":false},"wed":{"open":"09:00","close":"19:00","closed":false},"thu":{"open":"09:00","close":"19:00","closed":false},"fri":{"open":"09:00","close":"19:00","closed":false},"sat":{"open":"09:00","close":"17:00","closed":false},"sun":{"open":"09:00","close":"17:00","closed":true}}'::jsonb,
 onboarding_step public.onboarding_step not null default 'barbershop',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.barbershop_members (
 barbershop_id uuid not null references public.barbershops(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 role public.member_role not null, created_at timestamptz not null default now(),
 primary key (barbershop_id, user_id)
);
create table public.services (
 id uuid primary key default gen_random_uuid(),
 barbershop_id uuid not null references public.barbershops(id) on delete cascade,
 name text not null check (length(trim(name)) between 2 and 100),
 duration_minutes integer not null check (duration_minutes between 5 and 480),
 price numeric(10,2) not null check (price >= 0), active boolean not null default true,
 created_at timestamptz not null default now(), unique (barbershop_id, name)
);
create table public.staff_profiles (
 id uuid primary key default gen_random_uuid(),
 barbershop_id uuid not null references public.barbershops(id) on delete cascade,
 user_id uuid references auth.users(id) on delete set null,
 display_name text not null check (length(trim(display_name)) between 2 and 100),
 role public.member_role not null default 'barber' check (role in ('barber','manager','receptionist')),
 commission_rate numeric(5,2) not null default 0 check (commission_rate between 0 and 100),
 active boolean not null default true,
 created_at timestamptz not null default now(),
 unique (barbershop_id, user_id)
);
create index barbershop_members_user_idx on public.barbershop_members(user_id);
create index services_barbershop_idx on public.services(barbershop_id);
create index staff_profiles_barbershop_idx on public.staff_profiles(barbershop_id);

create function public.is_barbershop_member(target_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
 select exists (select 1 from public.barbershop_members m where m.barbershop_id = target_id and m.user_id = (select auth.uid()))
$$;
create function public.has_barbershop_role(target_id uuid, allowed public.member_role[])
returns boolean language sql stable security definer set search_path = '' as $$
 select exists (select 1 from public.barbershop_members m where m.barbershop_id = target_id and m.user_id = (select auth.uid()) and m.role = any(allowed))
$$;
revoke all on function public.is_barbershop_member(uuid) from public, anon;
revoke all on function public.has_barbershop_role(uuid, public.member_role[]) from public, anon;
grant execute on function public.is_barbershop_member(uuid) to authenticated;
grant execute on function public.has_barbershop_role(uuid, public.member_role[]) to authenticated;

alter table public.profiles enable row level security;
alter table public.barbershops enable row level security;
alter table public.barbershop_members enable row level security;
alter table public.services enable row level security;
alter table public.staff_profiles enable row level security;
create policy "Users read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "Users create own profile" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "Users update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "Members read their shops" on public.barbershops for select to authenticated using (public.is_barbershop_member(id));
create policy "Authenticated users create shops" on public.barbershops for insert to authenticated with check (true);
create policy "Owners and managers update shop" on public.barbershops for update to authenticated using (public.has_barbershop_role(id, array['owner','manager']::public.member_role[])) with check (public.has_barbershop_role(id, array['owner','manager']::public.member_role[]));
create policy "Owners delete shop" on public.barbershops for delete to authenticated using (public.has_barbershop_role(id, array['owner']::public.member_role[]));
create policy "Members read memberships" on public.barbershop_members for select to authenticated using (public.is_barbershop_member(barbershop_id));
create policy "Shop creator adds self as owner" on public.barbershop_members for insert to authenticated with check (user_id = (select auth.uid()) and role = 'owner' and not public.is_barbershop_member(barbershop_id));
create policy "Members read services" on public.services for select to authenticated using (public.is_barbershop_member(barbershop_id));
create policy "Owners managers create services" on public.services for insert to authenticated with check (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[]));
create policy "Owners managers update services" on public.services for update to authenticated using (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[])) with check (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[]));
create policy "Owners managers delete services" on public.services for delete to authenticated using (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[]));
create policy "Members read staff profiles" on public.staff_profiles for select to authenticated using (public.is_barbershop_member(barbershop_id));
create policy "Owners managers create staff profiles" on public.staff_profiles for insert to authenticated with check (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[]));
create policy "Owners managers update staff profiles" on public.staff_profiles for update to authenticated using (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[])) with check (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[]));
create policy "Owners managers delete staff profiles" on public.staff_profiles for delete to authenticated using (public.has_barbershop_role(barbershop_id, array['owner','manager']::public.member_role[]));

create function public.bootstrap_barbershop(shop_name text, shop_slug text, shop_phone text, shop_address text, owner_name text, open_time text, close_time text)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare new_shop_id uuid := gen_random_uuid();
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 insert into public.profiles(id, full_name) values (auth.uid(), trim(owner_name))
 on conflict (id) do update set full_name = excluded.full_name, updated_at = now();
 if open_time !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' or close_time !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' or open_time >= close_time then raise exception 'Invalid business hours'; end if;
 insert into public.barbershops(id, name, slug, phone, address, onboarding_step, opening_hours)
 values (new_shop_id, trim(shop_name), lower(trim(shop_slug)), trim(shop_phone), trim(shop_address), 'services',
 jsonb_build_object('mon',jsonb_build_object('open',open_time,'close',close_time,'closed',false),'tue',jsonb_build_object('open',open_time,'close',close_time,'closed',false),'wed',jsonb_build_object('open',open_time,'close',close_time,'closed',false),'thu',jsonb_build_object('open',open_time,'close',close_time,'closed',false),'fri',jsonb_build_object('open',open_time,'close',close_time,'closed',false),'sat',jsonb_build_object('open',open_time,'close',close_time,'closed',false),'sun',jsonb_build_object('open',open_time,'close',close_time,'closed',true)));
 insert into public.barbershop_members(barbershop_id, user_id, role) values (new_shop_id, auth.uid(), 'owner');
 return new_shop_id;
end
$$;
grant execute on function public.bootstrap_barbershop(text,text,text,text,text,text,text) to authenticated;
revoke all on function public.bootstrap_barbershop(text,text,text,text,text,text,text) from public, anon;

create function public.advance_onboarding(target_shop uuid, next_step public.onboarding_step)
returns void language plpgsql security invoker set search_path = '' as $$
begin
 update public.barbershops set onboarding_step = next_step, updated_at = now()
 where id = target_shop and public.has_barbershop_role(target_shop, array['owner','manager']::public.member_role[]);
 if not found then raise exception 'Shop not found or insufficient access'; end if;
end
$$;
grant execute on function public.advance_onboarding(uuid, public.onboarding_step) to authenticated;
revoke all on function public.advance_onboarding(uuid, public.onboarding_step) from public, anon;

create function public.finish_onboarding(target_shop uuid, staff_name text default null, staff_role public.member_role default 'barber', commission numeric default 0)
returns void language plpgsql security invoker set search_path = '' as $$
begin
 if not public.has_barbershop_role(target_shop, array['owner','manager']::public.member_role[]) then raise exception 'Shop not found or insufficient access'; end if;
 if staff_name is not null and length(trim(staff_name)) > 0 then
  if length(trim(staff_name)) < 2 or staff_role not in ('barber','manager','receptionist') or commission < 0 or commission > 100 then raise exception 'Invalid staff profile'; end if;
  insert into public.staff_profiles(barbershop_id, display_name, role, commission_rate) values (target_shop, trim(staff_name), staff_role, commission);
 end if;
 update public.barbershops set onboarding_step = 'complete', updated_at = now() where id = target_shop;
end
$$;
grant execute on function public.finish_onboarding(uuid,text,public.member_role,numeric) to authenticated;
revoke all on function public.finish_onboarding(uuid,text,public.member_role,numeric) from public, anon;
