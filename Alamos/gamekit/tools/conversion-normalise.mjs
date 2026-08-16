// conversion-normalise.mjs — move a returned conversion block onto the real
// schema, and check the trap that cannot be renamed into correctness.
//
// Shared by `check-conversions.mjs` (report) and `apply-conversions.mjs` (write),
// because a normalisation that differs between the two is a tool that says a row
// is fine and then writes something else.
//
// Every rename in here was observed in a returned sheet, not imagined. The sheet
// is written from a prose description of each format by something with no access
// to the engine, and what that reliably produces is correct arithmetic under
// slightly different names: `budget` for `checks`, `protectedItems` for a flag,
// `readout.changed` for a response. Absorbing that here is cheaper than
// re-briefing, and it is checkable. Inventing a missing quantity is NOT done
// here — a row that is short of data fails its trap and stays failed.

const num = (v) => Number.isFinite(+v);

/** Φ(z), Abramowitz and Stegun 7.1.26 — the same approximation the panel uses. */
const phi = (z) => {
  const s = z < 0 ? -1 : 1, x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
    - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return 0.5 * (1 + s * y);
};
/** The fraction of a normal cloud inside a corridor. */
const inside = (centre, spread, lo, hi) =>
  phi(((num(hi) ? +hi : Infinity) - centre) / spread)
  - phi(((num(lo) ? +lo : -Infinity) - centre) / spread);

export const BLOCK = { TRIGGER: 'trigger', VALUE: 'value', CLOUD: 'cloud',
  ALLOCATE: 'allocate', TRACE: 'trace', ATTEST: 'attest', CONTROL: 'control',
  TRIANGULATE: 'triangulate', DEGENERACY: 'degeneracy', CHAIN: 'chain',
  BALANCE: 'balance', VERIFY: 'verify', PROPAGATE: 'propagate', STRESS: 'stress',
  DELEGATE: 'delegate', FLY: 'fly', RESIDUAL: 'residual', INJECT: 'inject',
  ROUTE: 'route' };

/** The eight screens a stop may be retyped to, which carry no block of their own. */
export const SCREEN = new Set(['CHOICE', 'PROTOCOL', 'SEQUENCE', 'BALLPARK',
  'SCIENCETANK', 'DIAGNOSIS', 'TRIAGE', 'CASEBOOK']);

/**
 * What format a returned row says the stop should become.
 *
 * The sheet asks for `format`, and a sheet came back keyed `to` with `from`
 * beside it — a perfectly reasonable way to write a conversion and one nothing
 * read. The checker treated the missing `format` as a retype and crashed on it;
 * the applier treated it as no conversion at all and quietly wrote the row's
 * prose while dropping every block. Silence was much the worse of the two.
 *
 * @returns {{ fmt: string, via: string|null }} `via` names the field it came
 *   from when that was not `format`, so a caller can say so.
 */
export function targetFormat(row = {}){
  for(const f of ['format', 'to', 'newFormat', 'convertTo', 'toFormat', 'targetFormat']){
    const v = String(row[f] ?? '').toUpperCase().replace(/[\s_-]+/g, '');
    if(v) return { fmt: v, via: f === 'format' ? null : f };
  }
  return { fmt: '', via: null };
}

/** Is this a format anything downstream knows how to build? */
export const known = (fmt) => !!BLOCK[fmt] || SCREEN.has(fmt);

/** What each of the eight screens cannot be built without. */
const SCREEN_NEEDS = {
  CHOICE: ['choices'],
  TRIAGE: ['choices'],
  CASEBOOK: ['choices'],
  DIAGNOSIS: ['choices'],
  PROTOCOL: ['scenarios', 'choices'],
  SEQUENCE: ['cards'],
  BALLPARK: ['estimate'],
  SCIENCETANK: ['proposals'],
};

/**
 * What a retype to a reading screen is still missing.
 *
 * "A retype needs nothing extra" is only true of `CHOICE`, where the options are
 * already on the stop. A `PROTOCOL` retyped to `BALLPARK` has scenarios and no
 * estimate, and nothing can invent one — it has now been returned twice, been
 * reported green by the checker both times, and been refused by the importer
 * both times, which is the worst order for those two things to happen in.
 *
 * @param fmt   the screen being retyped to
 * @param row   the returned row, whose `text` may carry the new data
 * @param was   the same stop as exported, whose `text` says what it already has
 */
export function screenGap(fmt, row = {}, was = {}){
  const have = { ...(was.text ?? {}), ...(row.text ?? {}) };
  const there = (k) => {
    const v = have[k];
    return Array.isArray(v) ? v.length > 0 : !!v && typeof v === 'object';
  };
  const gap = (SCREEN_NEEDS[fmt] ?? []).filter(k => !there(k));
  // An estimate can be present and still be prose. `labels` and a worked
  // `solution` read like a finished block and carry no arithmetic the panel can
  // run: the tiles have no values behind them, and nothing says what counts as
  // right. The importer's own test is a target or some values, so use it here
  // rather than a second opinion about it.
  if(fmt === 'BALLPARK' && !gap.length){
    const e = have.estimate ?? {};
    const missing = [];
    if(!(e.values ?? []).length) missing.push('estimate.values');
    if(!Number.isFinite(+e.target)) missing.push('estimate.target');
    if(!(e.correct ?? []).length) missing.push('estimate.correct');
    if((e.labels ?? []).length && (e.values ?? []).length
       && e.labels.length !== e.values.length) missing.push('estimate.labels and values of equal length');
    if(missing.length) gap.push(...missing);
  }
  return gap;
}

/**
 * @returns {{ block: object, did: string[], dropped: string[] }}
 *   `did` is what was renamed, `dropped` is what had nowhere to go.
 */
export function normalise(fmt, data, row = {}){
  const b = JSON.parse(JSON.stringify(data ?? {}));
  const did = [], dropped = [];

  if(fmt === 'ATTEST'){
    // A verification budget arrives as `budget: {amount}` about half the time,
    // because every other format on the sheet spends a budget.
    if(b.checks === undefined && num(b.budget?.amount)){
      b.checks = +b.budget.amount; delete b.budget;
      did.push('budget.amount -> checks');
    }
    let renamed = 0;
    for(const c of b.claims ?? []){
      for(const k of ['verification', 'backing', 'finding', 'check', 'whatVerificationShows']){
        if(c.evidence === undefined && c[k] !== undefined){
          c.evidence = c[k]; delete c[k]; renamed++; break;
        }
      }
      if(c.signedBy === undefined && c.signed_by !== undefined){
        c.signedBy = c.signed_by; delete c.signed_by;
      }
    }
    if(renamed) did.push('claims[].verification -> evidence');
  }

  if(fmt === 'ALLOCATE'){
    // Protection is a flag on the item, not a second list — and a second list
    // produces items the pool arithmetic never sees.
    if(Array.isArray(b.protectedItems)){
      // A protected item is one the plan may not spend on at all, so it is
      // usually written with a reason and no price. Left without one it makes
      // the pool arithmetic NaN, and a stop that cannot be answered right.
      b.items = [...b.protectedItems.map(i => ({ cost: 0, ...i, protected: true })),
        ...(b.items ?? [])];
      delete b.protectedItems;
      did.push('protectedItems -> items[].protected');
    }
    for(const i of b.items ?? []){
      if(i.protected && !num(i.cost)){ i.cost = 0; did.push(`"${i.label}" protected, so it costs nothing to leave alone`); }
    }
    // The dependency written the other way up: each *item* lists the questions
    // it would answer, rather than each answer listing the items it needs. Same
    // graph, read from the other end, and with nothing on `requires` every
    // required answer looks satisfied by an empty set.
    if((b.answers ?? []).every(a => !(a.requires ?? []).length)
       && (b.items ?? []).some(i => Array.isArray(i.answers))){
      const enables = new Map();
      for(const i of b.items ?? []){
        for(const q of i.answers ?? []){
          enables.set(String(q), [...(enables.get(String(q)) ?? []), String(i.id)]);
        }
      }
      // Two items naming the same answer means either of them will do, and
      // `requires` means all of them. Reading an OR as an AND would make a plan
      // cost double, so leave that shape alone and let it fail honestly.
      if([...enables.values()].every(v => v.length === 1)){
        for(const a of b.answers ?? []){
          const from = enables.get(String(a.id));
          if(from) a.requires = from;
        }
        for(const i of b.items ?? []) delete i.answers;
        did.push('items[].answers -> answers[].requires');
      }
    }
    // A board whose items are *rates* and whose answers ask for hours of each:
    // the cost of putting an item in the plan is its rate times the longest run
    // any answer asks of it. The engine has no partial quantities — an item is
    // in the plan or it is not — so without this every item costs nothing and
    // the whole board is free.
    if((b.items ?? []).some(i => num(i.rate)) && !(b.items ?? []).some(i => num(i.cost))){
      const want = new Map();
      for(const a of b.answers ?? []){
        if(a.requires && !Array.isArray(a.requires) && typeof a.requires === 'object'){
          for(const [id, hrs] of Object.entries(a.requires)){
            if(num(hrs)) want.set(String(id), Math.max(want.get(String(id)) ?? 0, +hrs));
          }
        }
      }
      let priced = 0;
      for(const i of b.items ?? []){
        const hrs = want.get(String(i.id)) ?? +i.hours ?? +i.maxHours;
        if(num(i.rate) && num(hrs)){ i.cost = +(+i.rate * +hrs).toFixed(3); priced++; }
      }
      if(priced) did.push('items[].rate × the hours an answer asks of it -> cost');
    }
    let renamed = 0, requant = 0;
    for(const a of b.answers ?? []){
      if(a.question === undefined && a.label !== undefined){
        a.question = a.label; delete a.label; renamed++;
      }
      // `requires` as a map of item -> how much of it, which is the natural way
      // to write the integrated variant ("this answer needs 62 hours of life
      // support"). The engine has no partial quantities — an item is in the plan
      // or it is not — so the keys are what it can use.
      if(a.requires && !Array.isArray(a.requires) && typeof a.requires === 'object'){
        a.requires = Object.keys(a.requires); requant++;
      }
      if(a.requires !== undefined && !Array.isArray(a.requires)){
        a.requires = [String(a.requires)];
      }
      delete a.id;                       // answers are keyed by their text
    }
    if(renamed) did.push('answers[].label -> question');
    if(requant) did.push('answers[].requires{item: amount} -> the item ids');
  }

  if(fmt === 'CONTROL'){
    // The full experiment table: a baseline written as the state of every
    // control *plus* the reading that state produces, and one row per run
    // saying what was set and what came out. It is a better description of a
    // bench than the engine's own, and it has to be read before the branches
    // below, which would otherwise pick the first number they found in the
    // baseline map — a current in amps — and call it the reading.
    if(Array.isArray(b.results) && b.baseline && typeof b.baseline === 'object'
       && b.response === undefined){
      const rk = ['response', 'reading', 'readout', 'value', 'result']
        .find(k => num(b.baseline[k]));
      const state = (o) => Object.fromEntries(Object.entries(o ?? {})
        .filter(([k]) => k !== rk && k !== 'unit' && k !== 'label'));
      const base = state(b.baseline);
      if(rk && Object.keys(base).length){
        const suspect = String(b.suspect ?? b.truth ?? '');
        // The run that moved exactly one control, and moved the suspect.
        const moved = (row) => Object.keys(base).filter(k => row.set?.[k] !== undefined
          && String(row.set[k]) !== String(base[k]));
        const hit = b.results.map(r2 => ({ r2, ch: moved(r2) }))
          .filter(x => x.ch.length === 1 && num(x.r2.response))
          .find(x => (suspect ? x.ch[0] === suspect : true));
        if(hit){
          if(!b.observable) b.observable = { label: b.baseline.label ?? 'Reading',
            unit: b.baseline.unit ?? '' };
          b.response = +hit.r2.response - +b.baseline[rk];
          if(b.truth === undefined) b.truth = hit.ch[0];
          b.baseline = +b.baseline[rk];
          delete b.results;
          did.push('baseline state + results[] -> baseline + response + truth');
        }
      }
    }
    // A reading per variable rather than a difference: what the instrument said
    // while that one factor was changed. The engine wants the change, and the
    // subtraction is the same fact written the other way round — not a number
    // this invents.
    if(Array.isArray(b.variables) && b.response === undefined
       && b.variables.some(v => num(v.reading))){
      const base = num(b.baseline) ? +b.baseline
        : (b.baseline && num(b.baseline.value) ? +b.baseline.value : null);
      const suspect = String(b.suspect ?? b.truth ?? '');
      const hit = b.variables.find(v => String(v.id) === suspect)
        ?? b.variables.reduce((a2, v) =>
             (Math.abs(+v.reading - base) > Math.abs(+a2.reading - base) ? v : a2), b.variables[0]);
      if(base !== null && hit && num(hit.reading)){
        b.response = +hit.reading - base;
        if(b.truth === undefined) b.truth = hit.id;
        for(const v of b.variables){ delete v.reading; delete v.returnReading; }
        did.push('variables[].reading -> response + truth, against the baseline');
      }
    }
    // Baseline and noise as objects with a unit beside them, which is how
    // anybody writing a lab bench would put it.
    if(b.baseline && typeof b.baseline === 'object' && !num(b.baseline.value)){
      // `{ receivedPowerDbRelative: -12 }` — the quantity named by the key.
      const k = Object.keys(b.baseline).find(x => num(b.baseline[x]));
      if(k){
        if(!b.observable) b.observable = { label: k.replace(/([A-Z])/g, ' $1').toLowerCase().trim(), unit: '' };
        b.baseline = +b.baseline[k];
        did.push('baseline{<quantity>} -> baseline + observable');
      }
    }
    if(Array.isArray(b.variables) && b.response === undefined){
      const key = ['responseDb', 'response', 'delta', 'change']
        .find(k => b.variables.some(v => num(v[k])));
      if(key){
        const suspect = b.suspect ?? b.truth;
        const hit = b.variables.find(v => String(v.id) === String(suspect))
          ?? b.variables.reduce((a2, v) => (Math.abs(+v[key] || 0) > Math.abs(+a2[key] || 0) ? v : a2), b.variables[0]);
        if(hit && num(hit[key])){
          b.response = +hit[key];
          if(b.truth === undefined) b.truth = hit.id;
          did.push(`variables[].${key} -> response + truth`);
        }
        for(const v of b.variables) for(const k of ['responseDb','response','delta','change','from','to']) delete v[k];
      }
    }
    if(b.baseline && typeof b.baseline === 'object' && num(b.baseline.value)){
      if(!b.observable) b.observable = { label: b.baseline.label ?? 'Reading', unit: b.baseline.unit ?? '' };
      b.baseline = +b.baseline.value;
      did.push('baseline{value,unit} -> baseline + observable');
    }
    if(b.noise && typeof b.noise === 'object' && num(b.noise.value)){
      b.noise = +b.noise.value; did.push('noise{value} -> noise');
    }
    // A result per control — what the reading becomes when that one is changed —
    // rather than one shared response. It is the better model of the two: the
    // engine only knows "the suspect moves it by this much", and the table says
    // the same thing plus the fact that the others move it by nothing.
    if(Array.isArray(b.controls) && b.controls.some(c => num(c.result)) && b.response === undefined){
      const suspect = b.suspect ?? b.truth;
      const hit = b.controls.find(c => String(c.id) === String(suspect))
        ?? b.controls.reduce((a, c) => (Math.abs(+c.result - +b.baseline) > Math.abs(+a.result - +b.baseline) ? c : a),
             b.controls[0]);
      if(hit && num(hit.result) && num(b.baseline)){
        b.response = +hit.result - +b.baseline;
        if(b.truth === undefined) b.truth = hit.id;
        did.push('controls[].result -> response + truth');
      }
    }
    if(b.truth === undefined && b.suspect !== undefined){
      b.truth = b.suspect; did.push('suspect -> truth');
    }
    delete b.suspect;
    // The richest near-miss: the sheet models the *experiment* — controls with
    // states, a readout, an explicit reversal — where the engine models the
    // *measurement*: variables, a baseline, and the response to changing one.
    // Everything needed is present under other names.
    if(!b.variables && Array.isArray(b.controls)){
      b.variables = b.controls.map(c => ({ id: c.id, label: c.label }));
      const held = b.controls.filter(c => c.locked).map(c => c.label);
      if(held.length && !b.held) b.held = held;
      const suspect = b.controls.find(c => c.suspect);
      if(suspect && b.truth === undefined) b.truth = suspect.id;
      delete b.controls;
      did.push('controls -> variables + held + truth');
    }
    if(b.readout){
      if(b.observable === undefined){
        b.observable = { label: b.readout.label ?? 'Reading', unit: b.readout.unit ?? '' };
      }
      if(b.baseline === undefined && num(b.readout.baseline)) b.baseline = +b.readout.baseline;
      if(b.noise === undefined && num(b.readout.noise)) b.noise = +b.readout.noise;
      // The engine wants the difference, which is what it actually measures.
      if(b.response === undefined && num(b.readout.changed) && num(b.baseline)){
        b.response = +b.readout.changed - +b.baseline;
      }
      delete b.readout;
      did.push('readout -> observable + baseline + response + noise');
    }
    // The engine requires a reversal to enable its commit, so an authored block
    // describing one carries no extra information.
    if(b.reversal){ delete b.reversal; did.push('reversal dropped — the engine requires one anyway'); }
    if(b.independentCheck){
      dropped.push('independentCheck — no field for it; its content belongs in `why`');
      delete b.independentCheck;
    }
  }

  if(fmt === 'ROUTE'){
    if(!b.stops && Array.isArray(b.compartments)){
      b.stops = b.compartments; delete b.compartments; did.push('compartments -> stops');
    }
    for(const alt of ['route', 'path', 'sequence']){
      if(!b.order && Array.isArray(b[alt])){
        b.order = b[alt]; delete b[alt]; did.push(`${alt} -> order`); break;
      }
    }
    // The interruption written as the door that is shut rather than as how far
    // along the route it happens. The route already says how far that is.
    if(b.interruptAfter === undefined && b.blockedDoor?.from !== undefined
       && Array.isArray(b.order)){
      const at = b.order.map(String).indexOf(String(b.blockedDoor.from));
      if(at >= 0){ b.interruptAfter = at; did.push('blockedDoor.from -> interruptAfter'); }
    }
    for(const alt of ['detourDropsAt', 'resumesAt', 'rejoinAt']){
      if(b.resumeAt === undefined && b[alt] !== undefined){
        b.resumeAt = b[alt]; delete b[alt]; did.push(`${alt} -> resumeAt`); break;
      }
    }
    // The detour as the compartments walked through: where it puts you is its
    // last one.
    if(b.resumeAt === undefined && Array.isArray(b.detour) && b.detour.length){
      b.resumeAt = b.detour[b.detour.length - 1];
      did.push('detour[] -> resumeAt, its last compartment');
    }
    // The bank the player rebuilds is every compartment, so a compartment that
    // is not on the route is one they are asked to place and have nowhere to
    // put. A detour-only compartment is exactly that: the interruption is
    // carried by `interruptAfter` and `resumeAt`, which need no room of their
    // own.
    if(Array.isArray(b.order) && Array.isArray(b.stops)){
      const on = new Set(b.order.map(String));
      const off = b.stops.filter(x => !on.has(String(x.id)));
      if(off.length && b.stops.length - off.length >= 5){
        b.stops = b.stops.filter(x => on.has(String(x.id)));
        dropped.push(`${off.map(x => `"${x.label ?? x.id}"`).join(', ')} — not on the route, and`
          + ' the player is asked to place every compartment in the bank');
      }
    }
    delete b.blockedDoor; delete b.detour;
  }

  if(fmt === 'STRESS'){
    const a5 = b.assumption ?? {};
    if(Array.isArray(a5.range) && a5.range.length === 2 && a5.range.every(num)){
      a5.min = Math.min(...a5.range.map(Number));
      a5.max = Math.max(...a5.range.map(Number));
      delete a5.range; did.push('assumption.range -> min + max');
    }
    if(num(a5.pessimistic) && !num(a5.min)) a5.min = +a5.pessimistic;
    delete a5.pessimistic;
    if(!num(a5.nominal) && num(a5.min) && num(a5.max)) a5.nominal = (+a5.min + +a5.max) / 2;
    // A slider with no step is a slider that cannot be moved. Forty positions
    // across the range, rounded to something a reader would write down.
    if(!num(a5.step) && num(a5.min) && num(a5.max)){
      const span = Math.abs(+a5.max - +a5.min) || 1;
      const raw = span / 40;
      a5.step = +(raw >= 1 ? Math.max(1, Math.round(raw))
        : +raw.toPrecision(1));
      did.push('assumption.step assumed as a fortieth of the range');
    }
    // `feasible` and the criterion columns written on each candidate rather than
    // as two maps beside them. Same numbers, one row per candidate, and the row
    // is the easier thing to write without losing an id.
    const crits = (b.criteria ?? []).map(c => String(c.key ?? c.id ?? '')).filter(Boolean);
    for(const c of b.criteria ?? []) if(c.key === undefined && c.id !== undefined) c.key = c.id;
    if(!b.feasible && (b.candidates ?? []).some(c => num(c.feasible))){
      b.feasible = Object.fromEntries((b.candidates ?? [])
        .filter(c => num(c.feasible)).map(c => [String(c.id), +c.feasible]));
      for(const c of b.candidates ?? []) delete c.feasible;
      did.push('candidates[].feasible -> feasible');
    }
    if(!b.scores && crits.length && (b.candidates ?? []).some(c => crits.some(k => num(c[k])))){
      b.scores = Object.fromEntries((b.candidates ?? []).map(c =>
        [String(c.id), Object.fromEntries(crits.filter(k => c[k] !== undefined)
          .map(k => [k, c[k]]))]));
      for(const c of b.candidates ?? []) for(const k of crits) delete c[k];
      did.push('candidates[].<criterion> -> scores');
    }
    if(b.robust === undefined && b.survivor !== undefined){
      b.robust = b.survivor; did.push('survivor -> robust');
    }
    delete b.survivor;
  }

  if(fmt === 'FLY'){
    // The manoeuvre written in the units it is flown in, with the axis named in
    // every key. The engine is axis-agnostic — degrees, metres or radians all
    // work — so the suffix carries no information it needs.
    const take = (to, ...from) => {
      if(b[to] !== undefined) return;
      const k = from.find(f => num(b[f]));
      if(k !== undefined){ b[to] = +b[k]; delete b[k]; did.push(`${k} -> ${to}`); }
    };
    take('target', 'targetAngleDeg', 'targetAngle', 'targetValue');
    take('accel', 'angularAccelerationDegPerSec2', 'angularAcceleration', 'acceleration');
    take('tolerance', 'angleToleranceDeg', 'angleTolerance');
    take('rateTolerance', 'rateToleranceDegPerSec', 'rateTol');
    take('start', 'startAngleDeg', 'startAngle');
    take('startRate', 'startRateDegPerSec');
    if(!b.pulse && Array.isArray(b.pulseSeconds) && b.pulseSeconds.length){
      const ps = b.pulseSeconds.map(Number).sort((x, y) => x - y);
      const step = ps.length > 1 ? ps[1] - ps[0] : 1;
      b.pulse = { min: ps[0], max: ps[ps.length - 1], step, unit: 's' };
      delete b.pulseSeconds;
      did.push('pulseSeconds[] -> pulse{min, max, step}');
    }
    // Fuel is burn seconds, and a slew spends the same again stopping. With no
    // budget stated, the longest manoeuvre the panel offers is what it must be
    // able to afford — anything less would put an option on the panel that
    // cannot be flown, which is a different lesson from the one FLY teaches.
    if(!num(b.budget) && num(b.pulse?.max)){
      b.budget = 2 * +b.pulse.max;
      did.push('budget assumed as twice the longest pulse offered — enough to fly any option');
    }
    for(const alt of ['brakePointDeg', 'brakePoint', 'brakeAngle']){
      if(!b.brake && b[alt] && typeof b[alt] === 'object'){
        b.brake = b[alt]; delete b[alt]; did.push(`${alt} -> brake`); break;
      }
    }
    if(b.brake && !num(b.brake.step)) b.brake.step = 1;
    delete b.referenceExample; delete b.lateBrakeExample;
  }

  if(fmt === 'VERIFY'){
    // The truth as a measurement with its unit, which is what it is.
    if(b.truth && typeof b.truth === 'object' && num(b.truth.value)){
      if(!b.unit && b.truth.unit) b.unit = b.truth.unit;
      b.truth = +b.truth.value;
      did.push('truth{value, unit} -> truth');
    }
    if(!b.measurements && Array.isArray(b.checksAvailable)){
      b.measurements = b.checksAvailable; delete b.checksAvailable;
      did.push('checksAvailable -> measurements');
    }
  }

  if(fmt === 'TRACE'){
    if(!b.resources && Array.isArray(b.sources)){
      b.resources = b.sources.map(x => (typeof x === 'string'
        ? { id: x.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 24), label: x }
        : x));
      delete b.sources; did.push('sources -> resources');
    }
    // `target` written as the question rather than as the id of the shared
    // source. Where a `sharedSource` is named, that is the target.
    for(const k of ['sharedSource', 'faultSource', 'commonSource']){
      if(b[k] !== undefined){ b.target = b[k]; delete b[k]; did.push(`${k} -> target`); break; }
    }
    // The channels that survive, flagged on the channels themselves rather than
    // listed once. Read *before* any keep-list, because a flag on the channel
    // cannot name a channel that is not there and cannot drift from the
    // dependency graph beside it.
    if(!b.independent && (b.channels ?? []).some(c => c.independent)){
      b.independent = b.channels.filter(c => c.independent).map(c => c.id);
      did.push('channels[].independent -> independent');
    }
    for(const c of b.channels ?? []) delete c.independent;
    for(const k of ['keep', 'correctKeep', 'stillStands', 'independentChannels']){
      if(!b.independent && Array.isArray(b[k])){
        b.independent = b[k]; did.push(`${k} -> independent`); break;
      }
    }
    for(const k of ['keep', 'correctKeep', 'stillStands', 'independentChannels']) delete b[k];
    for(const c of b.channels ?? []){
      for(const k of ['depends_on', 'dependsOn', 'computedFrom']){
        if(!c.dependencies && !c.depends && Array.isArray(c[k])){ c.dependencies = c[k]; delete c[k]; }
      }
      if(c.reading === undefined && String(c.claim ?? '').trim()) c.reading = c.claim;
    }
    const idOf = (label) => {
      const hit = (b.resources ?? []).find(r =>
        String(r.label).toLowerCase() === String(label).toLowerCase()
        || String(r.id).toLowerCase() === String(label).toLowerCase());
      return hit ? hit.id : null;
    };
    let mapped = 0, added = 0;
    // Register anything a channel depends on that the source list forgot.
    for(const c of b.channels ?? []){
      for(const d of (c.dependencies ?? c.depends ?? [])){
        if(idOf(d)) continue;
        (b.resources ??= []).push({
          id: String(d).toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 24), label: String(d) });
        added++;
      }
    }
    if(added) did.push(`${added} dependency name(s) registered as resources`);
    for(const c of b.channels ?? []){
      // A reading written as observed-against-expected, which is how the
      // diagnosis panels this usually comes from are written.
      if(c.reading === undefined && (c.observed !== undefined || c.reference !== undefined)){
        c.reading = [c.observed, c.reference && `(expected ${c.reference})`]
          .filter(Boolean).join(' ');
        delete c.observed; delete c.reference;
      }
      if(!c.depends && Array.isArray(c.dependencies)){
        // Dependencies named in prose against a resource list.
        c.depends = c.dependencies.map(d => idOf(d) ?? d);
        delete c.dependencies; mapped++;
      }
    }
    if(mapped) did.push('channels[].dependencies -> depends');
    // If the target still is not a resource id but names one, resolve it.
    if(b.target !== undefined && !(b.resources ?? []).some(r => String(r.id) === String(b.target))){
      const hit = idOf(b.target);
      if(hit){ b.target = hit; did.push('target resolved to a resource id'); }
    }
  }

  if(fmt === 'CHAIN'){
    // `elements` / `correctOrder` / `governingLink` is the natural English for
    // this and arrives about as often as the schema's own names.
    if(!b.links && Array.isArray(b.elements)){
      b.links = b.elements.map(({ distractor, ...rest }) => rest);
      did.push('elements -> links');
    }
    for(const alt of ['correctOrder', 'path', 'sequence', 'chain']){
      if(!b.order && Array.isArray(b[alt])){
        b.order = b[alt]; delete b[alt]; did.push(`${alt} -> order`);
        break;
      }
    }
    if(b.governing === undefined && b.governingLink !== undefined){
      b.governing = b.governingLink; delete b.governingLink; did.push('governingLink -> governing');
    }
    delete b.elements;
  }

  if(fmt === 'DELEGATE'){
    if(!b.problems && Array.isArray(b.conditions)){
      b.problems = b.conditions; delete b.conditions; did.push('conditions -> problems');
    }
    // The roster. Three sheets in one round all wrote it `people`, which is the
    // obvious word for it — `team` is the schema's word and neither is better.
    if(!b.team && Array.isArray(b.people)){
      b.team = b.people; delete b.people; did.push('people -> team');
    }
    for(const alt of ['takeFirst', 'playerTakes', 'commandTakes',
      'keepYourself', 'keep', 'selfProblem', 'keepSelf', 'commandKeeps']){
      if(b.first === undefined && b[alt] !== undefined){
        b.first = b[alt]; delete b[alt]; did.push(`${alt} -> first`);
      }
    }
    if(!b.firstActions && Array.isArray(b.actions)){
      b.firstActions = b.actions; delete b.actions; did.push('actions -> firstActions');
    }
    for(const p2 of b.problems ?? []){
      // `rising: true` is the natural way to write it; the engine keeps a trend
      // word because "stable" and "falling" are different things to a reader.
      if(p2.trend === undefined && p2.rising !== undefined){
        p2.trend = p2.rising ? 'rising' : 'stable';
        delete p2.rising; delete p2.stable;
      }
      if(p2.loud === undefined && p2.alarming !== undefined) p2.loud = !!p2.alarming;
      if(p2.consequence === undefined && p2.effect) p2.consequence = p2.effect;
    }
    if((b.problems ?? []).some(p2 => p2.trend)) did.push('problems[].rising -> trend');
    // What command keeps is what nobody else can do. Where the block says which
    // problem the player takes and does not say why, that is the reason.
    if(b.first !== undefined && !(b.problems ?? []).some(p2 => p2.delegable === false)){
      for(const p2 of b.problems ?? []) p2.delegable = String(p2.id) !== String(b.first);
      did.push('first -> problems[].delegable');
    }
    // A team given as a headcount, with the people named per problem. The names
    // are present; only the roster is missing, and it is exactly the set of
    // owners the block already assigns.
    if(b.team && !Array.isArray(b.team)){
      const owners = [...new Set((b.problems ?? []).map(p2 => p2.owner).filter(Boolean))];
      b.team = owners.map(o => ({ id: o.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 24), label: o }));
      did.push('team headcount -> the owners the problems already name');
    }
    // The first actions are authored on each problem rather than as a shared
    // menu. The menu is their distinct set.
    if(!b.firstActions && (b.problems ?? []).some(p2 => p2.firstAction)){
      const acts = [...new Set((b.problems ?? []).map(p2 => p2.firstAction).filter(Boolean))];
      b.firstActions = acts.map((a, i) => ({ id: `a${i + 1}`, label: a }));
      did.push('problems[].firstAction -> a shared firstActions menu');
    }
  }

  if(fmt === 'DEGENERACY'){
    // A locus written with the controls' own names as keys — {gain, offset}
    // rather than {a, b} — which is how anybody describing the model would put
    // it, and unambiguous as long as there are exactly two controls.
    const ids = (b.controls ?? []).map(c => String(c.id));
    const pair = (o) => (o && typeof o === 'object' && ids.length === 2
      && o[ids[0]] !== undefined && o[ids[1]] !== undefined)
      ? { a: +o[ids[0]], b: +o[ids[1]] } : o;
    const pairList = (l) => Array.isArray(l) ? l.map(pair) : l;
    // The two loci, under every name a sheet has used for them. They are the
    // whole format — a first locus that is a *family* of answers and a second
    // measurement that cuts it down to one — so failing to read them reports a
    // complete block as having no second locus at all.
    for(const alt of ['primaryLocus', 'locus1', 'firstLocus', 'locusA']){
      if(!b.locus && Array.isArray(b[alt])){
        b.locus = pairList(b[alt]); delete b[alt]; did.push(`${alt} -> locus`); break;
      }
    }
    if(Array.isArray(b.locus)) b.locus = pairList(b.locus);
    for(const alt of ['secondaryLocus', 'locus2', 'secondLocus', 'locusB']){
      if(!b.second && Array.isArray(b[alt])){
        b.second = { label: b.secondary?.label ?? b.secondMeasurement?.label ?? 'Second measurement',
          locus: pairList(b[alt]) };
        delete b[alt]; did.push(`${alt} -> second.locus`); break;
      }
    }
    if(b.second?.locus) b.second.locus = pairList(b.second.locus);
    // What the first and second measurements *are*, written beside the loci.
    if(!b.observable && (b.firstMeasurement?.label || b.primary?.label)){
      b.observable = { label: b.firstMeasurement?.label ?? b.primary.label,
        ...(b.firstMeasurement?.unit ? { unit: b.firstMeasurement.unit } : {}) };
    }
    delete b.firstMeasurement; delete b.secondMeasurement;
    if(!b.observable && b.primary?.label){
      b.observable = { label: b.primary.label };
    }
    delete b.primary; delete b.secondary;
    if(b.tolerance === undefined && b.answerTolerance !== undefined){
      b.tolerance = b.answerTolerance; delete b.answerTolerance;
      did.push('answerTolerance -> tolerance');
    }
    b.truth = pair(b.truth);
    b.tolerance = pair(b.tolerance);
    // A control with no step is a slider that cannot be moved to the answer.
    // The step has to divide the distance from the minimum to the truth, or the
    // one position that is right is not one of the positions.
    const truthOf = (i) => (i === 0 ? +b.truth?.a : +b.truth?.b);
    (b.controls ?? []).forEach((c, i) => {
      if(num(c.step) || !num(c.min) || !num(c.max)) return;
      const t = truthOf(i);
      const reach = num(t) ? Math.abs(t - +c.min) : Math.abs(+c.max - +c.min);
      const raw = (reach || Math.abs(+c.max - +c.min)) / 40;
      const round1 = +(+raw).toPrecision(1);
      const fits = round1 > 0 && Math.abs(reach / round1 - Math.round(reach / round1)) < 1e-9;
      c.step = fits ? round1 : +(raw.toPrecision(6));
      did.push(`controls[${i}].step assumed as ${c.step} — the answer is reachable on it`);
    });
  }

  if(fmt === 'CLOUD'){
    if(b.initial && b.centre === undefined){
      if(num(b.initial.center)) b.centre = +b.initial.center;
      if(num(b.initial.centre)) b.centre = +b.initial.centre;
      // A width is the whole band, not one standard deviation — usually. Some
      // sheets mean sigma by it, and getting it wrong halves or doubles every
      // fraction on the panel, which is how a stop where re-centring alone must
      // fall short became one where it reaches 100 per cent. Where the sheet
      // shows its own working, that arithmetic settles which was meant.
      if(num(b.initial.width)) b.spread = +b.initial.width / 2;
      b.widthIsSigma = num(b.initial.width);
      if(num(b.initial.spread)) b.spread = +b.initial.spread;
      if(!b.bounds && b.initial.unit) b.bounds = { unit: b.initial.unit };
      delete b.initial;
      did.push('initial{center,width} -> centre + spread');
    }
    // A boundary given as a bare number with its direction beside it. Left as a
    // number it reached the one-sided branch below, which read `.value` off it,
    // got NaN, and wrote a corridor of NaN — past the checker, into the emitter,
    // which is where it finally stopped.
    if(num(b.boundary)){
      b.boundary = { value: +b.boundary,
        direction: b.direction ?? b.boundaryDirection ?? 'above',
        label: b.boundaryLabel ?? b.label ?? '' };
      delete b.direction; delete b.boundaryDirection; delete b.boundaryLabel;
      did.push('boundary + direction -> boundary{value, direction}');
    }
    // A boundary given as the corridor it already is.
    if(b.boundary && (num(b.boundary.lower) || num(b.boundary.upper))){
      b.bounds = { ...(b.bounds ?? {}),
        min: num(b.boundary.lower) ? +b.boundary.lower : -Infinity,
        max: num(b.boundary.upper) ? +b.boundary.upper : Infinity,
        label: b.boundary.label ?? b.bounds?.label ?? '' };
      delete b.boundary;
      did.push('boundary{lower, upper} -> bounds');
    }
    for(const k of ['passMark', 'passFraction']){
      if(b.pass === undefined && num(b[k])){ b.pass = +b[k]; delete b[k]; did.push(`${k} -> pass`); }
    }
    // Read before it is dropped: which reading of `width` reproduces the number
    // the sheet computed for the untouched cloud.
    const shown = ['initialInsideFraction', 'initialFraction', 'initialInside']
      .map(k => b.results?.[k]).find(num);
    if(num(shown) && b.widthIsSigma && num(b.centre) && num(b.spread)){
      const lo = num(b.boundary?.lower) ? +b.boundary.lower : b.bounds?.min;
      const hi = num(b.boundary?.upper) ? +b.boundary.upper : b.bounds?.max;
      if(num(lo) || num(hi)){
        const asBand = Math.abs(inside(+b.centre, +b.spread, lo, hi) - +shown);
        const asSigma = Math.abs(inside(+b.centre, +b.spread * 2, lo, hi) - +shown);
        if(asSigma < asBand){
          b.spread *= 2;
          did.push(`initial.width read as one sigma, not the whole band — it is what`
            + ` reproduces the sheet's own ${(+shown * 100).toFixed(1)}%`);
        }
      }
    }
    delete b.widthIsSigma;
    delete b.results;                 // the sheet's own arithmetic, recomputed here
    // A one-sided clearance — "the whole band has to stay above this" — is a
    // real thing the two-sided corridor could not say. Encoded as a corridor
    // whose far side is far enough away to be irrelevant, which is exactly what
    // the grading integral does with it.
    if(b.boundary && !num(b.bounds?.min)){
      const v = +b.boundary.value;
      const far = Math.max(Math.abs(v), Math.abs(+b.centre || 0)) + 6 * Math.abs(+b.spread || 1);
      const above = String(b.boundary.direction ?? 'above') === 'above';
      b.bounds = { ...(b.bounds ?? {}),
        min: above ? v : -far, max: above ? far : v,
        label: b.boundary.label ?? b.bounds?.label ?? '' };
      delete b.boundary;
      did.push(`boundary{${above ? 'above' : 'below'}} -> a one-sided corridor`);
    }
    // Actions written as what they do to the numbers rather than as an effect
    // and an amount: a new width, a multiplier, a shift of the centre.
    let recast = 0;
    for(const a of b.actions ?? []){
      // `effect: { centerDelta, widthDelta }` — the action written as what it
      // does to both numbers at once, which is how a sheet naturally describes
      // an experiment. The engine takes one effect and an amount, so unwrap it
      // into the fields the two branches below already understand. Read before
      // the `if (a.effect)` guard, which took the object as an already-correct
      // effect and left every action inert.
      if(a.effect && typeof a.effect === 'object'){
        const cd = +a.effect.centerDelta || 0, wd = +a.effect.widthDelta || 0;
        if(wd !== 0 && a.newWidth === undefined) a.newWidth = (+b.spread * 2) + wd;
        else if(cd !== 0 && a.centerShift === undefined) a.centerShift = cd;
        delete a.effect;
      }
      if(a.narrowBy !== undefined && a.newWidth === undefined){
        a.newWidth = (+b.spread * 2) - Math.abs(+a.narrowBy);
        delete a.narrowBy;
      }
      delete a.narrows; delete a.result;
      if(a.effect) continue;
      const w0 = +b.spread * 2;                       // the band the sheet described
      const mult = [a.widthMultiplier, a.widthScale, a.widthFactor].find(num);
      if(num(a.newWidth) && w0){ a.effect = 'narrow'; a.amount = +a.newWidth / w0; recast++; }
      else if(num(mult) && +mult !== 1){
        a.effect = 'narrow'; a.amount = +mult; recast++;
      } else if(num(a.centerShift) && +a.centerShift !== 0){
        // The engine's shift is a fraction of the way to the middle of the
        // corridor, not an absolute step; convert through the distance.
        const mid = ((+b.bounds?.min || 0) + (+b.bounds?.max || 0)) / 2;
        const gap = mid - +b.centre;
        a.effect = 'shift';
        a.amount = gap ? Math.max(0, Math.min(1, +a.centerShift / gap)) : 1;
        recast++;
      }
      delete a.newWidth; delete a.widthMultiplier; delete a.widthScale;
      delete a.widthFactor; delete a.centerShift;
    }
    if(recast) did.push('actions[] recast as effect + amount');
    if(b.pass === undefined && b.passRule !== undefined){
      const pr = b.passRule;
      const n = num(pr) ? +pr : +(pr?.fraction ?? pr?.value ?? NaN);
      if(num(n)) b.pass = n > 1 ? n / 100 : n;
      // A rule stated in prose is NOT converted to a fraction. The first attempt
      // guessed 95.4 per cent from "the whole band must clear it", and the guess
      // was close enough to be wrong: re-centring alone then cleared the bar, so
      // the stop taught that moving the dot works. `pass` is a number the sheet
      // has to supply.
      if(b.pass !== undefined){ delete b.passRule; did.push('passRule -> pass'); }
    }
  }

  if(fmt === 'VALUE'){
    // A budget as a bare number with its unit alongside.
    if(num(b.budget) && !Array.isArray(b.budget)){
      b.budget = { amount: +b.budget, unit: b.unit ?? '' };
      delete b.unit; did.push('budget + unit -> budget{amount, unit}');
    }
  }

  if(fmt === 'ALLOCATE'){
    for(const it of b.items ?? []){
      // rate × the hours it may run. The engine already understands this as the
      // integrated variant; only the field name for the hours differs.
      if(it.hours === undefined && num(it.maxHours)){ it.hours = +it.maxHours; delete it.maxHours; }
    }
    if((b.items ?? []).some(i => i.hours !== undefined)) did.push('items[].maxHours -> hours');
  }

  if(fmt === 'STRESS'){
    if(b.robust === undefined && b.pessimisticSurvivor !== undefined){
      b.robust = b.pessimisticSurvivor; delete b.pessimisticSurvivor;
      did.push('pessimisticSurvivor -> robust');
    }
    // Criteria written as rules rather than as a feasibility table: one of them
    // compares a candidate's own figure against the assumption, and the rest are
    // static minima a candidate either clears or does not.
    const cands = b.candidates ?? [];
    if(!b.feasible && cands.length && (b.criteria ?? []).length){
      const against = (b.criteria ?? []).find(c => /<=\s*assumption|>=\s*assumption|assumption/.test(String(c.type ?? '')));
      const field = against ? String(against.type).split(/[<>=]/)[0].trim() : null;
      const minima = (b.criteria ?? []).filter(c => num(c.minimum));
      const keyFor = (c, crit) => Object.keys(c).find(k =>
        k !== 'id' && k !== 'label' && k.toLowerCase().startsWith(String(crit.id ?? '').split('_')[0].toLowerCase()));
      b.feasible = {};
      for(const c of cands){
        const fails = minima.some(m => {
          const k = keyFor(c, m) ?? Object.keys(c).find(x => num(c[x]) && x !== field);
          return k && num(c[k]) && +c[k] < +m.minimum;
        });
        // "Never possible" and "always possible" have to be finite: the book is
        // YAML and the emitter refuses a non-finite number, correctly. Just
        // outside the assumption's own range says the same thing.
        const a2 = b.assumption ?? {};
        const never = (+a2.max || 0) + Math.abs(+a2.max || 1);
        const always = (+a2.min || 0) - Math.abs(+a2.min || 1);
        b.feasible[c.id] = fails ? never : (field && num(c[field]) ? +c[field] : always);
      }
      if(field) did.push(`criteria -> feasible, from ${field} and the fixed minima`);
    }
    if(!b.optimiseOn && b.nominalWinner !== undefined && cands.length){
      // The criterion the nominal winner wins on, found rather than assumed.
      const win = cands.find(c => String(c.id) === String(b.nominalWinner));
      const keys = Object.keys(win ?? {}).filter(k => num(win[k]));
      b.optimiseOn = keys.find(k => cands.every(c => +win[k] <= +c[k])) ?? keys[0];
      delete b.nominalWinner;
      if(b.optimiseOn) did.push(`nominalWinner -> optimiseOn: ${b.optimiseOn}`);
    }
    if(!b.scores && cands.length){
      b.scores = Object.fromEntries(cands.map(c => [c.id,
        Object.fromEntries(Object.entries(c).filter(([, v]) => num(v)))]));
    }
    for(const c of cands) for(const k of Object.keys(c)) if(k !== 'id' && k !== 'label') delete c[k];
  }

  if(fmt === 'VALUE' && !String(b.decision ?? '').trim()){
    b.decision = row.question ?? row.task ?? '';
    did.push('decision taken from the stop question');
  }

  if(fmt === 'INJECT'){
    if(!b.configs && Array.isArray(b.configurations)){
      b.configs = b.configurations; delete b.configurations; did.push('configurations -> configs');
    }
    for(const c of b.configs ?? []){
      for(const k of ['metricValue', 'recovery', 'score']){
        if(c.metric === undefined && num(c[k])){ c.metric = +c[k]; delete c[k]; break; }
      }
      if(c.detections === undefined && num(c.recovered)) c.detections = +c.recovered;
    }
  }

  if(fmt === 'TRIGGER'){
    if(!b.conditions && Array.isArray(b.stages)){
      b.conditions = b.stages; delete b.stages; did.push('stages -> conditions');
    }
    for(const c of b.conditions ?? []){
      if(c.leadHours === undefined && num(c.leadTimeDays)){
        c.leadHours = +c.leadTimeDays * 24; delete c.leadTimeDays;
      }
      // Lead written in the units the scene is paced in. A stream stamped in
      // steps rather than hours makes "one update of warning" the natural way
      // to say it, and one step is one hour once the stream is converted below.
      for(const k of ['leadTime', 'lead', 'leadUpdates', 'warningHours']){
        if(c.leadHours === undefined && num(c[k])){
          c.leadHours = +c[k]; delete c[k];
        }
      }
      delete c.threshold; delete c.direction;   // the player writes these
      delete c.correctThreshold; delete c.tolerance;
    }
    // A stream stamped with elapsed time rather than time remaining. The horizon
    // is its own last entry, which is the only reading that does not need a
    // number the sheet never gave.
    if(!b.stream && Array.isArray(b.updates)){
      b.stream = b.updates; did.push('updates -> stream');
    }
    delete b.updates;
    const st = b.stream ?? [];
    const stamp = ['t', 'step', 'index', 'reading'].find(k => st.length && st.every(x => num(x[k])));
    if(stamp && st.some(x => x.hoursLeft === undefined)){
      // A stream stamped with elapsed time rather than time remaining. The
      // horizon is its own last entry, which is the only reading that does not
      // need a number the sheet never gave. `t` counts days, a step counts
      // updates, and an update is an hour of warning.
      const last = Math.max(...st.map(x => +x[stamp]));
      const perUnit = stamp === 't' ? 24 : 1;
      for(const x of st){
        if(x.hoursLeft === undefined) x.hoursLeft = (last - +x[stamp]) * perUnit;
        if(x.at === undefined) x.at = stamp === 't' ? `day ${x[stamp]}` : `update ${x[stamp]}`;
        if(x.update === undefined) x.update = `${x.value}${b.scale?.unit ? ' ' + b.scale.unit : ''}`;
      }
      did.push(`stream[].${stamp} -> hoursLeft, counted back from the last update`);
    }
    if(b.conditions?.length) did.push(`${b.conditions.length} stage(s)`);
  }

  if(fmt === 'VERIFY'){
    if(!b.prediction && b.predictionRange){
      b.prediction = b.predictionRange; delete b.predictionRange;
      did.push('predictionRange -> prediction');
    }
    // A range given as a pair rather than as a control with a step on it.
    if(Array.isArray(b.prediction) && b.prediction.length === 2 && b.prediction.every(num)){
      const [lo, hi] = b.prediction.map(Number);
      b.prediction = { min: lo, max: hi, step: +((hi - lo) / 60).toPrecision(1),
        label: b.measurement?.label ?? '', unit: b.measurement?.unit ?? '' };
      did.push('prediction [min, max] -> a range with a step');
    }
    if(b.truth === undefined){
      for(const k of ['reference', 'measuredTruth', 'actual', 'measurement']){
        const v = b[k]?.truth ?? b[k]?.value ?? b[k];
        if(num(v)){ b.truth = +v; did.push(`${k} -> truth`); break; }
      }
    }
    if(b.prediction && typeof b.prediction === 'object'
       && num(b.prediction.min) && num(b.prediction.max) && !num(b.prediction.step)){
      b.prediction.step = +(((+b.prediction.max - +b.prediction.min) / 60).toPrecision(1));
      did.push('prediction.step assumed as a sixtieth of the range');
    }
    // The engine has one measurement — the thing the player can decline to take.
    // A sheet that offers several is offering a menu; the one that matters is
    // the one that reads the quantity the prediction was about.
    if(!b.measurement && Array.isArray(b.measurements) && b.measurements.length){
      const unit = String(b.prediction?.unit ?? b.unit ?? '').toLowerCase();
      const label = String(b.prediction?.label ?? '').toLowerCase();
      const words = label.split(/\W+/).filter(w => w.length > 3);
      const scores = b.measurements.map(m => {
        const t = `${m.label ?? ''} ${m.reveals ?? ''}`.toLowerCase();
        return (unit && t.includes(unit) ? 2 : 0) + words.filter(w => t.includes(w)).length;
      });
      const pick = scores.indexOf(Math.max(...scores));
      const m = b.measurements[pick];
      b.measurement = { label: m.label ?? 'The measurement',
        ...(m.reveals ? { note: String(m.reveals) } : {}),
        ...(num(m.cost) ? { cost: +m.cost } : {}),
        ...(m.costUnit ? { costUnit: m.costUnit } : {}) };
      if(b.measurements.length > 1){
        dropped.push(`measurements[] offered ${b.measurements.length} readings; the engine takes`
          + ` one, so "${b.measurement.label}" was kept as the one that reads the predicted`
          + ' quantity');
      }
      delete b.measurements;
      did.push('measurements[] -> the one measurement that can be skipped');
    }
    if(!b.intervention && b.action){ b.intervention = b.action; delete b.action; }
    if(!b.passRatio && Array.isArray(b.acceptedComparison)) b.passRatio = b.acceptedComparison;
    delete b.acceptedComparison;
    // A tolerance in the measured unit is not a ratio. Converted rather than
    // refused, because the intent is unambiguous.
    if(Array.isArray(b.passRatio) && b.passRatio.length === 2
       && num(b.truth) && +b.passRatio[0] > 1){
      const [lo, hi] = b.passRatio.map(Number);
      b.passRatio = [+(lo / +b.truth).toFixed(4), +(hi / +b.truth).toFixed(4)];
      did.push('passRatio converted from measured units to a ratio');
    }
  }

  // Empty strings and nulls the sheet emits for optional fields, which the
  // emitter would write as `null` and the importer would then reject.
  const prune = (o) => {
    for(const [k, v] of Object.entries(o)){
      if(v === null || v === '') delete o[k];
      else if(Array.isArray(v)) v.forEach(x => (x && typeof x === 'object') && prune(x));
      else if(typeof v === 'object') prune(v);
    }
  };
  prune(b);
  return { block: b, did, dropped };
}

/**
 * Required fields the importer will insist on, which the trap check does not see.
 *
 * The trap asks whether the pedagogy is in there. This asks whether the row is
 * even well-formed — and the two come apart: a CHAIN can have the right
 * governing link and the right decoy and still be missing `transfers` on every
 * one of them, which the trap has no opinion about and the importer refuses.
 * Without this, a sheet reads green here and is rejected at the last step.
 */
export function missingFields(fmt, b){
  const gone = [];
  const each = (list, key, what) => {
    for(const x of (b[list] ?? [])){
      if(!String(x[key] ?? '').trim()){
        gone.push(`${list}[].${key} — ${what} (missing on "${x.label ?? x.id ?? '?'}")`);
        return;
      }
    }
  };
  switch(fmt){
    case 'CHAIN':
      each('links', 'label', 'what the link is');
      each('links', 'transfers', 'what force or quantity it carries across');
      break;
    case 'DELEGATE':
      each('problems', 'label', 'what the condition is');
      each('problems', 'trend', 'rising, stable or falling');
      each('problems', 'rate', 'how fast, against what margin');
      each('problems', 'consequence', 'what happens if nobody gets to it');
      each('team', 'label', 'who they are');
      each('firstActions', 'label', 'what the action is');
      break;
    case 'TRACE':
      each('channels', 'label', 'what the channel is');
      each('channels', 'reading', 'what it currently says');
      break;
    case 'ATTEST':
      each('claims', 'label', 'what is being claimed');
      each('claims', 'evidence', 'what a verification would turn up');
      break;
    case 'BALANCE':
      each('streams', 'label', 'what the stream is');
      break;
    case 'VALUE':
      each('options', 'label', 'what is being bought');
      each('options', 'axis', 'which question it asks');
      break;
    case 'ALLOCATE':
      each('items', 'label', 'what is being spent on');
      each('answers', 'question', 'what the plan could settle');
      break;
    case 'TRIANGULATE':
      each('stations', 'observation', 'what the station measured');
      break;
    case 'ROUTE':
      each('stops', 'landmark', 'what is recognisable there without a label');
      break;
    case 'INJECT':
      each('configs', 'label', 'what the configuration is');
      break;
    case 'RESIDUAL':
      each('fits', 'label', 'what the fit is');
      break;
    case 'PROPAGATE':
      each('inputs', 'label', 'what the input is');
      break;
    case 'STRESS':
      each('candidates', 'label', 'what the candidate is');
      break;
    default: break;
  }
  return gone;
}

/**
 * The trap, which is arithmetic. A row that fails here is a content problem and
 * needs a person; nothing above can fix it.
 *
 * Deliberately a subset of what `import-book.mjs` enforces — it checks the trap,
 * not the whole schema, so the importer stays the single authority on validity
 * and this stays a fast answer to "is the pedagogy in there".
 */
export function trap(fmt, b){
  const bad = [];
  const need = (cond, m) => { if(!cond) bad.push(m); };
  switch(fmt){
    case 'BALANCE': {
      const flow = (b.streams ?? []).filter(s => s.countable !== false);
      const all = flow.reduce((n, s) => n + +s.value, 0);
      const obvious = flow.filter(s => !s.hidden).reduce((n, s) => n + +s.value, 0);
      need(flow.length >= 3, `only ${flow.length} countable stream(s), needs 3`);
      need(Math.abs(all - +b.total?.amount) <= +b.tolerance,
        `counted streams sum to ${all.toFixed(2)} against a total of ${b.total?.amount}`
        + ` (tolerance ${b.tolerance}) — the ledger does not close`);
      need(Math.abs(obvious - +b.total?.amount) > +b.tolerance,
        'leaving the hidden term out still passes');
      need(flow.some(s => s.hidden), 'no hidden stream');
      break;
    }
    case 'CONTROL':
      need((b.variables ?? []).some(v => String(v.id) === String(b.truth)),
        `truth "${b.truth}" is not one of the variables`);
      need((b.variables ?? []).length >= 3, 'fewer than three candidates');
      need(Math.abs(+b.response) > (+b.noise || 0) * 3,
        `response ${b.response} is not clear of noise ±${b.noise ?? 0}`);
      break;
    case 'ALLOCATE': {
      const cost = (b.items ?? []).reduce((n, i) => n + (+i.cost || 0), 0);
      const prot = new Set((b.items ?? []).filter(i => i.protected).map(i => String(i.id)));
      const req = (b.answers ?? []).filter(a => a.required);
      const needIds = new Set(req.flatMap(a => (a.requires ?? []).map(String)));
      const needCost = (b.items ?? []).filter(i => needIds.has(String(i.id)) || i.protected)
        .reduce((n, i) => n + (+i.cost || 0), 0);
      need(cost > +b.pool?.amount, `the whole board costs ${cost} against a pool of ${b.pool?.amount}`);
      need((b.items ?? []).length >= 4, 'fewer than four items');
      need((b.answers ?? []).length >= 3, 'fewer than three answers');
      need(req.length >= 1, 'no required answer');
      need((b.answers ?? []).some(a => !a.required), 'nothing the plan may forgo');
      need(needCost <= +b.pool?.amount, `the required answers cost ${needCost}, over the pool`);
      for(const a of req){
        need(!(a.requires ?? []).every(r => prot.has(String(r))),
          `"${a.question}" is covered by the protected items alone`);
      }
      break;
    }
    case 'VALUE': {
      const cost = (b.options ?? []).reduce((n, o) => n + (+o.cost || 0), 0);
      const dec = (b.options ?? []).filter(o => o.decisive);
      need(cost > +b.budget?.amount, `the whole board is affordable (${cost} vs ${b.budget?.amount})`);
      need((b.options ?? []).length >= 4, 'fewer than four options');
      need(dec.length >= 1, 'nothing is decisive');
      need(dec.reduce((n, o) => n + (+o.cost || 0), 0) <= +b.budget?.amount,
        'the decisive options together are unaffordable');
      need(new Set((b.options ?? []).map(o => o.axis)).size >= 2, 'every option is on one axis');
      break;
    }
    case 'ATTEST': {
      const c = b.claims ?? [];
      const want = c.filter(x => x.critical && !x.backed);
      need(c.length >= 4, `only ${c.length} claims, needs 4`);
      need(+b.checks < c.length, 'the budget covers the whole list');
      need(want.length >= 1, 'every critical claim is backed');
      need(want.length <= +b.checks, `${want.length} claims must be held on a budget of ${b.checks}`);
      need(c.some(x => x.critical && x.backed), 'no critical claim is backed');
      need(c.every(x => String(x.evidence ?? '').trim()), 'a claim has no evidence text');
      break;
    }
    case 'TRACE': {
      const ch = b.channels ?? [];
      const share = ch.filter(x => (x.depends ?? []).map(String).includes(String(b.target)));
      need(ch.length >= 4, 'fewer than four channels');
      need(share.length >= 2, 'fewer than two channels share the target');
      need((b.independent ?? []).length >= 1, 'no independent channel');
      need((b.resources ?? []).some(r => String(r.id) === String(b.target)),
        `target "${b.target}" is not one of the resources`);
      break;
    }
    case 'CHAIN':
      need((b.links ?? []).length >= 4, 'fewer than four links');
      need((b.order ?? []).length >= 4, 'the path names fewer than four links');
      need((b.order ?? []).every(id => (b.links ?? []).some(l => String(l.id) === String(id))),
        'the path names a link that is not in the bank');
      need((b.order ?? []).map(String).includes(String(b.governing)),
        'the governing link is not in the path');
      need(String(b.governing) !== String(b.distractor), 'the distractor is the governing link');
      need(String(b.governing) !== String((b.order ?? [])[0]), 'the first link governs');
      break;
    case 'VERIFY': {
      const p = b.prediction ?? {};
      const [lo, hi] = b.passRatio ?? [];
      need(num(b.truth) && +b.truth >= +p.min && +b.truth <= +p.max,
        'the truth is outside the prediction range');
      need(num(lo) && num(hi) && +lo < 1 && +hi > 1, 'passRatio does not bracket 1');
      need(+p.min / +b.truth < +lo || +p.max / +b.truth > +hi,
        'every prediction in the range passes');
      break;
    }
    case 'INJECT': {
      const c = b.configs ?? [];
      const byM = c.reduce((a, x) => (+x.metric > +a.metric ? x : a), c[0] ?? {});
      const byD = c.reduce((a, x) => (+x.detections > +a.detections ? x : a), c[0] ?? {});
      need(c.length >= 3, 'fewer than three configurations');
      need(String(byM.id) === String(b.best), `"${byM.id}" scores highest on the metric, not "${b.best}"`);
      need(String(byD.id) !== String(b.best), 'the most detections is also the best on the metric');
      break;
    }
    case 'DELEGATE': {
      const p = b.problems ?? [];
      const urgent = p.filter(x => x.trend === 'rising' && x.irreversible);
      need(p.length >= 3, `only ${p.length} problems, needs 3`);
      need((b.team ?? []).length >= 2, 'fewer than two people to hand work to');
      need((b.firstActions ?? []).length >= 2, 'fewer than two first actions');
      need(urgent.length === 1,
        `${urgent.length} problems are rising toward something irreversible — exactly one makes an order`);
      const mine = p.filter(x => x.delegable === false);
      need(mine.length === 1, `${mine.length} problems need the player's own judgement, needs 1`);
      need(mine.length !== 1 || String(mine[0].id) === String(b.first),
        'what command keeps is not the problem marked delegable: false');
      need(p.some(x => x.trend !== 'rising' && x.loud),
        'no problem is loud and stable — the alarm and the priority are then the same thing');
      need((b.team ?? []).length >= p.length - 1,
        `${p.length - 1} problems must be handed to ${(b.team ?? []).length} people`);
      break;
    }
    case 'PROPAGATE': {
      const ins = b.inputs ?? [];
      const share = (x) => Math.abs(+x.exponent) * +x.sigmaFrac;
      const worst = ins.reduce((a, x) => (share(x) > share(a) ? x : a), ins[0] ?? {});
      const bigExp = ins.reduce((a, x) =>
        (Math.abs(+x.exponent) > Math.abs(+a.exponent) ? x : a), ins[0] ?? {});
      need(ins.length >= 3, 'fewer than three inputs');
      need(String(worst.id) === String(b.dominant),
        `the widest contribution is "${worst.id}", not "${b.dominant}"`);
      need(String(bigExp.id) !== String(b.dominant),
        'ranking by exponent alone answers it');
      need((b.improvable ?? []).some(m => String(m.id) === String(b.dominant) && m.newSigmaFrac != null),
        'the dominant term cannot be bought');
      break;
    }
    case 'STRESS': {
      const a = b.assumption ?? {};
      const ids = (b.candidates ?? []).map(c => String(c.id));
      const survivors = ids.filter(id => +((b.feasible ?? {})[id] ?? -Infinity) <= +a.min);
      const at = (id) => +(((b.scores ?? {})[id] ?? {})[b.optimiseOn] ?? NaN);
      need(survivors.length === 1 && survivors[0] === String(b.robust),
        survivors.length ? `${survivors.length} candidate(s) survive the range` : 'nothing survives the range');
      need(ids.length >= 3, 'fewer than three candidates');
      need(ids.reduce((x, y) => (at(y) < at(x) ? y : x), ids[0]) !== String(b.robust),
        `the robust candidate also wins on ${b.optimiseOn} at the nominal`);
      break;
    }
    case 'RESIDUAL': {
      const fits = b.fits ?? [];
      const best = fits.reduce((a, f) => (+f.rms < +a.rms ? f : a), fits[0] ?? {});
      need(fits.length >= 2, 'fewer than two candidate fits');
      need(String(best.id) !== String(b.accept), 'the lowest-RMS fit is the one to accept');
      need(!!best.structured, 'the lowest-RMS fit is not marked structured');
      break;
    }
    case 'CLOUD':
      need((b.actions ?? []).some(a => a.effect === 'narrow'), 'no narrowing action');
      need(num(b.centre) && num(b.spread) && +b.spread > 0,
        'the cloud has no numeric centre and spread');
      need([b.bounds?.min, b.bounds?.max].every(v => num(v) || Math.abs(v) === Infinity),
        'the corridor is not two numbers');
      for(const a of b.actions ?? []) need(num(a.amount),
        `action "${a.label ?? a.id}" has no numeric amount`);
      need(+b.pass > 0 && +b.pass < 1, 'pass is not a fraction between 0 and 1');
      break;
    case 'TRIGGER':
      need((b.conditions ?? []).length >= 2, 'fewer than two stages');
      need((b.stream ?? []).length >= 3, 'fewer than three updates');
      need(+b.scale?.max > Math.max(...(b.stream ?? []).map(x => +x.value)),
        'the scale does not reach above the stream — every threshold fires');
      break;
    case 'DEGENERACY': {
      const cs = b.controls ?? [], tol = b.tolerance ?? {};
      const far = (b.locus ?? []).filter(pt =>
        Math.abs(+pt.a - +b.truth?.a) > +tol.a || Math.abs(+pt.b - +b.truth?.b) > +tol.b);
      need(cs.length === 2, `${cs.length} controls, needs exactly 2`);
      need((b.locus ?? []).length >= 5, 'the first locus needs at least five points');
      need(((b.second ?? {}).locus ?? []).length >= 3, 'no second locus');
      need(num(b.truth?.a) && num(b.truth?.b), 'no numeric truth pair');
      need(+tol.a > 0 && +tol.b > 0, 'no positive tolerance on each control');
      need(far.length >= 3, 'the first locus barely leaves the answer tolerance — not degenerate');
      break;
    }
    case 'TRIANGULATE': {
      const st = b.stations ?? [];
      need(st.length >= 3, `${st.length} stations, needs 3`);
      need(num(b.truth?.x) && num(b.truth?.y), 'no numeric truth position');
      need(+b.tolerance > 0, 'no positive tolerance');
      for(const x of st){
        const real = Math.hypot(+x.x - +b.truth?.x, +x.y - +b.truth?.y);
        need(Math.abs(real - +x.distance) <= +b.tolerance,
          `station "${x.label}" ring misses the answer by ${Math.abs(real - +x.distance).toFixed(2)}`);
      }
      if(b.systematic) need(Math.abs(+b.systematic.delta) > +b.tolerance,
        'the systematic is smaller than the tolerance — correcting it changes nothing');
      break;
    }
    case 'FLY':
      need(+b.accel > 0 && +b.tolerance > 0 && +b.rateTolerance > 0 && +b.budget > 0,
        'fly needs a positive accel, tolerance, rateTolerance and budget');
      need(num(b.target), 'no numeric target');
      need(+b.target + (+b.accel * +b.pulse?.min * +b.pulse?.min) / 2 - +b.target > +b.tolerance,
        'braking at the target itself lands inside the tolerance');
      break;
    case 'ROUTE': {
      const stops = b.stops ?? [];
      const marks = stops.map(x => String(x.landmark ?? '').toLowerCase().trim());
      need(stops.length >= 5, `${stops.length} compartments, needs 5`);
      need(new Set(marks).size === marks.length, 'two compartments share a landmark');
      need((b.order ?? []).indexOf(String(b.resumeAt)) > +b.interruptAfter,
        'the detour drops the player where they had already been');
      break;
    }
    // The rest are validated by the importer alone. A half-check here would
    // report green on a row the importer then refuses, which is worse than
    // saying nothing.
    default:
      bad.push(`no trap check for ${fmt} here — the importer is the authority; run it`);
  }
  return bad;
}
