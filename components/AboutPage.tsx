"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MotionProvider, Reveal, LineReveal, ImageReveal } from "@/components/Motion";
import { Preloader, Nav, Cursor } from "@/components/Chrome";
import Footer from "@/components/Footer";
import { ClosingCta } from "@/components/Editorial";
import { Threadline } from "@/components/Threadline";
import {
  ABOUT_HERO,
  ABOUT_STORY,
  FOUNDERS,
  FOUNDERS_NOTE,
  REACH,
  REACH_CHAPTERS,
  REACH_ANCHOR,
  PILLARS,
  WHY,
  WHY_CLOSE,
  JOURNEY,
  JOURNEY_CLOSE,
} from "@/lib/about";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-linked parallax for the page's photographs.
 *
 * One ScrollTrigger per image, writing `--py` — the same custom-property
 * approach `initParallax` uses site-wide, so CSS stays authoritative about
 * how the offset composes with the image's own scale and nothing fights the
 * reveal engine for `transform`.
 */
function useParallax(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = scope.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = Number(el.dataset.depth) || 40;
        gsap.fromTo(
          el,
          { "--py": `${d}px` },
          {
            "--py": `${-d}px`,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.1 },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, [scope]);
}

/* ============================================================
   1 — HERO
   ============================================================ */
function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = rootRef.current;
    const img = root?.querySelector(".ahero__img");
    if (!root || !img) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -4, scale: 1.1 },
        {
          yPercent: 4,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ahero" ref={rootRef} data-nav-tone="dark">
      <div className="ahero__media">
        <div className="ahero__img">
          <Image src={ABOUT_HERO.image.src} alt={ABOUT_HERO.image.alt} fill sizes="100vw" priority unoptimized />
        </div>
      </div>

      <div className="shell ahero__inner">
        <Reveal as="p" dir="fade" className="shead__index ahero__eyebrow">
          {ABOUT_HERO.eyebrow}
        </Reveal>
        <LineReveal as="h1" className="ahero__title tt" step={0.14} lines={ABOUT_HERO.titleLines} />
        <Reveal as="p" dir="up" delay={0.5} className="ahero__body">
          {ABOUT_HERO.body}
        </Reveal>

        <Reveal dir="up" delay={0.66} className="ahero__meta">
          {ABOUT_HERO.meta.map((m) => (
            <div key={m.label}>
              <b>{m.value}</b>
              <span>{m.label}</span>
            </div>
          ))}
          <span className="hero__scroll ahero__cue">
            Scroll
            <span />
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   2 — ABOUT SAROM
   ============================================================ */
function AboutStory() {
  const rootRef = useRef<HTMLElement>(null);
  useParallax(rootRef);

  return (
    <section className="sect sect--ivory astory" ref={rootRef} data-nav-tone="light">
      <div className="shell astory__grid">
        <div className="astory__copy">
          <Reveal as="p" dir="fade" className="shead__index">
            {ABOUT_STORY.eyebrow}
          </Reveal>
          <LineReveal
            as="h2"
            className="astory__title tt"
            step={0.1}
            lines={[
              <>
                {ABOUT_STORY.titleLines[0]} <em>{ABOUT_STORY.titleEm}</em>
              </>,
            ]}
          />
        </div>

        {/* Lead paragraph carries the ink accent, the rest recedes to muted —
            it gives a two-paragraph block a hierarchy it otherwise has none
            of, without a second type size. */}
        <div className="astory__body">
          <Reveal as="p" dir="up" delay={0.12} className="astory__lead">
            {ABOUT_STORY.lead}
          </Reveal>
          <Reveal as="p" dir="up" delay={0.2} className="astory__para">
            {ABOUT_STORY.body}
          </Reveal>
        </div>

        <div className="astory__media">
          {ABOUT_STORY.images.map((img, i) => (
            <ImageReveal className={`astory__shot astory__shot--${i + 1}`} delay={i * 0.14} key={img.src}>
              <span className="par" data-depth={i === 0 ? 34 : 52}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={534}
                  height={776}
                  sizes="(max-width: 900px) 46vw, 24vw"
                  loading="lazy"
                  unoptimized
                />
              </span>
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3 — MEET THE FOUNDERS
   ============================================================ */
function Founders() {
  return (
    <section className="sect sect--dark team" data-nav-tone="dark">
      <div className="shell team__grid">
        <div className="team__head">
          <Reveal as="p" dir="fade" className="shead__index">
            {FOUNDERS_NOTE.eyebrow}
          </Reveal>
          <LineReveal
            as="h2"
            className="team__title tt"
            step={0.1}
            lines={[FOUNDERS_NOTE.titleLines[0], <em key="em">{FOUNDERS_NOTE.titleEm}</em>]}
          />
        </div>

        <div className="team__row" data-reveal-stagger="0.08">
          {FOUNDERS.map((f) => (
            <Reveal className="team__card" dir="up" key={f.id}>
              <span className="team__frame">
                <Image
                  src={f.portrait}
                  alt={`${f.name}, ${f.role}`}
                  width={301}
                  height={356}
                  sizes="(max-width: 700px) 46vw, 24vw"
                  loading="lazy"
                  unoptimized
                />
              </span>
              <b>{f.name}</b>
              <span className="team__role">{f.role}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4 — HOW SAROM IS TODAY  (chapter rail, after Pear's "The Work")
   ============================================================ */
function Reach() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useParallax(rootRef);

  /* The rail follows the reader: whichever block is nearest the middle of
     the viewport is the active chapter. An IntersectionObserver alone flips
     on an edge crossing, which reads as jumpy when a block is taller than
     the band; nearest-to-centre is stable. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: () => {
          const mid = window.innerHeight / 2;
          let best = 0;
          let bestD = Infinity;
          root.querySelectorAll<HTMLElement>(".work__block").forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const d = Math.abs(r.top + r.height / 2 - mid);
            if (d < bestD) { bestD = d; best = i; }
          });
          setActive((p) => (p === best ? p : best));
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  /* Counters run once, when each figure arrives. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString("en-IN"); },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="work" ref={rootRef} data-nav-tone="dark">
      {/* Full-bleed ground the whole chapter plays over. */}
      <div className="work__media">
        <span className="par" data-depth={60}>
          <Image src={REACH_ANCHOR.image.src} alt="" fill sizes="100vw" loading="lazy" unoptimized />
        </span>
      </div>

      {/* THE RAIL. A hairline with one tick per chapter; only the ACTIVE
          tick extends into a labelled dash, the rest stay as marks. Scoped to
          this section — it indexes the four reach chapters, not the page. */}
      <div className="work__rail" aria-hidden="true">
        <span className="work__railline" />
        {REACH_CHAPTERS.map((c, i) => (
          <span className="work__tick" key={c.id} data-on={i === active || undefined}>
            <i />
            <em>{c.label}</em>
          </span>
        ))}
      </div>

      <div className="work__inner">
        <Reveal as="p" dir="fade" className="shead__index work__eyebrow">
          {REACH_ANCHOR.eyebrow}
        </Reveal>
        <LineReveal
          as="h2"
          className="work__title tt"
          step={0.1}
          lines={[
            <>
              {REACH_ANCHOR.titleLines[0]} <em>{REACH_ANCHOR.titleEm}</em>
            </>,
          ]}
        />

        <div className="work__blocks">
          {REACH_CHAPTERS.map((c, i) => (
            <Reveal className="work__block" dir="left" key={c.id}>
              <span className="work__blockLabel">{c.label}</span>
              <b className="work__figure">
                <span data-count={REACH[i].value}>0</span>
                {REACH[i].suffix}
                <em>{REACH[i].label}</em>
              </b>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5 — VISION, MISSION, STRENGTH  (staircase pillars)
   ============================================================ */
function Pillars() {
  return (
    <section className="sect pillars" data-nav-tone="light">
      <div className="shell">
        <Reveal as="p" dir="fade" className="shead__index pillars__eyebrow">
          What we stand for
        </Reveal>

        <div className="pillars__stack" data-reveal-stagger="0.12">
          {PILLARS.map((p) => (
            <Reveal className="pillars__card" dir="up" key={p.key}>
              <span className="pillars__num">{p.index}</span>
              <div>
                <b>{p.title}</b>
                <p>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6 — WHY SAROM
   ============================================================ */

/**
 * An editorial index of the five reasons — all legible at once.
 *
 * This replaces an orbit carousel that brought one reason to the front and
 * ghosted the other four. That mechanic was borrowed from a reference whose
 * items are questions with long answers, where dwelling on one at a time is
 * the point. These are five one-line claims: their value is in being
 * COMPARED, and a mechanic that hides four of five works against them.
 *
 * The only motion left is a backdrop that follows whichever row the reader
 * is on, and the section's own fade in and out.
 */
function WhySarom() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;

    const rows = Array.from(list.querySelectorAll<HTMLElement>(".ask__row"));
    const setActive = (i: number) => root.style.setProperty("--active", String(i));

    /* Pointer wins while it is over the list, scroll drives otherwise. They
       are not competing writers: hover only takes over between scrolls, and
       the next scroll resumes control, which is what a reader expects. */
    let hovering = false;
    const enter = (i: number) => () => {
      hovering = true;
      setActive(i);
    };
    const leave = () => {
      hovering = false;
    };
    rows.forEach((r, i) => {
      r.addEventListener("pointerenter", enter(i));
      r.addEventListener("pointerleave", leave);
    });

    if (prefersReducedMotion()) {
      return () => {
        rows.forEach((r, i) => {
          r.removeEventListener("pointerenter", enter(i));
          r.removeEventListener("pointerleave", leave);
        });
      };
    }

    registerGsap();
    const ctx = gsap.context(() => {
      /* Which row the reader is on: the one whose middle is nearest a line
         at 45% of the viewport. Cheaper and steadier than an observer per
         row, which fires on entry rather than on being the current one. */
      ScrollTrigger.create({
        trigger: list,
        start: "top bottom",
        end: "bottom top",
        onUpdate: () => {
          if (hovering) return;
          const line = window.innerHeight * 0.45;
          let best = 0;
          let bestD = Infinity;
          rows.forEach((r, i) => {
            const b = r.getBoundingClientRect();
            const d = Math.abs(b.top + b.height / 2 - line);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          setActive(best);
        },
      });

      /* The fade envelope, as two factors CSS multiplies. Separate ramps so
         the section is fully present for the whole middle of its travel and
         only resolves to its own charcoal at the two ends. */
      ScrollTrigger.create({
        trigger: root,
        start: "top 88%",
        end: "top 40%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => root.style.setProperty("--fin", String(self.progress)),
      });
      ScrollTrigger.create({
        trigger: root,
        /* Anchored to the section LEAVING, not to its bottom entering. The
           section is only ~1.2 viewports tall, so "bottom 78%" fired while
           the reader was still on the second row and had the closing line at
           0.03 opacity by the time they reached it. */
        start: "bottom 40%",
        end: "bottom 2%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => root.style.setProperty("--fout", String(1 - self.progress)),
      });
    }, root);

    return () => {
      rows.forEach((r, i) => {
        r.removeEventListener("pointerenter", enter(i));
        r.removeEventListener("pointerleave", leave);
      });
      ctx.revert();
      root.style.removeProperty("--fin");
      root.style.removeProperty("--fout");
      root.style.removeProperty("--active");
    };
  }, []);

  return (
    <section className="ask" ref={rootRef} data-nav-tone="dark">
      <div className="ask__bg" aria-hidden="true">
        {WHY.map((w, i) => (
          <Image
            key={w.id}
            src={w.image.src}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            unoptimized
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="shell ask__inner">
        <div className="ask__head">
          <Reveal as="p" dir="fade" className="shead__index ask__eyebrow">
            Why Sarom
          </Reveal>
          <LineReveal
            as="h2"
            className="ask__title"
            step={0.1}
            lines={[
              <>
                What sets <em>Sarom apart</em>
              </>,
            ]}
          />
        </div>

        <ul className="ask__list" ref={listRef}>
          {WHY.map((w, i) => (
            <Reveal
              as="li"
              dir="up"
              className="ask__row"
              key={w.id}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="ask__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ask__rowTitle">{w.title}</h3>
              <p className="ask__rowBody">{w.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" dir="up" className="ask__close">
          {WHY_CLOSE}
        </Reveal>
      </div>
    </section>
  );
}


/* ============================================================
   7 — OUR JOURNEY
   ============================================================ */
function Journey() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      /* Desktop only — pinning on a phone traps the scroll, so below 900px
         the CSS falls back to a vertical stack. */
      mm.add("(min-width: 900px)", () => {
        /* Travel exactly far enough to bring the last stop's right edge to
           rest on the gutter. `innerWidth * 0.9` was a guess and overshot,
           parking the rail with a ragged margin of dead space on the right. */
        const gutter = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + gutter());
        /* Dead scroll after the travel: the rail sits still on the closing
           line rather than whipping it past at the moment of unpin. */
        const TAIL = () => window.innerHeight * 0.35;
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          /* Near 1:1 with the travel. The old 1.6x stretch was meant to smooth
             the motion, but it does the opposite: it decouples the rail from
             the wheel, so the page holds still while the content crawls. A
             short tail past the travel is all the settle the end needs. */
          end: () => `+=${distance() + TAIL()}`,
          pin: true,
          anticipatePin: 1,
          /* Enough catch-up to round off the wheel's steps without the rail
             visibly lagging the cursor. 1.2s read as mush. */
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            /* The travel finishes before the pin does. Mapping x over the WHOLE
               pin would drag the rail through the tail too, undoing the 1:1;
               instead it completes over the travel share and then holds, which
               is what gives the closing line a beat to be read before release. */
            const total = distance() + TAIL();
            const travelShare = total > 0 ? distance() / total : 1;
            const t = travelShare > 0 ? Math.min(1, self.progress / travelShare) : 1;
            track.style.setProperty("--x", `${-distance() * t}px`);
            track.style.setProperty("--p", String(t));
          },
        });
        return () => {
          track.style.removeProperty("--x");
          track.style.removeProperty("--p");
          st.kill();
        };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sect sect--dark journey" ref={rootRef} data-nav-tone="dark">
      <div className="shell journey__head">
        <Reveal as="p" dir="fade" className="shead__index">
          Our Journey
        </Reveal>
        <LineReveal
          as="h2"
          className="journey__title tt"
          step={0.1}
          lines={[
            <>
              From 2005, <em>to today.</em>
            </>,
          ]}
        />
      </div>

      <div className="journey__viewport">
        <div className="journey__track" ref={trackRef}>
          {/* The thread now lives here rather than on the founders: it draws
              between the dated milestones, which is the job it was built for.
              Anchored to the stops, so it re-threads if the timeline reflows. */}
          <Threadline
            /* :not(--close) — the closing statement is a flex-centred block
               with no image, so its anchor y lands well outside the band the
               four milestones share. Threadline groups anchors into rows by
               y before ordering them, so it was landing in a row of its own
               and being threaded out of sequence: at 80% through, the last
               milestone's node had not fired while the closing one had. It
               is a statement, not a milestone, so it should not carry a node
               at all. */
            anchor=".journey__stop:not(.journey__stop--close)"
            stampOn=".journey__stop"
            anchorPoint="top"
            offsetY={6}
            weave={0}
            /* The rail's own pin already writes --p on this track, and it is
               the only thing that can: once the section pins, the track stops
               moving in the viewport, so a self-driven trigger has nothing
               left to measure. Below 900px there is no pin and Threadline
               drives itself again. */
            externalDrive="(min-width: 900px)"
            /* Step markers rather than plain dots: each milestone waits on the
               base rail as a dim ring, lights as the progress reaches it, and
               completes into a tick. */
            checks
            /* Half the stacked gutter, so the vertical rail sits centred in it. */
            railInset={21}
            className="thread--rail"
            color="var(--dusty-peach)"
            thickness={1.4}
            nodeSize={17}
            nodeFill="var(--charcoal)"
            start="top 90%"
            end="bottom 40%"
          />

          {JOURNEY.map((j) => (
            <article className="journey__stop" key={j.year}>
              <b className="journey__year">{j.year}</b>
              <h3 className="journey__stopTitle">{j.title}</h3>
              <p className="journey__stopBody">{j.body}</p>
              <div className="journey__shot">
                <Image src={j.image} alt="" width={534} height={776} sizes="(max-width: 900px) 100vw, 26vw" loading="lazy" unoptimized />
              </div>
            </article>
          ))}

          <article className="journey__stop journey__stop--close">
            <p className="journey__close">
              {JOURNEY_CLOSE.lead} <em>{JOURNEY_CLOSE.em}</em>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <MotionProvider>
      <Preloader />
      <Cursor />
      <Nav />

      <main id="main">
        <AboutHero />
        <AboutStory />
        <Founders />
        <Reach />
        <WhySarom />
        <Pillars />
        <Journey />
        <ClosingCta />
      </main>

      <Footer />
    </MotionProvider>
  );
}
