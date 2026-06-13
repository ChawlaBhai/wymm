-- Run this entire block in Supabase SQL Editor

-- Biodatas: stores the whole biodata object as a single JSONB column
create table if not exists biodatas (
  id text primary key,
  biodata jsonb not null default '{}',
  "isPublic" boolean default true,
  "_createdBy" uuid references auth.users(id) on delete set null,
  "_email" text,
  "_sessionToken" text,
  "_createdAt" timestamptz default now()
);

alter table biodatas enable row level security;

create policy "Public profiles readable" on biodatas for select using ("isPublic" = true or "_createdBy" = auth.uid());
create policy "Anyone can insert" on biodatas for insert with check (true);
create policy "Owner can update" on biodatas for update using ("_createdBy" = auth.uid() or "_sessionToken" is not null);
create policy "Owner can delete" on biodatas for delete using ("_createdBy" = auth.uid());

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  "createdAt" timestamptz default now(),
  read boolean default false
);

alter table contact_submissions enable row level security;
create policy "Anyone can submit contact" on contact_submissions for insert with check (true);
create policy "Auth users read contacts" on contact_submissions for select using (auth.role() = 'authenticated');

-- Fix: ensure upsert works for anonymous seed/demo inserts
drop policy if exists "Owner can update" on biodatas;
create policy "Anyone can upsert" on biodatas for update using (true) with check (true);
