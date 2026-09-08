// diagnosis.mjs — the bible's DIAGNOSIS board into the importer's.
//
// Four stops, all in groundtruth: M4 S16, M8 S32, M10 S40, M13 S52. See
// `_shared.mjs` for the contract every converter keeps.
//
// DIAGNOSIS IS NOT AN INSTRUMENT BLOCK, and that is the fact that shapes this
// file. Every other format in this directory writes one nested key — `sweep`,
// `probe`, `chain` — and `INSTRUMENT_BLOCKS` near line 1447 of
// `tools/import-book.mjs` lists them. DIAGNOSIS is handled separately and its
// board is spread across THREE top-level keys on the stop: `readings`,
// `choices`, and `correctChoice` (plus an optional `headline`). The converter
// contract returns ONE key, and `bible-build.mjs` emits `{ [key]: value }`, so
// only one of the three can be placed.
//
// `readings` is the panel — without it the importer retypes the stop to CHOICE
// and the diagnosis never renders — so it stays the returned `key`. The options,
// the answer and the headline are the other three, and they used to be OWED, in
// as many words, because the contract returned one key and a key that vanishes
// on the way through is indistinguishable from a key that works. That is what
// `extra` is now for: they are written beside the board, and what is owed is
// only what the bible did not author.
//
// THE THING TO KNOW ABOUT THESE FOUR BOARDS. All four are byte-identical:
// channel A normal, channel B high, channel C normal, an independent check that
// confirms B, and four snake_case options with the answer always
// `real_system_change` — in stops about a remote path, noncontact damage, an
// April certificate and frequency response. The campaign's real readings are in
// `stop.payload` (`tip_corona:alarm`, `trailer_shell_arc:none`,
// `cabinet_inside:quiet`), zoned and with a status on each, which is the shape
// the importer actually wants.
import { str, pick, list } from './_shared.mjs';

export const FORMAT = 'DIAGNOSIS';

// An option written as an identifier rather than as something a player reads.
const IS_ID = /^[a-z][a-z0-9]*(_[a-z0-9]+)+$/;

export const convert = (b) => {
  const owes = [];
  const raw = list(pick(b, 'readings', 'evidence'));

  // A reading is `{zone, label, value, status}` in every shipping book. The
  // bible authors label and value; `zone` is what the importer groups on and
  // requires three distinct ones of, and `status` is how a quiet reading is
  // told from an alarming one. Neither is invented here.
  const readings = raw.map((r, i) => {
    const at = `diagnosis reading ${i + 1}`;
    const label = str(r.label), value = str(pick(r, 'value', 'reading'));
    if(!label) owes.push(`${at} has no \`label\``);
    if(!value) owes.push(`${at} has no \`value\``);
    if(!str(r.zone)) owes.push(`${at} has no \`zone\` — the importer needs readings across three`
      + ' zones, or a figure, and the board authors neither');
    if(!str(r.status)) owes.push(`${at} has no \`status\` — nothing tells an alarming reading from`
      + ' a quiet one, and the quiet ones are what rule the wrong explanations out');
    const out = {};
    if(str(r.zone)) out.zone = str(r.zone);
    if(label) out.label = label;
    if(value) out.value = value;
    if(str(r.status)) out.status = str(r.status);
    return out;
  });

  if(!readings.length){
    owes.push('the diagnosis authors no readings, so it has no panel — the importer retypes a'
      + ' diagnosis with no readings and no figure to CHOICE');
  }

  // The options and the answer. Both are real authored content and neither can
  // be written under a single key. See the note at the top of the file.
  const options = list(pick(b, 'options', 'choices')).map(o => (typeof o === 'string' ? o : str(o.label)));
  const answer = str(pick(b, 'answer', 'correctChoice'));
  if(!options.length) owes.push('the diagnosis authors no options');
  else if(options.filter(o => IS_ID.test(o)).length === options.length){
    owes.push(`every option is an identifier ("${options[0]}") rather than a sentence a player`
      + ' reads — this is the template board, not this campaign\'s');
  }
  if(!answer) owes.push('the diagnosis names no answer');
  else if(options.length && !options.includes(answer)){
    owes.push(`the diagnosis answer "${answer}" is not one of its own options`);
  }
  if(!str(b.headline)) owes.push('the diagnosis authors no `headline` — the question over the panel');

  // The other three top-level keys the board authors. `answer` is written under
  // the importer's name for it, and an answer naming no option is still written:
  // the owe above says which one is wrong, and withholding it would turn a
  // reported mismatch into a silently missing key.
  const extra = { ...(options.length ? { choices: options } : {}),
    ...(answer ? { correctChoice: answer } : {}),
    ...(str(b.headline) ? { headline: str(b.headline) } : {}) };

  return { key: 'readings', value: readings, owes, extra };
};

// ------------------------------------------------------- the authored board
//
// ALL FOUR OF THESE PAYLOADS ARE PROSE, and that is the finding rather than a
// gap in this file. groundtruth writes them as sentences with lists inside:
//
//   headline `WHAT FAILED?`; readings zones `[tip_corona:alarm,
//   trailer_shell_arc:none, card_damage:alarm, cabinet_inside:quiet]`;
//   choices `[tip_field_alone, conducted_or_induced_path,
//   sitewide_uniform_field]`; answer `conducted_or_induced_path`.
//
// and M8 S32's is thinner still — "readings ≥3 plus quiet shell" is an
// instruction to whoever finishes the board, not a board. `_payload.mjs` reads a
// payload that begins `key:` and these begin with a sentence, so it returns
// null and `bible-build.mjs` counts them unreadable before this is ever called.
// Nothing here mines a reading out of a sentence: "readings ≥3" names no zone,
// no label and no value, and a panel built from it would be four rows this tool
// wrote rather than four the campaign did. What the four need is a payload
// written as a board — the shape below — and that is a bible edit, not a
// converter one.
//
// So this exists for the shape they would arrive in once they are, and for the
// zone→status map they already write inside the prose:
//
//   readings: {tip_corona: alarm, trailer_shell_arc: none, cabinet_inside: quiet}
//
// which is a zone and a status per reading and no label or value, so those two
// are owed per row. The one-key contract is the same constraint as in
// `convert`: `readings` is written and `choices`/`correctChoice` are owed,
// because they are top-level keys on the stop.

/**
 * The numbers in the board's own verdict that the stop's does not carry.
 *
 * TWO VERDICTS IS NORMAL AND USUALLY HARMLESS: the board says "Response rises
 * smoothly; no dead band appears" and the stop says the same thing in the
 * campaign's words, and owing that pair would be a line per stop saying nothing.
 * What is NOT harmless is a REVEALED VALUE in one and not the other — an upper
 * asymptote of 36.850 mm/h, an encounter width of 4,600 km — because the stop is
 * then graded on a number its own verdict never states. So the comparison is on
 * the numbers, not on the wording.
 */
function lostNumbers(said, has){
  const nums = (t) => new Set((String(t ?? '').match(/-?\d[\d,]*(?:\.\d+)?/g) ?? [])
    .map(n => n.replace(/,/g, '')));
  const there = nums(has);
  return [...nums(said)].filter(n => !there.has(n));
}

/** `{zone: status}` → the reading rows it names, with what it does not say owed. */
function fromZones(map, owes){
  return Object.entries(map).map(([zone, status]) => {
    const at = `diagnosis reading "${zone}"`;
    owes.push(`${at} is written as a zone and a status only — it has no \`label\` and no \`value\`,`
      + ' so the panel prints a row with nothing read on it');
    return { zone: str(zone), ...(str(status) ? { status: str(status) } : {}) };
  });
}

const CONSUMED = new Set(['readings', 'evidence', 'zones', 'options', 'choices', 'answer',
  'correctChoice', 'headline', 'figure', 'pack', '_trailing']);

/**
 * The stop's own authored diagnosis. See the note above for why no stop reaches
 * this today; `stop` carries the printed question and the stop's `answerText`.
 */
export const convertPayload = (raw, stop = {}) => {
  const extra = [];
  const board = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? { ...raw } : {};
  if(stop.payloadKey && !['readings', 'diagnosis'].includes(stop.payloadKey)){
    extra.push(`the payload is written under \`${stop.payloadKey}\` and the importer reads a`
      + ' diagnosis from top-level `readings` — one of the two names is wrong');
  }

  // The zone→status map, which is how all four write their zones in prose.
  const rows = pick(board, 'readings', 'evidence', 'zones');
  if(rows && typeof rows === 'object' && !Array.isArray(rows)){
    board.readings = fromZones(rows, extra);
    delete board.zones;
    delete board.evidence;
  } else if(pick(board, 'zones') !== undefined && board.readings === undefined){
    board.readings = board.zones;
  }

  const { key, value, owes, extra: keys } = convert(board);

  // The verdict. The board's is written only where the stop has none — where
  // both exist and differ, choosing between two authored verdicts is authoring,
  // and it is owed instead.
  const said = str(board.answerText);
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) keys.answerText = said;
  else if(!has && !said){
    extra.push('neither the stop nor its board authors an `answerText`, so a wrong pick is told it'
      + ' is wrong and never told which reading ruled its explanation out');
  } else if(said && has && said !== has){
    const lost = lostNumbers(said, has);
    if(lost.length) extra.push(`the board's own verdict states ${lost.join(', ')} and the stop's`
      + ' verdict does not — the stop is graded on a number its own answer never says, and'
      + ' choosing between two authored verdicts is authoring, so neither is written');
  }

  const dropped = Object.keys(board).filter(k => !CONSUMED.has(k) && k !== 'answerText'
    && board[k] !== undefined).sort();
  if(dropped.length){
    extra.push(`the board authors \`${dropped.join('`, `')}\`, which the diagnosis has no field`
      + ' for, so they are dropped');
  }
  const tail = str(board._trailing).replace(/^[.;,\s]+$/, '');
  if(tail) extra.push(`the payload carries prose after its board — "${tail}" — which may hold a`
    + ' reading the board does not');

  return { key, value, owes: [...owes, ...extra], extra: keys };
};

// ------------------------------------------------------ the canonical board
//
// All four DIAGNOSIS stops in the repo, and all four in Ground Truth: M4 S16,
// M8 S32, M10 S40, M13 S52. The four payloads that were prose in the last pass
// have been rewritten in the game's schema, and the shape is good — real zones,
// a headline per stop, an answer and a rebuttal for each option it is not.
//
// THE ONE THING THAT MAKES CARRYING THIS THROUGH USELESS. A DIAGNOSIS has no
// block of its own. The importer reads it from the stop's OWN top-level keys —
// `readings`, `choices`, `answer`, `headline` — and never looks at a `diagnosis`
// key for anything. So the canonical block, which is written under `diagnosis:`,
// is placed on the stop as `diagnosis:` and read by nobody: the stop then has no
// readings and no figure, `import-book.mjs` warns and retypes it to CHOICE, and
// the panel the bible authored never renders. Silently, with a green build. That
// is `extra` territory rather than a rename, and it is why this function is the
// most valuable one in this file.
//
// TWO REAL RENAMES INSIDE IT.
//
// 1. `answer: supported` names an option's `id`, and grading in this game is by
//    LABEL — `need(labels.includes(answer), 'grading compares labels')`. The
//    board carries the id→label map in its own `choices`, so resolving one to
//    the other is reading the bible. Where the id names no option it is written
//    through as authored and owed, because a silently missing answer is worse
//    than a reported wrong one.
//
// 2. `rebuttals` is a map keyed by option id; every shipping book writes a LIST
//    of sentences, one per wrong option, in the order those options appear. The
//    engine prints them as a plain `<ul>`, so the order is the correspondence.
//    A wrong option with no rebuttal, and a rebuttal keyed to no option, are
//    both owed rather than papered over.
//
// The `zone` values are already real. What none of the four author is `status`,
// which is how a quiet reading is told from an alarming one — `convert` owes it
// per row and nothing here fills it in.

/** An option as `{id, label}`, however the board wrote it. */
const optionOf = (o) => (typeof o === 'string' || typeof o === 'number')
  ? { id: str(o), label: str(o) }
  : { id: str(pick(o ?? {}, 'id')) || str((o ?? {}).label), label: str((o ?? {}).label) };

export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? { ...b } : {};
  const owes = [];

  const options = list(pick(board, 'choices', 'options')).map(optionOf);
  const byId = new Map(options.map(o => [o.id, o.label]));

  // ---- the answer, resolved from the id the board keys on to the label the
  // game grades on.
  const authored = str(pick(board, 'answer', 'correctChoice'));
  if(authored && byId.has(authored)) board.answer = byId.get(authored);
  else if(authored && options.length){
    owes.push(`the diagnosis answers "${authored}", which is neither an option id nor an option`
      + ` label on its own board (${options.map(o => o.id).join(', ')}) — it is written through as`
      + ' authored so the mismatch is reported rather than silently missing');
  }

  // ---- the rebuttals, from a map keyed by id to the list the verdict prints.
  const map = pick(board, 'rebuttals');
  delete board.rebuttals;
  let rebuttals;
  if(map && typeof map === 'object' && !Array.isArray(map)){
    const keyed = byId.has(authored) ? authored : null;
    const wrong = options.filter(o => o.id !== keyed);
    rebuttals = wrong.map(o => str(map[o.id])).filter(Boolean);
    const mute = wrong.filter(o => !str(map[o.id]));
    if(mute.length){
      owes.push(`${mute.length} wrong option(s) have no rebuttal (${mute.map(o => o.id).join(', ')})`
        + ' — the verdict prints one line per wrong option and grades a player who picked an'
        + ' unanswered one with nothing to read');
    }
    const stray = Object.keys(map).filter(k => k !== '_trailing' && !byId.has(k));
    if(stray.length){
      owes.push(`the rebuttals are keyed to \`${stray.join('`, `')}\`, which name no option on this`
        + ' board — the list the verdict prints is in option order, so a key that matches nothing'
        + ' would be printed against the wrong option');
    }
    if(str(map[keyed])){
      owes.push(`the board writes a rebuttal against its own keyed option ("${keyed}") — the`
        + ' verdict prints the list under "Why the others do not hold", so it is dropped rather'
        + ' than printed as an argument against the answer');
    }
  } else if(map !== undefined){
    owes.push('the board\'s `rebuttals` is not a map from option id to a sentence, so nothing can'
      + ' be read off it');
  } else {
    owes.push('the diagnosis authors no rebuttals — a player who rules the wrong thing out is told'
      + ' they were wrong and never told which reading contradicted them');
  }

  // ---- the shape tell. In all four boards the keyed option is the only one
  // wrapped in backticks and is two to three times the length of the others, so
  // it is pickable without reading a single zone. Owed here for the same reason
  // `derive.mjs` owes a distractor shorter than its keyed line: rewriting the
  // distractors to match would be authoring three options nobody read.
  const keyLabel = byId.get(authored) ?? '';
  const marked = options.filter(o => /`/.test(o.label));
  if(keyLabel && marked.length === 1 && marked[0].label === keyLabel && options.length > 1){
    owes.push('the keyed option is the only one on the board written in backticks, so it is'
      + ' pickable from its formatting without reading a reading');
  }
  const others = options.filter(o => o.label !== keyLabel).map(o => o.label.length);
  if(keyLabel && others.length && keyLabel.length > Math.max(...others) * 1.5){
    owes.push(`the keyed option is ${keyLabel.length} characters against a longest distractor of`
      + ` ${Math.max(...others)} — the longest option must not be the answer key`);
  }

  const { key, value, owes: base, extra } = convert(board);

  // The importer reads the stop's `answer`, not `correctChoice`: `correctChoice`
  // is what it WRITES once the answer has been checked against the labels. A
  // book that carries only `correctChoice` has `s.answer` undefined and is
  // refused for an answer that is not one of its options.
  if(extra.correctChoice !== undefined){
    extra.answer = extra.correctChoice;
    delete extra.correctChoice;
  }
  if(rebuttals && rebuttals.length) extra.rebuttals = rebuttals;

  // The verdict, where the stop has none. All four already carry one.
  const said = str(pick(b ?? {}, 'answerText', 'correctConclusion', 'correct_conclusion',
    'correctResult'));
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;

  return { key, value, owes: [...base, ...owes], extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/diagnosis.mjs
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const full = convert({
    headline: 'WHAT FAILED?',
    readings: [
      { zone: 'Mast tip', label: 'Corona at the tip', value: 'visible', status: 'alarm' },
      { zone: 'Trailer shell', label: 'Arc mark on the shell', value: 'none', status: 'quiet' },
      { zone: 'Cabinet', label: 'Card damage', value: 'six destroyed', status: 'alarm' },
      { zone: 'Cabinet', label: 'Inside the cabinet', value: 'undisturbed', status: 'quiet' },
    ],
    options: ['Tip field alone', 'A conducted or induced path', 'A site-wide uniform field', 'A display fault'],
    answer: 'A conducted or induced path',
  });
  // A complete board owes nothing now that the other three keys can be placed.
  ok(full.owes.length === 0, `a complete diagnosis should owe nothing; owed ${JSON.stringify(full.owes)}`);
  ok(full.extra.choices.length === 4 && full.extra.correctChoice === 'A conducted or induced path'
    && full.extra.headline === 'WHAT FAILED?',
  `the options, the answer and the headline were not placed: ${JSON.stringify(full.extra)}`);
  ok(!('choices' in full.value) && !('correctChoice' in full.value),
    'the other top-level keys were written into the readings block');
  ok(full.value.length === 4 && full.value[0].zone === 'Mast tip', 'a complete diagnosis lost its readings');
  ok(full.value[1].status === 'quiet', 'a reading lost its status');

  // Refusal: no zone, no status — owed, and absent from the reading written.
  const bare = convert({ readings: [{ label: 'channel A', value: 'normal' }], options: ['a_b', 'c_d'], answer: 'a_b' });
  ok(!('zone' in bare.value[0]), 'a missing zone was invented');
  ok(!('status' in bare.value[0]), 'a missing status was invented');
  ok(bare.owes.some(o => /has no `zone`/.test(o)), 'a missing zone was not owed');
  ok(bare.owes.some(o => /has no `status`/.test(o)), 'a missing status was not owed');
  ok(bare.owes.some(o => /is an identifier/.test(o)), 'the template id options were not owed');
  ok(bare.owes.some(o => /no `headline`/.test(o)), 'a missing headline was not owed');
  // And the case that must NOT fire.
  ok(!full.owes.some(o => /is an identifier/.test(o)), 'real prose options were called identifiers');

  // An answer that names no option.
  const stray = convert({ ...{ readings: [], options: ['One', 'Two'], answer: 'Three' } });
  ok(stray.owes.some(o => /is not one of its own options/.test(o)), 'a stray answer was not owed');
  ok(stray.owes.some(o => /no panel/.test(o)), 'an empty reading list was not owed');

  // Two inputs that should score the same: options as bare strings and as
  // `{label}` records must convert to the same list.
  const asStrings = convert({ readings: [], options: ['One', 'Two'], answer: 'One' });
  const asRecords = convert({ readings: [], options: [{ label: 'One' }, { label: 'Two' }], answer: 'One' });
  ok(JSON.stringify(asStrings.owes) === JSON.stringify(asRecords.owes),
    'options as strings and as records were owed differently');

  // ---------------------------------------------------- the authored board
  const paid = {
    headline: 'WHAT FAILED?',
    readings: [
      { zone: 'Mast tip', label: 'Corona at the tip', value: 'visible', status: 'alarm' },
      { zone: 'Trailer shell', label: 'Arc mark on the shell', value: 'none', status: 'quiet' },
      { zone: 'Cabinet', label: 'Inside the cabinet', value: 'undisturbed', status: 'quiet' },
    ],
    choices: ['Tip field alone', 'A conducted or induced path', 'A site-wide uniform field'],
    answer: 'A conducted or induced path',
  };
  const whole = convertPayload(paid, { answerText: 'A conducted path fits every reading.' });
  ok(whole.owes.length === 0, `a complete payload should owe nothing; owed ${JSON.stringify(whole.owes)}`);
  ok(whole.extra.choices.length === 3 && whole.extra.correctChoice === 'A conducted or induced path',
    'a complete payload did not place its options and its answer');
  ok(!('answerText' in whole.extra), 'the stop\'s own verdict was overwritten by the board\'s');
  ok(whole.value.length === 3 && whole.value[0].status === 'alarm', 'a complete payload lost its readings');

  // The zone→status map the four write inside their prose: a zone and a status
  // are carried, and the label and the value are owed rather than made up.
  const zones = convertPayload({ headline: 'WHAT FAILED?',
    readings: { tip_corona: 'alarm', trailer_shell_arc: 'none', cabinet_inside: 'quiet' },
    choices: ['Tip field alone', 'A conducted path', 'A uniform field'], answer: 'A conducted path' },
  { answerText: 'x' });
  ok(zones.value.length === 3 && zones.value[0].zone === 'tip_corona'
    && zones.value[0].status === 'alarm', `a zone map did not become readings: ${JSON.stringify(zones.value)}`);
  ok(zones.value.every(r => !('label' in r) && !('value' in r)), 'a label or a value was invented');
  ok(zones.owes.filter(o => /no `label` and no `value`/.test(o)).length === 3,
    'the missing labels and values were not owed');
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!whole.owes.some(o => /no `label` and no `value`/.test(o)),
    'a reading list with labels and values was called a zone map');

  // No answerText anywhere.
  const mute = convertPayload(paid, {});
  ok(mute.owes.some(o => /never told which reading ruled/.test(o)), 'a missing answerText was not owed');
  ok(!('answerText' in mute.extra), 'an answerText nobody authored was written');

  // The board authors the verdict and the stop does not: written, not owed.
  const boardSays = convertPayload({ ...paid, answerText: 'The quiet shell rules the arc out.' }, {});
  ok(boardSays.extra.answerText === 'The quiet shell rules the arc out.',
    'the board\'s verdict was not placed on a stop that had none');
  ok(!boardSays.owes.some(o => /never told which reading ruled/.test(o)),
    'a placed verdict was owed as missing');

  // Both, and they differ: neither is written. Different words are not a
  // finding; a number in one and not the other is.
  const clash = convertPayload({ ...paid, answerText: 'The 0.42 ohm certificate covers DC only.' },
    { answerText: 'A conducted path fits every reading.' });
  ok(!('answerText' in clash.extra), 'the stop\'s verdict was overwritten by the board\'s');
  ok(clash.owes.some(o => /verdict states 0.42 and the stop's/.test(o)),
    `a number only the board's verdict states went unowed: ${JSON.stringify(clash.owes)}`);
  const reworded = convertPayload({ ...paid, answerText: 'An induced path fits the quiet shell.' },
    { answerText: 'A conducted path fits every reading.' });
  ok(!reworded.owes.some(o => /verdict states/.test(o)),
    'two verdicts in different words with the same numbers were owed');
  ok(!whole.owes.some(o => /never told which reading ruled/.test(o)),
    'a stop that carries an answerText was owed one');

  // A key the diagnosis has no field for.
  const extra = convertPayload({ ...paid, mechanism: 'L dI/dt + IR = e' }, { answerText: 'x' });
  ok(extra.owes.some(o => /`mechanism`/.test(o)), 'a dropped key was not owed');

  // The payload written under somebody else's key.
  const wrongKey = convertPayload(paid, { answerText: 'x', payloadKey: 'probe' });
  ok(wrongKey.owes.some(o => /written under `probe`/.test(o)), 'a mismatched payload key was not owed');
  ok(!whole.owes.some(o => /written under/.test(o)), 'a payload with no key of its own was owed one');

  // ---------------------------------------------------- the canonical board
  // Ground Truth M4 S16 as it arrives, plus the two things it does not carry —
  // a `status` per reading and a fourth option — so the shape can be tested
  // without every assertion also reporting those two.
  const rows = [
    { zone: 'alarm_source', label: 'alarming source zone', value: 'alarm present', status: 'alarm' },
    { zone: 'transfer_path', label: 'possible transfer path', value: 'evidence present', status: 'alarm' },
    { zone: 'quiet_control', label: 'quiet comparison zone', value: 'no alarm', status: 'quiet' },
    { zone: 'protected_interior', label: 'protected interior', value: 'quiet', status: 'quiet' },
  ];
  const canon = {
    headline: 'Read every alarming and quiet zone, and submit one diagnosis.',
    readings: rows,
    choices: [
      { id: 'supported', label: 'A conducted or induced path fits all readings' },
      { id: 'local_only', label: 'Local source alone explains every zone' },
      { id: 'uniform_everywhere', label: 'Uniform field or effect across every zone' },
      { id: 'display_fault', label: 'The display is at fault and the field is not' },
    ],
    answer: 'supported',
    rebuttals: { local_only: 'The remote alarm is left unexplained.',
      uniform_everywhere: 'The quiet control contradicts a uniform effect.',
      display_fault: 'Two independent instruments read the same alarm.' },
  };

  const c = convertCanonical(canon, { answerText: 'A conducted path fits all four zones.' });
  // THE HOISTING. Nothing may be written under `diagnosis`, because the importer
  // never looks there — the readings ARE the key.
  ok(c.key === 'readings', `the canonical board was keyed "${c.key}", which the importer does not read`);
  ok(Array.isArray(c.value) && c.value.length === 4 && c.value[0].zone === 'alarm_source',
    'the readings were not carried across as the value');

  // RENAME ONE. Put it back — drop the `board.answer = byId.get(authored)` line
  // — and this case fails while everything else here still passes.
  ok(c.extra.answer === 'A conducted or induced path fits all readings',
    `the answer id was not resolved to the label grading compares: ${c.extra.answer}`);
  // And it must be `answer`, not `correctChoice`: the importer reads `s.answer`
  // and WRITES `correctChoice` once it has checked it against the labels.
  ok(!('correctChoice' in c.extra),
    'the answer was placed under `correctChoice`, which the DIAGNOSIS branch never reads');
  ok(c.extra.choices.length === 4 && c.extra.choices[0] === 'A conducted or induced path fits all readings',
    'the options were not carried across as the labels the game grades on');
  ok(c.extra.headline.startsWith('Read every'), 'the headline was lost');

  // RENAME TWO. The map becomes the list the verdict prints, in the order the
  // wrong options appear, and the keyed option contributes nothing.
  ok(Array.isArray(c.extra.rebuttals) && c.extra.rebuttals.length === 3,
    `the rebuttal map did not become a list: ${JSON.stringify(c.extra.rebuttals)}`);
  ok((c.extra.rebuttals ?? [])[0] === 'The remote alarm is left unexplained.'
    && (c.extra.rebuttals ?? [])[2] === 'Two independent instruments read the same alarm.',
    'the rebuttals came back out of the board\'s own option order');
  ok(c.owes.length === 0, `a complete canonical diagnosis owed ${JSON.stringify(c.owes)}`);

  // An answer naming no option: written through as authored, and said out loud.
  const noOption = convertCanonical({ ...canon, answer: "not_an_option" }, {});
  ok(noOption.extra.answer === "not_an_option", 'a mismatched answer was dropped rather than reported');
  ok(noOption.owes.some(o => /neither an option id nor an option/.test(o)),
    `an answer naming no option was not owed: ${JSON.stringify(noOption.owes)}`);
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!c.owes.some(o => /neither an option id/.test(o)), 'a resolvable answer id was called stray');

  // A wrong option with no rebuttal, and a rebuttal keyed to nothing.
  const thin = convertCanonical({ ...canon,
    rebuttals: { local_only: 'The remote alarm is left unexplained.', radiator: 'x' } }, {});
  // GUARDED: with the list put back `rebuttals` is undefined, and this line
  // would take the selftest down instead of reporting the case that failed.
  ok((thin.extra.rebuttals ?? []).length === 1, 'a rebuttal keyed to no option was printed anyway');
  ok(thin.owes.some(o => /2 wrong option\(s\) have no rebuttal/.test(o)),
    `unanswered wrong options were not owed: ${JSON.stringify(thin.owes)}`);
  ok(thin.owes.some(o => /keyed to `radiator`/.test(o)), 'a stray rebuttal key was not owed');
  ok(!c.owes.some(o => /have no rebuttal|keyed to `/.test(o)),
    'a complete rebuttal map was called incomplete');

  // The shape tells, both of which all four real boards carry.
  const tell = convertCanonical({ ...canon, choices: [
    { id: 'supported', label: '`A conducted or induced path fits all readings.` Tip-only and'
      + ' uniform-field models fail quiet evidence.' },
    { id: 'local_only', label: 'Local source alone explains every zone' },
    { id: 'uniform_everywhere', label: 'Uniform field or effect across every zone' },
    { id: 'display_fault', label: 'The display is at fault' }] }, {});
  ok(tell.owes.some(o => /only one on the board written in backticks/.test(o)),
    `the backticked key was not owed: ${JSON.stringify(tell.owes)}`);
  ok(tell.owes.some(o => /longest option must not be the answer key/.test(o)),
    'a keyed option half again longer than every distractor was not owed');
  ok(!c.owes.some(o => /backticks|longest option/.test(o)),
    'four options of a length went unowed as one being longer');

  // NEVER INVENTED: a board with no rebuttals gets none, and the omission is said.
  const none = convertCanonical({ ...canon, rebuttals: undefined }, {});
  ok(!('rebuttals' in none.extra), 'rebuttals were invented for a board that authors none');
  ok(none.owes.some(o => /authors no rebuttals/.test(o)), 'a board with no rebuttals went unowed');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('diagnosis.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `DIAGNOSIS selftest: ${f.length} failure(s)` : 'DIAGNOSIS selftest: ok');
  process.exit(f.length ? 1 : 0);
}
