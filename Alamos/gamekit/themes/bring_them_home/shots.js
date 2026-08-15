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
  // The control room, both ways. The seal on the back wall took three attempts to
  // place — twice into the gallery overhang, where the room cannot see it — so it
  // gets a shot of its own from the middle of the floor.
  { name: 'control--boards', at: { x: 0, z: 8 }, yaw: N,
    note: 'control room, down at the board wall' },
  { name: 'control--back-wall', at: { x: 0, z: 6 }, yaw: S,
    note: 'control room, the back wall — both seals should be above the consoles' },
  { name: 'control--seal-west', at: { x: -12.5, z: 12 }, yaw: S,
    note: 'the west seal, from in front of it' },
  { name: 'control--front-row', at: { x: 0, z: -14 }, yaw: S,
    note: 'from the front row, looking back up the tiers' },

  // The north leg: forty-five metres of hallway carrying the vehicle in section.
  // One shot from the middle sees about a third of it, so it gets three.
  { name: 'north-leg--west', at: { x: -14, z: 56 }, yaw: S,
    note: 'the vehicle wall, west third' },
  { name: 'north-leg--middle', at: { x: 0, z: 56 }, yaw: S,
    note: 'the vehicle wall, middle' },
  { name: 'north-leg--east', at: { x: 14, z: 56 }, yaw: S,
    note: 'the vehicle wall, east third' },
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
