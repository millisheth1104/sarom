import { MotionProvider, Marquee } from "@/components/Motion";
import { Preloader, Nav, Cursor } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Statement } from "@/components/Sections";
import {
  InTheRoom,
  Story,
  Brands,
  ClosingCta,
} from "@/components/Editorial";
import { Showroom, EditorialShowcase } from "@/components/Compositions";
import { MARQUEE_WORDS, PROPERTIES, SITE } from "@/lib/content";

/**
 * Sarom homepage.
 *
 * Visual rhythm — deliberately alternating so the page breathes:
 *   HERO (dark, film) → collections (ivory) → showroom (ivory)
 *   → editorial (linen) → in-the-room (ivory)
 *   → story (dark) → brands (linen) → CTA (peach) → footer (dark)
 *
 * The three art-directed compositions are warm-palette only; the dark
 * chapters (hero, story, footer) are what keep the page from flattening.
 */
export default function Home() {
  return (
    <MotionProvider>
      <Preloader />
      <Cursor />
      <Nav />

      <main id="main">
        <Hero />

        <div data-nav-tone="light">
          <Marquee items={MARQUEE_WORDS} duration={52} />
        </div>

        <Statement />
        <Showroom />
        <EditorialShowcase />
        <InTheRoom />

        <div data-nav-tone="light">
          <Marquee
            items={PROPERTIES.map((p) => p.label)}
            duration={38}
            variant="meta"
            reverse
          />
        </div>

        <Story />
        <Brands />
        <ClosingCta />
      </main>

      <Footer />

      {/* Organisation schema — helps the brand surface correctly in search. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.legalName,
            alternateName: SITE.name,
            slogan: SITE.tagline,
            email: SITE.email,
            telephone: SITE.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "2nd Floor, Kerom, Plot No A/112, Wagle Industrial Estate",
              addressLocality: "Thane West",
              postalCode: "400604",
              addressRegion: "Maharashtra",
              addressCountry: "IN",
            },
          }),
        }}
      />
    </MotionProvider>
  );
}
