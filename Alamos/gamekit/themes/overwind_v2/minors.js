// minors.js — the two places on the yard that are not areas, opened.
//
// §3 "Landmark-only spaces": the Lamp Room, where "forty-one numbered lamps
// record who is below", and the Change House, where "the shift begins and ends".
// The bible's whole human thread runs through them — Finn's tally stays on its
// hook on day 1, and the shift goes below on day 12 — and both stood shut. Now
// `enter:` in site.js gives each an interiors key, and story.js dresses them.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file.
export const MINOR_INTERIORS = {
  LAMP: {
    // An open room: the shelving layout the name-picker falls back to buried the
    // dressing in racks.
    layout: 'office',
    caption: 'Forty-one numbered lamps record who is below.',
    standLine: 'A tally on its hook is a man on the bank. A hook with nothing on it is a man underground.',
  },
  CHANGE: {
    // An open room: the shelving layout the name-picker falls back to buried the
    // dressing in racks.
    layout: 'office',
    caption: 'The shift begins and ends here.',
    standLine: 'Coats on chains, a bench, and the shift board through the door.',
  },
};

export default MINOR_INTERIORS;
