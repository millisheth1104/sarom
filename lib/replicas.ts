/**
 * Content for the three composition replicas.
 *
 * Layout follows the three reference mockups closely. Two deliberate
 * substitutions:
 *   - Where the references show prices, these use fabric family + collection
 *     name. Sarom does not publish prices and inventing them would be wrong.
 *   - Colour stays on the Sarom palette; the references' dark UI is not used.
 */

/* ---------------- SECTION 1 — studio / showroom ---------------- */
/**
 * One slide per house brand, five tiles each (3 cards + 1 feature + 1
 * panel) — the same bento shape the section already used, just re-run
 * per brand instead of shown once. Card imagery cycles through the
 * eleven named collections as a placeholder; swap in each brand's own
 * catalogue photos when supplied.
 */
const COLLECTION_POOL = [
  { image: "/media/collections/alesia@2x.webp", name: "Alesia", type: "Bouclé" },
  { image: "/media/collections/addis@2x.webp", name: "Addis", type: "Chenille" },
  { image: "/media/collections/antalya@2x.webp", name: "Antalya", type: "Velvet" },
  { image: "/media/collections/aston@2x.webp", name: "Aston", type: "Leather" },
  { image: "/media/collections/bikaner@2x.webp", name: "Bikaner", type: "Jacquard" },
  { image: "/media/collections/charcoal@2x.webp", name: "Charcoal", type: "Textured" },
  { image: "/media/collections/cortina@2x.webp", name: "Cortina", type: "Chenille" },
  { image: "/media/collections/coventry@2x.webp", name: "Coventry", type: "Bouclé" },
  { image: "/media/collections/gizel@2x.webp", name: "Gizel", type: "Velvet" },
  { image: "/media/collections/jodhpur@2x.webp", name: "Jodhpur", type: "Jacquard" },
  { image: "/media/collections/wooly@2x.webp", name: "Wooly", type: "Knitted" },
];

const SHOWROOM_BRANDS = [
  {
    brand: "SJ",
    feature: {
      src: "/media/product/coll-hero-upholstery.webp",
      alt: "A living room furnished in SJ upholstery",
      title: "Structured comfort.",
      body: "SJ's seating collection, built for everyday support and long wear.",
      tagName: "Drift Lounge",
      tagMeta: "Bouclé",
    },
    panel: { src: "/media/product/showroom-panel.webp", alt: "Macro detail of an SJ woven fabric" },
  },
  {
    brand: "Oofy",
    feature: {
      src: "/media/product/coll-hero-bedding.webp",
      alt: "A bedroom styled in Oofy bedding",
      title: "Playful textures.",
      body: "Oofy brings colour and texture into casual, everyday living.",
      tagName: "Morning Light",
      tagMeta: "Jacquard",
    },
    panel: { src: "/media/product/editorial-c.webp", alt: "Macro weave detail from Oofy fabrics" },
  },
  {
    brand: "Matlin",
    feature: {
      src: "/media/product/coll-hero-curtains.webp",
      alt: "Drapery styled in a Matlin interior",
      title: "Quiet luxury.",
      body: "Matlin's fabrics for considered, long-lived interiors.",
      tagName: "Still Room",
      tagMeta: "Velvet",
    },
    panel: { src: "/media/product/selector-c.webp", alt: "Fabric swatches and yarn from Matlin" },
  },
  {
    brand: "Smart Plus",
    feature: {
      src: "/media/product/showroom-hero.webp",
      alt: "A living space furnished in Smart Plus fabrics",
      title: "Performance fabrics.",
      body: "Smart Plus — engineered weaves built for busy households.",
      tagName: "Daily Wear",
      tagMeta: "Textured",
    },
    panel: { src: "/media/product/drape-wide.webp", alt: "Fabric fold detail from Smart Plus" },
  },
  {
    brand: "Beds & More",
    feature: {
      src: "/media/product/editorial-hero.webp",
      alt: "A bedroom furnished in Beds & More linens",
      title: "Rest, redefined.",
      body: "Beds & More's bedding collection, made for deeper sleep.",
      tagName: "Night Fold",
      tagMeta: "Knitted",
    },
    panel: { src: "/media/product/story-hero.webp", alt: "Bedding fabric detail from Beds & More" },
  },
];

/** Deep link to one catalogue entry. The e-catalogue is a single page, so
 *  the specific item travels as a query param rather than its own route. */
const catalogueHref = (brand: string, name?: string) => {
  const q = new URLSearchParams({ brand });
  if (name) q.set("collection", name.toLowerCase().replace(/\s+/g, "-"));
  return `/ecatalogue.php?${q.toString()}`;
};

export const SHOWROOM_SLIDES = SHOWROOM_BRANDS.map((b, i) => ({
  brand: b.brand,
  cards: [0, 1, 2].map((c) => {
    const pick = COLLECTION_POOL[(i * 3 + c) % COLLECTION_POOL.length];
    return {
      src: pick.image,
      alt: `${b.brand} ${pick.name} fabric, ${pick.type.toLowerCase()}`,
      family: pick.type,
      name: pick.name,
      href: catalogueHref(b.brand, pick.name),
    };
  }),
  feature: { ...b.feature, href: catalogueHref(b.brand, b.feature.tagName) },
  panel: {
    kicker: ["Every weave.", "Every room."],
    src: b.panel.src,
    alt: b.panel.alt,
    href: catalogueHref(b.brand),
  },
}));

/* ---------------- SECTION 2 — product editorial ---------------- */
export const PRODUCT = {
  nav: [
    { label: "Home", href: "/", active: true },
    { label: "Fabrics", href: "/ecatalogue.php" },
    { label: "About", href: "/about.php" },
    { label: "Contact", href: "/contact.php" },
  ],
  action: { label: "Contact us", href: "/contact.php" },
  titleLines: ["Premium weaves.", "Effortless comfort.", "Lasting quality."],
  body:
    "Contemporary fabrics crafted for the way you live, designed to bring effortless elegance into your everyday spaces.",
  /* thumbnails, each with a corner arrow badge */
  thumbs: [
    {
      src: "/media/product/editorial-a.webp",
      alt: "Floral jacquard upholstery detail",
      hero: "/media/product/selector-hero.webp",
      heroAlt: "Floral jacquard upholstery on a Sarom seat",
      name: "Jacquard",
    },
    {
      src: "/media/product/editorial-c.webp",
      alt: "Macro weave detail",
      hero: "/media/product/coll-hero-curtains.webp",
      heroAlt: "Sarom drapery falling in a warm interior",
      name: "Chenille",
    },
    {
      src: "/media/product/showroom-a.webp",
      alt: "Sarom accent chair in a textured weave",
      hero: "/media/product/coll-hero-upholstery.webp",
      heroAlt: "A living room furnished in Sarom upholstery",
      name: "Bouclé",
    },
  ],
  floating: ["Premium materials", "Natural finish"],
  /* the live site's own performance claims */
  tags: [
    "Water Repellent",
    "Easy Clean",
    "Durable",
    "Pet Friendly",
    "Fire Retardant",
  ],
};

/* ---------------- SECTION 3 — collection selector ---------------- */
export const BELONG = {
  nav: [
    { label: "Home", href: "/", active: true },
    { label: "Collections", href: "/ecatalogue.php" },
    { label: "New Arrivals", href: "/ecatalogue.php" },
    { label: "About", href: "/about.php" },
  ],
  action: { label: "Shop Collection", href: "/ecatalogue.php" },
  titleLines: ["Fabrics,", "Made to"],
  titleLast: "Belong.",
  body:
    "Thoughtfully finished pieces that bring warmth, comfort and timeless design into every space.",
  tags: [
    "#MinimalLiving",
    "#IndianCraft",
    "#SolidWeave",
    "#ModernHome",
    "#TimelessDesign",
  ],
  slides: [
    {
      num: "01",
      name: "Living",
      thumb: "/media/product/selector-b.webp",
      hero: "/media/product/coll-hero-upholstery.webp",
      heroAlt: "A living room furnished in Sarom upholstery",
    },
    {
      num: "02",
      name: "Lounge",
      thumb: "/media/product/showroom-a.webp",
      hero: "/media/product/selector-hero.webp",
      heroAlt: "Floral jacquard upholstery on a Sarom seat",
    },
    {
      num: "03",
      name: "Bedroom",
      thumb: "/media/product/selector-a.webp",
      hero: "/media/product/coll-hero-bedding.webp",
      heroAlt: "A bedroom dressed in Sarom bedding",
    },
  ],
  floating: ["New Collection", "Handcrafted"],
};
