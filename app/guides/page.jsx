import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const { news } = await readDb();

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Новости</p>
          <h1>Материалы DOUBLE DAMAGE</h1>
        </div>
      </section>
      <section className="section">
        <div className="content-grid guides-grid">
          {news.map((item) => (
            <article className="content-card" key={item.id}>
              <div className="content-media placeholder-media">NEWS</div>
              <span className="tag acid">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
