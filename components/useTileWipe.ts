"use client";

import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * The staggered clip-path wipe the Showroom uses, made reusable.
 *
 * It does not cross-fade a grid — it closes each tile along ONE axis toward a
 * different edge, swaps the content, then opens them again on a stagger, so
 * the tiles read as separate panels rather than one moving block. Measured off
 * the reference slider's mid-transition frame.
 *
 * Lives here because three sections now need it. It was written inline in
 * Showroom first; copying it into the other two would have meant three places
 * to keep the easing, the stagger and the cleanup in step.
 */

/** Insets as [top, right, bottom, left] percentages, per tile. */
export type WipeEdges = readonly (readonly [number, number, number, number])[];

/** Default rotation: left, up-from-bottom, left, left, down-from-top. */
export const WIPE_EDGES: WipeEdges = [
  [0, 100, 0, 0],
  [100, 0, 0, 0],
  [0, 100, 0, 0],
  [0, 100, 0, 0],
  [0, 0, 100, 0],
];

/**
 * inset() for one tile, carrying its own corner radius.
 *
 * Percentages throughout and `round` on both ends, so GSAP sees the same
 * string structure at each end and interpolates number by number — and the
 * tile keeps its radius through the wipe instead of snapping square.
 */
const clip = (el: HTMLElement, sides: readonly number[]) =>
  `inset(${sides.map((s) => `${s}%`).join(" ")} round ${
    getComputedStyle(el).borderTopLeftRadius || "0px"
  })`;

export type TileWipe = (commit: () => void, dir: number) => void;

/**
 * @param tiles  re-queried on every call and again after the commit, so the
 *               cleanup lands on whatever nodes the re-render left behind
 *               rather than on stale references.
 * @param edges  per-tile directions; cycled if there are more tiles than entries.
 */
export function useTileWipe(
  tiles: () => HTMLElement[],
  edges: WipeEdges = WIPE_EDGES
): TileWipe {
  return (commit, dir) => {
    const els = tiles();
    if (!els.length || prefersReducedMotion()) {
      commit();
      return;
    }

    // Every tile is also a scroll-reveal target, so it carries a CSS
    // transition on opacity/transform (and clip-path on image reveals). Left
    // on, that transition would interpolate GSAP's per-frame writes and the
    // swap would drag. Suspend it, restore it after.
    els.forEach((el) => {
      el.style.transition = "none";
    });

    const restore = () =>
      tiles().forEach((el) => {
        el.style.transition = "";
        // GSAP writes the individual translate/rotate/scale properties, not
        // the transform shorthand; clear them or they shadow the reveal CSS.
        // clip-path must go too, or the tile keeps the inline open state
        // instead of falling back to the reveal system's own rule.
        ["opacity", "transform", "translate", "rotate", "scale", "clip-path"].forEach((p) =>
          el.style.removeProperty(p)
        );
      });

    const closedFor = (list: HTMLElement[]) => (_i: number, t: HTMLElement) =>
      clip(t, edges[list.indexOf(t) % edges.length] ?? edges[0]);
    const openFor = (_i: number, t: HTMLElement) => clip(t, [0, 0, 0, 0]);
    // Reverse the order going backwards, so the motion reads as coming from
    // the direction the reader asked for.
    const seq = (list: HTMLElement[]) => (dir > 0 ? list : [...list].reverse());

    gsap.to(seq(els), {
      clipPath: closedFor(els),
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.045,
      onComplete: () => {
        commit();
        requestAnimationFrame(() => {
          const fresh = tiles();
          if (!fresh.length) return;
          gsap.fromTo(
            seq(fresh),
            { clipPath: closedFor(fresh) },
            {
              clipPath: openFor,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.07,
              onComplete: restore,
            }
          );
        });
      },
    });
  };
}
