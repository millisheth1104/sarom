# Project Memory — Sarom Homepage

Knowledge base for this project: decisions, constraints, and answers to things
that will come up again. `BUILD_LOG.md` is the chronological history of what
was built and fixed; this file is the reference for *why* and *how it works*.

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
- **Typography**: Albra (display) / Albra Grotesk (body). **Client's files are TRIAL-licensed**
  (Ultra Kühl) — licence forbids conversion, server hosting, and publishing anything made with
  them. Do NOT convert `.otf`→`.woff2` from `./Albra Serif Font/` or copy into `public/fonts/`.
  Wired as `local()` first in every `@font-face` (tokens.css) — renders only if the trial fonts
  are installed on the *viewer's own machine*, otherwise falls back cleanly. `Albra Serif Font/`
  is git-ignored. **To go live**: client buys the licence → convert `.otf`→`.woff2` → drop into
  `public/fonts/` under the 6 filenames already referenced. Zero code changes needed then.

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

## Open thread (not started)

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
