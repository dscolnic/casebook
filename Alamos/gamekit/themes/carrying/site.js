// site.js — Vellan Island, as data. Outdoor.
//
// AN ISLAND, WHICH IS WHY THIS COURSE FITS HERE. Every quantity in AP
// Environmental Science is a budget, and on an island every budget closes: the
// water is what falls on it, the fish are what the boats do not take, the power
// is what arrives on the cable or is made on the hill, and the waste stays.
// Nothing here can be exported to somewhere off the map, which is the one thing
// a mainland site lets a student assume.
//
// Looking down, -Z is north and away from the player at spawn:
//
//                  [ Reef Station ]                        z = -318
//        [ Tip ]                    [ Turbine Yard ]        z = -206
//              [ Waterworks ]   [ Common ]                  z =  -30
//                     [ Harbour Office ]                    z =   40
//                        ¤ spawn ¤                          z =   75
//
// The island is a mesa with a hard coast on every bearing, and the only way off
// it is the ferry berth at the south end — so `rimRadius` wobbles rather than
// opening a neck the way Wellmere's causeway does. The horizon is empty on all
// four bearings except a low mainland smudge to the south-east, which is where
// the ferry, the cable and every argument about visitors comes from.

const PI = Math.PI;
const S = PI, SE = PI * 0.75;

/** A wobbling coast: the island is 380 m across and not a circle. */
function rimAt(bearing){
  return 360
    + 26 * Math.sin(bearing * 2 + 0.6)
    + 14 * Math.sin(bearing * 3 - 1.2)
    + 8 * Math.sin(bearing * 5 + 2.1);
}

/** Bearing bands for the horizon: mainland to the south-east, sea elsewhere. */
function ranges(bands, floor = 0){
  return (bearing) => {
    let v = floor;
    for(const b of bands){
      let d = Math.abs(((bearing - b.at + PI) % (PI * 2)) - PI);
      if(d < b.width) v = Math.max(v, b.hi * (1 - d / b.width));
    }
    return v;
  };
}

const AREAS = [
  { id: 'HARB', group: 'HARB', name: 'Harbour Office', sub: 'Landings and the ferry',
    x: 6, z: 40, w: 22, d: 14, h: 7.2, facing: 0, colour: 0x8d9aa2 },
  { id: 'WATER', group: 'WATER', name: 'Waterworks', sub: 'The borehole and the store',
    x: -52, z: -30, w: 20, d: 15, h: 7.6, facing: 0, colour: 0x93a29c },
  { id: 'COMMON', group: 'COMMON', name: 'Common Office', sub: 'Grazing, gardens and the sheds',
    x: 56, z: -30, w: 20, d: 13, h: 6.6, facing: 0, colour: 0x9d9a7c },
  { id: 'TIP', group: 'TIP', name: 'Tip and Sorting Yard', sub: 'Everything that stays',
    x: -96, z: -206, w: 24, d: 16, h: 6.4, facing: PI / 2, colour: 0x8f8779 },
  { id: 'POWER', group: 'POWER', name: 'Turbine Yard', sub: 'Diesel house and the hill',
    x: 94, z: -206, w: 22, d: 15, h: 8.0, facing: -PI / 2, colour: 0x9aa3ad },
  { id: 'REEF', group: 'REEF', name: 'Reef Station', sub: 'The point, and the water off it',
    x: 4, z: -318, w: 20, d: 14, h: 6.8, facing: 0, colour: 0x7f9ba0 },
];

const LANDMARKS = [
  { id: 'BERTH', name: 'Ferry Berth', sub: 'Tuesdays and Fridays',
    x: -30, z: 96, w: 14, d: 9, h: 4.8, facing: PI, colour: 0x8b8577 },
  { id: 'SCHOOL', name: 'Island School', sub: 'Nineteen on the register',
    x: 48, z: 24, w: 16, d: 11, h: 6.0, facing: PI, colour: 0xa79c85 },
  { id: 'CHAPEL', name: 'Chapel and Hall', sub: 'Where the council meets',
    x: -46, z: 12, w: 13, d: 16, h: 8.4, facing: PI / 2, colour: 0xa8a196 },
  { id: 'LIGHT', name: 'Old Light', sub: 'Unlit since 1974',
    x: -8, z: -366, w: 7, d: 7, h: 15.5, facing: 0, colour: 0xbdb6a6 },
];

export const site = {
  kind: 'outdoor',
  name: 'Vellan Island',

  terrain: {
    // A low island: flat-ish grazing on top, a hard coast all round, sea below.
    // `farRise` is pushed past the mesh so no land climbs back out of the water —
    // on this bearing set there is no next landform except the mainland smudge,
    // which is drawn by the horizon ranks rather than by terrain.
    size: 1200, segments: 320, playerLimit: 372,
    profile: 'mesa', relief: 0.6,
    mesa: {
      rimRadius: rimAt,
      rimWobble: [4.0, 2.4, 1.2],
      // A LOW island, deliberately. At a 22 m drop the sea is behind the rim from
      // anywhere on the plateau — eye height on a flat top cannot see water 16 m
      // down and 280 m out, so the place rendered as an inland plain. Nine metres
      // with the water just under it puts the sea on the horizon from the road,
      // which is the one thing this game's whole argument rests on being visible.
      dropDepth: 9,
      dropRun: 11,
      farRise: 4000,
    },
    // Grazed maritime turf over rock: browner and darker than looks right on the
    // canvas, so the gorse and the crop plots read as separate things from twenty
    // metres. House rule 19 — ground and cover have to be a value apart.
    ground: { base: [72, 68, 46], spread: [24, 22, 16], repeat: 30, normalRepeat: 300 },
  },

  water: {
    cx: 0, cz: 0, width: 2600, depth: 2600, level: -6.2, open: true,
    colour: 0x24414c, roughness: 0.32, metalness: 0.16,
  },

  atmosphere: {
    turbidity: 4.2, rayleigh: 2.4, mie: 0.006, mieG: 0.76, scale: 700, stars: 1200,
  },

  paths: [
    { cx: 0, cz: 60, w: 120, d: 10, worn: 6 },     // the harbour apron
    { cx: 0, cz: -80, w: 8, d: 300, worn: 6 },     // the island road, harbour to the point
    { cx: -50, cz: -206, w: 96, d: 6, worn: 4 },   // the tip spur
    { cx: 50, cz: -206, w: 92, d: 6, worn: 4 },    // the hill spur
  ],

  buildings: [...AREAS, ...LANDMARKS],

  // The map should show the ground people stand on. Without this it takes the
  // union of everything, which here means 360 m of empty coast on every bearing.
  mapBounds: { x0: -140, x1: 140, z0: -348, z1: 120 },

  board: { x: 16, z: 66, facing: PI, title: 'Island Board' },

  furniture: [
    { kind: 'post', x: -7, z: 34, height: 3.4, r: 0.1, colour: 0x4a4a3e },
    { kind: 'post', x: 7, z: 34, height: 3.4, r: 0.1, colour: 0x4a4a3e },
    { kind: 'bench', x: -18, z: 62, facing: 0 },
    { kind: 'bin', x: 15, z: 60 },
    { kind: 'bench', x: 14, z: -314, facing: PI },
  ],

  // Gorse and thrift, and only off the grazed centre: the common is stocked and
  // nothing woody survives on it, which is the day-9 lesson standing in the ground.
  scrubCount: 620,
  scrubColour: 0x56603c,
  scrubBand: [150, 340],

  // Three bearings are open sea with nothing on them. The mainland is a low line
  // to the south-east — the direction the ferry comes from, the cable runs and
  // every visitor arrives.
  horizon: [
    { radius: 780, height: 22, colour: 0x6b7364, haze: 0.5,
      amp: ranges([{ at: SE, width: 1.9, hi: 1.0 }, { at: S, width: 1.0, hi: 0.6 }], 0.0) },
    { radius: 1020, height: 64, colour: 0x5f6a5c, haze: 0.62,
      amp: ranges([{ at: SE, width: 1.3, hi: 1.0 }], 0.0) },
  ],

  // On the harbour apron facing north up the island road: the office to the
  // right, the berth behind, and the road running the length of the island.
  spawn: { x: 0, z: 75, yaw: 0 },
};

export default site;
