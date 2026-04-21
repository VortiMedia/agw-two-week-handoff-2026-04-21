import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { AGW_LIVE_ASSETS, BRAND_PATTERNS } from "@/lib/brand-assets";
import {
  COMMERCIAL_EXPECTATIONS,
  COMMERCIAL_SERVICES,
  CONTACT,
  QUOTE_URL,
  SERVICE_AREAS,
} from "@/lib/site-data";

const standards = [
  "Occupied-property scheduling",
  "Clear coordination with owners, facility teams, and GCs",
  "Licensed & insured commercial execution",
] as const;

const proofLogos = [
  { src: AGW_LIVE_ASSETS.proofLogos.ascc, alt: "Association for Materials Protection and Performance" },
  { src: AGW_LIVE_ASSETS.proofLogos.ampp, alt: "AMPP" },
  { src: AGW_LIVE_ASSETS.proofLogos.isnetworld, alt: "ISNetworld" },
] as const;

const [paintingService, fireproofingService, floorCoatingService] = COMMERCIAL_SERVICES;

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
        <section
          className="hero-section border-b border-[var(--color-line)]"
          style={{
            backgroundImage: `radial-gradient(circle at top right, rgba(108, 187, 232, 0.2), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.96)), url(${BRAND_PATTERNS.grid.src})`,
            backgroundRepeat: "repeat",
            backgroundSize: "320px auto",
          }}
        >
          <div className="container-shell grid gap-12 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-24">
            <div className="lg:max-w-xl">
              <span className="kicker">Commercial services</span>
              <h1 className="display-font mt-6 max-w-[12ch] text-[clamp(2rem,3.7vw,3.35rem)] leading-[0.98] tracking-[-0.045em] text-[var(--color-primary)]">
                Commercial painting, fireproofing, and floor coatings for occupied properties.
              </h1>
              <p className="lead-copy mt-6 max-w-2xl">
                A.G. Williams works with owners, facility teams, property managers, and general
                contractors who need the scope understood early, the schedule protected, and the
                site kept organized.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link className="button-primary" href={QUOTE_URL}>
                  Request a Commercial Consultation
                </Link>
                <Link className="button-secondary" href={CONTACT.mainPhoneHref}>
                  Call {CONTACT.mainPhoneLabel}
                </Link>
              </div>

              <p className="mt-8 max-w-xl text-sm leading-7 text-[var(--color-text-soft)]">
                The office helps line up documentation, schedule, and site access before crews
                mobilize.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2.3rem] border border-[var(--color-border)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]">
              <div className="border-b border-white/12 p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-white/68">
                      Commercial trust
                    </p>
                    <p className="mt-4 display-font text-[2.1rem] leading-[0.96] tracking-[-0.04em]">
                      Licensed, insured, and built for occupied properties.
                    </p>
                  </div>
                  <div className="rounded-full bg-white/94 p-3">
                    <Image
                      src={AGW_LIVE_ASSETS.serviceIcons.commercial}
                      alt=""
                      aria-hidden="true"
                      width={72}
                      height={72}
                      className="h-12 w-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-8 p-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.9rem] border border-white/12 bg-white/8 p-6">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-white/68">
                    Confirm early
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {standards.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.98rem] leading-7 text-white/88"
                      >
                        <span className="mt-[0.75rem] h-2.5 w-2.5 flex-none rounded-full bg-[var(--color-secondary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.9rem] bg-white p-6 text-[var(--color-text)]">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Trade and compliance proof
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {proofLogos.map((logo) => (
                      <div
                        key={logo.alt}
                        className="flex min-h-16 items-center justify-center rounded-[1.15rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.82)] px-3 py-2"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={120}
                          height={60}
                          className="h-auto max-h-8 w-auto"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)]">
                    For documentation questions, insurance confirmation, and schedule planning,
                    the office can surface the right answers before the site work starts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Service lines</span>
              <h2 className="section-title mt-4">
                Commercial scopes AGW handles regularly.
              </h2>
            </div>

            <div className="mt-10 grid gap-4">
              <article
                id={paintingService.id}
                className="overflow-hidden rounded-[2.15rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-[0.36fr_0.64fr]"
              >
                <div className="border-b border-[var(--color-line)] p-8 lg:border-b-0 lg:border-r">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    01
                  </p>
                  <h3 className="card-title mt-4 text-[clamp(1.6rem,2.2vw,2.2rem)]">
                    {paintingService.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="body-copy">{paintingService.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {paintingService.bullets.map((bullet) => (
                      <p
                        key={bullet}
                        className="rounded-[1.2rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.78)] px-4 py-3 text-sm leading-6 text-[var(--color-text)]"
                      >
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>
              </article>

              <article
                id={fireproofingService.id}
                className="overflow-hidden rounded-[2.15rem] border border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-[0.58fr_0.42fr]"
              >
                <div className="p-8">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-white/68">
                    02
                  </p>
                  <h3 className="mt-4 display-font text-[2.15rem] leading-[0.98] tracking-[-0.045em] text-white">
                    {fireproofingService.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-8 text-white/84">
                    {fireproofingService.description}
                  </p>
                </div>
                <div className="border-t border-white/12 p-8 lg:border-t-0 lg:border-l">
                  <ul className="grid gap-3">
                    {fireproofingService.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[0.98rem] leading-7 text-white/88">
                        <span className="mt-[0.75rem] h-2.5 w-2.5 flex-none rounded-full bg-[var(--color-secondary)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article
                id={floorCoatingService.id}
                className="overflow-hidden rounded-[2.15rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.88)] shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-[0.32fr_0.68fr]"
              >
                <div className="p-8">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    03
                  </p>
                  <h3 className="card-title mt-4 text-[clamp(1.58rem,2.1vw,2.15rem)]">
                    {floorCoatingService.title}
                  </h3>
                </div>
                <div className="border-t border-[var(--color-line)] p-8 lg:border-t-0 lg:border-l">
                  <p className="body-copy">{floorCoatingService.description}</p>
                  <ul className="mt-6 grid gap-3">
                    {floorCoatingService.bullets.map((bullet) => (
                      <li key={bullet} className="detail-item">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.72)]">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">On-site expectations</span>
              <h2 className="section-title mt-4">
                Finish quality matters, but commercial buyers also need the job run cleanly.
              </h2>
            </div>

            <div className="mt-10 overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[rgba(249,248,242,0.9)] p-8 sm:p-10">
                <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  What commercial buyers need
                </p>
                <p className="mt-4 display-font text-[2.1rem] leading-[0.98] tracking-[-0.04em] text-[var(--color-primary)]">
                  Buyers need finish quality, but they also need the job to stay organized.
                </p>
                <p className="mt-4 max-w-xl text-[0.98rem] leading-8 text-[var(--color-text-soft)]">
                  Commercial trust is built by how the project starts, how it communicates during
                  the work, and how cleanly it closes out once the scope is finished.
                </p>
              </div>

              <div className="divide-y divide-[var(--color-line)]">
                {COMMERCIAL_EXPECTATIONS.map((item, index) => (
                  <article
                    key={item.title}
                    className={[
                      "grid gap-4 p-8 sm:grid-cols-[auto_1fr] sm:items-start",
                      index === 1 ? "bg-[var(--color-primary)] text-white" : "",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "step-marker",
                        index === 1 ? "!border-white/16 !bg-white/10 !text-white" : "",
                      ].join(" ")}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3
                        className={[
                          "card-title text-[clamp(1.36rem,1.8vw,1.75rem)]",
                          index === 1 ? "!text-white" : "",
                        ].join(" ")}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={[
                          "mt-4",
                          index === 1
                            ? "text-[0.98rem] leading-8 text-white/84"
                            : "body-copy",
                        ].join(" ")}
                      >
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
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
                Start with the office, confirm the scope, and move into a consultation built around
                the property, schedule, and access requirements.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
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
