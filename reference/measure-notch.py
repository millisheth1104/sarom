"""
Trace the LUMORA card notch geometry instead of guessing it.

Finds card 3 ("Bloom Seat"), then measures:
  - card bounds
  - the notch (near-black cut in the bottom-right)
  - the capsule inside it
  - the fillet radius where the image curves into the notch
All reported as ratios of the card box, so they port to any build width.
"""
from PIL import Image
import numpy as np

im = Image.open("reference/WhatsApp Image 2026-08-20 at 1.05.20 PM (1).jpeg").convert("RGB")
a = np.asarray(im).astype(int)
lum = a.mean(axis=2)

# ---- 1. locate card 3 -------------------------------------------------------
# The top card row sits in a light band; scan a column strip through the middle
# of card 3 to find its vertical extent, then a row to find horizontal extent.
# Seed from the visual crop: card 3 lives near x 505-625, y 205-315.
strip = lum[200:325, 505:625]
# card interior is markedly lighter than the near-black panel gutter
rows = strip.mean(axis=1)
lit = np.where(rows > 60)[0]
y0, y1 = 200 + lit.min(), 200 + lit.max()

band = lum[y0 + 10 : y0 + 40, 480:660]
cols = band.mean(axis=0)
litc = np.where(cols > 60)[0]
x0, x1 = 480 + litc.min(), 480 + litc.max()

cw, ch = x1 - x0, y1 - y0
print(f"card 3 box: x {x0}-{x1} ({cw}px)  y {y0}-{y1} ({ch}px)")

# ---- 2. the notch -----------------------------------------------------------
# Walk up the card's right edge to find where near-black gives way to image.
col = lum[y0:y1, x1 - 6]
dark = np.where(col < 45)[0]
notch_top = y0 + dark.min() if len(dark) else None

# Walk left along the card's bottom edge to find the notch's left extent.
row = lum[y1 - 5, x0:x1]
darkr = np.where(row < 45)[0]
notch_left = x0 + darkr.min() if len(darkr) else None

nh = y1 - notch_top
nw = x1 - notch_left
print(f"notch: left x={notch_left}  top y={notch_top}")
print(f"       {nw} x {nh}px  =  {nw/cw:.1%} of card width, {nh/ch:.1%} of card height")

# ---- 3. the fillet ---------------------------------------------------------
# Along the notch's top edge, find where it stops being straight: for each row
# below notch_top, the leftmost dark pixel shifts right as the corner curves.
edges = []
for dy in range(0, min(nh, 30)):
    r = lum[notch_top + dy, x0:x1]
    d = np.where(r < 45)[0]
    if len(d):
        edges.append((dy, d.min()))
straight = edges[-1][1] if edges else 0
first = edges[0][1] if edges else 0
fillet = abs(first - straight)
print(f"fillet: notch left edge moves {fillet}px over the corner"
      f"  = {fillet/ch:.1%} of card height")

# ---- 4. port to the build --------------------------------------------------
BUILD_CARD_H = 480  # measured earlier in Chrome at 1440
scale = BUILD_CARD_H / ch
print(f"\nscale to build (card {BUILD_CARD_H}px tall): {scale:.2f}x")
print(f"  notch height -> {nh*scale:.0f}px")
print(f"  notch width  -> {nw*scale:.0f}px")
print(f"  fillet       -> {fillet*scale:.0f}px")
