// probeQuestions.mjs — three checks a question has to survive.
//
//   node engine/dev/probeQuestions.mjs <theme>
//   node engine/dev/probeQuestions.mjs <theme> --verbose
//
// validateContent asks whether the content is consistent. This asks whether the
// questions are worth answering, which is a different thing and the one that
// kept going wrong. Every check here exists because a real stop failed it:
//
//   LEAK   the wrong answers were impossible rather than tempting, so the
//          question could be scored by elimination without the science.
//          Twenty-two hospital items were like this — "the stomach stops
//          existing while a person runs".
//
//   GIVEAWAY  the scene stated the reasoning the question was about to ask
//          for. Outbreak's first stop pre-solved three of its four items in
//          the blurb, so the exercise was reading comprehension.
//
// Both are deterministic. A model would catch more, and would also need a key,
// a budget and a network; these run in the same second as everything else and
// never disagree with themselves.
//
// A third probe was tried and removed. It looked for terms in the verdict that
// the player never saw and no glossary defined, meaning to catch Deep Watch's
// shaft-harmonics question — which needed "misalignment loads twice per
// revolution", a fact the scene never supplied. It could not work: both those
// words were already in the options, so the gap was semantic and no
// bag-of-words test can see it. What replaces it is `assumes:` on the stop —
// the prior knowledge stated by whoever wrote the question, and checked against
// the glossary and the stops before it. A declaration beats an inference here.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const themeName = process.argv[2];
const verbose = process.argv.includes('--verbose');
if(!themeName){
  console.error('usage: node engine/dev/probeQuestions.mjs <theme> [--verbose]');
  process.exit(2);
}
const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content);

const CURRICULUM = content.CURRICULUM ?? {};
const MISSIONS = content.MISSIONS ?? [];

const words = (s) => String(s ?? '').toLowerCase().match(/[a-z][a-z'-]+/g) ?? [];
const label = (c) => (typeof c === 'string' ? c : c?.label ?? '');

/** Longest run of consecutive words shared by two passages. */
function longestShared(a, b){
  const A = words(a), B = words(b);
  if(!A.length || !B.length) return 0;
  const index = new Map();
  B.forEach((w, i) => { if(!index.has(w)) index.set(w, []); index.get(w).push(i); });
  let best = 0;
  for(let i = 0; i < A.length; i++){
    for(const j of index.get(A[i]) ?? []){
      let n = 0;
      while(i + n < A.length && j + n < B.length && A[i + n] === B[j + n]) n++;
      if(n > best) best = n;
    }
  }
  return best;
}

const ABSOLUTES = /\b(always|never|only|cannot ever|no illness|nothing at all|every single|entirely impossible|forever)\b/i;

const findings = [];
const add = (kind, at, msg) => findings.push({ kind, at, msg });

for(const [mi, m] of MISSIONS.entries()){
  for(const [si, st] of (m.stops ?? []).entries()){
    const l = CURRICULUM[st.group]?.[st.lesson];
    if(!l?.game) continue;
    const ch = l.game;
    const at = `M${mi + 1}.${si + 1} "${l.title}"`;
    const scene = l.scene || l.story || '';
    const choices = (ch.choices ?? []).map(label).filter(Boolean);
    const key = String(ch.correctChoice ?? ch.answer ?? '');
    const right = choices.find(c => c.trim() === key.trim());
    const wrong = choices.filter(c => c !== right);

    // ---- 1. LEAK: can the answer be picked from the options alone?
    if(right && wrong.length >= 2){
      const absoluteWrong = wrong.filter(c => ABSOLUTES.test(c)).length;
      if(absoluteWrong >= 2 && !ABSOLUTES.test(right)){
        add('LEAK', at, `${absoluteWrong} of ${wrong.length} wrong options use an absolute ("always", "never", "only") and the right one does not — the option set can be scored without reading the question`);
      }
      const lens = wrong.map(c => c.length).sort((a, b) => a - b);
      const median = lens[Math.floor(lens.length / 2)] || 1;
      if(right.length > median * 1.9){
        add('LEAK', at, `the keyed answer is ${(right.length / median).toFixed(1)}× the length of a typical distractor — length alone identifies it`);
      }
      const because = /\bbecause\b|\bso that\b|\bwhich is why\b/i;
      if(because.test(right) && !wrong.some(c => because.test(c))){
        add('LEAK', at, 'only the keyed answer carries its own justification ("because …"), which marks it out from the others');
      }
    }

    // ---- 2. GIVEAWAY: does the scene already state the reasoning?
    const reasoning = ch.why ?? '';
    if(scene && reasoning){
      const run = longestShared(scene, reasoning);
      if(run >= 8) add('GIVEAWAY', at, `${run} consecutive words of the verdict's reasoning appear verbatim in the scene`);
    }
    if(scene && right && longestShared(scene, right) >= 6){
      add('GIVEAWAY', at, 'the keyed answer appears almost word for word in the scene');
    }

  }
}

const byKind = (k) => findings.filter(f => f.kind === k);
for(const k of ['LEAK', 'GIVEAWAY']){
  const hits = byKind(k);
  if(!hits.length) continue;
  console.log(`\n${k}: ${hits.length}`);
  for(const f of (verbose ? hits : hits.slice(0, 6))) console.log(`  · ${f.at} — ${f.msg}`);
  if(!verbose && hits.length > 6) console.log(`  … ${hits.length - 6} more (--verbose)`);
}
if(!findings.length) console.log(`\n✓ theme "${themeName}": every question survives all three probes`);
else console.log(`\n${findings.length} probe finding(s) in theme "${themeName}"`);
// Advisory: these are smells, not contradictions, and a false positive should
// not stop a build. validateContent is where a hard failure belongs.
process.exit(0);
