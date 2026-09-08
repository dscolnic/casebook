// hold.mjs — HOLD's canonical board, and the finding that it is not one.
//
// 9 stops carry a `Handback 3 canonical interaction block — HOLD:`. See
// `_shared.mjs` for the contract every converter in this directory keeps.
//
// THIS FILE IS MOSTLY A REFUSAL, and the refusal is the deliverable. Read the
// judgement below before writing any conversion into it.
//
// ---------------------------------------------------------------------------
// WHY THESE NINE ARE TYPED HOLD
//
// They were HOLDOUT. The previous handback reported that all eight HOLDOUT
// boards were really freeze-and-reveal — one prediction, one acceptance window,
// one measurement uncovered after committing — rather than the fit-then-score
// curve HOLDOUT draws. Rather than re-author eight boards, the author changed
// the format name to HOLD.
//
// HOLD IS THE WRONG FORMAT, and it is further wrong than HOLDOUT was.
//
// The engine's HOLD is a timed control run. `import-book.mjs` needs a
// `quantity` to hold, a named `control` to hold it with, a numeric `hold` target
// and a positive `band`, a `duration` between 20 and 120 seconds, an `authority`
// saying how far the control can push, and — the part that makes it a run at
// all — a list of `disturbances`, each with a time and a signed step in the
// rate. The importer then integrates the do-nothing run in closed form and
// refuses a board the needle never leaves the band on, and refuses again if the
// control cannot out-push the disturbances. It is a game of hands on a knob for
// three quarters of a minute.
//
// What the nine boards contain is:
//
//   hold:
//     prediction: "Fit and freeze exactly one named model using hours 0-5,
//                  reveal hours 6-9, and submit the model label A or B…"
//     commitRequiredBeforeReveal: true
//     acceptanceRule: "Use the acceptance condition and units printed in the
//                      question; a near miss outside the window fails."
//     reveal:
//       - {id: held_back_1, label: "first concealed measurement",
//          valueSource: "`holdout:{training:[…],models:[…],holdout:[…],answer:\"B\"}`"}
//       - {id: held_back_2, label: "independent concealed check", valueSource: "…"}
//     correctConclusion: "B."
//     commonMistake: "Changing the prediction after seeing the held-back measurement."
//
// There is no quantity, no control, no target, no band, no run length and no
// disturbance — and there is nothing in the stops that could become one. Eight
// of the nine ask the player to fit a curve, freeze it, uncover held-back data
// and name the model that survived. That is not a knob. Every one of the seven
// fields HOLD needs would have to be invented, which is what this file will not
// do, so the nine convert to nothing and the panel renders empty.
//
// WHAT THEY ACTUALLY ARE. Freeze, then reveal, then compare against a stated
// acceptance window is VERIFY, which this repo already has: a `prediction` with
// a range and a step, a `truth` the measurement finds, a `passRatio` bracketing
// 1, and a `measurement` the player may skip. `prediction`,
// `commitRequiredBeforeReveal`, `acceptanceRule` and `reveal` map onto it almost
// name for name — but `truth` and `passRatio` are numbers nobody wrote down, so
// naming VERIFY is a recommendation and not a conversion this tool may make.
//
// And several of them were never really the freeze-and-reveal board either.
// Headwater's carries `training`, two models with their predictions, the
// held-out points and the answer: a textbook HOLDOUT, complete, in the stop's
// own payload. So the relabel to HOLD threw away a data model that fitted.
//
// WHERE THE NUMBERS WENT. `reveal[].valueSource` is a quoted copy of the stop's
// ORIGINAL payload — the same string, twice, once per reveal entry, under a key
// nothing reads. The measurements are all still there. They are reported out
// loud below rather than parsed, because parsing a payload out of a prose field
// is `_payload.mjs`'s job and because the stop already carries that payload in
// the field the payload path reads.
//
// ONE OF THE NINE IS DIFFERENT. Safety Factor's is headed `hold_patch:` rather
// than `hold:`, and `bible-build.mjs` takes the board's key from the block, so
// without this file it writes a `hold_patch:` block into the book — a key no
// importer reads, beside a HOLD-typed stop that then reports that its panel is
// empty. Its content is the same shape of prose: `question`, `authoredPayload`,
// `correctResult`, `wrongButPlausible`, `decisionCanFail`, `questionAndUnits`.
// The block's own key is kept rather than renamed to `hold`, because moving that
// prose under `hold:` would turn `need(!!s.hold)` green over a board with
// nothing in it — the panel would still render empty and the gate would stop
// saying so. A dead key that is reported is better than a live key that lies.
//
// (That stop's bible payload, in the comment above it in the fragment, is a
// speed control against an angle formula with a band, a duration and a correct
// setting — real data, and still not a HOLD run, because it names no
// disturbance and a needle nothing pushes is passed by doing nothing.)
//
// ---------------------------------------------------------------------------
// WHAT THIS FILE DOES
//
// It converts a HOLD board when there is one to convert — `control` written
// either as a name or as the `{id, label}` record the bibles' own payloads use,
// `disturbances` however they are spelled — and when there is not, it keeps the
// board where it is and names every field HOLD needs and the bible did not
// author. Nothing is defaulted: `duration`, `authority` and `pass` all have
// defaults in the importer, and writing the importer's default here would be
// this tool answering a question the author was asked.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'HOLD';

/** A control named either outright or as the `{id, label}` record a payload uses. */
const controlName = (v) => {
  if(v && typeof v === 'object' && !Array.isArray(v)) return str(v.label) || str(v.id);
  return str(v);
};

/** The block's own key, so a board that cannot be converted stays where it is. */
const authoredKey = (stop) =>
  (String(stop?.build ?? '').match(/^([A-Za-z_][\w-]*)\s*:/m) ?? [])[1] || 'hold';

/** A quoted payload left in a prose field — `` `holdout:{…}` ``. */
const CARRIED_PAYLOAD = /`?\s*([a-z_]+)\s*:\s*[{[]/i;

export const convertCanonical = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};

  // ---- what the panel is holding, and with what.
  const quantity = str(pick(board, 'quantity'));
  const control = controlName(pick(board, 'control'));
  const unit = str(pick(board, 'unit', 'units'));
  const holdAt = num(pick(board, 'hold', 'target', 'setpoint'));
  const band = num(pick(board, 'band'));
  const narrowTo = num(pick(board, 'narrowTo'));
  const duration = num(pick(board, 'duration'));
  const authority = num(pick(board, 'authority'));
  const pass = num(pick(board, 'pass'));
  const noise = num(pick(board, 'noise'));
  const direction = str(pick(board, 'direction'));

  // ---- the run. A disturbance is a step in the RATE, at a time, with a label.
  const raw = list(pick(board, 'disturbances', 'loads', 'events'))
    .filter(e => e && typeof e === 'object' && !Array.isArray(e));
  const disturbances = [];
  raw.forEach((e, i) => {
    const label = str(pick(e, 'label', 'name'));
    const at = num(pick(e, 'at', 't', 'time'));
    const amount = num(pick(e, 'amount', 'step', 'size'));
    if(!label) owes.push(`disturbance ${i + 1} has no \`label\``);
    if(at === undefined) owes.push(`disturbance ${i + 1} has no numeric \`at\``);
    if(amount === undefined || amount === 0){
      owes.push(`disturbance ${i + 1} has no non-zero \`amount\` — a step of nothing is not a load`);
    }
    if(label && at !== undefined && amount !== undefined && amount !== 0){
      disturbances.push({ label, at, amount });
    }
  });

  // A BOARD IS A HOLD BOARD WHEN IT SAYS WHAT IS HELD, WITH WHAT, WHERE, HOW
  // WIDE AND AGAINST WHAT. Anything less is not a short hold board, it is a
  // different instrument, and the difference decides whether this converter
  // hands back a `hold:` block at all.
  const isHold = !!quantity && !!control && holdAt !== undefined && band !== undefined
    && disturbances.length > 0;

  if(!quantity) owes.push('no `quantity` — what the needle is showing and the player is holding');
  if(!control) owes.push('no `control` — the named thing the player holds it with');
  if(holdAt === undefined) owes.push('no numeric `hold` — the value the needle is held at');
  if(band === undefined) owes.push('no numeric `band` — the half-width of the corridor');
  if(!raw.length){
    owes.push('no `disturbances` — a hold with nothing pushing the needle is a needle that stays'
      + ' where it is, and a run passed by doing nothing');
  }
  if(duration === undefined){
    owes.push('no `duration` — how long the run lasts, between 20 s and 120 s');
  }
  if(authority === undefined){
    owes.push('no `authority` — how far the control can push, which is what decides whether the'
      + ' run can be won at all');
  }

  if(!isHold){
    // THE FINDING, once per stop, naming what the board IS rather than only what
    // it is missing — a list of seven absent fields does not tell the author that
    // the format is wrong, and the format being wrong is the whole of it.
    const freeze = board.prediction !== undefined || board.reveal !== undefined
      || board.commitRequiredBeforeReveal !== undefined || board.acceptanceRule !== undefined;
    if(freeze){
      owes.push('this board is a freeze-and-reveal — a `prediction`, a commit before the reveal,'
        + ' an `acceptanceRule` and the measurements uncovered after committing — and HOLD is a'
        + ' timed control run against disturbances. None of the seven fields a run needs is here'
        + ' and none of them is inferable from a prediction, so the panel renders empty. The'
        + ' format that matches this board is VERIFY, which is a prediction locked, a measurement'
        + ' revealed and a stated window to pass in; it also wants a `truth` and a `passRatio`'
        + ' that nobody has written down yet');
    } else {
      owes.push('this board does not author a control run — a HOLD is all five of a quantity, a'
        + ' named control, a target, a band and at least one disturbance, and a board short of any'
        + ' of them is carried where it stands rather than written under a key that would report a'
        + ' panel as present');
    }

    // The numbers ARE somewhere. Say where, because it is the only lead.
    const sources = [...list(pick(board, 'reveal', 'reveals'))
      .map(r => str(r && typeof r === 'object' ? pick(r, 'valueSource', 'source', 'value') : r)),
    str(pick(board, 'authoredPayload', 'inputsSource'))].filter(Boolean);
    const carried = sources.map(s => s.match(CARRIED_PAYLOAD)).find(Boolean);
    if(carried){
      owes.push(`the measurements are still in the board as prose — \`${carried[1]}:{…}\` quoted`
        + ' inside `valueSource`, the same string in every reveal entry, under a key nothing'
        + " reads. Read it off the stop's own payload line rather than out of here");
    }

    const key = authoredKey(stop);
    if(key !== 'hold'){
      owes.push(`the block is headed \`${key}:\` and no importer reads that key — it is kept as it`
        + ' stands rather than moved under `hold:`, because a `hold:` block with no run in it'
        + ' would report a panel that is not there');
    }
    return { key, value: board, owes };
  }

  // ---- a real one. Only what was written, under the names the panel reads.
  if(pass === undefined){
    owes.push('no `pass` — the fraction of the run that has to be spent inside the band');
  }
  if(direction && !['raise', 'lower'].includes(direction)){
    owes.push(`\`direction\` reads "${direction}" — it is \`raise\` or \`lower\`, which way the`
      + ' control moves the quantity');
  }
  if(narrowTo !== undefined && !(narrowTo > 0 && narrowTo <= band)){
    owes.push(`\`narrowTo\` is ${narrowTo} against a band of ${band} — it is the corridor at the`
      + ' END of the run, so it is positive and no wider than the one at the start');
  }
  if(!unit) owes.push('no `unit` — printed beside the needle and beside the target');

  return { key: 'hold', value: {
    quantity, control,
    ...(unit ? { unit } : {}),
    hold: holdAt, band,
    ...(narrowTo !== undefined ? { narrowTo } : {}),
    ...(duration !== undefined ? { duration } : {}),
    ...(authority !== undefined ? { authority } : {}),
    ...(pass !== undefined ? { pass } : {}),
    ...(direction ? { direction } : {}),
    ...(noise !== undefined ? { noise } : {}),
    disturbances: disturbances.slice().sort((a, c) => a.at - c.at),
    ...(str(pick(board, 'hint')) ? { hint: str(pick(board, 'hint')) } : {}),
    ...(str(pick(board, 'moral')) ? { moral: str(pick(board, 'moral')) } : {}),
    ...(str(pick(board, 'commit')) ? { commit: str(pick(board, 'commit')) } : {}),
  }, owes };
};

/* ------------------------------------------------------------------ selftest
 *
 * `node tools/bibleConvert/hold.mjs --selftest`
 *
 * THE CASE THIS FILE TURNS ON is the first group: a freeze-and-reveal board
 * must come back under its own key with its own content and a `value` that is
 * NOT a hold board — no `quantity`, no `hold`, no `band`, no `disturbances`.
 * Put the bug back by returning `{ key: 'hold', value: { quantity: '', ... } }`
 * for it and the `hold_patch` pair and the "nothing is written that would report
 * a panel" pair go red together, which is exactly the pair of cases the nine
 * shipping boards would hit.
 *
 * THE EQUAL-INPUTS CASE is the second group: the eight `hold:` boards differ
 * only in `prediction` and `correctConclusion`, so two of them must owe the
 * same list. A check keyed on anything else would pass on all eight and be
 * wrong the first time a board is finished.
 *
 * And the third group is the conversion this file would do if a board ever
 * authored a run, so the refusal above is a judgement about these nine boards
 * and not about the format.
 */

/** The template eight of the nine shipped, as `bible-build` hands it over. */
const FREEZE = (over = {}) => ({
  prediction: 'Fit and freeze exactly one named model using hours `0-5`, reveal hours `6-9`,'
    + ' and submit the model label `A` or `B` that passes the holdout.',
  commitRequiredBeforeReveal: true,
  acceptanceRule: 'Use the acceptance condition and units printed in the question;'
    + ' a near miss outside the window fails.',
  reveal: [
    { id: 'held_back_1', label: 'first concealed measurement',
      valueSource: '`holdout:{training:[{t:0,y:19},{t:5,y:33}],models:[{id:"A"},{id:"B"}],'
        + 'freeze_required:true,holdout:[{t:6,y:35},{t:9,y:29}],answer:"B"}`' },
    { id: 'held_back_2', label: 'independent concealed check',
      valueSource: '`holdout:{training:[{t:0,y:19},{t:5,y:33}],models:[{id:"A"},{id:"B"}],'
        + 'freeze_required:true,holdout:[{t:6,y:35},{t:9,y:29}],answer:"B"}`' },
  ],
  correctConclusion: 'B.',
  commonMistake: 'Changing the prediction after seeing the held-back measurement.',
  ...over,
});

/** Safety Factor's, the ninth, headed `hold_patch:` and carrying no payload. */
const PATCH = () => ({
  question: 'Given `r = 5.0 m`, `g = 9.80 m/s^2`, `theta_max = 20.0 degrees`, and'
    + ' `tan theta = v^2/(rg)`, operate the chair-speed control for `12 s` and submit one'
    + ' maximum safe speed setting in `m/s`.',
  authoredPayload: 'No structured payload was present; this block supplies it.',
  correctResult: 'Maximum 4.22 m/s; submit operator setting 4.20 m/s.',
  wrongButPlausible: 'A plausible shortcut that ignores one condition.',
  decisionCanFail: true,
  questionAndUnits: 'Given `r = 5.0 m`… submit one maximum safe speed setting in `m/s`.',
});

/** A board that authors the run, so the conversion path is exercised too. */
const RUN = (over = {}) => ({
  quantity: 'Chair angle',
  control: { id: 'speed', label: 'Chair speed' },
  unit: 'deg',
  hold: 14, band: 6, narrowTo: 3, duration: 45, authority: 0.9, pass: 0.8,
  direction: 'raise',
  disturbances: [
    { label: 'Second load of riders boards', at: 22, amount: 0.5 },
    { label: 'Wind gust across the platform', at: 8, amount: -0.4 },
  ],
  hint: 'Hold the chair angle inside the corridor while the loads come on.',
  ...over,
});

function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  // ---- THE NINE. A freeze-and-reveal board is not converted into a hold board.
  let r = convertCanonical(FREEZE(), { build: 'hold:\n  prediction: "…"\n' });
  check('a freeze-and-reveal board is named as one, not converted',
    has(r, 'this board is a freeze-and-reveal'), r.owes.join(' | '));
  check('…and VERIFY is named as the format it matches',
    has(r, 'The format that matches this board is VERIFY'), r.owes.join(' | '));
  check('…and every field a run needs is owed by its own name',
    ['no `quantity`', 'no `control`', 'no numeric `hold`', 'no numeric `band`',
      'no `disturbances`', 'no `duration`', 'no `authority`'].every(bit => has(r, bit)),
    r.owes.join(' | '));
  check('…and NOTHING is written that would report a panel as present',
    r.value.quantity === undefined && r.value.hold === undefined && r.value.band === undefined
    && r.value.disturbances === undefined && r.value.duration === undefined
    && r.value.authority === undefined, JSON.stringify(Object.keys(r.value)));
  check('…the board is carried where it stands rather than emptied',
    r.key === 'hold' && r.value.prediction === FREEZE().prediction
    && r.value.reveal.length === 2, r.key);
  check('…and the payload quoted inside `valueSource` is read out loud',
    has(r, '`holdout:{…}` quoted'), r.owes.join(' | '));

  // The ninth, headed `hold_patch:`.
  const patch = convertCanonical(PATCH(), { build: 'hold_patch:\n  question: "…"\n' });
  check('a board headed `hold_patch:` keeps that key rather than being moved under `hold:`',
    patch.key === 'hold_patch', patch.key);
  check('…and is reported for being under a key no importer reads',
    has(patch, 'the block is headed `hold_patch:`'), patch.owes.join(' | '));
  check('…and is named as authoring no control run',
    has(patch, 'does not author a control run'), patch.owes.join(' | '));
  check('…and no payload is claimed, because it says there is none',
    !has(patch, 'quoted'), patch.owes.join(' | '));

  // A board with no `build` on the stop still gets a key, and it is `hold`.
  check('a board whose stop carries no `build` is keyed `hold`',
    convertCanonical(FREEZE(), {}).key === 'hold');

  // ---- EQUAL INPUTS SCORE EQUAL. Two of the eight, differing only where the
  // eight actually differ.
  const a = convertCanonical(FREEZE(), { build: 'hold:\n' });
  const c = convertCanonical(FREEZE({ prediction: 'Fit, freeze, reveal both holdout months, and'
    + ' submit the better mechanism.', correctConclusion: 'The keyed result.' }),
  { build: 'hold:\n' });
  check('two shipping boards differing only where the eight differ owe the same list',
    a.owes.join('|') === c.owes.join('|'),
    `${a.owes.length} vs ${c.owes.length}`);

  // ---- THE CONVERSION, when a board authors one.
  r = convertCanonical(RUN(), { build: 'hold:\n' });
  check('a board that authors a run converts and owes nothing',
    r.owes.length === 0, r.owes.join(' | '));
  check('…under the key the panel reads', r.key === 'hold');
  check('…with the control read out of its `{id, label}` record',
    r.value.control === 'Chair speed', r.value.control);
  check('…and the disturbances in time order, not authoring order',
    r.value.disturbances.map(e => e.at).join(',') === '8,22',
    JSON.stringify(r.value.disturbances));
  check('…and every number carried under the panel\'s own name',
    r.value.hold === 14 && r.value.band === 6 && r.value.narrowTo === 3
    && r.value.duration === 45 && r.value.authority === 0.9 && r.value.pass === 0.8,
    JSON.stringify(r.value));

  // One field out, and only that field, and it is never defaulted — `duration`,
  // `authority` and `pass` all have defaults in the importer, and writing one
  // here answers a question the author was asked.
  for(const [field, bit] of [['duration', 'no `duration`'], ['authority', 'no `authority`'],
    ['pass', 'no `pass`']]){
    const short = RUN();
    delete short[field];
    const s = convertCanonical(short, { build: 'hold:\n' });
    check(`a run with no \`${field}\` is owed one`, has(s, bit), s.owes.join(' | '));
    check(`…and gets no \`${field}\` written for it`, s.value[field] === undefined);
    check(`…and owes only that`, s.owes.length === 1, s.owes.join(' | '));
  }

  // A run with no disturbances is not a short run, it is the other instrument.
  const still = RUN();
  still.disturbances = [];
  r = convertCanonical(still, { build: 'hold:\n' });
  check('a run with nothing pushing the needle is not converted as a run',
    has(r, 'no `disturbances`') && has(r, 'does not author a control run')
    && typeof r.value.control === 'object', r.owes.join(' | '));

  // A disturbance of zero is not a disturbance, and is not counted as one.
  const zero = RUN({ disturbances: [{ label: 'Nothing happens', at: 5, amount: 0 }] });
  r = convertCanonical(zero, { build: 'hold:\n' });
  check('a zero-amount disturbance is owed and does not make the board a run',
    has(r, 'no non-zero `amount`') && has(r, 'does not author a control run')
    && typeof r.value.control === 'object', r.owes.join(' | '));

  // `narrowTo` wider than the band is the corridor opening rather than closing.
  r = convertCanonical(RUN({ narrowTo: 9 }), { build: 'hold:\n' });
  check('a `narrowTo` wider than the band is reported',
    has(r, 'the corridor at the'), r.owes.join(' | '));
  check('…and is carried rather than clamped, because the author wrote it',
    r.value.narrowTo === 9);

  const failed = cases.filter(c2 => !c2.ok);
  for(const c2 of cases){
    console.log(`${c2.ok ? '  ok  ' : 'FAIL  '}${c2.name}${c2.ok ? '' : `\n        ${c2.detail}`}`);
  }
  console.log(`\nHOLD canonical converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY && process.argv.includes('--selftest')) selftest();
