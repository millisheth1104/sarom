"""Re-picks covers that landed on a swatch/label card instead of product
photography.

The original pass scored every embedded image across the whole PDF, so an
interior swatch sheet could outscore the hero shot. This one looks at the front
pages only and takes the largest well-proportioned photo it finds, which on a
Sarom catalogue is the styled product image under the logo.

Writes candidates to a staging directory — nothing is overwritten until the
candidates have been reviewed.
"""
import glob
import json
import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image, ImageStat

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POPPLER = r"C:\Users\Lenovo\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin"
TARGET_W = 900
MIN_W, MIN_H = 320, 320


def candidates_from(pdf, page):
    """Every embedded image on one page, as (score, PIL image)."""
    tmp = tempfile.mkdtemp()
    out = []
    try:
        subprocess.run(
            [os.path.join(POPPLER, "pdfimages"), "-png", "-f", str(page), "-l", str(page), pdf, os.path.join(tmp, "i")],
            check=False, capture_output=True,
        )
        for f in sorted(glob.glob(os.path.join(tmp, "i*.png"))):
            try:
                im = Image.open(f)
                im.load()
            except Exception:
                continue
            w, h = im.size
            if w < MIN_W or h < MIN_H:
                continue
            ar = w / h
            # a hero shot is roughly photographic in proportion; swatch strips
            # and full-page scans are extreme
            if ar < 0.45 or ar > 2.6:
                continue
            g = im.convert("L")
            detail = ImageStat.Stat(g).stddev[0]
            # detail keeps flat colour cards out; area prefers the hero over
            # small logos and icons
            out.append((detail * (w * h) ** 0.35, im.convert("RGB")))
        out.sort(key=lambda t: -t[0])
        return [im for _, im in out[:1]]
    finally:
        pass  # tmp cleaned by caller via returned loaded images


def main():
    targets = json.load(open(sys.argv[1], encoding="utf-8"))
    stage = sys.argv[2]
    os.makedirs(stage, exist_ok=True)
    report = []

    for t in targets:
        pdf = os.path.join(ROOT, "public", t["pdfLocal"].lstrip("/"))
        if not os.path.exists(pdf):
            report.append({**t, "status": "no-pdf"})
            continue
        picked = None
        for page in (1, 2, 3):
            got = candidates_from(pdf, page)
            if got:
                picked = got[0]
                break
        if picked is None:
            report.append({**t, "status": "no-candidate"})
            continue
        if picked.width > TARGET_W:
            h = round(picked.height * TARGET_W / picked.width)
            picked = picked.resize((TARGET_W, h), Image.LANCZOS)
        dest = os.path.join(stage, os.path.basename(t["cover"]))
        picked.save(dest, "WEBP", quality=88, method=6)
        report.append({**t, "status": "ok", "page": page, "staged": dest,
                       "size": f"{picked.width}x{picked.height}"})
        print(f"  {t['title']:<22} page {page}  {picked.width}x{picked.height}")

    with open(os.path.join(stage, "report.json"), "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2)
    ok = sum(1 for r in report if r["status"] == "ok")
    print(f"\nstaged {ok}/{len(targets)}")


if __name__ == "__main__":
    main()
