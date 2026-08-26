import type { Metadata } from "next";
import { CatalogueWall } from "@/components/CatalogueWall";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `e-Catalogue | ${SITE.name}`,
  description:
    "Every Sarom catalogue in one place — curtains, upholstery and bedsheets across all five houses. Open any cover to read the full catalogue.",
  robots: { index: true, follow: true },
};

/**
 * `?category=upholstery&brand=SJ` preselects the filters. Category tiles and
 * CTAs elsewhere on the site link here with intent already in mind — landing
 * on an unfiltered wall would lose that.
 */
export default async function EcataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  const params = await searchParams;
  return (
    <CatalogueWall
      initialCategory={params.category}
      initialBrand={params.brand}
    />
  );
}
