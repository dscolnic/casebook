// discoveryHistory.mjs — the games that re-enact real work name the real people,
// say what really happened, and never put the wrong answer in a real mouth.
//
//   node engine/dev/discoveryHistory.mjs <theme>
//   node engine/dev/discoveryHistory.mjs --all
//   node engine/dev/discoveryHistory.mjs --selftest
//
// WHY THIS EXISTS. The Quick Discoveries dramatise real experiments, and their
// rosters now carry the real people who did them — Rutherford, Geiger and
// Marsden; Franklin, Gosling and Crick; Penzias and Wilson; Tharp, Hess and
// Matthews; Gianotti and Incandela; Weiss and González. Several are alive. That
// is a defensible thing to do and it stops being defensible in three specific
// ways, so each of the three is a rule here rather than a habit somebody
// remembers.
//
// Before the pass that added them, three rosters were in the worst available
// state: not real and not invented but **pastiche** — `Ernest Rutherfield`,
// `Hedda Geiger`, `Tomas Marsden`, `Marta Leavett`, `Anton Slipworth`. A reader
// who knew the history saw three mangled names; one who did not learnt three
// that were almost right and would go on to mis-cite them.
//
// WHAT IT CANNOT SEE. Whether the note is *true*. Nothing here checks a date
// against a source, and the notes were written by hand from the record — a wrong
// year would pass every rule below. What it checks is that the note exists, that
// it and the roster agree about who is real, and that being real is never used
// to sell a claim the game itself marks unsupported.
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir, editionBase } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');

/** Shortest defensible note: who, when, where, and what was compressed. */
const MIN_WORDS = 60;

const args = process.argv.slice(2);
const wantAll = args.includes('--all');
const selftest = args.includes('--selftest');
const wanted = args.filter(a => !a.startsWith('--'));

/**
 * A theme's manifest and its cast, or null when this file has no question about it.
 *
 * The subject is any theme whose roster names somebody real, plus every Quick
 * Discovery. Keyed off the content rather than off the theme id prefix: a
 * campaign that puts a real scientist on its roster owes the same three things
 * whether or not its name begins `qd_`.
 */
async function load(name){
  const dir = themeDir(name);
  const tf = resolve(dir, 'theme.js');
  if(!existsSync(tf)) return null;
  const mod = await import(pathToFileURL(tf).href);
  const theme = mod.theme ?? mod.default;
  if(!theme) return null;
  const rf = resolve(dir, 'content', 'roster.js');
  let roster = [];
  if(existsSync(rf)){
    const rm = await import(pathToFileURL(rf).href);
    roster = rm.ROSTER ?? rm.roster ?? rm.default ?? [];
  }
  const real = roster.filter(p => p?.real);
  const isQuickDiscovery = /^qd[_-]/.test(name);
  if(!real.length && !isQuickDiscovery) return null;
  return { name, theme, roster, real, isQuickDiscovery };
}

/**
 * Every unsupported claim on an ATTEST board, with who signed it.
 *
 * The format's whole subject is that the record is not the condition, so the
 * board is *built* out of claims that do not hold. Whose name is on those is the
 * question: an invented colleague signing one is drama, and a real scientist
 * signing one is a sentence the game invented and attributed to a person who
 * exists. The books already got this right by hand — every unsupported claim is
 * signed by `press office`, `a review draft`, `a summer student`, `a theory
 * group` — and this is what keeps it right once a rename makes a signature real.
 */
function unsupportedClaims(content){
  const out = [];
  for(const group of Object.values(content.CURRICULUM ?? {})){
    for(const lesson of group ?? []){
      // The format payload hangs off `game`, not off the lesson. The first
      // version of this read `lesson.attest` and found **nothing in any
      // campaign** — it reported all-clear on ten games and passed the injected
      // bug, which is `fieldCoverage`'s nine mute instruments arriving one file
      // over. Both shapes are read because the harness cases below are written
      // flat and the shipped content is not; the count is asserted either way.
      const claims = lesson?.game?.attest?.claims ?? lesson?.attest?.claims;
      if(!Array.isArray(claims)) continue;
      for(const c of claims){
        // `backed` is the flag that says something on the table supports it.
        // Anything else is a claim the player is being asked to hold.
        if(!c?.backed && c?.signedBy) out.push({ lesson: lesson.title, ...c });
      }
    }
  }
  return out;
}

/** Every ATTEST board in a campaign, however few. Used to tell "this game has
 *  no such board" from "this checker cannot find one", which are the same
 *  output and were the same output for the first hour this file existed. */
function attestBoards(content){
  let n = 0;
  for(const group of Object.values(content.CURRICULUM ?? {})){
    for(const lesson of group ?? []){
      if(lesson?.game?.attest?.claims ?? lesson?.attest?.claims) n++;
    }
  }
  return n;
}

async function contentOf(name){
  const dir = themeDir(name);
  const f = resolve(dir, 'content', 'curriculum.js');
  if(!existsSync(f)) return {};
  const m = await import(pathToFileURL(f).href);
  return { CURRICULUM: m.CURRICULUM ?? m.curriculum ?? m.default ?? {} };
}

async function check(name){
  const info = await load(name);
  if(!info) return { skipped: true };
  const { theme, roster, real, isQuickDiscovery } = info;
  const problems = [];
  const notes = [];

  const history = theme.history ?? [];
  const words = history.join(' ').split(/\s+/).filter(Boolean).length;

  // 1. A game that re-enacts real work says so, once, at the end.
  if(isQuickDiscovery && !history.length){
    problems.push('no `history` — a game that dramatises a real discovery has to say '
      + 'what really happened and who did it, or the player cannot tell which parts did');
  } else if(history.length && words < MIN_WORDS){
    problems.push(`the history note is ${words} words — under ${MIN_WORDS} it cannot carry `
      + 'who, when, where and what was compressed, which is the whole job');
  }

  // 2. The note and the roster agree about who is real. A rename that moves a
  //    person out of the cast and leaves them in the note, or the other way
  //    round, is how the two descriptions drift apart.
  const text = history.join(' ');
  for(const p of real){
    const surname = String(p.name).trim().split(/\s+/).pop();
    if(surname && !text.includes(surname)){
      problems.push(`${p.name} is flagged \`real\` on the roster and is not named in the `
        + 'history note — a real person in the cast is a person the note owes credit to');
    }
  }

  // 3. The player is never one of them. Every Quick Discovery casts the player
  //    as an unnamed role — "You are the analyst on the team" — and that is the
  //    one line that must not become a real person: the player is told they made
  //    the calls, and attributing those to somebody who existed is a claim about
  //    what that person did.
  const opening = (theme.opening ?? []).join(' ');
  if(isQuickDiscovery){
    if(!/\bYou are the\b/.test(opening)){
      problems.push('the opening does not cast the player as a role — "You are the …" is what '
        + 'keeps the player an invented person on a roster of real ones');
    }
    for(const p of real){
      const surname = String(p.name).trim().split(/\s+/).pop();
      // "You are …" followed closely by a real name is the shape to catch.
      const re = new RegExp(`You are[^.]{0,80}\\b${surname}\\b`);
      if(re.test(opening)) problems.push(`the opening appears to cast the player as ${p.name}`);
    }
  }

  // 4. The rule the whole flag exists for.
  const content = await contentOf(name);
  const realSurnames = new Map(real.map(p => [String(p.name).trim().split(/\s+/).pop(), p.name]));
  for(const c of unsupportedClaims(content)){
    const signer = String(c.signedBy ?? '').trim();
    const hit = [...realSurnames.keys()].find(sn => new RegExp(`\\b${sn}\\b`).test(signer));
    if(hit){
      problems.push(`"${c.lesson}": an unsupported claim is signed by ${realSurnames.get(hit)}, `
        + 'who is a real person — put an invented colleague or an unnamed office on it');
    }
  }

  const boards = attestBoards(content);
  if(real.length) notes.push(`${real.length} of ${roster.length} on the roster are real people`);
  if(history.length) notes.push(`history note ${words} words`);
  notes.push(boards ? `${boards} ATTEST board(s) read` : 'no ATTEST board');
  return { problems, notes, real: real.length, roster: roster.length };
}

// ------------------------------------------------------------------ selftest
//
// Four cases. The first two would invert silently, which is why they exist at
// all: a rule that cannot fail is a comment.
function runSelftest(){
  const cases = [];

  // 1. The signature test has to read `backed`, not the presence of a signer.
  //    Reading "is it signed by a real person" alone fails every correct board,
  //    because real people sign the claims that DO hold and that is the point.
  const board = { CURRICULUM: { A: [{ title: 'T', attest: { claims: [
    { id: 'ok', label: 'x', signedBy: 'Gianotti', backed: true },
    { id: 'bad', label: 'y', signedBy: 'press office' },
  ] } }] } };
  cases.push(['a real person signing a backed claim is not a finding',
    unsupportedClaims(board).length === 1
    && unsupportedClaims(board)[0].signedBy === 'press office']);

  // 2. And it has to fire when the signature IS real and the claim is not
  //    backed. Without this, case 1 passes by the carver returning nothing.
  const bad = { CURRICULUM: { A: [{ title: 'T', attest: { claims: [
    { id: 'bad', label: 'y', signedBy: 'Gianotti' },
  ] } }] } };
  const found = unsupportedClaims(bad);
  cases.push(['a real person signing an unsupported claim is found',
    found.length === 1 && found[0].signedBy === 'Gianotti']);

  // 3. A board with no attest block contributes nothing rather than throwing.
  cases.push(['a lesson with no ATTEST board is skipped',
    unsupportedClaims({ CURRICULUM: { A: [{ title: 'T' }, null] } }).length === 0]);

  // 4. A surname match is a word match. "Ross" must not match inside "Gross",
  //    or a roster with both would report a finding against the wrong person.
  const sn = 'Ross';
  cases.push(['a surname is matched whole, not as a substring',
    !new RegExp(`\\b${sn}\\b`).test('Eilam Gross')]);

  // 5. THE SHIPPED NESTING. The format payload is under `game`, and reading
  //    `lesson.attest` finds nothing in any campaign in this repo — which is a
  //    checker that passes every theme by measuring an empty set. This case is
  //    the one that failed when the bug was live; the four above all passed.
  const shipped = { CURRICULUM: { A: [{ title: 'T', game: { attest: { claims: [
    { id: 'ok', label: 'x', signedBy: 'Gianotti', backed: true },
    { id: 'bad', label: 'y', signedBy: 'press office' },
  ] } } }] } };
  const s5 = unsupportedClaims(shipped);
  cases.push(['a claim nested under `game.attest` is found, which is where they all are',
    s5.length === 1 && s5[0].signedBy === 'press office']);

  // 6. And the board counter sees the same nesting, so "no ATTEST board" means
  //    the campaign has none rather than that the carver went blind.
  cases.push(['the board counter reads the shipped nesting too',
    attestBoards(shipped) === 1 && attestBoards({ CURRICULUM: { A: [{ title: 'T' }] } }) === 0]);

  let bad2 = 0;
  for(const [what, ok] of cases){
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
    if(!ok) bad2++;
  }
  console.log(bad2 ? `\ndiscoveryHistory selftest: ${bad2} case(s) failed.`
                   : '\ndiscoveryHistory selftest: all cases pass.');
  return bad2;
}

let failed = 0;
if(selftest){
  failed = runSelftest();
} else {
  const names = wantAll || !wanted.length ? themeNames() : wanted;
  let measured = 0;
  for(const name of names){
    if(editionBase(name)) continue;
    let r;
    try{ r = await check(name); }
    catch(err){
      console.log(`${name}: could not be read — ${String(err.message).slice(0, 120)}`);
      failed++;
      continue;
    }
    if(r.skipped) continue;
    measured++;
    const head = `${name.padEnd(14)} ${r.real}/${r.roster} real · ${r.notes.join(' · ')}`;
    if(r.problems.length){
      console.log(`✗ ${head}`);
      for(const p of r.problems) console.log(`    ${p}`);
      failed += r.problems.length;
    } else {
      console.log(`✓ ${head}`);
    }
  }
  if(measured){
    console.log(failed
      ? `\n${failed} problem(s) across the games that name real people.`
      : `\n${measured} game(s) name real people, credit them, and never sign a wrong answer with one.`);
  }
}
process.exit(failed ? 1 : 0);
