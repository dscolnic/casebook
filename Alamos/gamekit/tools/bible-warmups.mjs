// bible-warmups.mjs — put the shipped cast into the warm-up runs.
//
//   node tools/bible-warmups.mjs <theme> [--dry]
//   node tools/bible-warmups.mjs --all [--dry]
//
// THE RUNS CAME ACROSS FROM THE SHIPPED EDITION AND THEIR PEOPLE CAME WITH THEM.
// Two of the eight campaigns have warm-up runs, and both blocks were lifted whole
// from the game they were built on — so the player is told to find, follow and
// catch twelve people who are not in this campaign at all. Nothing checked it,
// because a warm-up's copy is prose and prose names whoever it names.
//
// THE BIBLE SETTLES IT, and settles it as an instruction rather than as text:
//
//   "All six warm-up run variants must use only this shipped cast: Nkemdi Okafor
//    at Waterworks, Iona Vale at the Common, Rafi Noor at the Reef, Mei Chen at
//    the Tip … Remove every legacy-cast reference from each find/follow/catch
//    line."
//
// So this is a substitution the bible directs, not a rewrite. A legacy name is
// replaced by the person the bible puts in the place that run is about, and the
// job title beside it by that person's own role — which is also the bible's,
// through the roster. The sentences are otherwise untouched.
//
// ONE WAY TO FIND THE RIGHT PERSON, AND A REFUSAL FOR EVERYTHING ELSE. The
// bible's own "X at PLACE" list, when the run names one of those places. That is
// all.
//
// A SECOND RULE WAS TRIED AND THROWN AWAY, and it is worth saying why. Matching
// the legacy job title against the roster's roles on a shared word looked
// reasonable and produced confident nonsense: Carrying's water engineer came
// out as the Island Resources Officer, and Changeover's market trader — who is
// deliberately an outsider from Vend Street, which is the whole point of that
// run — came out as the price statistics lead. A name in the wrong mouth reads
// as true, which makes it worse than a name the campaign has never heard of.
// So an unresolved run is reported for the bible to settle.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readBible } from './bibleRead.mjs';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));

/** Words that name half the jobs on any site, so they cannot pick one out. */
const NOISE = new Set(['the', 'and', 'lead', 'officer', 'chief', 'head', 'manager', 'operations',
  'supervisor', 'director', 'assistant', 'senior', 'deputy', 'who', 'runs', 'manages', 'for',
  'a', 'an', 'of']);

/** The bible's "X at PLACE" list, as [{ name, place }]. */
export function readWarmupCast(text){
  const at = /^#{2,4} Warm-up run cast replacement[^\n]*$/m.exec(text);
  if(!at) return { pairs: [], names: [], said: '' };
  const said = text.slice(at.index + at[0].length).split(/\n\s*\n/).map(x => x.trim())
    .find(x => x && !x.startsWith('#')) ?? '';
  const pairs = [...said.matchAll(/([A-Z][\p{L}'-]+(?:\s+[A-Z][\p{L}'-]+)+)\s+at\s+(?:the\s+)?([A-Z][\p{L}' -]*?)(?=[,.;]|\s+and\b|$)/gu)]
    .map(m => ({ name: m[1].trim(), place: m[2].trim() }));
  const names = [...said.matchAll(/\b([A-Z][\p{L}'-]+\s+[A-Z][\p{L}'-]+)\b/gu)].map(m => m[1]);
  return { pairs, names: [...new Set(names)], said };
}

const words = (s) => String(s ?? '').toLowerCase().match(/[a-z]{3,}/g) ?? [];

const args = process.argv.slice(2);
const RUN = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const dry = args.includes('--dry');
const themes = args.includes('--all')
  ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--'));
if(RUN && !themes.length){
  console.error('usage: node tools/bible-warmups.mjs <theme>|--all [--dry]');
  process.exit(2);
}

let bad = 0;
for(const theme of (RUN ? themes : [])){
  const path = BIBLES[theme];
  if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); bad++; continue; }
  const bible = readBible(resolve(gamekit, path));
  const text = readFileSync(resolve(gamekit, path), 'utf8');
  const { pairs, names } = readWarmupCast(text);

  const head = resolve(gamekit, `books/parts/${theme}/_book.yml`);
  let src = readFileSync(head, 'utf8');
  const from = src.search(/^warmups:$/m);
  if(from < 0){ console.log(`${theme.padEnd(22)} no warm-up runs`); continue; }
  if(!pairs.length && !names.length){
    console.log(`${theme.padEnd(22)} has warm-up runs and its bible names no replacement cast`);
    continue;
  }
  const rest = src.slice(from + 'warmups:'.length);
  const to = from + 'warmups:'.length + (rest.search(/\n[a-z][A-Za-z]*:/) + 1 || rest.length);
  let block = src.slice(from, to);

  const cast = bible.cast;
  const byName = (n) => cast.find(c => c.name.toLowerCase() === String(n).toLowerCase())
    ?? cast.find(c => words(n).some(w => words(c.name).includes(w)));

  // Every capitalised full-or-single name in the block that the roster does not
  // carry. A single surname counts: `Calloway, the harbourmaster` is a person.
  const known = new Set(cast.flatMap(c => words(c.name)));
  const legacy = new Map();
  for(const m of block.matchAll(/\b([A-Z][a-z]+)(?:\s+([A-Z][a-z]+))?,\s*(?:the|a|an|who)\b([^.;]*)/g)){
    const full = m[2] ? `${m[1]} ${m[2]}` : m[1];
    if(words(full).some(w => known.has(w))) continue;
    if(!legacy.has(full)) legacy.set(full, m[3]);
  }

  // THE RUNS, SLICED FIRST. Each is `  <name>:` and everything under it, and a
  // name has to be resolved inside its own run: walking back from a name to the
  // nearest preceding line got the boundary wrong, and a place named in the run
  // above was read as if it were in this one — which put the agronomy lead in
  // the fisheries observer's paragraph, confidently.
  const runs = [];
  for(const m of block.matchAll(/^ {2}([a-z-]+):$/gm)){
    if(runs.length) runs[runs.length - 1].to = m.index;
    runs.push({ name: m[1], from: m.index, to: block.length });
  }

  const done = [], owed = [];
  for(const r of runs){
    let run = block.slice(r.from, r.to);
    const here = [...legacy.keys()].filter(n => run.includes(n));
    for(const name of here){
      const title = legacy.get(name);
      const hit = pairs.filter(p => new RegExp(`\\b${p.place.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(run));
      const who = hit.length === 1 ? byName(hit[0].name) : null;
      if(!who){
        const said = String(title).replace(/\s+/g, ' ').trim().split(/[,.;]/)[0].slice(0, 46);
        owed.push(`${r.name}: ${name}, "${said}" — the bible's list names no place this run mentions`);
        continue;
      }
      const how = `the bible puts ${hit[0].name} at the ${hit[0].place}`;
      const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      run = run.replace(new RegExp(`\\b${esc(name)}\\b`, 'g'), who.name);
      const surname = name.split(/\s+/).pop();
      if(surname.length > 2) run = run.replace(new RegExp(`\\b${esc(surname)}\\b`, 'g'), who.name.split(/\s+/).pop());
      const role = String(who.role).replace(/^[A-Z][A-Z0-9_]+\s+/, '');
      run = run.replace(new RegExp(`(${esc(who.name)},\\s*)the [^,.;]+`, 'g'),
        `$1the ${role.charAt(0).toLowerCase()}${role.slice(1)}`);

      /**
       * AND THE PRONOUNS, because a name is not the only thing that changes.
       * Carrying's stocking count is followed for a paragraph — "he does not
       * stop walking to explain it. Stay with him" — and the person now doing
       * the walking uses she/her. A substitution that leaves the pronouns
       * behind misgenders somebody in the game's own copy, in the one run that
       * tells the player to follow them around.
       *
       * Refused where two people share a run: there is no way to tell whose
       * "her" is whose, and guessing puts it on the wrong person.
       */
      const p = String(who.pronouns ?? '').toLowerCase();
      const set = /she/.test(p) ? { he: 'she', him: 'her', his: 'her', himself: 'herself' }
        : /^he\b/.test(p) ? { she: 'he', her: 'him', hers: 'his', herself: 'himself' }
        : /they/.test(p) ? { he: 'they', she: 'they', him: 'them', her: 'them', his: 'their', himself: 'themselves', herself: 'themselves' }
        : null;
      if(set && here.length === 1){
        run = run.replace(/\b(he|him|his|she|her|hers|himself|herself)\b/gi, (w) => {
          const to = set[w.toLowerCase()];
          if(!to) return w;
          return /^[A-Z]/.test(w) ? to.charAt(0).toUpperCase() + to.slice(1) : to;
        });
      } else if(set && here.length > 1){
        owed.push(`${r.name}: ${who.name} shares the run with ${here.filter(x => x !== name).join(', ')},`
          + ' so the pronouns are left as they are — which "her" is whose is not this tool\'s to decide');
      }
      done.push(`${r.name}: ${name} -> ${who.name} (${how})`);
    }
    block = block.slice(0, r.from) + run + block.slice(r.to);
    const shift = run.length - (r.to - r.from);
    for(const o of runs) { if(o.from > r.from){ o.from += shift; o.to += shift; } }
    r.to += shift;
  }

  console.log(`${theme.padEnd(22)} ${done.length} replaced, ${owed.length} the bible does not settle`);
  for(const d of done) console.log(`  · ${d}`);
  for(const o of owed) console.error(`  ✗ ${o}`);
  if(owed.length) bad++;
  if(!dry) writeFileSync(head, src.slice(0, from) + block + src.slice(to));
}
process.exitCode = bad ? 1 : 0;
