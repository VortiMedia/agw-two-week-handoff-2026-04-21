import type { ComponentProps } from "react";
import type Image from "next/image";
import { AGW_CURATED_PHOTOS } from "@/lib/brand-assets";
import type { SitePath } from "@/lib/site-data";

type LandingPageImage = {
  src: ComponentProps<typeof Image>["src"];
  alt: string;
};

type LandingPageProjectType =
  | "interior-painting"
  | "commercial-repaint"
  | "cabinetry-millwork";

export type GoogleAdsLandingPage = {
  slug: string;
  path: Extract<
    SitePath,
    | "/lp/residential-repainting"
    | "/lp/commercial-painting"
    | "/lp/cabinet-specialty-repainting"
  >;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  eyebrow: string;
  headline: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  initialProjectType: LandingPageProjectType;
  heroImage: LandingPageImage;
  proof: readonly string[];
  serviceFit: {
    title: string;
    body: string;
    points: readonly string[];
  };
  results: readonly {
    title: string;
    body: string;
  }[];
  objections: readonly {
    question: string;
    answer: string;
  }[];
  quoteIntro: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export const GOOGLE_ADS_LANDING_PAGES = [
  {
    slug: "residential-repainting",
    path: "/lp/residential-repainting",
    metadata: {
      title: "Residential Repainting Estimates | A.G. Williams",
      description:
        "Request a residential repainting estimate for interiors, exteriors, trim, and finish-sensitive rooms across the A.G. Williams service area.",
      keywords: [
        "residential repainting estimate",
        "interior painters westchester",
        "exterior house painters fairfield county",
      ],
    },
    eyebrow: "Residential repainting",
    headline: "Residential repainting with prep, protection, and a finish that holds.",
    lead:
      "Send the home, timing, and surfaces once. The Pelham office reviews the details and follows up with the right residential next step.",
    primaryCta: "Start a residential quote",
    secondaryCta: "Call the office",
    initialProjectType: "interior-painting",
    heroImage: {
      src: AGW_CURATED_PHOTOS.homeExteriorFairfield,
      alt: "Residential exterior repaint completed by A.G. Williams",
    },
    proof: [
      "Since 1906",
      "5-year residential warranty",
      "Interior, exterior, trim, cabinets",
      "Westchester · Fairfield · Rockland · Putnam",
    ],
    serviceFit: {
      title: "Built for homeowners comparing standards, not just prices.",
      body:
        "Residential repainting depends on prep, protection, sequencing, and finish expectations. AGW starts with the actual home before pricing is finalized.",
      points: [
        "Interior and exterior repainting",
        "Trim, doors, stairwells, and finish-heavy rooms",
        "Protection plans for lived-in homes",
        "Walkthrough-led estimates and a 5-year warranty",
      ],
    },
    results: [
      {
        title: "The quote starts with the rooms and surfaces.",
        body:
          "The office needs enough context to route the request before an estimator reviews the actual property.",
      },
      {
        title: "The work is planned around the household.",
        body:
          "Protection, access, crew movement, and timing matter as much as the final coat.",
      },
      {
        title: "The warranty is part of the decision.",
        body:
          "A.G. Williams residential painting carries a 5-year warranty, so the finish has a clear standard behind it.",
      },
    ],
    objections: [
      {
        question: "Can I request only part of the home?",
        answer:
          "Yes. Use the notes field to describe the rooms, exterior areas, trim, or surfaces you want reviewed.",
      },
      {
        question: "Do I need exact measurements?",
        answer:
          "No. A short description is enough for the office to route the request and determine the right follow-up.",
      },
      {
        question: "What if I need cabinet work too?",
        answer:
          "Mention it in the notes. Cabinet and millwork work can be reviewed with the repainting scope.",
      },
    ],
    quoteIntro: {
      eyebrow: "Quote request",
      title: "Send the repainting details once.",
      body:
        "The form saves the request and gives the office the information needed to follow up cleanly.",
    },
  },
  {
    slug: "commercial-painting",
    path: "/lp/commercial-painting",
    metadata: {
      title: "Commercial Painting Estimates | A.G. Williams",
      description:
        "Request a commercial painting estimate for offices, facilities, retail spaces, multifamily properties, and occupied buildings.",
      keywords: [
        "commercial painting estimate",
        "occupied property painting contractor",
        "commercial painters westchester",
      ],
    },
    eyebrow: "Commercial painting",
    headline: "Commercial painting reviewed around access, schedule, and site conditions.",
    lead:
      "Send the building, timing, and scope. AGW reviews access, documentation, occupied-property needs, and any specialty coordination before follow-up.",
    primaryCta: "Start a commercial quote",
    secondaryCta: "Call the office",
    initialProjectType: "commercial-repaint",
    heroImage: {
      src: AGW_CURATED_PHOTOS.commercialFloor,
      alt: "Commercial coating and painting work completed by A.G. Williams",
    },
    proof: [
      "Licensed and insured",
      "Occupied-property planning",
      "Painting, coatings, and fireproofing",
      "Owners · facilities · contractors",
    ],
    serviceFit: {
      title: "For buyers who need the job run cleanly.",
      body:
        "Commercial work needs scope, schedule, occupants, access, and documentation surfaced early so the estimate starts in the right lane.",
      points: [
        "Office, retail, healthcare, and facility painting",
        "Multifamily and property-management repainting",
        "Off-hours or phased work where needed",
        "Related coatings and fireproofing review",
      ],
    },
    results: [
      {
        title: "Access gets discussed before crews arrive.",
        body:
          "Loading, occupied areas, tenant communication, and site constraints should be visible before pricing pressure starts.",
      },
      {
        title: "Documentation is not an afterthought.",
        body:
          "Commercial buyers can clarify insurance, safety, specification, and closeout expectations early.",
      },
      {
        title: "The office routes specialty work correctly.",
        body:
          "Painting, floor coatings, and fireproofing scopes can be separated or bundled based on the actual project.",
      },
    ],
    objections: [
      {
        question: "Can A.G. Williams work in occupied properties?",
        answer:
          "Yes. Use the form to flag hours, access limits, tenant concerns, or areas that need phased scheduling.",
      },
      {
        question: "Can I describe a bid or spec-driven job?",
        answer:
          "Yes. Add the key scope notes. The office can follow up for documents and requirements after submission.",
      },
      {
        question: "What if the work includes coatings or fireproofing?",
        answer:
          "Choose the closest project type or note the specialty scope. The office will route it appropriately.",
      },
    ],
    quoteIntro: {
      eyebrow: "Commercial quote request",
      title: "Send the commercial scope for office review.",
      body:
        "The quote form captures the core fields and keeps follow-up tied to the same team that will sort access, schedule, and scope.",
    },
  },
  {
    slug: "cabinet-specialty-repainting",
    path: "/lp/cabinet-specialty-repainting",
    metadata: {
      title: "Cabinet and Specialty Repainting Estimates | A.G. Williams",
      description:
        "Request a cabinet, millwork, built-in, or specialty repainting estimate from A.G. Williams.",
      keywords: [
        "cabinet repainting estimate",
        "cabinet refinishing westchester",
        "specialty repainting contractor",
      ],
    },
    eyebrow: "Cabinet and specialty repainting",
    headline: "Cabinet and millwork repainting starts with surface review.",
    lead:
      "Send the room, finish, timing, and contact details. AGW reviews whether the scope belongs in cabinets, millwork, built-ins, or another detail-heavy lane.",
    primaryCta: "Start a cabinet quote",
    secondaryCta: "Call the office",
    initialProjectType: "cabinetry-millwork",
    heroImage: {
      src: AGW_CURATED_PHOTOS.whiteKitchen,
      alt: "White kitchen cabinetry finished by A.G. Williams",
    },
    proof: [
      "Cabinets and millwork",
      "Detail-driven prep",
      "Residential finish standards",
      "Office-routed estimate review",
    ],
    serviceFit: {
      title: "For detail work where surface condition changes the answer.",
      body:
        "Cabinet and specialty repainting depends on substrate, coating history, finish expectations, and how the room can be protected during the work.",
      points: [
        "Kitchen cabinet repainting and refinishing",
        "Built-ins, paneling, vanities, and millwork",
        "Finish-sensitive rooms and trim packages",
        "Scope review before proposal details are finalized",
      ],
    },
    results: [
      {
        title: "The existing finish matters.",
        body:
          "Previously painted, stained, factory-finished, or damaged surfaces may need different preparation and finish systems.",
      },
      {
        title: "Protection is part of the scope.",
        body:
          "Cabinet and millwork projects often happen inside active homes, so containment and sequencing need to be discussed early.",
      },
      {
        title: "The goal is a finish-specific estimate.",
        body:
          "A short form starts the review, then the office can clarify details that affect the final recommendation.",
      },
    ],
    objections: [
      {
        question: "Do I need to know the current coating?",
        answer:
          "No. If you know whether it is paint, stain, or factory finish, add it. If not, the office can clarify later.",
      },
      {
        question: "Can the request include walls or trim too?",
        answer:
          "Yes. Use the notes field to list connected rooms, trim, doors, built-ins, or related repainting.",
      },
      {
        question: "Should I send photos?",
        answer:
          "Use the quote form first. The office can ask for photos or a review after the request is saved.",
      },
    ],
    quoteIntro: {
      eyebrow: "Specialty quote request",
      title: "Send the cabinet or millwork details.",
      body:
        "The office will review the request and follow up with the right next step for a finish-sensitive scope.",
    },
  },
] as const satisfies readonly GoogleAdsLandingPage[];

export type GoogleAdsLandingPageSlug =
  (typeof GOOGLE_ADS_LANDING_PAGES)[number]["slug"];

export function getGoogleAdsLandingPage(slug: string) {
  return GOOGLE_ADS_LANDING_PAGES.find((page) => page.slug === slug);
}
