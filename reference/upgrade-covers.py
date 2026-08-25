"""
Replace the 254px catalogue covers with high-resolution artwork extracted
from the PDFs themselves.

sarom.info only ever serves a ~254x360 thumbnail (every larger path 404s), so
the covers were being upscaled ~2x in the layout and went soft. The PDFs carry
the same photography at print resolution, so the picture is pulled from there.

Rendering page 1 was tried first and rejected: page 1 is inconsistent across
the set — some catalogues open on a photo, others on a near-blank title
banner. Extracting the EMBEDDED images and picking the largest usable one is
stable regardless of how a given catalogue is laid out.

Any catalogue where nothing suitable is found keeps its original thumbnail.
"""
import glob
import json
import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "reference", "catalogue-manifest.json")
COVERS = os.path.join(ROOT, "reference", "_covers.json")

TARGET_W = 900        # covers render at ~500px max, so 900 covers 2x screens
MIN_SIDE = 380        # below this it is no better than what we already have
MIN_ASPECT, MAX_ASPECT = 0.35, 2.8   # reject banners, rules and logo strips


def best_image(pdf_path, tmp):
    """Largest usable embedded image from the first few pages, or None."""
    prefix = os.path.join(tmp, "img")
    try:
        subprocess.run(
            ["pdfimages", "-png", "-f", "1", "-l", "3", pdf_path, prefix],
            check=True, capture_output=True, timeout=120,
        )
    except Exception:
        return None

    best, best_area = None, 0
    for f in glob.glob(prefix + "*.png"):
        try:
            im = Image.open(f)
            w, h = im.size
        except Exception:
            continue
        if min(w, h) < MIN_SIDE:
            continue
        aspect = w / h
        if not (MIN_ASPECT <= aspect <= MAX_ASPECT):
            continue
        if w * h > best_area:
            best, best_area = f, w * h
    return best


def main():
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
    covers = {c["id"]: c["cover"] for c in json.load(open(COVERS, encoding="utf-8"))["covers"]}

    upgraded = skipped = failed = 0
    sizes = []

    for i, rec in enumerate(manifest["catalogues"], 1):
        pdf = os.path.join(ROOT, "public" + rec["file"])
        cover_rel = covers.get(rec["id"])
        if not cover_rel or not os.path.exists(pdf):
            skipped += 1
            continue
        cover = os.path.join(ROOT, "public" + cover_rel)

        try:
            cur_w = Image.open(cover).width
        except Exception:
            cur_w = 0

        tmp = tempfile.mkdtemp()
        try:
            src = best_image(pdf, tmp)
            if not src:
                failed += 1
                continue
            im = Image.open(src)
            if im.width <= cur_w:
                skipped += 1
                continue
            im = im.convert("RGB")
            if im.width > TARGET_W:
                h = round(im.height * TARGET_W / im.width)
                im = im.resize((TARGET_W, h), Image.LANCZOS)
            # write beside the original, then swap, so a crash cannot leave a
            # half-written cover behind
            out = os.path.splitext(cover)[0] + ".webp"
            im.save(out + ".tmp", "WEBP", quality=88, method=6)
            os.replace(out + ".tmp", out)
            if out != cover and os.path.exists(cover):
                os.remove(cover)
            upgraded += 1
            sizes.append(im.width)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

        if i % 25 == 0:
            print(f"  {i}/{len(manifest['catalogues'])} — upgraded {upgraded}", flush=True)

    print("\n=== DONE ===")
    print("upgraded:", upgraded, "| kept original:", skipped, "| no usable image:", failed)
    if sizes:
        print("new cover widths: min", min(sizes), "max", max(sizes))


if __name__ == "__main__":
    sys.exit(main())
