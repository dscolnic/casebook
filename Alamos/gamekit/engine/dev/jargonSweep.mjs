// jargonSweep.mjs — the work queue for the jargon sweep, not a gate.
//
//   node engine/dev/jargonSweep.mjs <theme> [--all] [--limit N]
//
// `checkJargon` is the gate: a curated domain lexicon, high precision, every
// finding real. This is its opposite and exists for a different job. It
// over-flags on purpose — morphology, length and rarity, with no curated list —
// because the sweep needs a queue a person reads, and a curated lexicon misses
// exactly the words nobody thought of. "sorbent", "influent" and "matrix effect"
// all pass the gate today.
//
// For each candidate it prints where the term is used and whether the game's own
// syllabus (`tools/syllabus.js`) claims it, which is the decision to make:
//
//   ON THE SYLLABUS  keep it — and check the mission that teaches it comes first
//   NOT CLAIMED      rewrite the question in plain words
//
// Rarity is measured inside the game itself: a term used in one stop out of forty-
// five is a word the player meets once, which is the worst kind. A term used on
// ten days is part of the subject.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const args = process.argv.slice(2);
const limit = Number(args[args.indexOf('--limit') + 1]) || 40;
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/jargonSweep.mjs <theme> [--all] [--limit N]');
  process.exit(2);
}

const SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
const words = (s) => String(s ?? '').replace(/[₀-₉]/g, c => SUBS[c] ?? c)
  .match(/[A-Za-z][A-Za-z0-9'’\/-]*/g) ?? [];
const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
const norm = (w) => String(w).toLowerCase().replace(/[’']s$/, '').replace(/-/g, '');

// Everyday English that trips a morphology test. Short: the point of this tool is
// to over-report, and a maintainer culling ten obvious words from a queue costs
// less than a missed one shipping.
const COMMON = new Set(`
about above after again against almost already also always another answer anybody anything around arrive
because become before begin behind believe better between both bring building carefully certain change
chemical children choose close collect come complete condition confirm consider contain continue could
decide decision different direction doctor during each early eight either enough evening every everybody
everything evidence example expect explain family finally first follow forward from further give group
happen have here however important inside instead into keep know later leave letter little longer look
machine make many matter maybe measure meeting might minute moment money morning most mother move much
must name near need never nobody nothing notice number often once only order other outside people perhaps
person picture place point possible present pressure probably problem question quickly quiet rather reach
read ready really reason record remember report result right room same sample science second sentence
several should since small some something sometimes soon sound start still stone stop story student such
suddenly sure surface system take talk tell temperature than that their them then there these thing think
this those though three through time today together tomorrow tonight took town train travel trouble true
turn under until upon used usually very walk want watch water week well were what when where which while
white whole will with within without word work world would write year young your
account accurate action active actual addition additional adequate adjust adjustment advance advice affect
agree amount analysis analyse analyze appear apply approach approve approximate area arrange assume attempt
available average avoid balance become begin benefit better beyond brief broad build calculate care carry
cause central certain chance charge check choice claim clear collapse collect colour combine common compare
complete concern conclude confirm connect consider consist constant contact content context control convert
correct count cover create current decide decline decrease define degree deliver depend describe design
detail detect determine develop differ difficult direct discuss display distance divide double effect
effort element energy engine ensure enter entire equal escape establish estimate event exact exceed exchange
exist expand expect expense experience explain extend extra factor failure feature figure final finish
follow force forward frequent function future gather general generate handle happen height hold identify
image immediate impact improve include increase indicate individual industry inform initial inspect install
instance intend interest internal introduce involve issue judge justify labour large layer level likely
limit local locate machine maintain major manage manner mark material maximum mean measure medium mention
method minimum modern modify monitor multiple narrow nature nearby normal notice object observe obtain
occupy occur offer operate opinion option organise organize original outcome output overall parallel
particular pattern percent perform period permit physical plan position positive practical prepare present
prevent previous primary print priority process produce product programme progress project propose protect
prove provide public purchase purpose quantity range rapid reaction receive recognise recognize recommend
reduce refer reflect regard region regular reject relate release remain remove repair repeat replace
represent request require reserve resolve respond restore retain return reveal reverse review revise
routine safety satisfy scale schedule secure select sensible separate series serious service settle shape
share shift signal significant similar simple single site situation solid solution source special specific
spend stage standard state statement status steady storage store strong structure submit substance succeed
suggest supply support suppose surround survive suspect sustain switch target technical technique
temporary theory therefore threat total track transfer transport treat trend typical understand uniform
unique unit update urgent useful valid value variable various version visible volume warning weight widely
achieve achievable available candidate collision completion circulation aggressive beside brief
`.trim().split(/\s+/).map(norm));

const TECHY = /(?:tion|sion|ment|ance|ence|ity|ology|ography|ometry|meter|metre|ate|ide|ine|ase|osis|emia|itis|ivity|graph|scopy|lysis|genic|phile|phobic|valent|meric|ant|ent|ive|oid|yl)s?$/i;

/** Would a general reader have to be taught this word? Deliberately generous. */
// "calculated", "collisions", "constantly" and "controller" are the common word
// with an ending on it, and testing the surface form leaves all four in the queue.
const FORMS = [/e?d$/, /s$/, /ing$/, /ly$/, /e?r$/, /ion$/, /ment$/, /ance$/, /ence$/, /able$/, /ive$/];
const ordinary = (w) => COMMON.has(w)
  || FORMS.some(f => { const base = w.replace(f, ''); return base.length >= 4 && (COMMON.has(base) || COMMON.has(base + 'e')); });

function candidate(raw){
  const w = norm(raw);
  if(w.length < 5 || ordinary(w)) return false;
  if(w.includes('/')) return false;                        // units are notation
  if(/^[A-Z]{2,5}$/.test(raw)) return true;                // an acronym
  if(/\d/.test(w)) return true;                            // CO2, NO3
  return w.length >= 10 || TECHY.test(w);
}

// The syllabus, flattened: every string in a game's entry becomes allowlist
// phrases, so this does not depend on the file's internal shape.
const syllabusMod = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/syllabus.js')).href)
  .catch(() => ({}));
const SYLLABUS = syllabusMod.SYLLABUS ?? syllabusMod.default ?? {};
function claimedBy(theme){
  const entry = SYLLABUS[theme] ?? SYLLABUS[theme?.replace(/_/g, '-')] ?? null;
  const out = new Set();
  // Word by word over-claims: "activation energy" would hand "energy" a licence
  // it did not earn, and half the ordinary vocabulary of a chemistry syllabus is
  // ordinary. A single word counts only when it is technical on its own.
  const walk = (v) => {
    if(typeof v === 'string'){
      for(const w of words(v)){
        const k = norm(w);
        if(k.length >= 5 && !COMMON.has(k)) out.add(k);
      }
      return;
    }
    if(Array.isArray(v)){ v.forEach(walk); return; }
    if(v && typeof v === 'object'){ Object.values(v).forEach(walk); }
  };
  walk(entry);
  return out;
}

for(const themeName of wanted){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const claimed = claimedBy(themeName);
  const glossary = new Set();
  for(const t of content.JARGON ?? []){
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)) for(const w of words(n)) glossary.add(norm(w));
  }

  const hits = new Map();   // norm -> { raw, days:Set, stops:[] }
  MISSIONS.forEach((m, mi) => {
    for(const stop of m.stops ?? []){
      const l = CURRICULUM[stop.group]?.[stop.lesson];
      if(!l) continue;
      const ch = l.game ?? {};
      const asked = [l.scene, ch.task ?? ch.play, ch.question, ch.headline,
        ...(ch.choices ?? []).map(label), ...(ch.cards ?? []).map(label),
        ...(ch.scenarios ?? []).map(label), ...(ch.givens ?? []).map(label),
        ...(ch.proposals ?? []).map(label)].filter(Boolean).join('  ');
      for(const raw of words(asked)){
        if(!candidate(raw)) continue;
        const key = norm(raw);
        if(!hits.has(key)) hits.set(key, { raw, days: new Set(), stops: [] });
        const h = hits.get(key);
        h.days.add(mi + 1);
        if(h.stops.length < 3) h.stops.push(`d${mi + 1} ${stop.group} "${l.title}"`);
      }
    }
  });

  const rows = [...hits.entries()].map(([key, h]) => ({
    key, raw: h.raw, days: [...h.days].sort((a, b) => a - b), stops: h.stops,
    onSyllabus: claimed.has(key), inGlossary: glossary.has(key),
  }));
  // Rarest first: a word used once is the one a rewrite removes most cheaply.
  rows.sort((a, b) => a.days.length - b.days.length || a.key.localeCompare(b.key));
  const rewrite = rows.filter(r => !r.onSyllabus);
  const keep = rows.filter(r => r.onSyllabus);

  console.log(`\n#### ${themeName}: ${rows.length} candidate term(s) — `
    + `${keep.length} on the syllabus, ${rewrite.length} not claimed by it`
    + ` (${rewrite.filter(r => r.inGlossary).length} of those have a glossary entry that only excuses them)`);
  console.log(`\n  REWRITE — not on the syllabus, rarest first:`);
  for(const r of rewrite.slice(0, limit)){
    console.log(`    ${r.raw}  ·  ${r.days.length} day(s)${r.inGlossary ? '  · glossary' : ''}`);
    console.log(`        ${r.stops.join('  |  ')}`);
  }
  if(rewrite.length > limit) console.log(`    … ${rewrite.length - limit} more (--limit ${rewrite.length})`);
  console.log(`\n  KEEP — on the syllabus: ${keep.map(r => r.raw).join(', ') || '(none)'}`);
}
