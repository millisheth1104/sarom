/**
 * Download every catalogue PDF from sarom.info into
 *   public/catalogues/<brand>/<collection>/<title>.pdf
 *
 * Resumable: an existing, valid file is skipped, so the script can be
 * re-run after an interruption without re-fetching everything.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname } from "node:path";

const products = JSON.parse(readFileSync("reference/_catalogues.json", "utf8"));
const BASE = "https://sarom.info/";
const ROOT = "public/catalogues";

const slug = (s) =>
  s.toString().trim().toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const withPdf = products.filter((p) => p.url && p.url.trim() !== "#");
const noPdf = products.filter((p) => !p.url || p.url.trim() === "#");

const manifest = [];
const failed = [];
let done = 0, skipped = 0, bytes = 0;

async function grab(p) {
  const rel = `${slug(p.brand)}/${slug(p.collection)}/${slug(p.title)}.pdf`;
  const dest = `${ROOT}/${rel}`;
  const url = BASE + p.url.replace(/^\/+/, "");

  const record = {
    id: p.id, title: p.title, brand: p.brand, collection: p.collection,
    type: p.type, source: url, file: `/catalogues/${rel}`,
  };

  if (existsSync(dest) && statSync(dest).size > 1024) {
    skipped++; bytes += statSync(dest).size; manifest.push(record); return;
  }

  try {
    const r = await fetch(url, { redirect: "follow" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    // A PHP error page would download happily as "a file"; check the magic
    // bytes so a 200-with-HTML does not get saved as a .pdf.
    if (buf.subarray(0, 5).toString() !== "%PDF-") throw new Error("not a PDF");
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    bytes += buf.length;
    manifest.push(record);
  } catch (e) {
    failed.push({ ...record, error: String(e.message || e).slice(0, 80) });
  }
  if (++done % 20 === 0) {
    console.log(`  ${done + skipped}/${withPdf.length} — ${(bytes / 1024 / 1024).toFixed(0)} MB`);
  }
}

console.log(`downloading ${withPdf.length} PDFs (${noPdf.length} records have no PDF link)`);
const QUEUE = [...withPdf];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (QUEUE.length) await grab(QUEUE.shift());
  })
);

manifest.sort((a, b) => a.id - b.id);
writeFileSync("reference/catalogue-manifest.json", JSON.stringify({
  generated_from: "https://sarom.info/ecatalogue.php",
  total_records: products.length,
  downloaded: manifest.length,
  without_pdf: noPdf.map((p) => ({ id: p.id, title: p.title, brand: p.brand, collection: p.collection })),
  failed,
  catalogues: manifest,
}, null, 2));

console.log("\n=== DONE ===");
console.log("downloaded/kept:", manifest.length);
console.log("skipped (already present):", skipped);
console.log("failed:", failed.length);
console.log("total size:", (bytes / 1024 / 1024).toFixed(1), "MB");
if (failed.length) failed.forEach((f) => console.log(`  FAIL ${f.brand}/${f.title}: ${f.error}`));
if (noPdf.length) {
  console.log("\nNo PDF on the source site (url is '#'):");
  noPdf.forEach((p) => console.log(`  ${p.brand}/${p.collection} — ${p.title}`));
}
