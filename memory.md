# Project Memory — Sarom

Knowledge base for this project: decisions, constraints, and answers to things
that will come up again. `BUILD_LOG.md` is the chronological history of what
was built and fixed; this file is the reference for *why* and *how it works*.

**Scope has grown past the homepage.** Three routes now: `/` (homepage),
`/ecatalogue` (all 204 catalogues, filterable), `/about` (7-section editorial
page). `PRODUCT.md` holds the positioning brief. Nav no longer carries "Brands".

---

## Stack & structure

- Next.js 16.3.1, React 19.1.1, TypeScript strict, GSAP 3.13 (ScrollTrigger).
- All copy/links/product data: `lib/content.ts`, `lib/replicas.ts`. Edit there, not in components.
- CSS split by concern: `tokens.css` (design system) → `components.css` (chrome) →
  `sections.css` / `compositions.css` / `collections.css` / `replicas.css` / `editorial.css`
  (per-section) → `responsive.css` (breakpoints last, wins the cascade).
- Motion engine: `lib/motion.ts` + `components/Motion.tsx` (`Reveal`, `LineReveal`,
  `ImageReveal`, `Marquee`). ScrollTrigger only toggles `data-inview`; CSS owns transitions.
- Real photography: extracted from `reference/Brand Book.pdf` via `pdfimages` (152 images,
  886–3277px). Live-site scrapes topped out at 541px and were the original blur cause.
  Pipeline: `reference/build-assets.py` → `public/media/product/`.
- **Per-page files.** `/ecatalogue`: `components/CatalogueWall.tsx` + `lib/catalogues.ts` +
  `app/catalogue.css`. `/about`: `components/AboutPage.tsx` + `lib/about.ts` +
  `app/about.css`. Shared: `components/Threadline.tsx` (draw-on-scroll SVG line),
  `components/useTileWipe.ts` (the Slider-Revolution-style clip-path wipe, now used by
  Showroom, Collections and The Edit alike).
- **Motion idiom, used everywhere now:** GSAP writes exactly ONE custom property per frame
  (`--p`, `--pos`, `--x`, `--ap`); CSS computes every consequence from it. A five-item
  carousel costs one style write per frame regardless of item count. CSS trig
  (`sin()`, `cos()`, `atan2()`, `hypot()`) does the geometry — see the Why Sarom orbit.

## Brand constraints

- **Palette**: Dusty Peach `#E5C8B9`, Soft Sage `#B9C8B3`, Powder Blue `#B8D5DE`, Warm Ivory
  `#F5F0E8`, Muted Lavender `#C9C3D1`, Light Blue `#D2E8FF`. Foundation is warm ivory/linen/
  charcoal `#14110F` — pastels are accents, never the ground.
- **Accent rotation**: each section sets `--accent` once (in `tokens.css`, bottom block);
  hovers/rings/fills read from it. One-line change to re-theme a section. Current assignment:
  Collections→Powder Blue, Showroom→Light Blue, The Edit→Dusty Peach, In the Room→Soft Sage,
  Our Story→Muted Lavender, House Brands→Powder Blue, CTA→Dusty Peach, Footer→Lavender.
- **Two-tone headings**: `.tt em` — NOT raw Dusty Peach as text (1.39:1 on ivory, fails AA).
  `--ink-2: #7E5F4D` is the same hue darkened — 5.10:1 on ivory, 4.66:1 on linen. On dark
  grounds `--ink-2-dark` uses Dusty Peach directly (11.9:1, fine there).
- **Typography — SUPERSEDED, read this not the older notes.** The typeface is now
  **AvantGarde BT** for both display and body (`--font-display` / `--font-body`,
  `tokens.css:116`), fallback chain Century Gothic → Questrial → Futura. Albra is no longer
  used anywhere. The same `local()`-first pattern applies: three `@font-face` blocks list
  many `local()` aliases (`AvantGarde Bk BT`, `ITC Avant Garde Gothic Book`, …) so the real
  face renders if installed on the *viewer's* machine.
  **`public/fonts/` does not exist**, so `AvantGardeBkBT-Book.woff2`,
  `AvantGardeBkBT-BookOblique.woff2` and `AvantGardeMdBT-Medium.woff2` 404 on every page
  including the live homepage. Harmless (the fallback chain covers it) but it means every
  console check shows 3 pre-existing 404s — don't chase them as a new bug. Resolves the
  moment the client supplies those three `.woff2` files.

## Known gotchas (don't rediscover these)

- **Next image optimizer serves stale bytes keyed by path, not content.** Survives cache
  clears and server restarts. Fix: pre-cropped/pre-sized product assets carry `unoptimized`
  on the `<Image>` tag (13 tags in Compositions.tsx/Sections.tsx). If a "fixed" image still
  looks wrong after a rebuild, check for a missing `unoptimized` flag before anything else.
- **CSS cascade order bugs are easy to introduce when inserting a block mid-file** — a
  `@media` override placed *before* the base rule it's meant to override gets silently beaten
  by the base rule later in the file. Always insert overrides after their base declaration.
- **Radii must derive, not be hand-picked.** `--r-outer → --r-panel → --r-img` chain on `.comp`
  in `compositions.css`. This is what makes nesting read as one carved object instead of
  stacked boxes — the detail that was missing before the "replica parity" pass.
- **Concave/inverted corners**: live implementation is `.belong__previews::after` — two
  corner-anchored radial gradients filleting the join where the thumb-row cradle meets the
  panel's straight edge. Two traps: (1) `circle closest-side at <corner>` resolves to
  **radius 0** (the centre sits ON two sides), flooding the tile with the end colour and
  rendering a blocky step — use `farthest-side`. (2) Stop order decides which side gets
  rounded: ivory must take *tile MINUS disc* (`transparent 99%, ivory 100%`) so the DARK
  corner is rounded off; inverting it leaves a dark spur stabbing into the corner.
- **Don't put a decorative `clip-path` on anything carrying `.reveal-img`** — `ImageReveal`
  animates `clip-path` and `html[data-js] .reveal-img[data-inview="true"]` wins on
  specificity, silently erasing it once the reveal completes. Use `mask-image` instead.
- **Measure the reference, don't eyeball it.** The 01-Collections mockup *looks* like it has
  a curved/organic seam; tracing it (PIL, ivory-luminance test) showed the panel's left edge
  at x=311 for every row 300–492 and its top at y=122 — dead straight. A whole pass was
  built on the wrong premise before measuring. Also: a brown/photographic panel defeats
  naive `r>g>b` colour classing (washed highlights read as neither brown nor ivory) — test
  for the ivory *ground* instead, it's far more separable.
- **A negative-`z-index` pseudo-element still paints ABOVE its own parent's background.**
  Painting order inside a stacking context puts negative-z children after the context
  element's own background. So `.pill::before { z-index: -1 }` cannot be used to ring a
  pill — it covers it. Use a spread `box-shadow`, or a wrapper element that *is* the ring.
- **A `box-shadow` ring follows the element's own `border-radius`.** Ringing a pill-shaped
  button therefore produces a pill-shaped channel that curves away near its rounded ends,
  leaving dark slivers where it should meet a straight panel edge. When the channel must be
  a rounded *rect* (as in the reference), wrap the element and style the wrapper instead —
  `.belong__shopwrap` is that pattern: `padding` on the two inset sides only, background =
  ground colour, radius on the single exposed corner.
- **Keep `--fillet` smaller than the corner radius it sits next to.** The panel-edge strip
  above the thumb cradle is only ~70px; a fillet larger than `--panel-r` leaves no straight
  edge between the two arcs and the corner reads as a floating lozenge.

- **`.sect` padding-block is declared in `globals.css`'s own body, AFTER every `@import`.**
  So a single-class override in an imported partial (`.house`, `.journey`) ties on
  specificity and loses on source order. Fix is two classes: `.sect.house`,
  `.sect.wall__body`, `.sect.journey`. This has bitten three separate sections.
- **The reveal engine owns `transform` AND the whole `transition` shorthand** on any
  `[data-reveal]` element. `html[data-js] [data-reveal][data-inview="true"]` is (0,3,1), and
  `[data-reveal]` re-declares `transition` wholesale. So hover motion on a reveal element is
  silently dead — put it on a non-reveal child, or use the independent `scale` property.
- **One writer per custom property.** Two ScrollTriggers writing the same `--var` on the same
  element do not average or cleanly last-write-win — they *alternate*, and the value goes
  non-monotonic. On the journey rail the pin (7956→8983) and `Threadline`'s own trigger
  (7370→8219) both wrote `--p`; it measured `0 → 0.93 → 0.58 → 0.86 → 1` and the line drew,
  retracted, drew again. Grep for other writers before adding a scroll-driven component.
- **A self-driven ScrollTrigger is meaningless inside a pin.** Once the section pins, the
  element is frozen in the viewport, so its own start/end progress stops measuring anything.
  The outer pin must own the progress and the inner component accept it — that is what
  `Threadline`'s `externalDrive` prop (a media query) exists for.
- **`offsetWidth` is the wrong measure for a horizontally overflowing rail.** The journey
  track's padding box is 1440 while its content spans 2092; sizing the SVG to `offsetWidth`
  built a path that stopped 650px short, in mid-air. Use `scrollWidth`.
- **Inline custom properties beat stylesheet ones — watch for name collisions.** `--ang` was
  used for the Why Sarom orbit angle in CSS while the component already set `--ang` inline
  per item for its thread direction, so every item stayed pinned to a fixed arc and the ring
  never turned. Renamed to `--orbit`. Symptom of the class: motion that looks static.
- **A local default shadows an inherited value.** `--p: 0` on `.thread` froze every node at
  scale 0 while the line drew fine, because `--p` is published on the *parent* so anchored
  content can read it too. Don't re-declare a variable you intend to inherit.
- **Measure reveal targets with `offsetTop`/`offsetLeft`, not `getBoundingClientRect()`.** The
  reveal engine holds `dir="up"` elements translated 70px down until they enter view, so a
  rect-based measurement threads geometry through where cards *start*, not where they settle
  (measured 158 pre-reveal vs 88 after). `Threadline.layoutBox()` walks `offsetParent` for
  exactly this reason.
- **Pin length should track the travel distance, near 1:1.** Stretching a pin to "smooth"
  horizontal motion does the opposite: it decouples the rail from the wheel, so the page holds
  still while content crawls. The journey rail ran at a 0.46 ratio and read as broken. If a
  settle at the end is wanted, add dead scroll and *clamp* the mapping (`progress /
  travelShare`) so it becomes a genuine hold, not a slower ramp. Keep `scrub` ≤ ~0.8; 1.2
  reads as mush.
- **Vertical padding in `vh` shrinks exactly where more is needed.** The journey heading slid
  under the fixed nav on short (700–760px) windows because its padding was `vh`-based. Raise
  the clamp *minimum*, don't scale the whole thing.
- **A JSX comment cannot sit directly inside an arrow-function return** before the element
  (`WHY.map((w,i) => ( {/* … */} <div/> ))`) — it is a parse error. Put it above the `.map`.
- **`text-wrap: nowrap` must be scoped to a breakpoint.** Unscoped, a 27-char hero line pushed
  a 390px screen into horizontal overflow.
- **Equal-height cards in a row need `margin-top: auto` on the trailing element**, not fixed
  padding — journey bodies run 2–4 lines and the images were 51px out of register. Make the
  card a flex column and push the image down.

- **A decorative overlay above the content will strike through text, and you may not be able
  to reproduce it.** `.thread` sits at `z-index: 2` on `.journey__track` while `.journey__stop`
  had no z-index, so the timeline line painted OVER the year headings. `.journey__year` uses
  `line-height: 1`, and on a display face the ink routinely overflows its line box — so on a
  machine with the real AvantGarde installed the digits rose into the line and were struck
  through, while every measurement here came back clear (21–32px) because `public/fonts/` is
  missing and headless Chrome fell back to a substitute with different ascent. **A clean
  measurement on the fallback font does not prove the client sees the same thing.** Fixed on
  both axes: `.journey__stop { z-index: 3 }` so text wins on paint order regardless of
  metrics, and the padding band widened so the line is not near the ink at all (32px → 44px).
- **`box-sizing: border-box` is global, so padding is subtracted from a fixed `height`.**
  `.journey__shot` declared `height: 189px; padding-top: 20.8px` and rendered a 168px picture.
  Use `box-sizing: content-box` where `height` is meant to be the picture itself.
- **Size a pinned section's flexible element from the space left over, not a bare `vh`
  fraction.** Everything other than the photograph in the journey section is ~535px tall at
  every width, so `height: clamp(150px, calc(100svh - 545px), 330px)` fits at every viewport
  height. A flat `29svh` grew the section to 741px on a 720-tall window and broke the pin's
  fit. **A pinned section that exceeds the viewport silently clips its own bottom.**
- **Check `object-fit: cover` against the SOURCE aspect ratio, not just the box.** The journey
  photographs are portrait (267x388, AR 0.69) and were being poured into a 350x168 box
  (AR 2.08) — `cover` was discarding two thirds of every image. Now 350x330 at 1440x900, 65%
  visible. A horizontal rail always crops portrait sources; the job is to make it gentle.
  Known limit: at viewport heights ≤650px the section still cannot fit (689px) — it could not
  before either, this is not a regression, and the copy alone sets that floor.

- **The global `svg { max-width: 100% }` reset silently rescales any svg wider than its
  parent.** A svg keeps its viewBox aspect, so clamping the width makes `preserveAspectRatio`
  shrink the whole drawing AND centre it vertically. The journey thread (2092 wide in a 1440
  box) rendered at 69% and 89px lower than its coordinates said — which is what put the rail
  through the year headings. Any Threadline on an overflowing rail needs `max-width: none`.
- **Never measure SVG with `getBBox()` plus a screen-space offset.** `getBBox()` is user-space
  and ignores `preserveAspectRatio` scaling, so `svgTop + bbox.y` reported the rail at y=230
  while it painted at 317. That flawed probe returned "no overlap" across 30 viewport/zoom
  combinations while the client was looking at the overlap. Use
  `getBoundingClientRect()` on the rendered element. **A confident measurement built on the
  wrong coordinate space is worse than no measurement — it argues against the client.**
- **A progress rail needs a BASE line, not just a progress line.** Without the full track
  drawn underneath there is nothing ahead of the progress, so it reads as a stray mark rather
  than a track being filled. `.thread__base` at 0.22 opacity.
- **"Active" is a comparison between neighbours.** A step cannot know it is the current one
  from its own threshold — it needs the NEXT step's too (`--tn`), so active is
  "reached, and the one after is not".
- **Detect a stacked layout from the anchors, not a media query.** Threadline compares x-spread
  against y-spread; if the anchors form a column it rails down the left gutter instead of
  through the centre of the copy. Follows whatever the layout actually did, at any breakpoint.

- **Match the mechanic to the content, not to the reference site.** Why Sarom orbited one of
  five reasons into view and ghosted the rest; the client rejected it repeatedly. The
  reference it copied (pear.no) carries a question with a long answer per item, which is what
  earns a scroll-jack. Five one-line claims want to be COMPARED — hiding four of five fights
  the copy. Rebuilt as a numbered 01-05 index, all legible at once. **When a section is
  rejected several times, stop tuning and re-examine the mechanic.**
- **Measure contrast over photographs, don't assume it.** Hide the text, screenshot the true
  background, take the 95th-percentile luminance under each text box and composite the
  foreground at its own alpha. Why Sarom's inactive row bodies measured 3.27:1 over a bright
  patch — well below AA — while looking fine at a glance. Fixed to a worst case of 6.93:1.
- **Scrims: prefer one linear gradient to a linear plus a radial.** The two stacked took the
  photograph to near-black AND painted a visible disc across the middle of the section.
- **Anchor a fade-out to the section LEAVING.** `bottom 78%` fires very early on a section
  only ~1.2 viewports tall — its bottom enters the viewport long before the reader is done.
  `bottom 40%` -> `bottom 2%` holds the section at full opacity across its readable span.
- **`ch` in a grid template resolves against the GRID's font, not the child's.** `minmax(0,
  22ch)` for a column of display-type titles came out ~176px against titles needing 300+, so
  three of five wrapped. Size such columns in px/vw.

## Reference mockups — which file drives which section

The client's mockups are unlabelled WhatsApp screenshots in `reference/`. Mapping:

- `WhatsApp Image 2026-08-20 at 1.05.20 PM.jpeg` — the **"Furniture, Made to Belong"** tablet
  mockup. This is the reference for **01 — Collections** (`.statement` / `.belong`).
  Card measures 562x399px inside that JPEG; card origin (88, 115).
- `WhatsApp Image 2026-08-20 at 1.05.20 PM (1).jpeg` — the **LUMORA** dark mockup. Reference
  for **03 — Studio** (`.studio`).
- `WhatsApp Image 2026-08-20 at 1.44.59 PM.jpeg` — long scroll of "Objects That Shape
  Everyday Living" / "A Letter Worth Keeping" / LOMORA footer. Drives the lower editorial
  sections.
- `(2).jpeg` and `1.45.00 PM.jpeg` — further frames of the same set.

### 01 — Collections: the measured geometry (as built)

Ratios of the card box, all traced not guessed. Scale factor from mockup px to the 1440
build is **2.29**.

| | Reference | Built |
|---|---|---|
| Seam (panel left edge) | 39.9% of width, **straight** | 40.7% |
| Thumb-row breakout ends | 59.3% | 59.3% |
| Breakout band | 10.3%–41.9% of height | ~9.0%–45.4% |
| Thumb aspect | 1:1 (109x112px) | 1.000 |

The panel is a **plain rounded rect**. The only thing interrupting its straight left edge is
the thumbnail row, which is deliberately *wider than its own grid column*: it spans the
column, crosses the gutter and punches `--reach` into the panel, backed by an ivory cradle
(`::before`) so it reads as the light column bulging out. `::after` draws the two concave
fillets, parked on the seam via `calc(100% - var(--reach))`. The shop pill is flush in the
panel's top-right corner with an ivory channel on its left and bottom only.

Geometry vars live on `.belong` (`--col-gap`, `--left-pad`, `--reach`, `--cradle-pad`,
`--panel-r`, `--cradle-r`, `--fillet`, `--thumb-r`) so the cradle can compute where the seam
falls. Breakout + cradle + fillets all switch off below 1024px.

**Note:** the build's comp is proportionally wider than the mockup card (1.73 vs 1.41), so
width ratios and height ratios cannot both match. Width was matched; the cradle therefore
runs ~3.5pp taller than the reference. That is expected, not a bug.
- **GSAP pin engaging on the wrong trigger**: pin the specific element that should hold still
  (e.g. `.edit3__viewport`, the card row), not the whole section — otherwise headings/copy get
  dragged along and can't scroll away first.
- **Playwright/Chrome verification**: the in-app Browser pane's compositing is unreliable in
  this environment. `reference/shoot.mjs`, `diag.mjs`, `pincheck.mjs`, `labels.mjs` drive the
  installed Chrome via `playwright-core` instead — more reliable for pixel-level checks.

## Content facts (real, from live site — don't invent)

- 11 collections: Alesia (Bouclé), Addis (Chenille), Antalya (Velvet), Aston (Leather),
  Bikaner (Jacquard), Charcoal (Textured), Cortina (Chenille), Coventry (Bouclé), Gizel
  (Velvet), Jodhpur (Jacquard), Wooly (Knitted).
- 5 house brands: SJ, Oofy, Matlin, Smart Plus, Beds & More.
- Contact: Sarom Fab Pvt. Ltd., 2nd Floor, Kerom, Plot No A/112, Wagle Industrial Estate,
  Thane West – 400604. customercare@sarom.info, +91-8657944323.
- Performance tags (from live site): Water Repellent, Child Friendly, Party Friendly, Pet
  Friendly, Durable, Easy Clean, Stain Friendly, Fire Retardant.
- **204 catalogues** drive `/ecatalogue`, in `lib/catalogues.ts`, filterable by brand and by
  category. Two audits were run over the covers and both found real problems: **22** pointed
  at files that had been deleted, and **17** were photographs of physical swatch books rather
  than product photography. Both were fixed — if a cover looks wrong, check it against the
  live site before assuming a code bug.
- **Bedsheet catalogues are still a stand-in.** "Beds & More" is standing in for real bedsheet
  catalogues that the client has not supplied.
- **5 catalogues have no PDF on sarom.info**: Regalia, Cloud, Willow, Auralia, Abruzzi.

## Verification harness (use it — build success proves almost nothing here)

Every visual claim in this project is checked by driving the **installed Chrome** through
`playwright-core` (`executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"`),
not the in-app Browser pane, which does not composite reliably in this environment.

`window.__ScrollTrigger` is exposed outside production, which is what makes pin/progress
auditing possible — keep it. The pattern that has caught every recent bug:

1. Scroll the whole page once in ~300px steps so lazy triggers register.
2. Find the trigger by class, read its real `start`/`end`.
3. Sample at fractions of the pin and assert on **numbers** — progress monotonic, travel
   ratio ≈ 1.00, an element's rect landing on a computed target, node scales firing in order.

Standard checks before reporting done: no horizontal overflow at 1440 **and** 390, zero broken
images, console errors (expect the 3 font 404s), reduced-motion clean, `tsc --noEmit`,
`next build`. Scratch harness scripts go in `reference/` and are **deleted afterwards** — and
never with a broad glob: `rm -f reference/shots/_s*.png` once destroyed 18 committed reference
screenshots (recovered with `git checkout -- reference/shots/`).


## The /about page — content provenance (READ BEFORE EDITING COPY)

The client's standing rule: **do not invent** founder information, dates, statistics,
locations, awards, customer numbers, revenue, manufacturing claims, certifications,
partnerships or historical events. The page was first built with placeholders on that basis;
the client then supplied two sources and everything was replaced with real copy.

`lib/about.ts` is fully sourced and carries the provenance in its header comment. **Zero
placeholders remain — do not add one.** Sources:

- `https://sarom.info/about.php` — founding year (2005), the six directors and their titles,
  their portraits, reach figures, vision/mission, the dated timeline.
- `reference/Brand Book.pdf` — About Us and Our Strength copy, the founders' note, warehouse
  and SKU figures.

Facts, so they don't get re-derived: founded **2005** by Mr. Amarshi Shah and Mr. Shantilal
Shah; six directors (Amarshi, Shantilal, Manish, Rohit, Milin Shah, Deepak Nishar);
**200+ cities, 1,000+ stores, 6,000+ SKUs, 3 Lakh+ sq ft** warehouse; Thane, Maharashtra.

Where the sources disagree the **live site wins as the public claim** — the Brand Book says
"over 1,200 stores", about.php says "1000+". `1,000+` is used, true under both.

`FOUNDERS_NOTE.body` is kept in the file but deliberately **not rendered** (the client cut the
paragraph). Left in place because it is real sourced copy and restoring it should not mean
re-reading the PDF.

### Section-by-section design brief (client-assigned, from three reference sites)

The client supplied noomoagency.com, pear.no and aerodynamics.nl and then assigned treatments
explicitly — this mapping is theirs, not a suggestion:

1. Hero — free choice, explicitly "don't mix-match from these 3".
2. About Sarom — free choice.
3. Meet the Founders — aerodynamics' team section.
4. How Sarom Is Today — **pear.no's progress rail**.
5. Vision & Mission — aerodynamics' 3 value blocks, "exactly how they are emerging".
6. Why Sarom — pear.no's circular/orbit questions section, "copy paste same".
7. Our Journey — pear.no progress rail again.

Later instruction: **Why Sarom and Vision & Mission were swapped** in page order.

The Why Sarom orbit is a real ring (CSS trig off `--pos`), not a horizontal slide — the client
rejected the horizontal reading explicitly. Its decorative lines are **tethers**: one end
pinned to a fixed point in the frame, the other tracking the moving panel. That was measured,
not designed — see the working-style note below.

## User working style (this client)

- Wants **exact replicas** of reference screenshots/mockups when given one — not
  "inspired by," literal structural match (nav position, card counts, cut/curve geometry,
  label placement). Say so explicitly when a request means "make it identical," not "similar."
- Cares about curvature/cuts as the premium signal specifically — notched image corners,
  concave panel joins, nested nothing-picked-by-hand radii.
- Wants sections that fit one viewport where the reference shows that (not scroll-cropped).
  Check `compH <= innerHeight` before calling a full-bleed/viewport-height layout done.
- Corrects fast and precisely — re-verify with the Chrome harness after every visual change
  before reporting done; screenshots have caught real bugs (stale cache, broken cascades,
  cropped carousels) that `tsc`/build success did not.
- Mixes Hindi/English in requests ("samajh gaya" = understood, "pehle X fir Y" = X first then
  Y). Read intent from context, confirm understanding briefly, then execute.
- **Iterates in rapid mid-turn messages, often changing scope.** Expect several corrections
  arriving while work is still running, sometimes contradicting the previous one ("do the same
  to other sections" → "I don't want it like this section" → "only 01, no other section").
  What worked: treat the *latest* message as authoritative, restate the scope you settled on
  in the reply, and confirm what you did **not** touch. Don't batch-apply a treatment across
  sections on the strength of one approving sentence.
- **"Exactly like the reference" is literal.** When they attach a mockup they mean measured
  parity, not the same idea. Trace the image before writing CSS; a plausible-looking reading
  of the geometry has already been wrong once (see the straight-vs-curved seam above).
- **They spot sub-20px artifacts and circle them in red.** Dark slivers from a mis-shaped
  ring, a 1px edge jog, a crowded corner — all flagged. Zoom every new cut/notch to ~5x in
  the shot before reporting done.
- Says "ss2" to mean whichever reference image is attached to that message — not a fixed file.
- **They share reference *videos* as Google Drive links**, not just stills. Drive needs its
  confirm-token flow to download; extract frames with OpenCV and work from those.
- **When interpretation keeps failing, measure the reference mechanically.** The Why Sarom
  decorative lines went through many rejected passes built on watching the clip. Running
  `cv2.HoughLinesP` over the frames ended it in one step: the detected line's foot held at
  (500,893) across the whole scroll while only its head moved, so the changing angle was a
  *consequence*, not the thing to author. Every earlier attempt had fixed the angle and let
  the far end fall where it may — which is precisely why the client kept saying the lines
  looked like they were "flying here n there". Generalise: when a motion is hard to read,
  detect it numerically rather than iterating on impressions.
- **Vague-sounding complaints are usually literal and measurable.** "the scroll is not proper"
  was a 0.46 travel ratio; "this line is not moving properly" was a non-monotonic `--p` plus a
  path built 650px short. Diagnose with numbers before changing anything — every one of these
  turned out to be a specific arithmetic fault, not a matter of taste.

## Open threads

### Uncommitted work — the whole /about page

**Nothing from the About page work has been committed or pushed.** As of the last session
`git status` showed modified `app/globals.css` and `lib/content.ts`, plus untracked
`PRODUCT.md`, `app/about.css`, `app/about/`, `components/AboutPage.tsx`,
`components/Threadline.tsx`, `lib/about.ts`, `public/media/about/`, `public/media/founders/`.
Verified and building, but not deployed. Confirm with the client before committing.

### Offered and unanswered: the `.letter` mobile overflow

`.letter` (the shared `ClosingCta`) overflows **28px horizontally at 390px** — a `<p>` inside
it overruns. This is **pre-existing and site-wide**: it is on the homepage too, so it is
already live. A fix was offered; the client has not answered. Not a regression from the
About work — don't attribute it there.

### Waiting on the client

1. **The three AvantGarde `.woff2` files** for `public/fonts/` (see Typography above) —
   `AvantGardeBkBT-Book`, `AvantGardeBkBT-BookOblique`, `AvantGardeMdBT-Medium`.
   No code change needed; the `@font-face` blocks already reference them.
2. **Real bedsheet catalogues** — "Beds & More" is a stand-in.
3. **PDFs for 5 catalogues** absent from sarom.info: Regalia, Cloud, Willow, Auralia, Abruzzi.
4. **A compressed hero video.** The Drive file supplied previously was **byte-identical** to
   the original (same MD5, same 19,933,242 bytes) — no compression had been applied, so
   nothing was swapped in. `ffmpeg` recipe and poster-frame step are in the README.
5. **More photography.** Only ~8 distinct product scenes exist, so images repeat across
   sections of `/about`.

### 03 — Studio → LUMORA parity (not started)

**03 — Studio → LUMORA parity.** Client asked for `.studio` to be an exact replica of the
LUMORA mockup, saying "the image cut out is not proper". Measured deltas, for whenever this
resumes:

1. Feature-image caption card (`.studio__featurecopy`) is flush in the image's bottom-left
   corner; LUMORA insets it with a gap and notches the image around it (rounded, filleted).
2. Vertical tag (`.studio__vtag`) is flush to the image's right edge with one rounded corner;
   LUMORA has it as a fully-rounded standalone tab with a gap, image notched.
3. Right panel image (`.studio__panelimg`) is inset on all sides; LUMORA's bleeds into the
   panel's bottom-right corner, rounded top-left only.
4. Bigger, un-asked deltas: LUMORA's ground is near-black (ours is warm ivory) and it has a
   top bar (logo + search) and a left vertical nav rail that `.studio` does not have. Flipping
   the section to near-black is a brand-level call — confirm before doing it.
