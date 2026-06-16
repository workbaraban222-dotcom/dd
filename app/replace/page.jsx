import { readDb } from "@/lib/db";
import { text } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function ReplacePage() {
  const db = await readDb();
  const content = db.content || {};

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Заміна товару</p>
          <h1>{text(content.replacePageTitle) || "Заявка на заміну товару"}</h1>
          <p className="lead">{text(content.replacePageText)}</p>
          <div className="hero-actions">
            <a className="button primary" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">
              {text(content.replaceButtonText) || "Онлайн підтримка по заміні"}
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="content-grid">
          <article className="content-card">
            <span className="tag acid">Example</span>
            <h3>{text(content.replaceExampleTitle) || "Приклад заявки"}</h3>
            <p>{text(content.replaceExampleText)}</p>
          </article>
          <article className="content-card">
            <span className="tag acid">Terms</span>
            <h3>{text(content.replaceTermsTitle) || "Умови заміни товару"}</h3>
            <p>{text(content.replaceTermsText)}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
