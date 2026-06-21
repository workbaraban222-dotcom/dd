# DOUBLE DAMAGE Next

Это Next-версия сайта, собранная 1:1 на основе рабочего `index.html/index.php`.

## Запуск локально

```bash
npm install
npm run dev
```

Открыть:

```text
http://localhost:3000
```

## Запуск на сервере

```bash
npm install
npm run build
npm start
```

## Страницы

- `/` - главная
- `/shop` - магазин
- `/product?id=PRODUCT_ID` - страница товара
- `/article?type=guides&id=ARTICLE_ID` - статья
- `/article?type=events&id=EVENT_ID` - событие
- `/guides` - новости
- `/events` - события
- `/partners` - партнёры
- `/replace` - замена товара
- `/admin` - админка

## Что важно

- Витрина использует те же `store.js`, `script.js`, `styles.css`, что и идеальная HTML/PHP-версия.
- Языки UA/ENG/RU переключаются тем же механизмом.
- Товары открываются через `/product?id=...`.
- Админка оставлена отдельной страницей `/admin`.
- Данные витрины лежат в `public/store.js`.
