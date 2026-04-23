import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "inverse"
  | "ghost-light";

type ButtonSize = "default" | "compact";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined;
    external?: undefined;
  };

type ButtonAsAnchor = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps | "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const BASE =
  "inline-flex items-center justify-center gap-[10px] font-sans font-semibold " +
  "tracking-[0.01em] rounded-md border border-transparent " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-[var(--dur-base)] " +
  "ease-[var(--ease-standard)] no-underline cursor-pointer select-none " +
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-agw-blue/20";

const SIZE: Record<ButtonSize, string> = {
  default: "text-[15px] min-h-[52px] px-7 py-4",
  compact: "text-[13px] min-h-0 px-[22px] py-3 tracking-[0.02em]",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-agw-blue text-agw-ivory font-bold " +
    "shadow-[0_10px_24px_-10px_rgba(0,99,176,0.55),inset_0_-2px_0_rgba(0,0,0,0.12)] " +
    "hover:bg-agw-blue-deep hover:-translate-y-px " +
    "hover:shadow-[0_14px_30px_-10px_rgba(0,99,176,0.65),inset_0_-2px_0_rgba(0,0,0,0.18)] " +
    "active:translate-y-0",
  secondary:
    "bg-agw-ivory text-agw-blue-ink border-agw-bone " +
    "hover:border-agw-blue hover:text-agw-blue",
  ghost:
    "bg-transparent text-agw-blue border-transparent " +
    "px-1 py-4 min-h-0 " +
    "after:content-['→'] after:ml-1 after:transition-transform after:duration-[var(--dur-base)] " +
    "hover:text-agw-blue-deep hover:after:translate-x-[3px]",
  inverse:
    "bg-agw-ivory text-agw-blue font-bold " +
    "shadow-[0_10px_24px_-10px_rgba(0,0,0,0.3)] " +
    "hover:-translate-y-px hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.4)] " +
    "active:translate-y-0",
  "ghost-light":
    "bg-transparent text-agw-celeste-soft border-transparent " +
    "px-1 py-4 min-h-0 " +
    "after:content-['→'] after:ml-1 after:transition-transform after:duration-[var(--dur-base)] " +
    "hover:text-agw-ivory hover:after:translate-x-[3px]",
};

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  extra: string | undefined,
): string {
  return [BASE, SIZE[size], VARIANT[variant], extra].filter(Boolean).join(" ");
}

function isAnchor(props: ButtonProps): props is ButtonAsAnchor {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const variant: ButtonVariant = props.variant ?? "primary";
  const size: ButtonSize = props.size ?? "default";

  if (isAnchor(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, children, href, external, variant: _v, size: _s, ...rest } = props;
    const combined = classes(variant, size, className);
    const isExternalHref = /^(https?:)?\/\//.test(href);
    if (isExternalHref) {
      const shouldOpenNewTab = external === true;
      return (
        <a
          href={href}
          className={combined}
          rel={shouldOpenNewTab ? "noopener noreferrer" : rest.rel}
          target={shouldOpenNewTab ? "_blank" : rest.target}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combined} {...rest}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, type, variant: _v, size: _s, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
