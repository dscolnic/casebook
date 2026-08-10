# The Contaminated City — every question, with its answer

**Subject:** College general chemistry  
**Audience:** Undergraduate  
**Content source:** `gamekit/themes/contamcity/content`  
**Shape:** 15 missions × 3 authored stops = 45 questions. (In play the engine also inserts a callback stop from day 3, drawn from these same lessons.)

---

## Mission 1 — The Unknown Containers

**Objective:** Create a provisional identity list and choose the next discriminating measurements.

**Stake:** A wrong identity can cause an incompatible firefighting or treatment decision.

**Concepts:** atoms and ions, periodic trends, chemical formulas, nomenclature, evidence quality

### M1.1 — Read the formula, not the rumor

**Format:** PROTOCOL · **Area:** IDENT · **Place:** Accident Command Post

**Scene shown to the player**

> A freight-yard fire has damaged several unlabelled containers eighty metres from the river, and the shift supervisor's radio traffic is already carrying three different guesses about what is in them. A chemical formula is not a name: it states which elements are present, in what whole-number ratio, and what charge the unit carries, and each of those constrains what the substance can do. A subscript or a charge changed makes a different compound with different reactivity, different solubility and a different hazard class. Firefighters are choosing a suppression agent from whatever identity you give them, and some of the wrong answers react with water.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- The formula contains a metal cation and a polyatomic anion.
- Two substances share the same elements but different ratios.
- An ion has more electrons than protons.
- A label gives a common name with no composition or concentration.

**Choices offered**

- Likely an ionic compound.
- They are distinct compounds, not interchangeable names.
- It is negatively charged.
- The record is insufficient for hazard prediction.

**Correct answer**

1. The formula contains a metal cation and a polyatomic anion.  →  **Likely an ionic compound.**
2. Two substances share the same elements but different ratios.  →  **They are distinct compounds, not interchangeable names.**
3. An ion has more electrons than protons.  →  **It is negatively charged.**
4. A label gives a common name with no composition or concentration.  →  **The record is insufficient for hazard prediction.**

**Why (shown in verdict):** Composition, ratio, and charge constrain identity; an informal name may hide crucial differences.

**Why the others do not hold**

- Situation 1: The supported response is "Likely an ionic compound." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "They are distinct compounds, not interchangeable names." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "It is negatively charged." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "The record is insufficient for hazard prediction." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** Chemical identity begins with explicit composition and charge.

### M1.2 — From damaged container to provisional identity

**Format:** SEQUENCE · **Area:** IDENT · **Place:** Molecular Identification Lab

**Scene shown to the player**

> The containers are now evidence as well as hazard. Identification runs in a fixed order for reasons that are chemical rather than bureaucratic: some observations leave the sample exactly as they found it and can be repeated all week, and some consume the material to produce their answer. A destructive method gives the best identification and gives it once. What is on the outside of the drum survives only until somebody opens it. You are choosing the order in which to spend a sample nobody can go back for.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Photograph and record the markings, which consumes nothing and cannot be redone once the drum is opened.
- Sample the headspace vapour onto a sorbent tube, without breaching the bulk liquid.
- Draw a small aliquot and run a non-destructive spectrum on it.
- Commit part of that aliquot to a method that destroys it to identify it.

**Correct answer**

1. **Photograph and record the markings, which consumes nothing and cannot be redone once the drum is opened.**
2. **Sample the headspace vapour onto a sorbent tube, without breaching the bulk liquid.**
3. **Draw a small aliquot and run a non-destructive spectrum on it.**
4. **Commit part of that aliquot to a method that destroys it to identify it.**

**Why (shown in verdict):** The order is set by what each step costs you. Everything before the last one leaves the sample intact and can be repeated if it goes wrong; the destructive method consumes what it measures, so it is the last thing you spend and the first thing you would regret. The markings in particular exist only until somebody opens the drum.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** Analytical work runs from what costs nothing to what cannot be undone.

### M1.3 — Spend the first analytical reserve

**Format:** CHOICE · **Area:** IDENT · **Place:** Records and Shipping Office

**Scene shown to the player**

> You have a limited analytical reserve and four ways to spend it, and the first hours of a release are when uncertainty is most expensive. Analytical methods are not interchangeable: each one answers a different question, carries its own way of being fooled, and costs sample, time and exposure. Some of what looks like a fast answer is really a low-quality one taken at personal risk — smelling a container tells you almost nothing chemically and puts a responder in the vapour. One of them goes first, and the firefighters are waiting on whatever it returns.

**Question**  What does the response run first?

**Choices offered**

- Two analytical methods with different selectivity, on the same sample.
- A search for the shipping records and supplier lot information.
- Reference samples and blanks, prepared alongside the sample.
- A trained responder identifying the containers by odour.

**Correct answer**

**Two analytical methods with different selectivity, on the same sample.**

**Why (shown in verdict):** An identity is worth what the chance it had to be wrong is worth. Two methods that can be fooled by different things is the smallest evidence package that supports a name, and the firefighters are choosing a suppression agent from that name.

**Why the others do not hold**

- Shipping records are fast and say what was supposed to be in the container. After a fire in a freight yard, that is a hypothesis rather than an observation.
- Blanks and reference samples are required and answer whether the laboratory contributed the signal. That question only arises once there is a signal.
- Odour puts a responder in the vapour and returns nothing chemical — no composition, no concentration, and no record anybody can check.

**Takeaway:** Early chemistry should reduce uncertainty without creating new exposure.

---

## Mission 2 — The Vapor Cloud

**Objective:** Provide a bounded plume assessment and decision triggers for evacuation zones.

**Stake:** A delayed evacuation risks exposure; an overbroad evacuation can block emergency access and overwhelm shelters.

**Concepts:** ideal gas law, temperature and pressure, moles and volume, density, model limits

### M2.1 — How much volume can the gas occupy?

**Format:** BALLPARK · **Area:** GASES · **Place:** Mobile Weather Station

**Scene shown to the player**

> A colourless plume is drifting toward two neighbourhoods and the incident commander wants a number before the wind shifts. The ideal gas law relates the amount of substance to the volume it occupies at a given temperature and pressure — at ordinary conditions about twenty-four litres per mole — which turns a mass in a tank into a scale you can reason about. It is a first-order tool and nothing more: it says how big the release is, not where it goes. Evacuating too little exposes people; evacuating too much blocks the roads the response needs.

**Question**  Estimate the gas volume at ambient conditions.

**Givens**

- n = 2.0×10^4 mol
- T = 300 K
- P = 1.0×10^5 Pa
- R = 8.31 J mol^-1 K^-1

**Relationship given:** V = nRT/P.

**Correct answer**

Equation shown: `{0} × {1} × {2} ÷ {3}`
Tiles offered: `2.0×10⁴ mol  (n, amount released)`, `8.31 J mol⁻¹ K⁻¹  (R)`, `300 K  (T, ambient)`, `1.0×10⁵ Pa  (P, ambient)`, `22.4 L mol⁻¹  (molar volume at STP)`, `273 K  (0 °C)`
Tiles that belong: `2.0×10⁴ mol  (n, amount released)`, `8.31 J mol⁻¹ K⁻¹  (R)`, `300 K  (T, ambient)`, `1.0×10⁵ Pa  (P, ambient)`
Decoy tiles: `22.4 L mol⁻¹  (molar volume at STP)`, `273 K  (0 °C)`
Formula: `a*b*c/d`
**Target: 498.6 m³** (tolerance ±60)
Explanation shown: The ideal gas law fixes the volume the release would occupy at equilibrium. That is a scale, not a hazard footprint: mixing, wind, terrain and chemistry decide where the material actually goes and at what concentration.
Book's worked answer: V ≈ 2.0×10^4×8.31×300/10^5 ≈ 500 m³.

**Why (shown in verdict):** The estimate gives an equilibrium gas volume, not the final hazardous footprint after mixing, wind, terrain, and chemistry.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** Simple gas laws provide scale while atmospheric transport determines exposure.

### M2.2 — Interpret plume behavior

**Format:** PROTOCOL · **Area:** GASES · **Place:** Gas Properties Lab

**Scene shown to the player**

> The weather is changing while the plume is still moving. Two different physics are operating at once here: gas-law behaviour, which says how a fixed amount of substance responds to changes in temperature and pressure, and atmospheric transport, which says where the resulting parcel actually goes. Density relative to air decides whether the cloud hugs the ground or lifts; wind and turbulence decide how fast it dilutes; terrain decides where it pools. Each change on the board pushes on one of those and not necessarily the others, and the neighbourhood downwind is where the arithmetic lands.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Temperature rises at roughly constant pressure.
- External pressure falls for the same gas amount and temperature.
- A gas has greater molar mass than surrounding air.
- Wind direction shifts while the source continues.

**Choices offered**

- Volume rises in proportion to the absolute temperature.
- Volume rises in inverse proportion to the pressure.
- It may initially favour lower-level accumulation, though turbulence matters.
- The downwind risk corridor must be updated.

**Correct answer**

1. Temperature rises at roughly constant pressure.  →  **Volume rises in proportion to the absolute temperature.**
2. External pressure falls for the same gas amount and temperature.  →  **Volume rises in inverse proportion to the pressure.**
3. A gas has greater molar mass than surrounding air.  →  **It may initially favour lower-level accumulation, though turbulence matters.**
4. Wind direction shifts while the source continues.  →  **The downwind risk corridor must be updated.**

**Why (shown in verdict):** Charles and Boyle are different statements about the same gas: heating it at constant pressure expands it in proportion to absolute temperature, and releasing the pressure expands it in inverse proportion. Density and wind belong to the atmosphere rather than to the gas law.

**Why the others do not hold**

- Situation 1 is a temperature change at roughly constant pressure, which is a proportional relationship — twice the absolute temperature, twice the volume.
- Situation 2 is a pressure change at constant amount and temperature, which is an inverse relationship — half the pressure, twice the volume.
- Situation 3 is about density relative to air, which the gas law does not address: it decides whether the cloud sinks or lifts, and turbulence can override it.
- Situation 4 is transport rather than state. Nothing about the gas changed; where it is going did.

**Takeaway:** A plume is a coupled thermodynamic and transport problem.

### M2.3 — Choose the next plume evidence

**Format:** CHOICE · **Area:** GASES · **Place:** Evacuation Command

**Scene shown to the player**

> Evacuation Command needs a forecast it can defend to residents who are being told to leave their homes. Models and measurements fail in different ways: a dispersion model extrapolates confidently into places nobody has sampled, while a measurement is true at one point and one time and says nothing about the next street. Meteorology is what connects them, because transport is what turns a source term into an exposure. What Command needs is the evidence that constrains the biggest uncertainty, not the one that produces the most detail.

**Question**  Evacuation Command needs a forecast it can defend. What do you deploy?

**Choices offered**

- Calibrated sensors upwind, crosswind and downwind.
- Better local wind and atmospheric stability measurements.
- Several dispersion scenarios with the assumptions written out.
- One handheld reading taken at the source, where the signal is strongest.

**Correct answer**

**Calibrated sensors upwind, crosswind and downwind.**

**Why (shown in verdict):** A dispersion model extrapolates confidently into streets nobody has sampled. Sensors on three sides bound the corridor with measurements, and they give the model something it can be caught being wrong about.

**Why the others do not hold**

- Wind and stability data are what the model needs and they measure the driver rather than the exposure. Run them alongside; they do not tell anybody which street to leave.
- Multiple scenarios are cheap and honest, and they are only as good as the meteorology underneath them. They bound the model, not the plume.
- One uncalibrated reading at the source is a number with no traceability, taken at the one place nobody lives.

**Takeaway:** High-stakes forecasts should combine measurements with transparent models.

---

## Mission 3 — What Dissolved in the River?

**Objective:** Predict where each chemical class will be found and design a mass-balance sampling plan.

**Stake:** If the team samples only water, a persistent sediment reservoir may be missed until it re-enters the water supply.

**Concepts:** polarity, intermolecular forces, solubility, partitioning, sampling design

### M3.1 — Where will the chemical go?

**Format:** PROTOCOL · **Area:** WATER · **Place:** River Sampling Boat

**Scene shown to the player**

> Runoff from the accident has reached the river. A chemical released into water does not stay in one place or one phase: polar molecules dissolve readily, non-polar ones partition onto organic carbon in sediment and stay there, volatile ones leave for the atmosphere, and surface-active ones concentrate in the film on top. All of that follows from molecular structure — polarity, hydrogen bonding, and how the compound interacts with water compared with everything else on offer. If you predict the wrong phase you will sample the wrong thing, and a clean water result will be read by the city as an all-clear.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Small ionic species in water.
- Nonpolar organic liquid with low water affinity.
- Polar neutral molecule capable of hydrogen bonding.
- Hydrophobic compound with strong affinity for organic-rich sediment.

**Choices offered**

- Often dissolves as hydrated ions.
- May form a separate phase or surface film.
- Often has appreciable water solubility.
- May concentrate in suspended particles or sediment.

**Correct answer**

1. Small ionic species in water.  →  **Often dissolves as hydrated ions.**
2. Nonpolar organic liquid with low water affinity.  →  **May form a separate phase or surface film.**
3. Polar neutral molecule capable of hydrogen bonding.  →  **Often has appreciable water solubility.**
4. Hydrophobic compound with strong affinity for organic-rich sediment.  →  **May concentrate in suspended particles or sediment.**

**Why (shown in verdict):** Solubility and partitioning follow interactions among solute, water, and environmental phases.

**Why the others do not hold**

- Situation 1: The supported response is "Often dissolves as hydrated ions." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "May form a separate phase or surface film." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "Often has appreciable water solubility." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "May concentrate in suspended particles or sediment." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** The absence of a chemical from water does not mean it has disappeared.

### M3.2 — Build a river mass-balance survey

**Format:** SEQUENCE · **Area:** WATER · **Place:** Solutions and Polarity Lab

**Scene shown to the player**

> The survey you design now is the one the state will audit later. A river is a moving system with sources upstream of the accident as well as at it, so a concentration on its own means very little without something to compare it against — background matters as much as the peak. A defensible survey covers the phases your partitioning model predicts, not just the ones that are easy to collect, and it collects them in an order that lets each result be interpreted. Riverton's drinking-water intake is downstream of everything you are about to sample.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Define upstream background and downstream decision points.
- Sample water, suspended solids, sediment, and surface films with blanks.
- Measure concentrations and flow or phase masses.
- Compare recovered mass across locations and phases, including uncertainty.

**Correct answer**

1. **Define upstream background and downstream decision points.**
2. **Sample water, suspended solids, sediment, and surface films with blanks.**
3. **Measure concentrations and flow or phase masses.**
4. **Compare recovered mass across locations and phases, including uncertainty.**

**Why (shown in verdict):** A defensible survey starts with comparison sites and includes all plausible reservoirs.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** Environmental chemistry requires sampling the phases predicted by molecular behavior.

### M3.3 — Spend the river survey budget

**Format:** CHOICE · **Area:** WATER · **Place:** Sediment Analysis Room

**Scene shown to the player**

> The river survey has a fixed budget and the water utility wants an answer this week. Sampling design is where environmental chemistry is usually won or lost: coverage in space, coverage in time, and coverage across phases each buy a different kind of certainty, and a striking photograph of an oily bank buys none of them. The point of a survey is to test the model you built — to give the partitioning prediction a real chance to be wrong — rather than to collect confirmation from the most visually convincing spot on the river.

**Question**  The utility wants an answer this week. What does the survey sample?

**Choices offered**

- Sediment and suspended solids, alongside the water.
- Water at high frequency, close to the drinking-water intake.
- Upstream and tributary comparison sites.
- The bank where the discoloration is visible.

**Correct answer**

**Sediment and suspended solids, alongside the water.**

**Why (shown in verdict):** The partitioning model predicts the hydrophobic fraction is not in the water at all. A survey that samples only water will come back clean, and the city will read a clean water result as an all-clear.

**Why the others do not hold**

- High-frequency sampling at the intake is where the decision gets made, and it measures one phase of a system with four.
- Upstream comparison sites are what make any concentration mean something, and they are the next call rather than this one.
- A sample from the visibly discoloured bank tests the appearance rather than the model, and it will be the photograph that gets published.

**Takeaway:** Sampling design should test the partitioning model rather than confirm appearances.

---

## Mission 4 — Identify the Unknowns

**Objective:** Assign confidence-ranked identities to mixture components using orthogonal evidence.

**Stake:** A false identification could lead the treatment plant to use chemistry that creates a more hazardous byproduct.

**Concepts:** separation, retention, spectral fingerprints, calibration, mixtures

### M4.1 — From mixture to supported identity

**Format:** SEQUENCE · **Area:** IDENT · **Place:** Chromatography Lab

**Scene shown to the player**

> The chromatogram has more peaks than the team has names, and the spectra suggest functional groups that overlap between candidates. Identification of a mixture is a two-part problem: separation, which spreads the components out in time so they can be examined one at a time, and structural evidence, which says what a separated component is. Neither does the other's job. A retention time that matches a standard is a coincidence waiting to happen unless something independent agrees with it, and the treatment plant is about to choose chemistry based on this list.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Separate mixture components under a validated method.
- Measure detector response and retention relative to standards.
- Collect or compare structural spectral information.
- Require agreement across methods before high-confidence identification.

**Correct answer**

1. **Separate mixture components under a validated method.**
2. **Measure detector response and retention relative to standards.**
3. **Collect or compare structural spectral information.**
4. **Require agreement across methods before high-confidence identification.**

**Why (shown in verdict):** Separation reduces overlap; standards and structural evidence then support identity.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** Orthogonal evidence protects against coincidental matches.

### M4.2 — Read analytical disagreement

**Format:** DIAGNOSIS · **Area:** IDENT · **Place:** Spectroscopy Suite

**Scene shown to the player**

> Two methods have been run on the same extract and they do not tell the same story. Every analytical run carries controls for exactly this moment: a blank, which is everything except the sample and therefore answers whether a signal could have come from the laboratory itself, and a second method with different selectivity, which answers whether the first method was fooled by something that merely resembles the target. Reading them together is the skill. A false identification here sends the plant a chemistry that could create a worse product than the one it removes.

**Question**  One explanation has to fit the sample, the blank and the second-method result together. Which is it?

**Panel headline**  A target compound is reported in the river sample at 3.1 minutes — and the laboratory blank has a peak in the same place.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Sample | Peak at 3.1 min | 62 units | alarm |
| Blank | Peak at 3.1 min | 55 units | alarm |
| Sample | Peak at 5.4 min | 88 units, broad | high |
| Sample | Peak at 7.9 min | 34 units | normal |
| Spectrometer | Spectrum at 3.1 min | does not match standard | high |
| Instrument | Calibration check | within limits | normal |

**Figure:** `peaks` — Chromatograms of the river sample and the method blank, run in the same sequence.

**Choices offered**

- The 3.1-minute peak is laboratory contamination — _The blank carries the same peak at nearly the same size, so it entered during preparation — not from the river._
- The river contains the target compound at 62 units — _Take the retention-time match at face value and report the sample result._
- The detector is drifting — _A gain or baseline drift would inflate every peak in the run._
- The 5.4-minute peak is the target, misassigned — _The broad peak is the largest, so it is the compound of interest._
- Nothing is wrong; chromatograms always show small peaks — _Minor features are normal instrument noise and can be ignored._

**Correct answer**

**The 3.1-minute peak is laboratory contamination**

**Why (shown in verdict):** A blank exists to answer exactly one question: did this signal come from the sample? Here it did not — the blank carries the same peak at nearly the same height, so the 3.1-minute response is contamination introduced during preparation. Retention time alone never confirms identity, and the spectrum at 3.1 minutes does not match the standard either. The one peak that survives every check is at 7.9 minutes: absent from the blank, with a matching spectrum.

**Why the others do not hold**

- Reporting 62 units treats a retention-time match as an identification. It is a screening match at best, and the blank has already shown where this peak came from.
- Detector drift would raise the whole baseline and every peak with it. The 7.9-minute peak is unaffected and the calibration check is within limits, so the instrument is not the problem.
- Size is not identity. The 5.4-minute peak is broad enough to be two co-eluting compounds, which makes it the least trustworthy peak to quantify, not the most.
- Dismissing the blank peak as noise discards the only control in the run. A blank peak at 89% of the sample peak is not noise; it is the answer.

**Takeaway:** Analytical confidence rises when independent selectivity points to the same compound.

### M4.3 — Resolve the ambiguous peak

**Format:** CHOICE · **Area:** IDENT · **Place:** Reference Library

**Scene shown to the player**

> One peak is still ambiguous and the review board wants it settled. There are two honest ways to resolve an overlap — improve the separation so the components stop sharing a retention window, or bring in evidence with a different selectivity so the identification no longer depends on the separation at all — and one dishonest way, which is to present the same weak data more attractively. Matrix effects sit underneath all of it: the river is not clean solvent, and everything in it is competing for the instrument's attention.

**Question**  One peak is still ambiguous and the review board wants it settled. What settles it?

**Choices offered**

- A second structural method, with different selectivity.
- A longer column and a slower gradient, to improve the separation.
- Certified reference material and matrix spikes.
- The same data, presented more clearly in the report.

**Correct answer**

**A second structural method, with different selectivity.**

**Why (shown in verdict):** The ambiguity is an overlap in retention time, so the fastest way out is evidence that does not depend on retention time at all. A method with different selectivity cannot inherit the overlap that produced the problem.

**Why the others do not hold**

- Improving the separation is the other honest route, and it is method development — days the review board does not have. Worth doing if the structural method also fails.
- Reference material and matrix spikes say whether the river is suppressing or enhancing the response. They cannot say which compound the peak belongs to.
- Presentation is not selectivity. The same weak data arranged more attractively is the one option here that adds no measurement.

**Takeaway:** Better presentation cannot repair missing selectivity or validation.

---

## Mission 5 — The Concentration Problem

**Objective:** Produce concentration maps whose units, detection limits, and quality controls are explicit.

**Stake:** An incorrect concentration map can either close a safe water system or expose residents through a false reassurance.

**Concepts:** molarity, dilution, Beer-Lambert law, calibration curves, uncertainty

### M5.1 — Undo the dilution

**Format:** BALLPARK · **Area:** QUANT · **Place:** Quantitative Analysis Lab

**Scene shown to the player**

> The instrument reports what was in the vial, not what was in the river. Samples are diluted so that the signal falls inside the range the method can actually measure, and the analyst has to carry that factor back through before the number means anything about the water — a tenfold dilution reported as-is understates the river by a factor of ten. Sample preparation is part of the result, not something that happened to it beforehand. City leaders are comparing the number you hand over against a threshold and closing or opening a water system with it.

**Question**  Estimate the original concentration.

**Givens**

- 10.0 mL sample diluted to 100.0 mL
- Measured diluted concentration = 2.5 mg/L

**Relationship given:** C_original V_sample = C_diluted V_final.

**Correct answer**

Equation shown: `{0} × {1} ÷ {2}`
Tiles offered: `2.5 mg/L  (measured, diluted)`, `100.0 mL  (final volume)`, `10.0 mL  (sample taken)`, `0.25 mg/L  (instrument detection limit)`, `1,000 mL  (bottle volume)`
Tiles that belong: `2.5 mg/L  (measured, diluted)`, `100.0 mL  (final volume)`, `10.0 mL  (sample taken)`
Decoy tiles: `0.25 mg/L  (instrument detection limit)`, `1,000 mL  (bottle volume)`
Formula: `a*b/c`
**Target: 25 mg/L** (tolerance ±2)
Explanation shown: A ten-fold dilution has to be undone before the result is compared with any threshold. Reporting the diluted figure understates the river by a factor of ten.
Book's worked answer: C_original = 2.5×100/10 = 25 mg/L.

**Why (shown in verdict):** The factor-of-ten dilution must be restored before comparing with thresholds.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** Sample preparation is part of the quantitative result.

### M5.2 — Protect the calibration

**Format:** DIAGNOSIS · **Area:** QUANT · **Place:** River Mapping Center

**Scene shown to the player**

> An instrument will return a number for almost anything you put in front of it, which is why quality control exists. A calibration curve is a claim about a specific range of concentrations, built from standards that bracket that range; a blank says whether the laboratory contributed to the signal; a spike recovery says whether the matrix is suppressing or enhancing the response; replicates say whether the measurement is stable at all. Each of them fails in a distinct way, and the panel in front of you contains everything you need to decide whether this reading can be defended.

**Question**  The instrument returned a number. Which explanation fits the calibration, the blank and the spike together?

**Panel headline**  The river sample reads 1.34 absorbance. The highest calibration standard reads 0.98.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Sample | Absorbance | 1.34 | alarm |
| Calibration | Highest standard | 0.98 at 10 mg/L | normal |
| Calibration | Curve linearity | r² = 0.999 to 10 mg/L | normal |
| Blank | Calibration blank | 0.01 absorbance | normal |
| QC | Matrix spike recovery | 97% | normal |
| QC | Replicate scatter | ±1.5% | normal |

**Figure:** `line` — Today’s calibration curve, with the sample’s absorbance drawn across it.

**Choices offered**

- The result is outside the calibrated range — _Above the top standard the instrument response is unverified, so converting 1.34 to a concentration extrapolates a relationship nobody measured._
- Matrix interference is inflating the reading — _Something in the river water adds absorbance the analyte did not produce._
- The blank is contaminated — _A dirty baseline lifts every reading in the batch._
- The measurement is imprecise and should be repeated — _Scattered replicates mean the number cannot be trusted as it stands._
- The reading is fine; report 13.7 mg/L by extending the line — _The curve is linear with r² = 0.999, so it can be extended past the last standard._

**Correct answer**

**The result is outside the calibrated range**

**Why (shown in verdict):** Every quality control on this panel is clean: the blank is at 0.01, spike recovery is 97%, replicates agree to 1.5%, and the curve is linear across the range it actually covers. Nothing is wrong with the measurement — the problem is that 1.34 lies beyond the last point anyone verified. Detectors saturate, and linearity is a property of a measured interval, not a promise about everything above it. Dilute the sample into the calibrated range and re-run it.

**Why the others do not hold**

- Matrix interference would show as poor spike recovery. Recovery is 97%, so the river matrix is behaving.
- A contaminated blank would read high. This one reads 0.01, and it would in any case lift the standards along with the sample.
- Imprecision would show as replicate scatter. These agree to ±1.5%; the result is repeatable, it is simply repeatable and unverified.
- Extending the line past the last standard is the specific mistake this panel is built around. r² = 0.999 describes the fit between 0 and 10 mg/L and says nothing about 13.7.

**Takeaway:** A numerical display does not guarantee a valid concentration.

### M5.3 — Map concentration with limited samples

**Format:** CHOICE · **Area:** QUANT · **Place:** Quality Assurance Desk

**Scene shown to the player**

> The city wants a concentration map and you cannot sample every metre of river. A map is a compromise between two things that both cost money: analytical validity, which is whether each number can be trusted, and spatial coverage, which is whether the numbers are in the places the decision depends on. Neither alone protects anybody — perfect chemistry at the wrong points, or dense sampling with an unvalidated method, both produce a confident map that misleads. Decide where the decisions actually get made, then spend on the sampling that constrains them.

**Question**  You cannot sample every metre of river. Where do the samples go?

**Choices offered**

- Densely, around the drinking-water intake.
- Spread along the river, upstream and downstream, over several days.
- Into replicates, blanks and spikes at every site already planned.
- Wherever the water is visibly discoloured.

**Correct answer**

**Densely, around the drinking-water intake.**

**Why (shown in verdict):** A map is worth exactly what the decisions it supports are worth, and every decision the city is about to make is made at the intake. Coverage anywhere else buys resolution nobody will act on.

**Why the others do not hold**

- Longitudinal sampling captures transport and is the second call. It answers where the contaminant is going rather than what the intake is drawing.
- Replicates, blanks and spikes make each number defensible and place none of them. They are how you sample, not where.
- Sampling the discoloured water samples the appearance. The compound that matters here is colourless.

**Takeaway:** Spatial coverage without analytical validity—or validity without spatial coverage—cannot protect the city.

---

## Mission 6 — A Reaction Underground

**Objective:** Estimate the maximum reaction scale and define measurements that verify whether the assumed chemistry is occurring.

**Stake:** Entering before bounding the chemistry could expose crews to heat, pressure, or oxygen displacement.

**Concepts:** balanced equations, mole ratios, limiting reactant, yield, gas production

### M6.1 — From identity to reaction estimate

**Format:** SEQUENCE · **Area:** ENERGY · **Place:** Sewer Monitoring Station

**Scene shown to the player**

> Two drainage streams may be meeting in a confined tunnel, and crews are waiting for permission to enter. Every quantitative prediction about a reaction rests on a balanced chemical equation, because the balanced equation is what supplies the ratios: moles of one reactant to moles of another, and moles of reactant to moles of product. Written the wrong way round it produces confident numbers about a reaction that is not happening. The reason for the order of this work is that each step depends on the one before it being right.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Write and balance the plausible reaction.
- Convert measured amounts to moles.
- Use mole ratios to identify the limiting reactant.
- Calculate theoretical products and compare with observed gas or heat.

**Correct answer**

1. **Write and balance the plausible reaction.**
2. **Convert measured amounts to moles.**
3. **Use mole ratios to identify the limiting reactant.**
4. **Calculate theoretical products and compare with observed gas or heat.**

**Why (shown in verdict):** A balanced equation defines the conversion ratios before amounts can be compared.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** Stoichiometry is a conditional prediction based on a specified reaction.

### M6.2 — Which reactant limits?

**Format:** BALLPARK · **Area:** ENERGY · **Place:** Stoichiometry Lab

**Scene shown to the player**

> A generic reaction takes two moles of A for every mole of B, and both are arriving in the tunnel in amounts nobody chose. The limiting reactant is the one that runs out first, and it is what sets the maximum extent of reaction — the rest of the other reagent simply sits there once its partner is gone. That is why an estimate based on the larger quantity is not conservative but wrong: it predicts heat and gas that cannot physically be produced. Confined-space entry decisions are being made from this number.

**Question**  Identify the limiting reactant and maximum reaction extent in moles of B consumed.

**Givens**

- Available A = 10 mol
- Available B = 8 mol

**Relationship given:** Two moles A are required per mole B.

**Correct answer**

Equation shown: `the smaller of  {0} ÷ 2  and  {1}`
Tiles offered: `10 mol A available`, `8 mol B available`, `2 mol A per mol B  (the ratio itself)`, `18 mol  (A and B added together)`
Tiles that belong: `10 mol A available`, `8 mol B available`
Decoy tiles: `2 mol A per mol B  (the ratio itself)`, `18 mol  (A and B added together)`
Formula: `Math.min(a/2, b)`
**Target: 5 mol B** (tolerance ±0.5)
Explanation shown: The reactant present in the larger amount is not the one that governs. Dividing each amount by its coefficient shows A runs out first, which also means B is still there afterwards.
Book's worked answer: 10 mol A can consume 5 mol B, so A is limiting and at most 5 mol B react.

**Why (shown in verdict):** Three moles B remain if the reaction goes to completion.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** Limiting-reactant logic prevents impossible product estimates.

### M6.3 — Is the assumed reaction happening?

**Format:** PROTOCOL · **Area:** ENERGY · **Place:** Confined-Space Safety Command

**Scene shown to the player**

> The team has a balanced equation and a plausible story. Neither is evidence. A chemical claim becomes testable through conserved quantities — mass in against mass out, elements accounted for on both sides — and through product signatures that would only be present if that particular reaction is what actually occurred. Controls matter as much here as they do in the laboratory, because a confined tunnel supplies plenty of alternative explanations for a temperature rise or a gas reading. Crews go in on the strength of what you conclude here.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Expected gas appears with the predicted ratio to reactant loss.
- Temperature rises but no products are measured.
- One reactant disappears in the blank.
- Observed product exceeds the theoretical maximum.

**Choices offered**

- Evidence supports the proposed reaction.
- Heat alone is nonspecific; test alternatives.
- The method or container may be consuming the reactant.
- The reaction model, units, or measurement is wrong.

**Correct answer**

1. Expected gas appears with the predicted ratio to reactant loss.  →  **Evidence supports the proposed reaction.**
2. Temperature rises but no products are measured.  →  **Heat alone is nonspecific; test alternatives.**
3. One reactant disappears in the blank.  →  **The method or container may be consuming the reactant.**
4. Observed product exceeds the theoretical maximum.  →  **The reaction model, units, or measurement is wrong.**

**Why (shown in verdict):** Mass balance and controls constrain reaction claims.

**Why the others do not hold**

- Situation 1: The supported response is "Evidence supports the proposed reaction." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "Heat alone is nonspecific; test alternatives." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "The method or container may be consuming the reactant." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "The reaction model, units, or measurement is wrong." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** A balanced equation is testable through conserved quantities and product signatures.

---

## Mission 7 — The Heat Is Rising

**Objective:** Create an energy balance and choose a monitoring plan that detects self-heating early.

**Stake:** If self-heating is mistaken for leftover warmth, responders may leave before runaway conditions develop.

**Concepts:** enthalpy, calorimetry, specific heat, energy balance, exothermic reactions

### M7.1 — How much energy raises the temperature?

**Format:** BALLPARK · **Area:** ENERGY · **Place:** Thermal Camera Team

**Scene shown to the player**

> The visible fire has been out for two hours and the storage zone is still warming. The energy needed to change the temperature of a material is its mass times its specific heat capacity times the temperature change, which is why a small rise across a large thermal mass can represent a very large amount of energy — water's high heat capacity is exactly what makes it a good containment bath and also what hides how much energy has gone in. The number decides whether cooling capacity on site is adequate or decorative.

**Question**  Estimate the absorbed heat.

**Givens**

- mass = 2,000 kg
- specific heat = 4.2 kJ kg^-1 K^-1
- temperature rise = 5 K

**Relationship given:** q = mcΔT.

**Correct answer**

Equation shown: `{0} × {1} × {2}`
Tiles offered: `2,000 kg  (mass of the bath)`, `4.2 kJ kg⁻¹ K⁻¹  (specific heat)`, `5 K  (temperature rise)`, `2,260 kJ kg⁻¹  (latent heat of vaporisation)`, `300 K  (ambient temperature)`
Tiles that belong: `2,000 kg  (mass of the bath)`, `4.2 kJ kg⁻¹ K⁻¹  (specific heat)`, `5 K  (temperature rise)`
Decoy tiles: `2,260 kJ kg⁻¹  (latent heat of vaporisation)`, `300 K  (ambient temperature)`
Formula: `a*b*c`
**Target: 42000 kJ** (tolerance ±2500)
Explanation shown: A rise of only five degrees looks negligible until it is multiplied by a large thermal mass. Note this is sensible heat alone — a phase change or a continuing reaction would add far more.
Book's worked answer: q ≈ 2,000×4.2×5 = 42,000 kJ = 42 MJ.

**Why (shown in verdict):** A modest temperature rise in a large thermal mass can represent substantial energy.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** Temperature becomes meaningful when connected to mass and heat capacity.

### M7.2 — Stored heat or continuing reaction?

**Format:** DIAGNOSIS · **Area:** ENERGY · **Place:** Calorimetry Lab

**Scene shown to the player**

> Two bays are warm and Fire Command wants to know whether to release the site. There are only two ways a mass can be hot: it absorbed energy earlier and has not yet lost it, or it is making energy now. Those behave completely differently over time — anything that is merely storing heat can only cool toward its surroundings once the source is removed, while a self-heating mass can rise on its own and rise faster as it goes. The panel gives you both bays, and getting this wrong sends responders home before a runaway.

**Question**  Fire Command needs to know whether this is heat left over from the fire or a reaction still running. Which explanation fits every zone?

**Panel headline**  Ninety minutes after cooling was shut off, the west bay is still climbing — and it has crossed the confined-entry limit.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| West bay | Bulk temperature | 96 °C, rising 0.4 °C/min | alarm |
| East bay | Bulk temperature | 40 °C, falling | normal |
| West bay | Off-gas | detectable and increasing | high |
| West bay | Hot spot position | stationary at the drum stack | high |
| Ambient | Air temperature | 22 °C | normal |
| Instruments | Sensor calibration | all four share one reference | high |

**Figure:** `line` — Bulk temperature in the two storage bays after external cooling was withdrawn.

**Choices offered**

- An exothermic reaction is still running in the west bay — _Temperature rises after the heat source is removed, off-gas is increasing, and the hot spot is fixed at the material — heat is being generated, not stored._
- Stored heat from the fire is still dissipating — _A large thermal mass takes hours to give up the heat it absorbed._
- The temperature sensors are miscalibrated — _All four share one calibration reference, so one bad reference would corrupt every reading._
- Hot fluid circulation is carrying heat into the west bay — _Convection moves a hot region around the bay and can make one sensor read high._
- Nothing unusual; bays always differ after a fire — _Two bays exposed to the same fire will cool at different rates._

**Correct answer**

**An exothermic reaction is still running in the west bay**

**Why (shown in verdict):** Stored heat can only leave. Once the external source is gone, a hot mass falls toward ambient — which is exactly what the east bay does. The west bay does the opposite, and it does so while producing off-gas from a hot spot that has not moved. Heat that increases with no source is heat being made. The distinction matters because cooling has to out-run generation, not merely carry away a fixed quantity, and the entry limit has already been crossed.

**Why the others do not hold**

- Stored heat is the explanation the east bay fits, and it is why the east bay is the control. A stored-heat curve cannot rise after the source is withdrawn.
- The shared calibration reference is a real common-mode risk and worth fixing, but it would push both bays the same way. West rises while east falls, so the divergence is physical rather than instrumental.
- Circulation moves a hot region around. This hot spot is stationary at the drum stack, and convection cannot add energy to a closed bay in any case.
- Two bays cooling at different rates is ordinary. One bay heating while the other cools is not, and treating it as ordinary is how a crew gets sent into a confined space.

**Takeaway:** Thermal diagnosis requires an energy balance, not a single temperature threshold.

### M7.3 — Control the self-heating risk

**Format:** CHOICE · **Area:** ENERGY · **Place:** Fire Command

**Scene shown to the player**

> A self-heating mass is a race between the energy a reaction produces and the energy the surroundings can carry away, and that race can be lost slowly enough that nobody notices until it cannot be won. Controlling it takes three separate things that no one of them substitutes for: detection early enough to act, understanding of the mechanism so that the action is the right one, and enough physical cooling or dilution capacity to change the balance. Fire Command wants the site released tonight, and one of the three has to be in place before that can happen.

**Question**  Fire Command wants the site released tonight. What do you require first?

**Choices offered**

- Continuous temperature and heat-flow monitoring in the bays.
- Small-scale calorimetry on material taken from the drum stack.
- Cooling capacity brought on site and tested against a loss of supply.
- One more temperature reading at the door before the crews leave.

**Correct answer**

**Continuous temperature and heat-flow monitoring in the bays.**

**Why (shown in verdict):** Self-heating is a race between what a reaction generates and what the surroundings can carry away, and the only thing that says which is winning is the trend. A site is safe to release when somebody can see the trend, not when one reading is acceptable.

**Why the others do not hold**

- Calorimetry gives the mechanism and the rate, and it takes days. Commission it; it does not decide tonight.
- Cooling capacity changes the balance and has to know which way the balance is going before it can be sized.
- One final reading before leaving is exactly the measurement that failed this afternoon: the bay was warm and falling, and the west bay was warm and rising.

**Takeaway:** High-consequence thermal systems need detection, understanding, and mitigation.

---

## Mission 8 — Will the Reaction Run Away?

**Objective:** Identify the controlling rate factors and define a safe operating envelope with automatic shutdown triggers.

**Stake:** A treatment intended to remove contamination could become the largest hazard on the site.

**Concepts:** reaction rate, activation energy, Arrhenius behavior, catalysis, feedback

### M8.1 — What changes the rate?

**Format:** PROTOCOL · **Area:** ENERGY · **Place:** Kinetics Lab

**Scene shown to the player**

> The treatment chemical is quiet in the drum and vigorous in the warm vessel. Thermodynamics says whether a reaction can go and how much energy it releases; kinetics says how fast, and the two are independent — a strongly favourable reaction can sit unchanged for years behind a large activation barrier. Temperature, concentration and catalysis each act on the rate through a different mechanism: one supplies more molecules with enough energy to cross the barrier, one changes how often they meet, and one lowers the barrier itself. The pilot vessel is where the difference stops being academic.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Raise reactant concentration.
- Raise temperature.
- Add a catalyst.
- Change product energy while leaving the pathway unchanged.

**Choices offered**

- Often increases collision frequency and rate.
- Increases the fraction of collisions able to cross the barrier.
- Provides a lower-activation-energy pathway.
- Changes thermodynamic driving force, not necessarily the activation barrier.

**Correct answer**

1. Raise reactant concentration.  →  **Often increases collision frequency and rate.**
2. Raise temperature.  →  **Increases the fraction of collisions able to cross the barrier.**
3. Add a catalyst.  →  **Provides a lower-activation-energy pathway.**
4. Change product energy while leaving the pathway unchanged.  →  **Changes thermodynamic driving force, not necessarily the activation barrier.**

**Why (shown in verdict):** Rate and thermodynamic favorability are related but distinct.

**Why the others do not hold**

- Situation 1: The supported response is "Often increases collision frequency and rate." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "Increases the fraction of collisions able to cross the barrier." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "Provides a lower-activation-energy pathway." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "Changes thermodynamic driving force, not necessarily the activation barrier." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** A reaction can be favorable yet slow, or fast only after a barrier is lowered.

### M8.2 — Build a runaway feedback loop

**Format:** SEQUENCE · **Area:** ENERGY · **Place:** Pilot Treatment Vessel

**Scene shown to the player**

> A runaway is not an explosion that comes out of nowhere; it is a feedback loop with an obvious first step. An exothermic reaction releases heat, that heat raises the temperature of the mixture, a higher temperature increases the reaction rate, and a faster reaction releases heat sooner — while the cooling system removes heat at a rate set by fixed geometry and a temperature difference it cannot control. Put the chain in order and it stops being alarming and starts being designable. Get the order wrong and you will engineer against the wrong link.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Reaction releases heat.
- Temperature rises because heat removal lags.
- The rate constant increases.
- Faster reaction releases heat still more rapidly.

**Correct answer**

1. **Reaction releases heat.**
2. **Temperature rises because heat removal lags.**
3. **The rate constant increases.**
4. **Faster reaction releases heat still more rapidly.**

**Why (shown in verdict):** Exothermic heat and temperature-sensitive kinetics form positive feedback.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** Runaway risk emerges from coupling reaction rate to imperfect heat removal.

### M8.3 — Define the safe operating envelope

**Format:** CHOICE · **Area:** ENERGY · **Place:** Process Control Room

**Scene shown to the player**

> A safe operating envelope is a set of conditions under which the heat a process generates cannot outrun the heat it can lose. Establishing one takes measured rate data rather than assumed kinetics, honest heat-removal capacity at the worst case rather than the design case, and protection that works when the control system is the thing that has failed. Speed and yield are not safety, and a process that runs beautifully at the intended temperature can be the largest hazard on site fifteen degrees above it. What the vessel needs before it runs at scale is the bound, not the throughput.

**Question**  What has to be true before the treatment vessel runs at scale?

**Choices offered**

- Measured reaction rate across the whole expected temperature range.
- Cooling performance tested, including a loss of cooling.
- Independent temperature and pressure shutdowns, wired around the controller.
- Enough catalyst to finish each batch inside the shift.

**Correct answer**

**Measured reaction rate across the whole expected temperature range.**

**Why (shown in verdict):** The envelope is the set of conditions where generated heat cannot outrun removable heat, and generation is the side that rises steeply with temperature. Assumed kinetics turns the bound into a guess, and the guess is wrong in the direction that matters.

**Why the others do not hold**

- Cooling performance is the other half of the same inequality, and it is uninterpretable without a rate curve to compare it against.
- Independent shutdowns protect against the control system being the thing that failed. They are required whatever the envelope turns out to be, and they define nothing.
- More catalyst finishes faster by moving the process toward the boundary this exercise exists to locate.

**Takeaway:** Speed is not safety when the process contains positive thermal feedback.

---

## Mission 9 — The Water Changes pH

**Objective:** Select a controlled neutralization strategy and determine when buffer capacity will be exhausted.

**Stake:** A pH correction can mobilize metals, damage infrastructure, or injure workers if the chemical context is ignored.

**Concepts:** pH, strong and weak acids, buffers, titration, neutralization

### M9.1 — How many moles of acid are present?

**Format:** BALLPARK · **Area:** WATER · **Place:** Water Intake Laboratory

**Scene shown to the player**

> The river intake has turned acidic and the plant needs a neutralisation dose. pH is a logarithmic measure of the hydrogen ion concentration that is free in solution right now — one pH unit is a factor of ten — so a modest-looking change in pH is a large change in concentration, and pH alone tells you nothing about how much acid is waiting undissociated to take its place. Convert to moles first. Dosing on the pH number alone is how a plant overshoots from acidic straight into strongly basic.

**Question**  Estimate moles of hydrogen ion represented by the free concentration.

**Givens**

- volume = 1,000 L
- [H+] = 1.0×10^-4 mol/L

**Relationship given:** moles H+ = concentration × volume.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `1,000 L  (volume treated)`, `1.0×10⁻⁴ mol/L  ([H⁺] measured)`, `4.0  (the pH reading)`, `1.0×10⁻⁷ mol/L  ([H⁺] in neutral water)`
Tiles that belong: `1,000 L  (volume treated)`, `1.0×10⁻⁴ mol/L  ([H⁺] measured)`
Decoy tiles: `4.0  (the pH reading)`, `1.0×10⁻⁷ mol/L  ([H⁺] in neutral water)`
Formula: `a*b`
**Target: 0.1 mol H⁺** (tolerance ±0.02)
Explanation shown: This is the free hydrogen ion only. Weak acids and buffers release more H⁺ as neutralisation proceeds, so a titration measures the real base demand far better than pH does.
Book's worked answer: 0.10 mol H+ in the measured free pool.

**Why (shown in verdict):** Real water may contain weak acids and buffers that release additional H+ during neutralization; titration measures total demand better than pH alone.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** pH is logarithmic and does not by itself equal total acid inventory.

### M9.2 — Read the titration curve

**Format:** DIAGNOSIS · **Area:** WATER · **Place:** Acid-Base Bench

**Scene shown to the player**

> The curve on the screen is the result of adding base slowly and watching what the solution does. A titration is two instruments in one: quantitatively it measures how much base was needed to reach the equivalence point, which is a measure of total acid rather than free acid, and diagnostically its shape identifies the chemistry — the steepness of the rise, the presence or absence of a flat region, and where the equivalence point falls all say something about what kind of acid is in the water. The plant will dose the intake from your reading.

**Question**  The titration curve is on screen. Which explanation accounts for the plateau, the equivalence point and the dose the trial actually needed?

**Panel headline**  The intake reads pH 4.6. Dosing for a strong acid at that pH overshoots badly on the trial batch.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Intake | pH | 4.6 | alarm |
| Titration | Plateau from 4 to 20 mL | pH moves 4.1 → 5.2 | high |
| Titration | Equivalence point | pH 8.4 | high |
| Titration | Base to equivalence | 25 mL | alarm |
| Reference | Strong acid at the same pH | 5 mL to equivalence | normal |
| Bench | Electrode calibration | pH 4 and 7 buffers within 0.02 | normal |

**Figure:** `line` — Titration of the intake water with standard base. The dashed line marks neutral pH.

**Choices offered**

- The water contains a weak acid and its buffer system — _A long plateau, an equivalence point above pH 7 and five times the expected base demand are what a weak acid does — pH shows the free H⁺, not the reservoir behind it._
- The intake is a strong acid at pH 4.6 — _Read the pH, calculate the free hydrogen ion, and dose to match it._
- The pH electrode is out of calibration — _A drifting electrode would explain why the dose calculated from pH was wrong._
- The base used for dosing is more concentrated than labelled — _An over-strength reagent would overshoot regardless of the water chemistry._
- Nothing unusual; treatment always needs a safety factor — _Operators routinely add extra base to be sure of neutralising._

**Correct answer**

**The water contains a weak acid and its buffer system**

**Why (shown in verdict):** pH measures the hydrogen ion that is free right now. A weak acid keeps most of its acidity in reserve, undissociated, and releases it as base is added — which is what the sixteen-millilitre plateau is. The equivalence point above pH 7 confirms it: the conjugate base left at the end is itself basic. That is why the water needed five times the base a strong acid at the same pH would, and why a dose calculated from pH alone first under-treats and then, once the buffer is exhausted, overshoots into strongly basic conditions.

**Why the others do not hold**

- A strong acid at pH 4.6 is the reference curve on the same axes, and it reaches equivalence at 5 mL with a sharp rise and no plateau. The intake does neither.
- The electrode was calibrated against pH 4 and 7 buffers to within 0.02. The pH reading is correct — it is simply answering a different question from the one the dose needed.
- An over-strength base would overshoot, but it would also shorten the titration. This titration took five times *more* base than expected, not less.
- A safety factor is a policy, not a mechanism, and it cannot explain a plateau, an equivalence point at 8.4, or a five-fold demand. Adding margin on top of a misread curve is how the overshoot happened.

**Takeaway:** Titration is both a quantitative method and a diagnostic fingerprint.

### M9.3 — Control pH without overshoot

**Format:** CHOICE · **Area:** WATER · **Place:** Treatment Control Room

**Scene shown to the player**

> Neutralisation in a live water system is a control problem, not an arithmetic problem. The dose calculated from one grab sample assumes the water is uniform, the demand is fully characterised and the mixing is instantaneous, and none of those is true in a treatment train. Overshooting into strongly basic conditions is not a smaller mistake than under-dosing: it can mobilise metals from pipework and sediment that the acidic water was leaving alone. The plant is waiting on a dose, and what it is given first decides whether the correction is a measurement or a guess.

**Question**  The plant wants a neutralisation dose this morning. What do you give them?

**Choices offered**

- A bench titration of representative intake water, to measure the demand.
- The dose calculated from the measured pH.
- Continuous pH monitoring with independent electrode checks.
- Staged addition with mixing and hold points between each stage.

**Correct answer**

**A bench titration of representative intake water, to measure the demand.**

**Why (shown in verdict):** pH reports the hydrogen ion that is free right now, and a weak acid holds most of its acidity undissociated in reserve. Titration measures the total the base will actually have to neutralise, which is the number a dose has to be computed from.

**Why the others do not hold**

- A dose from pH alone is how the trial batch overshot: it under-treats while the buffer holds, and then runs away once the buffer is exhausted.
- Continuous monitoring is how the overshoot is caught. Catching it is not preventing it.
- Staged addition with hold points is the right way to deliver whatever dose you compute, and it cannot tell you what the dose is.

**Takeaway:** Neutralization should be governed by measurement and mixing, not a one-shot calculation.

---

## Mission 10 — Equilibrium in the Reservoir

**Objective:** Predict how pH and ligands shift dissolved concentration and design monitoring for remobilization.

**Stake:** An apparently clean reservoir can become contaminated again when chemistry or flow changes.

**Concepts:** equilibrium, Le Châtelier principle, solubility product, complex ions, phase transfer

### M10.1 — From condition change to new equilibrium

**Format:** SEQUENCE · **Area:** WATER · **Place:** Reservoir Sampling Dock

**Scene shown to the player**

> After the pH adjustment the dissolved concentration has fallen and the sediment concentration has risen. A chemical equilibrium shifts in response to changes in conditions, but the total amount of material is conserved throughout — nothing about a shift destroys anything. Predicting where a system lands takes both halves: the equilibrium expressions, which say which direction it moves, and a mass balance, which says how much of what has to be somewhere. Reading only the water is how a reservoir gets declared clean while the contaminant is settling to the bottom of it.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Identify the relevant dissolution, precipitation, or complexation reactions.
- Write the equilibrium relationships and mass balance.
- Change pH, ligand concentration, or ionic strength in the model.
- Predict and then measure redistribution among dissolved and solid forms.

**Correct answer**

1. **Identify the relevant dissolution, precipitation, or complexation reactions.**
2. **Write the equilibrium relationships and mass balance.**
3. **Change pH, ligand concentration, or ionic strength in the model.**
4. **Predict and then measure redistribution among dissolved and solid forms.**

**Why (shown in verdict):** Equilibrium predictions require both reaction expressions and conservation of total material.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** A lower dissolved concentration may mean phase transfer, not removal from the system.

### M10.2 — Interpret the shift

**Format:** PROTOCOL · **Area:** WATER · **Place:** Equilibrium Chemistry Group

**Scene shown to the player**

> A treatment that works today has to keep working when the conditions change, and reservoirs change constantly — pH, temperature, ionic strength, dissolved oxygen and the removal of a solid phase all push on the same equilibria. Le Chatelier's principle gives the direction: a system at equilibrium responds to a change by shifting in the direction that partly offsets it. What this means in practice is that a contaminant locked into a solid under this month's chemistry can be released again under next month's, and nobody will be sampling for it by then.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- A solid precipitate is removed from contact with water.
- A ligand strongly binds the dissolved metal.
- pH shifts to favor an insoluble hydroxide.
- Sediment later encounters acidic water.

**Choices offered**

- Further dissolution pressure is reduced after physical removal.
- Complexation can increase total dissolved concentration.
- Precipitation is favored.
- Previously precipitated material may remobilize.

**Correct answer**

1. A solid precipitate is removed from contact with water.  →  **Further dissolution pressure is reduced after physical removal.**
2. A ligand strongly binds the dissolved metal.  →  **Complexation can increase total dissolved concentration.**
3. pH shifts to favor an insoluble hydroxide.  →  **Precipitation is favored.**
4. Sediment later encounters acidic water.  →  **Previously precipitated material may remobilize.**

**Why (shown in verdict):** Equilibria respond to chemical conditions and removal of phases.

**Why the others do not hold**

- Situation 1: The supported response is "Further dissolution pressure is reduced after physical removal." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "Complexation can increase total dissolved concentration." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "Precipitation is favored." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "Previously precipitated material may remobilize." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** Treatment plans must anticipate the next environment, not only the current sample.

### M10.3 — Manage the new contaminant reservoir

**Format:** CHOICE · **Area:** WATER · **Place:** Sediment Management Office

**Scene shown to the player**

> The dissolved concentration is down and seventy per cent of the contaminant is now in sediment at the bottom of the reservoir. A treatment endpoint is not a concentration in one phase; it is an account of where the mass went and what will happen to it there. That takes characterisation of the solid, monitoring under conditions that might release it again, and a decision about disposition that somebody is actually funded to carry out. The contaminant is still yours, and what the city commits to now is what will be running when the conditions change.

**Question**  Seventy per cent of the contaminant is now in the sediment. What does the city commit to?

**Choices offered**

- Monitoring dissolved and particulate forms across the seasons.
- Characterising the solid phase and its stability.
- Planning secure removal or isolation of the sediment.
- Closing the incident, since the filtered water now meets the criteria.

**Correct answer**

**Monitoring dissolved and particulate forms across the seasons.**

**Why (shown in verdict):** The sediment is stable under this month’s chemistry. The question the endpoint actually turns on is whether it is still stable next spring, when the pH, the temperature and the flow are different — and only a measurement made then can answer it.

**Why the others do not hold**

- Characterising the solid says what it is. It does not say what it will do when the water above it changes, which is the risk.
- Removal or isolation is the action monitoring would trigger, and committing to it now spends the budget before anybody knows whether it is needed.
- Clear filtered water is what the mass balance already contradicts: the contaminant did not leave, it moved.

**Takeaway:** A treatment endpoint should include the fate of the contaminant mass.

---

## Mission 11 — The Corrosion Failure

**Objective:** Identify the corrosion cell and choose controls that address both chemistry and electrical coupling.

**Stake:** A hidden localized failure could interrupt drinking water during the emergency.

**Concepts:** oxidation and reduction, galvanic cells, electrode potential, corrosion, protective strategies

### M11.1 — Find the anode and cathode

**Format:** PROTOCOL · **Area:** TREAT · **Place:** Pipeline Inspection Gallery

**Scene shown to the player**

> Acidic water and two dissimilar metals in contact are all corrosion needs. Corrosion is an electrochemical circuit with four parts that must all be present: an anode where metal is oxidised and lost, a cathode where a matching reduction occurs, an electron path through the metal, and an ion path through the water. Break any one of them and the circuit stops. That is why treating a corroding pipe as a materials problem alone misses most of the available fixes, and why the intake pipeline for a city's drinking water is a bad place to guess.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Metal atoms lose electrons and enter solution.
- A surface consumes electrons in a reduction reaction.
- Two dissimilar metals are electrically connected in an electrolyte.
- A protective coating is breached at one small point.

**Choices offered**

- Anodic oxidation site.
- Cathodic reduction site.
- A galvanic cell can form.
- Localized attack may concentrate at the defect.

**Correct answer**

1. Metal atoms lose electrons and enter solution.  →  **Anodic oxidation site.**
2. A surface consumes electrons in a reduction reaction.  →  **Cathodic reduction site.**
3. Two dissimilar metals are electrically connected in an electrolyte.  →  **A galvanic cell can form.**
4. A protective coating is breached at one small point.  →  **Localized attack may concentrate at the defect.**

**Why (shown in verdict):** Corrosion is an electrochemical circuit involving electron and ion paths.

**Why the others do not hold**

- Situation 1: The supported response is "Anodic oxidation site." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "Cathodic reduction site." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "A galvanic cell can form." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "Localized attack may concentrate at the defect." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** Stopping corrosion requires breaking or controlling the full circuit.

### M11.2 — How fast can material disappear?

**Format:** BALLPARK · **Area:** TREAT · **Place:** Electrochemistry Lab

**Scene shown to the player**

> An average corrosion rate is a mass loss spread evenly over an area, and metal almost never obliges. A uniform rate of a fraction of a millimetre a year sounds survivable; the same total loss concentrated at a defect in a coating perforates the wall in a season, because the entire anodic current is being delivered into a small patch. Work out the average anyway — it bounds the problem and it is what maintenance budgets are written against — but the number to hand over is the one that says where the metal is going, not just how much.

**Question**  Estimate the uniform penetration rate, in millimetres per year.

**Givens**

- corrosion mass loss = 2.0 kg/year
- affected area = 4.0 m²

**Relationship given:** average loss rate per area = mass loss / area.

**Correct answer**

Equation shown: `{0} ÷ ( {1} × {2} ) × {3}`
Tiles offered: `2.0 kg/year  (mass lost)`, `4.0 m²  (area affected)`, `7,900 kg/m³  (density of the steel)`, `1,000 mm per metre`, `6 mm  (remaining wall thickness)`, `1,000 kg/m³  (density of water)`
Tiles that belong: `2.0 kg/year  (mass lost)`, `4.0 m²  (area affected)`, `7,900 kg/m³  (density of the steel)`, `1,000 mm per metre`
Decoy tiles: `6 mm  (remaining wall thickness)`, `1,000 kg/m³  (density of water)`
Formula: `a / (b * c) * d`
**Target: 0.0633 mm per year** (tolerance ±0.008)
Explanation shown: A mass loss per unit area is not a depth until it is divided by a density; the two densities offered differ by a factor of eight, and only one of them is the metal. The answer matters because it is survivable: at this rate the wall lasts a working lifetime. The same total loss concentrated at a coating defect perforates it in a season, which is why the average is a bound and not a forecast.
Book's worked answer: 0.50 kg m^-2 year^-1.

**Why (shown in verdict):** Two kilograms a year spread over four square metres of steel is about sixty microns of depth a year, which would take a century to reach through a six-millimetre wall. That is the number that says uniform corrosion is not the problem here — and it is the same number that makes localised attack so much worse, because all of it arrives in one place.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** A corrosion rate becomes a decision only once it is a depth compared against a wall.

### M11.3 — Protect the pipeline

**Format:** CHOICE · **Area:** TREAT · **Place:** Maintenance Control

**Scene shown to the player**

> Protecting a pipeline means attacking the circuit at whichever point is cheapest to break. Water chemistry changes how aggressive the electrolyte is; coatings interrupt the ion path but concentrate the attack wherever they fail; electrical isolation removes the galvanic couple between dissimilar metals; cathodic protection supplies electrons so that the pipe stops being the anode; inspection tells you which of them is working before a leak does. They are complementary, not alternatives, and the city cannot afford to lose the intake in the middle of the emergency.

**Question**  The corrosion cell is running. Which control goes in first?

**Choices offered**

- Electrically isolate the dissimilar metals where the coupling is.
- Adjust the water chemistry to make the electrolyte less aggressive.
- Recoat the pipe and inspect the coating for defects.
- Reissue the leak report with the inspection photographs attached.

**Correct answer**

**Electrically isolate the dissimilar metals where the coupling is.**

**Why (shown in verdict):** Corrosion needs four things at once, and the circuit stops when any one of them is broken. The electron path between two dissimilar metals is the only part of it that can be cut without asking the treatment plant to change what it is dosing or trusting a coating not to fail.

**Why the others do not hold**

- Water chemistry works and is constrained by everything else the treatment train has to achieve, including the neutralisation that started this.
- Coatings interrupt the ion path and concentrate the entire anodic current wherever they fail, which is why they cannot be installed without an inspection programme.
- A better-presented leak report changes nothing in the circuit, and the intake is what is at risk.

**Takeaway:** Corrosion protection is a designed system of materials, environment, and inspection.

---

## Mission 12 — Remove It Without Making It Worse

**Objective:** Choose a treatment train using contaminant removal, byproduct formation, waste fate, and operational reliability.

**Stake:** A rapid treatment can create a less visible but more persistent hazard.

**Concepts:** oxidation-reduction treatment, adsorption, precipitation, mass balance, byproducts

### M12.1 — What did the treatment actually do?

**Format:** DIAGNOSIS · **Area:** TREAT · **Place:** Pilot Treatment Plant

**Scene shown to the player**

> The pilot plant has run and the city wants to hear that the contaminant is gone. A mass balance across every stream is what makes that claim checkable: what came in, what left in the treated water, what left in the sludge, what left as off-gas, and what is unaccounted for. Removal from water and destruction are two different claims, and only one of them means the hazard has ended — a contaminant concentrated into a solid is smaller in volume, easier to handle, and still entirely present. Read all the streams, not the one being asked about.

**Question**  Read the mass balance across every stream, not just the one the city is asking about.

**Panel headline**  Treated water is down to 6 kg of the 100 kg that went in. The plant is being described as 94% effective.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Water | Contaminant out | 6 kg of 100 kg | normal |
| Sludge | Contaminant in solids | 71 kg | high |
| Off-gas | Volatilised | 3 kg | normal |
| Balance | Unaccounted mass | 20 kg | alarm |
| Byproduct bench | Transformation product | detected, no validated standard | high |
| Plant | Flow and residence time | at design values | normal |

**Figure:** `bars` — Mass balance across the pilot treatment train for one campaign.

**Choices offered**

- The contaminant was moved, not destroyed — _Only 3 kg left as gas. 71 kg is in sludge and 20 kg is unaccounted for — most likely as the transformation product the bench can see but cannot yet quantify._
- The treatment destroyed 94% of the contaminant — _Influent minus effluent is the removal efficiency._
- The plant is running outside its design conditions — _Off-spec flow or residence time would explain an unexpected result._
- The influent measurement was too high — _An overstated input would create an apparent gap at the end._
- The 20 kg gap is normal measurement uncertainty — _No mass balance closes exactly; a small shortfall is expected._

**Correct answer**

**The contaminant was moved, not destroyed**

**Why (shown in verdict):** Removal from water and destruction are different claims, and this balance only supports the first. Seventy-one kilograms are in sludge — a solid that now needs a destination, and that will release the contaminant again if it meets acidic water. A further twenty are unaccounted for, and the byproduct bench has already seen a transformation product it cannot yet quantify, which is the most likely home for them. A treatment is judged on its complete chemical consequences, not on the one stream the public is asking about.

**Why the others do not hold**

- Ninety-four per cent is a true statement about the water and a false one about the contaminant. Destruction would show as loss to a measured, benign product — not as 71 kg of solids.
- Flow and residence time are at design values, so the plant is doing exactly what it was built to do. That is the point: this is the designed outcome, not a malfunction.
- An overstated influent would open a gap, but it cannot put 71 kg into the sludge. The solids were weighed and analysed independently.
- Twenty per cent is not measurement uncertainty. Calling it that is how a transformation product leaves a plant unmeasured and turns up downstream.

**Takeaway:** Treatment evaluation follows the contaminant and all major byproducts.

### M12.2 — Select a treatment train

**Format:** SEQUENCE · **Area:** TREAT · **Place:** Byproduct Analysis Lab

**Scene shown to the player**

> Four unit processes are on the table and the plant wants them in an order. A treatment train is not four independent machines: each one changes the chemical form of what reaches the next, so a stage that receives the wrong form does nothing at all — or worse than nothing, because a carbon bed that receives suspended solids blinds in hours and stops polishing anything. Solubility is the pivot. Riverton has one intake and cannot run this experiment twice while the water is off.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Oxidise the dissolved metal to the valence that forms an insoluble hydroxide.
- Raise the pH to the window where that hydroxide is least soluble.
- Settle and filter, taking the solid out of the water.
- Polish the filtrate on activated carbon for what stayed dissolved.

**Correct answer**

1. **Oxidise the dissolved metal to the valence that forms an insoluble hydroxide.**
2. **Raise the pH to the window where that hydroxide is least soluble.**
3. **Settle and filter, taking the solid out of the water.**
4. **Polish the filtrate on activated carbon for what stayed dissolved.**

**Why (shown in verdict):** Each stage can only act on what the stage before it produced. Precipitation has nothing to work with until the metal is in the oxidised form, the solid cannot be filtered until the pH has actually made it, and carbon is a polishing step — send solids to it and the bed blinds within hours. Order the train wrongly and every unit downstream is doing nothing.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** A treatment train is ordered by what each stage leaves the next one to work with.

### M12.3 — Choose the safest pilot program

**Format:** CHOICE · **Area:** TREAT · **Place:** Waste Management Office

**Scene shown to the player**

> The pilot programme is the last point at which being wrong is cheap. What it needs to test is not which method removes the most contaminant — all three claim that — but which one's total hazard is smallest once byproducts, residuals and the lifecycle of the waste are counted. That means comparing mechanisms honestly, analysing for the products a mechanism would predict rather than only for the target, and running long enough for slow effects to show. The pilot has room for one question, and it should be the one that would change the decision.

**Question**  All three methods claim removal. What does the pilot have to measure?

**Choices offered**

- The transformation products and toxicity-relevant surrogates.
- Removal of the target compound under representative water chemistry.
- Media exhaustion, regeneration and the fate of the spent solids.
- The highest achievable removal, at whatever dose it takes.

**Correct answer**

**The transformation products and toxicity-relevant surrogates.**

**Why (shown in verdict):** Every method on the table removes the target; that is why they are on the table. What separates them is what they leave behind, and a pilot that measures only the target compound cannot see the difference it was run to find.

**Why the others do not hold**

- Comparing removal under representative chemistry is the comparison, and judged on the target alone it will pick whichever method makes the most byproduct fastest.
- Media exhaustion and waste fate matter and come once a method is short-listed. They describe the lifecycle of a choice already made.
- Optimising removal at any dose is the narrow optimisation that produced a sludge with twenty kilograms unaccounted for.

**Takeaway:** The best treatment minimizes total hazard, not merely one measured concentration.

---

## Mission 13 — The Air Is Not Clear Yet

**Objective:** Identify likely secondary products and update monitoring locations and times.

**Stake:** Residents may return after the primary plume clears while secondary pollutants are still forming.

**Concepts:** photochemistry, radicals, secondary pollutants, reaction pathways, time-dependent exposure

### M13.1 — Build a secondary-pollutant pathway

**Format:** SEQUENCE · **Area:** GASES · **Place:** Atmospheric Monitoring Station

**Scene shown to the player**

> The source has been controlled and the monitors have not settled. Sunlight drives atmospheric chemistry: photons break bonds in molecules that were stable overnight, producing radicals that react with almost everything, and the products of those reactions can be more harmful than what was emitted. The chain runs in a fixed causal order — emission, radical production, reaction, accumulation — and its timing is what makes it dangerous, because exposure downwind can peak hours after the release itself has begun to fall. Residents are asking when they can come home.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- A primary vapor is emitted.
- Sunlight or oxidants create reactive intermediates.
- Intermediates react through branching pathways.
- Secondary products form and are transported.

**Correct answer**

1. **A primary vapor is emitted.**
2. **Sunlight or oxidants create reactive intermediates.**
3. **Intermediates react through branching pathways.**
4. **Secondary products form and are transported.**

**Why (shown in verdict):** Atmospheric chemistry transforms both identity and location over time.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** Exposure can peak after the original emission begins to decline.

### M13.2 — Read the day-night pattern

**Format:** DIAGNOSIS · **Area:** GASES · **Place:** Photochemistry Lab

**Scene shown to the player**

> Two monitors have been running through a full day and the traces do not look like a plume drifting away. Photochemistry has a signature: production requires sunlight, so a compound formed in the atmosphere climbs while the sun is up, lags the solar maximum by the time the chemistry takes, and falls back overnight when the radicals that made it are no longer being produced. A compound merely being blown around has no reason to care what time it is. The health desk is deciding today whether to lift the shelter advice.

**Question**  The source is controlled and exposure went up. Which explanation fits the whole day, at both monitors?

**Panel headline**  The yard was sealed at 06:00 and primary vapour has fallen all day — but the neighbourhood monitor peaked at 15:00.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Neighbourhood | Secondary product | 34 ppb at 15:00 | alarm |
| Yard fence | Primary vapour | 11 ppb and falling | normal |
| Neighbourhood | Overnight behaviour | persists, then falls after sunrise | high |
| Sky | Solar radiation | clear; peak at 13:00 | normal |
| All monitors | Inert tracer | 10 ppb, flat all day | normal |
| All monitors | Inlet material | identical across the network | high |

**Figure:** `line` — Primary vapour at the yard fence and secondary product at the neighbourhood monitor, the day after the source was sealed.

**Choices offered**

- Sunlight is converting the remaining vapour into a secondary product — _The product rises as the primary falls, peaks two hours after peak sun, and appears downwind rather than at the fence._
- A second, uncontrolled release has started — _A new source would explain rising concentrations in the neighbourhood._
- The monitors share an inlet artefact — _Identical inlet material across the network can generate the same false signal everywhere._
- The wind reversed and carried the plume back over the neighbourhood — _A wind shift moves the corridor without changing the chemistry._
- Exposure is over; the source is sealed and the primary vapour is falling — _Once the release stops, the hazard decays with it._

**Correct answer**

**Sunlight is converting the remaining vapour into a secondary product**

**Why (shown in verdict):** The two traces are mirror images with sunlight between them: the product climbs while the primary falls, peaks about two hours after solar maximum, decays overnight and drops again after sunrise. That is formation in the atmosphere, not release from the ground — which is why it is highest downwind rather than at the fence. Controlling a source ends the release; it does not end the chemistry, and the exposure that matters to the neighbourhood arrived after the yard was already sealed.

**Why the others do not hold**

- A second release would raise the primary vapour at the fence. It fell all day, from 42 ppb to 11.
- A shared inlet artefact is a genuine common-mode risk and the reason the inert tracer is on the network. The tracer held flat at 10 ppb all day, so the instruments are reporting real air.
- A wind reversal moves material, it does not create it. It cannot explain why the downwind compound is one the yard never released, or why it tracks the sun.
- This is the conclusion the panel is built to refute. The source is sealed, the primary is falling, and today’s highest exposure still happened at 15:00 — nine hours later.

**Takeaway:** Atmospheric chemistry must be inferred from coordinated chemical and meteorological patterns.

### M13.3 — Monitor the transformed plume

**Format:** CHOICE · **Area:** GASES · **Place:** Neighborhood Health Desk

**Scene shown to the player**

> What is in the air now is not what was released, and a monitoring plan built around the original compound will report an improving situation while exposure rises. Designing for transformation means measuring chemical families rather than a single target, measuring the environmental drivers that control the chemistry, and keeping enough temporal resolution to see a pattern instead of a daily average. The invisible half of an air emergency outlasts the visible half, and the neighbourhood's trust does not survive being told twice that it is over.

**Question**  Residents want to come home. What does the monitoring plan measure?

**Choices offered**

- The predicted secondary products, as well as the compound that was released.
- The released compound, at more stations and more often.
- Sunlight, oxidants and the meteorological drivers.
- Nothing further — the visible plume has gone and the source is sealed.

**Correct answer**

**The predicted secondary products, as well as the compound that was released.**

**Why (shown in verdict):** The source is controlled and the exposure is now being manufactured in the air. A plan built around the released compound will report a steadily improving situation while the concentration the neighbourhood is actually breathing climbs.

**Why the others do not hold**

- More stations measuring the primary vapour measure a quantity that is already falling, more precisely.
- Sunlight and oxidant data explain the pattern and are what make the chemistry predictable. They are nobody’s exposure.
- Stopping when the plume becomes invisible is what the day-and-night trace already disproved: the peak arrived nine hours after the yard was sealed.

**Takeaway:** Invisible secondary chemistry can outlast the visible emergency.

---

## Mission 14 — Can the Water Be Released?

**Objective:** Make a transparent release decision with conditional monitoring and explicit treatment of borderline results.

**Stake:** A premature release exposes the city; an unnecessary hold can deprive hospitals and homes of essential water.

**Concepts:** detection limits, measurement uncertainty, guard bands, representative sampling, decision rules

### M14.1 — A borderline result

**Format:** BALLPARK · **Area:** QUANT · **Place:** Final Verification Lab

**Scene shown to the player**

> The release limit is ten units and the verification sample came back at nine, plus or minus two. A measurement is a distribution rather than a point: the plus-or-minus is not a disclaimer attached to the number, it is part of what the number says, and it exists because instruments, sampling and matrices all contribute scatter. Which is why laboratories agree a decision rule before the result arrives, along with guard bands and repeat measurements, rather than choosing one afterwards. Hospitals and homes are waiting on this water, and so is everyone's confidence in the reopening.

**Question**  Estimate the highest value this result could plausibly take.

**Givens**

- central result = 9.0
- uncertainty interval spans roughly 7 to 11

**Relationship given:** Compare the plausible range with the decision limit.

**Correct answer**

Equation shown: `{0} + {1}`
Tiles offered: `9.0 units  (central result)`, `2.0 units  (one-sided uncertainty)`, `10 units  (the release limit)`, `7.0 units  (lower end of the range)`
Tiles that belong: `9.0 units  (central result)`, `2.0 units  (one-sided uncertainty)`
Decoy tiles: `10 units  (the release limit)`, `7.0 units  (lower end of the range)`
Formula: `a+b`
**Target: 11 units** (tolerance ±0.4)
Explanation shown: A central estimate below a limit is not a pass when the uncertainty crosses it. Under a pre-agreed decision rule this calls for a guard band, a repeat measurement, or additional independent evidence — not a release.
Book's worked answer: No. The uncertainty range crosses the limit.

**Why (shown in verdict):** The plausible range runs to 11, which is above the release limit of 10 — so the measurement does not support a pass, whatever its central value says. A guard band, a repeat measurement, or additional evidence is what the pre-agreed decision rule calls for here.

**Why the others do not hold**

- A numerically precise answer with the wrong governing relationship should not earn full credit. A rounded answer with correct physics and units should.

**Takeaway:** Decisions should use uncertainty, not only the central value.

### M14.2 — Close the verification gaps

**Format:** PROTOCOL · **Area:** QUANT · **Place:** Water Distribution Network

**Scene shown to the player**

> A number can be perfectly valid and still fail to answer the question that was asked. Verification has three separate weak points: whether the samples represent the exposure people will actually receive, whether the method's detection limit is low enough to test the standard at all, and whether what was measured is the compound the standard is about. Each weakness has its own remedy and they do not substitute for one another. The distribution network is about to be repressurised on the strength of this evidence package.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Only treatment-plant effluent was sampled.
- Distribution-system samples were collected after long flushing.
- The method detection limit exceeds the release limit.
- The same laboratory performed treatment optimization and final verification.

**Choices offered**

- Sample representative endpoints and vulnerable zones.
- Document flushing and sample under realistic use conditions.
- Use a more sensitive validated method.
- Add independent verification or review.

**Correct answer**

1. Only treatment-plant effluent was sampled.  →  **Sample representative endpoints and vulnerable zones.**
2. Distribution-system samples were collected after long flushing.  →  **Document flushing and sample under realistic use conditions.**
3. The method detection limit exceeds the release limit.  →  **Use a more sensitive validated method.**
4. The same laboratory performed treatment optimization and final verification.  →  **Add independent verification or review.**

**Why (shown in verdict):** Release requires representative exposure data and a method capable of testing the standard.

**Why the others do not hold**

- Situation 1: The supported response is "Sample representative endpoints and vulnerable zones." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "Document flushing and sample under realistic use conditions." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "Use a more sensitive validated method." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "Add independent verification or review." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** A compliant number is meaningful only if the sampling and method address the actual decision.

### M14.3 — Approve, condition, or hold

**Format:** CHOICE · **Area:** QUANT · **Place:** Independent Review Board

**Scene shown to the player**

> The review board's decision is not binary, and treating it as though it were is how emergencies end badly in both directions — a premature release exposes the city, an indefinite hold deprives hospitals and homes of water they need now. A conditional approval with monitoring, staged reopening and defined triggers is a way of acting under uncertainty without pretending it has been resolved. What the board decides has to be defensible to a city that has been told several things already.

**Question**  The verification result is 9 units against a limit of 10, plus or minus 2. What does the board decide?

**Choices offered**

- Conditional release, with intensified monitoring and defined triggers.
- Hold until additional representative sampling is complete.
- Hold until an independent laboratory confirms the result.
- Release, since the central value is below the limit.

**Correct answer**

**Conditional release, with intensified monitoring and defined triggers.**

**Why (shown in verdict):** The plausible range crosses the limit, so neither an approval nor a refusal is supported by the number. A conditional release is how a decision gets made under uncertainty without pretending it has been resolved, and the triggers are what make it reversible.

**Why the others do not hold**

- More representative sampling is exactly what the condition should require, and on its own it holds the water off for days the hospitals do not have.
- Independent confirmation answers whether the number is right. It does not answer what to do while the question is open.
- Releasing on the central value is the decision the plus-or-minus exists to prevent, and it is the one that cannot be walked back.

**Takeaway:** High-stakes release decisions should be granular, traceable, and reversible.

---

## Mission 15 — Reopen the City

**Objective:** Deliver a claim-by-claim chemical evidence package and a long-term monitoring plan.

**Stake:** Without a complete fate and uncertainty record, the city cannot know whether the emergency is over or merely hidden.

**Concepts:** evidence synthesis, mass balance, uncertainty, risk communication, stewardship

### M15.1 — Disposition the final chemical claims

**Format:** PROTOCOL · **Area:** TREAT · **Place:** Scientific Review Hall

**Scene shown to the player**

> The city wants one sentence and the chemistry does not support one. At the end of a release the evidence is in several different states at once: some claims are established and can be closed, some are unresolved and need work, some are managed by a control that has to keep being funded, and some are simply unknown. Each of those calls for a different recommendation, and collapsing them into a single green light is how a site gets reoccupied above a problem nobody wrote down.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Identity confirmed by orthogonal methods and controls.
- A transformation product is plausible but lacks a validated standard.
- Filtered water meets criteria, but sediment remains contaminated.
- Pipeline corrosion is controlled only while chemistry remains within a narrow range.

**Choices offered**

- Treat identity as established with documented methods.
- Label provisional and continue method development.
- Maintain sediment management and remobilization monitoring.
- Use conditional operation with chemistry and corrosion triggers.

**Correct answer**

1. Identity confirmed by orthogonal methods and controls.  →  **Treat identity as established with documented methods.**
2. A transformation product is plausible but lacks a validated standard.  →  **Label provisional and continue method development.**
3. Filtered water meets criteria, but sediment remains contaminated.  →  **Maintain sediment management and remobilization monitoring.**
4. Pipeline corrosion is controlled only while chemistry remains within a narrow range.  →  **Use conditional operation with chemistry and corrosion triggers.**

**Why (shown in verdict):** The final state contains established facts, unresolved chemistry, and conditional controls.

**Why the others do not hold**

- Situation 1: The supported response is "Treat identity as established with documented methods." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 2: The supported response is "Label provisional and continue method development." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 3: The supported response is "Maintain sediment management and remobilization monitoring." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.
- Situation 4: The supported response is "Use conditional operation with chemistry and corrosion triggers." because it directly addresses the evidence in the situation. The other responses may be valid elsewhere, but here they would either test a different failure mode, skip a needed control, or claim more than the observation supports.

**Takeaway:** Chemical readiness is claim-by-claim, not a single green light.

### M15.2 — Build the public chemistry narrative

**Format:** SEQUENCE · **Area:** TREAT · **Place:** City Command

**Scene shown to the player**

> Riverton has been told several things by several people over fifteen days. What earns trust back is not a reassuring conclusion but an account that adds up: how much was released, where it went, what treatment moved rather than destroyed, and how much is still unplaced. That is the same mass balance the technical work has been building all fortnight, told in the order the contaminant travelled. An account that starts from the reassuring measurement is the one people notice has a gap in it.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- A hundred kilograms left the yard, and here is how we know.
- Seventy-one reached the sediment and three left as vapour, because of what the compound does in water.
- Treatment moved the sediment fraction into sludge; it did not destroy it.
- Twenty kilograms are still unaccounted for, and this is the monitoring that would find them.

**Correct answer**

1. **A hundred kilograms left the yard, and here is how we know.**
2. **Seventy-one reached the sediment and three left as vapour, because of what the compound does in water.**
3. **Treatment moved the sediment fraction into sludge; it did not destroy it.**
4. **Twenty kilograms are still unaccounted for, and this is the monitoring that would find them.**

**Why (shown in verdict):** The account the city can follow is the mass balance, told in the order the contaminant actually travelled. Every number in it has to add up to the one before, which is exactly what makes it checkable — and it is why the twenty kilograms nobody can place has to appear in the story rather than at the end of it.

**Why the others do not hold**

- Another tempting error is to treat the sequence as administrative rather than physical. The correct order is selected because each step creates the state, evidence, or control needed by the next.

**Takeaway:** A public account that follows the mass is one the public can check.

### M15.3 — Fund the chemical legacy

**Format:** CHOICE · **Area:** TREAT · **Place:** Long-Term Monitoring Office

**Scene shown to the player**

> The immediate emergency is over and the money is about to move somewhere else. What outlasts a release is the contamination that fell below a threshold rather than disappearing, the sediment and infrastructure holding it, and the institutional memory of how any of this was measured. Long-term monitoring, resilient treatment and preserved methods are what convert fifteen days of crisis work into capacity the city keeps. What the city keeps is what will still matter when nobody remembers the fire.

**Question**  The emergency money is about to move elsewhere. What does the city keep?

**Choices offered**

- Long-term water, sediment and air monitoring.
- Corrosion control and treatment-plant resilience.
- Open analytical records, reference materials and validated methods.
- Nothing — the records can be closed once the review is published.

**Correct answer**

**Long-term water, sediment and air monitoring.**

**Why (shown in verdict):** Nothing was destroyed. Seventy-one kilograms are in sediment, twenty are unaccounted for, and a transformation product is still being characterised — all of it below a threshold rather than gone. Monitoring is the only item here that would notice any of it coming back.

**Why the others do not hold**

- Corrosion control and resilience protect the infrastructure, which is a different hazard from the one still sitting in the reservoir.
- Open records and reference materials preserve the method, cost very little, and should be done regardless of what this budget funds.
- Closing the records destroys the only account of how any of this was measured, and the next city to burn a freight yard starts from nothing.

**Takeaway:** Stewardship continues after concentrations fall below the immediate threshold.

---

## Grading

Three axes, 1–5 each; the rubric is in `README.md`. Rows marked **Fixed**, **Rebuilt**, **Rewritten** or **Correction** changed after the first audit.

- **Solv** — can a prepared student reach the keyed answer from the scene and panel alone?
- **Edu** — does getting it right require and build transferable subject knowledge?
- **Fit** — does it map onto a named topic in a standard course for the stated audience?

| ID | Format | Topic | Solv | Edu | Fit | Note |
| --- | --- | --- | :-: | :-: | :-: | --- |
| M1.1 | PROTOCOL | Ionic compounds, charge, nomenclature | 4 | 3 | 5 | Four independent definitional recalls; nothing has to be ruled out. Item 4 is records policy, not chemistry. |
| M1.2 | SEQUENCE | Chain of custody | 4 | 4 | 3 | **Rewritten.** The order is no longer chain-of-custody paperwork but what each observation costs the sample: markings survive only until the drum is opened, and the destructive method is spent once. |
| M1.3 | CHOICE | Analytical strategy | 4 | 4 | 4 | Now a decision — which analytical route runs first. It turns on orthogonality: two methods that can be fooled by different things. The old funding round gestured at that; the question now depends on it. |
| M2.1 | BALLPARK | Ideal gas law, V = nRT/P | 5 | 4 | 5 | Best kind of estimate item here: real decoys (22.4 L/mol, 273 K) test whether the student knows which constants apply at 300 K. |
| M2.2 | PROTOCOL | Gas laws + dispersion | 5 | 4 | 5 | **Fixed.** The two duplicate choices are now Charles's law and Boyle's law stated separately, so the item discriminates a proportional from an inverse relationship. |
| M2.3 | CHOICE | Monitoring design | 4 | 3 | 3 | A decision between a measurement network and a better model. Sound, and still more about evidence design than about gases. |
| M3.1 | PROTOCOL | Polarity, IMF, partitioning | 4 | 4 | 5 | Genuine "like dissolves like" reasoning; four cleanly distinct mechanisms. |
| M3.2 | SEQUENCE | Environmental sampling design | 3 | 3 | 3 | Steps 3 and 4 are serial by definition; only the background-first step carries teaching. |
| M3.3 | CHOICE | Sampling budget | 4 | 4 | 4 | The decision turns on the partitioning model built two stops earlier: sample the phase the model says holds the contaminant, not the phase that is easy to collect. |
| M4.1 | SEQUENCE | Separation + orthogonal confirmation | 4 | 4 | 4 | The real lesson (retention time alone is not identity) is carried by the last card. |
| M4.2 | DIAGNOSIS | Blanks, carryover, orthogonal methods | 5 | 5 | 5 | Strongest item in the game. The panel fully determines the answer, all four rivals are individually killed by a named reading, and the verdict names the peak that survives every check. |
| M4.3 | CHOICE | Resolving analytical ambiguity | 4 | 4 | 4 | Selectivity against separation, with the rebuttal conceding that improving the separation is the other honest route and costs method-development time. |
| M5.1 | BALLPARK | Dilution factor | 5 | 4 | 5 | Decoys are the detection limit and bottle volume — exactly the wrong numbers a student reaches for. |
| M5.2 | DIAGNOSIS | Beer–Lambert, calibration range | 5 | 5 | 5 | Excellent. Every QC on the panel is clean, so the only surviving explanation is extrapolation past the top standard — and the r²=0.999 distractor is the misconception being taught against. |
| M5.3 | CHOICE | Spatial vs analytical coverage | 4 | 3 | 3 | Where the samples go, decided by where the decisions are made. Little chemistry, well argued. |
| M6.1 | SEQUENCE | Stoichiometry workflow | 5 | 4 | 5 | Order is genuinely forced by dependency: no ratios without a balanced equation. |
| M6.2 | BALLPARK | Limiting reactant | 4 | 4 | 5 | The template reads "the smaller of {0} ÷ 2 and {1}", which hands the student the method; only the arithmetic remains. |
| M6.3 | PROTOCOL | Mass balance, controls, blanks | 4 | 4 | 4 | "Observed product exceeds theoretical maximum → model/units/measurement wrong" is a good item. |
| M7.1 | BALLPARK | q = mcΔT | 5 | 4 | 5 | Latent-heat decoy is well chosen. |
| M7.2 | DIAGNOSIS | Exothermic self-heating vs stored heat | 5 | 5 | 4 | The east bay is a built-in control. "Heat that increases with no source is heat being made" is a clean, transferable principle. |
| M7.3 | CHOICE | Thermal risk control | 4 | 4 | 3 | Release the site on a trend, not a reading — the same principle the M7.2 panel established, now applied. |
| M8.1 | PROTOCOL | Kinetics vs thermodynamics | 5 | 5 | 5 | The distinction taught (concentration → collision frequency, temperature → fraction over the barrier, catalyst → new pathway) is the exact one intro courses test. |
| M8.2 | SEQUENCE | Thermal runaway feedback | 4 | 4 | 4 | Order is causally forced; teaches positive feedback concretely. |
| M8.3 | CHOICE | Safe operating envelope | 4 | 4 | 4 | Rate data before cooling data, because generation is the temperature-dependent side of the inequality. The kinetics is doing the work. |
| M9.1 | BALLPARK | pH → [H⁺] → moles | 5 | 4 | 5 | The pH-value tile is the ideal decoy: students reach for 4.0. |
| M9.2 | DIAGNOSIS | Weak acid, buffer, titration curve | 5 | 5 | 5 | Best pedagogy in the game. Three independent signatures (plateau, equivalence above 7, 5× base demand) all point one way, and the electrode calibration kills the obvious rival. |
| M9.3 | CHOICE | Neutralisation control | 4 | 5 | 5 | The strongest of the conversions: titration measures total demand and pH measures free H⁺, so the decision *is* the weak-acid lesson rather than a portfolio around it. |
| M10.1 | SEQUENCE | Equilibrium + mass balance | 3 | 3 | 4 | The four cards are a generic modelling recipe; cards 1 and 2 are nearly the same step. |
| M10.2 | PROTOCOL | Le Châtelier, complexation, remobilisation | 4 | 5 | 5 | "Complexation can *increase* total dissolved concentration" is the counter-intuitive item that earns the format. |
| M10.3 | CHOICE | Sediment stewardship | 4 | 4 | 4 | Stability under next season's chemistry rather than this month's — equilibrium applied to a decision with a date on it. |
| M11.1 | PROTOCOL | Redox, galvanic cells, pitting | 5 | 4 | 5 | Four crisply distinct electrochemical facts. |
| M11.2 | BALLPARK | Rate per unit area | 5 | 5 | 4 | **Rewritten.** A mass divided by an area became a penetration depth — 0.063 mm a year against a 6 mm wall — with two densities offered that differ by a factor of eight. |
| M11.3 | CHOICE | Corrosion control | 4 | 4 | 4 | Break the circuit where breaking it does not depend on a coating holding or on the plant changing its dosing. Electrochemistry choosing between real controls. |
| M12.1 | DIAGNOSIS | Mass balance across a treatment train | 5 | 5 | 4 | "Removed" vs "destroyed" is the whole point, and the 20 kg gap plus the unquantified transformation product make it inescapable. |
| M12.2 | SEQUENCE | Unit-process selection | 4 | 5 | 4 | **Rewritten.** The train is now ordered by chemistry: nothing precipitates until the metal is oxidised, nothing filters until the pH has made the solid, and carbon blinds if solids reach it. |
| M12.3 | CHOICE | Pilot design | 4 | 4 | 4 | Byproducts are what separate three methods that all claim removal, which is exactly what the M12.1 mass balance showed. |
| M13.1 | SEQUENCE | Photochemistry: emission → radicals → products | 5 | 4 | 4 | Causally forced, and the timing lesson is real. Atmospheric chemistry is elective in most gen-chem sequences. |
| M13.2 | DIAGNOSIS | Secondary-pollutant diurnal signature | 5 | 5 | 4 | The inert tracer flat all day is a proper control that kills the wind-shift rival outright. |
| M13.3 | CHOICE | Air monitoring design | 4 | 4 | 4 | Measure the products the photochemistry predicts, not the compound that was released. Follows M13.2 directly. |
| M14.1 | BALLPARK | Measurement uncertainty vs a limit | 5 | 4 | 4 | **Fixed.** The question now asks for the number the panel computes — the top of the plausible range — and the pass/fail judgement lives in the verdict where it belongs. |
| M14.2 | PROTOCOL | Representativeness, detection limit, independence | 4 | 3 | 3 | Sound QA content; belongs to analytical methods rather than gen chem. |
| M14.3 | CHOICE | Conditional release | 4 | 4 | 3 | Conditional release with triggers, because the interval crosses the limit and neither a pass nor a hold is supported by it. |
| M15.1 | PROTOCOL | Claim-by-claim disposition | 4 | 3 | 2 | Good habit of mind, no chemical content decided. |
| M15.2 | SEQUENCE | Risk communication order | 4 | 3 | 3 | **Rewritten.** Told as the mass balance it already was — 100 kg out, 71 to sediment, 3 as vapour, 20 unplaced — so each number has to add up to the one before it. |
| M15.3 | CHOICE | Long-term monitoring | 4 | 3 | 2 | What the city keeps when the money moves. Stewardship, argued from the mass balance rather than from sentiment. |

### Summary

**Averages: Solvability 4.3 · Educational value 4.0 · Curriculum fit 4.1**

No question in this game now scores below 3 on any axis. The four that had — a chain-of-custody ordering, a mass-over-area division, a generic treatment-train recipe and a narrative ordering — were rewritten to turn on chemistry the game already contains: what an observation costs the sample, what a penetration depth is against a wall thickness, what each unit process leaves the next one to work with, and the mass balance the campaign has been building for a fortnight. Educational value went 3.4 → 3.8 → **4.0**, curriculum fit 3.4 → 4.0 → **4.1**.

The six DIAGNOSIS panels still score a clean 5/5 and remain the template worth copying. There is still no organic content anywhere in the game.
