// placement.mjs — is each question asked in the right kind of place?
//
//   node engine/dev/placement.mjs <theme> [<theme> …]
//   node engine/dev/placement.mjs --all
//   node engine/dev/placement.mjs --selftest
//
// THE RULE. A question about a thing should be asked in front of that thing.
// `stopKind()` in engine/content/normalize.js sorts every format into three:
//
//   decision    -> a PERSON        calculation -> a ROOM        operated -> a FIXTURE
//
// THE DEFECT THIS WAS WRITTEN FOR
//
// `shapeMissions` decided which call became the day's person stop by asking one
// question: does this area repeat today? That is a rule about not walking into
// the same room twice. It is a good rule and it knows nothing whatever about
// what is being asked there. Measured on Red Sand it put **eight of fifteen**
// person stops on a format that is not a decision, and four of those were live
// instruments — the plainest being a HOLD, where the player drives a reactor's
// temperature through a wandering feed for a minute or more while standing in a
// conversation with the analytical chemist. Nothing about the room, the person
// or the fiction had anything to do with it, and no gate in the repo looked.
//
// WHAT IS FAILED AND WHAT IS REPORTED, and the split is the point
//
//   FAIL   an `operated` format on a person stop. There is no reading of any of
//          these games in which you drive a control panel at a colleague.
//   FAIL   an `at:` naming a fixture that area does not declare — a stop pointed
//          at nothing, which lands the player back at the stand with no sign
//          that the authored placement was dropped.
//   NOTE   a `calculation` on a person stop. Weaker: an engineer can work a
//          number with you at their bench. Worth knowing, not worth failing.
//   NOTE   an area with `operated` stops and no fixtures declared, and a fixture
//          nothing points at. Both are the fixture catalogue being out of step
//          with the questions, in the two directions it can be.
//   NOTE   a day with no decision-format call, so the roster is never met.
//          A content finding rather than a placement one: the fix is a question,
//          not a place. Red Sand has three.
import { pathToFileURL } from 'node:url';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { stopKind, shapeMissions } from '../content/normalize.js';

/**
 * Judge one shaped campaign. Pure — takes content, returns findings — so the
 * selftest can hand it three stops instead of a theme.
 */
export function judge({ missions = [], curriculum = {}, fixtures = {}, minorPlaces = new Set() } = {}){
  const fail = [], note = [];
  let sited = 0;
  const declared = (g) => new Set((fixtures?.[g] ?? []).map(f => f.id));
  const pointedAt = {};
  let daysWithoutPerson = 0;

  missions.forEach((m, day) => {
    const where = `day ${day + 1}`;
    let person = 0;
    for(const stop of m.stops ?? []){
      const lesson = curriculum[stop.group]?.[stop.lesson];
      const kind = stopKind(lesson?.game?.type);
      const title = lesson?.title ?? '(untitled)';
      if(stop.person){
        person++;
        if(kind === 'operated'){
          fail.push(`${where}: "${title}" is ${lesson?.game?.type} — an operated format on a person stop.`
            + ' The player drives a control while standing in a conversation');
        } else if(kind === 'calculation'){
          note.push(`${where}: "${title}" is a calculation on a person stop — it wants a bench, not a shoulder`);
        }
      }
      // Where a stop names a fixture it resolves one of three ways, and the whole
      // value of this check is in telling them apart:
      //
      //   · in its own area        — asked at home. Ordinary.
      //   · under a MINOR place    — SITED. Deliberate, and the point of opening
      //                              those buildings: the boil-off question is
      //                              answered at the tank farm, where the tanks are.
      //   · under a different AREA — the stop is in the wrong room. A finding.
      //
      // The first version knew only the first and the last, so siting a question at
      // the tank farm was reported as the stop being in the wrong area — a gate
      // failing on the very feature it was written to make possible.
      const at = lesson?.at ?? stop.at;
      if(at){
        (pointedAt[stop.group] ||= new Set()).add(at);
        if(!declared(stop.group).has(at)){
          const host = Object.keys(fixtures).find(g => g !== stop.group && declared(g).has(at));
          if(host && minorPlaces.has(host)){
            (pointedAt[host] ||= new Set()).add(at);
            sited++;
          } else {
            fail.push(`${where}: "${title}" points at fixture "${at}", which ${host
              ? `belongs to area ${host}, not to ${stop.group} — the stop is in the wrong area`
              : `${stop.group} does not declare`}`);
          }
        }
      }
    }
    if(!person) daysWithoutPerson++;
  });

  if(sited) note.push(`${sited} call(s) are sited at a place that is not their own area`);
  if(daysWithoutPerson){
    note.push(`${daysWithoutPerson} day(s) have no decision-format call, so the roster is never met on them`);
  }

  // The catalogue against the questions, both ways round.
  const operatedIn = {};
  for(const m of missions)
    for(const stop of m.stops ?? [])
      if(stopKind(curriculum[stop.group]?.[stop.lesson]?.game?.type) === 'operated')
        operatedIn[stop.group] = (operatedIn[stop.group] ?? 0) + 1;
  for(const [g, n] of Object.entries(operatedIn))
    if(!declared(g).size) note.push(`${g} has ${n} operated stop(s) and declares no fixtures`);
  // A `from:` or `until:` fixture is BUILT or REMOVED rather than called: it
  // stands in the room over a range of days whatever the question is, so nothing
  // pointing at it is the normal case and not a finding. Reporting those was the
  // gate telling the truth about a rule it had not been told about yet.
  for(const [g, list] of Object.entries(fixtures ?? {}))
    for(const f of list ?? [])
      if(!f.from && !f.until && !pointedAt[g]?.has(f.id))
        note.push(`${g}: fixture "${f.id}" is declared, is not built-from-a-day, and nothing points at it`);

  return { fail, note };
}

// --- selftest -------------------------------------------------------------
//
// The inversion first, per alamos-measurement: the case that must NOT fire is
// written before the case that must, and the bug is put back to watch exactly
// one of them change.
function selftest(){
  const curriculum = {
    A: [{ title: 'a call', game: { type: 'CHOICE' } },      // decision
        { title: 'a sum', game: { type: 'BALLPARK' } }],    // calculation
    B: [{ title: 'a control', game: { type: 'HOLD' } }],    // operated
  };
  const day = (stops) => ({ stops });
  const cases = [
    ['a decision on a person passes',
      { missions: [day([{ group: 'A', lesson: 0, person: true }])], curriculum }, 0],
    ['an operated format on a person fails',
      { missions: [day([{ group: 'B', lesson: 0, person: true }])], curriculum }, 1],
    ['the same operated format in a ROOM passes — it is the person that is wrong, not the format',
      { missions: [day([{ group: 'B', lesson: 0, person: false },
                        { group: 'A', lesson: 0, person: true }])], curriculum }, 0],
    ['a calculation on a person is reported, not failed',
      { missions: [day([{ group: 'A', lesson: 1, person: true }])], curriculum }, 0],
    ['a fixture that its own area declares passes',
      { missions: [day([{ group: 'B', lesson: 0, person: false }])],
        curriculum: { ...curriculum, B: [{ ...curriculum.B[0], at: 'bed' }] },
        fixtures: { B: [{ id: 'bed' }] } }, 0],
    ['the same fixture declared in ANOTHER AREA fails — the stop is in the wrong room',
      { missions: [day([{ group: 'B', lesson: 0, person: false }])],
        curriculum: { ...curriculum, B: [{ ...curriculum.B[0], at: 'bed' }] },
        fixtures: { A: [{ id: 'bed' }] } }, 1],
    ['and the same fixture under a MINOR PLACE passes — that is a sited call, not a mistake',
      { missions: [day([{ group: 'B', lesson: 0, person: false }])],
        curriculum: { ...curriculum, B: [{ ...curriculum.B[0], at: 'bed' }] },
        fixtures: { TANKS: [{ id: 'bed' }] }, minorPlaces: new Set(['TANKS']) }, 0],
  ];
  let bad = 0;
  for(const [name, input, want] of cases){
    const got = judge(input).fail.length;
    const ok = got === want;
    if(!ok) bad++;
    console.log(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  (wanted ${want} failure(s), got ${got})`}`);
  }
  // Two inputs that should score the same actually do: the SAME question, once
  // at a person and once in a room, must differ by exactly one failure and by
  // nothing else. This is the case that catches a judge which fails on the
  // format alone and never looked at where it was standing.
  const atPerson = judge({ missions: [day([{ group: 'B', lesson: 0, person: true }])], curriculum });
  const inRoom = judge({ missions: [day([{ group: 'B', lesson: 0, person: false },
                                         { group: 'A', lesson: 0, person: true }])], curriculum });
  const paired = atPerson.fail.length === 1 && inRoom.fail.length === 0;
  if(!paired) bad++;
  console.log(`  ${paired ? '✓' : '✗'} one question, two places: the place is what is judged`);
  console.log(bad ? `\n✗ placement selftest: ${bad} case(s) wrong`
                  : `\n✓ placement selftest: ${cases.length + 1} cases, the gate knows a person from a room`);
  return bad ? 1 : 0;
}

async function runTheme(name){
  const mod = await import(pathToFileURL(`${resolveTheme(name)}/theme.js`).href);
  const theme = mod?.default ?? {};
  const curriculum = theme.content?.CURRICULUM ?? {};
  const missions = JSON.parse(JSON.stringify(theme.content?.MISSIONS ?? []));
  shapeMissions(missions, curriculum, []);
  const minorPlaces = new Set((theme.site?.buildings ?? []).map(b => b.enter).filter(Boolean));
  const { fail, note } = judge({ missions, curriculum, fixtures: theme.fixtures ?? {}, minorPlaces });
  if(fail.length){
    console.log(`✗ ${name}: ${fail.length} question(s) in the wrong kind of place`);
    for(const f of fail) console.log(`    ${f}`);
  } else {
    console.log(`✓ ${name.padEnd(22)} every question is in the right kind of place`
      + (note.length ? `  · ${note.length} note(s)` : ''));
  }
  for(const n of note.slice(0, 6)) console.log(`  · ${n}`);
  if(note.length > 6) console.log(`  … ${note.length - 6} more`);
  return fail.length ? 1 : 0;
}

const args = process.argv.slice(2);
if(args.includes('--selftest')) process.exit(selftest());
const names = args.includes('--all') || !args.filter(a => !a.startsWith('--')).length
  ? themeNames() : args.filter(a => !a.startsWith('--'));
let failed = 0;
for(const n of names) failed += await runTheme(n);
if(failed){
  console.log(`\n✗ placement: ${failed} theme(s) asking a question in the wrong kind of place.`);
  process.exit(1);
}
console.log(`\n✓ placement: ${names.length} theme(s), every question is in the right kind of place.`);
