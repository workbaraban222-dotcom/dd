# DOUBLE DAMAGE Next.js

Финальная Next.js-версия сайта 1в1 с текущей PHP-версией.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт: `http://localhost:3000`

Админка: `http://localhost:3000/admin`

## Деплой на Vercel

1. Залей папку проекта в GitHub.
2. Импортируй проект в Vercel.
3. Framework: `Next.js`.
4. Build command: `npm run build`.
5. Output менять не нужно.

## База для админки

Локально сайт использует `data/db.json`.

На Vercel файловая система не хранит изменения постоянно, поэтому для рабочей админки подключи Vercel KV или Upstash Redis и добавь переменные:

```env
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

Можно также использовать Upstash-имена:

```env
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

После этого админка сохраняет изменения в общую базу, и их видят все посетители.

## Страницы

- `/`
- `/shop`
- `/product?id=...`
- `/guides`
- `/events`
- `/article?type=guides&id=...`
- `/partners`
- `/replace`
- `/admin`

## Supabase persistence (Vercel)

1. In Supabase open `SQL Editor`, paste `SUPABASE_SETUP.sql`, and run it once.
2. In Vercel Project Settings add these Production environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
3. Redeploy the project.

On the first request, the current `data/db.json` is copied automatically into the
`site_db` table. After that, admin changes are stored permanently in Supabase.
Do not expose `SUPABASE_SECRET_KEY` in frontend code or GitHub.
