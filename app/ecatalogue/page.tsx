import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CatalogueWall } from "@/components/CatalogueWall";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `e-Catalogue | ${SITE.name}`,
  description:
    "Every Sarom catalogue in one place — curtains, upholstery and bedsheets across all five houses. Open any cover to read the full catalogue.",
  robots: { index: true, follow: true },
};

const CATEGORIES = ["curtains", "upholstery", "bedsheets"];

/**
 * The full wall ("All"). Each category has its own address —
 * /ecatalogue/curtains etc., see ./[category]. `?brand=SJ` preselects a brand.
 *
 * The old `?category=x` form still works: it redirects to /ecatalogue/x, so
 * links shared before the change keep landing on the right tab.
 */
export default async function EcataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  const params = await searchParams;
  const cat = params.category?.toLowerCase();
  if (cat && CATEGORIES.includes(cat)) {
    redirect(`/ecatalogue/${cat}${params.brand ? `?brand=${encodeURIComponent(params.brand)}` : ""}`);
  }
  return <CatalogueWall initialCategory="all" initialBrand={params.brand} />;
}
