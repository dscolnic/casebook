// trace.mjs — the bible's TRACE board into the importer's.
//
// 9 stops, across five campaigns. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// WHAT THE NINE BOARDS ACTUALLY SAY. All nine are byte-identical:
//
//   trace:
//     resources: [shared_reference, independent_reference]
//     target: shared_reference
//     channels:
//       - {id: channel_a, label: "display A", reading: "100.0 units", resource: shared_reference}
//       …
//       - {id: independent, label: "independent check", reading: "97.0 units",
//          resource: independent_reference, independent: true}
//     correctConclusion: "the three agreeing displays share one upstream reference"
//
// The graph is real work — four channels, three of them on one upstream source
// and one off it, which is the shape the stop is about — and every player-facing
// string in it is the template's placeholder. "display A" is not an instrument in
// Carrying Capacity or in The Trial, and "100.0 units" is a number with the WORD
// "units" where its unit goes. So the structure converts and the strings are
// owed, one sentence each, rather than being dressed up into something that reads
// like a board somebody wrote.
//
// THE THREE RENAMES, all of them the same fact in the place the importer reads
// it, none of them a new fact:
//
//   `resource: X`      → `depends: [X]`. The bible names one upstream source per
//                        channel; the importer reads a list, because a channel
//                        may sit on two.
//   `independent: true`→ the board's `independent: [id]` list. The importer
//   on a channel         REFUSES the per-channel flag by name — it read the list
//                        and dropped the flag, so a channel flagged true and left
//                        off the list was silently dependent. One fact, one place.
//   bare string in      → `{id}`. A resource written as a token has an id and no
//   `resources`          label, and the label is what a panel prints, so it is
//                        owed rather than set to the token.
//
// WHAT IS DROPPED, deliberately, because the importer has no field for it:
// `correctConclusion`. TRACE grades a named source and an exact keep-set — the
// target you name and the channels you keep — so there is nothing for a sentence
// of conclusion to be compared against. The bible's own `**Correct result:**`
// line carries the same sentence for the answer text, outside this board.
import { str, list, pick } from './_shared.mjs';
// The stop's own board is read the same way for every format that has a patch
// or a template where its board should be, so the reader lives in one file
// rather than three. (It wants to be in `_shared.mjs`; that file is shared and
// this pass does not own it.)
import { ownBoard } from './allocate.mjs';

export const FORMAT = 'TRACE';

// The template's own words, in the four channels every one of the nine boards
// ships. Named here rather than inferred, because the tell is not "this label is
// vague" — it is "this label is the one the template came with", and a converter
// that guessed at vagueness would start editing labels somebody wrote.
const STOCK_LABEL = /^(display [a-z]|derived summary|independent check)$/i;
// A number with the word "units" where a unit goes. Not the importer's bare-number
// refusal, which this passes: "100.0 units" has letters in it.
const STOCK_READING = /^[\d.,+\-×x\s]+units?$/i;

export const convert = (b) => {
  const owes = [];

  // ---- resources. A bare token is an id with no label; an object may carry both.
  const rawRes = list(b.resources);
  const resources = rawRes.map((r) => {
    if(r && typeof r === 'object'){
      const id = str(pick(r, 'id', 'label'));
      const label = str(r.label);
      if(!label) owes.push(`resource \`${id || '?'}\` has no label — nothing to print on the panel`);
      return { id, ...(label ? { label } : {}) };
    }
    const id = str(r);
    owes.push(`resource \`${id}\` is written as a bare id with no label — the panel prints the label`);
    return { id };
  });
  if(!resources.length) owes.push('no `resources` — a trace with no shared source to name');
  const resIds = new Set(resources.map(r => r.id));

  // ---- channels.
  const rawChans = list(b.channels);
  const flagged = [];
  const channels = rawChans.map((c, i) => {
    const at = `channel ${i + 1}`;
    const id = str(pick(c, 'id', 'label'));
    const label = str(c.label);
    const reading = str(c.reading);
    const name = id || at;
    if(!label) owes.push(`${at} has no \`label\``);
    else if(STOCK_LABEL.test(label)){
      owes.push(`channel \`${name}\` is labelled "${label}", which is the template's placeholder`
        + ' — name the instrument this stop actually reads');
    }
    if(!reading) owes.push(`channel \`${name}\` has no \`reading\``);
    else if(STOCK_READING.test(reading)){
      owes.push(`channel \`${name}\` reads "${reading}" — the word "units" is where the unit goes;`
        + ' say what the quantity is and in what unit');
    }
    // `resource` singular is how all nine boards write it; `depends` is the
    // importer's plural, and a board that already wrote it is taken as written.
    const depends = list(pick(c, 'depends', 'resource')).map(str).filter(Boolean);
    if(!depends.length) owes.push(`channel \`${name}\` names no upstream source — no \`resource\``);
    depends.forEach(d => { if(resIds.size && !resIds.has(d)){
      owes.push(`channel \`${name}\` depends on \`${d}\`, which is not one of the board's resources`);
    } });
    if(c && c.independent === true) flagged.push(id);
    return { ...(id ? { id } : {}), ...(label ? { label } : {}), ...(reading ? { reading } : {}), depends };
  });
  if(channels.length < 4) owes.push(`${channels.length} channel(s), and a trace needs at least four`);

  // ---- the independent list. The board's own list wins; otherwise it is the
  // channels that flagged themselves, moved to the one place both the importer
  // and the grade read. Not a new fact — the same fact, once.
  const declared = list(b.independent).map(str).filter(Boolean);
  const independent = declared.length ? declared : flagged.filter(Boolean);
  if(!independent.length){
    owes.push('nothing is named independent — something has to survive the correction,'
      + ' or the right move is to throw every channel away');
  }

  const target = str(b.target);
  if(!target) owes.push('no `target` — the shared source the trace is about');
  else if(resIds.size && !resIds.has(target)) owes.push(`the target \`${target}\` is not one of the board's resources`);
  else {
    const sharing = channels.filter(c => c.depends.includes(target));
    if(sharing.length < 2){
      owes.push(`${sharing.length} channel(s) depend on the target, and with fewer than two there is`
        + ' no common mode for the stop to be about');
    }
  }

  // `correction` is optional to the importer and absent from all nine boards, so
  // it is not owed. `tolerance` is refused by the importer outright — nothing
  // about a trace is graded numerically — and is never written here.
  return { key: 'trace', value: {
    channels, resources, independent,
    ...(target ? { target } : {}),
  }, owes };
};

// ------------------------------------------------------- the authored boards
//
// 9 stops point at their own interaction block instead, and unlike §7's they are
// nine different graphs: a fish market's sales screen and tax total on one
// electronic ledger, four field mills on SHOT ground, three trial reports on one
// nightly extraction, six macro channels on the real interest rate. All nine are
// written in one hand:
//
//   trace:{channels:[{id:"tax_total", label:"tax total",
//                     dependency:"electronic sale ledger", target_dependent:true},
//                    {id:"paper_landed", label:"paper landing book",
//                     dependency:"paper book", independent:true}],
//          shared_upstream:"electronic sale ledger",
//          correct_conclusion:"…", answerText:"…"}
//
// THE ONE STRUCTURAL DIFFERENCE from §7, and it is the reason this is not just a
// rename: there is no `resources` list. Every resource is named by the channels
// that sit on it — `dependency:` — plus `shared_upstream`, and the importer needs
// them as a list to check the graph against. So the list is the distinct
// dependencies in the order they are first named, each one carrying the bible's
// own string as its label. Nothing is invented: the id the importer ends up with
// is the label, which is what the importer itself does with a resource written
// with only one of the two.
//
// Then the normalised board goes through `convert`, so the graph rules — four
// channels, a target that is one of the resources, two channels on it, something
// independent — are checked in one place rather than described twice.
//
// WHAT IS DROPPED: `correct_conclusion` and `answerText`, for the reason at the
// top of this file. TRACE grades a named source and an exact keep-set, so a
// sentence of conclusion has nothing to be compared against, and `answerText` is
// the stop's, not the board's.
//
// WHAT THE NINE STILL OWE, mostly one thing: a reading. Eight of the nine boards
// give every channel an id, a label and an upstream and never say what the
// channel *reads*, and the panel prints a reading per channel. The ninth
// (Headwater's silent pressure line) authors "blank", 5.39 and 5.42 — and the two
// numbers are bare, which is the importer's own refusal, so it is named here
// rather than at import.
export const convertPayload = (board, stop) => {
  const b = board ?? {};
  const owes = [];
  // A BOARD WRITTEN IN THE GAME'S OWN SCHEMA GOES STRAIGHT THROUGH. The nine
  // §7 boards name every resource from the channel that sits on it, which is
  // why the resource list is rebuilt below — but Whiteout declares `resources`
  // outright and writes `depends: [id]` per channel, which is the importer's
  // own shape. Rebuilding it from `dependency`/`resource`/`upstream` — three
  // names it does not use — emptied every `depends` array and reduced four
  // labelled resources to one, and the stop was then refused for having no two
  // channels on its target, about a board that puts two on it explicitly.
  if(list(pick(b, 'resources')).length) return convert(b);
  const chans = list(pick(b, 'channels'));
  const target = str(pick(b, 'shared_upstream', 'sharedUpstream', 'target'));
  const upstream = (c) => str(pick(c, 'dependency', 'resource', 'upstream'));
  const nameOf = (c, i) => str(pick(c, 'id', 'label')) || `channel ${i + 1}`;

  // The resources, in the order the board first names them. `shared_upstream` is
  // one whether or not a channel sits on it — a target nothing depends on is a
  // real defect, and `convert` is where that is said.
  const deps = [];
  for(const c of chans){ const d = upstream(c); if(d && !deps.includes(d)) deps.push(d); }
  if(target && !deps.includes(target)) deps.push(target);

  const declared = list(pick(b, 'independent')).map(str).filter(Boolean);
  const out = convert({
    resources: deps.map(d => ({ label: d })),
    ...(target ? { target } : {}),
    ...(declared.length ? { independent: declared } : {}),
    channels: chans.map((c) => ({
      ...(pick(c, 'id') !== undefined ? { id: pick(c, 'id') } : {}),
      ...(pick(c, 'label') !== undefined ? { label: pick(c, 'label') } : {}),
      ...(pick(c, 'reading') !== undefined ? { reading: pick(c, 'reading') } : {}),
      ...(upstream(c) ? { resource: upstream(c) } : {}),
      ...(c && c.independent === true ? { independent: true } : {}),
    })),
  });

  chans.forEach((c, i) => {
    const name = nameOf(c, i);
    // The importer's refusal, said early. A reading is a quantity, and 5.39 on a
    // board about which channels agree does not say what agrees.
    const r = str(pick(c, 'reading'));
    if(r && /^[\d.,+\-×x\s]+$/.test(r)){
      owes.push(`channel \`${name}\` reads "${r}", which is a bare number — say what the quantity`
        + ' is and in what unit (a dimensionless ratio has to say so)');
    }
    // A dependency chain the importer's graph cannot hold. Changeover's net
    // exports are marked as sitting on the target and name the exchange-rate
    // branch, which sits on the target in turn; the panel draws one level, so the
    // middle of that chain is a resource like any other and the link is lost.
    const d = upstream(c);
    if(c && c.target_dependent === true && target && d && d !== target){
      owes.push(`channel \`${name}\` is marked \`target_dependent\` and depends on \`${d}\`, which`
        + ` is a resource of its own — the panel's graph is one level deep, so the chain from`
        + ` \`${target}\` through it is not on the board`);
    }
  });

  if(str(b._trailing)){
    owes.push(`prose follows the board — "${str(b._trailing)}" — and the trace board has no field`
      + ' for it; if it carries a reading or a correction, author it into the channel it belongs to');
  }

  return { key: out.key, value: out.value, owes: [...out.owes, ...owes] };
};

// ------------------------------------------------------ the canonical block
//
// 9 stops carry `**Handback 3 canonical interaction block — TRACE:**`, and all
// nine blocks are the same block. Byte for byte, in five bibles:
//
//   trace:
//     channels:
//       - {id: shared_a, label: "first channel named in the question",
//          reading: "matches the displayed source record", dependency: shared_source}
//       - {id: shared_b, label: "second agreeing channel",
//          reading: "same upstream value", dependency: shared_source}
//       - {id: independent, label: "independent comparison channel",
//          reading: "separately measured check", dependency: independent_source,
//          independent: true}
//     sharedUpstream: shared_source
//     correctConclusion: "…"          ← the only line that differs between the nine
//     commonMistake: "Counting two channels fed by one record as independent confirmation."
//
// That is the FORMAT'S TEMPLATE, not this stop's graph. "first channel named in
// the question" is an instruction to whoever fills the template in; three
// channels is one short of the four a trace needs; and `shared_source` is not a
// reference anybody in Carrying Capacity, Changeover, Ground Truth, Headwater or
// The Trial has ever heard of. Converting it — `dependency` → `depends`,
// `sharedUpstream` → `target`, the per-channel flag into the board's list — is
// three honest renames onto a board that still says nothing about the stop.
//
// Meanwhile the stop's OWN graph is on its payload line, where it has been all
// along, and it is real: a fish market's sales screen and tax total on one
// electronic ledger, four field mills on SHOT ground, six macro channels on the
// real interest rate, Headwater's two blank pressure channels sharing cable J4.
// `convertPayload` above was written for exactly those boards — its selftest is
// made of them. It was simply unreachable, because `bs.buildCanonical` is
// checked before the pointer branch and the template won.
//
// So: when the canonical block IS the template, the stop's own board is used
// instead, and it goes through `convertPayload` like any other. When it is not —
// when a bible eventually fills the template in — the block itself is converted,
// through the same function, because the canonical hand and the payload hand are
// the same hand: `dependency`, `sharedUpstream`/`shared_upstream`, a per-channel
// `independent`.
//
// WHAT THIS DOES NOT FIX, and it is what the nine still owe: eight of the nine
// authored graphs give every channel an id, a label and an upstream and never
// say what the channel READS, and the panel prints a reading per channel. That
// stays owed, one line per channel, exactly as `convertPayload` already said it.
// `correctConclusion` and `commonMistake` are dropped for the reason at the top
// of this file — TRACE grades a named source and an exact keep-set, so a
// sentence of conclusion has nothing to be compared against.
const TEMPLATE_IDS = 'shared_a,shared_b,independent';
const TEMPLATE_UPSTREAM = 'shared_source';

/** The unedited §7 template, rather than a graph somebody wrote. */
function isTemplate(b){
  const ids = list(pick(b, 'channels')).map(c => str(pick(c, 'id'))).join(',');
  return ids === TEMPLATE_IDS
    && str(pick(b, 'shared_upstream', 'sharedUpstream', 'target')) === TEMPLATE_UPSTREAM;
}

export const convertCanonical = (board, stop) => {
  const b = board ?? {};
  if(!isTemplate(b)) return convertPayload(b, stop);
  const own = ownBoard(stop, 'trace');
  if(own) return convertPayload(own, stop);
  // Neither the template nor a board. Convert the template so the shape is there
  // to argue with, and say what is actually wrong in one line rather than in the
  // four the template's placeholders would each produce.
  const out = convertPayload(b, stop);
  return { ...out, owes: [
    'the canonical block is the TRACE template — `shared_a` and `shared_b` on `shared_source`,'
    + ' with "first channel named in the question" where a label goes — and the stop\'s own graph,'
    + ' on its payload line, could not be read; there is no trace here but the template\'s',
    ...out.owes,
  ] };
};

// ---------------------------------------------------------------- selftest
//
// `node tools/bibleConvert/trace.mjs`. Two cases, and the second is the one that
// matters: a board with a field pulled out must land that field in `owes` and
// must NOT have it in `value`. A converter that quietly filled it in would pass
// the first case just as well.
function selftest(){
  const fails = [];
  const ok = (cond, what) => { if(!cond) fails.push(what); };

  const complete = {
    resources: [{ id: 'bench_clock', label: 'the bench master clock' },
                { id: 'battery_logger', label: 'the battery logger' }],
    target: 'bench_clock',
    channels: [
      { id: 'mill_a', label: 'mill A tachometer', reading: '1,480 rpm', resource: 'bench_clock' },
      { id: 'mill_b', label: 'mill B tachometer', reading: '1,481 rpm', resource: 'bench_clock' },
      { id: 'mill_c', label: 'line summary', reading: '1,480 rpm', resource: 'bench_clock' },
      { id: 'logger', label: 'battery logger', reading: '1,455 rpm', resource: 'battery_logger',
        independent: true },
    ],
  };
  const a = convert(complete);
  ok(a.key === 'trace', `complete board keyed "${a.key}", not "trace"`);
  ok(a.owes.length === 0, `complete board owes ${a.owes.length}: ${a.owes.join(' / ')}`);
  ok(a.value.independent.join() === 'logger', 'the per-channel flag did not become the board list');
  ok(!('independent' in a.value.channels[3]), 'the per-channel `independent` flag survived into value');
  ok(a.value.channels[0].depends.join() === 'bench_clock', '`resource` did not become `depends`');

  // One field out — the third channel's reading — and nothing else changed.
  const short = structuredClone(complete);
  delete short.channels[2].reading;
  const c = convert(short);
  ok(c.owes.some(o => /channel `mill_c` has no `reading`/.test(o)),
    `a missing reading is not in owes: ${c.owes.join(' / ')}`);
  ok(!('reading' in c.value.channels[2]), 'a missing reading was invented into value');
  // and only that case moved.
  ok(c.owes.length === 1, `pulling one field owes ${c.owes.length} things, not one: ${c.owes.join(' / ')}`);
  ok(c.value.channels[0].reading === '1,480 rpm', 'a channel that was fine changed');

  // A resource with no label is owed, not labelled with its own id.
  const bare = structuredClone(complete);
  bare.resources = ['bench_clock', 'battery_logger'];
  const d = convert(bare);
  ok(d.owes.some(o => /bench_clock` is written as a bare id/.test(o)), 'a bare resource is not owed');
  ok(!('label' in d.value.resources[0]), 'a bare resource id was written in as its own label');

  // The nine shipping boards, so the placeholder tells are exercised by the thing
  // they were written for rather than by a case invented to match them.
  const shipped = convert({
    resources: ['shared_reference', 'independent_reference'],
    target: 'shared_reference',
    channels: [
      { id: 'channel_a', label: 'display A', reading: '100.0 units', resource: 'shared_reference' },
      { id: 'channel_b', label: 'display B', reading: '100.0 units', resource: 'shared_reference' },
      { id: 'channel_c', label: 'derived summary', reading: '100.0 units', resource: 'shared_reference' },
      { id: 'independent', label: 'independent check', reading: '97.0 units',
        resource: 'independent_reference', independent: true },
    ],
    correctConclusion: 'the three agreeing displays share one upstream reference',
  });
  ok(shipped.owes.filter(o => /placeholder/.test(o)).length === 4, 'the four stock labels are not all owed');
  ok(shipped.owes.filter(o => /the word "units" is where the unit goes/.test(o)).length === 4,
    'the four stock readings are not all owed');
  ok(!('correctConclusion' in shipped.value), '`correctConclusion` reached a field nothing renders');

  // ------------------------------------------------------ authored boards
  const authored = {
    channels: [
      { id: 'sales_screen', label: 'sales screen', reading: '412 t landed',
        dependency: 'electronic sale ledger', target_dependent: true },
      { id: 'tax_total', label: 'tax total', reading: '412 t taxed',
        dependency: 'electronic sale ledger', target_dependent: true },
      { id: 'paper_landed', label: 'paper landing book', reading: '463 t landed',
        dependency: 'paper book', independent: true },
      { id: 'returned_catch', label: 'returned-catch record', reading: '51 t returned',
        dependency: 'paper book', independent: true },
    ],
    shared_upstream: 'electronic sale ledger',
    correct_conclusion: 'sales and tax agree but are not independent',
    answerText: 'Sales and tax totals share one source.',
  };
  const p = convertPayload(structuredClone(authored), {});
  ok(p.key === 'trace', `an authored board keyed "${p.key}"`);
  ok(p.owes.length === 0, `a complete authored board owes ${p.owes.length}: ${p.owes.join(' / ')}`);
  ok(p.value.resources.map(r => r.id).join(' | ') === 'electronic sale ledger | paper book',
    'the resources were not built from the dependencies the channels name');
  ok(p.value.channels[0].depends.join() === 'electronic sale ledger', '`dependency` did not become `depends`');
  ok(p.value.independent.join() === 'paper_landed,returned_catch', 'the flags did not become the list');
  ok(!('correct_conclusion' in p.value) && !('answerText' in p.value),
    'the conclusion or the answer text reached a field nothing renders');

  // One field out — and only that field.
  const noRead = structuredClone(authored);
  delete noRead.channels[1].reading;
  const q = convertPayload(noRead, {});
  ok(q.owes.length === 1 && /channel `tax_total` has no `reading`/.test(q.owes[0]),
    `pulling one reading owes ${q.owes.length}: ${q.owes.join(' / ')}`);
  ok(!('reading' in q.value.channels[1]), 'a missing reading was invented into value');

  // A shipping board: no readings anywhere, which is what eight of the nine owe.
  const shipping = convertPayload({
    channels: [
      { id: 'mill_A', label: 'mill A', dependency: 'SHOT ground reference', target_dependent: true },
      { id: 'mill_B', label: 'mill B', dependency: 'SHOT ground reference', target_dependent: true },
      { id: 'mill_C', label: 'mill C', dependency: 'SHOT ground reference', target_dependent: true },
      { id: 'battery', label: 'battery logger', dependency: 'isolated battery reference',
        independent: true },
    ],
    shared_upstream: 'SHOT ground reference',
  }, {});
  ok(shipping.owes.filter(o => /has no `reading`/.test(o)).length === 4,
    'the four unread channels are not all owed');
  ok(shipping.value.channels.every(c => !('reading' in c)), 'a reading was invented for a shipping board');
  ok(shipping.value.channels.every(c => !('independent' in c)), 'a per-channel flag survived into value');

  // A bare number is owed and still carried: the board did author it.
  const bareNum = convertPayload({
    channels: [
      { id: 'p1', label: 'pressure channel 1', reading: 'blank', dependency: 'junction cable J4' },
      { id: 'p2', label: 'pressure channel 2', reading: 'blank', dependency: 'junction cable J4' },
      { id: 'weir', label: 'manual weir scale', reading: 5.39, dependency: 'manual scale',
        independent: true },
      { id: 'uplift', label: 'uplift channel 3', reading: 5.42, dependency: 'junction cable J7',
        independent: true },
    ],
    shared_upstream: 'junction cable J4',
  }, {});
  ok(bareNum.owes.filter(o => /which is a bare number/.test(o)).length === 2,
    `the two bare-number readings are not both owed: ${bareNum.owes.join(' / ')}`);
  ok(bareNum.value.channels[2].reading === '5.39', 'an authored reading was dropped rather than owed');

  // A chain the one-level graph cannot hold.
  const chained = structuredClone(authored);
  chained.channels[0].dependency = 'nightly summary';
  const ch = convertPayload(chained, {});
  ok(ch.owes.some(o => /is marked `target_dependent` and depends on `nightly summary`/.test(o)),
    `a two-level chain is not owed: ${ch.owes.join(' / ')}`);

  // Prose after the board is named, never dropped.
  const tail = structuredClone(authored);
  tail._trailing = 'update reveals 4.235 m';
  ok(convertPayload(tail, {}).owes.some(o => /update reveals 4\.235 m/.test(o)),
    'trailing prose was silently dropped');

  // ---------------------------------------------------- the canonical block
  //
  // The template, verbatim, and Changeover's stop 26 pointer wrapper with its
  // own graph inside it — the two things `convertCanonical` has to tell apart.
  const template = {
    channels: [
      { id: 'shared_a', label: 'first channel named in the question',
        reading: 'matches the displayed source record', dependency: 'shared_source' },
      { id: 'shared_b', label: 'second agreeing channel',
        reading: 'same upstream value', dependency: 'shared_source' },
      { id: 'independent', label: 'independent comparison channel',
        reading: 'separately measured check', dependency: 'independent_source', independent: true },
    ],
    sharedUpstream: 'shared_source',
    correctConclusion: 'the keyed result shown by the completed interaction',
    commonMistake: 'Counting two channels fed by one record as independent confirmation.',
  };
  const wrapper = [
    'stop: Stop 26 - Follow the sacks',
    'format: TRACE',
    'source: "Handback 3 canonical interaction block"',
    'question: "Open all dependencies and submit the conclusion."',
    'payload: "`trace:{channels:[{id:\\"note_weight\\",label:\\"returned-note weight\\",'
      + 'dependency:\\"conversion intake ledger\\",target_dependent:true},'
      + '{id:\\"checking\\",label:\\"checking-deposit rise\\",'
      + 'dependency:\\"conversion intake ledger\\",target_dependent:true},'
      + '{id:\\"savings\\",label:\\"savings-deposit rise\\",'
      + 'dependency:\\"bank account ledger\\",independent:true},'
      + '{id:\\"payment_failures\\",label:\\"payment-failure count\\",'
      + 'dependency:\\"payment network\\",independent:true}],'
      + 'shared_upstream:\\"conversion intake ledger\\",'
      + 'correct_conclusion:\\"cash migrated to deposits\\"}`"',
  ].join('\n');

  const cn = convertCanonical(structuredClone(template), { payload: wrapper });
  ok(cn.key === 'trace', `a canonical block keyed "${cn.key}"`);
  ok(cn.value.channels.length === 4, `the template won: ${cn.value.channels.length} channels`);
  ok(cn.value.channels[0].id === 'note_weight', 'the stop\'s own graph did not come through');
  ok(cn.value.target === 'conversion intake ledger', '`shared_upstream` did not become the target');
  ok(cn.value.independent.join() === 'savings,payment_failures', 'the flags did not become the list');
  ok(!cn.value.channels.some(c => /first channel named in the question/.test(String(c.label))),
    'a template placeholder reached the value');
  ok(cn.owes.filter(o => /has no `reading`/.test(o)).length === 4,
    `the four unread channels are not all owed: ${cn.owes.join(' / ')}`);

  // THE CASE THAT MATTERS. Two inputs that should score the same: the template
  // with the stop's board behind it, and the same template with a channel id
  // changed so it is no longer the template. The second must be converted as a
  // board in its own right — not silently swapped for the payload as well, which
  // would mean a bible that finally filled the template in was ignored.
  const filled = structuredClone(template);
  filled.channels[0].id = 'note_weight';
  filled.channels[0].label = 'returned-note weight';
  const f = convertCanonical(filled, { payload: wrapper });
  ok(f.value.channels.length === 3 && f.value.channels[0].id === 'note_weight',
    'a canonical block that is no longer the template was thrown away for the payload');
  ok(f.value.channels[1].id === 'shared_b', 'the block converted was not the one handed in');

  // The template with nothing behind it says so, once.
  const noneBehind = convertCanonical(structuredClone(template), { payload: '' });
  ok(noneBehind.owes.some(o => /there is no trace here but the template's/.test(o)),
    `a template with no board behind it is not owed: ${noneBehind.owes.join(' / ')}`);
  ok(noneBehind.value.channels.length === 3, 'the template was not converted at all');
  ok(!cn.owes.some(o => /no trace here but the template's/.test(o)),
    'a stop whose own graph was found still reports having none');

  console.log(fails.length ? `TRACE selftest: ${fails.length} FAILED\n  ${fails.join('\n  ')}`
    : 'TRACE selftest: ok');
  return fails.length;
}
if(process.argv[1] && process.argv[1].endsWith('trace.mjs')) process.exit(selftest() ? 1 : 0);
