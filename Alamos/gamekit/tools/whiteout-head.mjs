// whiteout-head.mjs — Aster Station's six areas, onto Whiteout's book head.
//
//   node tools/whiteout-head.mjs
//
// `build-head.mjs` writes the campaign-wide half of a book by taking the theme
// block, the groups and the roster from a BASE game — for Whiteout that is Ice
// Core, whose place it is built on. The place carries across; the areas do not.
// Ice Core drills for ice in DATA/CORE/COLD/GAS/DRILL/FIELD and Aster Station
// runs software in OPS/CODE/POWER/HAB/VEH/COMMS, and every stop in the bible is
// placed by the second set.
//
// So this is the third step of Whiteout's head: run `build-head`, then this. It
// is a tool rather than a hand edit because `build-head` has already had to be
// re-run twice, and each time it silently restored Ice Core's drilling areas
// under a campaign whose stops name none of them.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const file = resolve(gamekit, 'books/parts/whiteout/_book.yml');

/** The bible's §3, in its order. `lead` is the person who owns the area in §4. */
const AREAS = [
  ['OPS',   'Operations Module',        '#2f6f9f', 'park',
   'Station command, incident coordination and the wall-size systems map.'],
  ['CODE',  'Software Lab',             '#7a5aa8', 'nair',
   'The source mirror, the test harnesses and the safe simulations.'],
  ['POWER', 'Power & Thermal Plant',    '#c2704a', 'okafor',
   'Generators, batteries, heat loops and the controllers that keep the station warm.'],
  ['HAB',   'Habitat Control',          '#3f8d6e', 'alvarez',
   'Air handling, scrubbers, room sensors and life-support automation.'],
  ['VEH',   'Vehicle Bay',              '#8a7a3f', 'reyes',
   'Rovers, drones, chargers and the software that moves field machines.'],
  ['COMMS', 'Communications & Weather', '#4f6f8f', 'andersen',
   'Satellite links, packet routing and the rescue-window traffic.'],
];

// Four milestones, because the readiness track is built around four — the
// importer refuses three. They are the same four moves in every area, which is
// honest: this campaign's areas differ by what they run, not by how work lands.
const STEPS = ['Read what it actually does', 'Test the behaviour',
  'Fix it behind a gate', 'Sign it off'];

const groups = ['groups:'];
AREAS.forEach(([id, name, colour, lead, desc], i) => {
  groups.push(`  - id: ${id}`, `    code: ${id}`, `    name: ${name}`,
    `    color: "${colour}"`, `    difficulty: ${2 + (i % 3)}`, '    type: protocol',
    `    desc: ${desc}`, `    defaultLeader: ${lead}`, '    budget: 70', '    milestones:');
  STEPS.forEach((m, n) => groups.push(`      - name: ${m}`, `        cost: ${12 + n * 4}`,
    `        work: ${9 + n * 3}`, `        brief: ${m}`));
});

/**
 * WHAT IS INSIDE EACH MODULE. Ice Core's six rooms are a drill, a core store, a
 * cold room, a gas line, a field hut and a data hut, and `build-head` carries
 * them across with everything else — so a station running software had a
 * `standLine` about run 214 on the barrel and no room keyed OPS at all. That
 * last part is why this is not cosmetic: `theme.delivery.where` is OPS,
 * `app.js` builds the delivery board in the room whose id matches, and with no
 * OPS room to enter the board was built nowhere. The renders said so —
 * "nothing found in OPS" — which is the tripwire in CLAUDE.md, met head on.
 *
 * The caption of each is the bible's §3 sentence for that area. The stand line
 * and the panel are the place's, the way `site.js` and `fixtures.js` are: what
 * is on the bench in that room on the morning the campaign opens. The POWER
 * panel carries Mission 1's own numbers — 83 kW delivered against 100
 * requested, and a controller reporting zero — because that is the state the
 * player walks into and the first stop is about.
 */
const ROOMS = [
  ['OPS', 'Station command, incident coordination, rescue decisions, and the wall-size systems map live here.',
    'Six incidents open, none closed. Rescue window in 36 hours, aircraft not yet committed.',
    'Station status', [
      ['People on station', '28', 'normal'],
      ['Rescue window', '36 h', 'normal'],
      ['Open incidents', '6', 'alarm'],
      ['Verified control paths', '0 of 6', 'alarm'],
    ]],
  ['CODE', "The station's source mirror, test harnesses, build tools, and safe simulations live here.",
    'Live patching frozen. Nothing goes to a controller that has not been run against the mirror first.',
    'Build and mirror', [
      ['Mirror in step with live', 'yes', 'normal'],
      ['Builds since the storm', '4', 'normal'],
      ['Tests run against them', '0', 'alarm'],
      ['Patches applied live', '3', 'alarm'],
    ]],
  ['POWER', 'Generators, batteries, heat loops, and the controllers that keep the station warm live here.',
    'The generator is running and the board says it is not. Nobody has shut it down yet.',
    'Generator and load', [
      ['Delivered power', '83 kW', 'normal'],
      ['Requested power', '100 kW', 'normal'],
      ['Controller reports', '0 %', 'alarm'],
      ['Battery reserve', '68 %', 'normal'],
    ]],
  ['HAB', 'Air handling, scrubbers, room sensors, water, and life-support automation live here.',
    'One sensor reading, two shutdown orders. The scrubber is off and the air is still good.',
    'Habitat and air', [
      ['Occupied rooms', '11', 'normal'],
      ['Scrubbers running', '1 of 2', 'alarm'],
      ['Shutdown orders today', '2', 'alarm'],
      ['Habitat stability', '72 %', 'normal'],
    ]],
  ['VEH', 'Rovers, drones, chargers, route maps, and the software that moves field machines live here.',
    'Rover Three has driven the same lap eleven times. The wheels are fine.',
    'Vehicles and routes', [
      ['Rovers available', '2 of 3', 'normal'],
      ['Laps completed', '0', 'alarm'],
      ['Same lap repeated', '11', 'alarm'],
      ['Charge on the bay', '4 of 6', 'normal'],
    ]],
  ['COMMS', 'Satellite links, packet routing, weather instruments, and rescue-window traffic live here.',
    'The packet says 08:07 and the wall display says 08:0. One of them is missing a character.',
    'Link and weather', [
      ['Next satellite pass', '00:41', 'normal'],
      ['Burst length', '10 s', 'normal'],
      ['Visibility', 'under 20 m', 'alarm'],
      ['Rescue readiness', '48 %', 'alarm'],
    ]],
];

const interiors = ['interiors:'];
for(const [id, caption, stand, title, rows] of ROOMS){
  interiors.push(`  ${id}:`, `    caption: ${caption}`, `    standLine: ${stand}`,
    '    station:', '      kind: panel', `      title: ${title}`, '      rows:');
  for(const [label, value, status] of rows){
    interiors.push(`        - label: ${label}`, `          value: "${value}"`,
      `          status: ${status}`);
  }
}

/**
 * THE AREA LEADS. `build-head` carries the base game's `leaders:` across with
 * everything else, so Whiteout's six areas — whose `defaultLeader` is park,
 * nair, okafor, alvarez, reyes, andersen — were led by Ice Core's drill
 * engineer, chronology lead and isotope chemist, none of whom exist in this
 * campaign. `leader(gs.leaderId)` then returned undefined and `askCard` threw
 * on `who.name`, which is every room-answered question in the campaign dying
 * as it opened. The renders found it; no gate did.
 *
 * Names and roles are the bible's §4, verbatim. `science` and `management` are
 * the engine's own two numbers for a lead and belong to the game rather than to
 * the bible, so they are the flat 4 every generated head writes.
 */
const LEADS = [
  ['park', 'Elena Park', 'Station director'],
  ['nair', 'Priya Nair', 'Software architect'],
  ['okafor', 'Malik Okafor', 'Power and thermal engineer'],
  ['alvarez', 'Mei Alvarez', 'Life-support and instrumentation engineer'],
  ['reyes', 'Jonah Reyes', 'Field and vehicle operations lead'],
  ['andersen', 'Liv Andersen', 'Communications and weather officer'],
];

const leaders = ['leaders:'];
for(const [id, name, role] of LEADS){
  leaders.push(`  - id: ${id}`, `    name: ${name}`, `    role: ${role}`,
    '    science: 4', '    management: 4');
}

/**
 * WHAT EACH PLACE SAYS when the player walks into it. The base book's block is
 * Ice Core's six laboratories, keyed DRILL/CORE/COLD/GAS/FIELD/DATA, so the
 * whiteout head carried descriptions of a drill trench and a gas line for areas
 * that do not exist here — and `bookParity` said so: the theme shipped a
 * `copy.js` its own book does not produce.
 *
 * One paragraph each, on the same footing as `site.js` and `fixtures.js`: the
 * subject of the room is the bible's §3, and what it looks like is the place's.
 */
const PLACES = [
  ['OPS', 'The operations module: the systems map across the end wall, the incident'
    + ' console under it, and the rescue board nobody has been able to fill in yet.'],
  ['CODE', 'The software lab. The station\u2019s source on glass, a bench to run a suite'
    + ' on, and a rack of every build the station has ever run.'],
  ['POWER', 'The power and thermal plant: generators behind the wall, batteries along it,'
    + ' and a load board saying what is being asked for and what is arriving.'],
  ['HAB', 'Habitat control, where the air is. A tile per occupied room, two scrubbers,'
    + ' and a cabinet of every alarm the habitat is allowed to raise.'],
  ['VEH', 'The vehicle bay, big enough to drive out of. Rovers on the floor, drones on'
    + ' their sides, and the route the software thinks it is driving on the board.'],
  ['COMMS', 'Communications and weather, out under the mast. The pass counted down to the'
    + ' second, the raw traffic before anything has formatted it, and the wind.'],
];

const copy = ['copy:'];
for(const [id, said] of PLACES) copy.push(`  ${id}: "<p>${said}</p>"`);

let s = readFileSync(file, 'utf8');

// THE BOOK SAYS WHOSE CAMPAIGN IT IS. `build-head` copies the base game's theme
// block wholesale, so the head opened `id: icecore / title: Ice Core / subtitle:
// Season Science Lead · Vestri Dome` on a book whose every mission is Aster
// Station's. `import-book.mjs` takes the theme from its command line and so
// never noticed, which is exactly why it is worth correcting: the next reader of
// this book should not have to know that.
s = s.replace(/^ {2}id: icecore$/m, '  id: whiteout')
  .replace(/^ {2}title: Ice Core$/m, '  title: Whiteout')
  .replace(/^ {2}subtitle: .*$/m, '  subtitle: Software Lead · Aster Station');

s = s.slice(0, s.indexOf('groups:')) + groups.join('\n') + '\n' + s.slice(s.indexOf('roster:'));

// And each person into the area §4 gives them. `build-head` puts the whole cast
// in one group because it resolves divisions against the BASE game's areas.
const OWNS = { park: 'OPS', nair: 'CODE', okafor: 'POWER',
  alvarez: 'HAB', reyes: 'VEH', andersen: 'COMMS' };
let who = null;
s = s.split('\n').map((l) => {
  const id = (l.match(/^- id: (\w+)$/) ?? [])[1];
  if(id) who = id;
  if(/^  division: /.test(l) && who && OWNS[who]) return `  division: ${OWNS[who]}`;
  return l;
}).join('\n');

// The leads, between `roster:` and `glossary:`.
s = s.slice(0, s.indexOf('\nleaders:') + 1) + leaders.join('\n') + '\n'
  + s.slice(s.indexOf('\nglossary:') + 1);

// And the rooms, which run to the end of the head.
s = s.slice(0, s.indexOf('\ninteriors:') + 1) + interiors.join('\n') + '\n';

// What each place says, after them — the rooms block is written by truncating,
// so anything appended before it is cut off again.
s = s.replace(/\ncopy:\n(?: {2}\S[^\n]*\n)*/, '\n');
s += copy.join('\n') + '\n';

writeFileSync(file, s);
console.log(`whiteout head: ${AREAS.length} Aster Station areas, `
  + `${Object.keys(OWNS).length} people placed in the area they own`);
