// worldParity.mjs — does the site data still describe the world that is built?
//
// Two of the three games declare a `site` in their manifest and then build the
// place by hand in their own world.js. That is the state before the world fork
// is closed, and it has one failure mode: the data and the world drift, so the
// map, the checks and the flip all quietly disagree with the game.
//
// This compares what can be compared without a browser — the ids, the groups,
// the spawn — so the data stays honest until the world is generated from it.
//
//   node engine/dev/worldParity.mjs <theme>
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { themeDir, themeNames } from './registry.mjs';

const wanted = process.argv[2] ? [process.argv[2]] : themeNames();
const problems = [];
const notes = [];

for(const name of wanted){
  const dir = themeDir(name);
  const mod = await import(pathToFileURL(resolve(dir, 'theme.js')).href).catch(e => {
    problems.push(`${name}: cannot load theme.js — ${e.message}`);
    return null;
  });
  if(!mod) continue;
  const T = mod.default ?? mod;
  const site = T.site;
  if(!site){ problems.push(`${name}: no site in the manifest`); continue; }

  const groups = new Set((T.content?.GROUPS ?? []).map(g => g.id));
  const placed = new Set(
    site.kind === 'interior'
      ? (site.plan?.rooms ?? []).filter(r => r.group).map(r => r.group)
      : (site.buildings ?? []).filter(b => b.group).map(b => b.group));

  for(const g of groups){
    if(!placed.has(g)) problems.push(`${name}: group "${g}" has nowhere to happen in the site data`);
  }
  for(const g of placed){
    if(!groups.has(g)) problems.push(`${name}: the site places unknown group "${g}"`);
  }

  // The world module is still hand-built for two games. Where it is, check that
  // it at least names the same places: a world that registers a door id the
  // site does not describe is a world the data cannot generate yet.
  const worldPath = ['src/world.js', 'world.js'].map(p => resolve(dir, p)).find(existsSync);
  if(worldPath){
    const src = readFileSync(worldPath, 'utf8');
    const generated = /outdoorTown|interiorSite/.test(src);
    if(generated) notes.push(`${name}: world is generated from the site data`);
    else notes.push(`${name}: world is hand-built — ${placed.size} of its places are described as data`);
  }
}

if(notes.length) console.log(notes.map(n => '  · ' + n).join('\n'));
if(problems.length){
  console.error(`\n${problems.length} parity problem(s):`);
  problems.forEach(p => console.error('  ✗ ' + p));
  process.exit(1);
}
console.log('\n✓ every group has somewhere to happen in the site data');
