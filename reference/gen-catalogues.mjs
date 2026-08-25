/** Generate lib/catalogues.ts from the scraped manifest + downloaded covers. */
import { readFileSync, writeFileSync } from "node:fs";

const products = JSON.parse(readFileSync("reference/_catalogues.json", "utf8"));
const manifest = JSON.parse(readFileSync("reference/catalogue-manifest.json", "utf8"));
const { covers } = JSON.parse(readFileSync("reference/_covers.json", "utf8"));

const pdfById = new Map(manifest.catalogues.map((c) => [c.id, c.file]));
const coverById = new Map(covers.map((c) => [c.id, c.cover]));

const BRAND_ORDER = ["SJ", "Oofy", "Matlin", "Smart Plus", "Beds & More"];

const all = products.map((p) => ({
  id: p.id,
  title: p.title,
  brand: p.brand,
  collection: p.collection,
  type: p.type,
  cover: coverById.get(p.id) ?? null,
  pdf: pdfById.get(p.id) ?? null,
}));

const missingCover = all.filter((c) => !c.cover);
const missingPdf = all.filter((c) => !c.pdf);
console.log("catalogues:", all.length, "| no cover:", missingCover.length, "| no pdf:", missingPdf.length);

/* Five tiles per brand for the showroom bento. Sorted by collection then
   title for stability, then sampled at even intervals so the five span the
   brand's collections instead of all coming from one. Only catalogues that
   actually have a PDF are eligible — every tile must lead somewhere real. */
function pickFive(brand) {
  const pool = all
    .filter((c) => c.brand === brand && c.pdf && c.cover)
    .sort((a, b) => a.collection.localeCompare(b.collection) || a.title.localeCompare(b.title));
  if (pool.length <= 5) return pool;
  return Array.from({ length: 5 }, (_, i) => pool[Math.floor((i * pool.length) / 5)]);
}

const slides = BRAND_ORDER.map((brand) => ({ brand, tiles: pickFive(brand) }));
slides.forEach((s) =>
  console.log(`  ${s.brand}: ${s.tiles.length} tiles — ${s.tiles.map((t) => `${t.title} (${t.collection})`).join(", ")}`)
);

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
  type: string;
  cover: string | null;
  pdf: string | null;
};

export const BRAND_ORDER = ${JSON.stringify(BRAND_ORDER)} as const;

export const COLLECTIONS = ["Curtains", "Upholstery", "Upholstery/Curtain"] as const;

export const CATALOGUES: Catalogue[] = ${JSON.stringify(all, null, 2)};

/** Everything for one brand, in listing order. */
export const byBrand = (brand: string) => CATALOGUES.filter((c) => c.brand === brand);

/** Five tiles per brand for the showroom bento — see gen-catalogues.mjs. */
export const SHOWROOM_SLIDES = ${JSON.stringify(
  slides.map((s) => ({ brand: s.brand, tiles: s.tiles.map((t) => t.id) })),
  null,
  2
)}.map((s) => ({
  brand: s.brand,
  tiles: s.tiles
    .map((id) => CATALOGUES.find((c) => c.id === id))
    .filter((c): c is Catalogue => Boolean(c)),
}));
`;

writeFileSync("lib/catalogues.ts", ts);
console.log("\nwrote lib/catalogues.ts");
