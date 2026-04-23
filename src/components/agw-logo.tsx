import Image from "next/image";
import Link from "next/link";
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
      className="group inline-flex min-w-0 items-center gap-3"
    >
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-agw-bone bg-agw-paper shadow-sm transition group-hover:border-agw-blue sm:h-14 sm:w-14">
        <Image
          src="/agw-logo.svg"
          alt=""
          aria-hidden="true"
          width={38}
          height={38}
          priority={priority}
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[20px] font-bold leading-none tracking-[-0.01em] text-agw-blue-ink sm:text-[23px]">
          A.G. Williams
        </span>
        <span className="mt-1 hidden font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-agw-ink-soft sm:block">
          Painting Company · Est. 1906
        </span>
      </span>
    </Link>
  );
}
