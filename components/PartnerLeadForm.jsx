"use client";

import { useState } from "react";

export default function PartnerLeadForm() {
  const [status, setStatus] = useState("");

  async function submitLead(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("Отправляем...");
    const response = await fetch("/api/partner-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        telegram: form.get("telegram"),
        message: form.get("message"),
      }),
    });
    setStatus(response.ok ? "Заявка отправлена" : "Ошибка отправки");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="backend-form" onSubmit={submitLead}>
      <input name="name" placeholder="Имя" />
      <input name="telegram" placeholder="Telegram" required />
      <textarea name="message" placeholder="Что обсудить?" rows="3" />
      <button className="button primary" type="submit">Отправить</button>
      {status ? <small>{status}</small> : null}
    </form>
  );
}
