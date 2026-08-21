"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, client-side only. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });
  registered = true;

  // Dev-only handles so scroll choreography can be driven and inspected from
  // the console (and from automated checks) without a compositing frame loop.
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as Record<string, unknown>).__gsap = gsap;
    (window as unknown as Record<string, unknown>).__ScrollTrigger = ScrollTrigger;
  }
}

/** Single source of truth for the reduced-motion preference. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const EASE_OUT_EXPO = "expo.out";

/**
 * Reveal engine.
 *
 * ScrollTrigger only flips a `data-inview` attribute — the actual transition
 * is owned by CSS. That keeps per-frame JS work at zero for the ~60 reveal
 * elements on the page while still giving us scroll-accurate triggering.
 *
 * Elements opt in with `data-reveal="left|right|up|down|drift|fade|scale"`.
 * Sibling stagger comes from `data-reveal-stagger` on a parent.
 */
export function initReveals(root: HTMLElement | Document = document): (() => void) {
  const reduced = prefersReducedMotion();
  const targets = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal], [data-lines]")
  );

  if (reduced) {
    targets.forEach((el) => el.setAttribute("data-inview", "true"));
    return () => {};
  }

  const triggers: ScrollTrigger[] = [];

  // Assign stagger delays from any parent that declares them.
  root
    .querySelectorAll<HTMLElement>("[data-reveal-stagger]")
    .forEach((parent) => {
      const step = parseFloat(parent.dataset.revealStagger || "0.09");
      const kids = Array.from(
        parent.querySelectorAll<HTMLElement>("[data-reveal], [data-lines]")
      ).filter((k) => k.closest("[data-reveal-stagger]") === parent);
      kids.forEach((kid, i) => {
        kid.style.setProperty("--reveal-delay", `${i * step}s`);
      });
    });

  targets.forEach((el) => {
    const once = el.dataset.revealOnce !== "false";
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: el.dataset.revealStart || "top 86%",
        once,
        onEnter: () => el.setAttribute("data-inview", "true"),
      })
    );
  });

  return () => triggers.forEach((t) => t.kill());
}

/**
 * Parallax layers.
 *
 * Writes a CSS custom property (`--py`) rather than touching `transform`
 * directly, so the CSS stays authoritative about how the offset composes
 * with any scale the element already carries.
 */
export function initParallax(root: HTMLElement | Document = document): (() => void) {
  if (prefersReducedMotion()) return () => {};

  const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
  const triggers: ScrollTrigger[] = [];

  layers.forEach((el) => {
    const depth = parseFloat(el.dataset.parallax || "0.12");
    const range = window.innerHeight * depth;

    const tween = gsap.fromTo(
      el,
      { "--py": `${-range}px` },
      {
        "--py": `${range}px`,
        ease: "none",
        scrollTrigger: {
          trigger: el.dataset.parallaxTrigger
            ? (el.closest(el.dataset.parallaxTrigger) as HTMLElement) || el
            : el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
    const st = tween.scrollTrigger;
    if (st) triggers.push(st);
  });

  return () => triggers.forEach((t) => t.kill());
}

/** Split a string into line-wrapped spans for the masked line-reveal effect. */
export function splitLines(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

export { gsap, ScrollTrigger };
