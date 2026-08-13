// answerShape.mjs — can the game be played on the shape of the options alone?
//
//   node engine/dev/answerShape.mjs <theme>
//
// The complaint this exists for: "when talking to people and answering their
// questions, the longest answer isn't always the right one. That's what it
// seems so far." It was, and not only there. Measured across the seven shipped
// games, the correct answer was the longest option in 88 per cent of passage
// quizzes against 25 per cent by chance, and in over 80 per cent of the mission
// questions in two of them. A player who never reads a word can score.
//
// `probeQuestions` already refuses a *single* option set whose key is 1.9× the
// median distractor. That rule cannot see this one, because the bias here is
// small per question and overwhelming across a game: an answer 1.2× longer than
// its distractors passes every time, and if it happens forty times in a row the
// length is the answer key.
//
// Why it happens is worth knowing before fixing it: the correct option is the
// one the author has to make *true*, so it collects the qualifying clause, the
// unit and the "because" — while a distractor only has to be wrong, which takes
// four words. The fix is not to pad the distractors into waffle. It is to move
// the qualification into the question stem, and to let the wrong options be
// wrong for a stated reason rather than by being vague.
//
// Two populations, checked separately because they are written by different
// hands and fail independently:
//
//   passage  — the `quiz` arrays on the roster: what a person tells you.
//   mission  — single-answer question formats (CHOICE, TRIAGE, DIAGNOSIS).
//              Matching and ordering formats are excluded: PROTOCOL, CASEBOOK
//              and SEQUENCE have no single keyed option, and their option
//              lengths carry no signal.
//
// The test is a binomial tail, not a percentage, so a game with six quizzes is
// not failed for the same rate that damns a game with sixty.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const themeName = process.argv[2];
if(!themeName){
  console.error('usage: node engine/dev/answerShape.mjs <theme>');
  process.exit(2);
}
const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content);

const CURRICULUM = content.CURRICULUM ?? {};
const ROSTER = content.ROSTER ?? {};

/** Bios and options are written as HTML in places. Length means visible length. */
const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * log of n choose k, then the upper tail of a binomial. Written out rather than
 * approximated because n is small — the games have between 4 and 78 items in a
 * population, which is exactly the range where a normal approximation says a
 * six-item game is fine when it is 100 per cent biased.
 */
const lgamma = (x) => {
  // Lanczos, good to ~1e-10 across the range we need.
  const g = [76.18009172947146, -86.50532032941677, 24.01409824083091,
             -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let a = x, b = x + 5.5, s = 1.000000000190015;
  b -= (x + 0.5) * Math.log(b);
  for(let i = 0; i < 6; i++) s += g[i] / ++a;
  return -b + Math.log(2.5066282746310005 * s / x);
};
const lchoose = (n, k) => lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);
/** P(X >= k) for X ~ Binomial(n, p). */
function tail(n, k, p){
  if(k <= 0) return 1;
  let t = 0;
  for(let i = k; i <= n; i++) t += Math.exp(lchoose(n, i) + i * Math.log(p) + (n - i) * Math.log(1 - p));
  return Math.min(1, t);
}

/**
 * One population's verdict.
 *
 * `items` are `{ where, key, options }`. An item counts as biased when its key
 * is strictly the longest option — ties do not count, because a tie is exactly
 * the state a fixed set should be in and failing it would push authors toward
 * padding.
 */
function measure(label, items){
  const usable = items.filter(it => it.options.length >= 3 && it.options.includes(it.key));
  const n = usable.length;
  if(!n) return { label, n: 0 };
  let hits = 0, pSum = 0;
  const worst = [];
  for(const it of usable){
    const lens = it.options.map(o => plain(o).length);
    const keyLen = plain(it.key).length;
    const max = Math.max(...lens);
    const longest = keyLen === max && lens.filter(l => l === max).length === 1;
    if(longest){
      hits++;
      const others = lens.filter(l => l !== keyLen).sort((a, b) => a - b);
      const median = others[Math.floor(others.length / 2)] || 1;
      worst.push({ where: it.where, ratio: keyLen / median });
    }
    // Chance for this item is one option in however many it has.
    pSum += 1 / it.options.length;
  }
  const p = pSum / n;
  worst.sort((a, b) => b.ratio - a.ratio);
  return { label, n, hits, rate: hits / n, expected: p, prob: tail(n, hits, p), worst };
}

/**
 * Every authored passage quiz on the roster. A roster is a flat array in the
 * book-generated games and an object keyed by group in the two older ones, so
 * both shapes are flattened here rather than in each game.
 */
const people = Array.isArray(ROSTER)
  ? ROSTER
  : Object.values(ROSTER).filter(Array.isArray).flat();
const passage = [];
for(const person of people){
  (Array.isArray(person?.quiz) ? person.quiz : []).forEach((q, i) => {
    if(!q?.a || !Array.isArray(q.wrong)) return;
    passage.push({ where: `${person.name ?? person.id ?? '?'} q${i + 1}`, key: String(q.a), options: [String(q.a), ...q.wrong.map(String)] });
  });
}

/**
 * Single-answer mission questions. `kindOf` is not imported: the formats that
 * matter are exactly the ones normalize leaves carrying both a `choices` array
 * and a single keyed answer, which is the definition being used here.
 */
const mission = [];
for(const [group, lessons] of Object.entries(CURRICULUM)){
  for(const [id, lesson] of Object.entries(lessons ?? {})){
    const g = lesson?.game;
    if(!g || !Array.isArray(g.choices) || g.choices.length < 3) continue;
    const key = g.correctChoice ?? g.answer;
    if(!key) continue;
    const options = g.choices.map(c => typeof c === 'string' ? c : (c?.label ?? ''));
    if(!options.includes(String(key))) continue;
    mission.push({ where: `${group}/${id}`, key: String(key), options });
  }
}

const results = [measure('passage quizzes', passage), measure('mission questions', mission)];

// A tail this small means length alone identifies the answer often enough to be
// a strategy. 0.001 rather than the usual 0.05: this is an editorial property of
// a whole game, and the cost of a false alarm is rewriting good questions.
const FAIL = 0.001;
const NOTE = 0.05;

let bad = 0;
const lines = [];
for(const r of results){
  if(!r.n){ lines.push(`  · no ${r.label} to measure`); continue; }
  const pct = (x) => `${Math.round(x * 100)}%`;
  const head = `${r.label}: the keyed answer is the longest option in ${r.hits} of ${r.n} (${pct(r.rate)}, ${pct(r.expected)} by chance)`;
  if(r.prob < FAIL){
    bad++;
    lines.push(`  ✗ ${head}`);
    lines.push(`      length alone identifies the answer — p = ${r.prob.toExponential(1)}`);
    for(const w of r.worst.slice(0, 4)) lines.push(`      ${w.where}: key is ${w.ratio.toFixed(1)}× the median distractor`);
    if(r.worst.length > 4) lines.push(`      … and ${r.worst.length - 4} more`);
  }else if(r.prob < NOTE){
    lines.push(`  · ${head} — leaning that way (p = ${r.prob.toFixed(3)})`);
  }else{
    lines.push(`  ✓ ${head}`);
  }
}

if(bad){
  console.log(`\n✗ theme "${themeName}": a player can score without reading`);
  lines.forEach(l => console.log(l));
  console.log('  Move the qualifying clause into the question stem, and make each wrong option');
  console.log('  wrong for a stated reason rather than by being short and vague.');
  process.exit(1);
}
console.log(`\n✓ theme "${themeName}": the answer is not identifiable by its length`);
lines.forEach(l => console.log(l));
