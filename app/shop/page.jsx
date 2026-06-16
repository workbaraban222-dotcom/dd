import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const { categories, products } = await readDb();

  return (
    <main className="shop-page">
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Магазин</p>
          <h1>DOUBLE DAMAGE SHOP</h1>
        </div>
      </section>

      <section className="section catalog-section" id="catalog">
        <div className="section-heading compact">
          <p className="eyebrow">Каталог</p>
          <h2>Разделы магазина</h2>
        </div>
        <div className="shop-market-layout">
          <a className="vip-banner left" href="#"><span>VIP PARTNER</span></a>
          <div className="shop-market-main">
            <div className="shop-category-grid">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  count={products.filter((product) => product.category === category.id).length}
                />
              ))}
            </div>
            <div className="shop-controls">
              <label>Сортировать:
                <select defaultValue="price-desc">
                  <option value="price-desc">Цена: от высокой до низкой</option>
                  <option value="price-asc">Цена: от низкой до высокой</option>
                  <option value="name-asc">Название: A-Z</option>
                </select>
              </label>
              <label className="stock-only"><input type="checkbox" defaultChecked />Только в наличии</label>
              <label className="shop-search"><span>Поиск</span><input type="search" placeholder="Найти товар" /></label>
            </div>
            <div className="product-grid product-list is-grouped">
              {categories.map((category) => {
                const group = products.filter((product) => product.category === category.id);
                if (!group.length) return null;
                return (
                  <section className="product-section-group" key={category.id}>
                    <div className="product-section-title">
                      <span>Раздел</span>
                      <strong>{category.title}</strong>
                      <small>{category.sub}</small>
                    </div>
                    {group.map((product) => <ProductCard key={product.id} product={product} />)}
                  </section>
                );
              })}
            </div>
          </div>
          <a className="vip-banner right" href="#"><span>VIP PARTNER</span></a>
        </div>
      </section>
    </main>
  );
}
