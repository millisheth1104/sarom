"""Builds a two-row contact sheet: current cover above, PDF page 1 below."""
import json
import sys

from PIL import Image, ImageDraw

CELL_W, CELL_H, PAD, LABEL = 300, 380, 14, 34


def fit(path, w, h):
    im = Image.open(path).convert("RGB")
    im.thumbnail((w, h), Image.LANCZOS)
    canvas = Image.new("RGB", (w, h), (238, 236, 232))
    canvas.paste(im, ((w - im.width) // 2, (h - im.height) // 2))
    return canvas


def main():
    pairs = json.load(open(sys.argv[1], encoding="utf-8"))
    n = len(pairs)
    W = n * (CELL_W + PAD) + PAD
    H = LABEL + 2 * (CELL_H + LABEL + PAD) + PAD
    sheet = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(sheet)

    for i, p in enumerate(pairs):
        x = PAD + i * (CELL_W + PAD)
        d.text((x, 8), p["title"][:38], fill=(0, 0, 0))
        d.text((x, LABEL + 4), "CURRENT COVER", fill=(150, 60, 60))
        sheet.paste(fit(p["cur"], CELL_W, CELL_H), (x, LABEL + LABEL))
        y2 = LABEL + LABEL + CELL_H + PAD
        d.text((x, y2 + 4), "PDF PAGE 1", fill=(60, 120, 60))
        sheet.paste(fit(p["p1"], CELL_W, CELL_H), (x, y2 + LABEL))

    sheet.save(sys.argv[2])


if __name__ == "__main__":
    main()
