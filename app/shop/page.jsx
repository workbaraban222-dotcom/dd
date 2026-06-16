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
          <p className="eyebrow">{"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"}</p>
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
                  <strong>{"\u0412\u0441\u0456"}</strong>
                  <small>{products.length} {"\u0442\u043e\u0432\u0430\u0440\u0456\u0432"}</small>
                </span>
                <em aria-label="\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u0440\u043e\u0437\u0434\u0456\u043b">+</em>
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
              <label>{"\u0421\u043e\u0440\u0442\u0443\u0432\u0430\u0442\u0438 \u0437\u0430:"}
                <select defaultValue="price-desc">
                  <option value="price-desc">{"\u0426\u0456\u043d\u0430: \u0432\u0456\u0434 \u0432\u0438\u0449\u043e\u0457 \u0434\u043e \u043d\u0438\u0436\u0447\u043e\u0457"}</option>
                  <option value="price-asc">{"\u0426\u0456\u043d\u0430: \u0432\u0456\u0434 \u043d\u0438\u0436\u0447\u043e\u0457 \u0434\u043e \u0432\u0438\u0449\u043e\u0457"}</option>
                  <option value="name-asc">{"\u041d\u0430\u0437\u0432\u0430: A-Z"}</option>
                </select>
              </label>
              <label className="stock-only"><input type="checkbox" defaultChecked />{"\u0422\u0456\u043b\u044c\u043a\u0438 \u0432 \u043d\u0430\u044f\u0432\u043d\u043e\u0441\u0442\u0456"}</label>
              <label className="shop-search"><span>{"\u041f\u043e\u0448\u0443\u043a"}</span><input type="search" placeholder="\u041d\u0430\u0439\u0442\u0438 \u0442\u043e\u0432\u0430\u0440" /></label>
            </div>
            <div className="product-grid product-list is-grouped">
              {visibleCategories.map((category) => {
                const group = filteredProducts.filter((product) => product.category === category.id);
                if (!group.length) return null;
                return (
                  <section className="product-section-group" key={category.id}>
                    <div className="product-section-title">
                      <span>{"\u0420\u043e\u0437\u0434\u0456\u043b"}</span>
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
