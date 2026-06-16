import CategoryCard from "@/components/CategoryCard";
import TelegramBlock from "@/components/TelegramBlock";
import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = await readDb();
  const content = db.content || {};
  const categories = visible(db.categories);
  const products = visible(db.products);
  const news = visible(db.news || db.guides).slice(0, 3);
  const advantages = visible(db.advantages);
  const stats = db.stats?.length ? db.stats : [
    { value: products.length, label: { ua: "\u043f\u043e\u0437\u0438\u0446\u0456\u0439 \u0432 \u043a\u0430\u0442\u0430\u043b\u043e\u0437\u0456" } },
    { value: "24/7", label: { ua: "\u043f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0430 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u044c" } },
    { value: "5", label: { ua: "\u0440\u043e\u043a\u0456\u0432 \u0434\u043e\u0441\u0432\u0456\u0434\u0443" } },
    { value: "10%", label: { ua: "\u0441\u0442\u0430\u0440\u0442\u043e\u0432\u0438\u0439 \u043f\u0440\u043e\u043c\u043e\u043a\u043e\u0434" } },
  ];

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{text(content.heroEyebrow)}</p>
          <h1>{text(content.heroTitle)}</h1>
          <p className="lead">{text(content.heroLead)}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/shop">{"\u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044c \u043a\u0430\u0442\u0430\u043b\u043e\u0433"}</Link>
            <a className="button ghost" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">{"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u0438 \u0432 Telegram"}</a>
          </div>
          <div className="promo">
            <span>{"\u041f\u0440\u043e\u043c\u043e\u043a\u043e\u0434 \u043d\u0430 \u043f\u0435\u0440\u0448\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f"}</span>
            <strong>{content.promoCode || "DAMAGE10"}</strong>
          </div>
          <div className="hero-trust">
            <span>Guaranteed quality</span>
            <span>Instant delivery</span>
            <span>Anonymous & secure</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="DOUBLE DAMAGE visual" />
      </section>

      <section className="payment-strip" aria-label="\u0421\u043f\u043e\u0441\u043e\u0431\u0438 \u043e\u043f\u043b\u0430\u0442\u0438">
        {(db.paymentStrip || []).map((item, index) => (
          <article key={index}>
            <span>{item.icon || item.value || "DD"}</span>
            <strong>{text(item.title)}</strong>
            <small>{text(item.text)}</small>
          </article>
        ))}
      </section>

      <section className="stats-strip">
        {stats.map((item, index) => (
          <div key={index}><strong>{item.value}</strong><span>{text(item.label)}</span></div>
        ))}
      </section>

      <section className="section catalog-section home-category-section" id="catalog">
        <div className="section-heading compact">
          <p className="eyebrow">{"\u041a\u0430\u0442\u0430\u043b\u043e\u0433"}</p>
          <h2>{"\u0420\u043e\u0437\u0434\u0456\u043b\u0438 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0443"}</h2>
        </div>
        <div className="shop-category-grid home-shop-categories">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={products.filter((product) => product.category === category.id).length}
            />
          ))}
        </div>
      </section>

      <section className="section advantages-section">
        <div className="section-heading compact">
          <p className="eyebrow">DOUBLE DAMAGE</p>
          <h2>{"\u041d\u0430\u0448\u0456 \u043f\u0435\u0440\u0435\u0432\u0430\u0433\u0438"}</h2>
        </div>
        <div className="advantage-grid">
          {advantages.map((item, index) => (
            <article key={index}>
              <span>{item.icon || "\u2713"}</span>
              <p>{text(item.text || item.title || item)}</p>
            </article>
          ))}
        </div>
      </section>

      <TelegramBlock content={content} />

      <section className="section work-section">
        <div className="section-heading compact">
          <p className="eyebrow">{"\u041f\u0440\u043e\u0446\u0435\u0441 \u0440\u043e\u0431\u043e\u0442\u0438"}</p>
          <h2>{"\u042f\u043a \u043c\u0438 \u043f\u0440\u0430\u0446\u044e\u0454\u043c\u043e?"}</h2>
          <p>{"\u041f\u0440\u043e\u0441\u0442\u0438\u0439 \u043f\u0440\u043e\u0446\u0435\u0441 \u0432\u0456\u0434 \u0432\u0438\u0431\u043e\u0440\u0443 \u0434\u043e \u043e\u0442\u0440\u0438\u043c\u0430\u043d\u043d\u044f"}</p>
        </div>
        <div className="work-steps">
          {visible(db.workSteps).map((item, index) => (
            <article key={index}>
              <span>{index + 1}</span>
              <h3>{text(item.title)}</h3>
              <p>{text(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section home-news-section">
        <div className="section-heading compact">
          <p className="eyebrow">{"\u041d\u043e\u0432\u0438\u043d\u0438"}</p>
          <h2>{"\u041e\u0441\u0442\u0430\u043d\u043d\u0456 \u043c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0438"}</h2>
        </div>
        <div className="content-grid guides-grid">
          {news.map((item) => (
            <article className="content-card" key={item.id}>
              <div className="content-media placeholder-media">NEWS</div>
              <span className="tag acid">{item.category || "News"}</span>
              <h3>{text(item.title)}</h3>
              <p>{text(item.excerpt || item.text)}</p>
              <Link className="button ghost read-more-link" href="/guides">{"\u0414\u0456\u0437\u043d\u0430\u0442\u0438\u0441\u044f \u0431\u0456\u043b\u044c\u0448\u0435"}</Link>
            </article>
          ))}
        </div>
      </section>

      <PartnerCta content={content} />

      <section className="final-cta">
        <div>
          <p className="eyebrow">{text(content.finalEyebrow) || "Traffic supply"}</p>
          <h2>{text(content.finalTitle) || "\u041f\u043e\u0442\u0440\u0456\u0431\u043d\u0456 \u0440\u043e\u0437\u0445\u0456\u0434\u043d\u0438\u043a\u0438?"}</h2>
          <p>{text(content.finalText) || text(content.heroLead)}</p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" href="/shop" data-hero-catalog>{"\u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044c \u043a\u0430\u0442\u0430\u043b\u043e\u0433"}</Link>
          <a className="button ghost" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">{"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u0438 \u0432 Telegram"}</a>
        </div>
      </section>
    </main>
  );
}
