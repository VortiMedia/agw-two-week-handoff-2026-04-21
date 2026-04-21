import Image from "next/image";
import Link from "next/link";
import { AGW_BRAND } from "@/lib/brand-assets";
import { SITE_NAME } from "@/lib/site-data";

export function AgwLogo({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={SITE_NAME}
      className="inline-flex min-w-0 flex-col gap-1"
    >
      <div className="relative h-8 w-[11.5rem] sm:h-10 sm:w-[15.5rem] lg:w-[16rem]">
        <Image
          src={AGW_BRAND.logoLockup}
          alt=""
          aria-hidden="true"
          fill
          priority={priority}
          sizes="(max-width: 640px) 184px, 256px"
          className="object-contain object-left"
        />
      </div>
      <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-text-soft)] lg:block">
        Pelham office serving Westchester, Fairfield, Rockland, and Putnam
      </span>
    </Link>
  );
}
