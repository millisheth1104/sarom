/**
 * Measure the wordmark's real GLYPH width.
 *
 * getBoundingClientRect on the <p> returns the block box (= container width),
 * which hides overflow entirely — that is why "sarom." looked like it fitted
 * while the m and the dot were being clipped. Measure the text run instead,
 * via a Range, and derive the exact cqw that lands it on the container.
 */
import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3000", { waitUntil: "load" });
await p.waitForTimeout(3200);

const r = await p.evaluate(() => {
  const wm = document.querySelector(".foot__wordmark");
  const box = wm.getBoundingClientRect();

  // real ink width of the text run
  const range = document.createRange();
  range.selectNodeContents(wm);
  const textW = range.getBoundingClientRect().width;

  const fs = parseFloat(getComputedStyle(wm).fontSize);
  const container = wm.parentElement.getBoundingClientRect().width;

  return {
    fontSize: +fs.toFixed(1),
    blockWidth: Math.round(box.width),
    glyphWidth: Math.round(textW),
    container: Math.round(container),
    overflowing: textW > container + 1,
    overflowBy: Math.round(textW - container),
    // width per 1px of font-size — the constant we actually need
    ratio: +(textW / fs).toFixed(4),
  };
});

// target 98% of the container, leaving a hair of breathing room
const targetCqw = ((0.98 / r.ratio) * 100).toFixed(1);
console.log(JSON.stringify(r, null, 1));
console.log(`\nglyph run is ${r.ratio}x the font-size`);
console.log(`=> to fill 98% of the container: font-size ${targetCqw}cqw`);

await b.close();
