import PartnerCta from "@/components/PartnerCta";

export default function PartnersPage() {
  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Партнеры</p>
          <h1>Партнерская программа</h1>
          <p className="lead">Подключаем команды, каналы, владельцев трафика и поставщиков digital-расходников.</p>
        </div>
      </section>
      <PartnerCta />
    </main>
  );
}
