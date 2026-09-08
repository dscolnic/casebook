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

Vellan Island must decide whether to add a second ferry before the council votes in fifteen days. You will use environmental science to weigh how more crossings could keep the school open while every visitor also uses scarce water, power, food, and waste space. If the plan exceeds the island's limits, wells turn salty, the reef fails, and families must leave. Island Resources Officer Mara Voss hands you the evidence ledger and says, “The school, the reef, and every family on this island must share one future: find the limits that keep them all here, then build the plan the council can defend.”

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
**Card body:** A warning about water from a school tap arrives while Vellan debates adding another ferry. More sailings could bring more people, supplies, and waste. Use environmental science to trace the island's resources and decide what the ferry plan must count before anyone calls it sustainable.
**Objective:** Build the dependency ledger that defines the investigation.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 1: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m01_we01
    title: Balance a resource stock
    problem: A generic pond starts with 100 m³ of water, receives 30 m³, and loses 20 m³ during one day. Find the ending stock.
    rule: Ending stock=starting stock+inputs-outputs.
    steps:
    - 'Set up the relationship: Ending stock=starting stock+inputs-outputs.'
    - V_end=100+30-20=110 m³.
    answer: The pond ends with 110 m³, a net increase of 10 m³.
    common_mistake: Do not confuse the ending stock with the net change.
  - id: carrying_m01_we02
    title: Concentration and pollutant load
    problem: A stream flows at 10 L/s with pollutant concentration 2 mg/L. Find pollutant load.
    rule: Mass load=volume flow×concentration.
    steps:
    - 'Set up the relationship: Mass load=volume flow×concentration.'
    - load=10 L/s×2 mg/L=20 mg/s.
    answer: The stream carries 20 mg of pollutant each second.
    common_mistake: Concentration alone does not state total pollutant transport.
  - id: carrying_m01_we03
    title: Choose a system boundary
    problem: A garden takes up compost made from its own leaves. Is that compost an external nutrient input if the system includes both garden and compost bin?
    rule: Inputs cross the chosen system boundary; recycling within it is an internal transfer.
    steps:
    - Leaves move from garden to bin inside the boundary.
    - Compost returns from bin to garden without crossing that boundary.
    answer: This is internal nutrient recycling, not a new external input.
    common_mistake: Counting both transfers as new inputs would double-count nutrients.
  - id: carrying_m01_we04
    title: Express a loss fraction
    problem: A tank receives 200 L and delivers 180 L, with no stock change. Find the unaccounted loss percentage.
    rule: Loss=input-output; loss fraction=loss/input.
    steps:
    - 'Set up the relationship: Loss=input-output; loss fraction=loss/input.'
    - loss=200-180=20 L; fraction=20/200=0.10=10%.
    answer: Ten percent of the input is unaccounted for under the stated balance.
    common_mistake: Use the input as the reference for input-loss percentage.
  - id: carrying_m01_we05
    title: Rainfall volume
    problem: Rain falls 10 mm deep over 100 m². Find its volume before losses.
    rule: Volume=rain depth×area; 10 mm=0.010 m.
    steps:
    - 'Set up the relationship: Volume=rain depth×area; 10 mm=0.010 m.'
    - V=0.010(100)=1 m³=1000 L.
    answer: The rainfall supplies 1 cubic metre over that area.
    common_mistake: Millimetres must be converted before multiplying by square metres.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

System: a set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.

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

**Dialogue bubbles -** Tomas Reed: "Nice work. Use the Stop 1 result to settle match the cycles."

**Unlocks/waypoint:** Unlock Stop 2 at `landings-book` in Harbour Office.

**Beat 3 - After Stop 2 | `fee-desk` | automatic**

**World state:** After Stop 2: a five-ledger wall diagram lights.

**Panel/HUD text:** STOP 2 RECORDED - STOP 3 OPEN

**Dialogue bubbles -** Tomas Reed: "Good thinking. Use the Stop 2 result to settle separate matter from energy."

**Unlocks/waypoint:** Unlock Stop 3 at `fee-desk` in Harbour Office.

**Beat 4 - After Stop 3 | `landings-book` | automatic**

**World state:** The separate matter from energy result remains visible while the find the shared omission fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Tomas Reed: "Exactly right. REJECTED CATCH"

**Unlocks/waypoint:** Unlock Stop 4 at `landings-book` in Harbour Office.

**Beat 5 - At mission end | `landings-book` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "Outstanding work. You solved the mission. Now we know what every later number must connect to."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Tomas is reconciling paper and electronic landings while Mara blocks an early ferry endorsement. The player defines boundaries, traces cycles, distinguishes energy flow, and diagnoses shared omissions. **Science:** systems and biogeochemical cycles become operational ledgers. **Mystery:** the digital record may not be independent. **Stakes:** a missing flow corrupts every later ceiling. **One location:** Harbour Office, `landings-book` -> `fee-desk`; both records are uniquely available there. Arrival: Tomas says, “The screen totals what was sold; the book also records what came back over the rail.” After Stop 2, a five-ledger wall diagram lights. After Stop 3, “REJECTED CATCH” appears. Final beat: Mara says, “Now we know what every later number must connect to.”

## Characters and dramatic beat

Tomas is reconciling paper and electronic landings while Mara blocks an early ferry endorsement. The player defines boundaries, traces cycles, distinguishes energy flow, and diagnoses shared omissions. **Science:** systems and biogeochemical cycles become operational ledgers. **Mystery:** the digital record may not be independent. **Stakes:** a missing flow corrupts every later ceiling. **One location:** Harbour Office, `landings-book` -> `fee-desk`; both records are uniquely available there. Arrival: Tomas says, “The screen totals what was sold; the book also records what came back over the rail.” After Stop 2, a five-ledger wall diagram lights. After Stop 3, “REJECTED CATCH” appears. Final beat: Mara says, “Now we know what every later number must connect to.”
## Key concepts, explained here

Carbon cycles through photosynthesis, respiration, decomposition, and combustion; nitrogen needs bacterial fixation and later nitrification and denitrification; phosphorus has no major gas phase and is limited by weathering; water moves by evaporation, precipitation, runoff, infiltration, and groundwater flow. Energy moves one way through food webs, with large heat losses.

## Stop 1 - Draw the boundary

**Format/placement:** CHOICE, asked by Tomas Reed beside `landings-book`.

**Metadata:** Concept: 1 - system boundary; Keystone: closed budgets; Area: Chapel Council Room; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Tomas Reed, at the landings book in Harbour Office.

**Stop reason - exact player copy:** The second sailing is being judged from a sales ledger that leaves out essential island resources.

**Question card story setup - exact player copy:** The electronic ledger counts ferry tickets, fuel, and landed fish but ignores rain, groundwater, sunlight, and waste. Choose the boundary that captures every resource the second sailing can change.

**Question card story-science connection - exact player copy:** The boundary determines whether ferry approval accounts for groundwater, coastal ecosystems, waste, and imported supplies as well as sales.

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

**Metadata:** Concept: 5 - carbon/nitrogen/phosphorus/water cycles; Keystone: closed budgets; Area: Waterworks; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the landings book, in Harbour Office.

**Stop reason - exact player copy:** The expanded island boundary leaves four material pathways needing identification.

**Question card story setup - exact player copy:** With the boundary fixed, four unlabeled flow cards remain in the paper book. Match each pathway to the cycle it represents so later investigators follow matter rather than labels.

**Question card story-science connection - exact player copy:** The cycle matches tell investigators where each material can enter, accumulate, and leave the island ledger.

**Question card prompt - exact player copy:** Draw one line from each pathway to its cycle, then submit the complete mapping.

**Complete format-specific interaction block:** `scenarios={photosynthesis-respiration-combustion; N2-fixation-nitrification-denitrification; rock-weathering-biota-sediment; evaporation-precipitation-runoff}; choices={carbon,nitrogen,phosphorus,water}; mapping={1:carbon,2:nitrogen,3:phosphorus,4:water}`.

**Correct result:** Carbon, nitrogen, phosphorus, water in that order; nitrogen fixation and phosphorus weathering are important limiting steps.

**Answer text:** The completed check shows carbon, nitrogen, phosphorus, water in that order; nitrogen fixation and phosphorus weathering are important limiting steps.

**Why:** Matter changes form but remains in its cycle; feedback identifies the first mismatched process.

**Wrong-path feedback:** A carbon match that omits combustion, a nitrogen match that omits denitrification, or a phosphorus match that adds an atmospheric gas phase assigns a pathway to the wrong cycle.

**State/output:** Four cycle routes light; unlocks Stop 1.3.

## Stop 3 - Separate matter from energy

**Format/placement:** BELT, at `fee-desk`.

**Metadata:** Concept: 3 - energy flow versus matter cycling; Keystone: energy flow; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the fee desk, in Harbour Office.

**Stop reason - exact player copy:** The material pathways are mapped, but the grazing plan still risks counting energy as a recyclable resource.

**Question card story setup - exact player copy:** Because the four matter ledgers now close, the remaining cards can expose a dangerous accounting mistake. Sort each item as matter that cycles or energy that flows and disperses as heat.

**Question card story-science connection - exact player copy:** Separating energy flow from matter cycling prevents the food budget from reusing energy already dispersed as heat.

**Question card prompt - exact player copy:** Sort sunlight, heat, carbon dioxide, nitrate, phosphate, and water. Submit the binary classification before the belt reaches the end.

**Complete format-specific interaction block:** `belt.categories={cycles,flows}; items={sunlight:flows,heat:flows,CO2:cycles,nitrate:cycles,phosphate:cycles,water:cycles}; speed=moderate; misses_allowed=2`.

**§7 authored-board source - BELT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 3 - Separate matter from energy"
  format: "BELT"
  source: "Handback 5 canonical interaction block"
  question: "Sort sunlight, heat, carbon dioxide, nitrate, phosphate, and water. Submit the binary classification before the belt reaches the end."
  payload: "`belt.categories={cycles,flows}; items={sunlight:flows,heat:flows,CO2:cycles,nitrate:cycles,phosphate:cycles,water:cycles}; speed=moderate; misses_allowed=2`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BELT:**

**Handback 5 canonical interaction block - BELT:**

```yaml
belt:
  left: {name: "Matter cycles"}
  right: {name: "Energy flows"}
  runLength: 20
  missesAllowed: 2
  items:
    - {name: "heat-trapping CO2", bin: left}
    - {name: "nitrate", bin: left}
    - {name: "phosphate", bin: left}
    - {name: "water", bin: left}
    - {name: "oxygen", bin: left}
    - {name: "heat-storing soil", bin: left}
    - {name: "ammonium", bin: left}
    - {name: "groundwater", bin: left}
    - {name: "heat-storing biomass", bin: left}
    - {name: "calcium", bin: left}
    - {name: "sulfur", bin: left}
    - {name: "heat-linked matter", bin: left}
    - {name: "sunlight", bin: right}
    - {name: "heat", bin: right}
    - {name: "wind work", bin: right}
    - {name: "chemical energy transfer", bin: right}
    - {name: "radiant energy", bin: right}
    - {name: "motion heat", bin: right}
    - {name: "turbine work", bin: right}
    - {name: "metabolic heat", bin: right}
    - {name: "wave energy", bin: right}
    - {name: "electrical work", bin: right}
    - {name: "frictional heat", bin: right}
    - {name: "infrared radiation", bin: right}
```

**Handback 6 canonical interaction block - BELT:**

```yaml
belt:
  left: {name: "Matter cycles"}
  right: {name: "Energy flows"}
  runLength: 20
  missesAllowed: 2
  items:
    - {name: "CO2 traps heat", bin: left}
    - {name: "soil stores heat", bin: left}
    - {name: "biomass stores heat", bin: left}
    - {name: "water stores heat", bin: left}
    - {name: "nitrate", bin: left}
    - {name: "phosphate", bin: left}
    - {name: "oxygen", bin: left}
    - {name: "ammonium", bin: left}
    - {name: "groundwater", bin: left}
    - {name: "calcium", bin: left}
    - {name: "sulfur", bin: left}
    - {name: "potassium", bin: left}
    - {name: "sunlight", bin: right}
    - {name: "heat", bin: right}
    - {name: "wind work", bin: right}
    - {name: "chemical energy transfer", bin: right}
    - {name: "radiant energy", bin: right}
    - {name: "motion heat", bin: right}
    - {name: "turbine work", bin: right}
    - {name: "metabolic heat", bin: right}
    - {name: "wave energy", bin: right}
    - {name: "frictional heat", bin: right}
    - {name: "electrical work", bin: right}
    - {name: "infrared radiation", bin: right}
```

**Correct result:** Sunlight and heat flow; carbon dioxide, nitrate, phosphate, and water cycle.

**Answer text:** The completed check shows sunlight and heat flow; carbon dioxide, nitrate, phosphate, and water cycle.

**Why:** Energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.

**Wrong-path feedback:** Placing sunlight or heat in `cycles` ignores energy degradation; placing carbon dioxide, nitrate, phosphate, or water in `flows` ignores conservation of matter.

**State/output:** Energy arrow exits map; matter loops persist; rejected-catch column unlocks.

## Stop 4 - Find the shared omission

**Format/placement:** TRACE, at `landings-book`.

**Metadata:** Concept: 34 - dependent evidence; Keystone: uncertainty/evidence; Area: Chapel Council Room; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the landings book, in Harbour Office.

**Stop reason - exact player copy:** The revised ledger needs an independent catch check before agreement between sales and tax is trusted.

**Question card story setup - exact player copy:** The cycle map shows where matter should go, yet the sales screen and tax total agree exactly. Trace their upstream records and test whether agreement proves that all catch was counted.

**Question card story-science connection - exact player copy:** The record dependencies determine whether matching totals confirm the catch or merely repeat the same omission.

**Question card prompt - exact player copy:** Open all four channels, identify the shared upstream record, and submit one conclusion about independence.

**Complete format-specific interaction block:** `trace:{channels:[{id:"sales_screen",label:"sales screen",dependency:"electronic sale ledger",target_dependent:true},{id:"tax_total",label:"tax total",dependency:"electronic sale ledger",target_dependent:true},{id:"paper_landed",label:"paper landing book",dependency:"paper book",independent:true},{id:"returned_catch",label:"returned-catch record",dependency:"paper book",independent:true}],shared_upstream:"electronic sale ledger",correct_conclusion:"sales and tax agree but are not independent",answerText:"Sales and tax totals share one source; the two paper channels expose catch the shared electronic ledger omitted."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 4 - Find the shared omission"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open all four channels, identify the shared upstream record, and submit one conclusion about independence."
  payload: "`trace:{channels:[{id:\"sales_screen\",label:\"sales screen\",dependency:\"electronic sale ledger\",target_dependent:true},{id:\"tax_total\",label:\"tax total\",dependency:\"electronic sale ledger\",target_dependent:true},{id:\"paper_landed\",label:\"paper landing book\",dependency:\"paper book\",independent:true},{id:\"returned_catch\",label:\"returned-catch record\",dependency:\"paper book\",independent:true}],shared_upstream:\"electronic sale ledger\",correct_conclusion:\"sales and tax agree but are not independent\",answerText:\"Sales and tax totals share one source; the two paper channels expose catch the shared electronic ledger omitted.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: sales_screen, label: "Electronic sales screen", reading: "1,240 kg accepted catch", dependency: electronic_sale_ledger}
    - {id: tax_total, label: "Tax total", reading: "1,240 kg taxable catch", dependency: electronic_sale_ledger}
    - {id: paper_landed, label: "Paper landing book", reading: "1,240 kg accepted plus 85 kg rejected catch", dependency: paper_book, independent: true}
    - {id: returned_catch, label: "Returned-catch record", reading: "85 kg rejected catch", dependency: paper_book, independent: true}
  sharedUpstream: electronic_sale_ledger
  correctConclusion: "Sales and tax share the electronic sale record; only the paper book preserves rejected catch."
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** Sales and tax share the electronic sale record; only the paper book preserves rejected catch.

**Answer text:** The completed check shows sales and tax share the electronic sale record; only the paper book preserves rejected catch.

**Why:** Repeated outputs from one source are one line of evidence, not two; retry traces dependencies.

**Wrong-path feedback:** Treating sales and tax totals as independent double-counts their shared electronic-sale source; ignoring either paper channel discards the independent evidence.

**State/output:** “Rejected catch missing” tag persists; Day 5 payoff; delivery piece 1 posts.

## Mission outcome

Mission decision: Count water, food, energy, materials, waste, people. And habitat in one linked island system. Matching records do not count twice when they share a source. The council opens the full resource review. Tomorrow, the first closed budget is freshwater.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Excellent judgment. You made the right call: Count water, food, energy, materials, waste, people. Vellan Island has a stronger plan for its people and ecosystems.

**Story event - exact player copy:** The council opens one linked review of the island's water, food, energy, materials, waste, population, and habitat.

**Target:** 10:00. **Story event:** Dependency ledger accepted. **Automatic:** Plan Evidence +5. **Canonical QA:** 56/40/40/40, bank 0 after 11 RP to Evidence. **Lock/failure:** no lock; standard zero check.  

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed What the Island Depends On. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to What the Island Depends On, the electronic ledger counts ferry tickets, fuel, and landed fish but ignores rain, groundwater, sunlight, and waste. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies System?

**Options - exact player copy:**

- A. System boundaries must include every materially affected store; retry after the omitted-store labels flash.
- B. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- C. Matter changes form but remains in its cycle; feedback identifies the first mismatched process.
- D. Energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for System; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes system boundary, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. a set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- C: This describes carbon/nitrogen/phosphorus/water cycles, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes energy flow versus matter cycling, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to What the Island Depends On: the electronic ledger counts ferry tickets, fuel, and landed fish but ignores rain, groundwater, sunlight, and waste. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies system boundary?

**Options - exact player copy:**

- A. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- B. Matter changes form but remains in its cycle; feedback identifies the first mismatched process.
- C. System boundaries must include every materially affected store; retry after the omitted-store labels flash.
- D. Energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for system boundary; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes System, not system boundary. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes carbon/nitrogen/phosphorus/water cycles, not system boundary. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. system boundaries must include every materially affected store; retry after the omitted-store labels flash.
- D: This describes energy flow versus matter cycling, not system boundary. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks What the Island Depends On using new evidence: with the boundary fixed, four unlabeled flow cards remain in the paper book. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which environmental-science conclusion correctly applies carbon/nitrogen/phosphorus/water cycles?

**Options - exact player copy:**

- A. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- B. System boundaries must include every materially affected store; retry after the omitted-store labels flash.
- C. Energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.
- D. Matter changes form but remains in its cycle; feedback identifies the first mismatched process.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for carbon/nitrogen/phosphorus/water cycles; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes System, not carbon/nitrogen/phosphorus/water cycles. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes system boundary, not carbon/nitrogen/phosphorus/water cycles. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes energy flow versus matter cycling, not carbon/nitrogen/phosphorus/water cycles. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. matter changes form but remains in its cycle; feedback identifies the first mismatched process.
### Review question 4

**Prompt - exact player copy:** An unseen case extends What the Island Depends On: because the four matter ledgers now close, the remaining cards can expose a dangerous accounting mistake. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies energy flow versus matter cycling?

**Options - exact player copy:**

- A. Energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.
- B. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- C. System boundaries must include every materially affected store; retry after the omitted-store labels flash.
- D. Matter changes form but remains in its cycle; feedback identifies the first mismatched process.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for energy flow versus matter cycling; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. energy degrades to heat; atoms remain available in other forms. Wrong items pause with a pathway hint.
- B: This describes System, not energy flow versus matter cycling. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes system boundary, not energy flow versus matter cycling. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes carbon/nitrogen/phosphorus/water cycles, not energy flow versus matter cycling. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another What the Island Depends On decision, the team knows this: the cycle map shows where matter should go, yet the sales screen and tax total agree exactly. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which environmental-science conclusion correctly applies dependent evidence?

**Options - exact player copy:**

- A. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- B. Repeated outputs from one source are one line of evidence, not two; retry traces dependencies.
- C. System boundaries must include every materially affected store; retry after the omitted-store labels flash.
- D. Matter changes form but remains in its cycle; feedback identifies the first mismatched process.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for dependent evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes System, not dependent evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. repeated outputs from one source are one line of evidence, not two; retry traces dependencies.
- C: This describes system boundary, not dependent evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes carbon/nitrogen/phosphorus/water cycles, not dependent evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from What the Island Depends On to this follow-up: the electronic ledger counts ferry tickets, fuel, and landed fish but ignores rain, groundwater, sunlight, and waste. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies Infiltration?

**Options - exact player copy:**

- A. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- B. System boundaries must include every materially affected store; retry after the omitted-store labels flash.
- C. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- D. Matter changes form but remains in its cycle; feedback identifies the first mismatched process.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Infiltration; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes System, not Infiltration. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes system boundary, not Infiltration. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- D: This describes carbon/nitrogen/phosphorus/water cycles, not Infiltration. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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
**Card body:** Vellan's wells depend on rain soaking into the ground, but much of that rain runs away or returns to the air. Calculate how much replenishes the underground water supply during dry years. Decide how much the island can withdraw each year without exhausting it.
**Objective:** Set a reproducible groundwater recharge estimate.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 2: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m02_we01
    title: Rainfall volume
    problem: Rain falls 10 mm deep over 100 m². Find its volume before losses.
    rule: Volume=rain depth×area; 10 mm=0.010 m.
    steps:
    - 'Set up the relationship: Volume=rain depth×area; 10 mm=0.010 m.'
    - V=0.010(100)=1 m³=1000 L.
    answer: The rainfall supplies 1 cubic metre over that area.
    common_mistake: Millimetres must be converted before multiplying by square metres.
  - id: carrying_m02_we02
    title: Estimate recharge
    problem: Annual rain volume is 1000 m³; runoff removes 300 and evaporation plus plant use removes 500. Assume the remaining water recharges groundwater.
    rule: Recharge=rainfall-runoff-evaporation and plant use.
    steps:
    - 'Set up the relationship: Recharge=rainfall-runoff-evaporation and plant use.'
    - recharge=1000-300-500=200 m³/year.
    answer: Estimated recharge is 200 m³/year under this simplified balance.
    common_mistake: Not all rainfall becomes groundwater.
  - id: carrying_m02_we03
    title: A runoff fraction
    problem: A roof receives 500 L of rain and collects 400 L. Find the collection fraction.
    rule: Collection fraction=collected volume/incident volume.
    steps:
    - 'Set up the relationship: Collection fraction=collected volume/incident volume.'
    - fraction=400/500=0.8=80%.
    answer: The roof collects 80% of the incident rainfall.
    common_mistake: The missing 20% needs explanation before claiming a fully closed balance.
  - id: carrying_m02_we04
    title: Withdrawals versus replenishment
    problem: A groundwater store gains 100 units/year and withdrawals are 120 units/year, with other flows balanced. Find the annual stock change.
    rule: Stock change=recharge-withdrawal.
    steps:
    - 'Set up the relationship: Stock change=recharge-withdrawal.'
    - Δstock=100-120=-20 units/year.
    answer: The stock shrinks by 20 units each year under these assumptions.
    common_mistake: Stable delivery can conceal depletion of stored water.
  - id: carrying_m02_we05
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Infiltration: water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.

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

Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind. **Science:** watershed compartments, infiltration, recharge, and uncertainty. **Mystery:** the apparent margin depends on which year represents the future. **Stakes:** over-pumping brings salt inland. **One location:** Waterworks, `rain-bench` -> `store-gauges`. Mara Voss arrival bubble: “Use the hand record; the roof gauge loses rain in crosswind.” Stop 2 plots recharge. Stop 3 reveals the dry-year corridor. Stop 4 writes the withdrawal ceiling and delivery piece 2.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `rain-bench` | automatic**

**World state:** Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind.

**Panel/HUD text:** MISSION 2: ROUTE ONE YEAR OF RAIN OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Start with route one year of rain. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `rain-bench` in Waterworks.

**Beat 2 - After Stop 5 | `rain-bench` | automatic**

**World state:** After Stop 1: Keep the new evidence visible and.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Nice work. Use the Stop 5 result to settle convert depth to volume."

**Unlocks/waypoint:** Unlock Stop 6 at `rain-bench` in Waterworks.

**Beat 3 - After Stop 6 | `store-gauges` | automatic**

**World state:** After Stop 2: Update the persistent panel and  or the evidence-led waypoint.

**Panel/HUD text:** STOP 6 RECORDED - STOP 7 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Good thinking. Use the Stop 6 result to settle freeze the estimate."

**Unlocks/waypoint:** Unlock Stop 7 at `store-gauges` in Waterworks.

**Beat 4 - After Stop 7 | `store-gauges` | automatic**

**World state:** After Stop 3: Show the combined result and unlock the decision stop.

**Panel/HUD text:** STOP 7 RECORDED - STOP 8 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Exactly right. Use the Stop 7 result to settle set the ceiling."

**Unlocks/waypoint:** Unlock Stop 8 at `store-gauges` in Waterworks.

**Beat 5 - At mission end | `rain-bench` | automatic**

**World state:** Outcome and hook: Apply the committed decision, show its world consequence, and name the next destination; Required bubbles pause until Continue.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Nkemdi Okafor: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind. **Science:** watershed compartments, infiltration, recharge, and uncertainty. **Mystery:** the apparent margin depends on which year represents the future. **Stakes:** over-pumping brings salt inland. **One location:** Waterworks, `rain-bench` -> `store-gauges`. Mara Voss arrival bubble: “Use the hand record; the roof gauge loses rain in crosswind.” Stop 2 plots recharge. Stop 3 reveals the dry-year corridor. Stop 4 writes the withdrawal ceiling and delivery piece 2.

## Characters and dramatic beat

Nkemdi compares fourteen rain years while the automatic gauge under-reads in wind. **Science:** watershed compartments, infiltration, recharge, and uncertainty. **Mystery:** the apparent margin depends on which year represents the future. **Stakes:** over-pumping brings salt inland. **One location:** Waterworks, `rain-bench` -> `store-gauges`. Mara Voss arrival bubble: “Use the hand record; the roof gauge loses rain in crosswind.” Stop 2 plots recharge. Stop 3 reveals the dry-year corridor. Stop 4 writes the withdrawal ceiling and delivery piece 2.
## Key concepts, explained here

Precipitation is divided among evapotranspiration, runoff, soil storage, and groundwater recharge. Soil texture and land cover influence infiltration. A safe planning value should survive plausible measurement uncertainty and dry years rather than equal the wet-year mean.

## Stop 5 - Route one year of rain

**Format/placement:** BALANCE, at `rain-bench`.

**Metadata:** Concept: 4 - water budget; Keystone: water quantity; Area: Waterworks; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the rain bench, in Waterworks.

**Stop reason - exact player copy:** The ferry water allowance cannot be set until the island accounts for where its rainfall goes.

**Question card story setup - exact player copy:** The island ledger now has a water page, but its four destination rows are blank. Close the annual depth balance before converting any part of the rainfall into groundwater.

**Question card story-science connection - exact player copy:** Annual recharge depth establishes the rainfall remaining to replenish groundwater after surface losses and storage changes.

**Question card prompt - exact player copy:** Using precipitation 900 mm/yr, evapotranspiration 510 mm/yr, runoff 210 mm/yr, and soil-storage increase 30 mm/yr, select every stream that counts and submit recharge in mm/yr.

**Complete format-specific interaction block:** `balance:{streams:[{id:"precipitation",direction:"in",value:900,unit:"mm/year",counts:true},{id:"evapotranspiration",direction:"out",value:510,unit:"mm/year",counts:true},{id:"runoff",direction:"out",value:210,unit:"mm/year",counts:true},{id:"storage_increase",direction:"out",value:30,unit:"mm/year",counts:true},{id:"ferry_import",direction:"none",value:0,unit:"mm/year",counts:false,reason:"not a hydrologic flux"}],equation:"recharge=P-ET-runoff-storage increase",correct:150,tolerance:1,answerText:"Recharge is 150 mm/year; ferry imports do not count in the water balance."}`

**Correct result:** `900-510-210-30=150 mm/yr` recharge.

**Answer text:** The completed check shows 900-510-210-30=150 mm/yr recharge.

**Why:** The full input must be conserved; feedback displays the unclosed remainder.

**Wrong-path feedback:** Counting ferry imports in the rainfall ledger mixes a zero, unrelated transport stream into the hydrologic balance; omitting storage or recharge leaves rainfall unclosed.

**State/output:** Recharge row reads 150 mm/yr; unlocks Stop 2.2.

## Stop 6 - Convert depth to volume

**Format/placement:** BALLPARK, at `rain-bench`.

**Metadata:** Concept: 4 - unit conversion; Keystone: water quantity; Area: Waterworks; Learning role: PRACTICE; Difficulty: L2; Story role: evidence.

**Call - exact player copy:** Go to the rain bench, in Waterworks.

**Stop reason - exact player copy:** The rainfall balance is complete, but the council needs recharge as a usable water volume.

**Question card story setup - exact player copy:** With recharge depth established, Nkemdi needs the amount of water entering the usable aquifer area. Convert the depth across the mapped recharge zone without counting paved harbour land.

**Question card story-science connection - exact player copy:** Recharge depth over the mapped aquifer area sets the annual groundwater supply available for withdrawal planning.

**Question card prompt - exact player copy:** Assemble and submit annual recharge volume using 150 mm/yr, 0.001 m/mm, and 1.20 km² of recharge area with 1,000,000 m²/km². Answer in m³/yr.

**Complete format-specific interaction block:** `estimate.labels=[depth,mm_to_m,area,km2_to_m2]; values=[150,0.001,1.20,1000000]; slots=4; formula=product; correct=180000; target=180000; tolerance=0.02`.

**Correct result:** `150 x 0.001 x 1.20 x 1,000,000 = 180,000 m³/yr`.

**Answer text:** The completed check shows 150 x 0.001 x 1.20 x 1,000,000 = 180,000 m³/yr.

**Why:** One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.

**Wrong-path feedback:** Using 150 mm as 150 m or leaving 1.20 km2 unconverted changes the volume by orders of magnitude; paved harbour land is outside the mapped recharge area.

**State/output:** Gauge shows 180,000 m³/yr; unlocks Stop 2.3.

## Stop 7 - Freeze the estimate

**Format/placement:** HOLDOUT, at `store-gauges`.

**Metadata:** Concept: 34 - model validation; Keystone: uncertainty/evidence; Area: Chapel Council Room; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The average recharge estimate must face dry years before it becomes a drinking-water allowance.

**Question card story setup - exact player copy:** The volume calculation fits the first ten years, so the dry years remain hidden. Freeze one planning rule before four unseen years appear and expose whether the mean is safe.

**Question card story-science connection - exact player copy:** The held-out years determine whether the planning rule includes restrictions when replenishment falls below demand.

**Question card prompt - exact player copy:** Fit either mean recharge, 20th-percentile recharge, or wet-year recharge to years 1-10; click FREEZE; reveal years 11-14; submit the rule that keeps withdrawal below recharge in at least three of four years.

**Complete format-specific interaction block:** `holdout.training={mean:180000,p20:144000,wet:220000}; hidden=[151000,139000,146000,128000]; criteria="withdrawal <= recharge in >=3/4"; correct_rule=p20; frozen_before_reveal=true`.

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 7 - Freeze the estimate"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Fit either mean recharge, 20th-percentile recharge, or wet-year recharge to years 1-10; click FREEZE; reveal years 11-14; submit the rule that keeps withdrawal below recharge in at least three of four years."
  payload: "`holdout.training={mean:180000,p20:144000,wet:220000}; hidden=[151000,139000,146000,128000]; criteria=\"withdrawal <= recharge in >=3/4\"; correct_rule=p20; frozen_before_reveal=true`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "planning margin below estimated recharge", min: 0, max: 20, step: 5, unit: "%"}
  fit: [{at: 0, value: 0.62}, {at: 5, value: 0.98}, {at: 10, value: 0.84}, {at: 15, value: 0.86}, {at: 20, value: 0.82}]
  test: [{at: 0, value: 0.45}, {at: 5, value: 0.46}, {at: 10, value: 0.77}, {at: 15, value: 0.86}, {at: 20, value: 0.84}]
  passScore: 0.80
  overfitAt: 5
  correctAt: 15
  candidates:
    - {id: mean, prediction: 180000, unit: "m³/yr"}
    - {id: p20, prediction: 144000, unit: "m³/yr"}
    - {id: wet, prediction: 220000, unit: "m³/yr"}
  heldOutReadings: [151000, 139000, 146000, 128000]
  correctChoice: p20
  correctConclusion: "Use 144,000 m³/yr and trigger restrictions in the two years below it."
```

**Correct result:** Use 144,000 m³/yr; it passes 151k, 146k, and treats 139k/128k as trigger years requiring restrictions.

**Answer text:** The completed check shows use 144,000 m³/yr; it passes 151k, 146k, and treats 139k/128k as trigger years requiring restrictions.

**Why:** Holdout years test generalization; wet or mean rules overfit favorable conditions.

**Wrong-path feedback:** Choosing the wet-year or mean rule overfits favorable years; choosing a rule that fails more than one hidden dry year violates the stated three-of-four criterion.

**State/output:** Dry-year warnings appear; unlocks Stop 2.4.

## Stop 8 - Set the ceiling

**Format/placement:** STRESS, at `store-gauges`.

**Metadata:** Concept: 8 - uncertainty margin; Keystone: uncertainty/evidence; Area: Chapel Council Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The dry-year test leaves measurement bias as an unresolved risk in the withdrawal allowance.

**Question card story setup - exact player copy:** Because 144,000 m³/yr survives most held-out years, only measurement bias can still overturn it. Stress the estimate across the hand-gauge range and choose a ceiling the council can defend.

**Question card story-science connection - exact player copy:** The bias-adjusted recharge ceiling determines how much water the council can promise without using the optimistic end of the range.

**Question card prompt - exact player copy:** Move annual rainfall bias from -5% to +5%; observed planning recharge is 144,000 m³/yr. Submit one ceiling from 136,800, 144,000, 151,200, or 180,000 m³/yr that never exceeds corrected recharge.

**Complete format-specific interaction block:** `stress.assumption=rain_bias; range=[-0.05,0.05]; base=144000; candidates=[136800,144000,151200,180000]; correct=136800; rule="ceiling <= minimum credible recharge"`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 8 - Set the ceiling"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Move annual rainfall bias from -5% to +5%; observed planning recharge is 144,000 m³/yr. Submit one ceiling from 136,800, 144,000, 151,200, or 180,000 m³/yr that never exceeds corrected recharge."
  payload: "`stress.assumption=rain_bias; range=[-0.05,0.05]; base=144000; candidates=[136800,144000,151200,180000]; correct=136800; rule=\"ceiling <= minimum credible recharge\"`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "annual rainfall bias", min: -5, max: 5, nominal: 0.0, step: 1, unit: "%"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 0.0, max: 0.0}
      failsAt: 5
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 0.0, max: 5}
      failsAt: -5
    - id: robust_plan
      label: "`144,000 x 0.95 = 136,800 m³/yr`; adopt that conservative ceiling."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: -5, max: 5}
  robust: robust_plan
  question: "Move annual rainfall bias from -5% to +5%; observed planning recharge is 144,000 m³/yr. Submit one ceiling from 136,800, 144,000, 151,200, or 180,000 m³/yr that never exceeds corrected recharge."
```

**Correct result:** `144,000 x 0.95 = 136,800 m³/yr`; adopt that conservative ceiling.

**Answer text:** The completed check shows 144,000 x 0.95 = 136,800 m³/yr; adopt that conservative ceiling.

**Why:** Negative bias lowers credible recharge; feedback shows which candidates fail at -5%.

**Wrong-path feedback:** A ceiling of 144,000 m3/year or more ignores the -5% rainfall bias; 180,000 uses the unprotected mean rather than the minimum credible recharge.

**State/output:** Ceiling posted; clue for Day 4; delivery piece 2 posts.

## Mission outcome

Mission decision: Use 136,800 cubic metres per year as the planning withdrawal ceiling. It includes runoff, plant use, storage, dry years. And gauge bias. The ferry still appears possible. But chloride has begun rising before the summer visitor peak.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a sharp decision. Your evidence supports a clear decision: Use 136,800 cubic metres per year as the planning withdrawal ceiling. The council can act without sacrificing the island's future.

**Story event - exact player copy:** The council adopts 136,800 cubic metres per year as the planning ceiling for groundwater withdrawal.

**Target:** 12:00. **Story event:** Recharge estimate accepted. **Automatic:** Freshwater Security +5. **Canonical QA:** 67/45/40/40 after 11 RP to Evidence.  

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Groundwater Recharge Estimate. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Groundwater Recharge Estimate, the island ledger now has a water page, but its four destination rows are blank. Close the ledger now so the next decision uses every real input and output exactly once. Which environmental-science conclusion correctly applies Infiltration?

**Options - exact player copy:**

- A. The full input must be conserved; feedback displays the unclosed remainder.
- B. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- C. One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.
- D. Holdout years test generalization; wet or mean rules overfit favorable conditions.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Infiltration; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes water budget, not Infiltration. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- C: This describes unit conversion, not Infiltration. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes model validation, not Infiltration. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Groundwater Recharge Estimate: the island ledger now has a water page, but its four destination rows are blank. Close the ledger now so the next decision uses every real input and output exactly once. Which environmental-science conclusion correctly applies water budget?

**Options - exact player copy:**

- A. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- B. One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.
- C. The full input must be conserved; feedback displays the unclosed remainder.
- D. Holdout years test generalization; wet or mean rules overfit favorable conditions.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for water budget; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Infiltration, not water budget. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes unit conversion, not water budget. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. the full input must be conserved; feedback displays the unclosed remainder.
- D: This describes model validation, not water budget. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Groundwater Recharge Estimate using new evidence: with recharge depth established, Nkemdi needs the amount of water entering the usable aquifer area. Which environmental-science conclusion correctly applies unit conversion?

**Options - exact player copy:**

- A. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- B. The full input must be conserved; feedback displays the unclosed remainder.
- C. Holdout years test generalization; wet or mean rules overfit favorable conditions.
- D. One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for unit conversion; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Infiltration, not unit conversion. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes water budget, not unit conversion. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes model validation, not unit conversion. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. one metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Groundwater Recharge Estimate: the volume calculation fits the first ten years, so the dry years remain hidden. Which environmental-science conclusion correctly applies model validation?

**Options - exact player copy:**

- A. Holdout years test generalization; wet or mean rules overfit favorable conditions.
- B. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- C. The full input must be conserved; feedback displays the unclosed remainder.
- D. One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for model validation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. holdout years test generalization; wet or mean rules overfit favorable conditions.
- B: This describes Infiltration, not model validation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes water budget, not model validation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes unit conversion, not model validation. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Groundwater Recharge Estimate decision, the team knows this: because 144,000 m³/yr survives most held-out years, only measurement bias can still overturn it. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which environmental-science conclusion correctly applies uncertainty margin?

**Options - exact player copy:**

- A. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- B. Negative bias lowers credible recharge; feedback shows which candidates fail at -5%.
- C. The full input must be conserved; feedback displays the unclosed remainder.
- D. One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for uncertainty margin; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Infiltration, not uncertainty margin. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. negative bias lowers credible recharge; feedback shows which candidates fail at -5%.
- C: This describes water budget, not uncertainty margin. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes unit conversion, not uncertainty margin. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Groundwater Recharge Estimate to this follow-up: the island ledger now has a water page, but its four destination rows are blank. Close the ledger now so the next decision uses every real input and output exactly once. Which environmental-science conclusion correctly applies System?

**Options - exact player copy:**

- A. Water entering soil. Recharge: water reaching and replenishing an aquifer. Aquifer: underground material that stores and transmits groundwater. Uncertainty: a measured range within which the defensible value may lie.
- B. The full input must be conserved; feedback displays the unclosed remainder.
- C. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- D. One metre spread over one square metre is one cubic metre; unit tiles remain visible on retry.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for System; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Infiltration, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes water budget, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. a set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- D: This describes unit conversion, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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
**Card body:** Enough drinking water does not guarantee enough food or healthy land for more visitors. Plants, animals, and farms also depend on energy, nutrients, and space. Compare those limits and decide what the ferry plan must protect beyond the island's water supply.
**Objective:** Add ecological limits to the ferry plan.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 3: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m03_we01
    title: Plant energy available for growth
    problem: Plants capture 1000 kJ/m²/year as gross primary productivity and use 400 for respiration. Find net primary productivity.
    rule: NPP=GPP-plant respiration.
    steps:
    - 'Set up the relationship: NPP=GPP-plant respiration.'
    - NPP=1000-400=600 kJ/m²/year.
    answer: Net plant production is 600 kJ/m²/year.
    common_mistake: Do not subtract consumer respiration from this plant-only calculation.
  - id: carrying_m03_we02
    title: Transfer between trophic levels
    problem: Producers store 1000 energy units and an assumed 10% reaches primary consumers. How much reaches secondary consumers if the same fraction transfers again?
    rule: Energy at the next level=previous level energy×transfer efficiency.
    steps:
    - 'Set up the relationship: Energy at the next level=previous level energy×transfer efficiency.'
    - primary=1000(0.10)=100; secondary=100(0.10)=10 units.
    answer: Secondary consumers receive 10 units in this teaching model.
    common_mistake: Ten percent is a stated approximation here, not an exact universal ecological constant.
  - id: carrying_m03_we03
    title: Calculate ecological transfer efficiency
    problem: One trophic level produces 200 units and the next produces 30. Find transfer efficiency.
    rule: Efficiency=next-level production/previous-level production×100%.
    steps:
    - 'Set up the relationship: Efficiency=next-level production/previous-level production×100%.'
    - efficiency=30/200×100%=15%.
    answer: The measured transfer efficiency is 15%.
    common_mistake: Use comparable production measures over the same area and time.
  - id: carrying_m03_we04
    title: Matter cycles, energy flows
    problem: Plants absorb mineral nutrients and sunlight; decomposers later break down dead plants. Which input can be recycled locally?
    rule: Atoms can be recycled through food webs, while usable energy is progressively dispersed as heat.
    steps:
    - Decomposition can return nutrient atoms to soil for new uptake.
    - It does not turn all dispersed heat back into the original sunlight input.
    answer: Nutrients cycle; the ecosystem still needs new energy input.
    common_mistake: Recycling matter does not create a closed, lossless energy cycle.
  - id: carrying_m03_we05
    title: Total resource footprint
    problem: A group has 100 people, each requiring 2 hectares of productive area under a specified estimate. Find total footprint.
    rule: Total footprint=population×per-person footprint.
    steps:
    - 'Set up the relationship: Total footprint=population×per-person footprint.'
    - footprint=100(2)=200 hectares.
    answer: Estimated footprint is 200 hectares.
    common_mistake: Per-person use and population both affect the total.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Net primary productivity (NPP): plant energy stored after plants use some energy for respiration.

Gross primary productivity (GPP): all solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.

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

**Dialogue bubbles -** Iona Vale: "Nice work. Use the Stop 9 result to settle read recovery and habitat."

**Unlocks/waypoint:** Unlock Stop 10 at `soil-bench` in the Common Office.

**Beat 3 - After Stop 10 | `common-map` | automatic**

**World state:** After Stop 2: Update the persistent panel and  or the evidence-led waypoint.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Iona Vale: "Good thinking. Use the Stop 10 result to settle classify vulnerability."

**Unlocks/waypoint:** Unlock Stop 11 at `common-map` in Common Office.

**Beat 4 - After Stop 11 | `nitrogen-bench` | automatic**

**World state:** After Stop 3: Show the combined result and unlock the decision stop.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Iona Vale: "Exactly right. Use the Stop 11 result to settle test the fertilizer claim."

**Unlocks/waypoint:** Unlock Stop 12 at `nitrogen-bench` in Common Office.

**Beat 5 - At mission end | `common-map` | automatic**

**World state:** Outcome and hook: Apply the committed decision, show its world consequence, and name the next destination; Required bubbles pause until Continue.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Iona Vale: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Iona is defending fertilizer imports while bare patches spread near sheds. **Science:** productivity, trophic transfer, succession, biomes, niches, and island biogeography. **Mystery:** fertilizer raises yield but creates an accumulating surplus. **Stakes:** more food today may damage water and reef tomorrow. **One location:** Common Office, `soil-bench`, `nitrogen-bench`, `common-map`. Stops light energy and nutrient routes; the final control leaves a persistent “surplus nitrogen” flag.

## Characters and dramatic beat

Iona is defending fertilizer imports while bare patches spread near sheds. **Science:** productivity, trophic transfer, succession, biomes, niches, and island biogeography. **Mystery:** fertilizer raises yield but creates an accumulating surplus. **Stakes:** more food today may damage water and reef tomorrow. **One location:** Common Office, `soil-bench`, `nitrogen-bench`, `common-map`. Stops light energy and nutrient routes; the final control leaves a persistent “surplus nitrogen” flag.
## Key concepts, explained here

GPP is all captured plant energy; NPP is what remains after respiration. About 10% passes upward per trophic step. Climate defines broad biomes and aquatic light/bottom zones; disturbance starts primary or secondary succession. Generalists tolerate many conditions, specialists fewer; small remote islands lose species readily.

## Stop 9 - Count usable plant energy

**Format/placement:** BALLPARK, at `common-map`.

**Metadata:** Concept: 3 - GPP/NPP and 10% law; Keystone: energy flow; Area: Turbine Yard; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** The groundwater limit does not establish how many grazing animals the common can feed.

**Question card story setup - exact player copy:** The water ceiling is now fixed, but the common can still be overstocked by counting all captured sunlight. Calculate usable plant production, then follow its loss to grazing animals.

**Question card story-science connection - exact player copy:** Net plant production and transfer to herbivores set the energy available for stocking the common.

**Question card prompt - exact player copy:** First calculate NPP from GPP 18,000 kJ/m²/yr and plant respiration 8,000 kJ/m²/yr. Then apply 10% transfer and submit herbivore production in kJ/m²/yr.

**Complete format-specific interaction block:** `estimate.values=[18000,-8000,0.10]; formula="(GPP-R)*0.10"; correct=1000; target=1000; tolerance=0.01`.

**Correct result:** NPP is 10,000 kJ/m²/yr; herbivore production is about 1,000 kJ/m²/yr.

**Answer text:** The completed check shows nPP is 10,000 kJ/m²/yr; herbivore production is about 1,000 kJ/m²/yr.

**Why:** Plants use part of GPP, and most remaining energy is lost as heat between levels.

**Wrong-path feedback:** Using GPP directly skips plant respiration, while applying 10% before finding NPP transfers energy the plants already used; both overstate herbivore production.

**State/output:** Grazing energy cap appears; unlocks Stop 3.2.

## Stop 10 - Read recovery and habitat

**Format/placement:** SEQUENCE, at `soil-bench`.

**Metadata:** Concept: 6 - succession, biomes, aquatic zones; Keystone: biodiversity/resilience; Area: Reef Station; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the soil bench, in the Common Office.

**Stop reason - exact player copy:** The grazing limit needs to account for land that is still recovering from fire.

**Question card story setup - exact player copy:** With grazing energy capped, Iona points to a burned field where soil remains. Order its recovery path, then compare its timescale with the separately displayed bare-rock reference, before the council changes the ferry plan affecting the island's limited resources.

**Question card story-science connection - exact player copy:** The succession pathway distinguishes soil-supported recovery from bare-rock recovery when the council evaluates future habitat availability.

**Question card prompt - exact player copy:** Order the four burned-field recovery cards from disturbance through later community, then submit why this secondary-succession path is faster than the displayed bare-rock reference.

**Complete format-specific interaction block:** `cards=[bare_rock,pioneers,soil,later,disturbance,grasses,shrubs]; order_primary=[bare_rock,pioneers,soil,later]; order_secondary=[disturbance,grasses,shrubs,later]; axis=ecological_recovery; answer=secondary`.

**§7 build completion - SEQUENCE:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
sequence:
  cards: [{id:A,label:"establish baseline"},{id:B,label:"apply the stated change"},{id:C,label:"measure response"},{id:D,label:"restore and remeasure"}]
  order: [A,B,C,D]
```

**Handback 4 canonical interaction block - SEQUENCE:**

**Handback 5 canonical interaction block - SEQUENCE:**

```yaml
sequence:
  cards:
    - {id: disturbance, label: "Disturbance leaves soil"}
    - {id: grasses, label: "Grasses return"}
    - {id: shrubs, label: "Shrubs return"}
    - {id: later_secondary, label: "Later community recovers"}
  order: [disturbance, grasses, shrubs, later_secondary]
  comparisonReference: "Bare rock must first acquire pioneers and soil, so primary succession takes longer."
  correctConclusion: "Secondary succession is faster because soil, microbes, and seeds remain."
```

**Correct result:** The burned soil follows secondary succession and can recover in roughly 10-50 years; bare rock primary succession often takes 100+ years.

**Answer text:** The completed check shows the burned soil follows secondary succession and can recover in roughly 10-50 years; bare rock primary succession often takes 100+ years.

**Why:** Existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.

**Wrong-path feedback:** Calling bare-rock recovery secondary ignores the lack of soil; calling the burned-soil path primary ignores the surviving soil and therefore exaggerates recovery time.

**State/output:** Recovery zones labeled; aquatic inset labels photic, aphotic, littoral, pelagic, benthic; unlocks Stop 3.3.

## Stop 11 - Classify vulnerability

**Format/placement:** TRIAGE, asked by Iona Vale beside `common-map`.

**Metadata:** Concept: 7 - generalist/specialist, island biogeography, life history preview; Keystone: biodiversity/resilience; Area: Reef Station; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Iona Vale, at the common map in Common Office.

**Stop reason - exact player copy:** The recovery map shows that habitat damage will not affect every island species equally.

**Question card story setup - exact player copy:** Because damaged soils recover at different rates, species using them also face different risk. Sort a broad-diet generalist and a narrow-habitat specialist for monitoring, protection, or routine watch.

**Question card story-science connection - exact player copy:** Species specialization and breeding vulnerability determine which populations need protection before ferry expansion.

**Question card prompt - exact player copy:** Assign island rat, cliff-nesting petrel, fast-growing grass, and slow-breeding seal to `routine`, `monitor`, or `protect first`; submit one complete triage.

**Complete format-specific interaction block:** `choices={rat:routine,grass:routine,petrel:protect_first,seal:monitor}; answer=petrel; why="specialist on small remote island"; rebuttals={rat:"generalist",grass:"rapid recovery",seal:"K-selected but broader marine range"}`.

**Correct result:** Protect the petrel first; monitor the seal; routine watch for the generalists.

**Answer text:** The completed check shows protect the petrel first; monitor the seal; routine watch for the generalists.

**Why:** Narrow niches and isolation limit recolonization; feedback contrasts niche breadth.

**Wrong-path feedback:** Protecting the rat or grass first favors fast-growing generalists; treating the slow-breeding seal as routine ignores its low replacement rate, while the cliff petrel has the narrowest habitat.

**State/output:** Petrel habitat hatched with text label; unlocks Stop 3.4.

## Stop 12 - Test the fertilizer claim

**Format/placement:** CONTROL, at `nitrogen-bench`.

**Metadata:** Concept: 5 - limiting nutrients and controlled experiment; Keystone: experimental causality; Area: Chapel Council Room; Learning role: TRANSFER; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the nitrogen bench, in Common Office.

**Stop reason - exact player copy:** Fertilizer is proposed to raise production despite the island's newly established ecological limits.

**Question card story setup - exact player copy:** The energy and habitat limits are mapped, yet fertilizer is proposed as the escape. Test equal plots to see whether added nitrogen raises crop yield without creating a larger nitrate loss.

**Question card story-science connection - exact player copy:** The yield gain and nitrate increase determine whether extra fertilizer solves a food constraint by creating a water-quality problem.

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

**Happy ending card - exact player copy:** Outstanding reasoning. The key result is now settled: Limit ferry growth to what farms and wild systems can support. Your evidence gives the community a fairer and safer path forward.

**Story event - exact player copy:** The ferry plan is capped at the level the island's farms, food supply, and habitats can support.

**Target:** 12:00. **Story event:** Ecological limits mapped. **Automatic:** Evidence +5. **Canonical QA:** 83/45/40/40 after 11 RP to Evidence.  

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Ecological Limits. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Ecological Limits, the water ceiling is now fixed, but the common can still be overstocked by counting all captured sunlight. Which environmental-science conclusion correctly applies Net primary productivity (NPP)?

**Options - exact player copy:**

- A. All solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- B. Plant energy stored after plants use some energy for respiration.
- C. Plants use part of GPP, and most remaining energy is lost as heat between levels.
- D. Existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Net primary productivity (NPP); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Gross primary productivity (GPP), not Net primary productivity (NPP). It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. plant energy stored after plants use some energy for respiration.
- C: This describes GPP/NPP and 10% law, not Net primary productivity (NPP). It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes succession, biomes, aquatic zones, not Net primary productivity (NPP). It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Ecological Limits: the water ceiling is now fixed, but the common can still be overstocked by counting all captured sunlight. Which environmental-science conclusion correctly applies Gross primary productivity (GPP)?

**Options - exact player copy:**

- A. Plant energy stored after plants use some energy for respiration.
- B. Plants use part of GPP, and most remaining energy is lost as heat between levels.
- C. All solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- D. Existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Gross primary productivity (GPP); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Net primary productivity (NPP), not Gross primary productivity (GPP). It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes GPP/NPP and 10% law, not Gross primary productivity (GPP). It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. all solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- D: This describes succession, biomes, aquatic zones, not Gross primary productivity (GPP). It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Ecological Limits using new evidence: the water ceiling is now fixed, but the common can still be overstocked by counting all captured sunlight. Which environmental-science conclusion correctly applies GPP/NPP and 10% law?

**Options - exact player copy:**

- A. Plant energy stored after plants use some energy for respiration.
- B. All solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- C. Existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.
- D. Plants use part of GPP, and most remaining energy is lost as heat between levels.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for GPP/NPP and 10% law; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Net primary productivity (NPP), not GPP/NPP and 10% law. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Gross primary productivity (GPP), not GPP/NPP and 10% law. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes succession, biomes, aquatic zones, not GPP/NPP and 10% law. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. plants use part of GPP, and most remaining energy is lost as heat between levels.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Ecological Limits: with grazing energy capped, Iona points to a burned field where soil remains. Which environmental-science conclusion correctly applies succession, biomes, aquatic zones?

**Options - exact player copy:**

- A. Existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.
- B. Plant energy stored after plants use some energy for respiration.
- C. All solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- D. Plants use part of GPP, and most remaining energy is lost as heat between levels.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for succession, biomes, aquatic zones; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. existing soil preserves nutrients and organisms; feedback highlights the missing prerequisite.
- B: This describes Net primary productivity (NPP), not succession, biomes, aquatic zones. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Gross primary productivity (GPP), not succession, biomes, aquatic zones. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes GPP/NPP and 10% law, not succession, biomes, aquatic zones. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Ecological Limits decision, the team knows this: because damaged soils recover at different rates, species using them also face different risk. Rank the cases now so limited time goes first to the failures that can change the mission decision. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Habitat condition",
  "yLabel": "Relative survival",
  "caption": "A generalist retains survival across more habitat conditions.",
  "bars": [
    {
      "name": "Generalist, condition 1",
      "value": 72
    },
    {
      "name": "Generalist, condition 2",
      "value": 68
    },
    {
      "name": "Generalist, condition 3",
      "value": 64
    },
    {
      "name": "Specialist, condition 1",
      "value": 90
    },
    {
      "name": "Specialist, condition 2",
      "value": 42
    },
    {
      "name": "Specialist, condition 3",
      "value": 8
    }
  ]
}
```


**Options - exact player copy:**

- A. Plant energy stored after plants use some energy for respiration.
- B. Narrow niches and isolation limit recolonization; feedback contrasts niche breadth.
- C. All solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- D. Plants use part of GPP, and most remaining energy is lost as heat between levels.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Net primary productivity (NPP), not generalist/specialist, island biogeography, life history preview. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. narrow niches and isolation limit recolonization; feedback contrasts niche breadth.
- C: This describes Gross primary productivity (GPP), not generalist/specialist, island biogeography, life history preview. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes GPP/NPP and 10% law, not generalist/specialist, island biogeography, life history preview. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Ecological Limits to this follow-up: the energy and habitat limits are mapped, yet fertilizer is proposed as the escape. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which environmental-science conclusion correctly applies limiting nutrients and controlled experiment?

**Options - exact player copy:**

- A. Plant energy stored after plants use some energy for respiration.
- B. All solar energy captured by plants before subtracting respiration. Trophic level: a feeding position in a food web. Succession: predictable community change after new land or disturbance. Niche: the resources and conditions a species uses.
- C. Holding other variables fixed and reversing nitrogen isolates its effect; retry identifies any changed control.
- D. Plants use part of GPP, and most remaining energy is lost as heat between levels.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for limiting nutrients and controlled experiment; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Net primary productivity (NPP), not limiting nutrients and controlled experiment. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Gross primary productivity (GPP), not limiting nutrients and controlled experiment. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. holding other variables fixed and reversing nitrogen isolates its effect; retry identifies any changed control.
- D: This describes GPP/NPP and 10% law, not limiting nutrients and controlled experiment. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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
**Card body:** Salt appeared in a well before the busiest visitor season. Heavy pumping may have drawn seawater into the underground freshwater supply. Compare the rocks, water levels, and timing of the salt increase, then decide what caused the warning and when pumping should be restricted.
**Objective:** Diagnose the salt pathway and set an aquifer warning.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 4: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m04_we01
    title: Porosity versus permeability
    problem: One rock contains many isolated pores; another has fewer but well-connected pores. Which can transmit water more readily?
    rule: Porosity describes void space; permeability describes how readily connected pathways transmit fluid.
    steps:
    - Many isolated pores can store water without providing a through-path.
    - Connected pores can allow easier flow even with less total void space.
    answer: The second rock can be more permeable; pore abundance alone does not decide.
    common_mistake: High porosity does not guarantee high permeability.
  - id: carrying_m04_we02
    title: Pumping near the coast
    problem: A coastal freshwater well is pumped heavily and salt concentration rises. Explain a plausible mechanism.
    rule: Excessive withdrawal can lower freshwater pressure that limits seawater intrusion.
    steps:
    - Pumping reduces the freshwater level and pressure near the well.
    - Saltwater can move into the depleted zone along connected pathways.
    answer: The pattern is consistent with seawater intrusion, requiring site evidence to confirm.
    common_mistake: Salt appearing in a well does not by itself prove which pumping site caused it.
  - id: carrying_m04_we03
    title: Withdrawals versus replenishment
    problem: A groundwater store gains 100 units/year and withdrawals are 120 units/year, with other flows balanced. Find the annual stock change.
    rule: Stock change=recharge-withdrawal.
    steps:
    - 'Set up the relationship: Stock change=recharge-withdrawal.'
    - Δstock=100-120=-20 units/year.
    answer: The stock shrinks by 20 units each year under these assumptions.
    common_mistake: Stable delivery can conceal depletion of stored water.
  - id: carrying_m04_we04
    title: Estimate recharge
    problem: Annual rain volume is 1000 m³; runoff removes 300 and evaporation plus plant use removes 500. Assume the remaining water recharges groundwater.
    rule: Recharge=rainfall-runoff-evaporation and plant use.
    steps:
    - 'Set up the relationship: Recharge=rainfall-runoff-evaporation and plant use.'
    - recharge=1000-300-500=200 m³/year.
    answer: Estimated recharge is 200 m³/year under this simplified balance.
    common_mistake: Not all rainfall becomes groundwater.
  - id: carrying_m04_we05
    title: Read an inclusive threshold
    problem: A fictional laboratory rule permits a sample concentration at or below 5 mg/L. A sample measures exactly 5 mg/L. Classify it under that rule.
    rule: At or below means concentration ≤ limit.
    steps:
    - comparison = 5 ≤ 5, which is true. Equality is included.
    - classification = passes this concentration rule. No claim about other requirements follows.
    answer: This measurement passes the stated inclusive threshold.
    common_mistake: Replacing ≤ with < would wrongly exclude equality.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Porosity: the fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.

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

**Dialogue bubbles -** Nkemdi Okafor: "Nice work. Use the Stop 13 result to settle probe the salt front."

**Unlocks/waypoint:** Unlock Stop 14 at `store-gauges` in Waterworks.

**Beat 3 - After Stop 14 | `store-gauges` | automatic**

**World state:** After Stop 14: W3-W5 receive persistent `SALT FRONT` tags and the combined diagnostic panel unlocks.

**Panel/HUD text:** SALT FRONT

**Dialogue bubbles -** Nkemdi Okafor: "Good thinking. Use the Stop 14 result to settle diagnose the early warning."

**Unlocks/waypoint:** Unlock Stop 15 at `store-gauges` in Waterworks.

**Beat 4 - After Stop 15 | `store-gauges` | automatic**

**World state:** After Stop 15: The pump control flashes beside the falling-head record and unlocks the trigger.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Nkemdi Okafor: "Exactly right. Use the Stop 15 result to settle write the aquifer trigger."

**Unlocks/waypoint:** Unlock Stop 16 at `store-gauges` in Waterworks.

**Beat 5 - At mission end | `rain-bench` | automatic**

**World state:** Outcome and hook: The pump stops on the third update, the 1.0 m plaque remains, and the landings record becomes the next waypoint; Required bubbles pause until Continue.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Nkemdi Okafor: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**One location:** Waterworks (`WATER`). Stops 13-16 move among `rain-bench` and `store-gauges`; no distant travel is required because the soil core, synchronized wells, pumping record, and trigger control are uniquely available here.

## Characters and dramatic beat

Nkemdi begins suspicious of visitor demand, but accepts the earlier-than-summer chloride timing. Her repeated question, “What changed upstream?”, shifts attention from blame to falling freshwater head. The mission’s first major reversal is physical and visible: steady high pumping under low recharge, not the visitor peak alone, pulls seawater inland.

## Key concepts, explained here

Porosity measures available pore space, while permeability measures whether those pores connect well enough to transmit water. Sand often drains quickly; clay drains slowly and can store water and nutrients. When pumping lowers freshwater head near a coast, seawater can advance inland before a tap’s chloride concentration exceeds its drinking-water limit.

## Stop 13 - Read the ground

**Format/placement:** PROTOCOL, at `rain-bench`.

**Metadata:** Concept: 14 - soil horizons/weathering/texture; Keystone: soil-land use; Area: Waterworks; Learning role: INTRODUCE; Difficulty: L2; Story role: evidence.

**Call - exact player copy:** Go to the rain bench, in Waterworks.

**Stop reason - exact player copy:** The fertilizer result and coastal chloride warning make groundwater pathways the next uncertainty.

**Question card story setup - exact player copy:** The nitrate surplus points toward groundwater, and the chloride warning demands a travel-time check. Match each core feature to the soil process or texture that controls infiltration and storage.

**Question card story-science connection - exact player copy:** The soil-core matches identify layers that transmit pollution quickly and layers that store water beneath the island.

**Question card prompt - exact player copy:** Match frost-split rock, rusted mineral, coarse sand, dense clay, pale E horizon, and enriched B horizon to physical weathering, chemical weathering, fast drainage, slow drainage, leaching, and accumulation.

**Complete format-specific interaction block:** `mapping={frost_split:physical,rust:chemical,sand:fast,clay:slow,E:leaching,B:accumulation}`.

**Correct result:** The six mappings establish a sandy, permeable coastal path above a clay-rich storage layer.

**Answer text:** The completed check shows the six mappings establish a sandy, permeable coastal path above a clay-rich storage layer.

**Why:** Weathering creates particles; texture and horizons govern water movement.

**Wrong-path feedback:** Coarse sand cannot be the slow-drainage layer, clay cannot be the fast path, and swapping E with B reverses leaching and accumulation in the soil profile.

**State/output:** Core layers label O-A-E-B-C-R; unlocks probe.

## Stop 14 - Probe the salt front

**Format/placement:** PROBE, at `store-gauges`.

**Metadata:** Concept: 16 - aquifer profile; Keystone: water quantity; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The permeable coastal layer needs a well-by-well check before the chloride warning is diagnosed.

**Question card story setup - exact player copy:** With the permeable coastal layer identified, take depth readings from inland to shore. Locate where chloride rises while nitrate remains quiet, then name the broken groundwater pattern.

**Question card story-science connection - exact player copy:** The first chloride break and freshwater-head pattern locate the salt front without confusing it with nitrate contamination.

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

**Metadata:** Concept: 16 - coupled groundwater evidence; Keystone: water quantity; Area: Waterworks; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The well survey has located the salt front but has not yet explained why it advanced.

**Question card story setup - exact player copy:** The probe found a coastal salt front before the tourist peak. Combine that pattern with pumping, rainfall, and nitrate records to reject explanations that fit only one alarm.

**Question card story-science connection - exact player copy:** The combined pumping, recharge, and chemistry evidence determines which cause the aquifer protection plan must address.

**Question card prompt - exact player copy:** Select the single cause that fits every panel zone.

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Distance inland (km)",
  "yLabel": "Chloride (mg/L)",
  "caption": "Chloride rises farther inland during the warning period.",
  "series": [
    {
      "name": "Earlier",
      "points": [
        [
          0,
          600
        ],
        [
          2,
          380
        ],
        [
          4,
          190
        ],
        [
          6,
          90
        ]
      ]
    },
    {
      "name": "Current",
      "points": [
        [
          0,
          640
        ],
        [
          2,
          470
        ],
        [
          4,
          310
        ],
        [
          6,
          180
        ]
      ]
    }
  ]
}
```


**Complete format-specific interaction block:** `headline="Chloride before summer"; readings={chloride:"42 to 390 mg/L shoreward",head:"3.2 to 0.2 m",nitrate:"stable 4.0-4.2 mg/L",rain:"below planning year",visitors:"not yet peaked",pumping:"continuous high"}; choices={visitor_sewage,road_salt,fertilizer,pumping_intrusion}; answer=pumping_intrusion; mechanisms supplied per choice`.

**Correct result:** Continuous pumping under low recharge lowered freshwater head and pulled seawater inland.

**Answer text:** The completed check shows continuous pumping under low recharge lowered freshwater head and pulled seawater inland.

**Why:** Visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.

**Wrong-path feedback:** Drought alone does not explain the shoreward chloride gradient, and fertilizer does not fit quiet nitrate; only pumping plus low recharge fits every panel zone.

**State/output:** Pump warning flashes with text; unlocks trigger.

## Stop 16 - Write the aquifer trigger

**Format/placement:** TRIGGER, at `store-gauges`.

**Metadata:** Concept: 16 - environmental thresholds; Keystone: policy instruments; Area: Chapel Council Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** The drawdown diagnosis requires an action rule before the next well update arrives.

**Question card story setup - exact player copy:** Because drawdown explains the salt front, the warning must act before drinking water fails. Write the threshold now, then test it against new well updates without moving the line.

**Question card story-science connection - exact player copy:** The freshwater-head threshold determines when pumping must stop to prevent further seawater intrusion.

**Question card prompt - exact player copy:** Set an inclusive stop-pumping rule on freshwater head from 0.0 to 3.0 m; objective is prevent chloride above 250 mg/L, and campaign evidence shows risk begins at head <=1.0 m. Commit 1.0 m, reveal updates, then submit `STOP` when the threshold is met.

**Complete format-specific interaction block:** `trigger.rule="stop pumping when head <= threshold"; scale=[0,3]; anchors=[0.5,0.9,1.5,2.0]; objective="chloride <=250 mg/L"; direction=lower_is_worse; consequence_limit=250; correct_threshold=1.0; updates=[1.4,1.1,1.0,0.8]`.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 16 - Write the aquifer trigger"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Set an inclusive stop-pumping rule on freshwater head from 0.0 to 3.0 m; objective is prevent chloride above 250 mg/L, and campaign evidence shows risk begins at head <=1.0 m. Commit 1.0 m, reveal updates, then submit `STOP` when the threshold is met."
  payload: "`trigger.rule=\"stop pumping when head <= threshold\"; scale=[0,3]; anchors=[0.5,0.9,1.5,2.0]; objective=\"chloride <=250 mg/L\"; direction=lower_is_worse; consequence_limit=250; correct_threshold=1.0; updates=[1.4,1.1,1.0,0.8]`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "freshwater head", min: 0, max: 3, step: 0.1, unit: "m"}
  start: 0.6
  anchors:
    - {at: 0.6, means: "routine baseline, not the decision threshold"}
    - {at: 1.95, means: "elevated evidence requiring attention"}
  direction: falling
  updates:
    - {at: "T-48 h", value: 1.4, hoursLeft: 48}
    - {at: "T-24 h", value: 1.1, hoursLeft: 24}
    - {at: "T-12 h", value: 1.0, hoursLeft: 12}
    - {at: "T-6 h", value: 0.8, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 1.01, max: 3}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 0, max: 1}, leadHours: 12}
  question: "Set an inclusive stop-pumping rule on freshwater head from 0.0 to 3.0 m; objective is prevent chloride above 250 mg/L, and campaign evidence shows risk begins at head <=1.0 m. Commit 1.0 m, reveal updates, then submit `STOP` when the threshold is met."
```

**Correct result:** Stop at head <=1.0 m; the third update triggers action.

**Answer text:** The completed check shows stop at head <=1.0 m; the third update triggers action.

**Why:** Freshwater pressure holds seawater back; waiting below 1.0 m advances the front.

**Wrong-path feedback:** A threshold below 1.0 m acts after the documented risk begins, while a higher threshold stops safe pumping; using a strict `<` rule misses the inclusive 1.0 m boundary.

**State/output:** Pump gains threshold plaque; delivery piece 4 posts.

## Mission outcome

Mission decision: The well is salty because pumping lowered fresh water pressure. Seawater then moved into the aquifer. Stop pumping at 1.0 metre or less. Next, test if steady fish catch hides loss.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You handled that beautifully. You gave the team its answer: The well is salty because pumping lowered fresh water pressure. The island's water, wildlife, and families are better protected.

**Story event - exact player copy:** The island stops pumping when the freshwater level reaches 1.0 metre and seawater intrusion threatens the well.

**Target:** 13:00. **Story event:** Aquifer warning posted. **Automatic:** Water +5. **Canonical QA:** 85/59/40/40 after Evidence 2 and Water 9.  

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Aquifer Warning. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Aquifer Warning, the nitrate surplus points toward groundwater, and the chloride warning demands a travel-time check. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which environmental-science conclusion correctly applies Porosity?

**Options - exact player copy:**

- A. Weathering creates particles; texture and horizons govern water movement.
- B. The fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- C. Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.
- D. Visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Porosity; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes soil horizons/weathering/texture, not Porosity. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. the fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- C: This describes aquifer profile, not Porosity. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes coupled groundwater evidence, not Porosity. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Aquifer Warning: the nitrate surplus points toward groundwater, and the chloride warning demands a travel-time check. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which environmental-science conclusion correctly applies soil horizons/weathering/texture?

**Options - exact player copy:**

- A. The fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- B. Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.
- C. Weathering creates particles; texture and horizons govern water movement.
- D. Visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for soil horizons/weathering/texture; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Porosity, not soil horizons/weathering/texture. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes aquifer profile, not soil horizons/weathering/texture. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. weathering creates particles; texture and horizons govern water movement.
- D: This describes coupled groundwater evidence, not soil horizons/weathering/texture. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Aquifer Warning using new evidence: the nitrate surplus points toward groundwater, and the chloride warning demands a travel-time check. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Distance inland (km)",
  "yLabel": "Chloride (mg/L)",
  "caption": "Chloride decreases with distance from the coast.",
  "series": [
    {
      "name": "Chloride",
      "points": [
        [
          0,
          620
        ],
        [
          2,
          410
        ],
        [
          4,
          240
        ],
        [
          6,
          130
        ],
        [
          8,
          75
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. The fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- B. Weathering creates particles; texture and horizons govern water movement.
- C. Visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.
- D. Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Porosity, not aquifer profile. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes soil horizons/weathering/texture, not aquifer profile. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes coupled groundwater evidence, not aquifer profile. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Aquifer Warning: the probe found a coastal salt front before the tourist peak. Which environmental-science conclusion correctly applies coupled groundwater evidence?

**Options - exact player copy:**

- A. Visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.
- B. The fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- C. Weathering creates particles; texture and horizons govern water movement.
- D. Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for coupled groundwater evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. visitor sewage or fertilizer should raise nitrate; road salt would not track falling aquifer head.
- B: This describes Porosity, not coupled groundwater evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes soil horizons/weathering/texture, not coupled groundwater evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes aquifer profile, not coupled groundwater evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Aquifer Warning decision, the team knows this: the nitrate surplus points toward groundwater, and the chloride warning demands a travel-time check. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Ordered measurement",
  "yLabel": "Decision quantity",
  "caption": "Measurements approach and then cross the action threshold.",
  "series": [
    {
      "name": "Measured",
      "points": [
        [
          1,
          42
        ],
        [
          2,
          48
        ],
        [
          3,
          55
        ],
        [
          4,
          63
        ],
        [
          5,
          71
        ]
      ]
    }
  ],
  "limit": {
    "at": 60,
    "label": "Action threshold"
  }
}
```


**Options - exact player copy:**

- A. The fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- B. Freshwater pressure holds seawater back; waiting below 1.0 m advances the front.
- C. Weathering creates particles; texture and horizons govern water movement.
- D. Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Porosity, not environmental thresholds. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. freshwater pressure holds seawater back; waiting below 1.0 m advances the front.
- C: This describes soil horizons/weathering/texture, not environmental thresholds. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes aquifer profile, not environmental thresholds. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Aquifer Warning to this follow-up: with the permeable coastal layer identified, take depth readings from inland to shore. Sample the locations in order now so the crew can identify where the system first departs from normal. Which environmental-science conclusion correctly applies System?

**Options - exact player copy:**

- A. The fraction of material made of open space. Permeability: how readily connected pores transmit water. Saltwater intrusion: seawater moving into a freshwater aquifer. Soil horizon: a layer formed by additions, losses, movement, and change.
- B. Weathering creates particles; texture and horizons govern water movement.
- C. A set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- D. Different tracers separate seawater from fertilizer; retry overlays the quiet nitrate series.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for System; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Porosity, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes soil horizons/weathering/texture, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. a set of connected parts studied together. Reservoir: a place where matter is stored. Flux: an amount moving between stores per unit time. Watershed: land whose water drains to one shared water body.
- D: This describes aquifer profile, not System. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** Fishing boats still bring back fish, but crews are working longer for each tonne they catch. Steady catches may hide a shrinking fish population. Compare the population and habitat evidence, then set a catch limit that keeps fishing possible in future years.

**Objective:** Set a sustainable and enforceable fishery ceiling.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 5: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m05_we01
    title: Population balance
    problem: A population starts at 100, with 20 births, 5 immigrants, 10 deaths and 5 emigrants. Find its ending size.
    rule: N_end=N_start+births+immigration-deaths-emigration.
    steps:
    - 'Set up the relationship: N_end=N_start+births+immigration-deaths-emigration.'
    - N_end=100+20+5-10-5=110.
    answer: The population increases by 10 to 110.
    common_mistake: Immigration adds individuals; emigration removes them.
  - id: carrying_m05_we02
    title: Growth below capacity
    problem: Use growth rate rN(1-N/K), with r=0.2/year, N=50 and K=100. Find current growth.
    rule: Logistic growth includes a capacity factor 1-N/K.
    steps:
    - 'Set up the relationship: Logistic growth includes a capacity factor 1-N/K.'
    - growth=0.2(50)(1-50/100)=5 individuals/year.
    answer: Current growth is 5 per year.
    common_mistake: The capacity term changes as population size changes.
  - id: carrying_m05_we03
    title: Catch per unit effort
    problem: A fleet catches 100 tonnes in 10 trips one year and 100 tonnes in 20 trips the next. Compare catch per trip.
    rule: Catch per effort=catch/effort under comparable fishing conditions.
    steps:
    - 'Set up the relationship: Catch per effort=catch/effort under comparable fishing conditions.'
    - first=100/10=10 tonnes/trip; second=100/20=5 tonnes/trip.
    answer: Catch per trip halves, a warning even though total catch is unchanged.
    common_mistake: Effort and other fishing conditions must be considered before interpreting catch totals.
  - id: carrying_m05_we04
    title: Compare ecological vulnerability
    problem: A species eats one seed type; another eats many seeds and insects. A drought removes that one seed type. Which has fewer food alternatives?
    rule: Specialists use a narrower resource range than generalists.
    steps:
    - The specialist loses its primary food source.
    - The generalist has other possible foods, though they may also be affected.
    answer: The specialist has fewer alternatives under this stated disturbance.
    common_mistake: Generalists are not immune to environmental change.
  - id: carrying_m05_we05
    title: Set a simplified harvest ceiling
    problem: A stock adds an estimated 40 individuals per year before harvest, with other flows balanced. Compare harvests of 30 and 50.
    rule: Net annual change=biological addition-harvest.
    steps:
    - 'Set up the relationship: Net annual change=biological addition-harvest.'
    - with 30 harvested, change=40-30=+10; with 50, change=40-50=-10.
    answer: Only the 30-individual harvest avoids decline in this simplified estimate.
    common_mistake: A growth estimate has uncertainty and may change with stock size.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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
**Equation:** `N_t=N_0λ^t`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `N_t` population after `t` periods; `N_0` initial population; `λ` per-period population multiplier; `t` number of periods.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `N_t=K/(1+e^-rt)`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `N_t` population at time `t`; `K` carrying capacity; `r` intrinsic growth rate per unit time; `t` time; `e` the exponential constant.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `t_d≈0.69/r`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `t_d` doubling time; `r` decimal growth rate per unit time.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

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

**Dialogue bubbles -** Tomas Reed: "Nice work. Use the Stop 17 result to settle read the survivorship curves."

**Unlocks/waypoint:** Unlock Stop 18 at `transect-bench` in Reef Station.

**Beat 3 - After Stop 18 | `flow-tank` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Tomas Reed: "Good thinking. Use the Stop 18 result to settle verify logistic recovery."

**Unlocks/waypoint:** Unlock Stop 19 at `flow-tank` in Reef Station.

**Beat 4 - After Stop 19 | `transect-bench` | automatic**

**World state:** Synthesis: Stop 19 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Tomas Reed: "Exactly right. Use the Stop 19 result to settle fund an enforceable ceiling."

**Unlocks/waypoint:** Unlock Stop 20 at `transect-bench` in Reef Station.

**Beat 5 - At mission end | `landings-book` | automatic**

**World state:** Decision and hook: Stop 20 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

At Harbour, paper effort data reveal falling catch per boat-hour; that result unlocks Reef Station, whose nursery counts determine recovery. Tomas shifts from defending landings to supporting effort controls. Panels progress `steady tonnes -> falling efficiency -> nursery bottleneck -> ceiling`. **Science:** population models and life histories. **Mystery:** stable landings conceal decline. **Stakes:** collapse removes food and income.

## Characters and dramatic beat

At Harbour, paper effort data reveal falling catch per boat-hour; that result unlocks Reef Station, whose nursery counts determine recovery. Tomas shifts from defending landings to supporting effort controls. Panels progress `steady tonnes -> falling efficiency -> nursery bottleneck -> ceiling`. **Science:** population models and life histories. **Mystery:** stable landings conceal decline. **Stakes:** collapse removes food and income.

## Key concepts, explained here

Exponential growth assumes no limit; logistic growth slows near K. Type I survivorship has low early death, Type II constant death, Type III high early death. Density-dependent limits include disease and competition; weather and disasters are density-independent.

## Stop 17 - Measure catch per unit effort

**Format/placement:** BALLPARK, at `landings-book`.

**Metadata:** Concept: 19 - catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue; Keystone: catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue.

**Call - exact player copy:** Go to the landings book, in Harbour Office.

**Stop reason - exact player copy:** The recovered boat-hour records can test whether unchanged landings conceal a weakening fish stock.

**Question card story setup - exact player copy:** The paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Calculate catch per unit effort in two years to test whether steady landings mean a steady stock.

**Question card story-science connection - exact player copy:** Catch per boat-hour distinguishes stable extraction from the growing effort required to obtain it.

**Question card prompt - exact player copy:** “Using 960 t/4,800 boat-h in Year 1 and 960 t/8,000 boat-h in Year 5, submit both rates in kg/boat-h and the percent decline.”

**Complete format-specific interaction block:** `formula=1000*tonnes/hours; truth=[200,120,40%]; tolerance=1%`

**Correct result:** `200 and 120 kg/boat-h; decline=(200-120)/200=40%`

**Answer text:** The completed check shows 200 and 120 kg/boat-h; decline=(200-120)/200=40%.

**Why:** Falling catch per effort signals depletion hidden by added work

**Wrong-path feedback:** dividing tonnes alone misses effort

**State/output:** unlock travel, waypoint “Take the effort decline to Reef Station.”

## Stop 18 - Read the survivorship curves

**Format/placement:** CHOICE, at `transect-bench`.

**Metadata:** Concept: 12 - survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence; Keystone: survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence.

**Call - exact player copy:** Go to the transect bench, in Reef Station.

**Stop reason - exact player copy:** Declining catch efficiency makes species recovery expectations important to the fishing limit.

**Question card story setup - exact player copy:** Because catch efficiency fell 40%, landings no longer measure stock health. Plot juvenile survival for a Type III fish and compare it with a slow-breeding seal before assigning recovery expectations.

**Question card story-science connection - exact player copy:** The survivorship curves distinguish early juvenile losses from late-life mortality when planning fish and seal protection.

**Question card prompt - exact player copy:** “Place the fish survival cloud through [1000,180,90,55,40] survivors by age and the seal through [100,96,90,70,0]; submit Type III for fish and Type I for seal.”

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Age class",
  "yLabel": "Survivors",
  "caption": "Fish show Type III survival while seals show Type I survival.",
  "series": [
    {
      "name": "Fish",
      "points": [
        [
          0,
          1000
        ],
        [
          1,
          180
        ],
        [
          2,
          90
        ],
        [
          3,
          55
        ],
        [
          4,
          40
        ]
      ]
    },
    {
      "name": "Seal",
      "points": [
        [
          0,
          100
        ],
        [
          1,
          96
        ],
        [
          2,
          90
        ],
        [
          3,
          70
        ],
        [
          4,
          0
        ]
      ]
    }
  ]
}
```


**Complete format-specific interaction block:** `corridors fish=III, seal=I; tolerance=10 survivors`

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 18 - Read the survivorship curves"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "“Place the fish survival cloud through [1000,180,90,55,40] survivors by age and the seal through [100,96,90,70,0]; submit Type III for fish and Type I for seal.”"
  payload: "`corridors fish=III, seal=I; tolerance=10 survivors`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```













**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Fish survivors by age are 1000, 180, 90, 55, 40; seal survivors are 100, 96, 90, 70, 0."
  choices:
    - {id: iii_i, label: "Fish show Type III survivorship; seals show Type I survivorship.", correct: true}
    - {id: i_iii, label: "Fish show Type I survivorship; seals show Type III survivorship.", correct: false}
    - {id: ii_ii, label: "Both species show Type II survivorship.", correct: false}
    - {id: i_i, label: "Both species show Type I survivorship.", correct: false}
  answer: iii_i
  rebuttals:
    i_iii: "This reverses the early-loss and late-loss patterns."
    ii_ii: "A constant loss rate would look roughly linear, unlike either displayed curve."
    i_i: "The fish population loses most individuals near the start, not near the end."
```

**Correct result:** fish Type III, seal Type I. Feedback distinguishes constant Type II

**Answer text:** The completed check shows fish Type III, seal Type I. Feedback distinguishes constant Type II.

**Why:** High early mortality makes nursery habitat decisive even when adults remain visible

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** nursery flag

## Stop 19 - Verify logistic recovery

**Format/placement:** VERIFY, at `flow-tank`.

**Metadata:** Concept: 11 - logistic recovery | experimental causality | 5.2 | COMBINE | L4 | reversal; Keystone: logistic recovery | experimental causality | 5.2 | COMBINE | L4 | reversal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: logistic recovery | experimental causality | 5.2 | COMBINE | L4 | reversal.

**Call - exact player copy:** Go to the flow tank, in Reef Station.

**Stop reason - exact player copy:** The survivorship comparison leaves the nursery's actual replacement rate to be tested.

**Question card story setup - exact player copy:** With nursery mortality identified, a constant exponential forecast is too optimistic near the habitat limit. Predict one-year growth under the displayed logistic rule, then compare it with the tank cohort.

**Question card story-science connection - exact player copy:** Density-limited annual growth determines whether the proposed catch removes fish faster than the current stock replaces them.

**Question card prompt - exact player copy:** “CALCULATE AND COMMIT: use ΔN=rN(1-N/K), r=0.50/yr, N=600 fish, K=1,000 fish; submit ΔN in fish/yr. OPERATE: run one year with food and temperature fixed. MEASURE: final N. INTERPRET: submit whether a 150-fish catch is sustainable. No restoration required.”

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{equation:"ΔN=rN(1-N/K)",inputs:{r:0.50,N:600,K:1000},units:{r:"per year",N:"fish",K:"fish"},submit:{quantity:"population change",unit:"fish/year",truth:120,tolerance:2}},equipment_locked_until_prediction_commit:true,operation:{action:"run one year",fixed:["food","temperature"]},measurements:{final_population:718,unit:"fish",tolerance:5},restore:{required:false,reason:"the annual simulation changes no physical setting"},correct_conclusion:"a 150-fish catch is not sustainable",answerText:"Logistic growth predicts 120 fish/year, so removing 150 exceeds replacement; the measured final population agrees within tolerance."}`

**Correct result:** `0.50(600)(0.40)=120 fish/yr`; 150 exceeds replacement. Feedback shows missing density term

**Answer text:** The completed check shows 0.50(600)(0.40)=120 fish/yr; 150 exceeds replacement. Feedback shows missing density term.

**Why:** Growth slows as population approaches K, so catch must leave replacement biomass

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** 150 option crossed out

## Stop 20 - Fund an enforceable ceiling

**Format/placement:** ALLOCATE, at `transect-bench`.

**Metadata:** Concept: 18 - commons governance | policy instruments | 5.1-5.3 | TRANSFER | L5 | decision; Keystone: commons governance | policy instruments | 5.1-5.3 | TRANSFER | L5 | decision; Area: Common Office; Learning role: PRACTICE; Difficulty: L3; Story role: commons governance | policy instruments | 5.1-5.3 | TRANSFER | L5 | decision.

**Call - exact player copy:** Go to the transect bench, in Reef Station.

**Stop reason - exact player copy:** The measured replacement rate needs an enforceable fishing plan rather than a numerical promise alone.

**Question card story setup - exact player copy:** The recovery test limits annual replacement to about 120 fish at the present stock. Allocate enforcement capacity so catch, effort, habitat, and data all support a ceiling below that replacement.

**Question card story-science connection - exact player copy:** The allocation determines whether catch limits, effort checks, habitat protection, and data collection support the same sustainable ceiling.

**Question card prompt - exact player copy:** “Allocate 100 points and submit a plan: catch tags 30 required; boat-hour log 20 required; nursery closure 25 protected; independent survey 15; advertising 20; larger dock 25. Fund all required/protected items without exceeding 100.”

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"landing_tags",label:"numbered landing tags",cost:30,required:true},{id:"landing_log",label:"time-and-mass landing log",cost:20,required:true},{id:"nursery_patrol",label:"nursery-zone patrol",cost:25,required:true},{id:"independent_survey",label:"independent stock survey",cost:15,required:true},{id:"publicity",label:"voluntary-compliance publicity",cost:20,required:false},{id:"boat_subsidy",label:"larger-boat subsidy",cost:30,required:false}],questions:[{id:"replacement",text:"Does the plan keep permitted catch below measured replacement?",required:true},{id:"compliance",text:"Can it detect untagged or nursery-zone catch?",required:true},{id:"independence",text:"Does it preserve an independent stock check?",required:true}],correct_allocation:{landing_tags:30,landing_log:20,nursery_patrol:25,independent_survey:15},reserve:10,answerText:"Fund tags, the landing log, nursery patrol, and an independent survey; do not spend the enforcement pool on publicity or boat expansion."}`

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 20 - Fund an enforceable ceiling"
  format: "ALLOCATE"
  source: "Handback 3 canonical interaction block"
  question: "“Allocate 100 points and submit a plan: catch tags 30 required; boat-hour log 20 required; nursery closure 25 protected; independent survey 15; advertising 20; larger dock 25. Fund all required/protected items without exceeding 100.”"
  payload: "`allocate:{pool:100,items:[{id:\"landing_tags\",label:\"numbered landing tags\",cost:30,required:true},{id:\"landing_log\",label:\"time-and-mass landing log\",cost:20,required:true},{id:\"nursery_patrol\",label:\"nursery-zone patrol\",cost:25,required:true},{id:\"independent_survey\",label:\"independent stock survey\",cost:15,required:true},{id:\"publicity\",label:\"voluntary-compliance publicity\",cost:20,required:false},{id:\"boat_subsidy\",label:\"larger-boat subsidy\",cost:30,required:false}],questions:[{id:\"replacement\",text:\"Does the plan keep permitted catch below measured replacement?\",required:true},{id:\"compliance\",text:\"Can it detect untagged or nursery-zone catch?\",required:true},{id:\"independence\",text:\"Does it preserve an independent stock check?\",required:true}],correct_allocation:{landing_tags:30,landing_log:20,nursery_patrol:25,independent_survey:15},reserve:10,answerText:\"Fund tags, the landing log, nursery patrol, and an independent survey; do not spend the enforcement pool on publicity or boat expansion.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - ALLOCATE:**

```yaml
allocate_patch:
  questions:
    - {id: replacement, requires: [landing_tags, landing_log], required: true}
    - {id: compliance, requires: [landing_tags, nursery_patrol], required: true}
    - {id: independence, requires: [independent_survey], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  decision_can_fail: true
  question: "“Allocate 100 points and submit a plan: catch tags 30 required; boat-hour log 20 required; nursery closure 25 protected; independent survey 15; advertising 20; larger dock 25. Fund all required/protected items without exceeding 100.”"
```

**Correct result:** 90-point four-part plan; catch ceiling 100 fish/year, below 120 replacement

**Answer text:** The completed check shows 90-point four-part plan; catch ceiling 100 fish/year, below 120 replacement.

**Why:** Shared resources avoid tragedy only when access and compliance are governed

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** pieces 5-6 post

## Mission outcome

Mission decision: Cap the catch below measured growth. Fund tags, patrols, and a new stock check. The rule protects the nursery. Now the waste ledger shows leaks into water and air.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Superb work. The record now supports this decision: Cap the catch below measured growth. The ferry decision is now grounded in what Vellan can actually sustain.

**Story event - exact player copy:** The harbour posts a catch limit below measured fish-population growth.

target 14:00; fishery ceiling adopted, Evidence +5; QA 90/70/40/40 after 11 RP Water. Review: exponential growth has no ceiling; logistic growth slows near K; life history shapes recovery; **takeaway:** sustainable yield must stay below replacement and be enforced.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Fishery Ceiling. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Fishery Ceiling, the paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Which environmental-science conclusion correctly applies Generalist?

**Options - exact player copy:**

- A. Species with a narrow niche. r-selected: many young, short lives, high early mortality.
- B. Species with a broad niche.
- C. Few young, long lives, stable populations.
- D. Largest population an environment can sustain.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Generalist; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Specialist, not Generalist. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. species with a broad niche.
- C: This describes K-selected, not Generalist. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Carrying capacity, not Generalist. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Fishery Ceiling: the paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Which environmental-science conclusion correctly applies Specialist?

**Options - exact player copy:**

- A. Species with a broad niche.
- B. Few young, long lives, stable populations.
- C. Species with a narrow niche. r-selected: many young, short lives, high early mortality.
- D. Largest population an environment can sustain.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Specialist; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Generalist, not Specialist. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes K-selected, not Specialist. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. species with a narrow niche. r-selected: many young, short lives, high early mortality.
- D: This describes Carrying capacity, not Specialist. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Fishery Ceiling using new evidence: the paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Which environmental-science conclusion correctly applies K-selected?

**Options - exact player copy:**

- A. Species with a broad niche.
- B. Species with a narrow niche. r-selected: many young, short lives, high early mortality.
- C. Largest population an environment can sustain.
- D. Few young, long lives, stable populations.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for K-selected; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Generalist, not K-selected. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Specialist, not K-selected. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Carrying capacity, not K-selected. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. few young, long lives, stable populations.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Fishery Ceiling: the paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Which environmental-science conclusion correctly applies Carrying capacity?

**Options - exact player copy:**

- A. Largest population an environment can sustain.
- B. Species with a broad niche.
- C. Species with a narrow niche. r-selected: many young, short lives, high early mortality.
- D. Few young, long lives, stable populations.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Carrying capacity; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. largest population an environment can sustain.
- B: This describes Generalist, not Carrying capacity. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Specialist, not Carrying capacity. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes K-selected, not Carrying capacity. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Fishery Ceiling decision, the team knows this: the paper column recovered on Day 1 includes boat-hours that the electronic sales record omitted. Which environmental-science conclusion correctly applies catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue?

**Options - exact player copy:**

- A. Species with a broad niche.
- B. Falling catch per effort signals depletion hidden by added work.
- C. Species with a narrow niche. r-selected: many young, short lives, high early mortality.
- D. Few young, long lives, stable populations.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Generalist, not catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. falling catch per effort signals depletion hidden by added work
- C: This describes Specialist, not catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes K-selected, not catch per unit effort | population limits | D1 trace | RETRIEVE | L2 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Fishery Ceiling to this follow-up: because catch efficiency fell 40%, landings no longer measure stock health. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence?

**Options - exact player copy:**

- A. Species with a broad niche.
- B. Species with a narrow niche. r-selected: many young, short lives, high early mortality.
- C. High early mortality makes nursery habitat decisive even when adults remain visible.
- D. Few young, long lives, stable populations.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Generalist, not survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Specialist, not survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. high early mortality makes nursery habitat decisive even when adults remain visible
- D: This describes K-selected, not survivorship/life history | population limits | 5.1 | INTRODUCE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 6 - The Enforcement Plan

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 10 DAYS.

**Card title:** THE ENFORCEMENT PLAN

**Go now:** Harbour Office, Tomas Reed at `fee-desk`.

**Card body:** The catch limit cannot work if boats bring fish ashore without reporting them. Compare inspections, fees, and rules for sharing the island's resources. Choose a plan people can follow and officials can enforce without unfairly placing all the costs on one group.

**Objective:** Turn ecological ceilings into fair rules.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 6: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m06_we01
    title: A shared-resource incentive
    problem: Several users draw water from one shared source. Each gains from taking extra water while the depletion cost is shared. Explain the problem.
    rule: Individual incentives can conflict with preserving a shared limited resource.
    steps:
    - One user receives the full immediate benefit of extra withdrawal.
    - The resulting shortage is spread among all users, encouraging collective overuse without effective rules.
    answer: This is a tragedy-of-the-commons mechanism.
    common_mistake: Shared ownership alone does not guarantee failure; effective institutions can change incentives.
  - id: carrying_m06_we02
    title: Set a simplified harvest ceiling
    problem: A stock adds an estimated 40 individuals per year before harvest, with other flows balanced. Compare harvests of 30 and 50.
    rule: Net annual change=biological addition-harvest.
    steps:
    - 'Set up the relationship: Net annual change=biological addition-harvest.'
    - with 30 harvested, change=40-30=+10; with 50, change=40-50=-10.
    answer: Only the 30-individual harvest avoids decline in this simplified estimate.
    common_mistake: A growth estimate has uncertainty and may change with stock size.
  - id: carrying_m06_we03
    title: Total resource footprint
    problem: A group has 100 people, each requiring 2 hectares of productive area under a specified estimate. Find total footprint.
    rule: Total footprint=population×per-person footprint.
    steps:
    - 'Set up the relationship: Total footprint=population×per-person footprint.'
    - footprint=100(2)=200 hectares.
    answer: Estimated footprint is 200 hectares.
    common_mistake: Per-person use and population both affect the total.
  - id: carrying_m06_we04
    title: Integrated pest management
    problem: A grower observes a pest count below the action threshold and beneficial predators present. What is a reasoned next step?
    rule: Integrated pest management combines monitoring, prevention, biological methods, and targeted treatment when justified.
    steps:
    - The count has not reached the preselected action threshold.
    - Continue monitoring and protect beneficial predators rather than automatically applying a broad pesticide.
    answer: Use the evidence and threshold to decide whether treatment is needed.
    common_mistake: Integrated management does not mean either spraying constantly or never treating.
  - id: carrying_m06_we05
    title: Protect a required reserve
    problem: A lab has 100 energy units. Essential tasks need 30 and 40 units, and reserve must be at least 20. How much remains for an optional task?
    rule: Optional capacity = total - essential use - protected reserve.
    steps:
    - essential use = 30+40 = 70 units.
    - optional capacity = 100-70-20 = 10 units.
    answer: At most 10 units may fund the optional task while preserving the reserve.
    common_mistake: Treating the reserve as freely available breaks the stated requirement.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Tragedy of the commons: overuse of a shared resource.

Sustainable yield: harvest that does not reduce future supply.

Ecological footprint: productive land and water needed to support consumption and waste.

Integrated pest management (IPM): pest control combining monitoring, prevention, and limited targeted treatment.

#### Primer concepts

- regulation and property rights can limit access; developed lifestyles often use 4-5 ha/person versus about 1.8 available globally; practices need mechanism-based justification.

#### Equations first needed today
**Equation:** `footprint demand=population×per-person footprint`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** footprint demand in hectares; population in people; per-person footprint in hectares per person.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

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

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 21 result to settle buy compliance evidence."

**Unlocks/waypoint:** Unlock Stop 22 at `council-table` in Chapel Council Room.

**Beat 3 - After Stop 22 | `common-map` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 22 result to settle match land-use practices."

**Unlocks/waypoint:** Unlock Stop 23 at `common-map` in Common Office.

**Beat 4 - After Stop 23 | `common-map` | automatic**

**World state:** Synthesis: Stop 23 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 23 result to settle fund the commons package."

**Unlocks/waypoint:** Unlock Stop 24 at `common-map` in Common Office.

**Beat 5 - At mission end | `council-table` | automatic**

**World state:** Decision and hook: Stop 24 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Harbour evidence tests landing controls, unlocking Common where land practices complete the policy. Ada wants a simple fee; Tomas wants workable checks; Iona protects farm yield. A posted rule changes from “pay to use” to “measure, cap, restore.”

## Characters and dramatic beat

Harbour evidence tests landing controls, unlocking Common where land practices complete the policy. Ada wants a simple fee; Tomas wants workable checks; Iona protects farm yield. A posted rule changes from “pay to use” to “measure, cap, restore.”

## Key concepts, explained here

regulation and property rights can limit access; developed lifestyles often use 4-5 ha/person versus about 1.8 available globally; practices need mechanism-based justification.

## Stop 21 - Audit the landing claim

**Format/placement:** ATTEST, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: 34 - compliance records | evidence | D5 | PRACTICE | L3 | obstacle; Keystone: compliance records | evidence | D5 | PRACTICE | L3 | obstacle; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: compliance records | evidence | D5 | PRACTICE | L3 | obstacle.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** The posted catch ceiling cannot protect the nursery if a landing's origin is unknown.

**Question card story setup - exact player copy:** The fish ceiling is posted, but four landing claims support the morning catch. Verify identity, time, mass, and nursery-zone origin before any catch receives a legal tag.

**Question card story-science connection - exact player copy:** The verified landing records determine whether this catch can receive a legal tag under the nursery restriction.

**Question card prompt - exact player copy:** verify at most 3 of 5 claims and reject any critical unbacked claim

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"license",label:"fishing license",signed:true,backed:true,critical:true},{id:"time",label:"landing time",signed:true,backed:true,critical:false},{id:"mass",label:"landed mass",signed:true,backed:true,critical:true},{id:"zone",label:"nursery-zone origin",signed:true,backed:false,critical:true},{id:"fee",label:"landing fee receipt",signed:true,backed:true,critical:false}],correct_verified:["license","mass","zone"],critical_unbacked:"zone",answerText:"Use the three checks on license, mass, and the unbacked nursery-zone claim; reject the landing if zone origin cannot be verified."}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Audit the landing claim", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** nursery-zone origin is unbacked; hold catch

**Answer text:** The completed check shows nursery-zone origin is unbacked; hold catch.

**Why:** a receipt proves payment, not ecological compliance

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** inspection station enabled

## Stop 22 - Buy compliance evidence

**Format/placement:** VALUE, at `council-table`.

**Metadata:** Concept: 34 - monitoring design | policy | 6.1 | COMBINE | L5 | decision; Keystone: monitoring design | policy | 6.1 | COMBINE | L5 | decision; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: monitoring design | policy | 6.1 | COMBINE | L5 | decision.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The held landing reveals an origin-checking gap that the monitoring budget must close.

**Question card story setup - exact player copy:** Because the catch cannot prove where it was taken, the council has forty monitoring credits. Buy records that can reveal both total extraction and nursery violations.

**Question card story-science connection - exact player copy:** The purchased evidence must reveal both total extraction and nursery violations within the available credits.

**Question card prompt - exact player copy:** choose within 40: electronic tags 20 required, random dock checks 15 required, poster 8, fisher survey 12, larger sign 10

**Complete format-specific interaction block:** `value:{budget:40,options:[{id:"landing_tags",axis:"total extraction",cost:20,required:true},{id:"dock_checks",axis:"identity and mass verification",cost:15,required:true},{id:"nursery_camera",axis:"nursery-zone location",cost:20,required:false},{id:"public_ad",axis:"awareness",cost:10,required:false},{id:"seller_survey",axis:"self-reported behavior",cost:15,required:false}],total_available_cost:80,correct_purchase:["landing_tags","dock_checks"],answerText:"Buy tags and dock checks for 35 credits; they can change enforcement by testing total catch and compliance."}`

**Correct result:** tags+checks=35

**Answer text:** The completed check shows tags+checks=35.

**Why:** evidence has value only if it can change enforcement

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** waypoint Common

## Stop 23 - Match land-use practices

**Format/placement:** PROTOCOL, at `common-map`.

**Metadata:** Concept: 20 - land-use practices | soil/land use | D3 | RETRIEVE | L3 | evidence; Keystone: land-use practices | soil/land use | D3 | RETRIEVE | L3 | evidence; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: land-use practices | soil/land use | D3 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** Harbour enforcement is addressed, but the common's land practices can still undermine water and soil limits.

**Question card story setup - exact player copy:** The harbour plan now measures use and checks violations. At the common, match each land problem to a practice that reduces its mechanism rather than moving it elsewhere.

**Question card story-science connection - exact player copy:** Matching each practice to its mechanism determines whether the land plan reduces erosion, runoff, irrigation loss, or pest damage.

**Question card prompt - exact player copy:** Submit the complete mapping: erosion, runoff, irrigation loss, pests, and a forestry claim must each receive one practice.

**Complete format-specific interaction block:** `protocol:{scenarios:[erosion,runoff,irrigation_loss,pests,forestry_claim],choices:[selective_harvest_and_reforest,permeable_pavement_and_rain_garden,drip_irrigation,IPM,FSC_certification],mapping:{erosion:selective_harvest_and_reforest,runoff:permeable_pavement_and_rain_garden,irrigation_loss:drip_irrigation,pests:IPM,forestry_claim:FSC_certification}}`

**Correct result:** Erosion maps to selective harvest and reforestation; runoff to permeable pavement and rain gardens; irrigation loss to drip irrigation; pests to IPM; and the forestry claim to FSC certification.

**Answer text:** Match each problem to the practice that interrupts its physical or ecological mechanism.

**Why:** Roots and selective cover limit erosion, infiltration features reduce runoff, drip delivery limits evaporation, IPM targets pests while limiting resistance, and FSC provides a forestry standard.

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** five rule cards

## Stop 24 - Fund the commons package

**Format/placement:** SCIENCETANK, at `common-map`.

**Metadata:** Concept: 20 - agriculture trade-offs | policy | 6.3 | TRANSFER | L5 | decision; Keystone: agriculture trade-offs | policy | 6.3 | TRANSFER | L5 | decision; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: agriculture trade-offs | policy | 6.3 | TRANSFER | L5 | decision.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** The matched land practices need a funded package before the common can implement them.

**Question card story setup - exact player copy:** With practices matched to mechanisms, the common needs a 100-point package. Balance crop yield, soil health, runoff, and enforcement while rejecting a single-method cure.

**Question card story-science connection - exact player copy:** The allocation determines whether soil, irrigation, pest, buffer, and crop-monitoring needs are covered together.

**Question card prompt - exact player copy:** Allocate exactly 100 points among soil testing 20, drip irrigation 25, integrated pest management (IPM) 25, buffer strips 20, blanket pesticide 30, and genetically modified organism (GMO) monitoring 10. Submit one workable allocation.

**Complete format-specific interaction block:** `sciencetank:{pool:100,proposals:[{id:soil_testing,cost:20},{id:drip_irrigation,cost:25},{id:IPM,cost:25},{id:buffer_strips,cost:20},{id:blanket_pesticide,cost:30},{id:GMO_monitoring,cost:10}],recommended:{soil_testing:20,drip_irrigation:25,IPM:25,buffer_strips:20,GMO_monitoring:10},evidence:[crop_yield,soil_health,nitrate_runoff,pesticide_resistance],truth_total:100}`

**Correct result:** Fund soil testing 20, drip irrigation 25, IPM 25, buffer strips 20, and GMO monitoring 10, totaling 100 points.

**Answer text:** The integrated five-part package protects yield, soil, water, and resistance monitoring without funding blanket pesticide use.

**Why:** Green Revolution tools raise yield but can increase pollution, resistance, and monoculture

**Wrong-path feedback:** Feedback identifies the first violated mechanism, unit, limit, or unsupported inference and allows a retry.

**State/output:** Post delivery piece 6 and the enforceable land-practice package; unlock the mission outcome.

## Mission outcome

Mission decision: Use measured caps, random checks, restoration, and targeted fees. Payment alone does not prove compliance. The rule can be enforced. But water and methane still leave by unpriced paths.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was exactly the insight the team needed. You resolved the central question: Use measured caps, random checks, restoration, and targeted fees. Vellan Island has a stronger plan for its people and ecosystems.

**Story event - exact player copy:** Random inspections and targeted fees put the shared-resource limits into force.

target 13:00; hearing opened, Trust +5; QA 90/81/40/45 after 11 Water. Takeaway: a commons limit needs measurement, monitoring, and a consequence.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Enforcement Plan. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Enforcement Plan, with practices matched to mechanisms, the common needs a 100-point package. Spend the evidence budget now on tests that can distinguish the explanations still in play. Which environmental-science conclusion correctly applies Tragedy of the commons?

**Options - exact player copy:**

- A. Harvest that does not reduce future supply.
- B. Overuse of a shared resource.
- C. Productive land and water needed to support consumption and waste.
- D. Pest control combining monitoring, prevention, and limited targeted treatment.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Tragedy of the commons; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sustainable yield, not Tragedy of the commons. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. overuse of a shared resource.
- C: This describes Ecological footprint, not Tragedy of the commons. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Integrated pest management (IPM), not Tragedy of the commons. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Enforcement Plan: the fish ceiling is posted, but four landing claims support the morning catch. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies Sustainable yield?

**Options - exact player copy:**

- A. Overuse of a shared resource.
- B. Productive land and water needed to support consumption and waste.
- C. Harvest that does not reduce future supply.
- D. Pest control combining monitoring, prevention, and limited targeted treatment.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Sustainable yield; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Tragedy of the commons, not Sustainable yield. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Ecological footprint, not Sustainable yield. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. harvest that does not reduce future supply.
- D: This describes Integrated pest management (IPM), not Sustainable yield. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Enforcement Plan using new evidence: the fish ceiling is posted, but four landing claims support the morning catch. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies Ecological footprint?

**Options - exact player copy:**

- A. Overuse of a shared resource.
- B. Harvest that does not reduce future supply.
- C. Pest control combining monitoring, prevention, and limited targeted treatment.
- D. Productive land and water needed to support consumption and waste.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Ecological footprint; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Tragedy of the commons, not Ecological footprint. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Sustainable yield, not Ecological footprint. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Integrated pest management (IPM), not Ecological footprint. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. productive land and water needed to support consumption and waste.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Enforcement Plan: the fish ceiling is posted, but four landing claims support the morning catch. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies Integrated pest management (IPM)?

**Options - exact player copy:**

- A. Pest control combining monitoring, prevention, and limited targeted treatment.
- B. Overuse of a shared resource.
- C. Harvest that does not reduce future supply.
- D. Productive land and water needed to support consumption and waste.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Integrated pest management (IPM); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. pest control combining monitoring, prevention, and limited targeted treatment.
- B: This describes Tragedy of the commons, not Integrated pest management (IPM). It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Sustainable yield, not Integrated pest management (IPM). It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Ecological footprint, not Integrated pest management (IPM). It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Enforcement Plan decision, the team knows this: the fish ceiling is posted, but four landing claims support the morning catch. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies compliance records | evidence | D5 | PRACTICE | L3 | obstacle?

**Options - exact player copy:**

- A. Overuse of a shared resource.
- B. A receipt proves payment, not ecological compliance.
- C. Harvest that does not reduce future supply.
- D. Productive land and water needed to support consumption and waste.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for compliance records | evidence | D5 | PRACTICE | L3 | obstacle; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Tragedy of the commons, not compliance records | evidence | D5 | PRACTICE | L3 | obstacle. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. a receipt proves payment, not ecological compliance
- C: This describes Sustainable yield, not compliance records | evidence | D5 | PRACTICE | L3 | obstacle. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Ecological footprint, not compliance records | evidence | D5 | PRACTICE | L3 | obstacle. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Enforcement Plan to this follow-up: because the catch cannot prove where it was taken, the council has forty monitoring credits. Choose the next measurement now based on whether its result could change the decision. Which environmental-science conclusion correctly applies monitoring design | policy | 6.1 | COMBINE | L5 | decision?

**Options - exact player copy:**

- A. Overuse of a shared resource.
- B. Harvest that does not reduce future supply.
- C. Evidence has value only if it can change enforcement.
- D. Productive land and water needed to support consumption and waste.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for monitoring design | policy | 6.1 | COMBINE | L5 | decision; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Tragedy of the commons, not monitoring design | policy | 6.1 | COMBINE | L5 | decision. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Sustainable yield, not monitoring design | policy | 6.1 | COMBINE | L5 | decision. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. evidence has value only if it can change enforcement
- D: This describes Ecological footprint, not monitoring design | policy | 6.1 | COMBINE | L5 | decision. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 7 - The Hidden Losses

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 9 DAYS.

**Card title:** THE HIDDEN LOSSES

**Go now:** Tip and Sorting Yard, Mei Chen at `leachate-bench`.

**Card body:** Broken pipes lose treated water before it reaches homes, while the landfill releases polluted drainage and methane gas. Follow those hidden losses and compare their effects. Decide which repair should come first to protect the island's water and reduce waste.

**Objective:** Find and rank hidden water and waste losses.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 7: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m07_we01
    title: Point versus nonpoint pollution
    problem: Compare waste leaving a single discharge pipe with fertilizer washed from many fields after rain.
    rule: A point source is an identifiable discrete discharge; nonpoint pollution is diffuse.
    steps:
    - The single pipe has a defined outlet that can be sampled and controlled.
    - Field runoff arrives through many pathways over a broad area.
    answer: The pipe is a point source; widespread field runoff is nonpoint.
    common_mistake: The distinction describes the release pathway, not whether the pollutant is dangerous.
  - id: carrying_m07_we02
    title: Express a loss fraction
    problem: A tank receives 200 L and delivers 180 L, with no stock change. Find the unaccounted loss percentage.
    rule: Loss=input-output; loss fraction=loss/input.
    steps:
    - 'Set up the relationship: Loss=input-output; loss fraction=loss/input.'
    - loss=200-180=20 L; fraction=20/200=0.10=10%.
    answer: Ten percent of the input is unaccounted for under the stated balance.
    common_mistake: Use the input as the reference for input-loss percentage.
  - id: carrying_m07_we03
    title: Balance a resource stock
    problem: A generic pond starts with 100 m³ of water, receives 30 m³, and loses 20 m³ during one day. Find the ending stock.
    rule: Ending stock=starting stock+inputs-outputs.
    steps:
    - 'Set up the relationship: Ending stock=starting stock+inputs-outputs.'
    - V_end=100+30-20=110 m³.
    answer: The pond ends with 110 m³, a net increase of 10 m³.
    common_mistake: Do not confuse the ending stock with the net change.
  - id: carrying_m07_we04
    title: Concentration and pollutant load
    problem: A stream flows at 10 L/s with pollutant concentration 2 mg/L. Find pollutant load.
    rule: Mass load=volume flow×concentration.
    steps:
    - 'Set up the relationship: Mass load=volume flow×concentration.'
    - load=10 L/s×2 mg/L=20 mg/s.
    answer: The stream carries 20 mg of pollutant each second.
    common_mistake: Concentration alone does not state total pollutant transport.
  - id: carrying_m07_we05
    title: Treatment removal efficiency
    problem: Water enters treatment at 10 mg/L and leaves at 2 mg/L with unchanged flow. Find concentration removal efficiency.
    rule: Removal fraction=(incoming-outgoing)/incoming.
    steps:
    - 'Set up the relationship: Removal fraction=(incoming-outgoing)/incoming.'
    - removal=(10-2)/10=0.8=80%.
    answer: Concentration is reduced by 80%.
    common_mistake: A percentage reduction does not establish compliance with an unstated limit.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Leachate: polluted liquid draining through waste.

Point source: one identifiable outlet.

Nonpoint source: diffuse runoff.

Sewage treatment: primary settling, secondary bacterial breakdown, tertiary nutrient removal.

#### Primer concepts

- landfills generate methane and carbon dioxide; leachate can reach groundwater; prevention often costs less than treating exposure.

#### Equations first needed today
**Equation:** `water loss=input volume-metered output volume`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `water loss` water entering the network but not recorded at its metered outlets; `input volume` water measured entering the network; `metered output volume` water measured leaving through the monitored outlets. Use the same volume unit and time period for all three.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Tip trace unlocks Waterworks test. Mei initially watches visible waste; Nkemdi sees missing flow. Leachate pipe and distribution main illuminate as separate pathways.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Tip and Sorting Yard | `leachate-bench` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 7: TRACE THE HIDDEN EXPORTS OPEN

**Dialogue bubbles -** Mara Voss: "Start with trace the hidden exports. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `leachate-bench` in Tip and Sorting Yard.

**Beat 2 - After Stop 25 | `leachate-bench` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 25 result to settle build the treatment chain."

**Unlocks/waypoint:** Unlock Stop 26 at `leachate-bench` in Tip and Sorting Yard.

**Beat 3 - After Stop 26 | `pipe-balance` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 26 result to settle close the water balance."

**Unlocks/waypoint:** Unlock Stop 27 at `pipe-balance` in Waterworks.

**Beat 4 - After Stop 27 | `council-table` | automatic**

**World state:** Synthesis: Stop 27 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 27 result to settle choose the repair priority."

**Unlocks/waypoint:** Unlock Stop 28 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `leachate-bench` | automatic**

**World state:** Decision and hook: Stop 28 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Tip trace unlocks Waterworks test. Mei initially watches visible waste; Nkemdi sees missing flow. Leachate pipe and distribution main illuminate as separate pathways.

## Characters and dramatic beat

Tip trace unlocks Waterworks test. Mei initially watches visible waste; Nkemdi sees missing flow. Leachate pipe and distribution main illuminate as separate pathways.

## Key concepts, explained here

landfills generate methane and carbon dioxide; leachate can reach groundwater; prevention often costs less than treating exposure.

## Stop 25 - Trace the hidden exports

**Format/placement:** TRACE, at `leachate-bench`.

**Metadata:** Concept: 27 - landfill pathways | pollution | D1 | RETRIEVE | L3 | clue; Keystone: landfill pathways | pollution | D1 | RETRIEVE | L3 | clue; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: landfill pathways | pollution | D1 | RETRIEVE | L3 | clue.

**Call - exact player copy:** Go to the leachate bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The tip's delivery totals cannot establish what leaves the uncapped waste cell after disposal.

**Question card story setup - exact player copy:** The waste ledger counts material delivered to the uncapped cell, but rain, leachate, methane, carbon dioxide, and collected solids follow different paths. Trace their shared sources and identify which pathway can carry dissolved pollution toward groundwater.

**Question card story-science connection - exact player copy:** The waste pathways identify which exports affect air and which can carry dissolved contamination toward groundwater.

**Question card prompt - exact player copy:** Open five channels; identify the waste cell as the shared source and rain as independent; submit the groundwater-dependent leachate pathway

**Complete format-specific interaction block:** `trace:{channels:[{id:"rain",label:"rain entering the cell",dependency:"weather gauge",independent:true},{id:"leachate",label:"leachate outflow",dependency:"waste cell",target_dependent:true},{id:"methane",label:"methane outflow",dependency:"waste cell",target_dependent:true},{id:"carbon_dioxide",label:"carbon-dioxide outflow",dependency:"waste cell",target_dependent:true},{id:"collected_solids",label:"collected solids",dependency:"waste cell",target_dependent:true}],shared_upstream:"waste cell",correct_conclusion:"leachate is the groundwater path; rain is the independent input",answerText:"Four export channels share the waste cell, while rain is independent; leachate is the path carrying dissolved load toward groundwater."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 25 - Trace the hidden exports"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open five channels; identify the waste cell as the shared source and rain as independent; submit the groundwater-dependent leachate pathway"
  payload: "`trace:{channels:[{id:\"rain\",label:\"rain entering the cell\",dependency:\"weather gauge\",independent:true},{id:\"leachate\",label:\"leachate outflow\",dependency:\"waste cell\",target_dependent:true},{id:\"methane\",label:\"methane outflow\",dependency:\"waste cell\",target_dependent:true},{id:\"carbon_dioxide\",label:\"carbon-dioxide outflow\",dependency:\"waste cell\",target_dependent:true},{id:\"collected_solids\",label:\"collected solids\",dependency:\"waste cell\",target_dependent:true}],shared_upstream:\"waste cell\",correct_conclusion:\"leachate is the groundwater path; rain is the independent input\",answerText:\"Four export channels share the waste cell, while rain is independent; leachate is the path carrying dissolved load toward groundwater.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: rain, label: "Rain entering cell", reading: "42 mm this week", dependency: weather_gauge, independent: true}
    - {id: leachate, label: "Leachate outflow", reading: "18 m³ carrying dissolved load", dependency: waste_cell}
    - {id: methane, label: "Methane outflow", reading: "31 m³ gas", dependency: waste_cell}
    - {id: carbon_dioxide, label: "Carbon-dioxide outflow", reading: "24 m³ gas", dependency: waste_cell}
    - {id: collected_solids, label: "Collected solids", reading: "6.2 t retained", dependency: waste_cell}
  sharedUpstream: waste_cell
  correctConclusion: "The uncapped cell affects both air and water"
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** The uncapped cell affects both air and water

**Answer text:** The completed check shows the uncapped cell affects both air and water.

**Why:** Trace the hidden exports connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 26 - Build the treatment chain

**Format/placement:** CHAIN, at `leachate-bench`.

**Metadata:** Concept: 27 - sewage treatment | pollution | 7; Keystone: sewage treatment | pollution | 7; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: sewage treatment | pollution | 7.

**Call - exact player copy:** Go to the leachate bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The identified leachate pathway requires a treatment sequence before discharge is permitted.

**Question card story setup - exact player copy:** Because leachate can enter groundwater, the treatment proposal must remove hazards in the right order. Build the wastewater path from solids removal through nutrient polishing before discharge.

**Question card story-science connection - exact player copy:** The treatment order determines whether solids and nutrients are removed rather than merely diluted downstream.

**Question card prompt - exact player copy:** Arrange the displayed wastewater-treatment cards from raw inflow to safe discharge. Exclude the card that only dilutes untreated water without removing contaminant load.

**Complete format-specific interaction block:** `chain:{transfers:[{id:"intake",label:"collect raw wastewater",quantity:"wastewater flow and suspended solids"},{id:"primary",label:"settle and skim",quantity:"settleable solids and floating material"},{id:"secondary",label:"biological treatment",quantity:"dissolved organic load"},{id:"tertiary",label:"nutrient removal",quantity:"nitrogen and phosphorus load"},{id:"disinfection",label:"disinfect before discharge",quantity:"viable pathogen load"},{id:"dilution_decoy",label:"dilute untreated water",quantity:"water volume only",decoy:true}],keyed_order:["intake","primary","secondary","tertiary","disinfection"],decoys:["dilution_decoy"],governing_relationship:"contaminant load=flow×concentration",answerText:"Remove solids, organics, nutrients, and pathogens in order; dilution alone does not remove contaminant load."}`

**§7 authored-board source - CHAIN:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 26 - Build the treatment chain"
  format: "CHAIN"
  source: "Handback 3 canonical interaction block"
  question: "Arrange the displayed wastewater-treatment cards from raw inflow to safe discharge. Exclude the card that only dilutes untreated water without removing contaminant load."
  payload: "`chain:{transfers:[{id:\"intake\",label:\"collect raw wastewater\",quantity:\"wastewater flow and suspended solids\"},{id:\"primary\",label:\"settle and skim\",quantity:\"settleable solids and floating material\"},{id:\"secondary\",label:\"biological treatment\",quantity:\"dissolved organic load\"},{id:\"tertiary\",label:\"nutrient removal\",quantity:\"nitrogen and phosphorus load\"},{id:\"disinfection\",label:\"disinfect before discharge\",quantity:\"viable pathogen load\"},{id:\"dilution_decoy\",label:\"dilute untreated water\",quantity:\"water volume only\",decoy:true}],keyed_order:[\"intake\",\"primary\",\"secondary\",\"tertiary\",\"disinfection\"],decoys:[\"dilution_decoy\"],governing_relationship:\"contaminant load=flow×concentration\",answerText:\"Remove solids, organics, nutrients, and pathogens in order; dilution alone does not remove contaminant load.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - CHAIN:**

```yaml
chain:
  links:
    - {id: intake, label: "Collect raw wastewater", transfers: "wastewater flow and suspended solids"}
    - {id: primary, label: "Settle and skim", transfers: "settleable solids and floating material"}
    - {id: secondary, label: "Biological treatment", transfers: "dissolved organic load"}
    - {id: tertiary, label: "Nutrient removal", transfers: "nitrogen and phosphorus load"}
    - {id: disinfection, label: "Disinfect discharge", transfers: "viable pathogen load"}
    - {id: dilution_decoy, label: "Dilute untreated water", transfers: "water volume only", decoy: true}
  order: [intake, primary, secondary, tertiary, disinfection]
  governingLink: tertiary
  distractor: dilution_decoy
  correctConclusion: "The five treatment stages are placed in causal order and dilution is rejected"
```

**Correct result:** The five treatment stages are placed in causal order and dilution is rejected

**Answer text:** The completed check shows the five treatment stages are placed in causal order and dilution is rejected.

**Why:** Build the treatment chain connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 27 - Close the water balance

**Format/placement:** BALANCE, at `pipe-balance`.

**Metadata:** Concept: 1 - pipe loss | closed budgets | D2 | RETRIEVE | L2 | reveal; Keystone: pipe loss | closed budgets | D2 | RETRIEVE | L2 | reveal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: pipe loss | closed budgets | D2 | RETRIEVE | L2 | reveal.

**Call - exact player copy:** Go to the pipe balance bench, in Waterworks.

**Stop reason - exact player copy:** The contamination pathway is understood, but the waterworks still cannot account for its delivered volume.

**Question card story setup - exact player copy:** The tip pathway is real, but Waterworks reports a larger daily loss. Close the distribution ledger to calculate water that never reaches a billed tap.

**Question card story-science connection - exact player copy:** The unmetered water loss quantifies how much supply disappears before reaching billed taps.

**Question card prompt - exact player copy:** Use unmetered loss=plant output-households-businesses-ferry-tank increase with 410, 285, 55, 12, and 8 m3/day; submit one loss in m3/day

**Complete format-specific interaction block:** `balance:{streams:[{id:"plant_output",direction:"in",value:410,unit:"m3/day",counts:true},{id:"households",direction:"out",value:285,unit:"m3/day",counts:true},{id:"businesses",direction:"out",value:55,unit:"m3/day",counts:true},{id:"ferry",direction:"out",value:12,unit:"m3/day",counts:true},{id:"tank_increase",direction:"storage",value:8,unit:"m3/day",counts:true},{id:"duplicate_billing_display",direction:"none",value:55,unit:"m3/day",counts:false,reason:"duplicate of the business meter"}],equation:"loss=plant-households-businesses-ferry-tank increase",correct:50,tolerance:1,answerText:"Unbilled loss is 50 m3/day; the duplicate billing display is not a second physical stream."}`

**Correct result:** The unmetered loss is 50 m3/day

**Answer text:** The completed check shows the unmetered loss is 50 m3/day.

**Why:** Close the water balance connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 28 - Choose the repair priority

**Format/placement:** VALUE, at `council-table`.

**Metadata:** Concept: 9 - repair priority | policy | 7; Keystone: repair priority | policy | 7; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: repair priority | policy | 7.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The missing distribution water and the leachate pathway now compete for the same repair budget.

**Question card story setup - exact player copy:** The pipe loses 50 cubic metres each day, while leachate threatens the same aquifer over a longer path. Spend sixty repair credits without abandoning contamination control.

**Question card story-science connection - exact player copy:** The selected repairs determine whether immediate quantity loss is addressed without abandoning aquifer contamination control.

**Question card prompt - exact player copy:** From acoustic leak location 15, main repair 30, leachate liner test 15, cosmetic fence 12, and gas flare study 10, submit a plan costing at most 60 credits

**Complete format-specific interaction block:** `value:{budget:60,options:[{id:acoustic_location,cost:15,required:true},{id:main_repair,cost:30,required:true},{id:liner_test,cost:15,required:true},{id:cosmetic_fence,cost:12},{id:gas_flare_study,cost:10}],correct:[acoustic_location,main_repair,liner_test],total:60}`

**§7 authored-board source - VALUE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 28 - Choose the repair priority"
  format: "VALUE"
  source: "Handback 3 canonical interaction block"
  question: "From acoustic leak location 15, main repair 30, leachate liner test 15, cosmetic fence 12, and gas flare study 10, submit a plan costing at most 60 credits"
  payload: "`value:{budget:60,options:[{id:acoustic_location,cost:15,required:true},{id:main_repair,cost:30,required:true},{id:liner_test,cost:15,required:true},{id:cosmetic_fence,cost:12},{id:gas_flare_study,cost:10}],correct:[acoustic_location,main_repair,liner_test],total:60}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 4 canonical interaction block - VALUE:**

```yaml
value:
  budget: 60
  costUnit: "credits"
  options:
    - {id: acoustic_location, label: "Acoustic leak location", axis: "leak evidence", cost: 15}
    - {id: main_repair, label: "Main repair", axis: "water loss", cost: 30}
    - {id: liner_test, label: "Leachate liner test", axis: "groundwater protection", cost: 15}
    - {id: cosmetic_fence, label: "Cosmetic fence", axis: "appearance", cost: 12}
    - {id: gas_flare_study, label: "Gas flare study", axis: "air emissions", cost: 10}
  keyedChoice: [acoustic_location, main_repair, liner_test]
```

**Correct result:** Locate and repair the main and test the leachate liner for exactly 60 credits

**Answer text:** The completed check shows locate and repair the main and test the leachate liner for exactly 60 credits.

**Why:** Choose the repair priority connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Repair the liner and treatment chain. Count the 50 cubic metres lost each day. The leak is real. Next, trace where school nitrate enters the system.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You saw through the trap. Your analysis established the point that matters: Repair the liner and treatment chain. The council can act without sacrificing the island's future.

**Story event - exact player copy:** Crews repair the landfill liner and the leaking water-treatment chain.

target 13:00; hidden loss stopped, Reserve +5; QA 90/90/47/45 after Water9 Reserve2. Takeaway: trace sources and close ledgers before buying new supply.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Hidden Losses. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Anaerobic:** without oxygen.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Hidden Losses, the enforcement ledger counts waste delivered to the tip, but mass still leaves the cell. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which environmental-science conclusion correctly applies Anaerobic?

**Options - exact player copy:**

- A. Polluted liquid draining through waste.
- B. Without oxygen.
- C. One identifiable outlet.
- D. Diffuse runoff.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Anaerobic; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Leachate, not Anaerobic. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. without oxygen.
- C: This describes Point source, not Anaerobic. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Nonpoint source, not Anaerobic. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Hidden Losses: because leachate can enter groundwater, the treatment proposal must remove hazards in the right order. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which environmental-science conclusion correctly applies Leachate?

**Options - exact player copy:**

- A. Without oxygen.
- B. One identifiable outlet.
- C. Polluted liquid draining through waste.
- D. Diffuse runoff.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Leachate; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Anaerobic, not Leachate. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Point source, not Leachate. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. polluted liquid draining through waste.
- D: This describes Nonpoint source, not Leachate. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Hidden Losses using new evidence: the enforcement ledger counts waste delivered to the tip, but mass still leaves the cell. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which environmental-science conclusion correctly applies Point source?

**Options - exact player copy:**

- A. Without oxygen.
- B. Polluted liquid draining through waste.
- C. Diffuse runoff.
- D. One identifiable outlet.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Point source; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Anaerobic, not Point source. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Leachate, not Point source. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Nonpoint source, not Point source. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. one identifiable outlet.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Hidden Losses: the enforcement ledger counts waste delivered to the tip, but mass still leaves the cell. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which environmental-science conclusion correctly applies Nonpoint source?

**Options - exact player copy:**

- A. Diffuse runoff.
- B. Without oxygen.
- C. Polluted liquid draining through waste.
- D. One identifiable outlet.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Nonpoint source; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. diffuse runoff.
- B: This describes Anaerobic, not Nonpoint source. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Leachate, not Nonpoint source. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Point source, not Nonpoint source. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Hidden Losses decision, the team knows this: because leachate can enter groundwater, the treatment proposal must remove hazards in the right order. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which environmental-science conclusion correctly applies Sewage treatment?

**Options - exact player copy:**

- A. Without oxygen.
- B. Primary settling, secondary bacterial breakdown, tertiary nutrient removal.
- C. Polluted liquid draining through waste.
- D. One identifiable outlet.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Sewage treatment; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Anaerobic, not Sewage treatment. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. primary settling, secondary bacterial breakdown, tertiary nutrient removal.
- C: This describes Leachate, not Sewage treatment. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Point source, not Sewage treatment. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Hidden Losses to this follow-up: the enforcement ledger counts waste delivered to the tip, but mass still leaves the cell. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which environmental-science conclusion correctly applies landfill pathways | pollution | D1 | RETRIEVE | L3 | clue?

**Options - exact player copy:**

- A. Without oxygen.
- B. Polluted liquid draining through waste.
- C. Trace the hidden exports connects the measured environmental mechanism to the next island condition.
- D. One identifiable outlet.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for landfill pathways | pollution | D1 | RETRIEVE | L3 | clue; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Anaerobic, not landfill pathways | pollution | D1 | RETRIEVE | L3 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Leachate, not landfill pathways | pollution | D1 | RETRIEVE | L3 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. trace the hidden exports connects the measured environmental mechanism to the next island condition.
- D: This describes Point source, not landfill pathways | pollution | D1 | RETRIEVE | L3 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 8 - The School-Water Finding

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 8 DAYS.

**Card title:** THE SCHOOL-WATER FINDING

**Go now:** Waterworks, Nkemdi at `store-gauges`.

**Card body:** The main pipe repair restored water supply, but the school tap still has more nitrate pollution than the main water pipe. Compare samples and estimate what children would swallow. Find the source and choose immediate protection while the remaining fault is investigated.

**Objective:** Identify the school exposure pathway.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 8: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m08_we01
    title: Body-mass-normalized dose
    problem: Water contains 2 mg/L of a substance. A 20 kg child drinks 1 L. Find intake per kilogram.
    rule: Dose=concentration×intake volume/body mass.
    steps:
    - 'Set up the relationship: Dose=concentration×intake volume/body mass.'
    - dose=(2 mg/L)(1 L)/(20 kg)=0.1 mg/kg.
    answer: The intake is 0.1 mg per kg for this drinking event.
    common_mistake: Dose is not the same quantity as water concentration.
  - id: carrying_m08_we02
    title: Same water, different dose
    problem: Two people each ingest 2 mg of a substance. Their body masses are 20 and 80 kg. Compare dose per kilogram.
    rule: Dose=ingested mass/body mass.
    steps:
    - 'Set up the relationship: Dose=ingested mass/body mass.'
    - first dose=2/20=0.10 mg/kg; second=2/80=0.025 mg/kg.
    answer: The smaller person receives four times the body-mass-normalized dose.
    common_mistake: Equal ingested amounts do not imply equal doses per kilogram.
  - id: carrying_m08_we03
    title: Total versus available contaminant
    problem: Two soils have equal total metal content, but in one soil the metal is tightly bound in an insoluble mineral. Can exposure differ?
    rule: Bioavailability describes the fraction that organisms can absorb under the relevant conditions.
    steps:
    - Equal total mass does not imply equal dissolved or absorbable mass.
    - The tightly bound form may be less available, depending on chemistry and organisms.
    answer: Actual exposure can differ despite equal total content.
    common_mistake: A total-concentration measurement alone may not settle biological uptake.
  - id: carrying_m08_we04
    title: Read an inclusive threshold
    problem: A fictional laboratory rule permits a sample concentration at or below 5 mg/L. A sample measures exactly 5 mg/L. Classify it under that rule.
    rule: At or below means concentration ≤ limit.
    steps:
    - comparison = 5 ≤ 5, which is true. Equality is included.
    - classification = passes this concentration rule. No claim about other requirements follows.
    answer: This measurement passes the stated inclusive threshold.
    common_mistake: Replacing ≤ with < would wrongly exclude equality.
  - id: carrying_m08_we05
    title: Concentration and pollutant load
    problem: A stream flows at 10 L/s with pollutant concentration 2 mg/L. Find pollutant load.
    rule: Mass load=volume flow×concentration.
    steps:
    - 'Set up the relationship: Mass load=volume flow×concentration.'
    - load=10 L/s×2 mg/L=20 mg/s.
    answer: The stream carries 20 mg of pollutant each second.
    common_mistake: Concentration alone does not state total pollutant transport.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Dose: amount of a substance received per body mass.

Threshold response: effect begins above a dose.

Bioavailability: fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.

#### Primer concepts

- dose-response often forms an S-curve; children can receive larger mass-normalized dose; source location follows spatial patterns.

#### Equations first needed today
**Equation:** `dose=(concentration×intake volume)/body mass`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** dose is pollutant mass per unit body mass; concentration is pollutant mass per unit volume; intake volume is consumed volume; body mass is the exposed person's mass.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Evidence at the first location unlocks the next causally necessary location; the fourth stop commits the mission decision.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `store-gauges` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 8: PROBE THE NITRATE NETWORK OPEN

**Dialogue bubbles -** Mara Voss: "Start with probe the nitrate network. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `store-gauges` in Waterworks.

**Beat 2 - After Stop 29 | `register-desk` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 29 result to settle compare child and adult dose."

**Unlocks/waypoint:** Unlock Stop 30 at `register-desk` in Island School.

**Beat 3 - After Stop 30 | `school-tap` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 30 result to settle verify the garden source."

**Unlocks/waypoint:** Unlock Stop 31 at `school-tap` in Island School.

**Beat 4 - After Stop 31 | `school-tap` | automatic**

**World state:** Synthesis: Stop 31 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 31 result to settle set the school action level."

**Unlocks/waypoint:** Unlock Stop 32 at `school-tap` in Island School.

**Beat 5 - At mission end | `store-gauges` | automatic**

**World state:** Decision and hook: Stop 32 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Evidence at the first location unlocks the next causally necessary location; the fourth stop commits the mission decision.

## Characters and dramatic beat

Evidence at the first location unlocks the next causally necessary location; the fourth stop commits the mission decision.

## Key concepts, explained here

dose-response often forms an S-curve; children can receive larger mass-normalized dose; source location follows spatial patterns.

## Stop 29 - Probe the nitrate network

**Format/placement:** PROBE, at `store-gauges`.

**Metadata:** Concept: 28 - nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence; Keystone: nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence.

**Call - exact player copy:** Go to the store gauges, in Waterworks.

**Stop reason - exact player copy:** Repairing the main restores water quantity but leaves the school nitrate warning unresolved.

**Question card story setup - exact player copy:** The repaired main removes quantity loss but not the nitrate gradient. Probe the source, junction, school branch, harbour branch, and school tap to locate the first increase.

**Question card story-science connection - exact player copy:** The first concentration increase localizes the contamination source instead of blaming the whole water supply.

**Question card prompt - exact player copy:** Probe all five stations, compare each station reading with its own expected 6.0-6.5 mg/L range and displayed load at 2.0 L/min, and submit the first break plus source conclusion

**Complete format-specific interaction block:** `probe:{stations:[{id:source,reading:6.1,expected:[6.0,6.5],flow:2.0,load:12.2},{id:junction,reading:6.2,expected:[6.0,6.5],flow:2.0,load:12.4},{id:school_branch,reading:8.4,expected:[6.0,6.5],flow:2.0,load:16.8},{id:harbour_branch,reading:6.3,expected:[6.0,6.5],flow:2.0,load:12.6},{id:school_tap,reading:11.2,expected:[6.0,6.5],flow:2.0,load:22.4}],units:{reading:"mg/L",flow:"L/min",load:"mg/min"},correct_station:school_branch,correct_conclusion:local_school_branch_source}`

**Correct result:** The first break is the school branch; the source is local

**Answer text:** The completed check shows the first break is the school branch; the source is local.

**Why:** Probe the nitrate network connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 30 - Compare child and adult dose

**Format/placement:** BALLPARK, at `register-desk`.

**Metadata:** Concept: 29 - dose | pollution | 8; Keystone: dose | pollution | 8; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: dose | pollution | 8.

**Call - exact player copy:** Go to the register desk, in Island School.

**Stop reason - exact player copy:** The school-branch finding makes body-size differences relevant to the exposure decision.

**Question card story setup - exact player copy:** Because the increase begins on the school branch, concentration alone understates who is at risk. Calculate daily nitrate dose for a child and an adult.

**Question card story-science connection - exact player copy:** Dose per kilogram determines whether the same water concentration exposes children more heavily than adults.

**Question card prompt - exact player copy:** Apply dose=concentration*intake/body mass using 11.2 mg/L, child 1.0 L/day and 20 kg, adult 2.0 L/day and 70 kg; submit the pair in mg/kg/day

**Complete format-specific interaction block:** `estimate:{equation:"dose=C*intake/mass",cases:{child:{C:11.2,intake:1.0,mass:20},adult:{C:11.2,intake:2.0,mass:70}},unit:"mg/kg/day",truth:[0.56,0.32],tolerance:0.01}`

**Correct result:** Child dose is 0.56 and adult dose 0.32 mg/kg/day; the child dose is 75% higher

**Answer text:** The completed check shows child dose is 0.56 and adult dose 0.32 mg/kg/day; the child dose is 75% higher.

**Why:** Compare child and adult dose connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** s who is at risk. Calculate daily nitrate dose for a child and an adult.” Prompt: Apply dose=concentration*intake/body mass using 11.2 mg/L, child 1.0 L/day and 20 kg, adult 2.0 L/day and 70 kg; submit the pair in mg/kg/day. Payload: `estimate:{equation:"dose=C*intake/mass",cases:{child:{C:11.2,intake:1.0,mass:20},adult:{C:11.2,intake:2.0,mass:70}},unit:"mg/kg/day",truth:[0.56,0.32],tolerance:0.01}`

## Stop 31 - Verify the garden source

**Format/placement:** VERIFY, at `school-tap`.

**Metadata:** Concept: 27 - source timing | causality | D3 | RETRIEVE | L4 | twist; Keystone: source timing | causality | D3 | RETRIEVE | L4 | twist; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: source timing | causality | D3 | RETRIEVE | L4 | twist.

**Call - exact player copy:** Go to the school tap, in Island School.

**Stop reason - exact player copy:** The child-dose result makes the suspected garden connection urgent to test.

**Question card story setup - exact player copy:** The dose comparison makes the school tap urgent, while the branch location narrows the source. Predict dilution, isolate the garden connection, measure, interpret, and restore normal flow.

**Question card story-science connection - exact player copy:** The isolation measurement determines whether the local connection accounts for nitrate beyond the predicted mixed-water concentration.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT the equal-volume mix of 11.2 and 6.0 mg/L; OPERATE by closing only the garden valve; MEASURE nitrate; INTERPRET the source; restore the valve and remeasure baseline

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_commit,operate,measure,interpret],operate_unlocked_when:prediction_committed,prediction:{equation:"Cmix=(C1V1+C2V2)/(V1+V2)",inputs:{C1:11.2,C2:6.0,V1:1.0,V2:1.0},units:{C:"mg/L",V:L},truth:8.6,tolerance:0.1},operate:{changed:garden_valve,setting:closed,fixed:[pump_state,sampling_time,tap_flow]},measure:{nitrate:{value:6.2,unit:"mg/L"}},interpret:{correct:local_garden_input},restore:{required:true,setting:open,remeasured_baseline:{value:11.2,unit:"mg/L"}}}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Verify the garden source", unit: "units printed on the card"}
  predictionRange: {min: 4.3, max: 12.9, step: 0.86}
  measurement: {label: "independent measured value", truth: 8.6}
  passRatio: [0.95, 1.05]
  correctResultText: "Prediction is 8.6 mg/L; isolation measures 6.2 mg/L and identifies the local garden input"
```

**Correct result:** Prediction is 8.6 mg/L; isolation measures 6.2 mg/L and identifies the local garden input

**Answer text:** The completed check shows prediction is 8.6 mg/L; isolation measures 6.2 mg/L and identifies the local garden input.

**Why:**, measure, interpret, and restore normal flow

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 32 - Set the school action level

**Format/placement:** TRIGGER, at `school-tap`.

**Metadata:** Concept: 29 - public-health action | policy | 8; Keystone: public-health action | policy | 8; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: public-health action | policy | 8.

**Call - exact player copy:** Go to the school tap, in Island School.

**Stop reason - exact player copy:** The garden input is identified, but school water needs an enforceable rule while repairs proceed.

**Question card story setup - exact player copy:** The controlled isolation identifies the garden connection, but children need a rule before repairs finish. Commit an inclusive action level before new samples appear.

**Question card story-science connection - exact player copy:** The inclusive nitrate threshold determines which new samples require protective action at the school tap.

**Question card prompt - exact player copy:** Set replacement water when nitrate is greater than or equal to 10.0 mg/L; apply it to 11.2, 9.8, and 10.0 mg/L

**Complete format-specific interaction block:** `trigger:{rule:"replacement water when nitrate>=threshold",threshold:10.0,unit:"mg/L",scale:[0,15],anchors:[6,8,10,12],updates:[11.2,9.8,10.0],correct_actions:[act,no_act,act]}`

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 32 - Set the school action level"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Set replacement water when nitrate is greater than or equal to 10.0 mg/L; apply it to 11.2, 9.8, and 10.0 mg/L"
  payload: "`trigger:{rule:\"replacement water when nitrate>=threshold\",threshold:10.0,unit:\"mg/L\",scale:[0,15],anchors:[6,8,10,12],updates:[11.2,9.8,10.0],correct_actions:[act,no_act,act]}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "nitrate concentration", min: 0, max: 15, step: 0.1, unit: "mg/L"}
  start: 3
  anchors:
    - {at: 3, means: "routine baseline, not the decision threshold"}
    - {at: 9.75, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 8, hoursLeft: 48}
    - {at: "T-24 h", value: 9.8, hoursLeft: 24}
    - {at: "T-12 h", value: 10, hoursLeft: 12}
    - {at: "T-6 h", value: 11.2, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 9.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 10, max: 15}, leadHours: 12}
  question: "Set replacement water when nitrate is greater than or equal to 10.0 mg/L; apply it to 11.2, 9.8, and 10.0 mg/L"
```

**Correct result:** Act at 11.2 and 10.0 mg/L; do not act at 9.8 mg/L

**Answer text:** The completed check shows act at 11.2 and 10.0 mg/L; do not act at 9.8 mg/L.

**Why:**, but children need a rule before repairs finish. Commit an inclusive action level before new samples appear

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: The garden caused the school nitrate spike. Use safe water when nitrate reaches 10.0 mg/L. Isolation lowers the tap to 6.2 mg/L. New farm and waste rules must stop another pulse.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Impressive work under pressure. The team can now act on a firm conclusion: The garden caused the school nitrate spike. Your evidence gives the community a fairer and safer path forward.

**Story event - exact player copy:** The school closes the contaminated garden tap while the local nitrate source is repaired.

target 14:00; school protected, Water +5; QA 90/95/58/45 after 11 Reserve. Takeaway: risk depends on source, pathway, concentration, intake, and body size.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The School-Water Finding. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The School-Water Finding, because the increase begins on the school branch, concentration alone understates who is at risk. Which environmental-science conclusion correctly applies Dose?

**Options - exact player copy:**

- A. Effect begins above a dose.
- B. Amount of a substance received per body mass.
- C. Fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.
- D. Probe the nitrate network connects the measured environmental mechanism to the next island condition.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Dose; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Threshold response, not Dose. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. amount of a substance received per body mass.
- C: This describes Bioavailability, not Dose. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence, not Dose. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The School-Water Finding: the repaired main removes quantity loss but not the nitrate gradient. Sample the locations in order now so the crew can identify where the system first departs from normal. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Ordered measurement",
  "yLabel": "Decision quantity",
  "caption": "Measurements approach and then cross the action threshold.",
  "series": [
    {
      "name": "Measured",
      "points": [
        [
          1,
          42
        ],
        [
          2,
          48
        ],
        [
          3,
          55
        ],
        [
          4,
          63
        ],
        [
          5,
          71
        ]
      ]
    }
  ],
  "limit": {
    "at": 60,
    "label": "Action threshold"
  }
}
```


**Options - exact player copy:**

- A. Amount of a substance received per body mass.
- B. Fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.
- C. Effect begins above a dose.
- D. Probe the nitrate network connects the measured environmental mechanism to the next island condition.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Dose, not Threshold response. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Bioavailability, not Threshold response. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. effect begins above a dose.
- D: This describes nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence, not Threshold response. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The School-Water Finding using new evidence: the repaired main removes quantity loss but not the nitrate gradient. Sample the locations in order now so the crew can identify where the system first departs from normal. Which environmental-science conclusion correctly applies Bioavailability?

**Options - exact player copy:**

- A. Amount of a substance received per body mass.
- B. Effect begins above a dose.
- C. Probe the nitrate network connects the measured environmental mechanism to the next island condition.
- D. Fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Bioavailability; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dose, not Bioavailability. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Threshold response, not Bioavailability. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence, not Bioavailability. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The School-Water Finding: the repaired main removes quantity loss but not the nitrate gradient. Sample the locations in order now so the crew can identify where the system first departs from normal. Which environmental-science conclusion correctly applies nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence?

**Options - exact player copy:**

- A. Probe the nitrate network connects the measured environmental mechanism to the next island condition.
- B. Amount of a substance received per body mass.
- C. Effect begins above a dose.
- D. Fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. probe the nitrate network connects the measured environmental mechanism to the next island condition.
- B: This describes Dose, not nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Threshold response, not nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Bioavailability, not nitrate spatial pattern | pollution | D7 | PRACTICE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another School-Water Finding decision, the team knows this: because the increase begins on the school branch, concentration alone understates who is at risk. Which environmental-science conclusion correctly applies dose | pollution | 8?

**Options - exact player copy:**

- A. Amount of a substance received per body mass.
- B. Compare child and adult dose connects the measured environmental mechanism to the next island condition.
- C. Effect begins above a dose.
- D. Fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for dose | pollution | 8; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dose, not dose | pollution | 8. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. compare child and adult dose connects the measured environmental mechanism to the next island condition.
- C: This describes Threshold response, not dose | pollution | 8. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Bioavailability, not dose | pollution | 8. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The School-Water Finding to this follow-up: the dose comparison makes the school tap urgent, while the branch location narrows the source. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which environmental-science conclusion correctly applies source timing | causality | D3 | RETRIEVE | L4 | twist?

**Options - exact player copy:**

- A. Amount of a substance received per body mass.
- B. Effect begins above a dose.
- C. , measure, interpret, and restore normal flow.
- D. Fraction absorbed. Median lethal dose (LD50): dose lethal to half a test population; lower means more toxic.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for source timing | causality | D3 | RETRIEVE | L4 | twist; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dose, not source timing | causality | D3 | RETRIEVE | L4 | twist. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Threshold response, not source timing | causality | D3 | RETRIEVE | L4 | twist. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. , measure, interpret, and restore normal flow
- D: This describes Bioavailability, not source timing | causality | D3 | RETRIEVE | L4 | twist. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 9 - Waste and Land-Use Controls

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 7 DAYS.

**Card title:** WASTE AND LAND-USE CONTROLS

**Go now:** Tip, Mei at `weighbridge`.

**Card body:** The school-water problem came from a nearby pollution source. Farms and the landfill can release similar substances through different routes. Identify those routes and choose practical controls that keep pollution out of the water while allowing the island to keep producing food.

**Objective:** Cut pollution at source.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 9: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m09_we01
    title: Accumulation versus magnification
    problem: A fish's contaminant level rises over its lifetime; predators have higher concentrations than prey. Name the two processes.
    rule: Bioaccumulation occurs within an organism; biomagnification increases concentration across feeding levels.
    steps:
    - The individual fish's lifetime increase is bioaccumulation.
    - The predator-prey concentration increase is biomagnification.
    answer: These describe different comparisons and may occur together.
    common_mistake: Not every substance necessarily biomagnifies.
  - id: carrying_m09_we02
    title: Compare food-chain concentrations
    problem: Prey contain 0.2 mg/kg of a persistent contaminant; predators contain 2 mg/kg. Find the concentration ratio.
    rule: Concentration ratio=predator concentration/prey concentration.
    steps:
    - 'Set up the relationship: Concentration ratio=predator concentration/prey concentration.'
    - ratio=2/0.2=10.
    answer: Predator concentration is ten times prey concentration in these samples.
    common_mistake: Compare concentration units consistently; total body mass is a different quantity.
  - id: carrying_m09_we03
    title: Trace oxygen loss
    problem: Fertilizer runoff enters a lake, algae grow rapidly, and later dissolved oxygen falls. Explain the sequence.
    rule: Extra nutrients can stimulate growth; microbial decomposition consumes dissolved oxygen.
    steps:
    - Nutrient enrichment promotes an algal bloom when other conditions permit.
    - After biomass dies, decomposers use oxygen while breaking it down.
    answer: The resulting oxygen depletion can harm aquatic animals.
    common_mistake: Nutrients do not simply remove oxygen by their presence alone.
  - id: carrying_m09_we04
    title: Point versus nonpoint pollution
    problem: Compare waste leaving a single discharge pipe with fertilizer washed from many fields after rain.
    rule: A point source is an identifiable discrete discharge; nonpoint pollution is diffuse.
    steps:
    - The single pipe has a defined outlet that can be sampled and controlled.
    - Field runoff arrives through many pathways over a broad area.
    answer: The pipe is a point source; widespread field runoff is nonpoint.
    common_mistake: The distinction describes the release pathway, not whether the pollutant is dangerous.
  - id: carrying_m09_we05
    title: Integrated pest management
    problem: A grower observes a pest count below the action threshold and beneficial predators present. What is a reasoned next step?
    rule: Integrated pest management combines monitoring, prevention, biological methods, and targeted treatment when justified.
    steps:
    - The count has not reached the preselected action threshold.
    - Continue monitoring and protect beneficial predators rather than automatically applying a broad pesticide.
    answer: Use the evidence and threshold to decide whether treatment is needed.
    common_mistake: Integrated management does not mean either spraying constantly or never treating.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Bioaccumulation: pollutant buildup within one organism.

Biomagnification: rising concentration at higher trophic levels.

Persistent organic pollutant: long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).

Eutrophication: nutrient enrichment leading to algae and oxygen loss.

#### Primer concepts

- heavy metals damage nerves/kidneys; endocrine disruptors impair development; microplastic effects remain uncertain; mining can cause acid drainage; clearcutting increases erosion.

#### Equations first needed today
**Equation:** `pollutant load=flow×concentration`; `net nutrient change=inputs-outputs`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** pollutant load is pollutant mass per time; flow is water volume per time; concentration is pollutant mass per volume; inputs and outputs are nutrient amounts over the same period.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Tip classification unlocks Common source controls. Mei and Iona accept shared responsibility after pathway evidence.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Tip and Sorting Yard | `weighbridge` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 9: SORT THE MIXED WASTE OPEN

**Dialogue bubbles -** Mara Voss: "Start with sort the mixed waste. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `weighbridge` in Tip and Sorting Yard.

**Beat 2 - After Stop 33 | `tip-lab-bench` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 33 result to settle map source and fate."

**Unlocks/waypoint:** Unlock Stop 34 at `tip-lab-bench` in Tip and Sorting Yard.

**Beat 3 - After Stop 34 | `council-table` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 34 result to settle control the compost process."

**Unlocks/waypoint:** Unlock Stop 35 at `council-table` in Chapel Council Room.

**Beat 4 - After Stop 35 | `council-table` | automatic**

**World state:** Synthesis: Stop 35 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 35 result to settle fund source controls."

**Unlocks/waypoint:** Unlock Stop 36 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `weighbridge` | automatic**

**World state:** Decision and hook: Stop 36 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Tip classification unlocks Common source controls. Mei and Iona accept shared responsibility after pathway evidence.

## Characters and dramatic beat

Tip classification unlocks Common source controls. Mei and Iona accept shared responsibility after pathway evidence.

## Key concepts, explained here

heavy metals damage nerves/kidneys; endocrine disruptors impair development; microplastic effects remain uncertain; mining can cause acid drainage; clearcutting increases erosion.

## Stop 33 - Sort the mixed waste

**Format/placement:** BELT, at `weighbridge`.

**Metadata:** Concept: 29 - pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence; Keystone: pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence.

**Call - exact player copy:** Go to the weighbridge, in Tip and Sorting Yard.

**Stop reason - exact player copy:** Closing the school pathway does not prevent new mixed waste loads from introducing other hazards.

**Question card story setup - exact player copy:** The school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort each arrival by its pollutant class before treatment begins.

**Question card story-science connection - exact player copy:** Pollutant classification determines which arriving materials require separate handling before treatment.

**Question card prompt - exact player copy:** Classify fertilizer, a lead battery, a PCB transformer, hormone medicines, and plastic fragments

**Complete format-specific interaction block:** `belt:{categories:[nutrient,heavy_metal,persistent_organic_pollutant,endocrine_active_drug,microplastic],items:{fertilizer:nutrient,lead_battery:heavy_metal,PCB_transformer:persistent_organic_pollutant,hormones:endocrine_active_drug,plastic_fragments:microplastic},misses_allowed:2}`

**§7 authored-board source - BELT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 33 - Sort the mixed waste"
  format: "BELT"
  source: "Handback 3 canonical interaction block"
  question: "Classify fertilizer, a lead battery, a PCB transformer, hormone medicines, and plastic fragments"
  payload: "`belt:{categories:[nutrient,heavy_metal,persistent_organic_pollutant,endocrine_active_drug,microplastic],items:{fertilizer:nutrient,lead_battery:heavy_metal,PCB_transformer:persistent_organic_pollutant,hormones:endocrine_active_drug,plastic_fragments:microplastic},misses_allowed:2}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BELT:**

```yaml
belt:
  left: {name: "Persistent or biologically active pollutant"}
  right: {name: "Readily managed ordinary waste"}
  runLength: 20
  missesAllowed: 2
  items:
    - {name: "lead battery", bin: left}
    - {name: "PCB transformer", bin: left}
    - {name: "hormone medicine", bin: left}
    - {name: "microplastic", bin: left}
    - {name: "mercury lamp", bin: left}
    - {name: "pesticide concentrate", bin: left}
    - {name: "cadmium cell", bin: left}
    - {name: "oil sludge", bin: left}
    - {name: "PFAS coating", bin: left}
    - {name: "solvent can", bin: left}
    - {name: "medical sharps", bin: left}
    - {name: "copper biocide", bin: left}
    - {name: "clean glass", bin: right}
    - {name: "uncoated paper", bin: right}
    - {name: "food scraps", bin: right}
    - {name: "untreated wood offcut", bin: right}
    - {name: "clean steel", bin: right}
    - {name: "cardboard", bin: right}
    - {name: "cotton cloth", bin: right}
    - {name: "yard trimmings", bin: right}
    - {name: "clean ceramic", bin: right}
    - {name: "aluminium can", bin: right}
    - {name: "plain timber", bin: right}
    - {name: "compostable fiber", bin: right}
```

**Correct result:** All five loads are separated by persistence and biological effect

**Answer text:** The completed check shows all five loads are separated by persistence and biological effect.

**Why:** Sort the mixed waste connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 34 - Map source and fate

**Format/placement:** CASEBOOK, at `tip-lab-bench`.

**Metadata:** Concept: 27 - point and nonpoint fate | pollution | 9; Keystone: point and nonpoint fate | pollution | 9; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: point and nonpoint fate | pollution | 9.

**Call - exact player copy:** Go to the tip lab bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The sorted waste needs a source-and-fate map before controls are chosen.

**Question card story setup - exact player copy:** With hazards classified, their locations reveal different controls. Match each source or fate pattern before selecting treatment, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Each pollutant's pathway identifies where its control must intercept transport or exposure.

**Question card prompt - exact player copy:** Map pipe discharge, field runoff, landfill leachate, and fish mercury to point source, nonpoint source, groundwater pathway, and biomagnification

**Complete format-specific interaction block:** `casebook:{mapping:{pipe_discharge:point_source,field_runoff:nonpoint_source,landfill_leachate:groundwater_pathway,fish_mercury:biomagnification}}`

**Correct result:** All four pollutants are linked to the pathway their control must intercept

**Answer text:** The completed check shows all four pollutants are linked to the pathway their control must intercept.

**Why:** Map source and fate connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 35 - Control the compost process

**Format/placement:** CONTROL, at `council-table`.

**Metadata:** Concept: 5 - compost process | causality | D3 | RETRIEVE | L3 | evidence; Keystone: compost process | causality | D3 | RETRIEVE | L3 | evidence; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: compost process | causality | D3 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The source map makes compost a possible fertilizer substitute whose operating conditions need testing.

**Question card story setup - exact player copy:** The pathway map favors prevention, and compost could replace imported fertilizer if its process is stable. Change aeration alone, measure, restore baseline, and repeat.

**Question card story-science connection - exact player copy:** Temperature and odor responses determine whether aeration supports the decomposition process needed for usable compost.

**Question card prompt - exact player copy:** Measure at 1 exchange/hour after 24 hours; change only aeration to 3 exchanges/hour with moisture 55%, feed mix 1:1, mass 500 kg, and time fixed; restore 1 and remeasure; submit the causal conclusion

**Complete format-specific interaction block:** `control:{candidates:[{id:"aeration",label:"aeration rate"},{id:"moisture",label:"moisture"},{id:"feed_mix",label:"feed mix"}],correct_control:"aeration",baseline:{aeration:1,temperature_C:38,odor_index:8},response:{aeration:3,temperature_C:58,odor_index:2},noise_band:{temperature_C:1,odor_index:0.5},fixed:["moisture 55%","feed mix 1:1","mass 500 kg","24 h timing"],measure_when:"after 24 hours",restore:{required:true,aeration:1,remeasure_after_hours:24},correct_conclusion:"aeration improves aerobic decomposition",answerText:"Higher aeration raises compost temperature and lowers odor beyond noise; restoration confirms aeration caused the response."}`

**Correct result:** Greater aeration raises temperature from 38 C to 58 C and lowers odor from 8 to 2, supporting aerobic decomposition

**Answer text:** The completed check shows greater aeration raises temperature from 38 C to 58 C and lowers odor from 8 to 2, supporting aerobic decomposition.

**Why:** Control the compost process connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 36 - Fund source controls

**Format/placement:** ALLOCATE, at `council-table`.

**Metadata:** Concept: 21 - integrated controls | policy | 9; Keystone: integrated controls | policy | 9; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: integrated controls | policy | 9.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The compost test and source map now provide evidence for allocating prevention effort.

**Question card story setup - exact player copy:** The compost test supplies a safer nutrient source, while the casebook locates remaining pathways. Allocate one hundred control points across confirmed sources.

**Question card story-science connection - exact player copy:** The funded controls determine which confirmed pollutant sources the island will intercept before another exposure occurs.

**Question card prompt - exact player copy:** Fund liner and cap 25, tertiary nutrient removal 25, integrated pest management (IPM) 20, drip irrigation 15, and rain garden 15; reject clearcut subsidy 25 and blanket pesticide 20.

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"liner_cap",cost:25,required:true},{id:"tertiary",cost:25,required:true},{id:"IPM",cost:20,required:true},{id:"drip",cost:15,required:true},{id:"rain_garden",cost:15,required:true},{id:"clearcut_subsidy",cost:25,required:false},{id:"blanket_pesticide",cost:20,required:false}],questions:[{id:"waste",text:"Does the plan block landfill and sewage sources?",required:true},{id:"farm",text:"Does it reduce fertilizer and pesticide transport?",required:true},{id:"runoff",text:"Does it intercept stormwater before the reef?",required:true}],correct_allocation:{liner_cap:25,tertiary:25,IPM:20,drip:15,rain_garden:15},answerText:"Spend all 100 points on the five source controls; the two optional subsidies do not address the confirmed pathways."}`

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 36 - Fund source controls"
  format: "ALLOCATE"
  source: "Handback 3 canonical interaction block"
  question: "Fund liner and cap 25, tertiary nutrient removal 25, integrated pest management (IPM) 20, drip irrigation 15, and rain garden 15; reject clearcut subsidy 25 and blanket pesticide 20."
  payload: "`allocate:{pool:100,items:[{id:\"liner_cap\",cost:25,required:true},{id:\"tertiary\",cost:25,required:true},{id:\"IPM\",cost:20,required:true},{id:\"drip\",cost:15,required:true},{id:\"rain_garden\",cost:15,required:true},{id:\"clearcut_subsidy\",cost:25,required:false},{id:\"blanket_pesticide\",cost:20,required:false}],questions:[{id:\"waste\",text:\"Does the plan block landfill and sewage sources?\",required:true},{id:\"farm\",text:\"Does it reduce fertilizer and pesticide transport?\",required:true},{id:\"runoff\",text:\"Does it intercept stormwater before the reef?\",required:true}],correct_allocation:{liner_cap:25,tertiary:25,IPM:20,drip:15,rain_garden:15},answerText:\"Spend all 100 points on the five source controls; the two optional subsidies do not address the confirmed pathways.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - ALLOCATE:**

```yaml
allocate_patch:
  questions:
    - {id: waste, requires: [liner_cap, tertiary], required: true}
    - {id: farm, requires: [IPM, drip], required: true}
    - {id: runoff, requires: [rain_garden], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  decision_can_fail: true
  question: "Fund liner and cap 25, tertiary nutrient removal 25, integrated pest management (IPM) 20, drip irrigation 15, and rain garden 15; reject clearcut subsidy 25 and blanket pesticide 20."
```

**Correct result:** The five source controls use all 100 points

**Answer text:** The completed check shows the five source controls use all 100 points.

**Why:** Fund source controls connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Line the waste cell and cut sewage nutrients. Use drip lines, IPM, and rain gardens. These steps stop waste near its source. The reef still loses oxygen in warm, nitrate-rich weeks.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a careful and clever call. You replaced uncertainty with a defensible result: Line the waste cell and cut sewage nutrients. The island's water, wildlife, and families are better protected.

**Story event - exact player copy:** The island lines the waste cell and cuts sewage nutrients entering the bay.

target 13:00; controls posted, Trust +5; QA 90/95/69/50 after 11 Reserve. Takeaway: match each pollutant's source, pathway, persistence, and effect to its control.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Waste and Land-Use Controls. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Waste and Land-Use Controls, the school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Bioaccumulation?

**Options - exact player copy:**

- A. Rising concentration at higher trophic levels.
- B. Pollutant buildup within one organism.
- C. Long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).
- D. Nutrient enrichment leading to algae and oxygen loss.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Bioaccumulation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Biomagnification, not Bioaccumulation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. pollutant buildup within one organism.
- C: This describes Persistent organic pollutant, not Bioaccumulation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Eutrophication, not Bioaccumulation. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to Waste and Land-Use Controls: the school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Biomagnification?

**Options - exact player copy:**

- A. Pollutant buildup within one organism.
- B. Long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).
- C. Rising concentration at higher trophic levels.
- D. Nutrient enrichment leading to algae and oxygen loss.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Biomagnification; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Bioaccumulation, not Biomagnification. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Persistent organic pollutant, not Biomagnification. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. rising concentration at higher trophic levels.
- D: This describes Eutrophication, not Biomagnification. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Waste and Land-Use Controls using new evidence: the school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Persistent organic pollutant?

**Options - exact player copy:**

- A. Pollutant buildup within one organism.
- B. Rising concentration at higher trophic levels.
- C. Nutrient enrichment leading to algae and oxygen loss.
- D. Long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Persistent organic pollutant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Bioaccumulation, not Persistent organic pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Biomagnification, not Persistent organic pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Eutrophication, not Persistent organic pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).
### Review question 4

**Prompt - exact player copy:** An unseen case extends Waste and Land-Use Controls: the school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Eutrophication?

**Options - exact player copy:**

- A. Nutrient enrichment leading to algae and oxygen loss.
- B. Pollutant buildup within one organism.
- C. Rising concentration at higher trophic levels.
- D. Long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Eutrophication; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. nutrient enrichment leading to algae and oxygen loss.
- B: This describes Bioaccumulation, not Eutrophication. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Biomagnification, not Eutrophication. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Persistent organic pollutant, not Eutrophication. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Waste and Land-Use Controls decision, the team knows this: the school pathway is closed, but mixed tip loads can recreate it or add persistent toxins. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence?

**Options - exact player copy:**

- A. Pollutant buildup within one organism.
- B. Sort the mixed waste connects the measured environmental mechanism to the next island condition.
- C. Rising concentration at higher trophic levels.
- D. Long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Bioaccumulation, not pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. sort the mixed waste connects the measured environmental mechanism to the next island condition.
- C: This describes Biomagnification, not pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Persistent organic pollutant, not pollutant properties | pollution | D7 | RETRIEVE | L2 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from Waste and Land-Use Controls to this follow-up: with hazards classified, their locations reveal different controls. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies point and nonpoint fate | pollution | 9?

**Options - exact player copy:**

- A. Pollutant buildup within one organism.
- B. Rising concentration at higher trophic levels.
- C. Map source and fate connects the measured environmental mechanism to the next island condition.
- D. Long-lived carbon chemical such as dichlorodiphenyltrichloroethane (DDT) or a polychlorinated biphenyl (PCB).

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for point and nonpoint fate | pollution | 9; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Bioaccumulation, not point and nonpoint fate | pollution | 9. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Biomagnification, not point and nonpoint fate | pollution | 9. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. map source and fate connects the measured environmental mechanism to the next island condition.
- D: This describes Persistent organic pollutant, not point and nonpoint fate | pollution | 9. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 10 - The Reef Evidence

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 6 DAYS.

**Card title:** THE REEF EVIDENCE

**Go now:** Reef Station, Rafi Noor at `water-rack`.

**Card body:** The reef has less oxygen during warm weeks when extra nutrients wash into the bay. Heat and decaying algae can both leave marine life short of oxygen. Test their separate and combined effects, then decide which pressures the ferry agreement must reduce.

**Objective:** Separate and combine reef stressors.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 10: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m10_we01
    title: Compare oxygen deficits
    problem: A water sample has saturation oxygen 10 mg/L but measured oxygen 6 mg/L. Find the deficit.
    rule: Oxygen deficit=saturation concentration-measured concentration.
    steps:
    - 'Set up the relationship: Oxygen deficit=saturation concentration-measured concentration.'
    - deficit=10-6=4 mg/L.
    answer: The sample is 4 mg/L below its stated saturation level.
    common_mistake: Saturation depends on conditions such as temperature; use the supplied reference.
  - id: carrying_m10_we02
    title: Warm water and oxygen
    problem: A stream warms while other conditions are comparable. Why can fish face added oxygen stress?
    rule: Warmer water generally holds less dissolved oxygen at saturation.
    steps:
    - The maximum equilibrium oxygen concentration decreases as the water warms.
    - Organisms may also need more oxygen as metabolism increases, depending on species and conditions.
    answer: Supply can fall while biological demand rises.
    common_mistake: Temperature is not the only factor affecting measured oxygen.
  - id: carrying_m10_we03
    title: Ocean acidification mechanism
    problem: More atmospheric carbon dioxide dissolves in seawater. Explain the pressure on carbonate-building organisms.
    rule: Dissolved carbon dioxide alters acid-base equilibria, raising hydrogen-ion concentration and reducing available carbonate.
    steps:
    - More hydrogen ions react with carbonate to form bicarbonate.
    - Less carbonate can make shell and skeleton formation harder for some organisms.
    answer: Acidification means decreasing pH, even if seawater remains above pH 7.
    common_mistake: The term does not require the ocean to become acidic below pH 7.
  - id: carrying_m10_we04
    title: Trace oxygen loss
    problem: Fertilizer runoff enters a lake, algae grow rapidly, and later dissolved oxygen falls. Explain the sequence.
    rule: Extra nutrients can stimulate growth; microbial decomposition consumes dissolved oxygen.
    steps:
    - Nutrient enrichment promotes an algal bloom when other conditions permit.
    - After biomass dies, decomposers use oxygen while breaking it down.
    answer: The resulting oxygen depletion can harm aquatic animals.
    common_mistake: Nutrients do not simply remove oxygen by their presence alone.
  - id: carrying_m10_we05
    title: Use a reversible intervention
    problem: A lamp draws 2 A at setting A, 3 A at setting B, and 2 A after returning to A. Supply voltage and the lamp are unchanged. What does this support?
    rule: Change one proposed cause, hold other relevant factors fixed, then restore the original condition.
    steps:
    - A → B changes the current by 3-2 = 1 A.
    - B → A restores 2 A. The response reverses with the setting under the stated controls.
    answer: The result supports a setting effect under these test conditions.
    common_mistake: One intervention does not prove the effect is identical under every other condition.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Dissolved oxygen: oxygen gas available in water.

Thermal pollution: warming that lowers oxygen solubility.

Ocean acidification: falling seawater pH as carbon dioxide enters water.

Dead zone: water with too little oxygen for most animals.

#### Primer concepts

- photic shallow water supports algae; eutrophication proceeds nutrients->bloom->decay->anoxia; acidification harms calcium-carbonate shells.

#### Equations first needed today
**Equation:** `N_t=K/(1+e^-rt)`; `energy at next trophic level≈0.10×energy at current level`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `N_t` population at time `t`; `K` carrying capacity; `r` intrinsic growth rate; `t` time; trophic-level energies use the same energy unit.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Reef time series yields predictions; Harbour landings provide independent biological effect. Rafi abandons heat-only explanation.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Waterworks | `sampler` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 10: READ THE PATTERNED RESIDUALS OPEN

**Dialogue bubbles -** Mara Voss: "Start with read the patterned residuals. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `sampler` in Waterworks.

**Beat 2 - After Stop 37 | `flow-tank` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 37 result to settle control heat and nutrients."

**Unlocks/waypoint:** Unlock Stop 38 at `flow-tank` in Reef Station.

**Beat 3 - After Stop 38 | `transect-bench` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 38 result to settle map acidification damage."

**Unlocks/waypoint:** Unlock Stop 39 at `transect-bench` in Reef Station.

**Beat 4 - After Stop 39 | `council-table` | automatic**

**World state:** Synthesis: Stop 39 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 39 result to settle stress the catch ceiling."

**Unlocks/waypoint:** Unlock Stop 40 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `sampler` | automatic**

**World state:** Decision and hook: Stop 40 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Reef time series yields predictions; Harbour landings provide independent biological effect. Rafi abandons heat-only explanation.

## Characters and dramatic beat

Reef time series yields predictions; Harbour landings provide independent biological effect. Rafi abandons heat-only explanation.

## Key concepts, explained here

photic shallow water supports algae; eutrophication proceeds nutrients->bloom->decay->anoxia; acidification harms calcium-carbonate shells.

## Stop 37 - Read the patterned residuals

**Format/placement:** RESIDUAL, at `sampler`.

**Metadata:** Concept: 34 - temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue; Keystone: temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue.

**Call - exact player copy:** Go to the independent sampler, in Waterworks.

**Stop reason - exact player copy:** The new nutrient controls challenge Rafi's claim that heat alone explains the reef's oxygen losses.

**Question card story setup - exact player copy:** The new controls target nutrients, but Rafi’s heat-only model fits the average oxygen level. Compare residual patterns to test whether its errors grow after nitrate pulses.

**Question card story-science connection - exact player copy:** Residuals following nitrate pulses determine whether the oxygen forecast needs nutrient loading as well as temperature.

**Question card prompt - exact player copy:** Compare heat-only residuals [0,0,-2,-2] with heat-plus-nitrate residuals [0.2,-0.1,0.1,-0.2] and submit the model without a patterned error Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:** `residual:{models:{heat_only:{residuals:[0,0,-2,-2]},heat_plus_nitrate:{residuals:[0.2,-0.1,0.1,-0.2]}},correct:heat_plus_nitrate}`

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 37 - Read the patterned residuals"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Compare heat-only residuals [0,0,-2,-2] with heat-plus-nitrate residuals [0.2,-0.1,0.1,-0.2] and submit the model without a patterned error"
  payload: "`residual:{models:{heat_only:{residuals:[0,0,-2,-2]},heat_plus_nitrate:{residuals:[0.2,-0.1,0.1,-0.2]}},correct:heat_plus_nitrate}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - RESIDUAL:**

```yaml
residual:
  xAxis: {label: "ordered observation in the question", values: [1, 2, 3, 4, 5]}
  fits:
    - id: patterned_low_error
      label: "lower average error but patterned residuals"
      rms: 0.18
      structured: true
      residuals: [{x: 1, y: -0.12}, {x: 2, y: -0.06}, {x: 3, y: 0.00}, {x: 4, y: 0.06}, {x: 5, y: 0.12}]
    - id: unpatterned_generalising
      label: "slightly higher error with no directional pattern"
      rms: 0.21
      structured: false
      residuals: [{x: 1, y: 0.05}, {x: 2, y: -0.04}, {x: 3, y: 0.02}, {x: 4, y: -0.03}, {x: 5, y: 0.01}]
  accept: unpatterned_generalising
  reject: patterned_low_error
  correctConclusion: "Heat plus nitrate survives; the heat-only errors track nitrate pulses"
```

**Correct result:** Heat plus nitrate survives; the heat-only errors track nitrate pulses

**Answer text:** The completed check shows heat plus nitrate survives; the heat-only errors track nitrate pulses.

**Why:** Read the patterned residuals connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 38 - Control heat and nutrients

**Format/placement:** CONTROL, at `flow-tank`.

**Metadata:** Concept: 8 - factorial stressors | causality | D9 | COMBINE | L4 | reveal; Keystone: factorial stressors | causality | D9 | COMBINE | L4 | reveal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: factorial stressors | causality | D9 | COMBINE | L4 | reveal.

**Call - exact player copy:** Go to the flow tank, in Reef Station.

**Stop reason - exact player copy:** The residual pattern suggests a nutrient effect that must be separated from heat experimentally.

**Question card story setup - exact player copy:** Because patterned errors follow nitrate pulses, test temperature and nitrate separately and together. Keep all other tank conditions fixed and restore the baseline after every treatment.

**Question card story-science connection - exact player copy:** The treatment comparisons determine whether heat and nitrate jointly worsen oxygen and reef cover beyond either factor alone.

**Question card prompt - exact player copy:** Measure the baseline at 24 C and 1 mg/L nitrate. Change temperature only to 28 C, change nitrate only to 8 mg/L, then change both while light, flow, fragment size, salinity 35 ppt, and six-week timing remain fixed; measure oxygen and coral cover after each run, restore baseline and remeasure, then submit the interaction conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"temperature",label:"temperature"},{id:"nitrate",label:"nitrate concentration"},{id:"salinity",label:"salinity"}],selected_controls:["temperature","nitrate"],baseline:{temperature_C:24,nitrate_mgL:1,DO_mgL:7.5,cover_pct:80},responses:[{temperature_C:28,nitrate_mgL:1,DO_mgL:6.3,cover_pct:70},{temperature_C:24,nitrate_mgL:8,DO_mgL:5.8,cover_pct:62},{temperature_C:28,nitrate_mgL:8,DO_mgL:3.1,cover_pct:30}],noise_band:{DO_mgL:0.2,cover_pct:2},fixed:["light","flow","fragment size","salinity 35 ppt","six-week timing"],measure_when:"after six weeks",restore:{required:true,temperature_C:24,nitrate_mgL:1,DO_mgL:7.5,cover_pct:80,remeasure:true},correct_conclusion:"heat and nutrients interact",answerText:"Heat and nitrate together depress oxygen and coral cover more than either treatment alone, and restoration returns the baseline."}`

**§7 authored-board source - CONTROL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 38 - Control heat and nutrients"
  format: "CONTROL"
  source: "Handback 5 canonical interaction block"
  question: "Measure the baseline at 24 C and 1 mg/L nitrate. Change temperature only to 28 C, change nitrate only to 8 mg/L, then change both while light, flow, fragment size, salinity 35 ppt, and six-week timing remain fixed; measure oxygen and coral cover after each run, restore baseline and remeasure, then submit the interaction conclusion."
  payload: "`control:{candidates:[{id:\"temperature\",label:\"temperature\"},{id:\"nitrate\",label:\"nitrate concentration\"},{id:\"salinity\",label:\"salinity\"}],selected_controls:[\"temperature\",\"nitrate\"],baseline:{temperature_C:24,nitrate_mgL:1,DO_mgL:7.5,cover_pct:80},responses:[{temperature_C:28,nitrate_mgL:1,DO_mgL:6.3,cover_pct:70},{temperature_C:24,nitrate_mgL:8,DO_mgL:5.8,cover_pct:62},{temperature_C:28,nitrate_mgL:8,DO_mgL:3.1,cover_pct:30}],noise_band:{DO_mgL:0.2,cover_pct:2},fixed:[\"light\",\"flow\",\"fragment size\",\"salinity 35 ppt\",\"six-week timing\"],measure_when:\"after six weeks\",restore:{required:true,temperature_C:24,nitrate_mgL:1,DO_mgL:7.5,cover_pct:80,remeasure:true},correct_conclusion:\"heat and nutrients interact\",answerText:\"Heat and nitrate together depress oxygen and coral cover more than either treatment alone, and restoration returns the baseline.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - CONTROL:**

**Handback 5 canonical interaction block - CONTROL:**

```yaml
control:
  candidates:
    - {id: temperature, label: "Temperature", baseline: 24, treatment: 28, unit: "°C"}
    - {id: nitrate, label: "Nitrate", baseline: 1, treatment: 8, unit: "mg/L"}
    - {id: combined, label: "Temperature and nitrate together", baseline: 0, treatment: 1, unit: "paired treatment"}
  truth: combined
  responseLabel: "oxygen suppression relative to baseline"
  baseline: {setting: "24 C and 1 mg/L nitrate", response: 0, reading: 7.5, coralCover: 80, noise: 0.2}
  treatment: {setting: "28 C and 8 mg/L nitrate", response: 4.4, reading: 3.1, coralCover: 30}
  fixed: ["light", "flow", "fragment size", "salinity at 35 ppt", "six-week timing"]
  measureWhen: "after six weeks"
  restore: {required: true, temperature: 24, nitrate: 1, remeasure: true}
  correctConclusion: "The combined treatment yields 3.1 mg/L oxygen and 30% cover, showing heat and nutrients interact"
```

**Correct result:** The combined treatment yields 3.1 mg/L oxygen and 30% cover, showing heat and nutrients interact

**Answer text:** The completed check shows the combined treatment yields 3.1 mg/L oxygen and 30% cover, showing heat and nutrients interact.

**Why:** Control heat and nutrients connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 39 - Map acidification damage

**Format/placement:** CHOICE, at `transect-bench`.

**Metadata:** Concept: 32 - aquatic zones and acidification | biodiversity | D3 | RETRIEVE | L3 | evidence; Keystone: aquatic zones and acidification | biodiversity | D3 | RETRIEVE | L3 | evidence; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: aquatic zones and acidification | biodiversity | D3 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the transect bench, in Reef Station.

**Stop reason - exact player copy:** The tank results leave shell loss outside the bloom needing an additional explanation.

**Question card story setup - exact player copy:** The tank reveals combined heat and nutrients, yet shell loss occurs beyond the inner bloom. Place pH and calcifier-cover distributions across the reef zones.

**Question card story-science connection - exact player copy:** The pH and calcifier-cover pattern determines whether acidification must be included in reef protection.

**Question card prompt - exact player copy:** Fit pH [8.15,8.05,7.95] and cover [70,55,35] across littoral, pelagic, and benthic observations; submit acidification as the mechanism

**Complete format-specific interaction block:** `cloud:{zones:[littoral,pelagic,benthic],pH:[8.15,8.05,7.95],calcifier_cover_pct:[70,55,35],tolerance_pH:0.03,correct:ocean_acidification}`

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 39 - Map acidification damage"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "Fit pH [8.15,8.05,7.95] and cover [70,55,35] across littoral, pelagic, and benthic observations; submit acidification as the mechanism"
  payload: "`cloud:{zones:[littoral,pelagic,benthic],pH:[8.15,8.05,7.95],calcifier_cover_pct:[70,55,35],tolerance_pH:0.03,correct:ocean_acidification}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```













**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Across three reef zones, pH falls from 8.15 to 8.05 to 7.95 while calcifier cover falls from 70% to 55% to 35%."
  choices:
    - {id: acidification, label: "Falling pH is associated with falling calcifier cover, consistent with acidification damage.", correct: true}
    - {id: warming, label: "Rising temperature alone explains the cover loss because pH is unchanged.", correct: false}
    - {id: recovery, label: "The reef is recovering because calcifier cover rises as pH falls.", correct: false}
    - {id: certainty, label: "The pattern proves acidification is the only possible cause of all reef damage.", correct: false}
  answer: acidification
  rebuttals:
    warming: "The displayed pH changes substantially, and no temperature series is supplied."
    recovery: "Calcifier cover decreases from 70% to 35%, so the claimed direction is reversed."
    certainty: "The association supports acidification damage but does not exclude every co-occurring stressor."
```

**Correct result:** Falling pH accompanies falling calcifier cover; acidification explains the shell loss

**Answer text:** The completed check shows falling pH accompanies falling calcifier cover; acidification explains the shell loss.

**Why:** Map acidification damage connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 40 - Stress the catch ceiling

**Format/placement:** STRESS, at `council-table`.

**Metadata:** Concept: 19 - sustainable plan | population limits | D5 | TRANSFER | L5 | decision; Keystone: sustainable plan | population limits | D5 | TRANSFER | L5 | decision; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: sustainable plan | population limits | D5 | TRANSFER | L5 | decision.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The combined reef pressures make the original catch ceiling vulnerable to poor nursery recruitment.

**Question card story setup - exact player copy:** The reef now faces nutrient, heat, fishing, and acidification pressure. Stress the catch ceiling across uncertain nursery recruitment, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** The low-recruitment comparison determines which catch limit remains below replacement in a bad year.

**Question card prompt - exact player copy:** Move recruitment from 80 to 130 fish and select among a fixed 100-fish catch, 70-fish precautionary catch, 130-fish catch, or no cap; submit the ceiling that stays below replacement

**Complete format-specific interaction block:** `stress:{assumption:nursery_recruits,range:[80,130],candidates:[{id:fixed_100,value:100},{id:precautionary_70,value:70},{id:catch_130,value:130},{id:no_cap,value:null}],correct:precautionary_70}`

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 40 - Stress the catch ceiling"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Move recruitment from 80 to 130 fish and select among a fixed 100-fish catch, 70-fish precautionary catch, 130-fish catch, or no cap; submit the ceiling that stays below replacement"
  payload: "`stress:{assumption:nursery_recruits,range:[80,130],candidates:[{id:fixed_100,value:100},{id:precautionary_70,value:70},{id:catch_130,value:130},{id:no_cap,value:null}],correct:precautionary_70}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "nursery recruitment", min: 80, max: 130, nominal: 105.0, step: 10, unit: "fish"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 105.0, max: 105.0}
      failsAt: 130
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 105.0, max: 130}
      failsAt: 80
    - id: robust_plan
      label: "Use 70 fish in low-recruitment years"
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 80, max: 130}
  robust: robust_plan
  question: "Move recruitment from 80 to 130 fish and select among a fixed 100-fish catch, 70-fish precautionary catch, 130-fish catch, or no cap; submit the ceiling that stays below replacement"
```

**Correct result:** Use 70 fish in low-recruitment years

**Answer text:** The completed check shows use 70 fish in low-recruitment years.

**Why:** Stress the catch ceiling connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Cut runoff, warm water, air waste, and fishing at the same time. Cap catch at 70 fish in poor years. Heat alone did not harm the reef. The plan must protect the full habitat.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You gave the team the breakthrough it needed. The mission now has its answer: Cut runoff, warm water, air waste, and fishing at the same time. The ferry decision is now grounded in what Vellan can actually sustain.

**Story event - exact player copy:** The ferry conditions now limit nutrient runoff, warm discharge, air pollution, and fishing pressure together.

target 15:00; reef evidence accepted, Evidence +5; QA 95/95/80/50 after 11 Reserve. Takeaway: interacting stressors can cause more harm than either one alone.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Reef Evidence. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Reef Evidence, the new controls target nutrients, but Rafi’s heat-only model fits the average oxygen level. Which environmental-science conclusion correctly applies Dissolved oxygen?

**Options - exact player copy:**

- A. Warming that lowers oxygen solubility.
- B. Oxygen gas available in water.
- C. Falling seawater pH as carbon dioxide enters water.
- D. Water with too little oxygen for most animals.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Dissolved oxygen; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Thermal pollution, not Dissolved oxygen. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. oxygen gas available in water.
- C: This describes Ocean acidification, not Dissolved oxygen. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Dead zone, not Dissolved oxygen. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Reef Evidence: the new controls target nutrients, but Rafi’s heat-only model fits the average oxygen level. Which environmental-science conclusion correctly applies Thermal pollution?

**Options - exact player copy:**

- A. Oxygen gas available in water.
- B. Falling seawater pH as carbon dioxide enters water.
- C. Warming that lowers oxygen solubility.
- D. Water with too little oxygen for most animals.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Thermal pollution; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dissolved oxygen, not Thermal pollution. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Ocean acidification, not Thermal pollution. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. warming that lowers oxygen solubility.
- D: This describes Dead zone, not Thermal pollution. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Reef Evidence using new evidence: the tank reveals combined heat and nutrients, yet shell loss occurs beyond the inner bloom. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies Ocean acidification?

**Options - exact player copy:**

- A. Oxygen gas available in water.
- B. Warming that lowers oxygen solubility.
- C. Water with too little oxygen for most animals.
- D. Falling seawater pH as carbon dioxide enters water.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Ocean acidification; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dissolved oxygen, not Ocean acidification. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Thermal pollution, not Ocean acidification. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Dead zone, not Ocean acidification. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. falling seawater pH as carbon dioxide enters water.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Reef Evidence: the tank reveals combined heat and nutrients, yet shell loss occurs beyond the inner bloom. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies Dead zone?

**Options - exact player copy:**

- A. Water with too little oxygen for most animals.
- B. Oxygen gas available in water.
- C. Warming that lowers oxygen solubility.
- D. Falling seawater pH as carbon dioxide enters water.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Dead zone; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. water with too little oxygen for most animals.
- B: This describes Dissolved oxygen, not Dead zone. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Thermal pollution, not Dead zone. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Ocean acidification, not Dead zone. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Reef Evidence decision, the team knows this: the new controls target nutrients, but Rafi’s heat-only model fits the average oxygen level. Which environmental-science conclusion correctly applies temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue?

**Options - exact player copy:**

- A. Oxygen gas available in water.
- B. Read the patterned residuals connects the measured environmental mechanism to the next island condition.
- C. Warming that lowers oxygen solubility.
- D. Falling seawater pH as carbon dioxide enters water.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dissolved oxygen, not temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. read the patterned residuals connects the measured environmental mechanism to the next island condition.
- C: This describes Thermal pollution, not temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Ocean acidification, not temporal pattern | uncertainty | D2 | RETRIEVE | L4 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Reef Evidence to this follow-up: because patterned errors follow nitrate pulses, test temperature and nitrate separately and together. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which environmental-science conclusion correctly applies factorial stressors | causality | D9 | COMBINE | L4 | reveal?

**Options - exact player copy:**

- A. Oxygen gas available in water.
- B. Warming that lowers oxygen solubility.
- C. Control heat and nutrients connects the measured environmental mechanism to the next island condition.
- D. Falling seawater pH as carbon dioxide enters water.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for factorial stressors | causality | D9 | COMBINE | L4 | reveal; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dissolved oxygen, not factorial stressors | causality | D9 | COMBINE | L4 | reveal. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Thermal pollution, not factorial stressors | causality | D9 | COMBINE | L4 | reveal. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. control heat and nutrients connects the measured environmental mechanism to the next island condition.
- D: This describes Ocean acidification, not factorial stressors | causality | D9 | COMBINE | L4 | reveal. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 11 - Energy and Emissions Ledger

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 5 DAYS.

**Card title:** ENERGY AND EMISSIONS LEDGER

**Go now:** Turbine Yard, Elias Shaw at `meter-board`.

**Card body:** The new ferry needs dependable power, but a generator's maximum rating does not show how much energy it supplies through the year. Compare actual electricity needs, fuel pollution, and control costs. Choose an energy plan the island can support in practice.

**Objective:** Close the useful-energy and pollution ledger.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 11: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m11_we01
    title: Capacity factor
    problem: A 10 kW generator produces 120 kWh during a 24-hour day. Find its capacity factor over that day.
    rule: Capacity factor=actual energy/(rated power×time).
    steps:
    - 'Set up the relationship: Capacity factor=actual energy/(rated power×time).'
    - factor=120/(10×24)=120/240=0.5=50%.
    answer: The day's capacity factor is 50%.
    common_mistake: Use an energy denominator, not rated power alone.
  - id: carrying_m11_we02
    title: Energy from power
    problem: A device runs at 2 kW for 5 hours. Find energy use.
    rule: Energy=power×time.
    steps:
    - 'Set up the relationship: Energy=power×time.'
    - E=2 kW×5 h=10 kWh.
    answer: The device uses 10 kilowatt-hours.
    common_mistake: Kilowatts and kilowatt-hours measure different quantities.
  - id: carrying_m11_we03
    title: Energy return on investment
    problem: A process delivers 100 energy units and requires 20 units to build and operate within the stated accounting boundary. Find EROI.
    rule: Energy return on investment EROI=energy returned/energy invested.
    steps:
    - 'Set up the relationship: Energy return on investment EROI=energy returned/energy invested.'
    - EROI=100/20=5.
    answer: The return ratio is 5:1 under this boundary.
    common_mistake: Changing what is included in invested energy can change the comparison.
  - id: carrying_m11_we04
    title: Emissions from activity
    problem: An activity uses 100 fuel units with an emission factor of 2 kg per fuel unit. Find emissions.
    rule: Emissions=activity×emission factor.
    steps:
    - 'Set up the relationship: Emissions=activity×emission factor.'
    - emissions=100(2)=200 kg.
    answer: Total emissions are 200 kg for the stated factor and boundary.
    common_mistake: A rate per fuel unit must be multiplied by fuel use.
  - id: carrying_m11_we05
    title: Primary versus secondary pollutant
    problem: A source emits sulfur dioxide; atmospheric reactions later form sulfate particles. Classify the pollutants.
    rule: Primary pollutants are emitted directly; secondary pollutants form through subsequent reactions.
    steps:
    - Sulfur dioxide leaving the source is a primary pollutant.
    - Sulfate formed later through atmospheric chemistry is secondary.
    answer: The classification depends on formation route.
    common_mistake: Secondary does not mean less harmful.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Capacity factor: actual energy divided by maximum possible energy.

Energy return on investment (EROI): energy returned divided by energy invested.

Primary pollutant: emitted directly.

Secondary pollutant: formed in air.

#### Primer concepts

- Coal has the highest carbon dioxide (CO2), sulfur dioxide (SO2), and mercury (Hg) emissions; oil and gas are portable but spill and emit; nuclear is low-carbon with costly long-lived waste; renewables are low-carbon but need land, storage, or backup.
- Weather is short-term; climate is a 30+ year average.

#### Equations first needed today
**Equation:** `capacity factor=actual kWh/(rated kW×8760 h)`;

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** capacity factor is a decimal or percent; actual energy is measured in kilowatt-hours (kWh); rated power is in kilowatts (kW); `8760 h` is the number of hours in a standard year.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `efficiency=useful output/input`;

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** efficiency is a decimal or percent; useful output and total input are measured in the same energy unit.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `EROI=energy returned/energy invested`.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `EROI` is energy return on investment; energy returned and energy invested use the same energy unit.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Turbine output and demand unlock Tip fuel/waste records; pollutant totals unlock Common efficiency choices. Elias's “250 kW” claim becomes 31% annual factor. A three-column ledger persists.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Turbine Yard | `meter-board` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 11: CLOSE THE PEAK-POWER LEDGER OPEN

**Dialogue bubbles -** Mara Voss: "Start with close the peak-power ledger. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `meter-board` in Turbine Yard.

**Beat 2 - After Stop 41 | `turbine-plate` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 41 result to settle calculate capacity factor."

**Unlocks/waypoint:** Unlock Stop 42 at `turbine-plate` in Turbine Yard.

**Beat 3 - After Stop 42 | `tip-lab-bench` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 42 result to settle match pollutants and controls."

**Unlocks/waypoint:** Unlock Stop 43 at `tip-lab-bench` in Tip and Sorting Yard.

**Beat 4 - After Stop 43 | `delivery-board` | automatic**

**World state:** Synthesis: Stop 43 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 43 result to settle fund the energy portfolio."

**Unlocks/waypoint:** Unlock Stop 44 at `delivery-board` in Common Office.

**Beat 5 - At mission end | `meter-board` | automatic**

**World state:** Decision and hook: Stop 44 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Turbine output and demand unlock Tip fuel/waste records; pollutant totals unlock Common efficiency choices. Elias's “250 kW” claim becomes 31% annual factor. A three-column ledger persists.

## Characters and dramatic beat

Turbine output and demand unlock Tip fuel/waste records; pollutant totals unlock Common efficiency choices. Elias's “250 kW” claim becomes 31% annual factor. A three-column ledger persists.

## Key concepts, explained here

coal has highest CO2/SO2/Hg; oil/gas are portable but spill and emit; nuclear is low-carbon with costly long-lived waste; renewables are low-carbon but need land, storage, or backup. Weather is short-term; climate is a 30+ year average.

## Stop 41 - Close the peak-power ledger

**Format/placement:** BALANCE, at `meter-board`.

**Metadata:** Concept: 25 - demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation; Keystone: demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation.

**Call - exact player copy:** Go to the meter board, in Turbine Yard.

**Stop reason - exact player copy:** The reef safeguards add electrical demand that the evening power plan must now cover.

**Question card story setup - exact player copy:** The reef conditions add new electric loads, while essential evening demand must remain firm. Close the peak ledger before selecting any generator or storage plan.

**Question card story-science connection - exact player copy:** The peak-power balance determines how much firm reserve remains after protected loads are supplied.

**Question card prompt - exact player copy:** Using 310 kW supply and simultaneous loads of 160, 55, 20, 15, and 45 kW, apply reserve=supply-loads and submit one reserve in kW

**Complete format-specific interaction block:** `balance:{streams:[{id:"available_supply",direction:"in",value:310,unit:"kW",counts:true},{id:"homes",direction:"out",value:160,unit:"kW",counts:true},{id:"water",direction:"out",value:55,unit:"kW",counts:true},{id:"school",direction:"out",value:20,unit:"kW",counts:true},{id:"tip",direction:"out",value:15,unit:"kW",counts:true},{id:"ferry",direction:"out",value:45,unit:"kW",counts:true},{id:"nameplate_capacity",direction:"none",value:400,unit:"kW",counts:false,reason:"not available supply during the outage"}],equation:"reserve=available supply-sum active loads",correct:15,tolerance:1,answerText:"The active-load reserve is 15 kW; unavailable nameplate capacity does not count."}`

**Correct result:** The reserve is 15 kW

**Answer text:** The completed check shows the reserve is 15 kW.

**Why:** Close the peak-power ledger connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 42 - Calculate capacity factor

**Format/placement:** BALLPARK, at `turbine-plate`.

**Metadata:** Concept: 26 - capacity factor | energy | 11; Keystone: capacity factor | energy | 11; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: capacity factor | energy | 11.

**Call - exact player copy:** Go to the turbine plate, in Turbine Yard.

**Stop reason - exact player copy:** The small evening reserve makes the turbine's nameplate claim insufficient for supply planning.

**Question card story setup - exact player copy:** The peak ledger leaves only fifteen kilowatts, and the turbine plate promises 250 kilowatts. Replace nameplate power with annual performance, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Annual capacity factor distinguishes rated turbine power from the energy the island actually receives over a year.

**Question card prompt - exact player copy:** Apply capacity factor=680000 kWh/(250 kW*8760 h); submit one percent

**Complete format-specific interaction block:** `estimate:{equation:"680000/(250*8760)*100",inputs:{actual_kWh:680000,rated_kW:250,hours:8760},truth:31.1,unit:percent,tolerance:0.2}`

**Correct result:** Capacity factor is 31.1%

**Answer text:** The completed check shows capacity factor is 31.1%.

**Why:** Calculate capacity factor connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 43 - Match pollutants and controls

**Format/placement:** CASEBOOK, at `tip-lab-bench`.

**Metadata:** Concept: 27 - air pollution | atmosphere and climate | 11; Keystone: air pollution | atmosphere and climate | 11; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: air pollution | atmosphere and climate | 11.

**Call - exact player copy:** Go to the tip lab bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The wind-performance result leaves backup generation necessary and its pollution needing controls.

**Question card story setup - exact player copy:** Because nameplate power overstates wind supply, backup fuels remain in the plan. Match each pollutant to its source, effect, and control.

**Question card story-science connection - exact player copy:** The source-effect-control matches determine which safeguards belong with each backup fuel in the energy plan.

**Question card prompt - exact player copy:** Match CO, SO2, NOx, PM, and ground-level ozone to their printed mechanisms and controls

**Complete format-specific interaction block:** `casebook:{mapping:{CO:[incomplete_combustion,reduced_blood_oxygen,catalytic_converter],SO2:[coal,acid_rain,scrubber],NOx:[combustion,photochemical_smog,catalyst],PM:[dust_and_combustion,cardiorespiratory_harm,electrostatic_precipitator],ground_ozone:[photochemistry,respiratory_harm,precursor_control]}}`

**Correct result:** All five pollutant chains are matched

**Answer text:** The completed check shows all five pollutant chains are matched.

**Why:** Match pollutants and controls connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** s wind supply, backup fuels remain in the plan. Match each pollutant to its source, effect, and control.” Prompt: Match CO, SO2, NOx, PM, and ground-level ozone to their printed mechanisms and controls. Payload: `casebook:{mapping:{CO:[incomplete_combustion,reduced_blood_oxygen,catalytic_converter],SO2:[coal,acid_rain,scrubber],NOx:[combustion,photochemical_smog,catalyst],PM:[dust_and_combustion,cardiorespiratory_harm,electrostatic_precipitator],ground_ozone:[photochemistry,respiratory_harm,precursor_control]}}`

## Stop 44 - Fund the energy portfolio

**Format/placement:** SCIENCETANK, at `delivery-board`.

**Metadata:** Concept: 23 - energy portfolio | energy and policy | 11; Keystone: energy portfolio | energy and policy | 11; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: energy portfolio | energy and policy | 11.

**Call - exact player copy:** Go to the delivery board, in Common Office.

**Stop reason - exact player copy:** The council now has both measured wind performance and backup pollution costs to fund together.

**Question card story setup - exact player copy:** Actual wind output and backup pollution are now counted together. Spend one hundred planning points on firm supply and controls, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** The energy portfolio determines whether firm supply and pollutant controls survive the same planning budget.

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

**Happy ending card - exact player copy:** Brilliant analysis. You found the result the team needed: Use repaired wind, storage, and less power. Vellan Island has a stronger plan for its people and ecosystems.

**Story event - exact player copy:** The power plan shifts to repaired wind, storage, and lower demand.

target 15:00; ledger closed, Reserve +5; QA 95/95/95/51 after Reserve10 Trust1. Takeaway: compare actual output, firm demand, efficiency, pollution, and EROI.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Energy and Emissions Ledger. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Thermal inversion:** warm air trapping cooler polluted air below.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Energy and Emissions Ledger, the reef conditions add new electric loads, while essential evening demand must remain firm. Close the ledger now so the next decision uses every real input and output exactly once. Which environmental-science conclusion correctly applies Thermal inversion?

**Options - exact player copy:**

- A. Actual energy divided by maximum possible energy.
- B. Warm air trapping cooler polluted air below.
- C. Energy returned divided by energy invested.
- D. Emitted directly.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Thermal inversion; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Capacity factor, not Thermal inversion. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. warm air trapping cooler polluted air below.
- C: This describes Energy return on investment (EROI), not Thermal inversion. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Primary pollutant, not Thermal inversion. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to Energy and Emissions Ledger: the peak ledger leaves only fifteen kilowatts, and the turbine plate promises 250 kilowatts. Which environmental-science conclusion correctly applies Capacity factor?

**Options - exact player copy:**

- A. Warm air trapping cooler polluted air below.
- B. Energy returned divided by energy invested.
- C. Actual energy divided by maximum possible energy.
- D. Emitted directly.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Capacity factor; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Thermal inversion, not Capacity factor. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Energy return on investment (EROI), not Capacity factor. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. actual energy divided by maximum possible energy.
- D: This describes Primary pollutant, not Capacity factor. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Energy and Emissions Ledger using new evidence: the reef conditions add new electric loads, while essential evening demand must remain firm. Close the ledger now so the next decision uses every real input and output exactly once. Which environmental-science conclusion correctly applies Energy return on investment (EROI)?

**Options - exact player copy:**

- A. Warm air trapping cooler polluted air below.
- B. Actual energy divided by maximum possible energy.
- C. Emitted directly.
- D. Energy returned divided by energy invested.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Energy return on investment (EROI); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Thermal inversion, not Energy return on investment (EROI). It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Capacity factor, not Energy return on investment (EROI). It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Primary pollutant, not Energy return on investment (EROI). It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. energy returned divided by energy invested.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Energy and Emissions Ledger: because nameplate power overstates wind supply, backup fuels remain in the plan. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies Primary pollutant?

**Options - exact player copy:**

- A. Emitted directly.
- B. Warm air trapping cooler polluted air below.
- C. Actual energy divided by maximum possible energy.
- D. Energy returned divided by energy invested.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Primary pollutant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. emitted directly.
- B: This describes Thermal inversion, not Primary pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Capacity factor, not Primary pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Energy return on investment (EROI), not Primary pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Energy and Emissions Ledger decision, the team knows this: because nameplate power overstates wind supply, backup fuels remain in the plan. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies Secondary pollutant?

**Options - exact player copy:**

- A. Warm air trapping cooler polluted air below.
- B. Formed in air.
- C. Actual energy divided by maximum possible energy.
- D. Energy returned divided by energy invested.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Secondary pollutant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Thermal inversion, not Secondary pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. formed in air.
- C: This describes Capacity factor, not Secondary pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Energy return on investment (EROI), not Secondary pollutant. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from Energy and Emissions Ledger to this follow-up: the reef conditions add new electric loads, while essential evening demand must remain firm. Close the ledger now so the next decision uses every real input and output exactly once. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Plan",
  "yLabel": "Daily energy demand (MWh)",
  "caption": "Efficiency lowers the island's daily energy demand.",
  "bars": [
    {
      "name": "Current plan",
      "value": 100
    },
    {
      "name": "Efficiency plan",
      "value": 76
    }
  ]
}
```


**Options - exact player copy:**

- A. Warm air trapping cooler polluted air below.
- B. Actual energy divided by maximum possible energy.
- C. Close the peak-power ledger connects the measured environmental mechanism to the next island condition.
- D. Energy returned divided by energy invested.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Thermal inversion, not demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Capacity factor, not demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. close the peak-power ledger connects the measured environmental mechanism to the next island condition.
- D: This describes Energy return on investment (EROI), not demand and efficiency | energy | D7 ledger | RETRIEVE | L2 | foundation. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 12 - The Leak and Turbine Case

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 4 DAYS.

**Card title:** THE LEAK AND TURBINE CASE

**Go now:** Turbine Yard, Elias Shaw at `gearbox-crate`.

**Card body:** The wind turbine needs eleven weeks of repairs, leaving a gap in the ferry's power supply. Gas captured from the landfill could help, but escaping methane adds pollution. Verify the repair time and gas supply, then choose reliable temporary power with defensible emissions.

**Objective:** Lock a feasible low-emission power bridge.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 12: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m12_we01
    title: Two half-lives
    problem: A substance has initial mass 80 g and half-life 3 years. Find the remaining mass after 6 years.
    rule: Remaining mass=M0(1/2)^(time/half-life).
    steps:
    - 'Set up the relationship: Remaining mass=M0(1/2)^(time/half-life).'
    - M=80(1/2)^(6/3)=80/4=20 g.
    answer: Twenty grams remain after two half-lives.
    common_mistake: Each half-life halves the remaining amount, not the original amount again.
  - id: carrying_m12_we02
    title: Use a stated warming factor
    problem: For this exercise, a gas has warming factor 20 kg CO2-equivalent per kg over a specified time horizon. Find the equivalent of 3 kg.
    rule: CO2-equivalent mass=gas mass×the stated horizon-specific factor.
    steps:
    - 'Set up the relationship: CO2-equivalent mass=gas mass×the stated horizon-specific factor.'
    - equivalent=3(20)=60 kg CO2-equivalent.
    answer: The equivalent is 60 kg for the supplied factor and horizon.
    common_mistake: The factor must have a stated time horizon; it is not a universal timeless value.
  - id: carrying_m12_we03
    title: Capacity is not dependable supply
    problem: A solar array has a 10 kW peak rating. A device needs 2 kW throughout the night. Does the rating alone establish supply?
    rule: Peak power does not specify availability over every required hour.
    steps:
    - At night the array may provide no direct output.
    - Storage or another source must supply the full nighttime energy and power demand.
    answer: The peak rating alone does not establish continuous supply.
    common_mistake: Do not substitute maximum output for a time-resolved supply plan.
  - id: carrying_m12_we04
    title: Energy from power
    problem: A device runs at 2 kW for 5 hours. Find energy use.
    rule: Energy=power×time.
    steps:
    - 'Set up the relationship: Energy=power×time.'
    - E=2 kW×5 h=10 kWh.
    answer: The device uses 10 kilowatt-hours.
    common_mistake: Kilowatts and kilowatt-hours measure different quantities.
  - id: carrying_m12_we05
    title: Emissions from activity
    problem: An activity uses 100 fuel units with an emission factor of 2 kg per fuel unit. Find emissions.
    rule: Emissions=activity×emission factor.
    steps:
    - 'Set up the relationship: Emissions=activity×emission factor.'
    - emissions=100(2)=200 kg.
    answer: Total emissions are 200 kg for the stated factor and boundary.
    common_mistake: A rate per fuel unit must be multiplied by fuel use.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Greenhouse gas: gas that absorbs outgoing heat.

Global warming potential: heat trapped relative to carbon dioxide.

Half-life: time for half a radioactive sample to decay.

Base load: power available steadily.

#### Primer concepts

- Global warming potential (GWP) compares heat trapping with carbon dioxide. Methane (CH4) has GWP about 28-36 over 100 years and lasts about 12 years; carbon dioxide (CO2) has GWP 1 but lasts centuries to millennia; nitrous oxide (N2O) has GWP 265-310 and lasts 121 years.
- Nuclear fission releases heat; U-235 half-life 704 million years, Cs-137 30 years, I-131 8 days.

#### Equations first needed today
**Equation:** `emissions=activity×emission factor`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** emissions are pollutant mass; activity is the amount of fuel, energy, or work performed; emission factor is pollutant mass per unit of activity.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

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

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 45 result to settle verify methane capture."

**Unlocks/waypoint:** Unlock Stop 46 at `gas-rack` in Tip and Sorting Yard.

**Beat 3 - After Stop 46 | `tip-lab-bench` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 46 result to settle diagnose the engine-room alarm."

**Unlocks/waypoint:** Unlock Stop 47 at `tip-lab-bench` in Tip and Sorting Yard.

**Beat 4 - After Stop 47 | `load-board` | automatic**

**World state:** Synthesis: Stop 47 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 47 result to settle allocate firm power."

**Unlocks/waypoint:** Unlock Stop 48 at `load-board` in Waterworks.

**Beat 5 - At mission end | `council-table` | automatic**

**World state:** Decision and hook: Stop 48 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Turbine feasibility unlocks Tip gas measurement; confirmed capture unlocks Waterworks essential-load allocation. Apparent victory arrives when firm plan locks, then gearbox delay remains visible.

## Characters and dramatic beat

Turbine feasibility unlocks Tip gas measurement; confirmed capture unlocks Waterworks essential-load allocation. Apparent victory arrives when firm plan locks, then gearbox delay remains visible.

## Key concepts, explained here

CH4 GWP about 28-36 over 100 years and lasts about 12 years; CO2 GWP 1 but lasts centuries to millennia; N2O GWP 265-310 and lasts 121 years. Nuclear fission releases heat; U-235 half-life 704 million years, Cs-137 30 years, I-131 8 days.

## Stop 45 - Audit the gearbox schedule

**Format/placement:** ATTEST, asked by Mara Voss beside `council-table`.

**Metadata:** Concept: 34 - feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle; Keystone: feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle.

**Call - exact player copy:** Talk to Mara Voss, at the council table in Chapel Council Room.

**Stop reason - exact player copy:** The energy portfolio still depends on a gearbox delivery date that has not been verified.

**Question card story setup - exact player copy:** The portfolio assumes repaired wind before ferry day, but the crated gearbox carries several schedule claims. Verify its evidence before counting that power.

**Question card story-science connection - exact player copy:** The schedule evidence determines whether repaired wind can count as firm supply before the ferry vote.

**Question card prompt - exact player copy:** Verify at most three claims among order date, shipment status, fitting crew, and completion by vote; reject the critical unbacked completion claim

**Complete format-specific interaction block:** `attest:{limit:3,claims:[{id:order,backed:true},{id:shipment,backed:true},{id:crew,backed:true},{id:completion_by_vote,backed:false,critical:true}],correct:reject_completion}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Audit the gearbox schedule", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Wind is not firm power before the vote

**Answer text:** The completed check shows wind is not firm power before the vote.

**Why:** Audit the gearbox schedule connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 46 - Verify methane capture

**Format/placement:** VERIFY, at `gas-rack`.

**Metadata:** Concept: 31 - methane capture | causality | D7 | RETRIEVE | L4 | evidence; Keystone: methane capture | causality | D7 | RETRIEVE | L4 | evidence; Area: Tip and Sorting Yard; Learning role: PRACTICE; Difficulty: L3; Story role: methane capture | causality | D7 | RETRIEVE | L4 | evidence.

**Call - exact player copy:** Go to the gas rack, in Tip and Sorting Yard.

**Stop reason - exact player copy:** The unavailable wind supply makes captured landfill gas a possible temporary power source.

**Question card story setup - exact player copy:** Because wind cannot return before the vote, captured landfill gas may bridge the gap. Predict recoverable methane, operate the collector, measure capture and leakage, interpret, and restore.

**Question card story-science connection - exact player copy:** Measured methane recovery and leakage determine whether the collector can support the proposed bridge supply.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Use V_CH4=(400 m3/day)(0.55)(0.80), where V_CH4 is captured methane volume per day, and submit V_CH4 in m3 CH4/day. OPERATE at 60% vacuum with waste mass, moisture, and time fixed. MEASURE capture and leakage. INTERPRET against limits, then restore baseline.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_commit,operate,measure,interpret],operate_unlocked_when:prediction_committed,prediction:{equation:"recoverable=gas_volume*methane_fraction*collection_efficiency",inputs:{gas_volume:400,methane_fraction:0.55,collection_efficiency:0.80},unit:"m3 CH4/day",truth:176,tolerance:17.6},operate:{control:collector_vacuum,setting_pct:60,fixed:[waste_mass,moisture,elapsed_time]},measure:{captured_m3_day:170,leaked_pct:18},interpret:{correct:accept,criteria:["capture within 10% of 176","leakage <=20%"]},restore:{required:true,setting:baseline,remeasure:true}}`

**Correct result:** Prediction 176 m3/day; measurements 170 m3/day and 18% leakage pass

**Answer text:** The completed check shows prediction 176 m3/day; measurements 170 m3/day and 18% leakage pass.

**Why:** Verify methane capture connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 47 - Diagnose the engine-room alarm

**Format/placement:** DIAGNOSIS, at `tip-lab-bench`.

**Metadata:** Concept: 27 - engine-room air | atmosphere | D11 | RETRIEVE | L4 | reveal; Keystone: engine-room air | atmosphere | D11 | RETRIEVE | L4 | reveal; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: engine-room air | atmosphere | D11 | RETRIEVE | L4 | reveal.

**Call - exact player copy:** Go to the tip lab bench, in Tip and Sorting Yard.

**Stop reason - exact player copy:** Passing methane capture does not explain the backup engine room's continuing alarm.

**Question card story setup - exact player copy:** The collector meets methane limits, but the backup engine-room alarm persists. Diagnose it using both alarms and quiet readings, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** The gas and ventilation diagnosis determines which combustion and exhaust faults must be repaired before operation.

**Question card prompt - exact player copy:** Choose among outdoor inversion, carbon monoxide from incomplete combustion, radon, and photochemical ozone using high CO, normal oxygen and NOx, no daylight, and a stuck exhaust damper

**Complete format-specific interaction block:** `diagnosis:{readings:{CO:high,O2:normal,NOx:normal,daylight:none,exhaust_damper:stuck},choices:[outdoor_inversion,CO_from_incomplete_combustion,radon,photochemical_ozone],answer:CO_from_incomplete_combustion,rebuttals:{outdoor_inversion:"Does not explain the indoor damper timing",radon:"Does not track engine operation",photochemical_ozone:"Requires sunlight and precursor chemistry"}}`

**Correct result:** Incomplete combustion plus the stuck damper caused the CO alarm

**Answer text:** The completed check shows incomplete combustion plus the stuck damper caused the CO alarm.

**Why:** Diagnose the engine-room alarm connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 48 - Allocate firm power

**Format/placement:** ALLOCATE, at `load-board`.

**Metadata:** Concept: 26 - firm critical loads | energy | 12; Keystone: firm critical loads | energy | 12; Area: Turbine Yard; Learning role: PRACTICE; Difficulty: L3; Story role: firm critical loads | energy | 12.

**Call - exact player copy:** Go to the load board, in Waterworks.

**Stop reason - exact player copy:** The exhaust repair makes the backup source usable, but protected loads must fit its limited output.

**Question card story setup - exact player copy:** Captured methane can run safely after the exhaust repair, but its output is limited. Allocate 180 kilowatts across protected services, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** The power allocation determines whether every essential service can be supplied without exceeding the firm generation available.

**Question card prompt - exact player copy:** Allocate water pumps 55, school 20, treatment 35, ferry refrigeration 30, and homes 40; exclude decorative berth lighting 25

**Complete format-specific interaction block:** `allocate:{pool:180,items:[{id:"water",cost:55,required:true},{id:"school",cost:20,required:true},{id:"treatment",cost:35,required:true},{id:"ferry_refrigeration",cost:30,required:false},{id:"homes",cost:40,required:true,protected:true},{id:"decorative_berth",cost:25,required:false}],questions:[{id:"protected",text:"Are all protected public services powered?",required:true},{id:"food",text:"Can the remaining pool protect refrigerated ferry food?",required:true},{id:"limit",text:"Does the allocation stay within 180 kW?",required:true}],correct_allocation:{water:55,school:20,treatment:35,ferry_refrigeration:30,homes:40},answerText:"Allocate all 180 kW to water, school, treatment, homes, and ferry refrigeration; decorative berth lighting remains off."}`

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 48 - Allocate firm power"
  format: "ALLOCATE"
  source: "Handback 3 canonical interaction block"
  question: "Allocate water pumps 55, school 20, treatment 35, ferry refrigeration 30, and homes 40; exclude decorative berth lighting 25"
  payload: "`allocate:{pool:180,items:[{id:\"water\",cost:55,required:true},{id:\"school\",cost:20,required:true},{id:\"treatment\",cost:35,required:true},{id:\"ferry_refrigeration\",cost:30,required:false},{id:\"homes\",cost:40,required:true,protected:true},{id:\"decorative_berth\",cost:25,required:false}],questions:[{id:\"protected\",text:\"Are all protected public services powered?\",required:true},{id:\"food\",text:\"Can the remaining pool protect refrigerated ferry food?\",required:true},{id:\"limit\",text:\"Does the allocation stay within 180 kW?\",required:true}],correct_allocation:{water:55,school:20,treatment:35,ferry_refrigeration:30,homes:40},answerText:\"Allocate all 180 kW to water, school, treatment, homes, and ferry refrigeration; decorative berth lighting remains off.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - ALLOCATE:**

```yaml
allocate_patch:
  questions:
    - {id: protected, requires: [water, school, treatment, homes], required: true}
    - {id: food, requires: [ferry_refrigeration], required: true}
    - {id: limit, requires: [water, school, treatment, homes], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  decision_can_fail: true
  question: "Allocate water pumps 55, school 20, treatment 35, ferry refrigeration 30, and homes 40; exclude decorative berth lighting 25"
```

**Correct result:** All five essential/protected loads receive exactly 180 kW

**Answer text:** The completed check shows all five essential/protected loads receive exactly 180 kW.

**Why:** Allocate firm power connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Use stored gas, fixed pipes, key loads, and cells until the wind gear arrives. The 180-kilowatt plan keeps water, school, homes, and food safe. Backup power is ready.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You turned a difficult clue into a clear decision. Your work produced a sound decision: Use stored gas, fixed pipes, key loads, and cells until the wind gear arrives. The council can act without sacrificing the island's future.

**Story event - exact player copy:** Captured landfill gas and repaired pipes keep essential services powered until the turbine returns.

target 16:00; firm plan contracted, Reserve +5 and lock; QA 95/95/100/62 after Trust11. Takeaway: low-carbon plans count timing, leakage, firm output, and health controls.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Leak and Turbine Case. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Leak and Turbine Case, the portfolio assumes repaired wind before ferry day, but the crated gearbox carries several schedule claims. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies Greenhouse gas?

**Options - exact player copy:**

- A. Heat trapped relative to carbon dioxide.
- B. Gas that absorbs outgoing heat.
- C. Time for half a radioactive sample to decay.
- D. Power available steadily.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Greenhouse gas; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Global warming potential, not Greenhouse gas. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. gas that absorbs outgoing heat.
- C: This describes Half-life, not Greenhouse gas. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Base load, not Greenhouse gas. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Leak and Turbine Case: the portfolio assumes repaired wind before ferry day, but the crated gearbox carries several schedule claims. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies Global warming potential?

**Options - exact player copy:**

- A. Gas that absorbs outgoing heat.
- B. Time for half a radioactive sample to decay.
- C. Heat trapped relative to carbon dioxide.
- D. Power available steadily.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Global warming potential; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Greenhouse gas, not Global warming potential. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Half-life, not Global warming potential. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. heat trapped relative to carbon dioxide.
- D: This describes Base load, not Global warming potential. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Leak and Turbine Case using new evidence: the portfolio assumes repaired wind before ferry day, but the crated gearbox carries several schedule claims. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies Half-life?

**Options - exact player copy:**

- A. Gas that absorbs outgoing heat.
- B. Heat trapped relative to carbon dioxide.
- C. Power available steadily.
- D. Time for half a radioactive sample to decay.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Half-life; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Greenhouse gas, not Half-life. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Global warming potential, not Half-life. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Base load, not Half-life. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. time for half a radioactive sample to decay.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Leak and Turbine Case: captured methane can run safely after the exhaust repair, but its output is limited. Before the plan can proceed, divide the limited supply so every required use is covered. Which environmental-science conclusion correctly applies Base load?

**Options - exact player copy:**

- A. Power available steadily.
- B. Gas that absorbs outgoing heat.
- C. Heat trapped relative to carbon dioxide.
- D. Time for half a radioactive sample to decay.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Base load; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. power available steadily.
- B: This describes Greenhouse gas, not Base load. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Global warming potential, not Base load. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Half-life, not Base load. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Leak and Turbine Case decision, the team knows this: the portfolio assumes repaired wind before ferry day, but the crated gearbox carries several schedule claims. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which environmental-science conclusion correctly applies feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle?

**Options - exact player copy:**

- A. Gas that absorbs outgoing heat.
- B. Audit the gearbox schedule connects the measured environmental mechanism to the next island condition.
- C. Heat trapped relative to carbon dioxide.
- D. Time for half a radioactive sample to decay.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Greenhouse gas, not feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. audit the gearbox schedule connects the measured environmental mechanism to the next island condition.
- C: This describes Global warming potential, not feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Half-life, not feasibility | evidence | D6 compliance | RETRIEVE | L3 | obstacle. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Leak and Turbine Case to this follow-up: because wind cannot return before the vote, captured landfill gas may bridge the gap. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which environmental-science conclusion correctly applies methane capture | causality | D7 | RETRIEVE | L4 | evidence?

**Options - exact player copy:**

- A. Gas that absorbs outgoing heat.
- B. Heat trapped relative to carbon dioxide.
- C. Verify methane capture connects the measured environmental mechanism to the next island condition.
- D. Time for half a radioactive sample to decay.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for methane capture | causality | D7 | RETRIEVE | L4 | evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Greenhouse gas, not methane capture | causality | D7 | RETRIEVE | L4 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Global warming potential, not methane capture | causality | D7 | RETRIEVE | L4 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. verify methane capture connects the measured environmental mechanism to the next island condition.
- D: This describes Half-life, not methane capture | causality | D7 | RETRIEVE | L4 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 13 - The Biosecurity Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 3 DAYS.

**Card title:** THE BIOSECURITY RULE

**Go now:** Ferry Berth, Tomas Reed at `berth-standpipe`.

**Card body:** The power plan is ready, but arriving ferries could carry organisms that spread and harm island wildlife. Inspect likely routes from the boats to land and reef. Choose checks that prevent harmful new species from arriving or becoming established.

**Objective:** Prevent imported species from outrunning island defenses.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 13: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m13_we01
    title: Introduced versus invasive
    problem: A plant arrives from another region and establishes without documented harm. Is it automatically invasive?
    rule: Introduced describes origin; invasive generally includes spreading and causing ecological or other harm in the relevant usage.
    steps:
    - Its arrival establishes that it is nonnative to the location.
    - Evidence of spread and harm is still needed to make the stronger classification.
    answer: Introduction alone does not establish invasiveness.
    common_mistake: Do not treat every nonnative organism as equally harmful.
  - id: carrying_m13_we02
    title: An endemic species
    problem: A species exists naturally on only one small island. What does endemic mean, and why can habitat loss matter greatly?
    rule: Endemic means native and restricted to a particular geographic area.
    steps:
    - All natural populations lie within that restricted range.
    - Habitat loss there can affect a large share of the species rather than one of many widespread populations.
    answer: Its restricted range can make local threats consequential for the whole species.
    common_mistake: Endemic does not mean invasive or necessarily already endangered.
  - id: carrying_m13_we03
    title: Prevent an introduction
    problem: A generic shipment can carry seeds in packing soil. Compare inspecting before release with waiting until seedlings spread.
    rule: Prevention acts before establishment; control afterward must find and remove organisms already dispersed.
    steps:
    - Inspection can intercept the pathway while material is concentrated.
    - After release, seeds may spread beyond the original shipment and become harder to locate.
    answer: Pre-release inspection targets the introduction pathway directly.
    common_mistake: Inspection reduces risk but does not guarantee every organism is detected.
  - id: carrying_m13_we04
    title: Species richness
    problem: A sample contains 8 oak trees, 2 pines, and 1 birch. Find species richness.
    rule: Richness counts distinct species, not individuals.
    steps:
    - 'Set up the relationship: Richness counts distinct species, not individuals.'
    - distinct species={oak,pine,birch}, so richness=3.
    answer: Species richness is 3; the total individual count is 11.
    common_mistake: Richness does not measure how evenly individuals are distributed among species.
  - id: carrying_m13_we05
    title: Compare ecological vulnerability
    problem: A species eats one seed type; another eats many seeds and insects. A drought removes that one seed type. Which has fewer food alternatives?
    rule: Specialists use a narrower resource range than generalists.
    steps:
    - The specialist loses its primary food source.
    - The generalist has other possible foods, though they may also be affected.
    answer: The specialist has fewer alternatives under this stated disturbance.
    common_mistake: Generalists are not immune to environmental change.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Invasive species: introduced organism that spreads and causes harm.

Endemic: native to one limited place.

Convention on International Trade in Endangered Species (CITES): treaty controlling trade in threatened species.

Endangered Species Act: United States law protecting listed species and habitat.

#### Primer concepts

- species richness rises with island size and falls with distance; generalists often invade readily; disturbance opens habitat; prevention is cheaper than eradication.

#### Equations first needed today
**Equation:** `population change=births+immigration-deaths-emigration`; `species richness=cA^z`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** births, immigration, deaths, and emigration are counts over the same period; species richness is the number of species; `A` is island area; `c` and `z` are fitted constants.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Berth inspection identifies propagules; Common disturbance map predicts establishment; Reef test sets decontamination. Tomas changes from speed-first to inspection-first.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Ferry Berth | `quarantine-rack` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 13: SCREEN THE ARRIVING CARGO OPEN

**Dialogue bubbles -** Mara Voss: "Start with screen the arriving cargo. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `quarantine-rack` in Ferry Berth.

**Beat 2 - After Stop 49 | `common-map` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 49 result to settle test survey recovery."

**Unlocks/waypoint:** Unlock Stop 50 at `common-map` in Common Office.

**Beat 3 - After Stop 50 | `flow-tank` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 50 result to settle control the rinse treatment."

**Unlocks/waypoint:** Unlock Stop 51 at `flow-tank` in Reef Station.

**Beat 4 - After Stop 51 | `water-rack` | automatic**

**World state:** Synthesis: Stop 51 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 51 result to settle write the biosecurity protocol."

**Unlocks/waypoint:** Unlock Stop 52 at `water-rack` in Reef Station.

**Beat 5 - At mission end | `quarantine-rack` | automatic**

**World state:** Decision and hook: Stop 52 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Berth inspection identifies propagules; Common disturbance map predicts establishment; Reef test sets decontamination. Tomas changes from speed-first to inspection-first.

## Characters and dramatic beat

Berth inspection identifies propagules; Common disturbance map predicts establishment; Reef test sets decontamination. Tomas changes from speed-first to inspection-first.

## Key concepts, explained here

species richness rises with island size and falls with distance; generalists often invade readily; disturbance opens habitat; prevention is cheaper than eradication.

## Stop 49 - Screen the arriving cargo

**Format/placement:** BELT, at `quarantine-rack`.

**Metadata:** Concept: 33 - arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue; Keystone: arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue.

**Call - exact player copy:** Go to the quarantine rack, in Ferry Berth.

**Stop reason - exact player copy:** The power bridge keeps the sailing possible, bringing its biological cargo risks into the approval decision.

**Question card story setup - exact player copy:** The power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort each arrival before unloading, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** The cargo classifications determine which pathways need quarantine before living hitchhikers reach the island.

**Question card prompt - exact player copy:** Sort soil, standing water, untreated wood, plants, and animals as inspection-required; sort sealed clean metal as low risk

**Complete format-specific interaction block:** `belt:{categories:[inspection_required,low_risk],items:{soil:inspection_required,standing_water:inspection_required,untreated_wood:inspection_required,plants:inspection_required,animals:inspection_required,sealed_clean_metal:low_risk}}`

**§7 authored-board source - BELT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 49 - Screen the arriving cargo"
  format: "BELT"
  source: "Handback 5 canonical interaction block"
  question: "Sort soil, standing water, untreated wood, plants, and animals as inspection-required; sort sealed clean metal as low risk"
  payload: "`belt:{categories:[inspection_required,low_risk],items:{soil:inspection_required,standing_water:inspection_required,untreated_wood:inspection_required,plants:inspection_required,animals:inspection_required,sealed_clean_metal:low_risk}}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BELT:**

**Handback 5 canonical interaction block - BELT:**

```yaml
belt:
  left: {name: "Inspection required"}
  right: {name: "Low-risk sealed cargo"}
  runLength: 20
  missesAllowed: 2
  items:
    - {name: "sealed soil", bin: left}
    - {name: "sealed water jar", bin: left}
    - {name: "sealed wood crate", bin: left}
    - {name: "live plant", bin: left}
    - {name: "live animal", bin: left}
    - {name: "used boot", bin: left}
    - {name: "sealed seed sack", bin: left}
    - {name: "muddy tire", bin: left}
    - {name: "sealed bait bucket", bin: left}
    - {name: "fresh produce", bin: left}
    - {name: "nursery pot", bin: left}
    - {name: "unsealed crate", bin: left}
    - {name: "sealed clean metal", bin: right}
    - {name: "sterile tool", bin: right}
    - {name: "factory-sealed glass", bin: right}
    - {name: "sealed electronics", bin: right}
    - {name: "clean ceramic", bin: right}
    - {name: "sealed dry hardware", bin: right}
    - {name: "sterile medical pack", bin: right}
    - {name: "new cable", bin: right}
    - {name: "sealed fasteners", bin: right}
    - {name: "clean plastic fitting", bin: right}
    - {name: "sealed instrument", bin: right}
    - {name: "certified dry part", bin: right}
```

**Correct result:** Five biological pathways enter quarantine; sealed clean metal may proceed

**Answer text:** The completed check shows five biological pathways enter quarantine; sealed clean metal may proceed.

**Why:** Screen the arriving cargo connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 50 - Test survey recovery

**Format/placement:** INJECT, at `common-map`.

**Metadata:** Concept: 33 - invasion detection | uncertainty | 13; Keystone: invasion detection | uncertainty | 13; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: invasion detection | uncertainty | 13.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** Cargo screening needs a detection check before the council relies on surveys to catch escapees.

**Question card story setup - exact player copy:** Inspection identifies risky cargo, yet the council needs to know whether its survey would detect escapees. Inject a known marked population through the pipeline.

**Question card story-science connection - exact player copy:** Recovery of marked organisms measures how many introduced individuals the survey could miss.

**Question card prompt - exact player copy:** Inject 100 seeds; add 45 road, 20 common, and 2 cliff recoveries; apply recovery percent=recovered/injected*100 and submit percent plus pass/fail against 90%

**Complete format-specific interaction block:** `inject:{population:100,recovered:{road:45,common:20,cliff:2},equation:"recovery=recovered/injected*100",truth:67,unit:percent,tolerance:1,required:90,conclusion:fail}`

**§7 authored-board source - INJECT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 50 - Test survey recovery"
  format: "INJECT"
  source: "Handback 3 canonical interaction block"
  question: "Inject 100 seeds; add 45 road, 20 common, and 2 cliff recoveries; apply recovery percent=recovered/injected*100 and submit percent plus pass/fail against 90%"
  payload: "`inject:{population:100,recovered:{road:45,common:20,cliff:2},equation:\"recovery=recovered/injected*100\",truth:67,unit:percent,tolerance:1,required:90,conclusion:fail}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - INJECT:**

```yaml
inject:
  population: {label: "injected seeds", n: 100}
  metric: {id: recovery_rate, label: "recovery percentage"}
  configurations:
    - {id: current, label: "current three-area survey", detections: 67, metric: 67}
    - {id: road_heavy, label: "road-heavy survey", detections: 78, metric: 61}
    - {id: representative, label: "representative survey", detections: 74, metric: 90}
  best: representative
  blindSpot: "objects outside every sampled path are never recovered"
  correctResult: "Recovery is 67%; the survey fails"
```

**Correct result:** Recovery is 67%; the survey fails

**Answer text:** The completed check shows recovery is 67%; the survey fails.

**Why:** Test survey recovery connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 51 - Control the rinse treatment

**Format/placement:** CONTROL, at `flow-tank`.

**Metadata:** Concept: 33 - ballast decontamination | causality | D10 | RETRIEVE | L3 | evidence; Keystone: ballast decontamination | causality | D10 | RETRIEVE | L3 | evidence; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: ballast decontamination | causality | D10 | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the flow tank, in Reef Station.

**Stop reason - exact player copy:** The survey's missed organisms make prevention before cargo release more important.

**Question card story setup - exact player copy:** Because land surveys miss remote escapees, prevention must work before release. Change rinse treatment alone, measure survivors, restore baseline, and remeasure.

**Question card story-science connection - exact player copy:** The rinse reversal determines whether the treatment itself causes the reduction in surviving organisms.

**Question card prompt - exact player copy:** At rinse OFF measure after 30 minutes; change only rinse ON with water 100 L, salinity 35 ppt, temperature 24 C, starting load 100, and time fixed; restore OFF and remeasure; submit causation

**Complete format-specific interaction block:** `control:{candidates:[{id:"rinse",label:"rinse treatment"},{id:"salinity",label:"salinity"},{id:"temperature",label:"temperature"}],correct_control:"rinse",baseline:{setting:"OFF",survivors:100},response:{setting:"ON",survivors:2},noise_band:{survivors:3},fixed:["water 100 L","salinity 35 ppt","temperature 24 C","starting load 100","30-minute timing"],measure_when:"after 30 minutes",restore:{required:true,setting:"OFF",survivors:100,remeasure:true},correct_conclusion:"rinsing caused the reduction",answerText:"Turning on only the rinse reduces survivors from 100 to 2, far beyond noise, and restoration returns the baseline."}`

**Correct result:** Survivors fall from 100 to 2 only when rinse is on; rinsing caused the reduction

**Answer text:** The completed check shows survivors fall from 100 to 2 only when rinse is on; rinsing caused the reduction.

**Why:** Control the rinse treatment connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 52 - Write the biosecurity protocol

**Format/placement:** PROTOCOL, at `water-rack`.

**Metadata:** Concept: 33 - cargo rule | policy | 13; Keystone: cargo rule | policy | 13; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: cargo rule | policy | 13.

**Call - exact player copy:** Go to the water rack, in Reef Station.

**Stop reason - exact player copy:** The detection and rinse tests are complete, allowing an evidence-based unloading protocol.

**Question card story setup - exact player copy:** The injection test exposes weak detection, while the rinse test shows prevention works. Match every cargo pathway to an action before unloading.

**Question card story-science connection - exact player copy:** The pathway-action matches determine which preventive measure must occur before each cargo type is released.

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

**Happy ending card - exact player copy:** That was first-rate reasoning. You pinned down the governing result: Check each ferry before it sails. Your evidence gives the community a fairer and safer path forward.

**Story event - exact player copy:** A cargo inspection and rinse rule now applies before every ferry sailing.

target 14:00; rule published, Trust +5; QA 95/95/100/78 after Trust11. Takeaway: isolated ecosystems need prevention because detection and recolonization are weak.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Biosecurity Rule. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Biosecurity Rule, the power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Invasive species?

**Options - exact player copy:**

- A. Native to one limited place.
- B. Introduced organism that spreads and causes harm.
- C. Treaty controlling trade in threatened species.
- D. United States law protecting listed species and habitat.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Invasive species; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Endemic, not Invasive species. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. introduced organism that spreads and causes harm.
- C: This describes Convention on International Trade in Endangered Species (CITES), not Invasive species. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Endangered Species Act, not Invasive species. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Biosecurity Rule: the power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Endemic?

**Options - exact player copy:**

- A. Introduced organism that spreads and causes harm.
- B. Treaty controlling trade in threatened species.
- C. Native to one limited place.
- D. United States law protecting listed species and habitat.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Endemic; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Invasive species, not Endemic. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Convention on International Trade in Endangered Species (CITES), not Endemic. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. native to one limited place.
- D: This describes Endangered Species Act, not Endemic. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Biosecurity Rule using new evidence: the power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Convention on International Trade in Endangered Species (CITES)?

**Options - exact player copy:**

- A. Introduced organism that spreads and causes harm.
- B. Native to one limited place.
- C. United States law protecting listed species and habitat.
- D. Treaty controlling trade in threatened species.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Convention on International Trade in Endangered Species (CITES); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Invasive species, not Convention on International Trade in Endangered Species (CITES). It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Endemic, not Convention on International Trade in Endangered Species (CITES). It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Endangered Species Act, not Convention on International Trade in Endangered Species (CITES). It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. treaty controlling trade in threatened species.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Biosecurity Rule: the power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies Endangered Species Act?

**Options - exact player copy:**

- A. United States law protecting listed species and habitat.
- B. Introduced organism that spreads and causes harm.
- C. Native to one limited place.
- D. Treaty controlling trade in threatened species.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Endangered Species Act; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. united States law protecting listed species and habitat.
- B: This describes Invasive species, not Endangered Species Act. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Endemic, not Endangered Species Act. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Convention on International Trade in Endangered Species (CITES), not Endangered Species Act. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Biosecurity Rule decision, the team knows this: the power bridge keeps the ferry feasible, but its cargo includes living hitchhikers. Sort the displayed items now so the later decision does not mix cases governed by different evidence. Which environmental-science conclusion correctly applies arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue?

**Options - exact player copy:**

- A. Introduced organism that spreads and causes harm.
- B. Screen the arriving cargo connects the measured environmental mechanism to the next island condition.
- C. Native to one limited place.
- D. Treaty controlling trade in threatened species.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Invasive species, not arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. screen the arriving cargo connects the measured environmental mechanism to the next island condition.
- C: This describes Endemic, not arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Convention on International Trade in Endangered Species (CITES), not arrival screening | biodiversity | D3 | RETRIEVE | L2 | clue. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Biosecurity Rule to this follow-up: inspection identifies risky cargo, yet the council needs to know whether its survey would detect escapees. Run the known signal through the pipeline now so the team knows what the real search can recover. Which environmental-science conclusion correctly applies invasion detection | uncertainty | 13?

**Options - exact player copy:**

- A. Introduced organism that spreads and causes harm.
- B. Native to one limited place.
- C. Test survey recovery connects the measured environmental mechanism to the next island condition.
- D. Treaty controlling trade in threatened species.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for invasion detection | uncertainty | 13; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Invasive species, not invasion detection | uncertainty | 13. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Endemic, not invasion detection | uncertainty | 13. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. test survey recovery connects the measured environmental mechanism to the next island condition.
- D: This describes Convention on International Trade in Endangered Species (CITES), not invasion detection | uncertainty | 13. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 14 - The Population Outlook

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 2 DAYS.

**Card title:** THE POPULATION OUTLOOK

**Go now:** Island School, Lena Costa at `register-desk`.

**Card body:** The ferry's resource needs depend on both permanent residents and short-term visitors. Their numbers can change in different ways. Forecast population and visitor growth, then estimate how much water, food, and other resources the island will need to serve them.

**Objective:** Lock the human-demand forecast.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 14: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m14_we01
    title: Population balance
    problem: A population starts at 100, with 20 births, 5 immigrants, 10 deaths and 5 emigrants. Find its ending size.
    rule: N_end=N_start+births+immigration-deaths-emigration.
    steps:
    - 'Set up the relationship: N_end=N_start+births+immigration-deaths-emigration.'
    - N_end=100+20+5-10-5=110.
    answer: The population increases by 10 to 110.
    common_mistake: Immigration adds individuals; emigration removes them.
  - id: carrying_m14_we02
    title: Percent population growth
    problem: A population of 1000 gains 40 individuals net during a year. Find its annual percent growth.
    rule: Growth percent=net change/starting population×100%.
    steps:
    - 'Set up the relationship: Growth percent=net change/starting population×100%.'
    - growth=40/1000×100%=4%.
    answer: The population grew by 4% during the year.
    common_mistake: Use the starting population as the denominator.
  - id: carrying_m14_we03
    title: Approximate doubling time
    problem: A population grows at 2% per year. Estimate doubling time with the rule of 70.
    rule: Approximate doubling time=70/(percent annual growth rate).
    steps:
    - 'Set up the relationship: Approximate doubling time=70/(percent annual growth rate).'
    - doubling time≈70/2=35 years.
    answer: The estimated doubling time is 35 years at sustained growth.
    common_mistake: Use 2, not 0.02, in this percent-form rule.
  - id: carrying_m14_we04
    title: Population momentum
    problem: Fertility falls to replacement level, but many young people are about to enter reproductive ages. Must population stop growing immediately?
    rule: Population change also depends on age structure and the number entering reproductive ages.
    steps:
    - A large young cohort can produce many births even with fewer births per person.
    - Deaths may remain fewer than births for a time.
    answer: Population can continue growing through demographic momentum.
    common_mistake: Replacement fertility does not imply immediate zero population growth.
  - id: carrying_m14_we05
    title: Combine resident and visitor demand
    problem: There are 100 residents for 10 days and 20 visitors for 5 days, each using 2 resource units per person-day. Find total use.
    rule: Total use=sum of people×days×per-person daily use.
    steps:
    - 'Set up the relationship: Total use=sum of people×days×per-person daily use.'
    - use=100(10)(2)+20(5)(2)=2000+200=2200 units.
    answer: Total demand is 2200 units over the specified stays.
    common_mistake: A visitor count without length of stay does not determine cumulative demand.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Total fertility rate: average births per woman; about 2.1 replaces a population without migration.

Population momentum: continued growth from a large reproductive-age group.

Demographic transition: shift from high birth/death rates toward low rates.

Overshoot: demand beyond available biological capacity.

#### Primer concepts

- Age pyramids show growth, stability, or decline; Malthus contrasted geometric population with arithmetic food growth; developed populations often age with low total fertility rate (TFR).

#### Equations first needed today
**Equation:** population growth rate (PGR) = `(births-deaths)/population×100%`;

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** `PGR` population growth rate in percent per period; births and deaths are counts during that period; population is the starting population count.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

**Equation:** `doubling time=70/growth rate %`.

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** doubling time is measured in the same time unit used by growth rate; growth rate is the percent increase per time period.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

School age data unlock Harbour visitor counts; combined person-days unlock Common footprint. Lena distinguishes school survival from simple growth.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Island School | `register-desk` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 14: READ THE AGE STRUCTURE OPEN

**Dialogue bubbles -** Mara Voss: "Start with read the age structure. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `register-desk` in Island School.

**Beat 2 - After Stop 53 | `register-desk` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 53 result to settle calculate population growth."

**Unlocks/waypoint:** Unlock Stop 54 at `register-desk` in Island School.

**Beat 3 - After Stop 54 | `council-table` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 54 result to settle close the person-day balance."

**Unlocks/waypoint:** Unlock Stop 55 at `council-table` in Chapel Council Room.

**Beat 4 - After Stop 55 | `common-map` | automatic**

**World state:** Synthesis: Stop 55 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 55 result to settle stress the human-demand forecast."

**Unlocks/waypoint:** Unlock Stop 56 at `common-map` in Common Office.

**Beat 5 - At mission end | `register-desk` | automatic**

**World state:** Decision and hook: Stop 56 applies the world change, triggers the outcome, and names the next mission problem.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

School age data unlock Harbour visitor counts; combined person-days unlock Common footprint. Lena distinguishes school survival from simple growth.

## Characters and dramatic beat

School age data unlock Harbour visitor counts; combined person-days unlock Common footprint. Lena distinguishes school survival from simple growth.

## Key concepts, explained here

age pyramids show growth, stability, or decline; Malthus contrasted geometric population with arithmetic food growth; developed populations often age with low TFR.

## Stop 53 - Read the age structure

**Format/placement:** CHOICE, at `register-desk`.

**Metadata:** Concept: 13 - age structure | populations | D8 dose | RETRIEVE | L3 | evidence; Keystone: age structure | populations | D8 dose | RETRIEVE | L3 | evidence; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: age structure | populations | D8 dose | RETRIEVE | L3 | evidence.

**Call - exact player copy:** Go to the register desk, in Island School.

**Stop reason - exact player copy:** The cargo rules cover arrivals, but the demand forecast also needs the resident population's age pattern.

**Question card story setup - exact player copy:** The biosecurity rule counts arrivals, but permanent demand begins with residents already here. Shape the island age distribution before adding visitors.

**Question card story-science connection - exact player copy:** The age distribution indicates whether resident demand is associated with a growing, stable, or aging population.

**Question card prompt - exact player copy:** Plot age bins 0-14=28, 15-44=62, 45-64=91, and 65+=74 people; submit growing, stable, or declining

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Age group",
  "yLabel": "People",
  "caption": "Vellan's population by age group.",
  "bars": [
    {
      "name": "Age group 1",
      "value": 28
    },
    {
      "name": "Age group 2",
      "value": 62
    },
    {
      "name": "Age group 3",
      "value": 91
    },
    {
      "name": "Age group 4",
      "value": 74
    }
  ]
}
```


**Complete format-specific interaction block:** `cloud:{bins:[{age:"0-14",count:28},{age:"15-44",count:62},{age:"45-64",count:91},{age:"65+",count:74}],correct:declining,shape:top_heavy}`

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 53 - Read the age structure"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "Plot age bins 0-14=28, 15-44=62, 45-64=91, and 65+=74 people; submit growing, stable, or declining"
  payload: "`cloud:{bins:[{age:\"0-14\",count:28},{age:\"15-44\",count:62},{age:\"45-64\",count:91},{age:\"65+\",count:74}],correct:declining,shape:top_heavy}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```













**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Residents by age are 28 ages 0-14, 62 ages 15-44, 91 ages 45-64, and 74 ages 65 and older."
  choices:
    - {id: declining, label: "The narrow younger groups and larger older groups indicate a top-heavy, declining population.", correct: true}
    - {id: rapid, label: "The wide youngest group indicates rapid future growth.", correct: false}
    - {id: stable, label: "Nearly equal age groups indicate a stable population.", correct: false}
    - {id: migration_only, label: "The chart proves that migration alone caused the age pattern.", correct: false}
  answer: declining
  rebuttals:
    rapid: "The youngest group is the smallest, not the widest."
    stable: "The counts differ sharply and become much larger in older groups."
    migration_only: "Age structure shows the pattern, but without migration data it cannot prove one cause."
```

**Correct result:** The resident population is top-heavy and declining

**Answer text:** The completed check shows the resident population is top-heavy and declining.

**Why:** Read the age structure connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 54 - Calculate population growth

**Format/placement:** BALLPARK, at `register-desk`.

**Metadata:** Concept: 10 - population growth | populations | 14; Keystone: population growth | populations | 14; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: population growth | populations | 14.

**Call - exact player copy:** Go to the register desk, in Island School.

**Stop reason - exact player copy:** The age pattern needs confirmation from births and deaths before a growth forecast is used.

**Question card story setup - exact player copy:** The age structure suggests decline, yet births and deaths must test that reading. Calculate natural growth and interpret the Rule of 70.

**Question card story-science connection - exact player copy:** Natural population growth determines whether projecting a future doubling is meaningful for the island.

**Question card prompt - exact player copy:** Population growth rate is PGR=(births-deaths)/population*100. Using 3 births, 6 deaths, and 300 people, submit PGR in percent per year and decide whether the Rule of 70 doubling-time estimate, 70 divided by a positive growth rate, applies.

**Complete format-specific interaction block:** `estimate:{equation:"(3-6)/300*100",inputs:{births:3,deaths:6,population:300},truth:-1.0,unit:"percent/year",tolerance:0.1,interpretation:"halving, not doubling"}`

**Correct result:** Growth is -1.0%/year; a doubling time is not meaningful

**Answer text:** The completed check shows growth is -1.0%/year; a doubling time is not meaningful.

**Why:** Calculate population growth connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 55 - Close the person-day balance

**Format/placement:** BALANCE, at `council-table`.

**Metadata:** Concept: 22 - person-days | closed budgets | 14; Keystone: person-days | closed budgets | 14; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: person-days | closed budgets | 14.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** A declining resident count does not establish July demand once ferry visitors are included.

**Question card story setup - exact player copy:** Residents are declining, but ferry visitors can still raise seasonal demand. Convert everyone into person-days, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** Total person-days places residents and short-stay visitors on the same seasonal water-and-waste demand scale.

**Question card prompt - exact player copy:** Apply person-days=people*days using 250 residents × 30 days, 300 visitors/day × 8 current sailing days, and another 2,400 visitor-days for the second ferry; submit total

**Complete format-specific interaction block:** `balance:{streams:[{id:"residents",value:7500,unit:"person-days",counts:true},{id:"current_ferry_visitors",value:2400,unit:"person-days",counts:true},{id:"second_ferry_visitors",value:2400,unit:"person-days",counts:true},{id:"crew_already_in_resident_count",value:240,unit:"person-days",counts:false,reason:"duplicate population"}],equation:"250×30+300×8+2400",correct:12300,tolerance:1,answerText:"Demand is 12,300 person-days; ferry crew already counted as residents must not be added again."}`

**Correct result:** The second-ferry July case is 12,300 person-days

**Answer text:** The completed check shows the second-ferry July case is 12,300 person-days.

**Why:** Close the person-day balance connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 56 - Stress the human-demand forecast

**Format/placement:** STRESS, at `common-map`.

**Metadata:** Concept: 22 - footprint and demand | population and policy | 14; Keystone: footprint and demand | population and policy | 14; Area: Reef Station; Learning role: PRACTICE; Difficulty: L3; Story role: footprint and demand | population and policy | 14.

**Call - exact player copy:** Go to the common map, in Common Office.

**Stop reason - exact player copy:** The combined person-day estimate still needs testing against uncertain per-person resource use.

**Question card story setup - exact player copy:** The common ledger now includes 12,300 July person-days, not just resident head count. Stress per-person footprint and select the correct load definition.

**Question card story-science connection - exact player copy:** The footprint range determines how the visitor cap must depend on available water and waste capacity.

**Question card prompt - exact player copy:** Move footprint from 1.8 to 5 hectares/person; submit person-days for seasonal services, age structure for long-term school demand, and a visitor cap tied to water and waste triggers

**Complete format-specific interaction block:** `stress:{assumption:footprint_ha_person,range:[1.8,5.0],seasonal_unit:person_days,long_term_unit:age_structure,correct_plan:conditional_visitor_cap}`

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 56 - Stress the human-demand forecast"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Move footprint from 1.8 to 5 hectares/person; submit person-days for seasonal services, age structure for long-term school demand, and a visitor cap tied to water and waste triggers"
  payload: "`stress:{assumption:footprint_ha_person,range:[1.8,5.0],seasonal_unit:person_days,long_term_unit:age_structure,correct_plan:conditional_visitor_cap}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "ecological footprint", min: 1.8, max: 5, nominal: 3.4, step: 0.2, unit: "ha/person"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 3.4, max: 3.4}
      failsAt: 5
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 3.4, max: 5}
      failsAt: 1.8
    - id: robust_plan
      label: "Plan for 12,300 July person-days and condition the cap on water and waste"
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 1.8, max: 5}
  robust: robust_plan
  question: "Move footprint from 1.8 to 5 hectares/person; submit person-days for seasonal services, age structure for long-term school demand, and a visitor cap tied to water and waste triggers"
```

**Correct result:** Plan for 12,300 July person-days and condition the cap on water and waste

**Answer text:** The completed check shows plan for 12,300 July person-days and condition the cap on water and waste.

**Why:** Stress the human-demand forecast connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Use a lower visitor cap and a drought reserve. Count crew only once. The plan stays within the water limit. The last vote now needs an independent sample.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You kept your head when the evidence became difficult. The evidence now points to one clear action: Use a lower visitor cap and a drought reserve. The island's water, wildlife, and families are better protected.

**Story event - exact player copy:** The council lowers the visitor cap and reserves freshwater for drought.

target 14:00; forecast accepted, Evidence +5 lock; QA 100/95/100/89 after Trust11. Takeaway: age structure predicts long-term change, while person-days predict seasonal demand.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Population Outlook. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Population Outlook, the biosecurity rule counts arrivals, but permanent demand begins with residents already here. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies Total fertility rate?

**Options - exact player copy:**

- A. Continued growth from a large reproductive-age group.
- B. Average births per woman; about 2.1 replaces a population without migration.
- C. Shift from high birth/death rates toward low rates.
- D. Demand beyond available biological capacity.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Total fertility rate; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Population momentum, not Total fertility rate. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. average births per woman; about 2.1 replaces a population without migration.
- C: This describes Demographic transition, not Total fertility rate. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Overshoot, not Total fertility rate. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Population Outlook: the biosecurity rule counts arrivals, but permanent demand begins with residents already here. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies Population momentum?

**Options - exact player copy:**

- A. Average births per woman; about 2.1 replaces a population without migration.
- B. Shift from high birth/death rates toward low rates.
- C. Continued growth from a large reproductive-age group.
- D. Demand beyond available biological capacity.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Population momentum; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Total fertility rate, not Population momentum. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Demographic transition, not Population momentum. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. continued growth from a large reproductive-age group.
- D: This describes Overshoot, not Population momentum. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Population Outlook using new evidence: the biosecurity rule counts arrivals, but permanent demand begins with residents already here. The next action depends on selecting the conclusion that fits all of those facts. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Transition stage",
  "yLabel": "Rate per 1,000 people",
  "caption": "Birth rates fall after death rates during a demographic transition.",
  "series": [
    {
      "name": "Birth rate",
      "points": [
        [
          1,
          40
        ],
        [
          2,
          38
        ],
        [
          3,
          26
        ],
        [
          4,
          14
        ]
      ]
    },
    {
      "name": "Death rate",
      "points": [
        [
          1,
          38
        ],
        [
          2,
          20
        ],
        [
          3,
          12
        ],
        [
          4,
          10
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Average births per woman; about 2.1 replaces a population without migration.
- B. Continued growth from a large reproductive-age group.
- C. Demand beyond available biological capacity.
- D. Shift from high birth/death rates toward low rates.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Total fertility rate, not Demographic transition. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Population momentum, not Demographic transition. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Overshoot, not Demographic transition. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. shift from high birth/death rates toward low rates.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Population Outlook: the biosecurity rule counts arrivals, but permanent demand begins with residents already here. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies Overshoot?

**Options - exact player copy:**

- A. Demand beyond available biological capacity.
- B. Average births per woman; about 2.1 replaces a population without migration.
- C. Continued growth from a large reproductive-age group.
- D. Shift from high birth/death rates toward low rates.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Overshoot; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. demand beyond available biological capacity.
- B: This describes Total fertility rate, not Overshoot. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Population momentum, not Overshoot. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Demographic transition, not Overshoot. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Population Outlook decision, the team knows this: the biosecurity rule counts arrivals, but permanent demand begins with residents already here. The next action depends on selecting the conclusion that fits all of those facts. Which environmental-science conclusion correctly applies age structure | populations | D8 dose | RETRIEVE | L3 | evidence?

**Options - exact player copy:**

- A. Average births per woman; about 2.1 replaces a population without migration.
- B. Read the age structure connects the measured environmental mechanism to the next island condition.
- C. Continued growth from a large reproductive-age group.
- D. Shift from high birth/death rates toward low rates.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for age structure | populations | D8 dose | RETRIEVE | L3 | evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Total fertility rate, not age structure | populations | D8 dose | RETRIEVE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. read the age structure connects the measured environmental mechanism to the next island condition.
- C: This describes Population momentum, not age structure | populations | D8 dose | RETRIEVE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Demographic transition, not age structure | populations | D8 dose | RETRIEVE | L3 | evidence. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Population Outlook to this follow-up: the age structure suggests decline, yet births and deaths must test that reading. Which environmental-science conclusion correctly applies population growth | populations | 14?

**Options - exact player copy:**

- A. Average births per woman; about 2.1 replaces a population without migration.
- B. Continued growth from a large reproductive-age group.
- C. Calculate population growth connects the measured environmental mechanism to the next island condition.
- D. Shift from high birth/death rates toward low rates.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for population growth | populations | 14; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Total fertility rate, not population growth | populations | 14. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Population momentum, not population growth | populations | 14. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. calculate population growth connects the measured environmental mechanism to the next island condition.
- D: This describes Demographic transition, not population growth | populations | 14. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# Mission 15 - The Conditional Ferry Recommendation

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** VOTE DAY.

**Card title:** THE CONDITIONAL FERRY RECOMMENDATION

**Go now:** Common Office, Mara Voss at the delivery board.

**Card body:** A second ferry looks possible today, but drought, extreme heat, rising seas, and power failures could occur together. Test whether the plan still protects water, wildlife, and residents when conditions worsen. Approve it, attach enforceable conditions, or reject it based on what the island can sustain.

**Objective:** Deliver and enact the Second-Ferry Plan.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 15: worked examples'
  optional: true
  graded: false
  examples:
  - id: carrying_m15_we01
    title: Mitigation versus adaptation
    problem: Compare reducing fossil-fuel use with raising a flood-prone building. Classify the actions.
    rule: Mitigation reduces drivers of future climate change; adaptation reduces harm from its effects.
    steps:
    - 'Reducing fossil-fuel use can lower greenhouse-gas emissions: mitigation.'
    - 'Raising the building reduces exposure to floodwater: adaptation.'
    answer: The actions serve different purposes and can be combined.
    common_mistake: An adaptation measure does not necessarily reduce emissions.
  - id: carrying_m15_we02
    title: Withdrawals versus replenishment
    problem: A groundwater store gains 100 units/year and withdrawals are 120 units/year, with other flows balanced. Find the annual stock change.
    rule: Stock change=recharge-withdrawal.
    steps:
    - 'Set up the relationship: Stock change=recharge-withdrawal.'
    - Δstock=100-120=-20 units/year.
    answer: The stock shrinks by 20 units each year under these assumptions.
    common_mistake: Stable delivery can conceal depletion of stored water.
  - id: carrying_m15_we03
    title: Concentration and pollutant load
    problem: A stream flows at 10 L/s with pollutant concentration 2 mg/L. Find pollutant load.
    rule: Mass load=volume flow×concentration.
    steps:
    - 'Set up the relationship: Mass load=volume flow×concentration.'
    - load=10 L/s×2 mg/L=20 mg/s.
    answer: The stream carries 20 mg of pollutant each second.
    common_mistake: Concentration alone does not state total pollutant transport.
  - id: carrying_m15_we04
    title: Use a stated warming factor
    problem: For this exercise, a gas has warming factor 20 kg CO2-equivalent per kg over a specified time horizon. Find the equivalent of 3 kg.
    rule: CO2-equivalent mass=gas mass×the stated horizon-specific factor.
    steps:
    - 'Set up the relationship: CO2-equivalent mass=gas mass×the stated horizon-specific factor.'
    - equivalent=3(20)=60 kg CO2-equivalent.
    answer: The equivalent is 60 kg for the supplied factor and horizon.
    common_mistake: The factor must have a stated time horizon; it is not a universal timeless value.
  - id: carrying_m15_we05
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Radiative forcing: change in Earth's energy balance in W/m².

Mitigation: reducing causes of environmental change.

Adaptation: reducing harm from impacts.

Tipping point: threshold beyond which feedback drives further change.

#### Primer concepts

- The greenhouse effect makes Earth habitable; added carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O) enhance warming; preindustrial CO2 was about 280 parts per million versus about 422 parts per million in 2024; warming is about 1.1 C and sea level rise about 21 cm; mitigation and adaptation must work together.

#### Equations first needed today
**Equation:** `resource margin=sustainable supply-current demand`; `pollutant load=flow×concentration`; `PGR=(births-deaths)/population×100%`

**What it is for:** Apply this relationship to the mission decision.

**Symbols:** resource margin, sustainable supply, and current demand use the same resource unit; pollutant load is mass per time; flow is volume per time; concentration is mass per volume; `PGR` is population growth rate in percent per period.

**Why this campaign needs it:** It converts the island evidence into a defensible operating limit.

## Main story happening - designer summary

Common stress test sends exact minimum water condition to Waterworks; passing independent sample unlocks Chapel. Every major character contributes one constraint by short radio bubble. Final outcome begins immediately after Stop 4 with council board changing to “CONDITIONAL APPROVAL.”

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Common Office | `delivery-board` | automatic**

**World state:** Arrival: The named specialist identifies the immediate obstruction; Continue.

**Panel/HUD text:** MISSION 15: MATCH CLIMATE MECHANISMS OPEN

**Dialogue bubbles -** Mara Voss: "Start with match climate mechanisms. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `delivery-board` in Common Office.

**Beat 2 - After Stop 57 | `delivery-board` | automatic**

**World state:** First result: The result remains on its equipment panel and.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Mara Voss: "Nice work. Use the Stop 57 result to settle collapse the final degeneracy."

**Unlocks/waypoint:** Unlock Stop 58 at `delivery-board` in Common Office.

**Beat 3 - After Stop 58 | `sampler` | automatic**

**World state:** Evidence-led travel: The second result names and activates the next destination; required dialogue pauses the timer.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Mara Voss: "Good thinking. Use the Stop 58 result to settle verify the independent water sample."

**Unlocks/waypoint:** Unlock Stop 59 at `sampler` in Waterworks.

**Beat 4 - After Stop 59 | `council-table` | automatic**

**World state:** Synthesis: Stop 59 changes the persistent board and unlocks the decision stop.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Mara Voss: "Exactly right. Use the Stop 59 result to settle enact the ferry triggers."

**Unlocks/waypoint:** Unlock Stop 60 at `council-table` in Chapel Council Room.

**Beat 5 - At mission end | `delivery-board` | automatic**

**World state:** Final outcome begins immediately after Stop 4 with council board changing to.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "Outstanding work. You solved the mission. CONDITIONAL APPROVAL."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

Common stress test sends exact minimum water condition to Waterworks; passing independent sample unlocks Chapel. Every major character contributes one constraint by short radio bubble. Final outcome begins immediately after Stop 4 with council board changing to “CONDITIONAL APPROVAL.”

## Characters and dramatic beat

Common stress test sends exact minimum water condition to Waterworks; passing independent sample unlocks Chapel. Every major character contributes one constraint by short radio bubble. Final outcome begins immediately after Stop 4 with council board changing to “CONDITIONAL APPROVAL.”

## Key concepts, explained here

greenhouse effect makes Earth habitable; added CO2, CH4, and N2O enhance warming; preindustrial CO2 about 280 ppm versus about 422 ppm in 2024; warming about 1.1 C and sea level about 21 cm; mitigation and adaptation must work together.

## Stop 57 - Match climate mechanisms

**Format/placement:** CASEBOOK, at `delivery-board`.

**Metadata:** Concept: 31 - global change | climate | D10-D12 | RETRIEVE | L4 | synthesis; Keystone: global change | climate | D10-D12 | RETRIEVE | L4 | synthesis; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: global change | climate | D10-D12 | RETRIEVE | L4 | synthesis.

**Call - exact player copy:** Go to the delivery board, in Common Office.

**Stop reason - exact player copy:** The current ledgers close, but climate changes can alter several resource limits simultaneously.

**Question card story setup - exact player copy:** The current plan balances all four ledgers, but climate effects alter several at once. Match each observation to mechanism and response before the final stress test.

**Question card story-science connection - exact player copy:** The mechanism-response matches identify which climate effects require changes to the island's resource safeguards.

**Question card prompt - exact player copy:** Map warming to the enhanced greenhouse effect, sea rise to thermal expansion and ice melt, shell loss to acidification, declining ocean oxygen to warming, ice loss to albedo feedback, and chlorofluorocarbon (CFC) ozone loss to chlorine radicals and the Montreal Protocol.

**Complete format-specific interaction block:** `casebook:{mapping:{warming:enhanced_greenhouse,sea_level_rise:thermal_expansion_and_ice_melt,shell_loss:ocean_acidification,low_ocean_oxygen:warming,ice_loss:albedo_feedback,CFC_ozone_loss:chlorine_radicals_and_Montreal_Protocol}}`

**Correct result:** All six climate mechanisms and responses are correctly linked

**Answer text:** The completed check shows all six climate mechanisms and responses are correctly linked.

**Why:** Match climate mechanisms connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:**; and CFC ozone loss to chlorine radicals and Montreal Protocol. Payload: `casebook:{mapping:{warming:enhanced_greenhouse,sea_level_rise:thermal_expansion_and_ice_melt,shell_loss:ocean_acidification,low_ocean_oxygen:warming,ice_loss:albedo_feedback,CFC_ozone_loss:chlorine_radicals_and_Montreal_Protocol}}`

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 58 - Collapse the final degeneracy

**Format/placement:** DEGENERACY, at `delivery-board`.

**Metadata:** Concept: 11 - coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis; Keystone: coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis.

**Call - exact player copy:** Go to the delivery board, in Common Office.

**Stop reason - exact player copy:** The climate review leaves multiple visitor-cap and reserve pairs that fit today's water supply.

**Question card story setup - exact player copy:** Climate pathways are identified, yet visitor cap and drought reserve trade off while matching today’s water total. Apply the dry-year constraint to collapse the pair.

**Question card story-science connection - exact player copy:** The dry-year constraint identifies which cap-reserve pair remains feasible when recharge falls.

**Question card prompt - exact player copy:** Use the two controls `visitor cap` and `drought reserve`: adjust visitor cap from 0 to 340 visitors/day in steps of 20 and reserve from 0% to 30% in steps of 5%. Submit the numerical pair satisfying annual withdrawal at or below 136,800 m3/year during a 15% drought before plan choices unlock.

**Complete format-specific interaction block:** `degeneracy:{controls:[{id:visitor_cap,label:"visitors/day",min:0,max:340,step:20},{id:drought_reserve,label:"reserve percent",min:0,max:30,step:5}],locus_today:[[120,30],[160,25],[200,20],[240,15],[280,10],[320,5]],locus_drought:[[160,25],[200,20],[240,15]],constraint:"annual withdrawal <=136800 m3/year during 15% drought",truth:[200,20],tolerance:[10,2.5],required_submission:"numerical pair before plan unlock"}`

**Correct result:** Submit (200 visitors/day, 20% reserve)

**Answer text:** The completed check shows submit (200 visitors/day, 20% reserve).

**Why:** Collapse the final degeneracy connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 59 - Verify the independent water sample

**Format/placement:** VERIFY, at `sampler`.

**Metadata:** Concept: 34 - final water check | causality and evidence | D2,D4,D8 | TRANSFER | L5 | verification; Keystone: final water check | causality and evidence | D2,D4,D8 | TRANSFER | L5 | verification; Area: Waterworks; Learning role: PRACTICE; Difficulty: L3; Story role: final water check | causality and evidence | D2,D4,D8 | TRANSFER | L5 | verification.

**Call - exact player copy:** Go to the independent sampler, in Waterworks.

**Stop reason - exact player copy:** The selected visitor cap needs an independent water check before the council can approve it.

**Question card story setup - exact player copy:** The dry-year constraint leaves a 200-visitor cap with 20% reserve. Verify final quantity and quality with an independent sample, and the team needs this result before it acts, and this result will guide the next safe decision.

**Question card story-science connection - exact player copy:** The remaining water margin and measured nitrate and chloride determine whether the cap meets both quantity and quality conditions.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT margin=136800-132000 in m3/year; OPERATE the sampler with pump and time fixed; MEASURE nitrate and chloride; INTERPRET PASS only below 10.0 and 250 mg/L; no restoration

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_commit,operate,measure,interpret],operate_unlocked_when:prediction_committed,prediction:{equation:"margin=ceiling-withdrawal",inputs:{ceiling:136800,withdrawal:132000},unit:"m3/year",truth:4800,tolerance:100},operate:{control:independent_sampler,fixed:[pump_state,sampling_time]},measure:{nitrate:{value:6.4,unit:"mg/L"},chloride:{value:118,unit:"mg/L"}},interpret:{correct:PASS,criteria:["nitrate <10.0 mg/L","chloride <250 mg/L"]},restore:{required:false,reason:"sampling changes no control"}}`

**Correct result:** Margin 4800 m3/year, nitrate 6.4 mg/L, chloride 118 mg/L: PASS

**Answer text:** The completed check shows margin 4800 m3/year, nitrate 6.4 mg/L, chloride 118 mg/L: PASS.

**Why:** Verify the independent water sample connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Stop 60 - Enact the ferry triggers

**Format/placement:** TRIGGER, at `council-table`.

**Metadata:** Concept: 18 - final policy | policy | all keystones | TRANSFER | L5 | payoff; Keystone: final policy | policy | all keystones | TRANSFER | L5 | payoff; Area: Chapel Council Room; Learning role: PRACTICE; Difficulty: L3; Story role: final policy | policy | all keystones | TRANSFER | L5 | payoff.

**Call - exact player copy:** Go to the council table, in Chapel Council Room.

**Stop reason - exact player copy:** The independent water check passes, so the council can now turn the plan into enforceable conditions.

**Question card story setup - exact player copy:** Independent water evidence passes, so the plan can be written as enforceable conditions rather than promises. Commit every threshold before the vote opens.

**Question card story-science connection - exact player copy:** The complete trigger set determines whether the second sailing has approval that can be withdrawn when resource safeguards fail.

**Question card prompt - exact player copy:** Use the locked mission record to build one conditional ferry approval covering water withdrawal, aquifer head, nitrate, chloride, fish catch, power reserve, inspections, and drought visitors. Assign each approved trigger and require an owner, monitor, and response for every condition.

**Complete format-specific interaction block:** `trigger:{conditions:[{withdrawal_max:136800},{head_stop_lte:1.0},{nitrate_action_gte:10.0},{chloride_lt:250},{catch_normal:100},{catch_low_recruit:70},{reserve_gte_kW:15},{inspection:every_sailing},{drought_visitor_cap:200}],decision_rule:"approve only when every condition has owner, monitor, trigger, response",correct:conditional_approve}`

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 60 - Enact the ferry triggers"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Use the locked mission record to build one conditional ferry approval covering water withdrawal, aquifer head, nitrate, chloride, fish catch, power reserve, inspections, and drought visitors. Assign each approved trigger and require an owner, monitor, and response for every condition."
  payload: "`trigger:{conditions:[{withdrawal_max:136800},{head_stop_lte:1.0},{nitrate_action_gte:10.0},{chloride_lt:250},{catch_normal:100},{catch_low_recruit:70},{reserve_gte_kW:15},{inspection:every_sailing},{drought_visitor_cap:200}],decision_rule:\"approve only when every condition has owner, monitor, trigger, response\",correct:conditional_approve}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "aquifer head", min: 0, max: 3, step: 0.1, unit: "m"}
  start: 0.6
  anchors:
    - {at: 0.6, means: "routine baseline, not the decision threshold"}
    - {at: 1.95, means: "elevated evidence requiring attention"}
  direction: falling
  updates:
    - {at: "T-48 h", value: 1.4, hoursLeft: 48}
    - {at: "T-24 h", value: 1.2, hoursLeft: 24}
    - {at: "T-12 h", value: 1.0, hoursLeft: 12}
    - {at: "T-6 h", value: 0.8, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 1.01, max: 3}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 0, max: 1}, leadHours: 12}
  question: "Submit one conditional approval containing withdrawal <=136800 m3/year, pumping stop at head <=1.0 m, nitrate action at >=10.0 mg/L, chloride <250 mg/L, catch 100 or 70 in low recruitment, reserve >=15 kW, inspection every sailing, and drought visitor cap 200/day"
```

**Correct result:** Conditional approval with all eight enforceable safeguards

**Answer text:** The completed check shows conditional approval with all eight enforceable safeguards.

**Why:** Enact the ferry triggers connects the measured environmental mechanism to the next island condition.

**Wrong-path feedback:** The retry identifies the first incorrect mechanism, unit, unsupported claim, omitted requirement, or violated constraint.

**State/output:** Keep the result visible, record it in the mission log, and unlock the next authored stop.

## Mission outcome

Mission decision: Approve the second ferry only with firm limits. Cut trips when any safety trigger fails. The plan cuts air and water waste. It also plans for drought, heat, and sea rise. The council adopts the plan.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Exceptional work. You brought the campaign to a decisive conclusion: Approve the second ferry only with firm limits. The ferry decision is now grounded in what Vellan can actually sustain.

**Story event - exact player copy:** The council approves the second ferry only while every environmental limit remains satisfied.

target 18:00; conditions enacted, Water +5 lock; QA 100/100/100/100 after Trust11 and lock. Victory gate checks every scientific threshold. No further graded task. **Takeaway:** carrying capacity is a conditional systems limit, not one permanent population number.

The screen also shows `TIME {elapsed} / TARGET`, `INCORRECT SUBMISSIONS {incorrect_submissions}`, `RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions)`, the allocation prompt, lock result, and zero-bar failure check.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Conditional Ferry Recommendation. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Conditional Ferry Recommendation, the current plan balances all four ledgers, but climate effects alter several at once. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies Radiative forcing?

**Options - exact player copy:**

- A. Reducing causes of environmental change.
- B. Change in Earth's energy balance in W/m².
- C. Reducing harm from impacts.
- D. Threshold beyond which feedback drives further change.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Radiative forcing; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Mitigation, not Radiative forcing. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. change in Earth's energy balance in W/m².
- C: This describes Adaptation, not Radiative forcing. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Tipping point, not Radiative forcing. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 2

**Prompt - exact player copy:** the island council receives a second case related to The Conditional Ferry Recommendation: the current plan balances all four ledgers, but climate effects alter several at once. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies Mitigation?

**Options - exact player copy:**

- A. Change in Earth's energy balance in W/m².
- B. Reducing harm from impacts.
- C. Reducing causes of environmental change.
- D. Threshold beyond which feedback drives further change.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Mitigation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Radiative forcing, not Mitigation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Adaptation, not Mitigation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. reducing causes of environmental change.
- D: This describes Tipping point, not Mitigation. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Conditional Ferry Recommendation using new evidence: the current plan balances all four ledgers, but climate effects alter several at once. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies Adaptation?

**Options - exact player copy:**

- A. Change in Earth's energy balance in W/m².
- B. Reducing causes of environmental change.
- C. Threshold beyond which feedback drives further change.
- D. Reducing harm from impacts.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Adaptation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Radiative forcing, not Adaptation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Mitigation, not Adaptation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Tipping point, not Adaptation. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: Correct. reducing harm from impacts.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Conditional Ferry Recommendation: the current plan balances all four ledgers, but climate effects alter several at once. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies Tipping point?

**Options - exact player copy:**

- A. Threshold beyond which feedback drives further change.
- B. Change in Earth's energy balance in W/m².
- C. Reducing causes of environmental change.
- D. Reducing harm from impacts.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Tipping point; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. threshold beyond which feedback drives further change.
- B: This describes Radiative forcing, not Tipping point. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: This describes Mitigation, not Tipping point. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Adaptation, not Tipping point. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 5

**Prompt - exact player copy:** Before another Conditional Ferry Recommendation decision, the team knows this: the current plan balances all four ledgers, but climate effects alter several at once. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which environmental-science conclusion correctly applies global change | climate | D10-D12 | RETRIEVE | L4 | synthesis?

**Options - exact player copy:**

- A. Change in Earth's energy balance in W/m².
- B. Match climate mechanisms connects the measured environmental mechanism to the next island condition.
- C. Reducing causes of environmental change.
- D. Reducing harm from impacts.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for global change | climate | D10-D12 | RETRIEVE | L4 | synthesis; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Radiative forcing, not global change | climate | D10-D12 | RETRIEVE | L4 | synthesis. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: Correct. match climate mechanisms connects the measured environmental mechanism to the next island condition.
- C: This describes Mitigation, not global change | climate | D10-D12 | RETRIEVE | L4 | synthesis. It does not account for the quantities, conditions, or evidence in this environmental science case.
- D: This describes Adaptation, not global change | climate | D10-D12 | RETRIEVE | L4 | synthesis. It does not account for the quantities, conditions, or evidence in this environmental science case.
### Review question 6

**Prompt - exact player copy:** the island council applies the lesson from The Conditional Ferry Recommendation to this follow-up: climate pathways are identified, yet visitor cap and drought reserve trade off while matching today’s water total. Add the missing constraint now so the team can separate the explanations that still fit the earlier evidence. Which environmental-science conclusion correctly applies coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis?

**Options - exact player copy:**

- A. Change in Earth's energy balance in W/m².
- B. Reducing causes of environmental change.
- C. Collapse the final degeneracy connects the measured environmental mechanism to the next island condition.
- D. Reducing harm from impacts.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Radiative forcing, not coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis. It does not account for the quantities, conditions, or evidence in this environmental science case.
- B: This describes Mitigation, not coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis. It does not account for the quantities, conditions, or evidence in this environmental science case.
- C: Correct. collapse the final degeneracy connects the measured environmental mechanism to the next island condition.
- D: This describes Adaptation, not coupled capacity | uncertainty | all keystones | COMBINE | L5 | crisis. It does not account for the quantities, conditions, or evidence in this environmental science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Re-read the mechanism established by the four stops.
- Re-use the governing equation or causal comparison with units.
- **Mission takeaway:** Record the enforceable environmental condition in the mission log.

# 9. Mission-at-a-glance production map

### Mission 1

- Briefing: Draw the boundary begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 1-4 - Draw the boundary; Match the cycles; Separate matter from energy; Find the shared omission.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 2

- Briefing: Route one year of rain begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 5-8 - Route one year of rain; Convert depth to volume; Freeze the estimate; Set the ceiling.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 3

- Briefing: Count usable plant energy begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 9-12 - Count usable plant energy; Read recovery and habitat; Classify vulnerability; Test the fertilizer claim.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 4

- Briefing: Read the ground begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 13-16 - Read the ground; Probe the salt front; Diagnose the early warning; Write the aquifer trigger.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 5

- Briefing: Measure catch per unit effort begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 17-20 - Measure catch per unit effort; Read the survivorship curves; Verify logistic recovery; Fund an enforceable ceiling.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 6

- Briefing: Audit the landing claim begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 21-24 - Audit the landing claim; Buy compliance evidence; Match land-use practices; Fund the commons package.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 7

- Briefing: Trace the hidden exports begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 25-28 - Trace the hidden exports; Build the treatment chain; Close the water balance; Choose the repair priority.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 8

- Briefing: Probe the nitrate network begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 29-32 - Probe the nitrate network; Compare child and adult dose; Verify the garden source; Set the school action level.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 9

- Briefing: Sort the mixed waste begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 33-36 - Sort the mixed waste; Map source and fate; Control the compost process; Fund source controls.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 10

- Briefing: Read the patterned residuals begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 37-40 - Read the patterned residuals; Control heat and nutrients; Map acidification damage; Stress the catch ceiling.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 11

- Briefing: Close the peak-power ledger begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 41-44 - Close the peak-power ledger; Calculate capacity factor; Match pollutants and controls; Fund the energy portfolio.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 12

- Briefing: Audit the gearbox schedule begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 45-48 - Audit the gearbox schedule; Verify methane capture; Diagnose the engine-room alarm; Allocate firm power.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 13

- Briefing: Screen the arriving cargo begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 49-52 - Screen the arriving cargo; Test survey recovery; Control the rinse treatment; Write the biosecurity protocol.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 14

- Briefing: Read the age structure begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 53-56 - Read the age structure; Calculate population growth; Close the person-day balance; Stress the human-demand forecast.
- Outcome: the fourth stop commits the condition and updates the delivery board.

### Mission 15

- Briefing: Match climate mechanisms begins the day’s evidence chain.
- Route: the mission chapter names each fixture and evidence-triggered move.
- Stops: 57-60 - Match climate mechanisms; Collapse the final degeneracy; Verify the independent water sample; Enact the ferry triggers.
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
  metric_screen: {target: "MM:SS", event: "named event", automatic_delta: {}, rp_formula: "trigger score=clamp(4,12,11+modifier-errors)", allocation: "authored", lock: "authored", failure: "snapshot restore"}
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


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `COMMON` roster owner: Mara Voss.
- `POWER` roster owner: Mara Voss.
- `TIP` roster owner: Mara Voss.
- `WATER` roster owner: Mara Voss.

- Warm-up title: `CHECK ALL 7 PLACED AREAS`; seven area items are placed and the title now matches the run.

### Warm-up run cast replacement

All six warm-up run variants must use only this shipped cast: Nkemdi Okafor at Waterworks, Iona Vale at the Common, Rafi Noor at the Reef, Mei Chen at the Tip, Lena Costa at the School, Elias Shaw at the Turbine Yard, and Ada Pell at the Chapel. Remove every legacy-cast reference from each find/follow/catch line; `Nkemdi` means Nkemdi Okafor, not a separate person.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
