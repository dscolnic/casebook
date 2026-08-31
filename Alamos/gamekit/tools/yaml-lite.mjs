// yaml-lite.mjs — enough YAML to read a book, and no more.
//
// The repo has no runtime dependencies and tools/docx.mjs already reads a Word
// file by shelling out to unzip rather than pulling in a library. This keeps
// that bargain for the authoring format: a book is a plain file a person or a
// model can type, and reading it costs no dependency.
//
// What it supports, which is what tools/BOOK_TEMPLATE.md uses:
//
//   key: value            scalars — plain, 'single', "double", numbers, true/false/null
//   key:                  nested mapping, by indentation
//     inner: 1
//   key:                  sequence, by indentation
//     - one
//     - id: two           a sequence of mappings
//       name: Two
//   key: [a, b, c]        an inline list of simple scalars
//   key: { a: 1, b: two } an inline mapping — one short record on one line
//   - { a: 1, b: two }    a sequence of them, which is how readings are written
//   key: { a: 1,        a flow collection wrapped by its writer at a column
//          b: two }     limit, continued on the following, more indented lines
//   key: |                a literal block: newlines kept
//   key: >                a folded block: newlines become spaces
//   key: a long value     a plain scalar continued on the following, more
//     continued here      indented lines — which is what every YAML writer
//                         emits for a sentence that does not fit a line
//   # comment             to end of line, outside quotes
//
// What it deliberately does not support: anchors, aliases, tags, multiple
// documents, nested flow collections, complex keys. If a book needs one of those, the
// book is doing something the game does not need.

export function parseYaml(text){
  const lines = [];
  for(const raw of String(text).replace(/\r\n?/g, '\n').split('\n')){
    lines.push(raw);
  }
  const [value] = parseBlock(lines, 0, indentOf(firstContent(lines)));
  return value ?? {};
}

function firstContent(lines){
  for(const l of lines) if(content(l) !== null) return l;
  return '';
}
const TAB = /\t/;
function indentOf(line){ return line.length - line.replace(/^ +/, '').length; }

/** The line with its comment stripped, or null if it carries nothing. */
function content(line){
  if(TAB.test(line.replace(/^( *)/, '$1'))) { /* tabs are legal inside values */ }
  let out = '', quote = null;
  for(let i = 0; i < line.length; i++){
    const c = line[i];
    if(quote){
      out += c;
      if(c === quote && line[i - 1] !== '\\') quote = null;
      continue;
    }
    if(c === '"' || c === "'"){ quote = c; out += c; continue; }
    // A '#' only starts a comment at the start of the line or after a space.
    if(c === '#' && (i === 0 || /\s/.test(line[i - 1]))) break;
    out += c;
  }
  return out.trim() ? out.replace(/\s+$/, '') : null;
}

/**
 * A plain or quoted scalar continued on the following lines.
 *
 * YAML wraps a long sentence by indenting the rest of it, and every writer
 * emits that. This read only the first line, so a book full of wrapped
 * `briefing`, `scene` and `why` fields lost the second half of each of them
 * mid-sentence — no error, and no way to see it except by reading the game.
 *
 * A continuation is any deeper line that is not itself a `key:` or a `- item`.
 * Inside quotes it is simpler: everything up to the closing quote continues.
 */
function continueScalar(lines, i, indent, first){
  let text = first;
  const q = /^["']/.test(first) ? first[0] : null;
  const closed = () => q ? quoteClosed(text) : false;
  if(q && closed()) return [text, i];
  while(i < lines.length){
    const c = content(lines[i]);
    if(c === null){ if(q){ i++; continue; } break; }
    const here = indentOf(lines[i]);
    if(here <= indent) break;
    const t = c.trim();
    if(!q){
      if(t.startsWith('- ') || t === '-') break;
      if(/^("[^"]*"|'[^']*'|[^:#]+):(\s|$)/.test(t)) break;
    }
    // Inside double quotes a line break folds to a space, and a trailing `\`
    // says "no space here" while a leading `\ ` says "a literal space here".
    // Writers emit both when a wrapped line would otherwise lose a space, and
    // left in they read as `protect\ \ the city` in the middle of a sentence.
    if(q === '"' && /(^|[^\\])\\$/.test(text)){
      text = text.slice(0, -1) + t.replace(/^\\/, '');
    } else {
      text += ' ' + (q === '"' ? t.replace(/^\\(?=\s|$)/, '') : t);
    }
    i++;
    if(q && closed()) break;
  }
  return [text, i];
}

/**
 * A flow collection — `{ … }` or `[ … ]` — continued on the following lines.
 *
 * yaml-lite read only the line the brace opened on, so a flow map a writer had
 * wrapped at its column limit arrived as the *string* `"{label: A bend in the
 * cable at that point, mechanism: Light leaves the core where the fibre is"`.
 * That is a valid string, so `choices` was still a four-item list and nothing
 * downstream could tell: the importer's own "the answer names a candidate that
 * is not on the list" was the only thing that ever saw it, and only because the
 * answer happened to be a label. Four books in the repo are wrapped this way.
 *
 * A continuation is any deeper line, joined with a single space, until the
 * brackets balance — which is how YAML folds a plain scalar in flow context.
 */
function continueFlow(lines, i, indent, first){
  let text = first;
  while(i < lines.length && !flowClosed(text)){
    const c = content(lines[i]);
    if(c === null){ i++; continue; }
    if(indentOf(lines[i]) <= indent) break;
    text += ' ' + c.trim();
    i++;
  }
  return [text, i];
}

/**
 * True when a scalar that opens with a quote has met its closing quote.
 *
 * Shared with `continueScalar` on purpose: `parseSequence` has to ask the same
 * question one line earlier — before it decides whether a dash carries a scalar
 * or a mapping — and two spellings of "is this quote closed" would drift the
 * first time either was corrected.
 */
function quoteClosed(text){
  const q = /^["']/.test(text) ? text[0] : null;
  if(!q) return true;
  const body = text.slice(1);
  if(!body) return false;
  // Doubled quotes inside a single-quoted scalar are an escape, not the end.
  return q === "'" ? /'$/.test(body) && !/''$/.test(body) : /(^|[^\\])"$/.test(body);
}

/** True when every `{`/`[` outside quotes has been closed. */
function flowClosed(s){
  let depth = 0, quote = null;
  for(let i = 0; i < s.length; i++){
    const c = s[i];
    if(quote){ if(c === quote && s[i - 1] !== '\\') quote = null; continue; }
    if(c === '"' || c === "'"){ quote = c; continue; }
    if(c === '{' || c === '[') depth++;
    else if(c === '}' || c === ']') depth--;
  }
  return depth <= 0;
}

/** The next line that carries anything, or the end. */
function skipBlank(lines, i){
  while(i < lines.length && content(lines[i]) === null) i++;
  return i;
}

/**
 * Parse everything at `indent` starting at line `i`.
 * Returns [value, nextLineIndex].
 */
function parseBlock(lines, i, indent){
  // skip blanks and comment-only lines
  while(i < lines.length && content(lines[i]) === null) i++;
  if(i >= lines.length) return [null, i];

  const line = content(lines[i]);
  const here = indentOf(lines[i]);
  if(here < indent) return [null, i];

  if(line.trimStart().startsWith('- ') || line.trim() === '-'){
    return parseSequence(lines, i, here);
  }
  return parseMapping(lines, i, here);
}

function parseSequence(lines, i, indent){
  const out = [];
  while(i < lines.length){
    const c = content(lines[i]);
    if(c === null){ i++; continue; }
    if(indentOf(lines[i]) < indent) break;
    if(indentOf(lines[i]) > indent){ i++; continue; }        // belongs to the item below
    const t = c.trim();
    if(!t.startsWith('-')) break;

    const rest = t.replace(/^-\s*/, '');
    if(!rest){
      // "-" alone: the item is the indented block under it.
      const [v, next] = parseBlock(lines, i + 1, indent + 1);
      out.push(v); i = next; continue;
    }
    // A flow value on the dash — `- { label: A, text: … }` or `- [1, 2]` — is a
    // scalar, not the first key of a block mapping. Without this the brace was
    // read as the start of an indented mapping and every candidate list in the
    // first book came out empty.
    if(rest.startsWith('{') || rest.startsWith('[')){
      const [flowText, afterFlow] = continueFlow(lines, i + 1, indent, rest);
      out.push(scalar(flowText));
      i = afterFlow;
      continue;
    }
    // A nested sequence: `- - first`. The item is a list of its own, starting at
    // the inner dash. Project Y's diagnosis packs pair each candidate with the
    // readings that rule it out, which is a list of lists, and without this the
    // inner list came back as the string "- first".
    if(/^-\s+\S/.test(rest) || rest === '-'){
      const inner = indent + 2;                     // where the inner dash sits
      const synthetic = [' '.repeat(inner) + rest, ...lines.slice(i + 1)];
      const [v, next] = parseSequence(synthetic, 0, inner);
      out.push(v);
      i = next === 0 ? i + 1 : i + next;
      continue;
    }
    // A block scalar on the dash — `- >-` and its three siblings — is the item
    // itself, folded out of the lines beneath it. Without this the item came back
    // as the literal string ">-" and the prose under it was read as a *deeper*
    // block and skipped, so a four-paragraph `background:` list arrived as four
    // paragraphs each beginning ">- " with the folding never applied. Same class
    // of defect as the comma-split flow map: what reaches the game is a valid
    // string, so nothing downstream can tell.
    if(rest === '|' || rest === '>' || rest === '|-' || rest === '>-'){
      const [text, next] = readBlockScalar(lines, i + 1, indent, rest.startsWith('>'));
      out.push(rest.endsWith('-') ? text.replace(/\n+$/, '') : text);
      i = next;
      continue;
    }
    // A quoted scalar on the dash is a scalar even when it contains a colon.
    // The mapping test below only knows "something, a colon, a space", which a
    // sentence in quotes satisfies — one rebuttal reading "…the most expensive:
    // reheating a cold cabin…" was imported as a single-key object and rendered
    // as [object Object] in the verdict. A quoted key is still a key, so this
    // only claims the item when nothing follows the closing quote.
    const quoted = /^('([^']|'')*'|"(\\.|[^"\\])*")\s*$/.exec(rest);
    if(quoted){
      out.push(scalar(rest.trim()));
      i++;
      continue;
    }
    // The same scalar, wrapped by its writer so the closing quote is on a later
    // line. The mapping test below claims it — a quoted sentence containing
    // "…in question: the same cone…" is "something, a colon, a space" — and one
    // rebuttal in the catalogue arrived as a single-key object and rendered as
    // [object Object] in the verdict. Exactly the defect the one-line `quoted`
    // guard above was written for, one line further on.
    if(/^["']/.test(rest) && !quoteClosed(rest)){
      const [full, after] = continueScalar(lines, i + 1, indent, rest);
      out.push(scalar(full));
      i = after;
      continue;
    }
    if(/^[^:\s][^:]*:(\s|$)/.test(rest)){
      // "- key: value" — the item is a mapping whose first key is on this line.
      const synthetic = [' '.repeat(indent + 2) + rest, ...lines.slice(i + 1)];
      const [v, next] = parseMapping(synthetic, 0, indent + 2);
      out.push(v);
      i = next === 0 ? i + 1 : i + next;                      // next is relative to `synthetic`
      continue;
    }
    const [full, after] = continueScalar(lines, i + 1, indent, rest);
    out.push(scalar(full));
    i = after;
  }
  return [out, i];
}

function parseMapping(lines, i, indent){
  const out = {};
  while(i < lines.length){
    const c = content(lines[i]);
    if(c === null){ i++; continue; }
    const here = indentOf(lines[i]);
    if(here < indent) break;
    if(here > indent){ i++; continue; }
    const t = c.trim();
    if(t.startsWith('- ')) break;

    const m = /^("[^"]*"|'[^']*'|[^:]+):\s*(.*)$/.exec(t);
    if(!m){ i++; continue; }
    const key = scalar(m[1]);
    const rest = m[2];

    if(rest === '|' || rest === '>' || rest === '|-' || rest === '>-'){
      const [text, next] = readBlockScalar(lines, i + 1, indent, rest[0] === '>');
      // A `|` or `>` block keeps exactly one trailing newline (YAML calls it
      // clipping); `|-` and `>-` strip it. Dropping it entirely was invisible
      // in the game and made the parser disagree with every other reader.
      out[key] = rest.endsWith('-') ? text.replace(/\n+$/, '') : text.replace(/\n*$/, '\n');
      i = next;
      continue;
    }
    if(rest === ''){
      // A sequence may sit at the *same* indent as its key — YAML allows it and
      // most writers emit it:
      //
      //   groups:
      //   - id: CLIN
      //
      // Read as a nested block that has to be deeper, this returned nothing and
      // the next line ended the mapping, so a whole book parsed as `{}` and the
      // importer reported "no groups, no missions" on a file that had both.
      const j = skipBlank(lines, i + 1);
      const flush = j < lines.length && indentOf(lines[j]) === indent
                    && /^-(\s|$)/.test(content(lines[j]).trim());
      const [v, next] = flush
        ? parseSequence(lines, j, indent)
        : parseBlock(lines, i + 1, indent + 1);
      out[key] = v ?? null;
      i = next;
      continue;
    }
    if(rest.startsWith('{') || rest.startsWith('[')){
      const [flowText, afterFlow] = continueFlow(lines, i + 1, indent, rest);
      out[key] = scalar(flowText);
      i = afterFlow;
      continue;
    }
    const [full, after] = continueScalar(lines, i + 1, indent, rest);
    out[key] = scalar(full);
    i = after;
  }
  return [out, i];
}

function readBlockScalar(lines, i, parentIndent, folded){
  const parts = [];
  let inner = null;
  while(i < lines.length){
    const raw = lines[i];
    if(raw.trim() === ''){ parts.push(''); i++; continue; }
    const here = indentOf(raw);
    if(here <= parentIndent) break;
    if(inner === null) inner = here;
    parts.push(raw.slice(inner));
    i++;
  }
  while(parts.length && parts[parts.length - 1] === '') parts.pop();
  const text = folded
    ? parts.reduce((acc, l) => (l === '' ? acc + '\n\n' : (acc && !acc.endsWith('\n') ? acc + ' ' : acc) + l), '')
    : parts.join('\n');
  return [text, i];
}

function scalar(raw){
  const s = String(raw).trim();
  if(s.startsWith('"') && s.endsWith('"') && s.length > 1){
    // `’` and `\xB7` are how most writers emit a curly quote, a middle dot
    // or a Greek letter. Left undecoded they reach the game as those six
    // literal characters, in the middle of a sentence.
    return s.slice(1, -1)
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\');
  }
  if(s.startsWith("'") && s.endsWith("'") && s.length > 1) return s.slice(1, -1).replace(/''/g, "'");
  if(s.startsWith('[') && s.endsWith(']')){
    const body = s.slice(1, -1).trim();
    if(!body) return [];
    return splitTop(body).map(scalar);
  }
  // An inline mapping: `{ zone: Bilge, label: Level, value: '31 cm' }`. A
  // reading or a candidate is one short record and reads far better on one line
  // than as five indented ones — which is why BOOK_TEMPLATE.md is written this
  // way, and why the first book written to that template would not parse.
  if(s.startsWith('{') && s.endsWith('}')){
    const body = s.slice(1, -1).trim();
    if(!body) return {};
    const pairs = splitTop(body);
    // Nothing here is a `key: value` at all, so this was never a mapping — it is
    // a value that happens to be wrapped in braces. An unquoted estimate template
    // like {0} ÷ {1} is exactly this, and it used to parse to an empty object.
    if(!pairs.some(x => x.includes(':'))) return s;
    const out = {};
    for(const pair of pairs){
      const at = pair.indexOf(':');
      // Some fragments are pairs and this one is not, which has one cause: an
      // unquoted comma inside a value. `{ landmark: the second door, hinged
      // inward }` splits in two, the second half has no colon, and the landmark
      // quietly becomes "the second door". Nothing downstream can tell, because
      // what arrives is a perfectly valid shorter string — which is why this
      // shipped in three books before anybody noticed.
      if(at < 0){
        throw new Error(`inline map fragment "${pair}" has no colon in it, inside `
          + `{ ${body} } — an unquoted comma in a value splits it here. Quote the value.`);
      }
      out[scalar(pair.slice(0, at))] = scalar(pair.slice(at + 1));
    }
    return out;
  }
  if(s === 'true') return true;
  if(s === 'false') return false;
  if(s === 'null' || s === '~' || s === '') return null;
  if(/^-?\d+$/.test(s)) return parseInt(s, 10);
  if(/^-?\d*\.\d+(e[-+]?\d+)?$/i.test(s) || /^-?\d+e[-+]?\d+$/i.test(s)) return parseFloat(s);
  return s;
}

/** Split "a, b, [c, d]" on top-level commas, respecting quotes and brackets. */
function splitTop(s){
  const out = []; let depth = 0, quote = null, cur = '';
  for(const c of s){
    if(quote){ cur += c; if(c === quote) quote = null; continue; }
    if(c === '"' || c === "'"){ quote = c; cur += c; continue; }
    if(c === '[' || c === '{') depth++;
    if(c === ']' || c === '}') depth--;
    if(c === ',' && depth === 0){ out.push(cur); cur = ''; continue; }
    cur += c;
  }
  if(cur.trim()) out.push(cur);
  return out.map(x => x.trim());
}

// ----------------------------------------------------------------- selftest
//
//   node tools/yaml-lite.mjs --selftest
//
// A parser is the worst place in the repo for a silent inversion, because what
// it hands back is always a valid value of *some* shape. The wrapped flow map
// is the case that proves it: `- {label: A, mechanism: light leaves the core`
// followed by an indented `curved.}` came back as a four-item list of strings,
// so `choices.length` was right, `formatMix` was right, and the only thing in
// the repo that ever saw the damage was the importer asking whether the answer
// was one of the labels — and only because the answer happened to be a label.
//
// So the case here is an **equality** case, not a shape case: the same document
// written on one line and wrapped at a column limit has to parse to the same
// value. Each was verified by putting the bug back — reverting `continueFlow`
// to `out.push(scalar(rest)); i++` — and watching that case, and only that
// case, fail.
function selftest(){
  let bad = 0;
  const check = (name, got, want) => {
    const a = JSON.stringify(got), b = JSON.stringify(want);
    if(a === b) return;
    bad++;
    console.log(`  ✗ ${name}\n      got  ${a}\n      want ${b}`);
  };

  // The equality case, in a sequence: one line against the same record wrapped.
  const flat = parseYaml([
    'choices:',
    '  - {label: A bend at that point, mechanism: Light leaves the core where the fibre is tightly curved.}',
  ].join('\n'));
  const wrapped = parseYaml([
    'choices:',
    '  - {label: A bend at that point, mechanism: Light leaves the core where the fibre is ',
    '      tightly curved.}',
  ].join('\n'));
  check('a wrapped flow map in a sequence parses as the one-line one', wrapped, flat);
  check('and it is a mapping, not a string', typeof wrapped.choices[0], 'object');

  // The same, as a mapping value rather than a sequence item.
  check('a wrapped flow map as a value',
        parseYaml('estimate:\n  panel: {units: m/s,\n    slots: 2}\n'),
        parseYaml('estimate:\n  panel: {units: m/s, slots: 2}\n'));

  // And a wrapped flow *list*, which wraps for the same reason.
  check('a wrapped flow list',
        parseYaml('correct: [0,\n  1, 2]\n'),
        parseYaml('correct: [0, 1, 2]\n'));

  // The cases the fix must not disturb. A one-line flow map still parses, a
  // brace that is not a mapping is still the string it was — an unquoted
  // estimate template is exactly that — and the key *after* a closed flow map
  // is still read rather than swallowed as a continuation.
  check('a one-line flow map is untouched',
        parseYaml('r: {zone: Bilge, value: 31}\n'), { r: { zone: 'Bilge', value: 31 } });
  check('a braced value that is not a mapping stays a string',
        parseYaml('template: {0} ÷ {1}\n'), { template: '{0} ÷ {1}' });
  check('the next key after a closed flow map is still read',
        parseYaml('a: {x: 1}\nb: two\n'), { a: { x: 1 }, b: 'two' });
  check('the next item after a closed flow map is still read',
        parseYaml('rows:\n  - {x: 1}\n  - {x: 2}\n'), { rows: [{ x: 1 }, { x: 2 }] });

  // The same equality case for a quoted scalar in a sequence. The one-line
  // guard was already there; the wrapped one fell through to the mapping test,
  // because a quoted sentence with ": " inside it is "something, a colon, a
  // space". What came back was a single-key object — a valid value, rendered as
  // [object Object] in a verdict nobody diffs against the book.
  const flatQ = parseYaml("rebuttals:\n  - 'An unchanged angle is the case in question: the same cone covers four times the area.'\n");
  const wrapQ = parseYaml("rebuttals:\n  - 'An unchanged angle is the case in question: the same cone covers four\n    times the area.'\n");
  check('a wrapped quoted scalar in a sequence parses as the one-line one', wrapQ, flatQ);
  check('and it is a string, not a mapping', typeof wrapQ.rebuttals[0], 'string');
  // And the case the mapping test is still for: an UNquoted `- key: value` is
  // a mapping, wrapped or not.
  check('an unquoted "- key: value" is still a mapping',
        parseYaml('rows:\n  - label: A bend at that point\n    rule: product\n'),
        { rows: [{ label: 'A bend at that point', rule: 'product' }] });

  console.log(bad ? `yaml-lite: ${bad} selftest case(s) failed.`
                  : 'yaml-lite: wrapped flow collections read the same as one-line ones.');
  return bad;
}

if(process.argv[1] && process.argv[1].endsWith('yaml-lite.mjs')){
  if(process.argv.includes('--selftest')) process.exit(selftest() ? 1 : 0);
}
