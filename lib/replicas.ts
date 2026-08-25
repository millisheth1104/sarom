/**
 * Content for the three composition replicas.
 *
 * Layout follows the three reference mockups closely. Two deliberate
 * substitutions:
 *   - Where the references show prices, these use fabric family + collection
 *     name. Sarom does not publish prices and inventing them would be wrong.
 *   - Colour stays on the Sarom palette; the references' dark UI is not used.
 */

/* ---------------- SECTION 1 — studio / showroom ----------------
   The showroom bento is now driven by real catalogue data scraped from
   sarom.info — see lib/catalogues.ts (generated). The placeholder slide
   data that used to live here has been removed.
   ---------------------------------------------------------------- */

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
