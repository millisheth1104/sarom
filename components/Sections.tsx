"use client";

import Image from "next/image";

import {
  STATEMENT,
  SECTION_INDEX,
} from "@/lib/content";
import { Reveal, LineReveal, ImageReveal, Arrow } from "./Motion";
import { useCatalogueTabs } from "./useCatalogueTabs";

/* ============================================================
   01 — THE COLLECTIONS EDITORIAL

   One connected composition. Previews and the 01/02/03 rail both
   drive a single `slide` index, so the hero always agrees with
   whichever control was used. Hovering the catalogue drives the
   secondary image independently.
   ============================================================ */
export function Statement({ index }: { index?: string } = {}) {
  const cat = useCatalogueTabs(3);

  return (
    <section className="sect sect--comp sect--ivory statement" data-nav-tone="light">
      <div className="shell">
        <Reveal as="p" dir="fade" className="shead__index" style={{ marginBottom: "clamp(0.9rem,1.6vw,1.6rem)" }}>
          {index ?? STATEMENT.index}
        </Reveal>
      </div>

      <Reveal className="comp comp--wide belong" dir="scale" start="top 90%">
        <div className="belong__grid">
          {/* ---- light left column ---- */}
          <div className="belong__left">
            {/* Category tabs, backed by real catalogue data. */}
            <nav className="belong__nav" aria-label="Categories">
              {cat.tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => cat.setTab(t.id)}
                  data-active={cat.tab === t.id ? "true" : undefined}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* thumbnails: labels sit ON the image, arrows page the category */}
            <div className="belong__previews">
              <button
                className="belong__arrow belong__arrow--prev"
                type="button"
                onClick={() => cat.step(-1)}
                aria-label="Previous collections"
              >
                ‹
              </button>
              {cat.pageItems.map((c, i) => (
                /* A link, not a button. These read as catalogues, so clicking
                   one has to OPEN it — previously they only changed which
                   image was showing and nothing opened, which looked broken.
                   Selection moves to hover/focus so the dominant image still
                   follows the pointer. */
                <a
                  className="belong__thumb"
                  key={c.id}
                  href={c.pdf ?? undefined}
                  target="_blank"
                  rel="noopener"
                  data-cursor="Open"
                  aria-current={i === cat.sel}
                  aria-label={`Open the ${c.title} catalogue (PDF)`}
                  onMouseEnter={() => cat.setSel(i)}
                  onFocus={() => cat.setSel(i)}
                >
                  <Image
                    src={c.cover ?? ""}
                    alt={`${c.title}, ${c.type.toLowerCase()} by ${c.brand}`}
                    width={620}
                    height={527}
                    sizes="14vw"
                    unoptimized
                  />
                  <span>{c.title}</span>
                </a>
              ))}
              <button
                className="belong__arrow belong__arrow--next"
                type="button"
                onClick={() => cat.step(1)}
                aria-label="More collections"
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
            {/* Every catalogue on the page is stacked so the swap cross-fades
                via the existing [data-active] rule rather than remounting. */}
            {cat.pageItems.map((c, i) => (
              <Image
                key={c.id}
                src={c.cover ?? ""}
                alt={`${c.title}, ${c.type.toLowerCase()} by ${c.brand}`}
                width={1030}
                height={1081}
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-active={i === cat.sel}
                data-cursor="View"
                unoptimized
              />
            ))}

            {/* the wrapper IS the ivory channel carved around the pill — see
                .belong__shopwrap. A ring on the pill itself can't work: it
                would follow the pill's own radius and curve away from the
                panel edges. */}
            <span className="belong__shopwrap">
              <a
                className="belong__shop"
                href={cat.active?.pdf ?? undefined}
                target="_blank"
                rel="noopener"
                data-cursor="Open"
              >
                {STATEMENT.action.label}
                <Arrow className="" />
              </a>
            </span>

            <span className="belong__rail">
              {cat.pageItems.map((c, i) => (
                <button
                  className="belong__railbtn"
                  key={c.id}
                  type="button"
                  aria-pressed={i === cat.sel}
                  aria-label={`Show ${c.title}`}
                  onClick={() => cat.setSel(i)}
                >
                  {String(cat.page * 3 + i + 1).padStart(2, "0")}
                </button>
              ))}
            </span>

            {cat.active ? (
              <>
                <span className="belong__float belong__float--a">{cat.active.type}</span>
                <span className="belong__float belong__float--b">{cat.active.brand}</span>
              </>
            ) : null}
          </ImageReveal>
        </div>
      </Reveal>
    </section>
  );
}
