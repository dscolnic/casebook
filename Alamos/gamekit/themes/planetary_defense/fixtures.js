// fixtures.js — the objects the questions are about, one per area's worth of work.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by name and wall and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls actually are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/planetary-defense.yml. A
// lesson that points at nothing is answered at the case stand, exactly as
// before.
export const FIXTURES = {
  DISC: [
    { id: 'pipeline-bench', name: 'The image-processing bench', build: 'bench', wall: 'left', along: -0.3,
      caption: 'Forty thousand catalogued stars, two satellite trails, and one bad camera spot to sort from the real point.' },
    { id: 'dome-console', name: 'The survey dome console', build: 'board', wall: 'back', along: 0.3,
      caption: 'Every detection tonight, plotted against the sky it was found in.' },
  ],
  ORBIT: [
    { id: 'astro-bench', name: 'The astrometry reduction bench', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Six observatories’ positions, waiting to become one track.' },
    { id: 'fit-board', name: 'The orbit-fit board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Every orbit that still fits the data, drawn together.' },
    { id: 'tracking-rack', name: 'The post-impact tracking rack', build: 'rack', wall: 'right', along: -0.2,
      caption: 'Where the predicted deflection meets what actually happened.' },
  ],
  CHAR: [
    { id: 'photometry-bench', name: 'The photometry bench', build: 'bench', wall: 'left', along: -0.3,
      caption: 'One brightness curve, and everything that could be hiding inside it.' },
    { id: 'sizing-board', name: 'The size–albedo board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Reflected light and thermal glow, plotted until they agree on one diameter.' },
    { id: 'spectrograph', name: 'The spectrograph', build: 'rack', wall: 'right', along: -0.2,
      caption: 'A dip near 1.4 microns, and the question of whether it belongs to the rock.' },
  ],
  RADAR: [
    { id: 'dish', name: 'The radar dish', build: 'vessel', wall: 'left', along: -0.3,
      caption: 'Pointed and holding, while the ridge wind tries to walk it off target.' },
    { id: 'radar-console', name: 'The radar console', build: 'board', wall: 'back', along: 0.3,
      caption: 'Delay and Doppler, read straight off the echo.' },
  ],
  IMPACT: [
    { id: 'risk-display', name: 'The impact-risk display', build: 'board', wall: 'back', along: 0.3,
      caption: 'The whole band of orbits that still fit, and how much of it still touches Earth.' },
    { id: 'energy-bench', name: 'The impact-energy bench', build: 'bench', wall: 'left', along: -0.3,
      caption: 'Joules on one side, megatons on the other, and a size nobody has pinned down yet.' },
    { id: 'deflection-desk', name: 'The deflection-physics desk', build: 'bench', wall: 'right', along: -0.2,
      caption: 'How hard the spacecraft has to hit, and what counts as proof it worked.' },
  ],
  OPS: [
    { id: 'desk', name: 'The coordination desk', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Where every other room’s numbers get turned into a decision.' },
    { id: 'scopeboard', name: 'The telescope scheduling board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Every hour of observing time this campaign has, and what it still needs to buy.' },
  ],
  // ---- SITED CALLS: a fixture in a place that is not an area.
  //
  // A stop whose `at:` resolves under this key is asked THERE. The question
  // still belongs to OPS — it is still Survey & Response's question about who
  // gets evacuated — and the player is sent to Valle Seco to answer it, because
  // that is where the emergency office actually is, forty-six metres from the
  // consequences lab. See gamekit/PLACEMENT_PASS.md.
  TOWN: [
    { id: 'evac-desk', name: 'The evacuation planning desk', build: 'bench', wall: 'left', along: -0.2,
      caption: 'Two counties’ worth of people, and a plan that costs trust nobody gets back.' },
    { id: 'threshold-board', name: 'The action-threshold board', build: 'board', wall: 'back', along: 0.2,
      caption: 'What happens at each stage, written down before the next update can panic anybody into changing it.' },
  ],
};
