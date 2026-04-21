import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { AGW_CURATED_PHOTOS, AGW_LIVE_ASSETS } from "@/lib/brand-assets";
import {
  CONTACT,
  HOME_REVIEWS,
  LOCAL_FAQS,
  QUOTE_URL,
  SERVICE_AREAS,
} from "@/lib/site-data";

const proofLogos = [
  { src: AGW_LIVE_ASSETS.proofLogos.google, alt: "Google reviews" },
  { src: AGW_LIVE_ASSETS.proofLogos.yelp, alt: "Yelp reviews" },
  { src: AGW_LIVE_ASSETS.proofLogos.leadSafe, alt: "EPA lead-safe certification" },
] as const;

const heroSignals = [
  "119+ years in the region",
  "5-year residential warranty",
  "Licensed and insured commercial work",
  "Pelham office serving 4 counties",
] as const;

const routeCards = [
  {
    label: "Residential walkthroughs",
    title: "Homes, estates, and cabinetry priced from the actual rooms.",
    body:
      "Protection plans, preparation, and finish expectations are reviewed before the estimate gets written.",
    href: "/residential",
    cta: "See Residential",
  },
  {
    label: "Commercial consultations",
    title: "Occupied-property scopes with the office handling routing and coordination first.",
    body:
      "Commercial painting, fireproofing, and floor coatings start with scope clarity instead of a vague intake form.",
    href: "/commercial",
    cta: "See Commercial",
  },
  {
    label: "Heritage and local proof",
    title: "The office, the crews, and the 1906 name still sit under the same regional operation.",
    body:
      "Use the heritage page when the trust question is really about accountability, longevity, and whether the company still works like a local name.",
    href: "/heritage",
    cta: "See Heritage",
  },
] as const;

const processSteps = [
  {
    title: "Start with the office",
    body:
      "The first call determines whether the property needs a residential walkthrough, a commercial consultation, or a specialty floor-coating conversation.",
  },
  {
    title: "Review the actual scope",
    body:
      "A.G. Williams looks at surfaces, access, protection, timing, and finish expectations before the proposal is finalized.",
  },
  {
    title: "Run the work cleanly",
    body:
      "Crews, communication, and scheduling stay organized so homeowners and building teams are not chasing updates once work begins.",
  },
] as const;

const featuredReview = HOME_REVIEWS[0];
const floorReview = HOME_REVIEWS[2];

export default function Home() {
  return (
    <SiteShell currentPath="/">
      <main>
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-6 lg:py-12">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.82)] shadow-[var(--shadow-soft)]">
              <div className="grid gap-8 px-5 py-5 lg:grid-cols-[0.76fr_1.24fr] lg:px-10 lg:py-10">
                <div className="lg:pr-6">
                  <span className="kicker">Pelham office | Since 1906</span>
                  <h1 className="hero-title mt-5 max-w-[11.5ch]">
                    A century-old painting company with one local office behind every estimate.
                  </h1>
                  <p className="lead-copy mt-5 max-w-xl">
                    A.G. Williams handles residential walkthroughs, commercial painting,
                    fireproofing, and floor coatings across Westchester, Fairfield, Rockland, and
                    Putnam with full-time crews, warranty-backed residential work, and a Pelham
                    office that still answers the phone.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link className="button-primary" href={QUOTE_URL}>
                      Get a Quote
                    </Link>
                    <Link
                      className="button-secondary"
                      href={CONTACT.localPhoneHref}
                    >
                      Call Pelham office
                    </Link>
                  </div>

                  <div className="mt-8">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Choose the right next step
                    </p>

                    <div className="mt-4 grid gap-3 lg:grid-cols-3">
                      {routeCards.map((item) => (
                        <article
                          key={item.label}
                          className="rounded-[1.35rem] border border-[var(--color-border)] bg-white/90 p-4 shadow-[var(--shadow-soft)]"
                        >
                          <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                            {item.label}
                          </p>
                          <p className="mt-3 display-font text-[1.35rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                            {item.title}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                            {item.body}
                          </p>
                          <Link className="footer-link mt-4 text-[var(--color-primary)]" href={item.href}>
                            {item.cta}
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {heroSignals.map((item) => (
                      <article
                        key={item}
                        className="info-pill justify-start border-[rgba(0,99,176,0.14)] bg-white/92 text-[var(--color-primary)]"
                      >
                        {item}
                      </article>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                  <article className="relative overflow-hidden rounded-[1.8rem] bg-[var(--color-ink)] text-white shadow-[var(--shadow-strong)] lg:row-span-2">
                    <div className="relative aspect-[16/13] sm:aspect-[16/10] lg:aspect-[4/5]">
                      <Image
                        src={AGW_CURATED_PHOTOS.homeExteriorFairfield}
                        alt="Residential exterior completed by A.G. Williams"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,36,58,0.92)] via-[rgba(16,36,58,0.28)] to-transparent" />

                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/16 bg-white/12 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm">
                          Residential and commercial
                        </span>
                        <span className="rounded-full border border-white/16 bg-white/12 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm">
                          Westchester + Fairfield + Rockland + Putnam
                        </span>
                      </div>

                      <div className="absolute inset-x-4 bottom-4 grid gap-3">
                        <div className="rounded-[1.35rem] border border-white/16 bg-white/10 p-4 backdrop-blur-sm">
                          <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-white/74">
                            Local office, real routing
                          </p>
                          <p className="mt-3 display-font text-[1.55rem] leading-[1.02] tracking-[-0.05em] text-white">
                            Estimates start with the office, not with a generic contractor form.
                          </p>
                          <p className="mt-3 max-w-lg text-sm leading-6 text-white/78">
                            Residential walkthroughs, commercial consultations, and specialty
                            scopes still get sorted by the Pelham office before pricing is written.
                          </p>
                        </div>
                        <div className="w-full max-w-[25rem] rounded-[1.25rem] border border-white/16 bg-[rgba(255,255,255,0.94)] p-4 text-[var(--color-text)] shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
                          <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                            Client feedback
                          </p>
                          <p className="mt-3 text-[0.97rem] leading-7">
                            “{featuredReview.quote}”
                          </p>
                          <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                            {featuredReview.name} · {featuredReview.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Why the first call matters
                    </p>
                    <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                      One office separates home estimates from occupied-property work before the
                      wrong process gets started.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                      That keeps homeowners from getting a commercial-style intake and keeps
                      commercial buyers from getting treated like a small repaint job.
                    </p>
                    <Link
                      className="footer-link mt-5 text-[var(--color-primary)]"
                      href="#service-area"
                    >
                      See the service area
                    </Link>
                  </article>

                  <aside className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.94)] p-5 shadow-[var(--shadow-soft)]">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Review and credentials
                    </p>
                    <div className="mt-5 grid gap-3">
                      {proofLogos.map((logo) => (
                        <div
                          key={logo.alt}
                          className="flex min-h-14 items-center justify-center rounded-[0.95rem] border border-[var(--color-border)] bg-white px-4"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={116}
                            height={52}
                            className="h-auto max-h-7 w-auto"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-6 text-[var(--color-text-soft)]">
                      Licensed and insured commercial work, plus a 5-year residential warranty for
                      homeowners who want a real standard behind the finish.
                    </p>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Selected work and proof</span>
              <h2 className="section-title mt-4">
                Quiet residential finish work, commercial coating scopes, and local proof that does
                not feel staged.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.14fr_0.86fr]">
              <article className="overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
                  <div className="relative min-h-[18rem]">
                    <Image
                      src={AGW_CURATED_PHOTOS.whiteKitchen}
                      alt="White kitchen cabinetry and millwork finished by A.G. Williams"
                      fill
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="grid gap-5 p-6 lg:p-8">
                    <div>
                      <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Residential interiors
                      </p>
                      <h2 className="card-title mt-4 text-[clamp(1.6rem,2vw,2.25rem)]">
                        Cabinet, trim, and room-by-room repainting that still looks calm when the
                        job is finished.
                      </h2>
                    </div>
                    <p className="body-copy">
                      Walkthrough-led residential work for homeowners who want rooms protected, prep
                      handled correctly, and the estimate built from the actual house instead of a
                      canned contractor script.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.8)] p-4">
                        <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          Prep-first standard
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                          Surface condition, protection, and finish expectations get addressed
                          before crews start moving through the home.
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.8)] p-4">
                        <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          Warranty-backed
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                          Residential painting carries a real 5-year warranty rather than vague
                          reassurance after the fact.
                        </p>
                      </div>
                    </div>
                    <Link className="footer-link text-[var(--color-primary)]" href="/residential">
                      See Residential
                    </Link>
                  </div>
                </div>
              </article>

              <div className="grid gap-5">
                <article className="overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-ink)] text-white shadow-[var(--shadow-strong)]">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={AGW_CURATED_PHOTOS.commercialFloor}
                      alt="Commercial floor coating project completed by A.G. Williams"
                      fill
                      sizes="(max-width: 1024px) 100vw, 32vw"
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,36,58,0.94)] to-transparent" />
                    <div className="absolute inset-x-5 bottom-5">
                      <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-white/72">
                        Commercial scopes
                      </p>
                      <h2 className="mt-3 display-font text-[clamp(1.55rem,2vw,2rem)] leading-[1.02] tracking-[-0.05em] text-white">
                        Floor coatings, fireproofing, and commercial painting that start with scope
                        clarity.
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-white/80">
                        Owners, facility teams, and general contractors get one office to route
                        access, documentation, and coordination before the job starts moving.
                      </p>
                      <Link className="footer-link mt-4 text-white" href="/commercial">
                        See Commercial
                      </Link>
                    </div>
                  </div>
                </article>

                <article className="overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.92)] shadow-[var(--shadow-soft)]">
                  <div className="grid sm:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative min-h-[14rem]">
                      <Image
                        src={AGW_LIVE_ASSETS.teamPhoto}
                        alt="A.G. Williams team photo with company vehicles"
                        fill
                        sizes="(max-width: 1024px) 100vw, 24vw"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="p-5">
                      <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Local accountability
                      </p>
                      <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                        The crews, the vans, and the office all tie back to the same regional name.
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                        That matters because the work still has to hold up in the next town over,
                        not disappear behind a fake local landing page.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[var(--color-ink)]">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="grid gap-4">
              <div>
                <span className="section-label !border-white/15 !bg-white/10 !text-white">
                  How work starts
                </span>
                <h2 className="section-title mt-4 !text-white">
                  The first call should make the next step obvious.
                </h2>
                <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-white/78">
                  Residential walkthrough, commercial consultation, or a specialty floor-coating
                  discussion, the point of the first conversation is to route the property
                  correctly before the estimate is built.
                </p>
              </div>

              <article className="overflow-hidden rounded-[1.6rem] border border-white/12 shadow-[var(--shadow-strong)]">
                <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]">
                  <Image
                    src={AGW_CURATED_PHOTOS.interiorPainter}
                    alt="A.G. Williams painter working carefully on interior trim"
                    fill
                    sizes="(max-width: 1024px) 100vw, 26vw"
                    className="object-cover"
                  />
                </div>
              </article>

              <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-white/72">
                  Client feedback
                </p>
                <p className="mt-3 text-[0.98rem] leading-7 text-white">
                  “{floorReview.quote}”
                </p>
                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-white/62">
                  {floorReview.name} · {floorReview.location}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 shadow-[var(--shadow-strong)] backdrop-blur-sm">
              <div className="divide-y divide-white/10">
                {processSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="grid gap-3 px-6 py-6 sm:grid-cols-[auto_1fr] sm:items-start"
                  >
                    <span className="step-marker bg-white/10 text-white">{index + 1}</span>
                    <div>
                      <h3 className="card-title text-[clamp(1.35rem,1.8vw,1.75rem)] !text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-[0.98rem] leading-8 text-white/76">{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="service-area"
          className="section-space scroll-mt-28 border-b border-[var(--color-line)] bg-white"
        >
          <div className="container-shell grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
            <div>
              <span className="section-label">Service area</span>
              <h2 className="section-title mt-4">
                Work routed from Pelham across Westchester, Fairfield, Rockland, and Putnam.
              </h2>
              <p className="body-copy mt-5 max-w-xl">
                The office is in Pelham, and the residential, commercial, and specialty scopes all
                move through that same local operation before they go into the field.
              </p>

              <div className="mt-6 grid gap-3">
                {SERVICE_AREAS.map((area) => (
                  <p
                    key={area}
                    className="rounded-lg border-l-2 border-[var(--color-primary)] bg-[rgba(249,248,242,0.8)] px-4 py-3 text-sm leading-6 text-[var(--color-text)]"
                  >
                    {area}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
              <article className="overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={AGW_LIVE_ASSETS.teamPhoto}
                    alt="A.G. Williams team photo with company vehicles"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="border-t border-[var(--color-line)] p-6">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Local accountability
                  </p>
                  <p className="mt-3 body-copy">
                    The crews, the vehicles, and the office all tie back to the same regional name,
                    which is why the work still has to hold up on the next street over.
                  </p>
                </div>
              </article>

              <article className="overflow-hidden border border-[var(--color-border)] bg-[rgba(249,248,242,0.9)] shadow-[var(--shadow-soft)]">
                <div className="border-b border-[var(--color-line)] p-6">
                  <Image
                    src={AGW_LIVE_ASSETS.countiesMap}
                    alt="Map showing A.G. Williams service counties"
                    width={1024}
                    height={967}
                    className="h-auto w-full"
                  />
                </div>
                <div className="p-6">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Main office
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[var(--color-text)]">
                    {CONTACT.officeAddress}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                    Pelham office: {CONTACT.localPhoneLabel}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[1.4rem] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-soft)]">
              <p className="section-label !border-white/15 !bg-white/10 !text-white">
                Questions and next steps
              </p>
              <h2 className="page-title mt-4 max-w-[11ch] !text-white">
                Start with the office and AGW will route the right next step.
              </h2>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-white/84">
                Residential walkthrough, commercial consultation, or specialty scope, the first
                call should get you to the right person quickly.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link className="button-primary button-primary--light" href={QUOTE_URL}>
                  Request a Quote
                </Link>
                <Link
                  className="text-sm font-semibold text-white transition-opacity hover:opacity-80"
                  href={CONTACT.mainPhoneHref}
                >
                  Call {CONTACT.mainPhoneLabel}
                </Link>
              </div>
            </div>

            <div>
              <span className="section-label">FAQs</span>
              <h2 className="section-title mt-4">Questions clients usually ask first.</h2>
              <div className="mt-8">
                <FaqList items={LOCAL_FAQS} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
