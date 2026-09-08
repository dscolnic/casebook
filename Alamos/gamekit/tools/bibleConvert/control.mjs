// control.mjs — the bible's CONTROL board into the importer's.
//
// Three stops: carrying M10 S38, headwater M14 S55, planetary_defense M5 S19.
// See `_shared.mjs` for the contract every converter keeps.
//
// THREE RENAMES. `candidates` are the importer's `variables`, `fixed` is its
// `held`, and `noiseBand` is its `noise`. All three are the same authored fact
// under a different name, which is what a converter is for.
//
// WHAT IS REFUSED, AND WHY IT IS THE INTERESTING PART. Every one of the three
// boards authors `restore: {required: true, expectedReading: 10.0}` — a step
// that puts the variable back and checks the reading returns to baseline. The
// importer's `control` block has no field for it, so it cannot be carried; and
// the number it carries is the baseline printed back at the player, which is a
// panel grading against a target rather than against the goal. Both halves are
// owed: the missing field is a real gap in the importer's schema, and the
// printed reading is a board handing over its own answer.
//
// THE THING TO KNOW ABOUT THESE THREE BOARDS. All three are byte-identical, and
// their three candidates are `suspect_input`, `display_scale` and
// `ambient_condition` — placeholders naming no instrument in a coral tank, a
// river gauge or a telescope. None carries a label, and no `observable` names
// what is being read, so the importer would render a trial of three tokens
// against a quantity called "Reading". The campaigns' real controlled trials are
// in `stop.payload`: carrying's temperature/nitrate/salinity against dissolved
// oxygen and coral cover, planetary_defense's five held-fixed pipeline stages
// against a centroid in pixels.
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'CONTROL';

export const convert = (b) => {
  const owes = [];
  const value = {};

  // ---- the candidates. Written as bare id strings on all three boards, and as
  // `{id, label}` records in the payloads, so both are read.
  const raw = list(pick(b, 'variables', 'candidates'));
  const variables = raw.map((v, i) => {
    const at = `control variable ${i + 1}`;
    const rec = (typeof v === 'string') ? { id: v } : v;
    const id = str(pick(rec, 'id')) || str(rec.label);
    const label = str(rec.label);
    if(!id) owes.push(`${at} has no \`id\``);
    if(!label) owes.push(`${at} has no \`label\` — "${id || '?'}" is a token, not something a player reads`);
    const out = {};
    if(id) out.id = id;
    if(label) out.label = label;
    return out;
  });
  if(variables.length) value.variables = variables;
  if(variables.length < 3){
    owes.push(`the trial authors ${variables.length} candidates, and a controlled trial needs three`);
  }
  const ids = variables.map(v => v.id).filter(Boolean);

  // ---- what is held. A rename, and the list is carried in the order written.
  const held = list(pick(b, 'held', 'fixed', 'held_fixed')).map(h => (typeof h === 'string' ? str(h) : str(pick(h, 'id', 'label'))));
  if(held.length) value.held = held;
  else owes.push('the trial holds nothing fixed — a controlled trial with nothing controlled');

  // ---- the truth and the numbers.
  const truth = str(pick(b, 'truth', 'correct_control', 'correctControl'));
  if(truth) value.truth = truth;
  else owes.push('the trial names no `truth` — the variable that is actually doing it');
  if(truth && ids.length && !ids.includes(truth)){
    owes.push(`the trial's truth "${truth}" is not one of its variables`);
  }

  const baseline = num(pick(b, 'baseline'));
  const response = num(pick(b, 'response'));
  const noise = num(pick(b, 'noise', 'noiseBand', 'noise_band'));
  if(baseline !== undefined) value.baseline = baseline;
  else owes.push('the trial has no numeric `baseline` — the reading before anything is changed');
  if(response !== undefined) value.response = response;
  else owes.push('the trial has no numeric `response` — the signed change changing the truth makes');
  if(noise !== undefined) value.noise = noise;
  else owes.push('the trial has no `noiseBand` — without it every repeat reads the same number and'
    + ' repeating a measurement teaches nothing');

  // ---- the observable. Authored by none of the three; the importer defaults it
  // to a quantity called "Reading" with no unit.
  const obs = b.observable ?? {};
  if(str(obs.label) || str(obs.unit)){
    value.observable = { ...(str(obs.label) ? { label: str(obs.label) } : {}), ...(str(obs.unit) ? { unit: str(obs.unit) } : {}) };
  }
  if(!str(obs.label)) owes.push('the trial has no `observable` — nothing names the quantity the'
    + ' instrument reads, so the panel calls it "Reading"');
  if(!str(obs.unit)) owes.push('the trial\'s observable has no unit');

  // ---- the restore step, which the importer cannot hold.
  const restore = b.restore;
  if(restore){
    owes.push('the board authors a `restore` step — put the variable back and read it again — and'
      + ' the importer\'s `control` block has no field for it, so it is dropped rather than written'
      + ' under a name nothing reads');
    const expected = num(pick(restore, 'expectedReading', 'expected'));
    if(expected !== undefined && baseline !== undefined && Math.abs(expected - baseline) < 1e-9){
      owes.push(`\`restore.expectedReading\` is ${expected}, which is the baseline printed back —`
        + ' a panel that grades against a number prints the goal, never the target');
    }
  }

  // ---- the verdict, which is a top-level key.
  const conc = str(pick(b, 'correctConclusion', 'correct_conclusion', 'answerText'));
  owes.push(conc
    ? 'the board\'s conclusion is the stop\'s `answerText`, a top-level key this converter cannot'
      + ' write — the contract returns one key'
    : 'the trial authors no conclusion, so the stop has no `answerText` — the player is told they'
      + ' were wrong and never told which variable was doing it');

  return { key: 'control', value, owes };
};

// ------------------------------------------------------- the authored board
//
// Three stops point at their own interaction block instead of a §7 board:
// carrying M10 S38 (heat and nutrients on a coral tank), planetary_defense M5
// S19 (move the mask, not the object) and headwater M14 S55 (the Euler step).
// These are the real controlled trials the header above says were in
// `stop.payload` all along.
//
// THE ONE THING TO GET RIGHT, and it is worth the whole file. In this hand
// `baseline` and `response` are not always the OBSERVABLE's reading and its
// signed change — sometimes they are the CONTROL's two settings. Headwater
// writes `baseline: 1, response: .5` for a step size of 1.0 h changed to 0.5 h,
// and its readings are in `measurements: [4.36, 4.352, 4.36]`. Carrying those
// two numbers through as they stand ships a panel that reads "1.00, changes by
// +0.50" for a river forecast in metres: it converts, it imports, and every
// number on it is wrong. The tell is that the board's `baseline` is not one of
// its own measurements, and when that is true both numbers are refused and the
// readings are named in `owes` so a human finishes it in a minute.
//
// THE SECOND THING. Two of the three trials cannot be a controlled trial as the
// importer specifies one, and neither is the author's fault:
//
//   · Carrying changes TWO variables together and reports their interaction —
//     `selected_controls: [temperature, nitrate]`, four readings a run, three
//     runs. The importer's control holds one `truth`, one baseline and one
//     signed response. A 2×2 factorial does not fit in it.
//   · Planetary's whole finding is a NULL result: shifting the mask moves the
//     centroid by 0.03 px against a noise band of 0.08. The importer refuses a
//     response that is not clear of three times the noise, because such a trial
//     is a coin toss — which is exactly right for a trial that is meant to find
//     something, and exactly wrong for one whose answer is "nothing happened".
//
// Both are owed with the reason rather than bent into a shape they do not have.

/** Every numeric entry of a map, minus the keys a matcher rejects. */
const numeric = (obj, drop) => (obj && typeof obj === 'object' && !Array.isArray(obj)
  ? Object.entries(obj).filter(([k, v]) => num(v) !== undefined && !drop.test(k)) : []);

export function convertPayload(board, stop){
  const b = board ?? {};
  const owes = [];
  if(str(b._trailing)) owes.push(`prose follows the board and no field holds it — "${str(b._trailing)}"`);

  // ---- which list is the trial's candidates. `candidates` is the one the
  // trial's numbers hang off in this hand; `variables`, where a board writes
  // both, is a settings table (`baseline`/`test`/`unit` per row) that the
  // importer's control block has no field for. Dropping it silently is how a
  // book key goes four games without reaching a screen, so it is named.
  const cands = list(pick(b, 'candidates'));
  const vars = list(pick(b, 'variables'));
  const chosen = cands.length ? cands : vars;
  if(cands.length && vars.length){
    owes.push(`the board authors two parallel lists — \`candidates\` (${cands.length}) and`
      + ` \`variables\` (${vars.length}) — and the trial's numbers hang off \`candidates\`, so the`
      + ' settings table in `variables` is dropped rather than merged into names it does not fit');
  }
  const ids = chosen.map(c => str(pick(c ?? {}, 'id')) || str(pick(c ?? {}, 'label'))).filter(Boolean);

  // ---- the truth. Four names for it, and one board changes two things at once.
  const named = ['correct_control', 'correctControl', 'truth', 'correct']
    .map(k => str(pick(b, k))).filter(Boolean);
  const selected = list(pick(b, 'selected_controls', 'selectedControls')).map(String).map(s => s.trim());
  let truth = named.find(t => ids.includes(t)) ?? '';
  if(!truth && selected.length === 1 && ids.includes(selected[0])) truth = selected[0];
  if(selected.length > 1){
    owes.push(`the board changes ${selected.length} variables together (${selected.join(' and ')})`
      + ' and reports their interaction — the importer\'s controlled trial holds one `truth`, one'
      + ' baseline and one signed response, so a factorial design does not fit in it and no single'
      + ' variable is named as the answer');
  }
  if(!truth && named.length){
    owes.push(`the board names "${named[0]}" as the variable that is doing it, and that is not one`
      + ` of the ${ids.length} it offers`);
  }

  // ---- the readings, and the trap that this whole converter is for.
  const baseObj = (b.baseline && typeof b.baseline === 'object' && !Array.isArray(b.baseline)) ? b.baseline : null;
  const respObj = (b.response && typeof b.response === 'object' && !Array.isArray(b.response)) ? b.response : null;
  const measured = list(pick(b, 'measurements', 'readings')).map(num).filter(n => n !== undefined);
  const flatBase = num(pick(b, 'baseline'));

  let baseline, response, noise;
  const settings = measured.length >= 2 && flatBase !== undefined
    && !measured.some(m => Math.abs(m - flatBase) < 1e-9);
  if(settings){
    owes.push(`the board's \`baseline: ${flatBase}\` and \`response: ${str(pick(b, 'response'))}\``
      + ' are the CONTROL\'s two settings, not the observable\'s reading and its signed change —'
      + ` the readings are \`measurements: [${measured.join(', ')}]\`. Neither number is written,`
      + ' because writing them ships a panel whose every figure is the wrong quantity. Which'
      + ' measurement is the baseline, and what the signed response is, has to be said on the board');
  } else {
    // The baseline: a number, or the one non-noise reading of a map, or the one
    // the response block states it started from. Where two of those are present
    // they have to agree — that is free, and it is taken.
    const fromMap = numeric(baseObj, /noise/i);
    const stated = num(pick(respObj ?? {}, 'baseline_px', 'baseline'));
    if(flatBase !== undefined) baseline = flatBase;
    else if(fromMap.length === 1) baseline = fromMap[0][1];
    else if(stated !== undefined) baseline = stated;
    else if(fromMap.length > 1){
      owes.push(`the board's \`baseline\` is a map of ${fromMap.length} readings`
        + ` (${fromMap.map(([k]) => k).join(', ')}) and the importer holds one — which quantity the`
        + ' instrument reads is not said, so none of them is picked');
    }
    if(baseline !== undefined && stated !== undefined && Math.abs(baseline - stated) > 1e-9){
      owes.push(`the board's baseline is ${baseline} and its response block starts from ${stated}`);
      baseline = undefined;
    }

    // The response: a number, or the keyed candidate's own response. Never the
    // difference of two readings this tool picked out itself.
    response = num(pick(b, 'response'));
    if(response === undefined && truth){
      const keyed = chosen.find(c => (str(pick(c ?? {}, 'id')) || str(pick(c ?? {}, 'label'))) === truth);
      response = num(pick(keyed ?? {}, 'response_px', 'response', 'change'));
    }
    const moved = (respObj && num(respObj.after_change_px) !== undefined && stated !== undefined)
      ? num(respObj.after_change_px) - stated : undefined;
    if(response !== undefined && moved !== undefined && Math.abs(response - moved) > 1e-9){
      owes.push(`the keyed variable's response is ${response} and the response block moves the`
        + ` reading by ${moved.toFixed(3)}`);
      response = undefined;
    }
  }

  // The noise band, wherever it is written — and every place that writes it has
  // to agree, or the board says the instrument has two different noise bands.
  const noises = [num(pick(b, 'noise', 'noiseBand', 'noise_band')),
    ...numeric(pick(b, 'noise', 'noiseBand', 'noise_band'), /^$/).map(([, v]) => v),
    ...numeric(baseObj, /^(?!.*noise)/i).map(([, v]) => v),
    ...numeric(respObj, /^(?!.*noise)/i).map(([, v]) => v)].filter(n => n !== undefined);
  const distinct = [...new Set(noises)];
  if(distinct.length === 1) noise = distinct[0];
  else if(distinct.length > 1){
    owes.push(`the board writes ${distinct.length} different noise bands (${distinct.join(', ')})`
      + ' — one instrument has one, so none of them is written');
  }

  // The finding that the importer's control cannot hold: a change that does not
  // clear the noise. It is the answer to one of these three stops.
  if(response !== undefined && noise !== undefined && Math.abs(response) <= noise * 3){
    owes.push(`the keyed change moves the reading by ${response} against a noise band of ±${noise}`
      + ' — the whole finding is that changing this variable does NOTHING, and the importer refuses'
      + ' a response that is not clear of three times the noise because such a trial is a coin toss.'
      + ' A null result needs a format that can state one');
  }

  // ---- the restoration, and whether it prints its own answer. Two boards call
  // it `restore` and one calls it `reversal`; the reading it says to expect back
  // is written as `return_<the observable>`, which is why the prefix comes off
  // before it is matched against the baseline it is a copy of.
  const restore = pick(b, 'restore', 'restoration', 'reversal');
  const printed = numeric(restore, /^(required|remeasure|control_id)$/)
    .map(([k, v]) => [k.replace(/^return_/, ''), v])
    .filter(([k, v]) => {
      const against = baseObj && num(baseObj[k]) !== undefined ? num(baseObj[k]) : baseline;
      if(against === undefined) return false;
      return Math.abs(against - v) < 1e-9 || (noise !== undefined && Math.abs(against - v) <= noise);
    });
  if(printed.length){
    owes.push(`the restoration states the reading it expects back (${printed.map(([k, v]) => `${k} ${v}`).join(', ')}),`
      + ' which is the baseline printed back at the player — a panel that grades against a number'
      + ' prints the goal, never the target');
  }

  // ---- what else the importer has no home for.
  const homeless = [['responses', 'a run-by-run table of readings'],
    ['changed', 'the setting that was moved and by how much'],
    ['measure_when', 'when the reading is taken'],
    ['measurement_timing', 'the three moments a reading is taken'],
    ['required_sequence', 'the order the steps have to be done in'],
    ['equation', 'the formula the player applies']];
  const dropped = homeless.filter(([k]) => b[k] !== undefined && b[k] !== '');
  if(dropped.length){
    owes.push(`the board authors ${dropped.map(([k]) => `\`${k}\``).join(', ')} with no home in the`
      + ' importer\'s `control` block — the trial it holds is one baseline, one change and one'
      + ' reading, so the procedure around it is dropped rather than written under names nothing reads');
  }

  // ---- into the schema the §7 converter above already knows.
  const norm = { variables: chosen.map(c => ({ id: str(pick(c ?? {}, 'id')) || str(pick(c ?? {}, 'label')),
    ...(str(pick(c ?? {}, 'label')) ? { label: str(pick(c ?? {}, 'label')) } : {}) })) };
  const held = pick(b, 'held', 'fixed', 'held_fixed');
  if(held !== undefined) norm.held = held;
  if(truth) norm.truth = truth;
  if(baseline !== undefined) norm.baseline = baseline;
  if(response !== undefined) norm.response = response;
  if(noise !== undefined) norm.noise = noise;
  const obsLabel = str(pick(b.observable ?? {}, 'label')) || str(pick(respObj ?? {}, 'label'));
  const obsUnit = str(pick(b.observable ?? {}, 'unit'));
  if(obsLabel || obsUnit) norm.observable = { ...(obsLabel ? { label: obsLabel } : {}), ...(obsUnit ? { unit: obsUnit } : {}) };
  if(restore) norm.restore = restore;
  for(const k of ['correctConclusion', 'correct_conclusion', 'answerText']) if(b[k] !== undefined) norm[k] = b[k];

  const out = convert(norm, stop);
  return { key: str(stop?.payloadKey) || out.key, value: out.value, owes: [...owes, ...out.owes] };
}

// ------------------------------------------------------ the canonical board
//
// Three stops: Carrying Capacity M10 S38, Planetary Defense M5 S19 and Headwater
// M14 S55. All three are byte-identical — `setting: 0` against `setting: 1`,
// readings 0 and 0.24, a noise band of 0.08, and `fixed: ["all variables named
// as fixed in the question"]` — so this is the format-level template written in
// the game's schema.
//
// TWO READINGS WHERE THE PANEL HOLDS ONE READING AND ONE CHANGE. The board is
// written as an experiment: a `baseline` run and a `treatment` run, each with
// the setting it was made at and the reading it gave. The importer's block is
// written as an instrument: `baseline` is the reading before anything is
// changed and `response` is the SIGNED CHANGE changing the suspect makes. So
//
//   baseline.response                        → baseline
//   treatment.response − baseline.response   → response
//   baseline.noise                           → noise
//   fixed                                    → held        (already aliased above)
//
// The subtraction is the importer's own definition of the field, stated in its
// refusal text — "`response` is the signed change in the reading" — and both
// numbers are the bible's. It is not an average, a rounding or a model. It DOES
// matter: carried through as they stand, `baseline` is a map, `+{}` is NaN, and
// the report says "changing the suspect takes the reading to NaN, below zero"
// about a board that states both readings plainly. The selftest below moves the
// baseline off zero, because on these three boards it is zero and a converter
// that simply copied `treatment.response` would look right on all three.
//
// WHAT IS NOT WRITTEN, AND IT IS THE WHOLE DECISION. `variables` and `truth`.
// The board names no candidates and no culprit under any name, so there is
// nothing to rename: three suspects and the one that is doing it are what this
// format asks a player to choose between, and inventing them here would be
// writing the question. `convert` owes both.
export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? { ...b } : {};
  const owes = [];

  const base = (board.baseline && typeof board.baseline === 'object' && !Array.isArray(board.baseline))
    ? board.baseline : null;
  const treat = (board.treatment && typeof board.treatment === 'object'
    && !Array.isArray(board.treatment)) ? board.treatment : null;

  if(base || treat){
    const b0 = num(pick(base ?? {}, 'response', 'reading', 'value'));
    const b1 = num(pick(treat ?? {}, 'response', 'reading', 'value'));
    const noise = num(pick(base ?? {}, 'noise', 'noiseBand', 'noise_band'))
      ?? num(pick(treat ?? {}, 'noise', 'noiseBand', 'noise_band'));

    if(b0 !== undefined) board.baseline = b0;
    else delete board.baseline;
    if(b0 !== undefined && b1 !== undefined) board.response = b1 - b0;
    else delete board.response;
    if(noise !== undefined) board.noise = noise;
    delete board.treatment;

    if(b0 !== undefined && b1 === undefined){
      owes.push('the board authors a baseline reading and no treatment reading, so nothing states'
        + ' the change changing the suspect makes — the response is the difference between two'
        + ' readings and there is only one');
    }
    // The two settings are the positions of the control, not readings, and the
    // importer's block has no field for either — it prints its own change verb.
    const settings = [pick(base ?? {}, 'setting'), pick(treat ?? {}, 'setting')]
      .filter(v => v !== undefined);
    if(settings.length){
      owes.push(`the board states the control's two settings (${settings.map(str).join(' and ')})`
        + ' and the importer\'s `control` block has no field for them — the panel names the change'
        + ' with `changeVerb` instead, so they are dropped rather than written under a name'
        + ' nothing reads');
    }
  }

  const when = str(pick(board, 'measureWhen', 'measure_when'));
  delete board.measureWhen;
  delete board.measure_when;
  if(when){
    owes.push(`the board says the measurement is made "${when}" and the \`control\` block has no`
      + ' field for timing — it belongs in the stop\'s own scene, so it is dropped here');
  }

  const out = convert(board, stop);

  // ---- the verdict, which `convert` owes in every case because a §7 converter
  // cannot reach a top-level key. `extra` can.
  const kept = out.owes.filter(o => !/answerText/.test(o));
  const said = str(pick(b ?? {}, 'answerText', 'correctConclusion', 'correct_conclusion',
    'correctResult'));
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — the player is told they'
      + ' were wrong and never told which variable was doing it');
  }

  return { key: 'control', value: out.value, owes: [...kept, ...owes], extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/control.mjs
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const full = convert({
    observable: { label: 'Dissolved oxygen', unit: 'mg/L' },
    candidates: [{ id: 'temperature', label: 'Water temperature' },
      { id: 'nitrate', label: 'Nitrate concentration' },
      { id: 'salinity', label: 'Salinity' }],
    fixed: ['light', 'flow', 'fragment size'],
    truth: 'nitrate', baseline: 7.5, response: -1.7, noiseBand: 0.2,
    correctConclusion: 'Nitrate depresses oxygen; temperature alone does not.',
  });
  ok(full.owes.length === 1 && /answerText/.test(full.owes[0]),
    `a complete control should owe only its answerText; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.noise === 0.2, 'noiseBand did not become noise');
  ok(full.value.held.join() === 'light,flow,fragment size', 'fixed did not become held, in order');
  ok(full.value.observable.unit === 'mg/L', 'the observable was lost');

  // The real board.
  const bible = convert({
    candidates: ['suspect_input', 'display_scale', 'ambient_condition'],
    truth: 'suspect_input', baseline: 10.0, response: 2.0, noiseBand: 0.25,
    fixed: ['display_scale', 'ambient_condition'],
    restore: { required: true, expectedReading: 10.0 },
  });
  ok(bible.value.variables.every(v => !('label' in v)), 'a missing variable label was invented');
  ok(bible.owes.filter(o => /has no `label`/.test(o)).length === 3, 'the three missing labels were not owed');
  ok(!('observable' in bible.value), 'a missing observable was invented');
  ok(bible.owes.some(o => /no `observable`/.test(o)), 'the missing observable was not owed');
  ok(!JSON.stringify(bible.value).includes('restore'), 'the restore step was written through');
  ok(bible.owes.some(o => /`restore` step/.test(o)), 'the unholdable restore step was not owed');
  ok(bible.owes.some(o => /prints the goal, never the target/.test(o)), 'the printed target was not owed');
  ok(bible.owes.some(o => /no conclusion/.test(o)), 'the missing conclusion was not owed');
  // Two inputs that should score the same: bare ids and `{id}` records.
  const asRecords = convert({ candidates: [{ id: 'suspect_input' }, { id: 'display_scale' }, { id: 'ambient_condition' }],
    truth: 'suspect_input', baseline: 10.0, response: 2.0, noiseBand: 0.25,
    fixed: ['display_scale', 'ambient_condition'], restore: { required: true, expectedReading: 10.0 } });
  ok(JSON.stringify(asRecords.value) === JSON.stringify(bible.value),
    'candidates as bare ids and as records converted differently');
  ok(JSON.stringify(asRecords.owes) === JSON.stringify(bible.owes),
    'candidates as bare ids and as records were owed differently');

  // Refusal: no baseline, no response, no noise.
  const bare = convert({ candidates: ['a', 'b', 'c'], truth: 'a' });
  ok(!('baseline' in bare.value) && !('response' in bare.value) && !('noise' in bare.value),
    'a missing number was invented');
  ok(bare.owes.some(o => /numeric `baseline`/.test(o)), 'a missing baseline was not owed');
  ok(bare.owes.some(o => /numeric `response`/.test(o)), 'a missing response was not owed');
  ok(bare.owes.some(o => /no `noiseBand`/.test(o)), 'a missing noise band was not owed');
  ok(bare.owes.some(o => /holds nothing fixed/.test(o)), 'an empty held list was not owed');

  // A truth naming no variable — and the case that must not fire.
  ok(convert({ candidates: ['a'], truth: 'z' }).owes.some(o => /is not one of its variables/.test(o)),
    'a stray truth was not owed');
  ok(!full.owes.some(o => /is not one of its variables/.test(o)), 'a real truth was falsely owed');
  // A restore whose expected reading is NOT the baseline must not be called a printed target.
  const moved = convert({ candidates: ['a', 'b', 'c'], truth: 'a', baseline: 10, response: 2, noiseBand: 0.25,
    fixed: ['b'], restore: { required: true, expectedReading: 12 }, correctConclusion: 'x' });
  ok(!moved.owes.some(o => /prints the goal, never the target/.test(o)),
    'a restore reading that is not the baseline was falsely called a printed target');

  // ---------------------------------------------------------- authored boards
  // A payload board that is a controlled trial and owes only its answerText.
  const good = convertPayload({
    observable: { label: 'Dissolved oxygen', unit: 'mg/L' },
    candidates: [{ id: 'temperature', label: 'Water temperature' },
      { id: 'nitrate', label: 'Nitrate concentration' }, { id: 'salinity', label: 'Salinity' }],
    held_fixed: ['light', 'flow', 'fragment size'], correct_control: 'nitrate',
    baseline: 7.5, response: -1.7, noise_band: 0.2, measurements: [7.5, 5.8, 7.5],
    answerText: 'Nitrate depresses oxygen; temperature alone does not.',
  }, { payloadKey: 'control' });
  ok(good.owes.length === 1 && /answerText/.test(good.owes[0]),
    `a complete payload control should owe only its answerText; owed ${JSON.stringify(good.owes)}`);
  ok(good.value.baseline === 7.5 && good.value.response === -1.7 && good.value.noise === 0.2,
    'the readings were lost');
  ok(good.value.held.join() === 'light,flow,fragment size', '`held_fixed` did not become `held`');
  ok(good.value.truth === 'nitrate', '`correct_control` did not become `truth`');
  // Its baseline IS one of its measurements, so the settings trap must NOT fire.
  ok(!good.owes.some(o => /CONTROL's two settings/.test(o)),
    'a board whose baseline is one of its own readings was called a settings pair');

  // Headwater M14 S55: `baseline` and `response` are the step sizes, and the
  // readings are somewhere else entirely.
  const headwater = convertPayload({ candidates: [{ id: 'step' }, { id: 'initial' }, { id: 'k' }],
    correct_control: 'step', baseline: 1, response: '.5', noise_band: '.005',
    measurements: [4.36, 4.352, 4.36], restore: true,
    correct_conclusion: 'use conservative 4.36 m' }, { payloadKey: 'control' });
  ok(!('baseline' in headwater.value) && !('response' in headwater.value),
    'the control\'s settings were written as the observable\'s reading and change');
  ok(headwater.owes.some(o => /CONTROL's two settings/.test(o)), 'the settings pair was not owed');
  ok(headwater.owes.some(o => /4\.36, 4\.352, 4\.36/.test(o)),
    'the owed settings pair did not name the readings that are actually on the board');
  ok(headwater.value.noise === 0.005, 'a noise band written as `.005` was lost');
  ok(headwater.value.truth === 'step', 'the keyed control was lost');
  ok(headwater.owes.filter(o => /has no `label`/.test(o)).length === 3,
    'the three bare candidate ids were not owed');

  // Planetary Defense M5 S19: two parallel lists, a baseline inside a map, a
  // response on the keyed candidate, a reversal, and a null result.
  const planetary = convertPayload({
    changed: { bad_column_mask_shift_px: [0, 3] },
    held_fixed: ['raw 45 s image', 'star catalog', 'world-coordinate solution', 'centroid algorithm'],
    measurement_timing: ['before change', 'after +3 px change', 'after restoration'],
    variables: [{ id: 'mask_shift_px', label: 'Bad-column mask shift', baseline: 0, test: 3, unit: 'px' },
      { id: 'raw_image', label: 'Raw image', baseline: 45, test: 45, unit: 's exposure' },
      { id: 'star_catalog', label: 'Star catalog', baseline: 'fixed', test: 'fixed' }],
    baseline: { centroid_x_px: 2048.62, noise_band_px: 0.08 },
    candidates: [{ id: 'mask', label: 'Shift bad-column mask by 3 px', response_px: 0.03 },
      { id: 'alignment', label: 'Shift world-coordinate solution', response_px: 0.41 },
      { id: 'exposure', label: 'Double exposure time', response_px: 0.12 }],
    reversal: { required: true, control_id: 'mask', return_centroid_x_px: 2048.61 },
    response: { label: 'centroid x', baseline_px: 2048.62, after_change_px: 2048.65,
      after_restore_px: 2048.61, noise_band_px: 0.08 },
    required_sequence: ['measure_baseline', 'change_mask_only', 'measure'],
    correct_control: 'mask', correct: 'mask_shift_px',
    answerText: 'Moving and restoring the mask changes the centroid by less than the noise band.',
  }, { payloadKey: 'control' });
  ok(planetary.value.variables.map(v => v.id).join() === 'mask,alignment,exposure',
    'the settings table was read as the trial\'s candidates');
  ok(planetary.owes.some(o => /two parallel lists/.test(o)), 'the dropped `variables` table was not owed');
  ok(planetary.value.baseline === 2048.62, 'the baseline inside the reading map was not found');
  ok(planetary.value.response === 0.03, 'the keyed candidate\'s own response was not found');
  ok(planetary.value.noise === 0.08, 'the noise band was not found');
  ok(planetary.value.observable.label === 'centroid x', 'the observable was lost');
  ok(planetary.owes.some(o => /observable has no unit/.test(o)), 'the missing unit was not owed');
  ok(planetary.owes.some(o => /changing this variable does NOTHING/.test(o)),
    'a response inside the noise band was not owed as the null result it is');
  ok(!good.owes.some(o => /does NOTHING/.test(o)), 'a response clear of the noise was called null');
  ok(planetary.owes.some(o => /prints the goal, never the target/.test(o)),
    'the restored reading printed back was not owed');
  ok(planetary.owes.some(o => /`restore` step/.test(o)),
    'the reversal step the importer cannot hold was not owed');
  ok(!JSON.stringify(planetary.value).includes('2048.61'), 'the restored reading was written through');
  ok(planetary.owes.some(o => /`measurement_timing`/.test(o)), 'the homeless procedure was not owed');

  // Carrying Capacity M10 S38: two variables changed together, four readings a
  // run, two noise bands, and a restoration that prints the baseline back.
  const carrying = convertPayload({
    candidates: [{ id: 'temperature', label: 'temperature' },
      { id: 'nitrate', label: 'nitrate concentration' }, { id: 'salinity', label: 'salinity' }],
    selected_controls: ['temperature', 'nitrate'],
    baseline: { temperature_C: 24, nitrate_mgL: 1, DO_mgL: 7.5, cover_pct: 80 },
    responses: [{ temperature_C: 28, nitrate_mgL: 1, DO_mgL: 6.3, cover_pct: 70 },
      { temperature_C: 24, nitrate_mgL: 8, DO_mgL: 5.8, cover_pct: 62 }],
    noise_band: { DO_mgL: 0.2, cover_pct: 2 },
    fixed: ['light', 'flow', 'fragment size', 'salinity 35 ppt', 'six-week timing'],
    measure_when: 'after six weeks',
    restore: { required: true, temperature_C: 24, nitrate_mgL: 1, DO_mgL: 7.5, cover_pct: 80, remeasure: true },
    correct_conclusion: 'heat and nutrients interact',
    answerText: 'Heat and nitrate together depress oxygen more than either alone.',
  }, { payloadKey: 'control' });
  ok(carrying.value.variables.length === 3 && carrying.value.variables[1].label === 'nitrate concentration',
    'the candidates were lost');
  ok(carrying.value.held.length === 5, 'the five held-fixed conditions were lost');
  ok(!('baseline' in carrying.value) && !('response' in carrying.value) && !('noise' in carrying.value),
    'a reading was picked out of a map of four');
  ok(carrying.owes.some(o => /changes 2 variables together/.test(o)),
    'a factorial design was not owed');
  ok(carrying.owes.some(o => /map of 4 readings/.test(o)), 'the ambiguous baseline map was not owed');
  ok(carrying.owes.some(o => /2 different noise bands/.test(o)), 'the two noise bands were not owed');
  ok(carrying.owes.some(o => /prints the goal, never the target/.test(o)),
    'a restoration that states the baseline back was not owed');
  ok(!('truth' in carrying.value), 'a truth was invented for a two-variable trial');
  // And the cases that must NOT fire, or these checks agree with themselves.
  ok(!good.owes.some(o => /variables together|map of|different noise bands/.test(o)),
    'a single-variable trial was owed a factorial, a reading map or two noise bands');
  ok(!good.owes.some(o => /prints the goal, never the target/.test(o)),
    'a board with no restoration was owed a printed target');

  // A baseline and a response block that disagree are not resolved.
  const disagree = convertPayload({ candidates: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' },
    { id: 'c', label: 'C' }], truth: 'a', baseline: 10, noise: 0.1, held: ['x'],
  response: { baseline_px: 12, after_change_px: 13 } }, {});
  ok(!('baseline' in disagree.value), 'two baselines that disagree were resolved to one');
  ok(disagree.owes.some(o => /response block starts from 12/.test(o)),
    'two baselines that disagree were not owed');

  ok(convertPayload({ candidates: [], _trailing: 'the update reveals 4.235 m' }, {})
    .owes.some(o => /prose follows the board/.test(o)), 'trailing prose was dropped');

  // ---------------------------------------------------- the canonical board
  // Planetary Defense M5 S19 as it arrives, plus the variables, truth and
  // observable the three real boards do not carry — so the flattening can be
  // tested without every assertion also reporting the unauthored decision.
  const canon = {
    variables: [{ id: 'mask', label: 'The mask' }, { id: 'optics', label: 'The optics' },
      { id: 'object', label: 'The object' }],
    truth: 'mask',
    observable: { label: 'Centroid', unit: 'px' },
    baseline: { setting: 0, response: 0, noise: 0.08 },
    treatment: { setting: 1, response: 0.24 },
    fixed: ['exposure', 'filter'],
    measureWhen: 'after the second frame settles',
    restore: { required: true, setting: 0, remeasure: true },
    correctConclusion: 'Mask shift; response 0.03 px, below noise.',
  };
  const cv = convertCanonical(canon, { answerText: 'Mask shift; response 0.03 px, below noise.' });
  ok(cv.key === 'control', `the canonical board was keyed ${cv.key}`);

  // THE FLATTENING. Three renames; put any one back and only its case fails.
  ok(cv.value.baseline === 0, `baseline.response did not become baseline: ${cv.value.baseline}`);
  ok(cv.value.response === 0.24,
    `the two readings did not become one signed change: ${cv.value.response}`);
  ok(cv.value.noise === 0.08, `baseline.noise did not become noise: ${cv.value.noise}`);
  ok((cv.value.held ?? []).join() === 'exposure,filter', '`fixed` did not become `held`');
  ok(!('treatment' in cv.value) && !('measureWhen' in cv.value),
    'a key the control block has no field for was written into it anyway');

  // THE CASE THE THREE REAL BOARDS CANNOT TEST, because all three read zero at
  // baseline. `response` is the DIFFERENCE, not the treatment reading — a
  // converter that copied `treatment.response` passes every assertion above and
  // fails this one.
  const offset = convertCanonical({ ...canon,
    baseline: { setting: 0, response: 2.0, noise: 0.08 },
    treatment: { setting: 1, response: 2.24 } }, { answerText: 'x' });
  ok(offset.value.baseline === 2, `a non-zero baseline was lost: ${offset.value.baseline}`);
  ok(Math.abs(offset.value.response - 0.24) < 1e-9,
    `the response was copied rather than differenced: ${offset.value.response}`);

  // A suspect that SUPPRESSES the signal reads negative, and the sign has to
  // survive: the importer refuses a negative response for a reason, and hiding
  // one behind an absolute value would turn a refusal into a wrong panel.
  const down = convertCanonical({ ...canon,
    baseline: { setting: 0, response: 5, noise: 0.08 },
    treatment: { setting: 1, response: 4 } }, { answerText: 'x' });
  ok(down.value.response === -1, `the sign of the change was lost: ${down.value.response}`);

  // The two settings and the timing are dropped, and both are said out loud.
  ok(cv.owes.some(o => /control's two settings \(0 and 1\)/.test(o)),
    `the dropped settings were not owed: ${JSON.stringify(cv.owes)}`);
  ok(cv.owes.some(o => /made "after the second frame settles"/.test(o)),
    'the dropped measurement timing was not owed');
  ok(cv.owes.some(o => /authors a `restore` step/.test(o)), 'the dropped restore step was not owed');

  // NEVER INVENTED: the decision itself. The three real boards name no
  // candidates and no culprit, and neither is filled in.
  const template = convertCanonical({ ...canon, variables: undefined, truth: undefined,
    observable: undefined }, { answerText: 'x' });
  ok(!('variables' in template.value) && !('truth' in template.value),
    'the candidates or the culprit were invented for a board that names neither');
  ok(template.owes.some(o => /authors 0 candidates/.test(o))
    && template.owes.some(o => /names no `truth`/.test(o)),
  `the unauthored decision was not owed: ${JSON.stringify(template.owes)}`);
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!cv.owes.some(o => /authors 0 candidates|names no `truth`/.test(o)),
    'a board carrying three candidates and a truth was owed both anyway');

  // A treatment run with no reading: the response is not written, and why is said.
  const oneRun = convertCanonical({ ...canon, treatment: { setting: 1 } }, { answerText: 'x' });
  ok(!('response' in oneRun.value), 'a response was invented from one reading');
  ok(oneRun.owes.some(o => /there is only one/.test(o)), 'a single-reading board was not owed');

  // The verdict, placed only where the stop has none.
  ok(!cv.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  ok(convertCanonical(canon, {}).extra.answerText.startsWith('Mask shift'),
    'the board\'s verdict was not placed on a stop that had none');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('control.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `CONTROL selftest: ${f.length} failure(s)` : 'CONTROL selftest: ok');
  process.exit(f.length ? 1 : 0);
}
