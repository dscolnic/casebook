# Project Y — every question, with its answer

**Subject:** Nuclear physics and the Manhattan Project  
**Audience:** High school / undergraduate  
**Content source:** `project-y-fps/src`  
**Shape:** 15 missions × 3 authored stops = 45 questions. (In play the engine also inserts a callback stop from day 3, drawn from these same lessons.)

---

## Mission 1 — Read the atomic world

**Objective:** Build a shared language for nuclei, isotopes, and detector signals before any team begins advanced work.

### M1.1 — The nucleus as a physical system

**Format:** PROTOCOL · **Area:** T · **Place:** A theorist receives four unfamiliar nuclide labels and must extract the right quantity before doing any calculation.

**Scene shown to the player**

> Your first morning on the Hill, and the Theoretical Division hands you four nuclide labels with no explanation. Every atom keeps almost all of its mass in a nucleus of protons and neutrons: the proton count fixes which element it is, and changing the neutron count makes a different isotope of that same element. That distinction is the whole reason this site exists, because isotopes of one element behave alike chemically and can behave completely differently under neutron bombardment. Los Alamos is a place where people from five countries have to mean the same thing by a symbol before anybody calculates anything.

**Question**  Match each information need or situation to the best action, instrument, or control. Each option is used once.

**Situations to match**

- Need the number of protons
- Need the number of neutrons
- Need to decide whether two atoms are isotopes
- Need the net charge of a neutral atom

**Choices offered**

- Read atomic number Z.
- Compute A - Z.
- Compare Z while A differs.
- Set electron count equal to Z.

**Correct answer**

1. Need the number of protons  →  **Read atomic number Z.**
2. Need the number of neutrons  →  **Compute A - Z.**
3. Need to decide whether two atoms are isotopes  →  **Compare Z while A differs.**
4. Need the net charge of a neutral atom  →  **Set electron count equal to Z.**

**Why (shown in verdict):** The notation is useful only when each symbol is tied to a physical count.

**Takeaway:** Nuclear reasoning starts by translating notation into particles and conserved quantities.

### M1.2 — Isotopes and chemical identity

**Format:** PROTOCOL · **Area:** CM · **Place:** Match each question to the relevant property.

**Scene shown to the player**

> Chemistry and Metallurgy is being asked what it can and cannot deliver, and the answer turns on one fact. Isotopes of an element carry the same proton count and nearly the same electron structure, so they form the same compounds and respond to the same reagents — which means ordinary chemistry cannot tell them apart or pull them apart. Separating them takes advantage of the small mass difference instead, at enormous cost, at Oak Ridge and Hanford. Everything shipped here has both a chemical form and an isotopic composition, and a report that names only one of them is not a report.

**Question**  Match each information need or situation to the best action, instrument, or control. Each option is used once.

**Situations to match**

- Will two isotopes form similar chemical compounds?
- Will they have the same half-life?
- Can mass spectrometry distinguish them?
- Does atomic number determine the element?

**Choices offered**

- Yes: bonding is set by electron structure, which extra neutrons barely disturb.
- No: stability is set inside the nucleus and can differ by orders of magnitude.
- Yes: sorting by mass-to-charge ratio responds to exactly the difference chemistry ignores.
- Yes: the proton count fixes the electron structure and therefore the chemical identity.

**Correct answer**

1. Will two isotopes form similar chemical compounds?  →  **Yes: bonding is set by electron structure, which extra neutrons barely disturb.**
2. Will they have the same half-life?  →  **No: stability is set inside the nucleus and can differ by orders of magnitude.**
3. Can mass spectrometry distinguish them?  →  **Yes: sorting by mass-to-charge ratio responds to exactly the difference chemistry ignores.**
4. Does atomic number determine the element?  →  **Yes: the proton count fixes the electron structure and therefore the chemical identity.**

**Why (shown in verdict):** Chemical similarity does not imply identical nuclear behavior.

**Takeaway:** Materials work must track both chemical form and isotopic composition.

### M1.3 — Ionization and detector signals

**Format:** SEQUENCE · **Area:** P · **Place:** Order a generic detector chain.

**Scene shown to the player**

> The Physics Division cannot see a single neutron or alpha particle, and neither can anybody else. A detector works by catching what radiation does on its way through matter: energy deposited in a gas or a crystal is converted into electric charge or light, and the size and timing of that pulse is what an instrument records. Everything the Hill will claim about cross sections, backgrounds and yields rests on that conversion chain working in order. Get the chain wrong and you are not measuring radiation at all; you are measuring your own apparatus.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Radiation deposits energy in the sensitive material
- The material produces charge carriers or photons
- Electronics collect and amplify the response
- The data system digitizes and stores a pulse

**Correct answer**

1. **Radiation deposits energy in the sensitive material**
2. **The material produces charge carriers or photons**
3. **Electronics collect and amplify the response**
4. **The data system digitizes and stores a pulse**

**Why (shown in verdict):** Every detector requires both a physical transducer and a readout chain.

**Takeaway:** A detector measures the consequences of an interaction, not radiation directly.

---

## Mission 2 — Account for nuclear energy

**Objective:** Connect mass, binding energy, calibration, and the program’s competing early architectures.

### M2.1 — Mass defect and binding energy

**Format:** BALLPARK · **Area:** T · **Place:** A medium-heavy nucleus has about 200 nucleons and a mass defect of about 0.008 atomic mass units per nucleon.

**Scene shown to the player**

> A theorist at the blackboard wants a number before lunch. A bound nucleus weighs slightly less than the separate protons and neutrons that went into it, and that missing mass is the binding energy holding it together, connected by Einstein's relation between mass and energy. Because the conversion factor is the speed of light squared, a mass difference far too small to weigh becomes an energy far larger than any chemical reaction can produce. This arithmetic is the reason the laboratory is here at all, and every yield estimate on the Hill starts from it.

**Question**  Estimate the total binding energy in MeV.

**Givens**

- Mass defect is about 0.008 u per nucleon
- A nucleus of this size has about 200 nucleons
- 1 atomic mass unit corresponds to about 931 MeV

**Correct answer**

Equation shown: `E ≈ {0} × {1} × {2}`
Tiles offered: `0.008 u/nucleon`, `200 nucleons`, `931 MeV/u`, `8 u/nucleon`
Tiles that belong: `0.008 u/nucleon`, `200 nucleons`, `931 MeV/u`
Decoy tiles: `8 u/nucleon`
Formula: `a*b*c`
**Target: 1489.6 MeV** (tolerance ±80)
Explanation shown: A single medium-heavy nucleus is bound by roughly 1,500 MeV. Set that against the few electron-volts holding a chemical bond: the nuclear scale is something like a hundred million times larger per particle, which is the whole reason a nuclear device and a chemical explosive are not the same category of thing. The binding energy per nucleon here, about 7.5 MeV, is the quantity the curve plots on the next day.
Book's worked answer: About 1.5 x 10^3 MeV.

**Why (shown in verdict):** 0.008 x 200 x 931 is about 1,500 MeV, so a medium-heavy nucleus is bound by well over a thousand MeV.

**Takeaway:** Tiny changes in mass correspond to large nuclear energies.

### M2.2 — Pulse height and energy calibration

**Format:** SEQUENCE · **Area:** P · **Place:** Order the calibration workflow.

**Scene shown to the player**

> A spectrum is on the bench and somebody has written particle energies along the bottom of it. The instrument never measured energy: it measured the size of electrical pulses, and the axis is a claim that a particular pulse size corresponds to a particular deposited energy. That claim has to be established with sources of known energy before an unknown spectrum means anything. Los Alamos is about to make decisions from spectra taken on different instruments in different buildings, and an uncalibrated axis is a confident-looking way to compare two things that were never comparable.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Acquire spectra from known reference lines
- Locate peak channel positions
- Fit channel-to-energy relationship
- Apply the calibration to unknown peaks and propagate uncertainty

**Correct answer**

1. **Acquire spectra from known reference lines**
2. **Locate peak channel positions**
3. **Fit channel-to-energy relationship**
4. **Apply the calibration to unknown peaks and propagate uncertainty**

**Why (shown in verdict):** Unknown energies should not be interpreted before the channel scale is calibrated.

**Takeaway:** Calibration is a measured mapping, not a label pasted onto the x-axis.

### M2.3 — Two weapon architectures at Los Alamos

**Format:** PROTOCOL · **Area:** E · **Place:** Oppenheimer asks the Ordnance Division to classify the program consequences of the two early weapon concepts without using design dimensions.

**Scene shown to the player**

> Oppenheimer has asked Ordnance to lay out the program consequences of the two assembly concepts under consideration, without discussing any design dimensions. Both approaches aim at the same physical goal — bringing subcritical material together fast enough that a chain reaction can grow before the assembly blows itself apart — and they get there by completely different engineering routes. One is a linear problem with a long history in gun design; the other requires physics nobody has built before. The choice made here decides which divisions grow, what gets ordered, and what the site is doing for the next two years.

**Question**  Match each situation to the best action, control, document, or interpretation. Each option is used once.

**Situations to match**

- Engineers sketch a long device in which one subcritical piece would be driven into another along a single axis.
- Engineers sketch a compact device in which explosive waves would squeeze the material inward from every direction.
- Plutonium measurements show that a slower assembly could be interrupted by a stray neutron before full assembly.
- The alternative requires synchronized detonators, wave-shaping explosives, and repeated hydrodynamic tests before a nuclear trial.

**Choices offered**

- Use the gun-type concept: bring two separated subcritical pieces together rapidly along one line.
- Use the implosion concept: compress one piece inward with a nearly spherical converging pressure wave.
- Reject the plutonium gun program because its slower assembly leaves too much time for pre-initiation.
- Build an implosion-development program focused on timing, symmetry, diagnostics, and reproducible explosive components.

**Correct answer**

1. Engineers sketch a long device in which one subcritical piece would be driven into another along a single axis.  →  **Use the gun-type concept: bring two separated subcritical pieces together rapidly along one line.**
2. Engineers sketch a compact device in which explosive waves would squeeze the material inward from every direction.  →  **Use the implosion concept: compress one piece inward with a nearly spherical converging pressure wave.**
3. Plutonium measurements show that a slower assembly could be interrupted by a stray neutron before full assembly.  →  **Reject the plutonium gun program because its slower assembly leaves too much time for pre-initiation.**
4. The alternative requires synchronized detonators, wave-shaping explosives, and repeated hydrodynamic tests before a nuclear trial.  →  **Build an implosion-development program focused on timing, symmetry, diagnostics, and reproducible explosive components.**

**Why (shown in verdict):** The two concepts were not merely different shapes; they created different organizations, test programs, and engineering risks.

**Takeaway:** Weapon architecture determines the entire downstream engineering program.

---

## Mission 3 — Follow radioactivity through the laboratory

**Objective:** Treat decay as a quantitative process that must survive chemistry and background measurement.

### M3.1 — Radioactive decay law

**Format:** BALLPARK · **Area:** T · **Place:** A tracer with a 2-hour half-life starts at 10,000 nuclei and is left for a 6-hour shift.

**Scene shown to the player**

> A tracer sample has been sitting through a six-hour shift and somebody needs to know what is left in it. Radioactive decay is random for any single nucleus and completely predictable for a large population of them: in one half-life about half the original nuclei remain, in two about a quarter, regardless of how many you started with. That is what makes decay usable as a clock and as a correction. Every count taken at Los Alamos is a count of something that has been decaying since the moment it was made, and the shift length is part of the measurement.

**Question**  Estimate the number remaining.

**Givens**

- Each half-life leaves one-half of the previous amount
- A 6-hour wait is three 2-hour half-lives

**Correct answer**

Equation shown: `N ≈ {0} × ({1})^{2}`
Tiles offered: `10,000 nuclei`, `1/2`, `3 half-lives`, `30 half-lives`
Tiles that belong: `10,000 nuclei`, `1/2`, `3 half-lives`
Decoy tiles: `30 half-lives`
Formula: `a*Math.pow(b,c)`
**Target: 1250 nuclei** (tolerance ±80)
Explanation shown: Six hours at a two-hour half-life is three half-lives, not dozens: the number of half-lives is the elapsed time divided by the half-life. Each one halves the survivors, so three of them leave an eighth.
Book's worked answer: About 1,250 nuclei.

**Why (shown in verdict):** 10,000 x (1/2)^3 = 1,250.

**Takeaway:** Half-life is a population statement produced by random individual decays.

### M3.2 — Radiochemical tracers

**Format:** BALLPARK · **Area:** CM · **Place:** A process begins with 5,000 tracer counts per minute and, once corrected for decay during the separation, recovers 4,000 counts per minute.

**Scene shown to the player**

> Chemistry and Metallurgy is running separations on quantities of material too small to weigh, and needs to know how much is being lost along the way. A radiochemical tracer is a small amount of radioactive material that travels with the chemistry and announces where it went through its own radiation. It turns an invisible loss into a measurable fraction — provided the counts before and after are corrected for the decay that happened during the separation itself. The material this process handles is among the scarcest on earth, and every percent lost is weeks of production at Hanford.

**Question**  Estimate the chemical yield.

**Givens**

- Chemical yield = recovered signal / initial signal
- The recovered count must be decay-corrected before it is compared

**Correct answer**

Equation shown: `yield ≈ ({0} ÷ {1}) × 100`
Tiles offered: `4,000 recovered counts`, `5,000 initial counts`, `400 recovered counts`, `50,000 initial counts`
Tiles that belong: `4,000 recovered counts`, `5,000 initial counts`
Decoy tiles: `400 recovered counts`, `50,000 initial counts`
Formula: `a/b*100`
**Target: 80 %** (tolerance ±3)
Explanation shown: Four-fifths recovered means a fifth of the target is somewhere else — on glassware, in the discarded phase, or still in the residue — and that missing fifth has to be accounted for before the assay means anything. Note what the decay correction bought: without it the later count is lower simply because time passed, and the chemistry would be blamed for a loss it did not cause. A raw count rate is not a quantity of material.
Book's worked answer: About 80%.

**Why (shown in verdict):** Yield is what came out over what went in: 4,000 / 5,000 = 0.80, once both counts are corrected for the decay that happened during the separation itself.

**Takeaway:** A tracer turns invisible material loss into a measurable fraction.

### M3.3 — Background measurement

**Format:** DIAGNOSIS · **Area:** P · **Place:** You are deciding whether a weak sample is really emitting anything.

**Scene shown to the player**

> A weak sample has been counting for an hour and the question is whether it is emitting anything at all. A detector counts events with no sample present: cosmic rays, natural radioactivity in the walls and containers, and the electronics themselves all contribute. Subtracting a background is only meaningful when it was measured under the same conditions as the sample — same geometry, same shielding, same instrument, close enough in time that nothing has drifted. This is where an experimental group either establishes a real signal or convinces itself of one.

**Question**  Something in this room is producing counts. What is it?

**Panel headline**  A sample has been counting about 40% above the rate recorded last week. The group wants to log it as a genuine activity increase. Before that goes in the book, the counting station has been put through a short series of checks.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Sample stage | Gross count rate, sample in place | 138 counts/min | normal |
| Detector | Rate with the sample removed | 131 counts/min | normal |
| Room and shielding | Effect of extra lead around the detector | no measurable change | key |
| Electronics | Counts with detector high voltage off | 0 counts/min | key |
| Detector | Detector moved to a clean room, no sample | excess persists | normal |
| Room and shielding | Second identical detector, same room | normal rate | normal |
| Detector | Ten repeat measurements | all within 3% of each other | normal |

**Choices offered**

- The sample really is more active — _The material on the stage is emitting more than it was, and the counting station is reporting it correctly._
- Room background has risen — _Something stored nearby is raising the radiation level at this bench, so every measurement made here reads high._
- The detector or its holder is contaminated — _Loose activity has transferred onto the instrument itself, so it counts its own contamination wherever it goes._
- Electrical noise is being counted — _Instability in the bias supply or amplifier is producing pulses large enough to cross the threshold and be recorded as events._
- Nothing to explain — ordinary scatter — _Counting is a random process, and a run that lands high by chance needs no cause beyond the statistics._

**Correct answer**

**The detector or its holder is contaminated**

**Why (shown in verdict):** Measure the background with the instrument you will use, not just the room you will use it in.

**Takeaway:** Background subtraction is credible only when the background is measured under comparable conditions.

---

## Mission 4 — Measure interactions, not impressions

**Objective:** Learn how cross sections, counting statistics, and analytical yield turn observations into quantitative evidence.

### M4.1 — Reaction cross sections

**Format:** BALLPARK · **Area:** T · **Place:** A solid has number density n = 10^22 cm^-3, and the cross section is 1 barn = 10^-24 cm^2.

**Scene shown to the player**

> The Theoretical Division needs a reaction rate and has a cross section written in barns. A cross section is not the physical size of a nucleus; it is a way of expressing how likely an interaction is, given as an area so that it can be multiplied by how many targets a beam actually passes through. That is the step that turns a microscopic probability into something an experiment can compare against: probability per nucleus, times nuclei per volume, times the path. Nearly every number this laboratory argues about is built out of that multiplication.

**Question**  Estimate the macroscopic cross section and the mean free path.

**Givens**

- Sigma = n sigma
- Mean free path = 1/Sigma

**Correct answer**

Equation shown: `λ ≈ {0} ÷ ({1} × {2})`
Tiles offered: `1`, `10²² cm⁻³`, `10⁻²⁴ cm²`, `10⁶ cm²`
Tiles that belong: `1`, `10²² cm⁻³`, `10⁻²⁴ cm²`
Decoy tiles: `10⁶ cm²`
Formula: `a/(b*c)`
**Target: 100 cm** (tolerance ±15)
Explanation shown: Multiply the powers of ten first: n sigma is about 0.01 cm⁻¹, so the mean free path is around a metre. A barn-scale cross section makes solid matter surprisingly transparent to neutrons, which is why assemblies must be large or reflected.
Book's worked answer: Sigma is about 0.01 cm^-1; the mean free path is about 100 cm.

**Why (shown in verdict):** Multiply the powers of ten first, then invert the macroscopic cross section.

**Takeaway:** Cross section becomes experimentally useful when combined with the number of targets per volume.

### M4.2 — Poisson counting statistics

**Format:** BALLPARK · **Area:** P · **Place:** A run records 400 net counts with negligible background uncertainty.

**Scene shown to the player**

> A run has finished with four hundred net counts and somebody wants to know how well it is known. Radioactive decays arrive at random, so a repeat of the same run would not give the same total — and for counting like this the typical fluctuation grows like the square root of the number of counts. The practical consequence is harsh: halving the uncertainty means counting four times as long. Beam time, material and shift hours are all scarce here, so knowing what a longer run would actually buy is how experiments get planned rather than wished for.

**Question**  Estimate the fractional statistical uncertainty.

**Givens**

- Poisson standard deviation is about sqrt(N)
- Fractional uncertainty is sqrt(N)/N

**Correct answer**

Equation shown: `fractional uncertainty ≈ {0} ÷ √{1}`
Tiles offered: `1`, `400 counts`, `40 counts`, `4,000 counts`
Tiles that belong: `1`, `400 counts`
Decoy tiles: `40 counts`, `4,000 counts`
Formula: `a/Math.sqrt(b)`
**Target: 0.05 fraction** (tolerance ±0.006)
Explanation shown: 400 counts gives 5%. The scaling is what matters for planning: uncertainty falls as 1/√N, so halving it to 2.5% takes 1,600 counts — four times the run. Precision bought by counting longer gets expensive fast, which is why detector efficiency and background suppression are worth as much as extra hours.
Book's worked answer: About 5%.

**Why (shown in verdict):** sqrt(400)=20 and 20/400=0.05.

**Takeaway:** Four times as many counts are needed to cut statistical uncertainty in half.

### M4.3 — Analytical yield and purity

**Format:** DIAGNOSIS · **Area:** CM · **Place:** You are reconciling a separation batch whose numbers do not close.

**Scene shown to the player**

> A separation batch has come back and the numbers do not close. Three different quantities are being confused in the report: chemical yield, which is the fraction of target material recovered; radiochemical purity, which is the fraction of the measured activity that belongs to the species you wanted; and isotopic purity, which is the fraction of atoms of the right isotope. A batch can score well on one and badly on another, and each failure means something different upstream. Downstream, somebody is going to cast this material assuming the report meant what they thought it meant.

**Question**  The material left the process. Where did it go?

**Panel headline**  A separation reports 91% purity and a clean product, but the mass balance is short by about 6% of the input. The chemist would like to sign the batch record. Six checks are on the bench.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Material balance | Input minus all measured outputs | short by 6.1% | key |
| Process streams | Activity in the discarded aqueous phase | 0.4% of input | normal |
| Vessels and transfer | Activity swabbed from vessel walls | 5.8% of input | key |
| Assay and standards | Fraction of counts from the target isotope | 91% | normal |
| Assay and standards | Known reference source on the same counter | within 1.5% of certificate | normal |
| Material balance | Weighed product mass vs assayed mass | agree within 1% | normal |

**Choices offered**

- The separation did not finish — _Part of the target stayed in the phase that was discarded, so the loss should be sitting in a stream that was measured and thrown away._
- A contaminant came down with the product — _Another species precipitated alongside the target, adding mass that is not the element of interest and coating the vessel as it formed._
- The counting standard is mis-calibrated — _The instrument converts counts to quantity with the wrong factor, so the chemistry is fine and only the arithmetic is short._
- Target adsorbed onto the vessel walls — _The element plated out on glass and transfer lines, leaving the process by a route that no stream measurement covers._
- Nothing to explain — bookkeeping — _The gap is the accumulated rounding of several separately reported figures and does not correspond to missing material._

**Correct answer**

**Target adsorbed onto the vessel walls**

**Why (shown in verdict):** A yield figure is only as complete as the list of routes you measured.

**Takeaway:** Every materials report should state both quantity and quality.

---

## Mission 5 — Track neutrons through matter

**Objective:** Connect moderation, neutron detection, and the historical reason plutonium forced a different design path.

### M5.1 — Neutron energy and moderation

**Format:** PROTOCOL · **Area:** T · **Place:** Match each physical observation to the most relevant interaction idea.

**Scene shown to the player**

> A neutron leaving a fission event carries a great deal of energy, and what happens to it next depends entirely on what it hits. Neutrons lose energy by scattering off nuclei — light nuclei take a larger share per collision, the way a ball loses more energy hitting something of similar mass — and they are removed altogether by absorption. Those are two different processes with two different consequences, and a material that is good at one may be bad at the other. Confusing them is how a shielding calculation or a reactor lattice goes quietly wrong.

**Question**  Match each information need or situation to the best action, instrument, or control. Each option is used once.

**Situations to match**

- Neutron loses energy but remains a neutron
- Neutron disappears and a compound nucleus forms
- Direction changes with little energy loss
- A material slows neutrons efficiently through repeated collisions

**Choices offered**

- Identify elastic scattering: a neutron collides with a nucleus, transfers some energy, and continues as a neutron.
- Identify absorption: the neutron is captured and becomes part of a compound nucleus, so it no longer continues through the material.
- Expect scattering from a heavy nucleus: the neutron may change direction but usually gives up only a small fraction of its energy.
- Use repeated scattering from light nuclei to slow neutrons efficiently, because a light nucleus can take a larger share of the neutron’s energy.

**Correct answer**

1. Neutron loses energy but remains a neutron  →  **Identify elastic scattering: a neutron collides with a nucleus, transfers some energy, and continues as a neutron.**
2. Neutron disappears and a compound nucleus forms  →  **Identify absorption: the neutron is captured and becomes part of a compound nucleus, so it no longer continues through the material.**
3. Direction changes with little energy loss  →  **Expect scattering from a heavy nucleus: the neutron may change direction but usually gives up only a small fraction of its energy.**
4. A material slows neutrons efficiently through repeated collisions  →  **Use repeated scattering from light nuclei to slow neutrons efficiently, because a light nucleus can take a larger share of the neutron’s energy.**

**Why (shown in verdict):** Slowing, redirecting, and absorbing are different physical processes.

**Takeaway:** Energy management and neutron removal are not interchangeable.

### M5.2 — Neutron detection

**Format:** DIAGNOSIS · **Area:** P · **Place:** You are checking a neutron counter that reads well below prediction.

**Scene shown to the player**

> A neutron counter is reading well below prediction and nobody yet knows whether the physics or the instrument is at fault. Neutrons carry no charge, so they cannot ionise a detector directly the way an alpha particle does. Every neutron detector works indirectly: it first converts the neutron into something charged, or into light, or into a radioactive product that can be counted afterwards. Each conversion has its own efficiency and its own energy range. The measurement about to be built on this counter is one the whole plutonium programme depends on.

**Question**  Are the neutrons missing, or is the counter missing them?

**Panel headline**  A calibrated source should give roughly 1,200 counts per minute on this counter. It is reading 340. The source certificate is current and the geometry was set up from the drawing.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Detector | Measured rate | 340 counts/min | normal |
| Electronics | Pulse-height distribution | large population piled up just below the threshold | key |
| Independent check | Activation foil at the detector face | activity as predicted | normal |
| Source and path | Rate change when cadmium is inserted | change under 5% | key |
| Source and path | Rate against inverse-square check | follows 1/r² within 4% | normal |
| Detector | Five repeat runs | all within 4% | normal |

**Choices offered**

- The field has been slowed by nearby material — _Neutrons scattering off surrounding matter arrive with much lower energy, depositing less in the detector and producing smaller pulses._
- A layer between source and detector is absorbing them — _Hydrogenous or boron-loaded material in the path removes neutrons before they reach the detector, so fewer arrive at all._
- The discriminator threshold is set too high — _Real pulses of ordinary size are falling below the level at which the counter accepts an event, so genuine neutrons go unrecorded._
- The solid angle is smaller than assumed — _The real source-to-detector separation or alignment differs from the drawing, so the counter intercepts a smaller fraction than the prediction assumed._
- Nothing to explain — ordinary variation — _Day-to-day differences in a counting setup of this kind are large, and a single low reading does not need a cause._

**Correct answer**

**The discriminator threshold is set too high**

**Why (shown in verdict):** Before believing a low count, find one measurement that does not go through the electronics.

**Takeaway:** The best neutron detector depends on energy range, timing, and whether real-time data are required.

### M5.3 — Why plutonium required implosion

**Format:** PROTOCOL · **Area:** X · **Place:** Match each observation to its implication for the plutonium weapon program.

**Scene shown to the player**

> Measurements on reactor-produced plutonium have come back from the counters and the Ordnance Division has been called in. The material emits far more spontaneous neutrons than the gun concept was designed around, and a stray neutron arriving before the pieces are fully assembled starts the chain reaction early — releasing enough energy to blow the assembly apart before most of the material has reacted. This is called predetonation, and it is not a manufacturing defect that better workmanship can fix; it is a property of the material itself. What follows is the largest redirection of the programme so far.

**Question**  Match each situation to the best action, control, document, or interpretation. Each option is used once.

**Situations to match**

- Reactor-produced plutonium contains isotopic components with a higher spontaneous-neutron background.
- A comparatively slow assembly remains vulnerable to an early neutron.
- An early chain reaction can disrupt the assembly before the intended state is reached.
- Los Alamos therefore reorganizes around rapid, symmetric compression.

**Choices offered**

- Measure the plutonium’s spontaneous-neutron background, because reactor-produced material contains isotopes that emit random neutrons.
- Recognize the timing problem: a slower assembly gives a stray neutron more opportunity to start the chain reaction too early.
- Predict pre-initiation: early fission releases energy before full assembly and disrupts the material, producing a much weaker result.
- Shift to rapid implosion, which compresses the material from all sides and shortens the vulnerable assembly time.

**Correct answer**

1. Reactor-produced plutonium contains isotopic components with a higher spontaneous-neutron background.  →  **Measure the plutonium’s spontaneous-neutron background, because reactor-produced material contains isotopes that emit random neutrons.**
2. A comparatively slow assembly remains vulnerable to an early neutron.  →  **Recognize the timing problem: a slower assembly gives a stray neutron more opportunity to start the chain reaction too early.**
3. An early chain reaction can disrupt the assembly before the intended state is reached.  →  **Predict pre-initiation: early fission releases energy before full assembly and disrupts the material, producing a much weaker result.**
4. Los Alamos therefore reorganizes around rapid, symmetric compression.  →  **Shift to rapid implosion, which compresses the material from all sides and shortens the vulnerable assembly time.**

**Why (shown in verdict):** The implosion program began as a response to measured plutonium behavior, not as a stylistic preference.

**Takeaway:** Material physics can determine the required system architecture.

---

## Mission 6 — Recognize the design pivot

**Objective:** Use neutron-background evidence to understand why one path was abandoned and inward compression became central.

### M6.1 — Spontaneous fission and neutron backgrounds

**Format:** BALLPARK · **Area:** T · **Place:** A sample emits spontaneous-fission neutrons at about 10^4 per second. A slow mechanical assembly takes about 10^-3 s; a fast one takes about 10^-6 s.

**Scene shown to the player**

> A sample on the bench is emitting neutrons all by itself, at a rate the counters can measure. Some heavy nuclei split spontaneously without absorbing anything first, producing a steady random background of neutrons. Whether that background matters depends entirely on how long the assembly spends in a state where one stray neutron could start something: a process lasting a thousandth of a second sees a thousand times as many chances as one lasting a millionth. Same source term, same material — and two completely different verdicts, which is what the arithmetic here is for.

**Question**  Estimate the neutrons expected during the slow assembly, then compare with the fast one.

**Givens**

- Expected events = rate x exposure time
- Slow assembly window = 10^-3 s
- Fast assembly window = 10^-6 s

**Correct answer**

Equation shown: `expected neutrons ≈ {0} × {1}`
Tiles offered: `10⁴ neutrons/s`, `10⁻³ s slow assembly`, `10⁻⁶ s fast assembly`, `10² neutrons/s`
Tiles that belong: `10⁴ neutrons/s`, `10⁻³ s slow assembly`
Decoy tiles: `10⁻⁶ s fast assembly`, `10² neutrons/s`
Formula: `a*b`
**Target: 10 neutrons** (tolerance ±1.5)
Explanation shown: Ten neutrons during assembly is not a risk of starting early, it is a certainty: the chain begins well before the pieces are together. Put the fast assembly time in instead and the same source gives 10⁻² neutrons — roughly a one-in-a-hundred chance. Nothing about the material changed; only the length of time it spent vulnerable did. That single factor of a thousand in assembly speed is the whole argument for abandoning the slow route.
Book's worked answer: About 10 neutrons for the slow assembly, against about 0.01 for the fast one.

**Why (shown in verdict):** The same source term is harmless or decisive depending only on how long the system stays vulnerable to it.

**Takeaway:** The same background source term is negligible or decisive depending on how long the system is exposed to it.

### M6.2 — Why Thin Man was abandoned

**Format:** SEQUENCE · **Area:** E · **Place:** Order the historical reasoning that turned an unexpected material result into a program-wide redesign.

**Scene shown to the player**

> Thin Man was the plutonium gun design, and a great deal of the site's effort was pointed at it. Then the counters returned a number for reactor plutonium's spontaneous-neutron rate that the concept could not survive, and within weeks the laboratory reorganised around an approach many people believed could not be engineered in time. This is what a measurement invalidating a development path actually looks like from inside: not a debate about opinion, but a chain of reasoning from one new fact to a decision that costs a year. Follow the chain in order.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Measure an unexpectedly high spontaneous-neutron background in reactor-produced plutonium.
- Recognize that a slow assembly could begin reacting before the intended configuration was reached.
- Conclude that the plutonium gun concept carried an unacceptable pre-initiation risk.
- Concentrate the plutonium effort on the faster implosion approach that became Fat Man.

**Correct answer**

1. **Measure an unexpectedly high spontaneous-neutron background in reactor-produced plutonium.**
2. **Recognize that a slow assembly could begin reacting before the intended configuration was reached.**
3. **Conclude that the plutonium gun concept carried an unacceptable pre-initiation risk.**
4. **Concentrate the plutonium effort on the faster implosion approach that became Fat Man.**

**Why (shown in verdict):** A materials measurement changed the viable weapon architecture and forced a major reorganization in 1944.

**Takeaway:** In complex engineering, one new measurement can invalidate an entire development path.

### M6.3 — From outward detonation to inward compression

**Format:** SEQUENCE · **Area:** X · **Place:** Order the high-level physical chain; no lens geometry or explosive recipe is included.

**Scene shown to the player**

> Ordinary high explosive detonates outward from wherever it was lit, and every intuition anybody on the Hill has about explosives comes from that. Implosion needs the opposite: a pressure wave that converges inward, arriving everywhere on the surface of the core at nearly the same instant so the material is compressed rather than squirted out of the gaps. Turning many outward-travelling waves into one inward-travelling shape is the central problem, and it is one of controlled convergence rather than of raw explosive power. Nobody has done it before, and Trinity is now waiting on it.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Initiate the approved outer high-explosive system at multiple controlled points.
- Shape and redirect the resulting waves toward the center.
- Drive an inward-moving pressure front through inert surrounding layers and the plutonium assembly.
- Increase density rapidly enough to change the neutron-balance condition before expansion begins.

**Correct answer**

1. **Initiate the approved outer high-explosive system at multiple controlled points.**
2. **Shape and redirect the resulting waves toward the center.**
3. **Drive an inward-moving pressure front through inert surrounding layers and the plutonium assembly.**
4. **Increase density rapidly enough to change the neutron-balance condition before expansion begins.**

**Why (shown in verdict):** Implosion converts outward chemical-explosive energy into inward hydrodynamic motion.

**Takeaway:** The central challenge is controlled convergence, not simply a larger explosion.

---

## Mission 7 — Understand matter under compression

**Objective:** Connect equations of state, material phases, and wave shaping without jumping directly to a full system.

### M7.1 — Equations of state

**Format:** BALLPARK · **Area:** T · **Place:** A notional sample experiences an average pressure of 5 x 10^9 Pa while its volume decreases by 2 x 10^-6 m^3.

**Scene shown to the player**

> The Theoretical Division is calculating work done on a material at pressures nothing in the laboratory has ever measured. An equation of state ties together pressure, density, temperature and internal energy for a substance — and the familiar handbook values, all taken at room conditions, describe a completely different regime from the one implosion creates. That is why extreme-state work is so unforgiving: the thermodynamic relationship has to be right, and so does every unit conversion carrying it across many orders of magnitude. An error in either place looks exactly like an error in the physics.

**Question**  Estimate the work scale.

**Givens**

- Work scale is pressure x volume change

**Correct answer**

Equation shown: `work ≈ {0} × {1}`
Tiles offered: `5×10⁹ Pa`, `2×10⁻⁶ m³`, `5×10⁶ Pa`, `2×10⁻⁴ m³`
Tiles that belong: `5×10⁹ Pa`, `2×10⁻⁶ m³`
Decoy tiles: `5×10⁶ Pa`, `2×10⁻⁴ m³`
Formula: `a*b`
**Target: 10000 J** (tolerance ±1200)
Explanation shown: Gigapascal pressure acting on a few cubic centimetres is kilojoule-scale work. That number sets the bar for whatever drives the compression: it has to deliver at least this much into the sample. It is also why chemical explosive, at a few megajoules per kilogram, is a credible driver at this scale — the energy is available, the difficulty is delivering it symmetrically.
Book's worked answer: About 1 x 10^4 J.

**Why (shown in verdict):** 5 x 10^9 x 2 x 10^-6 = 10^4 joules.

**Takeaway:** Extreme-state calculations require both thermodynamic relationships and careful unit scaling.

### M7.2 — Phase diagrams

**Format:** DIAGNOSIS · **Area:** CM · **Place:** You are explaining a microstructure the phase diagram does not predict.

**Scene shown to the player**

> A metallurgist has a microstructure under the microscope that the phase diagram says should not be there. A phase diagram maps which solid and liquid phases are stable at each combination of temperature and composition, and crossing a boundary can melt a material, precipitate a second phase, or change its mechanical properties entirely. Plutonium is notorious for this, with several solid phases and large volume changes between them. Everything the laboratory does with this metal — casting it, machining it, alloying it — is an argument with a phase diagram that was drawn from very little data.

**Question**  The equilibrium map does not predict this structure. What did the metal experience that the map does not describe?

**Panel headline**  A cast part has come back from metallography with two phases where the diagram says there should be one at this composition and temperature. It is measurably harder than the last five castings. The diagram is not wrong, so something about this casting is not what was assumed.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Metallography | Etched microstructure | two distinct phases | key |
| Metallography | Bulk hardness | 31% above the recent average | key |
| Chemical assay | Bulk composition assay | all major elements on specification | normal |
| Process record | Thermocouple cooling record | within the normal band throughout | normal |
| Diffraction | X-ray diffraction phase identification | a second equilibrium phase, not a metastable one | normal |
| Chemical assay | Trace element assay | one trace element at 9x its usual level | normal |
| Metallography | Re-prepared and re-etched specimen | second phase still present | normal |

**Choices offered**

- Cooled too fast — a metastable phase was retained — _Rapid cooling denied the metal time to reach equilibrium, freezing in a structure the diagram only predicts at higher temperature._
- Composition is off specification — _The alloy is not where the drawing says it is, so it sits in a two-phase field of the diagram and a second phase is the correct equilibrium answer._
- A trace impurity stabilised an extra phase — _An element present in small quantity shifted the local phase boundary, making a second phase stable at a composition the diagram treats as single-phase._
- Slow freezing let the composition segregate — _Solute rejected ahead of the freezing front concentrated in the last liquid, so parts of the casting have a different local composition from the bulk._
- Nothing to explain — a preparation artifact — _The apparent second phase is a product of polishing or etching rather than a feature of the metal._

**Correct answer**

**A trace impurity stabilised an extra phase**

**Why (shown in verdict):** A phase diagram describes one composition. Verify you still have that composition before doubting the map.

**Takeaway:** Composition and temperature jointly determine which phases are possible.

### M7.3 — What an explosive lens does

**Format:** PROTOCOL · **Area:** X · **Place:** Match each lens-program question to the relevant physics or engineering idea.

**Scene shown to the player**

> The lens programme has been given the problem of shaping a detonation front, and the name is a deliberate analogy. An optical lens bends light by making it travel at different speeds through different materials; an explosive lens combines explosives with different detonation velocities so that a front crossing the interfaces is reshaped. The analogy is what makes the idea communicable, and it is also where it becomes dangerous: detonation is violent, nonlinear and irreversible in a way light is not, and every part of the analogy has to be earned against real firing data.

**Question**  Match each situation to the best action, control, document, or interpretation. Each option is used once.

**Situations to match**

- Different regions of the assembly transmit the detonation wave at different speeds.
- Interfaces are shaped so different paths reach the desired wavefront together.
- Segment boundaries and material variation can distort the wave.
- Diagnostics must determine whether the wave is converging symmetrically.

**Choices offered**

- Use the contrast in detonation velocity: the wave travels at different speeds through the two explosive materials.
- Shape the material boundary so faster and slower paths combine into the desired inward-curving wavefront.
- Control manufacturing and segment interfaces because gaps or property variations distort the wave as it crosses the lens.
- Measure hydrodynamic symmetry with timing, radiography, or density diagnostics to see whether the wave converges evenly.

**Correct answer**

1. Different regions of the assembly transmit the detonation wave at different speeds.  →  **Use the contrast in detonation velocity: the wave travels at different speeds through the two explosive materials.**
2. Interfaces are shaped so different paths reach the desired wavefront together.  →  **Shape the material boundary so faster and slower paths combine into the desired inward-curving wavefront.**
3. Segment boundaries and material variation can distort the wave.  →  **Control manufacturing and segment interfaces because gaps or property variations distort the wave as it crosses the lens.**
4. Diagnostics must determine whether the wave is converging symmetrically.  →  **Measure hydrodynamic symmetry with timing, radiography, or density diagnostics to see whether the wave converges evenly.**

**Why (shown in verdict):** The lens is analogous to an optical element only in the broad sense that it reshapes a wavefront.

**Takeaway:** A conceptual analogy must still be tested against the actual nonlinear physics.

---

## Mission 8 — Make symmetry measurable

**Objective:** Turn a qualitative demand for symmetry into calibrated timing evidence and an engineering requirement.

### M8.1 — Arrival-time symmetry metric

**Format:** BALLPARK · **Area:** X · **Place:** Four inert diagnostic channels report classroom values; these are not actual device timings.

**Scene shown to the player**

> Symmetry is easy to demand and hard to prove, and the X Division has been told to make it a number. If a converging wave reaches one part of the assembly before another, the compression is lopsided, so the practical metric is the spread in arrival times measured at several points around the assembly. Note what that means statistically: an average arrival time can look perfect while the individual channels disagree wildly. It is the distribution that matters, which is why one number is never enough. These diagnostic values are classroom figures, not device timings.

**Question**  Compute spread as a percentage of the mean.

**Givens**

- Arrival times: 100, 101, 99, and 100 arbitrary units
- Mean arrival time = 100
- Spread = maximum - minimum

**Correct answer**

Equation shown: `spread ≈ ({0}−{1}) ÷ {2} × 100`
Tiles offered: `101 high reading`, `99 low reading`, `100 mean reading`, `1,000 mean reading`
Tiles that belong: `101 high reading`, `99 low reading`, `100 mean reading`
Decoy tiles: `1,000 mean reading`
Formula: `(a-b)/c*100`
**Target: 2 %** (tolerance ±0.15)
Explanation shown: Two units of spread on a mean of 100 is 2%. Expressing it as a percentage rather than an absolute is what makes it a metric: channels with different gains, and shots at different absolute levels, can all be judged against one tolerance. An absolute spread of two units means nothing until you know whether the mean was 100 or 1,000 — which is exactly what the fourth tile is there to catch.
Book's worked answer: Spread = 2 units, or 2 percent of the mean.

**Why (shown in verdict):** A single average can look perfect while hiding asymmetry among channels.

**Takeaway:** Symmetry requires comparing the distribution, not only its mean.

### M8.2 — Timing calibration

**Format:** DIAGNOSIS · **Area:** P · **Place:** You are finding out why a timing array disagrees with itself.

**Scene shown to the player**

> A timing array is disagreeing with itself, and until that is settled no symmetry claim from it means anything. Every channel has to share one clock and have its own delays known: cable length adds time, an electronic threshold shifts when a pulse is registered, and a larger pulse crosses a threshold sooner than a smaller one even when the physical event was simultaneous. All of that is instrument, not physics. The Hill is about to spend months measuring differences of nanoseconds, and a channel with an uncalibrated delay will produce a beautiful, repeatable, wrong answer.

**Question**  Every channel sees the same event. What is different about what each one reports?

**Panel headline**  Eight channels watching one event report arrival times spread over 14 ns when the array is specified to 4. An independent clock cross-check came back clean, so the reference itself is sound. The spread is in the array.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Channel array | Channel-to-channel arrival spread | 14 ns | key |
| Time reference | Independent clock cross-check | agrees within 0.3 ns | key |
| Channel array | Shape of the disagreement | scattered across channels, no single outlier | normal |
| Discriminators | Apparent time against pulse height | no correlation | normal |
| Cable plant | Measured cable lengths | all matched within 5 cm | normal |
| Discriminators | Identical test pulses injected at the inputs | all channels align within 1 ns | normal |
| Channel array | Per-channel distribution width | broad on every channel | normal |

**Choices offered**

- The shared reference has shifted — _One common time reference feeds every channel, so an error there moves all of them by the same amount and cancels in channel-to-channel differences._
- Time walk at the discriminators — _A fixed threshold is crossed earlier by a steeper leading edge, so recorded time depends on pulse amplitude even when the events are simultaneous._
- One channel has a longer signal path — _Extra cable on a single channel adds a fixed delay to that channel only, leaving the others correct._
- Random jitter at the threshold — _Noise riding on the signal moves the moment each pulse crosses the threshold, scattering arrival times symmetrically around the true value._
- Nothing to explain — inside tolerance — _An array of this size is expected to disagree at this level, and the spread does not warrant investigation._

**Correct answer**

**Random jitter at the threshold**

**Why (shown in verdict):** A fixed error can be calibrated out. A random one has to be engineered out.

**Takeaway:** Timing systems require both a common reference and channel-by-channel calibration.

### M8.3 — Why simultaneity became an engineering requirement

**Format:** BALLPARK · **Area:** E · **Place:** This exercise uses generic signal-cable values and does not state an actual Fat Man tolerance.

**Scene shown to the player**

> Many detonators have to act so nearly together that their separate waves merge into one inward-moving shape, and that turns a physics requirement into a hardware specification with a number attached. A small delay at one point does not produce a slightly worse implosion; it produces an asymmetric one. So simultaneity stops being a matter of setting clocks and becomes a physical interface problem: cables, capacitors, switches and firing units all contribute time, and all of it has to be accounted for. The values in this exercise are generic, not an actual tolerance.

**Question**  Estimate the delay difference.

**Givens**

- Signal speed in cable = 2.0 x 10^8 m/s
- Two cable paths differ by 0.40 m
- Delay difference = path difference / signal speed

**Correct answer**

Equation shown: `delay ≈ ({0} ÷ {1}) × {2}`
Tiles offered: `0.4 m path mismatch`, `2×10⁸ m/s signal speed`, `10⁹ ns/s`, `2×10⁶ m/s signal speed`
Tiles that belong: `0.4 m path mismatch`, `2×10⁸ m/s signal speed`, `10⁹ ns/s`
Decoy tiles: `2×10⁶ m/s signal speed`
Formula: `a/b*c`
**Target: 2 ns** (tolerance ±0.25)
Explanation shown: 0.4 m of extra cable is 2 ns of delay. That is the number that turns "fire together" into an inspectable requirement: nobody measures simultaneity directly on a rack, but anyone can measure cable. Signals move at about two-thirds the speed of light in cable, so roughly every 20 cm costs a nanosecond — a rule worth carrying to the bench.
Book's worked answer: Delta t = 0.40/(2.0 x 10^8) = 2 x 10^-9 s, or 2 ns.

**Why (shown in verdict):** Even ordinary-looking path differences can matter when a system depends on coordinated arrival times.

**Takeaway:** Timing synchronization is a physical interface, not merely a clock-setting problem.

---

## Mission 9 — Build evidence with real materials

**Objective:** Use mechanical properties, inert mockups, and high-speed imaging to test a difficult system safely.

### M9.1 — Mechanical properties

**Format:** DIAGNOSIS · **Area:** CM · **Place:** You are running the failure analysis on a component that broke in service.

**Scene shown to the player**

> A component has failed in service and the failure analysis has landed on your bench. Four different properties are involved and they are not synonyms: elastic modulus is stiffness, yield strength is where permanent deformation begins, hardness is resistance to indentation, and toughness is how much energy the material absorbs before it fractures. A material can be hard and brittle, or soft and very tough. Choosing the wrong one of these as "strong" is how a part that passed every specification arrives cracked, and this programme cannot spare either the material or the weeks.

**Question**  The material was qualified for this load. What made this part different from the coupon that qualified it?

**Panel headline**  A machined component failed under a load it was qualified for. It broke cleanly, with no visible bending. The material certificate is in order and the part passed dimensional inspection before installation.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Fracture surface | Fracture surface appearance | flat cleavage facets, no shear lip | normal |
| Geometry | Permanent deformation near the break | none measurable | normal |
| Surface condition | Surface hardness vs bulk hardness | surface 44% harder than bulk | key |
| Fracture surface | Crack origin location | at the machined surface | key |
| Load history | Load history | single steady application | normal |
| Geometry | Dimensions before failure | within drawing tolerance | normal |

**Choices offered**

- The material itself was too brittle — _The bulk material had insufficient toughness for the application, so it separated without absorbing energy anywhere the stress was highest._
- Loaded past its yield strength — _The applied load exceeded the stress at which the material deforms permanently, so the part changed shape before it gave way._
- Progressive cracking under cyclic load — _Repeated loading grew a crack from the surface over many cycles until the remaining section could no longer carry the load._
- Machining damaged the surface layer — _Cutting heat transformed and hardened a thin surface layer, creating a brittle skin that cracked first and handed a running crack to sound material underneath._
- Nothing to explain — damaged before installation — _The part was knocked or dropped in transit, and the break reflects that damage rather than anything about the material or the process._

**Correct answer**

**Machining damaged the surface layer**

**Why (shown in verdict):** A part is only as good as the property you did not inspect.

**Takeaway:** Strength, stiffness, hardness, and toughness should not be treated as synonyms.

### M9.2 — Mockups, trainers, and inert assemblies

**Format:** DIAGNOSIS · **Area:** E · **Place:** You are deciding whether an inert trial found a real effect or an artifact of the mockup.

**Scene shown to the player**

> An inert trial has produced an effect, and the question is whether it belongs to the physics or to the mockup. Mockups exist so that scarce and hazardous components are not spent answering cheap questions: a dimensional mockup checks whether things fit, a drop article checks flight behaviour, an electrical trainer checks the firing circuit. Each preserves some parts of reality and deliberately abandons others. The discipline is to use the simplest article that still contains the physics of your question — and to know exactly which physics you gave up.

**Question**  A mockup can only answer the question its materials and instruments preserve. Did this one preserve it?

**Panel headline**  An inert assembly trial returns an arrival time 8% later than predicted. The radiograph shows the assembly in the geometry it was designed to have. The team is split on whether this is a finding or a defect in the test.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Timing | Measured vs predicted arrival time | 8% late | key |
| Radiography | Radiographic geometry at time of arrival | as designed | key |
| Recovered hardware | Condition of recovered hardware | intact, no witness marks | normal |
| Materials certification | Surrogate material certificate | density and sound speed within 1% of the material it stands in for | normal |
| Recovered hardware | Fixture witness marks | clean | normal |
| Timing | Agreement between independent channels | three channels agree within 1% | normal |
| Materials certification | Discrepancy against surrogate density ratio | independent of the density ratio | normal |
| Timing | Second identical shot | reproduces within 1% | normal |

**Choices offered**

- The surrogate material does not behave like the real one — _The stand-in material responds differently under load, so the trial is measuring the surrogate rather than the article the model describes._
- The test fixture constrained the assembly — _The rig held or contacted the assembly during the event, so part of what was measured belongs to the fixture and not to the design._
- A diagnostic channel is misreporting — _The timing chain has a fault or a lost fiducial, so the discrepancy is in the record rather than in the event._
- The model is missing a real effect — _The assembly genuinely behaves this way and the prediction omits a mechanism that matters at this scale._
- Nothing to explain — inside declared tolerance — _The trial declared a tolerance wide enough to contain this difference, so no discrepancy requires explanation._

**Correct answer**

**The model is missing a real effect**

**Why (shown in verdict):** A mockup earns the right to contradict a model only after its own artifacts have been ruled out.

**Takeaway:** Use the simplest mockup that preserves the physics of the question.

### M9.3 — High-speed imaging and radiography

**Format:** BALLPARK · **Area:** P · **Place:** An object moves at 500 m/s during a 1 microsecond exposure.

**Scene shown to the player**

> Everything interesting during an implosion happens inside an opaque assembly in microseconds. High-speed photography and flash radiography are how the laboratory sees any of it, and both are limited by the same arithmetic: something moving at hundreds of metres per second travels a real distance during the exposure, and that distance is blur. Exposure time, viewing angle, penetration and synchronisation together decide what an image can and cannot establish. The photographs from these trials are going to be the evidence the design argument is settled with.

**Question**  Estimate the blur distance.

**Givens**

- Blur distance = speed x exposure time

**Correct answer**

Equation shown: `blur ≈ {0} × {1} × {2}`
Tiles offered: `500 m/s`, `10⁻⁶ s`, `1,000 mm/m`, `10⁻³ s`
Tiles that belong: `500 m/s`, `10⁻⁶ s`, `1,000 mm/m`
Decoy tiles: `10⁻³ s`
Formula: `a*b*c`
**Target: 0.5 mm** (tolerance ±0.06)
Explanation shown: 0.5 mm of blur. Whether that is acceptable is not a property of the camera but a comparison: blur has to be small against the feature being resolved. A boundary moving across a 5 mm gap is measurable at this exposure; a 0.5 mm perturbation is not measurable at all, because it is smeared into its own width. Shortening the exposure is the only lever that does not also cost signal.
Book's worked answer: 0.5 mm.

**Why (shown in verdict):** 500 x 10^-6 m = 5 x 10^-4 m.

**Takeaway:** Exposure time sets a direct spatial-blur limit for rapidly moving objects.

---

## Mission 10 — Synchronize many channels

**Objective:** Compare physical timescales, qualify initiation hardware, and coordinate many channels as one system.

### M10.1 — Competing timescales

**Format:** BALLPARK · **Area:** T · **Place:** A shock front crosses a generic assembly at about 8 x 10^3 m/s. Two initiation channels fire 0.5 microseconds apart. These are classroom values, not a Fat Man specification.

**Scene shown to the player**

> Several clocks run at once during a nuclear explosion, and the whole design problem lives in the gaps between them. Neutron generations multiply on one timescale, the material compresses on another, and the assembly begins to blow itself apart on a third — and the device works only if multiplication outruns disassembly. Because these processes differ by many orders of magnitude, they cannot be handled by one calculation or one experiment; each needs its own treatment, and the interfaces between them are where the argument gets difficult. The figures here are classroom values.

**Question**  Estimate how far ahead the early side runs, in millimetres.

**Givens**

- Wave speed = 8 x 10^3 m/s
- Channel spread = 0.5 microseconds = 5 x 10^-7 s
- Lead distance = speed x time

**Correct answer**

Equation shown: `lead distance ≈ {0} × {1} × {2}`
Tiles offered: `8×10³ m/s wave speed`, `5×10⁻⁷ s channel spread`, `1,000 mm/m`, `5×10⁻⁵ s channel spread`
Tiles that belong: `8×10³ m/s wave speed`, `5×10⁻⁷ s channel spread`, `1,000 mm/m`
Decoy tiles: `5×10⁻⁵ s channel spread`
Formula: `a*b*c`
**Target: 4 mm** (tolerance ±0.5)
Explanation shown: Half a microsecond of disagreement puts one side of the front 4 mm ahead of the other — a visible dent in a convergence that was supposed to be spherical. The timing requirement is written in nanoseconds not because that is what the electronics can manage, but because that is how far the physics moves while the channels argue. Every timing contribution combined later gets judged against this millimetre-scale yardstick.
Book's worked answer: About 4 mm.

**Why (shown in verdict):** A timing error becomes a geometric error at the speed the wave travels, so sub-microsecond disagreement is millimetres of asymmetry.

**Takeaway:** Processes separated by many orders of magnitude often require different numerical or experimental treatments.

### M10.2 — Detonator development and lot acceptance

**Format:** CHOICE · **Area:** E · **Place:** The detonator program has three competing requests for its next 100 credits.

**Scene shown to the player**

> The detonator programme has three competing requests and enough credit for one hundred points of work. A detonator turns an electrical pulse into the start of an explosive wave, and for implosion the requirement is not that a good one exists but that every unit in a production lot fires within a very narrow spread of time. That makes this a manufacturing and statistics problem: lot acceptance samples a population and infers what the rest will do. A prototype champion tells you almost nothing about the units that will actually be used.

**Question**  The detonator programme can run one of these. Which?

**Choices offered**

- Sample several production lots and measure the timing distribution of each.
- Build one unit to the best achievable standard and fire it repeatedly.
- Tighten the drawing tolerances and re-inspect the parts dimensionally.
- Wait for the first full-system trial and judge the detonators from it.

**Correct answer**

**Sample several production lots and measure the timing distribution of each.**

**Why (shown in verdict):** Implosion does not need a good detonator; it needs every unit in a lot to fire inside a very narrow spread. That is a property of a manufactured population, and the only way to know it is to sample the population and look at the tail.

**Why the others do not hold**

- One unit fired repeatedly measures that unit. It says nothing about the next thirty off the line, which is what the device will be built from.
- Dimensional inspection catches parts outside the drawing. The requirement here is written in nanoseconds, and two parts inside the same tolerance can fire measurably apart.
- Waiting for the full-system trial makes every component a suspect at once when it disappoints, and there is one trial.

**Takeaway:** Reliability belongs to the manufactured population, not the prototype champion.

### M10.3 — Synchronizing many channels

**Format:** BALLPARK · **Area:** X · **Place:** Three independent timing contributions are a 2 ns shared trigger, 3 ns of cable delay, and 4 ns of diagnostic registration.

**Scene shown to the player**

> Dozens of detonators and diagnostic channels have to share one time reference, and the delays come from everywhere. The physical system contributes some, cable lengths contribute more, a trigger threshold shifts the moment a pulse is registered, and the recording instrument adds its own. Los Alamos handles this by building a timing budget: every contribution named, measured and added up, rather than assumed to be small. A budget that omits one term is how a system passes every individual check and still fails as a whole.

**Question**  Estimate sigma_total.

**Givens**

- Independent uncertainties combine in quadrature
- sigma_total = sqrt(2^2 + 3^2 + 4^2) ns
- Do not add signs, because these are uncertainty scales

**Correct answer**

Equation shown: `σ_total ≈ √({0}²+{1}²+{2}²)`
Tiles offered: `2 ns trigger`, `3 ns cable`, `4 ns recorder`, `12 ns linear sum`
Tiles that belong: `2 ns trigger`, `3 ns cable`, `4 ns recorder`
Decoy tiles: `12 ns linear sum`
Formula: `Math.sqrt(a*a+b*b+c*c)`
**Target: 5.385 ns** (tolerance ±0.3)
Explanation shown: Quadrature gives 5.4 ns, well under the 9 ns a straight sum predicts, because independent errors do not all peak together — and the 4 ns recorder term alone carries more than half the total variance, so it is the one worth attacking first. Then check the answer against what the front does with that time: at 8×10³ m/s, 5.4 ns is about 0.04 mm of lead. Comfortably inside a millimetre-scale symmetry limit, which a half-microsecond spread would not be.
Book's worked answer: sigma_total = sqrt(29), about 5.4 ns.

**Why (shown in verdict):** The largest contributor matters, but several smaller contributors also raise the total.

**Takeaway:** A timing budget must include the full measurement chain.

---

## Mission 11 — Build an uncertainty budget

**Objective:** Combine theoretical uncertainty, measurement covariance, and system-level evidence into one decision tool.

### M11.1 — Uncertainty propagation

**Format:** BALLPARK · **Area:** T · **Place:** A predicted reaction rate has an 8% cross-section uncertainty and a 6% flux uncertainty.

**Scene shown to the player**

> A predicted reaction rate rests on a cross section known to a few per cent and a flux known to a few more, and Theory is being asked how well the prediction is known. Uncertainties do not simply add: for independent contributions they combine in quadrature, so the largest term dominates and small ones matter far less than intuition suggests. That has a practical consequence for a laboratory with limited people and time — improving a small term is wasted effort, and the first job of an uncertainty calculation is to say where the effort should go.

**Question**  Estimate the total fractional uncertainty.

**Givens**

- Independent fractional uncertainties combine in quadrature

**Correct answer**

Equation shown: `σ ≈ √({0}² + {1}²)`
Tiles offered: `8%`, `6%`, `14%`, `2%`
Tiles that belong: `8%`, `6%`
Decoy tiles: `14%`, `2%`
Formula: `Math.sqrt(a*a+b*b)`
**Target: 10 %** (tolerance ±0.6)
Explanation shown: Quadrature gives 10%, not the 14% of a straight sum: independent errors partly cancel. Note also that the larger component dominates — halving the 6% would move the total to about 8.5%, while halving the 8% would move it to 7.2%.
Book's worked answer: About 10%.

**Why (shown in verdict):** sqrt(8^2+6^2)=10.

**Takeaway:** Adding independent uncertainties linearly is usually too pessimistic; ignoring correlation can be too optimistic.

### M11.2 — Measurement covariance

**Format:** BALLPARK · **Area:** P · **Place:** Two readings each carry a 10% random error and a 10% shared calibration error.

**Scene shown to the player**

> Two channels each carry a random error and a shared calibration error, and how they are combined changes the answer. Measurements that depend on the same calibration, the same background subtraction or the same geometry share part of their uncertainty, and that shared part does not average away no matter how many channels you add. Treating correlated measurements as independent produces a confident number that is wrong in a specific direction. On the Hill, where whole divisions calibrate against the same standards, this is not a technicality.

**Question**  Estimate the uncertainty on the average of the two readings.

**Givens**

- Averaging N readings divides the random part by sqrt(N)
- A shared calibration error does not average down

**Correct answer**

Equation shown: `σ ≈ √(({0} ÷ √{1})² + {2}²)`
Tiles offered: `10% random error`, `2 readings averaged`, `10% shared calibration`, `0% shared calibration`
Tiles that belong: `10% random error`, `2 readings averaged`, `10% shared calibration`
Decoy tiles: `0% shared calibration`
Formula: `Math.sqrt(Math.pow(a/Math.sqrt(b),2)+c*c)`
**Target: 12.247 %** (tolerance ±0.6)
Explanation shown: Averaging pulls the random part from 10% down to about 7%, but the shared calibration error stays at 10% however many readings are averaged. The total barely moves — 14% for one reading, 12% for two — and it can never fall below the 10% systematic floor. More data cannot fix a miscalibrated instrument.
Book's worked answer: About 12%, and it can never fall below the 10% systematic floor.

**Why (shown in verdict):** Only the random part improves with averaging; the common calibration error survives it untouched.

**Takeaway:** Uncertainty reduction depends on independence, not merely on the number of channels.

### M11.3 — Build the implosion uncertainty budget

**Format:** DIAGNOSIS · **Area:** X · **Place:** You are assigning an implosion trial's anomalies to the right uncertainty terms.

**Scene shown to the player**

> An implosion trial has produced anomalies and each one has to be assigned to the term it belongs to. An uncertainty budget lists the separate contributions — material properties, geometry, timing, diagnostics, models — and estimates how each one moves the final symmetry or compression claim. Its value is not the total; it is the ranking. Improvement starts by naming the dominant source, because effort spent anywhere else changes nothing, and this programme has very little effort left to spend in the wrong place.

**Question**  Select the two causes that together account for every reading. No single cause does.

**Panel headline**  A trial has come back with two problems: the initiation channels arrived over a wider spread than budgeted, and the inferred peak density is below prediction. The budget has to name causes, and no single entry accounts for both.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Initiation | Channel arrival spread | 19 ns | key |
| Materials | Explosive lot wave-speed certificates | spread of 2.4% across the lots used | normal |
| Assembly | Segment placement metrology | all segments within tolerance | normal |
| Electronics | Shared trigger self-test | pass | normal |
| Analysis | Inferred peak density | 13% below prediction | key |
| Analysis | Raw radiographic transmission | consistent with previous trials | normal |
| Analysis | Attenuation calibration against a step wedge | fails by 11% at high density | normal |

**Choices offered**

- Explosive lot-to-lot wave-speed variation — _Segments cut from lots with different detonation velocities arrive at different times, widening the spread without any assembly or electrical fault._
- Segment placement tolerance — _Segments sitting away from their intended positions change path lengths, so the wave arrives at different times around the assembly._
- Shared trigger calibration error — _The common trigger distributes its command with unequal delays, so the channels fire at different times for a purely electrical reason._
- Attenuation-model error in the density inversion — _The model converting radiographic transmission into density is wrong in the range being used, so the reported density is biased even though the data are sound._
- Nothing to explain — inside the declared budget — _Both figures fall inside the uncertainty already allocated, so the trial requires no new entries._

**Correct answer**

**Explosive lot-to-lot wave-speed variation + Attenuation-model error in the density inversion**

**Why (shown in verdict):** When two anomalies sit in different subsystems, the honest budget has two entries — a single cause forced onto both will misattribute one of them.

**Takeaway:** Improvement starts by naming the dominant source of uncertainty.

---

## Mission 12 — Design the integrated non-nuclear campaign

**Objective:** Set acceptance criteria, instrument the trial, identify the critical path, and choose tests that discriminate among explanations.

### M12.1 — Acceptance criteria

**Format:** BALLPARK · **Area:** CM · **Place:** A property must be at least 100 units. The measurement is 102 with uncertainty +/-3 units.

**Scene shown to the player**

> A property has to be at least a hundred units and the measurement reads a hundred and two, plus or minus three. An acceptance criterion is what turns "good material" into something that can be tested: a limit, a method, and a stated uncertainty. Results near the boundary are exactly why the rule has to include what to do about uncertainty, agreed in advance rather than argued over once the number is on the table. Material this scarce cannot be scrapped casually, and it cannot be accepted on hope either.

**Question**  Estimate the conservative lower bound of the measurement.

**Givens**

- The lower plausible value is about 99

**Correct answer**

Equation shown: `lower bound ≈ {0} − {1}`
Tiles offered: `102 measured units`, `3 uncertainty units`, `100 threshold units`, `30 uncertainty units`
Tiles that belong: `102 measured units`, `3 uncertainty units`
Decoy tiles: `100 threshold units`, `30 uncertainty units`
Formula: `a-b`
**Target: 99 units** (tolerance ±0.15)
Explanation shown: The lower bound of 99 falls below the 100-unit threshold, so a measurement that reads above the limit still does not demonstrate compliance. The margin has to exceed the uncertainty before a pass is unambiguous.
Book's worked answer: About 99 units, which is below the 100-unit threshold, so it is not an unambiguous pass.

**Why (shown in verdict):** A decision rule must account for measurement uncertainty rather than using the central value alone.

**Takeaway:** Acceptance criteria need explicit rules for uncertainty and borderline results.

### M12.2 — Instrumented non-nuclear tests

**Format:** CHOICE · **Area:** P · **Place:** Three test concepts compete for one week of facility time.

**Scene shown to the player**

> Three test concepts are competing for one week of facility time. A non-nuclear test uses inert or surrogate material to reproduce motion, timing and shock behaviour without a chain reaction, which is what makes engineering development repeatable at all before Trinity. The credit here buys facility time, diagnostics and people. What distinguishes a good test from an expensive one is whether its result could come out either way and change what the programme does next — a large ambiguous trial is worth less than a small decisive one.

**Question**  One week of facility time. Which test do you run?

**Choices offered**

- A small test that cleanly separates the two competing timing hypotheses.
- A full-scale assembly shot, with the diagnostics that will fit around it.
- A long series of repeat shots at one condition, for the statistics.
- A repeat of last month’s test, whose configuration record was never written up.

**Correct answer**

**A small test that cleanly separates the two competing timing hypotheses.**

**Why (shown in verdict):** A test earns its facility time by being able to come out either way and change what the programme does next. A result that both hypotheses predict is an expensive way of learning nothing, however large the shot was.

**Why the others do not hold**

- A full assembly with limited diagnostics produces a spectacular record with too many possible causes to attribute anything to.
- Repeating one condition measures the scatter at a point already known, and separates no hypothesis at all.
- A repeat with no configuration record cannot be compared with the shot it is repeating, which is the only thing that would have made it useful.

**Takeaway:** A small decisive test can be more valuable than a large ambiguous one.

### M12.3 — Critical path to an integrated trial

**Format:** BALLPARK · **Area:** E · **Place:** A simplified schedule has three dependency chains: lens inspection at 3 + 4 + 2 weeks, electrical qualification at 2 + 3 + 2, and casing work at 2 + 2 + 3.

**Scene shown to the player**

> Three chains of work are running in parallel and the integrated trial cannot happen until the longest one finishes. That chain is the critical path, and it is the only place where adding people or shifts moves the date: effort poured into a task that is not on it changes nothing at all, however visibly busy it makes everyone. Fat Man's schedule is managed this way because the constraint is dependencies rather than the number of activities. Work out which chain governs before deciding where the resources go.

**Question**  Estimate how much a parallel chain can slip before it controls the date.

**Givens**

- Lens inspection chain totals 9 weeks and controls the date
- Each other chain totals 7 weeks
- Float = controlling chain - parallel chain

**Correct answer**

Equation shown: `float ≈ {0} − {1}`
Tiles offered: `9 weeks controlling chain`, `7 weeks parallel chain`, `4 weeks single task`, `12 weeks both chains`
Tiles that belong: `9 weeks controlling chain`, `7 weeks parallel chain`
Decoy tiles: `4 weeks single task`, `12 weeks both chains`
Formula: `a-b`
**Target: 2 weeks** (tolerance ±0.2)
Explanation shown: The parallel chain carries two weeks of slack: two weeks of trouble there costs the programme nothing, and a third week makes it the new critical path. This is why adding people to work off the critical path buys no schedule at all — the effort is spent on float that already existed. Manage the float, not just the length.
Book's worked answer: Two weeks of float; a third week of slippage makes it the new critical path.

**Why (shown in verdict):** Effort spent off the critical path is spent on float that already existed.

**Takeaway:** Schedule management starts with dependencies, not activity counts.

### M12.4 — An integrated non-nuclear implosion campaign

**Format:** SEQUENCE · **Area:** X · **Place:** Order the campaign logic.

**Scene shown to the player**

> A campaign is a staircase, not a single experiment. Component tests answer narrow questions cheaply; subassembly tests answer how parts behave together; full hydrodynamic mock shots answer whether the coupled system does what the calculations said, using independent diagnostics at each level. Skipping a level does not save time, because a failure at the top has too many possible causes to diagnose. Order the campaign so that each stage's evidence is worth something on its own — this is the last engineering evidence before Trinity.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Qualify components and diagnostics separately.
- Run subassembly experiments that isolate wave shaping and interface behavior.
- Conduct full hydrodynamic mock shots with multiple independent measurements.
- Hold an integration review that compares the complete evidence chain with Trinity requirements.

**Correct answer**

1. **Qualify components and diagnostics separately.**
2. **Run subassembly experiments that isolate wave shaping and interface behavior.**
3. **Conduct full hydrodynamic mock shots with multiple independent measurements.**
4. **Hold an integration review that compares the complete evidence chain with Trinity requirements.**

**Why (shown in verdict):** Skipping directly to full shots makes failures expensive and hard to interpret.

**Takeaway:** Integration is a staircase of increasingly coupled evidence.

---

## Mission 13 — Treat Trinity as an experiment

**Objective:** Define what the integrated test must answer, align field engineering with diagnostics, and validate predictions against independent evidence.

### M13.1 — What Trinity had to answer

**Format:** PROTOCOL · **Area:** X · **Place:** Match each question to the evidence Trinity was intended to provide.

**Scene shown to the player**

> Trinity is being written as a set of questions before it becomes an event, and this is that document. The test must establish whether the complete implosion system produces the predicted nuclear chain reaction — not whether detonators fire or lenses work, which is already known — and it must exercise firing coordination, diagnostics and the field organisation together. A test without its questions written down in advance becomes an argument afterwards about what it proved. There is one device and one attempt.

**Question**  Match each situation to the best action, control, document, or interpretation. Each option is used once.

**Situations to match**

- Would the integrated implosion configuration produce the predicted nuclear chain reaction?
- Did the firing and initiation system act in the required coordinated sequence?
- How did observed effects compare with the broad range of pre-test yield predictions?
- What radiological and physical hazards existed at and beyond the site?

**Choices offered**

- The nuclear-performance question. Only a full-scale test can answer it, because no component test assembles the whole chain.
- The ordnance-integration question. Answerable from timing records, and answerable even if the nuclear result disappoints.
- The model-validation question. The pre-test predictions spanned a wide range, so this tests the theory rather than the device.
- The safety-and-consequence question. It reaches past the site and past the day of the test, and it is the only one with obligations to people who were not present.

**Correct answer**

1. Would the integrated implosion configuration produce the predicted nuclear chain reaction?  →  **The nuclear-performance question. Only a full-scale test can answer it, because no component test assembles the whole chain.**
2. Did the firing and initiation system act in the required coordinated sequence?  →  **The ordnance-integration question. Answerable from timing records, and answerable even if the nuclear result disappoints.**
3. How did observed effects compare with the broad range of pre-test yield predictions?  →  **The model-validation question. The pre-test predictions spanned a wide range, so this tests the theory rather than the device.**
4. What radiological and physical hazards existed at and beyond the site?  →  **The safety-and-consequence question. It reaches past the site and past the day of the test, and it is the only one with obligations to people who were not present.**

**Why (shown in verdict):** Trinity combined physics validation, systems integration, and consequence measurement.

**Takeaway:** A full-system test should be written as a set of questions before it becomes an event.

### M13.2 — Trinity field engineering

**Format:** SEQUENCE · **Area:** E · **Place:** Order the high-level field-integration sequence without operational assembly details.

**Scene shown to the player**

> The device is a small part of what has to work in the desert. The trial needs a tower, a firing bunker, miles of cable, power, communications, weather observation, evacuation planning and recovery procedures, each with its own crew and its own way of failing. Field integration succeeds or fails on interfaces: every one of them needs an owner and a defined hold point where work stops until something is confirmed. Trinity is scheduled around a weather window, and a missed interface is not recoverable inside it.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Survey the site, verify infrastructure, and establish controlled access and communications.
- Install and independently inspect authorized support, electrical, and diagnostic interfaces.
- Bring the approved test assembly into the controlled field configuration and complete readiness checks.
- Conduct the countdown under defined hold points, then secure and document the site after the event.

**Correct answer**

1. **Survey the site, verify infrastructure, and establish controlled access and communications.**
2. **Install and independently inspect authorized support, electrical, and diagnostic interfaces.**
3. **Bring the approved test assembly into the controlled field configuration and complete readiness checks.**
4. **Conduct the countdown under defined hold points, then secure and document the site after the event.**

**Why (shown in verdict):** Trinity was simultaneously a physics experiment, an ordnance operation, and a remote-site engineering project.

**Takeaway:** Field integration succeeds when every interface has an owner and a hold point.

### M13.3 — Integrated diagnostic coverage

**Format:** DIAGNOSIS · **Area:** P · **Place:** You are deciding what an integrated trial's diagnostics actually established.

**Scene shown to the player**

> No single instrument can describe an implosion and the nuclear event that follows. Timing, symmetry, radiation, configuration and yield each demand different evidence, so the laboratory builds a coverage matrix: questions down one side, diagnostics across the other, and the blank cells are the honest part. What that matrix exposes is not what the instruments measured but what nobody can answer with the suite as built. This is the last chance to add anything before the shot.

**Question**  Select the two causes that together account for every reading. No single cause does.

**Panel headline**  Four channels watched the trial. Three tell one story and the fourth tells another. Someone has proposed discarding the fourth as a bad channel and reporting the other three. Before that happens, the full panel is on the table.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Recording channels | Agreement among the three healthy channels | they disagree with each other by 9% | key |
| Recording channels | Fourth channel against the others | disagrees | normal |
| Calibration | Pulser gain check, fourth channel | 38% below reference | key |
| Calibration | Pre-shot baseline, fourth channel | elevated and drifting | normal |
| Recording channels | Timing fiducial on the fourth channel | present and clean | normal |
| Field of view | Field-of-view coverage map | covers the region in question | normal |
| Recovered hardware | Recovered witness plate | clearly asymmetric | normal |
| Recording channels | Second shot | reproduces the same pattern | normal |

**Choices offered**

- The fourth recording channel lost gain — _That channel's response has fallen, so its amplitudes are wrong and its disagreement with the others is an instrument fault rather than an observation._
- A genuine asymmetry the channels sample unequally — _The event really was asymmetric, so channels looking at different parts of it correctly report different things and no amount of averaging will reconcile them._
- The fourth channel lost its timing fiducial — _Without a fiducial that record cannot be aligned with the others, so it appears to disagree purely because it is placed wrongly in time._
- The fourth channel could not see the region — _Its field of view excluded the area in question, so its record is not evidence about that region at all and the apparent conflict is not a conflict._
- Nothing to explain — they agree within uncertainty — _Once each channel's uncertainty is allowed for, all four records are compatible and there is no disagreement to account for._

**Correct answer**

**A genuine asymmetry the channels sample unequally + The fourth recording channel lost gain**

**Why (shown in verdict):** A channel can be faulty and still be pointing at something real. Prove the fault and the finding separately.

**Takeaway:** Coverage matrices expose questions that the current diagnostic suite cannot answer.

### M13.4 — Model validation

**Format:** SEQUENCE · **Area:** T · **Place:** Order the model-quality workflow.

**Scene shown to the player**

> A calculation can be mathematically flawless and still describe nature badly, which is why these words are kept separate here. Verification asks whether the equations were solved correctly. Calibration uses selected data to fix uncertain parameters. Validation asks whether the model then agrees with data it was not fitted to. Prediction is what you do afterwards, into a regime nobody has measured. Trinity is a prediction in exactly that sense, and collapsing these four claims into "the model works" is how a programme fools itself.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Verify that the equations are solved correctly
- Calibrate uncertain parameters with designated data
- Validate against independent measurements
- Use the model for a bounded prediction with stated uncertainty

**Correct answer**

1. **Verify that the equations are solved correctly**
2. **Calibrate uncertain parameters with designated data**
3. **Validate against independent measurements**
4. **Use the model for a bounded prediction with stated uncertainty**

**Why (shown in verdict):** A model should not validate itself on the same data used to tune it.

**Takeaway:** Correct code, fitted parameters, independent validation, and prediction are separate claims.

---

## Mission 14 — Reconcile evidence and freeze the design

**Objective:** Compare prediction bands with observations, release materials, reconcile theory and experiment, and control post-test changes.

### M14.1 — Compare a prediction band with an observation

**Format:** BALLPARK · **Area:** X · **Place:** A classroom model predicts an observable between 15 and 25 units; the measurement reads 21 units with an uncertainty of +/-2.

**Scene shown to the player**

> A model predicts an observable between fifteen and twenty-five units and the measurement reads twenty-one, plus or minus two. Agreement inside a band supports the specific part of the model that produced the band, and nothing more — a wide prediction is easy to satisfy, and a single agreeing diagnostic can coexist with others that disagree. Evidence updates a model claim by claim. The temptation after Trinity is to treat one successful comparison as a verdict on everything, and the record has to be more careful than that.

**Question**  Estimate the offset in units of the measurement uncertainty, then state the strongest justified conclusion.

**Givens**

- Prediction band: 15 to 25, midpoint 20
- Measurement: 21 +/- 2

**Correct answer**

Equation shown: `offset ≈ |{0} − {1}| ÷ {2}`
Tiles offered: `21 observed`, `20 band midpoint`, `2 measurement uncertainty`, `15 band lower edge`
Tiles that belong: `21 observed`, `20 band midpoint`, `2 measurement uncertainty`
Decoy tiles: `15 band lower edge`
Formula: `Math.abs(a-b)/c`
**Target: 0.5 σ** (tolerance ±0.1)
Explanation shown: Half a sigma is no disagreement at all — at this precision the observation and the midpoint are indistinguishable. Be careful what that licenses: it says the measurement is consistent with the model, not that the model is confirmed. A band 10 units wide is easy to agree with, so consistency here is weak evidence, and diagnostics that disagree with each other still need explaining.
Book's worked answer: |21 - 20|/2 = 0.5 sigma. The observation is consistent with the prediction band, but a band that wide makes consistency weak evidence; it does not confirm every model assumption, and diagnostics that disagree with each other still need explaining.

**Why (shown in verdict):** A successful integrated result validates some claims more strongly than others.

**Takeaway:** Evidence should update a model claim by claim, not by declaring total victory.

### M14.2 — Materials release review

**Format:** SEQUENCE · **Area:** CM · **Place:** Order the review chain.

**Scene shown to the player**

> A release review gathers everything known about a component into one decision: chemistry, mechanical properties, dimensions, inspection results, recorded deviations and process history. Materials are released as evidence packages rather than as objects, because an unresolved inconsistency in the paperwork becomes an integration failure later, when the component is inside an assembly and nobody remembers the anomaly. On the Hill, with material this scarce and a schedule this tight, the review is the last place a quiet discrepancy can still be caught.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Verify identity and complete process history
- Confirm analytical, mechanical, and dimensional results
- Resolve deviations and independent inspection findings
- Authorize release with traceable certification

**Correct answer**

1. **Verify identity and complete process history**
2. **Confirm analytical, mechanical, and dimensional results**
3. **Resolve deviations and independent inspection findings**
4. **Authorize release with traceable certification**

**Why (shown in verdict):** Release is an evidence-based decision made after deviations are resolved.

**Takeaway:** Materials are released as documented evidence packages, not merely physical objects.

### M14.3 — Theory-experiment reconciliation

**Format:** CHOICE · **Area:** T · **Place:** Theory and experiment disagree by three standard deviations.

**Scene shown to the player**

> Theory and experiment disagree by three standard deviations and the division has to decide what to do about it. A discrepancy that size can mean a detector artefact, an overlooked physical effect, or an approximation pushed past where it works, and arguing about which is cheaper than finding out. The productive response is a test designed to separate those causes — one whose outcome differs depending on which explanation is true. Spend the credits on the experiment that discriminates, not the one that reassures.

**Question**  Theory and experiment differ by three standard deviations. What does the division do?

**Choices offered**

- Audit the shared calibrations and covariance, then design a discriminating measurement.
- Retune the uncertain parameters until the model reproduces the measurement.
- Collect more of the same data, to see whether the gap narrows.
- Adopt the experimental value and record the disagreement in the report.

**Correct answer**

**Audit the shared calibrations and covariance, then design a discriminating measurement.**

**Why (shown in verdict):** Three sigma between two numbers that share a calibration may be one error counted twice, and the audit is cheap enough to do first. What has to follow it is a measurement whose outcome differs depending on which explanation is true — a detector artefact, a missing physical effect, or an approximation pushed past its range.

**Why the others do not hold**

- Retuning parameters to force agreement hides the discrepancy inside a number and destroys the only evidence that something was wrong.
- More of the same data carries the same systematic. It narrows the statistical error around a value that may be biased.
- Adopting the experimental value settles the disagreement by whoever wrote it down last, and leaves the cause in place for the next comparison.

**Takeaway:** The best response to disagreement is a test that can separate competing causes.

### M14.4 — Post-Trinity design freeze

**Format:** SEQUENCE · **Area:** E · **Place:** Order the post-test decision process.

**Scene shown to the player**

> Trinity has produced new evidence and there is almost no time to use it. A design freeze decides which test-validated features stay exactly as they are and which corrections the data actually justify, then locks the configuration so that what gets built is what was tested. The pressure at this moment is to keep improving, and every unlogged improvement breaks the link between the test and the article. Converting a successful test into a controlled, repeatable configuration is the last engineering act of the programme.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Recover and reconcile timing, hydrodynamic, radiation, and physical evidence from the test.
- Compare observations with pre-test predictions and identify unexplained discrepancies.
- Approve only the changes supported by evidence and freeze the combat configuration.
- Update assembly records, aircraft procedures, training, and mission readiness documents.

**Correct answer**

1. **Recover and reconcile timing, hydrodynamic, radiation, and physical evidence from the test.**
2. **Compare observations with pre-test predictions and identify unexplained discrepancies.**
3. **Approve only the changes supported by evidence and freeze the combat configuration.**
4. **Update assembly records, aircraft procedures, training, and mission readiness documents.**

**Why (shown in verdict):** A successful integrated test does not automatically validate every production unit or mission procedure.

**Takeaway:** Test success must be converted into a controlled, repeatable configuration.

---

## Mission 15 — Complete the evidence chain—and confront responsibility

**Objective:** Close the technical reviews while recognizing that scientific completion does not settle the human and political consequences.

### M15.1 — Final theory review

**Format:** SEQUENCE · **Area:** T · **Place:** Arrange the final review chain.

**Scene shown to the player**

> At the final theory review the separate strands — fission physics, neutron transport, compression, timing, uncertainty — have to be assembled into one consistent prediction that other people can follow. The purpose is not to claim perfect knowledge; it is to make the chain of reasoning transparent, so that each link can be challenged individually and its uncertainty stated. A prediction nobody outside the division can audit is not a scientific result. Everything this laboratory has done for two years is about to be summarised in a document.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- State the governing physical questions and assumptions
- Compute predictions with uncertainty and sensitivity
- Compare predictions with independent benchmarks
- Issue bounded conclusions and the next discriminating tests

**Correct answer**

1. **State the governing physical questions and assumptions**
2. **Compute predictions with uncertainty and sensitivity**
3. **Compare predictions with independent benchmarks**
4. **Issue bounded conclusions and the next discriminating tests**

**Why (shown in verdict):** A final theory product is not just a number; it is a traceable argument from assumptions to evidence.

**Takeaway:** The semester culminates in a transparent evidence chain rather than an opaque calculation.

### M15.2 — Final diagnostic readiness review

**Format:** SEQUENCE · **Area:** P · **Place:** Order the final readiness chain.

**Scene shown to the player**

> The readiness review asks whether the instruments will actually record what happens: calibrated, synchronised, configured for the right ranges, and able to cover signals whose size is uncertain by orders of magnitude. It also names residual risks and the backup measurement for each one, because a diagnostic that saturates or misses its window produces nothing at all. What the laboratory is delivering is a trustworthy evidence system rather than a collection of sensors, and it has exactly one event to record.

**Question**  Arrange the four cards from earliest cause or prerequisite to latest result.

**Cards to order** (presented shuffled)

- Verify calibration and configuration records
- Run end-to-end timing and health checks
- Demonstrate independent coverage of critical observables
- Approve deployment with named residual risks and contingencies

**Correct answer**

1. **Verify calibration and configuration records**
2. **Run end-to-end timing and health checks**
3. **Demonstrate independent coverage of critical observables**
4. **Approve deployment with named residual risks and contingencies**

**Why (shown in verdict):** Readiness requires evidence that the instruments will work and that failures will be recognizable.

**Takeaway:** The final product is a trustworthy evidence system, not merely a collection of sensors.

### M15.3 — Final chemistry and metallurgy dossier

**Format:** CHOICE · **Area:** CM · **Place:** The division has one final 100-credit improvement budget.

**Scene shown to the player**

> The final dossier has to show more than that components existed. It has to show that their composition, structure, dimensions and processing history are known, and that independent checks were made rather than a single measurement being trusted because it was convenient. Traceability is what lets somebody a year from now — or twenty years from now — know what was actually built. The division has one last hundred credits of improvement to spend, and the choice says what it thinks a materials capability is.

**Question**  One last improvement to the division’s materials capability. Which?

**Choices offered**

- Traceable records linking each batch’s process conditions to its measured properties.
- Independent composition measurements and microscopy on every batch.
- Re-measurement of the batches already released, to a tighter tolerance.
- Higher production throughput, with the measurements and records unchanged.

**Correct answer**

**Traceable records linking each batch’s process conditions to its measured properties.**

**Why (shown in verdict):** A measurement says what one batch was. A record linking process to properties says what the process does, which is the only thing that lets somebody a year from now diagnose a batch that came out different — and this metal has several solid phases and very little data behind its diagram.

**Why the others do not hold**

- Independent composition and microscopy verify a batch and are already required. They produce more measurements with nothing connecting them.
- Re-measuring released material improves numbers on parts that are already installed and links none of them to how they were made.
- More throughput on the same records makes more material that nobody can characterise afterwards.

**Takeaway:** The final materials capability joins chemistry, structure, properties, and traceability.

### M15.4 — Scientific responsibility after Trinity

**Format:** CHOICE · **Area:** X · **Place:** Allocate 100 discussion credits among three historically grounded priorities.

**Scene shown to the player**

> Trinity has demonstrated that the implosion weapon works, and the questions that follow are not ones physics can settle. Whether and how such a weapon should be used, what the decision-makers do and do not understand about its effects, and what obligations the people who built it now carry are argued about on this site while the work continues — by Szilard's petition, by the Franck Report, by people who disagreed with each other sharply and worked side by side anyway. Expertise brings obligations when the work changes the scale of possible harm.

**Question**  The physics is settled and the decisions that follow are not physics. What does the laboratory owe?

**Choices offered**

- A clear account of the expected humanitarian and radiological consequences, given to those deciding.
- Nothing beyond the technical work: the decision belongs to the elected government.
- A refusal to continue technical work until the decision has been taken.
- An argument for postwar international control, and silence on the immediate decision.

**Correct answer**

**A clear account of the expected humanitarian and radiological consequences, given to those deciding.**

**Why (shown in verdict):** The people making the decision cannot weigh what only this laboratory knows: the scale, the radiological aftermath, and how uncertain both still are. Szilard’s petition and the Franck Report were both attempts to put exactly that on the record. Expertise does not settle the question; withholding it removes the one thing expertise can contribute to it.

**Why the others do not hold**

- Leaving it to the government assumes the government already holds the technical picture. In the summer of 1945 it did not, and only the laboratory could supply it.
- Refusing to continue was a position several people took, and it changes who does the work rather than what the decision-makers know about its effects.
- Postwar control was argued for by many of the same people, in the same documents. It is a claim about the years after, and it leaves the question in front of them unanswered.

**Takeaway:** Expertise carries obligations when scientific work changes the scale of possible harm.

---

## Grading

Scored after the March of fixes described in `README.md`. Three axes, 1–5 each; the rubric is identical across all seven games and is stated in full in `README.md`. Rows marked **Fixed**, **Rebuilt** or **Correction** changed in this pass.

- **Solv** — *solvability*: can a prepared student reach the keyed answer from the scene and panel alone, by reasoning rather than by eliminating an absurdity or recalling something never shown?
- **Edu** — *educational value*: does getting it right require and build transferable subject knowledge?
- **Fit** — *general-curriculum fit* for the stated audience.

| ID | Format | Topic | Solv | Edu | Fit | Note |
| --- | --- | --- | :-: | :-: | :-: | --- |
| M1.1 | PROTOCOL | Nuclide notation: Z, A−Z, isotopes | 5 | 4 | 5 | Four clean definitional facts; the right opening for the subject. |
| M1.2 | PROTOCOL | Isotopes vs chemical identity | 4 | 4 | 5 | Good content, but three of the four answers begin "Yes" and one begins "No", so the odd one is findable by pattern. |
| M1.3 | SEQUENCE | Detector conversion chain | 5 | 4 | 4 | Physically forced: energy → carriers → amplification → digitisation. |
| M2.1 | BALLPARK | Mass defect and binding energy | 5 | 5 | 5 | 0.008 × 200 × 931. Real decoy (8 u/nucleon) catching an order-of-magnitude slip. Core nuclear physics. |
| M2.2 | SEQUENCE | Pulse-height → energy calibration | 5 | 5 | 5 | "The instrument never measured energy; it measured pulse size" is the correct and commonly-missed point. |
| M2.3 | PROTOCOL | Gun-type vs implosion, as programmes | 4 | 3 | 2 | History and programme consequence rather than physics. |
| M3.1 | BALLPARK | Decay law, N₀(½)ⁿ | 5 | 5 | 5 | Decoy (30 half-lives) is well chosen. Standard content. |
| M3.2 | BALLPARK | Radiochemical yield | 4 | 4 | 3 | **Fixed.** The verdict line carried the arithmetic of a different problem ("8500/10000=0.85") beside an answer of 80%. |
| M3.3 | DIAGNOSIS | Background must be measured with the instrument | 5 | 5 | 4 | Panel colours no longer mislead: a pack's key readings are marked as key rather than as alarms, so "counts with the high voltage off: 0" reads as the reassurance it is. |
| M4.1 | BALLPARK | Macroscopic cross-section, mean free path | 5 | 5 | 5 | λ = 1/(nσ). The barn-to-cm² handling is the lesson. |
| M4.2 | BALLPARK | Poisson counting statistics | 5 | 5 | 5 | √N/N, with the practical consequence (four times the counts to halve the error) stated in the scene. |
| M4.3 | DIAGNOSIS | Yield vs radiochemical vs isotopic purity | 4 | 4 | 3 | Wall swab at 5.8% against a 6.1% shortfall is a clean numerical match. |
| M5.1 | PROTOCOL | Elastic scattering vs absorption vs moderation | 5 | 5 | 5 | Four distinct neutron-interaction processes; the light-nucleus moderation item is the good one. |
| M5.2 | DIAGNOSIS | Discriminator threshold set too high | 5 | 5 | 4 | The activation foil is an independent check that does not pass through the electronics — the panel's decisive reading, and the takeaway names it. |
| M5.3 | PROTOCOL | Spontaneous neutrons forced the design change | 4 | 3 | 2 | Historical causal chain; solid, little transferable physics. |
| M6.1 | BALLPARK | Rate × exposure window | 5 | 5 | 4 | 10⁴ × 10⁻³ = 10 events, against 0.01 for the fast assembly. The best-motivated estimate in the game. |
| M6.2 | SEQUENCE | One measurement invalidates a path | 5 | 3 | 2 | Forced order; the content is history. |
| M6.3 | SEQUENCE | Outward detonation → inward compression | 4 | 3 | 2 | Physically ordered, conceptually light. |
| M7.1 | BALLPARK | Work scale, PΔV | 5 | 4 | 4 | Clean, with an order-of-magnitude decoy pair. |
| M7.2 | DIAGNOSIS | A trace impurity stabilised a second phase | 3 | 4 | 3 | Requires knowing that "bulk composition on specification" does not cover a trace element at 9× its usual level. Defensible but a real crack. |
| M7.3 | PROTOCOL | Explosive lens as a wavefront-shaping analogy | 4 | 3 | 2 | Good framing of analogy-versus-reality; no physics computed. |
| M8.1 | BALLPARK | Spread as a percentage of the mean | 5 | 3 | 3 | (101−99)/100. Trivial arithmetic; the real point (a mean can hide a spread) is prose only. |
| M8.2 | DIAGNOSIS | Random jitter vs systematic delay | 5 | 5 | 4 | Same panel-colour fix. Random against systematic remains the transferable idea. |
| M8.3 | BALLPARK | Cable delay from path mismatch | 5 | 4 | 4 | 0.4 / 2×10⁸, with a signal-speed decoy. |
| M9.1 | DIAGNOSIS | Machining-damaged surface layer | 4 | 4 | 3 | Cleavage facets plus a 44%-harder surface plus a crack origin at the machined face. Determined, if specialist. |
| M9.2 | DIAGNOSIS | When a mockup may contradict a model | 4 | 5 | 3 | Every test artefact is individually ruled out before the finding is allowed to stand. Excellent scientific hygiene. |
| M9.3 | BALLPARK | Motion blur = v × exposure | 5 | 4 | 4 | Clean, with a decoy exposure time. |
| M10.1 | BALLPARK | Timing error becomes geometric error | 5 | 4 | 4 | 8×10³ × 5×10⁻⁷ → 4 mm. Well motivated. |
| M10.2 | CHOICE | Lot acceptance vs prototype champion | 4 | 4 | 3 | Sample the lots and measure the distributions — reliability as a property of a manufactured population, now with a dimensional-inspection rival that sounds right. |
| M10.3 | BALLPARK | Timing budget in quadrature | 5 | 5 | 5 | The "12 ns linear sum" decoy is the best-designed distractor tile in the repository — it is exactly the wrong answer students give. |
| M11.1 | BALLPARK | Uncertainty propagation in quadrature | 5 | 5 | 5 | √(8²+6²), with a linear-sum decoy. Standard and well built. |
| M11.2 | BALLPARK | Correlated error does not average down | 4 | 5 | 5 | The systematic floor is the single most useful measurement idea in the game, and the "0% shared calibration" decoy tests it directly. |
| M11.3 | DIAGNOSIS | Two-cause uncertainty budget | 4 | 5 | 4 | **Correction to the earlier audit: this was never broken.** `applyPack` builds `correctChoices` from the pair answer, so the two-cause panel grades correctly. |
| M12.1 | BALLPARK | Acceptance against a threshold with uncertainty | 5 | 4 | 4 | **Fixed.** The question asked for a number and a verdict and graded only the number; it now asks for the bound the panel computes. |
| M12.2 | CHOICE | A small decisive test beats a large ambiguous one | 4 | 4 | 3 | One week of facility time, decided by discriminating power. The repeat-at-one-condition rival is the plausible waste. |
| M12.3 | BALLPARK | Critical path and float | 5 | 3 | 1 | 9 − 7 = 2 weeks. Correct; project management, not science. |
| M12.4 | SEQUENCE | Component → subassembly → full → review | 4 | 3 | 2 | Forced, generic. |
| M13.1 | PROTOCOL | What a full-system test must answer | 4 | 3 | 2 | Good framing of writing a test's questions before running it. |
| M13.2 | SEQUENCE | Field integration | 4 | 2 | 1 | Site-engineering procedure. |
| M13.3 | DIAGNOSIS | A faulty channel can still see something real | 4 | 5 | 3 | **Correction to the earlier audit: this was never broken either.** The pair answer is expanded into `correctChoices` at load. |
| M13.4 | SEQUENCE | Verify / calibrate / validate / predict | 5 | 5 | 4 | Keeps four words apart that students routinely collapse into "the model works". Genuinely valuable and rarely taught this cleanly. |
| M14.1 | BALLPARK | Offset in units of measurement uncertainty | 4 | 5 | 5 | |21−20|/2 = 0.5σ, with the correct caution that a wide band makes agreement weak evidence. |
| M14.2 | SEQUENCE | Materials release review | 4 | 2 | 1 | Quality-assurance procedure. |
| M14.3 | CHOICE | Responding to a 3σ disagreement | 4 | 4 | 3 | Audit the shared calibration first, because three sigma between two numbers sharing one calibration may be one error counted twice. |
| M14.4 | SEQUENCE | Post-test design freeze | 4 | 2 | 1 | Configuration control. |
| M15.1 | SEQUENCE | Final theory review | 4 | 3 | 2 | Generic review chain. |
| M15.2 | SEQUENCE | Diagnostic readiness | 4 | 3 | 2 | Generic review chain. |
| M15.3 | CHOICE | Materials traceability | 4 | 4 | 2 | Traceable process records, because a measurement says what one batch was and a record says what the process does. |
| M15.4 | CHOICE | Scientific responsibility after Trinity | 4 | 4 | 3 | **Reformatted.** An allocation in which every option was recommended could not express a judgement. Now a choice among positions people actually took, keyed to communicating consequences to those deciding. |

### Summary — Project Y

**Averages: Solvability 4.5 · Educational value 4.0 · Curriculum fit 3.4**
*Before this pass: 4.2 · 4.0 · 3.4*

**Two corrections to the earlier audit, both in this game's favour.** M11.3 and M13.3 were reported as ungradable — asking for two causes with no `correctChoices` array. They were never broken: `applyPack` in `engine/content/normalize.js` splits the pack's `"A + B"` answer into `correctChoices` at load, and Project Y's `theme.js` does supply the packs. The original check was run against the raw content without normalisation. Both rows are restored to what they deserve, which is 5 for educational value.

Real fixes here are smaller and worth having:

- **M3.2's verdict carried the arithmetic of a different problem** — "8500/10000=0.85" printed beside a keyed answer of 80%.
- **The diagnosis panels were colouring their key readings as alarms.** A pack's `salient` list names the readings the puzzle turns on, and those are frequently the reassuring ones: "counts with the detector high voltage off: 0" is what clears the electronics, and it was arriving in alarm red. There is now a fifth status — key reading, in blue — and the panel hint no longer offers a key reading as though it were incidental.
- **M12.1** asked for a number and a verdict and graded the number.

Its nineteen estimates remain the best quantitative teaching in the repository (Edu 4.4, Fit 4.2), and the measurement-uncertainty run at M10.3 → M11.1 → M11.2 → M14.1 is still the most coherent teaching sequence anywhere here.

**One thing was found and deliberately not fixed.** Project Y's curriculum holds 150 lessons and its campaign reaches 49. The other 101 are not `— Review` variants (unlike the hospital's, which are reachable as callbacks) — they are unreferenced, and nineteen of them are funding rounds. Converting content no player can reach is not worth the authoring; deciding whether to wire it in or delete it is a separate call, and it belongs to whoever owns the campaign.
