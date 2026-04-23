import type { ReactNode } from "react";
import { Button } from "@/components/agw/button";
import { Eyebrow } from "@/components/agw/eyebrow";
import { Pill } from "@/components/agw/pill";

export type SplitCardData = {
  tag: string;
  title: ReactNode;
  description?: ReactNode;
  features: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tone: "residential" | "commercial";
};

export type SplitCardsProps = {
  eyebrow?: string;
  heading?: ReactNode;
  description?: ReactNode;
  cards?: [SplitCardData, SplitCardData];
  className?: string;
};

const DEFAULT_CARDS: [SplitCardData, SplitCardData] = [
  {
    tone: "residential",
    tag: "Residential",
    title: (
      <>
        Homes built to hold color for <em>years, not seasons.</em>
      </>
    ),
    description:
      "Interior, exterior, cabinetry, and historic restoration — delivered by the same senior painter from walkthrough to warranty, with financing available to keep the work on your timeline, not your budget's.",
    features: [
      "Whole-house interior & exterior",
      "Cabinet refinishing (spray booth)",
      "Historic & pre-war specialty",
      "In-home color consultation",
    ],
    primaryCta: { label: "Get your free estimate", href: "#estimate" },
    secondaryCta: { label: "Residential services", href: "#" },
  },
  {
    tone: "commercial",
    tag: "Commercial",
    title: (
      <>
        Specification-ready coatings &amp; <em>fireproofing at scale.</em>
      </>
    ),
    description:
      "A.G. Williams Commercial serves GCs, facility managers, and property owners across the tri-state. Certified applicators, documented compliance, and a crew that works your schedule — including nights and weekends.",
    features: [
      "Commercial paint & coatings",
      "Intumescent fireproofing (UL-certified)",
      "Commercial floors & industrial finishes",
      "GC referral & repeat-partner program",
    ],
    primaryCta: { label: "Request a commercial quote", href: "#estimate" },
    secondaryCta: { label: "Capabilities PDF", href: "#" },
  },
];

const PATTERN_SRC = "/agw-brand/pattern-3.png";

function PatternOverlay({ tone }: { tone: SplitCardData["tone"] }) {
  const toneStyles =
    tone === "commercial"
      ? "opacity-[0.14]"
      : // Residential: tint pattern toward brand blue + low opacity per prototype
        "opacity-[0.05] [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(52%)_saturate(1891%)_hue-rotate(187deg)_brightness(90%)_contrast(101%)]";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-y-0 right-0 w-[55%]",
        "bg-repeat bg-[length:280px_auto]",
        "[mask-image:linear-gradient(to_left,black_0%,black_40%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(to_left,black_0%,black_40%,transparent_100%)]",
        toneStyles,
      ].join(" ")}
      style={{ backgroundImage: `url('${PATTERN_SRC}')` }}
    />
  );
}

function FeatureList({ features, tone }: { features: string[]; tone: SplitCardData["tone"] }) {
  const bullet = tone === "commercial" ? "text-agw-celeste" : "text-agw-blue";
  return (
    <ul className="mb-10 flex flex-col gap-3.5">
      {features.map((f) => (
        <li
          key={f}
          className="relative pl-7 font-sans text-[14px] leading-[1.5]"
        >
          <span
            aria-hidden
            className={["absolute left-0 top-0 font-bold", bullet].join(" ")}
          >
            —
          </span>
          {f}
        </li>
      ))}
    </ul>
  );
}

function Card({ data }: { data: SplitCardData }) {
  const isCommercial = data.tone === "commercial";

  const shell = isCommercial
    ? "bg-agw-blue-ink text-agw-ivory"
    : "bg-agw-ivory text-agw-ink border border-agw-bone";

  const headline = isCommercial
    ? "text-agw-ivory [&_em]:text-agw-celeste"
    : "text-agw-blue-ink [&_em]:text-agw-blue";

  const body = isCommercial ? "text-agw-ivory/85" : "text-agw-ink";

  return (
    <div
      className={[
        "relative flex min-h-[540px] flex-col overflow-hidden rounded-md",
        "px-8 py-12 md:px-12 md:py-14",
        shell,
      ].join(" ")}
    >
      <PatternOverlay tone={data.tone} />

      <div className="relative z-10 flex flex-1 flex-col">
        <Pill
          tone={isCommercial ? "celeste" : "blue"}
          className={[
            "mb-8 self-start border",
            isCommercial
              ? "!bg-[rgba(108,187,232,0.15)] !text-agw-celeste border-[rgba(108,187,232,0.3)]"
              : "!bg-[rgba(0,99,176,0.08)] !text-agw-blue border-[rgba(0,99,176,0.2)]",
          ].join(" ")}
        >
          {data.tag}
        </Pill>

        <h3
          className={[
            "mb-6 font-display font-bold",
            "text-[clamp(28px,3vw,38px)] leading-[1.18] tracking-[-0.02em]",
            "[text-wrap:pretty]",
            "[&_em]:not-italic [&_em]:italic [&_em]:font-bold",
            headline,
          ].join(" ")}
        >
          {data.title}
        </h3>

        {data.description ? (
          <p
            className={[
              "mb-8 max-w-[42ch] font-sans text-[16px] leading-[1.6]",
              body,
            ].join(" ")}
          >
            {data.description}
          </p>
        ) : null}

        <FeatureList features={data.features} tone={data.tone} />

        <div className="mt-auto flex flex-wrap items-center gap-5">
          {data.primaryCta ? (
            <Button
              href={data.primaryCta.href}
              variant={isCommercial ? "inverse" : "secondary"}
            >
              {data.primaryCta.label}
            </Button>
          ) : null}
          {data.secondaryCta ? (
            <Button
              href={data.secondaryCta.href}
              variant={isCommercial ? "ghost-light" : "ghost"}
            >
              {data.secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SplitCards({
  eyebrow = "Two verticals, one standard",
  heading = (
    <>
      Residential homes. <em>Commercial properties.</em>
    </>
  ),
  description = "Whether you're refreshing a single room or specifying coatings for a 40,000 sq ft facility, the crew showing up is uniformed, the prep is documented, and the finish is warrantied.",
  cards = DEFAULT_CARDS,
  className,
}: SplitCardsProps) {
  return (
    <section
      className={[
        "bg-agw-cream-warm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="mb-12 grid gap-10 md:mb-16 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            {eyebrow ? (
              <Eyebrow className="mb-5 before:mr-3 before:inline-block before:h-px before:w-8 before:bg-agw-blue before:content-['']">
                {eyebrow}
              </Eyebrow>
            ) : null}
            {heading ? (
              <h2
                className={[
                  "font-display font-bold text-agw-blue-ink",
                  "text-[clamp(40px,4.4vw,60px)] leading-[1.15] tracking-[-0.02em]",
                  "[&_em]:not-italic [&_em]:italic [&_em]:font-bold [&_em]:text-agw-blue",
                ].join(" ")}
              >
                {heading}
              </h2>
            ) : null}
          </div>
          {description ? (
            <p className="max-w-[48ch] font-sans text-[17px] leading-[1.6] text-agw-ink">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card data={cards[0]} />
          <Card data={cards[1]} />
        </div>
      </div>
    </section>
  );
}
