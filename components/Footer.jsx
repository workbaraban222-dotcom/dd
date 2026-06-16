import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Link className="brand" href="/">
          <span className="brand-mark">DD</span>
          <span>DOUBLE DAMAGE</span>
        </Link>
        <p>Digital marketplace для арбитражников, медиабаеров, SMM и Telegram-команд.</p>
      </div>
      <div className="footer-col">
        <strong>Навигация</strong>
        <Link href="/">Главная</Link>
        <Link href="/shop">Магазин</Link>
        <Link href="/guides">Новости</Link>
        <Link href="/events">События</Link>
        <Link href="/partners">Партнеры</Link>
      </div>
    </footer>
  );
}
