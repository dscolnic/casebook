// placeStory.mjs — does the landscape match the story being told on it?
//
//   node engine/dev/placeStory.mjs <theme>
//
// The complaint this exists for: "for Blackout, it's about a city blacking out,
// but the area is surrounded by mountains." Both halves of that were true and
// neither was visible to any check. The campaign named a city on nearly every
// card and the place had no city; the place had a ring of hills on every bearing
// and the campaign never mentioned a mountain once. Seven of the eight games had
// some version of it, because every site.js inherited the scaffold's two
// concentric ranks and nobody changed their shape.
//
// So this compares two things that are written down independently — what the
// campaign talks about, and what the site and props actually build — and reports
// the disagreements in both directions:
//
//   MISSING   the story leans on a feature the place does not have
//   UNCLAIMED the place is dominated by a feature the story never mentions
//
// It is deliberately a small vocabulary of *landscape* features rather than an
// attempt to read the place. A checker that guessed would be argued with; one
// that asks "the cards say `river` eleven times, is there water in the site
// data?" is either right or obviously wrong.
//
// What it cannot see: whether the thing built is any good, whether it is in the
// right direction, or whether it is visible from anywhere the player stands.
// Screenshot for that — this only catches the case where the place and the story
// are about different worlds.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { themeDir as resolveTheme, placeDir } from './registry.mjs';

const themeName = process.argv[2];
if(!themeName){
  console.error('usage: node engine/dev/placeStory.mjs <theme>');
  process.exit(2);
}
const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content);

/** Everything the campaign says out loud, once. */
const storyText = (() => {
  const parts = [];
  for(const line of theme.opening ?? []) parts.push(line);
  for(const line of theme.ending ?? []) parts.push(line);
  for(const m of content.MISSIONS ?? []){
    parts.push(m.title, m.objective, m.briefing, m.stake, m.takeaway);
  }
  for(const group of Object.values(content.CURRICULUM ?? {})){
    for(const l of Object.values(group ?? {})){
      parts.push(l.title, l.scene, l.story, l.place, l.takeaway, l.game?.why, l.game?.question);
    }
  }
  return ' ' + parts.filter(Boolean).map(String).join('  ')
    .replace(/<[^>]+>/g, ' ').toLowerCase().replace(/\s+/g, ' ') + ' ';
})();

/** Everything the place is built from: the site data and the props source. */
const site = theme.site ?? {};
const placeSource = (() => {
  const files = ['site.js', 'props.js', 'interiors.js'];
  let out = '';
  // An edition's own directory holds a re-export and nothing else — the place
  // is the base theme's, and reading this directory would report a game whose
  // landscape is empty because it is somebody else's.
  const from = placeDir(themeName);
  for(const f of files){
    const p = resolve(from, f);
    if(existsSync(p)) out += '\n' + readFileSync(p, 'utf8');
  }
  return out.toLowerCase();
})();

const says = (word) => {
  const w = word.toLowerCase();
  const e = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (storyText.match(new RegExp(`(^|[^a-z0-9])${e}`, 'g')) ?? []).length;
};
const built = (...needles) => needles.some(n => placeSource.includes(n.toLowerCase()));

/**
 * The features worth checking. Each is a landscape-scale thing a story can lean
 * on, with the words that mean it and the evidence that it exists.
 *
 * `floor` is how many mentions across a whole campaign count as leaning on it.
 * Two is deliberately low: a place named twice in fifteen days is still a place
 * the player will look for and not find.
 */
const FEATURES = [
  { id: 'a city',        words: ['city', 'downtown', 'skyline', 'suburb'],
    evidence: () => built('skyline(', 'city') },
  { id: 'a town',        words: ['town', 'village', 'neighbourhood', 'neighborhood', 'household'],
    evidence: () => built('town', 'rooftop', 'houses', 'village') },
  { id: 'a river or open water', words: ['river', 'estuary', 'harbour', 'harbor', 'reservoir', 'lake'],
    evidence: () => !!site.water || built('water:', 'setwaterbed', 'channel', 'riverbank') },
  // No 'range' and no 'peak'. Both are ordinary technical words in these
  // courses — sonar range, a peak value, the normal range — and they turned a
  // submarine and a mission control room into places that owed somebody a
  // mountain.
  { id: 'mountains or a ridge', words: ['mountain', 'ridge', 'summit', 'foothill', 'hillside'],
    evidence: () => (site.horizon ?? []).some(r => (r.height ?? 0) >= 40) || built('ridge', 'mountain') },
  { id: 'a valley',      words: ['valley', 'basin', 'canyon', 'gorge'],
    evidence: () => built('valley', 'canyon', 'opening(', 'rim') },
  // `checkpoint` was in this list and is not a boundary word. Ice Core reached
  // ice too thin to count annual layers and needed "other checkpoints that can
  // still anchor the timeline" — a dated marker, three times, in a game with no
  // fence and no reason to have one. The rest are unambiguous; a word that is
  // also ordinary scientific vocabulary makes this checker ask for scenery the
  // story never mentioned. `barrier` is out for the same reason — an air–blood
  // barrier and a particulate barrier are both in these books already.
  { id: 'a fence or boundary', words: ['fence', 'cordon', 'perimeter', 'gatehouse', 'guard post'],
    evidence: () => built('fencerun', 'fence') },
  { id: 'a road out',    words: ['road', 'highway', 'convoy', 'truck route'],
    evidence: () => (site.paths ?? []).length > 0 || built('road') },
  { id: 'farmland or open country', words: ['farm', 'field station', 'pasture', 'crop'],
    evidence: () => built('farm', 'scrub', 'meadow', 'field') },
];

// An interior game has no landscape to disagree with. Deep Watch is a
// submarine and Mission Control is one room; asking either of them for a
// horizon is asking the wrong question, and the words that triggered it were
// sonar range and a peak value.
const outdoors = (site.kind ?? 'outdoor') === 'outdoor' && (site.terrain || site.horizon);
if(!outdoors){
  console.log(`\n✓ theme "${themeName}": interior — no landscape to match`);
  process.exit(0);
}

const missing = [], unclaimed = [], ok = [];
for(const f of FEATURES){
  const mentions = f.words.reduce((n, w) => n + says(w), 0);
  const there = !!f.evidence();
  if(mentions >= 2 && !there) missing.push(`${f.id}: the campaign names it ${mentions}× and the place has none`);
  else if(mentions >= 2 && there) ok.push(`${f.id} (${mentions}×)`);
  else if(mentions === 0 && there && f.id === 'mountains or a ridge'){
    // The one that runs the other way, and the reason this file exists. A ring
    // of hills is the scaffold's default, so a place can be surrounded by
    // mountains nobody wrote a word about.
    unclaimed.push(`${f.id}: the horizon builds them and the campaign never mentions one`);
  }
}

// A horizon that is the same in every direction says nothing about where
// anything is. Not a failure on its own — a plain really is a plain — but worth
// saying, because it is what every theme shipped by accident.
const ranks = site.horizon ?? [];
const shaped = ranks.filter(r => typeof r.amp === 'function').length;
const ringNote = ranks.length && !shaped
  ? `the horizon is ${ranks.length} unshaped ring(s): the same hills at every bearing, so the skyline says nothing about which way anything is`
  : null;

console.log(`\n${missing.length ? '✗' : '✓'} theme "${themeName}": the place and the story`);
if(ok.length) console.log(`  ✓ told and built: ${ok.join(' · ')}`);
for(const m of missing)   console.log(`  ✗ ${m}`);
for(const u of unclaimed) console.log(`  · ${u}`);
if(ringNote) console.log(`  · ${ringNote}`);
if(shaped) console.log(`  ✓ ${shaped} of ${ranks.length} horizon rank(s) shaped by bearing`);

if(missing.length){
  console.log('  Build it in site.js or props.js, or stop the cards leaning on it.');
  process.exit(1);
}
