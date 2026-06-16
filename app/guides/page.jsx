import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const db = await readDb();
  const news = visible(db.news || db.guides);

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Новини</p>
          <h1>Матеріали DOUBLE DAMAGE</h1>
        </div>
      </section>
      <section className="section">
        <div className="content-grid guides-grid">
          {news.map((item) => (
            <article className="content-card" key={item.id}>
              <div className="content-media placeholder-media">NEWS</div>
              <span className="tag acid">{item.category || "News"}</span>
              <h3>{text(item.title)}</h3>
              <p>{text(item.excerpt || item.text)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
