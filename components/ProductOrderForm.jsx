"use client";

import { useState } from "react";

export default function ProductOrderForm({ product }) {
  const [status, setStatus] = useState("");

  async function submitOrder(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("Создаем заказ...");
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: product.id, name: product.name, price: product.price, qty: 1 }],
        contact: {
          telegram: form.get("telegram"),
          name: form.get("name"),
        },
        comment: form.get("comment"),
      }),
    });
    setStatus(response.ok ? "Заказ отправлен" : "Ошибка отправки");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="backend-form product-order-form" onSubmit={submitOrder}>
      <input name="name" placeholder="Имя" />
      <input name="telegram" placeholder="Telegram" required />
      <textarea name="comment" placeholder="Комментарий к заказу" rows="3" />
      <button className="button primary product-detail-buy" type="submit">Купить</button>
      {status ? <small>{status}</small> : null}
    </form>
  );
}
