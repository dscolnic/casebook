// ballpark-specs.js — the executable half of the seven Ballpark activities.
//
// The design book gives each estimate as prose: a list of givens, a governing
// relationship, and a question. The engine's number-tile interface needs
// something prose cannot supply — numeric values, an evaluable formula, and a
// tolerance. Three of the seven relationships are not equations at all
// ("Two moles A are required per mole B"), so generating these automatically
// would mean inventing arithmetic the book did not write.
//
// They are therefore hand-written here, one per activity id, and checked
// against the book's own "Complete solution" line by tools/check-ballpark.mjs.
// The importer folds them into BALLPARK_CALCS under the engine's
// `${group}-${lesson.day}` key; an activity with no entry is reported, never
// silently rendered as an un-answerable panel.
//
// Fields, as engine/core/questionUI.js reads them:
//   labels/values  the number tiles, in the same order (decoys included)
//   slots          how many tiles the equation takes
//   template       the equation shown, with {0}…{n-1} as the fillable slots
//   formula        evaluated with a, b, c… bound to the tiles in fill order
//   correct        indices of the tiles that belong in the estimate
//   target/tolerance  the accepted numeric result
//
// The book asks for one or two decoys that are "physically related but not
// required"; each entry carries them, and they are the last labels listed.

export const BALLPARK_SPECS = {
  // Mission 2 · Activity 2.1 — V = nRT/P
  '2.1': {
    prompt: 'A colorless plume is leaving the yard. Command wants the equilibrium gas volume before anyone draws an evacuation corridor.',
    question: 'Estimate the gas volume at ambient conditions.',
    labels: [
      '2.0×10⁴ mol  (n, amount released)',
      '8.31 J mol⁻¹ K⁻¹  (R)',
      '300 K  (T, ambient)',
      '1.0×10⁵ Pa  (P, ambient)',
      '22.4 L mol⁻¹  (molar volume at STP)',
      '273 K  (0 °C)',
    ],
    values: [2.0e4, 8.31, 300, 1.0e5, 22.4, 273],
    slots: 4,
    template: '{0} × {1} × {2} ÷ {3}',
    formula: 'a*b*c/d',
    correct: [0, 1, 2, 3],
    target: 498.6,
    tolerance: 60,
    units: 'm³',
    solution: 'V = nRT/P ≈ (2.0×10⁴ × 8.31 × 300) / 1.0×10⁵ ≈ 500 m³.',
    explanation: 'The ideal gas law fixes the volume the release would occupy at equilibrium. That is a scale, not a hazard footprint: mixing, wind, terrain and chemistry decide where the material actually goes and at what concentration.',
  },

  // Mission 5 · Activity 5.1 — C_original V_sample = C_diluted V_final
  '5.1': {
    prompt: 'The laboratory diluted the river sample before it went on the instrument. The number on the screen is not the number the city asked for.',
    question: 'Estimate the original concentration in the river sample.',
    labels: [
      '2.5 mg/L  (measured, diluted)',
      '100.0 mL  (final volume)',
      '10.0 mL  (sample taken)',
      '0.25 mg/L  (instrument detection limit)',
      '1,000 mL  (bottle volume)',
    ],
    values: [2.5, 100.0, 10.0, 0.25, 1000],
    slots: 3,
    template: '{0} × {1} ÷ {2}',
    formula: 'a*b/c',
    correct: [0, 1, 2],
    target: 25,
    tolerance: 2,
    units: 'mg/L',
    solution: 'C_original = 2.5 × 100.0 / 10.0 = 25 mg/L.',
    explanation: 'A ten-fold dilution has to be undone before the result is compared with any threshold. Reporting the diluted figure understates the river by a factor of ten.',
  },

  // Mission 6 · Activity 6.2 — 2A + B → products
  '6.2': {
    prompt: 'Two drainage streams meet in the tunnel. Crews cannot enter until someone says how far the reaction can actually go.',
    question: 'Estimate the maximum extent of reaction, in moles of B consumed.',
    labels: [
      '10 mol A available',
      '8 mol B available',
      '2 mol A per mol B  (the ratio itself)',
      '18 mol  (A and B added together)',
    ],
    values: [10, 8, 2, 18],
    slots: 2,
    template: 'the smaller of  {0} ÷ 2  and  {1}',
    formula: 'Math.min(a/2, b)',
    correct: [0, 1],
    target: 5,
    tolerance: 0.5,
    units: 'mol B',
    solution: '10 mol A can consume only 5 mol B, so A is limiting and at most 5 mol B react — leaving 3 mol B unreacted.',
    explanation: 'The reactant present in the larger amount is not the one that governs. Dividing each amount by its coefficient shows A runs out first, which also means B is still there afterwards.',
  },

  // Mission 7 · Activity 7.1 — q = mcΔT
  '7.1': {
    prompt: 'The storage zone is still warming after the visible fire is out. Fire Command needs the size of the heat load before deciding whether cooling can keep up.',
    question: 'Estimate the heat absorbed by the containment bath.',
    labels: [
      '2,000 kg  (mass of the bath)',
      '4.2 kJ kg⁻¹ K⁻¹  (specific heat)',
      '5 K  (temperature rise)',
      '2,260 kJ kg⁻¹  (latent heat of vaporisation)',
      '300 K  (ambient temperature)',
    ],
    values: [2000, 4.2, 5, 2260, 300],
    slots: 3,
    template: '{0} × {1} × {2}',
    formula: 'a*b*c',
    correct: [0, 1, 2],
    target: 42000,
    tolerance: 2500,
    units: 'kJ',
    solution: 'q = mcΔT = 2,000 × 4.2 × 5 = 42,000 kJ = 42 MJ.',
    explanation: 'A rise of only five degrees looks negligible until it is multiplied by a large thermal mass. Note this is sensible heat alone — a phase change or a continuing reaction would add far more.',
  },

  // Mission 9 · Activity 9.1 — moles H+ = concentration × volume
  '9.1': {
    prompt: 'The intake has turned acidic. Before dosing anything, the team wants the size of the free acid pool it is about to neutralise.',
    question: 'Estimate the moles of hydrogen ion in the measured free pool.',
    labels: [
      '1,000 L  (volume treated)',
      '1.0×10⁻⁴ mol/L  ([H⁺] measured)',
      '4.0  (the pH reading)',
      '1.0×10⁻⁷ mol/L  ([H⁺] in neutral water)',
    ],
    values: [1000, 1.0e-4, 4.0, 1.0e-7],
    slots: 2,
    template: '{0} × {1}',
    formula: 'a*b',
    correct: [0, 1],
    target: 0.1,
    tolerance: 0.02,
    units: 'mol H⁺',
    solution: 'moles H⁺ = 1.0×10⁻⁴ mol/L × 1,000 L = 0.10 mol in the measured free pool.',
    explanation: 'This is the free hydrogen ion only. Weak acids and buffers release more H⁺ as neutralisation proceeds, so a titration measures the real base demand far better than pH does.',
  },

  // Mission 11 · Activity 11.2 — average loss rate per area
  '11.2': {
    prompt: 'The intake pipeline is losing metal. Maintenance wants a rate it can compare against the wall thickness it has left.',
    question: 'Estimate the average mass loss per square metre per year.',
    labels: [
      '2.0 kg/year  (total mass loss)',
      '4.0 m²  (affected area)',
      '7.9 g cm⁻³  (density of the steel)',
      '6.0 mm  (remaining wall thickness)',
    ],
    values: [2.0, 4.0, 7.9, 6.0],
    slots: 2,
    template: '{0} ÷ {1}',
    formula: 'a/b',
    correct: [0, 1],
    target: 0.5,
    tolerance: 0.05,
    units: 'kg m⁻² year⁻¹',
    solution: 'average loss rate = 2.0 kg/year ÷ 4.0 m² = 0.50 kg m⁻² year⁻¹.',
    explanation: 'The average is real but it is not where the pipe fails. Corrosion localises — pitting at a coating defect can remove the same mass from a hundredth of the area, and perforate long before the average predicts it.',
  },

  // Mission 14 · Activity 14.1 — compare the plausible range with the limit
  '14.1': {
    prompt: 'The release limit is 10 units. The final verification result is 9.0 units, with an uncertainty interval spanning roughly 7 to 11. The board wants a yes or a no.',
    question: 'Estimate the upper end of the plausible range, then judge it against the limit of 10.',
    labels: [
      '9.0 units  (central result)',
      '2.0 units  (one-sided uncertainty)',
      '10 units  (the release limit)',
      '7.0 units  (lower end of the range)',
    ],
    values: [9.0, 2.0, 10, 7.0],
    slots: 2,
    template: '{0} + {1}',
    formula: 'a+b',
    correct: [0, 1],
    target: 11,
    tolerance: 0.4,
    units: 'units',
    solution: 'Upper end ≈ 9.0 + 2.0 = 11 units, which is above the limit of 10. This is not an unambiguous pass.',
    explanation: 'A central estimate below a limit is not a pass when the uncertainty crosses it. Under a pre-agreed decision rule this calls for a guard band, a repeat measurement, or additional independent evidence — not a release.',
  },
};
