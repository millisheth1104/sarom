/**
 * "02 — A showroom you can scroll": one slide per house brand, five tiles each.
 *
 * Hand-maintained, NOT generated. This used to live at the bottom of
 * `lib/catalogues.ts` as a list of catalogue ids, but the tiles are now the
 * client's own curated photographs rather than whatever a catalogue's cover
 * happens to be, so a tile can no longer be derived from a record alone — and
 * `catalogues.ts` is rewritten wholesale by `gen-catalogues.mjs`.
 *
 * SLOTS. The client's files arrive in three sizes that ARE the three slots of
 * the bento, so the placement below follows them rather than choosing:
 *     291x222  -> the three top cards      (tiles 0-2)
 *     581x313  -> the wide feature image   (tile 3)
 *     274x235  -> the side panel image     (tile 4)
 * Order inside the three cards is the zips' own alphabetical order.
 *
 * IMAGES live in /public/media/showroom/<brand-dir>/ and are re-cut from the print
 * originals by `reference/ingest-showroom.py` wherever one exists.
 *
 * LINKS. A tile opens the catalogue of the same NAME. If a tile ever has no
 * catalogue record to read (see `wall()`), it opens the e-catalogue wall
 * already filtered to that brand rather than a dead end or someone else's PDF —
 * as the seven curtain tiles did until the client's 2026-10-23 PDF drop.
 */
import { CATALOGUES, BRAND_ORDER, type Catalogue } from "./catalogues";

export type ShowroomTile = {
  title: string;
  /** Absent when the name has no catalogue record to read it from. */
  type?: string;
  collection?: string;
  image: string;
  href: string;
  /** True when `href` is a catalogue PDF; false when it is the filtered wall. */
  pdf: boolean;
};

const rec = (id: number): Catalogue => {
  const c = CATALOGUES.find((x) => x.id === id);
  if (!c) throw new Error(`showroom: no catalogue with id ${id}`);
  return c;
};

/** Folder name for a brand: "Beds & More" -> "beds-and-more", as in public/catalogues. */
const brandDir = (brand: string) =>
  brand.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");

/** The e-catalogue wall, preselected to one brand. */
const wall = (brand: string) => `/ecatalogue?brand=${encodeURIComponent(brand)}`;

/**
 * A client photograph linked to the catalogue of the same name. `title`
 * overrides the record's when the client's name for the photograph differs.
 */
function linked(
  brand: string,
  file: string,
  id: number,
  over: { title?: string; wall?: boolean } = {}
): ShowroomTile {
  const c = rec(id);
  const dir = brandDir(brand);
  const hasPdf = Boolean(c.pdf) && !over.wall;
  return {
    title: over.title ?? c.title,
    type: c.type,
    collection: c.collection,
    image: `/media/showroom/${dir}/${file}.webp`,
    href: hasPdf ? (c.pdf as string) : wall(brand),
    pdf: hasPdf,
  };
}

export const SHOWROOM_SLIDES: { brand: string; tiles: ShowroomTile[] }[] = [
  {
    brand: "SJ",
    tiles: [
      linked("SJ", "abaca", 1),
      // The tile keeps the name the client's zip spells it; the catalogue and its PDF
      // say Clovi, as does the Excel and the print original.
      linked("SJ", "colvi", 262, { title: "Colvi" }),
      // Catalogued as one PDF covering I & II; the tile keeps the zip's name.
      linked("SJ", "sheer-library-2", 247, { title: "Sheer Library 2" }),
      linked("SJ", "alma", 40),
      linked("SJ", "carlos", 263),
    ],
  },
  {
    brand: "Oofy",
    tiles: [
      linked("Oofy", "cappadocia", 264),
      linked("Oofy", "cascade", 265),
      linked("Oofy", "cosco", 266),
      // Cloud is a record filed under SJ; the client's PDF arrived in their OOFY folder.
      linked("Oofy", "cloud", 46),
      linked("Oofy", "cleopatra", 232),
    ],
  },
  {
    brand: "Matlin",
    tiles: [
      // Bailey is the Smart Plus Bailey record: same chair, only catalogue by that name.
      linked("Matlin", "bailey", 170),
      linked("Matlin", "kiara", 267),
      linked("Matlin", "linea", 131),
      linked("Matlin", "atmosphere", 142),
      linked("Matlin", "kausheya", 241),
    ],
  },
  {
    brand: "Smart Plus",
    tiles: [
      linked("Smart Plus", "alytus", 209),
      linked("Smart Plus", "keiba", 172),
      linked("Smart Plus", "melody", 217),
      linked("Smart Plus", "giza", 216),
      linked("Smart Plus", "ducati", 224, { title: "Ducati" }),
    ],
  },
  {
    // Full print originals this time, no slot sizes - so placed by shape: the
    // widest (3:2) is the feature, the tallest the panel. Until 2026-10-23 four of
    // these tiles carried the client's names but opened other catalogues (Iconique,
    // Jardin, Jasper, Mouvement) because their own PDFs had not arrived; they now
    // open their own.
    brand: "Beds & More",
    tiles: [
      linked("Beds & More", "ethereal", 258),
      linked("Beds & More", "plush", 259),
      linked("Beds & More", "thread-harmony", 260),
      linked("Beds & More", "knitscape-throws", 261),
      // Same file as the client's Top-5 "TERRA WEAVE.pdf" (identical md5).
      linked("Beds & More", "terra-weave", 255),
    ],
  },
];

/** First slide index for each brand, so the bar can jump straight there. */
export const BRAND_STARTS = BRAND_ORDER.map((brand) => ({
  brand,
  index: SHOWROOM_SLIDES.findIndex((s) => s.brand === brand),
}));
