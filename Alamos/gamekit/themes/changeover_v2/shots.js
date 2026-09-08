// shots.js — what to photograph, in a building whose six floors are the same
// rectangle.
//
// `npm run shots` reads the plan when a theme has no file of its own: every room
// from its own middle, facing each wall. That is right for one floor and wrong
// here, because `plan.rooms` is all six floors flattened and every view would be
// taken with floor 45 active — which is the camera in the plenum above a ceiling
// on five floors out of six.
//
// So each view names its floor. `engine/dev/shots.mjs` calls `goToFloor` before
// it teleports; the two together are the only way to photograph this place.
//
// **This is a sheet about the glass.** The earlier version took eleven views a
// floor — both ways across every room, both corridor ends, the lobby — which is
// sixty-six pictures of the same twenty-six metres once the plate count went
// from four to six, and the reason it was slow was that most of them showed a
// filing cabinet. What cannot be reasoned about and has to be seen is what is
// *out* of the window: the port and the river to the north, Vend Street and the
// gasometer to the west, the spire and the old bank to the south, the power
// station's plume to the north-east. Everything here points at one of those, or
// at the one thing inside that differs between floors, which is the colour.
const RISE = 4.4;
const EYE = 1.62;
// `engine/dev/shots.mjs` FACING: 0 looks down −z, 90 looks west, 180 looks
// south, 270 looks east. Getting these two the wrong way round photographed the
// doors and called them windows, which is the whole of what a contact sheet is
// for.
const NORTH = 0, WEST = 90, SOUTH = 180, EAST = 270;
const y = (f) => f * RISE + EYE;

export const VIEWS = [
  // ---- the corridor ends, which are glazed, on three floors. The north end is
  // the shot with the river, the quays, the barge and Ashgate's plume in it; the
  // south end is the spire and the old bank on Ferrand Row.
  { name: 'f45-corridor-north-port', floor: 0, at: { x: 0, y: y(0), z: 11 }, yaw: NORTH,
    note: 'floor 45, down the corridor and out at the river, the quays and the power station' },
  { name: 'f45-corridor-south-city', floor: 0, at: { x: 0, y: y(0), z: -9 }, yaw: SOUTH,
    note: 'floor 45, the south end — the spire should be left of centre and the old bank beyond it' },
  { name: 'f48-corridor-north-port', floor: 3, at: { x: 0, y: y(3), z: 11 }, yaw: NORTH,
    note: 'floor 48, the same view thirteen metres higher — cloud should be above the skyline, not in it' },
  { name: 'f50-corridor-north-port', floor: 5, at: { x: 0, y: y(5), z: 11 }, yaw: NORTH,
    note: 'floor 50, the top plate: parapet and plant room are above this ceiling, nothing else should be' },
  { name: 'f50-corridor-south-city', floor: 5, at: { x: 0, y: y(5), z: -9 }, yaw: SOUTH,
    note: 'floor 50 looking south — the whole inner ring, and Ferrand Row running out of frame' },

  // ---- the lift lobby on two floors, which is the pair that says whether the
  // signature colour works. Two plates, the same twenty-six metres, and the only
  // difference in the frame should be the dado and the panel over the bench.
  { name: 'f45-lift-lobby', floor: 0, at: { x: 1.6, y: y(0), z: 2.6 }, yaw: WEST,
    note: 'floor 45, the lift — bottle-green dado and panel' },
  { name: 'f49-lift-lobby', floor: 4, at: { x: 1.6, y: y(4), z: 2.6 }, yaw: WEST,
    note: 'floor 49, the same lobby — teal. Compare with f45; if these read the same the pass failed' },
  { name: 'f50-lift-lobby', floor: 5, at: { x: 1.6, y: y(5), z: 2.6 }, yaw: WEST,
    note: 'floor 50 — charcoal with the brass surround, the only floor that has one' },

  // ---- the window views. West is Vend Street, the queue and the gasometer;
  // east and north is the port. One of each on the floors whose room is about
  // that direction.
  { name: 'f45-counter-vend-street', floor: 0, at: { x: -5.9, y: y(0), z: -6.0 }, yaw: WEST,
    note: 'floor 45, the counter room: Vend Street west, with the queue on it. It should be shuffling' },
  { name: 'f46-prices-vend-street', floor: 1, at: { x: -5.9, y: y(1), z: -6.0 }, yaw: WEST,
    note: 'floor 46, the price room — the street the basket is priced on, and traffic moving on it' },
  { name: 'f46-calc-gasometer', floor: 1, at: { x: -9.2, y: y(1), z: 9.4 }, yaw: WEST,
    note: 'floor 46 west, from the glass: the gasometer should be a drum in a frame, not a smooth can' },
  { name: 'f47-port-desk', floor: 2, at: { x: 5.9, y: y(2), z: -5.5 }, yaw: EAST,
    note: 'floor 47, the port desk looking east over the inner ring toward Ashgate' },
  { name: 'f47-telex-north', floor: 2, at: { x: -9.2, y: y(2), z: 9.4 }, yaw: NORTH,
    note: 'floor 47 from the west glass, facing the river — the barge should be on it' },
  { name: 'f48-lookout-east', floor: 3, at: { x: 6.4, y: y(3), z: 7.5 }, yaw: EAST,
    note: 'the observation room, which is the one room in the building that is only its window' },
  { name: 'f49-stats-vend-street', floor: 4, at: { x: -5.9, y: y(4), z: -6.0 }, yaw: WEST,
    note: 'floor 49 west — teal dado behind the camera, the city in front of it' },
  { name: 'f50-openec-port', floor: 5, at: { x: 5.9, y: y(5), z: -5.5 }, yaw: EAST,
    note: 'floor 50, the customs desk: the highest view east there is' },

  // ---- and the building from outside, from two heights. The shot that found
  // the two things no interior view could show — that the plates had no cladding
  // of their own and read as trays of furniture stacked in mid-air, and how far
  // the city actually has to reach. `teleport` takes its height from
  // `groundHeight`, so standing outside the envelope on a high floor is the only
  // way to get a camera above the podium.
  { name: 'tower-from-outside', floor: 5, at: { x: -46, y: y(5), z: 0 }, yaw: EAST,
    note: 'Kesteven House from the west at the height of floor 50 — six slab edges and six spandrels, '
      + 'then the parapet and the plant room above the top one' },
  { name: 'tower-from-below', floor: 0, at: { x: -30, y: EYE, z: -26 }, yaw: EAST,
    note: 'the tower from off its north-west corner at the height of floor 45, looking up the shaft' },
];

export default VIEWS;
