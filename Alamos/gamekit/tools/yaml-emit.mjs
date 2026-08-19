// yaml-emit.mjs — write the subset of YAML that `yaml-lite.mjs` can read back.
//
// The pair is the point: anything this emits, `parseYaml` parses to the same
// value, and `tools/export-book.mjs` round-trips a whole game through both. So
// this is deliberately small — maps, lists, strings, numbers, booleans, null —
// and it never emits a construct the reader does not implement (anchors, flow
// maps, tags, multi-document files).
//
// Two rules that cost real defects in this repo:
//
//   * A plain scalar containing ": " parses as a MAP. Three verdicts shipped
//     reading "[object Object]" because of it, and `validateContent` now fails
//     on one. Anything risky is quoted or written as a block scalar.
//   * A long line is not a folded line. Prose is emitted as a literal block
//     (`|-`) rather than folded (`>-`), so a line break inside a paragraph can
//     never become a word break on re-read.

const RISKY = /^[\s>|@`%*&!#{}\[\],'"?:-]|: |[:#]\s|\s$|^$|^(true|false|null|yes|no|on|off|~)$/i;
const NUMBERISH = /^[+-]?(\d[\d_]*(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** One scalar, quoted only when it has to be. */
function scalar(value){
  if(value === null || value === undefined) return 'null';
  if(typeof value === 'boolean') return value ? 'true' : 'false';
  if(typeof value === 'number'){
    if(!Number.isFinite(value)) throw new Error(`cannot emit non-finite number ${value}`);
    return String(value);
  }
  const s = String(value);
  if(s.includes('\n')) return null;                   // caller writes a block scalar
  if(RISKY.test(s) || NUMBERISH.test(s)) return JSON.stringify(s);
  return s;
}

/** A multi-line string as a literal block, indented under its key. */
function block(text, indent){
  const pad = ' '.repeat(indent);
  const lines = String(text).replace(/\s+$/, '').split('\n');
  // `|-` keeps every break and strips the trailing newline. A line that is only
  // spaces would change meaning on re-read, so it is emitted empty.
  return `|-\n` + lines.map(l => (l.trim() ? pad + l : '')).join('\n');
}

/**
 * A list of numbers or booleans, as an inline flow list.
 *
 * This is not cosmetic: a figure's points are `[[0, 42], [4, 40], …]`, and the
 * reader supports an inline list but not a nested block one — so a nested array
 * written as `- - 0` came back as the string "- 0" and forty-one figures lost
 * their y values. Flow form round-trips, and the reader documents it.
 */
const isFlowable = (v) => Array.isArray(v) && v.length > 0
  && v.every(x => typeof x === 'number' && Number.isFinite(x) || typeof x === 'boolean');
const flow = (v) => `[${v.map(x => (typeof x === 'boolean' ? (x ? 'true' : 'false') : String(x))).join(', ')}]`;

/**
 * Every container on the path down to the value being emitted.
 *
 * A value that contains itself recurses until the stack goes, and the report is
 * two hundred identical frames of `emitValue` and no clue which key did it —
 * which is what nine conversion sheets produced, on seven different games, for
 * a defect that turned out to be one line in the caller. The guard costs a Set
 * add per node and turns that into a sentence naming the key.
 */
function emitValue(value, indent, out, seen = new Set(), path = ''){
  const pad = ' '.repeat(indent);
  if(value !== null && typeof value === 'object'){
    if(seen.has(value)){
      throw new Error(`yaml-emit: \`${path || '<root>'}\` contains itself — a cycle cannot be`
        + ' written as YAML, and the value handed in is the bug rather than this');
    }
    seen = new Set(seen).add(value);
  }
  if(Array.isArray(value)){
    if(!value.length){ out[out.length - 1] += ' []'; return; }
    for(const item of value){
      if(isFlowable(item)){ out.push(`${pad}- ${flow(item)}`); continue; }
      if(isPlainObject(item) || Array.isArray(item)){
        out.push(`${pad}-`);
        const at = out.length - 1;
        const inner = [];
        emitValue(item, indent + 2, inner, seen, `${path}[${value.indexOf(item)}]`);
        // hoist the first line onto the dash, which is how the reader expects it
        // — including a nested list, which becomes `- - first`.
        const first = inner.shift() ?? '';
        out[at] = `${pad}- ${first.trim()}`;
        out.push(...inner);
      } else {
        const s = scalar(item);
        if(s === null){ out.push(`${pad}- ${block(item, indent + 4)}`); }
        else out.push(`${pad}- ${s}`);
      }
    }
    return;
  }
  if(isPlainObject(value)){
    for(const [k, v] of Object.entries(value)){
      if(v === undefined) continue;
      if(Array.isArray(v)){
        if(!v.length){ out.push(`${pad}${k}: []`); continue; }
        if(isFlowable(v)){ out.push(`${pad}${k}: ${flow(v)}`); continue; }
        out.push(`${pad}${k}:`);
        emitValue(v, indent + 2, out, seen, path ? `${path}.${k}` : k);
      } else if(isPlainObject(v)){
        if(!Object.keys(v).length){ out.push(`${pad}${k}: {}`); continue; }
        out.push(`${pad}${k}:`);
        emitValue(v, indent + 2, out, seen, path ? `${path}.${k}` : k);
      } else {
        const s = scalar(v);
        if(s === null) out.push(`${pad}${k}: ${block(v, indent + 2)}`);
        else out.push(`${pad}${k}: ${s}`);
      }
    }
    return;
  }
  const s = scalar(value);
  out.push(s === null ? block(value, indent) : `${pad}${s}`);
}

/** A whole document. `comments` maps a top-level key to a line written above it. */
export function emitYaml(doc, comments = {}){
  const out = [];
  for(const [k, v] of Object.entries(doc)){
    if(v === undefined) continue;
    if(comments[k]) out.push('', `# ${comments[k]}`);
    if(Array.isArray(v)){
      if(!v.length){ out.push(`${k}: []`); continue; }
      if(isFlowable(v)){ out.push(`${k}: ${flow(v)}`); continue; }
      out.push(`${k}:`);
      emitValue(v, 2, out, new Set([doc]), k);
    } else if(isPlainObject(v)){
      if(!Object.keys(v).length){ out.push(`${k}: {}`); continue; }
      out.push(`${k}:`);
      emitValue(v, 2, out, new Set([doc]), k);
    } else {
      const s = scalar(v);
      out.push(s === null ? `${k}: ${block(v, 2)}` : `${k}: ${s}`);
    }
  }
  return out.join('\n').replace(/^\n/, '') + '\n';
}
