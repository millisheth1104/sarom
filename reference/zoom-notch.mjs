/**
 * Magnify the .studio notches so the concave fillets can actually be judged.
 * These are ~10-15px details; a full-section shot hides whether the arc is
 * smooth or a blocky step.
 */
import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const p = await (
  await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 })
).newPage();
await p.goto("http://localhost:3000", { waitUntil: "load" });
await p.waitForTimeout(3200);

const sect = await p.$(".studio");
await sect.scrollIntoViewIfNeeded();
await p.waitForTimeout(1000);

const shots = [
  [".studio__notch", "_z-build-cardnotch", 46],
  [".studio__featurecopy", "_z-build-featurecopy", 40],
  [".studio__vtag", "_z-build-vtag", 40],
];

for (const [sel, name, pad] of shots) {
  const box = await p.evaluate(
    ([s, pd]) => {
      const r = document.querySelector(s).getBoundingClientRect();
      return {
        x: Math.max(0, Math.round(r.left - pd)),
        y: Math.max(0, Math.round(r.top - pd)),
        width: Math.round(r.width + pd * 2),
        height: Math.round(r.height + pd * 2),
      };
    },
    [sel, pad]
  );
  await p.screenshot({ path: `reference/shots/${name}.png`, clip: box });
  console.log(`${name}: ${box.width}x${box.height} @3x`);
}

// Confirm the fillets actually render (non-zero, correct gradient, in flow)
const probe = await p.evaluate(() => {
  const read = (sel, pseudo) => {
    const cs = getComputedStyle(document.querySelector(sel), pseudo);
    return {
      w: cs.width,
      h: cs.height,
      bg: cs.backgroundImage.includes("farthest-side") ? "farthest-side ✓" : cs.backgroundImage.slice(0, 60),
    };
  };
  const vars = getComputedStyle(document.querySelector(".studio"));
  return {
    notchR: vars.getPropertyValue("--notch-r").trim(),
    fillet: vars.getPropertyValue("--fillet").trim(),
    notchBefore: read(".studio__notch", "::before"),
    notchAfter: read(".studio__notch", "::after"),
    copyBefore: read(".studio__featurecopy", "::before"),
    vtagAfter: read(".studio__vtag", "::after"),
  };
});
console.log(JSON.stringify(probe, null, 1));

await b.close();
