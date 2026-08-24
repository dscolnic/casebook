// delivery.mjs — every course adventure builds one thing, and says so on day 1.
//
//   node engine/dev/delivery.mjs <theme>
//   node engine/dev/delivery.mjs --all
//   node engine/dev/delivery.mjs --selftest
//
// WHY THIS EXISTS. A campaign was fifteen days of correct answers with nothing
// between them: the opening card said what was at stake, the ending said how it
// turned out, and the twelve days in between left nothing behind that a player
// could walk up to and look at. `theme.delivery` is what a campaign is *for* —
// one named thing, one piece of it per day, kept on a board in one room — and
// three surfaces read it, so all three fail quietly if any part of the
// declaration is wrong:
//
//   · the opening card names it, or day 1 does not know what day 15 produces;
//   · `deliveryPieces` pairs piece n with mission n, so a list of the wrong
//     LENGTH silently drops the last day's piece or invents a sixteenth;
//   · `delivery.where` has to be an area with a ROOM, because the board is built
//     by `interiorBuilding.js` on first entry — name an area with no interior and
//     the pieces are gathered nowhere, with nothing raised anywhere.
//
// That third one is the reason this file is a gate rather than a note. Every
// other part of the feature is visible the first time somebody plays a day; a
// board built in a room that cannot be entered is invisible for a whole campaign
// and looks exactly like a board nobody has walked to yet.
//
// WHAT IT CANNOT SEE. Whether the pieces are the right pieces — whether "The
// corridor rating sheet" is what day 4 actually produced. That is a reading job
// and it is the one thing here nothing can measure: the pieces were written
// against the fifteen mission takeaways by hand.
//
// The Quick Discoveries are deliberately out of scope. Nine stops in one sitting
// is not a fortnight and has nothing to accumulate; they are recognised by
// `dayNoun: 'Level'` rather than by an id prefix, so a future short game is
// covered by what it is rather than by what it is called.
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const DEBT_FILE = resolve(here, 'delivery-debt.json');

const args = process.argv.slice(2);
const wantAll = args.includes('--all');
const selftest = args.includes('--selftest');
const wanted = args.filter(a => !a.startsWith('--'));

/**
 * Words that cannot identify a delivery.
 *
 * The opening card has to name the thing the fortnight builds, and the cheap way
 * to check that is to look for the delivery's own words in the card. That check
 * is worthless against a name made of nothing but the words every campaign uses:
 * an opening that happens to contain "the report" would satisfy "The Report", and
 * "case" appears in every one of these games because a stop IS a case. So the
 * test runs on what is left after these come out, and a name with nothing left is
 * itself the finding.
 */
const GENERIC = new Set(['the', 'a', 'an', 'of', 'and', 'for', 'to', 'on', 'in', 'at', 'by', 'with',
  'case', 'report', 'plan', 'file', 'files', 'book', 'document', 'documents', 'record', 'records',
  'set', 'list', 'pack', 'brief', 'briefing', 'paper', 'papers', 'folder', 'summary', 'note', 'notes',
  'day', 'days', 'week', 'weeks', 'work', 'thing']);

/** The words in a delivery name that could only be this delivery. */
export function distinctiveWords(name){
  return String(name ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 4 && !GENERIC.has(w));
}

/**
 * Does the opening card name the delivery?
 *
 * Every distinctive word, not any of them: "The Winter Operating Case" is
 * satisfied by "one winter operating case" and NOT by "an operating case", which
 * is a different document and is the phrase an author reaches for when they have
 * not decided what the thing is yet. A light plural allowance, because a card
 * writes "the flood maps" where a title says "map" — and no stemming beyond that,
 * because "operating" and "operation" are not the same claim.
 */
export function namesDelivery(openingText, name){
  const words = distinctiveWords(name);
  if(!words.length) return false;
  const text = String(openingText ?? '').toLowerCase();
  return words.every(w => new RegExp(`\\b${w}(s|es)?\\b`).test(text));
}

/**
 * Is there anywhere in this place to hang the board?
 *
 * Two answers, because the games are built two ways and the board is put up by
 * whichever builder owns the room. An **outdoor** game's areas are buildings with
 * doors, and `interiorBuilding.js` builds the room behind the door on first entry
 * — so the test is whether `theme.interiors` has an entry for the area. A
 * **floor** game's areas are rooms off a corridor, built by `interiorSite.js` from
 * `plan.rooms`, and `interiorFloor` deliberately registers no door interactable
 * for them: the room is right there and the district copy is scenery. So the test
 * there is whether the plan has a room for the area.
 *
 * Getting this wrong in either direction is the failure this gate exists for: an
 * area with neither means the board is built somewhere nobody can reach, which
 * renders, raises nothing, and looks exactly like a board not walked to yet.
 */
function roomFor(theme, where){
  if(theme?.interiors?.[where]) return 'a room behind a door';
  const rooms = theme?.site?.plan?.rooms ?? [];
  if(rooms.some(r => r.group === where)) return 'a room on the plan';
  return null;
}

/** A piece is a short noun phrase: a thing you could hand somebody. */
export function pieceProblem(piece){
  const s = String(piece ?? '').trim();
  if(!s) return 'is empty';
  if(/[.!?]$/.test(s)) return `is a sentence, not a thing: "${s}"`;
  const words = s.split(/\s+/).length;
  if(words < 2) return `is one word: "${s}"`;
  if(words > 8) return `is ${words} words, which no board cell holds: "${s}"`;
  if(s.length > 46) return `is ${s.length} characters, which no board cell holds: "${s}"`;
  return null;
}

function readDebt(){
  if(!existsSync(DEBT_FILE)) return { unwritten: [] };
  try{ return JSON.parse(readFileSync(DEBT_FILE, 'utf8')); }
  catch{ return { unwritten: [] }; }
}

async function load(name){
  const dir = themeDir(name);
  const tf = resolve(dir, 'theme.js');
  if(!existsSync(tf)) return null;
  const mod = await import(pathToFileURL(tf).href);
  const theme = mod.theme ?? mod.default;
  return theme ? { name, theme } : null;
}

/**
 * One campaign.
 *
 * `skipped` for anything that is not a fifteen-day campaign — a Quick Discovery,
 * the scaffold, the instrument test bed. `owed` for a course adventure with no
 * delivery yet, which is a finding unless the debt file records it.
 */
export function checkTheme(theme, { debt = [] } = {}){
  const problems = [];
  const notes = [];
  const missions = theme?.content?.MISSIONS ?? [];
  // The instrument test bed is not a campaign: it exists so every answer format
  // can be opened in one place, and it has no fortnight to build anything over.
  if(theme?.id === 'instruments' || theme?.id === '_template'){
    return { skipped: 'not a campaign', problems, notes };
  }
  if(String(theme?.dayNoun ?? 'Day') === 'Level' || missions.length < 10){
    return { skipped: 'not a course adventure', problems, notes };
  }
  const d = theme?.delivery;
  if(!d){
    const excused = debt.includes(theme?.id);
    return { owed: true, excused, problems: excused ? [] :
      ['declares no `delivery`: a fortnight with nothing to show for it, and no board anywhere'],
      notes: excused ? ['no delivery yet — recorded in delivery-debt.json'] : [] };
  }

  // ---- the thing itself
  if(!String(d.name ?? '').trim()) problems.push('`delivery.name` is empty');
  const whatWords = String(d.what ?? '').trim().split(/\s+/).filter(Boolean).length;
  if(!whatWords) problems.push('`delivery.what` is empty: nothing says who receives this or what it lets them do');
  else if(whatWords < 12) problems.push(`\`delivery.what\` is ${whatWords} words — say who receives it and what it lets them do`);
  else if(whatWords > 48) problems.push(`\`delivery.what\` is ${whatWords} words: it is a caption on a board, not a briefing`);
  if(!distinctiveWords(d.name).length){
    problems.push(`"${d.name}" is made only of words every campaign uses, so nothing can tell whether `
      + 'the opening card names it — give it a name only this campaign could have');
  }

  // ---- where it is kept
  const groups = theme?.content?.GROUPS ?? [];
  const group = groups.find(g => g.id === d.where);
  if(!d.where) problems.push('`delivery.where` is empty: the pieces are gathered nowhere');
  else if(!group) problems.push(`\`delivery.where\` is "${d.where}", which is not one of this campaign's areas`);
  else if(!roomFor(theme, d.where)){
    problems.push(`\`delivery.where\` is "${d.where}", which is an area with nowhere to stand:`
      + ' no interior behind a door and no room of its own on the plan, so the board would be'
      + ' built where nobody can walk into it');
  }

  // ---- one piece per day
  const pieces = Array.isArray(d.pieces) ? d.pieces : [];
  if(pieces.length !== missions.length){
    problems.push(`${pieces.length} piece(s) for ${missions.length} ${String(theme.dayNoun ?? 'day').toLowerCase()}s:`
      + ' piece n is mission n, so the count has to match or the last day hands over nothing');
  }
  const seen = new Map();
  pieces.forEach((p, i) => {
    const bad = pieceProblem(p);
    if(bad) problems.push(`piece ${i + 1} ${bad}`);
    const key = String(p ?? '').trim().toLowerCase();
    if(seen.has(key)) problems.push(`piece ${i + 1} repeats piece ${seen.get(key) + 1}: "${p}"`);
    else seen.set(key, i);
    const m = missions[i];
    if(m && key && key === String(m.takeaway ?? '').trim().toLowerCase()){
      problems.push(`piece ${i + 1} is mission ${i + 1}'s takeaway verbatim — the takeaway is already on the board beside it`);
    }
  });

  // ---- the opening card knows about it
  const opening = (theme?.opening ?? []).join(' ');
  if(!opening.trim()) problems.push('no opening card, so nothing tells the player what the fortnight produces');
  else if(!namesDelivery(opening, d.name)){
    problems.push(`the opening card never names ${d.name}: the player is told what is at stake`
      + ' and not what they are building');
  }

  notes.push(`${pieces.length} piece(s)`);
  if(group) notes.push(`kept in ${group.name}`);
  return { problems, notes, pieces: pieces.length, name: d.name };
}

// ------------------------------------------------------------------ selftest
//
// Seven cases. Three of them are inversions that would leave this file green over
// a broken feature, which is the only reason a selftest is worth the lines.
function runSelftest(){
  const cases = [];
  const room = { A: { rooms: 1 } };
  const base = {
    id: 't', dayNoun: 'Day', opening: ['We are building the Winter Operating Case this fortnight.'],
    interiors: room,
    content: { GROUPS: [{ id: 'A', name: 'Ops' }], MISSIONS: [{ takeaway: 'x' }, { takeaway: 'y' }] },
    delivery: { name: 'The Winter Operating Case', where: 'A', pieces: ['The reserve page', 'The rating sheet'],
      what: 'The one document the regulator accepts before the winter peak, and the reason the lights stay on.' },
  };
  // A ten-mission floor would skip the two-mission fixture, so the subject test
  // is exercised separately and everything else runs with the floor lifted.
  const check = (t) => checkTheme({ ...t, content: { ...t.content,
    MISSIONS: [...(t.content?.MISSIONS ?? []), ...Array(9).fill({ takeaway: 'z' })] } });
  const withPieces = (t, n) => ({ ...t, delivery: { ...t.delivery,
    pieces: Array.from({ length: n }, (_, i) => `The page ${i + 1}`) } });

  // 1. THE CASE THAT HAS TO PASS. A correct declaration is silent — a gate that
  //    fires on the shipped shape is a gate somebody turns off.
  cases.push(['a correct delivery is silent',
    check(withPieces(base, 11)).problems.length === 0]);

  // 2. The generic-word inversion. "the case" is in every one of these games,
  //    because a stop is a case; a name check that accepts it passes every
  //    campaign whose opening card says nothing about what is being built.
  cases.push(['an opening that only says "the case" does not name The Winter Operating Case',
    !namesDelivery('We take the case tonight and hold the corridor.', 'The Winter Operating Case')]);

  // 3. And it has to accept the real card, or case 2 passes by refusing everything.
  cases.push(['an opening that says "one winter operating case" does name it',
    namesDelivery('In fifteen nights you sign one winter operating case.', 'The Winter Operating Case')]);

  // 4. Every distinctive word, not any: half a name is a different document.
  cases.push(['half the name is not the name',
    !namesDelivery('You sign an operating case at the end of it.', 'The Winter Operating Case')]);

  // 5. THE STRUCTURAL INVERSION. An area with no interior means the board is
  //    built in a room that cannot be entered — which raises nothing anywhere,
  //    renders nothing, and is invisible for a whole campaign.
  const noRoom = check(withPieces({ ...base, interiors: { B: {} } }, 11));
  cases.push(['a `where` with neither a door-room nor a room on the plan is a finding',
    noRoom.problems.some(p => p.includes('nowhere to stand'))]);

  // 5b. And a FLOOR game passes on its plan alone. The hospital, Mission Control
  //     and the observatory declare no `interiors` at all — their rooms are part
  //     of the place — so a rule that only reads `interiors` would refuse every
  //     one of them and be "fixed" by deleting the rule that matters.
  const floor = check(withPieces({ ...base, interiors: {},
    site: { plan: { rooms: [{ id: 'r1', group: 'A' }] } } }, 11));
  cases.push(['a floor game with a room on the plan and no door-rooms is silent',
    floor.problems.length === 0]);

  // 6. A piece list of the wrong length. `deliveryPieces` walks the pieces and
  //    reads mission n beside piece n, so a short list drops the last day
  //    silently and a long one invents a day that has no takeaway to print.
  cases.push(['a piece list shorter than the campaign is a finding',
    check(withPieces(base, 7)).problems.some(p => p.includes('piece(s) for'))]);

  // 7. A piece is a thing, not a sentence — and a comma in one is fine, because
  //    "The corridor rating, at 40°C" is a thing you can hand somebody.
  cases.push(['a sentence is not a piece, and a comma is not a sentence',
    !!pieceProblem('It is the page the regulator reads.') && !pieceProblem('The corridor rating, at 40C')]);

  // 8. The subject test. A Quick Discovery has nothing to accumulate and must be
  //    skipped by what it IS rather than by what it is called.
  cases.push(['a nine-level discovery is not a course adventure',
    checkTheme({ id: 'qd_x', dayNoun: 'Level', content: { MISSIONS: Array(9).fill({}) } }).skipped]);

  let bad = 0;
  for(const [what, ok] of cases){
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
    if(!ok) bad++;
  }
  console.log(bad ? `\ndelivery selftest: ${bad} case(s) failed.`
                  : '\ndelivery selftest: all cases pass.');
  return bad;
}

let failed = 0;
if(selftest){
  failed = runSelftest();
} else {
  const debt = readDebt().unwritten ?? [];
  const names = wantAll || !wanted.length ? themeNames() : wanted;
  let measured = 0, owed = 0, paid = 0;
  for(const name of names){
    const loaded = await load(name).catch(err => {
      console.log(`${name}: could not be read — ${String(err.message).slice(0, 120)}`);
      failed++;
      return null;
    });
    if(!loaded) continue;
    const r = checkTheme(loaded.theme, { debt });
    if(r.skipped) continue;
    measured++;
    if(r.owed){
      owed++;
      const head = `${name.padEnd(22)} no delivery`;
      if(r.excused) console.log(`· ${head} — recorded in delivery-debt.json`);
      else { console.log(`✗ ${head}`); for(const p of r.problems) console.log(`    ${p}`); failed += r.problems.length; }
      continue;
    }
    paid++;
    const head = `${name.padEnd(22)} ${String(r.name ?? '').slice(0, 34).padEnd(34)} ${r.notes.join(' · ')}`;
    if(r.problems.length){
      console.log(`✗ ${head}`);
      for(const p of r.problems) console.log(`    ${p}`);
      failed += r.problems.length;
    } else console.log(`✓ ${head}`);
    // A theme in the debt file that now has one: say so, or the list only ever grows.
    if(debt.includes(loaded.theme.id)){
      console.log(`    note: ${loaded.theme.id} is still listed in delivery-debt.json and can come off it`);
    }
  }
  if(measured){
    console.log(failed
      ? `\n${failed} problem(s) across ${measured} course adventure(s).`
      : `\n${paid} of ${measured} course adventure(s) build something, ${owed} still to write.`);
  }
}
process.exit(failed ? 1 : 0);
