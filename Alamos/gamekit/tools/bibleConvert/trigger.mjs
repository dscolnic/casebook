// trigger.mjs — the bible's TRIGGER board into the importer's.
//
// 20 stops across seven of the eight bibles. See `_shared.mjs` for the contract
// every converter in this directory keeps.
//
// WHAT MOVES. The scale the player sets a line on is two blocks in the bible —
// `quantity: {label, unit}` and `scale: {min, max, step}` — and one in the
// importer, which reads `scale.label` and `scale.unit`. An anchor's `meaning`
// is the importer's `means`. The update stream is `updates: [{time, reading,
// hoursLeft}]` in the bible and `stream: [{at, value, hoursLeft}]` in the
// importer. `leadTimeHours` is the one stage's `leadHours`.
//
// WHAT DOES NOT MOVE, and it is why this file is a converter and not a rename.
//
// `rule: "fire once when the decision index is at least 75"` is the answer. It
// is the number the player is being asked for, written out in words, and
// `import-book.mjs` refuses a stage that authors `target` for exactly that
// reason. It is not carried anywhere — not as the stage's label, not as a hint.
//
// `window: {min, max}` — the band of READINGS the rule may fire on — is what
// makes the board a decision at all; without it the grade is lead time alone
// and the opening slider position scores full marks. The bible authors
// `firingWindowHours: 2`, a band of HOURS, which is a different quantity in a
// different unit and cannot be renamed into it. So the window goes to `owes`,
// and so does the stage's label, which no bible writes.
//
// `direction` is not authored either. The importer defaults it to `rising`, and
// a default silently applied is how five stops in this repo shipped as
// decoration — so it is owed rather than written, even though it is the value
// this board's own readings would have got.
import { num, str, pick, list } from './_shared.mjs';
import { readPayload } from './_payload.mjs';

export const FORMAT = 'TRIGGER';

// The placeholder scale. All 20 §7 boards answer with the same one: a
// "<the stop's own title> decision index" running 0–100 in index points, with
// the same three anchors and the same four readings 48/63/76/82 in every
// campaign, while the stop's own payload line names a real quantity in real
// units — freshwater head 0–3 m, an adjusted p-value 0–0.10. Detected here,
// never repaired: a scale whose label is not the question's quantity is a panel
// that contradicts the `question` printed above it.
const PLACEHOLDER = /decision index$/i;

export const convert = (b) => {
  const owes = [];
  const q = pick(b, 'quantity', 'measure') ?? {};
  const sc = pick(b, 'scale', 'range') ?? {};
  const ups = list(pick(b, 'updates', 'stream'));

  // ---- the scale. Its label is the name of the quantity every threshold is set
  //      on; without it the rows print a bare number.
  const scale = {};
  const label = str(pick(q, 'label', 'name')) || str(pick(sc, 'label', 'name'));
  if(label) scale.label = label;
  else owes.push('the trigger scale has no `label` — the name of the quantity the line is set on');
  const unit = str(pick(q, 'unit', 'units')) || str(pick(sc, 'unit', 'units'));
  if(unit) scale.unit = unit;
  for(const f of ['min', 'max']){
    const v = num(pick(sc, f));
    if(v === undefined) owes.push(`the trigger scale has no numeric \`${f}\``);
    else scale[f] = v;
  }
  if(scale.min !== undefined && scale.max !== undefined && !(scale.max > scale.min)){
    owes.push('the trigger scale\'s `max` is not above its `min`');
  }
  const step = num(pick(sc, 'step'));
  if(step !== undefined) scale.step = step;
  if(PLACEHOLDER.test(label)){
    owes.push('the trigger scale is the bible\'s placeholder — the stop\'s own title followed by'
      + ' "decision index", on 0–100 index points with the same readings in every campaign — so it'
      + ' is not the quantity the stop\'s question sets a rule on');
  }

  // ---- anchors: what a reading there would mean. Optional, and refused rather
  //      than trimmed when malformed, so a bad one is never quietly dropped.
  //
  //      All eight bibles write `anchors` at the TOP of the board and the
  //      importer reads it inside `scale`. Reading only `scale.anchors` dropped
  //      every anchor in all twenty stops, silently and with the count still
  //      green — which is why the emitted board was read before it was believed.
  const anchors = list(pick(sc, 'anchors', 'marks') ?? pick(b, 'anchors', 'marks')).map((a) => {
    const at = num(pick(a, 'at', 'value'));
    const means = str(pick(a, 'means', 'meaning'));
    if(at === undefined) owes.push('a trigger anchor has no numeric `at`');
    if(!means) owes.push('a trigger anchor has no `meaning`');
    return { ...(at === undefined ? {} : { at }), ...(means ? { means } : {}) };
  });
  if(anchors.length === 1) owes.push('the trigger scale has one anchor, and it takes two to say what the scale does');
  if(anchors.length > 4) owes.push('the trigger scale has more than four anchors');
  if(anchors.length) scale.anchors = anchors;

  // ---- the stream. Time runs forwards; `hoursLeft` never goes up.
  const stream = ups.map((u, i) => {
    const at = str(pick(u, 'at', 'time', 'when'));
    const value = num(pick(u, 'value', 'reading'));
    const hoursLeft = num(pick(u, 'hoursLeft', 'hours_left'));
    if(!at) owes.push(`trigger update ${i + 1} has no \`time\``);
    if(value === undefined) owes.push(`trigger update ${i + 1} has no numeric \`reading\``);
    if(hoursLeft === undefined) owes.push(`trigger update ${i + 1} has no numeric \`hoursLeft\``);
    // `update` is the line of news the player reads beside the reading. No bible
    // writes one, and the importer lets it default to empty rather than refuse.
    const text = str(pick(u, 'update', 'note', 'news'));
    return { ...(at ? { at } : {}), ...(text ? { update: text } : {}),
      ...(value === undefined ? {} : { value }), ...(hoursLeft === undefined ? {} : { hoursLeft }) };
  });
  if(stream.length < 3) owes.push('the trigger has fewer than three updates, which is not a stream');

  // ---- the one rule. One to a board: a second stage is a second decision and
  //      belongs in its own stop.
  const stages = list(pick(b, 'conditions', 'stages', 'rules'));
  if(stages.length > 1){
    owes.push(`the trigger board carries ${stages.length} stages and a board is one rule — the`
      + ' lead time, the window and both failure directions all sit in a single stage');
  }
  const st = stages[0] ?? {};
  const leadHours = num(pick(st, 'leadHours', 'leadTimeHours')) ?? num(pick(b, 'leadTimeHours', 'leadHours', 'lead_time_hours'));
  if(leadHours === undefined) owes.push('the trigger stage has no numeric `leadTimeHours`');
  const slabel = str(pick(st, 'label', 'name'));
  if(!slabel){
    owes.push('the trigger stage has no label — the bible\'s `rule` is the sentence containing the'
      + ' threshold the player is being asked for, so it cannot be the label the panel prints');
  }
  // The window is a band of READINGS. `firingWindowHours: 2` is a band of hours
  // and is not it; nothing here turns one into the other. `target` beside a
  // stage is the answer and is dropped for the same reason the `rule` is.
  const w = pick(st, 'window') ?? {};
  const wmin = num(pick(w, 'min')), wmax = num(pick(w, 'max'));
  const window = (wmin !== undefined && wmax !== undefined) ? { min: wmin, max: wmax } : null;
  if(!window){
    owes.push('the trigger stage has no `window` of readings it may fire on — `firingWindowHours` is'
      + ' a band of hours, and the panel\'s window is a band of readings on the scale, so graded on'
      + ' lead time alone the opening slider position is already a right answer');
  }
  const conditions = [{
    ...(slabel ? { label: slabel } : {}),
    ...(leadHours === undefined ? {} : { leadHours }),
    ...(window ? { window } : {}),
    ...(str(pick(st, 'owner')) ? { owner: str(pick(st, 'owner')) } : {}),
    ...(str(pick(st, 'action')) ? { action: str(pick(st, 'action')) } : {}),
  }];

  const dirWritten = str(pick(b, 'direction')).toLowerCase();
  if(!dirWritten){
    owes.push('the trigger board does not say which way the readings travel — `direction` is'
      + ' `rising` or `falling`, and an unwritten one is defaulted to rising without a word');
  } else if(dirWritten !== 'rising' && dirWritten !== 'falling'){
    owes.push(`the trigger \`direction\` is "${dirWritten}", and it is \`rising\` or \`falling\` and nothing else`);
  }

  const value = {
    scale,
    ...(dirWritten === 'rising' || dirWritten === 'falling' ? { direction: dirWritten } : {}),
    conditions,
    stream,
  };
  return { key: 'trigger', value, owes };
};

// ------------------------------------------------------- the authored board
//
// 20 of the 129 pointer stops are TRIGGER, and every one of them names a real
// quantity where §7 named "the decision index": freshwater head on 0–3 m,
// adjusted p on 0–0.10, methane purity on 90–100 %, carousel speed on
// 3.5–4.6 m/s. So the scale — the half of this board the player actually reads —
// converts, and what it converts to is this campaign's.
//
// FOUR SHAPES:
//
//   1. The compact single rule, and it is fourteen of the twenty:
//      `trigger:{decision_rule:"…",scale:{min,max,step,unit},anchors:[…],
//      objective:"…",direction:…,consequence_limit:…}`.
//   2. A `stages:` ladder of three or four thresholds, each with its own action.
//      One rule to a board, so the ladder is owed and the first stage is read.
//   3. `blind_updates:` — named samples with several readings each rather than
//      one quantity over time. There is no clock in them at all.
//   4. A `visible_prompt` and a `keyed_result` and nothing else: the stop was
//      written as a card, not as a board.
//
// AND ONE NESTING. Red Sand puts the whole board one level down, under `rule:` —
// `rule: {id, label, scale, anchors, objective, direction, consequence_limit}` —
// while every other bible writes `rule:` as the sentence containing the answer.
// So an OBJECT `rule` is the board and is merged up; a STRING `rule` is the
// answer and is dropped, exactly as before. Reading only the top level cost that
// stop its label, its scale, its unit and four labelled anchors, and the count
// stayed green while it happened, because a board made of nothing still converts.
//
// WHAT THE PAYLOAD AUTHORS THAT §7 DID NOT: the scale's `unit`, real `anchors`
// (sometimes with a `label` or an `action` on each, which is the importer's
// `means`), an `objective` — a field the importer carries and prints, and the
// panel rule's own "state the goal" — and, in nine boards, a `direction` in the
// bible's vocabulary rather than the importer's.
//
// DIRECTION IS A RENAME, NOT A GUESS, and only for the phrases below. The bibles
// write which way danger lies: `lower_is_worse` on an aquifer head that is
// falling, `at_or_above` on a speed that is rising, `smaller p is stronger
// evidence` on a p-value the rule fires under. The importer's `direction` is the
// same fact in two words. Anything not on the list — Changeover writes
// `direction: "buy bonds"`, which is an action — is owed, not mapped: a board
// declaring the wrong direction is a board where no rule means what it says, and
// that shipped five times already.
//
// WHAT STILL DOES NOT MOVE, and it is most of the grading half:
//
//   `leadHours` — no payload writes a lead time. `window` — no payload writes a
//   band of readings. Both are owed on all twenty, and both are refused for the
//   same reason as before: without the window the grade is lead time alone and
//   the opening slider position is already right.
//
//   `consequence_limit` IS authored, twelve times, and is never carried. Three
//   reasons, any one of them enough. It is on a different quantity from the
//   scale in half of them — 250 mg/L of chloride beside a scale of metres of
//   head, 20.0 degrees beside a scale of m/s. It is an object with its own unit
//   in two more. And where it IS on the scale it is the keyed threshold itself:
//   Red Sand's 97.0 % is both `consequence_limit` and the number the player is
//   being asked to commit, so writing it prints the answer on the panel.
//
//   `decision_rule`, `rule`, `correct`, `correct_threshold`, `correct_action`,
//   `keyed_result`, `tolerance` and `conclusion` are the answer, in a number or
//   in words, and reach nothing.

/**
 * A scalar's text with the separator `_payload.mjs` left on it taken off.
 *
 * The flattened parse hands a value back with the character that ended it still
 * attached — `unit: "m/s,"`, `label: "\"planned operation\","` — and the last
 * value in a payload keeps the markdown's own tail as well: a backtick, and
 * sometimes a full stop after it. A bare trailing full stop is left alone,
 * because an `objective` is a sentence and ends in one.
 */
const text = (v) => {
  let s = String(v ?? '').trim().replace(/(?:[,;]|`+\s*\.?)+$/, '').trim();
  if((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))){
    s = s.slice(1, -1);
  }
  return s.trim();
};

/**
 * A number, and `null` is not one.
 *
 * `Number(null)` is 0, and a scale bottoming out at a fabricated zero is a scale
 * the player can reach an answer on by doing nothing.
 *
 * There used to be a decode here for the negative number the flattened parse
 * turned into a one-item sequence — `min: -30` arriving as `["30,"]`. The board
 * reader now reads the stop's own payload line, and both its paths return a
 * signed number; measured across all twenty boards the shape no longer occurs,
 * so the decode is gone rather than left as a comment. A list where a number
 * belongs is now simply refused.
 */
const nval = (v) => (v === null || v === undefined ? undefined : num(v));

/**
 * Re-read a structure the reader left as a string.
 *
 * Down to ONE board in the corpus, and it is worth the six lines: Carrying
 * Capacity's aquifer trigger ends `updates=[1.4,1.1,1.0,0.8].`, and the full
 * stop after the closing bracket is enough that the value comes back as text
 * rather than as four readings. Rather than a second bracket parser here — two
 * copies of one rule drift the first time either is corrected — the string goes
 * back to the shared reader inside a mapping it can enter.
 */
const reread = (v) => {
  if(typeof v !== 'string') return v;
  const s = v.trim().replace(/[`.;,\s]+$/, '');
  if(!(s.startsWith('{') || s.startsWith('['))) return v;
  const r = readPayload(`_: {v: ${s}}`);
  return (r && r.board && r.board.v !== undefined) ? r.board.v : v;
};

// The bibles' direction vocabulary, and only theirs. Every phrase below is one
// that appears in the eight payloads; a phrase that is not here is owed.
const RISING = /^(at[_ -]?or[_ -]?above|at[_ -]?least|above|over|escalate[_ -]?above|rising|rise|higher[_ -]?is[_ -]?worse|lower[_ -]?is[_ -]?safer)\b/i;
const FALLING = /^(at[_ -]?or[_ -]?below|at[_ -]?most|below|under|falling|fall|lower[_ -]?is[_ -]?worse|higher[_ -]?is[_ -]?safer|smaller)\b/i;

export const convertPayload = (board, stop = {}) => {
  const owes = [];

  // ---- ONE LEVEL DOWN, in Red Sand only. `rule` as an OBJECT is the board
  //      itself, nested; `rule` as a STRING is the sentence containing the
  //      answer and stays where it is, unread. The inner fields win, because
  //      they are the board proper; the outer keeps what sits beside it —
  //      `blind_updates`, `fixed_companion_limits`.
  const nested = board?.rule;
  const b = (nested && typeof nested === 'object' && !Array.isArray(nested))
    ? { ...board, ...nested } : board;

  // ---- the scale. `scale: [0,3]` in one hand, `scale: {min,max,step,unit}` in
  //      the others, and the label is a separate field or nothing at all.
  const sc = reread(pick(b, 'scale', 'range')) ?? {};
  const scale = {};
  const label = text(pick(b, 'label', 'quantity_label')) || text(pick(sc, 'label', 'name'));
  if(label) scale.label = label;
  else {
    owes.push('the trigger scale has no `label` — the name of the quantity the line is set on.'
      + ' The payload gives the units and the range and never says what is being measured, so'
      + ' every row would print a bare number');
  }
  const unit = text(pick(sc, 'unit', 'units')) || text(pick(b, 'unit', 'units'));
  if(unit) scale.unit = unit;
  const ends = Array.isArray(sc) ? { min: nval(sc[0]), max: nval(sc[1]) } : {};
  for(const f of ['min', 'max']){
    const v = (Array.isArray(sc) ? ends[f] : nval(pick(sc, f))) ?? nval(pick(b, f));
    if(v === undefined) owes.push(`the trigger scale has no numeric \`${f}\``);
    else scale[f] = v;
  }
  if(scale.min !== undefined && scale.max !== undefined && !(scale.max > scale.min)){
    owes.push('the trigger scale\'s `max` is not above its `min`');
  }
  const step = Array.isArray(sc) ? undefined : nval(pick(sc, 'step'));
  if(step !== undefined) scale.step = step;

  // ---- anchors. Bare numbers in six boards and `{value, label|action}` in the
  //      rest; `label` and `action` are both what a reading there would MEAN,
  //      which is the importer's `means`. A bare number has an `at` and no
  //      meaning, and a meaning written here would be this file's sentence on
  //      the player's panel.
  const rawAnchors = list(reread(pick(sc, 'anchors', 'marks')) ?? reread(pick(b, 'anchors', 'marks')));
  let mute = 0;
  const anchors = rawAnchors.map((a) => {
    const at = (a !== null && typeof a === 'object') ? nval(pick(a, 'at', 'value')) : nval(a);
    const means = (a !== null && typeof a === 'object')
      ? text(pick(a, 'means', 'meaning', 'label', 'action')) : '';
    if(at === undefined) owes.push('a trigger anchor has no numeric `at`');
    if(!means) mute++;
    return { ...(at === undefined ? {} : { at }), ...(means ? { means } : {}) };
  }).filter(a => a.at !== undefined || a.means);
  if(mute){
    owes.push(`${mute} of the ${anchors.length} trigger anchors are a bare number with no`
      + ' `meaning` — an anchor is what a reading there would mean, and the number alone is the'
      + ' scale saying it again');
  }
  if(anchors.length === 1) owes.push('the trigger scale has one anchor, and it takes two to say what the scale does');
  if(anchors.length > 4){
    owes.push(`the trigger scale has ${anchors.length} anchors and the panel takes four — past`
      + ' that it is a table the player reads instead of a scale they reason about');
  }
  if(scale.min !== undefined && scale.max !== undefined
    && anchors.some(a => a.at !== undefined && (a.at < scale.min || a.at > scale.max))){
    owes.push(`a trigger anchor sits outside the scale's own ${scale.min}–${scale.max} — the`
      + ' anchors and the scale are not measuring the same quantity');
  }
  // AND ONE THING THE ANCHORS DO THAT NOBODY MEANT. The pointer's own rule is
  // "state the goal, never the keyed answer", and five of these boards put an
  // anchor exactly on the threshold the player is being asked to commit — Red
  // Sand's 97.0 % anchored "ACCEPT MINIMUM", Ground Truth's 5.0 kV/m, Carrying
  // Capacity's 1.0 m. The anchors are authored, so they are carried; what is
  // owed is that one of them prints the answer before the slider is touched.
  const keyed = nval(pick(b, 'correct', 'correct_threshold'))
    ?? nval(pick(b, 'consequence_limit'))
    ?? nval(pick(pick(b, 'consequence_limit') ?? {}, 'value'));
  if(keyed !== undefined && anchors.some(a => a.at === keyed)){
    owes.push(`a trigger anchor sits exactly on ${keyed}, which is the threshold this board keys`
      + ' on — the anchors print the answer on the panel before the player moves the slider, and'
      + ' the rule these boards are converted under is to state the goal and never the target');
  }
  if(anchors.length) scale.anchors = anchors;

  // ---- the stream. `updates: [1.4,1.1,1.0,0.8]` is four readings and no clock:
  //      the reading is authored, the time it arrives at and the hours left are
  //      not, and the hours left are what the whole format grades on.
  const rawStream = list(reread(pick(b, 'updates', 'stream')));
  const blind = list(reread(pick(b, 'blind_updates')));
  const rows = rawStream.length ? rawStream : blind;
  if(!rawStream.length && blind.length){
    owes.push(`the trigger readings are \`blind_updates\` — ${blind.length} named samples with`
      + ' several quantities each, not one quantity over time, so no row carries a time or an'
      + ' hours-left for the lead time to be measured against');
  }
  let noAt = 0, noValue = 0, noHours = 0, empty = 0;
  const stream = rows.map((u) => {
    const isObj = u !== null && typeof u === 'object' && !Array.isArray(u);
    const at = isObj ? text(pick(u, 'at', 'time', 'when')) : '';
    const value = isObj ? nval(pick(u, 'value', 'reading')) : nval(u);
    const hoursLeft = isObj ? nval(pick(u, 'hoursLeft', 'hours_left')) : undefined;
    const update = isObj ? text(pick(u, 'update', 'note', 'news')) : '';
    if(!at) noAt++;
    if(value === undefined) noValue++;
    if(hoursLeft === undefined) noHours++;
    const row = { ...(at ? { at } : {}), ...(update ? { update } : {}),
      ...(value === undefined ? {} : { value }), ...(hoursLeft === undefined ? {} : { hoursLeft }) };
    if(!Object.keys(row).length) empty++;
    return row;
  }).filter(r => Object.keys(r).length);
  if(empty){
    owes.push(`${empty} trigger updates carry no reading, no time and no hours left — nothing in`
      + ' them belongs on a stream row');
  }
  if(stream.length < 3) owes.push('the trigger has fewer than three updates, which is not a stream');
  if(noAt) owes.push(`${noAt} of the ${rows.length} trigger updates have no \`time\` — the readings`
    + ' are authored as a bare list and nothing says when each arrives');
  if(noValue) owes.push(`${noValue} of the ${rows.length} trigger updates have no numeric \`reading\``);
  if(noHours){
    owes.push(`${noHours} of the ${rows.length} trigger updates have no numeric \`hoursLeft\` —`
      + ' the hours left when a reading arrives is what a lead time is compared against, so'
      + ' without it the board cannot be graded at all');
  }

  // ---- the one rule.
  const stages = list(reread(pick(b, 'stages', 'conditions', 'rules')))
    .filter(x => x !== null && typeof x === 'object');
  if(stages.length > 1){
    owes.push(`the trigger board carries ${stages.length} stages and a board is one rule — the`
      + ' lead time, the window and both failure directions all sit in a single stage, and a'
      + ' second stage is a second decision that belongs in its own stop');
  }
  const st = stages[0] ?? {};
  const leadHours = nval(pick(st, 'leadHours', 'leadTimeHours'))
    ?? nval(pick(b, 'leadTimeHours', 'leadHours', 'lead_time_hours'));
  if(leadHours === undefined){
    owes.push('the trigger stage has no numeric `leadTimeHours` — how far ahead the action still'
      + ' has to be possible, which is the reason the rule is written before the readings');
  }
  // The stage's own name. `action` is what is done when it fires, which is what
  // the panel prints on the stage; `threshold` and `decision_rule` are the
  // number the player is being asked for, written out, and are not labels.
  const slabel = text(pick(st, 'label', 'name', 'action'));
  if(!slabel){
    owes.push('the trigger stage has no label — the payload writes the rule as a sentence'
      + ' containing the threshold the player is being asked to commit, so it cannot be the'
      + ' label the panel prints');
  }
  const w = reread(pick(st, 'window')) ?? {};
  const wmin = nval(pick(w, 'min')), wmax = nval(pick(w, 'max'));
  const window = (wmin !== undefined && wmax !== undefined) ? { min: wmin, max: wmax } : null;
  if(!window){
    owes.push('the trigger stage has no `window` of readings it may fire on — no payload writes'
      + ' one, and graded on lead time alone the opening slider position is already a right answer');
  }
  const conditions = [{
    ...(slabel ? { label: slabel } : {}),
    ...(leadHours === undefined ? {} : { leadHours }),
    ...(window ? { window } : {}),
    ...(text(pick(st, 'owner')) ? { owner: text(pick(st, 'owner')) } : {}),
  }];

  // ---- direction, in the bible's words rather than the importer's.
  const dirWritten = text(pick(b, 'direction'));
  let direction = '';
  if(!dirWritten){
    owes.push('the trigger board does not say which way the readings travel — `direction` is'
      + ' `rising` or `falling`, and an unwritten one is defaulted to rising without a word');
  } else if(RISING.test(dirWritten)) direction = 'rising';
  else if(FALLING.test(dirWritten)) direction = 'falling';
  else {
    owes.push(`the trigger \`direction\` is "${dirWritten}", which names an action rather than`
      + ' which way the readings travel — the panel needs `rising` or `falling`, and a board'
      + ' declaring the wrong one is a board on which no rule means what it says');
  }

  // The goal, which the panel is required to state and the importer carries.
  const objective = text(pick(b, 'objective'));

  if(pick(b, 'consequence_limit') !== undefined){
    owes.push('the trigger `consequence_limit` is authored and is not carried — it is on a'
      + ' different quantity from the scale in half the payloads, an object with its own unit in'
      + ' others, and where it does sit on the scale it is the threshold the player is being'
      + ' asked to commit, so writing it would print the answer on the panel');
  }
  if(str(b._trailing)){
    owes.push(`the trigger payload has prose after the board that nothing here reads —`
      + ` "${str(b._trailing)}"`);
  }

  const value = {
    scale,
    ...(direction ? { direction } : {}),
    conditions,
    stream,
    ...(objective ? { objective } : {}),
  };
  return { key: 'trigger', value, owes };
};

// ------------------------------------------------------- the canonical board
//
// 20 stops carry a `**Handback 3 canonical interaction block — TRIGGER:**`, and
// all 20 are the same shape. It is much closer to the game's schema than either
// earlier round — the scale is real, the anchors have `at`/`means`, the readings
// have `at`/`value`/`hoursLeft`, a stage already carries `label`, `leadHours`
// and a `window: {min, max}` of readings, which is the field no other round of
// handback ever authored. What it does not have is where the game keeps three of
// those things.
//
// THREE RENAMES, and the live complaints are all downstream of them.
//
//   1. `updates` IS `stream`. Its rows already say `{at, value, hoursLeft}`, so
//      only the name of the list moves. Unread, the board has no readings at
//      all, which is where "a trigger needs at least three updates — one update
//      is not a stream" comes from, and where the third complaint comes from
//      too: with no readings `Math.max(...[])` is -Infinity, so the panel
//      reports "a stream declared rising whose highest reading is -Infinity"
//      about a board carrying four readings that climb.
//
//   2. `anchors` sits at the TOP of the board and the importer reads it inside
//      `scale`. The same nesting cost every anchor in all twenty stops once
//      before, silently, with the converted count still green.
//
//   3. `stages` IS `conditions`, field for field.
//
// AND ONE THAT IS NOT A RENAME. A board is one rule, and every canonical board
// authors two stages: `watch` — "Increase monitoring", 24 h of lead, the band
// above the line — and `act` — "Take the protective action", 12 h of lead, the
// band the protective action is taken in. The panel has one slider and one
// commit; a second stage is a second decision and belongs in its own stop, which
// is the importer's own rule and the reason it refuses a board with two.
//
// So one rung is carried and the rest are owed by name, and the rung is the LAST
// one. The ladder runs in escalation order in all twenty — watch, then act — and
// the rung where something is actually done is the one the format grades: decide
// now at what reading you would act, far enough ahead that the action can still
// happen. A watch level is a reading at which you keep reading. Carrying the
// first rung instead is not the neutral choice it looks like: `watch`'s window
// runs to the top of the scale on every one of these boards, so sliding the
// threshold to the end of its travel — the position the slider is already in —
// satisfies it, which is the one thing the importer says a board may never do.
//
// WHAT DOES NOT MOVE.
//
// `rule` — "Commit the threshold before the stream appears; act only when a
// reading enters the action window with enough lead time" — is the panel's rule
// of play, written identically on all twenty boards. It is not this stop's
// objective and it is not a hint; the importer has no field for it.
//
// `start` — the opening reading. Nothing in `instruments.js` reads a start; the
// plot opens on the first row of the stream, which is the same fact.
//
// `question` is the stop's own field and is already authored on the stop. A
// second copy inside the board reaches nothing.

export const convertCanonical = (b, stop = {}) => {
  const owes = [];

  // ---- the scale. Already the importer's field names.
  const sc = pick(b, 'scale') ?? {};
  const scale = {};
  const label = text(pick(sc, 'label', 'name'));
  if(label) scale.label = label;
  else {
    owes.push('the trigger scale has no `label` — the name of the quantity every threshold is set'
      + ' on, and the rows print a bare number without it');
  }
  const unit = text(pick(sc, 'unit', 'units'));
  if(unit) scale.unit = unit;
  for(const f of ['min', 'max']){
    const v = nval(pick(sc, f));
    if(v === undefined) owes.push(`the trigger scale has no numeric \`${f}\``);
    else scale[f] = v;
  }
  if(scale.min !== undefined && scale.max !== undefined && !(scale.max > scale.min)){
    owes.push('the trigger scale\'s `max` is not above its `min`');
  }
  const step = nval(pick(sc, 'step'));
  if(step !== undefined) scale.step = step;

  // ---- anchors, from the top of the board into the scale the importer reads
  //      them from. `at` and `means` are already the importer's names.
  const anchors = [];
  for(const a of list(pick(sc, 'anchors') ?? pick(b, 'anchors'))){
    const at = nval(pick(a, 'at', 'value'));
    const means = text(pick(a, 'means', 'meaning'));
    if(at === undefined) owes.push('a trigger anchor has no numeric `at`');
    else if(scale.min !== undefined && scale.max !== undefined
      && (at < scale.min || at > scale.max)){
      owes.push(`a trigger anchor sits at ${at}, outside the scale's own`
        + ` ${scale.min}–${scale.max} — the player is asked to reason from a reading they`
        + ' cannot reach');
    }
    if(!means) owes.push('a trigger anchor has no `means` saying what a reading there would mean');
    anchors.push({ ...(at === undefined ? {} : { at }), ...(means ? { means } : {}) });
  }
  if(anchors.length === 1){
    owes.push('the trigger scale has one anchor, and it takes two readings to say what a scale does');
  }
  if(anchors.length > 4) owes.push('the trigger scale has more than four anchors');
  if(anchors.length) scale.anchors = anchors;

  // ---- the stream. `updates` is the list's name in the bible and `stream` is
  //      its name in the game; every field inside a row already matches.
  const stream = [];
  list(pick(b, 'updates', 'stream')).forEach((u, i) => {
    const at = text(pick(u, 'at', 'time', 'when'));
    const value = nval(pick(u, 'value', 'reading'));
    const hoursLeft = nval(pick(u, 'hoursLeft', 'hours_left'));
    if(!at) owes.push(`trigger update ${i + 1} has no \`at\``);
    if(value === undefined) owes.push(`trigger update ${i + 1} has no numeric \`value\``);
    if(hoursLeft === undefined) owes.push(`trigger update ${i + 1} has no numeric \`hoursLeft\``);
    const note = text(pick(u, 'update', 'note', 'news'));
    stream.push({ ...(at ? { at } : {}), ...(note ? { update: note } : {}),
      ...(value === undefined ? {} : { value }),
      ...(hoursLeft === undefined ? {} : { hoursLeft }) });
  });
  if(stream.length < 3){
    owes.push(`the trigger board carries ${stream.length} update(s), and fewer than three is not`
      + ' a stream');
  }
  if(stream.some((x, i) => i > 0 && x.hoursLeft !== undefined
    && stream[i - 1].hoursLeft !== undefined && x.hoursLeft > stream[i - 1].hoursLeft)){
    owes.push('the trigger stream does not run forwards — `hoursLeft` goes up, which is a stream'
      + ' where waiting buys lead time');
  }

  // ---- the one rule. See the note above for why it is the last rung and why
  //      the others are owed rather than merged.
  const stages = list(pick(b, 'stages', 'conditions', 'rules'));
  const st = stages[stages.length - 1] ?? {};
  if(stages.length > 1){
    const dropped = stages.slice(0, -1)
      .map(s => `"${text(pick(s, 'label', 'name')) || text(pick(s, 'id')) || '?'}"`).join(', ');
    owes.push(`the trigger board is a ladder of ${stages.length} stages and a board is one rule —`
      + ` ${dropped} ${stages.length > 2 ? 'reach' : 'reaches'} nothing, and a second action is a`
      + ' second decision that belongs in its own stop');
  }
  const slabel = text(pick(st, 'label', 'name'));
  if(!slabel) owes.push('the trigger stage has no `label` for the panel to print');
  const sid = text(pick(st, 'id')).replace(/\.+$/, '');
  const leadHours = nval(pick(st, 'leadHours', 'leadTimeHours'));
  if(leadHours === undefined){
    owes.push('the trigger stage has no numeric `leadHours` — how far ahead the action still has'
      + ' to be possible');
  } else if(!(leadHours > 0)) owes.push('the trigger stage\'s `leadHours` is not above zero');
  const w = pick(st, 'window') ?? {};
  const wmin = nval(pick(w, 'min')), wmax = nval(pick(w, 'max'));
  const window = (wmin !== undefined && wmax !== undefined) ? { min: wmin, max: wmax } : null;
  if(!window){
    owes.push('the trigger stage has no `window: {min, max}` of readings it may fire on — graded'
      + ' on lead time alone, the opening slider position is already a right answer');
  }
  const conditions = stages.length ? [{
    ...(sid ? { id: sid } : {}),
    ...(slabel ? { label: slabel } : {}),
    ...(leadHours === undefined ? {} : { leadHours }),
    ...(window ? { window } : {}),
    ...(text(pick(st, 'owner')) ? { owner: text(pick(st, 'owner')) } : {}),
    ...(text(pick(st, 'action')) ? { action: text(pick(st, 'action')) } : {}),
  }] : [];
  if(!stages.length) owes.push('the trigger board carries no stage — there is no rule to commit');

  // ---- direction. The canonical blocks write it in the importer's own two
  //      words, so this is a carry and a check, never a mapping.
  const dirWritten = text(pick(b, 'direction')).toLowerCase();
  let direction = '';
  if(!dirWritten){
    owes.push('the trigger board does not say which way the readings travel — `direction` is'
      + ' `rising` or `falling`, and an unwritten one is defaulted to rising without a word');
  } else if(dirWritten === 'rising' || dirWritten === 'falling') direction = dirWritten;
  else {
    owes.push(`the trigger \`direction\` is "${dirWritten}" — it is \`rising\` or \`falling\` and`
      + ' nothing else, and a board declaring the wrong one is a board on which no rule means'
      + ' what it says');
  }

  const objective = text(pick(b, 'objective'));

  const value = {
    scale,
    ...(direction ? { direction } : {}),
    conditions,
    stream,
    ...(objective ? { objective } : {}),
  };
  return { key: 'trigger', value, owes };
};

// ---------------------------------------------------------------- selftest
//
// The case that matters is the window. A `window: { min, max }` guessed from the
// stream — say, the readings either side of the number in `rule` — would turn
// all 20 stops green and grade every player against a line this tool chose. So
// the test is that the window is named in `owes` and is ABSENT from `value`, and
// that the threshold in `rule` reaches nothing that gets written.
if(process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())
  && process.argv.includes('--selftest')){
  const fail = [];
  const has = (o, s) => o.some(x => x.includes(s));
  const json = (v) => JSON.stringify(v);

  // 1. The bible's own board.
  const bible = {
    quantity: { label: 'Write the aquifer trigger decision index', unit: 'index points' },
    scale: { min: 0, max: 100, step: 5 },
    // Top level, as every bible writes it, and not inside `scale` where the
    // importer reads it. Nesting it in this fixture is what hid the dropped
    // anchors the first time.
    anchors: [{ at: 40, meaning: 'continue monitoring' }, { at: 60, meaning: 'prepare action' },
      { at: 75, meaning: 'the committed rule fires' }],
    rule: 'fire once when the decision index is at least 75',
    leadTimeHours: 6, firingWindowHours: 2,
    updates: [{ time: 'T-10 h', reading: 48, hoursLeft: 10 }, { time: 'T-7 h', reading: 63, hoursLeft: 7 },
      { time: 'T-6 h', reading: 76, hoursLeft: 6 }, { time: 'T-4 h', reading: 82, hoursLeft: 4 }],
  };
  const r1 = convert(bible);
  if(r1.value.scale.anchors?.length !== 3) fail.push('the board\'s top-level anchors were dropped');
  if(!has(r1.owes, 'no `window`')) fail.push('the missing window is not owed');
  if(r1.value.conditions.some(c => c.window)) fail.push('a window was invented into value');
  if(!has(r1.owes, 'no label')) fail.push('the missing stage label is not owed');
  if(r1.value.conditions.some(c => c.label)) fail.push('a stage label was invented into value');
  if(json(r1.value).includes('75') && !json(r1.value.scale.anchors).includes('75')){
    fail.push('the threshold in `rule` reached a written field');
  }
  if(json(r1.value).includes('fire once')) fail.push('the rule sentence was carried into value');
  if(!has(r1.owes, 'which way the readings travel')) fail.push('the missing direction is not owed');
  if(r1.value.direction !== undefined) fail.push('a direction was invented into value');
  if(!has(r1.owes, 'placeholder')) fail.push('the placeholder scale is not owed');
  if(r1.value.scale.label !== bible.quantity.label) fail.push('the quantity label did not become the scale label');
  if(r1.value.scale.unit !== 'index points') fail.push('the quantity unit did not become the scale unit');
  if(r1.value.stream[0].at !== 'T-10 h' || r1.value.stream[0].value !== 48){
    fail.push('an update did not become a stream row');
  }
  if(r1.value.scale.anchors?.[0]?.means !== 'continue monitoring') fail.push('an anchor meaning did not become `means`');
  if(r1.value.conditions[0].leadHours !== 6) fail.push('the authored lead time was dropped');

  // 2. Two boards that differ only in a field the panel reads must not convert
  //    the same — the bug this catches is a stream built from the index rather
  //    than from the row.
  const moved = JSON.parse(json(bible));
  moved.updates[2].reading = 51;
  if(json(convert(moved).value.stream) === json(r1.value.stream)){
    fail.push('two boards with different readings converted identically');
  }

  // 3. A complete board owes nothing. Everything the importer needs, authored:
  //    a real quantity, a direction, a stage with a label, a lead time and a
  //    window of readings.
  const whole = {
    quantity: { label: 'Freshwater head at the wellfield', unit: 'm' },
    scale: { min: 0, max: 3, step: 0.1,
      anchors: [{ at: 0.5, meaning: 'the salt front is already in the field' },
        { at: 1.5, meaning: 'pumping is comfortable' }] },
    direction: 'falling',
    leadTimeHours: 6,
    conditions: [{ label: 'Stop pumping', leadHours: 6, window: { min: 0.9, max: 1.2 } }],
    updates: [{ time: '06:00', reading: 1.4, hoursLeft: 10, update: 'Overnight recovery holds' },
      { time: '09:00', reading: 1.1, hoursLeft: 7, update: 'Head slips through the morning draw' },
      { time: '10:00', reading: 1.0, hoursLeft: 6, update: 'The line is reached' },
      { time: '12:00', reading: 0.8, hoursLeft: 4, update: 'Chloride climbs at the south well' }],
  };
  const r3 = convert(whole);
  if(r3.owes.length) fail.push(`a complete board owed: ${r3.owes.join(' / ')}`);
  if(r3.value.conditions[0].window.max !== 1.2) fail.push('an authored window was not carried');
  if(r3.value.conditions[0].label !== 'Stop pumping') fail.push('an authored stage label was not carried');
  if(r3.value.direction !== 'falling') fail.push('an authored direction was not carried');
  if(r3.value.stream[0].update !== 'Overnight recovery holds') fail.push('an authored update line was dropped');

  // 4. Take one field out at a time; each must be named.
  const without = (path) => { const c = JSON.parse(json(whole)); path(c); return convert(c).owes; };
  if(!has(without(c => { delete c.scale.max; }), '`max`')) fail.push('a missing scale max is not owed');
  if(!has(without(c => { delete c.quantity.label; }), 'no `label`')) fail.push('a missing scale label is not owed');
  if(!has(without(c => { delete c.leadTimeHours; delete c.conditions[0].leadHours; }), 'leadTimeHours')){
    fail.push('a missing lead time is not owed');
  }
  if(without(c => { delete c.leadTimeHours; }).length) fail.push('a stage`s own leadHours was not read');
  if(!has(without(c => { delete c.conditions[0].window.max; }), 'no `window`')) fail.push('a half window is not owed');
  if(!has(without(c => { c.conditions.push({ label: 'Second call', leadHours: 2, window: { min: 0.5, max: 0.7 } }); }),
    'is one rule')) fail.push('a two-stage ladder is not owed');
  if(!has(without(c => { c.updates.length = 2; }), 'fewer than three updates')) fail.push('a two-update stream is not owed');
  if(!has(without(c => { delete c.updates[1].hoursLeft; }), 'hoursLeft')) fail.push('a missing hoursLeft is not owed');
  if(!has(without(c => { delete c.scale.anchors[0].meaning; }), 'no `meaning`')) fail.push('a meaningless anchor is not owed');
  if(!has(without(c => { c.direction = 'downwards'; }), 'and nothing else')) fail.push('a bad direction is not owed');

  // ------------------------------------------------ the authored board
  //
  // Two things carry the weight here. The threshold is written into this board
  // three times over — in `decision_rule`, in `consequence_limit` and in
  // `correct` — and none of the three may reach a written field. And the
  // direction is a rename of a closed list of phrases: a phrase off the list
  // must be owed rather than mapped, because a board declaring the wrong
  // direction is one where no rule means what it says.

  // 5. The compact single rule, exactly as `_payload.mjs` hands it over: every
  //    value still carrying the comma that ended it, and the last one carrying
  //    the markdown's backtick.
  const compact = {
    decision_rule: '"RISING FAST if measured 10:15 level >= committed tangent prediction",',
    scale: '{min:4.18,max:4.28,step:0.001,unit:"m"},',
    anchors: '[4.20,4.23,4.26],',
    objective: '"detect a rise at least as fast as current derivative",',
    direction: '"at or above",',
    consequence_limit: 'do not change release until warning review`.',
    _trailing: 'update reveals `4.235 m`.',
  };
  const c1 = convertPayload(compact, {});
  if(c1.value.scale.min !== 4.18 || c1.value.scale.max !== 4.28 || c1.value.scale.step !== 0.001){
    fail.push('a comma-tailed scale block was not re-read');
  }
  if(c1.value.scale.unit !== 'm') fail.push('the scale unit was dropped');
  if(c1.value.scale.anchors.length !== 3) fail.push('a comma-tailed anchor list was not re-read');
  if(c1.value.scale.anchors[0].at !== 4.2) fail.push('a bare anchor did not become an `at`');
  if(c1.value.scale.anchors.some(a => a.means)) fail.push('an anchor meaning was invented');
  if(!has(c1.owes, 'bare number with no')) fail.push('meaningless anchors are not owed');
  if(c1.value.direction !== 'rising') fail.push('"at or above" was not read as rising');
  if(c1.value.objective !== 'detect a rise at least as fast as current derivative'){
    fail.push('the authored objective — the goal the panel must state — was dropped');
  }
  if(json(c1.value).includes('RISING FAST')) fail.push('the decision rule sentence was carried into value');
  if(json(c1.value).includes('consequenceLimit')) fail.push('a consequence limit was carried into value');
  if(!has(c1.owes, '`consequence_limit` is authored and is not carried')){
    fail.push('the dropped consequence limit is not owed');
  }
  if(!has(c1.owes, 'no `window`')) fail.push('the missing window is not owed');
  if(c1.value.conditions.some(x => x.window)) fail.push('a window was invented into value');
  if(!has(c1.owes, 'no numeric `leadTimeHours`')) fail.push('the missing lead time is not owed');
  if(!has(c1.owes, 'no label')) fail.push('the missing stage label is not owed');
  if(!has(c1.owes, 'no `label`')) fail.push('the missing scale label is not owed');
  if(!has(c1.owes, 'fewer than three updates')) fail.push('an empty stream is not owed');
  if(!has(c1.owes, 'update reveals `4.235 m`')) fail.push('trailing prose after the board is dropped silently');

  // 6. Direction is a closed list. An action is not a direction.
  const dir = (d) => convertPayload({ ...compact, direction: d }, {});
  for(const [d, want] of [['lower_is_worse', 'falling'], ['escalate_above', 'rising'],
    ['lower_is_safer', 'rising'], ['higher_is_safer', 'falling'], ['at_or_above', 'rising'],
    ['"smaller p is stronger evidence"', 'falling'], ['"at least"', 'rising'],
    ['"at or above zero"', 'rising']]){
    if(dir(d).value.direction !== want) fail.push(`the bible's "${d}" did not read as ${want}`);
  }
  for(const d of ['"buy bonds"', '"conditional expansion"']){
    const r = dir(d);
    if(r.value.direction !== undefined) fail.push(`"${d}" was mapped to a direction`);
    if(!has(r.owes, 'names an action rather than')) fail.push(`"${d}" is not owed as a non-direction`);
  }

  // 7. Bare readings, a `scale: [min,max]` pair, a signed bound, and the one
  //    board left in the corpus whose list comes back as a string.
  const bare = {
    rule: 'stop pumping when head <= threshold',
    scale: [0, 3], anchors: [0.5, 1, 1.5, 2], objective: 'chloride <=250 mg/L',
    direction: 'lower_is_worse', consequence_limit: 250, correct_threshold: 1,
    updates: [1.4, 1.1, 1, 0.8],
  };
  const c2 = convertPayload(bare, {});
  if(c2.value.scale.min !== 0 || c2.value.scale.max !== 3) fail.push('a `scale: [min,max]` pair was not read');
  if(c2.value.stream.length !== 4 || c2.value.stream[0].value !== 1.4){
    fail.push('bare readings did not become stream values');
  }
  if(c2.value.stream.some(r => r.at || r.hoursLeft !== undefined)) fail.push('a time or an hours-left was invented');
  // A missing reading is missing, not zero. `Number(null)` is 0, and a stream
  // row reading 0 on a scale of metres of head is a reading nobody took.
  const holed = convertPayload({ ...bare, updates: [1.4, null, 1, 0.8] }, {});
  if(holed.value.stream.some(r => r.value === 0)) fail.push('a null reading was read as zero');
  if(!has(holed.owes, 'carry no reading')) fail.push('a null reading is not owed');
  if(!has(c2.owes, 'no `time`')) fail.push('timeless updates are not owed');
  if(!has(c2.owes, 'no numeric `hoursLeft`')) fail.push('the missing hours left is not owed');
  // 250 mg/L of chloride is the GOAL and belongs on the panel; the same 250 as a
  // `consequence_limit` on a scale of metres of head does not. So the assertion
  // is on the board, not on the objective the goal is stated in.
  if(json({ s: c2.value.scale, c: c2.value.conditions, u: c2.value.stream }).includes('250')){
    fail.push('the off-scale consequence limit reached the board');
  }
  if(c2.value.objective !== 'chloride <=250 mg/L') fail.push('the goal statement was dropped');
  const neg = convertPayload({ ...bare, scale: { min: -30, max: 60, step: 5, unit: 'min' } }, {});
  if(neg.value.scale.min !== -30) fail.push('a negative scale min was lost');
  if(neg.value.scale.max !== 60) fail.push('a positive max beside a negative min was lost');
  // A list where a number belongs is refused, not unwrapped into one.
  const listed = convertPayload({ ...bare, scale: { min: [2, 3], max: 60 } }, {});
  if(!has(listed.owes, 'no numeric `min`')) fail.push('a list under min was read as a number');
  if(listed.value.scale.min !== undefined) fail.push('a list under min reached the scale');
  // Carrying Capacity's own tail: `updates=[1.4,1.1,1.0,0.8].` comes back as a
  // string because of the full stop after the bracket, and it is four readings.
  const tailed = convertPayload({ ...bare, updates: '[1.4,1.1,1.0,0.8].' }, {});
  if(tailed.value.stream.length !== 4 || tailed.value.stream[3].value !== 0.8){
    fail.push('a stringified update list was not re-read into readings');
  }

  // 8. A ladder is owed, and the anchor `label`/`action` is the importer's `means`.
  const ladder = {
    stages: [{ id: 'watch,', threshold: '"p > 1%",', action: 'maintain watch' },
      { id: 'order,', threshold: '"p >= 90%",', action: 'issue targeted protective order' }],
    scale: { min: 0, max: 100, unit: 'percent' },
    anchors: [{ value: '1,', action: 'conditional_notice' }, { value: '10,', action: 'intensified_planning' }],
    correct_conclusion: 'match_all_four_updates',
  };
  const c3 = convertPayload(ladder, {});
  if(!has(c3.owes, 'carries 2 stages')) fail.push('a stage ladder is not owed');
  if(c3.value.conditions[0].label !== 'maintain watch') fail.push('a stage action did not become its label');
  if(c3.value.scale.anchors[0].means !== 'conditional_notice') fail.push('an anchor action did not become `means`');
  if(json(c3.value).includes('p >= 90%')) fail.push('a stage threshold reached value');

  // 8b. Red Sand nests the whole board under `rule:`. An OBJECT `rule` is the
  //     board and is merged up; a STRING `rule` is the answer and stays unread.
  //     Reading only the top level cost this stop its label, its scale, its unit
  //     and four labelled anchors, with the converted count still green.
  const nestedBoard = {
    rule: { id: 'methane_acceptance', label: 'Independent methane purity needed for acceptance',
      scale: { min: 90, max: 100, unit: 'percent_CH4' },
      anchors: [{ value: 90, label: 'QUARANTINE' }, { value: 97, label: 'ACCEPT MINIMUM' }],
      objective: 'Accept a batch only when an independent sample meets methane purity.',
      direction: 'higher_is_safer', consequence_limit: 97 },
    fixed_companion_limits: { co2_max_percent: 2 },
    correct: 'Commit 97.0% before reveal.',
  };
  const c3b = convertPayload(nestedBoard, {});
  if(c3b.value.scale.label !== 'Independent methane purity needed for acceptance'){
    fail.push('a board nested under `rule` lost its label');
  }
  if(c3b.value.scale.min !== 90 || c3b.value.scale.unit !== 'percent_CH4'){
    fail.push('a board nested under `rule` lost its scale');
  }
  if(c3b.value.scale.anchors?.[1]?.means !== 'ACCEPT MINIMUM') fail.push('nested anchors were dropped');
  if(c3b.value.direction !== 'falling') fail.push('a nested direction was dropped');
  if(!c3b.value.objective) fail.push('a nested objective was dropped');
  // 97 is on the board once, as the authored anchor "ACCEPT MINIMUM" — which is
  // itself owed, below. What must not happen is the limit reaching a field of
  // its own, so the assertion is on everything except the anchors.
  if(json({ c: c3b.value.conditions, u: c3b.value.stream,
    s: { ...c3b.value.scale, anchors: undefined } }).includes('97')){
    fail.push('a nested consequence limit reached the board');
  }
  if(!has(c3b.owes, '`consequence_limit` is authored')) fail.push('a nested consequence limit is not owed');
  if(!has(c3b.owes, 'sits exactly on 97')) fail.push('an anchor printing the keyed threshold is not owed');
  // An anchor near the threshold is not on it.
  const nearMiss = JSON.parse(json(nestedBoard));
  nearMiss.rule.anchors[1].value = 96;
  if(has(convertPayload(nearMiss, {}).owes, 'sits exactly on')){
    fail.push('an anchor that is merely near the threshold was owed as printing it');
  }
  // A STRING `rule` is still the answer and is still dropped.
  if(json(convertPayload(bare, {}).value).includes('stop pumping when head')){
    fail.push('a string `rule` was merged into value as if it were a board');
  }

  // 9. `blind_updates` are named samples with no clock in them.
  const samples = {
    scale: { min: 90, max: 100, unit: 'percent_CH4' }, label: '"Independent methane purity"',
    direction: 'higher_is_safer', consequence_limit: 97,
    blind_updates: [{ id: 'tank_a,', ch4: '98.4,', result: 'pass' },
      { id: 'batch_c,', ch4: '91.8,', result: 'quarantine' }],
    correct: '"Commit 97.0% before reveal."',
  };
  const c4 = convertPayload(samples, {});
  if(!has(c4.owes, '`blind_updates`')) fail.push('named samples standing in for a stream are not owed');
  if(c4.value.stream.length) fail.push('a sample with no reading, time or hours left became a stream row');
  if(!has(c4.owes, 'carry no reading')) fail.push('rowless samples are not owed');
  if(c4.value.scale.label !== 'Independent methane purity') fail.push('a top-level scale label was dropped');
  if(json(c4.value).includes('97')) fail.push('the keyed threshold reached value through consequence_limit');

  // 10. A complete payload board owes nothing.
  const full = {
    label: '"Freshwater head at the wellfield"',
    scale: { min: 0, max: 3, step: 0.1, unit: 'm',
      anchors: [{ at: 0.5, meaning: '"the salt front is already in the field"' },
        { at: 1.5, meaning: '"pumping is comfortable"' }] },
    direction: 'lower_is_worse',
    conditions: [{ label: '"Stop pumping"', leadHours: 6, window: { min: 0.9, max: 1.2 } }],
    updates: [{ time: '"06:00"', reading: 1.4, hoursLeft: 10, update: '"Overnight recovery holds"' },
      { time: '"09:00"', reading: 1.1, hoursLeft: 7 },
      { time: '"10:00"', reading: 1, hoursLeft: 6 },
      { time: '"12:00"', reading: 0.8, hoursLeft: 4 }],
    objective: '"keep chloride under 250 mg/L"',
  };
  const c5 = convertPayload(full, {});
  if(c5.owes.length) fail.push(`a complete payload board owed: ${c5.owes.join(' / ')}`);
  if(c5.value.conditions[0].window.max !== 1.2) fail.push('an authored window was not carried');
  if(c5.value.direction !== 'falling') fail.push('lower_is_worse did not read as falling');
  if(c5.value.stream[0].update !== 'Overnight recovery holds') fail.push('an authored update line was dropped');
  if(c5.value.scale.anchors[0].means !== 'the salt front is already in the field'){
    fail.push('an anchor meaning did not become `means`');
  }

  // 11. Put each bug back: the field must be named, and must not be in value.
  const drop = (path) => { const c = JSON.parse(json(full)); path(c); return convertPayload(c, {}); };
  if(!has(drop(c => { delete c.scale.max; }).owes, '`max`')) fail.push('a missing scale max is not owed');
  if(!has(drop(c => { delete c.label; }).owes, 'no `label`')) fail.push('a missing scale label is not owed');
  if(!has(drop(c => { delete c.conditions[0].leadHours; }).owes, '`leadTimeHours`')) fail.push('a missing lead time is not owed');
  if(!has(drop(c => { delete c.conditions[0].window.max; }).owes, 'no `window`')) fail.push('a half window is not owed');
  if(drop(c => { delete c.conditions[0].window.max; }).value.conditions[0].window){
    fail.push('a half window was written anyway');
  }
  if(!has(drop(c => { c.updates.length = 2; }).owes, 'fewer than three updates')) fail.push('a two-update stream is not owed');
  if(!has(drop(c => { delete c.updates[1].hoursLeft; }).owes, 'hoursLeft')) fail.push('a missing hoursLeft is not owed');
  if(!has(drop(c => { delete c.scale.anchors[0].meaning; }).owes, 'bare number with no')) fail.push('a meaningless anchor is not owed');
  if(!has(drop(c => { c.scale.anchors.push({ at: 9, meaning: '"off scale"' }); }).owes, 'outside the scale')){
    fail.push('an anchor outside the scale is not owed');
  }
  if(!has(drop(c => { delete c.direction; }).owes, 'which way the readings travel')) fail.push('a missing direction is not owed');
  // Two boards differing only in a reading must not convert alike.
  if(json(drop(c => { c.updates[2].reading = 0.51; }).value.stream) === json(c5.value.stream)){
    fail.push('two payload boards with different readings converted identically');
  }

  /* ------------------------------------------- selftest: the canonical board
   *
   * Three renames, and each one is tested by the thing it broke rather than by
   * the field name: the stream by the reading the panel would otherwise call
   * -Infinity, the anchors by their being reachable inside the scale, the stage
   * by the rung that is carried. The bug goes back for each — a board converted
   * without the rename must fail, and only that case.
   */
  const canon = {
    rule: 'Commit the threshold before the stream appears; act only when a reading enters the'
      + ' action window with enough lead time.',
    scale: { label: 'freshwater head', min: 0, max: 3, step: 0.1, unit: 'm' },
    start: 0.6,
    anchors: [{ at: 0.6, means: 'routine baseline, not the decision threshold' },
      { at: 1.95, means: 'elevated evidence requiring attention' }],
    direction: 'falling',
    updates: [{ at: 'T-48 h', value: 1.4, hoursLeft: 48 }, { at: 'T-24 h', value: 1.1, hoursLeft: 24 },
      { at: 'T-12 h', value: 1.0, hoursLeft: 12 }, { at: 'T-6 h', value: 0.8, hoursLeft: 6 }],
    stages: [
      { id: 'watch', label: 'Increase monitoring', window: { min: 1.01, max: 3 }, leadHours: 24 },
      { id: 'act', label: 'Take the protective action', window: { min: 0, max: 1 }, leadHours: 12 },
    ],
    question: 'Set an inclusive stop-pumping rule on freshwater head from 0.0 to 3.0 m.',
  };
  const k1 = convertCanonical(canon, {});
  if(k1.key !== 'trigger') fail.push('the canonical board did not come back under `trigger`');

  // 1. `updates` IS `stream`. The assertion is the one the panel makes: the far
  //    end of the travel is a real reading, and it is not the one the board opens
  //    on. Unread, `Math.max(...[])` is -Infinity and that check is what fails.
  const vals = k1.value.stream.map(x => x.value);
  const bottom = vals.length ? Math.min(...vals) : -Infinity;
  if(!vals.length) fail.push('`updates` did not become the stream — the panel has no readings');
  if(!Number.isFinite(bottom)){
    fail.push('the stream has no finite extreme, which is the -Infinity the panel reports');
  }
  if(vals.indexOf(bottom) <= 0){
    fail.push('a falling stream whose lowest reading is the one it opens on — no threshold past'
      + ' the opening reading could ever fire');
  }
  if(k1.value.stream[0]?.at !== 'T-48 h' || k1.value.stream[3]?.value !== 0.8){
    fail.push('an update row did not carry its `at` and `value` into the stream');
  }
  if(k1.value.updates !== undefined) fail.push('the board kept `updates` beside `stream`');

  // 2. The anchors move INTO the scale, which is the only place the panel looks.
  if(k1.value.scale.anchors?.length !== 2) fail.push('the board\'s top-level anchors were dropped');
  if(k1.value.anchors !== undefined) fail.push('anchors were left at the top of the board');
  if(k1.value.scale.anchors?.[1]?.means !== 'elevated evidence requiring attention'){
    fail.push('an anchor lost its `means`');
  }
  const sc1 = k1.value.scale;
  if(!(k1.value.scale.anchors ?? []).every(a => a.at >= sc1.min && a.at <= sc1.max)){
    fail.push('an anchor sits outside the scale it is drawn on');
  }

  // 3. One rule to a board, and it is the rung where something is done. The
  //    assertion is not "the second one" — it is that the rung carried cannot be
  //    satisfied by leaving the slider where it opens, which is what the watch
  //    rung, whose window runs to the top of the scale, would do.
  if(k1.value.conditions.length !== 1){
    fail.push(`${k1.value.conditions.length} stages reached the board and a board is one rule`);
  }
  const c = k1.value.conditions[0] ?? {};
  const falling = k1.value.direction === 'falling';
  // Which rows of a stream a stage may fire on, and whether an end of the scale
  // is one of them — the two questions `import-book.mjs` asks of every stage.
  const windowIdx = (v, cond) => v.stream
    .map((x, i) => (x.value >= (cond.window ?? {}).min && x.value <= (cond.window ?? {}).max ? i : -1))
    .filter(i => i >= 0);
  const endAnswers = (v, cond, end) => {
    const k = v.stream.findIndex(x => (falling ? x.value <= end : x.value >= end));
    return k >= 0 && windowIdx(v, cond).includes(k) && v.stream[k].hoursLeft >= cond.leadHours;
  };
  const inWindow = c.window ? windowIdx(k1.value, c) : [];
  if(!inWindow.length) fail.push('no update falls inside the carried stage\'s window');
  if(!inWindow.some(i => k1.value.stream[i].hoursLeft >= c.leadHours)){
    fail.push('every update inside the window arrives with less lead than the stage needs');
  }
  for(const [end, which] of [[sc1.min, 'bottom'], [sc1.max, 'top']]){
    if(c.window && endAnswers(k1.value, c, end)){
      fail.push(`the carried stage is satisfied by sliding the threshold to the ${which} of the`
        + ' scale, which is where the slider already is');
    }
  }
  if(!has(k1.owes, 'ladder of 2 stages')) fail.push('the dropped rung is not owed');
  if(!has(k1.owes, 'Increase monitoring')) fail.push('the dropped rung is not owed by name');
  if(json(k1.value).includes('Increase monitoring')){
    fail.push('a second stage reached the board it was owed for');
  }
  // PUT THE BUG BACK: carry the FIRST rung instead, and the board becomes one the
  // opening slider position answers.
  const firstRung = { ...canon, stages: [canon.stages[0]] };
  const kW = convertCanonical(firstRung, {});
  if(!endAnswers(kW.value, kW.value.conditions[0] ?? {}, sc1.max)){
    fail.push('the watch rung was expected to be satisfied by the top of the scale; the fixture'
      + ' no longer reproduces the defect that decides which rung is carried');
  }

  // 4. What is authored and reaches nothing must not be smuggled anywhere.
  if(json(k1.value).includes('Commit the threshold before')){
    fail.push('the panel\'s rule-of-play sentence was carried into the board');
  }
  if(json(k1.value).includes('Set an inclusive stop-pumping')){
    fail.push('the board\'s copy of the stop\'s `question` was carried onto the board');
  }
  if(k1.value.start !== undefined) fail.push('a `start` nothing reads was written');
  if(k1.extra !== undefined) fail.push('the canonical converter wrote a top-level key of its own');
  if(k1.value.direction !== 'falling') fail.push('an authored direction was dropped');

  // 5. Nothing is invented for a board that does not carry it, and the gap is
  //    named. A window guessed from the stream would turn all 20 stops green and
  //    grade every player against a line this tool chose.
  const noWindow = JSON.parse(json(canon));
  delete noWindow.stages[1].window;
  const k2 = convertCanonical(noWindow, {});
  if(k2.value.conditions[0].window !== undefined) fail.push('a window was invented into value');
  if(!has(k2.owes, 'no `window: {min, max}` of readings')) fail.push('a missing window is not owed');
  const halfWindow = JSON.parse(json(canon));
  delete halfWindow.stages[1].window.max;
  if(convertCanonical(halfWindow, {}).value.conditions[0].window){
    fail.push('half a window was written as a whole one');
  }
  const noDir = JSON.parse(json(canon));
  delete noDir.direction;
  if(convertCanonical(noDir, {}).value.direction !== undefined){
    fail.push('a direction nobody wrote was defaulted in');
  }
  if(!has(convertCanonical(noDir, {}).owes, 'which way the readings travel')){
    fail.push('a missing direction is not owed');
  }
  const shortStream = JSON.parse(json(canon));
  shortStream.updates.length = 2;
  if(!has(convertCanonical(shortStream, {}).owes, 'not a stream')){
    fail.push('a two-update stream is not owed');
  }
  const offAnchor = JSON.parse(json(canon));
  offAnchor.anchors[1].at = 9;
  if(!has(convertCanonical(offAnchor, {}).owes, 'outside the scale')){
    fail.push('an anchor outside the scale is not owed');
  }
  const backwards = JSON.parse(json(canon));
  backwards.updates[2].hoursLeft = 40;
  if(!has(convertCanonical(backwards, {}).owes, 'does not run forwards')){
    fail.push('a stream where waiting buys lead time is not owed');
  }
  // 6. Two boards differing only in a reading must not convert alike.
  const moved2 = JSON.parse(json(canon));
  moved2.updates[2].value = 0.55;
  if(json(convertCanonical(moved2, {}).value.stream) === json(k1.value.stream)){
    fail.push('two canonical boards with different readings converted identically');
  }

  console.log(fail.length ? `TRIGGER selftest FAILED:\n  ${fail.join('\n  ')}` : 'TRIGGER selftest ok');
  process.exit(fail.length ? 1 : 0);
}
