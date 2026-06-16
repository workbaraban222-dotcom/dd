import TelegramBlock from "@/components/TelegramBlock";
import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const db = await readDb();
  const events = visible(db.events);

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Події</p>
          <h1>DOUBLE DAMAGE EVENTS</h1>
        </div>
      </section>
      <section className="section">
        <div className="content-grid">
          {events.map((event) => (
            <article className="content-card" key={event.id}>
              <span className="tag acid">{event.date}</span>
              <h3>{text(event.title)}</h3>
              <p>{text(event.place || event.location)}</p>
              <p>{text(event.text)}</p>
            </article>
          ))}
        </div>
      </section>
      <TelegramBlock content={db.content} />
      <PartnerCta content={db.content} />
    </main>
  );
}
