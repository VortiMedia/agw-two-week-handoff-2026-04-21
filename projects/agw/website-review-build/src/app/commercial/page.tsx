import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { AGW_CURATED_PHOTOS, AGW_LIVE_ASSETS } from "@/lib/brand-assets";
import {
  COMMERCIAL_EXPECTATIONS,
  COMMERCIAL_SERVICES,
  CONTACT,
  QUOTE_URL,
  SERVICE_AREAS,
} from "@/lib/site-data";

const proofLogos = [
  { src: AGW_LIVE_ASSETS.proofLogos.ascc, alt: "Association for Materials Protection and Performance" },
  { src: AGW_LIVE_ASSETS.proofLogos.ampp, alt: "AMPP" },
  { src: AGW_LIVE_ASSETS.proofLogos.isnetworld, alt: "ISNetworld" },
] as const;

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
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div className="lg:max-w-xl">
                <span className="kicker">Commercial services</span>
                <h1 className="page-title mt-4 max-w-[12ch]">
                  Commercial painting, fireproofing, and floor coatings for occupied properties.
                </h1>
                <p className="lead-copy mt-5 max-w-xl">
                  A.G. Williams works with owners, facility teams, property managers, and general
                  contractors who need the scope understood early, the schedule protected, and the
                  site kept organized.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link className="button-primary" href={QUOTE_URL}>
                    Request a Commercial Consultation
                  </Link>
                  <Link
                    className="text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-80"
                    href={CONTACT.mainPhoneHref}
                  >
                    Call {CONTACT.mainPhoneLabel}
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Scope clarity
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Painting, fireproofing, and floor coatings routed through one office.
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Compliance
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Licensed and insured commercial work with documentation ready early.
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Coordination
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Planned around access, occupants, and schedule pressure.
                    </p>
                  </div>
                </div>
              </div>

              <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={AGW_CURATED_PHOTOS.commercialFloor}
                    alt="Commercial floor coating project completed by A.G. Williams"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-5 border-t border-[var(--color-line)] bg-white p-6 sm:grid-cols-[1.04fr_0.96fr] sm:p-8">
                  <div>
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Commercial trust
                    </p>
                    <p className="mt-3 display-font text-[1.55rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                      Licensed, insured, and built for buyers who need the basics handled cleanly.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                      Occupied-property scheduling, documentation visibility, and coordination that
                      holds up during the job.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:border-l sm:border-[var(--color-line)] sm:pl-5">
                    {proofLogos.map((logo) => (
                      <div
                        key={logo.alt}
                        className="flex min-h-14 items-center justify-center rounded-[0.95rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.9)] px-4"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={120}
                          height={56}
                          className="h-auto max-h-8 w-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

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

        <section className="bg-[var(--color-primary)]">
          <div className="container-shell grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-label !border-white/15 !bg-white/10 !text-white">
                Commercial reach
              </p>
              <h2 className="page-title mt-4 max-w-3xl !text-white">
                Commercial work across {SERVICE_AREAS.join(", ")}.
              </h2>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-white/82">
                Start with the office, confirm the property needs, and move into a consultation
                built around access, schedule, and actual site conditions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className="button-primary button-primary--light" href={QUOTE_URL}>
                Request a Commercial Consultation
              </Link>
              <Link className="button-secondary button-secondary--dark" href={CONTACT.mainPhoneHref}>
                Call {CONTACT.mainPhoneLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
