// inject.mjs — the bible's authored INJECT board into the importer's.
//
// Two stops: carrying M13 S50 (does the survey find the plants it planted) and
// planetary_defense M5 S17 (do known objects come back out of the pipeline). No
// §7 board for INJECT exists in any bible — `grep -c '§7 build completion —
// INJECT'` returns zero — so this module exports `convertPayload` and NOT
// `convert`, for the reason in `belt.mjs`.
//
// WHAT THE FORMAT IS, and it is the reason both boards owe their middle. The
// importer's INJECT is a comparison of CONFIGURATIONS on two numbers at once: a
// detection count and a `metric` that is deliberately not the count. It refuses
// a board where the configuration with the most detections is also the best on
// the metric, because then counting detections is correct and the format has
// nothing to say.
//
// Neither board is that. Both are completeness measurements: plant a known
// population, count what comes back, compare the fraction against a threshold.
// The counts are real and are carried; the metric, the best configuration and
// the blind spot are not on the board, and the arithmetic that would produce
// them —`recovered/injected` — produces a metric that ranks exactly as the
// counts do, which is the board the importer refuses. So it is owed, with the
// reason, rather than computed into a board that would be rejected on arrival
// or, worse, accepted and answerable by counting.
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'INJECT';

export function convertPayload(board, stop){
  const b = board ?? {};
  const owes = [];
  const value = {};
  if(str(b._trailing)) owes.push(`prose follows the board and no field holds it — "${str(b._trailing)}"`);

  // ---- the population. A bare number on one board and a `population:` block
  // carrying `count` on the other; the injected totals below confirm it.
  const pop = pick(b, 'population');
  let n = num(pop);
  if(n === undefined && pop && typeof pop === 'object') n = num(pick(pop, 'n', 'count', 'injected'));
  if(n !== undefined && n > 0) value.population = { n };
  else owes.push('the board has no `population` — the number of known objects put in, which is'
    + ' what every recovered count is a fraction of');

  // ---- the configurations: a map of named bins, or a list of records.
  const found = [];
  const named = pick(b, 'configs', 'bins', 'configurations', 'recovered');
  if(Array.isArray(named)) named.forEach(c => found.push([str(pick(c ?? {}, 'id', 'label', 'name')), c]));
  else if(named && typeof named === 'object'){
    for(const [k, v] of Object.entries(named)){
      if(k === '_trailing') continue;
      found.push([str(k), v]);
    }
  }

  let injected = 0, recovered = 0, haveInjected = true, haveMetric = found.length > 0;
  const configs = found.map(([id, rec], i) => {
    const at = `inject configuration ${i + 1}`;
    const det = (typeof rec === 'number') ? rec
      : num(pick(rec ?? {}, 'recovered', 'detections', 'found'));
    const inj = (typeof rec === 'number') ? undefined : num(pick(rec ?? {}, 'injected', 'n'));
    if(inj === undefined) haveInjected = false; else injected += inj;
    if(det !== undefined) recovered += det;
    if(!id) owes.push(`${at} has no id`);
    if(det === undefined) owes.push(`${at} ("${id || '?'}") has no recovered count`);
    const met = (typeof rec === 'number') ? undefined : num(pick(rec ?? {}, 'metric', 'score'));
    if(met === undefined) haveMetric = false;
    const out = {};
    if(id) out.id = id;
    if(det !== undefined) out.detections = det;
    if(met !== undefined) out.metric = met;
    return out;
  });
  if(configs.length) value.configs = configs;
  if(configs.length < 3){
    owes.push(`the board has ${configs.length} configuration(s) and an inject needs at least three`);
  }
  owes.push(`none of the ${configs.length} configurations has a \`label\` — the panel prints the`
    + ' payload id, and "' + (configs[0]?.id ?? '?') + '" is a token rather than something a'
    + ' player reads');

  // ---- the two numbers that prove the board was read the way it was written.
  if(haveInjected && injected > 0 && n !== undefined && injected !== n){
    owes.push(`the configurations inject ${injected} between them and the population is ${n} —`
      + ' one of the two is wrong, and neither is written over the other');
  }
  const stated = num(pick(b, 'truth'));
  if(stated !== undefined && recovered > 0 && Math.abs(stated - recovered) > 1e-9
    && !(n && Math.abs(stated - (recovered / n) * 100) < 1e-6)){
    owes.push(`the board states a recovered total of ${stated} and its configurations recover`
      + ` ${recovered}`);
  }

  // ---- the metric, which is the whole format and is on neither of the two
  // boards this pass converts. A board that DOES author one is carried through.
  const m = pick(b, 'metric') ?? {};
  const mLabel = str(typeof m === 'object' ? pick(m, 'label') : m);
  const unit = str(typeof m === 'object' ? pick(m, 'unit') : '') || str(pick(b, 'unit'));
  if(mLabel) value.metric = { label: mLabel, ...(unit ? { unit } : {}) };
  else if(unit){
    owes.push(`the board names a unit (\`${unit}\`) for its metric but no metric label, and a unit`
      + ' with nothing to be the unit OF is not written');
  } else {
    owes.push('the board has no `metric` label — the thing that is not the detection count');
  }
  if(!haveMetric){
    owes.push('no configuration carries a `metric` — the number that is deliberately not the'
      + ' detection count. The board measures recovery, and recovery is `recovered/injected`, which'
      + ' ranks the configurations exactly as the counts do — that is the board the importer refuses,'
      + ' because then counting detections is correct and the format has nothing to say. The metric'
      + ' has to be authored, not computed');
  }

  if(str(pick(b, 'best', 'best_config'))){
    value.best = str(pick(b, 'best', 'best_config'));
  } else {
    owes.push('the board names no `best` configuration — with no metric there is nothing to be'
      + ' best on, and the id in `correct_conclusion` names a finding rather than a configuration');
  }
  if(str(pick(b, 'blindSpot', 'blind_spot'))) value.blindSpot = str(pick(b, 'blindSpot', 'blind_spot'));
  else owes.push('the board has no `blindSpot` — what never comes back in any configuration, which'
    + ' is what the player is meant to leave the stop knowing');

  // ---- what the importer's inject has no field for. Dropped rather than
  // written under a name nothing reads, and named here so it is not lost.
  const homeless = [['required', 'the threshold the recovery is judged against'],
    ['tolerance', 'how close the submitted percentage has to be'],
    ['conclusion', 'the pass/fail verdict'],
    ['equation', 'the formula the player applies'],
    ['prediction', 'the figure that has to be committed before the equipment unlocks'],
    ['prediction_commit_required', 'the commit gate'],
    ['equipment_unlocks_after_commit', 'the unlock']];
  const dropped = homeless.filter(([k]) => b[k] !== undefined && b[k] !== '').map(([k]) => k);
  if(dropped.length){
    owes.push(`the board authors ${dropped.map(k => `\`${k}\``).join(', ')} with no home in the`
      + ' importer\'s `inject` block — this stop is a completeness measurement against a threshold,'
      + ' and the format it is filed under compares configurations');
  }

  owes.push(str(pick(b, 'answerText', 'correct_conclusion', 'correctConclusion'))
    ? 'the board\'s conclusion is the stop\'s `answerText`, a top-level key this converter cannot'
      + ' write — the contract returns one key'
    : 'the board authors no conclusion, so the stop has no `answerText` — the player reports a'
      + ' recovery fraction, gets it wrong, and is never told what came back');

  return { key: str(stop?.payloadKey) || 'inject', value, owes };
}

// ------------------------------------------------------ the canonical board
//
// Two stops: Carrying Capacity M13 S50 and Planetary Defense M5 S17. Both are
// the SAME board — the same three ids, the same 45/67/92 — so this is the
// format-level template written in the game's schema rather than two campaigns'
// content, and the owes below say so rather than the conversion hiding it.
//
// ONE FIELD NAME IS WRONG AND IT TAKES THE WHOLE BOARD WITH IT. The board writes
// `configurations`; the importer reads `configs`. Carried through, `b.configs`
// is undefined, so `cfgs` is `[]` and the branch refuses with "an inject needs
// at least three configurations", "the inject best configuration \"targeted\" is
// not one of them", and then throws on `[].reduce` with no initial value — which
// arrives in the report as *the INJECT board could not be read*. Three refusals
// and a crash out of one plural.
//
// `population` is authored under no name at all. It is the size of the set the
// injections are drawn from, it is what every recovery fraction on the panel is
// a fraction OF, and there is no number anywhere on the board to take it from —
// so it is owed. The three `metric` values equalling the three `detections`
// values is owed too: it is what makes the best configuration also the one with
// the most detections, which is the shortcut this format exists to break.
export function convertCanonical(b, stop = {}){
  const owes = [];
  const value = { ...(b ?? {}) };

  // ---- the one rename.
  const cfgs = list(pick(value, 'configs', 'configurations'));
  delete value.configurations;
  if(cfgs.length) value.configs = cfgs;
  else owes.push('the board names no configurations — an inject compares at least three, and'
    + ' there is nothing here to compare');

  // ---- the population. Owed, never guessed: the count of configurations is
  // not the size of the population, and neither is the largest detection count.
  if(pick(value, 'population') === undefined){
    owes.push('the board authors no `population` — the number of known objects put through each'
      + ' pipeline, which every recovery fraction on the panel is a fraction of. No number on the'
      + ' board is that count, so none is written as one');
  }

  // ---- the trap, which this board does not set. `metric` equal to
  // `detections` on every row makes the highest-scoring configuration also the
  // one with the most detections, and then counting detections is correct.
  const same = cfgs.filter(c => c && num(c.metric) !== undefined
    && num(c.metric) === num(c.detections));
  if(cfgs.length && same.length === cfgs.length){
    owes.push(`all ${cfgs.length} configurations score exactly their own detection count, so the`
      + ' one with the most detections is also the best on the metric — counting detections is'
      + ' then the right answer and the format has nothing to say');
  }

  // ---- the verdict, a top-level key. Both stops already carry one.
  const said = str(pick(b ?? {}, 'answerText', 'correctResult', 'correctConclusion',
    'correct_conclusion'));
  for(const k of ['answerText', 'correctResult', 'correctConclusion', 'correct_conclusion']){
    delete value[k];
  }
  const extra = {};
  const has = String(stop.answerText ?? '').trim();
  if(said && !has) extra.answerText = said;
  else if(!said && !has){
    owes.push('neither the stop nor its board authors an `answerText` — the player funds a'
      + ' pipeline, is told it was the wrong one, and never learns what the metric was measuring');
  }

  return { key: 'inject', value, owes, extra };
}

// ------------------------------------------------------------------ selftest
// Run: node tools/bibleConvert/inject.mjs --selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };

  const full = convertPayload({
    population: 200, metric: { label: 'Objects a night with a usable arc', unit: 'per night' },
    configs: [{ id: 'wide', label: 'Wide and shallow', injected: 50, recovered: 44, metric: 3 },
      { id: 'deep', label: 'Narrow and deep', injected: 50, recovered: 31, metric: 9 },
      { id: 'nightly', label: 'Nightly repeat', injected: 100, recovered: 60, metric: 6 }],
    best: 'deep', blindSpot: 'Anything moving faster than 130 arcsec an hour',
    answerText: 'The deep field returns fewer objects and more of the ones that matter.',
  }, { payloadKey: 'inject' });
  ok(full.value.population.n === 200, 'the population was lost');
  ok(full.value.configs.length === 3 && full.value.configs[1].detections === 31,
    'the recovered counts were lost');
  ok(full.value.configs.map(c => c.metric).join() === '3,9,6', 'an authored metric was dropped');
  ok(full.value.metric.label.startsWith('Objects') && full.value.metric.unit === 'per night',
    'the metric label or its unit was lost');
  ok(full.value.best === 'deep' && full.value.blindSpot.startsWith('Anything'),
    'the best configuration or the blind spot was lost');
  // What a complete board still owes is its labels, which this pass does not
  // carry into the importer's schema, and nothing else.
  ok(full.owes.filter(o => !/has a `label`|answerText/.test(o)).length === 0,
    `a complete inject owed more than its labels and its answerText: ${JSON.stringify(full.owes)}`);

  // Carrying Capacity M13 S50 as it arrives.
  const clean = convertPayload({ population: 100, recovered: { road: 45, common: 20, cliff: 2 },
    equation: 'recovery=recovered/injected*100', truth: 67, unit: 'percent',
    tolerance: 1, required: 90, conclusion: 'fail' }, { payloadKey: 'inject' });
  ok(clean.value.population.n === 100, 'the population was lost');
  ok(clean.value.configs.length === 3, 'the recovered map was not read as three configurations');
  // THE REFUSAL THIS FILE EXISTS FOR: recovery is `recovered/injected`, both
  // numbers are on the board, and computing it anyway writes the finding.
  ok(clean.value.configs.every(c => !('metric' in c)), 'a metric was computed from the counts');
  ok(clean.owes.some(o => /has to be authored, not computed/.test(o)),
    'the metric this converter refuses to compute was not owed');
  ok(!('metric' in clean.value), 'a metric label was invented from the board\'s equation');
  ok(clean.value.configs[2].detections === 2, 'a recovered count was lost');
  ok(!('metric' in clean.value) && !('best' in clean.value), 'a metric or a best was invented');
  ok(clean.owes.some(o => /`required`.*`tolerance`|`tolerance`/.test(o)),
    'the fields the importer has no home for were not owed');
  // 45 + 20 + 2 = 67, which is what the board states. It must not be owed.
  ok(!clean.owes.some(o => /states a recovered total/.test(o)),
    'a recovered total that agrees with its parts was owed as a disagreement');
  ok(convertPayload({ population: 100, recovered: { road: 45, common: 20, cliff: 2 }, truth: 70 }, {})
    .owes.some(o => /states a recovered total of 70/.test(o)), 'a mismatched total was not owed');

  // Planetary Defense M5 S17: a `population:` block and four named bins.
  const bins = convertPayload({ prediction_commit_required: true,
    prediction: { minimum_acceptable_recovery_percent: 80 },
    population: { count: 200, magnitude_range: [20, 23.5] },
    bins: { clean_bright: { injected: 50, recovered: 49 }, clean_faint: { injected: 50, recovered: 43 },
      trail_bright: { injected: 50, recovered: 45 }, trail_faint: { injected: 50, recovered: 27 } },
    correct_conclusion: 'localized_completeness_loss_near_trail' }, { payloadKey: 'inject' });
  ok(bins.value.population.n === 200, 'the population count inside its own block was not found');
  ok(bins.value.configs.length === 4, 'the four bins were not found');
  ok(bins.value.configs.map(c => c.detections).join() === '49,43,45,27', 'a bin count was lost');
  ok(bins.value.configs.every(c => !('metric' in c)),
    'a metric was computed from the injected and recovered counts');
  // 4 × 50 injected is exactly the population, and it must not be owed.
  ok(!bins.owes.some(o => /inject 200 between them/.test(o)),
    'a population that agrees with its bins was owed as a disagreement');
  ok(bins.owes.some(o => /`prediction`/.test(o)), 'the homeless commit gate was not owed');
  const mismatch = convertPayload({ population: { count: 300 },
    bins: { a: { injected: 50, recovered: 4 }, b: { injected: 50, recovered: 4 },
      c: { injected: 50, recovered: 4 } } }, {});
  ok(mismatch.owes.some(o => /inject 150 between them and the population is 300/.test(o)),
    'a population that disagrees with its bins was not owed');

  // Two configurations is not an inject.
  ok(convertPayload({ population: 10, recovered: { a: 1, b: 2 } }, {})
    .owes.some(o => /has 2 configuration\(s\)/.test(o)), 'a two-configuration board was not owed');
  ok(!full.owes.some(o => /configuration\(s\) and an inject needs/.test(o)),
    'a three-configuration board was called short');

  ok(convertPayload({ population: 10, _trailing: 'the sweep reveals 54%' }, {})
    .owes.some(o => /prose follows the board/.test(o)), 'trailing prose was dropped');

  // ---------------------------------------------------- the canonical board
  // Planetary Defense M5 S17 exactly as it arrives.
  const canon = { metric: { id: 'recovery_rate', label: 'recovery percentage' },
    configurations: [
      { id: 'baseline', label: 'baseline pipeline', detections: 45, metric: 45 },
      { id: 'expanded', label: 'expanded pipeline', detections: 67, metric: 67 },
      { id: 'targeted', label: 'targeted recovery pipeline', detections: 92, metric: 92 }],
    best: 'targeted', blindSpot: 'objects outside every sampled path are never recovered',
    correctResult: 'Trail/faint bin: 27/50 = 54%; localized loss.' };

  const c = convertCanonical(canon, { answerText: 'Trail/faint bin: 27/50 = 54%; localized loss.' });
  ok(c.key === 'inject', `the canonical board was keyed ${c.key}`);
  // THE RENAME. Put it back — drop the `value.configs = cfgs` line — and this
  // one case fails while nothing else here moves.
  ok(c.value.configs && c.value.configs.length === 3,
    `configurations did not become configs: ${JSON.stringify(Object.keys(c.value))}`);
  ok(!('configurations' in c.value),
    'the bible\'s own plural was left on the board beside the importer\'s, where it is dropped');
  // GUARDED, because `ok` collects rather than throws: with the rename put back
  // `configs` is undefined and this line would take the whole selftest down with
  // a TypeError instead of reporting the one case that failed.
  ok((c.value.configs ?? []).map(x => x.id).join() === 'baseline,expanded,targeted',
    'the configurations were reordered');
  ok(c.value.best === 'targeted' && c.value.metric.label === 'recovery percentage'
    && c.value.blindSpot.startsWith('objects outside'),
    'the best, the metric or the blind spot was lost');

  // The two things the board does not do, both said and neither filled in.
  ok(c.owes.some(o => /authors no `population`/.test(o)),
    `the missing population was not owed: ${JSON.stringify(c.owes)}`);
  ok(!('population' in c.value), 'a population was invented from the board\'s own numbers');
  ok(c.owes.some(o => /score exactly their own detection count/.test(o)),
    'a board whose metric IS its detection count went unowed');

  // And the case that must NOT fire, or the check is agreeing with itself: a
  // board where the metric ranks differently from the count is a real inject.
  const real = convertCanonical({ ...canon, population: { n: 200 },
    configurations: [{ id: 'wide', label: 'Wide', detections: 44, metric: 3 },
      { id: 'deep', label: 'Deep', detections: 31, metric: 9 },
      { id: 'nightly', label: 'Nightly', detections: 60, metric: 6 }], best: 'deep' },
  { answerText: 'x' });
  ok(!real.owes.some(o => /score exactly their own detection count/.test(o)),
    'a board whose metric differs from its counts was called degenerate');
  ok(!real.owes.some(o => /authors no `population`/.test(o)),
    'a board with a population was owed one anyway');
  ok(real.owes.length === 0, `a complete canonical inject owed ${JSON.stringify(real.owes)}`);

  // The verdict: placed where the stop has none, never over the stop's own.
  ok(!c.extra.answerText, 'the stop\'s own verdict was overwritten by the board\'s');
  const orphan = convertCanonical(canon, {});
  ok(orphan.extra.answerText === 'Trail/faint bin: 27/50 = 54%; localized loss.',
    'the board\'s verdict was not placed on a stop that had none');
  ok(!('correctResult' in orphan.value),
    'the board\'s verdict was left in the inject block, where nothing renders it');

  return fails;
}

if(process.argv[1] && process.argv[1].endsWith('inject.mjs')){
  const f = selftest();
  f.forEach(m => console.error(`  FAIL ${m}`));
  console.log(f.length ? `INJECT selftest: ${f.length} failure(s)` : 'INJECT selftest: ok');
  process.exit(f.length ? 1 : 0);
}
