import Image from "next/image";
import { SITE, FOOTER_NAV, FOOTER_IMAGE, SOCIAL, FOOTER_LINKS } from "@/lib/content";
import { Reveal, ImageReveal } from "./Motion";

/**
 * Poster footer — one screen, no second scroll.
 *
 * LOMORA-style: black ground, one composite image (furniture overlapping in
 * front of the SAROM wordmark, background already removed) floated as a
 * sticker rather than type + cutout layered separately.
 */
export default function Footer() {
  const year = 2026;

  return (
    <footer className="foot" data-nav-tone="dark">
      <div className="shell foot__stage">
        {/* hairline nav, spread the full width */}
        <nav className="foot__nav" aria-label="Footer">
          {FOOTER_NAV.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="foot__poster">
          <span className="sr-only">{SITE.legalName}</span>

          <ImageReveal className="foot__sticker" delay={0.1}>
            <Image
              src={FOOTER_IMAGE.src}
              alt={FOOTER_IMAGE.alt}
              width={FOOTER_IMAGE.width}
              height={FOOTER_IMAGE.height}
              sizes="100vw"
              unoptimized
            />
          </ImageReveal>
        </div>

        {/* everything that used to need its own columns, on one line */}
        <Reveal className="foot__meta" dir="up">
          <span>
            © {year} {SITE.legalName}
          </span>
          <span className="foot__metagroup">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
          </span>
          <span className="foot__metagroup">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </span>
          <span className="foot__metagroup">
            {FOOTER_LINKS.legal.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </span>
        </Reveal>
      </div>
    </footer>
  );
}
