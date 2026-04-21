import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import {
  GTM_CONTAINER_ID,
  HOMEPAGE_JSON_LD,
  LEADCONNECTOR_CHAT_LOADER_URL,
  LEADCONNECTOR_CHAT_RESOURCES_URL,
  LEADCONNECTOR_CHAT_WIDGET_ID,
} from "@/lib/site-data";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const poppinsUi = localFont({
  src: [
    {
      path: "../../brand-kit/02-fonts/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Avenir Next", "Helvetica Neue", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
  variable: "--font-ui",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agwilliamspainting.com"),
  title: "A.G. Williams Painting | Commercial and Residential Painting Since 1906",
  description:
    "Commercial painting, fireproofing, floor coatings, and residential painting across Westchester County, Fairfield County, Rockland County, and Putnam County.",
  keywords: [
    "commercial painting contractor westchester county",
    "commercial painting contractor fairfield county",
    "fireproofing contractor",
    "commercial floor coatings",
    "residential painting contractor",
    "painting contractor ct ny",
    "painters near me",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A.G. Williams Painting | Commercial and Residential Painting Since 1906",
    description:
      "Commercial painting, fireproofing, floor coatings, and residential painting guided by legacy, clear planning, and local trust.",
    siteName: "A.G. Williams Painting",
    locale: "en_US",
    type: "website",
    url: "/",
    images: [
      {
        url: "/agw-selected/hero-room.jpg",
        width: 1200,
        height: 630,
        alt: "Finished A.G. Williams interior with custom built-ins and trim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.G. Williams Painting | Commercial and Residential Painting Since 1906",
    description:
      "Commercial painting, fireproofing, floor coatings, and residential painting across Westchester, Fairfield, Rockland, and Putnam.",
    images: ["/agw-selected/hero-room.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppinsUi.variable} ${playfairDisplay.variable}`}>
      <body>
        <Script id="gtm-bootstrap" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(HOMEPAGE_JSON_LD),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const runScroll = () => {
                  const hash = window.location.hash;
                  if (!hash) return;
                  const id = hash.replace(/^#/, "");
                  const apply = () => {
                    const target = document.getElementById(id);
                    if (target) target.scrollIntoView({ block: "start" });
                  };
                  apply();
                  window.setTimeout(apply, 160);
                  window.setTimeout(apply, 480);
                };

                if (document.readyState === "complete") {
                  runScroll();
                } else {
                  window.addEventListener("load", runScroll, { once: true });
                }

                window.addEventListener("hashchange", runScroll);
              })();
            `,
          }}
        />
        <Script id="agw-data-layer-hooks" strategy="afterInteractive">
          {`
            (() => {
              window.dataLayer = window.dataLayer || [];
              window.agwPushEvent = (eventName, detail = {}) => {
                window.dataLayer.push({
                  event: eventName,
                  page_path: window.location.pathname,
                  page_title: document.title,
                  ...detail,
                });
              };

              document.addEventListener(
                "click",
                (event) => {
                  const target = event.target instanceof Element
                    ? event.target.closest("[data-cta-event]")
                    : null;

                  if (!target) return;

                  window.agwPushEvent(
                    target.getAttribute("data-cta-event") || "cta_click",
                    {
                      cta_location: target.getAttribute("data-cta-location") || "",
                      cta_label: target.getAttribute("data-cta-label") || "",
                      cta_context: target.getAttribute("data-cta-context") || "",
                      cta_destination: target.getAttribute("data-cta-destination") || "",
                    },
                  );
                },
                { capture: true },
              );
            })();
          `}
        </Script>
        {children}
        <Script
          src={LEADCONNECTOR_CHAT_LOADER_URL}
          data-resources-url={LEADCONNECTOR_CHAT_RESOURCES_URL}
          data-widget-id={LEADCONNECTOR_CHAT_WIDGET_ID}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
