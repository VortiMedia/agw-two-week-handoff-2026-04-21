import type { ReactNode } from "react";

type TrustChipProps = {
  icon?: ReactNode;
  label: ReactNode;
  headline?: ReactNode;
  className?: string;
};

export function TrustChip({ icon, label, headline, className }: TrustChipProps) {
  return (
    <div
      className={[
        "flex items-center gap-3 py-2.5 pl-2.5 pr-3.5",
        "font-sans text-[12px] font-medium text-agw-ink tracking-[0.02em]",
        "leading-[1.3]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon ? (
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center text-agw-blue"
        >
          {icon}
        </span>
      ) : null}
      <span className="flex flex-col">
        {headline ? (
          <strong className="block font-bold text-agw-blue-ink">{headline}</strong>
        ) : null}
        <span>{label}</span>
      </span>
    </div>
  );
}
