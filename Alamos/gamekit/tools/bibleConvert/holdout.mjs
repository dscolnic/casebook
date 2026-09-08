// holdout.mjs — the bible's HOLDOUT board into the importer's.
//
// 9 stops across seven campaigns. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// WHAT THE FORMAT IS, because it decides what may be dropped. Not an acceptance
// window and not a slider with a right answer on it: TWO scored curves over one
// threshold axis. The player moves a line while watching the first curve, freezes
// it, and only then is the second curve run. The board is therefore two lists of
// points, and five is the floor — under five there is no shape to read, only a
// pair of endpoints and a guess.
//
// THE RENAMES. `heldOut` is the importer's `test`; `passScore` is its `pass`.
// Both are spellings. Nothing else moves.
//
// THE TRAP, and the only reason both curves exist: the position that scores best
// on the calibration curve must FAIL on the held-out one. If it passes, chasing
// the sample costs nothing and the player learns the opposite of the point. That
// is measured the way the importer measures it — the held-out point nearest the
// calibration peak — and reported, never repaired.
//
// NOT WRITTEN. `calibrationBestAt` and `correctAt` are the board's own claims
// about the curves it just authored. They are not fields the importer has; it
// reads the peaks off the points, so carrying them across would be a second
// description of one fact and the first correction to either would separate
// them. They are used as the author's claim and checked against the curves
// instead. `reason` has nowhere to go — the holdout block has no `moral`, and
// choosing which of `fitNote`, `testNote` or the hint should print an author's
// aside is a placement decision, not a rename; the same sentence is already
// authored at stop level as `why`.
//
// `fitNote` and `testNote` ARE owed rather than dropped. The engine's own note
// beside them says why: "what a batch is differs by game — shots, samples,
// patients, storm seasons", and without them the panel names the two sets
// "Calibration set" and "Held-out set" and a player who has never met the idea
// cannot tell what either one is. That is the defect the importer records
// against Quantum's holdout in its own comment.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'HOLDOUT';

const EPS = 1e-6;

/** Only the points carrying both numbers. A half-written point is not a point. */
const curve = (v) => list(v)
  .filter(p => num(p?.at) !== undefined && num(p?.value) !== undefined)
  .map(p => ({ at: num(p.at), value: num(p.value) }));

/** The highest-scoring point, first one on a tie — which is what the importer does. */
const peak = (pts) => pts.reduce((a, p) => (p.value > a.value ? p : a));

export const convert = (b) => {
  const owes = [];
  const a = pick(b, 'axis') ?? {};
  const min = num(pick(a, 'min'));
  const max = num(pick(a, 'max'));
  if(min === undefined || max === undefined || !(max > min)){
    owes.push('the axis has no numeric `min` and `max` with max above min — the line has nothing'
      + ' to move along');
  }

  const fit = curve(pick(b, 'fit', 'calibration'));
  const test = curve(pick(b, 'test', 'heldOut', 'held_out'));
  for(const [name, pts, said] of [['fit', fit, 'calibration'], ['test', test, 'held-out']]){
    if(pts.length < 5){
      owes.push(`the ${said} curve carries ${pts.length} point(s) with a numeric \`at\` and`
        + ` \`value\` — five are the floor, or there is no shape in \`${name}\` to read`);
    }
  }

  const pass = num(pick(b, 'pass', 'passScore'));
  if(pass === undefined){
    owes.push('no numeric `pass` — the held-out score the report has to reach');
  }

  // The curve checks, and only where both curves are actually there. A peak read
  // off two points is a sentence about this tool's patience, not about the board.
  if(fit.length >= 5 && test.length >= 5 && pass !== undefined){
    const bestFit = peak(fit);
    // The importer grades the trap on the held-out point NEAREST the calibration
    // peak, because the two curves need not be sampled at the same places.
    const there = test.reduce((x, p) =>
      (Math.abs(p.at - bestFit.at) < Math.abs(x.at - bestFit.at) ? p : x));
    if(there.value >= pass){
      owes.push(`the best calibration score sits at ${bestFit.at}, where the held-out curve scores`
        + ` ${there.value} and the pass mark is ${pass} — chasing the sample costs nothing, so the`
        + ' calibration curve needs a spike the other one lacks');
    }
    const bestTest = peak(test);
    if(bestTest.value < pass){
      owes.push(`no position on the axis reaches the pass mark ${pass} on the held-out curve —`
        + ` the best of it is ${bestTest.value} at ${bestTest.at}`);
    }
    // The board's own claims about the curves, checked rather than copied.
    const claimBest = num(pick(b, 'calibrationBestAt'));
    if(claimBest !== undefined && Math.abs(claimBest - bestFit.at) > EPS){
      owes.push(`the board says the calibration curve peaks at ${claimBest} and its own points`
        + ` peak at ${bestFit.at}`);
    }
    const claimRight = num(pick(b, 'correctAt', 'answerAt'));
    if(claimRight !== undefined){
      const here = test.find(p => Math.abs(p.at - claimRight) <= EPS);
      if(!here){
        owes.push(`the board names ${claimRight} as the position to hold and the held-out curve is`
          + ' not sampled there');
      } else if(here.value < pass){
        owes.push(`the board names ${claimRight} as the position to hold and the held-out curve`
          + ` scores ${here.value} there, under the pass mark ${pass}`);
      }
    }
  }

  // THE AXIS NAMES NO QUANTITY. The panel prints "Along the bottom: {label}" and
  // the handle's readout is that label plus a bare number, so a label saying only
  // that the line is a line leaves the player moving a control over nothing.
  // Matched on the shape — an axis named after the act of deciding rather than
  // after a measured thing — because "decision threshold" is what all nine boards
  // say and there is nothing behind it to convert.
  const axisLabel = str(pick(a, 'label'));
  if(!axisLabel){
    owes.push('the axis has no `label` — the handle then reads as a number with nothing under it');
  } else if(/^(the )?(decision |cut ?off |chosen )?(threshold|setting|control|parameter|line|level)$/i
    .test(axisLabel)){
    owes.push(`the axis is labelled "${axisLabel}", which names the act of deciding and not a`
      + ' quantity — say what the line is a line in');
  }

  // The two tab captions. See the note at the top of this file.
  if(!str(pick(b, 'fitNote')) || !str(pick(b, 'testNote'))){
    owes.push('no `fitNote` and `testNote` — the two sets are then labelled "Calibration set" and'
      + ' "Held-out set" and nothing on the panel says what a batch of this game actually is');
  }

  const axis = {
    ...(str(pick(a, 'label')) ? { label: str(pick(a, 'label')) } : {}),
    ...(str(pick(a, 'unit')) ? { unit: str(pick(a, 'unit')) } : {}),
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(num(pick(a, 'step')) !== undefined ? { step: num(pick(a, 'step')) } : {}),
  };
  const opt = (name) => (str(pick(b, name)) ? { [name]: str(pick(b, name)) } : {});
  const goals = list(pick(b, 'goals')).map(g => str(g)).filter(Boolean);

  return { key: 'holdout', value: {
    axis, fit, test,
    ...(pass !== undefined ? { pass } : {}),
    ...(num(pick(b, 'start')) !== undefined ? { start: num(pick(b, 'start')) } : {}),
    ...opt('unit'), ...opt('fitLabel'), ...opt('testLabel'),
    ...opt('fitNote'), ...opt('testNote'),
    ...opt('hint'), ...(goals.length ? { goals } : {}),
    ...opt('freeze'), ...opt('commit'), ...opt('afterFreeze'),
  }, owes };
};

/* ------------------------------------------- the stop's own authored board
 *
 * Nine HOLDOUT stops point at their own payload, eight of them readable, and
 * the finding is the same on all eight: THEY ARE NOT THIS INSTRUMENT.
 *
 * What they authored is a freeze-and-reveal — one prediction, one acceptance
 * window, one measurement uncovered afterwards:
 *
 *   commit_required: true
 *   fit: {predicted_range_km: 18420, acceptance_half_width_km: 12}
 *   reveal_after_commit: {measured_range_km: 18426}
 *
 * or a pair of models with a fitting error each and a handful of held-out
 * records to test them on. Both are real questions and neither is two scored
 * curves over one threshold axis. There is no axis on any of the eight, no pass
 * score, and no curve of five points anywhere — so what the trap has to say is
 * not "this board's calibration peak also passes", it is "this board has no
 * calibration curve to peak".
 *
 * That is reported, and reported in the board's own terms, because the fix is
 * an authoring decision: either the stop is rewritten as two curves over a
 * threshold, or it is a different format. Building a curve out of an acceptance
 * window — three numbers stretched into five points, a pass mark inferred from
 * a half-width — would import, render, and grade a player against a shape
 * nobody wrote. This tool converts what is there and names what is not.
 *
 * WHAT DOES CROSS. `fit_set.label` and the held-out set's label are the two tab
 * captions the engine has no wording for — `fitNote` and `testNote`, the defect
 * the importer records against Quantum's holdout — so an authored one is
 * carried. `pass`/`passScore`/`pass_score` and an axis under `axis` are read
 * where a board has them. Points are taken only where the author wrote the
 * format's own two names, `at` and `value` (or `threshold` and `score`): a
 * `{t, y}` is a time and a stage height, and calling it a threshold and a score
 * is not a rename, it is a relabelling of somebody else's measurement.
 */

/**
 * A scored curve, in the format's own vocabulary and no other. `at`/`value` is
 * what the importer reads; `threshold`/`score` is the same two things spelled
 * out. Anything else is a different measurement and is left where it is.
 */
const payloadCurve = (v) => list(v)
  .filter(p => p && typeof p === 'object' && !Array.isArray(p))
  .map(p => ({ at: num(pick(p, 'at', 'threshold')), value: num(pick(p, 'value', 'score')) }))
  .filter(p => p.at !== undefined && p.value !== undefined);

/** How many records the author did put in a set, whatever their fields are. */
const setSize = (v) => list(v).length;

/** The board is a freeze-and-reveal rather than a pair of curves. */
const FREEZE = ['commit_required', 'freeze_required', 'frozen_before_reveal', 'reveal_after_commit',
  'frozen_prediction', 'anti_cheat'];

/**
 * THE FOURTH ROUND'S BLOCK IS THE BOARD, and it is one word from the importer's.
 *
 * `holdout.axis`, five points in `fit`, five in `test` and a per-rule error
 * table are all written exactly as the panel reads them. The pass mark is
 * written `passScore`, and the importer reads `pass` — so the board came
 * through owing "holdout needs a numeric `pass`" about a block that authors it,
 * and the missing number then made the trap check fire as well. Two refusals,
 * one rename.
 *
 * Renamed, not defaulted. A pass mark this side invented would decide which
 * threshold the player is graded against, which is the whole of the stop.
 */
export const convertCanonical = (b, stop = {}) => {
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const owes = [];
  const value = { ...board };
  const pass = num(pick(board, 'pass', 'passScore', 'pass_score'));
  if(pass === undefined){
    owes.push('the block authors no pass mark under `pass` or `passScore` — the held-out score a'
      + ' frozen line has to reach, and without it nothing on the axis can be said to pass');
  } else {
    value.pass = pass;
    delete value.passScore;
    delete value.pass_score;
  }
  const said = str(pick(board, 'answerText', 'correctResult', 'correctConclusion'));
  const extra = (said && !String(stop.answerText ?? '').trim()) ? { answerText: said } : {};
  return { key: 'holdout', value, owes, extra };
};

export const convertPayload = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};

  const trailing = str(board._trailing);
  if(trailing){
    owes.push(`prose follows the board and is not part of it — "${trailing}" — read it before`
      + ' shipping: it is where a revealed number is written when the board has no slot for one');
  }

  const a = (() => {
    const x = pick(board, 'axis');
    return (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
  })();
  const min = num(pick(a, 'min'));
  const max = num(pick(a, 'max'));
  if(min === undefined || max === undefined || !(max > min)){
    owes.push('the axis has no numeric `min` and `max` with max above min — the line has nothing'
      + ' to move along');
  }

  const fitSource = pick(board, 'fit', 'calibration', 'training', 'train', 'fit_set');
  const testSource = pick(board, 'test', 'heldOut', 'held_out', 'holdout', 'holdout_set', 'hidden',
    'reveal_after_commit');
  const fit = payloadCurve(fitSource);
  const test = payloadCurve(testSource);
  for(const [name, pts, said, src] of
      [['fit', fit, 'calibration', fitSource], ['test', test, 'held-out', testSource]]){
    if(pts.length >= 5) continue;
    const wrote = setSize(src);
    owes.push(`the ${said} curve carries ${pts.length} point(s) with a numeric \`at\` and`
      + ` \`value\` — five are the floor, or there is no shape in \`${name}\` to read`
      + (wrote > pts.length
        ? `; the board wrote ${wrote} record(s) there under other names, and a record is not a`
          + ' score at a threshold until the author says which number is which'
        : ''));
  }

  const pass = num(pick(board, 'pass', 'passScore', 'pass_score'));
  if(pass === undefined){
    owes.push('no numeric `pass` — the held-out score the report has to reach');
  }

  // THE TRAP, and on these boards it is the absence of the thing the trap is
  // read off. A freeze-and-reveal has one acceptance window; this format has two
  // curves, and the lesson lives in the gap between them.
  if(fit.length < 5 || test.length < 5){
    const tells = FREEZE.filter(k => board[k] !== undefined);
    if(tells.length){
      owes.push('the board is a freeze-and-reveal — it carries '
        + `\`${tells.join('`, `')}\` — which is one prediction, one acceptance window and one`
        + ' measurement uncovered afterwards. This format is two scored curves over one threshold'
        + ' axis, and the whole lesson is that the position scoring best on the first fails on the'
        + ' second; neither curve is authored here, so there is nothing for the freeze to be'
        + ' between');
    }
  }

  if(fit.length >= 5 && test.length >= 5 && pass !== undefined){
    const bestFit = peak(fit);
    const there = test.reduce((x, p) =>
      (Math.abs(p.at - bestFit.at) < Math.abs(x.at - bestFit.at) ? p : x));
    if(there.value >= pass){
      owes.push(`the best calibration score sits at ${bestFit.at}, where the held-out curve scores`
        + ` ${there.value} and the pass mark is ${pass} — chasing the sample costs nothing, so the`
        + ' calibration curve needs a spike the other one lacks');
    }
    const bestTest = peak(test);
    if(bestTest.value < pass){
      owes.push(`no position on the axis reaches the pass mark ${pass} on the held-out curve —`
        + ` the best of it is ${bestTest.value} at ${bestTest.at}`);
    }
    const claimBest = num(pick(board, 'calibrationBestAt'));
    if(claimBest !== undefined && Math.abs(claimBest - bestFit.at) > EPS){
      owes.push(`the board says the calibration curve peaks at ${claimBest} and its own points`
        + ` peak at ${bestFit.at}`);
    }
    const claimRight = num(pick(board, 'correctAt', 'answerAt'));
    if(claimRight !== undefined){
      const here = test.find(p => Math.abs(p.at - claimRight) <= EPS);
      if(!here){
        owes.push(`the board names ${claimRight} as the position to hold and the held-out curve is`
          + ' not sampled there');
      } else if(here.value < pass){
        owes.push(`the board names ${claimRight} as the position to hold and the held-out curve`
          + ` scores ${here.value} there, under the pass mark ${pass}`);
      }
    }
  }

  const axisLabel = str(pick(a, 'label'));
  if(!axisLabel){
    owes.push('the axis has no `label` — the handle then reads as a number with nothing under it');
  } else if(/^(the )?(decision |cut ?off |chosen )?(threshold|setting|control|parameter|line|level)$/i
    .test(axisLabel)){
    owes.push(`the axis is labelled "${axisLabel}", which names the act of deciding and not a`
      + ' quantity — say what the line is a line in');
  }

  // The two tab captions, under the names a freeze-and-reveal board gives them.
  const setLabel = (v) => ((v && typeof v === 'object' && !Array.isArray(v))
    ? str(pick(v, 'label')) : '');
  const fitNote = str(pick(board, 'fitNote')) || setLabel(pick(board, 'fit_set', 'fit'));
  const testNote = str(pick(board, 'testNote')) || setLabel(pick(board, 'holdout_set', 'holdout'));
  if(!fitNote || !testNote){
    owes.push('no `fitNote` and `testNote` — the two sets are then labelled "Calibration set" and'
      + ' "Held-out set" and nothing on the panel says what a batch of this game actually is');
  }

  const axis = {
    ...(axisLabel ? { label: axisLabel } : {}),
    ...(str(pick(a, 'unit')) ? { unit: str(pick(a, 'unit')) } : {}),
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(num(pick(a, 'step')) !== undefined ? { step: num(pick(a, 'step')) } : {}),
  };
  const opt = (name) => (str(pick(board, name)) ? { [name]: str(pick(board, name)) } : {});
  const goals = list(pick(board, 'goals')).map(g => str(g)).filter(Boolean);

  const pk = str(stop.payloadKey);
  if(pk && pk !== 'holdout'){
    owes.push(`the payload is keyed \`${pk}\` rather than \`holdout\` — check what was written`
      + ' straight after that name, because a value before the first key does not survive the'
      + ' parse, and on this format that name is usually one of the two data sets');
  }

  return { key: 'holdout', value: {
    axis, fit, test,
    ...(pass !== undefined ? { pass } : {}),
    ...(num(pick(board, 'start')) !== undefined ? { start: num(pick(board, 'start')) } : {}),
    ...opt('unit'), ...opt('fitLabel'), ...opt('testLabel'),
    ...(fitNote ? { fitNote } : {}), ...(testNote ? { testNote } : {}),
    ...opt('hint'), ...(goals.length ? { goals } : {}),
    ...opt('freeze'), ...opt('commit'), ...opt('afterFreeze'),
  }, owes };
};

/* ------------------------------------------------------------------ selftest
 *
 * `node tools/bibleConvert/holdout.mjs --selftest`
 *
 * The case worth the file is the pair at the end: the trap read off a curve
 * written back to front has to give the same answer as the same curve written
 * forwards. All nine boards in the repo are written low-to-high, so a peak that
 * secretly means "the last point" would pass on every one of them.
 */
const FIXTURE = () => ({
  axis: { label: 'decision threshold', min: 0, max: 4, step: 1 },
  fit: [{ at: 0, value: 0.96 }, { at: 1, value: 0.98 }, { at: 2, value: 0.99 },
    { at: 3, value: 0.97 }, { at: 4, value: 0.95 }],
  heldOut: [{ at: 0, value: 0.79 }, { at: 1, value: 0.84 }, { at: 2, value: 0.86 },
    { at: 3, value: 0.91 }, { at: 4, value: 0.88 }],
  passScore: 0.90,
  calibrationBestAt: 2,
  correctAt: 3,
  fitNote: 'the eleven storms the rule was tuned on',
  testNote: 'four storms nobody looked at while tuning',
});

/** The fixture with an axis named after a quantity, so the rest can be tested alone. */
const WHOLE = () => {
  const f = FIXTURE();
  f.axis = { label: 'rainfall in the last hour', unit: 'mm', min: 0, max: 4, step: 1 };
  return f;
};

function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convert(WHOLE());
  check('a complete board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema with two curves',
    r.key === 'holdout' && r.value.fit.length === 5 && r.value.test.length === 5
    && r.value.pass === 0.9 && r.value.axis.min === 0 && r.value.axis.max === 4,
    JSON.stringify(r.value).slice(0, 140));

  // The same curves written back to front are the same curves.
  const flipped = WHOLE();
  flipped.fit.reverse(); flipped.heldOut.reverse();
  const rf = convert(flipped);
  check('the same board with both curves reversed owes exactly the same',
    rf.owes.length === 0, rf.owes.join(' | '));

  // THE TRAP: the calibration peak also passes on the held-out set.
  const flat = WHOLE();
  flat.heldOut[2].value = 0.94;
  r = convert(flat);
  check('a board whose calibration peak also passes held out is reported',
    has(r, 'chasing the sample costs nothing'), r.owes.join(' | '));

  // …and read off the peak, not off the middle or the end of the list.
  const flatFlipped = WHOLE();
  flatFlipped.heldOut[2].value = 0.94;
  flatFlipped.fit.reverse(); flatFlipped.heldOut.reverse();
  r = convert(flatFlipped);
  check('…and the trap is read off the peak, not off position',
    has(r, 'chasing the sample costs nothing'), r.owes.join(' | '));

  // A calibration peak somewhere else entirely must move the sentence with it.
  const moved = WHOLE();
  moved.fit = [{ at: 0, value: 0.99 }, { at: 1, value: 0.90 }, { at: 2, value: 0.89 },
    { at: 3, value: 0.88 }, { at: 4, value: 0.87 }];
  moved.calibrationBestAt = 0;
  r = convert(moved);
  check('the peak follows the numbers — a curve peaking at 0 is graded at 0',
    !has(r, 'chasing the sample costs nothing'), r.owes.join(' | '));

  const nothingPasses = WHOLE();
  nothingPasses.heldOut = nothingPasses.heldOut.map(p => ({ at: p.at, value: 0.5 }));
  r = convert(nothingPasses);
  check('a held-out curve that never reaches the pass mark is reported',
    has(r, 'no position on the axis reaches the pass mark'), r.owes.join(' | '));

  // REFUSE, DO NOT INVENT.
  const short = WHOLE();
  short.heldOut = short.heldOut.slice(0, 3);
  r = convert(short);
  check('a held-out curve of three points is owed the other two',
    has(r, 'the held-out curve carries 3 point(s)'), r.owes.join(' | '));
  check('…and no points are invented to make five', r.value.test.length === 3);
  check('…and the trap sentences stay quiet rather than read a peak off three points',
    !has(r, 'chasing the sample costs nothing'), r.owes.join(' | '));

  const halfPoint = WHOLE();
  halfPoint.fit[1] = { at: 1 };
  r = convert(halfPoint);
  check('a point with no value is not counted and not written',
    has(r, 'the calibration curve carries 4 point(s)') && r.value.fit.length === 4,
    r.owes.join(' | '));

  const noPass = WHOLE();
  delete noPass.passScore;
  r = convert(noPass);
  check('a board with no pass mark is owed one', has(r, 'no numeric `pass`'), r.owes.join(' | '));
  check('…and gets no pass written', r.value.pass === undefined);

  const noAxis = WHOLE();
  noAxis.axis = { label: 'decision threshold' };
  r = convert(noAxis);
  check('an axis with no min and max is owed them', has(r, 'no numeric `min` and `max`'));
  check('…and gets neither written',
    r.value.axis.min === undefined && r.value.axis.max === undefined);

  const backwards = WHOLE();
  backwards.axis = { min: 4, max: 4 };
  r = convert(backwards);
  check('an axis whose max does not exceed its min is reported',
    has(r, 'max above min'), r.owes.join(' | '));

  const noNotes = WHOLE();
  delete noNotes.fitNote; delete noNotes.testNote;
  r = convert(noNotes);
  check('a board with no set notes is owed them', has(r, 'no `fitNote` and `testNote`'));
  check('…and gets no captions written for it',
    r.value.fitNote === undefined && r.value.testNote === undefined
    && r.value.fitLabel === undefined && r.value.testLabel === undefined);

  const drifted = WHOLE();
  drifted.calibrationBestAt = 1;
  r = convert(drifted);
  check('a stated calibration peak that is not where the points peak is reported',
    has(r, 'peaks at 1 and its own points peak at 2'), r.owes.join(' | '));
  check('…and neither claim is carried into the value',
    r.value.calibrationBestAt === undefined && r.value.correctAt === undefined);

  const wrongAnswer = WHOLE();
  wrongAnswer.correctAt = 4;
  r = convert(wrongAnswer);
  check('a stated correct position scoring under the pass mark is reported',
    has(r, 'scores 0.88 there, under the pass mark'), r.owes.join(' | '));

  // The template's own axis: "decision threshold" names the act, not the quantity.
  r = convert(FIXTURE());
  check('an axis labelled "decision threshold" is reported for naming no quantity',
    r.owes.some(o => o.includes('names the act of deciding')), r.owes.join(' | '));
  check('…and an axis naming a measured thing is not',
    !convert(WHOLE()).owes.some(o => o.includes('names the act of deciding')));

  const offAxis = WHOLE();
  offAxis.correctAt = 7;
  r = convert(offAxis);
  check('a stated correct position the held-out curve never samples is reported',
    has(r, 'is not sampled there'), r.owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nHOLDOUT converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

/* ---------------------------------------------------- selftest: the payloads
 *
 * TWO CURVES OF FIVE POINTS, NOT ONE ACCEPTANCE WINDOW — the trap this format
 * exists for, and on the authored payloads it is the missing half that has to
 * be caught rather than a bad peak. So the cases come in pairs: a board that
 * really does carry two curves must convert and owe nothing, and the same board
 * with one curve replaced by an acceptance window must be reported as the
 * freeze-and-reveal it now is, with no curve built out of the window.
 *
 * Putting the bug back means letting `payloadCurve` read a `{t, y}` record as a
 * score at a threshold: the freeze-and-reveal cases go green, the board imports,
 * and the player is graded on a stage height called a score.
 */
const P_FIXTURE = () => ({
  axis: { label: 'rainfall in the last hour', unit: 'mm', min: 0, max: 4, step: 1 },
  fit: [{ at: 0, value: 0.96 }, { at: 1, value: 0.98 }, { at: 2, value: 0.99 },
    { at: 3, value: 0.97 }, { at: 4, value: 0.95 }],
  holdout: [{ at: 0, value: 0.79 }, { at: 1, value: 0.84 }, { at: 2, value: 0.86 },
    { at: 3, value: 0.91 }, { at: 4, value: 0.88 }],
  pass_score: 0.9,
  fitNote: 'the eleven storms the rule was tuned on',
  testNote: 'four storms nobody looked at while tuning',
});

function selftestPayload(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convertPayload(P_FIXTURE(), {});
  check('a whole payload board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema with two curves',
    r.key === 'holdout' && r.value.fit.length === 5 && r.value.test.length === 5
    && r.value.pass === 0.9 && r.value.axis.min === 0 && r.value.axis.max === 4
    && r.value.axis.label === 'rainfall in the last hour',
    JSON.stringify(r.value).slice(0, 180));

  const flipped = P_FIXTURE();
  flipped.fit.reverse();
  r = convertPayload(flipped, {});
  check('the same board with the calibration curve written back to front owes the same',
    r.owes.length === 0, r.owes.join(' | '));

  // THE TRAP as the §7 path knows it: the calibration peak also passes.
  const flat = P_FIXTURE();
  flat.holdout[2].value = 0.94;
  r = convertPayload(flat, {});
  check('a payload board whose calibration peak also passes held out is reported',
    has(r, 'chasing the sample costs nothing'), r.owes.join(' | '));
  const flatFlipped = P_FIXTURE();
  flatFlipped.holdout[2].value = 0.94;
  flatFlipped.fit.reverse(); flatFlipped.holdout.reverse();
  r = convertPayload(flatFlipped, {});
  check('…and the trap is read off the peak, not off which point was written last',
    has(r, 'chasing the sample costs nothing'), r.owes.join(' | '));

  // THE TRAP AS THE AUTHORED BOARDS ACTUALLY FAIL IT: one window, no curves.
  const freeze = {
    commit_required: true,
    fit: { predicted_range_km: 18420, acceptance_half_width_km: 12 },
    reveal_after_commit: { measured_range_km: 18426 },
    correct_conclusion: 'pass_holdout_and_stand_down_land_corridor',
  };
  r = convertPayload(freeze, {});
  check('a freeze-and-reveal board is named as one rather than converted',
    has(r, 'it carries `commit_required`, `reveal_after_commit`'), r.owes.join(' | '));
  check('…and is owed both curves',
    has(r, 'there is no shape in `fit` to read')
    && has(r, 'there is no shape in `test` to read'), r.owes.join(' | '));
  check('…and neither curve is built out of the acceptance window',
    r.value.fit.length === 0 && r.value.test.length === 0, JSON.stringify(r.value));
  check('…and no pass mark is inferred from the half-width', r.value.pass === undefined);
  check('…and no axis is inferred from the prediction and its window',
    r.value.axis.min === undefined && r.value.axis.max === undefined);

  // A held-out SET of records is not a held-out CURVE, and the difference is said.
  const records = {
    axis: { label: 'radiator capacity', unit: 'percent', min: 60, max: 100, step: 2 },
    fit: [{ at: 60, value: 0.90 }, { at: 70, value: 0.93 }, { at: 80, value: 0.95 },
      { at: 90, value: 0.94 }, { at: 100, value: 0.92 }],
    holdout_set: [{ id: 'h1', radiator_capacity_percent: 100, outlet_K: 566 },
      { id: 'h2', radiator_capacity_percent: 72, outlet_K: 569 },
      { id: 'h3', radiator_capacity_percent: 70, outlet_K: 568 }],
    freeze_required: true,
    pass: 0.9,
    fitNote: 'eight visible normal intervals', testNote: 'three intervals nobody looked at',
  };
  r = convertPayload(records, {});
  check('a held-out set of records is counted and refused as a curve',
    has(r, 'the board wrote 3 record(s) there under other names'), r.owes.join(' | '));
  check('…and none of its fields is renamed into `at` and `value`', r.value.test.length === 0);
  check('…while the calibration curve it DID author still converts', r.value.fit.length === 5);

  // A `{t, y}` series is a measurement, not a score at a threshold.
  const timeSeries = {
    axis: { label: 'stage height', unit: 'm', min: 0, max: 9, step: 1 },
    training: [{ t: 0, y: 19 }, { t: 2, y: 21 }, { t: 4, y: 29 }, { t: 5, y: 33 },
      { t: 6, y: 35 }],
    holdout: [{ t: 6, y: 35 }, { t: 7, y: 38 }, { t: 8, y: 34 }, { t: 9, y: 29 },
      { t: 10, y: 24 }],
    fitNote: 'the four hours already gauged', testNote: 'the four hours after the crest',
  };
  r = convertPayload(timeSeries, {});
  check('a `{t, y}` series is not read as a scored curve',
    r.value.fit.length === 0 && r.value.test.length === 0, JSON.stringify(r.value));
  check('…and both are reported as five records the author never scored',
    r.owes.filter(o => o.includes('the board wrote 5 record(s) there under other names')).length === 2,
    r.owes.join(' | '));

  // REFUSE, DO NOT INVENT.
  const noPass = P_FIXTURE();
  delete noPass.pass_score;
  r = convertPayload(noPass, {});
  check('a board with no pass mark is owed one', has(r, 'no numeric `pass`'));
  check('…and gets none written', r.value.pass === undefined);

  const noAxis = P_FIXTURE();
  noAxis.axis = { label: 'decision threshold' };
  r = convertPayload(noAxis, {});
  check('an axis with no min and max is owed them', has(r, 'no numeric `min` and `max`'));
  check('…and gets neither written',
    r.value.axis.min === undefined && r.value.axis.max === undefined);
  check('…and "decision threshold" is reported for naming no quantity',
    has(r, 'names the act of deciding'), r.owes.join(' | '));

  const notes = P_FIXTURE();
  delete notes.fitNote; delete notes.testNote;
  r = convertPayload(notes, {});
  check('a board with no set notes is owed them', has(r, 'no `fitNote` and `testNote`'));
  check('…and gets no captions written for it',
    r.value.fitNote === undefined && r.value.testNote === undefined);

  // …unless the author put them on the sets themselves, which is where the
  // freeze-and-reveal boards write them.
  const labelled = {
    ...records,
    fit_set: { label: 'Eight visible normal intervals' },
    holdout_set: { label: 'Three intervals nobody looked at' },
  };
  delete labelled.fitNote; delete labelled.testNote;
  r = convertPayload(labelled, {});
  check('a set label is carried into the tab caption the engine has no wording for',
    r.value.fitNote === 'Eight visible normal intervals'
    && r.value.testNote === 'Three intervals nobody looked at', JSON.stringify(r.value).slice(0, 200));

  r = convertPayload(P_FIXTURE(), { payloadKey: 'train' });
  check('a payload keyed on one of its own data sets is flagged',
    has(r, 'keyed `train`'), r.owes.join(' | '));

  const trailing = P_FIXTURE();
  trailing._trailing = 'update reveals 4.235 m.';
  r = convertPayload(trailing, {});
  check('prose after the board is read out loud rather than dropped',
    has(r, '4.235 m'), r.owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nHOLDOUT payload converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY && process.argv.includes('--selftest')){ selftest(); console.log(); selftestPayload(); }
