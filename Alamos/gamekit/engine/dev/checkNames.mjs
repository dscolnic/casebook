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



/**
 * Ordinary words that can stand in front of a surname. Closed, short, and the
 * reason the rule above does not fire on prose. A miss here costs one false
 * finding that a reader dismisses in a second; a first name on this list would
 * hide a real one, so nothing that could be a person's name goes on it.
 */
const OPENERS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'so', 'if', 'when', 'while', 'since',
  'that', 'this', 'these', 'those', 'then', 'now', 'today', 'tonight', 'tomorrow', 'yesterday',
  'what', 'why', 'how', 'who', 'where', 'which', 'whether', 'both', 'each', 'every', 'either',
  'after', 'before', 'by', 'with', 'without', 'about', 'against', 'until', 'unless', 'because',
  'he', 'she', 'it', 'they', 'we', 'you', 'her', 'his', 'their', 'its', 'our', 'your', 'my',
  'ask', 'tell', 'find', 'give', 'take', 'read', 'watch', 'meet', 'call', 'send', 'catch',
  'follow', 'bring', 'check', 'walk', 'talk', 'say', 'said', 'says', 'let', 'make', 'get', 'put',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'first', 'last',
  'day', 'night', 'morning', 'evening', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday',
  'saturday', 'sunday', 'nobody', 'somebody', 'everybody', 'neither', 'nothing', 'something',
  // Prepositions and adverbs that open a sentence in front of a name. Every one
  // of these produced a false finding on shipped prose: "In Brennan's notebook",
  // "Meanwhile Twill has", "Use Novotny's figure", "At Iyer's desk", "On Sarkis's
  // reading".
  'in', 'on', 'at', 'to', 'for', 'from', 'over', 'under', 'meanwhile', 'use', 'once', 'again',
  'later', 'still', 'only', 'even', 'just', 'most', 'more', 'less', 'next', 'back', 'out', 'up',
  'down', 'near', 'past', 'per', 'via', 'plus', 'inside', 'outside', 'across', 'along', 'around',
  'between', 'beside', 'behind', 'below', 'above', 'beyond', 'during', 'despite', 'toward',
  // Courtesy titles and ranks. `introRule` already has an opinion about these,
  // and none of them is a first name.
  'dr', 'mr', 'mrs', 'ms', 'miss', 'prof', 'professor', 'doctor', 'captain', 'commander',
  'chief', 'lieutenant', 'sergeant', 'nurse', 'sister', 'father', 'sir', 'lady', 'lord',
  // Name particles: the roster spells them lowercase and a sentence-initial
  // "Von Neumann" or "De Vries" is the same person, not another one.
  'von', 'van', 'de', 'da', 'du', 'del', 'della', 'di', 'la', 'le', 'mac', 'mc', 'o']);

/**
 * A name that reads as somebody on the roster and is not.
 *
 * Blackout's day-2 stake said "a fuel limit **Amira Haddad** flagged this
 * morning", and day 15 gave a forecast width to **Ravi Lindgren**. The roster
 * has Nadia Haddad and Sten Lindgren, and nobody else. So two of that
 * campaign's fifteen day cards handed work to people who do not exist: no NPC
 * in the world, no passage to read, nothing on the map — and the player, who has
 * met Nadia Haddad and Sten Lindgren, reads a first name they half recognise and
 * files it as somebody they have not been introduced to yet.
 *
 * Nothing caught it. `checkNames` asks whether everybody ON the roster is
 * introduced; it never asked whether everybody introduced is on the roster.
 *
 * THE RULE IS DELIBERATELY NARROW: a `Firstname Surname` where the surname is a
 * roster surname and the first name belongs to nobody who holds it. That is the
 * defect exactly, and it cannot fire on a place ("Kestrel Bay"), a product
 * ("Ardley Fab 7"), a trial name ("CLARION-3") or a real historical figure,
 * because none of those share a surname with the cast. A wholly invented name —
 * "Marta Whitcombe" in a game with no Whitcombe — is NOT reported: telling those
 * apart from a street, a ship or a company needs a list of first names, and a
 * checker that guesses at that reports confidently on correct prose.
 */
export function impostorNames(theme, content){
  const roster = content?.ROSTER ?? [];
  const givensBySurname = new Map();
  /** Surname -> the roster's own spelling of whoever holds it, for the message. */
  const heldBy = new Map();
  for(const p of roster){
    const n = nameOf(p);
    if(!n) continue;
    const set = givensBySurname.get(n.surname) ?? new Set();
    // Every word of the roster's own spelling, so a nickname it carries counts:
    // the roster says `William “Deak” Parsons` and the cards say "Deak Parsons",
    // which is the same man and was the first thing this rule got wrong.
    for(const w of String(p.name ?? '').split(/[^\p{L}']+/u)) if(w) set.add(w.toLowerCase());
    // Lowercased, because a roster spells a particle "von Neumann" and a sentence
    // that starts on him spells it "Von Neumann" — the same man, and the first
    // version of this reported him as an impostor in his own campaign.
    for(const g of n.givens) set.add(g.toLowerCase());
    givensBySurname.set(n.surname, set);
    heldBy.set(n.surname, (heldBy.get(n.surname) ?? []).concat(String(p.name ?? '').trim()));
  }
  const out = [];
  const seen = new Set();
  for(const [where, text] of narrativeSlots(theme, content)){
    const plain = String(text).replace(/<[^>]+>/g, ' ');
    for(const m of plain.matchAll(/(^|[^-\p{L}])(\p{Lu}[\p{Ll}']+)\s+(\p{Lu}[\p{Ll}']+)\b/gu)){
      // The `[^-\w]` in front matters: a hyphenated given name is one name.
      // Without it "Mei-Ling Cho" reads as "Ling Cho", and Red Sand reported its
      // own metallurgist as somebody who does not exist.
      const [, , given, surname] = m;
      const givens = givensBySurname.get(surname);
      if(!givens || givens.has(given.toLowerCase())) continue;
      // The word in front of a surname is capitalised for two different reasons,
      // and the first version of this could not tell them apart: it reported
      // "What Dube does next" and "Catch Whitlock before the shift" as people.
      // A closed stoplist of ordinary openers is the whole fix — everything on it
      // is a word that can stand in front of a name in English prose, and a name
      // is never on it. A capitalised word NOT on the list, in front of a roster
      // surname, is somebody.
      if(OPENERS.has(given.toLowerCase())) continue;
      const key = `${given} ${surname}`;
      if(seen.has(key)) continue;
      seen.add(key);
      out.push({ name: key, surname, real: (heldBy.get(surname) ?? []).join(', '), where });
    }
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

  const impostors = impostorNames(theme, content);
  for(const i of impostors){
    console.log(`\n✗ "${i.name}" is nobody: the roster has ${i.real}, and this card is in ${i.where}`);
    console.log('  (a card cannot hand work to somebody the player can never meet — use the person who holds that surname, or add them to the roster)');
  }

  const findings = unintroducedInCampaign(theme, content);
  if(!findings.length && !impostors.length){
    console.log(`\n✓ theme "${themeName}": every person is introduced with their job the first time they are named, and every name on a card is on the roster`);
  } else if(!findings.length){
    console.log(`\n${impostors.length} name(s) on a card belong to nobody in "${themeName}"`);
  } else {
    console.log(`\n${findings.length} name(s) used before the job is stated in "${themeName}"`);
    for(const f of findings){
      console.log(`  · ${f.name} — ${f.role ?? 'no role on the roster'}`);
      console.log(`    first named in ${f.where}: …${f.sentence.slice(0, 140)}…`);
    }
    console.log('  (put the job beside the name at the first mention: "Reyes, the shift supervisor, …")');
  }
  process.exit(findings.length + impostors.length ? 1 : 0);
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
  //
  // FIFTEEN MISSIONS, not one, and that is the fix rather than a detail. The
  // warm-up schedule spreads its runs over a campaign — `warmupPlan` returns an
  // empty list for anything under about ten days — so a one-day fixture has no
  // warm-up card in it at all, and this case failed for years on a campaign that
  // could not have shown the defect. The rule was right the whole time.
  const filler = { stake: 'Nothing happens today.', stops: [] };
  const warm = {
    theme: { title: 't', opening: 'The valley is short of power.', ending: [] },
    content: { ROSTER: [person], CURRICULUM: {}, WARMUPS: { greet: { title: 'The shift changes at seven', why: 'Reyes takes new engineers round the room once before the first shift.' } },
      MISSIONS: [{ stake: 'Reyes, the shift supervisor, wants the trend read.', stops: [] },
                  ...Array.from({ length: 14 }, () => filler)] },
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

  // ——— the impostor rule ————————————————————————————————————————————
  //
  // Three cases, and the third is the one that decides whether the rule is worth
  // having: an ordinary capitalised word in front of a surname must NOT be read
  // as a person, or the rule fires on prose and gets turned off.
  const nadia = { name: 'Nadia Haddad', role: 'Generation Lead', division: 'GEN' };
  const impostorThemeOf = (stake) => ({
    theme: { dayNoun: 'Day', opening: ['x'] },
    content: { ROSTER: [nadia], CURRICULUM: {}, MISSIONS: [{ stake, stops: [] }] },
  });
  {
    const t = impostorThemeOf('A fuel limit Amira Haddad flagged this morning.');
    const found = impostorNames(t.theme, t.content);
    check('a first name nobody with that surname holds is reported',
      found.length === 1 && found[0].name === 'Amira Haddad');
  }
  {
    const t = impostorThemeOf('Nadia Haddad flagged the fuel limit this morning.');
    check('the person who actually holds the surname is not reported',
      impostorNames(t.theme, t.content).length === 0);
  }
  {
    const t = impostorThemeOf('What Haddad does next is the whole morning. Catch Haddad before seven.');
    check('an ordinary word in front of a surname is not a person',
      impostorNames(t.theme, t.content).length === 0);
  }

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
