// curriculum.js — lessons per group. Each mission stop indexes into these,
// so the validator checks every referenced index exists.
const lessons = (n, prefix) => Array.from({ length: n }, (_, i) => ({
  title: `${prefix} lesson ${i + 1}`,
  format: ['diagnosis', 'sequence', 'ballpark'][i % 3],
  questions: [],       // filled by the content converter
}));

export const CURRICULUM = {
  G1: lessons(6, 'Area One'),
  G2: lessons(6, 'Area Two'),
  G3: lessons(6, 'Area Three'),
  G4: lessons(6, 'Area Four'),
  G5: lessons(6, 'Area Five'),
  G6: lessons(12, 'Area Six'),
};

/** Number-tile estimate specs, keyed `<group>-<day>`. Written by the book importer. */
export const BALLPARK_CALCS = {};

/** Clickable terms in the question panel: { name, aliases, def }. */
export const JARGON = [];
