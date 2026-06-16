import Link from "next/link";
import { text } from "@/lib/text";

export default function CategoryCard({ category, count = 0 }) {
  return (
    <Link href={`/shop?category=${category.id}`} className="shop-category-card home-category-card">
      <span className="shop-category-icon">{category.icon || "#"}</span>
      <span className="shop-category-copy">
        <strong>{text(category.title)}</strong>
        <small>{count} товарів</small>
      </span>
      <em aria-label="Відкрити розділ">+</em>
    </Link>
  );
}
