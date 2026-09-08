// balance.mjs — the bible's BALANCE board into the importer's.
//
// 11 stops across five campaigns. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// TWO MODEL CONVERSIONS, not renames.
//
// `total` is a bare number in the bible — `total: 100` — and a record in the
// importer, `{amount, unit, label}`. Reshaping the authored number is fine;
// filling the other two fields in is not, which is why a board with no unit is
// owed one rather than given `''`. The panel prints the running sum as
// `${sum} ${unit}`, so an unauthored unit ships as "55 " with the space still in
// it, on every readout and in the verdict caption.
//
// `counts: true` is the bible's spelling of the importer's `countable`. It is
// only ever written on the board as the positive, and the importer only reads
// the negative — `countable: false` marks the row that is a different quantity
// and is not part of the ledger at all — so a stream is emitted with no
// `countable` key unless the bible said false.
//
// THE TRAP, and the whole format: one stream is `hidden`, meaning it is not a
// reading anybody took — a pump that has been running the whole time — and the
// obvious rows have to MISS the total without it. Three visible rows that
// already close is a subtraction, not a decision: nothing is learned by finding
// the fourth. That is reported, never repaired. Nudging a value to open the gap
// is writing the author's arithmetic.
//
// NOT WRITTEN. `visibleSubtotal` and `closedTotal` are the two sums the board
// states about itself. They are not fields the importer has — it adds the
// streams up itself — so carrying them across would be a second description of
// the same fact, which is how the two copies drift. They are used here as the
// author's own claim and checked against the streams instead: a board whose
// stated subtotal is not the sum of its visible rows has a value that was edited
// on one line and not the other, and that is worth saying out loud.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'BALANCE';

/** The bible writes a scalar; the importer reads a record. */
const totalOf = (b) => {
  const t = pick(b, 'total');
  return (t !== null && typeof t === 'object' && !Array.isArray(t)) ? t : { amount: t };
};

const EPS = 1e-6;

export const convert = (b) => {
  const owes = [];
  const t = totalOf(b);
  const amount = num(pick(t, 'amount', 'value'));
  const unit = str(pick(t, 'unit'));
  const label = str(pick(t, 'label'));
  const tolerance = num(pick(b, 'tolerance'));

  const raw = list(pick(b, 'streams'));
  if(raw.length < 3){
    owes.push(`the board carries ${raw.length} stream(s) — a balance needs at least three`);
  }

  const streams = raw.map((x, i) => {
    const at = `stream ${i + 1}`;
    const name = str(x.label);
    const id = str(x.id) || name;
    const value = num(x.value);
    const countable = pick(x, 'countable', 'counts');
    if(!name) owes.push(`${at} has no \`label\` — its row on the panel is blank`);
    if(value === undefined) owes.push(`${at}${name ? ` ("${name}")` : ''} has no numeric \`value\``);
    return {
      ...(id ? { id } : {}),
      ...(name ? { label: name } : {}),
      ...(value !== undefined ? { value } : {}),
      ...(str(x.display) ? { display: str(x.display) } : {}),
      ...(str(x.note) ? { note: str(x.note) } : {}),
      ...(x.hidden === true ? { hidden: true } : {}),
      ...(countable === false ? { countable: false } : {}),
      ...(str(x.unitNote) ? { unitNote: str(x.unitNote) } : {}),
    };
  });

  const ids = streams.map(s => s.id).filter(Boolean);
  if(new Set(ids).size !== ids.length) owes.push('two streams share an id');
  if(amount === undefined) owes.push('no numeric `total` — the number the ledger has to close on');
  if(tolerance === undefined || tolerance <= 0) owes.push('no positive `tolerance`');
  if(!unit){
    owes.push('the total carries no `unit` — the running sum and the verdict then read "55 " with'
      + ' nothing after the space');
  }

  // THE ANSWER PRINTED ON THE BOARD. The importer already refuses a `note` that
  // says a row is not a flow, for the reason that saying it hands over the
  // hardest decision before the player has read anything. A LABEL does it just as
  // loudly and nothing checks it: all eleven boards call three rows "visible …"
  // and the fourth "unlogged removal", so the panel opens with the hidden term
  // announcing itself in the one place it may not. Label a stream by what it is —
  // "sludge hopper", "recycle line" — and let the reading do the telling.
  const TELL = /\b(hidden|unlogged|unrecorded|unmeasured|unreported|visible|obvious)\b/i;
  for(const s of streams){
    if(s.label && TELL.test(s.label)){
      owes.push(`stream "${s.label}" says in its own label whether it is one of the obvious rows`
        + ' — the term that does not announce itself is the format; name it by what it is');
    }
  }

  // The arithmetic checks, and only when every row carries a number. On a board
  // missing one, a sum is the author's total minus a stream this tool decided to
  // treat as zero, and every sentence below it would be about that decision.
  const priced = streams.filter(s => s.value !== undefined);
  const complete = priced.length === streams.length && streams.length >= 3;
  const flow = priced.filter(s => s.countable !== false);
  if(complete && flow.length < 3){
    owes.push(`only ${flow.length} stream(s) count toward the ledger — a balance needs at least`
      + ' three that do');
  }
  const hidden = flow.filter(s => s.hidden);
  if(complete && !hidden.length){
    owes.push('no stream is marked `hidden` — a ledger whose every term announces itself is'
      + ' arithmetic, and the removal term that does not is the format');
  }
  if(complete && amount !== undefined && tolerance > 0){
    const all = flow.reduce((n, s) => n + s.value, 0);
    const obvious = flow.filter(s => !s.hidden).reduce((n, s) => n + s.value, 0);
    if(Math.abs(all - amount) > tolerance){
      owes.push(`the countable streams sum to ${+all.toFixed(2)} against a total of ${amount} —`
        + ' the ledger does not close even when everything is counted');
    }
    // THE TRAP.
    if(Math.abs(obvious - amount) <= tolerance){
      owes.push(`the streams that are not hidden already sum to ${+obvious.toFixed(2)}, inside the`
        + ` tolerance of ${amount} — leaving the hidden term out is not wrong, so nothing is`
        + ' learned by finding it');
    }
    // The board's own claims about itself, checked rather than copied.
    const claimVisible = num(pick(b, 'visibleSubtotal'));
    if(claimVisible !== undefined && Math.abs(claimVisible - obvious) > EPS){
      owes.push(`the board says its visible streams subtotal ${claimVisible} and they sum to`
        + ` ${+obvious.toFixed(2)} — one of the two was edited and the other was not`);
    }
    const claimClosed = num(pick(b, 'closedTotal'));
    if(claimClosed !== undefined && Math.abs(claimClosed - all) > EPS){
      owes.push(`the board says the closed ledger comes to ${claimClosed} and its streams sum to`
        + ` ${+all.toFixed(2)}`);
    }
  }

  return { key: 'balance', value: {
    total: {
      ...(amount !== undefined ? { amount } : {}),
      ...(unit ? { unit } : {}),
      ...(label ? { label } : {}),
    },
    streams,
    ...(tolerance !== undefined ? { tolerance } : {}),
    ...(str(pick(b, 'hint')) ? { hint: str(pick(b, 'hint')) } : {}),
    ...(str(pick(b, 'moral')) ? { moral: str(pick(b, 'moral')) } : {}),
    ...(str(pick(b, 'commit')) ? { commit: str(pick(b, 'commit')) } : {}),
  }, owes };
};

/* ------------------------------------------- the stop's own authored board
 *
 * Eleven BALANCE stops point at their own payload instead of a §7 board, and
 * every one of the eleven is readable. What they wrote:
 *
 *   target: {label, value, unit}
 *   streams: [{id, label, value, unit, count: true|false, reason}]
 *
 * — seven in that hand, one of them writing the total as `required_total` with
 * the unit on the board and the direction of each row in a separate `sign: ±1`.
 * The other four are not ledgers of one number a row: atom counts per element,
 * an ICE table's three concentrations, a set of Riemann sums, and a set of
 * readings with no total to close on at all.
 *
 * WHAT CONVERTS. `count`/`counts: false` is `countable: false`, the row that is
 * a different quantity and deliberately not part of the ledger — every one of
 * the eleven boards has exactly one, and it is the best-authored thing here.
 * `sign: -1` is applied to the row's own value, which is the same reshape as
 * `total: 100` into `{amount: 100}`: the author wrote the magnitude and the
 * direction separately and the importer reads one signed number.
 *
 * `reason` GOES TO `unitNote`, and that is a placement decision made on the
 * importer's own instruction rather than on taste. Every `reason` in these
 * eleven says why a row is not part of the ledger — "context, not an output-gap
 * stream" — and the importer refuses exactly that sentence in a `note`, naming
 * `unitNote` as where it belongs because `unitNote` is shown only once the row
 * has been read. Dropping the sentence would lose authored teaching; putting it
 * in `note` would trip a gate that is right.
 *
 * WHAT DOES NOT, and it is the format itself: NOT ONE of the eleven marks a
 * stream `hidden`. Every row on every board announces itself, so on all eleven
 * the ledger closes on the rows the player can already see. That is a
 * subtraction, not a decision — the exact failure the §7 path is written to
 * catch — and it is reported eleven times rather than repaired once.
 */

/** The quantity keys a row can carry INSTEAD of one number, and what each one is. */
const NOT_ONE_NUMBER = [
  ['atoms', 'a count of atoms per element'],
  ['values', 'a list of readings rather than one number'],
  ['initial_M', 'an ICE table row — initial, change and equilibrium'],
  ['information', 'a description of what the row contributes, with no quantity'],
];

export const convertPayload = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};

  const trailing = str(board._trailing);
  if(trailing){
    owes.push(`prose follows the board and is not part of it — "${trailing}" — read it before`
      + ' shipping: it is where a revealed number is written when the board has no slot for one');
  }

  // THE TOTAL, under the three names the eleven use. A scalar or a record either
  // way, so the record path in the §7 converter is reused rather than restated.
  const tgt = pick(board, 'target', 'total');
  const t = (tgt !== null && typeof tgt === 'object' && !Array.isArray(tgt))
    ? tgt : { amount: tgt };
  const required = pick(board, 'required_total', 'closedTotal');
  const amount = num(pick(t, 'amount', 'value')) ?? num(required);
  const label = str(pick(t, 'label'));
  const tolerance = num(pick(board, 'tolerance')) ?? num(pick(board, 'closure')?.tolerance);

  const raw = list(pick(board, 'streams', 'rows', 'terms'));
  if(raw.length < 3){
    owes.push(`the board carries ${raw.length} stream(s) — a balance needs at least three`);
  }

  const units = new Set();
  const streams = raw.map((x, i) => {
    const at = `stream ${i + 1}`;
    const row = (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
    const name = str(pick(row, 'label', 'name'));
    const id = str(pick(row, 'id')) || name;
    const rawValue = pick(row, 'value', 'amount');
    // A RANGE IS NOT A ROW. `value: [28, 36]` is a diameter between two numbers,
    // and `num` of a two-item list is undefined — which is right, because the
    // ledger adds one number a row and picking an end of the range would be
    // choosing the author's estimate for them.
    const sign = num(pick(row, 'sign'));
    let value = Array.isArray(rawValue) ? undefined : num(rawValue);
    if(value !== undefined && sign !== undefined && sign < 0){
      // The author wrote the size and the direction apart; the importer reads one
      // signed number. Same reshape as a scalar total into a record.
      value = -Math.abs(value);
    }
    const countable = pick(row, 'countable', 'counts', 'count');
    const uncounted = countable === false || String(countable).trim() === 'false';
    const unitNote = str(pick(row, 'unitNote', 'reason'));
    const unit = str(pick(row, 'unit'));
    if(unit) units.add(unit);

    if(!name) owes.push(`${at} has no \`label\` — its row on the panel is blank`);
    if(value === undefined){
      const instead = Array.isArray(rawValue) ? [null, `a range of ${rawValue.length} numbers`]
        : NOT_ONE_NUMBER.find(([k]) => row[k] !== undefined);
      owes.push(`${at}${name ? ` ("${name}")` : ''} has no numeric \`value\``
        + (instead ? ` — it carries ${instead[1]}, and a ledger row is one number` : ''));
    }
    return {
      ...(id ? { id } : {}),
      ...(name ? { label: name } : {}),
      ...(value !== undefined ? { value } : {}),
      ...(str(pick(row, 'display')) ? { display: str(pick(row, 'display')) } : {}),
      ...(str(pick(row, 'note')) ? { note: str(pick(row, 'note')) } : {}),
      ...(row.hidden === true ? { hidden: true } : {}),
      ...(uncounted ? { countable: false } : {}),
      ...(unitNote ? { unitNote } : {}),
    };
  });

  // The unit the running sum is printed in. Taken from the total when the author
  // put it there, and otherwise from the rows only when every row that carries
  // one agrees — a board whose rows are billions and index points has no single
  // unit to print, and picking one of them would be captioning the sum wrong.
  let unit = str(pick(t, 'unit')) || str(pick(board, 'unit'));
  if(!unit && units.size === 1) unit = [...units][0];

  const ids = streams.map(s => s.id).filter(Boolean);
  if(new Set(ids).size !== ids.length) owes.push('two streams share an id');
  if(amount === undefined) owes.push('no numeric `total` — the number the ledger has to close on');
  if(tolerance === undefined || tolerance <= 0) owes.push('no positive `tolerance`');
  if(!unit){
    owes.push('the total carries no `unit` — the running sum and the verdict then read "55 " with'
      + ' nothing after the space'
      + (units.size > 1 ? `, and the rows disagree about one (${[...units].join(', ')})` : ''));
  }

  const TELL = /\b(hidden|unlogged|unrecorded|unmeasured|unreported|visible|obvious)\b/i;
  for(const s of streams){
    if(s.label && TELL.test(s.label)){
      owes.push(`stream "${s.label}" says in its own label whether it is one of the obvious rows`
        + ' — the term that does not announce itself is the format; name it by what it is');
    }
  }

  const priced = streams.filter(s => s.value !== undefined);
  const complete = priced.length === streams.length && streams.length >= 3;
  const flow = priced.filter(s => s.countable !== false);
  if(complete && flow.length < 3){
    owes.push(`only ${flow.length} stream(s) count toward the ledger — a balance needs at least`
      + ' three that do');
  }
  // THE TRAP, half one. A ledger every term of which announces itself is
  // arithmetic. All eleven authored boards are in this state.
  const hidden = flow.filter(s => s.hidden);
  if(complete && !hidden.length){
    owes.push('no stream is marked `hidden` — a ledger whose every term announces itself is'
      + ' arithmetic, and the removal term that does not is the format');
  }
  if(complete && amount !== undefined && tolerance > 0){
    const all = flow.reduce((n, s) => n + s.value, 0);
    const obvious = flow.filter(s => !s.hidden).reduce((n, s) => n + s.value, 0);
    if(Math.abs(all - amount) > tolerance){
      owes.push(`the countable streams sum to ${+all.toFixed(2)} against a total of ${amount} —`
        + ' the ledger does not close even when everything is counted');
    }
    // THE TRAP, half two: the rows the player can already see close on their own.
    if(Math.abs(obvious - amount) <= tolerance){
      owes.push(`the streams that are not hidden already sum to ${+obvious.toFixed(2)}, inside the`
        + ` tolerance of ${amount} — leaving the hidden term out is not wrong, so nothing is`
        + ' learned by finding it');
    }
  }

  const pk = str(stop.payloadKey);
  if(pk && pk !== 'balance'){
    owes.push(`the payload is keyed \`${pk}\` rather than \`balance\` — check what was written`
      + ' straight after that name, because a value before the first key does not survive the parse');
  }

  return { key: 'balance', value: {
    total: {
      ...(amount !== undefined ? { amount } : {}),
      ...(unit ? { unit } : {}),
      ...(label ? { label } : {}),
    },
    streams,
    ...(tolerance !== undefined ? { tolerance } : {}),
    ...(str(pick(board, 'hint')) ? { hint: str(pick(board, 'hint')) } : {}),
    ...(str(pick(board, 'moral')) ? { moral: str(pick(board, 'moral')) } : {}),
    ...(str(pick(board, 'commit')) ? { commit: str(pick(board, 'commit')) } : {}),
  }, owes };
};

/* ------------------------------------------------------------------ selftest
 *
 * `node tools/bibleConvert/balance.mjs --selftest`
 *
 * The case that matters most is the last pair: a ledger that closes without its
 * hidden term has to be reported, and a ledger that does not has to be silent —
 * both with the streams in the order the bibles write them and with the hidden
 * row moved to the front, because a check that secretly means "the last stream"
 * would pass on all eleven boards in the repo and be wrong on the twelfth.
 */
const FIXTURE = () => ({
  total: 100,
  tolerance: 0.5,
  streams: [
    { id: 'visible_a', label: 'visible inflow', value: 72, counts: true, hidden: false },
    { id: 'visible_b', label: 'visible outflow', value: -41, counts: true, hidden: false },
    { id: 'visible_c', label: 'recorded storage change', value: 24, counts: true, hidden: false },
    { id: 'hidden_loss', label: 'unlogged removal', value: 45, counts: true, hidden: true },
  ],
  visibleSubtotal: 55,
  closedTotal: 100,
});

/**
 * The fixture with the two things the eight bibles never wrote — a unit, and
 * labels that do not say which rows are the obvious ones — so the rest can be
 * tested on its own.
 */
const WHOLE = () => {
  const f = FIXTURE();
  f.total = { amount: 100, unit: 'kg' };
  const named = ['feed line', 'product draw', 'tank gauge change', 'sludge hopper'];
  f.streams.forEach((s, i) => { s.label = named[i]; });
  return f;
};

function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convert(WHOLE());
  check('a complete board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema',
    r.key === 'balance' && r.value.total.amount === 100 && r.value.total.unit === 'kg'
    && r.value.streams.length === 4 && r.value.tolerance === 0.5,
    JSON.stringify(r.value).slice(0, 140));
  check('…with `counts: true` dropped rather than turned into `countable`',
    r.value.streams.every(s => s.countable === undefined));
  check('…and `hidden: false` dropped rather than written',
    r.value.streams.filter(s => s.hidden).length === 1);

  // The same ledger in a different order is the same ledger.
  const shuffled = WHOLE();
  shuffled.streams.reverse();
  const rs = convert(shuffled);
  check('the same ledger with its streams reversed owes exactly the same',
    rs.owes.length === 0, rs.owes.join(' | '));

  // THE TRAP: the visible rows already close.
  const closed = WHOLE();
  closed.total = { amount: 55, unit: 'kg' };
  closed.visibleSubtotal = 55; closed.closedTotal = 100;
  r = convert(closed);
  check('a ledger whose visible streams already close is reported',
    has(r, 'leaving the hidden term out is not wrong'), r.owes.join(' | '));

  // …and with the hidden row written first, so the check is not "the last one".
  const closedFront = WHOLE();
  closedFront.total = { amount: 55, unit: 'kg' };
  closedFront.streams.unshift(closedFront.streams.pop());
  r = convert(closedFront);
  check('…and the trap is read off `hidden`, not off position',
    has(r, 'leaving the hidden term out is not wrong'), r.owes.join(' | '));

  // A ledger 0.4 short of its total is inside a tolerance of 0.5 and must be quiet.
  const near = WHOLE();
  near.total = { amount: 100.4, unit: 'kg' };
  near.closedTotal = 100;
  r = convert(near);
  check('a ledger inside its own tolerance does not report a failure to close',
    !has(r, 'does not close'), r.owes.join(' | '));

  const open = WHOLE();
  open.total = { amount: 140, unit: 'kg' };
  open.closedTotal = 100;
  r = convert(open);
  check('a ledger that does not close even with everything counted is reported',
    has(r, 'does not close even when everything is counted'), r.owes.join(' | '));

  // REFUSE, DO NOT INVENT.
  const noUnit = FIXTURE();
  r = convert(noUnit);
  check('a total with no unit is owed one', has(r, 'no `unit`'), r.owes.join(' | '));
  check('…and gets no empty string written for it', r.value.total.unit === undefined);
  check('…and the scalar total is still reshaped into a record', r.value.total.amount === 100);

  const noTotal = WHOLE();
  delete noTotal.total;
  r = convert(noTotal);
  check('a board with no total is owed one', has(r, 'no numeric `total`'), r.owes.join(' | '));
  check('…and no amount is invented', r.value.total.amount === undefined);
  check('…and the arithmetic stays quiet rather than sum against nothing',
    !has(r, 'does not close') && !has(r, 'leaving the hidden term out'), r.owes.join(' | '));

  const noTol = WHOLE();
  delete noTol.tolerance;
  r = convert(noTol);
  check('a board with no tolerance is owed one', has(r, 'no positive `tolerance`'));
  check('…and gets no tolerance written', r.value.tolerance === undefined);

  const noHidden = WHOLE();
  noHidden.streams[3].hidden = false;
  noHidden.total = { amount: 100, unit: 'kg' };
  r = convert(noHidden);
  check('a ledger with nothing hidden is reported',
    has(r, 'no stream is marked `hidden`'), r.owes.join(' | '));
  check('…and nothing is marked hidden to fix it',
    r.value.streams.every(s => s.hidden === undefined));

  const noValue = WHOLE();
  delete noValue.streams[1].value;
  r = convert(noValue);
  check('a stream with no value is owed one', has(r, 'no numeric `value`'), r.owes.join(' | '));
  check('…and gets no zero written', r.value.streams[1].value === undefined);
  check('…and no sum is reported against a stream this tool decided was zero',
    !has(r, 'does not close') && !has(r, 'leaving the hidden term out'), r.owes.join(' | '));

  const noLabel = WHOLE();
  delete noLabel.streams[0].label;
  r = convert(noLabel);
  check('a stream with no label is owed one', has(r, 'no `label`'), r.owes.join(' | '));

  // The board's own stated subtotal, checked instead of copied.
  const drifted = WHOLE();
  drifted.visibleSubtotal = 58;
  r = convert(drifted);
  check('a stated subtotal that is not the sum of the visible rows is reported',
    has(r, 'subtotal 58 and they sum to 55'), r.owes.join(' | '));
  check('…and neither number is carried into the value',
    r.value.visibleSubtotal === undefined && r.value.closedTotal === undefined);

  // The template's own labels: three rows called "visible …" and a hidden one
  // called "unlogged removal".
  r = convert(FIXTURE());
  check('labels that say which rows are the obvious ones are reported',
    // Three of the four: "recorded storage change" names a quantity and passes.
    r.owes.filter(o => o.includes('says in its own label')).length === 3, r.owes.join(' | '));
  check('…and labels naming the equipment are not',
    !convert(WHOLE()).owes.some(o => o.includes('says in its own label')));

  const two = WHOLE();
  two.streams = two.streams.slice(0, 2);
  r = convert(two);
  check('a board with two streams is owed a third', has(r, 'at least three'), r.owes.join(' | '));

  const uncountable = WHOLE();
  uncountable.streams[2].counts = false;
  r = convert(uncountable);
  check('`counts: false` becomes `countable: false`', r.value.streams[2].countable === false);
  check('…and the row leaves the ledger, which then does not close',
    has(r, 'does not close even when everything is counted'), r.owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nBALANCE converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

/* ---------------------------------------------------- selftest: the payloads
 *
 * The pair that carries the file is the trap: a ledger whose visible rows
 * already close has to be reported, and one that does not has to be silent —
 * both with the hidden row written last, where all eleven bibles put theirs,
 * and with it written first, because a check that secretly means "the last
 * stream" would pass on every board in the repo.
 *
 * The second pair is the one this path added: a row whose `value` is a RANGE
 * rather than a number must be owed, not resolved to one of its ends. Putting
 * that bug back means taking `[28, 36]` as 28 and watching a ledger close on a
 * diameter the author never picked.
 */
const P_FIXTURE = () => ({
  target: { label: 'Tank ledger', value: 141, unit: 'kg' },
  tolerance: 0.5,
  streams: [
    { id: 'feed', label: 'Feed line', value: 72, unit: 'kg', count: true },
    { id: 'gauge', label: 'Tank gauge change', value: 24, unit: 'kg', count: true },
    { id: 'sludge', label: 'Sludge hopper', value: 45, unit: 'kg', count: true, hidden: true },
    { id: 'purity', label: 'Product purity', value: 0.98, unit: 'fraction', count: false,
      reason: 'a fraction, not a mass' },
  ],
});

function selftestPayload(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convertPayload(P_FIXTURE(), {});
  check('a whole payload board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema',
    r.key === 'balance' && r.value.total.amount === 141 && r.value.total.unit === 'kg'
    && r.value.total.label === 'Tank ledger' && r.value.streams.length === 4
    && r.value.streams[0].label === 'Feed line' && r.value.streams[0].value === 72
    && r.value.tolerance === 0.5, JSON.stringify(r.value).slice(0, 180));
  check('`count: false` becomes `countable: false`, and `count: true` writes nothing',
    r.value.streams[3].countable === false
    && r.value.streams.slice(0, 3).every(s => s.countable === undefined));
  check('a row\'s `reason` is carried as `unitNote`, which is shown only after it is read',
    r.value.streams[3].unitNote === 'a fraction, not a mass'
    && r.value.streams[3].note === undefined);

  // The same ledger in a different order is the same ledger.
  const shuffled = P_FIXTURE();
  shuffled.streams.unshift(shuffled.streams.splice(2, 1)[0]);
  r = convertPayload(shuffled, {});
  check('the same ledger with the hidden row written first owes exactly the same',
    r.owes.length === 0, r.owes.join(' | '));

  // THE TRAP: the visible rows already close.
  const closed = P_FIXTURE();
  closed.target = { label: 'Tank ledger', value: 96, unit: 'kg' };
  r = convertPayload(closed, {});
  check('a ledger whose visible rows already close is reported',
    has(r, 'leaving the hidden term out is not wrong'), r.owes.join(' | '));
  const closedFront = { ...shuffled, target: { label: 'Tank ledger', value: 96, unit: 'kg' } };
  r = convertPayload(closedFront, {});
  check('…and the trap is read off `hidden`, not off which row was written last',
    has(r, 'leaving the hidden term out is not wrong'), r.owes.join(' | '));

  // …and the state every one of the eleven authored boards is actually in.
  const nothingHidden = P_FIXTURE();
  delete nothingHidden.streams[2].hidden;
  r = convertPayload(nothingHidden, {});
  check('a ledger with no hidden row is reported',
    has(r, 'no stream is marked `hidden`'), r.owes.join(' | '));
  check('…and nothing is marked hidden to fix it',
    r.value.streams.every(s => s.hidden === undefined));
  check('…and the visible rows then close, which is reported as well',
    has(r, 'leaving the hidden term out is not wrong'), r.owes.join(' | '));

  // A NEGATIVE ROW IS A ROW. The signed ledger the wheel authors, which the
  // parser now hands over with its minus intact.
  const torque = {
    target: { label: 'Net torque', value: 0, unit: 'kN m' },
    tolerance: 2.0,
    streams: [
      { id: 'cw', label: 'Clockwise loaded gondolas', value: -126.0, count: true, hidden: true },
      { id: 'ccw', label: 'Counterclockwise loaded gondolas', value: 124.6, count: true },
      { id: 'axle', label: 'Axle friction moment', value: 0.2, count: true },
      { id: 'hub', label: 'Hub weight through axle', value: 0, count: false },
    ],
  };
  r = convertPayload(torque, {});
  check('a negative row keeps its sign and the ledger closes on it',
    r.value.streams[0].value === -126 && !has(r, 'does not close'), r.owes.join(' | '));

  // A RANGE IS NOT A ROW.
  const ranged = P_FIXTURE();
  ranged.streams[1].value = [28, 36];
  r = convertPayload(ranged, {});
  check('a row whose value is a range is owed one number',
    has(r, 'it carries a range of 2 numbers'), r.owes.join(' | '));
  check('…and neither end of the range is written as the value',
    r.value.streams[1].value === undefined);
  check('…and the arithmetic stays quiet rather than sum a ledger with a row missing',
    !has(r, 'does not close') && !has(r, 'leaving the hidden term out'), r.owes.join(' | '));

  // An authored `sign` the parser did NOT eat is applied to the row's own value.
  const signed = {
    target: { label: 'Reservoir ledger', value: 0, unit: 'million m^3' },
    tolerance: 0.05,
    streams: [
      { id: 'room', label: 'Head-room reading', value: 14, sign: 1, count: true },
      { id: 'turbine', label: 'Turbine draw', value: 3.6, sign: 1, count: true },
      { id: 'storm', label: 'Storm inflow', value: 17.6, sign: -1, count: true, hidden: true },
      { id: 'price', label: 'Power price', value: 0.4, count: false },
    ],
  };
  r = convertPayload(signed, {});
  check('an authored `sign: -1` is applied to the row\'s magnitude',
    r.value.streams[2].value === -17.6, JSON.stringify(r.value.streams));
  check('…and the ledger then closes, so nothing about the arithmetic is owed',
    !has(r, 'does not close') && !has(r, 'leaving the hidden term out'), r.owes.join(' | '));
  check('…and `sign: 1` does not flip anything', r.value.streams[0].value === 14);

  // Rows that are not one number each.
  const atoms = {
    target: { label: 'Normalized reactor interval' },
    streams: [
      { id: 'in_co2', label: 'CO2 in', atoms: { C: 100, O: 200 }, count: true },
      { id: 'in_h2', label: 'H2 in', atoms: { H: 640 }, count: true },
      { id: 'out_ch4', label: 'CH4 out', atoms: { C: 80, H: 320 }, count: true },
    ],
  };
  r = convertPayload(atoms, {});
  check('a row carrying atom counts instead of a value says so',
    r.owes.filter(o => o.includes('a count of atoms per element')).length === 3,
    r.owes.join(' | '));
  check('…and no value is invented for any of them',
    r.value.streams.every(s => s.value === undefined));
  check('…and the total, tolerance and hidden sentences do not pile on an arithmetic'
    + ' that cannot be done',
    has(r, 'no numeric `total`') && !has(r, 'no stream is marked `hidden`'), r.owes.join(' | '));

  const riemann = { streams: [{ id: 'left', label: 'Left sum', values: [120, 172.5] },
    { id: 'right', label: 'Right sum', values: [172.5, 210] },
    { id: 'trap', label: 'Trapezoid', values: [146.25, 191.25] }] };
  check('a row carrying a list of readings says so',
    convertPayload(riemann, {}).owes.some(o => o.includes('a list of readings rather than one')),
    convertPayload(riemann, {}).owes.join(' | '));

  // REFUSE, DO NOT INVENT.
  const noUnit = P_FIXTURE();
  noUnit.target = { label: 'Tank ledger', value: 141 };
  r = convertPayload(noUnit, {});
  check('a total with no unit whose rows disagree about one is owed it',
    r.value.total.unit === undefined && has(r, 'no `unit`'), r.owes.join(' | '));
  // …and it IS taken when they agree.
  const agreed = { target: { value: 141 }, tolerance: 0.5, streams: [
    { id: 'a', label: 'Feed line', value: 72, unit: 'kg', count: true },
    { id: 'b', label: 'Tank gauge change', value: 24, unit: 'kg', count: true },
    { id: 'c', label: 'Sludge hopper', value: 45, unit: 'kg', count: true, hidden: true }] };
  r = convertPayload(agreed, {});
  check('…rather than owed, when the rows all say the same one', r.value.total.unit === 'kg'
    && !has(r, 'no `unit`'), r.owes.join(' | '));
  const mixed = { target: { value: 141 }, tolerance: 0.5, streams: [
    { id: 'a', label: 'Actual output', value: 685.2, unit: 'billion RATE', count: true },
    { id: 'b', label: 'Oil cost index', value: 18, unit: 'index points', count: true },
    { id: 'c', label: 'Payment failures', value: 0.5, unit: 'percent', count: true }] };
  r = convertPayload(mixed, {});
  check('…and never when they disagree', r.value.total.unit === undefined
    && has(r, 'the rows disagree about one'), r.owes.join(' | '));

  const noTotal = P_FIXTURE();
  delete noTotal.target;
  r = convertPayload(noTotal, {});
  check('a board with no total is owed one', has(r, 'no numeric `total`'), r.owes.join(' | '));
  check('…and no amount is invented', r.value.total.amount === undefined);
  check('…and the arithmetic stays quiet rather than sum against nothing',
    !has(r, 'does not close') && !has(r, 'leaving the hidden term out'), r.owes.join(' | '));

  const asRequired = P_FIXTURE();
  delete asRequired.target;
  asRequired.required_total = 141;
  asRequired.unit = 'kg';
  r = convertPayload(asRequired, {});
  check('`required_total` with the unit on the board is the same total',
    r.value.total.amount === 141 && r.value.total.unit === 'kg' && r.owes.length === 0,
    r.owes.join(' | '));

  const noTol = P_FIXTURE();
  delete noTol.tolerance;
  r = convertPayload(noTol, {});
  check('a board with no tolerance is owed one', has(r, 'no positive `tolerance`'));
  check('…and gets none written', r.value.tolerance === undefined);

  const two = P_FIXTURE();
  two.streams = two.streams.slice(0, 2);
  r = convertPayload(two, {});
  check('a board with two streams is owed a third', has(r, 'at least three'), r.owes.join(' | '));

  const telling = P_FIXTURE();
  telling.streams[0].label = 'Visible inflow';
  telling.streams[2].label = 'Unlogged removal';
  r = convertPayload(telling, {});
  check('labels that say which rows are the obvious ones are reported',
    r.owes.filter(o => o.includes('says in its own label')).length === 2, r.owes.join(' | '));

  const trailing = P_FIXTURE();
  trailing._trailing = 'update reveals 4.235 m.';
  r = convertPayload(trailing, {});
  check('prose after the board is read out loud rather than dropped',
    has(r, '4.235 m'), r.owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nBALANCE payload converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY && process.argv.includes('--selftest')){ selftest(); console.log(); selftestPayload(); }
