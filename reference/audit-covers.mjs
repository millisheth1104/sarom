/**
 * Checks every catalogue cover two ways:
 *   1. does the file the record points at actually exist?
 *   2. is that cover the PDF's own first page, or an interior page the old
 *      score-the-embedded-images heuristic picked by mistake?
 *
 * (2) is the expensive one, so it only runs with --deep. It renders page 1 at
 * low resolution and compares a coarse grayscale signature against the current
 * cover — enough to tell "different page" from "same page, re-encoded".
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const DEEP = process.argv.includes("--deep");
const POPPLER = "C:/Users/Lenovo/AppData/Local/Microsoft/WinGet/Packages/oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe/poppler-25.07.0/Library/bin";
const SCRATCH = process.env.SCRATCH || "C:/Users/Lenovo/AppData/Local/Temp/claude/C--Users-Lenovo-OneDrive-Desktop-sarom/37c47641-749d-48f7-835e-b0f854272c7e/scratchpad/covers";

const src = fs.readFileSync("lib/catalogues.ts", "utf8");
const blocks = src.split(/\n  \{\n/).slice(1);
const recs = [];
for (const b of blocks) {
  const g = (k) => (b.match(new RegExp(`"${k}":\\s*"([^"]+)"`)) || [])[1];
  const title = g("title"), cover = g("cover"), pdfLocal = g("pdfLocal");
  if (title && cover) recs.push({ title, cover, pdfLocal });
}

const exists = (p) => p && fs.existsSync(path.join("public", p));
const missing = recs.filter((r) => !exists(r.cover));
console.log("records          :", recs.length);
console.log("cover resolves   :", recs.length - missing.length);
console.log("cover missing    :", missing.length);
missing.forEach((m) => console.log("   " + m.title + "  " + m.cover));
console.log("withLocalPdf     :", recs.filter((r) => exists(r.pdfLocal)).length);

if (!DEEP) { console.log("\n(pass --deep to compare each cover against its PDF page 1)"); process.exit(0); }

fs.mkdirSync(SCRATCH, { recursive: true });
const sig = (file) => {
  // 8x8 grayscale means, as a comparable vector
  const out = execFileSync("python", ["-c", `
from PIL import Image
im = Image.open(r"${file}").convert("L").resize((8, 8), Image.LANCZOS)
print(",".join(str(p) for p in im.getdata()))
`], { encoding: "utf8" });
  return out.trim().split(",").map(Number);
};
const dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0) / a.length);

const differs = [], same = [], skipped = [];
let n = 0;
for (const r of recs) {
  n++;
  if (!exists(r.pdfLocal) || !exists(r.cover)) { skipped.push(r.title); continue; }
  const stem = path.join(SCRATCH, "p1");
  try {
    execFileSync(path.join(POPPLER, "pdftoppm"), ["-png", "-r", "40", "-f", "1", "-l", "1", path.join("public", r.pdfLocal), stem], { stdio: "pipe" });
    const rendered = fs.readdirSync(SCRATCH).find((f) => f.startsWith("p1-"));
    if (!rendered) { skipped.push(r.title); continue; }
    const rp = path.join(SCRATCH, rendered);
    const d = dist(sig(rp), sig(path.join("public", r.cover)));
    (d > 26 ? differs : same).push({ title: r.title, cover: r.cover, pdf: r.pdfLocal, d: +d.toFixed(1) });
    fs.unlinkSync(rp);
  } catch { skipped.push(r.title); }
  if (n % 25 === 0) console.log(`  ...${n}/${recs.length}`);
}
console.log("");
console.log("matches PDF page 1 :", same.length);
console.log("DIFFERENT from p1  :", differs.length);
console.log("skipped (no pdf)   :", skipped.length);
differs.sort((a, b) => b.d - a.d);
console.log("");
differs.forEach((x) => console.log(`  d=${String(x.d).padStart(5)}  ${x.title}`));
fs.writeFileSync(path.join(SCRATCH, "differs.json"), JSON.stringify(differs, null, 2));
console.log("\nwritten:", path.join(SCRATCH, "differs.json"));
