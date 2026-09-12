"use client";

import { useEffect, useRef, useState } from "react";
import { HERO, SITE } from "@/lib/content";
import { Arrow } from "./Motion";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * The two cuts of the hero film. Phones get the 1080x1920 portrait one, which
 * fills a tall screen without `object-fit: cover` throwing away most of the
 * frame; everything else gets the 1920x1080 landscape one.
 */
const PORTRAIT = "/media/sarom-interiors-portrait.mp4";
const LANDSCAPE = "/media/sarom-interiors.mp4";

/** The site's existing phone breakpoint — see responsive.css. */
const PHONE = "(max-width: 680px)";

/**
 * Cinematic opening.
 *
 * The video is treated as moving photography: it enters from 1.06 and settles
 * toward 1.00 across the hero's scroll range, with a slow vertical drift. The
 * movement is deliberately below the threshold of notice.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Reveal the video only once it actually has a frame to show.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => setReady(true);
    if (v.readyState >= 2) onReady();
    v.addEventListener("loadeddata", onReady, { once: true });

    /* Some browsers refuse the initial autoplay promise (data saver, a
       background tab at load); retry once. The video is permanently muted
       and the file carries no audio track at all, so there is nothing to
       re-mute on the retry the way there was when this was unmutable. */
    const tryPlay = () => {
      v.play().catch(() => {
        v.play().catch(() => {});
      });
    };
    tryPlay();
    window.addEventListener("sarom:ready", tryPlay, { once: true });

    return () => {
      v.removeEventListener("loadeddata", onReady);
      window.removeEventListener("sarom:ready", tryPlay);
    };
  }, []);

  /**
   * Re-pick the cut when the viewport crosses the phone breakpoint.
   *
   * `<source media>` is resolved ONCE, while the markup is parsed — it is not
   * a live query. So a phone rotated to landscape, or a desktop window dragged
   * narrow, would keep playing whichever file was chosen at load. `load()` is
   * what makes the browser walk the <source> list again.
   *
   * Guarded on the match actually changing, because `load()` restarts playback
   * from zero: firing it on every resize tick would make the hero stutter for
   * anyone dragging a window edge.
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || typeof window.matchMedia !== "function") return;

    const mq = window.matchMedia(PHONE);
    const onChange = () => {
      const want = mq.matches ? PORTRAIT : LANDSCAPE;
      /* currentSrc is the absolute URL the browser actually settled on. */
      if (v.currentSrc.endsWith(want)) return;
      v.load();
      v.play().catch(() => {});
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Scroll-linked scale + drift on the video, and a gentle lift on the copy.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();

    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        video,
        { "--hero-scale": 1.07, "--py": "0px" },
        {
          "--hero-scale": 1.0,
          "--py": "9vh",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      gsap.to(root.querySelector(".hero__inner"), {
        y: -60,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={rootRef} data-nav-tone="dark" aria-label="Introduction">
      <div className="hero__media">
        {/* Two cuts of the same film: a 1080x1920 portrait one for phones and
            the 1920x1080 landscape one everywhere else. As <source media>
            rather than a JS swap so the browser picks DURING HTML PARSE and
            only ever fetches the one it needs — an 11MB hero is not something
            to start downloading twice, or to start late. 680px is the site's
            own phone breakpoint (responsive.css), not a new number.

            The order matters: a <source> list is evaluated top-down and the
            FIRST match wins, so the media-qualified one has to precede the
            unqualified fallback. */}
        <video
          ref={videoRef}
          className="hero__video"
          data-ready={ready}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source media="(max-width: 680px)" src={PORTRAIT} type="video/mp4" />
          <source src={LANDSCAPE} type="video/mp4" />
        </video>
        <svg className="hero__grain" aria-hidden="true">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <div className="hero__inner">
        <p className="hero__eyebrow" data-reveal="fade" data-reveal-start="top 100%">
          {HERO.eyebrow}
        </p>

        <h1 className="hero__title" data-lines data-reveal-start="top 100%">
          <span className="lines">
            {HERO.titleLines.map((line, i) => (
              <span className="lines__line" key={i}>
                <span
                  className="lines__inner"
                  style={{ "--line-delay": `${0.1 + i * 0.11}s` } as React.CSSProperties}
                >
                  {line}{" "}
                </span>
              </span>
            ))}
            <span className="lines__line">
              <span
                className="lines__inner"
                style={
                  { "--line-delay": `${0.1 + HERO.titleLines.length * 0.11}s` } as React.CSSProperties
                }
              >
                <em>{HERO.titleEm}</em>
              </span>
            </span>
          </span>
        </h1>

        <div className="hero__aside" data-reveal="up" data-reveal-start="top 100%" style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}>
          <p>{HERO.body}</p>
        </div>

        <div className="hero__cta" data-reveal="up" data-reveal-start="top 100%" style={{ "--reveal-delay": "0.66s" } as React.CSSProperties}>
          <a className="btn" href="/ecatalogue" data-cursor="Explore">
            Explore Collections
            <Arrow />
          </a>
        </div>

        <div className="hero__foot" data-reveal="fade" data-reveal-start="top 100%" style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}>
          <div className="hero__tags">
            {HERO.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <span className="hero__scroll">
            Scroll
            <span />
          </span>
        </div>
      </div>

      <span className="sr-only">
        {SITE.name} — {SITE.tagline}
      </span>
    </section>
  );
}
