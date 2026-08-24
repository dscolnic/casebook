// shots.js — where to stand to photograph this building.
//
// `engine/dev/shots.mjs` reads this. A generated world tells the tool where its
// rooms are; this one is laid out by hand in world.js, so it has to say. It is
// also the world `engine/dev/placement.mjs` cannot reach at all — nothing here is
// built by a builder a checker can run headless — which makes these the only
// automatic look at whether anything in it is where it is supposed to be.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). So θ = 0 looks toward −z,
// down the room at the boards, and θ = π looks toward +z, up the ring and out to
// the north leg. The building runs −19 (boards) to +20 (back wall), the ring
// carries on to the north leg at z 54–60, and the courtyard sits between them.
const S = Math.PI;          // toward +z — up the building
const N = 0;                // toward −z — down at the boards
const E = -Math.PI / 2;     // toward +x
const WEST = Math.PI / 2;   // toward −x

export const VIEWS = [
  // The analysis floor, both ways. The seal on the back wall sits in a band about
  // a metre high — above the consoles, below the gallery overhang — so it gets a
  // shot of its own from in front of it.
  { name: 'floor--boards', at: { x: 0, z: 8 }, yaw: N,
    note: 'the floor, down at the plot boards' },
  { name: 'floor--back-wall', at: { x: 0, z: 6 }, yaw: S,
    note: 'the back wall — both seals should be above the consoles' },
  { name: 'floor--seal-west', at: { x: -12.5, z: 12 }, yaw: S,
    note: 'the west seal, from in front of it' },
  { name: 'floor--front-row', at: { x: 0, z: -14 }, yaw: S,
    note: 'from the photometry desk, looking back up the tiers at the console' },

  // The two wing rooms. This reskin has one room each side where the donor had
  // four, so these are the only views of either — and the only look at whether
  // the notices in them are this game's rather than the one it was copied from.
  { name: 'spec-room', at: { x: -27, z: 32 }, yaw: N,
    note: 'the spectroscopy room, west wing' },
  { name: 'press-room', at: { x: 27, z: 32 }, yaw: N,
    note: 'the publication room, east wing' },

  // The north leg: forty-five metres of hallway carrying the measurement chain,
  // star to diagram, as one drawing. It reads left to right for somebody facing
  // the wall, which is +x to −x — so the east end of the leg is the supernova and
  // the west end is the diagram, and these views run in that order.
  // One shot from the middle sees about a third of it, so it gets three.
  { name: 'north-leg--west', at: { x: -14, z: 56 }, yaw: S,
    note: 'the chain wall, west third — the standardisation and the diagram' },
  { name: 'north-leg--middle', at: { x: 0, z: 56 }, yaw: S,
    note: 'the chain wall, middle — the instruments, the frames and the light curve' },
  { name: 'north-leg--east', at: { x: 14, z: 56 }, yaw: S,
    note: 'the chain wall, east third — the event and the sky' },
  { name: 'north-leg--event', at: { x: 20.5, z: 56.6 }, yaw: S,
    note: 'the east end of the chain — the host galaxy and the supernova in it' },
  // The telescope is the one drawn object on the wall and sits at x = +10, so it
  // gets a view of its own: the three thirds above cut it in half.
  { name: 'north-leg--telescope', at: { x: 10, z: 56.6 }, yaw: S,
    note: 'the dome and the tube, straight on' },
  { name: 'north-leg--along', at: { x: -18, z: 57 }, yaw: E,
    note: 'along the north leg, so the run reads as one drawing' },

  // The ring, where the notices are, and the courtyard it goes round.
  { name: 'ring--west-north', at: { x: -20, z: 40 }, yaw: S, note: 'west ring, going north' },
  { name: 'ring--west-south', at: { x: -20, z: 40 }, yaw: N, note: 'west ring, going south' },
  { name: 'ring--east-north', at: { x: 20, z: 40 }, yaw: S, note: 'east ring, going north' },
  { name: 'ring--south-leg', at: { x: 0, z: 23 }, yaw: WEST, note: 'south leg, across the building' },
  { name: 'courtyard', at: { x: 0, z: 40 }, yaw: N, note: 'the courtyard, back toward the control room' },
];

export default VIEWS;
