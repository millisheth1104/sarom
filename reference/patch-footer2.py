"""
Two fixes to the poster footer:

1. The wordmark spanned only ~50% of the shell (660px of 1319px). A vw value
   cannot solve this, because .shell is capped at --max-w: above that cap the
   viewport keeps growing while the container does not, so any vw figure that
   fits at 1440 overflows at 1920. Size it from the CONTAINER instead (cqw),
   with a vw fallback for engines without container queries.
   "sarom." renders at 2.24x its font-size, so 44.5cqw fills the container.

2. A ~250px void sat between the nav and the wordmark, because .foot__poster
   was flex: 1 1 auto with justify-content: flex-end — it absorbed all the
   slack and pushed its content down. Let it size to content and distribute
   the remaining space evenly instead.
"""
s = open("app/sections.css", encoding="utf-8").read()


def swap(old, new, label):
    global s
    assert old in s, f"MISS: {label}"
    s = s.replace(old, new, 1)
    print(f"  ok {label}")


swap(
    """  min-height: min(100svh, 860px);
  padding-block: clamp(1.1rem, 2.2vw, 2.2rem) clamp(0.9rem, 1.6vw, 1.5rem);
  gap: clamp(0.6rem, 1.4vw, 1.4rem);
}""",
    """  min-height: min(100svh, 860px);
  padding-block: clamp(1.1rem, 2.2vw, 2.2rem) clamp(0.9rem, 1.6vw, 1.5rem);
  /* space-between, not a growing middle child: the poster used to absorb all
     the slack and leave a void under the nav. */
  justify-content: space-between;
  gap: clamp(0.6rem, 1.4vw, 1.4rem);
}""",
    "stage distributes slack",
)

swap(
    """.foot__poster {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 0;
  isolation: isolate;
}""",
    """.foot__poster {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  isolation: isolate;
}""",
    "poster sizes to content",
)

swap(
    """  /* spans the shell almost edge to edge */
  font-size: clamp(3.2rem, 20.5vw, 19rem);
  line-height: 0.82;""",
    """  /* Fallback for engines without container queries. Deliberately capped in
     rem, since .shell stops growing at --max-w but the viewport does not. */
  font-size: clamp(3.2rem, 40vw, 26rem);
  line-height: 0.82;""",
    "wordmark fallback size",
)

swap(
    """.foot__image {
  position: relative;
  z-index: 2;
  height: min(42svh, 430px);
  margin-top: clamp(-5.5rem, -7vw, -2rem);""",
    """.foot__image {
  position: relative;
  z-index: 2;
  height: min(34svh, 360px);
  margin-top: clamp(-8rem, -8.5vw, -2.5rem);""",
    "image height + deeper overlap",
)

# container-query sizing, appended so it wins over the fallback
s = s.rstrip() + """

/* Size the wordmark from its CONTAINER, so it fills the shell at every width
   including past --max-w where vw would overflow. "sarom." measures ~2.24x its
   own font-size, so 44.5cqw lands the glyph run on the container width. */
@supports (font-size: 1cqw) {
  .foot__poster {
    container-type: inline-size;
  }
  .foot__wordmark {
    font-size: 44.5cqw;
  }
}
"""

open("app/sections.css", "w", encoding="utf-8").write(s)
print("footer sizing patched")
