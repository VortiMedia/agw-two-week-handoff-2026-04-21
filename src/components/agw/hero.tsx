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
        "mx-auto w-full max-w-[1440px] px-6 pt-16 sm:px-10 lg:px-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-[72px] [&>*]:min-w-0">
        {/* Copy column */}
        <div>
          <span
            className={[
              "mb-6 inline-flex items-center gap-[14px]",
              "max-w-full flex-wrap rounded-pill bg-agw-celeste-soft px-4 py-2",
            ].join(" ")}
          >
            <span className="border-r border-[rgba(0,75,133,0.3)] pr-[14px] font-sans text-[12px] font-bold tracking-[0.08em] text-agw-blue-ink">
              Est. 1906
            </span>
            <Eyebrow className="min-w-0 !leading-[1.4] !tracking-[0.08em] !normal-case">
              {eyebrow}
            </Eyebrow>
          </span>

          <h1
            className={[
              "mb-7 max-w-[14ch] font-display font-bold text-agw-blue-ink",
              "text-[clamp(38px,4.8vw,72px)] leading-[1.12] tracking-[-0.018em]",
              "[text-wrap:pretty]",
            ].join(" ")}
          >
            {title}
          </h1>

          <p className="mb-9 max-w-[48ch] font-sans text-[19px] leading-[1.6] text-agw-ink">
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

          <div className="flex flex-wrap items-stretch gap-2 border-t border-agw-bone pt-7">
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

        {/* Visual column */}
        <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden lg:overflow-visible">
          {/* After frame — primary hero image */}
          <div
            className={[
              "absolute inset-y-0 left-0 right-8 bottom-12",
              "overflow-hidden rounded-md shadow-lg",
            ].join(" ")}
            style={{ inset: "0 32px 48px 0" }}
          >
            <Image
              src={imageAfter.src}
              alt={imageAfter.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <span
              className={[
                "absolute left-6 top-6 z-[2]",
                "rounded-sm bg-agw-ivory px-[14px] py-2",
                "font-sans text-[12px] font-semibold tracking-[0.02em] text-agw-blue-ink",
              ].join(" ")}
            >
              {imageAfterTag}
            </span>
          </div>

          {/* Before frame — inset lower-right */}
          <div
            className={[
              "absolute bottom-0 right-0 w-[46%] aspect-[4/5]",
              "overflow-hidden rounded-md shadow-lg",
              "border-[6px] border-agw-ivory",
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

          {/* Financing badge */}
          {financingBadge ? (
            <div
              className={[
                "absolute -top-5 -right-2 z-[3] lg:-right-5",
                "flex h-36 w-36 flex-col items-center justify-center",
                "rounded-full bg-agw-blue text-agw-ivory text-center",
                "font-display shadow-lg -rotate-[8deg]",
              ].join(" ")}
              aria-label={`${financingBadge.primary} ${financingBadge.sub.replace(/\n/g, " ")}`}
            >
              {financingBadge.lead ? (
                <span className="font-sans text-[11px] font-semibold tracking-[0.02em]">
                  {financingBadge.lead}
                </span>
              ) : null}
              <span className="text-[48px] font-bold leading-none tracking-[-0.02em]">
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
