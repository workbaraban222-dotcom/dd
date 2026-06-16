import PartnerLeadForm from "@/components/PartnerLeadForm";

export default function PartnerCta() {
  return (
    <section className="partner-cta">
      <div>
        <p className="eyebrow">Партнерство</p>
        <h2>Стать партнером DOUBLE DAMAGE</h2>
        <p>Оставьте контакт или напишите нам в Telegram - обсудим трафик, поставки, промокоды и совместные запуски.</p>
      </div>
      <PartnerLeadForm />
    </section>
  );
}
