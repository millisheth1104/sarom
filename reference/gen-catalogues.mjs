/** Generate lib/catalogues.ts from the scraped manifest + downloaded covers. */
import { readFileSync, writeFileSync } from "node:fs";

const products = JSON.parse(readFileSync("reference/_catalogues.json", "utf8"));
const manifest = JSON.parse(readFileSync("reference/catalogue-manifest.json", "utf8"));
const { covers } = JSON.parse(readFileSync("reference/_covers.json", "utf8"));

const pdfById = new Map(manifest.catalogues.map((c) => [c.id, c.file]));
const coverById = new Map(covers.map((c) => [c.id, c.cover]));

const BRAND_ORDER = ["SJ", "Oofy", "Matlin", "Smart Plus", "Beds & More"];

/* ---------------------------------------------------------------------
   TYPE NORMALISATION

   The source data carries 43 distinct `type` values for 209 records, and
   some are plainly data-entry slips. The client cannot amend sarom.info,
   so the corrections are applied here instead — and only where the intent
   is unambiguous. Each record keeps its original in `typeRaw`, so nothing
   is silently rewritten and the mapping stays auditable.
   --------------------------------------------------------------------- */
const TYPE_FIXES = {
  // Letter-level typos. "Artificial Leather" is already used by 9 other
  // records and "Velvet" by many, so the intended spelling is not in doubt.
  "Artifiacial Leather": "Artificial Leather",
  "Velevt / Digital Print": "Velvet / Digital Print",
  // The same type entered two ways. Collapsed onto the singular form, which
  // matches the majority spelling used elsewhere ("Embroidered Sheer" x5).
  "Plain Sheers": "Plain Sheer",
  "Embroidery Sheer": "Embroidered Sheer",
};

/* Three records have the catalogue's own NAME in the type field (Infinty,
   Azzurra, Capri) — which is why a tile read "INFINTY | INFINTY". The real
   type is not recoverable from the data, and inventing one would be worse
   than saying less, so these fall back to the collection: less specific,
   but true. */
const nameInTypeField = (p) =>
  p.type.trim().toLowerCase() === p.title.trim().toLowerCase();

const corrections = [];
const all = products.map((p) => {
  let type = TYPE_FIXES[p.type] ?? p.type;
  let reason = TYPE_FIXES[p.type] ? "typo" : null;
  if (nameInTypeField(p)) {
    type = p.collection;
    reason = "type field held the catalogue name";
  }
  if (reason) corrections.push({ title: p.title, from: p.type, to: type, reason });
  return {
    id: p.id,
    title: p.title,
    brand: p.brand,
    collection: p.collection,
    type,
    typeRaw: p.type,
    cover: coverById.get(p.id) ?? null,
    pdf: pdfById.get(p.id) ?? null,
  };
});

console.log(`type corrections applied: ${corrections.length}`);
corrections.forEach((c) => console.log(`  ${c.title}: "${c.from}" -> "${c.to}"  (${c.reason})`));
console.log(
  `distinct types: ${new Set(products.map((p) => p.type)).size} -> ${new Set(all.map((c) => c.type)).size}`
);

const missingCover = all.filter((c) => !c.cover);
const missingPdf = all.filter((c) => !c.pdf);
console.log("catalogues:", all.length, "| no cover:", missingCover.length, "| no pdf:", missingPdf.length);

/* EVERY catalogue is reachable: each brand's list is chunked into pages of
   five, one page per slide, so paging through the slider walks the whole
   209-record set rather than a hand-picked handful. Sorted by collection
   then title so the order is stable and groups by collection. Only entries
   with a PDF and a cover are eligible — every tile must lead somewhere. */
const PER_SLIDE = 5;
const slides = [];
for (const brand of BRAND_ORDER) {
  const pool = all
    .filter((c) => c.brand === brand && c.pdf && c.cover)
    .sort((a, b) => a.collection.localeCompare(b.collection) || a.title.localeCompare(b.title));
  const pages = Math.ceil(pool.length / PER_SLIDE);
  for (let p = 0; p < pages; p++) {
    const tiles = pool.slice(p * PER_SLIDE, (p + 1) * PER_SLIDE);
    // A trailing partial page would leave holes in the bento, so top it up
    // by reaching back into the brand's own list.
    while (tiles.length < PER_SLIDE && pool.length >= PER_SLIDE) {
      tiles.push(pool[tiles.length % pool.length]);
    }
    slides.push({ brand, page: p + 1, pages, tiles });
  }
}
const covered = new Set(slides.flatMap((s) => s.tiles.map((t) => t.id))).size;
const eligible = all.filter((c) => c.pdf && c.cover).length;
console.log(`slides: ${slides.length} | catalogues reachable: ${covered}/${eligible}`);
BRAND_ORDER.forEach((b) => {
  const s = slides.filter((x) => x.brand === b);
  console.log(`  ${b}: ${s.length} slide(s)`);
});

const ts = `/**
 * Sarom catalogue data — GENERATED, do not hand-edit.
 *
 * Source: https://sarom.info/ecatalogue.php (${all.length} records).
 * Regenerate with:  node reference/gen-catalogues.mjs
 *
 * \`pdf\` and \`cover\` are paths under /public. The PDFs themselves are NOT in
 * git (~660MB) — rebuild them with \`node reference/fetch-pdfs.mjs\`.
 * ${missingPdf.length} records have no PDF on the source site and carry \`pdf: null\`.
 */

export type Catalogue = {
  id: number;
  title: string;
  brand: string;
  collection: string;
  /** Normalised — see TYPE_FIXES in gen-catalogues.mjs. */
  type: string;
  /** Exactly as it appears on sarom.info, kept so corrections stay auditable. */
  typeRaw: string;
  cover: string | null;
  pdf: string | null;
};

export const BRAND_ORDER = ${JSON.stringify(BRAND_ORDER)} as const;

export const COLLECTIONS = ["Curtains", "Upholstery", "Upholstery/Curtain"] as const;

export const CATALOGUES: Catalogue[] = ${JSON.stringify(all, null, 2)};

/** Everything for one brand, in listing order. */
export const byBrand = (brand: string) => CATALOGUES.filter((c) => c.brand === brand);

/**
 * Every catalogue, chunked five-to-a-slide, grouped by brand. Paging the
 * slider walks the whole set rather than a hand-picked few.
 * \`page\`/\`pages\` are the position within that brand.
 */
export const SHOWROOM_SLIDES = ${JSON.stringify(
  slides.map((s) => ({ brand: s.brand, page: s.page, pages: s.pages, tiles: s.tiles.map((t) => t.id) })),
  null,
  2
)}.map((s) => ({
  brand: s.brand,
  page: s.page,
  pages: s.pages,
  tiles: s.tiles
    .map((id) => CATALOGUES.find((c) => c.id === id))
    .filter((c): c is Catalogue => Boolean(c)),
}));

/** First slide index for each brand, so the bar can jump straight there. */
export const BRAND_STARTS = BRAND_ORDER.map((brand) => ({
  brand,
  index: SHOWROOM_SLIDES.findIndex((s) => s.brand === brand),
}));
`;

writeFileSync("lib/catalogues.ts", ts);
console.log("\nwrote lib/catalogues.ts");
