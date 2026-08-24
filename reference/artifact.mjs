/**
 * Zoom the Collections pill-nav / thumbnail-row junction, where a stray dark
 * shape was reported, and report what actually paints there.
 */
import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const p = await (
  await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
).newPage();
await p.goto("http://localhost:3000", { waitUntil: "load" });
await p.waitForTimeout(3200);

const el = await p.$(".belong");
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(1000);

const box = await p.evaluate(() => {
  const nav = document.querySelector(".belong__nav").getBoundingClientRect();
  const pv = document.querySelector(".belong__previews").getBoundingClientRect();
  return {
    x: Math.max(0, Math.round(nav.left - 24)),
    y: Math.max(0, Math.round(nav.top - 24)),
    width: Math.round(pv.right - nav.left + 160),
    height: Math.round(pv.bottom - nav.top + 48),
  };
});
await p.screenshot({ path: "reference/shots/_artifact.png", clip: box });

// What paints in the strip just right of the nav, above the thumb row?
const probe = await p.evaluate(() => {
  const pv = document.querySelector(".belong__previews");
  const pvr = pv.getBoundingClientRect();
  const panel = document.querySelector(".belong__panel").getBoundingClientRect();
  const cs = getComputedStyle(pv, "::after");
  const csb = getComputedStyle(pv, "::before");
  return {
    previews: { left: Math.round(pvr.left), right: Math.round(pvr.right), top: Math.round(pvr.top) },
    panelLeft: Math.round(panel.left),
    panelTop: Math.round(panel.top),
    after: { content: cs.content, bg: cs.backgroundImage.slice(0, 90), inset: `${cs.top} ${cs.right} ${cs.bottom} ${cs.left}`, h: cs.height, w: cs.width },
    before: { content: csb.content, bg: csb.backgroundColor, radius: csb.borderRadius },
    vars: ["--reach", "--fillet", "--panel-r", "--cradle-r", "--cradle-pad"].reduce((a, v) => {
      a[v] = getComputedStyle(document.querySelector(".belong")).getPropertyValue(v).trim();
      return a;
    }, {}),
  };
});
console.log(JSON.stringify(probe, null, 1));

await b.close();
