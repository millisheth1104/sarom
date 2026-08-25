"""
Normalise the five house-brand logos into one consistent set of marks.

The supplied files cannot share a background. Smart Plus is pure white
(invisible on ivory), SJ is near-black (invisible on charcoal), Matlin is tan
and the rest mid-grey — so whatever ground you pick, something disappears.
They also carry wildly different amounts of empty canvas: SJ's monogram fills
26% of its file's width where Matlin fills 100%, which is why SJ rendered tiny
next to the others.

Both problems go away by rebuilding each logo from its ALPHA channel: trim to
the mark's real bounds, then paint it a single ivory. Colour stops mattering,
padding stops mattering, and five different logos become one family — which is
what the section's own line, "one house standard", claims.

Output: public/media/brands/mono/<slug>.webp
"""
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "media", "brands")
OUT = os.path.join(SRC, "mono")

# The best source file per brand — several exist at different crops/sizes.
BRANDS = [
    ("sj", "sj.webp"),
    ("oofy", "oofy.webp"),
    ("matlin", "matlin.webp"),
    ("smart-plus", "smartplus.png"),
    ("beds-and-more", "bedsandmore.webp"),
]

INK = (245, 240, 232)   # --ivory
TARGET_H = 200          # generous for a ~70px display height on 2x screens
ALPHA_FLOOR = 24        # ignore near-transparent halo when finding the bounds


def build(slug, filename):
    path = os.path.join(SRC, filename)
    im = Image.open(path).convert("RGBA")
    alpha = im.split()[-1]

    box = alpha.point(lambda a: 255 if a > ALPHA_FLOOR else 0).getbbox()
    if not box:
        print(f"  {slug}: no visible mark, skipped")
        return None
    alpha = alpha.crop(box)

    # Scale by height so every mark sits on the same optical baseline,
    # whatever its aspect.
    if alpha.height != TARGET_H:
        w = max(1, round(alpha.width * TARGET_H / alpha.height))
        alpha = alpha.resize((w, TARGET_H), Image.LANCZOS)

    mark = Image.new("RGBA", alpha.size, INK + (0,))
    mark.putalpha(alpha)

    os.makedirs(OUT, exist_ok=True)
    dest = os.path.join(OUT, f"{slug}.webp")
    mark.save(dest, "WEBP", quality=92, method=6)
    print(f"  {slug:<14} {im.size} -> {mark.size}  ({os.path.getsize(dest) / 1024:.0f} KB)")
    return mark.size


print("building monochrome brand marks:")
sizes = [build(s, f) for s, f in BRANDS]
ok = [s for s in sizes if s]
if ok:
    ratios = [w / h for w, h in ok]
    print(f"\n{len(ok)} marks, aspect range {min(ratios):.2f}–{max(ratios):.2f}")
