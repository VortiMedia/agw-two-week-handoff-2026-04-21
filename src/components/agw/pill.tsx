import type { ReactNode } from "react";

type PillTone = "neutral" | "blue" | "celeste" | "ink" | "success";

type PillProps = {
  children: ReactNode;
  tone?: PillTone;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

const TONE: Record<PillTone, string> = {
  neutral: "bg-agw-ivory text-agw-ink-soft border border-agw-bone",
  blue: "bg-agw-blue text-agw-ivory",
  celeste: "bg-agw-celeste-soft text-agw-blue-ink",
  ink: "bg-agw-blue-ink text-agw-ivory",
  success:
    "bg-[color-mix(in_srgb,var(--agw-success)_12%,var(--agw-ivory))] " +
    "text-[color:var(--agw-success)] border border-[color-mix(in_srgb,var(--agw-success)_30%,var(--agw-bone))]",
};

export function Pill({
  children,
  tone = "neutral",
  leading,
  trailing,
  className,
}: PillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-pill",
        "px-3 py-1.5 font-sans text-[12px] font-semibold",
        "tracking-[0.02em] whitespace-nowrap",
        TONE[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {leading}
      {children}
      {trailing}
    </span>
  );
}
