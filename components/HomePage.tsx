import { MotionProvider, Marquee } from "@/components/Motion";
import { Preloader, Nav, Cursor } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Statement } from "@/components/Sections";
import { Films, Story, Brands, ClosingCta } from "@/components/Editorial";
import { Showroom, EditorialShowcase } from "@/components/Compositions";
import { MARQUEE_WORDS, PROPERTIES, SITE, sectionLabel } from "@/lib/content";

/**
 * Which of the two category-tabbed compositions the page shows.
 *
 * The Collections composition (01) and The Edit composition now do the same
 * job — both are a pill nav over a thumbnail row and one dominant image, both
 * driven by the same catalogue data — so running both is a duplication. The
 * preview routes render one each so the two can be compared before one is
 * dropped; "both" is the current homepage, unchanged until that call is made.
 */
export type HomeVariant = "both" | "collections" | "edit";

export function HomePage({ variant = "both" }: { variant?: HomeVariant }) {
  const showCollections = variant === "both" || variant === "collections";
  const showEdit = variant === "both" || variant === "edit";

  /* Section eyebrows are NUMBERED BY POSITION, not by a fixed map. The brands
     lead the page now, and each preview drops one of the two compositions —
     between them, any hard-coded numbering drifts out of order immediately. */
  const order: string[] = ["House Brands"];
  if (showCollections) order.push("Collections");
  order.push("Showroom");
  if (showEdit && variant !== "edit") order.push("The Edit");
  order.push("Our Story");

  const label = (name: string) => {
    const i = order.indexOf(name);
    return i === -1 ? undefined : sectionLabel(i + 1, name);
  };

  /* In the `edit` variant The Edit composition stands in for Collections
     outright, so it takes that name rather than its own. */
  const editLabel = variant === "edit" ? label("Collections") : label("The Edit");

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

        {variant === "edit" ? <EditorialShowcase index={editLabel} /> : null}
        {showCollections ? <Statement index={label("Collections")} /> : null}
        <Showroom index={label("Showroom")} />
        {showEdit && variant !== "edit" ? <EditorialShowcase index={editLabel} /> : null}
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
