# -*- coding: utf-8 -*-
"""
Traces the Sarom wordmark into an SVG for the footer's full-width type.

No vector logo exists anywhere in the client's files — the Brand Book's only
vector paths are page borders — and the largest raster is 1444x463. Stretched
to the full footer width that goes soft on a 2x screen, so the wordmark is
traced from that raster instead.

Two shapes, not one:
  * the letters s-a-r-m, as a single path filled with LETTER_FILL — a fixed
    colour, not currentColor, because the footer uses the file as an <img>
    and an image cannot inherit CSS colour (currentColor renders black);
  * the "o", the brand's signature gradient ring, as its own path, filled with
    a gradient sampled from the logo itself (top-left lime -> bottom-right blue).
The tagline ("for your home", rows below the ink gap at y=302) and the TM mark
are left out: at footer scale the wordmark carries the brand on its own.

Run:  python -I reference/trace-wordmark.py
Writes public/media/sarom-wordmark.svg
"""
import os

import numpy as np
import potrace
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "media", "logo-dark.png")
OUT = os.path.join(ROOT, "public", "media", "sarom-wordmark.svg")
LETTER_FILL = "#F5F0E8"  # --ivory, for the dark footer
WORD_BOTTOM = 302        # first ink-free row: the wordmark ends above it
TM_LEFT, TM_BOTTOM = 1340, 75

im = Image.open(SRC).convert("RGBA")
a = np.asarray(im).astype(np.float32)
rgb, alpha = a[..., :3], a[..., 3]
mx, mn = rgb.max(axis=2), rgb.min(axis=2)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)

ink = alpha > 128
h, w = ink.shape
ink[WORD_BOTTOM:, :] = False                       # drop the tagline
ink[:TM_BOTTOM, TM_LEFT:] = False                  # drop the TM mark
ring = ink & (sat > 0.25)                          # the coloured "o"
letters = ink & ~ring

# The ring's anti-aliased edge is grey-ish and would land in `letters`; give
# every inked pixel next to the ring back to it.
grow = ring.copy()
for dy in (-1, 0, 1):
    for dx in (-1, 0, 1):
        grow |= np.roll(np.roll(ring, dy, 0), dx, 1)
edge = letters & grow
ring |= edge
letters &= ~edge


def to_path(mask):
    # potracer traces the FALSE pixels as the shape (the inverse of potrace's own
    # convention), so hand it the complement — measured: the first pass filled
    # the whole box with gradient and left only the ring's hole visible.
    bm = potrace.Bitmap(~mask)
    plist = bm.trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=0.2)
    parts = []
    for curve in plist:
        sp = curve.start_point
        d = ["M%.2f,%.2f" % (sp.x, sp.y)]
        for seg in curve.segments:
            if seg.is_corner:
                d.append("L%.2f,%.2f L%.2f,%.2f" % (seg.c.x, seg.c.y, seg.end_point.x, seg.end_point.y))
            else:
                d.append("C%.2f,%.2f %.2f,%.2f %.2f,%.2f" % (seg.c1.x, seg.c1.y, seg.c2.x, seg.c2.y,
                                                             seg.end_point.x, seg.end_point.y))
        parts.append(" ".join(d) + "Z")
    return " ".join(parts), len(plist)


# Tight box around what is kept, so the SVG has no dead margin.
ys, xs = np.where(ink)
x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1

# Gradient end colours, sampled from the ring's own extremes.
rys, rxs = np.where(ring & (sat > 0.45))
order = rxs + rys
tl = rgb[rys[order.argmin()], rxs[order.argmin()]].astype(int)
br = rgb[rys[order.argmax()], rxs[order.argmax()]].astype(int)
mid_mask = ring & (sat > 0.45)
cy, cx = np.mean(rys), np.mean(rxs)
near = np.argmin((rys - cy - 40) ** 2 + (rxs - cx + 40) ** 2)
mid = rgb[rys[near], rxs[near]].astype(int)
hexc = lambda c: "#%02X%02X%02X" % tuple(int(v) for v in c)

d_letters, n1 = to_path(letters)
d_ring, n2 = to_path(ring)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0} {y0} {x1 - x0} {y1 - y0}" role="img" aria-label="Sarom">
  <!-- Traced from logo-dark.png by reference/trace-wordmark.py. Letters in
       ivory for the dark footer; the "o" keeps the brand gradient. -->
  <defs>
    <linearGradient id="sarom-o" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{hexc(tl)}"/>
      <stop offset="0.5" stop-color="{hexc(mid)}"/>
      <stop offset="1" stop-color="{hexc(br)}"/>
    </linearGradient>
  </defs>
  <path fill="{LETTER_FILL}" fill-rule="evenodd" d="{d_letters}"/>
  <path fill="url(#sarom-o)" fill-rule="evenodd" d="{d_ring}"/>
</svg>
'''
open(OUT, "w", encoding="utf-8", newline="\n").write(svg)
print("letters: %d paths, ring: %d paths, viewBox %d %d %d %d, gradient %s %s %s, %d KB" % (
    n1, n2, x0, y0, x1 - x0, y1 - y0, hexc(tl), hexc(mid), hexc(br), os.path.getsize(OUT) // 1024))
