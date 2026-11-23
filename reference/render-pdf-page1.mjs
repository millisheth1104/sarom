// Renders page 1 of each PDF to a 2x PNG through Chrome's own PDF viewer.
//
// Why this exists: ingest-top5-pdfs.py cut covers with PyMuPDF, which a Windows
// Application Control policy on the dev machine now blocks (the DLL will not
// load). Chrome is installed and permitted, and its viewer renders a PDF page
// faithfully, so the covers for ingest-upholstery-nov.py come from here.
//
// Usage:  node reference/render-pdf-page1.mjs <out-dir> <pdf> [<pdf> ...]
// Writes  <out-dir>/hi-<first word of the file name, lower-case>.png  (1400px wide).
//
// A FRESH page per PDF is deliberate: changing only the #page= hash on a loaded
// viewer does not re-page it, which cost a wrong round of screenshots once.
import { chromium } from "playwright-core";
import path from "node:path";

const [out, ...pdfs] = process.argv.slice(2);
if (!out || !pdfs.length) {
  console.error("usage: node reference/render-pdf-page1.mjs <out-dir> <pdf> [<pdf> ...]");
  process.exit(1);
}
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: 700, height: 1700 }, deviceScaleFactor: 2 });
for (const pdf of pdfs) {
  const page = await ctx.newPage();
  const url =
    "file:///" + path.resolve(pdf).replace(/\\/g, "/").split("/").map(encodeURIComponent).join("/").replace(/^C%3A/, "C:") +
    "#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1";
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(3000);
  const name = path.basename(pdf).split(/[ .]/)[0].toLowerCase();
  await page.screenshot({ path: path.join(out, `hi-${name}.png`) });
  await page.close();
  console.log("rendered", name);
}
await browser.close();
