import type { ReactNode } from "react";

export type AnnouncementItem = {
  /** Bold, celeste-colored lead phrase (e.g. "0% financing"). */
  lead: ReactNode;
  /** Remaining message text rendered in ivory. */
  body: ReactNode;
};

export type AnnouncementBarProps = {
  items: AnnouncementItem[];
  className?: string;
};

/**
 * Slim dark bar at the top of the site. Renders a row of short
 * promo lines, each prefixed with a celeste dot and a bold phrase.
 */
export function AnnouncementBar({ items, className }: AnnouncementBarProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={[
        "bg-agw-blue-ink text-agw-ivory",
        "font-sans font-medium text-[12px] tracking-[0.04em]",
        "px-6 py-2.5",
        "flex flex-col flex-wrap items-center justify-center gap-x-10 gap-y-1 text-center sm:flex-row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex max-w-full min-w-0 items-center gap-2.5"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-agw-celeste"
          />
          <span className="min-w-0 leading-5">
            <b className="font-semibold text-agw-celeste">{item.lead}</b>{" "}
            {item.body}
          </span>
        </span>
      ))}
    </div>
  );
}
