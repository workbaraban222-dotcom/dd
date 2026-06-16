import CategoryCard from "@/components/CategoryCard";
import TelegramBlock from "@/components/TelegramBlock";
import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";
import { advantages } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

const advantageIcons = ["UP", "QA", "ID", "TD", "AC", "24", "RT", "SM"];

export default async function HomePage() {
  const db = await readDb();
  const { categories, products, news } = db;

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Расходники для арбитража</p>
          <h1>Расходники для арбитража</h1>
          <p className="lead">Аккаунты, сервисы, инструменты и digital-расходники для медиабаеров, Telegram-команд, SMM и трафик-проектов. Быстро. Жирно. Без лишнего шума.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/shop">Смотреть каталог</Link>
            <a className="button ghost" href={db.content.telegramUrl} target="_blank" rel="noreferrer">Написать в Telegram</a>
          </div>
          <div className="promo">
            <span>Промокод на первый заказ</span>
            <strong>{db.content.promoCode}</strong>
          </div>
          <div className="hero-trust">
            <span>Guaranteed quality</span>
            <span>Instant delivery</span>
            <span>Anonymous & secure</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="DOUBLE DAMAGE visual" />
      </section>

      <section className="payment-strip" aria-label="Способы оплаты">
        <article><span>US</span><strong>USDT / CRYPTO</strong><small>TRC20, ERC20, BTC, ETH</small></article>
        <article><span>UA</span><strong>UAH / CARD</strong><small>Перевод на карту</small></article>
        <article><span>%</span><strong>Постоянным клиентам</strong><small>накопительная скидка 5-10%</small></article>
      </section>

      <section className="stats-strip">
        <div><strong>{products.length}</strong><span>позиций в каталоге</span></div>
        <div><strong>24/7</strong><span>поддержка заказов</span></div>
        <div><strong>5</strong><span>лет опыта</span></div>
        <div><strong>10%</strong><span>стартовый промокод</span></div>
      </section>

      <section className="section catalog-section home-category-section">
        <div className="section-heading compact">
          <p className="eyebrow">Каталог</p>
          <h2>Разделы магазина</h2>
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
          <h2>Наши преимущества</h2>
        </div>
        <div className="advantage-grid">
          {advantages.map((item, index) => (
            <article key={item}>
              <span>{advantageIcons[index]}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <TelegramBlock />

      <section className="section home-news-section">
        <div className="section-heading compact">
          <p className="eyebrow">Новости</p>
          <h2>Последние материалы</h2>
        </div>
        <div className="content-grid guides-grid">
          {news.map((item) => (
            <article className="content-card" key={item.id}>
              <div className="content-media placeholder-media">NEWS</div>
              <span className="tag acid">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="button ghost read-more-link" href="/guides">Узнать больше</Link>
            </article>
          ))}
        </div>
      </section>

      <PartnerCta />
    </main>
  );
}
