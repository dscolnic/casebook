// shots.js — what to photograph, in a building whose four floors are the same
// rectangle.
//
// `npm run shots` reads the plan when a theme has no file of its own: every room
// from its own middle, facing each wall. That is right for one floor and wrong
// here, because `plan.rooms` is all four floors flattened and every view would be
// taken with floor 45 active — which is the camera in the plenum above a ceiling
// for three floors out of four.
//
// So each view names its floor. `engine/dev/shots.mjs` calls `goToFloor` before
// it teleports; the two together are the only way to photograph this place.
//
// The views to look at first are the ones with glass in them. The whole argument
// for this building is what is out of the window, and nothing but a picture can
// say whether that is true.
const FLOORS = [
  { floor: 0, label: '45', rooms: [['COUNTER', -6.6, -6.0], ['NOTES', 6.6, -5.5], ['CASHIER', -6.6, 9.4], ['STRONG', 6.6, 7.5]] },
  { floor: 1, label: '46', rooms: [['PRICES', -6.6, -6.0], ['BANKS', 6.6, -5.5], ['CALC', -6.6, 9.4], ['RETURNS', 6.6, 7.5]] },
  { floor: 2, label: '47', rooms: [['TRADE', -6.6, -6.0], ['PORT', 6.6, -5.5], ['TELEX', -6.6, 9.4], ['PRESS', 6.6, 7.5]] },
  { floor: 3, label: '48', rooms: [['RATE', -6.6, -6.0], ['DEALING', 6.6, -5.5], ['CHAIR', -6.6, 9.4], ['LOOKOUT', 6.6, 7.5]] },
];

const RISE = 4.4;
const EYE = 1.62;
// `engine/dev/shots.mjs` FACING: 0 looks down −z, 90 looks west, 180 looks south,
// 270 looks east. Getting these two the wrong way round photographed the doors
// and called them windows, which is the whole of what a contact sheet is for.
const WEST = 90, EAST = 270, NORTH = 0, SOUTH = 180;

export const VIEWS = FLOORS.flatMap(f => {
  const y = f.floor * RISE + EYE;
  const out = [];
  for(const [id, x, z] of f.rooms){
    const west = x < 0;
    // Mid-room, looking at the glass. Not x = ±4: that is where three of the
    // four floors put the thing the room is for, and the first pass photographed
    // the inside of a desk.
    out.push({ name: `f${f.label}-${id.toLowerCase()}-window`, floor: f.floor,
      at: { x: west ? -5.9 : 5.9, y, z }, yaw: west ? WEST : EAST,
      note: `floor ${f.label}, ${id} — from the door, at the glass` });
    // And back the other way from the cill, which is where everything is hung.
    out.push({ name: `f${f.label}-${id.toLowerCase()}-back`, floor: f.floor,
      at: { x: west ? -9.2 : 9.2, y, z }, yaw: west ? EAST : WEST,
      note: `floor ${f.label}, ${id} — from the glass, looking in` });
  }
  // The corridor, both ways. The ends are glazed, so both of these are views out
  // over the city with the building's own doors down either side.
  out.push({ name: `f${f.label}-corridor-north`, floor: f.floor,
    at: { x: 0, y, z: 11 }, yaw: NORTH, note: `floor ${f.label}, corridor looking north` });
  out.push({ name: `f${f.label}-corridor-south`, floor: f.floor,
    at: { x: 0, y, z: -9 }, yaw: SOUTH, note: `floor ${f.label}, corridor looking south` });
  // The lift lobby, which is the one control this building has.
  out.push({ name: `f${f.label}-lift`, floor: f.floor,
    at: { x: 1.6, y, z: 2.6 }, yaw: WEST, note: `floor ${f.label}, the lift` });
  return out;
});

// And the building from outside, from the top floor's own height — the shot that
// found the two things no interior view could show: that the four plates had no
// cladding of their own and read as trays of furniture stacked in mid-air, and
// how far the city actually has to reach. `teleport` takes its height from
// `groundHeight`, so standing outside the envelope on floor 48 is the only way to
// get a camera above the podium.
VIEWS.push({ name: 'tower-from-outside', floor: 3,
  at: { x: -46, y: 3 * RISE + EYE, z: 0 }, yaw: EAST,
  note: 'Kesteven House from the west, at the height of floor 48' });
VIEWS.push({ name: 'tower-from-below', floor: 0,
  at: { x: -30, y: EYE, z: -26 }, yaw: EAST,
  note: 'the tower from off its north-west corner, at the height of floor 45' });

export default VIEWS;
