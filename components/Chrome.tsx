"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, SITE, FOOTER_LINKS } from "@/lib/content";

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
          <a className="btn" href="/ecatalogue" data-cursor="View">
            e-Catalogue
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
