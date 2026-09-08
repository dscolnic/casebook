// protocol.mjs — the bible's authored PROTOCOL board into the importer's.
//
// One stop: groundtruth M8 S29, matching current geometries to the rule that
// settles each. No §7 board for PROTOCOL exists in any bible, so this module
// exports `convertCanonical` only.
//
// A PROTOCOL board is three keys ON the stop and not a block: `scenarios`, the
// left column; `choices`, the right; and `mapping`, which is `scenarios[i]` is
// answered by `choices[mapping[i]]`. Every shipped board writes all three at
// stop level, so the block is unwrapped.
//
// THE RENAMES. `situations` is `scenarios` and `actions` is `choices` — the
// game's match board and the printed book both call the two sides by the
// bible's names, which is why the importer's own comment says so. And `mapping`
// is written as a map from situation id to action id where the importer reads a
// permutation of positions; the ids are on both lists, so it is translated.
//
// IT IS A PERMUTATION, WHICH IS THE PART THAT BIT. The importer needs one
// response per situation and every response used once — seven and seven, each
// exactly once. The fourth round's board had seven situations and six actions,
// two of them sharing `force_cross`, which the format cannot express: a right
// column with one tile in it for two rows is a board a player finishes with a
// tile left over. That is reported here rather than repaired, because deciding
// which of two rows keeps a shared rule is a question about the physics.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'PROTOCOL';

/** A position, not an id that happens to contain a digit. See the note below. */
const isIndex = (v) => typeof v === 'number' ? Number.isInteger(v)
  : (typeof v === 'string' && /^\d+$/.test(v.trim()));

const column = (rows, what, owes) => {
  const text = [], ids = [];
  list(rows).forEach((r, i) => {
    const label = typeof r === 'string' ? r : str(pick(r ?? {}, 'label', 'text'));
    if(!label){
      owes.push(`${what} ${i + 1} has no label — the panel prints the two columns, and a row with`
        + ' no words is a blank tile');
      return;
    }
    text.push(label);
    ids.push(typeof r === 'string' ? label : (str(pick(r, 'id')) || label));
  });
  return { text, ids };
};

export const convertCanonical = (b, stop = {}) => {
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const owes = [];

  const left = column(pick(board, 'situations', 'scenarios'), 'situation', owes);
  const right = column(pick(board, 'actions', 'choices', 'responses'), 'response', owes);

  if(left.text.length < 2){
    owes.push(`the board authors ${left.text.length} situation(s), and a matching board needs at`
      + ' least two — one row is a statement, not a match');
  }
  if(right.text.length !== left.text.length){
    owes.push(`${left.text.length} situation(s) against ${right.text.length} response(s) — the`
      + ' board matches one response to each situation and uses every one, so a shared response'
      + ' leaves a tile over and a row unanswerable');
  }

  // The mapping, whichever way it is written.
  const raw = pick(board, 'mapping', 'correct', 'answers');
  const mapping = [];
  const stray = [];
  if(Array.isArray(raw)){
    raw.forEach((entry) => {
      // A POSITION IS A NUMBER, NOT A STRING WITH A DIGIT IN IT. `num` reads the
      // digits out of anything, so an id like `a2` came back as 2 and matched
      // the third response. Only a real number, or a string that is nothing but
      // digits, is a position; everything else is an id.
      if(isIndex(entry)){ mapping.push(Number(entry)); return; }
      const at = right.ids.indexOf(str(entry));
      if(at < 0) stray.push(str(entry)); else mapping.push(at);
    });
  } else if(raw && typeof raw === 'object'){
    // `situation: response`, in the order the situations are declared, so a map
    // that omits one is short rather than silently shifted.
    for(const id of left.ids){
      const said = str(raw[id]);
      if(!said){ stray.push(`(nothing for ${id})`); continue; }
      const at = right.ids.indexOf(said);
      if(at < 0) stray.push(said); else mapping.push(at);
    }
  } else {
    owes.push('the board authors no `mapping` — which response answers which situation, and'
      + ' without it there is nothing to grade against');
  }
  if(stray.length){
    owes.push(`the mapping names \`${stray.join('`, `')}\`, which is not one of this board's`
      + ' responses');
  }
  if(mapping.length && mapping.length !== left.text.length){
    owes.push(`the mapping covers ${mapping.length} of ${left.text.length} situation(s)`);
  } else if(mapping.length && new Set(mapping).size !== mapping.length){
    owes.push('the mapping uses one response for two situations — the board is a permutation, so'
      + ' a response answers exactly one row');
  }

  const extra = { choices: right.text, mapping };
  const cols = list(pick(board, 'columns')).map(str).filter(Boolean);
  if(cols.length === 2) extra.columns = cols;
  const said = str(pick(board, 'answerText', 'correctConclusion', 'correctResult'));
  if(said && !String(stop.answerText ?? '').trim()) extra.answerText = said;

  return { key: 'scenarios', value: left.text, owes, extra };
};

// ------------------------------------------------------------------ selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };
  const FIX = () => ({
    situations: [{ id: 's1', label: 'One' }, { id: 's2', label: 'Two' }, { id: 's3', label: 'Three' }],
    actions: [{ id: 'a1', label: 'First rule' }, { id: 'a2', label: 'Second rule' },
      { id: 'a3', label: 'Third rule' }],
    mapping: { s1: 'a2', s2: 'a3', s3: 'a1' },
  });

  let r = convertCanonical(FIX());
  ok(r.key === 'scenarios', 'the left column is placed as the stop\'s own `scenarios`');
  ok(r.owes.length === 0, `a complete board owes nothing: ${r.owes.join(' | ')}`);
  ok(JSON.stringify(r.value) === '["One","Two","Three"]', JSON.stringify(r.value));
  ok(JSON.stringify(r.extra.mapping) === '[1,2,0]', JSON.stringify(r.extra.mapping));

  // Two inputs that describe one board score the same: written as a list of
  // response ids, or as positions, or as a map.
  const asList = FIX(); asList.mapping = ['a2', 'a3', 'a1'];
  const asIdx = FIX(); asIdx.mapping = [1, 2, 0];
  ok(JSON.stringify(convertCanonical(asList).extra.mapping) === '[1,2,0]', 'a list of ids reads');
  ok(JSON.stringify(convertCanonical(asIdx).extra.mapping) === '[1,2,0]', 'a list of positions reads');

  // THE CASE THIS EXISTS TO CATCH.
  const shared = FIX();
  shared.actions = [{ id: 'a1', label: 'First rule' }, { id: 'a2', label: 'Second rule' }];
  shared.mapping = { s1: 'a1', s2: 'a1', s3: 'a2' };
  r = convertCanonical(shared);
  ok(r.owes.some(o => /leaves a tile over|permutation/.test(o)),
    `a shared response is refused: ${r.owes.join(' | ')}`);

  const unknown = FIX();
  unknown.mapping = { s1: 'a2', s2: 'nowhere', s3: 'a1' };
  ok(convertCanonical(unknown).owes.some(o => /nowhere/.test(o)), 'an unknown response is named');

  if(fails.length){ console.error(`PROTOCOL selftest: ${fails.length} failure(s)`); for(const f of fails) console.error('  ' + f); process.exitCode = 1; }
  else console.log('PROTOCOL selftest: ok');
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) selftest();
