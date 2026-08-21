"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  SECTION_INDEX,
  IN_THE_ROOM,
  OUR_STORY,
  BRANDS,
  LETTER,
} from "@/lib/content";
import { Reveal, LineReveal, ImageReveal, Arrow } from "./Motion";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

/* ============================================================
   04 — IN THE ROOM
   Label / philosophy / pill across the top, then three image
   cards stepped progressively lower so the row reads as a
   composition rather than a rank of equal tiles.
   ============================================================ */
export function InTheRoom() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  /* The heading scrolls away first, then the CARD ROW pins and the carousel
     is driven by page scroll — so the reader cannot reach the next section
     until the last card has passed, and the cards keep their full size
     instead of being shrunk to share a viewport with the heading.
     Desktop only: pinning on a phone traps the scroll. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();

    const root = rootRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!root || !track || !viewport) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);

        // Scroll-snap fights programmatic scrollLeft, so it is disabled while
        // the pin owns the position and restored when the pin releases.
        const st = ScrollTrigger.create({
          // trigger on the card area, not the section, so the head leaves first
          trigger: viewport,
          start: "top 9%",
          end: () => `+=${distance()}`,
          pin: viewport,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            pinnedRef.current = self.isActive;
            track.style.scrollSnapType = self.isActive ? "none" : "";
          },
          onUpdate: (self) => {
            track.scrollLeft = self.progress * distance();
          },
        });

        return () => {
          track.style.scrollSnapType = "";
          pinnedRef.current = false;
          st.kill();
        };
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const step = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".edit3__card");
    const gap = parseFloat(getComputedStyle(el).columnGap || "24") || 24;
    const by = (card?.offsetWidth ?? 320) + gap;

    // While pinned, 1px of page scroll equals 1px of track scroll (the pin
    // duration is exactly the track's overflow), so moving the window keeps
    // the arrows and the scrub in agreement.
    if (pinnedRef.current) {
      window.scrollBy({ top: dir * by, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * by, behavior: "smooth" });
    }
  };

  return (
    <section className="sect sect--comp edit3" ref={rootRef} data-nav-tone="light">
      <div className="shell">
        <div className="edit3__head">
          <Reveal as="span" dir="left" className="edit3__label">
            {IN_THE_ROOM.label}
          </Reveal>

          <Reveal className="edit3__phil" dir="up" delay={0.06}>
            <span>{IN_THE_ROOM.kicker}</span>
            <p>{IN_THE_ROOM.body}</p>
          </Reveal>

          <Reveal className="edit3__controls" dir="right" delay={0.12}>
            <button
              className="edit3__nav"
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous collections"
            >
              ←
            </button>
            <button
              className="edit3__nav"
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="More collections"
            >
              →
            </button>
            <a className="edit3__action" href={IN_THE_ROOM.cta.href} data-cursor="Open">
              {IN_THE_ROOM.cta.label}
              <i>
                <Arrow className="" />
              </i>
            </a>
          </Reveal>
        </div>

        <div className="edit3__viewport" ref={viewportRef}>
          <div className="edit3__row" ref={trackRef}>
          {IN_THE_ROOM.cards.map((c, i) => (
            <a
              className="edit3__card"
              key={c.name}
              href={c.href}
              data-cursor="View"
            >
              <ImageReveal className="edit3__frame" delay={i * 0.08}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={760}
                  height={874}
                  sizes="(max-width: 680px) 74vw, 30vw"
                  unoptimized
                />
                <span className="edit3__bar">
                  <span>
                    <b>{c.name}</b>
                    <span>{c.type}</span>
                  </span>
                  <i>
                    <Arrow className="" />
                  </i>
                </span>
              </ImageReveal>
            </a>
          ))}
          </div>

          {/* The arrows live in the heading, which scrolls away before the pin
              engages — so they are mirrored here, travelling with the pinned
              row, and stay reachable for the whole horizontal scroll. */}
          <div className="edit3__float">
            <button
              className="edit3__nav"
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous collections"
            >
              ←
            </button>
            <button
              className="edit3__nav"
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="More collections"
            >
              →
            </button>
          </div>
        </div>
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
