# -*- coding: utf-8 -*-
"""
Ingest for the client's "PDF - Website" drop (2026-10-12 zip, 56 files).

The zip is a SUPERSET of the 2026-10-05 one: 49 files byte-identical, 7 new
(6 under "Bedding PDF/", plus Curtain PDF/artemis.pdf). What matters more is
that NONE of the 26 catalogue PDFs in it had ever been wired in. The 209
records in lib/catalogues.ts all came from the sarom.info scrape, and not one
of these 20 curtain or 6 bedding collections exists there - checked against
the live ecatalogue.php on the day, zero hits for all twenty.

BRAND comes from evidence, never from a filename:

  * The COVERS carry a brand. Rendering page 1 of each shows every bedding
    PDF under the "beds&more by sarom" lockup and every curtain PDF under
    "sarom(tm) for your home" - the master brand, which is NOT one of the
    five house brands in BRAND_ORDER. So the cover alone settles the bedding
    six and cannot place a single curtain.
  * The client's own brand-named WeTransfer zips can. wetransfer_sj_* and
    wetransfer_oofy_* hold the cover photography for these same collections,
    and which zip a name arrives in is a direct statement of its brand. That
    resolves 11. "Top 5 Each Category/MATLIN/Kausheya.png" resolves a 12th,
    and Cinthia is already a Matlin record, which resolves the 13th.
  * SEVEN have no evidence anywhere: Bravia, Cabo, Chelsea, Columbus,
    Croshia, Elka, Geneva. They are DEFAULTED to SJ and flagged in the
    output. A default is not a finding - these are the rows to confirm.

TYPE is read off each PDF's own cover subtitle, so nothing is invented:
"Everyday Jacquard Curtains", "Cotton reversible comforter set 300 TC", etc.

Wilbert is filed Upholstery/Curtain rather than Curtains because its own
cover says "A refined dual-purpose fabric for Curtains and Upholstery".

Run:  python -I reference/ingest-website-pdfs.py "<path to the zip>"
"""
import io
import json
import os
import re
import shutil
import sys
import zipfile

import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public", "catalogues")
TS = os.path.join(ROOT, "lib", "catalogues.ts")
LONG_EDGE, QUALITY = 1280, 82          # same spec as ingest-bedding.py

BRAND_DIR = {"SJ": "sj", "Oofy": "oofy", "Matlin": "matlin",
             "Smart Plus": "smart-plus", "Beds & More": "beds-and-more"}
COLL_DIR = {"Curtains": "curtains", "Upholstery": "upholstery",
            "Upholstery/Curtain": "upholstery-curtain", "Bedding": "bedding"}

# zip stem -> (title, brand, brand evidence, collection, type, typeRaw)
PLAN = {
    # ---- Curtain PDF/ : brand from the client's brand-named WeTransfer zips
    "artemis": ("Artemis", "Oofy", "wetransfer_oofy", "Curtains",
                "Wider Width Sheer", "Wider width sheer curtains"),
    "Cleopatra": ("Cleopatra", "Oofy", "wetransfer_oofy + excel OOFY", "Curtains",
                  "Wider Width Curtain", "Wide Width Luxury Curtain"),
    "Cimora.": ("Cimora", "SJ", "wetransfer_sj", "Curtains",
                "Texture Curtain", "Luxury Texture Curtains"),
    "Cortina pdf.": ("Cortina", "SJ", "wetransfer_sj", "Curtains",
                     "Jacquard Curtain", "Threads of art, woven in jacquard"),
    "Crimson.": ("Crimson", "SJ", "wetransfer_sj", "Curtains",
                 "Printed Texture Curtain", "Printed Texture Curtains"),
    "Gravia": ("Gravia", "SJ", "wetransfer_sj", "Curtains",
               "Jacquard Curtain", "Everyday Jacquard Curtains"),
    "Kalakriti pdf": ("Kalakriti", "SJ", "wetransfer_sj", "Curtains",
                      "Embroidered Sheer", "The art of sheer embroidery"),
    "Salem": ("Salem", "SJ", "wetransfer_sj", "Curtains",
              "Plain Sheer", "Sheer Curtains"),
    "Savia": ("Savia", "SJ", "wetransfer_sj", "Curtains",
              "Jacquard Curtain", "Everyday Jacquard Curtains"),
    "sheer library  I & II": ("Sheer Library I & II", "SJ", "wetransfer_sj + excel SJ",
                              "Curtains", "Wider Width Sheer",
                              "Wide-width sheer curtain fabrics"),
    "Wilbert.": ("Wilbert", "SJ", "wetransfer_sj", "Upholstery/Curtain",
                 "Velvet", "Soft Fall Luxury Curtain - dual purpose"),
    "Kausheya": ("Kausheya", "Matlin", "Top 5 Each Category/MATLIN", "Curtains",
                 "Embroidered Linen", "Embroidery & Linen Curtains"),
    # Already a Matlin record (id 142, Upholstery/Curtain). The existing
    # collection is kept - its own cover says "BOUCLE CURTAINS" but the live
    # record calls it dual-purpose, and the live record is the published
    # claim. Only the cover and PDF are attached.
    "cinthia": ("Cinthia", "Matlin", "existing record", "Upholstery/Curtain",
                "Boucle Curtain", "Boucle Curtains"),
    # ---- no brand evidence anywhere: DEFAULTED to SJ, confirm these seven
    "Bravia": ("Bravia", "SJ", "DEFAULT", "Curtains",
               "Jacquard Curtain", "Everyday Jacquard Curtains"),
    "Cabo": ("Cabo", "SJ", "DEFAULT", "Curtains",
             "Boucle Curtain", "Boucle Curtains"),
    "Chelsea.": ("Chelsea", "SJ", "DEFAULT", "Curtains",
                 "Chenille Jacquard", "Luxury Chenille Jacquard Curtains"),
    "Columbus. (2)": ("Columbus", "SJ", "DEFAULT", "Curtains",
                      "Boucle Texture", "Boucle & Matte Texture Curtains"),
    "Croshia ": ("Croshia", "SJ", "DEFAULT", "Curtains",
                 "Embroidered Linen", "Linen Look Embroidery"),
    "ELKA": ("Elka", "SJ", "DEFAULT", "Curtains",
             "Chenille", "Chenille Texture Curtain"),
    "Geneva..": ("Geneva", "SJ", "DEFAULT", "Curtains",
                 "Jacquard Curtain", "Where threads meet attitude"),
    # ---- Bedding PDF/ : every cover carries the beds&more lockup
    "KNITSCAPE": ("Knitscape", "Beds & More", "cover lockup", "Bedding",
                  "Comforter Set", "Cotton reversible comforter set 300 TC | King size"),
    "SOFT HAVEN": ("Soft Haven", "Beds & More", "cover lockup", "Bedding",
                   "Comforter Set", "Cotton reversible comforter set 300 TC | King size"),
    "Woven Harmony": ("Woven Harmony", "Beds & More", "cover lockup", "Bedding",
                      "Bedcover Set", "Cotton soft layered woven bedcover set | King size"),
    "bare earth": ("Bare Earth", "Beds & More", "cover lockup", "Bedding",
                   "Bedcover Set", "100% cotton 4 layer gauze bedcover set | King size"),
    "LINEN & THREAD ": ("Linen & Thread", "Beds & More", "cover lockup", "Bedding",
                        "Bedsheet Set", "100% cotton double bedsheet set 400 TC | King size"),
    "Natura": ("Natura", "Beds & More", "cover lockup", "Bedding",
               "Bedsheet Set", "100% Bamboo double bedsheet set | King size"),
}


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and")).strip("-")


def main(zip_path):
    zf = zipfile.ZipFile(zip_path)
    members = {}
    for i in zf.infolist():
        if i.is_dir() or not i.filename.lower().endswith(".pdf"):
            continue
        members[os.path.splitext(os.path.basename(i.filename))[0]] = i

    missing = set(PLAN) - set(members)
    extra = set(members) - set(PLAN)
    if missing:
        sys.exit("zip is missing planned stems: %s" % sorted(missing))
    if extra:
        sys.exit("zip has unplanned PDFs: %s" % sorted(extra))

    src = io.open(TS, encoding="utf-8").read()
    m = re.search(r"(export const CATALOGUES[^=]*=\s*)(\[.*?\n\]);", src, re.S)
    arr = json.loads(m.group(2))
    by_title = {c["title"].lower(): c for c in arr}
    next_id = max(c["id"] for c in arr) + 1

    added, updated = [], []
    for stem, (title, brand, why, coll, typ, raw) in sorted(PLAN.items(),
                                                            key=lambda x: x[1][0]):
        slug = slugify(title)
        bd, cd = BRAND_DIR[brand], COLL_DIR[coll]
        pdf_rel = "/catalogues/%s/%s/%s.pdf" % (bd, cd, slug)
        cov_rel = "/catalogues/_covers/%s/%s/%s.webp" % (bd, cd, slug)

        # --- PDF straight out of the zip, streamed ---
        dst = os.path.join(PUB, bd, cd, slug + ".pdf")
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        with zf.open(members[stem]) as f, open(dst, "wb") as o:
            shutil.copyfileobj(f, o, 8 << 20)

        # --- cover = page 1, rendered then downsampled to the house spec ---
        doc = pymupdf.open(dst)
        page = doc[0]
        scale = LONG_EDGE / max(page.rect.width, page.rect.height)
        pix = page.get_pixmap(dpi=int(72 * scale * 1.25))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        im.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
        pages = len(doc)
        doc.close()
        cdst = os.path.join(PUB, "_covers", bd, cd, slug + ".webp")
        os.makedirs(os.path.dirname(cdst), exist_ok=True)

        # NEVER downgrade a cover that is already there. A PDF's page 1 is a
        # catalogue title page; the covers already on disk are the client's
        # product photography, and Cinthia's is 1234x1280 against the 905x1280
        # this render produces. Where one exists and is larger, keep it and
        # attach the PDF only.
        keep = False
        if os.path.exists(cdst):
            with Image.open(cdst) as old:
                keep = old.size[0] * old.size[1] >= im.size[0] * im.size[1]
        if not keep:
            im.save(cdst, "WEBP", quality=QUALITY, method=6)

        rec = by_title.get(title.lower())
        if rec:
            # Cinthia already exists as a Matlin record - attach, don't duplicate.
            rec.update(pdf=pdf_rel, pdfLocal=pdf_rel)
            if not keep:
                rec["cover"] = cov_rel
            updated.append((title, brand, why + ("; cover kept" if keep else "; cover replaced"),
                            rec["id"]))
        else:
            arr.append({"id": next_id, "title": title, "brand": brand,
                        "collection": coll, "type": typ, "typeRaw": raw,
                        "cover": cov_rel, "pdf": pdf_rel, "pdfLocal": pdf_rel})
            added.append((title, brand, why, next_id, pages, im.size))
            next_id += 1

    # ---- rebuild ALL_ROTATION over the new set, same algorithm as gen ----
    usable = [c for c in arr if c["pdf"] and c["cover"]]

    def bucket_of(c):
        if c["brand"] == "Beds & More":
            return "bedsheets"
        return "upholstery" if c["collection"] == "Upholstery" else "curtains"

    buckets = {"curtains": [], "upholstery": [], "bedsheets": []}
    for c in usable:
        buckets[bucket_of(c)].append(c)
    for b in buckets.values():
        b.sort(key=lambda c: c["title"].lower())
    rot, i = [], 0
    while True:
        any_added = False
        for k in ("curtains", "upholstery", "bedsheets"):
            if i < len(buckets[k]):
                rot.append(buckets[k][i]["id"])
                any_added = True
        if not any_added:
            break
        i += 1

    # indent=2 already reproduces the file's own layout ("  {" then '    "id"').
    # Re-indenting on top of it shifts every record two columns and leaves the
    # closing bracket indented, which is a diff on all 234 records for nothing.
    body = json.dumps(arr, indent=2, ensure_ascii=False)
    out = src[:m.start(2)] + body + ";" + src[m.end(0):]
    out = re.sub(r"(export const ALL_ROTATION: number\[\] = )\[[^\]]*\];",
                 lambda mm: mm.group(1) + json.dumps(rot) + ";", out)
    out = out.replace(
        'export const COLLECTIONS = ["Curtains", "Upholstery", "Upholstery/Curtain"] as const;',
        'export const COLLECTIONS = ["Curtains", "Upholstery", "Upholstery/Curtain", "Bedding"] as const;')
    io.open(TS, "w", encoding="utf-8", newline="\n").write(out)

    print("ADDED %d" % len(added))
    for t, b, w, i_, pg, sz in added:
        print("  %-20s %-12s id=%-4d %dp  %dx%d   [%s]" % (t, b, i_, pg, sz[0], sz[1], w))
    print("UPDATED %d" % len(updated))
    for t, b, w, i_ in updated:
        print("  %-20s %-12s id=%-4d [%s]" % (t, b, i_, w))
    print("records %d -> %d   ALL_ROTATION %d"
          % (len(arr) - len(added), len(arr), len(rot)))
    zf.close()


if __name__ == "__main__":
    main(sys.argv[1])
