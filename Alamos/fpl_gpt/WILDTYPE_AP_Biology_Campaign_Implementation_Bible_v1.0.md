# WILDTYPE

## AP Biology Campaign Implementation Bible

**Version:** 1.0 — new campaign, source-authoring edition

**Campaign length:** 15 missions, 60 graded stops; fifteen field days before the charter ship departs.

**Setting:** Pellow Head Island preserve, reusing Dark Fibre geography and building footprints.

## 0. Readiness boundary

Canonical artifact: `WILDTYPE_AP_Biology_Campaign_Implementation_Bible_v1.0.md`. Master Brief v3.3, Giant Gate v2.3 and Authoring Ledger v1.3 govern this work. Whiteout supplies section order and A–K mission layout, not its old short explanations or handback history. No working repository, importer, renderer or project readability checker was supplied; schema conversion, rendering, full play and actual project readability are NOT TESTED. The payloads use the supplied format documentation provisionally. This is a complete authored bible for review, not a claim of release readiness.

### Source-pack inventory
| Source | Status | Authority/action |
|---|---|---|
| The-Normal-AP-Biology-Cheat-Sheet-1.pdf | MATCH | All eight biology units read; content map in §5. |
| QUESTION_TYPES(1).md | SUPPLIED | Canonical format and stopKind documentation, provisional without code. |
| Campaign_Design_and_Implementation_Master_Brief_v3.3(1).md | SUPPLIED | Authoring, story and exact copy authority. |
| FIRST_PERSON_LEARNING_GIANT_CAMPAIGN_GATE_CHECK_v2.3(1).md | SUPPLIED | Every listed requirement receives a result. |
| FIRST_PERSON_LEARNING_AUTHORING_LEDGER_TEMPLATE_v1.3(1).md | SUPPLIED | Filled companion ledger and JSON. |
| WHITEOUT…v2.11_HAND_BACK_4(1).md | SUPPLIED | Format reference only; no claim this new campaign received its handbacks. |
| darkfibre.txt | SUPPLIED / intentional adaptation | Coordinates, dimensions and low silhouette preserved; all academic content and room functions converted. |
| Repository schema/importer/world implementation | MISSING | No unsupported claim of accepted imports or reachable runtime. |

**Source corrections:** The sheet is a compact reference, not a safety or release protocol. Independent assortment assumes unlinked loci; 3:1 phenotypes assume complete dominance and relevant sampling assumptions. Nondisjunction gives abnormal chromosome numbers, not universally a non-haploid category. Drift occurs in all finite populations and is strongest in small populations. Gene flow tends to reduce divergence but does not universally prevent speciation. Not all prokaryotes have cell walls. Ten-percent trophic transfer is an explicitly approximate model. Keystone removal can have large effects without guaranteeing ecosystem collapse. Phylogenetic outgroups root a comparison and are not simply a ladder of inferior organisms. The sheet’s Gibbs-energy terminology is explained qualitatively only; its own exclusion of formal Gibbs calculations is respected. Exam-time metadata is not imported.

**Biological time:** The fifteen days cover inspection, short controlled assays and release planning. Family crosses, common-garden comparisons and multigeneration marker datasets are archived studies begun before arrival; their dated records are available at the named benches. Any newly authorized cross schedules later offspring observation and does not produce a new generation overnight. The insect archive spans forty earlier generations; the campaign never claims a long-lived animal evolved during this visit.

## Build decisions register

- The source radiography bay becomes a marsh research room with sealed water samples and plant trays; the radiation source, shielding problem, optical cable, laser systems and their lessons are removed completely. Its remoteness now separates wet field work and sensitive habitat from the central nursery.
- Preserve source footprints and coordinates in §3, the dunes at z = −210, channel center (0, −430), water level −3.4, rolling terrain size 1000 and player limit 280. The low blockhouse remains below the dune skyline. Keep spawn (0,70) clear.
- Remote bay straight-line distance from spawn is sqrt(70²+266²) = 275.1 m; source 307 m is not reused as a geometric fact. Actual walk length requires the world build.
- The near route is taught while carrying the first sample in Mission 1. No racing, roster greeting or sightseeing warm-up is authored. The remote route unlocks after Mission 4; first graded use is Mission 5.
- The ship appears offshore at Mission 14 as a stationary visible model and text banner; no camera movement is required. After Stop 60, the plan is provisionally signed and the covered sample cart is staged immediately. Final boarding remains locked until Mission 15 RP allocation, all four bars at 100, and all recorded scientific checks pass. Then the store loading gate opens and the cart appears on the ship; no further question follows.
- Local panels and mission log display exact source sequences, codon meanings, sample histories, observations and units when a task needs them. Hidden keys, mappings and target station IDs remain hidden until grading; answer options are visible but not preselected. Shuffle displayed choice, matching-response and sequence-card order on each fresh attempt; internal IDs and author order must not cue the answer.
- All required dialogue, loading, accessibility menus, app backgrounding, interruptions, primers and worked-example panels pause the timer. Examples are reopenable and change no bars, grading, unlocks or retrieval records.

# 1. Campaign premise and opening

The island once held a living backup for a damaged mainland coast. Thirty years of isolation changed short-generation populations and ecological partnerships, while long-lived animals also learned and acclimated. A returning field team has fifteen days to prepare a permitted contained mainland pilot. The player is the junior biologist who connects clinic, genetics, nursery and field evidence. The original manifest lists conspicuous plants and animals, but misses timing, microbial partners and receiving-site conditions. A good conclusion may narrow the action rather than enlarge it.

## Opening card — exact player copy

You arrive at Pellow Head Island to help its plants and animals return to a damaged mainland coast. Your biology work will decide which living things can travel and what they will need when they arrive. The ship leaves in fifteen days, and a failed move could cost the coast its best chance to recover. Preserve director Ada Penn stops a cart of pale seedlings and says, “Check what they need now.” A bird pulls an insect from the cart while the old release board still reads READY.

### Opening implementation state

One card shows all five sentences over normal spawn; one Continue reveals the four bars and Mission 1 icon. No percentage repeats the HUD. Movement stays under player control; the sample cart establishes the first meaningful route.

# 2. Campaign metrics, timer, and recovery economy

| Bar | Start | Meaning | Zero and final lock |
|---|---|---|---|
| Release Evidence | 45 | Verified coverage of the stock and movement evidence. | 0 restores mission-start snapshot; locks at 100 only after final evidence and allocation gate. |
| Receiving Habitat | 45 | Prepared habitat conditions required by the contained pilot. | 0 restores mission-start snapshot; locks at 100 only after final evidence and allocation gate. |
| Care Supplies | 90 | Remaining care and sampling supply margin. | 0 restores mission-start snapshot; locks at 100 only after final evidence and allocation gate. |
| Island Health | 60 | Capacity to retain healthy island stock and habitat. | 0 restores mission-start snapshot; locks at 100 only after final evidence and allocation gate. |

Every bar is bounded 0–100; 100 remains vulnerable until final lock. Evidence rises after supported tests and falls when the failed night cycle revokes coverage; habitat rises when receiving conditions are prepared and falls when the cycle fails; supplies fall after named sampling and care work and rise through RP resupply; island health rises with safer handling and falls when lamp-timing disruption or failed pilot care consumes margin. RP allocation records a supply shipment, staff support or follow-up care task in the log rather than creating biological proof. Scientific flags can only be earned by the graded evidence.

`RP = clamp(4,12,11 + time_modifier − incorrect_submissions)`. Time modifier = +1 for elapsed ≤ target, 0 for target < elapsed ≤ 1.25×target, −2 above 1.25×target. One committed wrong answer subtracts one point; exploration is free. One RP raises one unlocked bar by one point; bank cap 30. All targets are 12:00, so the second boundary is 15:00. Timer starts when the arrival bubble closes and the first stop activates.

Post-mission order: outcome → named automatic deltas → zero check → time/accuracy → RP award → allocation or bank → earned lock → quick review → next briefing. Snapshot contains bars, bank, mission flags, samples, fixtures and unlocks; restart restores all of them and clears current-attempt elapsed time and wrong count. Completed previous missions remain. A long/wrong-first route still earns 4 RP minimum. The zero test is an injected 1-point supply start with a 2-point sample cost: it reaches 0 before reward, displays CARE SUPPLIES EXHAUSTED and restores that mission’s unmodified saved start; runtime exercise remains pending.

## 2.1 Automatic delta and canonical non-perfect recovery path

The reference route earns only 4 RP every day, allocates to the lowest bar (ties in table order), and still reaches all four at 100. Higher awards cannot reduce feasibility; surplus is banked to 30. All decreases have visible event labels, including sampling costs each day.

| M | Named event | Auto E/H/C/I | 4-RP allocation | After allocation | Bank |
|---|---|---|---|---|---|
| 1 | The incomplete feed is withdrawn and replacement nutrients reach the nursery. Sampling and care consume the shown supplies. | [5, 0, -1, 4] | [0, 4, 0, 0] | [50, 49, 89, 64] | 0 |
| 2 | The damaging rinse is stopped and matched rinse is issued. Sampling and care consume the shown supplies. | [2, 2, -1, 5] | [2, 2, 0, 0] | [54, 53, 88, 69] | 0 |
| 3 | Ventilated pot lids are fitted after the sealed-pot test. Sampling and care consume the shown supplies. | [3, 3, -2, 4] | [2, 2, 0, 0] | [59, 58, 86, 73] | 0 |
| 4 | A limited lamp trial replaces the proposed full nursery reset. Sampling and care consume the shown supplies. | [4, 2, -1, 2] | [1, 3, 0, 0] | [64, 63, 85, 75] | 0 |
| 5 | The wider lamp reset is halted and staggered flower trays are retained. Sampling and care consume the shown supplies. | [4, 1, -2, -3] | [0, 4, 0, 0] | [68, 68, 83, 72] | 0 |
| 6 | The unusual tissue line is separated and the healthy lines stay in care. Sampling and care consume the shown supplies. | [3, 2, -1, 4] | [2, 2, 0, 0] | [73, 72, 82, 76] | 0 |
| 7 | A test cross is approved and family labels stay attached to every sample. Sampling and care consume the shown supplies. | [5, 2, -1, 2] | [0, 4, 0, 0] | [78, 78, 81, 78] | 0 |
| 8 | The enzyme lead is recorded and an environmental comparison is requested. Sampling and care consume the shown supplies. | [3, 3, -1, 2] | [1, 1, 1, 1] | [82, 82, 81, 81] | 0 |
| 9 | Appearance-only labels are removed and ancestry labels remain. Sampling and care consume the shown supplies. | [4, 3, -1, 2] | [0, 0, 4, 0] | [86, 85, 84, 83] | 0 |
| 10 | The insect change is recorded as population-level selection under the measured conditions. Sampling and care consume the shown supplies. | [4, 4, -2, 3] | [0, 0, 4, 0] | [90, 89, 86, 86] | 0 |
| 11 | Several screened families replace the single-family shipment. Sampling and care consume the shown supplies. | [5, 4, -1, 2] | [0, 0, 4, 0] | [95, 93, 89, 88] | 0 |
| 12 | The contained pilot gains tested partners while untested field soil stays on the island. Sampling and care consume the shown supplies. | [4, 5, -2, 3] | [0, 0, 4, 0] | [99, 98, 91, 91] | 0 |
| 13 | Receiving plots are prepared and only the instrumented contained pilot proceeds. Sampling and care consume the shown supplies. | [4, 5, -2, 4] | [0, 0, 4, 0] | [100, 100, 93, 95] | 0 |
| 14 | Expansion is halted and the tested oxygen-supply correction is added to the final plan. Sampling and care consume the shown supplies. | [-4, -3, -2, -3] | [0, 0, 3, 1] | [96, 97, 94, 93] | 0 |
| 15 | The corrected pilot is approved and the first covered sample cart reaches the waiting ship. Sampling and care consume the shown supplies. | [8, 8, 4, 8] | [0, 0, 2, 0] | [100, 100, 100, 100] | 2 |

# 3. Pellow Head Island — areas and fixtures

## CLINIC — Field Clinic

**Coordinates:** (-18, 34); **footprint:** 13 × 9 × 3.8 m. **Area owner:** Mara Vale, veterinary biologist.

| ID | Fixture | Build | Wall | Exact caption |
|---|---|---|---|---|
| sample-bench | Sample Bench | bench | back | Sealed samples wait beside a microscope. |
| care-board | Care Board | board | left | A wipe-clean board records each animal or plant under care. |
| culture-rack | Culture Rack | rack | right | Closed cultures sit in labeled trays. |

## GROW — Growth Hall

**Coordinates:** (16, 8); **footprint:** 18 × 12 × 5.4 m. **Area owner:** Ivo Reed, plant physiologist.

| ID | Fixture | Build | Wall | Exact caption |
|---|---|---|---|---|
| growth-bench | Growth Bench | bench | back | Potted dune plants sit beneath timed lamps. |
| light-panel | Light Panel | rack | left | The lamp controls stand beside a printed flowering calendar. |
| pond-tanks | Pond Tanks | vessel | right | Clear tanks hold small aquatic communities. |

## SEED — Seed Room

**Coordinates:** (-28, 8); **footprint:** 14 × 10 × 4.2 m. **Area owner:** Nell Shah, conservation geneticist.

| ID | Fixture | Build | Wall | Exact caption |
|---|---|---|---|---|
| seed-table | Seed Table | bench | back | Seed packets lie beside their family records. |
| family-board | Family Board | board | left | Parent and offspring records hang on a cork board. |
| storage-rack | Storage Rack | rack | right | Sealed jars preserve separate seed families. |

## PLAN — Field Planning Room

**Coordinates:** (24, -18); **footprint:** 12 × 9 × 4 m. **Area owner:** Ada Penn, preserve director.

| ID | Fixture | Build | Wall | Exact caption |
|---|---|---|---|---|
| release-board | Release Board | board | back | A map holds the proposed mainland planting sites. |
| survey-table | Survey Table | bench | right | Field notebooks lie open beside a scale map. |
| sample-cart | Sample Cart | rack | left | A wheeled rack carries sealed samples between rooms. |

## GENE — Genetics Trailer

**Coordinates:** (-22, -18); **footprint:** 10 × 4.5 × 3.2 m. **Area owner:** Nell Shah, conservation geneticist.

| ID | Fixture | Build | Wall | Exact caption |
|---|---|---|---|---|
| dna-bench | DNA Bench | bench | left | Sample tubes stand beside a printed sequence reader. |
| gel-rig | Gel Rig | vessel | right | A covered gel tray separates labeled DNA fragments. |
| records-board | Records Board | board | back | Sample histories link each test to its original organism. |

## MARSH — Marsh Research Bay

**Coordinates:** (-70, -196); **footprint:** 9 × 8 × 3.6 m. **Area owner:** Tess Rowan, field ecologist.

| ID | Fixture | Build | Wall | Exact caption |
|---|---|---|---|---|
| water-rack | Water Rack | rack | left | Water bottles hold samples from the shore pools. |
| field-bench | Field Bench | bench | back | Plant trays and insect counts fill a weathered workbench. |
| habitat-board | Habitat Board | board | right | A habitat map records flowers and feeding links. |

## Landmark-only spaces

- The former beach manhole at (4,−120) becomes the Shore Sampling Hatch with a sealed water intake, and no graded stop is attached to it.
- The Generator House at (26,34), 12 × 9 × 4.4 m, remains support infrastructure with a quiet running set and no electricity lesson.
- The Ship’s Store at (−44,52), 14 × 9 × 4.6 m, holds the covered release cart and the final loading gate, with no extra graded stop.
- The station board at (10,54) becomes the Field Notice Board with tide, nesting and visiting hours.
- Dune grass bends beside a fenced nesting patch, and text signs report the nesting state without requiring bird animation.
- Wrack along the beach shelters small decomposers, and dated survey labels retain their changing counts.

Alive-world states: M1 a bird feeds beside the sample cart; M3 pond tanks carry visible DAY and NIGHT readings; M5 flowers near the nursery have few visitors while the dune trays remain visited; M6 a held tissue tray stays behind a labeled barrier; M9 the same seed families display different leaf forms in adjacent pots; M10 dated insect emergence strips remain inspectable; M12 partner jars gain specific test labels; M14 the dawn pond panel reads LOW OXYGEN and the ship appears offshore; M15 the island reserve remains visibly stocked after the cart leaves. Every essential change also has text and log entries.

# 4. Canonical roster

### Ada Penn

- **Role:** preserve director. **Pronouns:** she/her. **Allowed short name:** Ada. **Area ownership:** PLAN.
- **First entrance:** Stops the pale-seedling cart before loading.
- **Wants:** Give the mainland a justified chance to recover.
- **Blind spot:** A complete manifest can look more certain than its evidence.
- **Scientific domain and decision function:** preserve director; owns evidence and actions in PLAN, including the local final CHOICE.
- **Verbal habit:** “What does this result let us do?”
- **Arc:** Moves from whole-manifest certification to a staged permit-limited pilot.
- **Relationship state:** early greeting “I need the whole list.”; after M5 for Ivo/Tess, M8 for Mara/Nell and M14 for Ada, “I need the limits beside each name.”
- **Gameplay necessity:** Removing this person removes the preserve director viewpoint and its owned evidence or authorization.

### Mara Vale

- **Role:** veterinary biologist. **Pronouns:** she/her. **Allowed short name:** Mara. **Area ownership:** CLINIC.
- **First entrance:** Checks root viability instead of accepting swelling as a diagnosis.
- **Wants:** Keep each organism healthy through handling.
- **Blind spot:** Can focus on individual health before community needs.
- **Scientific domain and decision function:** veterinary biologist; owns evidence and actions in CLINIC, including the local final CHOICE.
- **Verbal habit:** “Which comparison stayed healthy?”
- **Arc:** Accepts that a healthy organism can still lack a needed partner.
- **Relationship state:** early greeting “Let me see the control.”; after M5 for Ivo/Tess, M8 for Mara/Nell and M14 for Ada, “Keep the healthy line and its partner evidence together.”
- **Gameplay necessity:** Removing this person removes the veterinary biologist viewpoint and its owned evidence or authorization.

### Ivo Reed

- **Role:** plant physiologist. **Pronouns:** he/him. **Allowed short name:** Ivo. **Area ownership:** GROW.
- **First entrance:** Keeps the oxygen-supply trial running through the dark interval.
- **Wants:** Restore vigorous nursery growth.
- **Blind spot:** Initially sees recovered leaves as evidence the old settings work broadly.
- **Scientific domain and decision function:** plant physiologist; owns evidence and actions in GROW, including the local final CHOICE.
- **Verbal habit:** “What changed in the matched tray?”
- **Arc:** Limits the reset after flowering and visitor evidence.
- **Relationship state:** early greeting “These leaves are finally growing.”; after M5 for Ivo/Tess, M8 for Mara/Nell and M14 for Ada, “Check who can still use the flowers.”
- **Gameplay necessity:** Removing this person removes the plant physiologist viewpoint and its owned evidence or authorization.

### Nell Shah

- **Role:** conservation geneticist. **Pronouns:** she/her. **Allowed short name:** Nell. **Area ownership:** SEED, GENE.
- **First entrance:** Labels every parent sample before anyone pools seed.
- **Wants:** Preserve variation and traceable families.
- **Blind spot:** Can overvalue a sequence lead before organismal evidence.
- **Scientific domain and decision function:** conservation geneticist; owns evidence and actions in SEED, GENE, including the local final CHOICE.
- **Verbal habit:** “Can we still trace that family?”
- **Arc:** Keeps causal claims narrower than the sequence story.
- **Relationship state:** early greeting “Do not lose the family label.”; after M5 for Ivo/Tess, M8 for Mara/Nell and M14 for Ada, “Keep the label and the conditions.”
- **Gameplay necessity:** Removing this person removes the conservation geneticist viewpoint and its owned evidence or authorization.

### Tess Rowan

- **Role:** field ecologist. **Pronouns:** she/her. **Allowed short name:** Tess. **Area ownership:** MARSH.
- **First entrance:** Closes a dune path around a nesting patch while preserving the sample route.
- **Wants:** Protect working habitats and relationships.
- **Blind spot:** Can assume island dependencies transfer with the organisms.
- **Scientific domain and decision function:** field ecologist; owns evidence and actions in MARSH, including the local final CHOICE.
- **Verbal habit:** “What else depends on that?”
- **Arc:** Requires receiving-site tests instead of copying the island wholesale.
- **Relationship state:** early greeting “The field record has a longer day.”; after M5 for Ivo/Tess, M8 for Mara/Nell and M14 for Ada, “The mainland needs its own evidence.”
- **Gameplay necessity:** Removing this person removes the field ecologist viewpoint and its owned evidence or authorization.

# 5. Authoritative numbered concept spine

| # | Concept | Sheet unit | Primary graded encounters |
|---|---|---|---|
| 1 | Water and carbon chemistry | 1 | Primer and worked examples; detailed mapping below |
| 2 | Macromolecules and hydrolysis | 1 | 1, 2, 4 |
| 3 | Protein structure and enzymes | 1 | 13, 31 |
| 4 | Cells, organelles and endosymbiosis | 2 | 5 |
| 5 | Membranes and transport | 2 | 7, 8 |
| 6 | Water potential and surface-area exchange | 2 | 6 |
| 7 | ATP and energy coupling | 3 | Primer and worked examples; detailed mapping below |
| 8 | Photosynthesis and carbon fixation | 3 | 10, 17 |
| 9 | Respiration and chemiosmosis | 3 | 9, 11, 12, 53, 54, 59 |
| 10 | Fermentation | 3 | Primer and worked examples; detailed mapping below |
| 11 | Signals and feedback | 4 | 14, 16, 23 |
| 12 | Cell cycle and checkpoints | 4 | 21, 22, 24 |
| 13 | Meiosis and variation | 5 | 25 |
| 14 | Mendelian probability | 5 | 26, 28 |
| 15 | Non-Mendelian inheritance | 5 | 27 |
| 16 | Linkage and chi-square evidence | 5 | 34 |
| 17 | DNA replication | 6 | 35 |
| 18 | Transcription and translation | 6 | 29 |
| 19 | Regulation and differentiation | 6 | 15, 33, 36 |
| 20 | Mutations and biotechnology | 6 | 30, 32 |
| 21 | Viruses and host cells | 6 | 47 |
| 22 | Natural selection and fitness | 7 | 37, 38, 39, 40 |
| 23 | Drift and gene flow | 7 | 42, 44 |
| 24 | Hardy-Weinberg models | 7 | 41, 43 |
| 25 | Speciation and phylogeny | 7 | Primer and worked examples; detailed mapping below |
| 26 | Population growth and carrying capacity | 8 | 50 |
| 27 | Species interactions and niches | 8 | 18, 19, 20, 45, 48 |
| 28 | Energy flow and trophic levels | 8 | 46 |
| 29 | Matter cycles and disturbance | 8 | 49, 51, 52, 58 |
| 30 | Experimental inference and sampling | cross-unit scientific practice | 3, 55, 56, 57, 60 |

## 5.1 Keystone set and utility

| Key | Keystone | What it enables | Misconception |
|---|---|---|---|
| structure | Structure and function | Predict molecular or cell function from form | Same fuel means all building materials |
| exchange | Selective exchange | Separate transport amount, direction and conditions | More water is always healthier |
| energy | Energy coupling | Track energy supply and usable cellular work | Food alone supplies every need |
| information | Information flow | Connect DNA, RNA, protein and tested traits | A sequence association proves every cause |
| regulation | Regulation and feedback | Distinguish changed control from changed material | A changed trait requires changed DNA |
| inheritance | Inheritance and variation | Preserve ancestry and predict offspring | Visible appearance reveals all alleles |
| population | Population change | Distinguish selection, drift and model expectations | Individuals evolve because they need to |
| interactions | Species interactions | Identify dependence and indirect consequences | Healthy individuals guarantee a working community |
| evidence | Experimental evidence | Choose claims that fit controls and scope | A local pass proves every future condition |
| matter | Matter conservation | Account for elements through organisms and habitat | Nutrients and energy both cycle identically |

## 5.2 Dependency graph

1–3 → 4–6 → 7–10; 3–4 → 11–12; 4 and introductory DNA/allele primer → 13–16; 13 plus DNA primer → 17–20; 4 and 17–18 → 21; 13–16 plus explicit population primer → 22–25; 7–10 and 22–23 → 26–29; 30 is introduced through the matched-feed comparison and recurs throughout. Within each mission, the primer provides the definitions required for the first new concept; the four stops then create the evidence chain. Major ideas needed in M15 are all established by M14.

## 5.3 Concept encounter matrix

| Concept | Encounters |
|---|---|
| 1 | See §5.5 supporting sheet coverage |
| 2 | M1 S1 INTRODUCE; M1 S2 INTRODUCE; M1 S4 COMBINE |
| 3 | M4 S13 INTRODUCE; M8 S31 RETRIEVE |
| 4 | M2 S5 INTRODUCE |
| 5 | M2 S7 INTRODUCE; M2 S8 COMBINE |
| 6 | M2 S6 INTRODUCE |
| 7 | See §5.5 supporting sheet coverage |
| 8 | M3 S10 INTRODUCE; M5 S17 RETRIEVE |
| 9 | M3 S9 INTRODUCE; M3 S11 INTRODUCE; M3 S12 COMBINE; M14 S53 RETRIEVE; M14 S54 PRACTICE; M15 S59 TRANSFER |
| 10 | See §5.5 supporting sheet coverage |
| 11 | M4 S14 INTRODUCE; M4 S16 COMBINE; M6 S23 PRACTICE |
| 12 | M6 S21 PRACTICE; M6 S22 PRACTICE; M6 S24 COMBINE |
| 13 | M7 S25 PRACTICE |
| 14 | M7 S26 PRACTICE; M7 S28 COMBINE |
| 15 | M7 S27 PRACTICE |
| 16 | M9 S34 PRACTICE |
| 17 | M9 S35 PRACTICE |
| 18 | M8 S29 PRACTICE |
| 19 | M4 S15 INTRODUCE; M9 S33 RETRIEVE; M9 S36 COMBINE |
| 20 | M8 S30 PRACTICE; M8 S32 COMBINE |
| 21 | M12 S47 PRACTICE |
| 22 | M10 S37 PRACTICE; M10 S38 PRACTICE; M10 S39 PRACTICE; M10 S40 COMBINE |
| 23 | M11 S42 PRACTICE; M11 S44 COMBINE |
| 24 | M11 S41 INTRODUCE; M11 S43 PRACTICE |
| 25 | See §5.5 supporting sheet coverage |
| 26 | M13 S50 RETRIEVE |
| 27 | M5 S18 PRACTICE; M5 S19 PRACTICE; M5 S20 COMBINE; M12 S45 RETRIEVE; M12 S48 COMBINE |
| 28 | M12 S46 PRACTICE |
| 29 | M13 S49 RETRIEVE; M13 S51 RETRIEVE; M13 S52 COMBINE; M15 S58 TRANSFER |
| 30 | M1 S3 INTRODUCE; M14 S55 RETRIEVE; M14 S56 COMBINE; M15 S57 TRANSFER; M15 S60 TRANSFER |

## 5.4 Keystone recurrence matrix

| Keystone | Separated missions | Delayed RETRIEVE | COMBINE or TRANSFER payoff |
|---|---|---|---|
| Structure and function | [1, 2, 3, 4, 8, 15] | 31 | 4, 8, 32, 60 |
| Selective exchange | [2, 3, 13, 14, 15] | 51, 53 | 8, 12, 52, 56, 59, 60 |
| Energy coupling | [3, 5, 12, 13, 14, 15] | 17, 51, 53, 55 | 12, 56, 59, 60 |
| Information flow | [4, 6, 7, 8, 9, 12, 15] | 31, 33 | 32, 36, 60 |
| Regulation and feedback | [4, 5, 6, 9, 15] | 33 | 16, 20, 24, 36, 57, 60 |
| Inheritance and variation | [7, 9, 10, 11, 15] | 33 | 28, 36, 40, 44, 57, 60 |
| Population change | [10, 11, 13, 15] | 50 | 40, 44, 52, 58, 60 |
| Species interactions | [5, 12, 13, 14, 15] | 45, 49, 55 | 20, 48, 52, 56, 58, 60 |
| Experimental evidence | [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15] | 31, 55 | 4, 12, 16, 20, 24, 28, 32, 40, 44, 48, 56, 57, 59, 60 |
| Matter conservation | [1, 3, 5, 12, 13, 15] | 17, 45, 49, 50, 51 | 4, 48, 52, 58, 60 |

## 5.5 Complete sheet coverage and deliberate scope

| Sheet area | Authored coverage | Boundary |
|---|---|---|
| Water/carbon/macromolecules | M1 primer and G include polarity, hydrogen bonding, cohesion, adhesion, surface tension, heat capacity, ice density, CHONSP, hydrolysis, lipids and protein levels; S1–4 grade material requirements | Qualitative Gibbs signs only; no formal Gibbs calculations. |
| Cells | M2 S5–8 and examples cover cell types, organelle evidence, membranes, passive and active transport, tonicity and SA:V | Cell-type shortcuts are qualified; full organelle map in G2. |
| Energetics | M3 S9–12, M5 S17 and M12/M14/M15 retrieve photosynthesis, respiration, ATP, carbon and oxygen; G3 and examples cover fermentation and yields | No enzyme-name memorization or universal fixed ATP yield. |
| Signals/cycle | M4 S13–16 and M6 S21–24; examples and G4/G6 include communication distances, feedback, stages, checkpoints and apoptosis | Unusual tissue is not assigned a specific cancer diagnosis without evidence. |
| Heredity | M7 S25–28, M9 S33–36, M11 S41–44; G7/G9 and examples include crosses, sex linkage, nondisjunction, chi-square, linkage and non-Mendelian traits | Chi-square critical values are explicitly supplied when used; pedigree shortcuts depend on assumptions. |
| Expression | M8 S29–32, M9 S33–36, M12 S47; G8 includes processing, operons, transcription factors, epigenetics, PCR, gels and CRISPR | No gene-editing intervention performed in the release stock. |
| Evolution | M10 S37–40 and M11 S41–44; G10/G11 cover evidence, fitness, selection, drift, gene flow, H-W, speciation and phylogeny | Insect change spans 40 generations; no rapid adaptive evolution claimed for long-lived birds. |
| Ecology | M5, M12–15; G12/G13 include growth models, life-history tendencies, interactions, food webs, cycles and disturbance | Ten-percent model approximate; habitat-dependent conclusions remain conditional. |

Coverage distinguishes primary graded encounters from primer/help coverage; the bible is a substantial campaign, not a claim that every sheet bullet has its own graded stop. Thirty numbered concepts provide the single assignment system; brief facts remain attached to their relevant concept rather than inventing redundant stop IDs.

# 6. Dramatic spine and clue ledger

## 6.1 Major turns

M5: restoring nursery growth also moves flowering away from present visitors. M10–12: the changed island is a living population and network, not a failed copy of the old inventory; healthy stock alone cannot recreate it. M14: the prepared pilot passes by day and fails by dawn, forcing a corrected monitored release rather than broad certification.

## 6.2 Clue ledger
| Plant | Objective observation | First meaning | True meaning | Reinforce | Payoff | Concept |
|---|---|---|---|---|---|---|
| M1 | Old feed has energy but little nitrogen | Old stock may be poor | Old instructions omit current requirements | M2 handling mismatch | M12 manifest misses partners | matter |
| M3 | Day oxygen increases in planted pots | Pots look ready | Night must be measured separately | M5 healthy leaves miss visitors | M14 dawn failure | energy |
| M4 | Old lamps increase RNA/protein and growth | Old program works | Local response can disrupt external timing | M5 calendars and tray counts | M5 halt reset | regulation/interactions |
| M6 | One tissue line ignores signal removal | All relatives may be bad | Hold the line; ancestry is not a diagnosis | M7 segregation and M8 narrow sequence claim | M11 family preservation | inheritance/evidence |
| M7 | Family labels preserve hidden variation | Labels are storage detail | Founding choices can lose alleles | M9 leaf plasticity and marker linkage | M11 diverse reserve | population |
| M5 | Unchanged flowers retain visitors | Field is background | Partners and timing are release requirements | M10 generations; M12 isolate test | M15 living manifest | interactions |

## 6.3 Mission science / mystery / stakes movement
| M | Science gained | Mystery changed | Stakes/action |
|---|---|---|---|
| 1 | Read the feed ingredients, Count the missing nitrogen | Replace the feed with a complete nutrient mix. | The young plants may die before planting. |
| 2 | Identify the damaged cells, Compare exchange surfaces | Use the rinse that matches the root cells. | More roots could be damaged during packing. |
| 3 | Follow oxygen-supported ATP production, Calculate the daylight balance | Keep the pots supplied with oxygen. | The packed seedlings may fail before arrival. |
| 4 | Separate enzyme problems, Follow the light response | Keep the old lamp program in a small trial. | A rushed change could damage the whole nursery. |
| 5 | Read what healthy leaves prove, Find the shared flowering days | Stop the wider reset and keep a mixed flowering schedule. | Seed production could fall despite healthy leaves. |
| 6 | Place the cell-cycle evidence, Compare dividing fractions | Hold the unusual tissue tray for further tests. | Unexplained growth could enter release stock. |
| 7 | Follow an allele into a gamete, Predict the test family | Use a test cross and keep each family separate. | A poor breeding choice could lose useful variation. |
| 8 | Trace the enzyme message, Read the altered codons | Treat the changed enzyme as a supported lead, not a complete diagnosis. | The wrong diagnosis could remove a healthy family. |
| 9 | Separate appearance from ancestry, Check the family marker distance | Keep ancestry records and test leaf shape under matched conditions. | A misleading label could remove useful seed families. |
| 10 | Read the population histories, Compare offspring contributions | Record population selection and protect the surviving variation. | A false explanation could guide the wrong release stock. |
| 11 | Count the retained allele, Separate population explanations | Take several tested families and keep a reserve. | The new population could start with too little variation. |
| 12 | Name the observed links, Budget the food web | Prepare the tested plant-partner combination in containment. | A healthy shipment could fail after planting. |
| 13 | Follow nitrogen to a leaf, Check room for growth | Prepare the receiving soil and water before planting. | The new plants could starve in suitable-looking ground. |
| 14 | Project the dark interval, Read the complete cycle | Hold expansion until the night oxygen problem is corrected. | A daytime pass could hide a night-time failure. |
| 15 | Carry forward the tested constraints, Keep the habitat links intact | Authorize only the corrected monitored pilot, with a pause and return path. | An unchecked move could lose both the stock and its habitat. |

## 6.4 Smaller reversals and cadence

M2: the helpful-looking rinse causes measured injury in the tested line. M3: food does not prevent an oxygen deficit. M6: rapid tissue growth becomes a reason to hold one line. M8: a sequence lead is useful but does not prove the whole phenotype. M11: the largest family does not preserve the most variation. M13: suitable-looking ground lacks accessible resources. Each changes a concrete handling decision before another two missions pass.

# 7. Mission route overview

| M | Title | Places / stop distribution | Final answer |
|---|---|---|---|
| 1 | THE FOOD THAT IS NOT ENOUGH | Field Clinic; 1:CLINIC, 2:CLINIC, 3:CLINIC, 4:CLINIC | Replace the feed with a complete nutrient mix. |
| 2 | THE RINSE THAT HURTS | Field Clinic; 5:CLINIC, 6:CLINIC, 7:CLINIC, 8:CLINIC | Use the rinse that matches the root cells. |
| 3 | THE POND AFTER DARK | Growth Hall; 9:GROW, 10:GROW, 11:GROW, 12:GROW | Keep the pots supplied with oxygen. |
| 4 | THE WRONG KIND OF RECOVERY | Growth Hall; 13:GROW, 14:GROW, 15:GROW, 16:GROW | Keep the old lamp program in a small trial. |
| 5 | FLOWERS WITH NO VISITORS | Growth Hall → Marsh Research Bay; 17:GROW, 18:GROW, 19:MARSH, 20:MARSH | Stop the wider reset and keep a mixed flowering schedule. |
| 6 | THE TRAY THAT WILL NOT STOP | Field Clinic → Genetics Trailer; 21:CLINIC, 22:CLINIC, 23:GENE, 24:GENE | Hold the unusual tissue tray for further tests. |
| 7 | THE FAMILY IN THE JAR | Seed Room → Genetics Trailer; 25:SEED, 26:SEED, 27:GENE, 28:GENE | Use a test cross and keep each family separate. |
| 8 | ONE LETTER IN THE RECIPE | Genetics Trailer → Field Clinic; 29:GENE, 30:GENE, 31:CLINIC, 32:CLINIC | Treat the changed enzyme as a supported lead, not a complete diagnosis. |
| 9 | THE SAME SEED IN TWO ROOMS | Growth Hall → Seed Room; 33:GROW, 34:GROW, 35:SEED, 36:SEED | Keep ancestry records and test leaf shape under matched conditions. |
| 10 | THE INSECTS THAT STAYED | Marsh Research Bay → Field Planning Room; 37:MARSH, 38:MARSH, 39:PLAN, 40:PLAN | Record population selection and protect the surviving variation. |
| 11 | THE SEEDS LEFT OUT | Seed Room → Genetics Trailer → Field Planning Room; 41:SEED, 42:SEED, 43:GENE, 44:PLAN | Take several tested families and keep a reserve. |
| 12 | THE SMALL THINGS ON THE LIST | Marsh Research Bay → Field Clinic → Field Planning Room; 45:MARSH, 46:MARSH, 47:CLINIC, 48:PLAN | Prepare the tested plant-partner combination in containment. |
| 13 | THE SOIL ON THE OTHER SHORE | Marsh Research Bay → Growth Hall → Field Planning Room; 49:MARSH, 50:MARSH, 51:GROW, 52:PLAN | Prepare the receiving soil and water before planting. |
| 14 | GREEN UNTIL MORNING | Growth Hall → Marsh Research Bay → Field Planning Room; 53:GROW, 54:GROW, 55:MARSH, 56:PLAN | Hold expansion until the night oxygen problem is corrected. |
| 15 | WHAT GOES HOME | Seed Room → Marsh Research Bay → Field Planning Room; 57:SEED, 58:SEED, 59:MARSH, 60:PLAN | Authorize only the corrected monitored pilot, with a pause and return path. |

## 7.1 Persistent world-state ledger

| M | State retained | Next visible problem |
|---|---|---|
| 1 | The incomplete feed is withdrawn and replacement nutrients reach the nursery. | Root cells swell after a fresh-water rinse. |
| 2 | The damaging rinse is stopped and matched rinse is issued. | Healthy roots still lose energy in sealed pots. |
| 3 | Ventilated pot lids are fitted after the sealed-pot test. | The restored plants flower at an unexpected time. |
| 4 | A limited lamp trial replaces the proposed full nursery reset. | A flowering calendar no longer matches the insect log. |
| 5 | The wider lamp reset is halted and staggered flower trays are retained. | One rapidly growing tissue tray has unusual division counts. |
| 6 | The unusual tissue line is separated and the healthy lines stay in care. | The held tray came from a small set of related parents. |
| 7 | A test cross is approved and family labels stay attached to every sample. | The family trait leads to a changed enzyme sequence. |
| 8 | The enzyme lead is recorded and an environmental comparison is requested. | Similar-looking plants respond differently in the same growth room. |
| 9 | Appearance-only labels are removed and ancestry labels remain. | A short-lived insect population has changed across many generations. |
| 10 | The insect change is recorded as population-level selection under the measured conditions. | A small source group may already have lost rare alleles. |
| 11 | Several screened families replace the single-family shipment. | The chosen plants still depend on partners missing from the manifest. |
| 12 | The contained pilot gains tested partners while untested field soil stays on the island. | The receiving soil may not cycle nutrients like island soil. |
| 13 | Receiving plots are prepared and only the instrumented contained pilot proceeds. | A daytime pilot succeeds while its night record is still missing. |
| 14 | Expansion is halted and the tested oxygen-supply correction is added to the final plan. | The final plan must keep a pause and return path. |
| 15 | The corrected pilot is approved and the first covered sample cart reaches the waiting ship. | The island keeps a reserve while the mainland pilot begins. |

# Mission 1 — THE FOOD THAT IS NOT ENOUGH

## A. Mission briefing card — exact player copy

**Header:** DAY 1 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE FOOD THAT IS NOT ENOUGH

**Go now:** Go to Field Clinic and meet Mara Vale, veterinary biologist, at the Sample Bench.

**Card body:** The ship has been booked, but the first seedling trays have pale new leaves. Plants need small amounts of several elements as well as a source of energy. Compare feed labels and test the stored mix at the Sample Bench. By the end of the mission, decide whether to replace the failing seedling feed.

**Objective:** Resolve whether to replace the failing seedling feed; the young plants may die before planting.

### Worth knowing first — exact player copy

#### Glossary terms

- Element: A substance made of one kind of atom.
- Monomer: A small building unit that can join others.
- Protein: A chain of amino acids folded into a working shape.
- Enzyme: A protein or RNA catalyst that speeds a reaction without being consumed.
- Control: A comparison treated the same way except for the tested factor.
- Atom: A small unit of an element.
- Molecule: Two or more atoms bonded together.
- Amino acid: A building unit of a protein.
- Nucleotide: A building unit of DNA or RNA.
- DNA: A molecule that stores inherited sequence information.
- RNA: A molecule used in gene expression and other cell functions.
- Phospholipid: A lipid with a water-attracting head and water-avoiding tails.
- Lipid: A mostly water-insoluble molecule used in membranes or energy storage.
- Nitrate: A nitrogen-containing ion that some organisms use as a nitrogen source.
- Phosphate: A phosphorus-containing ion used in many biological molecules.
- Carbon skeleton: The connected carbon atoms forming the framework of an organic molecule.
- Hydrolysis: Breaking a chemical link by adding water.

#### Primer concepts

- Carbon forms four bonds and can build diverse molecules.
- Calories alone do not provide all the elements needed to build new cells.
- Evidence from matched treatments can separate a nutrient shortage from a broken assay.

#### Equations first needed today

**Equation:** deficit = requirement − supply

**What it is for:** Find the missing daily amount.

**Symbols:** deficit, requirement and supply are nitrogen masses per day.

**Why this campaign needs it:** Size the nutrient replacement test.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. A carbohydrate chain has 8 sugar units; joining them needs 7 links and releases 7 water molecules.

2. A protein has 12 amino acids; hydrolysis of all 11 peptide links consumes 11 water molecules.

3. An oil contains glycerol and fatty acids; these are not a repeating monomer chain, so oil is not a true polymer.

4. An enzyme works at neutral pH but loses activity at extreme pH; altered charges disrupt folding, so substrate binding can fail.

5. Two leaves have equal sugar but only one has nitrogen; nitrogen is needed in amino acids, so equal sugar does not guarantee equal protein production.

**Authoring-only failure consequence:** The young plants may die before planting.

**Authoring-only later travel:** All work remains in this room.

## B. Main story happening — designer summary

The ship has been booked, but the first seedling trays have pale new leaves. The four-stop chain establishes read the feed ingredients, uses it to count the missing nitrogen, then check the stored mix supplies the discriminating evidence for change the nursery feed. The incomplete feed is withdrawn and replacement nutrients reach the nursery. Root cells swell after a fresh-water rinse. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether to replace the failing seedling feed. Actual final answer: Replace the feed with a complete nutrient mix. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M1-B1 — On arrival at Field Clinic

**Location:** Field Clinic.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The ship has been booked, but the first seedling trays have pale new leaves.

**Dialogue bubble — Mara Vale, veterinary biologist:** “The feed label must explain what the seedlings can build.”

**Unlocks:** Stop 1.

### Beat M1-B2 — After Stops 1 and 2

**Location:** Field Clinic.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Read the feed ingredients and Count the missing nitrogen with their accepted results.

**Panel/HUD text:** “The clinic needs a controlled test before changing feed.”

**Unlocks:** Stop 3 at Field Clinic.

### Beat M1-B4 — After Stop 4

**Location:** Field Clinic.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The incomplete feed is withdrawn and replacement nutrients reach the nursery.

**Panel/HUD text:** “Replace the feed with a complete nutrient mix.”

**Unlocks:** The ungraded aftermath.

### Beat M1-BE — At mission end

**Location:** Field Clinic.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The incomplete feed is withdrawn and replacement nutrients reach the nursery. Root cells swell after a fresh-water rinse.

**Dialogue bubble — Mara Vale, veterinary biologist:** “Root cells swell after a fresh-water rinse.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**1 locations:** Field Clinic.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 1 | Field Clinic | sample-bench | The feed label must explain what the seedlings can build. |
| 2 | Field Clinic | sample-bench | The replacement test needs the missing nitrogen amount. |
| 3 | Field Clinic | culture-rack | The clinic needs a controlled test before changing feed. |
| 4 | Field Clinic | care-board | The nursery is waiting for the feed decision. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Mara Vale, veterinary biologist, begins by owning the local evidence. The conflict is between the young plants may die before planting. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **2 — Macromolecules and hydrolysis:** The pale seedlings need materials as well as fuel.

- **2 — Macromolecules and hydrolysis:** The deficit is the daily requirement minus the nitrogen already supplied: 12 − 3 = 9 mg per day.

- **30 — Experimental inference and sampling:** Only the stored-feed tray lies outside its own expected range.

- **2 — Macromolecules and hydrolysis:** The feed lacks nitrogen even though it contains an energy source.

Water molecules are polar; hydrogen bonds support cohesion, adhesion and surface tension. High specific heat buffers temperature change, and the open hydrogen-bonded structure makes ordinary ice less dense than liquid water. Carbon forms four bonds; carbon, hydrogen, oxygen, nitrogen, sulfur and phosphorus occur in key biological molecules. Protein primary structure is amino-acid order, secondary structure includes hydrogen-bonded helices and sheets, tertiary structure is one chain’s overall fold and quaternary structure combines chains. Dehydration joins units while releasing water; hydrolysis consumes water to split links. Lipids are not true repeating-unit polymers.

## H1. Stop 1 — Read the feed ingredients

**Format/placement:** PROTOCOL, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 2 — Macromolecules and hydrolysis; Keystone: Structure and function, Matter conservation; Area: CLINIC; Prerequisites: Mission primer; no prior graded knowledge assumed.; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** whether to replace the failing seedling feed.

**Actual mission answer:** Replace the feed with a complete nutrient mix.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The ship has been booked, but the first seedling trays have pale new leaves." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Sugar fraction"}, {"id": "e2", "label": "Phosphate fraction"}, {"id": "e3", "label": "Nitrate fraction"}, {"id": "e4", "label": "Oil fraction"}], "choices": [{"id": "r4", "label": "Supplies fatty acids for storage and membranes"}, {"id": "r3", "label": "Supplies nitrogen for amino acids"}, {"id": "r2", "label": "Supplies phosphorus for nucleotides and phospholipids"}, {"id": "r1", "label": "Supplies carbon skeletons and chemical energy"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Sugar fraction supports Supplies carbon skeletons and chemical energy; Supplies fatty acids for storage and membranes describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Sugar fraction supports Supplies carbon skeletons and chemical energy; Supplies nitrogen for amino acids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Sugar fraction supports Supplies carbon skeletons and chemical energy; Supplies phosphorus for nucleotides and phospholipids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Phosphate fraction supports Supplies phosphorus for nucleotides and phospholipids; Supplies fatty acids for storage and membranes describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Phosphate fraction supports Supplies phosphorus for nucleotides and phospholipids; Supplies nitrogen for amino acids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Phosphate fraction supports Supplies phosphorus for nucleotides and phospholipids; Supplies carbon skeletons and chemical energy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Nitrate fraction supports Supplies nitrogen for amino acids; Supplies fatty acids for storage and membranes describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Nitrate fraction supports Supplies nitrogen for amino acids; Supplies phosphorus for nucleotides and phospholipids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Nitrate fraction supports Supplies nitrogen for amino acids; Supplies carbon skeletons and chemical energy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Oil fraction supports Supplies fatty acids for storage and membranes; Supplies nitrogen for amino acids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Oil fraction supports Supplies fatty acids for storage and membranes; Supplies phosphorus for nucleotides and phospholipids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Oil fraction supports Supplies fatty acids for storage and membranes; Supplies carbon skeletons and chemical energy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The pale seedlings need materials as well as fuel. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Swapping sugar and nitrate treats energy as a source of every atom." |
| why_wrong_occurs | "Swapping sugar and nitrate treats energy as a source of every atom." |
| story_consequence | "Read the feed ingredients is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The feed label must explain what the seedlings can build.

**Question card story setup — exact player copy:** The first shipment trays have pale new leaves, even though the feed label lists plenty of stored energy. The clinic needs the ingredients connected to what cells build before it can decide which shortage to test.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Sugar fraction
- id: e2
  label: Phosphate fraction
- id: e3
  label: Nitrate fraction
- id: e4
  label: Oil fraction
choices:
- id: r4
  label: Supplies fatty acids for storage and membranes
- id: r3
  label: Supplies nitrogen for amino acids
- id: r2
  label: Supplies phosphorus for nucleotides and phospholipids
- id: r1
  label: Supplies carbon skeletons and chemical energy
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Sugar fraction supports Supplies carbon skeletons and chemical energy; Supplies fatty acids for storage and membranes describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Sugar fraction supports Supplies carbon skeletons and chemical energy; Supplies nitrogen for amino acids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Sugar fraction supports Supplies carbon skeletons and chemical energy; Supplies phosphorus for nucleotides and phospholipids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Phosphate fraction supports Supplies phosphorus for nucleotides and phospholipids; Supplies fatty acids for storage and membranes describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Phosphate fraction supports Supplies phosphorus for nucleotides and phospholipids; Supplies nitrogen for amino acids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Phosphate fraction supports Supplies phosphorus for nucleotides and phospholipids; Supplies carbon skeletons and chemical energy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Nitrate fraction supports Supplies nitrogen for amino acids; Supplies fatty acids for storage and membranes describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Nitrate fraction supports Supplies nitrogen for amino acids; Supplies phosphorus for nucleotides and phospholipids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Nitrate fraction supports Supplies nitrogen for amino acids; Supplies carbon skeletons and chemical energy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Oil fraction supports Supplies fatty acids for storage and membranes; Supplies nitrogen for amino acids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Oil fraction supports Supplies fatty acids for storage and membranes; Supplies phosphorus for nucleotides and phospholipids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Oil fraction supports Supplies fatty acids for storage and membranes; Supplies carbon skeletons and chemical energy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The pale seedlings need materials as well as fuel. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The pale seedlings need materials as well as fuel. This result is now recorded for the next comparison.

**Why/mechanism:** The pale seedlings need materials as well as fuel. Sugar provides carbon skeletons, while nitrate supplies nitrogen and phosphate supplies phosphorus. Amino acids and nucleotides require those additional elements. Oil can store chemical energy but cannot replace missing nitrogen. Matching ingredients to what cells build makes the feed label useful evidence. It does not prove which ingredient is missing yet; the next comparison must test the actual stored mix against an appropriate complete-feed control.

**Mechanism links:** Structure and function, Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** Swapping sugar and nitrate treats energy as a source of every atom.

**Wrong-path feedback:**

- Swapping sugar and nitrate treats energy as a source of every atom.
- Swapping phosphate and oil confuses a required element with an entire storage molecule.
- Match the chemical contribution of each fraction before retrying.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Read the feed ingredients is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 2.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 3 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 1 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 2 — Count the missing nitrogen

**Format/placement:** BALLPARK, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 2 — Macromolecules and hydrolysis; Keystone: Matter conservation; Area: CLINIC; Prerequisites: Mission primer and Stop 1: Read the feed ingredients; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether to replace the failing seedling feed.

**Actual mission answer:** Replace the feed with a complete nutrient mix.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "A tray needs 12 mg nitrogen per day; the stored feed supplies 3 mg per day. Assume no other nitrogen input." |
| player_must_determine | "Use the number tiles to calculate the daily nitrogen deficit in mg per day; submit need minus supply." |
| correct_result | 9 |
| most_tempting_wrong_result | "15 adds supply to need instead of finding the shortfall." |
| why_wrong_occurs | "15 adds supply to need instead of finding the shortfall." |
| story_consequence | "Count the missing nitrogen is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The replacement test needs the missing nitrogen amount.

**Question card story setup — exact player copy:** The ingredient matches show that carbon-rich food cannot supply every element needed for new cells, and the stored mix contains little nitrogen. Calculate the shortfall so the clinic can prepare a measured comparison instead of guessing.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** A tray needs 12 mg nitrogen per day; the stored feed supplies 3 mg per day. Assume no other nitrogen input.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Count the missing nitrogen
  units: mg/day
  labels:
  - need
  - supply
  - trays
  - hours
  values:
  - 12
  - 3
  - 4
  - 24
  slots: 2
  template: '{0} {1} → mg/day'
  formula: a-b
  correct:
  - 0
  - 1
  target: 9
  correctResult: 9
  tolerance: 0.05
answerText: 'The deficit is the daily requirement minus the nitrogen already supplied: 12 − 3 = 9 mg per day. This result is now recorded for the next comparison.'
```

**Question card prompt — exact player copy:** Use the number tiles to calculate the daily nitrogen deficit in mg per day; submit need minus supply.

**Correct result:** 9; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The deficit is the daily requirement minus the nitrogen already supplied: 12 − 3 = 9 mg per day. This result is now recorded for the next comparison.

**Why/mechanism:** The deficit is the daily requirement minus the nitrogen already supplied: 12 − 3 = 9 mg per day. Both quantities refer to the same tray and time interval, so no extra multiplication is needed. Carbon-rich feed cannot create the missing nitrogen atoms. The result sets the size of the suspected shortage, but it does not establish that nitrogen alone explains the symptoms. A matched complete-feed comparison is needed before the crew replaces the mix.

**Mechanism links:** Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** 15 adds supply to need instead of finding the shortfall.

**Wrong-path feedback:**

- 15 adds supply to need instead of finding the shortfall.
- 3 reports the supplied amount rather than what is missing.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Count the missing nitrogen is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 3.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 3 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 2 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 3 — Check the stored mix

**Format/placement:** PROBE, Field Clinic — Culture Rack.

**Required stop kind:** operated/fixture. **Player verb:** sample and compare stations.

**Metadata:** Concept: 30 — Experimental inference and sampling; Keystone: Experimental evidence, Structure and function; Area: CLINIC; Prerequisites: Mission primer and Stop 2: Count the missing nitrogen; Learning role: INTRODUCE; Difficulty: L2; Story role: reversal.

**Briefing decision advanced:** whether to replace the failing seedling feed.

**Actual mission answer:** Replace the feed with a complete nutrient mix.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 9 |
| player_sees | {"probe": {"stations": [{"id": "t1", "label": "Complete-feed control", "reading": "8 mm growth/day", "expected": "7–9 mm/day", "load": "same seed line, light and water"}, {"id": "t2", "label": "Stored-feed tray", "reading": "2 mm growth/day", "expected": "7–9 mm/day", "load": "same seed line, light and water"}, {"id": "t3", "label": "Nitrogen-restored tray", "reading": "8 mm growth/day", "expected": "7–9 mm/day", "load": "stored feed plus missing nitrogen"}, {"id": "t4", "label": "Assay standard", "reading": "10 mg/L nitrate", "expected": "9–11 mg/L", "load": "known solution"}], "target": "t2", "correctChoice": "t2", "quantityAndUnits": "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.", "correctConclusion": "Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison.", "answerText": "Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison."}, "answerText": "Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison."} |
| player_must_determine | "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed." |
| correct_result | "t2" |
| most_tempting_wrong_result | "The complete-feed control is within its range." |
| why_wrong_occurs | "The complete-feed control is within its range." |
| story_consequence | "Check the stored mix is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Culture Rack.

**Stop reason — exact player copy:** The clinic needs a controlled test before changing feed.

**Question card story setup — exact player copy:** The feed calculation identifies a nitrogen shortfall, but a label alone cannot prove why the seedlings grow poorly in these trays. Compare the matched cultures and assay standard before the clinic replaces the stored mix.

**Question card story-science connection — exact player copy:** A station-specific failure identifies the comparison that must govern the next handling decision.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
probe:
  stations:
  - id: t1
    label: Complete-feed control
    reading: 8 mm growth/day
    expected: 7–9 mm/day
    load: same seed line, light and water
  - id: t2
    label: Stored-feed tray
    reading: 2 mm growth/day
    expected: 7–9 mm/day
    load: same seed line, light and water
  - id: t3
    label: Nitrogen-restored tray
    reading: 8 mm growth/day
    expected: 7–9 mm/day
    load: stored feed plus missing nitrogen
  - id: t4
    label: Assay standard
    reading: 10 mg/L nitrate
    expected: 9–11 mg/L
    load: known solution
  target: t2
  correctChoice: t2
  quantityAndUnits: Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.
  correctConclusion: Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison.
  answerText: Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison.
answerText: Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.

**Correct result:** "t2"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Only the stored-feed tray lies outside its own expected range. This result is now recorded for the next comparison.

**Why/mechanism:** Only the stored-feed tray lies outside its own expected range. Restoring nitrogen brings growth back into the complete-feed range, while the assay standard stays normal. The matched trays share seed line, light and water, so the comparison supports a nitrogen limitation under these conditions. It does not show that all pale plants everywhere need this treatment. The result gives the clinic a specific replacement decision and keeps the original feed label as a clue about outdated instructions.

**Mechanism links:** Experimental evidence, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** The complete-feed control is within its range.

**Wrong-path feedback:**

- The complete-feed control is within its range.
- The restored tray matches normal growth rather than causing the failure.
- The nitrate standard is within its own assay range.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Check the stored mix is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 4.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 3 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 3 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 4 — Change the nursery feed

**Format/placement:** CHOICE, Mara Vale at Field Clinic — Care Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 2 — Macromolecules and hydrolysis; Keystone: Structure and function, Matter conservation, Experimental evidence; Area: CLINIC; Prerequisites: Mission primer and Stop 3: Check the stored mix; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** whether to replace the failing seedling feed.

**Actual mission answer:** Replace the feed with a complete nutrient mix.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "t2" |
| player_sees | "Recorded: 9 mg/day nitrogen deficit; stored-feed growth 2 mm/day; nitrogen-restored and complete-feed growth 8 mm/day; all other conditions matched." |
| player_must_determine | "Select the feed decision supported by the label calculation and controlled growth test." |
| correct_result | "Replace with complete feed" |
| most_tempting_wrong_result | "Extra sugar adds carbon but does not supply the 9 mg/day nitrogen deficit." |
| why_wrong_occurs | "Extra sugar adds carbon but does not supply the 9 mg/day nitrogen deficit." |
| story_consequence | "Change the nursery feed is recorded with its evidence on the Field Clinic log; The incomplete feed is withdrawn and replacement nutrients reach the nursery." |


**Call — exact player copy:** Go to Field Clinic and meet Mara Vale, veterinary biologist, at Care Board.

**Stop reason — exact player copy:** The nursery is waiting for the feed decision.

**Question card story setup — exact player copy:** The matched cultures now connect the feed shortage to poor growth, while the assay standard stays normal and the seed line can recover. Choose the handling decision that addresses this evidence without discarding healthy genetic stock.

**Question card story-science connection — exact player copy:** Replace the feed with a complete nutrient mix.

**Data/readings/options:** Recorded: 9 mg/day nitrogen deficit; stored-feed growth 2 mm/day; nitrogen-restored and complete-feed growth 8 mm/day; all other conditions matched.

**Format-specific interaction block:**
```yaml
question: Select the feed decision supported by the label calculation and controlled growth test.
choices:
- Double the sugar only
- Replace with complete feed
- Discard every seed family
- Keep the stored feed
answer: Replace with complete feed
rebuttals:
  Double the sugar only: Extra sugar adds carbon but does not supply the 9 mg/day nitrogen deficit.
  Discard every seed family: The same seed line grows normally when nitrogen is restored.
  Keep the stored feed: The stored-feed tray remains below the expected growth range.
answerText: The feed lacks nitrogen even though it contains an energy source. Replace the feed with a complete nutrient mix.
why: 'The feed lacks nitrogen even though it contains an energy source. The growth comparison isolates that shortage: adding the missing nitrogen restores growth to the complete-feed range while the assay control remains normal. Replacing the incomplete mix therefore addresses the measured limitation. Increasing sugar would not supply nitrogen atoms, and discarding seed families would remove biological diversity without evidence that the seeds are defective. The clinic keeps the old label because later release instructions may contain the same outdated assumptions.'
```

**Question card prompt — exact player copy:** Select the feed decision supported by the label calculation and controlled growth test.

**Correct result:** "Replace with complete feed"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The feed lacks nitrogen even though it contains an energy source. Replace the feed with a complete nutrient mix.

**Why/mechanism:** The feed lacks nitrogen even though it contains an energy source. The growth comparison isolates that shortage: adding the missing nitrogen restores growth to the complete-feed range while the assay control remains normal. Replacing the incomplete mix therefore addresses the measured limitation. Increasing sugar would not supply nitrogen atoms, and discarding seed families would remove biological diversity without evidence that the seeds are defective. The clinic keeps the old label because later release instructions may contain the same outdated assumptions.

**Mechanism links:** Structure and function, Matter conservation, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Extra sugar adds carbon but does not supply the 9 mg/day nitrogen deficit.

**Wrong-path feedback:**

- Extra sugar adds carbon but does not supply the 9 mg/day nitrogen deficit.
- The same seed line grows normally when nitrogen is restored.
- The stored-feed tray remains below the expected growth range.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Change the nursery feed is recorded with its evidence on the Field Clinic log; The incomplete feed is withdrawn and replacement nutrients reach the nursery.

**Unlock:** M1-B4 and mission outcome.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 3 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 4 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Replace the feed with a complete nutrient mix. The nitrogen test restores growth. The crew uses the plan just chosen. Root cells swell after a fresh-water rinse.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 1 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The incomplete feed is withdrawn and replacement nutrients reach the nursery. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +5 | Receiving Habitat +0 | Care Supplies -1 | Island Health +4

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 4, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [50, 49, 89, 64]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Carbon forms four bonds and can build diverse molecules.
- Calories alone do not provide all the elements needed to build new cells.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Replace the feed with a complete nutrient mix.

---


# Mission 2 — THE RINSE THAT HURTS

## A. Mission briefing card — exact player copy

**Header:** DAY 2 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE RINSE THAT HURTS

**Go now:** Go to Field Clinic and meet Mara Vale, veterinary biologist, at the Sample Bench.

**Card body:** The new feed works, but rinsed shore seedlings now have swollen root cells. Water crosses cell membranes toward lower water potential. Compare cell structure and rinse conditions in the Field Clinic. By the end of the mission, decide whether the shore seedlings need fresh water or a matched salt rinse.

**Objective:** Resolve whether the shore seedlings need fresh water or a matched salt rinse; more roots could be damaged during packing.

### Worth knowing first — exact player copy

#### Glossary terms

- Membrane: A thin selective barrier around a cell.
- Osmosis: Net water movement through a selective membrane toward lower water potential.
- Solute: A substance dissolved in a liquid.
- Organelle: A specialized structure inside a cell.
- Surface-area-to-volume ratio: Outside area divided by enclosed volume.
- Prokaryote: A cell without a nucleus or typical membrane-bound organelles.
- Eukaryote: A cell with a nucleus and internal membrane-bound compartments.
- Nucleus: The compartment containing most DNA in a eukaryotic cell.
- Vacuole: A membrane-bound storage compartment in a cell.
- Mitochondrion: An organelle that supports aerobic energy transfer into ATP.
- Endosymbiosis: A lasting association in which one organism lives inside another; it explains the bacterial ancestry of mitochondria and chloroplasts.
- Water potential: A measure used to predict water movement; solute and pressure both affect it.
- Viability: The fraction of cells alive by the stated assay.
- Impermeant: Unable to cross the membrane in the stated test.

#### Primer concepts

- Water movement depends on both solute and pressure.
- A cell wall resists expansion but does not stop all water movement.
- Small cells have more membrane area per unit volume.

#### Equations first needed today

**Equation:** SA/V = 6/L for a cube

**What it is for:** Compare cell exchange area per volume.

**Symbols:** SA is surface area; V is volume; L is cube side length.

**Why this campaign needs it:** Separate exchange capacity from rinse direction.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. A cube with side 2 has area 24 and volume 8; SA:V = 3 per length unit.

2. A cube with side 1 has area 6 and volume 1; SA:V = 6, twice that of the side-2 cube.

3. An animal cell is 0.2 M inside and 0.1 M outside with equal pressure and impermeant solute; water enters, so it swells.

4. A plant cell in dilute solution takes up water until wall pressure offsets the solute effect; it can become turgid without bursting.

5. A membrane pump moves an ion against its electrochemical gradient; an energy source is required, unlike downhill diffusion.

**Authoring-only failure consequence:** More roots could be damaged during packing.

**Authoring-only later travel:** All work remains in this room.

## B. Main story happening — designer summary

The new feed works, but rinsed shore seedlings now have swollen root cells. The four-stop chain establishes identify the damaged cells, uses it to compare exchange surfaces, then explain the swelling supplies the discriminating evidence for set the packing rinse. The damaging rinse is stopped and matched rinse is issued. Healthy roots still lose energy in sealed pots. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the shore seedlings need fresh water or a matched salt rinse. Actual final answer: Use the rinse that matches the root cells. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M2-B1 — On arrival at Field Clinic

**Location:** Field Clinic.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The new feed works, but rinsed shore seedlings now have swollen root cells.

**Dialogue bubble — Mara Vale, veterinary biologist:** “The rinse investigation needs the right cell model.”

**Unlocks:** Stop 5.

### Beat M2-B2 — After Stops 5 and 6

**Location:** Field Clinic.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Identify the damaged cells and Compare exchange surfaces with their accepted results.

**Panel/HUD text:** “The roots need a mechanism for the measured rinse injury.”

**Unlocks:** Stop 7 at Field Clinic.

### Beat M2-B4 — After Stop 8

**Location:** Field Clinic.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The damaging rinse is stopped and matched rinse is issued.

**Panel/HUD text:** “Use the rinse that matches the root cells.”

**Unlocks:** The ungraded aftermath.

### Beat M2-BE — At mission end

**Location:** Field Clinic.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The damaging rinse is stopped and matched rinse is issued. Healthy roots still lose energy in sealed pots.

**Dialogue bubble — Mara Vale, veterinary biologist:** “Healthy roots still lose energy in sealed pots.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**1 locations:** Field Clinic.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 5 | Field Clinic | sample-bench | The rinse investigation needs the right cell model. |
| 6 | Field Clinic | sample-bench | Cell size must be separated from water-movement direction. |
| 7 | Field Clinic | sample-bench | The roots need a mechanism for the measured rinse injury. |
| 8 | Field Clinic | care-board | Packing cannot resume with the damaging rinse. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Mara Vale, veterinary biologist, begins by owning the local evidence. The conflict is between more roots could be damaged during packing. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **4 — Cells, organelles and endosymbiosis:** The damaged sample contains cell walls and large vacuoles, identifying plant tissue rather than an animal contaminant.

- **6 — Water potential and surface-area exchange:** For a cube, surface area divided by volume is 6L²/L³ = 6/L.

- **5 — Membranes and transport:** At equal initial pressure, the more concentrated root-cell solution has lower water potential than the fresh-water rinse.

- **5 — Membranes and transport:** The matched rinse prevents the net water movement associated with the damaging treatment while preserving the cells and their walls.

Nucleus stores DNA and supports transcription; rough ER bears ribosomes for proteins entering its pathway; smooth ER makes lipids and participates in detoxification; Golgi modifies and sorts cargo; mitochondria support aerobic ATP production; chloroplasts support photosynthesis; a plant vacuole contributes storage and pressure. A fluid-mosaic membrane contains lipids and mobile proteins. Diffusion and facilitated diffusion follow gradients without direct ATP use, while pumps can require energy to move against electrochemical gradients. Water potential includes solute and pressure effects; isotonic wording is restricted to the stated equal-pressure comparison.

## H1. Stop 5 — Identify the damaged cells

**Format/placement:** PROTOCOL, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 4 — Cells, organelles and endosymbiosis; Keystone: Structure and function, Selective exchange; Area: CLINIC; Prerequisites: Mission primer and Stop 4: Change the nursery feed; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** whether the shore seedlings need fresh water or a matched salt rinse.

**Actual mission answer:** Use the rinse that matches the root cells.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The new feed works, but rinsed shore seedlings now have swollen root cells." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Cell wall and large vacuole"}, {"id": "e2", "label": "No nucleus and circular chromosome"}, {"id": "e3", "label": "Nucleus but no cell wall"}, {"id": "e4", "label": "Double membrane and own DNA"}], "choices": [{"id": "r4", "label": "Mitochondrion consistent with endosymbiotic origin"}, {"id": "r3", "label": "Animal cell"}, {"id": "r2", "label": "Prokaryotic cell"}, {"id": "r1", "label": "Plant root cell"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Cell wall and large vacuole supports Plant root cell; Mitochondrion consistent with endosymbiotic origin describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Cell wall and large vacuole supports Plant root cell; Animal cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Cell wall and large vacuole supports Plant root cell; Prokaryotic cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "No nucleus and circular chromosome supports Prokaryotic cell; Mitochondrion consistent with endosymbiotic origin describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "No nucleus and circular chromosome supports Prokaryotic cell; Animal cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "No nucleus and circular chromosome supports Prokaryotic cell; Plant root cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Nucleus but no cell wall supports Animal cell; Mitochondrion consistent with endosymbiotic origin describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Nucleus but no cell wall supports Animal cell; Prokaryotic cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Nucleus but no cell wall supports Animal cell; Plant root cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Double membrane and own DNA supports Mitochondrion consistent with endosymbiotic origin; Animal cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Double membrane and own DNA supports Mitochondrion consistent with endosymbiotic origin; Prokaryotic cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Double membrane and own DNA supports Mitochondrion consistent with endosymbiotic origin; Plant root cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The damaged sample contains cell walls and large vacuoles, identifying plant tissue rather than an animal contaminant. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "A cell wall and large vacuole distinguish the root cells from animal cells." |
| why_wrong_occurs | "A cell wall and large vacuole distinguish the root cells from animal cells." |
| story_consequence | "Identify the damaged cells is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The rinse investigation needs the right cell model.

**Question card story setup — exact player copy:** The new feed has helped, but the salt-adapted seedlings lose root-cell viability after an abrupt fresh-water rinse during packing. Identify the cells and their barriers before the clinic decides which rinse comparison can explain the damage.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Cell wall and large vacuole
- id: e2
  label: No nucleus and circular chromosome
- id: e3
  label: Nucleus but no cell wall
- id: e4
  label: Double membrane and own DNA
choices:
- id: r4
  label: Mitochondrion consistent with endosymbiotic origin
- id: r3
  label: Animal cell
- id: r2
  label: Prokaryotic cell
- id: r1
  label: Plant root cell
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Cell wall and large vacuole supports Plant root cell; Mitochondrion consistent with endosymbiotic origin describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Cell wall and large vacuole supports Plant root cell; Animal cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Cell wall and large vacuole supports Plant root cell; Prokaryotic cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: No nucleus and circular chromosome supports Prokaryotic cell; Mitochondrion consistent with endosymbiotic origin describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: No nucleus and circular chromosome supports Prokaryotic cell; Animal cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: No nucleus and circular chromosome supports Prokaryotic cell; Plant root cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Nucleus but no cell wall supports Animal cell; Mitochondrion consistent with endosymbiotic origin describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Nucleus but no cell wall supports Animal cell; Prokaryotic cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Nucleus but no cell wall supports Animal cell; Plant root cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Double membrane and own DNA supports Mitochondrion consistent with endosymbiotic origin; Animal cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Double membrane and own DNA supports Mitochondrion consistent with endosymbiotic origin; Prokaryotic cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Double membrane and own DNA supports Mitochondrion consistent with endosymbiotic origin; Plant root cell describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The damaged sample contains cell walls and large vacuoles, identifying plant tissue rather than an animal contaminant. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The damaged sample contains cell walls and large vacuoles, identifying plant tissue rather than an animal contaminant. This result is now recorded for the next comparison.

**Why/mechanism:** The damaged sample contains cell walls and large vacuoles, identifying plant tissue rather than an animal contaminant. Prokaryotes lack a nucleus, whereas animal cells have a nucleus but no cell wall. Mitochondria retain several traits consistent with descent from engulfed bacteria, including their own DNA and a double membrane. These observations establish which barriers and compartments matter in the rinse investigation. Structure and selective exchange must be considered together before interpreting the direction of water movement.

**Mechanism links:** Structure and function, Selective exchange are the specific broader principles used in the explanation above.

**Misconception:** A cell wall and large vacuole distinguish the root cells from animal cells.

**Wrong-path feedback:**

- A cell wall and large vacuole distinguish the root cells from animal cells.
- A circular chromosome without a nucleus does not identify a mitochondrion by itself.
- Endosymbiotic evidence concerns organelle origin, not a damaged cell suddenly becoming a bacterium.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Identify the damaged cells is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 6.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 4 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 5 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 6 — Compare exchange surfaces

**Format/placement:** BALLPARK, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 6 — Water potential and surface-area exchange; Keystone: Selective exchange, Structure and function; Area: CLINIC; Prerequisites: Mission primer and Stop 5: Identify the damaged cells; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether the shore seedlings need fresh water or a matched salt rinse.

**Actual mission answer:** Use the rinse that matches the root cells.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "A model root cell is a cube of side 3 micrometres; surface area = 6L² and volume = L³." |
| player_must_determine | "Build the ratio 6 divided by side length from the tiles; submit surface-area-to-volume ratio in inverse micrometres." |
| correct_result | 2 |
| most_tempting_wrong_result | "54 is surface area alone, not area divided by volume." |
| why_wrong_occurs | "54 is surface area alone, not area divided by volume." |
| story_consequence | "Compare exchange surfaces is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** Cell size must be separated from water-movement direction.

**Question card story setup — exact player copy:** The sample is plant tissue with membranes and supporting walls, so the damaged roots cannot be treated as empty bags of water. Compare exchange surface with cell volume before interpreting what a change in size actually means.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** A model root cell is a cube of side 3 micrometres; surface area = 6L² and volume = L³.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Compare exchange surfaces
  units: 1/µm
  labels:
  - faces
  - side length
  - surface area
  - volume
  values:
  - 6
  - 3
  - 54
  - 27
  slots: 2
  template: '{0} {1} → 1/µm'
  formula: a/b
  correct:
  - 0
  - 1
  target: 2
  correctResult: 2
  tolerance: 0.05
answerText: For a cube, surface area divided by volume is 6L²/L³ = 6/L. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Build the ratio 6 divided by side length from the tiles; submit surface-area-to-volume ratio in inverse micrometres.

**Correct result:** 2; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** For a cube, surface area divided by volume is 6L²/L³ = 6/L. This result is now recorded for the next comparison.

**Why/mechanism:** For a cube, surface area divided by volume is 6L²/L³ = 6/L. At L = 3 micrometres, the ratio is 2 inverse micrometres. The ratio describes available exchange surface per unit of cell volume, not the direction in which water moves. Smaller cells have a larger ratio, but water still follows the water-potential difference. The clinic can now distinguish an exchange-rate argument from the separate question of whether the rinse drives water into or out of roots.

**Mechanism links:** Selective exchange, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** 54 is surface area alone, not area divided by volume.

**Wrong-path feedback:**

- 54 is surface area alone, not area divided by volume.
- 27 is volume, so it cannot have inverse-length units.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Compare exchange surfaces is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 7.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 4 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 6 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 7 — Explain the swelling

**Format/placement:** DIAGNOSIS, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** discriminate explanations from all readings.

**Metadata:** Concept: 5 — Membranes and transport; Keystone: Selective exchange, Experimental evidence; Area: CLINIC; Prerequisites: Mission primer and Stop 6: Compare exchange surfaces; Learning role: INTRODUCE; Difficulty: L2; Story role: reversal.

**Briefing decision advanced:** whether the shore seedlings need fresh water or a matched salt rinse.

**Actual mission answer:** Use the rinse that matches the root cells.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 2 |
| player_sees | "All observations concern the same salt-adapted seedling line after an abrupt 30-minute rinse; viability was 96% before either treatment. Swelling alone is not evidence of injury; measured viability loss is." |
| player_must_determine | "Read every measurement, including the normal control, and submit the one explanation consistent with them all." |
| correct_result | "Water enters by osmosis" |
| most_tempting_wrong_result | "The stated solute is impermeant, and no pumping observation explains the matched-rinse contrast." |
| why_wrong_occurs | "The stated solute is impermeant, and no pumping observation explains the matched-rinse contrast." |
| story_consequence | "Explain the swelling is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The roots need a mechanism for the measured rinse injury.

**Question card story setup — exact player copy:** The surface calculation describes exchange capacity, but it does not say why the fresh-water group swells and loses viable cells. Read the matched rinse data to distinguish a water-movement problem from the feed problem already repaired.

**Question card story-science connection — exact player copy:** An explanation must survive the normal controls before it can justify changing the release stock.

**Data/readings/options:** All observations concern the same salt-adapted seedling line after an abrupt 30-minute rinse; viability was 96% before either treatment. Swelling alone is not evidence of injury; measured viability loss is.

**Format-specific interaction block:**
```yaml
headline: Explain the swelling
readings:
- zone: Roots
  label: Cell solute concentration
  value: 0.30 M impermeant solute
  status: normal
- zone: Rinse
  label: Rinse solute concentration
  value: 0.00 M; initial pressures equal
  status: alarm
- zone: Comparison
  label: Matched rinse outcome
  value: 0.30 M; no net swelling
  status: normal
- zone: Viability
  label: After abrupt 30-minute rinse
  value: Fresh-water group 55% viable; matched 0.30 M group 96% viable; same salt-adapted line
  status: alarm
choices:
- label: Water enters by osmosis
  mechanism: Water enters by osmosis
- label: Solute leaves by active pumping
  mechanism: Solute leaves by active pumping
- label: Walls synthesize extra water
  mechanism: Walls synthesize extra water
- label: Nitrogen feed destroys membranes
  mechanism: Nitrogen feed destroys membranes
answer: Water enters by osmosis
rebuttals:
  Solute leaves by active pumping: The stated solute is impermeant, and no pumping observation explains the matched-rinse contrast.
  Walls synthesize extra water: Cell walls do not synthesize water; pressure develops as water enters.
  Nitrogen feed destroys membranes: Roots given the same new feed remain normal in matched rinse.
answerText: At equal initial pressure, the more concentrated root-cell solution has lower water potential than the fresh-water rinse. This result is now recorded for the next comparison.
why: At equal initial pressure, the more concentrated root-cell solution has lower water potential than the fresh-water rinse. Water therefore enters across the selectively permeable membrane. The matched rinse produces no net swelling, supporting the osmotic explanation. A plant cell wall can develop pressure that opposes further uptake, but the measured viability loss means this packing treatment is unsuitable for these seedlings. The result retrieves the need for controlled comparisons while separating a new rinse problem from the earlier nitrogen shortage.
```

**Question card prompt — exact player copy:** Read every measurement, including the normal control, and submit the one explanation consistent with them all.

**Correct result:** "Water enters by osmosis"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** At equal initial pressure, the more concentrated root-cell solution has lower water potential than the fresh-water rinse. This result is now recorded for the next comparison.

**Why/mechanism:** At equal initial pressure, the more concentrated root-cell solution has lower water potential than the fresh-water rinse. Water therefore enters across the selectively permeable membrane. The matched rinse produces no net swelling, supporting the osmotic explanation. A plant cell wall can develop pressure that opposes further uptake, but the measured viability loss means this packing treatment is unsuitable for these seedlings. The result retrieves the need for controlled comparisons while separating a new rinse problem from the earlier nitrogen shortage.

**Mechanism links:** Selective exchange, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The stated solute is impermeant, and no pumping observation explains the matched-rinse contrast.

**Wrong-path feedback:**

- The stated solute is impermeant, and no pumping observation explains the matched-rinse contrast.
- Cell walls do not synthesize water; pressure develops as water enters.
- Roots given the same new feed remain normal in matched rinse.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Explain the swelling is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 8.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 4 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 7 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 8 — Set the packing rinse

**Format/placement:** CHOICE, Mara Vale at Field Clinic — Care Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 5 — Membranes and transport; Keystone: Selective exchange, Structure and function; Area: CLINIC; Prerequisites: Mission primer and Stop 7: Explain the swelling; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** whether the shore seedlings need fresh water or a matched salt rinse.

**Actual mission answer:** Use the rinse that matches the root cells.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "Water enters by osmosis" |
| player_sees | "Stored result: fresh water caused swelling; 0.30 M rinse matched root cells and prevented net swelling; both groups received the same complete feed. After 30 minutes, viability is 55% in fresh water and 96% in matched rinse for this salt-adapted line; swelling alone is not called damage." |
| player_must_determine | "Choose the packing rinse for this tested seedling line." |
| correct_result | "Use the matched salt rinse" |
| most_tempting_wrong_result | "Longer exposure preserves the same inward osmotic drive." |
| why_wrong_occurs | "Longer exposure preserves the same inward osmotic drive." |
| story_consequence | "Set the packing rinse is recorded with its evidence on the Field Clinic log; The damaging rinse is stopped and matched rinse is issued." |


**Call — exact player copy:** Go to Field Clinic and meet Mara Vale, veterinary biologist, at Care Board.

**Stop reason — exact player copy:** Packing cannot resume with the damaging rinse.

**Question card story setup — exact player copy:** The rinse comparison now links abrupt fresh-water exposure to swelling and reduced viability in the tested salt-adapted line, while matched rinse preserves viability. Choose the packing treatment that follows those observations without claiming every species needs it.

**Question card story-science connection — exact player copy:** Use the rinse that matches the root cells.

**Data/readings/options:** Stored result: fresh water caused swelling; 0.30 M rinse matched root cells and prevented net swelling; both groups received the same complete feed. After 30 minutes, viability is 55% in fresh water and 96% in matched rinse for this salt-adapted line; swelling alone is not called damage.

**Format-specific interaction block:**
```yaml
question: Choose the packing rinse for this tested seedling line.
choices:
- Use the matched salt rinse
- Use pure water for longer
- Use a more concentrated rinse
- Remove every cell wall
answer: Use the matched salt rinse
rebuttals:
  Use pure water for longer: Longer exposure preserves the same inward osmotic drive.
  Use a more concentrated rinse: A higher external concentration risks outward water loss.
  Remove every cell wall: Removing walls sacrifices support and does not match the external solution.
answerText: The matched rinse prevents the net water movement associated with the damaging treatment while preserving the cells and their walls. Use the rinse that matches the root cells.
why: The matched rinse prevents the net water movement associated with the damaging treatment while preserving the cells and their walls. Fresh water would maintain the inward water-potential difference; a more concentrated rinse could instead draw water out and cause shrinkage. Removing walls would destroy an important structural support rather than correct the external conditions. This decision applies to the tested line and packing interval. Other species need their own measured requirements before the same rinse can be used safely.
```

**Question card prompt — exact player copy:** Choose the packing rinse for this tested seedling line.

**Correct result:** "Use the matched salt rinse"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The matched rinse prevents the net water movement associated with the damaging treatment while preserving the cells and their walls. Use the rinse that matches the root cells.

**Why/mechanism:** The matched rinse prevents the net water movement associated with the damaging treatment while preserving the cells and their walls. Fresh water would maintain the inward water-potential difference; a more concentrated rinse could instead draw water out and cause shrinkage. Removing walls would destroy an important structural support rather than correct the external conditions. This decision applies to the tested line and packing interval. Other species need their own measured requirements before the same rinse can be used safely.

**Mechanism links:** Selective exchange, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** Longer exposure preserves the same inward osmotic drive.

**Wrong-path feedback:**

- Longer exposure preserves the same inward osmotic drive.
- A higher external concentration risks outward water loss.
- Removing walls sacrifices support and does not match the external solution.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Set the packing rinse is recorded with its evidence on the Field Clinic log; The damaging rinse is stopped and matched rinse is issued.

**Unlock:** M2-B4 and mission outcome.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 4 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 8 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Use the rinse that matches the root cells. The matched rinse keeps root cells alive. The crew uses the plan just chosen. Healthy roots still lose energy in sealed pots.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 2 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The damaging rinse is stopped and matched rinse is issued. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +2 | Receiving Habitat +2 | Care Supplies -1 | Island Health +5

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [2, 2, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [54, 53, 88, 69]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Water movement depends on both solute and pressure.
- A cell wall resists expansion but does not stop all water movement.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Use the rinse that matches the root cells.

---


# Mission 3 — THE POND AFTER DARK

## A. Mission briefing card — exact player copy

**Header:** DAY 3 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE POND AFTER DARK

**Go now:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at the Growth Bench.

**Card body:** The roots now survive rinsing, but seedlings wilt in sealed transport pots. Cells use oxygen to release usable energy from food, even when leaves make oxygen in light. Compare day and night records at the Pond Tanks. By the end of the mission, decide whether sealed transport pots need an oxygen supply.

**Objective:** Resolve whether sealed transport pots need an oxygen supply; the packed seedlings may fail before arrival.

### Worth knowing first — exact player copy

#### Glossary terms

- ATP: A molecule that couples energy-releasing reactions to cellular work.
- Respiration: Cellular pathways that transfer energy from food into ATP.
- Photosynthesis: Conversion of light energy into chemical energy while fixing carbon dioxide.
- Chemiosmosis: ATP production driven by ions moving down a gradient through ATP synthase.
- Fermentation: Reactions that regenerate NAD+ so glycolysis can continue without an oxygen-dependent chain.
- Electron: A negatively charged particle transferred in energy pathways.
- Proton: A positively charged particle whose gradient can drive ATP synthesis.
- Gradient: A difference in a quantity between places.
- ATP synthase: An enzyme that couples ion movement down a gradient to ATP production.
- NADH: An electron carrier used in respiration.
- NADPH: An electron carrier used in photosynthetic carbon fixation.
- NAD+: The oxidized carrier that can accept electrons during glycolysis.
- Glycolysis: A cytosolic pathway that splits glucose and yields a small net ATP gain.
- Thylakoid: A membrane compartment carrying light-reaction machinery in a chloroplast.
- Stroma: The fluid compartment around chloroplast thylakoids.
- Calvin cycle: The carbon-fixation reactions that use ATP and NADPH to build organic molecules.

#### Primer concepts

- Plants respire in light and darkness.
- Light reactions supply ATP and NADPH; carbon fixation builds organic molecules.
- Oxygen is the terminal electron acceptor in aerobic respiration.

#### Equations first needed today

**Equation:** net oxygen change = gross production − consumption

**What it is for:** Account for simultaneous oxygen source and sink.

**Symbols:** All three quantities are oxygen mass per hour.

**Why this campaign needs it:** Avoid using daylight gross production as net gain.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. If gross oxygen production is 11 units/hour and respiration uses 4, net gain is 11 − 4 = 7 units/hour.

2. At night, photosynthetic production is 0 and respiration consumes 3 units/hour; net change is −3 units/hour.

3. Glycolysis gives 2 net ATP per glucose; 6 glucose molecules yield 12 net ATP before later aerobic stages.

4. Blocking ATP synthase prevents protons using that route to power ATP formation; a gradient alone is not ATP.

5. Fermentation regenerates NAD+ from NADH; that permits glycolysis but does not itself add another large ATP yield.

**Authoring-only failure consequence:** The packed seedlings may fail before arrival.

**Authoring-only later travel:** All work remains in this room.

## B. Main story happening — designer summary

The roots now survive rinsing, but seedlings wilt in sealed transport pots. The four-stop chain establishes follow oxygen-supported atp production, uses it to calculate the daylight balance, then check the night controls supplies the discriminating evidence for approve the pot lids. Ventilated pot lids are fitted after the sealed-pot test. The restored plants flower at an unexpected time. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether sealed transport pots need an oxygen supply. Actual final answer: Keep the pots supplied with oxygen. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M3-B1 — On arrival at Growth Hall

**Location:** Growth Hall.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The roots now survive rinsing, but seedlings wilt in sealed transport pots.

**Dialogue bubble — Ivo Reed, plant physiologist:** “The crew must explain why fed roots fail in sealed pots.”

**Unlocks:** Stop 9.

### Beat M3-B2 — After Stops 9 and 10

**Location:** Growth Hall.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Follow oxygen-supported ATP production and Calculate the daylight balance with their accepted results.

**Panel/HUD text:** “The shipping lids must pass the overnight comparison.”

**Unlocks:** Stop 11 at Growth Hall.

### Beat M3-B4 — After Stop 12

**Location:** Growth Hall.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** Ventilated pot lids are fitted after the sealed-pot test.

**Panel/HUD text:** “Keep the pots supplied with oxygen.”

**Unlocks:** The ungraded aftermath.

### Beat M3-BE — At mission end

**Location:** Growth Hall.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** Ventilated pot lids are fitted after the sealed-pot test. The restored plants flower at an unexpected time.

**Dialogue bubble — Ivo Reed, plant physiologist:** “The restored plants flower at an unexpected time.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**1 locations:** Growth Hall.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 9 | Growth Hall | growth-bench | The crew must explain why fed roots fail in sealed pots. |
| 10 | Growth Hall | growth-bench | The afternoon inspection needs a net oxygen balance. |
| 11 | Growth Hall | pond-tanks | The shipping lids must pass the overnight comparison. |
| 12 | Growth Hall | light-panel | The pot lids must be chosen before packing continues. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Ivo Reed, plant physiologist, begins by owning the local evidence. The conflict is between the packed seedlings may fail before arrival. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **9 — Respiration and chemiosmosis:** Energy from food reaches electron carriers and then the mitochondrial electron-transport chain.

- **8 — Photosynthesis and carbon fixation:** The net daylight oxygen gain is gross production minus respiratory use: 14 − 6 = 8 mg per hour.

- **9 — Respiration and chemiosmosis:** The sealed planted pot is the only station outside its expected oxygen range.

- **9 — Respiration and chemiosmosis:** The sealed pots fail the campaign oxygen specification overnight, while the tested ventilated pots remain above it.

In the qualitative energy model, exergonic reactions release usable free energy and have negative ΔG; endergonic reactions require input and have positive ΔG. ATP hydrolysis can be coupled to cellular work. Glycolysis in cytosol yields 2 net ATP and 2 NADH per glucose; pyruvate oxidation in mitochondrial matrix yields 2 NADH and 2 carbon dioxide; the cycle yields 2 ATP, 6 NADH and 2 FADH2 per glucose. Oxidative phosphorylation contributes a variable roughly 26–28 ATP in the sheet model, for roughly 30–32 total. Fermentation regenerates NAD+ for glycolysis rather than adding the aerobic chain yield. Uncoupling can dissipate a proton gradient as heat. Photosynthetic light reactions supply ATP/NADPH; carbon fixation uses them in the stroma.

## H1. Stop 9 — Follow oxygen-supported ATP production

**Format/placement:** SEQUENCE, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 9 — Respiration and chemiosmosis; Keystone: Energy coupling, Structure and function; Area: GROW; Prerequisites: Mission primer and Stop 8: Set the packing rinse; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** whether sealed transport pots need an oxygen supply.

**Actual mission answer:** Keep the pots supplied with oxygen.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The roots now survive rinsing, but seedlings wilt in sealed transport pots." |
| player_sees | {"cards": [{"id": "p4", "label": "The proton gradient drives ATP synthase"}, {"id": "p3", "label": "Oxygen accepts electrons at the end of the chain"}, {"id": "p2", "label": "The inner mitochondrial chain transfers electrons and pumps protons"}, {"id": "p1", "label": "Electrons from food enter electron carriers"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Selected causal-dependency explanation, not exclusive chronological phases: electron supply enables sustained chain activity; terminal acceptance enables continued flow; ATP synthase uses the resulting gradient. These processes overlap.", "prerequisite_feedback": {"p2": "The inner mitochondrial chain transfers electrons and pumps protons requires the prior stated condition: Electrons from food enter electron carriers. Restore this dependency and retry the full causal order.", "p3": "Oxygen accepts electrons at the end of the chain requires the prior stated condition: The inner mitochondrial chain transfers electrons and pumps protons. Restore this dependency and retry the full causal order.", "p4": "The proton gradient drives ATP synthase requires the prior stated condition: Oxygen accepts electrons at the end of the chain. Restore this dependency and retry the full causal order."}, "answerText": "Energy from food reaches electron carriers and then the mitochondrial electron-transport chain. This result is now recorded for the next comparison."} |
| player_must_determine | "Arrange the cards as the supplied causal-dependency explanation from food electrons to ATP; this is not a timeline of nonoverlapping phases. Submit the whole order." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "ATP synthase uses a gradient; it does not create oxygen to start the chain." |
| why_wrong_occurs | "ATP synthase uses a gradient; it does not create oxygen to start the chain." |
| story_consequence | "Follow oxygen-supported ATP production is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The crew must explain why fed roots fail in sealed pots.

**Question card story setup — exact player copy:** The rinsed roots now remain viable, yet seedlings still wilt after their pots are sealed for the journey to the mainland. Trace how food supports cellular work before testing whether a full pot actually contains what roots need.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: The proton gradient drives ATP synthase
- id: p3
  label: Oxygen accepts electrons at the end of the chain
- id: p2
  label: The inner mitochondrial chain transfers electrons and pumps protons
- id: p1
  label: Electrons from food enter electron carriers
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: 'Selected causal-dependency explanation, not exclusive chronological phases: electron supply enables sustained chain activity; terminal acceptance enables continued flow; ATP synthase uses the resulting gradient. These processes overlap.'
prerequisite_feedback:
  p2: 'The inner mitochondrial chain transfers electrons and pumps protons requires the prior stated condition: Electrons from food enter electron carriers. Restore this dependency and retry the full causal order.'
  p3: 'Oxygen accepts electrons at the end of the chain requires the prior stated condition: The inner mitochondrial chain transfers electrons and pumps protons. Restore this dependency and retry the full causal order.'
  p4: 'The proton gradient drives ATP synthase requires the prior stated condition: Oxygen accepts electrons at the end of the chain. Restore this dependency and retry the full causal order.'
answerText: Energy from food reaches electron carriers and then the mitochondrial electron-transport chain. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Arrange the cards as the supplied causal-dependency explanation from food electrons to ATP; this is not a timeline of nonoverlapping phases. Submit the whole order.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Energy from food reaches electron carriers and then the mitochondrial electron-transport chain. This result is now recorded for the next comparison.

**Why/mechanism:** Energy from food reaches electron carriers and then the mitochondrial electron-transport chain. Electron transfer powers proton pumping across the inner membrane, and oxygen accepts electrons at the chain end. Protons returning through ATP synthase drive ATP production. The events overlap in a working cell, but this causal order identifies what supplies what. If oxygen runs out, the chain cannot keep transferring electrons normally. The seedling can contain food yet lack sufficient ATP for transport and maintenance in a sealed pot.

**Mechanism links:** Energy coupling, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** ATP synthase uses a gradient; it does not create oxygen to start the chain.

**Wrong-path feedback:**

- ATP synthase uses a gradient; it does not create oxygen to start the chain.
- Oxygen accepts electrons near the end of the chain rather than donating food electrons.
- Moving ATP production ahead of gradient formation removes its immediate energy source.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Follow oxygen-supported ATP production is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 10.

**Retrieval:** M1 Stop 1 (Read the feed ingredients); M1 Stop 3 (Check the stored mix); M1 Stop 4 (Change the nursery feed)

**Later payoff:** Mission 5 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 9 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 10 — Calculate the daylight balance

**Format/placement:** BALLPARK, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 8 — Photosynthesis and carbon fixation; Keystone: Energy coupling, Matter conservation; Area: GROW; Prerequisites: Mission primer and Stop 9: Follow oxygen-supported ATP production; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether sealed transport pots need an oxygen supply.

**Actual mission answer:** Keep the pots supplied with oxygen.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | "Matched planted pots produce 14 mg oxygen/hour in light and consume 6 mg oxygen/hour through respiration. Assume these measured rates stay constant for one hour." |
| player_must_determine | "Use production minus consumption and submit net oxygen gain in mg per hour." |
| correct_result | 8 |
| most_tempting_wrong_result | "14 ignores oxygen consumption during the light period." |
| why_wrong_occurs | "14 ignores oxygen consumption during the light period." |
| story_consequence | "Calculate the daylight balance is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The afternoon inspection needs a net oxygen balance.

**Question card story setup — exact player copy:** The cellular pathway shows why the roots need oxygen as well as food, even while their leaves appear healthy under the lamps. Calculate the daytime oxygen balance to find what the afternoon inspection does and does not establish.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** Matched planted pots produce 14 mg oxygen/hour in light and consume 6 mg oxygen/hour through respiration. Assume these measured rates stay constant for one hour.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Calculate the daylight balance
  units: mg/hour
  labels:
  - gross production
  - respiration
  - hours
  - sealed pots
  values:
  - 14
  - 6
  - 1
  - 5
  slots: 2
  template: '{0} {1} → mg/hour'
  formula: a-b
  correct:
  - 0
  - 1
  target: 8
  correctResult: 8
  tolerance: 0.05
answerText: 'The net daylight oxygen gain is gross production minus respiratory use: 14 − 6 = 8 mg per hour. This result is now recorded for the next comparison.'
```

**Question card prompt — exact player copy:** Use production minus consumption and submit net oxygen gain in mg per hour.

**Correct result:** 8; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The net daylight oxygen gain is gross production minus respiratory use: 14 − 6 = 8 mg per hour. This result is now recorded for the next comparison.

**Why/mechanism:** The net daylight oxygen gain is gross production minus respiratory use: 14 − 6 = 8 mg per hour. Respiration does not stop when light is present, so treating gross photosynthetic production as the net change overstates the gain. The positive daylight balance explains why the pots seemed healthy during afternoon inspection. It does not establish the overnight balance, when light-driven oxygen production stops but respiration continues. Energy and matter accounting therefore require measurements across the actual transport cycle.

**Mechanism links:** Energy coupling, Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** 14 ignores oxygen consumption during the light period.

**Wrong-path feedback:**

- 14 ignores oxygen consumption during the light period.
- 20 adds a source and a sink instead of subtracting use.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Calculate the daylight balance is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 11.

**Retrieval:** M1 Stop 1 (Read the feed ingredients); M1 Stop 2 (Count the missing nitrogen); M1 Stop 4 (Change the nursery feed)

**Later payoff:** Mission 5 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 10 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 11 — Check the night controls

**Format/placement:** PROBE, Growth Hall — Pond Tanks.

**Required stop kind:** operated/fixture. **Player verb:** sample and compare stations.

**Metadata:** Concept: 9 — Respiration and chemiosmosis; Keystone: Energy coupling, Experimental evidence; Area: GROW; Prerequisites: Mission primer and Stop 10: Calculate the daylight balance; Learning role: INTRODUCE; Difficulty: L2; Story role: reversal.

**Briefing decision advanced:** whether sealed transport pots need an oxygen supply.

**Actual mission answer:** Keep the pots supplied with oxygen.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 8 |
| player_sees | {"probe": {"stations": [{"id": "t1", "label": "Ventilated planted pot", "reading": "7 mg/L oxygen", "expected": "6–8 mg/L", "load": "after eight dark hours"}, {"id": "t2", "label": "Sealed planted pot", "reading": "1 mg/L oxygen", "expected": "6–8 mg/L", "load": "after eight dark hours"}, {"id": "t3", "label": "Sealed empty pot", "reading": "7 mg/L oxygen", "expected": "6–8 mg/L", "load": "same water without organisms"}, {"id": "t4", "label": "Oxygen standard", "reading": "8 mg/L oxygen", "expected": "7–9 mg/L", "load": "known standard"}], "target": "t2", "correctChoice": "t2", "quantityAndUnits": "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.", "correctConclusion": "The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison.", "answerText": "The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison."}, "answerText": "The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison."} |
| player_must_determine | "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed." |
| correct_result | "t2" |
| most_tempting_wrong_result | "The ventilated planted pot is inside its expected range." |
| why_wrong_occurs | "The ventilated planted pot is inside its expected range." |
| story_consequence | "Check the night controls is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Pond Tanks.

**Stop reason — exact player copy:** The shipping lids must pass the overnight comparison.

**Question card story setup — exact player copy:** The daylight calculation gives an oxygen gain, but that result does not cover the dark hours when the packed plants still respire. Compare the overnight pots and independent standard before choosing how the lids should exchange air.

**Question card story-science connection — exact player copy:** A station-specific failure identifies the comparison that must govern the next handling decision.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
probe:
  stations:
  - id: t1
    label: Ventilated planted pot
    reading: 7 mg/L oxygen
    expected: 6–8 mg/L
    load: after eight dark hours
  - id: t2
    label: Sealed planted pot
    reading: 1 mg/L oxygen
    expected: 6–8 mg/L
    load: after eight dark hours
  - id: t3
    label: Sealed empty pot
    reading: 7 mg/L oxygen
    expected: 6–8 mg/L
    load: same water without organisms
  - id: t4
    label: Oxygen standard
    reading: 8 mg/L oxygen
    expected: 7–9 mg/L
    load: known standard
  target: t2
  correctChoice: t2
  quantityAndUnits: Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.
  correctConclusion: The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison.
  answerText: The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison.
answerText: The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.

**Correct result:** "t2"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The sealed planted pot is the only station outside its expected oxygen range. This result is now recorded for the next comparison.

**Why/mechanism:** The sealed planted pot is the only station outside its expected oxygen range. The empty sealed pot and the standard remain normal, while ventilation keeps the planted comparison supplied with oxygen. The contrast supports organismal respiration as the relevant sink under these conditions. It does not show that darkness destroys oxygen or that all sealed containers behave identically. Together with the daylight balance, the result explains why an afternoon reading could miss the transport risk and justifies a supply route through the lids.

**Mechanism links:** Energy coupling, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The ventilated planted pot is inside its expected range.

**Wrong-path feedback:**

- The ventilated planted pot is inside its expected range.
- The empty sealed pot rules out sealing alone as the observed oxygen sink.
- The standard is normal, so it does not support a meter failure.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Check the night controls is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 12.

**Retrieval:** M1 Stop 3 (Check the stored mix); M1 Stop 4 (Change the nursery feed)

**Later payoff:** Mission 5 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 11 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 12 — Approve the pot lids

**Format/placement:** CHOICE, Ivo Reed at Growth Hall — Light Panel.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 9 — Respiration and chemiosmosis; Keystone: Energy coupling, Selective exchange, Experimental evidence; Area: GROW; Prerequisites: Mission primer and Stop 11: Check the night controls; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** whether sealed transport pots need an oxygen supply.

**Actual mission answer:** Keep the pots supplied with oxygen.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "t2" |
| player_sees | "Results: sealed planted pots fall to 1 mg/L oxygen overnight; ventilated pots stay at 7; fictional transport specification requires at least 6 mg/L throughout the trip." |
| player_must_determine | "Choose the packing plan supported by the full day-and-night evidence." |
| correct_result | "Fit ventilated lids" |
| most_tempting_wrong_result | "More food cannot substitute for oxygen at the aerobic chain end." |
| why_wrong_occurs | "More food cannot substitute for oxygen at the aerobic chain end." |
| story_consequence | "Approve the pot lids is recorded with its evidence on the Growth Hall log; Ventilated pot lids are fitted after the sealed-pot test." |


**Call — exact player copy:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at Light Panel.

**Stop reason — exact player copy:** The pot lids must be chosen before packing continues.

**Question card story setup — exact player copy:** The overnight comparison shows that the sealed planted pot behaves differently from both the ventilated pot and the empty control under matched conditions. Decide which lid design can keep the shipment above its stated oxygen requirement throughout transport.

**Question card story-science connection — exact player copy:** Keep the pots supplied with oxygen.

**Data/readings/options:** Results: sealed planted pots fall to 1 mg/L oxygen overnight; ventilated pots stay at 7; fictional transport specification requires at least 6 mg/L throughout the trip.

**Format-specific interaction block:**
```yaml
question: Choose the packing plan supported by the full day-and-night evidence.
choices:
- Fit ventilated lids
- Add sugar and seal tighter
- Use the daylight reading alone
- Block respiration in the roots
answer: Fit ventilated lids
rebuttals:
  Add sugar and seal tighter: More food cannot substitute for oxygen at the aerobic chain end.
  Use the daylight reading alone: Daylight production hides the night deficit in sealed pots.
  Block respiration in the roots: Root cells require ATP from respiration for continued function.
answerText: The sealed pots fail the campaign oxygen specification overnight, while the tested ventilated pots remain above it. Keep the pots supplied with oxygen.
why: The sealed pots fail the campaign oxygen specification overnight, while the tested ventilated pots remain above it. Ventilation allows exchange with an oxygen source and addresses the measured limit. Extra sugar cannot replace oxygen as the terminal electron acceptor, and a daylight reading misses the period when photosynthetic production is absent. Blocking respiration would remove a central source of ATP needed by the roots. The crew therefore adopts the tested lid design and keeps overnight readings in the release evidence log.
```

**Question card prompt — exact player copy:** Choose the packing plan supported by the full day-and-night evidence.

**Correct result:** "Fit ventilated lids"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The sealed pots fail the campaign oxygen specification overnight, while the tested ventilated pots remain above it. Keep the pots supplied with oxygen.

**Why/mechanism:** The sealed pots fail the campaign oxygen specification overnight, while the tested ventilated pots remain above it. Ventilation allows exchange with an oxygen source and addresses the measured limit. Extra sugar cannot replace oxygen as the terminal electron acceptor, and a daylight reading misses the period when photosynthetic production is absent. Blocking respiration would remove a central source of ATP needed by the roots. The crew therefore adopts the tested lid design and keeps overnight readings in the release evidence log.

**Mechanism links:** Energy coupling, Selective exchange, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** More food cannot substitute for oxygen at the aerobic chain end.

**Wrong-path feedback:**

- More food cannot substitute for oxygen at the aerobic chain end.
- Daylight production hides the night deficit in sealed pots.
- Root cells require ATP from respiration for continued function.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Approve the pot lids is recorded with its evidence on the Growth Hall log; Ventilated pot lids are fitted after the sealed-pot test.

**Unlock:** M3-B4 and mission outcome.

**Retrieval:** M1 Stop 3 (Check the stored mix); M1 Stop 4 (Change the nursery feed)

**Later payoff:** Mission 5 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 12 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Keep the pots supplied with oxygen. The sealed pot loses oxygen at night. The crew uses the plan just chosen. The restored plants flower at an unexpected time.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 3 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Ventilated pot lids are fitted after the sealed-pot test. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +3 | Receiving Habitat +3 | Care Supplies -2 | Island Health +4

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [2, 2, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [59, 58, 86, 73]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Plants respire in light and darkness.
- Light reactions supply ATP and NADPH; carbon fixation builds organic molecules.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Keep the pots supplied with oxygen.

---


# Mission 4 — THE WRONG KIND OF RECOVERY

## A. Mission briefing card — exact player copy

**Header:** DAY 4 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE WRONG KIND OF RECOVERY

**Go now:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at the Growth Bench.

**Card body:** The pots now keep enough oxygen, and the nursery plants begin to recover. Light can change which genes a plant uses as well as how much food it makes. Compare enzyme tests and leaf responses at the Growth Bench. By the end of the mission, decide whether the old lamp program is ready for wider use.

**Objective:** Resolve whether the old lamp program is ready for wider use; a rushed change could damage the whole nursery.

### Worth knowing first — exact player copy

#### Glossary terms

- Signal: A cue that a cell can detect and respond to.
- Receptor: A molecule that binds or detects a signal.
- Gene expression: Use of genetic instructions to make RNA or protein.
- Negative feedback: A response that opposes the change that triggered it.
- Substrate: The molecule an enzyme acts on.
- Active site: The region where an enzyme binds and acts on its substrate.
- Allosteric site: A binding region separate from the active site that can change protein activity.
- Denaturation: Loss of a molecule’s functional folded structure.
- Transcription factor: A protein that helps regulate transcription of genes.
- Transcript: An RNA product copied from a DNA template.

#### Primer concepts

- Enzymes lower activation energy without changing the overall energy difference.
- Signal reception can alter gene expression through intermediate steps.
- A local growth response does not prove a whole release plan works.

#### Equations first needed today

No new equation is needed today; retrieve the recorded relationships and biological pathways from the mission log.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. An enzyme lowers an activation barrier from 40 to 15 units; the barrier falls by 25, but reactant and product energies need not change.

2. A signal binds a receptor, activates relay proteins, and increases transcription; the response follows reception through transduction.

3. Body temperature rises and sweating cools it; the output opposes the change, so this is negative feedback.

4. Clotting recruits more clotting activity; the output reinforces itself, so this is positive feedback.

5. Two plants share DNA but receive different day lengths; different gene expression can produce different flowering times without a DNA mutation.

**Authoring-only failure consequence:** A rushed change could damage the whole nursery.

**Authoring-only later travel:** All work remains in this room.

## B. Main story happening — designer summary

The pots now keep enough oxygen, and the nursery plants begin to recover. The four-stop chain establishes separate enzyme problems, uses it to follow the light response, then read the recovered leaves supplies the discriminating evidence for limit the reset. A limited lamp trial replaces the proposed full nursery reset. A flowering calendar no longer matches the insect log. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the old lamp program is ready for wider use. Actual final answer: Keep the old lamp program in a small trial. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M4-B1 — On arrival at Growth Hall

**Location:** Growth Hall.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The pots now keep enough oxygen, and the nursery plants begin to recover.

**Dialogue bubble — Ivo Reed, plant physiologist:** “The lamp trial must not hide an enzyme problem.”

**Unlocks:** Stop 13.

### Beat M4-B2 — After Stops 13 and 14

**Location:** Growth Hall.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Separate enzyme problems and Follow the light response with their accepted results.

**Panel/HUD text:** “The crew needs to distinguish changed gene use from changed DNA.”

**Unlocks:** Stop 15 at Growth Hall.

### Beat M4-B4 — After Stop 16

**Location:** Growth Hall.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** A limited lamp trial replaces the proposed full nursery reset.

**Panel/HUD text:** “Keep the old lamp program in a small trial.”

**Unlocks:** The ungraded aftermath.

### Beat M4-BE — At mission end

**Location:** Growth Hall.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** A limited lamp trial replaces the proposed full nursery reset. A flowering calendar no longer matches the insect log.

**Dialogue bubble — Ivo Reed, plant physiologist:** “A flowering calendar no longer matches the insect log.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**1 locations:** Growth Hall.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 13 | Growth Hall | growth-bench | The lamp trial must not hide an enzyme problem. |
| 14 | Growth Hall | growth-bench | The trial needs a model for the changed growth timing. |
| 15 | Growth Hall | growth-bench | The crew needs to distinguish changed gene use from changed DNA. |
| 16 | Growth Hall | light-panel | A local growth result must set the scale of the reset. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Ivo Reed, plant physiologist, begins by owning the local evidence. The conflict is between a rushed change could damage the whole nursery. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **3 — Protein structure and enzymes:** The four observations distinguish mechanisms that can all lower a measured rate.

- **11 — Signals and feedback:** The lamp is an environmental cue as well as an energy source.

- **19 — Regulation and differentiation:** The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison.

- **11 — Signals and feedback:** The local response is real, but its interpretation has limits.

Reception, transduction and response describe signal flow. Local paracrine signals act nearby; endocrine signals travel through an organism; synaptic signals act across a synapse; direct contact can involve junctions. Cascades can amplify a signal. Negative feedback opposes a change, while positive feedback reinforces one. These descriptions do not imply every plant uses an animal blood-borne hormone pathway.

## H1. Stop 13 — Separate enzyme problems

**Format/placement:** PROTOCOL, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 3 — Protein structure and enzymes; Keystone: Structure and function, Regulation and feedback; Area: GROW; Prerequisites: Mission primer and Stop 12: Approve the pot lids; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the old lamp program is ready for wider use.

**Actual mission answer:** Keep the old lamp program in a small trial.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The pots now keep enough oxygen, and the nursery plants begin to recover." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Extra substrate restores rate with reversible active-site blocker"}, {"id": "e2", "label": "Extra substrate does not restore rate with allosteric blocker"}, {"id": "e3", "label": "Extreme heat destroys folded enzyme activity"}, {"id": "e4", "label": "Catalyst lowers barrier but not reactant-product energy difference"}], "choices": [{"id": "r4", "label": "Activation-energy change"}, {"id": "r3", "label": "Denaturation"}, {"id": "r2", "label": "Noncompetitive inhibition in the stated model"}, {"id": "r1", "label": "Competitive inhibition"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Extra substrate restores rate with reversible active-site blocker supports Competitive inhibition; Activation-energy change describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Extra substrate restores rate with reversible active-site blocker supports Competitive inhibition; Denaturation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Extra substrate restores rate with reversible active-site blocker supports Competitive inhibition; Noncompetitive inhibition in the stated model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Extra substrate does not restore rate with allosteric blocker supports Noncompetitive inhibition in the stated model; Activation-energy change describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Extra substrate does not restore rate with allosteric blocker supports Noncompetitive inhibition in the stated model; Denaturation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Extra substrate does not restore rate with allosteric blocker supports Noncompetitive inhibition in the stated model; Competitive inhibition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Extreme heat destroys folded enzyme activity supports Denaturation; Activation-energy change describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Extreme heat destroys folded enzyme activity supports Denaturation; Noncompetitive inhibition in the stated model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Extreme heat destroys folded enzyme activity supports Denaturation; Competitive inhibition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Catalyst lowers barrier but not reactant-product energy difference supports Activation-energy change; Denaturation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Catalyst lowers barrier but not reactant-product energy difference supports Activation-energy change; Noncompetitive inhibition in the stated model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Catalyst lowers barrier but not reactant-product energy difference supports Activation-energy change; Competitive inhibition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The four observations distinguish mechanisms that can all lower a measured rate. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Competitive and noncompetitive responses differ when substrate rises." |
| why_wrong_occurs | "Competitive and noncompetitive responses differ when substrate rises." |
| story_consequence | "Separate enzyme problems is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The lamp trial must not hide an enzyme problem.

**Question card story setup — exact player copy:** The oxygen problem is controlled, and the nursery is considering an old lamp schedule to speed the recovery of its growing trays. Separate possible enzyme effects before the staff treats every slow response as a shortage of light.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Extra substrate restores rate with reversible active-site blocker
- id: e2
  label: Extra substrate does not restore rate with allosteric blocker
- id: e3
  label: Extreme heat destroys folded enzyme activity
- id: e4
  label: Catalyst lowers barrier but not reactant-product energy difference
choices:
- id: r4
  label: Activation-energy change
- id: r3
  label: Denaturation
- id: r2
  label: Noncompetitive inhibition in the stated model
- id: r1
  label: Competitive inhibition
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Extra substrate restores rate with reversible active-site blocker supports Competitive inhibition; Activation-energy change describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Extra substrate restores rate with reversible active-site blocker supports Competitive inhibition; Denaturation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Extra substrate restores rate with reversible active-site blocker supports Competitive inhibition; Noncompetitive inhibition in the stated model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Extra substrate does not restore rate with allosteric blocker supports Noncompetitive inhibition in the stated model; Activation-energy change describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Extra substrate does not restore rate with allosteric blocker supports Noncompetitive inhibition in the stated model; Denaturation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Extra substrate does not restore rate with allosteric blocker supports Noncompetitive inhibition in the stated model; Competitive inhibition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Extreme heat destroys folded enzyme activity supports Denaturation; Activation-energy change describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Extreme heat destroys folded enzyme activity supports Denaturation; Noncompetitive inhibition in the stated model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Extreme heat destroys folded enzyme activity supports Denaturation; Competitive inhibition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Catalyst lowers barrier but not reactant-product energy difference supports Activation-energy change; Denaturation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Catalyst lowers barrier but not reactant-product energy difference supports Activation-energy change; Noncompetitive inhibition in the stated model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Catalyst lowers barrier but not reactant-product energy difference supports Activation-energy change; Competitive inhibition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The four observations distinguish mechanisms that can all lower a measured rate. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The four observations distinguish mechanisms that can all lower a measured rate. This result is now recorded for the next comparison.

**Why/mechanism:** The four observations distinguish mechanisms that can all lower a measured rate. Competitive inhibition can be overcome by enough substrate in the stated model; a pure noncompetitive effect is not removed that way. Extreme heat can disrupt the interactions maintaining protein shape. A catalyst changes the activation barrier rather than the overall energy balance. These distinctions keep the lamp trial from treating every slow-growing tray as short of light when enzyme function could instead be limiting.

**Mechanism links:** Structure and function, Regulation and feedback are the specific broader principles used in the explanation above.

**Misconception:** Competitive and noncompetitive responses differ when substrate rises.

**Wrong-path feedback:**

- Competitive and noncompetitive responses differ when substrate rises.
- Denaturation changes functional structure rather than supplying extra energy.
- A lower activation barrier does not change the net energy balance.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Separate enzyme problems is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 14.

**Retrieval:** M2 Stop 5 (Identify the damaged cells); M2 Stop 6 (Compare exchange surfaces); M2 Stop 8 (Set the packing rinse)

**Later payoff:** Mission 6 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 13 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 14 — Follow the light response

**Format/placement:** SEQUENCE, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 11 — Signals and feedback; Keystone: Regulation and feedback, Information flow; Area: GROW; Prerequisites: Mission primer and Stop 13: Separate enzyme problems; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the old lamp program is ready for wider use.

**Actual mission answer:** Keep the old lamp program in a small trial.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | {"cards": [{"id": "p4", "label": "New protein amounts change the growth response"}, {"id": "p3", "label": "Transcription factors change target-gene transcription"}, {"id": "p2", "label": "Relay molecules pass the signal inside the cell"}, {"id": "p1", "label": "A plant receptor detects the changed light cue"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Each upstream event supplies the condition required by the next.", "prerequisite_feedback": {"p2": "Relay molecules pass the signal inside the cell requires the prior stated condition: A plant receptor detects the changed light cue. Restore this dependency and retry the full causal order.", "p3": "Transcription factors change target-gene transcription requires the prior stated condition: Relay molecules pass the signal inside the cell. Restore this dependency and retry the full causal order.", "p4": "New protein amounts change the growth response requires the prior stated condition: Transcription factors change target-gene transcription. Restore this dependency and retry the full causal order."}, "answerText": "The lamp is an environmental cue as well as an energy source. This result is now recorded for the next comparison."} |
| player_must_determine | "Place every card in the biological causal order; submit the whole order." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "Protein response before transcription omits the stated source of the changed protein amount." |
| why_wrong_occurs | "Protein response before transcription omits the stated source of the changed protein amount." |
| story_consequence | "Follow the light response is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The trial needs a model for the changed growth timing.

**Question card story setup — exact player copy:** The enzyme comparisons separate several ways that growth can slow, but the old lamps also change the timing of new leaf growth. Trace the light-response pathway to decide what the lamps might alter beyond the energy supply.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: New protein amounts change the growth response
- id: p3
  label: Transcription factors change target-gene transcription
- id: p2
  label: Relay molecules pass the signal inside the cell
- id: p1
  label: A plant receptor detects the changed light cue
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: Each upstream event supplies the condition required by the next.
prerequisite_feedback:
  p2: 'Relay molecules pass the signal inside the cell requires the prior stated condition: A plant receptor detects the changed light cue. Restore this dependency and retry the full causal order.'
  p3: 'Transcription factors change target-gene transcription requires the prior stated condition: Relay molecules pass the signal inside the cell. Restore this dependency and retry the full causal order.'
  p4: 'New protein amounts change the growth response requires the prior stated condition: Transcription factors change target-gene transcription. Restore this dependency and retry the full causal order.'
answerText: The lamp is an environmental cue as well as an energy source. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Place every card in the biological causal order; submit the whole order.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The lamp is an environmental cue as well as an energy source. This result is now recorded for the next comparison.

**Why/mechanism:** The lamp is an environmental cue as well as an energy source. A receptor detects that cue, internal relay molecules transmit it, and transcription factors can change which genes are transcribed. Altered protein abundance can then change growth or flowering. This information pathway does not require changing the DNA sequence. The ordered model makes the trial testable: a changed growth response alone cannot establish whether the old lamp schedule is suitable for the organisms that now depend on these plants.

**Mechanism links:** Regulation and feedback, Information flow are the specific broader principles used in the explanation above.

**Misconception:** Protein response before transcription omits the stated source of the changed protein amount.

**Wrong-path feedback:**

- Protein response before transcription omits the stated source of the changed protein amount.
- A receptor acts at reception, not after the final growth response.
- Changing expression does not require a new DNA sequence.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Follow the light response is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 15.

**Retrieval:** Uses the current mission primer and immediate prior result; no delayed retrieval claimed.

**Later payoff:** Mission 6 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 14 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 15 — Read the recovered leaves

**Format/placement:** DIAGNOSIS, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** discriminate explanations from all readings.

**Metadata:** Concept: 19 — Regulation and differentiation; Keystone: Information flow, Regulation and feedback, Experimental evidence; Area: GROW; Prerequisites: Mission primer and Stop 14: Follow the light response; Learning role: INTRODUCE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** whether the old lamp program is ready for wider use.

**Actual mission answer:** Keep the old lamp program in a small trial.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | {"headline": "Read the recovered leaves", "readings": [{"zone": "DNA", "label": "Target sequence", "value": "Unchanged in both lamp groups", "status": "normal"}, {"zone": "RNA", "label": "Target transcript", "value": "Fourfold higher under old lamp schedule", "status": "watch"}, {"zone": "Protein", "label": "Target protein", "value": "Higher under old lamp schedule", "status": "watch"}, {"zone": "Control", "label": "Temperature", "value": "Equal in both groups", "status": "normal"}], "choices": [{"label": "Light changes gene expression", "mechanism": "Light changes gene expression"}, {"label": "Light rewrites every target gene", "mechanism": "Light rewrites every target gene"}, {"label": "Heat destroys all enzymes", "mechanism": "Heat destroys all enzymes"}, {"label": "The assay measures no response", "mechanism": "The assay measures no response"}], "answer": "Light changes gene expression", "rebuttals": {"Light rewrites every target gene": "The measured DNA sequence is unchanged.", "Heat destroys all enzymes": "Equal temperature and rising target protein contradict universal heat damage.", "The assay measures no response": "RNA and protein both show a measured response."}, "answerText": "The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison. This result is now recorded for the next comparison.", "why": "The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison. Higher RNA and protein under the old light schedule support altered gene expression, while equal temperature weakens the heat explanation. The response shows that the plants can use the old cue; it does not establish that their flowering time still matches field partners. The nursery therefore treats restored growth as a limited success and keeps the experiment small enough to compare its wider consequences."} |
| player_must_determine | "Read every measurement, including the normal control, and submit the one explanation consistent with them all." |
| correct_result | "Light changes gene expression" |
| most_tempting_wrong_result | "The measured DNA sequence is unchanged." |
| why_wrong_occurs | "The measured DNA sequence is unchanged." |
| story_consequence | "Read the recovered leaves is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The crew needs to distinguish changed gene use from changed DNA.

**Question card story setup — exact player copy:** The signal pathway predicts that a lamp cue could change gene use without replacing the inherited instructions inside the plants being tested. Compare sequence, RNA and protein evidence before deciding what the recovered leaves actually prove about the treatment.

**Question card story-science connection — exact player copy:** An explanation must survive the normal controls before it can justify changing the release stock.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
headline: Read the recovered leaves
readings:
- zone: DNA
  label: Target sequence
  value: Unchanged in both lamp groups
  status: normal
- zone: RNA
  label: Target transcript
  value: Fourfold higher under old lamp schedule
  status: watch
- zone: Protein
  label: Target protein
  value: Higher under old lamp schedule
  status: watch
- zone: Control
  label: Temperature
  value: Equal in both groups
  status: normal
choices:
- label: Light changes gene expression
  mechanism: Light changes gene expression
- label: Light rewrites every target gene
  mechanism: Light rewrites every target gene
- label: Heat destroys all enzymes
  mechanism: Heat destroys all enzymes
- label: The assay measures no response
  mechanism: The assay measures no response
answer: Light changes gene expression
rebuttals:
  Light rewrites every target gene: The measured DNA sequence is unchanged.
  Heat destroys all enzymes: Equal temperature and rising target protein contradict universal heat damage.
  The assay measures no response: RNA and protein both show a measured response.
answerText: The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison. This result is now recorded for the next comparison.
why: The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison. Higher RNA and protein under the old light schedule support altered gene expression, while equal temperature weakens the heat explanation. The response shows that the plants can use the old cue; it does not establish that their flowering time still matches field partners. The nursery therefore treats restored growth as a limited success and keeps the experiment small enough to compare its wider consequences.
```

**Question card prompt — exact player copy:** Read every measurement, including the normal control, and submit the one explanation consistent with them all.

**Correct result:** "Light changes gene expression"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison. This result is now recorded for the next comparison.

**Why/mechanism:** The unchanged target DNA sequence rules out the proposed sequence rewrite in this comparison. Higher RNA and protein under the old light schedule support altered gene expression, while equal temperature weakens the heat explanation. The response shows that the plants can use the old cue; it does not establish that their flowering time still matches field partners. The nursery therefore treats restored growth as a limited success and keeps the experiment small enough to compare its wider consequences.

**Mechanism links:** Information flow, Regulation and feedback, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The measured DNA sequence is unchanged.

**Wrong-path feedback:**

- The measured DNA sequence is unchanged.
- Equal temperature and rising target protein contradict universal heat damage.
- RNA and protein both show a measured response.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Read the recovered leaves is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 16.

**Retrieval:** M1 Stop 3 (Check the stored mix); M1 Stop 4 (Change the nursery feed); M2 Stop 7 (Explain the swelling)

**Later payoff:** Mission 6 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 15 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 16 — Limit the reset

**Format/placement:** CHOICE, Ivo Reed at Growth Hall — Light Panel.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 11 — Signals and feedback; Keystone: Regulation and feedback, Experimental evidence; Area: GROW; Prerequisites: Mission primer and Stop 15: Read the recovered leaves; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Briefing decision advanced:** whether the old lamp program is ready for wider use.

**Actual mission answer:** Keep the old lamp program in a small trial.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "Light changes gene expression" |
| player_sees | "Old lamps improve leaf growth; target DNA is unchanged; RNA and protein increase; field pollinator timing has not yet been checked." |
| player_must_determine | "Choose how far the nursery should apply the old lamp program now." |
| correct_result | "Keep a small monitored trial" |
| most_tempting_wrong_result | "Local growth does not certify unmeasured field dependencies." |
| why_wrong_occurs | "Local growth does not certify unmeasured field dependencies." |
| story_consequence | "Limit the reset is recorded with its evidence on the Growth Hall log; A limited lamp trial replaces the proposed full nursery reset." |


**Call — exact player copy:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at Light Panel.

**Stop reason — exact player copy:** A local growth result must set the scale of the reset.

**Question card story setup — exact player copy:** The sequence and expression records now support a real response to the old lamp schedule, but the nursery has not measured its field consequences. Decide how widely to apply the program while those missing comparisons are still possible.

**Question card story-science connection — exact player copy:** Keep the old lamp program in a small trial.

**Data/readings/options:** Old lamps improve leaf growth; target DNA is unchanged; RNA and protein increase; field pollinator timing has not yet been checked.

**Format-specific interaction block:**
```yaml
question: Choose how far the nursery should apply the old lamp program now.
choices:
- Keep a small monitored trial
- Reset every plant immediately
- Declare the seed line mutated
- Discard the light-response data
answer: Keep a small monitored trial
rebuttals:
  Reset every plant immediately: Local growth does not certify unmeasured field dependencies.
  Declare the seed line mutated: The target DNA comparison does not show a sequence change.
  Discard the light-response data: The expression measurements are useful evidence even though they do not settle release timing.
answerText: The local response is real, but its interpretation has limits. Keep the old lamp program in a small trial.
why: 'The local response is real, but its interpretation has limits. Light changed gene expression and improved growth without a detected target-sequence change. Neither result measures the timing or needs of the field pollinators. A small monitored trial preserves the useful evidence while preventing an untested schedule from being imposed across the nursery. The decision makes the next ecological comparison necessary: the crew must check whether the recovered plants and their partners remain active at the same time.'
```

**Question card prompt — exact player copy:** Choose how far the nursery should apply the old lamp program now.

**Correct result:** "Keep a small monitored trial"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The local response is real, but its interpretation has limits. Keep the old lamp program in a small trial.

**Why/mechanism:** The local response is real, but its interpretation has limits. Light changed gene expression and improved growth without a detected target-sequence change. Neither result measures the timing or needs of the field pollinators. A small monitored trial preserves the useful evidence while preventing an untested schedule from being imposed across the nursery. The decision makes the next ecological comparison necessary: the crew must check whether the recovered plants and their partners remain active at the same time.

**Mechanism links:** Regulation and feedback, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Local growth does not certify unmeasured field dependencies.

**Wrong-path feedback:**

- Local growth does not certify unmeasured field dependencies.
- The target DNA comparison does not show a sequence change.
- The expression measurements are useful evidence even though they do not settle release timing.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Limit the reset is recorded with its evidence on the Growth Hall log; A limited lamp trial replaces the proposed full nursery reset.

**Unlock:** M4-B4 and mission outcome.

**Retrieval:** M1 Stop 3 (Check the stored mix); M1 Stop 4 (Change the nursery feed); M2 Stop 7 (Explain the swelling)

**Later payoff:** Mission 6 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 16 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Keep the old lamp program in a small trial. The leaves grow, but field effects remain untested. The crew uses the plan just chosen. A flowering calendar no longer matches the insect log.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 4 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A limited lamp trial replaces the proposed full nursery reset. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +4 | Receiving Habitat +2 | Care Supplies -1 | Island Health +2

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [1, 3, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [64, 63, 85, 75]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Enzymes lower activation energy without changing the overall energy difference.
- Signal reception can alter gene expression through intermediate steps.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Keep the old lamp program in a small trial.

---


# Mission 5 — FLOWERS WITH NO VISITORS

## A. Mission briefing card — exact player copy

**Header:** DAY 5 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** FLOWERS WITH NO VISITORS

**Go now:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at the Growth Bench.

**Card body:** The lamp trial restored growth, but fewer insects visit its flowers. A flower and its pollinator must be active at the same time for their partnership to work. Compare flowering records, then inspect field counts at the Marsh Research Bay. By the end of the mission, decide whether to expand the restored flowering schedule.

**Objective:** Resolve whether to expand the restored flowering schedule; seed production could fall despite healthy leaves.

### Worth knowing first — exact player copy

#### Glossary terms

- Mutualism: An interaction that benefits both participating species.
- Niche: The resources and conditions a species uses and its ecological role.
- Pollinator: An animal that transfers pollen between flowers.
- Carbon fixation: Incorporation of carbon dioxide into organic molecules.

#### Primer concepts

- Light reactions and carbon fixation have different jobs and locations.
- Species interactions depend on timing as well as presence.
- A matched comparison can separate visitor shortage from dead flowers.

#### Equations first needed today

**Equation:** overlap = last shared day − first shared day + 1

**What it is for:** Count inclusive shared calendar days.

**Symbols:** Each day label is an integer; overlap is days.

**Why this campaign needs it:** Check flower and visitor timing.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. Light reactions occur in thylakoid membranes; carbon fixation occurs in the stroma, so swapping those locations breaks the model.

2. Six carbon dioxide molecules contribute six carbon atoms to one six-carbon sugar equivalent; oxygen gas released comes from water.

3. Flowers open days 2–6 and insects fly days 5–9; overlap is days 5 and 6, or two days.

4. A flower feeds an insect and receives pollen transfer; both benefit, so the interaction is mutualism.

5. A plant fixes 30 units of carbon and respires 12 over the same interval; net retained carbon is 18 units.

**Authoring-only failure consequence:** Seed production could fall despite healthy leaves.

**Authoring-only later travel:** After Stop 18, carry its evidence to Marsh Research Bay.

## B. Main story happening — designer summary

The lamp trial restored growth, but fewer insects visit its flowers. The four-stop chain establishes read what healthy leaves prove, uses it to find the shared flowering days, then compare field trays supplies the discriminating evidence for keep flowers available. The wider lamp reset is halted and staggered flower trays are retained. One rapidly growing tissue tray has unusual division counts. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether to expand the restored flowering schedule. Actual final answer: Stop the wider reset and keep a mixed flowering schedule. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M5-B1 — On arrival at Growth Hall

**Location:** Growth Hall.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The lamp trial restored growth, but fewer insects visit its flowers.

**Dialogue bubble — Ivo Reed, plant physiologist:** “Healthy leaves do not settle the missing-visitor problem.”

**Unlocks:** Stop 17.

### Beat M5-B2 — After Stops 17 and 18

**Location:** Growth Hall.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Read what healthy leaves prove and Find the shared flowering days with their accepted results.

**Panel/HUD text:** “The bay comparison must separate timing mismatch from insect loss. Go to Marsh Research Bay; its Water Rack holds the next comparison.”

**Unlocks:** Stop 19 at Marsh Research Bay.

### Beat M5-B4 — After Stop 20

**Location:** Marsh Research Bay.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The wider lamp reset is halted and staggered flower trays are retained.

**Panel/HUD text:** “Stop the wider reset and keep a mixed flowering schedule.”

**Unlocks:** The ungraded aftermath.

### Beat M5-BE — At mission end

**Location:** Marsh Research Bay.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The wider lamp reset is halted and staggered flower trays are retained. One rapidly growing tissue tray has unusual division counts.

**Dialogue bubble — Tess Rowan, field ecologist:** “One rapidly growing tissue tray has unusual division counts.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**2 locations:** Growth Hall → Marsh Research Bay.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 17 | Growth Hall | growth-bench | Healthy leaves do not settle the missing-visitor problem. |
| 18 | Growth Hall | growth-bench | The field visit needs the predicted flowering overlap. |
| 19 | Marsh Research Bay | water-rack | The bay comparison must separate timing mismatch from insect loss. |
| 20 | Marsh Research Bay | habitat-board | The wider lamp reset waits on the field result. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Ivo Reed, plant physiologist, begins by owning the local evidence. Tess Rowan, field ecologist, owns the final decision. The conflict is between seed production could fall despite healthy leaves. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **8 — Photosynthesis and carbon fixation:** Healthy photosynthetic leaves show that the plants can capture light and fix carbon under the test conditions.

- **27 — Species interactions and niches:** The overlap consists only of day 4.

- **27 — Species interactions and niches:** Only the old-program flower tray falls below its station-specific expected range.

- **27 — Species interactions and niches:** The plants recovered locally under the old lamps, but their flowering no longer overlaps well with the present field visitors.

This mission retrieves the prior mechanisms identified below and does not add a new major concept.

## H1. Stop 17 — Read what healthy leaves prove

**Format/placement:** PROTOCOL, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 8 — Photosynthesis and carbon fixation; Keystone: Energy coupling, Matter conservation; Area: GROW; Prerequisites: Mission primer and Stop 16: Limit the reset; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether to expand the restored flowering schedule.

**Actual mission answer:** Stop the wider reset and keep a mixed flowering schedule.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The lamp trial restored growth, but fewer insects visit its flowers." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Water split and oxygen released"}, {"id": "e2", "label": "ATP and NADPH used to fix carbon"}, {"id": "e3", "label": "Sugar oxidized with oxygen use"}, {"id": "e4", "label": "Pollen transferred between flowers"}], "choices": [{"id": "r4", "label": "Reproductive service by a visitor"}, {"id": "r3", "label": "Aerobic cellular respiration"}, {"id": "r2", "label": "Calvin-cycle reactions in stroma"}, {"id": "r1", "label": "Light reactions in thylakoids"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Water split and oxygen released supports Light reactions in thylakoids; Reproductive service by a visitor describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Water split and oxygen released supports Light reactions in thylakoids; Aerobic cellular respiration describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Water split and oxygen released supports Light reactions in thylakoids; Calvin-cycle reactions in stroma describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "ATP and NADPH used to fix carbon supports Calvin-cycle reactions in stroma; Reproductive service by a visitor describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "ATP and NADPH used to fix carbon supports Calvin-cycle reactions in stroma; Aerobic cellular respiration describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "ATP and NADPH used to fix carbon supports Calvin-cycle reactions in stroma; Light reactions in thylakoids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Sugar oxidized with oxygen use supports Aerobic cellular respiration; Reproductive service by a visitor describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Sugar oxidized with oxygen use supports Aerobic cellular respiration; Calvin-cycle reactions in stroma describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Sugar oxidized with oxygen use supports Aerobic cellular respiration; Light reactions in thylakoids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Pollen transferred between flowers supports Reproductive service by a visitor; Aerobic cellular respiration describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Pollen transferred between flowers supports Reproductive service by a visitor; Calvin-cycle reactions in stroma describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Pollen transferred between flowers supports Reproductive service by a visitor; Light reactions in thylakoids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "Healthy photosynthetic leaves show that the plants can capture light and fix carbon under the test conditions. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Pollen transfer is not a reaction inside a chloroplast." |
| why_wrong_occurs | "Pollen transfer is not a reaction inside a chloroplast." |
| story_consequence | "Read what healthy leaves prove is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** Healthy leaves do not settle the missing-visitor problem.

**Question card story setup — exact player copy:** The limited lamp trial has improved leaf growth, yet its flowers attract fewer visitors than the unchanged plants outside the low blockhouse. Separate the jobs of leaves and visitors before interpreting this apparent contradiction as another growth failure.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Water split and oxygen released
- id: e2
  label: ATP and NADPH used to fix carbon
- id: e3
  label: Sugar oxidized with oxygen use
- id: e4
  label: Pollen transferred between flowers
choices:
- id: r4
  label: Reproductive service by a visitor
- id: r3
  label: Aerobic cellular respiration
- id: r2
  label: Calvin-cycle reactions in stroma
- id: r1
  label: Light reactions in thylakoids
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Water split and oxygen released supports Light reactions in thylakoids; Reproductive service by a visitor describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Water split and oxygen released supports Light reactions in thylakoids; Aerobic cellular respiration describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Water split and oxygen released supports Light reactions in thylakoids; Calvin-cycle reactions in stroma describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: ATP and NADPH used to fix carbon supports Calvin-cycle reactions in stroma; Reproductive service by a visitor describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: ATP and NADPH used to fix carbon supports Calvin-cycle reactions in stroma; Aerobic cellular respiration describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: ATP and NADPH used to fix carbon supports Calvin-cycle reactions in stroma; Light reactions in thylakoids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Sugar oxidized with oxygen use supports Aerobic cellular respiration; Reproductive service by a visitor describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Sugar oxidized with oxygen use supports Aerobic cellular respiration; Calvin-cycle reactions in stroma describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Sugar oxidized with oxygen use supports Aerobic cellular respiration; Light reactions in thylakoids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Pollen transferred between flowers supports Reproductive service by a visitor; Aerobic cellular respiration describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Pollen transferred between flowers supports Reproductive service by a visitor; Calvin-cycle reactions in stroma describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Pollen transferred between flowers supports Reproductive service by a visitor; Light reactions in thylakoids describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: Healthy photosynthetic leaves show that the plants can capture light and fix carbon under the test conditions. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Healthy photosynthetic leaves show that the plants can capture light and fix carbon under the test conditions. This result is now recorded for the next comparison.

**Why/mechanism:** Healthy photosynthetic leaves show that the plants can capture light and fix carbon under the test conditions. They do not prove that pollen reaches flowers. Light reactions release oxygen from water and supply ATP and NADPH; carbon-fixation reactions build organic molecules, while respiration uses food to support cellular work. Pollinator visits are a separate reproductive process. Distinguishing these jobs explains why a nursery can report successful growth while the field team records poor seed production.

**Mechanism links:** Energy coupling, Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** Pollen transfer is not a reaction inside a chloroplast.

**Wrong-path feedback:**

- Pollen transfer is not a reaction inside a chloroplast.
- Respiration consumes organic fuel rather than fixing carbon dioxide.
- Light reactions and carbon fixation use different compartments and immediate inputs.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Read what healthy leaves prove is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 18.

**Retrieval:** M3 Stop 10 (Calculate the daylight balance); M3 Stop 11 (Check the night controls); M3 Stop 12 (Approve the pot lids)

**Later payoff:** Mission 7 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 17 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 18 — Find the shared flowering days

**Format/placement:** BALLPARK, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 27 — Species interactions and niches; Keystone: Species interactions, Experimental evidence; Area: GROW; Prerequisites: Mission primer and Stop 17: Read what healthy leaves prove; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether to expand the restored flowering schedule.

**Actual mission answer:** Stop the wider reset and keep a mixed flowering schedule.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Old-program flowers are open on days 1–4 inclusive; field pollinators are active on days 4–9 inclusive. The original field schedule was days 3–8." |
| player_must_determine | "For the old program, use shared last day minus shared first day plus one; submit overlap in days." |
| correct_result | 1 |
| most_tempting_wrong_result | "4 counts all flowering days rather than shared days." |
| why_wrong_occurs | "4 counts all flowering days rather than shared days." |
| story_consequence | "Find the shared flowering days is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The field visit needs the predicted flowering overlap.

**Question card story setup — exact player copy:** The process matches show that healthy leaves do not establish successful pollen transfer, and the old flowering calendar no longer matches the visitor log. Calculate the shared active days before the field team compares trays along the dunes.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** Old-program flowers are open on days 1–4 inclusive; field pollinators are active on days 4–9 inclusive. The original field schedule was days 3–8.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Find the shared flowering days
  units: days
  labels:
  - shared last day
  - shared first day
  - inclusive endpoint
  - field last day
  values:
  - 4
  - 4
  - 1
  - 9
  slots: 3
  template: '{0} {1} {2} → days'
  formula: a-b+c
  correct:
  - 0
  - 1
  - 2
  target: 1
  correctResult: 1
  tolerance: 0.05
answerText: The overlap consists only of day 4. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** For the old program, use shared last day minus shared first day plus one; submit overlap in days.

**Correct result:** 1; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The overlap consists only of day 4. This result is now recorded for the next comparison.

**Why/mechanism:** The overlap consists only of day 4. With inclusive endpoints, the count is 4 − 4 + 1 = 1 day. Counting the full flowering interval would include days when the recorded pollinators were absent; counting the entire insect interval would include days when those flowers were closed. This timing result provides a possible explanation for fewer visits, but the field comparison must still check whether visitors use flowers that remain open during their activity period.

**Mechanism links:** Species interactions, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** 4 counts all flowering days rather than shared days.

**Wrong-path feedback:**

- 4 counts all flowering days rather than shared days.
- 6 counts all insect days rather than shared days.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Find the shared flowering days is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 19.

**Retrieval:** M2 Stop 7 (Explain the swelling); M3 Stop 11 (Check the night controls); M3 Stop 12 (Approve the pot lids)

**Later payoff:** Mission 7 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 18 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 19 — Compare field trays

**Format/placement:** PROBE, Marsh Research Bay — Water Rack.

**Required stop kind:** operated/fixture. **Player verb:** sample and compare stations.

**Metadata:** Concept: 27 — Species interactions and niches; Keystone: Species interactions, Experimental evidence; Area: MARSH; Prerequisites: Mission primer and Stop 18: Find the shared flowering days; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** whether to expand the restored flowering schedule.

**Actual mission answer:** Stop the wider reset and keep a mixed flowering schedule.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 1 |
| player_sees | {"probe": {"stations": [{"id": "t1", "label": "Old-program flowers", "reading": "2 visits/hour", "expected": "8–12 visits/hour", "load": "equal flower count; matched weather"}, {"id": "t2", "label": "Staggered flowers", "reading": "10 visits/hour", "expected": "8–12 visits/hour", "load": "equal flower count; matched weather"}, {"id": "t3", "label": "Unchanged field flowers", "reading": "9 visits/hour", "expected": "8–12 visits/hour", "load": "equal flower count; matched weather"}, {"id": "t4", "label": "Open-tray pollen check", "reading": "8 transfers/hour", "expected": "7–9 transfers/hour", "load": "independent manual observation"}], "target": "t1", "correctChoice": "t1", "quantityAndUnits": "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.", "correctConclusion": "Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison.", "answerText": "Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison."}, "answerText": "Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison."} |
| player_must_determine | "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed." |
| correct_result | "t1" |
| most_tempting_wrong_result | "Staggered flowers receive the expected number of visits." |
| why_wrong_occurs | "Staggered flowers receive the expected number of visits." |
| story_consequence | "Compare field trays is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The bay comparison must separate timing mismatch from insect loss.

**Question card story setup — exact player copy:** The calendar comparison identifies a possible timing mismatch, but the team still needs to know whether insects are absent from all available flowers. Compare the matched field trays before deciding whether to expand the nursery lamp program.

**Question card story-science connection — exact player copy:** A station-specific failure identifies the comparison that must govern the next handling decision.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
probe:
  stations:
  - id: t1
    label: Old-program flowers
    reading: 2 visits/hour
    expected: 8–12 visits/hour
    load: equal flower count; matched weather
  - id: t2
    label: Staggered flowers
    reading: 10 visits/hour
    expected: 8–12 visits/hour
    load: equal flower count; matched weather
  - id: t3
    label: Unchanged field flowers
    reading: 9 visits/hour
    expected: 8–12 visits/hour
    load: equal flower count; matched weather
  - id: t4
    label: Open-tray pollen check
    reading: 8 transfers/hour
    expected: 7–9 transfers/hour
    load: independent manual observation
  target: t1
  correctChoice: t1
  quantityAndUnits: Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.
  correctConclusion: Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison.
  answerText: Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison.
answerText: Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.

**Correct result:** "t1"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Only the old-program flower tray falls below its station-specific expected range. This result is now recorded for the next comparison.

**Why/mechanism:** Only the old-program flower tray falls below its station-specific expected range. Staggered and unchanged flowers still receive visits, and the independent pollen observation is normal. The comparison therefore weakens a general insect disappearance explanation and supports a timing mismatch associated with the lamp program. These are teaching data from matched conditions, not a universal pollination threshold. The same intervention that improved leaf growth has reduced overlap with partners, so the field result changes how broadly the nursery should act.

**Mechanism links:** Species interactions, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Staggered flowers receive the expected number of visits.

**Wrong-path feedback:**

- Staggered flowers receive the expected number of visits.
- Unchanged flowers show that visitors are still present.
- The independent pollen check lies inside its expected range.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Compare field trays is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 20.

**Retrieval:** M2 Stop 7 (Explain the swelling); M3 Stop 11 (Check the night controls); M3 Stop 12 (Approve the pot lids)

**Later payoff:** Mission 7 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 19 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 20 — Keep flowers available

**Format/placement:** CHOICE, Tess Rowan at Marsh Research Bay — Habitat Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 27 — Species interactions and niches; Keystone: Species interactions, Regulation and feedback, Experimental evidence; Area: MARSH; Prerequisites: Mission primer and Stop 19: Compare field trays; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Briefing decision advanced:** whether to expand the restored flowering schedule.

**Actual mission answer:** Stop the wider reset and keep a mixed flowering schedule.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "t1" |
| player_sees | "Recorded: old-program overlap is one day; old-program trays receive 2 visits/hour; staggered trays receive 10 and unchanged field flowers 9." |
| player_must_determine | "Choose the nursery action supported by both timing and field observations." |
| correct_result | "Keep a mixed flowering schedule" |
| most_tempting_wrong_result | "Expanding the old schedule repeats the observed timing mismatch." |
| why_wrong_occurs | "Expanding the old schedule repeats the observed timing mismatch." |
| story_consequence | "Keep flowers available is recorded with its evidence on the Marsh Research Bay log; The wider lamp reset is halted and staggered flower trays are retained." |


**Call — exact player copy:** Go to Marsh Research Bay and meet Tess Rowan, field ecologist, at Habitat Board.

**Stop reason — exact player copy:** The wider lamp reset waits on the field result.

**Question card story setup — exact player copy:** The field trays show that visitors still use staggered and unchanged flowers, while the old-program flowers receive far fewer visits under matched conditions. Choose the nursery schedule that respects this evidence without denying the earlier improvement in leaf growth.

**Question card story-science connection — exact player copy:** Stop the wider reset and keep a mixed flowering schedule.

**Data/readings/options:** Recorded: old-program overlap is one day; old-program trays receive 2 visits/hour; staggered trays receive 10 and unchanged field flowers 9.

**Format-specific interaction block:**
```yaml
question: Choose the nursery action supported by both timing and field observations.
choices:
- Expand the old program
- Keep a mixed flowering schedule
- Remove every field insect
- Call leaf growth a release test
answer: Keep a mixed flowering schedule
rebuttals:
  Expand the old program: Expanding the old schedule repeats the observed timing mismatch.
  Remove every field insect: Field insects are providing the pollen-transfer service.
  Call leaf growth a release test: Leaf growth does not measure pollen transfer or seed production.
answerText: The plants recovered locally under the old lamps, but their flowering no longer overlaps well with the present field visitors. Stop the wider reset and keep a mixed flowering schedule.
why: 'The plants recovered locally under the old lamps, but their flowering no longer overlaps well with the present field visitors. Staggered trays retain visits, so the evidence supports preserving a spread of flowering times while the team measures seed production. Removing insects would destroy the observed service, and leaf growth alone does not test reproduction. The reversal changes the meaning of the earlier success without changing its facts: healthy leaves were real, but they were never enough to certify a functioning partnership.'
```

**Question card prompt — exact player copy:** Choose the nursery action supported by both timing and field observations.

**Correct result:** "Keep a mixed flowering schedule"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The plants recovered locally under the old lamps, but their flowering no longer overlaps well with the present field visitors. Stop the wider reset and keep a mixed flowering schedule.

**Why/mechanism:** The plants recovered locally under the old lamps, but their flowering no longer overlaps well with the present field visitors. Staggered trays retain visits, so the evidence supports preserving a spread of flowering times while the team measures seed production. Removing insects would destroy the observed service, and leaf growth alone does not test reproduction. The reversal changes the meaning of the earlier success without changing its facts: healthy leaves were real, but they were never enough to certify a functioning partnership.

**Mechanism links:** Species interactions, Regulation and feedback, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Expanding the old schedule repeats the observed timing mismatch.

**Wrong-path feedback:**

- Expanding the old schedule repeats the observed timing mismatch.
- Field insects are providing the pollen-transfer service.
- Leaf growth does not measure pollen transfer or seed production.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Keep flowers available is recorded with its evidence on the Marsh Research Bay log; The wider lamp reset is halted and staggered flower trays are retained.

**Unlock:** M5-B4 and mission outcome.

**Retrieval:** M2 Stop 7 (Explain the swelling); M3 Stop 11 (Check the night controls); M3 Stop 12 (Approve the pot lids)

**Later payoff:** Mission 7 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 20 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Stop the wider reset and keep a mixed flowering schedule. The mixed trays still get insect visits. The crew uses the plan just chosen. One rapidly growing tissue tray has unusual division counts.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 5 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The wider lamp reset is halted and staggered flower trays are retained. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +4 | Receiving Habitat +1 | Care Supplies -2 | Island Health -3

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 4, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [68, 68, 83, 72]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Light reactions and carbon fixation have different jobs and locations.
- Species interactions depend on timing as well as presence.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Stop the wider reset and keep a mixed flowering schedule.

---


# Mission 6 — THE TRAY THAT WILL NOT STOP

## A. Mission briefing card — exact player copy

**Header:** DAY 6 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE TRAY THAT WILL NOT STOP

**Go now:** Go to Field Clinic and meet Mara Vale, veterinary biologist, at the Sample Bench.

**Card body:** The flower schedule is changing, but one tissue tray keeps growing after its neighbors stop. Cells use signals and checkpoints to control when they divide. Compare cell counts in the clinic, then inspect the tissue records in the Genetics Trailer. By the end of the mission, decide whether the unusual tissue tray can join the release stock.

**Objective:** Resolve whether the unusual tissue tray can join the release stock; unexplained growth could enter release stock.

### Worth knowing first — exact player copy

#### Glossary terms

- Cell cycle: The sequence of growth, DNA copying and cell division.
- Checkpoint: A control that delays cell-cycle progress until a requirement is met.
- Mitosis: Division of a nucleus into two nuclei with matching chromosome sets.
- Apoptosis: Regulated cell death.
- Transduction: Steps that relay a detected signal inside a cell.
- Chromosome: A DNA molecule with associated proteins carrying genetic information.
- Chromatid: One of the two copied chromosome units before separation.
- Centromere: The chromosome region used here to count chromosomes and attach division machinery.
- Cytokinesis: Division of cell contents into daughter cells.
- Diploid: Having two chromosome sets.
- Haploid: Having one chromosome set.

#### Primer concepts

- DNA is copied during S phase before division.
- Chromosomes must be attached correctly before sister chromatids separate.
- Rapid growth alone does not prove cancer or identify a mutation.

#### Equations first needed today

**Equation:** dividing fraction (%) = dividing cells / counted cells × 100

**What it is for:** Compare cell-cycle samples.

**Symbols:** Both counts refer to the same sample; fraction is percent.

**Why this campaign needs it:** Quantify the unusual tissue sample.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. Twenty cells enter mitosis once and all divide; 40 daughter cells result, not 80.

2. A diploid cell with 8 chromosomes copies its DNA; it still has 8 chromosomes counted by centromeres, now with 16 chromatids.

3. A damaged cell delays entry into S phase; a checkpoint can prevent damaged DNA from being copied.

4. A growth signal is removed and cells stop dividing; the response supports signal dependence under that condition.

5. A tissue loses one regulator but remains controlled by others; one mutation alone need not establish cancer.

**Authoring-only failure consequence:** Unexplained growth could enter release stock.

**Authoring-only later travel:** After Stop 22, carry its evidence to Genetics Trailer.

## B. Main story happening — designer summary

The flower schedule is changing, but one tissue tray keeps growing after its neighbors stop. The four-stop chain establishes place the cell-cycle evidence, uses it to compare dividing fractions, then test the growth signal supplies the discriminating evidence for hold one line. The unusual tissue line is separated and the healthy lines stay in care. The held tray came from a small set of related parents. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the unusual tissue tray can join the release stock. Actual final answer: Hold the unusual tissue tray for further tests. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M6-B1 — On arrival at Field Clinic

**Location:** Field Clinic.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The flower schedule is changing, but one tissue tray keeps growing after its neighbors stop.

**Dialogue bubble — Mara Vale, veterinary biologist:** “The unusual growth needs a cell-cycle record.”

**Unlocks:** Stop 21.

### Beat M6-B2 — After Stops 21 and 22

**Location:** Field Clinic.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Place the cell-cycle evidence and Compare dividing fractions with their accepted results.

**Panel/HUD text:** “The tray needs a control test rather than a growth-rate label. Go to Genetics Trailer; its Records Board holds the next comparison.”

**Unlocks:** Stop 23 at Genetics Trailer.

### Beat M6-B4 — After Stop 24

**Location:** Genetics Trailer.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The unusual tissue line is separated and the healthy lines stay in care.

**Panel/HUD text:** “Hold the unusual tissue tray for further tests.”

**Unlocks:** The ungraded aftermath.

### Beat M6-BE — At mission end

**Location:** Genetics Trailer.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The unusual tissue line is separated and the healthy lines stay in care. The held tray came from a small set of related parents.

**Dialogue bubble — Nell Shah, conservation geneticist:** “The held tray came from a small set of related parents.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**2 locations:** Field Clinic → Genetics Trailer.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 21 | Field Clinic | sample-bench | The unusual growth needs a cell-cycle record. |
| 22 | Field Clinic | sample-bench | The geneticist needs the dividing-cell fraction before the signal test. |
| 23 | Genetics Trailer | records-board | The tray needs a control test rather than a growth-rate label. |
| 24 | Genetics Trailer | records-board | The untested tissue line cannot enter release stock by default. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Mara Vale, veterinary biologist, begins by owning the local evidence. Nell Shah, conservation geneticist, owns the final decision. The conflict is between unexplained growth could enter release stock. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **12 — Cell cycle and checkpoints:** The cell cycle provides an order for interpreting the tissue counts.

- **12 — Cell cycle and checkpoints:** The observed dividing fraction is 18/60 × 100 = 30 percent.

- **11 — Signals and feedback:** The unusual tissue continues dividing when the same signal-removal treatment stops the matched control.

- **12 — Cell cycle and checkpoints:** The controlled signal test gives a concrete reason to hold the unusual tissue line while keeping its evidence and relatives available for further study.

G0 is a nondividing state; G1 precedes DNA replication in S, G2 follows it, and mitosis includes prophase, metaphase, anaphase and telophase before or overlapping cytokinesis as appropriate. The simplified sequence grades dependencies, not every microscopic transition. Checkpoint regulators limit damaged or misaligned division; several failures can contribute to cancer, and programmed apoptosis can remove damaged cells. A control failure in this tissue is a finding, not a named clinical diagnosis.

## H1. Stop 21 — Place the cell-cycle evidence

**Format/placement:** SEQUENCE, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 12 — Cell cycle and checkpoints; Keystone: Regulation and feedback, Information flow; Area: CLINIC; Prerequisites: Mission primer and Stop 20: Keep flowers available; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the unusual tissue tray can join the release stock.

**Actual mission answer:** Hold the unusual tissue tray for further tests.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The flower schedule is changing, but one tissue tray keeps growing after its neighbors stop." |
| player_sees | {"cards": [{"id": "p4", "label": "Mitosis separates copied chromosomes before cytokinesis"}, {"id": "p3", "label": "The cell prepares for division during G2"}, {"id": "p2", "label": "DNA is copied during S phase"}, {"id": "p1", "label": "A cell grows during G1"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Each upstream event supplies the condition required by the next.", "prerequisite_feedback": {"p2": "DNA is copied during S phase requires the prior stated condition: A cell grows during G1. Restore this dependency and retry the full causal order.", "p3": "The cell prepares for division during G2 requires the prior stated condition: DNA is copied during S phase. Restore this dependency and retry the full causal order.", "p4": "Mitosis separates copied chromosomes before cytokinesis requires the prior stated condition: The cell prepares for division during G2. Restore this dependency and retry the full causal order."}, "answerText": "The cell cycle provides an order for interpreting the tissue counts. This result is now recorded for the next comparison."} |
| player_must_determine | "Place every card in the biological causal order; submit the whole order." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "Mitosis before DNA copying would not supply matching copies to both daughters." |
| why_wrong_occurs | "Mitosis before DNA copying would not supply matching copies to both daughters." |
| story_consequence | "Place the cell-cycle evidence is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The unusual growth needs a cell-cycle record.

**Question card story setup — exact player copy:** The nursery is keeping flowers available, but a tissue tray continues growing after neighboring trays have stopped under the same care schedule. Put the cell-cycle stages in order before the clinic compares where the unusual line differs.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: Mitosis separates copied chromosomes before cytokinesis
- id: p3
  label: The cell prepares for division during G2
- id: p2
  label: DNA is copied during S phase
- id: p1
  label: A cell grows during G1
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: Each upstream event supplies the condition required by the next.
prerequisite_feedback:
  p2: 'DNA is copied during S phase requires the prior stated condition: A cell grows during G1. Restore this dependency and retry the full causal order.'
  p3: 'The cell prepares for division during G2 requires the prior stated condition: DNA is copied during S phase. Restore this dependency and retry the full causal order.'
  p4: 'Mitosis separates copied chromosomes before cytokinesis requires the prior stated condition: The cell prepares for division during G2. Restore this dependency and retry the full causal order.'
answerText: The cell cycle provides an order for interpreting the tissue counts. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Place every card in the biological causal order; submit the whole order.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The cell cycle provides an order for interpreting the tissue counts. This result is now recorded for the next comparison.

**Why/mechanism:** The cell cycle provides an order for interpreting the tissue counts. DNA copying belongs to S phase, before the copied chromosomes separate during mitosis. Cytokinesis divides the cell contents after nuclear division in the simplified sequence used here. Counting more cells does not by itself reveal which control failed. The clinic first needs to know where the unusual tray differs, so the ordered record establishes the stages that the geneticist can compare with signaling and checkpoint evidence.

**Mechanism links:** Regulation and feedback, Information flow are the specific broader principles used in the explanation above.

**Misconception:** Mitosis before DNA copying would not supply matching copies to both daughters.

**Wrong-path feedback:**

- Mitosis before DNA copying would not supply matching copies to both daughters.
- Cytokinesis is division of cell contents, not DNA replication.
- G2 prepares for division after copying, not before G1.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Place the cell-cycle evidence is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 22.

**Retrieval:** M4 Stop 14 (Follow the light response); M4 Stop 15 (Read the recovered leaves); M4 Stop 16 (Limit the reset)

**Later payoff:** Mission 8 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 21 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 22 — Compare dividing fractions

**Format/placement:** BALLPARK, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 12 — Cell cycle and checkpoints; Keystone: Regulation and feedback, Experimental evidence; Area: CLINIC; Prerequisites: Mission primer and Stop 21: Place the cell-cycle evidence; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the unusual tissue tray can join the release stock.

**Actual mission answer:** Hold the unusual tissue tray for further tests.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | "The unusual tray has 18 dividing cells among 60 counted cells; a matched normal tray has 6 among 60." |
| player_must_determine | "Use dividing cells divided by total cells times 100; submit the unusual tray fraction as a percent." |
| correct_result | 30 |
| most_tempting_wrong_result | "10 uses the normal tray count instead of the unusual tray count." |
| why_wrong_occurs | "10 uses the normal tray count instead of the unusual tray count." |
| story_consequence | "Compare dividing fractions is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The geneticist needs the dividing-cell fraction before the signal test.

**Question card story setup — exact player copy:** The cell-cycle order gives the clinic a way to classify its observations, and the unusual tray now has many visibly dividing cells. Calculate the sampled fraction before the geneticist tests whether the tray still responds to growth controls.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** The unusual tray has 18 dividing cells among 60 counted cells; a matched normal tray has 6 among 60.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Compare dividing fractions
  units: '%'
  labels:
  - dividing
  - total
  - percent scale
  - control dividing
  values:
  - 18
  - 60
  - 100
  - 6
  slots: 3
  template: '{0} {1} {2} → %'
  formula: a/b*c
  correct:
  - 0
  - 1
  - 2
  target: 30
  correctResult: 30
  tolerance: 0.05
answerText: The observed dividing fraction is 18/60 × 100 = 30 percent. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Use dividing cells divided by total cells times 100; submit the unusual tray fraction as a percent.

**Correct result:** 30; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The observed dividing fraction is 18/60 × 100 = 30 percent. This result is now recorded for the next comparison.

**Why/mechanism:** The observed dividing fraction is 18/60 × 100 = 30 percent. This is a snapshot of sampled cells, not a direct measurement of the time required for one complete cell cycle. The normal comparison has fewer dividing cells under the same counting method, making the unusual tray worth investigating. Sampling and cell-cycle regulation both matter: the larger fraction identifies a difference, but a controlled response to signal removal is needed before attributing it to a specific regulatory failure.

**Mechanism links:** Regulation and feedback, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** 10 uses the normal tray count instead of the unusual tray count.

**Wrong-path feedback:**

- 10 uses the normal tray count instead of the unusual tray count.
- 300 misplaces the percentage scale by a factor of ten.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Compare dividing fractions is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 23.

**Retrieval:** M4 Stop 14 (Follow the light response); M4 Stop 15 (Read the recovered leaves); M4 Stop 16 (Limit the reset)

**Later payoff:** Mission 8 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 22 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 23 — Test the growth signal

**Format/placement:** DIAGNOSIS, Genetics Trailer — Records Board.

**Required stop kind:** calculation/room. **Player verb:** discriminate explanations from all readings.

**Metadata:** Concept: 11 — Signals and feedback; Keystone: Regulation and feedback, Information flow, Experimental evidence; Area: GENE; Prerequisites: Mission primer and Stop 22: Compare dividing fractions; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** whether the unusual tissue tray can join the release stock.

**Actual mission answer:** Hold the unusual tissue tray for further tests.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 30 |
| player_sees | {"headline": "Test the growth signal", "readings": [{"zone": "Control", "label": "Division after signal removal", "value": "Stops in matched normal tissue", "status": "normal"}, {"zone": "Unusual tray", "label": "Division after signal removal", "value": "Continues in repeated cultures", "status": "alarm"}, {"zone": "DNA content", "label": "Copies per dividing cell", "value": "Expected replicated amount", "status": "normal"}, {"zone": "Record", "label": "Specific causal mutation", "value": "Not yet identified", "status": "watch"}], "choices": [{"label": "Growth response is uncoupled", "mechanism": "Growth response is uncoupled"}, {"label": "DNA never copies in this tray", "mechanism": "DNA never copies in this tray"}, {"label": "All growth signals increased", "mechanism": "All growth signals increased"}, {"label": "A specific cancer mutation is proved", "mechanism": "A specific cancer mutation is proved"}], "answer": "Growth response is uncoupled", "rebuttals": {"DNA never copies in this tray": "Expected replicated DNA contradicts the claim that copying never occurs.", "All growth signals increased": "The same removed signal stops the normal tissue.", "A specific cancer mutation is proved": "No specific mutation has been identified in the supplied record."}, "answerText": "The unusual tissue continues dividing when the same signal-removal treatment stops the matched control. This result is now recorded for the next comparison.", "why": "The unusual tissue continues dividing when the same signal-removal treatment stops the matched control. That supports a failure somewhere in the pathway linking the external cue to division control. Normal replicated DNA content contradicts a blanket failure to copy DNA. The data do not identify the causal mutation or establish a particular cancer diagnosis. The appropriate conclusion is narrower: the tray behaves abnormally in a relevant control test and needs isolation and further investigation before release use."} |
| player_must_determine | "Read every measurement, including the normal control, and submit the one explanation consistent with them all." |
| correct_result | "Growth response is uncoupled" |
| most_tempting_wrong_result | "Expected replicated DNA contradicts the claim that copying never occurs." |
| why_wrong_occurs | "Expected replicated DNA contradicts the claim that copying never occurs." |
| story_consequence | "Test the growth signal is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available." |


**Call — exact player copy:** Go to Genetics Trailer and use Records Board.

**Stop reason — exact player copy:** The tray needs a control test rather than a growth-rate label.

**Question card story setup — exact player copy:** The dividing-cell fraction confirms a difference between the trays, but a snapshot cannot identify which control has changed or whether it is inherited. Compare the response to signal removal before the crew makes a release-stock decision.

**Question card story-science connection — exact player copy:** An explanation must survive the normal controls before it can justify changing the release stock.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
headline: Test the growth signal
readings:
- zone: Control
  label: Division after signal removal
  value: Stops in matched normal tissue
  status: normal
- zone: Unusual tray
  label: Division after signal removal
  value: Continues in repeated cultures
  status: alarm
- zone: DNA content
  label: Copies per dividing cell
  value: Expected replicated amount
  status: normal
- zone: Record
  label: Specific causal mutation
  value: Not yet identified
  status: watch
choices:
- label: Growth response is uncoupled
  mechanism: Growth response is uncoupled
- label: DNA never copies in this tray
  mechanism: DNA never copies in this tray
- label: All growth signals increased
  mechanism: All growth signals increased
- label: A specific cancer mutation is proved
  mechanism: A specific cancer mutation is proved
answer: Growth response is uncoupled
rebuttals:
  DNA never copies in this tray: Expected replicated DNA contradicts the claim that copying never occurs.
  All growth signals increased: The same removed signal stops the normal tissue.
  A specific cancer mutation is proved: No specific mutation has been identified in the supplied record.
answerText: The unusual tissue continues dividing when the same signal-removal treatment stops the matched control. This result is now recorded for the next comparison.
why: 'The unusual tissue continues dividing when the same signal-removal treatment stops the matched control. That supports a failure somewhere in the pathway linking the external cue to division control. Normal replicated DNA content contradicts a blanket failure to copy DNA. The data do not identify the causal mutation or establish a particular cancer diagnosis. The appropriate conclusion is narrower: the tray behaves abnormally in a relevant control test and needs isolation and further investigation before release use.'
```

**Question card prompt — exact player copy:** Read every measurement, including the normal control, and submit the one explanation consistent with them all.

**Correct result:** "Growth response is uncoupled"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The unusual tissue continues dividing when the same signal-removal treatment stops the matched control. This result is now recorded for the next comparison.

**Why/mechanism:** The unusual tissue continues dividing when the same signal-removal treatment stops the matched control. That supports a failure somewhere in the pathway linking the external cue to division control. Normal replicated DNA content contradicts a blanket failure to copy DNA. The data do not identify the causal mutation or establish a particular cancer diagnosis. The appropriate conclusion is narrower: the tray behaves abnormally in a relevant control test and needs isolation and further investigation before release use.

**Mechanism links:** Regulation and feedback, Information flow, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Expected replicated DNA contradicts the claim that copying never occurs.

**Wrong-path feedback:**

- Expected replicated DNA contradicts the claim that copying never occurs.
- The same removed signal stops the normal tissue.
- No specific mutation has been identified in the supplied record.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Test the growth signal is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available.

**Unlock:** Stop 24.

**Retrieval:** M4 Stop 14 (Follow the light response); M4 Stop 15 (Read the recovered leaves); M4 Stop 16 (Limit the reset)

**Later payoff:** Mission 8 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 23 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 24 — Hold one line

**Format/placement:** CHOICE, Nell Shah at Genetics Trailer — Records Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 12 — Cell cycle and checkpoints; Keystone: Regulation and feedback, Experimental evidence; Area: GENE; Prerequisites: Mission primer and Stop 23: Test the growth signal; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether the unusual tissue tray can join the release stock.

**Actual mission answer:** Hold the unusual tissue tray for further tests.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "Growth response is uncoupled" |
| player_sees | "The unusual tray divides after signal removal; normal tissue stops; DNA copying is present; a causal mutation remains unknown." |
| player_must_determine | "Choose the release-stock decision supported by these observations." |
| correct_result | "Hold only the unusual line" |
| most_tempting_wrong_result | "The unusual line failed a relevant control test." |
| why_wrong_occurs | "The unusual line failed a relevant control test." |
| story_consequence | "Hold one line is recorded with its evidence on the Genetics Trailer log; The unusual tissue line is separated and the healthy lines stay in care." |


**Call — exact player copy:** Go to Genetics Trailer and meet Nell Shah, conservation geneticist, at Records Board.

**Stop reason — exact player copy:** The untested tissue line cannot enter release stock by default.

**Question card story setup — exact player copy:** The signal-removal test leaves the unusual line dividing while the matched normal tissue stops, although the exact cause is still unresolved in the record. Choose a handling decision that respects this specific failure without condemning every related family.

**Question card story-science connection — exact player copy:** Hold the unusual tissue tray for further tests.

**Data/readings/options:** The unusual tray divides after signal removal; normal tissue stops; DNA copying is present; a causal mutation remains unknown.

**Format-specific interaction block:**
```yaml
question: Choose the release-stock decision supported by these observations.
choices:
- Hold only the unusual line
- Certify every tray as healthy
- Destroy all related seed lines
- Name a specific cancer mutation
answer: Hold only the unusual line
rebuttals:
  Certify every tray as healthy: The unusual line failed a relevant control test.
  Destroy all related seed lines: Shared ancestry alone does not prove the same phenotype in every line.
  Name a specific cancer mutation: The record explicitly lacks a identified causal mutation.
answerText: The controlled signal test gives a concrete reason to hold the unusual tissue line while keeping its evidence and relatives available for further study. Hold the unusual tissue tray for further tests.
why: The controlled signal test gives a concrete reason to hold the unusual tissue line while keeping its evidence and relatives available for further study. It does not establish that every related seed line shares the same behavior, nor does it identify a particular mutation. Certifying the line would ignore the observed loss of normal response. The decision protects the release stock without turning an unresolved mechanism into an exaggerated claim, and the family records now become relevant to investigating inheritance.
```

**Question card prompt — exact player copy:** Choose the release-stock decision supported by these observations.

**Correct result:** "Hold only the unusual line"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The controlled signal test gives a concrete reason to hold the unusual tissue line while keeping its evidence and relatives available for further study. Hold the unusual tissue tray for further tests.

**Why/mechanism:** The controlled signal test gives a concrete reason to hold the unusual tissue line while keeping its evidence and relatives available for further study. It does not establish that every related seed line shares the same behavior, nor does it identify a particular mutation. Certifying the line would ignore the observed loss of normal response. The decision protects the release stock without turning an unresolved mechanism into an exaggerated claim, and the family records now become relevant to investigating inheritance.

**Mechanism links:** Regulation and feedback, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The unusual line failed a relevant control test.

**Wrong-path feedback:**

- The unusual line failed a relevant control test.
- Shared ancestry alone does not prove the same phenotype in every line.
- The record explicitly lacks a identified causal mutation.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Hold one line is recorded with its evidence on the Genetics Trailer log; The unusual tissue line is separated and the healthy lines stay in care.

**Unlock:** M6-B4 and mission outcome.

**Retrieval:** M4 Stop 14 (Follow the light response); M4 Stop 15 (Read the recovered leaves); M4 Stop 16 (Limit the reset)

**Later payoff:** Mission 8 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 24 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Hold the unusual tissue tray for further tests. The held line keeps dividing when the signal is removed. The crew uses the plan just chosen. The held tray came from a small set of related parents.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 6 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The unusual tissue line is separated and the healthy lines stay in care. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +3 | Receiving Habitat +2 | Care Supplies -1 | Island Health +4

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [2, 2, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [73, 72, 82, 76]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- DNA is copied during S phase before division.
- Chromosomes must be attached correctly before sister chromatids separate.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Hold the unusual tissue tray for further tests.

---


# Mission 7 — THE FAMILY IN THE JAR

## A. Mission briefing card — exact player copy

**Header:** DAY 7 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE FAMILY IN THE JAR

**Go now:** Go to Seed Room and meet Nell Shah, conservation geneticist, at the Seed Table.

**Card body:** The unusual tissue is held, and its seed family needs a closer check. A visible trait can hide an allele that appears in offspring. Read family records, then compare the cross results in the Genetics Trailer. By the end of the mission, decide which cross can test the hidden recessive trait.

**Objective:** Resolve which cross can test the hidden recessive trait; a poor breeding choice could lose useful variation.

### Worth knowing first — exact player copy

#### Glossary terms

- Allele: An alternative DNA version at a gene locus.
- Genotype: The allele combination an organism carries.
- Phenotype: An observable trait shaped by genotype and environment.
- Meiosis: Cell division that reduces chromosome sets to form haploid products.
- Recessive: An allele effect masked in a heterozygote under a stated dominance model.
- Locus: A location in a genome.
- Heterozygote: An organism with two different alleles at a locus.
- Homozygote: An organism with two matching alleles at a locus.
- Dominance: The relationship in which a heterozygote shows the specified dominant phenotype.
- Gamete: A reproductive cell that can fuse with another at fertilization.
- Homologous chromosomes: Chromosomes carrying corresponding gene loci, one from each parent in a diploid pair.
- Codominance: Expression of both specified allele products in a heterozygote.
- Incomplete dominance: An intermediate heterozygote phenotype in the stated trait.
- Pleiotropy: One gene affecting several traits.
- Epistasis: One gene altering or masking the effect of another.

#### Primer concepts

- Alleles segregate during meiosis.
- Independent assortment applies to unlinked loci.
- A test cross with a homozygous recessive parent can reveal an unknown dominant-phenotype genotype.

#### Equations first needed today

**Equation:** expected count = total offspring × trait probability

**What it is for:** Predict offspring under the stated cross.

**Symbols:** Count and total are offspring numbers; probability is dimensionless.

**Why this campaign needs it:** Distinguish TT from Tt predictions.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. Bb × bb gives one-half Bb and one-half bb, so half the offspring show the recessive trait under complete dominance.

2. Bb × Bb gives 1 BB:2 Bb:1 bb; complete dominance produces a 3:1 phenotype ratio.

3. For unlinked genes, the chance of aa from Aa × Aa is 1/4 and bb from Bb × Bb is 1/4; aabb probability is 1/16.

4. A diploid cell with 12 chromosomes completes meiosis normally; each haploid product has 6.

5. Crossing over exchanges corresponding DNA between nonsister chromatids of homologous chromosomes, creating new allele combinations without creating every possible allele.

**Authoring-only failure consequence:** A poor breeding choice could lose useful variation.

**Authoring-only later travel:** After Stop 26, carry its evidence to Genetics Trailer.

## B. Main story happening — designer summary

The unusual tissue is held, and its seed family needs a closer check. The four-stop chain establishes follow an allele into a gamete, uses it to predict the test family, then interpret the family evidence supplies the discriminating evidence for choose the informative cross. A test cross is approved and family labels stay attached to every sample. The family trait leads to a changed enzyme sequence. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: which cross can test the hidden recessive trait. Actual final answer: Use a test cross and keep each family separate. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M7-B1 — On arrival at Seed Room

**Location:** Seed Room.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The unusual tissue is held, and its seed family needs a closer check.

**Dialogue bubble — Nell Shah, conservation geneticist:** “The family investigation needs an inheritance model.”

**Unlocks:** Stop 25.

### Beat M7-B2 — After Stops 25 and 26

**Location:** Seed Room.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Follow an allele into a gamete and Predict the test family with their accepted results.

**Panel/HUD text:** “The family labels must preserve which inheritance model was tested. Go to Genetics Trailer; its Records Board holds the next comparison.”

**Unlocks:** Stop 27 at Genetics Trailer.

### Beat M7-B4 — After Stop 28

**Location:** Genetics Trailer.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** A test cross is approved and family labels stay attached to every sample.

**Panel/HUD text:** “Use a test cross and keep each family separate.”

**Unlocks:** The ungraded aftermath.

### Beat M7-BE — At mission end

**Location:** Genetics Trailer.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** A test cross is approved and family labels stay attached to every sample. The family trait leads to a changed enzyme sequence.

**Dialogue bubble — Nell Shah, conservation geneticist:** “The family trait leads to a changed enzyme sequence.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**2 locations:** Seed Room → Genetics Trailer.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 25 | Seed Room | seed-table | The family investigation needs an inheritance model. |
| 26 | Seed Room | seed-table | The test cross needs an expected offspring count. |
| 27 | Genetics Trailer | records-board | The family labels must preserve which inheritance model was tested. |
| 28 | Genetics Trailer | records-board | The breeding decision must preserve the evidence it creates. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Nell Shah, conservation geneticist, begins by owning the local evidence. The conflict is between a poor breeding choice could lose useful variation. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **13 — Meiosis and variation:** Meiosis separates homologous chromosomes and then sister chromatids, reducing chromosome sets in the products.

- **14 — Mendelian probability:** The heterozygous parent supplies T or t with equal probability, while the recessive parent supplies only t.

- **15 — Non-Mendelian inheritance:** Not every trait follows a simple dominant-recessive pattern.

- **14 — Mendelian probability:** A homozygous recessive partner supplies only t, so recessive offspring reveal that the unknown parent supplied t as well.

Random fertilization and crossing over produce combinations of alleles. Nondisjunction means chromosome pairs or chromatids fail to separate correctly, producing abnormal chromosome numbers. Multiple alleles can exist in a population even though a diploid individual carries two at a locus. X-linked recessive patterns depend on chromosome complements and allele assumptions, not a blanket rule about every individual. For a standard XX/XY example, a carrier XAXa parent crossed with XAY gives half the sons expected to carry XaY.

## H1. Stop 25 — Follow an allele into a gamete

**Format/placement:** SEQUENCE, Seed Room — Seed Table.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 13 — Meiosis and variation; Keystone: Inheritance and variation, Information flow; Area: SEED; Prerequisites: Mission primer and Stop 24: Hold one line; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** which cross can test the hidden recessive trait.

**Actual mission answer:** Use a test cross and keep each family separate.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The unusual tissue is held, and its seed family needs a closer check." |
| player_sees | {"cards": [{"id": "p4", "label": "Sister chromatids separate in meiosis II"}, {"id": "p3", "label": "Homologous chromosomes separate in meiosis I"}, {"id": "p2", "label": "Nonsister chromatids may exchange corresponding segments"}, {"id": "p1", "label": "Homologous chromosomes pair after DNA replication"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Each upstream event supplies the condition required by the next.", "prerequisite_feedback": {"p2": "Nonsister chromatids may exchange corresponding segments requires the prior stated condition: Homologous chromosomes pair after DNA replication. Restore this dependency and retry the full causal order.", "p3": "Homologous chromosomes separate in meiosis I requires the prior stated condition: Nonsister chromatids may exchange corresponding segments. Restore this dependency and retry the full causal order.", "p4": "Sister chromatids separate in meiosis II requires the prior stated condition: Homologous chromosomes separate in meiosis I. Restore this dependency and retry the full causal order."}, "answerText": "Meiosis separates homologous chromosomes and then sister chromatids, reducing chromosome sets in the products. This result is now recorded for the next comparison."} |
| player_must_determine | "Place every card in the biological causal order; submit the whole order." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "Sister chromatids normally separate in meiosis II, after homologues separate." |
| why_wrong_occurs | "Sister chromatids normally separate in meiosis II, after homologues separate." |
| story_consequence | "Follow an allele into a gamete is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Seed Table.

**Stop reason — exact player copy:** The family investigation needs an inheritance model.

**Question card story setup — exact player copy:** The unusual tissue line is held, and its family record points to a trait that may be hidden in some healthy-looking parents. Follow allele separation into gametes before the seed team chooses a cross to test that possibility.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: Sister chromatids separate in meiosis II
- id: p3
  label: Homologous chromosomes separate in meiosis I
- id: p2
  label: Nonsister chromatids may exchange corresponding segments
- id: p1
  label: Homologous chromosomes pair after DNA replication
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: Each upstream event supplies the condition required by the next.
prerequisite_feedback:
  p2: 'Nonsister chromatids may exchange corresponding segments requires the prior stated condition: Homologous chromosomes pair after DNA replication. Restore this dependency and retry the full causal order.'
  p3: 'Homologous chromosomes separate in meiosis I requires the prior stated condition: Nonsister chromatids may exchange corresponding segments. Restore this dependency and retry the full causal order.'
  p4: 'Sister chromatids separate in meiosis II requires the prior stated condition: Homologous chromosomes separate in meiosis I. Restore this dependency and retry the full causal order.'
answerText: Meiosis separates homologous chromosomes and then sister chromatids, reducing chromosome sets in the products. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Place every card in the biological causal order; submit the whole order.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Meiosis separates homologous chromosomes and then sister chromatids, reducing chromosome sets in the products. This result is now recorded for the next comparison.

**Why/mechanism:** Meiosis separates homologous chromosomes and then sister chromatids, reducing chromosome sets in the products. Crossing over can exchange corresponding segments between nonsister chromatids while homologues are paired. These events generate new combinations of existing alleles; they do not guarantee new mutations. The family investigation needs this distinction because a trait appearing among offspring can reflect segregation of an existing recessive allele. It is not evidence that the breeding procedure invented the trait or that every offspring must carry the same genotype.

**Mechanism links:** Inheritance and variation, Information flow are the specific broader principles used in the explanation above.

**Misconception:** Sister chromatids normally separate in meiosis II, after homologues separate.

**Wrong-path feedback:**

- Sister chromatids normally separate in meiosis II, after homologues separate.
- Crossing over involves nonsister chromatids of homologues.
- DNA is copied before the two meiotic divisions, not between them.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Follow an allele into a gamete is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 26.

**Retrieval:** M4 Stop 14 (Follow the light response); M4 Stop 15 (Read the recovered leaves)

**Later payoff:** Mission 9 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 25 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 26 — Predict the test family

**Format/placement:** BALLPARK, Seed Room — Seed Table.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 14 — Mendelian probability; Keystone: Inheritance and variation, Experimental evidence; Area: SEED; Prerequisites: Mission primer and Stop 25: Follow an allele into a gamete; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** which cross can test the hidden recessive trait.

**Actual mission answer:** Use a test cross and keep each family separate.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | "Use Tt × tt, complete dominance, independent offspring and no viability difference. Expected recessive fraction is 1/2; 24 offspring are scored." |
| player_must_determine | "Multiply offspring count by recessive fraction; submit expected recessive offspring count." |
| correct_result | 12 |
| most_tempting_wrong_result | "6 uses a one-quarter probability from a different cross." |
| why_wrong_occurs | "6 uses a one-quarter probability from a different cross." |
| story_consequence | "Predict the test family is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Seed Table.

**Stop reason — exact player copy:** The test cross needs an expected offspring count.

**Question card story setup — exact player copy:** The meiosis model explains how a parent can pass either allele, even when only the dominant trait appears in its own leaves. Predict the recessive offspring count for the proposed cross before the family test is scored.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** Use Tt × tt, complete dominance, independent offspring and no viability difference. Expected recessive fraction is 1/2; 24 offspring are scored.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Predict the test family
  units: offspring
  labels:
  - offspring
  - numerator
  - denominator
  - dominant parent copies
  values:
  - 24
  - 1
  - 2
  - 2
  slots: 3
  template: '{0} {1} {2} → offspring'
  formula: a*b/c
  correct:
  - 0
  - 1
  - 2
  target: 12
  correctResult: 12
  tolerance: 0.05
answerText: The heterozygous parent supplies T or t with equal probability, while the recessive parent supplies only t. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Multiply offspring count by recessive fraction; submit expected recessive offspring count.

**Correct result:** 12; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The heterozygous parent supplies T or t with equal probability, while the recessive parent supplies only t. This result is now recorded for the next comparison.

**Why/mechanism:** The heterozygous parent supplies T or t with equal probability, while the recessive parent supplies only t. Half the offspring are therefore expected to be tt: 24 × 1/2 = 12. This is an expectation, not a demand that every finite family contain exactly twelve recessive offspring. The calculation makes the proposed test cross informative because a TT parent would predict no recessive offspring under the same assumptions. The crew can now compare an observed family with these alternatives.

**Mechanism links:** Inheritance and variation, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** 6 uses a one-quarter probability from a different cross.

**Wrong-path feedback:**

- 6 uses a one-quarter probability from a different cross.
- 24 assumes the dominant-phenotype parent supplies only t.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Predict the test family is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 27.

**Retrieval:** M5 Stop 18 (Find the shared flowering days); M5 Stop 19 (Compare field trays); M5 Stop 20 (Keep flowers available)

**Later payoff:** Mission 9 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 26 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 27 — Interpret the family evidence

**Format/placement:** PROTOCOL, Genetics Trailer — Records Board.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 15 — Non-Mendelian inheritance; Keystone: Inheritance and variation, Experimental evidence; Area: GENE; Prerequisites: Mission primer and Stop 26: Predict the test family; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** which cross can test the hidden recessive trait.

**Actual mission answer:** Use a test cross and keep each family separate.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 12 |
| player_sees | {"scenarios": [{"id": "e1", "label": "Both allele products visible in a heterozygote"}, {"id": "e2", "label": "Heterozygote intermediate between the two homozygotes"}, {"id": "e3", "label": "One gene alters several traits"}, {"id": "e4", "label": "One locus masks the effect of another"}], "choices": [{"id": "r4", "label": "Epistasis"}, {"id": "r3", "label": "Pleiotropy"}, {"id": "r2", "label": "Incomplete dominance"}, {"id": "r1", "label": "Codominance"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Both allele products visible in a heterozygote supports Codominance; Epistasis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Both allele products visible in a heterozygote supports Codominance; Pleiotropy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Both allele products visible in a heterozygote supports Codominance; Incomplete dominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Heterozygote intermediate between the two homozygotes supports Incomplete dominance; Epistasis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Heterozygote intermediate between the two homozygotes supports Incomplete dominance; Pleiotropy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Heterozygote intermediate between the two homozygotes supports Incomplete dominance; Codominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "One gene alters several traits supports Pleiotropy; Epistasis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "One gene alters several traits supports Pleiotropy; Incomplete dominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "One gene alters several traits supports Pleiotropy; Codominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "One locus masks the effect of another supports Epistasis; Pleiotropy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "One locus masks the effect of another supports Epistasis; Incomplete dominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "One locus masks the effect of another supports Epistasis; Codominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "Not every trait follows a simple dominant-recessive pattern. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Codominance displays both products rather than a blended intermediate." |
| why_wrong_occurs | "Codominance displays both products rather than a blended intermediate." |
| story_consequence | "Interpret the family evidence is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available." |


**Call — exact player copy:** Go to Genetics Trailer and use Records Board.

**Stop reason — exact player copy:** The family labels must preserve which inheritance model was tested.

**Question card story setup — exact player copy:** The predicted family count is ready, but the collection also contains traits that do not follow the same simple dominance pattern used in that calculation. Match those inheritance patterns before the team extends one result across unrelated family labels.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Both allele products visible in a heterozygote
- id: e2
  label: Heterozygote intermediate between the two homozygotes
- id: e3
  label: One gene alters several traits
- id: e4
  label: One locus masks the effect of another
choices:
- id: r4
  label: Epistasis
- id: r3
  label: Pleiotropy
- id: r2
  label: Incomplete dominance
- id: r1
  label: Codominance
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Both allele products visible in a heterozygote supports Codominance; Epistasis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Both allele products visible in a heterozygote supports Codominance; Pleiotropy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Both allele products visible in a heterozygote supports Codominance; Incomplete dominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Heterozygote intermediate between the two homozygotes supports Incomplete dominance; Epistasis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Heterozygote intermediate between the two homozygotes supports Incomplete dominance; Pleiotropy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Heterozygote intermediate between the two homozygotes supports Incomplete dominance; Codominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: One gene alters several traits supports Pleiotropy; Epistasis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: One gene alters several traits supports Pleiotropy; Incomplete dominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: One gene alters several traits supports Pleiotropy; Codominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: One locus masks the effect of another supports Epistasis; Pleiotropy describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: One locus masks the effect of another supports Epistasis; Incomplete dominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: One locus masks the effect of another supports Epistasis; Codominance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: Not every trait follows a simple dominant-recessive pattern. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Not every trait follows a simple dominant-recessive pattern. This result is now recorded for the next comparison.

**Why/mechanism:** Not every trait follows a simple dominant-recessive pattern. Codominance displays both allele products, incomplete dominance gives an intermediate heterozygote phenotype, pleiotropy lets one gene affect several traits, and epistasis involves interactions between loci. The supplied test family is explicitly scored under complete dominance, so its one-half expectation remains valid. The distinctions prevent the team from extending that calculation to every visible trait in the seed collection. Family labels must preserve which inheritance model was actually supported by each test.

**Mechanism links:** Inheritance and variation, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Codominance displays both products rather than a blended intermediate.

**Wrong-path feedback:**

- Codominance displays both products rather than a blended intermediate.
- Pleiotropy concerns one gene with several effects; epistasis concerns interaction between loci.
- Do not apply complete-dominance ratios to every trait.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Interpret the family evidence is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available.

**Unlock:** Stop 28.

**Retrieval:** M5 Stop 18 (Find the shared flowering days); M5 Stop 19 (Compare field trays); M5 Stop 20 (Keep flowers available)

**Later payoff:** Mission 9 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 27 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 28 — Choose the informative cross

**Format/placement:** CHOICE, Nell Shah at Genetics Trailer — Records Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 14 — Mendelian probability; Keystone: Inheritance and variation, Experimental evidence; Area: GENE; Prerequisites: Mission primer and Stop 27: Interpret the family evidence; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** which cross can test the hidden recessive trait.

**Actual mission answer:** Use a test cross and keep each family separate.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Unknown parent has dominant phenotype and genotype TT or Tt; available partners are TT, Tt and tt; the target trait follows complete dominance without viability differences." |
| player_must_determine | "Select the cross and record-keeping plan that can reveal a hidden recessive allele." |
| correct_result | "Cross with tt and keep family labels" |
| most_tempting_wrong_result | "A TT partner masks the recessive phenotype and pooling destroys ancestry information." |
| why_wrong_occurs | "A TT partner masks the recessive phenotype and pooling destroys ancestry information." |
| story_consequence | "Choose the informative cross is recorded with its evidence on the Genetics Trailer log; A test cross is approved and family labels stay attached to every sample." |


**Call — exact player copy:** Go to Genetics Trailer and meet Nell Shah, conservation geneticist, at Records Board.

**Stop reason — exact player copy:** The breeding decision must preserve the evidence it creates.

**Question card story setup — exact player copy:** The family work now separates a simple test-cross prediction from other inheritance patterns, so a visible dominant trait no longer settles a parent genotype. Choose the cross and record-keeping plan that can reveal the hidden allele without erasing ancestry.

**Question card story-science connection — exact player copy:** Use a test cross and keep each family separate.

**Data/readings/options:** Unknown parent has dominant phenotype and genotype TT or Tt; available partners are TT, Tt and tt; the target trait follows complete dominance without viability differences.

**Format-specific interaction block:**
```yaml
question: Select the cross and record-keeping plan that can reveal a hidden recessive allele.
choices:
- Cross with tt and keep family labels
- Cross with TT and pool all seeds
- Self only TT and discard labels
- Infer genotype from appearance alone
answer: Cross with tt and keep family labels
rebuttals:
  Cross with TT and pool all seeds: A TT partner masks the recessive phenotype and pooling destroys ancestry information.
  Self only TT and discard labels: A known TT self-cross cannot test the unknown parent.
  Infer genotype from appearance alone: TT and Tt have the same phenotype under complete dominance.
answerText: A homozygous recessive partner supplies only t, so recessive offspring reveal that the unknown parent supplied t as well. Use a test cross and keep each family separate.
why: A homozygous recessive partner supplies only t, so recessive offspring reveal that the unknown parent supplied t as well. A TT unknown predicts none, whereas Tt predicts one-half under the stated assumptions. Finite samples still require careful interpretation, especially when no recessive offspring are observed. Keeping family labels preserves the link between parents, offspring and tests. Pooling would erase the very evidence the cross creates and could lose rare variation that matters in later release decisions.
```

**Question card prompt — exact player copy:** Select the cross and record-keeping plan that can reveal a hidden recessive allele.

**Correct result:** "Cross with tt and keep family labels"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** A homozygous recessive partner supplies only t, so recessive offspring reveal that the unknown parent supplied t as well. Use a test cross and keep each family separate.

**Why/mechanism:** A homozygous recessive partner supplies only t, so recessive offspring reveal that the unknown parent supplied t as well. A TT unknown predicts none, whereas Tt predicts one-half under the stated assumptions. Finite samples still require careful interpretation, especially when no recessive offspring are observed. Keeping family labels preserves the link between parents, offspring and tests. Pooling would erase the very evidence the cross creates and could lose rare variation that matters in later release decisions.

**Mechanism links:** Inheritance and variation, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** A TT partner masks the recessive phenotype and pooling destroys ancestry information.

**Wrong-path feedback:**

- A TT partner masks the recessive phenotype and pooling destroys ancestry information.
- A known TT self-cross cannot test the unknown parent.
- TT and Tt have the same phenotype under complete dominance.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Choose the informative cross is recorded with its evidence on the Genetics Trailer log; A test cross is approved and family labels stay attached to every sample.

**Unlock:** M7-B4 and mission outcome.

**Retrieval:** M5 Stop 18 (Find the shared flowering days); M5 Stop 19 (Compare field trays); M5 Stop 20 (Keep flowers available)

**Later payoff:** Mission 9 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 28 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Use a test cross and keep each family separate. The recessive partner can reveal the hidden allele. The crew uses the plan just chosen. The family trait leads to a changed enzyme sequence.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A test cross is approved and family labels stay attached to every sample. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +5 | Receiving Habitat +2 | Care Supplies -1 | Island Health +2

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 4, 0, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [78, 78, 81, 78]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Alleles segregate during meiosis.
- Independent assortment applies to unlinked loci.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Use a test cross and keep each family separate.

---


# Mission 8 — ONE LETTER IN THE RECIPE

## A. Mission briefing card — exact player copy

**Header:** DAY 8 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** ONE LETTER IN THE RECIPE

**Go now:** Go to Genetics Trailer and meet Nell Shah, conservation geneticist, at the DNA Bench.

**Card body:** The cross preserves the families, and one line has a weak digestive enzyme. Cells read DNA instructions through RNA to build proteins. Trace the sequence at the DNA Bench, then compare enzyme evidence in the clinic. By the end of the mission, decide whether the sequence change can explain the weak enzyme.

**Objective:** Resolve whether the sequence change can explain the weak enzyme; the wrong diagnosis could remove a healthy family.

### Worth knowing first — exact player copy

#### Glossary terms

- Transcription: Making an RNA copy using a DNA template.
- Translation: Using mRNA codons to build an amino-acid chain.
- Codon: A three-base mRNA sequence specifying an amino acid or stop.
- Mutation: A change in DNA sequence.
- PCR: A method that amplifies a selected DNA region.
- Template: A strand used to determine a complementary new sequence.
- mRNA: Messenger RNA read by a ribosome to make a protein.
- tRNA: Transfer RNA that carries an amino acid and pairs with an mRNA codon.
- Ribosome: The cellular structure that reads mRNA and assembles a protein chain.
- Polymerase: An enzyme that builds a nucleic-acid strand from a template.
- Splicing: Removal and joining of RNA segments during processing.
- Purified enzyme: An enzyme separated from many other sample components for testing.

#### Primer concepts

- DNA and RNA synthesis extend in the 5-prime to 3-prime direction.
- A sequence change can alter protein structure, but phenotype evidence is still needed.
- A gel separates fragments by size and does not read their full sequence.

#### Equations first needed today

No new equation is needed today; retrieve the recorded relationships and biological pathways from the mission log.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. DNA template 3′-TAC-5′ gives mRNA 5′-AUG-3′; complementary pairing preserves antiparallel orientation.

2. mRNA GAA and GAG both encode glutamate in the supplied codon table; the substitution is silent at the amino-acid level.

3. Replacing UAU with UAA creates a stop codon, so translation can end early.

4. Deleting one base inside a coding region shifts downstream codon grouping unless another change restores the frame.

5. Four ideal PCR cycles starting from 3 target molecules give 3 × 2⁴ = 48 copies; actual efficiency can be lower.

**Authoring-only failure consequence:** The wrong diagnosis could remove a healthy family.

**Authoring-only later travel:** After Stop 30, carry its evidence to Field Clinic.

## B. Main story happening — designer summary

The cross preserves the families, and one line has a weak digestive enzyme. The four-stop chain establishes trace the enzyme message, uses it to read the altered codons, then compare sequence and function supplies the discriminating evidence for keep the causal claim narrow. The enzyme lead is recorded and an environmental comparison is requested. Similar-looking plants respond differently in the same growth room. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the sequence change can explain the weak enzyme. Actual final answer: Treat the changed enzyme as a supported lead, not a complete diagnosis. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M8-B1 — On arrival at Genetics Trailer

**Location:** Genetics Trailer.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The cross preserves the families, and one line has a weak digestive enzyme.

**Dialogue bubble — Nell Shah, conservation geneticist:** “The enzyme lead needs the path from sequence to function.”

**Unlocks:** Stop 29.

### Beat M8-B2 — After Stops 29 and 30

**Location:** Genetics Trailer.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Trace the enzyme message and Read the altered codons with their accepted results.

**Panel/HUD text:** “The sequence lead must meet measured enzyme activity. Go to Field Clinic; its Sample Bench holds the next comparison.”

**Unlocks:** Stop 31 at Field Clinic.

### Beat M8-B4 — After Stop 32

**Location:** Field Clinic.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The enzyme lead is recorded and an environmental comparison is requested.

**Panel/HUD text:** “Treat the changed enzyme as a supported lead, not a complete diagnosis.”

**Unlocks:** The ungraded aftermath.

### Beat M8-BE — At mission end

**Location:** Field Clinic.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The enzyme lead is recorded and an environmental comparison is requested. Similar-looking plants respond differently in the same growth room.

**Dialogue bubble — Mara Vale, veterinary biologist:** “Similar-looking plants respond differently in the same growth room.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**2 locations:** Genetics Trailer → Field Clinic.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 29 | Genetics Trailer | dna-bench | The enzyme lead needs the path from sequence to function. |
| 30 | Genetics Trailer | dna-bench | The changed codon needs a precise predicted effect. |
| 31 | Field Clinic | sample-bench | The sequence lead must meet measured enzyme activity. |
| 32 | Field Clinic | care-board | The clinic needs a claim no broader than the evidence. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Nell Shah, conservation geneticist, begins by owning the local evidence. Mara Vale, veterinary biologist, owns the final decision. The conflict is between the wrong diagnosis could remove a healthy family. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **18 — Transcription and translation:** The enzyme message passes through transcription and translation before the polypeptide folds.

- **20 — Mutations and biotechnology:** The supplied codon meanings make each classification answerable without an external table.

- **3 — Protein structure and enzymes:** The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions.

- **20 — Mutations and biotechnology:** The sequence change offers a plausible mechanism for the specific enzyme deficit, and the matched activity measurements support that mechanism.

DNA polymerase extends at a 3-prime end; helicase separates strands, topoisomerase relieves torsional strain and ligase seals adjacent fragments. Leading synthesis is continuous toward the moving fork in the simplified model, lagging synthesis uses fragments. A mature eukaryotic mRNA may have a modified guanine cap, poly-A tail and alternative splicing. AUG encodes methionine in the start context; UAA, UAG and UGA recruit termination rather than tRNA amino acids. Prokaryotic operons coordinate several genes; inducible and repressible systems respond to different regulatory conditions. Transcription factors, enhancers and chromatin state help regulate eukaryotic expression. PCR amplifies selected DNA, gels separate fragments by size and CRISPR can target sequence changes; none alone establishes whole-organism safety.

## H1. Stop 29 — Trace the enzyme message

**Format/placement:** SEQUENCE, Genetics Trailer — DNA Bench.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 18 — Transcription and translation; Keystone: Information flow, Structure and function; Area: GENE; Prerequisites: Mission primer and Stop 28: Choose the informative cross; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the sequence change can explain the weak enzyme.

**Actual mission answer:** Treat the changed enzyme as a supported lead, not a complete diagnosis.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The cross preserves the families, and one line has a weak digestive enzyme." |
| player_sees | {"cards": [{"id": "p4", "label": "The amino-acid chain folds into the enzyme"}, {"id": "p3", "label": "A ribosome reads mRNA codons with matching tRNAs"}, {"id": "p2", "label": "A processed mRNA leaves the eukaryotic nucleus"}, {"id": "p1", "label": "RNA polymerase reads the DNA template"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Each upstream event supplies the condition required by the next.", "prerequisite_feedback": {"p2": "A processed mRNA leaves the eukaryotic nucleus requires the prior stated condition: RNA polymerase reads the DNA template. Restore this dependency and retry the full causal order.", "p3": "A ribosome reads mRNA codons with matching tRNAs requires the prior stated condition: A processed mRNA leaves the eukaryotic nucleus. Restore this dependency and retry the full causal order.", "p4": "The amino-acid chain folds into the enzyme requires the prior stated condition: A ribosome reads mRNA codons with matching tRNAs. Restore this dependency and retry the full causal order."}, "answerText": "The enzyme message passes through transcription and translation before the polypeptide folds. This result is now recorded for the next comparison."} |
| player_must_determine | "Place every card in the biological causal order; submit the whole order." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "Ribosomes translate mRNA, not the DNA template." |
| why_wrong_occurs | "Ribosomes translate mRNA, not the DNA template." |
| story_consequence | "Trace the enzyme message is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available." |


**Call — exact player copy:** Go to Genetics Trailer and use DNA Bench.

**Stop reason — exact player copy:** The enzyme lead needs the path from sequence to function.

**Question card story setup — exact player copy:** The family test preserves the line, but a weak digestive enzyme raises a new question about the instructions used to make its protein. Trace the message from DNA to folded enzyme before reading the changed sequence as a cause.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: The amino-acid chain folds into the enzyme
- id: p3
  label: A ribosome reads mRNA codons with matching tRNAs
- id: p2
  label: A processed mRNA leaves the eukaryotic nucleus
- id: p1
  label: RNA polymerase reads the DNA template
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: Each upstream event supplies the condition required by the next.
prerequisite_feedback:
  p2: 'A processed mRNA leaves the eukaryotic nucleus requires the prior stated condition: RNA polymerase reads the DNA template. Restore this dependency and retry the full causal order.'
  p3: 'A ribosome reads mRNA codons with matching tRNAs requires the prior stated condition: A processed mRNA leaves the eukaryotic nucleus. Restore this dependency and retry the full causal order.'
  p4: 'The amino-acid chain folds into the enzyme requires the prior stated condition: A ribosome reads mRNA codons with matching tRNAs. Restore this dependency and retry the full causal order.'
answerText: The enzyme message passes through transcription and translation before the polypeptide folds. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Place every card in the biological causal order; submit the whole order.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The enzyme message passes through transcription and translation before the polypeptide folds. This result is now recorded for the next comparison.

**Why/mechanism:** The enzyme message passes through transcription and translation before the polypeptide folds. In eukaryotic cells, processing can include a cap, a poly-A tail and splicing before mRNA leaves the nucleus. Ribosomes read codons and tRNAs deliver amino acids; they do not translate DNA directly. Protein structure links the sequence to possible activity. This ordered pathway identifies where a sequence difference could act, while reminding the clinic that a DNA change alone does not measure enzyme function or establish the whole phenotype.

**Mechanism links:** Information flow, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** Ribosomes translate mRNA, not the DNA template.

**Wrong-path feedback:**

- Ribosomes translate mRNA, not the DNA template.
- Protein folding follows chain synthesis rather than directing RNA polymerase.
- RNA processing belongs between transcription and use of the mature message.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Trace the enzyme message is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available.

**Unlock:** Stop 30.

**Retrieval:** M4 Stop 15 (Read the recovered leaves); M6 Stop 21 (Place the cell-cycle evidence); M6 Stop 23 (Test the growth signal)

**Later payoff:** Mission 10 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 29 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 30 — Read the altered codons

**Format/placement:** PROTOCOL, Genetics Trailer — DNA Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 20 — Mutations and biotechnology; Keystone: Information flow, Structure and function; Area: GENE; Prerequisites: Mission primer and Stop 29: Trace the enzyme message; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the sequence change can explain the weak enzyme.

**Actual mission answer:** Treat the changed enzyme as a supported lead, not a complete diagnosis.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | {"scenarios": [{"id": "e1", "label": "GCU becomes GCC; both encode alanine"}, {"id": "e2", "label": "GCU becomes GUU; alanine becomes valine"}, {"id": "e3", "label": "UGG becomes UGA; tryptophan becomes stop"}, {"id": "e4", "label": "One base deleted early in coding sequence"}], "choices": [{"id": "r4", "label": "Frameshift mutation"}, {"id": "r3", "label": "Nonsense substitution"}, {"id": "r2", "label": "Missense substitution"}, {"id": "r1", "label": "Silent substitution"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "GCU becomes GCC; both encode alanine supports Silent substitution; Frameshift mutation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "GCU becomes GCC; both encode alanine supports Silent substitution; Nonsense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "GCU becomes GCC; both encode alanine supports Silent substitution; Missense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "GCU becomes GUU; alanine becomes valine supports Missense substitution; Frameshift mutation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "GCU becomes GUU; alanine becomes valine supports Missense substitution; Nonsense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "GCU becomes GUU; alanine becomes valine supports Missense substitution; Silent substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "UGG becomes UGA; tryptophan becomes stop supports Nonsense substitution; Frameshift mutation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "UGG becomes UGA; tryptophan becomes stop supports Nonsense substitution; Missense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "UGG becomes UGA; tryptophan becomes stop supports Nonsense substitution; Silent substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "One base deleted early in coding sequence supports Frameshift mutation; Nonsense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "One base deleted early in coding sequence supports Frameshift mutation; Missense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "One base deleted early in coding sequence supports Frameshift mutation; Silent substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The supplied codon meanings make each classification answerable without an external table. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "A changed base can preserve the amino acid because the code is redundant." |
| why_wrong_occurs | "A changed base can preserve the amino acid because the code is redundant." |
| story_consequence | "Read the altered codons is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available." |


**Call — exact player copy:** Go to Genetics Trailer and use DNA Bench.

**Stop reason — exact player copy:** The changed codon needs a precise predicted effect.

**Question card story setup — exact player copy:** The message pathway connects inherited instructions to the enzyme, and the sequence reader now shows several different kinds of change in comparison samples. Classify their effects on codons before the clinic compares the specific weak-enzyme line with its reference.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: GCU becomes GCC; both encode alanine
- id: e2
  label: GCU becomes GUU; alanine becomes valine
- id: e3
  label: UGG becomes UGA; tryptophan becomes stop
- id: e4
  label: One base deleted early in coding sequence
choices:
- id: r4
  label: Frameshift mutation
- id: r3
  label: Nonsense substitution
- id: r2
  label: Missense substitution
- id: r1
  label: Silent substitution
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: GCU becomes GCC; both encode alanine supports Silent substitution; Frameshift mutation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: GCU becomes GCC; both encode alanine supports Silent substitution; Nonsense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: GCU becomes GCC; both encode alanine supports Silent substitution; Missense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: GCU becomes GUU; alanine becomes valine supports Missense substitution; Frameshift mutation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: GCU becomes GUU; alanine becomes valine supports Missense substitution; Nonsense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: GCU becomes GUU; alanine becomes valine supports Missense substitution; Silent substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: UGG becomes UGA; tryptophan becomes stop supports Nonsense substitution; Frameshift mutation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: UGG becomes UGA; tryptophan becomes stop supports Nonsense substitution; Missense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: UGG becomes UGA; tryptophan becomes stop supports Nonsense substitution; Silent substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: One base deleted early in coding sequence supports Frameshift mutation; Nonsense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: One base deleted early in coding sequence supports Frameshift mutation; Missense substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: One base deleted early in coding sequence supports Frameshift mutation; Silent substitution describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The supplied codon meanings make each classification answerable without an external table. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The supplied codon meanings make each classification answerable without an external table. This result is now recorded for the next comparison.

**Why/mechanism:** The supplied codon meanings make each classification answerable without an external table. A silent substitution preserves the amino acid, a missense substitution changes it, and a nonsense substitution introduces a premature stop. A one-base deletion changes downstream grouping in the stated coding sequence. These categories predict different possible effects on a protein, but none guarantees the magnitude of the organismal phenotype. The clinic must compare actual enzyme activity and appropriate controls before deciding how strongly to treat the sequence as an explanation.

**Mechanism links:** Information flow, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** A changed base can preserve the amino acid because the code is redundant.

**Wrong-path feedback:**

- A changed base can preserve the amino acid because the code is redundant.
- A stop codon is not another amino acid.
- Deleting one base changes grouping rather than just removing one whole codon.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Read the altered codons is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available.

**Unlock:** Stop 31.

**Retrieval:** M4 Stop 15 (Read the recovered leaves); M6 Stop 21 (Place the cell-cycle evidence); M6 Stop 23 (Test the growth signal)

**Later payoff:** Mission 10 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 30 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 31 — Compare sequence and function

**Format/placement:** DIAGNOSIS, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** discriminate explanations from all readings.

**Metadata:** Concept: 3 — Protein structure and enzymes; Keystone: Structure and function, Information flow, Experimental evidence; Area: CLINIC; Prerequisites: Mission primer and Stop 30: Read the altered codons; Learning role: RETRIEVE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** whether the sequence change can explain the weak enzyme.

**Actual mission answer:** Treat the changed enzyme as a supported lead, not a complete diagnosis.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | {"headline": "Compare sequence and function", "readings": [{"zone": "Variant", "label": "Sequence", "value": "Early nonsense codon in enzyme gene", "status": "watch"}, {"zone": "Protein", "label": "Purified enzyme activity", "value": "Low in variant, normal in matched reference", "status": "alarm"}, {"zone": "Other enzyme", "label": "Activity control", "value": "Normal in both lines", "status": "normal"}, {"zone": "Environment", "label": "Growth conditions", "value": "Matched in the comparison", "status": "normal"}], "choices": [{"label": "Truncated enzyme is a supported lead", "mechanism": "Truncated enzyme is a supported lead"}, {"label": "Every enzyme is heat-denatured", "mechanism": "Every enzyme is heat-denatured"}, {"label": "A gel alone proves causation", "mechanism": "A gel alone proves causation"}, {"label": "The sequence change is silent", "mechanism": "The sequence change is silent"}], "answer": "Truncated enzyme is a supported lead", "rebuttals": {"Every enzyme is heat-denatured": "The other enzyme remains normal under the same conditions.", "A gel alone proves causation": "The evidence includes activity, but a gel by itself only separates fragments.", "The sequence change is silent": "The supplied codon change introduces a stop rather than preserving an amino acid."}, "answerText": "The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions. This result is now recorded for the next comparison.", "why": "The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions. Normal activity of the other enzyme weakens a general heat-damage explanation. The combined evidence supports the truncated enzyme as a lead, but it does not isolate every possible linked genetic difference or prove the entire organismal phenotype. Structure, information and controlled evidence converge here. The team should retain the line and investigate further rather than declare complete causation from sequence alone."} |
| player_must_determine | "Read every measurement, including the normal control, and submit the one explanation consistent with them all." |
| correct_result | "Truncated enzyme is a supported lead" |
| most_tempting_wrong_result | "The other enzyme remains normal under the same conditions." |
| why_wrong_occurs | "The other enzyme remains normal under the same conditions." |
| story_consequence | "Compare sequence and function is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The sequence lead must meet measured enzyme activity.

**Question card story setup — exact player copy:** The codon comparison identifies a possible early stop in the weak-enzyme line, but sequence alone does not measure how the protein works. Compare activity and normal controls before deciding how strongly the clinic can interpret this genetic lead.

**Question card story-science connection — exact player copy:** An explanation must survive the normal controls before it can justify changing the release stock.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
headline: Compare sequence and function
readings:
- zone: Variant
  label: Sequence
  value: Early nonsense codon in enzyme gene
  status: watch
- zone: Protein
  label: Purified enzyme activity
  value: Low in variant, normal in matched reference
  status: alarm
- zone: Other enzyme
  label: Activity control
  value: Normal in both lines
  status: normal
- zone: Environment
  label: Growth conditions
  value: Matched in the comparison
  status: normal
choices:
- label: Truncated enzyme is a supported lead
  mechanism: Truncated enzyme is a supported lead
- label: Every enzyme is heat-denatured
  mechanism: Every enzyme is heat-denatured
- label: A gel alone proves causation
  mechanism: A gel alone proves causation
- label: The sequence change is silent
  mechanism: The sequence change is silent
answer: Truncated enzyme is a supported lead
rebuttals:
  Every enzyme is heat-denatured: The other enzyme remains normal under the same conditions.
  A gel alone proves causation: The evidence includes activity, but a gel by itself only separates fragments.
  The sequence change is silent: The supplied codon change introduces a stop rather than preserving an amino acid.
answerText: The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions. This result is now recorded for the next comparison.
why: The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions. Normal activity of the other enzyme weakens a general heat-damage explanation. The combined evidence supports the truncated enzyme as a lead, but it does not isolate every possible linked genetic difference or prove the entire organismal phenotype. Structure, information and controlled evidence converge here. The team should retain the line and investigate further rather than declare complete causation from sequence alone.
```

**Question card prompt — exact player copy:** Read every measurement, including the normal control, and submit the one explanation consistent with them all.

**Correct result:** "Truncated enzyme is a supported lead"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions. This result is now recorded for the next comparison.

**Why/mechanism:** The early stop can shorten the enzyme, and the activity comparison shows a specific functional difference under matched conditions. Normal activity of the other enzyme weakens a general heat-damage explanation. The combined evidence supports the truncated enzyme as a lead, but it does not isolate every possible linked genetic difference or prove the entire organismal phenotype. Structure, information and controlled evidence converge here. The team should retain the line and investigate further rather than declare complete causation from sequence alone.

**Mechanism links:** Structure and function, Information flow, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The other enzyme remains normal under the same conditions.

**Wrong-path feedback:**

- The other enzyme remains normal under the same conditions.
- The evidence includes activity, but a gel by itself only separates fragments.
- The supplied codon change introduces a stop rather than preserving an amino acid.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Compare sequence and function is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 32.

**Retrieval:** M6 Stop 22 (Compare dividing fractions); M6 Stop 23 (Test the growth signal); M6 Stop 24 (Hold one line)

**Later payoff:** Mission 10 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 31 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 32 — Keep the causal claim narrow

**Format/placement:** CHOICE, Mara Vale at Field Clinic — Care Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 20 — Mutations and biotechnology; Keystone: Information flow, Structure and function, Experimental evidence; Area: CLINIC; Prerequisites: Mission primer and Stop 31: Compare sequence and function; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether the sequence change can explain the weak enzyme.

**Actual mission answer:** Treat the changed enzyme as a supported lead, not a complete diagnosis.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "Truncated enzyme is a supported lead" |
| player_sees | "An early nonsense change accompanies low purified-enzyme activity; other enzyme activity and growth conditions are normal; no rescue or targeted replacement experiment has been performed." |
| player_must_determine | "Select the claim the evidence supports and the next handling decision." |
| correct_result | "Keep the line and test the enzyme lead" |
| most_tempting_wrong_result | "Linked differences and whole-organism effects have not all been isolated." |
| why_wrong_occurs | "Linked differences and whole-organism effects have not all been isolated." |
| story_consequence | "Keep the causal claim narrow is recorded with its evidence on the Field Clinic log; The enzyme lead is recorded and an environmental comparison is requested." |


**Call — exact player copy:** Go to Field Clinic and meet Mara Vale, veterinary biologist, at Care Board.

**Stop reason — exact player copy:** The clinic needs a claim no broader than the evidence.

**Question card story setup — exact player copy:** The activity test supports the enzyme lead under matched conditions, while another enzyme stays normal and the full organismal cause remains unresolved in the record. Choose the claim and handling decision that preserve useful evidence without overstating what was proved.

**Question card story-science connection — exact player copy:** Treat the changed enzyme as a supported lead, not a complete diagnosis.

**Data/readings/options:** An early nonsense change accompanies low purified-enzyme activity; other enzyme activity and growth conditions are normal; no rescue or targeted replacement experiment has been performed.

**Format-specific interaction block:**
```yaml
question: Select the claim the evidence supports and the next handling decision.
choices:
- Keep the line and test the enzyme lead
- Declare every trait fully explained
- Discard all neighboring seed families
- Ignore sequence and activity together
answer: Keep the line and test the enzyme lead
rebuttals:
  Declare every trait fully explained: Linked differences and whole-organism effects have not all been isolated.
  Discard all neighboring seed families: Neighboring families have not shown the same sequence and activity pattern.
  Ignore sequence and activity together: The paired sequence and activity evidence is informative even before a final causal test.
answerText: The sequence change offers a plausible mechanism for the specific enzyme deficit, and the matched activity measurements support that mechanism. Treat the changed enzyme as a supported lead, not a complete diagnosis.
why: The sequence change offers a plausible mechanism for the specific enzyme deficit, and the matched activity measurements support that mechanism. A stronger causal claim would need an experiment that isolates or rescues the proposed change, together with relevant phenotype measurements. The present evidence does not justify discarding neighboring families or explaining every trait. Keeping the line preserves both genetic diversity and an informative comparison. The next mission asks whether other changed appearances persist when environmental conditions are made the same.
```

**Question card prompt — exact player copy:** Select the claim the evidence supports and the next handling decision.

**Correct result:** "Keep the line and test the enzyme lead"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The sequence change offers a plausible mechanism for the specific enzyme deficit, and the matched activity measurements support that mechanism. Treat the changed enzyme as a supported lead, not a complete diagnosis.

**Why/mechanism:** The sequence change offers a plausible mechanism for the specific enzyme deficit, and the matched activity measurements support that mechanism. A stronger causal claim would need an experiment that isolates or rescues the proposed change, together with relevant phenotype measurements. The present evidence does not justify discarding neighboring families or explaining every trait. Keeping the line preserves both genetic diversity and an informative comparison. The next mission asks whether other changed appearances persist when environmental conditions are made the same.

**Mechanism links:** Information flow, Structure and function, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Linked differences and whole-organism effects have not all been isolated.

**Wrong-path feedback:**

- Linked differences and whole-organism effects have not all been isolated.
- Neighboring families have not shown the same sequence and activity pattern.
- The paired sequence and activity evidence is informative even before a final causal test.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Keep the causal claim narrow is recorded with its evidence on the Field Clinic log; The enzyme lead is recorded and an environmental comparison is requested.

**Unlock:** M8-B4 and mission outcome.

**Retrieval:** M6 Stop 22 (Compare dividing fractions); M6 Stop 23 (Test the growth signal); M6 Stop 24 (Hold one line)

**Later payoff:** Mission 10 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 32 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Treat the changed enzyme as a supported lead, not a complete diagnosis. The changed gene and weak enzyme fit one testable cause. The crew uses the plan just chosen. Similar-looking plants respond differently in the same growth room.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The enzyme lead is recorded and an environmental comparison is requested. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +3 | Receiving Habitat +3 | Care Supplies -1 | Island Health +2

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [1, 1, 1, 1] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [82, 82, 81, 81]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- DNA and RNA synthesis extend in the 5-prime to 3-prime direction.
- A sequence change can alter protein structure, but phenotype evidence is still needed.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Treat the changed enzyme as a supported lead, not a complete diagnosis.

---


# Mission 9 — THE SAME SEED IN TWO ROOMS

## A. Mission briefing card — exact player copy

**Header:** DAY 9 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE SAME SEED IN TWO ROOMS

**Go now:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at the Growth Bench.

**Card body:** The enzyme lead is preserved, but leaf shapes still give conflicting family labels. The same inherited instructions can produce different traits in different conditions. Compare paired seedlings in the Growth Hall, then read their family records. By the end of the mission, decide whether leaf shape alone is a reliable breeding label.

**Objective:** Resolve whether leaf shape alone is a reliable breeding label; a misleading label could remove useful seed families.

### Worth knowing first — exact player copy

#### Glossary terms

- Common-garden test: A comparison that raises organisms in the same conditions.
- Polygenic trait: A trait affected by more than one gene.
- Epigenetic regulation: Changes in gene use associated with DNA or chromatin marks without changing the DNA sequence.
- Linked genes: Genes on the same chromosome that can be inherited together.
- Chromatin: DNA with its associated proteins.
- Replication: Copying DNA before cell division.
- Replication fork: The region where DNA strands separate and are copied.
- Ligase: An enzyme that joins adjacent DNA fragments.
- Semiconservative: Describing DNA copying that leaves one old and one new strand in each daughter molecule.

#### Primer concepts

- Environment and genotype can both affect phenotype.
- Shared appearance does not prove shared ancestry.
- Recombination frequency can reveal linkage over short distances.

#### Equations first needed today

**Equation:** recombination (%) = recombinant offspring / total offspring × 100

**What it is for:** Estimate marker recombination frequency.

**Symbols:** Both quantities are counts from the same scored cross.

**Why this campaign needs it:** Keep ancestry traceable across changing leaf forms.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. Two genetically matched cuttings grow tall in shade and short in sun; environment can explain the difference without a new allele.

2. Ten recombinant offspring among 100 give 10% recombination, or about 10 map units for a short interval.

3. A trait affected by five genes is polygenic; a single 3:1 model need not fit it.

4. Two unaffected parents have an affected child in a simple fully penetrant recessive model; both parents can be carriers.

5. DNA methylation can change transcription without replacing bases; altered expression is not automatically evidence of inherited sequence change.

**Authoring-only failure consequence:** A misleading label could remove useful seed families.

**Authoring-only later travel:** After Stop 34, carry its evidence to Seed Room.

## B. Main story happening — designer summary

The enzyme lead is preserved, but leaf shapes still give conflicting family labels. The four-stop chain establishes separate appearance from ancestry, uses it to check the family marker distance, then keep the lineage traceable supplies the discriminating evidence for retire the appearance label. Appearance-only labels are removed and ancestry labels remain. A short-lived insect population has changed across many generations. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether leaf shape alone is a reliable breeding label. Actual final answer: Keep ancestry records and test leaf shape under matched conditions. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M9-B1 — On arrival at Growth Hall

**Location:** Growth Hall.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The enzyme lead is preserved, but leaf shapes still give conflicting family labels.

**Dialogue bubble — Ivo Reed, plant physiologist:** “The breeding labels must distinguish appearance from ancestry.”

**Unlocks:** Stop 33.

### Beat M9-B2 — After Stops 33 and 34

**Location:** Growth Hall.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Separate appearance from ancestry and Check the family marker distance with their accepted results.

**Panel/HUD text:** “The copied sequence must stay distinct from its expressed appearance. Go to Seed Room; its Family Board holds the next comparison.”

**Unlocks:** Stop 35 at Seed Room.

### Beat M9-B4 — After Stop 36

**Location:** Seed Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** Appearance-only labels are removed and ancestry labels remain.

**Panel/HUD text:** “Keep ancestry records and test leaf shape under matched conditions.”

**Unlocks:** The ungraded aftermath.

### Beat M9-BE — At mission end

**Location:** Seed Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** Appearance-only labels are removed and ancestry labels remain. A short-lived insect population has changed across many generations.

**Dialogue bubble — Nell Shah, conservation geneticist:** “A short-lived insect population has changed across many generations.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**2 locations:** Growth Hall → Seed Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 33 | Growth Hall | growth-bench | The breeding labels must distinguish appearance from ancestry. |
| 34 | Growth Hall | growth-bench | The family record needs a measured linkage estimate. |
| 35 | Seed Room | family-board | The copied sequence must stay distinct from its expressed appearance. |
| 36 | Seed Room | family-board | The seed team must retire a misleading appearance-only label. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Ivo Reed, plant physiologist, begins by owning the local evidence. Nell Shah, conservation geneticist, owns the final decision. The conflict is between a misleading label could remove useful seed families. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **19 — Regulation and differentiation:** The comparisons distinguish several ways a leaf can look different.

- **16 — Linkage and chi-square evidence:** The recombinant fraction is 16/80, so the estimated recombination frequency is 20 percent.

- **17 — DNA replication:** Semiconservative replication preserves a template strand in each daughter DNA molecule.

- **19 — Regulation and differentiation:** Leaf appearance responds to environment and can reflect several genetic contributions, so it cannot reliably replace family identity.

A simple recessive pedigree explanation requires assumptions about penetrance, new mutations and other inheritance mechanisms. Linkage means independent assortment cannot be applied blindly. For a chi-square comparison, sum (observed−expected)²/expected over categories and compare with an appropriate supplied critical value; rejection does not identify the biological cause.

## H1. Stop 33 — Separate appearance from ancestry

**Format/placement:** PROTOCOL, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 19 — Regulation and differentiation; Keystone: Regulation and feedback, Information flow, Inheritance and variation; Area: GROW; Prerequisites: Mission primer and Stop 32: Keep the causal claim narrow; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether leaf shape alone is a reliable breeding label.

**Actual mission answer:** Keep ancestry records and test leaf shape under matched conditions.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The enzyme lead is preserved, but leaf shapes still give conflicting family labels." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Same clone changes leaf form under two light treatments"}, {"id": "e2", "label": "Different family forms persist in one common environment"}, {"id": "e3", "label": "Chromatin marks change while DNA sequence stays fixed"}, {"id": "e4", "label": "Several loci contribute to continuous leaf width"}], "choices": [{"id": "r4", "label": "Polygenic inheritance"}, {"id": "r3", "label": "Epigenetic regulation"}, {"id": "r2", "label": "Inherited differences remain a hypothesis"}, {"id": "r1", "label": "Environmental plasticity"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Same clone changes leaf form under two light treatments supports Environmental plasticity; Polygenic inheritance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Same clone changes leaf form under two light treatments supports Environmental plasticity; Epigenetic regulation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Same clone changes leaf form under two light treatments supports Environmental plasticity; Inherited differences remain a hypothesis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Different family forms persist in one common environment supports Inherited differences remain a hypothesis; Polygenic inheritance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Different family forms persist in one common environment supports Inherited differences remain a hypothesis; Epigenetic regulation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Different family forms persist in one common environment supports Inherited differences remain a hypothesis; Environmental plasticity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Chromatin marks change while DNA sequence stays fixed supports Epigenetic regulation; Polygenic inheritance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Chromatin marks change while DNA sequence stays fixed supports Epigenetic regulation; Inherited differences remain a hypothesis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Chromatin marks change while DNA sequence stays fixed supports Epigenetic regulation; Environmental plasticity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Several loci contribute to continuous leaf width supports Polygenic inheritance; Epigenetic regulation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Several loci contribute to continuous leaf width supports Polygenic inheritance; Inherited differences remain a hypothesis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Several loci contribute to continuous leaf width supports Polygenic inheritance; Environmental plasticity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The comparisons distinguish several ways a leaf can look different. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "A clone response across environments need not be a new mutation." |
| why_wrong_occurs | "A clone response across environments need not be a new mutation." |
| story_consequence | "Separate appearance from ancestry is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The breeding labels must distinguish appearance from ancestry.

**Question card story setup — exact player copy:** The enzyme lead is preserved, but leaf shapes still give conflicting family labels when seedlings move between rooms with different light schedules. Compare the possible sources of those traits before the seed team changes its breeding records.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Same clone changes leaf form under two light treatments
- id: e2
  label: Different family forms persist in one common environment
- id: e3
  label: Chromatin marks change while DNA sequence stays fixed
- id: e4
  label: Several loci contribute to continuous leaf width
choices:
- id: r4
  label: Polygenic inheritance
- id: r3
  label: Epigenetic regulation
- id: r2
  label: Inherited differences remain a hypothesis
- id: r1
  label: Environmental plasticity
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Same clone changes leaf form under two light treatments supports Environmental plasticity; Polygenic inheritance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Same clone changes leaf form under two light treatments supports Environmental plasticity; Epigenetic regulation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Same clone changes leaf form under two light treatments supports Environmental plasticity; Inherited differences remain a hypothesis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Different family forms persist in one common environment supports Inherited differences remain a hypothesis; Polygenic inheritance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Different family forms persist in one common environment supports Inherited differences remain a hypothesis; Epigenetic regulation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Different family forms persist in one common environment supports Inherited differences remain a hypothesis; Environmental plasticity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Chromatin marks change while DNA sequence stays fixed supports Epigenetic regulation; Polygenic inheritance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Chromatin marks change while DNA sequence stays fixed supports Epigenetic regulation; Inherited differences remain a hypothesis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Chromatin marks change while DNA sequence stays fixed supports Epigenetic regulation; Environmental plasticity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Several loci contribute to continuous leaf width supports Polygenic inheritance; Epigenetic regulation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Several loci contribute to continuous leaf width supports Polygenic inheritance; Inherited differences remain a hypothesis describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Several loci contribute to continuous leaf width supports Polygenic inheritance; Environmental plasticity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The comparisons distinguish several ways a leaf can look different. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The comparisons distinguish several ways a leaf can look different. This result is now recorded for the next comparison.

**Why/mechanism:** The comparisons distinguish several ways a leaf can look different. A clone changing form under different light treatments demonstrates environmental influence for that clone. Differences between families in one environment can support inherited contributions but do not by themselves identify genes. Chromatin marks can regulate expression without changing sequence, and multiple loci can contribute to a continuous trait. These distinctions retrieve the light-response mechanism from the nursery and prevent a visual label from replacing the ancestry evidence needed for breeding decisions.

**Mechanism links:** Regulation and feedback, Information flow, Inheritance and variation are the specific broader principles used in the explanation above.

**Misconception:** A clone response across environments need not be a new mutation.

**Wrong-path feedback:**

- A clone response across environments need not be a new mutation.
- Persistent family differences support further inheritance tests rather than proving a named gene.
- Epigenetic regulation changes gene use, not necessarily DNA bases.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Separate appearance from ancestry is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 34.

**Retrieval:** M7 Stop 26 (Predict the test family); M7 Stop 27 (Interpret the family evidence); M7 Stop 28 (Choose the informative cross)

**Later payoff:** Mission 11 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 33 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 34 — Check the family marker distance

**Format/placement:** BALLPARK, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 16 — Linkage and chi-square evidence; Keystone: Inheritance and variation, Information flow; Area: GROW; Prerequisites: Mission primer and Stop 33: Separate appearance from ancestry; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether leaf shape alone is a reliable breeding label.

**Actual mission answer:** Keep ancestry records and test leaf shape under matched conditions.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "A linked-marker test cross produces 16 recombinant offspring among 80 total; all offspring are scored without viability bias. Use recombination percent = recombinants/total ×100." |
| player_must_determine | "Calculate and submit recombination frequency as a percent." |
| correct_result | 20 |
| most_tempting_wrong_result | "64 counts nonrecombinant offspring rather than recombinants." |
| why_wrong_occurs | "64 counts nonrecombinant offspring rather than recombinants." |
| story_consequence | "Check the family marker distance is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The family record needs a measured linkage estimate.

**Question card story setup — exact player copy:** The trait comparisons show why a leaf label can shift with conditions, so the team turns to inherited markers that remain traceable across environments. Calculate the marker recombination frequency before those records are used to keep families distinct.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** A linked-marker test cross produces 16 recombinant offspring among 80 total; all offspring are scored without viability bias. Use recombination percent = recombinants/total ×100.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Check the family marker distance
  units: '%'
  labels:
  - recombinants
  - total
  - percent scale
  - parent types
  values:
  - 16
  - 80
  - 100
  - 2
  slots: 3
  template: '{0} {1} {2} → %'
  formula: a/b*c
  correct:
  - 0
  - 1
  - 2
  target: 20
  correctResult: 20
  tolerance: 0.05
answerText: The recombinant fraction is 16/80, so the estimated recombination frequency is 20 percent. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Calculate and submit recombination frequency as a percent.

**Correct result:** 20; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The recombinant fraction is 16/80, so the estimated recombination frequency is 20 percent. This result is now recorded for the next comparison.

**Why/mechanism:** The recombinant fraction is 16/80, so the estimated recombination frequency is 20 percent. It is useful evidence of linkage under the stated test-cross assumptions; it is not a direct physical distance in base pairs. Multiple crossovers can complicate map-distance estimates, especially over larger intervals. Keeping the genotype markers separate from leaf appearance lets the seed team follow family inheritance even when growth conditions change the visible form. The result therefore strengthens the record system without pretending that one marker determines every trait.

**Mechanism links:** Inheritance and variation, Information flow are the specific broader principles used in the explanation above.

**Misconception:** 64 counts nonrecombinant offspring rather than recombinants.

**Wrong-path feedback:**

- 64 counts nonrecombinant offspring rather than recombinants.
- 0.2 is the fraction before conversion to percent.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Check the family marker distance is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 35.

**Retrieval:** M7 Stop 26 (Predict the test family); M7 Stop 27 (Interpret the family evidence); M7 Stop 28 (Choose the informative cross)

**Later payoff:** Mission 11 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 34 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 35 — Keep the lineage traceable

**Format/placement:** SEQUENCE, Seed Room — Family Board.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 17 — DNA replication; Keystone: Information flow, Inheritance and variation; Area: SEED; Prerequisites: Mission primer and Stop 34: Check the family marker distance; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether leaf shape alone is a reliable breeding label.

**Actual mission answer:** Keep ancestry records and test leaf shape under matched conditions.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 20 |
| player_sees | {"cards": [{"id": "p4", "label": "Each completed daughter DNA molecule contains one old and one new strand"}, {"id": "p3", "label": "Ligase joins adjacent fragments on the lagging strand"}, {"id": "p2", "label": "DNA polymerase extends new strands in the 5-prime to 3-prime direction"}, {"id": "p1", "label": "A parental DNA molecule opens at a replication fork"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Each upstream event supplies the condition required by the next.", "prerequisite_feedback": {"p2": "DNA polymerase extends new strands in the 5-prime to 3-prime direction requires the prior stated condition: A parental DNA molecule opens at a replication fork. Restore this dependency and retry the full causal order.", "p3": "Ligase joins adjacent fragments on the lagging strand requires the prior stated condition: DNA polymerase extends new strands in the 5-prime to 3-prime direction. Restore this dependency and retry the full causal order.", "p4": "Each completed daughter DNA molecule contains one old and one new strand requires the prior stated condition: Ligase joins adjacent fragments on the lagging strand. Restore this dependency and retry the full causal order."}, "answerText": "Semiconservative replication preserves a template strand in each daughter DNA molecule. This result is now recorded for the next comparison."} |
| player_must_determine | "Place every card in the biological causal order; submit the whole order." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "Ligase joins fragments; it does not replace template-directed synthesis." |
| why_wrong_occurs | "Ligase joins fragments; it does not replace template-directed synthesis." |
| story_consequence | "Keep the lineage traceable is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Family Board.

**Stop reason — exact player copy:** The copied sequence must stay distinct from its expressed appearance.

**Question card story setup — exact player copy:** The marker calculation gives the seed team a usable inheritance record, but copied DNA and changing leaf appearance are still being treated as the same thing. Trace the copying process before deciding which labels the breeding stock should keep.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: Each completed daughter DNA molecule contains one old and one new strand
- id: p3
  label: Ligase joins adjacent fragments on the lagging strand
- id: p2
  label: DNA polymerase extends new strands in the 5-prime to 3-prime direction
- id: p1
  label: A parental DNA molecule opens at a replication fork
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: Each upstream event supplies the condition required by the next.
prerequisite_feedback:
  p2: 'DNA polymerase extends new strands in the 5-prime to 3-prime direction requires the prior stated condition: A parental DNA molecule opens at a replication fork. Restore this dependency and retry the full causal order.'
  p3: 'Ligase joins adjacent fragments on the lagging strand requires the prior stated condition: DNA polymerase extends new strands in the 5-prime to 3-prime direction. Restore this dependency and retry the full causal order.'
  p4: 'Each completed daughter DNA molecule contains one old and one new strand requires the prior stated condition: Ligase joins adjacent fragments on the lagging strand. Restore this dependency and retry the full causal order.'
answerText: Semiconservative replication preserves a template strand in each daughter DNA molecule. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Place every card in the biological causal order; submit the whole order.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Semiconservative replication preserves a template strand in each daughter DNA molecule. This result is now recorded for the next comparison.

**Why/mechanism:** Semiconservative replication preserves a template strand in each daughter DNA molecule. DNA polymerase extends new DNA only in the 5-prime to 3-prime direction, so the two antiparallel templates require different synthesis arrangements. Ligase joins neighboring lagging-strand fragments after they are made. This simplified dependency order explains why copied marker DNA can track ancestry while expression changes alter leaf form. The family records need both kinds of evidence, because a copied sequence and a changed phenotype answer different questions.

**Mechanism links:** Information flow, Inheritance and variation are the specific broader principles used in the explanation above.

**Misconception:** Ligase joins fragments; it does not replace template-directed synthesis.

**Wrong-path feedback:**

- Ligase joins fragments; it does not replace template-directed synthesis.
- Two old strands together would not describe semiconservative daughter molecules.
- Polymerase extension is 5-prime to 3-prime, including the lagging-strand fragments.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Keep the lineage traceable is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 36.

**Retrieval:** M7 Stop 26 (Predict the test family); M7 Stop 27 (Interpret the family evidence); M7 Stop 28 (Choose the informative cross)

**Later payoff:** Mission 11 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 35 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 36 — Retire the appearance label

**Format/placement:** CHOICE, Nell Shah at Seed Room — Family Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 19 — Regulation and differentiation; Keystone: Information flow, Inheritance and variation, Regulation and feedback; Area: SEED; Prerequisites: Mission primer and Stop 35: Keep the lineage traceable; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether leaf shape alone is a reliable breeding label.

**Actual mission answer:** Keep ancestry records and test leaf shape under matched conditions.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | "Clonal seedlings change shape across light conditions; family marker records remain stable; recombination frequency between tested markers is 20%; leaf width also varies within families." |
| player_must_determine | "Choose how to label breeding stock while investigating leaf shape." |
| correct_result | "Keep ancestry and test matched conditions" |
| most_tempting_wrong_result | "The clone comparison shows that appearance can change without changing ancestry." |
| why_wrong_occurs | "The clone comparison shows that appearance can change without changing ancestry." |
| story_consequence | "Retire the appearance label is recorded with its evidence on the Seed Room log; Appearance-only labels are removed and ancestry labels remain." |


**Call — exact player copy:** Go to Seed Room and meet Nell Shah, conservation geneticist, at Family Board.

**Stop reason — exact player copy:** The seed team must retire a misleading appearance-only label.

**Question card story setup — exact player copy:** The copying model preserves the meaning of the marker records, while the clone comparison shows that leaf shape can change with the growing environment. Choose the breeding labels that keep ancestry available without pretending appearance contains the whole history.

**Question card story-science connection — exact player copy:** Keep ancestry records and test leaf shape under matched conditions.

**Data/readings/options:** Clonal seedlings change shape across light conditions; family marker records remain stable; recombination frequency between tested markers is 20%; leaf width also varies within families.

**Format-specific interaction block:**
```yaml
question: Choose how to label breeding stock while investigating leaf shape.
choices:
- Keep ancestry and test matched conditions
- Replace ancestry with leaf shape
- Call every shape a new species
- Pool every family with similar leaves
answer: Keep ancestry and test matched conditions
rebuttals:
  Replace ancestry with leaf shape: The clone comparison shows that appearance can change without changing ancestry.
  Call every shape a new species: A changed leaf shape alone does not establish reproductive isolation.
  Pool every family with similar leaves: Pooling similar-looking families erases the tested inheritance record.
answerText: Leaf appearance responds to environment and can reflect several genetic contributions, so it cannot reliably replace family identity. Keep ancestry records and test leaf shape under matched conditions.
why: 'Leaf appearance responds to environment and can reflect several genetic contributions, so it cannot reliably replace family identity. The marker records and test-cross evidence preserve inheritance information that appearance alone loses. Matched-condition tests can then estimate how much variation persists across families. This decision retrieves both signal regulation and meiosis: expression can change without a new sequence, while inherited markers can recombine. Keeping those processes distinct protects useful variation and prevents a visually tidy collection from becoming genetically narrow.'
```

**Question card prompt — exact player copy:** Choose how to label breeding stock while investigating leaf shape.

**Correct result:** "Keep ancestry and test matched conditions"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Leaf appearance responds to environment and can reflect several genetic contributions, so it cannot reliably replace family identity. Keep ancestry records and test leaf shape under matched conditions.

**Why/mechanism:** Leaf appearance responds to environment and can reflect several genetic contributions, so it cannot reliably replace family identity. The marker records and test-cross evidence preserve inheritance information that appearance alone loses. Matched-condition tests can then estimate how much variation persists across families. This decision retrieves both signal regulation and meiosis: expression can change without a new sequence, while inherited markers can recombine. Keeping those processes distinct protects useful variation and prevents a visually tidy collection from becoming genetically narrow.

**Mechanism links:** Information flow, Inheritance and variation, Regulation and feedback are the specific broader principles used in the explanation above.

**Misconception:** The clone comparison shows that appearance can change without changing ancestry.

**Wrong-path feedback:**

- The clone comparison shows that appearance can change without changing ancestry.
- A changed leaf shape alone does not establish reproductive isolation.
- Pooling similar-looking families erases the tested inheritance record.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Retire the appearance label is recorded with its evidence on the Seed Room log; Appearance-only labels are removed and ancestry labels remain.

**Unlock:** M9-B4 and mission outcome.

**Retrieval:** M7 Stop 26 (Predict the test family); M7 Stop 27 (Interpret the family evidence); M7 Stop 28 (Choose the informative cross)

**Later payoff:** Mission 11 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 36 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Keep ancestry records and test leaf shape under matched conditions. The same clone changes leaf shape with light. The crew uses the plan just chosen. A short-lived insect population has changed across many generations.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Appearance-only labels are removed and ancestry labels remain. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +4 | Receiving Habitat +3 | Care Supplies -1 | Island Health +2

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 4, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [86, 85, 84, 83]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Environment and genotype can both affect phenotype.
- Shared appearance does not prove shared ancestry.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Keep ancestry records and test leaf shape under matched conditions.

---


# Mission 10 — THE INSECTS THAT STAYED

## A. Mission briefing card — exact player copy

**Header:** DAY 10 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE INSECTS THAT STAYED

**Go now:** Go to Marsh Research Bay and meet Tess Rowan, field ecologist, at the Water Rack.

**Card body:** Leaf shape proved unreliable, but insect records show a change across many generations. Inherited traits can become more common when their carriers leave more offspring. Compare the field records, then test the population claim in the Field Planning Room. By the end of the mission, decide whether the insect change reflects selection or individual adjustment.

**Objective:** Resolve whether the insect change reflects selection or individual adjustment; a false explanation could guide the wrong release stock.

### Worth knowing first — exact player copy

#### Glossary terms

- Natural selection: Change driven by differences in survival and reproduction associated with inherited traits.
- Fitness: Reproductive success in a specified environment.
- Genetic drift: Random change in allele frequencies in a finite population.
- Gene flow: Movement of alleles between populations through reproduction.
- Allele frequency: The fraction of gene copies that are a particular allele.

#### Primer concepts

- Individuals can acclimate, but evolution describes population change across generations.
- Selection needs heritable variation and differential reproductive success.
- Drift occurs in finite populations and is strongest when populations are small.

#### Equations first needed today

No new equation is needed today; retrieve the recorded relationships and biological pathways from the mission log.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. A type has 5 offspring per adult and another has 2 in the same environment; the first has greater measured reproductive success there.

2. A neutral allele vanishes when three founders happen not to carry it; that is founder-effect drift.

3. A bird moves between populations and reproduces; its alleles contribute gene flow, while movement without reproduction need not.

4. Intermediate beaks have highest reproductive success; this is stabilizing selection.

5. Both extreme phenotypes outperform intermediates; this is disruptive selection, not automatically speciation.

**Authoring-only failure consequence:** A false explanation could guide the wrong release stock.

**Authoring-only later travel:** After Stop 38, carry its evidence to Field Planning Room.

## B. Main story happening — designer summary

Leaf shape proved unreliable, but insect records show a change across many generations. The four-stop chain establishes read the population histories, uses it to compare offspring contributions, then choose the selection pattern supplies the discriminating evidence for state what changed. The insect change is recorded as population-level selection under the measured conditions. A small source group may already have lost rare alleles. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the insect change reflects selection or individual adjustment. Actual final answer: Record population selection and protect the surviving variation. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M10-B1 — On arrival at Marsh Research Bay

**Location:** Marsh Research Bay.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** Leaf shape proved unreliable, but insect records show a change across many generations.

**Dialogue bubble — Tess Rowan, field ecologist:** “The insect archive needs a population-level explanation.”

**Unlocks:** Stop 37.

### Beat M10-B2 — After Stops 37 and 38

**Location:** Marsh Research Bay.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Read the population histories and Compare offspring contributions with their accepted results.

**Panel/HUD text:** “The archive needs the right selection pattern. Go to Field Planning Room; its Survey Table holds the next comparison.”

**Unlocks:** Stop 39 at Field Planning Room.

### Beat M10-B4 — After Stop 40

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The insect change is recorded as population-level selection under the measured conditions.

**Panel/HUD text:** “Record population selection and protect the surviving variation.”

**Unlocks:** The ungraded aftermath.

### Beat M10-BE — At mission end

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The insect change is recorded as population-level selection under the measured conditions. A small source group may already have lost rare alleles.

**Dialogue bubble — Ada Penn, preserve director:** “A small source group may already have lost rare alleles.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**2 locations:** Marsh Research Bay → Field Planning Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 37 | Marsh Research Bay | water-rack | The insect archive needs a population-level explanation. |
| 38 | Marsh Research Bay | water-rack | The selection claim needs reproductive contribution, not survival alone. |
| 39 | Field Planning Room | survey-table | The archive needs the right selection pattern. |
| 40 | Field Planning Room | release-board | The stock decision must retain uncertainty about future conditions. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Tess Rowan, field ecologist, begins by owning the local evidence. Ada Penn, preserve director, owns the final decision. The conflict is between a false explanation could guide the wrong release stock. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **22 — Natural selection and fitness:** The histories separate population evolution from an individual response.

- **22 — Natural selection and fitness:** The early group contributes 10 × 6 = 60 surviving offspring, compared with 10 × 3 = 30 for the late group.

- **22 — Natural selection and fitness:** Selection patterns describe which phenotypes have higher reproductive success in the measured environment.

- **22 — Natural selection and fitness:** The record links inherited emergence timing to differential reproductive success and a frequency increase across forty generations.

Evidence for common ancestry includes fossil order, biogeography, homologous structures, development and directly observed population changes. Selection acts through phenotypic differences associated with reproductive success; inherited differences can then change allele frequencies. Drift has no necessary direction toward better adaptation. Long-lived birds in this setting show observed behavior and acclimation, not a rapid evolved redesign.

## H1. Stop 37 — Read the population histories

**Format/placement:** PROTOCOL, Marsh Research Bay — Water Rack.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 22 — Natural selection and fitness; Keystone: Population change, Inheritance and variation; Area: MARSH; Prerequisites: Mission primer and Stop 36: Retire the appearance label; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the insect change reflects selection or individual adjustment.

**Actual mission answer:** Record population selection and protect the surviving variation.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "Leaf shape proved unreliable, but insect records show a change across many generations." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Inherited early-emergence type leaves more offspring"}, {"id": "e2", "label": "Random storm leaves a small unrepresentative sample"}, {"id": "e3", "label": "Immigrants reproduce with resident insects"}, {"id": "e4", "label": "One adult changes behavior during its lifetime"}], "choices": [{"id": "r4", "label": "Individual adjustment"}, {"id": "r3", "label": "Gene flow"}, {"id": "r2", "label": "Bottleneck drift"}, {"id": "r1", "label": "Natural selection"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Inherited early-emergence type leaves more offspring supports Natural selection; Individual adjustment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Inherited early-emergence type leaves more offspring supports Natural selection; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Inherited early-emergence type leaves more offspring supports Natural selection; Bottleneck drift describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Random storm leaves a small unrepresentative sample supports Bottleneck drift; Individual adjustment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Random storm leaves a small unrepresentative sample supports Bottleneck drift; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Random storm leaves a small unrepresentative sample supports Bottleneck drift; Natural selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Immigrants reproduce with resident insects supports Gene flow; Individual adjustment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Immigrants reproduce with resident insects supports Gene flow; Bottleneck drift describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Immigrants reproduce with resident insects supports Gene flow; Natural selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "One adult changes behavior during its lifetime supports Individual adjustment; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "One adult changes behavior during its lifetime supports Individual adjustment; Bottleneck drift describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "One adult changes behavior during its lifetime supports Individual adjustment; Natural selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The histories separate population evolution from an individual response. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Random survival in a bottleneck need not reflect a favored phenotype." |
| why_wrong_occurs | "Random survival in a bottleneck need not reflect a favored phenotype." |
| story_consequence | "Read the population histories is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The insect archive needs a population-level explanation.

**Question card story setup — exact player copy:** The seed labels now preserve ancestry, but decades of insect records show an emergence shift that cannot be explained by one plant changing shape. Compare population histories before deciding whether the island record supports a change across generations.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Inherited early-emergence type leaves more offspring
- id: e2
  label: Random storm leaves a small unrepresentative sample
- id: e3
  label: Immigrants reproduce with resident insects
- id: e4
  label: One adult changes behavior during its lifetime
choices:
- id: r4
  label: Individual adjustment
- id: r3
  label: Gene flow
- id: r2
  label: Bottleneck drift
- id: r1
  label: Natural selection
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Inherited early-emergence type leaves more offspring supports Natural selection; Individual adjustment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Inherited early-emergence type leaves more offspring supports Natural selection; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Inherited early-emergence type leaves more offspring supports Natural selection; Bottleneck drift describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Random storm leaves a small unrepresentative sample supports Bottleneck drift; Individual adjustment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Random storm leaves a small unrepresentative sample supports Bottleneck drift; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Random storm leaves a small unrepresentative sample supports Bottleneck drift; Natural selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Immigrants reproduce with resident insects supports Gene flow; Individual adjustment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Immigrants reproduce with resident insects supports Gene flow; Bottleneck drift describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Immigrants reproduce with resident insects supports Gene flow; Natural selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: One adult changes behavior during its lifetime supports Individual adjustment; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: One adult changes behavior during its lifetime supports Individual adjustment; Bottleneck drift describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: One adult changes behavior during its lifetime supports Individual adjustment; Natural selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The histories separate population evolution from an individual response. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The histories separate population evolution from an individual response. This result is now recorded for the next comparison.

**Why/mechanism:** The histories separate population evolution from an individual response. Natural selection requires inherited variation associated with reproductive success, while a random bottleneck can change frequencies without favoring a useful trait. Reproducing migrants contribute gene flow. One adult changing its behavior does not by itself establish an inherited population change. The distinction matters because the preserve has been isolated for decades: short-lived insects can pass through many generations, but the same timescale would not justify an equivalent evolutionary claim about every long-lived animal.

**Mechanism links:** Population change, Inheritance and variation are the specific broader principles used in the explanation above.

**Misconception:** Random survival in a bottleneck need not reflect a favored phenotype.

**Wrong-path feedback:**

- Random survival in a bottleneck need not reflect a favored phenotype.
- Movement contributes gene flow only when alleles enter reproduction.
- Lifetime behavior change alone does not establish evolution.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Read the population histories is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 38.

**Retrieval:** M7 Stop 26 (Predict the test family); M7 Stop 27 (Interpret the family evidence); M7 Stop 28 (Choose the informative cross)

**Later payoff:** Mission 12 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 37 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 38 — Compare offspring contributions

**Format/placement:** BALLPARK, Marsh Research Bay — Water Rack.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 22 — Natural selection and fitness; Keystone: Population change, Inheritance and variation; Area: MARSH; Prerequisites: Mission primer and Stop 37: Read the population histories; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the insect change reflects selection or individual adjustment.

**Actual mission answer:** Record population selection and protect the surviving variation.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Ten early-emergence adults average 6 surviving offspring each; ten late-emergence adults average 3 each in the same monitored season." |
| player_must_determine | "Calculate the early group contribution with adults times offspring per adult; submit surviving offspring." |
| correct_result | 60 |
| most_tempting_wrong_result | "30 uses the late group reproductive rate." |
| why_wrong_occurs | "30 uses the late group reproductive rate." |
| story_consequence | "Compare offspring contributions is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The selection claim needs reproductive contribution, not survival alone.

**Question card story setup — exact player copy:** The population histories separate lifetime adjustment from inherited change, and the archive includes offspring counts for early and late emergence types in the same season. Calculate one group contribution before using the reproductive contrast to interpret the frequency record.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** Ten early-emergence adults average 6 surviving offspring each; ten late-emergence adults average 3 each in the same monitored season.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Compare offspring contributions
  units: offspring
  labels:
  - early adults
  - early offspring per adult
  - late adults
  - late offspring per adult
  values:
  - 10
  - 6
  - 10
  - 3
  slots: 2
  template: '{0} {1} → offspring'
  formula: a*b
  correct:
  - 0
  - 1
  target: 60
  correctResult: 60
  tolerance: 0.05
answerText: The early group contributes 10 × 6 = 60 surviving offspring, compared with 10 × 3 = 30 for the late group. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Calculate the early group contribution with adults times offspring per adult; submit surviving offspring.

**Correct result:** 60; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The early group contributes 10 × 6 = 60 surviving offspring, compared with 10 × 3 = 30 for the late group. This result is now recorded for the next comparison.

**Why/mechanism:** The early group contributes 10 × 6 = 60 surviving offspring, compared with 10 × 3 = 30 for the late group. The equal adult counts make the reproductive contrast easy to interpret. A single season alone would not prove a lasting genetic change, but the archive also tracks inherited emergence types across repeated generations. Together those records support selection in the stated environment. Fitness here means reproductive contribution under those conditions, not general superiority or an organism trying to meet the preserve plan.

**Mechanism links:** Population change, Inheritance and variation are the specific broader principles used in the explanation above.

**Misconception:** 30 uses the late group reproductive rate.

**Wrong-path feedback:**

- 30 uses the late group reproductive rate.
- 6 reports offspring per adult rather than the whole group contribution.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Compare offspring contributions is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 39.

**Retrieval:** M7 Stop 26 (Predict the test family); M7 Stop 27 (Interpret the family evidence); M7 Stop 28 (Choose the informative cross)

**Later payoff:** Mission 12 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 38 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 39 — Choose the selection pattern

**Format/placement:** PROTOCOL, Field Planning Room — Survey Table.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 22 — Natural selection and fitness; Keystone: Population change, Experimental evidence; Area: PLAN; Prerequisites: Mission primer and Stop 38: Compare offspring contributions; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the insect change reflects selection or individual adjustment.

**Actual mission answer:** Record population selection and protect the surviving variation.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 60 |
| player_sees | {"scenarios": [{"id": "e1", "label": "Earlier emergence has the highest reproductive output"}, {"id": "e2", "label": "Middle emergence dates have the highest output"}, {"id": "e3", "label": "Both early and late extremes exceed the middle"}, {"id": "e4", "label": "All dates reproduce equally but founder frequencies differ"}], "choices": [{"id": "r4", "label": "Drift rather than this measured selection pattern"}, {"id": "r3", "label": "Disruptive selection"}, {"id": "r2", "label": "Stabilizing selection"}, {"id": "r1", "label": "Directional selection"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Earlier emergence has the highest reproductive output supports Directional selection; Drift rather than this measured selection pattern describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Earlier emergence has the highest reproductive output supports Directional selection; Disruptive selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Earlier emergence has the highest reproductive output supports Directional selection; Stabilizing selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Middle emergence dates have the highest output supports Stabilizing selection; Drift rather than this measured selection pattern describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Middle emergence dates have the highest output supports Stabilizing selection; Disruptive selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Middle emergence dates have the highest output supports Stabilizing selection; Directional selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Both early and late extremes exceed the middle supports Disruptive selection; Drift rather than this measured selection pattern describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Both early and late extremes exceed the middle supports Disruptive selection; Stabilizing selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Both early and late extremes exceed the middle supports Disruptive selection; Directional selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "All dates reproduce equally but founder frequencies differ supports Drift rather than this measured selection pattern; Disruptive selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "All dates reproduce equally but founder frequencies differ supports Drift rather than this measured selection pattern; Stabilizing selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "All dates reproduce equally but founder frequencies differ supports Drift rather than this measured selection pattern; Directional selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "Selection patterns describe which phenotypes have higher reproductive success in the measured environment. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "One favored extreme is directional, not disruptive." |
| why_wrong_occurs | "One favored extreme is directional, not disruptive." |
| story_consequence | "Choose the selection pattern is recorded with its evidence on the Field Planning Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Planning Room and use Survey Table.

**Stop reason — exact player copy:** The archive needs the right selection pattern.

**Question card story setup — exact player copy:** The offspring calculation reveals different reproductive contributions, but the director needs the pattern described precisely before it shapes a release-stock recommendation for the mainland. Match the alternative selection patterns to keep a current advantage from becoming a claim of universal superiority.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Earlier emergence has the highest reproductive output
- id: e2
  label: Middle emergence dates have the highest output
- id: e3
  label: Both early and late extremes exceed the middle
- id: e4
  label: All dates reproduce equally but founder frequencies differ
choices:
- id: r4
  label: Drift rather than this measured selection pattern
- id: r3
  label: Disruptive selection
- id: r2
  label: Stabilizing selection
- id: r1
  label: Directional selection
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Earlier emergence has the highest reproductive output supports Directional selection; Drift rather than this measured selection pattern describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Earlier emergence has the highest reproductive output supports Directional selection; Disruptive selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Earlier emergence has the highest reproductive output supports Directional selection; Stabilizing selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Middle emergence dates have the highest output supports Stabilizing selection; Drift rather than this measured selection pattern describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Middle emergence dates have the highest output supports Stabilizing selection; Disruptive selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Middle emergence dates have the highest output supports Stabilizing selection; Directional selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Both early and late extremes exceed the middle supports Disruptive selection; Drift rather than this measured selection pattern describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Both early and late extremes exceed the middle supports Disruptive selection; Stabilizing selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Both early and late extremes exceed the middle supports Disruptive selection; Directional selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: All dates reproduce equally but founder frequencies differ supports Drift rather than this measured selection pattern; Disruptive selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: All dates reproduce equally but founder frequencies differ supports Drift rather than this measured selection pattern; Stabilizing selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: All dates reproduce equally but founder frequencies differ supports Drift rather than this measured selection pattern; Directional selection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: Selection patterns describe which phenotypes have higher reproductive success in the measured environment. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Selection patterns describe which phenotypes have higher reproductive success in the measured environment. This result is now recorded for the next comparison.

**Why/mechanism:** Selection patterns describe which phenotypes have higher reproductive success in the measured environment. Favoring one extreme is directional; favoring the middle is stabilizing; favoring both extremes is disruptive. If reproductive success is equal while founding frequencies differ randomly, the supplied evidence supports drift instead. The categories organize the archive without claiming that selection always improves every trait or that a disruptive pattern automatically creates species. The director needs the mechanism because a release plan must preserve variation appropriate to uncertain future conditions.

**Mechanism links:** Population change, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** One favored extreme is directional, not disruptive.

**Wrong-path feedback:**

- One favored extreme is directional, not disruptive.
- Intermediate success defines stabilizing selection.
- Equal reproductive output does not establish the supplied selection contrast.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Choose the selection pattern is recorded with its evidence on the Field Planning Room log; the next comparison becomes available.

**Unlock:** Stop 40.

**Retrieval:** M7 Stop 28 (Choose the informative cross); M8 Stop 31 (Compare sequence and function); M8 Stop 32 (Keep the causal claim narrow)

**Later payoff:** Mission 12 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 39 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 40 — State what changed

**Format/placement:** CHOICE, Ada Penn at Field Planning Room — Release Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 22 — Natural selection and fitness; Keystone: Population change, Inheritance and variation, Experimental evidence; Area: PLAN; Prerequisites: Mission primer and Stop 39: Choose the selection pattern; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the insect change reflects selection or individual adjustment.

**Actual mission answer:** Record population selection and protect the surviving variation.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Archive: emergence timing is heritable in breeding tests; early types leave more offspring; their frequency rises over 40 insect generations; adult behavior changes alone cannot reproduce that record." |
| player_must_determine | "Select the supported population claim and handling decision." |
| correct_result | "Record selection and retain variation" |
| most_tempting_wrong_result | "Individuals do not change inherited population frequencies by needing a trait." |
| why_wrong_occurs | "Individuals do not change inherited population frequencies by needing a trait." |
| story_consequence | "State what changed is recorded with its evidence on the Field Planning Room log; The insect change is recorded as population-level selection under the measured conditions." |


**Call — exact player copy:** Go to Field Planning Room and meet Ada Penn, preserve director, at Release Board.

**Stop reason — exact player copy:** The stock decision must retain uncertainty about future conditions.

**Question card story setup — exact player copy:** The breeding tests, offspring counts and repeated-generation record now support one population explanation, while the receiving environment remains uncertain in important ways for the insects. Choose a claim that explains the archive without discarding variation that may matter after movement.

**Question card story-science connection — exact player copy:** Record population selection and protect the surviving variation.

**Data/readings/options:** Archive: emergence timing is heritable in breeding tests; early types leave more offspring; their frequency rises over 40 insect generations; adult behavior changes alone cannot reproduce that record.

**Format-specific interaction block:**
```yaml
question: Select the supported population claim and handling decision.
choices:
- Record selection and retain variation
- Say each adult evolved on demand
- Declare every late type defective
- Claim the records prove a new species
answer: Record selection and retain variation
rebuttals:
  Say each adult evolved on demand: Individuals do not change inherited population frequencies by needing a trait.
  Declare every late type defective: A current reproductive disadvantage does not prove universal defectiveness.
  Claim the records prove a new species: Reproductive isolation has not been established.
answerText: The record links inherited emergence timing to differential reproductive success and a frequency increase across forty generations. Record population selection and protect the surviving variation.
why: The record links inherited emergence timing to differential reproductive success and a frequency increase across forty generations. That supports natural selection in this population under the recorded conditions. It does not imply that individual adults evolved because they needed to, that the later type is useless in every environment, or that reproductive isolation has formed. Retaining variation respects uncertainty about the receiving site. The decision explains the mismatch with the old calendar while keeping the release plan from treating one current advantage as a universal optimum.
```

**Question card prompt — exact player copy:** Select the supported population claim and handling decision.

**Correct result:** "Record selection and retain variation"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The record links inherited emergence timing to differential reproductive success and a frequency increase across forty generations. Record population selection and protect the surviving variation.

**Why/mechanism:** The record links inherited emergence timing to differential reproductive success and a frequency increase across forty generations. That supports natural selection in this population under the recorded conditions. It does not imply that individual adults evolved because they needed to, that the later type is useless in every environment, or that reproductive isolation has formed. Retaining variation respects uncertainty about the receiving site. The decision explains the mismatch with the old calendar while keeping the release plan from treating one current advantage as a universal optimum.

**Mechanism links:** Population change, Inheritance and variation, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Individuals do not change inherited population frequencies by needing a trait.

**Wrong-path feedback:**

- Individuals do not change inherited population frequencies by needing a trait.
- A current reproductive disadvantage does not prove universal defectiveness.
- Reproductive isolation has not been established.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** State what changed is recorded with its evidence on the Field Planning Room log; The insect change is recorded as population-level selection under the measured conditions.

**Unlock:** M10-B4 and mission outcome.

**Retrieval:** M7 Stop 28 (Choose the informative cross); M8 Stop 31 (Compare sequence and function); M8 Stop 32 (Keep the causal claim narrow)

**Later payoff:** Mission 12 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 40 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Record population selection and protect the surviving variation. Inherited early types leave more offspring. The crew uses the plan just chosen. A small source group may already have lost rare alleles.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The insect change is recorded as population-level selection under the measured conditions. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +4 | Receiving Habitat +4 | Care Supplies -2 | Island Health +3

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 4, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [90, 89, 86, 86]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Individuals can acclimate, but evolution describes population change across generations.
- Selection needs heritable variation and differential reproductive success.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Record population selection and protect the surviving variation.

---


# Mission 11 — THE SEEDS LEFT OUT

## A. Mission briefing card — exact player copy

**Header:** DAY 11 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE SEEDS LEFT OUT

**Go now:** Go to Seed Room and meet Nell Shah, conservation geneticist, at the Seed Table.

**Card body:** The insect history is clear, but the proposed seed shipment comes from one large family. A small sample can lose alleles even when its plants look healthy. Count family variation, check genetic tests, then revise the list at the Release Board. By the end of the mission, decide whether the largest seed family is enough for the pilot.

**Objective:** Resolve whether the largest seed family is enough for the pilot; the new population could start with too little variation.

### Worth knowing first — exact player copy

#### Glossary terms

- Hardy-Weinberg model: A no-evolution reference model relating allele and genotype frequencies under stated assumptions.
- Heterozygote: An organism carrying two different alleles at a locus.
- Reproductive isolation: Barriers that reduce successful reproduction between populations.
- Phylogeny: A hypothesis about evolutionary relationships.
- Prezygotic barrier: A barrier acting before a fertilized cell forms.
- Postzygotic barrier: A barrier affecting hybrid survival or reproduction after fertilization.
- Founder effect: A change in allele frequencies caused by the chance composition of a small founding group.

#### Primer concepts

- Hardy-Weinberg needs large population, random mating, no selection, mutation or gene flow.
- A model deviation does not name its cause alone.
- Close relatives can still differ in useful alleles and tested habitat needs.

#### Equations first needed today

**Equation:** p = (2AA + Aa)/(2N); p + q = 1; expected heterozygote fraction = 2pq

**What it is for:** Count alleles and obtain a Hardy-Weinberg reference.

**Symbols:** AA and Aa are genotype counts; N is diploid plant count; p and q are allele frequencies.

**Why this campaign needs it:** Compare what a founding family contains with a conditional reference.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. With p = 0.7 and q = 0.3, expected heterozygotes are 2pq = 0.42 or 42%.

2. If recessive homozygotes are 25% under Hardy-Weinberg assumptions, q = √0.25 = 0.5 and p = 0.5.

3. Observed offspring are 30 dominant and 10 recessive; a 3:1 model predicts those same counts, so χ² = (30−30)²/30 + (10−10)²/10 = 0, with no evidence here against that ratio.

4. Two populations mate at different seasons; that is a prezygotic barrier because fertilization is prevented.

5. On a tree where A and B share a more recent node than either does with C, A and B share the most recent common ancestor of that pair.

**Authoring-only failure consequence:** The new population could start with too little variation.

**Authoring-only later travel:** After Stop 42, carry its evidence to Genetics Trailer. After Stop 43, carry the tested constraints to Field Planning Room.

## B. Main story happening — designer summary

The insect history is clear, but the proposed seed shipment comes from one large family. The four-stop chain establishes count the retained allele, uses it to separate population explanations, then check the reference model supplies the discriminating evidence for keep several families. Several screened families replace the single-family shipment. The chosen plants still depend on partners missing from the manifest. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the largest seed family is enough for the pilot. Actual final answer: Take several tested families and keep a reserve. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M11-B1 — On arrival at Seed Room

**Location:** Seed Room.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The insect history is clear, but the proposed seed shipment comes from one large family.

**Dialogue bubble — Nell Shah, conservation geneticist:** “The largest family must be assessed for the variation it contains.”

**Unlocks:** Stop 41.

### Beat M11-B2 — After Stops 41 and 42

**Location:** Seed Room.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Count the retained allele and Separate population explanations with their accepted results.

**Panel/HUD text:** “The reference model needs its own expected genotype frequency. Go to Genetics Trailer; its DNA Bench holds the next comparison.”

**Unlocks:** Stop 43 at Genetics Trailer.

### Beat M11-B3 — After Stop 43

**Location:** Genetics Trailer.

**Presentation:** waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The tested constraint is pinned to the sample cart.

**Panel/HUD text:** “Go to Field Planning Room and meet Ada Penn, preserve director, at the Release Board; only the director can authorize the combined plan.”

**Unlocks:** Stop 44.

### Beat M11-B4 — After Stop 44

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** Several screened families replace the single-family shipment.

**Panel/HUD text:** “Take several tested families and keep a reserve.”

**Unlocks:** The ungraded aftermath.

### Beat M11-BE — At mission end

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** Several screened families replace the single-family shipment. The chosen plants still depend on partners missing from the manifest.

**Dialogue bubble — Ada Penn, preserve director:** “The chosen plants still depend on partners missing from the manifest.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**3 locations:** Seed Room → Genetics Trailer → Field Planning Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 41 | Seed Room | seed-table | The largest family must be assessed for the variation it contains. |
| 42 | Seed Room | seed-table | The founding plan needs the right population mechanisms. |
| 43 | Genetics Trailer | dna-bench | The reference model needs its own expected genotype frequency. |
| 44 | Field Planning Room | release-board | The manifest must preserve screened variation beyond one family. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Nell Shah, conservation geneticist, begins by owning the local evidence. Ada Penn, preserve director, owns the final decision. The conflict is between the new population could start with too little variation. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **24 — Hardy-Weinberg models:** There are 2 × 8 + 8 = 24 A copies among 2 × 20 = 40 total copies, giving p = 0.6.

- **23 — Drift and gene flow:** A small founding sample can omit alleles by chance even when every selected plant is healthy.

- **24 — Hardy-Weinberg models:** The reference expectation is 2pq = 2 × 0.6 × 0.4 = 0.48, or 48 percent heterozygotes.

- **23 — Drift and gene flow:** Several screened families preserve variation that the largest family lacks, while the retained island reserve protects against a failed first establishment.

Hardy-Weinberg is a reference under stated assumptions, not a mechanism causing equilibrium. Allopatric speciation involves geographic separation; sympatric divergence occurs without that separation, but reproductive isolation must still be established. A cladogram node represents a common ancestor; rotating branches does not change relatedness. An outgroup helps root a tree. The M11 example retains only the branching relationship actually supplied.

## H1. Stop 41 — Count the retained allele

**Format/placement:** BALLPARK, Seed Room — Seed Table.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 24 — Hardy-Weinberg models; Keystone: Population change, Inheritance and variation; Area: SEED; Prerequisites: Mission primer and Stop 40: State what changed; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the largest seed family is enough for the pilot.

**Actual mission answer:** Take several tested families and keep a reserve.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The insect history is clear, but the proposed seed shipment comes from one large family." |
| player_sees | "A screened family contains 8 AA, 8 Aa and 4 aa diploid plants. Count A copies as 2AA + Aa and divide by twice the plant count." |
| player_must_determine | "Use the tiles to calculate A allele frequency; submit the fraction from zero to one." |
| correct_result | 0.6 |
| most_tempting_wrong_result | "0.8 counts plants carrying A rather than copies of A." |
| why_wrong_occurs | "0.8 counts plants carrying A rather than copies of A." |
| story_consequence | "Count the retained allele is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Seed Table.

**Stop reason — exact player copy:** The largest family must be assessed for the variation it contains.

**Question card story setup — exact player copy:** The insect record supports selection, but the proposed seed shipment still comes from one large family that looks healthy in the nursery. Count its allele copies before the team decides whether size alone preserves enough variation for founding a population.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** A screened family contains 8 AA, 8 Aa and 4 aa diploid plants. Count A copies as 2AA + Aa and divide by twice the plant count.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Count the retained allele
  units: fraction
  labels:
  - A copies
  - total copies
  - plants
  - heterozygotes
  values:
  - 24
  - 40
  - 20
  - 8
  slots: 2
  template: '{0} {1} → fraction'
  formula: a/b
  correct:
  - 0
  - 1
  target: 0.6
  correctResult: 0.6
  tolerance: 0.05
answerText: There are 2 × 8 + 8 = 24 A copies among 2 × 20 = 40 total copies, giving p = 0.6. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Use the tiles to calculate A allele frequency; submit the fraction from zero to one.

**Correct result:** 0.6; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** There are 2 × 8 + 8 = 24 A copies among 2 × 20 = 40 total copies, giving p = 0.6. This result is now recorded for the next comparison.

**Why/mechanism:** There are 2 × 8 + 8 = 24 A copies among 2 × 20 = 40 total copies, giving p = 0.6. Counting plants with A would confuse genotype presence with allele copies. This frequency is an observed count and does not require Hardy-Weinberg equilibrium. It establishes what the sampled family contains before the team compares it with a no-evolution reference model. The distinction keeps a healthy-looking shipment from hiding how much genetic variation its selected families actually preserve.

**Mechanism links:** Population change, Inheritance and variation are the specific broader principles used in the explanation above.

**Misconception:** 0.8 counts plants carrying A rather than copies of A.

**Wrong-path feedback:**

- 0.8 counts plants carrying A rather than copies of A.
- 1.2 divides allele copies by plants instead of total gene copies.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Count the retained allele is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 42.

**Retrieval:** M9 Stop 34 (Check the family marker distance); M9 Stop 35 (Keep the lineage traceable); M9 Stop 36 (Retire the appearance label)

**Later payoff:** Mission 13 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 41 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 42 — Separate population explanations

**Format/placement:** PROTOCOL, Seed Room — Seed Table.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 23 — Drift and gene flow; Keystone: Population change, Inheritance and variation; Area: SEED; Prerequisites: Mission primer and Stop 41: Count the retained allele; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the largest seed family is enough for the pilot.

**Actual mission answer:** Take several tested families and keep a reserve.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 0.6 |
| player_sees | {"scenarios": [{"id": "e1", "label": "Small shipment randomly omits a rare allele"}, {"id": "e2", "label": "Reproducing immigrants add a missing allele"}, {"id": "e3", "label": "Different breeding seasons block fertilization"}, {"id": "e4", "label": "Hybrid offspring survive but cannot reproduce"}], "choices": [{"id": "r4", "label": "Postzygotic isolation"}, {"id": "r3", "label": "Prezygotic isolation"}, {"id": "r2", "label": "Gene flow"}, {"id": "r1", "label": "Founder effect"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Small shipment randomly omits a rare allele supports Founder effect; Postzygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Small shipment randomly omits a rare allele supports Founder effect; Prezygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Small shipment randomly omits a rare allele supports Founder effect; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Reproducing immigrants add a missing allele supports Gene flow; Postzygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Reproducing immigrants add a missing allele supports Gene flow; Prezygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Reproducing immigrants add a missing allele supports Gene flow; Founder effect describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Different breeding seasons block fertilization supports Prezygotic isolation; Postzygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Different breeding seasons block fertilization supports Prezygotic isolation; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Different breeding seasons block fertilization supports Prezygotic isolation; Founder effect describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Hybrid offspring survive but cannot reproduce supports Postzygotic isolation; Prezygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Hybrid offspring survive but cannot reproduce supports Postzygotic isolation; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Hybrid offspring survive but cannot reproduce supports Postzygotic isolation; Founder effect describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "A small founding sample can omit alleles by chance even when every selected plant is healthy. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Failure before fertilization is prezygotic, not postzygotic." |
| why_wrong_occurs | "Failure before fertilization is prezygotic, not postzygotic." |
| story_consequence | "Separate population explanations is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Seed Table.

**Stop reason — exact player copy:** The founding plan needs the right population mechanisms.

**Question card story setup — exact player copy:** The allele count describes the selected family, but it does not explain what might be lost when only a small part of the collection travels. Separate founding, migration and reproductive barriers before comparing the shipment with a population model.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Small shipment randomly omits a rare allele
- id: e2
  label: Reproducing immigrants add a missing allele
- id: e3
  label: Different breeding seasons block fertilization
- id: e4
  label: Hybrid offspring survive but cannot reproduce
choices:
- id: r4
  label: Postzygotic isolation
- id: r3
  label: Prezygotic isolation
- id: r2
  label: Gene flow
- id: r1
  label: Founder effect
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Small shipment randomly omits a rare allele supports Founder effect; Postzygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Small shipment randomly omits a rare allele supports Founder effect; Prezygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Small shipment randomly omits a rare allele supports Founder effect; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Reproducing immigrants add a missing allele supports Gene flow; Postzygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Reproducing immigrants add a missing allele supports Gene flow; Prezygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Reproducing immigrants add a missing allele supports Gene flow; Founder effect describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Different breeding seasons block fertilization supports Prezygotic isolation; Postzygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Different breeding seasons block fertilization supports Prezygotic isolation; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Different breeding seasons block fertilization supports Prezygotic isolation; Founder effect describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Hybrid offspring survive but cannot reproduce supports Postzygotic isolation; Prezygotic isolation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Hybrid offspring survive but cannot reproduce supports Postzygotic isolation; Gene flow describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Hybrid offspring survive but cannot reproduce supports Postzygotic isolation; Founder effect describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: A small founding sample can omit alleles by chance even when every selected plant is healthy. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** A small founding sample can omit alleles by chance even when every selected plant is healthy. This result is now recorded for the next comparison.

**Why/mechanism:** A small founding sample can omit alleles by chance even when every selected plant is healthy. Gene flow can add alleles through successful reproduction, while prezygotic and postzygotic barriers affect different stages of reproduction. These mechanisms should not be collapsed into a claim that all separated populations are new species. The seed shipment is a deliberate founding event, so the crew can reduce avoidable sampling loss by retaining several screened families and a reserve without ignoring compatibility or habitat evidence.

**Mechanism links:** Population change, Inheritance and variation are the specific broader principles used in the explanation above.

**Misconception:** Failure before fertilization is prezygotic, not postzygotic.

**Wrong-path feedback:**

- Failure before fertilization is prezygotic, not postzygotic.
- Random allele omission is drift rather than proof of selection.
- Immigration must contribute to reproduction to count as gene flow.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Separate population explanations is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 43.

**Retrieval:** M9 Stop 34 (Check the family marker distance); M9 Stop 35 (Keep the lineage traceable); M9 Stop 36 (Retire the appearance label)

**Later payoff:** Mission 13 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 42 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 43 — Check the reference model

**Format/placement:** BALLPARK, Genetics Trailer — DNA Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 24 — Hardy-Weinberg models; Keystone: Population change, Experimental evidence; Area: GENE; Prerequisites: Mission primer and Stop 42: Separate population explanations; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the largest seed family is enough for the pilot.

**Actual mission answer:** Take several tested families and keep a reserve.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Use recorded p = 0.6 and q = 0.4. Under Hardy-Weinberg assumptions, expected heterozygote fraction is 2pq." |
| player_must_determine | "Multiply the two allele frequencies and two; submit expected heterozygote percent." |
| correct_result | 48 |
| most_tempting_wrong_result | "24 omits the two possible parental allele orders." |
| why_wrong_occurs | "24 omits the two possible parental allele orders." |
| story_consequence | "Check the reference model is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available." |


**Call — exact player copy:** Go to Genetics Trailer and use DNA Bench.

**Stop reason — exact player copy:** The reference model needs its own expected genotype frequency.

**Question card story setup — exact player copy:** The population mechanisms show why a shipment can lose variation by chance, and the measured allele frequencies now define a useful reference expectation. Calculate the model value before the director treats any difference as proof of a particular evolutionary cause.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** Use recorded p = 0.6 and q = 0.4. Under Hardy-Weinberg assumptions, expected heterozygote fraction is 2pq.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Check the reference model
  units: '%'
  labels:
  - two
  - p
  - q
  - percent scale
  values:
  - 2
  - 0.6
  - 0.4
  - 100
  slots: 4
  template: '{0} {1} {2} {3} → %'
  formula: a*b*c*d
  correct:
  - 0
  - 1
  - 2
  - 3
  target: 48
  correctResult: 48
  tolerance: 0.05
answerText: The reference expectation is 2pq = 2 × 0.6 × 0.4 = 0.48, or 48 percent heterozygotes. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Multiply the two allele frequencies and two; submit expected heterozygote percent.

**Correct result:** 48; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The reference expectation is 2pq = 2 × 0.6 × 0.4 = 0.48, or 48 percent heterozygotes. This result is now recorded for the next comparison.

**Why/mechanism:** The reference expectation is 2pq = 2 × 0.6 × 0.4 = 0.48, or 48 percent heterozygotes. The observed family has 8/20 = 40 percent, but a small difference in one sample does not by itself establish selection or another particular cause. The model rests on explicit assumptions and sampling variation still matters. The geneticist uses the comparison to frame further tests, while the director bases the shipment decision on preserving tested family diversity rather than forcing the collection to match a formula exactly.

**Mechanism links:** Population change, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** 24 omits the two possible parental allele orders.

**Wrong-path feedback:**

- 24 omits the two possible parental allele orders.
- 40 is the observed percentage rather than the model expectation.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Check the reference model is recorded with its evidence on the Genetics Trailer log; the next comparison becomes available.

**Unlock:** Stop 44.

**Retrieval:** M7 Stop 28 (Choose the informative cross); M8 Stop 31 (Compare sequence and function); M8 Stop 32 (Keep the causal claim narrow)

**Later payoff:** Mission 13 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 43 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 44 — Keep several families

**Format/placement:** CHOICE, Ada Penn at Field Planning Room — Release Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 23 — Drift and gene flow; Keystone: Population change, Inheritance and variation, Experimental evidence; Area: PLAN; Prerequisites: Mission primer and Stop 43: Check the reference model; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the largest seed family is enough for the pilot.

**Actual mission answer:** Take several tested families and keep a reserve.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 48 |
| player_sees | "Three screened families carry different rare alleles; all pass the same health and habitat checks; the single largest family lacks two of those alleles; shipping space permits all three plus retained island reserve." |
| player_must_determine | "Select the founding-stock plan supported by the genetic and health evidence." |
| correct_result | "Take several families and keep reserve" |
| most_tempting_wrong_result | "The largest family lacks two alleles retained by the screened alternatives." |
| why_wrong_occurs | "The largest family lacks two alleles retained by the screened alternatives." |
| story_consequence | "Keep several families is recorded with its evidence on the Field Planning Room log; Several screened families replace the single-family shipment." |


**Call — exact player copy:** Go to Field Planning Room and meet Ada Penn, preserve director, at Release Board.

**Stop reason — exact player copy:** The manifest must preserve screened variation beyond one family.

**Question card story setup — exact player copy:** The reference calculation cannot identify a cause by itself, but the screened-family records show that the largest family omits alleles retained elsewhere in the collection. Choose a shipment plan that preserves tested variation and a recoverable island reserve.

**Question card story-science connection — exact player copy:** Take several tested families and keep a reserve.

**Data/readings/options:** Three screened families carry different rare alleles; all pass the same health and habitat checks; the single largest family lacks two of those alleles; shipping space permits all three plus retained island reserve.

**Format-specific interaction block:**
```yaml
question: Select the founding-stock plan supported by the genetic and health evidence.
choices:
- Take several families and keep reserve
- Take only the largest family
- Mix all untested island organisms
- Choose only one visible leaf type
answer: Take several families and keep reserve
rebuttals:
  Take only the largest family: The largest family lacks two alleles retained by the screened alternatives.
  Mix all untested island organisms: Untested organisms have not passed the required health and habitat checks.
  Choose only one visible leaf type: Leaf form changes with environment and does not preserve the family record.
answerText: Several screened families preserve variation that the largest family lacks, while the retained island reserve protects against a failed first establishment. Take several tested families and keep a reserve.
why: Several screened families preserve variation that the largest family lacks, while the retained island reserve protects against a failed first establishment. The health and habitat checks remain necessary; genetic diversity alone does not justify moving untested organisms. A visible leaf type is also an unreliable substitute for ancestry, as the common-environment work showed. This founding decision combines inheritance and population sampling rather than treating a Hardy-Weinberg calculation as a complete release criterion or assuming that the most numerous family is the most suitable one.
```

**Question card prompt — exact player copy:** Select the founding-stock plan supported by the genetic and health evidence.

**Correct result:** "Take several families and keep reserve"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Several screened families preserve variation that the largest family lacks, while the retained island reserve protects against a failed first establishment. Take several tested families and keep a reserve.

**Why/mechanism:** Several screened families preserve variation that the largest family lacks, while the retained island reserve protects against a failed first establishment. The health and habitat checks remain necessary; genetic diversity alone does not justify moving untested organisms. A visible leaf type is also an unreliable substitute for ancestry, as the common-environment work showed. This founding decision combines inheritance and population sampling rather than treating a Hardy-Weinberg calculation as a complete release criterion or assuming that the most numerous family is the most suitable one.

**Mechanism links:** Population change, Inheritance and variation, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The largest family lacks two alleles retained by the screened alternatives.

**Wrong-path feedback:**

- The largest family lacks two alleles retained by the screened alternatives.
- Untested organisms have not passed the required health and habitat checks.
- Leaf form changes with environment and does not preserve the family record.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Keep several families is recorded with its evidence on the Field Planning Room log; Several screened families replace the single-family shipment.

**Unlock:** M11-B4 and mission outcome.

**Retrieval:** M9 Stop 34 (Check the family marker distance); M9 Stop 35 (Keep the lineage traceable); M9 Stop 36 (Retire the appearance label)

**Later payoff:** Mission 13 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 44 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Take several tested families and keep a reserve. The largest family lacks two rare alleles. The crew uses the plan just chosen. The chosen plants still depend on partners missing from the manifest.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Several screened families replace the single-family shipment. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +5 | Receiving Habitat +4 | Care Supplies -1 | Island Health +2

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 4, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [95, 93, 89, 88]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Hardy-Weinberg needs large population, random mating, no selection, mutation or gene flow.
- A model deviation does not name its cause alone.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Take several tested families and keep a reserve.

---


# Mission 12 — THE SMALL THINGS ON THE LIST

## A. Mission briefing card — exact player copy

**Header:** DAY 12 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE SMALL THINGS ON THE LIST

**Go now:** Go to Marsh Research Bay and meet Tess Rowan, field ecologist, at the Water Rack.

**Card body:** The seed families are chosen, but their list omits the organisms that support them. Living things can supply one another with food, nutrients and protection. Trace field links, examine partner tests, then revise the pilot at the Release Board. By the end of the mission, decide whether the pilot can use plants alone.

**Objective:** Resolve whether the pilot can use plants alone; a healthy shipment could fail after planting.

### Worth knowing first — exact player copy

#### Glossary terms

- Keystone species: A species with a disproportionately large community effect relative to its abundance.
- Decomposer: An organism that breaks down dead organic material and recycles nutrients.
- Trophic level: A position in a food chain based on feeding.
- Nutrient: A material an organism needs for growth or function.
- Isolate: A particular organismal strain separated for testing.
- Phage: A virus that infects bacteria.
- Lytic infection: An infection in which new virus particles are produced and the host cell is lysed.
- Lysogenic state: A phage state in which viral genetic material persists with the host genome.
- Reverse transcription: Making DNA from an RNA template.
- Lysis: Rupture of a cell.

#### Primer concepts

- Energy is transferred and dissipated; matter can be reused.
- Positive and negative interaction signs describe measured effects.
- A beneficial island partner still needs compatibility and health checks before movement.

#### Equations first needed today

**Equation:** next-level energy = producer biomass energy × transfer fraction

**What it is for:** Estimate food-web transfer under a stated model.

**Symbols:** Energy is kJ; transfer fraction is dimensionless.

**Why this campaign needs it:** Check the pilot food-web demand.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. Producers capture 8,000 energy units and transfer 10% in a simplified model; primary consumers receive 800.

2. With another 10% transfer, secondary consumers receive 80 units from those 800.

3. A fungus increases plant phosphorus uptake while receiving plant sugar; both benefit in that test, supporting mutualism.

4. A predator removal increases herbivores and reduces plants; the indirect plant effect follows the food web.

5. Dead leaves contain nitrogen; decomposers transform organic nitrogen into forms that can re-enter uptake, while energy is dissipated as heat.

**Authoring-only failure consequence:** A healthy shipment could fail after planting.

**Authoring-only later travel:** After Stop 46, carry its evidence to Field Clinic. After Stop 47, carry the tested constraints to Field Planning Room.

## B. Main story happening — designer summary

The seed families are chosen, but their list omits the organisms that support them. The four-stop chain establishes name the observed links, uses it to budget the food web, then interpret the partner screens supplies the discriminating evidence for add the tested partners. The contained pilot gains tested partners while untested field soil stays on the island. The receiving soil may not cycle nutrients like island soil. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the pilot can use plants alone. Actual final answer: Prepare the tested plant-partner combination in containment. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M12-B1 — On arrival at Marsh Research Bay

**Location:** Marsh Research Bay.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The seed families are chosen, but their list omits the organisms that support them.

**Dialogue bubble — Tess Rowan, field ecologist:** “The manifest must account for the measured living relationships.”

**Unlocks:** Stop 45.

### Beat M12-B2 — After Stops 45 and 46

**Location:** Marsh Research Bay.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Name the observed links and Budget the food web with their accepted results.

**Panel/HUD text:** “The partner list needs specific biological evidence and screening. Go to Field Clinic; its Sample Bench holds the next comparison.”

**Unlocks:** Stop 47 at Field Clinic.

### Beat M12-B3 — After Stop 47

**Location:** Field Clinic.

**Presentation:** waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The tested constraint is pinned to the sample cart.

**Panel/HUD text:** “Go to Field Planning Room and meet Ada Penn, preserve director, at the Release Board; only the director can authorize the combined plan.”

**Unlocks:** Stop 48.

### Beat M12-B4 — After Stop 48

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The contained pilot gains tested partners while untested field soil stays on the island.

**Panel/HUD text:** “Prepare the tested plant-partner combination in containment.”

**Unlocks:** The ungraded aftermath.

### Beat M12-BE — At mission end

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The contained pilot gains tested partners while untested field soil stays on the island. The receiving soil may not cycle nutrients like island soil.

**Dialogue bubble — Ada Penn, preserve director:** “The receiving soil may not cycle nutrients like island soil.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**3 locations:** Marsh Research Bay → Field Clinic → Field Planning Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 45 | Marsh Research Bay | water-rack | The manifest must account for the measured living relationships. |
| 46 | Marsh Research Bay | water-rack | The pilot food web needs an energy budget. |
| 47 | Field Clinic | sample-bench | The partner list needs specific biological evidence and screening. |
| 48 | Field Planning Room | release-board | The director must approve the tested pair within the permit. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Tess Rowan, field ecologist, begins by owning the local evidence. Ada Penn, preserve director, owns the final decision. The conflict is between a healthy shipment could fail after planting. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **27 — Species interactions and niches:** The interaction signs describe effects on the organisms in the supplied observations.

- **28 — Energy flow and trophic levels:** Under the explicitly simplified ten-percent model, primary consumers receive 5,000 × 0.1 = 500 kJ.

- **21 — Viruses and host cells:** The clinic separates viral life-cycle evidence from a measured beneficial partnership.

- **27 — Species interactions and niches:** The contained comparison supports a useful relationship between the tested plant stock and the screened fungal isolate in the receiving-site soil.

A species can have a disproportionately large effect without being abundant. Competitive exclusion concerns identical limiting-resource niches under the model, not a rule that two species can never coexist. Introduced species can cause harm, but being nonnative alone does not prove a particular measured effect. Energy dissipates across trophic transfers while decomposers return matter to reusable forms.

## H1. Stop 45 — Name the observed links

**Format/placement:** PROTOCOL, Marsh Research Bay — Water Rack.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 27 — Species interactions and niches; Keystone: Species interactions, Matter conservation; Area: MARSH; Prerequisites: Mission primer and Stop 44: Keep several families; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the pilot can use plants alone.

**Actual mission answer:** Prepare the tested plant-partner combination in containment.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The seed families are chosen, but their list omits the organisms that support them." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Plant gains phosphorus while fungus gains carbon"}, {"id": "e2", "label": "Two grazers reduce each other’s food supply"}, {"id": "e3", "label": "Insect feeds on a leaf and reduces plant growth"}, {"id": "e4", "label": "Bird uses a branch with no detected tree effect"}], "choices": [{"id": "r4", "label": "Commensalism under the measured conditions"}, {"id": "r3", "label": "Herbivory"}, {"id": "r2", "label": "Competition"}, {"id": "r1", "label": "Mutualism in the measured pair"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Plant gains phosphorus while fungus gains carbon supports Mutualism in the measured pair; Commensalism under the measured conditions describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Plant gains phosphorus while fungus gains carbon supports Mutualism in the measured pair; Herbivory describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Plant gains phosphorus while fungus gains carbon supports Mutualism in the measured pair; Competition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Two grazers reduce each other’s food supply supports Competition; Commensalism under the measured conditions describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Two grazers reduce each other’s food supply supports Competition; Herbivory describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Two grazers reduce each other’s food supply supports Competition; Mutualism in the measured pair describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Insect feeds on a leaf and reduces plant growth supports Herbivory; Commensalism under the measured conditions describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Insect feeds on a leaf and reduces plant growth supports Herbivory; Competition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Insect feeds on a leaf and reduces plant growth supports Herbivory; Mutualism in the measured pair describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Bird uses a branch with no detected tree effect supports Commensalism under the measured conditions; Herbivory describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Bird uses a branch with no detected tree effect supports Commensalism under the measured conditions; Competition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Bird uses a branch with no detected tree effect supports Commensalism under the measured conditions; Mutualism in the measured pair describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The interaction signs describe effects on the organisms in the supplied observations. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "A measured benefit to both partners supports mutualism rather than parasitism." |
| why_wrong_occurs | "A measured benefit to both partners supports mutualism rather than parasitism." |
| story_consequence | "Name the observed links is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The manifest must account for the measured living relationships.

**Question card story setup — exact player copy:** The selected families preserve more variation, but their shipment list still leaves out organisms that share nutrients and food with them on the island. Match the observed field relationships before the team decides which partners need specific testing.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Plant gains phosphorus while fungus gains carbon
- id: e2
  label: Two grazers reduce each other’s food supply
- id: e3
  label: Insect feeds on a leaf and reduces plant growth
- id: e4
  label: Bird uses a branch with no detected tree effect
choices:
- id: r4
  label: Commensalism under the measured conditions
- id: r3
  label: Herbivory
- id: r2
  label: Competition
- id: r1
  label: Mutualism in the measured pair
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Plant gains phosphorus while fungus gains carbon supports Mutualism in the measured pair; Commensalism under the measured conditions describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Plant gains phosphorus while fungus gains carbon supports Mutualism in the measured pair; Herbivory describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Plant gains phosphorus while fungus gains carbon supports Mutualism in the measured pair; Competition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Two grazers reduce each other’s food supply supports Competition; Commensalism under the measured conditions describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Two grazers reduce each other’s food supply supports Competition; Herbivory describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Two grazers reduce each other’s food supply supports Competition; Mutualism in the measured pair describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Insect feeds on a leaf and reduces plant growth supports Herbivory; Commensalism under the measured conditions describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Insect feeds on a leaf and reduces plant growth supports Herbivory; Competition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Insect feeds on a leaf and reduces plant growth supports Herbivory; Mutualism in the measured pair describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Bird uses a branch with no detected tree effect supports Commensalism under the measured conditions; Herbivory describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Bird uses a branch with no detected tree effect supports Commensalism under the measured conditions; Competition describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Bird uses a branch with no detected tree effect supports Commensalism under the measured conditions; Mutualism in the measured pair describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The interaction signs describe effects on the organisms in the supplied observations. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The interaction signs describe effects on the organisms in the supplied observations. This result is now recorded for the next comparison.

**Why/mechanism:** The interaction signs describe effects on the organisms in the supplied observations. A phosphorus-for-carbon exchange benefits both measured partners; competition reduces access to a shared resource; herbivory benefits the feeder while harming the plant; and the branch example has no detected tree effect. These labels do not guarantee that a relationship has the same outcome in every environment. The field team needs the actual link because the proposed shipment includes plants but omits organisms that may contribute to their nutrient supply.

**Mechanism links:** Species interactions, Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** A measured benefit to both partners supports mutualism rather than parasitism.

**Wrong-path feedback:**

- A measured benefit to both partners supports mutualism rather than parasitism.
- Competition harms both through a shared limiting resource.
- No detected effect in one test is narrower than proof of no effect anywhere.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Name the observed links is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 46.

**Retrieval:** M5 Stop 18 (Find the shared flowering days); M5 Stop 19 (Compare field trays); M5 Stop 20 (Keep flowers available)

**Later payoff:** Mission 14 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 45 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 46 — Budget the food web

**Format/placement:** BALLPARK, Marsh Research Bay — Water Rack.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 28 — Energy flow and trophic levels; Keystone: Energy coupling, Species interactions; Area: MARSH; Prerequisites: Mission primer and Stop 45: Name the observed links; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the pilot can use plants alone.

**Actual mission answer:** Prepare the tested plant-partner combination in containment.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "The pilot plants store 5,000 kJ of new biomass; use a stated simplified 10% transfer to primary consumers." |
| player_must_determine | "Use stored biomass energy times transfer fraction; submit primary-consumer energy in kJ." |
| correct_result | 500 |
| most_tempting_wrong_result | "50 applies the transfer twice and estimates the next level." |
| why_wrong_occurs | "50 applies the transfer twice and estimates the next level." |
| story_consequence | "Budget the food web is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The pilot food web needs an energy budget.

**Question card story setup — exact player copy:** The field matches identify useful and harmful interactions, yet adding organisms to a pilot also adds demands on its limited food supply. Calculate the next feeding level before the clinic evaluates which partner combination the plants can support.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** The pilot plants store 5,000 kJ of new biomass; use a stated simplified 10% transfer to primary consumers.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Budget the food web
  units: kJ
  labels:
  - producer energy
  - transfer fraction
  - consumer levels
  - days
  values:
  - 5000
  - 0.1
  - 2
  - 7
  slots: 2
  template: '{0} {1} → kJ'
  formula: a*b
  correct:
  - 0
  - 1
  target: 500
  correctResult: 500
  tolerance: 0.05
answerText: Under the explicitly simplified ten-percent model, primary consumers receive 5,000 × 0.1 = 500 kJ. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Use stored biomass energy times transfer fraction; submit primary-consumer energy in kJ.

**Correct result:** 500; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** Under the explicitly simplified ten-percent model, primary consumers receive 5,000 × 0.1 = 500 kJ. This result is now recorded for the next comparison.

**Why/mechanism:** Under the explicitly simplified ten-percent model, primary consumers receive 5,000 × 0.1 = 500 kJ. The remainder is not transferred to that next trophic level as new biomass; energy supports metabolism, is dissipated as heat, or remains in material not eaten or assimilated. Actual efficiencies vary, so the result is a campaign estimate rather than a universal constant. It shows why adding consumers without supporting production cannot create a self-sustaining pilot from an energy shortage.

**Mechanism links:** Energy coupling, Species interactions are the specific broader principles used in the explanation above.

**Misconception:** 50 applies the transfer twice and estimates the next level.

**Wrong-path feedback:**

- 50 applies the transfer twice and estimates the next level.
- 5,000 assumes all producer biomass energy becomes consumer biomass.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Budget the food web is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 47.

**Retrieval:** M5 Stop 18 (Find the shared flowering days); M5 Stop 19 (Compare field trays); M5 Stop 20 (Keep flowers available)

**Later payoff:** Mission 14 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 46 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 47 — Interpret the partner screens

**Format/placement:** PROTOCOL, Field Clinic — Sample Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 21 — Viruses and host cells; Keystone: Information flow, Species interactions, Experimental evidence; Area: CLINIC; Prerequisites: Mission primer and Stop 46: Budget the food web; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the pilot can use plants alone.

**Actual mission answer:** Prepare the tested plant-partner combination in containment.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 500 |
| player_sees | {"scenarios": [{"id": "e1", "label": "Virus rapidly produces particles and lyses host cells"}, {"id": "e2", "label": "Viral DNA persists integrated in bacterial DNA"}, {"id": "e3", "label": "RNA virus makes a DNA intermediate"}, {"id": "e4", "label": "Screened fungal isolate improves plant uptake in containment"}], "choices": [{"id": "r4", "label": "Beneficial partner evidence, not blanket release clearance"}, {"id": "r3", "label": "Reverse transcription"}, {"id": "r2", "label": "Lysogenic state in this phage model"}, {"id": "r1", "label": "Lytic infection"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Virus rapidly produces particles and lyses host cells supports Lytic infection; Beneficial partner evidence, not blanket release clearance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Virus rapidly produces particles and lyses host cells supports Lytic infection; Reverse transcription describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Virus rapidly produces particles and lyses host cells supports Lytic infection; Lysogenic state in this phage model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Viral DNA persists integrated in bacterial DNA supports Lysogenic state in this phage model; Beneficial partner evidence, not blanket release clearance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Viral DNA persists integrated in bacterial DNA supports Lysogenic state in this phage model; Reverse transcription describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Viral DNA persists integrated in bacterial DNA supports Lysogenic state in this phage model; Lytic infection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "RNA virus makes a DNA intermediate supports Reverse transcription; Beneficial partner evidence, not blanket release clearance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "RNA virus makes a DNA intermediate supports Reverse transcription; Lysogenic state in this phage model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "RNA virus makes a DNA intermediate supports Reverse transcription; Lytic infection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Screened fungal isolate improves plant uptake in containment supports Beneficial partner evidence, not blanket release clearance; Reverse transcription describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Screened fungal isolate improves plant uptake in containment supports Beneficial partner evidence, not blanket release clearance; Lysogenic state in this phage model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Screened fungal isolate improves plant uptake in containment supports Beneficial partner evidence, not blanket release clearance; Lytic infection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The clinic separates viral life-cycle evidence from a measured beneficial partnership. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Integrated phage DNA is not the same observation as immediate lysis." |
| why_wrong_occurs | "Integrated phage DNA is not the same observation as immediate lysis." |
| story_consequence | "Interpret the partner screens is recorded with its evidence on the Field Clinic log; the next comparison becomes available." |


**Call — exact player copy:** Go to Field Clinic and use Sample Bench.

**Stop reason — exact player copy:** The partner list needs specific biological evidence and screening.

**Question card story setup — exact player copy:** The energy budget limits the proposed community, while the partner samples include both useful nutrient effects and viral records that require careful interpretation. Separate those observations before the director chooses which tested organisms can enter a contained pilot.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Virus rapidly produces particles and lyses host cells
- id: e2
  label: Viral DNA persists integrated in bacterial DNA
- id: e3
  label: RNA virus makes a DNA intermediate
- id: e4
  label: Screened fungal isolate improves plant uptake in containment
choices:
- id: r4
  label: Beneficial partner evidence, not blanket release clearance
- id: r3
  label: Reverse transcription
- id: r2
  label: Lysogenic state in this phage model
- id: r1
  label: Lytic infection
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Virus rapidly produces particles and lyses host cells supports Lytic infection; Beneficial partner evidence, not blanket release clearance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Virus rapidly produces particles and lyses host cells supports Lytic infection; Reverse transcription describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Virus rapidly produces particles and lyses host cells supports Lytic infection; Lysogenic state in this phage model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Viral DNA persists integrated in bacterial DNA supports Lysogenic state in this phage model; Beneficial partner evidence, not blanket release clearance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Viral DNA persists integrated in bacterial DNA supports Lysogenic state in this phage model; Reverse transcription describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Viral DNA persists integrated in bacterial DNA supports Lysogenic state in this phage model; Lytic infection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: RNA virus makes a DNA intermediate supports Reverse transcription; Beneficial partner evidence, not blanket release clearance describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: RNA virus makes a DNA intermediate supports Reverse transcription; Lysogenic state in this phage model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: RNA virus makes a DNA intermediate supports Reverse transcription; Lytic infection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Screened fungal isolate improves plant uptake in containment supports Beneficial partner evidence, not blanket release clearance; Reverse transcription describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Screened fungal isolate improves plant uptake in containment supports Beneficial partner evidence, not blanket release clearance; Lysogenic state in this phage model describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Screened fungal isolate improves plant uptake in containment supports Beneficial partner evidence, not blanket release clearance; Lytic infection describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The clinic separates viral life-cycle evidence from a measured beneficial partnership. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The clinic separates viral life-cycle evidence from a measured beneficial partnership. This result is now recorded for the next comparison.

**Why/mechanism:** The clinic separates viral life-cycle evidence from a measured beneficial partnership. A lytic infection produces particles and destroys the host; an integrated phage genome can persist in a lysogenic state; a reverse-transcribing virus uses an RNA-to-DNA intermediate. None of those facts makes every microorganism dangerous or every apparently helpful isolate safe to move. The contained plant-fungus comparison supports a specific nutrient link. Screening and receiving-site compatibility remain separate evidence requirements before that relationship can become part of the release plan.

**Mechanism links:** Information flow, Species interactions, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Integrated phage DNA is not the same observation as immediate lysis.

**Wrong-path feedback:**

- Integrated phage DNA is not the same observation as immediate lysis.
- Reverse transcription makes DNA from RNA, not RNA from DNA.
- A beneficial uptake result alone does not test all movement risks.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Interpret the partner screens is recorded with its evidence on the Field Clinic log; the next comparison becomes available.

**Unlock:** Stop 48.

**Retrieval:** M9 Stop 36 (Retire the appearance label); M10 Stop 39 (Choose the selection pattern); M10 Stop 40 (State what changed)

**Later payoff:** Mission 14 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 47 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 48 — Add the tested partners

**Format/placement:** CHOICE, Ada Penn at Field Planning Room — Release Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 27 — Species interactions and niches; Keystone: Species interactions, Experimental evidence, Matter conservation; Area: PLAN; Prerequisites: Mission primer and Stop 47: Interpret the partner screens; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the pilot can use plants alone.

**Actual mission answer:** Prepare the tested plant-partner combination in containment.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Plants alone grow poorly in receiving-site soil; plants plus a screened compatible fungal isolate grow normally in contained tests; bulk island soil has not been screened; the permit covers contained pilot tests only." |
| player_must_determine | "Choose the next pilot action within the evidence and permit." |
| correct_result | "Test the screened plant-partner pair" |
| most_tempting_wrong_result | "Bulk soil contains untested organisms outside the specific comparison." |
| why_wrong_occurs | "Bulk soil contains untested organisms outside the specific comparison." |
| story_consequence | "Add the tested partners is recorded with its evidence on the Field Planning Room log; The contained pilot gains tested partners while untested field soil stays on the island." |


**Call — exact player copy:** Go to Field Planning Room and meet Ada Penn, preserve director, at Release Board.

**Stop reason — exact player copy:** The director must approve the tested pair within the permit.

**Question card story setup — exact player copy:** The clinic separates the screened useful isolate from unscreened material, and the contained plant comparison now supports one particular nutrient partnership in receiving-site soil. Choose the next pilot action without extending that result to every organism or an open release.

**Question card story-science connection — exact player copy:** Prepare the tested plant-partner combination in containment.

**Data/readings/options:** Plants alone grow poorly in receiving-site soil; plants plus a screened compatible fungal isolate grow normally in contained tests; bulk island soil has not been screened; the permit covers contained pilot tests only.

**Format-specific interaction block:**
```yaml
question: Choose the next pilot action within the evidence and permit.
choices:
- Test the screened plant-partner pair
- Ship bulk island soil immediately
- Remove every microorganism
- Release the pair across the mainland
answer: Test the screened plant-partner pair
rebuttals:
  Ship bulk island soil immediately: Bulk soil contains untested organisms outside the specific comparison.
  Remove every microorganism: The screened isolate provides a measured nutrient benefit.
  Release the pair across the mainland: The current permit covers containment, not broad release.
answerText: The contained comparison supports a useful relationship between the tested plant stock and the screened fungal isolate in the receiving-site soil. Prepare the tested plant-partner combination in containment.
why: The contained comparison supports a useful relationship between the tested plant stock and the screened fungal isolate in the receiving-site soil. It does not establish that unscreened bulk soil is suitable for movement or that a contained result authorizes open release. Removing every microorganism would discard the measured benefit without evidence that such removal helps. The director therefore prepares the specific tested combination inside the permitted pilot, preserving both biological dependencies and the limits of the available health and compatibility evidence.
```

**Question card prompt — exact player copy:** Choose the next pilot action within the evidence and permit.

**Correct result:** "Test the screened plant-partner pair"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The contained comparison supports a useful relationship between the tested plant stock and the screened fungal isolate in the receiving-site soil. Prepare the tested plant-partner combination in containment.

**Why/mechanism:** The contained comparison supports a useful relationship between the tested plant stock and the screened fungal isolate in the receiving-site soil. It does not establish that unscreened bulk soil is suitable for movement or that a contained result authorizes open release. Removing every microorganism would discard the measured benefit without evidence that such removal helps. The director therefore prepares the specific tested combination inside the permitted pilot, preserving both biological dependencies and the limits of the available health and compatibility evidence.

**Mechanism links:** Species interactions, Experimental evidence, Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** Bulk soil contains untested organisms outside the specific comparison.

**Wrong-path feedback:**

- Bulk soil contains untested organisms outside the specific comparison.
- The screened isolate provides a measured nutrient benefit.
- The current permit covers containment, not broad release.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Add the tested partners is recorded with its evidence on the Field Planning Room log; The contained pilot gains tested partners while untested field soil stays on the island.

**Unlock:** M12-B4 and mission outcome.

**Retrieval:** M8 Stop 32 (Keep the causal claim narrow); M10 Stop 39 (Choose the selection pattern); M10 Stop 40 (State what changed)

**Later payoff:** Mission 14 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 48 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Prepare the tested plant-partner combination in containment. The screened pair grows better in the contained test. The crew uses the plan just chosen. The receiving soil may not cycle nutrients like island soil.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The contained pilot gains tested partners while untested field soil stays on the island. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +4 | Receiving Habitat +5 | Care Supplies -2 | Island Health +3

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 4, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [99, 98, 91, 91]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Energy is transferred and dissipated; matter can be reused.
- Positive and negative interaction signs describe measured effects.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Prepare the tested plant-partner combination in containment.

---


# Mission 13 — THE SOIL ON THE OTHER SHORE

## A. Mission briefing card — exact player copy

**Header:** DAY 13 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** THE SOIL ON THE OTHER SHORE

**Go now:** Go to Marsh Research Bay and meet Tess Rowan, field ecologist, at the Water Rack.

**Card body:** The pilot includes tested partners, but receiving-site soil holds less usable nitrogen. Nutrients must move through soil and organisms before roots can use them. Compare site samples, test plant uptake, then set the preparation order at the Release Board. By the end of the mission, decide whether the receiving plot is ready for the pilot.

**Objective:** Resolve whether the receiving plot is ready for the pilot; the new plants could starve in suitable-looking ground.

### Worth knowing first — exact player copy

#### Glossary terms

- Nitrogen fixation: Conversion of nitrogen gas into biologically usable reduced nitrogen.
- Nitrification: Microbial conversion of ammonium to nitrite and then nitrate.
- Denitrification: Microbial conversion of nitrate into gaseous nitrogen forms.
- Carrying capacity: The population size an environment can support under specified conditions.
- Ammonium: A reduced nitrogen-containing ion used by microbes and plants.
- Ammonification: Conversion of organic nitrogen to ammonium.
- Assimilation: Incorporation of an acquired substance into an organism’s molecules.

#### Primer concepts

- Carbon fixation and respiration move carbon in opposite directions through different pathways.
- Water, nutrient availability and organismal activity can constrain establishment together.
- A population model needs assumptions about resources and time.

#### Equations first needed today

**Equation:** dN/dt = rN(K−N)/K

**What it is for:** Estimate logistic population growth.

**Symbols:** N is population; t is time; r is growth parameter per time; K is carrying capacity.

**Why this campaign needs it:** Make stocking assumptions explicit.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. A population has N = 50, r = 0.2 per day and K = 100; logistic growth is 0.2 × 50 × 0.5 = 5 individuals/day.

2. With the same r and N under an exponential model, growth is 0.2 × 50 = 10 individuals/day.

3. If N = K, the logistic factor (K−N)/K is zero, so net modeled growth is zero.

4. Nitrate becomes nitrogen gas under a denitrification pathway; usable soil nitrogen can decline even though nitrogen atoms are conserved.

5. A site receives 40 mm rain, loses 25 mm to evaporation and exports 10 mm runoff; water retained is 5 mm for that interval.

**Authoring-only failure consequence:** The new plants could starve in suitable-looking ground.

**Authoring-only later travel:** After Stop 50, carry its evidence to Growth Hall. After Stop 51, carry the tested constraints to Field Planning Room.

## B. Main story happening — designer summary

The pilot includes tested partners, but receiving-site soil holds less usable nitrogen. The four-stop chain establishes follow nitrogen to a leaf, uses it to check room for growth, then separate site constraints supplies the discriminating evidence for prepare before planting. Receiving plots are prepared and only the instrumented contained pilot proceeds. A daytime pilot succeeds while its night record is still missing. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the receiving plot is ready for the pilot. Actual final answer: Prepare the receiving soil and water before planting. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M13-B1 — On arrival at Marsh Research Bay

**Location:** Marsh Research Bay.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The pilot includes tested partners, but receiving-site soil holds less usable nitrogen.

**Dialogue bubble — Tess Rowan, field ecologist:** “The receiving soil needs a route from stored nitrogen to root uptake.”

**Unlocks:** Stop 49.

### Beat M13-B2 — After Stops 49 and 50

**Location:** Marsh Research Bay.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Follow nitrogen to a leaf and Check room for growth with their accepted results.

**Panel/HUD text:** “The plot needs both water and nutrient constraints resolved. Go to Growth Hall; its Growth Bench holds the next comparison.”

**Unlocks:** Stop 51 at Growth Hall.

### Beat M13-B3 — After Stop 51

**Location:** Growth Hall.

**Presentation:** waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The tested constraint is pinned to the sample cart.

**Panel/HUD text:** “Go to Field Planning Room and meet Ada Penn, preserve director, at the Release Board; only the director can authorize the combined plan.”

**Unlocks:** Stop 52.

### Beat M13-B4 — After Stop 52

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** Receiving plots are prepared and only the instrumented contained pilot proceeds.

**Panel/HUD text:** “Prepare the receiving soil and water before planting.”

**Unlocks:** The ungraded aftermath.

### Beat M13-BE — At mission end

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** Receiving plots are prepared and only the instrumented contained pilot proceeds. A daytime pilot succeeds while its night record is still missing.

**Dialogue bubble — Ada Penn, preserve director:** “A daytime pilot succeeds while its night record is still missing.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**3 locations:** Marsh Research Bay → Growth Hall → Field Planning Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 49 | Marsh Research Bay | water-rack | The receiving soil needs a route from stored nitrogen to root uptake. |
| 50 | Marsh Research Bay | water-rack | The planting plan needs growth under its stated resource limit. |
| 51 | Growth Hall | growth-bench | The plot needs both water and nutrient constraints resolved. |
| 52 | Field Planning Room | release-board | The planting order must satisfy the model assumptions first. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Tess Rowan, field ecologist, begins by owning the local evidence. Ada Penn, preserve director, owns the final decision. The conflict is between the new plants could starve in suitable-looking ground. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **29 — Matter cycles and disturbance:** This sequence is a simplified selected route through the nitrogen cycle, not the only path nitrogen can take.

- **26 — Population growth and carrying capacity:** The unused-capacity factor is (80 − 40)/80 = 0.5.

- **29 — Matter cycles and disturbance:** The site constraints operate through different mechanisms.

- **29 — Matter cycles and disturbance:** The growth model assumes a prepared environment, so its carrying-capacity estimate cannot justify planting into the measured dry, nutrient-poor soil.

Exponential growth uses rN under a simplified unlimited-resource model; logistic growth adds (K−N)/K under a stated capacity model. Many-small-offspring versus few-high-investment life histories are tendencies rather than rigid species bins. Photosynthesis fixes carbon; respiration and combustion return it to carbon dioxide. Water cycles through evaporation, condensation, precipitation and runoff or infiltration. Climate change, habitat loss and invasive impacts can alter resources and interactions together.

## H1. Stop 49 — Follow nitrogen to a leaf

**Format/placement:** SEQUENCE, Marsh Research Bay — Water Rack.

**Required stop kind:** calculation/room. **Player verb:** order causal dependencies.

**Metadata:** Concept: 29 — Matter cycles and disturbance; Keystone: Matter conservation, Species interactions; Area: MARSH; Prerequisites: Mission primer and Stop 48: Add the tested partners; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the receiving plot is ready for the pilot.

**Actual mission answer:** Prepare the receiving soil and water before planting.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The pilot includes tested partners, but receiving-site soil holds less usable nitrogen." |
| player_sees | {"cards": [{"id": "p4", "label": "Roots take up nitrate and assimilate its nitrogen into organic molecules"}, {"id": "p3", "label": "Nitrifying microbes form nitrate from ammonium"}, {"id": "p2", "label": "Organic nitrogen from the fixed nitrogen enters dead material and is ammonified to ammonium"}, {"id": "p1", "label": "Microbes fix nitrogen gas into reduced nitrogen"}], "order": ["p1", "p2", "p3", "p4"], "axis": "causal order", "ends": ["initiating event", "result"], "constraints": "Each upstream event supplies the condition required by the next.", "prerequisite_feedback": {"p2": "Organic nitrogen from the fixed nitrogen enters dead material and is ammonified to ammonium requires the prior stated condition: Microbes fix nitrogen gas into reduced nitrogen. Restore this dependency and retry the full causal order.", "p3": "Nitrifying microbes form nitrate from ammonium requires the prior stated condition: Organic nitrogen from the fixed nitrogen enters dead material and is ammonified to ammonium. Restore this dependency and retry the full causal order.", "p4": "Roots take up nitrate and assimilate its nitrogen into organic molecules requires the prior stated condition: Nitrifying microbes form nitrate from ammonium. Restore this dependency and retry the full causal order."}, "answerText": "This sequence is a simplified selected route through the nitrogen cycle, not the only path nitrogen can take. This result is now recorded for the next comparison."} |
| player_must_determine | "Order the selected route from nitrogen gas through organic litter to nitrate uptake; other valid nitrogen-cycle routes are outside these cards. Submit all four cards." |
| correct_result | ["p1", "p2", "p3", "p4"] |
| most_tempting_wrong_result | "Roots do not generally replace microbial nitrogen fixation by directly using atmospheric nitrogen gas." |
| why_wrong_occurs | "Roots do not generally replace microbial nitrogen fixation by directly using atmospheric nitrogen gas." |
| story_consequence | "Follow nitrogen to a leaf is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The receiving soil needs a route from stored nitrogen to root uptake.

**Question card story setup — exact player copy:** The contained pilot includes a tested partner, but receiving-site soil still has little usable nitrogen despite holding plenty of dead plant material. Trace a selected nitrogen route before deciding which habitat condition must change ahead of planting.

**Question card story-science connection — exact player copy:** The causal order identifies what the next test must preserve or challenge.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
cards:
- id: p4
  label: Roots take up nitrate and assimilate its nitrogen into organic molecules
- id: p3
  label: Nitrifying microbes form nitrate from ammonium
- id: p2
  label: Organic nitrogen from the fixed nitrogen enters dead material and is ammonified to ammonium
- id: p1
  label: Microbes fix nitrogen gas into reduced nitrogen
order:
- p1
- p2
- p3
- p4
axis: causal order
ends:
- initiating event
- result
constraints: Each upstream event supplies the condition required by the next.
prerequisite_feedback:
  p2: 'Organic nitrogen from the fixed nitrogen enters dead material and is ammonified to ammonium requires the prior stated condition: Microbes fix nitrogen gas into reduced nitrogen. Restore this dependency and retry the full causal order.'
  p3: 'Nitrifying microbes form nitrate from ammonium requires the prior stated condition: Organic nitrogen from the fixed nitrogen enters dead material and is ammonified to ammonium. Restore this dependency and retry the full causal order.'
  p4: 'Roots take up nitrate and assimilate its nitrogen into organic molecules requires the prior stated condition: Nitrifying microbes form nitrate from ammonium. Restore this dependency and retry the full causal order.'
answerText: This sequence is a simplified selected route through the nitrogen cycle, not the only path nitrogen can take. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Order the selected route from nitrogen gas through organic litter to nitrate uptake; other valid nitrogen-cycle routes are outside these cards. Submit all four cards.

**Correct result:** ["p1", "p2", "p3", "p4"]; exact label, complete mapping or complete order; no partial completion.

**Answer text:** This sequence is a simplified selected route through the nitrogen cycle, not the only path nitrogen can take. This result is now recorded for the next comparison.

**Why/mechanism:** This sequence is a simplified selected route through the nitrogen cycle, not the only path nitrogen can take. Fixation introduces reduced nitrogen from gas, ammonification returns organic nitrogen to ammonium, nitrification forms nitrate, and roots can assimilate nitrogen into organic molecules. Plants can also use ammonium in appropriate conditions. The route explains why total nitrogen alone does not state what the receiving roots can access. Microbial transformations and soil conditions connect the partner evidence to the actual planting-site preparation.

**Mechanism links:** Matter conservation, Species interactions are the specific broader principles used in the explanation above.

**Misconception:** Roots do not generally replace microbial nitrogen fixation by directly using atmospheric nitrogen gas.

**Wrong-path feedback:**

- Roots do not generally replace microbial nitrogen fixation by directly using atmospheric nitrogen gas.
- Nitrification forms nitrate rather than nitrogen gas.
- Denitrification would return nitrogen toward gaseous forms instead of the selected uptake route.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Follow nitrogen to a leaf is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 50.

**Retrieval:** M5 Stop 18 (Find the shared flowering days); M5 Stop 19 (Compare field trays); M5 Stop 20 (Keep flowers available)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 49 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 50 — Check room for growth

**Format/placement:** BALLPARK, Marsh Research Bay — Water Rack.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 26 — Population growth and carrying capacity; Keystone: Population change, Matter conservation; Area: MARSH; Prerequisites: Mission primer and Stop 49: Follow nitrogen to a leaf; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the receiving plot is ready for the pilot.

**Actual mission answer:** Prepare the receiving soil and water before planting.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | ["p1", "p2", "p3", "p4"] |
| player_sees | "The contained plot has N = 40 plants; r = 0.5 per week; campaign model K = 80 plants. Use dN/dt = rN(K−N)/K." |
| player_must_determine | "Use the tiles to calculate modeled net growth in plants per week." |
| correct_result | 10 |
| most_tempting_wrong_result | "20 omits the resource-limitation factor." |
| why_wrong_occurs | "20 omits the resource-limitation factor." |
| story_consequence | "Check room for growth is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Water Rack.

**Stop reason — exact player copy:** The planting plan needs growth under its stated resource limit.

**Question card story setup — exact player copy:** The nitrogen route explains why total soil material does not guarantee usable nutrients, and the prepared plot now has a conditional population-capacity estimate. Calculate expected growth before the crew uses that estimate to choose how many plants to establish.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** The contained plot has N = 40 plants; r = 0.5 per week; campaign model K = 80 plants. Use dN/dt = rN(K−N)/K.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Check room for growth
  units: plants/week
  labels:
  - r
  - N
  - unused fraction
  - K
  values:
  - 0.5
  - 40
  - 0.5
  - 80
  slots: 3
  template: '{0} {1} {2} → plants/week'
  formula: a*b*c
  correct:
  - 0
  - 1
  - 2
  target: 10
  correctResult: 10
  tolerance: 0.05
answerText: The unused-capacity factor is (80 − 40)/80 = 0.5. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Use the tiles to calculate modeled net growth in plants per week.

**Correct result:** 10; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The unused-capacity factor is (80 − 40)/80 = 0.5. This result is now recorded for the next comparison.

**Why/mechanism:** The unused-capacity factor is (80 − 40)/80 = 0.5. Multiplying rN by that factor gives 0.5 × 40 × 0.5 = 10 plants per week. The exponential value would be twenty, but the stated logistic model reduces growth as the population approaches the assumed carrying capacity. That capacity is a campaign estimate under prepared-site conditions, not an immutable property of the land. Water and nutrients must actually support those conditions before the number can justify stocking the pilot.

**Mechanism links:** Population change, Matter conservation are the specific broader principles used in the explanation above.

**Misconception:** 20 omits the resource-limitation factor.

**Wrong-path feedback:**

- 20 omits the resource-limitation factor.
- 80 is the assumed capacity, not the rate of net growth.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Check room for growth is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 51.

**Retrieval:** M11 Stop 42 (Separate population explanations); M11 Stop 43 (Check the reference model); M11 Stop 44 (Keep several families)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 50 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 51 — Separate site constraints

**Format/placement:** PROTOCOL, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 29 — Matter cycles and disturbance; Keystone: Matter conservation, Selective exchange, Energy coupling; Area: GROW; Prerequisites: Mission primer and Stop 50: Check room for growth; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the receiving plot is ready for the pilot.

**Actual mission answer:** Prepare the receiving soil and water before planting.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 10 |
| player_sees | {"scenarios": [{"id": "e1", "label": "Dry soil limits net water uptake"}, {"id": "e2", "label": "Nitrate absent despite nitrogen in organic litter"}, {"id": "e3", "label": "Plants fix carbon only in light but respire all day"}, {"id": "e4", "label": "Excess fertilizer washes into a downstream pool"}], "choices": [{"id": "r4", "label": "Runoff can transfer the problem elsewhere"}, {"id": "r3", "label": "Carbon-flow distinction"}, {"id": "r2", "label": "Nutrient transformation constraint"}, {"id": "r1", "label": "Water availability constraint"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Dry soil limits net water uptake supports Water availability constraint; Runoff can transfer the problem elsewhere describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Dry soil limits net water uptake supports Water availability constraint; Carbon-flow distinction describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Dry soil limits net water uptake supports Water availability constraint; Nutrient transformation constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Nitrate absent despite nitrogen in organic litter supports Nutrient transformation constraint; Runoff can transfer the problem elsewhere describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Nitrate absent despite nitrogen in organic litter supports Nutrient transformation constraint; Carbon-flow distinction describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Nitrate absent despite nitrogen in organic litter supports Nutrient transformation constraint; Water availability constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Plants fix carbon only in light but respire all day supports Carbon-flow distinction; Runoff can transfer the problem elsewhere describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Plants fix carbon only in light but respire all day supports Carbon-flow distinction; Nutrient transformation constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Plants fix carbon only in light but respire all day supports Carbon-flow distinction; Water availability constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Excess fertilizer washes into a downstream pool supports Runoff can transfer the problem elsewhere; Carbon-flow distinction describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Excess fertilizer washes into a downstream pool supports Runoff can transfer the problem elsewhere; Nutrient transformation constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Excess fertilizer washes into a downstream pool supports Runoff can transfer the problem elsewhere; Water availability constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The site constraints operate through different mechanisms. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Nitrogen atoms in litter do not guarantee immediate nitrate availability." |
| why_wrong_occurs | "Nitrogen atoms in litter do not guarantee immediate nitrate availability." |
| story_consequence | "Separate site constraints is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The plot needs both water and nutrient constraints resolved.

**Question card story setup — exact player copy:** The growth calculation depends on prepared-site resources, but the receiving samples show that water and nutrient conditions can fail for different reasons in the same plot. Match those constraints before the director sets the order of habitat preparation and planting.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Dry soil limits net water uptake
- id: e2
  label: Nitrate absent despite nitrogen in organic litter
- id: e3
  label: Plants fix carbon only in light but respire all day
- id: e4
  label: Excess fertilizer washes into a downstream pool
choices:
- id: r4
  label: Runoff can transfer the problem elsewhere
- id: r3
  label: Carbon-flow distinction
- id: r2
  label: Nutrient transformation constraint
- id: r1
  label: Water availability constraint
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Dry soil limits net water uptake supports Water availability constraint; Runoff can transfer the problem elsewhere describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Dry soil limits net water uptake supports Water availability constraint; Carbon-flow distinction describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Dry soil limits net water uptake supports Water availability constraint; Nutrient transformation constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Nitrate absent despite nitrogen in organic litter supports Nutrient transformation constraint; Runoff can transfer the problem elsewhere describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Nitrate absent despite nitrogen in organic litter supports Nutrient transformation constraint; Carbon-flow distinction describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Nitrate absent despite nitrogen in organic litter supports Nutrient transformation constraint; Water availability constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Plants fix carbon only in light but respire all day supports Carbon-flow distinction; Runoff can transfer the problem elsewhere describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Plants fix carbon only in light but respire all day supports Carbon-flow distinction; Nutrient transformation constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Plants fix carbon only in light but respire all day supports Carbon-flow distinction; Water availability constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Excess fertilizer washes into a downstream pool supports Runoff can transfer the problem elsewhere; Carbon-flow distinction describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Excess fertilizer washes into a downstream pool supports Runoff can transfer the problem elsewhere; Nutrient transformation constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Excess fertilizer washes into a downstream pool supports Runoff can transfer the problem elsewhere; Water availability constraint describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The site constraints operate through different mechanisms. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The site constraints operate through different mechanisms. This result is now recorded for the next comparison.

**Why/mechanism:** The site constraints operate through different mechanisms. Dry soil can reduce root water uptake, nitrogen in litter may require transformation before becoming available, and plants both fix carbon and respire rather than running one reversible pathway. Fertilizer exported in runoff transfers nutrients beyond the target plot and can affect other communities. Treating these observations separately prevents the director from equating a single healthy plant sample with a prepared habitat. The preparation order must address the measured receiving-site limits before stocking density is chosen.

**Mechanism links:** Matter conservation, Selective exchange, Energy coupling are the specific broader principles used in the explanation above.

**Misconception:** Nitrogen atoms in litter do not guarantee immediate nitrate availability.

**Wrong-path feedback:**

- Nitrogen atoms in litter do not guarantee immediate nitrate availability.
- Plants continue respiration in light, so daytime carbon gain is a net balance.
- Runoff moves nutrients beyond the intended plot rather than destroying them.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Separate site constraints is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 52.

**Retrieval:** M3 Stop 11 (Check the night controls); M3 Stop 12 (Approve the pot lids); M5 Stop 17 (Read what healthy leaves prove)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 51 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 52 — Prepare before planting

**Format/placement:** CHOICE, Ada Penn at Field Planning Room — Release Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 29 — Matter cycles and disturbance; Keystone: Matter conservation, Population change, Selective exchange, Species interactions; Area: PLAN; Prerequisites: Mission primer and Stop 51: Separate site constraints; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the receiving plot is ready for the pilot.

**Actual mission answer:** Prepare the receiving soil and water before planting.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Receiving soil is dry and nitrate-poor; prepared contained plots meet water and nutrient specifications without excess runoff; unprepared plots fail; proposed stocking assumes prepared-site K = 80." |
| player_must_determine | "Choose the planting order justified by the site comparisons and growth model." |
| correct_result | "Prepare soil and water, then pilot" |
| most_tempting_wrong_result | "The K estimate was conditional on prepared-site resources." |
| why_wrong_occurs | "The K estimate was conditional on prepared-site resources." |
| story_consequence | "Prepare before planting is recorded with its evidence on the Field Planning Room log; Receiving plots are prepared and only the instrumented contained pilot proceeds." |


**Call — exact player copy:** Go to Field Planning Room and meet Ada Penn, preserve director, at Release Board.

**Stop reason — exact player copy:** The planting order must satisfy the model assumptions first.

**Question card story setup — exact player copy:** The site comparisons now connect the growth estimate to actual water and nutrient preparation, while the runoff test limits effects beyond the intended planting plot. Choose the order of work that makes those conditions real before stocking the pilot.

**Question card story-science connection — exact player copy:** Prepare the receiving soil and water before planting.

**Data/readings/options:** Receiving soil is dry and nitrate-poor; prepared contained plots meet water and nutrient specifications without excess runoff; unprepared plots fail; proposed stocking assumes prepared-site K = 80.

**Format-specific interaction block:**
```yaml
question: Choose the planting order justified by the site comparisons and growth model.
choices:
- Prepare soil and water, then pilot
- Plant first and assume K stays fixed
- Add unlimited fertilizer to every plot
- Use island appearance as proof
answer: Prepare soil and water, then pilot
rebuttals:
  Plant first and assume K stays fixed: The K estimate was conditional on prepared-site resources.
  Add unlimited fertilizer to every plot: Extra fertilizer does not supply water and can increase runoff.
  Use island appearance as proof: Similar appearance does not establish water or usable nitrogen conditions.
answerText: The growth model assumes a prepared environment, so its carrying-capacity estimate cannot justify planting into the measured dry, nutrient-poor soil. Prepare the receiving soil and water before planting.
why: The growth model assumes a prepared environment, so its carrying-capacity estimate cannot justify planting into the measured dry, nutrient-poor soil. The contained preparation test supplies the missing evidence while the runoff check limits damage beyond the plot. Planting first would treat an assumption as an observation; unlimited fertilizer could export harm and does not solve water availability. Preparing the site before the instrumented pilot connects nutrient cycling, selective water uptake and population limits to a concrete order of action.
```

**Question card prompt — exact player copy:** Choose the planting order justified by the site comparisons and growth model.

**Correct result:** "Prepare soil and water, then pilot"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The growth model assumes a prepared environment, so its carrying-capacity estimate cannot justify planting into the measured dry, nutrient-poor soil. Prepare the receiving soil and water before planting.

**Why/mechanism:** The growth model assumes a prepared environment, so its carrying-capacity estimate cannot justify planting into the measured dry, nutrient-poor soil. The contained preparation test supplies the missing evidence while the runoff check limits damage beyond the plot. Planting first would treat an assumption as an observation; unlimited fertilizer could export harm and does not solve water availability. Preparing the site before the instrumented pilot connects nutrient cycling, selective water uptake and population limits to a concrete order of action.

**Mechanism links:** Matter conservation, Population change, Selective exchange, Species interactions are the specific broader principles used in the explanation above.

**Misconception:** The K estimate was conditional on prepared-site resources.

**Wrong-path feedback:**

- The K estimate was conditional on prepared-site resources.
- Extra fertilizer does not supply water and can increase runoff.
- Similar appearance does not establish water or usable nitrogen conditions.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Prepare before planting is recorded with its evidence on the Field Planning Room log; Receiving plots are prepared and only the instrumented contained pilot proceeds.

**Unlock:** M13-B4 and mission outcome.

**Retrieval:** M11 Stop 42 (Separate population explanations); M11 Stop 43 (Check the reference model); M11 Stop 44 (Keep several families)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 52 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Prepare the receiving soil and water before planting. The dry soil fails the plant test. The crew uses the plan just chosen. A daytime pilot succeeds while its night record is still missing.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Receiving plots are prepared and only the instrumented contained pilot proceeds. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +4 | Receiving Habitat +5 | Care Supplies -2 | Island Health +4

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 4, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [100, 100, 93, 95]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- Carbon fixation and respiration move carbon in opposite directions through different pathways.
- Water, nutrient availability and organismal activity can constrain establishment together.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Prepare the receiving soil and water before planting.

---


# Mission 14 — GREEN UNTIL MORNING

## A. Mission briefing card — exact player copy

**Header:** DAY 14 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** GREEN UNTIL MORNING

**Go now:** Go to Growth Hall and meet Ivo Reed, plant physiologist, at the Growth Bench.

**Card body:** The prepared pilot looks healthy in daylight, but its dawn animals gather at the surface. An enclosed community can use more oxygen at night than its water supply replaces. Check the pond record, inspect the receiving-water sample, then judge expansion at the Release Board. By the end of the mission, decide whether the full-day pilot clears expansion.

**Objective:** Resolve whether the full-day pilot clears expansion; a daytime pass could hide a night-time failure.

### Worth knowing first — exact player copy

#### Glossary terms

- Net production: Production remaining after the relevant consumption is subtracted.
- Dissolved oxygen: Oxygen gas present in water and available to aquatic organisms.
- Respiratory demand: The rate at which organisms consume oxygen through respiration.
- Controlled comparison: A test that changes a specified factor while keeping relevant alternatives matched.

#### Primer concepts

- A day measurement cannot certify a whole day-night cycle.
- Respiration, exchange and food-web demand must be considered together.
- A correct local result can reveal a wider failure.

#### Equations first needed today

**Equation:** final oxygen = starting oxygen − net loss rate × duration

**What it is for:** Project the tested dark interval.

**Symbols:** Oxygen is mg/L; rate is mg/L/hour; duration is hours.

**Why this campaign needs it:** Test the missing night-time margin.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. An aquarium starts at 9 mg/L and loses 0.5 mg/L each hour for 6 hours; final oxygen is 6 mg/L under the linear model.

2. A model starts at 7 and loses 1 per hour; after 4 hours it reaches 3, even if it was healthy at the start.

3. A ventilated tank and sealed tank differ only in air exchange; a repeatable oxygen contrast supports that mechanism within the design.

4. In 4,000 kJ of producer biomass, a 15% measured transfer gives 600 kJ; measured efficiency can differ from the ten-percent shortcut.

5. A positive net daylight carbon balance does not imply a positive oxygen balance throughout the night; timing and separate measurements matter.

**Authoring-only failure consequence:** A daytime pass could hide a night-time failure.

**Authoring-only later travel:** After Stop 54, carry its evidence to Marsh Research Bay. After Stop 55, carry the tested constraints to Field Planning Room.

## B. Main story happening — designer summary

The prepared pilot looks healthy in daylight, but its dawn animals gather at the surface. The four-stop chain establishes project the dark interval, uses it to read the complete cycle, then choose what each test establishes supplies the discriminating evidence for stop the premature expansion. Expansion is halted and the tested oxygen-supply correction is added to the final plan. The final plan must keep a pause and return path. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: whether the full-day pilot clears expansion. Actual final answer: Hold expansion until the night oxygen problem is corrected. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M14-B1 — On arrival at Growth Hall

**Location:** Growth Hall.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** The prepared pilot looks healthy in daylight, but its dawn animals gather at the surface.

**Dialogue bubble — Ivo Reed, plant physiologist:** “The daylight pass needs a night-time oxygen calculation.”

**Unlocks:** Stop 53.

### Beat M14-B2 — After Stops 53 and 54

**Location:** Growth Hall.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Project the dark interval and Read the complete cycle with their accepted results.

**Panel/HUD text:** “The expansion decision needs the scope of each result. Go to Marsh Research Bay; its Field Bench holds the next comparison.”

**Unlocks:** Stop 55 at Marsh Research Bay.

### Beat M14-B3 — After Stop 55

**Location:** Marsh Research Bay.

**Presentation:** waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The tested constraint is pinned to the sample cart.

**Panel/HUD text:** “Go to Field Planning Room and meet Ada Penn, preserve director, at the Release Board; only the director can authorize the combined plan.”

**Unlocks:** Stop 56.

### Beat M14-B4 — After Stop 56

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** Expansion is halted and the tested oxygen-supply correction is added to the final plan.

**Panel/HUD text:** “Hold expansion until the night oxygen problem is corrected.”

**Unlocks:** The ungraded aftermath.

### Beat M14-BE — At mission end

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** Expansion is halted and the tested oxygen-supply correction is added to the final plan. The final plan must keep a pause and return path.

**Dialogue bubble — Ada Penn, preserve director:** “The final plan must keep a pause and return path.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**3 locations:** Growth Hall → Marsh Research Bay → Field Planning Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 53 | Growth Hall | growth-bench | The daylight pass needs a night-time oxygen calculation. |
| 54 | Growth Hall | pond-tanks | The full-cycle comparison must locate the oxygen failure. |
| 55 | Marsh Research Bay | field-bench | The expansion decision needs the scope of each result. |
| 56 | Field Planning Room | release-board | The director must stop expansion until the corrected pilot is tested. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Ivo Reed, plant physiologist, begins by owning the local evidence. Ada Penn, preserve director, owns the final decision. The conflict is between a daytime pass could hide a night-time failure. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **9 — Respiration and chemiosmosis:** The projected final concentration is 8 − 0.5 × 8 = 4 mg/L.

- **9 — Respiration and chemiosmosis:** Only the dawn reading from the standard pilot falls outside its expected range.

- **30 — Experimental inference and sampling:** Each result supports a different scope of claim.

- **30 — Experimental inference and sampling:** The standard design fails the explicit minimum oxygen requirement at dawn, even though it passes at noon.

This mission retrieves the prior mechanisms identified below and does not add a new major concept.

## H1. Stop 53 — Project the dark interval

**Format/placement:** BALLPARK, Growth Hall — Growth Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 9 — Respiration and chemiosmosis; Keystone: Energy coupling, Selective exchange; Area: GROW; Prerequisites: Mission primer and Stop 52: Prepare before planting; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the full-day pilot clears expansion.

**Actual mission answer:** Hold expansion until the night oxygen problem is corrected.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "The prepared pilot looks healthy in daylight, but its dawn animals gather at the surface." |
| player_sees | "The pilot starts the dark interval at 8 mg/L oxygen; measured net loss is 0.5 mg/L/hour for 8 hours. Use a linear teaching model for this interval." |
| player_must_determine | "Calculate initial oxygen minus rate times time; submit final oxygen in mg per litre." |
| correct_result | 4 |
| most_tempting_wrong_result | "8 ignores the eight-hour loss." |
| why_wrong_occurs | "8 ignores the eight-hour loss." |
| story_consequence | "Project the dark interval is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Growth Bench.

**Stop reason — exact player copy:** The daylight pass needs a night-time oxygen calculation.

**Question card story setup — exact player copy:** The prepared pilot looks healthy in daylight, but animals gather near the surface at dawn and the night record has not yet been cleared. Project the dark-interval oxygen balance before the crew treats the daylight result as permission to expand.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** The pilot starts the dark interval at 8 mg/L oxygen; measured net loss is 0.5 mg/L/hour for 8 hours. Use a linear teaching model for this interval.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Project the dark interval
  units: mg/L
  labels:
  - start
  - loss rate
  - hours
  - day production
  values:
  - 8
  - 0.5
  - 8
  - 3
  slots: 3
  template: '{0} {1} {2} → mg/L'
  formula: a-b*c
  correct:
  - 0
  - 1
  - 2
  target: 4
  correctResult: 4
  tolerance: 0.05
answerText: The projected final concentration is 8 − 0.5 × 8 = 4 mg/L. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Calculate initial oxygen minus rate times time; submit final oxygen in mg per litre.

**Correct result:** 4; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The projected final concentration is 8 − 0.5 × 8 = 4 mg/L. This result is now recorded for the next comparison.

**Why/mechanism:** The projected final concentration is 8 − 0.5 × 8 = 4 mg/L. This uses a measured net loss for the stated dark interval, so a separate respiration subtraction would count consumption twice. The linear model is limited to the supplied interval and does not describe every possible oxygen level. The calculation retrieves the sealed-pot lesson in a community with additional consumers. It identifies a night-time risk that the healthy daylight appearance cannot rule out, and the full-cycle measurements can now test it.

**Mechanism links:** Energy coupling, Selective exchange are the specific broader principles used in the explanation above.

**Misconception:** 8 ignores the eight-hour loss.

**Wrong-path feedback:**

- 8 ignores the eight-hour loss.
- 0 subtracts a full concentration each hour instead of the stated rate.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Project the dark interval is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 54.

**Retrieval:** M3 Stop 12 (Approve the pot lids); M5 Stop 17 (Read what healthy leaves prove); M12 Stop 46 (Budget the food web)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 53 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 54 — Read the complete cycle

**Format/placement:** PROBE, Growth Hall — Pond Tanks.

**Required stop kind:** operated/fixture. **Player verb:** sample and compare stations.

**Metadata:** Concept: 9 — Respiration and chemiosmosis; Keystone: Energy coupling, Selective exchange, Experimental evidence; Area: GROW; Prerequisites: Mission primer and Stop 53: Project the dark interval; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** whether the full-day pilot clears expansion.

**Actual mission answer:** Hold expansion until the night oxygen problem is corrected.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 4 |
| player_sees | {"probe": {"stations": [{"id": "t1", "label": "Pilot at noon", "reading": "9 mg/L oxygen", "expected": "6–10 mg/L", "load": "standard design"}, {"id": "t2", "label": "Pilot at dawn", "reading": "4 mg/L oxygen", "expected": "6–10 mg/L", "load": "same design after eight dark hours"}, {"id": "t3", "label": "Air-supply trial at dawn", "reading": "7 mg/L oxygen", "expected": "6–10 mg/L", "load": "matched organisms and temperature"}, {"id": "t4", "label": "Receiving-water sample", "reading": "8 mg/L oxygen", "expected": "6–10 mg/L", "load": "independent field bottle"}], "target": "t2", "correctChoice": "t2", "quantityAndUnits": "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.", "correctConclusion": "Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison.", "answerText": "Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison."}, "answerText": "Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison."} |
| player_must_determine | "Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed." |
| correct_result | "t2" |
| most_tempting_wrong_result | "The noon result lies in range but covers only daylight." |
| why_wrong_occurs | "The noon result lies in range but covers only daylight." |
| story_consequence | "Read the complete cycle is recorded with its evidence on the Growth Hall log; the next comparison becomes available." |


**Call — exact player copy:** Go to Growth Hall and use Pond Tanks.

**Stop reason — exact player copy:** The full-cycle comparison must locate the oxygen failure.

**Question card story setup — exact player copy:** The dark-interval calculation predicts a risk that the noon inspection could miss, and the field team has now collected the complete-cycle comparison samples. Read every station before deciding whether the pilot design or the receiving water explains the failure.

**Question card story-science connection — exact player copy:** A station-specific failure identifies the comparison that must govern the next handling decision.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
probe:
  stations:
  - id: t1
    label: Pilot at noon
    reading: 9 mg/L oxygen
    expected: 6–10 mg/L
    load: standard design
  - id: t2
    label: Pilot at dawn
    reading: 4 mg/L oxygen
    expected: 6–10 mg/L
    load: same design after eight dark hours
  - id: t3
    label: Air-supply trial at dawn
    reading: 7 mg/L oxygen
    expected: 6–10 mg/L
    load: matched organisms and temperature
  - id: t4
    label: Receiving-water sample
    reading: 8 mg/L oxygen
    expected: 6–10 mg/L
    load: independent field bottle
  target: t2
  correctChoice: t2
  quantityAndUnits: Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.
  correctConclusion: Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison.
  answerText: Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison.
answerText: Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Take and record all four station readings with the sample selector, holding the assay method fixed; compare each with its own expected value and submit the one station ID outside its stated range; no restoration is needed.

**Correct result:** "t2"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Only the dawn reading from the standard pilot falls outside its expected range. This result is now recorded for the next comparison.

**Why/mechanism:** Only the dawn reading from the standard pilot falls outside its expected range. The air-supply comparison remains within range, as does the independent receiving-water sample. The contrast supports insufficient oxygen replacement relative to community demand during the night in this design. It does not blame every receiving-site water source or invalidate the measured daylight success. The old sealed-pot clue now pays off at a larger scale: a community can pass a daytime inspection and still fail over its actual operating cycle.

**Mechanism links:** Energy coupling, Selective exchange, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** The noon result lies in range but covers only daylight.

**Wrong-path feedback:**

- The noon result lies in range but covers only daylight.
- The air-supply trial is inside the expected range.
- The independent water sample is normal and weakens a source-wide explanation.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Read the complete cycle is recorded with its evidence on the Growth Hall log; the next comparison becomes available.

**Unlock:** Stop 55.

**Retrieval:** M12 Stop 46 (Budget the food web); M12 Stop 47 (Interpret the partner screens); M12 Stop 48 (Add the tested partners)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 54 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 55 — Choose what each test establishes

**Format/placement:** PROTOCOL, Marsh Research Bay — Field Bench.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 30 — Experimental inference and sampling; Keystone: Experimental evidence, Energy coupling, Species interactions; Area: MARSH; Prerequisites: Mission primer and Stop 54: Read the complete cycle; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the full-day pilot clears expansion.

**Actual mission answer:** Hold expansion until the night oxygen problem is corrected.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "t2" |
| player_sees | {"scenarios": [{"id": "e1", "label": "Daylight oxygen within specification"}, {"id": "e2", "label": "Dawn oxygen below specification"}, {"id": "e3", "label": "Matched air-supply trial passes at dawn"}, {"id": "e4", "label": "No long-term open-site record yet"}], "choices": [{"id": "r4", "label": "Long-term establishment remains unproved"}, {"id": "r3", "label": "A supported correction for this tested design"}, {"id": "r2", "label": "The standard full-cycle design fails"}, {"id": "r1", "label": "A daylight pass only"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Daylight oxygen within specification supports A daylight pass only; Long-term establishment remains unproved describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Daylight oxygen within specification supports A daylight pass only; A supported correction for this tested design describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Daylight oxygen within specification supports A daylight pass only; The standard full-cycle design fails describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Dawn oxygen below specification supports The standard full-cycle design fails; Long-term establishment remains unproved describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Dawn oxygen below specification supports The standard full-cycle design fails; A supported correction for this tested design describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Dawn oxygen below specification supports The standard full-cycle design fails; A daylight pass only describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Matched air-supply trial passes at dawn supports A supported correction for this tested design; Long-term establishment remains unproved describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Matched air-supply trial passes at dawn supports A supported correction for this tested design; The standard full-cycle design fails describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Matched air-supply trial passes at dawn supports A supported correction for this tested design; A daylight pass only describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "No long-term open-site record yet supports Long-term establishment remains unproved; A supported correction for this tested design describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "No long-term open-site record yet supports Long-term establishment remains unproved; The standard full-cycle design fails describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "No long-term open-site record yet supports Long-term establishment remains unproved; A daylight pass only describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "Each result supports a different scope of claim. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "A daylight observation does not cover the unmeasured night." |
| why_wrong_occurs | "A daylight observation does not cover the unmeasured night." |
| story_consequence | "Choose what each test establishes is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Field Bench.

**Stop reason — exact player copy:** The expansion decision needs the scope of each result.

**Question card story setup — exact player copy:** The complete-cycle comparison isolates a dawn problem in the standard design, while the air-supply trial and independent water sample remain within their expected ranges. Match each result to the claim it supports before the director judges expansion.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Daylight oxygen within specification
- id: e2
  label: Dawn oxygen below specification
- id: e3
  label: Matched air-supply trial passes at dawn
- id: e4
  label: No long-term open-site record yet
choices:
- id: r4
  label: Long-term establishment remains unproved
- id: r3
  label: A supported correction for this tested design
- id: r2
  label: The standard full-cycle design fails
- id: r1
  label: A daylight pass only
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Daylight oxygen within specification supports A daylight pass only; Long-term establishment remains unproved describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Daylight oxygen within specification supports A daylight pass only; A supported correction for this tested design describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Daylight oxygen within specification supports A daylight pass only; The standard full-cycle design fails describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Dawn oxygen below specification supports The standard full-cycle design fails; Long-term establishment remains unproved describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Dawn oxygen below specification supports The standard full-cycle design fails; A supported correction for this tested design describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Dawn oxygen below specification supports The standard full-cycle design fails; A daylight pass only describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Matched air-supply trial passes at dawn supports A supported correction for this tested design; Long-term establishment remains unproved describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Matched air-supply trial passes at dawn supports A supported correction for this tested design; The standard full-cycle design fails describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Matched air-supply trial passes at dawn supports A supported correction for this tested design; A daylight pass only describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: No long-term open-site record yet supports Long-term establishment remains unproved; A supported correction for this tested design describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: No long-term open-site record yet supports Long-term establishment remains unproved; The standard full-cycle design fails describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: No long-term open-site record yet supports Long-term establishment remains unproved; A daylight pass only describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: Each result supports a different scope of claim. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Each result supports a different scope of claim. This result is now recorded for the next comparison.

**Why/mechanism:** Each result supports a different scope of claim. Daylight oxygen can pass while a dawn reading fails the full-cycle requirement. A matched air-supply trial supports a correction for this design, but it does not establish long-term open-site survival or remove every other release constraint. The field sample prevents a broad source-water blame unsupported by the data. Reading the scope of evidence is now essential because the director must decide whether the apparent victory warrants expansion or requires another contained test.

**Mechanism links:** Experimental evidence, Energy coupling, Species interactions are the specific broader principles used in the explanation above.

**Misconception:** A daylight observation does not cover the unmeasured night.

**Wrong-path feedback:**

- A daylight observation does not cover the unmeasured night.
- A tested correction is useful without proving every future environment.
- Missing long-term evidence must remain an uncertainty rather than a presumed success.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Choose what each test establishes is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 56.

**Retrieval:** M12 Stop 46 (Budget the food web); M12 Stop 47 (Interpret the partner screens); M12 Stop 48 (Add the tested partners)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 55 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 56 — Stop the premature expansion

**Format/placement:** CHOICE, Ada Penn at Field Planning Room — Release Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 30 — Experimental inference and sampling; Keystone: Experimental evidence, Energy coupling, Selective exchange, Species interactions; Area: PLAN; Prerequisites: Mission primer and Stop 55: Choose what each test establishes; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the full-day pilot clears expansion.

**Actual mission answer:** Hold expansion until the night oxygen problem is corrected.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Standard pilot reaches 4 mg/L at dawn; fictional requirement is at least 6 mg/L throughout the cycle; matched air-supply design reaches 7; long-term establishment has not been tested." |
| player_must_determine | "Select the expansion decision supported by the complete-cycle evidence." |
| correct_result | "Hold expansion and retest corrected pilot" |
| most_tempting_wrong_result | "Noon alone misses the measured dawn failure." |
| why_wrong_occurs | "Noon alone misses the measured dawn failure." |
| story_consequence | "Stop the premature expansion is recorded with its evidence on the Field Planning Room log; Expansion is halted and the tested oxygen-supply correction is added to the final plan." |


**Call — exact player copy:** Go to Field Planning Room and meet Ada Penn, preserve director, at Release Board.

**Stop reason — exact player copy:** The director must stop expansion until the corrected pilot is tested.

**Question card story setup — exact player copy:** The claim matches preserve the daylight success but show that it cannot certify the night, and a matched correction has now passed the dawn comparison. Choose the expansion decision that carries this evidence into the final release plan.

**Question card story-science connection — exact player copy:** Hold expansion until the night oxygen problem is corrected.

**Data/readings/options:** Standard pilot reaches 4 mg/L at dawn; fictional requirement is at least 6 mg/L throughout the cycle; matched air-supply design reaches 7; long-term establishment has not been tested.

**Format-specific interaction block:**
```yaml
question: Select the expansion decision supported by the complete-cycle evidence.
choices:
- Hold expansion and retest corrected pilot
- Expand from the noon pass
- Remove all consumers permanently
- Reject the normal source water
answer: Hold expansion and retest corrected pilot
rebuttals:
  Expand from the noon pass: Noon alone misses the measured dawn failure.
  Remove all consumers permanently: Removing consumers changes the planned community rather than testing the supported correction.
  Reject the normal source water: The independent receiving-water reading is within range.
answerText: The standard design fails the explicit minimum oxygen requirement at dawn, even though it passes at noon. Hold expansion until the night oxygen problem is corrected.
why: The standard design fails the explicit minimum oxygen requirement at dawn, even though it passes at noon. The matched air-supply comparison identifies a correction worth testing through the complete cycle before expansion. Removing all consumers would change the intended community without demonstrating the desired outcome, and the normal source-water sample does not support rejecting the entire source. The final plan must therefore retain a monitored pilot, a pause threshold and a return path instead of allowing the daytime success to authorize an irreversible broad release.
```

**Question card prompt — exact player copy:** Select the expansion decision supported by the complete-cycle evidence.

**Correct result:** "Hold expansion and retest corrected pilot"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The standard design fails the explicit minimum oxygen requirement at dawn, even though it passes at noon. Hold expansion until the night oxygen problem is corrected.

**Why/mechanism:** The standard design fails the explicit minimum oxygen requirement at dawn, even though it passes at noon. The matched air-supply comparison identifies a correction worth testing through the complete cycle before expansion. Removing all consumers would change the intended community without demonstrating the desired outcome, and the normal source-water sample does not support rejecting the entire source. The final plan must therefore retain a monitored pilot, a pause threshold and a return path instead of allowing the daytime success to authorize an irreversible broad release.

**Mechanism links:** Experimental evidence, Energy coupling, Selective exchange, Species interactions are the specific broader principles used in the explanation above.

**Misconception:** Noon alone misses the measured dawn failure.

**Wrong-path feedback:**

- Noon alone misses the measured dawn failure.
- Removing consumers changes the planned community rather than testing the supported correction.
- The independent receiving-water reading is within range.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Stop the premature expansion is recorded with its evidence on the Field Planning Room log; Expansion is halted and the tested oxygen-supply correction is added to the final plan.

**Unlock:** M14-B4 and mission outcome.

**Retrieval:** M12 Stop 46 (Budget the food web); M12 Stop 47 (Interpret the partner screens); M12 Stop 48 (Add the tested partners)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 56 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Hold expansion until the night oxygen problem is corrected. The dawn test falls below the oxygen limit. The crew uses the plan just chosen. The final plan must keep a pause and return path.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Expansion is halted and the tested oxygen-supply correction is added to the final plan. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence -4 | Receiving Habitat -3 | Care Supplies -2 | Island Health -3

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 3, 1] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [96, 97, 94, 93]; bank 0.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** No permanent lock; any 100% bar remains vulnerable to named later events.

## K. Quick concept review

- A day measurement cannot certify a whole day-night cycle.
- Respiration, exchange and food-web demand must be considered together.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Hold expansion until the night oxygen problem is corrected.

---


# Mission 15 — WHAT GOES HOME

## A. Mission briefing card — exact player copy

**Header:** DAY 15 OF 15 — SHIP DEPARTS AFTER DAY 15

**Card title:** WHAT GOES HOME

**Go now:** Go to Seed Room and meet Nell Shah, conservation geneticist, at the Seed Table.

**Card body:** Expansion is on hold, and the ship waits for a plan that covers the whole day. A release must preserve tested relationships while leaving room to stop when evidence changes. Check the selected families, review the corrected cycle, then commit the plan at the Release Board. By the end of the mission, decide which release plan the evidence now supports.

**Objective:** Resolve which release plan the evidence now supports; an unchecked move could lose both the stock and its habitat.

### Worth knowing first — exact player copy

#### Glossary terms

- Pilot: A limited test before a wider action.
- Stop rule: A stated condition that pauses an action.
- Reserve population: A retained group that preserves organisms and variation if a trial fails.

#### Primer concepts

- Retrieve family diversity, nutrient preparation, partner screening and full-cycle oxygen evidence.
- Authorize only what the observations and permit support.
- Keep a response available if the monitored conditions leave the accepted range.

#### Equations first needed today

No new equation is needed today; retrieve the recorded relationships and biological pathways from the mission log.

### Optional worked examples — exact player copy

**Button:** WORKED EXAMPLES (5)

Opening pauses the timer; closing returns to the same card; reopen at any time. These examples are generic, ungraded and change no bars, world state, unlocks or retrieval bookkeeping.

1. A trial needs A and B but C is optional; a plan containing A and C still fails because B is missing.

2. A stated rule pauses below 5 mg/L; a reading of exactly 5 passes the inclusive minimum and 4.9 triggers pause.

3. Three families each retain 4 individuals; the reserve holds 12 individuals, though family count alone does not measure every allele.

4. A pilot survives one week; the observation supports that week under its conditions, not every season or site.

5. Two measurements share a calibration error; agreement is weaker evidence than agreement with an independently calibrated comparison.

**Authoring-only failure consequence:** An unchecked move could lose both the stock and its habitat.

**Authoring-only later travel:** After Stop 58, carry its evidence to Marsh Research Bay. After Stop 59, carry the tested constraints to Field Planning Room.

## B. Main story happening — designer summary

Expansion is on hold, and the ship waits for a plan that covers the whole day. The four-stop chain establishes carry forward the tested constraints, uses it to keep the habitat links intact, then check the corrected night margin supplies the discriminating evidence for sign the living manifest. The corrected pilot is approved and the first covered sample cart reaches the waiting ship. The island keeps a reserve while the mainland pilot begins. All events are delivered in D and I.

## C. Designer intent — not shown to player

Mission question: which release plan the evidence now supports. Actual final answer: Authorize only the corrected monitored pilot, with a pause and return path. The mission uses the recorded result of each stop as the reason for the next comparison; the player’s final choice, not a narrator, makes the decision.

## D. Player-facing beat script

### Beat M15-B1 — On arrival at Seed Room

**Location:** Seed Room.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer starts only after this bubble closes; immediate control return.

**World state:** Expansion is on hold, and the ship waits for a plan that covers the whole day.

**Dialogue bubble — Nell Shah, conservation geneticist:** “The final stock list must retain each tested constraint.”

**Unlocks:** Stop 57.

### Beat M15-B2 — After Stops 57 and 58

**Location:** Seed Room.

**Presentation:** equipment_panel_update + waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The local log retains Carry forward the tested constraints and Keep the habitat links intact with their accepted results.

**Panel/HUD text:** “The final decision needs the corrected full-cycle oxygen margin. Go to Marsh Research Bay; its Field Bench holds the next comparison.”

**Unlocks:** Stop 59 at Marsh Research Bay.

### Beat M15-B3 — After Stop 59

**Location:** Marsh Research Bay.

**Presentation:** waypoint_notification.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The tested constraint is pinned to the sample cart.

**Panel/HUD text:** “Go to Field Planning Room and meet Ada Penn, preserve director, at the Release Board; only the director can authorize the combined plan.”

**Unlocks:** Stop 60.

### Beat M15-B4 — After Stop 60

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + system_banner.

**Player control:** One Continue; timer paused; immediate return to normal control.

**World state:** The corrected pilot is approved and the first covered sample cart reaches the waiting ship.

**Panel/HUD text:** “Authorize only the corrected monitored pilot, with a pause and return path.”

**Unlocks:** The ungraded aftermath; final boarding still waits for allocation and all evidence flags.

### Beat M15-BE — At mission end

**Location:** Field Planning Room.

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.

**Player control:** Timer paused; 45–60 seconds of optional free inspection, with immediate accessible skip to the same text; no quiz or forced camera.

**World state:** The corrected pilot is approved and the first covered sample cart reaches the waiting ship. The island keeps a reserve while the mainland pilot begins.

**Dialogue bubble — Ada Penn, preserve director:** “The island keeps a reserve while the mainland pilot begins.”

**Unlocks:** Metric screen after inspecting the changed object or accessible log entry.

## E. Location plan

**3 locations:** Seed Room → Marsh Research Bay → Field Planning Room.

| Stop | Place | Fixture | Why this destination |
|---|---|---|---|
| 57 | Seed Room | seed-table | The final stock list must retain each tested constraint. |
| 58 | Seed Room | seed-table | The final manifest must keep the tested habitat relationships. |
| 59 | Marsh Research Bay | field-bench | The final decision needs the corrected full-cycle oxygen margin. |
| 60 | Field Planning Room | release-board | The waiting ship needs the final evidence-based release plan. |

Travel is evidence-led: local results are pinned to the sample cart, the next room contains its own controlled samples or family records, and the final Planning Room owns authorization where used. The source’s far bay is unavailable through Mission 4. All travel waypoints and conclusions remain in the mission log.

## F. Characters and dramatic beat

Nell Shah, conservation geneticist, begins by owning the local evidence. Ada Penn, preserve director, owns the final decision. The conflict is between an unchecked move could lose both the stock and its habitat. and the temptation to act before the measured comparison is complete. The result changes the standing greeting according to the roster arc.

## G. Key concepts, explained here

- **30 — Experimental inference and sampling:** The final seed decision retrieves distinctions established across the campaign.

- **29 — Matter cycles and disturbance:** The habitat plan depends on measured relationships rather than the visual appeal of a complete island replica.

- **9 — Respiration and chemiosmosis:** The corrected pilot projects 9 − 0.25 × 8 = 7 mg/L at the end of the dark interval, one mg/L above the inclusive six-mg/L requirement.

- **30 — Experimental inference and sampling:** Only the corrected monitored pilot carries forward every established requirement without expanding beyond the evidence or permit.

This mission retrieves the prior mechanisms identified below and does not add a new major concept.

## H1. Stop 57 — Carry forward the tested constraints

**Format/placement:** PROTOCOL, Seed Room — Seed Table.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 30 — Experimental inference and sampling; Keystone: Inheritance and variation, Regulation and feedback, Experimental evidence; Area: SEED; Prerequisites: Mission primer and Stop 56: Stop the premature expansion; Learning role: TRANSFER; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** which release plan the evidence now supports.

**Actual mission answer:** Authorize only the corrected monitored pilot, with a pause and return path.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | "Expansion is on hold, and the ship waits for a plan that covers the whole day." |
| player_sees | {"scenarios": [{"id": "e1", "label": "Leaf form changes with light"}, {"id": "e2", "label": "Several screened families retain rare alleles"}, {"id": "e3", "label": "One tissue line ignores signal removal"}, {"id": "e4", "label": "Enzyme variant has incomplete causal proof"}], "choices": [{"id": "r4", "label": "Retain its evidence without declaring every trait explained"}, {"id": "r3", "label": "Keep that line out pending investigation"}, {"id": "r2", "label": "Keep several families and island reserve"}, {"id": "r1", "label": "Use ancestry rather than appearance-only labels"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Leaf form changes with light supports Use ancestry rather than appearance-only labels; Retain its evidence without declaring every trait explained describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Leaf form changes with light supports Use ancestry rather than appearance-only labels; Keep that line out pending investigation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Leaf form changes with light supports Use ancestry rather than appearance-only labels; Keep several families and island reserve describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Several screened families retain rare alleles supports Keep several families and island reserve; Retain its evidence without declaring every trait explained describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Several screened families retain rare alleles supports Keep several families and island reserve; Keep that line out pending investigation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Several screened families retain rare alleles supports Keep several families and island reserve; Use ancestry rather than appearance-only labels describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "One tissue line ignores signal removal supports Keep that line out pending investigation; Retain its evidence without declaring every trait explained describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "One tissue line ignores signal removal supports Keep that line out pending investigation; Keep several families and island reserve describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "One tissue line ignores signal removal supports Keep that line out pending investigation; Use ancestry rather than appearance-only labels describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Enzyme variant has incomplete causal proof supports Retain its evidence without declaring every trait explained; Keep that line out pending investigation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Enzyme variant has incomplete causal proof supports Retain its evidence without declaring every trait explained; Keep several families and island reserve describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Enzyme variant has incomplete causal proof supports Retain its evidence without declaring every trait explained; Use ancestry rather than appearance-only labels describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The final seed decision retrieves distinctions established across the campaign. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "Appearance-only labels ignore the common-environment comparison." |
| why_wrong_occurs | "Appearance-only labels ignore the common-environment comparison." |
| story_consequence | "Carry forward the tested constraints is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Seed Table.

**Stop reason — exact player copy:** The final stock list must retain each tested constraint.

**Question card story setup — exact player copy:** Expansion is on hold, and the waiting ship needs a stock list that keeps every earlier family and health finding connected to the organisms selected. Match those findings to handling constraints before the final habitat and transport evidence is combined.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Leaf form changes with light
- id: e2
  label: Several screened families retain rare alleles
- id: e3
  label: One tissue line ignores signal removal
- id: e4
  label: Enzyme variant has incomplete causal proof
choices:
- id: r4
  label: Retain its evidence without declaring every trait explained
- id: r3
  label: Keep that line out pending investigation
- id: r2
  label: Keep several families and island reserve
- id: r1
  label: Use ancestry rather than appearance-only labels
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Leaf form changes with light supports Use ancestry rather than appearance-only labels; Retain its evidence without declaring every trait explained describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Leaf form changes with light supports Use ancestry rather than appearance-only labels; Keep that line out pending investigation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Leaf form changes with light supports Use ancestry rather than appearance-only labels; Keep several families and island reserve describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Several screened families retain rare alleles supports Keep several families and island reserve; Retain its evidence without declaring every trait explained describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Several screened families retain rare alleles supports Keep several families and island reserve; Keep that line out pending investigation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Several screened families retain rare alleles supports Keep several families and island reserve; Use ancestry rather than appearance-only labels describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: One tissue line ignores signal removal supports Keep that line out pending investigation; Retain its evidence without declaring every trait explained describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: One tissue line ignores signal removal supports Keep that line out pending investigation; Keep several families and island reserve describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: One tissue line ignores signal removal supports Keep that line out pending investigation; Use ancestry rather than appearance-only labels describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Enzyme variant has incomplete causal proof supports Retain its evidence without declaring every trait explained; Keep that line out pending investigation describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Enzyme variant has incomplete causal proof supports Retain its evidence without declaring every trait explained; Keep several families and island reserve describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Enzyme variant has incomplete causal proof supports Retain its evidence without declaring every trait explained; Use ancestry rather than appearance-only labels describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The final seed decision retrieves distinctions established across the campaign. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The final seed decision retrieves distinctions established across the campaign. This result is now recorded for the next comparison.

**Why/mechanism:** The final seed decision retrieves distinctions established across the campaign. Appearance can change with regulation, ancestry preserves inheritance information, and screened family diversity reduces avoidable founding loss. The abnormal tissue line still has a specific unresolved control problem, while the enzyme lead remains narrower than a complete diagnosis. Carrying each conclusion forward with its original scope prevents the finale from discarding uncertainty for a tidy ending. The ship receives a traceable stock list rather than a collection selected only because its plants look alike.

**Mechanism links:** Inheritance and variation, Regulation and feedback, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** Appearance-only labels ignore the common-environment comparison.

**Wrong-path feedback:**

- Appearance-only labels ignore the common-environment comparison.
- A signal-control failure remains relevant even when other families pass.
- A supported enzyme lead is not proof that every trait has the same cause.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Carry forward the tested constraints is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 58.

**Retrieval:** M11 Stop 44 (Keep several families); M12 Stop 47 (Interpret the partner screens); M12 Stop 48 (Add the tested partners)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 57 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H2. Stop 58 — Keep the habitat links intact

**Format/placement:** PROTOCOL, Seed Room — Seed Table.

**Required stop kind:** calculation/room. **Player verb:** match mechanisms to observations.

**Metadata:** Concept: 29 — Matter cycles and disturbance; Keystone: Matter conservation, Species interactions, Population change; Area: SEED; Prerequisites: Mission primer and Stop 57: Carry forward the tested constraints; Learning role: TRANSFER; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** which release plan the evidence now supports.

**Actual mission answer:** Authorize only the corrected monitored pilot, with a pause and return path.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | {"scenarios": [{"id": "e1", "label": "Screened fungal pair improves nutrient uptake"}, {"id": "e2", "label": "Dry receiving soil fails growth tests"}, {"id": "e3", "label": "Limited nutrient supply lowers supportable population"}, {"id": "e4", "label": "Bulk island soil remains unscreened"}], "choices": [{"id": "r4", "label": "Leave bulk soil on the island"}, {"id": "r3", "label": "Keep pilot stock within tested capacity"}, {"id": "r2", "label": "Prepare water conditions before planting"}, {"id": "r1", "label": "Use only the tested compatible pair in containment"}], "mapping": {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}, "rebuttals": {"e1→r4": "Screened fungal pair improves nutrient uptake supports Use only the tested compatible pair in containment; Leave bulk soil on the island describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r3": "Screened fungal pair improves nutrient uptake supports Use only the tested compatible pair in containment; Keep pilot stock within tested capacity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e1→r2": "Screened fungal pair improves nutrient uptake supports Use only the tested compatible pair in containment; Prepare water conditions before planting describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r4": "Dry receiving soil fails growth tests supports Prepare water conditions before planting; Leave bulk soil on the island describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r3": "Dry receiving soil fails growth tests supports Prepare water conditions before planting; Keep pilot stock within tested capacity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e2→r1": "Dry receiving soil fails growth tests supports Prepare water conditions before planting; Use only the tested compatible pair in containment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r4": "Limited nutrient supply lowers supportable population supports Keep pilot stock within tested capacity; Leave bulk soil on the island describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r2": "Limited nutrient supply lowers supportable population supports Keep pilot stock within tested capacity; Prepare water conditions before planting describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e3→r1": "Limited nutrient supply lowers supportable population supports Keep pilot stock within tested capacity; Use only the tested compatible pair in containment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r3": "Bulk island soil remains unscreened supports Leave bulk soil on the island; Keep pilot stock within tested capacity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r2": "Bulk island soil remains unscreened supports Leave bulk soil on the island; Prepare water conditions before planting describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.", "e4→r1": "Bulk island soil remains unscreened supports Leave bulk soil on the island; Use only the tested compatible pair in containment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect."}, "answerText": "The habitat plan depends on measured relationships rather than the visual appeal of a complete island replica. This result is now recorded for the next comparison."} |
| player_must_determine | "Match each labeled observation to one explanation; submit all matches, using each explanation once." |
| correct_result | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| most_tempting_wrong_result | "A useful isolate does not clear all bulk soil organisms." |
| why_wrong_occurs | "A useful isolate does not clear all bulk soil organisms." |
| story_consequence | "Keep the habitat links intact is recorded with its evidence on the Seed Room log; the next comparison becomes available." |


**Call — exact player copy:** Go to Seed Room and use Seed Table.

**Stop reason — exact player copy:** The final manifest must keep the tested habitat relationships.

**Question card story setup — exact player copy:** The stock matches preserve ancestry and the held-line boundary, but the selected families still need the habitat relationships tested during the pilot work. Carry those measured links into the final plan before checking the corrected night-time oxygen margin.

**Question card story-science connection — exact player copy:** Distinguishing these mechanisms keeps the next handling decision tied to the evidence.

**Data/readings/options:** The following labeled observations and candidates are shown in full before submission.

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Screened fungal pair improves nutrient uptake
- id: e2
  label: Dry receiving soil fails growth tests
- id: e3
  label: Limited nutrient supply lowers supportable population
- id: e4
  label: Bulk island soil remains unscreened
choices:
- id: r4
  label: Leave bulk soil on the island
- id: r3
  label: Keep pilot stock within tested capacity
- id: r2
  label: Prepare water conditions before planting
- id: r1
  label: Use only the tested compatible pair in containment
mapping:
  e1: r1
  e2: r2
  e3: r3
  e4: r4
rebuttals:
  e1→r4: Screened fungal pair improves nutrient uptake supports Use only the tested compatible pair in containment; Leave bulk soil on the island describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r3: Screened fungal pair improves nutrient uptake supports Use only the tested compatible pair in containment; Keep pilot stock within tested capacity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e1→r2: Screened fungal pair improves nutrient uptake supports Use only the tested compatible pair in containment; Prepare water conditions before planting describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r4: Dry receiving soil fails growth tests supports Prepare water conditions before planting; Leave bulk soil on the island describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r3: Dry receiving soil fails growth tests supports Prepare water conditions before planting; Keep pilot stock within tested capacity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e2→r1: Dry receiving soil fails growth tests supports Prepare water conditions before planting; Use only the tested compatible pair in containment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r4: Limited nutrient supply lowers supportable population supports Keep pilot stock within tested capacity; Leave bulk soil on the island describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r2: Limited nutrient supply lowers supportable population supports Keep pilot stock within tested capacity; Prepare water conditions before planting describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e3→r1: Limited nutrient supply lowers supportable population supports Keep pilot stock within tested capacity; Use only the tested compatible pair in containment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r3: Bulk island soil remains unscreened supports Leave bulk soil on the island; Keep pilot stock within tested capacity describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r2: Bulk island soil remains unscreened supports Leave bulk soil on the island; Prepare water conditions before planting describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
  e4→r1: Bulk island soil remains unscreened supports Leave bulk soil on the island; Use only the tested compatible pair in containment describes a different mechanism and does not account for that observation. Reopen this match and compare the stated effect.
answerText: The habitat plan depends on measured relationships rather than the visual appeal of a complete island replica. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Match each labeled observation to one explanation; submit all matches, using each explanation once.

**Correct result:** {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"}; exact label, complete mapping or complete order; no partial completion.

**Answer text:** The habitat plan depends on measured relationships rather than the visual appeal of a complete island replica. This result is now recorded for the next comparison.

**Why/mechanism:** The habitat plan depends on measured relationships rather than the visual appeal of a complete island replica. A screened compatible partner improves uptake in containment, prepared water conditions support roots, and limited resources constrain the pilot population. Unscreened bulk soil is not justified by the useful result from one tested isolate. These constraints combine matter cycling, population limits and interactions. Keeping them explicit gives the director a plan that supports the stock without silently authorizing movement of every organism associated with it.

**Mechanism links:** Matter conservation, Species interactions, Population change are the specific broader principles used in the explanation above.

**Misconception:** A useful isolate does not clear all bulk soil organisms.

**Wrong-path feedback:**

- A useful isolate does not clear all bulk soil organisms.
- A model capacity assumes the measured habitat preparation.
- Water and nutrients are separate limits, so one cannot simply replace the other.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Keep the habitat links intact is recorded with its evidence on the Seed Room log; the next comparison becomes available.

**Unlock:** Stop 59.

**Retrieval:** M13 Stop 50 (Check room for growth); M13 Stop 51 (Separate site constraints); M13 Stop 52 (Prepare before planting)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 58 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H3. Stop 59 — Check the corrected night margin

**Format/placement:** BALLPARK, Marsh Research Bay — Field Bench.

**Required stop kind:** calculation/room. **Player verb:** assemble and calculate from number tiles.

**Metadata:** Concept: 9 — Respiration and chemiosmosis; Keystone: Energy coupling, Selective exchange, Experimental evidence; Area: MARSH; Prerequisites: Mission primer and Stop 58: Keep the habitat links intact; Learning role: TRANSFER; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** which release plan the evidence now supports.

**Actual mission answer:** Authorize only the corrected monitored pilot, with a pause and return path.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | {"e1": "r1", "e2": "r2", "e3": "r3", "e4": "r4"} |
| player_sees | "Corrected pilot begins at 9 mg/L oxygen and loses a measured net 0.25 mg/L/hour for 8 hours; the required minimum is 6 mg/L inclusive. A calculator is available." |
| player_must_determine | "Calculate final oxygen using start minus net rate times duration; submit mg per litre, then compare with the recorded minimum." |
| correct_result | 7 |
| most_tempting_wrong_result | "6 is the threshold rather than the calculated final reading." |
| why_wrong_occurs | "6 is the threshold rather than the calculated final reading." |
| story_consequence | "Check the corrected night margin is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available." |


**Call — exact player copy:** Go to Marsh Research Bay and use Field Bench.

**Stop reason — exact player copy:** The final decision needs the corrected full-cycle oxygen margin.

**Question card story setup — exact player copy:** The stock and habitat constraints are now recorded, and the corrected pilot has a full dark-interval rate measured under the proposed conditions for transport and care. Calculate its ending oxygen level before the director commits the complete monitored plan.

**Question card story-science connection — exact player copy:** The calculated quantity sets the comparison the crew must satisfy before it acts.

**Data/readings/options:** Corrected pilot begins at 9 mg/L oxygen and loses a measured net 0.25 mg/L/hour for 8 hours; the required minimum is 6 mg/L inclusive. A calculator is available.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Check the corrected night margin
  units: mg/L
  labels:
  - start
  - net loss rate
  - hours
  - minimum
  values:
  - 9
  - 0.25
  - 8
  - 6
  slots: 3
  template: '{0} {1} {2} → mg/L'
  formula: a-b*c
  correct:
  - 0
  - 1
  - 2
  target: 7
  correctResult: 7
  tolerance: 0.05
answerText: The corrected pilot projects 9 − 0.25 × 8 = 7 mg/L at the end of the dark interval, one mg/L above the inclusive six-mg/L requirement. This result is now recorded for the next comparison.
```

**Question card prompt — exact player copy:** Calculate final oxygen using start minus net rate times duration; submit mg per litre, then compare with the recorded minimum.

**Correct result:** 7; absolute tolerance ±0.05 in the requested unit, inclusive.

**Answer text:** The corrected pilot projects 9 − 0.25 × 8 = 7 mg/L at the end of the dark interval, one mg/L above the inclusive six-mg/L requirement. This result is now recorded for the next comparison.

**Why/mechanism:** The corrected pilot projects 9 − 0.25 × 8 = 7 mg/L at the end of the dark interval, one mg/L above the inclusive six-mg/L requirement. The net rate already includes the tested oxygen-supply correction and community demand. This arithmetic agrees with the measured corrected trial recorded in Mission 14, but only for the stated conditions and interval. It clears the full-cycle component of the final plan while leaving family identity, screened partners, receiving-site preparation and monitoring as separate requirements for the director to integrate.

**Mechanism links:** Energy coupling, Selective exchange, Experimental evidence are the specific broader principles used in the explanation above.

**Misconception:** 6 is the threshold rather than the calculated final reading.

**Wrong-path feedback:**

- 6 is the threshold rather than the calculated final reading.
- 8.75 subtracts one hour of loss instead of eight.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Check the corrected night margin is recorded with its evidence on the Marsh Research Bay log; the next comparison becomes available.

**Unlock:** Stop 60.

**Retrieval:** M12 Stop 48 (Add the tested partners); M13 Stop 51 (Separate site constraints); M13 Stop 52 (Prepare before planting)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 59 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## H4. Stop 60 — Sign the living manifest

**Format/placement:** CHOICE, Ada Penn at Field Planning Room — Release Board.

**Required stop kind:** decision/person. **Player verb:** select a consequential plan.

**Metadata:** Concept: 30 — Experimental inference and sampling; Keystone: Experimental evidence, Inheritance and variation, Population change, Species interactions, Matter conservation, Energy coupling, Selective exchange, Regulation and feedback, Information flow, Structure and function; Area: PLAN; Prerequisites: Mission primer and Stop 59: Check the corrected night margin; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** which release plan the evidence now supports.

**Actual mission answer:** Authorize only the corrected monitored pilot, with a pause and return path.

**Stop kernel:**
| Kernel field | Author-only value |
|---|---|
| player_knows | 7 |
| player_sees | "Required record: several screened families with island reserve; held abnormal line excluded; screened compatible partner only; prepared contained receiving plot; corrected full-cycle oxygen at least 6 mg/L; pause and return if below 6 or a new health failure occurs; permit covers the monitored pilot only." |
| player_must_determine | "Select one complete release plan; this is the final graded decision." |
| correct_result | "Corrected monitored pilot with reserve and return" |
| most_tempting_wrong_result | "The noon-only plan ignores the dawn failure and exceeds the permit." |
| why_wrong_occurs | "The noon-only plan ignores the dawn failure and exceeds the permit." |
| story_consequence | "Sign the living manifest is recorded with its evidence on the Field Planning Room log; The corrected pilot is approved and the first covered sample cart reaches the waiting ship." |


**Call — exact player copy:** Go to Field Planning Room and meet Ada Penn, preserve director, at Release Board.

**Stop reason — exact player copy:** The waiting ship needs the final evidence-based release plan.

**Question card story setup — exact player copy:** The corrected night calculation meets the recorded limit, and the stock, partner and receiving-site evidence now sit together on the release board for the first time. Choose the complete plan that preserves those constraints and leaves a response to new failure.

**Question card story-science connection — exact player copy:** Authorize only the corrected monitored pilot, with a pause and return path.

**Data/readings/options:** Required record: several screened families with island reserve; held abnormal line excluded; screened compatible partner only; prepared contained receiving plot; corrected full-cycle oxygen at least 6 mg/L; pause and return if below 6 or a new health failure occurs; permit covers the monitored pilot only.

**Format-specific interaction block:**
```yaml
question: Select one complete release plan; this is the final graded decision.
choices:
- Corrected monitored pilot with reserve and return
- Immediate broad release after noon inspection
- Plants alone in unprepared receiving soil
- All island organisms with no pause rule
answer: Corrected monitored pilot with reserve and return
rebuttals:
  Immediate broad release after noon inspection: The noon-only plan ignores the dawn failure and exceeds the permit.
  Plants alone in unprepared receiving soil: Plants alone and unprepared soil both failed relevant contained comparisons.
  All island organisms with no pause rule: Untested organisms and no pause rule violate the evidence and movement limits.
answerText: Only the corrected monitored pilot carries forward every established requirement without expanding beyond the evidence or permit. Authorize only the corrected monitored pilot, with a pause and return path.
why: 'Only the corrected monitored pilot carries forward every established requirement without expanding beyond the evidence or permit. The plan preserves screened family variation and an island reserve, includes the tested partner, prepares the receiving habitat and maintains the corrected oxygen cycle. A stop rule preserves a response to new failure rather than claiming certainty about long-term establishment. The final decision therefore integrates the campaign’s biological mechanisms with their limits: success means a justified next step whose consequences can still be observed and acted upon.'
```

**Question card prompt — exact player copy:** Select one complete release plan; this is the final graded decision.

**Correct result:** "Corrected monitored pilot with reserve and return"; exact label, complete mapping or complete order; no partial completion.

**Answer text:** Only the corrected monitored pilot carries forward every established requirement without expanding beyond the evidence or permit. Authorize only the corrected monitored pilot, with a pause and return path.

**Why/mechanism:** Only the corrected monitored pilot carries forward every established requirement without expanding beyond the evidence or permit. The plan preserves screened family variation and an island reserve, includes the tested partner, prepares the receiving habitat and maintains the corrected oxygen cycle. A stop rule preserves a response to new failure rather than claiming certainty about long-term establishment. The final decision therefore integrates the campaign’s biological mechanisms with their limits: success means a justified next step whose consequences can still be observed and acted upon.

**Mechanism links:** Experimental evidence, Inheritance and variation, Population change, Species interactions, Matter conservation, Energy coupling, Selective exchange, Regulation and feedback, Information flow, Structure and function are the specific broader principles used in the explanation above.

**Misconception:** The noon-only plan ignores the dawn failure and exceeds the permit.

**Wrong-path feedback:**

- The noon-only plan ignores the dawn failure and exceeds the permit.
- Plants alone and unprepared soil both failed relevant contained comparisons.
- Untested organisms and no pause rule violate the evidence and movement limits.
- Retry: keep the visible evidence, clear only the committed response and reopen this board; no later stop unlocks until a correct submission. For matching/order errors, highlight the first mismatched biological relationship with the specific feedback above; for numerical errors, display the stated formula and substituted units after grading.

**State/output:** Sign the living manifest is recorded with its evidence on the Field Planning Room log; The corrected pilot is approved and the first covered sample cart reaches the waiting ship.

**Unlock:** M15-B4 and mission outcome.

**Retrieval:** M13 Stop 50 (Check room for growth); M13 Stop 51 (Separate site constraints); M13 Stop 52 (Prepare before planting)

**Later payoff:** Mission 15 and the final release constraints retain this result and its limits.

**Consistency bundle:** ledger JSON Stop 60 stores the visible source values, complete payload, key, tolerance, answer-text values, feedback and later references as one record; any edit rebuilds all outputs together.

## I. Mission outcome

**Mission decision:** Authorize only the corrected monitored pilot, with a pause and return path. The corrected night test stays above the oxygen limit. The island keeps its reserve. The island keeps a reserve while the mainland pilot begins.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The corrected pilot is approved and the first covered sample cart reaches the waiting ship. Sampling and care consume the shown supplies.

**Automatic bar change:** Release Evidence +8 | Receiving Habitat +8 | Care Supplies +4 | Island Health +8

**Recovery Point line template:** RP = clamp(4,12,11 + time_modifier − incorrect_submissions); AWARDED {RP}.

**Allocation prompt:** One point raises one unlocked bar by one percentage point; bank unused points up to 30.

**Canonical QA example:** Minimum 4 RP; allocate [0, 0, 2, 0] in Release Evidence / Receiving Habitat / Care Supplies / Island Health order; resulting bars [100, 100, 100, 100]; bank 2.

**Failure check:** A 0% bar displays its named failure and restores the mission-start snapshot before reward.

**Lock result:** After allocation, all bars at 100 plus screened-stock, partner, prepared-site, corrected-cycle and stop-rule flags unlock the loading gate and final boarding; all bars then lock at 100.

## K. Quick concept review

- Retrieve family diversity, nutrient preparation, partner screening and full-cycle oxygen evidence.
- Authorize only what the observations and permit support.
- When a conclusion will change handling, use the relevant matched comparison and keep its limits in the log.
- **Mission takeaway:** Authorize only the corrected monitored pilot, with a pause and return path.

---

# 8. Implementation boundary and resolved handoff

This new bible is the canonical content source. No live implementation was modified. Importer/schema and world conversion must preserve the authored source blocks, named people, IDs, exact stopKind placements, units, explicit grading data, route locks, timer pauses, recovery order and visible ship/loading-gate ending. Keys in kernel/ledger sections are author-only and must never be rendered as pre-answer evidence. The companion audit lists every supplied gate requirement and distinguishes static evidence from missing project/runtime checks.
