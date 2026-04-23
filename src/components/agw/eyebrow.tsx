import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  accent?: "blue" | "celeste";
  className?: string;
};

export function Eyebrow({ children, accent = "blue", className }: EyebrowProps) {
  const color = accent === "celeste" ? "text-agw-celeste" : "text-agw-blue";
  return (
    <span
      className={[
        "inline-flex items-center font-sans font-semibold",
        "text-[12px] leading-none uppercase",
        "tracking-[0.16em]",
        color,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
