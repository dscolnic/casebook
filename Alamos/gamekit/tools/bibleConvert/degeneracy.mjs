// degeneracy.mjs — the bible's authored DEGENERACY board into the importer's.
//
// Two stops: planetary_defense M10 S38 (is the light curve shape or surface) and
// redsand M15 S58 (which plan survives both constraints). No §7 board for
// DEGENERACY exists in any bible — `grep -c '§7 build completion — DEGENERACY'`
// returns zero — so this module exports `convertPayload` and NOT `convert`, for
// the reason in `belt.mjs`.
//
// WHAT THE FORMAT IS. Two controls, and a FAMILY of settings that all fit the
// first measurement equally well — the locus. Then a second measurement, made
// of different physics, whose own locus crosses the first in one place. The
// importer wants at least five points on the first and three on the second, and
// both have to pass through the truth, or the intersection is not the answer.
//
// THE TWO BOARDS ARE MISSING DIFFERENT HALVES, and neither is the same gap.
//
// Planetary Defense writes no locus at all: it writes two named CONSTRAINTS,
// each with its own value and tolerance, and the truth pair they cross at. The
// tolerances are the importer's, and both constraints state the truth back —
// which is a free check and is taken — but the families themselves are not on
// the board, so they are owed.
//
// Red Sand writes both loci in full and one tolerance for two controls whose
// steps are 2 and 40 — a single number cannot be both, so it is owed rather
// than copied onto each. Its first locus is the more interesting failure: it
// does not pass through the truth pair. The two loci have to cross at the
// answer, and these two share no point at all, so the intersection the stop is
// built around is not on the board. That is owed too, and it is exactly the
// kind of thing a converter is in a position to notice.
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'DEGENERACY';

/** `[4, 160]`, `{a: 4, b: 160}` or `{q: 4, A: 160}` as one `{a, b}` point. */
function pointOf(p, ids){
  if(Array.isArray(p) && p.length >= 2){
    const a = num(p[0]), b = num(p[1]);
    return (a === undefined || b === undefined) ? null : { a, b };
  }
  if(p && typeof p === 'object'){
    const a = num(pick(p, 'a', ids[0], 'x'));
    const b = num(pick(p, 'b', ids[1], 'y'));
    return (a === undefined || b === undefined) ? null : { a, b };
  }
  return null;
}

export function convertPayload(board, stop){
  const b = board ?? {};
  const owes = [];
  const value = {};
  if(str(b._trailing)) owes.push(`prose follows the board and no field holds it — "${str(b._trailing)}"`);

  // ---- the two controls. Exactly two is what makes a locus: one axis each.
  const raw = list(pick(b, 'controls', 'axes', 'sliders'));
  const controls = raw.map((c, i) => {
    const at = `degeneracy control ${i + 1}`;
    const id = str(pick(c ?? {}, 'id')) || str(pick(c ?? {}, 'label'));
    const label = str(pick(c ?? {}, 'label'));
    const min = num(pick(c ?? {}, 'min')), max = num(pick(c ?? {}, 'max')), step = num(pick(c ?? {}, 'step'));
    if(!id) owes.push(`${at} has no \`id\``);
    if(!label) owes.push(`${at} has no \`label\` — "${id || '?'}" is a token, not something a player reads`);
    if(min === undefined || max === undefined || step === undefined){
      owes.push(`${at} ("${id || '?'}") needs a numeric min, max and step`);
    } else if(max <= min){
      owes.push(`${at} ("${id || '?'}") runs from ${min} to ${max} — its max is not above its min`);
    }
    const out = {};
    if(id) out.id = id;
    if(label) out.label = label;
    if(min !== undefined) out.min = min;
    if(max !== undefined) out.max = max;
    if(step !== undefined) out.step = step;
    if(str(c?.unit)) out.unit = str(c.unit);
    return out;
  });
  if(controls.length) value.controls = controls;
  if(controls.length !== 2){
    owes.push(`the board has ${controls.length} controls and a degeneracy has exactly two — that`
      + ' is what makes a locus');
  }
  const ids = controls.map(c => c.id ?? '');

  // ---- the truth pair, written as a pair or as a map keyed by the controls.
  const tp = pick(b, 'truth_pair', 'truthPair', 'truth');
  const truth = pointOf(tp, ids);
  if(truth){
    value.truth = truth;
    controls.forEach((c, i) => {
      const v = i === 0 ? truth.a : truth.b;
      if(c.min !== undefined && c.max !== undefined && (v < c.min || v > c.max)){
        owes.push(`the truth ${v} on "${c.id}" is outside that control's own range ${c.min}–${c.max}`);
      }
    });
  } else {
    owes.push('the board has no readable `truth_pair` — the one setting both measurements agree on');
  }

  // ---- the tolerances. One board writes them on its two constraints, and each
  // constraint states the truth it is measuring, so the pairing is checked
  // rather than assumed. The other writes ONE tolerance for two controls whose
  // steps are 2 and 40, and a single number cannot be both.
  const cons = [pick(b, 'constraint_1', 'constraint1'), pick(b, 'constraint_2', 'constraint2')]
    .filter(c => c && typeof c === 'object');
  if(cons.length === 2){
    const tol = { a: num(pick(cons[0], 'tolerance', 'tol')), b: num(pick(cons[1], 'tolerance', 'tol')) };
    // Each constraint carries one number that is not its tolerance: the value it
    // pins. If that is the truth this converter read, the constraints are in the
    // order the controls are, and the tolerances belong where they are being put.
    const pinned = cons.map((c) => {
      const nums = Object.entries(c).filter(([k, v]) => !/^(tolerance|tol|source)$/.test(k) && num(v) !== undefined);
      return nums.length === 1 ? num(nums[0][1]) : undefined;
    });
    const agrees = truth && pinned[0] !== undefined && pinned[1] !== undefined
      && Math.abs(pinned[0] - truth.a) < 1e-9 && Math.abs(pinned[1] - truth.b) < 1e-9;
    if(tol.a !== undefined && tol.b !== undefined && tol.a > 0 && tol.b > 0 && agrees){
      value.tolerance = tol;
    } else if(tol.a !== undefined || tol.b !== undefined){
      owes.push(`the board's two constraints carry tolerances ${tol.a} and ${tol.b}, and`
        + (agrees ? ' one of them is not a positive number'
          : ` they pin ${pinned[0]} and ${pinned[1]} rather than the truth pair, so which control`
            + ' each tolerance belongs to is not settled by the board'));
    }
    for(const c of cons){
      if(!str(pick(c, 'source'))) owes.push('a constraint names no `source` — what measured it');
    }
  } else {
    const flat = num(pick(b, 'tolerance', 'tol'));
    const tolObj = pick(b, 'tolerance');
    const asPair = (tolObj && typeof tolObj === 'object') ? pointOf(tolObj, ids) : null;
    if(asPair && asPair.a > 0 && asPair.b > 0) value.tolerance = asPair;
    else if(flat !== undefined){
      owes.push(`the board writes one tolerance (${flat}) for two controls`
        + (controls.length === 2 && controls[0].step !== undefined && controls[1].step !== undefined
          ? ` whose steps are ${controls[0].step} and ${controls[1].step}` : '')
        + ' — a degeneracy needs a positive tolerance on each, and one number cannot be both');
    } else {
      owes.push('the board has no `tolerance` — how close a submitted pair has to be on each control');
    }
  }

  // ---- the two loci, and the one thing a converter is well placed to notice:
  // they have to CROSS at the truth. A point counts as passing through it within
  // the authored tolerance, and exactly when there is no usable tolerance.
  const firstBlock = (b.first_locus && typeof b.first_locus === 'object') ? b.first_locus : null;
  const secondBlock = (b.second && typeof b.second === 'object') ? b.second
    : ((b.second_locus && typeof b.second_locus === 'object') ? b.second_locus : null);
  const readLocus = (src, what) => {
    if(src === undefined || src === null) return null;
    const pts = list(src).map(p => pointOf(p, ids));
    if(!pts.length || pts.some(p => !p)){
      owes.push(`a point on the ${what} is not a pair of numbers`);
      return null;
    }
    return pts;
  };
  const crosses = (pts) => !truth || pts.some(p =>
    Math.abs(p.a - truth.a) <= (value.tolerance?.a ?? 0) + 1e-9
    && Math.abs(p.b - truth.b) <= (value.tolerance?.b ?? 0) + 1e-9);

  const first = readLocus(pick(b, 'locus') ?? (firstBlock ? pick(firstBlock, 'points', 'locus') : undefined),
    'first locus');
  if(first){
    value.locus = first;
    if(first.length < 5){
      owes.push(`the first locus has ${first.length} points and needs at least five — three is a`
        + ' line, and the player has to see a family');
    }
    if(!crosses(first)){
      owes.push(`the first locus does not pass through the truth pair (${truth.a}, ${truth.b}) —`
        + ' the two loci have to cross at the answer, or the intersection the stop is built around'
        + ' is not on the board');
    }
  } else {
    owes.push('the board has no first `locus` — the family of settings the first measurement'
      + ' cannot tell apart, which is the whole of what is degenerate');
  }

  const second = readLocus(secondBlock ? pick(secondBlock, 'points', 'locus') : undefined, 'second locus');
  const secondLabel = str(secondBlock ? pick(secondBlock, 'label') : '');
  if(second){
    value.second = {};
    if(secondLabel) value.second.label = secondLabel;
    else owes.push('the second measurement has no `label` saying what physics it uses');
    value.second.locus = second;
    if(second.length < 3){
      owes.push(`the second locus has ${second.length} points and needs at least three — the`
        + ' measurement that collapses the family');
    }
    if(!crosses(second)){
      owes.push(`the second locus does not pass through the truth pair (${truth.a}, ${truth.b}) —`
        + ' the two loci have to cross at the answer, or the intersection is not the answer');
    }
  } else {
    owes.push('the board has no `second` locus — the measurement made of different physics that'
      + ' collapses the family, without which nothing is ever resolved');
  }
  const physics = str(secondBlock ? pick(secondBlock, 'physics') : b.physics);
  if(physics && physics !== secondLabel){
    owes.push(`the board describes the second measurement's physics ("${physics}") beside its`
      + ' label, and the importer holds one line — the description is dropped rather than written'
      + ' under a name nothing reads');
  }

  // ---- the observable. The first locus's own label names the quantity every
  // setting on it reproduces, which is what the observable is; an explicit
  // `observable` wins where a board writes one.
  const obsLabel = str(pick(b.observable ?? {}, 'label')) || str(firstBlock ? pick(firstBlock, 'label') : '');
  if(obsLabel) value.observable = { label: obsLabel };
  else owes.push('the board has no `observable` — nothing names the quantity both settings'
    + ' reproduce, so the panel calls it "Measurement"');

  // ---- what the importer has no field for.
  const homeless = ['held_fixed', 'hardware_limits', 'interpretation'];
  const dropped = homeless.filter(k => b[k] !== undefined && b[k] !== '');
  if(dropped.length){
    owes.push(`the board authors ${dropped.map(k => `\`${k}\``).join(' and ')} with no home in the`
      + ' importer\'s `degeneracy` block, so it is dropped rather than written under a name nothing'
      + ' reads' + (dropped.includes('held_fixed')
        ? ' — `still` is what a measurement leaves unresolved, which is not what is held fixed' : ''));
  }

  const conc = pick(b, 'correct', 'answerText', 'interpretation', 'correct_conclusion');
  owes.push(str(conc)
    ? 'the board\'s conclusion is the stop\'s `answerText`, a top-level key this converter cannot'
      + ' write — the contract returns one key'
    : 'the board authors no conclusion, so the stop has no `answerText` — the player submits a'
      + ' pair, gets it wrong, and is never told which measurement ruled the rest out');

  return { key: str(stop?.payloadKey) || 'degeneracy', value, owes };
}

// ------------------------------------------------------ the canonical board
//
// Two stops: Planetary Defense M10 S38 and Red Sand M15 S58. Both boards are
// byte-identical placeholder geometry — a 5-point line from (0,4) to (4,0), a
// 3-point diagonal, truth at (2,2), controls labelled "first control named in
// the question" — so this is the format-level template written in the game's
// schema, and the labels are owed as such rather than passed off as content.
//
// THE FIELD NAMES, HOWEVER, ARE ENTIRELY THE BIBLE'S, and not one of them is the
// importer's. Carried through, `b.controls` is undefined, `cs[0].min` throws, and
// the whole thing arrives in the report as *the DEGENERACY board could not be
// read* on top of six refusals — about a board that states its loci, its truth
// and a tolerance per control:
//
//   controlA / controlB      → controls[0] / controls[1]
//   controlA.tolerance       → tolerance.a          (and B → tolerance.b)
//   firstLocus  {x, y}       → locus     {a, b}
//   secondLocus {x, y}       → second.locus {a, b}
//   secondMeasurement.label  → second.label
//   truth {x, y}             → truth {a, b}
//
// Every one of those is a rename and nothing more, so the reshape is done here
// and `convertPayload` above does the reading. That is deliberate: the crossing
// test, the five-point floor and the truth-inside-its-range check are one copy
// of one rule, and a second copy written for this shape would drift the first
// time either was corrected.
//
// WHAT IS NOT WRITTEN. `min`, `max` and `step` per control: the loci run 0 to 4
// on both axes and taking the range from them would be inventing the slider out
// of the answer — a player could then only ever land on a point of the family.
// `observable` likewise: nothing on the board names the quantity both settings
// reproduce.
export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const a = (board.controlA && typeof board.controlA === 'object') ? board.controlA : null;
  const c2 = (board.controlB && typeof board.controlB === 'object') ? board.controlB : null;

  const shaped = { ...board };
  for(const k of ['controlA', 'controlB', 'firstLocus', 'secondLocus', 'secondMeasurement']){
    delete shaped[k];
  }

  // ---- the two controls, in the order the board names them. `a` before `b` is
  // the whole of what pairs a locus coordinate with a tolerance, so the ids are
  // written rather than left to fall back on two identical placeholder labels.
  const controls = [];
  if(a) controls.push({ id: str(pick(a, 'id')) || 'a', ...a });
  if(c2) controls.push({ id: str(pick(c2, 'id')) || 'b', ...c2 });
  if(controls.length) shaped.controls = controls;
  for(const c of controls) delete c.tolerance;

  // ---- the tolerance, which the board writes one per control and the panel
  // reads as one pair. Written only when BOTH are there: half a pair would be
  // silently completed with a zero, and a zero tolerance grades an exact match.
  const tolA = num(pick(a ?? {}, 'tolerance', 'tol'));
  const tolB = num(pick(c2 ?? {}, 'tolerance', 'tol'));
  if(tolA !== undefined && tolB !== undefined) shaped.tolerance = { a: tolA, b: tolB };
  else if(tolA !== undefined || tolB !== undefined) shaped.tolerance = undefined;

  // ---- the loci and the second measurement.
  if(board.firstLocus !== undefined) shaped.locus = board.firstLocus;
  const secondLabel = str(pick(board.secondMeasurement ?? {}, 'label'));
  if(board.secondLocus !== undefined || secondLabel){
    shaped.second = { ...(secondLabel ? { label: secondLabel } : {}),
      ...(board.secondLocus !== undefined ? { locus: board.secondLocus } : {}) };
  }

  const out = convertPayload(shaped, { payloadKey: 'degeneracy' });

  // ---- the verdict. `convertPayload` owes it in every case because a §7
  // converter cannot reach a top-level key; `convertCanonical` can, through
  // `extra`, so that one line is answered here instead of repeated.
  const owes = out.owes.filter(o => !/answerText/.test(o));
  const said = str(pick(board, 'answerText', 'correctResult', 'correctConclusion',
    'correct_conclusion'));
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — the player submits a pair,'
      + ' gets it wrong, and is never told which measurement ruled the rest out');
  }
  if(tolA !== undefined !== (tolB !== undefined)){
    owes.push('only one of the two controls authors a `tolerance`, and a degeneracy needs one on'
      + ' each — half a pair is not written, because the missing half would be completed with a'
      + ' zero and a zero tolerance grades an exact match');
  }

  return { key: 'degeneracy', value: out.value, owes, extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/degeneracy.mjs --selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const full = convertPayload({
    controls: [{ id: 'q', label: 'Shape ratio', min: 1, max: 2, step: 0.05 },
      { id: 'A', label: 'Albedo ratio', min: 0.7, max: 1.4, step: 0.05 }],
    observable: { label: 'Light-curve amplitude' },
    locus: [[1.2, 1.35], [1.35, 1.2], [1.5, 1.1], [1.65, 1.0], [1.8, 0.92]],
    second: { label: 'Radar shape from delay-Doppler imaging',
      locus: [[1.6, 1.3], [1.65, 1.0], [1.7, 0.8]] },
    truth_pair: [1.65, 1.0], tolerance: { a: 0.1, b: 0.05 },
    answerText: 'Radar pins the shape, so the amplitude is shape-dominated.',
  }, { payloadKey: 'degeneracy' });
  ok(full.owes.length === 1 && /answerText/.test(full.owes[0]),
    `a complete degeneracy should owe only its answerText; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.locus.length === 5 && full.value.second.locus.length === 3, 'a locus was lost');
  ok(full.value.truth.a === 1.65 && full.value.tolerance.b === 0.05, 'the truth or tolerance was lost');

  // The planetary board: constraints instead of loci, and both pin the truth.
  const cons = convertPayload({
    controls: [{ id: 'shape_ratio_q', label: 'Long-to-short shape ratio', min: 1, max: 2, step: 0.05 },
      { id: 'albedo_ratio_A', label: 'Bright-to-dark albedo ratio', min: 0.7, max: 1.4, step: 0.05 }],
    held_fixed: ['rotation period', 'viewing geometry'],
    constraint_1: { source: 'radar', q: 1.65, tolerance: 0.1 },
    constraint_2: { source: 'color modulation', A: 1, tolerance: 0.05 },
    truth_pair: [1.65, 1], interpretation: 'shape_dominated',
  }, { payloadKey: 'degeneracy' });
  ok(cons.value.tolerance.a === 0.1 && cons.value.tolerance.b === 0.05,
    'the constraint tolerances did not become the control tolerances');
  ok(!('locus' in cons.value) && !('second' in cons.value), 'a locus was invented from constraints');
  ok(cons.owes.some(o => /no first `locus`/.test(o)), 'the missing first locus was not owed');
  ok(cons.owes.some(o => /no `second` locus/.test(o)), 'the missing second locus was not owed');
  ok(cons.owes.some(o => /`held_fixed`/.test(o)), 'the homeless held_fixed was not owed');
  // The pairing is checked, not assumed: constraints that pin something other
  // than the truth do not hand their tolerances to the controls.
  const crossed = convertPayload({ controls: cons.value.controls,
    constraint_1: { source: 'radar', q: 9.9, tolerance: 0.1 },
    constraint_2: { source: 'colour', A: 1, tolerance: 0.05 }, truth_pair: [1.65, 1] }, {});
  ok(!('tolerance' in crossed.value), 'a tolerance was written from constraints that pin nothing');
  ok(crossed.owes.some(o => /rather than the truth pair/.test(o)), 'the unpinned constraints were not owed');

  // Red Sand M15 S58: both loci written out, one tolerance for two controls,
  // and a first locus that never reaches the answer.
  const redsand = convertPayload({
    controls: [{ id: 'reprocessing_hours', label: 'Batch C reprocessing time', min: 0, max: 8, step: 2 },
      { id: 'electrolysis_kWh', label: 'Energy sent to electrolysis', min: 0, max: 160, step: 40 }],
    tolerance: 1,
    first_locus: { label: 'Projected gross tank mass at deadline',
      points: [[0, 160], [2, 120], [4, 80], [6, 40], [8, 0]] },
    second_locus: { label: 'Certified methane plus replaced processing hydrogen',
      physics: 'Independent composition assay and Faraday-limited H2 replacement',
      points: [[4, 160], [6, 120], [8, 80]] },
    truth_pair: { reprocessing_hours: 6, electrolysis_kWh: 120 },
    hardware_limits: { pressure_max_bar: 12 },
    correct: 'Plan D: reprocess Batch C and power the electrolysis.',
  }, { payloadKey: 'degeneracy' });
  ok(redsand.value.truth.a === 6 && redsand.value.truth.b === 120,
    'a truth pair written as a map keyed by the controls was not read');
  ok(redsand.value.locus.length === 5 && redsand.value.second.locus.length === 3,
    'a locus written in its own block was lost');
  ok(redsand.value.second.label.startsWith('Certified'), 'the second locus label was lost');
  ok(redsand.value.observable.label === 'Projected gross tank mass at deadline',
    'the first locus\'s label did not become the observable');
  ok(redsand.owes.some(o => /one tolerance \(1\) for two controls whose steps are 2 and 40/.test(o)),
    'one tolerance for two controls was not owed');
  ok(!('tolerance' in redsand.value), 'a per-control tolerance was invented from a single number');
  ok(redsand.owes.some(o => /first locus does not pass through the truth pair \(6, 120\)/.test(o)),
    'a first locus that never reaches the answer was not owed');
  ok(!redsand.owes.some(o => /second locus does not pass/.test(o)),
    'a second locus that does pass through the truth was owed as one that does not');
  ok(redsand.owes.some(o => /physics/.test(o)), 'the dropped physics line was not owed');
  ok(redsand.owes.some(o => /`hardware_limits`/.test(o)), 'the homeless hardware limits were not owed');
  // And the case that must NOT fire, or the crossing check agrees with itself.
  ok(!full.owes.some(o => /does not pass through the truth pair/.test(o)),
    'two loci that cross at the answer were owed as loci that do not');

  // Three controls is not a degeneracy, and a truth outside its own range.
  ok(convertPayload({ controls: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] }, {})
    .owes.some(o => /exactly two/.test(o)), 'a three-control board was not owed');
  ok(convertPayload({ controls: [{ id: 'a', label: 'A', min: 0, max: 1, step: 0.1 },
    { id: 'b', label: 'B', min: 0, max: 1, step: 0.1 }], truth_pair: [5, 0.5] }, {})
    .owes.some(o => /outside that control's own range/.test(o)), 'a truth off its own axis was not owed');
  ok(!full.owes.some(o => /outside that control's own range/.test(o)),
    'a truth inside its own range was called outside');

  // A truth pair written as a list and as a map keyed by the controls is one
  // authored fact in two hands, and must convert to one point.
  const asPair = convertPayload({ controls: redsand.value.controls, truth_pair: [6, 120] }, {});
  const asMap = convertPayload({ controls: redsand.value.controls,
    truth_pair: { reprocessing_hours: 6, electrolysis_kWh: 120 } }, {});
  ok(JSON.stringify(asPair.value.truth) === JSON.stringify(asMap.value.truth),
    'a truth pair written as a list and as a map converted differently');

  ok(convertPayload({ controls: [], _trailing: 'the assay reveals 6 h' }, {})
    .owes.some(o => /prose follows the board/.test(o)), 'trailing prose was dropped');

  // ---------------------------------------------------- the canonical board
  // Red Sand M15 S58 as it arrives, plus the min/max/step the two real boards do
  // not carry — so the six renames can be tested without every assertion also
  // reporting the three fields that are genuinely unauthored.
  const canon = {
    controlA: { label: 'Shape ratio q', min: 0, max: 4, step: 0.5, tolerance: 0.1 },
    controlB: { label: 'Albedo ratio A', min: 0, max: 4, step: 0.5, tolerance: 0.25 },
    firstLocus: [{ x: 0, y: 4 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 4, y: 0 }],
    secondLocus: [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 4, y: 4 }],
    secondMeasurement: { label: 'Radar shape from delay-Doppler imaging' },
    observable: { label: 'Light-curve amplitude' },
    truth: { x: 2, y: 2 },
    correctResult: 'q = 1.65 and A = 1.00; SHAPE-DOMINATED.',
  };
  const cn = convertCanonical(canon, { answerText: 'q = 1.65 and A = 1.00; SHAPE-DOMINATED.' });
  ok(cn.key === 'degeneracy', `the canonical board was keyed ${cn.key}`);
  ok(cn.owes.length === 0, `a complete canonical degeneracy owed ${JSON.stringify(cn.owes)}`);

  // THE SIX RENAMES. Put any one of them back and exactly the case beside it
  // fails; the others do not move.
  ok((cn.value.controls ?? []).length === 2
    && cn.value.controls[0].label === 'Shape ratio q'
    && cn.value.controls[1].label === 'Albedo ratio A',
  `controlA/controlB did not become controls[]: ${JSON.stringify(cn.value.controls)}`);
  ok(JSON.stringify(cn.value.tolerance) === '{"a":0.1,"b":0.25}',
    `the per-control tolerances did not become one pair: ${JSON.stringify(cn.value.tolerance)}`);
  ok((cn.value.locus ?? []).length === 5 && cn.value.locus[0].a === 0 && cn.value.locus[0].b === 4,
    `firstLocus x/y did not become locus a/b: ${JSON.stringify(cn.value.locus)}`);
  ok((cn.value.second?.locus ?? []).length === 3 && cn.value.second.locus[2].a === 4,
    `secondLocus did not become second.locus: ${JSON.stringify(cn.value.second)}`);
  ok(cn.value.second?.label === 'Radar shape from delay-Doppler imaging',
    'secondMeasurement.label did not become second.label');
  ok(cn.value.truth?.a === 2 && cn.value.truth?.b === 2,
    `truth x/y did not become truth a/b: ${JSON.stringify(cn.value.truth)}`);

  // THE TOLERANCES ARE NOT INTERCHANGEABLE, which is the case a reshape gets
  // wrong silently: swapping the two controls must swap the two tolerances with
  // them, and the second locus must still cross the truth on the new axes.
  const swapped = convertCanonical({ ...canon, controlA: canon.controlB, controlB: canon.controlA },
    { answerText: 'x' });
  ok(JSON.stringify(swapped.value.tolerance) === '{"a":0.25,"b":0.1}',
    `the tolerances did not follow their own controls: ${JSON.stringify(swapped.value.tolerance)}`);

  // NEVER INVENTED. The two real boards author no min, max or step — the loci
  // run 0 to 4 on both axes and taking the slider range from them would build
  // the control out of the answer.
  const real = convertCanonical({ ...canon,
    controlA: { label: 'first control named in the question', tolerance: 0.1 },
    controlB: { label: 'second control named in the question', tolerance: 0.1 },
    observable: undefined }, { answerText: 'x' });
  // GUARDED: `ok` collects rather than throws, and with the controls put back
  // this line would take the selftest down instead of reporting the failure.
  ok((real.value.controls ?? []).every(c => !('min' in c) && !('max' in c) && !('step' in c)),
    'a slider range was invented from the locus');
  ok(real.owes.some(o => /needs a numeric min, max and step/.test(o)),
    `the unauthored control range was not owed: ${JSON.stringify(real.owes)}`);
  ok(real.owes.some(o => /no `observable`/.test(o)), 'the unnamed observable was not owed');
  // And the case that must NOT fire, or the checks agree with themselves.
  ok(!cn.owes.some(o => /min, max and step|no `observable`/.test(o)),
    'a board carrying a range and an observable was owed both anyway');

  // Half a tolerance pair is not written, and the reason is said.
  const half = convertCanonical({ ...canon, controlB: { label: 'Albedo ratio A', min: 0, max: 4, step: 0.5 } },
    { answerText: 'x' });
  ok(!half.value.tolerance, 'half a tolerance pair was completed with a zero');
  ok(half.owes.some(o => /only one of the two controls authors a `tolerance`/.test(o)),
    `half a tolerance pair was not owed: ${JSON.stringify(half.owes)}`);

  // The verdict, placed only where the stop has none.
  ok(!cn.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  ok(convertCanonical(canon, {}).extra.answerText === 'q = 1.65 and A = 1.00; SHAPE-DOMINATED.',
    'the board\'s verdict was not placed on a stop that had none');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('degeneracy.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `DEGENERACY selftest: ${f.length} failure(s)` : 'DEGENERACY selftest: ok');
  process.exit(f.length ? 1 : 0);
}
