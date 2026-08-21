# Sarom — Homepage

Cinematic homepage for Sarom (`sarom™ — for your home`). Next.js 16 · React 19 · GSAP ScrollTrigger.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## Two things need your input

### 1. Albra font files (required for the intended look)

The design is built around **Albra** (display) and **Albra Grotesk** (body), per the brand
guidelines. The font files are not in the repo, so the page currently renders with fallbacks
(an elegant serif + a neutral grotesk). **No code change is needed** — drop the files in and
typography switches over.

Put these in `public/fonts/`:

```
Albra-Light.woff2          Albra-Regular.woff2          Albra-Medium.woff2
AlbraGrotesk-Light.woff2   AlbraGrotesk-Regular.woff2   AlbraGrotesk-Medium.woff2
```

Filenames must match exactly — the `@font-face` blocks are in [app/tokens.css](app/tokens.css).
Until then the browser console logs 404s for these; that is expected and harmless.

### 2. Photography

Every image is pulled from the live sarom.info site, so the names and products are genuine.
But the source files are small — the largest is 541×782, most are 180×258 or 267×388. They were
upscaled (Lanczos + unsharp) to hold up at the sizes the layout uses, and `sizes` hints are
tuned per slot, but **upscaling cannot add detail that was never captured**. On a retina display
the largest collection tiles will read soft.

The layout will not change when you supply real photography — just replace the files. Target
resolutions for a crisp result:

| Slot | Path | Wanted |
|---|---|---|
| Category (pinned column) | `public/media/categories/*@3x.webp` | 1200×1600 |
| Fabric swatches | `public/media/fabrics/*@3x.webp` | 900×1200 |
| Collection tiles | `public/media/collections/*@2x.webp` | 1600×2300 |
| Story / editorial | `public/media/interiors/*@3x.webp` | 1400×2000 |

### Also worth doing: compress the hero video

`public/media/sarom-interiors.mp4` is **20 MB** — the single largest thing on the page. It is
`preload="metadata"` and the second instance is `preload="none"` and pauses off-screen, so it
does not block first paint, but it is still a heavy download on mobile data. Recommended:

```bash
# ~2-4 MB at visually identical quality, plus a poster frame
ffmpeg -i sarom-interiors.mp4 -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow \
       -movflags +faststart -an sarom-interiors.mp4
ffmpeg -i sarom-interiors.mp4 -ss 2 -frames:v 1 hero-poster.jpg
```

Then add `poster="/media/hero-poster.jpg"` to the `<video>` in
[components/Hero.tsx](components/Hero.tsx). A WebM/VP9 `<source>` alongside the MP4 would cut it
further.

---

## Structure

```
app/
  layout.tsx        metadata, viewport, skip link, inline JS flag
  page.tsx          section order + Organization JSON-LD
  tokens.css        brand palette, type scale, spacing, motion tokens, @font-face
  globals.css       base, type primitives, layout, motion utilities, reduced-motion
  components.css    preloader, nav, drawer, buttons, cursor, marquee
  sections.css      per-section styles
  responsive.css    ≤1280 / ≤1024 / ≤680 / ≥1800
components/
  Motion.tsx        MotionProvider, Reveal, LineReveal, ImageReveal, Marquee, Arrow
  Chrome.tsx        Preloader, Nav, Cursor
  Hero.tsx          cinematic video opening
  Sections.tsx      Statement, Categories, FabricExperience, VideoChapter,
                    EditorialGrid, Story, Brands, ClosingCta
  Footer.tsx
lib/
  content.ts        ALL copy, links, product names — edit here, not in components
  motion.ts         GSAP registration, reveal + parallax engines
reference/          source brand assets (PDFs, original logos, inspiration shots)
```

**All copy lives in [lib/content.ts](lib/content.ts).** Content taken verbatim from the live
site is unmarked; connective editorial copy written to match the brand's positioning is
flagged `// editorial` so the brand team can review or replace it.

---

## Visual rhythm

Deliberately alternating so the page breathes, and so the nav always has contrast:

```
HERO (dark, film) → marquee → statement (ivory) → categories (linen)
→ fabrics (dark, pinned) → video chapter (ivory) → marquee
→ collection grid (ivory) → story (dark) → brands (linen)
→ CTA (dusty peach) → footer (dark)
```

Brand pastels are used as accents — CTA ground, hover states, rules, the italic accent colour —
never as the page's foundation. The foundation is warm ivory, linen, and deep warm charcoal
(`#14110F`, not pure black).

## Motion

| Behaviour | Where |
|---|---|
| Directional reveals, alternating per section | `[data-reveal="left\|right\|up\|down\|drift\|fade\|scale"]` |
| Masked line-by-line display type | `LineReveal` |
| Clip-path image uncover (frame opens, image settles 1.08→1) | `ImageReveal` |
| Hero video scale 1.07→1.00 + drift, scroll-linked | `Hero.tsx` |
| Categories: pinned image column, swaps per category | `Categories` |
| Fabrics: pinned section, horizontal scroll-linked travel | `FabricExperience` |
| Parallax layers | `[data-parallax="0.09"]` |
| Marquee chapter breaks | `Marquee` |
| Custom cursor label | `[data-cursor="View"]` |

ScrollTrigger only toggles a `data-inview` attribute — the transitions themselves are CSS. That
keeps per-frame JS at zero for ~109 reveal elements while still triggering at scroll-accurate
positions.

### Motion is progressive enhancement

An inline script in `<head>` sets `data-js` on `<html>`. Reveal start-states are scoped to
`html[data-js]`, so with JS disabled or the bundle failing, **every element renders visible** —
the page degrades to ordinary static content rather than a blank screen. A 3s failsafe also
reveals anything still hidden near the viewport.

### `prefers-reduced-motion`

Parallax, pinning, scrubbing and the marquee are all disabled; reveals become simple fades.
The fabric section falls back to a native snap-scroll carousel on desktop too, so its cards
stay reachable without the scroll-driven travel.

---

## Verified

- Production build clean; TypeScript strict, no errors.
- **Contrast:** every text/background pair meets WCAG AA (small text ≥4.5:1, large ≥3:1). The
  muted token `--stone` is tuned to `#6B625A` for exactly this — 5.32:1 on ivory, 4.89:1 on
  linen. `--stone-mid` is the de-emphasis tone for large text only.
- **Semantics:** one `<h1>`, logical heading order, `<main>` landmark, skip link, all images
  have `alt` (12 decorative, 29 meaningful), no empty links, all buttons labelled, external
  links carry `rel="noopener"`.
- **Mobile (375px):** body exactly 375px, no horizontal scroll, nav collapses to drawer,
  category pin swaps to stacked images, fabric rail becomes native snap-scroll.
- **Nav tone:** the `[data-nav-tone]` zones are contiguous across the whole document with zero
  uncovered scroll positions, so the bar always has a defined tone. Detection uses a 1px
  IntersectionObserver band rather than scroll maths, which keeps it correct across GSAP's pin
  spacers.
- **Scroll choreography:** hero scale 1.07→1.00, fabric pin holds while the track travels
  0→−1007px in lockstep with progress 0→1, categories swap 01→02→03 on cue.

### Not verified

The preview pane in the build session stopped compositing frames after the hero, so **only the
hero was confirmed visually**. Everything below it was verified by measurement (geometry,
computed styles, contrast, overflow, motion state) rather than by eye. Worth a manual
`npm run dev` pass before sign-off, particularly the fabric section's horizontal feel and the
collection grid's rhythm, which are judgement calls a measurement can't make.

## Links

Nav, CTAs and footer point at the existing pages — `about.php`, `ecatalogue.php`,
`store-locator.php`, `contact.php`, `careers.php`, `privacy-policy.php`, and the five
`brand-*.php` pages — so nothing breaks when this drops in beside the current site.
