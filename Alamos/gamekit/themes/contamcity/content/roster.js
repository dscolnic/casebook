// roster.js — the people of the Riverton response.
//
// The design book does not name characters; it names *functions*, and says they
// should disagree because they own different evidence and constraints, not
// because one of them is foolish. Every person here is one of those four:
//
//   expert       what this instrument can measure, and what it cannot
//   reviewer     the live alternative explanation, or the shared failure mode
//   operations   the time, money, safety or capacity constraint
//   stakeholder  makes the consequence visible without deciding the science
//
// Everyone is fictional. The scenario is fictional. Nothing here is an
// operational procedure for handling real hazardous material.
//
// `division` ties a person to a group id from content/groups.js, so a mission
// stop can name them and the validator can check they actually spawn.

/** Area leads. One per group; `defaultLeader` in groups.js points at these ids. */
export const LEADERS = [
  { id: 'okonjo',   name: 'Adaeze Okonjo',   role: 'Analytical chemist, Molecular Identification', science: 5, management: 3,
    trait: 'Will not name a compound until two methods with different failure modes agree.' },
  { id: 'varga',    name: 'Miklós Varga',    role: 'Atmospheric chemist, Air & Plume',            science: 5, management: 3,
    trait: 'Treats every dispersion model as a scale estimate until measurements arrive.' },
  { id: 'ferreira', name: 'Inês Ferreira',   role: 'Aquatic chemist, Water & Sediment',           science: 5, management: 4,
    trait: 'Asks where the contaminant went, never whether it disappeared.' },
  { id: 'nakamura', name: 'Rie Nakamura',    role: 'Metrologist, Quality Assurance',              science: 4, management: 5,
    trait: 'Puts a blank, a calibration and an uncertainty behind every number she signs.' },
  { id: 'brandt',   name: 'Tomas Brandt',    role: 'Process chemist, Reactions & Energy',         science: 5, management: 3,
    trait: 'Reasons in energy and rate together; a slow reaction in a warm vessel worries him.' },
  { id: 'osei',     name: 'Kwabena Osei',    role: 'Treatment engineer, Water Works',             science: 4, management: 5,
    trait: 'Judges a treatment by what it creates and moves, not only by what it removes.' },
];

/**
 * Face parameters for the 2-D avatar the question panel draws. `coat` follows
 * the area colour so a speaker is placeable at a glance.
 */
export const AVATARS = {
  okonjo:   { skin: '#8a5a3b', hair: '#1d1512', glasses: true,  brow: '#1d1512', coat: '#7a4fa3', tie: '#d8d3c8', hairStyle: 'braids' },
  varga:    { skin: '#e8c39c', hair: '#6b6b6b', glasses: true,  brow: '#5e5e5e', coat: '#2f7fa8', tie: '#d8d3c8', hairStyle: 'side' },
  ferreira: { skin: '#d6a578', hair: '#3a2a1c', glasses: false, brow: '#3a2a1c', coat: '#1f7a6b', tie: '#d8d3c8', hairStyle: 'wave' },
  nakamura: { skin: '#efd2b0', hair: '#191418', glasses: true,  brow: '#191418', coat: '#b0762a', tie: '#d8d3c8', hairStyle: 'short' },
  brandt:   { skin: '#f0cfae', hair: '#8a7a5a', glasses: false, brow: '#7a6a4a', coat: '#b3462f', tie: '#d8d3c8', hairStyle: 'short' },
  osei:     { skin: '#6f4326', hair: '#141013', glasses: false, brow: '#141013', coat: '#4a5b6e', tie: '#d8d3c8', hairStyle: 'short' },
};

const bio = (...paras) => paras.map(p => `<p>${p}</p>`).join('');

export const ROSTER = [
  // ---------------------------------------------------------------- leads
  { id: 'okonjo', name: 'Adaeze Okonjo', role: 'Analytical Chemistry Lead', division: 'IDENT', color: '#7a4fa3',
    fn: 'expert',
    bio: bio(
      'Runs the Molecular Identification Lab. Her working rule is that a name is a claim, and a claim needs evidence that could have come out differently.',
      'She will give you a provisional identity within the hour and refuse to call it confirmed until a method with a different failure mode agrees.') },
  { id: 'varga', name: 'Miklós Varga', role: 'Atmospheric Chemistry Lead', division: 'GASES', color: '#2f7fa8',
    fn: 'expert',
    bio: bio(
      'Runs the Mobile Weather Station and the Gas Properties Lab. He is comfortable with an order-of-magnitude answer and hostile to a precise one built on the wrong model.',
      'Ask him for a plume forecast and he will first tell you which part of it is thermodynamics and which part is weather.') },
  { id: 'ferreira', name: 'Inês Ferreira', role: 'Water & Sediment Lead', division: 'WATER', color: '#1f7a6b',
    fn: 'expert',
    bio: bio(
      'Samples the river, the reservoir and the sediment beneath both. She has seen too many campaigns declare success when a contaminant simply changed phase.',
      'Her sampling plans are designed so that a comforting result and a real improvement cannot be confused.') },
  { id: 'nakamura', name: 'Rie Nakamura', role: 'Quality Assurance Lead', division: 'QUANT', color: '#b0762a',
    fn: 'reviewer',
    bio: bio(
      'Holds the Quality Assurance Desk, which means she is the person who says a number is not yet a result.',
      'She writes the decision rule before the measurement arrives, so that nobody gets to choose the rule after seeing the answer.') },
  { id: 'brandt', name: 'Tomas Brandt', role: 'Reactions & Energy Lead', division: 'ENERGY', color: '#b3462f',
    fn: 'expert',
    bio: bio(
      'Covers stoichiometry, calorimetry and kinetics — what can react, how much heat it releases, and how fast that changes as the vessel warms.',
      'He is the reason nobody enters a confined space in this response before a gas-production estimate exists.') },
  { id: 'osei', name: 'Kwabena Osei', role: 'Treatment Engineering Lead', division: 'TREAT', color: '#4a5b6e',
    fn: 'operations',
    bio: bio(
      'Runs the pilot treatment plant and the pipeline. He can lower almost any number you name; his job is telling you what that costs elsewhere.',
      'Every option he offers comes with the byproduct, the sludge and the destination attached.') },

  // ------------------------------------------------------------ reviewers
  { id: 'haddad', name: 'Yusra Haddad', role: 'Independent Reviewer', division: 'IDENT', color: '#8f6ab5',
    fn: 'reviewer',
    bio: bio('Sits on the Independent Review Board. Her standing question is which two pieces of the evidence would fail together.') },
  { id: 'lindqvist', name: 'Erik Lindqvist', role: 'Dispersion Modeller', division: 'GASES', color: '#4f97bd',
    fn: 'reviewer',
    bio: bio('Builds the plume models and is the first to say where they stop being trustworthy.') },
  { id: 'ibarra', name: 'Camila Ibarra', role: 'Sediment Analyst', division: 'WATER', color: '#3d9384',
    fn: 'expert',
    bio: bio('Works the sediment cores. She is usually the one who finds the contaminant that the water samples say has gone.') },
  { id: 'whitfield', name: 'Dana Whitfield', role: 'Calibration Technician', division: 'QUANT', color: '#c48f45',
    fn: 'expert',
    bio: bio('Keeps the calibration curves, the blanks and the reference samples. Nothing leaves the bench without all three.') },
  { id: 'moreau', name: 'Léa Moreau', role: 'Kinetics Researcher', division: 'ENERGY', color: '#c76149',
    fn: 'reviewer',
    bio: bio('Measures rates and activation energies, and objects loudly when a room-temperature rate is applied to a warm vessel.') },
  { id: 'delgado', name: 'Rafael Delgado', role: 'Byproduct Analyst', division: 'TREAT', color: '#65788c',
    fn: 'reviewer',
    bio: bio('Analyses what each treatment produces. He has stopped two treatment trains that would have worked exactly as advertised.') },

  // ----------------------------------------------------------- operations
  { id: 'boateng', name: 'Grace Boateng', role: 'Incident Commander', division: 'TREAT', color: '#2c3e50',
    fn: 'operations',
    bio: bio(
      'Commands the response from City Command. She holds the time, the money and the authority to close or reopen the water system.',
      'She does not need certainty. She needs to know what you know, what you do not, and which of the two is about to change.') },
  { id: 'sorensen', name: 'Nils Sørensen', role: 'Fire Command', division: 'ENERGY', color: '#a04a35',
    fn: 'operations',
    bio: bio('Runs the fire ground. The storage zone is his problem until somebody proves the heat is stored rather than generated.') },
  { id: 'reyes', name: 'Marisol Reyes', role: 'Water Utility Director', division: 'WATER', color: '#2f8878',
    fn: 'operations',
    bio: bio('Responsible for the drinking-water system. Every hour the intake stays closed is an hour the city is on reserves.') },
  { id: 'oyelaran', name: 'Femi Oyelaran', role: 'Confined-Space Safety Officer', division: 'ENERGY', color: '#b5573f',
    fn: 'operations',
    bio: bio('Controls entry to the tunnel and the sewer heads. He will not sign an entry permit against a qualitative argument.') },
  { id: 'novak', name: 'Petra Novák', role: 'Pipeline Maintenance Chief', division: 'TREAT', color: '#586b80',
    fn: 'operations',
    bio: bio('Keeps the intake pipeline running. She would rather break the galvanic circuit once than patch the same leak four times.') },
  { id: 'kaur', name: 'Simran Kaur', role: 'Evacuation Coordinator', division: 'GASES', color: '#3d88ae',
    fn: 'operations',
    bio: bio('Draws and redraws the downwind corridor. She needs the update the moment the wind turns, not when the model finishes.') },

  // ---------------------------------------------------------- stakeholders
  { id: 'delacroix', name: 'Yvette Delacroix', role: 'Neighbourhood Health Desk', division: 'GASES', color: '#5fa3c4',
    fn: 'stakeholder',
    bio: bio('Fields the calls from the two neighbourhoods under the plume. She translates what the team knows into what people should do today.') },
  { id: 'tanaka', name: 'Hiroshi Tanaka', role: 'Records & Shipping Clerk', division: 'IDENT', color: '#9d7cbe',
    fn: 'expert',
    bio: bio('Holds the manifests, the lot numbers and the chain-of-custody records — the evidence that exists before any instrument is switched on.') },
  { id: 'abara', name: 'Chidi Abara', role: 'Riverfront Resident Association', division: 'WATER', color: '#4c9c8d',
    fn: 'stakeholder',
    bio: bio('Speaks for the households along the riverfront. He wants to know what was released, where it went, and what is still in the mud.') },
  { id: 'stavros', name: 'Elena Stavros', role: 'Long-Term Monitoring Officer', division: 'TREAT', color: '#71849a',
    fn: 'operations',
    bio: bio('Plans what gets measured after the cameras leave. Her programme is the only part of this response that outlives the emergency.') },
  { id: 'mbeki', name: 'Sipho Mbeki', role: 'Public Briefing Officer', division: 'QUANT', color: '#c9a05f',
    fn: 'stakeholder',
    bio: bio('Briefs the city. He needs the uncertainty stated plainly enough that it survives being repeated.') },
  { id: 'kowalski', name: 'Ana Kowalski', role: 'Reference Library & Standards', division: 'IDENT', color: '#a98ac6',
    fn: 'expert',
    bio: bio('Keeps the spectral libraries and reference standards, and knows which of them everyone in the building is quietly depending on.') },
];
