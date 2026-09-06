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
function field(label, from){
  const re = new RegExp(`\\*\\*${label}:?\\*\\*\\s*(.*)$`);
  for(let i = 0; i < from.length; i++){
    if(!new RegExp(`\\*\\*${label}:?\\*\\*`).test(from[i])) continue;
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
    const next = k + 1 < heads.length ? heads[k + 1][1] : body.length;
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

/** The `Worth knowing first` block: glossary, primer, equations. */
function worthKnowing(body){
  const glossary = paragraphs(section(body, /^#### Glossary terms/)).map(p => {
    const at = p.indexOf(': ');
    if(at < 0) return null;
    return { term: p.slice(0, at).trim(), def: p.slice(at + 2).trim() };
  }).filter(Boolean);
  const primer = bullets(section(body, /^#### Primer concepts/));
  // Equations come as repeated four-field groups, so they are split on the
  // `**Equation:**` label rather than read with `field`, which finds the first.
  const eqLines = section(body, /^#### Equations first needed today/);
  const marks = eqLines.map((l, i) => [l, i]).filter(([l]) => /^\*\*Equation:\*\*/.test(l));
  const equations = marks.map(([, i], k) => {
    const chunk = eqLines.slice(i, k + 1 < marks.length ? marks[k + 1][1] : eqLines.length);
    return {
      e: field('Equation', chunk),
      c: field('What it is for', chunk),
      v: field('Symbols', chunk),
      s: field('Why this campaign needs it', chunk),
    };
  });
  return { glossary, primer, equations };
}

/** One mission's stops. */
function stopsIn(body){
  // AN EM DASH IS ALSO A DASH. Ground Truth heads every stop `## Stop 1 — Fix
  // the signs`, and a reader that only knew the hyphen found 48 of its 60 stops
  // and reported the campaign as twelve stops short.
  const HEAD = /^#{2,3} Stop \d+\s*[-–—:]\s*/;
  const heads = body.map((l, i) => [l, i]).filter(([l]) => HEAD.test(l));
  return heads.map(([head, i], k) => {
    const next = k + 1 < heads.length ? heads[k + 1][1] : body.length;
    const chunk = body.slice(i, next);
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
      concept: metaOf('Concept'),
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
        // Or keyed to each option inside the board, which is the better shape.
        ?? ((fence(chunk) ?? '').match(/^rebuttals:/m) ? 'in the interaction block, keyed per option' : null),
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
      payload: fence(chunk) ?? backticked(anyField(
        ['Complete format-specific interaction block', 'Payload'], chunk)),
      choices: (() => {
        // THE BOARD MAY CARRY THEM. Eleven Days writes its CHOICE stops as a
        // payload — question, choices, answer, why, and one rebuttal keyed to
        // each wrong option — rather than as a `**Choices:**` list with the
        // rebuttals in a separate paragraph. That is the more explicit shape and
        // it is the one that was asked for, so it is read here rather than
        // reported as a stop with no options and no feedback.
        const pay = fence(chunk) ?? '';
        const cm = pay.match(/^choices:\s*$([\s\S]*?)^(?=\w|$)/m);
        if(cm){
          const items = [...cm[1].matchAll(/^\s*-\s+(.+)$/gm)].map(x => clean(x[1]).replace(/^["']|["']$/g, ''));
          const key = clean((pay.match(/^answer:\s*(.+)$/m) ?? [])[1] ?? '').replace(/^["']|["']$/g, '');
          if(items.length) return items.map(t => ({ text: t, correct: !!key && flatEq(t, key) }));
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
      title: clean(head.replace(/^# Mission \d+\s*-\s*/, '')),
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
      stops: stopsIn(body),
      outcome: (() => {
        const a = body.findIndex(l => /^#{2,3} Mission outcome/.test(l));
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
        const sec = section(body, /^#{2,3} Quick concept review/, 2);
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
    for(const raw of lines){
      const l = raw.trim();
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
        if(cells.some(c => /fixture/.test(c)) && cells.some(c => /kind|build|type/.test(c))) head = cells;
        continue;
      }
      if(cells.every(c => /^-+$/.test(c.replace(/[: ]/g, '')))) continue;
      const raws = l.split('|').slice(1, -1).map(c => clean(c));
      const col = (re) => { const i = head.findIndex(h => re.test(h)); return i >= 0 ? raws[i] : null; };
      const id = col(/fixture/);
      if(!id || !/^[a-z][a-z0-9-]*$/.test(id.replace(/`/g, ''))) continue;
      out.push({
        id: id.replace(/`/g, ''),
        place: col(/place|room|area/) ?? '',
        build: (col(/kind|build|type/) ?? '').toLowerCase(),
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
    const push = (rawName, role) => {
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
      const id = (shortName || words[words.length - 1]).toLowerCase().replace(/[^a-z]/g, '');
      if(!id || out.some(p => p.id === id)) return;
      out.push({ id, name: clean(name).trim(), role: clean(role).replace(/\.$/, '') });
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
      if(at >= 0 && cells[at]) push(cells[at], rl >= 0 ? cells[rl] : '');
    }
    for(const l of lines){
      const m = l.match(/^###\s+([A-Z][\p{L}'.\- ]{2,40}?)\s+[-–—]\s+(.+)$/u);
      if(!m) continue;
      push(clean(m[1]), m[2]);
    }
    return out;
  })();

  // The campaign opener, which is its own five sentences and not a mission's.
  const opener = paragraphs(section(lines, /^### Opening sequence/, 3))[0] ?? null;
  return { file, lines, opener, fixtures, cast, missions };
}
