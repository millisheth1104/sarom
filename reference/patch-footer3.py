"""
Fix the wordmark overflow and the void under the nav.

Overflow: the glyph run measures 2.5019x its own font-size (my earlier 2.24
estimate ignored the trailing dot), so 44.5cqw ran 149px past the container.
The <p> reports the container width, so the clipping was invisible to
getBoundingClientRect — it had to be measured with a Range. 39.2cqw lands the
run at 98% of the container.

Void: the stage had min-height + space-between, so any slack was dumped into
the gaps as a gap under the nav. Let the content define the height instead; it
still lands well inside one screen.
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
  /* space-between, not a growing middle child: the poster used to absorb all
     the slack and leave a void under the nav. */
  justify-content: space-between;
  gap: clamp(0.6rem, 1.4vw, 1.4rem);
}""",
    """  /* Height comes from the content, not a min-height: any slack was being
     distributed into the gaps and read as a void under the nav. The stack
     lands ~810px, comfortably inside one screen. */
  padding-block: clamp(1rem, 2vw, 2rem) clamp(0.9rem, 1.6vw, 1.5rem);
  gap: clamp(0.4rem, 0.9vw, 0.9rem);
}""",
    "stage sized by content",
)

swap(
    """  /* Fallback for engines without container queries. Deliberately capped in
     rem, since .shell stops growing at --max-w but the viewport does not. */
  font-size: clamp(3.2rem, 40vw, 26rem);
  line-height: 0.82;""",
    """  /* Fallback for engines without container queries. 35.9vw is 39.2cqw scaled
     by the container/viewport ratio at 1440; capped in rem because .shell
     stops growing at --max-w while the viewport does not. */
  font-size: clamp(3rem, 35.9vw, 33rem);
  line-height: 0.82;""",
    "wordmark fallback re-derived",
)

swap(
    """  height: min(34svh, 360px);
  margin-top: clamp(-8rem, -8.5vw, -2.5rem);""",
    """  height: min(32svh, 330px);
  margin-top: clamp(-9rem, -9vw, -2.5rem);""",
    "image height + overlap retuned",
)

swap(
    """  .foot__wordmark {
    font-size: 44.5cqw;
  }""",
    """  .foot__wordmark {
    /* measured: the glyph run is 2.5019x the font-size, so 39.2cqw puts it at
       98% of the container. Re-measure with reference/measure-wordmark.mjs if
       the wordmark text or the display face ever changes. */
    font-size: 39.2cqw;
  }""",
    "wordmark cqw = measured value",
)

open("app/sections.css", "w", encoding="utf-8").write(s)
print("footer patched")
