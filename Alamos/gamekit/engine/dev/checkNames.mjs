// checkNames.mjs — is a person introduced, with their job, the first time the
// campaign names them?
//
//   node engine/dev/checkNames.mjs <theme>
//   node engine/dev/checkNames.mjs --selftest
//
// The complaint this exists for: "a number of names are introduced as if we should
// know the names, before the character is really introduced." It was true in six of
// the seven games — mission stakes opened with a bare surname doing something
// ("Osei wants a list this morning", "Chen does not trust them yet") for somebody
// the player had never met and would not meet for another six shifts.
//
// **The rule is now the job, not the name.** A full name used to count as an
// introduction by itself, and "Dolores Reyes says the steadying matters more than
// the fall" tells a player nothing about why hers is the opinion in the sentence.
// `introRule.mjs` is the rule, shared with `warmupOrder.mjs`, which asks it of a
// run's card — often where a name lands first.
//
// **Where it looks is half the check.** The old version read the stakes, the
// briefings and the scenes, so a name whose first appearance was on the opening
// card or a warm-up card was judged on its *second* mention instead — and the
// first ten of those were exactly the ones a player meets before the game has
// taught them anything. Every surface that carries prose is read now, in the
// order the campaign shows it.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';
import { introduces, names, nameOf } from './introRule.mjs';
import { warmupPlan } from '../core/warmups.js';

/** Every string the campaign shows, in the order a player reads them. */
export function narrativeSlots(theme, content){
  const slots = [];
  // `scope` is how much of the slot the reader has in front of them at once. A
  // warm-up card is a headline over a paragraph — "Mbeki walks the liquefaction
  // line once" with the job in the sentence under it introduces her perfectly
  // well — so the card is judged whole. Everything else is judged by the
  // sentence, because a job two sentences later is not beside the name.
  const push = (where, text, scope = 'sentence') => {
    if(typeof text === 'string' && text.trim()) slots.push([where, text, scope]);
  };
  const opening = Array.isArray(theme?.opening) ? theme.opening : [theme?.opening];
  opening.forEach((p, i) => push(opening.length > 1 ? `the opening card, paragraph ${i + 1}` : 'the opening card', p));

  const missions = content?.MISSIONS ?? [];
  const day = n => `${theme?.dayNoun ?? 'day'} ${n}`;
  // A warm-up card is read before that morning's plan, so it comes first.
  const byDay = new Map();
  for(const s of warmupPlan({ days: missions.length, hasFar: !!content?.TIERS?.far?.length })){
    byDay.set(s.day, (byDay.get(s.day) ?? []).concat(s.slot));
  }
  for(const [mi, m] of missions.entries()){
    for(const slot of byDay.get(mi + 1) ?? []){
      const w = content?.WARMUPS?.[slot] ?? content?.WARMUPS?.[slot.split('-')[0]];
      // The card is one thing to read: a name in the title is introduced by the why.
      if(w) push(`${day(mi + 1)} warm-up card "${slot}"`, `${w.title ?? ''}. ${w.why ?? ''}`, 'block');
    }
    push(`${day(mi + 1)} stake`, m.stake);
    push(`${day(mi + 1)} briefing`, m.briefing);
    push(`${day(mi + 1)} objective`, m.objective);
    push(`${day(mi + 1)} primer`, m.primer);
    for(const st of m.stops ?? []){
      const l = content?.CURRICULUM?.[st.group]?.[st.lesson];
      if(!l) continue;
      const at = `${day(mi + 1)} "${l.title}"`;
      push(`${at} scene`, l.scene ?? l.story);
      push(`${at} guide`, l.guide);
      for(const p of l.background ?? []) push(`${at} background`, p);
      const g = l.game ?? {};
      push(`${at} task`, g.task); push(`${at} question`, g.question); push(`${at} why`, g.why);
      push(`${at} takeaway`, l.takeaway);
      for(const c of g.choices ?? []) push(`${at} option`, typeof c === 'string' ? c : c?.label);
    }
  }
  (theme?.ending ?? []).forEach((p, i) => push(`the ending card, paragraph ${i + 1}`, p));
  return slots;
}

/**
 * The sentence a name landed in — what the reader has in front of them.
 *
 * An initial is not a full stop. "The laboratory director, J. Robert
 * Oppenheimer, has scheduled a colloquium" split at the `J.` and the window
 * became "Robert Oppenheimer, has scheduled…", which lost the job in front of
 * the name and reported an introduction that was right there. Same shape as
 * `readabilityParity`'s numeral: a measurement that cannot read one spelling of
 * a thing reports confidently on prose that is already correct.
 */
const ABBREV = /(?:\b[A-Z]|\bDr|\bMr|\bMrs|\bMs|\bProf|\bSt|\bNo|\bvs|\betc|\bapprox)$/;
export function sentenceEnds(text){
  const out = [];
  const re = /[.!?]+/g;
  let m;
  while((m = re.exec(text))){
    const before = text.slice(0, m.index);
    const after = text.slice(m.index + m[0].length);
    if(ABBREV.test(before)) continue;               // an initial, or a courtesy title
    if(after && !/^[\s"”’')\]]/.test(after)) continue;  // 11.4 — a decimal point
    out.push(m.index + m[0].length);
  }
  return out;
}

export function sentenceAround(text, re){
  const at = text.search(re);
  if(at < 0) return text;
  const ends = sentenceEnds(text);
  const start = Math.max(0, ...ends.filter(i => i <= at));
  const end = ends.find(i => i > at) ?? text.length;
  return text.slice(start, end).trim();
}

/** Everyone whose first mention does not say what they do. */
export function unintroducedInCampaign(theme, content){
  const slots = narrativeSlots(theme, content);
  const roster = content?.ROSTER ?? [];
  // Two people can share a surname — Robert and Kitty Oppenheimer — and then a
  // bare "Oppenheimer" belongs to whichever of them the sentence is about. The
  // surname stops being an address, so each of them is looked for by their full
  // name, and one who is never named in full is not named at all.
  const shared = new Set();
  const seen = new Set();
  for(const p of roster){
    const n = nameOf(p);
    if(!n) continue;
    if(seen.has(n.surname)) shared.add(n.surname);
    seen.add(n.surname);
  }
  const out = [];
  for(const person of roster){
    const n = nameOf(person);
    if(!n) continue;
    const esc = w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const full = shared.has(n.surname) && n.givens.length
      ? new RegExp(`\\b(?:${n.givens.map(esc).join('|')})\\s+${esc(n.surname)}\\b`)
      : null;
    const hit = full ? slots.find(([, text]) => full.test(text)) : slots.find(([, text]) => names(text, person));
    if(!hit) continue;
    const [where, text, scope] = hit;
    const re = full ?? new RegExp(`(^|[^A-Za-z])${n.surname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`);
    const plain = text.replace(/<[^>]+>/g, ' ');
    const sentence = scope === 'block' ? plain : sentenceAround(plain, re);
    if(introduces(sentence, person)) continue;
    out.push({ name: person.name, role: person.role, where, sentence });
  }
  return out;
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY){
  if(process.argv.includes('--selftest')) await selftest();
  else await run(process.argv[2]);
}

async function run(themeName){
  if(!themeName){
    console.error('usage: node engine/dev/checkNames.mjs <theme>');
    process.exit(2);
  }
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);

  const findings = unintroducedInCampaign(theme, content);
  if(!findings.length){
    console.log(`\n✓ theme "${themeName}": every person is introduced with their job the first time they are named`);
  } else {
    console.log(`\n${findings.length} name(s) used before the job is stated in "${themeName}"`);
    for(const f of findings){
      console.log(`  · ${f.name} — ${f.role ?? 'no role on the roster'}`);
      console.log(`    first named in ${f.where}: …${f.sentence.slice(0, 140)}…`);
    }
    console.log('  (put the job beside the name at the first mention: "Reyes, the shift supervisor, …")');
  }
  process.exit(findings.length ? 1 : 0);
}

/**
 * Two cases that would otherwise invert silently, and one the rule change is
 * about. Putting each bug back fails that case and only that case.
 */
async function selftest(){
  let bad = 0;
  const check = (what, ok, got) => { console.log(`  ${ok ? '✓' : '✗'} ${what}${ok ? '' : ` — ${got}`}`); if(!ok) bad++; };
  const person = { id: 'reyes', name: 'Dolores Reyes', role: 'Shift Supervisor, System Operations' };
  const mk = stake => ({
    theme: { title: 't', opening: 'The valley is short of power this morning.', ending: [] },
    content: { ROSTER: [person], CURRICULUM: {}, MISSIONS: [{ stake, stops: [] }] },
  });
  console.log('checkNames selftest');

  const full = mk('Dolores Reyes says the steadying matters more than the fall.');
  check('a full name is not an introduction — the job is what the rule is about',
    unintroducedInCampaign(full.theme, full.content).length === 1,
    JSON.stringify(unintroducedInCampaign(full.theme, full.content)));

  const said = mk('Reyes, the shift supervisor, says the steadying matters more than the fall.');
  check('a job in apposition introduces them',
    unintroducedInCampaign(said.theme, said.content).length === 0,
    JSON.stringify(unintroducedInCampaign(said.theme, said.content)));

  // The slot list is the other half of the check: a name whose first appearance is
  // on the opening card must be judged there, not on its second mention in a stake.
  const early = {
    theme: { title: 't', opening: 'Dolores Reyes has the room and the fortnight is short.', ending: [] },
    content: { ROSTER: [person], CURRICULUM: {},
      MISSIONS: [{ stake: 'Reyes, the shift supervisor, wants the trend read.', stops: [] }] },
  };
  check('the opening card is read, so a name introduced only later still fails',
    unintroducedInCampaign(early.theme, early.content).length === 1,
    JSON.stringify(unintroducedInCampaign(early.theme, early.content)));

  // And the same for a warm-up card, which is read before that morning's plan.
  const warm = {
    theme: { title: 't', opening: 'The valley is short of power.', ending: [] },
    content: { ROSTER: [person], CURRICULUM: {}, WARMUPS: { greet: { title: 'The shift changes at seven', why: 'Reyes takes new engineers round the room once before the first shift.' } },
      MISSIONS: [{ stake: 'Reyes, the shift supervisor, wants the trend read.', stops: [] }] },
  };
  check('a warm-up card is read before that morning\'s stake',
    unintroducedInCampaign(warm.theme, warm.content).length === 1,
    JSON.stringify(unintroducedInCampaign(warm.theme, warm.content)));

  // A warm-up card is a headline over a paragraph, and the two are read together.
  const carded = {
    theme: { title: 't', opening: 'The valley is short of power.', ending: [] },
    content: { ROSTER: [person], CURRICULUM: {},
      WARMUPS: { greet: { title: 'Reyes walks the yard once',
        why: 'Reyes, the shift supervisor, knows where every cable crosses the road.' } },
      MISSIONS: [{ stake: 'The trend wants reading before seven.', stops: [] }] },
  };
  check('a warm-up card is judged whole — the job may be in the why under the title',
    unintroducedInCampaign(carded.theme, carded.content).length === 0,
    JSON.stringify(unintroducedInCampaign(carded.theme, carded.content)));

  // The job said in the campaign's own words, hung off the name.
  const clause = mk('Reyes, who supervises the shift, says the steadying matters more than the fall.');
  check('a clause off the name that says the job in the book\'s own words counts',
    unintroducedInCampaign(clause.theme, clause.content).length === 0,
    JSON.stringify(unintroducedInCampaign(clause.theme, clause.content)));

  // "her quality assurance lead, Rie Nakamura" is an introduction; the first
  // version of the rule only knew the definite article and failed it.
  const possessive = mk('The utility director and her shift supervisor, Dolores Reyes, stop agreeing at seven.');
  check('a possessive determiner in front of the job counts',
    unintroducedInCampaign(possessive.theme, possessive.content).length === 0,
    JSON.stringify(unintroducedInCampaign(possessive.theme, possessive.content)));

  // The job may be a phrase with the department in it.
  const long = mk('The statistics say nothing, and the head of the Theoretical Division, Dolores Reyes, wants both.');
  check('a role phrase with a department in it still introduces them',
    unintroducedInCampaign(long.theme, long.content).length === 0,
    JSON.stringify(unintroducedInCampaign(long.theme, long.content)));

  // The suffix rule makes an occupation out of a word ending in -er, and most
  // words ending in -er are not one.
  const notJob = mk('The river water is up, and Dolores Reyes says the steadying matters more.');
  check('a word that merely ends in -er does not name somebody\'s job',
    unintroducedInCampaign(notJob.theme, notJob.content).length === 1,
    JSON.stringify(unintroducedInCampaign(notJob.theme, notJob.content)));

  // An initial is not a full stop, and the window is the whole check.
  const initial = mk('The shift supervisor, D. Dolores Reyes, says the steadying matters more.');
  check('an initial does not cut the sentence in half',
    unintroducedInCampaign(initial.theme, initial.content).length === 0,
    JSON.stringify(unintroducedInCampaign(initial.theme, initial.content)));

  // Two people with one surname: a bare mention belongs to neither of them.
  const kitty = { name: 'Katherine Reyes', role: 'Botanist' };
  const two = {
    theme: { title: 't', opening: 'Reyes, the shift supervisor, has the room this fortnight.', ending: [] },
    content: { ROSTER: [person, kitty], CURRICULUM: {},
      MISSIONS: [{ stake: 'The trend wants reading before seven.', stops: [] }] },
  };
  check('a shared surname is looked for in full, so the other one is not named at all',
    unintroducedInCampaign(two.theme, two.content).length === 0,
    JSON.stringify(unintroducedInCampaign(two.theme, two.content)));

  // A job noun in the sentence that belongs to somebody else is not an introduction.
  const other = mk('Reyes tells the substation technician to wait for the switching order.');
  check('a job noun belonging to somebody else does not introduce them',
    unintroducedInCampaign(other.theme, other.content).length === 1,
    JSON.stringify(unintroducedInCampaign(other.theme, other.content)));

  console.log(bad ? `\n${bad} selftest case(s) failed.` : '\nAll checkNames selftest cases passed.');
  process.exit(bad ? 1 : 0);
}
