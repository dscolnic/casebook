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
/** Canonical challenge kind. The books write "Sequence", "SEQUENCE", "Science Tank". */
const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');

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

// ---- SEQUENCE: does the card WORDING give the order away?
//
// The LEAK probe above only runs on items with `choices`, so no ordering item in
// any of the seven games had ever been checked — and the first one anybody read
// closely gave itself away completely. Planetary Defense's "Validate the
// discovery" listed "identify transient or moving candidates" and "submit the
// candidate to the tracking network": the first and last slots are pinned by
// general workflow sense, which leaves one binary decision in a four-card item,
// and the phrase "for each detection" settles that one too. A player who knows
// nothing about astrometry scores 4/4 by reading English.
//
// Three things pin a slot, all deterministic:
//
//   TERMINAL   the last card hands the work to somebody else — submit, report,
//              publish, hand off. Nothing follows handing over, so that card can
//              only be last.
//   OPENER     the first card announces itself as the start — begin, first, set
//              up, gather, collect.
//   ARROW      any card points at another card's output: "then", "once", "the
//              remaining", "the calibrated", "each detection". These are order
//              arrows written into the prose.
//
// An item is flagged when both endpoints are pinned, or when an arrow appears at
// all. Endpoints pinned is worth a finding on its own because a four-card item
// with two slots free is a coin flip, and a three-card one is solved.
const TERMINAL = /\b(submit|submits|hand (?:it |them )?off|handover|hand over|report (?:it |them )?to|publish|release|sign off|brief the|notify|escalate|deliver|file the|record the (?:result|outcome)|close the (?:case|call)|write it up)\b/i;
const OPENER = /\b(begin|start (?:by|with)|first|before (?:anything|you)|set up|prepare|gather|collect|arrive)\b/i;
const ARROW = /\b(then|afterwards|once (?:the|you|it)|next|finally|the remaining|the resulting|resulting|the calibrated|the rejected|the measured|the surviving|previously|already (?:rejected|measured|taken)|each (?:detection|sample|patient|candidate|reading|survivor)|these|those)\b/i;

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

// ---- 3. ORDER: can an ordering item be solved from the card wording?
//
// Over the CURRICULUM rather than the missions, unlike the two probes above.
// Those ask about a stop the player will stand in; this asks about an item that
// exists, and 7 of the 15 leaking card sets found the first time this ran were in
// lessons no stop reaches today — review variants and spares that a re-shaped
// campaign or a callback can put in front of the player tomorrow. Deduplicated by
// card set, because a hospital item with four review variants is one thing to fix
// and would otherwise be five findings.
// Matching questions carry the same kind of key, and had the same fault: the option
// order WAS the answer in all 73 of them.
for(const [group, lessons] of Object.entries(CURRICULUM)){
  (lessons ?? []).forEach((l, li) => {
    const ch = l?.game;
    if(!ch || !Array.isArray(ch.mapping) || ch.mapping.length < 3) return;
    if(ch.mapping.every((v, i) => v === i)){
      add('ORDER', `${group}[${li}] "${l.title ?? ''}"`,
        'the matching key is 1→A, 2→B, 3→C — the answer is the order the options are printed in');
    }
  });
}

const seenCards = new Set();
for(const [group, lessons] of Object.entries(CURRICULUM)){
  (lessons ?? []).forEach((l, li) => {
    const ch = l?.game;
    if(!ch || kindOf(ch) !== 'SEQUENCE' || !Array.isArray(ch.cards) || ch.cards.length < 3) return;
    const keyed = (ch.order ?? ch.cards.map((_, n) => n)).map(ix => String(ch.cards[ix] ?? ''));
    const sig = keyed.join('|');
    if(seenCards.has(sig)) return;
    seenCards.add(sig);
    const at = `${group}[${li}] "${l.title ?? ''}"`;
    const first = keyed[0], last = keyed[keyed.length - 1];
    const pinnedLast = TERMINAL.test(last) && !keyed.slice(0, -1).some(c => TERMINAL.test(c));
    const pinnedFirst = OPENER.test(first) && !keyed.slice(1).some(c => OPENER.test(c));
    const arrows = keyed.filter(c => ARROW.test(c));
    // The answer must not be the order the cards are printed in. `normalize.js`
    // re-lays any question authored that way, so this only fires if that stops
    // working — which is exactly when it should.
    if(ch.order?.every((v, i) => v === i)){
      add('ORDER', at, 'the keyed order is the order the cards are written in — the answer is the list');
    }
    if(pinnedFirst && pinnedLast){
      add('ORDER', at, `both endpoints are pinned by wording — card 1 announces the start and card ${keyed.length} hands the work off, leaving ${keyed.length - 2} slot(s) to guess`);
    } else if(pinnedLast && keyed.length <= 4){
      add('ORDER', at, `the last card hands the work off ("${last.slice(0, 48)}…"), so its slot is fixed without the science`);
    }
    if(arrows.length){
      add('ORDER', at, `${arrows.length} card(s) refer to another card's output ("${(arrows[0].match(ARROW) ?? [''])[0]}") — the order is written into the prose`);
    }
  });
}

const byKind = (k) => findings.filter(f => f.kind === k);
for(const k of ['LEAK', 'GIVEAWAY', 'ORDER']){
  const hits = byKind(k);
  if(!hits.length) continue;
  console.log(`\n${k}: ${hits.length}`);
  for(const f of (verbose ? hits : hits.slice(0, 6))) console.log(`  · ${f.at} — ${f.msg}`);
  if(!verbose && hits.length > 6) console.log(`  … ${hits.length - 6} more (--verbose)`);
}
if(!findings.length) console.log(`\n✓ theme "${themeName}": every question survives all three probes`);
else console.log(`\n${findings.length} probe finding(s) in theme "${themeName}"`);
// This used to exit 0 whatever it found: the findings were smells rather than
// contradictions, and a false positive should not stop a build. The cost of that
// was a probe nobody had to answer to — `npm run check` printed the findings and
// then said "All checks passed", and the ORDER probe went in against 15 leaking
// card sets that had been in the games for as long as the games had.
//
// All seven themes are clean now, so the gate can be a gate. A finding that is
// genuinely a false positive is answered by rewording the card — which is cheap,
// and is the same edit the true positives need. `--advisory` restores the old
// behaviour for anyone who wants the list without the exit code.
const advisory = process.argv.includes('--advisory');
if(findings.length && !advisory){
  console.log(`  (reword the card, or re-run with --advisory to ignore)`);
}
process.exit(findings.length && !advisory ? 1 : 0);
