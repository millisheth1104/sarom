"""
Scope the dark ground to the container only, and open up the image radii.

The section wrapper goes back to warm ivory so the page rhythm is unchanged and
the section heading reads dark-on-light again. Only .studio itself stays
charcoal — which is all that was needed, since the notch plates merge with the
CONTAINER's ground, not the section's.

Image radii get their own token on .studio so they can be opened up without
disturbing the derived --r-img chain that every other composition uses.
"""
s = open("app/replicas.css", encoding="utf-8").read()


def swap(old, new, label):
    global s
    assert old in s, f"MISS: {label}"
    s = s.replace(old, new, 1)
    print(f"  ok {label}")


swap(
    """  --notch-r: clamp(18px, 2vw, 28px);
  --fillet: clamp(9px, 1vw, 15px);""",
    """  --notch-r: clamp(20px, 2.2vw, 32px);
  --fillet: clamp(10px, 1.1vw, 17px);
  /* Studio-only image radius, a step above the shared --r-img so the photos
     read rounder here without touching the derived chain the other
     compositions depend on. */
  --img-r: calc(var(--r-img) * 1.45);""",
    "notch + new --img-r token",
)

for sel in ("card", "feature"):
    swap(
        f""".studio__{sel} {{
  position: relative;
  aspect-ratio: """,
        f""".studio__{sel} {{
  position: relative;
  aspect-ratio: """,
        f"{sel} (anchor check)",
    )

# card radius
swap(
    """  aspect-ratio: 4 / 3.15;
  border-radius: var(--r-img);""",
    """  aspect-ratio: 4 / 3.15;
  border-radius: var(--img-r);""",
    "card radius -> --img-r",
)
# feature radius
swap(
    """  aspect-ratio: 16 / 10.2;
  border-radius: var(--r-img);""",
    """  aspect-ratio: 16 / 10.2;
  border-radius: var(--img-r);""",
    "feature radius -> --img-r",
)
# secondary panel + its image
swap(
    """  border-radius: var(--r-img);
  /* one step up from the ground, or it would vanish into it */
  background: var(--charcoal-soft);""",
    """  border-radius: var(--img-r);
  /* one step up from the ground, or it would vanish into it */
  background: var(--charcoal-soft);""",
    "panel radius -> --img-r",
)

open("app/replicas.css", "w", encoding="utf-8").write(s)
print("replicas.css patched")

# ---- section wrapper back to light ----
c = open("components/Compositions.tsx", encoding="utf-8").read()
old = '<section className="sect sect--comp sect--dark" data-nav-tone="dark">'
new = '<section className="sect sect--comp sect--ivory" data-nav-tone="light">'
assert old in c, "MISS: studio section wrapper"
c = c.replace(old, new, 1)
open("components/Compositions.tsx", "w", encoding="utf-8").write(c)
print("  ok section -> sect--ivory, nav tone -> light (container stays charcoal)")
