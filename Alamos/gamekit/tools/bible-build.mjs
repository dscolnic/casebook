// bible-build.mjs — put a bible's §7 boards into the campaign's fragments.
//
//   node tools/bible-build.mjs <theme> [--dry] [--only FORMAT] [--report]
//   node tools/bible-build.mjs --all --dry
//
// WHAT §7 IS. `fpl_gpt/WHAT_TO_HAND_BACK.md` asked the eight bibles for the one
// thing that stopped 257 of their 480 stops being built: the numbers and lines a
// board is physically made of. All eight answered in place, under a heading in
// the stop itself — `**§7 build completion — DERIVE (two-option override):**` —
// with the completed board fenced below it. `tools/bibleRead.mjs` reads it as
// `stop.build`, separately from the partial board on the payload line, which it
// still reads as `stop.payload`.
//
// WHAT THIS DOES. The §7 board is the bible's schema, not the game's, and the
// difference is not always a rename: STRESS writes each candidate's scores
// inside the candidate and the importer keys them by candidate id in a map of
// their own. So there is a converter per format, each one small, each one
// refusing rather than guessing when the bible's board does not carry what the
// importer needs.
//
// WHAT THIS WILL NOT DO, and it is the whole reason the tool exists rather than
// a one-off script. It will not write a field the bible did not author. The
// obvious temptation is `survives` on a DERIVE distractor — one boolean, 250
// steps, and every one of them would go green. But `survives` is the assertion
// that a wrong line is wrong in a way a reader has to think about, and nobody
// has read these lines. Writing it here would turn a gate that is telling the
// truth into a gate that agrees with itself. So unauthored fields stay unwritten
// and are counted instead: `--report` prints what each format still owes.
//
// The fragments are edited line by line, not parsed and re-emitted. They carry
// the bible's own payload as a comment beside every stop — deliberately, so the
// conversion can be checked against what it came from — and a round trip through
// the parser would drop all of it.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readBible } from './bibleRead.mjs';
import { parseYaml } from './yaml-lite.mjs';
import { readPayload, readBoard } from './bibleConvert/_payload.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const report = args.includes('--report');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const all = args.includes('--all');
const themes = all ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--') && a !== only);
if(!themes.length){
  console.error('usage: node tools/bible-build.mjs <theme> [--dry] [--only FORMAT] [--report]');
  console.error('       node tools/bible-build.mjs --all --dry');
  process.exit(2);
}

// ---------------------------------------------------------------- converters

/**
 * What a converter returns.
 *
 * `key` is the top-level field the importer reads the board from — `derive`,
 * `estimate`, `stress` — and it is taken from the bible's own block rather than
 * from the format name, because BALLPARK's board is called `estimate` and a
 * table mapping one to the other is a second description of the same fact.
 *
 * `owes` is what the board does not carry and this tool will not invent. A stop
 * with anything in `owes` is still converted: the structure is real work and the
 * refusal it now gets names one missing field instead of four missing sections.
 *
 * A converter is called as `convert(board, stop)`. The second argument is the
 * bible's whole stop, and it is part of the contract rather than an accident:
 * a board cannot always tell on its own that it disagrees with the question
 * printed above it, and several formats need `answerText`, which the bibles
 * author on the stop rather than inside the board.
 */
const CONVERTERS = {};

// Loaded from `tools/bibleConvert/`, one file per format. They were inline
// here, and one file per format is what lets several be written at once without
// three people editing the same switch. Each module exports `FORMAT` and
// `convert`; `_shared.mjs` carries the contract and the helpers.
// A format may also know how to read the stop's OWN board rather than a §7 one
// — see `_payload.mjs`. Most formats now arrive that way, so a module exporting
// `convertPayload` is what turns those stops into panels.
const PAYLOAD_CONVERTERS = {};
// Formats that need a rename over the canonical block — see the note where
// `buildCanonical` is handled.
const CANONICAL_CONVERTERS = {};
for(const f of readdirSync(resolve(here, 'bibleConvert')).sort()){
  if(!f.endsWith('.mjs') || f.startsWith('_')) continue;
  let mod;
  try { mod = await import(pathToFileURL(resolve(here, 'bibleConvert', f)).href); }
  catch(err){
    // One unreadable module must not take the whole report down with it. It
    // happens whenever a converter is being edited while this runs.
    console.error(`tools/bibleConvert/${f} did not load — ${err.message}`);
    continue;
  }
  // EITHER HALF IS ENOUGH. A module used to be skipped outright unless it had a
  // §7 `convert`, so a format the bibles answer ONLY with a pointer at the
  // stop's own board — BELT, INJECT, DEGENERACY and VALUE have no §7 board
  // anywhere — was dropped along with its `convertPayload`, and nine stops sat
  // waiting on a converter that was sitting right there.
  const hasConvert = typeof mod.convert === 'function';
  const hasPayload = typeof mod.convertPayload === 'function';
  const hasCanon = typeof mod.convertCanonical === 'function';
  if(!mod.FORMAT || (!hasConvert && !hasPayload && !hasCanon)){
    console.error(`tools/bibleConvert/${f} exports no FORMAT, and no convert, convertPayload or convertCanonical — skipped`);
    continue;
  }
  if(hasConvert) CONVERTERS[mod.FORMAT] = mod.convert;
  if(hasPayload) PAYLOAD_CONVERTERS[mod.FORMAT] = mod.convertPayload;
  if(typeof mod.convertCanonical === 'function') CANONICAL_CONVERTERS[mod.FORMAT] = mod.convertCanonical;
}

// ---------------------------------------------------------------- the emitter
//
// A tiny one on purpose. `tools/yaml-emit.mjs` writes a whole document from the
// root; what is wanted here is one key indented into the middle of a list item,
// with the same flow-map style the fragments already use for short records so
// the diff beside them reads as one file rather than two.
const RISKY = /^[\s>|@`%*&!#{}\[\],'"?:-]|: |[:#]\s|\s$|^$|^(true|false|null|yes|no|on|off|~)$/i;
const NUMBERISH = /^[+-]?(\d[\d_]*(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
const sc = (v) => {
  if(v === null || v === undefined) return 'null';
  if(typeof v === 'boolean') return v ? 'true' : 'false';
  if(typeof v === 'number') return String(v);
  const s = String(v).replace(/\s*\n\s*/g, ' ');
  return (RISKY.test(s) || NUMBERISH.test(s)) ? JSON.stringify(s) : s;
};
function emit(value, indent){
  const pad = ' '.repeat(indent);
  const out = [];
  if(Array.isArray(value)){
    for(const item of value){
      if(item !== null && typeof item === 'object' && !Array.isArray(item)){
        const rows = emit(item, indent + 2);
        // An object with nothing in it emits no rows, and `rows[0].trim()` then
        // throws — which takes `--all` down for every format, not just the one
        // that produced it. The object branch below has handled this since it
        // was written; the array branch never did, and it is reachable the
        // moment a converter emits a list entry whose every field was
        // unauthored and therefore withheld. That is not a rare case here: it
        // is what the whole tool is built to do.
        if(!rows.length){ out.push(`${pad}- {}`); continue; }
        out.push(`${pad}- ${rows[0].trim()}`, ...rows.slice(1));
      } else out.push(`${pad}- ${sc(item)}`);
    }
    return out;
  }
  for(const [k, v] of Object.entries(value)){
    if(v === undefined) continue;
    if(Array.isArray(v) || (v !== null && typeof v === 'object')){
      const rows = emit(v, indent + 2);
      if(!rows.length){ out.push(`${pad}${k}: ${Array.isArray(v) ? '[]' : '{}'}`); continue; }
      out.push(`${pad}${k}:`, ...rows);
    // ONE FIELD WHERE A LINE BREAK IS CONTENT. `sc()` folds every newline to a
    // space, which is right for prose written across three lines of markdown
    // and wrong for a program: Whiteout's first stop shows three Java
    // statements and asks what the third one stores, and folded onto one line
    // they are a sentence with semicolons in it. Written as a block scalar,
    // which is how the bible wrote it.
    } else if(typeof v === 'string' && /\n/.test(v.trim())){
      out.push(`${pad}${k}: |`,
        ...v.replace(/\s+$/, '').split('\n').map(l => `${pad}  ${l}`));
    } else out.push(`${pad}${k}: ${sc(v)}`);
  }
  return out;
}

// --------------------------------------------------------------- the fragment
//
// A stop begins at the `# --- Stop N: Title` comment `tools/v10extract.mjs`
// wrote above it and runs to the next one. Matching on that rather than on
// position is what lets a fragment be reordered or a stop be split without this
// tool silently writing one stop's board onto another.
const STOP = /^\s*#\s*---\s*Stop\s+(\d+):/;

/** Every line index that starts a stop, and where each one ends. */
function stopsIn(lines){
  const heads = lines.map((l, i) => [l, i]).filter(([l]) => STOP.test(l)).map(([l, i]) => [+l.match(STOP)[1], i]);
  return heads.map(([n, i], k) => ({ n, from: i, to: k + 1 < heads.length ? heads[k + 1][1] : lines.length }));
}

/**
 * Where a key's block ends, given the line it starts on.
 *
 * Its own line plus every line indented deeper than it. A comment line at the
 * same indent belongs to whatever comes next, which is why a run of them at the
 * end is walked back off.
 */
function blockEnd(lines, at, indent){
  let j = at + 1;
  // A BLOCK SEQUENCE AT THE KEY'S OWN INDENT IS STILL THE KEY'S BLOCK. YAML
  // allows `choices:` and its `- item` lines to share an indent, and
  // `tools/v10extract.mjs` writes them that way — so a rule that ends the block
  // at the first line not deeper than the key ended it before the list started.
  // The key was then replaced and its old items left behind it: a stop with its
  // options twice and its answer orphaned between them.
  const deeper = (l) => l.length - l.trimStart().length > indent;
  const sameLevelItem = (l) => l.length - l.trimStart().length === indent && /^\s*-\s/.test(l);
  while(j < lines.length && (!lines[j].trim() || deeper(lines[j]) || sameLevelItem(lines[j]))) j++;
  while(j > at + 1 && !lines[j - 1].trim()) j--;
  return j;
}

let totalStops = 0, converted = 0, skipped = 0, noBoard = 0;
// Stops whose bible points at their own authored board rather than carrying a
// §7 one: counted apart, because 'no converter for this format' and 'the
// payload could not be read' are different jobs for different people.
let authoredNoConverter = 0, authoredUnreadable = 0;
// Stops whose format the bible has changed since the fragment was written.
let retyped = 0;
const owedBy = new Map();     // format -> [{theme, stop, owes}]

for(const theme of themes){
  const biblePath = BIBLES[theme];
  if(!biblePath){ console.error(`${theme}: not in books/parts/bibles.json`); process.exitCode = 2; continue; }
  const bible = readBible(resolve(gamekit, biblePath));
  const dir = resolve(gamekit, 'books/parts', theme);
  if(!existsSync(dir)){ console.error(`${theme}: no fragments at books/parts/${theme}`); process.exitCode = 2; continue; }

  let wrote = 0, themeOwes = 0;
  const parts = readdirSync(dir).filter(f => /^m\d+\.ya?ml$/i.test(f))
    .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));
  for(const part of parts){
    const mission = +part.match(/\d+/)[0];
    const bm = bible.missions.find(m => m.n === mission);
    if(!bm){ console.error(`${theme}: ${part} has no mission ${mission} in the bible`); continue; }
    const file = resolve(dir, part);
    const lines = readFileSync(file, 'utf8').split('\n');
    // Back to front, so an edit never moves a stop this loop has not reached.
    const stops = stopsIn(lines).reverse();
    for(const st of stops){
      totalStops++;
      const bs = bm.stops.find(s => s.n === st.n);
      /**
       * NO §7 SECTION AT ALL IS NOT NO BOARD.
       *
       * The eight bibles answered handback after handback by adding §7 blocks
       * beside their original payload line, so "the board" and "the payload" are
       * two things in them. Whiteout was written after all of that and simply
       * puts the board where it belongs: one `**Format-specific interaction
       * block:**` per stop, in the game's own field names, and no §7 anywhere.
       *
       * Read as though §7 were mandatory that is sixty stops with no board. The
       * stop's own payload IS the board when there is no other, and it goes down
       * the same path a §7 pointer goes down — which exists precisely because a
       * pointer means "build this from the stop's own interaction block".
       */
      const authoredOnly = !!bs && !bs.build && !!bs.payload;
      if(!bs || (!bs.build && !authoredOnly)){ noBoard++; continue; }
      const fmt = bs.buildFormat ?? bs.format;
      if(only && fmt !== only){ skipped++; continue; }
      const convert = CONVERTERS[fmt];

      let parsedTop = {};
      if(bs.build){
        try { parsedTop = parseYaml(bs.build); }
        catch(e){ console.error(`${theme} M${mission} S${st.n}: §7 board does not parse — ${e.message}`); continue; }
      }
      const inner = parsedTop[Object.keys(parsedTop)[0] ?? ''] ?? {};

      // TWO KINDS OF BLOCK, and telling them apart is the whole of the second
      // pass. A `build completion` block IS the board. An `authored-board
      // source` block is a POINTER: it says build this stop from its own
      // authored interaction block and do not substitute a format-level
      // template. What it points at is the payload line, which has been
      // campaign-specific all along — so the board is read from there by
      // `_payload.mjs` and handed to the format's `convertPayload`.
      //
      // Handing a pointer to the §7 converter instead would not fail loudly: it
      // would convert a wrapper whose fields are `stop`, `source` and
      // `panel_rule`, owe everything, and write a board made of nothing.
      const pointer = inner && typeof inner === 'object'
        && inner.payload !== undefined
        && String(inner.source ?? '').toLowerCase().includes('interaction block');

      /**
       * AND IT IS ALREADY THE GAME'S SCHEMA. Whiteout's blocks are written in the
       * importer's own field names — `predictionRange`, `truth`, `measurement`,
       * `choices` with `answer` — which is what `buildCanonical` means for the
       * other bibles' latest rounds. So an authored-only board is carried through
       * the canonical path rather than handed to a payload converter written for
       * the bible dialects, and the nine formats that have no `convertPayload`
       * (VERIFY, DERIVE, CHOICE, SEQUENCE, CASEBOOK…) work without one.
       */
      let authored = null;
      if(authoredOnly){
        try { authored = parseYaml(bs.payload); }
        catch(e){ console.error(`${theme} M${mission} S${st.n}: its interaction block does not parse — ${e.message}`); continue; }
        if(!authored || typeof authored !== 'object'){ authoredUnreadable++; continue; }
      }

      let key, value, owes, extra;
      // ALREADY THE IMPORTER'S SCHEMA. The third round of handback answered in
      // the game's own field names rather than the bible's, so there is nothing
      // to convert: converting it would mean a converter written for the bible's
      // shapes reinterpreting a board that is already correct. It is carried
      // through, and `bookParity` — which reads the finished book — is what
      // judges it, exactly as it judges a hand-written one.
      if(authoredOnly){
        /**
         * A BOARD IS WRAPPED OR IT IS NOT.
         *
         * `verify:` and `derive:` name themselves and the board is inside. A
         * CHOICE writes its fields at the top — `question`, `code`, `choices`,
         * `answer`, `why`, `rebuttals` — because those belong on the stop rather
         * than in a panel block of its own. Taking the first key either way keyed
         * a CHOICE board to the string of its question and wrote `choices: []`
         * onto the stop, which is a stop with no options and no key.
         */
        const keys = Object.keys(authored);
        const isMap = (v) => v && typeof v === 'object' && !Array.isArray(v);
        // A LIST OF SENTENCES IS AS MUCH THE STOP'S AS A SENTENCE IS. Boomtown
        // writes `wrongFeedback` as an array beside its `estimate` board, and a
        // rule that only stepped over scalars called that board unwrapped and
        // handed the converter the outer object — fifteen complete BALLPARK
        // boards through as `estimate: {}`. What decides the board is that
        // exactly one key is a MAP; everything else beside it belongs to the
        // stop, whatever its shape.
        const isScalar = (v) => v === null || Array.isArray(v)
          || ['string', 'number', 'boolean'].includes(typeof v);
        /**
         * A WRAPPED BOARD MAY HAVE A FIELD BESIDE IT, and Overwind writes five
         * that way:
         *
         *   estimate:
         *     labels: […]
         *     target: 2
         *   answerText: "R = 6/3 = 2 m; the rope-contact radius is not the drum diameter."
         *
         * Two top-level keys, so the one-key test said unwrapped and handed the
         * converter the OUTER object — which has no `target`, no `tiles` and no
         * `formula`, because they are one level down. Five complete BALLPARK
         * boards came through as `estimate: {}` and the import refused them for
         * carrying no arithmetic. The board is the map; anything scalar beside
         * it belongs to the stop, which is where `answerText` goes anyway.
         */
        const maps = keys.filter(k => isMap(authored[k]));
        const wrapped = maps.length === 1 && keys.every(k => k === maps[0] || isScalar(authored[k]));
        key = wrapped ? maps[0] : String(fmt).toLowerCase();
        const body = wrapped ? authored[maps[0]] : authored;
        const beside = wrapped
          ? Object.fromEntries(keys.filter(k => k !== maps[0]).map(k => [k, authored[k]]))
          : {};
        const canon = CANONICAL_CONVERTERS[fmt];
        if(canon){ ({ key, value, owes, extra } = canon(body, bs)); }
        else if(wrapped){ value = body; owes = []; }
        // Unwrapped: the fields are the stop's own, so they are spread onto it
        // rather than nested under a panel key nothing reads.
        // ONLY WHAT THE STOP DOES NOT ALREADY HAVE. `v10extract` writes an
        // unwrapped board's own fields — `choices`, `answer`, `why` — onto the
        // stop already, from the same bible. Writing them again replaced the key
        // and left the old list below it, so the stop came out with its options
        // twice and its answer orphaned. What is genuinely new here is the rest:
        // `code`, `rebuttals`, and whatever a format adds.
        else {
          key = null; value = null; owes = [];
          const already = new Set(lines.slice(st.from, st.to)
            .map(l => (l.match(/^\s{4}([a-zA-Z_]+):/) ?? [])[1]).filter(Boolean));
          extra = Object.fromEntries(Object.entries(body).filter(([k]) => !already.has(k)));
        }
        // The scalars written beside a wrapped board are the stop's, and
        // `answerText` is the one every instrument stop needs. A converter that
        // wrote its own wins; this only fills what nothing else set.
        for(const [k, v] of Object.entries(beside)){
          if((extra ?? {})[k] === undefined) extra = { ...(extra ?? {}), [k]: v };
        }

      } else if(bs.buildCanonical){
        key = Object.keys(parsedTop)[0];
        // A FORMAT MAY STILL NEED A RENAME. The canonical blocks are written in
        // the game's schema and are a large step closer than anything before —
        // but "canonical" is the author's word, and several formats sit one
        // field name away: a STRESS criterion is keyed `id` where the panel
        // reads `key`, and a candidate says `validRange`/`failsAt` where the
        // panel reads `feasible`. Refused for that, the panel reports that
        // nothing fails anywhere, about a board that states exactly where each
        // candidate breaks. So a format may export `convertCanonical` to bridge
        // the last rename; without one the board is carried through unchanged,
        // which is what every format did before and is still right for most.
        const canon = CANONICAL_CONVERTERS[fmt];
        if(canon){ ({ key, value, owes, extra } = canon(inner, bs)); }
        else { value = inner; owes = []; }

      } else if(pointer){
        const payloadConvert = PAYLOAD_CONVERTERS[fmt];
        if(!payloadConvert){ authoredNoConverter++; continue; }
        // THE STOP'S OWN PAYLOAD LINE FIRST, not the §7 fence's copy of it. The
        // quoted copy has been flattened onto one line and loses structure the
        // original still has; `readBoard` prefers whichever copy keeps its
        // newlines and parses as real YAML, and falls back to the hand-written
        // grammar for the few that are genuinely one line.
        const read = readBoard(bs.payload || inner.payload, String(fmt).toLowerCase(), parseYaml)
          ?? readBoard(inner.payload, String(fmt).toLowerCase(), parseYaml);
        if(!read){ authoredUnreadable++; continue; }
        ({ key, value, owes, extra } = payloadConvert(read.board,
          { ...bs, question: inner.question ?? bs.question, payloadKey: read.key }));
      } else {
        if(!convert){ skipped++; continue; }
        ({ key, value, owes, extra } = convert(inner, bs));
      }
      if(owes.length){
        themeOwes++;
        if(!owedBy.has(fmt)) owedBy.set(fmt, []);
        owedBy.get(fmt).push({ theme, stop: `M${mission} S${st.n} ${bs.title}`, owes });
      }

      const body = lines.slice(st.from, st.to);
      // The stop's own keys sit at the indent of the list item's first key,
      // which is two past the `- `. Read it rather than assume it: three of the
      // eight campaigns' fragments were written at a different indent.
      const dashAt = body.findIndex(l => /^\s*-\s+\S/.test(l));
      if(dashAt < 0){ console.error(`${theme} M${mission} S${st.n}: no list item under the stop marker`); continue; }
      const indent = body[dashAt].indexOf('-') + 2;

      /**
       * Write one top-level key of the stop, replacing any block already there.
       *
       * A BOARD IS NOT ALWAYS ONE KEY. DIAGNOSIS's board is `readings` plus
       * `choices` plus `correctChoice`; every instrument stop needs
       * `answerText`, which the bibles author on the stop rather than inside the
       * board. A converter returning a single key had to OWE those instead of
       * writing them — four formats reported it independently — so a converter
       * may now return `extra`, and each of its entries is placed the same way
       * the board is.
       */
      const put = (name, val) => {
        const rows = emit({ [name]: val }, indent);
        const at = body.findIndex(l => l.startsWith(`${' '.repeat(indent)}${name}:`));
        if(at >= 0) body.splice(at, blockEnd(body, at, indent) - at, ...rows);
        else {
          let end = body.length;
          while(end > 0 && !body[end - 1].trim()) end--;
          body.splice(end, 0, ...rows);
        }
      };
      // `key: null` means the board had no wrapper and its fields go on the stop
      // itself — see the unwrapped case above. `extra` carries them.
      if(key) put(key, value);
      // A CANONICAL CONVERTER MAY MOVE THE BOARD. When it emits under a
      // different key from the block's own — `allocate_patch` is a patch, not a
      // board, and CHOICE writes stop keys rather than one board — the block's
      // own key would otherwise be left behind, inert but wrong, and read as a
      // board by whoever opened the file next.
      {
        // THE STOP'S FORMAT IS THE BIBLE'S TO SET, and it was never carried.
        // Round three retyped stops — HOLDOUT to HOLD, BALANCE to BALLPARK — and
        // wrote the new board beside the old one, while the fragment kept saying
        // `format: HOLDOUT`. The book then declared one format and carried two
        // boards, one of them an empty stub, and no converter could reach it:
        // `extra` can place a key, but deciding a stop's format is not a
        // converter's call.
        // THE STOP'S OWN FORMAT LINE COUNTS TOO. `buildFormat` is read off a
        // labelled §7 block (`… canonical interaction block — TRACE:`), and a
        // bible writing `**Format-specific interaction block:**` names no format
        // there — so a stop retyped between revisions kept the old `format:` and
        // the old board beside its new one. Whiteout's Stop 53 went HOLDOUT to
        // VERIFY, arrived with both boards, and was refused for the holdout it
        // no longer is. The same fallback the converter choice already makes.
        const declared = String(bs.buildFormat ?? bs.format ?? '').trim();
        const fmtAt = body.findIndex(l => new RegExp(`^${' '.repeat(indent)}format:`).test(l));
        const currently = fmtAt >= 0 ? (body[fmtAt].split(':')[1] ?? '').trim().replace(/['"]/g, '') : '';
        if(declared && currently && declared !== currently){
          body[fmtAt] = `${' '.repeat(indent)}format: ${declared}`;
          // And the board the old format left behind. A stop carrying a stub of
          // a format it no longer is reads as a half-built panel for ever.
          // BALLPARK's board is `estimate`; every other format's is its own name
          // in lower case — see the key map in `import-book.mjs`.
          const oldKey = currently.toUpperCase() === 'BALLPARK' ? 'estimate' : currently.toLowerCase();
          const at = body.findIndex(l => l.startsWith(`${' '.repeat(indent)}${oldKey}:`));
          if(at >= 0 && oldKey !== key) body.splice(at, blockEnd(body, at, indent) - at);
          retyped++;
        }
        if(bs.buildCanonical){
          const blockKey = Object.keys(parsedTop)[0];
          if(blockKey && blockKey !== key
            && !Object.prototype.hasOwnProperty.call(extra ?? {}, blockKey)){
            const at = body.findIndex(l => l.startsWith(`${' '.repeat(indent)}${blockKey}:`));
            if(at >= 0) body.splice(at, blockEnd(body, at, indent) - at);
          }
        }
      }
      for(const [name, val] of Object.entries(extra ?? {})){
        if(val === undefined || val === null) continue;
        put(name, val);
      }
      lines.splice(st.from, st.to - st.from, ...body);
      wrote++; converted++;
    }
    if(!dry) writeFileSync(file, lines.join('\n'));
  }
  console.log(`${theme.padEnd(22)} ${String(wrote).padStart(3)} board(s) written`
    + `  ${themeOwes ? `${themeOwes} still owing a field` : 'nothing owing'}`);
}

console.log(`\n${converted} of ${totalStops} stop(s) converted`
  + ` · ${noBoard} with no §7 board · ${skipped} whose format has no converter yet`
  + (retyped ? ` · ${retyped} retyped to the format their bible now declares` : '')
  + (authoredNoConverter || authoredUnreadable
    ? ` · ${authoredNoConverter} pointing at their own board with no payload converter yet`
      + ` · ${authoredUnreadable} whose payload cannot be read`
    : '')
  + (dry ? '  (dry run — nothing written)' : ''));

if(report){
  console.log('\nWhat the converted boards still owe — a field the bible did not author,'
    + ' which this tool will not write for it:\n');
  for(const [fmt, rows] of [...owedBy].sort((a, b) => b[1].length - a[1].length)){
    const kinds = new Map();
    for(const r of rows) for(const o of r.owes){
      const k = o.replace(/step \d+/, 'a step');
      kinds.set(k, (kinds.get(k) ?? 0) + 1);
    }
    console.log(`${fmt} — ${rows.length} stop(s)`);
    for(const [k, c] of [...kinds].sort((a, b) => b[1] - a[1])) console.log(`   ${String(c).padStart(4)}  ${k}`);
  }
}
