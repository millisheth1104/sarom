/**
 * Screenshot harness for review.
 *
 * Drives the real Chrome install (no Chromium download) against the dev server
 * and captures both section-by-section frames and a full-page composite at
 * desktop and mobile widths.
 *
 *   node reference/shoot.mjs
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000";
const OUT = "reference/shots";

const SECTIONS = [
  [".hero", "01-hero"],
  [".statement", "02-statement"],
  [".studio", "03-studio"],
  [".product", "04-product"],
  [".edit3", "05-in-the-room"],
  [".objects", "06-our-story"],
  [".house", "07-house-brands"],
  [".letter", "08-cta"],
  [".foot", "09-footer"],
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ["--autoplay-policy=no-user-gesture-required", "--mute-audio"],
});

async function shoot(label, width, height, deviceScaleFactor) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
  });
  const page = await ctx.newPage();

  page.on("console", (m) => {
    if (m.type() === "error" && !/fonts\//.test(m.text())) {
      console.log(`  [console error] ${m.text().slice(0, 110)}`);
    }
  });

  await page.goto(URL, { waitUntil: "load", timeout: 60_000 });

  // Let the preloader clear and the hero video produce a frame.
  await page.waitForTimeout(3200);

  // Walk the page so every reveal fires and every lazy image loads.
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += Math.round(height * 0.6)) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(230);
  }
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);

  // Per-section frames, each scrolled to sit naturally in frame.
  for (const [sel, name] of SECTIONS) {
    const el = await page.$(sel);
    if (!el) {
      console.log(`  missing ${sel}`);
      continue;
    }
    await page.evaluate((s) => {
      const n = document.querySelector(s);
      const top = n.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, Math.max(0, Math.round(top)));
    }, sel);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${label}-${name}.png` });
  }

  // Full-page composite.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${label}-FULLPAGE.png`, fullPage: true });

  const dims = await page.evaluate(() => ({
    w: document.body.getBoundingClientRect().width,
    h: document.body.scrollHeight,
    hScroll: (() => {
      const b = window.scrollX;
      window.scrollTo(300, 0);
      const a = window.scrollX;
      window.scrollTo(0, 0);
      return a !== b;
    })(),
  }));
  console.log(`${label}: body ${Math.round(dims.w)}px · page ${dims.h}px · hScroll=${dims.hScroll}`);

  await ctx.close();
}

console.log("shooting desktop 1440…");
await shoot("desktop", 1440, 900, 1);
console.log("shooting mobile 390…");
await shoot("mobile", 390, 844, 2);

await browser.close();
console.log("done →", OUT);
