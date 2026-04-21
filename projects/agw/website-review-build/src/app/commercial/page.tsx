import type { Metadata } from "next";
import { ServiceCtaBand } from "@/components/service-cta-band";
import { ServicePageHero } from "@/components/service-page-hero";
import { SiteShell } from "@/components/site-shell";
import { AGW_CURATED_PHOTOS } from "@/lib/brand-assets";
import {
  COMMERCIAL_EXPECTATIONS,
  COMMERCIAL_SERVICES,
  CONTACT,
  QUOTE_URL,
  SERVICE_AREAS,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Commercial Painting, Fireproofing, and Floor Coatings | A.G. Williams",
  description:
    "Commercial painting, fireproofing, and floor coating work for owners, facility teams, and general contractors across Westchester, Fairfield, Rockland, and Putnam.",
  alternates: {
    canonical: "/commercial",
  },
};

export default function CommercialPage() {
  return (
    <SiteShell currentPath="/commercial">
      <main>
        <ServicePageHero
          eyebrow="Commercial services"
          title="Commercial painting, fireproofing, and floor coatings for occupied properties."
          description="A.G. Williams works with owners, facility teams, property managers, and general contractors who need the scope understood early, the schedule protected, and the site kept organized."
          primaryCta={{ label: "Request a Commercial Consultation", href: QUOTE_URL }}
          secondaryCta={{ label: `Call ${CONTACT.mainPhoneLabel}`, href: CONTACT.mainPhoneHref }}
          highlights={[
            {
              label: "Scope clarity",
              body: "Painting, fireproofing, and floor coatings routed through one office.",
            },
            {
              label: "Compliance",
              body: "Licensed and insured commercial work with documentation ready early.",
            },
            {
              label: "Coordination",
              body: "Planned around access, occupants, and schedule pressure.",
            },
          ]}
          media={{
            src: AGW_CURATED_PHOTOS.commercialFloor,
            alt: "Commercial floor coating project completed by A.G. Williams",
          }}
          mediaCallout={{
            eyebrow: "Commercial trust",
            title: "Licensed, insured, and built for buyers who need the basics handled cleanly.",
            body: "Occupied-property scheduling, documentation visibility, and coordination that holds up during the job.",
          }}
          supportCallout={{
            eyebrow: "Commercial routing",
            title: "One office sorts painting, fireproofing, and floor-coating scopes before crews mobilize.",
            body: "That keeps buyers out of a vague intake loop and gets access, scheduling, and documentation questions answered while decisions are still cheap.",
          }}
          proofListTitle="What gets handled early"
          proofList={[
            "Occupied-property sequencing so access and disruption are planned before the first day on site.",
            "Insurance, certification, and documentation visibility for buyers who need the basics ready early.",
            "Commercial painting, fireproofing, and floor-coating routing through the same Pelham office.",
          ]}
        />

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Service lines</span>
              <h2 className="section-title mt-4">Commercial scopes A.G. Williams handles regularly.</h2>
            </div>

            <div className="mt-10 overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              {COMMERCIAL_SERVICES.map((service, index) => {
                const isHighlighted = index === 1;
                const isMuted = index === 2;

                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className={[
                      "grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start",
                      index === 0 ? "" : "border-t border-[var(--color-line)]",
                      isHighlighted ? "bg-[var(--color-primary)] text-white" : "",
                      isMuted ? "bg-[rgba(249,248,242,0.82)]" : "",
                    ].join(" ")}
                  >
                    <div>
                      <p
                        className={[
                          "ui-heading text-[0.68rem] uppercase tracking-[0.18em]",
                          isHighlighted ? "text-white/72" : "text-[var(--color-text-soft)]",
                        ].join(" ")}
                      >
                        0{index + 1}
                      </p>
                      <h3
                        className={[
                          "mt-4 display-font text-[clamp(1.7rem,2vw,2.15rem)] leading-[0.98] tracking-[-0.045em]",
                          isHighlighted ? "text-white" : "text-[var(--color-primary)]",
                        ].join(" ")}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div>
                      <p
                        className={[
                          "max-w-3xl text-[0.98rem] leading-8",
                          isHighlighted ? "text-white/86" : "text-[var(--color-text-soft)]",
                        ].join(" ")}
                      >
                        {service.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {service.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className={[
                              "flex gap-3 text-[0.98rem] leading-7",
                              isHighlighted ? "text-white/90" : "text-[var(--color-text)]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "mt-[0.72rem] h-2.5 w-2.5 flex-none rounded-full",
                                isHighlighted ? "bg-[var(--color-secondary)]" : "bg-[var(--color-primary)]",
                              ].join(" ")}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.76)]">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <span className="section-label">On-site expectations</span>
              <h2 className="section-title mt-4">
                Finish quality matters, but buyers also need the job run cleanly.
              </h2>
              <p className="body-copy mt-5 max-w-xl">
                Commercial confidence is built by how the project mobilizes, communicates during
                the work, and closes out once the scope is complete.
              </p>
            </div>

            <article className="overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="divide-y divide-[var(--color-line)]">
                {COMMERCIAL_EXPECTATIONS.map((item, index) => (
                  <article
                    key={item.title}
                    className="grid gap-4 px-6 py-6 sm:grid-cols-[auto_1fr] sm:items-start sm:px-8"
                  >
                    <span className="step-marker">{index + 1}</span>
                    <div>
                      <h3 className="card-title text-[clamp(1.38rem,1.8vw,1.8rem)]">
                        {item.title}
                      </h3>
                      <p className="body-copy mt-4">{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <ServiceCtaBand
          eyebrow="Commercial reach"
          title={`Commercial work across ${SERVICE_AREAS.join(", ")}.`}
          body="Start with the office, confirm the property needs, and move into a consultation built around access, schedule, and actual site conditions."
          primaryCta={{ label: "Request a Commercial Consultation", href: QUOTE_URL }}
          secondaryCta={{ label: `Call ${CONTACT.mainPhoneLabel}`, href: CONTACT.mainPhoneHref }}
          detailItems={["Commercial painting", "Fireproofing", "Floor coatings"]}
        />
      </main>
    </SiteShell>
  );
}
