"use client";

import Link from "next/link";
import { text } from "@/lib/text";

export default function ProductCard({ product, categoryTitle }) {
  const name = text(product.name);
  const description = text(product.description || product.text);
  const status = text(product.status) || "В наявності";
  const stockQty = Number(product.stockQty ?? product.stock ?? product.quantity ?? 10);

  function addToCart(openCart = false) {
    const key = "double-damage-cart";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const existing = stored.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      stored.push({ id: product.id, name, price: Number(product.price || 0), qty: 1 });
    }
    localStorage.setItem(key, JSON.stringify(stored));
    window.dispatchEvent(new CustomEvent("dd-cart-updated", { detail: { openCart } }));
  }

  return (
    <article className="product-card" data-category={product.category}>
      <Link className="product-media-wrap" href={`/product?id=${encodeURIComponent(product.id)}`}>
        {product.image ? (
          <div className="product-image filled-media"><img src={product.image} alt={name} /></div>
        ) : (
          <div className="product-image placeholder-media">{product.badge || "DD"}</div>
        )}
      </Link>
      <div className="product-info">
        <h3><Link href={`/product?id=${encodeURIComponent(product.id)}`}>{name}</Link></h3>
        <p>{description}</p>
        <div className="product-labels">
          <span className="tag acid">{status}</span>
          <span>{categoryTitle || product.category}</span>
          {product.subcategory ? <span>{product.subcategory}</span> : null}
        </div>
      </div>
      <div className="product-price-col">
        <small>Ціна</small>
        <strong>${Number(product.price || 0)}</strong>
      </div>
      <div className="product-stock-col">
        <small>Наявність</small>
        <strong>{product.inStock === false || stockQty <= 0 ? "Немає" : `${stockQty} шт.`}</strong>
      </div>
      <div className="product-buy-col">
        <div className="product-actions">
          <button type="button" onClick={() => addToCart(true)}>Купити</button>
          <button className="add-cart-mini" type="button" aria-label="До кошика" title="До кошика" onClick={() => addToCart(false)}>🛒</button>
        </div>
      </div>
    </article>
  );
}
