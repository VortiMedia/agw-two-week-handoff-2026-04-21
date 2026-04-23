import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/agw/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Accessibility | A.G. Williams",
  description:
    "Accessibility support for the A.G. Williams Painting website, including office contact paths for help using the site.",
  alternates: {
    canonical: "/accessibility",
  },
};

const highlights = [
  "Accessibility support",
  "Office fallback",
] as const;

const cards = [
  {
    eyebrow: "Support",
    title: "Contact the office if any part of the site is difficult to use.",
    body:
      "A.G. Williams can help provide information about services, estimates, and contact options in another format when needed.",
  },
  {
    eyebrow: "Site standards",
    title: "The site uses readable layouts and keyboard-visible controls.",
    body:
      "Accessibility work is treated as part of normal site quality, and reported barriers should be reviewed and corrected where practical.",
  },
] as const;

const sections = [
  {
    title: "How to get help",
    body:
      "If a visitor has trouble using the site or needs information in another format, the office is the immediate fallback path.",
    items: [
      `Pelham office: ${CONTACT.localPhoneLabel}`,
      `Main office: ${CONTACT.mainPhoneLabel}`,
      `Mailing address: ${CONTACT.officeAddress}`,
    ],
  },
  {
    title: "Current accessibility posture",
    body:
      "The site uses semantic Next.js routes, responsive layouts, readable contrast-aware styling, and visible focus states for core navigation and form controls.",
    items: [
      "Visitors should be able to navigate to support by phone if a page or control is difficult to use.",
      "Accessibility improvements should continue alongside site QA.",
      "Confirmed issues should be prioritized for remediation.",
    ],
  },
  {
    title: "Reporting a problem",
    body:
      "When reporting a problem, include the page, the device or browser being used, and what the visitor was trying to do.",
    items: [
      "The page or feature that caused trouble",
      "The format or help needed",
      "The best phone number or email for follow-up",
    ],
  },
] as const;

export default function AccessibilityPage() {
  return (
    <UtilityPageShell
      currentPath="/accessibility"
      eyebrow="Accessibility support"
      title="Accessibility support is available through the A.G. Williams office."
      intro="A.G. Williams wants visitors to be able to use the website, understand service options, and request help without unnecessary friction. If something on the site is difficult to access, contact the office and describe the issue."
      highlights={highlights}
      primaryCta={{ label: "Start a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Pelham Office", href: CONTACT.localPhoneHref }}
      cards={cards}
      sections={sections}
      supportNote="Phone support remains available when a digital page or control does not work as expected."
    />
  );
}
