"""
Trace the LUMORA card notch by TEXTURE, not brightness.

Brightness thresholds failed here (dark mockup, dark photo content). The notch
is a flat fill: near-zero local variance. The photo is textured. That separates
them cleanly regardless of how dark the photo is.

Reports the notch box and the fitted corner radius as ratios of the card box.
"""
from PIL import Image
import numpy as np

im = Image.open("reference/WhatsApp Image 2026-08-20 at 1.05.20 PM (1).jpeg").convert("L")
a = np.asarray(im).astype(float)


def local_std(arr, k=3):
    """Std-dev in a (2k+1) window, via integral images."""
    p = np.pad(arr, k, mode="edge")
    c1 = np.cumsum(np.cumsum(p, 0), 1)
    c2 = np.cumsum(np.cumsum(p * p, 0), 1)
    n = (2 * k + 1) ** 2
    H, W = arr.shape

    def box(c):
        return (
            c[2 * k : 2 * k + H, 2 * k : 2 * k + W]
            - c[0:H, 2 * k : 2 * k + W]
            - c[2 * k : 2 * k + H, 0:W]
            + c[0:H, 0:W]
        )

    m = box(c1) / n
    v = box(c2) / n - m * m
    return np.sqrt(np.clip(v, 0, None))


sd = local_std(a, 3)
TEX = 3.0  # above this = photo texture

# ---- card 3: the third textured island in the top card row ------------------
# scan the row band that contains the top cards
band = (sd[210:300, :] > TEX).mean(axis=0)
cols = band > 0.35
# group contiguous runs
runs, start = [], None
for x, v in enumerate(cols):
    if v and start is None:
        start = x
    elif not v and start is not None:
        if x - start > 40:
            runs.append((start, x))
        start = None
if start is not None:
    runs.append((start, len(cols)))
print("textured card runs on the top row:", runs)

x0, x1 = runs[-1]  # card 3
colband = (sd[:, x0 + 10 : x1 - 10] > TEX).mean(axis=1)
lit = np.where(colband > 0.35)[0]
lit = lit[(lit > 180) & (lit < 330)]
y0, y1 = lit.min(), lit.max()
cw, ch = x1 - x0, y1 - y0
print(f"card 3: x {x0}-{x1} ({cw}px)  y {y0}-{y1} ({ch}px)")

# ---- the notch: flat region inside the card, anchored bottom-right ----------
sub = sd[y0 : y1 + 1, x0 : x1 + 1]
flat = sub < TEX

# notch top: walk up the right edge while it stays flat
colr = flat[:, -4]
ys = np.where(~colr)[0]
notch_top = ys.max() + 1 if len(ys) else 0

# notch left: walk left along a row inside the notch while it stays flat
rowb = flat[min(notch_top + 6, flat.shape[0] - 1), :]
xs = np.where(~rowb)[0]
notch_left = xs.max() + 1 if len(xs) else 0

nw, nh = cw - notch_left, ch - notch_top
print(f"notch: {nw} x {nh}px  =  {nw/cw:.1%} W, {nh/ch:.1%} H of the card")

# ---- fit the top-left corner arc of the notch ------------------------------
# for each row in the notch, the leftmost flat pixel traces the arc
edge = []
for dy in range(notch_top, min(notch_top + 40, ch)):
    r = flat[dy, :]
    run = np.where(~r)[0]
    lx = (run.max() + 1) if len(run) else 0
    edge.append((dy - notch_top, lx))

xs_e = np.array([e[1] for e in edge])
settled = int(np.median(xs_e[len(xs_e) // 2 :]))
# radius = how far the edge travels horizontally before it settles
radius = int(xs_e[0] - settled) if xs_e[0] > settled else int(settled - xs_e.min())
print(f"corner arc: edge settles at x={settled}, travels {abs(radius)}px")
print(f"  radius = {abs(radius)/ch:.1%} of card height")

BUILD_H = 480
k = BUILD_H / ch
print(f"\nport to build (card {BUILD_H}px tall, scale {k:.2f}x):")
print(f"  notch  {nw*k:.0f} x {nh*k:.0f}px")
print(f"  corner radius ~ {abs(radius)*k:.0f}px")
