# -*- coding: utf-8 -*-
"""
Adds the catalogue PDFs the client's 2026-10-23 drop ("PDF - Website-...zip")
carried that the site did not have: twelve NEW records plus one gap-fill.

What was deliberately NOT done: the zip also holds 14 PDFs whose NAME is already
catalogued but whose FILE differs (Alma, Atmosphere, Linea, Cleopatra, Sheer
Library II, Alytus, Ducati, Giza, Keiba, Melody, Oscar, Angel, ...). Those are
newer / shorter brochures for existing records, not missing catalogues, so they
are left alone rather than overwriting the file a live link points at.

Same pattern as ingest-bedding-pdfs.py: PDF copied into public/catalogues (the
mirror of what the VPS serves), cover = page 1 at the house spec (1280px long
edge, q82), `pdf` = the sarom.co.in URL, ALL_ROTATION rebuilt. `type` / `typeRaw`
are read off each PDF's own cover text — nothing invented. Uploading to the
server is a separate step (see .gitignore).

Run:  python -I reference/ingest-top5-pdfs.py "<folder holding the extracted 'PDF - Website'>"
"""
import io
import json
import os
import re
import shutil
import sys

import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS = os.path.join(ROOT, "lib", "catalogues.ts")
HOST = "https://sarom.co.in"
LONG_EDGE, QUALITY = 1280, 82

BEDS = "Beds & More"
# file in the zip -> (title, brand, collection, type, typeRaw)
PLAN = [
    # Bedding — the two names that had only a photograph on the homepage…
    ("Bedding PDF/Embroidery.pdf", "Embroidery", BEDS, "Bedding", "Bedsheet Set", "Only embroidered pillow + solid sheet"),
    ("Bedding PDF/linera.pdf", "Linera", BEDS, "Bedding", "Bedsheet Set", "100% cotton stripe double bedsheet set"),
    # …and the four Top-5 bedding names whose tiles opened somebody else's PDF.
    ("Top 5 Bedding/Top 5 Bedding pdf/Ethereal.pdf", "Ethereal", BEDS, "Bedding", "Bedsheet Set", "Yarn dyed Jacquard bedsheet set"),
    ("Top 5 Bedding/Top 5 Bedding pdf/Plush.pdf", "Plush", BEDS, "Bedding", "Bedsheet Set", "6 piece bedsheet set"),
    ("Top 5 Bedding/Top 5 Bedding pdf/thread harmony.pdf", "Thread Harmony", BEDS, "Bedding", "Bedsheet Set", "Flat Sheet Set"),
    ("Top 5 Bedding/Top 5 Bedding pdf/KNITSCAPE (2).pdf", "Knitscape Throws", BEDS, "Bedding", "Throws & Cushion Covers", "Throws | Cushion Cover"),
    # Curtains — the seven Top-5 tiles that linked to the brand wall for want of a PDF.
    ("Top 5 Each Category/SJ/pdf/CLOVI.pdf", "Clovi", "SJ", "Curtains", "Curtain", "Curtains"),
    ("Top 5 Each Category/SJ/pdf/carlos.pdf", "Carlos", "SJ", "Curtains", "Texture Curtain", "Elegant Matte Texture Curtains"),
    ("Top 5 Each Category/OOFY/pdf/Sarom- Cappadocia Collection.pdf", "Cappadocia", "Oofy", "Curtains", "Wider Width Curtain", "Wide Width Luxury Curtains"),
    ("Top 5 Each Category/OOFY/pdf/Sarom- Cascade Collection.pdf", "Cascade", "Oofy", "Curtains", "Wider Width Curtain", "Wide Width Luxury Curtains"),
    ("Top 5 Each Category/OOFY/pdf/cosco.pdf", "Cosco", "Oofy", "Curtains", "Wider Width Curtain", "WIDE WIDTH LUXURY CURTAINS"),
    ("Top 5 Each Category/MATLIN/pdf/Kiara.pdf", "Kiara", "Matlin", "Curtains", "Texture Curtain", "Dry Look Texture Curtains"),
]

# Gap-fill: an EXISTING record (id 46, Cloud, filed under SJ/Curtains) that had
# `pdf: null`. The client's folder files this PDF under OOFY; the record's brand
# is left as it was and only the missing file is supplied.
FILL = ("Top 5 Each Category/OOFY/pdf/CLOUD.pdf", 46)


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and")).strip("-")


def brand_dir(b):
    return slugify(b)


def coll_dir(c):
    return slugify(c)


def cover_from(pdf_path, dst):
    doc = pymupdf.open(pdf_path)
    page = doc[0]
    k = LONG_EDGE / max(page.rect.width, page.rect.height)
    pix = page.get_pixmap(dpi=int(72 * k * 1.25))
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    im.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    pages = len(doc)
    doc.close()
    return pages, im.size


def main(src):
    for f, *_ in PLAN + [FILL + (0,)]:
        if not os.path.exists(os.path.join(src, f)):
            sys.exit("missing in the extracted drop: %s" % f)

    s = io.open(TS, encoding="utf-8").read()
    m = re.search(r"(export const CATALOGUES: Catalogue\[\] = )(\[.*?\n\]);", s, re.S)
    arr = json.loads(m.group(2))
    have = {(c["title"].lower(), c["brand"], c["collection"]) for c in arr}
    next_id = max(c["id"] for c in arr) + 1

    for f, title, brand, coll, typ, raw in PLAN:
        if (title.lower(), brand, coll) in have:
            print("  skip %s: already catalogued" % title)
            continue
        slug = slugify(title)
        sub = "%s/%s" % (brand_dir(brand), coll_dir(coll))
        rel = "/catalogues/%s/%s.pdf" % (sub, slug)
        cov = "/catalogues/_covers/%s/%s.webp" % (sub, slug)
        dst = os.path.join(ROOT, "public", rel.lstrip("/"))
        if os.path.exists(dst):
            sys.exit("refusing to overwrite an existing file: %s" % rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(os.path.join(src, f), dst)
        pages, size = cover_from(dst, os.path.join(ROOT, "public", cov.lstrip("/")))
        arr.append({"id": next_id, "title": title, "brand": brand, "collection": coll,
                    "type": typ, "typeRaw": raw, "cover": cov, "pdf": HOST + rel, "pdfLocal": rel})
        print("  added %-17s id=%d  %-11s %dp  cover %dx%d" % (title, next_id, brand, pages, *size))
        next_id += 1

    # gap-fill
    f, rid = FILL
    rec = next(c for c in arr if c["id"] == rid)
    if rec["pdf"]:
        print("  skip fill %s: already has a PDF" % rec["title"])
    else:
        rel = "/catalogues/%s/%s/%s.pdf" % (brand_dir(rec["brand"]), coll_dir(rec["collection"]), slugify(rec["title"]))
        dst = os.path.join(ROOT, "public", rel.lstrip("/"))
        if os.path.exists(dst):
            sys.exit("refusing to overwrite an existing file: %s" % rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(os.path.join(src, f), dst)
        rec["pdf"] = HOST + rel
        rec["pdfLocal"] = rel
        print("  filled %-16s id=%d  <- %s" % (rec["title"], rid, rel))

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
        for k_ in ("curtains", "upholstery", "bedsheets"):
            if i < len(buckets[k_]):
                rot.append(buckets[k_][i]["id"])
        i += 1

    s = s[:m.start(2)] + json.dumps(arr, indent=2, ensure_ascii=False) + ";" + s[m.end(0):]
    s = re.sub(r"(export const ALL_ROTATION: number\[\] = )\[[^\]]*\];",
               lambda mm: mm.group(1) + json.dumps(rot) + ";", s)
    io.open(TS, "w", encoding="utf-8", newline="\n").write(s)
    print("records now %d, ALL_ROTATION %d" % (len(arr), len(rot)))


if __name__ == "__main__":
    main(sys.argv[1])
