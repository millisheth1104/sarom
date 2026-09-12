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
 * THIRD AND NEWEST SOURCE — client copy supplied 2026-09-11, which SUPERSEDES
 * both of the above wherever they overlap. It rewrote Mission, Vision,
 * Strength, all four timeline entries and all five Why cards, and it raises
 * the reach figures to "200+ cities and 10,000+ Touchpoints with 10,000+
 * SKU’s" (previously 1,000+ stores and 6,000+ SKUs). `REACH` and
 * `REACH_CHAPTERS` were updated to match: leaving them would have put two
 * different store and SKU counts on the same page.
 *
 * The older note on this, kept for the record: where about.php and the Brand
 * Book disagreed, the live site won as the public claim — the Brand Book
 * said "over 1,200 stores", about.php "1000+ stores".
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
    { src: "/media/about/3.webp", alt: "Sarom curtain panels framing a tall window" },
    { src: "/media/about/6.webp", alt: "A bedroom dressed in Sarom striped bedding and sheer curtains" },
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

/**
 * Reach figures.
 *
 * Cities and the warehouse are unchanged. The other two were RAISED to the
 * client's 2026-09-11 copy, which supersedes both earlier sources: that copy
 * states "200+ cities and 10,000+ Touchpoints with 10,000+ SKU's", against
 * about.php's "1000+ stores" and the Brand Book's "6,000+ SKUs". Left alone
 * these would have contradicted the timeline and the Why cards ON THE SAME
 * PAGE. Note the client's own term is now "touchpoints", not "stores".
 */
export const REACH = [
  { value: 200, suffix: "+", label: "Cities" },
  { value: 10000, suffix: "+", label: "Touchpoints" },
  { value: 10000, suffix: "+", label: "SKUs" },
  /* Non-breaking space: the figure sits in a nowrap flex row, which collapses
     an ordinary leading space and renders "3Lakh+". */
  { value: 3, suffix: " Lakh+", label: "Sq. Ft. Warehouse" },
];

/** Named chapters for the Reach rail. */
export const REACH_CHAPTERS = [
  { id: "presence", label: "Presence", body: "A PAN India presence across 200 cities, and the preferred choice of architects and interior designers." },
  { id: "retail", label: "Retail", body: "Sarom reaches 10,000+ touchpoints across India, with a growing presence in overseas markets." },
  { id: "range", label: "Range", body: "More than 10,000 SKUs across designs, colours and textures." },
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
  image: { src: "/media/about/4.webp", alt: "A Sarom curtain gathered by a carved tieback" },
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
      "To transform spaces through fabrics that bring together design, quality and enduring value.",
  },
  {
    key: "vision",
    index: "02",
    title: "Vision",
    body:
      "To shape the future of furnishings in India — making exceptional design accessible to every space.",
  },
  {
    key: "strength",
    index: "03",
    title: "Strength",
    body:
      "A world of fabrics. An eye for what’s next. A network built to deliver. Sarom combines scale, design and service to keep India beautifully furnished.",
  },
];

/* ── 6 · WHY ──────────────────────────────────────────────────────────── */

/**
 * The client's five "Why Sarom" cards, supplied as copy (2026-09-11) and used
 * verbatim. Each carries THREE levels, which is why `label` exists alongside
 * `title`: the client wrote them as "01 — DESIGN & QUALITY" (the category),
 * then a headline, then the supporting line. The card's number is generated
 * from the array order, so the numbering cannot drift out of step with it.
 */
export const WHY = [
  {
    id: "design",
    label: "Design & Quality",
    title: "Made to look good. Made to last.",
    body:
      "Thoughtfully crafted fabrics that bring together trendsetting design, evolving styles and lasting quality.",
    image: { src: "/media/about/2.webp", alt: "" },
  },
  {
    id: "choice",
    label: "Endless Choice",
    title: "Something for every space.",
    body: "A wide world of textures, colours, patterns and styles to choose from.",
    image: { src: "/media/about/1.webp", alt: "" },
  },
  {
    id: "reach",
    label: "PAN-India Reach",
    title: "Always within reach.",
    body: "Sarom is available across 200+ cities and 10,000+ touchpoints.",
    image: { src: "/media/about/5.webp", alt: "" },
  },
  {
    id: "service",
    label: "Quick Service",
    title: "Because waiting shouldn’t be part of the process.",
    body: "Strong stock availability and efficient dispatch keep things moving.",
    image: { src: "/media/about/6.webp", alt: "" },
  },
  {
    id: "custom",
    label: "Made For You",
    title: "Your idea. Our fabric expertise.",
    body:
      "Customised solutions backed by our in-house design and merchandising team.",
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
    body:
      "Sarom entered the furnishing world with 1,000+ SKUs and 500 dealers, pioneering cut-length service in India and setting a new standard for accessibility.",
    image: "/media/about/3.webp",
  },
  {
    year: "2011—2015",
    title: "Becoming a go-to name",
    body:
      "With 4,000 SKUs and 2,000 dealers, Sarom grew into a trusted name — bringing greater choice, design and service across India.",
    image: "/media/about/1.webp",
  },
  {
    year: "2016—2021",
    title: "Innovators & trendsetters",
    body:
      "6,000+ SKUs. 3,000+ dealers. A growing design legacy. Sarom emerged as a trendsetter in India’s furnishing landscape.",
    image: "/media/about/6.webp",
  },
  {
    year: "Today",
    title: "PAN India & beyond",
    body:
      "With products available across 200+ cities and 10,000+ touchpoints, and 10,000+ SKUs, Sarom continues to grow, evolve and shape the future of Indian furnishings.",
    image: "/media/about/4.webp",
  },
];

export const JOURNEY_CLOSE = { lead: "And this is only", em: "the beginning." };
