import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const db = await readDb();
  const content = db.content || {};
  const categories = visible(db.categories);
  const products = visible(db.products);
  const selected = params?.category || "";
  const filteredProducts = selected ? products.filter((product) => product.category === selected) : products;
  const visibleCategories = selected ? categories.filter((category) => category.id === selected) : categories;

  return (
    <main className="shop-page">
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Магазин</p>
          <h1>{text(content.shopPageTitle) || "DOUBLE DAMAGE SHOP"}</h1>
        </div>
      </section>

      <section className="section catalog-section" id="catalog">
        <div className="shop-market-layout">
          <div className="shop-market-main">
            <div className="shop-category-grid">
              <Link href="/shop" className={`shop-category-card home-category-card ${!selected ? "active" : ""}`}>
                <span className="shop-category-icon">DD</span>
                <span className="shop-category-copy">
                  <strong>Всі</strong>
                  <small>{products.length} товарів</small>
                </span>
                <em aria-label="Відкрити розділ">+</em>
              </Link>
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  count={products.filter((product) => product.category === category.id).length}
                />
              ))}
            </div>
            <div className="shop-controls">
              <label>Сортувати за:
                <select defaultValue="price-desc">
                  <option value="price-desc">Ціна: від вищої до нижчої</option>
                  <option value="price-asc">Ціна: від нижчої до вищої</option>
                  <option value="name-asc">Назва: A-Z</option>
                </select>
              </label>
              <label className="stock-only"><input type="checkbox" defaultChecked />Тільки в наявності</label>
              <label className="shop-search"><span>Пошук</span><input type="search" placeholder="Найти товар" /></label>
            </div>
            <div className="product-grid product-list is-grouped">
              {visibleCategories.map((category) => {
                const group = filteredProducts.filter((product) => product.category === category.id);
                if (!group.length) return null;
                return (
                  <section className="product-section-group" key={category.id}>
                    <div className="product-section-title">
                      <span>Розділ</span>
                      <strong>{text(category.title)}</strong>
                      <small>{category.subcategories?.join(" · ") || category.sub || ""}</small>
                    </div>
                    {group.map((product) => (
                      <ProductCard key={product.id} product={product} categoryTitle={text(category.title)} />
                    ))}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
