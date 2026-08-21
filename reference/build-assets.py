"""
Build every web image asset from the Brand Book / Sarom PDF extracts.

These are the only high-resolution sources in the project — the live-site
scrapes topped out at 541px, which is why earlier images read soft. Every
asset here is cropped and DOWNSAMPLED from an 886-3277px original; the
UPSCALED flag fires if that ever stops being true.

Several Brand Book photographs carry printed brand marks along their bottom
edge. `trim_bottom` removes that band before cropping. The values come from
measurement, not guesswork:
    bb-050  marks from ~90%  -> 0.13
    bb-072  marks from ~91%  -> 0.13
    bb-016  marks from ~70%  -> 0.32
    bb-045, bb-033, bb-037  same bottom band; the variance detector missed
    them because the imagery is busy, so they are trimmed to match

    python reference/build-assets.py
"""
from PIL import Image, ImageEnhance
import os

SRC = "reference/extract"
OUT = "public/media/product"
os.makedirs(OUT, exist_ok=True)


def build(src, name, ratio, width, *, bias=0.42, trim_bottom=0.0, sharpen=1.04, quality=88):
    """Crop `src` to `ratio` and write a WEBP `width` px wide.

    bias         vertical crop bias, 0 = top, 1 = bottom, 0.5 = centre
    trim_bottom  fraction of the image bottom discarded before cropping
    """
    with Image.open(os.path.join(SRC, src)) as raw:
        im = raw.convert("RGB")
        native = im.size

        if trim_bottom:
            w, h = im.size
            im = im.crop((0, 0, w, int(h * (1 - trim_bottom))))

        w, h = im.size
        if w / h > ratio:
            nw = int(h * ratio)
            left = (w - nw) // 2
            im = im.crop((left, 0, left + nw, h))
        else:
            nh = int(w / ratio)
            top = int((h - nh) * bias)
            im = im.crop((0, top, w, top + nh))

        upscaled = width > im.size[0]
        height = int(width / ratio)
        im = im.resize((width, height), Image.LANCZOS)
        if sharpen != 1.0:
            im = ImageEnhance.Sharpness(im).enhance(sharpen)

        dst = os.path.join(OUT, name)
        im.save(dst, "WEBP", quality=quality, method=6)

    flag = "   <-- UPSCALED" if upscaled else ""
    print(f"  {name:30} {native[0]}x{native[1]} -> {width}x{height}  {os.path.getsize(dst)//1024}KB{flag}")


# Sources by native resolution — dominants draw from the largest files,
# thumbnails from the smallest, so nothing is ever enlarged:
#   bb-000 3277x1873 | bb-010 1350x1300 | bb-072 1280x1280
#   bb-045/050 1251  | bb-016 1205x1418 | bb-033 1000 | bb-037 886 | bb-078 521

print("SECTION 1 - studio")
build("bb-050.jpg", "showroom-hero.webp", 4 / 3, 1240, trim_bottom=0.13)
build("bb-033.jpg", "showroom-a.webp", 1 / 1, 760, trim_bottom=0.13)
build("bb-016.png", "showroom-b.webp", 1 / 1, 760, trim_bottom=0.32)
build("bb-072.jpg", "showroom-c.webp", 1 / 1, 760, trim_bottom=0.13)
build("bb-010.png", "showroom-panel.webp", 4 / 5, 1000)

print("SECTION 2 - product editorial")
build("bb-072.jpg", "editorial-hero.webp", 4 / 5, 880, trim_bottom=0.13)
build("bb-045.jpg", "editorial-a.webp", 1 / 1, 560, trim_bottom=0.13)
build("bb-050.jpg", "editorial-b.webp", 1 / 1, 560, trim_bottom=0.13)
build("bb-010.png", "editorial-c.webp", 1 / 1, 560)

print("SECTION 3 - selector")
build("bb-045.jpg", "selector-hero.webp", 1 / 1, 1080, trim_bottom=0.13)
build("bb-072.jpg", "selector-a.webp", 4 / 3, 620, trim_bottom=0.13)
build("bb-016.png", "selector-b.webp", 4 / 3, 620, trim_bottom=0.32)
build("bb-078.jpg", "selector-c.webp", 4 / 3, 520)

print("COLLECTIONS EDITORIAL - three shared heroes at one frame ratio")
build("bb-050.jpg", "coll-hero-upholstery.webp", 1 / 1.05, 1030, bias=0.30, trim_bottom=0.13)
build("bb-000.jpg", "coll-hero-curtains.webp", 1 / 1.05, 1030, bias=0.30)
build("bb-072.jpg", "coll-hero-bedding.webp", 1 / 1.05, 1030, bias=0.28, trim_bottom=0.13)
build("bb-000.jpg", "coll-thumb-curtains.webp", 4 / 3, 620, bias=0.30)

print("STORY - landscape hero, from the only natively landscape source")
build("bb-000.jpg", "story-hero.webp", 4 / 3.1, 1400)

print("SHARED - wide fabric texture")
build("bb-000.jpg", "drape-wide.webp", 21 / 8, 2200, quality=86)

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f"\ntotal {total // 1024}KB across {len(os.listdir(OUT))} files")


# Next caches optimised images on disk keyed by source PATH, not content, so
# rewriting an asset in place leaves the old bytes being served. Clearing the
# cache here means a rebuild is always reflected in the browser.
import shutil
cache = os.path.join(".next", "cache", "images")
if os.path.isdir(cache):
    shutil.rmtree(cache, ignore_errors=True)
    print("cleared .next/cache/images")
else:
    print("no .next/cache/images to clear")
