import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const db = await readDb();
  const partners = visible(db.partnersList);

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">Партнери</p>
          <h1>Партнерська програма</h1>
          <p className="lead">Підключаємо команди, канали, власників трафіку і постачальників digital-розхідників.</p>
        </div>
      </section>
      <section className="section">
        <div className="content-grid">
          {partners.map((partner) => (
            <article className="content-card partner-card" key={partner.id}>
              <div className="content-media placeholder-media">{partner.logo || "DD"}</div>
              <h3>{text(partner.title || partner.name)}</h3>
              <p>{text(partner.text || partner.description)}</p>
              {partner.tag || partner.promo ? <span className="tag acid">{partner.tag || partner.promo}</span> : null}
              {partner.url || partner.site ? <a className="button ghost" href={partner.url || partner.site} target="_blank" rel="noreferrer">Site</a> : null}
            </article>
          ))}
        </div>
      </section>
      <PartnerCta content={db.content} />
    </main>
  );
}
