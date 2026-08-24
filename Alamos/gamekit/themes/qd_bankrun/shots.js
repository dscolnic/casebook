// shots.js — where to stand to photograph Marrable House.
//
// A tower needs its own views for a reason the corridor games do not: the plate
// is the same rectangle on all four floors, so a plan-derived set photographs
// one floor four times. `at` carries a y, and `interiorTower.js` puts the player
// on whichever floor that height belongs to.
//
// The one thing that must be photographed is the street. Everything glazed has
// to have something built outside it, and the failure mode is not an error — from
// inside, a window with nothing behind it looks merely hazy, and from outside the
// building is four trays of furniture stacked in mid-air.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = π looks up the plate,
// θ = π/2 looks WEST, at the street front.
const UP = Math.PI;
const WEST = Math.PI / 2;
const EAST = -Math.PI / 2;

const RISE = 4.6;
const eye = (floor) => 1.6 + floor * RISE;

export const VIEWS = [
  { name: 'counter--from-the-lift', at: { x: 0, y: eye(0), z: 6.5 }, yaw: UP,
    note: 'floor two, from where the day starts, looking down the plate' },
  { name: 'counter--the-hall', at: { x: -3.0, y: eye(0), z: -4.0 }, yaw: WEST,
    note: 'the banking hall, the counter, and the window over the queue' },
  { name: 'street--from-the-counter', at: { x: -7.5, y: eye(0), z: -5.0 }, yaw: WEST,
    note: 'out of the window on floor two: the pavement, the queue and the block opposite' },
  // The queue is on the pavement directly below and no horizontal view will ever
  // contain it — a person five metres out and twenty-five metres down is eighty
  // degrees below the eye line. In the game you lean at the glass and look down,
  // which is the whole reason the counter floor and the crisis desk see different
  // amounts of it. These two views are here to check the other half: that there
  // is a street under the window at all, and that it does not stop at a wall.
  { name: 'street--from-the-desk', at: { x: -7.5, y: eye(3), z: -5.0 }, yaw: WEST,
    note: 'the same window three floors up — roofs, and the city behind them' },
  { name: 'loans--the-book', at: { x: -3.0, y: eye(1), z: -4.0 }, yaw: WEST,
    note: 'floor three, the loan book room' },
  { name: 'vault--the-cages', at: { x: -3.0, y: eye(2), z: -4.0 }, yaw: WEST,
    note: 'floor four, the reserve room and its cages' },
  { name: 'crisis--the-table', at: { x: -3.0, y: eye(3), z: -4.0 }, yaw: WEST,
    note: 'floor five, the crisis desk' },
  { name: 'corridor--chain-square-on', at: { x: -1.4, y: eye(0), z: 9.0 }, yaw: EAST,
    note: 'square on to the painted band, so the stations and their numbering read' },
];

export default VIEWS;
