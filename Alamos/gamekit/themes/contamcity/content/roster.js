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
//
// ## Bios are teaching passages
//
// Each bio is three paragraphs and each one does a different job: who this
// person is and what they operate, the piece of chemistry or instrumentation
// that makes their work possible, and the limit or failure mode they carry
// around. That last paragraph is the point — a technique is only understood
// once you know where it stops being trustworthy.
//
// ## `quiz` — what the player is asked
//
// `quiz: [{ q, a, wrong: [three] }]`. These are comprehension questions about
// the passage, not sentence recognition: the wrong answers are wrong about the
// *same subject*, so a player who skimmed cannot eliminate them by noticing
// they belong to somebody else. `engine/core/personQuiz.js` picks one
// deterministically per person and falls back to a generated question if this
// array is missing or malformed.

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
      'Runs the Molecular Identification Lab, which is two instruments and a rule. The instruments are a gas chromatograph coupled to a mass spectrometer, and an infrared spectrometer. The rule is that a name is a claim, and a claim needs evidence that could have come out differently.',
      'The chromatograph separates a mixture in time: the sample is vaporised, swept down a long coated column by helium, and each compound arrives at the far end at its own retention time depending on how strongly it sticks to the coating. The mass spectrometer then smashes whatever arrives into charged fragments and weighs them, so every compound leaves a fragment pattern as specific as a fingerprint.',
      'Her limit is the library. A match is a comparison against a catalogue of patterns somebody else recorded, and two compounds from the same chemical family can fragment almost identically. So she gives you a provisional identity within the hour and refuses to call it confirmed until a method with a different failure mode — infrared, which reads bonds rather than mass — agrees with it.'),
    quiz: [
      { q: 'In Okonjo’s lab, what does the gas chromatograph actually do to a mixture before the mass spectrometer sees it?',
        a: 'Separates the compounds in time, because each one sticks to the column coating differently',
        wrong: [
          'Breaks the compounds into charged fragments and weighs each one',
          'Concentrates the sample by boiling away the water',
          'Reads which chemical bonds are present by how they absorb infrared light',
        ] },
      { q: 'Why will Okonjo not call an identification confirmed on the mass spectrum alone?',
        a: 'A library match is a comparison, and related compounds can fragment almost identically',
        wrong: [
          'The mass spectrometer cannot detect compounds below one part per million',
          'Mass spectra change with the weather at the sampling site',
          'Any result needs a second run on the same instrument the following day',
        ] },
    ] },
  { id: 'varga', name: 'Miklós Varga', role: 'Atmospheric Chemistry Lead', division: 'GASES', color: '#2f7fa8',
    fn: 'expert',
    bio: bio(
      'Runs the Mobile Weather Station and the Gas Properties Lab. He is comfortable with an order-of-magnitude answer and openly hostile to a precise one built on the wrong model.',
      'Two things decide where a released gas goes, and he insists on keeping them separate. The first is the gas itself: molar mass sets its density against air, so a vapour heavier than air pools in basements and trench bottoms while a lighter one lifts and dilutes. The second is the atmosphere: wind speed, wind direction, and how much the air is mixing vertically. A hot afternoon churns a plume into harmless dilution; a cold, still night lays it along the ground for a kilometre.',
      'He gives the ratio of molar masses as the fastest useful calculation on site — a vapour twice the molar mass of air stays low. What he refuses to do is treat any of it as more than a scale estimate. Ask him for a plume forecast and he will tell you which part of the answer is thermodynamics, which part is weather, and which part is going to change when the wind turns.'),
    quiz: [
      { q: 'By Varga’s reasoning, what makes a released vapour pool in basements and trenches instead of lifting away?',
        a: 'Its molar mass is well above that of air, so it is denser than the air around it',
        wrong: [
          'It is warmer than the surrounding air when it leaves the container',
          'It dissolves readily in water, so it is drawn downwards towards damp ground',
          'It has a low boiling point, so it condenses at ground level',
        ] },
    ] },
  { id: 'ferreira', name: 'Inês Ferreira', role: 'Water & Sediment Lead', division: 'WATER', color: '#1f7a6b',
    fn: 'expert',
    bio: bio(
      'Samples the river, the reservoir and the sediment beneath both. She has watched too many campaigns declare success when a contaminant simply changed phase.',
      'Her working idea is partitioning: a compound entering a river distributes itself between water, suspended particles, sediment and air, and the split is a property of the compound, not a matter of luck. Something greasy and poorly soluble binds to the organic carbon in sediment and effectively leaves the water column; something volatile crosses into the air; something soluble and polar travels downstream at very nearly the speed of the water.',
      'Which is why a clean water sample means only that the water is clean. Her sampling plans always pair the water with a sediment core and a measurement of flow, so that a comforting result and a real improvement cannot be confused — and so that nobody reports a disappearance when what happened was a relocation into the mud.'),
    quiz: [
      { q: 'Ferreira takes a sediment core alongside every water sample. What is the reasoning?',
        a: 'A poorly soluble compound binds to sediment, so the water can read clean while the contaminant is still there',
        wrong: [
          'Sediment samples are cheaper to analyse than water samples',
          'Sediment holds a record of the river temperature over the previous week',
          'Water samples cannot be collected until the sediment has been cleared away',
        ] },
    ] },
  { id: 'nakamura', name: 'Rie Nakamura', role: 'Quality Assurance Lead', division: 'QUANT', color: '#b0762a',
    fn: 'reviewer',
    bio: bio(
      'Holds the Quality Assurance Desk, which in practice means she is the person who tells you a number is not yet a result.',
      'Three things travel with every measurement she signs. A blank — clean solvent run through the whole procedure, to prove the instrument is not reporting its own contamination. A calibration curve — known concentrations measured to establish what a given signal means, valid only across the range actually calibrated. And an uncertainty, because an instrument reading of 4.7 with a spread of ±2 and a limit of 5 tells you nothing at all about whether you are over the limit.',
      'Her other rule is procedural rather than chemical: the decision rule gets written before the measurement arrives. Choose the threshold after seeing the answer and you have not run a test, you have run an argument, and everybody in the room already knows which way they want it to come out.'),
    quiz: [
      { q: 'Why does Nakamura insist the decision rule be written before the measurement comes back?',
        a: 'Choosing the threshold after seeing the result lets the answer decide the test',
        wrong: [
          'Calibration curves expire within a few hours of being recorded',
          'The instrument software will not release a result without a threshold entered',
          'It is the only way to keep the analysis from taking more than one shift',
        ] },
      { q: 'What is the blank sample for?',
        a: 'Clean solvent run through the whole procedure, to show the instrument is not reporting its own contamination',
        wrong: [
          'A sample from upstream of the release, to establish the river’s normal level',
          'A known concentration used to convert the signal into a number',
          'A duplicate of the real sample, run to check the analyst repeats themselves',
        ] },
    ] },
  { id: 'brandt', name: 'Tomas Brandt', role: 'Reactions & Energy Lead', division: 'ENERGY', color: '#b3462f',
    fn: 'expert',
    bio: bio(
      'Covers the three questions that decide whether a drum is a storage problem or an emergency: what can react, how much heat that releases, and how fast the rate changes as the vessel warms.',
      'Stoichiometry sets the ceiling — the amount of the limiting reactant fixes how much product and how much gas can possibly be produced, and no amount of time changes that number. Calorimetry sets the size of the release, measured as energy per mole. Kinetics sets the timescale, and it is the one people underestimate: reaction rate climbs steeply with temperature, so a reaction that releases heat faster than the vessel can shed it accelerates itself. That feedback loop is what a runaway is.',
      'He is therefore the reason nobody in this response enters a confined space before a gas-production estimate exists. A slow reaction in a cool drum and the same reaction in a drum standing in afternoon sun are not the same event, and only one of them is safe to stand next to.'),
    quiz: [
      { q: 'In Brandt’s account, what makes a reaction run away?',
        a: 'It releases heat faster than the vessel loses it, and the higher temperature speeds the reaction further',
        wrong: [
          'It runs out of the limiting reactant, so the remaining reactant reacts all at once',
          'The gas produced cools the vessel until the contents freeze and fracture it',
          'Two products form at once and compete for the same starting material',
        ] },
      { q: 'What does a stoichiometric calculation tell Brandt that a rate measurement cannot?',
        a: 'The maximum gas that could ever be produced, fixed by the limiting reactant',
        wrong: [
          'How quickly pressure will build inside the drum',
          'How hot the drum will become in afternoon sun',
          'Whether the reaction releases or absorbs heat',
        ] },
    ] },
  { id: 'osei', name: 'Kwabena Osei', role: 'Treatment Engineering Lead', division: 'TREAT', color: '#4a5b6e',
    fn: 'operations',
    bio: bio(
      'Runs the pilot treatment plant and the intake pipeline. He can lower almost any number you name; the useful half of his job is telling you what that costs somewhere else.',
      'He works with three tools and each one moves the contaminant rather than destroying it. Activated carbon adsorbs organics onto an enormous internal surface area — the compound is now in the carbon bed, which becomes hazardous waste with a destination. Air stripping blows the volatile fraction out of the water and into the air, which is a genuine improvement only if the air is somewhere no one is standing. Chemical oxidation actually breaks bonds, but partially oxidised fragments are products too, and some are worse than what you started with.',
      'So every option he offers arrives with the byproduct, the sludge and the destination attached. A treatment train that removes ninety-nine per cent of a contaminant and puts the rest through a neighbourhood’s air is not a success; it is a transfer, and he wants it named as one.'),
    quiz: [
      { q: 'Why does Osei describe activated carbon and air stripping as moving a contaminant rather than removing it?',
        a: 'Neither breaks the compound down — it ends up in a carbon bed or in the air',
        wrong: [
          'Both work only on the fraction already bound to sediment',
          'Both return the compound to the river a few kilometres downstream',
          'Neither can reach more than half of what is present in the water',
        ] },
      { q: 'What is Osei’s objection to chemical oxidation, even though it genuinely breaks bonds?',
        a: 'Partial oxidation leaves fragments, and some are worse than the original compound',
        wrong: [
          'It reaches only the fraction of the contaminant that is already volatile',
          'It requires heating the whole stream far above ambient temperature to run',
          'It cannot be run at the scale a city drinking-water system needs',
        ] },
    ] },

  // ------------------------------------------------------------ reviewers
  { id: 'haddad', name: 'Yusra Haddad', role: 'Independent Reviewer', division: 'IDENT', color: '#8f6ab5',
    fn: 'reviewer',
    bio: bio(
      'Sits on the Independent Review Board, which exists to ask the question the people who did the work are least able to ask themselves.',
      'Her standing question is not whether a conclusion is wrong but which two pieces of the evidence would fail together. Independent confirmation only counts if the confirming method can fail differently: two instruments sharing one calibration standard, or one sampling technician, or one library, are one measurement wearing two coats. She calls that a common-mode failure and treats it as the default until somebody shows her otherwise.',
      'She is not a sceptic for sport. Her review is a list of what would have to be true for the team to be wrong, ranked by how cheaply each item could be checked — and cheap checks that nobody has run are the ones that keep her at the table past midnight.'),
    quiz: [
      { q: 'What does Haddad mean by a common-mode failure?',
        a: 'Two apparently independent results share a step — a standard, a sampler, a library — so they fail together',
        wrong: [
          'Two instruments disagree and there is no way to decide between them',
          'A result that cannot be repeated by a second laboratory',
          'A failure that happens in the most common instrument in the building',
        ] },
    ] },
  { id: 'lindqvist', name: 'Erik Lindqvist', role: 'Dispersion Modeller', division: 'GASES', color: '#4f97bd',
    fn: 'reviewer',
    bio: bio(
      'Builds the plume models and is reliably the first person in the room to say where they stop being trustworthy.',
      'A dispersion model takes a release rate, a wind speed, a wind direction and a stability class, and returns a concentration at a distance. It works because turbulent mixing spreads a plume in a way that is statistically predictable: concentration falls with distance from the centreline in a roughly bell-shaped profile, and the whole plume dilutes as it travels. Double the wind speed and you roughly halve the concentration, because the same mass is spread through twice the air.',
      'The assumptions are where it breaks. Flat ground, steady wind, a release rate somebody had to estimate. Riverton has a valley, an afternoon wind shift and a release rate nobody measured, so he reports his output as a shape and an order of magnitude and gets genuinely angry when it is quoted to three significant figures.'),
    quiz: [
      { q: 'In Lindqvist’s model, what happens to the downwind concentration if the wind speed doubles?',
        a: 'It roughly halves, because the same released mass is spread through twice as much air',
        wrong: [
          'It roughly doubles, because the plume reaches further before it dilutes',
          'It is unchanged, because wind moves the plume without diluting it',
          'It falls to near zero, because a fast wind lifts the plume clear of the ground',
        ] },
      { q: 'Which assumption does Lindqvist say Riverton breaks worst?',
        a: 'Flat ground and a steady wind — the town sits in a valley with an afternoon wind shift',
        wrong: [
          'That the released compound is heavier than air',
          'That the plume is sampled at ground level rather than from a mast',
          'That the compound does not react with anything in the atmosphere',
        ] },
    ] },
  { id: 'ibarra', name: 'Camila Ibarra', role: 'Sediment Analyst', division: 'WATER', color: '#3d9384',
    fn: 'expert',
    bio: bio(
      'Works the sediment cores, and is usually the one who finds the contaminant the water samples say has gone.',
      'A core is a vertical slice of recent history: material settles in layers, so depth is roughly time, and a contaminant band sitting twelve centimetres down was deposited before one sitting at two. To measure it she has to get the compound out of the solid first — solvent extraction, then a cleanup step to strip the natural organic matter that would otherwise swamp the instrument. She reports on dry weight, because a wet core is mostly water and the fraction varies from sample to sample.',
      'The number she cares most about is the organic carbon content of the sediment, since that is what greasy compounds bind to. Two cores from the same river with different organic carbon will hold very different amounts of the same contaminant, and comparing them without that correction produces a hotspot that does not exist.'),
    quiz: [
      { q: 'Why does Ibarra report sediment concentrations on a dry-weight basis?',
        a: 'A wet core is largely water and the water fraction varies between samples, so wet weights are not comparable',
        wrong: [
          'Drying the sample destroys the contaminant, so the dry weight is the safe measurement',
          'The extraction solvent only works on completely dry material',
          'Regulations are written for dry sediment and wet sediment cannot be sampled',
        ] },
    ] },
  { id: 'whitfield', name: 'Dana Whitfield', role: 'Calibration Technician', division: 'QUANT', color: '#c48f45',
    fn: 'expert',
    bio: bio(
      'Keeps the calibration curves, the blanks and the reference samples, and nothing leaves the bench without all three.',
      'A calibration curve is built by measuring standards of known concentration and plotting signal against concentration. The line it produces is the only thing that turns an instrument response into a number — and it is honest only inside the range that was actually measured. Reading a sample that lands above the top standard means extrapolating into a region where the detector may already be saturating and the response is no longer a straight line.',
      'Her other daily enemy is drift. Detectors change through a run as the source ages and the column fouls, so she brackets a batch with standards at the start and the end, and reruns the batch when the two disagree by more than the tolerance. Diluting an over-range sample back into the calibrated range is the boring correct answer, and she will send the sample back for it.'),
    quiz: [
      { q: 'A sample reads above Whitfield’s highest standard. What does she do about it?',
        a: 'Dilute the sample back into the calibrated range and rerun it',
        wrong: [
          'Extend the calibration line upward and read the value off the extension',
          'Report the value with a wider uncertainty attached',
          'Report it as the value of the highest standard',
        ] },
    ] },
  { id: 'moreau', name: 'Léa Moreau', role: 'Kinetics Researcher', division: 'ENERGY', color: '#c76149',
    fn: 'reviewer',
    bio: bio(
      'Measures rates and activation energies, and objects loudly whenever a room-temperature rate is applied to a warm vessel.',
      'Activation energy is the barrier a reaction has to climb before it happens at all, and it is what makes rate depend so sharply on temperature. Only the fraction of molecules carrying enough energy can react, and that fraction grows exponentially as the temperature rises. For many reactions the practical result is a rough doubling of rate for every ten degrees — which over a thirty-degree difference between a shaded morning drum and one in afternoon sun is close to a factor of eight.',
      'She works this out from measurements at several temperatures rather than by trusting a textbook figure, because a catalyst, a trace of metal from a corroded wall, or a different solvent lowers the barrier and changes the answer. Her results are the input to every safe-standoff and safe-timing decision the response makes.'),
    quiz: [
      { q: 'Roughly what does Moreau expect a thirty-degree rise in temperature to do to a reaction rate?',
        a: 'Multiply it by around eight — a rough doubling for every ten degrees',
        wrong: [
          'Triple it — the rate rises in direct proportion to the temperature',
          'Leave it alone — temperature changes yield, not rate',
          'Roughly halve it, because warmer solutions hold less dissolved reactant',
        ] },
      { q: 'Why does Moreau measure activation energy herself rather than take a published value?',
        a: 'A catalyst, corrosion metal or a different solvent can lower the barrier and change the rate',
        wrong: [
          'Published values are reported in the wrong units for field use',
          'Activation energy changes as a drum ages regardless of its contents',
          'The published values assume a vessel far larger than a drum',
        ] },
    ] },
  { id: 'delgado', name: 'Rafael Delgado', role: 'Byproduct Analyst', division: 'TREAT', color: '#65788c',
    fn: 'reviewer',
    bio: bio(
      'Analyses what each treatment produces, and has stopped two treatment trains that would have worked exactly as advertised.',
      'His subject is what a reaction makes on the way to finishing. Oxidation that does not run to completion leaves partially oxidised fragments; chlorination of water carrying natural organic matter forms disinfection byproducts that were never in the river; a change of pH to precipitate one metal can redissolve another that was sitting quietly in the sediment. Every one of these is chemistry doing exactly what it should, producing something nobody asked for.',
      'So he insists on measuring the treated stream for compounds that were not in the untreated one, which is harder than it sounds — an instrument set up to find the target compound is not looking for the fragments. It is the single most-skipped step in a fast response, and the one that turns up in the report six months later.'),
    quiz: [
      { q: 'Why is it hard to catch the byproducts Delgado worries about?',
        a: 'The instrument is set up to look for the target compound, not for fragments nobody predicted',
        wrong: [
          'Byproducts break down before a sample can reach the laboratory',
          'They are present at concentrations no instrument can reach',
          'They only form once the treated water has entered the distribution system',
        ] },
    ] },

  // ----------------------------------------------------------- operations
  { id: 'boateng', name: 'Grace Boateng', role: 'Incident Commander', division: 'TREAT', color: '#2c3e50',
    fn: 'operations',
    bio: bio(
      'Commands the response from City Command. She holds the time, the money and the authority to close or reopen the water system, and she is the only person here whose decisions cannot be deferred.',
      'She works in a currency the laboratory does not use: every hour of analysis is an hour the intake stays shut, and closing a city’s drinking-water intake has its own casualties — dialysis clinics, a hospital, twelve thousand households on bottled supply. So she needs each finding costed as well as stated. Provisional identification in one hour and confirmation in six is a real choice; certainty at an unspecified time is not a choice at all.',
      'What she asks for is therefore never certainty. It is what you know, what you do not, and which of the two is about to change — and she would rather have a number with an honest uncertainty attached in twenty minutes than a clean number after lunch.'),
    quiz: [
      { q: 'What does Boateng actually want from the laboratory?',
        a: 'What is known, what is not, and which of the two is about to change',
        wrong: [
          'A confirmed compound identification before any decision is taken',
          'A single recommended action with the reasoning left out',
          'The most conservative estimate available, always',
        ] },
    ] },
  { id: 'sorensen', name: 'Nils Sørensen', role: 'Fire Command', division: 'ENERGY', color: '#a04a35',
    fn: 'operations',
    bio: bio(
      'Runs the fire ground. The storage zone is his problem until somebody proves the heat there is stored rather than generated.',
      'That distinction decides his whole approach. A drum warmed by the sun is holding heat and will cool overnight. A drum warmed by a reaction inside it is making heat, and it will be hotter in an hour than it is now — the thermal image looks similar and the two situations demand opposite tactics. He also needs to know whether water is safe on this material at all, since some compounds react with it, and whether the vapour above the drums sits inside its flammable range.',
      'His crews work on the assumption that the drum they cannot measure is the one that matters, and he will stage them further back than the chemistry strictly requires until the trend in temperature, not the temperature itself, has been established.'),
    quiz: [
      { q: 'Why does Sørensen care whether heat in a drum is stored or generated?',
        a: 'Stored heat fades overnight; generated heat means the drum will be hotter in an hour',
        wrong: [
          'Stored heat spreads to neighbouring drums and generated heat does not',
          'Only generated heat can be seen on a thermal image',
          'Generated heat means the drum is already empty',
        ] },
    ] },
  { id: 'reyes', name: 'Marisol Reyes', role: 'Water Utility Director', division: 'WATER', color: '#2f8878',
    fn: 'operations',
    bio: bio(
      'Responsible for the drinking-water system: intake, reservoir, treatment works and every kilometre of pipe past it. Each hour the intake stays closed is an hour the city runs on reserves.',
      'Her system has a clock built into it. The reservoir holds a certain volume and the city draws a certain rate, so residence time — volume divided by flow — sets how long a slug of contaminated water takes to pass through, and how much it is diluted on the way. The same arithmetic works against her once contaminated water is past the intake: a pulse that enters the distribution network cannot be recalled, only flushed, and flushing a network takes days and puts the water somewhere.',
      'So her decisive question is never just concentration. It is concentration, arriving when, for how long, and against a reserve measured in hours — and she wants the arrival window before she wants the compound’s name.'),
    quiz: [
      { q: 'How does Reyes work out how long a contaminated slug takes to move through the reservoir?',
        a: 'Residence time — the reservoir volume divided by the flow through it',
        wrong: [
          'The river’s surface speed measured at the intake',
          'The time the contaminant takes to bind to sediment',
          'The rate at which the treatment works can process water',
        ] },
    ] },
  { id: 'oyelaran', name: 'Femi Oyelaran', role: 'Confined-Space Safety Officer', division: 'ENERGY', color: '#b5573f',
    fn: 'operations',
    bio: bio(
      'Controls entry to the tunnel and the sewer heads, and will not sign an entry permit against a qualitative argument.',
      'A confined space kills in ways that have nothing to do with toxicity. A gas that is chemically harmless still displaces air, and an atmosphere below about nineteen and a half per cent oxygen takes people down without warning or smell. So his meter reads four things before anyone descends: oxygen, flammable vapour as a percentage of the lower explosive limit, carbon monoxide and hydrogen sulfide — and it reads them at three depths, because the dense vapours he fears are lying at the bottom.',
      'What he needs from the chemists is a number: how much gas the reaction can produce, and how fast, against the ventilation rate he can actually deliver. "Probably fine" is not an input to that calculation, and he has turned down people far senior to him for offering it.'),
    quiz: [
      { q: 'Why does Oyelaran test at three depths rather than at the entry hatch?',
        a: 'Dense vapours settle, so the bottom of the space can be lethal while the hatch reads clean',
        wrong: [
          'The meter needs three readings to average out its own drift',
          'Oxygen is consumed fastest near the entrance where the air is moving',
          'Regulations require one reading for each worker entering',
        ] },
      { q: 'Oyelaran treats a chemically harmless gas as dangerous in a confined space. Why?',
        a: 'It displaces air, and an atmosphere low in oxygen brings people down without warning',
        wrong: [
          'It condenses on the walls and makes the ladder unsafe',
          'It interferes with the meter’s reading of the toxic gases',
          'It reacts with the sewer contents to form something toxic',
        ] },
    ] },
  { id: 'novak', name: 'Petra Novák', role: 'Pipeline Maintenance Chief', division: 'TREAT', color: '#586b80',
    fn: 'operations',
    bio: bio(
      'Keeps the intake pipeline running, and would rather break a galvanic circuit once than patch the same leak four times.',
      'Her recurring problem is electrochemical. Where two different metals are in contact in water, the more reactive one corrodes preferentially — the water completes the circuit and the pipeline becomes a slow battery discharging itself at the joint. That is why her failures cluster at fittings where somebody replaced a length of one metal with another, and why the repair that lasts is either a matched metal or an insulating break, not a thicker patch.',
      'The other half of her job is that corrosion products are chemistry too. Metal leaving a pipe wall arrives somewhere, and a pipeline shedding its lining into the raw-water main is a contamination source that no one upstream released and everyone downstream measures.'),
    quiz: [
      { q: 'Why do Novák’s leaks keep appearing at joints between two different metals?',
        a: 'In water the more reactive metal corrodes preferentially, with the water completing the circuit',
        wrong: [
          'Joints are thinner than the pipe wall, so they wear through first',
          'Different metals expand at different rates and crack the seal',
          'Sediment collects at joints and grinds away the lining',
        ] },
    ] },
  { id: 'kaur', name: 'Simran Kaur', role: 'Evacuation Coordinator', division: 'GASES', color: '#3d88ae',
    fn: 'operations',
    bio: bio(
      'Draws and redraws the downwind corridor, and needs the update the moment the wind turns rather than when the model finishes.',
      'Her corridor is a wedge, not a circle, because a plume travels with the wind: the hazard is narrow and long, and the ground a hundred metres crosswind can be entirely clear while a street eight hundred metres downwind is not. A wind shift does not slide that wedge gently — it repoints it, and the people who were safe by geometry a minute ago are now inside it while the previously evacuated street is fine.',
      'This is also why her advice is sometimes to stay indoors with the windows shut rather than to leave. Moving a thousand people through a corridor takes longer than a passing plume lasts, and putting them on the street during those minutes exposes exactly the people the evacuation was meant to protect.'),
    quiz: [
      { q: 'Why is Kaur’s evacuation zone a wedge rather than a circle around the release?',
        a: 'The plume travels with the wind, so the hazard is long and narrow, not even all round',
        wrong: [
          'A wedge is simply easier to describe over the radio than a circle is',
          'Circles are used for fires; a chemical release always takes a wedge',
          'The wedge marks the ground the fire crews need kept clear of people',
        ] },
      { q: 'Why does Kaur sometimes tell people to shelter indoors instead of evacuating?',
        a: 'Moving people takes longer than the plume lasts, and puts them out in the worst minutes',
        wrong: [
          'Most buildings filter the outdoor air through their ventilation systems',
          'The evacuation routes have to be kept clear for emergency vehicles',
          'A plume cannot reach above the ground floor of an occupied building',
        ] },
    ] },

  // ---------------------------------------------------------- stakeholders
  { id: 'delacroix', name: 'Yvette Delacroix', role: 'Neighbourhood Health Desk', division: 'GASES', color: '#5fa3c4',
    fn: 'stakeholder',
    bio: bio(
      'Fields the calls from the two neighbourhoods under the plume, and translates what the team knows into what people should actually do today.',
      'Most of her day is spent on a distinction the callers have not been given: smell is not the same as harm. Some compounds are detectable by the human nose at concentrations thousands of times below any level of concern, so a strong smell can be a nuisance; others are almost odourless well past the point where they are dangerous, so the absence of a smell proves nothing. She also has to hold apart concentration and dose — how much is in the air, against how much a person actually took in over how long.',
      'She will not repeat a number without its unit and its meaning attached, because a figure released without either comes back an hour later as a rumour, and the correction never travels as far as the original.'),
    quiz: [
      { q: 'What does Delacroix tell callers who say they cannot smell anything?',
        a: 'That some compounds are almost odourless well past the point where they are harmful',
        wrong: [
          'That the plume has passed and normal activity can safely resume',
          'That the wind has changed direction and the hazard has moved elsewhere',
          'That indoor air is always safer than the air outside the building',
        ] },
    ] },
  { id: 'tanaka', name: 'Hiroshi Tanaka', role: 'Records & Shipping Clerk', division: 'IDENT', color: '#9d7cbe',
    fn: 'expert',
    bio: bio(
      'Holds the manifests, the lot numbers and the chain-of-custody records — the evidence that exists before any instrument is switched on.',
      'A shipping manifest names what was in the yard, in what quantity and in which container, and a CAS number pins a compound down unambiguously where a trade name does not: the same substance may be sold under six names, and two different substances may be sold under one. That paperwork narrows the identification problem from every compound in the world to a list of perhaps twenty, which is the difference between a search and a check.',
      'His chain-of-custody file does a different job. It records who held each sample and when, so that a result can be tied to a place and a time. A perfect analysis of a sample nobody can place is not evidence, and he has seen a whole day of laboratory work voided by one unsigned transfer.'),
    quiz: [
      { q: 'Why does Tanaka work in CAS numbers rather than trade names?',
        a: 'A CAS number identifies exactly one substance, where a trade name does not',
        wrong: [
          'A CAS number also records the concentration of the shipped material',
          'The instrument software will not accept a trade name as an input',
          'A CAS number records which supplier shipped that particular drum',
        ] },
      { q: 'What does a break in the chain of custody cost the team?',
        a: 'The result can no longer be tied to a place and a time, so the analysis stops being evidence',
        wrong: [
          'The sample degrades and has to be re-collected',
          'The laboratory has to repeat the calibration for that batch',
          'The instrument has to be recertified before further use',
        ] },
    ] },
  { id: 'abara', name: 'Chidi Abara', role: 'Riverfront Resident Association', division: 'WATER', color: '#4c9c8d',
    fn: 'stakeholder',
    bio: bio(
      'Speaks for the households along the riverfront: people who fish the river, keep gardens on the flood terrace, and let their children play at the water’s edge.',
      'His questions are the ones the sampling plan is least good at answering. Not what the concentration in the water is today, but what is still in the mud, and what is in the fish. Some compounds concentrate as they move up a food chain — small amounts taken in and not excreted accumulate in the fat of each animal, so a fish can carry many times what the water around it ever held, long after the water reads clean.',
      'He is not obstructing anybody. He wants what was released, where it went, and what remains — and he will accept an honest "we do not know yet, here is when we will" far more readily than a reassurance he can tell is being managed.'),
    quiz: [
      { q: 'Why can Abara’s fish carry far more contaminant than the river water they swim in?',
        a: 'Some compounds accumulate in fat and build up along a food chain instead of being excreted',
        wrong: [
          'Fish drink far more water for their size than people do',
          'Contaminants are always more concentrated near the riverbed where fish feed',
          'Fish flesh absorbs whatever compound is most common that week',
        ] },
    ] },
  { id: 'stavros', name: 'Elena Stavros', role: 'Long-Term Monitoring Officer', division: 'TREAT', color: '#71849a',
    fn: 'operations',
    bio: bio(
      'Plans what gets measured after the cameras leave. Her programme is the only part of this response designed to outlive the emergency.',
      'Long-term monitoring is a different problem from emergency sampling, and the difference is the baseline. To say a level is falling she needs measurements taken the same way, at the same places, over enough time that a real trend can be told apart from ordinary variation — rain, season, river flow, which all move a number without anything having changed. A single reassuring sample after treatment is not a trend; it is one point, and one point has no direction.',
      'The mistake she guards against is stopping too early. Contaminants stored in sediment can be released again when a flood stirs the bed, so a programme that ends at six months can miss the second peak entirely and report a success that the river has not agreed to.'),
    quiz: [
      { q: 'Why does Stavros refuse to call a single clean sample after treatment good news?',
        a: 'One point has no direction — rain, season and flow move a number without anything having changed',
        wrong: [
          'A single sample is always taken at the wrong depth',
          'Post-treatment samples cannot be calibrated against pre-treatment ones',
          'One sample is never enough to reach the instrument’s detection limit',
        ] },
    ] },
  { id: 'mbeki', name: 'Sipho Mbeki', role: 'Public Briefing Officer', division: 'QUANT', color: '#c9a05f',
    fn: 'stakeholder',
    bio: bio(
      'Briefs the city, which means he owns the last translation step: whatever leaves this building leaves in his words.',
      'Units are where he loses most sleep. Parts per billion and parts per million differ by a factor of a thousand, milligrams per litre and micrograms per litre by the same, and a number that changes meaning between the laboratory and the microphone is worse than no number at all. He also has to state uncertainty in a way that survives being repeated: "between two and six, most likely near four" holds its shape when it is passed along, where "about four" arrives as "four" and then as a promise.',
      'His rule for the team is short. Give him the number, the unit, the uncertainty and the comparison — what the level is next to, and what somebody should do differently today. A briefing without that last piece gets filled in by whoever speaks next.'),
    quiz: [
      { q: 'By how much do parts per million and parts per billion differ?',
        a: 'A factor of a thousand',
        wrong: [
          'A factor of a hundred',
          'A factor of a million',
          'A factor of ten',
        ] },
      { q: 'Why does Mbeki prefer "between two and six, most likely near four" to "about four"?',
        a: 'The range keeps its shape when repeated, where "about four" is passed on as a firm four',
        wrong: [
          'A range is easier to translate into other units',
          'Regulations require ranges rather than single values in public statements',
          'The instrument cannot produce a single value without a range',
        ] },
    ] },
  { id: 'kowalski', name: 'Ana Kowalski', role: 'Reference Library & Standards', division: 'IDENT', color: '#a98ac6',
    fn: 'expert',
    bio: bio(
      'Keeps the spectral libraries and the reference standards, and knows exactly which of them everyone in the building is quietly depending on.',
      'A reference standard is a material of known identity and known purity, and it is the anchor for the whole measurement chain: every concentration reported here traces back to somebody weighing one out. A spectral library is the same idea for identification — a catalogue of patterns recorded from known compounds, against which an unknown is matched. Neither is a fact about nature. Both are records somebody made, on some instrument, at some date, and both expire.',
      'Which is why she tracks purity, preparation date and storage for every standard on the shelf. A degraded standard does not announce itself; it quietly shifts every result calibrated against it in the same direction, and a whole day of beautifully consistent numbers is exactly what that failure looks like.'),
    quiz: [
      { q: 'What does a degraded reference standard do to a day’s results?',
        a: 'It shifts them all in the same direction, so they stay consistent while being wrong together',
        wrong: [
          'It makes the results scatter widely, which is obvious to anyone reading them',
          'It stops the instrument producing a reading at all until it is replaced',
          'It affects only the samples run immediately after it was last used',
        ] },
    ] },
];
