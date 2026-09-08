// _payload.mjs — read the board a stop actually authored for itself.
//
// WHY THIS EXISTS. The bibles' §7 answered the first handback with one board per
// FORMAT — the same numbers in an ocean-chemistry stop, an asteroid approach and
// a statistics question. Asked again, they did the better thing: they replaced
// those with a pointer that says *convert this stop from its own authored
// interaction block*, and the block it points at is the stop's payload line,
// which has been campaign-specific all along. 129 stops arrive this way.
//
// WHAT A PAYLOAD LOOKS LIKE, and it is two things rather than one:
//
//   `stress:{assumption:footprint_ha_person,range:[1.8,5.0],correct_plan:cap}`
//
//   ~~~yaml stress: assumptions: - {id: optical_weight, min: 0.7, max: 1.3}
//   outcomes_percent: {minimum: 6.7, baseline: 8.0} threshold_percent: 1.0 ~~~
//
// The second is the trap. It is YAML — but it has been flattened onto one line,
// so every newline that carried its structure is gone, and `yaml.load` on it
// returns a string. The indentation is not recoverable. What IS recoverable is
// the grammar underneath: a key is `word:` at brace depth zero, a sequence is a
// run of `- ` items, and a scalar runs until the next key. That is what this
// parses, and it is why this file exists rather than a call to a YAML library.
//
// WHAT IT WILL NOT DO. It does not guess a type it cannot see: `1.0` is a
// number, `on` is the string "on", and a bare word stays a word. Nothing here
// invents a field, and a payload it cannot read comes back `null` rather than
// half-read — a half-read board is the one outcome worse than an unread one,
// because it converts, imports, and is wrong in the panel.

/** Split on `sep`, but only at brace/bracket depth zero and outside quotes. */
function splitTop(s, sep){
  const out = [];
  let depth = 0, quote = null, start = 0;
  for(let i = 0; i < s.length; i++){
    const c = s[i];
    if(quote){ if(c === quote && s[i - 1] !== '\\') quote = null; continue; }
    if(c === '"' || c === "'"){ quote = c; continue; }
    if(c === '{' || c === '[') depth++;
    else if(c === '}' || c === ']') depth--;
    else if(c === sep && depth === 0){ out.push(s.slice(start, i)); start = i + 1; }
  }
  out.push(s.slice(start));
  return out.map(x => x.trim()).filter(x => x.length);
}

/**
 * A scalar, in the type it was written as.
 *
 * `true`/`false` and a number are taken at face value; everything else stays a
 * string, including a bare word like `robustly_above_notification`, which is an
 * id and must not become anything cleverer. Quotes are stripped, and the
 * backslash-escaped quotes the compact form arrives with are unescaped.
 */
function scalar(raw){
  let s = String(raw ?? '').trim();
  if(!s.length) return '';
  if((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))){
    return s.slice(1, -1).replace(/\\(["'])/g, '$1');
  }
  s = s.replace(/\\(["'])/g, '$1');
  if(s === 'true') return true;
  if(s === 'false') return false;
  if(s === 'null' || s === '~') return null;
  if(/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(s)) return Number(s);
  return s;
}


/**
 * A value in the dotted-equals notation, where a brace is ambiguous.
 *
 * `{cycles,flows}` is a set of two names; `{sunlight:flows,heat:flows}` is a
 * map. YAML would not tolerate the first, and the bibles write both, so the
 * colon decides — checked at depth zero, since a nested map's colons are not
 * this brace's business.
 */
function braceOrValue(raw){
  const s = String(raw ?? '').trim();
  if(s.startsWith('{') && s.endsWith('}')){
    const inner = s.slice(1, -1);
    const parts = splitTop(inner, ',');
    const isMap = parts.length > 0 && parts.every(p => /^[^:]+:/.test(p));
    return isMap ? body(inner) : parts.map(scalar);
  }
  return value(s);
}

/** `{a: 1, b: [x, y]}` or `[1, 2]` or a scalar. */
function value(raw){
  let s = String(raw ?? '').trim();
  // A SENTENCE'S PUNCTUATION IS NOT PART OF THE LIST. Several payloads end a
  // field with the writer's own full stop — `updates=[1.4,1.1,1.0,0.8].` — and
  // the bracket check then fails on the trailing character, so a list of four
  // readings came back as the STRING "[1.4,1.1,1.0,0.8].". Only trimmed when the
  // value opens with a bracket or a brace: a scalar that is a real sentence
  // keeps its full stop. A backtick counts too — the compact form's own closing
  // one lands inside the field when the payload continues after the board.
  if(s.startsWith('{') || s.startsWith('[')) s = s.replace(/[.,;`~\s]+$/, '');
  if(s.startsWith('{') && s.endsWith('}')) return body(s.slice(1, -1));
  if(s.startsWith('[') && s.endsWith(']')){
    return splitTop(s.slice(1, -1), ',').map(value);
  }
  return scalar(s);
}

/** Is this a `key:` at depth zero, and where does it start? */
const KEY = /(^|[\s,{])([A-Za-z_][A-Za-z0-9_]*)\s*:/g;

/**
 * The body of a mapping: `k: v k2: v2`, with values that may be inline maps,
 * inline lists, `- ` sequences, or scalars that run until the next key.
 *
 * The whole difficulty is where a scalar ends. `answerText: Every justified case
 * remains above 1%, so notification does not depend on one tuning choice.` is
 * one value containing commas, a percent sign and full stops, and it ends only
 * because another key follows it. So keys are found first, at depth zero, and
 * each value is whatever lies between its colon and the next key.
 */
function body(s){
  const src = String(s ?? '');
  const keys = [];
  KEY.lastIndex = 0;
  let m;
  while((m = KEY.exec(src))){
    // Depth zero only: a key inside `{...}` belongs to that inline map, and is
    // parsed when the map is.
    const before = src.slice(0, m.index + m[1].length);
    let depth = 0, quote = null;
    for(let i = 0; i < before.length; i++){
      const c = before[i];
      if(quote){ if(c === quote && before[i - 1] !== '\\') quote = null; continue; }
      if(c === '"' || c === "'"){ quote = c; continue; }
      if(c === '{' || c === '[') depth++;
      else if(c === '}' || c === ']') depth--;
    }
    if(depth !== 0) continue;
    keys.push({ name: m[2], at: m.index + m[1].length, after: m.index + m[0].length });
  }
  if(!keys.length) return scalar(src);
  const out = {};
  // Set once a block sequence has swallowed the rest of the source: every key
  // after it belonged to one of its items and has already been placed.
  let consumed = false;
  keys.forEach((k, i) => {
    if(consumed) return;
    // THE SEPARATOR IS NOT PART OF THE VALUE. A key's slice runs to the start of
    // the next key, so it carries whatever punctuation joined them —
    // `scale: {min: 4.18, max: 4.28},` keeps its comma, no longer ends in `}`,
    // and falls through to `scalar` as the STRING "{min: 4.18, max: 4.28},".
    // Every format saw this; it turned maps into text wherever two keys sat side
    // by side.
    let raw = src.slice(k.after, i + 1 < keys.length ? keys[i + 1].at : src.length).trim();
    raw = raw.replace(/[,;]+$/, '').trim();
    // A LEADING MINUS IS A SIGN UNLESS A SPACE FOLLOWS IT. `min: -0.35` was read
    // as a one-item YAML sequence and came back `["0.35"]` — the number survived
    // and the sign did not, which is the worst way to lose it: ±0.20 kV/m became
    // +0.20 and nothing looked wrong.
    // A BLOCK SEQUENCE WHOSE ITEMS HAVE NO BRACES, flattened onto one line.
    //
    // `models: - id: A rms: 0.18 residuals: [...] - id: B rms: 0.21 ...` puts
    // every item's fields at depth zero, so they are found as keys of the BOARD
    // and the sequence itself collapses to the bare `-` that was all that stood
    // between `models:` and `id:`. The board came back with one model, made of
    // the LAST item's fields, and the first silently gone. It cost the only
    // RESIDUAL board in the repo that passes its own trap.
    //
    // So when a value is a bare `-`, the sequence is rebuilt from the rest of
    // the source, and the keys it swallows are removed from the parent. The last
    // item is the awkward one: `correct_model: B` follows the final record and
    // belongs to the board, not to the record. It is recognised by not being one
    // of the first item's own fields — a block sequence is a repeated shape, and
    // anything outside that shape is the parent's again.
    if(raw === '-'){
      const tail = src.slice(k.after).replace(/^\s*-\s*/, '');
      const chunks = tail.split(/\s+-\s+/).map(c => body(c)).filter(c => c && typeof c === 'object');
      if(chunks.length){
        const shape = new Set(Object.keys(chunks[0]));
        const last = chunks[chunks.length - 1];
        const spill = {};
        for(const f of Object.keys(last)){
          if(!shape.has(f)){ spill[f] = last[f]; delete last[f]; }
        }
        out[k.name] = chunks;
        Object.assign(out, spill);
        consumed = true;
      }
      return;
    }
    out[k.name] = /^-\s/.test(raw) ? sequence(raw) : value(raw);
  });
  return out;
}

/** `- {a: 1} - {a: 2}` or `- one - two`. */
function sequence(raw){
  const s = String(raw ?? '').trim();
  const items = [];
  let i = 0;
  while(i < s.length){
    // `- ` with the space, for the reason in `body()`: a bare `-0.35` is a
    // negative number and not a sequence of one.
    if(s[i] !== '-' || !/\s/.test(s[i + 1] ?? '')){ i++; continue; }
    let j = i + 1;
    while(j < s.length && /\s/.test(s[j])) j++;
    if(s[j] === '{' || s[j] === '['){
      const open = s[j], close = open === '{' ? '}' : ']';
      let depth = 0, k = j, quote = null;
      for(; k < s.length; k++){
        const c = s[k];
        if(quote){ if(c === quote && s[k - 1] !== '\\') quote = null; continue; }
        if(c === '"' || c === "'"){ quote = c; continue; }
        if(c === open) depth++;
        else if(c === close){ depth--; if(!depth){ k++; break; } }
      }
      items.push(value(s.slice(j, k)));
      i = k;
    } else {
      // A bare sequence item runs to the next ` - ` at depth zero.
      const rest = s.slice(j);
      const next = rest.search(/\s-\s/);
      const chunk = next < 0 ? rest : rest.slice(0, next);
      items.push(body(chunk));
      i = next < 0 ? s.length : j + next + 1;
    }
  }
  return items;
}

/**
 * Read a stop's payload string. Returns `{ key, board }` — the top-level name
 * the board was written under (`stress`, `trace`, `allocate`) and the board —
 * or `null` if there is nothing readable in it.
 *
 * Both wrappers are accepted: the compact backticked form and the flattened
 * `~~~yaml … ~~~` form. `null` means unread, never half-read.
 */
export function readPayload(text, expectKey){
  let s = String(text ?? '').trim();
  if(!s) return null;
  // ORDER MATTERS HERE, and it cost twenty-four boards. Stripping stray
  // backticks first turns an opening ```` ```yaml ```` fence into a bare
  // `yaml`, the fence strip below then has nothing to match, and the board
  // parses as a mapping whose one key is called "yaml". Take the fences off
  // first, then the decorative backticks the compact form is wrapped in.
  s = s.replace(/^```\s*ya?ml\s*/i, '').replace(/```\s*$/, '').trim();
  s = s.replace(/^~~~\s*ya?ml\s*/i, '').replace(/~~~\s*$/, '').trim();
  s = s.replace(/^`+|`+$/g, '').trim();
  s = s.replace(/^ya?ml\s+/i, '').trim();
  // THE THIRD NOTATION, and it is a third of them. Some campaigns write the
  // board as `belt.categories={cycles,flows}; items={sunlight:flows}` — the
  // format name and its first field joined by a dot, fields separated by
  // semicolons, values assigned with `=` rather than `:`, and a brace meaning
  // either a set or a map depending on whether its items contain colons. It is
  // the same board in a different hand, so it is normalised here rather than
  // given a parser of its own.
  // `stress={assumption:…}` — the same hand as the dotted form, but assigning
  // the whole board at once instead of field by field.
  const wholeEq = s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(\{[\s\S]*\})/);
  if(wholeEq){
    const board = value(wholeEq[2]);
    if(board && typeof board === 'object' && Object.keys(board).length) return { key: wholeEq[1], board };
  }

  const dotted = s.match(/^([A-Za-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s*=/);
  if(dotted){
    const key = dotted[1];
    const board = {};
    for(const part of splitTop(s.slice(key.length + 1), ';')){
      const eq = part.indexOf('=');
      if(eq < 0) continue;
      const name = part.slice(0, eq).trim();
      if(!/^[A-Za-z_][A-Za-z0-9_.]*$/.test(name)) continue;
      board[name] = braceOrValue(part.slice(eq + 1).trim());
    }
    return Object.keys(board).length ? { key, board } : null;
  }

  const m = s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*/);
  if(!m) return null;
  let key = m[1];
  let rest = s.slice(m[0].length).trim();
  if(!rest) return null;

  // THE FIRST KEY IS NOT ALWAYS THE BOARD'S NAME. Changeover writes
  // `train:[2.0,2.1,5.9,5.2]; models: …` — the first key is a FIELD, and taking
  // it as the board's name threw `models` away entirely, which is the whole
  // board. When the caller says what the block should be called and the leading
  // key is not it, the whole string is the body and nothing is lost.
  if(expectKey && key.toLowerCase() !== String(expectKey).toLowerCase()){
    const whole = body(s);
    if(whole && typeof whole === 'object' && !Array.isArray(whole) && Object.keys(whole).length > 1){
      return { key: String(expectKey).toLowerCase(), board: whole };
    }
  }
  // A BOARD MAY HAVE PROSE AFTER IT. Several payloads read
  // `` `trigger:{…}`; update reveals `4.235 m`. `` — the board, then a sentence
  // carrying a number the board does not hold. Taking the balanced brace span
  // rather than requiring the string to end in `}` reads the board; the
  // remainder is kept as `_trailing` rather than dropped, because it is the one
  // place a reveal value is written and silently losing it is how a stop grades
  // against a number nobody can see.
  let board;
  if(rest.startsWith('{')){
    let depth = 0, end = -1, quote = null;
    for(let i = 0; i < rest.length; i++){
      const c = rest[i];
      if(quote){ if(c === quote && rest[i - 1] !== '\\') quote = null; continue; }
      if(c === '"' || c === "'"){ quote = c; continue; }
      if(c === '{') depth++;
      else if(c === '}'){ depth--; if(!depth){ end = i + 1; break; } }
    }
    if(end < 0) return null;
    board = value(rest.slice(0, end));
    const tail = rest.slice(end).replace(/^[`;,\s]+/, '').trim();
    if(tail && board && typeof board === 'object' && !Array.isArray(board)) board._trailing = tail;
  } else if(rest.startsWith('-')) board = sequence(rest);
  else board = body(rest);
  if(board === null || board === undefined) return null;
  if(typeof board !== 'object') return null;
  if(!Array.isArray(board) && !Object.keys(board).length) return null;
  return { key, board };
}

/**
 * Every authored-board pointer in a bible: the stop, its format, the question
 * printed to the player, and the payload the pointer says to build from.
 *
 * The pointer's own wording is the contract — "Convert this stop from its
 * authored interaction block below. Do not substitute a format-level template."
 * — so what this returns is the block it points at, never a §7 board.
 */
export function authoredBoards(markdown){
  const out = [];
  // THE CLOSING FENCE IS ON ITS OWN LINE, and it has to be said explicitly.
  // Some payloads are themselves written as a fenced block — `payload: "```yaml
  // sweep: …"` — so a lazy match to the next three backticks ends the block in
  // the middle of the payload it came for. Twenty-four boards read as empty
  // because of it, which looks exactly like a stop that authored nothing.
  const re = /§7 authored-board source — ([A-Z]+):[^\n]*\n\s*```ya?ml\n([\s\S]*?)\n```[ \t]*(?:\n|$)/g;
  let m;
  while((m = re.exec(String(markdown ?? '')))){
    const fmt = m[1], blk = m[2];
    // SCANNED, NOT MATCHED. These values span lines and carry escaped quotes —
    // `label: \"Cartridge temperature\"` inside a payload — and a lazy regex
    // either stops at the first inner quote or fails outright, which is how
    // twenty payloads came back empty and looked like stops that had authored
    // nothing. Walk from the opening quote to the first UNESCAPED closing one.
    const field = (name) => {
      const at = blk.search(new RegExp(`^\\s*${name}:\\s*"`, 'm'));
      if(at < 0) return '';
      const open = blk.indexOf('"', at);
      let out = '';
      for(let i = open + 1; i < blk.length; i++){
        const c = blk[i];
        if(c === '\\' && (blk[i + 1] === '"' || blk[i + 1] === '\\')){ out += blk[i + 1]; i++; continue; }
        if(c === '"') break;
        out += c;
      }
      return out;
    };
    const parsed = readPayload(field('payload'));
    out.push({
      format: fmt,
      stop: field('stop'),
      question: field('question'),
      payloadText: field('payload'),
      key: parsed?.key ?? null,
      board: parsed?.board ?? null,
    });
  }
  return out;
}

/**
 * The stop's board, from the best copy of it available.
 *
 * THERE ARE TWO COPIES AND ONE IS BETTER. The §7 pointer quotes the payload
 * inside its own fenced block, and that copy has been FLATTENED onto one line —
 * which is why everything above this exists, and why a block sequence, a nested
 * map and a negative number each had to be recovered by hand. But the stop's own
 * payload line, as `bibleRead` returns it, still has its newlines: measured on
 * Planetary Defense, 35 of 35 keep them and 33 of 35 parse as ordinary YAML.
 *
 * So real YAML is tried first and the hand-written grammar is the fallback, for
 * the two in thirty-five that are genuinely written on one line. Reaching for
 * the flattened copy first was reading the worse of two sources for no reason.
 */
export function readBoard(raw, expectKey, parseYaml){
  const text = String(raw ?? '');
  if(text.includes('\n') && typeof parseYaml === 'function'){
    const body = text
      .replace(/^\s*[`~]{3}\s*ya?ml\s*/i, '')
      .replace(/[`~]{3}\s*$/, '')
      .trim();
    try {
      const y = parseYaml(body);
      if(y && typeof y === 'object' && !Array.isArray(y)){
        const keys = Object.keys(y);
        // One top-level key that names the board — `stress: {...}` — is the
        // board under its own name; anything else is already the board.
        if(keys.length === 1 && y[keys[0]] && typeof y[keys[0]] === 'object'){
          return { key: keys[0], board: y[keys[0]], via: 'yaml' };
        }
        if(keys.length) return { key: String(expectKey ?? keys[0]).toLowerCase(), board: y, via: 'yaml' };
      }
    } catch { /* fall through to the flat reader */ }
  }
  const flat = readPayload(text, expectKey);
  return flat ? { ...flat, via: 'flat' } : null;
}
