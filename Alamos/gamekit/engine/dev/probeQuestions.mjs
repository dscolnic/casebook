// probeQuestions.mjs — four checks a question has to survive.
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
      // The takeaway is now shown *before* the question rather than in the
      // verdict, because a player who is stuck needs to know what the question
      // is about. That only works while the takeaway is the principle rather
      // than the answer: if it shares most of the keyed option's content words,
      // the card hands the answer over above the options.
      const CONTENT_STOP = new Set(('the a an of to in is it and or that this for on with as by at from what which '
        + 'how why be are was were you your they their its not no more than into over under when where').split(' '));
      const contentOf = (t) => String(t ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/).filter(w => w.length > 3 && !CONTENT_STOP.has(w));
      const take = new Set(contentOf(l.takeaway));
      const keyWords = contentOf(right);
      if(take.size && keyWords.length >= 3){
        const shared = keyWords.filter(w => take.has(w)).length / keyWords.length;
        if(shared >= 0.4){
          add('LEAK', at, `the takeaway repeats ${Math.round(shared * 100)}% of the keyed answer's own words, and it is shown before the question — make it the principle rather than the answer`);
        }
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

    // ---- 2b. GIVEAWAY, for a sweep: is the reading printed above the plot?
    //
    // A sweep has no options, so neither test above sees it, and the failure is
    // cruder than either: the number the player is meant to find is written in
    // the text they read on the way in. Four of the first six sweeps did this —
    // one of them stated a frequency inside its own tolerance — which turns
    // "find the feature" into "drag to the number you were just told".
    if(ch.sweep && Number.isFinite(+ch.sweep.target)){
      const shown = String(+ch.sweep.target);
      // The day's stake counts. It is the first thing the player reads, it is on
      // the plan card and on the `B` key all day, and Quantum's day 3 opened with
      // "T1 at around 90 microseconds and T2 at 32" — the answer to that day's
      // sweep, printed before the player had walked anywhere.
      const read = [scene, ch.question, ch.task, ch.headline, m.stake ?? '',
        ...(l.assumes ?? [])].join(' ');
      const bare = new RegExp(`(^|[^\\d.])${shown.replace('.', '\\.')}([^\\d]|$)`);
      if(bare.test(read)){
        add('GIVEAWAY', at, `the sweep's own target (${shown}) is printed in the scene or the question`);
      }
      // Near enough also counts. One sweep named 4.56 GHz for a target of 4.555
      // with a tolerance of 0.012, so reading the scene landed inside the answer
      // without ever touching the slider. Only numbers carrying the axis's own
      // unit are considered — "40 picotesla" is not a candidate for an answer
      // measured in seconds, and unit-blind matching reported it as one.
      const unit = String(ch.sweep.axis?.unit ?? '').trim();
      if(unit){
        const carried = new RegExp(`(-?[\\d,]+(?:\\.\\d+)?)\\s*${unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        for(const m of read.matchAll(carried)){
          const v = +m[1].replace(/,/g, '');
          if(Number.isFinite(v) && Math.abs(v - +ch.sweep.target) <= +ch.sweep.tolerance){
            add('GIVEAWAY', at, `"${m[0]}" in the scene or question is inside the sweep's own tolerance`
              + ` of ${ch.sweep.target} — the answer can be read rather than found`);
          }
        }
      }
      // The criterion has to be somewhere, though: "find the best place for it"
      // with no statement of what makes a place best is not a question anybody
      // can answer, and it graded against a hidden definition.
      if(!/\?/.test(String(ch.question ?? ''))){
        add('GIVEAWAY', at, 'the sweep asks nothing — its `question` is an instruction, so the criterion the'
          + ' reading is graded against is never stated');
      }
      if(!String(ch.answer ?? '').trim()){
        add('GIVEAWAY', at, 'the sweep has no answerText, so the verdict names no correct reading');
      }
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

// ---- 4. ECHO: does a matching answer just say the prompt again?
//
// A matching question is only worth answering if getting from the left column to
// the right one takes a step. Half of these were imported from design documents
// that wrote the pair as one sentence cut in two, so the right-hand option
// repeated the left-hand prompt in the same words — "Some escaping neutrons are
// scattered back toward the fissile region" was answered by "Use the layer as a
// neutron reflector, scattering some escaping neutrons back toward the fissile
// region", every content word of the prompt included. A student matches those
// by eye.
//
// Content words only, crudely stemmed, and it takes two of them: a two-word
// prompt sharing one word is a coincidence, and the subject's own vocabulary has
// to be allowed to appear on both sides. Half the prompt's words is the line —
// the seven games now run at 0.44 and below, where the shared words are the
// topic rather than the answer.
const ECHO_STOP = new Set(('a an the of to in on at for with and or but is are was were be been being it its this that'
  + ' these those as by from into out up down over under not no nor so than then when while which who whom whose what'
  + ' where why how each every any all both few more most other some such only own same too very can will just do does'
  + ' did doing done have has had if because about after before during through against between within without one two'
  + ' three four you your we our they their he she his her them us me my i also must may might should would could shall').split(' '));
const stem = (w) => w.replace(/(ings?|ed|es|s|ly)$/, '');
const content_words = (s) => (words(s).filter(w => w.length > 2 && !ECHO_STOP.has(w)).map(stem));
for(const [group, lessons] of Object.entries(CURRICULUM)){
  (lessons ?? []).forEach((l, li) => {
    const ch = l?.game;
    if(!ch || !Array.isArray(ch.mapping) || !Array.isArray(ch.scenarios)) return;
    ch.scenarios.forEach((s, i) => {
      const prompt = new Set(content_words(label(s)));
      const answer = new Set(content_words(label(ch.choices?.[ch.mapping[i]])));
      if(prompt.size < 2) return;
      const shared = [...prompt].filter(w => answer.has(w));
      if(shared.length >= 2 && shared.length / prompt.size >= 0.5){
        add('ECHO', `${group}[${li}] "${l.title ?? ''}"`,
          `pair ${i + 1} of ${ch.scenarios.length} is answered in its own words — ${shared.length} of the prompt's ${prompt.size} content words reappear in the keyed option (${shared.slice(0, 4).join(', ')})`);
      }
    });
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
for(const k of ['LEAK', 'GIVEAWAY', 'ORDER', 'ECHO']){
  const hits = byKind(k);
  if(!hits.length) continue;
  console.log(`\n${k}: ${hits.length}`);
  for(const f of (verbose ? hits : hits.slice(0, 6))) console.log(`  · ${f.at} — ${f.msg}`);
  if(!verbose && hits.length > 6) console.log(`  … ${hits.length - 6} more (--verbose)`);
}
if(!findings.length) console.log(`\n✓ theme "${themeName}": every question survives all four probes`);
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
