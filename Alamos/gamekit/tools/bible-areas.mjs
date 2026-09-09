// bible-areas.mjs — a campaign's areas, from the bible, onto its book head.
//
//   node tools/bible-areas.mjs <theme>            report
//   node tools/bible-areas.mjs <theme> --write    rewrite books/parts/<theme>/_book.yml
//
// `build-head.mjs` takes the theme block, the roster and the GROUPS from a BASE
// game, because a campaign re-authored on somebody else's place inherits the
// place. The areas are not the place. Ice Core drills in DATA/CORE/COLD/GAS/
// DRILL/FIELD and Whiteout runs software in OPS/CODE/POWER/HAB/VEH/COMMS on the
// same plateau; Project Y computes in T/CM/E/P/X and Boomtown advises a town
// council in the same five compounds. Left alone, a new campaign's stops are
// placed in areas that describe the old one — Boomtown's civic advice office
// came through as "Theory & Calculations: neutron physics, decay, reaction
// rates", led by Bethe.
//
// So: every area the bible declares, with the name the bible gives it and the
// person the bible puts in it. Written here rather than in `build-head` because
// a bible declares its areas in two different places depending on the hand —
// `## OPS — Operations Module` headings, or an Area column in the fixture table
// — and both are read below.
//
// WHAT IS NOT THE BIBLE'S. `color`, `difficulty`, `budget` and the four
// milestone names are the game's own furniture: a progress label and a palette,
// not curriculum. They are carried from the base's group of the same id where
// there is one, so a place that already had a colour keeps it.
//
// This replaces tools/whiteout-head.mjs, which was this file for one campaign.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { readBible } from './bibleRead.mjs';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const theme = args.find(a => !a.startsWith('--'));
const write = args.includes('--write');
if(!theme){
  console.error('usage: node tools/bible-areas.mjs <theme> [--write]');
  process.exit(2);
}

const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));
const path = BIBLES[theme];
if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); process.exit(2); }
const file = resolve(gamekit, path);
const bible = readBible(file);
// SECTION 3 AND NOWHERE ELSE. Every table in the document has a first column,
// and read whole the bible offered thirteen "areas" for Boomtown — its five,
// plus an M column from the metrics table and every format name from the
// encounter matrix. The areas section is where areas are declared.
const all = bible.lines;
const startAt = all.findIndex(l => /^#\s*3\.\s/.test(l.trim()));
const endAt = all.findIndex((l, i) => i > startAt && /^#\s*4\.\s/.test(l.trim()));
const lines = startAt < 0 ? all : all.slice(startAt, endAt < 0 ? all.length : endAt);

/**
 * The areas, in the order the bible declares them.
 *
 * Two hands. A heading — `## CLINIC — Field Clinic`, `## BANK — The Bank` — with
 * the owner in the sentence under it. Or a fixture table with an Area column and
 * a Place column, which names the same two things a row at a time.
 */
const areas = new Map();
const add = (id, name) => {
  if(!/^[A-Z][A-Z0-9_]{0,11}$/.test(id)) return;
  if(!areas.has(id)) areas.set(id, { id, name: name || id, owner: '', desc: '' });
  else if(name && areas.get(id).name === id) areas.get(id).name = name;
};

let at = null;
for(const raw of lines){
  const l = raw.trim();
  const head = /^#{2,3}\s+([A-Z][A-Z0-9_]{0,11})\s+[-–—]\s+(.+)$/.exec(l);
  if(head){ add(head[1], head[2].trim()); at = head[1]; continue; }
  if(/^#{1,3}\s/.test(l)) at = null;
  // `**Area owner:** Mara Vale, veterinary biologist.` or Overwind's sentence
  // form, `canonical named owner Ruth Bell, cage operator`.
  if(at){
    const owner = /(?:\*\*Area owner:?\*\*|canonical named owner)\s*([^,.;]+)/i.exec(l);
    if(owner && !areas.get(at).owner) areas.get(at).owner = owner[1].trim();
    // The first plain sentence under the heading is what the area is for.
    if(!areas.get(at).desc && l && !l.startsWith('|') && !l.startsWith('**') && !l.startsWith('#')){
      areas.get(at).desc = l.replace(/\s+/g, ' ').trim();
    }
  }
  // The table hand: | T | Civic Advice Office | Budget Desk | … |
  // …and a table's own HEADER is not an area. `| ID | Fixture | Build | … |`
  // put an area called ID on every campaign whose fixture tables are keyed by
  // id, which is most of them.
  const row = /^\|\s*([A-Z][A-Z0-9_]{0,11})\s*\|\s*([^|]+?)\s*\|/.exec(l);
  const HEADER = /^(ID|AREA|PLACE|ROOM|FIXTURE|BUILD|WALL|KIND|TYPE|NAME|CAPTION)$/;
  if(row && !/^-+$/.test(row[2]) && !HEADER.test(row[1])) add(row[1], row[2]);
}

const list = [...areas.values()];
if(!list.length){ console.error(`${theme}: the bible declares no areas`); process.exit(1); }

// The base's furniture, by id, so a place keeps the colour it already had.
const headPath = resolve(gamekit, `books/parts/${theme}/_book.yml`);
const src = readFileSync(headPath, 'utf8');
const from = src.indexOf('\ngroups:');
const to = src.indexOf('\nroster:');
if(from < 0 || to < from){ console.error(`${theme}: the head has no groups: … roster: to replace`); process.exit(1); }
const was = src.slice(from, to);
const furniture = new Map();
for(const block of was.split(/\n(?=\s*-\s+id:)/)){
  const id = (block.match(/id:\s*([A-Za-z0-9_]+)/) ?? [])[1];
  if(!id) continue;
  furniture.set(id, {
    color: (block.match(/color:\s*"?([#\w]+)"?/) ?? [])[1],
    difficulty: (block.match(/difficulty:\s*(\d+)/) ?? [])[1],
    budget: (block.match(/budget:\s*(\d+)/) ?? [])[1],
    type: (block.match(/type:\s*(\w+)/) ?? [])[1],
  });
}
const PALETTE = ['#2f6f9f', '#7a5aa8', '#c2704a', '#3f8d6e', '#8a7a3f', '#4f6f8f', '#a05070', '#5f8f5f'];
// Generic on purpose: a milestone is a progress label, not copy.
const STEPS = ['Open the room', 'Read what it holds', 'Settle the question', 'Hand it on'];

// Whom the bible puts in each area, by roster id, so `defaultLeader` is a person
// this campaign actually has.
const idOf = (name) => String(name ?? '').trim().split(/\s+/).pop().toLowerCase().replace(/[^a-z]/g, '');
const rosterIds = new Set((src.match(/^- id: ([a-z0-9_]+)$/gm) ?? []).map(l => l.split(': ')[1]));

const out = ['groups:'];
list.forEach((a, i) => {
  const f = furniture.get(a.id) ?? {};
  const lead = idOf(a.owner);
  out.push(`  - id: ${a.id}`, `    code: ${a.id}`, `    name: ${a.name}`,
    `    color: "${f.color ?? PALETTE[i % PALETTE.length]}"`,
    `    difficulty: ${f.difficulty ?? 2 + (i % 3)}`,
    `    type: ${f.type ?? 'protocol'}`);
  if(a.desc) out.push(`    desc: ${JSON.stringify(a.desc.slice(0, 200))}`);
  if(lead && rosterIds.has(lead)) out.push(`    defaultLeader: ${lead}`);
  out.push(`    budget: ${f.budget ?? 70}`, '    milestones:');
  STEPS.forEach((m, n) => out.push(`      - name: ${m}`, `        cost: ${12 + n * 4}`,
    `        work: ${9 + n * 3}`, `        brief: ${m}`));
});

console.log(`${theme.padEnd(16)} ${list.length} area(s) from the bible: `
  + list.map(a => `${a.id}${a.owner ? ` (${idOf(a.owner)})` : ''}`).join(', '));
const dropped = [...furniture.keys()].filter(id => !areas.has(id));
if(dropped.length) console.log(`  the base's own areas, dropped: ${dropped.join(', ')}`);
if(!write){ console.log('  (dry run — pass --write)'); process.exit(0); }
/**
 * AND WHAT IS INSIDE EACH ROOM, for the same reason the areas themselves are
 * here: the base book's `interiors:` and `copy:` are keyed to the BASE game's
 * areas, so a campaign on somebody else's ground inherits a set of rooms whose
 * ids its stops never name. Wildtype's six rooms came through as Dark Fibre's
 * TERM/TEST/SPLICE/AMP/RECV/RAD — a cable landing station's drums and OTDR
 * panels, in a biology campaign, keyed so that `delivery.where` pointed at a
 * room with nowhere to stand.
 *
 * The caption is the bible's own sentence for the area. The stand line is the
 * first thing the bible says is in the room, which is its first fixture's
 * caption. Neither is composed here.
 */
const roomLines = ['interiors:'];
const copyLines = ['copy:'];
for(const a of list){
  const mine = bible.fixtures.filter(f => String(f.place ?? '').toUpperCase() === a.id);
  const said = a.desc || `${a.name}.`;
  roomLines.push(`  ${a.id}:`, `    caption: ${JSON.stringify(said.slice(0, 180))}`);
  if(mine[0]?.caption) roomLines.push(`    standLine: ${JSON.stringify(mine[0].caption)}`);
  copyLines.push(`  ${a.id}: ${JSON.stringify(`<p>${said}</p>`)}`);
}

let text = src.slice(0, from) + '\n' + out.join('\n') + src.slice(to);
// Each block replaced where it stands, or appended when the base had none.
for(const [key, block] of [['interiors', roomLines], ['copy', copyLines]]){
  const re = new RegExp(`\\n${key}:\\n(?:(?: {2}|\\t).*\\n|\\n)*`);
  const body = '\n' + block.join('\n') + '\n';
  text = re.test(text) ? text.replace(re, body) : text.trimEnd() + '\n' + body;
}
writeFileSync(headPath, text);
console.log(`  written to books/parts/${theme}/_book.yml`
  + ` — ${list.length} area(s), ${list.length} room(s)`);
