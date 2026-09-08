// fixtures.js — the objects the questions are about, for Planetary Defense.
//
// GENERATED from the campaign bible by tools/build-fixtures.mjs. Every id, place,
// kind and caption is the bible's; `wall` and `along` are this file's, because
// they are about the room rather than the object. Look at them with
// `npm run shots` before believing the arrangement — see gamekit/INTERIORS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'
//   along:  -1 … 1 along that wall. 0 is the middle.
export const FIXTURES = {
  COORDINA: [
    { id: 'scopeboard', name: 'The live evidence board: images', build: 'board', wall: 'back', along: 0,
      caption: "The live evidence board: images, orbit clouds, thresholds, and signed claims, with every source shown." },
    { id: 'archive-bench', name: 'The plate-and-data archive bench', build: 'bench', wall: 'left', along: 0,
      caption: "The plate-and-data archive bench, with calibrated frames, ingest records, and an open audit drawer." },
    { id: 'review-desk', name: 'Lena\'s review desk', build: 'bench', wall: 'right', along: 0,
      caption: "Lena's review desk, where each clue receives one physical explanation or an unresolved tag." },
    { id: 'delivery-desk', name: 'Mira\'s delivery desk', build: 'bench', wall: 'back', along: -0.45,
      caption: "Mira's delivery desk, with the notice draft, claim ledger, and release controls." },
    { id: 'pipeline-link', name: 'A live link to the summit pipeline', build: 'board', wall: 'left', along: -0.45,
      caption: "A live link to the summit pipeline, showing injected sources beside recovered detections." },
  ],
  ORBIT: [
    { id: 'astro-bench', name: 'The astrometry bench', build: 'bench', wall: 'back', along: 0,
      caption: "The astrometry bench, with timed sky positions, geometry tools, and uncertainty readouts." },
    { id: 'fit-board', name: 'The orbit-fit board', build: 'board', wall: 'left', along: 0,
      caption: "The orbit-fit board, with candidate solutions, residuals, covariance, and propagation controls." },
    { id: 'scope-schedule', name: 'The observing schedule board', build: 'board', wall: 'right', along: 0,
      caption: "The observing schedule board, where time blocks, sites, weather, and information gain compete." },
    { id: 'orbit-delivery-desk', name: 'The orbit team\'s delivery desk', build: 'bench', wall: 'back', along: -0.45,
      caption: "The orbit team's delivery desk, where a shared observing plan is funded and committed." },
    { id: 'tracking-rack', name: 'The tracking rack', build: 'rack', wall: 'left', along: -0.45,
      caption: "The tracking rack, holding raw and corrected astrometry views plus the independent reference-star channel." },
  ],
  OPS: [
    { id: 'dome-console', name: 'The summit telescope console', build: 'vessel', wall: 'back', along: 0,
      caption: "The summit telescope console, with exposure, pointing, prediction, and image-measurement controls." },
    { id: 'pipeline-bench', name: 'The summit pipeline bench', build: 'bench', wall: 'left', along: 0,
      caption: "The summit pipeline bench, showing masks, injected sources, recovered positions, and identity checks." },
  ],
  SPECDOME: [
    { id: 'sizing-board', name: 'The physical-sizing board', build: 'board', wall: 'back', along: 0,
      caption: "The physical-sizing board, where brightness, albedo, thermal flux, shape, and mass ranges overlap." },
    { id: 'spectrograph', name: 'The thermal spectrograph', build: 'vessel', wall: 'left', along: 0,
      caption: "The thermal spectrograph, with wavelength channels, temperature controls, and calibrated flux readouts." },
    { id: 'photometry-bench', name: 'The rotation photometry bench', build: 'bench', wall: 'right', along: 0,
      caption: "The rotation photometry bench, with phased light curves, residuals, and repeat-cycle comparisons." },
  ],
  RADAR: [
    { id: 'tracking-clock', name: 'The radar timing board', build: 'board', wall: 'back', along: 0,
      caption: "The radar timing board, tracing transmit, receive, archive, and correction clocks to their sources." },
    { id: 'radar-console', name: 'The bistatic radar console', build: 'vessel', wall: 'left', along: 0,
      caption: "The bistatic radar console, with delay-Doppler frames, range gates, and controlled sweep settings." },
    { id: 'echo-archive', name: 'The preserved echo archive', build: 'rack', wall: 'right', along: 0,
      caption: "The preserved echo archive, holding untouched packets, frozen windows, and independent repeat observations." },
  ],
  IMPACT: [
    { id: 'energy-bench', name: 'The impact-energy bench', build: 'bench', wall: 'back', along: 0,
      caption: "The impact-energy bench, with diameter, density, speed, mass, energy, and TNT-equivalent fields." },
    { id: 'risk-display', name: 'The corridor risk display', build: 'board', wall: 'left', along: 0,
      caption: "The corridor risk display, joining physical effects to exposed populations and staged action thresholds." },
    { id: 'deflection-desk', name: 'The intervention desk', build: 'bench', wall: 'right', along: 0,
      caption: "The intervention desk, where miss distance, lead time, required impulse, and launch-ready capability are compared." },
  ],
  TOWN: [
    { id: 'evac-desk', name: 'The response allocation desk', build: 'bench', wall: 'back', along: 0,
      caption: "The response allocation desk, with transport, shelter, accessibility, medical, communications, and reserve capacity." },
    { id: 'threshold-board', name: 'The public-action board', build: 'board', wall: 'left', along: 0,
      caption: "The public-action board, with precommitted evidence lines, authorities, messages, and review times." },
  ],
};
