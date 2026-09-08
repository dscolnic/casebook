// residual.mjs — the bible's RESIDUAL board into the importer's.
//
// 13 stops across six campaigns. See `_shared.mjs` for the contract every
// converter in this directory keeps.
//
// THE RENAME. The bible writes a fit as `{id, label, rms, points:[{x,y,value}]}`
// and the importer reads `residuals` where the bible writes `points`. Everything
// else is the same name.
//
// THE TRAP, and the only reason the format exists: the fit with the lowest RMS
// has to be the WRONG answer. The lesson is that a number can be better while
// the field under it is patterned, so a board whose `accept` is also its
// lowest-RMS fit has built a stop where "take the best number" is correct. That
// is reported, never corrected — moving `accept` here would be inventing the
// author's judgement, and moving an `rms` would be inventing their data.
//
// TWO THINGS DELIBERATELY NOT WRITTEN.
//
// `structured` — the flag saying the lowest-RMS fit's residuals carry a pattern.
// Every one of the thirteen boards leaves it off, and every one of them names
// the offending fit `patterned_low_rms`. One boolean, thirteen stops, all green.
// An id is a handle, not an assertion: the flag is the author saying a reader
// can SEE the pattern in the field as drawn, and nobody has looked at these
// fields. So it is owed. `patterned: true` is read as `structured` if a bible
// ever authors it, because that is a spelling and not a judgement.
//
// `reason` — a one-line note the boards carry ("the lower RMS hides a systematic
// trend"). The importer's residual block has no slot for it; `moral` is the
// closing board the verdict prints, and choosing to print the author's aside
// there is a placement decision, not a rename. The same sentence is already
// authored at stop level as `why`.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'RESIDUAL';

export const convert = (b) => {
  const owes = [];
  const raw = list(pick(b, 'fits'));
  if(raw.length < 2){
    owes.push(`the board carries ${raw.length} candidate fit(s) — a residual needs at least two`
      + ' to choose between');
  }

  const fits = raw.map((f, i) => {
    const at = `fit ${i + 1}`;
    const id = str(f.id) || str(f.label);
    const label = str(f.label);
    const rms = num(f.rms);
    // `points` is what all eight bibles call it; `residuals` is the importer's name.
    const pts = list(pick(f, 'residuals', 'points'));
    const good = pts.filter(p => num(p?.x) !== undefined && num(p?.y) !== undefined
      && num(p?.value) !== undefined);
    if(!id) owes.push(`${at} has neither an \`id\` nor a \`label\` to be accepted by`);
    if(!label) owes.push(`${at} has no \`label\` — the tab over its residual field is blank`);
    if(rms === undefined) owes.push(`${at} has no numeric \`rms\``);
    if(good.length < 5){
      owes.push(`${at} carries ${good.length} residual(s) with a numeric x, y and value —`
        + ' five are needed before a field can be drawn rather than described');
    }
    return {
      ...(id ? { id } : {}),
      ...(label ? { label } : {}),
      ...(rms !== undefined ? { rms } : {}),
      ...(f.structured === true || f.patterned === true ? { structured: true } : {}),
      residuals: good.map(p => ({ x: num(p.x), y: num(p.y), value: num(p.value) })),
    };
  });

  const ids = fits.map(f => f.id).filter(Boolean);
  if(new Set(ids).size !== ids.length) owes.push('two fits share an id');

  const accept = str(pick(b, 'accept'));
  if(!accept) owes.push('no `accept` — the board does not say which fit is the one to take');
  else if(ids.length && !ids.includes(accept)){
    owes.push(`the fit to accept, "${accept}", is not one of the fits`);
  }

  // Only when every fit carries a number. A board missing one has already been
  // reported for that, and picking a lowest RMS out of a partial set would name
  // the wrong fit in the sentence below.
  const scored = fits.filter(f => f.rms !== undefined);
  const best = scored.length === fits.length && fits.length >= 2
    ? scored.reduce((a, f) => (f.rms < a.rms ? f : a))
    : undefined;
  if(best){
    if(accept && best.id === accept){
      owes.push(`the fit to accept, "${accept}", is also the lowest-RMS one — then "take the best`
        + ' number" is the right answer and nobody has to look at the field');
    }
    if(!best.structured){
      owes.push(`the lowest-RMS fit "${best.id}" is not marked \`structured\` — the pattern across`
        + ' its residuals is the whole reason it is wrong, and the board has to say it is there');
    }
    const acc = fits.find(f => f.id === accept);
    if(acc?.structured) owes.push(`the fit to accept, "${accept}", is marked \`structured\``);
  }

  // THE ANSWER PRINTED ON THE BOARD. The label is the caption on the tab the
  // player clicks, beside the RMS. All thirteen boards label their fits "lower-RMS
  // patterned fit" and "slightly higher-RMS unpatterned fit", which is the format
  // answering itself: the task is to SEE the pattern in the field as drawn, and
  // the tab says which field has one. Matched on the words rather than on the
  // template's exact wording, because a label that gives it away in different
  // words gives it away just the same.
  for(const f of fits){
    if(f.label && /pattern|structur|systematic|random|noise|correct|accept|wrong/i.test(f.label)){
      owes.push(`fit "${f.id ?? f.label}" is labelled "${f.label}" — the tab says which field`
        + ' carries the pattern, and finding it in the drawn field is the whole task; name the fit'
        + ' by what it assumes instead');
    }
  }

  // The engine's fallback hint reads "each residual is one reference star, drawn
  // where it sits on the focal plane" — true of Ground Truth and of nothing else
  // carrying this format. An unhinted board ships that sentence to Headwater.
  if(!str(pick(b, 'hint'))){
    owes.push("no `hint` — the panel falls back to the engine's own, which calls every residual a"
      + ' reference star on a focal plane');
  }

  return { key: 'residual', value: {
    fits,
    ...(accept ? { accept } : {}),
    ...(str(pick(b, 'hint')) ? { hint: str(pick(b, 'hint')) } : {}),
    ...(str(pick(b, 'moral')) ? { moral: str(pick(b, 'moral')) } : {}),
    ...(str(pick(b, 'commit')) ? { commit: str(pick(b, 'commit')) } : {}),
  }, owes };
};

/* ------------------------------------------- the stop's own authored board
 *
 * `convertPayload` reads the block the bible's §7 POINTER points at rather than
 * a §7 board: the stop's own payload line, campaign-specific all along. Thirteen
 * RESIDUAL stops arrive that way, three of them as prose no parser can read, so
 * ten reach here.
 *
 * WHAT THE TEN ACTUALLY WROTE, because it is not what §7 wrote.
 *
 *   fields: [{id, label?, values|residuals, rms, pattern}]  correct: <id>
 *
 * — six of them, in that hand, one writing `models`/`rms_arcsec`/
 * `residuals_arcsec` for the same three things as a block sequence rather than
 * an inline list. A seventh writes `models` as a MAP of id to record, where the
 * key is the id. The last three are not a choice between fits at all: a run of
 * sign labels per cycle, a before/after refit against an acceptance box, and one
 * that carries only prose.
 *
 * THE ONE THING THESE BOARDS HAVE THAT §7 DID NOT, and it is the whole reason
 * this is worth doing: `pattern`. `pattern: none`, `pattern: alternating`,
 * `pattern: gradient`, `pattern: constant_bias` — that is the author saying
 * whether the residuals of that fit carry a pattern, which is exactly what
 * `structured` asserts. §7 left `structured` off all thirteen boards and it had
 * to be owed; here it is authored under another name, so it is read. A named
 * pattern is a spelling of `structured: true` and `none` is a spelling of its
 * absence — no judgement is being added, the author's is being read.
 *
 * THE ONE THING THEY DO NOT HAVE. The panel draws a residual FIELD: every point
 * is a stick at an (x, y) on the focal plane, and the sign flip across the field
 * is the lesson. Every one of these boards authored a RUN — an ordered list of
 * values with no position for any of them. The order is authored; the two
 * coordinates are not, and writing `x: i, y: 0` for five sticks is inventing
 * more of the author's data than the one boolean this file already refuses to
 * write. So the run is reported and the fit ships with no residuals rather than
 * with made-up ones. That is a content finding, not a converter gap: what the
 * bibles authored for RESIDUAL is one-dimensional and the instrument is two.
 */

/** The points that carry the field's two coordinates — the schema's own shape. */
const points = (v) => list(v).filter(p => p && typeof p === 'object' && !Array.isArray(p))
  .filter(p => num(p.x) !== undefined && num(p.y) !== undefined && num(p.value) !== undefined)
  .map(p => ({ x: num(p.x), y: num(p.y), value: num(p.value) }));

/**
 * The bare numbers of an authored run, in the order they were written. Read
 * through `num` rather than taken at face value: `residuals: [-.1, .1, 0, .0]`
 * is a leading-dot number, which is a number to a reader and a string to the
 * parser's scalar rule, and it is how six of these ten boards write theirs.
 */
const run = (v) => list(v).filter(x => x === null || typeof x !== 'object')
  .map(num).filter(n => n !== undefined);

/** `pattern: none` is no pattern; any other named one is the author saying it is there. */
const NO_PATTERN = /^(none|no|null|random|noise|unpatterned|unstructured|flat|nil|-)$/i;

export const convertPayload = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};

  // Prose that followed the board. It is the one place a revealed number is
  // written, so it is read out loud rather than dropped — which field it belongs
  // to is the author's call and not this tool's.
  const trailing = str(board._trailing);
  if(trailing){
    owes.push(`prose follows the board and is not part of it — "${trailing}" — read it before`
      + ' shipping: it is where a revealed number is written when the board has no slot for one');
  }

  const rawFits = pick(board, 'fits', 'fields', 'models', 'candidates');
  let entries = [];
  if(Array.isArray(rawFits)){
    entries = rawFits.filter(x => x && typeof x === 'object' && !Array.isArray(x));
    if(entries.length < rawFits.length){
      owes.push(`the fit list has ${rawFits.length - entries.length} entry(ies) that are not`
        + ' records — a fit is `{id, label, rms, pattern}` and these carry nothing to read');
    }
  } else if(rawFits && typeof rawFits === 'object'){
    // `models: {heat_only: {...}, heat_plus_nitrate: {...}}` — the id is the key.
    entries = Object.entries(rawFits).map(([id, f]) =>
      ((f && typeof f === 'object' && !Array.isArray(f)) ? { id, ...f } : { id }));
  }
  if(!entries.length){
    owes.push('the board names no candidate fits under `fits`, `fields` or `models` — there is'
      + ' nothing to choose between');
  } else if(entries.length < 2){
    owes.push(`the board carries ${entries.length} candidate fit(s) — a residual needs at least two`
      + ' to choose between');
  }

  const fits = entries.map((f, i) => {
    const at = `fit ${i + 1}`;
    const id = str(pick(f, 'id')) || str(pick(f, 'label'));
    const label = str(pick(f, 'label', 'name', 'model'));
    const rms = num(pick(f, 'rms', 'rms_arcsec', 'rms_m', 'rmse'));
    const pts = points(pick(f, 'residuals', 'points', 'residuals_arcsec', 'values'));
    const bare = pts.length ? [] : run(pick(f, 'residuals', 'points', 'residuals_arcsec', 'values'));
    const pat = str(pick(f, 'pattern'));
    const structured = f.structured === true || f.patterned === true
      || (pat.length > 0 && !NO_PATTERN.test(pat));

    if(!id) owes.push(`${at} has neither an \`id\` nor a \`label\` to be accepted by`);
    if(!label) owes.push(`${at} has no \`label\` — the tab over its residual field is blank`);
    if(rms === undefined) owes.push(`${at} has no numeric \`rms\``);
    if(!pat && f.structured === undefined && f.patterned === undefined){
      owes.push(`${at} says nothing about whether its residuals carry a pattern — no \`pattern\`,`
        + ' and a pattern named or ruled out is the only thing that makes one fit wrong');
    }
    if(bare.length){
      owes.push(`${at} authored a run of ${bare.length} residual value(s) and no position for any`
        + ' of them — the panel draws each residual as a stick where it was measured, so every one'
        + ' needs the `x` and `y` it sits at; the order alone is not a field');
    } else if(pts.length < 5){
      owes.push(`${at} carries ${pts.length} residual(s) with a numeric x, y and value —`
        + ' five are needed before a field can be drawn rather than described');
    }
    return {
      ...(id ? { id } : {}),
      ...(label ? { label } : {}),
      ...(rms !== undefined ? { rms } : {}),
      ...(structured ? { structured: true } : {}),
      residuals: pts,
    };
  });

  const ids = fits.map(f => f.id).filter(Boolean);
  if(new Set(ids).size !== ids.length) owes.push('two fits share an id');

  const accept = str(pick(board, 'accept', 'correct', 'correct_model', 'correct_field',
    'correct_fit', 'answer'));
  if(!accept) owes.push('no `accept` — the board does not say which fit is the one to take');
  else if(ids.length && !ids.includes(accept)){
    owes.push(`the fit to accept, "${accept}", is not one of the fits`);
  }

  // THE TRAP, read off the numbers the author wrote and never off the order they
  // were written in. Same three sentences as the §7 path, because it is the same
  // rule: a board whose lowest-RMS fit is also its answer has built a stop where
  // "take the best number" is correct.
  const scored = fits.filter(f => f.rms !== undefined);
  const best = scored.length === fits.length && fits.length >= 2
    ? scored.reduce((a, f) => (f.rms < a.rms ? f : a))
    : undefined;
  if(best){
    if(accept && best.id === accept){
      owes.push(`the fit to accept, "${accept}", is also the lowest-RMS one — then "take the best`
        + ' number" is the right answer and nobody has to look at the field');
    }
    if(!best.structured){
      owes.push(`the lowest-RMS fit "${best.id}" is not marked \`structured\` — the pattern across`
        + ' its residuals is the whole reason it is wrong, and the board has to say it is there');
    }
    const acc = fits.find(f => f.id === accept);
    if(acc?.structured) owes.push(`the fit to accept, "${accept}", is marked \`structured\``);
  }

  for(const f of fits){
    if(f.label && /pattern|structur|systematic|random|noise|correct|accept|wrong/i.test(f.label)){
      owes.push(`fit "${f.id ?? f.label}" is labelled "${f.label}" — the tab says which field`
        + ' carries the pattern, and finding it in the drawn field is the whole task; name the fit'
        + ' by what it assumes instead');
    }
  }

  const hint = str(pick(board, 'hint'));
  if(!hint){
    owes.push("no `hint` — the panel falls back to the engine's own, which calls every residual a"
      + ' reference star on a focal plane');
  }
  // The payload's own top-level name, when it is not the format's. `_payload.mjs`
  // drops a scalar written before the first key, so a board keyed on one of its
  // own data sets has already lost that set by the time it arrives here.
  const pk = str(stop.payloadKey);
  if(pk && pk !== 'residual'){
    owes.push(`the payload is keyed \`${pk}\` rather than \`residual\` — check what was written`
      + ' straight after that name, because a value before the first key does not survive the parse');
  }

  return { key: 'residual', value: {
    fits,
    ...(accept ? { accept } : {}),
    ...(hint ? { hint } : {}),
    ...(str(pick(board, 'moral')) ? { moral: str(pick(board, 'moral')) } : {}),
    ...(str(pick(board, 'commit')) ? { commit: str(pick(board, 'commit')) } : {}),
  }, owes };
};

/* -------------------------------------------- handback 3's canonical board
 *
 * Thirteen stops now carry a block headed `Handback 3 canonical interaction
 * block — RESIDUAL:`, written in the GAME's field names. `bible-build.mjs`
 * carries such a board straight through, which is right for most formats and
 * one rename short here.
 *
 * WHAT THE THIRTEEN WROTE — and it is one template, thirteen times, identical
 * down to the last decimal except for `correctConclusion`:
 *
 *   residual:
 *     xAxis: {label: "ordered observation in the question", values: [1,2,3,4,5]}
 *     fits:
 *       - id: patterned_low_error
 *         label: "lower average error but patterned residuals"
 *         rms: 0.18
 *         structured: true
 *         residuals: [{x: 1, y: -0.12}, … {x: 5, y: 0.12}]
 *       - id: unpatterned_generalising
 *         label: "slightly higher error with no directional pattern"
 *         rms: 0.21
 *         structured: false
 *         residuals: [{x: 1, y: 0.05}, … {x: 5, y: 0.01}]
 *     accept: unpatterned_generalising
 *     reject: patterned_low_error
 *     correctConclusion: "…"
 *
 * THE RENAME, and it is the only one. `fits`, `id`, `label`, `rms`,
 * `structured`, `residuals` and `accept` are already the importer's own names —
 * that is what "canonical" bought. The point is not: the board writes
 * `{x, y}` and the panel reads `{x, y, value}`, so every one of the thirteen is
 * refused by `every residual point needs a numeric x, y and value`.
 *
 * `value` is a rename here and NOT the invention the payload path refuses. The
 * difference is what the author actually wrote down. A payload board authored a
 * RUN — an ordered list of residual sizes with no position for any of them — and
 * `x: i, y: 0` would be this tool deciding where five sticks stand. These boards
 * authored a residual PLOT: `xAxis` names the horizontal as the ordered
 * observation, `x` is that observation, and `y` is the residual at it. The
 * panel's `value` is the signed size of the stick, which is the residual; its
 * `y` is where the stick stands, which in a residual plot is also the residual.
 * One authored number, read under both names it does its work under, and the
 * field that comes out is the plot the author described. Nothing is added.
 *
 * `structured: false` is written off rather than through, because the importer
 * reads `structured` as a flag and the schema only ever carries the true one.
 *
 * WHAT IS NOT CARRIED. `xAxis` has no slot on the panel — the horizontal is
 * drawn from the points' own spread. `reject` is `accept`'s complement and the
 * board grades on `accept` alone. `correctConclusion` is the worked answer and
 * every one of the thirteen stops already carries the same sentence as
 * `answerText`; `moral` is the closing board, and printing an answer there is a
 * placement decision rather than a rename.
 */

/** The template every one of the thirteen shipped, recognised by its own ids. */
const STOCK_IDS = ['patterned_low_error', 'unpatterned_generalising'];

/**
 * The canonical board's points into the panel's. `y` is the residual, so it is
 * read as `value` as well as kept as the height it is drawn at; an explicit
 * `value` still wins, because a board that authored all three meant all three.
 */
const canonPoints = (v) => {
  const kept = [], bare = [];
  for(const p of list(v)){
    if(!p || typeof p !== 'object' || Array.isArray(p)){ bare.push(p); continue; }
    const x = num(p.x);
    // A RESIDUAL FIELD MAY BE A STRIP. The panel plots each point at (x, y) and
    // draws the residual as a stick, which is a focal plane in Ground Truth and
    // a run of record indexes in Whiteout — `{x: 3, residual: 1.0}`, one row,
    // no second axis. Reading `y` as required threw every such point away and
    // the board was refused for carrying no points, about a board carrying
    // eight. Where the value is named and `y` is not, the strip sits on y = 0;
    // where neither is named the point is still bare, because a point with one
    // number in it does not say which number it is.
    const named = num(pick(p, 'value', 'residual'));
    const y = num(p.y) ?? (named !== undefined ? 0 : undefined);
    const value = named ?? y;
    if(x === undefined || y === undefined || value === undefined){ bare.push(p); continue; }
    kept.push({ x, y, value });
  }
  return { kept, bare };
};

/** An authored id set in words, for a board that labels its fits nowhere else. */
const fromId = (id) => (id ? id.replace(/[_-]+/g, ' ').replace(/^./, c => c.toUpperCase()) : '');

export const convertCanonical = (b, stop = {}) => {
  const owes = [];
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const raw = list(pick(board, 'fits'))
    .filter(f => f && typeof f === 'object' && !Array.isArray(f));
  if(raw.length < 2){
    owes.push(`the board carries ${raw.length} candidate fit(s) — a residual needs at least two`
      + ' to choose between');
  }

  const fits = raw.map((f, i) => {
    const at = `fit ${i + 1}`;
    const id = str(f.id) || str(f.label);
    // `error` is what Whiteout calls the aggregate; `rms` is the panel's name
    // for the same number, printed beside the tab.
    const rms = num(pick(f, 'rms', 'error'));
    const { kept, bare } = canonPoints(pick(f, 'residuals', 'points'));
    // THE TAB HAS TO SAY SOMETHING. Where a board names its fits only by id,
    // the id set in words is the author's own noun and nothing is invented —
    // `forward_remove` becomes "Forward remove". It is worse copy than a
    // written label and it is still the bible's word, so the label is owed
    // rather than refused: the board converts and the handback asks for one.
    const label = str(f.label) || fromId(id);
    if(!id) owes.push(`${at} has neither an \`id\` nor a \`label\` to be accepted by`);
    if(!str(f.label)){
      owes.push(`${at} has no \`label\` — the tab over its field reads "${label}", which is its`
        + ' id set in words rather than anything written for a player');
    }
    if(rms === undefined) owes.push(`${at} has no numeric \`rms\``);
    if(bare.length){
      owes.push(`${at} has ${bare.length} point(s) the panel cannot place — each needs a numeric`
        + ' `x` and a numeric residual at it, and one that has neither is not carried');
    }
    if(kept.length < 5){
      owes.push(`${at} carries ${kept.length} residual(s) with a numeric x, y and value —`
        + ' five are needed before a field can be drawn rather than described');
    }
    return {
      ...(id ? { id } : {}),
      ...(label ? { label } : {}),
      ...(rms !== undefined ? { rms } : {}),
      ...(f.structured === true || f.patterned === true ? { structured: true } : {}),
      residuals: kept,
    };
  });

  const ids = fits.map(f => f.id).filter(Boolean);
  if(new Set(ids).size !== ids.length) owes.push('two fits share an id');

  // THE FIT TO TAKE. `accept` when the board names one; otherwise the one fit
  // it does NOT mark `structured`, which is the same fact stated the other way
  // round and is only read when exactly one fit is unmarked. Two unmarked fits
  // is a board that has not decided, and it is owed rather than guessed at.
  const unmarked = raw.filter(f => f.structured !== true && f.patterned !== true);
  const accept = str(pick(board, 'accept'))
    || (raw.length >= 2 && unmarked.length === 1 ? str(unmarked[0].id) : '');
  if(!accept) owes.push('no `accept` — the board does not say which fit is the one to take');
  else if(ids.length && !ids.includes(accept)){
    owes.push(`the fit to accept, "${accept}", is not one of the fits`);
  }
  // `reject` is `accept`'s complement, and a board that disagrees with itself
  // about which fit is which has to be read by a person, not patched here.
  const reject = str(pick(board, 'reject'));
  if(reject && accept && reject === accept){
    owes.push(`the board both accepts and rejects "${accept}"`);
  }

  // THE TRAP, off the numbers and never off the order the fits were written in.
  const scored = fits.filter(f => f.rms !== undefined);
  const best = scored.length === fits.length && fits.length >= 2
    ? scored.reduce((a, f) => (f.rms < a.rms ? f : a))
    : undefined;
  if(best){
    if(accept && best.id === accept){
      owes.push(`the fit to accept, "${accept}", is also the lowest-RMS one — then "take the best`
        + ' number" is the right answer and nobody has to look at the field');
    }
    if(!best.structured){
      owes.push(`the lowest-RMS fit "${best.id}" is not marked \`structured\` — the pattern across`
        + ' its residuals is the whole reason it is wrong, and the board has to say it is there');
    }
    const acc = fits.find(f => f.id === accept);
    if(acc?.structured) owes.push(`the fit to accept, "${accept}", is marked \`structured\``);
  }

  // ONE FINDING, ONE LINE. The stock board's labels give the answer away AND its
  // numbers are the same on every RESIDUAL stop in the repo, and reporting those
  // as three separate refusals thirteen times is how a report stops being read.
  // So the template is named once, and the label check below runs on the boards
  // that are not it.
  const stock = ids.length === STOCK_IDS.length && STOCK_IDS.every(x => ids.includes(x));
  if(stock){
    owes.push('this is the handback template, unchanged: the same two fits, the same RMS pair and'
      + ' the same five residuals as every other canonical RESIDUAL board in the repo, labelled'
      + ' "…patterned residuals" and "…no directional pattern" so the tab names the patterned fit'
      + " outright. The field drawn is not this stop's data and reading it is not this stop's task");
  } else {
    for(const f of fits){
      if(f.label && /pattern|structur|systematic|random|noise|correct|accept|wrong/i.test(f.label)){
        owes.push(`fit "${f.id ?? f.label}" is labelled "${f.label}" — the tab says which field`
          + ' carries the pattern, and finding it in the drawn field is the whole task; name the fit'
          + ' by what it assumes instead');
      }
    }
  }

  const hint = str(pick(board, 'hint'));
  if(!hint){
    owes.push("no `hint` — the panel falls back to the engine's own, which calls every residual a"
      + ' reference star on a focal plane');
  }

  return { key: 'residual', value: {
    fits,
    ...(accept ? { accept } : {}),
    ...(hint ? { hint } : {}),
    ...(str(pick(board, 'moral')) ? { moral: str(pick(board, 'moral')) } : {}),
    ...(str(pick(board, 'commit')) ? { commit: str(pick(board, 'commit')) } : {}),
  }, owes };
};

/* ------------------------------------------------------------------ selftest
 *
 * `node tools/bibleConvert/residual.mjs --selftest`
 *
 * What it has to prove is not that a good board converts. It is that a board
 * missing a field lands the field in `owes` and does NOT get it in `value`, and
 * that the trap is read off the numbers rather than off the order the fits were
 * written in — the eight bibles all list the patterned fit first, so a check
 * that secretly means "the first one" would pass on every board in the repo and
 * be wrong on the first board that is written the other way up.
 */
const FIXTURE = () => ({
  fits: [
    { id: 'patterned_low_rms', label: 'lower-RMS patterned fit', rms: 1.10, structured: true,
      points: [{ x: 1, y: 2, value: -1.4 }, { x: 2, y: 3, value: -0.7 }, { x: 3, y: 4, value: 0 },
        { x: 4, y: 5, value: 0.7 }, { x: 5, y: 6, value: 1.4 }] },
    { id: 'random_higher_rms', label: 'slightly higher-RMS unpatterned fit', rms: 1.25,
      points: [{ x: 1, y: 2, value: 0.8 }, { x: 2, y: 3, value: -1.3 }, { x: 3, y: 4, value: 0.5 },
        { x: 4, y: 5, value: -0.6 }, { x: 5, y: 6, value: 1.1 }] },
  ],
  accept: 'random_higher_rms',
  hint: 'Each stick is one gauge, drawn where it stands on the reach.',
});

/** The fixture with labels that do not give the answer away, so the rest can be tested alone. */
const WHOLE = () => {
  const f = FIXTURE();
  f.fits[0].label = 'constant offset per chip';
  f.fits[1].label = 'offset plus a linear term in field angle';
  return f;
};

function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convert(WHOLE());
  check('a complete board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema',
    r.key === 'residual' && r.value.fits.length === 2 && r.value.fits[0].residuals.length === 5
    && r.value.accept === 'random_higher_rms', JSON.stringify(r.value).slice(0, 120));

  // The same board with the fits written the other way up must score identically.
  const flipped = WHOLE();
  flipped.fits.reverse();
  const rf = convert(flipped);
  check('the same board with its fits reversed owes exactly the same',
    rf.owes.length === 0, rf.owes.join(' | '));

  // REFUSE, DO NOT INVENT: `structured` off the lowest-RMS fit.
  const bare = WHOLE();
  delete bare.fits[0].structured;
  r = convert(bare);
  check('a lowest-RMS fit with no `structured` is owed',
    has(r, 'not marked `structured`'), r.owes.join(' | '));
  check('…and does not get one written for it',
    r.value.fits.every(f => f.structured === undefined));

  // …and named off the numbers, not the position.
  const bareFlipped = WHOLE();
  delete bareFlipped.fits[0].structured;
  bareFlipped.fits.reverse();
  r = convert(bareFlipped);
  check('…named by RMS and not by position when the fits are reversed',
    has(r, '"patterned_low_rms" is not marked `structured`'), r.owes.join(' | '));

  // THE TRAP: accepting the best number.
  const trapped = WHOLE();
  trapped.accept = 'patterned_low_rms';
  r = convert(trapped);
  check('a board that accepts its own lowest-RMS fit is reported',
    has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));

  // …including when the accepted fit is the LAST one written.
  const trappedFlipped = WHOLE();
  trappedFlipped.fits.reverse();
  trappedFlipped.accept = 'patterned_low_rms';
  r = convert(trappedFlipped);
  check('…and the trap is not "the first fit listed"',
    has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));

  // A missing rms is owed and never defaulted to zero, which would make that fit
  // the lowest-RMS one and hand the trap a fit the author never scored.
  const noRms = WHOLE();
  delete noRms.fits[1].rms;
  r = convert(noRms);
  check('a fit with no `rms` is owed', has(r, 'no numeric `rms`'), r.owes.join(' | '));
  check('…and gets no rms written, not a zero', r.value.fits[1].rms === undefined);
  check('…and the lowest-RMS sentences stay quiet rather than name the wrong fit',
    !has(r, 'lowest-RMS'), r.owes.join(' | '));

  const short = WHOLE();
  short.fits[0].points = short.fits[0].points.slice(0, 3);
  r = convert(short);
  check('a fit with three residuals is owed the other two',
    has(r, 'carries 3 residual(s)'), r.owes.join(' | '));
  check('…and no points are invented', r.value.fits[0].residuals.length === 3);

  const junk = WHOLE();
  junk.fits[1].points[0] = { x: 1, y: 2 };
  r = convert(junk);
  check('a residual with no `value` is not counted and not written',
    has(r, 'carries 4 residual(s)') && r.value.fits[1].residuals.length === 4, r.owes.join(' | '));

  const noAccept = WHOLE();
  delete noAccept.accept;
  r = convert(noAccept);
  check('a board with no `accept` is owed one', has(r, 'no `accept`'), r.owes.join(' | '));
  check('…and none is guessed', r.value.accept === undefined);

  const noHint = WHOLE();
  delete noHint.hint;
  r = convert(noHint);
  check('a board with no hint is owed one', has(r, 'no `hint`'), r.owes.join(' | '));
  check('…and the engine\'s reference-star line is not copied in', r.value.hint === undefined);

  // The template's own labels: the tab says which field is the patterned one.
  r = convert(FIXTURE());
  check('a fit labelled "…patterned fit" is reported for naming the answer',
    r.owes.filter(o => o.includes('the tab says which field carries the pattern')).length === 2,
    r.owes.join(' | '));
  check('…and a label naming what the fit assumes is not',
    !convert(WHOLE()).owes.some(o => o.includes('the tab says which field')));

  const one = convert({ fits: [WHOLE().fits[0]], accept: 'patterned_low_rms', hint: 'x' });
  check('a board with one fit is owed a second', has(one, 'at least two'), one.owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nRESIDUAL converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

/* ---------------------------------------------------- selftest: the payloads
 *
 * The same discipline one level down. Two cases carry the file:
 *
 *   the trap — a board whose lowest-RMS fit is its own answer has to be
 *   reported, and reported off the RMS rather than off the position, which is
 *   checked by scoring the same board with its fits reversed; and
 *
 *   the run — a fit that authored an ordered list of residual values and no
 *   coordinates has to be owed those coordinates and must not be handed
 *   invented ones. Putting the bug back means writing `x: i, y: 0` and watching
 *   this pair, and only this pair, go green while the field it draws is a fiction.
 */

/** The commonest shape: a `fields` list, as the parser now hands it over. */
const P_FIXTURE = () => ({
  fields: [
    { id: 'coaster', label: 'Coaster drawing minus tape', rms: 0.012, pattern: 'constant_bias',
      residuals: [{ x: 0, y: 0, value: -1.8 }, { x: 1, y: 0, value: -1.7 },
        { x: 2, y: 1, value: -1.9 }, { x: 3, y: 1, value: -1.8 }, { x: 0, y: 2, value: -1.75 }] },
    { id: 'tower', label: 'Tower mark minus laser', rms: 0.016, pattern: 'none',
      residuals: [{ x: 0, y: 0, value: 0.02 }, { x: 1, y: 0, value: -0.01 },
        { x: 2, y: 1, value: 0.01 }, { x: 3, y: 1, value: -0.02 }, { x: 0, y: 2, value: 0.015 }] },
  ],
  correct: 'tower',
  hint: 'Each stick is one tape station, drawn where it stands on the deck.',
});

function selftestPayload(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convertPayload(P_FIXTURE(), {});
  check('a whole payload board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema',
    r.key === 'residual' && r.value.fits.length === 2 && r.value.fits[0].id === 'coaster'
    && r.value.fits[0].label === 'Coaster drawing minus tape' && r.value.fits[0].rms === 0.012
    && r.value.fits[0].residuals.length === 5 && r.value.accept === 'tower',
    JSON.stringify(r.value).slice(0, 160));

  // `pattern` IS `structured`, and `pattern: none` is its absence.
  check('a named `pattern` is read as `structured`', r.value.fits[0].structured === true);
  check('…and `pattern: none` writes no `structured`', r.value.fits[1].structured === undefined);

  // THE TRAP, off the numbers. The whole board turns on the accepted fit NOT
  // being the lowest-RMS one, so the fixture accepts `tower` at 0.016 over
  // `coaster` at 0.012 — and moving the answer to `coaster` has to be reported.
  const trapped = P_FIXTURE();
  trapped.correct = 'coaster';
  r = convertPayload(trapped, {});
  check('a payload board accepting its own lowest-RMS fit is reported',
    has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));
  check('…and the accepted fit being the patterned one is reported too',
    has(r, 'is marked `structured`'), r.owes.join(' | '));

  // …and off the RMS rather than off the order, which is what the same board
  // written the other way up proves.
  const flipped = P_FIXTURE();
  flipped.fields.reverse();
  r = convertPayload(flipped, {});
  check('the same board with its fits reversed owes exactly the same — nothing',
    r.owes.length === 0, r.owes.join(' | '));
  flipped.correct = 'coaster';
  r = convertPayload(flipped, {});
  check('…and the trap fires on the last-written fit just as it does on the first',
    has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));

  // THE RUN. What every real board authored, and what may not be repaired.
  const bareRun = {
    fields: [
      { id: 'portable', label: 'Portable wheel', rms: 0.415, pattern: 'alternating',
        values: [0.42, -0.39, 0.44, -0.41, 0.40, -0.43] },
      { id: 'independent', label: 'Independent axle encoder', rms: 0.096, pattern: 'none',
        values: [0.10, -0.12, 0.08, -0.09, 0.11, -0.07] },
    ],
    correct: 'independent',
    hint: 'Each stick is one run down the track.',
  };
  r = convertPayload(bareRun, {});
  check('a fit authored as a run of values with no coordinates is owed them',
    r.owes.filter(o => o.includes('and no position for any of them')).length === 2,
    r.owes.join(' | '));
  check('…and no coordinates are invented for it',
    r.value.fits.every(f => f.residuals.length === 0));
  check('…while everything the run DID author still converts',
    r.value.fits[0].rms === 0.415 && r.value.fits[0].structured === true
    && r.value.fits[1].structured === undefined && r.value.accept === 'independent');
  check('…and this board is one where the lowest RMS is the answer',
    has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));

  // A `models` map: the id is the key.
  const asMap = {
    models: { heat_only: { residuals: [0, 0, -2, -2] },
      heat_plus_nitrate: { residuals: [0.2, -0.1, 0.1, -0.2] } },
    correct: 'heat_plus_nitrate',
  };
  r = convertPayload(asMap, {});
  check('a `models` map is read as two fits keyed by name',
    r.value.fits.length === 2 && r.value.fits[0].id === 'heat_only'
    && r.value.fits[1].id === 'heat_plus_nitrate', JSON.stringify(r.value.fits));
  check('…with no rms, which is owed', has(r, 'no numeric `rms`'), r.owes.join(' | '));
  check('…and no rms invented, so the trap sentences stay quiet rather than name a fit',
    r.value.fits.every(f => f.rms === undefined) && !has(r, 'lowest-RMS'), r.owes.join(' | '));

  // A block sequence of mappings — `models: - id: A … - id: B …` — which the
  // parser now rebuilds into records, spilling the board-level key that followed
  // the last one back where it belongs. This is planetary_defense S7, the only
  // authored RESIDUAL board in the repo that passes its own trap.
  const blockSeq = {
    models: [{ id: 'A', rms_arcsec: 0.18, residuals_arcsec: [-0.24, -0.16, -0.05, 0.07, 0.15, 0.25] },
      { id: 'B', rms_arcsec: 0.21, residuals_arcsec: [0.18, -0.22, 0.09, -0.19, 0.24, -0.11] }],
    correct_model: 'B',
  };
  r = convertPayload(blockSeq, {});
  check('a block sequence of models is read as two fits, not one',
    r.value.fits.length === 2 && r.value.fits[0].id === 'A' && r.value.fits[0].rms === 0.18
    && r.value.fits[1].id === 'B' && r.value.fits[1].rms === 0.21, JSON.stringify(r.value.fits));
  check('…with the board-level `correct_model` read as the accept, not trapped in fit B',
    r.value.accept === 'B', JSON.stringify(r.value));
  check('…and it passes its trap: the answer is not the lowest-RMS fit',
    !has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));

  const noPattern = P_FIXTURE();
  noPattern.fields.forEach(f => { delete f.pattern; });
  r = convertPayload(noPattern, {});
  check('a fit that says nothing about a pattern is owed that',
    r.owes.filter(o => o.includes('says nothing about whether its residuals carry a pattern'))
      .length === 2, r.owes.join(' | '));
  check('…and gets no `structured` written for it',
    r.value.fits.every(f => f.structured === undefined));

  const noAccept = P_FIXTURE();
  delete noAccept.correct;
  r = convertPayload(noAccept, {});
  check('a payload board with no `correct` is owed an `accept`', has(r, 'no `accept`'));
  check('…and none is guessed', r.value.accept === undefined);

  const noHint = P_FIXTURE();
  delete noHint.hint;
  r = convertPayload(noHint, {});
  check('a payload board with no hint is owed one', has(r, 'no `hint`'));
  check('…and the reference-star line is not copied in', r.value.hint === undefined);

  const notFits = convertPayload({ expected_noise_pattern: 'uncorrelated_signs',
    correct_classification: 'systematic_phase_locked_residual' }, {});
  check('a board that names no fits at all is reported',
    has(notFits, 'names no candidate fits'), notFits.owes.join(' | '));
  check('…and converts to an empty fit list rather than a made-up one',
    notFits.value.fits.length === 0);

  const trailing = P_FIXTURE();
  trailing._trailing = 'update reveals 4.235 m.';
  r = convertPayload(trailing, {});
  check('prose after the board is read out loud rather than dropped',
    has(r, '4.235 m'), r.owes.join(' | '));

  r = convertPayload(P_FIXTURE(), { payloadKey: 'train' });
  check('a payload keyed on something other than `residual` is flagged',
    has(r, 'keyed `train`'), r.owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nRESIDUAL payload converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

/* -------------------------------------------------- selftest: the canonical
 *
 * The case the file turns on is the third pair below: a point authored as
 * `{x, y}` has to come back as `{x, y, value}` with `value` equal to the
 * authored `y`, and a point missing either coordinate has to be dropped rather
 * than completed. Put the bug back by writing `value: 0` for an unauthored one
 * and the "no coordinates are invented" case goes red on its own; drop the
 * `?? y` fallback and the whole board comes back with no residuals at all,
 * which is the state the thirteen shipping boards are in today.
 *
 * The equal-inputs case is the second: the same board with its two fits written
 * the other way up must owe exactly the same list, because everything this
 * converter says about a fit is read off the numbers.
 */
const C_FIXTURE = () => ({
  xAxis: { label: 'ordered observation in the question', values: [1, 2, 3, 4, 5] },
  fits: [
    { id: 'patterned_low_error', label: 'lower average error but patterned residuals',
      rms: 0.18, structured: true,
      residuals: [{ x: 1, y: -0.12 }, { x: 2, y: -0.06 }, { x: 3, y: 0 },
        { x: 4, y: 0.06 }, { x: 5, y: 0.12 }] },
    { id: 'unpatterned_generalising', label: 'slightly higher error with no directional pattern',
      rms: 0.21, structured: false,
      residuals: [{ x: 1, y: 0.05 }, { x: 2, y: -0.04 }, { x: 3, y: 0.02 },
        { x: 4, y: -0.03 }, { x: 5, y: 0.01 }] },
  ],
  accept: 'unpatterned_generalising',
  reject: 'patterned_low_error',
  correctConclusion: 'missing peak.',
});

/** The same board renamed off the template, so the rest can be tested alone. */
const C_WHOLE = () => {
  const f = C_FIXTURE();
  f.fits[0].id = 'constant_offset'; f.fits[0].label = 'constant offset per chip';
  f.fits[1].id = 'offset_plus_tilt'; f.fits[1].label = 'offset plus a linear term in field angle';
  f.accept = 'offset_plus_tilt'; f.reject = 'constant_offset';
  f.hint = 'Each stick is one gauge, drawn where it stands on the reach.';
  return f;
};

function selftestCanonical(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });
  const has = (r, bit) => r.owes.some(o => o.includes(bit));

  let r = convertCanonical(C_WHOLE(), {});
  check('a whole canonical board owes nothing', r.owes.length === 0, r.owes.join(' | '));
  check('…and comes back in the importer\'s schema',
    r.key === 'residual' && r.value.fits.length === 2 && r.value.accept === 'offset_plus_tilt',
    JSON.stringify(r.value).slice(0, 140));

  // THE RENAME. `y` is the residual, so it is the panel's `value` as well as the
  // height the stick stands at.
  check('every point comes back with a numeric x, y and value',
    r.value.fits.every(f => f.residuals.length === 5
      && f.residuals.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)
        && Number.isFinite(p.value))), JSON.stringify(r.value.fits[0].residuals));
  check('…and `value` is the authored `y`, not a placed zero',
    r.value.fits[0].residuals.map(p => p.value).join(',') === '-0.12,-0.06,0,0.06,0.12',
    JSON.stringify(r.value.fits[0].residuals));
  check('…including the authored zero, which is a residual and not a missing one',
    r.value.fits[0].residuals[2]?.value === 0 && r.value.fits[0].residuals[2]?.y === 0,
    JSON.stringify(r.value.fits[0].residuals[2]));

  // An authored `value` is the author's, and wins over the height.
  const three = C_WHOLE();
  three.fits[0].residuals[0] = { x: 1, y: 2, value: -1.4 };
  r = convertCanonical(three, {});
  check('a board that authored all three keeps all three',
    r.value.fits[0].residuals[0]?.y === 2 && r.value.fits[0].residuals[0]?.value === -1.4,
    JSON.stringify(r.value.fits[0].residuals[0]));

  // REFUSE, DO NOT INVENT: a point with no `x` is not placed at one.
  const noX = C_WHOLE();
  noX.fits[1].residuals[0] = { y: 0.05 };
  r = convertCanonical(noX, {});
  check('a point with no `x` is owed and not placed',
    has(r, 'point(s) the panel cannot place') && r.value.fits[1].residuals.length === 4,
    r.owes.join(' | '));
  check('…and no coordinates are invented for it',
    r.value.fits[1].residuals.every(p => p.x !== undefined && p.y !== undefined));

  // EQUAL INPUTS SCORE EQUAL: the same board, fits reversed.
  const flipped = C_WHOLE();
  flipped.fits.reverse();
  const rf = convertCanonical(flipped, {});
  check('the same board with its fits reversed owes exactly the same — nothing',
    rf.owes.length === 0, rf.owes.join(' | '));
  flipped.accept = 'constant_offset'; flipped.reject = 'offset_plus_tilt';
  r = convertCanonical(flipped, {});
  check('…and the trap fires on the last-written fit just as on the first',
    has(r, 'is also the lowest-RMS one'), r.owes.join(' | '));

  // `structured: false` is a flag turned off, not a flag to carry.
  r = convertCanonical(C_WHOLE(), {});
  check('`structured: false` writes no `structured`',
    r.value.fits[1].structured === undefined && r.value.fits[0].structured === true);

  const bare = C_WHOLE();
  bare.fits[0].structured = false;
  r = convertCanonical(bare, {});
  check('a lowest-RMS fit not marked `structured` is owed',
    has(r, 'not marked `structured`'), r.owes.join(' | '));
  check('…and does not get one written for it',
    r.value.fits.every(f => f.structured === undefined));

  const noRms = C_WHOLE();
  delete noRms.fits[1].rms;
  r = convertCanonical(noRms, {});
  check('a fit with no `rms` is owed', has(r, 'no numeric `rms`'), r.owes.join(' | '));
  check('…and the lowest-RMS sentences stay quiet rather than name the wrong fit',
    !has(r, 'lowest-RMS') && r.value.fits[1].rms === undefined, r.owes.join(' | '));

  const noHint = C_WHOLE();
  delete noHint.hint;
  r = convertCanonical(noHint, {});
  check('a canonical board with no hint is owed one', has(r, 'no `hint`'), r.owes.join(' | '));
  check('…and the reference-star line is not copied in', r.value.hint === undefined);

  // THE TEMPLATE, named once rather than as three separate refusals.
  const shipped = convertCanonical(C_FIXTURE(), {});
  check('the shipping template is reported as the template',
    has(shipped, 'this is the handback template'), shipped.owes.join(' | '));
  check('…once, and not as one refusal per giveaway label',
    shipped.owes.filter(o => o.includes('the tab says which field')).length === 0
    && shipped.owes.filter(o => o.includes('handback template')).length === 1,
    shipped.owes.join(' | '));
  check('…and it still converts rather than being withheld',
    shipped.value.fits.length === 2 && shipped.value.fits[0].residuals.length === 5
    && shipped.value.accept === 'unpatterned_generalising');
  check('…and the only other thing it owes is the hint',
    shipped.owes.length === 2 && has(shipped, 'no `hint`'), shipped.owes.join(' | '));

  // A board that is NOT the template still gets the label check.
  const giveaway = C_WHOLE();
  giveaway.fits[0].label = 'the fit with the patterned residuals';
  r = convertCanonical(giveaway, {});
  check('a giveaway label on a board that is not the template is still reported',
    r.owes.filter(o => o.includes('the tab says which field')).length === 1, r.owes.join(' | '));

  const both = C_WHOLE();
  both.reject = both.accept;
  r = convertCanonical(both, {});
  check('a board that accepts and rejects the same fit is reported',
    has(r, 'both accepts and rejects'), r.owes.join(' | '));

  const one = convertCanonical({ fits: [C_WHOLE().fits[0]], accept: 'constant_offset', hint: 'x' }, {});
  check('a canonical board with one fit is owed a second',
    has(one, 'at least two'), one.owes.join(' | '));

  // ------------------------------------------------ the one-dimensional strip
  //
  // Whiteout's board, and the three cases that must fail if any of the three
  // readings below is put back. Its points are `{x, residual}` with no second
  // axis, its aggregate is `error`, and it says which fit is wrong rather than
  // which is right.
  const strip = {
    axis: { quantity: 'controller record index', unit: 'index' },
    hint: 'Each stick is one controller record, in index order.',
    fits: [
      { id: 'forward_remove', error: 0.707, structured: true,
        points: [0, 1, 0, 1, 0, 1, 0, 1].map((v, x) => ({ x, residual: v })) },
      { id: 'backward_remove', error: 0.711, structured: false,
        points: [0.6, -0.8, 0.5, -0.7, 0.9, -0.6, 0.8, -0.7].map((v, x) => ({ x, residual: v })) },
    ],
  };
  const w = convertCanonical(strip, {});
  check('a `{x, residual}` strip is carried rather than thrown away',
    w.value.fits[0].residuals.length === 8, `${w.value.fits[0].residuals.length} point(s) kept`);
  check('…on one row, because the board declares one axis',
    w.value.fits[0].residuals.every(p => p.y === 0));
  check('…with the residual as the value, not as a coordinate',
    w.value.fits[0].residuals[1].value === 1);
  check('`error` is read as the panel\'s `rms`', w.value.fits[0].rms === 0.707);
  check('the fit to accept is the one not marked `structured`',
    w.value.accept === 'backward_remove', String(w.value.accept));
  check('…and the board is not owed an `accept` it stated another way',
    !has(w, 'no `accept`'), w.owes.join(' | '));
  check('a board labelling its fits nowhere is still owed labels',
    has(w, 'id set in words'), w.owes.join(' | '));
  check('…and the tab is not left blank meanwhile',
    w.value.fits[0].label === 'Forward remove', String(w.value.fits[0].label));

  // Two unmarked fits is a board that has not decided, and nothing is picked.
  const undecided = structuredClone(strip);
  undecided.fits[0].structured = false;
  const u = convertCanonical(undecided, {});
  check('two unmarked fits leave `accept` unwritten', u.value.accept === undefined);
  check('…and owed', has(u, 'no `accept`'), u.owes.join(' | '));

  // A point with one number in it still cannot be placed.
  const halfPoint = structuredClone(strip);
  halfPoint.fits[0].points[3] = { residual: 1 };
  check('a point with no `x` is not placed at zero',
    has(convertCanonical(halfPoint, {}), 'cannot place'),
    convertCanonical(halfPoint, {}).owes.join(' | '));

  const failed = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ok  ' : 'FAIL  '}${c.name}${c.ok ? '' : `\n        ${c.detail}`}`);
  console.log(`\nRESIDUAL canonical converter: ${cases.length - failed.length}/${cases.length} cases pass`);
  if(failed.length) process.exitCode = 1;
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY && process.argv.includes('--selftest')){
  selftest(); console.log(); selftestPayload(); console.log(); selftestCanonical();
}
