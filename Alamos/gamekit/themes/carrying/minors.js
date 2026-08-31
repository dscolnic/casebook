// minors.js — the places that are not areas, and what is inside them.
//
// Three buildings that were facades: modelled, lit, walkable up to and shut,
// because in this engine an interior is keyed by an area and none of these is an
// area. `enter:` in site.js gives each of them an interiors key without making it
// an area, `access.js` names and opens it on the day a question is first sited
// there, and `fixtures.js` is what sites the question.
//
// A minor room is somewhere to STAND and READ. Nothing is called here in its own
// right, so what it owes the player is a panel saying something the office's own
// numbers do not: what the tap actually reads, what the roll actually is, what a
// sailing actually draws. It is the island answering a question the player is
// already carrying up the road.
//
// Hand-written, and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  SCHOOL: {
    caption: 'One room, nineteen children, ages five to eleven. The tap in the corner is the highest reading on the network.',
    standLine: 'The same water is a different dose for the smallest body drinking it.',
    station: { kind: 'panel', title: 'Island School', rows: [
      { label: 'On the register', value: '19', status: 'low' },
      { label: 'Leaving in August', value: '2', status: 'alarm' },
      { label: 'School tap nitrate', value: '11.2 mg/L', status: 'high' },
      { label: 'Distribution main', value: '8.4 mg/L', status: 'normal' },
    ] },
  },
  BERTH: {
    caption: 'Tuesdays and Fridays, and a vote in a fortnight on making it twice a day.',
    standLine: 'Everything that arrives on Vellan arrives through this gate, uninspected.',
    station: { kind: 'panel', title: 'Ferry Berth', rows: [
      { label: 'Sailings a week', value: '2', status: 'normal' },
      { label: 'Fresh water a crossing', value: '6 m³', status: 'normal' },
      { label: 'July day visitors', value: '340', status: 'high' },
      { label: 'Berth inspections', value: 'none', status: 'alarm' },
    ] },
  },
  CHAPEL: {
    caption: 'Where the council meets. Nine seats, and the pack is read out from the table at seven.',
    standLine: 'A figure with no period on it comes back in three years as a fact.',
    station: { kind: 'panel', title: 'Chapel and Hall', rows: [
      { label: 'Seats on the council', value: '9', status: 'normal' },
      { label: 'Pack closes', value: '16:00', status: 'high' },
      { label: 'Vote', value: '19:00', status: 'alarm' },
      { label: 'Conditions drafted', value: 'see the board', status: 'normal' },
    ] },
  },
};

export default MINOR_INTERIORS;
