// Rebuilds ../ballpark.html by inlining the data packs in ballpark_build/.
// The packs are the source of truth; the HTML is a generated artifact.
// Usage: node ballpark_build/build_ballpark.js
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const HTML = path.join(DIR, "..", "ballpark.html");

function findArray(html, decl) {
  const i = html.indexOf(decl);
  if (i < 0) throw new Error("could not find " + decl);
  const a = html.indexOf("[", i);
  let d = 0, q = false, e = false, end = -1;
  for (let k = a; k < html.length; k++) {
    const c = html[k];
    if (q) { if (e) e = false; else if (c === "\\") e = true; else if (c === '"') q = false; }
    else { if (c === '"') q = true; else if (c === "[") d++; else if (c === "]") { d--; if (!d) { end = k + 1; break; } } }
  }
  return { start: a, end };
}

function build() {
  const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.json"), "utf8"));
  const games = manifest.map((id) => require(path.join(DIR, "pack_" + id + ".js")).PACK);
  const json = JSON.stringify(games).replace(/<\//g, "<\\/");
  let html = fs.readFileSync(HTML, "utf8");
  const { start, end } = findArray(html, "const GAMES=");
  html = html.slice(0, start) + json + html.slice(end);
  fs.writeFileSync(HTML, html);
  console.log("built ballpark.html from " + games.length + " packs");
  return games.length;
}

if (require.main === module) build();
module.exports = { build };
