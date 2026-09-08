// propagate.mjs — the bible's PROPAGATE board into the importer's.
//
// Three stops: groundtruth M13 S51, headwater M13 S49, planetary_defense M4 S15.
// See `_shared.mjs` for the contract every converter keeps.
//
// TWO RENAMES AND ONE MODEL CONVERSION. `sigma` is the importer's `sigmaFrac`
// and `sensitivity` is its `exponent` — the board's own arithmetic proves it,
// because every input's `contribution` is exactly |sensitivity| × sigma, which
// is the contribution formula `import-book.mjs` ranks on. `contribution` itself
// is therefore derived and is NOT written: it is a second copy of a number the
// engine computes, and a second copy drifts the first time either is corrected.
// It is checked against the product instead, which nothing else does.
//
// The model conversion is the ledger. The bible writes `purchases` as ACTIONS —
// `{id: recalibrate, cost: 1, target: calibration, reduction: .25}` — and the
// importer's `improvable` is keyed by the INPUT the money is spent on. So the
// entry's id is the purchase's `target`, not its own id.
//
// WHAT IS REFUSED. `reduction: .25` against a sigma of `.40` does not say
// whether the new width is .25 or .15, and `newSigmaFrac` is the number the
// whole stop grades on. Guessing it either way is authoring somebody's error
// budget, so it is owed. `correctPurchase` is refused for a different reason:
// the panel derives the right buy from the arithmetic, the importer has no field
// for it, and a board that prints its own answer has removed the decision.
//
// THE THING TO KNOW ABOUT THESE THREE BOARDS. All three are byte-identical —
// calibration/timing/geometry with the same five numbers each — across a
// campaign about seismic recorders, one about river level and one about radar
// astrometry. The campaigns' real budgets are in `stop.payload`.
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'PROPAGATE';

export const convert = (b) => {
  const owes = [];
  const value = {};

  // ---- the inputs.
  const rawIn = list(pick(b, 'inputs', 'terms'));
  const inputs = rawIn.map((x, i) => {
    const at = `propagate input ${i + 1}`;
    const id = str(pick(x, 'id')) || str(x.label);
    const sigmaFrac = num(pick(x, 'sigmaFrac', 'sigma'));
    const exponent = num(pick(x, 'exponent', 'sensitivity'));
    const val = num(x.value);
    if(!id) owes.push(`${at} has no \`id\``);
    if(sigmaFrac === undefined) owes.push(`${at} has no \`sigma\` — the fractional width the term is known to`);
    if(exponent === undefined) owes.push(`${at} has no \`sensitivity\` — the exponent it enters the output with`);
    // `value` is required by the importer and authored by none of the three.
    // Without it the panel has a width and no quantity to put it on.
    if(val === undefined) owes.push(`${at} has no \`value\` — the measured quantity itself, which`
      + ' the importer requires and the board never states');
    if(!str(x.label)) owes.push(`${at} has no \`label\` — the id is a token, not something a player reads`);
    if(!str(x.unit)) owes.push(`${at} has no \`unit\``);

    // The board's own `contribution` against the product it claims to be. The
    // importer never reads this field, so nothing else would ever notice a
    // board whose arithmetic disagrees with itself.
    const claimed = num(x.contribution);
    if(claimed !== undefined && sigmaFrac !== undefined && exponent !== undefined
      && Math.abs(claimed - Math.abs(exponent) * sigmaFrac) > 1e-6){
      owes.push(`${at} states a contribution of ${claimed} against |${exponent}| × ${sigmaFrac}`
        + ` = ${(Math.abs(exponent) * sigmaFrac).toFixed(4)} — the board disagrees with its own arithmetic`);
    }

    const out = {};
    if(id) out.id = id;
    if(str(x.label)) out.label = str(x.label);
    if(val !== undefined) out.value = val;
    if(str(x.unit)) out.unit = str(x.unit);
    if(sigmaFrac !== undefined) out.sigmaFrac = sigmaFrac;
    if(exponent !== undefined) out.exponent = exponent;
    return out;
  });
  if(inputs.length) value.inputs = inputs;
  if(inputs.length < 3) owes.push(`the error budget authors ${inputs.length} inputs, and it needs three`);
  const ids = inputs.map(x => x.id).filter(Boolean);

  // ---- the ledger.
  const rawBuy = list(pick(b, 'improvable', 'purchases', 'measurements'));
  const improvable = rawBuy.map((m, i) => {
    const at = `propagate candidate ${i + 1}`;
    // The id is the input the money buys down, which the bible calls `target`.
    const id = str(pick(m, 'target')) || str(pick(m, 'id'));
    const cost = num(m.cost);
    const newSigma = num(pick(m, 'newSigmaFrac', 'newSigma'));
    if(!id) owes.push(`${at} names no input to improve`);
    else if(ids.length && !ids.includes(id)) owes.push(`${at} improves "${id}", which is not one of the inputs`);
    if(cost === undefined) owes.push(`${at} has no \`cost\``);
    if(!str(m.label)) owes.push(`${at} has no \`label\` — the words on the button`);
    if(newSigma === undefined){
      const red = num(m.reduction);
      const before = inputs.find(x => x.id === id)?.sigmaFrac;
      owes.push(red === undefined
        ? `${at} has no \`newSigmaFrac\` — the width after buying it, which is what the stop grades on`
        : `${at} authors \`reduction: ${red}\`${before === undefined ? '' : ` against a sigma of ${before}`}`
          + ' and never says whether that is the width afterwards or the amount removed — the two'
          + ' give different answers, so `newSigmaFrac` is owed rather than guessed');
    }
    const out = {};
    if(id) out.id = id;
    if(str(m.label)) out.label = str(m.label);
    if(cost !== undefined) out.cost = cost;
    if(newSigma !== undefined) out.newSigmaFrac = newSigma;
    return out;
  });
  if(improvable.length) value.improvable = improvable;
  if(improvable.length < 2) owes.push(`the error budget authors ${improvable.length} candidate`
    + ' measurements, and it needs two to be a choice');

  // ---- the answer, and the money.
  const dominant = str(b.dominant);
  if(dominant) value.dominant = dominant;
  else owes.push('the error budget names no `dominant` term');
  if(dominant && ids.length && !ids.includes(dominant)){
    owes.push(`the dominant term "${dominant}" is not one of the inputs`);
  }
  // CHECKED AND NEVER WRITTEN, which is why three boards that name their currency
  // still reached the importer owing one. The `costUnit` is what the budget and
  // every button are priced in; refusing a board that lacks it and then dropping
  // it from the one that has it is the check disagreeing with itself.
  if(!str(b.costUnit)) owes.push('the error budget has no `costUnit` — the ledger and the buttons'
    + ' are priced in a currency the board never names');
  else value.costUnit = str(b.costUnit);
  if(num(b.budget) === undefined) owes.push('the error budget has no `budget` — the costs on its'
    + ' buttons constrain nothing without one, so the stop asks the player to buy everything');
  else value.budget = num(b.budget);
  if(!str(b.output?.label)) owes.push('the error budget has no `output` — nothing names the quantity'
    + ' the terms propagate into');

  // The printed answer. Dropped, and said out loud.
  if(str(pick(b, 'correctPurchase', 'correctBuy'))){
    owes.push(`the board names \`correctPurchase: ${str(pick(b, 'correctPurchase', 'correctBuy'))}\``
      + ' — the panel derives the right buy from the widths and the budget, the importer has no'
      + ' field for it, and a board that prints its own answer has removed the decision');
  }

  return { key: 'propagate', value, owes };
};

// ------------------------------------------------------- the authored board
//
// Three stops point at their own payload, and only two of the three point at a
// board: groundtruth M13 S51 writes its budget as a sentence — "live error
// contributions `[bandwidth:18%,gain:3%,timing:4%,geometry:6%]`; options/cost
// one slot; correct faster sampling reduces to 4%" — which is prose with
// numbers in it, not a board, and nothing here invents one from it.
//
// THE TWO THAT ARE BOARDS ARE TWO DIFFERENT ERROR MODELS.
//
// headwater M13 S49 is the importer's model in the bible's words:
// `error_terms: [{id, sigma, sensitivity, output}]` with `purchase_options:
// [{id, cost, reduction}]`. `output` is the contribution under a third name —
// .015 × 2.0 = .030 for every one of the three, which is the arithmetic
// `convert` above already checks — so it is renamed and then dropped, exactly
// as `contribution` is, because the engine computes it.
//
// planetary_defense M4 S15 is NOT that model. Its budget is four ABSOLUTE
// widths in kilometres — angular arc 6 200, range 13 800, timing 4 100, model
// 2 900 — and its candidates each state a new TOTAL width rather than a new
// width for one term. `sigmaFrac` is a fraction of the input's own value, and
// the board authors no value to divide by; a candidate that moves the total is
// not a candidate keyed by the input the money is spent on. Writing 6 200 into
// `sigmaFrac` would pass the importer's `> 0` and print an error budget with
// four terms of six hundred thousand percent, which is the half-read board that
// converts, imports and is wrong in the panel. So both are owed in as many
// words and the ledger — the costs and the budget, which ARE the importer's —
// is carried.
//
// `dominant` is authored by neither, and both name their answer instead
// (`correct_purchase`, `correct_update`). The importer derives the dominant
// term arithmetically and refuses a book that disagrees with its own numbers,
// which is exactly why this does not compute one: it would be this tool
// agreeing with itself rather than the bible saying which term it meant.

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

/**
 * The records in a list, with anything that is not one counted rather than
 * quietly dropped — a list that comes back one entry short and says nothing is
 * how a board loses a term without any gate noticing.
 */
function records(v, owes, what){
  const all = list(v);
  const rows = all.filter(x => x && typeof x === 'object' && !Array.isArray(x));
  if(rows.length < all.length){
    owes.push(`${all.length - rows.length} of the ${all.length} \`${what}\` entries are not records`
      + ' with fields on them, so nothing can be read off them');
  }
  return rows;
}

const CONSUMED = new Set(['inputs', 'terms', 'error_terms', 'current_error_budget',
  'improvable', 'purchases', 'measurements', 'purchase_options', 'candidate_updates',
  'dominant', 'costUnit', 'budget', 'output', 'correctPurchase', 'correctBuy',
  'correct_purchase', 'correct_update', 'answerText', 'hint', 'moral', 'commit', '_trailing']);

/**
 * The stop's own authored error budget. `stop` carries the printed question and
 * the stop's `answerText`; see `_payload.mjs` for where the board comes from.
 */
export const convertPayload = (raw, stop = {}) => {
  const extra = [];
  const board = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  if(stop.payloadKey && stop.payloadKey !== 'propagate'){
    extra.push(`the payload is written under \`${stop.payloadKey}\` and the importer reads an error`
      + ' budget from `propagate` — one of the two names is wrong');
  }

  // ---- the inputs, in whichever model the campaign used.
  const inputs = records(pick(board, 'inputs', 'terms', 'error_terms'), extra, 'error_terms')
    // `output` is the contribution under a third name; `convert` checks it
    // against |sensitivity| × sigma and never writes it.
    .map(x => (x.output !== undefined && x.contribution === undefined
      ? { ...x, contribution: x.output, output: undefined } : x));
  const absolute = pick(board, 'current_error_budget');
  if(absolute && typeof absolute === 'object' && !Array.isArray(absolute)){
    const terms = Object.entries(absolute).map(([k, v]) => `${k} ${v}`);
    extra.push(`the budget is stated as absolute widths — ${terms.join(', ')} — and \`sigmaFrac\` is`
      + ' a fraction of the input\'s own value, which the board never states; writing a width in'
      + ' kilometres into a fraction would import and print a term of six hundred thousand percent,'
      + ' so no input is written');
  }

  // ---- the ledger.
  const buys = records(pick(board, 'improvable', 'purchases', 'measurements',
    'purchase_options', 'candidate_updates'), extra, 'purchase_options');
  const totals = buys.filter(m => Object.keys(m).some(k => /^new_total/.test(k)));
  if(totals.length){
    extra.push(`${totals.length} candidate(s) state a new TOTAL width (\`new_total_width_km\`)`
      + ' rather than a new width for one input, and the importer\'s `improvable` is keyed by the'
      + ' input the money is spent on — the costs and the budget carry across, the widths cannot');
  }

  const { value, owes } = convert({
    ...board,
    inputs, improvable: buys,
    correctPurchase: pick(board, 'correctPurchase', 'correctBuy', 'correct_purchase', 'correct_update'),
  });

  // ---- the verdict. A top-level key on the stop rather than a field of the
  // propagate block, so `extra` places it: written where the stop has none, and
  // where both exist and differ neither is, because choosing between two
  // authored verdicts is authoring.
  const keys = {};
  const said = str(board.answerText);
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) keys.answerText = said;
  else if(!has && !said){
    extra.push('neither the stop nor its board authors an `answerText`, and a propagate is graded'
      + ' on a purchase rather than an option, so the verdict has nothing to print');
  } else if(said && has && said !== has){
    const lost = lostNumbers(said, has);
    if(lost.length) extra.push(`the board's own verdict states ${lost.join(', ')} and the stop's`
      + ' verdict does not — the stop is graded on a number its own answer never says, and'
      + ' choosing between two authored verdicts is authoring, so neither is written');
  }

  // ---- what is left over.
  const dropped = Object.keys(board).filter(k => !CONSUMED.has(k) && board[k] !== undefined).sort();
  if(dropped.length){
    extra.push(`the board authors \`${dropped.join('`, `')}\`, which the propagate block has no`
      + ' field for, so they are dropped');
  }
  const tail = str(board._trailing).replace(/^[.;,\s]+$/, '');
  if(tail) extra.push(`the payload carries prose after its board — "${tail}" — which may hold a`
    + ' number the board does not');

  return { key: 'propagate', value, owes: [...owes, ...extra], extra: keys };
};

// ------------------------------------------------------ the canonical board
//
// Three stops: Planetary Defense M4 S15, Ground Truth M13 S51 and Headwater M13
// S49. All three are byte-identical — ids `dominant`, `secondary` and `minor`,
// labelled "dominant uncertainty named in the question", 18/6/3 percent
// improvable to 4/5/2 — so this is the format-level template written in the
// game's schema and the labels are owed as placeholders.
//
// `improvable` IS A LIST OF IDS WHERE THE PANEL READS A LIST OF BUTTONS, and it
// is the whole of what makes this board unreadable today. The importer does
// `imp.forEach(m => ids.includes(String(m.id)))` on three strings, so `m.id` is
// undefined three times over and the report says *the improvable "undefined" is
// not one of the inputs* three times about a board that names all three plainly.
// The record it wants is `{id, label, cost, newSigmaFrac}`, and two of those four
// are on the board already: the label is the input's own, and `improvableTo` is
// the width after buying it, which is what `newSigmaFrac` means.
//
// ONE UNIT READ, GATED. The inputs are written `{value: 18, unit: percent}` on a
// row labelled "dominant uncertainty", and `sigmaFrac` is that width as a
// fraction. 18 is the bible's number and `percent` is the bible's own unit, so
// 0.18 is a reading rather than a derivation — but only while the board says
// `percent` and authors no `sigmaFrac` of its own. A board that states a
// sigmaFrac is left alone, and a board whose unit is metres is owed, because
// then `value` is the measured quantity and its width is somewhere else.
//
// WHAT IS NOT WRITTEN, AND IT IS MOST OF THE STOP. `exponent` — the power each
// term enters the output with — appears nowhere under any name, and it is half
// of the contribution the whole format turns on: the lesson is that ranking by
// exponent gets the wrong answer, and a board with no exponents cannot teach it.
// `costUnit`, `budget` and a `cost` per candidate are likewise absent, and money
// is what makes the choice a choice. All four are owed by `convert`.

/** `18` under a unit of `percent` as `0.18`; anything else unchanged. */
const asFraction = (n, unit) => (/^(percent|per ?cent|%)$/i.test(str(unit)) ? n / 100 : n);

/** True when a unit says the number beside it is a percentage. */
const isPercent = (unit) => /^(percent|per ?cent|%)$/i.test(str(unit));

export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? { ...b } : {};
  const owes = [];

  const rawIn = list(pick(board, 'inputs', 'terms'));
  const byId = new Map();

  // ---- the widths. `value` under a unit of percent, on a row that authors no
  // sigmaFrac, is the fractional width the term is known to.
  const inputs = rawIn.map((x) => {
    const rec = { ...(x ?? {}) };
    const id = str(pick(rec, 'id')) || str(rec.label);
    const val = num(rec.value);
    if(num(pick(rec, 'sigmaFrac', 'sigma')) === undefined && val !== undefined){
      if(isPercent(rec.unit)){
        rec.sigmaFrac = asFraction(val, rec.unit);
        // `value` is the measured quantity and this board's `value` was its
        // width, so the quantity itself is now unauthored and is owed by
        // `convert` rather than left standing as a number that means the
        // opposite of what the panel would print beside it.
        delete rec.value;
      } else {
        owes.push(`propagate input "${id || '?'}" states \`value: ${val}\` under a unit of`
          + ` "${str(rec.unit) || 'none'}" and no \`sigmaFrac\` — a width is only read off \`value\``
          + ' when the board itself says the number is a percentage, so nothing is written');
      }
    }
    if(id) byId.set(id, rec);
    return rec;
  });
  if(inputs.length) board.inputs = inputs;

  // ---- the ledger. A list of ids becomes the records the panel prints buttons
  // from, with the label, the improved width AND the price taken off the input
  // each one names. The price used not to be there — the fifth round put a
  // `cost` on every input, so a ledger of bare ids now carries one, and reading
  // it here is the difference between a board with three priced buttons and a
  // board the importer refuses for having none.
  const rawBuy = list(pick(board, 'improvable', 'purchases', 'measurements'));
  const scalar = rawBuy.filter(m => typeof m === 'string' || typeof m === 'number');
  if(scalar.length){
    board.improvable = rawBuy.map((m) => {
      if(typeof m !== 'string' && typeof m !== 'number') return m;
      const id = str(m);
      const src = byId.get(id);
      const to = num(pick(src ?? {}, 'improvableTo', 'improvable_to'));
      const cost = num(pick(src ?? {}, 'cost', 'price'));
      return { id,
        ...(str(src?.label) ? { label: str(src.label) } : {}),
        ...(to !== undefined ? { newSigmaFrac: asFraction(to, src?.unit) } : {}),
        ...(cost !== undefined ? { cost } : {}) };
    });
    const strays = scalar.map(String).filter(id => !byId.has(id));
    if(strays.length){
      owes.push(`the ledger names \`${strays.join('`, `')}\`, which are not inputs on this board —`
        + ' the label and the improved width are taken off the input each candidate names, so a'
        + ' candidate naming none gets neither');
    }
  }

  // ---- `correctUpgrade`, which is the same fact as `dominant` on all three
  // boards and has no field of its own. Said only when the two disagree: the
  // panel grades on `dominant`, so a board naming two different terms would be
  // graded on one of them with nothing reporting the other.
  const upgrade = str(pick(board, 'correctUpgrade', 'correct_upgrade'));
  delete board.correctUpgrade;
  delete board.correct_upgrade;
  if(upgrade && str(board.dominant) && upgrade !== str(board.dominant)){
    owes.push(`the board's \`correctUpgrade\` is "${upgrade}" and its \`dominant\` term is`
      + ` "${board.dominant}" — the panel grades the buy against \`dominant\`, so the two have to`
      + ' be the same term and the board states two');
  }

  const out = convert(board, stop);

  // ---- the verdict, which `convert` cannot reach and `extra` can.
  const kept = out.owes.filter(o => !/answerText/.test(o));
  const said = str(pick(b ?? {}, 'answerText', 'correctResult', 'correctConclusion',
    'correct_conclusion'));
  const extra = { ...(out.extra ?? {}) };
  delete extra.answerText;
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — the player buys a'
      + ' measurement, is told it was the wrong one, and never learns which term was widest');
  }

  return { key: 'propagate', value: out.value, owes: [...kept, ...owes], extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/propagate.mjs
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const full = convert({
    output: { label: 'Range', unit: 'km' }, costUnit: 'shift', budget: 2, dominant: 'timing',
    inputs: [
      { id: 'timing', label: 'Echo timing', value: 0.08, unit: 's', sigma: 0.20, sensitivity: 1.0, contribution: 0.20 },
      { id: 'calibration', label: 'Recorder calibration', value: 1.0, unit: 'V/count', sigma: 0.04, sensitivity: 2.0 },
      { id: 'geometry', label: 'Baseline geometry', value: 120, unit: 'm', sigma: 0.10, sensitivity: 1.0 },
    ],
    improvable: [
      { id: 'timing', label: 'Rent the clock', cost: 2, newSigmaFrac: 0.02 },
      { id: 'geometry', label: 'Resurvey the baseline', cost: 1, newSigmaFrac: 0.05 },
    ],
  });
  ok(full.owes.length === 0, `a complete propagate should owe nothing; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.inputs[0].sigmaFrac === 0.20 && full.value.inputs[0].exponent === 1.0,
    'sigma/sensitivity did not become sigmaFrac/exponent');
  ok(!('contribution' in full.value.inputs[0]), 'the derived contribution was written through');
  ok(full.value.budget === 2 && full.value.dominant === 'timing', 'a complete propagate lost its ledger');

  // The real board's shape: purchases keyed by action, reduction not a width.
  const bible = convert({
    inputs: [
      { id: 'calibration', sigma: 0.40, sensitivity: 2.0, contribution: 0.80 },
      { id: 'timing', sigma: 0.20, sensitivity: 1.5, contribution: 0.30 },
      { id: 'geometry', sigma: 0.10, sensitivity: 1.0, contribution: 0.10 },
    ],
    purchases: [
      { id: 'recalibrate', cost: 1, target: 'calibration', reduction: 0.25 },
      { id: 'resurvey', cost: 1, target: 'geometry', reduction: 0.05 },
    ],
    dominant: 'calibration', correctPurchase: 'recalibrate',
  });
  ok(bible.value.improvable[0].id === 'calibration',
    `a purchase keyed by its target became "${bible.value.improvable[0].id}"`);
  ok(bible.value.improvable.every(m => !('newSigmaFrac' in m)), 'an ambiguous reduction was guessed into a width');
  ok(bible.owes.some(o => /width afterwards or the amount removed/.test(o)), 'the ambiguous reduction was not owed');
  ok(bible.value.inputs.every(x => !('value' in x)), 'a missing input value was invented');
  ok(bible.owes.filter(o => /has no `value`/.test(o)).length === 3, 'the three missing input values were not owed');
  ok(!JSON.stringify(bible.value).includes('recalibrate'), 'the board\'s own answer was written through');
  ok(bible.owes.some(o => /correctPurchase/.test(o)), 'the printed answer was not owed');
  ok(bible.owes.some(o => /no `costUnit`/.test(o)), 'the missing costUnit was not owed');
  ok(bible.owes.some(o => /no `budget`/.test(o)), 'the missing budget was not owed');
  ok(!('budget' in bible.value), 'a missing budget was invented');
  // And the checks that must NOT fire on the board above, or they agree with themselves.
  ok(!bible.owes.some(o => /disagrees with its own arithmetic/.test(o)),
    'a board whose contribution IS the product was called inconsistent');

  // Put the arithmetic bug back: one contribution that is not the product.
  const wrong = convert({ inputs: [{ id: 'a', sigma: 0.4, sensitivity: 2.0, contribution: 0.5 }] });
  ok(wrong.owes.some(o => /disagrees with its own arithmetic/.test(o)),
    'a contribution that is not the product went unowed');

  // An improvable naming no input.
  const stray = convert({ inputs: [{ id: 'a', sigma: 0.4, sensitivity: 2, value: 1 }],
    improvable: [{ id: 'b', cost: 1, newSigmaFrac: 0.1 }] });
  ok(stray.owes.some(o => /is not one of the inputs/.test(o)), 'a stray improvable was not owed');

  // ---------------------------------------------------- the authored board
  const paid = {
    output: { label: 'Reservoir volume', unit: 'million m^3' }, costUnit: 'slot', budget: 1,
    dominant: 'level',
    error_terms: [
      { id: 'level', label: 'Stage level', value: 4.2, unit: 'm', sigma: 0.015, sensitivity: 2.0, output: 0.030 },
      { id: 'flow', label: 'Inflow', value: 18, unit: 'm^3/s', sigma: 0.002, sensitivity: 5, output: 0.010 },
      { id: 'clock', label: 'Logger clock', value: 900, unit: 's', sigma: 0.001, sensitivity: 4, output: 0.004 },
    ],
    purchase_options: [
      { id: 'level', label: 'Re-survey the staff gauge', cost: 1, newSigmaFrac: 0.004 },
      { id: 'flow', label: 'Re-rate the weir', cost: 1, newSigmaFrac: 0.001 },
    ],
  };
  const whole = convertPayload(paid, { answerText: '2.0 × .015 = .030, under the .10 margin.' });
  ok(whole.owes.length === 0, `a complete payload should owe nothing; owed ${JSON.stringify(whole.owes)}`);
  ok(whole.value.inputs[0].sigmaFrac === 0.015 && whole.value.inputs[0].exponent === 2.0,
    'sigma/sensitivity did not become sigmaFrac/exponent');
  ok(!('contribution' in whole.value.inputs[0]) && !('output' in whole.value.inputs[0]),
    'the derived contribution was written through under either name');
  ok(whole.value.improvable[0].cost === 1 && whole.value.budget === 1, 'the ledger was lost');

  // `output` is the contribution under a third name, so a board whose `output`
  // is NOT |sensitivity| × sigma disagrees with itself and must say so.
  const wrongOut = convertPayload({ ...paid,
    error_terms: [{ id: 'level', sigma: 0.015, sensitivity: 2.0, output: 0.5 }] },
  { answerText: 'x' });
  ok(wrongOut.owes.some(o => /disagrees with its own arithmetic/.test(o)),
    'an `output` that is not the product went unowed');
  ok(!whole.owes.some(o => /disagrees with its own arithmetic/.test(o)),
    'a board whose `output` IS the product was called inconsistent');

  // headwater's real shape: a reduction that is not a width, and a named answer.
  const hw = convertPayload({ budget: 1,
    error_terms: [
      { id: 'level', sigma: 0.015, sensitivity: 2.0, output: 0.030 },
      { id: 'flow', sigma: 0.002, sensitivity: 5, output: 0.010 },
      { id: 'clock', sigma: 0.001, sensitivity: 4, output: 0.004 },
    ],
    purchase_options: [{ id: 'level', cost: 1, reduction: 0.015 }, { id: 'flow', cost: 1, reduction: 0.003 }],
    correct_purchase: 'level', threshold: 0.10 }, { answerText: '2.0*.015=.030<.10; improve level.' });
  ok(hw.value.improvable.every(m => !('newSigmaFrac' in m)), 'an ambiguous reduction was guessed into a width');
  ok(hw.owes.some(o => /width afterwards or the amount removed/.test(o)), 'the ambiguous reduction was not owed');
  ok(!JSON.stringify(hw.value).includes('correct'), 'the board\'s own answer was written through');
  ok(hw.owes.some(o => /correctPurchase/.test(o)), 'the named purchase was not refused out loud');
  ok(hw.owes.some(o => /`threshold`/.test(o)), 'the dropped threshold was not owed');
  ok(hw.owes.some(o => /names no `dominant`/.test(o)), 'the missing dominant term was not owed');
  ok(!('dominant' in hw.value), 'a dominant term was computed rather than read');

  // planetary_defense's real shape: absolute widths and a new TOTAL width.
  const pd = convertPayload({
    current_error_budget: { angular_arc_km: 6200, range_km: 13800, timing_km: 4100, model_km: 2900 },
    candidate_updates: [
      { id: 'radar_range', cost: 35, new_total_width_km: 7600 },
      { id: 'radar_plus_dawn', cost: 65, new_total_width_km: 4600 },
    ],
    budget: 65, correct_update: 'radar_plus_dawn',
    answerText: 'Radar plus the dawn recovery reduces the width to 4,600 km.',
  }, { answerText: 'Geometry and time baseline together outperform more same-night precision.' });
  ok(!(pd.value.inputs ?? []).length, 'an absolute width in kilometres was written as a sigmaFrac');
  ok(!JSON.stringify(pd.value).includes('6200'), 'the absolute budget reached the value');
  ok(pd.owes.some(o => /absolute widths/.test(o)), 'the absolute error budget was not owed');
  ok(pd.owes.some(o => /new TOTAL width/.test(o)), 'a candidate moving the total was not owed');
  ok(pd.value.improvable[1].cost === 65 && pd.value.budget === 65, 'the ledger the board does author was dropped');
  ok(pd.value.improvable.every(m => !('newSigmaFrac' in m)), 'a total width became one input\'s width');
  ok(!whole.owes.some(o => /choosing between them is authoring/.test(o)),
    'a board with no answerText of its own was owed a conflict');

  // The verdict: placed where the stop has none, never over one it carries.
  const boardSays = convertPayload({ ...paid, answerText: 'Buy the gauge; level dominates.' }, {});
  ok(boardSays.extra.answerText === 'Buy the gauge; level dominates.',
    'the board\'s verdict was not placed on a stop that had none');
  ok(!pd.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  // planetary_defense's board names a 4,600 km encounter width its stop's verdict
  // never states — the case this check exists for.
  ok(pd.owes.some(o => /verdict states 4600 and the stop's/.test(o)),
    `a number only the board's verdict states went unowed: ${JSON.stringify(pd.owes)}`);
  const reworded = convertPayload({ ...paid, answerText: 'Level is the term to buy down.' },
    { answerText: 'Buy the gauge; level dominates.' });
  ok(!reworded.owes.some(o => /verdict states/.test(o)),
    'two verdicts in different words with the same numbers were owed');

  // A list with something in it that is not a record: counted, never dropped in
  // silence — a budget one term short with no owe is a budget nobody checks.
  const short = convertPayload({ budget: 1, error_terms: ['level', { id: 'flow', sigma: 0.002, sensitivity: 5 }],
    purchase_options: [{ id: 'flow', cost: 1, newSigmaFrac: 0.001 }] }, { answerText: 'x' });
  ok(short.value.inputs.length === 1, 'a non-record entry was converted anyway');
  ok(short.owes.some(o => /are not records/.test(o)), 'a non-record entry went unowed');
  ok(!whole.owes.some(o => /are not records/.test(o)), 'real records were called non-records');

  // The payload written under somebody else's key.
  const wrongKey = convertPayload(paid, { answerText: 'x', payloadKey: 'stress' });
  ok(wrongKey.owes.some(o => /written under `stress`/.test(o)), 'a mismatched payload key was not owed');

  // ---------------------------------------------------- the canonical board
  // Planetary Defense M4 S15 exactly as it arrives.
  const canon = {
    inputs: [
      { id: 'dominant', label: 'dominant uncertainty named in the question', value: 18,
        unit: 'percent', improvableTo: 4 },
      { id: 'secondary', label: 'secondary uncertainty', value: 6, unit: 'percent', improvableTo: 5 },
      { id: 'minor', label: 'minor uncertainty', value: 3, unit: 'percent', improvableTo: 2 }],
    dominant: 'dominant',
    improvable: ['dominant', 'secondary', 'minor'],
    correctUpgrade: 'dominant',
    correctResult: 'Radar plus dawn; 4,600 km forecast width.',
  };
  const cp = convertCanonical(canon, { answerText: 'Radar plus dawn; 4,600 km forecast width.' });
  ok(cp.key === 'propagate', `the canonical board was keyed ${cp.key}`);

  // THE RESHAPE. Three ids become three records the panel can print a button
  // from. Put it back — drop the `board.improvable = rawBuy.map(...)` line —
  // and these three cases fail while the widths above do not move.
  ok((cp.value.improvable ?? []).length === 3
    && cp.value.improvable.every(m => typeof m === 'object'),
  `the id list did not become records: ${JSON.stringify(cp.value.improvable)}`);
  ok((cp.value.improvable ?? [])[0]?.id === 'dominant'
    && cp.value.improvable[0].label === 'dominant uncertainty named in the question',
  'a candidate did not take its label off the input it names');
  ok(Math.abs((cp.value.improvable ?? [])[0]?.newSigmaFrac - 0.04) < 1e-9,
    `improvableTo did not become newSigmaFrac: ${cp.value.improvable?.[0]?.newSigmaFrac}`);
  ok(cp.value.improvable.map(m => m.id).join() === 'dominant,secondary,minor',
    'the ledger was reordered');

  // THE UNIT READ, and the case that proves it is a read of the board's own
  // unit rather than a division somebody chose: 18 percent is 0.18, and the
  // improved width goes through the same conversion so the pair stays a pair.
  ok(Math.abs(cp.value.inputs[0].sigmaFrac - 0.18) < 1e-9,
    `a percent width did not become a fraction: ${cp.value.inputs[0].sigmaFrac}`);
  ok(!('value' in cp.value.inputs[0]),
    'the width was left standing as `value`, where the panel prints it as the quantity itself');
  ok(cp.owes.some(o => /has no `value`/.test(o)),
    'the measured quantity, now unauthored, was not owed');

  // GATED, and both halves tested. A board that authors its own sigmaFrac is
  // left alone; a board whose unit is not a percentage is owed, not divided.
  const own = convertCanonical({ ...canon, inputs: canon.inputs.map(x =>
    ({ ...x, value: 340, unit: 'm', sigmaFrac: 0.18, exponent: 2 })) }, { answerText: 'x' });
  ok(own.value.inputs[0].sigmaFrac === 0.18 && own.value.inputs[0].value === 340,
    'a board that authors its own width had it overwritten');
  const metres = convertCanonical({ ...canon, inputs: canon.inputs.map(x =>
    ({ ...x, unit: 'm' })) }, { answerText: 'x' });
  ok(metres.value.inputs.every(x => !('sigmaFrac' in x)),
    'a width was read off a value the board never called a percentage');
  ok(metres.owes.some(o => /only read off `value` when the board itself says/.test(o)),
    `a value under a non-percent unit was not owed: ${JSON.stringify(metres.owes)}`);
  // And the case that must NOT fire, or the checks agree with themselves.
  ok(!cp.owes.some(o => /only read off `value`/.test(o)),
    'a value under a unit of percent was refused as if it were metres');

  // NEVER INVENTED: the exponent and the money, which are most of this stop.
  ok(cp.value.inputs.every(x => !('exponent' in x)), 'an exponent was invented');
  ok(cp.value.improvable.every(m => !('cost' in m)), 'a cost was invented');
  ok(cp.owes.some(o => /has no `sensitivity`/.test(o)), 'the missing exponents were not owed');
  ok(cp.owes.some(o => /has no `cost`/.test(o)), 'the missing costs were not owed');
  ok(cp.owes.some(o => /no `costUnit`/.test(o)) && cp.owes.some(o => /no `budget`/.test(o)),
    'the missing ledger was not owed');

  // `correctUpgrade` agreeing with `dominant` says nothing; disagreeing is the
  // case worth reporting, because the panel grades only one of the two.
  ok(!cp.owes.some(o => /correctUpgrade/.test(o)),
    'a correctUpgrade that agrees with the dominant term was owed as a disagreement');
  ok(convertCanonical({ ...canon, correctUpgrade: 'minor' }, { answerText: 'x' })
    .owes.some(o => /`correctUpgrade` is "minor"/.test(o)),
  'a correctUpgrade naming a different term than `dominant` was not owed');

  // A candidate naming no input gets no label and no width, and is said.
  const orphanBuy = convertCanonical({ ...canon, improvable: ['dominant', 'nowhere'] },
    { answerText: 'x' });
  ok(!('label' in orphanBuy.value.improvable[1])
    && !('newSigmaFrac' in orphanBuy.value.improvable[1]),
  'a candidate naming no input was given a label or a width anyway');
  ok(orphanBuy.owes.some(o => /ledger names `nowhere`/.test(o)),
    'a candidate naming no input was not owed');

  // The verdict, placed only where the stop has none.
  ok(!cp.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  ok(convertCanonical(canon, {}).extra.answerText.startsWith('Radar plus dawn'),
    'the board\'s verdict was not placed on a stop that had none');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('propagate.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `PROPAGATE selftest: ${f.length} failure(s)` : 'PROPAGATE selftest: ok');
  process.exit(f.length ? 1 : 0);
}
