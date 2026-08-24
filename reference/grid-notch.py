"""Magnify card 3 of the LUMORA reference with a labelled pixel grid, so the
notch geometry can be read off directly instead of guessed or mis-thresholded."""
from PIL import Image, ImageDraw

SRC = "reference/WhatsApp Image 2026-08-20 at 1.05.20 PM (1).jpeg"
L, T, R, B = 468, 198, 632, 322          # card 3 plus a margin
F = 7                                     # zoom factor
STEP = 10                                 # grid every N source px

im = Image.open(SRC).convert("RGB").crop((L, T, R, B))
big = im.resize((im.width * F, im.height * F), Image.NEAREST)
d = ImageDraw.Draw(big)

for sx in range(0, im.width, STEP):
    x = sx * F
    d.line([(x, 0), (x, big.height)], fill=(255, 40, 40), width=1)
    d.text((x + 2, 2), str(L + sx), fill=(255, 220, 0))

for sy in range(0, im.height, STEP):
    y = sy * F
    d.line([(0, y), (big.width, y)], fill=(255, 40, 40), width=1)
    d.text((2, y + 2), str(T + sy), fill=(255, 220, 0))

big.save("reference/shots/_grid-card3.png")
print(f"crop {im.size} -> {big.size}, grid every {STEP}px, origin ({L},{T})")
