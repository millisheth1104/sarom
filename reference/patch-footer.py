"""
Rebuild the footer CSS as a one-screen poster.

Before: nav + three info columns + wordmark + poster + meta = 1382px at a
900px viewport (1.54 screens), so reading it took two scrolls.

After: nav + wordmark + overlapping image + one meta line, every band sized
against viewport HEIGHT so the whole thing lands inside one screen. The image
is layered ON TOP of the wordmark and pulled up, so the letters run behind it
— the depth cue the reference gets from products standing over the letters.
"""
import re

s = open("app/sections.css", encoding="utf-8").read()

# Cut everything from the FOOTER banner to the end of the footer block.
start = s.index("/* ============================================================\n   FOOTER")
# footer rules run to end of file in this stylesheet
new_footer = """/* ============================================================
   FOOTER — one-screen editorial poster

   Sized against viewport height, not content, so it never costs a
   second scroll. The image is layered OVER the wordmark and pulled
   up, so the letters disappear behind it — the depth cue the
   reference gets from products standing in front of the type.
   ============================================================ */
.foot {
  position: relative;
  background: var(--charcoal);
  color: var(--ivory);
  --fg-muted: var(--stone-light);
  --rule: rgba(245, 240, 232, 0.14);
  overflow: hidden;
}
.foot__stage {
  display: flex;
  flex-direction: column;
  /* fits one screen; min-height keeps it honest on very short viewports */
  min-height: min(100svh, 860px);
  padding-block: clamp(1.1rem, 2.2vw, 2.2rem) clamp(0.9rem, 1.6vw, 1.5rem);
  gap: clamp(0.6rem, 1.4vw, 1.4rem);
}

/* hairline nav, evenly spread */
.foot__nav {
  display: flex;
  justify-content: space-between;
  gap: clamp(0.75rem, 2vw, 2rem);
  flex: 0 0 auto;
  padding-bottom: clamp(0.7rem, 1.4vw, 1.3rem);
  border-bottom: 1px solid var(--rule);
  font-size: var(--fs-meta);
  letter-spacing: var(--tr-meta);
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.6);
}
.foot__nav a {
  transition: color 0.35s var(--ease-soft);
}
.foot__nav a:hover {
  color: var(--ivory);
}

/* wordmark + image share one stacking context so they can overlap */
.foot__poster {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 0;
  isolation: isolate;
}
.foot__wordmark {
  position: relative;
  z-index: 1;
  display: block;
  font-family: var(--font-display);
  font-weight: 300;
  /* spans the shell almost edge to edge */
  font-size: clamp(3.2rem, 20.5vw, 19rem);
  line-height: 0.82;
  letter-spacing: -0.032em;
  text-align: center;
  color: var(--ivory);
  white-space: nowrap;
  user-select: none;
}
.foot__wordmark i {
  font-style: normal;
  color: var(--ink-2-dark);
}

/* on top of the wordmark, pulled up over its lower third */
.foot__image {
  position: relative;
  z-index: 2;
  height: min(42svh, 430px);
  margin-top: clamp(-5.5rem, -7vw, -2rem);
  border-radius: clamp(14px, 1.6vw, 22px) clamp(14px, 1.6vw, 22px) 0 0;
  overflow: hidden;
  background: var(--charcoal-warm);
}
.foot__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* one line, replacing the three columns that made this two screens tall */
.foot__meta {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem clamp(1rem, 3vw, 3rem);
  padding-top: clamp(0.8rem, 1.5vw, 1.4rem);
  border-top: 1px solid var(--rule);
  font-size: var(--fs-meta);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-muted);
}
.foot__metagroup {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem clamp(0.8rem, 1.8vw, 1.8rem);
}
.foot__meta a {
  transition: color 0.35s var(--ease-soft);
}
.foot__meta a:hover {
  color: var(--ink-2-dark);
}
"""
s = s[:start] + new_footer
open("app/sections.css", "w", encoding="utf-8").write(s)
print("footer CSS rebuilt")

# ---- drop the stale footer overrides in responsive.css ----
r = open("app/responsive.css", encoding="utf-8").read()
for pat in [
    r"\n  \.foot__cols \{[^}]*\}",
    r"\n  \.foot__col \{[^}]*\}",
    r"\n  \.foot__col--wide \{[^}]*\}",
    r"\n  \.foot__col,\n  \.foot__col--wide \{[^}]*\}",
    r"\n  \.foot__brand \{[^}]*\}",
    r"\n  \.foot__top \{[^}]*\}",
    r"\n  \.foot__bottom \{[^}]*\}",
]:
    r = re.sub(pat, "", r)

r = r.rstrip() + """

/* ---------------- footer: keep it one screen on small viewports ---------- */
@media (max-width: 680px) {
  .foot__stage {
    min-height: 0;
    gap: 0.9rem;
  }
  .foot__nav {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.5rem 1.1rem;
  }
  /* the overlap reads as a mistake once the wordmark is only ~90px tall */
  .foot__wordmark {
    font-size: 23vw;
  }
  .foot__image {
    height: min(34svh, 260px);
    margin-top: -1.25rem;
  }
  .foot__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}
"""
open("app/responsive.css", "w", encoding="utf-8").write(r)
print("responsive footer overrides cleaned + re-added")
