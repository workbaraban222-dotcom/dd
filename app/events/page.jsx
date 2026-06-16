import TelegramBlock from "@/components/TelegramBlock";
import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const db = await readDb();
  const content = db.content || {};
  const events = visible(db.events);

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">DOUBLE DAMAGE</p>
          <h1>{text(content.eventsPageTitle) || "DOUBLE DAMAGE EVENTS"}</h1>
          <p className="lead">{text(content.eventsPageText)}</p>
        </div>
      </section>
      <section className="section">
        <div className="content-grid">
          {events.map((event) => (
            <article className="content-card" key={event.id}>
              {event.date ? <span className="tag acid">{event.date}</span> : null}
              <h3>{text(event.title)}</h3>
              <p>{text(event.place || event.location)}</p>
              <p>{text(event.text)}</p>
            </article>
          ))}
        </div>
      </section>
      <TelegramBlock content={content} />
      <PartnerCta content={content} />
    </main>
  );
}
