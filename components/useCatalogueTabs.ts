"use client";

import { useState } from "react";
import {
  byCategory,
  CATEGORY_TABS,
  type CategoryId,
  type Catalogue,
} from "@/lib/catalogues";
import { useTileWipe, type WipeEdges } from "./useTileWipe";

/**
 * Shared state for the two category-tabbed homepage sections.
 *
 * Both the Collections composition and The Edit composition have the same
 * shape — a pill nav, a row of three thumbnails and one dominant image — so
 * the selection logic lives here rather than being written twice.
 *
 * `page` walks the category three at a time so every catalogue in a tab is
 * reachable, not just the first three. `sel` picks which of the three on the
 * current page is showing in the dominant slot.
 */
export function useCatalogueTabs(
  perPage = 3,
  /**
   * Tiles to run the Showroom's staggered wipe over when the content changes.
   * Optional: without it the section just swaps, as it did before.
   */
  tiles?: () => HTMLElement[],
  edges?: WipeEdges
) {
  const [tab, setTabState] = useState<CategoryId>("all");
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState(0);

  const items = byCategory(tab);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const pageItems = items.slice(page * perPage, page * perPage + perPage);
  // Guard the index: switching to a shorter final page would otherwise leave
  // `sel` pointing past the end and blank the dominant image.
  const active: Catalogue | undefined =
    pageItems[Math.min(sel, Math.max(0, pageItems.length - 1))] ?? items[0];

  const wipe = useTileWipe(tiles ?? (() => []), edges);

  /* Both the pills and the arrows wipe. `sel` does NOT: it moves on hover, and
     wiping the grid every time the pointer crosses a thumbnail would make the
     section unusable. Hover keeps the existing cross-fade. */
  const setTab = (t: CategoryId) => {
    if (t === tab) return;
    // Wipe toward where the tab actually sits, so jumping from All to
    // Bedsheets reads as moving forward rather than an arbitrary flick — the
    // same rule the Showroom's brand tabs use.
    const dir =
      CATEGORY_TABS.findIndex((x) => x.id === t) >=
      CATEGORY_TABS.findIndex((x) => x.id === tab)
        ? 1
        : -1;
    wipe(() => {
      setTabState(t);
      setPage(0);
      setSel(0);
    }, dir);
  };

  const step = (d: number) => {
    if (pages < 2) return;
    wipe(() => {
      setPage((p) => (p + d + pages) % pages);
      setSel(0);
    }, d);
  };

  return {
    tabs: CATEGORY_TABS,
    tab,
    setTab,
    page,
    pages,
    pageItems,
    sel,
    setSel,
    active,
    step,
    total: items.length,
  };
}
