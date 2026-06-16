"use client";

import { useEffect, useMemo, useState } from "react";

const emptyDb = { categories: [], products: [], news: [], events: [], orders: [], partnerLeads: [] };

export default function AdminPanel() {
  const [token, setToken] = useState("");
  const [db, setDb] = useState(emptyDb);
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState("Загрузка...");

  async function loadDb() {
    const response = await fetch("/api/site", { cache: "no-store" });
    const data = await response.json();
    setDb(data);
    setJsonText(JSON.stringify(data, null, 2));
    setStatus("Данные загружены");
  }

  async function saveDb() {
    try {
      const parsed = JSON.parse(jsonText);
      setStatus("Сохраняем...");
      const response = await fetch("/api/site", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(parsed),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save error");
      setDb(data);
      setJsonText(JSON.stringify(data, null, 2));
      setStatus("Сохранено");
    } catch (error) {
      setStatus(`Ошибка: ${error.message}`);
    }
  }

  useEffect(() => {
    loadDb();
  }, []);

  const stats = useMemo(() => [
    ["Категории", db.categories?.length || 0],
    ["Товары", db.products?.length || 0],
    ["Новости", (db.news || db.guides)?.length || 0],
    ["События", db.events?.length || 0],
    ["Заказы", db.orders?.length || 0],
    ["Заявки", db.partnerLeads?.length || 0],
  ], [db]);

  return (
    <main className="backend-admin">
      <section className="backend-admin-head">
        <div>
          <p className="eyebrow">Backend admin</p>
          <h1>DOUBLE DAMAGE CMS</h1>
          <p>Редактирование живой базы сайта: категории отдельно, товары отдельно, новости, события, заказы и заявки.</p>
        </div>
        <div className="backend-admin-actions">
          <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="ADMIN_TOKEN" />
          <button className="button ghost" type="button" onClick={loadDb}>Обновить</button>
          <button className="button primary" type="button" onClick={saveDb}>Сохранить</button>
        </div>
      </section>

      <section className="backend-admin-stats">
        {stats.map(([label, value]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="backend-admin-grid">
        <div className="backend-editor">
          <div className="backend-panel-title">
            <h2>База данных сайта</h2>
            <span>{status}</span>
          </div>
          <textarea value={jsonText} onChange={(event) => setJsonText(event.target.value)} spellCheck="false" />
        </div>

        <aside className="backend-sidebar">
          <h2>Что где менять</h2>
          <article><strong>categories</strong><span>Категории и подкатегории магазина</span></article>
          <article><strong>products</strong><span>Товары, цены, фото, наличие и описания</span></article>
          <article><strong>content</strong><span>Главная, Telegram, партнерский блок и общие тексты</span></article>
          <h2>Новые заказы</h2>
          {(db.orders || []).slice(0, 6).map((order) => (
            <article key={order.id}>
              <strong>{order.contact?.telegram || "Без Telegram"}</strong>
              <span>{order.items?.[0]?.name || "Заказ"}</span>
              <small>{order.createdAt}</small>
            </article>
          ))}
          <h2>Заявки партнеров</h2>
          {(db.partnerLeads || []).slice(0, 6).map((lead) => (
            <article key={lead.id}>
              <strong>{lead.telegram || "Без Telegram"}</strong>
              <span>{lead.name || "Партнер"}</span>
              <small>{lead.message}</small>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
}
