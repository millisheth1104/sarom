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
  const [slide, setSlide] = useState(0);
  const [preview, setPreview] = useState(0);
  const slides = STATEMENT.slides;
  const stepSlide = (d: number) =>
    setSlide((i) => (i + d + slides.length) % slides.length);

  const current = slides[slide];

  return (
    <section className="sect sect--comp sect--ivory statement" data-nav-tone="light">
      <div className="shell">
        <Reveal as="p" dir="fade" className="shead__index" style={{ marginBottom: "clamp(1rem,1.8vw,1.8rem)" }}>
          {STATEMENT.index}
        </Reveal>

        {/* ---- section nav ---- */}
        <Reveal className="coll__nav" dir="fade">
          <span className="coll__mark">
            sarom<i>.</i>
          </span>
          <span className="coll__navlinks">
            {STATEMENT.nav.map((l) => (
              <a key={l.label} href={l.href} data-active={l.active ? "true" : undefined}>
                {l.label}
              </a>
            ))}
          </span>
          <a className="cpill" href={STATEMENT.action.href} data-cursor="Open">
            {STATEMENT.action.label}
            <Arrow className="" />
          </a>
        </Reveal>

        {/* ---- main composition ---- */}
        <div className="coll__main">
          <div className="coll__left">
            {/* three interactive previews */}
            <Reveal className="coll__previews" dir="up" delay={0.06}>
              <button
                className="coll__arrow"
                type="button"
                onClick={() => stepSlide(-1)}
                aria-label="Previous collection"
              >
                ←
              </button>
              <span className="coll__thumbs">
                {slides.map((s, i) => (
                  <button
                    className="coll__thumb"
                    key={s.num}
                    type="button"
                    aria-pressed={i === slide}
                    onClick={() => setSlide(i)}
                  >
                    <span className="coll__thumbframe">
                      <Image
                        src={s.thumb}
                        alt={`${s.name} collection preview`}
                        width={620}
                        height={496}
                        sizes="(max-width: 680px) 30vw, 13vw"
            unoptimized
          />
                    </span>
                    <span>{s.name}</span>
                  </button>
                ))}
              </span>
              <button
                className="coll__arrow"
                type="button"
                onClick={() => stepSlide(1)}
                aria-label="Next collection"
              >
                →
              </button>
            </Reveal>

            <LineReveal
              as="h2"
              className="coll__title"
              step={0.1}
              lines={[...STATEMENT.titleLines, <em key="em">{STATEMENT.titleEm}</em>]}
            />

            <Reveal as="p" dir="left" className="coll__lede" delay={0.12}>
              {STATEMENT.body}
            </Reveal>

            <div className="coll__stats" data-reveal-stagger="0.07">
              {STATEMENT.stats.map((s) => (
                <Reveal className="coll__stat" dir="up" key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---- the dominant hero ---- */}
          <ImageReveal className="coll__hero" delay={0.1}>
            {slides.map((s, i) => (
              <Image
                key={s.num}
                src={s.hero}
                alt={s.heroAlt}
                width={1240}
                height={1302}
                sizes="(max-width: 1024px) 100vw, 52vw"
                data-active={i === slide}
                priority={i === 0}
                data-cursor="View"
            unoptimized
          />
            ))}
            <span className="coll__pill coll__pill--a">{current.labels[0]}</span>
            <span className="coll__pill coll__pill--b">{current.labels[1]}</span>

            <span className="coll__rail">
              {slides.map((s, i) => (
                <button
                  className="coll__railbtn"
                  key={s.num}
                  type="button"
                  aria-pressed={i === slide}
                  aria-label={`Show ${s.name}`}
                  onClick={() => setSlide(i)}
                >
                  {s.num}
                </button>
              ))}
            </span>
          </ImageReveal>
        </div>

      </div>
    </section>
  );
}
