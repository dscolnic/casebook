// minors.js — the two places on Pellow Head that are not areas, opened.
//
// §3 "Landmark-only spaces": the Generator House "remains support infrastructure
// with a quiet running set and no electricity lesson", and the Ship's Store
// "holds the covered release cart and the final loading gate, with no extra
// graded stop". Both carry `enter:` in site.js so the player can stand inside,
// and story.js dresses them — a set turning over in one, the loading gate that
// clears on day 15 in the other.
//
// Hand-written and merged over the generated `interiors.js` in theme.js.
// `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  GEN: {
    caption: 'Support infrastructure with a quiet running set and no electricity lesson.',
    standLine: 'One set running, one on standby, and the nursery lamps on the other end of the cable.',
  },
  STORE: {
    caption: 'The covered release cart and the final loading gate, with no extra graded stop.',
    standLine: 'Everything that leaves for the ship is checked through this gate first.',
  },
};

export default MINOR_INTERIORS;
