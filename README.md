# DOUBLE DAMAGE Next + Backend

Готовая Next-версия сайта с серверным API, админкой и базой данных в `data/db.json`.

## Локальный запуск

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

Чтобы защитить сохранение данных на сервере, задай переменную окружения:

```bash
ADMIN_TOKEN=your-password
```

Этот же пароль вводится в поле `ADMIN_TOKEN` внутри админки перед сохранением.

## Где менять данные

- `content` - тексты главной, Telegram-блока, партнерского блока и общие настройки.
- `categories` - категории магазина и подкатегории.
- `products` - товары, цены, фото, наличие, описание.
- `news` - новости.
- `events` - события.
- `partnersList` - партнеры.
- `orders` - заявки покупателей.
- `partnerLeads` - заявки партнеров.

## API

- `GET /api/site` - вся база сайта.
- `PUT /api/site` - сохранить всю базу.
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
