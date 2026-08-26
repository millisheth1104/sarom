"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MotionProvider } from "@/components/Motion";
import { Preloader, Nav, Cursor } from "@/components/Chrome";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Motion";
import {
  CATALOGUES,
  BRAND_ORDER,
  CATEGORY_TABS,
  type CategoryId,
  type Catalogue,
} from "@/lib/catalogues";

const MATCH: Record<Exclude<CategoryId, "all">, (c: Catalogue) => boolean> = {
  curtains: (c) => c.collection === "Curtains" || c.collection === "Upholstery/Curtain",
  upholstery: (c) => c.collection === "Upholstery" || c.collection === "Upholstery/Curtain",
  bedsheets: (c) => c.brand === "Beds & More",
};

const BRAND_FILTERS = ["All", ...BRAND_ORDER] as const;
type BrandFilter = (typeof BRAND_FILTERS)[number];

/**
 * Every catalogue that can actually be opened and pictured. Filters below
 * work off this fixed list rather than re-deriving it, so the count in the
 * "All" pill matches what a visitor can actually click through to.
 */
const USABLE = CATALOGUES.filter((c) => c.pdf && c.cover);

/**
 * `category`/`brand` from the URL preselect the filters — the category tiles
 * on the homepage and elsewhere link here with a category already in mind,
 * and landing on an unfiltered wall would lose that intent.
 */
function initial<T extends string>(
  param: string | undefined,
  valid: readonly T[],
  fallback: T
): T {
  const found = valid.find((v) => v.toLowerCase() === param?.toLowerCase());
  return found ?? fallback;
}

export function CatalogueWall({
  initialCategory,
  initialBrand,
}: {
  initialCategory?: string;
  initialBrand?: string;
}) {
  const [category, setCategory] = useState<CategoryId>(() =>
    initial(initialCategory, CATEGORY_TABS.map((t) => t.id), "all")
  );
  const [brand, setBrand] = useState<BrandFilter>(() =>
    initial(initialBrand, BRAND_FILTERS, "All")
  );

  const items = useMemo(() => {
    const byCategory =
      category === "all" ? USABLE : USABLE.filter(MATCH[category]);
    return brand === "All" ? byCategory : byCategory.filter((c) => c.brand === brand);
  }, [category, brand]);

  const countFor = (id: CategoryId) =>
    (id === "all" ? USABLE : USABLE.filter(MATCH[id])).filter(
      (c) => brand === "All" || c.brand === brand
    ).length;

  return (
    <MotionProvider>
      <Preloader />
      <Cursor />
      <Nav />

      <main id="main">
        <header className="wall__head sect sect--ivory" data-nav-tone="light">
          <div className="shell">
            <Reveal as="p" dir="fade" className="shead__index">
              e-Catalogue
            </Reveal>
            <Reveal as="h1" dir="up" className="t-h2 tt wall__title">
              Every fabric, <em>in one wall.</em>
            </Reveal>
            <Reveal as="p" dir="up" delay={0.08} className="t-body wall__lede">
              {USABLE.length} catalogues across five houses — curtains,
              upholstery and bedsheets. Open any cover to read the catalogue in
              full.
            </Reveal>

            <Reveal dir="up" delay={0.14} className="wall__filters">
              <div className="wall__filtergroup" role="group" aria-label="Category">
                {CATEGORY_TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="wall__pill"
                    data-active={category === t.id || undefined}
                    onClick={() => setCategory(t.id)}
                  >
                    {t.label}
                    <span>{countFor(t.id)}</span>
                  </button>
                ))}
              </div>

              <div className="wall__filtergroup" role="group" aria-label="Brand">
                {BRAND_FILTERS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className="wall__pill wall__pill--brand"
                    data-active={brand === b || undefined}
                    onClick={() => setBrand(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </header>

        <section className="sect sect--ivory wall__body" data-nav-tone="light">
          <div className="shell">
            {items.length ? (
              <div className="wall__masonry" key={`${category}-${brand}`}>
                {items.map((c) => (
                  <a
                    className="wall__tile"
                    key={c.id}
                    href={c.pdf ?? undefined}
                    target="_blank"
                    rel="noopener"
                    data-cursor="Open"
                    aria-label={`Open the ${c.title} catalogue (PDF)`}
                  >
                    <Image
                      src={c.cover ?? ""}
                      alt={`${c.title}, ${c.type.toLowerCase()} by ${c.brand}`}
                      width={620}
                      height={527}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      unoptimized
                    />
                    <span className="wall__tileinfo">
                      <b>{c.title}</b>
                      <em>
                        {c.brand} · {c.type}
                      </em>
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="wall__empty">
                No catalogues match that combination yet.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </MotionProvider>
  );
}
