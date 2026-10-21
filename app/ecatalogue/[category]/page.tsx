import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueWall } from "@/components/CatalogueWall";
import { SITE } from "@/lib/content";

/** /ecatalogue/curtains, /ecatalogue/upholstery, /ecatalogue/bedsheets. */
const CATEGORIES: Record<string, string> = {
  curtains: "Curtains",
  upholstery: "Upholstery",
  bedsheets: "Bedsheets",
};

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(CATEGORIES).map((category) => ({ category }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORIES[category];
  return {
    title: `${label} e-Catalogue | ${SITE.name}`,
    description: `Every Sarom ${label.toLowerCase()} catalogue in one place. Open any cover to read the full catalogue.`,
    robots: { index: true, follow: true },
  };
}

export default async function EcatalogueCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ brand?: string }>;
}) {
  const { category } = await params;
  if (!CATEGORIES[category]) notFound();
  const { brand } = await searchParams;
  return <CatalogueWall initialCategory={category} initialBrand={brand} />;
}
