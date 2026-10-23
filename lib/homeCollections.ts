/**
 * Homepage "03 — Collections": the client's curated selection, NOT the whole
 * catalogue. The e-catalogue page still shows everything (it reads
 * `CATALOGUES` directly); only this section is narrowed.
 *
 * Source: the client's sheet (2026-10-14) — 21 curtains, 21 upholstery,
 * 13 bedding. Hand-maintained; `catalogues.ts` is generated and must not
 * carry editorial choices like this.
 *
 * Client decisions recorded here so they are not "fixed" later:
 *  - Each name appears ONLY in the tab the sheet puts it in, even where the
 *    record is dual-purpose (Wilbert, Cinthia, Luxor-N, Velveto/Plush are
 *    Upholstery/Curtain) or filed differently (Angel is an Upholstery record,
 *    but the sheet lists it under Curtains — shown under Curtains).
 *  - Every one of the 55 now opens a catalogue PDF. Embroidery and Linera were
 *    photo-only placeholders until their PDFs arrived (2026-10-23).
 *  - Order inside a tab does not matter to the client; the sheet's order is kept.
 *  - "All" shows these 55, interleaved one per category.
 */
import { CATALOGUES, type Catalogue, type CategoryId } from "./catalogues";

/** Where a tile with no PDF sends the visitor. */
export const BEDSHEETS_WALL = "/ecatalogue/bedsheets";

const CURTAINS = [
  226, 228, 239, 241, 246, 232, 233, 234, 235, 247, 249, 238, 205, 229, 230,
  231, 136, 236, 237, 240, 245,
];

const UPHOLSTERY = [
  66, 53, 68, 87, 122, 99, 63, 70, 78, 97, 94, 121, 111, 223, 100, 110, 93,
  105, 114, 112, 123,
];

const BEDDING: (number | Catalogue)[] = [
  255, // Terra Weave
  227, // Bare Earth
  250, // Woven Harmony
  254, // Stone Crest
  256, // Embroidery
  248, // Soft Haven
  251, // Bamboo Comforter
  198, // Oscar
  257, // Linera
  253, // Statement Tape
  242, // Knitscape
  252, // Signature
  244, // Natura
];

const resolve = (list: (number | Catalogue)[]): Catalogue[] =>
  list.map((x) => {
    if (typeof x !== "number") return x;
    const c = CATALOGUES.find((r) => r.id === x);
    if (!c) throw new Error(`homeCollections: no catalogue with id ${x}`);
    return c;
  });

const TABS: Record<Exclude<CategoryId, "all">, Catalogue[]> = {
  curtains: resolve(CURTAINS),
  upholstery: resolve(UPHOLSTERY),
  bedsheets: resolve(BEDDING),
};

/** One per category in turn, so every page of three spans all three. */
const ALL: Catalogue[] = (() => {
  const out: Catalogue[] = [];
  const lists = [TABS.curtains, TABS.upholstery, TABS.bedsheets];
  const longest = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < longest; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
})();

/** The homepage's selection for a tab. Same signature as `byCategory`. */
export const homeByCategory = (id: CategoryId): Catalogue[] =>
  id === "all" ? ALL : TABS[id];

/** True when a tile links to a real catalogue PDF rather than the wall. */
export const isPdf = (c: Catalogue) => Boolean(c.pdf && c.pdf.toLowerCase().endsWith(".pdf"));
