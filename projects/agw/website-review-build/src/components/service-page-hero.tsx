import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { TrackedLink } from "@/components/tracked-link";

type ServiceHeroHighlight = {
  label: string;
  body: string;
};

type ServiceHeroCallout = {
  eyebrow: string;
  title: string;
  body: string;
};

type ServicePageHeroProps = {
  trackingContext: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  highlights: readonly ServiceHeroHighlight[];
  media: {
    src: ComponentProps<typeof Image>["src"];
    alt: string;
  };
  mediaCallout: ServiceHeroCallout;
  supportCallout: ServiceHeroCallout;
  proofListTitle: string;
  proofList: readonly string[];
};

export function ServicePageHero({
  trackingContext,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  media,
  mediaCallout,
  supportCallout,
  proofListTitle,
  proofList,
}: ServicePageHeroProps) {
  return (
    <section className="hero-section border-b border-[var(--color-line)]">
      <div className="container-shell py-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:max-w-xl">
            <span className="kicker">{eyebrow}</span>
            <h1 className="page-title mt-4 max-w-[13ch]">{title}</h1>
            <p className="lead-copy mt-5 max-w-xl">{description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <TrackedLink
                className="button-primary"
                href={primaryCta.href}
                tracking={{
                  event: "quote_cta_click",
                  location: "service_hero_primary",
                  label: primaryCta.label,
                  context: trackingContext,
                }}
              >
                {primaryCta.label}
              </TrackedLink>
              <Link
                className="text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-80"
                href={secondaryCta.href}
              >
                {secondaryCta.label}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="border-t border-[var(--color-line)] pt-3">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] lg:row-span-2">
              <div className="relative aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 border-t border-[var(--color-line)] p-5 sm:grid-cols-[1fr_1fr] sm:p-6">
                <div>
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {mediaCallout.eyebrow}
                  </p>
                  <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                    {mediaCallout.title}
                  </p>
                </div>
                <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                  {mediaCallout.body}
                </p>
              </div>
            </article>

            <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
              <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                {supportCallout.eyebrow}
              </p>
              <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                {supportCallout.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                {supportCallout.body}
              </p>
            </article>

            <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.92)] p-5 shadow-[var(--shadow-soft)]">
              <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                {proofListTitle}
              </p>
              <ul className="mt-5 grid gap-4">
                {proofList.map((item) => (
                  <li key={item} className="detail-item text-[0.95rem] leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
