import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type CtaTracking = {
  event: string;
  location: string;
  label: string;
  context?: string;
};

type TrackedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "className" | "href"
> & {
  children: ReactNode;
  className?: string;
  href: string;
  tracking?: CtaTracking;
};

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

function getTrackingAttributes(href: string, tracking?: CtaTracking) {
  if (!tracking) {
    return {};
  }

  return {
    "data-cta-event": tracking.event,
    "data-cta-location": tracking.location,
    "data-cta-label": tracking.label,
    "data-cta-context": tracking.context,
    "data-cta-destination": href,
  };
}

export function TrackedLink({
  children,
  className,
  href,
  tracking,
  ...rest
}: TrackedLinkProps) {
  const trackingAttributes = getTrackingAttributes(href, tracking);

  if (isExternalHref(href)) {
    return (
      <a className={className} href={href} {...trackingAttributes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} {...trackingAttributes} {...rest}>
      {children}
    </Link>
  );
}
