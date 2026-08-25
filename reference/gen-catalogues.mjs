/** Generate lib/catalogues.ts from the scraped manifest + downloaded covers. */
import { readFileSync, writeFileSync, statSync } from "node:fs";

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

/* ONE SLIDE PER BRAND — five slides, not a page-through of all 204.

   The showroom is a brand showcase; walking the whole catalogue is the job of
   the category-tabbed Collections section, which pages through everything.
   Chunking every brand here produced 43 slides, 27 of them SJ alone, which is
   not a carousel anyone would sit through.

   The five are sampled at even intervals across the brand's list, sorted by
   collection then title, so they span its collections instead of all coming
   from whichever sorts first. Only entries with a PDF and a cover qualify —
   every tile must lead somewhere real. */
const PER_SLIDE = 5;
const slides = BRAND_ORDER.map((brand) => {
  const pool = all
    .filter((c) => c.brand === brand && c.pdf && c.cover)
    .sort((a, b) => a.collection.localeCompare(b.collection) || a.title.localeCompare(b.title));
  const tiles =
    pool.length <= PER_SLIDE
      ? pool
      : Array.from({ length: PER_SLIDE }, (_, i) => pool[Math.floor((i * pool.length) / PER_SLIDE)]);
  return { brand, pool: pool.length, tiles };
});
console.log(`showroom slides: ${slides.length} (one per brand)`);
slides.forEach((s) =>
  console.log(
    `  ${s.brand.padEnd(12)} ${s.tiles.length} of ${s.pool} — ` +
      s.tiles.map((t) => `${t.title} (${t.collection})`).join(", ")
  )
);
/* ---------------------------------------------------------------------
   ALL-TAB ROTATION

   The All tab showed the first three of 204, which are all SJ curtains.
   Interleaving one per category means each page of three spans them.

   PRIMARY buckets: every catalogue lands in exactly one, so All cannot
   repeat a catalogue. Upholstery/Curtain goes to curtains — it has to sit
   somewhere, and the tab filters still match it under both.
   --------------------------------------------------------------------- */
const usable = all.filter((c) => c.pdf && c.cover);
const bucketOf = (c) =>
  c.brand === "Beds & More"
    ? "bedsheets"
    : c.collection === "Upholstery"
      ? "upholstery"
      : "curtains";

const buckets = { curtains: [], upholstery: [], bedsheets: [] };
usable.forEach((c) => buckets[bucketOf(c)].push(c));
Object.values(buckets).forEach((b) => b.sort((x, y) => x.title.localeCompare(y.title)));

const ROTATE = ["curtains", "upholstery", "bedsheets"];
const allRotation = [];
for (let i = 0; ; i++) {
  let added = false;
  for (const k of ROTATE) {
    if (buckets[k][i]) {
      allRotation.push(buckets[k][i].id);
      added = true;
    }
  }
  if (!added) break;
}
console.log(
  `All rotation: ${allRotation.length} (curtains ${buckets.curtains.length}, ` +
    `upholstery ${buckets.upholstery.length}, bedsheets ${buckets.bedsheets.length})`
);
if (allRotation.length !== usable.length) {
  console.log(`  WARNING: rotation ${allRotation.length} != usable ${usable.length}`);
}
const firstThree = allRotation.slice(0, 3).map((id) => {
  const c = usable.find((x) => x.id === id);
  return `${c.title} (${bucketOf(c)})`;
});
console.log("  first page of All:", firstThree.join(", "));

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
 * One slide per brand — five in total, each showing five catalogues sampled
 * across that brand's collections. Walking the whole catalogue is the job of
 * the category-tabbed Collections section, not this showcase.
 */
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

/**
 * One representative photograph per brand, for the House Brands section.
 * Picked by file weight, which tracks photographic richness — a flat or
 * washed-out cover compresses far smaller than a real interior shot.
 */
export const BRAND_HERO: Record<string, { cover: string; count: number }> = ${JSON.stringify(
  Object.fromEntries(
    BRAND_ORDER.map((brand) => {
      const pool = all.filter((c) => c.brand === brand && c.cover && c.pdf);
      const best = pool
        .map((c) => {
          let bytes = 0;
          try {
            // run from the repo root, so a relative path resolves
            bytes = statSync("public" + c.cover).size;
          } catch {}
          return { c, bytes };
        })
        .sort((x, y) => y.bytes - x.bytes)[0];
      return [brand, { cover: best?.c.cover ?? null, count: pool.length }];
    })
  ),
  null,
  2
)};

/** First slide index for each brand, so the bar can jump straight there. */
export const BRAND_STARTS = BRAND_ORDER.map((brand) => ({
  brand,
  index: SHOWROOM_SLIDES.findIndex((s) => s.brand === brand),
}));

/**
 * Category tabs for the homepage sections.
 *
 * NOTE ON "BEDSHEETS": the catalogue has no bedsheets collection — the three
 * collections are Curtains, Upholstery and Upholstery/Curtain. "Beds & More"
 * is a BRAND whose catalogues are themselves filed as curtains and
 * upholstery. Per the client's instruction the Bedsheets tab shows that
 * brand's range, so the label is a brand stand-in rather than a true
 * collection. Swap the predicate here if real bedsheet catalogues arrive.
 *
 * Upholstery/Curtain counts under BOTH Curtains and Upholstery, because that
 * is exactly what the collection name says it is.
 */
export const CATEGORY_TABS = [
  { id: "all", label: "All" },
  { id: "curtains", label: "Curtains" },
  { id: "upholstery", label: "Upholstery" },
  { id: "bedsheets", label: "Bedsheets" },
] as const;

export type CategoryId = (typeof CATEGORY_TABS)[number]["id"];

const MATCH: Record<Exclude<CategoryId, "all">, (c: Catalogue) => boolean> = {
  curtains: (c) => c.collection === "Curtains" || c.collection === "Upholstery/Curtain",
  upholstery: (c) => c.collection === "Upholstery" || c.collection === "Upholstery/Curtain",
  bedsheets: (c) => c.brand === "Beds & More",
};

/**
 * Order for the All tab: one catalogue per category, round-robin, so each
 * page of three shows a curtain, an upholstery and a bedsheet rather than
 * three consecutive SJ curtains.
 *
 * Built from ids because the buckets used to build it are PRIMARY buckets —
 * each catalogue sits in exactly one, so All never repeats a catalogue. That
 * differs from the tab filters above, where Upholstery/Curtain deliberately
 * matches both Curtains and Upholstery.
 */
export const ALL_ROTATION: number[] = ${JSON.stringify(allRotation)};

/** Catalogues in a category that can actually be opened and pictured. */
export const byCategory = (id: CategoryId): Catalogue[] => {
  const usable = CATALOGUES.filter((c) => c.pdf && c.cover);
  if (id === "all") {
    return ALL_ROTATION.map((n) => usable.find((c) => c.id === n)).filter(
      (c): c is Catalogue => Boolean(c)
    );
  }
  return usable.filter((c) => MATCH[id](c));
};

export const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORY_TABS.map((t) => [t.id, byCategory(t.id).length])
) as Record<CategoryId, number>;
`;

writeFileSync("lib/catalogues.ts", ts);
console.log("\nwrote lib/catalogues.ts");
