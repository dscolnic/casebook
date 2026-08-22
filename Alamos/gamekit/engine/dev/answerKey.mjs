// answerKey.mjs — is the keyed answer the one the verdict says it is?
//
//   node engine/dev/answerKey.mjs <theme>
//   node engine/dev/answerKey.mjs --selftest
//
// Seven stops across five campaigns shipped with `answer:` pointing at a
// distractor. On every one of them the stop's own `answerText` stated the
// correct option, the `why` derived it, and the first rebuttal — which is
// authored against a *wrong* option — refuted the key. So a player who reasoned
// correctly was marked wrong and then shown a verdict that agreed with them.
//
// Blackout's transformer stop was keyed to "loss falls by 20×" while its
// answerText said "falls by 20² = 400×". Its RMS stop was keyed to "× 2" while
// the verdict divided by √2 — and `blackout_fable`, a rewrite of the same
// course, keyed the identical stop correctly, which is what proved it a
// regression rather than a choice. Midway taught that a centre-heavy wheel is
// harder to spin up than a rim-heavy one. Quantum keyed no-cloning to a
// file-size distractor its own rebuttal calls out by name.
//
// None of that was visible to any gate. `validateContent` asserts the key
// appears verbatim among the choices — all seven did. `probeQuestions` asks
// whether the question is answerable without the science; a mis-keyed question
// is answerable, just not correctly. `answerShape` measures option length. The
// hole is between them: nothing compared the key against the verdict.
//
// WHY THIS RULE IS NARROW, AND STAYS NARROW
//
// Three broader detectors were written first and all three lied. Scoring word
// overlap between each option and answerText+why flags 104 stops, nearly all
// correct, because the `why` discusses the distractors *by design* — that is
// what it is for. Aligning rebuttals to options in order flags eight, of which
// three are correct keys. A greedy rebuttal-to-option assignment flags dozens.
// Every one of those would have to be advisory, and an advisory wall of false
// failures is how a gate stops being read — this repo has paid for that once
// already with `diffSnapshots`.
//
// So the rule here is verbatim only: does answerText quote a run of six or more
// words from an option that is NOT the key, while quoting no such run from the
// key? That caught one of the seven with no false positives across all 41
// books. One in seven is poor recall and it is the right trade: this fires only
// when the book contradicts itself in its own words, so a hit is always real.
// The other six were found by reading and solving, which remains the only
// complete method.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const RUN = 6;               // words of verbatim overlap that count as a quote

const norm = (s) => String(s ?? '')
  .toLowerCase()
  .replace(/[‘’]/g, "'")
  .replace(/[^a-z0-9√×²\s]/g, ' ')      // punctuation out: a quote may cross a full stop
  .split(/\s+/)
  .filter(Boolean);

const runs = (s) => {
  const w = norm(s), out = new Set();
  for(let i = 0; i + RUN <= w.length; i++) out.add(w.slice(i, i + RUN).join(' '));
  return out;
};

const shares = (a, b) => {
  const ra = runs(a);
  for(const r of runs(b)) if(ra.has(r)) return true;
  return false;
};

// A lesson is checkable when it has plain string options, a key that matches
// one of them, and an answerText long enough to quote anything.
export function checkLesson(lesson){
  const g = lesson?.game ?? {};
  const choices = g.choices ?? lesson.choices;
  // In generated content the book's `answer:` becomes game.correctChoice and its
  // `answerText:` becomes game.answer. Reading `answerText` off the lesson finds
  // nothing and silently passes every theme, which is what the first version did.
  const key = g.correctChoice ?? lesson.correctChoice;
  const verdict = g.answer ?? lesson.answerText ?? g.answerText;
  if(!Array.isArray(choices) || choices.length < 3) return null;
  if(choices.some(c => typeof c !== 'string')) return null;
  if(typeof key !== 'string' || typeof verdict !== 'string') return null;
  if(verdict === key) return null;              // no separate verdict to compare
  if(norm(verdict).length < RUN) return null;
  const keyed = choices.findIndex(c => c === key);
  if(keyed < 0) return null;                    // validateContent owns that case
  if(shares(verdict, choices[keyed])) return null;
  const quoted = choices
    .map((c, i) => ({ c, i }))
    .filter(({ c, i }) => i !== keyed && shares(verdict, c));
  if(!quoted.length) return null;
  return { keyed: choices[keyed], quoted: quoted[0].c, title: lesson.title ?? '?' };
}

async function runTheme(themeName){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const curriculum = content.CURRICULUM ?? theme.content?.CURRICULUM ?? {};
  const bad = [];
  let seen = 0;
  for(const lessons of Object.values(curriculum)){
    for(const lesson of lessons ?? []){
      const r = checkLesson(lesson);
      if(r === null){ seen++; continue; }
      seen++; bad.push(r);
    }
  }
  if(bad.length){
    console.log(`\n✗ theme "${themeName}": ${bad.length} answer key(s) contradict their own verdict`);
    for(const b of bad){
      console.log(`  ✗ ${b.title}`);
      console.log(`      keyed:   ${b.keyed}`);
      console.log(`      verdict: ${b.quoted}`);
    }
    console.log('  The answerText quotes an option that is not the key. One of the two is wrong;');
    console.log('  read the `why` and the rebuttals to see which, then fix the one that lies.');
    return 1;
  }
  console.log(`✓ theme "${themeName}": every keyed answer agrees with its own verdict (${seen} lesson(s))`);
  return 0;
}

// --- selftest ------------------------------------------------------------
// Two cases that would otherwise invert silently: a mis-key that the verdict
// quotes has to fail, and a correct key whose verdict merely *discusses* the
// distractors has to pass. The second is the one that matters — it is what
// three earlier versions of this file got wrong.
function selftest(){
  const cases = [
    { name: 'mis-keyed: verdict quotes a distractor verbatim, across a full stop',
      lesson: { title: 'marker early or challenge every generation',
        answerText: 'Use the DNA marker early. On the final line, confirm that the gene is '
          + 'expressed after exposure and that the plant actually resists the pathogen.',
        game: { choices: ['Use the DNA marker early; on the final line check induced mRNA and the phenotype',
                          'Measure mRNA in every generation; the final challenge is then unnecessary',
                          'Challenge plants in every generation; use the DNA marker after the last backcross'],
                correctChoice: 'Challenge plants in every generation; use the DNA marker after the last backcross' } },
      expect: 'fail' },
    { name: 'near-identical options: the verdict quotes both, so the rule declines',
      lesson: { title: 'peak against rms',
        answerText: 'The relation that holds is 325 V is about 230 V times root two here.',
        game: { choices: ['325 V is about 230 V times root two here and nowhere else',
                          '325 V is about 230 V times two here and nowhere else',
                          '230 V is about 325 V times root two here and nowhere else'],
                correctChoice: '325 V is about 230 V times two here and nowhere else' } },
      expect: 'pass' },
    { name: 'correct key: verdict discusses the distractors but quotes none',
      lesson: { title: 'insulation',
        answerText: 'Current falls twenty times over, so the resistive loss falls four hundred times.',
        game: { choices: ['Current falls by twenty and loss falls by four hundred',
                          'Current stays the same and only the insulation requirement changes',
                          'Current rises by twenty and loss rises by four hundred'],
                correctChoice: 'Current falls by twenty and loss falls by four hundred' } },
      expect: 'pass' },
    { name: 'correct key: verdict quotes the key itself',
      lesson: { title: 'quoted key',
        answerText: 'Shed about a fifth of the load now, to stop the fall and keep the rest supplied.',
        game: { choices: ['Shed about a fifth of the load now, to stop the fall and keep the rest supplied',
                          'Let it collapse and restore the whole valley from the main system later'],
                correctChoice: 'Shed about a fifth of the load now, to stop the fall and keep the rest supplied' } },
      expect: 'pass' },
    { name: 'two options only — below the minimum, not measured',
      lesson: { title: 'too few',
        answerText: 'The first one, obviously, for the reasons already given above here.',
        game: { choices: ['a', 'b'], correctChoice: 'b' } },
      expect: 'pass' },
    { name: 'key matches no option — validateContent owns that, not this',
      lesson: { title: 'no match',
        answerText: 'The peak is about one point four times the meter reading, which is root two.',
        game: { choices: ['The peak is about one point four times the meter reading, which is root two',
                          'The peak is about twice the meter reading, which is a rounder number'],
                correctChoice: 'something nobody offered' } },
      expect: 'pass' },
  ];
  let failed = 0;
  for(const c of cases){
    const got = checkLesson(c.lesson) ? 'fail' : 'pass';
    const ok = got === c.expect;
    if(!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${c.name} — expected ${c.expect}, got ${got}`);
  }
  if(failed){
    console.log(`\n✗ answerKey selftest: ${failed} case(s) wrong`);
    return 1;
  }
  console.log(`\n✓ answerKey selftest: ${cases.length} case(s), and the rule fires only on a verbatim contradiction`);
  return 0;
}

const arg = process.argv[2];
if(!arg){
  console.error('usage: node engine/dev/answerKey.mjs <theme> | --selftest');
  process.exit(2);
}
process.exit(arg === '--selftest' ? selftest() : await runTheme(arg));
