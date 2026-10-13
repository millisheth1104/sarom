# -*- coding: utf-8 -*-
"""
Showroom ("02") tiles for SJ, Oofy, Matlin and Smart Plus — built from the
client's four brand zips of 2026-10-13 (5 photographs each).

WHAT THE ZIPS ARE
  Each brand zip holds five small web images (291x222, 274x235 or 581x313).
  The three sizes are the three SLOTS of the showroom bento, so the client has
  already chosen which photograph goes where:
           291x222 -> the three top cards      (tiles 0-2)
           581x313 -> the wide feature image   (tile 3)
           274x235 -> the side panel image     (tile 4)

THEY ARE NOT THE PRINT ORIGINALS UNDER THE SAME NAMES
  The obvious plan was to re-cut each one from the print original of the same
  name already in the repo root (ABACA.tif, Alma.tif ...) so a 581px crop is not
  enlarged to 1240px. That was tried properly - SIFT, then template matching
  over scale and position on both brightness and edge maps - and it is wrong
  for 16 of 20: side by side, the supplied "Abaca" is a swatch screen in a room
  and ABACA.tif is three curtain drops. Different photographs sharing a
  collection name. (An earlier pass accepted two false matches at score 0.87
  and 1.00 on blank wall; both shipped as 1 KB files. The acceptance floor is
  now 0.95 AND the match is restricted to the keys below.)

  Exactly three ARE the same picture as their original, at score 1.00:
  Cascade, Linea and Ducati. Those are re-cut at full resolution. Every other
  tile ships as supplied; no source with more pixels exists in the repo, the
  zips or the same-named catalogue PDFs (searched), so they are low-resolution
  and the report says so. Replacing them needs the client's larger files.

BEDS & MORE (2026-10-13, "Top 5 Bedding" zip) is different again: five FULL
print originals, no slot sizes, and each one is - at correlation 1.000 - the
existing cover of a Beds & More catalogue with a hosted PDF (Ethereal ->
Iconique, Plush -> Jardin, Thread Harmony -> Jasper, Knitscape Throws ->
Mouvement, Terra Weave -> Refuge). They are downscaled whole, not cropped.

Run:  python -I reference/ingest-showroom.py <scratch-dir>
Writes public/media/showroom/<brand>/<slug>.webp and prints a report; the data
side (which catalogue each tile links to) lives in lib/catalogues.ts.
"""
import io
import os
import re
import struct
import sys
import zipfile

import cv2
import numpy as np
from PIL import Image, ImageCms

Image.MAX_IMAGE_PIXELS = None
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DL = os.path.expanduser("~/Downloads")
OUT = os.path.join(ROOT, "public", "media", "showroom")
SRGB = ImageCms.createProfile("sRGB")
LONG_EDGE, QUALITY = 1600, 82

BRAND_ZIPS = {
    "sj": "SJ-20261013T103755Z-1-001.zip",
    "oofy": "OOFY-20261013T103803Z-1-001.zip",
    "matlin": "MATLIN-20261013T103806Z-1-001.zip",
    "smart-plus": "Smartplus-20261013T103759Z-1-001.zip",
}

# Where each photograph's ORIGINAL lives. ("root", file) = a loose file in the
# repo root; (zip, member) = inside a WeTransfer archive in the repo root;
# a nested tuple reaches into a zip inside a zip.
SM = "wetransfer_smartplus_2026-09-28_0806.zip"
CURT = "wetransfer_wetransfer_curtains_2026-09-23_1051-zip_2026-10-01_0945.zip"
RECUT = {"cascade", "linea", "ducati"}   # verified identical to the original, score 1.00

ORIGINALS = {
    "abaca": [("root", "ABACA.tif")],
    "alma": [("root", "Alma.tif")],
    # Carlos arrived twice; whichever one the crop actually matches wins.
    "carlos": [("root", "Carlos.tif"), ("root", "Carlos 2.tif")],
    "colvi": [("root", "CLOVI.jpg")],
    "sheer-library-2": [("root", "Sheer Library 2.tif")],
    "cappadocia": [("root", "CAPPADOCIA.tif")],
    "cascade": [("root", "Cascade.tif")],
    "cleopatra": [("root", "cleopatra.tif")],
    "cloud": [("root", "Cloud.tif")],
    "cosco": [("root", "cosco.tif")],
    "linea": [(CURT, "wetransfer_curtains_2026-09-24_0615.zip", "Linea.tif")],
    "alytus": [(SM, "Alytus.png")],
    "ducati": [(SM, "Ducati.tif")],
    "giza": [(SM, "Giza.tif")],
    "keiba": [(SM, "kEIBA.tif")],
    "melody": [(SM, "melody.png")],
}


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def read_cmyka_tiff(path):
    """5-channel CMYK+alpha TIFF, which Pillow cannot open at all."""
    f = open(path, "rb")
    f.seek(4)
    f.seek(struct.unpack("<I", f.read(4))[0])
    n = struct.unpack("<H", f.read(2))[0]
    tags = {}
    for _ in range(n):
        tag, typ, cnt = struct.unpack("<HHI", f.read(8))
        raw = f.read(4)
        size = {1: 1, 3: 2, 4: 4}.get(typ, 4)
        tags[tag] = (typ, cnt, raw, None if cnt * size <= 4 else struct.unpack("<I", raw)[0])

    def v(tag):
        typ, cnt, raw, ptr = tags[tag]
        fmt = {1: "B", 3: "H", 4: "I"}.get(typ, "I")
        sz = struct.calcsize("<" + fmt)
        if ptr is None:
            return list(struct.unpack("<" + fmt * cnt, raw[: sz * cnt]))
        f.seek(ptr)
        return list(struct.unpack("<" + fmt * cnt, f.read(sz * cnt)))

    w, h, spp = v(256)[0], v(257)[0], v(277)[0]
    icc = None
    if 34675 in tags:
        _, cnt, _, ptr = tags[34675]
        f.seek(ptr)
        icc = f.read(cnt)
    buf = bytearray()
    for o, c in zip(v(273), v(279)):
        f.seek(o)
        buf += f.read(c)
    f.close()
    a = np.frombuffer(bytes(buf), dtype=np.uint8)[: w * h * spp].reshape(h, w, spp)
    im = Image.fromarray(np.ascontiguousarray(a[:, :, :4]), mode="CMYK")
    if icc:
        im.info["icc_profile"] = icc
    return im


def to_srgb(im):
    icc = im.info.get("icc_profile")
    if im.mode == "CMYK" and icc:
        try:
            return ImageCms.profileToProfile(
                im, ImageCms.ImageCmsProfile(io.BytesIO(icc)), SRGB,
                renderingIntent=0, outputMode="RGB")
        except Exception:                                  # noqa: BLE001
            pass
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[3])
        return bg
    return im.convert("RGB")


def open_any(path):
    try:
        im = Image.open(path)
        im.load()
        return im
    except Exception:                                      # noqa: BLE001
        if path.lower().endswith((".tif", ".tiff")):
            return read_cmyka_tiff(path)
        raise


def extract(spec, scratch):
    """Materialise an ORIGINALS entry on disk and return its path."""
    if spec[0] == "root":
        return os.path.join(ROOT, spec[1])
    zpath = os.path.join(ROOT, spec[0])
    out = os.path.join(scratch, "o_" + os.path.basename(spec[-1]))
    zf = zipfile.ZipFile(zpath)
    if len(spec) == 3:                                     # nested zip
        inner = zipfile.ZipFile(io.BytesIO(zf.read(spec[1])))
        data = inner.read(spec[2])
    else:
        data = zf.read(spec[1])
    open(out, "wb").write(data)
    return out


SIFT = cv2.SIFT_create(nfeatures=4000)


def gray(im, maxd):
    g = np.asarray(im.convert("L"))
    k = maxd / max(g.shape)
    if k < 1:
        g = cv2.resize(g, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)
    else:
        k = 1.0
    return g, k


def locate(small, big):
    """Rectangle of `big` (original px) that `small` was cut from, or None."""
    gs, _ = gray(small, 900)
    ks = gs.shape[1] / small.size[0]
    gb, kb = gray(big, 2400)
    ks_pts, ds = SIFT.detectAndCompute(gs, None)
    kb_pts, db = SIFT.detectAndCompute(gb, None)
    if ds is None or db is None:
        return None
    m = cv2.BFMatcher().knnMatch(ds, db, k=2)
    good = [a for a, b in (x for x in m if len(x) == 2) if a.distance < 0.75 * b.distance]
    if len(good) < 8:
        return {"inliers": len(good)}
    src = np.float32([ks_pts[g.queryIdx].pt for g in good])
    dst = np.float32([kb_pts[g.trainIdx].pt for g in good])
    A, inl = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=3.0)
    if A is None:
        return {"inliers": 0}
    n_in = int(inl.sum())
    w, h = small.size
    corners = np.float32([[0, 0], [w * ks, 0], [w * ks, h * ks], [0, h * ks]])
    mapped = (cv2.transform(corners[None], A)[0]) / kb
    rot = float(np.degrees(np.arctan2(A[1, 0], A[0, 0])))
    x0, y0 = mapped.min(axis=0)
    x1, y1 = mapped.max(axis=0)
    return {"inliers": n_in, "box": (x0, y0, x1, y1), "rot": rot,
            "scale": float(np.hypot(A[0, 0], A[1, 0]) / kb * ks)}


def _edges(g):
    """Gradient magnitude. Correlating THESE rather than raw brightness makes
    the match immune to the tone curve: the originals are CMYK print files and
    the supplied crops were exported through a different colour path, so the
    same pixel can differ in brightness by a lot while its edges do not move."""
    gx = cv2.Sobel(g, cv2.CV_32F, 1, 0, ksize=3)
    gy = cv2.Sobel(g, cv2.CV_32F, 0, 1, ksize=3)
    return cv2.GaussianBlur(cv2.magnitude(gx, gy), (0, 0), 1.0)


def locate_tm(small, big, lo=0.05):
    """Template-match `small` inside `big` over crop-width fraction and offset.

    Searches crop widths from the full original down to `lo` of it, on a
    log-spaced grid, then refines around the winner. Correlates both brightness
    and edge maps and keeps the better score."""
    sw, sh = small.size
    gs_b = cv2.GaussianBlur(np.asarray(small.convert("L")), (0, 0), 1.0)
    gs_e = _edges(gs_b.astype(np.float32))
    W, H = big.size
    gfull = np.asarray(big.convert("L"))
    rk = min(1.0, 2200 / max(W, H))
    gred = cv2.resize(gfull, None, fx=rk, fy=rk, interpolation=cv2.INTER_AREA) if rk < 1 else gfull
    best = (-1.0, None)

    def trial(f):
        cw = f * W
        k = sw / cw                      # resize so the candidate crop is sw wide
        if k > 1.0:                      # never search above native resolution
            return (-1.0, None)
        src, base = (gred, rk) if k <= rk else (gfull, 1.0)
        g = cv2.resize(src, (max(sw, int(W * k)), max(sh, int(H * k))),
                       interpolation=cv2.INTER_AREA)
        if g.shape[0] < sh or g.shape[1] < sw:
            return (-1.0, None)
        gb = cv2.GaussianBlur(g, (0, 0), 1.0)
        out = (-1.0, None)
        for img, tpl in ((gb, gs_b), (_edges(gb.astype(np.float32)), gs_e)):
            r = cv2.matchTemplate(img.astype(np.float32), tpl.astype(np.float32), cv2.TM_CCOEFF_NORMED)
            _, mx, _, loc = cv2.minMaxLoc(r)
            if mx > out[0]:
                out = (mx, (loc[0] / k, loc[1] / k, (loc[0] + sw) / k, (loc[1] + sh) / k, f))
        return out

    for f in np.geomspace(1.0, lo, 48):
        t = trial(float(f))
        if t[0] > best[0]:
            best = t
    if best[1] is None:
        return None
    f0 = best[1][4]
    for f in np.linspace(f0 * 0.93, f0 * 1.07, 29):
        if lo * 0.5 < f <= 1.0:
            t = trial(float(f))
            if t[0] > best[0]:
                best = t
    return {"score": best[0], "box": best[1][:4], "frac": best[1][4]}


BEDDING_ZIP = "Top 5 Bedding-20261013T104148Z-1-001.zip"


def bedding(scratch):
    """Whole originals, downscaled to the house long edge."""
    zf = zipfile.ZipFile(os.path.join(DL, BEDDING_ZIP))
    dest_dir = os.path.join(OUT, "beds-and-more")
    os.makedirs(dest_dir, exist_ok=True)
    for info in zf.infolist():
        if info.is_dir():
            continue
        stem = re.sub(r"\s*\(\d+\)$", "", os.path.splitext(os.path.basename(info.filename))[0])
        tmp = os.path.join(scratch, "b_" + os.path.basename(info.filename))
        open(tmp, "wb").write(zf.read(info))
        im = to_srgb(open_any(tmp))
        native = im.size
        im.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
        out = os.path.join(dest_dir, slug(stem) + ".webp")
        im.save(out, "WEBP", quality=QUALITY, method=6)
        os.remove(tmp)
        print("beds-and-more %-18s %dx%d -> %dx%d  %dKB" % (
            slug(stem), native[0], native[1], im.size[0], im.size[1], os.path.getsize(out) // 1024))


def main(scratch):
    os.makedirs(scratch, exist_ok=True)
    rows = []
    for brand, zname in BRAND_ZIPS.items():
        zf = zipfile.ZipFile(os.path.join(DL, zname))
        for info in sorted(zf.infolist(), key=lambda i: i.filename):
            if info.is_dir():
                continue
            stem = os.path.splitext(os.path.basename(info.filename))[0]
            key = slug(stem)
            sp = os.path.join(scratch, "s_%s_%s" % (brand, os.path.basename(info.filename)))
            open(sp, "wb").write(zf.read(info))
            small = to_srgb(Image.open(sp))
            dest_dir = os.path.join(OUT, brand)
            os.makedirs(dest_dir, exist_ok=True)
            dest = os.path.join(dest_dir, key + ".webp")

            best = None                       # (score, box, big, label)
            for spec in (ORIGINALS.get(key, []) if key in RECUT else []):
                try:
                    op = extract(spec, scratch)
                    big = to_srgb(open_any(op))
                except Exception as e:                      # noqa: BLE001
                    print("   open failed %s: %r" % (spec[-1], e), flush=True)
                    continue
                r = locate_tm(small, big)
                print("   %-16s vs %-22s tm=%s" % (key, spec[-1], r and round(r["score"], 3)), flush=True)
                if r and (best is None or r["score"] > best[0]):
                    best = (r["score"], r["box"], big, spec[-1])
                else:
                    del big
            if best and best[0] >= 0.95:
                score, box, big, origname = best
                x0, y0, x1, y1 = [int(round(v)) for v in box]
                x0, y0 = max(0, x0), max(0, y0)
                x1, y1 = min(big.size[0], x1), min(big.size[1], y1)
                crop = big.crop((x0, y0, x1, y1))
                native = crop.size
                crop.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
                crop.save(dest, "WEBP", quality=QUALITY, method=6)
                rows.append((brand, key, "RE-CUT", small.size, native, crop.size,
                             score, 0.0, origname, os.path.getsize(dest) // 1024))
            else:
                small.save(dest, "WEBP", quality=90, method=6)
                rows.append((brand, key, "AS-SUPPLIED", small.size, small.size, small.size,
                             best[0] if best else 0.0, 0.0, "-", os.path.getsize(dest) // 1024))
            if os.path.exists(sp):
                os.remove(sp)
    print("\n%-10s %-16s %-12s %-9s %-11s %-11s %-5s %-6s %s" %
          ("brand", "photo", "source", "supplied", "native crop", "shipped", "score", "rot", "original"))
    for r in rows:
        print("%-10s %-16s %-12s %-9s %-11s %-11s %-5.2f %-6.2f %s  %dKB" % (
            r[0], r[1], r[2], "%dx%d" % r[3], "%dx%d" % r[4], "%dx%d" % r[5], r[6], r[7], r[8], r[9]))


if __name__ == "__main__":
    if len(sys.argv) > 2 and sys.argv[2] == "bedding":
        bedding(sys.argv[1])
    else:
        main(sys.argv[1])
