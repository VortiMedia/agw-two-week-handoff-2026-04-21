"use client";

import { useEffect, useId, useRef, useState } from "react";

import { AgwLogo } from "@/components/agw-logo";
import { Button } from "@/components/agw/button";
import { TrackedLink } from "@/components/tracked-link";

export type NavLink = {
  label: string;
  href: string;
};

export type NavProps = {
  links?: NavLink[];
  phone?: { display: string; href: string; label?: string };
  primaryCta?: { label: string; href: string };
  className?: string;
};

const DEFAULT_LINKS: NavLink[] = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Portfolio", href: "#work" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "#reviews" },
];

const DEFAULT_PHONE = {
  display: "(914) 738-2860",
  href: "tel:+19147382860",
  label: "Pelham office",
};

const DEFAULT_CTA = {
  label: "Get a Quote",
  href: "/get-a-quote",
};

export function Nav({
  links = DEFAULT_LINKS,
  phone = DEFAULT_PHONE,
  primaryCta = DEFAULT_CTA,
  className,
}: NavProps) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC + focus trap
  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused =
      (document.activeElement as HTMLElement | null) ?? null;

    // Lock scroll behind the drawer
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first focusable element inside the drawer
    const focusFirst = () => {
      const root = drawerRef.current;
      if (!root) {
        return;
      }
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      focusables[0]?.focus();
    };
    focusFirst();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") {
        return;
      }
      const root = drawerRef.current;
      if (!root) {
        return;
      }
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("data-focus-skip"));
      if (focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const closeDrawer = () => setOpen(false);

  return (
    <header
      className={[
        "bg-agw-ivory",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav
        className={[
          "flex items-center justify-between gap-6",
          "border-b border-agw-bone bg-agw-ivory",
          "px-5 py-3 sm:px-8 lg:px-12 lg:py-3.5",
        ].join(" ")}
        aria-label="Primary"
      >
        <AgwLogo />

        {/* Desktop center links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={`${l.label}-${l.href}`}
              href={l.href}
              className={[
                "font-sans text-[13px] font-medium tracking-[0.02em]",
                "text-agw-ink transition-colors duration-[var(--dur-fast)]",
                "hover:text-agw-blue",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-5 lg:flex">
          <TrackedLink
            href={phone.href}
            tracking={{
              event: "phone_click",
              location: "nav",
              label: phone.display,
            }}
            className={[
              "inline-flex items-center gap-2",
              "font-sans text-[13px] font-semibold tracking-[0.02em] text-agw-blue",
              "hover:text-agw-blue-deep",
            ].join(" ")}
          >
            {phone.display}
            {phone.label ? (
              <span className="text-[11px] font-normal tracking-[0.03em] text-agw-ink-soft">
                {phone.label}
              </span>
            ) : null}
          </TrackedLink>
          <Button href={primaryCta.href} variant="primary" size="compact">
            {primaryCta.label}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((v) => !v)}
          className={[
            "relative inline-flex h-11 w-11 items-center justify-center lg:hidden",
            "rounded-md border border-agw-bone bg-agw-ivory",
            "text-agw-blue-ink transition-colors",
            "hover:border-agw-blue focus-visible:outline-none",
            "focus-visible:ring-[3px] focus-visible:ring-agw-blue/20",
          ].join(" ")}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            aria-hidden
            className="relative block h-4 w-5"
          >
            <span
              className={[
                "absolute left-0 right-0 top-0 h-[2px] bg-current",
                "transition-transform duration-200 ease-out",
                open ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 right-0 top-1/2 -mt-[1px] h-[2px] bg-current",
                "transition-opacity duration-150",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute bottom-0 left-0 right-0 h-[2px] bg-current",
                "transition-transform duration-200 ease-out",
                open ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id={drawerId}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className={[
          "lg:hidden",
          "fixed inset-x-0 top-0 z-30 bg-agw-ivory",
          "border-b border-agw-bone shadow-lg",
          "px-5 pb-8 pt-3 sm:px-8",
          "animate-in slide-in-from-top",
        ].join(" ")}
      >
        <div className="flex items-center justify-between">
          <AgwLogo />
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close menu"
            className={[
              "inline-flex h-11 w-11 items-center justify-center",
              "rounded-md border border-agw-bone bg-agw-ivory text-agw-blue-ink",
              "hover:border-agw-blue focus-visible:outline-none",
              "focus-visible:ring-[3px] focus-visible:ring-agw-blue/20",
            ].join(" ")}
          >
            <span aria-hidden className="text-[20px] leading-none">
              &times;
            </span>
          </button>
        </div>

        <ul
          role="list"
          className="mt-8 flex flex-col gap-1 border-t border-agw-bone pt-4"
        >
          {links.map((l) => (
            <li key={`drawer-${l.label}-${l.href}`}>
              <a
                href={l.href}
                onClick={closeDrawer}
                className={[
                  "block rounded-sm py-3",
                  "font-display text-[22px] font-bold text-agw-blue-ink",
                  "tracking-[-0.01em] leading-[1.2]",
                  "hover:text-agw-blue",
                ].join(" ")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 border-t border-agw-bone pt-6">
          <TrackedLink
            href={phone.href}
            onClick={closeDrawer}
            tracking={{
              event: "phone_click",
              location: "mobile-nav",
              label: phone.display,
            }}
            className={[
              "inline-flex items-baseline gap-3",
              "font-sans text-[17px] font-semibold text-agw-blue",
              "hover:text-agw-blue-deep",
            ].join(" ")}
          >
            {phone.display}
            {phone.label ? (
              <span className="text-[12px] font-normal tracking-[0.03em] text-agw-ink-soft">
                {phone.label}
              </span>
            ) : null}
          </TrackedLink>
          <Button
            href={primaryCta.href}
            variant="primary"
            onClick={closeDrawer}
            className="w-full"
          >
            {primaryCta.label}
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      {open ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          data-focus-skip
          onClick={closeDrawer}
          className={[
            "fixed inset-0 z-20 bg-agw-blue-ink/40 backdrop-blur-sm lg:hidden",
          ].join(" ")}
        />
      ) : null}
    </header>
  );
}
