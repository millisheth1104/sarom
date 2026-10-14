# -*- coding: utf-8 -*-
"""
Adds the five bedding catalogues the client put in Drive on 2026-10-13
("PDF - Website / Bedding PDF"): Bamboo Comforter, Signature, Statement Tape,
Stone Crest, Terra Weave. Every cover carries the "beds&more by sarom" lockup,
so they are Beds & More / Bedding. `type` and `typeRaw` are read off each
cover's own subtitle — nothing invented.

Same pattern as ingest-website-pdfs.py: PDF copied into public/catalogues (the
mirror of what the VPS serves), cover = page 1 at the house spec, `pdf` = the
sarom.co.in URL, ALL_ROTATION rebuilt. Uploading to the server is a separate
step (see .gitignore).

Run:  python -I reference/ingest-bedding-pdfs.py "<folder with the 5 PDFs>"
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

# file in Drive -> (title, type, typeRaw)
PLAN = {
    "BAMBOO COMFORTER.pdf": ("Bamboo Comforter", "Comforter", "100% Bamboo | 200GSM Polywadding"),
    "signature.pdf": ("Signature", "Duvet Cover Set", "9 pc Duvet Cover Set"),
    "Statement Tape.pdf": ("Statement Tape", "Duvet Set", "400 TC Sateen Duvet Set"),
    "Stone Crest.pdf": ("Stone Crest", "Bedcover Set", "Woven Stonewash Bedcover set"),
    "TERRA WEAVE.pdf": ("Terra Weave", "Bedcover Set", "Woven Reversible Bedcover Set"),
}


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and")).strip("-")


def main(src):
    have = set(os.listdir(src))
    missing = set(PLAN) - have
    if missing:
        sys.exit("missing: %s" % sorted(missing))

    s = io.open(TS, encoding="utf-8").read()
    m = re.search(r"(export const CATALOGUES: Catalogue\[\] = )(\[.*?\n\]);", s, re.S)
    arr = json.loads(m.group(2))
    titles = {c["title"].lower() for c in arr}
    next_id = max(c["id"] for c in arr) + 1

    for f, (title, typ, raw) in sorted(PLAN.items(), key=lambda x: x[1][0]):
        if title.lower() in titles:
            print("  skip %s: already catalogued" % title)
            continue
        slug = slugify(title)
        rel = "/catalogues/beds-and-more/bedding/%s.pdf" % slug
        cov = "/catalogues/_covers/beds-and-more/bedding/%s.webp" % slug
        dst = os.path.join(ROOT, "public", rel.lstrip("/"))
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(os.path.join(src, f), dst)

        doc = pymupdf.open(dst)
        page = doc[0]
        k = LONG_EDGE / max(page.rect.width, page.rect.height)
        pix = page.get_pixmap(dpi=int(72 * k * 1.25))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        im.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
        cdst = os.path.join(ROOT, "public", cov.lstrip("/"))
        os.makedirs(os.path.dirname(cdst), exist_ok=True)
        im.save(cdst, "WEBP", quality=QUALITY, method=6)
        pages = len(doc)
        doc.close()

        arr.append({"id": next_id, "title": title, "brand": "Beds & More",
                    "collection": "Bedding", "type": typ, "typeRaw": raw,
                    "cover": cov, "pdf": HOST + rel, "pdfLocal": rel})
        print("  added %-17s id=%d  %dp  cover %dx%d" % (title, next_id, pages, *im.size))
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
