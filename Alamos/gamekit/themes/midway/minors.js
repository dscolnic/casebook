// minors.js — the places that are not rides, and what is inside them.
//
// Three rooms with no case stand, no beacon and no delivery board. All three were
// facades before the placement pass: modelled, lit, walkable up to and shut,
// because in this engine an interior is keyed by an area and none of these is an
// area. Every question in this game belongs to a ride, so none of these gets one
// of its own — what each owes the player is a panel saying something the ride
// files do not: what the park actually knows about itself, what the whole site
// runs off, and the one building nobody has to certify.
//
// They are not open from day 1. `access.js` seals a door until the campaign sends
// somebody through it, and what sends somebody here is the sited call declared
// against each key in `fixtures.js`: the workshop on day 5, the plant room on day
// 10, the boarded stalls on day 11.
//
// The FRONT GATE is deliberately not in this file. It is shut because the park is
// shut, it opens when the certificates are signed, and that is after the last day
// the player sees. A room behind it would be a room whose whole meaning is that
// you cannot get into it yet.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  WORKSHOP: {
    caption: 'Forty-one years of this park, in one man\'s handwriting, on one bench.',
    standLine: 'Everything the park knows about itself is in this room, and none of it is working.',
    station: { kind: 'panel', title: 'Brennan\'s notebooks', rows: [
      { label: 'Notebooks on the bench', value: '11', status: 'normal' },
      { label: 'Years covered', value: '1984 to 2025', status: 'normal' },
      { label: 'Settings recorded', value: 'about 600', status: 'normal' },
      { label: 'Lines of working', value: '0', status: 'alarm' },
    ] },
  },
  PLANT: {
    caption: 'Compressors, the water treatment set, and the switchboard every ride on the midway runs off.',
    standLine: 'Nothing in this room is on the inspection list, and nothing turns without it.',
    station: { kind: 'panel', title: 'Midway switchboard', rows: [
      { label: 'Incoming supply', value: '400 V, 250 A', status: 'normal' },
      { label: 'Flume pump plate', value: '55 kW', status: 'normal' },
      { label: 'Flume pump measured', value: '53.7 kW', status: 'high' },
      { label: 'Rides fed off this board', value: '7 of 7', status: 'normal' },
    ] },
  },
  ARCADE: {
    caption: 'The arcade and the boarded stalls. Nothing in here needs certifying, which makes it the quietest building on site.',
    standLine: 'The only physics in this room that nobody has to sign for.',
    station: { kind: 'panel', title: 'Midway stalls', rows: [
      { label: 'Stalls boarded', value: '9 of 12', status: 'low' },
      { label: 'On the inspection list', value: 'none', status: 'normal' },
      { label: 'Water cannon supply', value: '2.4 bar', status: 'normal' },
      { label: 'Takings, a good Saturday', value: '1,900 pounds', status: 'normal' },
    ] },
  },
};

export default MINOR_INTERIORS;
