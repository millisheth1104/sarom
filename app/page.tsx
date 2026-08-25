import { HomePage } from "@/components/HomePage";

/**
 * Sarom homepage.
 *
 * Visual rhythm — deliberately alternating so the page breathes:
 *   HERO (dark, film) → collections (ivory) → showroom (ivory)
 *   → editorial (linen) → the edit films (dark)
 *   → story (dark) → brands (linen) → CTA (peach) → footer (dark)
 *
 * The body lives in components/HomePage.tsx so the two preview routes can
 * render the same page with only the contested section swapped.
 */
export default function Home() {
  return <HomePage variant="both" />;
}
