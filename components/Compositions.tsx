"use client";

import Image from "next/image";
import { useState } from "react";
import { SECTION_INDEX } from "@/lib/content";
import { STUDIO, PRODUCT } from "@/lib/replicas";
import { Reveal, ImageReveal, Arrow } from "./Motion";

/** Small diagonal arrow used in badges and round buttons. */
function Diag() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 8 8 2M8 2H3.4M8 2v4.6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/* ============================================================
   02 — STUDIO
   Replica structure: left rail, topbar with search cluster, a
   three-up card row, then a feature image beside a tall panel.
   ============================================================ */
export function Showroom() {
  return (
    <section className="sect sect--comp sect--ivory" data-nav-tone="light">
      <div className="shell">
        <div className="shead">
          <Reveal as="p" dir="fade" className="shead__index">
            {SECTION_INDEX.showroom}
          </Reveal>
          <Reveal as="h2" dir="left" className="t-h3 tt">
            A showroom <em>you can scroll.</em>
          </Reveal>
        </div>
      </div>

      <Reveal className="comp studio" dir="scale" start="top 88%">
        {/* three cards; each label group is a NOTCH cut into the image corner,
            filled with the card ground, rather than a pill floating on top */}
        <div className="studio__cards" data-reveal-stagger="0.07">
          {STUDIO.cards.map((c) => (
            <Reveal className="studio__card" dir="up" key={c.name}>
              <Image
                src={c.src}
                alt={c.alt}
                width={760}
                height={600}
                sizes="(max-width: 680px) 50vw, 30vw"
                unoptimized
              />
              <span className="studio__notch">
                <span className="studio__pill">{c.family}</span>
                <span className="studio__pill">{c.name}</span>
              </span>
            </Reveal>
          ))}
        </div>

        {/* feature image with two cuts — copy at bottom-left, vertical tag on
            the right edge — beside a dark secondary panel */}
        <div className="studio__lower">
          <ImageReveal className="studio__feature" delay={0.08}>
            <Image
              src={STUDIO.feature.src}
              alt={STUDIO.feature.alt}
              width={1240}
              height={776}
              sizes="(max-width: 1024px) 100vw, 58vw"
              data-cursor="Explore"
              unoptimized
            />
            <span className="studio__featurecopy">
              <h3>{STUDIO.feature.title}</h3>
              <p>{STUDIO.feature.body}</p>
            </span>
            <span className="studio__vtag">
              <b>{STUDIO.feature.tagName}</b>
              {STUDIO.feature.tagMeta}
            </span>
          </ImageReveal>

          <Reveal className="studio__panel" dir="right" delay={0.14}>
            <span className="studio__panelhead">
              <h3>
                {STUDIO.panel.kicker.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </h3>
              <a className="studio__round" href={STUDIO.panel.href} data-cursor="Open">
                <Diag />
              </a>
            </span>
            <span className="studio__panelimg">
              <Image
                src={STUDIO.panel.src}
                alt={STUDIO.panel.alt}
                width={1000}
                height={1250}
                sizes="(max-width: 1024px) 100vw, 30vw"
                unoptimized
              />
            </span>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   03 — PRODUCT EDITORIAL
   Replica structure: charcoal copy panel (pill nav, uppercase
   heading, thumbnail row with corner badges, arrow controls,
   paragraph) beside a dominant image carrying a CTA pill, two
   floating labels and a tag cluster.
   ============================================================ */
export function EditorialShowcase() {
  const [active, setActive] = useState(0);
  const items = PRODUCT.thumbs;
  const step = (d: number) => setActive((i) => (i + d + items.length) % items.length);

  return (
    <section className="sect sect--comp sect--linen" data-nav-tone="light">
      <div className="shell">
        <div className="shead">
          <Reveal as="p" dir="fade" className="shead__index">
            {SECTION_INDEX.editorial}
          </Reveal>
          <Reveal dir="right">
            <a className="tlink" href="/ecatalogue.php" data-cursor="View">
              View e-Catalogue
              <Arrow className="" />
            </a>
          </Reveal>
        </div>
      </div>

      <Reveal className="comp product" dir="scale" start="top 88%">
        <div className="product__body">
          <div className="product__copy">
            <nav className="product__nav" aria-label="Fabrics">
              {PRODUCT.nav.map((l) => (
                <a key={l.label} href={l.href} data-active={l.active ? "true" : undefined}>
                  {l.label}
                </a>
              ))}
            </nav>

            <h2 className="product__title">
              {PRODUCT.titleLines.map((l) => (
                <span key={l} style={{ display: "block" }}>
                  {l}
                </span>
              ))}
            </h2>

            {/* thumbnails: this row breaks out to the right, over the hero */}
            <div className="product__thumbs">
              {items.map((t, i) => (
                <button
                  className="product__thumb"
                  key={t.src}
                  type="button"
                  aria-pressed={i === active}
                  aria-label={`Show ${t.name}`}
                  onClick={() => setActive(i)}
                >
                  <Image src={t.src} alt={t.alt} width={560} height={560} sizes="12vw"
            unoptimized
          />
                  <span className="product__badge">
                    <Diag />
                  </span>
                </button>
              ))}
            </div>

            <div className="product__controls">
              <button
                className="product__ctl"
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous fabric"
              >
                ←
              </button>
              <button
                className="product__ctl"
                type="button"
                onClick={() => step(1)}
                aria-label="Next fabric"
              >
                →
              </button>
            </div>

            <p>{PRODUCT.body}</p>
          </div>

          {/* dominant image */}
          <ImageReveal className="product__hero" delay={0.1}>
            {items.map((t, i) => (
              <Image
                key={t.hero}
                src={t.hero}
                alt={t.heroAlt}
                width={1240}
                height={1302}
                sizes="(max-width: 1024px) 100vw, 56vw"
                data-active={i === active}
                data-cursor="View"
            unoptimized
          />
            ))}

            <a className="product__cta" href={PRODUCT.action.href} data-cursor="Open">
              {PRODUCT.action.label}
              <span>
                <Diag />
              </span>
            </a>

            <span className="product__float product__float--a">{PRODUCT.floating[0]}</span>
            <span className="product__float product__float--b">{PRODUCT.floating[1]}</span>

            <span className="product__tags">
              {[PRODUCT.tags.slice(0, 3), PRODUCT.tags.slice(3)].map((row, i) => (
                <span className="product__tagrow" key={i}>
                  {row.map((t) => (
                    <span className="product__tag" key={t}>
                      {t}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </ImageReveal>
        </div>
      </Reveal>
    </section>
  );
}
