// readability.js — Flesch–Kincaid, once.
//
// "Measure the reading level, do not judge it." This lived inside
// validateContent.mjs, which gates scenes, verdicts and the game's title card
// against the grade a theme declares. It comes out here because a second thing
// now measures the same prose — engine/dev/missionCards.mjs, over the fifteen
// mission cards — and two copies of a formula is how two answers to the same
// question start being reported.
//
// The syllable count is a heuristic and it is the same heuristic it always was.
// It over-counts on some words and under-counts on others; what matters for a
// sweep is that it is wrong the same way everywhere, so a game measured against
// another game is a fair comparison.

// ---------------------------------------------------------------- numerals
//
// **A number costs what a number costs, however it is spelled.**
//
// Flesch–Kincaid is words-per-sentence and syllables-per-word, and nothing
// else. "eleven point four" is three words and five syllables; "11.4" is one
// word and — since the syllable heuristic strips non-letters and then takes the
// `length <= 3` branch — one syllable. Same fact, same difficulty to a reader,
// three times the words and five times the syllables to the formula.
//
// Red Sand's day 2 card measured 11.78 and reads 8.26. Three and a half grades
// of it were spelling convention. Across the set the distortion has a direction:
// the games that spell numbers out (Red Sand 13, Bring Them Home 8, The Trial 8)
// were pushed up the ranking and the ones that use digits (Aftershock 6) pushed
// down, so the first sweep partly ranked typography.
//
// This collapses any run of number words into one short token before the
// formula sees it, so both conventions cost the same. It does not parse the
// value — the value is not what is being measured, the cost is.
const NUM_WORD = new Set([
  'zero','one','two','three','four','five','six','seven','eight','nine','ten',
  'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen',
  'eighteen','nineteen','twenty','thirty','forty','fourty','fifty','sixty',
  'seventy','eighty','ninety','hundred','thousand','million','billion','point',
]);

/**
 * Spelled-out numbers reduced to one token each, so a card is scored on its
 * prose rather than on its house style.
 *
 * `and` and hyphens are absorbed only between number words — "one hundred and
 * ninety-five" is one number, but the `and` in "the bed and the loop" is not
 * touched.
 */
export function normaliseNumerals(text){
  // Digits first, and this is the half that is easy to miss. The sentence count
  // is `[.!?]+`, so "11.4" reads as the end of a sentence — a card with three
  // decimals in it is scored as having three more sentences than it has, its
  // apparent words-per-sentence collapses, and the grade comes out *low*. So
  // the two conventions were not merely unequal, they were wrong in opposite
  // directions: spelled-out numbers pushed a card up, digits pushed it down.
  // Both become the same dotless token here.
  const src = String(text ?? '').replace(/\b\d[\d,.]*\b/g, '0');
  const words = src.split(/(\s+)/);
  const isNum = (w) => {
    const bare = w.toLowerCase().replace(/[^a-z-]/g, '');
    if(!bare) return false;
    // "twenty-six" and "ninety-five" are one number word written with a hyphen.
    return bare.split('-').every(p => p && NUM_WORD.has(p));
  };
  const out = [];
  for(let i = 0; i < words.length; i++){
    const w = words[i];
    if(!w.trim()){ out.push(w); continue; }
    if(!isNum(w)){ out.push(w); continue; }
    // Swallow the rest of the run, including any `and` that sits inside it.
    let j = i, last = i;
    while(j < words.length){
      const nxt = words[j + 2];                       // skip the whitespace token
      if(nxt === undefined) break;
      const bare = nxt.toLowerCase().replace(/[^a-z-]/g, '');
      if(isNum(nxt)){ j += 2; last = j; continue; }
      if(bare === 'and' && isNum(words[j + 4] ?? '')){ j += 2; continue; }
      break;
    }
    // Keep whatever punctuation ended the run — a full stop still ends a
    // sentence, and the sentence count is the other half of the formula.
    const tail = (words[last].match(/[^\w-]+$/) || [''])[0];
    out.push('0' + tail);
    i = last;
  }
  return out.join('');
}

/** Syllables in a word, approximately. */
export const SYL = (w) => {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if(w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  return (w.match(/[aeiouy]{1,2}/g) || ['x']).length;
};

/**
 * The US grade level the text reads at, or null when there is not enough of it.
 *
 * Below 25 words the formula is noise — one long sentence in a two-sentence
 * passage moves it three grades — so it declines to answer rather than
 * answering badly.
 */
export function fleschKincaid(text){
  const t = normaliseNumerals(String(text ?? '').trim());
  const words = t.split(/\s+/).filter(Boolean);
  if(words.length < 25) return null;
  const sentences = (t.match(/[.!?]+/g) || []).length || 1;
  const syllables = words.reduce((n, w) => n + SYL(w), 0);
  return 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
}

/** The two terms the grade is made of, for saying *why* a card reads high. */
export function readingStats(text){
  const t = normaliseNumerals(String(text ?? '').trim());
  const words = t.split(/\s+/).filter(Boolean);
  const sentences = (t.match(/[.!?]+/g) || []).length || 1;
  const syllables = words.reduce((n, w) => n + SYL(w), 0);
  // The longest sentence is the one worth naming: a card at grade 14 is usually
  // one 60-word sentence and four ordinary ones, and that sentence is the fix.
  const longest = t.split(/(?<=[.!?])\s+/).map(s => s.split(/\s+/).filter(Boolean).length);
  return {
    words: words.length,
    sentences,
    wordsPerSentence: words.length / sentences,
    syllablesPerWord: syllables / words.length,
    longestSentence: longest.length ? Math.max(...longest) : words.length,
    fk: fleschKincaid(t),
  };
}
