import { MotionProvider, Marquee } from "@/components/Motion";
import { Preloader, Nav, Cursor } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Statement } from "@/components/Sections";
import { Films, Story, Brands, ClosingCta } from "@/components/Editorial";
import { Showroom } from "@/components/Compositions";
import { MARQUEE_WORDS, PROPERTIES, SITE, sectionLabel } from "@/lib/content";

/**
 * The Edit composition has been dropped from the page.
 *
 * It and Collections did the same job — a pill nav over a thumbnail row and
 * one dominant image, both driven by the same catalogue data — so the page
 * was making the same argument twice. Collections keeps the slot. The
 * `EditorialShowcase` component is left in `Compositions.tsx` rather than
 * deleted, so restoring it is a one-line change if the client wants it back.
 */
export function HomePage() {
  /* Section eyebrows are NUMBERED BY POSITION, not by a fixed map, so
     dropping a section renumbers the rest on its own. */
  const order = ["House Brands", "Collections", "Showroom", "Our Story"];

  const label = (name: string) => {
    const i = order.indexOf(name);
    return i === -1 ? undefined : sectionLabel(i + 1, name);
  };

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

        {/* The five house brands lead the page: they are the first thing the
            client wants a visitor to meet after the hero. */}
        <Brands index={label("House Brands")} />

        <Statement index={label("Collections")} />
        <Showroom index={label("Showroom")} />
        <Films />

        <div data-nav-tone="light">
          <Marquee
            items={PROPERTIES.map((p) => p.label)}
            duration={38}
            variant="meta"
            reverse
          />
        </div>

        <Story index={label("Our Story")} />
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
