// payload-prompt.mjs — what each campaign's bible still owes, per stop, in the
// importer's own words.
//
//   node tools/payload-prompt.mjs <theme> [--out <dir>]
//
// The addendum prompt says what every format needs in general. This says what
// THIS campaign's stops are actually missing, which is the half an author can act
// on without reading a spec: the mission, the stop, its format, and the sentences
// the importer refused it with. Nothing here is written by hand — a held-back
// stop that gets fixed leaves this file by itself the next time it is run, which
// is the only way a list like this stays true.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const theme = args.find(a => !a.startsWith('--'));
const outAt = args.indexOf('--out');
const outDir = outAt >= 0 ? args[outAt + 1] : null;
if(!theme){ console.error('usage: node tools/payload-prompt.mjs <theme> [--out <dir>]'); process.exit(2); }

let raw = '';
try {
  raw = execFileSync('node', ['tools/import-book.mjs', `books/${theme}.yml`, theme, '--verify'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
} catch (e) { raw = `${e.stdout ?? ''}${e.stderr ?? ''}`; }

// The format each stop was authored as, read off the fragments — the importer's
// message names the stop but not what it was trying to build.
const formatOf = new Map();
const titleOf = new Map();
const dir = resolve('books/parts', theme);
for(const f of readdirSync(dir).filter(x => /^m\d+\.ya?ml$/i.test(x))){
  const m = +f.match(/\d+/)[0];
  let n = 0;
  for(const line of readFileSync(resolve(dir, f), 'utf8').split('\n')){
    if(/^  - (group|at|person):/.test(line)) n++;
    const g = line.match(/^    format:\s*"?(\w+)/);
    if(g && n) formatOf.set(`${m}|${n}`, g[1].toUpperCase());
    const t = line.match(/^    title: "(.*)"/);
    if(t && n) titleOf.set(`${m}|${n}`, t[1]);
  }
}

// Group the refusals by the stop they land on. `concept:` and roster lines are
// answered by their own prompts and are deliberately not repeated here.
const stops = new Map();
const other = [];
for(const line of raw.split('\n')){
  if(!line.includes('✗')) continue;
  const msg = line.replace(/^\s*✗\s*/, '').trim();
  if(/syllabus|not on the roster|unknown group|beatRooms/.test(msg)) continue;
  const at = msg.match(/^mission (\d+) \("([^"]*)"\) stop (\d+): (.*)$/);
  if(!at){ other.push(msg); continue; }
  const [, m, title, n, why] = at;
  const key = `${+m}|${+n}`;
  // The importer prints the MISSION's title; the stop's own is in the fragment,
  // and two stops of one mission are otherwise indistinguishable in this list.
  if(!stops.has(key)) stops.set(key, { m: +m, n: +n, mission: title,
    title: titleOf.get(key) ?? `stop ${+n}`, whys: [] });
  stops.get(key).whys.push(why);
}

const rows = [...stops.values()].sort((a, b) => a.m - b.m || a.n - b.n);
const byFormat = new Map();
for(const r of rows){
  const fmt = formatOf.get(`${r.m}|${r.n}`) ?? 'unknown';
  if(!byFormat.has(fmt)) byFormat.set(fmt, []);
  byFormat.get(fmt).push(r);
}

const out = [];
out.push(`# ${theme}: the stops that cannot be built yet`);
out.push('');
out.push(`**${rows.length} of the campaign's stops are held back.** Every one names a`);
out.push('format the game has, and the science in each is right — what is missing is a');
out.push('number or a line the board is physically made of. Below is each stop and what');
out.push('the build refused it with, grouped by format so one decision fixes many.');
out.push('');
out.push('Nothing here asks you to change the story, the science, or which format a stop');
out.push('uses. Where a board genuinely cannot carry what is asked — three quantities that');
out.push('all have to be predicted, an order that really does branch — **split it into two');
out.push('stops** and say so, rather than thinning the science to fit.');
out.push('');
for(const [fmt, list] of [...byFormat.entries()].sort((a, b) => b[1].length - a[1].length)){
  out.push(`## ${fmt} — ${list.length} stop${list.length === 1 ? '' : 's'}`);
  out.push('');
  for(const r of list){
    out.push(`**M${r.m} S${r.n} — ${r.title}** *(${r.mission})*`);
    out.push('');
    for(const w of r.whys) out.push(`- ${w}`);
    out.push('');
  }
}
if(other.length){
  out.push('## Not tied to one stop');
  out.push('');
  for(const w of [...new Set(other)]) out.push(`- ${w}`);
  out.push('');
}
out.push('## What to hand back');
out.push('');
out.push('The same bible, with the missing numbers and lines added to these stops in your');
out.push('own field names. The build converts the shape; it may not invent a value.');

const text = out.join('\n') + '\n';
if(outDir){
  mkdirSync(outDir, { recursive: true });
  const f = resolve(outDir, `${theme}_PAYLOADS.md`);
  writeFileSync(f, text);
  console.error(`${theme}: ${rows.length} held-back stop(s), ${byFormat.size} format(s) — ${f}`);
} else process.stdout.write(text);
