// minors.js — the two landmark rooms the bible names and attaches no stop to.
//
// §3, "Landmark-only spaces": the Mess & Bunks, where "the crew eats, sleeps,
// and argues", and the Medical Bay, where "human consequences of cold or poor
// air are visible here without turning the room into a quiz station". Both are
// `enter:` buildings in site.js — a door with an interiors key and no case — and
// story.js dresses them: bunks and coats in one, cots and the room-7 reading in
// the other. The Runway Door stays a gate, because a runway is not a room.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file.
export const MINOR_INTERIORS = {
  MESS: {
    // An open room: the shelving layout the name-picker falls back to buried the
    // dressing in racks.
    layout: 'office',
    caption: 'The crew eats, sleeps, and argues here, but no graded stop is attached to it.',
    standLine: 'Twenty-eight people, one storm, and a plane that may reach them in 36 hours.',
  },
  MED: {
    // An open room: the shelving layout the name-picker falls back to buried the
    // dressing in racks.
    layout: 'office',
    caption: 'Human consequences of cold or poor air are visible here without turning the room into a quiz station.',
    standLine: 'Two cots occupied. The room-7 alarm is argued about next door.',
  },
};

export default MINOR_INTERIORS;
