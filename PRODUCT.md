# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences are treated as equally primary, all served by the same catalogue-first
experience rather than a segmented flow:

- **Homeowners** researching fabric for their own home, browsing brand identity and catalogues
  to decide what to buy, then finding a nearby store or dealer to purchase through.
- **Interior designers / architects** specifying materials for a client project, needing to
  browse by category or brand and pull the right catalogue PDF quickly to share or quote from.
- **B2B dealers / retailers** stocking a shop, browsing the full catalogue range to decide what
  to order — the e-Catalogue wall functions closer to a trade order sheet than a shopper's mood
  board for this audience.

There is no visitor-type segmentation in the UI (no "I'm a designer" / "I'm a dealer" fork) —
the same browse-by-brand-and-category experience is expected to work for all three.

## Product Purpose

Sarom (Sarom Fab Pvt. Ltd., Thane, Maharashtra) is a premium Indian home-furnishings house —
upholstery, curtains and bed sheets — sold through five sub-brands (SJ, Oofy, Matlin, Smart
Plus, Beds & More) under one company. The website's job is to present the full catalogue range
(204 real catalogues as of this session) in a way that lets any of the three user types above
find what they need, then hands off to a store locator or a direct catalogue PDF — there is no
cart or checkout; the site is a discovery and specification layer, not a transaction layer.

## Positioning

Two confirmed, truthfully-Sarom-specific claims (a competing Indian fabric house could not make
either without the same underlying structure):

1. **Five houses, one standard.** SJ, Oofy, Matlin, Smart Plus and Beds & More each carry their
   own identity, but all are held to one standard of make, finish and hand — breadth of choice
   without the quality lottery that usually comes with browsing unrelated sub-brands.
2. **In-house design, pan-India reach.** Designs are produced in-house rather than only
   imported/resold, and distribution runs pan-India through a retail network — the
   differentiation is control over the product plus availability, not aesthetics alone.

## Operating Context

- The catalogue is the core artifact: a `Catalogue` record (title, brand, collection/category,
  fabric type, cover image, PDF) drives most of the site. `lib/catalogues.ts` is generated from
  a scrape of the live `sarom.info` e-catalogue page (`reference/gen-catalogues.mjs`) — 204 of
  209 scraped records have both a usable cover and a working PDF link; 5 have no PDF on the
  source site.
- Visiting the site to "find fabric" ends in one of two places: opening a catalogue's PDF
  (hosted on `sarom.info`, not mirrored publicly — the 660MB local PDF mirror used during
  development is git-ignored) or reaching the store locator. There is no on-site purchase flow.
- The three product categories (Curtains, Upholstery, Bedsheets) and five house brands are the
  two axes visitors filter by everywhere catalogues are shown — the homepage sliders, the
  dedicated `/ecatalogue` wall, and the House Brands section all use the same underlying
  category/brand taxonomy (`lib/catalogues.ts`'s `CATEGORY_TABS` / `BRAND_ORDER`).

## Capabilities and Constraints

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, GSAP 3.13 +
  ScrollTrigger for scroll-driven motion, hand-written CSS on a custom token system — no
  Tailwind, no component library. Deployed on Vercel (`sarom-red.vercel.app`).
- **No cart/checkout, no user accounts.** Every "buy" path routes to a real store or a catalogue
  PDF, never a form that implies a transaction the business doesn't support.
- **Albra / Albra Grotesk are TRIAL-licensed** (Ultra Kühl). The license forbids conversion,
  server hosting, and publishing content made with them — the `.otf` files must never be
  converted to `.woff2` or shipped, and the font folder stays git-ignored. Wired as `local()` in
  `@font-face` so the trial faces render only if installed on the *viewer's* machine; the site
  falls back cleanly otherwise. This unblocks only once the client buys a real license.
- **Catalogue coverage gaps** (open, not to be silently patched over): 5 of 209 scraped
  catalogues have no PDF on the live site (Regalia, Cloud, Willow, Auralia, Abruzzi). Real
  bedsheet catalogues don't exist yet on the source site — "Beds & More" currently stands in for
  the Bedsheets category.
- **No verified, dated company history.** Founding year, milestones, and any literal chronology
  are unconfirmed — future work must not invent dates or a founding narrative. Real, durable
  facts that *are* confirmed (Thane HQ, five house brands, pan-India retail network, in-house
  design studio, current catalogue count) stand in for a timeline where one is needed.

## Brand Commitments

- Name and mark: `sarom™ — for your home`. Wordmark uses a distinctive two-tone "O" (green/blue)
  — real logo assets live in `public/media/logo-*.png`.
- Real accounts only in the footer/social links (Instagram, Facebook, YouTube, Pinterest,
  LinkedIn) — pulled from the live site's own footer, not generic platform homepages.
- Copy discipline: content taken verbatim from the live `sarom.info` site is unmarked in
  `lib/content.ts`; connective editorial copy written to match the brand's voice during this
  rebuild is flagged `// editorial`. New copy should keep following this convention rather than
  asserting new claims freely.
- Foundation palette is warm ivory / linen / deep warm charcoal (`#14110F`, not pure black);
  five brand pastels (Dusty Peach, Soft Sage, Powder Blue, Muted Lavender, Light Blue) are
  accents rotated per section, never the page's foundation.

## Evidence on Hand

- **204 real, working catalogue records** (title, brand, category, fabric type, cover image,
  PDF link) in `lib/catalogues.ts`, scraped from `sarom.info/ecatalogue.php`. Cover images are
  real product photography extracted from each catalogue's own PDF (`reference/upgrade-covers.py`,
  `reference/refix-covers.py`) — never stock imagery or invented product shots.
  - Local PDF mirror exists for development (`reference/fetch-pdfs.mjs`) but is git-ignored
    (~660MB); production links point at the canonical `sarom.info` PDF URLs.
- **Real product/editorial photography** in `public/media/product/` — macro weave and swatch
  detail shots, styled interiors, category hero images — already used across the homepage's
  Our Story and Collections sections.
- **Real social accounts** and a real registered address (2nd Floor, Kerom, Plot No A/112, Wagle
  Industrial Estate, Thane West, Maharashtra 400604) used in the Organization JSON-LD.
- **Absences to not fabricate:** no confirmed founding date or company timeline; no confirmed
  testimonials, press mentions, or case studies; no real bedsheet-specific catalogue line yet.

## Product Principles

1. **Discovery over transaction.** Every surface exists to help a visitor find and understand a
   fabric, then hand off to a real store or a real PDF — never to simulate a purchase flow the
   business doesn't have.
2. **One taxonomy, everywhere.** Brand and category are the two axes the whole site filters by;
   new surfaces should reuse `lib/catalogues.ts`'s existing categorization rather than invent a
   parallel one.
3. **Real data or nothing.** Product imagery, catalogue counts, brand facts and copy are sourced
   from the live site or the catalogue scrape — never stock photography, invented statistics, or
   fabricated history, even when it would be more convenient to write.
4. **Five brands, one house.** Sub-brand identities (logos, names) stay distinct; the standard of
   craft, motion language and site chrome around them stays unified.

## Accessibility & Inclusion

WCAG AA is the standing bar: every text/background pairing on the site has been verified at
launch (small text ≥4.5:1, large ≥3:1), reduced-motion is fully respected (parallax, pinning,
and scroll-scrubbing all disable; reveals fall back to simple fades), and the reveal system
degrades to fully-visible static content with JavaScript disabled or failed.
