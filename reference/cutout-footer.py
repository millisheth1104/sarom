"""
Cut the furniture out of the supplied footer photo into a transparent PNG.

First run downloads rembg's u2net model (~170MB) to ~/.u2net — that needs
network access and will be slow once; subsequent runs are fast.
"""
from rembg import remove, new_session
from PIL import Image, ImageFilter
import numpy as np

SRC = "reference/Sarom footer.jpg.jpeg"
OUT = "public/media/interiors/footer-cutout.png"

print("loading model (first run downloads it)...")
session = new_session("u2net")

im = Image.open(SRC).convert("RGB")
print("source:", im.size)

cut = remove(im, session=session)
print("cutout:", cut.size, cut.mode)

# Trim to the furniture's actual bounding box so the PNG isn't mostly padding.
a = np.array(cut)
alpha = a[..., 3]
ys, xs = np.nonzero(alpha > 12)
if len(xs):
    pad = 4
    box = (
        max(0, xs.min() - pad),
        max(0, ys.min() - pad),
        min(cut.width, xs.max() + 1 + pad),
        min(cut.height, ys.max() + 1 + pad),
    )
    cut = cut.crop(box)
    print("trimmed to:", cut.size, "box", box)

cut.save(OUT, "PNG", optimize=True)
import os
print(f"saved {OUT}  {os.path.getsize(OUT)//1024}KB")
