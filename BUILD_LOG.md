# Build Log — Sarom Homepage Redesign

**Date:** 2026-08-20
**Scope:** Homepage only. Links point at existing `.php` pages.
**Stack:** Next.js 16.3.1 · React 19.1.1 · GSAP 3.13 (ScrollTrigger) · TypeScript strict

---

## Decisions taken with the client

| Question | Answer |
|---|---|
| Stack | Next.js + React + GSAP |
| Imagery | Pull real images from sarom.info |
| Fonts | Client supplying Albra files; wire swap-ready slots meanwhile |
| Scope | Homepage only, links to existing pages |

---

## What was built

Starting point was an empty folder — assets only (video, two logo PNGs, brand PDFs, five
inspiration screenshots). No existing codebase to evolve, so the homepage was built from scratch.

Ten sections in an alternating light/dark rhythm: cinematic video hero → marquee → brand
statement → categories (pinned image column) → fabric experience (pinned horizontal travel) →
video chapter + performance properties → editorial collection grid → heritage story → house
brands → closing CTA → footer.

Design system in four CSS layers (tokens / globals / components / sections) plus a dedicated
responsive layer. All copy centralised in `lib/content.ts`.

---

## Asset pipeline

1. Scraped the live site's homepage and five inner pages for image URLs.
2. Downloaded 41 real brand assets: 6 fabric swatches, 3 category images, 11 collection shots,
   5 brand logos, 8 performance icons, 10 interior/editorial shots.
   - Three `imgnew/*` URLs referenced on the homepage returned 404 on the live server; skipped.
3. Found every source small (largest 541×782; most 180×258 or 267×388). Upscaled with
   Lanczos + unsharp mask to match display sizes.
4. Trimmed the logo PNGs — the "white" logo was a 1000×1000 canvas with the wordmark occupying
   only 829×266 in the middle, which rendered as a ~10px smudge in the nav.
5. Converted collection images PNG → WebP: **37 MB → 2.8 MB**. Total media 59 MB → 24 MB
   (20 MB of which is the hero video, flagged for compression).
6. Pruned superseded 1× sources, unused mirror-tiled fabric panels, and untrimmed logo originals.

---

## Bugs found and fixed during review

| # | Issue | Fix |
|---|---|---|
| 1 | Nav logo rendered as a 33×33 smudge — source PNG was a 1000×1000 canvas with the mark tiny and centred | Trimmed to a tight 829×266 crop; size by height, let width follow the 3.12 ratio |
| 2 | Category image swap never fired | An empty `gsap.timeline()` with a scrollTrigger doesn't reliably fire callbacks — replaced with `ScrollTrigger.create` + `onToggle` |
| 3 | Fabric section held ~360px of dead scroll after the track finished travelling | Removed the extra `innerHeight * 0.5` from the pin's `end` |
| 4 | Seven WCAG AA contrast failures (3.11–3.40:1 where 4.5:1 needed) — all from `--stone: #8A8078` on light grounds | Retuned to `#6B625A` (5.32:1 ivory, 4.89:1 linen); added `--stone-mid` for large-text de-emphasis |
| 5 | Inactive category headings at 1.79:1 — effectively unreadable | Switched to `--stone-mid` (3.11:1, clears the large-text threshold) |
| 6 | Reduced-motion desktop users couldn't reach fabric cards 4–6 — the pin providing the travel was skipped, with no scroll fallback at that width | Reduced-motion block now gives the track native snap-scroll on desktop too |
| 7 | Line-split headings concatenated words in the accessible name: "dressedin timelesselegance" | Explicit separator between line spans |
| 8 | `sizes` hints under-declared tile widths, so the optimiser fetched images too small for their slots | Per-tile-span `TILE_SIZES` map; corrected category and story hints |
| 9 | All content sat at `opacity: 0` pending JS — a bundle failure or disabled JS meant a blank page | Reveal start-states scoped to `html[data-js]` (set by an inline head script) + 3s failsafe; `initReveals` moved out of `requestAnimationFrame` |
| 10 | Nav tone/pin logic entirely rAF-gated, and offset maths would misread GSAP's pin spacers | Tone via a 1px IntersectionObserver band; pin/retract on a synchronous scroll listener (reads only `scrollY`, no layout) |
| 11 | Next.js 15.5.4 flagged with CVE-2025-66478 | Upgraded to 16.3.1 |
| 12 | Six font 404s per page load from `.woff` fallbacks | Dropped to `.woff2` only |

---

## Second pass — real-Chrome screenshot review

The in-app Browser pane never regained compositing, so verification was redone by driving the
**installed Chrome** via `playwright-core` (no Chromium download). Harnesses kept in `reference/`:
`shoot.mjs` (section + full-page captures at 1440 and 390), `diag.mjs` (reveal-state audit),
`navcheck.mjs` (nav tone + contrast at every section), `labels.mjs` (chapter numbering).

This caught four things measurement alone had missed:

| # | Issue | Fix |
|---|---|---|
| 13 | **Fabrics and story sections rendered as empty voids.** 106 of 109 elements had `data-inview="true"` yet `opacity: 0` — the progressive-enhancement refactor (#9) created a specificity regression: `html[data-js] [data-reveal]` at (0,2,1) outranked `[data-reveal][data-inview="true"]` at (0,2,0), so the hiding rule always won | Rewrote the block with start *and* end states both scoped under `html[data-js]`, and scoped the directional start-transforms too (without JS they'd have left content permanently offset). Comment in the CSS explains why the scoping is not redundant |
| 14 | Duplicate chapter numbering — collection grid and story both rendered "05", brands then off by one | Replaced hardcoded labels with a single ordered `SECTION_ORDER`/`SECTION_INDEX` in `content.ts`, so numbering derives from page order and can't drift |
| 15 | Hydration mismatch warning from the inline `data-js` script stamping `<html>` before React hydrates | `suppressHydrationWarning` on `<html>` |
| 16 | The desktop-scale e-Catalogue pill crowded the hamburger on mobile | Hidden below 1024px; e-Catalogue is already the third drawer item |

Confirmed after the fixes: `stillHidden: 0`, `stillClipped: 0`, chapter numbers 01–07 sequential
with no duplicates, nav contrast 16.58:1 at every section with correct logo-variant swapping, and
`hScroll=false` at both 1440 (page 17449px) and 390 (page 15118px).

Note on #13: the very first hero screenshot was taken *before* the #9 refactor, which is why the
hero looked correct while everything below it was silently blank. A measurement-only pass reported
`data-inview="true"` and read as healthy — only a rendered pixel caught it.

---

## Verification performed

- Production build clean; `tsc --noEmit` clean.
- Contrast audit over 20 text/background pairs — all pass AA after fix #4/#5.
- Semantic audit: 1 `<h1>`, ordered headings, `<main>`, skip link, 0 images without `alt`,
  0 empty links, 0 unlabelled buttons, 0 external links missing `noopener`.
- Mobile at 375px: body exactly 375px wide, horizontal scroll impossible, correct component
  swaps (drawer, stacked categories, snap-scroll fabric rail).
- Nav tone zones contiguous across the document, 0 uncovered scroll positions.
- Scroll choreography driven manually through the GSAP ticker: hero scale 1.07→1.00; fabric pin
  holds at 0 while track travels 0→−1007px against progress 0→1; categories swap 01→02→03.

All ten sections are now visually confirmed at 1440 and 390 via real Chrome — captures in
`reference/shots/`.

### Remaining caveat

Captures are static frames. The *feel* of the scroll-linked motion — the fabric rail's horizontal
pacing, the hero video drift, how the category swap reads in motion — can only be judged by
scrolling it live. Worth a pass before sign-off.

---

## Third pass — three art-directed compositions

Replaced Categories, The Edit and the Fabric rail with three distinct compositions
(client-confirmed placement). Dark chapters (hero, story, footer) retained; the three new
sections are warm-palette only.

**The blur was solved at source.** `reference/Brand Book.pdf` (67 MB) turned out to hold
print-resolution photography that no earlier pass had looked at. `pdfimages` pulled 152 images;
after filtering, 14 usable product/interior shots at 886–3277px — versus the 180–541px live-site
scrapes that had been causing the softness all along. `reference/build-assets.py` crops and
downsamples them, with an explicit UPSCALED guard so no asset is ever enlarged past its source.
Pages 2–4 of the same PDF also independently confirmed the palette and the Albra / Albra Grotesk
pairing already in `tokens.css`.

| # | Issue | Fix |
|---|---|---|
| 17 | Every image on the page was soft — all sources capped at 541px | Extracted 14 print-res images from the Brand Book PDF; new `public/media/product/` set, all downsampled only |
| 18 | First asset build silently upscaled two dominants (886→1600) | Reallocated sources by native resolution — dominants from the 1240–1350px files, thumbnails from the smaller ones |
| 19 | Composition navs duplicated the site header ("Collections / About / Contact") | Rescoped to what each composition shows: Upholstery / Curtains / Bed Sheets, and All / Living / Bedroom / Dining. Also restores the product taxonomy the replaced Categories section carried |
| 20 | Large dead band under each composition — the standard section rhythm assumed a section with its own internal spacing | `.sect--comp` with tighter `padding-block`; showroom rail narrowed from 150px to 118px |
| 21 | Pill labels collided with brand marks printed into the lower edge of some Brand Book photos | Added `.clabel--tl`; both hero labels now sit in the top corners |

Page height went 14,661px → 11,162px. Chapter numbers re-derive automatically from
`SECTION_ORDER`: 01 Philosophy → 02 Showroom → 03 The Edit → 04 Collections → 05 In the Room →
06 Our Story → 07 House Brands, no duplicates.

Verified: `stillHidden: 0`, `stillClipped: 0`, `hScroll=false` at 1440 and 390, build and
`tsc --noEmit` clean.

### Still unresolved

`COLLECTIONS` in `content.ts` (the 11 named collection shots — Alesia, Jodhpur, Antalya…) is no
longer rendered anywhere. The data is intact; those product names currently have no home on the
page.

---

## Fourth pass — replica parity, curvature, and the section redesigns

Ran a 44-agent audit workflow (three per-section auditors, one adversarial verifier
per claim, one synthesiser) against written transcriptions of the reference mockups.
**40 claims -> 10 confirmed**; the verify layer rejected 30, including two the audit
flagged that had already been fixed mid-run.

### Curvature — the thing that was actually missing

| # | Issue | Fix |
|---|---|---|
| 22 | Radii were hand-picked per element, so nesting read as stacked boxes rather than one carved object | Derived chain on `.comp`: `--r-outer` -> `--r-panel` (minus the container gap) -> `--r-img`. Every panel and frame now steps down from its parent |
| 23 | No concave/inverted corners anywhere — the detail carrying the references' premium feel | Two mask sites, one documented technique. Studio: radial-gradient mask on a **sibling ground layer** so the overhanging badge stays visible. Belong: mask directly on the panel, two corner cuts intersected, left corners squared first |
| 24 | The product panel stopped at a straight vertical edge; the reference **bulges out and cradles** the protruding thumbnails | `.product__thumbs::before` cradle in the same charcoal, reaching back under the panel padding (no seam) and out past its edge with an asymmetric right radius |
| 25 | `.comp { overflow: hidden }` clipped the studio badge | Rail `margin-bottom` clearance sized against the badge overhang plus its shadow blur |

### Watermarks — three compounding causes

| # | Issue | Fix |
|---|---|---|
| 26 | Brand marks printed into the bottom edge of Brand Book photos | `trim_bottom` in the asset pipeline, values **measured** by row-variance scan (bb-050/072 ~90%, bb-016 ~70%) rather than guessed |
| 27 | The variance detector missed marks on busy/floral sources (bb-045, bb-033, bb-037) | Trimmed those to match after visual confirmation |
| 28 | Trimming reduced usable height, silently reintroducing upscaling on three heroes | Target widths lowered to what each source actually provides; all three coll heroes share one width so the cross-fade stays consistent |
| 29 | **Watermarks persisted through cache clears, server restarts and verified-clean files.** `curl` returned clean bytes; the browser rendered marked ones | Next's image optimizer was serving stale output keyed by source *path*, not content. These assets are pre-cropped, pre-sized WebP, so the optimizer added nothing but a staleness surface — marked `unoptimized` on all 13 product `<Image>` tags. Diagnosed by dumping srcset candidates, hit-testing the pixel, and probing with images removed |
| 30 | `bb-037` is a printed advertisement (headline + collection name baked in), used as the Our Story hero | Replaced with a purpose-built landscape crop from the only natively landscape source (bb-000, 3277x1873) |

### Section redesigns

Removed the **By Room** selector — it duplicated the Collections editorial. Rebuilt
In the Room, Our Story, House Brands, the CTA and the footer from the supplied
wireframes: philosophy row over a staggered card slider; heading + oversized image
over a 4x2 grid mixing photography with text tiles; a restrained brand row; an
image-left/copy-right "letter" card on the dark ground; and a footer that regained
three real information columns beneath a two-tone wordmark.

**Two-tone headings** are palette-derived, not raw pastels: on light grounds Dusty
Peach is unusable as text (1.39:1 on ivory), so `--ink-2` is the same hue taken down
to `#7E5F4D` — 5.10:1 on warm ivory, 4.66:1 on linen, clearing AA for body copy and
not just headings. On dark grounds Dusty Peach is used directly at 11.9:1.

| # | Issue | Fix |
|---|---|---|
| 31 | Chapter numbering skipped 04 once In the Room switched to a display label | Removed it from `SECTION_ORDER`; numbering re-derives 01-05 |
| 32 | Footer column links rendered as one run-on string | `.foot__col` styles had been dropped when the footer became a poster; restored with `display: block` on the links |
| 33 | Collections slider showed all eleven cards compressed to ~100px and never scrolled | `grid-auto-columns: minmax(0, …)` let the columns shrink to fit. Switched to a flex track with `flex: 0 0` so width is pinned and the overflow is real |

Verified after: 73 reveals with 0 hidden and 0 clipped, chapters 01-05 with no
duplicates, no horizontal scroll at 1440 or 390, slider scroll width 4913 against a
1319 viewport across 11 cards, build and `tsc --noEmit` clean. Page height is now
8795px, down from 17449px at the first pass.

---

## Fifth pass — marquee scale, index removal, pinned carousel

| # | Change | Detail |
|---|---|---|
| 34 | Marquee was competing with the section headings | 49px display type in a ~118px band -> 21.6px in a 60px band; item gaps and star spacing tightened to match |
| 35 | Collection index removed from the Collections editorial | The `SEASON'S COLLECTIONS - 11` list and its hover preview are gone. Dead code cleaned up too: 22 `.cindex` rules, their responsive overrides, and the `collectionIndex` content object. The eleven names are not lost - they are the source for the In-the-Room slider |
| 36 | A cleanup regex left a dangling `.cindex__list,` selector | Broke the Turbopack CSS parse; caught on the build, fixed |
| 37 | **In-the-Room carousel now pins** | ScrollTrigger pins the section and scrubs `track.scrollLeft` from page scroll, so the next section is unreachable until the last card has passed |

### Pin implementation notes

- Pin duration is set to exactly the track's overflow (`end: +=distance()`), which makes
  page scroll and track scroll 1:1. The arrow buttons exploit that: while pinned they call
  `window.scrollBy` instead of `el.scrollBy`, so the buttons and the scrub never disagree.
- `scroll-snap-type` fights programmatic `scrollLeft`, so it is set to `none` on pin enter
  and restored on release (verified switching correctly at both ends).
- Desktop only, behind `gsap.matchMedia("(min-width: 1025px)")`. Pinning a viewport-height
  section on a phone traps the scroll, so mobile keeps native swipe + snap.
- Skipped entirely under `prefers-reduced-motion`, falling back to native scrolling.

Measured with `reference/pincheck.mjs`: track overflow 3594px; the section held at
`top: 0` for 11/11 samples across that range; `scrollLeft` advanced monotonically 1:1
(359px of page = 359px of track); reached 3594/3594 exactly at release. Mobile confirmed
NOT pinned - section scrolls away normally, snap still active, track still swipeable.

---

## Sixth pass — 01-Collections rebuilt off measured reference geometry

Scope was **only** the 01-Collections (`.statement` / `.belong`) section; Product, Studio and
everything else were deliberately left untouched (verified by grepping the diff).

**The mistake worth recording.** A first attempt read the mockup by eye, concluded its panel
edge was an organic full-height curve, and carved one with an SVG mask. Tracing the actual
pixels killed that: the panel's left edge sits at x=311 for *every* row sampled between
y=300 and y=492, and its top edge at y=122 — a plain straight-edged rectangle. The curve was
removed. All the geometric interest is in the thumbnail row, which is the only thing that
interrupts that edge.

Geometry traced from `reference/WhatsApp Image 2026-08-20 at 1.05.20 PM.jpeg` (card
562x399px), then applied as ratios:

| | Reference | Built |
|---|---|---|
| Seam (panel left edge) | 39.9% of width | 40.7% |
| Thumb-row breakout ends | 59.3% | 59.3% |
| Breakout band top | 10.3% of height | ~9.0% |
| Thumb aspect | 1:1 (109x112px) | 1.000 |

What changed:
- Left column narrowed to `1fr 1.5fr` so the seam lands at ~40%.
- `.belong__previews` is now **wider than its own column** — it spans the column, crosses the
  gutter and punches `--reach` into the dark panel, backed by an ivory cradle (`::before`) so
  it reads as the light column bulging out rather than thumbnails floating on the photo.
- `::after` draws the two **concave fillets** where the cradle rejoins the panel's straight
  edge, parked exactly on the seam via `calc(100% - var(--reach))`.
- Thumbs squared to 1:1; rail moved to 48% to clear the cradle.
- Shop pill moved flush into the panel's top-right corner with an ivory channel around its
  left and bottom, plus the same two fillets — the client asked for "that cut" there too.

Four CSS traps hit and documented inline (also in `memory.md`):
1. `circle closest-side at <corner>` resolves to **radius 0** — the centre sits on two sides —
   so the tile floods with the end colour and renders a blocky step. Needs `farthest-side`.
2. Stop order decides which side of the arc gets rounded. Ivory must take *tile minus disc*
   so the DARK corner is the one rounded off; inverting it leaves a dark spur in the corner.
3. A negative-`z-index` pseudo-element still paints **above its own parent's background**, so
   a `::before` channel covered the pill instead of ringing it.
4. A `box-shadow` ring follows the element's *own* radius, so ringing a pill produced a
   pill-shaped channel that curved away near its ends and left dark slivers against the
   straight panel edges — the client circled all three in red. Fixed by wrapping the pill:
   `.belong__shopwrap` is the channel (padding on the two inset sides only, radius on the one
   exposed corner), giving the rounded *rect* the reference actually has. `--fillet` was also
   dropped below `--panel-r`, since the ~70px strip of panel edge above the cradle left no
   straight run between the two arcs and read as a floating lozenge.

Also: a decorative `clip-path` cannot be used on anything carrying `.reveal-img` —
`ImageReveal` animates `clip-path` and wins on specificity once the reveal completes.

Verified with `reference/shoot.mjs` (real Chrome) plus `getBoundingClientRect` ratio
measurement; the in-app Browser pane was not compositing this session. Composition still
fits one viewport; mobile stacks with cradle and fillets switched off, no horizontal scroll.
`tsc --noEmit` clean.

---

## Our Journey — horizontal rail scroll (about page)

Two measured faults, not a feel problem.

**1. Travel distance was a guess.** `scrollWidth - innerWidth * 0.9` overshot by 84px, so
the rail parked with 144px of ragged dead space to the right of the closing card instead of
resting on the gutter. Replaced with `scrollWidth - innerWidth + gutter`, reading the gutter
off the track's own computed `padding-left` rather than hardcoding the clamp.

**2. The pin was 2.2x longer than the travel.** `distance * 1.6 + innerHeight * 0.5` gave
1724px of scroll for 796px of motion — a 0.46 ratio, so the page held still while the rail
crawled. The original comment claimed the stretch made it glide; it does the opposite, by
decoupling the rail from the wheel. Now `distance + innerHeight * 0.35`, with the extra
mapped as a genuine hold (`progress / travelShare`, clamped) rather than a slower ramp —
so the travel runs 1:1 and the closing line gets a beat before unpin. `scrub` 1.2 -> 0.6;
1.2s of catch-up read as mush.

Verified in real Chrome at 1440x900: ratio 1.00 across the travel, `lastRight` lands on
1380 = `innerWidth - gutter` exactly, then holds through the last quarter. No overflow at
1440 or 390, mobile keeps `transform: none` (the sub-900px vertical fallback), no gap at
the section join, `next build` passes.

The 3 console 404s are pre-existing and site-wide — the Avant Garde `.woff2` files, already
listed under Outstanding.

---

## Our Journey — the timeline thread

The line was short and its progress ran backwards. Two separate faults.

**1. The path was sized to the wrong box.** `Threadline` measured its parent with
`offsetWidth`. For a horizontal rail the children overflow the parent: the journey track's
padding box is 1440 while its content spans 2092. So the path was built 1440 long and simply
stopped in mid-air ~650px short of the end — the last two stops sat past the end of the line,
and the final node landed at `t=0.99` because the lead-out had nowhere left to run, so it
never popped until the very last frame. Now `max(offsetWidth, scrollWidth)`.
Path length measured 2092 after the fix, exactly the track's `scrollWidth`.

**2. Two ScrollTriggers were writing the same `--p`.** The rail's pin (7956->8983) and
Threadline's own trigger (7370->8219) both wrote `--p` on `.journey__track`, and their ranges
overlap. They do not average, they alternate — `--p` measured
`0 -> 0.93 -> 0.58 -> 0.86 -> 1` across the scroll, so the line drew, retracted, and drew
again. A self trigger is meaningless inside a pin regardless: once the section pins, the
element is frozen in the viewport and its own progress stops measuring anything.

Added an `externalDrive` prop — a media query under which an outside trigger owns `--p`, so
Threadline skips creating its own. The journey passes `(min-width: 900px)`, matching the pin's
own `matchMedia`, and the listener re-evaluates on change so a resize across the breakpoint
never leaves the line with no driver.

Verified at 1440x900: one trigger on the section, `--p` monotonic 0->1, drawn tip advancing
0 -> 2092px, nodes popping in order (`[1,0,0,0]` -> `[1,1,0,0]` -> `[1,1,1,0.41]` ->
`[1,1,1,1]`). At 390px the self trigger still runs (9 distinct `--p` values across the
scroll, ends at 1, no overflow). Under reduced motion `--p` holds at 1 and the line renders
complete and static. No console errors, `tsc --noEmit` and `next build` clean.

---

## Our Journey — line over the year headings, and the cropped photographs

**The line over the text could not be reproduced here, and that is the finding.** Swept 10
viewport sizes x 3 zoom levels: clearance measured 21–32px, never an overlap. The cause is
that `public/fonts/` is missing, so this machine renders a fallback face while the client has
the real AvantGarde installed. `.journey__year` uses `line-height: 1`, where ink overflows the
line box by an amount that depends entirely on the font's ascent — so their digits rise into
the line and are struck through, and the measurement here stays clean.

`.thread` is `z-index: 2` on the track and `.journey__stop` had no z-index, so the line painted
over the headings. Fixed on both axes rather than picking one: `.journey__stop { z-index: 3 }`
so text wins on paint order whatever the metrics, and the padding band widened
(`clamp(1.6rem, 3vw, 2.4rem)` -> `clamp(2.3rem, 3.8vw, 3.1rem)`) so the line is not near the
ink at all. Clearance 32px -> 44px.

**The photographs.** Sources are portrait (267x388, AR 0.69) and `.journey__shot` was a 350x168
box (AR 2.08), so `object-fit: cover` was discarding two thirds of each one. Two faults:
the global `border-box` subtracted the 20.8px `padding-top` from the declared height (a 189px
box rendered a 168px picture), and the height itself was too small. Now `box-sizing:
content-box`, and the height derived from the space left over rather than a flat `vh`
fraction — everything else in the pinned section is ~535px tall at every width, so
`clamp(150px, calc(100svh - 545px), 330px)`. At 1440x900 the picture went 350x168 -> 350x330,
visible fraction 0.33 -> 0.65.

The first attempt used a flat `29svh`, which grew the section to 741px on a 720-tall window —
a pinned section past the viewport clips its own bottom. The leftover-space formula fits at
1280x720, 1366x768, 1440x900, 1920x1080 and 2560x1440. At heights <=650px the section still
cannot fit (689px); it could not before this change either and the copy alone sets that floor.

Verified: no overflow at 1440 or 390, 0 broken images, no image clipped inside its frame,
reduced motion clean, no console errors beyond the 3 known font 404s, `next build` passes.

---

## Our Journey — rebuilt as a real progress rail

**The root cause of the line-through-the-headings, found at last, and it was mine.**
`globals.css` has a global `svg { max-width: 100% }` reset. The scrollWidth fix earlier had
widened the thread's svg to 2092 against a 1440 padding box, so that reset clamped it — and
because the svg keeps its viewBox aspect, `preserveAspectRatio` scaled the whole drawing to
69% and centred it **89px DOWN**, landing the rail on the year headings. Nothing about the
path data was ever wrong. Fixed with `max-width: none` on `.thread svg`.

**Why the earlier sweep said "no overlap" when the client could see one.** It measured
`svgTop + path.getBBox().y`. `getBBox()` returns USER-SPACE coordinates and knows nothing
about the scaling `preserveAspectRatio` applied, so it reported the rail at y=230 while it
rendered at 317. Mixing a user-space measurement with a screen-space origin produced a
confident, repeatable, wrong answer across 30 size/zoom combinations. **Measure SVG with
`getBoundingClientRect()` on the rendered element, never `getBBox()` plus a screen offset.**

**The rail itself.** It had a progress line and no base line, so there was nothing ahead of
the progress and it never read as a track. Now:

- `.thread__base` — the full path underneath at 0.22 opacity, so the distance still to go is
  visible. This was the substance of "the progress rail is not proper".
- Three step states, all computed from the same `--p` the line is drawn from, so markers
  cannot drift out of step with the rail: `--s` (this step's completion) and `--a` (whether it
  is the step currently reached). `--a` needs the NEXT step's threshold, so Threadline now
  stamps `--tn` — active is a comparison between neighbours, not something a step knows alone.
- Idle steps wait on the rail as small dim rings; the active one carries a halo; completed
  ones fill and draw a tick on, via the same dash technique as the rail.

**Responsive.** Threadline now detects a COLUMN from its own anchors (x-spread vs y-spread)
rather than from a media query, and moves the rail into a left gutter with `railInset`. A
centred rail runs straight down the middle of stacked copy, which is what it had been doing
on mobile all along. `.journey__stop` reserves 2.6rem for it when stacked.

Verified rect-based at 1440x900, 1280x720, 390x844 and under reduced motion: **0 text
collisions**, base rail present, 4 steps and 4 checks, horizontal on desktop and vertical when
stacked, no overflow, 0 broken images, no console errors beyond the 3 known font 404s,
`tsc --noEmit` and `next build` clean.

---

## Drop The Edit from the homepage

The Edit composition and Collections did the same job — a pill nav over a thumbnail row and
one dominant image, both driven by the same catalogue data — so the page made the same
argument twice. `HomePage` carried a `variant` prop and two noindex preview routes built
solely so the two could be compared before one was dropped. That call is now made:
Collections keeps the slot, and the scaffolding goes with it.

Removed: the `EditorialShowcase` render, the `HomeVariant` type and the `variant` branching,
and `app/preview/collections` + `app/preview/edit`. The `EditorialShowcase` component itself
is left in `Compositions.tsx` rather than deleted, so restoring it is a one-line change.

Numbering needed no edit — the eyebrows are numbered by POSITION from HomePage's `order`
array, not a fixed map, so the rest renumbered themselves. Verified in the rendered page:
`01 — House Brands, 02 — Collections, 03 — Showroom, 04 — Our Story`, with no gap in the
section rhythm where it used to sit.

Also fixed while in here: `STATEMENT.nav`, `FOOTER_LINKS.explore` and both `PRODUCT.nav`
blocks in `lib/replicas.ts` still pointed at `/about.php` and `/ecatalogue.php`. Those were
missed when the nav was repointed at the new Next routes, and they 404 inside the app. No
`.php` href remains except the client's real pages that have not been rebuilt —
store-locator, contact, privacy-policy and the five brand pages.

Note: the Films section still labels itself "The Edit". That is its own name, not a leftover
of the removed composition, so it was left alone — but it does mean the phrase still appears
once on the page.

Verified at 1440 and 390: no overflow, 0 broken images, no console errors beyond the 3 known
font 404s, no 4xx responses, `next build` clean on a wiped `.next`.

---

## Outstanding for the client

1. **Drop Albra `.woff2` files into `public/fonts/`** — six exact filenames listed in README.
   No code change needed.
2. **Photography** — largely resolved from the Brand Book extracts (886–3277px). Remaining gap:
   only ~8 distinct product scenes exist, so images repeat across sections. More shots would let
   each composition hold its own imagery.
3. **Compress the hero video** — still outstanding. The Drive link supplied
   (`1JSdz-MEZMOYHU2RvJk7b6gq5_JAeZ2-N`) is **byte-identical to the original**: same MD5
   `9185b3e06ec27f54d75b5808f358b561`, same 19,933,242 bytes. No compression was applied, so
   nothing was swapped in. `ffmpeg` recipe and poster-frame step are in the README.
