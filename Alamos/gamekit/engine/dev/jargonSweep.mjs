// jargonSweep.mjs — the work queue for the jargon sweep, not a gate.
//
//   node engine/dev/jargonSweep.mjs <theme> [--all] [--limit N] [--unanchored]
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
const unanchored = args.includes('--unanchored');
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/jargonSweep.mjs <theme> [--all] [--limit N] [--unanchored]');
  process.exit(2);
}

const SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
// A hyphen joins two words and hides both: "lower-activation-energy" matched
// neither the common list nor the syllabus as one token, so a compound of three
// ordinary-or-claimed words sat in the queue. Split on it and judge the parts.
const words = (s) => String(s ?? '').replace(/[₀-₉]/g, c => SUBS[c] ?? c)
  .match(/[A-Za-z][A-Za-z0-9'’\/]*/g) ?? [];
const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
const norm = (w) => String(w).toLowerCase().replace(/[’']s$/, '').replace(/-/g, '');

// Everyday English that trips a morphology test. Over-reporting is still the
// policy — a missed word ships and a culled one costs a glance — but there is a
// limit past which it stops being a policy: a queue holding "explosion",
// "permission" and "photographs" beside "surfactant" gets skimmed, and skimming
// is how the real words survive a sweep. Everything below is a word a general
// reader knows, collected from the queues of all seven games.
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
accident agent alongside ambient appreciable arithmetic arrival attention barrel building bulk cabinet
canopy capable ceiling channel chart circle city cleaning colourless column comparison compound
concentrate conclusion conditional confidence container continuous corner corridor council criteria
critical daily decorative delay department depth device discoloration document downstream drinking
detergent duration emergency employee entrance envelope equipment evening event exact excess exit expensive
experiment explanation explosion extent fence fire firefighter flooding fraction freight fresh gate
guidance handling hazard header health hospital household identification identity incident independent
industrial information injury inspection instrument insufficient intense interchangeable interpretation
interval isolate journey kitchen laboratory leadership library lighting limited loading meaningful
meeting neighbour neighbourhood network notice occupy office online operator opposite outdoor overnight
overshoot ownership package parking partner passage pathway patient pavement payment permanent permission
personnel photograph physical pipeline plan plant plate platform pollution population portion position
practice prediction prerequisite pressure prevention priority procedure programme property proportion
protection provisional public reading recharge reference regular relationship relevant reliable
requirement rescue residence resident residential resilience response responder restricted roadway
roughly routine safe safely schedule scientific season section sensible sensitive session settlement
severe shelter shift shipment shortage shutdown signature simple site situation specialist speed staff
station storage street structural summary supervisor supply suppression surrounding suspicion tank team
technician telephone thousand traffic transfer transport truck tunnel unusual utility vehicle village
violent visitor volunteer warehouse warning waste weather worker workplace yard
accumulate assign contaminate contaminant contamination destroy destruction distribute distribution
destructive electric electrical electricity encounter freshwater intensify label necessary negative reoccupy
reservoir sediment sufficient turbulent turbulence verify verification vulnerable
ability anyone assumption automatic baseline boundary classmate community compartment conduct confusion
deadline deliberate disagreement electronic environment evaluation everyone everywhere examine executive
imbalance instant instruction interruption invitation line maintenance mean merchant navigation
observation parent rate relative revolution sequence side simplify someone spine stencil struggle
surprise themselves underneath understood unattended ventilate ventilation visibility vision
activity certainty constrain handwashing lightheaded meant multiply playground rebuild
accelerate acceleration alternative archive authority autonomous calibrate calibration catalogue
challenge characterise coastline commission composition consequence consistent continent contribution
decelerate deceleration decisive defence defense demonstration density dependent dimension discover
displacement distortion enhancement evacuate evacuation fragment fragmentation geographic guarantee
gravity hemisphere international intervention mission motion observatory opportunity percentage
precision preliminary prepared preserve redistribute satellite spacecraft statistical successive
telescope threaten trajectory transparent wavelength
absorb absorption align alignment communicate communication preparedness repeatable repeatability
absent abundant abundance accessible activate admission adherence agriculture appropriate argument
bedside bottleneck capacity catchment characterise citywide classification compatible compensate
compensation confirm contribute deteriorate deterioration diagnosis discharge disease disproportionate
diversity drive effective effectiveness efficiency enrol enrolment escalate expansion frequency
hospitalise hospitalisation impossible impression integrate interview investigate investigation
mechanical modification outlive parameter persistent potential prescribe prescription publicity
quantify redirect reduction representative resolution sedate standardise substitute successful
template unfamiliar wastewater whiteboard
acidity associate association case commit confirmatory degrade degradation demonstrate dioxide
inhibit inhibition medical biomedical microscope suppress
assemble assembly capability certificate circulate comparative component configuration contingency
converge coordinate correspond deployment difficulty disagree disappear disappoint distinguish division
efficient facility formality genuine government humanitarian hypothesis identical initiate initiation
intention interface interrupt intuition life manufacture measurable obligation petition possibility
purity recover reorganise repulsion scientist segment segregate silence stable stability symmetry
symmetrical temptation theoretical tolerance vary variation blackboard bookkeeping
accept acceptable background diagnostic hypotheses impurity instability lives measurably prompt
radiological saturate stabilise throughput unstable
affordable atmosphere atmospheric compress condensation consumable contradictory corruption descent
dissipate distant endurance geometry gradient improvise intermittent moderate orientation perpendicular
quality reconstruct refine reliability simulation subtract timeline timestamp transition transmit
accelerometer propel propulsion switchboard thermometer transmitter unambiguous vibration voltmeter
`.trim().split(/\s+/).map(norm));

// A unit is notation, not vocabulary. "millimetres" is not a word the player has
// to be taught, and neither is the number in front of it.
const UNITS = new Set(`
metre meter centimetre centimeter millimetre millimeter kilometre kilometer micrometre micrometer
litre liter millilitre milliliter microlitre microliter gram kilogram milligram microgram tonne
joule kilojoule megajoule watt kilowatt kelvin celsius fahrenheit
pascal kilopascal hectare acre gallon
nanosecond microsecond millisecond
`.trim().split(/\s+/).map(norm));

const TECHY = /(?:tion|sion|ment|ance|ence|ity|ology|ography|ometry|meter|metre|ate|ide|ine|ase|osis|emia|itis|ivity|graph|scopy|lysis|genic|phile|phobic|valent|meric|ant|ent|ive|oid|yl)s?$/i;

/** Would a general reader have to be taught this word? Deliberately generous. */
// "calculated", "collisions", "constantly" and "controller" are the common word
// with an ending on it, and testing the surface form leaves all four in the queue.
const FORMS = [/e?d$/, /s$/, /es$/, /ing$/, /ly$/, /e?r$/, /ion$/, /ment$/, /ance$/, /ence$/, /able$/, /ive$/, /al$/];
// A prefix hides a common word the same way a suffix does: "uncontrolled" and
// "unmeasured" are "control" and "measure" wearing two affixes at once.
// "re" is not on the list: a chemistry queue is full of re- words that are real
// terms, and stripping it turns "reagent" into "agent" and "reactive" into
// "active" — two of the words this tool exists to find.
const PREFIXES = /^(?:un|non|over|under|mis|pre|post|sub|inter|multi|semi|self)/;
const known = (b) => b.length >= 4 && (COMMON.has(b) || UNITS.has(b) || COMMON.has(b + 'e') || UNITS.has(b + 'e'));
// One pass strips one ending, and English stacks them: "scientifically" is
// "scientific" under two, "controller" is "control" under an ending and the
// doubled consonant that carrying it needed.
const strip1 = (w) => [w.replace(/ies$/, 'y'), w.replace(/ied$/, 'y'), w.replace(/ily$/, 'y'), w.replace(/ation$/, ''), ...FORMS.map(f => w.replace(f, ''))]
  .flatMap(b => [b, b.replace(/([a-z])\1$/, '$1')]);
const stems = (w) => [w, ...strip1(w), ...strip1(w).flatMap(strip1)];
// -ize and -ise are the same word, and a list that carries only one spelling
// reports the other as jargon: "hospitalization", "characterize", "standardize".
const spellings = (w) => (/iz/.test(w) ? [w, w.replace(/iz/g, 'is')] : [w]);
const plain = (w) => spellings(w).some(v => COMMON.has(v) || UNITS.has(v) || stems(v).some(b => b !== v && known(b)));
const ordinary = (w) => plain(w)
  || (PREFIXES.test(w) && (() => { const b = w.replace(PREFIXES, ''); return b.length >= 4 && plain(b); })());

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

// The syllabus writes stems on purpose — "precipitat", "oxidis", "mass spectrom" —
// so an exact match claims almost nothing: "oxidants", "replicates", "precipitate"
// and "spectrometer" all sat in the rewrite pile beside their own syllabus entry.
// Two words share a root when one starts the other, or when they agree for eight
// characters — long enough that "electrochemical" finds "electrochemistry" and
// "detonators" finds "detonation velocity", short enough that "electrically"
// still does not find "electrolysis".
function sharesRoot(a, b){
  if(a === b) return true;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  if(s.length >= 5 && l.startsWith(s)) return true;
  let i = 0;
  while(i < s.length && s[i] === l[i]) i++;
  return i >= 7;
}
// The candidate side needs stemming as much as the syllabus side does:
// "detonates" and "detonators" are the syllabus's "detonation velocity" with an
// ending on them, and an unstemmed comparison claims neither.
const claimCandidates = (key) => [key, key.replace(PREFIXES, ''), ...stems(key)].filter(w => w.length >= 5);

for(const themeName of wanted){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const claimed = [...claimedBy(themeName)];
  // A person is not a hard word. Oppenheimer, Trinity and the Ordnance Division
  // are names — the cast, the areas of study and the places the game is set —
  // and every one of them was sitting in Project Y's rewrite pile.
  const names = new Set();
  for(const p of [...(content.ROSTER ?? []), ...(content.LEADERS ?? [])])
    for(const w of words(p?.name)) names.add(norm(w));
  for(const g of content.GROUPS ?? []) for(const w of words(g?.name)) names.add(norm(w));
  for(const m of content.MISSIONS ?? []){
    for(const stop of m.stops ?? []) for(const w of words(stop?.person ?? '')) names.add(norm(w));
  }
  const glossary = new Set();
  for(const t of content.JARGON ?? []){
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)) for(const w of words(n)) glossary.add(norm(w));
  }

  const hits = new Map();   // norm -> { raw, days:Set, stops:[] }
  // Per day: which hard words the questions ask with, and which the day's own
  // reasoning uses. A word in the first set and not the second is jargon the day
  // never earns — the player has to carry it to answer, and nothing that follows
  // explains why it was the right word.
  const byDay = [];
  MISSIONS.forEach((m, mi) => {
    const day = { title: m.title, asked: new Map(), taught: new Set() };
    byDay.push(day);
    for(const stop of m.stops ?? []){
      const l = CURRICULUM[stop.group]?.[stop.lesson];
      if(!l) continue;
      const ch = l.game ?? {};
      const asked = [l.scene, ch.task ?? ch.play, ch.question, ch.headline,
        ...(ch.choices ?? []).map(label), ...(ch.cards ?? []).map(label),
        ...(ch.scenarios ?? []).map(label), ...(ch.givens ?? []).map(label),
        ...(ch.proposals ?? []).map(label)].filter(Boolean).join('  ');
      for(const w of words([ch.why, ...(l.assumes ?? []), ...(ch.rebuttals ?? []).map(label)]
        .filter(Boolean).join('  '))) day.taught.add(norm(w));
      // "Mrs. Grant" is a patient, not a hard word. The roster covers the cast a
      // game ships; the people invented inside a question are known only by the
      // title in front of them.
      const surnames = new Set();
      for(const m of asked.matchAll(/\b(?:Mr|Mrs|Ms|Miss|Dr|Nurse|Captain|Chief|Colonel|General|Professor|Lieutenant|Commander)\.?\s+([A-Z][a-z]+)/g)) surnames.add(norm(m[1]));
      for(const raw of words(asked)){
        if(surnames.has(norm(raw))) continue;
        if(!candidate(raw)) continue;
        const key = norm(raw);
        if(names.has(key)) continue;
        if(!hits.has(key)) hits.set(key, { raw, days: new Set(), stops: [] });
        const h = hits.get(key);
        h.days.add(mi + 1);
        if(h.stops.length < 3) h.stops.push(`d${mi + 1} ${stop.group} "${l.title}"`);
        if(!day.asked.has(key)) day.asked.set(key, { raw, where: `${stop.group} "${l.title}"` });
      }
    }
  });

  const rows = [...hits.entries()].map(([key, h]) => ({
    key, raw: h.raw, days: [...h.days].sort((a, b) => a - b), stops: h.stops,
    onSyllabus: claimCandidates(key).some(w => claimed.some(c => sharesRoot(w, c))),
    inGlossary: glossary.has(key),
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

  // --unanchored: the same question asked per day rather than per game. A term
  // can be on the syllabus, defined in the glossary and still arrive unearned, if
  // the day that uses it never reasons with it. Those are the words to cut or to
  // tie down first, because the day is not about them.
  if(!unanchored) continue;
  const flat = (r) => r.onSyllabus ? '  · syllabus' : (r.inGlossary ? '  · glossary' : '');
  const meta = new Map(rows.map(r => [r.key, r]));
  let loose = 0;
  console.log(`\n  UNANCHORED — asked with on the day, never reasoned with on the day:`);
  byDay.forEach((day, i) => {
    const out = [...day.asked.entries()].filter(([key]) => !day.taught.has(key));
    if(!out.length) return;
    loose += out.length;
    console.log(`    d${i + 1} "${day.title}"`);
    for(const [key, a] of out) console.log(`        ${a.raw} — ${a.where}${flat(meta.get(key) ?? {})}`);
  });
  console.log(`    ${loose} term(s) across ${byDay.length} days`);
}
