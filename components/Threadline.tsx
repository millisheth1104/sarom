"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * THREADLINE
 *
 * A connecting line that draws itself as its section moves through the
 * viewport, with circular nodes that pop in the moment the line reaches
 * them. Pure SVG, no external libraries beyond the GSAP already on the page.
 *
 * Two ways to place the nodes:
 *
 *   · `anchor` — a selector for elements inside the same positioned parent.
 *     The path is measured through their real centres, so it re-threads
 *     itself correctly when the grid reflows from six columns to three to
 *     two. Rows are walked boustrophedon (left-to-right, then right-to-left)
 *     so a multi-row grid reads as one continuous serpentine rather than
 *     several disconnected passes.
 *
 *   · `turns` — an auto serpentine across the box, for use with no anchors.
 *
 * A custom `path` overrides both.
 *
 * Geometry is built in real pixels rather than a 0–100 viewBox stretched with
 * preserveAspectRatio="none". That stretch is the obvious shortcut and it is
 * wrong twice over: it renders the stroke thicker on one axis than the other,
 * and it turns every circular node into an ellipse.
 *
 * Accessibility: `pointer-events: none` throughout, so it never intercepts a
 * click on the content beneath; `aria-hidden`, since it carries no meaning a
 * screen reader needs; and under `prefers-reduced-motion` the line renders
 * complete and static instead of drawing.
 */

type Pt = { x: number; y: number; el?: HTMLElement };

/**
 * An element's LAID-OUT box relative to an ancestor, walking the offsetParent
 * chain rather than reading getBoundingClientRect().
 *
 * This matters here specifically: anchors are usually reveal targets, and the
 * reveal engine holds them translated (70px down for dir="up") until they
 * enter the viewport. A rect-based measurement therefore threads the line
 * through where the cards START rather than where they settle — measured on
 * the founders row, cards reported top=158 while pre-reveal and 88 after, so
 * the thread was drawn 70px too low and cut straight through the portraits.
 * offsetTop/offsetLeft ignore transforms, so the geometry is stable whether
 * the reveal has fired or not.
 */
function layoutBox(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

export function Threadline({
  anchor,
  turns = 4,
  startSide = "top",
  amplitude = 0.3,
  color = "var(--accent)",
  thickness = 1.5,
  nodeSize = 7,
  nodeFill = "var(--bg)",
  nodeBorder,
  path: customPath,
  anchorPoint = "center",
  stampOn,
  offsetY = 0,
  weave = 0,
  orientation = "horizontal",
  start = "top 78%",
  end = "bottom 62%",
  externalDrive = "",
  checks = false,
  railInset = 0,
  className = "",
}: {
  /** Selector for the elements to thread through, within the same parent. */
  anchor?: string;
  /** Auto-serpentine turn count, used when `anchor` finds nothing. */
  turns?: number;
  startSide?: "top" | "bottom";
  /** Wave height as a fraction of the box, for the auto serpentine. */
  amplitude?: number;
  color?: string;
  thickness?: number;
  nodeSize?: number;
  nodeFill?: string;
  nodeBorder?: string;
  /** Custom SVG path data. Overrides both anchor and auto modes. */
  path?: string;
  /**
   * Which edge of each anchor the thread runs through. "top" keeps the
   * thread a fixed distance from the top of a card whatever its height, so
   * it stays put when the grid reflows and the cards change size — a
   * centre-anchored offset in px cannot do that, it drifts with every
   * breakpoint.
   */
  anchorPoint?: "center" | "top" | "bottom";
  /**
   * Selector for an ANCESTOR of each anchor to receive the `--t` threshold,
   * instead of the anchor itself. Needed when the thing the line should
   * follow geometrically (a portrait) is nested inside the thing that should
   * react to it (the whole row): custom properties inherit downward only, so
   * a value stamped on the child is unreachable from the parent.
   */
  stampOn?: string;
  /** Nudge from the chosen anchor point, in px. */
  offsetY?: number;
  /**
   * Alternating rise and fall applied per anchor, in px — this is what makes
   * the line serpentine. Without it a row of equal-height cards yields
   * anchors that all share one y, and the "thread" renders as a dead
   * straight rule. Measured on the first build: every point came back at
   * y=104.
   */
  weave?: number;
  /**
   * "vertical" runs the thread DOWN the box, oscillating left and right —
   * the full-section scrollytelling form, where the trail emerges over the
   * whole scroll through a section. "horizontal" runs across, for threading
   * a single row.
   */
  orientation?: "horizontal" | "vertical";
  start?: string;
  end?: string;
  /**
   * A media query under which an OUTSIDE ScrollTrigger already writes `--p`
   * on the parent, so this component must not create one of its own.
   *
   * Needed wherever the thread lives inside a pinned element. Two triggers
   * writing the same custom property do not average out, they alternate: the
   * journey rail's pin (7956->8983) and this component's own trigger
   * (7370->8219) overlap, and `--p` measured 0 -> 0.93 -> 0.58 -> 0.86 -> 1
   * across the scroll. The line drew, retracted, and drew again. A self
   * trigger is meaningless inside a pin anyway — the element is frozen in the
   * viewport, so its own progress stops meaning anything the moment it pins.
   *
   * Below the query the self trigger is still created, so the same component
   * works in the un-pinned mobile fallback.
   */
  externalDrive?: string;
  /**
   * Render each node as a step marker that completes into a check, rather
   * than a plain dot. Turns the thread into a progress rail: idle steps sit
   * small and dim on the base line, the step the progress has just reached
   * is "active", and passed steps fill and take a tick.
   */
  checks?: boolean;
  /** Inset from the anchors' left edge when the layout stacks into a column. */
  railInset?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");
  const [nodes, setNodes] = useState<(Pt & { t: number; tn?: number })[]>([]);

  /* Measure the host and its anchors, then rebuild the path. Runs in a layout
     effect so the first paint already has real geometry rather than a frame
     of a zero-width line. */
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const build = () => {
      const parent = host.parentElement;
      if (!parent) return;
      /* scrollWidth, not offsetWidth. When the parent is a horizontal rail its
         children overflow it: the journey track measures 1440 (its padding
         box) while its content spans 2092. Sizing the box to offsetWidth drew
         a path that stopped 650px short — the line simply ended in mid-air
         before the last two stops, and the final node sat at t=0.99 because
         the lead-out had nowhere left to run. */
      const w = Math.max(parent.offsetWidth, parent.scrollWidth);
      const h = Math.max(parent.offsetHeight, parent.scrollHeight);
      if (!w || !h) return;
      setBox({ w, h });

      if (customPath) {
        setD(customPath);
        return;
      }

      let pts: Pt[] = [];
      let columnLayout = false;

      const els = anchor
        ? Array.from(parent.querySelectorAll<HTMLElement>(anchor))
        : [];

      if (els.length) {
        /* The element travels WITH its point through the sorting and weaving
           below, so the node that ends up on a card can be tied back to that
           exact card. Re-matching by position afterwards looks equivalent
           and is not: once the grid wraps, several cards share an x, so an
           x-distance match hands the same card three thresholds and leaves
           three others at 0 — permanently invisible, since the reveal is
           driven off that value. Seen at the 3-column breakpoint. */
        /* Centre-x is right for a ROW of anchors and wrong for a COLUMN: when
           the layout stacks, every anchor shares an x, so a centred rail runs
           straight down the middle of the copy. Detected from the anchors
           themselves rather than from a media query, so it follows whatever
           the layout actually did — if the x-spread is small against the
           y-spread, this is a column and the rail belongs in the left gutter. */
        const boxes = els.map((el) => layoutBox(el, parent));
        const xs = boxes.map((r) => r.x + r.w / 2);
        const ys = boxes.map((r) => r.y);
        const spreadX = Math.max(...xs) - Math.min(...xs);
        const spreadY = Math.max(...ys) - Math.min(...ys);
        const column = els.length > 1 && spreadY > spreadX;
        columnLayout = column;

        const raw: Pt[] = els.map((el, i) => {
          const r = boxes[i];
          if (column) {
            /* Down the left gutter, level with the top of each stop. */
            return { x: r.x + railInset, y: r.y + r.h / 2, el };
          }
          const edge = anchorPoint === "top" ? 0 : anchorPoint === "bottom" ? r.h : r.h / 2;
          return { x: r.x + r.w / 2, y: r.y + edge + offsetY, el };
        });

        /* Group into rows, then alternate direction row to row. Without this
           a wrapped grid produces a path that snaps back to the left edge on
           every new row — a diagonal slash across the section rather than a
           thread. Tolerance is half a row height, which keeps items that sit
           a few pixels apart on the same visual row together. */
        const rows: Pt[][] = [];
        const tol = (els[0]?.offsetHeight ?? 40) * 0.5;
        raw
          .slice()
          .sort((a, b) => a.y - b.y)
          .forEach((p) => {
            const row = rows.find((r) => Math.abs(r[0].y - p.y) < tol);
            if (row) row.push(p);
            else rows.push([p]);
          });
        rows.forEach((r, i) => {
          r.sort((a, b) => (i % 2 === 0 ? a.x - b.x : b.x - a.x));
        });
        pts = rows.flat();
        if (weave) {
          /* Alternate above and below the anchor line. startSide picks which
             way the first node goes, so the wave can be flipped without
             touching the markup. */
          const up0 = startSide === "top";
          pts = pts.map((p, i) => ({
            ...p,
            y: p.y + ((i % 2 === 0) === up0 ? -weave : weave),
          }));
        }
      } else if (orientation === "vertical") {
        /* Serpentine DOWN the box: y advances, x swings side to side. */
        const mid = w / 2;
        const amp = (w * amplitude) / 2;
        const left = mid - amp;
        const right = mid + amp;
        const dy = h / (turns + 1);
        for (let i = 0; i < turns; i++) {
          const toLeft = startSide === "top" ? i % 2 === 0 : i % 2 === 1;
          pts.push({ x: toLeft ? left : right, y: dy * (i + 1) });
        }
      } else {
        /* Serpentine ACROSS the box. */
        const mid = h / 2;
        const amp = (h * amplitude) / 2;
        const hi = mid - amp;
        const lo = mid + amp;
        const dx = w / (turns + 1);
        for (let i = 0; i < turns; i++) {
          const up = startSide === "top" ? i % 2 === 0 : i % 2 === 1;
          pts.push({ x: dx * (i + 1), y: up ? hi : lo });
        }
      }

      if (pts.length < 2) return;

      /* Lead-in and lead-out to the box edges, so the thread reads as passing
         through the section rather than beginning and ending on a founder. */
      /* Lead-in and lead-out run level with the first and last nodes, so the
         thread enters and leaves the box flat.
         NOT the mean of all node heights: once the grid wraps, that mean sits
         between rows, and the entry curve dives from the left edge down to it
         — straight through the first portrait. Seen at the 3-column
         breakpoint before this was changed back. */
      /* A detected column threads vertically whatever `orientation` says —
         the lead-in/out and the bezier handles have to follow the axis the
         points actually travel along, or the curve doubles back. */
      const vert = orientation === "vertical" || columnLayout;
      const full: Pt[] = vert
        ? [{ x: pts[0].x, y: 0 }, ...pts, { x: pts[pts.length - 1].x, y: h }]
        : [{ x: 0, y: pts[0].y }, ...pts, { x: w, y: pts[pts.length - 1].y }];

      /* Horizontal control handles give each anchor a flat tangent, so the
         curve arrives level at every node and the turns read as deliberate
         rather than as a wobble. */
      let dd = `M ${full[0].x.toFixed(2)} ${full[0].y.toFixed(2)}`;
      for (let i = 1; i < full.length; i++) {
        const a = full[i - 1];
        const b = full[i];
        /* Handles extend along the axis of travel, giving each turn a tangent
           perpendicular to it — the curve arrives square at every node
           instead of cutting the corner. */
        if (vert) {
          const cy = Math.abs(b.y - a.y) * 0.5;
          dd += ` C ${a.x.toFixed(2)} ${(a.y + cy).toFixed(2)}, ${b.x.toFixed(2)} ${(b.y - cy).toFixed(2)}, ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
        } else {
          const cx = Math.abs(b.x - a.x) * 0.5;
          dd += ` C ${(a.x + cx).toFixed(2)} ${a.y.toFixed(2)}, ${(b.x - cx).toFixed(2)} ${b.y.toFixed(2)}, ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
        }
      }
      setD(dd);

      /* Node thresholds are measured along the real path, by walking it and
         keeping the closest sample to each node.

         NOT a binary search on one axis, which is the obvious approach and
         breaks here: a serpentine reverses direction every row, so x is not
         monotonic along the path and the search converges on the wrong
         segment — at the 3-column breakpoint it handed rows 1 and 2 the same
         three thresholds. Nor an evenly-spaced guess from the index: bezier
         arc length is not linear in the parameter, so nodes would pop before
         or after the line actually arrives. A dense walk is correct for any
         path shape, and runs once per layout rather than per frame. */
      requestAnimationFrame(() => {
        const p = pathRef.current;
        if (!p) return;
        const total = p.getTotalLength();
        if (!total) return;

        const STEPS = 700;
        const best = pts.map(() => ({ d: Infinity, len: 0 }));
        for (let i = 0; i <= STEPS; i++) {
          const len = (total * i) / STEPS;
          const q = p.getPointAtLength(len);
          pts.forEach((pt, k) => {
            const dx = q.x - pt.x;
            const dy = q.y - pt.y;
            const d = dx * dx + dy * dy;
            if (d < best[k].d) best[k] = { d, len };
          });
        }
        const placed = pts.map((pt, k) => ({ ...pt, t: best[k].len / total }));
        setNodes(placed);
        /* Each node also needs to know where the NEXT one sits. "Active" is
           not a property of a step on its own — it is being the furthest step
           the progress has reached, which is only knowable by comparing
           against the step after it. The last node gets 1 so that it stops
           being active once the rail completes, rather than staying lit. */
        placed.forEach((n, k) => {
          (n as Pt & { t: number; tn: number }).tn =
            k + 1 < placed.length ? placed[k + 1].t : 1;
        });

        /* Publish each node's threshold onto the element it sits on. Any
           content can then fade itself in exactly as the line arrives,
           driven entirely by CSS off the same --p. */
        placed.forEach((n) => {
          const target = stampOn ? n.el?.closest<HTMLElement>(stampOn) : n.el;
          target?.style.setProperty("--t", String(n.t));
        });
      });
    };

    build();

    const ro = new ResizeObserver(build);
    ro.observe(host.parentElement ?? host);
    return () => ro.disconnect();
  }, [anchor, turns, startSide, amplitude, customPath, anchorPoint, stampOn, offsetY, weave, orientation, railInset]);

  /* Draw on scroll. GSAP writes one custom property per frame; the dash
     offset and every node's pop are computed from it in CSS, so the
     per-frame JS cost is a single style write no matter how many nodes. */
  useEffect(() => {
    const host = hostRef.current;
    const p = pathRef.current;
    if (!host || !p || !d) return;

    const total = p.getTotalLength();
    if (!total) return;
    /* px, not a bare number: `calc(var(--len) * (1 - var(--p)))` on a
       unitless --len computed to an invalid stroke-dashoffset, which read
       back as NaN at every progress below 1. */
    host.style.setProperty("--len", `${total}px`);

    /* --p goes on the PARENT, not the host: custom properties inherit, so
       putting it one level up lets the anchored content read the same
       progress the line is drawn from. On the host it would reach the svg
       only. */
    const target = (host.parentElement ?? host) as HTMLElement;

    if (prefersReducedMotion()) {
      target.style.setProperty("--p", "1");
      return;
    }

    registerGsap();
    let ctx: gsap.Context | null = null;
    const attach = () => {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: host.parentElement ?? host,
          start,
          end,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => target.style.setProperty("--p", String(self.progress)),
        });
      }, host);
    };
    const detach = () => {
      ctx?.revert();
      ctx = null;
    };

    if (!externalDrive) {
      attach();
      return detach;
    }

    /* Hand ownership of --p over to the outside trigger while the query
       matches, and take it back below it. Re-evaluated on change so a resize
       across the breakpoint does not leave the line with no driver at all. */
    const mq = window.matchMedia(externalDrive);
    const sync = () => {
      detach();
      if (mq.matches) target.style.removeProperty("--p");
      else attach();
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      detach();
    };
  }, [d, start, end, externalDrive]);

  return (
    <div ref={hostRef} className={`thread ${className}`} aria-hidden="true">
      <svg width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} fill="none">
        {/* The BASE rail, drawn full length underneath. Without it there is
            nothing ahead of the progress at all, so the line reads as a stray
            mark rather than a track being filled — the whole point of a
            progress rail is that you can see how far there is left to go. */}
        <path
          className="thread__base"
          d={d}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          className="thread__line"
          d={d}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        {nodes.map((n, i) => {
          const st = { "--t": n.t, "--tn": n.tn ?? 1 } as React.CSSProperties;
          const r = nodeSize / 2;
          return (
            <g key={i} className="thread__step" style={st}>
              {/* Halo for the step the progress is currently on. Sits first
                  so it paints behind the marker itself. */}
              {checks && (
                <circle className="thread__halo" cx={n.x} cy={n.y} r={r} fill={color} />
              )}
              <circle
                className="thread__node"
                cx={n.x}
                cy={n.y}
                r={r}
                fill={nodeFill}
                stroke={nodeBorder ?? color}
                strokeWidth={thickness}
              />
              {/* The tick, drawn on once the step completes. Geometry is in
                  units of the node radius so it scales with nodeSize rather
                  than needing to be re-tuned per use. */}
              {checks && (
                <path
                  className="thread__check"
                  d={`M ${n.x - r * 0.42} ${n.y + r * 0.04} L ${n.x - r * 0.1} ${n.y + r * 0.34} L ${n.x + r * 0.46} ${n.y - r * 0.34}`}
                  stroke={nodeFill}
                  strokeWidth={thickness * 1.15}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
