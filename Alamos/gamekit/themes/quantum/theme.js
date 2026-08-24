// theme.js — the manifest. This is the only file the engine reads directly.
//
// Start a game with the scaffold, not by copying this by hand:
//
//   npm run new-theme <name>              outdoor
//   npm run new-theme <name> -- --interior   a floor, not a town
//
// It copies this directory, imports book.yml over it and registers the theme,
// so `npm run check <name>` is green and `THEME=<name> npm run dev` is walkable
// before you have written a word. Then replace book.yml with the real book.
//
// Every key below is read by the engine. Nothing else in here is.
import { plan } from './plan.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
// tools/import-book.mjs writes all of these. BALLPARK_CALCS and JARGON must be
// imported or the estimates render un-answerable and no term is clickable.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  id: 'quantum',
  title: 'Quantum',
  subtitle: 'Group Lead · Ridgeway Quantum Laboratory',

  // Each mission is one working day on the run-up to the review. The plan card prints this in front of the mission number.
  dayNoun: 'Day',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  site: { kind: 'interior', name: 'Replace with the name of this place', plan },

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  start: { x: 0, z: 12, yaw: 0 },

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // Background people. A narrow place needs far fewer: on the submarine more
    // than eight and the player cannot get down the passage.
    extras: 18,
  },

  // What is inside each room the player walks into, from book.yml. Rooms are
  // built by engine/world/interiorBuilding.js on first entry, in a district
  // four kilometres from the town.
  interiors: INTERIORS,
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'lab',

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One number a day, in the order the machine gave them up. A number with no
  // method beside it is the thing this report exists to stop being sent out.
  delivery: {
    name: 'The Ridgeway Device Report',
    what: 'The report the review board reads and the funder reads after it: every number this '
      + 'group claims about its processor, with the method that produced it attached.',
    where: 'VER',
    pieces: [
      'The base temperature record',
      'The qubit frequency map',
      'The T1 and T2 pair',
      'The readout fidelity chain',
      'The window decision, dated',
      'The material defect trace',
      'The sensor calibration',
      'The benchmarking comparison',
      'The Bell test result',
      'The advantage claim, read',
      'The retrained discriminator',
      'The quiet-day assumptions',
      'The triage order',
      'The withdrawal decision',
      'The evidence separation',
    ],
  },
  opening: [
    'This morning the fridge came down to forty-two thousandths of a degree above absolute '
    + 'zero. It usually holds eleven. That is the difference between a quantum processor and '
    + 'a warm chip. Ridgeway runs twelve qubits inside it. You lead the group. Every number '
    + 'that leaves this building leaves under your name. A laboratory in Delft has published '
    + 'a result the funder has already asked about. In a fortnight you hand over the Ridgeway '
    + 'device report. It says what the machine can do, how well it does it, and the method '
    + 'behind every figure. One number goes in a day. Twelve qubits are what the whole claim '
    + 'rests on.',
  ],

  ending: [
    'The correction went out at twenty past four, naming the mechanism as well as the number, and two '
    + 'other groups wrote within the month to say they had found the same thing in their own tune-up. '
    + 'Delft ran the circuit again on a held-out analysis and the two devices agree now, at a figure '
    + 'lower than the one Ridgeway first reported and higher than the one that frightened everybody in '
    + 'the middle of the fortnight.',
    'What it cost: a headline number reduced by a third, a review spent explaining a mistake, and four '
    + 'days of fridge time nobody got back. What is unfinished: the oxidation change is still '
    + 'uncontrolled, the defect map covers three chips out of fourteen, the gate error is above the '
    + 'threshold where error correction starts to help, and the habit that would have caught all of it '
    + '— evaluate every fitted analysis on data it has never seen — is a line in a report until the '
    + 'next person makes it a rule.',
    'And you are the one who found it. You tested the analysis on data it had never seen, you '
    + 'ran the tune-up again instead of publishing the number you wanted, and you said in '
    + 'public which part of it was your own mistake. A field is a little closer to true because '
    + 'of that. It is harder than it sounds, and you did it inside a fortnight.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    far: 160,
    fog: { colour: 0xdfe4e6, near: 26, far: 96 },
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    lighting: { ambient: 0.55, hemi: 0.6 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
