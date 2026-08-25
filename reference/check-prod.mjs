import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.argv[2] || "https://sarom-red.vercel.app";
const browser = await chromium.launch({ executablePath: CHROME, args: ["--mute-audio"] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
const bad = [];
page.on("response", (r) => { if (r.status() >= 400 && !/fonts\/|films\//.test(r.url())) bad.push(`${r.status()} ${r.url()}`); });

await page.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(2500);
const H = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < H; y += 450) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(70); }

const order = await page.evaluate(() =>
  [...document.querySelectorAll(".shead__index")].map((e) => e.textContent.trim())
);
console.log("section order:", JSON.stringify(order));
console.log("brands lead:", /House Brands/i.test(order[0] || ""));

const marks = await page.evaluate(() =>
  [...document.querySelectorAll(".house__cell")].map((c) => {
    const g = c.querySelector(".house__logo--grey");
    const col = c.querySelector(".house__logo--colour");
    const r = g.getBoundingClientRect();
    return {
      name: c.getAttribute("aria-label")?.replace(" by Sarom", ""),
      size: `${Math.round(r.width)}x${Math.round(r.height)}`,
      greyOk: g.naturalWidth > 0,
      colourOk: col.naturalWidth > 0,
    };
  })
);
console.log("\nbrand marks:");
marks.forEach((m) => console.log(`  ${String(m.name).padEnd(13)} ${m.size.padEnd(9)} grey=${m.greyOk} colour=${m.colourOk}`));
console.log("  all load:", marks.every((m) => m.greyOk && m.colourOk));

// catalogue thumbnails must be links, per tab
await page.evaluate(() => {
  const s = document.querySelector(".belong__nav");
  window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - 120);
});
await page.waitForTimeout(1200);
const tabs = await page.$$eval(".belong__nav button", (e) => e.map((b) => b.textContent.trim()));
const links = new Set();
console.log("\ncatalogue thumbnails:");
for (const t of tabs) {
  await page.evaluate((l) => {
    [...document.querySelectorAll(".belong__nav button")].find((b) => b.textContent.trim() === l).click();
  }, t);
  await page.waitForTimeout(700);
  const hrefs = await page.$$eval(".belong__thumb", (els) => els.map((e) => ({ tag: e.tagName, href: e.getAttribute("href") })));
  hrefs.forEach((h) => h.href && links.add(h.href));
  console.log(`  ${t.padEnd(11)} allAreLinks=${hrefs.every((h) => h.tag === "A" && h.href)}`);
}
let ok = 0;
for (const h of links) {
  const r = await page.request.get(h);
  if (r.status() === 200 && (await r.body()).subarray(0, 5).toString() === "%PDF-") ok++;
  else console.log("  BAD", r.status(), h);
}
console.log(`  ${ok}/${links.size} links serve a real PDF`);
console.log("\nHTTP errors:", bad.length ? bad.slice(0, 4) : "none");
await browser.close();
