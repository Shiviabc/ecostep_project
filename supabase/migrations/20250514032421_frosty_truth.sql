/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - name (text)
      - email (text, unique)
      - points (integer)
      - streak_days (integer)
      - last_active (timestamp)
      - is_public (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - emissions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - category (text)
      - subcategory (text)
      - value (numeric)
      - unit (text)
      - co2_value (numeric)
      - date (timestamp)
      - details (jsonb)
      - created_at (timestamp)
    
    - achievements
      - id (uuid, primary key)
      - achievement_id (text)
      - name (text)
      - description (text)
      - icon (text)
      - points (integer)
      - criteria (jsonb)
      - created_at (timestamp)
    
    - user_achievements
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - achievement_id (text)
      - date_earned (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table (managed by Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users primary key,
  name text not null,
  points integer default 0,
  streak_days integer default 0,
  last_active timestamptz default now(),
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Emissions table
create table if not exists public.emissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  category text not null,
  subcategory text not null,
  value numeric not null,
  unit text not null,
  co2_value numeric not null,
  date timestamptz default now(),
  details jsonb default '{}',
  created_at timestamptz default now()
);

-- Achievements table
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  achievement_id text unique not null,
  name text not null,
  description text not null,
  icon text not null,
  points integer not null,
  criteria jsonb not null,
  created_at timestamptz default now()
);

-- User achievements table
create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  achievement_id text references achievements(achievement_id) not null,
  date_earned timestamptz default now(),
  created_at timestamptz default now(),
  unique(user_id, achievement_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.emissions enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id);

-- Emissions policies
create policy "Users can view their own emissions"
  on public.emissions
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own emissions"
  on public.emissions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Achievements policies
create policy "Anyone can view achievements"
  on public.achievements
  for select
  to authenticated
  using (true);

-- User achievements policies
create policy "Users can view their own achievements"
  on public.user_achievements
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can earn achievements"
  on public.user_achievements
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Create indexes
create index if not exists emissions_user_id_date_idx on public.emissions(user_id, date);
create index if not exists emissions_user_id_category_date_idx on public.emissions(user_id, category, date);
create index if not exists user_achievements_user_id_idx on public.user_achievements(user_id);