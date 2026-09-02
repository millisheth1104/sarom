"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, SITE, FOOTER_LINKS, SHOP, WHATSAPP } from "@/lib/content";

/* ============================================================
   PRELOADER
   Holds the first paint just long enough for the hero video's
   first frame, so the opening never flashes black.
   ============================================================ */
export function Preloader() {
  const [progress, setProgress] = useState(0.08);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");

    let raf = 0;
    let value = 0.08;
    const creep = () => {
      value = Math.min(value + (0.86 - value) * 0.035, 0.86);
      setProgress(value);
      raf = requestAnimationFrame(creep);
    };
    raf = requestAnimationFrame(creep);

    const finish = () => {
      cancelAnimationFrame(raf);
      setProgress(1);
      window.setTimeout(() => {
        setDone(true);
        document.documentElement.classList.remove("is-loading");
        window.dispatchEvent(new Event("sarom:ready"));
      }, 420);
    };

    // Whichever comes first: window load, or a hard 2.6s ceiling.
    if (document.readyState === "complete") {
      window.setTimeout(finish, 520);
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const ceiling = window.setTimeout(finish, 2600);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(ceiling);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  return (
    <div className="preloader" data-done={done} aria-hidden="true">
      <div className="preloader__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo-white.png" alt="" width={829} height={266} />
        <div className="preloader__bar">
          <span style={{ "--progress": progress } as React.CSSProperties} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NAV
   Tone flips against whatever section sits beneath it, and the
   bar retracts on scroll-down / returns on scroll-up.
   ============================================================ */
export function Nav() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [pinned, setPinned] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Pinned / retracted state. Deliberately synchronous rather than
  // rAF-throttled: it only reads scrollY (no layout reads), and gating the
  // nav's legibility on a frame callback risks it lagging the background.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setPinned(y > 40);
      // Retract only well past the hero, and never while the drawer is open.
      setHidden(y > 560 && y > lastY.current + 6 && !open);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Tone. A 1px IntersectionObserver band sitting just under the nav reports
  // which section is currently behind the bar. This survives layout changes
  // that scroll-offset maths does not — notably GSAP's pin spacers.
  useEffect(() => {
    const zones = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-tone]")
    );
    if (!zones.length) return;

    let io: IntersectionObserver | null = null;

    const build = () => {
      io?.disconnect();
      const band = 48; // probe line, roughly the vertical centre of the bar
      const bottom = Math.max(0, window.innerHeight - band - 1);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const t = (e.target as HTMLElement).dataset.navTone;
              setTone(t === "light" ? "light" : "dark");
            }
          }
        },
        { rootMargin: `-${band}px 0px -${bottom}px 0px`, threshold: 0 }
      );
      zones.forEach((z) => io!.observe(z));
    };

    build();
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("resize", build);
      io?.disconnect();
    };
  }, []);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className="nav"
        data-tone={open ? "dark" : tone}
        data-pinned={pinned && !open}
        data-hidden={hidden}
      >
        <a className="nav__brand" href="/" aria-label={`${SITE.name} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo--light" src="/media/logo-white.png" alt={SITE.name} width={829} height={266} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo--dark" src="/media/logo-dark.png" alt={SITE.name} width={1444} height={463} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((item) => (
            <a className="nav__link" key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {/* Leaves the site for the Beds & More store, so it opens in a new
              tab and the cursor names the destination — a "Buy Now" that
              silently swaps domains is a surprise, not a shortcut. */}
          <a
            className="btn"
            href={SHOP.href}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor={SHOP.cursor}
          >
            {SHOP.label}
          </a>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="site-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
          </button>
        </div>
      </header>

      <div className="drawer" id="site-drawer" data-open={open} inert={!open || undefined}>
        {NAV.map((item, i) => (
          <a
            className="drawer__link"
            key={item.href}
            href={item.href}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div className="drawer__foot">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
          {FOOTER_LINKS.legal.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   CUSTOM CURSOR
   Desktop only. Reads its label from [data-cursor] on hover.
   ============================================================ */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const el = ref.current;
    if (!el) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const loop = () => {
      // Trailing ease keeps the dot from feeling glued to the pointer.
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.setProperty("--cx", `${cx}px`);
      el.style.setProperty("--cy", `${cy}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      if (target) {
        setLabel(target.dataset.cursor || "");
        setActive(true);
      } else {
        setActive(false);
      }
    };

    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} data-active={active} aria-hidden="true">
      {label}
    </div>
  );
}

/**
 * Floating WhatsApp button.
 *
 * A plain anchor to wa.me, which opens the desktop app or web client if one
 * is installed and falls back to WhatsApp Web otherwise — no SDK, no script,
 * and it still works with JS off. Rendered once next to <Cursor /> so every
 * page carries it.
 */
export function WhatsAppFab() {
  return (
    <a
      className="wafab"
      href={WHATSAPP.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={WHATSAPP.label}
      data-cursor="Chat"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z"
        />
      </svg>
    </a>
  );
}
