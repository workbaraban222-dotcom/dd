import { text } from "@/lib/text";

export default function TelegramBlock({ content = {} }) {
  return (
    <section className="telegram-section">
      <div className="telegram-art">
        <div className="graffiti-badge">{content.brandMark || "DD"}</div>
      </div>
      <div className="telegram-copy">
        <p className="eyebrow">Telegram</p>
        <h2>{text(content.telegramTitle) || "Підпишись в Telegram"}</h2>
        <p>{text(content.telegramText) || "Будь в курсі всіх подій DOUBLE DAMAGE"}</p>
      </div>
      <a className="button blue-button" href={content.telegramUrl || "https://t.me/"} target="_blank" rel="noreferrer">
        ↗ {text(content.subscribeButton || content.telegramButton) || "Підписатися на канал"}
      </a>
    </section>
  );
}
