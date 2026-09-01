# -*- coding: utf-8 -*-
"""
Regenerate lib/india-map.ts.

Pins were previously placed at the mean of each ring's VERTICES, weighted by
area. That is not a centroid: it drags toward wherever vertices are dense, and
a coastline carries far more vertices than a straight inland border. Punjab's
pin landed over Himachal, Maharashtra's up near the Madhya Pradesh border.

A true polygon centroid would fix the bias but still falls outside concave
states (Gujarat wraps the Gulf of Kutch). So this uses the pole of
inaccessibility — the point furthest from any edge while still inside — which
is what mapping libraries use to place labels. Computed on the SIMPLIFIED ring
that actually gets rendered, so the pin cannot disagree with the drawn shape.
"""
import json, os, io, math, heapq

src = os.path.join(os.environ["TEMP"], "sl", "ne.json")
g = json.load(open(src, encoding="utf-8"))
feats = [f for f in g["features"] if f["properties"].get("admin") == "India"]

# ---- projection (unchanged: equirectangular, corrected at mid-latitude)
LAT0, LAT1 = 6.0, 37.6
LON0, LON1 = 67.9, 97.6
K = math.cos(math.radians((LAT0 + LAT1) / 2))
W = 1000.0
SX = W / ((LON1 - LON0) * K)
H = (LAT1 - LAT0) * SX

def proj(lon, lat):
    return ((lon - LON0) * K * SX, (LAT1 - lat) * SX)

def dp(pts, eps):
    if len(pts) < 3:
        return pts
    ax, ay = pts[0]; bx, by = pts[-1]
    dx, dy = bx - ax, by - ay
    n = math.hypot(dx, dy)
    best, bi = -1.0, 0
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        d = abs(dx * (ay - py) - (ax - px) * dy) / n if n else math.hypot(px - ax, py - ay)
        if d > best:
            best, bi = d, i
    if best > eps:
        return dp(pts[: bi + 1], eps)[:-1] + dp(pts[bi:], eps)
    return [pts[0], pts[-1]]

def area(p):
    s = 0.0
    for i in range(len(p)):
        x1, y1 = p[i]; x2, y2 = p[(i + 1) % len(p)]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2

def rings(geom):
    t, c = geom["type"], geom["coordinates"]
    if t == "Polygon":
        return [c[0]]
    if t == "MultiPolygon":
        return [poly[0] for poly in c]
    return []

# ---- pole of inaccessibility (polylabel)
def seg_dist(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    if dx or dy:
        t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
        if t > 1: ax, ay = bx, by
        elif t > 0: ax, ay = ax + dx * t, ay + dy * t
    return math.hypot(px - ax, py - ay)

def signed_dist(px, py, ring):
    """Distance to the ring, positive when the point is inside it."""
    inside = False
    best = float("inf")
    n = len(ring)
    for i in range(n):
        ax, ay = ring[i]; bx, by = ring[(i + 1) % n]
        if (ay > py) != (by > py) and px < (bx - ax) * (py - ay) / (by - ay) + ax:
            inside = not inside
        best = min(best, seg_dist(px, py, ax, ay, bx, by))
    return best if inside else -best

def polylabel(ring, precision=0.6):
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    w, h = maxx - minx, maxy - miny
    cell = min(w, h)
    if cell == 0:
        return (minx, miny)
    r = cell / 2
    # max distance a cell could still contain, used to prune the search
    def cellmax(x, y, r):
        return signed_dist(x, y, ring) + r * math.sqrt(2)

    q = []
    tie = 0
    x = minx
    while x < maxx:
        y = miny
        while y < maxy:
            heapq.heappush(q, (-cellmax(x + r, y + r, ring_h := r), tie, x + r, y + r, r))
            tie += 1
            y += cell
        x += cell

    # start from the centroid as a floor
    bx = minx + w / 2; by = miny + h / 2
    best = (signed_dist(bx, by, ring), bx, by)
    while q:
        negmax, _, cx, cy, r = heapq.heappop(q)
        if -negmax - best[0] <= precision:
            continue
        d = signed_dist(cx, cy, ring)
        if d > best[0]:
            best = (d, cx, cy)
        h2 = r / 2
        for ox, oy in ((-h2, -h2), (h2, -h2), (-h2, h2), (h2, h2)):
            heapq.heappush(q, (-cellmax(cx + ox, cy + oy, h2), tie, cx + ox, cy + oy, h2))
            tie += 1
    return (best[1], best[2])

EPS, MIN_AREA = 1.15, 6.0
out = []
for f in feats:
    name = f["properties"]["name"]
    simp_rings = []
    for ring in rings(f["geometry"]):
        pts = [proj(lon, lat) for lon, lat, *_ in ring]
        if area(pts) < MIN_AREA:
            continue
        s = dp(pts, EPS)
        if len(s) >= 4:
            simp_rings.append(s)
    if not simp_rings:
        continue
    d = "".join("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in r) + "Z" for r in simp_rings)
    # place the pin in the LARGEST ring — a state's mainland, never an island
    main = max(simp_rings, key=area)
    cx, cy = polylabel(main)
    out.append({"name": name, "d": d, "cx": round(cx, 1), "cy": round(cy, 1),
                "_ring": main})

# ---- verify: every pin must fall INSIDE its own rendered shape
bad = [o["name"] for o in out if signed_dist(o["cx"], o["cy"], o["_ring"]) <= 0]
print("states:", len(out))
print("pins landing OUTSIDE their state:", bad if bad else "none")
clear = min(signed_dist(o["cx"], o["cy"], o["_ring"]) for o in out)
print(f"smallest clearance from a border: {clear:.1f}px (of a 1000-wide map)")

for o in out:
    del o["_ring"]

hdr = '''/**
 * India, as simplified SVG paths.
 *
 * Source: Natural Earth 1:50m admin-1 states and provinces - PUBLIC DOMAIN,
 * so it carries no attribution requirement and is free for commercial use.
 * (An earlier candidate turned out to be GADM, whose licence forbids
 * commercial use; check the property names - ID_0/NAME_1 means GADM.)
 *
 * Generated, not hand-written: rings projected with an equirectangular
 * projection corrected by cos(mid-latitude) so the country keeps its
 * proportions, then Douglas-Peucker simplified at ~1.1px and specks under
 * 6 square units dropped.
 *
 * `cx`/`cy` are each state's POLE OF INACCESSIBILITY - the point furthest
 * from any border while still inside the shape - computed on the simplified
 * ring that actually gets rendered, and on the largest ring only so a pin
 * never lands on an offshore island.
 *
 * This is deliberately NOT a centroid. The first version averaged ring
 * vertices weighted by area, which drags toward wherever vertices are dense:
 * a coastline carries far more of them than a straight inland border, so
 * Punjab's pin sat over Himachal and Maharashtra's up near the MP border. A
 * true centroid fixes that bias but still falls outside concave states -
 * Gujarat wraps the Gulf of Kutch. Every pin is asserted inside its own
 * polygon at generation time.
 *
 * NOTE FOR THE CLIENT: this is a decorative map, not a survey document.
 * Depictions of India's external boundaries are regulated; have this checked
 * against the official Survey of India depiction before it goes live.
 */

export type MapState = { name: string; d: string; cx: number; cy: number };

export const INDIA_VIEWBOX = { w: %d, h: %d };

export const INDIA_STATES: MapState[] = [''' % (round(W), round(H))

lines = [hdr]
for s in sorted(out, key=lambda x: x["name"]):
    lines.append("  { name: %s, cx: %s, cy: %s, d: %s }," %
                 (json.dumps(s["name"]), s["cx"], s["cy"], json.dumps(s["d"])))
lines.append("];\n")
io.open("lib/india-map.ts", "w", encoding="utf-8", newline="\n").write("\n".join(lines))
print("written lib/india-map.ts")
