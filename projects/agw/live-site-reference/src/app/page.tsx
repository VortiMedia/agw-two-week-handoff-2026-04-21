import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { AGW_LIVE_ASSETS, AGW_SELECTED_PHOTOS, BRAND_PATTERNS } from "@/lib/brand-assets";
import { CONTACT, HOME_REVIEWS, LOCAL_FAQS, QUOTE_URL, SERVICE_AREAS } from "@/lib/site-data";

const proofLogos = [
  { src: AGW_LIVE_ASSETS.proofLogos.leadSafe, alt: "EPA lead-safe certification" },
  { src: AGW_LIVE_ASSETS.proofLogos.google, alt: "Google reviews" },
  { src: AGW_LIVE_ASSETS.proofLogos.yelp, alt: "Yelp reviews" },
  { src: AGW_LIVE_ASSETS.proofLogos.ascc, alt: "Association for Materials Protection and Performance" },
  { src: AGW_LIVE_ASSETS.proofLogos.ampp, alt: "AMPP" },
  { src: AGW_LIVE_ASSETS.proofLogos.isnetworld, alt: "ISNetworld" },
] as const;

const splitCards = [
  {
    label: "Residential",
    title: "Residential painting led by walkthroughs and backed by warranty.",
    body: "Interior, exterior, cabinet, and fine finish work for homeowners who care about prep, communication, and a finish that still looks right after the crew leaves.",
    bullets: [
      "Interior and exterior repainting",
      "Cabinets and fine finish work",
      "Protection, prep, and detail-first execution",
    ],
    image: AGW_SELECTED_PHOTOS.residentialService,
    imageAlt: "A.G. Williams crew arriving for a residential project",
    href: "/residential",
    surfaceClassName: "bg-white text-[var(--color-text)]",
    bodyClassName: "body-copy",
    bulletClassName: "text-[var(--color-text)]",
    buttonClassName: "button-secondary",
  },
  {
    label: "Commercial",
    title: "Commercial painting, fireproofing, and floor coatings for occupied properties.",
    body: "Owners, facility teams, and general contractors need the scope planned clearly, the floor systems coordinated correctly, and the work run without unnecessary noise.",
    bullets: [
      "Occupied-property scheduling",
      "Fireproofing and floor coating coordination",
      "Documentation and communication that stay ahead of the crew",
    ],
    image: AGW_SELECTED_PHOTOS.commercialService,
    imageAlt: "A.G. Williams crew preparing a commercial floor coating project",
    href: "/commercial",
    surfaceClassName: "bg-[var(--color-primary)] text-white",
    bodyClassName: "text-[0.98rem] leading-8 text-white/84",
    bulletClassName: "text-white/92",
    buttonClassName: "button-secondary button-secondary--dark",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Start with the office",
    body: "The first call makes clear whether the job is residential, commercial, or a specialty floor-coating scope so the next step is right the first time.",
  },
  {
    number: "02",
    title: "Walk the property",
    body: "AGW looks at surfaces, access, prep, protection, and timing before the proposal is finalized.",
  },
  {
    number: "03",
    title: "Run the work cleanly",
    body: "Once the scope is set, crews and communication should move without owners or homeowners chasing updates.",
  },
] as const;

const [featuredReview, wallpaperReview, floorReview] = HOME_REVIEWS;

export default function Home() {
  return (
    <SiteShell currentPath="/">
      <main>
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-3 lg:py-14">
            <article className="overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-4 sm:p-8 lg:p-10">
                  <p className="ui-heading text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Family-owned painting company since 1906
                  </p>
                  <h1 className="hero-title mt-3 max-w-[10.2ch] sm:mt-4 sm:max-w-[9.2ch]">
                    A century-old painting company for homes and occupied properties.
                  </h1>
                  <p className="mt-4 hidden max-w-lg border-l-2 border-[var(--color-primary)] pl-4 text-[0.98rem] leading-7 text-[var(--color-text)] sm:block">
                    “{featuredReview.quote}”
                  </p>
                  <p className="mt-2 hidden text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-text-soft)] sm:block">
                    {featuredReview.name} · {featuredReview.location}
                  </p>
                  <p className="lead-copy mt-4 max-w-xl sm:mt-5">
                    A.G. Williams serves Westchester, Fairfield, Rockland, and Putnam with walkthrough-led pricing,
                    full-time crews, and a Pelham office that can route the right next step before the work starts.
                  </p>

                  <div className="mt-5 hidden flex flex-wrap gap-3 lg:flex">
                    <Link className="button-primary" href={QUOTE_URL}>
                      Get a Quote
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-3 border-t border-[var(--color-line)] pt-4 sm:mt-6 sm:pt-5 sm:grid-cols-3">
                    <div>
                      <p className="ui-heading text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-primary)]">
                        Trust
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                        Licensed and insured commercial work.
                      </p>
                    </div>
                    <div>
                      <p className="ui-heading text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-primary)]">
                        Residential
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                        5-year warranty with full-time crews.
                      </p>
                    </div>
                    <div>
                      <p className="ui-heading text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-primary)]">
                        Local
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                        Pelham office serving four nearby counties.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[240px] lg:min-h-full">
                  <Image
                    src={AGW_SELECTED_PHOTOS.heroRoom}
                    alt="Finished A.G. Williams interior with custom built-ins and trim"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(0,39,71,0.78)] via-[rgba(0,39,71,0.38)] to-transparent p-6 text-white sm:p-8">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-white/76">
                      Pelham office
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/92">
                      Westchester, Fairfield, Rockland, and Putnam. Clear walkthroughs, full-time crews, and real local accountability.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Residential and commercial</span>
              <h2 className="section-title mt-4">
                One company, two paths, and the same standard of prep, communication, and finish quality.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
              {splitCards.map((card) => (
                <article key={card.label} className={`overflow-hidden rounded-[2.2rem] ${card.surfaceClassName} shadow-[var(--shadow-soft)]`}>
                  <div className="relative aspect-[4/3]">
                    <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-7 sm:p-8">
                    <p className="ui-heading text-[0.72rem] uppercase tracking-[0.2em] opacity-72">{card.label}</p>
                    <h3 className="mt-4 display-font text-[2rem] leading-[0.98] tracking-[-0.045em]">{card.title}</h3>
                    <p className={`mt-4 max-w-2xl ${card.bodyClassName}`}>{card.body}</p>
                    <ul className="detail-list mt-6">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className={`detail-item ${card.bulletClassName}`}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link className={`mt-8 ${card.buttonClassName}`} href={card.href}>
                      Open {card.label}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.78)]">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="overflow-hidden rounded-[2.1rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[5/4]">
                <Image
                  src={AGW_SELECTED_PHOTOS.processDoor}
                  alt="A.G. Williams painter working carefully around a doorway"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-[var(--color-line)] p-6">
                <p className="ui-heading text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  Walkthrough-led work
                </p>
                <p className="body-copy mt-3">
                  The office routes the call, the estimator walks the property, and the crew runs the job cleanly once the scope is clear.
                </p>
              </div>
            </div>

            <div>
              <span className="section-label">How work starts</span>
              <h2 className="section-title mt-4">
                The office routes the call, the team walks the property, then the job is priced.
              </h2>
              <div className="mt-8 border-y border-[var(--color-line)] bg-white/72">
                {processSteps.map((step, index) => (
                  <article
                    key={step.number}
                    className={`grid gap-4 px-0 py-6 sm:grid-cols-[auto_1fr] sm:items-start sm:py-8 ${index === 0 ? "" : "border-t border-[var(--color-line)]"}`}
                  >
                    <span className="step-marker">{step.number}</span>
                    <div>
                      <p className="display-font text-[1.6rem] leading-[1] tracking-[-0.04em] text-[var(--color-primary)]">
                        {step.title}
                      </p>
                      <p className="mt-4 text-[0.98rem] leading-8 text-[var(--color-text-soft)]">{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="service-area"
          className="section-space scroll-mt-36 border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.72)]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(249,248,242,0.94), rgba(249,248,242,0.9)), url(${BRAND_PATTERNS.accent.src})`,
            backgroundRepeat: "repeat",
            backgroundSize: "260px auto",
          }}
        >
          <div className="container-shell grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
            <div>
              <span className="section-label">Local proof</span>
              <div className="mt-4 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[0.58fr_0.42fr]">
                  <div>
                    <p className="display-font text-[1.8rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                      “{wallpaperReview.quote}”
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                      {wallpaperReview.name} · {wallpaperReview.location}
                    </p>

                    <div className="mt-6 border-t border-[var(--color-line)] pt-6">
                      <p className="ui-heading text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Across homes and occupied properties
                      </p>
                      <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                        “{floorReview.quote}”
                      </p>
                      <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                        {floorReview.name} · {floorReview.location}
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.76)]">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={AGW_SELECTED_PHOTOS.proofExterior}
                        alt="A.G. Williams painter working on a home exterior"
                        fill
                        sizes="(max-width: 1024px) 100vw, 28vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="border-t border-[var(--color-line)] p-5">
                      <p className="ui-heading text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Local walkthroughs start in Pelham and stay focused on the counties AGW actually serves.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--color-line)] px-6 py-6 sm:px-7">
                  <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                    {proofLogos.map((logo, index) => (
                      <div
                        key={logo.alt}
                        className={`flex min-h-14 items-center justify-center border-b border-[var(--color-line)] px-2 pb-4 sm:min-h-16 sm:border-b-0 sm:pb-0 ${index % 3 !== 2 ? "sm:border-r sm:pr-5" : ""}`}
                      >
                        <Image src={logo.src} alt={logo.alt} width={120} height={60} className="h-auto max-h-8 w-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="section-label">Service area</span>
              <h2 className="section-title mt-4">Westchester, Fairfield, Rockland, and Putnam.</h2>
              <p className="body-copy mt-5 max-w-xl">
                The Pelham office routes residential walkthroughs, commercial consultations, and specialty floor-coating scopes across the counties AGW actually serves.
              </p>
              <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-white/92 shadow-[var(--shadow-soft)]">
                <div className="border-b border-[var(--color-line)] p-6">
                  <Image
                    src={AGW_LIVE_ASSETS.countiesMap}
                    alt="Map showing A.G. Williams service counties"
                    width={1024}
                    height={967}
                    className="h-auto w-full max-w-[17rem]"
                  />
                </div>
                <div className="grid gap-3 p-6">
                  {SERVICE_AREAS.map((area) => (
                    <p
                      key={area}
                      className="border-l-2 border-[var(--color-primary)] bg-[rgba(249,248,242,0.88)] px-4 py-3 text-sm leading-6 text-[var(--color-text)]"
                    >
                      {area}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2.2rem] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-soft)]">
              <p className="section-label !border-white/18 !bg-white/10 !text-white">Questions and next steps</p>
              <h2 className="page-title mt-4 max-w-[10ch] !text-white">
                Tell the office what you need and AGW will route the next step.
              </h2>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-white/84">
                Residential walkthrough, commercial consultation, or a specialty scope discussion, the process should stay clear from the first call.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button-primary button-primary--light" href={QUOTE_URL}>
                  Request a Quote
                </Link>
                <Link className="button-secondary button-secondary--dark" href={CONTACT.mainPhoneHref}>
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
