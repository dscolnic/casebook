// sequence.mjs — the bible's authored SEQUENCE board into the importer's.
//
// One stop: carrying M3 S10, on ecological succession. There is no §7 board for
// SEQUENCE in any bible, so this module exports `convertCanonical` only — the
// fifth round wrote the board in the game's own vocabulary and it is two moves
// from the importer's.
//
// THE TWO MOVES.
//
// A SEQUENCE board is not a block on the stop; it is two keys ON the stop,
// `cards` and `order`, the way `sequence:` is nowhere in any shipped book. So
// the block is unwrapped rather than carried, and both keys are placed at stop
// level.
//
// And `order` is a list of POSITIONS, not of ids. Every shipped board writes
// `order: [0, 1, 2, 3]`; the bible writes `order: [disturbance, grasses, shrubs,
// later_secondary]`, which is the same fact in the ids it also uses for the
// cards. Translated by index. An id in the order that no card carries is named
// rather than dropped: a rail missing one of its steps is a puzzle that cannot
// be finished, and silently shortening it would make that unfindable.
//
// WHAT IS DROPPED, and why it is not owed. `comparisonReference` and
// `correctConclusion` are prose about the board — the first is the contrast the
// stop draws with primary succession, the second the verdict — and the stop
// already carries both, as its `why` and its answer text. A SEQUENCE board has
// no field for either, and inventing one would put an author's aside on a rail.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'SEQUENCE';

/** A position, not an id that happens to contain a digit. See the note below. */
const isIndex = (v) => typeof v === 'number' ? Number.isInteger(v)
  : (typeof v === 'string' && /^\d+$/.test(v.trim()));

export const convertCanonical = (b, stop = {}) => {
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const owes = [];

  const raw = list(pick(board, 'cards', 'steps'));
  const cards = [], ids = [];
  raw.forEach((c, i) => {
    const label = typeof c === 'string' ? c : str(pick(c ?? {}, 'label', 'text'));
    if(!label){
      owes.push(`card ${i + 1} has no label — a rail draws the words, and a blank card is a step`
        + ' the player cannot read');
      return;
    }
    cards.push(label);
    ids.push(typeof c === 'string' ? label : (str(pick(c, 'id')) || label));
  });
  if(cards.length < 3){
    owes.push(`the board authors ${cards.length} card(s), and a rail needs at least three to be an`
      + ' ordering rather than a pair');
  }

  const said = list(pick(board, 'order', 'correctOrder', 'correct_order'));
  const order = [];
  const stray = [];
  for(const entry of said){
    // A POSITION IS A NUMBER, NOT A STRING WITH A DIGIT IN IT. `num` reads the
    // digits out of anything, so a card id like `step2` would come back as 2 and
    // silently place the third card. Only a real number, or a string of nothing
    // but digits, is a position.
    if(isIndex(entry) && Number(entry) >= 0 && Number(entry) < cards.length){
      order.push(Number(entry));
      continue;
    }
    const at = ids.indexOf(str(entry));
    if(at < 0) stray.push(str(entry));
    else order.push(at);
  }
  if(stray.length){
    owes.push(`the order names \`${stray.join('`, `')}\`, which no card on this board carries — the`
      + ' rail is built from the cards, so a step naming none of them cannot be placed');
  }
  if(cards.length && order.length !== cards.length){
    owes.push(`the board authors ${cards.length} card(s) and an order of ${order.length} — every`
      + ' card goes on the rail exactly once, so the two lists are the same length');
  } else if(new Set(order).size !== order.length){
    owes.push('the order places one card twice, so another is never placed at all');
  }

  const value = cards;
  const extra = { order };
  const axis = str(pick(board, 'axis'));
  if(axis) extra.axis = axis;
  const ends = list(pick(board, 'ends')).map(str).filter(Boolean);
  if(ends.length === 2) extra.ends = ends;
  const said2 = str(pick(board, 'answerText', 'correctConclusion', 'correctResult'));
  if(said2 && !String(stop.answerText ?? '').trim()) extra.answerText = said2;

  return { key: 'cards', value, owes, extra };
};

// ------------------------------------------------------------------ selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };
  const FIX = () => ({
    cards: [{ id: 'a', label: 'A happens' }, { id: 'b', label: 'B happens' },
      { id: 'c', label: 'C happens' }, { id: 'd', label: 'D happens' }],
    order: ['a', 'b', 'c', 'd'],
  });

  let r = convertCanonical(FIX());
  ok(r.key === 'cards', 'the board is placed as the stop\'s own `cards`');
  ok(r.owes.length === 0, `a complete board owes nothing: ${r.owes.join(' | ')}`);
  ok(JSON.stringify(r.value) === '["A happens","B happens","C happens","D happens"]',
    JSON.stringify(r.value));
  ok(JSON.stringify(r.extra.order) === '[0,1,2,3]', JSON.stringify(r.extra.order));

  // THE CASE THE INDEX TRANSLATION EXISTS FOR. An order that is not the card
  // order has to come out as the positions of those cards, not as 0..n.
  const shuffled = FIX();
  shuffled.order = ['c', 'a', 'd', 'b'];
  r = convertCanonical(shuffled);
  ok(JSON.stringify(r.extra.order) === '[2,0,3,1]',
    `a reordered rail keeps its own order: ${JSON.stringify(r.extra.order)}`);
  ok(r.owes.length === 0, `and owes nothing: ${r.owes.join(' | ')}`);

  // And the two inputs that should score the same actually do: a board already
  // written in positions converts to the identical result.
  const byIndex = FIX();
  byIndex.order = [2, 0, 3, 1];
  ok(JSON.stringify(convertCanonical(byIndex).extra.order) === JSON.stringify(r.extra.order),
    'positions and ids describe one rail and convert to one answer');

  // THE BUG THAT COST BOTH CONVERTERS. `num('step2')` reads the digits out and
  // returns 2, so an id containing a digit was taken as a position and placed
  // the wrong card silently. Ids that look like numbers must still be ids.
  const digity = { cards: [{ id: 'step1', label: 'A' }, { id: 'step2', label: 'B' },
    { id: 'step3', label: 'C' }], order: ['step3', 'step1', 'step2'] };
  ok(JSON.stringify(convertCanonical(digity).extra.order) === '[2,0,1]',
    `an id with a digit in it is an id: ${JSON.stringify(convertCanonical(digity).extra.order)}`);
  ok(convertCanonical(digity).owes.length === 0,
    `and it owes nothing: ${convertCanonical(digity).owes.join(' | ')}`);

  const missing = FIX();
  missing.order = ['a', 'b', 'c', 'nowhere'];
  r = convertCanonical(missing);
  ok(r.owes.some(o => /nowhere/.test(o)), `an unplaceable step is named: ${r.owes.join(' | ')}`);

  const two = { cards: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }], order: ['a', 'b'] };
  ok(convertCanonical(two).owes.some(o => /at least three/.test(o)),
    'two cards is a pair, not an ordering');

  if(fails.length){ console.error(`SEQUENCE selftest: ${fails.length} failure(s)`); for(const f of fails) console.error('  ' + f); process.exitCode = 1; }
  else console.log('SEQUENCE selftest: ok');
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) selftest();
