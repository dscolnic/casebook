// bibleRead.mjs — one reader for a v10.2 campaign bible, shared.
//
// `tools/v10extract.mjs` lifts a mission's copy out of a bible and
// `tools/bible-lint.mjs` measures the same bible against the rules in
// BIBLE_REQUIREMENTS.md. Both need to know the document's shape, and CLAUDE.md
// names what happens when two things carry their own copy of one rule: they
// drift the first time either is corrected. So the shape is described once, here,
// and neither of them parses anything itself.
//
// WHAT "v10.2 SHAPE" MEANS, in the eight things this file keys off:
//
//   `# Mission N - Title`                     a mission
//   `**Header:** / **Card title:** / …`       the briefing card
//   `#### Glossary terms`                     one blank-line-separated `Term: definition` per entry
//   `#### Primer concepts`                    `- ` bullets
//   `#### Equations first needed today`       repeated Equation / What it is for / Symbols / Why
//   `**Beat N - name \| where \| trigger**`   a beat, with World state, Panel/HUD text, bubbles, Unlocks
//   `## Stop N - Title`                       a stop, with the §1 field table
//   `## Mission outcome` / `## Quick concept review`
//
// A bible written to a different shape is a different parser, and that is the
// single most expensive thing a bible can be — see BIBLE_REQUIREMENTS.md.
import { readFileSync } from 'node:fs';
import { parseYaml } from './yaml-lite.mjs';

/**
 * A bold-label field, in any of the three house styles these bibles come in.
 *
 * THE EIGHT BIBLES ARE NOT ONE SHAPE, and that is the single most expensive
 * thing about them. Mars writes `**Question card story setup - exact player
 * copy:**` on its own line; Safety Factor writes `**Story setup:**`; Changeover
 * writes `**Setup:**` and puts four labels on one line. Ground Truth heads its
 * stops with an em dash. All of them mean the same fields.
 *
 * So a label is matched anywhere on a line rather than only at its start, and a
 * value ends at the NEXT label — on the same line or a later one. A reader that
 * only knew Mars reported sixty stops with no setup, no prompt and no verdict in
 * three of these bibles, which is a bible that does not exist.
 */
/**
 * A LABEL MAY CARRY A NOTE, and it is still that label.
 *
 * `**Question card story setup — exact player copy (38 words; 2 sentences):**` is
 * the same field as `**Question card story setup - exact player copy:**`; so is
 * `**Card body (65 words; 4 sentences):**`. What ends a label is the `:**`, not
 * the first thing after the words. Matched exactly, a bible that annotates its own
 * labels reads as a bible with no fields at all.
 */
const LABEL_TAIL = '(?:[^*]*?)?';

/**
 * A DASH IS A DASH. The callers ask for `Question card story setup - exact player
 * copy`, and Whiteout writes it with an em dash — the same label, typeset. Every
 * hyphen in a label therefore matches any of the three, which is the same rule
 * `stopsIn` already applies to its headings.
 */
const labelPattern = (label) => String(label).replace(/[-–—]/g, '[-–—]');

function field(label, from){
  const pat = labelPattern(label);
  const re = new RegExp(`\\*\\*${pat}${LABEL_TAIL}:?\\*\\*\\s*(.*)$`);
  for(let i = 0; i < from.length; i++){
    if(!new RegExp(`\\*\\*${pat}${LABEL_TAIL}:?\\*\\*`).test(from[i])) continue;
    const m = from[i].match(re);
    if(!m) continue;
    const out = [m[1]];
    for(let j = i + 1; j < from.length; j++){
      const l = from[j];
      // A LABEL ends the field; bold text inside it does not. `**(correct)**`
      // starts a wrapped line as often as it ends one, and breaking on any `**`
      // truncated an option list to its first option.
      if(/^\*\*[A-Z][^*]{0,60}:?\*\*/.test(l) || /^#{1,6} /.test(l) || /^```/.test(l) || l.trim() === '') break;
      out.push(l);
    }
    // A CONTINUATION LINE CAN CARRY THE NEXT LABEL. The bible hard-wraps, so
    // mission 1's beat 4 reads "…METHANE TARGET: NOT / MET. **Dialogue bubbles
    // -** Abiola: …" — the loop above stops only on a line that BEGINS with a
    // label, and this one does not. Left alone, the panel line came back with
    // the whole of the beat's dialogue stuck to the end of it, which is a HUD
    // row nobody could read and a bubble said twice.
    const joined = clean(out.join(' '));
    // A LABEL, not any bold. Cutting at the first ` **` also cut at
    // `**(correct)**`, which is inside an option list rather than after it — so
    // eight CHOICE stops came back with one option and no key. A label is
    // `**Something:**`, and only that ends the field.
    const cut = joined.search(/\s\*\*[A-Z][^*]{0,60}:?\*\*/);
    return cut < 0 ? joined : clean(joined.slice(0, cut));
  }
  return null;
}

/**
 * The same field under any of its names, first one that answers.
 *
 * Written as a list rather than a rename so the bibles stay as their authors
 * wrote them: the implementation is not allowed to edit the source, and eight
 * campaigns arriving in three dialects is a fact to read, not a fact to fix.
 */
function anyField(labels, from){
  for(const l of labels){
    const v = field(l, from);
    if(v) return v;
  }
  return null;
}

/** Two strings the same, once typography and spacing are out of the way. */
const flatEq = (a, b) => clean(a).toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
  === clean(b).toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

/** Markdown's escapes and hard wrapping, out. The text a player would read. */
export function clean(s){
  return String(s ?? '')
    .replace(/\\\|/g, '|').replace(/\\\*/g, '*').replace(/\\_/g, '_')
    // CURLY QUOTES ARE QUOTES. Half these bibles typeset their dialogue with
    // “ ”, and a bubble reader that only knew " found no speaker in a hundred
    // and fifty beats across two campaigns — reported as "nobody speaks", which
    // reads as a bible that forgot to write any dialogue at all. It had written
    // all of it.
    .replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'")
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The same field, when the bible writes it INLINE inside a paragraph.
 *
 * Most beats put `**Panel/HUD text:**` at the start of a line and `field` finds
 * it. Mission 1's do not — the world change, the panel line and the bubbles run
 * together in one paragraph — so a line-anchored reader returned no panel for a
 * beat that has one, and the board it drives would have been built empty.
 */
function inlineField(label, from){
  const all = clean(from.join(' '));
  const marks = [`**${label}:**`, `**${label}**`];
  for(const mark of marks){
    const at = all.indexOf(mark);
    if(at < 0) continue;
    const rest = all.slice(at + mark.length);
    // Up to the next bold label, which is where the sentence this one owns ends.
    // A lookahead did not do it reliably and the panel line came back carrying
    // the whole of the beat's dialogue behind it.
    const stop = rest.indexOf('**');
    return clean(stop < 0 ? rest : rest.slice(0, stop));
  }
  return null;
}

/** The lines of a `##`/`###`/`####` section, by heading pattern. */
function section(from, re, depth = 4){
  const a = from.findIndex(l => re.test(l));
  if(a < 0) return [];
  const stop = new RegExp(`^#{1,${depth}} `);
  const b = from.findIndex((l, i) => i > a && stop.test(l));
  return from.slice(a + 1, b < 0 ? from.length : b);
}

/** Blank-line-separated paragraphs, each joined to one line. */
function paragraphs(from){
  const out = [];
  let cur = [];
  for(const l of from){
    if(!l.trim()){ if(cur.length){ out.push(clean(cur.join(' '))); cur = []; } continue; }
    if(/^#{1,6} |^```/.test(l)) break;
    cur.push(l);
  }
  if(cur.length) out.push(clean(cur.join(' ')));
  return out.filter(Boolean);
}

/** `- ` bullets, with their wrapped continuations folded in. */
function bullets(from){
  const out = [];
  for(const l of from){
    if(/^\s*[-*] /.test(l)) out.push(l.replace(/^\s*[-*] /, '').trim());
    else if(out.length && l.trim() && !/^#{1,6} |^\*\*|^```/.test(l)) out[out.length - 1] += ' ' + l.trim();
    else if(/^#{1,6} /.test(l)) break;
  }
  return out.map(clean).filter(Boolean);
}

/**
 * A board written out after the payload label, in whatever notation.
 *
 * NOT A NOTATION TEST. The first version wanted a backticked run of twenty
 * characters or a brace, which is what a board looks like when it is written as
 * pseudo-YAML — and Ground Truth writes half of its DERIVE boards as prose with
 * short inline spans instead: ``lines `ΔV=-∫0^h E_y dy`(definition),
 * `=-E_yh`(constant integral)…``. Sixteen characters, no brace, and sixteen
 * stops came back as having no board at all when every one of them has one.
 *
 * The question this is asked is "did the author write the board out", not "did
 * they write it in the shape I expected". So: any content of substance after the
 * label counts. A label with nothing behind it still does not.
 */
function backticked(v){
  if(!v) return null;
  const text = String(v).trim();
  if(text.length < 24) return null;
  const runs = [...text.matchAll(/`([^`]{8,})`/g)].map(m => m[1]);
  if(runs.length) return text;
  return /[{[=:]/.test(text) || text.split(/\s+/).length >= 8 ? text : null;
}

/**
 * The first fenced block in a slice, verbatim (indentation kept).
 *
 * BACKTICKS OR TILDES. Markdown fences with either, and Eleven Days writes every
 * one of its boards as `~~~yaml`. A backtick-only reader reported sixteen of its
 * operated stops as having no board while the board sat three lines below the
 * label — the same false failure this file has now produced four different ways,
 * and each one looked like a bible that had ignored the brief.
 */
function fence(from){
  // A FENCE CAN OPEN AT THE END OF THE LABEL'S OWN LINE. Carrying Capacity writes
  // ``**Complete format-specific interaction block:** ```yaml`` and then the board
  // below it. A reader that only opened on a line STARTING with a fence marker
  // skipped that opener, found the CLOSING marker instead, and read the board as
  // everything after it — so a PROBE with five stations was reported as having
  // none. The opener is the first line carrying a marker; the closer is the next
  // line that is nothing but one.
  const MARK = /(```|~~~)/;
  const a = from.findIndex(l => MARK.test(l));
  if(a < 0) return null;
  const mark = from[a].match(MARK)[1];
  const b = from.findIndex((l, i) => i > a && l.trim().startsWith(mark));
  if(b < 0) return null;
  // Anything the opener carried after its own marker belongs to the block.
  const first = from[a].slice(from[a].indexOf(mark) + mark.length).replace(/^\w+\s*/, '').trim();
  const rest = from.slice(a + 1, b);
  return [first, ...rest].filter(x => x !== '').join('\n') || null;
}

/**
 * Where a stop's §7 build-completion block starts, or -1.
 *
 * THE BIBLES ANSWERED §7 IN PLACE. The addendum asked for the missing board
 * fields, and all eight wrote them into the stop itself, under a labelled
 * heading — `**§7 build completion — DERIVE (two-option override):**` — with the
 * board fenced below it. So a stop can now carry TWO boards: the original
 * partial one on the payload line, and the completed one under this label.
 *
 * AND THERE IS NOW A SECOND HEADING. Asked a second time, the bibles replaced
 * most of those completed boards — which had been one template per format — with
 * `**§7 authored-board source — STRESS:**`, a POINTER saying to build the stop
 * from its own authored interaction block instead. Both headings are read here,
 * because both mark the same thing: the block this stop's board comes from. What
 * differs is whether the fenced block IS a board or names where the board is,
 * and `bible-build.mjs` tells them apart by the `source` field inside it.
 *
 * They are not interchangeable and the later one is not simply better: the
 * original is what the earlier fragments were mapped against, and the §7 block
 * is what the importer can actually build. Both are read, separately, so the
 * conversion can prefer the completed board and `bibleParity` can still hold the
 * prose to the bible it was lifted from.
 */
function buildAt(chunk){
  // IN PRIORITY ORDER, NEWEST FIRST. A stop may now carry three of these, one
  // per round of handback, and they are not equivalent: the canonical block is
  // the board written in the IMPORTER's own schema, §7's completion block is the
  // board in the bible's schema, and the authored-board source is a pointer at
  // the stop's payload line. Reading whichever appears first in the file would
  // pick by layout rather than by authority.
  //
  // AND THE ROUND NUMBER IS READ, NOT SPELLED. This matched "Handback 3"
  // literally, so the six blocks the fourth round wrote were invisible: the
  // reader fell through to §7 and rebuilt a board the bible had already
  // replaced. There will be a fifth round. The highest round present wins, and
  // a tie inside one round keeps the first, which is the file's own order.
  const at = (re) => chunk.findIndex(l => re.test(l));
  let canonical = -1, round = -1;
  for(let i = 0; i < chunk.length; i++){
    const m = /\*\*\s*Handback (\d+) canonical interaction block/.exec(chunk[i] ?? '');
    if(m && +m[1] > round){ round = +m[1]; canonical = i; }
  }
  if(canonical >= 0) return canonical;
  return at(/\*\*\s*§7 (build completion|authored-board source)/);
}

/** True when the block found above is already in the importer's own schema. */
function buildIsCanonical(chunk, at){
  return at >= 0 && /Handback \d+ canonical interaction block/.test(chunk[at] ?? '');
}

/**
 * Who says what, out of a beat's prose.
 *
 * The bible writes bubbles inline, after a `Dialogue bubbles -` marker, as
 * `Name: "line"` — and sometimes `Name, over radio: "line"`, which is the only
 * thing that distinguishes a radio call from somebody in the room. Both forms
 * are read here so the book does not have to be told twice.
 */
function bubblesIn(text){
  const at = text.indexOf('Dialogue bubbles');
  if(at < 0) return [];
  // PAST the marker, not from it. `**Dialogue bubbles -** Abiola: "…"` otherwise
  // matches the marker itself as the speaker, and every mission-1 beat came back
  // spoken by somebody called "Dialogue bubbles - Abiola".
  const tail = text.slice(at).replace(/^Dialogue bubbles\s*[-–:]*\s*/, '');
  const out = [];
  // A NAME IS ANY LETTER, not the Latin-1 block. `À-ÿ` stops at ÿ, so Luka
  // Kovač, Tomáš and anybody else spelled with Latin Extended fell out of the
  // match and fifteen beats came back with nobody speaking in them. Unicode
  // property escapes, which is what this always should have been.
  const re = /(\p{Lu}[\p{L}'.\- ]{1,40}?)(,\s*(?:over|on)\s+[a-z ]+)?:\s*["\u201c]([^"\u201d]+)["\u201d]/gu;
  let m;
  while((m = re.exec(tail))){
    const who = clean(m[1]).replace(/^(?:and|then|-)\s+/i, '').trim();
    // A LABEL IS NOT A SPEAKER. `**Panel/HUD text:** "NEXT DESTINATION …"` has a
    // capitalised word before a colon and a quoted string after it, which is the
    // shape this looks for — so 27 beats came back spoken by somebody called
    // "text". Anything that is part of the beat's own scaffolding is not a name.
    if(!who || /^(dialogue bubbles|panel|hud|text|world state|unlocks|player control|state|waypoint|presentation)$/i.test(who)
      || /\b(panel|hud|text|state|unlocks|waypoint)$/i.test(who)) continue;
    out.push({ who, radio: !!m[2], say: clean(m[3]) });
  }
  return out;
}

/** One mission's beats. */
function beatsIn(body){
  const heads = body.map((l, i) => [l, i]).filter(([l]) => /^\*\*Beat \d+\s*-/.test(l));
  return heads.map(([head, i], k) => {
    /**
     * A BEAT ENDS AT THE NEXT BEAT — OR AT THE NEXT HEADING.
     *
     * The last beat used to run to the end of the mission, which is everything
     * after the beat script: the location plan, the characters, and the story
     * block's own prose `**Beat script:**` summary. That summary quotes lines
     * too, so `bubblesIn` swept them up and mission 1's final beat came back
     * with three speeches instead of one — the player answers the last question
     * and Eli Voss says four things at once, two of them belonging to earlier
     * moments in the day.
     */
    const after = body.slice(i + 1).findIndex(l => /^#{1,4}\s/.test(l));
    const ends = after < 0 ? body.length : i + 1 + after;
    const next = Math.min(k + 1 < heads.length ? heads[k + 1][1] : body.length, ends);
    const chunk = body.slice(i, next);
    // The heading itself carries the name, the place and the trigger, pipe-separated.
    const parts = clean(head.replace(/^\*\*/, '').replace(/\*\*$/, '')).split('|').map(s => s.trim());
    const world = field('World state', chunk)
      // Mission 1 writes one of them without the bold label.
      ?? (chunk.find(l => /^World state:/.test(l)) ? clean(chunk.filter(l => /^World state:/.test(l))[0].replace(/^World state:\s*/, '')) : null);
    const all = clean(chunk.join(' '));
    return {
      n: +head.match(/Beat (\d+)/)[1],
      name: (parts[0] ?? '').replace(/^Beat \d+\s*-\s*/, '').trim(),
      where: parts[1] ?? '',
      trigger: parts[2] ?? '',
      world: world ? world.split('Dialogue bubbles')[0].split('Panel/HUD text')[0].trim() : null,
      panel: field('Panel/HUD text', chunk) ?? inlineField('Panel/HUD text', chunk),
      bubbles: bubblesIn(all),
      unlocks: field('Unlocks', chunk),
    };
  });
}

/**
 * THE OPTIONAL REVIEW, offered when a mission is finished.
 *
 * Every bible now writes one per mission under "Optional secondary brief and
 * six-question review": a card of copy, a handful of ideas deliberately kept
 * OFF the required day card, and six multiple-choice questions with a hint and
 * a line of feedback per option. Its own availability note is explicit that it
 * changes no metric, no Recovery Point and no unlock — so nothing here is
 * graded and nothing is required.
 *
 * Read whole rather than per field: the block is regular, and the parts that
 * matter to the game are the intro, the concepts and the six questions.
 */
/** Figure blocks that would not parse, reported by the tools that print owes. */
export const FIGURE_OWES = [];

/**
 * The fenced figure spec under a `**Figure…:**` label, as an object.
 *
 * The block is the same shape `figures.js` takes and the contamcity editions
 * already author — `{ kind: 'line', xLabel, yLabel, series: [...] }` — so a
 * review question about a bowed curve can print the curve. Anything that does
 * not parse is reported, never repaired: a half-read chart is a chart that
 * says something the bible did not.
 */
export const figureIn = (lines) => {
  const i = lines.findIndex(l => /^\*\*\s*Figure[^*]*\*\*/i.test(l));
  if(i < 0) return null;
  const open = lines.findIndex((l, j) => j > i && /^```/.test(l));
  if(open < 0) return null;
  const shut = lines.findIndex((l, j) => j > open && /^```\s*$/.test(l));
  if(shut < 0) return null;
  const text = lines.slice(open + 1, shut).join('\n');
  try { return JSON.parse(text); }
  catch(e){ FIGURE_OWES.push(`a **Figure** block is not readable JSON: ${e.message}`); return null; }
};


/**
 * The mission's worked examples, as the bible's own YAML.
 *
 * `### Worked examples - optional mission-card panel` carries one fenced block
 * holding the button label, the panel title and five examples — problem, rule,
 * steps, answer, common mistake, and optionally a figure. It is reference the
 * player opens, never graded, so nothing here needs to reach the question
 * machinery; it needs to arrive whole and unedited.
 *
 * Parsed with the book's own YAML reader rather than field by field: the block is
 * nested three deep and re-typing its shape here would be a second description of
 * what the bible already states exactly.
 */
/**
 * The same five examples written as prose rather than as YAML.
 *
 * Whiteout numbers them under the heading, one paragraph each, with the subject
 * in bold at the front:
 *
 *   1. **Integer division:** With `int a = 7; int b = 2;`, Java evaluates `a / b`
 *      as `3`. The `.5` is discarded because both operands are integers.
 *
 * That is a whole worked example in one paragraph, and it is NOT split into the
 * panel's problem / rule / steps / answer / mistake here — deciding which
 * sentence is the rule and which is the mistake would be writing the example
 * rather than reading it. The bold lead is the title, the paragraph is the body,
 * and `engine/core/worked.js` prints a one-part example as itself rather than
 * under a "Problem" heading it does not have.
 */
function workedList(body, at){
  let end = body.length;
  for(let i = at + 1; i < body.length; i++){
    if(/^#{1,4} /.test(body[i])){ end = i; break; }
  }
  const examples = [];
  for(let i = at + 1; i < end; i++){
    const m = /^\s*(?:\d+[.)]|[-*])\s+(.*)$/.exec(body[i]);
    if(!m) continue;
    const out = [m[1]];
    for(let j = i + 1; j < end; j++){
      // A blank line, the next item, or a bold field ends this one.
      if(!body[j].trim() || /^\s*(?:\d+[.)]|[-*])\s+/.test(body[j]) || /^\*\*/.test(body[j])) break;
      out.push(body[j].trim());
      i = j;
    }
    const said = clean(out.join(' ')).trim();
    if(!said) continue;
    const lead = /^\*\*(.+?):?\*\*:?\s*(.*)$/.exec(said);
    examples.push(lead
      ? { title: lead[1].trim(), problem: lead[2].trim() || lead[1].trim(),
          rule: '', steps: [], answer: '', mistake: '' }
      : { title: '', problem: said, rule: '', steps: [], answer: '', mistake: '' });
  }
  if(!examples.length) return null;
  return { endsAt: end, worked: { label: 'Worked examples', title: 'Worked examples', examples } };
}

export function workedIn(body){
  // THE HEADING IS THE SAME SECTION UNDER THREE NAMES. Eight bibles write
  // `### Worked examples - optional mission-card panel`; Whiteout writes
  // `### Optional worked examples — exact player copy`, and matched on
  // "Worked examples" at the front that is seventy-five examples read as none.
  const at = body.findIndex(l => /^#{2,4}\s*(?:[A-Z]+\d*\.\s*)?(?:Optional\s+)?Worked examples/i
    .test(l));
  if(at < 0) return null;
  const open = body.findIndex((l, i) => i > at && /^```/.test(l));
  const listed = workedList(body, at);
  // A fence after the heading but belonging to a later section is not this
  // block's, so the prose reading wins whenever the numbered list is nearer.
  if(open < 0 || (listed && (open > (listed.endsAt ?? open)))) return listed?.worked ?? null;
  const shut = body.findIndex((l, i) => i > open && /^```\s*$/.test(l));
  if(shut < 0) return listed?.worked ?? null;
  let doc;
  try { doc = parseYaml(body.slice(open + 1, shut).join('\n')); }
  catch(e){ FIGURE_OWES.push(`a worked-examples block is not readable YAML: ${e.message}`); return null; }
  const w = doc?.worked_examples ?? doc;
  const list = (w?.examples ?? []).filter(x => x?.problem);
  if(!list.length) return null;
  return {
    label: String(w.button_label ?? 'Worked examples'),
    title: String(w.panel_title ?? 'Worked examples'),
    examples: list.map(x => ({
      title: String(x.title ?? ''), problem: String(x.problem ?? ''),
      rule: String(x.rule ?? ''),
      steps: (Array.isArray(x.steps) ? x.steps : [x.steps]).filter(Boolean).map(String),
      answer: String(x.answer ?? ''),
      mistake: String(x.common_mistake ?? x.mistake ?? ''),
      ...(x.figure ? { figure: x.figure } : {}),
    })),
  };
}

function deeperIn(body){
  const at = body.findIndex(l => /^#{2,4} Optional secondary brief/i.test(l));
  if(at < 0) return null;
  let end = body.length;
  for(let i = at + 1; i < body.length; i++){
    if(/^#{1,2} /.test(body[i])){ end = i; break; }
  }
  const chunk = body.slice(at, end);

  /**
   * A LABEL WITH A NOTE ON IT IS STILL THAT LABEL. Every line here is headed
   * `**Prompt - exact player copy:**`, and the shared `field` matches a label
   * followed immediately by its colon — so it found none of them. This takes
   * anything up to the closing `**` as the label and compares the front of it.
   */
  const say = (label, lines) => {
    const re = new RegExp(`^\\*\\*\\s*${label}[^*]*\\*\\*\\s*:?\\s*(.*)$`, 'i');
    for(let i = 0; i < lines.length; i++){
      const m = re.exec(lines[i]);
      if(!m) continue;
      const out = [m[1]];
      for(let j = i + 1; j < lines.length; j++){
        const l = lines[j];
        if(/^\*\*/.test(l) || /^#{1,6} /.test(l) || /^\s*[-*] /.test(l) || !l.trim()) break;
        out.push(l.trim());
      }
      return clean(out.join(' ')).trim();
    }
    return '';
  };
  /** The bullets under one label, stopping at the next label or heading. */
  const listUnder = (label, lines) => {
    const i = lines.findIndex(l => new RegExp(`^\\*\\*\\s*${label}`, 'i').test(l)
      || new RegExp(`^#{3,4}\\s*${label}`, 'i').test(l));
    if(i < 0) return [];
    const out = [];
    for(let j = i + 1; j < lines.length; j++){
      const l = lines[j];
      if(/^\s*[-*] /.test(l)){ out.push(l.replace(/^\s*[-*] /, '').trim()); continue; }
      if(!l.trim()) continue;
      if(/^\*\*/.test(l) || /^#{1,6} /.test(l)) break;
      if(out.length) out[out.length - 1] += ' ' + l.trim();
    }
    return out.map(clean).filter(Boolean);
  };

  const intro = say('Secondary briefing card', chunk);

  // The ideas the day card deliberately does not carry. A bullet may be a term
  // and its definition — `**Name:** …` — or a plain statement, and both are
  // wanted: the first is vocabulary, the second is the sentence that uses it.
  const concepts = listUnder('Additional concepts', chunk).map((line) => {
    const m = /^\*\*([^*]+?):?\*\*\s*:?\s*([\s\S]+)$/.exec(line);
    return m ? { name: clean(m[1]).replace(/:$/, ''), def: clean(m[2]) } : { say: clean(line) };
  }).filter(x => x.name || x.say);

  const heads = chunk.map((l, i) => [l, i]).filter(([l]) => /^#{3,4} Review question \d+/i.test(l));
  const questions = heads.map(([, i], k) => {
    const q = chunk.slice(i, k + 1 < heads.length ? heads[k + 1][1] : chunk.length);
    const opt = (line) => {
      const m = /^([A-Z])[.):]\s*([\s\S]+)$/.exec(line);
      return m ? { key: m[1], text: clean(m[2]) } : null;
    };
    const options = listUnder('Options', q).map(opt).filter(Boolean);
    const notes = listUnder('Option feedback', q).map(opt).filter(Boolean);
    const answer = say('Correct answer', q).replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase();
    return {
      prompt: say('Prompt', q),
      hint: say('Hint', q),
      answer,
      // THE CHART, WHERE THE BIBLE DRAWS ONE. `**Figure:**` followed by a fenced
      // block holding the figure spec engine/core/figures.js already renders for
      // the campaign's own stops. Read as JSON and passed through untouched — a
      // figure this could not parse would be a figure nobody authored, so a bad
      // block is reported rather than guessed at.
      ...(figureIn(q) ? { figure: figureIn(q) } : {}),
      options: options.map(o => ({
        key: o.key, text: o.text,
        why: notes.find(n => n.key === o.key)?.text ?? '',
      })),
    };
  }).filter(x => x.prompt && x.options.length >= 2 && x.options.some(o => o.key === x.answer));

  return (intro || concepts.length || questions.length)
    ? { intro, concepts, questions } : null;
}

/**
 * `**Symbols:**` as the [symbol, meaning] pairs a plan card prints.
 *
 * The bibles write one sentence — `Q1 is the first quartile; Q3 is the third
 * quartile; IQR is interquartile range.` — and `engine/core/app.js` prints a
 * bold symbol and its gloss per row. Semicolons first because that is the
 * separator seven of the eight use; a sentence that uses commas instead is split
 * on those only when the semicolons found nothing, since a comma inside one gloss
 * would otherwise cut it in half.
 *
 * Nothing is returned unless every part parses. A half-read symbol list would put
 * one letter on the card and silently drop the rest, and the card is the only
 * place the letters are ever defined.
 */
export function symbolPairs(said, equation = ''){
  const text = String(said ?? '').replace(/#{1,4}\s[\s\S]*$/, '').trim().replace(/\.$/, '');
  if(!text) return [];

  /**
   * THE BACKTICKED FORM FIRST, and it is now the common one:
   *
   *   `x` position, `t` time, `v` velocity, `a` acceleration.
   *   `V` volume and `h` depth.
   *
   * The marks say exactly which part is the symbol, so there is nothing to infer
   * — which is what makes this worth trying before the sentence form below. It
   * arrived when the bibles tightened their equation blocks, and until this read
   * it every one of those lines came back unparsed: the symbols were dropped
   * from the card AND `bible-lint` reported the block as having no Symbols line
   * at all, on 60-odd equations that each had one.
   */
  const ticked = [...text.matchAll(/`([^`]{1,24})`\s*([^`,;]+)/g)]
    .map(m => [m[1].trim(), m[2].trim().replace(/^(?:is|are)\s+/i, '').replace(/[,;]\s*(?:and\s+)?$/, '').replace(/\s+and$/, '').trim()])
    .filter(([sym, mean]) => sym && mean);
  if(ticked.length) return ticked;

  /**
   * The sentence form, which the other bibles still write:
   *
   *   Q1 is the first quartile; Q3 is the third quartile; IQR is interquartile range.
   *
   * Semicolons first because that is the separator most of them use; a sentence
   * using commas instead is split on those only when the semicolons found
   * nothing, since a comma inside one gloss would otherwise cut it in half.
   *
   * Nothing is returned unless every part parses. A half-read symbol list would
   * put one letter on the card and silently drop the rest, and the card is the
   * only place the letters are ever defined.
   */
  const split = (sep) => text.split(sep).map(x => x.trim().replace(/^and\s+/i, '')).filter(Boolean);
  const read = (parts) => {
    const pairs = parts.map((part) => {
      const m = /^(.{1,24}?)\s+(?:is|are|means|gives)\s+(.+)$/i.exec(part);
      return m ? [m[1].trim(), m[2].trim()] : null;
    });
    return pairs.every(Boolean) && pairs.length ? pairs : null;
  };
  // THE MOST PAIRS WINS, rather than the first split that parses at all. A line
  // separated by commas has ONE semicolon-part, and that part parses — greedily,
  // as a single symbol whose meaning is the rest of the sentence: `x` glossed as
  // "the observed value, mean is the distribution mean, and SD is…". Right by the
  // letter of the rule and useless on the card.
  /**
   * A THIRD SHAPE: the quantity and its unit.
   *
   *   depth in metres, area in square metres, fraction as a decimal
   *
   * No symbol letters at all — the "symbol" is the word and the gloss is what it
   * is measured in. Carrying Capacity writes all nineteen of its equations this
   * way, and read by the two rules above they came back with no symbols at all.
   */
  const unitRead = (parts) => {
    const pairs = parts.map((part) => {
      const m = /^([A-Za-z][A-Za-z0-9_ ()-]{0,22}?)\s+((?:in|as|per)\s+.+)$/i.exec(part);
      return m ? [m[1].trim(), m[2].trim()] : null;
    });
    return pairs.every(Boolean) && pairs.length ? pairs : null;
  };
  /**
   * A FOURTH SHAPE: the symbol and its gloss, side by side with nothing between.
   *
   *   b slope; a intercept; r correlation; sx,sy SDs; x-bar,y-bar means.
   *   E field, dA outward area element, q_enc enclosed charge
   *
   * Perfectly clear to a reader and the hardest for a rule, because "generated
   * energy comes from reaction" has the same grammar and names nothing. So the
   * first token has to LOOK like a symbol: three characters or fewer, or marked
   * with a digit, an underscore, a hyphen, a comma or a Greek letter. That
   * accepts `b`, `dA`, `q_enc`, `x-bar`, `sx,sy`, `mu0`, `ε₀` and refuses
   * `generated`, `nominal`, `every`. Two parts minimum, so a sentence cannot
   * qualify by being short.
   */
  // Parentheses count as a mark too: `SE(b)` is a symbol and `standard` is not,
  // and without them one well-formed line in three was refused for its one
  // bracketed term — "b sample slope; SE(b) its standard error; n sample size".
  // AND THE EQUATION SETTLES THE REST. A physics bible spells its subscripts
  // out — `Mtotal`, `Tperiod`, `bmin` — which look exactly like the words this
  // rule exists to refuse, and one such token refused the whole line: Overwind
  // wrote six well-formed symbol lines and three of them came back empty, so
  // the letters were defined nowhere and `bible-lint` reported a Symbols line
  // that names no symbol about a line that names six. A token standing in the
  // equation beside it is not a guess about grammar — it is the thing the
  // equation is made of, which is what a Symbols line is for.
  const inEquation = new Set(String(equation ?? '').match(/[A-Za-z][A-Za-z0-9_′″]*/g) ?? []);
  const looksSymbolic = (tok) =>
    tok.length <= 3 || /[0-9_,\-()]/.test(tok) || /[\u0370-\u03ff\u2080-\u2089]/.test(tok)
    || inEquation.has(tok);
  const bareRead = (parts) => {
    if(parts.length < 2) return null;
    const pairs = parts.map((part) => {
      const m = /^(\S{1,12})\s+(.+)$/.exec(part);
      if(!m || !looksSymbolic(m[1])) return null;
      return [m[1].trim().replace(/[,;]$/, ''), m[2].trim()];
    });
    return pairs.every(Boolean) ? pairs : null;
  };

  const parts = [split(';'), split(/,(?![^(]*\))/)];
  const best = [...parts.map(read), ...parts.map(unitRead), ...parts.map(bareRead)]
    .filter(Boolean).sort((a, b) => b.length - a.length)[0];
  return best ?? [];
}

/** The `Worth knowing first` block: glossary, primer, equations. */
function worthKnowing(body){
  /**
   * SEVERAL TERMS MAY SHARE ONE PARAGRAPH, and splitting on the first colon made
   * that one enormous term. The Trial's day 1 is written as a single line —
   * `Variable: a characteristic recorded for each patient. Categorical variable:
   * a variable placing a patient into a group. Quantitative variable: …` — five
   * entries, of which "Variable" took all five definitions and the other four
   * never reached the card at all.
   *
   * A new entry starts after a full stop, at a short capitalised phrase followed
   * by a colon. Anything that does not match that stays part of the definition it
   * is in, so a definition containing a colon of its own is not cut in half.
   */
  /**
   * A GLOSSARY MAY BE A BULLET LIST. Whiteout writes `- **integer division:** the
   * division between two integers…` where the other eight write the same entry as
   * a plain `Term: definition` paragraph. Read as paragraphs only, a campaign with
   * a perfectly good glossary on every mission has none at all — and the plan card
   * is where those words are defined.
   */
  const glossSec = section(body, /^#{3,4} (?:[A-Z]+\d*\.\s*)?Glossary terms/);
  const glossBullets = bullets(glossSec)
    .map(l => clean(l).replace(/^\*\*(.+?):?\*\*\s*:?\s*/, (m0, term) => `${term}: `));
  const glossary = paragraphs(glossBullets.length ? glossBullets : glossSec).flatMap(p =>
    p.split(/(?<=\.)\s+(?=[A-Z][A-Za-z0-9 ()\/-]{2,40}:\s)/)
  ).map(p => {
    const at = p.indexOf(': ');
    if(at < 0) return null;
    return { term: p.slice(0, at).trim(), def: p.slice(at + 2).trim() };
  }).filter(Boolean);
  const primer = bullets(section(body, /^#{3,4} (?:[A-Z]+\d*\.\s*)?Primer concepts/));
  // Equations come as repeated four-field groups, so they are split on the
  // `**Equation:**` label rather than read with `field`, which finds the first.
  const eqLines = section(body, /^#{3,4} (?:[A-Z]+\d*\.\s*)?Equations first needed today/);
  const marks = eqLines.map((l, i) => [l, i]).filter(([l]) => /^\*\*Equation:\*\*/.test(l));
  const equations = marks.map(([, i], k) => {
    const chunk = eqLines.slice(i, k + 1 < marks.length ? marks[k + 1][1] : eqLines.length);
    // THE LAST FIELD RUNS INTO THE NEXT HEADING. `section` ends at the next `####`
    // and this block is followed by a `##`, so "Why this campaign needs it" came
    // back with "## Main story happening - designer summary" welded to the end of
    // it — a designer note, in the player's card, on eleven of fifteen missions.
    const cut = (t) => String(t ?? '').split(/#{1,4}\s/)[0].trim();
    // THE SYMBOLS LINE IS READ RAW, because `clean` strips backticks and the
    // backticks are the parse. The bibles now write `` `x` position, `t` time ``
    // — the marks say exactly which part is the symbol — and by the time `field`
    // has cleaned it that is "x position, t time", which is a guess again.
    // Cleaned, sixty-odd equations lost their symbols AND `bible-lint` reported
    // each one as having no Symbols line at all.
    const rawSymbols = (chunk.find(l => /^\*\*Symbols:?\*\*/.test(l)) ?? '')
      .replace(/^\*\*Symbols:?\*\*\s*/, '');
    const said = cut(field('Symbols', chunk));
    const pairs = symbolPairs(rawSymbols || said, field('Equation', chunk));
    return {
      e: field('Equation', chunk),
      c: cut(field('What it is for', chunk)),
      // `v` is the parsed pairs; `vSaid` is the line as written. BOTH, because a
      // block with no Symbols line and a block whose Symbols line this cannot
      // parse are different defects and the second is not the bible's fault to
      // the same degree. Reporting them with one message said "missing its
      // Symbols line" about sixty equations that had one.
      ...(pairs.length ? { v: pairs } : {}),
      ...(said ? { vSaid: said } : {}),
      s: cut(field('Why this campaign needs it', chunk)),
    };
  });
  return { glossary, primer, equations };
}

/** One mission's stops. */
function stopsIn(body){
  // AN EM DASH IS ALSO A DASH. Ground Truth heads every stop `## Stop 1 — Fix
  // the signs`, and a reader that only knew the hyphen found 48 of its 60 stops
  // and reported the campaign as twelve stops short.
  // AND A STOP MAY BE NUMBERED TWICE. Whiteout heads its stops `## H1. Stop 1 —
  // Trace the controller`: a per-mission letter and index in front of the word
  // the reader is looking for. Skipping that prefix is the difference between
  // reading sixty stops and reading none.
  const HEAD = /^#{2,3} (?:[A-Z]+\d*\.\s*)?Stop \d+\s*[-–—:]\s*/;
  const heads = body.map((l, i) => [l, i]).filter(([l]) => HEAD.test(l));
  return heads.map(([head, i], k) => {
    /**
     * A BEAT ENDS AT THE NEXT BEAT — OR AT THE NEXT HEADING.
     *
     * The last beat used to run to the end of the mission, which is everything
     * after the beat script: the location plan, the characters, and the story
     * block's own prose `**Beat script:**` summary. That summary quotes lines
     * too, so `bubblesIn` swept them up and mission 1's final beat came back
     * with three speeches instead of one — the player answers the last question
     * and Eli Voss says four things at once, two of them belonging to earlier
     * moments in the day.
     */
    const after = body.slice(i + 1).findIndex(l => /^#{1,4}\s/.test(l));
    const ends = after < 0 ? body.length : i + 1 + after;
    const next = Math.min(k + 1 < heads.length ? heads[k + 1][1] : body.length, ends);
    const chunk = body.slice(i, next);
    // The stop, split at its §7 block. Everything the bible wrote first is in
    // `above7`; the completed board is what follows the label.
    const at7 = buildAt(chunk);
    const above7 = at7 < 0 ? chunk : chunk.slice(0, at7);
    const buildFrom = at7 < 0 ? null : chunk.slice(at7 + 1);
    const meta = field('Metadata', chunk) ?? '';
    // METADATA COMES LABELLED OR POSITIONAL. Mars writes `Concept: x; Keystone:
    // y; Learning role: INTRODUCE; …`; Headwater, Ground Truth and Changeover
    // write the same six things as bare semicolon-separated fields in that
    // order. Reading only the labelled form returned null for every one of them.
    const cols = meta.split(';').map(x => x.trim()).filter(Boolean);
    const POSITIONAL = ['Concept', 'Keystone', 'Prerequisites', 'Learning role', 'Difficulty', 'Story role'];
    const metaOf = (key) => {
      const m = meta.match(new RegExp(`${key}:\\s*([^;.]+)`, 'i'));
      if(m) return m[1].trim();
      if(/:/.test(meta)) return null;
      const at = POSITIONAL.indexOf(key);
      return at >= 0 && cols[at] ? cols[at].replace(/\.$/, '') : null;
    };
    return {
      n: +head.match(/Stop (\d+)/)[1],
      title: clean(head.replace(HEAD, '')),
      placement: field('Format/placement', chunk),
      // The canonical format token is the first all-caps word of the placement
      // line, which is how the bible writes it: "CHOICE, asked at …".
      format: (field('Format/placement', chunk) ?? '').match(/\b([A-Z][A-Z_]{2,})\b/)?.[1] ?? null,
      meta,
      // THE CONCEPT ARRIVES NUMBERED NOW. `WHAT_TO_HAND_BACK.md` §3 asked for the
      // course's own numbered entry beside the bible's words, because the
      // sequencing gates grade *when* an idea is first taught and can only do
      // that against one fixed list; all eight came back writing
      // `Concept: 10 — L'Hopital`. The words stay the concept — every fragment
      // and every parity comparison is against those — and the number is read
      // out beside them rather than left inside the string, where it would read
      // as part of the concept's name.
      concept: (metaOf('Concept') ?? '').replace(/^\s*\d+\s*[—–-]\s*/, '').trim() || null,
      // AND THE NUMBER, WHICH IS NOW THE POINT. The words above are kept because
      // `bibleParity` holds the book's prose to the bible's, but the game grades
      // sequencing against ONE fixed numbered spine and cannot do it from a
      // phrase. The third handback put a number on every stop; without reading it
      // here it stays in the bible and never reaches the book, which is exactly
      // where 496 of them sat.
      conceptNumber: (() => {
        const m = String(metaOf('Concept') ?? '').match(/^\s*(\d+)\s*[—–-]\s*/);
        return m ? Number(m[1]) : null;
      })(),
      conceptN: (() => {
        const m = (metaOf('Concept') ?? '').match(/^\s*(\d+)\s*[—–-]\s/);
        return m ? +m[1] : null;
      })(),
      keystone: metaOf('Keystone'),
      // The area of study that OWNS the lesson, which is not the place it is
      // asked at. See tools/BIBLE_ADDENDUM_PROMPT.md §1 — 24 of Red Sand's 60
      // stops are asked somewhere that is not an area of study, and without this
      // the implementation is guessing which subject a question belongs to.
      area: metaOf('Area'),
      role: metaOf('Learning role'),
      difficulty: metaOf('Difficulty'),
      story: metaOf('Story role'),
      call: anyField(['Call - exact player copy', 'Call'], chunk),
      reason: anyField(['Stop reason - exact player copy', 'Stop reason', 'Reason'], chunk),
      setup: anyField(['Question card story setup - exact player copy', 'Story setup', 'Setup'], chunk),
      connect: anyField(['Question card story-science connection - exact player copy',
        'Story-science connection', 'Connection'], chunk),
      prompt: anyField(['Question card prompt - exact player copy', 'Prompt/data', 'Prompt',
        'Expected submission - exact player copy'], chunk),
      data: field('Data/readings/options', chunk) ?? field('Pool/items', chunk)
         ?? field('Authored tiles/data', chunk) ?? field('Formula/data', chunk)
         ?? field('Formula', chunk) ?? field('Cards', chunk) ?? field('Balance block', chunk)
         ?? field('Stations/readings', chunk) ?? field('Prediction', chunk),
      result: anyField(['Correct result', 'Correct order', 'Result/answerText', 'Result',
        'Lock/result'], chunk),
      answerText: anyField(['Answer text', 'answerText', 'Answer text and mechanism',
        'Result/answerText'], chunk),
      // THE BIBLE SPELLS TWO FIELDS THREE WAYS. Fifty-seven stops write
      // `**Why:**` and `**Wrong-path feedback:**`; a handful write
      // `**Mechanism:**`, `**Correct mechanism:**` and `**Why alternatives
      // fail:**` for the same two things. The copy is there either way, so it is
      // lifted either way — and `aliases` records which stops did it, so the
      // linter can say so without blocking a build over a label's spelling.
      why: anyField(['Why', 'Why/mechanism', 'Mechanism', 'Correct mechanism',
        'Answer text and mechanism'], chunk),
      wrong: anyField(['Wrong-path feedback', 'Why alternatives fail', 'Feedback'], chunk)
        // OR ON THE LINES UNDER THE LABEL. `field` reads what follows a label on
        // its own line and stops at a blank one, so a stop that writes
        //
        //   **Wrong-path feedback:**
        //
        //   - **Choice 2:** A detector-fixed feature supplies no repeated sky path.
        //
        // came back empty and was reported as having no rebuttals at all — with
        // one written per wrong option, a few lines below the label.
        ?? (() => {
          const at = chunk.findIndex(l => /^\*\*\s*(Wrong-path feedback|Why alternatives fail)/i.test(l));
          if(at < 0) return null;
          const said = [];
          for(const l of chunk.slice(at + 1)){
            if(/^\*\*[A-Z]/.test(l) || /^#{1,6} /.test(l)) break;
            if(/^\s*-\s+/.test(l)) said.push(clean(l.replace(/^\s*-\s+/, '')));
          }
          return said.length ? said.join(' ') : null;
        })()
        // Or keyed to each option inside the board, which is the better shape.
        // Read as a document rather than grepped for `rebuttals:` at the start of
        // a line: Boomtown writes its boards as JSON, so `"rebuttals": {…}` never
        // matched and fifteen stops carrying one rebuttal per wrong option were
        // reported as carrying none.
        ?? (() => {
          const pay = fence(above7) ?? '';
          if(!pay) return null;
          let doc = null;
          try{ doc = parseYaml(pay); }catch{ /* not a document */ }
          const r = doc?.rebuttals ?? doc?.rebuttal;
          const some = Array.isArray(r) ? r.length : (r && typeof r === 'object' ? Object.keys(r).length : 0);
          if(some) return 'in the interaction block, keyed per option';
          return /^\s*rebuttals:/m.test(pay) ? 'in the interaction block, keyed per option' : null;
        })(),
      aliases: [
        ...(!field('Why', chunk) && (field('Mechanism', chunk) || field('Correct mechanism', chunk))
          ? [field('Mechanism', chunk) ? 'Mechanism' : 'Correct mechanism'] : []),
        ...(!field('Wrong-path feedback', chunk) && field('Why alternatives fail', chunk)
          ? ['Why alternatives fail'] : []),
      ],
      state: anyField(['State/output', 'State'], chunk),
      // A PAYLOAD IS NOT ALWAYS FENCED. Mars writes its interaction blocks in a
      // ```yaml fence; the other seven write them as one backticked blob on the
      // payload line. Both are the bible's own field names either way — see the
      // note at the top of tools/v10extract.mjs about what converting them costs.
      // BEFORE the §7 block, always. Six of the eight bibles write their original
      // board as a backticked blob and their §7 board as the stop's only fence,
      // so a plain `fence(chunk)` here silently started returning the completed
      // board under the old key's name — which is the two-descriptions-of-one-
      // rule problem, and it would have made every parity comparison compare the
      // wrong two things. The payload key means what it has always meant.
      payload: fence(above7) ?? backticked(anyField(
        ['Complete format-specific interaction block', 'Payload'], above7)),
      // The completed board, and the format its label names — which is the
      // stop's own format on all 257 of them, and is read rather than assumed so
      // a mislabelled block is a difference the converter can see.
      build: buildFrom ? fence(buildFrom) : null,
      buildFormat: buildFrom
        ? (chunk[at7].match(/(?:§7 (?:build completion|authored-board source)|Handback \d+ canonical interaction block)\s*[—–-]\s*([A-Z_]+)/) ?? [])[1] ?? null
        : null,
      // THE CHART THIS STOP DRAWS, if the bible authored one. The bibles began
      // writing `**Figure - exact player copy:**` on stops as well as on Go
      // deeper questions, and only the review half was being read — so a stop
      // that says "counts of improved and not-improved patients" had its bar
      // chart sitting in the bible and nothing on the card.
      figure: figureIn(chunk),
      // The board is already the importer's, so it is carried rather than
      // converted — see `bible-build.mjs`.
      buildCanonical: buildIsCanonical(chunk, at7),
      choices: (() => {
        // THE BOARD MAY CARRY THEM. Eleven Days writes its CHOICE stops as a
        // payload — question, choices, answer, why, and one rebuttal keyed to
        // each wrong option — rather than as a `**Choices:**` list with the
        // rebuttals in a separate paragraph. That is the more explicit shape and
        // it is the one that was asked for, so it is read here rather than
        // reported as a stop with no options and no feedback.
        // BEFORE the §7 line OR UNDER IT. This bible writes
        // `**§7 authored-board source - CHOICE:** Build this stop from the
        // canonical block below`, and the block is below — so `above7`, which is
        // everything in front of that heading, contains no fence at all and the
        // options were being looked for in the wrong half of the stop.
        // UNDER THE §7 LINE FIRST, and never the figure's fence.
        //
        // Two things had to be got right here. This bible writes `**§7
        // authored-board source - CHOICE:** Build this stop from the canonical
        // block below`, and the block is BELOW — so `above7`, everything in front
        // of that heading, has no board in it. And a stop that also authors a
        // chart has a ```json fence above the §7 line, which a plain `fence()`
        // returns instead: the options were being looked for inside a bar chart.
        const notFigure = (lines) => {
          const at = lines.findIndex(l => /^\*\*\s*Figure[^*]*\*\*/i.test(l));
          return at < 0 ? lines : lines.slice(0, at);
        };
        // AND THE `Complete format-specific interaction block` BEFORE EITHER.
        // Several stops carry two boards: an older `§7 authored-board source -
        // CLOUD` fence and, below it, the current complete block whose `choices`
        // are the options. Reading the §7 one first found a cloud and reported
        // the stop as having no options.
        // A STOP MAY CARRY SEVERAL BOARDS, and the options are in whichever one
        // has them. Some of these stops write `Complete format-specific
        // interaction block` TWICE — a cloud in the first and the four options in
        // the second — with an older `§7 authored-board source - CLOUD` fence
        // between them. Taking the first of anything found a cloud. So every
        // candidate is tried and the first that yields options wins.
        const cands = [];
        chunk.forEach((l, i) => {
          if(/^\*\*\s*Complete format-specific interaction block/i.test(l)) cands.push(chunk.slice(i));
        });
        if(buildFrom) cands.push(buildFrom);
        cands.push(notFigure(above7));

        /**
         * THE OPTIONS AS AUTHORED OBJECTS, which is the shape the bibles settled
         * on and the one this could not see:
         *
         *   choice:
         *     choices:
         *       - {id: corrected_parallax, label: "Use both sight lines…", correct: true}
         *       - {id: brightness_only, label: "Use apparent brightness…", correct: false}
         *     answer: corrected_parallax
         *
         * Read as a flat list of strings it finds nothing — the key is `label`,
         * the items are maps, and `choices:` is indented under `choice:` rather
         * than at column zero. `tools/import-book.mjs` has always understood this
         * (the stop imports with all four options, its key and its rebuttals);
         * only the linter did not, and it reported seven perfectly good stops
         * across two campaigns as "CHOICE has 0 options". A gate that refuses a
         * stop the importer builds correctly is worse than no gate.
         */
        for(const from of cands){
          const pay = fence(from) ?? '';
          if(!pay) continue;
          /**
           * THE BOARD PARSED, BEFORE THE BOARD PATTERN-MATCHED.
           *
           * Every shape below is a regex over the block's text, which works
           * because the bibles write YAML by hand in a handful of hands. Boomtown
           * writes JSON:
           *
           *   { "question": "…", "choices": ["Record higher demand …", …],
           *     "answer": "Record higher demand …", "rebuttals": { … } }
           *
           * — sixty boards of it, and none of the text shapes match, so fifteen
           * CHOICE stops were reported as having no options and no key about
           * stops that list four options and name one. Reading the block as a
           * document first costs nothing on the bibles that were already read
           * (their fences parse to the same lists) and needs no new shape the
           * next time somebody writes a third dialect.
           */
          try{
            const doc = parseYaml(pay);
            const list = Array.isArray(doc?.choices) ? doc.choices
              : (Array.isArray(doc?.options) ? doc.options : null);
            if(list?.length){
              const key = String(doc.answer ?? doc.correct ?? '');
              const read = list.map((c) => {
                const text = clean(typeof c === 'string' ? c : String(c?.label ?? c?.text ?? ''));
                const marked = typeof c === 'object' && c?.correct === true;
                return text ? { text, correct: marked || (!!key && flatEq(text, key)) } : null;
              }).filter(Boolean);
              if(read.length) return read;
            }
          }catch{ /* not a document — read it as text below */ }
          const labelled = [...pay.matchAll(/^\s*-\s*\{([^}]*)\}\s*$/gm)]
            .map(m => m[1])
            .map((inner) => {
              const lab = /(?:^|,)\s*label\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'([^']*)'|([^,]+))/.exec(inner);
              if(!lab) return null;
              return { text: clean(lab[1] ?? lab[2] ?? lab[3] ?? ''),
                       correct: /(?:^|,)\s*correct\s*:\s*true\b/.test(inner) };
            })
            .filter(Boolean);
          if(labelled.length) return labelled;

          const cm = pay.match(/^choices:\s*$([\s\S]*?)^(?=\w|$)/m);
          if(cm){
            const items = [...cm[1].matchAll(/^\s*-\s+(.+)$/gm)].map(x => clean(x[1]).replace(/^["']|["']$/g, ''));
            const key = clean((pay.match(/^answer:\s*(.+)$/m) ?? [])[1] ?? '').replace(/^["']|["']$/g, '');
            if(items.length) return items.map(t => ({ text: t, correct: !!key && flatEq(t, key) }));
          }
        }
        const a = chunk.findIndex(l => /^\*\*Choices/.test(l));
        if(a < 0) return null;
        const out = [];
        for(const l of chunk.slice(a + 1)){
          const m = l.match(/^\d+\.\s*(.+)$/);
          if(m) out.push({ text: clean(m[1]), correct: false });
          else if(out.length && l.trim() && !/^\s/.test(l)) break;
          else if(out.length && l.trim()) out[out.length - 1].text = clean(out[out.length - 1].text + ' ' + l);
        }
        // THE KEY MARKER WRAPS. The bible hard-wraps its options, so
        // `**(correct)**` lands on its own continuation line about as often as it
        // ends the first one — and a reader that only looked at the end of the
        // numbered line returned four options and no key, which is a lint that
        // says every CHOICE in the campaign is unkeyed.
        for(const c of out){
          if(/\*\*\(correct\)\*\*/.test(c.text)) c.correct = true;
          c.text = clean(c.text.replace(/\*\*\(correct\)\*\*/g, ''));
        }
        if(out.length) return out;
        // THE BIBLE WRITES OPTIONS TWO WAYS. Most stops use a numbered list;
        // eight of the sixty put all four on the `**Choices:**` line itself,
        // slash-separated, with `**(correct)**` inline. A reader that knew only
        // the first shape reported eight CHOICE stops with no options and no key
        // — which reads as the bible being broken when it is the parser that is.
        const inline = field('Choices', chunk);
        if(!inline) return null;
        const parts = inline.split(/\s+\/\s+/).map(t => t.trim()).filter(Boolean);
        if(parts.length < 2) return null;
        const list = parts.map(t => ({
          text: clean(t.replace(/\*\*\(correct\)\*\*/g, '')),
          correct: /\*\*\(correct\)\*\*/.test(t),
        }));
        // The slash is both the separator and, in an equilibrium expression, part
        // of an option. `inlineDelimiter` tells the linter to say so rather than
        // report a count nobody can act on.
        list.inlineDelimiter = true;
        return list;
      })(),
    };
  });
}

/**
 * Read a whole bible.
 *
 * A mission runs from its own `# Mission N` heading to the next one, or — for
 * the last mission — to the first numbered back-matter heading (`# 9. Mission-
 * at-a-glance …`), which is what stops mission 15 swallowing the production map,
 * the stop manifest and the acceptance tests.
 */
export function readBible(file){
  const lines = readFileSync(file, 'utf8').split('\n');
  const marks = lines.map((l, i) => [l, i]).filter(([l]) => /^# Mission \d+\b/.test(l));
  const backMatter = lines.findIndex(l => /^# \d+\. /.test(l));
  const missions = marks.map(([head, at], k) => {
    let end = k + 1 < marks.length ? marks[k + 1][1] : lines.length;
    if(k + 1 === marks.length && backMatter > at) end = backMatter;
    const body = lines.slice(at, end);
    const wk = worthKnowing(body);
    return {
      n: +head.match(/Mission (\d+)/)[1],
      // A DASH IS A DASH. Written `# Mission 1 - THE CAGE`, the prefix comes off
      // and the title is the name; written with an em dash, which four bibles
      // do, nothing matched and the whole heading became the title — so every
      // plan card in those campaigns read "Day 1 — # Mission 1 — THE CAGE THAT
      // KEPT GOING", with the day counted twice and a stray hash on it.
      title: clean(head.replace(/^#\s*Mission\s*\d+\s*[-–—:]\s*/i, '').replace(/^#\s*/, '')),
      card: {
        header: field('Header', body),
        title: field('Card title', body),
        goNow: field('Go now', body),
        body: field('Card body', body),
        objective: field('Objective', body),
      },
      glossary: wk.glossary,
      primer: wk.primer,
      equations: wk.equations,
      crew: field('Crew on this mission - mission log', body),
      beats: beatsIn(body),
      deeper: deeperIn(body),
      // The five worked examples, from `### Worked examples - optional
      // mission-card panel`. The bible fences the whole panel as YAML — button
      // label, title and five examples with their steps — so it is parsed rather
      // than read field by field, which is what its own "Exact panel content"
      // heading asks for.
      worked: workedIn(body),
      stops: stopsIn(body),
      outcome: (() => {
        const a = body.findIndex(l => /^#{2,3} (?:[A-Z]+\d*\.\s*)?Mission outcome/.test(l));
        if(a < 0) return null;
        const b = body.findIndex((l, i) => i > a && /^#{2,4} /.test(l));
        const chunk = body.slice(a + 1, b < 0 ? a + 12 : b);
        // THE DECISION IS SOMETIMES A LABEL. Mars opens the outcome paragraph
        // with the words "Mission decision:"; Headwater, Ground Truth and the
        // rest write `**Mission decision:**` as a field, and put a `**Pre-card
        // beat:**` in front of it. Reading the section as one paragraph then
        // reported fifteen outcomes that "do not open Mission decision" in a
        // bible where every one of them does.
        const labelled = field('Mission decision', chunk);
        if(labelled) return `Mission decision: ${labelled}`;
        // OR IT IS PLAIN TEXT AFTER SOMETHING ELSE. Eleven Days opens the
        // section with `**Pre-card character beat:** …` and then writes the
        // decision as an ordinary paragraph, so reading the section whole put
        // the beat in front of it and fifteen outcomes read as though they never
        // named a decision at all.
        const at = chunk.findIndex(l => /^\s*Mission decision:/.test(l));
        const from = at >= 0 ? chunk.slice(at) : chunk;
        return clean(from.filter(l => l.trim() && !/^\*\*/.test(l)).join(' '))
          || clean(from.filter(l => l.trim()).join(' '));
      })(),
      metrics: {
        target: (field('Timer line template', body) ?? '').match(/TARGET\s+([\d:]+)/)?.[1] ?? null,
        event: field('Story event', body),
        deltas: field('Automatic bar change', body),
      },
      // BULLETS OR A PARAGRAPH. Mars and most of the others list the review as
      // `- ` bullets; Ground Truth, Headwater and Changeover write it as one
      // paragraph ending in `**Mission takeaway:** …`. Reading only bullets
      // reported "no quick concept review" against a section plainly headed
      // Quick concept review.
      review: (() => {
        const sec = section(body, /^#{2,3} (?:[A-Z]+\d*\.\s*)?Quick concept review/, 2);
        const b = bullets(sec);
        if(b.length) return b;
        const para = paragraphs(sec);
        if(!para.length) return [];
        // Keep the takeaway as its own entry, because that is the line the
        // debrief carries into the next shift and the book stores it separately.
        const out = [];
        for(const x of para){
          const at = x.search(/\*\*Mission takeaway/i);
          if(at > 0){ out.push(clean(x.slice(0, at))); out.push(clean(x.slice(at))); }
          else out.push(x);
        }
        return out.filter(Boolean);
      })(),
      body,
    };
  });
  /**
   * The fixtures the campaign declares, from section 3's table.
   *
   * A BIBLE MAY NAME AN OBJECT THAT DOES NOT EXIST YET, and should: it is the
   * design source, and a stop that needs a fit-board should get a fit-board
   * built rather than be repointed at whatever the world happens to have. What
   * it cannot do is name one and say nothing else, because a fixture is a real
   * object in a real room — an id, the place it stands in, what kind of thing it
   * is, and the caption a player reads on it. Four of those five are the
   * bible's; only `along` (where on the wall) is the implementation's.
   *
   * Read from any table in the document whose header names a fixture column.
   */
  const fixtures = (() => {
    const out = [];
    let head = null;
    // THE PLACE MAY BE THE HEADING OVER THE TABLE. Boomtown gives every row an
    // Area column; Wildtype writes one table per area under `## CLINIC — Field
    // Clinic`, with no place column at all — so every one of its thirty-six
    // objects came back with no place and the whole campaign collapsed into a
    // single room. The last area heading seen is the place for a table that
    // does not name one.
    let heading = '';
    for(const raw of lines){
      const l = raw.trim();
      const sect = /^#{2,3}\s+([A-Z][A-Z0-9_]{1,11})\s+[-–—]\s+(.+)$/.exec(l);
      if(sect) heading = sect[1];
      // A BLANK LINE BETWEEN ROWS IS STILL ONE TABLE. Boomtown spaces its
      // fixture table out for readability — every markdown renderer draws it as
      // one table — and a reader that forgot its header at the first gap saw
      // sixty rows with no header and read the campaign as declaring no objects
      // at all. Only real prose ends a table.
      if(!l){ continue; }
      if(!l.startsWith('|')){ head = null; continue; }
      const cells = l.split('|').slice(1, -1).map(c => clean(c).toLowerCase());
      if(!head){
        // A FIXTURE TABLE DECLARES A KIND. Section 3 also carries a location
        // table — place, name, what happens there, and a comma-separated list of
        // its fixtures — which has a place column and a fixture column and is not
        // a declaration of anything. Matching on those two alone read every one
        // of its rows as a fixture with no kind and no caption, and reported
        // fourteen such "omissions" across four bibles that had declared all of
        // them properly a hundred lines further down.
        // A CAPTION COLUMN DECLARES ONE JUST AS WELL AS A KIND COLUMN DOES.
        // Boomtown's table is `| Area | Place | Fixture | Caption |` — every
        // object in the campaign, one sentence each, and no `build` because its
        // §3.1 says what kind each office gets in prose instead. Required to
        // carry a kind, that table was not a fixture table at all and the
        // campaign read as declaring none. The location table this guard was
        // written against has a place column and a fixture column and no
        // caption, so it still does not qualify.
        if(cells.some(c => /fixture/.test(c))
          && cells.some(c => /kind|build|type/.test(c) || /what it is|caption|description/.test(c))){
          head = cells;
        }
        continue;
      }
      if(cells.every(c => /^-+$/.test(c.replace(/[: ]/g, '')))) continue;
      const raws = l.split('|').slice(1, -1).map(c => clean(c));
      const col = (re) => { const i = head.findIndex(h => re.test(h)); return i >= 0 ? raws[i] : null; };
      // AN ID COLUMN IS THE ID, and the fixture column is then the NAME. Wildtype
      // writes `| ID | Fixture | Build | Wall | Exact caption |` — `sample-bench`
      // beside "Sample Bench" — and reading the fixture column as the id gave
      // "Sample Bench", which is not an id, so all thirty-six of its declared
      // objects were skipped and the campaign read as declaring none.
      const said = col(/^id$/) ?? col(/fixture/);
      const name = col(/fixture/) ?? '';
      // Where the bible names its objects only in words — Boomtown's "Budget
      // Desk" — the id is that name slugged, which is what every stop's
      // placement line resolves against anyway.
      const clean1 = String(said ?? '').replace(/`/g, '').trim();
      const id = /^[a-z][a-z0-9-]*$/.test(clean1)
        ? clean1
        : clean1.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if(!id || !/^[a-z][a-z0-9-]*$/.test(id)) continue;
      out.push({
        id,
        name: name.replace(/`/g, '').trim(),
        place: col(/place|room|area/) || heading || '',
        build: (col(/kind|build|type/) ?? '').toLowerCase(),
        wall: (col(/^wall$/) ?? '').toLowerCase(),
        caption: col(/what it is|caption|description/) ?? '',
      });
    }
    return out;
  })();

  /**
   * The cast, from the character bible's own headings.
   *
   * `### Mara Venn - Board Chair and mission authority` — a name and the job
   * beside it, which is the same shape every one of these bibles uses and the
   * same thing the Go-now line has to carry. Read here because a stop placed
   * "asked by Lina Saye" needs a roster id, and an edition that inherited the
   * base game's cast has never heard of her.
   */
  const cast = (() => {
    const out = [];
    const push = (rawName, role, more = {}) => {
      // `Dr. Lena Ortiz (she/her; Ortiz)` — the parenthetical carries pronouns
      // and the name the prose actually uses, and neither belongs in the name.
      // The short name after the semicolon is the better id when it is there,
      // because it is what the stop placements say.
      const paren = (String(rawName).match(/\(([^)]*)\)/) ?? [])[1] ?? '';
      const shortName = (paren.split(';')[1] ?? '').trim();
      const name = String(rawName).replace(/\s*\([^)]*\)/, '').replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, '').trim();
      const words = name.trim().split(/\s+/);
      // A heading is a person only if it reads like one: two or three words, no
      // connectives. "Opening sequence", "Worth knowing first" and "Post-mission
      // metric screen" are sections, and all three were coming back as cast.
      if(words.length < 2 || words.length > 3) return;
      if(/\b(and|the|of|for|first|screen|sequence|intent|summary|plan|beat|review)\b/i.test(name)) return;
      // NOR IS A SECTION WITH A JOB-SHAPED SUBTITLE. `### Optional worked
      // examples — exact player copy` reads as a three-word name and a role, and
      // went onto the roster as a person called "Optional worked examples" whose
      // job was "exact player copy". A person's role is a job; these words only
      // ever describe a piece of the document.
      if(/\b(examples?|copy|panel|card|block|notes?|template|matrix|ledger|spine)\b/i
         .test(`${name} ${role ?? ''}`)) return;
      const id = (shortName || words[words.length - 1]).toLowerCase().replace(/[^a-z]/g, '');
      if(!id || out.some(p => p.id === id)) return;
      // THE REST OF THE ENTRY, because a person is more than a job title. Every
      // bible writes what each one wants, the blind spot they start with and
      // the arc off it, a line they keep saying, and — in one of them — the
      // division outright. All of it was being read and thrown away, and the
      // roster then shipped a stub whose own last sentence said it was one.
      const extra = {};
      for(const [k, v] of Object.entries(more ?? {})){
        const said = clean(v).trim();
        if(said) extra[k] = said;
      }
      out.push({ id, name: clean(name).trim(), role: clean(role).replace(/\.$/, ''), ...extra });
    };
    // A TABLE OR A RUN OF HEADINGS. Four of the eight write the character bible
    // as `### Name - job`; the other four write it as a table with a Name column
    // and a working role beside it. Reading only the headings found three
    // "people" in each of those, all of them section titles.
    let head = null;
    for(const raw of lines){
      const l = raw.trim();
      if(!l.startsWith('|')){ head = null; continue; }
      const cells = l.split('|').slice(1, -1).map(c => clean(c));
      const lower = cells.map(c => c.toLowerCase());
      if(!head){
        // "Name" or "Character", and a column that says what they do. Ground
        // Truth and Headwater head the column `Character` and pack the pronouns
        // and the short name into the cell — `Dr. Lena Ortiz (she/her; Ortiz)` —
        // so both the header and the cell need reading loosely.
        if(lower.some(c => /^(name|character)$/.test(c)) && lower.some(c => /role|job|entrance/.test(c))) head = lower;
        continue;
      }
      if(cells.every(c => /^-+$/.test(c.replace(/[: ]/g, '')))) continue;
      const at = head.findIndex(h => /^(name|character)$/.test(h));
      const rl = head.findIndex(h => /role|job|entrance/.test(h));
      const col = (re) => { const i = head.findIndex(h => re.test(h)); return i >= 0 ? cells[i] : ''; };
      if(at >= 0 && cells[at]) push(cells[at], rl >= 0 ? cells[rl] : '', {
        pronouns: col(/pronoun/), wants: col(/^wants/), arc: col(/blind spot|arc/),
        habit: col(/verbal habit|habit|catchphrase/), division: col(/^division|^area|^group/),
      });
    }
    for(let i = 0; i < lines.length; i++){
      /**
       * `### Name — role`, OR `### Name` with the role in its body.
       *
       * Eight bibles write the job on the heading; Whiteout writes the heading as
       * the name alone and then `**Display name:**`, `**Role:**`, `**Area
       * ownership:**` beneath it — which is the more explicit shape and read
       * strictly gave a cast of nobody. The heading is a name either way; the
       * role comes from the dash where there is one and from the field where
       * there is not.
       */
      const m = lines[i].match(/^###\s+([A-Z][\p{L}'.\- ]{2,40}?)(?:\s+[-–—]\s+(.+))?$/u);
      if(!m) continue;
      // A HEADING WITH NO JOB IS NOT A PERSON. Reading the name-only form let
      // `### Opening implementation state` onto the roster — three words, no
      // connective, and a section rather than somebody. An entry has a role,
      // either on the heading or as a field beneath it.
      const roleAt = lines.slice(i + 1).findIndex(l => /^#{1,3}\s/.test(l));
      const entry = lines.slice(i + 1, roleAt < 0 ? lines.length : i + 1 + roleAt).join('\n');
      if(!m[2] && !/\*\*\s*(?:Role|Job)\s*:\*\*/i.test(entry)) continue;
      // AND A NAME IS CAPITALISED ALL THE WAY THROUGH. The dash form gets past
      // the rule above on its own: `### Course supplement — transparent ungraded
      // reference` is a heading with a job, so Overwind's cast came out seven
      // people of whom one was a section of the document, with a bio of "Course
      // supplement" and an area chosen for it because something had to be. A
      // person's name capitalises every word; a section heading does not. The
      // particles are the exception a name actually has.
      const PARTICLE = /^(?:de|del|della|van|von|der|den|di|da|dos|la|le|du|bin|ibn|al|of|the)$/i;
      const named = clean(m[1]).split(/\s+/).filter(Boolean);
      if(named.length > 1 && named.slice(1).some(w => /^[a-z]/.test(w) && !PARTICLE.test(w))) continue;
      // The entry's own body, to the next heading. The fields are written as
      // `**Wants:** …` and several share a line, so each is taken up to the
      // next bold label rather than to the end of the line.
      let body = '';
      for(let k = i + 1; k < lines.length && !/^#{1,3}\s/.test(lines[k]); k++) body += lines[k] + '\n';
      const field = (re) => {
        const f = new RegExp(`\\*\\*\\s*(?:${re})\\s*:\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*[^*]+:\\*\\*|\\n\\s*\\n|$)`, 'i')
          .exec(body);
        // THE NEXT BULLET'S DASH IS NOT PART OF THIS FIELD. Whiteout writes each
        // one as its own list item — `- **Role:** Station director` — so a field
        // read up to the next bold label ends "…director -", and every role and
        // division in the roster arrived with a hyphen glued to it.
        return f ? f[1].replace(/\s+/g, ' ').replace(/\s*[-–—]\s*$/, '').trim() : '';
      };
      push(clean(m[1]), m[2] || field('Role|Job'), {
        pronouns: field('Pronouns'), wants: field('Wants'),
        arc: [field('Blind spot'), field('Arc')].filter(Boolean).join(' '),
        habit: field('Verbal habit'),
        // `Area ownership` is Whiteout's word for the division a person belongs
        // to, and it is the field the roster is grouped by.
        division: (field('Division') || field('Area ownership')).replace(/[`.]/g, '').trim(),
        entrance: field('First entrance'),
        use: field('Gameplay use') || field('Gameplay necessity'),
      });
    }
    return out;
  })();

  /**
   * WHO OWNS EACH GROUP, where the bible says so outright.
   *
   * A late section headed "Build reachability corrections" lists
   * `` `COMMON` roster owner: Mara Voss `` — the author naming the person whose
   * presence makes that group's person stops reachable. It is authoritative and
   * it is not a guess out of a job title, so it wins over every reading of a
   * role. Absent in one bible, present three to six times in the rest.
   */
  const owners = (() => {
    const out = {};
    for(const l of lines){
      const m = /^-\s*`([A-Z][A-Z0-9_]*)`\s+roster owner:\s*(.+?)\.?\s*$/.exec(l.trim());
      if(m) out[m[1]] = clean(m[2]).trim();
    }
    return out;
  })();

  // The campaign opener, which is its own five sentences and not a mission's.
  // `### Opening sequence` in eight bibles, `## Opening card — exact player copy`
  // in the ninth. Same section, and it is the first thing a player reads.
  const opener = paragraphs(section(lines, /^#{2,3} Opening (?:sequence|card)/, 3))[0] ?? null;
  return { file, lines, opener, fixtures, cast, owners, missions };
}
