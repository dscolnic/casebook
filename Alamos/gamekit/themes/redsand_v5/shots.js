// shots.js — the viewpoints `npm run shots redsand_v5` renders.
//
// Hand-placed, because what has to be checked here is not the rooms. It is
// whether the sky is the right colour, whether the modules read as buried
// rather than as sheds with dirt beside them, whether the vehicle carries the
// far end of the site, and whether the dunes and streaks make the plain look
// like weather rather than like a quarry. `engine/dev/shots.mjs` drives the
// game's own teleport to each.
export const shots = [
  // The first thing anybody sees: down the plant line with the vehicle at the
  // end of it.
  { name: 'spawn-down-the-line', at: { x: 0, z: 52 }, yaw: 0 },
  // The modules, from the track. Standing any closer than the track puts the
  // camera inside the berm — the dirt runs sixteen metres out from the middle
  // of a module, which is the whole point of it and was not obvious until the
  // first contact sheet came back showing four photographs of a bank.
  { name: 'control-and-intake', at: { x: 6, z: 22 }, yaw: 270 },
  { name: 'electrolysis-hall', at: { x: 8, z: 26 }, yaw: 90 },
  { name: 'water-plant', at: { x: -8, z: -2 }, yaw: 270 },
  { name: 'catalyst-bay', at: { x: 8, z: -10 }, yaw: 90 },
  { name: 'reactor-hall', at: { x: -8, z: -34 }, yaw: 270 },
  { name: 'cold-end', at: { x: 8, z: -46 }, yaw: 90 },
  { name: 'tank-farm', at: { x: 6, z: -50 }, yaw: 0 },
  // The vehicle, from the distance it is normally read at and from underneath.
  { name: 'the-pad-from-the-plant', at: { x: 0, z: -86 }, yaw: 0 },
  { name: 'under-the-vehicle', at: { x: 0, z: -112 }, yaw: 0 },
  // The array, along the rows, where the swept third meets the dusty rest.
  { name: 'array-along-the-rows', at: { x: 58, z: 34 }, yaw: 45 },
  { name: 'array-from-the-shed', at: { x: 78, z: 4 }, yaw: 315 },
  // The two views that are only about the planet: the excavation ground, and
  // the empty plain behind the station with the crater rim on it.
  { name: 'excavation', at: { x: -56, z: -16 }, yaw: 300 },
  { name: 'the-rim-to-the-north', at: { x: 0, z: -96 }, yaw: 0 },
  { name: 'the-empty-side', at: { x: 0, z: 66 }, yaw: 180 },
  { name: 'habitat-and-garage', at: { x: -20, z: 44 }, yaw: 270 },

  // The places the placement pass opened, and the two it added. Five of these
  // stood closed for the life of the game — the point of the shot is that there
  // is now a door in the shot.
  { name: 'pad-office', at: { x: -46, z: -88 }, yaw: 0 },
  { name: 'the-long-walk-to-the-cut', at: { x: -90, z: -160 }, yaw: 0 },
  { name: 'the-ice-cut', at: { x: -96, z: -252 }, yaw: 0 },
  { name: 'the-cut-looking-back', at: { x: -96, z: -256 }, yaw: 180 },

  // THE GROUND, which is what the last pass was about. Ruts down the middle of
  // every graded track, sand sliding along the wind at ankle height, and the
  // trail a rover leaves — the third of those only exists once something has
  // been driven, so this shot checks the ruts under the parked rover and the
  // trail has to be looked at with a hand on W.
  { name: 'ruts-back-up-the-track', at: { x: 0, z: -6 }, yaw: 180 },
  { name: 'ruts-on-the-habitat-spur', at: { x: -30, z: 44 }, yaw: 270 },
  { name: 'the-yard-and-the-rovers', at: { x: 15, z: 56 }, yaw: 0 },
  { name: 'sand-across-the-plain', at: { x: -34, z: 74 }, yaw: 200 },

  // Boil-off, from far enough back that the top of the plume is in frame — the
  // vehicle is 26 m and the plume takes it to about 30, which at a 66° vertical
  // field needs 45 m of standoff.
  { name: 'the-vent-plume', at: { x: 8, z: -88 }, yaw: 10 },

  // The two lit modules, from the side the doors and the portholes are on.
  { name: 'habitat-portholes', at: { x: -58, z: 22 }, yaw: 180 },
  { name: 'plant-control-portholes', at: { x: -6, z: 33 }, yaw: 0 },

  // Where the sweep stopped: clean panels on one side, a fortnight of dust on
  // the other, and the machine that drew the line parked on it.
  { name: 'the-sweep-boundary', at: { x: 94, z: 40 }, yaw: 0 },
];

export default shots;
