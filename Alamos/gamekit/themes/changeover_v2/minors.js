// minors.js — the three places in Kesteven House that are not areas, named.
//
// §3 "Landmark-only spaces and visible scene objects": the Street Balcony, the
// Clerks' Break Room and the Cash Loading Bay are "walkable and ungraded. They
// never add a required tour, question, or travel cost." In a tower every room
// off the corridor is already walkable, so nothing here opens a door; what this
// file does is give the three rooms the bible's names and its own `Before`
// sentence at the door, where the engine reads `COPY[room.id]`.
//
//   LOOKOUT  floor 48, open to the corridor   →  `street-balcony`
//   CASHIER  floor 45, west                   →  `clerks-break-room`
//   STRONG   floor 45, east                   →  `cash-loading-bay`
//
// story.js dresses them: the shop boards out of the balcony's glass reprice
// after Stop 12 and turn to the new currency after Stop 60; the rota's gaps
// fill after Stop 44 and the night-shift mugs come back after Stop 60; the
// cages fill after Stop 28 and roll out through the hoist after Stop 60.
//
// Hand-written and merged over the generated `interiors.js` and `copy.js` in
// theme.js. `import-book.mjs` never writes this file.
export const MINOR_INTERIORS = {
  LOOKOUT: {
    caption: 'Shop windows carry hurried price stickers.',
    standLine: 'Everything on the board is out of this window, and the shop boards on Vend Street are the first thing to change.',
  },
  CASHIER: {
    caption: 'Tea goes cold beside a chalked shift rota.',
    standLine: 'The only kettle above the fortieth floor, and the rota nobody has had time to fill.',
  },
  STRONG: {
    caption: 'Empty cages wait for sealed old-note bundles.',
    standLine: 'Four cages, the goods hoist, and nothing in either until the Note Room has counted.',
  },
};

/** What the door says. The bible's `Before` line for each space, verbatim. */
export const MINOR_COPY = {
  LOOKOUT: '<p>The street balcony, open to the corridor. Shop windows carry hurried price stickers.</p>',
  CASHIER: '<p>The clerks’ break room. Tea goes cold beside a chalked shift rota.</p>',
  STRONG: '<p>The cash loading bay. Empty cages wait for sealed old-note bundles.</p>',
};

export default MINOR_INTERIORS;
