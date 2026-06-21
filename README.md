# DOUBLE DAMAGE Next

Next-version of the DOUBLE DAMAGE site.

## Local run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Server run

```bash
npm install
npm run build
npm start
```

## Pages

- `/` - home
- `/shop` - shop
- `/product?id=PRODUCT_ID` - product page
- `/article?type=guides&id=ARTICLE_ID` - news article
- `/article?type=events&id=EVENT_ID` - event article
- `/guides` - news
- `/events` - events
- `/partners` - partners
- `/replace` - replacement page
- `/admin` - admin panel

## Backend And Admin

- The public site loads shared data from `/api/site`.
- The admin panel saves changes to `data/db.json` through `/api/site`.
- Changes made in `/admin` are visible to all visitors after saving.
- The server process must have write access to `data/db.json`.
- `public/store.js` is only fallback/default data if the backend is unavailable.

## Notes

- Languages: UA / ENG / RU.
- Product links use `/product?id=...`.
- News and events open in the same tab through `/article`.
