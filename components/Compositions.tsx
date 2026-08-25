"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SECTION_INDEX } from "@/lib/content";
import { PRODUCT } from "@/lib/replicas";
import { SHOWROOM_SLIDES, BRAND_STARTS } from "@/lib/catalogues";
import { Reveal, ImageReveal, Arrow } from "./Motion";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/** Small diagonal arrow used in badges and round buttons. */
function Diag() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 8 8 2M8 2H3.4M8 2v4.6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/* ============================================================
   02 — STUDIO / SHOWROOM SLIDER
   Same five-tile bento as before (3 cards + feature + panel), but
   now one slide per house brand: Next/Previous cross-fades the
   whole grid into the next brand's five catalogue tiles instead of
   showing a single fixed set.
   ============================================================ */
export function Showroom() {
  const [active, setActive] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const slides = SHOWROOM_SLIDES;
  const slide = slides[active];
  /* Five real catalogues per brand fill the bento: three cards across the
     top, then the feature image and the side panel. */
  const [cards, feature, panel] = [
    slide.tiles.slice(0, 3),
    slide.tiles[3],
    slide.tiles[4],
  ] as const;

  /* Per-tile wipe direction, matching the reference slider: it does not fade
     the grid, it opens each tile along ONE axis from a different edge, so the
     five tiles read as separate panels rather than one moving block.
     Measured off the reference mid-transition frame — full-height/part-width
     tiles are left-anchored, full-width/part-height ones top- or
     bottom-anchored. Order is [card, card, card, feature, panel].

     Units are percentages throughout and every string carries `round`, so
     GSAP sees the same structure at both ends and can interpolate number by
     number — and the tile keeps its corner radius through the wipe instead
     of snapping square. */
  const CLOSED = [
    [0, 100, 0, 0], // wipe in from the left
    [100, 0, 0, 0], // grow up from the bottom
    [0, 100, 0, 0],
    [0, 100, 0, 0],
    [0, 0, 100, 0], // drop down from the top
  ];
  /** inset() string for a tile, preserving its own corner radius. */
  const clip = (el: HTMLElement, sides: number[]) =>
    `inset(${sides.map((s) => `${s}%`).join(" ")} round ${
      getComputedStyle(el).borderTopLeftRadius || "0px"
    })`;

  /** The five catalogue tiles, in reading order, for the staggered swap. */
  const tiles = () =>
    [
      ...Array.from(cardsRef.current?.querySelectorAll<HTMLElement>(".studio__card") ?? []),
      lowerRef.current?.querySelector<HTMLElement>(".studio__feature"),
      lowerRef.current?.querySelector<HTMLElement>(".studio__panel"),
    ].filter(Boolean) as HTMLElement[];

  const go = (dir: number) => {
    const next = (active + dir + slides.length) % slides.length;
    if (next === active) return;

    const els = tiles();
    if (!els.length || prefersReducedMotion()) {
      setActive(next);
      return;
    }

    // Every tile is also a scroll-reveal target, so it carries a CSS
    // transition on opacity/transform (and clip-path on the feature). Left on,
    // that transition would interpolate GSAP's per-frame writes and the swap
    // would drag. Suspend it for the duration, restore it after.
    els.forEach((el) => {
      el.style.transition = "none";
    });
    // Queried fresh rather than reusing `els`, so the cleanup still lands on
    // whatever nodes the re-render left in place.
    const restore = () =>
      tiles().forEach((el) => {
        el.style.transition = "";
        // GSAP writes the individual translate/rotate/scale properties, not
        // the transform shorthand; clear them or they shadow the reveal CSS.
        // clip-path must go too, or the tile keeps the inline open state
        // instead of falling back to the reveal system's own rule.
        ["opacity", "transform", "translate", "rotate", "scale", "clip-path"].forEach((p) =>
          el.style.removeProperty(p)
        );
      });

    // Reverse the wipe order on Previous so the motion reads as coming from
    // the direction the reader asked for.
    const closedFor = (list: HTMLElement[]) => (_i: number, t: HTMLElement) =>
      clip(t, CLOSED[list.indexOf(t)] ?? CLOSED[0]);
    const openFor = (_i: number, t: HTMLElement) => clip(t, [0, 0, 0, 0]);
    const seq = (list: HTMLElement[]) => (dir > 0 ? list : [...list].reverse());

    gsap.to(seq(els), {
      clipPath: closedFor(els),
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.045,
      onComplete: () => {
        setActive(next);
        requestAnimationFrame(() => {
          const fresh = tiles();
          gsap.fromTo(
            seq(fresh),
            { clipPath: closedFor(fresh) },
            {
              clipPath: openFor,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.07,
              onComplete: restore,
            }
          );
        });
      },
    });
  };

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

        <Reveal className="showroom__bar" dir="up" delay={0.06}>
          {/* Page within the current brand, not position in the whole run —
              "04 / 27" of SJ reads better than "04 / 43" of everything. */}
          <span className="showroom__count">
            {String(slide.page).padStart(2, "0")} / {String(slide.pages).padStart(2, "0")}
          </span>

          {/* SJ alone is 27 slides, so stepping is not a realistic way to
              reach the other brands. These jump straight to a brand's first
              page. */}
          <span className="showroom__brands">
            {BRAND_STARTS.map((b) => (
              <button
                key={b.brand}
                type="button"
                className="showroom__brandtab"
                onClick={() => setActive(b.index)}
                aria-current={b.brand === slide.brand}
              >
                {b.brand}
              </button>
            ))}
          </span>

          <span className="showroom__controls">
            <button className="sctl__nav" type="button" onClick={() => go(-1)} aria-label="Previous catalogues">
              ←
            </button>
            <button className="sctl__nav" type="button" onClick={() => go(1)} aria-label="More catalogues">
              →
            </button>
          </span>
        </Reveal>
      </div>

      {/* Arrows are SIBLINGS of the composition, not children: .comp clips its
          overflow, so anything absolutely positioned past its edge would be
          cut off. A flex row gives them their own track outside the grid, so
          they never sit on top of a tile. */}
      <div className="showroom__stage">
        <button
          className="studio__arrow studio__arrow--prev"
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous brand"
        >
          ←
        </button>

        <Reveal className="comp studio" dir="scale" start="top 88%">
        {/* three cards; each label group is a NOTCH cut into the image corner,
            filled with the card ground, rather than a pill floating on top */}
        <div className="studio__cards" ref={cardsRef} data-reveal-stagger="0.07">
          {cards.map((c, i) => (
            <Reveal
              as="a"
              className="studio__card"
              dir="up"
              /* Keyed by POSITION, not by catalogue id. These are three fixed
                 slots, and the key decides whether React updates the nodes or
                 replaces them. Keying by id replaces them on every brand
                 change — and a fresh node carries data-reveal (opacity 0) with
                 no data-inview, because the reveal engine only registered the
                 elements present at mount. The cards then never became
                 visible again after the first slide. */
              key={i}
              href={c.pdf ?? undefined}
              target="_blank"
              rel="noopener"
              data-cursor="View"
              aria-label={`${c.title} — ${c.type} catalogue (PDF)`}
            >
              <Image
                src={c.cover ?? ""}
                alt={`${c.title}, ${c.type.toLowerCase()} by ${slide.brand}`}
                width={760}
                height={600}
                sizes="(max-width: 680px) 50vw, 30vw"
                unoptimized
              />
              <span className="studio__notch">
                <span className="studio__capsule">
                  <span className="studio__pill">{c.type}</span>
                  <span className="studio__pill">{c.title}</span>
                </span>
              </span>
            </Reveal>
          ))}
        </div>

        {/* feature image with two cuts — copy at bottom-left, vertical tag on
            the right edge — beside a dark secondary panel */}
        <div className="studio__lower" ref={lowerRef}>
          <ImageReveal className="studio__feature" delay={0.08}>
            <Image
              src={feature.cover ?? ""}
              alt={`${feature.title}, ${feature.type.toLowerCase()} by ${slide.brand}`}
              width={1240}
              height={776}
              sizes="(max-width: 1024px) 100vw, 58vw"
              data-cursor="Explore"
              unoptimized
            />
            {/* Name and classification straight off the catalogue record — no
                invented marketing copy standing in for real product data. */}
            <span className="studio__featurecopy">
              <h3>{feature.title}</h3>
              <p>
                {feature.type} · {feature.collection}
              </p>
            </span>
            <span className="studio__vtag">
              <b>{slide.brand}</b>
              {feature.collection}
            </span>
            {/* Stretched hit area: the whole feature tile opens its catalogue.
                Sits above the image but below the copy plate and vertical tag,
                which are decorative text and need no separate target. */}
            <a
              className="studio__hit"
              href={feature.pdf ?? undefined}
              target="_blank"
              rel="noopener"
              data-cursor="Explore"
              aria-label={`${feature.title} — ${feature.type} catalogue (PDF)`}
            />
          </ImageReveal>

          <Reveal className="studio__panel" dir="right" delay={0.14}>
            <span className="studio__panelhead">
              <h3>
                <span>{panel.title}</span>
                <span>{panel.type}</span>
              </h3>
              <a
                className="studio__round"
                href={panel.pdf ?? undefined}
                target="_blank"
                rel="noopener"
                data-cursor="Open"
                aria-label={`${panel.title} catalogue (PDF)`}
              >
                <Diag />
              </a>
            </span>
            <a
              className="studio__panelimg"
              href={panel.pdf ?? undefined}
              target="_blank"
              rel="noopener"
              data-cursor="Open"
              aria-label={`${panel.title} catalogue (PDF)`}
            >
              <Image
                src={panel.cover ?? ""}
                alt={`${panel.title}, ${panel.type.toLowerCase()} by ${slide.brand}`}
                width={1000}
                height={1250}
                sizes="(max-width: 1024px) 100vw, 30vw"
                unoptimized
              />
            </a>
          </Reveal>
        </div>
        </Reveal>

        <button
          className="studio__arrow studio__arrow--next"
          type="button"
          onClick={() => go(1)}
          aria-label="Next brand"
        >
          →
        </button>
      </div>
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
