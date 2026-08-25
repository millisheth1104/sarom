"use client";

import { useEffect, type ElementType, type ReactNode } from "react";
import { registerGsap, initReveals, initParallax, ScrollTrigger } from "@/lib/motion";

/**
 * Mounts the page-wide motion engine once. Individual sections layer their
 * own scroll-linked choreography on top of this.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    // Run immediately rather than inside rAF: a background tab suspends rAF,
    // and reveal start-states must never be what keeps content hidden.
    const killReveals = initReveals();
    const killParallax = initParallax();
    ScrollTrigger.refresh();

    // Re-measure once webfonts land — swapping to Avant Garde changes line
    // heights materially, and every scroll trigger is positioned off them.
    const onFonts = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onFonts).catch(() => {});

    // Failsafe: if anything above a fold-and-a-half is still hidden after a
    // few seconds, show it. Guards against a stalled ticker or a bad measure.
    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview]), [data-lines]:not([data-inview])")
        .forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top < window.innerHeight * 1.5) el.setAttribute("data-inview", "true");
        });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      killReveals();
      killParallax();
    };
  }, []);

  return <>{children}</>;
}

type RevealDir = "left" | "right" | "up" | "down" | "drift" | "fade" | "scale";

/**
 * Directional scroll reveal. Direction alternates section to section so the
 * page never repeats the same entrance twice in a row.
 */
export function Reveal({
  as: Tag = "div",
  dir = "up",
  delay,
  start,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  dir?: RevealDir;
  delay?: number;
  start?: string;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag
      className={className}
      data-reveal={dir}
      data-reveal-start={start}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Masked line-by-line display reveal. Each line rides up out of its own
 * clipping box with a slight rotation — the editorial "typeset" entrance.
 */
export function LineReveal({
  as: Tag = "h2",
  lines,
  className,
  step = 0.1,
  start,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  step?: number;
  start?: string;
}) {
  return (
    <Tag className={className} data-lines data-reveal-start={start}>
      <span className="lines">
        {lines.map((line, i) => (
          <span className="lines__line" key={i}>
            <span
              className="lines__inner"
              style={{ "--line-delay": `${i * step}s` } as React.CSSProperties}
            >
              {line}
              {/* Keeps the accessible name and copied text word-separated. */}
              {i < lines.length - 1 ? " " : null}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/**
 * Clip-path image reveal — the frame uncovers while the image settles from
 * 1.08 to 1, so the picture reads as being *uncovered* rather than faded in.
 */
export function ImageReveal({
  children,
  className = "",
  side = false,
  delay,
  start,
}: {
  children: ReactNode;
  className?: string;
  side?: boolean;
  delay?: number;
  start?: string;
}) {
  return (
    <div
      className={`reveal-img ${side ? "reveal-img--side" : ""} ${className}`.trim()}
      data-reveal="fade"
      data-reveal-start={start}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/** Slow horizontal typographic band used as a chapter break. */
export function Marquee({
  items,
  duration = 46,
  variant,
  reverse = false,
}: {
  items: string[];
  duration?: number;
  variant?: "meta";
  reverse?: boolean;
}) {
  const group = (
    <span className="marquee__group" aria-hidden="true">
      {items.map((item, i) => (
        <span className="marquee__item" key={i}>
          {item}
          <span className="marquee__star">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee ${variant === "meta" ? "marquee--meta" : ""}`.trim()}>
      <span className="sr-only">{items.join(", ")}</span>
      <div
        className="marquee__track"
        style={
          {
            "--marquee-dur": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {group}
        {group}
      </div>
    </div>
  );
}

/** Arrow glyph shared by buttons and text links. */
export function Arrow({ className = "btn__arrow" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
