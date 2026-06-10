-- Run this in the Supabase SQL Editor at supabase.com/dashboard

create extension if not exists "uuid-ossp";

create table if not exists biodatas (
  id text primary key,
  slug text unique not null,
  data jsonb not null default '{}',
  "isPublic" boolean default true,
  "_createdBy" text references auth.users(id) on delete set null,
  "_email" text,
  "_sessionToken" text,
  "_createdAt" timestamptz default now(),
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

alter table biodatas enable row level security;

create policy "Public profiles readable" on biodatas for select using ("isPublic" = true);
create policy "Anyone can insert" on biodatas for insert with check (true);
create policy "Owner can update" on biodatas for update using (auth.uid()::text = "_createdBy");
create policy "Owner can delete" on biodatas for delete using (auth.uid()::text = "_createdBy");

create table if not exists contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  "createdAt" timestamptz default now(),
  read boolean default false
);

alter table contact_submissions enable row level security;
create policy "Anyone can submit" on contact_submissions for insert with check (true);
create policy "Auth users can read" on contact_submissions for select using (auth.role() = 'authenticated');
