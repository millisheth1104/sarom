"""One contact sheet of every current cover, numbered, so swatch-grid pages can
be spotted against the product photography they should be."""
import json
import os
import sys

from PIL import Image, ImageDraw

CELL, PAD, LABEL, COLS = 190, 8, 16, 10


def main():
    recs = json.load(open(sys.argv[1], encoding="utf-8"))
    start, end = int(sys.argv[3]), int(sys.argv[4])
    recs = recs[start:end]
    rows = (len(recs) + COLS - 1) // COLS
    W = COLS * (CELL + PAD) + PAD
    H = rows * (CELL + LABEL + PAD) + PAD
    sheet = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(sheet)

    for i, r in enumerate(recs):
        cx = PAD + (i % COLS) * (CELL + PAD)
        cy = PAD + (i // COLS) * (CELL + LABEL + PAD)
        try:
            im = Image.open(r["path"]).convert("RGB")
            im.thumbnail((CELL, CELL), Image.LANCZOS)
            cell = Image.new("RGB", (CELL, CELL), (240, 238, 234))
            cell.paste(im, ((CELL - im.width) // 2, (CELL - im.height) // 2))
            sheet.paste(cell, (cx, cy))
        except Exception:
            d.rectangle([cx, cy, cx + CELL, cy + CELL], fill=(255, 220, 220))
        d.text((cx + 2, cy + CELL + 2), f'{start + i}. {r["title"][:24]}', fill=(0, 0, 0))

    sheet.save(sys.argv[2])
    print("rows:", rows, "->", sys.argv[2])


if __name__ == "__main__":
    main()
