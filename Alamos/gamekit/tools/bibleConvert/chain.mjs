// chain.mjs — the bible's CHAIN board into the importer's.
//
// Three stops: carrying M7 S26, midway M12 S46, planetary_defense M8 S29. See
// `_shared.mjs` for the contract every converter keeps.
//
// TWO RENAMES. The bible writes `transfer` where the importer reads `transfers`,
// and `governingLink` where it reads `governing`. Both are the same authored
// fact under a different name.
//
// WHAT IS NOT WRITTEN. `reading` — the observed state of a link — is the ONLY
// basis a player has for naming the one that governs, and none of the three
// boards authors one. `import-book.mjs` says so in its own words at the CHAIN
// block: six stops across three games authored a reading per link under three
// different names, the importer dropped every one, and the panel showed a name
// and a transfer and nothing else while the hints said "the largest number on
// the screen is not automatically the governing one". There were no numbers on
// the screen. A reading invented here would put numbers there that nobody chose,
// which is the same defect with a friendlier face.
//
// A DEAD NAME IS OWED, NOT ALIASED. `evidence`, `capacity`, `requires` and
// `unit` are the three names eleven books used for `reading`. The importer
// REFUSES them rather than aliasing them, deliberately, because an alias is how
// a field ends up under four names next time — so a board that authors one has
// it owed here and dropped, not renamed on the way past. None of the three
// boards exercises this, so the selftest does.
//
// THE THING TO KNOW ABOUT THESE THREE BOARDS. All three are byte-identical, and
// their four links are `source`, `intermediate`, `constraint` and `response`,
// each transferring "<its own id> to <the next id>". That text is made only of
// the ids around it: it names no quantity, so there is nothing for a player to
// reason about. The campaigns' real chains are in `stop.payload` — carrying's
// six wastewater stages with a `quantity` on each and a dilution decoy, keyed in
// causal order — under a schema of their own again.
import { str, pick, list } from './_shared.mjs';

export const FORMAT = 'CHAIN';

const DEAD_NAMES = [
  ['evidence', 'the same thing under another name'],
  ['capacity', 'a number and a unit'],
  ['requires', 'a number and a unit'],
  ['unit', 'a number and a unit'],
];

export const convert = (b) => {
  const owes = [];
  const value = {};

  const raw = list(pick(b, 'links', 'transfers'));
  const ids = raw.map(l => str(pick(l, 'id')) || str(l.label)).filter(Boolean);

  const links = raw.map((l, i) => {
    const at = `chain link ${i + 1}`;
    const id = str(pick(l, 'id')) || str(l.label);
    const label = str(l.label);
    const transfers = str(pick(l, 'transfers', 'transfer', 'quantity'));
    if(!id) owes.push(`${at} has no \`id\``);
    if(!label) owes.push(`${at} has no \`label\` — "${id || '?'}" is a token, not something a player reads`);
    if(!transfers) owes.push(`${at} has no \`transfers\` — what actually moves across it`);
    // The template's tell: the transfer text is built out of the link ids and
    // the word "to", so it states no quantity at all.
    if(transfers && ids.length){
      const left = transfers.toLowerCase().replace(/\b(to|from|the|a|an|into)\b/g, ' ');
      const stripped = ids.reduce((s, x) => s.split(x.toLowerCase()).join(' '), left).replace(/[^a-z0-9]/g, '');
      if(!stripped) owes.push(`${at} transfers "${transfers}", which is made only of the link ids —`
        + ' it names no quantity, so there is nothing to reason about');
    }
    if(l.reading === undefined){
      owes.push(`${at} has no \`reading\` — the observed state of the link, and the only basis a`
        + ' player has for naming the one that governs');
    } else if(!str(l.reading)){
      owes.push(`${at} authors an empty \`reading\` — leave it out rather than authoring a blank`);
    }
    for(const [dead, why] of DEAD_NAMES){
      if(l[dead] !== undefined){
        owes.push(`${at} authors \`${dead}\`, which is ${why} — the importer refuses it rather than`
          + ' aliasing it, so it is dropped here and owed as `reading`');
      }
    }
    const out = {};
    if(id) out.id = id;
    if(label) out.label = label;
    if(transfers) out.transfers = transfers;
    if(str(l.reading)) out.reading = str(l.reading);
    return out;
  });
  if(links.length) value.links = links;
  if(links.length < 4) owes.push(`the chain authors ${links.length} transfers, and it needs four`);

  // ---- the path. Carried in the order written; a chain's order is the chain.
  const order = list(pick(b, 'order', 'keyed_order', 'keyedOrder')).map(String).map(s => s.trim());
  if(order.length) value.order = order;
  else owes.push('the chain authors no `order` — the path through the links');
  for(const id of order){
    if(ids.length && !ids.includes(id)) owes.push(`the chain's order names "${id}", which is not one of its links`);
  }

  // ---- the answer and the trap.
  const governing = str(pick(b, 'governing', 'governingLink', 'governing_link'));
  if(governing) value.governing = governing;
  else owes.push('the chain names no governing link');
  if(governing && ids.length && !ids.includes(governing)){
    owes.push(`the chain's governing link "${governing}" is not one of its transfers`);
  }

  const distractor = str(b.distractor);
  if(distractor) value.distractor = distractor;
  else owes.push('the chain has no `distractor` — the large obvious member somebody names instead');
  if(distractor && ids.length && !ids.includes(distractor)){
    owes.push(`the chain's distractor "${distractor}" is not one of its transfers`);
  }

  // A chain-level `evidence` map is worse than a dropped field: Red Sand's had a
  // key naming no link at all, which is a typo no per-link field can make.
  if(b.evidence !== undefined){
    owes.push('the chain authors a chain-level `evidence` map — it belongs on each link as'
      + ' `reading`, so a key that names no link cannot go unnoticed');
  }

  owes.push(str(pick(b, 'answerText', 'correctConclusion', 'correct_conclusion'))
    ? 'the board\'s conclusion is the stop\'s `answerText`, a top-level key this converter cannot'
      + ' write — the contract returns one key'
    : 'the chain authors no conclusion, so the stop has no `answerText` — the player orders five'
      + ' stages, gets them wrong, and is never told the order');

  return { key: 'chain', value, owes };
};

// ------------------------------------------------------- the authored board
//
// Three stops point at their own interaction block instead of a §7 board:
// carrying M7 S26 (the treatment train), planetary_defense M8 S29 (the evidence
// chain) and midway M12 S46 (the load chain). These are the real chains the
// header above says were in `stop.payload` all along — six wastewater stages
// with a quantity on each and a dilution decoy, six radar products sharing one
// correction, five steps from velocity to support force. Nothing here is a
// template.
//
// FOUR NAMES FOR ONE FIELD, and three of them are the same fact. The bible
// writes what moves across a link as `quantity` (carrying), `carries`
// (planetary) and `carried_quantity` (midway); the importer reads `transfers`.
// All three are aliased, because they name the thing that moves — unlike
// `reading`'s four dead names, which the importer refuses precisely because
// each described something slightly different and aliasing them is how a field
// ends up under four names next time.
//
// WHAT NONE OF THE THREE AUTHORS, and it is the same gap every time: the
// GOVERNING link. All three write `governing_relationship`, and in all three it
// is physics rather than a link — "contaminant load=flow×concentration",
// "Range A and Doppler A share correction C", "p=mv; J=delta p". A relationship
// is not a member of the chain, so it cannot be the answer to "which transfer
// governs", and it is owed rather than resolved to whichever link looks nearest.
export function convertPayload(board, stop){
  const b = board ?? {};
  const owes = [];
  if(str(b._trailing)) owes.push(`prose follows the board and no field holds it — "${str(b._trailing)}"`);

  const raw = list(pick(b, 'links', 'transfers'));
  const links = raw.map((l) => {
    const out = { ...(l ?? {}) };
    // The three names for what moves. `transfers` wins if it is already there.
    const moves = str(pick(l ?? {}, 'transfers', 'transfer', 'quantity', 'carries', 'carried_quantity'));
    if(moves) out.transfers = moves;
    for(const dead of ['quantity', 'carries', 'carried_quantity']) delete out[dead];
    return out;
  });
  const ids = links.map(l => str(pick(l, 'id')) || str(l.label)).filter(Boolean);

  const order = list(pick(b, 'order', 'keyed_order', 'keyedOrder')).map(String).map(s => s.trim());
  // Two of the boards write the keyed path a second time as `correct`. When the
  // two disagree the board keys two different chains, and neither is written
  // over the other.
  const alsoKeyed = list(pick(b, 'correct', 'correct_order')).map(String).map(s => s.trim());
  if(alsoKeyed.length && order.length && alsoKeyed.join('|') !== order.join('|')){
    owes.push(`the board writes its path twice — \`order\` is [${order.join(', ')}] and \`correct\``
      + ` is [${alsoKeyed.join(', ')}] — so it keys two different chains`);
  }

  // ---- the governing link, which no board names.
  const rel = str(pick(b, 'governing_relationship', 'governingRelationship'));
  let governing = str(pick(b, 'governing', 'governingLink', 'governing_link'));
  if(!governing && rel && ids.includes(rel)) governing = rel;
  if(!governing && rel){
    owes.push(`the board's \`governing_relationship\` is "${rel}" — a relationship rather than one`
      + ' of its transfers, so it cannot be the answer to which link governs, and it is not'
      + ' resolved to whichever link looks nearest');
  }

  // ---- the distractor. The importer wants one named member; the boards write a
  // `decoys` list. One decoy that IS a link is the same fact under the other
  // name and is taken; two of them is a choice this tool does not get to make,
  // and a decoy that names no link is not a member of the chain at all.
  const decoys = list(pick(b, 'decoys', 'decoy')).map(d => (typeof d === 'string' ? str(d)
    : str(pick(d ?? {}, 'id', 'label'))));
  const marked = links.filter(l => l.decoy === true).map(l => str(pick(l, 'id')) || str(l.label));
  const inChain = [...new Set([...decoys, ...marked])].filter(id => ids.includes(id));
  let distractor = str(b.distractor);
  if(!distractor && inChain.length === 1) distractor = inChain[0];
  else if(!distractor && inChain.length > 1){
    owes.push(`the board marks ${inChain.length} decoys (${inChain.join(', ')}) and the importer`
      + ' takes one named `distractor` — which of them a player names instead is the board\'s'
      + ' choice, not this tool\'s');
  } else if(!distractor && decoys.length){
    owes.push(`the board's decoys (${decoys.join(', ')}) name no link — they are wrong readings of`
      + ' the chain rather than members of it, so none of them is the `distractor`, which has to'
      + ' be a transfer the player can pick');
  }

  const norm = { links: links.map(l => { const c = { ...l }; delete c.decoy; return c; }) };
  if(order.length) norm.order = order;
  if(governing) norm.governing = governing;
  if(distractor) norm.distractor = distractor;
  for(const k of ['evidence', 'answerText', 'correctConclusion', 'correct_conclusion']){
    if(b[k] !== undefined) norm[k] = b[k];
  }

  const out = convert(norm, stop);
  return { key: str(stop?.payloadKey) || out.key, value: out.value, owes: [...owes, ...out.owes] };
}

// ------------------------------------------------------ the canonical board
//
// Three stops: Carrying Capacity M7 S26, Planetary Defense M8 S29 and Safety
// Factor M12 S46. All three boards are byte-identical — four links called
// `source`, `transfer`, `outcome` and `conspicuous_decoy`, labelled "source step
// named in the question" — so this is the format-level template written in the
// game's schema and its labels are owed as placeholders rather than passed off
// as content.
//
// ONE RENAME `convert` DOES NOT ALREADY DO, and it is the one that decides the
// board. `transfers` and `governingLink` are aliased above and reach the right
// fields on their own; `path` is not. Carried through, `b.order` is undefined,
// so the path is empty, "the governing link is not in the path" fires about a
// path the board states in full, and the panel would have no order to grade
// against — a chain whose whole content is an order.
//
// `decoy: true` on a link is dropped, and deliberately. The importer computes
// its decoys as the links the path leaves out, which is the same fact stated
// where it cannot go stale; a flag beside it is a second description, and a flag
// that DISAGREES with the path is the thing worth reporting, so that is what is
// owed rather than the drop itself.
export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? { ...b } : {};
  const owes = [];

  // ---- the rename.
  if(board.path !== undefined && board.order === undefined) board.order = board.path;
  delete board.path;

  // ---- the decoy flags, checked against the path and then dropped.
  const links = list(pick(board, 'links', 'transfers'));
  const order = list(pick(board, 'order')).map(x => str(x));
  const flagged = links.filter(l => l && l.decoy === true).map(l => str(pick(l, 'id')) || str(l.label));
  const spare = links.map(l => str(pick(l, 'id')) || str(l.label)).filter(id => id && !order.includes(id));
  if(order.length && flagged.sort().join() !== spare.slice().sort().join()){
    owes.push(`the board flags \`decoy: true\` on ${flagged.join(', ') || 'nothing'} and its path`
      + ` leaves out ${spare.join(', ') || 'nothing'} — the importer takes the decoys from the path,`
      + ' so the flag is dropped, and the two disagreeing is the reason it is said out loud');
  }
  // `convert` rebuilds each link out of id, label, transfers and reading, so
  // `decoy` never reaches the block and there is nothing here to delete. This
  // was written as a delete first, and the selftest passed with it removed —
  // which is the definition of a refusal nothing exercises. What is live is the
  // owe above, and the assertion below now guards `convert`'s behaviour rather
  // than a line of this function's own.
  board.links = links;
  delete board.transfers;

  const out = convert(board, stop);

  // ---- the verdict. `convert` owes it in every case because a §7 converter
  // cannot reach a top-level key; `extra` can, so that one line is answered
  // here rather than repeated.
  const kept = out.owes.filter(o => !/answerText/.test(o));
  const said = str(pick(b ?? {}, 'answerText', 'correctConclusion', 'correct_conclusion',
    'correctResult'));
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — the player orders the'
      + ' stages, gets them wrong, and is never told the order');
  }

  return { key: 'chain', value: out.value, owes: [...kept, ...owes], extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/chain.mjs
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const link = (id, label, transfers, reading) => ({ id, label, transfers, reading });
  const full = convert({
    links: [
      link('intake', 'Collect raw wastewater', 'wastewater flow and suspended solids', '4 200 m³/d'),
      link('primary', 'Settle and skim', 'settleable solids and floating material', '180 kg/d removed'),
      link('secondary', 'Biological treatment', 'dissolved organic load', '95 kg BOD/d'),
      link('tertiary', 'Nutrient removal', 'nitrogen and phosphorus load', '14 kg N/d'),
      link('dilution', 'Dilute untreated water', 'water volume only', 'no load removed'),
    ],
    order: ['intake', 'primary', 'secondary', 'tertiary'],
    governingLink: 'secondary', distractor: 'intake',
    answerText: 'Remove solids, organics and nutrients in order; dilution removes no load.',
  });
  ok(full.owes.length === 1 && /answerText/.test(full.owes[0]),
    `a complete chain should owe only its answerText; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.governing === 'secondary', 'governingLink did not become governing');
  ok(full.value.links[0].reading === '4 200 m³/d', 'an authored reading was dropped');
  ok(full.value.order.join() === 'intake,primary,secondary,tertiary', 'the chain order was not carried in order');

  // The real board.
  const bible = convert({
    links: [{ id: 'source', transfer: 'source to intermediate' },
      { id: 'intermediate', transfer: 'intermediate to constraint' },
      { id: 'constraint', transfer: 'constraint to response' },
      { id: 'response', transfer: 'response to outcome' }],
    order: ['source', 'intermediate', 'constraint', 'response'],
    governingLink: 'constraint', distractor: 'source',
  });
  ok(bible.value.links.every(l => l.transfers), 'the singular `transfer` was not renamed');
  ok(bible.value.links.every(l => !('label' in l)), 'a missing link label was invented');
  ok(bible.value.links.every(l => !('reading' in l)), 'a missing reading was invented');
  ok(bible.owes.filter(o => /has no `reading`/.test(o)).length === 4, 'the four missing readings were not owed');
  ok(bible.owes.filter(o => /has no `label`/.test(o)).length === 4, 'the four missing labels were not owed');
  // Three of the four, not four: the last one transfers "response to outcome",
  // and "outcome" names no link. The check fires on exactly the lines whose
  // whole text is ids, which is what it claims to do.
  ok(bible.owes.filter(o => /made only of the link ids/.test(o)).length === 3,
    'the template transfer text was not owed on the three lines made only of ids');
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!full.owes.some(o => /made only of the link ids/.test(o)),
    'a real transfer naming a quantity was called the template');

  // A dead name is dropped and owed, never aliased into `reading`.
  const dead = convert({ links: [{ id: 'a', label: 'A', transfers: 'heat', capacity: '40 kW' }],
    order: ['a'], governing: 'a', distractor: 'a', answerText: 'x' });
  ok(!('reading' in dead.value.links[0]), '`capacity` was aliased into `reading`');
  ok(!JSON.stringify(dead.value).includes('40 kW'), 'a dead-named field was written through');
  ok(dead.owes.some(o => /authors `capacity`/.test(o)), 'a dead-named field was not owed');
  ok(dead.owes.some(o => /needs four/.test(o)), 'a one-link chain was not owed');

  // A chain-level evidence map.
  ok(convert({ links: [], evidence: { radiator: '3 kW' } }).owes.some(o => /chain-level `evidence`/.test(o)),
    'a chain-level evidence map was not owed');

  // An empty reading is owed rather than written as a blank.
  const blank = convert({ links: [{ id: 'a', label: 'A', transfers: 'heat', reading: '  ' }] });
  ok(!('reading' in blank.value.links[0]), 'a blank reading was written');
  ok(blank.owes.some(o => /empty `reading`/.test(o)), 'a blank reading was not owed');

  // Order and governing naming links that do not exist.
  const stray = convert({ links: [{ id: 'a', label: 'A', transfers: 'heat' }],
    order: ['a', 'z'], governing: 'q', distractor: 'w' });
  ok(stray.owes.some(o => /order names "z"/.test(o)), 'a stray order id was not owed');
  ok(stray.owes.some(o => /governing link "q"/.test(o)), 'a stray governing link was not owed');
  ok(stray.owes.some(o => /distractor "w"/.test(o)), 'a stray distractor was not owed');

  // ---------------------------------------------------------- authored boards
  // Carrying Capacity M7 S26 exactly as the payload delivers it.
  const carrying = convertPayload({
    transfers: [
      { id: 'intake', label: 'collect raw wastewater', quantity: 'wastewater flow and suspended solids' },
      { id: 'primary', label: 'settle and skim', quantity: 'settleable solids and floating material' },
      { id: 'secondary', label: 'biological treatment', quantity: 'dissolved organic load' },
      { id: 'tertiary', label: 'nutrient removal', quantity: 'nitrogen and phosphorus load' },
      { id: 'disinfection', label: 'disinfect before discharge', quantity: 'viable pathogen load' },
      { id: 'dilution_decoy', label: 'dilute untreated water', quantity: 'water volume only', decoy: true }],
    keyed_order: ['intake', 'primary', 'secondary', 'tertiary', 'disinfection'],
    decoys: ['dilution_decoy'],
    governing_relationship: 'contaminant load=flow×concentration',
    answerText: 'Remove solids, organics, nutrients, and pathogens in order.',
  }, { payloadKey: 'chain' });
  ok(carrying.value.links.length === 6 && carrying.value.links[0].transfers.startsWith('wastewater'),
    '`quantity` did not become `transfers`');
  ok(!JSON.stringify(carrying.value).includes('quantity'), 'the dead name was written through');
  ok(carrying.value.links.every(l => !('decoy' in l)), '`decoy: true` was written through');
  ok(carrying.value.order.join() === 'intake,primary,secondary,tertiary,disinfection',
    '`keyed_order` did not become `order`');
  ok(carrying.value.distractor === 'dilution_decoy', 'the one decoy did not become the distractor');
  ok(!('governing' in carrying.value), 'a governing link was invented from a relationship');
  ok(carrying.owes.some(o => /a relationship rather than one/.test(o)),
    'the relationship standing in for a governing link was not owed');
  ok(carrying.owes.filter(o => /has no `reading`/.test(o)).length === 6,
    'the six missing readings were not owed');
  ok(carrying.key === 'chain', 'the payload key was not used');

  // Planetary Defense M8 S29: `carries`, and two decoys that name no link.
  const planetary = convertPayload({
    transfers: [{ id: 'raw_a', label: 'Raw packet A to correction C', carries: 'uncorrected echo samples' },
      { id: 'range_a', label: 'Correction C to range product A', carries: 'corrected round-trip delay' },
      { id: 'doppler_a', label: 'Correction C to Doppler product A', carries: 'corrected frequency shift' },
      { id: 'raw_b', label: 'Raw packet B to clock B', carries: 'independent echo samples and time' }],
    order: ['raw_a', 'range_a', 'doppler_a', 'raw_b'],
    decoys: [{ id: 'independent_a_products', label: 'Treat range A and Doppler A as independent' },
      { id: 'clock_b_to_a', label: 'Route packet A through independent clock B' }],
    governing_relationship: 'Range A and Doppler A share correction C.',
    correct: ['raw_a', 'range_a', 'doppler_a', 'raw_b'],
  }, { payloadKey: 'chain' });
  ok(planetary.value.links[0].transfers === 'uncorrected echo samples', '`carries` did not become `transfers`');
  ok(!('distractor' in planetary.value), 'a decoy that names no link became the distractor');
  ok(planetary.owes.some(o => /name no link/.test(o)), 'the decoys naming no link were not owed');
  // A path written twice and agreeing must not be owed as a disagreement.
  ok(!planetary.owes.some(o => /keys two different chains/.test(o)),
    'a path written twice and agreeing was owed as a disagreement');
  ok(convertPayload({ transfers: [{ id: 'a', label: 'A', carries: 'heat' }], order: ['a'], correct: ['b'] }, {})
    .owes.some(o => /keys two different chains/.test(o)), 'two different keyed paths were not owed');

  // Midway M12 S46: `carried_quantity`, and a transfer text that is the link's
  // own id — there is nothing in it for a player to reason about.
  const midway = convertPayload({
    transfers: [{ id: 'motion', label: 'Measure initial motion', carried_quantity: 'velocity' },
      { id: 'momentum', label: 'Calculate momentum change', carried_quantity: 'momentum' },
      { id: 'impulse', label: 'Use stopping time for average force', carried_quantity: 'impulse' },
      { id: 'support', label: 'Add weight to obtain support force', carried_quantity: 'force' }],
    order: ['motion', 'momentum', 'impulse', 'support'],
    governing_relationship: 'p=mv; J=delta p; N-mg=ma',
  }, { payloadKey: 'chain' });
  ok(midway.value.links[1].transfers === 'momentum', '`carried_quantity` did not become `transfers`');
  ok(midway.owes.filter(o => /made only of the link ids/.test(o)).length === 2,
    'the two transfers that only repeat their own link id were not owed');
  ok(!carrying.owes.some(o => /made only of the link ids/.test(o)),
    'a transfer naming a real quantity was called the template');
  ok(midway.owes.some(o => /large obvious member/.test(o)), 'the missing distractor was not owed');

  // Two decoys that ARE links: which one a player names instead is the board's
  // choice, and this tool does not make it.
  const twoDecoys = convertPayload({ transfers: [{ id: 'a', label: 'A', quantity: 'heat' },
    { id: 'b', label: 'B', quantity: 'water' }, { id: 'c', label: 'C', quantity: 'salt' },
    { id: 'd', label: 'D', quantity: 'air' }],
  order: ['a', 'b'], decoys: ['c', 'd'] }, {});
  ok(!('distractor' in twoDecoys.value), 'one of two decoys was picked as the distractor');
  ok(twoDecoys.owes.some(o => /marks 2 decoys/.test(o)), 'two decoys were not owed');
  ok(!carrying.owes.some(o => /marks 2 decoys/.test(o)), 'a single decoy was called two');

  ok(convertPayload({ transfers: [], _trailing: 'the sample reveals 4.2 mg/L' }, {})
    .owes.some(o => /prose follows the board/.test(o)), 'trailing prose was dropped');

  // ---------------------------------------------------- the canonical board
  // Planetary Defense M8 S29 as it arrives, with the per-link `transfers` and
  // `reading` the three real boards do not carry — so the one rename can be
  // tested without every assertion also reporting the two unauthored fields.
  const cLink = (id, label, extra2) => ({ id, label, transfers: `${label} onward`,
    reading: "1 unit", ...extra2 });
  const canon = {
    transfers: [cLink("source", "Detection products"), cLink("transfer", "Shared correction"),
      cLink("outcome", "Orbit solution"), cLink("decoy", "Raw frame count", { decoy: true })],
    path: ['source', 'transfer', 'outcome'],
    governingLink: 'transfer',
    distractor: 'decoy',
    correctConclusion: 'Mark A-products as correlated; preserve B-range as independent.',
  };
  const cc = convertCanonical(canon, { answerText: 'Mark A-products as correlated.' });
  ok(cc.key === 'chain', `the canonical board was keyed ${cc.key}`);
  // THE RENAME. Put it back — drop the `board.order = board.path` line — and
  // this case fails while nothing else here moves.
  ok((cc.value.order ?? []).join() === 'source,transfer,outcome',
    `path did not become order: ${JSON.stringify(cc.value.order)}`);
  ok(cc.value.governing === 'transfer' && cc.value.distractor === 'decoy',
    'the governing link or the distractor was lost');
  ok((cc.value.links ?? []).map(l => l.id).join() === 'source,transfer,outcome,decoy',
    'the links were reordered or lost — a chain\'s order is the chain');
  ok(cc.owes.length === 0, `a complete canonical chain owed ${JSON.stringify(cc.owes)}`);

  // The decoy flag does not reach the block — `convert` rebuilds every link out
  // of the four fields the panel reads — because the importer takes its decoys
  // from the path and two descriptions of one fact drift.
  ok((cc.value.links ?? []).every(l => !('decoy' in l)),
    'the `decoy` flag was written into a block that has no field for it');
  // A flag that DISAGREES with the path is the case worth reporting.
  const clash = convertCanonical({ ...canon,
    path: ['source', 'transfer', 'outcome', 'decoy'] }, { answerText: 'x' });
  ok(clash.owes.some(o => /flags `decoy: true` on decoy and its path/.test(o)),
    `a decoy flag inside the path was not owed: ${JSON.stringify(clash.owes)}`);
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!cc.owes.some(o => /flags `decoy/.test(o)),
    'a decoy flag that agrees with the path was owed as a disagreement');

  // The template's real gaps, said and never filled: no link says what moves
  // across it, and none carries a reading.
  const bare = convertCanonical({ ...canon, transfers: [
    { id: 'source', label: 'source step named in the question' },
    { id: 'transfer', label: 'governing transfer step' },
    { id: 'outcome', label: 'measured outcome' },
    { id: 'decoy', label: 'large visible but non-governing quantity', decoy: true }] },
  { answerText: 'x' });
  ok((bare.value.links ?? []).every(l => !('transfers' in l) && !('reading' in l)),
    'a transfer or a reading was invented for a link that authors neither');
  ok(bare.owes.filter(o => /has no `transfers`/.test(o)).length === 4,
    `the four links with nothing moving across them were not owed: ${JSON.stringify(bare.owes)}`);
  ok(bare.owes.filter(o => /has no `reading`/.test(o)).length === 4,
    'the four links with no reading were not owed');

  // The verdict, placed only where the stop has none.
  ok(!cc.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  ok(convertCanonical(canon, {}).extra.answerText.startsWith('Mark A-products'),
    'the board\'s verdict was not placed on a stop that had none');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('chain.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `CHAIN selftest: ${f.length} failure(s)` : 'CHAIN selftest: ok');
  process.exit(f.length ? 1 : 0);
}
