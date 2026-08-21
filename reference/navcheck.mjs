import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({ executablePath: CHROME, args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "load" });
await page.waitForTimeout(3000);

const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const sections = await page.evaluate(() =>
  [...document.querySelectorAll("[data-nav-tone]")].map((z) => ({
    tone: z.dataset.navTone,
    top: Math.round(z.getBoundingClientRect().top + window.scrollY),
    cls: (z.className || "").toString().slice(0, 24) || z.tagName,
  }))
);

console.log("scroll → nav tone / bar bg / link colour / contrast");
for (const s of sections) {
  // Land a little inside the zone so we're not sampling a boundary.
  const y = s.top + 120;
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(1100); // let the 0.55s tone transition settle

  const st = await page.evaluate(() => {
    const nav = document.querySelector(".nav");
    const link = nav.querySelector(".nav__link");
    const cs = getComputedStyle(nav);
    const px = (s) => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
    return {
      tone: nav.dataset.tone,
      pinned: nav.dataset.pinned,
      hidden: nav.dataset.hidden,
      bg: cs.backgroundColor,
      bgRGB: px(cs.backgroundColor),
      linkColor: px(getComputedStyle(link).color),
      logoLight: getComputedStyle(document.querySelector(".logo--light")).display,
      logoDark: getComputedStyle(document.querySelector(".logo--dark")).display,
    };
  });

  // Effective bar colour: composite the translucent bar over the section ground.
  const alpha = parseFloat((st.bg.match(/[\d.]+\)$/) || ["1"])[0]) || 1;
  const ground = s.tone === "dark" ? [20, 17, 15] : [245, 240, 232];
  const eff = st.bgRGB.map((c, i) => c * alpha + ground[i] * (1 - alpha));
  const a = lum(st.linkColor) + 0.05, b = lum(eff) + 0.05;
  const ratio = (Math.max(a, b) / Math.min(a, b)).toFixed(2);

  const flag = ratio < 4.5 ? "  <-- FAIL" : "";
  console.log(
    `${String(y).padStart(6)} ${s.cls.padEnd(24)} tone=${String(st.tone).padEnd(5)} pinned=${String(st.pinned).padEnd(5)} ` +
    `bar=[${eff.map((v) => Math.round(v)).join(",")}] link=[${st.linkColor.join(",")}] ratio=${ratio}` +
    ` logo=${st.logoLight === "block" ? "light" : "dark"}${flag}`
  );
}

await browser.close();
