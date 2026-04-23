import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/agw/button";
import { Eyebrow } from "@/components/agw/eyebrow";

export type GalleryTile = {
  image: { src: string; alt: string };
  category: string;
  projectName: string;
  description: string;
  /** Not currently branching visual tone — reserved for future meta styling. */
  accent?: "blue" | "ivory";
};

export type GalleryProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tiles: GalleryTile[];
  totalCount?: number;
  cta?: { label: string; href: string } | null;
  className?: string;
};

const DEFAULT_TILES: GalleryTile[] = [
  {
    image: { src: "/agw-selected/hero-room.jpg", alt: "Bronxville colonial exterior" },
    category: "Exterior · Colonial",
    projectName: "Bronxville, NY",
    description: "Full exterior · HC-172 & Simply White",
  },
  {
    image: { src: "/agw-selected/proof-detail.jpeg", alt: "Rye living room accent wall" },
    category: "Interior",
    projectName: "Rye Living Room",
    description: "Hale Navy accent wall",
  },
  {
    image: { src: "/agw-selected/process-door.jpg", alt: "Chappaqua kitchen cabinetry" },
    category: "Cabinetry",
    projectName: "Chappaqua Kitchen",
    description: "Spray-finished · Cloud White",
  },
  {
    image: { src: "/agw-selected/service-commercial.png", alt: "Greenwich office tower repaint" },
    category: "Commercial",
    projectName: "Greenwich Office Tower",
    description: "Fireproofing & repaint · 42,000 sq ft",
  },
  {
    image: { src: "/agw-selected/proof-exterior.jpeg", alt: "1912 Queen Anne restoration" },
    category: "Historic",
    projectName: "1912 Queen Anne",
    description: "Scarsdale · 9-color restoration",
  },
];

const TILE_POSITION = [
  // Large anchor tile: spans two rows on desktop, two columns on tablet
  "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
];

function TileMeta({ tile, isAnchor }: { tile: GalleryTile; isAnchor: boolean }) {
  return (
    <div className="absolute bottom-6 left-6 right-6 z-20 text-agw-ivory">
      <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] opacity-90">
        {tile.category}
      </div>
      <h4
        className={[
          "mt-2 font-display font-bold tracking-[-0.01em]",
          isAnchor ? "text-[30px]" : "text-[22px]",
        ].join(" ")}
      >
        {tile.projectName}
      </h4>
      <span className="font-sans text-[12px] opacity-80">{tile.description}</span>
    </div>
  );
}

export function Gallery({
  eyebrow = "Recent Transformations",
  title = (
    <>
      Before &amp; after. <em>The result is the proof.</em>
    </>
  ),
  description = "We lead with finished work because the finished work is what you're buying. Every project is photographed room-by-room, elevation-by-elevation. Browse the full portfolio to see what a five-year finish actually looks like at year five.",
  tiles = DEFAULT_TILES,
  totalCount = 240,
  cta = { label: "Start your project", href: "#estimate" },
  className,
}: GalleryProps) {
  const rendered = tiles.slice(0, 5);

  return (
    <section
      className={[
        "mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-12 grid gap-10 md:mb-16 md:grid-cols-2 md:items-end md:gap-16">
        <div>
          {eyebrow ? (
            <Eyebrow className="mb-5 before:mr-3 before:inline-block before:h-px before:w-8 before:bg-agw-blue before:content-['']">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <h2
            className={[
              "font-display font-bold text-agw-blue-ink",
              "text-[clamp(40px,4.4vw,60px)] leading-[1.15] tracking-[-0.02em]",
              "[&_em]:not-italic [&_em]:italic [&_em]:font-bold [&_em]:text-agw-blue",
            ].join(" ")}
          >
            {title}
          </h2>
        </div>
        {description ? (
          <p className="max-w-[48ch] font-sans text-[17px] leading-[1.6] text-agw-ink">
            {description}
          </p>
        ) : null}
      </div>

      <div
        className={[
          "grid gap-5",
          // Mobile: single column
          "grid-cols-1 grid-rows-none",
          // Tablet: 3 cols / 2 rows, anchor spans 2 cols
          "md:grid-cols-3 md:grid-rows-2 md:aspect-[16/10]",
          // Desktop: 4 cols / 2 rows, anchor spans 2x2
          "lg:grid-cols-4",
        ].join(" ")}
      >
        {rendered.map((tile, i) => {
          const isAnchor = i === 0;
          return (
            <div
              key={`${tile.projectName}-${i}`}
              className={[
                "group relative overflow-hidden rounded-md",
                "aspect-[4/3] md:aspect-auto",
                "transition-transform duration-300 ease-out hover:-translate-y-[3px]",
                TILE_POSITION[i] ?? "",
              ].join(" ")}
            >
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_50%,rgba(0,42,77,0.75)_100%)]"
              />
              <TileMeta tile={tile} isAnchor={isAnchor} />
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-agw-bone pt-8">
        <div className="font-display text-[18px] italic font-normal text-agw-ink-soft">
          <b className="not-italic font-bold text-agw-blue-ink">{totalCount}+</b> projects in the
          portfolio, reviewed through the same prep-first standard.
        </div>
        {cta ? (
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
