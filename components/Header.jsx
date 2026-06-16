"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { nav } from "@/lib/data";

const cartKey = "double-damage-cart";

function readCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(cartKey) || "[]");
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(cartKey, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("dd-cart-updated"));
}

export default function Header() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  useEffect(() => {
    function sync(event) {
      setCart(readCart());
      if (event.detail?.openCart) setOpen(true);
    }
    sync({});
    window.addEventListener("dd-cart-updated", sync);
    return () => window.removeEventListener("dd-cart-updated", sync);
  }, []);

  function changeQty(id, diff) {
    const next = cart
      .map((item) => item.id === id ? { ...item, qty: item.qty + diff } : item)
      .filter((item) => item.qty > 0);
    setCart(next);
    writeCart(next);
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">DD</span>
          <span>DOUBLE DAMAGE</span>
        </Link>
        <nav className="main-nav" aria-label="Главная навигация">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="header-tools">
          <a className="telegram-pill" href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
          <button className="cart-button" type="button" onClick={() => setOpen(true)}><span>Корзина</span><strong>{count}</strong></button>
        </div>
      </header>

      <aside className="cart-panel" aria-hidden={!open}>
        <div className="cart-head">
          <div>
            <p className="eyebrow">Корзина</p>
            <h2>Ваш заказ</h2>
          </div>
          <button className="icon-button" type="button" onClick={() => setOpen(false)}>x</button>
        </div>
        <div className="cart-items">
          {cart.length ? cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>${item.price}</span>
              </div>
              <div className="cart-controls">
                <button type="button" onClick={() => changeQty(item.id, -1)}>-</button>
                <strong>{item.qty}</strong>
                <button type="button" onClick={() => changeQty(item.id, 1)}>+</button>
              </div>
            </div>
          )) : <p className="empty-cart">Корзина пустая</p>}
        </div>
        <div className="cart-total"><span>Итого</span><strong>${total}</strong></div>
        <button className="button primary checkout-button" type="button" onClick={() => setOpen(false)}>Оформить запрос</button>
      </aside>
      {open ? <button className="cart-backdrop" type="button" aria-label="Закрыть" onClick={() => setOpen(false)} /> : null}
    </>
  );
}
