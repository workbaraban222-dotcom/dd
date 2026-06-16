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
          <p className="eyebrow">{"\u0417\u0430\u043c\u0456\u043d\u0430 \u0442\u043e\u0432\u0430\u0440\u0443"}</p>
          <h1>{text(content.replacePageTitle) || "\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0437\u0430\u043c\u0456\u043d\u0443 \u0442\u043e\u0432\u0430\u0440\u0443"}</h1>
          <p className="lead">{text(content.replacePageText)}</p>
          <div className="hero-actions">
            <a className="button primary" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">
              {text(content.replaceButtonText) || "\u041e\u043d\u043b\u0430\u0439\u043d \u043f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0430 \u043f\u043e \u0437\u0430\u043c\u0456\u043d\u0456"}
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="content-grid">
          <article className="content-card">
            <span className="tag acid">Example</span>
            <h3>{text(content.replaceExampleTitle) || "\u041f\u0440\u0438\u043a\u043b\u0430\u0434 \u0437\u0430\u044f\u0432\u043a\u0438"}</h3>
            <p>{text(content.replaceExampleText)}</p>
          </article>
          <article className="content-card">
            <span className="tag acid">Terms</span>
            <h3>{text(content.replaceTermsTitle) || "\u0423\u043c\u043e\u0432\u0438 \u0437\u0430\u043c\u0456\u043d\u0438 \u0442\u043e\u0432\u0430\u0440\u0443"}</h3>
            <p>{text(content.replaceTermsText)}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
