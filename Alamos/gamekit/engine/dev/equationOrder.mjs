// equationOrder.mjs — no equation is asked before the one it is built out of.
//
//   node engine/dev/equationOrder.mjs <theme> [--all]
//
// `syllabusEquations` asks whether the course's equations are taught at all, and
// enforces one ordering rule: nothing is *shown* before the day something computes
// it. This asks the other question, and it is the one that decides whether a
// campaign is teachable in the order it is played.
//
// Difficulty is not the test. A hard equation on day 1 is fine — Blackout opens on
// the swing equation and that is the situation the game is about. What is not fine
// is asking for a result before the thing it is derived from: impulse before F = ma,
// the chain rule before the power rule, apparent power before P = IV. The player can
// do the arithmetic either way; what they cannot do is see where the relation came
// from, so the stop teaches a formula rather than a mechanism.
//
// The dependency is authored as `needs` in `tools/syllabus.js`, beside the equation
// it belongs to, because it is a claim about the subject and not about any one game.
//
// Two failures, and they are different:
//   · a prerequisite computed later than its dependent — the campaign is out of order
//   · a prerequisite computed nowhere at all, while something built on it is — the
//     course teaches the consequence and never the rule. This is the more common one
//     and the more expensive; F = ma was mentioned on four of Bring Them Home's days
//     and never once put through a question.
//
// Mentions do not settle the debt. An equation printed on a card is a reference; an
// equation a question gets a number out of is the one the player has actually used,
// which is the same distinction `computed` makes everywhere else in this file's
// neighbourhood.
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { EQUATIONS } from '../../tools/syllabus.js';

const args = process.argv.slice(2);
const wanted = args.includes('--all') || !args[0] ? themeNames() : [args[0]];
const DEBT_FILE = 'engine/dev/equation-debt.json';
const debt = existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : {};
let failures = 0;

for(const themeName of wanted){
  let theme;
  try {
    theme = (await import(pathToFileURL(resolve(resolveTheme(themeName), 'theme.js')).href)).default;
  } catch(err){
    console.log(`${themeName}: cannot load theme — ${err.message}`);
    failures++;
    continue;
  }
  const list = EQUATIONS[themeName] ?? EQUATIONS[String(themeName).replace(/_/g, '-')] ?? [];
  if(!list.length) continue;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  // Before normalizing, because the card cap runs in there: a stop is allowed to
  // *print* two equations and Blackout's loss stop computes three. Reading the
  // trimmed list would have said the RMS convention arrives eleven days after the
  // question that uses it, which is a fact about how much fits on a card.
  const authored = new Map();
  for(const [group, lessons] of Object.entries(content.CURRICULUM ?? {})){
    (lessons ?? []).forEach((l, li) => authored.set(`${group}:${li}`, (l.equations ?? []).slice()));
  }
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];

  // Every `needs` has to name an equation this course actually carries, or the
  // edge is a typo pointing at nothing and the check quietly passes.
  const known = new Set(list.map(eq => eq.e));
  for(const eq of list){
    for(const need of eq.needs ?? []){
      if(!known.has(need)){
        console.log(`✗ ${themeName}: ${eq.e} needs "${need}", which is not in this course's equations`);
        failures++;
      }
    }
  }

  // The day an equation reaches the player is the shaped day, not its position in
  // the book: a callback pulls an earlier lesson into a later day, and first
  // arrival is the one that counts.
  const dayOf = new Map();
  MISSIONS.forEach((m, mi) => (m.stops ?? []).forEach(st => {
    const key = `${st.group}:${st.lesson}`;
    if(!dayOf.has(key) || mi + 1 < dayOf.get(key)) dayOf.set(key, mi + 1);
  }));
  const computed = new Map(), shown = new Map(), where = new Map();
  for(const [group, lessons] of Object.entries(CURRICULUM)){
    (lessons ?? []).forEach((l, li) => {
      const day = dayOf.get(`${group}:${li}`);
      if(!day) return;
      for(const eq of (authored.get(`${group}:${li}`) ?? l.equations ?? [])){
        if(!shown.has(eq.e) || day < shown.get(eq.e)) shown.set(eq.e, day);
        if(eq.computed && (!computed.has(eq.e) || day < computed.get(eq.e))){
          computed.set(eq.e, day);
          where.set(eq.e, `day ${day}, ${group}[${li}] ${l.title ?? ''}`);
        }
      }
    });
  }

  const bad = [];
  for(const eq of list){
    const day = computed.get(eq.e);
    if(day === undefined) continue;      // never asked, so it owes nothing
    for(const need of eq.needs ?? []){
      if(!known.has(need)) continue;
      const dep = computed.get(need);
      if(dep === undefined) bad.push({ eq, need, day, dep: null, seen: shown.get(need) ?? null });
      else if(dep > day) bad.push({ eq, need, day, dep, seen: shown.get(need) ?? null });
    }
  }

  // DEBT, for the same reason `curriculum-debt.json` exists.
  //
  // This file had no recorded baseline, which was fine while every graph in the repo
  // predated the games it measured. It stopped being fine the moment somebody wrote a
  // truthful `needs` list on a shipping game: Midway had none, and authoring twelve
  // turned a green check into seven failures, all of them true — an AP Physics 1
  // campaign that computes everything built on ΣF = ma and never computes ΣF = ma.
  // With no debt path the only ways forward are to fix the content in the same commit
  // or to write a graph you know is wrong, and the second is what actually happens.
  // Same two properties as everywhere else: a row not on the list fails immediately,
  // and a row on the list that has since been fixed also fails, naming the line to
  // delete. It only shrinks.
  const allowed = new Set(debt[themeName] ?? []);
  const key = (b) => `${b.eq.e} ← ${b.need}`;
  const fresh = bad.filter(b => !allowed.has(key(b)));
  const stale = [...allowed].filter(k => !bad.some(b => key(b) === k));
  for(const k of stale){
    console.log(`✗ ${themeName}: ${DEBT_FILE} lists "${k}", which is in order now — delete the line`);
    failures++;
  }
  if(!fresh.length){
    console.log(`✓ ${themeName}: every equation a question asks has its prerequisites asked first`
      + (allowed.size ? `  (${allowed.size} known inversion(s) recorded)` : ''));
    continue;
  }
  failures += fresh.length;
  console.log(`✗ ${themeName}: ${fresh.length} equation(s) asked before what they are built on`);
  for(const b of fresh){
    console.log(`    ${b.eq.e} — asked ${where.get(b.eq.e)}`);
    console.log(`      built on ${b.need}, ` + (b.dep
      ? `which no question asks until day ${b.dep}`
      : `which no question ever asks${b.seen ? ` (shown on a card from day ${b.seen})` : ''}`));
  }
}

process.exit(failures ? 1 : 0);
