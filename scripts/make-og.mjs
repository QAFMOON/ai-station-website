// Builds the share images (public/og-en.png, public/og-ar.png) and the PNG app icons (public/icon-512.png,
// src/app/apple-icon.png) from the site's own copy and brand,
// so link previews never fall out of step with the site. Run after changing the hero title or lead:
//   npm run og
// Needs Node 22.6+ (reads the .ts copy files directly) and a Chromium browser for the screenshot.
// Arabic is rendered by the browser, which shapes it correctly (Next's built-in image generator cannot).
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const { en } = await import(pathToFileURL(join(root, "src/i18n/en.ts")).href);
const { ar } = await import(pathToFileURL(join(root, "src/i18n/ar.ts")).href);

const BROWSERS = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = BROWSERS.find((p) => existsSync(p));
if (!browser) throw new Error("No Chromium browser found. Set CHROME_PATH to one.");

// The brand mark: the same 9×9 dot field as src/components/Logo.tsx.
const ROWS = ["......###", ".....####", "....##.##", ".#######.", "#######..", "...###...", ".#..##...", "###.##...", "##..#...."];
const mark = ROWS.flatMap((row, y) => [...row].map((c, x) => (c === "#" ? `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.32"/>` : ""))).join("");

const font = (pkg, file) => pathToFileURL(join(root, "node_modules", pkg, "files", file)).href;
const css = `
@font-face { font-family: Manrope; src: url(${font("@fontsource-variable/manrope", "manrope-latin-wght-normal.woff2")}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: Almarai; src: url(${font("@fontsource/almarai", "almarai-arabic-800-normal.woff2")}) format("woff2"); font-weight: 800; }
@font-face { font-family: Almarai; src: url(${font("@fontsource/almarai", "almarai-arabic-400-normal.woff2")}) format("woff2"); font-weight: 400; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body {
  display: flex; flex-direction: column; justify-content: space-between; padding: 72px 80px;
  background: #000; color: #fafafa; font-family: Manrope, Almarai, sans-serif;
  background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);
  background-size: 60px 60px; background-position: -1px -1px;
}
.brand { display: flex; align-items: center; gap: 18px; font-size: 40px; font-weight: 800; letter-spacing: -0.02em; font-family: Manrope, sans-serif; }
.brand svg { width: 56px; height: 56px; fill: #fafafa; }
h1 { font-size: 66px; line-height: 1.08; font-weight: 800; letter-spacing: -0.035em; max-width: 1000px; }
p { margin-top: 26px; font-size: 28px; line-height: 1.4; color: #a3a3a3; max-width: 940px; }
[dir=rtl] body, [dir=rtl] h1, [dir=rtl] p { font-family: Almarai, Manrope, sans-serif; letter-spacing: 0; }
[dir=rtl] h1 { font-size: 60px; line-height: 1.3; }
`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
for (const [locale, t] of [["en", en], ["ar", ar]]) {
  const html = `<!doctype html><html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8"><style>${css}</style></head>
<body>
  <div class="brand" dir="ltr"><svg viewBox="0 0 9 9">${mark}</svg>AIStationX</div>
  <div><h1>${t.hero.title}</h1><p>${t.hero.lead}</p></div>
</body></html>`;
  const page = join(dir, `${locale}.html`);
  writeFileSync(page, html);
  const out = join(root, "public", `og-${locale}.png`);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1200,630", `--screenshot=${out}`, pathToFileURL(page).href], { stdio: "ignore" });
  console.log("wrote", out);
}

// App icons: the dot mark, white on black (iOS and Android round the corners themselves).
for (const [size, out] of [[512, join(root, "public", "icon-512.png")], [180, join(root, "src", "app", "apple-icon.png")]]) {
  const page = join(dir, `icon-${size}.html`);
  writeFileSync(
    page,
    `<!doctype html><html><head><style>*{margin:0}html,body{width:${size}px;height:${size}px;overflow:hidden;background:#000}svg{display:block;width:${size}px;height:${size}px}</style></head>
<body><svg viewBox="-1.6 -1.6 12.2 12.2" fill="#fff">${mark}</svg></body></html>`,
  );
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=${size},${size}`, `--screenshot=${out}`, pathToFileURL(page).href], { stdio: "ignore" });
  console.log("wrote", out);
}
