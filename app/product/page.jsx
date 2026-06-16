import Link from "next/link";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";
import ProductOrderForm from "@/components/ProductOrderForm";

export const dynamic = "force-dynamic";

export default async function ProductPage({ searchParams }) {
  const params = await searchParams;
  const db = await readDb();
  const products = visible(db.products);
  const categories = visible(db.categories);
  const product = products.find((item) => item.id === params?.id) || products[0];

  if (!product) {
    return (
      <main>
        <section className="section article-page">
          <h1>{"\u0422\u043e\u0432\u0430\u0440 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d"}</h1>
          <Link className="button ghost" href="/shop">{"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u0432 \u043c\u0430\u0433\u0430\u0437\u0438\u043d"}</Link>
        </section>
      </main>
    );
  }

  const category = categories.find((item) => item.id === product.category);
  const name = text(product.name);
  const description = text(product.description || product.text);
  const details = text(product.details || product.longText || product.text || product.description);
  const stockQty = Number(product.stockQty ?? product.stock ?? 10);
  const inStock = product.inStock !== false && stockQty > 0;

  return (
    <main className="product-detail-page">
      <section className="product-detail-hero">
        <div className="product-detail-media">
          {product.image ? (
            <div className="product-image filled-media"><img src={product.image} alt={name} /></div>
          ) : (
            <div className="product-image placeholder-media">{product.badge || "DD"}</div>
          )}
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{text(product.categoryLabel) || text(category?.title) || product.category}</p>
          <h1>{name}</h1>
          <p className="lead">{description}</p>
          <div className="product-detail-meta">
            <span>{text(product.status) || "\u0412 \u043d\u0430\u044f\u0432\u043d\u043e\u0441\u0442\u0456"}</span>
            <span>{inStock ? `${stockQty} \u0448\u0442.` : "\u041d\u0435\u0442 \u0432 \u043d\u0430\u043b\u0438\u0447\u0438\u0438"}</span>
            <strong>${Number(product.price || 0)}</strong>
          </div>
          <div className="hero-actions">
            <ProductOrderForm product={product} compact />
            <Link className="button ghost" href={`/shop?category=${encodeURIComponent(product.category || "")}`}>
              {"\u041d\u0430\u0437\u0430\u0434 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b"}
            </Link>
          </div>
        </div>
      </section>
      <section className="section product-detail-section">
        <div className="section-heading compact">
          <p className="eyebrow">{"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}</p>
          <h2>{"\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"}</h2>
        </div>
        <div className="product-detail-text">{details}</div>
      </section>
    </main>
  );
}
