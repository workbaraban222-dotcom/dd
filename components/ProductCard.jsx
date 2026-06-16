"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  function addToCart(openCart = false) {
    const key = "double-damage-cart";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const existing = stored.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      stored.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }
    localStorage.setItem(key, JSON.stringify(stored));
    window.dispatchEvent(new CustomEvent("dd-cart-updated", { detail: { openCart } }));
  }

  return (
    <article className="product-card" data-category={product.category}>
      <Link className="product-media-wrap" href={`/product?id=${product.id}`}>
        {product.image ? (
          <div className="product-image filled-media"><img src={product.image} alt={product.name} /></div>
        ) : (
          <div className="product-image placeholder-media">{product.badge}</div>
        )}
      </Link>
      <div className="product-info">
        <h3><Link href={`/product?id=${product.id}`}>{product.name}</Link></h3>
        <p>{product.text}</p>
        <div className="product-labels">
          <span className="tag acid">{product.status}</span>
          <span>{product.category}</span>
          {product.subcategory ? <span>{product.subcategory}</span> : null}
        </div>
      </div>
      <div className="product-price-col">
        <small>Цена</small>
        <strong>${product.price}</strong>
      </div>
      <div className="product-stock-col">
        <small>Наличие</small>
        <strong>{product.stock} шт.</strong>
      </div>
      <div className="product-buy-col">
        <div className="product-actions">
          <button type="button" onClick={() => addToCart(true)}>Купить</button>
          <button className="add-cart-mini" type="button" aria-label="В корзину" title="В корзину" onClick={() => addToCart(false)}>🛒</button>
        </div>
      </div>
    </article>
  );
}
