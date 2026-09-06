// v10extract.mjs — lift a bible's authored copy into book YAML.
//
//   node tools/v10extract.mjs <bible.md> 3              read mission 3
//   node tools/v10extract.mjs <bible.md> 3 --yaml       mission 3 as a book fragment
//   node tools/v10extract.mjs <bible.md> --all --out books/parts/redsand_v6
//   node tools/v10extract.mjs <bible.md> --head         glossary, primer terms, equations
//
// THE TEXT IS LIFTED, NEVER RETYPED. The master brief §12.3 is blunt about why:
// "Never allow a keyed value, tolerance, explanation, and worked formula to
// disagree", and sixty stops of hand-copied keyed values is how that happens. The
// same argument applies to prose, and more sharply when several people are
// building missions in parallel: N authors retyping is N times the drift, and
// `engine/dev/bibleParity.mjs` exists because that drift is invisible to every
// other gate in the repo.
//
// WHAT THIS DOES NOT DO. The payload's field names are the bible's, and the brief
// says so outright: "Convert it to the exact canonical schema in the target
// repository." Some are a rename; ALLOCATE is a model conversion, because the
// bible's board is a continuous split of a pool and the importer's is a subset
// chosen under a budget. That conversion is the implementation's job, done per
// stop against `tools/import-book.mjs`, and the payload is emitted as a comment
// so it cannot be mistaken for something that already imports.
//
// Nor does it choose a `group:` or an `at:`. Those are the campaign's own map —
// which curriculum area a stop belongs to and which fixture it is asked at — and
// they are decided once, centrally, before anybody splits the missions up.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readBible } from './bibleRead.mjs';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && /\.md$/i.test(a));
const num = args.find(a => /^\d+$/.test(a));
const all = args.includes('--all');
const head = args.includes('--head');
const asYaml = args.includes('--yaml') || all;
const outDir = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
if(!file || (!num && !all && !head)){
  console.error('usage: node tools/v10extract.mjs <bible.md> <mission> [--yaml]');
  console.error('       node tools/v10extract.mjs <bible.md> --all --out <dir>');
  console.error('       node tools/v10extract.mjs <bible.md> --head');
  process.exit(2);
}

const bible = readBible(file);
const q = (s) => JSON.stringify(String(s ?? ''));
const commentBlock = (text, pad) => String(text).split('\n').map(l => `${pad}#   ${l}`).join('\n');

/**
 * One mission as a book fragment.
 *
 * Everything the bible wrote is here and quoted; everything the implementation
 * owes is a `TODO` it cannot miss. The three TODOs are deliberate and are the
 * whole of the per-mission mapping work: which area a stop teaches for, which
 * fixture it is asked at, and — for the operated formats — the payload.
 */
function missionYaml(m){
  const out = [];
  const p = (s = '') => out.push(s);
  p(`# ============================================================ MISSION ${m.n}`);
  p(`# Lifted from ${file} by tools/v10extract.mjs. Every quoted string below is`);
  p(`# the bible's, verbatim; engine/dev/bibleParity.mjs holds it to that.`);
  p(`- title: ${JSON.stringify(m.title)}`);
  p('  card:');
  for(const [k, y] of [['header', 'header'], ['title', 'title'], ['goNow', 'goNow'], ['body', 'body'], ['objective', 'objective']])
    if(m.card[k]) p(`    ${y}: ${q(m.card[k])}`);
  if(m.card.objective) p(`  objective: ${q(m.card.objective)}`);
  if(m.card.body) p(`  stake: ${q(m.card.body)}`);
  // The bible labels its last review bullet "**Mission takeaway:**" outright.
  // The label is its own scaffolding, not player copy, so it is stripped.
  const mt = m.review.find(r => /^\*\*Mission takeaway/i.test(r)) ?? m.review[m.review.length - 1];
  if(mt) p(`  takeaway: ${q(mt.replace(/^\*\*Mission takeaway:?\*\*\s*/i, ''))}`);
  if(m.outcome) p(`  segue: ${q(m.outcome)}`);
  if(m.primer.length){
    p('  # The mission card\'s own "Primer concepts", printed on the plan card.');
    p('  primer:');
    for(const b of m.primer) p(`  - ${q(b)}`);
  }
  if(m.beats.length){
    p('');
    p('  # The bible\'s beat script. `world` is its World state line, `panel` its');
    p('  # Panel/HUD text, `bubbles` its dialogue. `on:` and any `stage:` rows are');
    p('  # the implementation\'s: which trigger, and which board the change lands on.');
    p('  beats:');
    for(const b of m.beats){
      p(`  - id: ${slug(b.name) || 'beat-' + b.n}`);
      p(`    # ${b.name} | ${b.where} | ${b.trigger}`);
      p(`    on: ${trigger(b, m)}`);
      if(b.world) p(`    world: ${q(b.world)}`);
      if(b.panel) p(`    panel: ${q(b.panel)}`);
      if(b.unlocks) p(`    # unlocks: ${b.unlocks}`);
      if(b.bubbles.length){
        p('    bubbles:');
        for(const x of b.bubbles){
          p(`    - who: ${castId(x.who, bible) ?? slug(x.who)}   # ${x.who}`);
          if(x.radio) p('      radio: true');
          p(`      say: ${q(x.say)}`);
        }
      }
    }
  }
  p('');
  p('  stops:');
  for(const s of m.stops){
    p(`  # --- Stop ${s.n}: ${s.title}`);
    p(`  #     ${s.meta ?? ''}`);
    p(`  #     placement: ${s.placement ?? ''}`);
    p('  - group: TODO            # the curriculum area this teaches for');
    p('    at: TODO               # the fixture it is asked at');
    p(`    title: ${q(s.title)}`);
    // ONLY WHEN A PERSON IS NAMED. "asked at `hub-schedule`" is a fixture, and
    // emitting `person: TODO` for it produced 48 unclosable TODOs in one
    // campaign — there is no roster id to put there because nobody is being
    // asked. A person is a capitalised name, not a lower-case id.
    if(/asked (?:at|by) [A-Z]/.test(s.placement ?? '')) p('    person: TODO   # the roster id of whoever asks it');
    if(s.concept) p(`    concept: ${q(s.concept)}`);
    if(s.reason) p(`    reason: ${q(s.reason)}`);
    if(s.setup) p(`    scene: ${q(s.setup)}`);
    if(s.connect) p(`    motivation: ${q(s.connect)}`);
    if(s.format) p(`    format: ${s.format}`);
    if(s.prompt) p(`    question: ${q(s.prompt)}`);
    if(s.choices){
      p('    choices:');
      for(const c of s.choices) p(`    - ${q(c.text)}`);
      const right = s.choices.find(c => c.correct);
      if(right) p(`    answer: ${q(right.text)}`);
    }
    if(s.answerText) p(`    answerText: ${q(s.answerText)}`);
    if(s.why) p(`    why: ${q(s.why)}`);
    if(s.wrong) p(`    # wrong-path feedback, one rebuttal per wrong option:\n    #   ${s.wrong}`);
    if(s.data) p(`    # data: ${s.data}`);
    if(s.result) p(`    # correct result: ${s.result}`);
    if(s.state) p(`    # state/output: ${s.state}`);
    if(s.payload){
      p('    # THE BIBLE\'S PAYLOAD. Convert to the canonical schema in');
      p('    # tools/import-book.mjs — some of these are a rename and some are a');
      p('    # model conversion. Do not paste it in as it stands.');
      p(commentBlock(s.payload, '    '));
    }
    p('');
  }
  return out.join('\n');
}

/**
 * A beat's `on:`, derived from the heading the bible already wrote.
 *
 * THE TWO NUMBERINGS ARE DIFFERENT, and this is the only place that has to know
 * it. The bible counts stops across the whole campaign — mission 3 owns Stops 9
 * to 12 — and the book counts them within the mission, so its beat waits on
 * stops 1 and 2. Doing that subtraction by hand, fifteen times, in a field whose
 * mistakes are silent (a beat keyed to a stop the mission does not have simply
 * never fires) is exactly the translation layer CLAUDE.md says is somewhere for
 * an off-by-one to live.
 */
function trigger(b, m){
  const first = m.stops[0]?.n ?? 1;
  const head = `${b.name} ${b.trigger}`;
  if(/mission outcome|outcome and hook/i.test(b.name)) return '{ missionEnd: true }';
  const nums = [...head.matchAll(/Stops?\s+(\d+)(?:\s+and\s+(\d+))?/gi)]
    .flatMap(x => [x[1], x[2]]).filter(Boolean).map(Number)
    .filter(n => m.stops.some(s => s.n === n))
    .map(n => n - first + 1);
  if(nums.length) return `{ after: [${[...new Set(nums)].sort((a, c) => a - c).join(', ')}] }`;
  // ARRIVAL, AND THE THREE OTHER WAYS A BEAT FIRES ON A PLACE.
  //
  // A bible writes more than "Arrival": a travel trigger between two rooms, a
  // gallery whose constraint reveals itself when you walk in, an epilogue on the
  // pad. The engine has one mechanism for all but the last — an `enter` beat at
  // the destination — because it has no travel event, and the destination is the
  // half of "Plant Control to Tank Farm" that matters. An epilogue is the day
  // ending, which is `missionEnd`.
  if(/epilogue|outcome|hook|closing|mission end/i.test(`${b.name} ${b.trigger}`)) return '{ missionEnd: true }';
  // THE ROOM IS IN WHICHEVER SEGMENT NAMES IT. Mars writes `Arrival | Plant
  // Control | automatic`, so the room is the second; the revised house style
  // writes `On arrival at Ferris Wheel machine room | automatic`, so it is
  // inside the first. Passing the second blindly handed "automatic" to the place
  // matcher for six campaigns.
  const named = (b.name.match(/on arrival at (.+)$/i) ?? [])[1];
  if(/arrival|arrive|travel|reveal|gallery/i.test(`${b.name} ${b.trigger}`) || b.where)
    return `{ enter: true, at: TODO }   # ${named || b.where || b.name}`;
  return '{ TODO: true }   # enter/at, after: [n], or missionEnd';
}

/**
 * The roster id for a speaker, when the character bible has one.
 *
 * A slug of the spoken name gives `imani-okoro`; the roster id is `okoro`,
 * because that is the surname the placements use. Emitting the slug made every
 * beat in the campaign spoken by somebody not on the roster — 75 of them in one
 * book — while the person was sitting in the cast list under a shorter name.
 */
function castId(name, bible){
  const n = String(name ?? '').toLowerCase().trim();
  if(!n) return null;
  const hit = (bible.cast ?? []).find(c => {
    const full = c.name.toLowerCase();
    return full === n || full.includes(n) || n.includes(full)
      || n.split(/\s+/).includes(c.id);
  });
  return hit?.id ?? null;
}

/** A speaker's name or a beat's name, as an id a book can carry. */
function slug(s){
  return String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Everything that is campaign-wide rather than per mission.
 *
 * Printed on its own because it belongs in the book's HEAD, which one person
 * writes once — and because a glossary assembled from fifteen fragments by
 * fifteen agents is fifteen chances to define one term twice.
 */
function headYaml(){
  const out = [];
  const p = (s = '') => out.push(s);
  p('# --------------------------------------------------------------- glossary');
  p('# Every "Worth knowing first" glossary entry in the bible, in the order the');
  p('# missions introduce them. `aliases` is the only thing added: it is not copy,');
  p('# it is the spellings engine/dev/checkJargon.mjs matches the prose against.');
  p('glossary:');
  const seen = new Set();
  for(const m of bible.missions) for(const g of m.glossary){
    const key = g.term.toLowerCase();
    if(seen.has(key)) continue;
    seen.add(key);
    p(`# mission ${m.n}`);
    p(`- name: ${g.term}`);
    p(`  aliases: [${key}]   # TODO: the plurals and spellings the prose uses`);
    p(`  def: ${JSON.stringify(g.def)}`);
  }
  p('');
  p('# ------------------------------------------- for tools/syllabus.js EQUATIONS');
  p('# The mission cards\' own "Equations first needed today", one for one:');
  p('#   e <- Equation   c <- What it is for   v <- Symbols   s <- Why this campaign needs it');
  p('# `k` (what attaches an equation to the stops that use it) and `needs` (the');
  p('# order the bible introduces them in) have no counterpart in the bible.');
  const eqSeen = new Set();
  for(const m of bible.missions) for(const e of m.equations){
    if(!e.e || eqSeen.has(e.e)) continue;
    eqSeen.add(e.e);
    p(`#   // mission ${m.n}`);
    p(`#   { e: ${q(e.e)},`);
    p(`#     c: ${q(e.c)},`);
    p(`#     v: [ TODO: split ${q(e.v)} ],`);
    p(`#     s: ${q(e.s)},`);
    p('#     k: [ TODO ] },');
  }
  return out.join('\n');
}

if(head){ console.log(headYaml()); process.exit(0); }

if(all){
  if(!outDir){ console.error('--all needs --out <dir>'); process.exit(2); }
  mkdirSync(outDir, { recursive: true });
  for(const m of bible.missions){
    const name = `m${String(m.n).padStart(2, '0')}.yml`;
    writeFileSync(resolve(outDir, name), missionYaml(m) + '\n');
    console.log(`  ${name.padEnd(9)} ${m.stops.length} stop(s), ${m.beats.length} beat(s)  ${m.title}`);
  }
  writeFileSync(resolve(outDir, '_head.txt'), headYaml() + '\n');
  console.log(`  _head.txt  the glossary and the equations, for the book's head`);
  console.log(`\n${bible.missions.length} fragment(s) → ${outDir}`);
  console.log('Assemble with: node tools/assemble-book.mjs <head.yml> ' + outDir + ' > books/<theme>.yml');
  process.exit(0);
}

const m = bible.missions.find(x => x.n === +num);
if(!m){ console.error(`no Mission ${num} in ${file}`); process.exit(1); }
if(asYaml){ console.log(missionYaml(m)); process.exit(0); }

console.log(`=== MISSION ${m.n}: ${m.title}`);
console.log('\n--- briefing card');
for(const [k, v] of Object.entries(m.card)) if(v) console.log(`  ${k}: ${v}`);
console.log('\n--- worth knowing first');
console.log(`  glossary: ${m.glossary.map(g => g.term).join(', ') || '(none)'}`);
m.primer.forEach(b => console.log(`  primer: ${b}`));
m.equations.forEach(e => console.log(`  equation: ${e.e}  —  ${e.c}`));
console.log('\n--- beats');
for(const b of m.beats){
  console.log(`  ${b.n}. ${b.name} | ${b.where} | ${b.trigger}`);
  if(b.world) console.log(`     world: ${b.world}`);
  if(b.panel) console.log(`     panel: ${b.panel}`);
  b.bubbles.forEach(x => console.log(`     ${x.who}${x.radio ? ' (radio)' : ''}: "${x.say}"`));
}
console.log('\n--- outcome\n  ' + (m.outcome ?? '(none)'));
console.log('\n--- quick concept review');
m.review.forEach(r => console.log('  - ' + r));
for(const s of m.stops){
  console.log(`\n--- Stop ${s.n}: ${s.title}`);
  for(const [k, v] of Object.entries(s)){
    if(['payload', 'choices', 'n', 'title', 'aliases'].includes(k) || v == null) continue;
    console.log(`  ${k}: ${v}`);
  }
  if(s.choices) s.choices.forEach((c, i) =>
    console.log(`    ${i + 1}. ${c.text}${c.correct ? '   <= CORRECT' : ''}`));
  if(s.payload) console.log('  payload:\n' + s.payload.split('\n').map(l => '    ' + l).join('\n'));
}
