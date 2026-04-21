import patternOne from "../../brand-kit/03-patterns/pattern-1.png";
import patternThree from "../../brand-kit/03-patterns/pattern-3.png";
import patternFour from "../../brand-kit/03-patterns/pattern-4.png";
import summarySlide from "../../brand-kit/05-brand-reference/summary-slide.jpg";
import summarySlideOne from "../../brand-kit/05-brand-reference/summary-slide-1.jpg";
import presentationFour from "../../brand-kit/06-possible-site-assets/presentation-4.jpg";
import presentationThree from "../../brand-kit/06-possible-site-assets/presentation-3.jpg";

export const BRAND_PATTERNS = {
  hero: patternOne,
  accent: patternThree,
  grid: patternFour,
} as const;

export const BRAND_IMAGES = {
  home: summarySlide,
  heritage: summarySlideOne,
  commercial: presentationFour,
  residential: presentationThree,
} as const;

export const AGW_LIVE_ASSETS = {
  badge: "/agw-live/agw-badge.png",
  countiesMap: "/agw-live/counties-map.png",
  teamPhoto: "/agw-live/team-photo.jpg",
  residentialWarranty: "/agw-live/residential-warranty.png",
  serviceIcons: {
    residential: "/agw-live/home.svg",
    commercial: "/agw-live/building.svg",
    floors: "/agw-live/layers.svg",
  },
  proofLogos: {
    leadSafe: "/agw-live/leadsafe.png",
    google: "/agw-live/google.png",
    yelp: "/agw-live/yelp.png",
    ascc: "/agw-live/ascc.png",
    ampp: "/agw-live/ampp.png",
    isnetworld: "/agw-live/isnetworld.png",
  },
} as const;

export const AGW_BRAND = {
  logoLockup: "/agw-logo-lockup.png",
} as const;

export const AGW_SELECTED_PHOTOS = {
  heroRoom: "/agw-selected/hero-room.jpg",
  residentialService: "/agw-selected/service-residential.png",
  commercialService: "/agw-selected/service-commercial.png",
  processDoor: "/agw-selected/process-door.jpg",
  proofExterior: "/agw-selected/proof-exterior.jpeg",
  proofDetail: "/agw-selected/proof-detail.jpeg",
} as const;

export const AGW_APPROVED_PHOTOS = {
  heroRoom: "/agw-approved/hero-room.jpg",
  kitchenFinish: "/agw-approved/kitchen-finish.jpg",
  consultation: "/agw-approved/process-consultation.jpg",
  trim: "/agw-approved/process-trim.jpg",
  exteriorPainter: "/agw-approved/painter-exterior.jpg",
  floorFirehouse: "/agw-approved/floor-firehouse.jpg",
} as const;

export const AGW_CURATED_PHOTOS = {
  homeHeroVan: "/agw-curated/home-hero-van.png",
  homeExteriorFairfield: "/agw-curated/home-exterior-fairfield.jpg",
  residentialHeroRoom: "/agw-curated/residential-hero-room.jpg",
  residentialProcess: "/agw-curated/residential-process.jpg",
  residentialKitchen: "/agw-curated/residential-kitchen.jpg",
  whiteKitchen: "/agw-curated/white-kitchen.jpg",
  cabinetKitchen: "/agw-curated/cabinet-kitchen.jpg",
  westchesterKitchen: "/agw-curated/westchester-kitchen.jpg",
  interiorPainter: "/agw-curated/interior-painter.jpg",
  exteriorProcess: "/agw-curated/exterior-process.jpg",
  heritageVan: "/agw-curated/heritage-van.jpg",
  commercialFloor: "/agw-curated/commercial-floor.jpg",
} as const;
