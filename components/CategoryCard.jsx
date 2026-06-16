import Link from "next/link";

export default function CategoryCard({ category, count = 0 }) {
  return (
    <Link href={`/shop?category=${category.id}`} className="shop-category-card home-category-card">
      <span className="shop-category-icon">{category.icon}</span>
      <span className="shop-category-copy">
        <strong>{category.title}</strong>
        <small>{count} товаров</small>
      </span>
      <em aria-label="Открыть раздел">+</em>
    </Link>
  );
}
