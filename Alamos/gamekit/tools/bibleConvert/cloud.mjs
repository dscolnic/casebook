// cloud.mjs — the bible's CLOUD board into the importer's.
//
// 8 stops, in three of the eight bibles. See `_shared.mjs` for the contract
// every converter in this directory keeps.
//
// Four fields cross unchanged — `bounds.min`, `bounds.max`, `centre`, `spread`
// and `pass` — and the actions do not cross at all. This file is mostly about
// why not, because "a cloud needs actions that narrow it" is the whole point of
// the format and leaving them out is the expensive-looking choice.
//
// -------------------------------------------------- why the actions stay owed
//
// The bible writes an action as `{id, label, shift, narrowBy}` — every action
// carries both numbers — and lists three: `recenter` (shift −1.0, narrowBy 0),
// `independent_sample` (shift 0, narrowBy 0.55) and `both` (shift −1.0,
// narrowBy 0.55), with `correctAction: both`. The importer's action is
// `{id, label, effect: shift|narrow, amount}` — one effect each — and its
// simulation applies *every* action, so its list is a set of independent levers
// and the bible's is a menu of three exclusive choices with the third being the
// first two together.
//
// That much could be reconciled: drop the composite `both`, and the two atomic
// entries are exactly the importer's two levers. What cannot be reconciled is
// the numbers, and this is the part that would be invention.
//
//   `shift`     The bible's is an absolute offset in bounds units: −1.0 moves a
//               centre of 1.4 to 0.4. The importer's `amount` is a fraction of
//               the way to the middle of the bounds, clamped to [0, 1] — so the
//               bible's −1.0 arrives as 0 and moves the dot nowhere. Carrying
//               the number literally is wrong; converting it (1.0/1.4 → 0.714)
//               is arithmetic on somebody else's uncertainty model.
//
//   `narrowBy`  0.55, and the name does not say whether that is the multiplier
//               on the spread (the importer's meaning, and what the authored
//               books use: 0.5 × a 0.5 σ gives the 0.35 the answer text quotes)
//               or the fraction removed from it (× 0.45). Both readings pass
//               every gate the importer has, so the gate cannot settle it.
//
// And the board's own two answers do not settle it either. It states
// `recenterAlonePassFraction: .68` and `bothPassFraction: .93`; the importer's
// Gaussian on these bounds gives 64.5% for the re-centre and 85.7% (multiplier)
// or 90.8% (fraction removed) for both. Neither reading reproduces either
// number, so there is nothing to check a translation against — which is exactly
// the situation the rule at the top of `_shared.mjs` is for.
//
// So `actions` is owed, with the three ids and labels quoted into the sentence
// so whoever authors them is not sent back to the bible to find them. The
// importer then refuses the stop with "a cloud needs at least two actions",
// which is true, instead of accepting a spread that was narrowed by a number
// this file made up.
//
// `correctAction`, `recenterAlonePassFraction` and `bothPassFraction` have no
// home on the importer's board — the importer computes the pass fractions from
// the actions — so they are dropped rather than owed.
import { str, num, list, pick } from './_shared.mjs';
import { isPlaceholder } from './verify.mjs';

export const FORMAT = 'CLOUD';

export const convert = (b) => {
  const owes = [];
  const bo = pick(b, 'bounds') ?? {};

  const min = num(pick(bo, 'min')), max = num(pick(bo, 'max'));
  if(min === undefined || max === undefined) owes.push('no `bounds` with a min and a max — the corridor the cloud has to finish inside');
  else if(!(max > min)) owes.push(`the bounds run ${min} to ${max}, so there is no corridor`);

  const centre = num(pick(b, 'centre', 'center'));
  if(centre === undefined) owes.push('no numeric `centre` — where the cloud starts');
  const spread = num(pick(b, 'spread'));
  if(spread === undefined) owes.push('no numeric `spread` — how wide the cloud starts');
  const pass = num(pick(b, 'pass'));
  if(pass === undefined) owes.push('no `pass` — the fraction of the cloud that has to finish inside the bounds');

  const label = str(pick(bo, 'label'));
  if(!label) owes.push('the bounds carry no `label` naming the axis the cloud is spread along');
  const unit = str(pick(bo, 'unit'));
  if(!unit) owes.push('the bounds carry no `unit`');
  else if(isPlaceholder(unit)) owes.push(`the bounds carry the generated stub "${unit}" where the unit goes`);

  // See the note above. The actions are named back, never translated.
  const acts = list(pick(b, 'actions'));
  if(!acts.length) owes.push('no `actions` — a cloud with nothing that narrows it cannot be answered');
  else {
    const named = acts.map(a => `\`${str(pick(a, 'id')) || str(pick(a, 'label'))}\` (${str(pick(a, 'label'))})`).join(', ');
    const shaped = acts.every(a => ['shift', 'narrow'].includes(str(pick(a, 'effect'))) && num(pick(a, 'amount')) !== undefined);
    if(!shaped){
      owes.push(`${acts.length} action(s) are written as \`shift\`/\`narrowBy\` pairs, which the panel cannot run:`
        + ' each importer action takes one `effect: shift|narrow` and one `amount` — a shift being the'
        + ' fraction of the way to the middle of the bounds and a narrow the multiplier on the spread.'
        + ` Re-author ${named} in those terms; nothing here translates the bible's numbers, because its`
        + ' own recenterAlonePassFraction and bothPassFraction reproduce under no reading of them.');
    }
  }
  const carried = acts.filter(a => ['shift', 'narrow'].includes(str(pick(a, 'effect'))) && num(pick(a, 'amount')) !== undefined);

  const bounds = {
    ...(min === undefined ? {} : { min }),
    ...(max === undefined ? {} : { max }),
    ...(unit && !isPlaceholder(unit) ? { unit } : {}),
    ...(label ? { label } : {}),
  };

  return {
    key: 'cloud',
    value: {
      bounds,
      ...(centre === undefined ? {} : { centre }),
      ...(spread === undefined ? {} : { spread }),
      ...(pass === undefined ? {} : { pass }),
      ...(carried.length ? { actions: carried.map(a => ({
        id: str(pick(a, 'id')) || str(pick(a, 'label')),
        label: str(pick(a, 'label')),
        effect: str(pick(a, 'effect')),
        amount: num(pick(a, 'amount')),
        ...(num(pick(a, 'cost')) === undefined ? {} : { cost: num(pick(a, 'cost')) }),
      })) } : {}),
    },
    owes,
  };
};

// ------------------------------------------------------- the authored boards
//
// 8 stops point at their own interaction block, one of them in a notation
// `_payload.mjs` cannot read at all (`corridors fish=III, seal=I; tolerance=10
// survivors`), so seven arrive here. And the finding is that seven of the eight
// are not scatters. The panel this converter feeds is a cloud of dots with a
// corridor, a centre, a spread, a pass fraction and levers that move them; what
// the bibles authored under CLOUD is, six times out of seven, a *settings board*:
//
//   cloud: initial_solutions: 240
//          points: - {id: measure_intersection, setting: weighted Earth intersection,
//                     reading: 3.2 percent impact fraction} …
//          controls: - {id: focus, label: Include gravitational focusing} …
//          weighted_impact_fraction: 0.032  correct_conclusion: continuous_monitoring
//
// You turn a setting on, you read a value, you submit a conclusion. Every number
// in it is real and campaign-specific — 240 solutions, 7,240 km of focused Earth
// radius, 6,300 impacts in 10,000 weighted trials, 96% at three sigma — and none
// of them is a bound, a centre, a spread or a pass fraction. There is nothing to
// translate: a cloud's corridor is two numbers on an axis, and "harm boundary"
// and "populated land" are not two numbers.
//
// So this reads what is there, carries the two fields that do cross, and owes
// the rest with the board's own numbers quoted into the sentence, so whoever
// finishes it is not sent back to the bible to find them. Whether these seven
// stops should be CLOUD at all is a question for the campaign, not for a
// converter, and the owed lines are what make it visible.
//
// THE TWO THAT DO CROSS, both from The Trial's power board — the one genuine
// scatter in the eight:
//
//   `centre`  every setting carries `center: 0.004`, the same number four times.
//             One centre, written per setting, is still one centre.
//   `spread`  the settings run 0.0031, 0.0028, 0.0026, 0.0024 as n goes 200 to
//             320, and the stop's own copy says "increasing n from 200 to 320" —
//             so the first is where the cloud starts. Guarded rather than
//             assumed: taken only when the first setting is the widest, because
//             a list that does not narrow says nothing about which end it starts
//             from, and then the spread is owed with all four quoted.
//
// The four amounts that would turn those four spreads into `narrow` actions are
// not taken. That is the arithmetic the top of this file refuses.
const ROW_KEYS = ['settings', 'points', 'samples', 'bins', 'zones'];

export const convertPayload = (board, stop) => {
  const b = board ?? {};
  const owes = [];

  const rowKey = ROW_KEYS.find(k => list(pick(b, k)).some(r => r && typeof r === 'object'));
  const rows = rowKey ? list(pick(b, rowKey)) : [];

  // ---- the corridor.
  const boIn = pick(b, 'bounds');
  const bo = boIn && typeof boIn === 'object' && !Array.isArray(boIn) ? boIn : {};
  const min = num(pick(bo, 'min')), max = num(pick(bo, 'max'));
  const label = str(pick(bo, 'label'));
  const unit = str(pick(bo, 'unit'));
  const corridor = str(pick(b, 'corridor', 'target_corridor'));
  if(min === undefined || max === undefined){
    owes.push(corridor
      ? `the corridor is named "${corridor}" and never given numbers — a cloud is graded by the`
        + ' fraction of it that finishes between a min and a max on one labelled axis, in a unit'
      : 'no `bounds` — the corridor the cloud has to finish inside, as a min, a max, a label for'
        + ' the axis and its unit');
  } else {
    if(!(max > min)) owes.push(`the bounds run ${min} to ${max}, so there is no corridor`);
    if(!label) owes.push('the bounds carry no `label` naming the axis the cloud is spread along');
    if(!unit) owes.push('the bounds carry no `unit`');
    else if(isPlaceholder(unit)) owes.push(`the bounds carry the generated stub "${unit}" where the unit goes`);
  }

  // ---- the centre. One number written once, or the same number written into
  // every setting, which is the same fact.
  let centre = num(pick(b, 'centre', 'center'));
  if(centre === undefined && rows.length > 1){
    const cs = rows.map(r => num(pick(r, 'centre', 'center')));
    if(cs.every(c => c !== undefined) && new Set(cs).size === 1) centre = cs[0];
  }
  if(centre === undefined) owes.push('no numeric `centre` — where the cloud starts on that axis');

  // ---- the spread. See the note above for why the first setting, and only
  // when the run narrows from it.
  let spread = num(pick(b, 'spread'));
  if(spread === undefined && rows.length > 1){
    const sp = rows.map(r => num(pick(r, 'spread')));
    if(sp.every(s => s !== undefined)){
      if(sp[0] === Math.max(...sp) && sp[0] > Math.min(...sp)) spread = sp[0];
      else {
        owes.push(`the board writes a spread per ${rowKey.replace(/s$/, '')} — ${sp.join(', ')} — and`
          + ' the run does not start at the widest, so nothing says which one the cloud starts at');
      }
    }
  }
  if(spread === undefined && !owes.some(o => /which one the cloud starts at/.test(o))){
    owes.push('no numeric `spread` — how wide the cloud starts');
  }

  const pass = num(pick(b, 'pass', 'pass_fraction', 'passFraction'));
  if(pass === undefined){
    owes.push('no `pass` — the fraction of the cloud that has to finish inside the bounds, which is'
      + ' the whole of how the panel grades');
  }

  // ---- the levers. `controls` is the bible's word for them and carries an id
  // and a label and no physics; the two numbers the panel runs on are not there.
  const acts = list(pick(b, 'actions', 'controls'));
  const carried = acts.filter(a => ['shift', 'narrow'].includes(str(pick(a, 'effect')))
    && num(pick(a, 'amount')) !== undefined);
  if(!acts.length){
    owes.push('no `actions` — a cloud with nothing that narrows it cannot be answered; each takes'
      + ' one `effect: shift|narrow` and one `amount`, a shift being the fraction of the way to the'
      + ' middle of the bounds and a narrow the multiplier on the spread');
  } else if(carried.length < acts.length){
    const named = acts.filter(a => !carried.includes(a))
      .map(a => `\`${str(pick(a, 'id')) || str(pick(a, 'label'))}\``).join(', ');
    owes.push(`${acts.length - carried.length} lever(s) — ${named} — carry an id and a label and no`
      + ' `effect: shift|narrow` with an `amount`, so the panel cannot run them; a lever marked'
      + ' `trap` is not one either, because the trap in a cloud is arithmetic — re-centring alone'
      + ' has to fall short of the pass fraction');
  }

  // ---- what the board carries instead, so nobody goes back to the bible for
  // it. Said once, and only when the board does not even give the cloud its own
  // two numbers — a board with a centre and a spread is a scatter missing its
  // corridor, which the lines above already say, and adding this to it would be
  // a second sentence about a board that is nearly right.
  if(centre === undefined || spread === undefined){
    const held = [];
    for(const [k, v] of Object.entries(b)){
      if(k === '_trailing' || ['bounds', 'centre', 'center', 'spread', 'pass'].includes(k)) continue;
      if(typeof v === 'number') held.push(`\`${k}\` ${v}`);
      else if(Array.isArray(v) && v.length > 1
        && v.every(x => typeof x === 'number' || (typeof x === 'string' && x.length < 40))){
        held.push(`\`${k}\` [${v.join(', ')}]`);
      }
    }
    // A row states itself with a `reading`, or — Carrying Capacity's age bins —
    // with its own scalar fields and no reading at all.
    const readings = rows.map((r, i) => {
      const at = str(pick(r, 'id')) || `row ${i + 1}`;
      const rd = str(pick(r, 'reading'));
      if(rd) return `\`${at}\` reads ${rd}`;
      const fields = Object.entries(r ?? {})
        .filter(([k, v]) => k !== 'id' && (typeof v === 'number' || typeof v === 'string'))
        .map(([k, v]) => `${k} ${v}`).join(', ');
      return fields ? `\`${at}\` ${fields}` : null;
    }).filter(Boolean);
    const shown = [...held, ...readings];
    if(shown.length || rows.length){
      owes.push('the board is a settings-and-readings board rather than a scatter'
        + (rows.length ? `: ${rows.length} \`${rowKey}\`` : '')
        + (shown.length ? `, holding ${shown.slice(0, 6).join('; ')}${shown.length > 6 ? '; …' : ''}` : '')
        + ' — real numbers with nowhere on a cloud board to go, so the stop is either re-authored'
        + ' as a corridor with levers or it is not a CLOUD');
    }
  }

  if(str(b._trailing)){
    owes.push(`prose follows the board — "${str(b._trailing)}" — and the cloud board has no field`
      + ' for it; if it reveals a number the board does not hold, author it into the board');
  }

  return {
    key: 'cloud',
    value: {
      bounds: {
        ...(min === undefined ? {} : { min }),
        ...(max === undefined ? {} : { max }),
        ...(unit && !isPlaceholder(unit) ? { unit } : {}),
        ...(label ? { label } : {}),
      },
      ...(centre === undefined ? {} : { centre }),
      ...(spread === undefined ? {} : { spread }),
      ...(pass === undefined ? {} : { pass }),
      ...(carried.length ? { actions: carried.map(a => ({
        id: str(pick(a, 'id')) || str(pick(a, 'label')),
        label: str(pick(a, 'label')),
        effect: str(pick(a, 'effect')),
        amount: num(pick(a, 'amount')),
        ...(num(pick(a, 'cost')) === undefined ? {} : { cost: num(pick(a, 'cost')) }),
      })) } : {}),
    },
    owes,
  };
};

// ----------------------------------------------------------------- selftest
//
//   node tools/bibleConvert/cloud.mjs --selftest
//
// The case this file exists for is the last pair below: a board whose actions
// are the bible's `shift`/`narrowBy` pairs owes them and comes back with NO
// `actions` key, while a board whose actions already carry `effect` and
// `amount` owes nothing and carries them through. Two boards with the same
// three actions, scoring differently only because one of them is authored in
// the schema the panel runs.
//
// Verified by putting the bug back — mapping `narrowBy` straight onto `amount`
// with `effect: 'narrow'` — and watching that pair, and only that pair, fail.
export function selftest(){
  let bad = 0;
  const check = (name, ok) => { if(!ok){ bad++; console.log(`  ✗ ${name}`); } };

  const full = () => ({
    bounds: { min: 5.3, max: 7.7, unit: 'degrees', label: 'entry flight path angle' },
    centre: 6.2, spread: 0.5, pass: 0.995,
    actions: [
      { id: 'recenter', label: 'Small targeting correction', effect: 'shift', amount: 1 },
      { id: 'track', label: 'Independent tracking pass', effect: 'narrow', amount: 0.7, cost: 4 },
    ],
  });

  const good = convert(full());
  check('a complete board owes nothing', good.owes.length === 0);
  check('and carries both actions', good.value.actions.length === 2);
  check('and keeps a narrow amount as the multiplier it is', good.value.actions[1].amount === 0.7);
  check('and keeps an authored cost', good.value.actions[1].cost === 4);
  check('and keeps the bounds', good.value.bounds.min === 5.3 && good.value.bounds.max === 7.7);

  const noBounds = full(); delete noBounds.bounds;
  const r1 = convert(noBounds);
  check('a board with no bounds owes them', r1.owes.some(o => /`bounds`/.test(o)));
  check('and gets no min or max', !('min' in r1.value.bounds) && !('max' in r1.value.bounds));

  const noSpread = full(); delete noSpread.spread;
  const r2 = convert(noSpread);
  check('a board with no spread owes it', r2.owes.some(o => /`spread`/.test(o)));
  check('and gets no spread — not a zero', !('spread' in r2.value));

  const noPass = full(); delete noPass.pass;
  const r3 = convert(noPass);
  check('a board with no pass owes it', r3.owes.some(o => /`pass`/.test(o)));
  check('and gets no pass', !('pass' in r3.value));

  const noActs = full(); noActs.actions = [];
  const r4 = convert(noActs);
  check('a board with no actions owes them', r4.owes.some(o => /`actions`/.test(o)));
  check('and gets no actions key', !('actions' in r4.value));

  // The pair. Same three levers; only the schema differs.
  const bible = { ...full(), actions: [
    { id: 'recenter', label: 'remove measured offset', shift: -1.0, narrowBy: 0.0 },
    { id: 'independent_sample', label: 'add independent measurements', shift: 0.0, narrowBy: 0.55 },
    { id: 'both', label: 'recenter and add independent measurements', shift: -1.0, narrowBy: 0.55 },
  ], correctAction: 'both', recenterAlonePassFraction: 0.68, bothPassFraction: 0.93 };
  const r5 = convert(bible);
  check('shift/narrowBy actions are owed as unrunnable',
    r5.owes.some(o => /`shift`\/`narrowBy`/.test(o)));
  check('and the owed sentence names the ids so nobody goes back to the bible for them',
    r5.owes.some(o => /`recenter`/.test(o) && /`independent_sample`/.test(o) && /`both`/.test(o)));
  check('and NOTHING invents an effect or an amount', !('actions' in r5.value));
  check('while the bounds, centre, spread and pass still come across',
    r5.value.centre === 6.2 && r5.value.spread === 0.5 && r5.value.pass === 0.995
    && r5.value.bounds.max === 7.7);
  check('and nothing writes correctAction or the stated pass fractions',
    !('correctAction' in r5.value) && !('bothPassFraction' in r5.value));

  const stub = full(); stub.bounds = { min: -1, max: 1, unit: 'decision units' };
  const r6 = convert(stub);
  check('the generated bounds unit is owed', r6.owes.some(o => /generated stub/.test(o)));
  check('and does not reach the board', !('unit' in r6.value.bounds));
  check('while an authored unit does', convert(full()).value.bounds.unit === 'degrees');

  // ------------------------------------------------------ authored boards
  const authored = () => ({
    bounds: { min: 5.3, max: 7.7, unit: 'degrees', label: 'entry flight path angle' },
    centre: 6.2, spread: 0.5, pass: 0.995,
    actions: [
      { id: 'recenter', label: 'Small targeting correction', effect: 'shift', amount: 1 },
      { id: 'track', label: 'Independent tracking pass', effect: 'narrow', amount: 0.7 },
    ],
  });
  const p = convertPayload(authored(), {});
  check('a complete authored board owes nothing', p.owes.length === 0);
  check('and carries its bounds, centre, spread, pass and actions',
    p.value.bounds.min === 5.3 && p.value.centre === 6.2 && p.value.spread === 0.5
    && p.value.pass === 0.995 && p.value.actions.length === 2);

  const passless = authored(); delete passless.pass;
  const p2 = convertPayload(passless, {});
  check('pulling the pass owes it and only it', p2.owes.length === 1 && /`pass`/.test(p2.owes[0]));
  check('and no pass is invented', !('pass' in p2.value));

  // The Trial's power board — the one genuine scatter, and what it does not say.
  const trial = {
    settings: [
      { id: 'n200', n: 200, center: 0.004, spread: 0.0031, power: 0.52 },
      { id: 'n240', n: 240, center: 0.004, spread: 0.0028, power: 0.60 },
      { id: 'n280', n: 280, center: 0.004, spread: 0.0026, power: 0.67 },
      { id: 'n320', n: 320, center: 0.004, spread: 0.0024, power: 0.73 },
    ],
    fixed: { alpha: 0.025, effect: 0.004, variance_assumption: 'unchanged' },
    corridor: 'harm boundary',
    correct_conclusion: 'larger n narrows spread and raises power without moving center',
    answerText: 'Increasing n from 200 to 320 narrows the sampling cloud and raises power.',
  };
  const t = convertPayload(structuredClone(trial), {});
  check('one centre written into every setting is still one centre', t.value.centre === 0.004);
  check('and the widest first setting is where the cloud starts', t.value.spread === 0.0031);
  check('a corridor with a name and no numbers is owed as bounds',
    t.owes.some(o => /the corridor is named "harm boundary"/.test(o)));
  check('and no bounds are invented', !('min' in t.value.bounds) && !('max' in t.value.bounds));
  check('the pass fraction is owed', t.owes.some(o => /no `pass`/.test(o)));
  check('the levers are owed', t.owes.some(o => /no `actions`/.test(o)));
  check('and the conclusion and answer text reach nothing',
    !('correct_conclusion' in t.value) && !('answerText' in t.value));
  check('a board that is a scatter missing its corridor is not also called a settings board',
    !t.owes.some(o => /settings-and-readings/.test(o)));
  check('while one with no centre or spread is', convertPayload({
    bins: [{ age: '0-14', count: 28 }, { age: '15-44', count: 62 }, { age: '45-64', count: 91 }],
    correct: 'declining', shape: 'top_heavy',
  }, {}).owes.some(o => /settings-and-readings/.test(o) && /age 0-14, count 28/.test(o)));

  // THE PAIR. The same four spreads, one run narrowing from the first and one
  // not. Only the first says where the cloud starts, and the other has to owe it
  // rather than take 0.0024 because it happened to be listed first. Verified by
  // putting the bug back — taking `sp[0]` unguarded — and watching this pair, and
  // only this pair, fail.
  const rising = structuredClone(trial);
  rising.settings = [...trial.settings].reverse();
  const r = convertPayload(rising, {});
  check('a run that does not start at the widest owes its spread',
    r.owes.some(o => /nothing says which one the cloud starts at/.test(o)));
  check('and takes none of them', !('spread' in r.value));
  check('while the run that does narrow takes the first', t.value.spread === 0.0031);

  // Eleven Days' settings board: controls with an id, a label and no physics.
  const eleven = convertPayload({
    initial_solutions: 240,
    points: [
      { id: 'propagate_all', setting: 'all weighted solutions', reading: '240 propagated paths' },
      { id: 'measure_intersection', setting: 'weighted Earth intersection',
        reading: '3.2 percent impact fraction' },
    ],
    controls: [
      { id: 'propagate', label: 'Propagate all weighted solutions to encounter' },
      { id: 'nominal_only', label: 'Use nominal solution only', trap: true },
    ],
    earth_effective_radius_km: 7240,
    weighted_impact_fraction: 0.032,
    correct_conclusion: 'continuous_monitoring',
  }, {});
  check('controls with no effect or amount are named back, never translated',
    eleven.owes.some(o => /`propagate`/.test(o) && /`nominal_only`/.test(o) && /no\s+`effect/.test(o)));
  check('and nothing invents an action', !('actions' in eleven.value));
  check('and a lever flagged as the trap does not become one',
    JSON.stringify(eleven.value).indexOf('trap') < 0);
  check('the numbers the board does hold are quoted back',
    eleven.owes.some(o => /`weighted_impact_fraction` 0.032/.test(o)
      && /`earth_effective_radius_km` 7240/.test(o)
      && /reads 3.2 percent impact fraction/.test(o)));
  check('and none of them is written into a field it does not name',
    !('centre' in eleven.value) && !('spread' in eleven.value) && !('pass' in eleven.value));

  const tail = authored(); tail._trailing = 'update reveals 4.235 m';
  check('prose after the board is never dropped',
    convertPayload(tail, {}).owes.some(o => /4\.235 m/.test(o)));

  console.log(bad ? `cloud: ${bad} selftest case(s) failed.`
                  : 'cloud: an action the panel cannot run is owed, never translated.');
  return bad;
}

if(process.argv[1] && process.argv[1].endsWith('cloud.mjs')){
  if(process.argv.includes('--selftest')) process.exit(selftest() ? 1 : 0);
}
