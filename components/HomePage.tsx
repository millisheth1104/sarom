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
 * The Collections composition (01) and The Edit composition (03) now do the
 * same job — both are a pill nav over a thumbnail row and one dominant image,
 * both driven by the same catalogue data — so running both is a duplication.
 * The preview routes render one each so the two can be compared before one is
 * dropped; "both" is the current homepage, unchanged until that call is made.
 */
export type HomeVariant = "both" | "collections" | "edit";

export function HomePage({ variant = "both" }: { variant?: HomeVariant }) {
  const showCollections = variant === "both" || variant === "collections";
  const showEdit = variant === "both" || variant === "edit";

  /* Numbering is computed, not looked up. Each preview drops one of the two
     compositions, which shifts every eyebrow after it — and in the `edit`
     variant The Edit composition takes the Collections slot outright: first
     on the page and labelled "01 — Collections", since it is standing in for
     that section rather than sitting alongside it.
     `both` keeps the original five-section numbering untouched. */
  const label =
    variant === "both"
      ? {
          collections: undefined, // falls back to the component's own default
          showroom: undefined,
          edit: undefined,
          story: undefined,
          brands: undefined,
        }
      : {
          collections: sectionLabel(1, "Collections"),
          showroom: sectionLabel(2, "Showroom"),
          edit: sectionLabel(1, "Collections"),
          story: sectionLabel(3, "Our Story"),
          brands: sectionLabel(4, "House Brands"),
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

        {/* In the `edit` variant The Edit composition IS the collections
            section, so it leads the page. Everywhere else it keeps its own
            slot after the showroom. */}
        {variant === "edit" ? <EditorialShowcase index={label.edit} /> : null}
        {showCollections ? <Statement index={label.collections} /> : null}
        <Showroom index={label.showroom} />
        {showEdit && variant !== "edit" ? <EditorialShowcase index={label.edit} /> : null}
        <Films />

        <div data-nav-tone="light">
          <Marquee
            items={PROPERTIES.map((p) => p.label)}
            duration={38}
            variant="meta"
            reverse
          />
        </div>

        <Story index={label.story} />
        <Brands index={label.brands} />
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
