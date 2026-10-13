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
 * LINKS. A tile opens the catalogue of the same NAME. Where the name has no
 * catalogue on the site yet (see `wall()`), it opens the e-catalogue wall
 * already filtered to that brand rather than a dead end or someone else's PDF.
 *
 * NOT YET HOSTED: Sheer Library 2, Cleopatra and Kausheya DO have catalogues
 * (ids 247, 232, 241, from the client's 2026-10-12 "PDF - Website" drop), but
 * their PDFs exist only on the dev machine: catalogue PDFs under
 * public/catalogues are gitignored, and unlike the 204 sarom.info records these have no hosted URL to
 * point `pdf` at. Linking them would 404 in production. Switch these three to
 * `linked(...)` once those PDFs are hosted somewhere a deploy can reach.
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

/** A client photograph whose name has no catalogue on the site yet. */
function unlisted(brand: string, file: string, title: string): ShowroomTile {
  const dir = brandDir(brand);
  return {
    title,
    image: `/media/showroom/${dir}/${file}.webp`,
    href: wall(brand),
    pdf: false,
  };
}

export const SHOWROOM_SLIDES: { brand: string; tiles: ShowroomTile[] }[] = [
  {
    brand: "SJ",
    tiles: [
      linked("SJ", "abaca", 1),
      // The Excel and the original file both spell it Clovi; the supplied PNG says Colvi.
      unlisted("SJ", "colvi", "Clovi"),
      // Catalogue exists locally (id 247, "Sheer Library I & II") but see NOT YET HOSTED.
      unlisted("SJ", "sheer-library-2", "Sheer Library 2"),
      linked("SJ", "alma", 40),
      unlisted("SJ", "carlos", "Carlos"),
    ],
  },
  {
    brand: "Oofy",
    tiles: [
      unlisted("Oofy", "cappadocia", "Cappadocia"),
      unlisted("Oofy", "cascade", "Cascade"),
      unlisted("Oofy", "cosco", "Cosco"),
      // Cloud exists as a record (filed under SJ) but has no PDF on the source site.
      linked("Oofy", "cloud", 46, { wall: true }),
      // Catalogue exists locally (id 232) but see NOT YET HOSTED.
      unlisted("Oofy", "cleopatra", "Cleopatra"),
    ],
  },
  {
    brand: "Matlin",
    tiles: [
      // Bailey is the Smart Plus Bailey record: same chair, only catalogue by that name.
      linked("Matlin", "bailey", 170),
      unlisted("Matlin", "kiara", "Kiara"),
      linked("Matlin", "linea", 131),
      linked("Matlin", "atmosphere", 142),
      // Catalogue exists locally (id 241) but see NOT YET HOSTED.
      unlisted("Matlin", "kausheya", "Kausheya"),
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
    // widest (3:2) is the feature, the tallest the panel. Each photograph is
    // ALREADY the cover of the catalogue it links to (matched at 1.000), so the
    // tile carries that catalogue's name, exactly as the e-catalogue wall does;
    // the client's own name for the shot is in the comment.
    brand: "Beds & More",
    tiles: [
      linked("Beds & More", "ethereal", 191),          // "Ethereal"  -> Iconique
      linked("Beds & More", "plush", 192),             // "Plush"     -> Jardin
      linked("Beds & More", "thread-harmony", 193),    // "Thread Harmony" -> Jasper
      linked("Beds & More", "knitscape-throws", 195),  // "Knitscape Throws" -> Mouvement
      linked("Beds & More", "terra-weave", 200),       // "Terra Weave" -> Refuge
    ],
  },
];

/** First slide index for each brand, so the bar can jump straight there. */
export const BRAND_STARTS = BRAND_ORDER.map((brand) => ({
  brand,
  index: SHOWROOM_SLIDES.findIndex((s) => s.brand === brand),
}));
