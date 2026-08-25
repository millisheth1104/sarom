"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  SECTION_INDEX,
  FILMS,
  INSTAGRAM_URL,
  OUR_STORY,
  BRANDS,
  LETTER,
} from "@/lib/content";
import { Reveal, LineReveal, ImageReveal, Arrow } from "./Motion";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

/* ============================================================
   04 — THE EDIT (film carousel)

   Centre-stage slider on a charcoal ground: the active reel sits
   framed by corner crop-marks, its neighbours dimmed either side.

   These are THUMBNAILS, not players — the reels live on Instagram
   and each tile opens its post. That removes the whole muted-autoplay
   problem, and the bandwidth of decoding video nobody asked for.

   SCROLL-DRIVEN. The section pins and the track follows the scroll
   CONTINUOUSLY — position is a float, not a step, so the films glide
   under the wheel at 1:1 instead of clicking between fixed places.
   That was the whole complaint with the timed version: on a clock it
   either lurches or waits, and neither matches what the hand is doing.

   The reels are rendered CYCLES times over, and the scroll only ever
   travels across the middle copy. The copies either side exist purely
   to stand in the neighbour slots, so the first and last reel have a
   film beside them instead of empty ground — and because the position
   never leaves the middle band, nothing has to wrap or jump to do it.
   ============================================================ */
/** Scroll distance each reel holds while the section is pinned. */
const FILM_SCROLL = 0.7; // × viewport height

/** Reels repeated along the track, so the ends are never bare. */
const CYCLES = 3;

export function Films() {
  const base = FILMS.items;
  const items = Array.from({ length: CYCLES }, () => base).flat();
  /* Scroll drives the position across the MIDDLE copy only: [n, 2n-1]. */
  const FIRST = base.length;

  /* The ROUNDED position, for the crop-marks, counter and dots. The smooth
     position lives in a CSS variable instead — see the pin effect. Keeping
     them apart is deliberate: re-rendering React on every scroll frame to
     move a track is exactly how a carousel starts to feel heavy. */
  const [active, setActive] = useState(FIRST);
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  /* Set while a drag is being released, so the click it generates does not
     open Instagram. Cleared on the next frame, after the click has fired. */
  const draggedRef = useRef(false);
  /* While pinned, the scroll position IS the carousel position, so the
     controls have to move the window rather than set state — otherwise the
     next scroll frame would snap it straight back. */
  const pinnedRef = useRef(false);
  const stepPxRef = useRef(0);

  /** Write the continuous track position without re-rendering. */
  const setPos = (p: number) =>
    trackRef.current?.style.setProperty("--pos", String(p));

  const go = (dir: number) => {
    if (pinnedRef.current && stepPxRef.current) {
      window.scrollBy({ top: dir * stepPxRef.current, behavior: "smooth" });
      return;
    }
    setActive((i) => {
      // Off the pin, stay inside the middle copy so the neighbours hold.
      const n = Math.min(FIRST + base.length - 1, Math.max(FIRST, i + dir));
      setPos(n);
      return n;
    });
  };

  /* Pin the section and drive the track from scroll. Desktop only — pinning
     on a phone traps the scroll, which is why the old collection carousel
     guarded this behind a matchMedia too. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        const step = () => window.innerHeight * FILM_SCROLL;
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${(base.length - 1) * step()}`,
          pin: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            stepPxRef.current = step();
          },
          onToggle: (self) => {
            pinnedRef.current = self.isActive;
            setScrubbing(self.isActive);
          },
          onUpdate: (self) => {
            // Continuous, and offset into the middle copy so slide FIRST-1
            // sits in the "previous" slot even on the very first reel.
            const p = FIRST + self.progress * (base.length - 1);
            setPos(p);
            const i = Math.round(p);
            setActive((prev) => (prev === i ? prev : i));
          },
        });
        stepPxRef.current = step();
        return () => {
          pinnedRef.current = false;
          setScrubbing(false);
          st.kill();
        };
      });
    }, root);

    return () => ctx.revert();
  }, [base.length]);

  /* Off the pin (phones, reduced motion) the position follows the index. */
  useEffect(() => {
    if (!scrubbing) setPos(active);
  }, [active, scrubbing]);

  /* ---- drag / swipe ----
     Pointer events cover mouse, touch and pen in one path. The gesture is
     direction-locked: until the pointer has moved further horizontally than
     vertically it is treated as a page scroll and left alone, so dragging
     down the page over a film still scrolls. */
  const gesture = useRef({ x: 0, y: 0, locked: false, active: false });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    gesture.current = { x: e.clientX, y: e.clientY, locked: false, active: true };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g.active) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;

    if (!g.locked) {
      // Not enough movement yet to tell which way this gesture is going.
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        g.active = false; // vertical: hand it back to the page
        return;
      }
      g.locked = true;
      setDragging(true);
      trackRef.current?.setPointerCapture(e.pointerId);
    }
    setDrag(dx);
  };

  const endDrag = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g.active || !g.locked) {
      gesture.current = { x: 0, y: 0, locked: false, active: false };
      setDragging(false);
      return;
    }
    const dx = e.clientX - g.x;
    gesture.current = { x: 0, y: 0, locked: false, active: false };

    // Past a quarter of a slide, commit to the next reel; otherwise spring
    // back to the one we started on.
    const slide = trackRef.current?.querySelector<HTMLElement>(".films__slide");
    const threshold = (slide?.offsetWidth ?? 400) * 0.25;
    if (Math.abs(dx) > threshold) go(dx < 0 ? 1 : -1);

    // The slides are links, so releasing a drag fires a click on one. Flag it
    // for that click, then clear once the event has passed.
    draggedRef.current = true;
    requestAnimationFrame(() => {
      draggedRef.current = false;
    });

    setDrag(0);
    setDragging(false);
  };

  const stateOf = (d: number) => {
    if (d === 0) return "active";
    if (d === 1) return "next";
    if (d === -1) return "prev";
    return "rest";
  };

  return (
    <section className="sect films" ref={rootRef} data-nav-tone="dark">
      <div className="shell">
        {/* No section index here: "The Edit" numbering already belongs to the
            editorial showcase above, and the old carousel carried none. */}
        <div className="films__head">
          <Reveal as="span" dir="left" className="films__label">
            {FILMS.label}
          </Reveal>
          <Reveal className="films__phil" dir="up" delay={0.06}>
            <span>{FILMS.kicker}</span>
            <p>{FILMS.body}</p>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed: the track sits outside .shell so the neighbouring films
          can bleed past both edges of the viewport. */}
      {/* data-reveal hands the stage to the page-wide reveal engine, which
          flips data-inview on scroll; the films then rise into place in a
          stagger keyed off their position (see .films__slide in editorial.css). */}
      <div
        className="films__stage"
        data-reveal="fade"
        data-reveal-start="top 82%"
      >
        <div
          className="films__track"
          ref={trackRef}
          data-dragging={dragging || undefined}
          data-scrub={scrubbing || undefined}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ "--drag": `${drag}px` } as React.CSSProperties}
        >
          {items.map((f, i) => (
            <a
              className="films__slide"
              key={`${i}-${f.source}`}
              href={f.source}
              target="_blank"
              rel="noopener noreferrer"
              data-state={stateOf(i - active)}
              data-cursor="Watch"
              aria-label={`${f.alt} — watch on Instagram`}
              style={{ "--i": i } as React.CSSProperties}
              // A click that ends a drag is not a click on the film; without
              // this, swiping the track would open Instagram.
              onClick={(e) => {
                if (draggedRef.current) e.preventDefault();
              }}
            >
              <Image
                src={f.poster}
                alt={f.alt}
                width={1280}
                height={720}
                sizes="(max-width: 680px) 74vw, 31vw"
                unoptimized
              />
              {/* Corner crop-marks, drawn as eight background gradients so the
                  frame needs no extra markup. Only shown on the active film. */}
              <span className="films__marks" aria-hidden="true" />
              {/* The films play on Instagram, so the active one carries a play
                  cue rather than pretending it will start in place. */}
              {stateOf(i - active) === "active" ? (
                <span className="films__play" aria-hidden="true">
                  ▶
                </span>
              ) : null}
              {/* Drag affordance, sitting on the upcoming film as in the
                  reference — it tells you the track is draggable without
                  adding a control. */}
              {stateOf(i - active) === "next" ? (
                <span className="films__hint" aria-hidden="true">
                  [ Drag ]
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>

      <div className="shell">
        <Reveal className="films__bar" dir="up">
          <span className="films__count">
            {String((active % base.length) + 1).padStart(2, "0")} /{" "}
            {String(base.length).padStart(2, "0")}
          </span>

          <span className="films__dots">
            {base.map((f, i) => (
              <button
                className="films__dot"
                type="button"
                key={f.src}
                onClick={() => go(i - (active % base.length))}
                aria-label={`Film ${i + 1}`}
                aria-current={i === active % base.length}
              />
            ))}
          </span>

          <span className="films__controls">
            {/* Points at where the films actually live, since the tiles are
                thumbnails rather than players. */}
            <a
              className="films__sound"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on Instagram
            </a>
            <button className="sctl__nav" type="button" onClick={() => go(-1)} aria-label="Previous film">
              ←
            </button>
            <button className="sctl__nav" type="button" onClick={() => go(1)} aria-label="Next film">
              →
            </button>
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   05 — OUR STORY
   Two-tone heading and copy on the left against an oversized
   image, then a 4x2 grid where two cells carry text instead of
   photography to break the rhythm.
   ============================================================ */
export function Story({ index }: { index?: string } = {}) {
  return (
    <section className="sect sect--comp objects" data-nav-tone="light">
      <div className="shell">
        <Reveal as="p" dir="fade" className="shead__index" style={{ marginBottom: "clamp(1rem,1.8vw,1.8rem)" }}>
          {index ?? SECTION_INDEX.story}
        </Reveal>

        <div className="objects__top">
          <div>
            <LineReveal
              as="h2"
              className="objects__title tt"
              step={0.1}
              lines={[OUR_STORY.titleLines[0], <em key="em">{OUR_STORY.titleEm}</em>]}
            />
            <Reveal className="objects__copy" dir="left" delay={0.1}>
              {OUR_STORY.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>

          <ImageReveal className="objects__hero" delay={0.08}>
            <Image
              src={OUR_STORY.hero.src}
              alt={OUR_STORY.hero.alt}
              width={1240}
              height={961}
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </ImageReveal>
        </div>

        <div className="objects__grid" data-reveal-stagger="0.05">
          {OUR_STORY.grid.map((cell, i) =>
            cell.kind === "text" ? (
              <Reveal
                className={`objects__cell objects__cell--text${cell.accent ? " objects__cell--accent" : ""}`}
                dir={i % 2 ? "up" : "left"}
                key={i}
              >
                <p>{cell.text}</p>
              </Reveal>
            ) : (
              <Reveal className="objects__cell" dir={i % 2 ? "up" : "right"} key={i}>
                <Image
                  src={cell.src!}
                  alt={cell.alt!}
                  width={620}
                  height={620}
                  sizes="(max-width: 680px) 50vw, 22vw"
                  unoptimized
                />
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   06 — HOUSE BRANDS
   ============================================================ */
export function Brands({ index }: { index?: string } = {}) {
  return (
    <section className="sect house" data-nav-tone="light">
      <div className="shell">
        {/* The section heading is unchanged: index left, two-tone line right,
            exactly as it was before the logo treatment was reworked. */}
        <div className="shead">
          <Reveal as="p" dir="fade" className="shead__index">
            {index ?? SECTION_INDEX.brands}
          </Reveal>
          <LineReveal
            as="h2"
            className="t-h3 tt"
            step={0.09}
            lines={["Five brands,", <em key="em">one house standard.</em>]}
          />
        </div>

        <div className="house__row" data-reveal-stagger="0.06">
          {BRANDS.map((b) => (
            <Reveal
              as="a"
              className="house__cell"
              dir="up"
              key={b.name}
              href={b.href}
              data-cursor="Open"
              aria-label={`${b.name} by Sarom`}
            >
              {/* Two states stacked so they cross-fade in place: a neutral
                  grey mark at rest, the real logo on hover. Both are trimmed
                  to identical bounds, so nothing shifts between them. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="house__logo house__logo--grey" src={b.logoGrey} alt="" aria-hidden="true" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="house__logo house__logo--colour" src={b.logoColour} alt={`${b.name} by Sarom`} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   07 — CLOSING CTA
   An image-left / copy-right card floated on the dark ground,
   so the page closes on one deliberate object rather than a
   centred block of type.
   ============================================================ */
export function ClosingCta() {
  return (
    <section className="sect sect--comp letter" data-nav-tone="dark">
      <div className="shell">
        <Reveal className="letter__card" dir="scale" start="top 88%">
          <ImageReveal className="letter__img" delay={0.08}>
            <Image
              src={LETTER.src}
              alt={LETTER.alt}
              width={760}
              height={646}
              sizes="(max-width: 1024px) 100vw, 40vw"
              unoptimized
            />
          </ImageReveal>

          <div className="letter__body">
            <LineReveal
              as="h2"
              className="letter__title"
              step={0.1}
              lines={[LETTER.titleLines[0], <em key="em">{LETTER.titleEm}</em>]}
            />
            <Reveal as="p" dir="right" delay={0.12}>
              {LETTER.body}
            </Reveal>
            <Reveal className="letter__actions" dir="up" delay={0.18}>
              <a className="letter__btn" href={LETTER.primary.href} data-cursor="View">
                {LETTER.primary.label}
                <Arrow className="" />
              </a>
              <a
                className="letter__btn letter__btn--ghost"
                href={LETTER.secondary.href}
                data-cursor="Find"
              >
                {LETTER.secondary.label}
                <Arrow className="" />
              </a>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
