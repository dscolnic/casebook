// shots.js — where to stand to photograph the Fenwick Coordinating Centre.
//
// `engine/dev/shots.mjs` reads VIEWS. Without it the tool turns on the spot at
// the spawn and produces eight views of one corridor — which for this building
// is the worst possible contact sheet, because **the whole argument of the place
// is that the three floors are three different rooms to be in.** A sheet that
// cannot tell them apart cannot tell you whether the fit-out worked.
//
// So there is one corridor view per level, in the same direction each time, and
// they are meant to be read side by side: level 0 with a handrail, a guard and a
// painted dado; level 1 with carpet and a photocopier; level 2 with a hazard
// line underfoot, badge readers and almost nothing on the walls.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z, back
// down the building toward the clinic; θ = π looks north, up the climb.
//
// Heights are handled by the harness — it stands the camera on `groundHeight`,
// which is `plan.js`'s staircase — so a z on level 2 photographs level 2.
import { LEVELS } from './plan.js';

const S = 0;                       // toward −z: back down toward the clinic
const N = Math.PI;                 // toward +z: up the building
const E = -Math.PI / 2;
const W = Math.PI / 2;

/** The shots this pass exists for, in the order somebody should read them. */
const CURATED = [
  // ---------------------------------------------------------------- level 0
  { name: 'clinic-corridor', at: { x: 0, z: 16.5 }, yaw: S,
    note: 'the clinic corridor looking back at screening — handrail, wall guard and the '
      + 'painted dado should run down both walls and STOP at every doorway and at the '
      + 'open face of the infusion bay' },
  { name: 'infusion-bay', at: { x: -3.2, z: 11.4 }, yaw: S,
    note: 'into the bay across the open face: five recliners with a drip stand each, '
      + 'curtains half drawn between the bays, the drug fridge on the far cross-wall. '
      + 'Nobody should be sitting in mid-air' },
  { name: 'crash-cart', at: { x: 0.2, z: 9.6 }, yaw: S,
    note: 'the red crash cart against the lab wall, opposite the bay — it must be beside '
      + 'the doorway and not across it' },
  { name: 'kit-warehouse', at: { x: 6.0, z: 9.0 }, yaw: N,
    note: 'four thousand identical boxes in numbered order, with the cold room at the end' },

  // ---------------------------------------------------------------- the climb
  { name: 'lower-stair', at: { x: 0, z: 20.6 }, yaw: N,
    note: 'the flight up out of the clinic. The corridor walls stop a metre short of the end '
      + 'wall, so the two alcoves either side of the opening come into view here and each '
      + 'should have daylight in it — that is the only place an end window on an OPEN end '
      + 'can be seen from, and it is worth walking to' },

  // ---------------------------------------------------------------- level 1
  { name: 'working-corridor', at: { x: 0, z: 47.0 }, yaw: S,
    note: 'the working floor looking back at the stair: carpet runner down the middle, '
      + 'pinboards on both walls, and this must NOT look like the clinic' },
  { name: 'data-floor', at: { x: -2.6, z: 37.4 }, yaw: S,
    note: 'the data management floor from the corridor — the desk pod behind its cubicle '
      + 'screen, six monitors dark, carpet under all of it' },
  { name: 'data-far-wall', at: { x: -3.4, z: 32.9 }, yaw: W,
    note: 'THE WALL THIS PASS WAS FOR: the CONSORT flow chart across the far wall, '
      + 'screened to analysed, with the enrolment cards north of it. Nothing hung on top '
      + 'of it' },
  { name: 'photocopier', at: { x: 0.4, z: 44.0 }, yaw: S,
    note: 'the copier against the regulatory wall, with the corridor still walkable past it' },

  // ---------------------------------------------------------------- the firewall
  { name: 'firewall-stair', at: { x: 0, z: 51.5 }, yaw: N,
    note: 'the climb to the unblinded floor: the gate posts at the head of it, and the '
      + 'hazard line painted across the floor at the top' },

  // ---------------------------------------------------------------- level 2
  { name: 'unblinded-corridor', at: { x: 0, z: 63.0 }, yaw: N,
    note: 'past the firewall — charcoal skirting, a badge reader beside every door, and '
      + 'markedly less on the walls than either floor below' },
  { name: 'red-door', at: { x: -1.4, z: 66.0 }, yaw: E,
    note: 'the randomisation office door, which is the one red door in the building' },
  { name: 'board-room', at: { x: -6.0, z: 73.4 }, yaw: N,
    note: 'the monitoring board room: the table across the north half, six chairs with a '
      + 'name card at every place, the delivery-free far wall behind it' },
  { name: 'master-file', at: { x: 2.6, z: 74.0 }, yaw: E,
    note: 'the trial master file behind its cage — the gate should line up with the door '
      + 'and the shelving should all be on the far side of the mesh' },

  // ---------------------------------------------------------------- the story
  { name: 'site-wall', at: { x: 0.8, z: 47.6 }, yaw: W,
    note: 'THE SITE WALL, story.js: 31 hospital cards in four rows on a dark board, a lamp '
      + 'on each, the mission header on the panel above. On day 1 every lamp is green and '
      + 'every card reads "enrolling"; nothing from the corridor kit hung over it' },
  { name: 'board-antechamber', at: { x: 0.6, z: 77.6 }, yaw: W,
    note: 'seven empty coat hooks on a rail north of the board room door, two dark lamps '
      + 'above them, the landmark card between; the plant south of the door. Coats and '
      + 'lit lamps only from mission 14' },
  { name: 'evidence-cabinet', at: { x: 3.2, z: 77.4 }, yaw: N,
    note: 'the evidence cabinet against the master file\'s far wall, outside the cage, its '
      + 'door standing open into the room until mission 11; the small table in front of it. '
      + 'Neither may block the cage gate' },
  { name: 'courier-bay', at: { x: 6.5, z: -3.4 }, yaw: N,
    note: 'Goods In: the courier bay shelves on the north wall with sealed cases on three '
      + 'shelves and the landmark card above. QUARANTINED appears from mission 8' },
  { name: 'visitor-alcove', at: { x: -4.6, z: -0.6 }, yaw: N,
    note: 'Screening: the bench against the corridor wall with the travel bag on it, the '
      + 'visitor badge clipped beside it, the landmark card above. Dr. Holt stands here on '
      + 'missions 4 and 5 only' },
  { name: 'end-window-rain', at: { x: 0, z: 78.0 }, yaw: N,
    note: 'the unblinded floor\'s north end: a framed pane across the corridor with rain '
      + 'streaking down it. It must read as a window, not a lit rectangle' },
];

/**
 * One look into every other room, so a hand-written list does not cost the
 * coverage the plan-derived fallback gave for free.
 *
 * `shots.mjs` builds three views per room ONLY when a theme has no `shots.js` at
 * all — the file replaces that list rather than adding to it — so writing this
 * one would have dropped nine rooms off the sheet. Standing in the doorway
 * looking at the outer wall is the single most useful of the three.
 */
const NAMED = new Set(['INFUSE', 'KIT', 'DATA', 'BOARD', 'ARCHIVE']);
const REST = LEVELS.flatMap(L => L.rooms.filter(r => !NAMED.has(r.id)).map((r) => {
  const sgn = r.side === 'e' ? 1 : -1;
  return {
    name: (r.name ?? r.id).replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
    at: { x: sgn * 2.9, z: (r.z0 + r.z1) / 2 },
    yaw: sgn > 0 ? E : W,
    note: `${r.name ?? r.id}, from the doorway toward the outer wall`,
  };
}));

export const VIEWS = [...CURATED, ...REST];

export default VIEWS;
