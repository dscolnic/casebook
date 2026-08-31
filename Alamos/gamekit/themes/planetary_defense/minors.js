// minors.js — the places that are not areas, and what is inside them.
//
// One room, promoted from a standing facade. TOWN — the Valle Seco Emergency
// Office — stood modelled, lit and shut from the day this theme shipped: an
// area is what gets an interior in this engine, and Valle Seco carried no
// group of its own. But three authored stops on day 14 (matching action to
// evidence, the displaced-population estimate, and writing the evacuation
// thresholds) are Survey & Response's own questions about the exact people
// this building exists for, and it stands forty-six metres from the Entry &
// Consequences Lab — the same corner of the range. `enter: 'TOWN'` in site.js
// gives it an interiors key without making it an area: a door, a room, no
// case stand and no delivery board. See gamekit/PLACEMENT_PASS.md.
//
// A minor room is somewhere to STAND and READ. Nothing is called here and no
// question is asked here as an area of its own — what it owes the player is a
// panel that tells them something the coordination desk's own numbers do not.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file.
export const MINOR_INTERIORS = {
  TOWN: {
    caption: 'Two counties under the strip the uncertainty corridor sweeps, and a plan that costs trust nobody gets back.',
    standLine: 'Stockpiles and plans are cheap to undo. Moving nine million people is neither.',
    station: { kind: 'panel', title: 'Emergency office', rows: [
      { label: 'Population under the corridor', value: '9,000,000', status: 'alarm' },
      { label: 'Evacuation lead time needed', value: '~30 days', status: 'high' },
      { label: 'Plans funded so far', value: '0 of 2 counties', status: 'low' },
      { label: 'Warning time at discovery', value: '11 days', status: 'alarm' },
    ] },
  },
};
