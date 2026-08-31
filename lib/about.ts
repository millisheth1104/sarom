/**
 * About page content — ALL REAL.
 *
 * Sources, both supplied by the client:
 *   · https://sarom.info/about.php  — founding year, the six directors and
 *     their titles, reach figures, vision/mission, and the dated timeline.
 *   · reference/Brand Book.pdf      — the About Us and Our Strength copy,
 *     the founders' note, warehouse and SKU figures.
 *
 * Nothing here is invented. Long-form copy is trimmed rather than rewritten:
 * where a sentence is shortened, it keeps the brand's own words.
 *
 * Where the two sources disagree, the live site wins as the public claim:
 * the Brand Book says "over 1,200 stores", about.php says "1000+ stores".
 * `1,000+` is used, which is true under both.
 */

/* ── 1 · HERO ─────────────────────────────────────────────────────────── */

export const ABOUT_HERO = {
  eyebrow: "About Sarom",
  /* The live site's own H1, split for the line-by-line reveal. */
  titleLines: ["A journey of timeless", "elegance & Indian heritage."],
  body: "Founded in 2005. Today, one of India's leading names in furnishings.",
  /* A real styled interior, not the folded-fabric macro that was here first:
     desaturated and grey, it read as stone rather than furnishing. */
  image: {
    src: "/media/product/showroom-hero.webp",
    alt: "A living room furnished in Sarom upholstery",
  },
  /* A rail of real facts along the foot of the hero, so the opening has
     structure rather than being a headline floating on a photograph. */
  meta: [
    { value: "2005", label: "Founded" },
    { value: "Thane", label: "Maharashtra, India" },
    { value: "PAN India", label: "& overseas" },
  ],
};

/* ── 2 · ABOUT ────────────────────────────────────────────────────────── */

export const ABOUT_STORY = {
  eyebrow: "The House",
  titleLines: ["Every fabric has"],
  titleEm: "a tale to share.",
  /* Verbatim from about.php. */
  lead:
    "Sarom Fab Private Ltd. began as a marvellous story in 2005, founded by Mr. Amarshi Shah & Mr. Shantilal Shah.",
  /* Trimmed from the Brand Book's About Us — the brand's own words. */
  body:
    "We are not just a brand but a movement that changes how you experience your living space — fine upholstery, beautiful curtains and luxurious bedding, made to turn a space into a cozy retreat.",
  images: [
    { src: "/media/about/3.webp", alt: "Sarom drapery falling beside a wooden side table" },
    { src: "/media/about/6.webp", alt: "Textured Sarom curtain over a boucle stool" },
  ],
};

/* ── 3 · FOUNDERS ─────────────────────────────────────────────────────── */

/**
 * Verbatim from the Brand Book's founders page.
 *
 * `body` is kept but NOT rendered — the paragraph was dropped from the
 * section at the client's request. Left in place because it is real,
 * sourced copy and restoring it should not mean re-reading the PDF.
 */
export const FOUNDERS_NOTE = {
  eyebrow: "Our Founders",
  titleLines: ["Rooted by pioneers,"],
  titleEm: "driven by visionaries.",
  body:
    "Mr. Amarshi Shah and Mr. Shantilal Shah laid the foundation of Sarom Fab Pvt Ltd. Mr. Shantilal Shah has more than 30 years of experience in the Home Fabrics & Furnishing industry, and spearheaded the introduction of ‘cut-length services’ for the first time in the Indian market.",
};

/** Names, titles and portraits all from sarom.info/about.php. */
export const FOUNDERS = [
  { id: "amarshi", name: "Amarshi Hardhor Shah", role: "Director", portrait: "/media/founders/amarshi-shah.webp" },
  { id: "shantilal", name: "Shantilal Hardhor Shah", role: "Managing Director", portrait: "/media/founders/shantilal-shah.webp" },
  { id: "manish", name: "Manish Amarshi Shah", role: "Director", portrait: "/media/founders/manish-shah.webp" },
  { id: "rohit", name: "Rohit Shantilal Shah", role: "Director", portrait: "/media/founders/rohit-shah.webp" },
  { id: "milin", name: "Milin Shantilal Shah", role: "Director", portrait: "/media/founders/milin-shah.webp" },
  { id: "deepak", name: "Deepak Hirji Nishar", role: "Director", portrait: "/media/founders/deepak-nishar.webp" },
];

/* ── 4 · REACH ────────────────────────────────────────────────────────── */

/** Figures from about.php (cities, stores) and the Brand Book (SKUs, sq ft). */
export const REACH = [
  { value: 200, suffix: "+", label: "Cities" },
  { value: 1000, suffix: "+", label: "Stores" },
  { value: 6000, suffix: "+", label: "SKUs" },
  /* Non-breaking space: the figure sits in a nowrap flex row, which collapses
     an ordinary leading space and renders "3Lakh+". */
  { value: 3, suffix: " Lakh+", label: "Sq. Ft. Warehouse" },
];

/** Named chapters for the Reach rail. */
export const REACH_CHAPTERS = [
  { id: "presence", label: "Presence", body: "A PAN India presence across 200 cities, and the preferred choice of architects and interior designers." },
  { id: "retail", label: "Retail", body: "Over 1,000 stores carry Sarom, with a growing presence in overseas markets." },
  { id: "range", label: "Range", body: "More than 6,000 SKUs across designs, colours and textures." },
  { id: "logistics", label: "Logistics", body: "A centralised 3 lakh+ sq. ft. warehouse with real-time inventory and same-day dispatch." },
];

export const REACH_ANCHOR = {
  eyebrow: "Our Reach",
  titleLines: ["India's go-to"],
  titleEm: "destination.",
  /* Trimmed from about.php's "Present & Future" plus the Brand Book's reach
     note — both the brand's own words. */
  body:
    "A PAN India presence, and the preferred choice of architects and interior designers. Also available in overseas markets.",
  image: { src: "/media/about/4.webp", alt: "Sarom throw draped over a bed frame" },
};

/* ── 5 · VISION, MISSION, STRENGTH ───────────────────────────────────── */

/**
 * Three blocks, all real.
 *
 * Vision and Mission are verbatim from about.php. The third — Strength — is
 * the Brand Book's own "Our Strength" passage, trimmed but not rewritten.
 * The layout wants three; rather than invent one, this uses the third real
 * statement Sarom actually publishes about itself.
 */
export const PILLARS = [
  {
    key: "mission",
    index: "01",
    title: "Mission",
    body:
      "To elevate the Indian home furnishings market with superior fabrics, designs and decor solutions for the best return value.",
  },
  {
    key: "vision",
    index: "02",
    title: "Vision",
    body:
      "To be your one-stop destination for exquisite furnishings — enhancing and personalising your luxurious home experience.",
  },
  {
    key: "strength",
    index: "03",
    title: "Strength",
    body:
      "A trendsetter in product quality and design, evolving to meet the needs of both customers and the market — a go-to name for sourcing and retail alike.",
  },
];

/* ── 6 · WHY ──────────────────────────────────────────────────────────── */

/**
 * Drawn from about.php's "Why Sarom?" and the Brand Book's "Our Strength" —
 * split into the distinct claims those two passages actually make.
 */
export const WHY = [
  {
    id: "quality",
    title: "Quality & Design",
    body: "A trendsetter in product quality and design, evolving with our customers' needs.",
    image: { src: "/media/about/2.webp", alt: "" },
  },
  {
    id: "range",
    title: "Range",
    body: "An extensive collection of sophisticated fabrics — the preferred choice for sourcing and retail alike.",
    image: { src: "/media/about/1.webp", alt: "" },
  },
  {
    id: "palette",
    title: "Colour & Pattern",
    body: "A vibrant range of colours and designs, answering the demands of today's consumer.",
    image: { src: "/media/about/5.webp", alt: "" },
  },
  {
    id: "service",
    title: "Service",
    body: "Same-day dispatch from a centralised warehouse, with real-time inventory management.",
    image: { src: "/media/about/6.webp", alt: "" },
  },
  {
    id: "oem",
    title: "OEM Partnership",
    body: "Customisation backed by an in-house design and merchandising team aligned with global trends.",
    image: { src: "/media/about/3.webp", alt: "" },
  },
];

/** Sarom's own line, verbatim from about.php. */
export const WHY_CLOSE = "‘Impossible’ isn't in Sarom's vocabulary.";

/* ── 7 · JOURNEY ──────────────────────────────────────────────────────── */

/** Real dated milestones, verbatim figures from about.php. */
export const JOURNEY = [
  {
    year: "2005—2010",
    title: "Making our mark",
    body: "30 product catalogues a year, 1,000+ SKUs and around 500 dealers. We were the first to introduce ‘cut-length service’ to the Indian market.",
    image: "/media/about/3.webp",
  },
  {
    year: "2011—2015",
    title: "A go-to name",
    body: "100 product catalogues each year, 4,000 SKUs and 2,000 dealers on our list.",
    image: "/media/about/1.webp",
  },
  {
    year: "2016—2021",
    title: "Innovators and trendsetters",
    body: "200 catalogues a year, 10,000 SKUs and more than 4,000 dealers across India.",
    image: "/media/about/6.webp",
  },
  {
    year: "Today",
    title: "PAN India, and beyond",
    body: "Over 1,000 stores across 200 cities, with a growing presence in overseas markets.",
    image: "/media/about/4.webp",
  },
];

export const JOURNEY_CLOSE = { lead: "And this is only", em: "the beginning." };
