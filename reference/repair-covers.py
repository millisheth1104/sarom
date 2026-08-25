"""
Repair covers where the extraction picked a flat background instead of the
product photo.

upgrade-covers.py chose the LARGEST embedded image by pixel area. In several
catalogues the largest object on the page is a full-bleed background gradient,
which is bigger than the photograph sitting on top of it — so those covers came
out as near-blank washes, worse than the 254px thumbnail they replaced.

Size alone cannot tell a photo from a gradient. Detail can: a photograph has a
much wider spread of pixel values. Candidates are now scored on standard
deviation first and area second, and anything that still looks flat falls back
to re-downloading the original thumbnail from sarom.info.
"""
import glob
import io as _io
import json
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request

from PIL import Image, ImageStat

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "reference", "catalogue-manifest.json")
COVERS = os.path.join(ROOT, "reference", "_covers.json")
SOURCE = json.load(open(os.path.join(ROOT, "reference", "_catalogues.json"), encoding="utf-8"))
SRC_IMG = {c["id"]: c["image"] for c in SOURCE}

TARGET_W = 900
MIN_SIDE = 380
MIN_ASPECT, MAX_ASPECT = 0.35, 2.8
FLAT = 25.0          # stddev below this reads as a wash rather than a picture


def detail(im):
    """Spread of pixel values — high for photographs, near zero for gradients."""
    g = im.convert("L")
    g.thumbnail((160, 160))
    return ImageStat.Stat(g).stddev[0]


def best_image(pdf_path, tmp):
    prefix = os.path.join(tmp, "img")
    try:
        subprocess.run(
            ["pdfimages", "-png", "-f", "1", "-l", "4", pdf_path, prefix],
            check=True, capture_output=True, timeout=150,
        )
    except Exception:
        return None

    cands = []
    for f in glob.glob(prefix + "*.png"):
        try:
            im = Image.open(f)
            w, h = im.size
        except Exception:
            continue
        if min(w, h) < MIN_SIDE:
            continue
        if not (MIN_ASPECT <= w / h <= MAX_ASPECT):
            continue
        try:
            d = detail(im)
        except Exception:
            continue
        cands.append((d, w * h, f))

    if not cands:
        return None
    # Prefer anything that actually looks like a photograph; among those take
    # the largest. Only if none qualify fall back to the most detailed.
    good = [c for c in cands if c[0] >= FLAT]
    if good:
        return max(good, key=lambda c: c[1])[2]
    return max(cands, key=lambda c: c[0])[2]


def save(im, dest):
    if im.width > TARGET_W:
        h = round(im.height * TARGET_W / im.width)
        im = im.resize((TARGET_W, h), Image.LANCZOS)
    im.convert("RGB").save(dest + ".tmp", "WEBP", quality=88, method=6)
    os.replace(dest + ".tmp", dest)


def main():
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
    covers = {c["id"]: c["cover"] for c in json.load(open(COVERS, encoding="utf-8"))["covers"]}
    by_id = {r["id"]: r for r in manifest["catalogues"]}

    fixed = restored = still_flat = 0
    for cid, cover_rel in covers.items():
        cover = os.path.join(ROOT, "public" + cover_rel)
        if not os.path.exists(cover):
            continue
        try:
            if detail(Image.open(cover)) >= FLAT:
                continue          # already fine
        except Exception:
            continue

        rec = by_id.get(cid)
        pdf = os.path.join(ROOT, "public" + rec["file"]) if rec else None
        done = False

        if pdf and os.path.exists(pdf):
            tmp = tempfile.mkdtemp()
            try:
                src = best_image(pdf, tmp)
                if src:
                    im = Image.open(src)
                    if detail(im) >= FLAT:
                        save(im, cover)
                        fixed += 1
                        done = True
            finally:
                shutil.rmtree(tmp, ignore_errors=True)

        if not done:
            # Nothing photographic in the PDF — put the original thumbnail back
            # rather than leaving a wash on the tile.
            url = "https://sarom.info/" + SRC_IMG[cid].lstrip("/")
            try:
                with urllib.request.urlopen(url, timeout=30) as r:
                    data = r.read()
                im = Image.open(_io.BytesIO(data))
                save(im, cover)
                restored += 1
            except Exception as e:
                print(f"  could not restore {cover_rel}: {e}")
                still_flat += 1

    print("\n=== REPAIR DONE ===")
    print("re-extracted a real photo:", fixed)
    print("restored original thumbnail:", restored)
    print("still flat:", still_flat)


if __name__ == "__main__":
    sys.exit(main())
