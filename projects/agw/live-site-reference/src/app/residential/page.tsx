import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { AGW_LIVE_ASSETS, BRAND_PATTERNS } from "@/lib/brand-assets";
import {
  CONTACT,
  QUOTE_URL,
  RESIDENTIAL_FAQS,
  RESIDENTIAL_SERVICES,
  RESIDENTIAL_WALKTHROUGH_POINTS,
  SERVICE_AREAS,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Residential Painting and Fine Finish Work | A.G. Williams",
  description:
    "Residential painting, fine finish work, and walkthrough-led planning for homeowners across Westchester, Fairfield, Rockland, and Putnam.",
  alternates: {
    canonical: "/residential",
  },
};

const [interiorExteriorService, cabinetService, wallpaperService] = RESIDENTIAL_SERVICES;

export default function ResidentialPage() {
  return (
    <SiteShell currentPath="/residential">
      <main>
        <section
          className="hero-section border-b border-[var(--color-line)]"
          style={{
            backgroundImage: `radial-gradient(circle at top right, rgba(108, 187, 232, 0.22), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.96)), url(${BRAND_PATTERNS.hero.src})`,
            backgroundRepeat: "repeat",
            backgroundSize: "280px auto",
          }}
        >
          <div className="container-shell grid gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-24">
            <div>
              <span className="kicker">Residential painting</span>
              <h1 className="page-title mt-6 max-w-[12ch]">
                Residential painting with careful prep and a real 5-year warranty.
              </h1>
              <p className="lead-copy mt-6 max-w-2xl">
                A.G. Williams handles interior, exterior, cabinet, and fine finish work for homeowners who want clear next steps and crews that respect the house.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button-primary" href={QUOTE_URL}>
                  Schedule a Residential Walkthrough
                </Link>
                <Link className="button-secondary" href={CONTACT.mainPhoneHref}>
                  Call {CONTACT.mainPhoneLabel}
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap gap-3">
                <li className="info-pill">5-year residential warranty</li>
                <li className="info-pill">Interior and exterior work</li>
                <li className="info-pill">Cabinets and fine finishes</li>
              </ul>
            </div>

            <div className="site-card overflow-hidden rounded-[2.35rem] bg-[rgba(255,255,255,0.94)]">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-8">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Residential trust
                  </p>
                  <p className="mt-4 display-font text-[2.05rem] leading-[0.98] tracking-[-0.045em] text-[var(--color-primary)]">
                    Homes get a walkthrough first, then a proposal built from the actual scope.
                  </p>
                  <p className="mt-4 text-[0.98rem] leading-8 text-[var(--color-text-soft)]">
                    The office helps define rooms, surfaces, prep, protection, and timing before the job is priced. That keeps the estimate honest and the work calmer once the crew arrives.
                  </p>
                  <ul className="mt-6 grid gap-3">
                    <li className="detail-item">5-year residential warranty support</li>
                    <li className="detail-item">Interior, exterior, cabinet, and finish work</li>
                    <li className="detail-item">Full-time crews who respect the house</li>
                  </ul>
                </div>

                <div className="border-t border-[var(--color-line)] bg-[rgba(249,248,242,0.86)] p-8 lg:border-l lg:border-t-0">
                  <div className="flex items-start gap-4">
                    <Image
                      src={AGW_LIVE_ASSETS.badge}
                      alt="A.G. Williams established 1906 badge"
                      width={180}
                      height={180}
                      className="h-16 w-16 flex-none"
                    />
                    <div>
                      <p className="ui-heading text-[0.74rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Warranty support
                      </p>
                      <p className="mt-3 text-[0.98rem] leading-7 text-[var(--color-text-soft)]">
                        Residential painting is backed by a real written warranty instead of a decorative seal doing all the selling.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.8rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                    <div className="flex items-center gap-4">
                      <Image
                        src={AGW_LIVE_ASSETS.residentialWarranty}
                        alt="A.G. Williams 5-year home paint warranty seal"
                        width={768}
                        height={768}
                        className="h-20 w-20 flex-none"
                      />
                      <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                        The warranty supports the walkthrough-first process. It should reinforce the trust story, not replace it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Residential services</span>
              <h2 className="section-title mt-4">
                Interior, exterior, cabinet, and finish work for homes that need real prep.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
              <article className="overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="border-b border-[var(--color-line)] p-8">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    01
                  </p>
                  <h3 className="card-title mt-4 text-[clamp(1.7rem,2.4vw,2.35rem)]">
                    {interiorExteriorService.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="body-copy max-w-2xl">{interiorExteriorService.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="info-pill">Detailed prep</span>
                    <span className="info-pill">Protection plans</span>
                    <span className="info-pill">Finish-first crews</span>
                  </div>
                </div>
              </article>

              <div className="grid gap-4">
                <article className="rounded-[2rem] border border-[var(--color-primary)] bg-[var(--color-primary)] p-7 text-white shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-white/68">
                    02
                  </p>
                  <h3 className="mt-4 display-font text-[1.95rem] leading-[0.98] tracking-[-0.04em] text-white">
                    {cabinetService.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-8 text-white/84">
                    {cabinetService.description}
                  </p>
                </article>

                <article className="rounded-[2rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.9)] p-7 shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    03
                  </p>
                  <h3 className="card-title mt-4 text-[clamp(1.52rem,2vw,1.95rem)]">
                    {wallpaperService.title}
                  </h3>
                  <p className="body-copy mt-4">{wallpaperService.description}</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.72)]">
          <div className="container-shell">
            <div className="overflow-hidden rounded-[2.35rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-[0.98fr_1.02fr]">
              <div className="bg-[var(--color-primary)] p-8 text-white sm:p-10">
                <p className="section-label !border-white/18 !bg-white/10 !text-white">
                  Residential walkthrough
                </p>
                <h2 className="page-title mt-4 max-w-3xl !text-white">
                  A walkthrough comes before the proposal.
                </h2>
                <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-white/84">
                  The office starts the process, then AGW looks at the rooms, surfaces, prep, protection, and schedule before pricing is finalized.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link className="button-primary button-primary--light" href={QUOTE_URL}>
                    Request a Walkthrough
                  </Link>
                  <Link className="button-secondary button-secondary--dark" href={CONTACT.mainPhoneHref}>
                    Call {CONTACT.mainPhoneLabel}
                  </Link>
                </div>
              </div>

              <div
                className="bg-[rgba(249,248,242,0.94)] p-8 sm:p-10"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(249,248,242,0.96), rgba(249,248,242,0.96)), url(${BRAND_PATTERNS.accent.src})`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "240px auto",
                }}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      During the walkthrough
                    </p>
                    <p className="mt-4 display-font text-[2rem] leading-[0.98] tracking-[-0.04em] text-[var(--color-primary)]">
                      What AGW covers before the proposal is written.
                    </p>
                  </div>
                  <Image
                    src={AGW_LIVE_ASSETS.serviceIcons.residential}
                    alt=""
                    aria-hidden="true"
                    width={72}
                    height={72}
                    className="hidden h-14 w-14 sm:block"
                  />
                </div>

                <ul className="mt-8 grid gap-5">
                  {RESIDENTIAL_WALKTHROUGH_POINTS.map((point) => (
                    <li key={point} className="flex gap-4">
                      <span className="mt-[0.8rem] h-2.5 w-2.5 flex-none rounded-full bg-[var(--color-primary)]" />
                      <span className="text-[0.98rem] leading-8 text-[var(--color-text)]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[1.8rem] border border-[var(--color-border)] bg-white p-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={AGW_LIVE_ASSETS.residentialWarranty}
                      alt=""
                      aria-hidden="true"
                      width={180}
                      height={180}
                      className="h-16 w-16 flex-none"
                    />
                    <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                      Residential painting is backed by AGW&apos;s 5-year warranty, so homeowners know what support comes with the finished work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <span className="section-label">Residential FAQs</span>
              <h2 className="section-title mt-4">
                The basics homeowners usually want answered before they commit.
              </h2>
              <p className="body-copy mt-5 max-w-xl">
                Homeowners usually want warranty, service area, and next-step questions answered before they book.
              </p>
              <p className="mt-6 text-sm leading-7 text-[var(--color-text-soft)]">
                {SERVICE_AREAS.join(" • ")}
              </p>
            </div>

            <FaqList items={RESIDENTIAL_FAQS} />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
