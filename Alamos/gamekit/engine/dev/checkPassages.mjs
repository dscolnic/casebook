// checkPassages.mjs — does talking to somebody teach anything?
//
//   node engine/dev/checkPassages.mjs <theme>
//
// The complaint this exists for, from Aftershock: "a random non-mission person
// … the answer is an exact sentence in that. But also, there is no learning
// happening here."
//
// Both halves were true, and in every game. Two failure modes produce the same
// worthless question:
//
//   LIFTED     the keyed answer is a run of words copied out of the passage. The
//              player scans for the matching sentence and never reads either.
//              `personQuiz.js` does this deliberately as a *fallback* — the
//              generated question lifts a sentence from this bio and takes its
//              distractors from other people's — so any roster entry with a bio
//              and no `quiz` array is guaranteed to be one of these.
//   NOQUIZ     a bio with no authored question at all, which is what triggers
//              that fallback.
//
// What an authored question is for: the bio says what somebody does and why
// they do it that way, and the question should ask about the *why*. "Why does
// Okonkwo refuse to upgrade a placard on a walk-past?" is answerable by
// somebody who understood the passage and not by somebody pattern-matching
// against it.
//
// Six words is the threshold for LIFTED. Shorter runs happen honestly — a
// question about pore pressure will contain "pore pressure" and probably the
// noun beside it — and at six the answer is reproducing the passage's own
// sentence rather than its content.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const themeName = process.argv[2];
if(!themeName){
  console.error('usage: node engine/dev/checkPassages.mjs <theme>');
  process.exit(2);
}
const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
normalizeContent(theme.content ?? {});

const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => plain(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);

/** The longest run of consecutive words these two share. */
function longestRun(a, b){
  const A = words(a), B = words(b);
  let best = 0;
  for(let i = 0; i < A.length; i++){
    for(let j = 0; j < B.length; j++){
      let n = 0;
      while(i + n < A.length && j + n < B.length && A[i + n] === B[j + n]) n++;
      if(n > best) best = n;
    }
  }
  return best;
}

const R = theme.content?.ROSTER ?? [];
const people = Array.isArray(R) ? R : Object.values(R).filter(Array.isArray).flat();

const noQuiz = [], lifted = [], thin = [];
let withBio = 0, questions = 0;
for(const p of people){
  const bio = plain(p?.bio);
  if(!bio) continue;
  withBio++;
  const qs = (Array.isArray(p.quiz) ? p.quiz : []).filter(q => q?.a && Array.isArray(q.wrong));
  if(!qs.length){ noQuiz.push(p.name ?? p.id ?? '?'); continue; }
  for(const q of qs){
    questions++;
    const run = longestRun(q.a, bio);
    if(run >= 6) lifted.push({ who: p.name ?? p.id, run, a: plain(q.a) });
    // Three options is the floor the panel is built for; two is a coin toss.
    if(q.wrong.length < 3) thin.push({ who: p.name ?? p.id, n: q.wrong.length + 1 });
  }
}

const fails = noQuiz.length + lifted.length + thin.length;
console.log(`\n${fails ? '✗' : '✓'} theme "${themeName}": ${withBio} passage(s), ${questions} authored question(s)`);
if(noQuiz.length){
  console.log(`  ✗ ${noQuiz.length} bio(s) with no authored question — the engine will lift a sentence instead:`);
  console.log(`      ${noQuiz.slice(0, 8).join(' · ')}${noQuiz.length > 8 ? ` … and ${noQuiz.length - 8} more` : ''}`);
}
for(const l of lifted.slice(0, 6)){
  console.log(`  ✗ ${l.who}: the answer repeats ${l.run} consecutive words of the passage — "${l.a.slice(0, 64)}…"`);
}
if(lifted.length > 6) console.log(`  ✗ … and ${lifted.length - 6} more lifted answer(s)`);
for(const t of thin) console.log(`  ✗ ${t.who}: only ${t.n} option(s); the panel wants four`);
if(fails){
  console.log('  Ask about the why, not the wording: the passage says how somebody works,');
  console.log('  and the question should be answerable only by having understood it.');
  process.exit(1);
}
