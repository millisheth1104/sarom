"""
Flip the Studio section to a dark ground (client-approved).

This is what makes the notches finally read. The plate that cuts into each
photo is charcoal; on the old warm-ivory card it looked like a dark BOX sitting
on a light surface. On a charcoal ground the plate and the ground are the same
colour, so the plate has no visible edge of its own and the photo genuinely
appears cut — the photo "merges" into the section, exactly as the reference.

No new colour is introduced: this uses the existing --charcoal foundation
token, so the palette rule (pastels are accents, charcoal is the dark ground)
still holds.
"""
s = open("app/replicas.css", encoding="utf-8").read()


def swap(old, new, label):
    global s
    assert old in s, f"MISS: {label}"
    s = s.replace(old, new, 1)
    print(f"  ok {label}")


# ---- the composition ground ----
swap(
    """  --notch-r: clamp(18px, 2vw, 28px);
  --fillet: clamp(9px, 1vw, 15px);
  background: var(--ivory-deep);
  box-shadow: inset 0 0 0 1px rgba(20, 17, 15, 0.07);""",
    """  --notch-r: clamp(18px, 2vw, 28px);
  --fillet: clamp(9px, 1vw, 15px);
  /* Charcoal ground, matching the plates that cut into each photo. Same
     colour on both sides of the cut means the plate has no edge of its own,
     so the photo reads as genuinely notched rather than covered. */
  background: var(--charcoal);
  box-shadow: inset 0 0 0 1px rgba(245, 240, 232, 0.07);
  color: var(--ivory);""",
    "comp ground -> charcoal",
)

# ---- the secondary panel needs to lift off that ground now ----
swap(
    """  border-radius: var(--r-img);
  background: var(--charcoal);
  color: var(--ivory);
  overflow: hidden;
}
.studio__panelhead {""",
    """  border-radius: var(--r-img);
  /* one step up from the ground, or it would vanish into it */
  background: var(--charcoal-soft);
  color: var(--ivory);
  overflow: hidden;
}
.studio__panelhead {""",
    "panel lifted off the ground",
)

open("app/replicas.css", "w", encoding="utf-8").write(s)
print("replicas.css patched")

# ---- the section wrapper + nav tone ----
c = open("components/Compositions.tsx", encoding="utf-8").read()
old = '<section className="sect sect--comp sect--ivory" data-nav-tone="light">\n      <div className="shell">\n        <div className="shead">\n          <Reveal as="p" dir="fade" className="shead__index">\n            {SECTION_INDEX.showroom}'
new = '<section className="sect sect--comp sect--dark" data-nav-tone="dark">\n      <div className="shell">\n        <div className="shead">\n          <Reveal as="p" dir="fade" className="shead__index">\n            {SECTION_INDEX.showroom}'
assert old in c, "MISS: studio section wrapper"
c = c.replace(old, new, 1)
open("components/Compositions.tsx", "w", encoding="utf-8").write(c)
print("  ok section -> sect--dark, nav tone -> dark")
