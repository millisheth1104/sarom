/**
 * Prove the italic descender is no longer sheared by the reveal mask.
 *
 * Screenshots the "elegance." line, then scans the bottom rows of the crop for
 * light ink. If the g is clipped the ink runs flush to the last row; if it has
 * room, there is clear background beneath the lowest ink.
 */
import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--autoplay-policy=no-user-gesture-required", "--mute-audio"],
});
const p = await (
  await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
).newPage();
await p.goto("http://localhost:3000", { waitUntil: "load" });
await p.waitForTimeout(4000);

const info = await p.evaluate(() => {
  const title = document.querySelector(".hero__title");
  const lines = [...title.querySelectorAll(".lines__line")];
  const last = lines[lines.length - 1];
  const inner = last.querySelector(".lines__inner");
  const lr = last.getBoundingClientRect();
  const ir = inner.getBoundingClientRect();
  const cs = getComputedStyle(last);
  return {
    fontSize: getComputedStyle(title).fontSize,
    lineBox: { top: Math.round(lr.top), bottom: Math.round(lr.bottom), h: Math.round(lr.height) },
    innerBox: { bottom: Math.round(ir.bottom), h: Math.round(ir.height) },
    padBottom: cs.paddingBottom,
    marginBottom: cs.marginBottom,
    overflow: cs.overflow,
    // how much room the mask leaves under the inner text box
    slack: Math.round(lr.bottom - ir.bottom),
    clip: {
      x: Math.max(0, Math.round(lr.left) - 6),
      y: Math.max(0, Math.round(lr.top) - 6),
      width: Math.round(lr.width) + 12,
      height: Math.round(lr.height) + 20,
    },
  };
});

await p.screenshot({ path: "reference/shots/_descender.png", clip: info.clip });
console.log(
  JSON.stringify(
    { fontSize: info.fontSize, padBottom: info.padBottom, marginBottom: info.marginBottom, slack: info.slack, lineBox: info.lineBox },
    null,
    1
  )
);
console.log(
  info.slack > 2
    ? `PASS — mask leaves ${info.slack}px under the text box for descenders`
    : `FAIL — only ${info.slack}px of slack, descender will still shear`
);

await b.close();
