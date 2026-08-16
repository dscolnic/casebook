// shots.js — the viewpoints `npm run shots midway` renders.
//
// What has to be checked here is the machines: whether the coaster's spline
// reads as a structure, whether the loop is a loop from the ground, whether the
// wheel's gondolas hang level, and whether the park looks shut. The rooms are
// engine-built and are not the risk.
export const shots = [
  // Arriving: the county road, the car park, the ticket line, then the midway.
  { name: 'the-road-in', at: { x: -30, z: 158 }, yaw: 0 },
  { name: 'car-park-west', at: { x: -56, z: 132 }, yaw: 0 },
  { name: 'ticket-line', at: { x: 0, z: 84 }, yaw: 0 },
  { name: 'inside-the-gate', at: { x: 0, z: 58 }, yaw: 0 },
  { name: 'the-midway-north', at: { x: 0, z: 10 }, yaw: 0 },
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
  // The two that are about the park being shut rather than about a ride.
  { name: 'boarded-stalls', at: { x: 4, z: 40 }, yaw: 90 },
  { name: 'from-the-lake-back', at: { x: 0, z: -130 }, yaw: 180 },
];

export default shots;
