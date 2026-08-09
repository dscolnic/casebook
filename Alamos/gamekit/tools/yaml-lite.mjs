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
//   key: |                a literal block: newlines kept
//   key: >                a folded block: newlines become spaces
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
      out.push(scalar(rest));
      i++;
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
    out.push(scalar(rest));
    i++;
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
      out[key] = rest.endsWith('-') ? text.replace(/\n+$/, '') : text;
      i = next;
      continue;
    }
    if(rest === ''){
      const [v, next] = parseBlock(lines, i + 1, indent + 1);
      out[key] = v ?? null;
      i = next;
      continue;
    }
    out[key] = scalar(rest);
    i++;
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
    return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
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
    const out = {};
    for(const pair of splitTop(body)){
      const at = pair.indexOf(':');
      if(at < 0) continue;
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
