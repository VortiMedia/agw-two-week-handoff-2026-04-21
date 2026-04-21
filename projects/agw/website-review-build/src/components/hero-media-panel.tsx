import Image from "next/image";
import type { ComponentProps } from "react";

type HeroMediaPanelProps = {
  image: ComponentProps<typeof Image>["src"];
  alt: string;
  eyebrow: string;
  title: string;
  body?: string;
  tags?: ReadonlyArray<string>;
  priority?: boolean;
  imageClassName?: string;
};

export function HeroMediaPanel({
  image,
  alt,
  eyebrow,
  title,
  body,
  tags,
  priority = false,
  imageClassName = "object-cover",
}: HeroMediaPanelProps) {
  return (
    <div className="site-card relative overflow-hidden rounded-[2.35rem]">
      <div className="relative aspect-[6/5] sm:aspect-[5/4] lg:aspect-[4/5]">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : undefined}
          sizes="(min-width: 1024px) 38vw, (min-width: 640px) 72vw, 94vw"
          className={imageClassName}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,27,0.08)_0%,rgba(12,20,27,0.16)_42%,rgba(12,20,27,0.84)_100%)]" />

        <div className="absolute left-5 top-5">
          <span className="section-label !border-white/18 !bg-white/12 !text-white">
            {eyebrow}
          </span>
        </div>

        <div className="absolute right-5 top-5 rounded-full bg-white/92 p-2 shadow-[var(--shadow-soft)]">
          <Image
            src="/agw-logo.svg"
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="h-12 w-12"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <p className="display-font text-[clamp(2rem,3vw,2.75rem)] leading-[0.94] tracking-[-0.045em] text-white">
            {title}
          </p>

          {body ? (
            <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-white/84">
              {body}
            </p>
          ) : null}

          {tags?.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.76rem] font-medium uppercase tracking-[0.14em] text-white/88"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
