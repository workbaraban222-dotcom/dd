import { text } from "@/lib/text";

export default function PartnerCta({ content = {} }) {
  return (
    <section className="partner-cta">
      <div>
        <p className="eyebrow">{text(content.partnerCtaEyebrow) || "Партнерство"}</p>
        <h2>{text(content.partnerCtaTitle) || "Стати партнером DOUBLE DAMAGE"}</h2>
        <p>{text(content.partnerCtaText) || "Залиште контакт або напишіть нам у Telegram - обговоримо трафік, постачання, промокоди та спільні запуски."}</p>
      </div>
      <a className="button primary" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">
        {text(content.partnerCtaButton) || "Зв'язатися"}
      </a>
    </section>
  );
}
