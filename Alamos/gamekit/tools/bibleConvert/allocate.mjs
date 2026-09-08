// allocate.mjs — the bible's ALLOCATE board into the importer's.
//
// 7 stops, across five campaigns. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// WHAT THE SEVEN BOARDS ACTUALLY SAY. All seven are byte-identical:
//
//   allocate:
//     pool: 100
//     items: [{id: evidence, cost: 35}, {id: safety, cost: 30, protected: true},
//             {id: operations, cost: 25}, {id: optional_speed, cost: 20},
//             {id: cosmetic, cost: 15}]
//     questions: [{id: evidence, required: true}, {id: safety, required: true},
//                 {id: continuity, required: true}, {id: speed, required: false}]
//     correctAllocation: [evidence, safety, operations]
//     forgoneQuestion: speed
//
// The economics is real and it is the point of the format: 125 of cost against a
// pool of 100, one protected item, so something has to go. That converts.
//
// WHAT DOES NOT, and it is most of the board:
//
//   `pool: 100` is a bare number. The importer reads `{amount, unit, mode}`, and
//   a pool with no unit is a hundred of nothing — Carrying Capacity's stop says
//   "180 kW", Mars's says "kWh", and neither number nor unit is in here.
//
//   The items have ids and costs and no LABELS. `id` is the token the answers
//   point at; `label` is what the player reads on the slate. The importer does
//   not refuse a missing one, which is why it is refused here.
//
//   The questions have no question. `{id: evidence, required: true}` says a plan
//   must answer something called evidence and never says what is asked, and the
//   importer's `answers` are identified BY their text. Worse, two of the four ids
//   — `continuity` and `speed` — are not item ids at all, so even reading the id
//   as the item it requires would name items the board does not offer. The
//   `requires` list, which is the entire link between what you funded and what
//   your plan can answer, is nowhere in the board.
//
//   `correctAllocation` and `forgoneQuestion` are the answer key, printed. The
//   importer has no field for either and this converter writes neither: ALLOCATE
//   grades a plan against what the required answers cost, and a board that names
//   the winning basket instead of the requirements has made the decision the
//   format exists for. That is an owe in the strict sense too — the requirements
//   are the thing not authored, and the answer key is what was written instead.
//
// `mode` is left unwritten rather than set to `scalar`: the importer already
// defaults it, and the difference between scalar and integrated is "you saved
// watts, I asked you to save watt-hours", which is a fact about the stop.
import { num, str, list, pick } from './_shared.mjs';
import { readBoard } from './_payload.mjs';
import { parseYaml } from '../yaml-lite.mjs';

export const FORMAT = 'ALLOCATE';

/**
 * The board the stop authored for ITSELF, from its payload line.
 *
 * Round 3's payload line is not the board any more: it is the POINTER WRAPPER —
 * `stop`, `format`, `source: "Handback 3 canonical interaction block"`, the
 * question, and a `payload:` string holding the compact board the earlier rounds
 * wrote. So a wrapper is read through, once, and a board that is already a board
 * has no `payload` of its own to read through.
 *
 * Nothing here invents anything: it is the bible's own board, in the place the
 * bible put it.
 */
export function ownBoard(stop, key){
  const first = readBoard(stop?.payload, key, parseYaml);
  let b = first?.board;
  if(b && typeof b === 'object' && typeof b.payload === 'string'){
    const second = readBoard(b.payload, key, parseYaml);
    b = second && String(second.key) === key ? second.board : null;
  }
  return b && typeof b === 'object' && !Array.isArray(b) ? b : null;
}

export const convert = (b) => {
  const owes = [];

  // ---- the pool. A bare number is an amount with no unit.
  const rawPool = pick(b, 'pool');
  const poolObj = rawPool && typeof rawPool === 'object' ? rawPool : { amount: rawPool };
  // `value` is the fifth round's spelling of the same number; the importer reads
  // `amount`. One rename, and without it a pool of a hundred points reads as no
  // pool at all and every affordability check below goes quiet.
  const amount = num(pick(poolObj, 'amount', 'value'));
  if(amount === undefined) owes.push('no numeric `pool`');
  const unit = str(poolObj.unit);
  if(!unit){
    owes.push(`the pool is a bare ${amount ?? '?'} with no unit — a hundred of nothing;`
      + ' the stop\'s own copy names kilowatts, points or kilowatt-hours');
  }
  const mode = str(poolObj.mode);
  if(mode && !['scalar', 'integrated'].includes(mode)){
    owes.push(`pool mode "${mode}" is neither scalar nor integrated`);
  }

  // ---- the items.
  const items = list(pick(b, 'items')).map((it, i) => {
    const id = str(pick(it, 'id', 'label'));
    const name = id || `item ${i + 1}`;
    const label = str(it?.label);
    if(!label) owes.push(`item \`${name}\` has no \`label\` — the words the player reads on the slate`);
    // `cost`, or `rate` × `hours` for the integrated variant; the importer does
    // that multiplication itself, so both are carried as written.
    const cost = num(it?.cost), rate = num(it?.rate), hours = num(it?.hours);
    if(cost === undefined && (rate === undefined || hours === undefined)){
      owes.push(`item \`${name}\` has neither a numeric \`cost\` nor a \`rate\` and \`hours\``);
    }
    return {
      ...(id ? { id } : {}), ...(label ? { label } : {}),
      ...(cost !== undefined ? { cost } : {}),
      ...(rate !== undefined ? { rate } : {}), ...(hours !== undefined ? { hours } : {}),
      ...(it?.protected === true ? { protected: true } : {}),
      ...(str(it?.note) ? { note: str(it.note) } : {}),
    };
  });
  if(items.length < 4) owes.push(`${items.length} item(s), and an allocation needs at least four to trade between`);
  const itemIds = new Set(items.map(it => it.id).filter(Boolean));

  const spend = (only) => items.reduce((n, it) => {
    if(only && !only(it)) return n;
    const c = it.cost ?? (it.rate !== undefined && it.hours !== undefined ? it.rate * it.hours : undefined);
    return n + (c ?? 0);
  }, 0);
  if(amount !== undefined && items.length && spend() <= amount){
    owes.push(`every item together costs ${+spend().toFixed(2)} against a pool of ${amount} — the whole`
      + ' board is affordable, so nothing is being traded away');
  }
  if(amount !== undefined && spend(it => it.protected) > amount){
    owes.push(`the protected items alone cost ${+spend(it => it.protected).toFixed(2)}, more than the pool`);
  }

  // ---- the answers a plan may or may not be able to give.
  const answers = list(pick(b, 'answers', 'questions')).map((q, i) => {
    const id = str(pick(q, 'id'));
    const name = id || `answer ${i + 1}`;
    const question = str(pick(q, 'question', 'text', 'prompt'));
    if(!question){
      owes.push(`answer \`${name}\` has no question text — the board wrote an id and a \`required\``
        + ' flag, and the panel identifies an answer by what it asks');
    }
    const requires = list(pick(q, 'requires', 'needs')).map(str).filter(Boolean);
    if(!requires.length){
      owes.push(`answer \`${name}\` names no \`requires\` — the link between what the plan funded`
        + ' and what it can then answer, which is the whole of how this format grades');
    }
    requires.forEach(r => { if(itemIds.size && !itemIds.has(r)){
      owes.push(`answer \`${name}\` requires item \`${r}\`, which the allocation does not offer`);
    } });
    // `required` is carried as written, false included. The bible spells the
    // negative case out — `{id: speed, required: false}` — and it is the one that
    // says which answer the plan is allowed to forgo, which is the decision this
    // format is for. Dropping a false because it reads like a default is how the
    // one answer that carries the trade-off becomes indistinguishable from an
    // answer nobody thought about.
    const required = typeof q?.required === 'boolean' ? q.required : undefined;
    if(required === undefined) owes.push(`answer \`${name}\` says nothing about whether it is \`required\``);
    return {
      ...(question ? { question } : {}),
      ...(requires.length ? { requires } : {}),
      ...(required !== undefined ? { required } : {}),
    };
  });
  if(answers.length < 3) owes.push(`${answers.length} answer(s), and an allocation needs at least three`);
  if(!answers.some(q => q.required)) owes.push('no answer is `required` — every plan passes');
  if(answers.length && !answers.some(q => !q.required)){
    owes.push('every answer is required — there is nothing the plan is allowed to forgo,'
      + ' which is the decision this format exists to make');
  }

  // THE ANSWER KEY IS NOT THE BOARD. `correctAllocation` names the basket that
  // wins and `forgoneQuestion` names what it gives up; the panel grades a plan by
  // whether the required answers are affordable, and it has neither field. A
  // printed winning basket is a panel enforcing the player's decision, so it is
  // dropped and named rather than carried into a key nothing reads.
  const key = list(pick(b, 'correctAllocation')).map(str).filter(Boolean);
  if(key.length){
    owes.push(`the board prints a \`correctAllocation\` of [${key.join(', ')}] instead of the`
      + ' `requires` lists that would make a plan right or wrong — the answer key stands where'
      + ' the decision should');
  }

  return { key: 'allocate', value: {
    pool: { ...(amount !== undefined ? { amount } : {}), ...(unit ? { unit } : {}), ...(mode ? { mode } : {}) },
    items, answers,
    ...(str(b.hint) ? { hint: str(b.hint) } : {}),
    ...(str(b.moral) ? { moral: str(b.moral) } : {}),
  }, owes };
};

// ------------------------------------------------------- the authored boards
//
// 7 stops point at their own interaction block, and unlike §7's template they
// are seven different economies: 180 kW of island power against 205 of demand,
// 600 kWh after a dust storm against 660, 100 points of fishery enforcement
// against 140. Every one of them costs more than its pool, which is the format
// working. Two hands:
//
//   allocate:{pool:100, items:[{id:"landing_tags",label:"numbered landing tags",
//                               cost:30,required:true}, …],
//             questions:[{id:"replacement",text:"Does the plan keep permitted catch
//                         below measured replacement?",required:true}, …],
//             correct_allocation:{landing_tags:30, …}, reserve:10, answerText:"…"}
//
//   allocate: pool: {label: …, value: 600, unit: kWh}
//             items: - {id: habitat, label: "Protected habitat load", cost: 180} …
//             questions: - {id: crew_safe, label: "Does the habitat remain safe?",
//                           required: true, needs: [habitat]} …
//             correct: [habitat, cooling, …]  pass_rule: "…"
//
// The renames are the whole of the second hand: `value` is the pool's amount,
// `text` or `label` is the question, `needs` is `requires`. The normalised board
// then goes through `convert`, so the economics — four items, more cost than
// pool, protected items inside it, three answers, one the plan may forgo — is
// checked once rather than described twice.
//
// WHAT THE SEVEN OWE, and the first one is the same defect §7 had in a different
// place. Six of the seven give their questions no `needs` at all and instead
// mark the winning items `required: true` on the items themselves, with
// `correct_allocation` printing the basket underneath. The link between what a
// plan funds and what it can then answer — the whole of how this format grades —
// is nowhere, and what stands in its place is the answer. Reading the item flags
// back into `requires` would be inventing that link, so it is named instead.
//
// WHAT IS DROPPED, documented rather than owed: the pool's own `label`
// ("Dust-limited electrical energy"), which the panel has no field for and which
// the stop's copy says anyway; `forbidden_action`, a safety note; `answerText`,
// which is the stop's and not the board's.
export const convertPayload = (board, stop) => {
  const b = board ?? {};
  const owes = [];

  const rawPool = pick(b, 'pool');
  const poolIn = rawPool && typeof rawPool === 'object' ? rawPool : { amount: rawPool };
  const amount = num(pick(poolIn, 'amount', 'value'));

  const rawItems = list(pick(b, 'items'));
  const nameOf = (x, i, what) => str(pick(x, 'id', 'label')) || `${what} ${i + 1}`;

  // A slider is not a basket. Eleven Days writes its five items as
  // `cost_per_unit: 1, min: 10, max: 40, step: 5` — you put an amount into each,
  // and the panel funds an item whole or not at all. That is one fact about the
  // board, so it is said once rather than five times; `convert` says the
  // per-item half (no cost, no rate and hours) on its own.
  const sliders = rawItems.filter(it => num(pick(it, 'cost')) === undefined
    && (num(pick(it, 'cost_per_unit', 'costPerUnit')) !== undefined || num(pick(it, 'min')) !== undefined));
  if(sliders.length){
    owes.push(`${sliders.length} item(s) are written as sliders — \`cost_per_unit\`, \`min\`, \`max\``
      + ' and `step` — rather than things bought whole; the panel funds an item or does not, so each'
      + ' needs one `cost`, and a floor a plan must clear belongs in the `requires` of the answer'
      + ' that needs it');
  }

  const flagged = rawItems.filter(it => it && it.required === true).map((it, i) => nameOf(it, i, 'item'));
  if(flagged.length){
    owes.push(`item(s) [${flagged.join(', ')}] carry their own \`required\` flag, which names the`
      + ' basket that wins; requirement belongs on the answers, as the `requires` list of an answer'
      + ' marked `required` — an item that says it is required has made the decision for the player');
  }

  const reserve = num(pick(b, 'reserve'));
  if(reserve !== undefined){
    owes.push(`the board holds ${reserve}${amount !== undefined ? ` of the ${amount}` : ''} back as a`
      + ' `reserve`, and the panel has no field for a slice of the pool that may not be spent —'
      + ' a reserve is an item with `protected: true` and a cost');
  }

  const passRule = str(pick(b, 'pass_rule', 'passRule'));
  if(passRule){
    owes.push(`the board states its grade in prose — "${passRule}" — and the panel grades a plan by`
      + ' whether the required answers are affordable inside the pool; anything else in that'
      + ' sentence has to become an item, a cost or a `requires` list');
  }

  const answersIn = list(pick(b, 'answers', 'questions'));
  const thresholds = [];
  const answers = answersIn.map((q, i) => {
    const question = str(pick(q, 'question', 'text', 'prompt', 'label'));
    const needs = pick(q, 'requires', 'needs');
    // `needs: [habitat]` is a requires list. `needs: {transport: 10}` is a
    // threshold — ten points *into* transport — and flattening it to the item id
    // would keep the link and silently drop the number that makes it a decision.
    if(needs && typeof needs === 'object' && !Array.isArray(needs)){
      thresholds.push(`\`${nameOf(q, i, 'answer')}\` needs `
        + Object.entries(needs).map(([k, v]) => `${v} of \`${k}\``).join(' and '));
    }
    return {
      // Carried so an owe can say `replacement` rather than "answer 1". The
      // importer's answer is identified by its text and `convert` emits no id,
      // so this reaches the naming and nothing else.
      ...(pick(q, 'id') !== undefined ? { id: pick(q, 'id') } : {}),
      ...(question ? { question } : {}),
      ...(Array.isArray(needs) ? { requires: needs.map(str).filter(Boolean) } : {}),
      ...(typeof q?.required === 'boolean' ? { required: q.required } : {}),
    };
  });
  if(thresholds.length){
    owes.push(`${thresholds.length} answer(s) name an amount rather than an item — ${thresholds.join('; ')}`
      + ' — and a `requires` list holds the items a plan has to fund, not how much goes into each');
  }

  // The answer key, however it is spelled and whether it is a list of ids or a
  // map of id to spend. `convert` owes it; this puts it where `convert` looks.
  const keyed = pick(b, 'correctAllocation', 'correct_allocation', 'correct');
  const correctAllocation = Array.isArray(keyed) ? keyed.map(str)
    : (keyed && typeof keyed === 'object' ? Object.keys(keyed) : (str(keyed) ? [str(keyed)] : []));

  if(str(b._trailing)){
    owes.push(`prose follows the board — "${str(b._trailing)}" — and the allocation board has no`
      + ' field for it; if it carries a cost or a limit, author it into the item it belongs to');
  }

  const out = convert({
    pool: {
      ...(amount !== undefined ? { amount } : {}),
      ...(str(pick(poolIn, 'unit')) ? { unit: str(pick(poolIn, 'unit')) } : {}),
      ...(str(pick(poolIn, 'mode')) ? { mode: str(pick(poolIn, 'mode')) } : {}),
    },
    items: rawItems.map(it => ({
      ...(pick(it, 'id') !== undefined ? { id: pick(it, 'id') } : {}),
      ...(pick(it, 'label') !== undefined ? { label: pick(it, 'label') } : {}),
      ...(num(pick(it, 'cost')) !== undefined ? { cost: num(pick(it, 'cost')) } : {}),
      ...(num(pick(it, 'rate')) !== undefined ? { rate: num(pick(it, 'rate')) } : {}),
      ...(num(pick(it, 'hours')) !== undefined ? { hours: num(pick(it, 'hours')) } : {}),
      ...(it?.protected === true ? { protected: true } : {}),
      ...(str(pick(it, 'note')) ? { note: str(pick(it, 'note')) } : {}),
    })),
    answers,
    ...(correctAllocation.length ? { correctAllocation } : {}),
    ...(str(b.hint) ? { hint: str(b.hint) } : {}),
    ...(str(b.moral) ? { moral: str(b.moral) } : {}),
  });

  return { key: out.key, value: out.value, owes: [...out.owes, ...owes] };
};

// ------------------------------------------------------ the canonical block
//
// 7 stops carry `**Handback 3 canonical interaction block — ALLOCATE:**`, and
// for ALLOCATE it is NOT a board. It is keyed `allocate_patch` and it holds one
// thing:
//
//   allocate_patch:
//     questions:
//       - {id: payments, requires: [clearing], required: true}
//       - {id: growth,   requires: [training, port], required: true}
//       - {id: reserve,  requires: [reserve], required: false}
//     rule: "At least one outcome may be forgone; required outcomes are not
//            pre-protected, so the player must choose a feasible basket."
//     preProtected: []
//     decision_can_fail: true
//     question: "Allocate all 100 and submit the four funded items."
//
// No pool, no items, no question text. Carried through as it stands it writes a
// key called `allocate_patch` that the importer has never heard of, and the
// board the panel actually reads stays exactly as unfinished as it was.
//
// WHAT IT IS FOR, and it is the one field these seven boards owed. The note
// under `convert` says it in full: six of the seven gave their questions no
// `needs` at all, so the link between what a plan funds and what it can then
// answer — the whole of how this format grades — was nowhere. `allocate_patch`
// IS that link, authored at last, one `requires` list per answer, plus the
// `required: false` that names the outcome a plan is allowed to forgo. So the
// patch is applied to the stop's own board and the result goes through
// `convertPayload`, which is where every rule about an allocation already lives.
//
// The two live complaints this answers are one defect, not two. An answer with
// no `requires` trips `"X" requires no items — it is always answered`; the check
// below it then asks whether everything that answer needs is protected, and
// `[].every(…)` is true of an empty list, so the same answer trips `"X" is
// required and everything it needs is already protected` as well. 19 lines and
// 18 lines, one missing field.
//
// MATCHED BY ID, AND ONLY BY ID. Five of the seven patches name exactly the
// answers their board already has — `payments`, `growth`, `reserve` against
// `payments`, `growth`, `reserve`. Two do not: Eleven Days patches
// `targeted_capacity`/`accessibility`/`corridor_wide_order` onto a board whose
// answers are `mobility`/`continuity`/`access`/`extra_comfort`, and Mars patches
// `life_support`/`analysis`/`comfort` onto `crew_safe`/`heat_safe`/`fuel_clean`/
// `replace_h2`. Those two are a real finding — the patch is written against
// answers and items the board does not have, and `requires: [medical]` names an
// item nobody funded — so the unmatched patch entries are NAMED and the board's
// own answers are left as the bible wrote them. Taking three unmatched ids as
// three replacement answers would put a question with no text and a `requires`
// list pointing at nothing in front of a player.
//
// WHAT IS DROPPED, documented rather than owed: `question`, which restates the
// stop's own question line; `rule` and `decision_can_fail`, which describe in
// prose what the merged board then asserts in fields — an answer marked
// `required: false` IS "at least one outcome may be forgone", and a required
// answer whose items are affordable but not free IS "the decision can fail".
export const convertCanonical = (patchIn, stop) => {
  const patch = patchIn ?? {};
  const owes = [];

  /**
   * A LATER ROUND SENT THE WHOLE BOARD, not a patch, and merging it as one threw
   * the costs away.
   *
   * The block this function was written for is a fragment: the answers'
   * `requires` lists and nothing else. It is applied onto the board the stop
   * already carries on its payload line. The fifth round instead wrote the
   * allocation entire — a `pool` with a value and a unit, six `items` each with
   * a `cost`, and the `questions` that need them — and put it under the same
   * heading.
   *
   * Read as a patch, its costs never reached anything: the merge keeps the OLD
   * payload board's items, which have none, and overlays only the `requires`
   * lists. Nine refusals about an allocation whose every item is priced.
   *
   * Told apart by `items`, which a patch never carries and a board always does.
   */
  if(list(pick(patch, 'items')).length){
    /**
     * The whole board, but its answers are ids and flags. The words a player
     * reads are on the stop's own payload board, under the same ids, because
     * that is where they have been since the first round — so the text is taken
     * from there and everything else from the block. An id the payload does not
     * carry is left textless and owed by `convert`, which is the honest report:
     * the board asks a question nobody has written.
     */
    const prior = ownBoard(stop, 'allocate');
    const said = new Map();
    for(const q of list(pick(prior ?? {}, 'answers', 'questions'))){
      const id = str(pick(q, 'id'));
      const text = str(pick(q, 'question', 'text', 'label'));
      if(id && text) said.set(id, text);
    }
    const whole = { ...patch };
    if(said.size){
      whole.questions = list(pick(patch, 'questions', 'answers')).map((q) => {
        const id = str(pick(q, 'id'));
        const has = str(pick(q, 'question', 'text', 'label'));
        return (!has && id && said.has(id)) ? { ...q, question: said.get(id) } : q;
      });
      delete whole.answers;
    }
    const out = convert(whole, stop);
    return { key: out.key ?? 'allocate', value: out.value, owes: out.owes, extra: out.extra };
  }

  const board = ownBoard(stop, 'allocate');
  if(!board){
    return { key: 'allocate', value: {}, owes: [
      'the canonical block is an `allocate_patch` — the answers\' `requires` lists and nothing'
      + ' else, no pool and no items — and the board it patches, on the stop\'s own payload line,'
      + ' could not be read; there is no allocation for the patch to go onto'] };
  }

  const boardQs = list(pick(board, 'answers', 'questions'));
  const idOf = (q) => str(pick(q, 'id'));
  const at = new Map();
  boardQs.forEach((q, i) => { const id = idOf(q); if(id && !at.has(id)) at.set(id, i); });

  // The patch, entry by entry, onto the answer it names.
  const answers = boardQs.map(q => ({ ...q }));
  const unmatched = [];
  for(const p of list(pick(patch, 'questions', 'answers'))){
    const id = idOf(p);
    const requires = list(pick(p, 'requires', 'needs')).map(str).filter(Boolean);
    if(!id || !at.has(id)){ unmatched.push(id || '(an answer with no id)'); continue; }
    const q = answers[at.get(id)];
    if(requires.length) q.requires = requires;
    if(typeof p.required === 'boolean') q.required = p.required;
  }
  if(unmatched.length){
    owes.push(`the patch names answer(s) [${unmatched.join(', ')}], and the board's answers are`
      + ` [${[...at.keys()].join(', ') || 'unnamed'}] — nothing matches, so the \`requires\` lists`
      + ' and the one answer the plan may forgo were not applied; the patch is written against'
      + ' answers this board does not have');
  }

  // `preProtected: []` says nothing on this board is funded before the player
  // arrives. An item carrying `protected: true` is exactly that, and a protected
  // item is one the panel funds for you — so the two blocks disagree about what
  // the player is deciding, which is the decision this format exists to make.
  const preProtected = pick(patch, 'preProtected', 'pre_protected');
  const prot = list(pick(board, 'items')).filter(it => it?.protected === true)
    .map((it, i) => str(pick(it, 'id', 'label')) || `item ${i + 1}`);
  if(Array.isArray(preProtected) && !preProtected.length && prot.length){
    owes.push(`the patch declares \`preProtected: []\` and item(s) [${prot.join(', ')}] carry`
      + ' `protected: true` — a protected item is funded before the player chooses, so the two'
      + ' blocks disagree about what is still open to decide');
  }

  const out = convertPayload({ ...board, questions: answers, answers: undefined }, stop);
  return { key: out.key, value: out.value, owes: [...out.owes, ...owes] };
};

// ---------------------------------------------------------------- selftest
//
// `node tools/bibleConvert/allocate.mjs`. The case that matters is the second:
// pull one field and it must appear in `owes` and must NOT appear in `value`.
function selftest(){
  const fails = [];
  const ok = (cond, what) => { if(!cond) fails.push(what); };

  const complete = {
    pool: { amount: 180, unit: 'kW' },
    items: [
      { id: 'water', label: 'the desalination pumps', cost: 60, protected: true },
      { id: 'school', label: 'the school block', cost: 40 },
      { id: 'homes', label: 'household circuits', cost: 50 },
      { id: 'cold', label: 'the fish store chillers', cost: 45 },
      { id: 'lights', label: 'the harbour floodlights', cost: 30 },
    ],
    answers: [
      { question: 'Can the island drink tomorrow?', requires: ['water'], required: true },
      { question: 'Does the catch keep?', requires: ['cold'], required: true },
      { question: 'Do the lessons run?', requires: ['school'], required: true },
      { question: 'Is the harbour lit all night?', requires: ['lights'], required: false },
    ],
  };
  const a = convert(complete);
  ok(a.key === 'allocate', `key is "${a.key}", not "allocate"`);
  ok(a.owes.length === 0, `complete board owes ${a.owes.length}: ${a.owes.join(' / ')}`);
  ok(a.value.pool.unit === 'kW', 'the pool unit did not come through');
  ok(!('mode' in a.value.pool), 'a `mode` the bible did not write was set anyway');

  // One field out, and only that field.
  const short = structuredClone(complete);
  delete short.items[2].label;
  const c = convert(short);
  ok(c.owes.some(o => /item `homes` has no `label`/.test(o)), `a missing label is not owed: ${c.owes.join(' / ')}`);
  ok(!('label' in c.value.items[2]), 'a missing label was invented into value');
  ok(c.owes.length === 1, `pulling one field owes ${c.owes.length} things: ${c.owes.join(' / ')}`);
  ok(c.value.items[0].label === 'the desalination pumps', 'an item that was fine changed');

  // A bare-number pool is an amount with no unit.
  const bare = convert({ ...complete, pool: 180 });
  ok(bare.owes.some(o => /a hundred of nothing|with no unit/.test(o)), 'a unitless pool is not owed');
  ok(bare.value.pool.amount === 180 && !('unit' in bare.value.pool), 'a unit was invented for a bare pool');

  // The seven shipping boards, exercising the tells on the thing they were
  // written for rather than on a case invented to match them.
  const shipped = convert({
    pool: 100,
    items: [{ id: 'evidence', cost: 35 }, { id: 'safety', cost: 30, protected: true },
            { id: 'operations', cost: 25 }, { id: 'optional_speed', cost: 20 },
            { id: 'cosmetic', cost: 15 }],
    questions: [{ id: 'evidence', required: true }, { id: 'safety', required: true },
                { id: 'continuity', required: true }, { id: 'speed', required: false }],
    correctAllocation: ['evidence', 'safety', 'operations'],
    forgoneQuestion: 'speed',
  });
  ok(shipped.owes.filter(o => /has no `label`/.test(o)).length === 5, 'the five unlabelled items are not all owed');
  ok(shipped.owes.filter(o => /has no question text/.test(o)).length === 4, 'the four textless answers are not all owed');
  ok(shipped.owes.filter(o => /names no `requires`/.test(o)).length === 4, 'the four missing requires are not all owed');
  ok(shipped.owes.some(o => /the answer key stands where the decision should/.test(o)),
    `the printed answer key is not owed: ${shipped.owes.join(' / ')}`);
  ok(shipped.value.items.every(it => !('label' in it)), 'a shipping item got a label the bible did not author');
  ok(shipped.value.answers.every(q => !('question' in q) && !('requires' in q)),
    'a shipping answer got a question or a requires list the bible did not author');
  ok(shipped.value.answers[3].required === false, 'the one answer the plan may forgo lost its `required: false`');
  ok(shipped.value.pool.amount === 100 && shipped.value.items[1].protected === true,
    'the economics the bible did author did not come through');
  ok(!('correctAllocation' in shipped.value) && !('forgoneQuestion' in shipped.value),
    'the printed answer key reached the value');

  // ------------------------------------------------------ authored boards
  const authored = {
    pool: { label: 'Dust-limited electrical energy', value: 600, unit: 'kWh' },
    items: [
      { id: 'habitat', label: 'Protected habitat load', cost: 180, protected: true },
      { id: 'cooling', label: 'Reactor thermal control', cost: 120 },
      { id: 'purification', label: 'Product purification', cost: 80 },
      { id: 'electrolysis', label: 'Recovery electrolysis', cost: 160 },
      { id: 'refrigeration', label: 'Tank refrigeration', cost: 60 },
      { id: 'fast_charge', label: 'Optional battery fast charge', cost: 60 },
    ],
    questions: [
      { id: 'crew_safe', label: 'Does the habitat remain safe?', required: true, needs: ['habitat'] },
      { id: 'heat_safe', label: 'Does the reactor stay below the heat limit?', required: true,
        needs: ['cooling'] },
      { id: 'fuel_clean', label: 'Will recovered product stay within specification?', required: true,
        needs: ['purification', 'refrigeration'] },
      { id: 'fast', label: 'Can the battery be fast-charged tonight?', required: false,
        needs: ['fast_charge'] },
    ],
  };
  const p = convertPayload(structuredClone(authored), {});
  ok(p.key === 'allocate', `an authored board keyed "${p.key}"`);
  ok(p.owes.length === 0, `a complete authored board owes ${p.owes.length}: ${p.owes.join(' / ')}`);
  ok(p.value.pool.amount === 600 && p.value.pool.unit === 'kWh', '`value` did not become the pool amount');
  ok(p.value.answers[0].question === 'Does the habitat remain safe?', '`label` did not become the question');
  ok(p.value.answers[2].requires.join() === 'purification,refrigeration', '`needs` did not become `requires`');
  ok(p.value.items[0].protected === true, 'a protected item lost its flag');

  // One field out, and only that field.
  const noLabel = structuredClone(authored);
  delete noLabel.items[2].label;
  const q = convertPayload(noLabel, {});
  ok(q.owes.length === 1 && /item `purification` has no `label`/.test(q.owes[0]),
    `pulling one label owes ${q.owes.length}: ${q.owes.join(' / ')}`);
  ok(!('label' in q.value.items[2]), 'a missing label was invented into value');

  // A shipping board, in the compact hand, verbatim.
  const carrying = {
    pool: 100,
    items: [
      { id: 'landing_tags', label: 'numbered landing tags', cost: 30, required: true },
      { id: 'landing_log', label: 'time-and-mass landing log', cost: 20, required: true },
      { id: 'nursery_patrol', label: 'nursery-zone patrol', cost: 25, required: true },
      { id: 'independent_survey', label: 'independent stock survey', cost: 15, required: true },
      { id: 'publicity', label: 'voluntary-compliance publicity', cost: 20, required: false },
      { id: 'boat_subsidy', label: 'larger-boat subsidy', cost: 30, required: false },
    ],
    questions: [
      { id: 'replacement', text: 'Does the plan keep permitted catch below measured replacement?',
        required: true },
      { id: 'compliance', text: 'Can it detect untagged or nursery-zone catch?', required: true },
      { id: 'independence', text: 'Does it preserve an independent stock check?', required: true },
    ],
    correct_allocation: { landing_tags: 30, landing_log: 20, nursery_patrol: 25, independent_survey: 15 },
    reserve: 10,
    answerText: 'Fund tags, the landing log, nursery patrol, and an independent survey.',
  };
  const s = convertPayload(structuredClone(carrying), {});
  ok(s.value.pool.amount === 100 && !('unit' in s.value.pool), 'a unit was invented for a bare pool');
  ok(s.value.items.length === 6 && s.value.items[0].cost === 30, 'the economics did not come through');
  ok(s.value.items.every(it => !('required' in it)), 'an item kept a `required` flag the panel cannot read');
  ok(s.value.answers.every(a => !('requires' in a)), 'a requires list was invented from the item flags');
  ok(s.value.answers[0].question === 'Does the plan keep permitted catch below measured replacement?',
    '`text` did not become the question');
  ok(s.owes.filter(o => /names no `requires`/.test(o)).length === 3, 'the three unlinked answers are not owed');
  ok(s.owes.some(o => /carry their own `required` flag/.test(o)), 'the winning basket on the items is not owed');
  ok(s.owes.some(o => /the answer key stands where the decision should/.test(o)),
    '`correct_allocation` was not read as the printed answer key');
  ok(s.owes.some(o => /holds 10 of the 100 back as a `reserve`/.test(o)), 'the reserve is not owed');
  ok(!('correctAllocation' in s.value) && !('reserve' in s.value) && !('answerText' in s.value),
    'the answer key, the reserve or the answer text reached the value');

  // A threshold is not a requires list, and a slider is not an item.
  const eleven = convertPayload({
    pool: { label: 'First-wave capacity', value: 100, unit: 'points' },
    items: [
      { id: 'transport', label: 'Mobility-limited transport', cost_per_unit: 1, min: 10, max: 40, step: 5 },
      { id: 'shelters', label: 'Shelter readiness', cost_per_unit: 1, min: 10, max: 40, step: 5 },
      { id: 'hospitals', label: 'Hospital continuity', cost_per_unit: 1, min: 10, max: 40, step: 5 },
      { id: 'communications', label: 'Multilingual alerts', cost_per_unit: 1, min: 10, max: 40, step: 5 },
      { id: 'reserve', label: 'Reserve', cost_per_unit: 1, min: 20, max: 40, step: 5 },
    ],
    questions: [
      { id: 'mobility', label: 'Can mobility-limited residents be reached?', required: true,
        needs: { transport: 10 } },
      { id: 'continuity', label: 'Can shelters and hospitals stay ready?', required: true,
        needs: { shelters: 10, hospitals: 10 } },
      { id: 'access', label: 'Can every county receive accessible alerts?', required: true,
        needs: { communications: 10 } },
      { id: 'extra_comfort', label: 'Can optional comfort sites be expanded now?', required: false,
        needs: { shelters: 30 } },
    ],
    correct: { transport: 20, shelters: 20, hospitals: 20, communications: 20, reserve: 20 },
    pass_rule: 'total = 100; each operational item >= 10; reserve >= 20',
  }, {});
  ok(eleven.owes.some(o => /5 item\(s\) are written as sliders/.test(o)), 'the slider items are not owed');
  ok(eleven.value.items.every(it => !('cost' in it)), 'a cost was invented for a slider');
  ok(eleven.owes.some(o => /10 of `transport`/.test(o) && /30 of `shelters`/.test(o)),
    `the thresholds are not owed with their numbers: ${eleven.owes.join(' / ')}`);
  ok(eleven.value.answers.every(a => !('requires' in a)), 'a threshold was flattened into a requires list');
  ok(eleven.value.answers[3].required === false, 'the one answer the plan may forgo lost its flag');
  ok(eleven.owes.some(o => /states its grade in prose/.test(o)), '`pass_rule` is not owed');

  // Prose after the board is named, never dropped.
  const tail = structuredClone(authored);
  tail._trailing = 'the storm cuts another 40 kWh';
  ok(convertPayload(tail, {}).owes.some(o => /another 40 kWh/.test(o)), 'trailing prose was silently dropped');

  // ----------------------------------------------------- the canonical patch
  //
  // Changeover's stop 43, verbatim: the pointer wrapper the round-3 payload line
  // is, with the compact board inside it, and the `allocate_patch` block.
  const wrapper = [
    'stop: Stop 43 - Protect growth engines',
    'format: ALLOCATE',
    'source: "Handback 3 canonical interaction block"',
    'question: "Allocate all 100 and submit the four funded items."',
    'payload: "`allocate:{pool:100,items:[{id:\\"clearing\\",label:\\"payment clearing\\",cost:30,'
      + 'required:true},{id:\\"training\\",label:\\"worker training\\",cost:25,required:true},'
      + '{id:\\"port\\",label:\\"port repair\\",cost:25,required:true},{id:\\"reserve\\",'
      + 'label:\\"protected contingency reserve\\",cost:20,required:true,protected:true},'
      + '{id:\\"publicity\\",label:\\"confidence publicity\\",cost:20,required:false}],'
      + 'questions:[{id:\\"payments\\",text:\\"Does the plan keep clearing operational?\\",required:true},'
      + '{id:\\"growth\\",text:\\"Does it fund training and port capacity?\\",required:true},'
      + '{id:\\"reserve\\",text:\\"Does it preserve the restart reserve?\\",required:true}],'
      + 'correct_allocation:{clearing:30,training:25,port:25,reserve:20}}`"',
  ].join('\n');
  const changeoverPatch = {
    questions: [
      { id: 'payments', requires: ['clearing'], required: true },
      { id: 'growth', requires: ['training', 'port'], required: true },
      { id: 'reserve', requires: ['reserve'], required: false },
    ],
    rule: 'At least one outcome may be forgone; required outcomes are not pre-protected.',
    preProtected: [],
    decision_can_fail: true,
    question: 'Allocate all 100 and submit the four funded items.',
  };
  const cn = convertCanonical(structuredClone(changeoverPatch), { payload: wrapper });
  ok(cn.key === 'allocate', `a canonical patch keyed "${cn.key}"`);
  ok(cn.value.items.length === 5 && cn.value.pool.amount === 100,
    'the board the patch goes onto did not come through the pointer wrapper');
  ok(cn.value.answers.length === 3, `the patch produced ${cn.value.answers.length} answers, not three`);
  ok(cn.value.answers[0].question === 'Does the plan keep clearing operational?',
    'the answer kept the board\'s own question text');
  ok(cn.value.answers[1].requires.join() === 'training,port', '`requires` did not reach the answer');
  ok(cn.value.answers[2].required === false, 'the one answer the plan may forgo lost its flag');
  ok(!cn.owes.some(o => /names no `requires`/.test(o)),
    `an answer the patch linked is still owed a requires list: ${cn.owes.join(' / ')}`);
  ok(cn.owes.some(o => /`preProtected: \[\]` and item\(s\) \[reserve\]/.test(o)),
    `the protected item against an empty preProtected is not owed: ${cn.owes.join(' / ')}`);
  ok(!('rule' in cn.value) && !('preProtected' in cn.value) && !('decision_can_fail' in cn.value),
    'a patch field the panel has no place for reached the value');

  // THE CASE THAT MATTERS. Two inputs that should score the same: the patch
  // applied by id, and the same patch with the ids renamed to answers the board
  // does not have. The second must NOT quietly land its requires lists on the
  // board's answers by position — that is Eleven Days and Mars, and it is a
  // finding rather than a rename.
  const renamed = structuredClone(changeoverPatch);
  renamed.questions[0].id = 'life_support';
  renamed.questions[1].id = 'analysis';
  renamed.questions[2].id = 'comfort';
  const mm = convertCanonical(renamed, { payload: wrapper });
  ok(mm.owes.some(o => /life_support, analysis, comfort/.test(o) && /nothing matches/.test(o)),
    `a patch naming answers the board does not have is not owed: ${mm.owes.join(' / ')}`);
  ok(mm.value.answers.every(q => !('requires' in q)),
    'an unmatched patch entry was applied by position anyway');
  ok(mm.value.answers.every(q => q.required === true),
    'an unmatched patch entry changed a `required` flag anyway');
  // and the matched case did not owe what the unmatched one owes.
  ok(!cn.owes.some(o => /nothing matches/.test(o)), 'a matched patch reported itself unmatched');

  // One patch entry out, and only that one.
  const oneOut = structuredClone(changeoverPatch);
  oneOut.questions.splice(2, 1);
  const p1 = convertCanonical(oneOut, { payload: wrapper });
  ok(p1.owes.some(o => /`reserve` names no `requires`/.test(o)),
    `the unpatched answer is not owed its requires list: ${p1.owes.join(' / ')}`);
  ok(!('requires' in p1.value.answers[2]), 'a requires list was invented for the unpatched answer');
  ok(p1.value.answers[0].requires.join() === 'clearing', 'an answer that was patched changed');
  ok(p1.owes.some(o => /every answer is required/.test(o)),
    'with the forgoable answer unpatched, every answer being required is not owed');

  // No board behind the patch: the patch alone is not an allocation.
  const none = convertCanonical(structuredClone(changeoverPatch), { payload: '' });
  ok(none.owes.length === 1 && /no allocation for the patch to go onto/.test(none.owes[0]),
    `a patch with no board owes ${none.owes.length}: ${none.owes.join(' / ')}`);
  ok(!Object.keys(none.value).length, 'a board was invented out of the patch alone');

  console.log(fails.length ? `ALLOCATE selftest: ${fails.length} FAILED\n  ${fails.join('\n  ')}`
    : 'ALLOCATE selftest: ok');
  return fails.length;
}
if(process.argv[1] && process.argv[1].endsWith('allocate.mjs')) process.exit(selftest() ? 1 : 0);
