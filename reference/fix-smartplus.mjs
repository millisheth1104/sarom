/**
 * Rasterise the Smart Plus logo from its SVG.
 *
 * The raster copy on sarom.info (brandlogo/smartplus.webp) has a solid
 * background rather than transparency, so building a silhouette from its
 * alpha produced a filled grey block. The SVG is clean, so it is rendered
 * over a transparent page instead.
 */
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const svg = readFileSync("reference/_brandlogo/smartplus-colour.svg", "utf8");

const browser = await chromium.launch({ executablePath: CHROME });
const page = await (await browser.newContext({
  viewport: { width: 1600, height: 600 },
  deviceScaleFactor: 2,
})).newPage();

await page.setContent(
  `<html><body style="margin:0;background:transparent">
     <div id="w" style="display:inline-block">${svg}</div>
   </body></html>`
);
await page.waitForTimeout(400);
// Fit the drawing to a known height so the export is crisp.
await page.evaluate(() => {
  const s = document.querySelector("#w svg");
  // The file carries width/height but NO viewBox, so stripping the two
  // dimensions left it with no coordinate system and it rendered empty.
  const w = s.getAttribute("width"), h = s.getAttribute("height");
  if (!s.getAttribute("viewBox")) s.setAttribute("viewBox", `0 0 ${w} ${h}`);
  s.removeAttribute("width");
  s.removeAttribute("height");
  s.style.height = "260px";
  s.style.width = "auto";
  s.style.display = "block";
});
// Drop the lime plate. It is a background panel behind the mark, not part of
// the mark: keeping it would put a solid green rectangle among four wordmarks,
// and it is also why the raster copy came out 100% opaque.
await page.evaluate(() => {
  document
    .querySelectorAll('#w svg path[fill="#B8D654"]')
    .forEach((el) => el.remove());
});
await page.waitForTimeout(300);

const el = await page.$("#w");
const buf = await el.screenshot({ omitBackground: true });
writeFileSync("reference/_brandlogo/smartplus-vector.png", buf);
console.log("wrote reference/_brandlogo/smartplus-vector.png", (buf.length / 1024).toFixed(0), "KB");

await browser.close();
