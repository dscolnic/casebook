// sweep.mjs — the bible's SWEEP board into the importer's.
//
// Four stops: headwater M6 S22, midway M5 S19, planetary_defense M10 S39,
// redsand M4 S16. See `_shared.mjs` for the contract every converter keeps.
//
// THE THING TO KNOW ABOUT THESE FOUR BOARDS. They are the same board. Same
// axis (`controlled setting`, 0–10, step 1), same start, same target 7, same
// tolerance .25, same four response points {0,2} {3,5} {7,9} {10,8} — in four
// campaigns that teach saturation, brake response, radar frames and gas-stream
// transport. Only `correctConclusion` differs, and in headwater's case it names
// `t=4` and tolerance `.01` against a board whose target is 7 and whose
// tolerance is .25. The campaign's own sweep is in `stop.payload`, under a
// different schema again (headwater writes `control: "t"`, midway writes a
// `points:` list of pairs, planetary_defense writes named boolean channels).
//
// So this converter carries the structure across and owes the rest loudly. It
// does not reach for the payload: that is a second source in eight shapes and a
// converter that silently prefers one over the other is two descriptions of
// where a board comes from.
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'SWEEP';

// An axis label that names no quantity. The handle has to move something the
// player can name, or the readout is a number with no noun on it.
const GENERIC_AXIS = /^(the\s+)?(controlled\s+)?(setting|control|parameter|value|x|axis)$/i;

export const convert = (b) => {
  const owes = [];
  const value = {};

  // ---- the axis. label/min/max/step are carried; `unit` is not authored.
  const axis = b.axis ?? {};
  const min = num(axis.min), max = num(axis.max), step = num(axis.step);
  const ax = {};
  if(str(axis.label)) ax.label = str(axis.label);
  else owes.push('the sweep axis has no label — nothing names what the handle moves');
  if(min !== undefined) ax.min = min; else owes.push('the sweep axis has no numeric `min`');
  if(max !== undefined) ax.max = max; else owes.push('the sweep axis has no numeric `max`');
  if(step !== undefined) ax.step = step;
  if(!str(axis.unit)) owes.push('the sweep axis has no `unit` — the handle reads as a bare number');
  if(GENERIC_AXIS.test(str(axis.label))){
    owes.push(`the sweep axis is labelled "${str(axis.label)}", which names no quantity —`
      + ' this is the template board, not this campaign\'s');
  }
  value.axis = ax;

  // ---- the curve. The bible writes `series` as a flat list of points; the
  // importer's `series` is a list of CURVES, each with its own response. One
  // unlabelled curve is the importer's `response`, so that is what this writes.
  // Emitting the bible's list under the bible's key would land a point list
  // where the importer looks for `x.response` and report the wrong fault.
  const raw = list(pick(b, 'series', 'response', 'points'));
  const pts = raw.map((p, i) => {
    // `[at, value]` pairs are one of the shapes the payloads use; a §7 board
    // that ever adopts it should not be read as four undefined points.
    const at = num(Array.isArray(p) ? p[0] : pick(p, 'at', 'x'));
    const v = num(Array.isArray(p) ? p[1] : pick(p, 'value', 'y'));
    if(at === undefined || v === undefined) owes.push(`sweep response point ${i + 1} has no numeric \`at\`/\`value\``);
    return (at === undefined || v === undefined) ? null : { at, value: v };
  }).filter(Boolean);
  if(pts.length) value.response = pts;
  else owes.push('the sweep authors no response points');
  if(raw.some(p => !Array.isArray(p) && str(p.label))){
    owes.push('a sweep response point carries a `label` — several curves need `series`,'
      + ' which this board does not author');
  }

  // ---- the readout. Not authored anywhere in the eight, and the importer
  // defaults it to two empty strings, so the instrument renders a trace with
  // nothing named on either side of it.
  if(!str(b.readout?.label) && !str(b.readout?.unit)){
    owes.push('the sweep has no `readout` — no label and no unit for what the instrument reads');
  }

  // ---- the answer.
  const target = num(b.target), tol = num(b.tolerance), start = num(b.start);
  if(target !== undefined) value.target = target; else owes.push('the sweep has no numeric `target`');
  if(tol !== undefined) value.tolerance = tol; else owes.push('the sweep has no positive `tolerance`');
  if(start !== undefined) value.start = start;
  else owes.push('the sweep has no `start` — the importer would put the handle on the axis minimum');

  // The importer checks the target is inside the axis. It never checks the
  // response was sampled anywhere near it, so a board can name a feature its
  // own four points do not describe. Not a duplicate of any gate.
  if(target !== undefined && pts.length && !pts.some(p => Math.abs(p.at - target) <= Math.max(tol ?? 0, (step ?? 0)))){
    owes.push(`the response is never sampled at the target ${target} — the feature the player`
      + ' is asked to find is not in the authored curve');
  }

  // `mode` decides whether this is a peak to find or two costs to trade off.
  // The importer defaults it to `peak`; nobody chose.
  if(!str(b.mode)) owes.push('the sweep authors no `mode` — peak or boundary was never decided');

  // The verdict text. It is a top-level `answerText` on the stop, not a key
  // inside `sweep`, and the contract returns one key.
  const conc = str(pick(b, 'correctConclusion', 'conclusion', 'correct_conclusion', 'answerText'));
  if(!conc) owes.push('the sweep has no conclusion, so the stop has no `answerText` — a sweep'
    + ' has no options to fall back on and the player is told they were wrong and never told what'
    + ' the reading should have been');
  else owes.push('the board\'s conclusion is the stop\'s `answerText`, a top-level key this'
    + ' converter cannot write — the contract returns one key');

  // headwater's conclusion names a tolerance of .01 against a board whose
  // tolerance is .25. When the prose and the board disagree, one of them is
  // this campaign's and the other is the template's.
  // `[^0-9.]` and not `[^0-9]`, or the gap eats the leading dot of a bare `.01`
  // and the owe reports a tolerance of 1. The number is still wrong either way,
  // but a gate that misquotes the board is a gate nobody checks twice.
  const saidTol = conc.match(/tolerance[^0-9.]{0,12}(\.?[0-9]*\.?[0-9]+)/i);
  if(saidTol && tol !== undefined && Math.abs(Number(saidTol[1]) - tol) > 1e-9){
    owes.push(`the conclusion names a tolerance of ${saidTol[1]} and the board authors ${tol}`);
  }

  return { key: 'sweep', value, owes };
};

// ------------------------------------------------------- the authored board
//
// The four stops point at their own payload, and unlike §7 those are four
// different sweeps: headwater's `t` from 0 to 10 h in half-hours, midway's
// brake current 0–100 % against upward acceleration, planetary_defense's eight
// calibrated radar frames, redsand's cartridge temperature 180–330 K with three
// substances on it. Three of the four author a real axis and two author real
// curves, so most of this converts.
//
// FOUR SHAPES, AND THE AXIS IS WRITTEN THREE WAYS.
//
//   control: {id, label, min, max, step, unit}     midway, redsand
//   control: "t" with min/max/step/unit beside it  headwater
//   control: {label, values: [1..8]}               planetary_defense
//
// The third is an axis written as the settings it can take. Reading min, max
// and step off an evenly spaced list is the same axis in another notation, not
// a new fact — but a list that is NOT evenly spaced is a set of settings rather
// than a continuum, and no step describes it, so that is owed.
//
// THE CURVE, two ways: `points: [[x, y], …]` is one unlabelled curve and becomes
// the importer's `response`; `series: [{id, label, readings: [[x, y], …]}, …]` is
// several and becomes its `series`. planetary_defense authors neither: its
// readings are three BOOLEAN channels per frame — shoulder present, coherent
// with the primary, stationary artifact — and a sweep plots a number. Turning
// true into 1 is choosing an encoding nobody authored and plotting it as a
// square wave, so it is owed instead.
//
// WHAT NONE OF THE FOUR AUTHOR: `target` and `tolerance`. headwater's conclusion
// says the maximum slope is at t = 4 in prose; midway's `correct_region` is the
// whole axis, which is a sweep with no feature to find; planetary_defense's
// `correct_setting` is the word "all_eight_frames". Mining a number out of a
// sentence is authoring the grading, so all three are owed with what the board
// says instead quoted.
//
// `goal` IS carried, and it is the one piece of the answer half that may be:
// "persistent motion connected to the primary in at least 6 of 8 frames" states
// the criterion and never the handle position. It becomes `goals`, which is
// what the panel prints — the goal, never the target.

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

/** `[[0, 4.0], …]` or `[{at, value}, …]` → the importer's points, or [] with the reason owed. */
function points(raw, owes, at){
  const out = [];
  list(raw).forEach((p, i) => {
    const x = num(Array.isArray(p) ? p[0] : pick(p, 'at', 'x'));
    const y = num(Array.isArray(p) ? p[1] : pick(p, 'value', 'y'));
    if(x === undefined || y === undefined){
      owes.push(`${at} point ${i + 1} has no numeric position and value`);
      return;
    }
    out.push({ at: x, value: y });
  });
  return out;
}

const CONSUMED = new Set(['control', 'axis', 'min', 'max', 'step', 'unit', 'values',
  'response', 'readout', 'response_label', 'points', 'series', 'readings', 'mode',
  'target', 'correct_setting', 'tolerance', 'start', 'goal', 'goals', 'hint',
  'correct', 'conclusion', 'correct_conclusion', 'correctConclusion', 'answerText',
  'correct_region', 'correct_interpretation', '_trailing']);

/**
 * The stop's own authored sweep. `stop` carries the printed question, which the
 * importer checks the target against — so a target read out of the board is
 * checked against it here too, where the sentence is still in hand.
 */
export const convertPayload = (b, stop = {}) => {
  const owes = [];
  const value = {};
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  if(stop.payloadKey && stop.payloadKey !== 'sweep'){
    owes.push(`the payload is written under \`${stop.payloadKey}\` and the importer reads a sweep`
      + ' from `sweep` — one of the two names is wrong');
  }

  // ---- the axis, in whichever of the three notations the campaign used.
  const ctl = pick(board, 'control', 'axis');
  const ctlMap = (ctl && typeof ctl === 'object' && !Array.isArray(ctl)) ? ctl : {};
  const label = str(pick(ctlMap, 'label')) || (typeof ctl === 'string' ? str(ctl) : '');
  const unit = str(pick(ctlMap, 'unit')) || str(board.unit);
  let min = num(pick(ctlMap, 'min')) ?? num(board.min);
  let max = num(pick(ctlMap, 'max')) ?? num(board.max);
  let step = num(pick(ctlMap, 'step')) ?? num(board.step);
  const values = list(pick(ctlMap, 'values') ?? pick(board, 'values')).map(num);
  if(min === undefined && max === undefined && values.length >= 2 && values.every(v => v !== undefined)){
    const gaps = values.slice(1).map((v, i) => v - values[i]);
    const even = gaps.every(g => Math.abs(g - gaps[0]) < 1e-9) && gaps[0] > 0;
    if(even){ min = values[0]; max = values[values.length - 1]; step = step ?? gaps[0]; }
    else {
      owes.push(`the axis is written as the settings [${values.join(', ')}], which are not evenly`
        + ' spaced — that is a set of settings rather than a continuum, and no `step` describes it');
    }
  }
  const axis = {};
  if(label) axis.label = label; else owes.push('the sweep axis has no label — nothing names what the handle moves');
  if(unit) axis.unit = unit; else owes.push('the sweep axis has no `unit` — the handle reads as a bare number');
  if(min !== undefined) axis.min = min; else owes.push('the sweep axis has no numeric `min`');
  if(max !== undefined) axis.max = max; else owes.push('the sweep axis has no numeric `max`');
  if(step !== undefined) axis.step = step;
  if(GENERIC_AXIS.test(label)) owes.push(`the sweep axis is labelled "${label}", which names no quantity`);
  value.axis = axis;

  // ---- the readout. `response` is a map of label and unit, or a string that is
  // the whole name of the reading — "S(t) mm/h" — and splitting that into a
  // label and a unit is a guess about where the name ends.
  const resp = pick(board, 'response', 'readout');
  const respMap = (resp && typeof resp === 'object' && !Array.isArray(resp)) ? resp : {};
  const readLabel = str(pick(respMap, 'label')) || str(pick(board, 'response_label'))
    || (typeof resp === 'string' ? str(resp) : '');
  const readUnit = str(pick(respMap, 'unit'));
  if(readLabel || readUnit) value.readout = { ...(readLabel ? { label: readLabel } : {}), ...(readUnit ? { unit: readUnit } : {}) };
  if(!readLabel) owes.push('the sweep has no `readout` label — nothing names what the instrument reads');
  if(!readUnit) owes.push('the sweep readout has no `unit`, so the trace is a bare number'
    + (readLabel && /[)/]/.test(readLabel) ? ` — the label "${readLabel}" may carry it, and where a name ends is a guess` : ''));

  // ---- the curve, or curves.
  const rawSeries = list(pick(board, 'series')).filter(x => x && typeof x === 'object');
  if(rawSeries.length){
    const curves = rawSeries.map((c, i) => {
      const at = `sweep series ${i + 1}`;
      const cl = str(pick(c, 'label')) || str(pick(c, 'id'));
      const pts = points(pick(c, 'readings', 'response', 'points'), owes, at);
      if(!cl) owes.push(`${at} has no \`label\` — the curve is drawn with nothing naming it`);
      if(pts.length < 4) owes.push(`${at} authors ${pts.length} response points, and a curve needs four`);
      return { ...(cl ? { label: cl } : {}), ...(str(c.unit) ? { unit: str(c.unit) } : {}), response: pts };
    }).filter(c => c.response.length);
    if(curves.length) value.series = curves;
    if(curves.length >= 2 && !str(board.mode)){
      owes.push(`the board authors ${curves.length} curves and no \`mode\` — several curves are`
        + ' either one peak to find or costs traded against each other, and the importer defaults'
        + ' to peak without anybody choosing');
    }
  } else {
    const flat = pick(board, 'points', 'readings', 'response');
    // planetary_defense: `readings: {shoulder_present: [true, …], …}` — several
    // named channels of flags rather than one numeric trace.
    const channels = flat && typeof flat === 'object' && !Array.isArray(flat)
      && Object.values(flat).some(v => Array.isArray(v));
    if(channels){
      const chans = Object.keys(flat);
      owes.push(`the sweep's readings are ${chans.length} channel(s) of flags (${chans.join(', ')})`
        + ' rather than a numeric response — a sweep plots a number against the axis, and turning'
        + ' true into 1 is an encoding the board does not author');
    } else if(Array.isArray(flat)){
      const pts = points(flat, owes, 'sweep response');
      if(pts.length) value.response = pts;
      else owes.push('the sweep authors no response points');
      if(pts.length && pts.length < 4){
        owes.push(`the sweep authors ${pts.length} response points, and a curve needs four`);
      }
    } else owes.push('the sweep authors no response points');
  }

  // ---- the answer. None of the four author a target, and none of the three
  // things they author instead is a position on the axis.
  const target = num(pick(board, 'target')) ?? num(pick(board, 'correct_setting'));
  const tol = num(pick(board, 'tolerance'));
  const start = num(pick(board, 'start'));
  if(target !== undefined) value.target = target;
  else {
    const setting = str(pick(board, 'correct_setting'));
    const region = pick(board, 'correct_region');
    const wholeAxis = region && typeof region === 'object'
      && num(region.min) === min && num(region.max) === max;
    owes.push('the sweep has no numeric `target` — the position on the axis it grades against'
      + (setting ? `; it authors \`correct_setting: ${setting}\`, which is a word rather than a place on the axis` : '')
      + (wholeAxis ? `; its \`correct_region\` is the whole axis ${min}–${max}, so there is no`
        + ' feature to find and no position to grade' : ''));
  }
  if(target !== undefined && min !== undefined && max !== undefined && (target < min || target > max)){
    owes.push(`the sweep target ${target} is outside its own axis ${min}–${max}`);
  }
  // The importer refuses a target printed in the question, and the question is
  // in hand here — which is the one place it can be said before it is a failure.
  if(target !== undefined && new RegExp(`(^|[^\\d.])${String(target).replace('.', '\\.')}([^\\d]|$)`)
    .test(String(stop.question ?? ''))){
    owes.push(`the target ${target} is printed in the stop's own question, so the player reads the`
      + ' answer instead of finding it');
  }
  if(tol !== undefined) value.tolerance = tol;
  else owes.push('the sweep has no positive `tolerance` — how close to the feature counts as on it');
  if(start !== undefined) value.start = start;
  else owes.push('the sweep has no `start` — the importer would put the handle on the axis minimum,'
    + ' and a handle that starts on the answer is answered by not moving it');
  const mode = str(board.mode);
  if(mode) value.mode = mode;
  else owes.push('the sweep authors no `mode` — peak or boundary was never decided');

  // ---- the goal. The criterion, printed; never the target.
  const goal = str(pick(board, 'goal'));
  const goals = list(pick(board, 'goals')).map(x => str(x)).filter(Boolean);
  if(goal) value.goals = [goal, ...goals];
  else if(goals.length) value.goals = goals;

  // ---- the verdict. The board's conclusion IS the stop's `answerText` — a
  // top-level key rather than a field of the sweep block — and `extra` is what
  // places it. It is written where the stop has none; where both exist and
  // differ, neither is, because choosing between two authored verdicts is
  // authoring and a sweep has no options for the verdict to fall back on.
  const extra = {};
  const conc = str(pick(board, 'correctConclusion', 'correct_conclusion', 'conclusion',
    'correct', 'correct_interpretation', 'answerText'));
  const has = String(stop.answerText ?? '').trim();
  if(conc && !has) extra.answerText = conc;
  else if(!conc && !has){
    owes.push('the sweep has no conclusion, so the stop has no `answerText` — a sweep has no options'
      + ' to fall back on and the player is told they were wrong and never told what the reading'
      + ' should have been');
  } else if(conc && has && conc !== has){
    const lost = lostNumbers(conc, has);
    if(lost.length) owes.push(`the board's conclusion states ${lost.join(', ')} and the stop's`
      + ' `answerText` does not — the stop is graded on a number its own answer never says, and'
      + ' choosing between two authored verdicts is authoring, so neither is written');
  }
  // Same clash the §7 boards carried: prose that names a tolerance the board
  // does not. `[^0-9.]` and not `[^0-9]`, or the gap eats a bare `.01`.
  const saidTol = conc.match(/tolerance[^0-9.]{0,12}(\.?[0-9]*\.?[0-9]+)/i);
  if(saidTol && tol !== undefined && Math.abs(Number(saidTol[1]) - tol) > 1e-9){
    owes.push(`the conclusion names a tolerance of ${saidTol[1]} and the board authors ${tol}`);
  }

  // ---- what is left over.
  const dropped = Object.keys(board).filter(k => !CONSUMED.has(k)).sort();
  if(dropped.length){
    owes.push(`the board authors \`${dropped.join('`, `')}\`, which the sweep block has no field`
      + ' for, so they are dropped');
  }
  const tail = str(board._trailing).replace(/^[.;,\s]+$/, '');
  if(tail) owes.push(`the payload carries prose after its board — "${tail}" — which may hold a`
    + ' number the board does not');

  return { key: 'sweep', value, owes, extra };
};

// ------------------------------------------------------ the canonical board
//
// Four stops and three different shapes, which is why this is the longest of
// the canonical converters: Planetary Defense M10 S39, Headwater M6 S22, Red
// Sand M4 S16 and Safety Factor M5 S19. Unlike every other format in this pass
// these four are real campaign content rather than one template repeated —
// cartridge temperatures against three species' escape fractions, a brake test
// in per cent of current, eight calibrated radar frames.
//
// `response` MEANS THE OPPOSITE OF WHAT THE IMPORTER MEANS BY IT, and that is
// the rename worth the whole file. On these boards `response: {label:
// "saturation rate S(t)", unit: "mm/h"}` NAMES the quantity the instrument
// reads — which the importer calls `readout`. The importer's `response` is the
// sampled curve itself, a list of `{at, value}`. Carried through, the block's
// `response` is a two-key map, `x.response.map` is not a function, and the whole
// board arrives in the report as *could not be read*.
//
// THE CURVE IS UNDER THREE NAMES AND TWO SHAPES:
//
//   points: [[0, 0], [10, 4.0], …]              → response: [{at, value}, …]
//   series: {methane: [[180, .92], …], water: …} → series: [{label, response}, …]
//
// The second is the one `convert` above cannot do at all: it writes a single
// `response` and the importer's `series` is a list of CURVES, each with its own.
// Red Sand's board is three species over one temperature axis and the whole
// question is which of them can travel with the gas — a board that arrived as
// one curve would be a different question.
//
// WHAT IS NOT WRITTEN, and it is the grading on all four.
//
// · `target` and `tolerance`. Headwater writes them as maps of two quantities
//   each — `{maximumSlopeTime: 4, upperAsymptote: 36.850}` — and the panel holds
//   one position on the axis and one slack around it. Where exactly one entry of
//   the map lies inside the axis it is read as that position, because a number
//   off the axis cannot be a place on it; where two do, or where none does,
//   choosing between them is authoring the grading and both are owed. The other
//   three boards state neither under any name.
//
// · `passRule`. It reads like `goals` — the criterion the panel prints — and it
//   is NOT carried there, on the evidence of the boards themselves: Safety
//   Factor's is "response increases at every step and contains no dead band" and
//   its own verdict is "monotonic response with no dead band", so printing the
//   rule would print the answer above the trace. Planetary Defense's is a clean
//   criterion and would be safe. A converter cannot tell those two apart, and a
//   panel that prints the answer is the one failure this format cannot recover
//   from, so neither is written.
//
// · Planetary Defense's `readings` is two arrays of booleans over eight frames,
//   `[true, true, true, false, …]`. There is no numeric curve on that board under
//   any name, and turning true into 1 would be drawing a trace nobody authored.

/** A map of name → point list as the importer's list of curves. */
function seriesFrom(map, owes){
  const out = [];
  for(const [name, raw] of Object.entries(map)){
    if(name === '_trailing') continue;
    const pts = points(raw, owes, `sweep series "${name}"`);
    if(!pts.length){
      owes.push(`the sweep series "${name}" has no readable points`);
      continue;
    }
    out.push({ label: str(name), response: pts });
  }
  return out;
}

/**
 * The one entry of `{maximumSlopeTime: 4, upperAsymptote: 36.850}` that is a
 * place on this axis — or undefined, with the reason owed.
 */
function onAxis(map, min, max, owes, what){
  const named = Object.entries(map).filter(([k, v]) => k !== '_trailing' && num(v) !== undefined);
  if(!named.length) return undefined;
  if(min === undefined || max === undefined){
    owes.push(`the sweep writes its \`${what}\` as ${named.length} named quantities and its axis has`
      + ' no range to test them against, so none of them is read as a position on it');
    return undefined;
  }
  const inside = named.filter(([, v]) => num(v) >= min && num(v) <= max);
  if(inside.length === 1) return num(inside[0][1]);
  owes.push(`the sweep's \`${what}\` names ${named.map(([k, v]) => `${k}: ${v}`).join(', ')} and`
    + ` ${inside.length === 0 ? 'none of them lies' : `${inside.length} of them lie`} on the axis`
    + ` ${min}–${max} — the panel holds one number and choosing between two is authoring the`
    + ' grading, so none is written');
  return undefined;
}

export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? { ...b } : {};
  const owes = [];
  const axis = board.axis ?? {};
  const min = num(axis.min), max = num(axis.max);

  // ---- the readout, which the board calls `response`.
  const resp = board.response;
  if(resp && typeof resp === 'object' && !Array.isArray(resp)
    && (str(resp.label) || str(resp.unit))){
    board.readout = { ...(str(resp.label) ? { label: str(resp.label) } : {}),
      ...(str(resp.unit) ? { unit: str(resp.unit) } : {}) };
    delete board.response;
  }

  // ---- the curve. A map of named series is the importer's list of curves; a
  // flat list under `points` is the single-curve case `convert` already reads.
  let curves = null;
  if(board.series && typeof board.series === 'object' && !Array.isArray(board.series)){
    curves = seriesFrom(board.series, owes);
    delete board.series;
    // `convert` writes the single-curve `response`, which the importer derives
    // from `series[0]` anyway; handing it the first curve keeps one code path
    // for the axis, the start and the target check.
    if(curves.length) board.points = curves[0].response;
  }

  // ---- the grading.
  const t = board.target;
  if(t && typeof t === 'object' && !Array.isArray(t)){
    const read = onAxis(t, min, max, owes, 'target');
    if(read !== undefined) board.target = read; else delete board.target;
  }
  const tol = board.tolerance;
  if(tol && typeof tol === 'object' && !Array.isArray(tol)){
    const vals = Object.entries(tol).filter(([k, v]) => k !== '_trailing' && num(v) !== undefined)
      .map(([, v]) => num(v));
    const agreed = vals.length && vals.every(v => v === vals[0]);
    if(agreed && vals[0] > 0) board.tolerance = vals[0];
    else {
      delete board.tolerance;
      if(vals.length){
        owes.push(`the sweep writes ${vals.length} tolerances (${vals.join(', ')}) for one handle`
          + ' — the panel holds one, and they do not all agree, so none is written');
      }
    }
  }

  // ---- what has no field, dropped and said.
  for(const [k, why] of [
    ['readings', 'two runs of true/false over the axis, and a sweep is a numeric trace — turning'
      + ' a boolean into a 1 would draw a curve nobody authored'],
    ['passRule', 'a pass criterion, and it is not carried into `goals`: on one of these four boards'
      + ' the rule restates the stop\'s own verdict, so printing it would print the answer above'
      + ' the trace, and a converter cannot tell which board is which'],
    ['requiredPoints', 'which positions must be read before committing, and the sweep block has no'
      + ' minimum-readings field'],
    ['requiredRegions', 'which parts of the axis must be visited, and the sweep block has no'
      + ' minimum-readings field'],
  ]){
    if(board[k] === undefined) continue;
    owes.push(`the board authors \`${k}\` — ${why}`);
    delete board[k];
  }

  const out = convert(board, stop);
  const value = out.value;
  // `convert` owes a missing readout and never writes one, because no §7 board
  // authors it. These four do, so it is placed here.
  if(board.readout) value.readout = board.readout;
  if(curves && curves.length) value.series = curves;

  // ---- the verdict, which `convert` cannot reach and `extra` can.
  const kept = out.owes.filter(o => !/answerText/.test(o));
  const said = str(pick(b ?? {}, 'answerText', 'correctResult', 'correctConclusion',
    'correct_conclusion'));
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — a sweep has no options to'
      + ' fall back on, so a wrong reading is told it is wrong and never told what the reading was');
  }

  return { key: 'sweep', value, owes: [...kept, ...owes], extra };
}

// ------------------------------------------------------------------ selftest
//
// Two cases, and the second is the one that matters: a board missing a field
// must land it in `owes` and must NOT get it in `value`. Run: node tools/bibleConvert/sweep.mjs
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  // A complete board — everything the sweep block needs, authored.
  const full = convert({
    axis: { label: 'Brake test current', unit: '%', min: 0, max: 100, step: 10 },
    readout: { label: 'Equivalent upward acceleration', unit: 'm/s^2' },
    mode: 'peak', start: 0, target: 70, tolerance: 5,
    series: [{ at: 0, value: 0 }, { at: 30, value: 12 }, { at: 70, value: 29 }, { at: 100, value: 20 }],
  });
  // The conclusion line is the one owe a complete sweep board still carries,
  // because `answerText` is not inside this key and never can be.
  ok(full.owes.length === 1 && /answerText/.test(full.owes[0]),
    `a complete sweep should owe only its answerText; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.target === 70 && full.value.start === 0, 'a complete sweep lost its target/start');
  ok(full.value.axis.unit === undefined, 'the converter writes no axis.unit — the importer does');

  // Missing target and tolerance: owed, and absent from value.
  const bare = convert({ axis: { label: 'controlled setting', min: 0, max: 10 }, series: [{ at: 0, value: 2 }] });
  ok(!('target' in bare.value), 'a missing target was invented');
  ok(!('tolerance' in bare.value), 'a missing tolerance was invented');
  ok(!('start' in bare.value), 'a missing start was invented');
  ok(bare.owes.some(o => /numeric `target`/.test(o)), 'a missing target was not owed');
  ok(bare.owes.some(o => /`tolerance`/.test(o)), 'a missing tolerance was not owed');
  ok(bare.owes.some(o => /names no quantity/.test(o)), 'the template axis label was not owed');
  ok(bare.owes.some(o => /no `unit`/.test(o)), 'the missing axis unit was not owed');
  ok(bare.owes.some(o => /no `readout`/.test(o)), 'the missing readout was not owed');
  ok(bare.owes.some(o => /no `mode`/.test(o)), 'the missing mode was not owed');

  // The two-inputs-that-should-score-the-same case: the same curve written as
  // pairs and as records must convert identically, or the shape the bible chose
  // is silently changing the board.
  const asRecords = convert({ axis: { label: 'x', unit: 'm', min: 0, max: 4 }, target: 2, tolerance: 1,
    start: 0, mode: 'peak', readout: { label: 'y', unit: 'm' }, series: [{ at: 0, value: 1 }, { at: 2, value: 9 }] });
  const asPairs = convert({ axis: { label: 'x', unit: 'm', min: 0, max: 4 }, target: 2, tolerance: 1,
    start: 0, mode: 'peak', readout: { label: 'y', unit: 'm' }, series: [[0, 1], [2, 9]] });
  ok(JSON.stringify(asRecords.value.response) === JSON.stringify(asPairs.value.response),
    'the same curve as pairs and as records converted differently');

  // The target that names no feature of the authored curve.
  const off = convert({ axis: { label: 'x', unit: 'm', min: 0, max: 10, step: 1 }, target: 4, tolerance: 0.1,
    start: 0, mode: 'peak', readout: { label: 'y', unit: 'm' }, series: [{ at: 0, value: 1 }, { at: 9, value: 3 }] });
  ok(off.owes.some(o => /never sampled at the target/.test(o)), 'an unsampled target was not owed');

  // The conclusion that disagrees with the board, written as the bible writes
  // it — a bare `.01` — and the owe must quote .01, not 1.
  const clash = convert({ axis: { label: 'x', unit: 'm', min: 0, max: 10, step: 1 }, target: 7, tolerance: 0.25,
    start: 1, mode: 'peak', readout: { label: 'y', unit: 'm' }, series: [{ at: 7, value: 9 }],
    correctConclusion: '`t=4`, `36.850 mm/h`, tolerance `.01`.' });
  ok(clash.owes.some(o => /names a tolerance of \.01 and the board authors 0\.25/.test(o)),
    `the clashing tolerance was misquoted or unowed: ${JSON.stringify(clash.owes)}`);
  ok(!asRecords.owes.some(o => /names a tolerance/.test(o)), 'a board with no stated tolerance was falsely owed');
  // And the case that must NOT fire: a target the curve does sample.
  ok(!asRecords.owes.some(o => /never sampled/.test(o)), 'a sampled target was falsely owed');

  // ---------------------------------------------------- the authored board
  const paid = {
    control: { id: 'current', label: 'Brake test current', min: 0, max: 100, step: 10, unit: '%' },
    response: { label: 'Equivalent upward acceleration', unit: 'm/s^2' },
    points: [[0, 0], [30, 12.2], [70, 28.7], [100, 43.1]],
    mode: 'peak', target: 70, tolerance: 5, start: 0,
    goal: 'A smooth rise with no dead band across the tested range.',
  };
  const whole = convertPayload(paid, { answerText: 'It rises smoothly.', question: 'Sweep it.' });
  ok(whole.owes.length === 0, `a complete payload should owe nothing; owed ${JSON.stringify(whole.owes)}`);
  ok(whole.value.axis.label === 'Brake test current' && whole.value.axis.unit === '%'
    && whole.value.axis.min === 0 && whole.value.axis.step === 10, 'a complete payload lost its axis');
  ok(whole.value.response.length === 4 && whole.value.response[1].value === 12.2,
    'a `[[x, y]]` curve did not become response points');
  ok(whole.value.goals[0].startsWith('A smooth rise'), 'the goal was not carried');

  // An axis written as its settings.
  const settings = convertPayload({ ...paid, control: { label: 'Calibrated radar frame', unit: 'frame',
    values: [1, 2, 3, 4, 5, 6, 7, 8] }, points: undefined,
  series: [{ id: 'delay', label: 'Secondary delay', readings: [[1, 0.2], [2, 0.34], [3, 0.51], [4, 0.66]] }],
  mode: 'peak' }, { answerText: 'x' });
  ok(settings.value.axis.min === 1 && settings.value.axis.max === 8 && settings.value.axis.step === 1,
    `an evenly spaced settings list did not become an axis: ${JSON.stringify(settings.value.axis)}`);
  ok(settings.value.series[0].response.length === 4, 'a `series` curve did not become series response');
  const uneven = convertPayload({ ...paid, control: { label: 'Exposure', unit: 's', values: [10, 20, 45, 90] } },
    { answerText: 'x' });
  ok(uneven.value.axis.min === undefined, 'an unevenly spaced settings list became an axis anyway');
  ok(uneven.owes.some(o => /not evenly/.test(o)), 'an unevenly spaced settings list was not owed');
  ok(!settings.owes.some(o => /not evenly/.test(o)), 'an evenly spaced settings list was falsely owed');

  // Three boolean channels are not a response.
  const flags = convertPayload({ control: { label: 'Calibrated radar frame', values: [1, 2, 3, 4] },
    readings: { shoulder_present: [true, true, false, true], coherent: [true, true, null, true] },
    goal: 'Persistent motion in at least 6 of 8 frames', correct_setting: 'all_eight_frames' },
  { answerText: 'x' });
  ok(!('response' in flags.value) && !('series' in flags.value), 'boolean flags were plotted as a curve');
  ok(flags.owes.some(o => /channel\(s\) of flags/.test(o)), 'the boolean channels were not owed');
  ok(flags.owes.some(o => /a word rather than a place on the axis/.test(o)),
    '`correct_setting: all_eight_frames` was not owed as a missing target');
  ok(!('target' in flags.value), 'a worded `correct_setting` became a target');
  ok(flags.value.goals[0].startsWith('Persistent motion'), 'the goal was dropped with the readings');

  // A correct_region spanning the whole axis is a sweep with nothing to find.
  const region = convertPayload({ ...paid, target: undefined,
    correct_region: { min: 0, max: 100 } }, { answerText: 'x' });
  ok(region.owes.some(o => /whole axis 0–100/.test(o)),
    `a whole-axis correct_region was not owed: ${JSON.stringify(region.owes)}`);
  ok(!region.owes.some(o => /a word rather than a place/.test(o)),
    'a board with no correct_setting was owed one');

  // Refusal: no target, tolerance, start or mode — owed, and absent from value.
  const flat = convertPayload({ control: 't', min: 0, max: 10, step: 0.5, unit: 'h',
    response: 'S(t) mm/h', correct_conclusion: 'maximum slope at t=4; asymptote 36.850 mm/h' },
  { answerText: 'x' });
  ok(!('target' in flat.value) && !('tolerance' in flat.value) && !('start' in flat.value)
    && !('mode' in flat.value), 'a missing target/tolerance/start/mode was invented');
  ok(flat.value.axis.label === 't' && flat.value.axis.unit === 'h' && flat.value.axis.max === 10,
    `the flat axis notation was not read: ${JSON.stringify(flat.value.axis)}`);
  ok(flat.value.readout.label === 'S(t) mm/h', 'a string `response` did not become the readout label');
  ok(flat.owes.some(o => /where a name ends is a guess/.test(o)),
    'a readout name with no unit was not owed');
  ok(flat.owes.some(o => /authors no response points/.test(o)), 'a board with no curve was not owed');
  ok(flat.owes.some(o => /no `mode`/.test(o)), 'the missing mode was not owed');

  // The target the question already prints.
  const shown = convertPayload(paid, { answerText: 'x', question: 'Set the current to 70 percent.' });
  ok(shown.owes.some(o => /printed in the stop's own question/.test(o)),
    'a target printed in the question was not owed');
  ok(!whole.owes.some(o => /printed in the stop's own question/.test(o)),
    'a target absent from the question was falsely owed');

  // Two inputs that must score the same: the same curve as pairs and as records.
  const pairsP = convertPayload(paid, { answerText: 'x' });
  const recsP = convertPayload({ ...paid,
    points: paid.points.map(([x, y]) => ({ at: x, value: y })) }, { answerText: 'x' });
  ok(JSON.stringify(pairsP.value) === JSON.stringify(recsP.value),
    'the same curve as pairs and as records converted differently');

  // The verdict: placed where the stop has none, never over one it carries.
  const boardSays = convertPayload({ ...paid, conclusion: 'It rises smoothly; no dead band.' }, {});
  ok(boardSays.extra.answerText === 'It rises smoothly; no dead band.',
    'the board\'s conclusion was not placed on a stop with no answerText');
  ok(!boardSays.owes.some(o => /has no conclusion/.test(o)), 'a placed conclusion was owed as missing');
  // Two verdicts in different words is not a finding; a number in one and not
  // the other is — headwater's conclusion names an asymptote of 36.850 mm/h that
  // its stop's answerText never states.
  const twoVerdicts = convertPayload({ ...paid, conclusion: 'It rises to 43.1 with no dead band.' },
    { answerText: 'It rises smoothly; no dead band.' });
  ok(!('answerText' in twoVerdicts.extra), 'two differing verdicts and one was written anyway');
  ok(twoVerdicts.owes.some(o => /conclusion states 43.1 and the stop's/.test(o)),
    `a number only the board's conclusion states went unowed: ${JSON.stringify(twoVerdicts.owes)}`);
  const reworded = convertPayload({ ...paid, conclusion: 'The response is smooth throughout.' },
    { answerText: 'It rises smoothly; no dead band.' });
  ok(!reworded.owes.some(o => /conclusion states/.test(o)),
    'two verdicts in different words with the same numbers were owed');

  // A key the sweep block has no field for.
  const extra = convertPayload({ ...paid, required_regions: ['low', 'high'] }, { answerText: 'x' });
  ok(extra.owes.some(o => /`required_regions`/.test(o)), 'a dropped key was not owed');

  // ---------------------------------------------------- the canonical board
  // Safety Factor M5 S19 as it arrives, plus the target and tolerance the real
  // board does not carry — so the renames can be tested without every assertion
  // also reporting the grading.
  const oneCurve = {
    axis: { label: "brake test current", min: 0, max: 100, step: 10, unit: '%' },
    response: { label: 'equivalent upward acceleration', unit: 'm/s^2' },
    points: [[0, 0], [10, 4.0], [20, 8.1], [30, 12.2], [40, 16.4], [50, 20.5], [60, 24.7],
      [70, 28.7], [80, 32.8], [90, 36.9], [100, 43.1]],
    start: 0, target: 90, tolerance: 5,
    passRule: 'response increases at every step and contains no dead band',
    correctResult: 'Select monotonic response with no dead band.',
  };
  const cs = convertCanonical(oneCurve, { answerText: "Monotonic; no dead band." });
  ok(cs.key === 'sweep', `the canonical board was keyed ${cs.key}`);

  // RENAME ONE, and the one that breaks the board today: the bible's `response`
  // is the importer's `readout`. Put it back and only these two cases fail.
  ok(cs.value.readout?.label === 'equivalent upward acceleration'
    && cs.value.readout?.unit === 'm/s^2',
  `the named quantity did not become the readout: ${JSON.stringify(cs.value.readout)}`);
  ok(Array.isArray(cs.value.response) && cs.value.response.length === 11
    && cs.value.response[1].at === 10 && cs.value.response[1].value === 4,
  `\`points\` did not become the sampled response: ${JSON.stringify(cs.value.response?.[1])}`);
  ok(!cs.owes.some(o => /no `readout`/.test(o)), 'a board naming its readout was owed one anyway');

  // The pass rule is dropped rather than printed as a goal, and why is said.
  ok(!JSON.stringify(cs.value).includes('dead band'),
    'the pass rule reached the panel, where on this board it prints the answer');
  ok(cs.owes.some(o => /authors `passRule`/.test(o)), 'the dropped pass rule was not owed');

  // RENAME TWO: a map of named curves becomes the importer's list of curves.
  // Red Sand M4 S16 as it arrives.
  const many = convertCanonical({
    axis: { label: 'cartridge temperature', min: 180, max: 330, step: 25, unit: 'K' },
    response: { label: 'fraction leaving cartridge', unit: 'fraction' },
    series: {
      methane: [[180, 0.92], [205, 0.95], [230, 0.97], [255, 0.98], [280, 0.99], [305, 0.99], [330, 0.99]],
      water: [[180, 0.02], [205, 0.03], [230, 0.05], [255, 0.08], [280, 0.20], [305, 0.64], [330, 0.86]],
      blueGlycolTracer: [[180, 0], [205, 0], [230, 0], [255, 0.01], [280, 0.01], [305, 0.02], [330, 0.04]],
    },
    start: 180, requiredRegions: ['low', 'middle', 'high'],
    correctResult: 'The glycol-water residue cannot ride the gas stream.',
  }, { answerText: 'It cannot ride the gas stream.' });
  ok((many.value.series ?? []).length === 3,
    `the named curves did not become a list of curves: ${JSON.stringify(many.value.series?.length)}`);
  ok((many.value.series ?? [])[1]?.label === 'water'
    && many.value.series[1].response.length === 7
    && many.value.series[1].response[6].value === 0.86,
  'a curve lost its name or its points');
  // The order matters: the importer takes `response` from `series[0]`, and a
  // converter that walked the map in a different order would ship a different
  // first curve with every gate green.
  ok((many.value.series ?? []).map(s => s.label).join() === 'methane,water,blueGlycolTracer',
    'the curves came back out of the order the board names them');
  // The single-curve `response` the block also carries has to BE the first
  // curve: the importer derives its own from `series[0]`, and a book whose two
  // copies disagree is a book where one of them is silently ignored.
  ok(JSON.stringify(many.value.response) === JSON.stringify(many.value.series?.[0]?.response),
    'the block\'s `response` is not the first of its own curves');
  ok(many.owes.some(o => /authors `requiredRegions`/.test(o)),
    'the dropped required regions were not owed');

  // THE GRADING, and both branches of the gate. Exactly one entry on the axis
  // is read as the position; two, or none, is owed and nothing is written.
  const head = { axis: { label: 'time t', min: 0, max: 10, step: 0.5, unit: 'h' },
    response: { label: 'saturation rate S(t)', unit: 'mm/h' }, start: 0,
    points: [[0, 0], [4, 20], [8, 34], [10, 36.8]],
    target: { maximumSlopeTime: 4, upperAsymptote: 36.850 },
    tolerance: { time: 0.01, rate: 0.01 } };
  const hw = convertCanonical(head, { answerText: 't = 4; 36.850 mm/h.' });
  ok(hw.value.target === 4,
    `the one target entry lying on the axis was not read as the position: ${hw.value.target}`);
  ok(hw.value.tolerance === 0.01, `two agreeing tolerances did not become one: ${hw.value.tolerance}`);
  // Both entries on the axis: nothing written, and the reason said.
  const two = convertCanonical({ ...head, target: { slopeTime: 4, otherTime: 8 } },
    { answerText: 'x' });
  ok(!('target' in two.value), 'a target was chosen between two numbers on the axis');
  ok(two.owes.some(o => /2 of them lie/.test(o)), 'an ambiguous target was not owed');
  // None on the axis: likewise.
  const offAxis = convertCanonical({ ...head, target: { upperAsymptote: 36.85 } }, { answerText: "x" });
  ok(!("target" in offAxis.value), "a target off the axis was written anyway");
  ok(offAxis.owes.some(o => /none of them lies/.test(o)), "a target off the axis was not owed");
  // Tolerances that disagree: nothing written.
  const tolClash = convertCanonical({ ...head, tolerance: { time: 0.01, rate: 0.5 } },
    { answerText: 'x' });
  ok(!('tolerance' in tolClash.value), 'one of two disagreeing tolerances was picked');
  ok(tolClash.owes.some(o => /they do not all agree/.test(o)),
    'two disagreeing tolerances were not owed');
  // And the case that must NOT fire, or the checks agree with themselves.
  ok(!hw.owes.some(o => /lie on the axis|do not all agree/.test(o)),
    'a readable target and tolerance were owed as ambiguous');

  // Planetary Defense M10 S39: booleans, and no curve is drawn from them.
  const bools = convertCanonical({
    axis: { label: 'calibrated radar frame', min: 1, max: 8, step: 1, unit: 'frame' }, start: 1,
    readings: { shoulderPresent: [true, true, true, false, true, true, true, true] },
    passRule: 'connected motion in at least 6 of 8 frames',
    correctResult: 'Physical secondary structure.' }, { answerText: 'Physical structure.' });
  ok(!('response' in bools.value) && !('series' in bools.value),
    'a trace was drawn out of a run of true and false');
  ok(bools.owes.some(o => /turning\s+a boolean into a 1/.test(o)),
    `the boolean readings were not owed: ${JSON.stringify(bools.owes)}`);

  // The verdict, placed only where the stop has none.
  ok(!cs.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  ok(convertCanonical(oneCurve, {}).extra.answerText.startsWith("Select monotonic"),
    'the board\'s verdict was not placed on a stop that had none');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('sweep.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `SWEEP selftest: ${f.length} failure(s)` : 'SWEEP selftest: ok');
  process.exit(f.length ? 1 : 0);
}
