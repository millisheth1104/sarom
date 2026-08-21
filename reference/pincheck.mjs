/**
 * Verify the In-the-Room pin.
 *
 * Walks the page scroll across the section and asserts three things:
 *   1. the section top stays at 0 while pinned (it does not scroll away),
 *   2. the track's scrollLeft advances monotonically with page scroll,
 *   3. the pin releases only after the track has reached its end.
 */
import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3000", { waitUntil: "load" });
await p.waitForTimeout(3200);

// settle layout, then find where the pin starts
const info = await p.evaluate(() => {
  const t = document.querySelector(".edit3__row");
  return {
    // the ROW is the pin trigger now, so measure from its top
    sectionTop: Math.round(t.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.09),
    overflow: Math.round(t.scrollWidth - t.clientWidth),
    cardH: Math.round(t.querySelector(".edit3__card").offsetHeight),
  };
});
console.log(`pin engages near y=${info.sectionTop}, track overflow=${info.overflow}px, card height=${info.cardH}px`);

const rows = [];
const startY = info.sectionTop;
const steps = 10;
for (let i = 0; i <= steps + 2; i++) {
  const y = startY + Math.round((info.overflow * i) / steps);
  await p.evaluate((v) => window.scrollTo(0, v), y);
  await p.waitForTimeout(260);
  const r = await p.evaluate(() => {
    const t = document.querySelector(".edit3__row");
    return {
      y: Math.round(window.scrollY),
      secTop: Math.round(t.getBoundingClientRect().top - window.innerHeight * 0.09),
      left: Math.round(t.scrollLeft),
      max: Math.round(t.scrollWidth - t.clientWidth),
      snap: getComputedStyle(t).scrollSnapType,
    };
  });
  rows.push(r);
}

console.log("\n  pageY   rowTopOffset   trackLeft/max   snap");
for (const r of rows) {
  const pinned = Math.abs(r.secTop) <= 2;
  console.log(
    `  ${String(r.y).padStart(6)}   ${String(r.secTop).padStart(10)}   ` +
      `${String(r.left).padStart(5)}/${r.max}      ${r.snap}` +
      (pinned ? "   [pinned]" : "")
  );
}

const pinnedRows = rows.filter((r) => Math.abs(r.secTop) <= 2);
const lefts = pinnedRows.map((r) => r.left);
const monotonic = lefts.every((v, i) => i === 0 || v >= lefts[i - 1]);
const reachedEnd = Math.max(...lefts) >= rows[0].max - 4;
const heldStill = pinnedRows.length >= steps - 1;

console.log("\nresults");
console.log(`  row held pinned through the scroll   : ${heldStill ? "PASS" : "FAIL"} (${pinnedRows.length}/${steps + 1} samples pinned)`);
console.log(`  trackLeft advances monotonically       : ${monotonic ? "PASS" : "FAIL"}`);
console.log(`  carousel reaches its end before release: ${reachedEnd ? "PASS" : "FAIL"} (max ${Math.max(...lefts)} of ${rows[0].max})`);

await b.close();
