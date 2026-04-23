import type { ReactNode } from "react";

export type FeatureCardData = {
  /** Large text in the circular seal (e.g. "5 yr"). */
  sealBig: ReactNode;
  /** Small uppercase text below it (e.g. "Warranty"). */
  sealSmall: ReactNode;
  /** Headline — use `<em>` for brand-blue italic emphasis. */
  title: ReactNode;
  /** Supporting paragraph copy. */
  description: ReactNode;
  /** Optional inline CTA. Omit on quieter proof strips. */
  ctaHref?: string;
  ctaLabel?: ReactNode;
};

export type FeaturesProps = {
  items: FeatureCardData[];
  className?: string;
};

/**
 * Two-up feature strip used for warranty + financing cards.
 * Each card: circular blue seal + headline + paragraph + text CTA.
 */
export function Features({ items, className }: FeaturesProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={[
        "grid gap-8 md:grid-cols-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => (
        <FeatureCard key={i} {...item} />
      ))}
    </div>
  );
}

function FeatureCard({
  sealBig,
  sealSmall,
  title,
  description,
  ctaHref,
  ctaLabel,
}: FeatureCardData) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-md",
        "bg-agw-paper border border-agw-bone",
        "p-7 md:p-8",
        "grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-sm",
          "bg-agw-blue text-agw-ivory font-display text-center",
          "shadow-[0_10px_24px_-10px_rgba(0,99,176,0.55)]",
        ].join(" ")}
      >
        <span className="font-bold text-[26px] leading-none tracking-[-0.02em]">
          {sealBig}
        </span>
        <span className="font-sans font-semibold text-[10px] uppercase tracking-[0.1em] mt-1">
          {sealSmall}
        </span>
      </div>
      <div>
        <h3
          className={[
            "font-display font-bold text-agw-blue-ink",
            "text-[24px] leading-[1.22] tracking-[-0.01em] mb-3",
            "[text-wrap:pretty]",
            "[&_em]:not-italic [&_em]:font-bold [&_em]:italic [&_em]:text-agw-blue [&_em]:pl-[0.06em]",
          ].join(" ")}
        >
          {title}
        </h3>
        <p className="font-sans text-[14px] leading-[1.6] text-agw-ink-soft mb-[18px]">
          {description}
        </p>
        {ctaHref && ctaLabel ? (
          <a
            href={ctaHref}
            className={[
              "inline-flex items-center gap-1.5",
              "font-sans font-semibold text-[13px] tracking-[0.02em] text-agw-blue",
              "transition-colors hover:text-agw-blue-deep",
              "after:content-['→'] after:transition-transform after:duration-[var(--dur-base)]",
              "hover:after:translate-x-[3px]",
            ].join(" ")}
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}
