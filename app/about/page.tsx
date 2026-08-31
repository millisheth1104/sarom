import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `About | ${SITE.name}`,
  description:
    "Five house brands, one standard of make, finish and hand — in-house design, made for Indian homes, distributed pan-India.",
  robots: { index: true, follow: true },
};

export default function About() {
  return <AboutPage />;
}
