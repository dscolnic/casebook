// syllabus.js — the thirty concepts each game's senior-high course has to cover.
//
// This file is AUTHORED, and it is the only authored thing in the book generator.
// Everything else `tools/make-book.mjs` prints is read out of the game's own
// content; a syllabus cannot be, because it is the claim the content is measured
// against. It says what a senior-high course in the subject must teach, in the
// order such a course usually teaches it, and the book then reports which of its
// own questions teach each item — including the ones nothing teaches.
//
// That last part is the point. A game is not a course, and the gaps are the useful
// output: twenty-five of thirty covered is a syllabus map, thirty of thirty would be
// a suspiciously flattering one.
//
// ## The mapping
//
// `k` is a list of phrases matched against each question's own words — its title,
// scene, the ask, the cards or options, the verdict and the takeaway. Phrases, not
// single words, wherever a single word would be ambiguous: "half-life" is safe,
// "mass" is not, and a concept matched by "rate" alone would collect half the book.
// A phrase matches on word boundaries, so "arc" does not fire inside "arcsecond".
//
// `groups` is optional and narrows a concept to particular areas of study, which is
// the cheapest false-positive control there is: energy in a chemistry game means
// enthalpy, and in an astronomy game it means impact energy.
export const SYLLABUS = {
  // ---------------------------------------------------------------- chemistry
  contamcity: {
    course: 'AP Chemistry, with the analytical half of a first-year college course',
    concepts: [
      { c: 'Atomic structure, ions and electron configuration',
        k: ['electron', 'cation', 'anion', 'oxidation state', 'ionic', 'atomic number'] },
      { c: 'Periodic trends and what an element can do',
        k: ['periodic', 'electronegativity', 'group of the periodic table', 'transition metal'] },
      { c: 'Chemical formulas, naming and composition',
        k: ['chemical formula', 'formula tells', 'nomenclature', 'stoichiometric formula', 'composition'] },
      { c: 'Molecular geometry, polarity and intermolecular forces',
        k: ['polarity', 'polar', 'nonpolar', 'hydrogen bond', 'intermolecular'] },
      { c: 'The mole, molar mass and stoichiometry',
        k: ['mole', 'molar mass', 'stoichiometry', 'balanced equation', 'moles of',
            'mass balance', 'follows the mass', 'conservation of mass'] },
      { c: 'Limiting reactant and percent yield',
        k: ['limiting', 'excess reagent', 'percent yield', 'theoretical yield'] },
      { c: 'Gas laws and the ideal gas equation',
        k: ['ideal gas', 'partial pressure', 'gas law', 'nrt', 'vapour pressure', 'vapor pressure'] },
      { c: 'Kinetic molecular theory, diffusion and volatility',
        k: ['kinetic molecular', 'volatile', 'volatility', 'diffusion', 'headspace'] },
      { c: 'Solutions, molarity and dilution',
        k: ['molarity', 'dilution', 'dilute', 'concentration of the solution', 'aliquot', 'stock solution'] },
      { c: 'Solubility, precipitation and complexation',
        k: ['solubility', 'precipitat', 'complexation', 'complex ion', 'ligand', 'dissolution'] },
      { c: 'Acids, bases and pH',
        k: ['ph!', 'acid', 'alkaline', 'hydroxide', 'protonat'] },
      { c: 'Buffers and titration',
        k: ['buffer', 'titration', 'titrate', 'equivalence point'] },
      { c: 'Equilibrium and Le Chatelier',
        k: ['equilibrium', 'le chatelier', 'equilibrium constant', 'shifts the equilibrium'] },
      { c: 'Reaction kinetics, rate laws and activation energy',
        k: ['rate law', 'reaction rate', 'activation energy', 'arrhenius', 'half-life of the reaction',
            'photochemi', 'formed in sunlight', 'secondary pollutant', 'transformed in the air',
            'secondary product', 'oxidant', 'sunlight'] },
      { c: 'Catalysis',
        k: ['catalys', 'catalyst', 'catalytic'] },
      { c: 'Thermochemistry: enthalpy, calorimetry, energy balance',
        k: ['enthalpy', 'calorimet', 'exotherm', 'endotherm', 'heat of reaction', 'energy balance',
            'heat capacity', 'specific heat', 'absorbed heat', 'temperature rise'] },
      { c: 'Entropy, free energy and spontaneity',
        k: ['entropy', 'free energy', 'spontaneous', 'thermodynamically favour'] },
      { c: 'Redox and electrochemistry',
        k: ['redox', 'oxidis', 'oxidiz', 'reduction', 'electrode', 'corrosion', 'half-cell'] },
      { c: 'Spectroscopy, Beer–Lambert and calibration curves',
        k: ['beer-lambert', 'beer–lambert', 'absorbance', 'spectrum', 'spectroscop', 'calibration curve',
            'chromatograph', 'retention time'] },
      { m: true, c: 'Measurement: significant figures, blanks, detection limits, uncertainty',
        k: ['detection limit', 'blank!', 'blanks', 'uncertainty', 'significant figure', 'replicate',
            'precision', 'systematic error'] },
      { c: 'Separation science: chromatography and extraction',
        k: ['chromatograph', 'extraction', 'separat', 'eluti', 'sorbent'] },
      { c: 'Phase changes, vapour pressure and phase diagrams',
        k: ['phase change', 'boiling point', 'evaporat', 'condens', 'vapour pressure', 'vapor pressure',
            'phase diagram'] },
      { c: 'Colligative properties',
        k: ['colligative', 'freezing point depression', 'boiling point elevation', 'osmotic pressure'] },
      { c: 'Reaction mechanisms and the rate-determining step',
        k: ['mechanism of the reaction', 'rate-determining', 'elementary step', 'intermediate'] },
      { c: 'Solubility product and the common-ion effect',
        k: ['solubility product', 'ksp', 'common-ion', 'saturated solution'] },
      { c: 'Electrolysis and quantitative electrochemistry',
        k: ['electrolysis', 'faraday', 'coulomb', 'current passed', 'plating'] },
      { c: 'Mass spectrometry and molecular mass',
        k: ['mass spectrom', 'mass-to-charge', 'molecular mass', 'fragment ion'] },
      { m: true, c: 'Sampling: representative samples and sample handling',
        k: ['representative sample', 'grab sample', 'composite sample', 'sample handling',
            'hold time', 'preserv', 'sampling design', 'sampling plan', 'survey sample',
            'where to sample', 'what does the survey'] },
      { m: true, c: 'Quality control: standards, spikes and recovery',
        k: ['standard solution', 'spike', 'recovery', 'reference standard', 'duplicate', 'quality control'] },
      { m: true, c: 'Concentration units and conversions: ppm, mg/L, molarity',
        k: ['ppm', 'mg/l', 'parts per million', 'milligrams per litre', 'milligrams per liter',
            'unit conversion'] },
    ],
  },

  // ------------------------------------------------------------ nuclear physics
  projecty: {
    course: 'AP Physics 2 nuclear unit, with the nuclear chemistry of AP Chemistry',
    concepts: [
      { c: 'Nuclear structure: protons, neutrons, isotopes, nuclide notation',
        k: ['nuclide', 'isotope', 'proton', 'neutron number', 'atomic number', 'mass number', 'nucleus', 'nucleon'] },
      { c: 'Mass defect, binding energy and E = mc²',
        k: ['mass defect', 'binding energy', 'rest-mass energy', 'mass-energy'] },
      { c: 'Binding energy per nucleon and the stability curve',
        k: ['binding energy per nucleon', 'curve of binding', 'most stable nuclide'] },
      { c: 'Radioactive decay modes: alpha, beta, gamma',
        k: ['alpha', 'beta decay', 'gamma ray', 'decay mode', 'positron'] },
      { c: 'Decay constant, half-life and activity',
        k: ['half-life', 'decay constant', 'activity of the sample', 'becquerel', 'curie'] },
      { c: 'Exponential decay and logarithms',
        k: ['exponential decay', 'logarithm', 'e-folding', 'exponential in'] },
      { c: 'Fission, neutron multiplication and chain reactions',
        k: ['fission', 'chain reaction', 'multiplication factor', 'neutron balance', 'fissile'] },
      { c: 'Criticality: mass, geometry, reflectors, moderation',
        k: ['critical', 'criticality', 'reflector', 'moderat', 'subcritical', 'supercritical'] },
      { c: 'Fusion',
        k: ['fusion', 'thermonuclear', 'deuterium', 'tritium'] },
      { c: 'Cross sections and mean free path',
        k: ['cross section', 'mean free path', 'barn', 'macroscopic cross'] },
      { c: 'Attenuation of radiation through matter',
        k: ['attenuation', 'attenuate', 'transmitted intensity', 'shielding thickness'] },
      { c: 'Detectors: ionisation, count rate, efficiency, dead time',
        k: ['detector', 'count rate', 'ionisation chamber', 'ionization chamber', 'dead time',
            'detector efficiency', 'pulse height'] },
      { c: 'Counting statistics and uncertainty',
        k: ['counting statistic', 'poisson', 'square root of the count', 'statistical uncertainty'] },
      { c: 'Shielding, dose and radiation protection',
        k: ['dose', 'shield', 'roentgen', 'exposure limit', 'radiation protection'] },
      { c: 'Conservation of energy and momentum in reactions',
        k: ['conservation of energy', 'conservation of momentum', 'momentum is conserved', 'q value'] },
      { c: 'Units and conversions: MeV, u, barns, scientific notation',
        k: ['mev', 'atomic mass unit', 'scientific notation', 'unit conversion', 'order of magnitude'] },
      { m: true, c: 'Order-of-magnitude estimation from givens',
        k: ['estimate', 'approximately', 'ballpark', 'rounded result'] },
      { c: 'Materials: phases, allotropes, alloys, density',
        k: ['allotrop', 'phase transformation', 'alloy', 'density of the metal', 'metallurg', 'polymorph',
            'strength', 'stiffness', 'hardness', 'toughness', 'ductil'] },
      { c: 'Shock waves, compression and hydrodynamics',
        k: ['shock wave', 'compression', 'implosion', 'detonation', 'hydrodynamic'] },
      { m: true, c: 'Experimental method: controls, calibration, systematic vs random error',
        k: ['control experiment', 'calibrat', 'systematic error', 'random error', 'independent measurement',
            'reproducib', 'evidence chain', 'traceab', 'independent benchmark',
            'independent inspection'] },
      { c: 'Isotope separation and enrichment',
        k: ['enrich', 'isotope separation', 'gaseous diffusion', 'electromagnetic separation', 'calutron'] },
      { c: 'Penetrating power and range of alpha, beta, gamma',
        k: ['penetrat', 'range in air', 'stopping power', 'absorbed in a sheet', 'ionising track'] },
      { c: 'Inverse-square law for radiation intensity',
        k: ['inverse square', 'inverse-square', 'distance from the source', 'intensity falls with distance'] },
      { m: true, c: 'Descriptive statistics: mean, spread, standard deviation',
        k: ['standard deviation', 'mean of the', 'scatter in the data', 'average of the measurements',
            'spread', 'percentage of the mean', 'dispersion', 'distribution rather than'] },
      { m: true, c: 'Graphical analysis: semi-log plots and slopes',
        k: ['semi-log', 'log plot', 'slope of the line', 'straight line on a', 'plot the'] },
      { c: 'Pressure, temperature and equations of state',
        k: ['equation of state', 'pressure and temperature', 'compressibility', 'adiabatic'] },
      { c: 'Chemical explosives: energy release and detonation velocity',
        k: ['detonation velocity', 'explosive charge', 'energy release', 'high explosive', 'brisance'] },
      { m: true, c: 'Timing, synchronisation and simultaneity of events',
        k: ['simultane', 'microsecond', 'timing of the', 'synchronis', 'synchroniz', 'jitter'] },
      { m: true, c: 'Dimensional analysis and scaling laws',
        k: ['dimensional analysis', 'scaling law', 'scales as', 'proportional to the cube',
            'scaled experiment'] },
      { m: true, c: 'Criticality safety: administrative limits and controls',
        k: ['administrative limit', 'safety margin', 'criticality safety', 'two-person', 'procedural control'] },
    ],
  },

  // ---------------------------------------------------------------- astronomy
  planetary_defense: {
    course: 'Astronomy elective, with the mechanics of AP Physics 1',
    concepts: [
      { c: 'Celestial coordinates and angular measure',
        k: ['arcsec', 'coordinate system', 'right ascension', 'declination', 'angular'] },
      { c: 'Apparent and absolute magnitude; inverse-square brightness',
        k: ['magnitude', 'brightness', 'inverse square', 'flux!'] },
      { c: 'Albedo and the size–brightness degeneracy',
        k: ['albedo', 'reflectiv', 'diameter', 'size of the object'] },
      { c: 'Light curves and rotation',
        k: ['light curve', 'rotation period', 'rotational', 'periodic brightness'] },
      { c: 'Telescopes: aperture, resolution, signal-to-noise',
        k: ['aperture', 'signal-to-noise', 'exposure', 'point-spread', 'resolution'] },
      { c: 'Detectors and image artifacts',
        k: ['hot pixel', 'cosmic ray', 'artifact', 'detector defect', 'satellite trail', 'flat frame'] },
      { c: "Kepler's laws",
        k: ['kepler', 'orbital period', 'semi-major axis', 'eccentric'] },
      { c: 'Orbital elements and orbit determination',
        k: ['orbital element', 'orbit determination', 'orbit fit', 'observation arc', 'ephemeris'] },
      { c: 'Gravitation, orbital speed and energy',
        k: ['gravitational', 'orbital speed', 'escape velocity', 'perturbation'] },
      { c: 'Radar ranging, light travel time and Doppler',
        k: ['radar', 'round-trip delay', 'light travel', 'doppler'] },
      { m: true, c: 'Uncertainty, error bars and covariance',
        k: ['uncertainty', 'covariance', 'error bar', 'residual', 'confidence'] },
      { m: true, c: 'Time and coordinate standards',
        k: ['time standard', 'utc', 'timestamp', 'clock'] },
      { c: 'Kinetic energy and impact energy scaling',
        k: ['kinetic energy', 'impact energy', 'megaton', 'joule', 'energy scales'] },
      { c: 'Atmospheric entry: drag, ablation, airburst',
        k: ['entry', 'airburst', 'ablat', 'atmospher', 'burst altitude', 'drag'] },
      { c: 'Momentum transfer and deflection',
        k: ['momentum transfer', 'deflect', 'delta-v', 'velocity change', 'beta factor'] },
      { c: 'Probability, risk and expected value',
        k: ['impact probability', 'probability', 'risk', 'expected value', 'expected number'] },
      { m: true, c: 'Scientific notation and unit conversion',
        k: ['scientific notation', 'unit conversion', 'order of magnitude', 'kilometre per second',
            'megaton', 'exponent', 'powers of ten', 'in the units the'] },
      { m: true, c: 'Independent confirmation and data validation',
        k: ['independent follow-up', 'independent confirmation', 'somebody else can test',
            'cross-match', 'validate'] },
      { c: 'Solar system architecture and near-Earth objects',
        k: ['near-earth', 'asteroid', 'solar system', 'ecliptic', 'main belt'] },
      { m: true, c: 'Observing constraints: elongation, visibility windows, scheduling',
        k: ['elongation', 'observing window', 'visibility', 'discretionary time', 'schedule'] },
      { c: 'Angular size and the small-angle formula',
        k: ['angular size', 'small-angle', 'subtend', 'apparent size'] },
      { c: 'Parallax, baselines and distance',
        k: ['parallax', 'baseline', 'two stations', 'triangulat'] },
      { c: 'Thermal emission and infrared temperature',
        k: ['thermal emission', 'infrared', 'blackbody', 'thermal data', 'temperature of the surface'] },
      { c: 'Phase angle, scattering and observing geometry',
        k: ['phase angle', 'scattering', 'scattered light', 'illuminat', 'observing geometry',
            'sun-object-earth'] },
      { c: 'Impact velocity and gravitational focusing',
        k: ['impact velocity', 'encounter speed', 'gravitational focus', 'entry velocity',
            'entry speed', 'approach speed', 'escape speed'] },
      { c: 'Momentum conservation in collisions',
        k: ['momentum', 'conservation of momentum', 'ejecta', 'recoil'] },
      { c: 'Planetary perturbations and resonances',
        k: ['perturb', 'resonance', 'close approach to', 'keyhole'] },
      { m: true, c: 'Monte Carlo methods and ensembles',
        k: ['monte carlo', 'ensemble', 'virtual impactor', 'sample of orbits', 'many trial'] },
      { m: true, c: 'Detection thresholds, false alarms and completeness',
        k: ['threshold', 'false alarm', 'false positive', 'completeness', 'survey completeness',
            'searchable volume', 'volume grows', 'deeper sensitivity', 'limiting magnitude'] },
      { c: 'Crater and blast scaling; ground effects',
        k: ['crater', 'blast', 'overpressure', 'ground damage', 'shock wave'] },
    ],
  },

  // ------------------------------------------------------------------- biology
  outbreak_riverton: {
    course: 'AP Biology, with a public-health unit',
    concepts: [
      { c: 'Cell structure and function',
        k: ['cell wall', 'organelle', 'cytoplasm', 'nucleus of the cell', 'cell structure'] },
      { c: 'Membranes and transport',
        k: ['membrane', 'osmosis', 'diffusion', 'active transport', 'permeab', 'gradient'] },
      { c: 'Enzymes and metabolism',
        k: ['enzyme', 'substrate', 'metabolis', 'catalys'] },
      { c: 'Energy: respiration and ATP',
        k: ['respiration', 'atp', 'aerobic', 'anaerobic', 'glucose'] },
      { c: 'DNA structure and replication',
        k: ['dna', 'replicat', 'nucleotide', 'genome', 'rna'] },
      { c: 'Transcription, translation and gene expression',
        k: ['transcription', 'translation', 'protein synthesis', 'expression'] },
      { c: 'Molecular diagnostics: PCR and amplification',
        k: ['pcr', 'amplif', 'primer', 'cycle threshold', 'assay'] },
      { c: 'Mutation and genetic variation',
        k: ['mutation', 'variant', 'genetic variation', 'sequence change'] },
      { c: 'Natural selection and evolution',
        k: ['selection', 'evolv', 'evolution', 'fitness', 'resistan'] },
      { c: 'Populations, transmission chains and exponential growth',
        k: ['exponential', 'doubling time', 'transmission chain', 'growth rate', 'incidence'] },
      { c: 'Homeostasis and feedback',
        k: ['homeostasis', 'feedback', 'set point', 'regulat'] },
      { c: 'Circulatory and respiratory physiology',
        k: ['oxygen saturation', 'blood pressure', 'perfusion', 'respiratory rate', 'cardiac'] },
      { c: 'Innate and adaptive immunity',
        k: ['immune', 'innate', 'adaptive', 'antibod', 'antigen', 'inflammat'] },
      { c: 'Vaccination and treatment',
        k: ['vaccin', 'antivir', 'antibiotic', 'treatment', 'prophylax'] },
      { c: 'Pathogens: viruses and bacteria',
        k: ['virus', 'viral', 'bacteri', 'pathogen', 'infectious agent'] },
      { c: 'Epidemiology: case definitions, curves, R and reservoirs',
        k: ['case definition', 'epidemic curve', 'reproduction number', 'reservoir', 'outbreak',
            'contact tracing', 'next generation', 'threshold near one', 'surveillance',
            'upstream of the'] },
      { c: 'Test performance: sensitivity, specificity, predictive value',
        k: ['sensitivity', 'specificity', 'false positive', 'false negative', 'predictive value'] },
      { m: true, c: 'Experimental design: controls, sampling and bias',
        k: ['control group', 'negative control', 'sample size', 'bias', 'randomis', 'randomiz',
            'trial', 'participant protection', 'interpretable evidence'] },
      { c: 'Ecology, vectors and zoonoses',
        k: ['vector', 'zoono', 'animal reservoir', 'ecolog', 'spillover', 'one health'] },
      { m: true, c: 'Rates, ratios and reading data',
        k: ['rate per', 'per hundred thousand', 'ratio', 'trend in the data', 'denominator',
            'upper bound', 'bound on', 'simple bounds'] },
      { c: 'Cell division and growth',
        k: ['mitosis', 'cell division', 'divides', 'proliferat'] },
      { c: 'Inheritance and Mendelian genetics',
        k: ['inherit', 'allele', 'genotype', 'phenotype', 'mendel', 'dominant'] },
      { c: 'Gene regulation and expression control',
        k: ['gene regulation', 'upregulat', 'downregulat', 'promoter', 'switched on'] },
      { c: 'Protein structure and function',
        k: ['protein structure', 'receptor', 'binding site', 'conformation', 'denatur'] },
      { c: 'pH and buffering in biological systems',
        k: ['ph!', 'acidosis', 'buffer', 'bicarbonate'] },
      { c: 'Signalling: nervous and endocrine control',
        k: ['hormone', 'neurotransmit', 'signal', 'endocrine', 'insulin'] },
      { c: 'Antimicrobial resistance',
        k: ['resistan', 'antimicrobial', 'antibiotic resistance', 'selective pressure'] },
      { m: true, c: 'Biosafety, aseptic technique and contamination',
        k: ['biosafety', 'aseptic', 'sterile', 'contaminat', 'personal protective', 'decontaminat'] },
      { m: true, c: 'Statistics: confidence, significance and sample size',
        k: ['confidence interval', 'statistically significant', 'p-value', 'sample size', 'power of the study',
            'effect size', 'number needed to treat', 'relative risk', 'absolute risk'] },
      { c: 'Epidemic modelling and projection',
        k: ['model of the epidemic', 'projection', 'compartment model', 'susceptible', 'forecast'] },
    ],
  },

  // ------------------------------------------------------------------ mechanics
  bring_them_home: {
    course: 'AP Physics 1, with the mechanics half of AP Physics C',
    concepts: [
      { c: 'Vectors and components',
        k: ['vector', 'component', 'resolve into', 'state vector'] },
      { c: 'Kinematics',
        k: ['velocity', 'acceleration', 'displacement', 'trajector'] },
      { c: "Newton's laws and free-body reasoning",
        k: ['newton', 'net force', 'free-body', 'thrust', 'reaction force'] },
      { c: 'Work, energy and conservation of energy',
        k: ['work done', 'kinetic energy', 'potential energy', 'conservation of energy', 'energy budget'] },
      { c: 'Momentum, impulse and conservation',
        k: ['momentum', 'impulse', 'conservation of momentum'] },
      { c: 'Circular motion and centripetal force',
        k: ['circular motion', 'centripetal', 'orbital radius'] },
      { c: 'Rotational kinematics',
        k: ['angular velocity', 'angular rate', 'rotation rate', 'degrees per second'] },
      { c: 'Torque and moment of inertia',
        k: ['torque', 'moment of inertia', 'lever arm', 'couple'] },
      { c: 'Angular momentum',
        k: ['angular momentum', 'spin-up', 'gyroscop'] },
      { c: 'Gravitation and orbits',
        k: ['gravitation', 'orbit', 'free return', 'perigee', 'apogee', 'burn'] },
      { c: 'Simple harmonic motion and resonance',
        k: ['resonance', 'harmonic', 'natural frequency', 'oscillat', 'damping'] },
      { c: 'Waves: frequency, wavelength, speed',
        k: ['wavelength', 'frequency', 'wave speed', 'antenna', 'carrier'] },
      { c: 'Doppler shift',
        k: ['doppler'] },
      { c: "Circuits: current, voltage, resistance, Ohm's law",
        k: ['voltage', 'electric current', 'current draw', 'amps', 'resistance', 'ohm', 'circuit', 'bus voltage'] },
      { c: 'Electrical power and energy budgets',
        k: ['watt', 'amp-hour', 'power draw', 'load shed', 'energy remaining', 'battery'] },
      { c: 'Series, parallel and load management',
        k: ['in series', 'in parallel', 'load!', 'loads', 'breaker', 'isolat'] },
      { c: 'Heat transfer: conduction, convection, radiation',
        k: ['conduction', 'convection', 'radiat', 'thermal', 'insulat', 'heat rejection'] },
      { c: 'Gas behaviour and life support',
        k: ['partial pressure', 'carbon dioxide', 'scrub', 'oxygen', 'lithium hydroxide'] },
      { m: true, c: 'Measurement uncertainty and error propagation',
        k: ['uncertainty', 'residual', 'error propagat', 'tolerance', 'common-mode',
            'angular error', 'position error', 'precision becomes', 'transverse offset'] },
      { m: true, c: 'Systems thinking: dependency, redundancy, failure modes',
        k: ['dependency', 'redundan', 'failure mode', 'single point of failure', 'interlock',
            'blackout', 'ordered so that', 'settled before'] },
      { c: 'Projectile motion and free fall',
        k: ['projectile', 'free fall', 'ballistic', 'parabolic'] },
      { c: 'Friction and drag',
        k: ['friction', 'drag', 'resistive force'] },
      { c: "Springs and Hooke's law",
        k: ['spring', 'hooke', 'stiffness', 'deflection under load'] },
      { c: 'Collisions: elastic and inelastic',
        k: ['collision', 'elastic', 'inelastic', 'docking impact'] },
      { c: 'Centre of mass and balance',
        k: ['centre of mass', 'center of mass', 'centre of gravity', 'center of gravity', 'balance point'] },
      { c: 'Static equilibrium and structural loads',
        k: ['equilibrium of forces', 'static load', 'structural load', 'stress', 'strain', 'buckl'] },
      { c: 'Fluid pressure and flow',
        k: ['pressure of the', 'psi', 'flow rate', 'leak rate', 'tank pressure'] },
      { c: 'Capacitance, RC time constants and transients',
        k: ['capacit', 'time constant', 'transient', 'surge', 'inrush'] },
      { c: 'Magnetism, motors and actuators',
        k: ['magnet', 'motor', 'solenoid', 'actuator', 'gimbal'] },
      { m: true, c: 'Graphical analysis of motion data',
        k: ['plot the', 'plotted', 'graph', 'slope of the', 'against time', 'read the curve'] },
    ],
  },

  // ------------------------------------------------------------ waves & systems
  deepwatch: {
    course: 'Physics of waves and sound, with an engineering-systems unit',
    concepts: [
      { c: 'Sound as a wave: frequency, wavelength, speed',
        k: ['wavelength', 'frequency', 'sound speed', 'hertz', 'acoustic'] },
      { c: 'Sound in water: refraction, layers, propagation paths',
        k: ['the layer', 'refract', 'sound channel', 'propagation path', 'thermocline'] },
      { c: 'Reflection, absorption and transmission loss',
        k: ['reflect', 'absorb', 'transmission loss', 'echo', 'return'] },
      { c: 'Doppler shift',
        k: ['doppler'] },
      { c: 'Resonance and harmonics',
        k: ['resonance', 'harmonic', 'natural frequency', 'blade rate'] },
      { c: 'Spectra: broadband and narrowband',
        k: ['broadband', 'narrowband', 'spectrum', 'tonal'] },
      { c: 'Signal-to-noise and detection thresholds',
        k: ['signal-to-noise', 'noise floor', 'detection threshold', 'quieter than'] },
      { c: 'Bearings, triangulation and geometry',
        k: ['bearing', 'triangulat', 'fix!', 'a fix', 'cross-bearing', 'range estimate'] },
      { c: 'Relative motion, vectors and dead reckoning',
        k: ['dead reckoning', 'set and drift', 'relative motion', 'course and speed', 'vector',
            'clear water', 'margin', 'off track', 'plotted line'] },
      { c: 'Buoyancy and Archimedes',
        k: ['buoyan', 'archimedes', 'displacement of water', 'ballast'] },
      { c: 'Pressure, depth and hydrostatics',
        k: ['pressure at depth', 'hydrostatic', 'sea pressure', 'flooding rate'] },
      { c: 'Trim, stability and centre of gravity',
        k: ['trim', 'stability', 'centre of gravity', 'center of gravity', 'listing to'] },
      { c: 'Fluid flow and cavitation',
        k: ['cavitat', 'flow rate', 'turbulen', 'pump'] },
      { c: 'Thermodynamics and heat engines',
        k: ['thermodynam', 'steam', 'heat exchanger', 'condens', 'efficiency of the plant'] },
      { c: 'Circuits, grounding and electrical faults',
        k: ['ground fault', 'breaker', 'bus', 'volt!', 'volts', 'insulation resistance', 'energis', 'energiz'] },
      { c: 'Gas laws and life support',
        k: ['partial pressure', 'carbon dioxide', 'scrubber', 'oxygen', 'atmosphere monitor'] },
      { c: 'Combustion, the fire triangle and reflash',
        k: ['fire', 'combust', 'reflash', 'fuel source', 'smother'] },
      { m: true, c: 'Dependency order and interlocks',
        k: ['dependency', 'interlock', 'in order', 'prerequisite', 'restore in'] },
      { m: true, c: 'Instruments versus indicators: validating a reading',
        k: ['indicator', 'meter the', 'gauge', 'confirm it is', 'proved dead', 'independent check'] },
      { m: true, c: 'Risk, redundancy and failure propagation',
        k: ['redundan', 'cascad', 'propagat', 'single failure', 'worst case'] },
      { c: 'Interference, beats and phase',
        k: ['interfer', 'beat frequency', 'in phase', 'out of phase', 'cancel'] },
      { c: 'Standing waves and cavity resonance',
        k: ['standing wave', 'node', 'cavity', 'hull resonance', 'ringing'] },
      { c: 'Diffraction, beamwidth and array directivity',
        k: ['diffract', 'beamwidth', 'array', 'directivity', 'aperture'] },
      { c: 'Decibels and logarithmic scales',
        k: ['decibel', ' db', 'logarithm', 'source level'] },
      { c: "Snell's law, ray paths and shadow zones",
        k: ['snell', 'ray path', 'shadow zone', 'bends toward', 'gradient of sound speed'] },
      { c: 'The sonar equation: source level, transmission loss, noise',
        k: ['sonar equation', 'source level', 'transmission loss', 'noise level', 'figure of merit'] },
      { c: 'Speed, time, distance and closest point of approach',
        k: ['closest point of approach', 'time to intercept', 'speed and distance', 'range rate',
            'knot', 'time budget', 'how much time does', 'slowing'] },
      { c: 'Materials under pressure: stress, strength, the pressure hull',
        k: ['pressure hull', 'hull integrity', 'stress', 'strength of the', 'yield', 'fatigue',
            'crush depth'] },
      { c: 'Batteries, DC distribution and grounding',
        k: ['batter', 'direct current', 'distribution panel', 'ground', 'shore power'] },
      { m: true, c: 'Human factors: checklists, handover and communication',
        k: ['checklist', 'handover', 'report to the officer', 'read back', 'watch team'] },
    ],
  },

  // ------------------------------------------------------- anatomy & physiology
  hospital: {
    course: 'Anatomy & Physiology — note this game is written for grade 2, not senior high',
    concepts: [
      { c: 'Levels of organisation: cells, tissues, organs, systems',
        k: ['cell!', 'cells', 'tissue', 'organ!', 'organs', 'body system'] },
      { c: 'Homeostasis and feedback',
        k: ['homeostasis', 'in balance', 'keeps the body', 'feedback'] },
      { c: 'Skeletal system',
        k: ['bone', 'skeleton', 'joint', 'fracture', 'ankle'] },
      { c: 'Muscles and movement',
        k: ['muscle', 'movement', 'tendon', 'strength'] },
      { c: 'Skin: barrier, healing, temperature',
        k: ['skin', 'wound', 'heal', 'rash', 'burn'] },
      { c: 'Nervous system and reflexes',
        k: ['nerve', 'brain', 'reflex', 'spinal'] },
      { c: 'The senses',
        k: ['you can see', 'looks at', 'hearing', 'ear', 'eye', 'touch', 'sense'] },
      { c: 'Heart and circulation',
        k: ['heart', 'blood vessel', 'circulat', 'artery'] },
      { c: 'Blood and its components',
        k: ['blood', 'red cell', 'platelet', 'bleeding'] },
      { c: 'Pulse and blood pressure',
        k: ['pulse', 'blood pressure', 'beats per minute', 'heart rate'] },
      { c: 'Breathing and gas exchange',
        k: ['breath', 'lung', 'oxygen', 'airway', 'wheez'] },
      { c: 'Digestion and absorption',
        k: ['stomach', 'digest', 'intestin', 'food goes'] },
      { c: 'Nutrition and energy',
        k: ['nutrition', 'energy from food', 'food is fuel', 'sugar', 'calorie',
            'eats', 'eating', 'eaten', 'fuel'] },
      { c: 'Fluids, hydration and dehydration',
        k: ['water', 'hydrat', 'dehydrat', 'fluid', 'drink'] },
      { c: 'Kidneys and waste',
        k: ['kidney', 'urine', 'waste'] },
      { c: 'Hormones and growth',
        k: ['hormone', 'insulin', 'growth', 'gland'] },
      { c: 'Immune defence and inflammation',
        k: ['immune', 'fight the germ', 'swell', 'fever', 'inflam'] },
      { c: 'Germs, transmission and hand hygiene',
        k: ['germ', 'wash your hands', 'spread', 'clean your hands', 'infection'] },
      { m: true, c: 'Vital signs, measurement and normal ranges',
        k: ['measure', 'normal range', 'thermometer', 'number from a tool', 'vital sign'] },
      { c: 'Emergency assessment and triage',
        k: ['triage', 'who to see first', 'urgen', 'sickest', 'emergency'] },
      { c: 'Anatomical terms and body regions',
        k: ['left side', 'right side', 'front of the body', 'upper body', 'lower body', 'body part'] },
      { c: 'How things move in and out of cells',
        k: ['soaks in', 'passes through', 'absorb', 'diffus', 'through the wall'] },
      { c: 'Joints and how far they move',
        k: ['joint', 'bend it', 'range of motion', 'swollen ankle', 'sprain'] },
      { c: 'The heartbeat: rhythm and rate',
        k: ['rhythm', 'beats', 'fast heart', 'slow heart', 'steady beat'] },
      { c: 'Breathing effort and how much air',
        k: ['breathing hard', 'breaths per minute', 'deep breath', 'short of breath', 'chest moves'] },
      { c: 'Swelling, lymph and healing',
        k: ['swell', 'swollen', 'bruise', 'lymph', 'ice on it'] },
      { c: 'Body temperature and fever',
        k: ['temperature', 'fever', 'hot forehead', 'degrees'] },
      { c: 'Medicines and dose',
        k: ['medicine', 'dose', 'how much to give', 'milligram', 'drops'] },
      { c: 'First aid: airway, breathing, circulation',
        k: ['airway', 'first aid', 'chest compression', 'choking', 'stop the bleeding'] },
      { c: 'Imaging: X-rays and pictures of the inside',
        k: ['x-ray', 'picture of the bone', 'scan', 'ultrasound', 'image of the'] },
    ],
  },
};

// --------------------------------------------------------------- equations
//
// The equations a course cannot be said to have taught without. Same idea as the
// concepts above and the same matching, but a narrower claim and a stricter test.
//
// **Deliberately a separate export, not a field on the entry above.**
// `claimedWords` walks every string in a `SYLLABUS[theme]` entry and turns it
// into the allowlist that `jargonSweep` prioritises by and that `import-book`
// stamps `core` from. Adding equations there would quietly claim "constant",
// "logarithm", "specificity" and forty more, restamp `core` across the glossary,
// and reorder every plan card in the game — a syllabus page is not worth that.
//
// `e` is the equation as a reader should meet it. `c` is what it is for. `k` are
// the phrases that say a question is about it, matched exactly as a concept's
// are. `strong` is the extra test: a question *computes* the equation when its
// estimate's own `relationship` or worked solution matches, and merely *mentions*
// it when only the prose does. Both are printed, because they are not the same
// claim — an estimate that gets a number out of PV = nRT has taught it, and a
// verdict that says the words has not.
//
// The lists are short on purpose. "Absolutely has to be taught" is a much higher
// bar than "appears in the course", so a topic that a course could reasonably
// cover qualitatively is not here: the test applied was whether a student could
// pass the unit without being able to write the thing down.
export const EQUATIONS = {
  contamcity: [
    { e: 'n = m / M', c: 'moles from a mass and a molar mass',
      k: ['molar mass', 'moles of', 'mole!', 'number of moles'] },
    { e: 'PV = nRT', c: 'the ideal gas law',
      k: ['nrt', 'ideal gas', 'gas law'] },
    { e: 'c = n / V', c: 'molarity as moles per unit volume',
      k: ['molarity', 'moles per litre', 'moles per liter', 'concentration of the solution'] },
    { e: 'C₁V₁ = C₂V₂', c: 'dilution, and carrying a dilution factor back',
      k: ['dilution', 'dilute', 'stock solution', 'aliquot'] },
    { e: 'q = mcΔT', c: 'calorimetry — heat from a temperature change',
      k: ['specific heat', 'heat capacity', 'calorimet', 'temperature rise'] },
    { e: 'pH = −log[H⁺]', c: 'acidity on a logarithmic scale',
      k: ['ph!', 'hydrogen ion', 'protonat', 'hydroxide'] },
    { e: 'A = εlc', c: 'Beer–Lambert, and the calibration curve it justifies',
      k: ['beer-lambert', 'beer–lambert', 'absorbance', 'calibration curve'] },
    { e: 'Kₛₚ = [Aᵃ][Bᵇ]', c: 'the solubility product and the common-ion effect',
      k: ['solubility product', 'common-ion', 'common ion', 'ksp'] },
    { e: 'percent yield = actual ÷ theoretical × 100', c: 'yield against a stoichiometric prediction',
      k: ['percent yield', 'theoretical yield', 'chemical yield', 'recovery fraction'] },
    { e: 'rate = k[A]ⁿ', c: 'a rate law, and the order it asserts',
      k: ['rate law', 'reaction rate', 'arrhenius', 'activation energy'] },
  ],

  projecty: [
    { e: 'E = mc²', c: 'mass defect converted to binding energy',
      k: ['mass defect', 'binding energy', 'mass-energy', 'rest-mass', 'energy equivalent'] },
    { e: 'B / A', c: 'binding energy per nucleon, and the stability curve it plots',
      k: ['per nucleon', 'stability curve', 'binding energy per'] },
    { e: 'N(t) = N₀e^(−λt)', c: 'exponential decay of a population',
      k: ['exponential decay', 'decay law', 'half-lives', 'what is left'] },
    { e: 'λ = ln2 / t½', c: 'decay constant from half-life',
      k: ['decay constant', 'half-life', 'half life'] },
    { e: 'A = λN', c: 'activity from a decay constant and a population',
      k: ['activity', 'decays per', 'disintegrations', 'becquerel'] },
    { e: 'Σ = nσ', c: 'macroscopic cross section from number density',
      k: ['macroscopic cross section', 'number density', 'cross section'] },
    { e: 'mfp = 1 / Σ', c: 'mean free path as the inverse of interaction per length',
      k: ['mean free path'] },
    { e: 'I = I₀e^(−Σx)', c: 'exponential attenuation through matter',
      k: ['attenuation', 'shielding', 'half-thickness', 'uncollided'] },
    { e: 'σ = √N', c: 'Poisson counting uncertainty, and why precision costs time',
      k: ['counting statistics', 'poisson', 'fractional uncertainty', 'square root of the number'] },
    { e: 'I ∝ 1 / r²', c: 'inverse-square fall-off of radiation intensity',
      k: ['inverse-square', 'inverse square'] },
  ],

  planetary_defense: [
    { e: 'θ = s / d', c: 'the small-angle formula — angular size to physical size',
      k: ['small-angle', 'small angle', 'angular width', 'arcsecond', 'angular size'] },
    { e: 'd = baseline / parallax angle', c: 'distance from a parallax shift',
      k: ['parallax', 'baseline'] },
    { e: 'F = L / 4πd²', c: 'inverse-square brightness, and the size–albedo degeneracy',
      k: ['inverse-square', 'inverse square', 'absolute magnitude', 'apparent magnitude', 'albedo'] },
    { e: 'KE = ½mv²', c: 'impact energy, and why speed dominates it',
      k: ['kinetic energy', 'impact energy', 'megaton'] },
    { e: 'p = mv', c: 'momentum, and momentum transfer in a deflection',
      k: ['momentum', 'velocity change', 'deflect'] },
    { e: 'v² = v∞² + v_esc²', c: 'gravitational focusing of impact speed',
      k: ['gravitational focusing', 'impact velocity', 'escape velocity'] },
    { e: 'v = √(GM / r)', c: 'orbital speed, and the energy that goes with it',
      k: ['orbital speed', 'vis-viva', 'orbital energy', 'semi-major'] },
    { e: 'Δλ / λ = v / c', c: 'Doppler shift as a line-of-sight speed',
      k: ['doppler', 'radial velocity', 'line-of-sight speed'] },
    { e: 'E[X] = Σ p·x', c: 'expected value — a consequence weighted by its probability',
      k: ['expected value', 'expectation', 'probability of impact', 'expected consequence'] },
    { e: 'λ_max T = b', c: "Wien's law — a temperature read off a thermal spectrum",
      k: ['thermal emission', 'infrared temperature', 'blackbody', 'wien'] },
  ],

  outbreak_riverton: [
    { e: 'Rₑ = R₀ × S', c: 'effective reproduction number against a susceptible fraction',
      k: ['reproduction number', 'r0', 'effective reproduction', 'secondary cases'] },
    { e: 'N(t) = N₀ · 2^(t/T_d)', c: 'exponential growth from a doubling time',
      k: ['doubling time', 'exponential growth', 'doubling'] },
    { e: 'sensitivity = TP / (TP+FN)', c: 'and specificity = TN / (TN+FP) — what a test misses',
      k: ['sensitivity', 'specificity', 'false negative', 'false positive'] },
    { e: 'PPV = (prev·sens) / (prev·sens + (1−prev)(1−spec))', c: 'why a good test fails at low prevalence',
      k: ['predictive value', 'prevalence', 'positive predictive'] },
    { e: 'risk = events / people at risk', c: 'and NNT = 1 / (control risk − treated risk)',
      k: ['number needed to treat', 'absolute risk', 'relative risk', 'attack rate', 'people at risk'] },
    { e: 'CFR = deaths / cases', c: 'case fatality, and what its denominator hides',
      k: ['case fatality', 'fatality rate'] },
    { e: 'pH = pKa + log([A⁻]/[HA])', c: 'Henderson–Hasselbalch — buffering in a body',
      k: ['henderson', 'buffer', 'pka', 'buffering'] },
  ],

  bring_them_home: [
    { e: 'v = v₀ + at, x = x₀ + v₀t + ½at²', c: 'kinematics at constant acceleration',
      k: ['kinematic', 'constant acceleration', 'free fall', 'displacement'] },
    { e: 'F = ma', c: "Newton's second law",
      k: ['net force', 'newton', 'force on the'] },
    { e: 'W = Fd, KE = ½mv²', c: 'work, kinetic energy and conservation of energy',
      k: ['work done', 'kinetic energy', 'conservation of energy', 'potential energy', 'energy stored'] },
    { e: 'J = FΔt = Δp', c: 'impulse as the change in momentum',
      k: ['impulse', 'momentum'] },
    { e: 'τ = rF', c: 'torque about an axis, and rotational equilibrium',
      k: ['torque', 'lever arm', 'moment of inertia'] },
    { e: 'a_c = v² / r', c: 'centripetal acceleration in circular motion',
      k: ['centripetal', 'circular motion'] },
    { e: 'T = 2π√(m/k)', c: 'the period of a simple harmonic oscillator, and resonance',
      k: ['harmonic', 'resonance', 'stiffness'] },
    { e: 'P = IV = I²R', c: 'electrical power, and an energy budget over time',
      k: ['power dissipated', 'power drawn', 'resistance', 'current'] },
    { e: 'Q = mcΔT', c: 'heat against a temperature change and a heat capacity',
      k: ['heat capacity', 'temperature drop', 'specific heat'] },
    { e: 'v = fλ', c: 'wave speed, frequency and wavelength',
      k: ['wavelength', 'frequency'] },
  ],

  deepwatch: [
    { e: 'v = fλ', c: 'wave speed, frequency and wavelength',
      k: ['wavelength', 'frequency', 'speed of sound'] },
    { e: 'Δf / f = v / c', c: 'Doppler shift as a closing speed',
      k: ['doppler', 'closing speed', 'frequency shift'] },
    { e: 'dB = 10·log₁₀(P/P₀)', c: 'the decibel, and why 3 dB is a doubling',
      k: ['decibel', 'db!', 'logarithmic scale'] },
    { e: 'SL − 2TL + TS − NL ≥ DT', c: 'the sonar equation as a detection budget',
      k: ['sonar equation', 'source level', 'transmission loss', 'noise level', 'detection threshold'] },
    { e: 'sinθ₁ / v₁ = sinθ₂ / v₂', c: "Snell's law — why sound bends at a layer",
      k: ['refract', 'snell', 'sound speed profile', 'the layer'] },
    { e: 'd = ½vt', c: 'echo ranging on a two-way travel time',
      k: ['round trip', 'echo', 'two-way', 'ranging'] },
    { e: 'p = ρgh', c: 'hydrostatic pressure with depth',
      k: ['hydrostatic', 'pressure at depth', 'pressure increases with'] },
    { e: 'F_b = ρVg', c: 'Archimedes — buoyancy from displaced volume',
      k: ['buoyan', 'archimedes', 'displaced'] },
    { e: 'f_beat = |f₁ − f₂|', c: 'beats between two close frequencies',
      k: ['beat frequency', 'beats', 'interference'] },
    { e: 'PV = nRT', c: 'the gas law behind a life-support margin',
      k: ['gas law', 'partial pressure', 'nrt'] },
  ],

  // Written for grade 2, so this list is not the senior-high kind. There is no
  // equation an eight-year-old has to be able to write down; there are four
  // arithmetic relationships the questions genuinely turn on, and claiming more
  // would be inventing a syllabus this game never promised.
  hospital: [
    { e: 'beats in a minute = beats in 15 seconds × 4', c: 'scaling a short count up to a rate',
      k: ['fifteen seconds', 'beats in', 'pulse'] },
    { e: 'breaths in a minute = breaths in 15 seconds × 4', c: 'the same scaling for breathing',
      k: ['breaths in', 'breathing rate', 'breaths a minute'] },
    { e: 'how far behind = what is needed − what was taken', c: 'a running deficit',
      k: ['how much more', 'needs', 'drank', 'behind'] },
    { e: 'change each hour = total change ÷ hours taken', c: 'a rate from a change and a time',
      k: ['each hour', 'per hour', 'how fast it changed'] },
  ],
};

/**
 * Which questions address each equation the course has to teach.
 *
 * `pages` is one entry per question: `{ text, formula, group }`, where `text` is
 * everything the question says and `formula` is only the estimate's own
 * `relationship`, template and worked solution. The split is the whole point —
 * `computes` means a question got a number out of it, `mentions` means the words
 * appeared. A gap is neither.
 */
export function equationCoverage(theme, pages = [], hit = defaultHit){
  const list = EQUATIONS[theme] ?? EQUATIONS[String(theme).replace(/_/g, '-')] ?? [];
  return list.map((eq, i) => {
    const computes = [], mentions = [];
    pages.forEach((p, n) => {
      const strong = p.formula && eq.k.some(k => hit(p.formula, k));
      if(strong) computes.push(n + 1);
      else if(eq.k.some(k => hit(p.text, k))) mentions.push(n + 1);
    });
    return { n: i + 1, e: eq.e, c: eq.c, computes, mentions };
  });
}

/** The same two-kinds-of-phrase rule the concepts use, so both agree. */
function defaultHit(hay, phrase){
  const exact = phrase.endsWith('!') || phrase.replace(/!$/, '').trim().length <= 3;
  const w = phrase.replace(/!$/, '').toLowerCase().trim();
  const e = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${e}${exact ? '([^a-z0-9]|$)' : ''}`, 'i').test(hay);
}

// ---------------------------------------------------------------- matching
//
// Whether the syllabus claims a word is asked in two places — `jargonSweep`
// sorts its queue by it, and `import-book` stamps `core` on the glossary terms
// it claims — so the rule lives here, next to the claim it is testing.
import { COMMON, PREFIXES, stems, ordinary, norm } from './common-words.mjs';

const wordsOf = (s) => String(s ?? '').match(/[A-Za-z][A-Za-z0-9'’\/]*/g) ?? [];

/**
 * The syllabus, flattened: every string in a game's entry becomes an allowlist
 * word. Word by word over-claims — "activation energy" would hand "energy" a
 * licence it did not earn — so a single word counts only when it is technical on
 * its own.
 */
export function claimedWords(theme){
  const entry = SYLLABUS[theme] ?? SYLLABUS[String(theme).replace(/_/g, '-')] ?? null;
  const out = new Set();
  // A short key is not a weak one. "ph!", "mole", "flux!", "fix!" carry the bang
  // this file already uses for "match this word exactly", and a length rule
  // written for the long words dropped every one of them — so pH, the concept
  // thirteen of Riverton's fifteen days reason with, counted as claimed by
  // nothing at all. They go in a set of their own, matched whole.
  out.exact = new Set();
  const walk = (v) => {
    if(typeof v === 'string'){
      if(v.endsWith('!') || v.trim().length <= 4){
        const k = norm(v.replace(/!$/, '').trim());
        if(k) out.exact.add(k);
      }
      for(const w of wordsOf(v)){
        const k = norm(w);
        if(k.length >= 5 && !COMMON.has(k)) out.add(k);
      }
      return;
    }
    if(Array.isArray(v)){ v.forEach(walk); return; }
    if(v && typeof v === 'object'){ Object.values(v).forEach(walk); }
  };
  walk(entry);
  return out;
}

/**
 * The syllabus writes stems on purpose — "precipitat", "oxidis", "mass spectrom" —
 * so an exact match claims almost nothing. Two words share a root when one starts
 * the other, or when they agree for seven characters: long enough that
 * "electrochemical" finds "electrochemistry" and "detonators" finds "detonation
 * velocity", short enough that "electrically" still does not find "electrolysis".
 */
export function sharesRoot(a, b){
  if(a === b) return true;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  if(s.length >= 5 && l.startsWith(s)) return true;
  let i = 0;
  while(i < s.length && s[i] === l[i]) i++;
  return i >= 7;
}

// The candidate side needs stemming as much as the syllabus side does:
// "detonates" and "detonators" are the syllabus's "detonation velocity" with an
// ending on them, and an unstemmed comparison claims neither.
export const rootsOf = (key) => [key, key.replace(PREFIXES, ''), ...stems(key)].filter(w => w.length >= 5);

/** Does this game's syllabus claim this single word? */
export function claimsWord(theme, word, claimed = claimedWords(theme)){
  const key = norm(word);
  if(claimed.exact?.has(key)) return true;
  return rootsOf(key).some(w => [...claimed].some(c => sharesRoot(w, c)));
}

/**
 * And a phrase — a glossary term's name or one of its aliases. Ordinary words in
 * it prove nothing: "surrogate material" is claimed only if "surrogate" is.
 */
export function claimsPhrase(theme, phrase, claimed = claimedWords(theme)){
  return wordsOf(phrase).some(w => {
    const k = norm(w);
    if(claimed.exact?.has(k)) return true;
    return k.length >= 5 && !ordinary(k) && claimsWord(theme, k, claimed);
  });
}

export default SYLLABUS;
