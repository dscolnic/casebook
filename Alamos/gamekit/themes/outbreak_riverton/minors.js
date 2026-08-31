// minors.js — the places that are not areas, and what is inside them.
//
// One room, promoted past the two-authored-stops bar: City Health Command
// carries the sol-14 TRIGGER ("Choose an adaptive policy") and the sol-15
// SEQUENCE ("Build the public explanation"), both about what happens inside
// it rather than merely mentioning it in passing. It stood on the site plan
// from the start — modelled, lit, walkable up to — with no `group` and
// therefore no door, exactly the facade PLACEMENT_PASS.md describes.
//
// A minor room is somewhere to STAND and READ, not somewhere a case opens: no
// beacon, no delivery board. What it owes the player is a panel that tells
// them something the city's own numbers do not.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  CMD: {
    caption: 'Every district feeds its numbers here, and the council wants one policy out of all of them.',
    standLine: 'The occupancy board and the capacity model live on the same wall now.',
    station: { kind: 'panel', title: 'Command board', rows: [
      { label: 'Critical-care beds full', value: '90 of 120', status: 'alarm' },
      { label: 'Severe cases arriving', value: '~8 per day', status: 'high' },
      { label: 'Districts on divergent paths', value: 3, status: 'high' },
      { label: 'Policy set this week', value: 'pending', status: 'low' },
    ] },
  },
};
