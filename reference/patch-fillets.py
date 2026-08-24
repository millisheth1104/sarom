"""Add the notch tokens + shared concave-fillet gradients that the earlier
patch referenced but never actually wrote (its script threw before saving)."""

s = open("app/replicas.css", encoding="utf-8").read()

assert "--notch-r" not in s.split(".studio__card")[0], "tokens already present"

doc = """/* ============================================================
   THE NOTCH — how labels sit in these cards

   The reference does NOT float a card on top of the photo. The
   photo is CUT: a plate in the card own ground colour occupies
   the corner, and where the photo meets that plate its edge
   curves away with a concave fillet, so the two interlock as one
   carved shape.

   The fillet is a corner-anchored radial gradient. Two traps,
   both hit before on this project:
     - use `farthest-side`, NOT `closest-side`. Anchored at a
       corner, closest-side resolves to radius 0 and floods the
       tile with the end colour, giving a blocky step.
     - stop order decides which side is rounded. The GROUND must
       take "tile minus disc" (`transparent 99%, ground 100%`);
       inverting it leaves a spur stabbing into the corner.
   Keep --fillet below --notch-r, or the two arcs meet with no
   straight edge between them and the corner reads as a lozenge.
   ============================================================ */

/* ground remains in the tile bottom-RIGHT (plate is bottom-right) */
.studio__notch::before,
.studio__notch::after,
.studio__vtag::before,
.studio__vtag::after {
  content: "";
  position: absolute;
  width: var(--fillet);
  height: var(--fillet);
  background: radial-gradient(
    farthest-side at top left,
    transparent 99%,
    var(--charcoal) 100%
  );
}
/* ground remains in the tile bottom-LEFT (plate is bottom-left) */
.studio__featurecopy::before,
.studio__featurecopy::after {
  content: "";
  position: absolute;
  width: var(--fillet);
  height: var(--fillet);
  background: radial-gradient(
    farthest-side at top right,
    transparent 99%,
    var(--charcoal) 100%
  );
}

"""

anchor = ".studio {\n  background: var(--ivory-deep);"
assert anchor in s, "cannot find .studio block"
s = s.replace(
    anchor,
    doc
    + ".studio {\n"
    + "  /* notch geometry: plate corner radius, and the fillet that blends\n"
    + "     the photo edge into it. fillet MUST stay below notch-r. */\n"
    + "  --notch-r: clamp(18px, 2vw, 28px);\n"
    + "  --fillet: clamp(9px, 1vw, 15px);\n"
    + "  background: var(--ivory-deep);",
    1,
)

open("app/replicas.css", "w", encoding="utf-8").write(s)
print("tokens + fillet gradients written")
