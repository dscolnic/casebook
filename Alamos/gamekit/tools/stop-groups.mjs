// stop-groups.mjs — which curriculum area owns each stop.
//
//   node tools/stop-groups.mjs <bible.md> <theme> <fragments dir> [--patch]
//
// THE BIBLE ANSWERS THIS, MOSTLY, AND THE FIRST VERSION OF THIS DID NOT ASK IT.
//
// `group:` is the curriculum area a lesson belongs to, and `at:` is the fixture
// it is asked at. They are genuinely different fields — Red Sand asks a KINET
// question at the Atmosphere Intake because that is where the compressors are —
// so the first pass here derived the group from the stop's keystone and ignored
// where the bible put it. That was wrong on sixteen of sixty: for a stop asked
// at a fixture that stands INSIDE a curriculum area, the bible has already said
// which area, and deriving it from anything else is inventing over the source.
//
// So, in order:
//
//   1. The fixture's own place, when that place is a curriculum area. 36 stops.
//      The bible said it; nothing else gets a vote.
//   2. The keystone, for a stop asked at a MINOR place — the Atmosphere Intake,
//      the Ice Cut, the Tank Farm — which is a room with a door and not an area
//      of study. 21 stops. There is nothing else to go on: the place is not an
//      area, so the subject has to say.
//   3. The keystone, for a person stop with no fixture at all. 3 stops.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readBible } from './bibleRead.mjs';

const args = process.argv.slice(2);
const [file, theme, dir] = args.filter(a => !a.startsWith('--'));
const patch = args.includes('--patch');
if(!file || !theme || !dir){
  console.error('usage: node tools/stop-groups.mjs <bible.md> <theme> <fragments dir> [--patch]');
  process.exit(2);
}

const T = (await import(pathToFileURL(resolve(`themes/${theme}/theme.js`)).href)).default;
const areas = new Set((T.content?.GROUPS ?? []).map(g => g.id));
const owner = new Map();
for(const [place, list] of Object.entries(T.fixtures ?? {})) for(const f of list) owner.set(f.id, place);

// NO KEYSTONE FALLBACK. There used to be one here, and it was a table of Red
// Sand's own chemistry mapped onto Red Sand's own area ids — with 'GIBBS' as its
// default. Run against seven other campaigns it answered GIBBS for 266 stops in
// themes that have no GIBBS at all, and the wrongness was invisible because a
// group id is just a string until the importer refuses it.
//
// So where neither the bible's `Area:` nor the fixture's place can answer, the
// stop is left TODO and counted. A campaign that needs a human to place forty
// stops should say so, not quietly file them all under whichever area happened
// to be first.

const bible = readBible(file);
const stops = new Map();
for(const m of bible.missions) for(const s of m.stops) stops.set(s.n, s);

// The `at:` each fragment already carries — resolved from the bible by stop-map.
const at = new Map();
const files = readdirSync(dir).filter(f => /^m\d+\.ya?ml$/i.test(f))
  .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));
for(const f of files){
  let n = null;
  for(const l of readFileSync(resolve(dir, f), 'utf8').split('\n')){
    const h = l.match(/^  # --- Stop (\d+):/); if(h){ n = +h[1]; continue; }
    const a = l.match(/^    at: ([\w-]+)/); if(a && n){ at.set(n, a[1]); n = null; }
  }
}

// The bible's own `Area:` first, when it names one of this theme's areas.
//
// TWO BIBLES READ "AREA OF STUDY" TWO WAYS, and both are defensible. Mars names
// places — Plant Control, Reactor Hall — which are exactly this engine's areas.
// Safety Factor names subjects — Motion and Measurement, Work and Energy — which
// are a parallel taxonomy the engine has no bucket for; its areas are the rides.
// So a declared Area is used when it resolves to an area this theme has, and
// otherwise the fixture's own place answers, which for Safety Factor is the ride
// the question is asked at. The subject is not lost: it is the keystone.
// EVERY ROOM, NOT ONLY THE AREAS. Nine areas across five campaigns resolved to
// nothing while the room was standing there unmarked — Carrying's Chapel Council
// Room is `CHAPEL`, Eleven Days' Emergency Management Office is `TOWN`, Safety
// Factor's Brennan's workshop is `WORKSHOP`. They are rooms the world already
// builds that no curriculum was ever hung on. Matching against them turns "ten
// places to construct" into "nine rooms to promote", which is a `groups:` entry
// in the book and no geometry at all.
const areaName = new Map();
const promote = new Map();          // room id -> its name, where it is not yet an area
for(const g of T.content?.GROUPS ?? []){
  areaName.set(g.id.toLowerCase(), g.id);
  areaName.set(String(g.name ?? '').toLowerCase(), g.id);
}
const isArea = new Set((T.content?.GROUPS ?? []).map(g => g.id));
// INDEX THE NAME EVEN WHEN THE ID IS ALREADY AN AREA. A group and the building
// it stands in can be called different things — Eleven Days' `OPS` group is
// "Operations" and its building is "Coordination Office", which is the name the
// bible uses. Skipping a building because its id was already a group threw away
// the only name that would have matched, and sent me looking for two rooms to
// build that were standing in the world under the exact names asked for.
// `promote` still only collects the ones that are not areas yet.
for(const b of T.site?.buildings ?? []){
  if(!areaName.has(b.id.toLowerCase())) areaName.set(b.id.toLowerCase(), b.id);
  if(b.name && !areaName.has(String(b.name).toLowerCase())) areaName.set(String(b.name).toLowerCase(), b.id);
  if(!isArea.has(b.id)) promote.set(b.id, b.name ?? b.id);
}
// AN INTERIOR PLAN HANGS OFF `site`, not the manifest root, and it lists its
// rooms both flat and under each level. Reading `theme.plan` found nothing for
// three campaigns whose rooms were all sitting in `theme.site.plan.rooms`.
const plan = T.site?.plan ?? T.plan ?? {};
const planRooms = [...(plan.rooms ?? []), ...(plan.levels ?? plan.plates ?? plan.floors ?? []).flatMap(l => l.rooms ?? [])];
for(const r of planRooms){
  if(!r?.id) continue;
  const owner = r.group ?? r.id;
  if(!areaName.has(r.id.toLowerCase())) areaName.set(r.id.toLowerCase(), owner);
  if(r.name && !areaName.has(String(r.name).toLowerCase())) areaName.set(String(r.name).toLowerCase(), owner);
  if(!isArea.has(r.id) && !r.group) promote.set(r.id, r.name ?? r.id);
}
// THE SAME AREA, WORDED DIFFERENTLY. A bible revised to name places calls them
// what its own prose calls them — "Storage & Level Board" where the theme has
// "Storage & Level", "Powerhouse" where it has "Power & Demand". Those are the
// same room. Exact match first, then containment, then the significant words in
// common, which is what carries Gate House to Spillway & Gates. Anything with
// nothing in common is reported rather than guessed.
const FILLER = new Set(['the', 'and', 'of', 'room', 'office', 'desk', 'board', 'bay',
  'house', 'yard', 'station', 'area', 'control', 'centre', 'center']);
// STEMMED, because "bank" and "banks" are the same room and "Gate House" is the
// gates. Matching whole words alone left ten areas unresolved across five
// campaigns and sent me looking for rooms to build that were already there.
// Strip the plural `s` and nothing else. Stripping `es` turned `gates` into
// `gat` while `gate` stayed `gate`, so a room literally named Gate House did
// not match the Gates area — the stemmer created the mismatch it was added to
// remove. `ss` is left alone so `press` does not become `pres`.
const stemOf = (w) => w.replace(/ies$/, 'y').replace(/([^s])s$/, '$1');
const sig = (x) => new Set((String(x).toLowerCase().match(/[a-z]{3,}/g) ?? [])
  .filter(w => !FILLER.has(w)).map(stemOf));
const byArea = (a) => {
  const k = String(a ?? '').toLowerCase().trim();
  if(!k) return null;
  if(areaName.has(k)) return areaName.get(k);
  for(const [name, id] of areaName) if(name.length > 3 && (k.includes(name) || name.includes(k))) return id;
  const want = sig(k);
  let best = null, bestScore = 0;
  for(const [name, id] of areaName){
    if(name.length <= 3) continue;
    const score = [...sig(name)].filter(w => want.has(w)).length;
    if(score > bestScore){ bestScore = score; best = id; }
  }
  return bestScore ? best : null;
};

const decided = new Map();
const why = { area: 0, place: 0, unknown: 0 };
const unmatched = new Set();
for(const [n, s] of stops){
  const declaredArea = byArea(s.area);
  const place = owner.get(at.get(n));
  if(declaredArea){ decided.set(n, declaredArea); why.area++; }
  else if(place && areas.has(place)){ decided.set(n, place); why.place++; }
  else { decided.set(n, null); why.unknown++; unmatched.add(s.area || '(no Area)'); }
}

if(patch){
  let filled = 0;
  for(const f of files){
    const p = resolve(dir, f);
    const lines = readFileSync(p, 'utf8').split('\n');
    let n = null;
    for(let i = 0; i < lines.length; i++){
      const h = lines[i].match(/^  # --- Stop (\d+):/); if(h){ n = +h[1]; continue; }
      const g = lines[i].match(/^  - group: (\w+|TODO)/);
      if(g && n){
        const v = decided.get(n);
        if(v){ lines[i] = `  - group: ${v}`; filled++; }
        n = null;
      }
    }
    writeFileSync(p, lines.join('\n'));
  }
  console.log(`set ${filled} group(s).`);
}

const tally = new Map();
for(const g of decided.values()) tally.set(g, (tally.get(g) ?? 0) + 1);
console.log(`from the bible's own Area: ${why.area}   from the fixture's place: ${why.place}   `
  + `left TODO, nothing says: ${why.unknown}`);
const promoted = [...new Set([...decided.values()].filter(g => g && promote.has(g)))];
if(promoted.length)
  console.log(`rooms to promote to areas (a groups: entry each, no geometry): `
    + promoted.map(id => `${id} (${promote.get(id)})`).join(', '));
if(unmatched.size) console.log(`no area in themes/${theme} matches: ${[...unmatched].join(' | ')}`);
console.log('areas:', [...tally].sort((a, b) => b[1] - a[1]).map(([g, c]) => `${g} ${c}`).join('  '));
