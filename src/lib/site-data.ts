export type SitePath =
  | "/"
  | "/commercial"
  | "/residential"
  | "/heritage"
  | "/get-a-quote"
  | "/lp/residential-repainting"
  | "/lp/commercial-painting"
  | "/lp/cabinet-specialty-repainting"
  | "/contact"
  | "/about"
  | "/privacy-policy"
  | "/terms"
  | "/accessibility";

export const SITE_NAME = "A.G. Williams Painting Company";
export const SITE_URL = "https://agwilliamspainting.com";
export const QUOTE_URL = "/get-a-quote";
export const GTM_CONTAINER_ID = "GTM-W559QJ7C";
export const LEADCONNECTOR_CHAT_WIDGET_ID = "699ca6733303b66fe5e9d99c";
export const LEADCONNECTOR_CHAT_LOADER_URL =
  "https://widgets.leadconnectorhq.com/loader.js";
export const LEADCONNECTOR_CHAT_RESOURCES_URL =
  "https://widgets.leadconnectorhq.com/chat-widget/loader.js";

export const CONTACT = {
  mainPhoneLabel: "(800) 227-1906",
  mainPhoneHref: "tel:+18002271906",
  localPhoneLabel: "(914) 738-2860",
  localPhoneHref: "tel:+19147382860",
  officeAddress: "411 Fifth Avenue, Pelham, NY 10803",
};

export const SERVICE_AREAS = [
  "Westchester County",
  "Fairfield County",
  "Rockland County",
  "Putnam County",
];

export const PRIMARY_NAV = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Portfolio", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Commercial", href: "/commercial" },
  { label: "Residential", href: "/residential" },
  { label: "Heritage", href: "/heritage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: QUOTE_URL },
] as const;

export const UTILITY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const TOP_STRIP_CONTENT: Record<
  SitePath,
  { eyebrow: string; message: string }
> = {
  "/": {
    eyebrow: "Since 1906",
    message:
      "Residential painting carries a 5-year warranty, and commercial work is licensed and insured.",
  },
  "/commercial": {
    eyebrow: "Licensed & insured",
    message:
      "Commercial painting, fireproofing, and floor coatings planned for occupied properties and active jobsites.",
  },
  "/residential": {
    eyebrow: "5-year warranty",
    message:
      "Residential painting, cabinet work, and detail-driven prep handled by full-time crews.",
  },
  "/heritage": {
    eyebrow: "Pelham office",
    message:
      "A.G. Williams has served homes and properties from Pelham for more than a century.",
  },
  "/get-a-quote": {
    eyebrow: "Quote request",
    message:
      "Share the project details once. The Pelham office reviews the request and follows up with the right next step.",
  },
  "/lp/residential-repainting": {
    eyebrow: "Residential estimates",
    message:
      "Interior and exterior repainting requests route through the same Pelham office and residential walkthrough process.",
  },
  "/lp/commercial-painting": {
    eyebrow: "Commercial estimates",
    message:
      "Commercial painting requests are reviewed for access, schedule, documentation, and occupied-property constraints.",
  },
  "/lp/cabinet-specialty-repainting": {
    eyebrow: "Cabinet estimates",
    message:
      "Cabinet, millwork, and specialty repainting requests are routed for surface-specific review before pricing.",
  },
  "/contact": {
    eyebrow: "Pelham office",
    message:
      "Call the office or use the quote form when the property, schedule, or scope needs a clear next step.",
  },
  "/about": {
    eyebrow: "Since 1906",
    message:
      "A.G. Williams is a Pelham-based painting company serving local homes and properties since 1906.",
  },
  "/privacy-policy": {
    eyebrow: "Privacy",
    message:
      "A plain-English summary of how website inquiries, quote requests, analytics, and support data may be handled.",
  },
  "/terms": {
    eyebrow: "Website terms",
    message:
      "These terms explain use of the website and clarify that project commitments require direct AGW documentation.",
  },
  "/accessibility": {
    eyebrow: "Accessibility support",
    message:
      "Accessibility support is available through the Pelham office if any part of the site is difficult to use.",
  },
};

export const SHELL_ACTIONS: Record<
  SitePath,
  {
    topLinkLabel: string;
    topLinkHref: string;
    headerPrimaryLabel: string;
    headerPrimaryHref: string;
    mobilePrimaryLabel: string;
    headerSecondaryLabel: string;
    headerSecondaryHref: string;
    footerCtaLabel: string;
    footerCtaHref: string;
  }
> = {
  "/": {
    topLinkLabel: "Get a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Get a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Get a Quote",
    headerSecondaryLabel: "Call Pelham Office",
    headerSecondaryHref: CONTACT.localPhoneHref,
    footerCtaLabel: "Get a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/commercial": {
    topLinkLabel: "Commercial Consultation",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Commercial Consultation",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Consultation",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Request a Commercial Consultation",
    footerCtaHref: QUOTE_URL,
  },
  "/residential": {
    topLinkLabel: "Residential Walkthrough",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Residential Walkthrough",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Walkthrough",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Schedule a Residential Walkthrough",
    footerCtaHref: QUOTE_URL,
  },
  "/heritage": {
    topLinkLabel: "Get a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Get a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Get a Quote",
    headerSecondaryLabel: "Call Pelham Office",
    headerSecondaryHref: CONTACT.localPhoneHref,
    footerCtaLabel: "Get a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/get-a-quote": {
    topLinkLabel: "Start a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Start a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Start a Quote",
    headerSecondaryLabel: "Call Pelham Office",
    headerSecondaryHref: CONTACT.localPhoneHref,
    footerCtaLabel: "Start a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/lp/residential-repainting": {
    topLinkLabel: "Start a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Start a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Start a Quote",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Start a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/lp/commercial-painting": {
    topLinkLabel: "Commercial Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Commercial Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Quote",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Request a Commercial Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/lp/cabinet-specialty-repainting": {
    topLinkLabel: "Cabinet Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Cabinet Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Quote",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Request a Cabinet Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/contact": {
    topLinkLabel: "Start a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Start a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Start a Quote",
    headerSecondaryLabel: "Call Pelham Office",
    headerSecondaryHref: CONTACT.localPhoneHref,
    footerCtaLabel: "Start a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/about": {
    topLinkLabel: "Get a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Get a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Get a Quote",
    headerSecondaryLabel: "Call Pelham Office",
    headerSecondaryHref: CONTACT.localPhoneHref,
    footerCtaLabel: "Get a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/privacy-policy": {
    topLinkLabel: "Get a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Get a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Get a Quote",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Get a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/terms": {
    topLinkLabel: "Get a Quote",
    topLinkHref: QUOTE_URL,
    headerPrimaryLabel: "Get a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Get a Quote",
    headerSecondaryLabel: "Call Main Office",
    headerSecondaryHref: CONTACT.mainPhoneHref,
    footerCtaLabel: "Get a Quote",
    footerCtaHref: QUOTE_URL,
  },
  "/accessibility": {
    topLinkLabel: "Contact the Office",
    topLinkHref: CONTACT.localPhoneHref,
    headerPrimaryLabel: "Start a Quote",
    headerPrimaryHref: QUOTE_URL,
    mobilePrimaryLabel: "Start a Quote",
    headerSecondaryLabel: "Call Pelham Office",
    headerSecondaryHref: CONTACT.localPhoneHref,
    footerCtaLabel: "Contact the Office",
    footerCtaHref: CONTACT.localPhoneHref,
  },
};

export const TRUST_SIGNALS = [
  "Since 1906",
  "Licensed & insured",
  "5-year residential warranty",
  "Full-time crews",
];

export const HOME_TRUST_POINTS = [
  {
    title: "Since 1906",
    body:
      "A.G. Williams has been painting homes, facilities, and commercial properties in this region for more than a century.",
  },
  {
    title: "Licensed & insured",
    body:
      "Commercial clients can confirm insurance and the basic job requirements before the schedule starts moving.",
  },
  {
    title: "5-year warranty",
    body:
      "Residential painting is backed by a real 5-year warranty, so homeowners know what stands behind the work.",
  },
  {
    title: "Full-time crews",
    body:
      "Projects are handled by professional painters used to working cleanly in lived-in homes and occupied buildings.",
  },
] as const;

export const HOME_PATHS = [
  {
    label: "Commercial",
    title: "Commercial painting, fireproofing, and floor coatings.",
    body:
      "For owners, facility teams, and general contractors who need the scope planned clearly and the work run without noise.",
    href: "/commercial",
    points: [
      "Occupied-property scheduling",
      "Fireproofing coordination",
      "Floor coating systems",
    ],
  },
  {
    label: "Residential",
    title: "Residential painting led by walkthroughs and backed by warranty.",
    body:
      "For homeowners who care about prep, communication, and a finish that still looks right long after the job is done.",
    href: "/residential",
    points: [
      "Interior and exterior painting",
      "Cabinets and fine finish work",
      "Protection, prep, and detail",
    ],
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Share the project basics",
    body:
      "A quick call tells AGW whether the job is commercial, residential, or a specialty scope so the next step is right the first time.",
  },
  {
    title: "Walk the property",
    body:
      "AGW looks at surfaces, access, protection, sequencing, and finish expectations before the proposal is finalized.",
  },
  {
    title: "Run the work cleanly",
    body:
      "Crews, communication, and timing stay organized so owners, tenants, and homeowners are not left chasing updates.",
  },
] as const;

export const HOME_REVIEWS = [
  {
    quote:
      "Professional, efficient, and courteous from the estimate through the daily walkthroughs.",
    name: "Michael P.",
    location: "Yorktown Heights, NY",
  },
  {
    quote:
      "The wallpaper work far exceeded what this homeowner had seen from previous vendors.",
    name: "Amanda L.",
    location: "Cross River, NY",
  },
  {
    quote:
      "The floor-coating process matched exactly what was promised, and the finish beat expectations.",
    name: "Paul A.",
    location: "Stamford, CT",
  },
] as const;

export const COMMERCIAL_STANDARDS = [
  {
    title: "Occupied-space planning",
    body:
      "Commercial work is organized around the building’s actual operating rhythm, with access plans and sequencing that protect uptime.",
  },
  {
    title: "Compliance visibility",
    body:
      "Insurance, safety readiness, and specification awareness are made clear early so buyers do not have to dig for the basics.",
  },
  {
    title: "Project management discipline",
    body:
      "The work is not only about finish quality. It is about keeping owners, facilities teams, and contractors aligned from start to closeout.",
  },
] as const;

export const COMMERCIAL_SERVICES = [
  {
    id: "painting",
    title: "Commercial Painting",
    href: "/commercial#painting",
    description:
      "Interior and exterior painting for office buildings, multifamily properties, retail environments, healthcare spaces, and other occupied facilities.",
    bullets: [
      "Phased scheduling and low-disruption planning",
      "Clear communication for owners, tenants, and on-site teams",
      "Scope and finish standards aligned before crews mobilize",
    ],
  },
  {
    id: "fireproofing",
    title: "Fireproofing",
    href: "/commercial#fireproofing",
    description:
      "Fireproofing and related coating work handled with the specification awareness and schedule discipline commercial projects require.",
    bullets: [
      "Coordination with inspections and downstream trades",
      "Documentation that supports procurement and closeout",
      "Field execution planned around the real construction sequence",
    ],
  },
  {
    id: "floors",
    title: "Commercial Floor Coatings",
    href: "/commercial#floors",
    description:
      "Floor coating systems for warehouses, back-of-house spaces, and hard-working facilities where durability and operational continuity matter.",
    bullets: [
      "System selection guided by wear, traction, and exposure",
      "Prep requirements surfaced before schedule pressure hits",
      "Install timing built around access and reopening realities",
    ],
  },
] as const;

export const COMMERCIAL_EXPECTATIONS = [
  {
    title: "Clear mobilization planning",
    body:
      "AGW helps align access, off-hours work, protection, and sequencing before the first day on site gets expensive.",
  },
  {
    title: "Straight answers during the job",
    body:
      "Owners and facility teams are never left guessing where things stand. The expectation is organized communication, not radio silence.",
  },
  {
    title: "Closeout without loose ends",
    body:
      "A commercial project finishes with the punch work handled, the site left clean, and the owner clear on what was completed.",
  },
] as const;

export const RESIDENTIAL_SERVICES = [
  {
    title: "Interior and exterior painting",
    description:
      "Residential painting for homes and estates where protection, prep, and finish quality all matter to the final impression.",
  },
  {
    title: "Cabinet refinishing and detail work",
    description:
      "Fine finish work, built-ins, millwork, and cabinetry handled with the patience and surface care they require.",
  },
  {
    title: "Wallpaper support and surface preparation",
    description:
      "Careful wall preparation, repairs, and related finishing support for rooms that need more than a quick cosmetic pass.",
  },
] as const;

export const RESIDENTIAL_WALKTHROUGH_POINTS = [
  "Rooms, surfaces, and the level of preparation the home needs",
  "Scheduling, protection plans, and how the crew will move through the property",
  "Finish expectations, special concerns, and the right next-step proposal",
] as const;

export const RESIDENTIAL_FAQS = [
  {
    question: "What happens after the first inquiry?",
    answer:
      "AGW schedules a walkthrough to see the home, understand the surfaces, and prepare a proposal based on the actual scope.",
  },
  {
    question: "Is residential work covered by a warranty?",
    answer:
      "Yes. Residential painting is backed by a 5-year warranty, which gives homeowners a clear standard to hold onto after the work is complete.",
  },
  {
    question: "What areas does A.G. Williams serve?",
    answer:
      "The company regularly works across Westchester County, Fairfield County, Rockland County, and Putnam County.",
  },
  {
    question: "Can AGW handle detailed prep and high-finish rooms?",
    answer:
      "Yes. The residential offering is built around careful preparation, strong protection habits, and finish work that respects higher-value interiors.",
  },
] as const;

export const LOCAL_FAQS = [
  {
    question: "What happens after the first inquiry?",
    answer:
      "The next step is usually a walkthrough or estimate visit so the property, schedule, and scope can be evaluated before pricing is finalized.",
  },
  {
    question: "Does A.G. Williams handle both commercial and residential work?",
    answer:
      "Yes. Commercial work is built around planning, compliance, and occupied-property execution, while residential work keeps the same standard of communication and care.",
  },
  {
    question: "What areas does A.G. Williams serve?",
    answer:
      "Projects are centered around Westchester County, Fairfield County, Rockland County, and Putnam County.",
  },
  {
    question: "Why do clients start with a walkthrough?",
    answer:
      "Because good pricing and clean execution depend on seeing the property first. The walkthrough lets AGW scope access, surfaces, prep, and timeline honestly.",
  },
] as const;

export const HERITAGE_POINTS = [
  {
    title: "A century of local work",
    body:
      "The company has stayed rooted in the same region for generations, which means its reputation still has to hold up close to home.",
  },
  {
    title: "Craftsmanship with accountability",
    body:
      "Careful preparation, cleaner communication, and steady field leadership matter more than flashy promises when the property is valuable.",
  },
  {
    title: "Commercial and residential trust",
    body:
      "The same standards that reassure homeowners also matter to commercial buyers who want the basics handled well from day one.",
  },
] as const;

export const HERITAGE_THEMES = [
  {
    title: "Long relationships build the business",
    body:
      "A company that has lasted this long does it by keeping work quality, referrals, and local trust moving in the same direction.",
  },
  {
    title: "Preparation is part of the finished product",
    body:
      "Clients notice the final coat, but the real standard shows up in how carefully the team protects, prepares, and communicates before that.",
  },
  {
    title: "The local name still has to mean something",
    body:
      "The founding date only matters if clients still see present-day reliability, accountability, and follow-through.",
  },
] as const;

export const HOMEPAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "PaintingContractor",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: CONTACT.mainPhoneLabel,
  address: {
    "@type": "PostalAddress",
    streetAddress: "411 Fifth Avenue",
    addressLocality: "Pelham",
    addressRegion: "NY",
    postalCode: "10803",
    addressCountry: "US",
  },
  areaServed: SERVICE_AREAS,
  slogan:
    "Commercial and residential painting handled with clear planning, careful crews, and century-old standards.",
};
