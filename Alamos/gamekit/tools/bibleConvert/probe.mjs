// probe.mjs — the bible's PROBE board into the importer's.
//
// Four stops: headwater M9 S33 and planetary_defense M7 S27, M9 S35, M14 S54.
// See `_shared.mjs` for the contract every converter keeps.
//
// THE ORDER IS PHYSICAL. A probe's stations become posts down a room, in the
// order the chain runs, and the fault is found by walking them and seeing where
// the readings separate from what was expected. So the station list is carried
// across in the order the bible wrote it and is never sorted, deduplicated into
// a map, or keyed by id — the selftest below asserts a shuffled board comes back
// shuffled the same way, because a converter that quietly sorts would put the
// break in the wrong place in the room and every gate would still be green.
//
// THE THING TO KNOW ABOUT THESE FOUR BOARDS. Three of the four are byte-identical
// and the fourth is the same again: stations labelled "station A" through
// "station D", readings of "10.1 units" against "10.0 units", the break always at
// C. The campaigns' real probes are in `stop.payload` — headwater's four
// pressure stations with slopes against dP/dh = 0.4(8−P), planetary_defense's
// corrected clock and delay and Doppler channels — under a schema of their own.
// This converter carries the §7 board and owes the rest.
import { str, pick, list } from './_shared.mjs';

export const FORMAT = 'PROBE';

// The template's own furniture: a station named for its own letter, and a
// reading whose unit is the word "units".
const PLACEHOLDER_LABEL = /^\s*(station|point|node|stage)\s+[A-Z0-9]+\s*$/i;
const PLACEHOLDER_READING = /^\s*[-+0-9.eE]+\s*units?\s*$/i;

export const convert = (b) => {
  const owes = [];
  const raw = list(pick(b, 'stations', 'points'));

  const stations = raw.map((s, i) => {
    const at = `probe station ${i + 1}`;
    const id = str(pick(s, 'id')) || str(s.label);
    const label = str(s.label);
    const reading = str(pick(s, 'reading'));
    const expected = str(pick(s, 'expected'));
    if(!id) owes.push(`${at} has no \`id\` and no \`label\` to stand in for one`);
    if(!label) owes.push(`${at} has no \`label\` — the post in the room has nothing written on it`);
    if(!reading) owes.push(`${at} has no \`reading\` — what this run says`);
    if(!expected) owes.push(`${at} has no \`expected\` — what the last one said`);
    if(PLACEHOLDER_LABEL.test(label)){
      owes.push(`${at} is labelled "${label}", which names no equipment — this is the template`
        + ' board, not this campaign\'s');
    }
    if(PLACEHOLDER_READING.test(reading) || PLACEHOLDER_READING.test(expected)){
      owes.push(`${at} reads in "units" — the board authors no quantity and no real unit`);
    }
    // `load` is what the station is being asked to do while it is read, and it
    // is the only place a probe puts context. None of the four author it.
    if(!str(s.load)) owes.push(`${at} has no \`load\` — nothing says what the station is doing`);
    const out = {};
    if(id) out.id = id;
    if(label) out.label = label;
    if(reading) out.reading = reading;
    if(expected) out.expected = expected;
    if(str(s.load)) out.load = str(s.load);
    return out;
  });

  if(!stations.length) owes.push('the probe authors no stations');
  else if(stations.length < 4) owes.push(`the probe authors ${stations.length} stations, and a`
    + ' pattern needs at least four to have somewhere to break');

  // `comparison` is the tell every one of these boards carries: the station that
  // breaks the pattern says "breaks pattern" on its own row. It is NOT carried
  // into `load` or anywhere else the panel prints, because a board that hands
  // over its own answer has removed the reading the player came to do — six
  // rows, one of them labelled, and nobody looks at the numbers.
  if(raw.some(s => str(pick(s, 'comparison', 'verdict')))){
    owes.push('every station authors a `comparison` naming whether it matches or breaks the'
      + ' pattern; that is the answer printed on the board, so it is dropped rather than written'
      + ' into `load` — the finding belongs in the verdict');
  }

  const value = { stations };
  const target = str(b.target);
  if(target) value.target = target;
  else owes.push('the probe has no `target` — the station the fault is at');
  if(target && stations.length && !stations.some(s => s.id === target)){
    owes.push(`the probe target "${target}" is not one of its stations`);
  }

  // `chainLabel`, `minReadings` and `commit` all have importer defaults, so they
  // are not written here; `answerText` has none and is a top-level stop key
  // this converter cannot reach.
  if(!str(b.chainLabel)) owes.push('the probe authors no `chainLabel` — the posts are called "Stage"');
  owes.push('the probe authors no verdict text, so the stop has no `answerText` — and it is a'
    + ' top-level key this converter cannot write in any case, the contract returning one key');

  return { key: 'probe', value, owes };
};

// ------------------------------------------------------- the authored board
//
// The four stops point at their own payload instead, and those are four
// different probes rather than one template: headwater walks four pressure
// stations A–D against dP/dh = 0.4(8−P); planetary_defense walks a corrected
// clock, a delay channel, a Doppler channel and a background gate; then four
// corridor stations; then six calibrated radar frames. Real ids, real numbers,
// real loads.
//
// FOUR THINGS THE PAYLOADS DO THAT THE §7 BOARDS DID NOT.
//
// 1. A reading is a MAP, not a string. `{slope: 1.6, unit: "pressure/m"}` is the
//    row's cell and becomes "1.6 pressure/m"; `{P: 4, unit: "pressure"}` is the
//    load. A map with one quantity and a unit renders; a map with four
//    (`{blast, thermal, wave, exposed_population}`) does not, because a probe
//    row prints one quantity and mashing four into a cell is the half-read board
//    `_payload.mjs` refuses to produce.
//
// 2. `expected` is often a DIFFERENT QUANTITY from `reading` — delay 0.080 s
//    against an expected range of 12 000 km, a shift direction against a radial
//    motion. The importer's probe finds the fault where the two separate, and
//    two different quantities never separate because they were never the same
//    thing. That is owed per station: it is the shape tell that the board is a
//    worksheet rather than a chain.
//
// 3. NONE OF THE FOUR NAMES A TARGET STATION. headwater says `correct_break:
//    none` — no station breaks the pattern at all — and the other three grade a
//    submitted value or a classification. The importer requires `target` to be
//    one of the stations, so it is owed with what the board says instead
//    quoted, and never filled from `truth` or `correct_submission`, which are
//    the answer.
//
// 4. `commit_gate` is what counts as done — "All four stations sampled" — which
//    is `goals`, the line the panel prints. It is the goal, never the target,
//    so it is the one piece of the answer half that is safe to print.
//
// `required_samples` names WHICH stations must be read and the importer counts
// them, so `minReadings` is written only when the list is every station; a
// subset would let the player read the wrong two and still commit.

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

/** The quantities a reading/expected map names, ignoring its unit. */
const quantities = (v) => (v && typeof v === 'object' && !Array.isArray(v)
  ? Object.keys(v).filter(k => k !== 'unit' && k !== '_trailing') : []);

/**
 * One cell of a station's row: `{slope: -0.8, unit: "pressure/m"}` → "-0.8
 * pressure/m". A map naming several quantities at once is not written, because
 * the row prints one and a joined cell reads as a finished board.
 */
function cell(v, owes, at, which){
  if(v === undefined || v === null) return '';
  if(typeof v !== 'object') return str(v);
  const keys = quantities(v);
  const unit = str(v.unit);
  if(!keys.length) return unit;
  if(keys.length > 1){
    owes.push(`${at} states ${keys.length} quantities in one \`${which}\` (${keys.join(', ')}) —`
      + ' a probe row prints one, so the cell is left unwritten rather than joined into a sentence');
    return '';
  }
  return [str(v[keys[0]]), unit].filter(x => x.length).join(' ');
}

// Everything this converter reads or owes about by name. Anything else the
// board authors is dropped, and a dropped key that nobody names is how CHAIN's
// `reading` went four books without reaching a screen — so what is left over is
// listed in `owes` rather than passed over in silence.
const CONSUMED = new Set(['stations', 'points', 'channels', 'load_sequence', 'required',
  'required_samples', 'chainLabel', 'chain_label', 'target', 'commit_gate', 'goals', 'goal',
  'answerText', 'correct_break', 'correct_submission', 'correct_classification', 'truth',
  'minReadings', 'commit', '_trailing']);

/**
 * The stop's own authored probe. See `_payload.mjs` for where it comes from and
 * `_shared.mjs` for the contract; `stop` carries the printed question, the
 * stop's `answerText` and the key the payload was written under.
 */
export const convertPayload = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  if(stop.payloadKey && stop.payloadKey !== 'probe'){
    owes.push(`the payload is written under \`${stop.payloadKey}\` and the importer reads a probe`
      + ' from `probe` — one of the two names is wrong');
  }

  const raw = list(pick(board, 'stations', 'points', 'channels'));
  const rawStations = raw.filter(s => s && typeof s === 'object' && !Array.isArray(s));
  if(rawStations.length < raw.length){
    owes.push(`${raw.length - rawStations.length} of the ${raw.length} station(s) are not records`
      + ' with fields on them, so nothing can be read off them');
  }

  // A row whose number has no noun on it. `{round_trip_delay_s: 0.080}` names its
  // quantity in the KEY and authors no unit, so the post in the room prints
  // "0.08" against "12000" and nothing says what either is. Counted once for the
  // board rather than once a station, or the report is six lines saying one thing.
  const bare = [];

  // THE ORDER IS PHYSICAL, exactly as in `convert` above: the stations become
  // posts down a room in the order the chain runs, so the list is carried across
  // as written and never sorted or keyed.
  const stations = rawStations.map((s, i) => {
    const at = `probe station ${i + 1}`;
    const id = str(pick(s, 'id')) || str(s.label);
    const label = str(s.label);
    const reading = cell(pick(s, 'reading'), owes, at, 'reading');
    const expected = cell(pick(s, 'expected'), owes, at, 'expected');
    const load = cell(pick(s, 'load'), owes, at, 'load');
    if(!id) owes.push(`${at} has no \`id\` and no \`label\` to stand in for one`);
    if(!label) owes.push(`${at} has no \`label\` — its id is a token, and the post in the room has`
      + ' nothing a player can read written on it');
    if(!reading) owes.push(`${at} has no \`reading\` this converter can print`);
    if(!expected) owes.push(`${at} has no \`expected\` this converter can print`);
    if(!load) owes.push(`${at} has no \`load\` — nothing says what the station is doing while it is read`);
    if(PLACEHOLDER_LABEL.test(label)){
      owes.push(`${at} is labelled "${label}", which names no equipment`);
    }
    for(const which of ['reading', 'expected']){
      const m = pick(s, which);
      const q = quantities(m);
      if(q.length === 1 && typeof m[q[0]] === 'number' && !str(m.unit)) bare.push(q[0]);
    }
    // The comparison: two quantities that are not the same quantity.
    const rq = quantities(pick(s, 'reading')), eq = quantities(pick(s, 'expected'));
    if(rq.length && eq.length && !rq.some(k => eq.includes(k))){
      owes.push(`${at} reads \`${rq.join('/')}\` and expects \`${eq.join('/')}\` — two different`
        + ' quantities, which never separate, so the row the player walks has nothing to find on it');
    }
    const out = {};
    if(id) out.id = id;
    if(label) out.label = label;
    if(reading) out.reading = reading;
    if(expected) out.expected = expected;
    if(load) out.load = load;
    return out;
  });

  if(!stations.length) owes.push('the probe authors no stations');
  else if(stations.length && stations.length < 4){
    owes.push(`the probe authors ${stations.length} stations, and a pattern needs at least four`
      + ' to have somewhere to break');
  }
  const ids = stations.map(s => s.id).filter(Boolean);
  if(ids.length !== new Set(ids).size) owes.push('two probe stations share an id');
  if(bare.length){
    owes.push(`${bare.length} of the rows read as a bare number — the quantity is named only in the`
      + ` payload's own key (\`${[...new Set(bare)].join('`, `')}\`) and no \`unit\` is authored,`
      + ' so the post prints a figure with no noun on it');
  }

  // Same rule as `convert`: the row that says it breaks the pattern has printed
  // the answer, so `comparison` is dropped and said out loud.
  if(rawStations.some(s => str(pick(s, 'comparison', 'verdict')))){
    owes.push('every station authors a `comparison` naming whether it matches or breaks the'
      + ' pattern; that is the answer printed on the board, so it is dropped rather than written'
      + ' into `load` — the finding belongs in the verdict');
  }

  const value = { stations };

  // ---- the order the chain runs, if the board states it twice.
  const order = list(pick(board, 'load_sequence')).map(x => str(x)).filter(Boolean);
  if(order.length && ids.length && order.join() !== ids.join()){
    owes.push(`the board's \`load_sequence\` runs ${order.join(', ')} and its stations are written`
      + ` ${ids.join(', ')} — the posts go down the room in one of those orders and the board`
      + ' states two');
  }

  // ---- how many stations have to be read before the commit is allowed.
  const required = list(pick(board, 'required', 'required_samples')).map(x => str(x)).filter(Boolean);
  if(required.length && ids.length){
    const missing = required.filter(r => !ids.includes(r));
    if(missing.length) owes.push(`\`required\` names ${missing.join(', ')}, which are not stations`);
    else if(required.length === ids.length) value.minReadings = required.length;
    else owes.push(`the board requires ${required.join(', ')} specifically and the importer counts`
      + ` readings rather than naming them, so a \`minReadings\` of ${required.length} would let the`
      + ' player read the wrong ones and commit');
  }

  // ---- the goal. What counts as done, which is the line the panel prints —
  // and the one half of the answer section that may be printed, because it
  // states the criterion and never the station.
  const goal = str(pick(board, 'commit_gate', 'goal'));
  const goals = list(pick(board, 'goals')).map(x => str(x)).filter(Boolean);
  if(goal) value.goals = [goal, ...goals];
  else if(goals.length) value.goals = goals;

  // ---- the target, which none of the four author.
  const target = str(pick(board, 'target'));
  if(target) value.target = target;
  if(target && ids.length && !ids.includes(target)){
    owes.push(`the probe target "${target}" is not one of its stations`);
  }
  if(!target){
    const said = ['correct_break', 'correct_submission', 'correct_classification', 'truth']
      .filter(k => board[k] !== undefined);
    owes.push('the probe names no `target` — the station the fault is at'
      + (said.length
        ? `; it grades on \`${said.join('`, `')}\` instead${str(board.correct_break)
          ? ` and says \`correct_break: ${str(board.correct_break)}\`, so no station breaks at all`
          : ''} — a value or a classification, not a post in the room, and the importer requires`
          + ' a station'
        : ''));
  }
  if(!str(pick(board, 'chainLabel', 'chain_label'))){
    owes.push('the probe authors no `chainLabel` — the posts are called "Stage"');
  }

  // ---- the verdict. `answerText` is a top-level key on the stop rather than a
  // field of the probe block, and `extra` is what places it. The board's is
  // written where the stop has none; where both exist and differ, choosing
  // between two authored verdicts is authoring, so neither is written.
  const extra = {};
  const said = str(board.answerText);
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!has && !said) owes.push('neither the stop nor its board authors an `answerText`, and a'
    + ' probe is graded on a walk rather than an option, so the verdict has nothing to print');
  else if(said && has && said !== has){
    const lost = lostNumbers(said, has);
    if(lost.length) owes.push(`the board's own verdict states ${lost.join(', ')} and the stop's`
      + ' verdict does not — the stop is graded on a number its own answer never says, and'
      + ' choosing between two authored verdicts is authoring, so neither is written');
  }

  // ---- what is left over.
  const dropped = Object.keys(board).filter(k => !CONSUMED.has(k)).sort();
  if(dropped.length){
    owes.push(`the board authors \`${dropped.join('`, `')}\`, which the probe block has no field`
      + ' for, so they are dropped');
  }
  const tail = str(board._trailing).replace(/^[.;,\s]+$/, '');
  if(tail) owes.push(`the payload carries prose after its board — "${tail}" — which may hold a`
    + ' number the board does not');

  return { key: 'probe', value, owes, extra };
};

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/probe.mjs
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const station = (id, label, r, e, load) => ({ id, label, reading: r, expected: e, load });
  const full = {
    stations: [
      station('clock', 'Corrected clock', '0.000 s offset', '0.000 s offset', 'Zero the timing reference'),
      station('delay', 'Delay channel', '0.080 s round trip', '0.080 s round trip', 'Time the echo'),
      station('doppler', 'Doppler channel', 'toward transmitter', 'toward transmitter', 'Read the shift'),
      station('range', 'Range solution', '11 400 km', '12 000 km', 'Solve for range'),
    ],
    target: 'range', chainLabel: 'Channel',
  };
  const done = convert(full);
  // A complete board owes only the answerText, which cannot live under this key.
  ok(done.owes.length === 1 && /answerText/.test(done.owes[0]),
    `a complete probe should owe only its answerText; owed ${JSON.stringify(done.owes)}`);
  ok(done.value.target === 'range', 'a complete probe lost its target');

  // THE ORDER TEST. The same four stations in a different order must come back
  // in that different order — the chain is a walk down a room.
  const shuffled = convert({ ...full, stations: [full.stations[2], full.stations[0], full.stations[3], full.stations[1]] });
  ok(shuffled.value.stations.map(s => s.id).join() === 'doppler,clock,range,delay',
    `the converter reordered its stations: ${shuffled.value.stations.map(s => s.id).join()}`);
  ok(done.value.stations.map(s => s.id).join() === 'clock,delay,doppler,range',
    'the converter reordered the authored order');

  // Refusal: a station missing `expected` must owe it and must not get one.
  const missing = convert({ stations: [station('a', 'Head tank', '4.0 m', '', 'Read the head')], target: 'a' });
  ok(!('expected' in missing.value.stations[0]), 'a missing `expected` was invented');
  ok(missing.owes.some(o => /has no `expected`/.test(o)), 'a missing `expected` was not owed');
  ok(missing.owes.some(o => /at least four/.test(o)), 'a one-station probe was not owed');

  // The answer-on-the-board case: `comparison` is owed and never written.
  const tell = convert({
    stations: [{ id: 'C', label: 'station C', reading: '13.2 units', expected: '10.0 units', comparison: 'breaks pattern' }],
    target: 'C',
  });
  ok(!JSON.stringify(tell.value).includes('breaks pattern'), 'the board\'s own answer was written through');
  ok(tell.owes.some(o => /`comparison`/.test(o)), 'the printed comparison was not owed');
  ok(tell.owes.some(o => /names no equipment/.test(o)), 'the template station label was not owed');
  ok(tell.owes.some(o => /reads in "units"/.test(o)), 'the template unit was not owed');
  // And the case that must NOT fire, or the check is agreeing with itself.
  ok(!done.owes.some(o => /names no equipment|reads in "units"|`comparison`/.test(o)),
    'a real board was falsely called the template');

  // A target naming no station.
  const stray = convert({ ...full, target: 'nowhere' });
  ok(stray.owes.some(o => /is not one of its stations/.test(o)), 'a stray target was not owed');

  // ---------------------------------------------------- the authored board
  const st = (id, label, q, r, e) => ({ id, label, load: { note: `Read ${label}` },
    reading: { [q]: r, unit: 'pressure/m' }, expected: { [q]: e, unit: 'pressure/m' } });
  const paid = {
    stations: [st('A', 'Head tank', 'slope', 1.6, 1.6), st('B', 'Mid gauge', 'slope', 0, 0),
      st('C', 'Low gauge', 'slope', -0.8, -0.8), st('D', 'Outfall', 'slope', -1.6, -1.2)],
    load_sequence: ['A', 'B', 'C', 'D'], required: ['A', 'B', 'C', 'D'],
    target: 'D', chainLabel: 'Station', commit_gate: 'All four stations sampled.',
  };
  const whole = convertPayload(paid, { answerText: 'D returns harder than the law allows.' });
  ok(whole.owes.length === 0, `a complete payload should owe nothing; owed ${JSON.stringify(whole.owes)}`);
  ok(whole.value.stations[0].reading === '1.6 pressure/m',
    `a reading map did not render: ${whole.value.stations[0].reading}`);
  ok(whole.value.minReadings === 4, 'a `required` naming every station did not become minReadings');
  ok(whole.value.goals[0] === 'All four stations sampled.', 'the commit gate did not become the goal');
  ok(whole.value.target === 'D', 'a complete payload lost its target');

  // THE ORDER TEST again, on this half: a shuffled chain stays shuffled.
  const shuffledPay = convertPayload({ ...paid, load_sequence: undefined,
    stations: [paid.stations[3], paid.stations[0], paid.stations[2], paid.stations[1]] },
  { answerText: 'x' });
  ok(shuffledPay.value.stations.map(s => s.id).join() === 'D,A,C,B',
    `the payload converter reordered its stations: ${shuffledPay.value.stations.map(s => s.id).join()}`);

  // Refusal: a missing `expected` is owed and never invented.
  const noExp = convertPayload({ ...paid,
    stations: [{ ...paid.stations[0], expected: undefined }, ...paid.stations.slice(1)] },
  { answerText: 'x' });
  ok(!('expected' in noExp.value.stations[0]), 'a missing `expected` was invented');
  ok(noExp.owes.some(o => /station 1 has no `expected`/.test(o)), 'a missing `expected` was not owed');

  // A row of bare numbers: counted once, and not counted at all where the board
  // authors a unit — or the check is agreeing with itself.
  const noUnit = convertPayload({ ...paid, stations: paid.stations.map(x => ({ ...x,
    reading: { delay_ms: 0.2 }, expected: { delay_ms: 0.21 } })) }, { answerText: 'x' });
  ok(noUnit.owes.some(o => /8 of the rows read as a bare number/.test(o)
    && /`delay_ms`/.test(o)), `bare numeric rows were not owed: ${JSON.stringify(noUnit.owes)}`);
  ok(noUnit.value.stations[0].reading === '0.2', 'a bare numeric reading was dropped rather than printed');
  ok(!whole.owes.some(o => /bare number/.test(o)), 'a row with a unit on it was called bare');

  // A station list whose entries are not records: nothing is read off them, and
  // the count is said rather than the list silently coming back short.
  const notRecords = convertPayload({ points: ['-', 'corrected_clock'], target: 'x' }, { answerText: 'x' });
  ok(!notRecords.value.stations.length, 'a station that is not a record was converted anyway');
  ok(notRecords.owes.some(o => /are not records/.test(o)), 'stations that are not records went unowed');
  ok(!whole.owes.some(o => /are not records/.test(o)), 'real station records were called non-records');

  // A reading naming four quantities at once: no cell, and said out loud.
  const wide = convertPayload({ stations: [{ id: 'deep_ocean', label: 'Deep ocean',
    load: 'Same impactor over deep ocean.',
    reading: { blast: 'moderate', thermal: 'low', wave: 'regional', exposed_population: 'low' },
    expected: { dominant_planning_concern: 'coastal_wave_uncertainty' } }] }, { answerText: 'x' });
  ok(!('reading' in wide.value.stations[0]), 'a four-quantity reading was joined into a cell');
  ok(wide.owes.some(o => /states 4 quantities in one `reading`/.test(o)),
    'the four-quantity reading was not owed');
  ok(wide.owes.some(o => /two different\s+quantities/.test(o)),
    'reading and expected naming different quantities went unowed');
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!whole.owes.some(o => /two different\s+quantities/.test(o)),
    'a row comparing slope with slope was called two different quantities');

  // No target, and `correct_break: none` — owed, and never filled from `truth`.
  const noTarget = convertPayload({ ...paid, target: undefined, correct_break: 'none',
    truth: { equilibrium: 8 } }, { answerText: 'x' });
  ok(!('target' in noTarget.value), 'a missing target was invented');
  ok(!JSON.stringify(noTarget.value).includes('equilibrium'), 'the board\'s own answer was written through');
  ok(noTarget.owes.some(o => /no station breaks at all/.test(o)),
    `\`correct_break: none\` was not owed: ${JSON.stringify(noTarget.owes)}`);

  // `required` naming a subset: no minReadings, and the reason said.
  const some = convertPayload({ ...paid, required: ['A', 'B'] }, { answerText: 'x' });
  ok(!('minReadings' in some.value), 'a partial `required` became a count');
  ok(some.owes.some(o => /read the wrong ones/.test(o)), 'a partial `required` was not owed');

  // A key the probe block has no field for.
  const extra = convertPayload({ ...paid, held_fixed: ['diameter'], model_expectations: { a: 'b' } },
    { answerText: 'x' });
  ok(extra.owes.some(o => /`held_fixed`, `model_expectations`/.test(o)), 'dropped keys were not owed');

  // The verdict: the board's is placed where the stop has none, and never over
  // one the stop already carries.
  const boardSays = convertPayload({ ...paid, answerText: 'D returns harder than the law allows.' }, {});
  ok(boardSays.extra.answerText === 'D returns harder than the law allows.',
    'the board\'s verdict was not placed on a stop that had none');
  ok(!whole.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  // Two verdicts in different words is not a finding; a number in one and not
  // the other is, because the stop is then graded on a figure its own answer
  // never states.
  const clash = convertPayload({ ...paid, answerText: 'D returns at -1.6 pressure/m.' },
    { answerText: 'D returns harder than the law allows.' });
  ok(!('answerText' in clash.extra), 'two differing verdicts and one was written anyway');
  ok(clash.owes.some(o => /verdict states -1.6 and the stop's/.test(o)),
    `a number only the board's verdict states went unowed: ${JSON.stringify(clash.owes)}`);
  const reworded = convertPayload({ ...paid, answerText: 'The last post returns too hard.' },
    { answerText: 'D returns harder than the law allows.' });
  ok(!reworded.owes.some(o => /verdict states/.test(o)),
    'two verdicts in different words with the same numbers were owed');

  // The payload written under somebody else's key.
  const wrongKey = convertPayload(paid, { answerText: 'x', payloadKey: 'chain' });
  ok(wrongKey.owes.some(o => /written under `chain`/.test(o)), 'a mismatched payload key was not owed');
  ok(!whole.owes.some(o => /written under/.test(o)), 'a matching payload key was falsely owed');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('probe.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `PROBE selftest: ${f.length} failure(s)` : 'PROBE selftest: ok');
  process.exit(f.length ? 1 : 0);
}
