# DOUBLE DAMAGE Next + Backend

Полная Next-версия сайта с серверным API.

## Запуск локально

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Запуск на сервере

```bash
npm install
npm run build
npm start
```

## Админка

Админка находится на `/admin`.

Для защиты редактирования на сервере задай переменную:

```bash
ADMIN_TOKEN=your-password
```

Этот же токен вводится в поле `ADMIN_TOKEN` в админке.

## API

- `GET /api/site` - вся база сайта
- `PUT /api/site` - сохранить всю базу
- `GET/POST /api/categories`
- `PUT/DELETE /api/categories/:id`
- `GET/POST /api/products`
- `PUT/DELETE /api/products/:id`
- `GET/POST /api/news`
- `PUT/DELETE /api/news/:id`
- `GET/POST /api/events`
- `PUT/DELETE /api/events/:id`
- `GET/POST /api/orders`
- `GET/POST /api/partner-leads`

Данные лежат в `data/db.json`.
