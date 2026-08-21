import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({
  executablePath: CHROME,
  args: ["--autoplay-policy=no-user-gesture-required", "--mute-audio"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "load" });
await page.waitForTimeout(3000);

// Walk the page the way a reader would.
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 500) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(160);
}
await page.waitForTimeout(1000);

const report = await page.evaluate(() => {
  const hidden = [];
  document.querySelectorAll("[data-reveal], [data-lines]").forEach((el) => {
    const cs = getComputedStyle(el);
    const inview = el.getAttribute("data-inview");
    if (parseFloat(cs.opacity) < 0.9 || inview !== "true") {
      hidden.push({
        sec: el.closest("section")?.className?.toString().slice(0, 22) || "?",
        cls: (el.className || "").toString().slice(0, 30) || el.tagName,
        opacity: cs.opacity,
        inview,
      });
    }
  });
  // Clipped image frames still closed?
  const clipped = [];
  document.querySelectorAll(".reveal-img").forEach((el) => {
    const cp = getComputedStyle(el).clipPath;
    if (cp && cp !== "none" && !/inset\(0(px)?( 0(px)?){0,3}\)/.test(cp))
      clipped.push({
        sec: el.closest("section")?.className?.toString().slice(0, 22) || "?",
        cls: (el.className || "").toString().slice(0, 34),
        clipPath: cp,
      });
  });
  // Where do fabric/story children actually sit?
  const geo = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) };
  };
  return {
    totalReveal: document.querySelectorAll("[data-reveal],[data-lines]").length,
    stillHidden: hidden.length,
    hiddenSample: hidden.slice(0, 14),
    stillClipped: clipped.length,
    clippedSample: clipped.slice(0, 8),
    geo: {
      fabric: geo(".fabric"),
      fabricPin: geo(".fabric__pin"),
      fabricTrack: geo(".fabric__track"),
      fabricCard: geo(".fabric__card"),
      story: geo(".story"),
      storyLayout: geo(".story__layout"),
      storyCopy: geo(".story__copy"),
    },
  };
});

console.log(JSON.stringify(report, null, 1));
await browser.close();
