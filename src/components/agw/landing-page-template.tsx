import Image from "next/image";
import { QuoteIntakeFlow } from "@/components/quote-intake-flow";
import { Button } from "@/components/agw/button";
import { SiteShell } from "@/components/agw/site-shell";
import type { GoogleAdsLandingPage } from "@/lib/landing-pages";

export function LandingPageTemplate({ page }: { page: GoogleAdsLandingPage }) {
  return (
    <SiteShell currentPath={page.path}>
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
              <span aria-hidden className="h-px w-8 bg-agw-blue" />
              {page.eyebrow}
            </span>
            <h1 className="max-w-[14ch] font-display text-[clamp(36px,4.8vw,68px)] font-bold leading-[1.12] tracking-[-0.02em] text-agw-blue-ink">
              {page.headline}
            </h1>
            <p className="mt-6 max-w-[50ch] font-sans text-[18px] leading-[1.65] text-agw-ink">
              {page.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#quote-intake-flow">{page.primaryCta}</Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 border-t border-agw-bone pt-5">
              {page.proof.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-agw-bone bg-agw-paper px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-agw-blue"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-md shadow-lg sm:h-[360px] lg:h-[560px]">
            <Image
              src={page.heroImage.src}
              alt={page.heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="border-y border-agw-bone bg-white">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
                <span aria-hidden className="h-px w-8 bg-agw-blue" />
                Service fit
              </span>
              <h2 className="font-display text-[clamp(36px,3.8vw,52px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                {page.serviceFit.title}
              </h2>
              <p className="mt-5 max-w-[48ch] font-sans text-[15px] leading-7 text-agw-ink-soft">
                {page.serviceFit.body}
              </p>
            </div>
            <div className="divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper">
              {page.serviceFit.points.map((point) => (
                <p key={point} className="p-5 font-sans text-[14px] leading-7 text-agw-ink before:mr-2 before:text-agw-blue before:content-['/']">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-agw-cream-warm">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12">
            <div className="grid gap-0 divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper md:grid-cols-3 md:divide-x md:divide-y-0">
              {page.objections.map((item) => (
                <article key={item.question} className="p-5">
                  <h3 className="font-sans text-[14px] font-semibold text-agw-blue-ink">
                    {item.question}
                  </h3>
                  <p className="mt-3 font-sans text-[13px] leading-6 text-agw-ink-soft">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="quote"
          className="scroll-mt-28 bg-agw-ivory"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:items-start [&>*]:min-w-0">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
                <span aria-hidden className="h-px w-8 bg-agw-blue" />
                {page.quoteIntro.eyebrow}
              </span>
              <h2 className="font-display text-[clamp(40px,4.2vw,56px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                {page.quoteIntro.title}
              </h2>
              <p className="mt-5 max-w-[44ch] font-sans text-[17px] leading-[1.6] text-agw-ink">
                {page.quoteIntro.body}
              </p>
            </div>

            <QuoteIntakeFlow
              sourceContext={page.slug}
              initialProjectType={page.initialProjectType}
              compact
            />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
