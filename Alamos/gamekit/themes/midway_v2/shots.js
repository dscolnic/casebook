// shots.js — the viewpoints `npm run shots midway_v2` renders.
//
// What has to be checked here is the machines: whether the coaster's spline
// reads as a structure, whether the loop is a loop from the ground, whether the
// wheel's gondolas hang level, and whether the park looks shut. The rooms are
// engine-built and are not the risk.
//
// ------------------------------------------------------------------------
// A RIDE RUNS FROM THE DAY ITS OWN LIMIT IS SETTLED, AND NOT BEFORE.
//
//     CAROUSEL  day  4     piece 'The swing speed limit'
//     BUMPER    day  6     piece 'The bumper collision limits'
//     SHIP      day  7     piece 'The pendulum period, from g'
//     WHEEL     day  8     piece 'The cracked arm assessment'
//     COASTER   day  9     piece 'The regraded loop's speed'
//     FLUME     day 11     piece 'The flume's closed books'
//     TOWER     day 12     piece 'The hot-Saturday limit'
//
// Derived in `props.js` — read off `theme.delivery.pieces` (seven of the fifteen
// name one ride's own decisive number and no other's) and cross-checked against
// `content/missions.js` (six of the seven are that day's lead stop; the tower is
// settled by day 12's own stake, "get the tower's brake proved, not just
// claimed"). The header comment there carries the whole derivation.
//
// **So `npm run shots midway_v2` on its own photographs a dead park, and that is
// correct.** Day 1 is a machine museum: nothing turns, the festoon is out, two
// rides are under tarpaulins and the header tank is dry. To see the payoff the
// tool has to be told which day it is —
//
//     npm run shots midway_v2 -- --sol 5      the carousel and swings, alone
//     npm run shots midway_v2 -- --sol 9      five of seven, coaster included
//     npm run shots midway_v2 -- --sol 13     the whole park running
//
// A contact sheet at sol 1 beside one at sol 13 is the thing to look at; either
// on its own says nothing about the half of this world that changes.
// ------------------------------------------------------------------------
export const shots = [
  // Arriving: the county road, the car park, the ticket line, then the midway.
  { name: 'the-road-in', at: { x: -12, z: 168 }, yaw: 0 },
  { name: 'car-park-west', at: { x: -56, z: 132 }, yaw: 0 },
  { name: 'ticket-line', at: { x: 0, z: 100 }, yaw: 0 },
  { name: 'inside-the-gate', at: { x: 0, z: 58 }, yaw: 0 },
  { name: 'the-midway-north', at: { x: 0, z: 10 }, yaw: 0 },
  // The Reopening Board and its banner, from the spawn's own side of it. The
  // banner hangs on the north face because the building faces PI, and the strip
  // under it comes up with the certificates.
  { name: 'reopening-board', at: { x: -26, z: 52 }, yaw: 0 },
  // The rides. yaw is degrees, and on this site 90 looks west and 270 east.
  { name: 'ferris-wheel', at: { x: -18, z: 4 }, yaw: 180 },
  { name: 'pirate-ship', at: { x: 24, z: 6 }, yaw: 270 },
  { name: 'carousel-and-swings', at: { x: -26, z: -6 }, yaw: 90 },
  { name: 'bumper-pavilion', at: { x: 4, z: -24 }, yaw: 270 },
  { name: 'coaster-station', at: { x: -22, z: -44 }, yaw: 90 },
  { name: 'coaster-lift-hill', at: { x: -12, z: -78 }, yaw: 90 },
  { name: 'the-loop', at: { x: -2, z: -58 }, yaw: 90 },
  { name: 'the-loop-from-below', at: { x: -22, z: -42 }, yaw: 0 },
  { name: 'drop-tower', at: { x: 22, z: -74 }, yaw: 270 },
  { name: 'flume-and-lake', at: { x: 0, z: -84 }, yaw: 0 },
  // ------------------------------------------------------- the running park
  // Four views that are about motion rather than about a machine, and that only
  // mean anything at `--sol 13`. Three of them are far enough back to hold a
  // whole ride in frame, because a coaster train fills two degrees of view from
  // under its own lift hill and reads as a smudge on the track.
  //
  // The train is somewhere different in every frame — one lap is forty seconds
  // and the shot tool does not wait for it — so this is a check that the cars
  // are ON the rails and banked with them, not a check of where they are.
  { name: 'running-the-whole-park', at: { x: 0, z: 26 }, yaw: 0 },
  { name: 'running-coaster-circuit', at: { x: 4, z: -70 }, yaw: 90 },
  { name: 'running-tower-and-wheel', at: { x: 14, z: -40 }, yaw: 250 },
  { name: 'running-flume-header', at: { x: 8, z: -84 }, yaw: 0 },
  // The two that are about the park being shut rather than about a ride.
  { name: 'boarded-stalls', at: { x: 4, z: 40 }, yaw: 90 },
  { name: 'from-the-lake-back', at: { x: 0, z: -130 }, yaw: 180 },
  // ------------------------------------------------------- the story layer
  // story.js. The status board by the gate and the crane at arm nine read at
  // any sol; the Midway Walk's lamps and the ride cards want `--sol 13` or more;
  // the ticket court's route lanes come at 13 and the gate and the crowd on the
  // finale. The Workshop door's OPENS TOMORROW shows only at `--sol 5`.
  { name: 'story-status-board', at: { x: -4, z: 60 }, yaw: 60 },
  { name: 'story-arm-nine-barricade', at: { x: 3, z: 44 }, yaw: 90 },
  { name: 'story-midway-walk', at: { x: -4, z: -30 }, yaw: 60 },
  { name: 'story-ticket-court', at: { x: 0, z: 102 }, yaw: 0 },
  { name: 'story-staff-room', at: { x: 52, z: 50 }, yaw: 270 },
  { name: 'story-workshop-door', at: { x: -38, z: 46 }, yaw: 90 },
];

export default shots;
