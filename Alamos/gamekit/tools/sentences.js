// sentences.js — where one sentence ends and the next begins.
//
// This exists because there were two copies of the rule and the second one was
// missing a case. `engine/dev/passageDepth.mjs` learned that a title and an
// initial are not full stops, after `checkNames` split "the laboratory director,
// J. Robert Oppenheimer" at the `J.`; `tools/sync-casebook.mjs` separately
// learned that a decimal point is not a full stop, after Aftershock's card read
// "A magnitude 6." Neither knew about `No.`, so the shelf printed Overwind as
//
//     Kerrow No. You are the winding engineer's assistant…
//
// — the first "sentence" being two words of a mine's name, and the second beat
// grammatical, correct, and pointing at nothing. Four shapes are not sentence
// ends:
//
//   a title        Dr. · Mr · Mrs · Ms · Prof · St · Lt · Sgt · Capt · Cdr · Adm
//   an initial     a single capital letter and a dot — "J. Robert", "A. K. Mensah"
//   a decimal      1.5 metres, 4.8 relative to competent rock
//   a number label No. 3, Nos. 1–4 — the dot is the abbreviation of "number"
//
// `No.` is deliberately narrow: only when a digit follows it. "There is no.
// Nothing else." is not a shape anybody writes, but "No." ending a sentence is,
// and a blanket guard would join it to whatever came next.
const TITLES = /\b(?:Dr|Mr|Mrs|Ms|Prof|Rev|St|Lt|Sgt|Capt|Cdr|Adm|Gen|Col|Maj|Sr|Jr|vs|etc|e\.g|i\.e)\.\s/g;
const INITIAL = /\b[A-Z]\.\s/g;
const DECIMAL = /(\d)\.(\d)/g;
const NUMBER_LABEL = /\bNos?\.\s(?=\d)/g;

// A character that cannot appear in a book, standing in for a dot that is not a
// full stop. Restored on the way out, so the caller gets its own text back.
const HOLD = '\u0000';

/** The text with every dot that is not a sentence end held out of the way. */
const shield = (text) => String(text ?? '')
  .replace(DECIMAL, `$1${HOLD}$2`)
  .replace(TITLES, (m) => m.replace('.', HOLD))
  .replace(INITIAL, (m) => m.replace('.', HOLD))
  .replace(NUMBER_LABEL, (m) => m.replace('.', HOLD));

const restore = (s) => s.split(HOLD).join('.');

/**
 * The sentences of a passage, in order, each with its own punctuation.
 *
 * A trailing fragment with no terminal punctuation is returned as a sentence:
 * it is something a reader reads, and a card built out of "the first two beats"
 * must not silently lose the only beat a one-line opening has.
 */
export function splitSentences(text){
  const t = shield(text).trim();
  if(!t) return [];
  return t.split(/(?<=[.?!])\s+/).map(s => restore(s).trim()).filter(Boolean);
}

/** How many sentences a reader reads. */
export function sentenceCount(text){
  return splitSentences(text).length;
}
