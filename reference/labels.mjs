import { chromium } from "playwright-core";

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3000", { waitUntil: "load" });
await p.waitForTimeout(2500);

const labels = await p.evaluate(() =>
  [...document.querySelectorAll(".shead__index")].map((n) => n.textContent.trim())
);
console.log(labels.join("\n"));

const dupes = labels
  .map((l) => l.split(" ")[0])
  .filter((n, i, a) => a.indexOf(n) !== i);
console.log(dupes.length ? `\nDUPLICATE NUMBERS: ${dupes.join(", ")}` : "\nno duplicate numbers");

await b.close();
