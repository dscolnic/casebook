// minors.js — the two places that are not areas, and what is inside them.
//
// In this engine an interior is keyed by an area, so a building with no `group:`
// is modelled, lit, walkable up to and shut. Pellow Head had three of those. Two
// of them are rooms a person works in, and they carry `enter:` in site.js now:
//
//   GEN    the generator house — two sets, one running, and the cable's own
//          power feed board. Bruno Salas's decision on day 4 is asked here.
//   STORE  the ship's store — staged for the charter, and where the offcuts and
//          the spares money live. Days 8 and 12 are asked here.
//
// The third, the beach manhole, stays a facade on purpose: it is 1.2 m high and a
// chamber under the sand, and PLACEMENT_PASS.md's bar for opening a place is two
// authored stops about what happens inside. There is nothing to ask in it.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  GEN: {
    caption: 'Two sets, one running, and the current that keeps eleven repeaters alive out under the sea.',
    standLine: 'The cable is fed from both ends, and this end is the one that is still feeding it.',
    station: { kind: 'panel', title: 'Cable power feed', rows: [
      { label: 'Feed current', value: '0.92 A', status: 'normal' },
      { label: 'Feed voltage', value: '3.9 kV', status: 'normal' },
      { label: 'Repeaters on this end', value: '11', status: 'normal' },
      { label: 'Set 2', value: 'standby', status: 'low' },
    ] },
  },
  STORE: {
    caption: 'Staged for a charter from the thirteenth: joints, offcuts, and one spare pump module too few.',
    standLine: 'Everything the ship takes out has to be signed out of this room first.',
    station: { kind: 'panel', title: "Ship's store", rows: [
      { label: 'Spare pump modules', value: '4 listed, 6 held', status: 'high' },
      { label: 'Mechanical joints', value: '18', status: 'normal' },
      { label: 'Spares and survey money', value: '100 points', status: 'normal' },
      { label: 'Charter', value: 'from the 13th', status: 'alarm' },
    ] },
  },
};

export default MINOR_INTERIORS;
