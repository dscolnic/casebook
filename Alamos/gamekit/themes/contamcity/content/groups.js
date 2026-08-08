// groups.js — the six areas of study in Riverton's contamination response.
//
// The mapping from the book's fifteen missions to these six areas is
// tools/contamcity-map.json, and the importer reads it. The three files that
// have to agree on these ids are: this one, that map, and site.js.
//
//   IDENT   1, 4          molecular identification
//   GASES   2, 13         atmosphere and gases
//   WATER   3, 9, 10      solutions and water chemistry
//   QUANT   5, 14         quantitative analysis
//   ENERGY  6, 7, 8       reactions and energy
//   TREAT   11, 12, 15    treatment and infrastructure
//
// `type` names the format that dominates the area's lessons, which is what the
// engine uses to pick a default challenge renderer if a lesson omits one.

/**
 * Four milestones per area. The costs rise because later evidence is harder to
 * get, not because the game is padding: a first identification is cheap, an
 * independent confirmation is not.
 */
const milestones = (a, b, c, d) => ([
  { name: a, cost: 14, work: 11, brief: 'Establish what this area can measure, and what it cannot.' },
  { name: b, cost: 20, work: 15, brief: 'Connect the measurements to a mechanism the team can act on.' },
  { name: c, cost: 26, work: 19, brief: 'Confirm it with evidence that could have failed independently.' },
  { name: d, cost: 32, work: 23, brief: 'Hand the conclusion, and its remaining uncertainty, to City Command.' },
]);

export const GROUPS = [
  {
    id: 'IDENT', code: 'IDENT', name: 'Molecular Identification',
    color: '#7a4fa3', difficulty: 4, type: 'protocol', defaultLeader: 'okonjo', budget: 76,
    desc: 'Composition, charge, separation and spectra — what the material in the containers actually is.',
    milestones: milestones(
      'Build the provisional identity list',
      'Separate the mixture before naming it',
      'Confirm identity with orthogonal methods',
      'Release a confidence-ranked identity dossier'),
    issuePool: [
      'Two analytical methods agree, but both depend on the same reference standard.',
      'A chromatogram peak was assigned to one compound before the spectra were read.',
      'A container label uses a common name with no composition or concentration.',
    ],
  },
  {
    id: 'GASES', code: 'GASES', name: 'Atmosphere & Gases',
    color: '#2f7fa8', difficulty: 4, type: 'ballpark', defaultLeader: 'varga', budget: 74,
    desc: 'Gas laws, plume behaviour, photochemistry — how the release moves and changes in air.',
    milestones: milestones(
      'Bound the release with a gas-law estimate',
      'Separate transport from chemistry in the plume',
      'Track the secondary products after the source stops',
      'Issue a defensible exposure picture over time'),
    issuePool: [
      'The ideal-gas estimate is being quoted as a hazard footprint.',
      'The wind shifted after the corridor was drawn, and nobody has redrawn it.',
      'Concentrations fell while a photochemical product rose, and only one is monitored.',
    ],
  },
  {
    id: 'WATER', code: 'WATER', name: 'Solutions & Water Chemistry',
    color: '#1f7a6b', difficulty: 5, type: 'protocol', defaultLeader: 'ferreira', budget: 84,
    desc: 'Polarity, partitioning, pH and equilibrium — where the contaminant goes once it is wet.',
    milestones: milestones(
      'Predict partitioning from molecular interactions',
      'Bring the intake pH under control without masking risk',
      'Show whether equilibrium moved the hazard or removed it',
      'Account for the contaminant across water, sediment and solids'),
    issuePool: [
      'Dissolved concentration fell and sediment concentration rose, and only water is sampled.',
      'A pH correction could overshoot into strongly basic conditions.',
      'The sampling plan measures the surface film and calls it the river.',
    ],
  },
  {
    id: 'QUANT', code: 'QUANT', name: 'Quantitative Analysis',
    color: '#b0762a', difficulty: 5, type: 'ballpark', defaultLeader: 'nakamura', budget: 80,
    desc: 'Dilution, calibration, detection limits and uncertainty — turning a signal into a defensible number.',
    milestones: milestones(
      'Turn instrument signal into concentration',
      'Put a calibration and a blank behind every number',
      'Attach an uncertainty to the decision, not just the sample',
      'Establish the release rule before the result arrives'),
    issuePool: [
      'A diluted result is being compared directly with a threshold.',
      'The measured value sits inside its own uncertainty of the limit.',
      'Every sample came from the same point on the same day.',
    ],
  },
  {
    id: 'ENERGY', code: 'ENERGY', name: 'Reactions & Energy',
    color: '#b3462f', difficulty: 5, type: 'sequence', defaultLeader: 'brandt', budget: 86,
    desc: 'Stoichiometry, calorimetry and kinetics — how much can react, how much heat, and how fast.',
    milestones: milestones(
      'Balance the reaction and find what limits it',
      'Separate stored heat from ongoing reaction',
      'Connect rate and activation energy to thermal feedback',
      'State the condition under which the vessel is safe'),
    issuePool: [
      'A confined space is being entered before the gas production estimate exists.',
      'The zone is still warming and nobody has separated stored heat from reaction.',
      'The rate was measured at room temperature and applied to a warm vessel.',
    ],
  },
  {
    id: 'TREAT', code: 'TREAT', name: 'Treatment & Infrastructure',
    color: '#4a5b6e', difficulty: 4, type: 'sciencetank', defaultLeader: 'osei', budget: 82,
    desc: 'Corrosion, treatment trains, byproducts and the long tail — fixing it without making it worse.',
    milestones: milestones(
      'Identify the redox couples attacking the pipeline',
      'Compare treatments by their complete consequences',
      'Account for what the treatment moved rather than destroyed',
      'Close the campaign with a monitoring and stewardship plan'),
    issuePool: [
      'A treatment lowers the target contaminant and creates a byproduct nobody measures.',
      'The contaminant was moved into sludge and the sludge has no destination.',
      'A small leak is being patched without breaking the galvanic circuit.',
    ],
  },
];
