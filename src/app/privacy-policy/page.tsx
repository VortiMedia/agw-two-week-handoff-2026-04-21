import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/agw/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy | A.G. Williams",
  description:
    "Privacy policy for A.G. Williams Painting website inquiries, quote requests, analytics, and support interactions.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const highlights = [
  "Website inquiries",
  "Quote request data",
] as const;

const cards = [
  {
    eyebrow: "Purpose",
    title: "Submitted information is used to respond and estimate.",
    body:
      "Visitors may share contact details, project information, property location, timing needs, and support requests through the website.",
  },
  {
    eyebrow: "Website tools",
    title: "Analytics, chat, and form tools may support the site.",
    body:
      "These tools can help measure page performance, preserve attribution, prevent spam, and make sure quote requests reach the office.",
  },
] as const;

const sections = [
  {
    title: "Information AGW may receive",
    body:
      "Visitors may provide basic contact and project information when using the website, the quote route, chat, or phone support.",
    items: [
      "Name, phone number, email address, and property location details",
      "Project notes, timing needs, scope descriptions, and submitted photos",
      "Basic website interaction data used for performance, analytics, or troubleshooting",
    ],
  },
  {
    title: "How that information may be used",
    body:
      "The practical intent is straightforward: respond to inquiries, route estimates correctly, support follow-up, and operate the website responsibly.",
    items: [
      "Respond to estimate and contact requests",
      "Coordinate residential walkthroughs or commercial consultations",
      "Maintain site operations, analytics, and customer-support follow-up",
    ],
  },
  {
    title: "Third-party services",
    body:
      "A.G. Williams may rely on website hosting, analytics, chat, form, advertising, and customer-support providers that process information for business purposes.",
    items: [
      "Website hosting and security providers",
      "Analytics and advertising measurement tools",
      "Customer support, chat, and lead-management systems",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <UtilityPageShell
      currentPath="/privacy-policy"
      eyebrow="Privacy"
      title="How website and quote request information is handled."
      intro="A.G. Williams uses information submitted through the website to answer questions, route estimates, follow up on project requests, and keep the site working correctly."
      highlights={highlights}
      primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Main Office", href: CONTACT.mainPhoneHref }}
      cards={cards}
      sections={sections}
      supportNote="For privacy questions, contact the office using the phone numbers listed on this site."
    />
  );
}
