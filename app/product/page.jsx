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
  const category = categories.find((item) => item.id === product?.category);
  const name = text(product?.name);
  const description = text(product?.description || product?.text);
  const longText = text(product?.longText || product?.details || product?.text || product?.description);
  const stockQty = Number(product?.stockQty ?? product?.stock ?? 10);

  return (
    <main className="product-detail-page">
      <section className="product-detail-hero">
        <div className="product-detail-media">
          {product?.image ? (
            <div className="product-image filled-media"><img src={product.image} alt={name} /></div>
          ) : (
            <div className="product-image placeholder-media">{product?.badge || "DD"}</div>
          )}
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{text(category?.title) || product?.category}</p>
          <h1>{name}</h1>
          <p className="lead">{description}</p>
          <div className="product-detail-meta">
            <span>{text(product?.status) || "В наявності"}</span>
            <span>{stockQty} шт.</span>
            <strong>${Number(product?.price || 0)}</strong>
          </div>
          <div className="hero-actions">
            <Link className="button primary" href={`/shop?category=${encodeURIComponent(product?.category || "")}`}>Назад в розділ</Link>
          </div>
          {product ? <ProductOrderForm product={product} /> : null}
        </div>
      </section>
      <section className="section product-detail-section">
        <div className="section-heading compact">
          <p className="eyebrow">Опис</p>
          <h2>Додаткова інформація</h2>
        </div>
        <div className="product-detail-text">{longText}</div>
      </section>
    </main>
  );
}
