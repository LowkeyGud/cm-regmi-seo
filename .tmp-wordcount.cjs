const fs = require("fs");
const path = require("path");

function strip(s) {
  s = s.replace(/\/\*[\s\S]*?\*\//g, ""); // block comments
  s = s.replace(/<!--[\s\S]*?-->/g, ""); // html comments
  s = s.replace(/`[\s\S]*?`/g, " "); // template literals (code blocks)
  s = s.replace(/\{[\s\S]*?\}/g, " "); // JSX expression containers
  s = s.replace(/<[^>]*>/g, " "); // tags
  return s;
}
function words(f) {
  const raw = fs.readFileSync(f, "utf8");
  return strip(raw).split(/\s+/).filter(Boolean).length;
}

const docsDir = path.join(process.cwd(), "src/app/docs");
const entries = fs.readdirSync(docsDir, { withFileTypes: true });
const rows = [];
for (const e of entries) {
  if (!e.isDirectory()) continue;
  const p = path.join(docsDir, e.name, "page.tsx");
  if (!fs.existsSync(p)) continue;
  const w = words(p);
  rows.push({ name: e.name, w });
}
rows.sort((a, b) => a.w - b.w);
for (const r of rows) {
  console.log(String(r.w).padStart(5) + "  docs/" + r.name);
}
const total = rows.reduce((s, r) => s + r.w, 0);
console.log("----");
console.log("total pages: " + rows.length + "  total words: " + total);
console.log("thin (<2000): " + rows.filter(r => r.w < 2000).length);
