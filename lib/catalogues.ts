/**
 * Sarom catalogue data — GENERATED, do not hand-edit.
 *
 * Source: https://sarom.info/ecatalogue.php (209 records).
 * Regenerate with:  node reference/gen-catalogues.mjs
 *
 * `cover` is a path under /public. `pdf` is the PDF on our own server,
 * https://sarom.co.in/catalogues/... (the VPS mirrors public/catalogues), NOT
 * sarom.info, which is being retired. The PDFs are NOT in git (~951MB); the
 * 203 scraped ones rebuild with `node reference/fetch-pdfs.mjs` while sarom.info
 * is still up, the 26 client ones only from the client's zip — see .gitignore.
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
  /** Hosted URL on sarom.co.in — what the site links to. */
  pdf: string | null;
  /** Path to the local mirror, which is not committed. See fetch-pdfs.mjs. */
  pdfLocal: string | null;
};

export const BRAND_ORDER = ["SJ","Oofy","Matlin","Smart Plus","Beds & More"] as const;

export const COLLECTIONS = ["Curtains", "Upholstery", "Upholstery/Curtain", "Bedding"] as const;

export const CATALOGUES: Catalogue[] = [
  {
    "id": 1,
    "title": "Abaca",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/abaca.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/abaca.pdf",
    "pdfLocal": "/catalogues/sj/curtains/abaca.pdf"
  },
  {
    "id": 2,
    "title": "Adonis",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheers",
    "cover": "/catalogues/_covers/sj/curtains/adonis.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/adonis.pdf",
    "pdfLocal": "/catalogues/sj/curtains/adonis.pdf"
  },
  {
    "id": 3,
    "title": "Akira",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/akira.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/akira.pdf",
    "pdfLocal": "/catalogues/sj/curtains/akira.pdf"
  },
  {
    "id": 4,
    "title": "Alton",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/alton.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/alton.pdf",
    "pdfLocal": "/catalogues/sj/curtains/alton.pdf"
  },
  {
    "id": 5,
    "title": "Amalfi",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/amalfi.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/amalfi.pdf",
    "pdfLocal": "/catalogues/sj/curtains/amalfi.pdf"
  },
  {
    "id": 6,
    "title": "Ambience",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/ambience.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/ambience.pdf",
    "pdfLocal": "/catalogues/sj/curtains/ambience.pdf"
  },
  {
    "id": 7,
    "title": "Antheia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/antheia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/antheia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/antheia.pdf"
  },
  {
    "id": 8,
    "title": "Calico",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/calico.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/calico.pdf",
    "pdfLocal": "/catalogues/sj/curtains/calico.pdf"
  },
  {
    "id": 9,
    "title": "Calix",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/calix.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/calix.pdf",
    "pdfLocal": "/catalogues/sj/curtains/calix.pdf"
  },
  {
    "id": 10,
    "title": "Canary",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/canary.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/canary.pdf",
    "pdfLocal": "/catalogues/sj/curtains/canary.pdf"
  },
  {
    "id": 11,
    "title": "Casabella",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/casabella.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/casabella.pdf",
    "pdfLocal": "/catalogues/sj/curtains/casabella.pdf"
  },
  {
    "id": 12,
    "title": "Caspiana",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/caspiana.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/caspiana.pdf",
    "pdfLocal": "/catalogues/sj/curtains/caspiana.pdf"
  },
  {
    "id": 13,
    "title": "Chezani",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/chezani.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/chezani.pdf",
    "pdfLocal": "/catalogues/sj/curtains/chezani.pdf"
  },
  {
    "id": 14,
    "title": "Cosimia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Printed Curtain",
    "typeRaw": "Printed Curtain",
    "cover": "/catalogues/_covers/sj/curtains/cosimia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/cosimia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/cosimia.pdf"
  },
  {
    "id": 15,
    "title": "Crystal",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/crystal.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/crystal.pdf",
    "pdfLocal": "/catalogues/sj/curtains/crystal.pdf"
  },
  {
    "id": 16,
    "title": "Cyprus",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/cyprus.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/cyprus.pdf",
    "pdfLocal": "/catalogues/sj/curtains/cyprus.pdf"
  },
  {
    "id": 17,
    "title": "Dior",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/dior.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/dior.pdf",
    "pdfLocal": "/catalogues/sj/curtains/dior.pdf"
  },
  {
    "id": 18,
    "title": "Elite",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/elite.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/elite.pdf",
    "pdfLocal": "/catalogues/sj/curtains/elite.pdf"
  },
  {
    "id": 19,
    "title": "Eliz",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/eliz.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/eliz.pdf",
    "pdfLocal": "/catalogues/sj/curtains/eliz.pdf"
  },
  {
    "id": 20,
    "title": "Hawaii",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/hawaii.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/hawaii.pdf",
    "pdfLocal": "/catalogues/sj/curtains/hawaii.pdf"
  },
  {
    "id": 21,
    "title": "Hector",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/hector.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/hector.pdf",
    "pdfLocal": "/catalogues/sj/curtains/hector.pdf"
  },
  {
    "id": 22,
    "title": "Imperia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/imperia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/imperia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/imperia.pdf"
  },
  {
    "id": 23,
    "title": "Jiya Revival",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/jiya-revival.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/jiya-revival.pdf",
    "pdfLocal": "/catalogues/sj/curtains/jiya-revival.pdf"
  },
  {
    "id": 24,
    "title": "Linea",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/linea.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/linea.pdf",
    "pdfLocal": "/catalogues/sj/curtains/linea.pdf"
  },
  {
    "id": 25,
    "title": "Liona",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/liona.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/liona.pdf",
    "pdfLocal": "/catalogues/sj/curtains/liona.pdf"
  },
  {
    "id": 26,
    "title": "Monaco",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/monaco.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/monaco.pdf",
    "pdfLocal": "/catalogues/sj/curtains/monaco.pdf"
  },
  {
    "id": 27,
    "title": "Novy",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/novy.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/novy.pdf",
    "pdfLocal": "/catalogues/sj/curtains/novy.pdf"
  },
  {
    "id": 28,
    "title": "Otto",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/otto.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/otto.pdf",
    "pdfLocal": "/catalogues/sj/curtains/otto.pdf"
  },
  {
    "id": 29,
    "title": "Pristine",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/pristine.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/pristine.pdf",
    "pdfLocal": "/catalogues/sj/curtains/pristine.pdf"
  },
  {
    "id": 30,
    "title": "Regalia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/regalia.webp",
    "pdf": null,
    "pdfLocal": null
  },
  {
    "id": 31,
    "title": "Regency",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/regency.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/regency.pdf",
    "pdfLocal": "/catalogues/sj/curtains/regency.pdf"
  },
  {
    "id": 32,
    "title": "Rolex",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/rolex.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/rolex.pdf",
    "pdfLocal": "/catalogues/sj/curtains/rolex.pdf"
  },
  {
    "id": 33,
    "title": "Romania",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/romania.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/romania.pdf",
    "pdfLocal": "/catalogues/sj/curtains/romania.pdf"
  },
  {
    "id": 34,
    "title": "Sheen",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/sheen.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/sheen.pdf",
    "pdfLocal": "/catalogues/sj/curtains/sheen.pdf"
  },
  {
    "id": 35,
    "title": "Silica",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/silica.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/silica.pdf",
    "pdfLocal": "/catalogues/sj/curtains/silica.pdf"
  },
  {
    "id": 36,
    "title": "Silket",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/silket.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/silket.pdf",
    "pdfLocal": "/catalogues/sj/curtains/silket.pdf"
  },
  {
    "id": 37,
    "title": "Solace",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheers",
    "cover": "/catalogues/_covers/sj/curtains/solace.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/solace.pdf",
    "pdfLocal": "/catalogues/sj/curtains/solace.pdf"
  },
  {
    "id": 38,
    "title": "Solitaire",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/solitaire.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/solitaire.pdf",
    "pdfLocal": "/catalogues/sj/curtains/solitaire.pdf"
  },
  {
    "id": 39,
    "title": "Aaron",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/aaron.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/aaron.pdf",
    "pdfLocal": "/catalogues/sj/curtains/aaron.pdf"
  },
  {
    "id": 40,
    "title": "Alma",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheers",
    "cover": "/catalogues/_covers/sj/curtains/alma.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/alma.pdf",
    "pdfLocal": "/catalogues/sj/curtains/alma.pdf"
  },
  {
    "id": 41,
    "title": "Amesbury",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/amesbury.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/amesbury.pdf",
    "pdfLocal": "/catalogues/sj/curtains/amesbury.pdf"
  },
  {
    "id": 42,
    "title": "Andora",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/andora.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/andora.pdf",
    "pdfLocal": "/catalogues/sj/curtains/andora.pdf"
  },
  {
    "id": 43,
    "title": "Aubrey",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/aubrey.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/aubrey.pdf",
    "pdfLocal": "/catalogues/sj/curtains/aubrey.pdf"
  },
  {
    "id": 44,
    "title": "Canberra",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/canberra.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/canberra.pdf",
    "pdfLocal": "/catalogues/sj/curtains/canberra.pdf"
  },
  {
    "id": 45,
    "title": "Capri",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Curtains",
    "typeRaw": "Capri",
    "cover": "/catalogues/_covers/sj/curtains/capri.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/capri.pdf",
    "pdfLocal": "/catalogues/sj/curtains/capri.pdf"
  },
  {
    "id": 46,
    "title": "Cloud",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/cloud.webp",
    "pdf": null,
    "pdfLocal": null
  },
  {
    "id": 47,
    "title": "Infinty",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Curtains",
    "typeRaw": "Infinty",
    "cover": "/catalogues/_covers/sj/curtains/infinty.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/infinty.pdf",
    "pdfLocal": "/catalogues/sj/curtains/infinty.pdf"
  },
  {
    "id": 48,
    "title": "Eva",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidered Sheer",
    "cover": "/catalogues/_covers/sj/curtains/eva.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/eva.pdf",
    "pdfLocal": "/catalogues/sj/curtains/eva.pdf"
  },
  {
    "id": 49,
    "title": "Neoma",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/neoma.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/neoma.pdf",
    "pdfLocal": "/catalogues/sj/curtains/neoma.pdf"
  },
  {
    "id": 50,
    "title": "Royal",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Curtain",
    "typeRaw": "Plain Curtain",
    "cover": "/catalogues/_covers/sj/curtains/royal.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/royal.pdf",
    "pdfLocal": "/catalogues/sj/curtains/royal.pdf"
  },
  {
    "id": 51,
    "title": "Willshire",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Jacquard Curtain",
    "cover": "/catalogues/_covers/sj/curtains/willshire.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/willshire.pdf",
    "pdfLocal": "/catalogues/sj/curtains/willshire.pdf"
  },
  {
    "id": 52,
    "title": "Albert",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/albert.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/albert.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/albert.pdf"
  },
  {
    "id": 53,
    "title": "Amy",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/amy.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/amy.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/amy.pdf"
  },
  {
    "id": 54,
    "title": "Aria",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/aria.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/aria.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/aria.pdf"
  },
  {
    "id": 55,
    "title": "August",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/august.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/august.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/august.pdf"
  },
  {
    "id": 56,
    "title": "Azzurra",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Upholstery",
    "typeRaw": "Azzurra",
    "cover": "/catalogues/_covers/sj/upholstery/azzurra.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/azzurra.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/azzurra.pdf"
  },
  {
    "id": 57,
    "title": "Ibiza",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/ibiza.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/ibiza.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/ibiza.pdf"
  },
  {
    "id": 58,
    "title": "Novel",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/novel.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/novel.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/novel.pdf"
  },
  {
    "id": 59,
    "title": "Palomino",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/palomino.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/palomino.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/palomino.pdf"
  },
  {
    "id": 60,
    "title": "Aboone",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/aboone.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/aboone.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/aboone.pdf"
  },
  {
    "id": 61,
    "title": "Adriana",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/adriana.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/adriana.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/adriana.pdf"
  },
  {
    "id": 62,
    "title": "Albany",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/albany.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/albany.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/albany.pdf"
  },
  {
    "id": 63,
    "title": "Alpha",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/alpha.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/alpha.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/alpha.pdf"
  },
  {
    "id": 65,
    "title": "Amazon",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/amazon.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/amazon.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/amazon.pdf"
  },
  {
    "id": 66,
    "title": "Amber",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/amber.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/amber.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/amber.pdf"
  },
  {
    "id": 67,
    "title": "Apache",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/apache.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/apache.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/apache.pdf"
  },
  {
    "id": 68,
    "title": "Asaba",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Plain Texture",
    "typeRaw": "Plain Texture",
    "cover": "/catalogues/_covers/sj/upholstery/asaba.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/asaba.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/asaba.pdf"
  },
  {
    "id": 69,
    "title": "Asmara",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/asmara.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/asmara.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/asmara.pdf"
  },
  {
    "id": 70,
    "title": "Aspen",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/aspen.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/aspen.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/aspen.pdf"
  },
  {
    "id": 72,
    "title": "Astor",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/astor.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/astor.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/astor.pdf"
  },
  {
    "id": 73,
    "title": "Avita/Persian",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/avita-persian.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/avita-persian.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/avita-persian.pdf"
  },
  {
    "id": 74,
    "title": "Bentley",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/bentley.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/bentley.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/bentley.pdf"
  },
  {
    "id": 75,
    "title": "Berry/Cambry",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/berry-cambry.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/berry-cambry.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/berry-cambry.pdf"
  },
  {
    "id": 76,
    "title": "Breeze",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/breeze.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/breeze.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/breeze.pdf"
  },
  {
    "id": 77,
    "title": "Brisbane New",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/brisbane-new.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/brisbane-new.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/brisbane-new.pdf"
  },
  {
    "id": 78,
    "title": "Cairo",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/cairo.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/cairo.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/cairo.pdf"
  },
  {
    "id": 79,
    "title": "Calibri",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/calibri.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/calibri.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/calibri.pdf"
  },
  {
    "id": 81,
    "title": "Carolina",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/carolina.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/carolina.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/carolina.pdf"
  },
  {
    "id": 82,
    "title": "Casper/Cherry",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/casper-cherry.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/casper-cherry.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/casper-cherry.pdf"
  },
  {
    "id": 83,
    "title": "Choper",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/choper.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/choper.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/choper.pdf"
  },
  {
    "id": 84,
    "title": "Elantra",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/sj/upholstery/elantra.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/elantra.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/elantra.pdf"
  },
  {
    "id": 85,
    "title": "Florous",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/florous.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/florous.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/florous.pdf"
  },
  {
    "id": 86,
    "title": "Glaze",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/glaze.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/glaze.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/glaze.pdf"
  },
  {
    "id": 87,
    "title": "Hera",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/hera.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/hera.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/hera.pdf"
  },
  {
    "id": 88,
    "title": "Heritage",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/heritage.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/heritage.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/heritage.pdf"
  },
  {
    "id": 89,
    "title": "Jaguar",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/jaguar.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/jaguar.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/jaguar.pdf"
  },
  {
    "id": 90,
    "title": "Jaipur Volume 1",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/jaipur-volume-1.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/jaipur-volume-1.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/jaipur-volume-1.pdf"
  },
  {
    "id": 91,
    "title": "Jaipur Volume 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/jaipur-volume-2.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/jaipur-volume-2.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/jaipur-volume-2.pdf"
  },
  {
    "id": 92,
    "title": "Kilim",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/kilim.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/kilim.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/kilim.pdf"
  },
  {
    "id": 93,
    "title": "Lenka",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Plain Texture",
    "typeRaw": "Plain Texture",
    "cover": "/catalogues/_covers/sj/upholstery/lenka.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/lenka.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/lenka.pdf"
  },
  {
    "id": 94,
    "title": "Libra",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Knitted",
    "typeRaw": "Knitted",
    "cover": "/catalogues/_covers/sj/upholstery/libra.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/libra.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/libra.pdf"
  },
  {
    "id": 95,
    "title": "Linus",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/linus.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/linus.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/linus.pdf"
  },
  {
    "id": 96,
    "title": "Lisa",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/lisa.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/lisa.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/lisa.pdf"
  },
  {
    "id": 97,
    "title": "Lisabel",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/lisabel.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/lisabel.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/lisabel.pdf"
  },
  {
    "id": 98,
    "title": "Marble",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/marble.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/marble.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/marble.pdf"
  },
  {
    "id": 99,
    "title": "Melisa",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/melisa.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/melisa.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/melisa.pdf"
  },
  {
    "id": 100,
    "title": "Merasa",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/merasa.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/merasa.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/merasa.pdf"
  },
  {
    "id": 101,
    "title": "Milano",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/milano.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/milano.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/milano.pdf"
  },
  {
    "id": 102,
    "title": "Mustan",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/mustan.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/mustan.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/mustan.pdf"
  },
  {
    "id": 103,
    "title": "New Molfino",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/new-molfino.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/new-molfino.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/new-molfino.pdf"
  },
  {
    "id": 104,
    "title": "Paramount",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/paramount.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/paramount.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/paramount.pdf"
  },
  {
    "id": 105,
    "title": "Penza",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/sj/upholstery/penza.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/penza.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/penza.pdf"
  },
  {
    "id": 106,
    "title": "Persian",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/persian.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/persian.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/persian.pdf"
  },
  {
    "id": 107,
    "title": "Piano",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/piano.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/piano.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/piano.pdf"
  },
  {
    "id": 108,
    "title": "Pixel/Ibiza",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/pixel-ibiza.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/pixel-ibiza.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/pixel-ibiza.pdf"
  },
  {
    "id": 109,
    "title": "Riviera",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/riviera.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/riviera.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/riviera.pdf"
  },
  {
    "id": 110,
    "title": "Savannah",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/savannah.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/savannah.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/savannah.pdf"
  },
  {
    "id": 111,
    "title": "Soho",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Embossed Texture",
    "typeRaw": "Embossed Texture",
    "cover": "/catalogues/_covers/sj/upholstery/soho.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/soho.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/soho.pdf"
  },
  {
    "id": 112,
    "title": "Sugar",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/sugar.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/sugar.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/sugar.pdf"
  },
  {
    "id": 113,
    "title": "Sumba",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/sumba.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/sumba.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/sumba.pdf"
  },
  {
    "id": 114,
    "title": "Taras",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/taras.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/taras.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/taras.pdf"
  },
  {
    "id": 115,
    "title": "Victoria/Vermount",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/victoria-vermount.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/victoria-vermount.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/victoria-vermount.pdf"
  },
  {
    "id": 116,
    "title": "Vigo",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/vigo.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/vigo.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/vigo.pdf"
  },
  {
    "id": 117,
    "title": "Vivian Checks",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/vivian-checks.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/vivian-checks.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/vivian-checks.pdf"
  },
  {
    "id": 118,
    "title": "Winchester",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/winchester.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/winchester.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/winchester.pdf"
  },
  {
    "id": 119,
    "title": "Zenith",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/zenith.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/zenith.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/zenith.pdf"
  },
  {
    "id": 120,
    "title": "Alfredo",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/alfredo.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/alfredo.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/alfredo.pdf"
  },
  {
    "id": 121,
    "title": "Universe",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/universe.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/universe.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/universe.pdf"
  },
  {
    "id": 122,
    "title": "Luxor-N",
    "brand": "SJ",
    "collection": "Upholstery/Curtain",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery-curtain/luxor-n.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery-curtain/luxor-n.pdf",
    "pdfLocal": "/catalogues/sj/upholstery-curtain/luxor-n.pdf"
  },
  {
    "id": 123,
    "title": "Velveto/Plush",
    "brand": "SJ",
    "collection": "Upholstery/Curtain",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery-curtain/velveto-plush.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery-curtain/velveto-plush.pdf",
    "pdfLocal": "/catalogues/sj/upholstery-curtain/velveto-plush.pdf"
  },
  {
    "id": 124,
    "title": "Alesia",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/curtains/alesia.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/alesia.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/alesia.pdf"
  },
  {
    "id": 125,
    "title": "Alex",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Plain Sheer",
    "cover": "/catalogues/_covers/matlin/curtains/alex.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/alex.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/alex.pdf"
  },
  {
    "id": 126,
    "title": "Amanda",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Wider Width Sheer",
    "typeRaw": "Wider Width Sheer",
    "cover": "/catalogues/_covers/matlin/curtains/amanda.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/amanda.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/amanda.pdf"
  },
  {
    "id": 127,
    "title": "Amour",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/curtains/amour.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/amour.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/amour.pdf"
  },
  {
    "id": 128,
    "title": "Celina",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/celina.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/celina.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/celina.pdf"
  },
  {
    "id": 129,
    "title": "Chantily",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Wider Width Texture Curtain",
    "typeRaw": "Wider Width Texture Curtain",
    "cover": "/catalogues/_covers/matlin/curtains/chantily.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/chantily.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/chantily.pdf"
  },
  {
    "id": 130,
    "title": "Fiona",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "Embroidery Sheer",
    "cover": "/catalogues/_covers/matlin/curtains/fiona.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/fiona.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/fiona.pdf"
  },
  {
    "id": 131,
    "title": "Linea",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Texture",
    "typeRaw": "Texture",
    "cover": "/catalogues/_covers/matlin/curtains/linea.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/linea.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/linea.pdf"
  },
  {
    "id": 132,
    "title": "Samara",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Embroidery",
    "typeRaw": "Embroidery",
    "cover": "/catalogues/_covers/matlin/curtains/samara.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/samara.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/samara.pdf"
  },
  {
    "id": 133,
    "title": "Savour",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/matlin/curtains/savour.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/savour.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/savour.pdf"
  },
  {
    "id": 134,
    "title": "Willow",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Velvet / Digital Print",
    "typeRaw": "Velevt / Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/willow.webp",
    "pdf": null,
    "pdfLocal": null
  },
  {
    "id": 135,
    "title": "Abellone",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/curtains/abellone.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/abellone.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/abellone.pdf"
  },
  {
    "id": 136,
    "title": "Cinthia",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/cinthia.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/cinthia.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/cinthia.pdf"
  },
  {
    "id": 137,
    "title": "Mayfair",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/mayfair.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/mayfair.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/mayfair.pdf"
  },
  {
    "id": 138,
    "title": "Myra",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/myra.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/myra.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/myra.pdf"
  },
  {
    "id": 139,
    "title": "Onella",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/onella.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/onella.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/onella.pdf"
  },
  {
    "id": 140,
    "title": "Orea",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/orea.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/orea.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/orea.pdf"
  },
  {
    "id": 141,
    "title": "Mamboo",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/mamboo.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/mamboo.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/mamboo.pdf"
  },
  {
    "id": 142,
    "title": "Atmosphere",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Boucle Texture",
    "typeRaw": "Boucle Texture",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/atmosphere.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/atmosphere.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/atmosphere.pdf"
  },
  {
    "id": 143,
    "title": "Cassia",
    "brand": "Matlin",
    "collection": "Upholstery/Curtain",
    "type": "Plain",
    "typeRaw": "Plain",
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/cassia.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery-curtain/cassia.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery-curtain/cassia.pdf"
  },
  {
    "id": 144,
    "title": "Delilah",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/matlin/upholstery/delilah.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery/delilah.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery/delilah.pdf"
  },
  {
    "id": 145,
    "title": "Felix",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Woven Texture",
    "typeRaw": "Woven Texture",
    "cover": "/catalogues/_covers/matlin/upholstery/felix.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery/felix.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery/felix.pdf"
  },
  {
    "id": 146,
    "title": "Isabella",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/matlin/upholstery/isabella.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery/isabella.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery/isabella.pdf"
  },
  {
    "id": 147,
    "title": "Udaipur",
    "brand": "Matlin",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/matlin/upholstery/udaipur.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/upholstery/udaipur.pdf",
    "pdfLocal": "/catalogues/matlin/upholstery/udaipur.pdf"
  },
  {
    "id": 148,
    "title": "Abruzzi",
    "brand": "Oofy",
    "collection": "Upholstery/Curtain",
    "type": "Foil Print",
    "typeRaw": "Foil Print",
    "cover": "/catalogues/_covers/oofy/upholstery-curtain/abruzzi.webp",
    "pdf": null,
    "pdfLocal": null
  },
  {
    "id": 149,
    "title": "Auralia",
    "brand": "Oofy",
    "collection": "Curtains",
    "type": "Wider Width Curtain",
    "typeRaw": "Wider Width Curtain",
    "cover": "/catalogues/_covers/oofy/curtains/auralia.webp",
    "pdf": null,
    "pdfLocal": null
  },
  {
    "id": 150,
    "title": "Avezzano/Bolzano",
    "brand": "Oofy",
    "collection": "Upholstery/Curtain",
    "type": "Foil Velvet",
    "typeRaw": "Foil Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery-curtain/avezzano-bolzano.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery-curtain/avezzano-bolzano.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery-curtain/avezzano-bolzano.pdf"
  },
  {
    "id": 151,
    "title": "Costa",
    "brand": "Oofy",
    "collection": "Curtains",
    "type": "Wider Width Curtain",
    "typeRaw": "Wider Width Curtain",
    "cover": "/catalogues/_covers/oofy/curtains/costa.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/curtains/costa.pdf",
    "pdfLocal": "/catalogues/oofy/curtains/costa.pdf"
  },
  {
    "id": 152,
    "title": "Tivoli",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Foil Velvet",
    "typeRaw": "Foil Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery/tivoli.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/tivoli.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/tivoli.pdf"
  },
  {
    "id": 153,
    "title": "Bryan",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/oofy/upholstery/bryan.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/bryan.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/bryan.pdf"
  },
  {
    "id": 154,
    "title": "Doralia",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Quilted Velvet",
    "typeRaw": "Quilted Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery/doralia.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/doralia.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/doralia.pdf"
  },
  {
    "id": 155,
    "title": "Tiffany/Brittany",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Quilted Velvet",
    "typeRaw": "Quilted Velvet",
    "cover": "/catalogues/_covers/oofy/upholstery/tiffany-brittany.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/tiffany-brittany.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/tiffany-brittany.pdf"
  },
  {
    "id": 166,
    "title": "Velur",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/oofy/upholstery/velur.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/velur.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/velur.pdf"
  },
  {
    "id": 167,
    "title": "Aluva",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/oofy/upholstery/aluva.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/aluva.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/aluva.pdf"
  },
  {
    "id": 168,
    "title": "Altima",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/altima.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/altima.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/altima.pdf"
  },
  {
    "id": 169,
    "title": "Ambiant",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/ambiant.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/ambiant.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/ambiant.pdf"
  },
  {
    "id": 170,
    "title": "Bailey",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Chenille",
    "typeRaw": "Chenille",
    "cover": "/catalogues/_covers/smart-plus/upholstery/bailey.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/bailey.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/bailey.pdf"
  },
  {
    "id": 171,
    "title": "Ferrari",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Suede Leather",
    "typeRaw": "Suede Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/ferrari.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/ferrari.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/ferrari.pdf"
  },
  {
    "id": 172,
    "title": "Keiba",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Knitted",
    "typeRaw": "Knitted",
    "cover": "/catalogues/_covers/smart-plus/upholstery/keiba.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/keiba.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/keiba.pdf"
  },
  {
    "id": 173,
    "title": "Kenzi",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Chenille",
    "typeRaw": "Chenille",
    "cover": "/catalogues/_covers/smart-plus/upholstery/kenzi.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/kenzi.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/kenzi.pdf"
  },
  {
    "id": 174,
    "title": "Levi",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/smart-plus/upholstery/levi.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/levi.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/levi.pdf"
  },
  {
    "id": 175,
    "title": "Luke",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/luke.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/luke.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/luke.pdf"
  },
  {
    "id": 176,
    "title": "Marwin",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/marwin.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/marwin.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/marwin.pdf"
  },
  {
    "id": 177,
    "title": "Meraki",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Chenille",
    "typeRaw": "Chenille",
    "cover": "/catalogues/_covers/smart-plus/upholstery/meraki.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/meraki.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/meraki.pdf"
  },
  {
    "id": 178,
    "title": "Merry",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/merry.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/merry.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/merry.pdf"
  },
  {
    "id": 179,
    "title": "Perth",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/perth.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/perth.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/perth.pdf"
  },
  {
    "id": 180,
    "title": "Phantom",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artificial Leather",
    "cover": "/catalogues/_covers/smart-plus/upholstery/phantom.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/phantom.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/phantom.pdf"
  },
  {
    "id": 181,
    "title": "Soffice",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/smart-plus/upholstery/soffice.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/soffice.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/soffice.pdf"
  },
  {
    "id": 182,
    "title": "Sierra",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Suede",
    "typeRaw": "Suede",
    "cover": "/catalogues/_covers/smart-plus/upholstery/sierra.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/sierra.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/sierra.pdf"
  },
  {
    "id": 184,
    "title": "Amos",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Main Curtain",
    "typeRaw": "Main Curtain",
    "cover": "/catalogues/_covers/beds-and-more/curtains/amos.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/curtains/amos.pdf",
    "pdfLocal": "/catalogues/beds-and-more/curtains/amos.pdf"
  },
  {
    "id": 185,
    "title": "Bali Stripes",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Black Out",
    "typeRaw": "Black Out",
    "cover": "/catalogues/_covers/beds-and-more/curtains/bali-stripes.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/curtains/bali-stripes.pdf",
    "pdfLocal": "/catalogues/beds-and-more/curtains/bali-stripes.pdf"
  },
  {
    "id": 186,
    "title": "Cable",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Sheer",
    "typeRaw": "Sheer",
    "cover": "/catalogues/_covers/beds-and-more/curtains/cable.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/curtains/cable.pdf",
    "pdfLocal": "/catalogues/beds-and-more/curtains/cable.pdf"
  },
  {
    "id": 187,
    "title": "Diffusion",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Linen/Sheer",
    "typeRaw": "Linen/Sheer",
    "cover": "/catalogues/_covers/beds-and-more/curtains/diffusion.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/curtains/diffusion.pdf",
    "pdfLocal": "/catalogues/beds-and-more/curtains/diffusion.pdf"
  },
  {
    "id": 188,
    "title": "Eva",
    "brand": "Beds & More",
    "collection": "Curtains",
    "type": "Fabric",
    "typeRaw": "Fabric",
    "cover": "/catalogues/_covers/beds-and-more/curtains/eva.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/curtains/eva.pdf",
    "pdfLocal": "/catalogues/beds-and-more/curtains/eva.pdf"
  },
  {
    "id": 189,
    "title": "Florent",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Artificial Leather",
    "typeRaw": "Artifiacial Leather",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/florent.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/florent.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/florent.pdf"
  },
  {
    "id": 190,
    "title": "Harmonie",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/harmonie.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/harmonie.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/harmonie.pdf"
  },
  {
    "id": 191,
    "title": "Iconique",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/iconique.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/iconique.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/iconique.pdf"
  },
  {
    "id": 192,
    "title": "Jardin",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/jardin.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/jardin.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/jardin.pdf"
  },
  {
    "id": 193,
    "title": "Jasper",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/jasper.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/jasper.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/jasper.pdf"
  },
  {
    "id": 194,
    "title": "Linnean",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/linnean.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/linnean.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/linnean.pdf"
  },
  {
    "id": 195,
    "title": "Mouvement",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/mouvement.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/mouvement.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/mouvement.pdf"
  },
  {
    "id": 196,
    "title": "Nelson",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/nelson.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/nelson.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/nelson.pdf"
  },
  {
    "id": 197,
    "title": "Opulence",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/opulence.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/opulence.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/opulence.pdf"
  },
  {
    "id": 198,
    "title": "Oscar",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/oscar.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/oscar.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/oscar.pdf"
  },
  {
    "id": 199,
    "title": "Reflect",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/reflect.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/reflect.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/reflect.pdf"
  },
  {
    "id": 200,
    "title": "Refuge",
    "brand": "Beds & More",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/beds-and-more/upholstery/refuge.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/upholstery/refuge.pdf",
    "pdfLocal": "/catalogues/beds-and-more/upholstery/refuge.pdf"
  },
  {
    "id": 201,
    "title": "Aruba",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/aruba.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/aruba.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/aruba.pdf"
  },
  {
    "id": 202,
    "title": "Halden",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print Velvet",
    "typeRaw": "Digital Print Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/halden.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/halden.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/halden.pdf"
  },
  {
    "id": 205,
    "title": "Angel",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Sweden Velvet",
    "typeRaw": "Sweden Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/angel.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/angel.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/angel.pdf"
  },
  {
    "id": 206,
    "title": "Halden Volume 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Velvet",
    "typeRaw": "Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/halden-volume-2.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/halden-volume-2.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/halden-volume-2.pdf"
  },
  {
    "id": 207,
    "title": "Nakshi",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Digital Print",
    "typeRaw": "Digital Print",
    "cover": "/catalogues/_covers/sj/upholstery/nakshi.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/nakshi.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/nakshi.pdf"
  },
  {
    "id": 208,
    "title": "Alfy",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Plain Velvet",
    "typeRaw": "Plain Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/alfy.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/alfy.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/alfy.pdf"
  },
  {
    "id": 209,
    "title": "Alytus",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Sweden Velvet",
    "typeRaw": "Sweden Velvet",
    "cover": "/catalogues/_covers/sj/upholstery/alytus.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/alytus.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/alytus.pdf"
  },
  {
    "id": 210,
    "title": "Zurich",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Fancy Trendy Furry",
    "typeRaw": "Fancy Trendy Furry",
    "cover": "/catalogues/_covers/sj/upholstery/zurich.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/zurich.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/zurich.pdf"
  },
  {
    "id": 211,
    "title": "Pebbles",
    "brand": "Oofy",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/oofy/upholstery/pebbles.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/upholstery/pebbles.pdf",
    "pdfLocal": "/catalogues/oofy/upholstery/pebbles.pdf"
  },
  {
    "id": 212,
    "title": "Leisure",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/leisure.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/leisure.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/leisure.pdf"
  },
  {
    "id": 213,
    "title": "Aston",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/aston.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/aston.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/aston.pdf"
  },
  {
    "id": 214,
    "title": "Antalya",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/antalya.png",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/antalya.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/antalya.pdf"
  },
  {
    "id": 215,
    "title": "Wooly",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/wooly.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/wooly.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/wooly.pdf"
  },
  {
    "id": 216,
    "title": "Giza",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/giza.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/giza.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/giza.pdf"
  },
  {
    "id": 217,
    "title": "Melody",
    "brand": "Smart Plus",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/smart-plus/upholstery/melody.webp",
    "pdf": "https://sarom.co.in/catalogues/smart-plus/upholstery/melody.pdf",
    "pdfLocal": "/catalogues/smart-plus/upholstery/melody.pdf"
  },
  {
    "id": 218,
    "title": "JODHPUR VOL 1",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/jodhpur-vol-1.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/jodhpur-vol-1.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/jodhpur-vol-1.pdf"
  },
  {
    "id": 219,
    "title": "JODHPUR VOL 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/jodhpur-vol-2.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/jodhpur-vol-2.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/jodhpur-vol-2.pdf"
  },
  {
    "id": 220,
    "title": "BIKANER VOL 1",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/bikaner-vol-1.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/bikaner-vol-1.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/bikaner-vol-1.pdf"
  },
  {
    "id": 221,
    "title": "BIKANER VOL 2",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/bikaner-vol-2.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/bikaner-vol-2.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/bikaner-vol-2.pdf"
  },
  {
    "id": 222,
    "title": "ADDIS",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/addis.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/addis.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/addis.pdf"
  },
  {
    "id": 223,
    "title": "CHARCOAL",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/charcoal.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/charcoal.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/charcoal.pdf"
  },
  {
    "id": 224,
    "title": "DUCATI",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/ducati.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/ducati.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/ducati.pdf"
  },
  {
    "id": 225,
    "title": "WILFORD",
    "brand": "SJ",
    "collection": "Upholstery",
    "type": "Woven",
    "typeRaw": "Woven",
    "cover": "/catalogues/_covers/sj/upholstery/wilford.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery/wilford.pdf",
    "pdfLocal": "/catalogues/sj/upholstery/wilford.pdf"
  },
  {
    "id": 226,
    "title": "Artemis",
    "brand": "Oofy",
    "collection": "Curtains",
    "type": "Wider Width Sheer",
    "typeRaw": "Wider width sheer curtains",
    "cover": "/catalogues/_covers/oofy/curtains/artemis.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/curtains/artemis.pdf",
    "pdfLocal": "/catalogues/oofy/curtains/artemis.pdf"
  },
  {
    "id": 227,
    "title": "Bare Earth",
    "brand": "Beds & More",
    "collection": "Bedding",
    "type": "Bedcover Set",
    "typeRaw": "100% cotton 4 layer gauze bedcover set | King size",
    "cover": "/catalogues/_covers/beds-and-more/bedding/bare-earth.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/bedding/bare-earth.pdf",
    "pdfLocal": "/catalogues/beds-and-more/bedding/bare-earth.pdf"
  },
  {
    "id": 228,
    "title": "Bravia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Everyday Jacquard Curtains",
    "cover": "/catalogues/_covers/sj/curtains/bravia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/bravia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/bravia.pdf"
  },
  {
    "id": 229,
    "title": "Cabo",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Boucle Curtain",
    "typeRaw": "Boucle Curtains",
    "cover": "/catalogues/_covers/sj/curtains/cabo.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/cabo.pdf",
    "pdfLocal": "/catalogues/sj/curtains/cabo.pdf"
  },
  {
    "id": 230,
    "title": "Chelsea",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Chenille Jacquard",
    "typeRaw": "Luxury Chenille Jacquard Curtains",
    "cover": "/catalogues/_covers/sj/curtains/chelsea.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/chelsea.pdf",
    "pdfLocal": "/catalogues/sj/curtains/chelsea.pdf"
  },
  {
    "id": 231,
    "title": "Cimora",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Texture Curtain",
    "typeRaw": "Luxury Texture Curtains",
    "cover": "/catalogues/_covers/sj/curtains/cimora.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/cimora.pdf",
    "pdfLocal": "/catalogues/sj/curtains/cimora.pdf"
  },
  {
    "id": 232,
    "title": "Cleopatra",
    "brand": "Oofy",
    "collection": "Curtains",
    "type": "Wider Width Curtain",
    "typeRaw": "Wide Width Luxury Curtain",
    "cover": "/catalogues/_covers/oofy/curtains/cleopatra.webp",
    "pdf": "https://sarom.co.in/catalogues/oofy/curtains/cleopatra.pdf",
    "pdfLocal": "/catalogues/oofy/curtains/cleopatra.pdf"
  },
  {
    "id": 233,
    "title": "Columbus",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Boucle Texture",
    "typeRaw": "Boucle & Matte Texture Curtains",
    "cover": "/catalogues/_covers/sj/curtains/columbus.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/columbus.pdf",
    "pdfLocal": "/catalogues/sj/curtains/columbus.pdf"
  },
  {
    "id": 234,
    "title": "Cortina",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Threads of art, woven in jacquard",
    "cover": "/catalogues/_covers/sj/curtains/cortina.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/cortina.pdf",
    "pdfLocal": "/catalogues/sj/curtains/cortina.pdf"
  },
  {
    "id": 235,
    "title": "Crimson",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Printed Texture Curtain",
    "typeRaw": "Printed Texture Curtains",
    "cover": "/catalogues/_covers/sj/curtains/crimson.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/crimson.pdf",
    "pdfLocal": "/catalogues/sj/curtains/crimson.pdf"
  },
  {
    "id": 236,
    "title": "Croshia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Linen",
    "typeRaw": "Linen Look Embroidery",
    "cover": "/catalogues/_covers/sj/curtains/croshia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/croshia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/croshia.pdf"
  },
  {
    "id": 237,
    "title": "Elka",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Chenille",
    "typeRaw": "Chenille Texture Curtain",
    "cover": "/catalogues/_covers/sj/curtains/elka.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/elka.pdf",
    "pdfLocal": "/catalogues/sj/curtains/elka.pdf"
  },
  {
    "id": 238,
    "title": "Geneva",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Where threads meet attitude",
    "cover": "/catalogues/_covers/sj/curtains/geneva.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/geneva.pdf",
    "pdfLocal": "/catalogues/sj/curtains/geneva.pdf"
  },
  {
    "id": 239,
    "title": "Gravia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Everyday Jacquard Curtains",
    "cover": "/catalogues/_covers/sj/curtains/gravia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/gravia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/gravia.pdf"
  },
  {
    "id": 240,
    "title": "Kalakriti",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Embroidered Sheer",
    "typeRaw": "The art of sheer embroidery",
    "cover": "/catalogues/_covers/sj/curtains/kalakriti.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/kalakriti.pdf",
    "pdfLocal": "/catalogues/sj/curtains/kalakriti.pdf"
  },
  {
    "id": 241,
    "title": "Kausheya",
    "brand": "Matlin",
    "collection": "Curtains",
    "type": "Embroidered Linen",
    "typeRaw": "Embroidery & Linen Curtains",
    "cover": "/catalogues/_covers/matlin/curtains/kausheya.webp",
    "pdf": "https://sarom.co.in/catalogues/matlin/curtains/kausheya.pdf",
    "pdfLocal": "/catalogues/matlin/curtains/kausheya.pdf"
  },
  {
    "id": 242,
    "title": "Knitscape",
    "brand": "Beds & More",
    "collection": "Bedding",
    "type": "Comforter Set",
    "typeRaw": "Cotton reversible comforter set 300 TC | King size",
    "cover": "/catalogues/_covers/beds-and-more/bedding/knitscape.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/bedding/knitscape.pdf",
    "pdfLocal": "/catalogues/beds-and-more/bedding/knitscape.pdf"
  },
  {
    "id": 243,
    "title": "Linen & Thread",
    "brand": "Beds & More",
    "collection": "Bedding",
    "type": "Bedsheet Set",
    "typeRaw": "100% cotton double bedsheet set 400 TC | King size",
    "cover": "/catalogues/_covers/beds-and-more/bedding/linen-and-thread.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/bedding/linen-and-thread.pdf",
    "pdfLocal": "/catalogues/beds-and-more/bedding/linen-and-thread.pdf"
  },
  {
    "id": 244,
    "title": "Natura",
    "brand": "Beds & More",
    "collection": "Bedding",
    "type": "Bedsheet Set",
    "typeRaw": "100% Bamboo double bedsheet set | King size",
    "cover": "/catalogues/_covers/beds-and-more/bedding/natura.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/bedding/natura.pdf",
    "pdfLocal": "/catalogues/beds-and-more/bedding/natura.pdf"
  },
  {
    "id": 245,
    "title": "Salem",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Plain Sheer",
    "typeRaw": "Sheer Curtains",
    "cover": "/catalogues/_covers/sj/curtains/salem.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/salem.pdf",
    "pdfLocal": "/catalogues/sj/curtains/salem.pdf"
  },
  {
    "id": 246,
    "title": "Savia",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Jacquard Curtain",
    "typeRaw": "Everyday Jacquard Curtains",
    "cover": "/catalogues/_covers/sj/curtains/savia.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/savia.pdf",
    "pdfLocal": "/catalogues/sj/curtains/savia.pdf"
  },
  {
    "id": 247,
    "title": "Sheer Library I & II",
    "brand": "SJ",
    "collection": "Curtains",
    "type": "Wider Width Sheer",
    "typeRaw": "Wide-width sheer curtain fabrics",
    "cover": "/catalogues/_covers/sj/curtains/sheer-library-i-and-ii.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/curtains/sheer-library-i-and-ii.pdf",
    "pdfLocal": "/catalogues/sj/curtains/sheer-library-i-and-ii.pdf"
  },
  {
    "id": 248,
    "title": "Soft Haven",
    "brand": "Beds & More",
    "collection": "Bedding",
    "type": "Comforter Set",
    "typeRaw": "Cotton reversible comforter set 300 TC | King size",
    "cover": "/catalogues/_covers/beds-and-more/bedding/soft-haven.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/bedding/soft-haven.pdf",
    "pdfLocal": "/catalogues/beds-and-more/bedding/soft-haven.pdf"
  },
  {
    "id": 249,
    "title": "Wilbert",
    "brand": "SJ",
    "collection": "Upholstery/Curtain",
    "type": "Velvet",
    "typeRaw": "Soft Fall Luxury Curtain - dual purpose",
    "cover": "/catalogues/_covers/sj/upholstery-curtain/wilbert.webp",
    "pdf": "https://sarom.co.in/catalogues/sj/upholstery-curtain/wilbert.pdf",
    "pdfLocal": "/catalogues/sj/upholstery-curtain/wilbert.pdf"
  },
  {
    "id": 250,
    "title": "Woven Harmony",
    "brand": "Beds & More",
    "collection": "Bedding",
    "type": "Bedcover Set",
    "typeRaw": "Cotton soft layered woven bedcover set | King size",
    "cover": "/catalogues/_covers/beds-and-more/bedding/woven-harmony.webp",
    "pdf": "https://sarom.co.in/catalogues/beds-and-more/bedding/woven-harmony.pdf",
    "pdfLocal": "/catalogues/beds-and-more/bedding/woven-harmony.pdf"
  }
];

/* SHOWROOM_SLIDES and BRAND_STARTS moved to lib/showroom.ts (hand-maintained):
   the tiles are client photographs now, not catalogue covers, so they cannot be
   regenerated from this data. */

/** Everything for one brand, in listing order. */
export const byBrand = (brand: string) => CATALOGUES.filter((c) => c.brand === brand);

/**
 * One representative photograph per brand, for the House Brands section.
 * Picked by file weight, which tracks photographic richness — a flat or
 * washed-out cover compresses far smaller than a real interior shot.
 */
export const BRAND_HERO: Record<string, { cover: string; count: number }> = {
  "SJ": {
    "cover": "/catalogues/_covers/sj/curtains/amalfi.webp",
    "count": 134
  },
  "Oofy": {
    "cover": "/catalogues/_covers/oofy/curtains/costa.webp",
    "count": 9
  },
  "Matlin": {
    "cover": "/catalogues/_covers/matlin/upholstery-curtain/celina.webp",
    "count": 23
  },
  "Smart Plus": {
    "cover": "/catalogues/_covers/smart-plus/upholstery/perth.webp",
    "count": 21
  },
  "Beds & More": {
    "cover": "/catalogues/_covers/beds-and-more/upholstery/jardin.webp",
    "count": 17
  }
};

/**
 * Category tabs for the homepage sections.
 *
 * NOTE ON "BEDSHEETS": real bedding catalogues HAVE now arrived — the six in
 * the client's 2026-10-12 "PDF - Website" drop, every one of them carrying the
 * "beds&more by sarom" lockup on its cover. They are filed under a fourth
 * collection, "Bedding", which the Curtains and Upholstery predicates below
 * deliberately do not match, so a comforter set never surfaces under
 * Upholstery the way the older stand-ins did.
 *
 * The predicate itself still keys on the BRAND rather than that collection,
 * and on purpose: the seventeen older Beds & More records are still filed as
 * curtains and upholstery, so narrowing it to collection === "Bedding" would
 * empty the tab of everything but the new six. Those seventeen are the
 * remaining half of this clean-up — see BUILD_LOG.
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
export const ALL_ROTATION: number[] = [39, 60, 184, 1, 222, 185, 135, 61, 227, 2, 62, 186, 3, 52, 187, 124, 120, 188, 125, 208, 189, 40, 63, 190, 4, 168, 191, 5, 167, 192, 126, 209, 193, 6, 65, 242, 41, 66, 243, 127, 169, 194, 42, 53, 195, 7, 205, 244, 226, 214, 196, 142, 67, 197, 43, 54, 198, 150, 201, 199, 228, 68, 200, 229, 69, 248, 8, 70, 250, 9, 213, 10, 72, 44, 55, 45, 73, 11, 56, 12, 170, 143, 74, 128, 75, 129, 220, 230, 221, 13, 76, 231, 77, 136, 153, 232, 78, 233, 79, 234, 81, 14, 82, 151, 223, 235, 83, 236, 144, 15, 154, 16, 224, 17, 84, 18, 145, 19, 171, 237, 85, 48, 216, 130, 86, 238, 202, 239, 206, 20, 87, 21, 88, 22, 57, 47, 146, 23, 89, 240, 90, 241, 91, 24, 218, 131, 219, 25, 172, 122, 173, 141, 92, 137, 212, 26, 93, 138, 174, 49, 94, 27, 95, 139, 96, 140, 97, 28, 175, 29, 98, 31, 176, 32, 99, 33, 217, 50, 177, 245, 100, 132, 178, 246, 101, 133, 102, 34, 207, 247, 103, 35, 58, 36, 59, 37, 104, 38, 211, 123, 105, 249, 106, 51, 179, 180, 107, 108, 109, 110, 182, 181, 111, 112, 113, 114, 155, 152, 147, 121, 166, 115, 116, 117, 225, 118, 215, 119, 210];

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
