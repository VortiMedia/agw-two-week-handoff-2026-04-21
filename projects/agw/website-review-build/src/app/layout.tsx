import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import { HOMEPAGE_JSON_LD } from "@/lib/site-data";
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
        {children}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="699ca6733303b66fe5e9d99c"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
