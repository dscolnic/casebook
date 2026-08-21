// shots.js — where to stand to photograph this building.
//
// `engine/dev/shots.mjs` reads this. A generated world tells the tool where its
// rooms are; this one is laid out by hand in world.js, so it has to say — and it
// is a world `engine/dev/placement.mjs` cannot reach at all, nothing here being
// built by a builder a checker can run headless. These are the only automatic
// look at whether anything in it is where it is supposed to be.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). So θ = 0 looks toward −z,
// down the rake at the stage, and θ = π looks toward +z, up the house and out
// through the pass doors to the ring. The house runs −19 (proscenium) to +20
// (back wall), the stage is beyond that to −34, the ring carries on to the north
// leg at z 54–60, and the yard sits between them.
const STAGE = 0;            // toward −z — down the rake at the stage
const BACK = Math.PI;       // toward +z — up the rake, out to the ring
const EAST = -Math.PI / 2;  // toward +x
const WEST = Math.PI / 2;   // toward −x

export const VIEWS = [
  // The house, both ways. The rake is the thing to look at: four treads and the
  // seats stepping down, with the proscenium at the bottom of it.
  { name: 'house--from-the-back', at: { x: 0, z: 16.8 }, yaw: STAGE,
    note: 'the spawn: under the balcony, down the rake at the stage' },
  { name: 'house--board', at: { x: 0, z: 13.4 }, yaw: STAGE,
    note: 'behind the lighting board — the desk should be on the top tread' },
  { name: 'house--production-desk', at: { x: 0, z: 7.0 }, yaw: STAGE,
    note: 'behind the production desk, seats taken out around it' },
  { name: 'house--mid-rake', at: { x: 0, z: 0 }, yaw: STAGE,
    note: 'the centre aisle half way down, both seat blocks in frame' },
  { name: 'house--back-wall', at: { x: 0, z: 2.0 }, yaw: BACK,
    note: 'up the rake: the balcony front, the pass doors and the call board' },
  { name: 'house--side-aisle', at: { x: -12.8, z: -1.0 }, yaw: STAGE,
    note: 'the west side aisle — the aisle must be clear the whole way down' },
  { name: 'house--sconces', at: { x: -8.0, z: 6.0 }, yaw: WEST,
    note: 'the west wall: dado, gilt band, sconces sitting above the rake' },

  // The pit and the stage front. The step at the centre of the stage front is
  // the one place in these games the player walks up onto something.
  { name: 'pit--from-the-stalls', at: { x: 0, z: -11.0 }, yaw: STAGE,
    note: 'over the pit rail at the stands' },
  { name: 'pit--inside', at: { x: 0, z: -15.0 }, yaw: STAGE,
    note: 'in the pit at the desk, looking up at the stage' },
  { name: 'stage--treads', at: { x: 0, z: -16.6 }, yaw: STAGE,
    note: 'the treads at the centre of the stage front, and the drop either side' },

  // The stage and the tower.
  { name: 'stage--from-the-front', at: { x: 0, z: -21.5 }, yaw: STAGE,
    note: 'on the deck at the setting line: flats, rostrum, ghost light' },
  { name: 'stage--ghost-light', at: { x: 0, z: -23.0 }, yaw: STAGE,
    note: 'the ghost light, the one thing left burning' },
  { name: 'stage--counterweights', at: { x: -9.0, z: -26.0 }, yaw: WEST,
    note: 'the counterweight wall and the locking rail, house left' },
  { name: 'stage--the-house', at: { x: 0, z: -21.0 }, yaw: BACK,
    note: 'the sightline shot: the whole house from the stage, through the opening' },
  { name: 'stage--the-grid', at: { x: 3.0, z: -26.0 }, yaw: STAGE,
    note: 'the bars and the grid over them — two flown out, four in' },

  // Out of the house and round the ring.
  { name: 'ring--pass-doors', at: { x: 0, z: 22.0 }, yaw: BACK,
    note: 'the south leg, from the pass doors' },
  { name: 'ring--south-leg', at: { x: -9.0, z: 23.0 }, yaw: EAST,
    note: 'along the south leg: glazing on the yard, the call boards opposite' },
  { name: 'ring--west-leg', at: { x: -20.0, z: 31.0 }, yaw: BACK,
    note: 'up the west leg past the box office and shop doors' },
  { name: 'ring--east-leg', at: { x: 20.0, z: 49.0 }, yaw: STAGE,
    note: 'back down the east leg — no board may hang over a doorway' },
  { name: 'ring--north-leg', at: { x: 0, z: 57.0 }, yaw: BACK,
    note: 'the north leg and the stage door, which is shut — there is no street' },

  // The six offices, each from the doorway.
  { name: 'office--box-office', at: { x: -25.5, z: 30.8 }, yaw: WEST,
    note: 'Box Office: desk on the outer wall, case beacon in front of it' },
  { name: 'office--scene-shop', at: { x: -25.5, z: 40.0 }, yaw: WEST,
    note: 'Scene Shop: bench, timber on end, ladder' },
  { name: 'office--scene-dock', at: { x: -25.5, z: 49.2 }, yaw: WEST,
    note: 'Scene Dock: no call here — it carries the building, not a lesson' },
  { name: 'office--fly-floor', at: { x: 25.5, z: 30.8 }, yaw: EAST,
    note: 'Fly Floor: the grid loading notice is the one to read' },
  { name: 'office--green-room', at: { x: 25.5, z: 40.0 }, yaw: EAST,
    note: 'Green Room' },
  { name: 'office--wardrobe', at: { x: 25.5, z: 49.2 }, yaw: EAST,
    note: 'Wardrobe: the rail on castors, and the crates back from store' },

  // The yard: the only sky in the game.
  { name: 'yard--from-the-south', at: { x: 0, z: 28.0 }, yaw: BACK,
    note: 'in through the south opening — paving, scenery, the sky over it' },
  { name: 'yard--scenery', at: { x: -10.0, z: 36.0 }, yaw: BACK,
    note: 'the flats and the rolled cloth waiting in the yard' },
  { name: 'yard--dock-end', at: { x: 0, z: 50.0 }, yaw: STAGE,
    note: 'from the dock end, back at the house across the yard' },
];

export default VIEWS;
