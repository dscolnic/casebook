// shots.js — the views worth photographing at Station 12.
//
// The default for an outdoor theme with no shots.js is eight frames of a turn
// on the spot at the spawn, which for this place is seven pictures of an empty
// salt flat and one of the mast. These are the things the station has.
//
// Yaw is in degrees: 0 looks along −z (down the site at the mast), 180 looks
// back up it toward the outstation, 90 west, 270 east.
export const shots = [
  { name: 'the-mast', at: { x: 0, z: 40 }, yaw: 0,
    note: 'the spawn view: sixty metres of lattice, and nothing else above four' },
  { name: 'mast-full-height', at: { x: 0, z: 22 }, yaw: 0,
    note: 'far enough back to hold the whole mast, guys and all' },
  { name: 'the-mast-base', at: { x: 6, z: -12 }, yaw: 0,
    note: 'the down-conductor, the shunt boxes and the cabinet two metres from it' },
  { name: 'the-launch-rail', at: { x: 0, z: -60 }, yaw: 0,
    note: 'the whole apparatus for making lightning on purpose, on a trolley' },
  { name: 'the-trench', at: { x: 7, z: 20 }, yaw: 90,
    note: 'the open section: two conductors running parallel where nobody chose' },
  { name: 'the-earthing-grid', at: { x: -30, z: 6 }, yaw: 0,
    note: 'copper under the crust, uncovered where the compound has it open' },
  { name: 'the-impulse-hall', at: { x: 34, z: 28 }, yaw: 0,
    note: 'twelve stages behind that wall, and a placard on the barrier' },
  { name: 'a-field-mill', at: { x: -20, z: 22 }, yaw: 0,
    note: 'a drum on a post with a shutter turning over it' },
  { name: 'the-walk-out', at: { x: 3, z: 96 }, yaw: 180,
    note: 'the long run north: the outstation is two hundred metres from the mast' },
  { name: 'the-outstation', at: { x: 3, z: 170 }, yaw: 180,
    note: 'the trailer, bonded to its own rod, at the far end of the cable run' },
  { name: 'back-from-the-outstation', at: { x: 3, z: 168 }, yaw: 0,
    note: 'what two hundred metres looks like from the other end of it' },
  { name: 'launch-control', at: { x: -17, z: 44 }, yaw: 0,
    note: 'radar on one screen, four mills on the other, and the season board' },
];

export default shots;
