import Image from "next/image";
import { SITE, FOOTER_NAV, FOOTER_IMAGE, SOCIAL, FOOTER_LINKS } from "@/lib/content";
import { Reveal, ImageReveal } from "./Motion";

/**
 * Poster footer.
 *
 * Read as one composition: a quiet nav row, the wordmark at full width, and a
 * cinematic still pulled up under the type so the two overlap rather than
 * stacking as separate blocks. Deliberately not a conventional link footer —
 * the detailed navigation lives in the header and the drawer.
 */
export default function Footer() {
  const year = 2026;

  return (
    <footer className="foot" data-nav-tone="dark">
      <div className="shell">
        {/* small, understated — the wordmark is the loud element */}
        <nav className="foot__nav" aria-label="Footer">
          {FOOTER_NAV.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Three columns of real information, which the poster-only version
            had dropped, above the wordmark. */}
        <div className="foot__cols">
          <Reveal className="foot__col" dir="up">
            <h4>Explore</h4>
            {FOOTER_LINKS.explore.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </Reveal>
          <Reveal className="foot__col" dir="up" delay={0.06}>
            <h4>Brands</h4>
            {FOOTER_LINKS.brands.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </Reveal>
          <Reveal className="foot__col foot__col--wide" dir="up" delay={0.12}>
            <h4>Contact</h4>
            <p>{SITE.legalName}</p>
            <p>{SITE.address}</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
          </Reveal>
        </div>

        {/* two-tone wordmark: the trailing mark takes the accent ink */}
        <Reveal as="p" dir="up" className="foot__wordmark" aria-hidden="true">
          sarom<i>.</i>
        </Reveal>
        {/* The wordmark above is decorative type; this carries the name. */}
        <span className="sr-only">{SITE.legalName}</span>

        <ImageReveal className="foot__poster" delay={0.12}>
          <Image
            src={FOOTER_IMAGE.src}
            alt={FOOTER_IMAGE.alt}
            width={FOOTER_IMAGE.width}
            height={FOOTER_IMAGE.height}
            sizes="100vw"
          />
        </ImageReveal>

        <div className="foot__meta">
          <span>
            © {year} {SITE.legalName}
          </span>
          <div className="foot__metagroup">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
          </div>
          <div className="foot__metagroup">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div className="foot__metagroup">
            {FOOTER_LINKS.legal.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
