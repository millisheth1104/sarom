import { SITE, SOCIAL, FOOTER_NAV } from "@/lib/content";
import { Reveal } from "./Motion";

/**
 * Footer — Gander-style (client reference, 2026-10-14): a row of small-type
 * columns over a full-bleed wordmark.
 *
 * The wordmark is the Sarom logo traced to vector (reference/trace-wordmark.py),
 * not set in a font: no font we ship matches the logo's letterforms, and the
 * largest raster logo (1444px) goes soft at full footer width on a 2x screen.
 *
 * Gander's middle column is a newsletter sign-up. Sarom has no mailing-list
 * service, so a sign-up form here would collect addresses into nothing. The
 * same underlined "field" shape is kept, but it is an honest mailto link.
 *
 * Careers and Privacy Policy are deliberately absent: both pointed at the old
 * site's .php pages, which do not exist on this site (403 on the live deploy).
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const tel = `tel:${SITE.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="foot" data-nav-tone="dark">
      <div className="shell foot__top">
        <Reveal className="foot__col foot__col--lead" dir="up">
          <p className="foot__label">
            © {year} {SITE.legalName}
          </p>
          <p className="foot__text">
            {SITE.tagline} — upholstery, curtains and bed sheets, {SITE.descriptor}.
          </p>
          <address className="foot__text foot__addr">{SITE.address}</address>
        </Reveal>

        <Reveal className="foot__col" dir="up" delay={0.06}>
          <p className="foot__label">Enquiries</p>
          <p className="foot__text">Trade, retail and catalogue requests — write to us.</p>
          <a className="foot__field" href={`mailto:${SITE.email}`}>
            <span>{SITE.email}</span>
            <span className="foot__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="foot__link foot__phone" href={tel}>
            {SITE.phone}
          </a>
        </Reveal>

        <Reveal as="nav" className="foot__col" dir="up" delay={0.12} aria-label="Footer">
          <p className="foot__label">Explore</p>
          <ul className="foot__list">
            {FOOTER_NAV.map((l) => (
              <li key={l.href}>
                <a className="foot__link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="foot__col" dir="up" delay={0.18}>
          <p className="foot__label">Say hello</p>
          <ul className="foot__list">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a className="foot__link" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* The wordmark rises out of the footer's bottom edge as it scrolls in.
          Decorative: the company name is already in the © line above.
          start="top bottom": it IS the end of the page, so on a phone or
          tablet its top can never climb to the default trigger line — it
          stayed half-risen at 820px and never appeared at all at 390px. */}
      <div className="foot__mark" aria-hidden="true">
        <Reveal dir="up" delay={0.1} start="top bottom">
          {/* eslint-disable-next-line @next/next/no-img-element -- an SVG needs no optimiser */}
          <img src="/media/sarom-wordmark.svg" alt="" width={1340} height={274} />
        </Reveal>
      </div>
    </footer>
  );
}
