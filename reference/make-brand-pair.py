"""
Build the two states each brand mark needs: GREY at rest, COLOUR on hover.

The logo files already in the project were the wrong variants — Smart Plus
was a pure-white version made for dark grounds, which is why it vanished on
ivory. sarom.info carries proper colour logos under assets/img/brandlogo/,
and Smart Plus there is lime green (#B8D654), not white.

  colour/  the real logo, untouched, for the hover state
  grey/    one neutral silhouette built from the alpha channel, for rest

Building the rest state from ALPHA rather than desaturating the colour file
matters: a CSS grayscale() of a white logo is still white, so Smart Plus would
have stayed invisible however much filtering was applied to it.
"""
import os
import shutil

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "reference", "_brandlogo")
BRANDS_DIR = os.path.join(ROOT, "public", "media", "brands")
COLOUR = os.path.join(BRANDS_DIR, "colour")
GREY = os.path.join(BRANDS_DIR, "grey")

# The /brandlogo/ set is the full five and carries real brand colour.
PAIRS = [
    ("sj", "sj-bl.webp"),
    ("oofy", "oofy-bl.webp"),
    ("matlin", "matlin-bl.webp"),
    # From the SVG, minus its lime background plate: the raster copy on
    # sarom.info is 100% opaque, so a silhouette built from it was a filled
    # rectangle. See fix-smartplus.mjs.
    ("smart-plus", "smartplus-vector.png"),
    ("beds-and-more", "bedsandmore-bl.webp"),
]

INK = (92, 88, 84)      # neutral warm grey, reads at rest on ivory
TARGET_H = 200
ALPHA_FLOOR = 24


def main():
    os.makedirs(COLOUR, exist_ok=True)
    os.makedirs(GREY, exist_ok=True)

    for slug, filename in PAIRS:
        path = os.path.join(SRC, filename)
        if not os.path.exists(path):
            print(f"  {slug}: source missing, skipped")
            continue

        im = Image.open(path).convert("RGBA")
        alpha = im.split()[-1]
        box = alpha.point(lambda a: 255 if a > ALPHA_FLOOR else 0).getbbox()
        if not box:
            print(f"  {slug}: no visible mark, skipped")
            continue

        # Trim both states to the same bounds so they sit exactly on top of
        # each other when one cross-fades into the other.
        im = im.crop(box)
        if im.height != TARGET_H:
            w = max(1, round(im.width * TARGET_H / im.height))
            im = im.resize((w, TARGET_H), Image.LANCZOS)

        im.save(os.path.join(COLOUR, f"{slug}.webp"), "WEBP", quality=94, method=6)

        grey = Image.new("RGBA", im.size, INK + (0,))
        grey.putalpha(im.split()[-1])
        grey.save(os.path.join(GREY, f"{slug}.webp"), "WEBP", quality=94, method=6)

        px = [p for p in im.getdata() if p[3] > 60]
        avg = [round(sum(p[i] for p in px) / len(px)) for i in range(3)]
        print(f"  {slug:<14} {im.size}  colour avg rgb{tuple(avg)}")

    print("\ncolour ->", os.path.relpath(COLOUR, ROOT))
    print("grey   ->", os.path.relpath(GREY, ROOT))


if __name__ == "__main__":
    main()
