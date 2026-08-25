/**
 * Download every catalogue cover image from sarom.info into
 *   public/catalogues/_covers/<brand>/<collection>/<title>.<ext>
 * Resumable, and validates the bytes are really an image.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, extname } from "node:path";

const products = JSON.parse(readFileSync("reference/_catalogues.json", "utf8"));
const BASE = "https://sarom.info/";
const ROOT = "public/catalogues/_covers";

const slug = (s) =>
  s.toString().trim().toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** First bytes of the common web image formats. */
const sniff = (b) => {
  if (b.subarray(0, 4).toString("hex") === "89504e47") return "png";
  if (b.subarray(0, 2).toString("hex") === "ffd8") return "jpg";
  if (b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP") return "webp";
  if (b.subarray(0, 3).toString() === "GIF") return "gif";
  return null;
};

const withImg = products.filter((p) => p.image && p.image.trim() && p.image.trim() !== "#");
const noImg = products.filter((p) => !p.image || !p.image.trim() || p.image.trim() === "#");

const covers = [];
const failed = [];
let done = 0, bytes = 0;

async function grab(p) {
  const url = BASE + p.image.replace(/^\/+/, "");
  const stem = `${slug(p.brand)}/${slug(p.collection)}/${slug(p.title)}`;

  // Already have it? (extension unknown until sniffed, so probe the likely ones)
  for (const ext of ["webp", "png", "jpg", "gif"]) {
    const f = `${ROOT}/${stem}.${ext}`;
    if (existsSync(f) && statSync(f).size > 512) {
      bytes += statSync(f).size;
      covers.push({ id: p.id, cover: `/catalogues/_covers/${stem}.${ext}` });
      return;
    }
  }

  try {
    const r = await fetch(url, { redirect: "follow" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    const ext = sniff(buf);
    // An HTML error page returns 200 on some hosts; sniffing stops it being
    // saved as a .webp that no browser can decode.
    if (!ext) throw new Error("not an image");
    const dest = `${ROOT}/${stem}.${ext}`;
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    bytes += buf.length;
    covers.push({ id: p.id, cover: `/catalogues/_covers/${stem}.${ext}` });
  } catch (e) {
    failed.push({ id: p.id, title: p.title, brand: p.brand, url, error: String(e.message || e).slice(0, 60) });
  }
  if (++done % 40 === 0) console.log(`  ${done}/${withImg.length} — ${(bytes / 1024 / 1024).toFixed(1)} MB`);
}

console.log(`downloading ${withImg.length} covers (${noImg.length} records have no image)`);
const QUEUE = [...withImg];
await Promise.all(Array.from({ length: 8 }, async () => { while (QUEUE.length) await grab(QUEUE.shift()); }));

writeFileSync("reference/_covers.json", JSON.stringify({ covers, failed, noImg: noImg.map((p) => p.id) }, null, 2));

console.log("\n=== DONE ===");
console.log("covers:", covers.length, "| failed:", failed.length, "| size:", (bytes / 1024 / 1024).toFixed(1), "MB");
failed.forEach((f) => console.log(`  FAIL ${f.brand}/${f.title}: ${f.error} :: ${f.url}`));
