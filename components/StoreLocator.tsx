"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MotionProvider, Marquee, Reveal, LineReveal } from "@/components/Motion";
import { Preloader, Nav, Cursor, WhatsAppFab } from "@/components/Chrome";
import Footer from "@/components/Footer";
import { INDIA_STATES, INDIA_VIEWBOX } from "@/lib/india-map";
import { STORES, STORE_COUNTS, STORE_STATES } from "@/lib/stores";
import { MARQUEE_WORDS } from "@/lib/content";

/** Title case for display; the data is stored SHOUTING, as the source has it. */
const title = (s: string) =>
  s
    .toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .replace(/\bAnd\b/g, "and");

export default function StoreLocator() {
  const [active, setActive] = useState<string>(STORE_STATES[0]);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = useMemo(
    () =>
      q
        ? STORES.filter((s) =>
            (s.name + " " + s.address + " " + s.city + " " + s.state + " " + s.pincode)
              .toLowerCase()
              .includes(q)
          )
        : STORES.filter((s) => s.state === active),
    [q, active]
  );

  /* Which states the map lights up: everything a search matches, or just the
     selected one when there is no search. */
  const lit = useMemo(() => new Set(list.map((s) => s.state)), [list]);

  /* Match the panel's height to the map's, above the 1000px breakpoint where
     they sit side by side.
   *
   * The map is a portrait-aspect country, so it is naturally TALLER than a
   * few lines of search bar, chips and a count — left alone, that leaves a
   * band of empty section background below the store list on anything wider
   * than ~1440px (measured up to 124px at 1920px). A CSS-only stretch was
   * tried first and rejected: it creates a circular sizing dependency (the
   * unclamped list reports its full ~4600px content height as its
   * contribution to the grid row's own auto-height, inflating the map to
   * match). Measuring in JS and writing a plain pixel value has no such
   * loop — same one-value-per-frame pattern the rest of this site uses for
   * scroll-driven CSS, just triggered by size instead of scroll position.
   */
  const gridRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const stage = stageRef.current;
    if (!grid || !stage) return;

    const sync = () => {
      /* Only meaningful at/above 1000px, where the two-column layout — and
         the CSS that reads this variable — actually applies; the var goes
         unused by the single-column stack below that, so no guard is needed
         beyond the CSS media query itself. */
      grid.style.setProperty("--loc-map-h", `${stage.offsetHeight}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  return (
    <MotionProvider>
      <Preloader />
      <Cursor />
      <WhatsAppFab />
      <Nav />

      <main id="main">
        <section className="sect sect--dark loc" data-nav-tone="dark">
          <div className="shell loc__head">
            <Reveal as="p" dir="fade" className="shead__index">
              Store Locator
            </Reveal>
            <LineReveal
              as="h1"
              className="loc__title tt"
              step={0.1}
              lines={[
                <>
                  Find Sarom <em key="em">near you.</em>
                </>,
              ]}
            />
            <Reveal as="p" dir="up" className="loc__lead" delay={0.1}>
              {STORES.length} stockists across {STORE_STATES.length} states.
            </Reveal>
          </div>

          <div className="shell loc__grid" ref={gridRef}>
            <Reveal className="loc__mapWrap" dir="fade" start="top 82%">
              <div className="loc__stage" ref={stageRef}>
                <svg
                  className="loc__map"
                  viewBox={"0 0 " + INDIA_VIEWBOX.w + " " + INDIA_VIEWBOX.h}
                  role="img"
                  aria-label="Map of India showing the states with Sarom stockists"
                >
                  {INDIA_STATES.map((s) => {
                    const key = s.name.toUpperCase();
                    const has = (STORE_COUNTS[key] ?? 0) > 0;
                    return (
                      <path
                        key={s.name}
                        d={s.d}
                        className="loc__state"
                        data-has={has || undefined}
                        data-lit={(has && lit.has(key)) || undefined}
                      />
                    );
                  })}
                </svg>

                {/* Pins sit OUTSIDE the svg: each has to stand upright against
                    the tilted plane, and each is a real button so the map can
                    be used from the keyboard. */}
                <div className="loc__pins">
                  {INDIA_STATES.filter((s) => STORE_COUNTS[s.name.toUpperCase()]).map((s, i) => {
                    const key = s.name.toUpperCase();
                    const n = STORE_COUNTS[key];
                    const on = q ? lit.has(key) : active === key;
                    return (
                      <button
                        key={s.name}
                        type="button"
                        className="loc__pin"
                        data-on={on || undefined}
                        style={
                          {
                            "--x": (s.cx / INDIA_VIEWBOX.w) * 100 + "%",
                            "--y": (s.cy / INDIA_VIEWBOX.h) * 100 + "%",
                            "--i": i,
                          } as React.CSSProperties
                        }
                        onClick={() => {
                          setQuery("");
                          setActive(key);
                        }}
                        aria-label={
                          title(s.name) + ", " + n + (n === 1 ? " stockist" : " stockists")
                        }
                      >
                        <span className="loc__pinHead">{n}</span>
                        <span className="loc__pinName">{title(s.name)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="loc__panel">
              <label className="loc__search">
                <span className="sr-only">Search stores by city, address or state</span>
                <input
                  type="search"
                  value={query}
                  placeholder="Search a city, area or state"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>

              <div className="loc__states">
                {STORE_STATES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="loc__chip"
                    aria-pressed={!q && active === s}
                    data-on={(!q && active === s) || undefined}
                    onClick={() => {
                      setQuery("");
                      setActive(s);
                    }}
                  >
                    {title(s)}
                    <b>{STORE_COUNTS[s]}</b>
                  </button>
                ))}
              </div>

              <p className="loc__count" aria-live="polite">
                {q
                  ? list.length + (list.length === 1 ? " result" : " results")
                  : title(active) +
                    " · " +
                    list.length +
                    (list.length === 1 ? " stockist" : " stockists")}
              </p>

              <ul className="loc__list">
                {list.map((s, i) => (
                  <li className="loc__store" key={s.state + "-" + i}>
                    <span className="loc__storeState">{title(s.state)}</span>
                    <b className="loc__storeName">{s.name}</b>
                    <address>
                      {s.address}, {s.city} {s.pincode}
                    </address>
                  </li>
                ))}
                {!list.length && (
                  <li className="loc__empty">
                    Nothing matches that. Try a city, an area or a state.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>

        <div data-nav-tone="light">
          <Marquee items={MARQUEE_WORDS} duration={52} />
        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
