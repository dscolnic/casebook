// ballpark.mjs — the bible's BALLPARK board into the importer's.
//
// 7 stops, across four campaigns. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// THE KEY IS `estimate`, NOT `ballpark`, and this file is the reason the contract
// has a `key` field at all. The bible heads the block `estimate:` and
// `tools/import-book.mjs` reads it off the stop as `s.estimate` — checked, not
// assumed. Returning it from the converter, which is where the bible's own block
// name is known, is what keeps a FORMAT→field table from becoming a second
// description of one fact that nothing would catch drifting.
//
// WHAT THE SEVEN BOARDS ACTUALLY SAY:
//
//   estimate:
//     target: 360.0
//     tolerance: 18.0
//     unit: "units printed on the card"
//     tiles: [{label: "displayed numerator", value: 720.0},
//             {label: "displayed divisor",   value: 2}]
//     formula: "displayed numerator / displayed divisor"
//     correctResultText: "`Vdrop=.360 V, …`"
//
// `target`, `tolerance` and `correctResultText` are per-stop and real: the seven
// targets are 360.0, 3.79, 1.1, 0.02, 40.0, 6.0 and 11400.0, each with a five per
// cent tolerance and each matching the stop's own worked answer. Everything else
// is one template repeated seven times, and it is a template that hands over the
// answer: the two tiles are always the target doubled and the number 2, so the
// number bank the player picks from prints the target. `questionUI.js` keeps a
// target off this panel on purpose — "the moment a target is on screen this stops
// being an estimate and becomes nudging a needle" — so the tiles are owed, not
// carried through with a straight face.
//
// WHAT `formula` AND `template` ARE, because the difference is why one of them is
// carried and the other is not. `formula` is a JavaScript expression over the
// slot letters `a`, `b`, `c` — `calculateBallpark` runs `return (a / b)` on the
// values the player placed. `template` is the printed row, with `{0}` and `{1}`
// where the slots go. The bible's formula is written in the tile LABELS, so it
// throws and the readout shows NaN; it is carried anyway, verbatim, because the
// author's intent is legible in it and a rewrite into slot letters is arithmetic
// this tool is not entitled to write. `template` the bible never wrote at all,
// and `ballparkBody` calls `.replace` on it, so an absent one is a crash rather
// than a wrong number. Both are owed by name.
//
// `correct` is the list of tile indices that belong in the slots, and it is the
// whole grade: `spec.correct` decides what the panel accepts, what the hint
// anchors on, and what the reasoning fold prints. No board writes it. The
// importer's own check passes it — `correct.length === (slots ?? correct.length)`
// is 0 === 0 — which is exactly the shape of gate this repo distrusts, so it is
// owed here whatever the importer says.
import { num, str, list, pick } from './_shared.mjs';

export const FORMAT = 'BALLPARK';

// "units printed on the card" is an instruction to whoever finishes the board,
// not a unit. Written onto `spec.units` it would appear beside the readout and
// beside the player's own answer text.
const STOCK_UNIT = /printed on the card|^units?$/i;
// The two tiles every one of the seven boards ships.
const STOCK_TILE = /^displayed (numerator|divisor)$/i;
// The engine's slot letters. A formula the panel can run mentions no tile label.
const SLOT_EXPR = /^[a-h\d\s+\-*/().,eE]+$/;

export const convert = (b) => {
  const owes = [];

  const target = num(pick(b, 'target'));
  if(target === undefined) owes.push('no numeric `target`');
  const tolerance = num(pick(b, 'tolerance'));
  if(tolerance === undefined) owes.push('no `tolerance` — the width the estimate is allowed to be off by');

  // ---- the tiles. `tiles: [{label, value}]` in the bible; two parallel lists in
  // the importer, because the panel indexes labels and values by the same number.
  const tiles = list(pick(b, 'tiles', 'items'));
  const labels = [], values = [];
  tiles.forEach((t, i) => {
    const label = str(t?.label);
    // A TILE IS A NUMBER, and `num()` is too willing here: it strips everything
    // that is not a digit, so the tile written `"2^10 = 1024"` — an expression,
    // authored where a value goes — comes back as 2,101,024 and lands on the
    // bank as a plausible quantity nobody wrote. A tile the player drops into
    // the row has to be the number itself.
    const value = tileNumber(t?.value);
    if(!label) owes.push(`tile ${i + 1} has no \`label\``);
    if(value === undefined) owes.push(`tile ${i + 1} has no numeric \`value\``);
    labels.push(label);
    values.push(value);
  });
  if(!tiles.length) owes.push('no `tiles` — the number bank the player picks from');

  // THE TILES PRINT THE ANSWER. Two stock tiles whose first value is the target
  // doubled: the bank reads "displayed numerator = 2 × target" and "displayed
  // divisor = 2", so a player who never reads the card can halve the one number
  // on screen. The board hands over the answer as a printed target, which is the
  // one thing this panel exists not to do.
  const stock = tiles.length === 2 && labels.every(l => STOCK_TILE.test(l));
  if(stock){
    const doubled = target !== undefined && values[0] !== undefined
      && Math.abs(values[0] - 2 * target) <= Math.max(1e-9, Math.abs(target) * 1e-6);
    owes.push('the tiles are the template\'s "displayed numerator" and "displayed divisor"'
      + (doubled ? ', and the numerator is the target doubled — the number bank prints the answer' : '')
      + ' — name the quantities this estimate is actually built out of');
  }

  // ---- the slots and the grade.
  const correct = list(pick(b, 'correct', 'correctTiles')).map(num).filter(v => v !== undefined);
  if(!correct.length){
    owes.push('no `correct` — which tiles belong in the slots, which is the whole of how the'
      + ' panel grades (and `slots` with it)');
  } else {
    correct.forEach(i => { if(!(i >= 0 && i < values.length)){
      owes.push(`\`correct\` names tile index ${i}, and the board has ${values.length} tile(s)`);
    } });
  }
  const slots = num(pick(b, 'slots'));

  // ---- the two strings the panel computes and prints with.
  const formula = str(pick(b, 'formula'));
  if(!formula) owes.push('no `formula` — the expression the panel evaluates');
  else if(!SLOT_EXPR.test(formula)){
    owes.push(`the \`formula\` is written as "${formula}" — in tile names rather than the engine's`
      + ' slot letters (`a / b`), so the readout evaluates to NaN');
  }
  const template = str(pick(b, 'template'));
  if(!template){
    owes.push('no `template` — the printed row with `{0}` and `{1}` where the slots go;'
      + ' the panel calls `.replace` on it and an absent one is a crash, not a wrong number');
  }

  // ---- units. Carried only when the bible wrote one, never the placeholder.
  const units = str(pick(b, 'units', 'unit'));
  const realUnits = units && !STOCK_UNIT.test(units) ? units : '';
  if(!units) owes.push('no `units`');
  else if(!realUnits){
    owes.push(`\`unit\` reads "${units}", which is an instruction to whoever finishes the board`
      + ' rather than a unit — it would be printed beside the readout');
  }

  // `correctResultText` is the worked answer, and `solution` is where the engine
  // shows one: after the verdict, in the compare box and the reasoning fold, never
  // on the live panel. So this one is a straight rename.
  const solution = str(pick(b, 'solution', 'correctResultText'));
  if(!solution) owes.push('no `correctResultText` — the worked answer shown after the verdict');

  return { key: 'estimate', value: {
    ...(target !== undefined ? { target } : {}),
    ...(tolerance !== undefined ? { tolerance } : {}),
    ...(realUnits ? { units: realUnits } : {}),
    ...(tiles.length ? { labels, values } : {}),
    ...(correct.length ? { correct } : {}),
    ...(slots !== undefined ? { slots } : {}),
    ...(formula ? { formula } : {}),
    ...(template ? { template } : {}),
    ...(solution ? { solution } : {}),
  }, owes };
};

/* -------------------------------------------- handback 3's canonical board
 *
 * Eleven stops carry a `Handback 3 canonical interaction block — BALLPARK:`.
 * Four of the eleven were BALLPARK all along; the other seven were BALANCE, and
 * they are here because the author CHANGED THE FORMAT rather than re-authored
 * the board. The previous handback reported that all eleven BALANCE boards were
 * visible arithmetic with no hidden stream, which is the one thing BALANCE
 * exists for, so the label moved.
 *
 * IT IS THE WRONG LABEL, and this is the finding rather than the conversion.
 * BALLPARK is a number bank: the player picks tiles, drops them into slots, a
 * formula over the slot letters computes a readout, and the readout is compared
 * against a hidden target within a tolerance. It needs `target`, `tolerance`,
 * `labels`/`values`, `correct`, `slots`, `formula` and `template`. Not one of
 * the eleven canonical boards carries a single one of them. What they carry is:
 *
 *   estimate:
 *     quantity: "<the task sentence, which is the stop's `question` again>"
 *     unit: "billion RATE and index points"
 *     inputsSource: "`balance:{streams:[…],correct:{…},answerText:\"…\"}`"
 *     formula: "Use only the visible values and operation stated in the question."
 *     start: 0
 *     correctResult: "−38b; no trigger."
 *     toleranceRule: "Apply the precision stated in the stop."
 *     commonMistake: "Mixing a contextual reading into the arithmetic…"
 *
 * — one template eleven times, with `quantity` and `correctResult` per stop and
 * everything else identical. `formula` and `toleranceRule` are instructions to
 * whoever finishes the board, in the slots where the panel expects an expression
 * and a number. And in five of the eleven, `inputsSource` carries the stop's
 * ORIGINAL BALANCE payload, verbatim, as a quoted string: the streams, their
 * values, which of them count, and the worked total. The numbers are all there.
 * They are in a string, under a key nothing reads, in a board typed as the one
 * format that cannot use a stream ledger.
 *
 * So the eleven are further from playable than the seven §7 boards above, which
 * at least authored a target and a tolerance. This converter carries the two
 * fields that are genuine renames and names the rest — including the payload
 * sitting in `inputsSource`, because a number the author wrote down is worth
 * reading out loud even when this tool may not place it.
 *
 * THE TWO RENAMES. `unit` → `units`, subject to the same placeholder rule as
 * the §7 path. `correctResult` → `solution`, which is the worked answer the
 * engine shows after the verdict and never on the live panel.
 *
 * NOT CARRIED. `quantity` is the stop's own `question` written again, and the
 * panel's `prompt` is the line above the number bank rather than the task.
 * `start: 0` has no slot — the panel starts with empty slots, and there is no
 * needle to place. `commonMistake` is wrong-path feedback and the stop already
 * carries that; writing it into the board would print it beside the readout.
 *
 * And the stock `formula`, which is the one place this path deliberately does
 * LESS than the §7 path above. That one carries "displayed numerator / displayed
 * divisor" through verbatim, because the author's arithmetic is legible in it
 * and rewriting it into slot letters would be this tool doing algebra. "Use only
 * the visible values and operation stated in the question" is not an expression
 * with a mistake in it; it is a note to whoever finishes the board, and putting
 * it where `calculateBallpark` will call `eval` on it hides the missing formula
 * behind a thrown one.
 */

// The instruction the eleven wrote where an expression and a number belong.
const STOCK_FORMULA = /^use only the visible values/i;
const STOCK_TOLERANCE = /^apply the precision stated/i;
// `inputsSource: "`balance:{…}`"` — the original payload, kept as prose.
const CARRIED_PAYLOAD = /^\s*`?\s*([a-z_]+)\s*:\s*[{[]/i;

/**
 * THE FIFTH ROUND WRITES AN ESTIMATE, NOT A TILE BANK, and eleven stops turn on
 * reading it.
 *
 * What it authors is the arithmetic: a `quantity`, its `unit`, the readings that
 * go into it as `inputs` (some marked `contextOnly`, which is the distractor),
 * the `operation` in words, the `formula` with the actual numbers in it, a
 * numeric `correctResult` and a `tolerance`. What the panel needs is a bank of
 * number tiles — `labels`, `values`, `slots`, `correct`, `template` — and every
 * one of those is derivable from the block without deciding anything.
 *
 * THE TEMPLATE IS READ OFF THE FORMULA, which is the only part worth explaining.
 * `formula: "320 / 4"` becomes `"{0} / {1}"` by replacing each number with the
 * slot of the input that carries it, left to right. A number the formula uses
 * and no input carries stays a literal: Safety Factor divides by 1000 to reach
 * kilonewtons, and 1000 is a unit conversion rather than a reading off the
 * board, so `[({0} + {1}×{2})×{3}]/{4}/1000` is the honest template. Turning it
 * into a sixth tile would put a number on the board that nobody measured.
 *
 * An input is spent when it is used, so two readings that happen to share a
 * value fill two slots rather than one twice.
 */
const NUMBER = /-?\d+(?:\.\d+)?/g;

const fromEstimate = (board, stop, owes) => {
  const inputs = list(pick(board, 'inputs'));
  const labels = [], values = [];
  inputs.forEach((it, i) => {
    const label = str(pick(it, 'label'));
    const v = num(pick(it, 'value'));
    const unit = str(pick(it, 'unit'));
    if(!label || v === undefined){
      owes.push(`input ${i + 1} needs a label and a numeric \`value\` — a tile with neither is a`
        + ' blank the player can still place');
      return;
    }
    // The shipped convention, and it is load-bearing: the importer reads the
    // number off the caption and refuses a tile whose words and value disagree.
    labels.push(`${v}${unit ? ` ${unit}` : ''}  (${label})`);
    values.push(v);
  });

  const formula = str(pick(board, 'formula'));
  let template = '', correct = [];
  if(!formula){
    owes.push('no `formula` — the printed row the player fills in is read off it, and the'
      + ' `operation` sentence names the steps in words rather than in numbers');
  } else {
    const spent = new Set();
    correct = [];
    template = formula.replace(NUMBER, (tok) => {
      const want = Number(tok);
      const at = values.findIndex((v, i) => !spent.has(i) && Math.abs(v - want) <= Math.max(1e-9, Math.abs(want) * 1e-9));
      if(at < 0) return tok;                    // a constant, not a reading — see above
      spent.add(at);
      correct.push(at);
      return `{${correct.length - 1}}`;
    });
    if(!correct.length){
      owes.push(`the formula "${formula}" uses no number that any input carries, so no tile on the`
        + ' board can be placed into it');
    }
  }

  const target = num(pick(board, 'correctResult', 'target'));
  if(target === undefined) owes.push('no numeric `correctResult` — the number the estimate is graded against');
  const tolerance = num(pick(board, 'tolerance'));
  if(tolerance === undefined) owes.push('no numeric `tolerance` — the width the estimate may be off by');

  const value = {
    ...(str(pick(board, 'operation')) ? { prompt: str(pick(board, 'operation')) } : {}),
    question: str(pick(board, 'quantity')) || str(stop.question ?? ''),
    labels, values, slots: correct.length, template, formula,
    correct,
    ...(target !== undefined ? { target } : {}),
    ...(tolerance !== undefined ? { tolerance } : {}),
    units: str(pick(board, 'unit', 'units')),
    ...(str(pick(board, 'commonMistake')) ? { explanation: str(pick(board, 'commonMistake')) } : {}),
  };
  return { key: 'estimate', value, owes };
};

/** A tile's value: a number, or a string that is only a number. */
const NUMERIC_ONLY = /^[+-]?\d[\d,]*(\.\d+)?([eE][+-]?\d+)?$/;
const tileNumber = (v) => {
  if(typeof v === 'number') return Number.isFinite(v) ? v : undefined;
  const t = str(v);
  return NUMERIC_ONLY.test(t) ? Number(t.replace(/,/g, '')) : undefined;
};

export const convertCanonical = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};

  // The fifth round's shape, told apart by the one field the tile bank never
  // has: an `inputs` list. See the note above.
  if(list(pick(board, 'inputs')).length && !list(pick(board, 'tiles', 'items')).length){
    return fromEstimate(board, stop, owes);
  }

  // ---- the two numbers the panel grades on.
  const target = num(pick(board, 'target'));
  if(target === undefined) owes.push('no numeric `target`');
  const tolerance = num(pick(board, 'tolerance'));
  const toleranceRule = str(pick(board, 'toleranceRule'));
  if(tolerance === undefined){
    owes.push('no `tolerance` — the width the estimate is allowed to be off by'
      + (toleranceRule && STOCK_TOLERANCE.test(toleranceRule)
        ? `; \`toleranceRule\` reads "${toleranceRule}", which is an instruction to whoever`
          + ' finishes the board rather than a width' : ''));
  }

  // ---- the number bank. A tile is `{label, value}` in every bible but one;
  //      Whiteout writes the bank as two parallel lists, which is the importer's
  //      own shape (`labels: [...]`, `values: [...]`) and was read as no bank at
  //      all — so a board with two tiles on it was refused for having none.
  //      Zipped here rather than downstream, so everything below sees one shape.
  const parallel = list(pick(board, 'labels'));
  const tiles = list(pick(board, 'tiles', 'items')).length
    ? list(pick(board, 'tiles', 'items'))
    : parallel.map((label, i) => ({ label, value: list(pick(board, 'values'))[i] }));
  const labels = [], values = [];
  tiles.forEach((t, i) => {
    const label = str(t?.label);
    // See `tileNumber` — an expression written where a value goes is not a
    // number, however many digits are in it.
    const value = tileNumber(t?.value);
    if(!label) owes.push(`tile ${i + 1} has no \`label\``);
    if(value === undefined){
      owes.push(`tile ${i + 1} has no numeric \`value\``
        + (str(t?.value) ? ` — it reads "${str(t?.value)}", which is an expression rather than the`
          + ' number the player drops into the row' : ''));
    }
    labels.push(label);
    values.push(value);
  });
  if(!tiles.length){
    owes.push('no `tiles` — the number bank the player picks from, which is the panel;'
      + ' without it there is nothing on screen to place and nothing to compute');
  }

  // ---- the grade.
  const correct = list(pick(board, 'correct', 'correctTiles')).map(num).filter(v => v !== undefined);
  if(!correct.length){
    owes.push('no `correct` — which tiles belong in the slots, which is the whole of how the'
      + ' panel grades (and `slots` with it)');
  } else {
    correct.forEach(i => { if(!(i >= 0 && i < values.length)){
      owes.push(`\`correct\` names tile index ${i}, and the board has ${values.length} tile(s)`);
    } });
  }
  // `slots` is how many blanks the row has. A board that names them —
  //      `slots: ["maximum binary-search midpoint checks"]` — has said the same
  //      thing and one more, and the count is its length. The names have nowhere
  //      to print: the panel labels a blank by the tile dropped into it.
  const rawSlots = pick(board, 'slots');
  const slots = num(rawSlots) ?? (Array.isArray(rawSlots) ? rawSlots.length : undefined);

  // ---- the two strings the panel computes and prints with.
  const formula = str(pick(board, 'formula'));
  if(!formula) owes.push('no `formula` — the expression the panel evaluates');
  else if(STOCK_FORMULA.test(formula)){
    owes.push(`the \`formula\` reads "${formula}" — an instruction to whoever finishes the board,`
      + " in the slot where the panel expects an expression over its slot letters (`a / b`)");
  } else if(!SLOT_EXPR.test(formula)){
    owes.push(`the \`formula\` is written as "${formula}" — in tile names rather than the engine's`
      + ' slot letters (`a / b`), so the readout evaluates to NaN');
  }
  // THE ROW THE PANEL PRINTS. Its blanks are `{0}` and `{1}`, and a board that
  //      names them instead — "about {checks} checks" — is the same row with the
  //      slots called by what they hold. Numbered here in the order they first
  //      appear, which is the order the slots are in. A named blank left alone
  //      is never replaced, so the row prints the word "{checks}" at the player.
  const rawTemplate = str(pick(board, 'template'));
  let template = rawTemplate;
  if(rawTemplate && !/\{\d+\}/.test(rawTemplate)){
    const seen = [];
    template = rawTemplate.replace(/\{([A-Za-z_][\w]*)\}/g, (_, name) => {
      if(!seen.includes(name)) seen.push(name);
      return `{${seen.indexOf(name)}}`;
    });
  }
  // AND WHERE THE ROW IS AN INSTRUCTION, THE FORMULA IS THE ROW. Overwind writes
  // `template: "Use the labeled quantities to fill 2 blanks."` — a note to
  // whoever finishes the board — beside `formula: a/b`, which is the same row
  // in the engine's own slot letters. Five boards, all complete apart from this,
  // and the panel calls `.replace` on the template, so an instruction there is a
  // row that prints the instruction whatever the player picks. The letters map
  // to the slots by position, which is what the formula means; nothing is
  // invented and a board that writes a real row keeps it.
  if(template && !/\{\d+\}/.test(template) && formula && SLOT_EXPR.test(formula)){
    const built = formula.replace(/\b([a-h])\b/g, (_, ch) => `{${ch.charCodeAt(0) - 97}}`);
    if(/\{\d+\}/.test(built)){
      template = built;
      owes.push(`the \`template\` reads "${rawTemplate}", which is an instruction to whoever`
        + ` finishes the board rather than the row the panel prints; the formula has been set as`
        + ` the row ("${built}") so the board works, and a written one would read better`);
    }
  }
  if(!template){
    owes.push('no `template` — the printed row with `{0}` and `{1}` where the slots go;'
      + ' the panel calls `.replace` on it and an absent one is a crash, not a wrong number');
  } else if(!/\{\d+\}/.test(template)){
    owes.push(`the \`template\` reads "${template}" and has no blank in it — the panel replaces`
      + ' `{0}` and `{1}` with the tiles the player places, and a row with nothing to replace'
      + ' prints the same words whatever is picked');
  }

  // ---- the two renames.
  const units = str(pick(board, 'units', 'unit'));
  const realUnits = units && !STOCK_UNIT.test(units) ? units : '';
  if(!units) owes.push('no `units`');
  else if(!realUnits){
    owes.push(`\`unit\` reads "${units}", which is an instruction to whoever finishes the board`
      + ' rather than a unit — it would be printed beside the readout');
  }
  const solution = str(pick(board, 'solution', 'correctResult', 'correctResultText'));
  if(!solution) owes.push('no `correctResult` — the worked answer shown after the verdict');

  // ---- the numbers that are here and cannot be placed from here.
  const source = str(pick(board, 'inputsSource', 'authoredPayload'));
  const carried = source.match(CARRIED_PAYLOAD);
  if(carried){
    owes.push(`\`inputsSource\` carries this stop's original \`${carried[1]}\` payload as a quoted`
      + ' string — the streams, their values and the worked total are all in there, in a field'
      + ' nothing reads, on a board typed as the one format that cannot use a ledger. Either'
      + ' re-author it as a number bank with a target, or put the format back');
  }

  return { key: 'estimate', value: {
    ...(target !== undefined ? { target } : {}),
    ...(tolerance !== undefined ? { tolerance } : {}),
    ...(realUnits ? { units: realUnits } : {}),
    ...(tiles.length ? { labels, values } : {}),
    ...(correct.length ? { correct } : {}),
    ...(slots !== undefined ? { slots } : {}),
    ...(formula && !STOCK_FORMULA.test(formula) ? { formula } : {}),
    ...(template ? { template } : {}),
    ...(solution ? { solution } : {}),
  }, owes };
};

// ---------------------------------------------------------------- selftest
//
// `node tools/bibleConvert/ballpark.mjs`. The case that matters is the second:
// pull one field and it must appear in `owes` and must NOT appear in `value`.
function selftest(){
  const fails = [];
  const ok = (cond, what) => { if(!cond) fails.push(what); };

  const complete = {
    target: 11400, tolerance: 570, unit: 'kJ',
    tiles: [{ label: 'coolant mass, 190 kg', value: 190 },
            { label: 'specific heat, 4.18 kJ/kg·K', value: 4.18 },
            { label: 'temperature rise, 14.4 K', value: 14.4 },
            { label: 'coolant loop count, 3', value: 3 }],
    correct: [0, 1, 2], slots: 3,
    formula: 'a * b * c', template: '{0} × {1} × {2}',
    correctResultText: '11,400 kJ or 11.4 MJ; tolerance ±2%.',
  };
  const a = convert(complete);
  ok(a.key === 'estimate', `key is "${a.key}" — BALLPARK's board is called estimate`);
  ok(a.owes.length === 0, `complete board owes ${a.owes.length}: ${a.owes.join(' / ')}`);
  ok(a.value.labels.length === a.value.values.length, 'labels and values do not line up');
  ok(a.value.solution.startsWith('11,400'), '`correctResultText` did not become `solution`');

  // One field out, and only that field.
  const short = structuredClone(complete);
  delete short.correct;
  const c = convert(short);
  ok(c.owes.some(o => /no `correct`/.test(o)), `a missing \`correct\` is not owed: ${c.owes.join(' / ')}`);
  ok(!('correct' in c.value), '`correct` was invented into value');
  ok(c.owes.length === 1, `pulling one field owes ${c.owes.length} things: ${c.owes.join(' / ')}`);
  ok(c.value.target === 11400, 'a field that was fine changed');

  // A placeholder unit is owed and does not reach the panel.
  const ph = structuredClone(complete);
  ph.unit = 'units printed on the card';
  const d = convert(ph);
  ok(d.owes.some(o => /instruction to whoever finishes the board/.test(o)), 'a placeholder unit is not owed');
  ok(!('units' in d.value), 'the placeholder unit was written into value');

  // A formula in tile names is carried, and named as unrunnable.
  const f = convert({ ...complete, formula: 'displayed numerator / displayed divisor' });
  ok(f.owes.some(o => /slot letters/.test(o)), 'a prose formula is not owed');
  ok(f.value.formula === 'displayed numerator / displayed divisor',
    'the authored formula was rewritten rather than carried');

  // The seven shipping boards, exercising the tells on the thing they were
  // written for rather than on a case invented to match them.
  const shipped = convert({
    target: 360.0, tolerance: 18.0, unit: 'units printed on the card',
    tiles: [{ label: 'displayed numerator', value: 720.0 }, { label: 'displayed divisor', value: 2 }],
    formula: 'displayed numerator / displayed divisor',
    correctResultText: '`Vdrop=.360 V, Vrecord=-3.840 V, P=1.08 mW.`',
  });
  ok(shipped.owes.some(o => /the target doubled — the number bank prints the answer/.test(o)),
    `the answer-printing tiles are not owed: ${shipped.owes.join(' / ')}`);
  ok(shipped.owes.some(o => /no `correct`/.test(o)), 'the missing grade is not owed');
  ok(shipped.owes.some(o => /no `template`/.test(o)), 'the missing template is not owed');
  ok(!('units' in shipped.value) && !('correct' in shipped.value) && !('template' in shipped.value),
    'a shipping board got a field the bible did not author');
  ok(shipped.value.target === 360 && shipped.value.tolerance === 18,
    'the two fields the bible did author did not come through');

  console.log(fails.length ? `BALLPARK selftest: ${fails.length} FAILED\n  ${fails.join('\n  ')}`
    : 'BALLPARK selftest: ok');
  return fails.length;
}

// ------------------------------------------------- selftest: the canonical
//
// Two cases carry this one. THE RENAMES have to happen — `unit` becomes `units`
// and `correctResult` becomes `solution` — and NOTHING ELSE MAY. Put the bug
// back by writing `tolerance: 0` for the stock `toleranceRule`, or by carrying
// the stock `formula` through, and the "nothing the board did not author" pair
// goes red on its own while the rename pair stays green.
//
// And the equal-inputs case, which is the third: the eleven shipping boards
// differ only in `quantity` and `correctResult`, so two of them must owe the
// same list. A check that quietly keyed on anything else would pass on all
// eleven and be wrong the first time a board is finished.
function selftestCanonical(){
  const fails = [];
  const ok = (cond, what) => { if(!cond) fails.push(what); };

  // The template, as eleven stops shipped it.
  const SHIPPED = (over = {}) => ({
    quantity: 'Select all six readings, calculate gap `682−720`, and submit conclusion.',
    unit: 'billion RATE and percent',
    inputsSource: '`balance:{streams:[{id:"actual_output",value:682,counts:true}],'
      + 'correct:{gap:-38},answerText:"a 38-billion recessionary gap"}`',
    formula: 'Use only the visible values and operation stated in the question.',
    start: 0,
    correctResult: '−38b; no trigger.',
    toleranceRule: 'Apply the precision stated in the stop.',
    commonMistake: 'Mixing a contextual reading into the arithmetic or reversing the subtraction.',
    ...over,
  });

  const s = convertCanonical(SHIPPED(), {});
  ok(s.key === 'estimate', `key is "${s.key}" — BALLPARK's board is called estimate`);

  // THE RENAMES, and they are the only things that come through.
  ok(s.value.units === 'billion RATE and percent', '`unit` did not become `units`');
  ok(s.value.solution === '−38b; no trigger.', '`correctResult` did not become `solution`');
  ok(Object.keys(s.value).sort().join(',') === 'solution,units',
    `the canonical board wrote ${Object.keys(s.value).join(', ')} — only the two renames may come`
    + ' through, everything else is owed');

  // The panel cannot be built, and each missing piece is named by its own name.
  for(const bit of [/no numeric `target`/, /no `tolerance`/, /no `tiles`/, /no `correct`/,
    /no `template`/]){
    ok(s.owes.some(o => bit.test(o)), `the canonical board does not owe ${bit}: ${s.owes.join(' / ')}`);
  }
  ok(s.owes.some(o => /^the `formula` reads .* an instruction to whoever finishes/.test(o)),
    `the stock formula is not named as an instruction: ${s.owes.join(' / ')}`);
  ok(!('formula' in s.value),
    'the stock formula was written into value, where `calculateBallpark` would throw on it');
  ok(s.owes.some(o => /`toleranceRule` reads/.test(o)),
    `the stock toleranceRule is not named beside the missing tolerance: ${s.owes.join(' / ')}`);
  ok(!('tolerance' in s.value), 'a tolerance was invented from `toleranceRule`');

  // THE PAYLOAD IN A STRING. The numbers are there; this tool may not place them.
  ok(s.owes.some(o => /original `balance` payload as a quoted/.test(o)),
    `the carried BALANCE payload is not read out: ${s.owes.join(' / ')}`);
  const noSource = convertCanonical(SHIPPED({
    inputsSource: 'No structured payload was present; this block supplies it.' }), {});
  ok(!noSource.owes.some(o => /quoted/.test(o)),
    'a board whose `inputsSource` carries no payload was reported as if it did');
  ok(noSource.owes.length === s.owes.length - 1,
    `the two boards differ by more than the carried payload: ${noSource.owes.length}`
    + ` vs ${s.owes.length}`);

  // EQUAL INPUTS SCORE EQUAL: two shipping boards that differ only in the two
  // per-stop fields owe exactly the same list.
  const other = convertCanonical(SHIPPED({
    quantity: 'Toggle relevant readings and submit the model conclusion.',
    correctResult: 'The keyed result shown by the completed interaction.' }), {});
  ok(other.owes.join('|') === s.owes.join('|'),
    'two shipping boards differing only in `quantity` and `correctResult` owe different lists');

  // A FINISHED BOARD, so the refusals above are not the only thing this path can
  // do — the same fields in the same names, and it owes nothing.
  const done = convertCanonical({
    target: 158.76, tolerance: 4, unit: 'kN',
    tiles: [{ label: 'empty-ship mass, 12000 kg', value: 12000 },
            { label: 'rider mass, 4200 kg', value: 4200 },
            { label: 'g, 9.80 m/s²', value: 9.8 }],
    correct: [0, 1, 2], slots: 3,
    formula: '(a + b) * c / 1000', template: '({0} + {1}) × {2} ÷ 1000',
    correctResult: 'Total 158.76 kN; each support 79.38 kN.',
  }, {});
  ok(done.owes.length === 0, `a finished canonical board owes ${done.owes.length}:`
    + ` ${done.owes.join(' / ')}`);
  ok(done.value.target === 158.76 && done.value.correct.join(',') === '0,1,2'
    && done.value.formula === '(a + b) * c / 1000' && done.value.units === 'kN',
    `a finished canonical board did not come through: ${JSON.stringify(done.value)}`);

  // One field out, and only that field.
  const short = structuredClone({
    target: 158.76, tolerance: 4, unit: 'kN',
    tiles: [{ label: 'empty-ship mass, 12000 kg', value: 12000 },
            { label: 'rider mass, 4200 kg', value: 4200 },
            { label: 'g, 9.80 m/s²', value: 9.8 }],
    correct: [0, 1, 2], slots: 3,
    formula: '(a + b) * c / 1000', template: '({0} + {1}) × {2} ÷ 1000',
    correctResult: 'Total 158.76 kN.',
  });
  delete short.template;
  const t = convertCanonical(short, {});
  ok(t.owes.length === 1 && /no `template`/.test(t.owes[0]),
    `pulling the template owes ${t.owes.length} things: ${t.owes.join(' / ')}`);
  ok(!('template' in t.value), 'a template was invented into value');
  ok(t.value.target === 158.76, 'a field that was fine changed');

  // ---------------------------------- the bank written as two parallel lists
  //
  // Whiteout's Mission 10, cut down. Each case below fails if the reading it
  // checks is put back: the bank disappears, the slot count becomes undefined,
  // and the row keeps a blank the panel never replaces.
  const w = convertCanonical({
    labels: ['table size', 'halving relationship'],
    values: [1024, '2^10 = 1024'],
    slots: ['maximum binary-search midpoint checks'],
    template: 'about {checks} checks',
    formula: 'checks ≈ log2(1024)',
    correct: 10, target: 10, tolerance: 1,
  }, {});
  ok(w.value.labels?.length === 2, `a parallel bank converted ${w.value.labels?.length} tile(s)`);
  ok(w.value.labels?.[0] === 'table size', 'a parallel label did not reach the bank');
  ok(w.value.values?.[0] === 1024, 'a parallel value did not reach the bank');
  ok(!w.owes.some(o => /no `tiles`/.test(o)),
    `a board with a bank was owed one anyway: ${w.owes.join(' / ')}`);
  ok(w.value.slots === 1, `named slots came out as ${JSON.stringify(w.value.slots)}, not a count`);
  ok(w.value.template === 'about {0} checks', `the row reads "${w.value.template}"`);
  ok(!w.owes.some(o => /has no blank in it/.test(o)), 'a numbered row was reported as blankless');
  // The second tile is not a number, and that is the board's own defect.
  ok(w.owes.some(o => /tile 2 has no numeric `value`/.test(o)),
    `a non-numeric tile value is not owed: ${w.owes.join(' / ')}`);
  // …and `correct: 10` is a target, not a tile index, which is the board's too.
  ok(w.owes.some(o => /names tile index 10/.test(o)),
    `an out-of-range \`correct\` is not owed: ${w.owes.join(' / ')}`);

  // A row with no blank at all is reported rather than silently printed.
  const blankless = convertCanonical({ template: 'about ten checks', target: 1, tolerance: 1,
    labels: ['a'], values: [1] }, {});
  ok(blankless.owes.some(o => /has no blank in it/.test(o)),
    `a row with no slot is not owed: ${blankless.owes.join(' / ')}`);

  // Two different named blanks stay two different numbers, in the order written.
  const two = convertCanonical({ template: '{rise} over {run}', target: 1, tolerance: 1,
    labels: ['a', 'b'], values: [1, 2] }, {});
  ok(two.value.template === '{0} over {1}', `two named blanks became "${two.value.template}"`);

  console.log(fails.length
    ? `BALLPARK canonical selftest: ${fails.length} FAILED\n  ${fails.join('\n  ')}`
    : 'BALLPARK canonical selftest: ok');
  return fails.length;
}

if(process.argv[1] && process.argv[1].endsWith('ballpark.mjs')){
  process.exit((selftest() + selftestCanonical()) ? 1 : 0);
}
