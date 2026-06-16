import TelegramBlock from "@/components/TelegramBlock";
import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const { events } = await readDb();

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">События</p>
          <h1>DOUBLE DAMAGE EVENTS</h1>
        </div>
      </section>
      <section className="section">
        <div className="content-grid">
          {events.map((event) => (
            <article className="content-card" key={event.id}>
              <span className="tag acid">{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.place}</p>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
      </section>
      <TelegramBlock />
      <PartnerCta />
    </main>
  );
}
