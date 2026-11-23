# -*- coding: utf-8 -*-
"""
Adds the five upholstery catalogues the client sent on 2026-11-23: Alfredo,
Ashwood, Benny, Pinecrest, Sonet. Smart Plus, 6 pages each, all one template.

What was found, rather than assumed:
  * ALFREDO is NOT new to the site. Its PDF is byte-identical (same md5) to the
    one already live as record 120, which sarom.info filed under SJ / "Digital
    Print". The PDF's own cover says Luxe Chenille Upholstery and carries the
    Smart Plus badge, so record 120 is CORRECTED (brand, type) instead of a
    duplicate being added, and nothing is uploaded for it.
  * The other four are new files. Only Alfredo and Sonet show a Smart Plus badge
    inside the PDF; Ashwood, Benny and Pinecrest show none. All five are filed
    under Smart Plus because they are one batch in one template — a call to
    confirm with the client, and one line (BRAND below) to change.

Covers are the hero photograph from page 1, cropped, which is what the existing
Smart Plus covers are (not the whole page with its logo and title block). The
crops are fixed boxes read off the renders, in 700px-wide page coordinates.
Alfredo's existing 718x756 cover is replaced by the same photo at full
resolution, same path.

Needs no PyMuPDF (blocked on this machine): page 1 comes from
render-pdf-page1.mjs.

Run:
  node reference/render-pdf-page1.mjs <renders> "<ALFREDO (1).pdf>" "<ASHWOOD (1) (1).pdf>" ...
  python -I reference/ingest-upholstery-nov.py "<folder with the 5 PDFs>" "<renders>"
"""
import io
import json
import os
import re
import shutil
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS = os.path.join(ROOT, "lib", "catalogues.ts")
HOST = "https://sarom.co.in"
LONG_EDGE, QUALITY = 1280, 82
BRAND = "Smart Plus"

# render name -> (pdf file, title, type, typeRaw, hero crop box in 700px-wide coordinates)
NEW = [
    ("ashwood", "ASHWOOD (1) (1).pdf", "Ashwood", "Woven", "Woven Look Upholstery", (42, 322, 658, 1203)),
    ("benny", "BENNY (1).pdf", "Benny", "Chenille", "Two Tone Chenille Texture", (42, 310, 658, 1188)),
    ("pinecrest", "PINECREST (3).pdf", "Pinecrest", "Soft Texture", "Soft Texture Upholstery", (42, 291, 658, 1171)),
    ("sonet", "SONET (1).pdf", "Sonet", "Leather", "Simply Leather", (42, 212, 658, 860)),
]
ALFREDO = ("alfredo", 120, (42, 212, 658, 860), "Chenille", "Luxe Chenille Upholstery")


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def hero(render_png, box, dst):
    im = Image.open(render_png).convert("RGB")
    c = im.crop(tuple(v * 2 for v in box))          # renders are 2x
    c.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    c.save(dst, "WEBP", quality=QUALITY, method=6)
    return c.size


def main(src, renders):
    s = io.open(TS, encoding="utf-8").read()
    m = re.search(r"(export const CATALOGUES: Catalogue\[\] = )(\[.*?\n\]);", s, re.S)
    arr = json.loads(m.group(2))
    have = {(c["title"].lower(), c["brand"]) for c in arr}
    next_id = max(c["id"] for c in arr) + 1

    # ---- Alfredo: correct the existing record, refresh its cover
    name, rid, box, typ, raw = ALFREDO
    rec = next(c for c in arr if c["id"] == rid)
    assert rec["title"] == "Alfredo", rec
    before = (rec["brand"], rec["type"], rec["typeRaw"])
    rec["brand"], rec["type"], rec["typeRaw"] = BRAND, typ, raw
    size = hero(os.path.join(renders, "hi-%s.png" % name), box,
                os.path.join(ROOT, "public", rec["cover"].lstrip("/")))
    print("  Alfredo id=%d corrected %s -> %s; cover refreshed %dx%d" % (rid, before, (BRAND, typ, raw), *size))

    # ---- the four new ones
    for name, f, title, typ, raw, box in NEW:
        if (title.lower(), BRAND) in have:
            print("  skip %s: already catalogued" % title)
            continue
        slug = slugify(title)
        rel = "/catalogues/smart-plus/upholstery/%s.pdf" % slug
        cov = "/catalogues/_covers/smart-plus/upholstery/%s.webp" % slug
        dst = os.path.join(ROOT, "public", rel.lstrip("/"))
        if os.path.exists(dst):
            sys.exit("refusing to overwrite an existing file: %s" % rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(os.path.join(src, f), dst)
        size = hero(os.path.join(renders, "hi-%s.png" % name), box,
                    os.path.join(ROOT, "public", cov.lstrip("/")))
        arr.append({"id": next_id, "title": title, "brand": BRAND, "collection": "Upholstery",
                    "type": typ, "typeRaw": raw, "cover": cov, "pdf": HOST + rel, "pdfLocal": rel})
        print("  added %-10s id=%d  cover %dx%d" % (title, next_id, *size))
        next_id += 1

    # ALL_ROTATION — same round-robin as gen-catalogues.mjs
    usable = [c for c in arr if c["pdf"] and c["cover"]]

    def bucket(c):
        if c["brand"] == "Beds & More":
            return "bedsheets"
        return "upholstery" if c["collection"] == "Upholstery" else "curtains"

    buckets = {"curtains": [], "upholstery": [], "bedsheets": []}
    for c in usable:
        buckets[bucket(c)].append(c)
    for b in buckets.values():
        b.sort(key=lambda c: c["title"].lower())
    rot, i = [], 0
    while any(i < len(b) for b in buckets.values()):
        for k in ("curtains", "upholstery", "bedsheets"):
            if i < len(buckets[k]):
                rot.append(buckets[k][i]["id"])
        i += 1

    s = s[:m.start(2)] + json.dumps(arr, indent=2, ensure_ascii=False) + ";" + s[m.end(0):]
    s = re.sub(r"(export const ALL_ROTATION: number\[\] = )\[[^\]]*\];",
               lambda mm: mm.group(1) + json.dumps(rot) + ";", s)
    io.open(TS, "w", encoding="utf-8", newline="\n").write(s)
    print("records now %d, ALL_ROTATION %d" % (len(arr), len(rot)))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
