**FIRST PERSON LEARNING**

**CARRYING CAPACITY**

AP Environmental Science Campaign Implementation Bible

**15 missions | 60 graded stops | Vellan Island | Implementation-ready**

**REVISION 2.0 - MARS-FORMAT MISSION CHAPTERS AND CANONICAL ACTION PAYLOADS**

## AP Environmental Science Campaign Implementation Bible

**Theme:** `carrying`  
**Role:** Island Resources Officer  
**World:** Vellan Island  
**Length:** 15 missions, called Days; four graded stops per day  
**Delivery:** The Second-Ferry Plan, assembled on the board in the Common Office  
**Authority sources:** Campaign Design and Implementation Master Brief v2.2.1; canonical question-type guide; supplied Vellan Island place file; supplied AP Environmental Science cheat sheet.

This is a buildable content specification. Field names in interaction blocks follow the supplied canonical contracts; the repository importer remains the final authority if its exact spelling differs. `STACK` is not used. DERIVE is not used: APES reasoning here is better expressed through measurement, data interpretation, causal testing, quantitative calculation, and constrained policy choice.

---

## 1. One-page implementation brief

The Vellan Island council must decide in fifteen days whether a second ferry can operate without pushing water, fisheries, energy, waste, habitat, and public health beyond recoverable limits. The player closes linked environmental ledgers, tests causal claims, and converts evidence into enforceable conditions. Wrong answers teach and retry without branching away from the evidence sequence. The environmental science is the means of resolving every major reversal.

### Non-negotiable engine rules

- Exactly one canonical interaction format per stop; suspended `STACK` is not used.
- Four graded stops per mission, globally numbered 1-60.
- Decision formats belong at people, calculation formats at boards or benches, and operated formats at the fixture controlled.
- CHOICE uses four distinct items and a specific rebuttal for each wrong item.
- PROBE supplies `reading` and station-specific `expected` values at every station.
- VERIFY locks operation until a numerical prediction is committed and visibly follows CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET.
- CONTROL states the changed variable, fixed variables, measurement timing, and restore-and-remeasure requirement.
- DEGENERACY names both controls and requires a numerical pair before the plan unlocks.
- Every numerical prompt exposes inputs, constants, units, equation, requested answer unit, response type, truth, and tolerance.

## 2. Campaign promise, clock, and player experience

### Opening sequence - exact player copy

Vellan Island must decide whether to add a second ferry before the council votes in fifteen days. More crossings could keep the school open, but every visitor also uses scarce water, power, food, and waste space. If the plan exceeds the island's limits, wells turn salty, the reef fails, and families must leave. Island Resources Officer Mara Voss hands you the evidence ledger and says, “Count what the island can replace.” A high nitrate result from the school tap has just arrived.

### Four campaign metrics and victory

| Bar | Category | Start | Meaning | Zero consequence | Lock |
|---|---|---:|---|---|---|
| Plan Evidence | Primary readiness | 40% | Independent evidence supporting enforceable ferry conditions | Council rejects the plan as unsupported | 100% after Day 14 population forecast |
| Freshwater Security | Secondary requirement | 40% | Safe water quantity and quality under the proposed load | Emergency water rationing; restore day start | 100% after Day 15 condition check |
| Operating Reserve | Operational reserve | 40% | Energy, staff, storage, and money left after essential services | Ferry preparations stop; restore day start | 100% after Day 12 energy plan |
| Island Trust | System integrity | 40% | Public confidence that evidence and burdens are being handled fairly | Council suspends the process; restore day start | 100% after Day 15 public conditions |

All bars are bounded 0-100%. Victory requires 100/100/100/100, groundwater withdrawal no greater than recharge, fish catch no greater than sustainable yield, nitrate at every public tap at or below the campaign limit of 10.0 mg/L as nitrate-N, and an enforceable conditional ferry plan.

**Recovery economy:** `RP = clamp(4,12,11 + time_modifier - incorrect_submissions)`; time modifier is +1 at/before target, 0 through 125%, and -2 later. One committed error costs one RP; exploration before Commit does not. One RP raises one unlocked bar one point; bank cap 30. Required dialogue, loading, accessibility menus, app backgrounding, and system interruption pause the timer.

### Timer, recovery economy, and canonical metric ledger

The reference path assumes target time, zero errors, 11 RP/day, and the shown allocation after the named automatic event.

| Day | Automatic event and delta | RP allocation | QA bars after allocation (Evidence/Water/Reserve/Trust) |
|---:|---|---|---|
|1|Dependency ledger accepted: Evidence +5|Evidence 11|56/40/40/40|
|2|Recharge estimate accepted: Water +5|Evidence 11|67/45/40/40|
|3|Ecological limits mapped: Evidence +5|Evidence 11|83/45/40/40|
|4|Aquifer warning posted: Water +5|Evidence 2, Water 9|85/59/40/40|
|5|Fishery ceiling adopted: Evidence +5|Water 11|90/70/40/40|
|6|Enforcement hearing opened: Trust +5|Water 11|90/81/40/45|
|7|Hidden loss stopped: Reserve +5|Water 9, Reserve 2|90/90/47/45|
|8|School tap protected: Water +5|Reserve 11|90/95/58/45|
|9|Waste controls posted: Trust +5|Reserve 11|90/95/69/50|
|10|Reef evidence accepted: Evidence +5|Reserve 11|95/95/80/50|
|11|Energy ledger closed: Reserve +5|Reserve 10, Trust 1|95/95/95/51|
|12|Firm power plan contracted: Reserve +5 and lock|Trust 11|95/95/100/62|
|13|Biosecurity rule published: Trust +5|Trust 11|95/95/100/78|
|14|Forecast accepted: Evidence +5 and lock|Trust 11|100/95/100/89|
|15|Conditions enacted: Water +5 and lock|Trust 11 and lock|100/100/100/100|

## 3. World and location plan

Vellan is implemented as a walkable systems diagram. Water and contaminants move from the Common and Tip through Waterworks to public taps and the reef; people and goods enter at the Harbour and Ferry Berth; energy links the Turbine Yard to every protected service; the Chapel council room receives the final enforceable plan.

| ID | Place | Environmental/story function | Signature fixtures |
|---|---|---|---|
| HARB | Harbour Office | Landings, fishing effort, arrivals, compliance | landings-book, fee-desk |
| WATER | Waterworks | Recharge, aquifer head, pipe balance, quality | rain-bench, store-gauges, sampler |
| COMMON | Common Office | Farming, land use, population, delivery board | common-map, nitrogen-bench, delivery-board |
| REEF | Reef Station | Nursery survival, water chemistry, stress tests | transect-bench, flow-tank, water-rack |
| TIP | Tip and Sorting Yard | Waste, leachate, methane, pollution | weighbridge, leachate-bench, gas-rack |
| SCHOOL | Island School | Exposure, demographics, public protection | register-desk, school-tap |
| POWER | Turbine Yard | Demand, capacity factor, firm supply | meter-board, turbine-plate, gearbox-crate |
| BERTH | Ferry Berth | Cargo pathways and biosecurity | berth-standpipe, quarantine-rack |
| CHAPEL | Chapel Council Room | Final rule and vote | council-table |

### Areas of study and complete fixture declaration

Every `Area:` value below is the exact name of a place marked `yes`. A stop may still be asked at a fixture in a different place.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Harbour Office | no | `landings-book` | board | Salt-curled pages list each boat, crew-day, catch mass, and the blank lines no one wants to explain. |
| Harbour Office | no | `fee-desk` | bench | Permit stamps, fee slips, and Tomas's brass tally weight sit on a counter polished by wet sleeves. |
| Harbour Office | no | `tide-board` | board | Tide times, berth arrivals, and a week's weather marks run beneath a strip of red pencil. |
| Waterworks | yes | `rain-bench` | bench | Rain cards, catchment sheets, and a ruler stained at the dry-year line cover the calculation surface. |
| Waterworks | yes | `store-gauges` | board | Aquifer head, tank volume, chloride, and nitrate needles share one panel under Nkemdi's dated marks. |
| Waterworks | yes | `sampler` | rack | Sealed bottles, duplicate labels, and the independent chain-of-custody case wait above the sampling tap. |
| Waterworks | yes | `load-board` | board | Every protected circuit is listed beside its kilowatts, reserve priority, and last tested date. |
| Waterworks | yes | `pipe-balance` | bench | A brass pipe model carries movable demand tags from the spring to every island tap. |
| Common Office | yes | `common-map` | board | Field boundaries, habitat strips, homes, and water routes crowd a map repaired with old survey tape. |
| Common Office | yes | `soil-bench` | bench | Soil cores, recovery cards, and a tray of roots sit under a lamp the farmers leave on late. |
| Common Office | yes | `nitrogen-bench` | bench | Fertilizer sacks, runoff jars, and Iona's application ledger share a scarred worktop. |
| Common Office | yes | `delivery-board` | board | Water, food, power, waste, and visitor conditions converge here in columns awaiting the council seal. |
| Reef Station | yes | `transect-bench` | bench | Quadrat sheets, survivorship plots, shell fragments, and nursery flags dry beside the field microscope. |
| Reef Station | yes | `flow-tank` | vessel | A clear channel with heat, nutrient, and rinse controls circulates seawater past marked test tiles. |
| Reef Station | yes | `water-rack` | rack | Reef bottles, calibration standards, and quarantine rinse cards stand in date order behind glass. |
| Tip and Sorting Yard | yes | `weighbridge` | vessel | The deck scale faces bins painted for organics, metals, glass, hazardous waste, and everything mis-sorted. |
| Tip and Sorting Yard | yes | `leachate-bench` | bench | Dark sample jars, liner sections, and arrows from rain to ditch cover the yard's wash-down table. |
| Tip and Sorting Yard | yes | `gas-rack` | rack | Methane meters, sealed collection bags, and leak tags hang beside the collector manifold. |
| Tip and Sorting Yard | yes | `windrow-panel` | board | Temperature, moisture, turning dates, and oxygen marks trace each compost row from waste to soil. |
| Tip and Sorting Yard | yes | `tip-lab-bench` | bench | Pollutant cards, alarm logs, fuel samples, and a hood-scorched notebook occupy the small yard laboratory. |
| Island School | no | `register-desk` | bench | Class rolls, household counts, visitor weeks, and age bands fill a desk built for smaller hands. |
| Island School | no | `school-tap` | vessel | The garden and kitchen lines meet at a labelled tap with a bottle cradle and child-height warning mark. |
| Island School | no | `health-board` | board | Dose limits, action levels, and the nurse's latest notices face the queue outside the dining room. |
| Turbine Yard | yes | `meter-board` | board | Live demand, peak load, and reserve margin glow above switches tagged for every protected service. |
| Turbine Yard | yes | `turbine-plate` | board | Rated output, commissioning date, and the manufacturer's wind curve are riveted to the tower base. |
| Turbine Yard | yes | `gearbox-crate` | rack | A strapped replacement gearbox bears shipping papers, fitting notes, and one completion date written in pencil. |
| Ferry Berth | no | `berth-standpipe` | vessel | A salt-streaked wash line, flow meter, and shutoff lever stand where arriving decks are rinsed. |
| Ferry Berth | no | `quarantine-rack` | rack | Cargo tags, inspection trays, boot brushes, and sealed specimen bags wait before the island gate. |
| Ferry Berth | no | `cargo-table` | bench | Manifests lie beneath lamps bright enough to show seeds, soil, insects, and missing declarations. |
| Chapel Council Room | yes | `council-table` | bench | The island ledgers meet on one long table beneath a gavel, a tide clock, and nine empty signature lines. |
| Chapel Council Room | yes | `condition-board` | board | Proposed caps, triggers, owners, and responses remain visible until each condition can be enforced. |
| Chapel Council Room | yes | `vote-rail` | rack | Sealed evidence folders and the final recommendation wait behind the councillors' chairs. |

### Location escalation

Days 1-4 use one local place each. Days 5-10 use exactly two places, with evidence opening the second. Days 11-15 use exactly three places so the island becomes a walkable systems diagram. No sightseeing warm-up is authored; movement begins by checking a real warning in Day 1.

---


## 4. Character bible

| Name | Pronouns | Working role | Wants | Blind spot and arc | Verbal habit |
|---|---|---|---|---|---|
| Mara Voss | she/her | Island Resources Officer; mission authority | A defensible vote in fifteen days | Initially treats complete ledgers as sufficient; learns that shared measurements need independent checks | “What can the island replace?” |
| Tomas Reed | he/him | Harbour and fishery lead | A second ferry and stable fishing income | Treats landings as stock abundance; accepts effort limits after catch-per-effort falls | “What came over the rail?” |
| Nkemdi Okafor | she/her | Waterworks technician | Protect the aquifer and school supply | Distrusts growth before distinguishing preventable loss from unavoidable demand | “What changed upstream?” |
| Iona Vale | she/her | Common agronomy lead | Keep farms productive and affordable | Favors familiar fertilizer; adopts IPM and nutrient budgets when runoff evidence connects fields to reef | “What stays fixed?” |
| Elias Shaw | he/him | Turbine and diesel mechanic | Firm power through winter | Judges sources by nameplate output; accepts capacity factor, storage, and pollution costs | “What runs at dusk?” |
| Mei Chen | she/her | Tip and environmental-health lead | Stop leakage without bankrupting services | Focuses on visible waste; follows nitrogen, toxics, and methane through unseen pathways | “Where does it go next?” |
| Rafi Noor | he/him | Reef ecologist | Protect nursery habitat and long records | Initially assumes warming explains every reef decline; accepts nutrient and fishing interactions | “Which pattern survives?” |
| Lena Costa | she/her | School nurse and population recorder | Keep children safe and the school open | Treats head count as demand; learns age structure and visitor-days matter | “Who receives the dose?” |
| Ada Pell | she/her | Council chair | Conditions residents can understand and enforce | Wants a simple yes/no; accepts a conditional rule with triggers | “Can we write that as a rule?” |

## 5. Character direction and dialogue rules

- Introduce competence before biography; show each character working under pressure.
- Characters may be wrong about explanations, but not casually wrong about facts in their specialty.
- Wrong-answer dialogue names the mechanism and invites a retry; it never ridicules the player.
- Keep essential dialogue in Continue-controlled bubbles and copy it to the mission log.
- Use equipment panels and persistent labels for evidence; sound and color never carry essential information alone.
- Activate travel only after evidence and dialogue name the next destination.

### Non-cinematic beat presentation contract

Use normal playable view, `nearby_character_bubble` for local speakers, `radio_bubble` for remote speakers, `equipment_panel_update` for results, and `system_banner` only for one short conclusion or destination. Pause the timer during required bubbles and restore control after Continue.

## 6. Environmental-science spine and recurring concepts

1. **Closed-system budgets:** cycles and watersheds -> resource balances -> coupled final plan.
2. **Energy flow:** GPP/NPP and 10% rule -> food webs/fisheries -> land and diet choices.
3. **Population limits:** exponential/logistic growth -> carrying capacity/sustainable yield -> human forecast.
4. **Biodiversity and resilience:** niches/succession/island biogeography -> invasives and habitat -> biosecurity.
5. **Water quantity:** precipitation/runoff/infiltration -> recharge/withdrawal -> ferry ceiling.
6. **Soil and land use:** horizons/texture/weathering -> nutrients/erosion -> agricultural controls.
7. **Pollution pathways:** source/transport/fate -> dose and biomagnification -> prevention and treatment.
8. **Experimental causality:** controls/baselines/reversal -> reef and leak tests -> defensible conditions.
9. **Energy trade-offs:** fuel chemistry, EROI, capacity factor -> firm supply -> emissions plan.
10. **Atmosphere and climate:** layers/circulation/pollutants -> exposure/global forcing -> mitigation/adaptation.
11. **Policy instruments:** commons/regulation/property rights/fees -> enforcement -> conditional permit.
12. **Uncertainty and evidence:** independent records/holdouts/stress tests -> credible forecast -> final vote.

### Concept encounter matrix

| Keystone | Introduce/practice | Delayed retrieve | Combine/transfer payoff |
|---|---|---|---|
| Closed budgets | D1-D2 | D7 | D11, D15 |
| Energy flow | D3 | D5 | D10, D15 |
| Population limits | D5 | D10 | D14-D15 |
| Biodiversity/resilience | D3 | D10 | D13-D15 |
| Water quantity | D2 | D4 | D8, D15 |
| Soil/land use | D4, D6 | D9 | D10, D15 |
| Pollution pathways | D7 | D9 | D10-D12, D15 |
| Experimental causality | D3-D4 | D8 | D10, D12 |
| Energy trade-offs | D11 | D12 | D15 |
| Atmosphere/climate | D3, D11 | D12 | D15 |
| Policy instruments | D5-D6 | D9 | D13-D15 |
| Uncertainty/evidence | D1-D2 | D8 | D14-D15 |

## 7. Clue ledger

| Day | Science / mystery / stakes movement | Planted clue and later meaning |
|---:|---|---|
|1|Map island dependencies; the ferry appears to be a water problem; the vote clock starts.|Electronic landings omit rejected catch; “complete” digital records share blind spots (D5).|
|2|Estimate recharge; apparent margin supports growth; drought sensitivity narrows it.|Wind gauge under-read and one wet-year average; uncertainty matters at D4/D15.|
|3|Map cycles and ecological limits; fertilizer seems necessary; reef nitrate is quietly rising.|Nitrogen input exceeds crop removal; surplus reaches groundwater and reef (D8/D10).|
|4|**Twist 1:** salinity is not caused mainly by visitors; pumping plus low recharge moves seawater inland.|Chloride rises before visitor peak; aquifer flow, not tap demand alone, drives salt intrusion.|
|5|Catch-per-effort reveals stock decline despite steady landings; income and ecology collide.|More boat-hours conceal fewer fish; landings were a misleading success metric.|
|6|Rules are tested; enforcement, not a single quota number, becomes the problem.|Uninspected ferry and common access mean policy needs monitoring and consequences (D13).|
|7|Leachate and pipe loss connect waste to water; “not enough water” includes preventable loss.|Tip sits up-catchment and methane vents; hidden pathways couple D8/D12.|
|8|**Twist 2:** the school nitrate spike comes from fertilizer timing and a local main, not ferry visitors.|Children receive higher dose; exposure depends on concentration, intake, and body size.|
|9|Waste and farm controls cut sources; costs strain reserve.|Uncapped cell and fertilizer surplus share one nitrogen budget; prevention beats downstream cleanup.|
|10|Controlled reef evidence shows heat and nutrients interact; no single-cause story survives.|Warm months coincide with low oxygen; factorial result pays off D3/D9 clues.|
|11|Energy ledger counts real output and pollutants; renewables need firming.|Turbine plate says 250 kW but annual output implies low capacity factor (D12).|
|12|Apparent victory: leak repair plus storage can firm power and capture landfill methane.|Gearbox delay means the “green” plan cannot be ready before the vote without staged backup.|
|13|Biosecurity connects the uninspected berth to island vulnerability.|A generalist invasive arrives with supplies; small, remote island loses specialists fastest.|
|14|Forecast includes residents, ages, visitors, and momentum; plan appears ready.|Two children leaving signals demographic decline, while visitor-days drive seasonal load.| 
|15|**Twist 3:** climate stress test erases the thin water margin; only conditional service passes.|Drought, heat, sea-level rise, and outage occur together; final rule uses triggers, mitigation, adaptation.

## 8. Mission content contract

Every mission below includes exact briefing copy, a mission-card glossary/primer/equation block, story summary, five-beat implementation script, location plan, character direction, explicit concepts, four fully specified stops, an outcome, a metric screen, and a quick review. Glossary entries use compact `Term: definition` lines. Equation entries omit `Also called` and `Concept`. No later mission is summarized or delegated to an appendix.

# Mission 1 - What the Island Depends On

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 15 DAYS TO THE FERRY VOTE  
**Card title:** Nothing Leaves the Ledger  
**Go now:** Go to the Harbour Office and meet Tomas Reed, harbour and fishery lead, at the landings book.  
**Card body:** The school-tap warning arrived as the ferry debate began. An island depends on linked stores because water, nutrients, energy, goods, and waste move but do not vanish. At the Harbour Office, trace what enters, cycles, and leaves Vellan. By the end of the mission, decide which island dependencies the ferry study must count.  
**Objective:** Build the dependency ledger that defines the investigation.

### Worth knowing first - exact player copy

#### Glossary terms
System: a set of connected parts studied together.  
Reservoir: a place where matter is stored.  
Flux: an amount moving between stores per unit time.  
Watershed: land whose water drains to one shared water body.

#### Primer concepts
- Matter cycles through stores; energy flows and is mostly lost as heat.
- A boundary decides which inputs and outputs belong in a budget.
- Agreement among records is weak evidence if they share one missing source.

#### Equations first needed today
**Equation:** Change in storage = inputs - outputs
**What it is for:** Closing any island resource ledger.
**Symbols:** inputs and outputs are quantities measured over the same period.
**Why this campaign needs it:** The ferry can pass only if each essential store remains stable.

**Failure consequence:** An omitted dependency could make a safe-looking plan fail after approval.
**Later travel:** None; all four stops remain in the Harbour Office.

## Main story happening - designer summary

Tomas is reconciling paper and electronic landings while Mara blocks an early ferry endorsement. The player defines boundaries, traces cycles, distinguishes energy flow, and diagnoses shared omissions. **Science:** systems and biogeochemical cycles become operational ledgers. **Mystery:** the digital record may not be independent. **Stakes:** a missing flow corrupts every later ceiling. **One location:** Harbour Office, `landings-book` -> `fee-desk`; both records are uniquely available there. Arrival: Tomas says, “The screen totals what was sold; the book also records what came back over the rail.” After Stop 2, a five-ledger wall diagram lights. After Stop 3, “REJECTED CATCH” appears. Final beat: Mara says, “Now we know what every later number must connect to.”

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Harbour Office | `landings-book` | automatic**

**World state:** The draw the boundary fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 1: DRAW THE BOUNDARY OPEN

**Dialogue bubbles -** Tomas Reed: "The screen totals what was sold; the book also records what came back over the rail."

**Unlocks/waypoint:** Unlock Stop 1 at `landings-book` in Harbour Office.

**Beat 2 - After Stop 1 | `landings-book` | automatic**

**World state:** After Stop 1: Keep the new evidence visible and.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 1 result to settle match the cycles."

**Unlocks/waypoint:** Unlock Stop 2 at `landings-book` in Harbour Office.

**Beat 3 - After Stop 2 | `fee-desk` | automatic**

**World state:** After Stop 2: a five-ledger wall diagram lights.

**Panel/HUD text:** STOP 2 RECORDED - STOP 3 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 2 result to settle separate matter from energy."

**Unlocks/waypoint:** Unlock Stop 3 at `fee-desk` in Harbour Office.

**Beat 4 - After Stop 3 | `landings-book` | automatic**

**World state:** The separate matter from energy result remains visible while the find the shared omission fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Tomas Reed: "REJECTED CATCH"

**Unlocks/waypoint:** Unlock Stop 4 at `landings-book` in Harbour Office.

**Beat 5 - At mission end | `landings-book` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "Now we know what every later number must connect to."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Tomas is reconciling paper and electronic landings while Mara blocks an early ferry endorsement. The player defines boundaries, traces cycles, distinguishes energy flow, and diagnoses shared omissions. **Science:** systems and biogeochemical cycles become operational ledgers. **Mystery:** the digital record may not be independent. **Stakes:** a missing flow corrupts every later ceiling. **One location:** Harbour Office, `landings-book` -> `fee-desk`; both records are uniquely available there. Arrival: Tomas says, “The screen totals what was sold; the book also records what came back over the rail.” After Stop 2, a five-ledger wall diagram lights. After Stop 3, “REJECTED CATCH” appears. Final beat: Mara says, “Now we know what every later number must connect to.”

## Characters and dramatic beat

Tomas is reconciling paper and electronic landings while Mara blocks an early ferry endorsement. The player defines boundaries, traces cycles, distinguishes energy flow, and diagnoses shared omissions. **Science:** systems and biogeochemical cycles become operational ledgers. **Mystery:** the digital record may not be independent. **Stakes:** a missing flow corrupts every later ceiling. **One location:** Harbour Office, `landings-book` -> `fee-desk`; both records are uniquely available there. Arrival: Tomas says, “The screen totals what was sold; the book also records what came back over the rail.” After Stop 2, a five-ledger wall diagram lights. After Stop 3, “REJECTED CATCH” appears. Final beat: Mara says, “Now we know what every later number must connect to.”
## Key concepts, explained here

Carbon cycles through photosynthesis, respiration, decomposition, and combustion; nitrogen needs bacterial fixation and later nitrification and denitrification; phosphorus has no major gas phase and is limited by weathering; water moves by evaporation, precipitation, runoff, infiltration, and groundwater flow. Energy moves one way through food webs, with large heat losses.

## Stop 1 - Draw the boundary

**Format/placement:** CHOICE, asked by Tomas Reed beside `landings-book`.

**Metadata:** Concept: system boundary; Keystone: closed budgets; Area: Chapel Council Room; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Tomas Reed, at the landings book in Harbour Office.

**Stop reason - exact player copy:** The ferry study needs one boundary before anyone can count an input twice.

**Question card story setup - exact player copy:** The electronic ledger counts ferry tickets, fuel, and landed fish but ignores rain, groundwater, sunlight, and waste. Choose the boundary that captures every resource the second sailing can change, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A defensible boundary keeps imported goods from hiding local depletion.

**Question card prompt - exact player copy:** Select the one boundary that captures every resource and receiving system the second ferry can change. Submit one selection.

**Choices:**

1. Ferry accounts only.

2. Council spending only.

3. Whole island, aquifer, coast, reef, and atmosphere exchanges. **(correct)**

4. Resident households only.

**Complete format-specific interaction block:** `choice:{choices:[{id:ferry_accounts,label:"Ferry accounts only"},{id:council_spending,label:"Council spending only"},{id:whole_system,label:"Whole island, aquifer, coast, reef, and atmosphere exchanges"},{id:households,label:"Resident households only"}],answer:whole_system,rebuttals:{ferry_accounts:"Tickets and cargo omit local water, habitat, energy, and waste stores.",council_spending:"Money can move without showing whether matter or energy is depleted.",households:"This excludes visitors, businesses, the fishery, receiving waters, and the reef."}}`.

**Correct result:** C. Count the whole island, aquifer, coast, reef, atmosphere exchanges, imports, and exports.

**Answer text:** The completed check shows c. Count the whole island, aquifer, coast, reef, atmosphere exchanges, imports, and exports.

**Why:** System boundaries must include every materially affected store; retry after the omitted-store labels flash.

**Wrong-path feedback:** (1) **Ferry accounts only:** Tickets and cargo omit local water, habitat, energy, and waste stores. (2) **Council spending only:** Money flows do not reveal whether matter or usable energy is depleted. (4) **Resident households only:** This excludes visitors, businesses, the fishery, receiving waters, and the reef.

**State/output:** Island boundary illuminates; unlocks Stop 1.2.

## Stop 2 - Match the cycles

**Format/placement:** PROTOCOL, at `landings-book`.

**Metadata:** Concept: carbon/nitrogen/phosphorus/water cycles; Keystone: closed budgets; Area: Waterworks; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the landings book, in Harbour Office.

**Stop reason - exact player copy:** Each ledger needs the process that moves its material.

**Question card story setup - exact player copy:** With the boundary fixed, four unlabeled flow cards remain in the paper book. Match each pathway to the cycle it represents so later investigators follow matter rather than labels, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** The limiting or transforming step tells the team where a ferry-driven increase can accumulate.

**Question card prompt - exact player copy:** Draw one line from each pathway to its cycle, then submit the complete mapping.

**Complete format-specific interaction block:** `scenarios={photosynthesis-respiration-combustion; N2-fixation-nitrification-denitrification; rock-weathering-biota-sediment; evaporation-precipitation-runoff}; choices={carbon,nitrogen,phosphorus,water}; mapping={1:carbon,2:nitrogen,3:phosphorus,4:water}`.

**Correct result:** Carbon, nitrogen, phosphorus, water in that order; nitrogen fixation and phosphorus weathering are important limiting steps.

**Answer text:** The completed check shows carbon, nitrogen, phosphorus, water in that order; nitrogen fixation and phosphorus weathering are important limiting steps.

**Why:** Matter changes form but remains in its cycle; feedback identifies the first mismatched process.

**Wrong-path feedback:** A carbon match that omits combustion, a nitrogen match that omits denitrification, or a phosphorus match that adds an atmospheric gas phase assigns a pathway to the wrong cycle.

**State/output:** Four cycle routes light; unlocks Stop 1.3.

## Stop 3 - Separate matter from energy

**Format/placement:** BELT, at `fee-desk`.

**Metadata:** Concept: energy flow versus matter cycling; Keystone: energy flow; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the fee desk, in Harbour Office.

**Stop reason - exact player copy:** The plan must not promise to recycle energy as if it were nitrogen.

**Question card story setup - exact player copy:** Because the four matter ledgers now close, the remaining cards can expose a dangerous accounting mistake. Sort each item as matter that cycles or energy that flows and disperses as heat.

**Question card story-science connection - exact player copy:** Food and fuel require continual energy input even when their atoms remain on the island.

**Question card prompt - exact player copy:** Sort sunlight, heat, carbon dioxide, nitrate, phosphate, and water. Submit the binary classification before the belt reaches the end.

**Complete format-specific interaction block:** `belt.categories={cycles,flows}; items={sunlight:flows,heat:flows,CO2:cycles,nitrate:cycles,phosphate:cycles,water:cycles}; speed=moderate; misses_allowed=2`.

**Correct result:** Sunlight and heat flow; carbon dioxide, nitrate, phosphate, and water cycle.

**Answer text:** The completed check shows sunlight and heat flow; carbon dioxide, nitrate, phosphate, and water cycle.

**Why:** Energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.

**Wrong-path feedback:** Placing sunlight or heat in `cycles` ignores energy degradation; placing carbon dioxide, nitrate, phosphate, or water in `flows` ignores conservation of matter.

**State/output:** Energy arrow exits map; matter loops persist; rejected-catch column unlocks.

## Stop 4 - Find the shared omission

**Format/placement:** TRACE, at `landings-book`.

**Metadata:** Concept: dependent evidence; Keystone: uncertainty/evidence; Area: Chapel Council Room; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the landings book, in Harbour Office.

**Stop reason - exact player copy:** Two matching totals cannot certify the ferry plan until their sources are independent.

**Question card story setup - exact player copy:** The cycle map shows where matter should go, yet the sales screen and tax total agree exactly. Trace their upstream records and test whether agreement proves that all catch was counted.

**Question card story-science connection - exact player copy:** Shared dependence can make two records repeat the same omission.

**Question card prompt - exact player copy:** Open all four channels, identify the shared upstream record, and submit one conclusion about independence.

**Complete format-specific interaction block:** `trace:{channels:[{id:"sales_screen",label:"sales screen",dependency:"electronic sale ledger",target_dependent:true},{id:"tax_total",label:"tax total",dependency:"electronic sale ledger",target_dependent:true},{id:"paper_landed",label:"paper landing book",dependency:"paper book",independent:true},{id:"returned_catch",label:"returned-catch record",dependency:"paper book",independent:true}],shared_upstream:"electronic sale ledger",correct_conclusion:"sales and tax agree but are not independent",answerText:"Sales and tax totals share one source; the two paper channels expose catch the shared electronic ledger omitted."}`

**Correct result:** Sales and tax share the electronic sale record; only the paper book preserves rejected catch.

**Answer text:** The completed check shows sales and tax share the electronic sale record; only the paper book preserves rejected catch.

**Why:** Repeated outputs from one source are one line of evidence, not two; retry traces dependencies.

**Wrong-path feedback:** Treating sales and tax totals as independent double-counts their shared electronic-sale source; ignoring either paper channel discards the independent evidence.

**State/output:** “Rejected catch missing” tag persists; Day 5 payoff; delivery piece 1 posts.

## Mission outcome

Mission decision: Count water, food, energy, materials, waste, people. And habitat in one linked island system. Matching records do not count twice when they share a source. The council opens the full resource review. Tomorrow, the first closed budget is freshwater.

### Post-mission metric screen - exact player copy

**Target:** 10:00. **Story event:** Dependency ledger accepted. **Automatic:** Plan Evidence +5. **Canonical QA:** 56/40/40/40, bank 0 after 11 RP to Evidence. **Lock/failure:** no lock; standard zero check.  

## Quick concept review
- Matter cycles, while usable energy flows and becomes heat.
- A system boundary includes every affected store and pathway.
- **Mission takeaway:** Independent evidence must not share the same hidden source.

---

# Mission 2 - The Groundwater Recharge Estimate

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 14 DAYS TO THE FERRY VOTE  
**Card title:** Water That Comes Back  
**Go now:** Go to Waterworks and meet Nkemdi Okafor, waterworks technician, at the rain bench.  
**Card body:** Yesterday defined the island system; today its freshwater ledger must close. Rain becomes usable groundwater only after losses to runoff, evaporation, and plants. At Waterworks, calculate recharge and test how dry years change it. By the end of the mission, decide the annual withdrawal ceiling the ferry study may use.  
**Objective:** Set a reproducible groundwater recharge estimate.

### Worth knowing first - exact player copy

#### Glossary terms
Infiltration: water entering soil.  
Recharge: water reaching and replenishing an aquifer.  
Aquifer: underground material that stores and transmits groundwater.  
Uncertainty: a measured range within which the defensible value may lie.

#### Primer concepts
- A watershed routes precipitation toward runoff, storage, plants, or groundwater.
- Averages can hide drought years that control safe withdrawal.
- Preserve units through area, depth, and volume calculations.

#### Equations first needed today
**Equation:** Recharge volume = precipitation depth x recharge area x infiltration fraction
**What it is for:** Estimating annual water returned to the aquifer.
**Symbols:** depth in metres, area in square metres, fraction as a decimal, volume in cubic metres.
**Why this campaign needs it:** Withdrawals for residents and ferries cannot exceed replenishment.

## Main story happening - designer summary

Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind. **Science:** watershed compartments, infiltration, recharge, and uncertainty. **Mystery:** the apparent margin depends on which year represents the future. **Stakes:** over-pumping brings salt inland. **One location:** Waterworks, `rain-bench` -> `store-gauges`. Arrival bubble: “Use the hand record; the roof gauge loses rain in crosswind.” Stop 2 plots recharge. Stop 3 reveals the dry-year corridor. Stop 4 writes the withdrawal ceiling and delivery piece 2.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `rain-bench` | automatic**

**World state:** Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind.

**Panel/HUD text:** MISSION 2: ROUTE ONE YEAR OF RAIN OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Start with route one year of rain. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `rain-bench` in Waterworks.

**Beat 2 - After Stop 5 | `rain-bench` | automatic**

**World state:** After Stop 1: Keep the new evidence visible and.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Use the Stop 5 result to settle convert depth to volume."

**Unlocks/waypoint:** Unlock Stop 6 at `rain-bench` in Waterworks.

**Beat 3 - After Stop 6 | `store-gauges` | automatic**

**World state:** After Stop 2: Update the persistent panel and  or the evidence-led waypoint.

**Panel/HUD text:** STOP 6 RECORDED - STOP 7 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Use the Stop 6 result to settle freeze the estimate."

**Unlocks/waypoint:** Unlock Stop 7 at `store-gauges` in Waterworks.

**Beat 4 - After Stop 7 | `store-gauges` | automatic**

**World state:** After Stop 3: Show the combined result and unlock the decision stop.

**Panel/HUD text:** STOP 7 RECORDED - STOP 8 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Use the Stop 7 result to settle set the ceiling."

**Unlocks/waypoint:** Unlock Stop 8 at `store-gauges` in Waterworks.

**Beat 5 - At mission end | `rain-bench` | automatic**

**World state:** Outcome and hook: Apply the committed decision, show its world consequence, and name the next destination; Required bubbles pause until Continue.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Nkemdi Okafor: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind. **Science:** watershed compartments, infiltration, recharge, and uncertainty. **Mystery:** the apparent margin depends on which year represents the future. **Stakes:** over-pumping brings salt inland. **One location:** Waterworks, `rain-bench` -> `store-gauges`. Arrival bubble: “Use the hand record; the roof gauge loses rain in crosswind.” Stop 2 plots recharge. Stop 3 reveals the dry-year corridor. Stop 4 writes the withdrawal ceiling and delivery piece 2.

## Characters and dramatic beat

Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind. **Science:** watershed compartments, infiltration, recharge, and uncertainty. **Mystery:** the apparent margin depends on which year represents the future. **Stakes:** over-pumping brings salt inland. **One location:** Waterworks, `rain-bench` -> `store-gauges`. Arrival bubble: “Use the hand record; the roof gauge loses rain in crosswind.” Stop 2 plots recharge. Stop 3 reveals the dry-year corridor. Stop 4 writes the withdrawal ceiling and delivery piece 2.
## Key concepts, explained here

Precipitation is divided among evapotranspiration, runoff, soil storage, and groundwater recharge. Soil texture and land cover influence infiltration. A safe planning value should survive plausible measurement uncertainty and dry years rather than equal the wet-year mean.

## Stop 5 - Route one year of rain

**Format/placement:** BALANCE, at `rain-bench`.

**Metadata:** Concept: water budget; Keystone: water quantity; Area: Waterworks; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the rain bench, in Waterworks.

**Stop reason - exact player copy:** Recharge cannot be estimated until every millimetre of rain has a destination.

**Question card story setup - exact player copy:** The island ledger now has a water page, but its four destination rows are blank. Close the annual depth balance before converting any part of the rainfall into groundwater, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Recharge is only the fraction left after runoff, plant use, evaporation, and storage change.

**Question card prompt - exact player copy:** Using precipitation 900 mm/yr, evapotranspiration 510 mm/yr, runoff 210 mm/yr, and soil-storage increase 30 mm/yr, select every stream that counts and submit recharge in mm/yr.

**Complete format-specific interaction block:** `balance:{streams:[{id:"precipitation",direction:"in",value:900,unit:"mm/year",counts:true},{id:"evapotranspiration",direction:"out",value:510,unit:"mm/year",counts:true},{id:"runoff",direction:"out",value:210,unit:"mm/year",counts:true},{id:"storage_increase",direction:"out",value:30,unit:"mm/year",counts:true},{id:"ferry_import",direction:"none",value:0,unit:"mm/year",counts:false,reason:"not a hydrologic flux"}],equation:"recharge=P-ET-runoff-storage increase",correct:150,tolerance:1,answerText:"Recharge is 150 mm/year; ferry imports do not count in the water balance."}`

**Correct result:** `900-510-210-30=150 mm/yr` recharge.

**Answer text:** The completed check shows 900-510-210-30=150 mm/yr recharge.

**Why:** The full input must be conserved; feedback displays the unclosed remainder.

**Wrong-path feedback:** Counting ferry imports in the rainfall ledger mixes a zero, unrelated transport stream into the hydrologic balance; omitting storage or recharge leaves rainfall unclosed.

**State/output:** Recharge row reads 150 mm/yr; unlocks Stop 2.2.

## Stop 6 - Convert depth to volume

**Format/placement:** BALLPARK, at `rain-bench`.

**Metadata:** Concept: unit conversion; Keystone: water quantity; Area: Waterworks; Learning role: PRACTICE; Difficulty: L2; Story role: evidence.

**Call - exact player copy:** Go to the rain bench, in Waterworks.

**Stop reason - exact player copy:** The council allocates cubic metres, not millimetres of rain.

**Question card story setup - exact player copy:** With recharge depth established, Nkemdi needs the amount of water entering the usable aquifer area. Convert the depth across the mapped recharge zone without counting paved harbour land, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A correct volume makes household and ferry demand comparable to natural replacement.

**Question card prompt - exact player copy:** Assemble and submit annual recharge volume using 150 mm/yr, 0.001 m/mm, and 1.20 km² of recharge area with 1,000,000 m²/km². Answer in m³/yr.

**Complete format-specific interaction block:** `estimate.labels=[depth,mm_to_m,area,km2_to_m2]; values=[150,0.001,1.20,1000000]; slots=4; formula=product; correct=180000; target=180000; tolerance=0.02`.

**Correct result:** `150 x 0.001 x 1.20 x 1,000,000 = 180,000 m³/yr`.

**Answer text:** The completed check shows 150 x 0.001 x 1.20 x 1,000,000 = 180,000 m³/yr.

**Why:** One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.

**Wrong-path feedback:** Using 150 mm as 150 m or leaving 1.20 km2 unconverted changes the volume by orders of magnitude; paved harbour land is outside the mapped recharge area.

**State/output:** Gauge shows 180,000 m³/yr; unlocks Stop 2.3.

## Stop 7 - Freeze the estimate

**Format/placement:** HOLDOUT, at `store-gauges`.

**Metadata:** Concept: model validation; Keystone: uncertainty/evidence; Area: Chapel Council Room; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The mean-year estimate must survive years it was not fitted to.

**Question card story setup - exact player copy:** The volume calculation fits the first ten years, so the dry years remain hidden. Freeze one planning rule before four unseen years appear and expose whether the mean is safe.

**Question card story-science connection - exact player copy:** A model that fails withheld dry years cannot set a permanent withdrawal ceiling.

**Question card prompt - exact player copy:** Fit either mean recharge, 20th-percentile recharge, or wet-year recharge to years 1-10; click FREEZE; reveal years 11-14; submit the rule that keeps withdrawal below recharge in at least three of four years.

**Complete format-specific interaction block:** `holdout.training={mean:180000,p20:144000,wet:220000}; hidden=[151000,139000,146000,128000]; criteria="withdrawal <= recharge in >=3/4"; correct_rule=p20; frozen_before_reveal=true`.

**Correct result:** Use 144,000 m³/yr; it passes 151k, 146k, and treats 139k/128k as trigger years requiring restrictions.

**Answer text:** The completed check shows use 144,000 m³/yr; it passes 151k, 146k, and treats 139k/128k as trigger years requiring restrictions.

**Why:** Holdout years test generalization; wet or mean rules overfit favorable conditions.

**Wrong-path feedback:** Choosing the wet-year or mean rule overfits favorable years; choosing a rule that fails more than one hidden dry year violates the stated three-of-four criterion.

**State/output:** Dry-year warnings appear; unlocks Stop 2.4.

## Stop 8 - Set the ceiling

**Format/placement:** STRESS, asked by Nkemdi Okafor beside `store-gauges`.

**Metadata:** Concept: uncertainty margin; Keystone: uncertainty/evidence; Area: Chapel Council Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Nkemdi Okafor, at the store gauges in Waterworks.

**Stop reason - exact player copy:** Nkemdi must publish one planning ceiling that survives gauge and climate uncertainty.

**Question card story setup - exact player copy:** Because 144,000 m³/yr survives most held-out years, only measurement bias can still overturn it. Stress the estimate across the hand-gauge range and choose a ceiling the council can defend.

**Question card story-science connection - exact player copy:** Planning below the lower credible recharge protects the aquifer when observations are imperfect.

**Question card prompt - exact player copy:** Move annual rainfall bias from -5% to +5%; observed planning recharge is 144,000 m³/yr. Submit one ceiling from 136,800, 144,000, 151,200, or 180,000 m³/yr that never exceeds corrected recharge.

**Complete format-specific interaction block:** `stress.assumption=rain_bias; range=[-0.05,0.05]; base=144000; candidates=[136800,144000,151200,180000]; correct=136800; rule="ceiling <= minimum credible recharge"`.

**Correct result:** `144,000 x 0.95 = 136,800 m³/yr`; adopt that conservative ceiling.

**Answer text:** The completed check shows 144,000 x 0.95 = 136,800 m³/yr; adopt that conservative ceiling.

**Why:** Negative bias lowers credible recharge; feedback shows which candidates fail at -5%.

**Wrong-path feedback:** A ceiling of 144,000 m3/year or more ignores the -5% rainfall bias; 180,000 uses the unprotected mean rather than the minimum credible recharge.

**State/output:** Ceiling posted; clue for Day 4; delivery piece 2 posts.

## Mission outcome

Mission decision: Use 136,800 cubic metres per year as the planning withdrawal ceiling. It includes runoff, plant use, storage, dry years. And gauge bias. The ferry still appears possible. But chloride has begun rising before the summer visitor peak.

### Post-mission metric screen - exact player copy

**Target:** 12:00. **Story event:** Recharge estimate accepted. **Automatic:** Freshwater Security +5. **Canonical QA:** 67/45/40/40 after 11 RP to Evidence.  

## Quick concept review
- Water entering a watershed must be balanced among all destinations.
- Depth times area gives volume when units are converted.
- **Mission takeaway:** Withheld data tests whether a planning rule generalizes.

---

# Mission 3 - The Ecological Limits

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 13 DAYS TO THE FERRY VOTE  
**Card title:** What Keeps Growing  
**Go now:** Go to the Common Office and meet Iona Vale, common agronomy lead, at the common map.  
**Card body:** The recharge ceiling looks workable, but water alone does not define island capacity. Food webs depend on limited energy, cycling nutrients, habitat, and recovery after disturbance. At the Common Office, map those limits from soil to grazing land. By the end of the mission, decide which ecological limits must constrain ferry growth.  
**Objective:** Add ecological limits to the ferry plan.

### Worth knowing first - exact player copy

#### Glossary terms
NPP: plant energy stored after plants use some energy for respiration.  
Trophic level: a feeding position in a food web.  
Succession: predictable community change after new land or disturbance.  
Niche: the resources and conditions a species uses.

#### Primer concepts
- Only about 10% of energy becomes biomass at the next trophic level.
- Primary succession begins without soil; secondary succession begins with soil.
- Larger, nearer islands usually support more species.

#### Equations first needed today
**Equation:** NPP = GPP - respiration
**What it is for:** Finding plant energy available for growth and consumers.
**Symbols:** NPP and GPP are energy per area per time; respiration is plant energy use.
**Why this campaign needs it:** Grazing and food plans cannot claim energy plants already used.

## Main story happening - designer summary

Iona is defending fertilizer imports while bare patches spread near sheds. **Science:** productivity, trophic transfer, succession, biomes, niches, and island biogeography. **Mystery:** fertilizer raises yield but creates an accumulating surplus. **Stakes:** more food today may damage water and reef tomorrow. **One location:** Common Office, `soil-bench`, `nitrogen-bench`, `common-map`. Stops light energy and nutrient routes; the final control leaves a persistent “surplus nitrogen” flag.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Common Office | `common-map` | automatic**

**World state:** Iona is defending fertilizer imports while bare patches spread near sheds.

**Panel/HUD text:** MISSION 3: COUNT USABLE PLANT ENERGY OPEN

**Dialogue bubbles -** Iona Vale: "Start with count usable plant energy. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `common-map` in Common Office.

**Beat 2 - After Stop 9 | `soil-bench` | automatic**

**World state:** After Stop 1: Keep the new evidence visible and.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Iona Vale: "Use the Stop 9 result to settle read recovery and habitat."

**Unlocks/waypoint:** Unlock Stop 10 at `soil-bench` in the Common Office.

**Beat 3 - After Stop 10 | `common-map` | automatic**

**World state:** After Stop 2: Update the persistent panel and  or the evidence-led waypoint.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Iona Vale: "Use the Stop 10 result to settle classify vulnerability."

**Unlocks/waypoint:** Unlock Stop 11 at `common-map` in Common Office.

**Beat 4 - After Stop 11 | `nitrogen-bench` | automatic**

**World state:** After Stop 3: Show the combined result and unlock the decision stop.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Iona Vale: "Use the Stop 11 result to settle test the fertilizer claim."

**Unlocks/waypoint:** Unlock Stop 12 at `nitrogen-bench` in Common Office.

**Beat 5 - At mission end | `common-map` | automatic**

**World state:** Outcome and hook: Apply the committed decision, show its world consequence, and name the next destination; Required bubbles pause until Continue.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Iona Vale: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Iona is defending fertilizer imports while bare patches spread near sheds. **Science:** productivity, trophic transfer, succession, biomes, niches, and island biogeography. **Mystery:** fertilizer raises yield but creates an accumulating surplus. **Stakes:** more food today may damage water and reef tomorrow. **One location:** Common Office, `soil-bench`, `nitrogen-bench`, `common-map`. Stops light energy and nutrient routes; the final control leaves a persistent “surplus nitrogen” flag.

## Characters and dramatic beat

Iona is defending fertilizer imports while bare patches spread near sheds. **Science:** productivity, trophic transfer, succession, biomes, niches, and island biogeography. **Mystery:** fertilizer raises yield but creates an accumulating surplus. **Stakes:** more food today may damage water and reef tomorrow. **One location:** Common Office, `soil-bench`, `nitrogen-bench`, `common-map`. Stops light energy and nutrient routes; the final control leaves a persistent “surplus nitrogen” flag.
## Key concepts, explained here

GPP is all captured plant energy; NPP is what remains after respiration. About 10% passes upward per trophic step. Climate defines broad biomes and aquatic light/bottom zones; disturbance starts primary or secondary succession. Generalists tolerate many conditions, specialists fewer; small remote islands lose species readily.

## Stop 9 - Count usable plant energy

**Format/placement:** BALLPARK, at `common-map`.

**Metadata:** Concept: GPP/NPP and 10% law; Keystone: energy flow; Area: Turbine Yard; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** Grazing capacity must use energy left after plant respiration.

**Question card story setup - exact player copy:** The water ceiling is now fixed, but the common can still be overstocked by counting all captured sunlight. Calculate usable plant production, then follow its loss to grazing animals, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Energy limits food production even when nutrient atoms keep cycling.

**Question card prompt - exact player copy:** First calculate NPP from GPP 18,000 kJ/m²/yr and plant respiration 8,000 kJ/m²/yr. Then apply 10% transfer and submit herbivore production in kJ/m²/yr.

**Complete format-specific interaction block:** `estimate.values=[18000,-8000,0.10]; formula="(GPP-R)*0.10"; correct=1000; target=1000; tolerance=0.01`.

**Correct result:** NPP is 10,000 kJ/m²/yr; herbivore production is about 1,000 kJ/m²/yr.

**Answer text:** The completed check shows nPP is 10,000 kJ/m²/yr; herbivore production is about 1,000 kJ/m²/yr.

**Why:** Plants use part of GPP, and most remaining energy is lost as heat between levels.

**Wrong-path feedback:** Using GPP directly skips plant respiration, while applying 10% before finding NPP transfers energy the plants already used; both overstate herbivore production.

**State/output:** Grazing energy cap appears; unlocks Stop 3.2.

## Stop 10 - Read recovery and habitat

**Format/placement:** SEQUENCE, at `soil-bench`.

**Metadata:** Concept: succession, biomes, aquatic zones; Keystone: biodiversity/resilience; Area: Reef Station; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the soil bench, in the Common Office.

**Stop reason - exact player copy:** Bare patches cannot be assigned the same recovery time without checking whether soil remains.

**Question card story setup - exact player copy:** With grazing energy capped, Iona points to two damaged plots: exposed rock and a burned field with soil. Order each recovery path and identify which can recover within decades, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Secondary succession is faster because soil, microbes, and seeds remain.

**Question card prompt - exact player copy:** Order `bare rock -> pioneer species -> soil forms -> later community` and `disturbance -> grasses -> shrubs -> later community`; submit secondary succession as the faster path.

**Complete format-specific interaction block:** `cards=[bare_rock,pioneers,soil,later,disturbance,grasses,shrubs]; order_primary=[bare_rock,pioneers,soil,later]; order_secondary=[disturbance,grasses,shrubs,later]; axis=ecological_recovery; answer=secondary`.

**Correct result:** The burned soil follows secondary succession and can recover in roughly 10-50 years; bare rock primary succession often takes 100+ years.

**Answer text:** The completed check shows the burned soil follows secondary succession and can recover in roughly 10-50 years; bare rock primary succession often takes 100+ years.

**Why:** Existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.

**Wrong-path feedback:** Calling bare-rock recovery secondary ignores the lack of soil; calling the burned-soil path primary ignores the surviving soil and therefore exaggerates recovery time.

**State/output:** Recovery zones labeled; aquatic inset labels photic, aphotic, littoral, pelagic, benthic; unlocks Stop 3.3.

## Stop 11 - Classify vulnerability

**Format/placement:** TRIAGE, asked by Iona Vale beside `common-map`.

**Metadata:** Concept: generalist/specialist, island biogeography, life history preview; Keystone: biodiversity/resilience; Area: Reef Station; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Iona Vale, at the common map in Common Office.

**Stop reason - exact player copy:** Habitat protection must begin with species least able to replace losses.

**Question card story setup - exact player copy:** Because damaged soils recover at different rates, species using them also face different risk. Sort a broad-diet generalist and a narrow-habitat specialist for monitoring, protection, or routine watch, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Small remote islands support fewer replacements, so specialists need earlier protection.

**Question card prompt - exact player copy:** Assign island rat, cliff-nesting petrel, fast-growing grass, and slow-breeding seal to `routine`, `monitor`, or `protect first`; submit one complete triage.

**Complete format-specific interaction block:** `choices={rat:routine,grass:routine,petrel:protect_first,seal:monitor}; answer=petrel; why="specialist on small remote island"; rebuttals={rat:"generalist",grass:"rapid recovery",seal:"K-selected but broader marine range"}`.

**Correct result:** Protect the petrel first; monitor the seal; routine watch for the generalists.

**Answer text:** The completed check shows protect the petrel first; monitor the seal; routine watch for the generalists.

**Why:** Narrow niches and isolation limit recolonization; feedback contrasts niche breadth.

**Wrong-path feedback:** Protecting the rat or grass first favors fast-growing generalists; treating the slow-breeding seal as routine ignores its low replacement rate, while the cliff petrel has the narrowest habitat.

**State/output:** Petrel habitat hatched with text label; unlocks Stop 3.4.

## Stop 12 - Test the fertilizer claim

**Format/placement:** CONTROL, at `nitrogen-bench`.

**Metadata:** Concept: limiting nutrients and controlled experiment; Keystone: experimental causality; Area: Chapel Council Room; Learning role: TRANSFER; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the nitrogen bench, in Common Office.

**Stop reason - exact player copy:** Yield claims cannot justify more fertilizer until runoff is measured under a fair comparison.

**Question card story setup - exact player copy:** The energy and habitat limits are mapped, yet fertilizer is proposed as the escape. Test equal plots to see whether added nitrogen raises crop yield without creating a larger nitrate loss.

**Question card story-science connection - exact player copy:** A yield gain is not sustainable if the nutrient surplus leaves the field and damages another system.

**Question card prompt - exact player copy:** Change only nitrogen from 0 to 50 kg/ha; keep crop, soil, plot area, water 20 mm, and seven-day timing fixed. Measure yield and runoff nitrate, restore nitrogen to 0, repeat the measurement, then submit one conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"nitrogen",label:"nitrogen application"},{id:"water",label:"irrigation"},{id:"crop",label:"crop type"}],correct_control:"nitrogen",baseline:{N:0,yield:4.0,nitrate:1.0},response:{N:50,yield:4.6,nitrate:8.0},units:{N:"kg/ha",yield:"t/ha",nitrate:"mg/L"},noise_band:{yield:0.1,nitrate:0.3},fixed:["crop","soil","plot area","water 20 mm","seven-day timing"],measure_when:"after seven days",restore:{required:true,N:0,remeasure:true},correct_conclusion:"small yield gain with large nitrate loss",answerText:"Changing only nitrogen raises yield slightly but increases runoff nitrate far beyond noise; restoration returns the baseline."}`

**Correct result:** Nitrogen raises yield 0.6 t/ha but raises runoff nitrate 7.0 mg/L; the ferry plan must cap nutrient surplus.

**Answer text:** The completed check shows nitrogen raises yield 0.6 t/ha but raises runoff nitrate 7.0 mg/L; the ferry plan must cap nutrient surplus.

**Why:** Holding other variables fixed and reversing nitrogen isolates its effect; retry identifies any changed control.

**Wrong-path feedback:** Changing water or crop with nitrogen prevents a causal comparison; judging yield alone ignores the 7.0 mg/L nitrate increase that makes the fertilizer claim unsafe.

**State/output:** Surplus nitrogen arrow points toward aquifer and bay; D8/D10 clue; delivery piece 3 posts.

## Mission outcome

Mission decision: Limit ferry growth to what farms and wild systems can support. Food loss, slow growth, and habitat all set the limit. More fertilizer will not remove those limits. Salt in the well is still rising.

### Post-mission metric screen - exact player copy

**Target:** 12:00. **Story event:** Ecological limits mapped. **Automatic:** Evidence +5. **Canonical QA:** 83/45/40/40 after 11 RP to Evidence.  

## Quick concept review
- NPP is plant energy left after respiration.
- About 10% of energy reaches the next trophic level.
- **Mission takeaway:** Soil makes secondary succession faster than primary succession.

---

# Mission 4 - The Aquifer Warning

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 12 DAYS TO THE FERRY VOTE  
**Card title:** Salt Before Summer  
**Go now:** Go to Waterworks and meet Nkemdi Okafor, waterworks technician, at the store gauges.  
**Card body:** Ecological limits now join the water ceiling, but chloride rose before visitor demand peaked. Soil and rock control how quickly rain reaches groundwater and how pumping moves seawater. At Waterworks, compare cores, well levels, and chloride timing. By the end of the mission, decide whether visitors or aquifer drawdown caused the salt warning.  
**Objective:** Diagnose the salt pathway and set an aquifer warning.

### Worth knowing first - exact player copy

#### Glossary terms
Porosity: the fraction of material made of open space.  
Permeability: how readily connected pores transmit water.  
Saltwater intrusion: seawater moving into a freshwater aquifer.  
Soil horizon: a layer formed by additions, losses, movement, and change.

#### Primer concepts
- Sand drains rapidly; clay drains slowly and often holds nutrients.
- Physical weathering changes size; chemical weathering changes composition.
- O-A-E-B-C-R runs from surface organic matter to bedrock; E is leached and B accumulates material.

#### Equations first needed today
This mission retrieves the water-balance relationship already recorded in the mission log.

## Main story happening - designer summary

Nkemdi lays out aquifer cores beside synchronized logs. **Science:** soil formation (parent material, climate, organisms, topography, time), texture, porosity/permeability, weathering, groundwater. **Twist 1:** drawdown, not the visitor peak alone, pulls salt inward. **One location:** Waterworks. A probe maps depth, a diagnosis integrates quiet readings, and a trigger posts an inclusive chloride/drawdown rule.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `rain-bench` | automatic**

**World state:** Arrival: Nkemdi sets the aquifer core beside the synchronized well log; Continue.

**Panel/HUD text:** MISSION 4: READ THE GROUND OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Start with read the ground. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 13 at `rain-bench` in Waterworks.

**Beat 2 - After Stop 13 | `store-gauges` | automatic**

**World state:** After Stop 13: The O-A-E-B-C-R core labels remain visible and the well probe unlocks.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Use the Stop 13 result to settle probe the salt front."

**Unlocks/waypoint:** Unlock Stop 14 at `store-gauges` in Waterworks.

**Beat 3 - After Stop 14 | `store-gauges` | automatic**

**World state:** After Stop 14: W3-W5 receive persistent `SALT FRONT` tags and the combined diagnostic panel unlocks.

**Panel/HUD text:** SALT FRONT

**Dialogue bubbles -** Nkemdi Okafor: "Use the Stop 14 result to settle diagnose the early warning."

**Unlocks/waypoint:** Unlock Stop 15 at `store-gauges` in Waterworks.

**Beat 4 - After Stop 15 | `store-gauges` | automatic**

**World state:** After Stop 15: The pump control flashes beside the falling-head record and unlocks the trigger.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Use the Stop 15 result to settle write the aquifer trigger."

**Unlocks/waypoint:** Unlock Stop 16 at `store-gauges` in Waterworks.

**Beat 5 - At mission end | `rain-bench` | automatic**

**World state:** Outcome and hook: The pump stops on the third update, the 1.0 m plaque remains, and the landings record becomes the next waypoint; Required bubbles pause until Continue.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Nkemdi Okafor: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**One location:** Waterworks (`WATER`). Stops 13-16 move among `rain-bench` and `store-gauges`; no distant travel is required because the soil core, synchronized wells, pumping record, and trigger control are uniquely available here.

## Characters and dramatic beat

Nkemdi begins suspicious of visitor demand, but accepts the earlier-than-summer chloride timing. Her repeated question, “What changed upstream?”, shifts attention from blame to falling freshwater head. The mission’s first major reversal is physical and visible: steady high pumping under low recharge, not the visitor peak alone, pulls seawater inland.

## Key concepts, explained here

Porosity measures available pore space, while permeability measures whether those pores connect well enough to transmit water. Sand often drains quickly; clay drains slowly and can store water and nutrients. When pumping lowers freshwater head near a coast, seawater can advance inland before a tap’s chloride concentration exceeds its drinking-water limit.

## Stop 13 - Read the ground

**Format/placement:** PROTOCOL, at `rain-bench`.

**Metadata:** Concept: soil horizons/weathering/texture; Keystone: soil-land use; Area: Waterworks; Learning role: INTRODUCE; Difficulty: L2; Story role: evidence.

**Call - exact player copy:** Go to the rain bench, in Waterworks.

**Stop reason - exact player copy:** The recharge model needs the material through which water actually moves.

**Question card story setup - exact player copy:** The nitrate surplus points toward groundwater, and the chloride warning demands a travel-time check. Match each core feature to the soil process or texture that controls infiltration and storage, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Porosity stores water, while connected pores determine permeability and salt movement.

**Question card prompt - exact player copy:** Match frost-split rock, rusted mineral, coarse sand, dense clay, pale E horizon, and enriched B horizon to physical weathering, chemical weathering, fast drainage, slow drainage, leaching, and accumulation.

**Complete format-specific interaction block:** `mapping={frost_split:physical,rust:chemical,sand:fast,clay:slow,E:leaching,B:accumulation}`.

**Correct result:** The six mappings establish a sandy, permeable coastal path above a clay-rich storage layer.

**Answer text:** The completed check shows the six mappings establish a sandy, permeable coastal path above a clay-rich storage layer.

**Why:** Weathering creates particles; texture and horizons govern water movement.

**Wrong-path feedback:** Coarse sand cannot be the slow-drainage layer, clay cannot be the fast path, and swapping E with B reverses leaching and accumulation in the soil profile.

**State/output:** Core layers label O-A-E-B-C-R; unlocks probe.

## Stop 14 - Probe the salt front

**Format/placement:** PROBE, at `store-gauges`.

**Metadata:** Concept: aquifer profile; Keystone: water quantity; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** One surface sample cannot show whether salt is entering from the coast or fertilizer from above.

**Question card story setup - exact player copy:** With the permeable coastal layer identified, take depth readings from inland to shore. Locate where chloride rises while nitrate remains quiet, then name the broken groundwater pattern, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A shoreward chloride gradient with stable nitrate identifies seawater, not farm runoff.

**Question card prompt - exact player copy:** Probe W1-W5 in order. At every station compare observed chloride with that station's expected 40-55 mg/L freshwater range, compare observed nitrate with that station's expected 3.5-4.5 mg/L background range, and read freshwater head; submit the first chloride break and either `seawater intrusion` or `farm runoff`.

**Complete format-specific interaction block:** ```yaml
probe:
  stations:
    - {id: W1, reading: {chloride: 42, nitrate: 4.0, head: 3.2}, expected: {chloride: [40,55], nitrate: [3.5,4.5], head: "freshwater head declines gradually"}, load: "inland freshwater baseline"}
    - {id: W2, reading: {chloride: 48, nitrate: 4.2, head: 2.7}, expected: {chloride: [40,55], nitrate: [3.5,4.5], head: "below W1 but positive"}, load: "background tracer comparison"}
    - {id: W3, reading: {chloride: 96, nitrate: 4.1, head: 1.8}, expected: {chloride: [40,55], nitrate: [3.5,4.5], head: "above the 1.0 m pump trigger"}, load: "first chloride departure while nitrate remains background"}
    - {id: W4, reading: {chloride: 210, nitrate: 4.0, head: 0.9}, expected: {chloride: [40,55], nitrate: [3.5,4.5], head: ">1.0 m safe operating head"}, load: "chloride rises as head crosses the trigger"}
    - {id: W5, reading: {chloride: 390, nitrate: 4.2, head: 0.2}, expected: {chloride: [40,55], nitrate: [3.5,4.5], head: ">1.0 m safe operating head"}, load: "shoreward endpoint"}
  units: {chloride: "mg/L", nitrate: "mg/L", head: "m"}
  comparison: "first chloride departure while nitrate remains within expected background"
  correct_station: W3
  correct_conclusion: seawater_intrusion
```

**Correct result:** The break begins at W3; chloride rises toward shore while nitrate stays near 4 mg/L and freshwater head falls.

**Answer text:** The completed check shows the break begins at W3; chloride rises toward shore while nitrate stays near 4 mg/L and freshwater head falls.

**Why:** Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.

**Wrong-path feedback:** Calling the break farm runoff conflicts with nitrate staying near its expected value; choosing W4 or W5 misses W3, the first station where chloride departs from expectation.

**State/output:** W3-W5 tagged “salt front”; unlocks diagnosis.

## Stop 15 - Diagnose the early warning

**Format/placement:** DIAGNOSIS, at `store-gauges`.

**Metadata:** Concept: coupled groundwater evidence; Keystone: water quantity; Area: Waterworks; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The council needs the one cause that fits salt timing, well levels, and quiet nitrate.

**Question card story setup - exact player copy:** The probe found a coastal salt front before the tourist peak. Combine that pattern with pumping, rainfall, and nitrate records to reject explanations that fit only one alarm, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A diagnosis must explain both abnormal and quiet readings.

**Question card prompt - exact player copy:** Select the single cause that fits every panel zone.

**Complete format-specific interaction block:** `headline="Chloride before summer"; readings={chloride:"42 to 390 mg/L shoreward",head:"3.2 to 0.2 m",nitrate:"stable 4.0-4.2 mg/L",rain:"below planning year",visitors:"not yet peaked",pumping:"continuous high"}; choices={visitor_sewage,road_salt,fertilizer,pumping_intrusion}; answer=pumping_intrusion; mechanisms supplied per choice`.

**Correct result:** Continuous pumping under low recharge lowered freshwater head and pulled seawater inland.

**Answer text:** The completed check shows continuous pumping under low recharge lowered freshwater head and pulled seawater inland.

**Why:** Visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.

**Wrong-path feedback:** Drought alone does not explain the shoreward chloride gradient, and fertilizer does not fit quiet nitrate; only pumping plus low recharge fits every panel zone.

**State/output:** Pump warning flashes with text; unlocks trigger.

## Stop 16 - Write the aquifer trigger

**Format/placement:** TRIGGER, at `store-gauges`.

**Metadata:** Concept: environmental thresholds; Keystone: policy instruments; Area: Chapel Council Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** Pumping needs an automatic rule before the next dry spell advances the front.

**Question card story setup - exact player copy:** Because drawdown explains the salt front, the warning must act before drinking water fails. Write the threshold now, then test it against new well updates without moving the line, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A precommitted trigger prevents political pressure from redefining danger after readings arrive.

**Question card prompt - exact player copy:** Set an inclusive stop-pumping rule on freshwater head from 0.0 to 3.0 m; objective is prevent chloride above 250 mg/L, and campaign evidence shows risk begins at head <=1.0 m. Commit 1.0 m, reveal updates, then submit `STOP` when the threshold is met.

**Complete format-specific interaction block:** `trigger.rule="stop pumping when head <= threshold"; scale=[0,3]; anchors=[0.5,1.0,1.5,2.0]; objective="chloride <=250 mg/L"; direction=lower_is_worse; consequence_limit=250; correct_threshold=1.0; updates=[1.4,1.1,1.0,0.8]`.

**Correct result:** Stop at head <=1.0 m; the third update triggers action.

**Answer text:** The completed check shows stop at head <=1.0 m; the third update triggers action.

**Why:** Freshwater pressure holds seawater back; waiting below 1.0 m advances the front.

**Wrong-path feedback:** A threshold below 1.0 m acts after the documented risk begins, while a higher threshold stops safe pumping; using a strict `<` rule misses the inclusive 1.0 m boundary.

**State/output:** Pump gains threshold plaque; delivery piece 4 posts.

## Mission outcome

Mission decision: The well is salty because pumping lowered fresh water pressure. Seawater then moved into the aquifer. Stop pumping at 1.0 metre or less. Next, test if steady fish catch hides loss.

### Post-mission metric screen - exact player copy

**Target:** 13:00. **Story event:** Aquifer warning posted. **Automatic:** Water +5. **Canonical QA:** 85/59/40/40 after Evidence 2 and Water 9.  

## Quick concept review
- Soil texture affects storage and water movement.
- Quiet nitrate helped distinguish seawater from farm runoff.
- **Mission takeaway:** Thresholds should be committed before new evidence arrives.

---

# Mission 5 - The Fishery Ceiling

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 11 DAYS TO THE VOTE.

**Card title:** THE FISHERY CEILING

**Go now:** Go to the Harbour Office and meet Tomas Reed, harbour and fishery lead, at the landings book.

**Card body:** The aquifer warning proved that steady service can hide a shrinking reserve. Fish landings may do the same when crews work longer for each tonne. At the harbour, calculate stock trends, then verify habitat evidence at Reef Station. By the end of the mission, decide the catch ceiling and rule needed to prevent collapse.

**Objective:** Set a sustainable and enforceable fishery ceiling.

### Worth knowing first - exact player copy

#### Glossary terms

Generalist: species with a broad niche.

Specialist: species with a narrow niche. r-selected: many young, short lives, high early mortality.

K-selected: few young, long lives, stable populations.

Carrying capacity: largest population an environment can sustain.

#### Primer concepts

- Exponential growth assumes no limit; logistic growth slows near K.
- Type I survivorship has low early death, Type II constant death, Type III high early death.
- Density-dependent limits include disease and competition; weather and disasters are density-independent.

#### Equations first needed today
**Equation:** `N_t=N_0λ^t`, for unrestricted discrete growth; N is population, λ multiplier, t time; needed to expose impossible constant-growth claims.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** N_t, N_0, λ, t, for, unrestricted, discrete, growth, N, is, population, multiplier, time, needed, to, expose, impossible, constant, claims are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `N_t=K/(1+e^-rt)`, for logistic growth; K is capacity and r growth rate; needed to set the stock ceiling.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** N_t, K, e, rt, for, logistic, growth, is, capacity, and, r, rate, needed, to, set, the, stock, ceiling are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `t_d≈0.69/r`, for doubling time; r is decimal rate; needed to compare recovery speeds.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** t_d, r, for, doubling, time, is, decimal, rate, needed, to, compare, recovery, speeds are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

At Harbour, paper effort data reveal falling catch per boat-hour; that result unlocks Reef Station, whose nursery counts determine recovery. Tomas shifts from defending landings to supporting effort controls. Panels progress `steady tonnes -> falling efficiency -> nursery bottleneck -> ceiling`. **Science:** population models and life histories. **Mystery:** stable landings conceal decline. **Stakes:** collapse removes food and income.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Harbour Office | `landings-book` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 5: MEASURE CATCH PER UNIT EFFORT OPEN

**Dialogue bubbles -** Tomas Reed: "Start with measure catch per unit effort. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 17 at `landings-book` in Harbour Office.

**Beat 2 - After Stop 17 | `transect-bench` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 17 result to settle read the survivorship curves."

**Unlocks/waypoint:** Unlock Stop 18 at `transect-bench` in Reef Station.

**Beat 3 - After Stop 18 | `flow-tank` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 18 result to settle verify logistic recovery."

**Unlocks/waypoint:** Unlock Stop 19 at `flow-tank` in Reef Station.

**Beat 4 - After Stop 19 | `transect-bench` | automatic**

**World state:** Synthesis: Stop 19 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 19 result to settle fund an enforceable ceiling."

**Unlocks/waypoint:** Unlock Stop 20 at `transect-bench` in Reef Station.

**Beat 5 - At mission end | `landings-book` | automatic**

**World state:** Decision and hook: Stop 20 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

At Harbour, paper effort data reveal falling catch per boat-hour; that result unlocks Reef Station, whose nursery counts determine recovery. Tomas shifts from defending landings to supporting effort controls. Panels progress `steady tonnes -> falling efficiency -> nursery bottleneck -> ceiling`. **Science:** population models and life histories. **Mystery:** stable landings conceal decline. **Stakes:** collapse removes food and income.

## Characters and dramatic beat

At Harbour, paper effort data reveal falling catch per boat-hour; that result unlocks Reef Station, whose nursery counts determine recovery. Tomas shifts from defending landings to supporting effort controls. Panels progress `steady tonnes -> falling efficiency -> nursery bottleneck -> ceiling`. **Science:** population models and life histories. **Mystery:** stable landings conceal decline. **Stakes:** collapse removes food and income.

## Key concepts, explained here

Exponential growth assumes no limit; logistic growth slows near K. Type I survivorship has low early death, Type II constant death, Type III high early death. Density-dependent limits include disease and competition; weather and disasters are density-independent.

## Stop 17 - Measure catch per unit effort

**Format/placement:** BALLPARK, at `landings-book`.

**Metadata:** Concept: catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue; Keystone: catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue.

**Call - exact player copy:** Go to the landings book, in Harbour Office.

**Stop reason - exact player copy:** “The steady landing total must be divided by the effort used to obtain it.”

**Question card story setup - exact player copy:** The paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Calculate catch per unit effort in two years to test whether steady landings mean a steady stock.

**Question card story-science connection - exact player copy:** Falling catch per effort signals depletion hidden by added work

**Question card prompt - exact player copy:** “Using 960 t/4,800 boat-h in Year 1 and 960 t/8,000 boat-h in Year 5, submit both rates in kg/boat-h and the percent decline.”

**Complete format-specific interaction block:** `formula=1000*tonnes/hours; truth=[200,120,40%]; tolerance=1%`

**Correct result:** `200 and 120 kg/boat-h; decline=(200-120)/200=40%`

**Answer text:** The completed check shows 200 and 120 kg/boat-h; decline=(200-120)/200=40%.

**Why:** Falling catch per effort signals depletion hidden by added work

**Wrong-path feedback:** dividing tonnes alone misses effort

**State/output:** unlock travel, waypoint “Take the effort decline to Reef Station.”

## Stop 18 - Read the survivorship curves

**Format/placement:** CLOUD, at `transect-bench`.

**Metadata:** Concept: survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence; Keystone: survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence.

**Call - exact player copy:** Go to the transect bench, in Reef Station.

**Stop reason - exact player copy:** “Nursery survival determines how quickly the stock can replace catch.”

**Question card story setup - exact player copy:** Because catch efficiency fell 40%, landings no longer measure stock health. Plot juvenile survival for a Type III fish and compare it with a slow-breeding seal before assigning recovery expectations.

**Question card story-science connection - exact player copy:** High early mortality makes nursery habitat decisive even when adults remain visible

**Question card prompt - exact player copy:** “Place the fish survival cloud through [1000,180,90,55,40] survivors by age and the seal through [100,96,90,70,0]; submit Type III for fish and Type I for seal.”

**Complete format-specific interaction block:** `corridors fish=III, seal=I; tolerance=10 survivors`

**Correct result:** fish Type III, seal Type I. Feedback distinguishes constant Type II

**Answer text:** The completed check shows fish Type III, seal Type I. Feedback distinguishes constant Type II.

**Why:** High early mortality makes nursery habitat decisive even when adults remain visible

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** nursery flag

## Stop 19 - Verify logistic recovery

**Format/placement:** VERIFY, at `flow-tank`.

**Metadata:** Concept: logistic recovery | experimental causality | 5.2 | COMBINE | L4 | reversal; Keystone: logistic recovery | experimental causality | 5.2 | COMBINE | L4 | reversal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: logistic recovery | experimental causality | 5.2 | COMBINE | L4 | reversal.

**Call - exact player copy:** Go to the flow tank, in Reef Station.

**Stop reason - exact player copy:** “The proposed quota must be tested against recovery near carrying capacity.”

**Question card story setup - exact player copy:** With nursery mortality identified, a constant exponential forecast is too optimistic near the habitat limit. Predict one-year growth under the displayed logistic rule, then compare it with the tank cohort.

**Question card story-science connection - exact player copy:** Growth slows as population approaches K, so catch must leave replacement biomass

**Question card prompt - exact player copy:** “CALCULATE AND COMMIT: use ΔN=rN(1-N/K), r=0.50/yr, N=600 fish, K=1,000 fish; submit ΔN in fish/yr. OPERATE: run one year with food and temperature fixed. MEASURE: final N. INTERPRET: submit whether a 150-fish catch is sustainable. No restoration required.”

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{equation:"ΔN=rN(1-N/K)",inputs:{r:0.50,N:600,K:1000},units:{r:"per year",N:"fish",K:"fish"},submit:{quantity:"population change",unit:"fish/year",truth:120,tolerance:2}},equipment_locked_until_prediction_commit:true,operation:{action:"run one year",fixed:["food","temperature"]},measurements:{final_population:718,unit:"fish",tolerance:5},restore:{required:false,reason:"the annual simulation changes no physical setting"},correct_conclusion:"a 150-fish catch is not sustainable",answerText:"Logistic growth predicts 120 fish/year, so removing 150 exceeds replacement; the measured final population agrees within tolerance."}`

**Correct result:** `0.50(600)(0.40)=120 fish/yr`; 150 exceeds replacement. Feedback shows missing density term

**Answer text:** The completed check shows 0.50(600)(0.40)=120 fish/yr; 150 exceeds replacement. Feedback shows missing density term.

**Why:** Growth slows as population approaches K, so catch must leave replacement biomass

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** 150 option crossed out

## Stop 20 - Fund an enforceable ceiling

**Format/placement:** ALLOCATE, at `transect-bench`.

**Metadata:** Concept: commons governance | policy instruments | 5.1-5.3 | TRANSFER | L5 | decision; Keystone: commons governance | policy instruments | 5.1-5.3 | TRANSFER | L5 | decision; Area: Common Office; Learning role: PRACTICE; Difficulty: L3; Story role: commons governance | policy instruments | 5.1-5.3 | TRANSFER | L5 | decision.

**Call - exact player copy:** Go to the transect bench, in Reef Station.

**Stop reason - exact player copy:** “A ceiling without monitoring and nursery protection would exist only on paper.”

**Question card story setup - exact player copy:** The recovery test limits annual replacement to about 120 fish at the present stock. Allocate enforcement capacity so catch, effort, habitat, and data all support a ceiling below that replacement.

**Question card story-science connection - exact player copy:** Shared resources avoid tragedy only when access and compliance are governed

**Question card prompt - exact player copy:** “Allocate 100 points and submit a plan: catch tags 30 required; boat-hour log 20 required; nursery closure 25 protected; independent survey 15; advertising 20; larger dock 25. Fund all required/protected items without exceeding 100.”

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"landing_tags",label:"numbered landing tags",cost:30,required:true},{id:"landing_log",label:"time-and-mass landing log",cost:20,required:true},{id:"nursery_patrol",label:"nursery-zone patrol",cost:25,required:true},{id:"independent_survey",label:"independent stock survey",cost:15,required:true},{id:"publicity",label:"voluntary-compliance publicity",cost:20,required:false},{id:"boat_subsidy",label:"larger-boat subsidy",cost:30,required:false}],questions:[{id:"replacement",text:"Does the plan keep permitted catch below measured replacement?",required:true},{id:"compliance",text:"Can it detect untagged or nursery-zone catch?",required:true},{id:"independence",text:"Does it preserve an independent stock check?",required:true}],correct_allocation:{landing_tags:30,landing_log:20,nursery_patrol:25,independent_survey:15},reserve:10,answerText:"Fund tags, the landing log, nursery patrol, and an independent survey; do not spend the enforcement pool on publicity or boat expansion."}`

**Correct result:** 90-point four-part plan; catch ceiling 100 fish/year, below 120 replacement

**Answer text:** The completed check shows 90-point four-part plan; catch ceiling 100 fish/year, below 120 replacement.

**Why:** Shared resources avoid tragedy only when access and compliance are governed

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** pieces 5-6 post

## Mission outcome

Mission decision: Cap the catch below measured growth. Fund tags, patrols, and a new stock check. The rule protects the nursery. Now the waste ledger shows leaks into water and air.

### Post-mission metric screen - exact player copy

target 14:00; fishery ceiling adopted, Evidence +5; QA 90/70/40/40 after 11 RP Water. Review: exponential growth has no ceiling; logistic growth slows near K; life history shapes recovery; **takeaway:** sustainable yield must stay below replacement and be enforced.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 6 - The Enforcement Plan

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 10 DAYS.

**Card title:** THE ENFORCEMENT PLAN

**Go now:** Harbour Office, Tomas Reed at `fee-desk`.

**Card body:** The fish ceiling works only if every landing is counted. Regulation, property rights, and fees can protect a shared resource, but each shifts costs differently. Test compliance at the harbour, then take the workable rule to the Common Office. By the end of the mission, choose an enforceable land-and-water commons policy.

**Objective:** Turn ecological ceilings into fair rules.

### Worth knowing first - exact player copy

#### Glossary terms

Tragedy of the commons: overuse of a shared resource.

Sustainable yield: harvest that does not reduce future supply.

Ecological footprint: productive land and water needed to support consumption and waste.

IPM: pest control combining monitoring, prevention, and limited targeted treatment.

#### Primer concepts

- regulation and property rights can limit access; developed lifestyles often use 4-5 ha/person versus about 1.8 available globally; practices need mechanism-based justification.

#### Equations first needed today
**Equation:** `footprint demand=people×ha/person`; used to show overshoot.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** footprint, demand, people, ha, person, used, to, show, overshoot are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Harbour evidence tests landing controls, unlocking Common where land practices complete the policy. Ada wants a simple fee; Tomas wants workable checks; Iona protects farm yield. A posted rule changes from “pay to use” to “measure, cap, restore.”

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Chapel Council Room | `council-table` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 6: AUDIT THE LANDING CLAIM OPEN

**Dialogue bubbles -** Mara Voss: "Start with audit the landing claim. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 21 at `council-table` in Chapel Council Room.

**Beat 2 - After Stop 21 | `council-table` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 21 result to settle buy compliance evidence."

**Unlocks/waypoint:** Unlock Stop 22 at `council-table` in Chapel Council Room.

**Beat 3 - After Stop 22 | `common-map` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 22 result to settle match land-use practices."

**Unlocks/waypoint:** Unlock Stop 23 at `common-map` in Common Office.

**Beat 4 - After Stop 23 | `common-map` | automatic**

**World state:** Synthesis: Stop 23 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 23 result to settle fund the commons package."

**Unlocks/waypoint:** Unlock Stop 24 at `common-map` in Common Office.

**Beat 5 - At mission end | `council-table` | automatic**

**World state:** Decision and hook: Stop 24 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Harbour evidence tests landing controls, unlocking Common where land practices complete the policy. Ada wants a simple fee; Tomas wants workable checks; Iona protects farm yield. A posted rule changes from “pay to use” to “measure, cap, restore.”

## Characters and dramatic beat

Harbour evidence tests landing controls, unlocking Common where land practices complete the policy. Ada wants a simple fee; Tomas wants workable checks; Iona protects farm yield. A posted rule changes from “pay to use” to “measure, cap, restore.”

## Key concepts, explained here

regulation and property rights can limit access; developed lifestyles often use 4-5 ha/person versus about 1.8 available globally; practices need mechanism-based justification.

## Stop 21 - Audit the landing claim

**Format/placement:** ATTEST, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: compliance records | evidence | D5 | PRACTICE | L3 | obstacle; Keystone: compliance records | evidence | D5 | PRACTICE | L3 | obstacle; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: compliance records | evidence | D5 | PRACTICE | L3 | obstacle.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** verify claims before fees authorize access

**Question card story setup - exact player copy:** The fish ceiling is posted, but four landing claims support the morning catch. Verify identity, time, mass, and nursery-zone origin before any catch receives a legal tag, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** a receipt proves payment, not ecological compliance

**Question card prompt - exact player copy:** verify at most 3 of 5 claims and reject any critical unbacked claim

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"license",label:"fishing license",signed:true,backed:true,critical:true},{id:"time",label:"landing time",signed:true,backed:true,critical:false},{id:"mass",label:"landed mass",signed:true,backed:true,critical:true},{id:"zone",label:"nursery-zone origin",signed:true,backed:false,critical:true},{id:"fee",label:"landing fee receipt",signed:true,backed:true,critical:false}],correct_verified:["license","mass","zone"],critical_unbacked:"zone",answerText:"Use the three checks on license, mass, and the unbacked nursery-zone claim; reject the landing if zone origin cannot be verified."}`

**Correct result:** nursery-zone origin is unbacked; hold catch

**Answer text:** The completed check shows nursery-zone origin is unbacked; hold catch.

**Why:** a receipt proves payment, not ecological compliance

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** inspection station enabled

## Stop 22 - Buy compliance evidence

**Format/placement:** VALUE, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: monitoring design | policy | 6.1 | COMBINE | L5 | decision; Keystone: monitoring design | policy | 6.1 | COMBINE | L5 | decision; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: monitoring design | policy | 6.1 | COMBINE | L5 | decision.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** buy evidence that changes whether the ceiling is real

**Question card story setup - exact player copy:** Because the catch cannot prove where it was taken, the council has forty monitoring credits. Buy records that can reveal both total extraction and nursery violations, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** evidence has value only if it can change enforcement

**Question card prompt - exact player copy:** choose within 40: electronic tags 20 required, random dock checks 15 required, poster 8, fisher survey 12, larger sign 10

**Complete format-specific interaction block:** `value:{budget:40,options:[{id:"landing_tags",axis:"total extraction",cost:20,required:true},{id:"dock_checks",axis:"identity and mass verification",cost:15,required:true},{id:"nursery_camera",axis:"nursery-zone location",cost:20,required:false},{id:"public_ad",axis:"awareness",cost:10,required:false},{id:"seller_survey",axis:"self-reported behavior",cost:15,required:false}],total_available_cost:80,correct_purchase:["landing_tags","dock_checks"],answerText:"Buy tags and dock checks for 35 credits; they can change enforcement by testing total catch and compliance."}`

**Correct result:** tags+checks=35

**Answer text:** The completed check shows tags+checks=35.

**Why:** evidence has value only if it can change enforcement

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** waypoint Common

## Stop 23 - Match land-use practices

**Format/placement:** PROTOCOL, at `common-map`.

**Metadata:** Concept: land-use practices | soil/land use | D3 | RETRIEVE | L3 | evidence; Keystone: land-use practices | soil/land use | D3 | RETRIEVE | L3 | evidence; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: land-use practices | soil/land use | D3 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** the same commons rule must work on soil and water

**Question card story setup - exact player copy:** The harbour plan now measures use and checks violations. At the common, match each land problem to a practice that reduces its mechanism rather than moving it elsewhere, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Named practices earn trust only when their mechanisms address the measured problem instead of moving the harm elsewhere.

**Question card prompt - exact player copy:** Submit the complete mapping: erosion, runoff, irrigation loss, pests, and a forestry claim must each receive one practice.

**Complete format-specific interaction block:** `protocol:{scenarios:[erosion,runoff,irrigation_loss,pests,forestry_claim],choices:[selective_harvest_and_reforest,permeable_pavement_and_rain_garden,drip_irrigation,IPM,FSC_certification],mapping:{erosion:selective_harvest_and_reforest,runoff:permeable_pavement_and_rain_garden,irrigation_loss:drip_irrigation,pests:IPM,forestry_claim:FSC_certification}}`

**Correct result:** Erosion maps to selective harvest and reforestation; runoff to permeable pavement and rain gardens; irrigation loss to drip irrigation; pests to IPM; and the forestry claim to FSC certification.

**Answer text:** Match each problem to the practice that interrupts its physical or ecological mechanism.

**Why:** Roots and selective cover limit erosion, infiltration features reduce runoff, drip delivery limits evaporation, IPM targets pests while limiting resistance, and FSC provides a forestry standard.

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** five rule cards

## Stop 24 - Fund the commons package

**Format/placement:** SCIENCETANK, asked by Mara Voss beside `common-map`.

**Metadata:** Concept: agriculture trade-offs | policy | 6.3 | TRANSFER | L5 | decision; Keystone: agriculture trade-offs | policy | 6.3 | TRANSFER | L5 | decision; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: agriculture trade-offs | policy | 6.3 | TRANSFER | L5 | decision.

**Call - exact player copy:** Talk to Mara Voss, at the common map in Common Office.

**Stop reason - exact player copy:** fund a workable package, not one fashionable label

**Question card story setup - exact player copy:** With practices matched to mechanisms, the common needs a 100-point package. Balance crop yield, soil health, runoff, and enforcement while rejecting a single-method cure, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Green Revolution tools raise yield but can increase pollution, resistance, and monoculture

**Question card prompt - exact player copy:** Allocate exactly 100 points among soil testing 20, drip irrigation 25, IPM 25, buffer strips 20, blanket pesticide 30, and GMO monitoring 10. Submit one allocation that funds soil testing, drip irrigation, IPM, buffer strips, and GMO monitoring.

**Complete format-specific interaction block:** `sciencetank:{pool:100,proposals:[{id:soil_testing,cost:20},{id:drip_irrigation,cost:25},{id:IPM,cost:25},{id:buffer_strips,cost:20},{id:blanket_pesticide,cost:30},{id:GMO_monitoring,cost:10}],recommended:{soil_testing:20,drip_irrigation:25,IPM:25,buffer_strips:20,GMO_monitoring:10},evidence:[crop_yield,soil_health,nitrate_runoff,pesticide_resistance],truth_total:100}`

**Correct result:** Fund soil testing 20, drip irrigation 25, IPM 25, buffer strips 20, and GMO monitoring 10, totaling 100 points.

**Answer text:** The integrated five-part package protects yield, soil, water, and resistance monitoring without funding blanket pesticide use.

**Why:** Green Revolution tools raise yield but can increase pollution, resistance, and monoculture

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** Post delivery piece 6 and the enforceable land-practice package; unlock the mission outcome.

## Mission outcome

Mission decision: Use measured caps, random checks, restoration, and targeted fees. Payment alone does not prove compliance. The rule can be enforced. But water and methane still leave by unpriced paths.

### Post-mission metric screen - exact player copy

target 13:00; hearing opened, Trust +5; QA 90/81/40/45 after 11 Water. Takeaway: a commons limit needs measurement, monitoring, and a consequence.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 7 - The Hidden Losses

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 9 DAYS.

**Card title:** THE HIDDEN LOSSES

**Go now:** Tip and Sorting Yard, Mei Chen at `leachate-bench`.

**Card body:** Enforcement can control visible use, but the island still loses resources through unseen leaks. Landfills make leachate and methane, while broken pipes waste treated water before a tap. Trace the tip pathway, then test the Waterworks balance. By the end of the mission, decide which hidden loss must be stopped first.

**Objective:** Find and rank hidden water and waste losses.

### Worth knowing first - exact player copy

#### Glossary terms

Leachate: polluted liquid draining through waste.

Anaerobic: without oxygen.

Point source: one identifiable outlet.

Nonpoint source: diffuse runoff.

Sewage treatment: primary settling, secondary bacterial breakdown, tertiary nutrient removal.

#### Primer concepts

- landfills generate methane and carbon dioxide; leachate can reach groundwater; prevention often costs less than treating exposure.

#### Equations first needed today
**Equation:** `loss=input-metered output`; used to find missing water.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** loss, input, metered, output, used, to, find, missing, water are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Tip trace unlocks Waterworks test. Mei initially watches visible waste; Nkemdi sees missing flow. Leachate pipe and distribution main illuminate as separate pathways.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Tip and Sorting Yard | `leachate-bench` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 7: TRACE THE HIDDEN EXPORTS OPEN

**Dialogue bubbles -** Mission lead: "Start with trace the hidden exports. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `leachate-bench` in Tip and Sorting Yard.

**Beat 2 - After Stop 25 | `leachate-bench` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 25 result to settle build the treatment chain."

**Unlocks/waypoint:** Unlock Stop 26 at `leachate-bench` in Tip and Sorting Yard.

**Beat 3 - After Stop 26 | `pipe-balance` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 26 result to settle close the water balance."

**Unlocks/waypoint:** Unlock Stop 27 at `pipe-balance` in Waterworks.

**Beat 4 - After Stop 27 | `council-table` | automatic**

**World state:** Synthesis: Stop 27 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 27 result to settle choose the repair priority."

**Unlocks/waypoint:** Unlock Stop 28 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `leachate-bench` | automatic**

**World state:** Decision and hook: Stop 28 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Tip trace unlocks Waterworks test. Mei initially watches visible waste; Nkemdi sees missing flow. Leachate pipe and distribution main illuminate as separate pathways.

## Characters and dramatic beat

Tip trace unlocks Waterworks test. Mei initially watches visible waste; Nkemdi sees missing flow. Leachate pipe and distribution main illuminate as separate pathways.

## Key concepts, explained here

landfills generate methane and carbon dioxide; leachate can reach groundwater; prevention often costs less than treating exposure.

## Stop 25 - Trace the hidden exports

**Format/placement:** TRACE, at `leachate-bench`.

**Metadata:** Concept: landfill pathways | pollution | D1 | RETRIEVE | L3 | clue; Keystone: landfill pathways | pollution | D1 | RETRIEVE | L3 | clue; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: landfill pathways | pollution | D1 | RETRIEVE | L3 | clue.

**Call - exact player copy:** Go to the leachate bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit trace the hidden exports until this evidence is resolved.

**Question card story setup - exact player copy:** The enforcement ledger counts waste delivered to the tip, but mass still leaves the cell. Trace rain, leachate, methane, carbon dioxide, and collected solids to their shared and independent pathways

**Question card story-science connection - exact player copy:** Trace the hidden exports connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Open five channels; identify the waste cell as the shared source and rain as independent; submit the groundwater-dependent leachate pathway

**Complete format-specific interaction block:** `trace:{channels:[{id:"rain",label:"rain entering the cell",dependency:"weather gauge",independent:true},{id:"leachate",label:"leachate outflow",dependency:"waste cell",target_dependent:true},{id:"methane",label:"methane outflow",dependency:"waste cell",target_dependent:true},{id:"carbon_dioxide",label:"carbon-dioxide outflow",dependency:"waste cell",target_dependent:true},{id:"collected_solids",label:"collected solids",dependency:"waste cell",target_dependent:true}],shared_upstream:"waste cell",correct_conclusion:"leachate is the groundwater path; rain is the independent input",answerText:"Four export channels share the waste cell, while rain is independent; leachate is the path carrying dissolved load toward groundwater."}`

**Correct result:** The uncapped cell affects both air and water

**Answer text:** The completed check shows the uncapped cell affects both air and water.

**Why:** Trace the hidden exports connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 26 - Build the treatment chain

**Format/placement:** CHAIN, at `leachate-bench`.

**Metadata:** Concept: sewage treatment | pollution | 7; Keystone: sewage treatment | pollution | 7; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: sewage treatment | pollution | 7.

**Call - exact player copy:** Go to the leachate bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit build the treatment chain until this evidence is resolved.

**Question card story setup - exact player copy:** Because leachate can enter groundwater, the treatment proposal must remove hazards in the right order. Build the wastewater path from solids removal through nutrient polishing before discharge, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Build the treatment chain connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Order intake, primary settle and skim, secondary bacterial treatment, tertiary nitrogen and phosphorus removal, and disinfection; leave dilution out as the decoy

**Complete format-specific interaction block:** `chain:{transfers:[{id:"intake",label:"collect raw wastewater",quantity:"wastewater flow and suspended solids"},{id:"primary",label:"settle and skim",quantity:"settleable solids and floating material"},{id:"secondary",label:"biological treatment",quantity:"dissolved organic load"},{id:"tertiary",label:"nutrient removal",quantity:"nitrogen and phosphorus load"},{id:"disinfection",label:"disinfect before discharge",quantity:"viable pathogen load"},{id:"dilution_decoy",label:"dilute untreated water",quantity:"water volume only",decoy:true}],keyed_order:["intake","primary","secondary","tertiary","disinfection"],decoys:["dilution_decoy"],governing_relationship:"contaminant load=flow×concentration",answerText:"Remove solids, organics, nutrients, and pathogens in order; dilution alone does not remove contaminant load."}`

**Correct result:** The five treatment stages are placed in causal order and dilution is rejected

**Answer text:** The completed check shows the five treatment stages are placed in causal order and dilution is rejected.

**Why:** Build the treatment chain connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 27 - Close the water balance

**Format/placement:** BALANCE, at `pipe-balance`.

**Metadata:** Concept: pipe loss | closed budgets | D2 | RETRIEVE | L2 | reveal; Keystone: pipe loss | closed budgets | D2 | RETRIEVE | L2 | reveal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: pipe loss | closed budgets | D2 | RETRIEVE | L2 | reveal.

**Call - exact player copy:** Go to the pipe balance bench, in Waterworks.

**Stop reason - exact player copy:** The island cannot commit close the water balance until this evidence is resolved.

**Question card story setup - exact player copy:** The tip pathway is real, but Waterworks reports a larger daily loss. Close the distribution ledger to calculate water that never reaches a billed tap, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Close the water balance connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Use unmetered loss=plant output-households-businesses-ferry-tank increase with 410, 285, 55, 12, and 8 m3/day; submit one loss in m3/day

**Complete format-specific interaction block:** `balance:{streams:[{id:"plant_output",direction:"in",value:410,unit:"m3/day",counts:true},{id:"households",direction:"out",value:285,unit:"m3/day",counts:true},{id:"businesses",direction:"out",value:55,unit:"m3/day",counts:true},{id:"ferry",direction:"out",value:12,unit:"m3/day",counts:true},{id:"tank_increase",direction:"storage",value:8,unit:"m3/day",counts:true},{id:"duplicate_billing_display",direction:"none",value:55,unit:"m3/day",counts:false,reason:"duplicate of the business meter"}],equation:"loss=plant-households-businesses-ferry-tank increase",correct:50,tolerance:1,answerText:"Unbilled loss is 50 m3/day; the duplicate billing display is not a second physical stream."}`

**Correct result:** The unmetered loss is 50 m3/day

**Answer text:** The completed check shows the unmetered loss is 50 m3/day.

**Why:** Close the water balance connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 28 - Choose the repair priority

**Format/placement:** VALUE, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: repair priority | policy | 7; Keystone: repair priority | policy | 7; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: repair priority | policy | 7.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit choose the repair priority until this evidence is resolved.

**Question card story setup - exact player copy:** The pipe loses 50 cubic metres each day, while leachate threatens the same aquifer over a longer path. Spend sixty repair credits without abandoning contamination control, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Choose the repair priority connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** From acoustic leak location 15, main repair 30, leachate liner test 15, cosmetic fence 12, and gas flare study 10, submit a plan costing at most 60 credits

**Complete format-specific interaction block:** `value:{budget:60,options:[{id:acoustic_location,cost:15,required:true},{id:main_repair,cost:30,required:true},{id:liner_test,cost:15,required:true},{id:cosmetic_fence,cost:12},{id:gas_flare_study,cost:10}],correct:[acoustic_location,main_repair,liner_test],total:60}`

**Correct result:** Locate and repair the main and test the leachate liner for exactly 60 credits

**Answer text:** The completed check shows locate and repair the main and test the leachate liner for exactly 60 credits.

**Why:** Choose the repair priority connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Repair the liner and treatment chain. Count the 50 cubic metres lost each day. The leak is real. Next, trace where school nitrate enters the system.

### Post-mission metric screen - exact player copy

target 13:00; hidden loss stopped, Reserve +5; QA 90/90/47/45 after Water9 Reserve2. Takeaway: trace sources and close ledgers before buying new supply.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 8 - The School-Water Finding

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 8 DAYS.

**Card title:** THE SCHOOL-WATER FINDING

**Go now:** Waterworks, Nkemdi at `store-gauges`.

**Card body:** The main repair restored water quantity, yet the school tap still carries more nitrate than the distribution main. Dose depends on concentration, intake, and body size, so children face the largest burden. Compare network samples, then verify the school tap. By the end of the mission, decide the nitrate source and immediate protection.

**Objective:** Identify the school exposure pathway.

### Worth knowing first - exact player copy

#### Glossary terms

Dose: amount of a substance received per body mass.

Threshold response: effect begins above a dose.

Bioavailability: fraction absorbed. LD50: dose lethal to half a test population; lower means more toxic.

#### Primer concepts

- dose-response often forms an S-curve; children can receive larger mass-normalized dose; source location follows spatial patterns.

#### Equations first needed today
**Equation:** `dose=concentration×intake/body mass`; used for child/adult comparison.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** dose, concentration, intake, body, mass, used, for, child, adult, comparison are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Evidence at the first location unlocks the next causally necessary location; the fourth stop commits the mission decision.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `store-gauges` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 8: PROBE THE NITRATE NETWORK OPEN

**Dialogue bubbles -** Mission lead: "Start with probe the nitrate network. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `store-gauges` in Waterworks.

**Beat 2 - After Stop 29 | `register-desk` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 29 result to settle compare child and adult dose."

**Unlocks/waypoint:** Unlock Stop 30 at `register-desk` in Island School.

**Beat 3 - After Stop 30 | `school-tap` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 30 result to settle verify the garden source."

**Unlocks/waypoint:** Unlock Stop 31 at `school-tap` in Island School.

**Beat 4 - After Stop 31 | `school-tap` | automatic**

**World state:** Synthesis: Stop 31 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 31 result to settle set the school action level."

**Unlocks/waypoint:** Unlock Stop 32 at `school-tap` in Island School.

**Beat 5 - At mission end | `store-gauges` | automatic**

**World state:** Decision and hook: Stop 32 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Evidence at the first location unlocks the next causally necessary location; the fourth stop commits the mission decision.

## Characters and dramatic beat

Evidence at the first location unlocks the next causally necessary location; the fourth stop commits the mission decision.

## Key concepts, explained here

dose-response often forms an S-curve; children can receive larger mass-normalized dose; source location follows spatial patterns.

## Stop 29 - Probe the nitrate network

**Format/placement:** PROBE, at `store-gauges`.

**Metadata:** Concept: nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence; Keystone: nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The island cannot commit probe the nitrate network until this evidence is resolved.

**Question card story setup - exact player copy:** The repaired main removes quantity loss but not the nitrate gradient. Probe the source, junction, school branch, harbour branch, and school tap to locate the first increase, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Probe the nitrate network connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Probe all five stations, compare each station reading with its own expected 6.0-6.5 mg/L range and displayed load at 2.0 L/min, and submit the first break plus source conclusion

**Complete format-specific interaction block:** `probe:{stations:[{id:source,reading:6.1,expected:[6.0,6.5],flow:2.0,load:12.2},{id:junction,reading:6.2,expected:[6.0,6.5],flow:2.0,load:12.4},{id:school_branch,reading:8.4,expected:[6.0,6.5],flow:2.0,load:16.8},{id:harbour_branch,reading:6.3,expected:[6.0,6.5],flow:2.0,load:12.6},{id:school_tap,reading:11.2,expected:[6.0,6.5],flow:2.0,load:22.4}],units:{reading:"mg/L",flow:"L/min",load:"mg/min"},correct_station:school_branch,correct_conclusion:local_school_branch_source}`

**Correct result:** The first break is the school branch; the source is local

**Answer text:** The completed check shows the first break is the school branch; the source is local.

**Why:** Probe the nitrate network connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 30 - Compare child and adult dose

**Format/placement:** BALLPARK, at `register-desk`.

**Metadata:** Concept: dose | pollution | 8; Keystone: dose | pollution | 8; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: dose | pollution | 8.

**Call - exact player copy:** Go to the register desk, in Island School.

**Stop reason - exact player copy:** The island cannot commit compare child and adult dose until this evidence is resolved.

**Question card story setup - exact player copy:** Because the increase begins on the school branch, concentration alone understates who is at risk. Calculate daily nitrate dose for a child and an adult, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Compare child and adult dose connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Apply dose=concentration*intake/body mass using 11.2 mg/L, child 1.0 L/day and 20 kg, adult 2.0 L/day and 70 kg; submit the pair in mg/kg/day

**Complete format-specific interaction block:** `estimate:{equation:"dose=C*intake/mass",cases:{child:{C:11.2,intake:1.0,mass:20},adult:{C:11.2,intake:2.0,mass:70}},unit:"mg/kg/day",truth:[0.56,0.32],tolerance:0.01}`

**Correct result:** Child dose is 0.56 and adult dose 0.32 mg/kg/day; the child dose is 75% higher

**Answer text:** The completed check shows child dose is 0.56 and adult dose 0.32 mg/kg/day; the child dose is 75% higher.

**Why:** Compare child and adult dose connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** s who is at risk. Calculate daily nitrate dose for a child and an adult.” Prompt: Apply dose=concentration*intake/body mass using 11.2 mg/L, child 1.0 L/day and 20 kg, adult 2.0 L/day and 70 kg; submit the pair in mg/kg/day. Payload: `estimate:{equation:"dose=C*intake/mass",cases:{child:{C:11.2,intake:1.0,mass:20},adult:{C:11.2,intake:2.0,mass:70}},unit:"mg/kg/day",truth:[0.56,0.32],tolerance:0.01}`

## Stop 31 - Verify the garden source

**Format/placement:** VERIFY, at `school-tap`.

**Metadata:** Concept: source timing | causality | D3 | RETRIEVE | L4 | twist; Keystone: source timing | causality | D3 | RETRIEVE | L4 | twist; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: source timing | causality | D3 | RETRIEVE | L4 | twist.

**Call - exact player copy:** Go to the school tap, in Island School.

**Stop reason - exact player copy:** The island cannot commit verify the garden source until this evidence is resolved.

**Question card story setup - exact player copy:** The dose comparison makes the school tap urgent, while the branch location narrows the source. Predict dilution, isolate the garden connection, measure, interpret, and restore normal flow, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** , measure, interpret, and restore normal flow

**Question card prompt - exact player copy:** CALCULATE AND COMMIT the equal-volume mix of 11.2 and 6.0 mg/L; OPERATE by closing only the garden valve; MEASURE nitrate; INTERPRET the source; restore the valve and remeasure baseline

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_commit,operate,measure,interpret],operate_unlocked_when:prediction_committed,prediction:{equation:"Cmix=(C1V1+C2V2)/(V1+V2)",inputs:{C1:11.2,C2:6.0,V1:1.0,V2:1.0},units:{C:"mg/L",V:L},truth:8.6,tolerance:0.1},operate:{changed:garden_valve,setting:closed,fixed:[pump_state,sampling_time,tap_flow]},measure:{nitrate:{value:6.2,unit:"mg/L"}},interpret:{correct:local_garden_input},restore:{required:true,setting:open,remeasured_baseline:{value:11.2,unit:"mg/L"}}}`

**Correct result:** Prediction is 8.6 mg/L; isolation measures 6.2 mg/L and identifies the local garden input

**Answer text:** The completed check shows prediction is 8.6 mg/L; isolation measures 6.2 mg/L and identifies the local garden input.

**Why:** , measure, interpret, and restore normal flow

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 32 - Set the school action level

**Format/placement:** TRIGGER, at `school-tap`.

**Metadata:** Concept: public-health action | policy | 8; Keystone: public-health action | policy | 8; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: public-health action | policy | 8.

**Call - exact player copy:** Go to the school tap, in Island School.

**Stop reason - exact player copy:** The island cannot commit set the school action level until this evidence is resolved.

**Question card story setup - exact player copy:** The controlled isolation identifies the garden connection, but children need a rule before repairs finish. Commit an inclusive action level before new samples appear, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** , but children need a rule before repairs finish. Commit an inclusive action level before new samples appear

**Question card prompt - exact player copy:** Set replacement water when nitrate is greater than or equal to 10.0 mg/L; apply it to 11.2, 9.8, and 10.0 mg/L

**Complete format-specific interaction block:** `trigger:{rule:"replacement water when nitrate>=threshold",threshold:10.0,unit:"mg/L",scale:[0,15],anchors:[6,8,10,12],updates:[11.2,9.8,10.0],correct_actions:[act,no_act,act]}`

**Correct result:** Act at 11.2 and 10.0 mg/L; do not act at 9.8 mg/L

**Answer text:** The completed check shows act at 11.2 and 10.0 mg/L; do not act at 9.8 mg/L.

**Why:** , but children need a rule before repairs finish. Commit an inclusive action level before new samples appear

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: The garden caused the school nitrate spike. Use safe water when nitrate reaches 10.0 mg/L. Isolation lowers the tap to 6.2 mg/L. New farm and waste rules must stop another pulse.

### Post-mission metric screen - exact player copy

target 14:00; school protected, Water +5; QA 90/95/58/45 after 11 Reserve. Takeaway: risk depends on source, pathway, concentration, intake, and body size.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 9 - Waste and Land-Use Controls

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 7 DAYS.

**Card title:** WASTE AND LAND-USE CONTROLS

**Go now:** Tip, Mei at `weighbridge`.

**Card body:** The school spike came from a local nutrient pulse, not added visitors. Waste and farming can release the same pollutants through different routes, so controls must begin at each source. Classify the tip loads, then revise practices at the Common. By the end of the mission, choose waste and land-use controls that protect water without ending food production.

**Objective:** Cut pollution at source.

### Worth knowing first - exact player copy

#### Glossary terms

Bioaccumulation: pollutant buildup within one organism.

Biomagnification: rising concentration at higher trophic levels.

Persistent organic pollutant: long-lived carbon chemical such as DDT or PCB.

Eutrophication: nutrient enrichment leading to algae and oxygen loss.

#### Primer concepts

- heavy metals damage nerves/kidneys; endocrine disruptors impair development; microplastic effects remain uncertain; mining can cause acid drainage; clearcutting increases erosion.

#### Equations first needed today
**Equation:** no new equation; retrieve load=flow×concentration and nutrient balance.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** no, new, equation, retrieve, load, flow, concentration, and, nutrient, balance are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Tip classification unlocks Common source controls. Mei and Iona accept shared responsibility after pathway evidence.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Tip and Sorting Yard | `weighbridge` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 9: SORT THE MIXED WASTE OPEN

**Dialogue bubbles -** Mission lead: "Start with sort the mixed waste. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `weighbridge` in Tip and Sorting Yard.

**Beat 2 - After Stop 33 | `tip-lab-bench` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 33 result to settle map source and fate."

**Unlocks/waypoint:** Unlock Stop 34 at `tip-lab-bench` in Tip and Sorting Yard.

**Beat 3 - After Stop 34 | `council-table` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 34 result to settle control the compost process."

**Unlocks/waypoint:** Unlock Stop 35 at `council-table` in Chapel Council Room.

**Beat 4 - After Stop 35 | `council-table` | automatic**

**World state:** Synthesis: Stop 35 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 35 result to settle fund source controls."

**Unlocks/waypoint:** Unlock Stop 36 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `weighbridge` | automatic**

**World state:** Decision and hook: Stop 36 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Tip classification unlocks Common source controls. Mei and Iona accept shared responsibility after pathway evidence.

## Characters and dramatic beat

Tip classification unlocks Common source controls. Mei and Iona accept shared responsibility after pathway evidence.

## Key concepts, explained here

heavy metals damage nerves/kidneys; endocrine disruptors impair development; microplastic effects remain uncertain; mining can cause acid drainage; clearcutting increases erosion.

## Stop 33 - Sort the mixed waste

**Format/placement:** BELT, at `weighbridge`.

**Metadata:** Concept: pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence; Keystone: pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence.

**Call - exact player copy:** Go to the weighbridge, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit sort the mixed waste until this evidence is resolved.

**Question card story setup - exact player copy:** The school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort each arrival by its pollutant class before treatment begins, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Sort the mixed waste connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Classify fertilizer, a lead battery, a PCB transformer, hormone medicines, and plastic fragments

**Complete format-specific interaction block:** `belt:{categories:[nutrient,heavy_metal,persistent_organic_pollutant,endocrine_active_drug,microplastic],items:{fertilizer:nutrient,lead_battery:heavy_metal,PCB_transformer:persistent_organic_pollutant,hormones:endocrine_active_drug,plastic_fragments:microplastic},misses_allowed:2}`

**Correct result:** All five loads are separated by persistence and biological effect

**Answer text:** The completed check shows all five loads are separated by persistence and biological effect.

**Why:** Sort the mixed waste connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 34 - Map source and fate

**Format/placement:** CASEBOOK, at `tip-lab-bench`.

**Metadata:** Concept: point and nonpoint fate | pollution | 9; Keystone: point and nonpoint fate | pollution | 9; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: point and nonpoint fate | pollution | 9.

**Call - exact player copy:** Go to the tip lab bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit map source and fate until this evidence is resolved.

**Question card story setup - exact player copy:** With hazards classified, their locations reveal different controls. Match each source or fate pattern before selecting treatment, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Map source and fate connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Map pipe discharge, field runoff, landfill leachate, and fish mercury to point source, nonpoint source, groundwater pathway, and biomagnification

**Complete format-specific interaction block:** `casebook:{mapping:{pipe_discharge:point_source,field_runoff:nonpoint_source,landfill_leachate:groundwater_pathway,fish_mercury:biomagnification}}`

**Correct result:** All four pollutants are linked to the pathway their control must intercept

**Answer text:** The completed check shows all four pollutants are linked to the pathway their control must intercept.

**Why:** Map source and fate connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 35 - Control the compost process

**Format/placement:** CONTROL, at `council-table`.

**Metadata:** Concept: compost process | causality | D3 | RETRIEVE | L3 | evidence; Keystone: compost process | causality | D3 | RETRIEVE | L3 | evidence; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: compost process | causality | D3 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit control the compost process until this evidence is resolved.

**Question card story setup - exact player copy:** The pathway map favors prevention, and compost could replace imported fertilizer if its process is stable. Change aeration alone, measure, restore baseline, and repeat, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Control the compost process connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Measure at 1 exchange/hour after 24 hours; change only aeration to 3 exchanges/hour with moisture 55%, feed mix 1:1, mass 500 kg, and time fixed; restore 1 and remeasure; submit the causal conclusion

**Complete format-specific interaction block:** `control:{candidates:[{id:"aeration",label:"aeration rate"},{id:"moisture",label:"moisture"},{id:"feed_mix",label:"feed mix"}],correct_control:"aeration",baseline:{aeration:1,temperature_C:38,odor_index:8},response:{aeration:3,temperature_C:58,odor_index:2},noise_band:{temperature_C:1,odor_index:0.5},fixed:["moisture 55%","feed mix 1:1","mass 500 kg","24 h timing"],measure_when:"after 24 hours",restore:{required:true,aeration:1,remeasure_after_hours:24},correct_conclusion:"aeration improves aerobic decomposition",answerText:"Higher aeration raises compost temperature and lowers odor beyond noise; restoration confirms aeration caused the response."}`

**Correct result:** Greater aeration raises temperature from 38 C to 58 C and lowers odor from 8 to 2, supporting aerobic decomposition

**Answer text:** The completed check shows greater aeration raises temperature from 38 C to 58 C and lowers odor from 8 to 2, supporting aerobic decomposition.

**Why:** Control the compost process connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 36 - Fund source controls

**Format/placement:** ALLOCATE, at `council-table`.

**Metadata:** Concept: integrated controls | policy | 9; Keystone: integrated controls | policy | 9; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: integrated controls | policy | 9.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit fund source controls until this evidence is resolved.

**Question card story setup - exact player copy:** The compost test supplies a safer nutrient source, while the casebook locates remaining pathways. Allocate one hundred control points across confirmed sources, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Fund source controls connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Fund liner and cap 25, tertiary nutrient removal 25, IPM 20, drip irrigation 15, and rain garden 15; reject clearcut subsidy 25 and blanket pesticide 20

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"liner_cap",cost:25,required:true},{id:"tertiary",cost:25,required:true},{id:"IPM",cost:20,required:true},{id:"drip",cost:15,required:true},{id:"rain_garden",cost:15,required:true},{id:"clearcut_subsidy",cost:25,required:false},{id:"blanket_pesticide",cost:20,required:false}],questions:[{id:"waste",text:"Does the plan block landfill and sewage sources?",required:true},{id:"farm",text:"Does it reduce fertilizer and pesticide transport?",required:true},{id:"runoff",text:"Does it intercept stormwater before the reef?",required:true}],correct_allocation:{liner_cap:25,tertiary:25,IPM:20,drip:15,rain_garden:15},answerText:"Spend all 100 points on the five source controls; the two optional subsidies do not address the confirmed pathways."}`

**Correct result:** The five source controls use all 100 points

**Answer text:** The completed check shows the five source controls use all 100 points.

**Why:** Fund source controls connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Line the waste cell and cut sewage nutrients. Use drip lines, IPM, and rain gardens. These steps stop waste near its source. The reef still loses oxygen in warm, nitrate-rich weeks.

### Post-mission metric screen - exact player copy

target 13:00; controls posted, Trust +5; QA 90/95/69/50 after 11 Reserve. Takeaway: match each pollutant's source, pathway, persistence, and effect to its control.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 10 - The Reef Evidence

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 6 DAYS.

**Card title:** THE REEF EVIDENCE

**Go now:** Reef Station, Rafi Noor at `water-rack`.

**Card body:** Source controls are ready, but the reef record shows low oxygen during warm, nutrient-rich weeks. Warm water holds less oxygen, while excess nitrogen and phosphorus feed algae whose decay consumes more. Compare the bay record, then test both drivers at the harbour review. By the end of the mission, decide which reef pressures the ferry conditions must reduce.

**Objective:** Separate and combine reef stressors.

### Worth knowing first - exact player copy

#### Glossary terms

Dissolved oxygen: oxygen gas available in water.

Thermal pollution: warming that lowers oxygen solubility.

Ocean acidification: falling seawater pH as carbon dioxide enters water.

Dead zone: water with too little oxygen for most animals.

#### Primer concepts

- photic shallow water supports algae; eutrophication proceeds nutrients->bloom->decay->anoxia; acidification harms calcium-carbonate shells.

#### Equations first needed today
**Equation:** no new equation; retrieve logistic limits, 10% energy flow, and controlled comparison.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** no, new, equation, retrieve, logistic, limits, energy, flow, and, controlled, comparison are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Reef time series yields predictions; Harbour landings provide independent biological effect. Rafi abandons heat-only explanation.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `sampler` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 10: READ THE PATTERNED RESIDUALS OPEN

**Dialogue bubbles -** Mission lead: "Start with read the patterned residuals. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `sampler` in Waterworks.

**Beat 2 - After Stop 37 | `flow-tank` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 37 result to settle control heat and nutrients."

**Unlocks/waypoint:** Unlock Stop 38 at `flow-tank` in Reef Station.

**Beat 3 - After Stop 38 | `transect-bench` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 38 result to settle map acidification damage."

**Unlocks/waypoint:** Unlock Stop 39 at `transect-bench` in Reef Station.

**Beat 4 - After Stop 39 | `council-table` | automatic**

**World state:** Synthesis: Stop 39 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 39 result to settle stress the catch ceiling."

**Unlocks/waypoint:** Unlock Stop 40 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `sampler` | automatic**

**World state:** Decision and hook: Stop 40 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Reef time series yields predictions; Harbour landings provide independent biological effect. Rafi abandons heat-only explanation.

## Characters and dramatic beat

Reef time series yields predictions; Harbour landings provide independent biological effect. Rafi abandons heat-only explanation.

## Key concepts, explained here

photic shallow water supports algae; eutrophication proceeds nutrients->bloom->decay->anoxia; acidification harms calcium-carbonate shells.

## Stop 37 - Read the patterned residuals

**Format/placement:** RESIDUAL, at `sampler`.

**Metadata:** Concept: temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue; Keystone: temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue.

**Call - exact player copy:** Go to the independent sampler, in Waterworks.

**Stop reason - exact player copy:** The island cannot commit read the patterned residuals until this evidence is resolved.

**Question card story setup - exact player copy:** The new controls target nutrients, but Rafi’s heat-only model fits the average oxygen level. Compare residual patterns to test whether its errors grow after nitrate pulses, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Read the patterned residuals connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Compare heat-only residuals [0,0,-2,-2] with heat-plus-nitrate residuals [0.2,-0.1,0.1,-0.2] and submit the model without a patterned error

**Complete format-specific interaction block:** `residual:{models:{heat_only:{residuals:[0,0,-2,-2]},heat_plus_nitrate:{residuals:[0.2,-0.1,0.1,-0.2]}},correct:heat_plus_nitrate}`

**Correct result:** Heat plus nitrate survives; the heat-only errors track nitrate pulses

**Answer text:** The completed check shows heat plus nitrate survives; the heat-only errors track nitrate pulses.

**Why:** Read the patterned residuals connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 38 - Control heat and nutrients

**Format/placement:** CONTROL, at `flow-tank`.

**Metadata:** Concept: factorial stressors | causality | D9 | COMBINE | L4 | reveal; Keystone: factorial stressors | causality | D9 | COMBINE | L4 | reveal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: factorial stressors | causality | D9 | COMBINE | L4 | reveal.

**Call - exact player copy:** Go to the flow tank, in Reef Station.

**Stop reason - exact player copy:** The island cannot commit control heat and nutrients until this evidence is resolved.

**Question card story setup - exact player copy:** Because patterned errors follow nitrate pulses, test temperature and nitrate separately and together. Keep all other tank conditions fixed and restore the baseline after every treatment, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Control heat and nutrients connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Measure the baseline at 24 C and 1 mg/L nitrate. Change temperature only to 28 C, change nitrate only to 8 mg/L, then change both while light, flow, fragment size, salinity 35 ppt, and six-week timing remain fixed; measure oxygen and coral cover after each run, restore baseline and remeasure, then submit the interaction conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"temperature",label:"temperature"},{id:"nitrate",label:"nitrate concentration"},{id:"salinity",label:"salinity"}],selected_controls:["temperature","nitrate"],baseline:{temperature_C:24,nitrate_mgL:1,DO_mgL:7.5,cover_pct:80},responses:[{temperature_C:28,nitrate_mgL:1,DO_mgL:6.3,cover_pct:70},{temperature_C:24,nitrate_mgL:8,DO_mgL:5.8,cover_pct:62},{temperature_C:28,nitrate_mgL:8,DO_mgL:3.1,cover_pct:30}],noise_band:{DO_mgL:0.2,cover_pct:2},fixed:["light","flow","fragment size","salinity 35 ppt","six-week timing"],measure_when:"after six weeks",restore:{required:true,temperature_C:24,nitrate_mgL:1,DO_mgL:7.5,cover_pct:80,remeasure:true},correct_conclusion:"heat and nutrients interact",answerText:"Heat and nitrate together depress oxygen and coral cover more than either treatment alone, and restoration returns the baseline."}`

**Correct result:** The combined treatment yields 3.1 mg/L oxygen and 30% cover, showing heat and nutrients interact

**Answer text:** The completed check shows the combined treatment yields 3.1 mg/L oxygen and 30% cover, showing heat and nutrients interact.

**Why:** Control heat and nutrients connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 39 - Map acidification damage

**Format/placement:** CLOUD, at `transect-bench`.

**Metadata:** Concept: aquatic zones and acidification | biodiversity | D3 | RETRIEVE | L3 | evidence; Keystone: aquatic zones and acidification | biodiversity | D3 | RETRIEVE | L3 | evidence; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: aquatic zones and acidification | biodiversity | D3 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the transect bench, in Reef Station.

**Stop reason - exact player copy:** The island cannot commit map acidification damage until this evidence is resolved.

**Question card story setup - exact player copy:** The tank reveals combined heat and nutrients, yet shell loss occurs beyond the inner bloom. Place pH and calcifier-cover distributions across the reef zones, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Map acidification damage connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Fit pH [8.15,8.05,7.95] and cover [70,55,35] across littoral, pelagic, and benthic observations; submit acidification as the mechanism

**Complete format-specific interaction block:** `cloud:{zones:[littoral,pelagic,benthic],pH:[8.15,8.05,7.95],calcifier_cover_pct:[70,55,35],tolerance_pH:0.03,correct:ocean_acidification}`

**Correct result:** Falling pH accompanies falling calcifier cover; acidification explains the shell loss

**Answer text:** The completed check shows falling pH accompanies falling calcifier cover; acidification explains the shell loss.

**Why:** Map acidification damage connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 40 - Stress the catch ceiling

**Format/placement:** STRESS, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: sustainable plan | population limits | D5 | TRANSFER | L5 | decision; Keystone: sustainable plan | population limits | D5 | TRANSFER | L5 | decision; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: sustainable plan | population limits | D5 | TRANSFER | L5 | decision.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit stress the catch ceiling until this evidence is resolved.

**Question card story setup - exact player copy:** The reef now faces nutrient, heat, fishing, and acidification pressure. Stress the catch ceiling across uncertain nursery recruitment, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Stress the catch ceiling connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Move recruitment from 80 to 130 fish and select among a fixed 100-fish catch, 70-fish precautionary catch, 130-fish catch, or no cap; submit the ceiling that stays below replacement

**Complete format-specific interaction block:** `stress:{assumption:nursery_recruits,range:[80,130],candidates:[{id:fixed_100,value:100},{id:precautionary_70,value:70},{id:catch_130,value:130},{id:no_cap,value:null}],correct:precautionary_70}`

**Correct result:** Use 70 fish in low-recruitment years

**Answer text:** The completed check shows use 70 fish in low-recruitment years.

**Why:** Stress the catch ceiling connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Cut runoff, warm water, air waste, and fishing at the same time. Cap catch at 70 fish in poor years. Heat alone did not harm the reef. The plan must protect the full habitat.

### Post-mission metric screen - exact player copy

target 15:00; reef evidence accepted, Evidence +5; QA 95/95/80/50 after 11 Reserve. Takeaway: interacting stressors can cause more harm than either one alone.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 11 - Energy and Emissions Ledger

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 5 DAYS.

**Card title:** ENERGY AND EMISSIONS LEDGER

**Go now:** Turbine Yard, Elias Shaw at `meter-board`.

**Card body:** Reef conditions now include climate and warm-water pressure, so ferry power cannot be judged by supply alone. Nameplate output differs from annual output, and each fuel releases different pollution. Meter demand, trace emissions through the tip, then cost controls at the Common. By the end of the mission, choose the energy mix the plan can honestly support.

**Objective:** Close the useful-energy and pollution ledger.

### Worth knowing first - exact player copy

#### Glossary terms

Capacity factor: actual energy divided by maximum possible energy.

EROI: energy returned divided by energy invested.

Primary pollutant: emitted directly.

Secondary pollutant: formed in air.

Thermal inversion: warm air trapping cooler polluted air below.

#### Primer concepts

- coal has highest CO2/SO2/Hg; oil/gas are portable but spill and emit; nuclear is low-carbon with costly long-lived waste; renewables are low-carbon but need land, storage, or backup.
- Weather is short-term; climate is a 30+ year average.

#### Equations first needed today
**Equation:** `capacity factor=actual kWh/(rated kW×8760 h)`;

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** capacity, factor, actual, kWh, rated, kW, h are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `efficiency=useful output/input`;

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** efficiency, useful, output, input are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `EROI=energy returned/energy invested`.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** EROI, energy, returned, invested are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Turbine output and demand unlock Tip fuel/waste records; pollutant totals unlock Common efficiency choices. Elias's “250 kW” claim becomes 31% annual factor. A three-column ledger persists.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Turbine Yard | `meter-board` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 11: CLOSE THE PEAK-POWER LEDGER OPEN

**Dialogue bubbles -** Mission lead: "Start with close the peak-power ledger. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `meter-board` in Turbine Yard.

**Beat 2 - After Stop 41 | `turbine-plate` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 41 result to settle calculate capacity factor."

**Unlocks/waypoint:** Unlock Stop 42 at `turbine-plate` in Turbine Yard.

**Beat 3 - After Stop 42 | `tip-lab-bench` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 42 result to settle match pollutants and controls."

**Unlocks/waypoint:** Unlock Stop 43 at `tip-lab-bench` in Tip and Sorting Yard.

**Beat 4 - After Stop 43 | `delivery-board` | automatic**

**World state:** Synthesis: Stop 43 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 43 result to settle fund the energy portfolio."

**Unlocks/waypoint:** Unlock Stop 44 at `delivery-board` in Common Office.

**Beat 5 - At mission end | `meter-board` | automatic**

**World state:** Decision and hook: Stop 44 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Turbine output and demand unlock Tip fuel/waste records; pollutant totals unlock Common efficiency choices. Elias's “250 kW” claim becomes 31% annual factor. A three-column ledger persists.

## Characters and dramatic beat

Turbine output and demand unlock Tip fuel/waste records; pollutant totals unlock Common efficiency choices. Elias's “250 kW” claim becomes 31% annual factor. A three-column ledger persists.

## Key concepts, explained here

coal has highest CO2/SO2/Hg; oil/gas are portable but spill and emit; nuclear is low-carbon with costly long-lived waste; renewables are low-carbon but need land, storage, or backup. Weather is short-term; climate is a 30+ year average.

## Stop 41 - Close the peak-power ledger

**Format/placement:** BALANCE, at `meter-board`.

**Metadata:** Concept: demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation; Keystone: demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation.

**Call - exact player copy:** Go to the meter board, in Turbine Yard.

**Stop reason - exact player copy:** The island cannot commit close the peak-power ledger until this evidence is resolved.

**Question card story setup - exact player copy:** The reef conditions add new electric loads, while essential evening demand must remain firm. Close the peak ledger before selecting any generator or storage plan, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Close the peak-power ledger connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Using 310 kW supply and simultaneous loads of 160, 55, 20, 15, and 45 kW, apply reserve=supply-loads and submit one reserve in kW

**Complete format-specific interaction block:** `balance:{streams:[{id:"available_supply",direction:"in",value:310,unit:"kW",counts:true},{id:"homes",direction:"out",value:160,unit:"kW",counts:true},{id:"water",direction:"out",value:55,unit:"kW",counts:true},{id:"school",direction:"out",value:20,unit:"kW",counts:true},{id:"tip",direction:"out",value:15,unit:"kW",counts:true},{id:"ferry",direction:"out",value:45,unit:"kW",counts:true},{id:"nameplate_capacity",direction:"none",value:400,unit:"kW",counts:false,reason:"not available supply during the outage"}],equation:"reserve=available supply-sum active loads",correct:15,tolerance:1,answerText:"The active-load reserve is 15 kW; unavailable nameplate capacity does not count."}`

**Correct result:** The reserve is 15 kW

**Answer text:** The completed check shows the reserve is 15 kW.

**Why:** Close the peak-power ledger connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 42 - Calculate capacity factor

**Format/placement:** BALLPARK, at `turbine-plate`.

**Metadata:** Concept: capacity factor | energy | 11; Keystone: capacity factor | energy | 11; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: capacity factor | energy | 11.

**Call - exact player copy:** Go to the turbine plate, in Turbine Yard.

**Stop reason - exact player copy:** The island cannot commit calculate capacity factor until this evidence is resolved.

**Question card story setup - exact player copy:** The peak ledger leaves only fifteen kilowatts, and the turbine plate promises 250 kilowatts. Replace nameplate power with annual performance, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Calculate capacity factor connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Apply capacity factor=680000 kWh/(250 kW*8760 h); submit one percent

**Complete format-specific interaction block:** `estimate:{equation:"680000/(250*8760)*100",inputs:{actual_kWh:680000,rated_kW:250,hours:8760},truth:31.1,unit:percent,tolerance:0.2}`

**Correct result:** Capacity factor is 31.1%

**Answer text:** The completed check shows capacity factor is 31.1%.

**Why:** Calculate capacity factor connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 43 - Match pollutants and controls

**Format/placement:** CASEBOOK, at `tip-lab-bench`.

**Metadata:** Concept: air pollution | atmosphere and climate | 11; Keystone: air pollution | atmosphere and climate | 11; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: air pollution | atmosphere and climate | 11.

**Call - exact player copy:** Go to the tip lab bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit match pollutants and controls until this evidence is resolved.

**Question card story setup - exact player copy:** Because nameplate power overstates wind supply, backup fuels remain in the plan. Match each pollutant to its source, effect, and control, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Match pollutants and controls connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Match CO, SO2, NOx, PM, and ground-level ozone to their printed mechanisms and controls

**Complete format-specific interaction block:** `casebook:{mapping:{CO:[incomplete_combustion,reduced_blood_oxygen,catalytic_converter],SO2:[coal,acid_rain,scrubber],NOx:[combustion,photochemical_smog,catalyst],PM:[dust_and_combustion,cardiorespiratory_harm,electrostatic_precipitator],ground_ozone:[photochemistry,respiratory_harm,precursor_control]}}`

**Correct result:** All five pollutant chains are matched

**Answer text:** The completed check shows all five pollutant chains are matched.

**Why:** Match pollutants and controls connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** s wind supply, backup fuels remain in the plan. Match each pollutant to its source, effect, and control.” Prompt: Match CO, SO2, NOx, PM, and ground-level ozone to their printed mechanisms and controls. Payload: `casebook:{mapping:{CO:[incomplete_combustion,reduced_blood_oxygen,catalytic_converter],SO2:[coal,acid_rain,scrubber],NOx:[combustion,photochemical_smog,catalyst],PM:[dust_and_combustion,cardiorespiratory_harm,electrostatic_precipitator],ground_ozone:[photochemistry,respiratory_harm,precursor_control]}}`

## Stop 44 - Fund the energy portfolio

**Format/placement:** SCIENCETANK, asked by Mara Voss beside `delivery-board`.

**Metadata:** Concept: energy portfolio | energy and policy | 11; Keystone: energy portfolio | energy and policy | 11; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: energy portfolio | energy and policy | 11.

**Call - exact player copy:** Talk to Mara Voss, at the delivery board in Common Office.

**Stop reason - exact player copy:** The island cannot commit fund the energy portfolio until this evidence is resolved.

**Question card story setup - exact player copy:** Actual wind output and backup pollution are now counted together. Spend one hundred planning points on firm supply and controls, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Fund the energy portfolio connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Fund insulation 20, LEDs 10, battery 25, wind repair 25, and backup pollution controls 20; reject diesel expansion 40 and unfirmed solar 35

**Complete format-specific interaction block:** `sciencetank:{pool:100,proposals:[insulation20,LED10,battery25,wind_repair25,pollution_controls20,diesel_expansion40,unfirmed_solar35],recommended:[insulation20,LED10,battery25,wind_repair25,pollution_controls20]}`

**Correct result:** The five-part portfolio totals 100 and preserves firm reserve

**Answer text:** The completed check shows the five-part portfolio totals 100 and preserves firm reserve.

**Why:** Fund the energy portfolio connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Use repaired wind, storage, and less power. Keep a clean backup for short gaps. This mix saves the 15-kilowatt reserve. A methane leak now puts that reserve at risk.

### Post-mission metric screen - exact player copy

target 15:00; ledger closed, Reserve +5; QA 95/95/95/51 after Reserve10 Trust1. Takeaway: compare actual output, firm demand, efficiency, pollution, and EROI.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 12 - The Leak and Turbine Case

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 4 DAYS.

**Card title:** THE LEAK AND TURBINE CASE

**Go now:** Turbine Yard, Elias Shaw at `gearbox-crate`.

**Card body:** The energy mix works on paper, but the wind gearbox needs eleven weeks and methane is escaping at the tip. Methane can fuel backup power, yet leaks can erase its climate benefit. Verify turbine timing, measure gas at the tip, then protect water operations. By the end of the mission, decide the firm-power bridge for ferry day.

**Objective:** Lock a feasible low-emission power bridge.

### Worth knowing first - exact player copy

#### Glossary terms

Greenhouse gas: gas that absorbs outgoing heat.

Global warming potential: heat trapped relative to carbon dioxide.

Half-life: time for half a radioactive sample to decay.

Base load: power available steadily.

#### Primer concepts

- CH4 GWP about 28-36 over 100 years and lasts about 12 years; CO2 GWP 1 but lasts centuries to millennia; N2O GWP 265-310 and lasts 121 years.
- Nuclear fission releases heat; U-235 half-life 704 million years, Cs-137 30 years, I-131 8 days.

#### Equations first needed today
**Equation:** `emissions=activity×emission factor`; needed to compare bridge plans.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** emissions, activity, emission, factor, needed, to, compare, bridge, plans are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Turbine feasibility unlocks Tip gas measurement; confirmed capture unlocks Waterworks essential-load allocation. Apparent victory arrives when firm plan locks, then gearbox delay remains visible.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Chapel Council Room | `council-table` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 12: AUDIT THE GEARBOX SCHEDULE OPEN

**Dialogue bubbles -** Mara Voss: "Start with audit the gearbox schedule. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 45 at `council-table` in Chapel Council Room.

**Beat 2 - After Stop 45 | `gas-rack` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 45 result to settle verify methane capture."

**Unlocks/waypoint:** Unlock Stop 46 at `gas-rack` in Tip and Sorting Yard.

**Beat 3 - After Stop 46 | `tip-lab-bench` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 46 result to settle diagnose the engine-room alarm."

**Unlocks/waypoint:** Unlock Stop 47 at `tip-lab-bench` in Tip and Sorting Yard.

**Beat 4 - After Stop 47 | `load-board` | automatic**

**World state:** Synthesis: Stop 47 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 47 result to settle allocate firm power."

**Unlocks/waypoint:** Unlock Stop 48 at `load-board` in Waterworks.

**Beat 5 - At mission end | `council-table` | automatic**

**World state:** Decision and hook: Stop 48 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Turbine feasibility unlocks Tip gas measurement; confirmed capture unlocks Waterworks essential-load allocation. Apparent victory arrives when firm plan locks, then gearbox delay remains visible.

## Characters and dramatic beat

Turbine feasibility unlocks Tip gas measurement; confirmed capture unlocks Waterworks essential-load allocation. Apparent victory arrives when firm plan locks, then gearbox delay remains visible.

## Key concepts, explained here

CH4 GWP about 28-36 over 100 years and lasts about 12 years; CO2 GWP 1 but lasts centuries to millennia; N2O GWP 265-310 and lasts 121 years. Nuclear fission releases heat; U-235 half-life 704 million years, Cs-137 30 years, I-131 8 days.

## Stop 45 - Audit the gearbox schedule

**Format/placement:** ATTEST, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle; Keystone: feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit audit the gearbox schedule until this evidence is resolved.

**Question card story setup - exact player copy:** The portfolio assumes repaired wind before ferry day, but the crated gearbox carries several schedule claims. Verify its evidence before counting that power, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Audit the gearbox schedule connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Verify at most three claims among order date, shipment status, fitting crew, and completion by vote; reject the critical unbacked completion claim

**Complete format-specific interaction block:** `attest:{limit:3,claims:[{id:order,backed:true},{id:shipment,backed:true},{id:crew,backed:true},{id:completion_by_vote,backed:false,critical:true}],correct:reject_completion}`

**Correct result:** Wind is not firm power before the vote

**Answer text:** The completed check shows wind is not firm power before the vote.

**Why:** Audit the gearbox schedule connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 46 - Verify methane capture

**Format/placement:** VERIFY, at `gas-rack`.

**Metadata:** Concept: methane capture | causality | D7 | RETRIEVE | L4 | evidence; Keystone: methane capture | causality | D7 | RETRIEVE | L4 | evidence; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: methane capture | causality | D7 | RETRIEVE | L4 | evidence.

**Call - exact player copy:** Go to the gas rack, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit verify methane capture until this evidence is resolved.

**Question card story setup - exact player copy:** Because wind cannot return before the vote, captured landfill gas may bridge the gap. Predict recoverable methane, operate the collector, measure capture and leakage, interpret, and restore, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Verify methane capture connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT 400 m3/day*0.55*0.80 in m3 CH4/day; OPERATE at 60% vacuum with waste mass, moisture, and time fixed; MEASURE capture and leakage; INTERPRET against limits; restore baseline

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_commit,operate,measure,interpret],operate_unlocked_when:prediction_committed,prediction:{equation:"recoverable=gas_volume*methane_fraction*collection_efficiency",inputs:{gas_volume:400,methane_fraction:0.55,collection_efficiency:0.80},unit:"m3 CH4/day",truth:176,tolerance:17.6},operate:{control:collector_vacuum,setting_pct:60,fixed:[waste_mass,moisture,elapsed_time]},measure:{captured_m3_day:170,leaked_pct:18},interpret:{correct:accept,criteria:["capture within 10% of 176","leakage <=20%"]},restore:{required:true,setting:baseline,remeasure:true}}`

**Correct result:** Prediction 176 m3/day; measurements 170 m3/day and 18% leakage pass

**Answer text:** The completed check shows prediction 176 m3/day; measurements 170 m3/day and 18% leakage pass.

**Why:** Verify methane capture connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 47 - Diagnose the engine-room alarm

**Format/placement:** DIAGNOSIS, at `tip-lab-bench`.

**Metadata:** Concept: engine-room air | atmosphere | D11 | RETRIEVE | L4 | reveal; Keystone: engine-room air | atmosphere | D11 | RETRIEVE | L4 | reveal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: engine-room air | atmosphere | D11 | RETRIEVE | L4 | reveal.

**Call - exact player copy:** Go to the tip lab bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The island cannot commit diagnose the engine-room alarm until this evidence is resolved.

**Question card story setup - exact player copy:** The collector meets methane limits, but the backup engine-room alarm persists. Diagnose it using both alarms and quiet readings, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Diagnose the engine-room alarm connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Choose among outdoor inversion, carbon monoxide from incomplete combustion, radon, and photochemical ozone using high CO, normal oxygen and NOx, no daylight, and a stuck exhaust damper

**Complete format-specific interaction block:** `diagnosis:{readings:{CO:high,O2:normal,NOx:normal,daylight:none,exhaust_damper:stuck},choices:[outdoor_inversion,CO_from_incomplete_combustion,radon,photochemical_ozone],answer:CO_from_incomplete_combustion,rebuttals:{outdoor_inversion:"Does not explain the indoor damper timing",radon:"Does not track engine operation",photochemical_ozone:"Requires sunlight and precursor chemistry"}}`

**Correct result:** Incomplete combustion plus the stuck damper caused the CO alarm

**Answer text:** The completed check shows incomplete combustion plus the stuck damper caused the CO alarm.

**Why:** Diagnose the engine-room alarm connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 48 - Allocate firm power

**Format/placement:** ALLOCATE, at `load-board`.

**Metadata:** Concept: firm critical loads | energy | 12; Keystone: firm critical loads | energy | 12; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: firm critical loads | energy | 12.

**Call - exact player copy:** Go to the load board, in Waterworks.

**Stop reason - exact player copy:** The island cannot commit allocate firm power until this evidence is resolved.

**Question card story setup - exact player copy:** Captured methane can run safely after the exhaust repair, but its output is limited. Allocate 180 kilowatts across protected services, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Allocate firm power connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Allocate water pumps 55, school 20, treatment 35, ferry refrigeration 30, and homes 40; exclude decorative berth lighting 25

**Complete format-specific interaction block:** `allocate:{pool:180,items:[{id:"water",cost:55,required:true},{id:"school",cost:20,required:true},{id:"treatment",cost:35,required:true},{id:"ferry_refrigeration",cost:30,required:false},{id:"homes",cost:40,required:true,protected:true},{id:"decorative_berth",cost:25,required:false}],questions:[{id:"protected",text:"Are all protected public services powered?",required:true},{id:"food",text:"Can the remaining pool protect refrigerated ferry food?",required:true},{id:"limit",text:"Does the allocation stay within 180 kW?",required:true}],correct_allocation:{water:55,school:20,treatment:35,ferry_refrigeration:30,homes:40},answerText:"Allocate all 180 kW to water, school, treatment, homes, and ferry refrigeration; decorative berth lighting remains off."}`

**Correct result:** All five essential/protected loads receive exactly 180 kW

**Answer text:** The completed check shows all five essential/protected loads receive exactly 180 kW.

**Why:** Allocate firm power connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Use stored gas, fixed pipes, key loads, and cells until the wind gear arrives. The 180-kilowatt plan keeps water, school, homes, and food safe. Backup power is ready.

### Post-mission metric screen - exact player copy

target 16:00; firm plan contracted, Reserve +5 and lock; QA 95/95/100/62 after Trust11. Takeaway: low-carbon plans count timing, leakage, firm output, and health controls.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 13 - The Biosecurity Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 3 DAYS.

**Card title:** THE BIOSECURITY RULE

**Go now:** Ferry Berth, Tomas Reed at `berth-standpipe`.

**Card body:** Firm power is secured, but every new sailing enters through a berth with no inspection. Remote islands have fewer replacement species, and generalist invaders can spread through disturbed habitat. Inspect arrivals, map vulnerable land at the Common, then test reef exposure. By the end of the mission, choose a biosecurity rule for every ferry.

**Objective:** Prevent imported species from outrunning island defenses.

### Worth knowing first - exact player copy

#### Glossary terms

Invasive species: introduced organism that spreads and causes harm.

Endemic: native to one limited place.

CITES: treaty controlling trade in threatened species.

Endangered Species Act: United States law protecting listed species and habitat.

#### Primer concepts

- species richness rises with island size and falls with distance; generalists often invade readily; disturbance opens habitat; prevention is cheaper than eradication.

#### Equations first needed today
**Equation:** no new equation; retrieve population growth and island-biogeography relationships.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** no, new, equation, retrieve, population, growth, and, island, biogeography, relationships are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Berth inspection identifies propagules; Common disturbance map predicts establishment; Reef test sets decontamination. Tomas changes from speed-first to inspection-first.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Ferry Berth | `quarantine-rack` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 13: SCREEN THE ARRIVING CARGO OPEN

**Dialogue bubbles -** Mission lead: "Start with screen the arriving cargo. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `quarantine-rack` in Ferry Berth.

**Beat 2 - After Stop 49 | `common-map` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 49 result to settle test survey recovery."

**Unlocks/waypoint:** Unlock Stop 50 at `common-map` in Common Office.

**Beat 3 - After Stop 50 | `flow-tank` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 50 result to settle control the rinse treatment."

**Unlocks/waypoint:** Unlock Stop 51 at `flow-tank` in Reef Station.

**Beat 4 - After Stop 51 | `water-rack` | automatic**

**World state:** Synthesis: Stop 51 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 51 result to settle write the biosecurity protocol."

**Unlocks/waypoint:** Unlock Stop 52 at `water-rack` in Reef Station.

**Beat 5 - At mission end | `quarantine-rack` | automatic**

**World state:** Decision and hook: Stop 52 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Berth inspection identifies propagules; Common disturbance map predicts establishment; Reef test sets decontamination. Tomas changes from speed-first to inspection-first.

## Characters and dramatic beat

Berth inspection identifies propagules; Common disturbance map predicts establishment; Reef test sets decontamination. Tomas changes from speed-first to inspection-first.

## Key concepts, explained here

species richness rises with island size and falls with distance; generalists often invade readily; disturbance opens habitat; prevention is cheaper than eradication.

## Stop 49 - Screen the arriving cargo

**Format/placement:** BELT, at `quarantine-rack`.

**Metadata:** Concept: arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue; Keystone: arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue.

**Call - exact player copy:** Go to the quarantine rack, in Ferry Berth.

**Stop reason - exact player copy:** The island cannot commit screen the arriving cargo until this evidence is resolved.

**Question card story setup - exact player copy:** The power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort each arrival before unloading, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Screen the arriving cargo connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Sort soil, standing water, untreated wood, plants, and animals as inspection-required; sort sealed clean metal as low risk

**Complete format-specific interaction block:** `belt:{categories:[inspection_required,low_risk],items:{soil:inspection_required,standing_water:inspection_required,untreated_wood:inspection_required,plants:inspection_required,animals:inspection_required,sealed_clean_metal:low_risk}}`

**Correct result:** Five biological pathways enter quarantine; sealed clean metal may proceed

**Answer text:** The completed check shows five biological pathways enter quarantine; sealed clean metal may proceed.

**Why:** Screen the arriving cargo connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 50 - Test survey recovery

**Format/placement:** INJECT, at `common-map`.

**Metadata:** Concept: invasion detection | uncertainty | 13; Keystone: invasion detection | uncertainty | 13; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: invasion detection | uncertainty | 13.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** The island cannot commit test survey recovery until this evidence is resolved.

**Question card story setup - exact player copy:** Inspection identifies risky cargo, yet the council needs to know whether its survey would detect escapees. Inject a known marked population through the pipeline, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Test survey recovery connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Inject 100 seeds; add 45 road, 20 common, and 2 cliff recoveries; apply recovery percent=recovered/injected*100 and submit percent plus pass/fail against 90%

**Complete format-specific interaction block:** `inject:{population:100,recovered:{road:45,common:20,cliff:2},equation:"recovery=recovered/injected*100",truth:67,unit:percent,tolerance:1,required:90,conclusion:fail}`

**Correct result:** Recovery is 67%; the survey fails

**Answer text:** The completed check shows recovery is 67%; the survey fails.

**Why:** Test survey recovery connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 51 - Control the rinse treatment

**Format/placement:** CONTROL, at `flow-tank`.

**Metadata:** Concept: ballast decontamination | causality | D10 | RETRIEVE | L3 | evidence; Keystone: ballast decontamination | causality | D10 | RETRIEVE | L3 | evidence; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: ballast decontamination | causality | D10 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the flow tank, in Reef Station.

**Stop reason - exact player copy:** The island cannot commit control the rinse treatment until this evidence is resolved.

**Question card story setup - exact player copy:** Because land surveys miss remote escapees, prevention must work before release. Change rinse treatment alone, measure survivors, restore baseline, and remeasure, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Control the rinse treatment connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** At rinse OFF measure after 30 minutes; change only rinse ON with water 100 L, salinity 35 ppt, temperature 24 C, starting load 100, and time fixed; restore OFF and remeasure; submit causation

**Complete format-specific interaction block:** `control:{candidates:[{id:"rinse",label:"rinse treatment"},{id:"salinity",label:"salinity"},{id:"temperature",label:"temperature"}],correct_control:"rinse",baseline:{setting:"OFF",survivors:100},response:{setting:"ON",survivors:2},noise_band:{survivors:3},fixed:["water 100 L","salinity 35 ppt","temperature 24 C","starting load 100","30-minute timing"],measure_when:"after 30 minutes",restore:{required:true,setting:"OFF",survivors:100,remeasure:true},correct_conclusion:"rinsing caused the reduction",answerText:"Turning on only the rinse reduces survivors from 100 to 2, far beyond noise, and restoration returns the baseline."}`

**Correct result:** Survivors fall from 100 to 2 only when rinse is on; rinsing caused the reduction

**Answer text:** The completed check shows survivors fall from 100 to 2 only when rinse is on; rinsing caused the reduction.

**Why:** Control the rinse treatment connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 52 - Write the biosecurity protocol

**Format/placement:** PROTOCOL, at `water-rack`.

**Metadata:** Concept: cargo rule | policy | 13; Keystone: cargo rule | policy | 13; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: cargo rule | policy | 13.

**Call - exact player copy:** Go to the water rack, in Reef Station.

**Stop reason - exact player copy:** The island cannot commit write the biosecurity protocol until this evidence is resolved.

**Question card story setup - exact player copy:** The injection test exposes weak detection, while the rinse test shows prevention works. Match every cargo pathway to an action before unloading, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Write the biosecurity protocol connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Map soil to reject or heat-treat, plants to quarantine, standing water to drain and disinfect, wood to inspect and treat, and animals to permit plus CITES check

**Complete format-specific interaction block:** `protocol:{mapping:{soil:reject_or_heat_treat,plants:quarantine,standing_water:drain_and_disinfect,untreated_wood:inspect_and_treat,animals:permit_and_CITES_check}}`

**Correct result:** Every biological pathway receives a preventive action

**Answer text:** The completed check shows every biological pathway receives a preventive action.

**Why:** Write the biosecurity protocol connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Check each ferry before it sails. Treat soil, drain water, and hold risky plants. Check wood and wildlife papers too. A seed test missed too many threats. The last demand plan must count every visitor.

### Post-mission metric screen - exact player copy

target 14:00; rule published, Trust +5; QA 95/95/100/78 after Trust11. Takeaway: isolated ecosystems need prevention because detection and recolonization are weak.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 14 - The Population Outlook

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 2 DAYS.

**Card title:** THE POPULATION OUTLOOK

**Go now:** Island School, Lena Costa at `register-desk`.

**Card body:** Biosecurity now protects each arrival, but the ferry load still depends on who lives here and who visits. Age structure, fertility, mortality, migration, and population momentum shape resident demand differently from visitor-days. Build the forecast at school, test arrivals at the harbour, then map footprint at the Common. By the end of the mission, decide the population load the plan must serve.

**Objective:** Lock the human-demand forecast.

### Worth knowing first - exact player copy

#### Glossary terms

Total fertility rate: average births per woman; about 2.1 replaces a population without migration.

Population momentum: continued growth from a large reproductive-age group.

Demographic transition: shift from high birth/death rates toward low rates.

Overshoot: demand beyond available biological capacity.

#### Primer concepts

- age pyramids show growth, stability, or decline; Malthus contrasted geometric population with arithmetic food growth; developed populations often age with low TFR.

#### Equations first needed today
**Equation:** `PGR=(births-deaths)/population×100%`;

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** PGR, births, deaths, population are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `doubling time=70/growth rate %`.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** doubling, time, growth, rate are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

School age data unlock Harbour visitor counts; combined person-days unlock Common footprint. Lena distinguishes school survival from simple growth.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Island School | `register-desk` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 14: READ THE AGE STRUCTURE OPEN

**Dialogue bubbles -** Mission lead: "Start with read the age structure. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `register-desk` in Island School.

**Beat 2 - After Stop 53 | `register-desk` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 53 result to settle calculate population growth."

**Unlocks/waypoint:** Unlock Stop 54 at `register-desk` in Island School.

**Beat 3 - After Stop 54 | `council-table` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 54 result to settle close the person-day balance."

**Unlocks/waypoint:** Unlock Stop 55 at `council-table` in Chapel Council Room.

**Beat 4 - After Stop 55 | `common-map` | automatic**

**World state:** Synthesis: Stop 55 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 55 result to settle stress the human-demand forecast."

**Unlocks/waypoint:** Unlock Stop 56 at `common-map` in Common Office.

**Beat 5 - At mission end | `register-desk` | automatic**

**World state:** Decision and hook: Stop 56 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

School age data unlock Harbour visitor counts; combined person-days unlock Common footprint. Lena distinguishes school survival from simple growth.

## Characters and dramatic beat

School age data unlock Harbour visitor counts; combined person-days unlock Common footprint. Lena distinguishes school survival from simple growth.

## Key concepts, explained here

age pyramids show growth, stability, or decline; Malthus contrasted geometric population with arithmetic food growth; developed populations often age with low TFR.

## Stop 53 - Read the age structure

**Format/placement:** CLOUD, at `register-desk`.

**Metadata:** Concept: age structure | populations | D8 dose | RETRIEVE | L3 | evidence; Keystone: age structure | populations | D8 dose | RETRIEVE | L3 | evidence; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: age structure | populations | D8 dose | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the register desk, in Island School.

**Stop reason - exact player copy:** The island cannot commit read the age structure until this evidence is resolved.

**Question card story setup - exact player copy:** The biosecurity rule counts arrivals, but permanent demand begins with residents already here. Shape the island age distribution before adding visitors, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Read the age structure connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Plot age bins 0-14=28, 15-44=62, 45-64=91, and 65+=74 people; submit growing, stable, or declining

**Complete format-specific interaction block:** `cloud:{bins:[{age:"0-14",count:28},{age:"15-44",count:62},{age:"45-64",count:91},{age:"65+",count:74}],correct:declining,shape:top_heavy}`

**Correct result:** The resident population is top-heavy and declining

**Answer text:** The completed check shows the resident population is top-heavy and declining.

**Why:** Read the age structure connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 54 - Calculate population growth

**Format/placement:** BALLPARK, at `register-desk`.

**Metadata:** Concept: population growth | populations | 14; Keystone: population growth | populations | 14; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: population growth | populations | 14.

**Call - exact player copy:** Go to the register desk, in Island School.

**Stop reason - exact player copy:** The island cannot commit calculate population growth until this evidence is resolved.

**Question card story setup - exact player copy:** The age structure suggests decline, yet births and deaths must test that reading. Calculate natural growth and interpret the Rule of 70, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Calculate population growth connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Apply PGR=(births-deaths)/population*100 using 3 births, 6 deaths, and 255 people; submit percent/year and whether doubling time is meaningful

**Complete format-specific interaction block:** `estimate:{equation:"(3-6)/255*100",inputs:{births:3,deaths:6,population:255},truth:-1.18,unit:"percent/year",tolerance:0.02,interpretation:"halving, not doubling"}`

**Correct result:** Growth is -1.18%/year; a doubling time is not meaningful

**Answer text:** The completed check shows growth is -1.18%/year; a doubling time is not meaningful.

**Why:** Calculate population growth connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 55 - Close the person-day balance

**Format/placement:** BALANCE, at `council-table`.

**Metadata:** Concept: person-days | closed budgets | 14; Keystone: person-days | closed budgets | 14; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: person-days | closed budgets | 14.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit close the person-day balance until this evidence is resolved.

**Question card story setup - exact player copy:** Residents are declining, but ferry visitors can still raise seasonal demand. Convert everyone into person-days, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Close the person-day balance connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Apply person-days=people*days using 255 residents*31 days, 340 visitors/day*8 current sailing days, and another 2720 visitor-days for the second ferry; submit total

**Complete format-specific interaction block:** `balance:{streams:[{id:"residents",value:7905,unit:"person-days",counts:true},{id:"current_ferry_visitors",value:2720,unit:"person-days",counts:true},{id:"second_ferry_visitors",value:2720,unit:"person-days",counts:true},{id:"crew_already_in_resident_count",value:248,unit:"person-days",counts:false,reason:"duplicate population"}],equation:"255×31+340×8+2720",correct:13345,tolerance:1,answerText:"Demand is 13,345 person-days; ferry crew already counted as residents must not be added again."}`

**Correct result:** The second-ferry July case is 13,345 person-days

**Answer text:** The completed check shows the second-ferry July case is 13,345 person-days.

**Why:** Close the person-day balance connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 56 - Stress the human-demand forecast

**Format/placement:** STRESS, asked by Mara Voss beside `common-map`.

**Metadata:** Concept: footprint and demand | population and policy | 14; Keystone: footprint and demand | population and policy | 14; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: footprint and demand | population and policy | 14.

**Call - exact player copy:** Talk to Mara Voss, at the common map in Common Office.

**Stop reason - exact player copy:** The island cannot commit stress the human-demand forecast until this evidence is resolved.

**Question card story setup - exact player copy:** The common ledger now includes 13,345 July person-days, not just resident head count. Stress per-person footprint and select the correct load definition, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Stress the human-demand forecast connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Move footprint from 1.8 to 5 hectares/person; submit person-days for seasonal services, age structure for long-term school demand, and a visitor cap tied to water and waste triggers

**Complete format-specific interaction block:** `stress:{assumption:footprint_ha_person,range:[1.8,5.0],seasonal_unit:person_days,long_term_unit:age_structure,correct_plan:conditional_visitor_cap}`

**Correct result:** Plan for 13,345 July person-days and condition the cap on water and waste

**Answer text:** The completed check shows plan for 13,345 July person-days and condition the cap on water and waste.

**Why:** Stress the human-demand forecast connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Use a lower visitor cap and a drought reserve. Count crew only once. The plan stays within the water limit. The last vote now needs an independent sample.

### Post-mission metric screen - exact player copy

target 14:00; forecast accepted, Evidence +5 lock; QA 100/95/100/89 after Trust11. Takeaway: age structure predicts long-term change, while person-days predict seasonal demand.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 15 - The Conditional Ferry Recommendation

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** VOTE DAY.

**Card title:** THE CONDITIONAL FERRY RECOMMENDATION

**Go now:** Common Office, Mara Voss at the delivery board.

**Card body:** The forecast makes a second ferry possible under today's limits, but drought, heat, sea-level rise, and outages can arrive together. Mitigation reduces future causes; adaptation reduces harm already coming. Stress every condition at the Common, verify water at Waterworks, then write the rule at the Chapel. By the end of the mission, approve, condition, or reject the second ferry.

**Objective:** Deliver and enact the Second-Ferry Plan.

### Worth knowing first - exact player copy

#### Glossary terms

Radiative forcing: change in Earth's energy balance in W/m².

Mitigation: reducing causes of environmental change.

Adaptation: reducing harm from impacts.

Tipping point: threshold beyond which feedback drives further change.

#### Primer concepts

- greenhouse effect makes Earth habitable; added CO2, CH4, and N2O enhance warming; preindustrial CO2 about 280 ppm versus about 422 ppm in 2024; warming about 1.1 C and sea level about 21 cm; mitigation and adaptation must work together.

#### Equations first needed today
**Equation:** no new equations; retrieve water, population, energy, pollution, and threshold relationships.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** no, new, equations, retrieve, water, population, energy, pollution, and, threshold, relationships are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.## Main story happening - designer summary

Common stress test sends exact minimum water condition to Waterworks; passing independent sample unlocks Chapel. Every major character contributes one constraint by short radio bubble. Final outcome begins immediately after Stop 4 with council board changing to “CONDITIONAL APPROVAL.”

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Common Office | `delivery-board` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 15: MATCH CLIMATE MECHANISMS OPEN

**Dialogue bubbles -** Mission lead: "Start with match climate mechanisms. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `delivery-board` in Common Office.

**Beat 2 - After Stop 57 | `delivery-board` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 57 result to settle collapse the final degeneracy."

**Unlocks/waypoint:** Unlock Stop 58 at `delivery-board` in Common Office.

**Beat 3 - After Stop 58 | `sampler` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 58 result to settle verify the independent water sample."

**Unlocks/waypoint:** Unlock Stop 59 at `sampler` in Waterworks.

**Beat 4 - After Stop 59 | `council-table` | automatic**

**World state:** Synthesis: Stop 59 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 59 result to settle enact the ferry triggers."

**Unlocks/waypoint:** Unlock Stop 60 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `delivery-board` | automatic**

**World state:** Final outcome begins immediately after Stop 4 with council board changing to.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "CONDITIONAL APPROVAL."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Common stress test sends exact minimum water condition to Waterworks; passing independent sample unlocks Chapel. Every major character contributes one constraint by short radio bubble. Final outcome begins immediately after Stop 4 with council board changing to “CONDITIONAL APPROVAL.”

## Characters and dramatic beat

Common stress test sends exact minimum water condition to Waterworks; passing independent sample unlocks Chapel. Every major character contributes one constraint by short radio bubble. Final outcome begins immediately after Stop 4 with council board changing to “CONDITIONAL APPROVAL.”

## Key concepts, explained here

greenhouse effect makes Earth habitable; added CO2, CH4, and N2O enhance warming; preindustrial CO2 about 280 ppm versus about 422 ppm in 2024; warming about 1.1 C and sea level about 21 cm; mitigation and adaptation must work together.

## Stop 57 - Match climate mechanisms

**Format/placement:** CASEBOOK, at `delivery-board`.

**Metadata:** Concept: global change | climate | D10-D12 | RETRIEVE | L4 | synthesis; Keystone: global change | climate | D10-D12 | RETRIEVE | L4 | synthesis; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: global change | climate | D10-D12 | RETRIEVE | L4 | synthesis.

**Call - exact player copy:** Go to the delivery board, in Common Office.

**Stop reason - exact player copy:** The island cannot commit match climate mechanisms until this evidence is resolved.

**Question card story setup - exact player copy:** The current plan balances all four ledgers, but climate effects alter several at once. Match each observation to mechanism and response before the final stress test, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Match climate mechanisms connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Map warming to enhanced greenhouse effect; sea rise to thermal expansion and ice melt; shell loss to acidification; declining ocean oxygen to warming; ice loss to albedo feedback; and CFC ozone loss to chlorine radicals and Montreal Protocol

**Complete format-specific interaction block:** `casebook:{mapping:{warming:enhanced_greenhouse,sea_level_rise:thermal_expansion_and_ice_melt,shell_loss:ocean_acidification,low_ocean_oxygen:warming,ice_loss:albedo_feedback,CFC_ozone_loss:chlorine_radicals_and_Montreal_Protocol}}`

**Correct result:** All six climate mechanisms and responses are correctly linked

**Answer text:** The completed check shows all six climate mechanisms and responses are correctly linked.

**Why:** Match climate mechanisms connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** ; and CFC ozone loss to chlorine radicals and Montreal Protocol. Payload: `casebook:{mapping:{warming:enhanced_greenhouse,sea_level_rise:thermal_expansion_and_ice_melt,shell_loss:ocean_acidification,low_ocean_oxygen:warming,ice_loss:albedo_feedback,CFC_ozone_loss:chlorine_radicals_and_Montreal_Protocol}}`

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 58 - Collapse the final degeneracy

**Format/placement:** DEGENERACY, at `delivery-board`.

**Metadata:** Concept: coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis; Keystone: coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis.

**Call - exact player copy:** Go to the delivery board, in Common Office.

**Stop reason - exact player copy:** The island cannot commit collapse the final degeneracy until this evidence is resolved.

**Question card story setup - exact player copy:** Climate pathways are identified, yet visitor cap and drought reserve trade off while matching today’s water total. Apply the dry-year constraint to collapse the pair, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Collapse the final degeneracy connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Use the two controls `visitor cap` and `drought reserve`: adjust visitor cap from 0 to 340 visitors/day in steps of 20 and reserve from 0% to 30% in steps of 5%. Submit the numerical pair satisfying annual withdrawal at or below 136,800 m3/year during a 15% drought before plan choices unlock.

**Complete format-specific interaction block:** `degeneracy:{controls:[{id:visitor_cap,label:"visitors/day",min:0,max:340,step:20},{id:drought_reserve,label:"reserve percent",min:0,max:30,step:5}],locus_today:[[120,30],[160,25],[200,20],[240,15],[280,10],[320,5]],locus_drought:[[160,25],[200,20],[240,15]],constraint:"annual withdrawal <=136800 m3/year during 15% drought",truth:[200,20],tolerance:[10,2.5],required_submission:"numerical pair before plan unlock"}`

**Correct result:** Submit (200 visitors/day, 20% reserve)

**Answer text:** The completed check shows submit (200 visitors/day, 20% reserve).

**Why:** Collapse the final degeneracy connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 59 - Verify the independent water sample

**Format/placement:** VERIFY, at `sampler`.

**Metadata:** Concept: final water check | causality and evidence | D2,D4,D8 | TRANSFER | L5 | verification; Keystone: final water check | causality and evidence | D2,D4,D8 | TRANSFER | L5 | verification; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: final water check | causality and evidence | D2,D4,D8 | TRANSFER | L5 | verification.

**Call - exact player copy:** Go to the independent sampler, in Waterworks.

**Stop reason - exact player copy:** The island cannot commit verify the independent water sample until this evidence is resolved.

**Question card story setup - exact player copy:** The dry-year constraint leaves a 200-visitor cap with 20% reserve. Verify final quantity and quality with an independent sample, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Verify the independent water sample connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT margin=136800-132000 in m3/year; OPERATE the sampler with pump and time fixed; MEASURE nitrate and chloride; INTERPRET PASS only below 10.0 and 250 mg/L; no restoration

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_commit,operate,measure,interpret],operate_unlocked_when:prediction_committed,prediction:{equation:"margin=ceiling-withdrawal",inputs:{ceiling:136800,withdrawal:132000},unit:"m3/year",truth:4800,tolerance:100},operate:{control:independent_sampler,fixed:[pump_state,sampling_time]},measure:{nitrate:{value:6.4,unit:"mg/L"},chloride:{value:118,unit:"mg/L"}},interpret:{correct:PASS,criteria:["nitrate <10.0 mg/L","chloride <250 mg/L"]},restore:{required:false,reason:"sampling changes no control"}}`

**Correct result:** Margin 4800 m3/year, nitrate 6.4 mg/L, chloride 118 mg/L: PASS

**Answer text:** The completed check shows margin 4800 m3/year, nitrate 6.4 mg/L, chloride 118 mg/L: PASS.

**Why:** Verify the independent water sample connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 60 - Enact the ferry triggers

**Format/placement:** TRIGGER, at `council-table`.

**Metadata:** Concept: final policy | policy | all keystones | TRANSFER | L5 | payoff; Keystone: final policy | policy | all keystones | TRANSFER | L5 | payoff; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: final policy | policy | all keystones | TRANSFER | L5 | payoff.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The island cannot commit enact the ferry triggers until this evidence is resolved.

**Question card story setup - exact player copy:** Independent water evidence passes, so the plan can be written as enforceable conditions rather than promises. Commit every threshold before the vote opens, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Enact the ferry triggers connects the measured environmental mechanism to the next island condition.

**Question card prompt - exact player copy:** Submit one conditional approval containing withdrawal <=136800 m3/year, pumping stop at head <=1.0 m, nitrate action at >=10.0 mg/L, chloride <250 mg/L, catch 100 or 70 in low recruitment, reserve >=15 kW, inspection every sailing, and drought visitor cap 200/day

**Complete format-specific interaction block:** `trigger:{conditions:[{withdrawal_max:136800},{head_stop_lte:1.0},{nitrate_action_gte:10.0},{chloride_lt:250},{catch_normal:100},{catch_low_recruit:70},{reserve_gte_kW:15},{inspection:every_sailing},{drought_visitor_cap:200}],decision_rule:"approve only when every condition has owner, monitor, trigger, response",correct:conditional_approve}`

**Correct result:** Conditional approval with all eight enforceable safeguards

**Answer text:** The completed check shows conditional approval with all eight enforceable safeguards.

**Why:** Enact the ferry triggers connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Approve the second ferry only with firm limits. Cut trips when any safety trigger fails. The plan cuts air and water waste. It also plans for drought, heat, and sea rise. The council adopts the plan.

### Post-mission metric screen - exact player copy

target 18:00; conditions enacted, Water +5 lock; QA 100/100/100/100 after Trust11 and lock. Victory gate checks every scientific threshold. No further graded task. **Takeaway:** carrying capacity is a conditional systems limit, not one permanent population number.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# 9. Mission-at-a-glance production map

### Mission 1

- Briefing: Draw the boundary begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 1-4 — Draw the boundary; Match the cycles; Separate matter from energy; Find the shared omission.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 2

- Briefing: Route one year of rain begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 5-8 — Route one year of rain; Convert depth to volume; Freeze the estimate; Set the ceiling.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 3

- Briefing: Count usable plant energy begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 9-12 — Count usable plant energy; Read recovery and habitat; Classify vulnerability; Test the fertilizer claim.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 4

- Briefing: Read the ground begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 13-16 — Read the ground; Probe the salt front; Diagnose the early warning; Write the aquifer trigger.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 5

- Briefing: Measure catch per unit effort begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 17-20 — Measure catch per unit effort; Read the survivorship curves; Verify logistic recovery; Fund an enforceable ceiling.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 6

- Briefing: Audit the landing claim begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 21-24 — Audit the landing claim; Buy compliance evidence; Match land-use practices; Fund the commons package.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 7

- Briefing: Trace the hidden exports begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 25-28 — Trace the hidden exports; Build the treatment chain; Close the water balance; Choose the repair priority.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 8

- Briefing: Probe the nitrate network begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 29-32 — Probe the nitrate network; Compare child and adult dose; Verify the garden source; Set the school action level.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 9

- Briefing: Sort the mixed waste begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 33-36 — Sort the mixed waste; Map source and fate; Control the compost process; Fund source controls.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 10

- Briefing: Read the patterned residuals begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 37-40 — Read the patterned residuals; Control heat and nutrients; Map acidification damage; Stress the catch ceiling.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 11

- Briefing: Close the peak-power ledger begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 41-44 — Close the peak-power ledger; Calculate capacity factor; Match pollutants and controls; Fund the energy portfolio.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 12

- Briefing: Audit the gearbox schedule begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 45-48 — Audit the gearbox schedule; Verify methane capture; Diagnose the engine-room alarm; Allocate firm power.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 13

- Briefing: Screen the arriving cargo begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 49-52 — Screen the arriving cargo; Test survey recovery; Control the rinse treatment; Write the biosecurity protocol.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 14

- Briefing: Read the age structure begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 53-56 — Read the age structure; Calculate population growth; Close the person-day balance; Stress the human-demand forecast.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 15

- Briefing: Match climate mechanisms begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 57-60 — Match climate mechanisms; Collapse the final degeneracy; Verify the independent water sample; Enact the ferry triggers.
- Outcome: the fourth stop commits the condition and updates the delivery board.


# 10. Stop manifest

| Global stops | Mission | Stop titles | Implementation source |
|---:|---:|---|---|
| 1-4 | Mission 1 | Draw the boundary / Match the cycles / Separate matter from energy / Find the shared omission | Four canonical interactions; see full chapter payloads |
| 5-8 | Mission 2 | Route one year of rain / Convert depth to volume / Freeze the estimate / Set the ceiling | Four canonical interactions; see full chapter payloads |
| 9-12 | Mission 3 | Count usable plant energy / Read recovery and habitat / Classify vulnerability / Test the fertilizer claim | Four canonical interactions; see full chapter payloads |
| 13-16 | Mission 4 | Read the ground / Probe the salt front / Diagnose the early warning / Write the aquifer trigger | Four canonical interactions; see full chapter payloads |
| 17-20 | Mission 5 | Measure catch per unit effort / Read the survivorship curves / Verify logistic recovery / Fund an enforceable ceiling | Four canonical interactions; see full chapter payloads |
| 21-24 | Mission 6 | Audit the landing claim / Buy compliance evidence / Match land-use practices / Fund the commons package | Four canonical interactions; see full chapter payloads |
| 25-28 | Mission 7 | Trace the hidden exports / Build the treatment chain / Close the water balance / Choose the repair priority | Four canonical interactions; see full chapter payloads |
| 29-32 | Mission 8 | Probe the nitrate network / Compare child and adult dose / Verify the garden source / Set the school action level | Four canonical interactions; see full chapter payloads |
| 33-36 | Mission 9 | Sort the mixed waste / Map source and fate / Control the compost process / Fund source controls | Four canonical interactions; see full chapter payloads |
| 37-40 | Mission 10 | Read the patterned residuals / Control heat and nutrients / Map acidification damage / Stress the catch ceiling | Four canonical interactions; see full chapter payloads |
| 41-44 | Mission 11 | Close the peak-power ledger / Calculate capacity factor / Match pollutants and controls / Fund the energy portfolio | Four canonical interactions; see full chapter payloads |
| 45-48 | Mission 12 | Audit the gearbox schedule / Verify methane capture / Diagnose the engine-room alarm / Allocate firm power | Four canonical interactions; see full chapter payloads |
| 49-52 | Mission 13 | Screen the arriving cargo / Test survey recovery / Control the rinse treatment / Write the biosecurity protocol | Four canonical interactions; see full chapter payloads |
| 53-56 | Mission 14 | Read the age structure / Calculate population growth / Close the person-day balance / Stress the human-demand forecast | Four canonical interactions; see full chapter payloads |
| 57-60 | Mission 15 | Match climate mechanisms / Collapse the final degeneracy / Verify the independent water sample / Enact the ferry triggers | Four canonical interactions; see full chapter payloads |

# 11. Narrative implementation notes

## Environmental state changes

Keep the island boundary, cycle routes, water ceiling, aquifer warning, fishery ceiling, inspection station, repaired main, school-water notice, source-control board, reef conditions, energy ledger, firm-power lock, biosecurity rule, forecast, and final ferry conditions visible after they are earned. Later scenes must retrieve these objects rather than restating them as new facts.

## Dialogue state

Characters change position when evidence changes: Tomas moves from raw landings to effort and inspection; Iona moves from fertilizer yield to nutrient budgets; Elias moves from nameplate power to firm output; Rafi moves from heat-only explanation to interacting stressors; Mara and Ada move from a simple yes/no vote to enforceable conditional service.

## Mission endings

Each outcome begins with the promised mission decision, applies the named metric event, shows 45-90 seconds of player-controlled aftermath, and creates the next mission's necessary problem. Mission 15 changes the council board immediately to `CONDITIONAL APPROVAL` and adds no further quiz.

# 12. Content and UI acceptance tests

## Scientific checks

- Recalculate every quantitative truth and tolerance from the printed inputs and units.
- Verify all twelve keystones have introduction, delayed retrieval, and combine/transfer payoff.
- Confirm no final-mission answer requires a concept first introduced in Mission 15.
- Confirm every policy choice follows from an environmental mechanism and measured limit.

## Action-clarity and format-payload audit - blocking

- **PROBE:** Every station object contains an observed `reading`, station-specific `expected` value or range, units, and useful `load`/comparison text. A shared general range alone does not pass.
- **CHOICE:** Exactly four separately stored choices appear. Each wrong choice has its own option-specific rebuttal. Slash-separated choice prose is forbidden, including when fractions, ratios, or equations contain `/`.
- **VERIFY:** Visible order is `CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET`; `operate_unlocked_when=prediction_committed`. Inputs, constants, equation, units, prediction response, fixed controls, measurements, conclusion response, restoration, truth, and tolerance are all present.
- **CONTROL:** Visible copy names the changed variable, all fixed variables, measurement timing, whether baseline must be restored, and the repeated baseline measurement when required.
- **DEGENERACY:** Both controls, ranges, steps, loci/constraints, tolerance, and numerical pair response are authored; qualitative plan choices remain locked until pair submission.
- **Other numerical/operated formats:** Expose all inputs, constants, conversions, units, equation, requested answer unit, response type, truth, tolerance, control state, and restoration. Do not rely on hidden payload to repair unclear player copy.
- Compare every operated block with the current importer and `engine/content/normalize.js`; map field names without deleting interaction data.

## Metric-economy checks

- Exactly four 0-100 bars appear and the canonical zero-error path reaches 100/100/100/100.
- Apply event deltas before RP, respect locks, cap banked RP at 30, and restore the mission-start snapshot on a zero bar.
- Victory remains blocked until water, fish, power, nitrate, chloride, reef, waste, inspection, and all four metric gates pass.

## Story, tone, accessibility, and route checks

- Briefing promise and outcome answer visibly mirror each other.
- Required dialogue uses Continue and pauses the timer; color always has text/icon redundancy.
- Early missions use one place, middle missions two, late missions three, with each move unlocked by necessary evidence.
- Incorrect feedback explains mechanism and permits retry; no character ridicules the player.

# 13. Suggested YAML assembly order for Claude Code

1. Create campaign metadata, metric keys, starting values, RP formula, lock rules, and failure snapshots.
2. Create the location graph and signature fixtures; verify place/fixture IDs against theme assets.
3. Create the character roster, first entrances, dialogue state, and mission-log behavior.
4. Add Missions 1-15 in order, each with briefing, glossary, primer, equations, five beats, four globally numbered lessons, outcome, metric screen, and review.
5. Add the clue flags, evidence-triggered waypoints, persistent environmental state changes, and final gate.
6. Import with the repository command, run schema/format/reachability/readability validators, then play wrong-first and right-first.

## Recommended content object shape

```yaml
mission:
  id: mission_01
  title: "What the Island Depends On"
  briefing:
    header: "15 DAYS TO THE FERRY VOTE"
    card_title: "Nothing Leaves the Ledger"
    go_now: "Go to the Harbour Office and meet Tomas Reed at the landings book."
    body: "Four-sentence exact player copy from the mission chapter."
    objective: "Build the dependency ledger that defines the investigation."
  worth_knowing:
    glossary: ["Term: definition"]
    primer: ["Plain-language concept"]
    equations: [{equation: "relationship", purpose: "job", symbols: "units", campaign_reason: "decision use"}]
  beats: [arrival, result_1, travel_or_result_2, synthesis, outcome_hook]
  lessons:
    - id: stop_01
      global_stop: 1
      format: CHOICE
      placement: {location: HARB, fixture: landings_book, kind: person}
      metadata: {concept: system_boundary, keystone: closed_budgets, learning_role: INTRODUCE, difficulty: L1, story_role: obstacle}
      stop_reason: "Exact player copy"
      story_setup: "Two sentences, 30-45 words."
      story_science_connection: "Exact player copy"
      prompt: "Exact player copy with response type"
      interaction: {canonical_format_block: "Use full stop payload"}
      correct_result: "Keyed truth"
      answer_text: "Post-grade answer"
      why: "Mechanism"
      wrong_path_feedback: ["Specific retry feedback"]
      state_output: ["Flag", "visible change", "unlock"]
  outcome: "Mission decision first; consequence and next hook follow."
  metric_screen: {target: "MM:SS", event: "named event", automatic_delta: {}, rp_formula: "clamp(4,12,11+modifier-errors)", allocation: "authored", lock: "authored", failure: "snapshot restore"}
  review: ["concept", "equation", "retrieval", "mission takeaway"]
```

# 14. Final handoff checklist

- [ ] Sections 1-8 precede Mission 1; all 15 missions are fully expanded; Sections 9-14 follow Mission 15.
- [ ] Exactly 15 mission headers and 60 globally numbered stop headers exist.
- [ ] Every mission contains briefing, Worth knowing, story, beats, location, characters, concepts, four stops, outcome, metric screen, and review.
- [ ] Every glossary entry is one-line `Term: definition`; equation entries omit `Also called` and `Concept`.
- [ ] No required stop content lives only in an appendix and no later mission is summarized.
- [ ] Every CHOICE/PROBE/VERIFY/CONTROL/DEGENERACY and numerical stop passes the blocking audit above.
- [ ] Every stop uses canonical placement, grading truth, answer text, feedback, state/output, and complete interaction data.
- [ ] The clue ledger, keystone retrieval, all four metrics, recovery economy, locks, and 100/100/100/100 reference path survive conversion.
- [ ] Importer, schema, location parity/reachability, readability, trap, and live playthrough validators pass before release.
