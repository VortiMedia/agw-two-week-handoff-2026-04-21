import type { ReactNode } from "react";

export type ProofbarStat = {
  /** The large number. Pass the italic em as JSX if you want brand styling: `119 <em>yr</em>`. */
  num: ReactNode;
  /** Sub-label below the number. */
  label: ReactNode;
};

export type ProofbarProps = {
  stats: ProofbarStat[];
  className?: string;
};

/**
 * Horizontal strip of 4 stats (e.g. years in business, homes painted).
 * Collapses to two columns on small viewports.
 */
export function Proofbar({ stats, className }: ProofbarProps) {
  if (stats.length === 0) return null;

  return (
    <div
      className={[
        "mt-20 grid grid-cols-2 md:grid-cols-4",
        "border-t border-b border-agw-bone",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {stats.map((stat, i) => {
        const isLast = i === stats.length - 1;
        return (
          <div
            key={i}
            className={[
              "px-5 py-8 md:px-8 md:py-9",
              !isLast ? "md:border-r md:border-agw-bone" : "",
              i % 2 === 0 ? "border-r border-agw-bone md:border-r" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className={[
                "font-display font-bold text-agw-blue-ink",
                "text-[clamp(42px,12vw,56px)] leading-none tracking-[-0.025em] mb-2.5",
                // italic ems inside get brand styling
                "[&_em]:not-italic [&_em]:font-bold [&_em]:italic [&_em]:text-agw-blue [&_em]:pl-[0.06em]",
              ].join(" ")}
            >
              {stat.num}
            </div>
            <div className="font-sans text-[13px] leading-[1.45] text-agw-ink-soft max-w-[24ch]">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
