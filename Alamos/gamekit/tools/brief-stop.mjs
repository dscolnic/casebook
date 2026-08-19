// brief-stop.mjs — apply the QUESTION_BRIEF.md rewrite to stops, safely.
//
//   node tools/brief-stop.mjs edits.json [--dry]
//
// `edits.json` is a list of stops and the fields to set on them:
//
//   [{ "book": "books/quantum.yml", "group": "CTRL", "day": 2,
//      "scene": "…",                     // optional; replaces the existing one
//      "guide": "…",                     // the second paragraph
//      "background": ["…", "…"],         // the button's contents
//      "dropPanelWords": true }]         // remove sweep/holdout/tally/probe
//                                        // hint + goals, which a guide replaces
//
// WHY A TOOL AND NOT AN EDITOR
//
// The first stop rewritten by hand was edited with string slicing, and the slice
// cloned seven whole missions of books/quantum.yml — a thousand lines. Every check
// passed: a 22-mission campaign is valid, and bookParity was green because the
// content had been re-imported from the doubled book. It was found by eye three
// edits later.
//
// So this works on a stop's own line range, inserts and deletes named fields only,
// and refuses to write unless the mission list and the stop count are byte-for-byte
// what they were. There are 1,334 stops to do; the sweep cannot afford a mistake
// that is invisible to `npm run check`.
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2];
const DRY = process.argv.includes('--dry');
// `--replace` rewrites a guide that is already there. The default is to leave it
// alone, because most runs are additive and a second pass must not clobber a
// hand-written stop; the exception is a repair pass, where the guide in place is
// the thing being fixed.
const REPLACE = process.argv.includes('--replace');
if(!file){
  console.error('usage: node tools/brief-stop.mjs edits.json [--dry]');
  process.exit(2);
}
const edits = JSON.parse(readFileSync(file, 'utf8'));

/** Fold a paragraph into a YAML block scalar at the given indent. */
function block(key, text, indent){
  const pad = ' '.repeat(indent);
  const body = ' '.repeat(indent + 2);
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let line = '';
  for(const w of words){
    if((line + ' ' + w).trim().length > 78){ lines.push(line.trim()); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if(line) lines.push(line.trim());
  return [`${pad}${key}: >-`, ...lines.map(l => body + l)];
}

/** The same, as one item of a sequence. */
function listBlock(text, indent){
  const pad = ' '.repeat(indent);
  const inner = block('x', text, indent + 2).slice(1);   // reuse the wrapper
  return [`${pad}- >-`, ...inner];
}

const byBook = new Map();
for(const e of edits){
  if(!byBook.has(e.book)) byBook.set(e.book, []);
  byBook.get(e.book).push(e);
}

let touched = 0;
for(const [book, list] of byBook){
  const before = readFileSync(book, 'utf8');
  let lines = before.split('\n');
  const missionsBefore = lines.filter(l => l.startsWith('  - title:')).join('\n');
  const stopsBefore = lines.filter(l => l.trimStart().startsWith('- group:')).length;

  // A stop's day is its position WITHIN ITS GROUP, not the mission's number —
  // `import-book.mjs` numbers each group's lessons independently (`const day =
  // lessons.length + 1`), so Quantum's "VER day 1" is the first VER stop in the
  // book and sits in mission 3. Getting this wrong is how the first run of this
  // tool reported "no stop for VER day 1" on a book that has one.
  const stops = [];
  const seen = new Map();
  lines.forEach((l, i) => {
    if(!l.trimStart().startsWith('- group:')) return;
    const group = l.split('- group:')[1].trim();
    const day = (seen.get(group) ?? 0) + 1;
    seen.set(group, day);
    stops.push({ line: i, group, day });
  });
  const targets = [];
  const skipped = [];
  for(const e of list){
    const hit = stops.find(s => s.group === e.group && s.day === e.day);
    // A drafter that reads a theme's content sees lessons the BOOK does not have:
    // `normalize.js` expands diagnosis packs and adds review variants at load, so
    // `instruments` has seven G4 lessons where the book writes five. That is not a
    // corrupt edit — it is an edit for a stop that is generated — so it is skipped
    // and named, where it used to abort the whole run and leave the books already
    // written in this pass applied and the rest not.
    if(!hit){ skipped.push(`${e.group} day ${e.day} — no such stop in the book (generated at load?)`); continue; }
    const next = stops.find(s => s.line > hit.line);
    const end = next ? next.line
      : lines.findIndex((l, i) => i > hit.line && l.startsWith('  - title:'));
    // Content can lag its book — another session's importer refusal can leave a
    // theme unregenerated for an hour — so a stop already briefed in the book must
    // not be briefed a second time on the strength of stale content.
    const indentAt = lines[hit.line].indexOf('- group:') + 2;
    const already = lines.slice(hit.line, end < 0 ? lines.length : end)
      .some(l => l.startsWith(' '.repeat(indentAt) + 'guide:'));
    // Only the guide and its background are dropped, not the whole edit. Several
    // of these sets also carry a rewritten `scene`, and skipping the edit whole
    // because of the guide would silently discard the scene with it — which is
    // the same shape of loss this guard was added to prevent.
    let edit = e;
    if(already && !REPLACE){
      const { guide, background, ...rest } = e;
      const remains = rest.scene || rest.dropPanelWords || rest.rules || rest.drop;
      skipped.push(`${e.group} day ${e.day} — already carries a guide`
        + (remains ? ', applying the rest of the edit' : ''));
      if(!remains) continue;
      edit = rest;
    }
    targets.push({ e: edit, start: hit.line, end: end < 0 ? lines.length : end });
  }
  if(skipped.length){
    console.log(`  ${book}: ${skipped.length} edit(s) skipped`);
    skipped.slice(0, 6).forEach(s => console.log(`    · ${s}`));
    if(skipped.length > 6) console.log(`    … ${skipped.length - 6} more`);
  }
  if(!targets.length) continue;
  targets.sort((a, b) => b.start - a.start);

  for(const { e, start, end } of targets){
    let body = lines.slice(start, end);
    const indent = body[0].indexOf('- group:') + 2;      // stop fields sit here

    const fieldRange = (key) => {
      const at = body.findIndex(l => l.startsWith(' '.repeat(indent) + key + ':'));
      if(at < 0) return null;
      let to = at + 1;
      while(to < body.length && (body[to].trim() === ''
        || body[to].search(/\S/) > indent)) to++;
      return [at, to];
    };
    const drop = (key) => {
      const r = fieldRange(key);
      if(r) body.splice(r[0], r[1] - r[0]);
    };
    const insertAfter = (key, block) => {
      const r = fieldRange(key);
      const at = r ? r[1] : 1;
      body.splice(at, 0, ...block);
    };

    if(e.scene){ drop('scene'); insertAfter('place', block('scene', e.scene, indent)); }
    if(e.guide){ drop('guide'); insertAfter('scene', block('guide', e.guide, indent)); }
    // `rules` is the tank stops' scoring text, moved off the card and behind a
    // button. It goes after the guide, because the evidence now IS the guide.
    if(e.rules){ drop('rules'); insertAfter('guide', block('rules', e.rules, indent)); }
    if(e.background){
      drop('background');
      insertAfter(e.rules ? 'rules' : 'guide', [' '.repeat(indent) + 'background:',
        ...e.background.flatMap(p => listBlock(p, indent + 2))]);
    }
    // A field the rewrite replaces rather than edits — `evidence` on a tank stop,
    // whose prose has moved up into the guide. Dropped by name so a stop cannot end
    // up carrying the same paragraph in two places.
    for(const key of (e.drop ?? [])) drop(key);
    if(e.dropPanelWords){
      // Inside the format block, two levels in. Both are refused beside a guide.
      for(const key of ['hint', 'goals']){
        const at = body.findIndex(l => l.trimStart().startsWith(key + ':')
          && l.search(/\S/) > indent);
        if(at < 0) continue;
        let to = at + 1;
        const depth = body[at].search(/\S/);
        while(to < body.length && (body[to].trim() === '' || body[to].search(/\S/) > depth)) to++;
        body.splice(at, to - at);
      }
    }
    lines = [...lines.slice(0, start), ...body, ...lines.slice(end)];
    touched++;
  }

  const after = lines.join('\n');
  const missionsAfter = after.split('\n').filter(l => l.startsWith('  - title:')).join('\n');
  const stopsAfter = after.split('\n').filter(l => l.trimStart().startsWith('- group:')).length;
  if(missionsAfter !== missionsBefore){
    console.error(`! ${book}: the mission list changed — refusing to write`);
    process.exit(1);
  }
  if(stopsAfter !== stopsBefore){
    console.error(`! ${book}: stop count went ${stopsBefore} -> ${stopsAfter} — refusing to write`);
    process.exit(1);
  }
  if(DRY){
    console.log(`— ${book}: ${targets.length} stop(s) would change,`
      + ` ${stopsBefore} stops and ${missionsBefore.split('\n').length} missions intact`);
  } else {
    // Another session may be editing the same book — Meridian's stop set moved
    // twice while this sweep was running. A read-modify-write of a whole file
    // cannot merge, so the least it can do is refuse: re-read the bytes and check
    // they are still what this edit was computed from. Silently overwriting
    // somebody's uncommitted stop is the failure this guards.
    if(readFileSync(book, 'utf8') !== before){
      console.error(`! ${book}: changed on disk since this edit was computed`
        + ' — refusing to write. Re-run.');
      process.exit(1);
    }
    writeFileSync(book, after);
    console.log(`✓ ${book}: ${targets.length} stop(s) briefed,`
      + ` ${stopsBefore} stops and ${missionsBefore.split('\n').length} missions intact`);
  }
}
console.log(`${touched} stop(s) ${DRY ? 'checked' : 'written'}`);
