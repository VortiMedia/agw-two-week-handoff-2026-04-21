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
      className="group inline-flex items-center gap-2 rounded-[1.6rem] px-1 py-1 sm:gap-3"
    >
      <span className="inline-flex rounded-full border border-[rgba(0,99,176,0.14)] bg-white p-1 shadow-[var(--shadow-soft)] transition-transform duration-150 group-hover:-translate-y-0.5">
        <Image
          src="/agw-logo.svg"
          alt=""
          aria-hidden="true"
          width={72}
          height={72}
          priority={priority}
          className="h-10 w-10 rounded-full sm:h-[4.5rem] sm:w-[4.5rem]"
        />
      </span>

      <span className="min-w-0">
        <span className="display-font block text-[0.98rem] leading-none tracking-[0.03em] text-[var(--color-primary)] sm:text-[1.24rem]">
          A.G. Williams
        </span>
        <span className="mt-1 block text-[0.56rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-soft)] sm:hidden">
          Painting Company · Est. 1906
        </span>
        <span className="mt-1 hidden text-[0.74rem] font-medium uppercase tracking-[0.28em] text-[var(--color-text-soft)] sm:block">
          Painting Company · Est. 1906
        </span>
      </span>
    </Link>
  );
}
