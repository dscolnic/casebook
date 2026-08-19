// lessonGallery.mjs — two real stops of every format, harvested out of the games.
//
//   node engine/dev/lessonGallery.mjs            # write engine/dev/lessons.json
//   node engine/dev/lessonGallery.mjs --report   # and say which format came from where
//
// `engine/dev/lessons.html` reads the file this writes: every answer format the
// engine renders, **twice** — its best stop, and the best stop from a different
// campaign — each taken from the game that authored it, drawn with the game's own
// renderer and graded by the game's own grading.
//
// WHY TWO. One card cannot separate the format from the book. A SEQUENCE ordered
// by time and a SEQUENCE ordered by cost are the same renderer asking different
// questions, and until the second card is beside the first nobody can tell which
// half of what they are looking at is the engine and which half is that game's
// authoring. The pair also prices the format honestly: a panel that reads well in
// the game it was designed around and badly in the next one is a panel with a
// hidden dependency on its book.
//
// WHY IT IS A FILE AND NOT A FETCH
//
// The page is served by vite with one theme aliased to `@theme`, so it can reach
// exactly one game's content at runtime. The gallery is about all of them. This
// runs the same way every checker does — import the manifest, normalise it the
// way engine/core/theme.js does on the way in — and writes what it found.
//
// WHAT "REAL" MEANS HERE
//
// Every field comes off the authored lesson: the scene, what it takes as read,
// the equations, the estimate's numbers, the person asking and their glossary.
// Nothing is written for the page. A format with no authored instance anywhere is
// reported missing rather than invented, because a hand-written example would
// make the gallery a picture of itself.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir, editionBase } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const OUT = resolve(here, 'lessons.json');

const { normalizeContent } = await import('../content/normalize.js');
// The registry of live panels, so a format built and never authored is reported
// rather than silently absent. Importing it is the point: a list written out here
// is a list that misses the twentieth.
const { INSTRUMENTS } = await import('../core/instruments.js');

/** The engine's own canonicalisation — questionUI kindOf, house rule 12. */
const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');

// The formats questionUI renders itself, in the order its dispatch tries them.
const CLASSIC = ['SEQUENCE', 'PROTOCOL', 'BALLPARK', 'TRIAGE', 'DIAGNOSIS', 'CASEBOOK',
                 'CHOICE', 'SCIENCETANK', 'SWEEP', 'HOLDOUT', 'TALLY', 'PROBE'];
const ALL_FORMATS = [...CLASSIC, ...Object.keys(INSTRUMENTS)];

/**
 * How good an example a stop makes, and nothing about how good the stop is.
 *
 * The gallery shows two cards per format and this ranks them, so the first is the
 * one that exercises the most of the renderer: a rebuttal per wrong option, a figure,
 * what it takes as read, a real teaching block. The theme terms come first —
 * `instruments` is the seven-day book written to author one stop of each format,
 * so it has an instance of everything and is nobody's game; an edition is the
 * same stop written for a younger reader, and the senior original is the one to
 * show unless it is the only one there is.
 */
function score(theme, isEdition, lesson, ch){
  let n = 0;
  if(theme !== 'instruments') n += 60;
  if(!isEdition) n += 25;
  if(Array.isArray(ch.rebuttals) && ch.rebuttals.length) n += 6;
  if(ch.figure ?? lesson.figure) n += 6;
  if((lesson.assumes ?? []).length) n += 4;
  if(String(lesson.takeaway ?? '').length > 30) n += 4;
  if(String(ch.why ?? '').length > 80) n += 3;
  if((lesson.equations ?? []).length) n += 2;
  return n;
}

const args = process.argv.slice(2);
const themes = [];
const extra = [];                // every stop seen, for --include and for the pair
const problems = [];

for(const name of themeNames()){
  const dir = themeDir(name);
  let mod;
  try{
    mod = await import(pathToFileURL(resolve(dir, 'theme.js')).href);
  }catch(e){
    problems.push(`${name}: cannot load theme.js — ${e.message}`);
    continue;
  }
  const T = mod.default ?? mod;
  const content = T.content ?? {};
  // Same normalisation the engine applies before any core module reads a lesson.
  // Without it the gallery would show the raw book — a format spelled three ways,
  // a diagnosis pack still unexpanded — which is not what the game renders.
  normalizeContent(content);
  const isEdition = !!editionBase(name);
  const roster = content.ROSTER ?? [];
  const groups = content.GROUPS ?? [];
  const calcs = content.BALLPARK_CALCS ?? {};
  themes.push({ id: name, title: T.title ?? name, subtitle: T.subtitle ?? '',
                grade: T.audience?.grade ?? null, edition: editionBase(name) ?? null,
                glossary: content.JARGON ?? [] });

  for(const [groupId, lessons] of Object.entries(content.CURRICULUM ?? {})){
    const group = groups.find(g => g.id === groupId) ?? { id: groupId };
    const askerId = group.defaultLeader;
    const asker = roster.find(r => r.id === askerId)
      ?? roster.find(r => r.division === groupId)
      ?? { id: groupId, name: group.name ?? groupId, role: '' };
    (lessons ?? []).forEach((lesson, i) => {
      const ch = lesson.game;
      if(!ch) return;
      const format = kindOf(ch);
      if(!ALL_FORMATS.includes(format)) return;
      const calc = calcs[`${groupId}-${lesson.day}`] ?? null;
      // An estimate with no numeric spec renders the engine's "not yet converted"
      // notice, which is a true thing about that stop and a useless gallery card.
      if(format === 'BALLPARK' && !calc) return;
      // SCIENCETANK is dispatched on `proposals`, not on its name.
      if(format === 'SCIENCETANK' && !Array.isArray(ch.proposals)) return;
      const s = score(name, isEdition, lesson, ch);
      const row = {
        format,
        theme: name,
        group: { id: groupId, name: group.name ?? groupId, color: group.color ?? null },
        asker: { id: asker.id, name: asker.name, role: asker.role ?? '', color: asker.color ?? group.color ?? null },
        day: lesson.day ?? null,
        lessonIndex: i,
        lesson,
        calc,
        family: editionBase(name) ?? name,
        seed: [...`${name}-${groupId}-${lesson.day}`].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7) & 0xffff,
      };
      row.score = s;
      extra.push(row);
    });
  }
}

// --------------------------------------------------------------- two per format
//
// One example says what a format looks like; the second says what is the *format*
// and what was that game's authoring. A SEQUENCE ordered by time and a SEQUENCE
// ordered by cost are the same renderer and a different question, and with one
// card each nobody could see that. So every format shows its best stop and the
// best stop from a **different campaign** — different theme, because two stops of
// one book share their voice, their glossary and usually their axis.
//
// Where no other game authors the format, the second is the best remaining stop
// wherever it lives; where there is no second stop at all, the format shows one,
// which is the honest answer and not a hand-written example.
const byFormat = new Map();
for(const row of extra){
  if(!byFormat.has(row.format)) byFormat.set(row.format, []);
  byFormat.get(row.format).push(row);
}
for(const rows of byFormat.values()) rows.sort((a, b) => b.score - a.score
  || `${a.theme}:${a.group.id}:${a.day}`.localeCompare(`${b.theme}:${b.group.id}:${b.day}`));

const best = new Map();          // format -> best stop
const stops = [];
for(const f of ALL_FORMATS){
  const rows = byFormat.get(f) ?? [];
  if(!rows.length) continue;
  const first = rows[0];
  best.set(f, first);
  first.pair = 1;
  stops.push(first);
  // A grade-6 edition is a different theme id and the same book: its ROUTE is the
  // senior ROUTE with shorter sentences, so showing the pair would be showing one
  // card twice. The family — the base theme, or the theme itself — is what has to
  // differ; a same-family second is taken only when nothing else authors it.
  const rest = rows.slice(1);
  const second = rest.find(r => r.family !== first.family)
    ?? rest.find(r => r.theme !== first.theme) ?? rest[0];
  if(second){
    second.pair = 2;
    second.sameTheme = second.theme === first.theme;
    second.sameFamily = second.family === first.family;
    stops.push(second);
  }
}

// ------------------------------------------------------------------ --include
//
// One stop per format is the right gallery and the wrong review tool. The sweep in
// QUESTION_BRIEF.md rewrites stops that are not their format's exemplar — the
// second SWEEP in a game, a PROBE in a game whose PROBE was not chosen — and the
// only way anybody could look at one was to play to that day of that campaign.
//
//   node engine/dev/lessonGallery.mjs --include quantum:CRYO:1,headwater:POWER:3
//
// Named stops are appended, keeping whatever the formats chose, so a review pass
// and the format tour can share one page.
const INCLUDE = (args.find(a => a.startsWith('--include=')) ?? '').slice('--include='.length)
  || (args.includes('--include') ? args[args.indexOf('--include') + 1] : '');
for(const spec of INCLUDE.split(',').map(s => s.trim()).filter(Boolean)){
  const [themeName, group, day] = spec.split(':');
  const found = extra.find(r => r.theme === themeName && r.group.id === group
    && String(r.day) === String(day));
  if(!found){ console.log(`! --include ${spec}: no such stop`); continue; }
  if(!stops.some(s => s.theme === found.theme && s.group.id === found.group.id
    && s.day === found.day)) stops.push(found);
}
const missing = ALL_FORMATS.filter(f => !best.has(f));
const lonely = ALL_FORMATS.filter(f => best.has(f) && (byFormat.get(f) ?? []).length < 2);
const inbred = ALL_FORMATS.filter(f => stops.some(s2 => s2.format === f && s2.sameFamily));
// Only the glossaries the chosen stops actually need: the full set is eighteen
// games of vocabulary, and the page reads one card at a time.
const used = new Set(stops.map(s => s.theme));

for(const row of stops) delete row.score;

writeFileSync(OUT, JSON.stringify({
  stops,
  missing,
  lonely,
  inbred,
  themes: themes.filter(t => used.has(t.id)),
}, null, 1) + '\n');

const rel = 'engine/dev/lessons.json';
const paired = ALL_FORMATS.length - missing.length;
const named = stops.length - paired - stops.filter(s2 => s2.pair === 2).length;
console.log(`${paired} of ${ALL_FORMATS.length} formats have an authored stop,`
  + ` ${stops.filter(s2 => s2.pair === 2).length} of them a second from another campaign`
  + `${named ? `, plus ${named} named with --include` : ''} → ${rel}`);
if(missing.length) console.log(`no authored instance anywhere: ${missing.join(', ')}`);
if(lonely.length) console.log(`only one authored stop anywhere, so shown alone: ${lonely.join(', ')}`);
if(inbred.length) console.log(`no other campaign authors it, so both cards are one book's:`
  + ` ${inbred.join(', ')}`);
for(const p of problems) console.log(`! ${p}`);
if(process.argv.includes('--report')){
  const w = Math.max(...stops.map(s => s.format.length));
  for(const s of stops){
    const mark = s.pair === 2 ? (s.sameFamily ? '  ↳ same game ' : '  ↳ ') : '  ';
    console.log(`${mark.padEnd(4)}${(s.pair === 2 ? '' : s.format).padEnd(w)}  ${s.theme.padEnd(20)} ${s.group.id}`
      + ` day ${String(s.day).padStart(2)}  ${s.lesson.title ?? ''}`);
  }
}
