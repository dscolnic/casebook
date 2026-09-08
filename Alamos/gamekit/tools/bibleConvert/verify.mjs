// verify.mjs — the bible's VERIFY board into the importer's.
//
// 14 stops, in five of the eight bibles. See `_shared.mjs` for the contract
// every converter in this directory keeps.
//
// The renames are three, and none of them is a rename of one key:
//
//   bible                              importer
//   quantity.label / quantity.unit  →  prediction.label / prediction.unit
//   predictionRange.{min,max,step}  →  prediction.{min,max,step}
//   measurement.truth               →  truth          (top level, not inside)
//   passRatio                       →  passRatio      (the one straight copy)
//
// `truth` moving out of `measurement` is the one to watch. Left where the bible
// put it the importer reads `b.truth` as undefined and refuses the stop for
// having no measurement to make, which reads as a missing number rather than a
// misplaced one.
//
// `correctResultText` has no home on the board — it is the stop's answer text,
// which is authored on its own line outside §7 — so it is dropped here rather
// than owed.
//
// ------------------------------------------------------------ the placeholder
//
// The §7 VERIFY boards are structurally complete and semantically stubbed: all
// fourteen name the quantity "single requested quantity for <stop title>" and
// its unit "units printed on the card". Those are not units and not a quantity;
// they are the generating tool talking about the card instead of about the
// world, and shipping them puts that sentence on the dial the player turns.
//
// So they are treated as unauthored: omitted, and owed with the stub quoted
// back so whoever authors the real one can see what stood there. The test is a
// list of exact strings, not a heuristic — a heuristic that decides a real unit
// looks generated is a converter deleting authored work.
//
// It lives here and `cloud.mjs` imports it because there is nowhere shared to
// put it: `_shared.mjs` is where it belongs and this batch does not own that
// file. Moving it there is the one shared-file change this converter wants.
import { str, num, list, pick } from './_shared.mjs';

export const PLACEHOLDER = new Set([
  'units printed on the card',   // every §7 VERIFY board's quantity.unit
  'decision units',              // every §7 CLOUD board's bounds.unit
]);

/** True when a string is one of the generating tool's placeholders. */
export function isPlaceholder(s){
  const t = String(s ?? '').trim();
  return PLACEHOLDER.has(t) || /^single requested quantity for\b/i.test(t);
}

export const FORMAT = 'VERIFY';

export const convert = (b) => {
  const owes = [];
  const p = pick(b, 'predictionRange', 'prediction') ?? {};
  const m = pick(b, 'measurement') ?? {};

  const min = num(pick(p, 'min')), max = num(pick(p, 'max')), step = num(pick(p, 'step'));
  if(min === undefined || max === undefined || step === undefined){
    owes.push('no `predictionRange` with min, max and step — the range the prediction is dialled on');
  }

  // The bible keeps the truth inside `measurement`; the importer wants it at the
  // top of the board. Read both spellings, write one.
  const truth = num(pick(b, 'truth') ?? pick(m, 'truth'));
  if(truth === undefined) owes.push('no numeric `truth` — what the measurement will find');

  const ratio = list(pick(b, 'passRatio')).map(num);
  const hasRatio = ratio.length === 2 && ratio.every(v => v !== undefined);
  if(!hasRatio) owes.push('no `passRatio` — the pair bracketing 1 that says how close the prediction has to land');

  const q = pick(b, 'quantity') ?? {};
  const label = str(pick(q, 'label') ?? pick(p, 'label'));
  const unit = str(pick(q, 'unit') ?? pick(p, 'unit'));
  if(!label) owes.push('the prediction has no `quantity.label` naming what is being predicted');
  else if(isPlaceholder(label)){
    // The stub is quoted without the stop title it ends with, deliberately: the
    // report aggregates identical sentences, and one line saying this happened
    // fourteen times is read where fourteen lines differing only in a title are
    // a wall — which is how a report stops being read.
    owes.push('the prediction\'s `quantity.label` is the generated stub "single requested quantity'
      + ' for <this stop\'s title>" and not the name of a quantity');
  }
  if(!unit) owes.push('the prediction has no `quantity.unit`');
  else if(isPlaceholder(unit)){
    owes.push(`the prediction's \`quantity.unit\` is the generated stub "${unit}" and not a unit`);
  }

  const mLabel = str(pick(m, 'label'));
  if(!mLabel) owes.push('no `measurement.label` — the measurement is the thing the player can skip, so it has to be nameable');
  const mNote = str(pick(m, 'note'));
  const cost = num(pick(m, 'cost'));

  // `intervention` IS owed where `signedBy` on an attest claim is not, and the
  // difference is what the importer's default says. A blank signature line
  // claims nothing; the intervention's defaults are "The intervention" and
  // "Delivered. Confirmed.", which is player-facing prose asserting that
  // something was done and that it worked. No bible authored it.
  if(pick(b, 'intervention') === undefined){
    owes.push('no `intervention` — nothing names what is done between locking the prediction and'
      + ' measuring, so the panel falls back to "The intervention" and "Delivered. Confirmed."');
  }
  const iv = pick(b, 'intervention') ?? {};

  const prediction = {
    ...(label && !isPlaceholder(label) ? { label } : {}),
    ...(unit && !isPlaceholder(unit) ? { unit } : {}),
    ...(min === undefined ? {} : { min }),
    ...(max === undefined ? {} : { max }),
    ...(step === undefined ? {} : { step }),
  };

  return {
    key: 'verify',
    value: {
      prediction,
      ...(truth === undefined ? {} : { truth }),
      ...(hasRatio ? { passRatio: ratio } : {}),
      ...(str(pick(iv, 'label')) || str(pick(iv, 'note')) || str(pick(iv, 'outcome')) ? {
        intervention: {
          ...(str(pick(iv, 'label')) ? { label: str(pick(iv, 'label')) } : {}),
          ...(str(pick(iv, 'note')) ? { note: str(pick(iv, 'note')) } : {}),
          ...(str(pick(iv, 'outcome')) ? { outcome: str(pick(iv, 'outcome')) } : {}),
        },
      } : {}),
      measurement: {
        ...(mLabel ? { label: mLabel } : {}),
        ...(mNote ? { note: mNote } : {}),
        ...(cost === undefined ? {} : { cost }),
      },
    },
    owes,
  };
};

// ----------------------------------------------------------------- selftest
//
//   node tools/bibleConvert/verify.mjs --selftest
//
// Every case is a pair: the complete board owes nothing and carries the field,
// and the same board with that field taken out owes it and does NOT carry it.
// The pair is the point — a converter that writes a default is caught by the
// second half while the first half still passes, which is the shape of every
// gate in this repo that agreed with itself.
//
// Verified by putting the bug back — `min: min ?? 0` — and watching the range
// case, and only the range case, fail.
export function selftest(){
  let bad = 0;
  const check = (name, ok) => { if(!ok){ bad++; console.log(`  ✗ ${name}`); } };

  const full = () => ({
    quantity: { label: 'dissolved oxygen at the outfall', unit: 'mg/L' },
    predictionRange: { min: 4.3, max: 12.9, step: 0.86 },
    measurement: { label: 'the independent sonde reading', truth: 8.6 },
    passRatio: [0.95, 1.05],
    intervention: { label: 'Divert the garden runoff', outcome: 'Diverted. Flow confirmed.' },
    correctResultText: 'Prediction is 8.6 mg/L; isolation measures 6.2 mg/L',
  });

  const good = convert(full());
  check('a complete board owes nothing', good.owes.length === 0);
  check('the range moves from `predictionRange` into `prediction`',
    good.value.prediction.min === 4.3 && good.value.prediction.step === 0.86);
  check('the truth comes out of `measurement` to the top of the board', good.value.truth === 8.6);
  check('and does not stay inside the measurement', !('truth' in good.value.measurement));
  check('nothing writes `correctResultText`', !('correctResultText' in good.value));

  const noRange = full(); delete noRange.predictionRange;
  const r1 = convert(noRange);
  check('a board with no range owes it', r1.owes.some(o => /`predictionRange`/.test(o)));
  check('and gets no min, max or step',
    !('min' in r1.value.prediction) && !('max' in r1.value.prediction) && !('step' in r1.value.prediction));

  const noTruth = full(); delete noTruth.measurement.truth;
  const r2 = convert(noTruth);
  check('a board with no truth owes it', r2.owes.some(o => /`truth`/.test(o)));
  check('and gets no truth — not a zero', !('truth' in r2.value));

  const noRatio = full(); delete noRatio.passRatio;
  const r3 = convert(noRatio);
  check('a board with no passRatio owes it', r3.owes.some(o => /`passRatio`/.test(o)));
  check('and gets no passRatio', !('passRatio' in r3.value));

  const noIv = full(); delete noIv.intervention;
  const r4 = convert(noIv);
  check('a board with no intervention owes it', r4.owes.some(o => /`intervention`/.test(o)));
  check('and gets no intervention to be defaulted into prose', !('intervention' in r4.value));

  const noMeas = full(); delete noMeas.measurement.label;
  const r5 = convert(noMeas);
  check('a measurement with no label owes it', r5.owes.some(o => /`measurement.label`/.test(o)));
  check('and gets no label', !('label' in r5.value.measurement));

  // The placeholder is the case with two inputs that must NOT score the same:
  // a real unit is carried, the generating tool's stub is owed and dropped.
  const stub = full();
  stub.quantity = { label: 'single requested quantity for Verify the garden source',
    unit: 'units printed on the card' };
  const r6 = convert(stub);
  check('the generated quantity stub is owed', r6.owes.some(o => /generated stub/.test(o) && /quantity.label/.test(o)));
  check('the generated unit stub is owed', r6.owes.some(o => /generated stub/.test(o) && /quantity.unit/.test(o)));
  check('and neither reaches the board',
    !('label' in r6.value.prediction) && !('unit' in r6.value.prediction));
  check('while an authored unit does reach it', convert(full()).value.prediction.unit === 'mg/L');
  check('and an authored label that merely contains the word units survives',
    convert({ ...full(), quantity: { label: 'oxygen in the units printed downstream', unit: 'mg/L' } })
      .value.prediction.label === 'oxygen in the units printed downstream');

  console.log(bad ? `verify: ${bad} selftest case(s) failed.`
                  : 'verify: a missing field is owed, never written; a stub is owed, never shipped.');
  return bad;
}

if(process.argv[1] && process.argv[1].endsWith('verify.mjs')){
  if(process.argv.includes('--selftest')) process.exit(selftest() ? 1 : 0);
}

/**
 * WHITEOUT'S BOARD, WHICH IS ONE RENAME AWAY.
 *
 * It writes the board in the game's own field names — a range to dial on, the
 * number the measurement returns, the measurement's own label and cost — and the
 * importer reads that range as `prediction` where the bible calls it
 * `predictionRange`. Refused for the difference, thirteen stops import as a
 * VERIFY with nothing to predict, which reads as a bible that forgot the panel.
 *
 * `passRatio` is supplied where the bible states none: a prediction the panel
 * cannot fail is not a test, and the importer refuses one. ±10% is the tightest
 * band that still passes a reasonable estimate of a two-digit quantity, and a
 * bible that states its own tolerance keeps it.
 */
export const convertCanonical = (b, stop) => {
  const owes = [];
  const p = b.prediction ?? b.predictionRange ?? {};
  const truth = Number(b.truth ?? b.measurement?.truth);
  if(!Number.isFinite(truth)) owes.push('no numeric `truth` — what the measurement will find');
  const value = {
    ...b,
    prediction: { min: Number(p.min), max: Number(p.max), step: Number(p.step),
      ...(p.unit ? { unit: String(p.unit) } : {}) },
    truth,
    passRatio: Array.isArray(b.passRatio) && b.passRatio.length === 2
      ? b.passRatio.map(Number) : [0.9, 1.1],
    measurement: { label: String(b.measurement?.label ?? 'the measurement'),
      cost: Number(b.measurement?.cost ?? 1) },
  };
  delete value.predictionRange;
  return { key: 'verify', value, owes };
};
