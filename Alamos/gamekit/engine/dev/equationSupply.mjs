// equationSupply.mjs — does the player have the equation the verdict does
// arithmetic with?
//
//   node engine/dev/equationSupply.mjs <theme>
//   node engine/dev/equationSupply.mjs --all
//   node engine/dev/equationSupply.mjs --selftest
//
// The complaint this exists for, about Blackout's day 1: "this question requires
// equations to understand that aren't given." It was true. The stop asks what
// stepping 20 kV to 400 kV does to current and to line loss; answering it needs
// P = IV (current falls 20×) and P = I²R (loss falls 400×); the campaign does not
// compute either until day 4; and the one equation printed on the card is the
// turns ratio, which the question never uses because it hands you both voltages.
//
// ## What is measured
//
// A stop DEMANDS an equation when the arithmetic it puts in front of the player
// uses it — the options, the answer, the rebuttals or the `why` write its symbols,
// or name it and then work a number. A mention is not a demand: a scene saying
// "the transformer steps it up" asks nothing of the reader. The OPTIONS count as
// much as the verdict, and leaving them out is how the first version of this file
// passed the stop it was written for: Blackout's day-1 choices are "current falls
// by 20× and resistive line loss falls by 400×" against three other pairings, so
// the whole question is that arithmetic and the `why` merely repeats it.
//
// A stop is SUPPLIED an equation three ways, and only these three:
//
//   · a question on an EARLIER day computes it — strictly earlier, because
//     `openStopIndices` opens a day's stops in any order, so a stop beside its own
//     prerequisite is one half the players meet second. Same rule as conceptOrder.
//   · this stop computes it itself — its relationship, template, worked solution
//     or DERIVE lines state it, so the equation is on the screen being used.
//   · the card prints it as an equation chip, with its symbols named.
//
// `assumes` is deliberately NOT a supply. Blackout's stop already declares
// "electrical power and energy over time — taken as read", and that declaration is
// exactly what let a day-1 CHOICE rest on two uncomputed relations while every
// other check stayed green. A sentence saying the player ought to know an equation
// is not the equation.
//
// ## Why the other checkers cannot see this
//
// `equationOrder` reasons only about stops that compute, so a CHOICE — which has
// no relationship, no template and no worked solution — is invisible to it at both
// ends. `syllabusEquations` asserts no chip is shown before the day something
// computes it, which says nothing about an equation nothing ever computes.
// `conceptOrder` is satisfied by a `takesAsRead` declaration. Between them they
// leave exactly this hole: the arithmetic a player is shown, with nothing to do it
// from.
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { EQUATIONS, deriveWork, instrumentWork, keywordHit, symbolSignature,
         demandsEquation } from '../../tools/syllabus.js';

const here = dirname(new URL(import.meta.url).pathname);
const DEBT = resolve(here, 'equation-supply-debt.json');

/** Short signatures ("q<k") would fire on anything — the same floor `equationCoverage` uses. */
const SIGNIFICANT = (sig) => sig.length >= 8 && /[a-z]/.test(sig) && /[=/*+^-]/.test(sig);

/**
 * The gaps, from a plain description of a campaign.
 *
 * `stops` is every question in campaign order: `{ day, title, group, type,
 * formula, verdict, chips }`. Taking the data rather than a theme is what lets
 * the selftest build a campaign whose answer is known.
 */
export function supplyGaps({ equations = [], stops = [] } = {}){
  const out = [];
  const sigsOf = (e) => String(e).split(/,\s+/).map(symbolSignature).filter(SIGNIFICANT);
  for(const eq of equations){
    const sigs = sigsOf(eq.e);
    const keys = eq.k ?? [];
    const computesAt = [];
    for(const s of stops){
      const fSig = s._fSig ?? (s._fSig = symbolSignature(s.formula ?? ''));
      if(sigs.some(x => fSig.includes(x)) || keys.some(k => keywordHit(s.formula ?? '', k))) computesAt.push(s);
    }
    const firstComputedDay = computesAt.length ? Math.min(...computesAt.map(s => s.day)) : null;
    for(const s of stops){
      // The same rule the importer uses to decide whether to print the chip —
      // `demandsEquation` in tools/syllabus.js — so a stop cannot be demanding by
      // one description and decorative by the other.
      if(!demandsEquation(eq, s.verdict)) continue;
      const computesHere = computesAt.includes(s);
      const earlier = firstComputedDay !== null && firstComputedDay < s.day;
      // `card: false` is the third-and-beyond chip, which the card does not print.
      const chipped = (s.chips ?? []).some(c => symbolSignature(c) === symbolSignature(eq.e));
      if(computesHere || earlier || chipped) continue;
      out.push({ day: s.day, group: s.group, title: s.title, type: s.type, e: eq.e,
        computedDay: firstComputedDay,
        why: firstComputedDay === null ? 'no question computes it'
          : `first computed on day ${firstComputedDay}` });
    }
  }
  return out.sort((a, b) => a.day - b.day || String(a.title).localeCompare(String(b.title)));
}

const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');

/** Every question of a theme, in campaign order, as `supplyGaps` wants it. */
export async function stopsOf(themeName){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const CURRICULUM = content.CURRICULUM ?? {};
  const stops = [];
  const seen = new Set();
  for(const [mi, m] of (content.MISSIONS ?? []).entries()){
    for(const st of m.stops ?? []){
      const l = CURRICULUM[st.group]?.[st.lesson];
      if(!l?.game) continue;
      // Each lesson once, at its first day: a callback is the same card again, and
      // counting it twice would let a day-13 review "supply" a day-1 stop.
      const key = `${st.group}:${st.lesson}`;
      if(seen.has(key)) continue;
      seen.add(key);
      const ch = l.game ?? {};
      stops.push({
        day: mi + 1, group: st.group, title: l.title ?? '', type: ch.type ?? ch.format ?? '',
        // The arithmetic this stop does: the same fields `syllabusEquations` calls
        // computing, from the same helpers.
        formula: [ch.relationship, ch.template, ch.solution, ...deriveWork(ch), ...instrumentWork(ch)]
          .filter(Boolean).join('  '),
        // The arithmetic the player is shown: the four options they choose between
        // and everything the verdict says afterwards.
        verdict: [ch.answerText, ch.answer, ch.why, ch.explanation, ch.solution,
          ...(ch.rebuttals ?? []).map(label), ...(ch.choices ?? []).map(label)]
          .filter(Boolean).join('  '),
        // What the card prints, chip row or door. Past the second chip the cap
        // sets `card: false` and the row does not show it — but the Background
        // door spells out every equation this stop computes with or is worked
        // from, so those still reach the player. An equation on neither reaches
        // nobody, and supplies nothing.
        chips: (l.equations ?? []).filter(e => e.card !== false || e.computed || e.demanded)
          .map(e => e.e),
      });
    }
  }
  return stops;
}

export function equationsOf(themeName){
  return EQUATIONS[themeName] ?? EQUATIONS[String(themeName).replace(/_/g, '-')] ?? [];
}

const debt = existsSync(DEBT) ? JSON.parse(readFileSync(DEBT, 'utf8')) : {};
const rowKey = (f) => `${f.group}/${f.title} :: ${f.e}`;

async function run(names){
  let failed = 0, gaps = 0;
  for(const themeName of names){
    const equations = equationsOf(themeName);
    if(!equations.length){ continue; }
    const findings = supplyGaps({ equations, stops: await stopsOf(themeName) });
    const recorded = new Set(debt[themeName] ?? []);
    const fresh = findings.filter(f => !recorded.has(rowKey(f)));
    const paid = [...recorded].filter(k => !findings.some(f => rowKey(f) === k));
    gaps += findings.length;
    if(!fresh.length && !paid.length){
      console.log(`✓ ${themeName}: every equation a verdict computes with is on the card or already taught`
        + (findings.length ? ` (${findings.length} recorded gap(s))` : ''));
      continue;
    }
    failed += 1;
    console.log(`\n✗ ${themeName}: ${fresh.length} unsupplied equation(s)`);
    for(const f of fresh){
      console.log(`  ✗ day ${f.day} · ${f.type} · "${f.title}" does arithmetic with ${f.e} — ${f.why}`);
      console.log('      supply it: compute it earlier, compute it here, or print it on this card');
    }
    for(const k of paid){
      console.log(`  ✗ equation-supply-debt.json lists "${k}" for ${themeName}, which is supplied now — delete the line`);
    }
  }
  console.log(failed ? `\n${failed} theme(s) with unrecorded gaps.` : `\nall supplied or recorded — ${gaps} recorded gap(s).`);
  process.exit(failed ? 1 : 0);
}

async function selftest(){
  let bad = 0;
  const check = (what, ok, got) => { console.log(`  ${ok ? '✓' : '✗'} ${what}${ok ? '' : ` — ${got}`}`); if(!ok) bad++; };
  const equations = [{ e: 'P = IV, and P = I²R', c: 'power and loss', k: ['line loss', 'resistive loss'] }];
  const stop = (over) => ({ day: 1, group: 'GEN', title: 'wires', type: 'CHOICE',
    formula: '', verdict: '', chips: [], ...over });
  console.log('equationSupply selftest');

  const bare = [stop({ verdict: 'Current falls by 20×, so resistive loss falls by 400×.' })];
  check('a verdict that works a number with an equation nothing supplies is a gap',
    supplyGaps({ equations, stops: bare }).length === 1, JSON.stringify(supplyGaps({ equations, stops: bare })));

  const chipped = [stop({ verdict: 'Current falls by 20×, so resistive loss falls by 400×.',
    chips: ['P = IV, and P = I²R'] })];
  check('…and not a gap when the card prints the equation',
    supplyGaps({ equations, stops: chipped }).length === 0, JSON.stringify(supplyGaps({ equations, stops: chipped })));

  const taught = [stop({ day: 1, title: 'loss', type: 'BALLPARK', formula: 'Line loss = 3 × I² × R per phase' }),
    stop({ day: 3, verdict: 'Current falls by 20×, so resistive loss falls by 400×.' })];
  check('…nor when an earlier day computes it',
    supplyGaps({ equations, stops: taught }).length === 0, JSON.stringify(supplyGaps({ equations, stops: taught })));

  // The rule that makes it an ORDERING check rather than a coverage one: a day's
  // stops open in any order, so the same day is not early enough.
  const sameDay = [stop({ day: 3, title: 'loss', type: 'BALLPARK', formula: 'Line loss = 3 × I² × R per phase' }),
    stop({ day: 3, verdict: 'Current falls by 20×, so resistive loss falls by 400×.' })];
  check('…but the same day is not earlier — a day opens its stops in any order',
    supplyGaps({ equations, stops: sameDay }).length === 1, JSON.stringify(supplyGaps({ equations, stops: sameDay })));

  // The options are part of the demand: a CHOICE whose four candidates are the
  // arithmetic asks it whatever the `why` says.
  const optioned = [stop({ verdict: 'Current falls by 20× and resistive line loss falls by 400×.' })];
  check('arithmetic in the options counts, not only in the verdict',
    supplyGaps({ equations, stops: optioned }).length === 1, JSON.stringify(supplyGaps({ equations, stops: optioned })));

  const named = [stop({ verdict: 'The resistive loss is what never arrives at the far end.' })];
  check('naming the idea without working a number is not a demand',
    supplyGaps({ equations, stops: named }).length === 0, JSON.stringify(supplyGaps({ equations, stops: named })));

  const own = [stop({ verdict: 'Current falls by 20×, so resistive loss falls by 400×.',
    formula: 'Resistive loss = I² × R, paid once per phase' })];
  check('a stop that computes it itself supplies it',
    supplyGaps({ equations, stops: own }).length === 0, JSON.stringify(supplyGaps({ equations, stops: own })));

  // `assumes` is not a supply, and this is the case the whole file is about: the
  // blackout stop declared the prerequisite and still left the player with nothing.
  const declared = [stop({ verdict: 'Current falls by 20×, so resistive loss falls by 400×.',
    assumes: ['electrical power and energy over time'] })];
  check('a takesAsRead declaration does not supply an equation',
    supplyGaps({ equations, stops: declared }).length === 1, JSON.stringify(supplyGaps({ equations, stops: declared })));

  console.log(bad ? `\n${bad} selftest case(s) failed.` : '\nAll equationSupply selftest cases passed.');
  process.exit(bad ? 1 : 0);
}

const args = process.argv.slice(2);
if(args.includes('--selftest')) await selftest();
else await run(args.includes('--all') || !args[0] ? themeNames() : [args[0]]);
