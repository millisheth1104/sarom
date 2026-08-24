"""
Stop the masked line-reveal clipping italic descenders, and take the hero
display size down a couple of steps.

Cause: `.lines__line { overflow: hidden }` is the reveal mask, and display type
runs line-height below 1 (hero is 0.94). An italic serif descender — the g in
"elegance." — falls outside that line box, so the mask cuts it.

Fix: give the mask a little extra height for descenders, cancel it again with a
negative margin so line spacing is untouched, then raise the hidden-state
translate so the inner still starts fully out of the (now taller) mask.
"""

# ---- 1. the mask ----------------------------------------------------------
g = open("app/globals.css", encoding="utf-8").read()

old = ".lines__line { display: block; overflow: hidden; }"
new = """.lines__line {
  display: block;
  overflow: hidden;
  /* descender room: line-height on display type is < 1, so an italic g or y
     sits below the line box and the reveal mask would shear it off. The
     negative margin cancels the added height so line spacing is unchanged. */
  padding-bottom: 0.16em;
  margin-bottom: -0.16em;
}"""
assert old in g, "line mask rule not found"
g = g.replace(old, new)

# The mask is now 0.16em taller, so 108% no longer hides the inner fully.
old_t = """html[data-js] [data-lines] .lines__inner {
  transform: translate3d(0, 108%, 0) rotate(1.6deg);
}"""
new_t = """html[data-js] [data-lines] .lines__inner {
  /* 125%, not 108%: the mask gained 0.16em of descender room above, and the
     translate is a % of the inner's own height, so it has to clear both. */
  transform: translate3d(0, 125%, 0) rotate(1.6deg);
}"""
assert old_t in g, "hidden-state transform not found"
g = g.replace(old_t, new_t)
open("app/globals.css", "w", encoding="utf-8").write(g)
print("  ok mask descender room + translate raised to 125%")

# ---- 2. hero size ---------------------------------------------------------
t = open("app/tokens.css", encoding="utf-8").read()
old_h = "--fs-hero:    clamp(2.25rem, 5.4vw, 6.25rem);"
new_h = "--fs-hero:    clamp(2rem, 4.7vw, 5.5rem);"
assert old_h in t, "hero size token not found"
t = t.replace(old_h, new_h)
open("app/tokens.css", "w", encoding="utf-8").write(t)
print("  ok hero 5.4vw/6.25rem -> 4.7vw/5.5rem (~10px smaller at 1440)")
