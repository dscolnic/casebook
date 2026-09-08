// stress.mjs — the bible's STRESS board into the importer's.
//
// 22 stops across all eight bibles. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// WHAT MOVES. The bible writes a candidate as `{id, label, scores:{…},
// feasibility:"…"}` and the importer keys the scores by candidate id in a map
// of their own — `scores[candidate][criterion]` is what `instruments.js`
// renders the table from. The criteria are `{id, label, unit}` in the bible and
// `{key, label, unit}` in the importer, and `key` is the field name a score is
// read under, which is exactly what the bible's `id` is. `robustCandidate`
// becomes `robust`.
//
// WHAT DOES NOT MOVE, and it is the whole point of this file.
//
// `feasible` — the map of candidate id to the assumption value that candidate
// needs — is the field the panel actually grades on, and no bible authors a
// number for it. What they author is a sentence inside the candidate:
// `feasibility: "feasible only while uncertainty index <= 1"`. Turning that
// into a number is not a parse, it is a decision about which end of the range
// is the pessimistic one, and the bibles' own sentences answer that question
// the opposite way round from the panel: they fail at HIGH uncertainty, and
// `import-book.mjs` takes the survivors to be the candidates still feasible at
// the assumption's `min`. So a number written here would be a number nobody
// authored, on an axis nobody agreed. It goes to `owes`.
//
// `nominalWinner` is authored and deliberately dropped: the importer has no
// such field — it derives the nominal winner from `scores[id][optimiseOn]` —
// and a second copy of a fact is a second description of it.
import { num, str, pick, list } from './_shared.mjs';
import { readPayload } from './_payload.mjs';

export const FORMAT = 'STRESS';

// The placeholder trio. All 22 §7 boards answer with the same three candidates
// — "nominal best", "robust version of <the stop's own title>", "aggressive
// alternative" — scored 92/84/76 on "evidence fit" in every campaign, while the
// stop's own payload line names four real ceilings in m³/yr. The structure is
// real and worth writing; the options are not this stop's options, and a board
// whose candidates are not the question's candidates is a panel that contradicts
// the `question` printed above it. Detected, never repaired.
const PLACEHOLDER = /^(nominal best$|aggressive alternative$|robust version of )/i;

// Which end of the range the bible's own prose fails at. Only ever used to say
// so in `owes` — nothing here writes a direction.
const FAILS_HIGH = /(fails?\s+when[^.]*(>=|≥|at or above|above|over))|(only\s+while[^.]*(<=|≤|below|under))/i;

export const convert = (b) => {
  const owes = [];
  const cands = list(pick(b, 'candidates', 'options'));
  const crits = list(pick(b, 'criteria', 'criterion'));
  const a = pick(b, 'assumption', 'variable') ?? {};

  // ---- the assumption. min, max, nominal and step, or the panel has no slider.
  const asm = {};
  const alabel = str(pick(a, 'label', 'name'));
  if(alabel) asm.label = alabel; else owes.push('the stress assumption has no `label`');
  const aunit = str(pick(a, 'unit', 'units'));
  if(aunit) asm.unit = aunit;
  for(const f of ['min', 'max', 'nominal', 'step']){
    const v = num(pick(a, f, f === 'nominal' ? 'base' : f));
    if(v === undefined) owes.push(`the stress assumption has no numeric \`${f}\``);
    else asm[f] = v;
  }
  if(asm.min !== undefined && asm.max !== undefined && !(asm.max > asm.min)){
    owes.push('the stress assumption\'s `max` is not above its `min`, so the slider has no range');
  }
  if(asm.nominal !== undefined && asm.min !== undefined && asm.max !== undefined
    && (asm.nominal < asm.min || asm.nominal > asm.max)){
    owes.push('the stress assumption\'s `nominal` sits outside its own `min`–`max`');
  }

  // ---- the criteria. `key` is the bible's `id`: the field a score is read under.
  const criteria = crits.map((c) => {
    const key = str(pick(c, 'key', 'id'));
    const label = str(pick(c, 'label', 'name'));
    if(!key) owes.push('a stress criterion has no `id` to key its column on');
    if(!label) owes.push('a stress criterion has no `label`');
    return { ...(key ? { key } : {}), ...(label ? { label } : {}),
      ...(str(pick(c, 'unit', 'units')) ? { unit: str(pick(c, 'unit', 'units')) } : {}) };
  });
  if(criteria.length < 2) owes.push('the stress board has fewer than two criteria');

  // ---- the candidates, and their scores lifted into a map of their own.
  const candidates = [], scores = {}, feasible = {};
  let placeholders = 0, failsHigh = false;
  for(const c of cands){
    const id = str(pick(c, 'id', 'key'));
    const label = str(pick(c, 'label', 'name'));
    if(!id) owes.push('a stress candidate has no `id`');
    if(!label) owes.push('a stress candidate has no `label`');
    if(PLACEHOLDER.test(label)) placeholders++;
    candidates.push({ ...(id ? { id } : {}), ...(label ? { label } : {}) });

    const sc = pick(c, 'scores', 'score');
    if(sc && typeof sc === 'object'){
      const row = {};
      for(const [k, v] of Object.entries(sc)){ const n = num(v); if(n !== undefined) row[k] = n; }
      if(id && Object.keys(row).length) scores[id] = row;
    } else if(id) owes.push(`the stress candidate "${id}" carries no \`scores\``);

    // A number if a bible ever writes one; the prose sentence never becomes one.
    const f = num(pick(c, 'feasible', 'needs', 'survivesFrom'));
    if(f !== undefined && id) feasible[id] = f;
    if(FAILS_HIGH.test(str(pick(c, 'feasibility', 'feasibleWhile')))) failsHigh = true;
  }
  if(candidates.length < 3) owes.push('the stress board has fewer than three candidates');
  if(placeholders >= 2){
    owes.push('the stress candidates are the bible\'s placeholder trio — a "nominal best", a'
      + ' "robust version of" the stop\'s own title and an "aggressive alternative", scored the'
      + ' same in every campaign — so no candidate names an option the stop\'s question offers');
  }

  // ---- feasible: the field the board is graded on, and the one nobody authored.
  const topFeasible = pick(b, 'feasible');
  if(topFeasible && typeof topFeasible === 'object'){
    for(const [k, v] of Object.entries(topFeasible)){ const n = num(v); if(n !== undefined) feasible[k] = n; }
  }
  const ids = candidates.map(c => c.id).filter(Boolean);
  if(!ids.every(id => feasible[id] !== undefined)){
    owes.push('the stress board has no numeric `feasible` map — which uncertainty each candidate'
      + ' tolerates is a prose `feasibility` sentence inside the candidate, and the panel grades'
      + ' on the assumption value the candidate needs');
    if(failsHigh){
      owes.push('the stress `feasibility` sentences fail at the HIGH end of the assumption and the'
        + ' panel reads the pessimistic end as the assumption\'s `min`, so the assumption has to be'
        + ' turned round before any `feasible` number means what it says');
    }
  }

  // ---- robust, and the criterion the nominal makes look best.
  const robust = str(pick(b, 'robust', 'robustCandidate', 'robust_candidate'));
  if(!robust) owes.push('the stress board names no `robustCandidate`');
  else if(ids.length && !ids.includes(robust)){
    owes.push(`the stress \`robustCandidate\` "${robust}" is not one of the board's candidates`);
  }
  const optimiseOn = str(pick(b, 'optimiseOn', 'optimizeOn', 'optimise_on'));
  if(!optimiseOn) owes.push('the stress board has no `optimiseOn` — the criterion the nominal wins on');
  else if(ids.length && !ids.every(id => Number.isFinite((scores[id] ?? {})[optimiseOn]))){
    owes.push(`the stress board has no numeric "${optimiseOn}" score for every candidate`);
  }

  const value = {
    candidates, criteria, scores,
    ...(Object.keys(feasible).length ? { feasible } : {}),
    assumption: asm,
    ...(robust ? { robust } : {}),
    ...(optimiseOn ? { optimiseOn } : {}),
  };
  return { key: 'stress', value, owes };
};

// ------------------------------------------------------- the authored board
//
// 22 of the 129 pointer stops are STRESS, and unlike §7's placeholder trio they
// carry the campaign's own numbers: a rainfall bias from −5 % to +5 % against a
// 144,000 m³/yr recharge, a wind envelope from 4 to 12 m/s, a thermocouple bias
// of ±5 %. What they do NOT carry, in any of the eight bibles, is the half of
// the importer's board that is a scored table — no payload authors `criteria`,
// `scores` as such, or `optimiseOn`. So most of these convert to a real
// assumption and real candidates and owe the table, which is the truthful
// outcome rather than a thin one.
//
// SIX SHAPES, and they are six hands writing one board:
//
//   1. `assumptions: [{id,label,min,max,step,unit}]` — a LIST, one to six of
//      them, with `survives: true|false` on each candidate. Safety Factor,
//      Planetary Defense.
//   2. `assumption: {id,label,min,max,step,unit}` — the singular object, with a
//      per-candidate `viability: [[value, bool], …]` table. Red Sand.
//   3. `assumption: "<a bare name>"` with `range: [min,max]`, or `min`/`max`/
//      `step` loose at the top of the board. Carrying Capacity, Ground Truth.
//   4. The sweep written as PROSE — `range: "2..3 step.25"`, or the whole thing
//      in the name: `assumption: "oil shock 0..18 step6"`. Changeover, four
//      stops. The numbers in it are the bible's own and are read out of it.
//   5. Candidates as bare numbers — `candidates: [136800,144000,151200,180000]`
//      with `correct: 136800`. The number is its own id and its own label.
//   6. Candidates as sentences — `["Impact is certain", …]` with
//      `correctChoice` naming one of them in full.
//   7. `assumption_runs: [{label, probability_percent}]` — named runs with an
//      outcome each and no range at all, which is not a slider. And `settings:`
//      / `outcomes_percent:` — a swept OUTPUT table with no candidates on it.
//
// WHAT THE BOARD READER FIXED. This converter was first written against the §7
// fence's flattened copy of the payload, and half of it was recovering structure
// that copy had destroyed: negative numbers arriving as one-item sequences,
// every value keeping the comma that ended it, whole nested maps arriving as
// strings. `readBoard` now reads the stop's own payload line, which keeps its
// newlines — 15 of the 22 parse as ordinary YAML and the rest go through the
// flat grammar, which has itself learned negatives. Measured across all 22
// boards, not one artifact of that kind is left, so the code that undid them is
// gone. What is kept is the `null` guard, which is not a parser workaround but a
// real value: `{id: no_cap, value: null}` is how Carrying Capacity writes "no
// cap at all", and `Number(null)` is 0 — a cap of zero on the board.
//
// AND ONE FIELD THAT LOOKS LIKE AN ANSWER AND IS NOT. `correct` is the id of the
// candidate that survives the whole range, which is the importer's `robust` — a
// required field the panel does not print. `conclusion`, `boundary`,
// `boundary_logic` and `answerText` ARE the answer in words, and none of them is
// carried anywhere. `answerText` is not written from here either: every stop
// already carries one of its own, and a second copy of a fact is a second
// description of it.

/**
 * A scalar's text, with the quotes and the payload's own closing punctuation off.
 *
 * The flat grammar still hands back an escaped scalar quoted — `"\"ceiling <=
 * minimum credible recharge\"."` — and a value that ended the payload keeps the
 * markdown's backtick with it. A bare trailing full stop is LEFT ON, because a
 * `label` and a `conclusion` are sentences and end in one; where a full stop is
 * known not to belong — an id — it is taken off at the point of use.
 */
const text = (v) => {
  let s = String(v ?? '').trim().replace(/(?:[,;]|`+\s*\.?)+$/, '').trim();
  if((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))){
    s = s.slice(1, -1);
  }
  return s.trim();
};

/** An id, which never ends in the full stop the payload's own sentence did. */
const idText = (v) => text(v).replace(/\.+$/, '');

/**
 * A number, and `null` is not one.
 *
 * `Number(null)` is 0, and `{id: no_cap, value: null}` — Carrying Capacity's way
 * of writing "no cap at all" — would score that candidate zero rather than
 * leaving it unscored.
 */
const nval = (v) => (v === null || v === undefined ? undefined : num(v));

/**
 * The sweep, when a bible wrote it as prose rather than as fields.
 *
 * Changeover writes `range: "2..3 step.25"` and `assumption: "oil shock 0..18
 * step6"` — four stops between them, and every number in those strings is one
 * the bible chose. Reading them is not inventing a range; refusing to would
 * leave four boards with a slider that cannot move.
 */
const RANGE_PROSE = /(-?\d*\.?\d+)\s*\.\.\s*(-?\d*\.?\d+)(?:[^\d.-]*step\s*(-?\d*\.?\d+))?/i;
function proseRange(v){
  if(typeof v !== 'string') return null;
  const m = RANGE_PROSE.exec(v);
  if(!m) return null;
  const min = num(m[1]), max = num(m[2]), step = m[3] === undefined ? undefined : num(m[3]);
  if(min === undefined || max === undefined) return null;
  return { min, max, ...(step === undefined ? {} : { step }), before: v.slice(0, m.index).trim() };
}

// Fields on a candidate that are structure rather than a score on some axis.
const NOT_A_SCORE = new Set(['id', 'key', 'label', 'name', 'scores', 'score', 'survives',
  'viability', 'feasible', 'needs', 'condition', 'feasibility', 'survivesFrom', '_trailing']);

/**
 * The lowest assumption value at which a candidate still works, when the board
 * says so with assumption values rather than with a boolean.
 *
 * `import-book.mjs` takes the survivors to be the candidates whose `feasible`
 * number is at or below the assumption's `min`, so the number wanted is the
 * bottom of the band the candidate holds over. `survives: [0.15,0.20,0.25,0.30]`
 * and `viability: [[-2,false],[0,true],[2,true]]` both say that in the
 * assumption's own units, and taking the smallest of the values the bible itself
 * wrote is not a new number.
 *
 * A boolean `survives: true` does not say it — it says "everywhere", and the
 * number that would express that is one this file would have chosen. Neither
 * does an empty band: "nowhere" needs a number above the top of the range, and
 * no bible wrote one. Both come back undefined and are owed.
 */
function feasibleFrom(c){
  const authored = nval(pick(c, 'feasible', 'needs', 'survivesFrom'));
  if(authored !== undefined) return authored;
  const surv = pick(c, 'survives');
  if(Array.isArray(surv)){
    const ns = surv.map(nval).filter(n => n !== undefined);
    return ns.length ? Math.min(...ns) : undefined;
  }
  const via = pick(c, 'viability');
  if(Array.isArray(via)){
    const on = via.filter(row => Array.isArray(row) && row[1] === true)
      .map(row => nval(row[0])).filter(n => n !== undefined);
    return on.length ? Math.min(...on) : undefined;
  }
  return undefined;
}

export const convertPayload = (b, stop = {}) => {
  const owes = [];

  // ---- the assumption, in whichever of the three hands wrote it.
  const many = list(pick(b, 'assumptions')).filter(x => x && typeof x === 'object');
  if(many.length > 1){
    owes.push(`the stress board sweeps ${many.length} assumptions and the panel has one slider —`
      + ' the first is converted and the rest are not on the board');
  }
  const runs = list(pick(b, 'assumption_runs'));
  if(runs.length){
    owes.push('the stress board\'s `assumption_runs` are named runs with one outcome each, not a'
      + ' swept assumption — there is no `min`, `max` or `step` in them for a slider to move over');
  }
  const single = pick(b, 'assumption', 'variable');
  const a = many[0] ?? (single && typeof single === 'object' && !Array.isArray(single) ? single : {});

  const asm = {};
  // A bare-string assumption is a NAME, and whether it is the label depends on
  // which kind of name it is: `imported-energy weight` is what the slider is
  // called, `footprint_ha_person` is an identifier and putting it under the
  // slider prints an identifier at the player. So prose becomes the label and an
  // id owes one. Nothing about the id is written anywhere: the importer's
  // assumption has no id field.
  //
  // The name may also CARRY the sweep — `oil shock 0..18 step6` — in which case
  // the numbers belong to the slider and only what precedes them is the name.
  const named = (typeof single === 'string') ? proseRange(single) : null;
  const bare = named ? named.before : ((typeof single === 'string') ? text(single) : '');
  const alabel = text(pick(a, 'label', 'name'))
    || ((bare && /\s/.test(bare) && !bare.includes('_')) ? bare : '');
  if(alabel) asm.label = alabel;
  else if(bare){
    owes.push(`the stress assumption is named "${bare}", which is an identifier rather than the`
      + ' name a slider prints — it has no `label`');
  } else owes.push('the stress assumption has no `label`');

  const aunit = text(pick(a, 'unit', 'units'));
  if(aunit) asm.unit = aunit;

  // The range, in four hands: inside the assumption, as a two-item `range`, as
  // prose (`"2..3 step.25"`, and the name may carry it too), or loose at the top
  // of the board. `base` is read only from INSIDE the assumption — a top-level
  // `base` is a different quantity in three campaigns (144,000 m³/yr of recharge
  // beside a rainfall bias of ±5 %), and reading it as the nominal would put the
  // wrong number under the slider.
  const rangeRaw = pick(b, 'range');
  const pair = Array.isArray(rangeRaw) ? rangeRaw : [];
  const prose = proseRange(rangeRaw) ?? named ?? {};
  const ends = {
    min: nval(pair[0]) ?? prose.min,
    max: nval(pair[1]) ?? prose.max,
    step: prose.step,
  };
  for(const f of ['min', 'max', 'step']){
    const v = nval(pick(a, f)) ?? ends[f] ?? nval(pick(b, f));
    if(v === undefined) owes.push(`the stress assumption has no numeric \`${f}\``);
    else asm[f] = v;
  }
  const nominal = nval(pick(a, 'nominal', 'baseline', 'base'));
  if(nominal === undefined) owes.push('the stress assumption has no numeric `nominal`');
  else asm.nominal = nominal;

  if(asm.min !== undefined && asm.max !== undefined && !(asm.max > asm.min)){
    owes.push('the stress assumption\'s `max` is not above its `min`, so the slider has no range');
  }
  if(asm.nominal !== undefined && asm.min !== undefined && asm.max !== undefined
    && (asm.nominal < asm.min || asm.nominal > asm.max)){
    owes.push('the stress assumption\'s `nominal` sits outside its own `min`–`max`');
  }

  // ---- the criteria. No payload in the eight bibles authors any.
  const criteria = list(pick(b, 'criteria')).filter(c => c && typeof c === 'object')
    .map((c) => {
      const key = text(pick(c, 'key', 'id'));
      const label = text(pick(c, 'label', 'name'));
      if(!key) owes.push('a stress criterion has no `id` to key its column on');
      if(!label) owes.push('a stress criterion has no `label`');
      return { ...(key ? { key } : {}), ...(label ? { label } : {}),
        ...(text(pick(c, 'unit', 'units')) ? { unit: text(pick(c, 'unit', 'units')) } : {}) };
    });
  if(criteria.length < 2){
    owes.push('the stress board has fewer than two `criteria` — the scored columns the panel'
      + ' tables the candidates in are not in the payload at all');
  }

  // ---- the candidates, in four hands: a number, a sentence, or an object with
  //      either a boolean `survives` or a `viability` table.
  const rawCands = list(pick(b, 'candidates', 'options'));
  const candidates = [], scores = {}, feasible = {};
  let noLabel = 0, noId = 0, boolSurvives = 0;
  for(const c of rawCands){
    let id = '', label = '';
    if(c === null || c === undefined) continue;
    if(typeof c === 'object' && !Array.isArray(c)){
      id = idText(pick(c, 'id', 'key'));
      label = text(pick(c, 'label', 'name'));
    } else {
      // A bare number is its own id and its own label — `136800` is the ceiling
      // the question offers, written out. A bare sentence is a label and names
      // no id, and a slug made here would be an id the bible never wrote.
      // `num` is not the test here. It strips every non-digit before calling
      // `Number`, so `num('conditional')` is `Number('')`, which is 0 — and the
      // word "conditional" became a numeric candidate that was its own id.
      const t = text(c);
      if(typeof c === 'number' || /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(t)){ id = t; label = t; }
      else label = t;
    }
    if(!id) noId++;
    if(!label) noLabel++;
    candidates.push({ ...(id ? { id } : {}), ...(label ? { label } : {}) });

    // Scores. `scores: {…}` if a bible ever writes one; otherwise the numeric
    // fields the candidate carries on named axes of its own — `observed_peak_K`,
    // `actual_at_minus5_K` — which are real numbers under the names the bible
    // gave them. What is NOT written is a criterion to read them under: naming
    // the column is the bible's job and no payload does it.
    const row = {};
    const sc = pick(c, 'scores', 'score');
    if(sc && typeof sc === 'object' && !Array.isArray(sc)){
      for(const [k, v] of Object.entries(sc)){ const n = nval(v); if(n !== undefined) row[k] = n; }
    } else if(c && typeof c === 'object' && !Array.isArray(c)){
      for(const [k, v] of Object.entries(c)){
        if(NOT_A_SCORE.has(k)) continue;
        const n = nval(v);
        if(n !== undefined) row[k] = n;
      }
    }
    if(id && Object.keys(row).length) scores[id] = row;

    if(pick(c, 'survives') === true || pick(c, 'survives') === false) boolSurvives++;
    const f = feasibleFrom(c);
    if(f !== undefined && id) feasible[id] = f;
  }
  if(candidates.length < 3) owes.push('the stress board has fewer than three candidates');
  if(noId){
    owes.push(`${noId} of the ${candidates.length} stress candidates are written as a sentence with`
      + ' no `id`, and the scores map and the robust candidate are both keyed on the id');
  }
  if(noLabel){
    owes.push(`${noLabel} of the ${candidates.length} stress candidates have no \`label\` — an id`
      + ' is not the line the panel prints in the table');
  }
  const ids = candidates.map(c => c.id).filter(Boolean);
  if(ids.length && !ids.every(id => scores[id] && Object.keys(scores[id]).length)){
    owes.push('the stress board has no `scores` — the table the panel puts in front of the player'
      + ' is a number per candidate per criterion, and the payload scores nothing');
  }

  // ---- feasible. Written only when EVERY candidate yields a number, because a
  //      hole in this map is worse than no map: `import-book.mjs` reads a
  //      missing entry as -Infinity, which is a candidate that survives
  //      everything, so a partial map quietly promotes the ones it could not
  //      read into survivors.
  const whole = ids.length >= 3 && ids.every(id => feasible[id] !== undefined);
  if(!whole){
    if(boolSurvives){
      owes.push(`${boolSurvives} stress candidates say \`survives: true\`/\`false\` rather than the`
        + ' assumption value they hold down to, and the panel grades on that value — "everywhere"'
        + ' and "nowhere" are not numbers on the slider\'s axis');
    } else {
      owes.push('the stress board has no complete numeric `feasible` map — which assumption value'
        + ' each candidate holds down to is what the panel grades on, and a candidate missing from'
        + ' the map is read as one that survives everything');
    }
  }

  // ---- robust: the candidate that survives the whole range. `correct` is that
  //      candidate's id, which is the importer's required `robust` and is not a
  //      field the panel prints. `conclusion`, `boundary`, `boundary_logic` and
  //      `answerText` are the answer in words and are carried nowhere.
  //
  //      `idText` rather than `text`: four of Changeover's boards end the payload
  //      on this field, so it arrives as `conditional.` with the sentence's own
  //      full stop attached — and `conditional.` matches no candidate.
  let robust = idText(pick(b, 'robust', 'robustCandidate', 'robust_candidate', 'correct',
    'correct_plan', 'correctChoice'));
  if(robust && ids.length && !ids.includes(robust)){
    // A board whose candidates are sentences names the winner by its sentence.
    const byLabel = candidates.find(c => (c.label === robust || idText(c.label) === robust) && c.id);
    if(byLabel) robust = byLabel.id;
  }
  if(!robust) owes.push('the stress board names no candidate that survives the range');
  else if(ids.length && !ids.includes(robust)){
    owes.push(`the stress robust candidate "${robust}" is not one of the board's candidates`);
  }

  const optimiseOn = text(pick(b, 'optimiseOn', 'optimizeOn', 'optimise_on'));
  if(!optimiseOn){
    owes.push('the stress board has no `optimiseOn` — the criterion the nominal makes look best,'
      + ' which is the whole trap and the one thing no payload names');
  } else if(ids.length && !ids.every(id => Number.isFinite((scores[id] ?? {})[optimiseOn]))){
    owes.push(`the stress board has no numeric "${optimiseOn}" score for every candidate`);
  }

  if(str(b._trailing)){
    owes.push(`the stress payload has prose after the board that nothing here reads —`
      + ` "${str(b._trailing)}"`);
  }

  const value = {
    candidates, criteria, scores,
    ...(whole ? { feasible } : {}),
    assumption: asm,
    ...(robust && ids.includes(robust) ? { robust } : {}),
    ...(optimiseOn ? { optimiseOn } : {}),
  };
  return { key: 'stress', value, owes };
};

// ------------------------------------------------------- the canonical board
//
// The third round of handback answered in the GAME's schema — `**Handback 3
// canonical interaction block — STRESS:**` — and 22 stops carry one. Every
// other format's canonical board is carried through untouched, and for most of
// them that is right. STRESS's sits one rename away in two places, and both of
// them are the difference between a panel that teaches and a panel that is
// decoration:
//
//   1. A CRITERION IS KEYED `id`, AND THE COLUMN IS READ UNDER `key`.
//      `instruments.js` renders the table as `scores[candidate][criterion.key]`,
//      so a criterion with no `key` names a score field that does not exist and
//      that whole column renders as an em dash for every candidate — which is
//      exactly what Bring Them Home shipped, three columns of dashes, and is
//      44 of the complaint lines today.
//
//   2. THE SCORES ARE INSIDE THE CANDIDATE AND THE PANEL READS THEM FROM A MAP
//      OF THEIR OWN. `scores: {evidence_fit: 95, safety_margin: 20}` on the
//      candidate is the same table the importer reads as
//      `board.scores[candidateId][criterionKey]`; lifting it up is a move, not a
//      new number.
//
//   3. `validRange.min` IS `feasible`. This is the one worth the paragraph.
//      `import-book.mjs` takes the survivors to be the candidates whose
//      `feasible` number is at or below the assumption's `min`, and
//      `instruments.js` greys a candidate when the slider sits below it — so
//      `feasible[id]` is *the lowest assumption value at which this candidate
//      still works*, which is the bottom of the band the bible wrote as
//      `validRange: {min, max}`. That is the same fact under another name, in
//      the assumption's own units, and carrying it across is reading the bible.
//      Refused, the panel reports that every candidate survives the whole range
//      about a board that states exactly where each one breaks — 88 complaint
//      lines, and a slider that decides nothing.
//
// WHAT DOES NOT MOVE.
//
// `validRange.max` and `failsAt` — the OTHER end of the band. The panel's model
// is one-sided: one number per candidate and a greying rule that only looks
// downwards. `nominal_only` holding over `{min: 0, max: 0}` means "valid at the
// nominal and nowhere else", and the floor alone says only "valid from 0 up".
// There is no field to put the ceiling in, so it is owed rather than smuggled
// into the floor.
//
// `criteria[].direction` — `maximise` on every board. The importer picks the
// nominal favourite with `ids.reduce((x, y) => at(y) < at(x) ? y : x)`, which is
// the LOWEST score, and then refuses the board if that is the robust candidate.
// On a `maximise` criterion the favourite is the highest, so a board scoring
// 95 / 88 / 82 with the robust one last is refused for being exactly the trap it
// was written to be. Writing anything here would mean inventing scores; the fix
// is in `import-book.mjs`, which has to read the `direction` the bible authored.
// Owed on every board, and named in the report, because that is a shared file.
//
// `question` is the stop's own field, authored on the stop already. A second
// copy inside the board reaches nothing and is a second description of one fact.

/** The lowest assumption value the board says a candidate still holds at. */
function canonFeasible(c){
  const vr = pick(c, 'validRange', 'valid_range');
  const lo = (vr && typeof vr === 'object') ? nval(pick(vr, 'min')) : undefined;
  return lo !== undefined ? lo : feasibleFrom(c);
}

export const convertCanonical = (b, stop = {}) => {
  const owes = [];

  // ---- the assumption. Already in the importer's own field names; carried and
  //      checked, never filled in.
  const a = pick(b, 'assumption') ?? {};
  const asm = {};
  const alabel = text(pick(a, 'label', 'name'));
  if(alabel) asm.label = alabel;
  else owes.push('the stress assumption has no `label` — the name the slider prints');
  const aunit = text(pick(a, 'unit', 'units'));
  if(aunit) asm.unit = aunit;
  for(const f of ['min', 'max', 'nominal', 'step']){
    const v = nval(pick(a, f));
    if(v === undefined) owes.push(`the stress assumption has no numeric \`${f}\``);
    else asm[f] = v;
  }
  if(asm.min !== undefined && asm.max !== undefined && !(asm.max > asm.min)){
    owes.push('the stress assumption\'s `max` is not above its `min`, so the slider cannot move');
  }
  if(asm.nominal !== undefined && asm.min !== undefined && asm.max !== undefined
    && (asm.nominal < asm.min || asm.nominal > asm.max)){
    owes.push('the stress `nominal` is outside its own range');
  }

  // ---- criteria. `id` is the field name a score is read under, which is the
  //      importer's `key`. `direction` is authored and reaches nothing.
  const criteria = [];
  let maximise = 0;
  for(const c of list(pick(b, 'criteria'))){
    const key = idText(pick(c, 'key', 'id'));
    const label = text(pick(c, 'label', 'name'));
    const unit = text(pick(c, 'unit', 'units'));
    if(!key){
      owes.push('a stress criterion has no `id` naming the score field it reads — that column'
        + ' renders as an em dash for every candidate');
    }
    if(!label) owes.push(`the stress criterion "${key || '?'}" has no \`label\``);
    if(/^maximi[sz]e$/i.test(text(pick(c, 'direction')))) maximise++;
    criteria.push({ ...(key ? { key } : {}), ...(label ? { label } : {}),
      ...(unit ? { unit } : {}) });
  }
  if(criteria.length < 2){
    owes.push(`the stress board has ${criteria.length} criteria and the table needs at least two`);
  }

  // ---- candidates. The row on the board is `{id, label}`; the numbers go into
  //      `scores` and `feasible`, keyed by candidate id.
  const candidates = [], scores = {}, feasible = {};
  let ceilinged = 0;
  for(const c of list(pick(b, 'candidates'))){
    const label = text(pick(c, 'label', 'name'));
    // AN ID IS A CONVENIENCE, NOT A REQUIREMENT. The scores are keyed by it, so
    // it has to exist — but a board that names its candidates and nothing else is
    // complete, and slugging the name gives the same key every time. Dropped for
    // want of one, Whiteout's Mission 14 came through with an empty candidate
    // list and the panel reported a board with no options about a board with
    // three.
    const id = idText(pick(c, 'id'))
      || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') : '');
    if(!id){ owes.push('a stress candidate has neither an `id` nor a name to make one from'); continue; }
    if(!label) owes.push(`the stress candidate "${id}" has no \`label\` for its row`);
    candidates.push({ id, ...(label ? { label } : {}) });

    const row = {};
    const sc = pick(c, 'scores', 'score');
    for(const [k, v] of Object.entries((sc && typeof sc === 'object') ? sc : {})){
      const n = nval(v);
      if(n !== undefined) row[idText(k)] = n;
    }
    if(Object.keys(row).length) scores[id] = row;
    else owes.push(`the stress candidate "${id}" carries no numeric \`scores\``);

    const lo = canonFeasible(c);
    if(lo !== undefined) feasible[id] = lo;
    const vr = pick(c, 'validRange', 'valid_range');
    const hi = (vr && typeof vr === 'object') ? nval(pick(vr, 'max')) : undefined;
    if(hi !== undefined && asm.max !== undefined && hi < asm.max) ceilinged++;
  }
  const ids = candidates.map(c => c.id);
  if(ids.length < 3){
    owes.push(`the stress board has ${ids.length} candidates and the panel needs at least three`);
  }

  // ---- feasible, and only when EVERY candidate yields a number. A hole in this
  //      map is worse than no map: `import-book.mjs` reads a missing entry as
  //      -Infinity, so a partial map quietly promotes the candidates it could
  //      not read into survivors of the whole range.
  const whole = ids.length >= 3 && ids.every(id => feasible[id] !== undefined);
  if(!whole){
    owes.push('the stress board has no complete numeric `validRange` — which assumption value each'
      + ' candidate holds down to is what the panel grades on, and a candidate missing from the map'
      + ' is read as one that survives everything');
  }
  if(ceilinged){
    owes.push(`${ceilinged} stress candidate(s) also stop being valid ABOVE the top of their`
      + ' `validRange`, and the panel carries one number per candidate and greys only downwards —'
      + ' the ceiling the board states, and `failsAt` with it, reaches nothing');
  }

  // THE ROBUST ONE, BY WHICHEVER HANDLE THE BOARD USED. The panel grades
  // `picked.id === robust`, so it has to be an id — and a board that names its
  // candidates rather than keying them says `robust: "Backward removal"`, which
  // is the row's own label. Matched against the labels as well as the ids, the
  // way SCIENCETANK's `recommended` map already is. Written as anything else,
  // Whiteout's finale reported a robust candidate of "undefined" about a board
  // that names one in plain words.
  const named = idText(pick(b, 'robust', 'robustCandidate', 'robust_candidate', 'correct'));
  const byLabel = new Map(candidates.filter(c => c.label).map(c => [c.label, c.id]));
  const robust = ids.includes(named) ? named : (byLabel.get(named) ?? named);
  if(!robust) owes.push('the stress board names no `robust` candidate');
  else if(ids.length && !ids.includes(robust)){
    owes.push(`the stress robust candidate "${robust}" is neither an id nor a label of the board's`
      + ' candidates');
  }

  const optimiseOn = idText(pick(b, 'optimiseOn', 'optimizeOn', 'optimise_on'));
  if(!optimiseOn){
    owes.push('the stress board has no `optimiseOn` — the criterion the nominal makes look best');
  } else if(ids.length && !ids.every(id => Number.isFinite((scores[id] ?? {})[optimiseOn]))){
    owes.push(`the stress board has no numeric "${optimiseOn}" score for every candidate`);
  }
  // The shared-file half, named on the board it blocks. See the note above.
  if(maximise && optimiseOn){
    owes.push(`the stress criteria are authored \`direction: maximise\` and \`import-book.mjs\``
      + ' picks the nominal favourite by the LOWEST `optimiseOn` score, so a board whose robust'
      + ' candidate scores lowest on purpose is refused for being the trap it was written to be —'
      + ' the importer has to read the authored `direction`');
  }

  const value = {
    candidates, criteria, scores,
    ...(whole ? { feasible } : {}),
    assumption: asm,
    ...(robust && ids.includes(robust) ? { robust } : {}),
    ...(optimiseOn ? { optimiseOn } : {}),
  };
  return { key: 'stress', value, owes };
};

// ---------------------------------------------------------------- selftest
//
// The case that matters is not "a complete board converts". It is that a board
// missing the field this converter is most tempted to write comes back with the
// field named in `owes` and ABSENT from `value` — because a `feasible` map
// invented here would turn every one of the 22 stops green while grading the
// player against a number nobody chose.
if(process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())
  && process.argv.includes('--selftest')){
  const fail = [];
  const has = (o, s) => o.some(x => x.includes(s));

  // 1. The bible's own board: everything but `feasible`, which is prose.
  const bible = {
    assumption: { label: 'uncertainty index', min: 0, max: 4, nominal: 1, step: 1 },
    criteria: [{ id: 'evidence_fit', label: 'evidence fit', unit: 'score' },
      { id: 'operating_margin', label: 'operating margin', unit: 'score' }],
    candidates: [
      { id: 'nominal_plan', label: 'nominal best', scores: { evidence_fit: 92, operating_margin: 58 },
        feasibility: 'feasible only while uncertainty index <= 1' },
      { id: 'robust_plan', label: 'robust version of Set the ceiling',
        scores: { evidence_fit: 84, operating_margin: 82 },
        feasibility: 'feasible across uncertainty index 0 through 4' },
      { id: 'aggressive_plan', label: 'aggressive alternative',
        scores: { evidence_fit: 76, operating_margin: 46 },
        feasibility: 'fails when uncertainty index >= 2' }],
    optimiseOn: 'evidence_fit', nominalWinner: 'nominal_plan', robustCandidate: 'robust_plan',
  };
  const r1 = convert(bible);
  if(!has(r1.owes, 'no numeric `feasible` map')) fail.push('the missing feasible map is not owed');
  if(r1.value.feasible !== undefined) fail.push('a feasible map was invented into value');
  if(!has(r1.owes, 'turned round')) fail.push('the inverted assumption is not owed');
  if(!has(r1.owes, 'placeholder trio')) fail.push('the placeholder candidates are not owed');
  if(r1.value.robust !== 'robust_plan') fail.push('robustCandidate did not become robust');
  if(r1.value.criteria[0].key !== 'evidence_fit') fail.push('a criterion id did not become a key');
  if(r1.value.scores.robust_plan?.evidence_fit !== 84) fail.push('scores were not lifted into a map');
  if('nominalWinner' in r1.value) fail.push('nominalWinner was carried into value');

  // 2. Two boards that differ only in a field the panel reads must not convert
  //    the same. The bug this catches is a converter that keys the score map by
  //    position rather than by candidate id.
  const swapped = JSON.parse(JSON.stringify(bible));
  swapped.candidates[0].scores.evidence_fit = 55;
  if(JSON.stringify(convert(swapped).value.scores) === JSON.stringify(r1.value.scores)){
    fail.push('two boards with different scores converted identically');
  }

  // 3. A complete board — real options, a numeric feasible map — owes nothing.
  const whole = {
    assumption: { label: 'Usable storm days remaining', unit: 'days', min: 5, max: 15,
      nominal: 15, step: 1 },
    criteria: [{ id: 'science_return', label: 'Science return at nominal sky' },
      { id: 'field_evidence', label: 'Retains natural-strike measurements' }],
    candidates: [
      { id: 'rebuild', label: 'Rebuild the trailer first',
        scores: { science_return: 70, field_evidence: 1 }, feasible: 12 },
      { id: 'mixed', label: 'Keep field shots; move coupling to the hall',
        scores: { science_return: 60, field_evidence: 1 }, feasible: 5 },
      { id: 'unchanged', label: 'Continue the original field plan',
        scores: { science_return: 50, field_evidence: 1 }, feasible: 16 }],
    optimiseOn: 'science_return', robustCandidate: 'mixed',
  };
  const r3 = convert(whole);
  if(r3.owes.length) fail.push(`a complete board owed: ${r3.owes.join(' / ')}`);
  if(r3.value.feasible.mixed !== 5) fail.push('an authored feasible number was not carried');

  // 4. Take one field out of the complete board at a time; each must be named.
  const without = (path) => { const c = JSON.parse(JSON.stringify(whole)); path(c); return convert(c).owes; };
  if(!has(without(c => { delete c.assumption.step; }), '`step`')) fail.push('a missing step is not owed');
  if(!has(without(c => { delete c.robustCandidate; }), 'robustCandidate')) fail.push('a missing robust is not owed');
  if(!has(without(c => { delete c.optimiseOn; }), 'optimiseOn')) fail.push('a missing optimiseOn is not owed');
  if(!has(without(c => { c.robustCandidate = 'nobody'; }), 'not one of the board')) fail.push('a robust naming nothing is not owed');
  if(!has(without(c => { c.candidates.pop(); }), 'fewer than three')) fail.push('two candidates is not owed');
  if(!has(without(c => { c.criteria.pop(); }), 'fewer than two')) fail.push('one criterion is not owed');
  if(!has(without(c => { delete c.candidates[1].scores; }), 'carries no `scores`')) fail.push('a scoreless candidate is not owed');
  if(without(c => { delete c.candidates[1].feasible; }).length === 0) fail.push('a hole in the feasible map is not owed');

  // ------------------------------------------------ the authored board
  //
  // Same discipline, different source. Two cases carry the weight: a board that
  // says `survives: true` must NOT get a feasible number invented for it, and a
  // board whose only hole is one candidate must not emit the map at all —
  // because a partial map reads as "this one survives everything".

  // 5. Safety Factor's shape: a LIST of assumptions and boolean survival.
  const listed = {
    assumptions: [
      { id: 'wind,', label: '"Wind speed",', min: '4,', max: '12,', step: '1,', unit: 'm/s' },
      { id: 'occupied,', label: '"Occupied gondolas",', min: '6,', max: '24,', step: 6 }],
    candidates: [
      { id: 'unrestricted,', label: '"Operate to 12 m/s",', survives: false },
      { id: 'bounded,', label: '"Operate to 8 m/s with balanced loading",', survives: true },
      { id: 'mark_safe,', label: '"Treat 41 mm indication as proven safe",', survives: false }],
    correct: 'bounded',
    conclusion: 'The 8.0 m/s balanced-load envelope survives; unrestricted wind does not.',
  };
  const p1 = convertPayload(listed, {});
  if(p1.value.assumption.label !== 'Wind speed') fail.push('a quoted, comma-tailed label was not cleaned');
  if(p1.value.assumption.min !== 4 || p1.value.assumption.max !== 12) fail.push('a comma-tailed range was not read');
  if(p1.value.assumption.unit !== 'm/s') fail.push('the assumption unit was dropped');
  if(p1.value.robust !== 'bounded') fail.push('`correct` did not become `robust`');
  if(p1.value.candidates[1].label !== 'Operate to 8 m/s with balanced loading'){
    fail.push('a candidate label was not cleaned');
  }
  if(p1.value.feasible !== undefined) fail.push('a feasible map was invented from a boolean `survives`');
  if(!has(p1.owes, '`survives: true`')) fail.push('a boolean survives is not owed');
  if(!has(p1.owes, 'sweeps 2 assumptions')) fail.push('a second assumption is not owed');
  if(!has(p1.owes, 'no numeric `nominal`')) fail.push('a missing nominal is not owed');
  if(!has(p1.owes, 'fewer than two `criteria`')) fail.push('the absent criteria are not owed');
  if(!has(p1.owes, 'no `optimiseOn`')) fail.push('the absent optimiseOn is not owed');
  if(JSON.stringify(p1.value).includes('balanced-load envelope survives')){
    fail.push('the conclusion sentence was carried into value');
  }

  // 6. The negative range and the viability table, as `readBoard` now hands them
  //    over: real numbers, both signs intact. What is still refused is a list
  //    where a number belongs — the sign is never read out of a wrapper again.
  const negative = {
    assumption: { id: 'carbon_flow_bias', label: 'Carbon-intake calibration bias',
      min: -2, max: 2, step: 0.5, unit: 'percent' },
    candidates: [
      { id: 'methane_leak', label: 'Large methane leak', viability: [[-2, false], [0, false], [2, false]] },
      { id: 'low_h2', label: 'Hydrogen delivery deficiency', viability: [[-2, true], [0, true], [2, true]] },
      { id: 'dead_sensor', label: 'Dead methane sensor', viability: [[-2, false], [0, false], [2, false]] }],
    correct: 'low_h2',
  };
  const p2 = convertPayload(negative, {});
  if(p2.value.assumption.min !== -2) fail.push('a negative min was lost');
  if(p2.value.assumption.max !== 2) fail.push('a positive max beside a negative min was lost');
  if(p2.value.feasible !== undefined){
    fail.push('a feasible map was emitted with two candidates that survive nowhere');
  }
  if(!has(p2.owes, 'complete numeric `feasible`')) fail.push('the incomplete feasible map is not owed');
  const listed2 = JSON.parse(JSON.stringify(negative));
  listed2.assumption.min = [2, 3];
  if(!has(convertPayload(listed2, {}).owes, 'no numeric `min`')){
    fail.push('a list under min was read as a number');
  }
  if(convertPayload(listed2, {}).value.assumption.min !== undefined){
    fail.push('a list under min was written to the slider');
  }
  // `null` is not zero: `{id: no_cap, value: null}` must not score that candidate.
  const nulled = { ...negative, candidates: [...negative.candidates,
    { id: 'no_cap', label: 'No cap at all', value: null }] };
  if(convertPayload(nulled, {}).value.scores.no_cap !== undefined){
    fail.push('a null value was scored as zero');
  }

  // 6b. The sweep written as prose. Changeover writes `range: "2..3 step.25"`
  //     and puts the whole thing in the name — `"oil shock 0..18 step6"` — and
  //     every number in those strings is one the bible chose.
  const proseRange1 = convertPayload({ ...negative, assumption: undefined,
    range: '2..3 step.25' }, {});
  if(proseRange1.value.assumption.min !== 2 || proseRange1.value.assumption.max !== 3
    || proseRange1.value.assumption.step !== 0.25){
    fail.push('a prose `range` was not read into the slider');
  }
  const proseNamed = convertPayload({ ...negative, assumption: 'oil shock 0..18 step6' }, {});
  if(proseNamed.value.assumption.min !== 0 || proseNamed.value.assumption.max !== 18
    || proseNamed.value.assumption.step !== 6){
    fail.push('a sweep carried in the assumption name was not read');
  }
  if(proseNamed.value.assumption.label !== 'oil shock'){
    fail.push('the name in front of a prose sweep did not become the label');
  }
  // An id with digits in it and no `..` is not a range.
  const notARange = convertPayload({ ...negative, assumption: 'broad_5_88' }, {});
  if(notARange.value.assumption.min !== undefined) fail.push('an id with digits was read as a range');
  if(!has(notARange.owes, 'is an identifier')) fail.push('an id-shaped name is not owed as a label');

  // 6c. The payload's own closing full stop belongs to the markdown, not to the
  //     id: Changeover ends four boards on `correct: conditional.`
  const dotted = convertPayload({ ...negative, correct: 'low_h2.' }, {});
  if(dotted.value.robust !== 'low_h2') fail.push('a closing full stop stayed on the robust id');
  if(convertPayload({ ...negative, candidates: [...negative.candidates] }, {})
    .value.candidates[1].label !== 'Hydrogen delivery deficiency'){
    fail.push('a label was altered on the way through');
  }

  // 7. The bare-number candidates, the loose `range`, and the `base` that is a
  //    different quantity. Carrying Capacity's shape.
  const bare = {
    assumption: 'footprint_ha_person,', range: [1.8, 5], base: 144000,
    candidates: [136800, 144000, 151200, 180000], correct: 136800,
  };
  const p3 = convertPayload(bare, {});
  if(p3.value.assumption.min !== 1.8 || p3.value.assumption.max !== 5) fail.push('a loose `range` was not read');
  if(p3.value.assumption.nominal !== undefined) fail.push('a top-level `base` was read as the nominal');
  if(!has(p3.owes, 'is an identifier')) fail.push('an id-shaped assumption name is not owed as a label');
  if(p3.value.assumption.label !== undefined) fail.push('an identifier was written as the slider label');
  if(p3.value.candidates[0].id !== '136800' || p3.value.candidates[0].label !== '136800'){
    fail.push('a bare-number candidate did not become its own id and label');
  }
  if(p3.value.robust !== '136800') fail.push('a numeric `correct` did not match its candidate');
  // A word is not a number. `num('conditional')` strips every letter and returns
  // `Number('')`, which is 0, and the word became a numeric candidate with an id.
  const words = { ...bare, candidates: ['permanent tighten', 'ignore', 'conditional'], correct: 'conditional' };
  const pw = convertPayload(words, {});
  if(pw.value.candidates.some(c => c.id)) fail.push('a word candidate was read as a number and given an id');
  if(!has(pw.owes, 'no `id`')) fail.push('word candidates with no id are not owed');
  // Prose in the assumption name IS the label; an id is not.
  const prose = { ...bare, assumption: '"imported-energy weight"' };
  if(convertPayload(prose, {}).value.assumption.label !== 'imported-energy weight'){
    fail.push('a prose assumption name did not become the label');
  }

  // 8. A complete payload board owes nothing, and the feasible map derived from
  //    authored assumption values is written.
  const full = {
    assumption: { label: '"Usable storm days"', unit: 'days', min: 5, max: 15, nominal: 15, step: 1 },
    criteria: [{ id: 'science_return', label: '"Science return"' },
      { id: 'field_evidence', label: '"Natural-strike measurements"' }],
    candidates: [
      { id: 'rebuild', label: '"Rebuild the trailer first"', scores: { science_return: 70, field_evidence: 1 },
        survives: [12, 13, 14, 15] },
      { id: 'mixed', label: '"Keep field shots"', scores: { science_return: 60, field_evidence: 1 },
        survives: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { id: 'unchanged', label: '"Continue the original plan"', scores: { science_return: 50, field_evidence: 1 },
        survives: [16] }],
    optimiseOn: 'science_return', correct: 'mixed',
  };
  const p4 = convertPayload(full, {});
  if(p4.owes.length) fail.push(`a complete payload board owed: ${p4.owes.join(' / ')}`);
  if(p4.value.feasible?.mixed !== 5) fail.push('a feasible number was not taken from the survives band');
  if(p4.value.feasible?.unchanged !== 16) fail.push('a candidate surviving above the range lost its number');
  if(p4.value.scores.rebuild?.science_return !== 70) fail.push('an authored scores map was not carried');

  // 9. Put each bug back one at a time: the field must be named in owes and must
  //    not appear in value.
  const drop = (path) => { const c = JSON.parse(JSON.stringify(full)); path(c); return convertPayload(c, {}); };
  const holed = drop(c => { c.candidates[1].survives = true; });
  if(holed.value.feasible !== undefined) fail.push('one boolean candidate still emitted a feasible map');
  if(!has(holed.owes, '`survives: true`')) fail.push('one boolean candidate is not owed');
  if(!has(drop(c => { delete c.assumption.step; }).owes, '`step`')) fail.push('a missing step is not owed');
  if(!has(drop(c => { delete c.assumption.nominal; }).owes, '`nominal`')) fail.push('a missing nominal is not owed');
  if(!has(drop(c => { c.criteria.pop(); }).owes, 'fewer than two')) fail.push('one criterion is not owed');
  if(!has(drop(c => { c.candidates.pop(); }).owes, 'fewer than three')) fail.push('two candidates is not owed');
  if(!has(drop(c => { delete c.candidates[1].scores; }).owes, 'no `scores`')) fail.push('a scoreless candidate is not owed');
  if(!has(drop(c => { delete c.optimiseOn; }).owes, 'no `optimiseOn`')) fail.push('a missing optimiseOn is not owed');
  if(!has(drop(c => { c.correct = 'nobody'; }).owes, 'not one of the board')) fail.push('a robust naming nothing is not owed');
  // The markdown's own tail, not the id's: `correct: conditional`.`
  if(drop(c => { c.correct = 'mixed`.'; }).value.robust !== 'mixed'){
    fail.push('a payload\'s closing backtick and full stop stayed on an id');
  }
  if(drop(c => { c.candidates[1].label = '"It holds. Every case."'; })
    .value.candidates[1].label !== 'It holds. Every case.'){
    fail.push('a label that legitimately ends in a full stop was trimmed');
  }
  if(drop(c => { c.correct = 'nobody'; }).value.robust !== undefined) fail.push('a robust naming nothing was written');
  if(!has(drop(c => { delete c.correct; }).owes, 'names no candidate')) fail.push('a missing correct is not owed');
  if(!has(drop(c => { c._trailing = 'the sealed sheet reveals 4.2 days'; }).owes, 'reveals 4.2 days')){
    fail.push('trailing prose after the board is dropped silently');
  }
  // Two boards differing only in a number the panel reads must not convert alike.
  if(JSON.stringify(drop(c => { c.candidates[0].scores.science_return = 55; }).value.scores)
    === JSON.stringify(p4.value.scores)){
    fail.push('two payload boards with different scores converted identically');
  }

  /* ------------------------------------------- selftest: the canonical board
   *
   * The case that matters here is not "a canonical board converts" — it did
   * that before this file existed, by being copied through. It is that the two
   * renames are renames: that a criterion's `id` reaches the column the table is
   * drawn from, and that `validRange.min` reaches the number the panel greys a
   * row against. Both are checked by putting the bug back — a board whose only
   * difference is the field name must come out the same — and the third case is
   * the one this file is most tempted to write: a board with no `validRange`
   * must come back with `feasible` ABSENT and the gap named, because a map
   * invented here would turn 22 stops green while grading the player against a
   * number nobody chose.
   */
  const canon = {
    assumption: { label: 'annual rainfall bias', min: -5, max: 5, nominal: 0, step: 1, unit: '%' },
    criteria: [{ id: 'evidence_fit', label: 'fit to the stop evidence', direction: 'maximise' },
      { id: 'safety_margin', label: 'margin at the adverse end', direction: 'maximise' }],
    optimiseOn: 'evidence_fit',
    candidates: [
      { id: 'nominal_only', label: 'Use only the nominal reading',
        scores: { evidence_fit: 95, safety_margin: 20 },
        validRange: { min: 0, max: 0 }, failsAt: 5 },
      { id: 'common_extreme_mistake', label: 'Use the favorable extreme as if it were guaranteed',
        scores: { evidence_fit: 88, safety_margin: 5 },
        validRange: { min: 0, max: 5 }, failsAt: -5 },
      { id: 'robust_plan', label: 'Adopt the conservative ceiling',
        scores: { evidence_fit: 82, safety_margin: 92 },
        validRange: { min: -5, max: 5 } },
    ],
    robust: 'robust_plan',
    question: 'Move annual rainfall bias from -5% to +5%.',
  };
  const k1 = convertCanonical(canon, {});
  if(k1.key !== 'stress') fail.push('the canonical board did not come back under `stress`');
  // 1. The criterion rename. `id` in, `key` out, and `id` gone — an `id` left on
  //    the criterion is the field the panel does NOT read sitting beside the one
  //    it does.
  if(k1.value.criteria[0].key !== 'evidence_fit'){
    fail.push('a canonical criterion `id` did not become the importer\'s `key`');
  }
  if(k1.value.criteria.some(c => c.id !== undefined)) fail.push('a criterion kept its bible `id`');
  // 2. The scores move up, keyed by candidate and then by criterion key — which
  //    is the only shape `scores[candidate][criterion.key]` can be read from.
  if(k1.value.scores.nominal_only?.evidence_fit !== 95){
    fail.push('a candidate\'s own `scores` did not lift into the board\'s `scores` map');
  }
  if(k1.value.candidates.some(c => c.scores !== undefined)){
    fail.push('a candidate row kept its scores, so the same numbers are on the board twice');
  }
  if(k1.value.criteria.every(c => k1.value.scores.nominal_only?.[c.key] === undefined)){
    fail.push('no criterion key names a score field any candidate has — the whole table is dashes');
  }
  // 3. `validRange.min` IS `feasible`, and it decides the board: at the
  //    assumption's own `min` exactly one candidate may survive, and it has to be
  //    the robust one. That is the assertion, not the number.
  const surv = Object.entries(k1.value.feasible ?? {})
    .filter(([, v]) => v <= k1.value.assumption.min).map(([id]) => id);
  if(surv.length !== 1 || surv[0] !== 'robust_plan'){
    fail.push(`\`validRange.min\` did not become the feasibility the panel grades on —`
      + ` ${surv.length} candidate(s) survive the pessimistic end: ${surv.join(', ') || 'none'}`);
  }
  if(k1.value.feasible?.nominal_only !== 0) fail.push('a floor of 0 did not reach `feasible`');
  if(has(k1.owes, 'no complete numeric `validRange`')){
    fail.push('a board that states every candidate\'s valid range was owed one anyway');
  }
  // PUT THE BUG BACK, twice, and only the broken case may fail. Without the
  // renames the board is exactly what the complaint lines describe: a column of
  // em dashes and a slider on which nothing ever dies.
  const raw = JSON.parse(JSON.stringify(canon));           // the carried-through board
  if(raw.criteria.some(c => c.key !== undefined)) fail.push('the fixture already carried `key`');
  const rawSurv = raw.candidates.filter(c => (raw.feasible?.[c.id] ?? -Infinity) <= -5);
  if(rawSurv.length !== 3){
    fail.push('the carried-through board was expected to float every candidate; the fixture'
      + ' no longer reproduces the defect this converter exists for');
  }
  // 4. The field that is NOT written, and the gap that is named instead.
  const noRange = JSON.parse(JSON.stringify(canon));
  noRange.candidates.forEach(c => { delete c.validRange; });
  const k2 = convertCanonical(noRange, {});
  if(k2.value.feasible !== undefined) fail.push('a feasibility nobody wrote was invented');
  if(!has(k2.owes, 'no complete numeric `validRange`')) fail.push('a missing validRange is not owed');
  // A HOLE is not a map. One candidate short and the other two are promoted to
  // survivors of everything, which is worse than no map at all.
  const holedRange = JSON.parse(JSON.stringify(canon));
  delete holedRange.candidates[1].validRange;
  if(convertCanonical(holedRange, {}).value.feasible !== undefined){
    fail.push('a partial feasibility map was written, promoting an unread candidate to a survivor');
  }
  // 5. The ceiling the panel has nowhere to put, and the direction the importer
  //    does not read. Both authored, both reaching nothing, both named.
  if(!has(k1.owes, 'greys only downwards')) fail.push('the unrepresentable `validRange.max` is not owed');
  if(!has(k1.owes, 'direction: maximise')) fail.push('the ignored criterion `direction` is not owed');
  const flat = JSON.parse(JSON.stringify(canon));
  flat.candidates.forEach(c => { c.validRange = { min: -5, max: 5 }; });
  if(has(convertCanonical(flat, {}).owes, 'greys only downwards')){
    fail.push('a board with no ceiling below the range was owed one anyway');
  }
  // 6. The stop's own fields are not written a second time from inside the board.
  if(JSON.stringify(k1.value).includes('Move annual rainfall bias')){
    fail.push('the board\'s copy of the stop\'s `question` was carried onto the board');
  }
  if(k1.extra !== undefined) fail.push('the canonical converter wrote a top-level key of its own');
  // 7. Two boards differing only in a number the panel reads must not convert alike.
  const moved = JSON.parse(JSON.stringify(canon));
  moved.candidates[0].validRange.min = -4;
  if(JSON.stringify(convertCanonical(moved, {}).value.feasible) === JSON.stringify(k1.value.feasible)){
    fail.push('two canonical boards with different valid ranges converted identically');
  }

  // 8. THE BOARD THAT NAMES ITS CANDIDATES INSTEAD OF KEYING THEM. Whiteout's
  //    finale, cut down. Both cases below fail if either rename is put back: the
  //    rows disappear, and the robust candidate becomes "undefined".
  const namedOnly = {
    assumption: { label: 'maximum adjacent resolved run', unit: 'records',
      min: 1, max: 4, nominal: 1, step: 1 },
    criteria: [{ name: 'Removes every resolved record', key: 'correctness' },
               { name: 'Uses no more than 12 inspections', key: 'efficiency' }],
    candidates: [
      { name: 'Forward removal', scores: { correctness: 0, efficiency: 1 } },
      { name: 'Hold index', scores: { correctness: 1, efficiency: 0 } },
      { name: 'Backward removal', scores: { correctness: 1, efficiency: 1 } },
    ],
    robust: 'Backward removal',
  };
  const k8 = convertCanonical(namedOnly, {});
  if(k8.value.candidates.length !== 3){
    fail.push(`a board naming its candidates converted ${k8.value.candidates.length} of 3 rows`);
  }
  if(k8.value.candidates[0].id !== 'forward_removal'){
    fail.push(`a named candidate was keyed "${k8.value.candidates[0].id}", not its name slugged`);
  }
  if(k8.value.candidates[0].label !== 'Forward removal'){
    fail.push('a candidate\'s `name` did not become the label its row prints');
  }
  if(k8.value.robust !== 'backward_removal'){
    fail.push(`a robust candidate named by label came out "${k8.value.robust}"`);
  }
  if(has(k8.owes, 'is neither an id nor a label')){
    fail.push('a robust candidate the board names in plain words was reported as unknown');
  }
  if(k8.value.criteria[0].label !== 'Removes every resolved record'){
    fail.push('a criterion\'s `name` did not become its column heading');
  }
  // …and a robust candidate that really is on no row is still reported.
  const wrongRobust = JSON.parse(JSON.stringify(namedOnly));
  wrongRobust.robust = 'Sideways removal';
  if(!has(convertCanonical(wrongRobust, {}).owes, 'is neither an id nor a label')){
    fail.push('a robust candidate on no row was accepted');
  }

  console.log(fail.length ? `STRESS selftest FAILED:\n  ${fail.join('\n  ')}` : 'STRESS selftest ok');
  process.exit(fail.length ? 1 : 0);
}
