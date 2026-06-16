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
    { value: products.length, label: { ua: "позицій в каталозі" } },
    { value: "24/7", label: { ua: "підтримка замовлень" } },
    { value: "5", label: { ua: "років досвіду" } },
    { value: "10%", label: { ua: "стартовий промокод" } },
  ];

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{text(content.heroEyebrow)}</p>
          <h1>{text(content.heroTitle)}</h1>
          <p className="lead">{text(content.heroLead)}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/shop">Дивитись каталог</Link>
            <a className="button ghost" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">Написати в Telegram</a>
          </div>
          <div className="promo">
            <span>Промокод на перше замовлення</span>
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

      <section className="payment-strip" aria-label="Способи оплати">
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
          <p className="eyebrow">Каталог</p>
          <h2>Розділи магазину</h2>
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
          <h2>Наші переваги</h2>
        </div>
        <div className="advantage-grid">
          {advantages.map((item, index) => (
            <article key={index}>
              <span>{item.icon || "✓"}</span>
              <p>{text(item.text || item.title || item)}</p>
            </article>
          ))}
        </div>
      </section>

      <TelegramBlock content={content} />

      <section className="section work-section">
        <div className="section-heading compact">
          <p className="eyebrow">Процес роботи</p>
          <h2>Як ми працюємо?</h2>
          <p>Простий процес від вибору до отримання</p>
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
          <p className="eyebrow">Новини</p>
          <h2>Останні матеріали</h2>
        </div>
        <div className="content-grid guides-grid">
          {news.map((item) => (
            <article className="content-card" key={item.id}>
              <div className="content-media placeholder-media">NEWS</div>
              <span className="tag acid">{item.category || "News"}</span>
              <h3>{text(item.title)}</h3>
              <p>{text(item.excerpt || item.text)}</p>
              <Link className="button ghost read-more-link" href="/guides">Дізнатися більше</Link>
            </article>
          ))}
        </div>
      </section>

      <PartnerCta content={content} />

      <section className="final-cta">
        <div>
          <p className="eyebrow">{text(content.finalEyebrow) || "Traffic supply"}</p>
          <h2>{text(content.finalTitle) || "Потрібні розхідники?"}</h2>
          <p>{text(content.finalText) || text(content.heroLead)}</p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" href="/shop" data-hero-catalog>Дивитись каталог</Link>
          <a className="button ghost" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">Написати в Telegram</a>
        </div>
      </section>
    </main>
  );
}
