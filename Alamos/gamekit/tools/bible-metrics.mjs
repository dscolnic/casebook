// bible-metrics.mjs — the four bars, the recovery economy and the fifteen
// post-mission screens, out of a bible and into a theme's own `metrics.js`.
//
//   node tools/bible-metrics.mjs <theme> [--dry]
//   node tools/bible-metrics.mjs --all [--dry]
//   node tools/bible-metrics.mjs --check redsand_v5
//
// WHY THIS IS A TOOL AND NOT EIGHT HAND-WRITTEN BLOCKS. Every one of the eight
// bibles specifies the same machine: four bars with starting values and a lock
// mission, `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`, a
// bank cap, and for each of fifteen missions a target time, the story event that
// moves the bars, and the automatic deltas. Red Sand's was typed in by hand and
// reached three missions of fifteen in the time it took to type them.
//
// THE SHAPES DIFFER AND THE FACTS DO NOT. Carrying heads its time field
// `**Target:**` and the others `**Timer:**`; Ground Truth writes a whole screen
// as one backticked line; The Trial writes all four deltas at once where Red Sand
// writes one. Each is read for the same five things and nothing is inferred: a
// screen that does not state a target gets none, and the mission is reported
// rather than given a number this file made up.
//
// `--check` is why the numbers can be trusted. Run against `redsand_v5`, whose
// block was written by hand from the same bible, it compares every bar, every
// lock, the formula, the cap and the three authored missions. If a rewrite of
// this parser stops reproducing them, it says so.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));

/** `Flight-Ready Methane` -> `flight_ready_methane`, which is what Red Sand uses. */
const slug = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

/** Every markdown table in a chunk, as {head: [...], rows: [[...]]}. */
function tables(text){
  const out = [];
  const lines = text.split('\n');
  for(let i = 0; i < lines.length; i++){
    if(!/^\s*\|/.test(lines[i])) continue;
    if(!/^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? '')) continue;
    const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    const head = cells(lines[i]);
    const rows = [];
    let j = i + 2;
    // A BLANK LINE BETWEEN ROWS IS STILL ONE TABLE. Whiteout spaces its four
    // bars out for readability, which every markdown renderer draws as one
    // table and which stopped this scanner on the first gap — so the four-bar
    // table came back as a table of nothing and the whole metrics block was
    // reported unwritten. A gap ends the table only when what follows it is
    // the header of a new one (a row with a `|---|` separator under it).
    while(j < lines.length){
      if(/^\s*\|/.test(lines[j])){ rows.push(cells(lines[j])); j++; continue; }
      if(lines[j].trim() !== '') break;
      let k = j;
      while(k < lines.length && lines[k].trim() === '') k++;
      if(k >= lines.length || !/^\s*\|/.test(lines[k])) break;
      if(/^\s*\|[\s:|-]+\|\s*$/.test(lines[k + 1] ?? '')) break;   // a new table
      j = k;
    }
    out.push({ head, rows });
    i = j;
  }
  return out;
}

/** The first table that looks like the four-bar table. */
function barTable(text){
  for(const t of tables(text)){
    const head = t.head.map(h => h.toLowerCase());
    const name = head.findIndex(h => /^(bar|metric)$/.test(h) || /player-facing name/.test(h));
    const start = head.findIndex(h => /^start/.test(h));
    if(name < 0 || start < 0) continue;
    if(t.rows.length !== 4) continue;
    const mean = head.findIndex(h => /mean|what the bar/.test(h));
    const lock = head.findIndex(h => /lock/.test(h));
    // Planetary Defense declares the key itself in an `ID` column, which is
    // better than a slug of the name and is used when it is there.
    const id = head.findIndex(h => /^id$/.test(h));
    return { t, name, start, mean, lock, id };
  }
  return null;
}

/** `Locks at 100 after Mission 13` / `100% after Day 14 …` -> 13 / 14. */
function lockMission(...said){
  for(const s of said){
    const m = /(?:mission|day|m)\s*(\d{1,2})\b/i.exec(String(s ?? ''));
    if(m) return +m[1];
  }
  return undefined;
}

/**
 * The automatic change, in whichever of the four hands the bible writes it.
 *
 *   named       `Plant Integrity +4 | Power Reserve -2`   (Red Sand, Ground Truth)
 *   initialled  `E+4/S+2/I+4/T-4`                          (The Trial)
 *   positional  `+6 / 0 / -4 / 0`                          (Planetary Defense)
 *
 * Tried in that order, and each one has to resolve completely or it is not that
 * hand: a positional list is four signed numbers and nothing else, and an
 * initialled one is letters that each pick out exactly one bar. Half a match is
 * refused rather than filled in, because a delta on the wrong bar is a campaign
 * that scores the wrong thing and looks fine doing it.
 */
function readDeltas(text, bars, keyFor, letters4 = null){
  // A MINUS SIGN IS NOT ALWAYS A HYPHEN. Changeover writes `PRICES −5` with
  // U+2212, and backticks wrap the number in Headwater's `SAFE STORAGE \`+3\``.
  // Both read as no delta at all, which is a bar that silently never moves.
  const said = String(text ?? '').replace(/[\u2212\u2012-\u2015]/g, '-').replace(/`/g, '').trim();
  if(!said) return {};

  const named = {};
  // The sign is optional, because a bar that does not move is written `Oxygen 0`
  // as often as `Oxygen +0`, and reading only the signed ones dropped a quarter
  // of Red Sand's deltas while looking complete.
  for(const m of said.matchAll(/([A-Za-z][A-Za-z \-]*?)\s*([+-]?\s*\d+)(?!\s*[:%])/g)){
    const key = keyFor(m[1]);
    const by = Number(m[2].replace(/\s+/g, ''));
    if(!key || !Number.isFinite(by)) continue;
    // ZEROS ARE KEPT. A bar the screen names and does not move is a bar the
    // author considered; dropping it makes this file disagree with the block a
    // person wrote from the same table, for no gain.
    named[key] = (named[key] ?? 0) + by;
  }
  if(Object.keys(named).length) return named;

  // Initials. A letter picks the bar with a word starting with it, and only when
  // that is the only such bar: The Trial's E, S, I and T are Evidence Strength,
  // Patient SAFETY, Trial INTEGRITY and TIME Reserve, so it is not the first
  // letter of the name.
  // `I0` is a bar that does not move, written without a sign, and nine of The
  // Trial's fifteen screens have one. An unsigned number counts only when it is
  // joined to the letter, so `QA 91` is still not a delta on some bar Q.
  const letters = [...said.matchAll(/\b([A-Za-z])(?:\s*([+-]\s*\d+)|(\d+))/g)]
    .map(m => [m[0], m[1], (m[2] ?? m[3])]);
  const starts = (bar, c) => bar.label.toLowerCase().split(/\s+/).some(w => w.startsWith(c));
  if(letters.length === bars.length
     && letters.every((m, i) => starts(bars[i], m[1].toLowerCase()))){
    // IN THE BARS' OWN ORDER, which is how The Trial writes them: `E+2/S+6/I+2/T-4`
    // against Evidence Strength, Patient Safety, Trial Integrity, Time Reserve.
    // Read letter by letter instead, `S` is ambiguous — Patient SAFETY and
    // Evidence STRENGTH both answer to it — and the whole campaign loses its
    // deltas to a tie. Four letters that each fit the bar in their own position
    // are not a coincidence.
    const out = {};
    letters.forEach((m, i) => { out[bars[i].key] = Number(String(m[2]).replace(/\s+/g, '')); });
    return out;
  }
  // A SINGLE LETTER, RESOLVED FROM THE CAMPAIGN'S OWN NOTATION. The Trial ends
  // three of its screens on `T-3` alone, and `T` fits both Trial Integrity and
  // Time Reserve. The same document wrote `E+4/S+2/I+2/T-4` nine times before
  // that, which says what T is here — so the letter map learned from the
  // four-letter screens settles it, and a campaign that never wrote one gets
  // nothing rather than a guess.
  if(letters.length && letters4){
    const out = {};
    let ok = true;
    for(const m of letters){
      const key = letters4[m[1].toLowerCase()];
      if(!key){ ok = false; break; }
      out[key] = Number(String(m[2]).replace(/\s+/g, ''));
    }
    if(ok) return out;
  }
  if(letters.length >= 2){
    const out = {};
    let ok = true;
    for(const m of letters){
      const c = m[1].toLowerCase();
      const hit = bars.filter(b => starts(b, c));
      if(hit.length !== 1){ ok = false; break; }
      out[hit[0].key] = Number(String(m[2]).replace(/\s+/g, ''));
    }
    if(ok && Object.keys(out).length === letters.length) return out;
  }

  // Positional: exactly four signed numbers in the bars' declared order.
  const slots = said.split('/').map(x => x.trim());
  if(slots.length === bars.length && slots.every(x => /^[+-]?\d+$/.test(x))){
    const out = {};
    slots.forEach((x, i) => { out[bars[i].key] = Number(x); });
    return out;
  }
  return {};
}

export function readMetrics(text){
  const owes = [];
  const bt = barTable(text);
  if(!bt){
    return { bars: [], missions: [], owes: ['no four-row table with a `Bar`/`Metric` column and a'
      + ' `Start` column — the four bars are the whole of this block and nothing is written'] };
  }
  const bars = bt.t.rows.map((r) => {
    const label = r[bt.name].replace(/\*\*/g, '').trim();
    const start = Number(String(r[bt.start]).replace(/[^\d.-]/g, ''));
    const meaning = bt.mean >= 0 ? r[bt.mean].trim() : '';
    // THE LOCK COLUMN IS THE ONLY PLACE A LOCK IS STATED, when there is one.
    // Red Sand's table has no such column and says it in the meaning instead —
    // "becomes permanently locked at 100 after Mission 13" — so that is read
    // too, but only when the sentence is about locking. Without that guard The
    // Trial's Time Reserve, whose meaning ends "before day 15" and whose lock
    // column says "never locks", came out locking at mission 15: a bar the
    // player can no longer lose, in the campaign whose subject is running out
    // of time.
    const from = bt.lock >= 0
      ? lockMission(r[bt.lock])
      : (/lock/i.test(meaning) ? lockMission(meaning) : undefined);
    if(!label) owes.push('a bar row has no name');
    if(!Number.isFinite(start)) owes.push(`bar "${label}" has no numeric start`);
    const own = bt.id >= 0 ? slug(r[bt.id]) : '';
    return { key: own || slug(label), label, start,
      ...(from !== undefined ? { lockFrom: from } : {}), meaning };
  });

  // The recovery economy, stated the same way in all eight.
  const clamp = /clamp\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(text);
  const bank = /(?:bank(?:ing)?[^.\n]*?cap|cap\s*(?:of)?)\s*(\d+)|bank up to\s*(\d+)/i.exec(text);
  const rp = clamp ? { base: +clamp[3], min: +clamp[1], max: +clamp[2] } : undefined;
  if(!rp) owes.push('no `RP = clamp(min, max, base + …)` line — the recovery economy is unstated');

  // Map a delta's name onto a bar. Exact slug first, then the only bar whose
  // name carries the word: the screens write "Evidence +5" for "Plan Evidence"
  // and "CREW CLEARANCE +2" for "Crew Clearance". Ambiguity resolves to nothing
  // rather than to the first match.
  const keyFor = (said) => {
    const s = slug(said);
    if(!s) return null;
    const exact = bars.find(b => b.key === s);
    if(exact) return exact.key;
    // AGAINST THE LABEL AS WELL AS THE KEY. Planetary Defense declares its keys
    // in an `ID` column — `solution`, `reserve` — and its screens name the bars
    // in full: "IMPACT SOLUTION +6". Matching the words against the key alone
    // asked `solution` to contain `impact`, and lost every delta in the campaign.
    const has = (b) => `${b.key}_${slug(b.label)}`;
    // A PLURAL IS THE SAME BAR. Changeover's screens say `PRICES +4` and its bar
    // is Price Continuity, so the word is tried as written and then without its
    // trailing s. Six of that campaign's fifteen deltas turned on it.
    for(const form of [s, s.replace(/s(_|$)/g, '$1')]){
      const words = form.split('_').filter(w => w.length > 2);
      if(!words.length) continue;
      const hit = bars.filter(b => words.every(w => has(b).includes(w)));
      if(hit.length === 1) return hit[0].key;
    }
    return null;
  };

  // A SECTION MAY CARRY A LETTER. Whiteout heads its screens `## J. Post-mission
  // metric screen — exact player copy`, and matched without the prefix that is
  // fifteen screens read as none. Same allowance the stop and outcome readers
  // in `bibleRead.mjs` already make.
  const screens = text.split(/^#{2,4} (?:[A-Z]+\d*\.\s*)?Post-mission metric screen[^\n]*$/gm).slice(1)
    .map(s => s.split(/^#{2} /m)[0]);
  // FIRST PASS FOR THE LETTER MAP. A screen that writes one letter per bar in
  // the bars' own order says what each letter means for the rest of the
  // campaign; screens that abbreviate to a single letter are then readable.
  const letters4 = {};
  for(const raw of screens){
    for(const seg of raw.replace(/\*\*/g, '').split(/[;\n]/)){
      const got = readDeltas(seg, bars, keyFor);
      const ls = [...String(seg).matchAll(/\b([A-Za-z])(?:\s*[+-]\s*\d+|\d+)/g)].map(m => m[1].toLowerCase());
      if(Object.keys(got).length === bars.length && ls.length === bars.length){
        ls.forEach((c, k) => { letters4[c] = bars[k].key; });
      }
    }
  }

  const missions = screens.map((raw, i) => {
    const n = i + 1;
    // A field is `**Label:** …` up to the next `**Label:**` or the end of its
    // paragraph — the two layouts differ only in whether that is a newline.
    const field = (re) => {
      const m = new RegExp(`\\*\\*\\s*(?:${re})[^*:]*:\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*[^*]+:\\*\\*|\\n\\s*\\n|$)`, 'i')
        .exec(raw);
      return m ? m[1].replace(/\s+/g, ' ').trim().replace(/[.;]\s*$/, '') : '';
    };
    const timeText = field('Target|Timer') || raw;
    const t = /(?:TARGET|Target)\s*(\d{1,2}):(\d{2})/.exec(timeText)
      ?? /\b(\d{1,2}):(\d{2})\b/.exec(timeText);
    const target = t ? (+t[1]) * 60 + (+t[2]) : undefined;
    if(target === undefined) owes.push(`mission ${n}'s screen states no target time`);

    // THE THIRD AND FOURTH LAYOUTS. Two campaigns write the whole screen as one
    // semicolon-separated line with no bold labels at all — Carrying's
    // `target 14:00; fishery ceiling adopted, Evidence +5; QA 90/70/…` and
    // Headwater's `TARGET \`17:00\`; event: verified rate replaces a guess;
    // automatic \`OPERATING RESERVE +3\`; …`. The segments are read for the same
    // two things, and a segment carrying both the event and the delta is cut at
    // the delta rather than printed with a number on the end of the sentence.
    const segments = raw.replace(/\*\*/g, '').split(/[;\n]/).map(x => x.trim()).filter(Boolean);
    const NOISE = /\{|TARGET|INCORRECT|canonical|^QA\b|\bRP\b|restore|allocate|award|MISSION \d+ COMPLETE|^Review\b|^Header\b/i;
    let event = field('Story event')
      || (/\bevent\s*`([^`]+)`/i.exec(raw)?.[1] ?? '').trim()
      || (/story event\s*`([^`]+)`/i.exec(raw)?.[1] ?? '').trim()
      || (segments.map(x => /^event\s*:\s*(.+)$/i.exec(x)?.[1]).find(Boolean) ?? '').trim()
      || (segments.find(x => !NOISE.test(x) && /[a-z]{4}/.test(x) && !/^[\d\s/%+-]+$/.test(x)) ?? '')
        .replace(/,?\s*[A-Za-z][A-Za-z \-]*[+-]?\s*\d+\s*$/, '').trim();
    if(!event) owes.push(`mission ${n}'s screen names no story event — the bible's own rule is that`
      + ' the change is named on screen rather than left as four numbers');
    // A LABEL IS NOT AN EVENT. Where a screen writes no story event the last
    // resort above takes the first sentence that is not noise, and in three of
    // the eight that is the mission's congratulation card — so the metric screen
    // read "Happy ending card - exact player copy: That was a sharp decision…"
    // with the authoring label still on the front of it. The card's own words
    // stay, because they are the bible's and they do say what was settled; the
    // label goes, and the mission is owed a story event of its own.
    const LABEL = /^\s*[A-Za-z ]*ending card[^:]*:\s*/i;
    if(LABEL.test(event)){
      event = event.replace(LABEL, '').trim();
      owes.push(`mission ${n}'s screen names no story event, so its congratulation card is standing`
        + ' in for one — the bible writes the card and not the change that earned it');
    }

    const deltaText = field('Automatic')
      // `auto` as often as `automatic`, and the shorter spelling is two whole
      // campaigns' worth of deltas.
      || (/\bauto(?:matic)?\b[^`\n]*?`([^`]+)`/i.exec(raw)?.[1] ?? '')
      || (/\bauto(?:matic)?(?:\s+bar\s+change)?\s*:?\s*([^`;\n]+)/i.exec(raw)?.[1] ?? '')
      // Last resort: the one segment that is not noise and does resolve to a
      // bar. Tried per segment rather than over the whole screen, because the
      // canonical-QA line is four numbers and the allocation line is more, and
      // reading either as a delta would score the wrong bars silently.
      || (segments.find(x => !NOISE.test(x)
          && Object.keys(readDeltas(x, bars, keyFor, letters4)).length) ?? '');
    const deltas = readDeltas(deltaText, bars, keyFor, letters4);
    // A SENTENCE IS NOT A FAILED DELTA. Several campaigns end mission 15 with
    // "any saved RP may fill remaining unlocked bars" — a rule, not a change, and
    // owing it would be a refusal nobody can act on.
    if(deltaText && /[A-Za-z]\s*[+-]?\s*\d/.test(String(deltaText)) && !Object.keys(deltas).length){
      owes.push(`mission ${n}'s automatic change "${String(deltaText).slice(0, 60)}" names no bar`
        + ' this campaign has');
    }
    return { n, target, event, deltas };
  });
  if(missions.length !== 15){
    owes.push(`${missions.length} post-mission screen(s), and a campaign has fifteen`);
  }
  return { bars, rp, bank: bank ? +(bank[1] ?? bank[2]) : undefined, missions, owes };
}

// ------------------------------------------------------------------ emit
const j = (v) => JSON.stringify(v);
function emit(theme, m){
  const bar = (b) => `    { key: ${j(b.key)}, label: ${j(b.label)}, start: ${b.start}`
    + (b.lockFrom !== undefined ? `, lockFrom: ${b.lockFrom}` : '')
    + `,\n      meaning: ${j(b.meaning)} },`;
  const mission = (x) => {
    const d = Object.entries(x.deltas).map(([k, v]) => `${k}: ${v}`).join(', ');
    return `    { target: ${x.target ?? 'undefined'},\n`
      + `      event: ${j(x.event)},\n`
      + `      deltas: {${d ? ` ${d} ` : ''}} },`;
  };
  return `// metrics.js — ${theme}'s four bars, its recovery economy and its fifteen\n`
    + `// post-mission screens.\n//\n`
    + `// GENERATED by tools/bible-metrics.mjs from the campaign bible named in\n`
    + `// books/parts/bibles.json. Edit the bible and run the tool again; an edit here\n`
    + `// is lost the next time a bible arrives, and the bible is what the prose is\n`
    + `// held to.\n//\n`
    + `// \`target\` is the mission's target time in seconds, \`event\` the story event that\n`
    + `// causes the change, and \`deltas\` the change itself. A bar reaching 100 is not a\n`
    + `// bar that is safe: only \`lockFrom\` makes it so, and only from that mission on.\n`
    + `export default {\n  bars: [\n${m.bars.map(bar).join('\n')}\n  ],\n`
    + (m.rp ? `  rp: { base: ${m.rp.base}, min: ${m.rp.min}, max: ${m.rp.max} },\n` : '')
    + (m.bank !== undefined ? `  bank: ${m.bank},\n` : '')
    + `  missions: [\n${m.missions.map(mission).join('\n')}\n  ],\n};\n`;
}


// ------------------------------------------------------------------ selftest
//
// THE GUARANTEE THIS FILE RESTS ON. Red Sand's block was typed in by hand, from
// the same bible this parser reads, before the parser existed — four bars with
// their starts and locks, the recovery formula, the bank cap, and the three
// missions somebody had time to enter. The parser was written until it
// reproduced every one of them, and that block has since been replaced by the
// generated file, so the numbers live here instead.
//
// This is not a test of the bible. It is the test that a rewrite of the reading
// has not quietly changed what the reading says.
const RED_SAND = {"bars": [{"key": "flight_ready_methane", "label": "Flight-Ready Methane", "start": 82}, {"key": "ascent_oxygen", "label": "Ascent Oxygen", "start": 88, "lockFrom": 13}, {"key": "power_reserve", "label": "Power Reserve", "start": 72}, {"key": "plant_integrity", "label": "Plant Integrity", "start": 70, "lockFrom": 10}], "rp": {"base": 11, "min": 4, "max": 12}, "bank": 30, "missions": [{"target": 360, "deltas": {"flight_ready_methane": -2, "ascent_oxygen": 0, "power_reserve": -2, "plant_integrity": 4}}, {"target": 390, "deltas": {"flight_ready_methane": 0, "ascent_oxygen": 0, "power_reserve": 3, "plant_integrity": 2}}, {"target": 390, "deltas": {"flight_ready_methane": -2, "ascent_oxygen": 0, "power_reserve": -3, "plant_integrity": 5}}]};

export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };
  const path = resolve(gamekit, BIBLES.redsand_v5);
  const got = readMetrics(readFileSync(path, 'utf8'));

  RED_SAND.bars.forEach((b, i) => {
    const g = got.bars[i];
    if(!g){ ok(false, `bar ${i + 1} was not read at all`); return; }
    for(const k of ['key', 'label', 'start', 'lockFrom']){
      ok(String(b[k] ?? '') === String(g[k] ?? ''),
        `bar ${i + 1} ${k}: hand ${b[k]} vs read ${g[k]}`);
    }
  });
  for(const k of ['base', 'min', 'max']){
    ok(RED_SAND.rp[k] === got.rp?.[k], `rp.${k}: hand ${RED_SAND.rp[k]} vs read ${got.rp?.[k]}`);
  }
  ok(RED_SAND.bank === got.bank, `bank: hand ${RED_SAND.bank} vs read ${got.bank}`);
  RED_SAND.missions.forEach((x, i) => {
    const g = got.missions[i];
    if(!g){ ok(false, `mission ${i + 1} was not read at all`); return; }
    ok(x.target === g.target, `mission ${i + 1} target: hand ${x.target} vs read ${g.target}`);
    ok(JSON.stringify(x.deltas) === JSON.stringify(g.deltas),
      `mission ${i + 1} deltas: hand ${JSON.stringify(x.deltas)} vs read ${JSON.stringify(g.deltas)}`);
  });
  // And the twelve the hand-written block never reached, which is the whole
  // reason for the tool: they must be read, not merely not contradicted.
  ok(got.missions.length === 15, `${got.missions.length} mission(s) read, and a campaign has fifteen`);
  ok(got.missions.every(m => Number.isFinite(m.target)), 'a mission was read with no target time');

  if(fails.length){
    console.error(`bible-metrics selftest: ${fails.length} failure(s)`);
    for(const f of fails) console.error('  ' + f);
    process.exitCode = 1;
  } else console.log('bible-metrics selftest: ok');
}

// ------------------------------------------------------------------ run
// Importable: the run block below only fires when this file is the entry point,
// so `readMetrics` can be exercised from a test without the CLI's usage error.
const RUN = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const check = args.includes('--check');
if(RUN && args.includes('--selftest')){ selftest(); process.exit(process.exitCode ?? 0); }
const themes = args.includes('--all')
  ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--'));
if(RUN && !themes.length){
  console.error('usage: node tools/bible-metrics.mjs <theme>|--all [--dry] [--check]');
  process.exit(2);
}

let bad = 0;
for(const theme of (RUN ? themes : [])){
  const path = BIBLES[theme];
  if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); bad++; continue; }
  const m = readMetrics(readFileSync(resolve(gamekit, path), 'utf8'));
  const owes = m.owes.length ? `  ${m.owes.length} owed` : '';
  console.log(`${theme.padEnd(22)} ${m.bars.length} bar(s) · ${m.missions.filter(x => x.target).length}`
    + `/${m.missions.length} target(s) · ${m.missions.filter(x => Object.keys(x.deltas).length).length}`
    + ` with deltas${owes}`);
  for(const o of m.owes.slice(0, 6)) console.error(`  · ${o}`);

  if(check){
    // Against the block a person wrote from the same bible. See the head of this file.
    const themePath = resolve(gamekit, `themes/${theme}/theme.js`);
    const t = (await import(pathToFileURL(themePath).href)).default;
    const said = t.metrics ?? {};
    const diff = [];
    (said.bars ?? []).forEach((b, i) => {
      const got = m.bars[i];
      if(!got){ diff.push(`bar ${i + 1} missing`); return; }
      for(const k of ['key', 'label', 'start', 'lockFrom']){
        if(String(b[k] ?? '') !== String(got[k] ?? '')) diff.push(`bar ${i + 1} ${k}: hand ${b[k]} vs read ${got[k]}`);
      }
    });
    for(const k of ['base', 'min', 'max']){
      if((said.rp ?? {})[k] !== (m.rp ?? {})[k]) diff.push(`rp.${k}: hand ${(said.rp ?? {})[k]} vs read ${(m.rp ?? {})[k]}`);
    }
    if(said.bank !== m.bank) diff.push(`bank: hand ${said.bank} vs read ${m.bank}`);
    (said.missions ?? []).forEach((x, i) => {
      const got = m.missions[i];
      if(!got){ diff.push(`mission ${i + 1} missing`); return; }
      if(x.target !== got.target) diff.push(`mission ${i + 1} target: hand ${x.target} vs read ${got.target}`);
      const a = JSON.stringify(x.deltas ?? {}), b = JSON.stringify(got.deltas ?? {});
      if(a !== b) diff.push(`mission ${i + 1} deltas: hand ${a} vs read ${b}`);
    });
    if(diff.length){ bad++; console.error(`  ${theme}: ${diff.length} difference(s) from the hand-written block`); for(const d of diff.slice(0, 12)) console.error(`    ${d}`); }
    else console.log(`  ${theme}: reproduces the hand-written block exactly`);
    continue;
  }
  if(!m.bars.length){ bad++; continue; }
  if(!dry) writeFileSync(resolve(gamekit, `themes/${theme}/metrics.js`), emit(theme, m));
}
process.exitCode = bad ? 1 : 0;
