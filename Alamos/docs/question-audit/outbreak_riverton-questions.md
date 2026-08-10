# Outbreak: Riverton — every question, with its answer

**Subject:** College biology — clinical, cell, molecular, immunology, epidemiology, One Health  
**Audience:** Undergraduate  
**Content source:** `gamekit/themes/outbreak_riverton/content`  
**Shape:** 15 missions × 3 authored stops = 45 questions. (In play the engine also inserts a callback stop from day 3, drawn from these same lessons.)

---

## Mission 1 — The First Cluster

**Objective:** Open an investigation using a defensible provisional case definition and an explicit comparison baseline.

**Stake:** A false alarm could disrupt the city, but a delayed investigation could cost the only window for early containment.

### M1.1 — Signal or noise?

**Format:** PROTOCOL · **Area:** POP · **Place:** Emergency Department Network

**Scene shown to the player**

> Seven patients across three hospitals share fever, dry cough, severe headache and profound fatigue — a combination the city's syndromic surveillance has logged roughly twice a year for the last five years. Whether seven in four days is a signal depends entirely on what the system usually does, and on how these seven came to your attention: all four of the first reports arrived through the same electronic alert, one clinic reports only that there are 'many sick people', and none of the reports carries a denominator. An outbreak signal is a departure from an expectation somebody wrote down beforehand, so the work now is deciding what each of these observations can actually support.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Seven similar cases appear across three hospitals in forty-eight hours.
- The same symptom combination is rare in the previous three summers.
- One clinic reports “many sick people” but supplies no dates or denominator.
- All first reports came from the same electronic alert rule.

**Choices offered**

- Compare counts with seasonal and weekday baselines.
- Check geographic and institutional clustering.
- Request a line list with dates, symptoms, and population served.
- Audit the shared alert rule for common-mode bias.

**Correct answer**

1. Seven similar cases appear across three hospitals in forty-eight hours.  →  **Compare counts with seasonal and weekday baselines.**
2. The same symptom combination is rare in the previous three summers.  →  **Check geographic and institutional clustering.**
3. One clinic reports “many sick people” but supplies no dates or denominator.  →  **Request a line list with dates, symptoms, and population served.**
4. All first reports came from the same electronic alert rule.  →  **Audit the shared alert rule for common-mode bias.**

**Why (shown in verdict):** An outbreak signal is not merely a large number. It is a pattern that differs from expectation and survives checks for shared reporting artifacts.

**Takeaway:** Biological investigation begins by defining what would count as evidence that the system has changed.

### M1.2 — Build the provisional case definition

**Format:** SEQUENCE · **Area:** POP · **Place:** Epidemiology Operations Room

**Scene shown to the player**

> Clinicians in three hospitals are about to start counting cases, and unless they count the same thing the curves they produce cannot be added together. A case definition is an operational instrument: it fixes the observable symptoms, the timing window and the geography that qualify a patient, and it will be wrong in a known direction — too narrow and the spread is invisible, too wide and the count fills with the ordinary respiratory illness of a city in autumn. It has to be testable against patients already known to be cases and against obvious non-cases, and it has to say when it will be revised.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Specify observable symptoms, timing, and location.
- Review the first patient records for common features.
- Test the definition on known cases and obvious non-cases.
- Publish the provisional definition with a revision date and uncertainty notes.

**Correct answer**

1. **Review the first patient records for common features.**
2. **Specify observable symptoms, timing, and location.**
3. **Test the definition on known cases and obvious non-cases.**
4. **Publish the provisional definition with a revision date and uncertainty notes.**

**Why (shown in verdict):** The first records suggest the shared features; the definition is then tested before it is distributed.

**Takeaway:** Operational definitions convert vague concern into reproducible observation.

### M1.3 — Spend the first response reserve

**Format:** CHOICE · **Area:** POP · **Place:** Clinical Data Office

**Scene shown to the player**

> There is one reserve of response money and it will not stretch across everything the room wants. Interviews with hospital directors are fast and produce impressions; a standardised line list across all three hospitals produces comparable clinical observations but takes days of staff time; wastewater sampling sees the population rather than the patients who reached a hospital, and is independent of who chose to seek care. Independence is the property that matters here — two data streams sharing the same selection process can agree with each other and be wrong together. Nothing has yet been measured in a way that would change a decision.

**Question**  What does the office start this afternoon?

**Choices offered**

- A standardised line list across all three hospitals.
- Interviews with every hospital director for an expert impression.
- Wastewater sampling in the affected and comparison neighbourhoods.
- A citywide warning, before transmission is understood.

**Correct answer**

**A standardised line list across all three hospitals.**

**Why (shown in verdict):** Nothing can be counted until the three hospitals are counting the same thing. The line list is what turns three sets of impressions into one comparable set of observations with dates and denominators, and every later stream — including the wastewater — is interpreted against it.

**Why the others do not hold**

- Interviews are fast and produce impressions. An impression has no denominator, so it cannot say whether seven cases in four days is a departure from anything.
- Wastewater is the right second stream, and it is valuable precisely because it is independent of who chose to seek care. It cannot name a patient or define a case, which is what this week's decisions need.
- A warning issued before transmission is understood spends credibility on a hypothesis, and credibility is what every later message depends on.

**Takeaway:** Comparable observations come before independent ones, because everything else is read against them.

---

## Mission 2 — What Kind of Agent?

**Objective:** Classify the broad agent category and identify the next discriminating test.

**Stake:** The wrong classification sends every later diagnostic and treatment effort down the wrong path.

### M2.1 — What kind of agent fits the whole panel?

**Format:** DIAGNOSIS · **Area:** CLIN · **Place:** Hospital Pathology Suite

**Scene shown to the player**

> Pathology has four kinds of evidence from the same positive specimens and no single one settles what the agent is. Microscopy shows no intact cellular forms; a bacterial marker and a fungal cell-wall stain are both negative; signal rises only in preparations containing living host cells; and the extraction blank is clean. The classification that matters is not a name but a set of properties — whether the agent has cellular structure of its own, whether it can replicate without borrowing a host's machinery, and whether the molecular signal survives controls. Read the panel as a whole: the negatives constrain it as much as the positives.

**Question**  Which explanation fits every reading, including the quiet negative controls?

**Panel headline**  Pathology has several clues from the same positive specimens.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Microscopy | Microscopy | No intact cellular forms seen | normal |
| Host-cell dependence | Host-cell dependence | Signal rises only when living host cells are present | alarm |
| Bacterial marker | Bacterial marker | Not detected | normal |
| Fungal cell-wall stain | Fungal cell-wall stain | Negative | normal |
| Extraction blank | Extraction blank | Negative | normal |

**Choices offered**

- RNA virus-like agent — _A noncellular infectious agent depends on host cells for replication and would not carry bacterial or fungal cellular markers._
- Bacterium — _A cellular prokaryote should provide bacterial cellular or molecular evidence and should not require living host cells simply to exist._
- Fungus — _A fungal agent should provide cellular structures or cell-wall evidence that is absent here._
- Laboratory contamination — _Contamination should be suspected when blanks or controls carry the target signal; the blank is clean._

**Correct answer**

**RNA virus-like agent**

**Why (shown in verdict):** The agent is host-cell dependent, while bacterial and fungal cellular markers are absent and the blank is clean. The full panel supports a virus-like agent rather than a cellular pathogen or contamination.

**Takeaway:** Agent classification should combine cellular structure, host dependence, molecular evidence, and controls rather than rely on one striking image.

### M2.2 — From specimen to broad classification

**Format:** SEQUENCE · **Area:** POP · **Place:** Microscopy Core

**Scene shown to the player**

> The team is building the classification workflow it will defend in public. Every step exists to rule something out: comparing patient material against healthy and negative controls separates the agent from the specimen; characterising size and internal structure separates cellular life from something that has none; asking whether the candidate replicates on its own separates an organism from an obligate parasite of a host cell. Order matters because each step is only interpretable if the one before it held — a structure measured in a contaminated preparation is a measurement of the contamination.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Compare patient material with negative and healthy controls.
- Characterize size, cellular structures, and nucleic-acid signature.
- Ask whether the candidate reproduces independently or requires host cells.
- Integrate the independent observations into a provisional classification.

**Correct answer**

1. **Compare patient material with negative and healthy controls.**
2. **Characterize size, cellular structures, and nucleic-acid signature.**
3. **Ask whether the candidate reproduces independently or requires host cells.**
4. **Integrate the independent observations into a provisional classification.**

**Why (shown in verdict):** Controls establish what is truly associated with the specimen; structural and molecular evidence then support a biological classification.

**Takeaway:** A good classification is an evidence synthesis, not a label generated by one instrument.

### M2.3 — Choose the next discriminating evidence

**Format:** CHOICE · **Area:** MOL · **Place:** Molecular Identification Lab

**Scene shown to the player**

> Two hypotheses about the agent's identity remain open, and there is money for roughly two more pieces of work. A higher magnification of the same image is more of the evidence you already have; a validated molecular signature interrogates the genome rather than the appearance; a replication assay in permissive and non-permissive cells asks the mechanistic question directly. What separates useful evidence from expensive reassurance is independence of failure mode: if two methods can fail for the same reason, agreement between them is not confirmation.

**Question**  One experiment separates the two remaining hypotheses. Which?

**Choices offered**

- Obtain a molecular signature using a validated broad panel.
- Repeat the same microscope image at higher magnification.
- Compare growth in permissive and non-permissive cell systems.
- Ask a recognised authority which answer is most likely.

**Correct answer**

**Obtain a molecular signature using a validated broad panel.**

**Why (shown in verdict):** The evidence so far is morphological, and the two candidates differ in their genome rather than their appearance. A molecular panel fails in a different way from microscopy, so agreement between the two would mean something; more microscopy could only agree with itself.

**Why the others do not hold**

- Higher magnification is more of the evidence already held. If the first image could be misread, so can a sharper one taken the same way.
- The replication comparison is a real and independent test and it is what you run next. It answers whether the agent needs host cells — which the panel has already shown — rather than which candidate it is.
- An authority's opinion carries the authority's failure modes and adds no measurement at all.

**Takeaway:** Independent failure modes matter more than prestige or repeated views of the same evidence.

---

## Mission 3 — The Point of Entry

**Objective:** Explain why one cell type is vulnerable and select the experiment that separates receptor binding from downstream replication.

**Stake:** A mistaken entry model could lead to a therapy that blocks the wrong stage while vulnerable cells continue to fail.

### M3.1 — Crossing the cellular boundary

**Format:** SEQUENCE · **Area:** CELL · **Place:** Cell Culture Wing

**Scene shown to the player**

> The agent reaches respiratory tissue, but only some cell types are affected — which is a clue about mechanism rather than an accident of exposure. Cell entry is a sequence of physical events: a surface molecule binds a compatible receptor, the membrane deforms or a fusion process begins, material crosses into the cytoplasm, and the cell's own machinery is redirected afterwards. Each step depends on the one before it, and each is a place where a cell without the right protein simply cannot be infected. The order is what makes the tissue pattern predictable.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- A surface molecule binds a compatible receptor.
- The membrane bends or a fusion process begins.
- The biological material enters the cell or an intracellular compartment.
- Cellular machinery is redirected after entry.

**Correct answer**

1. **A surface molecule binds a compatible receptor.**
2. **The membrane bends or a fusion process begins.**
3. **The biological material enters the cell or an intracellular compartment.**
4. **Cellular machinery is redirected after entry.**

**Why (shown in verdict):** Specific recognition precedes membrane rearrangement and entry; downstream effects occur only after the barrier is crossed.

**Takeaway:** Membranes are selective interfaces whose proteins can determine cell vulnerability.

### M3.2 — Choose the membrane mechanism

**Format:** PROTOCOL · **Area:** CELL · **Place:** Membrane Biology Lab

**Scene shown to the player**

> A membrane is a selective interface, not a wall, and four observations from the culture bench each describe a different way something crosses one. A small nonpolar molecule moving down its concentration gradient needs no protein at all; an ion moving down its gradient through a selective pore does; a solute moving uphill against its gradient must be paid for, and the ATP consumption is the receipt; a large bound particle enclosed by the membrane is a different process again. The mechanism is inferred from the constraints — direction, size, energy cost — rather than recalled from the name of the molecule.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- A small nonpolar molecule moves down its concentration gradient.
- An ion moves down its gradient through a selective protein pore.
- A solute moves uphill while ATP is consumed.
- A large bound particle is enclosed by the membrane.

**Choices offered**

- Simple diffusion.
- Facilitated diffusion through a channel.
- Active transport.
- Endocytosis.

**Correct answer**

1. A small nonpolar molecule moves down its concentration gradient.  →  **Simple diffusion.**
2. An ion moves down its gradient through a selective protein pore.  →  **Facilitated diffusion through a channel.**
3. A solute moves uphill while ATP is consumed.  →  **Active transport.**
4. A large bound particle is enclosed by the membrane.  →  **Endocytosis.**

**Why (shown in verdict):** The direction of movement, need for a protein, energy use, and cargo size distinguish the mechanisms.

**Takeaway:** Transport mechanisms are inferred from constraints, not memorized from molecule names alone.

### M3.3 — Separate binding from entry

**Format:** CHOICE · **Area:** CELL · **Place:** Structural Biology Room

**Scene shown to the player**

> Some cells are vulnerable and some are not, and the team wants to know at which step the resistant ones stop the process. Receptor abundance on both cell types tests whether binding is possible; tracking whether bound material is internalised tests whether entry follows binding; measuring a late cellular response tells you only that something already went wrong upstream. A mechanistic experiment earns its cost by identifying the earliest point at which the two conditions diverge — everything after that point is a consequence, not a cause.

**Question**  Which experiment locates the step where resistant cells stop the process?

**Choices offered**

- Measure receptor abundance on vulnerable and resistant cells.
- Track whether bound material is internalised.
- Measure a late cellular response in both cell types.
- Increase the exposure until every cell shows damage.

**Correct answer**

**Measure receptor abundance on vulnerable and resistant cells.**

**Why (shown in verdict):** Entry is a chain and the earliest divergence is the cause; everything after it is a consequence. Receptor abundance tests the first step, and it is the only measurement whose result changes what the next experiment should be.

**Why the others do not hold**

- Internalisation is the right second experiment and it is only interpretable once you know both cell types can bind. Run it after, not instead.
- A late response tells you something already went wrong upstream, which is what you knew before you started.
- Flooding the system until everything is damaged destroys the difference between the two cell types, which is the entire measurement.

**Takeaway:** Mechanistic experiments should identify the earliest point at which two conditions diverge.

---

## Mission 4 — Hijacked Cells

**Objective:** Build the information-flow model and choose a measurement that distinguishes more RNA from more efficient translation.

**Stake:** A rushed interpretation could make the team target a gene whose RNA is merely a consequence rather than the cause of cell damage.

### M4.1 — From genetic information to protein

**Format:** SEQUENCE · **Area:** MOL · **Place:** Sequencing Center

**Scene shown to the player**

> Affected cells are producing unfamiliar RNA and proteins, and the team needs the causal chain written down before it can say where the change is. Gene expression is a sequence of measurable transformations: a DNA template is made accessible, RNA polymerase produces a transcript, a ribosome reads codons and builds an amino-acid chain, and the chain folds into something that does a job. Abundance can change at any one of those stages independently, which is exactly why the chain is worth stating explicitly rather than treating expression as a single event.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- A DNA template is made accessible.
- RNA polymerase produces an RNA transcript.
- A ribosome reads codons in the messenger RNA.
- The amino-acid chain folds and performs a cellular function.

**Correct answer**

1. **A DNA template is made accessible.**
2. **RNA polymerase produces an RNA transcript.**
3. **A ribosome reads codons in the messenger RNA.**
4. **The amino-acid chain folds and performs a cellular function.**

**Why (shown in verdict):** Transcription produces the message; translation converts the message into a polypeptide that must fold before function.

**Takeaway:** Changes in protein abundance can arise at several distinct stages of gene expression.

### M4.2 — Locate the molecular change

**Format:** PROTOCOL · **Area:** MOL · **Place:** Gene Expression Lab

**Scene shown to the player**

> Four observations from the gene-expression bench, each pointing at a different stage of the same chain. RNA rising while protein stays flat is not the same failure as protein rising while RNA is unchanged; a single codon change substituting one amino acid is a different thing again from a protein present at normal abundance but with low activity. The central dogma is a chain of transformations, not a promise that every stage moves together — and each of these patterns is only interpretable if you know which stage it is reporting on.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- RNA rises while protein stays constant.
- RNA is unchanged while protein rises.
- A codon changes and one amino acid is substituted.
- Protein amount is normal but activity is low.

**Choices offered**

- Possible translation limit or rapid protein turnover.
- Possible increased translation efficiency or reduced protein degradation.
- A missense sequence change.
- Possible folding, modification, or active-site defect.

**Correct answer**

1. RNA rises while protein stays constant.  →  **Possible translation limit or rapid protein turnover.**
2. RNA is unchanged while protein rises.  →  **Possible increased translation efficiency or reduced protein degradation.**
3. A codon changes and one amino acid is substituted.  →  **A missense sequence change.**
4. Protein amount is normal but activity is low.  →  **Possible folding, modification, or active-site defect.**

**Why (shown in verdict):** RNA abundance, protein abundance, sequence, and activity are related but non-equivalent measurements.

**Takeaway:** The central dogma is a chain of measurable transformations, not a claim that every stage changes together.

### M4.3 — Find the controlling stage

**Format:** CHOICE · **Area:** MOL · **Place:** Protein Analysis Core

**Scene shown to the player**

> An unfamiliar protein is abundant in affected cells and the team has money for a few measurements. Quantifying its messenger RNA across time asks whether transcription changed; measuring ribosome association with that RNA asks whether translation did; measuring protein half-life asks whether the protein is simply being destroyed more slowly, which produces abundance with no change in production at all. Sequencing a neighbouring chromosomal region answers a question nobody has asked. Mechanism needs measurements that span the whole causal chain, because abundance alone is consistent with all of them.

**Question**  Abundance alone fits every mechanism. Which measurement do you make first?

**Choices offered**

- Quantify the protein's messenger RNA across time.
- Measure ribosome association with that RNA.
- Measure the protein's half-life and degradation rate.
- Sequence the neighbouring chromosomal region.

**Correct answer**

**Quantify the protein's messenger RNA across time.**

**Why (shown in verdict):** An abundant protein is consistent with more transcript, more efficient translation, or slower destruction. Transcript abundance is the one measurement that splits the three: if the message did not move, transcription is out and the cause is downstream of it.

**Why the others do not hold**

- Ribosome association asks whether translation changed, and it only means something once you know whether the amount of message changed underneath it.
- Half-life asks whether the protein is simply being destroyed more slowly. A real possibility, and the third measurement rather than the first.
- The neighbouring region answers a question nobody has asked about a protein whose gene is already identified.

**Takeaway:** Mechanism requires measurements that span the full causal chain.

---

## Mission 5 — A Test Before Morning

**Objective:** Approve a diagnostic workflow only after its analytical and clinical limitations are explicit.

**Stake:** An unreliable test could either miss contagious patients or isolate thousands of healthy people.

### M5.1 — Build a trustworthy amplification run

**Format:** SEQUENCE · **Area:** MOL · **Place:** Sample Processing Room

**Scene shown to the player**

> Hospitals need a diagnostic by sunrise, and an amplification assay run in a hurry is the easiest way in this outbreak to produce confident nonsense. The workflow exists to make the patient signal interpretable: extraction preserves sample identity, a positive control shows the chemistry worked, a negative and a no-template control show the signal did not come from the laboratory, and validated primers and cycling make the target specific. A patient result is the output of a controlled process — read before the controls are read, it is an instrument reading rather than evidence.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Extract material while preserving sample identity.
- Include positive, negative, and no-template controls.
- Amplify the target with validated primers and cycling conditions.
- Interpret the patient signal only if all controls behave as expected.

**Correct answer**

1. **Extract material while preserving sample identity.**
2. **Include positive, negative, and no-template controls.**
3. **Amplify the target with validated primers and cycling conditions.**
4. **Interpret the patient signal only if all controls behave as expected.**

**Why (shown in verdict):** Identity and controls are prerequisites; a numerical signal is uninterpretable when controls fail.

**Takeaway:** A diagnostic result is the output of a controlled process, not simply a machine reading.

### M5.2 — Why did the assay turn positive?

**Format:** DIAGNOSIS · **Area:** MOL · **Place:** PCR Diagnostics Lab

**Scene shown to the player**

> The overnight run flags several patient samples positive. The positive control is detected at the expected level, so the chemistry worked. The no-template control — water, no sample, run alongside — is also positive. An independent platform, testing the same patients with different chemistry, does not detect the target, and the instrument baseline is stable. Amplification multiplies whatever template is present by a factor of a billion, which makes it exquisitely sensitive both to the thing you are looking for and to a trace of it loose in the room. Every explanation has to account for the control, not only the patients.

**Question**  Which explanation best fits the patient results and all of the controls?

**Panel headline**  The overnight amplification run flags several patient samples as positive, but one control is also behaving strangely.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Patient wells | Patient wells | Target signal detected | alarm |
| No-template control | No-template control | Target signal detected | alarm |
| Positive control | Positive control | Detected at expected level | alarm |
| Independent platform | Independent platform | Patient target not detected | normal |
| Instrument baseline | Instrument baseline | Stable | normal |

**Choices offered**

- True patient positives — _The patient samples contain the target and the controls are behaving normally._
- Carryover contamination — _Target material entered part of the amplification workflow, making samples and the no-template control positive._
- Reagent failure — _The reaction chemistry failed, so true target should not amplify reliably._
- Sample inhibition — _Something in patient material suppresses amplification and tends to create false negatives._

**Correct answer**

**Carryover contamination**

**Why (shown in verdict):** The no-template control contains the same target signal while the positive control works and an independent method does not confirm the patient result. That pattern points to contamination in the assay workflow rather than true infection.

**Takeaway:** A control is part of the evidence, not a decoration: a positive blank can overturn an apparently impressive patient signal.

### M5.3 — What does a positive mean?

**Format:** BALLPARK · **Area:** POP · **Place:** Clinical Statistics Desk

**Scene shown to the player**

> The mayor's office wants to screen a low-prevalence population and treat every positive as a case. Test performance and population prevalence are different quantities and they interact: in a group where few people are infected, even a highly specific test generates false positives from the large uninfected majority, and those can rival or exceed the true positives drawn from the small infected minority. The number that matters clinically is not the test's specificity but the fraction of positives that are real, and that fraction changes when the same test is moved to a different population.

**Question**  Estimate the chance that a positive result is a true case.

**Correct answer**

Equation shown: `{0}×{1}×{2} ÷ ( {0}×{1}×{2} + {0}×(1−{1})×(1−{3}) ) × 100`
Tiles offered: `10,000 people screened`, `0.01 (prevalence in the screening group)`, `0.90 (sensitivity)`, `0.99 (specificity)`, `0.30 (prevalence on the affected ward)`, `0.10 (the fraction reporting symptoms)`
Tiles that belong: `10,000 people screened`, `0.01 (prevalence in the screening group)`, `0.90 (sensitivity)`, `0.99 (specificity)`
Decoy tiles: `0.30 (prevalence on the affected ward)`, `0.10 (the fraction reporting symptoms)`
Formula: `a*b*c/(a*b*c + a*(1-b)*(1-d))*100`
**Target: 47.62 %** (tolerance ±3)
Explanation shown: A hundred infected people give ninety true positives; the nine thousand nine hundred uninfected give ninety-nine false ones, because one per cent of a large number is a large number. The same assay on the affected ward, where prevalence is thirty per cent, would return positives that are almost all real.

**Why (shown in verdict):** Specificity is a property of the test; the fraction of positives that are real is a property of the test and the population together. Moving this assay from the ward to the city changes nothing about the chemistry and almost everything about what a positive means.

**Takeaway:** Clinical meaning depends on both test performance and the population being tested.

---

## Mission 6 — Why Are Some Patients Sicker?

**Objective:** Identify the physiological bottleneck and select measurements that distinguish ventilation, diffusion, circulation, and cellular oxygen use.

**Stake:** The wrong physiological diagnosis could intensify a treatment that cannot reach the true failing organ system.

### M6.1 — Locate the oxygen-delivery failure

**Format:** DIAGNOSIS · **Area:** CLIN · **Place:** Intensive Care Unit

**Scene shown to the player**

> Two patients have the same test result and very different clinical courses. One shows arterial oxygen saturation of 86 per cent, end-tidal carbon dioxide of 39 mmHg, cardiac output of 5.2 L/min, haemoglobin of 14 g/dL, and diffuse gas-exchange abnormality on imaging. Oxygen delivery is a chain — gas into the lung, transfer across the alveolar membrane, carriage on haemoglobin, and flow to the tissues — and each link has its own measurement here. Normal values at one link are not reassurance; they are evidence that the failure is somewhere else in the chain.

**Question**  Which bottleneck fits the entire cardiopulmonary panel?

**Panel headline**  Two patients have severe fatigue and low tissue oxygen delivery.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Arterial oxygen saturation | Arterial oxygen saturation | 86% | alarm |
| End-tidal carbon dioxide | End-tidal carbon dioxide | 39 mmHg | normal |
| Cardiac output | Cardiac output | 5.2 L/min | normal |
| Hemoglobin | Hemoglobin | 14 g/dL | normal |
| Lung imaging | Lung imaging | Diffuse gas-exchange abnormality | normal |

**Choices offered**

- Ventilation failure — _Too little fresh air reaches the alveoli; carbon dioxide would often rise along with falling oxygen._
- Gas-exchange failure — _Air reaches the lungs, but oxygen transfer from alveoli into blood is impaired._
- Circulatory delivery failure — _Oxygenated blood is present but cardiac output is too low to deliver it to tissues._
- Anemia — _Blood flow and lung exchange may be adequate, but too little hemoglobin limits oxygen carriage._

**Correct answer**

**Gas-exchange failure**

**Why (shown in verdict):** Oxygen saturation is low despite near-normal carbon dioxide, cardiac output, and hemoglobin. The abnormal lung evidence localizes the problem to transfer of oxygen from air into blood.

**Takeaway:** Oxygen delivery is a chain. Normal measurements at one link can be powerful evidence that the failure lies somewhere else.

### M6.2 — Estimate oxygen delivery

**Format:** BALLPARK · **Area:** POP · **Place:** Cardiopulmonary Physiology Lab

**Scene shown to the player**

> Two patients need comparing and the bedside argument has stalled on which is worse off. Oxygen delivery is a rate, not a concentration: it is the product of how much oxygen each litre of blood carries and how many litres per minute the heart moves. One patient has a cardiac output of 3 L/min against a comparison patient's 5, with blood carrying about 0.20 litres of oxygen per litre. Two patients can have identical arterial saturation and very different delivery, and the arithmetic is what tells you which term is the bottleneck.

**Question**  Estimate oxygen delivery for the patient with the lower cardiac output.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `3 L/min (cardiac output, first patient)`, `0.20 L O₂/L (oxygen content of the blood)`, `5 L/min (cardiac output, comparison patient)`, `86 % (arterial saturation)`, `14 g/dL (haemoglobin)`
Tiles that belong: `3 L/min (cardiac output, first patient)`, `0.20 L O₂/L (oxygen content of the blood)`
Decoy tiles: `5 L/min (cardiac output, comparison patient)`, `86 % (arterial saturation)`, `14 g/dL (haemoglobin)`
Formula: `a*b`
**Target: 0.6 L O₂/min** (tolerance ±0.06)
Explanation shown: Delivery is a rate, and it is the product of what each litre carries and how many litres arrive. Saturation and haemoglobin describe the content term and cannot on their own say how much oxygen reaches anything.

**Why (shown in verdict):** Two patients with identical saturations can differ by a factor of two in delivery, because the flow term is doing the work. A concentration is not a rate.

**Takeaway:** A normal concentration does not guarantee a normal delivery rate; flow matters.

### M6.3 — Measure the failing link

**Format:** CHOICE · **Area:** CLIN · **Place:** Clinical Chemistry Bench

**Scene shown to the player**

> A patient is deteriorating and there is time and money for a few bedside measurements before the team commits to a treatment. Arterial oxygenation and carbon dioxide report the lung; a cardiac output or validated flow surrogate reports the pump; tissue lactate and acid-base status report whether delivery is actually failing to meet demand at the far end of the chain. Repeating the pulse oximeter gives you the number you already have. Integrated physiology is diagnosed by sampling several points along the transport chain, not by trusting the loudest one.

**Question**  One bedside measurement before the team commits to a treatment. Which?

**Choices offered**

- Tissue lactate and acid-base status.
- Arterial oxygenation and carbon dioxide.
- Cardiac output or a validated flow surrogate.
- The same pulse oximeter reading, repeated on three devices.

**Correct answer**

**Tissue lactate and acid-base status.**

**Why (shown in verdict):** Oxygen delivery is a chain and the panel has already measured its top: saturation is low, carbon dioxide and cardiac output are not. What nobody has measured is the far end — whether delivery is actually failing to meet demand in the tissues, which is the thing the treatment is meant to change.

**Why the others do not hold**

- Arterial oxygenation and carbon dioxide are already on the chart from the earlier panel. Measuring them again is precision about a number that is not in dispute.
- Cardiac output reports the pump, and the pump has already read normal. Worth repeating if the patient changes; not the missing measurement now.
- Three identical devices agreeing tells you the devices agree. It does not add an independent observation.

**Takeaway:** Integrated physiology requires evidence from multiple points along the transport chain.

---

## Mission 7 — The Immune System Turns

**Objective:** Construct a timeline of immune responses and decide whether deterioration reflects persistent agent burden, delayed adaptive response, or excessive inflammation.

**Stake:** Suppressing a protective response or ignoring immune-mediated injury can both be fatal.

### M7.1 — Build the immune response timeline

**Format:** SEQUENCE · **Area:** IMM · **Place:** Immunology Lab

**Scene shown to the player**

> Patients are improving and then deteriorating, and the team needs the normal immune timeline on the board before it can say which part has gone wrong. The response is phased: innate sensors recognise damage or unfamiliar molecular patterns within hours, local signals recruit and activate immune cells, antigen-specific lymphocytes expand over days and act, and a smaller memory population persists after resolution. Innate and adaptive immunity are coordinated stages of one response rather than competing systems, and knowing which stage a patient is in is what makes a clinical measurement interpretable.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Innate sensors recognize damage or unfamiliar molecular patterns.
- Local signals recruit and activate immune cells.
- Antigen-specific lymphocytes expand and act.
- A smaller memory population persists after resolution.

**Correct answer**

1. **Innate sensors recognize damage or unfamiliar molecular patterns.**
2. **Local signals recruit and activate immune cells.**
3. **Antigen-specific lymphocytes expand and act.**
4. **A smaller memory population persists after resolution.**

**Why (shown in verdict):** Fast nonspecific recognition precedes slower clonal expansion and durable memory.

**Takeaway:** Innate and adaptive immunity are coordinated phases, not competing systems.

### M7.2 — Protective response or runaway inflammation?

**Format:** DIAGNOSIS · **Area:** CLIN · **Place:** Intensive Care Unit

**Scene shown to the player**

> Several patients worsen after the detectable pathogen has already started to fall. The panel shows pathogen signal falling over 48 hours, inflammatory cytokines rising sharply, neutralising antibody present, oxygenation worsening, and bacterial cultures with no growth. The immune response is not only the solution here — the same mechanisms that clear an infection damage tissue while doing it, and the timing of the deterioration relative to the pathogen curve is what separates ongoing infection from an immune response that has become the problem. A candidate explanation has to fit the timing as well as the values.

**Question**  Which mechanism best explains the reversal in the full panel?

**Panel headline**  Several patients begin to worsen after the amount of detectable pathogen has started to fall.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Pathogen signal | Pathogen signal | Falling over 48 hours | alarm |
| Inflammatory cytokine panel | Inflammatory cytokine panel | Rising sharply | alarm |
| Neutralizing antibody | Neutralizing antibody | Present | alarm |
| Oxygenation | Oxygenation | Worsening | alarm |
| Bacterial cultures | Bacterial cultures | No growth | normal |

**Choices offered**

- Uncontrolled pathogen replication — _The agent is multiplying faster and directly increasing tissue injury._
- Dysregulated inflammatory injury — _The immune response remains strongly activated and damages tissue even as pathogen burden falls._
- New bacterial superinfection — _A second bacterial infection is now driving the decline._
- Measurement noise — _The apparent changes are unrelated fluctuations without a shared mechanism._

**Correct answer**

**Dysregulated inflammatory injury**

**Why (shown in verdict):** The pathogen signal is falling while inflammatory signals rise and physiology worsens. The negative bacterial cultures remove an important rival. The host response now best explains the damage.

**Takeaway:** A biological response can become part of the problem. The strongest explanation must account for timing as well as the direction of each measurement.

### M7.3 — Treat the mechanism, not the marker

**Format:** CHOICE · **Area:** CLIN · **Place:** Pathology Archive

**Scene shown to the player**

> Late deterioration is killing patients and the ward wants to act tonight. Measuring agent burden alongside inflammatory markers separates the two candidate drivers; comparing immune-cell states in improving and deteriorating patients asks which response differs; pathology on affected tissue asks where the damage actually is. Suppressing the immune system immediately treats one hypothesis as settled and, if the infection is still active, removes the response that is clearing it. The intervention should follow evidence about what the immune system is doing, where, and when.

**Question**  The ward wants to start immunosuppression tonight. What do you do?

**Choices offered**

- Measure agent burden and inflammatory markers together over time first.
- Suppress the immune response immediately in everyone deteriorating.
- Compare immune-cell states in improving and worsening patients.
- Send pathology on affected tissue to identify what is being damaged.

**Correct answer**

**Measure agent burden and inflammatory markers together over time first.**

**Why (shown in verdict):** The two candidate drivers — a pathogen still replicating and a host response that has become the injury — are distinguished by which curve is rising while the other falls. Paired measurements over time separate them within hours, and the answer decides whether suppression helps or removes the thing that is clearing the infection.

**Why the others do not hold**

- Suppressing now treats one hypothesis as settled. If agent burden is still rising in some of these patients, it removes their only defence.
- Comparing immune-cell states is the right study and returns in days. The ward is asking about tonight.
- Pathology says where the damage is. It does not say whether the pathogen is still driving it, which is the question the treatment turns on.

**Takeaway:** Intervention should follow evidence about what the immune system is doing, where, and when.

---

## Mission 8 — The Hidden Transmission Route

**Objective:** Identify the hidden route and target surveillance where it changes decisions rather than where sampling is easiest.

**Stake:** If transmission begins before severe symptoms, a hospital-only response will always be late.

### M8.1 — Match the surveillance signal

**Format:** PROTOCOL · **Area:** IMM · **Place:** Wastewater Treatment Plant

**Scene shown to the player**

> Hospital isolation has held for nine days and cases keep appearing. Four data streams are on the table and each sees the outbreak through its own selection process: wastewater concentration rises before hospital admissions but cannot name a person; household interviews find exposures before symptom onset but only among households that agreed to be interviewed; a transit survey samples volunteers at one station; hospital prevalence counts people already sick enough to attend. What a stream can reveal is fixed by who is observed, when, and how they came to be observed.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Wastewater concentration rises before hospital admissions.
- Household interviews show several exposures before symptoms.
- A transit survey samples only volunteers at one station.
- Hospital prevalence remains high after new admissions decline.

**Choices offered**

- Possible early population-level signal, but not individual diagnosis.
- Evidence that infectious contact may precede symptoms.
- Potentially biased sample that may not represent riders.
- Long illness duration can keep prevalence high after incidence falls.

**Correct answer**

1. Wastewater concentration rises before hospital admissions.  →  **Possible early population-level signal, but not individual diagnosis.**
2. Household interviews show several exposures before symptoms.  →  **Evidence that infectious contact may precede symptoms.**
3. A transit survey samples only volunteers at one station.  →  **Potentially biased sample that may not represent riders.**
4. Hospital prevalence remains high after new admissions decline.  →  **Long illness duration can keep prevalence high after incidence falls.**

**Why (shown in verdict):** Each surveillance system measures a different population and time window.

**Takeaway:** Transmission inference depends on who is observed, when, and through which sampling process.

### M8.2 — Can the cluster grow?

**Format:** BALLPARK · **Area:** FIELD · **Place:** Field Epidemiology Office

**Scene shown to the player**

> The chain has to be characterised while it is small, because the difference between growth and decline is decided by a quantity near one. About 20 people are currently infectious and each is producing roughly 1.4 new infections in the next generation of transmission. Whether that is an outbreak that burns out or one that doubles every fortnight is arithmetic, and the same arithmetic says which control measures would have to change to cross the threshold. The estimate is crude and the conclusion it supports is not.

**Question**  Estimate how many infections the next generation produces.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `20 people currently infectious`, `1.4 new infections per person per generation`, `5 days (the serial interval)`, `140 cases reported so far`, `0.7 new infections per person, after control`
Tiles that belong: `20 people currently infectious`, `1.4 new infections per person per generation`
Decoy tiles: `5 days (the serial interval)`, `140 cases reported so far`, `0.7 new infections per person, after control`
Formula: `a*b`
**Target: 28 new infections** (tolerance ±2)
Explanation shown: The serial interval says how fast the generations arrive and not how many there are in each; the cumulative count says what has already happened. Growth or decline is decided by one number, and by whether it is above or below one.

**Why (shown in verdict):** Twenty-eight against twenty is growth, and the fact that it is growth — not the size of the number — is what decides whether the chain burns out or doubles every fortnight.

**Takeaway:** A threshold near one can determine whether small changes produce growth or decline.

### M8.3 — Find transmission before the hospital

**Format:** CHOICE · **Area:** POP · **Place:** Transit and Mobility Center

**Scene shown to the player**

> Hospital isolation has held for nine days and new cases keep appearing in neighbourhoods with nobody admitted from them. Wastewater upstream of the hospital catchment has been rising for a week, the transit authority holds trip counts nobody has matched to the case map, and there is enough money this week for one of the four things the room has proposed. Surveillance is useful in proportion to how far upstream of the outcome it sits: a stream that reports what already happened cannot inform a decision about what is happening now.

**Question**  Cases appear in neighbourhoods with nobody admitted. What do you commission?

**Choices offered**

- Expand wastewater sampling across the connected sewersheds.
- Conduct structured household and workplace contact studies.
- Add more hospital bed and admission counts.
- Sample one comparison neighbourhood with no reported cases.

**Correct answer**

**Expand wastewater sampling across the connected sewersheds.**

**Why (shown in verdict):** Hospital isolation has held for nine days, so the chain is running somewhere the hospital cannot see. Wastewater reports the population rather than the patients who reached care, and sampling it by sewershed turns 'somewhere' into a map — which is the thing every other option needs and none of them supplies.

**Why the others do not hold**

- Contact studies are how presymptomatic transmission is established, and they need a place to start. Which households, in which neighbourhoods, is what the sewershed map is for.
- More bed counts measure the outcome you are trying to get ahead of. They will confirm the problem after it arrives.
- A comparison neighbourhood is worth sampling and is part of the same programme, not a substitute for finding where transmission is happening.

**Takeaway:** The most useful surveillance reaches upstream of the outcome it is trying to prevent.

---

## Mission 9 — The Animal Connection

**Objective:** Build a defensible reservoir hypothesis using ecological exposure, prevalence, and genetic relatedness.

**Stake:** A mistaken reservoir declaration could trigger ecological damage while the true source continues seeding cases.

### M9.1 — Reservoir, vector, or incidental host?

**Format:** PROTOCOL · **Area:** FIELD · **Place:** One Health Field Station

**Scene shown to the player**

> Genetic similarities point toward an animal reservoir along the river corridor, and four ecological patterns are on the board. A species carrying the agent persistently with little illness behaves differently from a biting organism that transfers it between hosts; a species that becomes ill but rarely transmits onward is a dead end; a species common near cases but consistently negative is a coincidence of habitat. Ecological role is inferred from dynamics — persistence, transmission, prevalence — rather than from proximity or from which animal people are most afraid of.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- A species carries the agent persistently with little disease.
- A biting organism transfers the agent between hosts.
- A species becomes ill but rarely transmits onward.
- A species is common near cases but consistently tests negative.

**Choices offered**

- Potential reservoir host.
- Potential biological or mechanical vector.
- Incidental or dead-end host.
- Ecological association without evidence of infection.

**Correct answer**

1. A species carries the agent persistently with little disease.  →  **Potential reservoir host.**
2. A biting organism transfers the agent between hosts.  →  **Potential biological or mechanical vector.**
3. A species becomes ill but rarely transmits onward.  →  **Incidental or dead-end host.**
4. A species is common near cases but consistently tests negative.  →  **Ecological association without evidence of infection.**

**Why (shown in verdict):** Presence near patients does not define a reservoir. Persistence and contribution to transmission are load-bearing.

**Takeaway:** Ecological roles are inferred from dynamics, not appearance or proximity alone.

### M9.2 — Test the reservoir hypothesis

**Format:** SEQUENCE · **Area:** FIELD · **Place:** Wildlife Ecology Site

**Scene shown to the player**

> Sequences from three patients sit close to a virus recovered from animals along the river corridor, and trappers report sick animals on the flood plain. A reservoir claim needs more than a positive animal: it needs human cases mapped against habitat and exposure, sampling designed so that finding the agent is not an artefact of where you looked, prevalence and genetic signatures compared across hosts, and a test of whether the combined evidence explains repeated spillover rather than one event. Nobody has yet sampled in a way that could distinguish a reservoir from a bystander that caught it from people.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Map human cases against habitat and exposure patterns.
- Sample candidate species using an unbiased design and comparison sites.
- Compare prevalence and genetic signatures across hosts.
- Test whether the combined evidence explains repeated spillover.

**Correct answer**

1. **Map human cases against habitat and exposure patterns.**
2. **Sample candidate species using an unbiased design and comparison sites.**
3. **Compare prevalence and genetic signatures across hosts.**
4. **Test whether the combined evidence explains repeated spillover.**

**Why (shown in verdict):** Exposure patterns guide sampling; prevalence and relatedness then test whether the candidate participates in the transmission cycle.

**Takeaway:** A reservoir claim requires population and evolutionary evidence together.

### M9.3 — Choose the One Health campaign

**Format:** CHOICE · **Area:** POP · **Place:** Comparative Genomics Lab

**Scene shown to the player**

> There is one field campaign to fund, and its design decides what can be concluded from it. Sampling only the most feared species near one village guarantees a result that cannot be generalised; stratifying across species, habitat and season makes prevalence comparable; sequencing positives from both humans and animals is what connects the two populations evolutionarily. Removing wildlife before establishing whether it is the reservoir is an intervention that also destroys the evidence. One Health decisions have to connect human, animal and environmental evidence before anything irreversible happens.

**Question**  One field campaign. What is its design?

**Choices offered**

- Stratify sampling across species, habitat, season and comparison sites.
- Sample the most feared species intensively near one case household.
- Sequence every positive sample from humans and animals.
- Remove wildlife from the flood plain while the investigation continues.

**Correct answer**

**Stratify sampling across species, habitat, season and comparison sites.**

**Why (shown in verdict):** A reservoir claim is a claim about prevalence, and prevalence only means something against a design that could have found the agent somewhere else. Comparison sites are what separate a reservoir from a bystander that caught it from people.

**Why the others do not hold**

- Sampling hard around one household guarantees a positive that cannot be generalised, and it will be the species people were already afraid of.
- [object Object]
- Removing wildlife before involvement is established destroys the evidence, and does nothing at all if the reservoir is a species nobody removed.

**Takeaway:** One Health decisions should connect human, animal, and environmental evidence before intervention.

---

## Mission 10 — The Mutation

**Objective:** Distinguish change in frequency from proof of advantage and identify evidence that tests competing evolutionary explanations.

**Stake:** Misreading drift as selection can produce unnecessary alarm; missing a genuine advantage can leave the response behind the evolving population.

### M10.1 — From variation to evolutionary change

**Format:** SEQUENCE · **Area:** MOL · **Place:** Sequencing Center

**Scene shown to the player**

> A genetic variant is rising in one part of the city and the word 'evolution' is being used in the briefing room. Selection is a specific chain, and it is worth writing out: heritable variants arise by mutation or already exist in the population, conditions cause those variants to differ in survival or reproduction, the successful ones contribute disproportionately to the next generation, and frequencies change over generations as a result. Nothing in that chain says a rising variant must be advantageous — frequencies also move for reasons that have nothing to do with fitness.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Heritable variants arise through mutation or existing diversity.
- Environmental conditions cause variants to differ in reproductive success.
- Successful variants contribute disproportionately to later generations.
- Population frequencies change over generations.

**Correct answer**

1. **Heritable variants arise through mutation or existing diversity.**
2. **Environmental conditions cause variants to differ in reproductive success.**
3. **Successful variants contribute disproportionately to later generations.**
4. **Population frequencies change over generations.**

**Why (shown in verdict):** Variation must exist before differential success can change the population.

**Takeaway:** Natural selection changes frequencies through heritable differences in reproductive success.

### M10.2 — Selection or sampling artifact?

**Format:** DIAGNOSIS · **Area:** POP · **Place:** Evolutionary Dynamics Group

**Scene shown to the player**

> A variant goes from 8 to 31 per cent of sequences in four weeks. Three independent hospital systems show the same upward trend, sequencing depth is stable, neutral control variants show no coordinated rise, and after adjusting for place and date the variant lineages are still growing faster. A frequency change is an observation; selection is an explanation for it, and it competes with founder effects, changes in who is being sampled, and geographic clustering. The controls are what separate the two, and they have to be read before the conclusion is written.

**Question**  Which explanation best fits the frequency trend and the independent checks?

**Panel headline**  A genetic variant rises quickly in the city data.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Variant frequency | Variant frequency | 8% -> 31% in four weeks | alarm |
| Independent hospitals | Independent hospitals | Same upward trend in three systems | alarm |
| Sequencing depth | Sequencing depth | Stable | normal |
| Neutral control variants | Neutral control variants | No coordinated rise | normal |
| Adjusted growth estimate | Adjusted growth estimate | Variant lineages grow faster after place and date are controlled | alarm |

**Choices offered**

- Real selective advantage — _The variant has a reproducible growth advantage and increases in frequency across independent populations._
- Changing sampling mix — _The apparent rise is created because later samples come from different places or patient groups._
- Sequencing artifact — _A technical change makes the variant easier to detect over time._
- Single founder event only — _One early cluster happens to contain the variant, with no broader growth advantage._

**Correct answer**

**Real selective advantage**

**Why (shown in verdict):** The rise repeats across independent hospitals, technical depth is stable, neutral variants do not show the same shift, and the adjusted lineage comparison still shows faster growth. Together those checks support selection rather than a sampling or laboratory artifact.

**Takeaway:** A frequency change is an observation; selection is an explanation that requires controls against sampling, founder effects, and technical drift.

### M10.3 — Track a rising variant

**Format:** BALLPARK · **Area:** POP · **Place:** Regional Surveillance Hub

**Scene shown to the player**

> Before anybody argues about why a variant is rising, the frequency itself has to be right. In week one, 40 of 400 sequenced samples carried the variant; in week three, 180 of 600 did. Frequencies are ratios and only mean something if the denominators are comparable — a change in who gets sequenced moves the numerator without anything happening in the population. Compute both frequencies and the change between them, and keep the two questions separate: how much it moved, and afterwards, why.

**Question**  Estimate the change in variant frequency, in percentage points.

**Correct answer**

Equation shown: `( {2} ÷ {3} − {0} ÷ {1} ) × 100`
Tiles offered: `40 variant, week 1`, `400 sequenced, week 1`, `180 variant, week 3`, `600 sequenced, week 3`, `220 variant, weeks 1 and 3 together`, `1,000 sequenced across both weeks`
Tiles that belong: `40 variant, week 1`, `400 sequenced, week 1`, `180 variant, week 3`, `600 sequenced, week 3`
Decoy tiles: `220 variant, weeks 1 and 3 together`, `1,000 sequenced across both weeks`
Formula: `(c/d-a/b)*100`
**Target: 20 percentage points** (tolerance ±1)
Explanation shown: Pooling the two weeks throws away the comparison — the whole question is whether the ratio moved, and a combined numerator over a combined denominator cannot say. Each week needs its own denominator.

**Why (shown in verdict):** A frequency is a ratio, and the ratio only means something if the two denominators were produced the same way. A change in who gets sequenced moves the numerator with nothing happening in the population.

**Takeaway:** Evolutionary inference begins with accurate frequencies and then tests causal explanations.

---

## Mission 11 — Treatment Failure

**Objective:** Separate inherited resistance from non-genetic treatment failure and propose a strategy that reduces selective advantage without undertreating patients.

**Stake:** A blunt response could expose patients to toxicity while strengthening the very resistant population the therapy is meant to suppress.

### M11.1 — Why did the therapy fail?

**Format:** DIAGNOSIS · **Area:** POP · **Place:** Clinical Ward

**Scene shown to the player**

> A therapy that worked is failing. The panel shows drug concentration within the expected therapeutic range, agent burden falling and then rebounding, a resistance-associated variant at the target site becoming dominant, a reference isolate that remains drug-sensitive, and doses documented as administered. Treatment failure has several possible causes — the drug never reached the target, the dose was wrong, the patient population differs, or the pathogen population changed under selection — and they are distinguished by which measurements are normal. Evolution is observable here on the timescale of a ward round.

**Question**  Which explanation fits the complete treatment-response panel?

**Panel headline**  A treatment initially suppresses the infectious agent, but the signal rebounds while the patient is still receiving therapy.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Drug concentration | Drug concentration | Within expected therapeutic range | normal |
| Agent burden | Agent burden | Falls, then rebounds | alarm |
| Target-site sequence | Target-site sequence | Resistance-associated variant becomes dominant | alarm |
| Reference isolate | Reference isolate | Remains drug-sensitive | alarm |
| Administration record | Administration record | Doses documented | alarm |

**Choices offered**

- Poor drug delivery — _The drug never reaches an effective concentration in the patient._
- Evolved resistance — _Treatment favors a resistant subpopulation that later dominates and restores growth._
- Wrong infectious agent — _The original identification was incorrect, so treatment never targeted the cause._
- Assay contamination — _The rebound is an artificial laboratory signal unrelated to the patient._

**Correct answer**

**Evolved resistance**

**Why (shown in verdict):** Drug exposure is adequate and produces an initial response, but a resistance-associated variant rises as the agent rebounds. The control isolate remains sensitive, making a general assay or drug failure less likely.

**Takeaway:** Evolution can be observed in real time when a treatment changes which variants are most successful.

### M11.2 — How resistance spreads

**Format:** SEQUENCE · **Area:** POP · **Place:** Microbiology and Evolution Lab

**Scene shown to the player**

> The therapy worked for six weeks and now fails in one patient in four. Isolates from the failures grow at drug concentrations that stopped the same organism in March, and the failures cluster on the wards where the treatment has been in use longest. Selection does not create the variant it needs when it needs it: variation is present or arises independently of the treatment, and what treatment changes is which variants leave descendants. Getting that order right is what separates an evolutionary explanation from a story about the drug teaching the organism to resist.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- A population contains rare variants with differing susceptibility.
- Treatment removes susceptible individuals more effectively.
- Less-susceptible variants survive and reproduce.
- The treated population becomes enriched for resistance.

**Correct answer**

1. **A population contains rare variants with differing susceptibility.**
2. **Treatment removes susceptible individuals more effectively.**
3. **Less-susceptible variants survive and reproduce.**
4. **The treated population becomes enriched for resistance.**

**Why (shown in verdict):** Treatment does not create the needed mutation on demand; it changes which variants leave descendants.

**Takeaway:** Selection acts on existing or newly arising variation by differential survival and reproduction.

### M11.3 — Recover treatment effectiveness

**Format:** CHOICE · **Area:** POP · **Place:** Pharmacology Unit

**Scene shown to the player**

> Effectiveness is falling and the pharmacology unit has a limited budget. Sequencing failures alongside matched successes asks whether the target site has changed; measuring drug exposure and adherence objectively asks whether the drug ever reached therapeutic concentration; testing combinations or alternative targets asks what would still work. Raising the dose for everyone without safety data treats one hypothesis as established and exposes patients who never had a resistance problem to toxicity. A resistance response has to combine the evolutionary evidence with pharmacology and with what is safe.

**Question**  One thing before anybody's prescription changes. Which?

**Choices offered**

- Sequence the failures alongside matched successful cases.
- Measure drug exposure and adherence objectively.
- Increase the dose for every patient on the ward.
- Test combinations and alternative targets under a clinical protocol.

**Correct answer**

**Sequence the failures alongside matched successful cases.**

**Why (shown in verdict):** Every failure here occurred on documented dosing with drug concentrations inside the therapeutic range, so the drug arrived. What is in question is whether the target site changed — and the matched successes are the control that turns a resistance-associated variant into evidence rather than a coincidence.

**Why the others do not hold**

- Exposure and adherence answer whether the drug ever reached the target, which is the right question when concentrations are unknown. Here they were measured and they were adequate.
- Raising the dose for everyone treats resistance as established and exposes the three patients in four who are responding to unnecessary toxicity.
- Combinations and alternative targets are the response once you know what changed. Chosen now, they are a guess with a protocol attached.

**Takeaway:** A resistance response should combine evolutionary evidence with pharmacology and patient safety.

---

## Mission 12 — Design the Intervention

**Objective:** Select a layered intervention portfolio and identify the evidence required before deployment.

**Stake:** Choosing one glamorous intervention and neglecting all others could leave the city unprotected during development or against biological change.

### M12.1 — Choose the intervention layer

**Format:** PROTOCOL · **Area:** POP · **Place:** Vaccine Design Lab

**Scene shown to the player**

> The city wants an intervention and the room is arguing about which one, as though only one can be chosen. Each class acts at a different point: something that prevents initial cell entry acts before infection is established; a therapy that shortens severe inflammatory disease acts after it; immune memory created before exposure changes who can be infected at all; reducing opportunities for transmission works on the population rather than the patient. A layered strategy is stronger precisely because the layers have different mechanisms and therefore different failure modes.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Prevent initial cell entry.
- Shorten severe inflammatory disease after infection.
- Create immune memory before exposure.
- Reduce opportunities for transmission while biomedical tools are limited.

**Choices offered**

- Entry-blocking antibody or receptor-targeted strategy.
- Stage-specific anti-inflammatory treatment with monitoring.
- Vaccination.
- Ventilation, isolation, masking, or contact reduction as appropriate.

**Correct answer**

1. Prevent initial cell entry.  →  **Entry-blocking antibody or receptor-targeted strategy.**
2. Shorten severe inflammatory disease after infection.  →  **Stage-specific anti-inflammatory treatment with monitoring.**
3. Create immune memory before exposure.  →  **Vaccination.**
4. Reduce opportunities for transmission while biomedical tools are limited.  →  **Ventilation, isolation, masking, or contact reduction as appropriate.**

**Why (shown in verdict):** Different tools act at different points in the biological and transmission chain.

**Takeaway:** A layered strategy is stronger when each intervention has a defined mechanism and failure mode.

### M12.2 — From candidate to justified trial

**Format:** SEQUENCE · **Area:** POP · **Place:** Therapeutics Group

**Scene shown to the player**

> Two compounds show activity in cell culture and the city wants one of them in patients within the month. Neither has been through an animal model, the manufacturer can supply a few hundred doses, and the protocol on the table names no endpoint and no stopping rule. The path from mechanistic promise to a defensible clinical claim exists because activity in a dish predicts very little on its own — it has to become a testable question with a defined population, an endpoint, a control group and rules for when to stop. Urgency changes the speed of that path, not its structure.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Define the biological target and intended mechanism.
- Demonstrate relevant activity and identify major safety concerns in preclinical evidence.
- Specify trial population, endpoints, controls, and stopping rules.
- Begin a monitored clinical trial with independent oversight.

**Correct answer**

1. **Define the biological target and intended mechanism.**
2. **Demonstrate relevant activity and identify major safety concerns in preclinical evidence.**
3. **Specify trial population, endpoints, controls, and stopping rules.**
4. **Begin a monitored clinical trial with independent oversight.**

**Why (shown in verdict):** Mechanistic promise must be translated into a testable and ethically governed clinical question.

**Takeaway:** Urgency changes speed and coordination, not the need for interpretable evidence and participant protection.

### M12.3 — Build a layered intervention portfolio

**Format:** CHOICE · **Area:** POP · **Place:** Public Health Strategy Room

**Scene shown to the player**

> Several plausible layers are competing for the one the city can start now: a vaccine candidate against a conserved surface target, a therapeutic aimed at a validated host or agent process, and ventilation and rapid-isolation improvements that work regardless of what the biology turns out to be. A publicity campaign declaring the crisis over is not a layer. A strategy is stronger when the mechanisms are genuinely different, and it is only useful afterwards if the design still allows the team to learn which layer did the work.

**Question**  The city can start one layer this month. Which?

**Choices offered**

- Ventilation and rapid-isolation improvements.
- A vaccine candidate against a conserved surface feature.
- A therapeutic aimed at a validated host or agent pathway.
- A publicity campaign stating that the crisis is under control.

**Correct answer**

**Ventilation and rapid-isolation improvements.**

**Why (shown in verdict):** Layers are chosen for mechanism and for timing. Ventilation and isolation reduce transmission opportunities whatever the biology turns out to be, and they work this month — which is the month the other two spend in development.

**Why the others do not hold**

- The vaccine is the strongest long-run layer and protects nobody during the months it takes to make. Start it too; it is not what this month buys.
- A therapeutic depends on a pathway that is still being validated, and it acts after infection rather than reducing how much of it there is.
- A campaign announcing control is not a layer. It has no mechanism, and it fails in exactly the way that costs the most.

**Takeaway:** Layers are chosen for different mechanisms and different timescales, not for how promising each one sounds.

---

## Mission 13 — The Trial Signal

**Objective:** Make a conditional trial decision that weighs benefit, uncertainty, and safety rather than relying on one p-value or headline percentage.

**Stake:** Expanding an unsafe intervention harms participants; stopping too early can discard the only effective tool.

### M13.1 — Protect the comparison

**Format:** PROTOCOL · **Area:** CLIN · **Place:** Clinical Trial Center

**Scene shown to the player**

> Early trial results look encouraging, and the design is where an encouraging number either earns belief or does not. Four threats are on the table: sicker patients preferentially receiving the candidate, outcome assessors knowing who was treated, many outcomes tested with only the best reported, and participants leaving the study at different rates by group. Each of these produces an apparent effect in the absence of a real one, and each has a specific design control that neutralises it. A credible effect depends on how the comparison was produced, not only on the size of the difference.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Sicker patients preferentially receive the candidate.
- Outcome assessors know who received treatment.
- Many outcomes are tested and only the best is reported.
- Participants leave the study at different rates by group.

**Choices offered**

- Randomization or careful allocation procedures.
- Blinding where feasible.
- Pre-specified primary outcomes and multiplicity control.
- Track attrition and analyze its potential bias.

**Correct answer**

1. Sicker patients preferentially receive the candidate.  →  **Randomization or careful allocation procedures.**
2. Outcome assessors know who received treatment.  →  **Blinding where feasible.**
3. Many outcomes are tested and only the best is reported.  →  **Pre-specified primary outcomes and multiplicity control.**
4. Participants leave the study at different rates by group.  →  **Track attrition and analyze its potential bias.**

**Why (shown in verdict):** Trial design protects the counterfactual comparison: what would have happened without the intervention.

**Takeaway:** A credible effect depends on how the comparison was produced, not only the final number.

### M13.2 — Read effect size and uncertainty

**Format:** BALLPARK · **Area:** POP · **Place:** Biostatistics Office

**Scene shown to the player**

> The trial reports hospitalisation in 20 of 200 control participants and 10 of 200 treated. That single comparison can be expressed as a halving of risk, as a five-percentage-point reduction, or as the number of patients who must be treated for one to benefit — and the three sound very different to a health minister deciding whether to buy it. Relative and absolute effects answer different decision questions, and reporting only the one that sounds largest is the most common way a real but modest effect is oversold.

**Question**  Estimate the number of patients who must be treated for one to benefit.

**Correct answer**

Equation shown: `1 ÷ ( {0} ÷ {1} − {2} ÷ {3} )`
Tiles offered: `20 hospitalised, control arm`, `200 participants, control arm`, `10 hospitalised, treated arm`, `200 participants, treated arm`, `30 hospitalised in the trial`, `400 participants in the trial`
Tiles that belong: `20 hospitalised, control arm`, `200 participants, control arm`, `10 hospitalised, treated arm`, `200 participants, treated arm`
Decoy tiles: `30 hospitalised in the trial`, `400 participants in the trial`
Formula: `1/((a/b)-(c/d))`
**Target: 20 patients treated per additional benefit** (tolerance ±1)
Explanation shown: The same result is a halving of risk, a five-percentage-point reduction, and one benefit per twenty treated. The relative figure sounds largest and is the least useful for deciding how much of the drug to buy.

**Why (shown in verdict):** Relative and absolute effects answer different questions, and reporting only the one that sounds biggest is the most common way a real but modest effect is oversold.

**Takeaway:** Relative and absolute effects answer different decision questions and should be reported together.

### M13.3 — Continue, expand, or pause?

**Format:** CHOICE · **Area:** POP · **Place:** Independent Safety Board

**Scene shown to the player**

> The result is promising and imprecise, and the safety board has to decide what happens next. Expanding enrolment under the same pre-specified analysis buys precision; intensifying independent safety monitoring buys confidence about the uneven adverse events; adding targeted mechanistic measurements asks why it works, which decides whether the effect will generalise. Declaring success and stopping data collection converts an imprecise estimate into a permanent one. A mature decision here is encouraging and cautious at the same time, and the allocation is where that shows.

**Question**  Promising, imprecise, and the adverse events are uneven. What does the board decide?

**Choices offered**

- Expand enrolment under the same pre-specified analysis.
- Declare success and stop collecting data.
- Add mechanistic measurements to explain why it works.
- Pause the trial until the adverse events are fully investigated.

**Correct answer**

**Expand enrolment under the same pre-specified analysis.**

**Why (shown in verdict):** The estimate is real and too wide to act on, and width is fixed by numbers rather than by argument. Keeping the pre-specified analysis is what makes the extra participants add precision instead of adding a second chance to find a positive result.

**Why the others do not hold**

- Stopping now converts an imprecise estimate into a permanent one, and the imprecision is the whole reason the board was convened.
- Mechanism is worth knowing and does not narrow the interval the decision turns on.
- Pausing is right if the safety signal is real, and the safety board's monitoring is what establishes that — it runs alongside enrolment rather than instead of it.

**Takeaway:** A mature trial decision can be encouraging and cautious at the same time.

---

## Mission 14 — Containment or Adaptation?

**Objective:** Use scenarios and trigger-based policies instead of pretending one forecast is certain.

**Stake:** An inflexible choice can either impose unnecessary costs or allow the health system to collapse.

### M14.1 — Build a decision model

**Format:** SEQUENCE · **Area:** POP · **Place:** Population Modeling Group

**Scene shown to the player**

> Three districts are on visibly different trajectories and the council wants one city-wide policy by Friday. The modelling team has nine days of case data, a dozen parameters they can only bound rather than measure, and no agreement yet about which decision the model is supposed to inform. A model is a structured argument: it states a decision, a time horizon and the outcomes that matter, picks a transparent structure, estimates inputs from data, and explores the range of plausible worlds rather than asserting one. Its assumptions are the output as much as its numbers are.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- State the decision, time horizon, and outcomes that matter.
- Choose a transparent model structure and estimate inputs from data.
- Run multiple plausible scenarios and sensitivity tests.
- Link observable triggers to pre-agreed policy changes.

**Correct answer**

1. **State the decision, time horizon, and outcomes that matter.**
2. **Choose a transparent model structure and estimate inputs from data.**
3. **Run multiple plausible scenarios and sensitivity tests.**
4. **Link observable triggers to pre-agreed policy changes.**

**Why (shown in verdict):** The model serves a decision; uncertainty is explored before policies are tied to observable triggers.

**Takeaway:** Models are structured arguments whose assumptions should remain visible.

### M14.2 — Hospital capacity threshold

**Format:** BALLPARK · **Area:** CLIN · **Place:** Hospital Capacity Center

**Scene shown to the player**

> A region has 120 staffed critical-care beds, 90 already occupied, and severe cases arriving at about eight a day. Thirty free beds against eight admissions a day gives a first bound on how long capacity lasts — and it is an upper bound only if nobody is discharged, which is why it is a bound and not a forecast. Crude arithmetic like this is worth doing early because it shows which missing quantity actually drives the decision: here, the discharge rate nobody has measured.

**Question**  Estimate the upper bound on time to capacity, assuming nobody is discharged.

**Correct answer**

Equation shown: `{0} ÷ {1}`
Tiles offered: `30 open beds`, `8 admissions/day`, `120 staffed beds`, `90 beds occupied`, `6 days (average stay)`
Tiles that belong: `30 open beds`, `8 admissions/day`
Decoy tiles: `120 staffed beds`, `90 beds occupied`, `6 days (average stay)`
Formula: `a/b`
**Target: 3.75 days** (tolerance ±0.3)
Explanation shown: Total beds is the wrong numerator, because ninety of them are full. The average stay is what would turn this bound into a forecast, and nobody has measured the discharge rate — which is exactly what the crude number exposes.

**Why (shown in verdict):** A bound is worth computing early because of what it shows is missing. Here it says the decision turns on a discharge rate nobody is collecting.

**Takeaway:** Simple bounds can reveal which missing data are decision-critical.

### M14.3 — Choose an adaptive policy

**Format:** CHOICE · **Area:** POP · **Place:** City Command

**Scene shown to the player**

> The outbreak is geographically uneven and the council wants a policy it can defend for a month. Targeted containment where transmission chains are traceable is cheap and fails silently if chains are missed; city-wide measures tied to hospital and growth indicators are costly and self- correcting; capacity expansion protects the outcome that matters without touching transmission. Committing permanently to one option regardless of what is observed is the only choice on the table that cannot learn. Policy under uncertainty works as a feedback system with observable triggers agreed in advance.

**Question**  A policy the council can defend for a month. Which?

**Choices offered**

- Citywide measures tied to hospital and growth thresholds.
- Targeted containment wherever transmission chains are traceable.
- Capacity expansion and protection of vulnerable populations.
- Commit to one policy now and hold it whatever the data show.

**Correct answer**

**Citywide measures tied to hospital and growth thresholds.**

**Why (shown in verdict):** Uncertainty is not resolved by choosing more confidently. A policy tied to observable triggers agreed in advance changes when the outbreak changes, and it can be relaxed without anybody having to admit they were wrong — which is what keeps it defensible for a month.

**Why the others do not hold**

- Targeted containment is cheap and effective where chains are traceable, and it fails silently where they are not. Nothing in it tells you it has stopped working.
- Capacity expansion protects the outcome that matters and does nothing about transmission, so it raises the ceiling without slowing the climb.
- Committing regardless of new evidence is the only option here that cannot learn, which in a month of an uneven outbreak is the one guaranteed to be wrong somewhere.

**Takeaway:** Good policy is a feedback system, not a one-time guess.

---

## Mission 15 — The Final Briefing

**Objective:** Produce a claim-by-claim evidence package with explicit residual uncertainties and durable surveillance responsibilities.

**Stake:** A technically correct response can still fail if uncertainty, burdens, and continuing responsibilities are hidden from the people affected.

### M15.1 — Disposition the final claims

**Format:** PROTOCOL · **Area:** POP · **Place:** Scientific Review Hall

**Scene shown to the player**

> The board has to disposition four claims of very different strength: a transmission route supported by multiple independent data streams, a severe-risk subgroup suggested by one small observational sample, an intervention that lowers hospitalisation under monitored safety but with unknown duration, and an animal reservoir that remains plausible and unconfirmed. Each deserves a different recommendation, and the failure mode is uniform treatment — publishing the weakest claim with the confidence of the strongest, or holding back the strongest because the weakest is unresolved.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Multiple independent data streams support the transmission route.
- A severe-risk subgroup is suggested by one small observational sample.
- An intervention lowers hospitalization with monitored safety but long-term duration is unknown.
- An animal reservoir remains plausible but unconfirmed.

**Choices offered**

- Treat as established enough for operational planning while continuing surveillance.
- Label as provisional and collect representative confirmatory data.
- Use conditionally with follow-up and duration studies.
- Avoid destructive ecological action; continue targeted One Health investigation.

**Correct answer**

1. Multiple independent data streams support the transmission route.  →  **Treat as established enough for operational planning while continuing surveillance.**
2. A severe-risk subgroup is suggested by one small observational sample.  →  **Label as provisional and collect representative confirmatory data.**
3. An intervention lowers hospitalization with monitored safety but long-term duration is unknown.  →  **Use conditionally with follow-up and duration studies.**
4. An animal reservoir remains plausible but unconfirmed.  →  **Avoid destructive ecological action; continue targeted One Health investigation.**

**Why (shown in verdict):** Integrated review distinguishes established findings, conditional findings, and unresolved hypotheses.

**Takeaway:** Scientific conclusions should carry the strength and limits of their supporting evidence.

### M15.2 — Build the public explanation

**Format:** SEQUENCE · **Area:** POP · **Place:** City Command

**Scene shown to the player**

> The mayor is on air in an hour. The transmission route is settled across three independent data streams, the animal reservoir is still unconfirmed, and the treatment works under conditions nobody has tested beyond eight weeks. The draft in front of you opens with the actions and never reaches what is still unknown. A briefing that survives the next revision states what is known and how it was learned, what remains uncertain and why, what is being done and at what cost, and how the account will be updated when the evidence changes.

**Question**  Order the briefing by how much weight each claim can carry.

**Cards to order** (presented shuffled)

- The transmission route, which three independent data streams agree on.
- The severe-risk subgroup, which one small observational sample suggests.
- The animal reservoir, which remains plausible and unconfirmed.
- What each of those would take to settle, and when it will be revisited.

**Correct answer**

1. **The transmission route, which three independent data streams agree on.**
2. **The severe-risk subgroup, which one small observational sample suggests.**
3. **The animal reservoir, which remains plausible and unconfirmed.**
4. **What each of those would take to settle, and when it will be revisited.**

**Why (shown in verdict):** The briefing is ordered by how much the evidence will carry, strongest first, because that is the order in which a listener can tell one claim from another. Publishing the reservoir with the confidence of the transmission route is what makes the whole document unbelievable when the reservoir turns out to be somewhere else.

**Takeaway:** A public account is ordered by the strength of its evidence, not by the order the work happened in.

### M15.3 — Fund the post-crisis legacy

**Format:** CHOICE · **Area:** POP · **Place:** Public Briefing Room

**Scene shown to the player**

> The emergency budget closes at the end of the month and anything uncommitted returns to the state. Integrated clinical, environmental and genomic surveillance is what would detect the next event early; health-system resilience and workforce training is what determines whether detection helps; preserving transparent data, methods and after-action lessons is what makes the next response start from this one rather than from nothing. The fourth proposal is a request to delete the records before they can be used against the city. Crisis knowledge only becomes capability if something is funded to carry it.

**Question**  The emergency budget closes this month. What does the city commit it to?

**Choices offered**

- Integrated clinical, environmental and genomic surveillance.
- Health-system resilience and workforce training.
- Preserving the data, methods and after-action record.
- Closing the records once the review is published.

**Correct answer**

**Integrated clinical, environmental and genomic surveillance.**

**Why (shown in verdict):** Every week of warning this outbreak got came from a signal somebody was already collecting. Surveillance is the one item here that has to run continuously to be worth anything, so it is the one a closing budget should endow rather than leave to next year's argument.

**Why the others do not hold**

- Resilience and training decide whether detection helps, and they are the next call. They do nothing if nothing detects the next event.
- Preserving the record costs very little and should happen regardless. It is a filing decision, not what an emergency budget is for.
- Closing the records removes the only account of how any of this was measured, and the next response would start from nothing.

**Takeaway:** The final responsibility is to convert crisis knowledge into durable public capability.

---

## Grading

Three axes, 1–5 each; the rubric is in `README.md`. Rows marked **Fixed**, **Rebuilt**, **Rewritten** or **Correction** changed after the first audit.

- **Solv** — can a prepared student reach the keyed answer from the scene and panel alone?
- **Edu** — does getting it right require and build transferable subject knowledge?
- **Fit** — does it map onto a named topic in a standard course for the stated audience?

| ID | Format | Topic | Solv | Edu | Fit | Note |
| --- | --- | --- | :-: | :-: | :-: | --- |
| M1.1 | PROTOCOL | Outbreak detection: baselines, denominators, ascertainment | 4 | 4 | 4 | The common-mode alert-rule item is the good one — it is the same independence idea the rest of the game runs on. |
| M1.2 | SEQUENCE | Case definition | 4 | 4 | 5 | One of only two non-identity orderings in the repository (review records *before* specifying criteria), so the shuffle is meaningful. Core epidemiology. |
| M1.3 | CHOICE | First-response portfolio | 4 | 4 | 4 | What the office starts this afternoon. The line list wins because nothing can be counted until three hospitals count the same thing — which is the M1.2 lesson applied. |
| M2.1 | DIAGNOSIS | Agent classification from negatives | 4 | 4 | 5 | Well built — the negative controls do the work. Needs the "obligate intracellular" idea, which the scene supplies. |
| M2.2 | SEQUENCE | Classification workflow | 3 | 3 | 3 | Generic laboratory recipe; only "controls first" is forced. |
| M2.3 | CHOICE | Independent failure modes | 4 | 4 | 4 | One experiment to separate two hypotheses, decided by independence of failure mode rather than by which evidence is cheapest. |
| M3.1 | SEQUENCE | Viral entry | 5 | 5 | 5 | Physically forced order, textbook cell biology. |
| M3.2 | PROTOCOL | Membrane transport mechanisms | 5 | 5 | 5 | The single most syllabus-aligned item in the repository: simple diffusion / facilitated / active / endocytosis, discriminated by gradient direction, protein requirement, ATP cost and cargo size. |
| M3.3 | CHOICE | Locating the first divergent step | 4 | 5 | 4 | Find the earliest step at which the two cell types diverge. The mechanistic principle is now the answer rather than the framing. |
| M4.1 | SEQUENCE | Central dogma | 5 | 5 | 5 | Forced order, core content. |
| M4.2 | PROTOCOL | Where expression is regulated | 5 | 5 | 5 | RNA up / protein flat vs RNA flat / protein up vs missense vs low specific activity — four genuinely different diagnoses. Excellent. |
| M4.3 | CHOICE | Measuring across the causal chain | 4 | 5 | 5 | Transcript abundance first, because it is the one measurement that splits three mechanisms consistent with the same protein level. |
| M5.1 | SEQUENCE | PCR controls | 4 | 4 | 5 | Sound. Cards 2 and 3 are weakly ordered relative to each other. |
| M5.2 | DIAGNOSIS | Carryover contamination | 5 | 5 | 5 | A positive no-template control against a working positive control and a negative orthogonal platform. Textbook, and inescapable from the panel. |
| M5.3 | BALLPARK | Positive predictive value | 4 | 5 | 5 | **Rebuilt.** The tiles were the true and false positive counts; they are now prevalence, sensitivity, specificity and the screened population, with a ward-prevalence decoy. The student does the epidemiology instead of the last division. |
| M6.1 | DIAGNOSIS | Oxygen-delivery chain | 5 | 5 | 5 | Normal CO₂, cardiac output and haemoglobin localise the failure to gas exchange. Exactly how respiratory physiology is taught. |
| M6.2 | BALLPARK | Delivery = content × flow | 5 | 4 | 4 | **Fixed.** The question asked for both patients and a bottleneck; it now asks for the delivery the panel computes, with saturation and haemoglobin as decoys. |
| M6.3 | CHOICE | Sampling along the transport chain | 4 | 5 | 4 | Measure the far end of the chain, because the panel already established the top of it. Uses the earlier diagnosis rather than repeating it. |
| M7.1 | SEQUENCE | Innate → adaptive → memory | 5 | 5 | 5 | Forced, core immunology. |
| M7.2 | DIAGNOSIS | Immunopathology vs ongoing infection | 5 | 5 | 5 | Timing is the discriminator — deterioration *after* pathogen burden falls — and negative bacterial cultures kill the superinfection rival. Very good. |
| M7.3 | CHOICE | Treat the mechanism, not the marker | 4 | 5 | 5 | Measure both curves before suppressing anything. The decision is the immunology: which of two drivers is rising while the other falls. |
| M8.1 | PROTOCOL | Surveillance streams and their selection processes | 4 | 4 | 4 | The prevalence-vs-incidence item is the strong one. |
| M8.2 | BALLPARK | Next generation from R | 5 | 4 | 5 | **Fixed.** Question no longer asks for a verdict the panel cannot capture, and the decoys are a serial interval and a cumulative count — the two quantities students substitute for R. |
| M8.3 | CHOICE | Upstream surveillance | 4 | 4 | 4 | Sewershed sampling, because hospital isolation has held and the chain is running where the hospital cannot see. Contact studies need the map first. |
| M9.1 | PROTOCOL | Reservoir / vector / dead-end / bystander | 5 | 5 | 5 | Four ecological roles discriminated by dynamics rather than proximity. Squarely One Health curriculum. |
| M9.2 | SEQUENCE | Testing a reservoir hypothesis | 4 | 4 | 4 | Sampling design before genetics is the forced step. |
| M9.3 | CHOICE | One Health campaign design | 4 | 5 | 5 | Stratified design with comparison sites, because prevalence only means something against a design that could have found the agent somewhere else. |
| M10.1 | SEQUENCE | Natural selection | 5 | 4 | 5 | Forced but close to tautological — the cards nearly state the definition. |
| M10.2 | DIAGNOSIS | Selection vs sampling artefact | 5 | 5 | 5 | Four controls (three independent hospitals, stable depth, flat neutral variants, adjusted growth) each kill one rival. Model item. |
| M10.3 | BALLPARK | Frequencies and percentage-point change | 5 | 5 | 5 | Pooled-denominator decoys added, which is exactly the mistake the stop is about. |
| M11.1 | DIAGNOSIS | Evolved resistance | 5 | 5 | 5 | Adequate drug exposure plus a rising resistance variant plus a sensitive reference isolate. Clean. |
| M11.2 | SEQUENCE | How selection enriches resistance | 5 | 5 | 5 | Directly attacks the "the drug taught the bug" misconception. The best-targeted item in the game. |
| M11.3 | CHOICE | Resistance response | 4 | 5 | 5 | Sequence the failures against matched successes. The rebuttal for adherence is grounded in the M11.1 panel: the drug arrived. |
| M12.1 | PROTOCOL | Intervention layers by mechanism | 5 | 4 | 4 | Sound, slightly definitional. |
| M12.2 | SEQUENCE | Candidate → justified trial | 4 | 3 | 4 | Regulatory sequence; forced, but little biology decided. |
| M12.3 | CHOICE | Layered portfolio | 4 | 4 | 4 | Ventilation and isolation, because they work whatever the biology turns out to be and they work this month. Mechanism and timescale together. |
| M13.1 | PROTOCOL | Threats to a trial's comparison | 5 | 5 | 5 | Confounding → randomisation, observer bias → blinding, multiplicity → pre-specification, attrition → analysis. Textbook study design, four for four. |
| M13.2 | BALLPARK | ARR, RR, NNT | 5 | 5 | 5 | **Rebuilt.** Raw event counts and arm sizes rather than pre-computed risks, with pooled decoys. The NNT calculation is now done rather than finished. |
| M13.3 | CHOICE | Continue / expand / pause | 4 | 4 | 4 | Expand enrolment under the same pre-specified analysis. The rebuttals concede that safety monitoring runs alongside rather than instead. |
| M14.1 | SEQUENCE | Building a decision model | 4 | 3 | 3 | Generic modelling recipe. |
| M14.2 | BALLPARK | Time to capacity as an upper bound | 5 | 4 | 4 | Decoys added — total beds, occupied beds, average stay — so the student has to notice that ninety of the beds are full. |
| M14.3 | CHOICE | Adaptive policy | 4 | 4 | 3 | A policy tied to observable triggers, because it can change without anybody having to have been wrong. |
| M15.1 | PROTOCOL | Claim-by-claim disposition | 4 | 3 | 3 | Good habit, little biology. |
| M15.2 | SEQUENCE | Public explanation | 4 | 4 | 4 | **Rewritten.** The briefing is ordered by how much weight each claim can carry, which is the disposition idea from M15.1 applied to what gets said out loud. |
| M15.3 | CHOICE | Post-crisis legacy | 4 | 3 | 2 | Surveillance, because it is the item that has to run continuously to be worth anything. The zero-credit decoy problem is gone with the format. |

### Summary

**Averages: Solvability 4.4 · Educational value 4.4 · Curriculum fit 4.4**

Still the best curriculum coverage in the repository, and now the highest fit as well at **4.4**. Its one weak stop — the public briefing — is ordered by how much weight each claim can carry, which applies the disposition idea from the stop before it rather than restating a communications convention.

Everything else about this game was already working: nineteen empty verdict cards now explain themselves, and the three quantitative items that matter most (PPV, oxygen delivery, NNT) supply their inputs instead of their answers.
