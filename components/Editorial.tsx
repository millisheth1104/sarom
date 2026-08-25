"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  SECTION_INDEX,
  FILMS,
  OUR_STORY,
  BRANDS,
  LETTER,
} from "@/lib/content";
import { Reveal, LineReveal, ImageReveal, Arrow } from "./Motion";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

/* ============================================================
   04 — THE EDIT (film carousel)
   Centre-stage slider on a charcoal ground: the active film sits
   framed by corner crop-marks, its neighbours dimmed and bleeding
   off both edges. Only the active film plays — muted and looping,
   because browsers refuse unmuted autoplay; sound is opt-in via
   the control in the bar.
   ============================================================ */
/** How long each film holds before the carousel advances itself. Long enough
 *  to actually watch a shot land — six seconds cut the films off mid-moment.
 *  The countdown in the active marker is driven off this same number. */
const AUTOPLAY_MS = 12000;

export function Films() {
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  /* Auto-advance is suspended while the pointer is over the carousel, while a
     drag is in progress, and whenever the section is off-screen — advancing a
     slider nobody is looking at just burns battery. Hover and drag are tracked
     separately so releasing a drag with the mouse still over the carousel
     keeps it paused. */
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [drag, setDrag] = useState(0);

  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const items = FILMS.items;

  const go = (dir: number) =>
    setActive((i) => (i + dir + items.length) % items.length);

  const autoplaying = onScreen && !hover && !dragging && !prefersReducedMotion();

  /* Auto-advance. Keyed on `active` too, so any manual move (arrow, dot, drag)
     restarts the countdown rather than firing mid-way through the new film. */
  useEffect(() => {
    if (!autoplaying) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, autoplaying]);

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

    // Past a quarter of a slide, commit to the next film; otherwise spring
    // back to the one we started on.
    const slide = trackRef.current?.querySelector<HTMLElement>(".films__slide");
    const threshold = (slide?.offsetWidth ?? 400) * 0.25;
    if (Math.abs(dx) > threshold) go(dx < 0 ? 1 : -1);

    setDrag(0);
    setDragging(false);
  };

  /* Exactly one film is ever decoding: the others are paused and rewound.
     Six simultaneous video elements is the difference between a smooth
     section and a stuttering one on a mid-range laptop. */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.muted = !sound;
        // play() rejects if the browser blocks it (no gesture yet, or the
        // file is missing) — the poster stays up, which is the right
        // fallback, so the rejection is swallowed rather than thrown.
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [active, sound]);

  /* Stop playback entirely once the section leaves the screen. Without this
     the film keeps decoding for the whole rest of the page. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        const v = videoRefs.current[active];
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [active]);

  /* SHORTEST-PATH offset of each film from the active one, wrapped into
     [-n/2, n/2). This is what makes the carousel endless without cloning a
     single <video>: the six real elements are repositioned around the active
     one, so there is always a film to the left and right and film 6 → film 1
     is a one-step move rather than a rewind across the whole track. */
  const offsets = items.map((_, i) => {
    const n = items.length;
    return ((i - active + Math.floor(n / 2) + n) % n) - Math.floor(n / 2);
  });

  /* A film that wraps from one end of the track to the other must not animate
     across it — it would fly through the middle of the frame. Both ends of a
     wrap are off-screen, so the jump is invisible if the transition is simply
     dropped for that one frame. */
  const prevOffsets = useRef<number[]>([]);
  const jumped = offsets.map((d, i) => {
    const p = prevOffsets.current[i];
    return p === undefined || Math.abs(d - p) > 1;
  });
  useEffect(() => {
    prevOffsets.current = offsets;
  });

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
      {/* Hover-to-pause is for mice only: on a touch screen pointerenter fires
          on tap and never leaves, which would strand autoplay off for good. */}
      {/* data-reveal hands the stage to the page-wide reveal engine, which
          flips data-inview on scroll; the films then rise into place in a
          stagger keyed off their position (see .films__slide in editorial.css). */}
      <div
        className="films__stage"
        data-reveal="fade"
        data-reveal-start="top 82%"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      >
        <div
          className="films__track"
          ref={trackRef}
          data-dragging={dragging || undefined}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ "--drag": `${drag}px` } as React.CSSProperties}
        >
          {items.map((f, i) => (
            <div
              className="films__slide"
              key={f.src}
              data-state={stateOf(offsets[i])}
              data-jump={jumped[i] || undefined}
              style={{ "--d": offsets[i] } as React.CSSProperties}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                poster={f.poster}
                muted
                loop
                playsInline
                // Only the active film is worth fetching up front; the rest
                // load their poster and nothing else until they come round.
                preload={i === active ? "auto" : "none"}
                aria-label={f.alt}
              >
                <source src={f.src} type="video/mp4" />
              </video>
              {/* Corner crop-marks, drawn as eight background gradients so the
                  frame needs no extra markup. Only shown on the active film. */}
              <span className="films__marks" aria-hidden="true" />
              {/* Drag affordance, sitting on the upcoming film as in the
                  reference — it tells you the track is draggable without
                  adding a control. */}
              {stateOf(offsets[i]) === "next" ? (
                <span className="films__hint" aria-hidden="true">
                  [ Drag ]
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="shell">
        <Reveal className="films__bar" dir="up">
          <span className="films__count">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>

          <span className="films__dots">
            {items.map((f, i) => (
              <button
                className="films__dot"
                type="button"
                key={f.src}
                onClick={() => setActive(i)}
                aria-label={`Film ${i + 1}`}
                aria-current={i === active}
              >
                {/* The active marker doubles as the autoplay countdown. Keyed
                    on `active` so React remounts it and the CSS animation
                    restarts from zero on every change of film. */}
                {i === active ? (
                  <span
                    className="films__fill"
                    key={active}
                    data-running={autoplaying || undefined}
                    style={{ "--dur": `${AUTOPLAY_MS}ms` } as React.CSSProperties}
                  />
                ) : null}
              </button>
            ))}
          </span>

          <span className="films__controls">
            <button
              className="films__sound"
              type="button"
              onClick={() => setSound((s) => !s)}
              aria-pressed={sound}
            >
              Sound {sound ? "on" : "off"}
            </button>
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
export function Story() {
  return (
    <section className="sect sect--comp objects" data-nav-tone="light">
      <div className="shell">
        <Reveal as="p" dir="fade" className="shead__index" style={{ marginBottom: "clamp(1rem,1.8vw,1.8rem)" }}>
          {SECTION_INDEX.story}
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
export function Brands() {
  return (
    <section className="sect sect--comp house" data-nav-tone="light">
      <div className="shell">
        <div className="shead">
          <Reveal as="p" dir="fade" className="shead__index">
            {SECTION_INDEX.brands}
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
              dir="scale"
              key={b.name}
              href={b.href}
              data-cursor="Open"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.logo} alt={`${b.name} by Sarom`} loading="lazy" />
              <span>{b.name}</span>
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
