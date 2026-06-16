import PartnerCta from "@/components/PartnerCta";
import { readDb } from "@/lib/db";
import { text, visible } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const db = await readDb();
  const content = db.content || {};
  const partners = visible(db.partnersList);

  return (
    <main>
      <section className="hero inner-hero">
        <div className="hero-copy">
          <p className="eyebrow">DOUBLE DAMAGE</p>
          <h1>{text(content.partnersPageTitle) || "\u041f\u0430\u0440\u0442\u043d\u0435\u0440\u0438"}</h1>
          <p className="lead">{text(content.partnersPageText)}</p>
        </div>
      </section>
      <section className="section">
        <div className="content-grid partners-grid">
          {partners.map((partner) => (
            <article className="content-card partner-card" key={partner.id}>
              {partner.logo ? (
                <div className="content-media logo-media filled-media"><img src={partner.logo} alt={partner.name} /></div>
              ) : (
                <div className="content-media logo-media placeholder-media">{partner.name?.slice(0, 2) || "DD"}</div>
              )}
              <h3>{partner.name}</h3>
              <p>{text(partner.text)}</p>
              {partner.promo ? <strong>{partner.promo}</strong> : null}
              {partner.site ? <a className="button ghost" href={partner.site} target="_blank" rel="noreferrer">Site</a> : null}
            </article>
          ))}
        </div>
      </section>
      <PartnerCta content={content} />
    </main>
  );
}
