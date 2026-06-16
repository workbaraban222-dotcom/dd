import Link from "next/link";
import { readDb } from "@/lib/db";
import ProductOrderForm from "@/components/ProductOrderForm";

export const dynamic = "force-dynamic";

export default async function ProductPage({ searchParams }) {
  const params = await searchParams;
  const { products } = await readDb();
  const product = products.find((item) => item.id === params?.id) || products[0];

  return (
    <main className="product-detail-page">
      <section className="product-detail-hero">
        <div className="product-detail-media">
          {product.image ? (
            <div className="product-image filled-media"><img src={product.image} alt={product.name} /></div>
          ) : (
            <div className="product-image placeholder-media">{product.badge}</div>
          )}
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="lead">{product.text}</p>
          <div className="product-detail-meta">
            <span>{product.status}</span>
            <span>{product.stock} шт.</span>
            <strong>${product.price}</strong>
          </div>
          <div className="hero-actions">
            <Link className="button ghost" href="/shop">Назад в магазин</Link>
          </div>
          <ProductOrderForm product={product} />
        </div>
      </section>
      <section className="section product-detail-section">
        <div className="section-heading compact">
          <p className="eyebrow">Описание</p>
          <h2>Дополнительная информация</h2>
        </div>
        <div className="product-detail-text">{product.text}</div>
      </section>
    </main>
  );
}
