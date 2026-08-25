/**
 * Save the cover frame of each Sarom reel as a local film poster.
 *
 * The frames come from each post's og:image — the preview picture Instagram
 * publishes for link unfurling, served without login. They are downloaded and
 * stored rather than hotlinked: the CDN URLs are signed and expire, so a
 * hotlinked poster would silently break.
 */
import { writeFileSync, mkdirSync } from "node:fs";

const POSTS = [
  { slot: 1, url: "https://www.instagram.com/p/DZ2RLXEyj3X/" },
  { slot: 2, url: "https://www.instagram.com/p/DcOMsgEIdnw/" },
  { slot: 3, url: "https://www.instagram.com/p/DaWx3vIIeU9/" },
  { slot: 4, url: "https://www.instagram.com/p/Da7y4blBrTb/" },
];

mkdirSync("public/media/films", { recursive: true });

for (const p of POSTS) {
  const r = await fetch(p.url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; SaromSiteBuild/1.0)", accept: "text/html" },
  });
  const html = await r.text();
  const m =
    html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
    html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);
  if (!m) {
    console.log(`slot ${p.slot}: no og:image`);
    continue;
  }
  const img = m[1].replace(/&amp;/g, "&");
  const ir = await fetch(img, { headers: { "user-agent": "Mozilla/5.0 (compatible; SaromSiteBuild/1.0)" } });
  if (!ir.ok) {
    console.log(`slot ${p.slot}: image HTTP ${ir.status}`);
    continue;
  }
  const buf = Buffer.from(await ir.arrayBuffer());
  const isJpg = buf.subarray(0, 2).toString("hex") === "ffd8";
  const out = `public/media/films/film-${p.slot}.jpg`;
  writeFileSync(out, buf);
  console.log(`slot ${p.slot}: ${(buf.length / 1024).toFixed(0)} KB  jpeg=${isJpg}  -> ${out}`);
}
