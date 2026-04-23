import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/agw/button";
import { Eyebrow } from "@/components/agw/eyebrow";
import { TrustChip } from "@/components/agw/trust-chip";
import { TrackedLink } from "@/components/tracked-link";

type HeroCta = {
  label: string;
  href: string;
};

type HeroImage = {
  src: string;
  alt: string;
};

type HeroTrustItem = {
  icon?: ReactNode;
  headline?: string;
  label: string;
};

type HeroFinancingBadge = {
  lead: string;
  primary: string;
  sub: string;
};

export type HeroProps = {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  trustChips?: HeroTrustItem[];
  financingBadge?: HeroFinancingBadge;
  imageBefore?: HeroImage;
  imageAfter?: HeroImage;
  imageAfterTag?: string;
  imageBeforeTag?: string;
  className?: string;
};

const DEFAULT_TITLE = (
  <>
    A home that looks finished,{" "}
    <em className="italic font-bold text-agw-blue">not just painted.</em>
  </>
);

const DEFAULT_TRUST_CHIPS: HeroTrustItem[] = [
  { headline: "5-year", label: "warranty" },
  { headline: "0% APR", label: "financing" },
  { headline: "EPA Lead-Safe", label: "certified" },
  { headline: "Licensed", label: "& insured" },
];

const DEFAULT_IMAGE: HeroImage = {
  src: "/agw-selected/hero-room.jpg",
  alt: "Recently completed A.G. Williams interior paint project",
};

export function Hero({
  eyebrow = "Westchester · Fairfield · Hudson Valley",
  title = DEFAULT_TITLE,
  subtitle = "Premium interior and exterior painting from a family-owned company four generations deep. Trusted by discerning homeowners since 1906, backed by a five-year warranty, and financed at 0%.",
  primaryCta = { label: "Get your free estimate", href: "/get-a-quote" },
  secondaryCta = { label: "See recent work", href: "#work" },
  trustChips = DEFAULT_TRUST_CHIPS,
  financingBadge = {
    lead: "",
    primary: "0%",
    sub: "Financing\nAvailable",
  },
  imageBefore = {
    src: DEFAULT_IMAGE.src,
    alt: "Room before painting",
  },
  imageAfter = DEFAULT_IMAGE,
  imageAfterTag = "After · Scarsdale, NY",
  imageBeforeTag = "Before",
  className,
}: HeroProps) {
  return (
    <section
      className={[
        "relative overflow-hidden border-b border-agw-bone bg-[linear-gradient(135deg,var(--agw-ivory)_0%,#fff_52%,var(--agw-celeste-soft)_160%)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-6 py-14 sm:px-10 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-12 lg:py-24 [&>*]:min-w-0">
        <div>
          <span
            className={[
              "mb-6 inline-flex max-w-full flex-wrap items-center gap-3",
              "rounded-sm border border-agw-bone bg-agw-paper px-4 py-2 shadow-sm",
            ].join(" ")}
          >
            <span className="border-r border-agw-bone pr-3 font-sans text-[12px] font-bold tracking-[0.08em] text-agw-blue-ink">
              Est. 1906
            </span>
            <Eyebrow className="min-w-0 !leading-[1.4] !tracking-[0.08em] !normal-case">
              {eyebrow}
            </Eyebrow>
          </span>

          <h1
            className={[
              "mb-6 max-w-[13.5ch] font-display font-bold text-agw-blue-ink",
              "text-[clamp(42px,5.4vw,78px)] leading-[1.02] tracking-[-0.024em]",
              "[text-wrap:pretty]",
              "[&_em]:text-agw-blue [&_em]:font-bold",
            ].join(" ")}
          >
            {title}
          </h1>

          <p className="mb-8 max-w-[50ch] font-sans text-[18px] leading-[1.7] text-agw-ink md:text-[19px]">
            {subtitle}
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-4">
            <Button
              href={primaryCta.href}
              variant="primary"
              className="text-[16px] px-8 py-[18px]"
            >
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>

          <div className="grid max-w-[42rem] grid-cols-2 gap-2 border-t border-agw-bone pt-6 sm:grid-cols-4">
            {trustChips.map((chip, i) => (
              <TrustChip
                key={`${chip.headline ?? ""}-${chip.label}-${i}`}
                icon={chip.icon}
                headline={chip.headline}
                label={chip.label}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] w-full min-w-0 lg:min-h-[620px]">
          <div
            className={[
              "absolute inset-x-0 top-0 h-[78%] overflow-hidden rounded-md",
              "border border-agw-bone bg-agw-paper shadow-lg lg:left-8",
            ].join(" ")}
          >
            <Image
              src={imageAfter.src}
              alt={imageAfter.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,42,77,0)_48%,rgba(0,42,77,0.62)_100%)]" />
            <span
              className={[
                "absolute left-5 top-5 z-[2]",
                "rounded-sm bg-agw-ivory/95 px-[14px] py-2 shadow-sm",
                "font-sans text-[12px] font-semibold tracking-[0.02em] text-agw-blue-ink",
              ].join(" ")}
            >
              {imageAfterTag}
            </span>
            <p className="absolute bottom-5 left-5 z-[2] max-w-[34ch] font-sans text-[14px] font-semibold leading-6 text-agw-ivory">
              Local residential and commercial painting, planned from the walkthrough through the final punch list.
            </p>
          </div>

          <div
            className={[
              "absolute bottom-0 right-0 h-[34%] w-[44%] overflow-hidden rounded-md",
              "border-[6px] border-agw-ivory bg-agw-paper shadow-lg",
            ].join(" ")}
          >
            <Image
              src={imageBefore.src}
              alt={imageBefore.alt}
              fill
              sizes="(min-width: 1024px) 18vw, 42vw"
              className="object-cover"
            />
            <span
              className={[
                "absolute bottom-5 right-5 z-[2]",
                "rounded-sm bg-agw-ivory px-[14px] py-2",
                "font-sans text-[11px] font-semibold tracking-[0.02em] text-agw-blue-ink",
              ].join(" ")}
            >
              {imageBeforeTag}
            </span>
          </div>

          {financingBadge ? (
            <div
              className={[
                "absolute -right-1 top-8 z-[3] lg:-right-4",
                "flex h-28 w-28 flex-col items-center justify-center sm:h-32 sm:w-32",
                "rounded-full bg-agw-blue text-agw-ivory text-center",
                "font-display shadow-lg -rotate-[6deg]",
              ].join(" ")}
              aria-label={`${financingBadge.primary} ${financingBadge.sub.replace(/\n/g, " ")}`}
            >
              {financingBadge.lead ? (
                <span className="font-sans text-[11px] font-semibold tracking-[0.02em]">
                  {financingBadge.lead}
                </span>
              ) : null}
              <span className="text-[40px] font-bold leading-none tracking-[-0.02em] sm:text-[46px]">
                {financingBadge.primary}
              </span>
              <span className="mt-1.5 whitespace-pre-line font-sans text-[11px] font-semibold leading-[1.3] tracking-[0.02em]">
                {financingBadge.sub}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Small analytics-friendly helper so page integrations can wrap the primary
// CTA with tracking if they choose. Exported for convenience.
export function HeroTrackedCta({
  href,
  label,
  location,
}: {
  href: string;
  label: string;
  location: string;
}) {
  return (
    <TrackedLink
      href={href}
      tracking={{
        event: "cta_click",
        location,
        label,
      }}
    >
      {label}
    </TrackedLink>
  );
}
