import Image from "next/image";
import { SITE, FOOTER_NAV, FOOTER_IMAGE, SOCIAL, FOOTER_LINKS } from "@/lib/content";
import { Reveal, ImageReveal } from "./Motion";

/**
 * Poster footer — one screen, no second scroll.
 *
 * LOMORA-style: black ground, a real CSS wordmark (not baked into a photo),
 * and the furniture — background-removed into a transparent PNG — floating
 * in front of the letters as a "sticker." The wordmark stays real text
 * (accessible, no font-size-from-container measurement needed since it no
 * longer has to fill a photo's exact crop).
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
          <Reveal as="p" dir="up" className="foot__wordmark" aria-hidden="true">
            sarom<i>.</i>
          </Reveal>
          <span className="sr-only">{SITE.legalName}</span>

          {/* the sticker: floats in front of the wordmark, not inside a box */}
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
