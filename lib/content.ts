/**
 * Sarom homepage content.
 *
 * Copy, names, categories, links and contact details are taken from the live
 * sarom.info site. Editorial connective copy has been written to match the
 * existing brand positioning — it is marked with `// editorial` so it can be
 * reviewed or replaced by the brand team.
 */

export const SITE = {
  name: "Sarom",
  trademark: "sarom™",
  descriptor: "for your home",
  tagline: "The Art of Fabrics",
  legalName: "Sarom Fab Pvt. Ltd.",
  address:
    "2nd Floor, Kerom, Plot No A/112, Wagle Industrial Estate, Thane West – 400604",
  email: "customercare@sarom.info",
  phone: "+91-8657944323",
  whatsapp: "8657944323",
};

/**
 * Section chapter numbers, in page order.
 *
 * Kept in one ordered list so the numbering can't drift when sections are
 * reordered or inserted — previously Story and the collection grid both
 * rendered "05". Read these via SECTION_INDEX.<key>.
 */
const SECTION_ORDER = [
  ["philosophy", "Collections"],
  ["showroom", "Showroom"],
  ["editorial", "The Edit"],
  ["story", "Our Story"],
  ["brands", "House Brands"],
] as const;

/**
 * Build a section eyebrow like "01 — Collections".
 *
 * The preview routes drop one of the two duplicate compositions, which
 * renumbers everything after it — so the labels cannot be a fixed map there.
 */
export const sectionLabel = (n: number, label: string) =>
  `${String(n).padStart(2, "0")} — ${label}`;

export const SECTION_INDEX = Object.fromEntries(
  SECTION_ORDER.map(([key, label], i) => [
    key,
    `${String(i + 1).padStart(2, "0")} — ${label}`,
  ])
) as Record<(typeof SECTION_ORDER)[number][0], string>;

export const NAV = [
  { label: "About Us", href: "/about.php" },
  { label: "Brands", href: "/brand-sj.php" },
  { label: "e-Catalogue", href: "/ecatalogue.php" },
  { label: "Store Locator", href: "/store-locator.php" },
  { label: "Contact", href: "/contact.php" },
];

/** Hero — built from the live site's own positioning language. */
export const HERO = {
  eyebrow: "Sarom — The Art of Fabrics",
  // editorial: distilled from "our journey is a tapestry of timeless elegance"
  titleLines: ["Spaces, dressed", "in timeless"],
  titleEm: "elegance.",
  body:
    "At Sarom, our journey is a tapestry of timeless elegance and Indian heritage — fabrics made to live with, not merely to look at.",
  tags: ["Upholstery", "Curtains", "Bed Sheets", "Premium Fabrics"],
};

/**
 * The collections editorial — one connected composition.
 *
 * Section nav, three interactive previews, editorial heading, a row of stats,
 * one dominant hero image driven by both the previews and the 01/02/03 rail,
 * then a catalogue-style index of all eleven collections.
 */
export const STATEMENT = {
  index: SECTION_INDEX.philosophy,
  // Section-scoped nav. Kept distinct from the site header above it.
  nav: [
    { label: "Collections", href: "/ecatalogue.php", active: true },
    { label: "New Arrivals", href: "/ecatalogue.php" },
    { label: "About", href: "/about.php" },
    { label: "Our Story", href: "/about.php" },
  ],
  action: { label: "Explore Collection", href: "/ecatalogue.php" },

  // The brand's own line, which happens to sit in the same three-line +
  // italic structure the reference heading uses.
  titleLines: ["Where fabric", "becomes"],
  titleEm: "atmosphere.",
  body:
    "Our collections are drawn from Indian craft traditions and finished to bring warmth, character and a sense of permanence into every space.",

  // The reference carries tag pills here rather than a stats row.
  tags: [
    "#Upholstery",
    "#Curtains",
    "#BedSheets",
    "#IndianCraft",
    "#TimelessDesign",
  ],

  /** Previews and the 01/02/03 rail drive the same active index. */
  slides: [
    {
      num: "01",
      name: "Upholstery",
      thumb: "/media/product/showroom-b.webp",
      hero: "/media/product/coll-hero-upholstery.webp",
      heroAlt: "A living room furnished in Sarom upholstery",
      labels: ["New Collection", "Handcrafted"],
    },
    {
      num: "02",
      name: "Curtains",
      thumb: "/media/product/coll-thumb-curtains.webp",
      hero: "/media/product/coll-hero-curtains.webp",
      heroAlt: "Sarom drapery falling in a warm interior",
      labels: ["Sheer & Weighted", "Natural Texture"],
    },
    {
      num: "03",
      name: "Bed Sheets",
      thumb: "/media/product/selector-a.webp",
      hero: "/media/product/coll-hero-bedding.webp",
      heroAlt: "A bedroom dressed in Sarom bedding",
      labels: ["New Collection", "Easy Clean"],
    },
  ],


};

/** Product categories — exactly as the live site organises them. */
export const CATEGORIES = [
  {
    id: "upholstery",
    index: "01",
    name: "Upholstery",
    href: "/ecatalogue.php",
    image: "/media/categories/upholstery@3x.webp",
    // editorial
    body:
      "Weaves built for the furniture a family actually uses — bouclé, chenille and velvet finished to hold their surface through years of ordinary life.",
    tags: ["Boucle", "Chenille", "Velvet", "Leather"],
  },
  {
    id: "curtains",
    index: "02",
    name: "Curtains",
    href: "/ecatalogue.php",
    image: "/media/categories/curtains@3x.webp",
    // editorial
    body:
      "Drapery that governs the light. Sheers that soften a morning, weights that close a room, and a hand that falls the way it should.",
    tags: ["Sheer", "Jacquard", "Blackout", "Textured"],
  },
  {
    id: "bed-sheet",
    index: "03",
    name: "Bed Sheets",
    href: "/ecatalogue.php",
    image: "/media/categories/bed-sheet@3x.webp",
    // editorial
    body:
      "Bedding made to be lived in and laundered — soft on the first night, and recognisably itself on the hundredth.",
    tags: ["Cotton", "Knitted", "Printed", "Easy Clean"],
  },
];

/** The six fabric families from the site's "Art of Fabrics" section. */
export const FABRICS = [
  {
    id: "boucle",
    name: "Bouclé",
    image: "/media/fabrics/boucle@3x.webp",
    body: "Looped yarn worked into a nubbed, sculptural surface that holds shadow.",
    accent: "#E5C8B9",
  },
  {
    id: "chenille",
    name: "Chenille",
    image: "/media/fabrics/chenille@3x.webp",
    body: "A dense, brushed pile with a quiet sheen that shifts as you cross the room.",
    accent: "#C9C3D1",
  },
  {
    id: "jacquard",
    name: "Jacquard",
    image: "/media/fabrics/jacquard@3x.webp",
    body: "Pattern woven into the structure itself, never printed onto the surface.",
    accent: "#B8D5DE",
  },
  {
    id: "knitted",
    name: "Knitted",
    image: "/media/fabrics/knitted@3x.webp",
    body: "Looped construction with natural give — soft-handed and forgiving in use.",
    accent: "#B9C8B3",
  },
  {
    id: "leather",
    name: "Leather",
    image: "/media/fabrics/leather@3x.webp",
    body: "Grain and weight. A material that records its own history of use.",
    accent: "#D2E8FF",
  },
  {
    id: "velvet",
    name: "Velvet",
    image: "/media/fabrics/velvet@3x.webp",
    body: "Cut pile at close density, reading darker or brighter with the light.",
    accent: "#E5C8B9",
  },
];

/** Performance properties — verbatim from the live site. */
export const PROPERTIES = [
  { label: "Water Repellent", icon: "/media/icons/water.webp" },
  { label: "Child Friendly", icon: "/media/icons/friends.webp" },
  { label: "Party Friendly", icon: "/media/icons/champagne-glass.webp" },
  { label: "Pet Friendly", icon: "/media/icons/pawprint.webp" },
  { label: "Durable", icon: "/media/icons/shield.webp" },
  { label: "Easy Clean", icon: "/media/icons/clean.webp" },
  { label: "Stain Friendly", icon: "/media/icons/spot.webp" },
  { label: "Fire Retardant", icon: "/media/icons/fire.webp" },
];

/**
 * Season's bestsellers — the live site's collection names.
 * `size` drives the editorial grid rhythm; `type` is the fabric family.
 */
export const COLLECTIONS = [
  { name: "Alesia", type: "Bouclé", image: "/media/collections/alesia@2x.webp" },
  { name: "Addis", type: "Chenille", image: "/media/collections/addis@2x.webp" },
  { name: "Antalya", type: "Velvet", image: "/media/collections/antalya@2x.webp" },
  { name: "Aston", type: "Leather", image: "/media/collections/aston@2x.webp" },
  { name: "Bikaner", type: "Jacquard", image: "/media/collections/bikaner@2x.webp" },
  { name: "Charcoal", type: "Textured", image: "/media/collections/charcoal@2x.webp" },
  { name: "Cortina", type: "Chenille", image: "/media/collections/cortina@2x.webp" },
  { name: "Coventry", type: "Bouclé", image: "/media/collections/coventry@2x.webp" },
  { name: "Gizel", type: "Velvet", image: "/media/collections/gizel@2x.webp" },
  { name: "Jodhpur", type: "Jacquard", image: "/media/collections/jodhpur@2x.webp" },
  { name: "Wooly", type: "Knitted", image: "/media/collections/wooly@2x.webp" },
];

/**
 * Editorial showcase — the modular mosaic section.
 *
 * `span` is the 12-column width, `ratio` the tile's aspect ratio, and `drop`
 * nudges a tile down so the grid reads asymmetric rather than ruled.
 */
export const SHOWCASE = {
  label: "The Edit",
  titleLines: ["Fabrics that shape", "everyday"],
  titleEm: "living.",
  body: [
    "We make upholstery, drapery and bedding that quietly becomes part of a room — chosen for how it behaves in daylight, under use, and after a hundred washes.",
    "Rather than follow a season, we work in weave, weight and finish: materials that age well and rooms that stay recognisably themselves.",
  ],
  hero: {
    src: "/media/interiors/about-3@3x.webp",
    alt: "Sarom fabrics in a furnished living space",
    label: "Sarom Collection",
  },
  tiles: [
    { kind: "text", span: 3, text: "Designed to be lived with.", meta: "Sarom — For Your Home" },
    { kind: "image", span: 3, ratio: "1 / 1", src: "/media/fabrics/boucle@3x.webp", alt: "Bouclé upholstery detail", label: "Premium Fabric" },
    { kind: "image", span: 3, ratio: "1 / 1", src: "/media/categories/curtains@3x.webp", alt: "Sarom drapery in a room setting", label: "Hand Finished", drop: true },
    { kind: "image", span: 3, ratio: "1 / 1", src: "/media/fabrics/jacquard@3x.webp", alt: "Jacquard weave detail", label: "Natural Texture" },

    { kind: "image", span: 3, ratio: "4 / 5", src: "/media/fabrics/velvet@3x.webp", alt: "Velvet pile detail" },
    { kind: "image", span: 3, ratio: "4 / 5", src: "/media/interiors/about-5@3x.webp", alt: "Upholstered seating in a warm interior", label: "Upholstery", drop: true },
    { kind: "text", span: 3, text: "Weave, weight, finish.", meta: "Six Fabric Families" },
    { kind: "image", span: 3, ratio: "4 / 5", src: "/media/categories/bed-sheet@3x.webp", alt: "Sarom bedding detail", label: "Bed Sheets" },
  ],
};

/** Poster footer — small nav above a full-width wordmark. */
export const FOOTER_NAV = [
  { label: "Collection", href: "/ecatalogue.php" },
  { label: "About", href: "/about.php" },
  { label: "Our Story", href: "/about.php" },
  { label: "Contact", href: "/contact.php" },
];

export const FOOTER_IMAGE = {
  // Client-supplied composite, background already removed: the five
  // furniture pieces overlap in front of the SAROM wordmark baked into the
  // same transparent PNG (LOMORA reference — one image, not type + sticker
  // layered separately).
  src: "/media/interiors/footer-composite.webp",
  alt: "Sarom furniture — sofa, accent chair, dining chair, swivel chair and bouclé ottoman — over the Sarom wordmark",
  width: 1659,
  height: 597,
};

/* ============================================================
   THE THREE ART-DIRECTED COMPOSITIONS
   Each is one connected composition with a single focal point,
   not a row of equal cards. All imagery is downsampled from the
   Brand Book's print-resolution originals.
   ============================================================ */

/** Section 1 — modular showroom. Compact nav, small images, one dominant. */
export const SHOWROOM = {
  index: "02 — Showroom",
  sideNav: ["Home", "Collections", "Materials", "About"],
  topNav: [
    { label: "Upholstery", href: "/ecatalogue.php" },
    { label: "Curtains", href: "/ecatalogue.php" },
    { label: "Bed Sheets", href: "/ecatalogue.php" },
  ],
  caption: "Showroom",
  strip: [
    { src: "/media/product/showroom-a.webp", alt: "Sarom accent chair in a textured weave", label: "New Collection" },
    { src: "/media/product/showroom-b.webp", alt: "Cushions in Sarom upholstery fabrics", label: "Hand Finished" },
    { src: "/media/product/showroom-c.webp", alt: "A styled living setting in Sarom fabrics" },
  ],
  hero: {
    src: "/media/product/showroom-hero.webp",
    alt: "A living room furnished in Sarom upholstery",
    title: "Rooms, quietly composed.",
    body: "Upholstery, drapery and bedding drawn from one material language.",
    label: "Premium Fabric",
  },
  panel: {
    src: "/media/product/showroom-panel.webp",
    alt: "Macro detail of a Sarom woven fabric",
    kicker: "Every Weave, Every Room",
    label: "Natural Texture",
    href: "/ecatalogue.php",
  },
};

/** Section 2 — editorial showcase. Big type left, one dominant image right. */
export const EDITORIAL = {
  index: "03 — The Edit",
  eyebrow: "The Edit",
  titleLines: ["Textures.", "Made for"],
  titleEm: "living.",
  body:
    "We work in weave, weight and finish — materials chosen for how they behave in daylight, under use, and after a hundred washes.",
  cta: { label: "View e-Catalogue", href: "/ecatalogue.php" },
  hero: {
    src: "/media/product/editorial-hero.webp",
    alt: "A bedroom dressed in Sarom bedding",
    labels: ["Premium Materials", "Natural Finish"],
  },
  thumbs: [
    { src: "/media/product/editorial-a.webp", alt: "Floral jacquard upholstery detail", name: "Jacquard" },
    { src: "/media/product/editorial-b.webp", alt: "Upholstered sofa in a warm interior", name: "Bouclé" },
    { src: "/media/product/editorial-c.webp", alt: "Macro weave detail", name: "Chenille" },
  ],
};

/** Section 3 — collection selector. Light, editorial, thumbnails + tags. */
export const SELECTOR = {
  index: "04 — Collections",
  topNav: [
    { label: "All", href: "/ecatalogue.php" },
    { label: "Living", href: "/ecatalogue.php" },
    { label: "Bedroom", href: "/ecatalogue.php" },
    { label: "Dining", href: "/ecatalogue.php" },
  ],
  action: { label: "Shop Collection", href: "/ecatalogue.php" },
  titleLines: ["Fabrics,", "made to"],
  titleEm: "belong.",
  body:
    "Thoughtfully finished pieces that bring warmth, comfort and a sense of permanence into every space.",
  tags: ["#Linen", "#Velvet", "#Bouclé", "#Jacquard", "#Chenille"],
  thumbs: [
    { src: "/media/product/selector-a.webp", alt: "Sarom bedding in a bedroom setting", name: "Bed Sheets" },
    { src: "/media/product/selector-b.webp", alt: "Cushions in Sarom upholstery", name: "Upholstery" },
    { src: "/media/product/selector-c.webp", alt: "Fabric swatches and yarn", name: "Materials" },
  ],
  hero: {
    src: "/media/product/selector-hero.webp",
    alt: "Floral jacquard upholstery on a Sarom seat",
    labels: ["New Collection", "Handcrafted"],
  },
};

/* ============================================================
   REDESIGNED EDITORIAL SECTIONS
   ============================================================ */

/** 04 — The Edit: a centre-stage film carousel on a dark ground. The active
    film plays muted and loops; its neighbours sit dimmed and bleed off both
    edges. Deliberately unlabelled and unlinked — these are atmosphere, not
    product cards.

    Drop the six files in as /media/films/film-1.mp4 … film-6.mp4. Each entry
    keeps a poster from the existing library so the slot still reads as a
    picture before the video is decoded (and if a file is missing). */
export const FILMS = {
  label: "The Edit",
  kicker: "Our Philosophy",
  body:
    "Every piece is finished to balance atmosphere, material and form — bringing quiet order to the rhythm of everyday living.",
  /* Four reels. The tiles are thumbnails that open the post, so `src` is
     unused for playback and kept only as an identifier. The posters are each
     reel's own cover frame, taken from the post's public og:image and stored
     locally — the Instagram CDN URLs are signed and expire, so hotlinking
     them would break silently.

     These frames are 9:16, because reels are: the carousel is sized portrait
     to match rather than cropping a vertical film into a landscape box. */
  items: [
    {
      src: "/media/films/film-1.mp4",
      poster: "/media/films/film-1.jpg",
      source: "https://www.instagram.com/p/DZ2RLXEyj3X/",
    },
    {
      src: "/media/films/film-2.mp4",
      poster: "/media/films/film-2.jpg",
      source: "https://www.instagram.com/p/DcOMsgEIdnw/",
    },
    {
      src: "/media/films/film-3.mp4",
      poster: "/media/films/film-3.jpg",
      source: "https://www.instagram.com/p/DaWx3vIIeU9/",
    },
    {
      src: "/media/films/film-4.mp4",
      poster: "/media/films/film-4.jpg",
      source: "https://www.instagram.com/p/Da7y4blBrTb/",
    },
  ].map((f, i) => ({ ...f, alt: `Sarom film ${i + 1}` })),
};

/** 05 — Our Story: heading + copy, oversized image, 4x2 grid. */
export const OUR_STORY = {
  titleLines: ["Fabrics that shape"],
  titleEm: "everyday living.",
  body: [
    "At Sarom, our journey is a tapestry of timeless elegance and Indian heritage. We make upholstery, drapery and bedding that quietly becomes part of a room.",
    "Rather than follow a season, we work in weave, weight and finish — choosing materials that age well and rooms that stay recognisably themselves.",
    "Because the best fabric does not ask for attention. It simply belongs.",
  ],
  hero: {
    src: "/media/product/story-hero.webp",
    alt: "Sarom drapery falling in a warm interior",
  },
  grid: [
    { kind: "text", text: "Fabric shapes space. Crafted for slower living.", accent: false },
    { kind: "image", src: "/media/product/editorial-a.webp", alt: "Floral jacquard upholstery detail" },
    { kind: "image", src: "/media/product/editorial-c.webp", alt: "Macro weave detail" },
    { kind: "image", src: "/media/product/selector-c.webp", alt: "Fabric swatches and yarn" },
    { kind: "image", src: "/media/product/showroom-a.webp", alt: "Accent chair in a textured weave" },
    { kind: "image", src: "/media/product/selector-b.webp", alt: "Cushions in Sarom upholstery" },
    { kind: "text", text: "Designed to belong. Timeless forms, lasting comfort.", accent: true },
    { kind: "image", src: "/media/product/selector-a.webp", alt: "Sarom bedding in a bedroom setting" },
  ],
};

/** 07 — Closing CTA: image-left / copy-right card. */
export const LETTER = {
  src: "/media/product/showroom-panel.webp",
  alt: "Macro detail of a Sarom woven fabric",
  titleLines: ["A letter worth"],
  titleEm: "keeping.",
  body:
    "New collections, studio notes and carefully curated inspiration — sent only when there is something worth sharing.",
  primary: { label: "View e-Catalogue", href: "/ecatalogue.php" },
  secondary: { label: "Find a Store", href: "/store-locator.php" },
};

/** House brands — as listed in the live site navigation. */
/**
 * The five house brands.
 *
 * `logo` points at the NORMALISED marks, not the originals. The supplied
 * files are pure white (Smart Plus), near-black (SJ) and tan (Matlin), so no
 * single background could show all five — and they carried very different
 * amounts of empty canvas, which is why SJ rendered tiny beside the rest.
 * The marks are rebuilt from each file's alpha channel into one ivory
 * silhouette: see reference/make-brand-marks.py to regenerate.
 */
/**
 * The five house brands, each with two states: a neutral grey mark at rest
 * and the real logo on hover.
 *
 * The logo files originally in this project were the wrong variants — Smart
 * Plus was a pure-WHITE version made for dark grounds, which is why it kept
 * vanishing. The real one is lime green (#B8D654). Both states are built from
 * the correct files by reference/make-brand-pair.py.
 *
 * The rest state is drawn from each logo's ALPHA channel rather than by
 * desaturating it. A CSS grayscale() of a white logo is still white, so no
 * amount of filtering would have made Smart Plus appear.
 */
/* The marks carry no ground of their own — no plate, no tint. The only
   hover state is the mark itself turning from neutral to its real colour. */
export const BRANDS = [
  { name: "SJ", href: "/brand-sj.php", slug: "sj" },
  { name: "Oofy", href: "/brand-oofy.php", slug: "oofy" },
  { name: "Matlin", href: "/brand-matlin.php", slug: "matlin" },
  {
    name: "Smart Plus",
    href: "/brand-smart-plus.php",
    slug: "smart-plus",
  },
  {
    name: "Beds & More",
    href: "/brand-beds-and-more.php",
    slug: "beds-and-more",
  },
].map((b) => ({
  ...b,
  logoGrey: `/media/brands/grey/${b.slug}.webp`,
  logoColour: `/media/brands/colour/${b.slug}.webp`,
}));

export const STORY = {
  index: SECTION_INDEX.story,
  // Verbatim from the live site, set as the section's anchor line.
  quoteLead: "At Sarom, our journey is a tapestry of",
  quoteEm: "timeless elegance",
  quoteTail: "and Indian heritage.",
  body: [
    // editorial
    "The house was built around fabric — sourcing it, weaving it, and understanding how it behaves once it leaves the loom and enters a home.",
    "That knowledge now runs through five brands and a catalogue that spans upholstery, drapery and bedding, made in India and finished for the way Indian homes are lived in.",
  ],
  cells: [
    { value: "Thane", label: "Maharashtra, India" },
    { value: "05", label: "House Brands" },
    { value: "Pan-India", label: "Retail Network" },
    { value: "In-House", label: "Design Studio" },
  ],
};

export const CTA = {
  titleLines: ["Bring Sarom"],
  titleEm: "into your home.",
  // editorial
  body: "Browse the full catalogue, or find the nearest store and feel the fabrics in person.",
};

/* Sarom's real accounts, taken from the live site's own footer. These were
   generic platform home pages (instagram.com, facebook.com …), which sent
   anyone clicking them nowhere near the brand. */
export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/saromfab/" },
  { label: "Facebook", href: "https://www.facebook.com/saromfab/" },
  { label: "YouTube", href: "https://www.youtube.com/@SaromFab" },
  { label: "Pinterest", href: "https://in.pinterest.com/saromfab_/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sarom-fab-private-limited/",
  },
];

/** The films section links out to the reels' home. */
export const INSTAGRAM_URL = SOCIAL[0].href;

export const FOOTER_LINKS = {
  explore: [
    { label: "About Us", href: "/about.php" },
    { label: "e-Catalogue", href: "/ecatalogue.php" },
    { label: "Store Locator", href: "/store-locator.php" },
    { label: "Careers", href: "/careers.php" },
  ],
  brands: BRANDS.map((b) => ({ label: b.name, href: b.href })),
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy.php" },
    { label: "Contact", href: "/contact.php" },
  ],
};

export const MARQUEE_WORDS = [
  "Sarom",
  "For Your Home",
  "Upholstery",
  "Curtains",
  "Bed Sheets",
  "The Art of Fabrics",
];
