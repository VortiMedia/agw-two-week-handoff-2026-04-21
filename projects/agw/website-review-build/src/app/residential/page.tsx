import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { AGW_CURATED_PHOTOS } from "@/lib/brand-assets";
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

const serviceGallery = [
  {
    service: interiorExteriorService,
    image: AGW_CURATED_PHOTOS.homeExteriorFairfield,
    imageAlt: "Exterior home painting completed by A.G. Williams",
  },
  {
    service: cabinetService,
    image: AGW_CURATED_PHOTOS.cabinetKitchen,
    imageAlt: "Kitchen cabinet finish work completed by A.G. Williams",
  },
  {
    service: wallpaperService,
    image: AGW_CURATED_PHOTOS.residentialHeroRoom,
    imageAlt: "Detailed residential interior finish work completed by A.G. Williams",
  },
] as const;

export default function ResidentialPage() {
  return (
    <SiteShell currentPath="/residential">
      <main>
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="lg:max-w-xl">
                <span className="kicker">Residential painting</span>
                <h1 className="page-title mt-4 max-w-[13ch]">
                  Residential painting, cabinet work, and fine finishes built around a walkthrough.
                </h1>
                <p className="lead-copy mt-5 max-w-xl">
                  A.G. Williams handles interiors, exteriors, cabinetry, and detail-heavy finish
                  work for homeowners who want the scope reviewed before the estimate and the house
                  protected while the job is underway.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link className="button-primary" href={QUOTE_URL}>
                    Schedule a Walkthrough
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
                      Walkthrough first
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Rooms, surfaces, prep, and timing are reviewed before pricing.
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      5-year warranty
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Residential painting is backed by a real five-year warranty.
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Full-time crews
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Crews used to lived-in homes, protection, and detail-heavy rooms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] lg:row-span-2">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={AGW_CURATED_PHOTOS.whiteKitchen}
                      alt="White kitchen cabinetry and millwork finished by A.G. Williams"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="grid gap-4 border-t border-[var(--color-line)] p-5 sm:grid-cols-[1fr_1fr] sm:p-6">
                    <div>
                      <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Residential trust
                      </p>
                      <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                        Homes get reviewed first so the proposal reflects the actual rooms.
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                      The office and estimator define what is being painted, how the property is
                      protected, and how the job will sequence before the price is finalized.
                    </p>
                  </div>
                </article>

                <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={AGW_CURATED_PHOTOS.interiorPainter}
                      alt="A.G. Williams painter working on an interior detail"
                      fill
                      sizes="(max-width: 1024px) 100vw, 24vw"
                      className="object-cover"
                    />
                  </div>
                </article>

                <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={AGW_CURATED_PHOTOS.homeExteriorFairfield}
                      alt="Residential exterior home painted by A.G. Williams"
                      fill
                      sizes="(max-width: 1024px) 100vw, 24vw"
                      className="object-cover"
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Residential work</span>
              <h2 className="section-title mt-4">
                Interiors, cabinetry, and exterior repainting under one residential process.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {serviceGallery.map(({ service, image, imageAlt }) => (
                <article
                  key={service.title}
                  className="overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 32vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="card-title text-[clamp(1.45rem,1.8vw,1.9rem)]">
                      {service.title}
                    </h2>
                    <p className="body-copy mt-4">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.76)]">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <span className="section-label">Walkthrough before proposal</span>
              <h2 className="section-title mt-4">The next step is a walkthrough, not a guess.</h2>
              <p className="body-copy mt-5 max-w-xl">
                The office starts the process, then A.G. Williams looks at the rooms, surfaces,
                prep, protection, and timing before the price is written.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link className="button-primary" href={QUOTE_URL}>
                  Request a Walkthrough
                </Link>
                <Link
                  className="text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-80"
                  href={CONTACT.mainPhoneHref}
                >
                  Call {CONTACT.mainPhoneLabel}
                </Link>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={AGW_CURATED_PHOTOS.residentialProcess}
                    alt="A.G. Williams reviewing finish and room details during a residential walkthrough"
                    fill
                    sizes="(max-width: 1024px) 100vw, 28vw"
                    className="object-cover"
                  />
                </div>
              </article>

              <article className="overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="grid gap-4 p-6">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    During the walkthrough
                  </p>
                  <ul className="grid gap-4">
                    {RESIDENTIAL_WALKTHROUGH_POINTS.map((point) => (
                      <li key={point} className="detail-item">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <span className="section-label">Residential FAQs</span>
              <h2 className="section-title mt-4">
                The questions homeowners usually want answered before they commit.
              </h2>
              <p className="body-copy mt-5 max-w-xl">
                Warranty, service area, timing, and next-step questions usually get handled before
                the walkthrough is booked.
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
