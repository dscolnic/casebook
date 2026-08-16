// shots.js — the viewpoints `npm run shots redsand` renders.
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
];

export default shots;
