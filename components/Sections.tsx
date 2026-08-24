"use client";

import Image from "next/image";
import { useState } from "react";

import {
  STATEMENT,
  SECTION_INDEX,
} from "@/lib/content";
import { Reveal, LineReveal, ImageReveal, Arrow } from "./Motion";

/* ============================================================
   01 — THE COLLECTIONS EDITORIAL

   One connected composition. Previews and the 01/02/03 rail both
   drive a single `slide` index, so the hero always agrees with
   whichever control was used. Hovering the catalogue drives the
   secondary image independently.
   ============================================================ */
export function Statement() {
  const [active, setActive] = useState(0);
  const slides = STATEMENT.slides;
  const step = (d: number) =>
    setActive((i) => (i + d + slides.length) % slides.length);

  return (
    <section className="sect sect--comp sect--ivory statement" data-nav-tone="light">
      <div className="shell">
        <Reveal as="p" dir="fade" className="shead__index" style={{ marginBottom: "clamp(0.9rem,1.6vw,1.6rem)" }}>
          {STATEMENT.index}
        </Reveal>
      </div>

      <Reveal className="comp comp--wide belong" dir="scale" start="top 90%">
        <div className="belong__grid">
          {/* ---- light left column ---- */}
          <div className="belong__left">
            <nav className="belong__nav" aria-label="Collections">
              {STATEMENT.nav.map((l) => (
                <a key={l.label} href={l.href} data-active={l.active ? "true" : undefined}>
                  {l.label}
                </a>
              ))}
            </nav>

            {/* thumbnails: labels sit ON the image, arrows overlap the row */}
            <div className="belong__previews">
              <button
                className="belong__arrow belong__arrow--prev"
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous collection"
              >
                ‹
              </button>
              {slides.map((s, i) => (
                <button
                  className="belong__thumb"
                  key={s.num}
                  type="button"
                  aria-pressed={i === active}
                  aria-label={`Show ${s.name}`}
                  onClick={() => setActive(i)}
                >
                  <Image
                    src={s.thumb}
                    alt={`${s.name} collection preview`}
                    width={620}
                    height={527}
                    sizes="14vw"
                    unoptimized
                  />
                  <span>{s.name}</span>
                </button>
              ))}
              <button
                className="belong__arrow belong__arrow--next"
                type="button"
                onClick={() => step(1)}
                aria-label="Next collection"
              >
                ›
              </button>
            </div>

            <Reveal as="h2" dir="left" className="belong__title" delay={0.06}>
              {STATEMENT.titleLines.map((l) => (
                <span key={l} style={{ display: "block" }}>
                  {l}
                </span>
              ))}
              <em style={{ display: "block" }}>{STATEMENT.titleEm}</em>
            </Reveal>

            <Reveal as="p" dir="left" delay={0.12}>
              {STATEMENT.body}
            </Reveal>

            <Reveal className="belong__tags" dir="left" delay={0.18}>
              {STATEMENT.tags.map((t) => (
                <a className="belong__tag" key={t} href="/ecatalogue.php">
                  {t}
                </a>
              ))}
            </Reveal>
          </div>

          {/* ---- full-height tinted panel: shop pill, rail, dominant image ---- */}
          <ImageReveal className="belong__panel" delay={0.1}>
            {slides.map((s, i) => (
              <Image
                key={s.num}
                src={s.hero}
                alt={s.heroAlt}
                width={1030}
                height={1081}
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-active={i === active}
                data-cursor="View"
                unoptimized
              />
            ))}

            {/* the wrapper IS the ivory channel carved around the pill — see
                .belong__shopwrap. A ring on the pill itself can't work: it
                would follow the pill's own radius and curve away from the
                panel edges. */}
            <span className="belong__shopwrap">
              <a className="belong__shop" href={STATEMENT.action.href} data-cursor="Open">
                {STATEMENT.action.label}
                <Arrow className="" />
              </a>
            </span>

            <span className="belong__rail">
              {slides.map((s, i) => (
                <button
                  className="belong__railbtn"
                  key={s.num}
                  type="button"
                  aria-pressed={i === active}
                  aria-label={`Show ${s.name}`}
                  onClick={() => setActive(i)}
                >
                  {s.num}
                </button>
              ))}
            </span>

            <span className="belong__float belong__float--a">{slides[active].labels[0]}</span>
            <span className="belong__float belong__float--b">{slides[active].labels[1]}</span>
          </ImageReveal>
        </div>
      </Reveal>
    </section>
  );
}
