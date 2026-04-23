import type { ReactNode } from "react";
import { Button } from "@/components/agw/button";
import { Eyebrow } from "@/components/agw/eyebrow";

export type TestimonialProps = {
  /** Small eyebrow label above the headline (e.g. "Client review"). */
  eyebrow?: ReactNode;
  /** Large Playfair headline on the left. Use `<em>` for celeste italic emphasis. */
  headline: ReactNode;
  /** Supporting copy below the headline. */
  supporting?: ReactNode;
  /** CTA button text. */
  ctaLabel?: ReactNode;
  /** CTA destination. */
  ctaHref?: string;
  /** The italic pull-quote (already wrapped in blockquote). */
  quote: ReactNode;
  /** Name/signature line for the quote. */
  authorName: ReactNode;
  /** Smaller metadata under the author (location, project, year). */
  authorMeta: ReactNode;
  /** Optional star rating count 1–5; defaults to 5. Pass 0 to hide. */
  stars?: number;
  /** Optional URL for the reviewer avatar. Falls back to a celeste-to-blue gradient. */
  avatarUrl?: string;
  className?: string;
};

/**
 * Dark-blue testimonial band. Left: eyebrow + headline, optional CTA.
 * Right: oversized quote mark, italic blockquote, author meta, stars.
 */
export function Testimonial({
  eyebrow,
  headline,
  supporting,
  ctaLabel,
  ctaHref,
  quote,
  authorName,
  authorMeta,
  stars = 5,
  avatarUrl,
  className,
}: TestimonialProps) {
  const clampedStars = Math.max(0, Math.min(5, stars));

  return (
    <section
      className={[
        "relative overflow-hidden",
        "bg-agw-blue text-agw-ivory",
        "px-6 py-[112px] md:px-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0",
          // Approximate the pattern mask with a soft diagonal fade.
          "bg-[radial-gradient(ellipse_at_20%_30%,rgba(108,187,232,0.18),transparent_60%)]",
          "mix-blend-screen opacity-80",
        ].join(" ")}
      />
      <div className="relative z-[1] mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div>
          {eyebrow ? (
            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-8 bg-agw-celeste"
              />
              <Eyebrow accent="celeste">{eyebrow}</Eyebrow>
            </div>
          ) : null}
          <p
            className={[
              "font-display font-bold text-agw-ivory",
              "text-[clamp(40px,4vw,56px)] leading-[1.12] tracking-[-0.02em]",
              "[text-wrap:balance] m-0",
              "[&_em]:not-italic [&_em]:font-bold [&_em]:italic [&_em]:text-agw-celeste [&_em]:pl-[0.06em]",
            ].join(" ")}
          >
            {headline}
          </p>
          {supporting ? (
            <p className="mt-5 max-w-[36ch] font-sans text-[15px] leading-[1.6] text-agw-ivory/80">
              {supporting}
            </p>
          ) : null}
          {ctaLabel && ctaHref ? (
            <div className="mt-7">
              <Button href={ctaHref} variant="inverse">
                {ctaLabel}
              </Button>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <span
            aria-hidden
            className={[
              "block font-display italic text-agw-celeste/70",
              "text-[140px] leading-[0.5] mb-8",
            ].join(" ")}
          >
            &ldquo;
          </span>
          <blockquote
            className={[
              "m-0 mb-9 font-display italic font-normal text-agw-ivory",
              "text-[clamp(26px,2.8vw,36px)] leading-[1.28] tracking-[-0.008em]",
              "[text-wrap:pretty]",
            ].join(" ")}
          >
            {quote}
          </blockquote>
          <div className="flex flex-wrap items-center gap-4 border-t border-agw-ivory/20 pt-7">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt=""
                className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="h-[52px] w-[52px] shrink-0 rounded-full bg-gradient-to-br from-agw-celeste to-agw-blue-deep"
              />
            )}
            <div className="flex-1">
              <strong className="block font-sans text-[14px] font-semibold tracking-[0.01em] text-agw-ivory">
                {authorName}
              </strong>
              <span className="font-sans text-[12px] tracking-[0.02em] text-agw-ivory/70">
                {authorMeta}
              </span>
            </div>
            {clampedStars > 0 ? (
              <div
                aria-label={`${clampedStars} out of 5 stars`}
                className="ml-auto font-sans text-[14px] tracking-[2px] text-agw-celeste"
              >
                {"★".repeat(clampedStars)}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
