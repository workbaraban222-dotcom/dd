-- Запусти этот файл один раз в Supabase: SQL Editor -> New query -> Run.
-- Таблица products, которую ты уже создал, может остаться. Сайт хранит всю
-- структуру админки в одной JSONB-записи таблицы site_db.

create table if not exists public.site_db (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_db enable row level security;

-- Публичные политики намеренно не создаются.
-- Доступ выполняется только сервером Vercel через SUPABASE_SECRET_KEY.
