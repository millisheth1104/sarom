/**
 * Sarom catalogue data — GENERATED, do not hand-edit.
 *
 * Source: https://sarom.info/ecatalogue.php (209 records).
 * Regenerate with:  node reference/gen-catalogues.mjs
 *
 * `pdf` and `cover` are paths under /public. The PDFs themselves are NOT in
 * git (~660MB) — rebuild them with `node reference/fetch-pdfs.mjs`.
 * 5 records have no PDF on the source site and carry `pdf: null`.
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

export const BRAND_ORDER = ["SJ","Oofy","Matlin","Smart Plus","Beds & More"] as const;

export const COLLECTIONS = ["Curtains", "Upholstery", "Upholstery/Curtain"] as const;

export const CATALOGUES: Catalogue[] = [
  {
    "id": 1,
    "title": "Abaca",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/abaca.webp",
    "pdf": "/catalogues/sj/curtains/abaca.pdf"
  },
  {
    "id": 2,
    "title": "Adonis",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheers",
    "cover": "/catalogues/_covers/sj/curtains/adonis.webp",
    "pdf": "/catalogues/sj/curtains/adonis.pdf"
  },
  {
    "id": 3,
    "title": "Akira",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/akira.webp",
    "pdf": "/catalogues/sj/curtains/akira.pdf"
  },
  {
    "id": 4,
    "title": "Alton",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/alton.webp",
    "pdf": "/catalogues/sj/curtains/alton.pdf"
  },
  {
    "id": 5,
    "title": "Amalfi",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/amalfi.webp",
    "pdf": "/catalogues/sj/curtains/amalfi.pdf"
  },
  {
    "id": 6,
    "title": "Ambience",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/ambience.webp",
    "pdf": "/catalogues/sj/curtains/ambience.pdf"
  },
  {
    "id": 7,
    "title": "Antheia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/antheia.webp",
    "pdf": "/catalogues/sj/curtains/antheia.pdf"
  },
  {
    "id": 8,
    "title": "Calico",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/calico.webp",
    "pdf": "/catalogues/sj/curtains/calico.pdf"
  },
  {
    "id": 9,
    "title": "Calix",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/calix.webp",
    "pdf": "/catalogues/sj/curtains/calix.pdf"
  },
  {
    "id": 10,
    "title": "Canary",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/canary.webp",
    "pdf": "/catalogues/sj/curtains/canary.pdf"
  },
  {
    "id": 11,
    "title": "Casabella",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/casabella.webp",
    "pdf": "/catalogues/sj/curtains/casabella.pdf"
  },
  {
    "id": 12,
    "title": "Caspiana",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/caspiana.webp",
    "pdf": "/catalogues/sj/curtains/caspiana.pdf"
  },
  {
    "id": 13,
    "title": "Chezani",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/chezani.webp",
    "pdf": "/catalogues/sj/curtains/chezani.pdf"
  },
  {
    "id": 14,
    "title": "Cosimia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Printed Curtain",
    "typeRaw": "Printed Curtain",
    "cover": "/catalogues/_covers/sj/curtains/cosimia.webp",
    "pdf": "/catalogues/sj/curtains/cosimia.pdf"
  },
  {
    "id": 15,
    "title": "Crystal",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/crystal.webp",
    "pdf": "/catalogues/sj/curtains/crystal.pdf"
  },
  {
    "id": 16,
    "title": "Cyprus",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/cyprus.webp",
    "pdf": "/catalogues/sj/curtains/cyprus.pdf"
  },
  {
    "id": 17,
    "title": "Dior",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/dior.webp",
    "pdf": "/catalogues/sj/curtains/dior.pdf"
  },
  {
    "id": 18,
    "title": "Elite",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/elite.webp",
    "pdf": "/catalogues/sj/curtains/elite.pdf"
  },
  {
    "id": 19,
    "title": "Eliz",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/eliz.webp",
    "pdf": "/catalogues/sj/curtains/eliz.pdf"
  },
  {
    "id": 20,
    "title": "Hawaii",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/hawaii.webp",
    "pdf": "/catalogues/sj/curtains/hawaii.pdf"
  },
  {
    "id": 21,
    "title": "Hector",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/hector.webp",
    "pdf": "/catalogues/sj/curtains/hector.pdf"
  },
  {
    "id": 22,
    "title": "Imperia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/imperia.webp",
    "pdf": "/catalogues/sj/curtains/imperia.pdf"
  },
  {
    "id": 23,
    "title": "Jiya Revival",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/jiya-revival.webp",
    "pdf": "/catalogues/sj/curtains/jiya-revival.pdf"
  },
  {
    "id": 24,
    "title": "Linea",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/linea.webp",
    "pdf": "/catalogues/sj/curtains/linea.pdf"
  },
  {
    "id": 25,
    "title": "Liona",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/liona.webp",
    "pdf": "/catalogues/sj/curtains/liona.pdf"
  },
  {
    "id": 26,
    "title": "Monaco",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/monaco.webp",
    "pdf": "/catalogues/sj/curtains/monaco.pdf"
  },
  {
    "id": 27,
    "title": "Novy",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/novy.webp",
    "pdf": "/catalogues/sj/curtains/novy.pdf"
  },
  {
    "id": 28,
    "title": "Otto",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/otto.webp",
    "pdf": "/catalogues/sj/curtains/otto.pdf"
  },
  {
    "id": 29,
    "title": "Pristine",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/pristine.webp",
    "pdf": "/catalogues/sj/curtains/pristine.pdf"
  },
  {
    "id": 30,
    "title": "Regalia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/regalia.webp",
    "pdf": null
  },
  {
    "id": 31,
    "title": "Regency",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/regency.webp",
    "pdf": "/catalogues/sj/curtains/regency.pdf"
  },
  {
    "id": 32,
    "title": "Rolex",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/rolex.webp",
    "pdf": "/catalogues/sj/curtains/rolex.pdf"
  },
  {
    "id": 33,
    "title": "Romania",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/romania.webp",
    "pdf": "/catalogues/sj/curtains/romania.pdf"
  },
  {
    "id": 34,
    "title": "Sheen",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/sheen.webp",
    "pdf": "/catalogues/sj/curtains/sheen.pdf"
  },
  {
    "id": 35,
    "title": "Silica",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/silica.webp",
    "pdf": "/catalogues/sj/curtains/silica.pdf"
  },
  {
    "id": 36,
    "title": "Silket",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/silket.webp",
    "pdf": "/catalogues/sj/curtains/silket.pdf"
  },
  {
    "id": 37,
    "title": "Solace",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheers",
    "cover": "/catalogues/_covers/sj/curtains/solace.webp",
    "pdf": "/catalogues/sj/curtains/solace.pdf"
  },
  {
    "id": 38,
    "title": "Solitaire",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/solitaire.webp",
    "pdf": "/catalogues/sj/curtains/solitaire.pdf"
  },
  {
    "id": 39,
    "title": "Aaron",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/aaron.webp",
    "pdf": "/catalogues/sj/curtains/aaron.pdf"
  },
  {
    "id": 40,
    "title": "Alma",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheers",
    "cover": "/catalogues/_covers/sj/curtains/alma.webp",
    "pdf": "/catalogues/sj/curtains/alma.pdf"
  },
  {
    "id": 41,
    "title": "Amesbury",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/amesbury.webp",
    "pdf": "/catalogues/sj/curtains/amesbury.pdf"
  },
  {
    "id": 42,
    "title": "Andora",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/andora.webp",
    "pdf": "/catalogues/sj/curtains/andora.pdf"
  },
  {
    "id": 43,
    "title": "Aubrey",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/aubrey.webp",
    "pdf": "/catalogues/sj/curtains/aubrey.pdf"
  },
  {
    "id": 44,
    "title": "Canberra",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/canberra.webp",
    "pdf": "/catalogues/sj/curtains/canberra.pdf"
  },
  {
    "id": 45,
    "title": "Capri",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Curtains",
    "typeRaw": "Capri",
    "cover": "/catalogues/_covers/sj/curtains/capri.webp",
    "pdf": "/catalogues/sj/curtains/capri.pdf"
  },
  {
    "id": 46,
    "title": "Cloud",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/cloud.webp",
    "pdf": null
  },
  {
    "id": 47,
    "title": "Infinty",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Curtains",
    "typeRaw": "Infinty",
    "cover": "/catalogues/_covers/sj/curtains/infinty.webp",
    "pdf": "/catalogues/sj/curtains/infinty.pdf"
  },
  {
    "id": 48,
    "title": "Eva",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/eva.webp",
    "pdf": "/catalogues/sj/curtains/eva.pdf"
  },
  {
    "id": 49,
    "title": "Neoma",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/neoma.webp",
    "pdf": "/catalogues/sj/curtains/neoma.pdf"
  },
  {
    "id": 50,
    "title": "Royal",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/royal.webp",
    "pdf": "/catalogues/sj/curtains/royal.pdf"
  },
  {
    "id": 51,
    "title": "Willshire",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/willshire.webp",
    "pdf": "/catalogues/sj/curtains/willshire.pdf"
  },
  {
    "id": 52,
    "title": "Albert",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/albert.webp",
    "pdf": "/catalogues/sj/upholstery/albert.pdf"
  },
  {
    "id": 53,
    "title": "Amy",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/amy.webp",
    "pdf": "/catalogues/sj/upholstery/amy.pdf"
  },
  {
    "id": 54,
    "title": "Aria",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/aria.webp",
    "pdf": "/catalogues/sj/upholstery/aria.pdf"
  },
  {
    "id": 55,
    "title": "August",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/august.webp",
    "pdf": "/catalogues/sj/upholstery/august.pdf"
  },
  {
    "id": 56,
    "title": "Azzurra",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Upholstery",
    "typeRaw": "Azzurra",
    "cover": "/catalogues/_covers/sj/upholstery/azzurra.webp",
    "pdf": "/catalogues/sj/upholstery/azzurra.pdf"
  },
  {
    "id": 57,
    "title": "Ibiza",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/ibiza.webp",
    "pdf": "/catalogues/sj/upholstery/ibiza.pdf"
  },
  {
    "id": 58,
    "title": "Novel",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/novel.webp",
    "pdf": "/catalogues/sj/upholstery/novel.pdf"
  },
  {
    "id": 59,
    "title": "Palomino",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/palomino.webp",
    "pdf": "/catalogues/sj/upholstery/palomino.pdf"
  },
  {
    "id": 60,
    "title": "Aboone",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/aboone.webp",
    "pdf": "/catalogues/sj/upholstery/aboone.pdf"
  },
  {
    "id": 61,
    "title": "Adriana",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/adriana.webp",
    "pdf": "/catalogues/sj/upholstery/adriana.pdf"
  },
  {
    "id": 62,
    "title": "Albany",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/albany.webp",
    "pdf": "/catalogues/sj/upholstery/albany.pdf"
  },
  {
    "id": 63,
    "title": "Alpha",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/alpha.webp",
    "pdf": "/catalogues/sj/upholstery/alpha.pdf"
  },
  {
    "id": 65,
    "title": "Amazon",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/amazon.webp",
    "pdf": "/catalogues/sj/upholstery/amazon.pdf"
  },
  {
    "id": 66,
    "title": "Amber",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/amber.webp",
    "pdf": "/catalogues/sj/upholstery/amber.pdf"
  },
  {
    "id": 67,
    "title": "Apache",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/apache.webp",
    "pdf": "/catalogues/sj/upholstery/apache.pdf"
  },
  {
    "id": 68,
    "title": "Asaba",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Plain Texture",
    "typeRaw": "Plain Texture",
    "cover": "/catalogues/_covers/sj/upholstery/asaba.webp",
    "pdf": "/catalogues/sj/upholstery/asaba.pdf"
  },
  {
    "id": 69,
    "title": "Asmara",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/asmara.webp",
    "pdf": "/catalogues/sj/upholstery/asmara.pdf"
  },
  {
    "id": 70,
    "title": "Aspen",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/aspen.webp",
    "pdf": "/catalogues/sj/upholstery/aspen.pdf"
  },
  {
    "id": 72,
    "title": "Astor",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/astor.webp",
    "pdf": "/catalogues/sj/upholstery/astor.pdf"
  },
  {
    "id": 73,
    "title": "Avita/Persian",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/avita-persian.webp",
    "pdf": "/catalogues/sj/upholstery/avita-persian.pdf"
  },
  {
    "id": 74,
    "title": "Bentley",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/bentley.webp",
    "pdf": "/catalogues/sj/upholstery/bentley.pdf"
  },
  {
    "id": 75,
    "title": "Berry/Cambry",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/berry-cambry.webp",
    "pdf": "/catalogues/sj/upholstery/berry-cambry.pdf"
  },
  {
    "id": 76,
    "title": "Breeze",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/breeze.webp",
    "pdf": "/catalogues/sj/upholstery/breeze.pdf"
  },
  {
    "id": 77,
    "title": "Brisbane New",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/brisbane-new.webp",
    "pdf": "/catalogues/sj/upholstery/brisbane-new.pdf"
  },
  {
    "id": 78,
    "title": "Cairo",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/cairo.webp",
    "pdf": "/catalogues/sj/upholstery/cairo.pdf"
  },
  {
    "id": 79,
    "title": "Calibri",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/calibri.webp",
    "pdf": "/catalogues/sj/upholstery/calibri.pdf"
  },
  {
    "id": 81,
    "title": "Carolina",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/carolina.webp",
    "pdf": "/catalogues/sj/upholstery/carolina.pdf"
  },
  {
    "id": 82,
    "title": "Casper/Cherry",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/casper-cherry.webp",
    "pdf": "/catalogues/sj/upholstery/casper-cherry.pdf"
  },
  {
    "id": 83,
    "title": "Choper",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/choper.webp",
    "pdf": "/catalogues/sj/upholstery/choper.pdf"
  },
  {
    "id": 84,
    "title": "Elantra",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/elantra.webp",
    "pdf": "/catalogues/sj/upholstery/elantra.pdf"
  },
  {
    "id": 85,
    "title": "Florous",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/florous.webp",
    "pdf": "/catalogues/sj/upholstery/florous.pdf"
  },
  {
    "id": 86,
    "title": "Glaze",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/glaze.webp",
    "pdf": "/catalogues/sj/upholstery/glaze.pdf"
  },
  {
    "id": 87,
    "title": "Hera",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/hera.webp",
    "pdf": "/catalogues/sj/upholstery/hera.pdf"
  },
  {
    "id": 88,
    "title": "Heritage",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/heritage.webp",
    "pdf": "/catalogues/sj/upholstery/heritage.pdf"
  },
  {
    "id": 89,
    "title": "Jaguar",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/jaguar.webp",
    "pdf": "/catalogues/sj/upholstery/jaguar.pdf"
  },
  {
    "id": 90,
    "title": "Jaipur Volume 1",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/jaipur-volume-1.webp",
    "pdf": "/catalogues/sj/upholstery/jaipur-volume-1.pdf"
  },
  {
    "id": 91,
    "title": "Jaipur Volume 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/jaipur-volume-2.webp",
    "pdf": "/catalogues/sj/upholstery/jaipur-volume-2.pdf"
  },
  {
    "id": 92,
    "title": "Kilim",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/kilim.webp",
    "pdf": "/catalogues/sj/upholstery/kilim.pdf"
  },
  {
    "id": 93,
    "title": "Lenka",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Plain Texture",
    "typeRaw": "Plain Texture",
    "cover": "/catalogues/_covers/sj/upholstery/lenka.webp",
    "pdf": "/catalogues/sj/upholstery/lenka.pdf"
  },
  {
    "id": 94,
    "title": "Libra",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Knitted",
    "typeRaw": "Knitted",
    "cover": "/catalogues/_covers/sj/upholstery/libra.webp",
    "pdf": "/catalogues/sj/upholstery/libra.pdf"
  },
  {
    "id": 95,
    "title": "Linus",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/linus.webp",
    "pdf": "/catalogues/sj/upholstery/linus.pdf"
  },
  {
    "id": 96,
    "title": "Lisa",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/lisa.webp",
    "pdf": "/catalogues/sj/upholstery/lisa.pdf"
  },
  {
    "id": 97,
    "title": "Lisabel",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/lisabel.webp",
    "pdf": "/catalogues/sj/upholstery/lisabel.pdf"
  },
  {
    "id": 98,
    "title": "Marble",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/marble.webp",
    "pdf": "/catalogues/sj/upholstery/marble.pdf"
  },
  {
    "id": 99,
    "title": "Melisa",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/melisa.webp",
    "pdf": "/catalogues/sj/upholstery/melisa.pdf"
  },
  {
    "id": 100,
    "title": "Merasa",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/merasa.webp",
    "pdf": "/catalogues/sj/upholstery/merasa.pdf"
  },
  {
    "id": 101,
    "title": "Milano",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/milano.webp",
    "pdf": "/catalogues/sj/upholstery/milano.pdf"
  },
  {
    "id": 102,
    "title": "Mustan",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/mustan.webp",
    "pdf": "/catalogues/sj/upholstery/mustan.pdf"
  },
  {
    "id": 103,
    "title": "New Molfino",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/new-molfino.webp",
    "pdf": "/catalogues/sj/upholstery/new-molfino.pdf"
  },
  {
    "id": 104,
    "title": "Paramount",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/paramount.webp",
    "pdf": "/catalogues/sj/upholstery/paramount.pdf"
  },
  {
    "id": 105,
    "title": "Penza",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/penza.webp",
    "pdf": "/catalogues/sj/upholstery/penza.pdf"
  },
  {
    "id": 106,
    "title": "Persian",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/persian.webp",
    "pdf": "/catalogues/sj/upholstery/persian.pdf"
  },
  {
    "id": 107,
    "title": "Piano",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/piano.webp",
    "pdf": "/catalogues/sj/upholstery/piano.pdf"
  },
  {
    "id": 108,
    "title": "Pixel/Ibiza",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/pixel-ibiza.webp",
    "pdf": "/catalogues/sj/upholstery/pixel-ibiza.pdf"
  },
  {
    "id": 109,
    "title": "Riviera",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/riviera.webp",
    "pdf": "/catalogues/sj/upholstery/riviera.pdf"
  },
  {
    "id": 110,
    "title": "Savannah",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/savannah.webp",
    "pdf": "/catalogues/sj/upholstery/savannah.pdf"
  },
  {
    "id": 111,
    "title": "Soho",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Embossed Texture",
    "typeRaw": "Embossed Texture",
    "cover": "/catalogues/_covers/sj/upholstery/soho.webp",
    "pdf": "/catalogues/sj/upholstery/soho.pdf"
  },
  {
    "id": 112,
    "title": "Sugar",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/sugar.webp",
    "pdf": "/catalogues/sj/upholstery/sugar.pdf"
  },
  {
    "id": 113,
    "title": "Sumba",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/sumba.webp",
    "pdf": "/catalogues/sj/upholstery/sumba.pdf"
  },
  {
    "id": 114,
    "title": "Taras",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/taras.webp",
    "pdf": "/catalogues/sj/upholstery/taras.pdf"
  },
  {
    "id": 115,
    "title": "Victoria/Vermount",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/victoria-vermount.webp",
    "pdf": "/catalogues/sj/upholstery/victoria-vermount.pdf"
  },
  {
    "id": 116,
    "title": "Vigo",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/vigo.webp",
    "pdf": "/catalogues/sj/upholstery/vigo.pdf"
  },
  {
    "id": 117,
    "title": "Vivian Checks",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/vivian-checks.webp",
    "pdf": "/catalogues/sj/upholstery/vivian-checks.pdf"
  },
  {
    "id": 118,
    "title": "Winchester",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/winchester.webp",
    "pdf": "/catalogues/sj/upholstery/winchester.pdf"
  },
  {
    "id": 119,
    "title": "Zenith",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/zenith.webp",
    "pdf": "/catalogues/sj/upholstery/zenith.pdf"
  },
  {
    "id": 120,
    "title": "Alfredo",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/alfredo.png",
    "pdf": "/catalogues/sj/upholstery/alfredo.pdf"
  },
  {
    "id": 121,
    "title": "Universe",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/universe.png",
    "pdf": "/catalogues/sj/upholstery/universe.pdf"
  },
  {
    "id": 122,
    "title": "Luxor-N",
    "brand": "SJ",
    "collection": "Upholstery/Curtain",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery-curtain/luxor-n.webp",
    "pdf": "/catalogues/sj/upholstery-curtain/luxor-n.pdf"
  },
  {
    "id": 123,
    "title": "Velveto/Plush",
    "brand": "SJ",
    "collection": "Upholstery/Curtain",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery-curtain/velveto-plush.webp",
    "pdf": "/catalogues/sj/upholstery-curtain/velveto-plush.pdf"
  },
  {
    "id": 124,
    "title": "Alesia",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/curtains/alesia.webp",
    "pdf": "/catalogues/matlin/curtains/alesia.pdf"
  },
  {
    "id": 125,
    "title": "Alex",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheer",
    "cover": "/catalogues/_covers/matlin/curtains/alex.webp",
    "pdf": "/catalogues/matlin/curtains/alex.pdf"
  },
  {
    "id": 126,
    "title": "Amanda",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Wider Width Sheer",
    "typeRaw": "Wider Width Sheer",
    "cover": "/catalogues/_covers/matlin/curtains/amanda.webp",
    "pdf": "/catalogues/matlin/curtains/amanda.pdf"
  },
  {
    "id": 127,
    "title": "Amour",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/curtains/amour.webp",
    "pdf": "/catalogues/matlin/curtains/amour.pdf"
  },
  {
    "id": 128,
    "title": "Celina",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/celina.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/celina.pdf"
  },
  {
    "id": 129,
    "title": "Chantily",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Wider Width Texture Curtain",
    "typeRaw": "Wider Width Texture Curtain",
    "cover": "/catalogues/_covers/matlin/curtains/chantily.webp",
    "pdf": "/catalogues/matlin/curtains/chantily.pdf"
  },
  {
    "id": 130,
    "title": "Fiona",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidery Sheer",
    "cover": "/catalogues/_covers/matlin/curtains/fiona.webp",
    "pdf": "/catalogues/matlin/curtains/fiona.pdf"
  },
  {
    "id": 131,
    "title": "Linea",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Texture",
    "typeRaw": "Texture",
    "cover": "/catalogues/_covers/matlin/curtains/linea.webp",
    "pdf": "/catalogues/matlin/curtains/linea.pdf"
  },
  {
    "id": 132,
    "title": "Samara",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Embroidery",
    "typeRaw": "Embroidery",
    "cover": "/catalogues/_covers/matlin/curtains/samara.webp",
    "pdf": "/catalogues/matlin/curtains/samara.pdf"
  },
  {
    "id": 133,
    "title": "Savour",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/matlin/curtains/savour.webp",
    "pdf": "/catalogues/matlin/curtains/savour.pdf"
  },
  {
    "id": 134,
    "title": "Willow",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Velvet / Digital Print",
    "typeRaw": "Velevt / Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/willow.webp",
    "pdf": null
  },
  {
    "id": 135,
    "title": "Abellone",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/curtains/abellone.webp",
    "pdf": "/catalogues/matlin/curtains/abellone.pdf"
  },
  {
    "id": 136,
    "title": "Cinthia",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/cinthia.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/cinthia.pdf"
  },
  {
    "id": 137,
    "title": "Mayfair",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/mayfair.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/mayfair.pdf"
  },
  {
    "id": 138,
    "title": "Myra",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/myra.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/myra.pdf"
  },
  {
    "id": 139,
    "title": "Onella",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/onella.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/onella.pdf"
  },
  {
    "id": 140,
    "title": "Orea",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/orea.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/orea.pdf"
  },
  {
    "id": 141,
    "title": "Mamboo",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/mamboo.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/mamboo.pdf"
  },
  {
    "id": 142,
    "title": "Atmosphere",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Boucle Texture",
    "typeRaw": "Boucle Texture",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/atmosphere.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/atmosphere.pdf"
  },
  {
    "id": 143,
    "title": "Cassia",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/cassia.webp",
    "pdf": "/catalogues/matlin/upholstery-curtain/cassia.pdf"
  },
  {
    "id": 144,
    "title": "Delilah",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/matlin/upholstery/delilah.webp",
    "pdf": "/catalogues/matlin/upholstery/delilah.pdf"
  },
  {
    "id": 145,
    "title": "Felix",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Woven Texture",
    "typeRaw": "Woven Texture",
    "cover": "/catalogues/_covers/matlin/upholstery/felix.webp",
    "pdf": "/catalogues/matlin/upholstery/felix.pdf"
  },
  {
    "id": 146,
    "title": "Isabella",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery/isabella.webp",
    "pdf": "/catalogues/matlin/upholstery/isabella.pdf"
  },
  {
    "id": 147,
    "title": "Udaipur",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/matlin/upholstery/udaipur.webp",
    "pdf": "/catalogues/matlin/upholstery/udaipur.pdf"
  },
  {
    "id": 148,
    "title": "Abruzzi",
    "brand": "Oofy",
    "collection": "Upholstery/Curtain",
    "type": "Foil Print",
    "typeRaw": "Foil Print",
    "cover": "/catalogues/_covers/oofy/upholstery-curtain/abruzzi.webp",
    "pdf": null
  },
  {
    "id": 149,
    "title": "Auralia",
    "brand": "Oofy",
    "collection": "Curtains",
    "type": "Wider Width Curtain",
    "typeRaw": "Wider Width Curtain",
    "cover": "/catalogues/_covers/oofy/curtains/auralia.webp",
    "pdf": null
  },
  {
    "id": 150,
    "title": "Avezzano/Bolzano",
    "brand": "Oofy",
    "collection": "Upholstery/Curtain",
    "type": "Foil Velvet",
    "typeRaw": "Foil Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery-curtain/avezzano-bolzano.webp",
    "pdf": "/catalogues/oofy/upholstery-curtain/avezzano-bolzano.pdf"
  },
  {
    "id": 151,
    "title": "Costa",
    "brand": "Oofy",
    "collection": "Curtains",
    "type": "Wider Width Curtain",
    "typeRaw": "Wider Width Curtain",
    "cover": "/catalogues/_covers/oofy/curtains/costa.webp",
    "pdf": "/catalogues/oofy/curtains/costa.pdf"
  },
  {
    "id": 152,
    "title": "Tivoli",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Foil Velvet",
    "typeRaw": "Foil Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery/tivoli.webp",
    "pdf": "/catalogues/oofy/upholstery/tivoli.pdf"
  },
  {
    "id": 153,
    "title": "Bryan",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/oofy/upholstery/bryan.webp",
    "pdf": "/catalogues/oofy/upholstery/bryan.pdf"
  },
  {
    "id": 154,
    "title": "Doralia",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Quilted Velvet",
    "typeRaw": "Quilted Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery/doralia.webp",
    "pdf": "/catalogues/oofy/upholstery/doralia.pdf"
  },
  {
    "id": 155,
    "title": "Tiffany/Brittany",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Quilted Velvet",
    "typeRaw": "Quilted Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery/tiffany-brittany.webp",
    "pdf": "/catalogues/oofy/upholstery/tiffany-brittany.pdf"
  },
  {
    "id": 166,
    "title": "Velur",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/oofy/upholstery/velur.webp",
    "pdf": "/catalogues/oofy/upholstery/velur.pdf"
  },
  {
    "id": 167,
    "title": "Aluva",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/oofy/upholstery/aluva.webp",
    "pdf": "/catalogues/oofy/upholstery/aluva.pdf"
  },
  {
    "id": 168,
    "title": "Altima",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/altima.webp",
    "pdf": "/catalogues/smart-plus/upholstery/altima.pdf"
  },
  {
    "id": 169,
    "title": "Ambiant",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/ambiant.webp",
    "pdf": "/catalogues/smart-plus/upholstery/ambiant.pdf"
  },
  {
    "id": 170,
    "title": "Bailey",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Chenille",
    "typeRaw": "Chenille",
    "cover": "/catalogues/_covers/smart-plus/upholstery/bailey.webp",
    "pdf": "/catalogues/smart-plus/upholstery/bailey.pdf"
  },
  {
    "id": 171,
    "title": "Ferrari",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Suede Leather",
    "typeRaw": "Suede Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/ferrari.webp",
    "pdf": "/catalogues/smart-plus/upholstery/ferrari.pdf"
  },
  {
    "id": 172,
    "title": "Keiba",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Knitted",
    "typeRaw": "Knitted",
    "cover": "/catalogues/_covers/smart-plus/upholstery/keiba.webp",
    "pdf": "/catalogues/smart-plus/upholstery/keiba.pdf"
  },
  {
    "id": 173,
    "title": "Kenzi",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Chenille",
    "typeRaw": "Chenille",
    "cover": "/catalogues/_covers/smart-plus/upholstery/kenzi.webp",
    "pdf": "/catalogues/smart-plus/upholstery/kenzi.pdf"
  },
  {
    "id": 174,
    "title": "Levi",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/smart-plus/upholstery/levi.webp",
    "pdf": "/catalogues/smart-plus/upholstery/levi.pdf"
  },
  {
    "id": 175,
    "title": "Luke",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/luke.webp",
    "pdf": "/catalogues/smart-plus/upholstery/luke.pdf"
  },
  {
    "id": 176,
    "title": "Marwin",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/marwin.webp",
    "pdf": "/catalogues/smart-plus/upholstery/marwin.pdf"
  },
  {
    "id": 177,
    "title": "Meraki",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Chenille",
    "typeRaw": "Chenille",
    "cover": "/catalogues/_covers/smart-plus/upholstery/meraki.webp",
    "pdf": "/catalogues/smart-plus/upholstery/meraki.pdf"
  },
  {
    "id": 178,
    "title": "Merry",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/merry.webp",
    "pdf": "/catalogues/smart-plus/upholstery/merry.pdf"
  },
  {
    "id": 179,
    "title": "Perth",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/perth.webp",
    "pdf": "/catalogues/smart-plus/upholstery/perth.pdf"
  },
  {
    "id": 180,
    "title": "Phantom",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/phantom.webp",
    "pdf": "/catalogues/smart-plus/upholstery/phantom.pdf"
  },
  {
    "id": 181,
    "title": "Soffice",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/smart-plus/upholstery/soffice.webp",
    "pdf": "/catalogues/smart-plus/upholstery/soffice.pdf"
  },
  {
    "id": 182,
    "title": "Sierra",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/smart-plus/upholstery/sierra.webp",
    "pdf": "/catalogues/smart-plus/upholstery/sierra.pdf"
  },
  {
    "id": 184,
    "title": "Amos",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Main Curtain",
    "typeRaw": "Main Curtain",
    "cover": "/catalogues/_covers/beds-and-more/curtains/amos.webp",
    "pdf": "/catalogues/beds-and-more/curtains/amos.pdf"
  },
  {
    "id": 185,
    "title": "Bali Stripes",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Black Out",
    "typeRaw": "Black Out",
    "cover": "/catalogues/_covers/beds-and-more/curtains/bali-stripes.webp",
    "pdf": "/catalogues/beds-and-more/curtains/bali-stripes.pdf"
  },
  {
    "id": 186,
    "title": "Cable",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Sheer",
    "typeRaw": "Sheer",
    "cover": "/catalogues/_covers/beds-and-more/curtains/cable.webp",
    "pdf": "/catalogues/beds-and-more/curtains/cable.pdf"
  },
  {
    "id": 187,
    "title": "Diffusion",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Linen/Sheer",
    "typeRaw": "Linen/Sheer",
    "cover": "/catalogues/_covers/beds-and-more/curtains/diffusion.webp",
    "pdf": "/catalogues/beds-and-more/curtains/diffusion.pdf"
  },
  {
    "id": 188,
    "title": "Eva",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Fabric",
    "typeRaw": "Fabric",
    "cover": "/catalogues/_covers/beds-and-more/curtains/eva.webp",
    "pdf": "/catalogues/beds-and-more/curtains/eva.pdf"
  },
  {
    "id": 189,
    "title": "Florent",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artifiacial Leather",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/florent.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/florent.pdf"
  },
  {
    "id": 190,
    "title": "Harmonie",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/harmonie.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/harmonie.pdf"
  },
  {
    "id": 191,
    "title": "Iconique",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/iconique.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/iconique.pdf"
  },
  {
    "id": 192,
    "title": "Jardin",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/jardin.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/jardin.pdf"
  },
  {
    "id": 193,
    "title": "Jasper",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/jasper.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/jasper.pdf"
  },
  {
    "id": 194,
    "title": "Linnean",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/linnean.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/linnean.pdf"
  },
  {
    "id": 195,
    "title": "Mouvement",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/mouvement.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/mouvement.pdf"
  },
  {
    "id": 196,
    "title": "Nelson",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/nelson.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/nelson.pdf"
  },
  {
    "id": 197,
    "title": "Opulence",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/opulence.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/opulence.pdf"
  },
  {
    "id": 198,
    "title": "Oscar",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/oscar.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/oscar.pdf"
  },
  {
    "id": 199,
    "title": "Reflect",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/reflect.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/reflect.pdf"
  },
  {
    "id": 200,
    "title": "Refuge",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/refuge.webp",
    "pdf": "/catalogues/beds-and-more/upholstery/refuge.pdf"
  },
  {
    "id": 201,
    "title": "Aruba",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/aruba.webp",
    "pdf": "/catalogues/sj/upholstery/aruba.pdf"
  },
  {
    "id": 202,
    "title": "Halden",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/halden.webp",
    "pdf": "/catalogues/sj/upholstery/halden.pdf"
  },
  {
    "id": 205,
    "title": "Angel",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Sweden Velvet",
    "typeRaw": "Sweden Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/angel.png",
    "pdf": "/catalogues/sj/upholstery/angel.pdf"
  },
  {
    "id": 206,
    "title": "Halden Volume 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/halden-volume-2.png",
    "pdf": "/catalogues/sj/upholstery/halden-volume-2.pdf"
  },
  {
    "id": 207,
    "title": "Nakshi",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/nakshi.png",
    "pdf": "/catalogues/sj/upholstery/nakshi.pdf"
  },
  {
    "id": 208,
    "title": "Alfy",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Plain Velvet",
    "typeRaw": "Plain Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/alfy.png",
    "pdf": "/catalogues/sj/upholstery/alfy.pdf"
  },
  {
    "id": 209,
    "title": "Alytus",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Sweden Velvet",
    "typeRaw": "Sweden Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/alytus.png",
    "pdf": "/catalogues/sj/upholstery/alytus.pdf"
  },
  {
    "id": 210,
    "title": "Zurich",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Fancy Trendy Furry",
    "typeRaw": "Fancy Trendy Furry",
    "cover": "/catalogues/_covers/sj/upholstery/zurich.png",
    "pdf": "/catalogues/sj/upholstery/zurich.pdf"
  },
  {
    "id": 211,
    "title": "Pebbles",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/oofy/upholstery/pebbles.png",
    "pdf": "/catalogues/oofy/upholstery/pebbles.pdf"
  },
  {
    "id": 212,
    "title": "Leisure",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/leisure.png",
    "pdf": "/catalogues/smart-plus/upholstery/leisure.pdf"
  },
  {
    "id": 213,
    "title": "Aston",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/aston.png",
    "pdf": "/catalogues/smart-plus/upholstery/aston.pdf"
  },
  {
    "id": 214,
    "title": "Antalya",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/antalya.png",
    "pdf": "/catalogues/smart-plus/upholstery/antalya.pdf"
  },
  {
    "id": 215,
    "title": "Wooly",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/wooly.png",
    "pdf": "/catalogues/smart-plus/upholstery/wooly.pdf"
  },
  {
    "id": 216,
    "title": "Giza",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/giza.png",
    "pdf": "/catalogues/smart-plus/upholstery/giza.pdf"
  },
  {
    "id": 217,
    "title": "Melody",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/melody.png",
    "pdf": "/catalogues/smart-plus/upholstery/melody.pdf"
  },
  {
    "id": 218,
    "title": "JODHPUR VOL 1",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/jodhpur-vol-1.png",
    "pdf": "/catalogues/sj/upholstery/jodhpur-vol-1.pdf"
  },
  {
    "id": 219,
    "title": "JODHPUR VOL 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/jodhpur-vol-2.png",
    "pdf": "/catalogues/sj/upholstery/jodhpur-vol-2.pdf"
  },
  {
    "id": 220,
    "title": "BIKANER VOL 1",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/bikaner-vol-1.png",
    "pdf": "/catalogues/sj/upholstery/bikaner-vol-1.pdf"
  },
  {
    "id": 221,
    "title": "BIKANER VOL 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/bikaner-vol-2.png",
    "pdf": "/catalogues/sj/upholstery/bikaner-vol-2.pdf"
  },
  {
    "id": 222,
    "title": "ADDIS",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/addis.png",
    "pdf": "/catalogues/sj/upholstery/addis.pdf"
  },
  {
    "id": 223,
    "title": "CHARCOAL",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/charcoal.png",
    "pdf": "/catalogues/sj/upholstery/charcoal.pdf"
  },
  {
    "id": 224,
    "title": "DUCATI",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/ducati.png",
    "pdf": "/catalogues/sj/upholstery/ducati.pdf"
  },
  {
    "id": 225,
    "title": "WILFORD",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/wilford.png",
    "pdf": "/catalogues/sj/upholstery/wilford.pdf"
  }
];

/** Everything for one brand, in listing order. */
export const byBrand = (brand: string) => CATALOGUES.filter((c) => c.brand === brand);

/**
 * Every catalogue, chunked five-to-a-slide, grouped by brand. Paging the
 * slider walks the whole set rather than a hand-picked few.
 * `page`/`pages` are the position within that brand.
 */
export const SHOWROOM_SLIDES = [
  {
    "brand": "SJ",
    "page": 1,
    "pages": 27,
    "tiles": [
      39,
      1,
      2,
      3,
      40
    ]
  },
  {
    "brand": "SJ",
    "page": 2,
    "pages": 27,
    "tiles": [
      4,
      5,
      6,
      41,
      42
    ]
  },
  {
    "brand": "SJ",
    "page": 3,
    "pages": 27,
    "tiles": [
      7,
      43,
      8,
      9,
      10
    ]
  },
  {
    "brand": "SJ",
    "page": 4,
    "pages": 27,
    "tiles": [
      44,
      45,
      11,
      12,
      13
    ]
  },
  {
    "brand": "SJ",
    "page": 5,
    "pages": 27,
    "tiles": [
      14,
      15,
      16,
      17,
      18
    ]
  },
  {
    "brand": "SJ",
    "page": 6,
    "pages": 27,
    "tiles": [
      19,
      48,
      20,
      21,
      22
    ]
  },
  {
    "brand": "SJ",
    "page": 7,
    "pages": 27,
    "tiles": [
      47,
      23,
      24,
      25,
      26
    ]
  },
  {
    "brand": "SJ",
    "page": 8,
    "pages": 27,
    "tiles": [
      49,
      27,
      28,
      29,
      31
    ]
  },
  {
    "brand": "SJ",
    "page": 9,
    "pages": 27,
    "tiles": [
      32,
      33,
      50,
      34,
      35
    ]
  },
  {
    "brand": "SJ",
    "page": 10,
    "pages": 27,
    "tiles": [
      36,
      37,
      38,
      51,
      60
    ]
  },
  {
    "brand": "SJ",
    "page": 11,
    "pages": 27,
    "tiles": [
      222,
      61,
      62,
      52,
      120
    ]
  },
  {
    "brand": "SJ",
    "page": 12,
    "pages": 27,
    "tiles": [
      208,
      63,
      209,
      65,
      66
    ]
  },
  {
    "brand": "SJ",
    "page": 13,
    "pages": 27,
    "tiles": [
      53,
      205,
      67,
      54,
      201
    ]
  },
  {
    "brand": "SJ",
    "page": 14,
    "pages": 27,
    "tiles": [
      68,
      69,
      70,
      72,
      55
    ]
  },
  {
    "brand": "SJ",
    "page": 15,
    "pages": 27,
    "tiles": [
      73,
      56,
      74,
      75,
      220
    ]
  },
  {
    "brand": "SJ",
    "page": 16,
    "pages": 27,
    "tiles": [
      221,
      76,
      77,
      78,
      79
    ]
  },
  {
    "brand": "SJ",
    "page": 17,
    "pages": 27,
    "tiles": [
      81,
      82,
      223,
      83,
      224
    ]
  },
  {
    "brand": "SJ",
    "page": 18,
    "pages": 27,
    "tiles": [
      84,
      85,
      86,
      202,
      206
    ]
  },
  {
    "brand": "SJ",
    "page": 19,
    "pages": 27,
    "tiles": [
      87,
      88,
      57,
      89,
      90
    ]
  },
  {
    "brand": "SJ",
    "page": 20,
    "pages": 27,
    "tiles": [
      91,
      218,
      219,
      92,
      93
    ]
  },
  {
    "brand": "SJ",
    "page": 21,
    "pages": 27,
    "tiles": [
      94,
      95,
      96,
      97,
      98
    ]
  },
  {
    "brand": "SJ",
    "page": 22,
    "pages": 27,
    "tiles": [
      99,
      100,
      101,
      102,
      207
    ]
  },
  {
    "brand": "SJ",
    "page": 23,
    "pages": 27,
    "tiles": [
      103,
      58,
      59,
      104,
      105
    ]
  },
  {
    "brand": "SJ",
    "page": 24,
    "pages": 27,
    "tiles": [
      106,
      107,
      108,
      109,
      110
    ]
  },
  {
    "brand": "SJ",
    "page": 25,
    "pages": 27,
    "tiles": [
      111,
      112,
      113,
      114,
      121
    ]
  },
  {
    "brand": "SJ",
    "page": 26,
    "pages": 27,
    "tiles": [
      115,
      116,
      117,
      225,
      118
    ]
  },
  {
    "brand": "SJ",
    "page": 27,
    "pages": 27,
    "tiles": [
      119,
      210,
      122,
      123,
      40
    ]
  },
  {
    "brand": "Oofy",
    "page": 1,
    "pages": 2,
    "tiles": [
      151,
      167,
      153,
      154,
      211
    ]
  },
  {
    "brand": "Oofy",
    "page": 2,
    "pages": 2,
    "tiles": [
      155,
      152,
      166,
      150,
      211
    ]
  },
  {
    "brand": "Matlin",
    "page": 1,
    "pages": 5,
    "tiles": [
      135,
      124,
      125,
      126,
      127
    ]
  },
  {
    "brand": "Matlin",
    "page": 2,
    "pages": 5,
    "tiles": [
      129,
      130,
      131,
      132,
      133
    ]
  },
  {
    "brand": "Matlin",
    "page": 3,
    "pages": 5,
    "tiles": [
      144,
      145,
      146,
      147,
      142
    ]
  },
  {
    "brand": "Matlin",
    "page": 4,
    "pages": 5,
    "tiles": [
      143,
      128,
      136,
      141,
      137
    ]
  },
  {
    "brand": "Matlin",
    "page": 5,
    "pages": 5,
    "tiles": [
      138,
      139,
      140,
      126,
      127
    ]
  },
  {
    "brand": "Smart Plus",
    "page": 1,
    "pages": 5,
    "tiles": [
      168,
      169,
      214,
      213,
      170
    ]
  },
  {
    "brand": "Smart Plus",
    "page": 2,
    "pages": 5,
    "tiles": [
      171,
      216,
      172,
      173,
      212
    ]
  },
  {
    "brand": "Smart Plus",
    "page": 3,
    "pages": 5,
    "tiles": [
      174,
      175,
      176,
      217,
      177
    ]
  },
  {
    "brand": "Smart Plus",
    "page": 4,
    "pages": 5,
    "tiles": [
      178,
      179,
      180,
      182,
      181
    ]
  },
  {
    "brand": "Smart Plus",
    "page": 5,
    "pages": 5,
    "tiles": [
      215,
      169,
      214,
      213,
      170
    ]
  },
  {
    "brand": "Beds & More",
    "page": 1,
    "pages": 4,
    "tiles": [
      184,
      185,
      186,
      187,
      188
    ]
  },
  {
    "brand": "Beds & More",
    "page": 2,
    "pages": 4,
    "tiles": [
      189,
      190,
      191,
      192,
      193
    ]
  },
  {
    "brand": "Beds & More",
    "page": 3,
    "pages": 4,
    "tiles": [
      194,
      195,
      196,
      197,
      198
    ]
  },
  {
    "brand": "Beds & More",
    "page": 4,
    "pages": 4,
    "tiles": [
      199,
      200,
      186,
      187,
      188
    ]
  }
].map((s) => ({
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
