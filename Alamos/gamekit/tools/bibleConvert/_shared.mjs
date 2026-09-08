// _shared.mjs — the helpers more than one format converter needs.
//
// A converter takes the bible's §7 board and returns `{ key, value, owes }`:
//
//   key    the top-level field the importer reads the board from — `derive`,
//          `estimate`, `stress`. Taken from the bible's own block rather than
//          from the format name, because BALLPARK's board is called `estimate`
//          and a table mapping one to the other is a second description of one
//          fact.
//   value  the board in the importer's schema.
//   owes   what the board does not carry and this tool will NOT invent. A stop
//          with anything in `owes` is still converted — the structure is real
//          work, and the refusal it then gets names one missing field instead
//          of four missing sections.
//
// The rule every converter obeys: never write a field the bible did not author.
// The temptation is always one boolean that would turn a red gate green, and
// writing it turns a gate that is telling the truth into one that agrees with
// itself.

/** A step's keyed candidate, or -1 when the board does not mark exactly one. */
export function keyOf(cands){
  const at = cands.map((c, i) => (c.correct === true ? i : -1)).filter(i => i >= 0);
  return at.length === 1 ? at[0] : -1;
}

// DERIVE — 86 stops, the largest group by a factor of four.
//
// The bible writes a step as `{id, doing, candidates:[{text, correct, rule,
// reason}]}` and the importer reads `{ask, answer, candidates:[{text, note,
// why, survives}]}`. `doing` is the ask, `rule` is the label the rail prints
// once a line is taken, and `reason` is the teaching on the wrong line.
//
// `survives` is the one thing not carried across, for the reason at the top of
// this file. So is a distractor shorter than the keyed line by more than six
// characters, which is the shape tell — shortening the answer or lengthening the
// distractor is writing algebra into somebody else's derivation.

/** A number if the bible wrote one, else undefined — never a silent zero. */
export function num(v){
  // A WORD IS NOT A NUMBER. Stripping every non-digit from "conditional" leaves
  // an empty string, and `Number('')` is 0 — so a named plan became a numeric
  // candidate worth nothing. Require a digit before believing any of it.
  if(typeof v === 'string' && !/\d/.test(v)) return undefined;
  const n = typeof v === 'string' ? Number(v.replace(/[^0-9.eE+-]/g, '')) : Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/** A trimmed string, or '' — so a caller can test it without guarding. */
export function str(v){ return String(v ?? '').trim(); }

/** The first key of `names` the board actually carries. */
export function pick(b, ...names){
  for(const n of names) if(b && b[n] !== undefined && b[n] !== null) return b[n];
  return undefined;
}

/** An array however the bible spelled it, or []. */
export function list(v){ return Array.isArray(v) ? v : (v ? [v] : []); }
