# Build log

## 2026-08-25 — House Brands: no panel, original spacing, pop on hover

**Asked for:** remove the hover background panel, put the spacing between the
logos back to how it was, and make the marks pop on hover instead.

**Changed**

| File | Change |
|---|---|
| `lib/content.ts` | Dropped the per-brand `tint` values — no plate means no colour to plate with. |
| `components/Editorial.tsx` | Removed the `--tint` style prop from `.house__cell`. |
| `app/editorial.css` | Removed the plate entirely. Row spacing restored to `justify-content: center` with the pre-spread gap. Pop moved onto `.house__logo`. |
| `app/tokens.css` | New `--ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1)` — the only easing in the set that overshoots. |

**Hover behaviour now:** the mark scales to 1.14 on an overshooting curve,
turns from neutral grey to its real brand colour, and the other four recede to
40% so the popped one has somewhere to pop to (`:has()` on the row).

**The real find.** The pop would not animate, twice, for two different reasons —
both in `globals.css`, both invisible without measuring:

1. `html[data-js] [data-reveal][data-inview="true"]` pins `transform` at
   specificity (0,3,1), outranking `.house__cell:hover` at (0,2,0).
2. `[data-reveal]` re-declares the whole `transition` shorthand at equal
   specificity but later source order (`editorial.css` is `@import`ed at the
   top of `globals.css`), so a `transition` naming `scale` is dropped and the
   value snaps instead of easing.

Fixed by moving the motion onto `.house__logo`, a plain `<img>` with no
`data-reveal`, where `scale` and `transition` are uncontested.

**Consequence worth knowing:** the `transform: translateY(-3px)` lift shipped in
commit `54214c9` is subject to rule 1 and has never moved a pixel in production.

**Verified** (Playwright + real Chrome, `localhost:3000`):

- layout `justify-content: center`, gap `64px 79.2px`, 98px inset each side —
  matches the pre-spread values exactly
- all five: scale `1 → ~1.15 → 1.14`, colour logo at opacity 1, others dimmed
- no panel at rest or on hover — `background: rgba(0,0,0,0)`, `::before: none`
- curve sampled over 700ms: peak 1.1537 at 260ms, settles to 1.14 by 520ms

**Reverted within the same pass:** a closing rail (supporting line +
e-Catalogue link) was added under the row to fill the bare ivory, then removed
at the client's request. The section is back to 348px with 72px below the
logos — the whitespace is intentional.

**Section junction tightened.** The band between the marks and the next
section's eyebrow was 144px — `.sect { padding-block: var(--section-y) }` on
both sides, 72px each. Now 71px: `.sect.house` bottom to 28px, and
`.house + .sect` top to 43px (sibling-scoped, so the following section keeps
its normal spacing wherever else it appears — the preview variants reorder
these and the rule follows whichever lands).

A third instance of the same source-order trap: `.house` already carried
`padding-block: var(--section-y) clamp(2.5rem, 5vw, 4.5rem)`, but `.sect` in
`globals.css` beats a bare `.house` on source order at equal specificity, so
the asymmetric padding it was meant to apply had never taken effect at any
viewport. Needed `.sect.house` at (0,2,0).

**Not committed** — left in the working tree pending review.

---

## 2026-08-25 — 22 catalogue covers pointed at deleted files

**Reported as:** one thumbnail in The Edit rendering as alt text
("Alytus, sweden velvet by SJ") instead of an image.

**Cause.** `reference/upgrade-covers.py` re-encodes a `.png` cover as `.webp`,
then deletes the original — but never updates the `cover` field that points at
it (`upgrade-covers.py:99-103`). Every record it converted was left referencing
a file the same script had just removed. Alytus was one of 22.

**Audit:** 209 cover paths — 187 resolved, **22 wrong extension, 0 truly
missing**. All 22 were `.png` records whose `.webp` was sitting right there.
Spread across SJ (16), Smart Plus (5) and Oofy (1), all in upholstery.

**Fixed**

| File | Change |
|---|---|
| `reference/_covers.json` | 22 covers repointed to `.webp`. |
| `lib/catalogues.ts` | Same 22 repointed (generated file, kept in sync). |
| `reference/upgrade-covers.py` | Now records each extension change and writes `_covers.json` back before exiting, so a re-run self-heals instead of re-breaking. |

Repointed conditionally — only where the `.png` was genuinely gone *and* a
`.webp` genuinely existed. A blind `.png -> .webp` rewrite would have broken the
one cover still legitimately a `.png`.

**Verified:** re-audit reports 209/209 resolving. Live page shows 0 images with
`naturalWidth === 0` and no 4xx on `/catalogues/`. `alytus.webp` serves 200
`image/webp` 50,848 bytes; the old `.png` path is a clean 404.

**Note:** these 22 are broken on the deployed site right now — the fix is in the
working tree, not yet pushed.

---

## 2026-08-25 — 17 covers were photos of swatch books, not product shots

**Reported as:** the Alfy cover showing a grid of fabric squares (`ALFY | 709`,
`ALFY | 708`) instead of a product image.

**What the covers actually are.** The original pass scored every embedded image
across the whole PDF and took the highest scorer. For most catalogues that
found the styled hero shot, which is why 192 of 209 are good. But several
Sarom PDFs also contain phone photographs of the physical swatch book — high
resolution and high detail, so they outscored the render.

Checked all 209 by eye on contact sheets. **17 were wrong**: Abaca (blurred),
Novel, Elantra, Hera, Lisabel, Mustan, Zenith, Isabella, Doralia, Velur (a
brick wall), Aluva, Meraki, Perth, Phantom, Soffice, Alfy, Charcoal.

**Not a mass regeneration.** Rendering every cover from PDF page 1 was the
obvious fix and would have been a regression: page 1 is often a near-empty
title card (Refuge's is just a logo and a band) while the existing cover is a
real product photo. Only the 17 were touched.

**Method.** `reference/refix-covers.py` scans the front pages only, filters to
photographic aspect ratios (0.45–2.6, which excludes swatch strips and
full-page scans), and scores `detail * area^0.35` so a flat colour card cannot
win on size alone. Candidates were staged, reviewed on before/after sheets,
then applied with originals backed up.

| Outcome | Count | Notes |
|---|---|---|
| Replaced | 16 | all now product photography |
| Left alone | 1 | Charcoal — its collage is the genuine sarom.info thumbnail for a monochrome print collection |

Two needed hand-picking: **Soffice** is a colour-card catalogue whose pages 2–4
are all swatch grids — took the cushion composition from page 6. **Perth**
first landed on a 432x748 crop; swapped to a cleaner 719x1031 shot.

**Counter-check on resolution.** Velur, Aluva, Doralia and Perth came out under
600px wide, so the PDFs were rescanned for anything larger. Everything bigger
was a swatch photograph — Velur's largest embedded assets are 1600x1200 swatch
shots and the Instagram logo. The smaller files are the real photography, so
the small sizes stand. Velur at 349x466 is the softest cover in the set.

**Verified:** 209/209 cover paths resolve; final contact sheet shows product
photography in all 16 replaced slots.

---

## 2026-08-25 — the Showroom wipe now runs in all three sliders

**Asked for:** the same Slider Revolution transition when changing carousels in
the other sections, matching 03 Showroom.

**Was:** only Showroom wiped. Collections and The Edit swapped their content
outright — the same kind of control behaving differently depending on which
section it sat in.

**Now:** the wipe lives in `components/useTileWipe.ts` and all three call it.
Showroom was refactored onto it too rather than leaving a second copy, so the
easing, stagger and inline-style cleanup are defined once instead of in three
places that would drift apart.

Wired through `useCatalogueTabs`, so both tabbed sections get it from the pills
**and** the paging arrows. Tabs wipe toward where the target sits (the rule the
brand tabs already used), so All -> Bedsheets reads as forward.

`sel` deliberately does not wipe — it moves on hover, and wiping the grid every
time the pointer crossed a thumbnail would make the section unusable. Hover
keeps the existing cross-fade.

**Sharp edge:** tiles are re-queried *after* the commit rather than reused. The
thumbnails are keyed by catalogue id, so React replaces those nodes on a
change; cleanup aimed at the old references would leave the new ones holding an
inline clip-path and a suspended transition, freezing their scroll reveals.

**Verified on production**, sampling clip-path per frame across each transition:

| | homepage | /preview/collections | /preview/edit |
|---|---|---|---|
| Showroom arrow | 63 | 95 | 95 |
| Collections tab | 61 | 95 | — |
| Collections arrow | 91 | 89 | — |
| The Edit tab | 73 | — | 96 |

(partial frames; any value above 0 means the clip interpolated rather than
snapped). Locally also confirmed hover produces 0 partial frames, and no inline
style residue remains on any tile once the transitions settle.

**Still open:** Avant Garde `.woff2` files; real bedsheet catalogues (Beds &
More is a stand-in); 5 catalogues on sarom.info have no PDF (Regalia, Cloud,
Willow, Auralia, Abruzzi); whether to password-protect the deployment; which
preview variant to keep.
