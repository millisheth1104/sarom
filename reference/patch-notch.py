"""Turn the three .studio labels into real cut notches with concave fillets."""
import re

s = open("app/replicas.css", encoding="utf-8").read()


def swap(old, new, label):
    global s
    assert old in s, f"MISS: {label}"
    s = s.replace(old, new, 1)
    print(f"  ok {label}")


# ---- card notch: key the radius to the token, add fillet offsets ----
swap(
    """  padding: 0.65rem 0.75rem 0.65rem 1rem;
  background: var(--charcoal);
  /* generous inner radius so the photograph reads as carved around the
     label, not stepped. Matches the product cradle. */
  border-radius: clamp(22px, 2.2vw, 32px) 0 0 0;
}""",
    """  padding: 0.6rem 0.7rem 0.6rem 0.85rem;
  background: var(--charcoal);
  border-radius: var(--notch-r) 0 0 0;
}
/* fillet above the plate, flush to the card right edge */
.studio__notch::before {
  right: 0;
  bottom: 100%;
}
/* fillet left of the plate, flush to the card bottom edge */
.studio__notch::after {
  left: calc(-1 * var(--fillet));
  bottom: 0;
}
/* one capsule holding both labels, divided — as in the reference */
.studio__capsule {
  display: inline-flex;
  align-items: stretch;
  border-radius: var(--radius-pill);
  background: rgba(245, 240, 232, 0.1);
  overflow: hidden;
}""",
    "card notch + fillets + capsule",
)

# ---- pills become segments of one capsule ----
swap(
    """.studio__pill {
  padding: 0.34rem 0.7rem;
  border-radius: var(--radius-pill);
  background: rgba(245, 240, 232, 0.12);
  color: rgba(245, 240, 232, 0.95);
  font-size: 0.5625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}
.studio__pill:last-child {
  background: var(--ivory);
  color: var(--charcoal);
}""",
    """.studio__pill {
  padding: 0.45rem 0.8rem;
  color: rgba(245, 240, 232, 0.95);
  font-size: 0.5625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.5;
  white-space: nowrap;
}
/* hairline divider between the two labels */
.studio__pill + .studio__pill {
  box-shadow: inset 1px 0 0 rgba(245, 240, 232, 0.22);
}""",
    "capsule segments",
)

# ---- feature copy: flush cut, not a floating card ----
swap(
    """.studio__featurecopy {
  position: absolute;
  left: clamp(0.7rem, 1.3vw, 1.3rem);
  bottom: clamp(0.7rem, 1.3vw, 1.3rem);
  z-index: 2;
  max-width: min(54%, 380px);
  padding: clamp(0.85rem, 1.4vw, 1.3rem) clamp(1rem, 1.7vw, 1.6rem)
    clamp(0.85rem, 1.4vw, 1.3rem) clamp(0.9rem, 1.5vw, 1.4rem);
  background: var(--charcoal);
  color: var(--ivory);
  border-radius: var(--r-img);
  box-shadow: 0 14px 34px rgba(20, 17, 15, 0.32);
}""",
    """/* plate cut into the feature image bottom-left corner */
.studio__featurecopy {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  max-width: min(54%, 380px);
  padding: clamp(0.85rem, 1.4vw, 1.3rem) clamp(1rem, 1.7vw, 1.6rem)
    clamp(0.85rem, 1.4vw, 1.3rem) clamp(0.9rem, 1.5vw, 1.4rem);
  background: var(--charcoal);
  color: var(--ivory);
  border-radius: 0 var(--notch-r) 0 0;
}
/* fillet above the plate, flush to the image left edge */
.studio__featurecopy::before {
  left: 0;
  bottom: 100%;
}
/* fillet right of the plate, flush to the image bottom edge */
.studio__featurecopy::after {
  right: calc(-1 * var(--fillet));
  bottom: 0;
}""",
    "feature copy cut",
)

# ---- vertical tag: flush cut, not a floating tab ----
swap(
    """.studio__vtag {
  position: absolute;
  right: clamp(0.7rem, 1.3vw, 1.3rem);
  bottom: clamp(0.7rem, 1.3vw, 1.3rem);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 0.5rem 1rem 0.55rem;
  background: var(--charcoal);
  color: var(--ivory);
  font-size: 0.5625rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  line-height: 1;
  border-radius: var(--radius-pill);
  box-shadow: 0 10px 26px rgba(20, 17, 15, 0.3);
}""",
    """/* plate cut into the feature image right edge, at the bottom */
.studio__vtag {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 0.55rem;
  background: var(--charcoal);
  color: var(--ivory);
  font-size: 0.5625rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  line-height: 1;
  border-radius: var(--notch-r) 0 0 0;
}
.studio__vtag::before {
  right: 0;
  bottom: 100%;
}
.studio__vtag::after {
  left: calc(-1 * var(--fillet));
  bottom: 0;
}""",
    "vertical tag cut",
)

open("app/replicas.css", "w", encoding="utf-8").write(s)
print("done")
