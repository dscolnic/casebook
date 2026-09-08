// value.mjs — the bible's authored VALUE board into the importer's.
//
// Two stops: carrying M8 S28 (which leak repairs to fund) and headwater M13 S48
// (which inspections to run). No §7 board for VALUE exists in any bible —
// `grep -c '§7 build completion — VALUE'` returns zero — so this module exports
// `convertPayload` and NOT `convert`, for the reason in `belt.mjs`.
//
// ONE RENAME AND TWO REAL GAPS.
//
// The rename is `required` → `decisive`. The board marks the options its keyed
// plan must buy; the importer marks the options without which the decision
// cannot be made, and grades the plan against exactly that set. It is the same
// authored fact — the keyed subset — under the name each side gives it, and
// both boards say it twice, once as `required: true` on the option and once as
// the `correct`/`required` id list, which is a free cross-check and is taken.
//
// The gaps are `axis` and `decision`, and neither can be guessed. `axis` is what
// an option buys you MORE OF, and the importer refuses a board whose options all
// sit on one axis, because buying more of the same is the trap the format is
// built around. Naming the axes here would be authoring the trap rather than
// converting it. `decision` is the line the panel prints above the money, and
// the stop's question is not it — the question asks the player to submit a plan,
// the decision names what the plan is for.
import { num, str, pick, list } from './_shared.mjs';
import { readBoard } from './_payload.mjs';
import { parseYaml } from '../yaml-lite.mjs';

export const FORMAT = 'VALUE';

const idOf = (v) => (typeof v === 'string' || typeof v === 'number')
  ? str(v) : str(pick(v ?? {}, 'id', 'label', 'name'));

export function convertPayload(board, stop){
  const b = board ?? {};
  const owes = [];
  const value = {};
  if(str(b._trailing)) owes.push(`prose follows the board and no field holds it — "${str(b._trailing)}"`);

  // ---- the budget. A bare number on both boards; the importer holds an amount
  // and the unit it is counted in. Neither board names the unit — carrying's
  // "credits" and headwater's "inspection points" are in the question, which is
  // not the board.
  const amount = num(pick(b, 'budget', 'amount', 'cap'));
  if(amount !== undefined && amount > 0){
    value.budget = { amount };
  } else {
    owes.push('the board has no positive `budget` — the number the plan has to fit inside');
  }
  const unit = str(pick(b, 'unit', 'budget_unit', 'currency'));
  if(unit && value.budget) value.budget.unit = unit;
  else if(!unit) owes.push('the budget has no unit — the panel prints a bare number beside the'
    + ' money, and what it counts is written in the question rather than the board');

  // ---- what may be bought.
  const opts = list(pick(b, 'options', 'items', 'choices'));
  const keyed = list(pick(b, 'correct', 'required', 'keyed', 'answer')).map(idOf).filter(Boolean);
  const ids = opts.map(o => idOf(o)).filter(Boolean);

  const options = opts.map((o, i) => {
    const at = `value option ${i + 1}`;
    const id = idOf(o);
    const label = str(pick(o ?? {}, 'label', 'name'));
    const cost = num(pick(o ?? {}, 'cost', 'price'));
    if(!id) owes.push(`${at} has no \`id\``);
    if(!label) owes.push(`${at} has no \`label\` — "${id || '?'}" is a token, not something a`
      + ' player reads off a price list');
    if(cost === undefined) owes.push(`${at} ("${id || '?'}") has no numeric \`cost\``);
    const out = {};
    if(id) out.id = id;
    if(label) out.label = label;
    if(cost !== undefined) out.cost = cost;
    // `required` on the option and membership of the keyed list are the same
    // claim written twice. Both are read, and a disagreement between them is
    // owed rather than resolved — the board would be keying two different plans.
    const flagged = o?.required === true || o?.decisive === true;
    const listed = id && keyed.includes(id);
    if(flagged || listed) out.decisive = true;
    if(keyed.length && id && flagged !== listed){
      owes.push(`${at} ("${id}") is marked \`required: ${!!flagged}\` on the option and`
        + `${listed ? '' : ' not'} named in the board's keyed list — the board keys two`
        + ' different plans');
    }
    if(o?.irreversible === true) out.irreversible = true;
    return out;
  });
  if(options.length) value.options = options;
  if(options.length < 4){
    owes.push(`the board offers ${options.length} options and a value board needs at least four`);
  }
  for(const id of keyed){
    if(ids.length && !ids.includes(id)) owes.push(`the keyed plan names "${id}", which is not one of the options`);
  }

  // ---- the two fields nothing on the board carries.
  const mute = options.filter(o => o.id);
  if(mute.length){
    owes.push(`none of the ${mute.length} options names an \`axis\` — the importer refuses a board`
      + ' whose options all sit on one axis, because buying more of the same is the trap this'
      + ' format is built around, and naming the axes here would be authoring the trap');
    owes.push(`none of the ${mute.length} options names what it \`reveals\` — buying one changes`
      + ' nothing on the card');
  }
  const decision = str(pick(b, 'decision'));
  if(decision) value.decision = decision;
  else owes.push('the board has no `decision` — the line the panel prints above the money; the'
    + ' stop\'s question asks for a plan and does not say what the plan is for');

  // ---- the arithmetic, which is a free check and is worth making.
  const costs = options.map(o => o.cost).filter(c => c !== undefined);
  if(costs.length === options.length && options.length && amount !== undefined){
    const total = costs.reduce((a, c) => a + c, 0);
    if(total <= amount){
      owes.push(`the options cost ${total} and the budget is ${amount} — the whole board is`
        + ' affordable, so nothing is being traded away');
    }
    const spend = options.filter(o => o.decisive).reduce((a, o) => a + (o.cost ?? 0), 0);
    if(!options.some(o => o.decisive)){
      owes.push('no option is keyed — nothing on the board would change the decision, so every'
        + ' answer is as good as every other');
    } else if(spend > amount){
      owes.push(`the keyed plan costs ${spend} against a budget of ${amount} — the stop cannot`
        + ' be answered right');
    }
    // Both boards write the keyed plan's cost a second time, as `total`. When
    // it disagrees with the options it was added from, one of the two is wrong
    // and neither is written over.
    const stated = num(pick(b, 'total', 'spend'));
    if(stated !== undefined && Math.abs(stated - spend) > 1e-9){
      owes.push(`the board states a total of ${stated} and its keyed options cost ${spend}`);
    }
  }

  owes.push(str(pick(b, 'answerText', 'correct_conclusion', 'correctConclusion'))
    ? 'the board\'s conclusion is the stop\'s `answerText`, a top-level key this converter cannot'
      + ' write — the contract returns one key'
    : 'the board authors no conclusion, so the stop has no `answerText` — the player commits a'
      + ' plan, gets it wrong, and is never told which one was affordable');

  return { key: str(stop?.payloadKey) || 'value', value, owes };
}

// ------------------------------------------------------ the canonical board
//
// Two stops: Carrying Capacity M7 S28 and Headwater M12 S48. These two are not
// like the other canonical blocks, and the difference is the whole of why this
// function exists.
//
// THE BLOCK IS NOT A BOARD AND IS NOT EVEN CALLED ONE. It is headed
// `value_patch:` and its fields are `question`, `authoredPayload`,
// `correctResult`, `wrongButPlausible`, `decisionCanFail` and
// `questionAndUnits`. `bible-build.mjs` keys a canonical block by the first key
// of its own fence, so carried through the stop is written a `value_patch:` key
// — which the importer has never heard of. The stop then has no `value` block
// at all and is refused with "a VALUE needs a `value` block — without it the
// panel renders empty", about a bible that authored the board in full.
//
// It authored it INSIDE `authoredPayload`, as the same backticked one-line form
// every other payload in the bibles uses:
//
//   `value:{budget:60,options:[{id:acoustic_location,cost:15,required:true},…]}`
//
// so `_payload.mjs` reads it, `convertPayload` above converts it, and everything
// that file knows about `required` → `decisive`, the keyed plan's arithmetic and
// the `total` cross-check applies unchanged. Nothing is re-implemented here.
//
// The four fields that are not the board are dropped and said: `question` and
// `questionAndUnits` are the stop's own card, `wrongButPlausible` describes a
// distractor the `value` block has no room for, and `decisionCanFail` is the
// bible's own note that the board can be got wrong rather than a field.
export function convertCanonical(b, stop = {}){
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const owes = [];

  /**
   * THE FOURTH ROUND WROTE THE BOARD ITSELF, not a wrapper around a payload.
   * Handback 3's block is a note with the real board quoted inside it under
   * `authoredPayload`; Handback 4's block IS the board — `budget: 60`,
   * `costUnit`, five `options` with an id, a label, an axis and a cost, and a
   * `keyedChoice` list. Two renames away from what the importer reads, and
   * falling through to the wrapper branch below reported that the block
   * "authors no `authoredPayload`" about a board that authors everything.
   *
   * The two renames. `budget` is a bare number here and a `{amount, unit}` pair
   * there, and the unit is the block's own `costUnit`. `keyedChoice` names the
   * ids the plan must buy; the importer marks those options `decisive` and
   * grades the plan against exactly that set — the same authored fact under the
   * name each side gives it, which is the rename this module already documents
   * for `required`.
   *
   * An id in `keyedChoice` that is on no option is not silently dropped: it is
   * the case where a keyed plan and its board have drifted apart, and grading
   * against a subset that is missing a member is a stop nobody can answer.
   */
  const direct = list(board.options).length && board.authoredPayload === undefined
    && board.authored_payload === undefined;
  if(direct){
    const opts = list(board.options);
    const keyed = list(pick(board, 'keyedChoice', 'keyed_choice', 'correct', 'required'))
      .map(x => str(typeof x === 'object' ? pick(x, 'id') : x)).filter(Boolean);
    const ids = new Set(opts.map(o => str(pick(o, 'id')) || str(pick(o, 'label'))));
    const stray = keyed.filter(k => !ids.has(k));
    if(stray.length){
      owes.push(`\`keyedChoice\` names ${stray.map(k => `\`${k}\``).join(', ')}, which no option`
        + ' on this board carries — the keyed plan and the option list have drifted apart, and a'
        + ' plan graded against a member that is not there cannot be submitted');
    }
    if(!keyed.length){
      owes.push('the block authors no `keyedChoice`, so no option is decisive and every plan is as'
        + ' good as every other');
    }
    const amount = num(pick(board, 'budget', 'pool', 'amount'));
    const value = {
      budget: { amount, unit: str(pick(board, 'costUnit', 'cost_unit', 'unit')) },
      decision: str(pick(board, 'decision')),
      options: opts.map(o => {
        const id = str(pick(o, 'id')) || str(pick(o, 'label'));
        return { id, label: str(pick(o, 'label')), cost: num(pick(o, 'cost')),
          axis: str(pick(o, 'axis')), reveals: str(pick(o, 'reveals')),
          ...(keyed.includes(id) ? { decisive: true } : {}),
          ...(pick(o, 'irreversible') ? { irreversible: true } : {}) };
      }),
      commit: str(pick(board, 'commit')) || 'Commit the decision',
    };
    const said = str(pick(board, 'answerText', 'correctResult', 'correctConclusion'));
    const extra = (said && !String(stop.answerText ?? '').trim()) ? { answerText: said } : {};
    return { key: 'value', value, owes, extra };
  }

  const raw = pick(board, 'authoredPayload', 'authored_payload', 'payload');
  const read = raw === undefined ? null : readBoard(raw, 'value', parseYaml);
  if(!read){
    owes.push(raw === undefined
      ? 'the block authors no `authoredPayload`, and its own fields — a question, a conclusion and'
        + ' a note that the decision can fail — are not a board: there is no budget and no option'
        + ' list anywhere in it, so nothing is written and the panel would render empty'
      : 'the block\'s `authoredPayload` cannot be read as a board — it is written as one line of'
        + ' the compact form, and this one does not parse, so nothing is written rather than half'
        + ' of it');
    return { key: 'value', value: {}, owes };
  }
  if(read.key && read.key !== 'value'){
    owes.push(`the \`authoredPayload\` is written under \`${read.key}\` and the importer reads a`
      + ' value board from `value` — one of the two names is wrong');
  }

  const out = convertPayload(read.board, { payloadKey: 'value' });

  // ---- the four fields that are not the board.
  const homeless = [
    ['question', 'the stop\'s own card, which the book already carries'],
    ['questionAndUnits', 'the stop\'s own card again, in the same words'],
    ['wrongButPlausible', 'a description of the shortcut a player might take, and the `value`'
      + ' block has no field for a named wrong answer — it grades the plan'],
    ['decisionCanFail', 'the bible\'s own note that the board can be got wrong, which is a claim'
      + ' about the board rather than a field on it'],
  ].filter(([k]) => board[k] !== undefined && board[k] !== '');
  if(homeless.length){
    owes.push(`the block authors ${homeless.map(([k]) => `\`${k}\``).join(', ')}, which the`
      + ` \`value\` block has no field for — ${homeless.map(([, why]) => why).join('; ')} — so they`
      + ' are dropped rather than written under a name nothing reads');
  }

  // ---- the verdict, which `convertPayload` owes in every case because a
  // payload converter cannot reach a top-level key. `extra` can.
  const kept = out.owes.filter(o => !/answerText/.test(o));
  const said = str(pick(read.board, 'answerText'))
    || str(pick(board, 'answerText', 'correctResult', 'correctConclusion', 'correct_conclusion'));
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — the player commits a plan,'
      + ' gets it wrong, and is never told which one was affordable');
  }

  return { key: 'value', value: out.value, owes: [...kept, ...owes], extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/value.mjs --selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const opt = (id, label, cost, axis, required) => ({ id, label, cost, axis, required });
  const full = convertPayload({
    budget: 60, unit: 'credits', decision: 'Which repairs go in this week\'s order',
    options: [opt('acoustic', 'Acoustic leak survey', 15, 'where', true),
      opt('main', 'Replace the main', 30, 'fix', true),
      opt('liner', 'Leachate liner test', 15, 'where', true),
      opt('fence', 'Repaint the fence', 12, 'optics'),
      opt('flare', 'Gas flare study', 10, 'later')],
    correct: ['acoustic', 'main', 'liner'], total: 60,
    answerText: 'Buy the two that locate the leak and the one that fixes it.',
  }, { payloadKey: 'value' });
  // `axis` and `reveals` are owed even when the board writes an axis, because
  // the converter does not read it — it is not carried, and saying so is the
  // point. What must NOT be owed is anything else.
  ok(full.owes.filter(o => !/`axis`|`reveals`|answerText/.test(o)).length === 0,
    `a complete value board should owe only axis, reveals and answerText; owed ${JSON.stringify(full.owes)}`);
  ok(full.value.budget.amount === 60 && full.value.budget.unit === 'credits', 'the budget was lost');
  ok(full.value.options.filter(o => o.decisive).length === 3, '`required` did not become `decisive`');
  ok(full.value.options[3].decisive === undefined, 'an unkeyed option was marked decisive');

  // Carrying Capacity M8 S28 as it arrives: every option a bare id and a cost,
  // and the keyed plan written twice.
  const real = convertPayload({ budget: 60,
    options: [{ id: 'acoustic_location', cost: 15, required: true },
      { id: 'main_repair', cost: 30, required: true },
      { id: 'liner_test', cost: 15, required: true },
      { id: 'cosmetic_fence', cost: 12 }, { id: 'gas_flare_study', cost: 10 }],
    correct: ['acoustic_location', 'main_repair', 'liner_test'], total: 60 },
  { payloadKey: 'value' });
  ok(real.value.budget.amount === 60 && !('unit' in real.value.budget), 'a budget unit was invented');
  ok(real.value.options.length === 5, 'the option list was lost');
  ok(real.value.options.every(o => !('label' in o)), 'a missing option label was invented');
  ok(real.owes.filter(o => /has no `label`/.test(o)).length === 5, 'the five missing labels were not owed');
  ok(real.owes.some(o => /has no `decision`/.test(o)), 'the missing decision was not owed');
  ok(!('decision' in real.value), 'a decision was invented');
  ok(real.value.options.filter(o => o.decisive).length === 3,
    'the plan keyed on the options and in the `correct` list did not become three decisive options');
  // The two ways of keying one plan must read the same, and neither may be owed
  // as a disagreement when they agree.
  const byFlag = convertPayload({ budget: 60, options: real.value.options.map(o =>
    ({ id: o.id, cost: o.cost, ...(o.decisive ? { required: true } : {}) })) }, {});
  const byList = convertPayload({ budget: 60,
    options: real.value.options.map(o => ({ id: o.id, cost: o.cost })),
    correct: real.value.options.filter(o => o.decisive).map(o => o.id) }, {});
  ok(JSON.stringify(byFlag.value) === JSON.stringify(byList.value),
    'a plan keyed on the options and a plan keyed in a list converted differently');

  // An affordable board, which is not a trade at all.
  const cheap = convertPayload({ budget: 100, options: [{ id: 'a', cost: 1, required: true },
    { id: 'b', cost: 1 }, { id: 'c', cost: 1 }, { id: 'd', cost: 1 }] }, {});
  ok(cheap.owes.some(o => /whole board is affordable/.test(o)), 'an affordable board was not owed');
  ok(!full.owes.some(o => /whole board is affordable/.test(o)), 'a real trade was called affordable');

  // A keyed plan that does not fit, and a board with nothing keyed.
  ok(convertPayload({ budget: 5, options: [{ id: 'a', cost: 4, required: true },
    { id: 'b', cost: 4, required: true }, { id: 'c', cost: 1 }, { id: 'd', cost: 1 }] }, {})
    .owes.some(o => /cannot\s+be answered right/.test(o)), 'an unaffordable keyed plan was not owed');
  ok(convertPayload({ budget: 5, options: [{ id: 'a', cost: 4 }, { id: 'b', cost: 4 },
    { id: 'c', cost: 1 }, { id: 'd', cost: 1 }] }, {})
    .owes.some(o => /no option is keyed/i.test(o)), 'a board with nothing keyed was not owed');

  // The two ways of keying disagreeing, and the case that must not fire.
  const split = convertPayload({ budget: 10, options: [{ id: 'a', cost: 4, required: true },
    { id: 'b', cost: 4 }, { id: 'c', cost: 4 }, { id: 'd', cost: 4 }], correct: ['b'] }, {});
  ok(split.owes.filter(o => /keys two\s+different plans/.test(o)).length === 2,
    'a board keying two different plans was not owed');
  ok(!full.owes.some(o => /keys two\s+different plans/.test(o)),
    'a board that keys one plan twice was called two');
  ok(convertPayload({ budget: 10, options: [{ id: 'a', cost: 1, required: true },
    { id: 'b', cost: 9 }, { id: 'c', cost: 9 }, { id: 'd', cost: 9 }], correct: ['a', 'zz'] }, {})
    .owes.some(o => /"zz", which is not one of the options/.test(o)), 'a stray keyed id was not owed');

  // A stated total that disagrees with the options it was added from.
  ok(convertPayload({ budget: 10, options: [{ id: 'a', cost: 3, required: true },
    { id: 'b', cost: 9 }, { id: 'c', cost: 9 }, { id: 'd', cost: 9 }], correct: ['a'], total: 4 }, {})
    .owes.some(o => /states a total of 4/.test(o)), 'a mismatched total was not owed');
  ok(!full.owes.some(o => /states a total of/.test(o)), 'a matching total was called a mismatch');

  ok(convertPayload({ budget: 1, _trailing: 'the update reveals 4.2' }, {})
    .owes.some(o => /prose follows the board/.test(o)), 'trailing prose was dropped');

  // ---------------------------------------------------- the canonical board
  // Carrying Capacity M7 S28 exactly as it arrives.
  const patch = {
    question: 'From acoustic leak location 15, main repair 30, leachate liner test 15, cosmetic'
      + ' fence 12, and gas flare study 10, submit a plan costing at most 60 credits',
    authoredPayload: '`value:{budget:60,options:[{id:acoustic_location,cost:15,required:true},'
      + '{id:main_repair,cost:30,required:true},{id:liner_test,cost:15,required:true},'
      + '{id:cosmetic_fence,cost:12},{id:gas_flare_study,cost:10}],'
      + 'correct:[acoustic_location,main_repair,liner_test],total:60}`',
    correctResult: 'Locate and repair the main and test the leachate liner for exactly 60 credits',
    wrongButPlausible: 'A plausible shortcut that ignores one condition.',
    decisionCanFail: true,
    questionAndUnits: 'From acoustic leak location 15, main repair 30, leachate liner test 15,'
      + ' cosmetic fence 12, and gas flare study 10, submit a plan costing at most 60 credits',
  };
  const cvp = convertCanonical(patch, { answerText: 'Locate, repair and test for 60 credits.' });
  // THE KEY. `value_patch` is what `bible-build.mjs` would write, and the
  // importer has never heard of it — the stop would be refused for having no
  // `value` block at all.
  ok(cvp.key === 'value', `the canonical block was keyed ${cvp.key}, which the importer never reads`);
  // THE BOARD, which is inside `authoredPayload` and not in the block's own
  // fields. Put the readBoard call back and every one of these fails.
  ok(cvp.value.budget?.amount === 60, `the budget was not read out of the payload: ${JSON.stringify(cvp.value.budget)}`);
  ok((cvp.value.options ?? []).length === 5,
    `the option list was not read out of the payload: ${(cvp.value.options ?? []).length}`);
  ok((cvp.value.options ?? []).filter(o => o.decisive).length === 3,
    'the keyed plan did not come through as the decisive options');
  ok((cvp.value.options ?? []).map(o => o.id).join()
    === 'acoustic_location,main_repair,liner_test,cosmetic_fence,gas_flare_study',
  'the options came back out of the order the board writes them');

  // The four fields that are not the board, dropped and said.
  ok(!JSON.stringify(cvp.value).includes('plausible shortcut'),
    'a field the value block has no room for was written into it');
  ok(cvp.owes.some(o => /`question`, `questionAndUnits`, `wrongButPlausible`, `decisionCanFail`/.test(o)),
    `the four homeless fields were not owed: ${JSON.stringify(cvp.owes)}`);

  // The real gaps `convertPayload` already knows about survive the trip: no
  // labels, no axes, no decision, no budget unit.
  ok(cvp.owes.some(o => /names an `axis`/.test(o)), 'the missing axes stopped being owed');
  ok(cvp.owes.some(o => /has no `decision`/.test(o)), 'the missing decision stopped being owed');
  ok((cvp.value.options ?? []).every(o => !('axis' in o) && !('label' in o)),
    'an axis or a label was invented for an option that authors neither');

  // A block with no payload at all: nothing is written, and the reason is that
  // its own fields are a card rather than a board.
  const noPayload = convertCanonical({ ...patch, authoredPayload: undefined }, { answerText: 'x' });
  ok(Object.keys(noPayload.value).length === 0, 'a board was built out of a question');
  ok(noPayload.key === 'value', 'a block with no payload was keyed something the importer reads');
  ok(noPayload.owes.some(o => /authors no `authoredPayload`/.test(o)),
    'a block with no payload was not owed');
  // And the case that must NOT fire, or the check agrees with itself.
  ok(!cvp.owes.some(o => /authors no `authoredPayload`|cannot be read as a board/.test(o)),
    'a readable payload was reported as unreadable');

  // A payload written under somebody else's key.
  const wrongKey = convertCanonical({ ...patch,
    authoredPayload: '`stress:{assumption:a,range:[1,2]}`' }, { answerText: 'x' });
  ok(wrongKey.owes.some(o => /written under `stress`/.test(o)),
    `a payload under another format's key was not owed: ${JSON.stringify(wrongKey.owes)}`);

  // The verdict, placed only where the stop has none — and taken from the
  // payload's own `answerText` before the block's conclusion, which is what
  // Headwater's board carries.
  // GUARDED throughout: a board that cannot be read returns no `extra` at all,
  // and `ok` collects rather than throws.
  ok(!(cvp.extra ?? {}).answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  ok(String((convertCanonical(patch, {}).extra ?? {}).answerText ?? '').startsWith('Locate and repair'),
    'the block\'s conclusion was not placed on a stop that had none');
  const inPayload = convertCanonical({ ...patch, correctResult: undefined,
    authoredPayload: '`value:{budget:6,options:[{id:a,cost:2},{id:b,cost:2},{id:c,cost:2},'
      + '{id:d,cost:2}],required:[a,b,c],answerText:"Spend 2+2+2 on a, b and c."}`' }, {});
  ok((inPayload.extra ?? {}).answerText === "Spend 2+2+2 on a, b and c.",
    `the payload's own verdict was not placed: ${(inPayload.extra ?? {}).answerText}`);

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('value.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `VALUE selftest: ${f.length} failure(s)` : 'VALUE selftest: ok');
  process.exit(f.length ? 1 : 0);
}
