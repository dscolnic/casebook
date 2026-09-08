// belt.mjs — the bible's authored BELT board into the importer's.
//
// Three stops, all in Carrying Capacity: M1 S3 (matter against energy), M9 S33
// (five waste classes) and M13 S49 (arriving cargo). There is no §7 board for
// BELT in any of the eight bibles — `grep -c '§7 build completion — BELT'`
// returns zero across `fpl_gpt/` — so this module exports `convertPayload` and
// NOT `convert`. A §7 converter written against input that does not exist is
// worse than a missing one: nothing would ever run it, and the first board that
// did arrive would meet a year-old guess.
//
// See `_shared.mjs` for the `{ key, value, owes }` contract every converter
// keeps, and `_payload.mjs` for how an authored board is read.
//
// WHAT THE IMPORTER WANTS, and it is stricter than the boards are. `belt` is a
// TWO-bin sorting line: `left` and `right`, each with a name, and a bank of at
// least 24 items with at least 8 a side. The bank is shuffled and only part of
// it is played, so a short bank means every run is the same run — which is why a
// six-item board is owed here rather than padded. Twenty new items is twenty new
// pieces of curriculum, and authoring them under cover of a format conversion is
// how a game acquires content nobody read.
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'BELT';

/** An id or a `{id|name|label}` record, as the one string it names. */
const nameOf = (v) => (typeof v === 'string' || typeof v === 'number')
  ? str(v) : str(pick(v ?? {}, 'id', 'name', 'label'));

/** A token the belt would print on a moving tile: `standing_water`, `CO2_flux`. */
const isToken = (s) => /_/.test(s);

export function convertPayload(board, stop){
  const b = board ?? {};
  const owes = [];
  const value = {};
  // Prose that followed the board. `_payload.mjs` keeps it rather than dropping
  // it, because it is the one place a revealed number is sometimes written.
  if(str(b._trailing)) owes.push(`prose follows the board and no field holds it — "${str(b._trailing)}"`);

  // ---- the two bins. The board writes `categories`, and the importer reads a
  // named `left` and `right`. Two is not a preference: the panel has two bins,
  // and a five-category board is a different question wearing this format's
  // name.
  const cats = list(pick(b, 'categories', 'bins', 'classes')).map(nameOf).filter(Boolean);
  if(cats.length === 2){
    value.left = { name: cats[0] };
    value.right = { name: cats[1] };
    if(cats[0].toLowerCase() === cats[1].toLowerCase()) owes.push('both belt bins are called the same thing');
  } else if(cats.length){
    owes.push(`the board sorts into ${cats.length} categories (${cats.join(', ')}) and a belt has`
      + ' exactly two bins — the panel is a two-way line, so the bins are not written and the'
      + ' board has to be re-authored as a binary sort or moved to another format');
  } else {
    owes.push('the board names no `categories` — a belt needs two named bins, and an unnamed bin'
      + ' is a bin nobody can aim at');
  }

  // ---- the bank. Written as a map of item to category, and as a list of
  // records by one campaign; both are read.
  const rawItems = b.items;
  const pairs = [];
  if(rawItems && typeof rawItems === 'object' && !Array.isArray(rawItems)){
    for(const [k, v] of Object.entries(rawItems)){
      if(k === '_trailing') continue;
      pairs.push([str(k), nameOf(v)]);
    }
  } else {
    for(const it of list(rawItems)) pairs.push([nameOf(it), str(pick(it ?? {}, 'category', 'bin', 'class'))]);
  }

  const items = [];
  const seen = new Set();
  pairs.forEach(([name, cat], i) => {
    const at = `belt item ${i + 1}`;
    if(!name){ owes.push(`${at} has no name`); return; }
    if(!cat){ owes.push(`"${name}" is on the belt with no category, so it cannot be sorted right`); return; }
    if(seen.has(name.toLowerCase())){ owes.push(`"${name}" appears on the belt twice`); return; }
    seen.add(name.toLowerCase());
    // A bin is only writable when the board named exactly two of them; an item
    // whose category is neither is not silently dropped into one.
    if(cats.length !== 2){ items.push({ name }); return; }
    if(cat === cats[0]) items.push({ name, bin: 'left' });
    else if(cat === cats[1]) items.push({ name, bin: 'right' });
    else {
      owes.push(`"${name}" is sorted to "${cat}", which is neither bin`);
      items.push({ name });
    }
  });
  if(items.length) value.items = items;

  // ---- the size of the bank, which is the whole reason the format is checked.
  const lefts = items.filter(x => x.bin === 'left').length;
  const rights = items.filter(x => x.bin === 'right').length;
  if(items.length < 24){
    owes.push(`the bank has ${items.length} items and a belt needs at least 24 — the bank is`
      + ' shuffled and only part of it is played, so a short bank means every run is the same run.'
      + ' The missing items are curriculum, not padding, and are not written here');
  }
  if(cats.length === 2 && (lefts < 8 || rights < 8)){
    owes.push(`the bank puts ${lefts} in "${cats[0]}" and ${rights} in "${cats[1]}", and each bin`
      + ' needs at least 8');
  }
  if(items.length >= 4 && cats.length === 2){
    const split = Math.max(lefts, rights) / items.length;
    if(split > 0.65){
      owes.push(`${Math.round(split * 100)}% of the bank goes to one bin — a player who always`
        + ' chooses that side passes without reading anything');
    }
  }

  // ---- the names, which are read at speed off a moving tile.
  const tokens = [...items.map(x => x.name), ...cats].filter(isToken);
  if(tokens.length){
    owes.push(`${tokens.length} belt name(s) are payload ids rather than something a player reads`
      + ` — "${tokens[0]}" is printed on a moving tile as written`);
  }

  // ---- the run. `misses_allowed` and the importer's `lives` are the same
  // authored fact: how many items may go to the wrong bin before the run ends.
  // `speed` has no field, and is owed rather than written under a name nothing
  // reads.
  const lives = pick(b, 'lives', 'misses_allowed', 'missesAllowed');
  if(lives !== undefined){
    const n = num(lives);
    if(n !== undefined && n >= 1) value.lives = n;
    else owes.push(`the board's \`misses_allowed\` reads "${lives}", which is not a count of lives`);
  }
  if(pick(b, 'speed') !== undefined){
    owes.push(`the board sets \`speed: ${str(b.speed)}\` and the importer's belt has no speed —`
      + ' the tile rate is the engine\'s, so it is dropped rather than written under a name'
      + ' nothing reads');
  }

  // ---- the verdict, which is a top-level key.
  owes.push(str(pick(b, 'answerText', 'correct_conclusion', 'correctConclusion'))
    ? 'the board\'s conclusion is the stop\'s `answerText`, a top-level key this converter cannot'
      + ' write — the contract returns one key'
    : 'the board authors no conclusion, so the stop has no `answerText` — a player who mis-sorts'
      + ' is told they were wrong and never told what separates the two bins');

  return { key: str(stop?.payloadKey) || 'belt', value, owes };
}

// ------------------------------------------------------ the canonical board
//
// Three stops, all Carrying Capacity: M1 S3, M9 S33, M13 S49. The third handback
// wrote them in the game's own schema and got nearly all of it right — `left`
// and `right` are named records, `items` is a list of `{name, bin}` with `bin`
// already spelled `left`/`right`, and every bank is 24 items split 12/12. Carried
// through unchanged, all of that imports.
//
// TWO FIELDS DO NOT, AND THEY ARE DROPPED IN SILENCE, which is the reason this
// function exists at all. The board writes `runLength: 20` and `missesAllowed:
// 2`; the importer reads `need` and `lives`. Neither name matches, so both fall
// off the end of an importer that rebuilds the block field by field — and the
// defaults it then applies are 20 and THREE. The run length happens to agree.
// The lives do not: the board says a run ends on the third mistake and the game
// shipped would end on the fourth, which is a difficulty the campaign did not
// author and nothing anywhere would have reported.
//
// `pass` is not written. The board states no pass mark under any name, the
// importer's default of 0.8 is a real default rather than a stand-in, and a
// fraction invented here would be a grading threshold nobody wrote.
//
// The two content traps — an item name over three words, and a word whose
// spelling sorts the bank — are NOT re-checked here. `import-book.mjs` already
// refuses both, and a second copy of a rule is the thing that drifts the first
// time either is corrected. What this pass found is reported to the reader, not
// re-implemented: see the note at the foot of this file.
export function convertCanonical(b, stop = {}){
  const owes = [];
  const value = { ...(b ?? {}) };

  // ---- the run length. `need` is how many items a run plays out of the bank.
  const runLength = pick(value, 'runLength', 'run_length');
  delete value.runLength;
  delete value.run_length;
  if(runLength !== undefined){
    const n = num(runLength);
    if(n !== undefined && n >= 1) value.need = n;
    else owes.push(`the board's \`runLength\` reads "${str(runLength)}", which is not a count of`
      + ' items, so the run length is left to the importer\'s default of 20');
  }

  // ---- the lives. The same authored fact under the name `convertPayload`
  // already reads on the payload side: how many items may go to the wrong bin.
  const misses = pick(value, 'missesAllowed', 'misses_allowed');
  delete value.missesAllowed;
  delete value.misses_allowed;
  if(misses !== undefined){
    const n = num(misses);
    if(n !== undefined && n >= 1) value.lives = n;
    else owes.push(`the board's \`missesAllowed\` reads "${str(misses)}", which is not a count of`
      + ' lives, so the run would fall back to the importer\'s default of 3');
  }

  // ---- the verdict, which is a top-level key and which every one of the three
  // stops already carries. Said only where the stop does not, so the report is
  // not three lines about a field that is already there.
  const said = str(pick(b ?? {}, 'answerText', 'correctConclusion', 'correct_conclusion',
    'correctResult'));
  for(const k of ['answerText', 'correctConclusion', 'correct_conclusion', 'correctResult']){
    delete value[k];
  }
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — a player who mis-sorts is'
      + ' told they were wrong and never told what separates the two bins');
  }

  return { key: 'belt', value, owes, extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/belt.mjs --selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  // A bank that owes nothing: 24 items, 12 a side, two named bins.
  const big = {};
  ['ash', 'basalt', 'chalk', 'clay', 'flint', 'granite', 'gypsum', 'marl', 'quartz', 'shale',
    'slate', 'tuff'].forEach(x => { big[x] = 'rock'; });
  ['breeze', 'gust', 'squall', 'draught', 'zephyr', 'gale', 'thermal', 'downdraft', 'updraft',
    'jetstream', 'monsoon', 'chinook'].forEach(x => { big[x] = 'wind'; });
  const full = convertPayload({ categories: ['rock', 'wind'], items: big, misses_allowed: 2,
    answerText: 'Rock is matter; wind is moving air.' }, { payloadKey: 'belt' });
  ok(full.owes.length === 1 && /answerText/.test(full.owes[0]),
    `a complete belt should owe only its answerText; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.items.length === 24, 'the bank lost items');
  ok(full.value.left.name === 'rock' && full.value.right.name === 'wind', 'the bins were not named');
  ok(full.value.lives === 2, '`misses_allowed` did not become `lives`');

  // Five categories is not a belt, and no bin is invented for its items.
  const five = convertPayload({ categories: ['nutrient', 'heavy_metal', 'persistent_organic_pollutant',
    'endocrine_active_drug', 'microplastic'],
  items: { fertilizer: 'nutrient', lead_battery: 'heavy_metal' }, misses_allowed: 2 },
  { payloadKey: 'belt' });
  ok(!('left' in five.value) && !('right' in five.value), 'a bin was invented for a five-way sort');
  ok(five.value.items.every(x => !('bin' in x)), 'an item was dropped into a bin that was not authored');
  ok(five.owes.some(o => /exactly two bins/.test(o)), 'a five-category board was not owed');
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!full.owes.some(o => /exactly two bins/.test(o)), 'a two-bin board was called a five-way sort');

  // A short bank is owed, never padded. This is Carrying Capacity M1 S3 exactly.
  const short = convertPayload({ categories: ['cycles', 'flows'],
    items: { sunlight: 'flows', heat: 'flows', CO2: 'cycles', nitrate: 'cycles',
      phosphate: 'cycles', water: 'cycles' }, speed: 'moderate', misses_allowed: '2`.' },
  { payloadKey: 'belt' });
  ok(short.value.items.length === 6, 'the short bank was padded');
  ok(short.owes.some(o => /has 6 items/.test(o)), 'a six-item bank was not owed');
  ok(short.owes.some(o => /each bin needs at least 8/.test(o)), 'a thin bin was not owed');
  ok(short.owes.some(o => /67% of the bank/.test(o)), 'a lopsided bank was not owed');
  ok(short.owes.some(o => /no speed/.test(o)), 'the dropped `speed` was not owed');
  ok(!('speed' in short.value), '`speed` was written through');
  ok(short.value.lives === 2, 'a lives count wrapped in the payload\'s own punctuation was lost');
  ok(short.value.items[0].bin === 'right' && short.value.items[2].bin === 'left',
    'the categories were not mapped onto the two bins in the order they were written');

  // Token names are owed, and a board of readable names is not.
  const tok = convertPayload({ categories: ['inspection_required', 'low_risk'],
    items: { soil: 'inspection_required', standing_water: 'inspection_required',
      sealed_clean_metal: 'low_risk' } }, { payloadKey: 'belt' });
  ok(tok.owes.some(o => /payload ids rather than/.test(o)), 'token names were not owed');
  ok(!full.owes.some(o => /payload ids rather than/.test(o)), 'readable names were called ids');
  ok(tok.value.items[1].name === 'standing_water', 'an item name was rewritten');

  // A duplicate, and an item sorted to neither bin.
  const dup = convertPayload({ categories: ['a', 'b'], items: [{ name: 'x', category: 'a' },
    { name: 'x', category: 'b' }, { name: 'y', category: 'zz' }] }, { payloadKey: 'belt' });
  ok(dup.owes.some(o => /appears on the belt twice/.test(o)), 'a duplicate item was not owed');
  ok(dup.owes.some(o => /which is neither bin/.test(o)), 'a stray category was not owed');
  ok(dup.value.items.filter(x => x.name === 'x').length === 1, 'a duplicate item was written twice');
  ok(!dup.value.items.some(x => x.name === 'y' && 'bin' in x), 'a stray category was given a bin');
  // The two ways of writing the same bank must convert identically.
  const asMap = convertPayload({ categories: ['a', 'b'], items: { x: 'a', y: 'b' } }, {});
  const asList = convertPayload({ categories: ['a', 'b'],
    items: [{ name: 'x', category: 'a' }, { name: 'y', bin: 'b' }] }, {});
  ok(JSON.stringify(asMap) === JSON.stringify(asList),
    'a bank written as a map and as a list converted differently');

  // Trailing prose is owed, never dropped.
  ok(convertPayload({ categories: ['a', 'b'], _trailing: 'reveals 4.235 m' }, {})
    .owes.some(o => /prose follows the board/.test(o)), 'trailing prose was dropped');
  ok(!full.owes.some(o => /prose follows the board/.test(o)), 'a board with no trailing prose was owed one');

  // The key comes from the payload's own top-level name.
  ok(convertPayload({ categories: ['a', 'b'] }, { payloadKey: 'belt' }).key === 'belt',
    'the payload key was not used');

  // ---------------------------------------------------- the canonical board
  const items = [];
  for(let i = 0; i < 12; i++) items.push({ name: `matter ${i}`, bin: 'left' });
  for(let i = 0; i < 12; i++) items.push({ name: `flow ${i}`, bin: 'right' });
  const canon = { left: { name: 'Matter cycles' }, right: { name: 'Energy flows' },
    runLength: 20, missesAllowed: 2, items };

  const c = convertCanonical(canon, { answerText: 'Matter cycles; energy passes through.' });
  ok(c.key === 'belt', `the canonical board was keyed ${c.key}`);
  // THE TWO RENAMES, and the reason the function exists. Put either back —
  // delete the `value.need =` line or the `value.lives =` line — and exactly one
  // of these two fails while everything else here still passes.
  ok(c.value.need === 20, `runLength did not become need: ${c.value.need}`);
  ok(c.value.lives === 2, `missesAllowed did not become lives: ${c.value.lives}`);
  // And the half that matters more: the old names must be GONE. Left in place
  // they are dropped by the importer in silence, which is the defect — a value
  // that still carries `missesAllowed` alongside `lives` would pass the two
  // checks above and tell nobody that the importer is reading neither.
  ok(!('runLength' in c.value) && !('missesAllowed' in c.value),
    'the bible\'s own names were left on the board beside the importer\'s');
  ok(c.owes.length === 0, `a complete canonical belt should owe nothing; owed ${JSON.stringify(c.owes)}`);

  // The bank is carried across untouched and in order — the bins are named on
  // each item, so a reorder is not fatal, but a converter that quietly sorts is
  // a converter nobody can predict.
  ok(c.value.items.length === 24 && c.value.items[0].name === 'matter 0'
    && c.value.items[23].name === 'flow 11', 'the bank was reordered or lost items');
  ok(c.value.left.name === 'Matter cycles' && c.value.right.name === 'Energy flows',
    'the bins were lost');

  // NEVER INVENTED. A board that authors no lives gets none, and the importer's
  // own default stands where the bible said nothing.
  const bare = convertCanonical({ ...canon, missesAllowed: undefined, runLength: undefined }, {});
  ok(!('lives' in bare.value) && !('need' in bare.value),
    'a run length and a life count were invented for a board that authors neither');

  // A count that is not a count is owed rather than coerced. `num()` refuses a
  // word, so "two" must not become a number.
  const words = convertCanonical({ ...canon, missesAllowed: 'two' }, { answerText: 'x' });
  ok(!('lives' in words.value), 'a written-out life count was coerced into a number');
  ok(words.owes.some(o => /`missesAllowed` reads "two"/.test(o)),
    `an unreadable life count was not owed: ${JSON.stringify(words.owes)}`);
  // And the case that must NOT fire, or the check is agreeing with itself.
  ok(!c.owes.some(o => /missesAllowed/.test(o)), 'a numeric life count was called unreadable');

  // The verdict is placed only where the stop has none, and never over one the
  // stop already carries — all three of these stops carry their own.
  ok(!c.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  const orphan = convertCanonical({ ...canon, correctConclusion: 'Energy degrades; matter does not.' }, {});
  ok(orphan.extra.answerText === 'Energy degrades; matter does not.',
    'the board\'s verdict was not placed on a stop that had none');
  ok(!('correctConclusion' in orphan.value),
    'the board\'s verdict was left in the belt block, where nothing renders it');
  ok(convertCanonical(canon, {}).owes.some(o => /answerText/.test(o)),
    'a board and a stop with no verdict between them went unowed');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('belt.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `BELT selftest: ${f.length} failure(s)` : 'BELT selftest: ok');
  process.exit(f.length ? 1 : 0);
}
