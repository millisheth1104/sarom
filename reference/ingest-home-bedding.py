# -*- coding: utf-8 -*-
"""
Photographs for the homepage Collections (03) Bedsheets tab, for the bedding
names in the client's sheet that have NO catalogue PDF yet.

Those tiles show the client's photograph and open the e-catalogue's Bedsheets
section instead of a PDF (client's instruction, 2026-10-14). The photographs
come from the 2026-10-01 bedding drop, which arrived as a zip of two zips.
Reads with the same CMYK / 5-channel-TIFF-aware opener as the showroom ingest.

Run:  python -I reference/ingest-home-bedding.py <scratch-dir>
Writes public/media/collections/bedding/<slug>.webp (long edge 1600).
"""
import importlib.util
import io
import os
import re
import sys
import zipfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTER = os.path.join(ROOT, "wetransfer_wetransfer_bedding_2026-10-01_0725-zip_2026-10-05_1437.zip")
OUT = os.path.join(ROOT, "public", "media", "collections", "bedding")
LONG_EDGE, QUALITY = 1600, 82

# The names with no PDF. Keyed by slug; value = the member name inside the inner zips.
WANT = {
    # The other five (Terra Weave, Stone Crest, Bamboo Comforter, Statement Tape,
    # Signature) got real catalogues on 2026-10-14 and no longer need a photo.
    "embroidery": "Embroidery.jpg",
    "linera": "Linera.png",
}

spec = importlib.util.spec_from_file_location(
    "showroom_ingest", os.path.join(ROOT, "reference", "ingest-showroom.py"))
ingest = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ingest)


def main(scratch):
    os.makedirs(scratch, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    found = {}
    outer = zipfile.ZipFile(OUTER)
    for inner_name in outer.namelist():
        if not inner_name.endswith(".zip"):
            continue
        inner = zipfile.ZipFile(io.BytesIO(outer.read(inner_name)))
        for m in inner.namelist():
            for slug, want in WANT.items():
                if os.path.basename(m) == want:
                    tmp = os.path.join(scratch, "hb_" + want)
                    open(tmp, "wb").write(inner.read(m))
                    found[slug] = tmp
    missing = sorted(set(WANT) - set(found))
    if missing:
        sys.exit("not found in the bedding zips: %s" % missing)
    for slug, tmp in sorted(found.items()):
        im = ingest.to_srgb(ingest.open_any(tmp))
        native = im.size
        im.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
        dest = os.path.join(OUT, slug + ".webp")
        im.save(dest, "WEBP", quality=QUALITY, method=6)
        os.remove(tmp)
        print("%-18s %5dx%-5d -> %dx%d  %dKB" % (slug, native[0], native[1],
              im.size[0], im.size[1], os.path.getsize(dest) // 1024))


if __name__ == "__main__":
    main(sys.argv[1])
