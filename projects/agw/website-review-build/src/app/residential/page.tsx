import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { ServiceCtaBand } from "@/components/service-cta-band";
import { ServicePageHero } from "@/components/service-page-hero";
import { SiteShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
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
        <ServicePageHero
          trackingContext="residential"
          eyebrow="Residential painting"
          title="Residential painting, cabinet work, and fine finishes built around a walkthrough."
          description="A.G. Williams handles interiors, exteriors, cabinetry, and detail-heavy finish work for homeowners who want the scope reviewed before the estimate and the house protected while the job is underway."
          primaryCta={{ label: "Schedule a Residential Walkthrough", href: QUOTE_URL }}
          secondaryCta={{ label: `Call ${CONTACT.mainPhoneLabel}`, href: CONTACT.mainPhoneHref }}
          highlights={[
            {
              label: "Walkthrough first",
              body: "Rooms, surfaces, prep, and timing are reviewed before pricing.",
            },
            {
              label: "5-year warranty",
              body: "Residential painting is backed by a real five-year warranty.",
            },
            {
              label: "Full-time crews",
              body: "Crews used to lived-in homes, protection, and detail-heavy rooms.",
            },
          ]}
          media={{
            src: AGW_CURATED_PHOTOS.whiteKitchen,
            alt: "White kitchen cabinetry and millwork finished by A.G. Williams",
          }}
          mediaCallout={{
            eyebrow: "Residential trust",
            title: "Homes get reviewed first so the proposal reflects the actual rooms.",
            body: "The office and estimator define what is being painted, how the property is protected, and how the job will sequence before the price is finalized.",
          }}
          supportCallout={{
            eyebrow: "Home protection",
            title: "Prep, access, and finish expectations are aligned before the house turns into a moving target.",
            body: "That is how homeowners get a calmer project, a cleaner crew experience, and an estimate tied to the actual property instead of guesswork.",
          }}
          proofListTitle="What homeowners want answered first"
          proofList={[
            "How the rooms, furnishings, and circulation paths will be protected.",
            "What cabinet, trim, and detail-heavy prep will happen before paint goes up.",
            "How the 5-year warranty supports the finish after the work is complete.",
          ]}
        />

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
                <TrackedLink
                  className="button-primary"
                  href={QUOTE_URL}
                  tracking={{
                    event: "quote_cta_click",
                    location: "residential_walkthrough_section",
                    label: "Request a Walkthrough",
                    context: "residential",
                  }}
                >
                  Request a Walkthrough
                </TrackedLink>
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

        <ServiceCtaBand
          trackingContext="residential"
          eyebrow="Residential next step"
          title="Book the walkthrough with the office before the house gets priced like a generic repaint."
          body="The first call should route you into the residential lane, define the scope in person, and keep the estimate tied to the rooms, prep, and finish level you actually need."
          primaryCta={{ label: "Schedule a Residential Walkthrough", href: QUOTE_URL }}
          secondaryCta={{ label: `Call ${CONTACT.mainPhoneLabel}`, href: CONTACT.mainPhoneHref }}
          detailItems={["Interior and exterior painting", "Cabinet and fine-finish work", "5-year residential warranty"]}
        />
      </main>
    </SiteShell>
  );
}
