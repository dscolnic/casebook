import { ranges, opening, N, S, E, W, SE as SE_VALLEY } from '../../engine/world/horizonShape.js';
// site.js — the Cerro Alto range, at night, as data.
//
// This is the one game in the set that is played in the dark, and the only one
// whose sites are kilometres apart. Both facts come from the same place: an
// observatory works nights, and its instruments cannot live together. A
// megawatt planetary radar beside an optical telescope ruins both of them. A
// survey dome wants the darkest, highest ground there is. A consequences lab
// wants to be near the emergency managers it is briefing, which means down in
// the valley with the road and the phones.
//
// So this is a RANGE, not a campus. Four landforms across two and a half
// kilometres:
//
//   Cerro Alto, 950 m NW, +170 m    [ Survey Telescope ]
//   The east summit, 780 m NE       [ Spectroscopy Dome ]
//   The saddle, base camp           [ Coordination Office · Orbit Determination ]
//   The basin, 1.1 km W             [ Planetary Radar ]
//   Valle Seco, 1.0 km S            [ Entry & Consequences Lab ]
//
// The range was twice this size and the sites read as unreachable rather than
// far: nine minutes of flying to a dome, and nothing to look at on the way. Every
// distance from base camp is now half what it was, the summit radii and heights
// with it so the slopes are the same grade they were.
//
// Base camp is walkable and holds two of the six areas, so a day that stays
// there is a day on foot. Everything else is driven or — from the fourth phase,
// when the aircraft is signed out — flown, from the pad by the office. Every site
// has a lit pad and a beacon: a landing site you cannot see from the air, at
// night, is a landing site you fly past.
//
// Two rules this file is careful about. Every `group` must exist in
// content/groups.js or that area's calls are unreachable. And the spawn has ten
// clear metres around it — a prop over the spawn welds the player in place, and
// the scene still renders perfectly.

const PI = Math.PI;

/**
 * The four landforms. Summit heights are metres above the basin floor.
 *
 * Radius and height scale with the distances: a summit whose radius halves and
 * whose height does not is twice the grade it was, and `rangeHeight` shapes a
 * `sharp` peak as (1 - d/r)^1.6, so the slope at the top would have gone from
 * 1-in-2 to nearly 1-in-1. Two summits must also not overlap — heights add — so
 * the radii are kept inside the gaps: ALTO to SADDLE is 953 m against 460 + 360.
 */
const SUMMITS = [
  { id: 'ALTO',   x: -725, z: -620, r: 460, height: 170, sharp: true },
  { id: 'EAST',   x:  590, z: -510, r: 390, height: 124, sharp: true },
  { id: 'SADDLE', x:    0, z:    0, r: 360, height:  84 },
  { id: 'SOUTH',  x:  120, z:  750, r: 420, height:  34 },
];

/**
 * One per area of study. Two on the saddle within a walk of each other; the
 * rest a flight away, on the ground their instrument needs.
 */
const AREA_BUILDINGS = [
  // ---- base camp, on the saddle
  { id: 'OPS', group: 'OPS', name: 'Coordination Office', dome: 0,
    x: -30, z: 40, w: 24, d: 14, h: 5.6, facing: 0, colour: 0x605d5a },
  { id: 'ORBIT', group: 'ORBIT', name: 'Orbit Determination', dome: 0,
    x: 34, z: -46, w: 22, d: 13, h: 5.4, facing: 0, colour: 0x5f5f63 },
  // ---- Cerro Alto: the darkest, highest ground on the range
  { id: 'DISC', group: 'DISC', name: 'Survey Telescope', dome: 12.5,
    x: -725, z: -620, w: 20, d: 20, h: 7.0, facing: 0, colour: 0x6e6a66 },
  // ---- the east summit, far enough that neither dome sees the other's lights
  { id: 'CHAR', group: 'CHAR', name: 'Spectroscopy Dome', dome: 9.5,
    x: 590, z: -510, w: 16, d: 16, h: 6.0, facing: PI, colour: 0x6a6764 },
  // ---- the basin: flat, and a long way from anything optical
  { id: 'RADAR', group: 'RADAR', name: 'Planetary Radar Control', dome: 0,
    x: -995, z: 390, w: 20, d: 12, h: 5.0, facing: PI / 2, colour: 0x5c5f63 },
  // ---- Valle Seco, where the people are
  { id: 'IMPACT', group: 'IMPACT', name: 'Entry & Consequences Lab', dome: 0,
    x: 130, z: 780, w: 22, d: 13, h: 5.4, facing: PI, colour: 0x64605c },
];

const LANDMARKS = [
  { id: 'BOARD', name: 'Campaign Briefing Hall', sub: 'Where the board sits',
    x: -74, z: -20, w: 22, d: 13, h: 6.2, facing: PI / 2, colour: 0x585a60, accent: 0x8a2d22 },
  { id: 'TIME', name: 'Time and Frequency Standards', sub: 'Every timestamp on this range',
    x: 66, z: 24, w: 12, d: 9, h: 4.2, facing: -PI / 2, colour: 0x5a5754 },
  // At base camp, not up at the telescope: the archive is where people go to look
  // something up, and putting it on the summit meant a drive to read a plate.
  { id: 'ARCHIVE', name: 'Plate and Data Archive', sub: 'Every image the survey has taken',
    x: -72, z: 60, w: 14, d: 10, h: 4.6, facing: -PI / 2, colour: 0x5a5754 },
  { id: 'DORM', name: 'Night Crew Quarters', sub: 'Blackout blinds, and a rule about noise',
    x: -20, z: 108, w: 18, d: 11, h: 4.8, facing: PI, colour: 0x5d5a57 },
  // `enter:` promotes this from a facade: three day-14 stops (matching action
  // to evidence, the displaced-population estimate, and the evacuation
  // thresholds) are Survey & Response's own questions about the people this
  // office exists for, and it stands 46 m from the Entry & Consequences Lab —
  // the same corner of the range. See fixtures.js's TOWN key and minors.js.
  { id: 'TOWN', enter: 'TOWN', name: 'Valle Seco Emergency Office', sub: 'The people the numbers are about',
    x: 95, z: 810, w: 16, d: 11, h: 4.6, facing: PI, colour: 0x5b5854 },
];

/**
 * Where the aircraft can put down. props.js paints and lights each one, and the
 * first is where it is parked at the start of a shift.
 */
export const PADS = [
  { id: 'base',   name: 'Base Camp pad',    x: 6,    z: 96,   r: 11 },
  { id: 'alto',   name: 'Cerro Alto pad',   x: -696, z: -650, r: 11 },
  { id: 'east',   name: 'East Summit pad',  x: 618,  z: -480, r: 11 },
  { id: 'basin',  name: 'Radar pad',        x: -965, z: 419,  r: 11 },
  { id: 'valley', name: 'Valle Seco pad',   x: 160,  z: 805,  r: 11 },
];

export const site = {
  kind: 'outdoor',
  name: 'Cerro Alto',

  terrain: {
    // Two and a half kilometres of range, at the same segment count as the five
    // it used to be — so the mesh is now under seven metres a segment, which the
    // slopes needed anyway.
    size: 2800, segments: 420, playerLimit: 1300,
    profile: 'range', relief: 1.0,
    summits: SUMMITS,
    basin: -96,
    // Volcanic scree under starlight. Almost no colour, and dark: at night the
    // ground is lit by the sky and a few red lamps, nothing else.
    ground: { base: [96, 90, 82], spread: [22, 20, 18], repeat: 46, normalRepeat: 420 },
  },

  // Thin, dry, high air — which is why an observatory is here at all. Low
  // turbidity and low Mie scattering give a hard dark sky, and the star count
  // is four times a river valley's.
  // `nightTurbidity` / `nightRayleigh` are the floor the sky falls to after
  // dark. The engine's default floor is tuned so a daytime game's 3 a.m. is not
  // pitch black; here the campaign never leaves the dark, and at that floor the
  // dome renders grey with the stars on a pale field.
  atmosphere: {
    turbidity: 1.6, rayleigh: 1.2, mie: 0.0015, mieG: 0.82, scale: 950, stars: 4200,
    nightTurbidity: 0.02, nightRayleigh: 0.015,
    // Deep night hides the sky dome and paints this instead — the physical sky
    // has a radiance floor that tone mapping lifts to grey, and no uniform
    // reaches it. Not pure black: a mountain sky under starlight is a very dark
    // blue, and pure black makes the horizon ranks disappear.
    // Only used below deep night, which a daytime window never reaches. Left in
    // place so restoring dayWindow: [19, 31] restores the night sky with it.
    nightSky: 0x05070d,
  },

  // Roads exist only where a road makes sense: base camp's own loop, and the
  // street through Valle Seco. There is no road up Cerro Alto, which is why
  // there is an aircraft.
  paths: [
    { cx: 0, cz: 20, w: 9, d: 190, worn: 7 },
    { cx: -40, cz: 40, w: 60, d: 7, worn: 4 },
    { cx: 125, cz: 795, w: 90, d: 8, worn: 6 },
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  // The map draws a window this wide around the player, not the whole range.
  // Base camp is seven buildings inside 200 m and the survey telescope is 950 m
  // away up a mountain with nothing between: drawn whole, the part of the site
  // anybody walks around came out a centimetre across and unreadable. Anything
  // outside the window becomes an arrow on the edge with its distance.
  mapRadius: 170,

  board: { x: 8, z: 62, facing: PI, title: 'Campaign Status' },

  // Sparse, and all of it beside the road. A mountain site has no street
  // furniture to speak of — posts carrying the red service lamps, and a bench
  // outside the coordination office where people take their break in the cold.
  furniture: [
    { kind: 'post', x: 7, z: -60, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: -7, z: -10, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: 7, z: 44, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: -7, z: 88, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'bench', x: -16, z: 56, facing: PI / 2 },
    { kind: 'bin', x: 9, z: 62 },
  ],

  // Scrub only low down; the summit is bare rock. `scrubBand` is a distance
  // band from the origin, so keeping it wide and thin puts vegetation on the
  // lower slopes and none along the ridge.
  scrubCount: 900,
  scrubColour: 0x3f4432,
  scrubBand: [350, 1150],

  // Ranges beyond the ridge, nearly black under starlight. Radius and height
  // both halved with the site: a rank at the same height twice as close is twice
  // the angular size, and 500-metre walls appeared round the range.
  // A ring of summits at every bearing makes a ridge read as the bottom of a
  // bowl, and this is a mountain top. The high country stands north and west;
  // the south-east falls away to the valley the road climbs from, which is the
  // one bearing where the sky comes down to the horizon — and the direction the
  // survey telescope spends its night pointing.
  horizon: [
    { radius: 1500, height: 170, colour: 0x2a2f36, haze: 0.30,
      amp: ranges([{ at: N, width: 2.0, hi: 1.15 }, { at: W, width: 1.8, hi: 1.0 }], 0.10) },
    { radius: 1900, height: 230, colour: 0x333a42, haze: 0.50,
      amp: ranges([{ at: N, width: 2.4, hi: 1.1 }, { at: W, width: 2.0, hi: 0.95 }], 0.08) },
    { radius: 2400, height: 290, colour: 0x3c434b, haze: 0.68,
      amp: opening(SE_VALLEY, 1.7, { deep: 0.04, hi: 1 }) },
  ],

  // On the road below the coordination office, looking uphill at the domes.
  spawn: { x: 2, z: 62, yaw: 0 },
};

export default site;
