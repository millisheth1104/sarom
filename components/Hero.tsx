"use client";

import { useEffect, useRef, useState } from "react";
import { HERO, SITE } from "@/lib/content";
import { Arrow } from "./Motion";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/motion";

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
  const [muted, setMuted] = useState(true);

  // Reveal the video only once it actually has a frame to show.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => setReady(true);
    if (v.readyState >= 2) onReady();
    v.addEventListener("loadeddata", onReady, { once: true });

    // Some browsers refuse the initial autoplay promise; retry once muted.
    const tryPlay = () => {
      v.play().catch(() => {
        v.muted = true;
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

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <section className="hero" ref={rootRef} data-nav-tone="dark" aria-label="Introduction">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          data-ready={ready}
          src="/media/sarom-interiors.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <svg className="hero__grain" aria-hidden="true">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <button className="hero__vidctl" onClick={toggleSound} aria-pressed={!muted}>
        {muted ? "Sound Off" : "Sound On"}
      </button>

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
