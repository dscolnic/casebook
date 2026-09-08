**FIRST PERSON LEARNING**

**CHANGEOVER**

AP Macroeconomics Campaign Implementation Bible

**15 missions | 60 graded stops | Halvern | Implementation-ready**

**REVISION 10.2 - COMPACT GLOSSARY, BUILDABLE PANELS, AND ACTION-CLARITY VALIDATION**

## AP Macroeconomics Campaign Implementation Bible

**Project:** First Person Learning

**World:** Kesteven House and the Halvern national currency changeover

**Player role:** Chief Economist, Halvern Currency Board

**Campaign size:** 15 missions, 60 graded stops, one final signed Rate Book

**Audience:** AP Macroeconomics students

**Primary implementation target:** `books/changeover.yml` plus existing Changeover theme assets

**Status:** Buildable implementation specification; all 60 stops carry player copy, grading truth, answer text, and interaction data

> *The design test: if the macroeconomics is removed, the currency crisis cannot be solved. If the story is removed, the student still completes a cumulative AP Macroeconomics review in which early measurements become tools for later policy decisions.*

## 1. One-page implementation brief

Halvern will replace four old crowns with roughly one new RATE in fifteen days. A street-price surge makes officials suspect profiteering and pushes the finance minister toward a sharp rate increase, but the player discovers three coupled causes: 4.00 rounding in a badly weighted basket, a temporary imported-energy shock, and bridge borrowing that crowds out investment and exports. The final defensible policy keeps the legal conversion at **4.15 crowns per RATE**, sets the policy rate at **3.25%**, buys bonds only when the precommitted joint output-and-payment trigger fires, and publishes price and reserve safeguards.

The story is linear at the evidence level. Wrong answers teach, retry, and permit progress; they do not remove AP coverage or create dead branches. Player decisions change dialogue, trust, and visible policy annotations while the clue order remains stable.

### Non-negotiable engine rules

- Import with `node tools/import-book.mjs books/changeover.yml changeover --verify` once the repository is available.
- Every lesson has one canonical format and one typed challenge.
- Decision formats sit at people, calculations at desks/boards, and operated formats at the named fixture.
- Every setup is exactly two short sentences totaling 30–45 words in executable content; this bible preserves the authored two-sentence setup wherever supplied.
- Every CHOICE has four distinct items, the correct label verbatim, and a separate rebuttal for each wrong item; slash-separated choice bundles are forbidden.
- Every numerical task exposes inputs, constants, units, equation, requested answer unit/type, truth, and tolerance at the stop itself.
- VERIFY locks equipment until the numerical prediction is committed. CONTROL names changed and fixed variables, measurement timing, restoration, and final submission. DEGENERACY requires a numerical pair for two named controls.
- Keep the opener to five sentences. Each mission briefing body is four sentences and sentence four begins “By the end of the mission”.
- Grade by authored answer logic, never prose similarity. Do not claim runtime validation until the importer and playthrough pass.

## 2. Campaign promise, clock, and player experience

### Opening sequence - no movie required, maximum five sentences

Kesteven House holds Halvern's Currency Board, four floors above the crowds waiting to exchange old crowns for the new RATE. In fifteen days, you must use macroeconomics to switch shops, banks, wages, and foreign payments without cutting what families can buy. If the conversion or interest policy is wrong, prices may jump, jobs may vanish, or banks may run short of cash. Board Chair Mara Venn hands you the empty Rate Book and says, “Fifteen days from now, every family in Halvern must wake to wages, savings, prices, and payments they can trust: build the changeover that gets them there.”

**Delivery:** Show all four sentences together on one full-screen text card over the normal Kesteven House view. Continue reveals the four-bar HUD and Mission 1 briefing.

### Concrete stakes

Every wage, price, bank balance, and foreign payment must convert on the same day. A wrong ratio quietly cuts buying power; a mistimed reserve shipment can stop payments; an unnecessary rate hike can deepen unemployment; an unconditional stimulus can prolong inflation and crowd out investment. The player protects households by signing a rule whose numbers and reversal conditions agree across independent evidence.

### Three major reversals

1. **Twist 1 - The profiteers who were not:** the broad surge is largely a 4.00 shortcut plus an imported-energy supply shock, not economy-wide demand pressure.
2. **Twist 2 - Inflation that does not justify permanent tightening:** holdout prices normalize toward the 2% quantity-theory path while recession risk remains real.
3. **Twist 3 - Ready does not mean shock-proof:** the 4.15 rehearsal passes, then an overnight fuel disruption requires temporary first-week cover and precommitted triggers.

### Four campaign metrics and recovery economy

| Metric | Start | Meaning | Lock |
|---|---:|---|---|
| Conversion Readiness | 40% | Systems, contracts, notes, and Rate Book pages are ready | Locks after M14 |
| Price Continuity | 60% | Ordinary buying power survives conversion | Locks after M15 |
| Operating Reserve | 70% | Staff, cash, and intervention capacity remain | Finale only |
| Public Trust | 60% | Published rules and evidence are believed | Locks after M15 |

### Timer and Recovery Points

`RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`. The time modifier is +1 at or before target, 0 through 125% of target, and −2 beyond 125%. One RP raises one unlocked bar by one percentage point; bank cap 30. Required dialogue, loading, app backgrounding, accessibility menus, and system interruptions pause the timer.

### Resolution order, locks, and failure

After the outcome beat, apply the mission's automatic deltas, check for a 0% bar, award RP, open allocation, show concept review, then issue the next briefing. A 0% bar restores the mission-start snapshot. Victory requires 100/100/100/100, conversion 4.15, policy rate 3.25%, and the committed trigger rule.

## 3. World and location plan

Kesteven House turns the economy into a walkable causal model: household exchange and physical notes below, measurement and banks in the middle, trade above them, and policy at the top. Travel follows evidence rather than filling time.

| ID | Place | Story/economics function | Signature fixture |
|---|---|---|---|
| COUNTER | Exchange Counter | Households, queues, labor notices, opportunity cost | queue board and wage notices |
| NOTES | Note Hall | Physical conversion, cash returns, custody | note scale and conversion trays |
| PRICES | Statistics Floor | GDP, CPI, labor, AD-AS, price history | output ledger and basket table |
| BANKS | Bank Supervision | Balance sheets, reserves, money market | reserve clock and bond panel |
| TRADE | Open-Economy Floor | Payments, forex, imports, exports | payment wires and forex console |
| RATE | Rate Room | Fiscal/monetary decisions and signed Rate Book | policy wall and signing desk |

### Areas of study and complete fixture declaration

Every `Area:` value below is the exact name of a place marked `yes`. A stop may still be asked at a fixture in a different place.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Exchange Counter | no | `queue-board` | board | Queue lengths, failed payments, and the chalk marks Eli refuses to erase. |
| Exchange Counter | no | `allocation-slate` | board | A day’s scarce counter hours divided among cash, wages, and household claims. |
| Exchange Counter | no | `wage-notice-rail` | rack | Current wage cards, labor notices, and the definitions clerks reach for during an argument. |
| Exchange Counter | no | `live-economy-panel` | board | The latest output, unemployment, inflation, and payment readings under one stubborn clock. |
| Exchange Counter | no | `conversion-desk` | bench | The Rate Book lies open beside the conversion seal and the last unsigned page. |
| Note Hall | no | `note-scale` | vessel | A brass balance for old notes, new crowns, and sacks that never arrive at the weight claimed. |
| Note Hall | no | `conversion-trays` | rack | Numbered trays holding returned notes, issued crowns, and the custody slips between them. |
| Note Hall | no | `custody-desk` | bench | A scarred desk with sack tallies, counterfoils, and two keys held by different clerks. |
| Note Hall | no | `return-chute` | vessel | The locked mouth where retired notes drop into custody one sealed bundle at a time. |
| Statistics Floor | yes | `output-ledger` | board | Production accounts, exclusions, and the expenditure columns that must close to one total. |
| Statistics Floor | yes | `calculating-desk` | bench | Pencils, adding machines, and worksheets crowded with multipliers and output gaps. |
| Statistics Floor | yes | `basket-table` | bench | The fixed household basket, its price tags, and the replacement list families keep disputing. |
| Statistics Floor | yes | `ad-as-wall` | board | Aggregate-demand and aggregate-supply tracks with today’s shocks pinned in red. |
| Statistics Floor | yes | `price-history-board` | board | Index levels, inflation prints, and every revision preserved beside the original release. |
| Bank Supervision | yes | `reserve-clock` | board | Required and actual reserves advance on separate hands; excess appears only when both settle. |
| Bank Supervision | yes | `balance-sheet-desk` | bench | Deposits, loans, securities, and reserves arranged so no bank can hide the other side. |
| Bank Supervision | yes | `bond-panel` | board | Bond prices and interest rates move on linked rails in opposite directions. |
| Bank Supervision | yes | `money-market-console` | vessel | Money supply, money demand, and the clearing rate glow above the supervision switches. |
| Open-Economy Floor | yes | `payment-wires` | board | Current- and financial-account entries run along paired wires toward the same balance. |
| Open-Economy Floor | yes | `forex-console` | vessel | Demand and supply for RATE move the exchange marker while import and export tickets update. |
| Open-Economy Floor | yes | `trade-ledger` | bench | Exports, imports, income flows, and transfers wait in columns that must net correctly. |
| Open-Economy Floor | yes | `shipment-board` | board | Outbound orders and landed imports share a board with the currency price each contract used. |
| Rate Room | yes | `policy-wall` | board | Fiscal and monetary levers are posted beside the channels each one is expected to move. |
| Rate Room | yes | `signing-desk` | bench | The Rate Book, the Board seal, and a blank line that Mara will not sign without conditions. |
| Rate Room | yes | `gap-calculator` | vessel | Actual and full-employment output feed a brass dial marked recessionary and inflationary. |
| Rate Room | yes | `threshold-rail` | rack | Output, payment, and CPI trigger cards lock into place before any policy order can fire. |
| Rate Room | yes | `forecast-table` | bench | Domestic, banking, trade, and long-run forecasts overlap beneath a sheet of tracing glass. |

#### Exchange Counter fixture-to-stop map

| Fixture | Stop numbers asked here |
| --- | --- |
| `queue-board` | 1, 3, 14, 41 |
| `allocation-slate` | 2, 15, 44 |
| `wage-notice-rail` | 4, 13, 16 |
| `live-economy-panel` | 57 |
| `conversion-desk` | 60 |

### Location escalation

Missions 1–4 use one meaningful room; Missions 5–10 use two linked rooms; Missions 11–15 use three linked rooms. A destination unlocks only when the prior evidence makes it necessary.

## 4. Character bible

### Mara Venn - Board Chair and mission authority

**Wants:** A credible on-time conversion. **Blind spot:** Equates decisiveness with a high rate. **Gameplay use:** Forces policy commitments and asks, “What would make us reverse?” **Arc:** Learns that a defensible rule includes conditions for changing course.

### Eli Voss - NOTES counter operations lead

**Division:** `NOTES`.

**Wants:** Keep families moving. **Blind spot:** Treats every queue as a cash shortage. **Gameplay use:** Scarcity, labor definitions, conversion operations. **Arc:** Learns to separate visible congestion from national monetary evidence.

### Idris Pell - PRICES national accounts chief

**Division:** `PRICES`.

**Wants:** Publish defensible output data. **Blind spot:** Trusts aggregates before composition. **Gameplay use:** GDP, output gaps, growth, and ledger closure. **Arc:** Moves from exact totals to transparent scope and dependency.

### Lina Saye - price statistics lead

**Wants:** Protect the basket's integrity. **Blind spot:** Defends fixed weights too long. **Gameplay use:** CPI, inflation, basket bias, and holdout evidence. **Arc:** Preserves history while publishing a representative companion measure.

### Tomas Arendt - BANKS bank supervision lead

**Division:** `BANKS`.

**Wants:** Prevent a bank run. **Blind spot:** Focuses on maximum lending rather than willing lending. **Gameplay use:** Money aggregates, bank creation, reserves, bonds, and rates. **Arc:** Learns that capacity, timing, and behavior are separate constraints.

### Nia Corren - TRADE open-economy analyst

**Division:** `TRADE`.

**Wants:** Keep payments and trade clearing. **Blind spot:** Initially treats appreciation as strength alone. **Gameplay use:** Balance of payments, forex, and net exports. **Arc:** Makes the financing benefit and export cost visible together.

### Rhea Dane - finance minister

**Wants:** Show control before launch. **Blind spot:** Underweights lags and crowding out. **Gameplay use:** Fiscal multipliers, stabilizers, policy allocation. **Arc:** Replaces an announcement-first plan with a smaller conditional bridge.

### Soren Vale - OPENEC export council liaison

**Division:** `OPENEC`.

**Wants:** Protect orders and jobs. **Blind spot:** Treats depreciation as costless. **Gameplay use:** Supplies exporter consequences and tests one-sided currency claims. **Arc:** Accepts a stable conversion with targeted first-week cover.

## 5. Character direction and dialogue rules

- Introduce competence through visible work before biography.
- Characters may be wrong about explanations, not fabricated facts in their specialty.
- Wrong-answer responses name the failed mechanism and invite a retry; they never ridicule.
- Essential dialogue uses persistent bubbles with Continue, never timed disappearance.
- No character speaks more than about 90 words without player inspection, movement, or response.
- Color never carries a result alone; every state also uses text or an icon.

### Non-cinematic beat presentation contract

Keep the normal playable view. Use nearby bubbles in-room and radio bubbles across rooms. Required bubbles pause the timer. Equipment results remain visible until the next stop, and the mission log copies every conclusion and waypoint. Sound, lighting, and animation reinforce but never carry essential information.

## 6. Macroeconomics spine and recurring concepts

1. Scarcity, opportunity cost, PPC, and supply-demand equilibrium.
2. GDP categories, nominal versus real GDP, and the GDP deflator.
3. Labor-force definitions, unemployment types, natural rate, and output gaps.
4. CPI, inflation, index bias, and real versus nominal values.
5. MPC/MPS, spending and tax multipliers, automatic stabilizers, and fiscal gaps.
6. Aggregate demand, SRAS/LRAS, adjustment, growth, and policy lags.
7. Money functions and aggregates, bank balance sheets, reserves, and money creation.
8. Money market, bond prices, Fisher equation, and monetary transmission.
9. Phillips curves, quantity theory, neutrality, and inflation expectations.
10. Loanable funds, deficits, private investment, and crowding out.
11. Balance of payments, foreign exchange, appreciation, and net exports.

Difficulty advances from recognition and procedures in M1–M4, through application and synthesis in M5–M10, to constrained policy decisions in M11–M15. The campaign uses exactly 20 DERIVE stops because the AP course requires students to reconstruct identities and causal chains, not merely recognize them.

### Keystone retrieval compliance ledger

GDP/real output: introduce M2; retrieve M4; combine M6/M10; transfer M15. Inflation/real values: introduce M3; retrieve M8; combine M10/M12; transfer M15. Labor/output gaps: introduce M4; retrieve M6/M10; combine M11; transfer M15. AD/multipliers: introduce M5; retrieve M6/M10; combine M11/M13; transfer M15. Money/banking: introduce M7; retrieve M9; combine M12; transfer M15. Interest markets: introduce M8; retrieve M9/M12; combine M13/M14; transfer M15. Open economy: introduce M9; retrieve M12; combine M13/M14; transfer M15. Evidence integrity begins M1/M3, returns M6/M11/M14, and governs M15.

## 7. Clue ledger

### M1 → M6/M12: 4.00 shortcut stickers

**Objective observation:** West-side vendors use 4.00 rather than legal 4.15. **Initial meaning:** Profiteering. **True meaning:** Rounding raises RATE prices 3.75% and contaminates shared tables. **Concept:** relative prices, CPI composition, evidence dependency.

### M1 → M7/M12: heavy note-return sacks

**Objective observation:** Physical cash returns quickly. **Initial meaning:** Money supply collapse. **True meaning:** Cash migrates into deposits while M1 need not fall equally. **Concept:** money aggregates and bank balance sheets.

### M2 → M4/M10: nominal sales rise while freight is flat

**Objective observation:** Money sales increase without output volume. **Initial meaning:** Strong recovery. **True meaning:** A price effect masks flat real output. **Concept:** GDP deflator and output gap.

### M3 → M6/M14: port energy wire

**Objective observation:** Imported energy rises 18%. **Initial meaning:** Minor supplier issue. **True meaning:** Temporary adverse SRAS shock. **Concept:** AD-AS and Phillips curves.

### M5 → M10/M13: bond subscriptions surge

**Objective observation:** Government bonds attract funds. **Initial meaning:** Confidence only. **True meaning:** Deficit demand raises real rates and crowds out investment. **Concept:** loanable funds.

### M9 → M13/M14: RATE asset orders

**Objective observation:** Foreign buyers demand RATE assets. **Initial meaning:** Strong currency is all good. **True meaning:** Capital inflow balances the current deficit but appreciation reduces NX. **Concept:** forex and balance of payments.

### M11 → M14/M15: six-week wage contracts

**Objective observation:** Wage reset follows conversion by weeks. **Initial meaning:** Self-correction is sufficient. **True meaning:** Long-run adjustment misses the five-day deadline. **Concept:** sticky wages and policy lag.

## 8. Mission content contract

Every mission below supplies a briefing promise, compact glossary, primer, equations, designer summary, implementable beat script, route, character beat, concepts, four globally numbered stops, outcome, metric settlement, and review. A mission outcome begins with “Mission decision:” and directly answers sentence four of its briefing. Later missions retrieve earlier tools rather than repeat isolated definitions.

### Revision 10.2 presentation and validation cleanup

Glossary entries use compact `Term: definition` lines. Equation entries contain equation, purpose, symbols, and campaign reason without “Also called” or “Concept” lines. PROBE, CHOICE, VERIFY, CONTROL, DEGENERACY, and all numerical formats must pass the action-clarity and payload audit in Section 12 before handoff. This campaign intentionally uses no PROBE or DEGENERACY stops; it does not relabel another interaction to evade those requirements.


# Mission 1 - What Counts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 15 DAYS TO CHANGEOVER

**Card title:** What Counts

**Go now:** Go to COUNTER and meet Eli Voss, counter operations lead, at the queue board.

**Card body:** People are lining up to exchange Halvern's old money, and officials fear a national shortage. A crowded square alone cannot tell them what is wrong. Use macroeconomics to compare the evidence and the staffing choices, then decide what the currency board can honestly conclude.

**Objective:** Separate useful economic measures from alarming but incomplete signals.

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
  - id: changeover_m01_we01
    title: Measure an opportunity cost
    problem: A worker can make 8 tables or 16 chairs in a day at constant tradeoffs. Find the opportunity cost of one table.
    rule: Opportunity cost = units of the best alternative forgone / units gained.
    steps:
    - 'Set up the relationship: Opportunity cost = units of the best alternative forgone / units gained.'
    - cost per table=16 chairs/8 tables=2 chairs per table.
    answer: One table costs two forgone chairs.
    common_mistake: Opportunity cost is not the sum of both possible outputs.
  - id: changeover_m01_we02
    title: Interpret unused resources
    problem: An economy can produce either 10 units of food and 10 tools, or more food without reducing tools. Is the first point on its production frontier?
    rule: 'A frontier point is productively efficient: more of one output requires less of another.'
    steps:
    - More food is possible with tools unchanged.
    - The first point therefore leaves some productive capacity unused.
    answer: It lies inside the production possibilities frontier.
    common_mistake: Being inside the frontier does not by itself mean technology is worse.
  - id: changeover_m01_we03
    title: Recognize rising opportunity cost
    problem: Moving along a production possibilities curve gains 2 machines first at a cost of 1 crop unit, then gains 2 more at a cost of 3 crop units. What changes?
    rule: Compare forgone output per extra unit gained.
    steps:
    - first cost=1/2=0.5 crop unit per machine.
    - second cost=3/2=1.5 crop units per machine.
    answer: Opportunity cost rises as machine output expands.
    common_mistake: A constant gain in machines need not have a constant cost.
  - id: changeover_m01_we04
    title: Find market equilibrium
    problem: Demand is Qd=20-2P and supply is Qs=4+2P. Find equilibrium price P and quantity Q.
    rule: Equilibrium requires quantity demanded equal quantity supplied.
    steps:
    - 'Set up the relationship: Equilibrium requires quantity demanded equal quantity supplied.'
    - 20-2P=4+2P gives 16=4P, so P=4; Q=20-2(4)=12.
    answer: Equilibrium is price 4 and quantity 12.
    common_mistake: Set the two quantities equal; do not add them.
  - id: changeover_m01_we05
    title: Predict a supply decrease
    problem: Production costs rise while consumer demand is unchanged. What happens to competitive equilibrium?
    rule: Higher production costs shift supply left, other things equal.
    steps:
    - At the old price, sellers supply less, creating a shortage.
    - The new intersection has a higher price and lower quantity.
    answer: Price rises and equilibrium quantity falls.
    common_mistake: A price rise caused by supply is not evidence that demand increased.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Scarcity: limited resources cannot satisfy every want, so every choice gives up an alternative.

Opportunity cost: the value of the best alternative given up.

Equilibrium: the price and quantity where planned buying equals planned selling.

#### Primer concepts

- Price changes move along supply or demand; other causes shift a curve.

#### Equations first needed today
No new numerical equation is needed; use the opportunity-cost and supply-demand relationships shown on the boards.

## Main story happening - designer summary

Eli is rationing counter windows while Lina's first price marks appear outside. Stop 1 separates symptoms from measures; Stop 2 exposes the staff tradeoff; Stop 3 reconstructs a market shift; Stop 4 selects the dated evidence. The one-location route is COUNTER; the window makes the queue visible. Eli wants more cashiers and assumes the line proves a cash shortage. Scarcity governs the staffing tradeoff, opportunity cost records the bank-call capacity given up, and supply-demand reasoning distinguishes a price rise caused by demand from one caused by reduced supply.

**Beat script:** Arrival - nearby bubble, timer paused: Eli: “I can open exchange windows or answer bank calls, not both. Tell me what this line proves.” After S2, the allocation slate records the bank calls given up. After S3, `×4.00` stickers remain visible outside. Final bubble: “The line is real. Its cause is not settled.” Unlock Rate Book page 1.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Exchange Counter | `queue-board` | automatic**

**World state:** Arrival | COUNTER | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Separate useful economic measures from alarming but incomplete signals.` Eli Voss points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Separate useful economic measures from alarming but incomplete signals.

**Dialogue bubbles -** Eli Voss: "Start with signal or statistic. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 1 at `queue-board` in Exchange Counter.

**Beat 2 - After Stop 1 | `allocation-slate` | automatic**

**World state:** The signal or statistic result remains visible while the counter tradeoff fixture lights.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. Count the nationwide transactions, date them, and state coverage."

**Unlocks/waypoint:** Unlock Stop 2 at `allocation-slate` in COUNTER.

**Beat 3 - After Stop 2 | `queue-board` | automatic**

**World state:** The counter tradeoff result remains visible while the why did the street price rise? fixture lights.

**Panel/HUD text:** COUNTER

**Dialogue bubbles -** Eli Voss: "Good thinking. Forty extra exchanges cost forty bank calls: one call per exchange."

**Unlocks/waypoint:** Unlock Stop 3 at `queue-board` in COUNTER.

**Beat 4 - After Stop 3 | `wage-notice-rail` | automatic**

**World state:** The why did the street price rise? result remains visible while the page one standard fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Use the Stop 3 result to settle page one standard."

**Unlocks/waypoint:** Unlock Stop 4 at `wage-notice-rail` in COUNTER.

**Beat 5 - At mission end | `queue-board` | automatic**

**World state:** Mission outcome and hook | COUNTER | automatic World state and dialogue:   Feedback: A conclusion is not backed because it sounds urgent; State: Page 1 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Outstanding work. You solved the mission. We can shorten the line, but I will stop calling it a national shortage."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Eli is rationing counter windows while Lina's first price marks appear outside. Stop 1 separates symptoms from measures; Stop 2 exposes the staff tradeoff; Stop 3 reconstructs a market shift; Stop 4 selects the dated evidence. The one-location route is COUNTER; the window makes the queue visible. Eli wants more cashiers and assumes the line proves a cash shortage. Scarcity governs the staffing tradeoff, opportunity cost records the bank-call capacity given up, and supply-demand reasoning distinguishes a price rise caused by demand from one caused by reduced supply.

**Beat script:** Arrival - nearby bubble, timer paused: Eli: “I can open exchange windows or answer bank calls, not both. Tell me what this line proves.” After S2, the allocation slate records the bank calls given up. After S3, `×4.00` stickers remain visible outside. Final bubble: “The line is real. Its cause is not settled.” Unlock Rate Book page 1.

## Key concepts, explained here

**Objective:** Separate useful economic measures from alarming but incomplete signals. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 1 - Signal or statistic

**Format/placement:** CHOICE, asked by Eli Voss beside `queue-board`.

**Metadata:** Concept: 32 - evidence quality; Keystone: Evidence/index integrity; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L1; Story role: clue.

**Call - exact player copy:** Talk to Eli Voss, at the queue board in Exchange Counter.

**Stop reason - exact player copy:** The growing plaza queue is being mistaken for evidence about the whole country.

**Question card story setup - exact player copy:** The queue has doubled since dawn, yet completed exchanges per cashier are unchanged. Choose the observation that can support a national claim before the board treats one crowded plaza as the whole economy.

**Question card story-science connection - exact player copy:** Dated nationwide counts establish which claims about exchange activity the board can responsibly make.

**Question card prompt - exact player copy:** Select one submitted conclusion from the four distinct choices below.

1. Queue length.
2. Loudest complaint.
3. Nationwide transaction count with date and coverage. **(correct)**
4. One vendor's price.

**Choices:**

1. Queue length.

2. Loudest complaint.

3. Nationwide transaction count with date and coverage. **(correct)**

4. One vendor's price.

**Complete format-specific interaction block:** `choices:[{id:A,label:"Queue length"},{id:B,label:"Loudest complaint"},{id:C,label:"Nationwide transaction count with date and coverage"},{id:D,label:"One vendor's price"}]; answer:C; rebuttals:{A:"A line can reflect staffing rather than national scarcity.",B:"Complaint volume does not measure national prevalence.",D:"One vendor price is not a national price index."}`

**Correct result:** C. “Count the nationwide transactions, date them, and state coverage.”

**Answer text:** The completed check shows c. “Count the nationwide transactions, date them, and state coverage.”.

**Why:** Aggregates require defined populations and timing.

**Wrong-path feedback:** (1) **Queue length:** One queue is a local observation, not a defined national statistic. (2) **Loudest complaint:** Salience supplies neither a population nor a reproducible measure. (4) **One vendor's price:** A single seller cannot represent nationwide transaction volume or coverage.

**State/output:** Page 1 gains “dated coverage”; unlock S2.

## Stop 2 - Counter tradeoff

**Format/placement:** DERIVE, at `allocation-slate`.

**Metadata:** Concept: 1 - scarcity/opportunity cost; Keystone: scarcity; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the allocation slate, in Exchange Counter.

**Stop reason - exact player copy:** Opening more exchange windows now would take clerks away from bank support.

**Question card story setup - exact player copy:** With the evidence standard set, Eli can move four clerks from bank calls to exchange windows. Build the opportunity-cost statement before changing the roster, so the board records both added service and the lost alternative.

**Question card story-science connection - exact player copy:** The opportunity cost tells the board how many bank calls it gives up for each additional exchange.

**Question card prompt - exact player copy:** Submit the opportunity cost of 40 extra exchanges.

**Complete format-specific interaction block:** `derive:{left_side:"Δexchanges",lines:["Δexchanges=160−120=40","Δcalls=40−80=−40","OC=−Δcalls/Δexchanges=−(−40)/40=1 bank call per extra exchange"],licenses:["difference","foregone alternative","unit rate"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Δexchanges=160+120=280`
2. `Δcalls=80−40=+40`
3. `OC=Δcalls/Δexchanges=−40/40=−1 bank call per extra exchange`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["With the evidence standard set, Eli can move four clerks from bank calls to exchange windows.", "Baseline output is 120 exchanges and 80 bank calls per hour; after transfer it is 160 and 40."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Counter tradeoff in the form and units requested by the prompt"
  left_side: "Δexchanges"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Δexchanges=160−120=40", correct: true}
        - {text: "Δexchanges=160+120=280", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Δcalls=40−80=−40", correct: true}
        - {text: "Δcalls=80−40=+40", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "OC=−Δcalls/Δexchanges=−(−40)/40=1 bank call per extra exchange", correct: true}
        - {text: "OC=Δcalls/Δexchanges=−40/40=−1 bank call per extra exchange", correct: false, survives: true, reason: "This reports the negative slope of the tradeoff instead of the positive amount of bank-call capacity sacrificed."}
```

**Correct result:** 40 calls total, or 1 call per extra exchange. `tolerance:0`.

**Answer text:** Forty extra exchanges cost forty bank calls: one call per exchange.

**Why:** A staffing choice is not free merely because no money changes hands.

**Wrong-path feedback:** Staff time, not cash, is scarce.

**State/output:** roster plan posted; unlock S3.

## Stop 3 - Why did the street price rise?

**Format/placement:** DIAGNOSIS, at `queue-board`.

**Metadata:** Concept: 4 - supply-demand shifts; Keystone: equilibrium; Area: Rate Room; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the queue board, in Exchange Counter.

**Stop reason - exact player copy:** Extra windows have a staffing cost, so the cause of the street-price rise needs checking first.

**Question card story setup - exact player copy:** Because extra windows cost bank support, the board must know whether the line comes from buying pressure or reduced supply. Read the street panel and select the one shift that fits every active and quiet reading.

**Question card story-science connection - exact player copy:** Identifying the supply or demand shift determines whether more exchange capacity addresses the actual problem.

**Question card prompt - exact player copy:** Select one diagnosis.

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity",
  "yLabel": "Price level",
  "caption": "The supply curve shifts left while demand stays fixed.",
  "series": [
    {
      "name": "Demand",
      "points": [
        [
          20,
          90
        ],
        [
          40,
          70
        ],
        [
          60,
          50
        ],
        [
          80,
          30
        ]
      ]
    },
    {
      "name": "Supply before",
      "points": [
        [
          20,
          30
        ],
        [
          40,
          50
        ],
        [
          60,
          70
        ],
        [
          80,
          90
        ]
      ]
    },
    {
      "name": "Supply after",
      "points": [
        [
          10,
          40
        ],
        [
          30,
          60
        ],
        [
          50,
          80
        ],
        [
          70,
          100
        ]
      ]
    }
  ]
}
```


**Complete format-specific interaction block:** `diagnosis:{headline:"Price up, quantity down",readings:[{zone:"price",value:"+6%"},{zone:"quantity",value:"−9%"},{zone:"income",value:"unchanged"},{zone:"delivery",value:"late"}],choices:[{id:"D_right",mechanism:"demand rises: P↑ Q↑"},{id:"S_left",mechanism:"supply falls: P↑ Q↓"},{id:"D_left",mechanism:"demand falls: P↓ Q↓"},{id:"ceiling",mechanism:"binding ceiling lowers legal P"}],answer:"S_left"}`

**Correct result:** Supply shifted left.

**Answer text:** The completed check shows supply shifted left.

**Why:** The cause of a higher equilibrium price determines whether more demand or less supply should be investigated.

**Wrong-path feedback:** A demand increase cannot explain falling quantity.

**State/output:** port delivery clue logged; unlock S4.

## Stop 4 - Page one standard

**Format/placement:** ATTEST, asked by Eli Voss beside `wage-notice-rail`.

**Metadata:** Concept: 32 - measurement/claims; Keystone: Evidence integrity; Area: Rate Room; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Eli Voss, at the wage-notice rail in Exchange Counter.

**Stop reason - exact player copy:** The street diagnosis is ready, but the first official record still contains an unsupported shortage claim.

**Question card story setup - exact player copy:** The supply diagnosis explains today's street pattern but still does not justify a national shortage claim. Verify the records that identify dated quantities, coverage, and tradeoffs, then reject any claim resting only on the plaza crowd.

**Question card story-science connection - exact player copy:** Verification separates measured transactions and staffing costs from conclusions the plaza crowd cannot establish.

**Question card prompt - exact player copy:** Spend three verification marks; submit the three backed claims and reject the unbacked conclusion.

**Complete format-specific interaction block:** `attest:{limit:3,claims:[{id:"national_tx",backed:true,critical:true},{id:"staff_tradeoff",backed:true},{id:"price_quantity",backed:true},{id:"cash_shortage",backed:false,critical:true}],correct_verified:["national_tx","staff_tradeoff","price_quantity"],reject:["cash_shortage"]}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Page one standard", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Record dated national transactions, the staffing cost, and the price-quantity pattern; do not claim a cash shortage.

**Why:** The first page must preserve what is known without turning an incomplete clue into policy.

**Wrong-path feedback:** A conclusion is not backed because it sounds urgent.

**State/output:** Page 1 signed.

## Mission outcome

Mission decision: Use the national count, not the loudest queue. Real output is 700 billion RATE. Prices rose 2.5%. The board now needs the production gap.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Excellent judgment. You made the right call: Use the national count, not the loudest queue. Halvern's families are closer to a currency changeover they can trust.

**Header:** MISSION 1 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The evidence rule improves readiness, but the crowd hears that a shortage claim was rejected.

**Automatic bar change:** READINESS +3; TRUST −2

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 45/56/68/59; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed What Counts. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Production possibilities curve (PPC):** a graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- A bowed PPC shows rising opportunity cost; a straight PPC shows constant cost.
- A point inside a PPC means resources are underused; better resources, technology, or productivity shift it outward.

### Review question 1

**Prompt - exact player copy:** Halvern can move five clerks from bank calls to exchange windows. Exchanges rise from 100 to 150 per hour while bank calls fall from 90 to 40. What is the opportunity cost of each additional exchange?

**Options - exact player copy:**

- A. 0.5 bank call
- B. 1 bank call
- C. 1.5 bank calls
- D. 2 bank calls

**Correct answer:** B

**Hint - exact player copy:** Divide the 50 bank calls given up by the 50 additional exchanges produced.

**Option feedback - exact player copy:**

- A: This divides one change by twice the actual exchange gain; both output changes are 50.
- B: The counter gives up 50 bank calls to gain 50 exchanges, so the opportunity cost is 1 call per exchange.
- C: This treats the original bank-call level as the amount sacrificed instead of using the change.
- D: This doubles the sacrifice even though the two output changes have equal magnitude.

### Review question 2

**Prompt - exact player copy:** A second Halvern market reports an 8% price increase, a 10% quantity decrease, unchanged household income, and delayed deliveries. Which change best explains the pattern?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity",
  "yLabel": "Price",
  "caption": "Demand is unchanged while supply shifts left.",
  "series": [
    {
      "name": "Demand",
      "points": [
        [
          20,
          90
        ],
        [
          40,
          70
        ],
        [
          60,
          50
        ],
        [
          80,
          30
        ]
      ]
    },
    {
      "name": "Supply before",
      "points": [
        [
          20,
          30
        ],
        [
          40,
          50
        ],
        [
          60,
          70
        ],
        [
          80,
          90
        ]
      ]
    },
    {
      "name": "Supply after",
      "points": [
        [
          10,
          40
        ],
        [
          30,
          60
        ],
        [
          50,
          80
        ],
        [
          70,
          100
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. Demand shifts right.
- B. Demand shifts left.
- C. Supply shifts right.
- D. Supply shifts left.

**Correct answer:** D

**Hint - exact player copy:** Look for the shift that raises equilibrium price while lowering equilibrium quantity.

**Option feedback - exact player copy:**

- A: Greater demand raises both price and quantity, so it cannot explain the lower quantity.
- B: Lower demand reduces both price and quantity, so it cannot explain the higher price.
- C: Greater supply lowers price and raises quantity, the opposite of both reported changes.
- D: Reduced supply raises equilibrium price and lowers equilibrium quantity, matching both observations.

### Review question 3

**Prompt - exact player copy:** The Exchange Counter is processing fewer customers today. Which evidence would best support a claim that the slowdown affects Halvern nationally?

**Options - exact player copy:**

- A. The longest queue photographed in the capital
- B. The loudest complaint recorded at one counter
- C. Dated transaction counts from a defined nationwide set of counters
- D. One shopkeeper's estimate of lost sales

**Correct answer:** C

**Hint - exact player copy:** A national conclusion needs a defined population, broad coverage, and a stated time period.

**Option feedback - exact player copy:**

- A: One unusually long queue is a local extreme and does not establish national coverage.
- B: Complaint volume measures salience rather than the prevalence of a national slowdown.
- C: Dated counts from a defined nationwide set provide the scope and timing required for the claim.
- D: One estimate lacks both representative coverage and a reproducible national measure.

### Review question 4

**Prompt - exact player copy:** A production possibilities curve for exchange service and bank support is bowed outward. What does its changing slope show as more exchange service is produced?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Exchange service",
  "yLabel": "Bank support",
  "caption": "A bowed production possibilities curve.",
  "series": [
    {
      "name": "PPC",
      "points": [
        [
          0,
          100
        ],
        [
          20,
          97
        ],
        [
          40,
          90
        ],
        [
          60,
          76
        ],
        [
          80,
          52
        ],
        [
          100,
          0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Opportunity cost decreases.
- B. Opportunity cost remains constant.
- C. Opportunity cost increases.
- D. Scarcity disappears.

**Correct answer:** C

**Hint - exact player copy:** Follow how many bank-support calls must be sacrificed for each additional group of exchanges.

**Option feedback - exact player copy:**

- A: Decreasing opportunity cost would make the frontier flatten as exchange production rises.
- B: Constant opportunity cost is represented by a straight frontier with an unchanging slope.
- C: A bowed frontier becomes steeper, so successive exchange gains sacrifice more bank support.
- D: The frontier exists because resources remain scarce; its curvature does not remove scarcity.

### Review question 5

**Prompt - exact player copy:** Halvern is producing at a point inside its production possibilities curve for exchange service and bank support. What is the best interpretation?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Exchange service",
  "yLabel": "Bank support",
  "caption": "The current production point lies inside the production possibilities curve.",
  "series": [
    {
      "name": "PPC",
      "points": [
        [
          0,
          100
        ],
        [
          20,
          97
        ],
        [
          40,
          90
        ],
        [
          60,
          76
        ],
        [
          80,
          52
        ],
        [
          100,
          0
        ]
      ]
    },
    {
      "name": "Current production",
      "points": [
        [
          50,
          55
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. The combination is currently unattainable.
- B. Some available resources or productive capacity are underused.
- C. The economy has achieved maximum efficiency.
- D. Opportunity cost must be constant.

**Correct answer:** B

**Hint - exact player copy:** Compare the interior point with the maximum feasible combinations on the frontier.

**Option feedback - exact player copy:**

- A: Unattainable combinations lie outside the current frontier, not inside it.
- B: An interior point is feasible but inefficient because the same resources could produce more of at least one service.
- C: Productive efficiency requires a point on the frontier rather than inside it.
- D: Constant opportunity cost concerns the frontier's shape, not whether a point lies inside it.

### Review question 6

**Prompt - exact player copy:** Halvern installs software that lets the same clerks process more exchanges and more bank calls per hour. How should the production possibilities curve change?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Exchange service",
  "yLabel": "Bank support",
  "caption": "Higher productivity shifts the production possibilities curve outward.",
  "series": [
    {
      "name": "PPC",
      "points": [
        [
          0,
          100
        ],
        [
          20,
          97
        ],
        [
          40,
          90
        ],
        [
          60,
          76
        ],
        [
          80,
          52
        ],
        [
          100,
          0
        ]
      ]
    },
    {
      "name": "After productivity gain",
      "points": [
        [
          0,
          120
        ],
        [
          24,
          116
        ],
        [
          48,
          108
        ],
        [
          72,
          91
        ],
        [
          96,
          62
        ],
        [
          120,
          0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. It shifts outward because productive capacity increased.
- B. It shifts inward because opportunity cost exists.
- C. The economy moves to an interior point on the old curve.
- D. The curve stays fixed and only its labels change.

**Correct answer:** A

**Hint - exact player copy:** Ask whether the maximum attainable combinations changed or whether the economy merely chose a different existing combination.

**Option feedback - exact player copy:**

- A: Better productivity increases attainable output combinations, so the frontier shifts outward.
- B: Opportunity cost does not by itself reduce productive capacity or shift the frontier inward.
- C: An interior point represents underuse of existing capacity, not an improvement in maximum capacity.
- D: Because both maximum outputs can rise, the frontier itself must change.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 2 - Growth On Paper

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 14 DAYS TO CHANGEOVER

**Card title:** Growth on Paper

**Go now:** Go to PRICES and meet Idris Pell, national accounts chief, at the output ledger.

**Card body:** A new report says Halvern's economy is growing, but higher sales totals may simply mean higher prices. Check which purchases count as new production and separate price changes from changes in output. Decide which national production figure the currency board should publish.

**Objective:** Build GDP correctly and separate nominal growth from real growth.

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
  - id: changeover_m02_we01
    title: Add final expenditures
    problem: An economy has consumption C=60, investment I=20, government purchases G=15, exports X=10 and imports M=5, all in billions. Find GDP.
    rule: Gross domestic product GDP=C+I+G+(X-M).
    steps:
    - 'Set up the relationship: Gross domestic product GDP=C+I+G+(X-M).'
    - net exports=10-5=5; GDP=60+20+15+5=100 billion.
    answer: GDP is 100 billion.
    common_mistake: Imports are subtracted to remove foreign production already included in spending.
  - id: changeover_m02_we02
    title: Keep transfers out of production
    problem: The government pays $100 in benefits; the recipient buys a newly produced $100 domestic service. How much enters GDP?
    rule: Transfers are not payment for current production; final service purchases are.
    steps:
    - The benefit payment itself adds no production to GDP.
    - The service purchase contributes $100 as consumption.
    answer: Count $100 once, not $200.
    common_mistake: A transfer and the spending it finances are not two separate outputs.
  - id: changeover_m02_we03
    title: Remove the price effect
    problem: Nominal GDP is 120 billion and the GDP deflator is 120, with base year 100. Find real GDP.
    rule: Real GDP=nominal GDP×100/deflator.
    steps:
    - 'Set up the relationship: Real GDP=nominal GDP×100/deflator.'
    - real GDP=120×100/120=100 billion in base-year prices.
    answer: Real output is 100 billion at base-year prices.
    common_mistake: Dividing by 120 without the factor 100 misuses the index scale.
  - id: changeover_m02_we04
    title: Find the GDP deflator
    problem: Nominal GDP is 150 billion and real GDP is 125 billion. Find the deflator.
    rule: GDP deflator=nominal GDP/real GDP×100.
    steps:
    - 'Set up the relationship: GDP deflator=nominal GDP/real GDP×100.'
    - deflator=150/125×100=120.
    answer: The index is 120, meaning prices are 20% above the base-year level for this output measure.
    common_mistake: An index of 120 does not mean 120% inflation.
  - id: changeover_m02_we05
    title: Calculate real growth
    problem: Real output rises from 100 to 105 billion. Find the growth rate.
    rule: Growth rate=(new-old)/old×100%.
    steps:
    - 'Set up the relationship: Growth rate=(new-old)/old×100%.'
    - growth=(105-100)/100×100%=5%.
    answer: Real output grew 5%.
    common_mistake: Use the old value as the denominator.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Gross domestic product (GDP): the market value of final goods and services produced inside a country during a stated period.

Consumption: household spending on goods and services.

Investment: business capital, inventory change, and new housing, not stock purchases.

Net exports (NX): exports minus imports.

#### Primer concepts

- Transfers are not government purchases; intermediate goods are excluded to avoid double counting; real GDP removes price changes.

#### Equations first needed today
**Equation:** `GDP = C + I + G + NX`

**What it is for:** Add final spending.

**Symbols:** C is consumption; I is investment; G is government purchases; NX is net exports, meaning exports minus imports.

**Why this campaign needs it:** The board must identify which reported transactions are domestic final output.

**Equation:** `GDP deflator = nominal GDP / real GDP × 100`

**What it is for:** Separate prices from production.

**Symbols:** `nominal GDP` domestic output valued at current prices; `real GDP` the same output valued at base-year prices; `GDP deflator` the price index comparing those two output values, with base year 100. GDP means gross domestic product.

**Why this campaign needs it:** A conversion can raise listed money values without creating goods.

## Main story happening - designer summary

Idris has a nominal ledger that includes transfers and securities. The one-location PRICES route uses S1 classification, S2 identity, S3 deflator, and S4 reconciliation. Arrival: Idris, national accounts chief: “The total is exact. The contents may not be.” After S2 the invalid rows turn gray with text labels. Final panel stamps REAL. GDP measures production; the expenditure identity sorts demand components; real GDP answers whether output changed.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at PRICES | `output-ledger` | automatic**

**World state:** Arrival | PRICES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Build GDP correctly and separate nominal growth from real growth.` Idris Pell points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Build GDP correctly and separate nominal growth from real growth.

**Dialogue bubbles -** Idris Pell: "Start with classify the ledger. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `output-ledger` in PRICES.

**Beat 2 - After Stop 5 | `calculating-desk` | automatic**

**World state:** The classify the ledger result remains visible while the close the output identity fixture lights.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Idris Pell: "Nice work. Only purchases of current final output enter GDP; transfers and asset trades do not."

**Unlocks/waypoint:** Unlock Stop 6 at `calculating-desk` in PRICES.

**Beat 3 - After Stop 6 | `price-history-board` | automatic**

**World state:** The close the output identity result remains visible while the remove the price effect fixture lights.

**Panel/HUD text:** PRICES

**Dialogue bubbles -** Idris Pell: "Good thinking. Nominal GDP is 740 billion crowns."

**Unlocks/waypoint:** Unlock Stop 7 at `price-history-board` in PRICES.

**Beat 4 - After Stop 7 | `output-ledger` | automatic**

**World state:** The remove the price effect result remains visible while the publish the output line fixture lights.

**Panel/HUD text:** STOP 7 RECORDED - STOP 8 OPEN

**Dialogue bubbles -** Idris Pell: "Exactly right. Real GDP is about 685.2 billion base-year crowns."

**Unlocks/waypoint:** Unlock Stop 8 at `output-ledger` in PRICES.

**Beat 5 - At mission end | `output-ledger` | automatic**

**World state:** Mission outcome and hook | PRICES | automatic World state and dialogue:   State: Page 2 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Idris Pell: "Outstanding work. You solved the mission. The report was not false. Its growth claim was."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Idris has a nominal ledger that includes transfers and securities. The one-location PRICES route uses S1 classification, S2 identity, S3 deflator, and S4 reconciliation. Arrival: Idris, national accounts chief: “The total is exact. The contents may not be.” After S2 the invalid rows turn gray with text labels. Final panel stamps REAL. GDP measures production; the expenditure identity sorts demand components; real GDP answers whether output changed.

## Key concepts, explained here

**Objective:** Build GDP correctly and separate nominal growth from real growth. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 5 - Classify the ledger

**Format/placement:** PROTOCOL, at `output-ledger`.

**Metadata:** Concept: 5 - GDP components; Keystone: GDP; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the output ledger, in Statistics Floor.

**Stop reason - exact player copy:** The national output ledger has arrived with purchases and transfers mixed together.

**Question card story setup - exact player copy:** Idris's ledger mixes household purchases, factory equipment, public wages, exports, imports, welfare checks, and stock trades. Match each row to consumption (C), investment (I), government purchases (G), net exports (NX), or excluded before totaling domestic production.

**Question card story-science connection - exact player copy:** Correct classification determines which transactions count toward domestic production and prevents double-counting.

**Question card prompt - exact player copy:** Draw one line from each transaction to its category and submit the complete mapping.

**Complete format-specific interaction block:** `scenarios:[groceries,machine,teacher_salary,exports,imports,welfare,stock];choices:[C,I,G,NX_plus,NX_minus,excluded_transfer,excluded_asset];mapping:{groceries:C,machine:I,teacher_salary:G,exports:NX_plus,imports:NX_minus,welfare:excluded_transfer,stock:excluded_asset}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Only purchases of current final output enter GDP; transfers and asset trades do not.

**Why:** Correct labels prevent transfers and asset trades from masquerading as current production.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Correct labels prevent transfers and asset trades from masquerading as current production.

**State/output:** valid rows unlock S2.

## Stop 6 - Close the output identity

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: 5 - expenditure GDP; Keystone: GDP; Area: Statistics Floor; Learning role: PRACTICE; Difficulty: L2; Story role: calculation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** The transaction categories are sorted and the board needs a national output total.

**Question card story setup - exact player copy:** With excluded rows removed, the ledger shows C = 480, I = 120, G = 160, exports = 90, and imports = 110 billion crowns. Build the identity and close the total in the Rate Book.

**Question card story-science connection - exact player copy:** The expenditure total establishes the nominal output figure used in the conversion plan.

**Question card prompt - exact player copy:** Submit nominal GDP in billion crowns using `GDP=C+I+G+(X−M)`.

**Complete format-specific interaction block:** `derive:{left_side:"Y",lines:["NX=90−110=−20","GDP=480+120+160−20","GDP=740 billion crowns"],licenses:["net exports","expenditure identity","arithmetic"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `NX=90+110=200`
2. `GDP=480+120+160+200`
3. `GDP=960 billion crowns`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["With excluded rows removed, the ledger shows C = 480, I = 120, G = 160, exports = 90, and imports = 110 billion crowns.", "Build and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Close the output identity in the form and units requested by the prompt"
  left_side: "Y"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "NX=90−110=−20", correct: true}
        - {text: "NX=90+110=200", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "GDP=480+120+160−20", correct: true}
        - {text: "GDP=480+120+160+200", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "GDP=740 billion crowns", correct: true}
        - {text: "GDP=960 billion crowns", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 740 billion crowns, ±0.5.

**Answer text:** Nominal GDP is 740 billion crowns.

**Why:** The component labels reveal which spending changed, not merely that “spending” changed.

**Wrong-path feedback:** Imports are subtracted within NX, not from C again.

**State/output:** total posts; S3.

## Stop 7 - Remove the price effect

**Format/placement:** DERIVE, at `price-history-board`.

**Metadata:** Concept: 9 - nominal/real GDP; Keystone: GDP/inflation; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** The nominal headline is ready, but higher prices may explain part of its size.

**Question card story setup - exact player copy:** Because nominal GDP is 740 billion crowns, the headline looks strong; the deflator is 108.0. Rearrange the recorded deflator relationship and calculate real GDP before the board calls the rise economic growth.

**Question card story-science connection - exact player copy:** Real output removes the price-level effect so the board can assess production rather than inflation alone.

**Question card prompt - exact player copy:** Submit real GDP in billion base-year crowns.

**Complete format-specific interaction block:** `derive:{left_side:"real",lines:["108=740/real×100","real=740×100/108","real=685.19"],licenses:["substitution","algebra","evaluation"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `108=real/740×100`
2. `real=740×108/100`
3. `real=799.2`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Because nominal GDP is 740 billion crowns, the headline looks strong; the deflator is 108.0. Rearrange the recorded deflator relationship and calculate real GDP before the board calls the rise economic growth.", "Using `deflator=nominal/real×100`, derive and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Remove the price effect in the form and units requested by the prompt"
  left_side: "real"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "108=740/real×100", correct: true}
        - {text: "108=real/740×100", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "real=740×100/108", correct: true}
        - {text: "real=740×108/100", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "real=685.19", correct: true}
        - {text: "real=799.2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 685.2, ±0.2.

**Answer text:** Real GDP is about 685.2 billion base-year crowns.

**Why:** Real GDP, not nominal GDP, measures the change in produced output.

**Wrong-path feedback:** Dividing by 108 without multiplying by 100 misreads the index.

**State/output:** GROWTH label changes to PRICE EFFECT; S4.

## Stop 8 - Publish the output line

**Format/placement:** BALANCE, at `output-ledger`.

**Metadata:** Concept: 6 - GDP scope; Keystone: GDP; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the output ledger, in Statistics Floor.

**Stop reason - exact player copy:** The price adjustment is complete and the output statement is ready for publication.

**Question card story setup - exact player copy:** Real output is far below the nominal headline, and the component audit excludes two tempting rows. Close the output ledger by counting only valid flows and naming the price adjustment that makes the total comparable.

**Question card story-science connection - exact player copy:** The completed ledger documents which flows count and which adjustment makes output comparable across years.

**Question card prompt - exact player copy:** Toggle counted streams, close nominal GDP at 740, enter deflator 108, and submit “publish real GDP 685.2 with nominal context.”

**Complete format-specific interaction block:** `balance:{streams:[{id:C,value:480,count:true},{id:I,value:120,count:true},{id:G,value:160,count:true},{id:X,value:90,count:true},{id:M,value:-110,count:true},{id:transfers,value:35,count:false},{id:stocks,value:22,count:false}],closure:740,adjustment:{deflator:108,real:685.19},correct_conclusion:"publish_real_with_nominal_context"}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Publish real GDP of 685.2 billion and retain nominal GDP of 740 billion as context.

**Why:** A defensible aggregate states both what it counts and how prices were handled.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A defensible aggregate states both what it counts and how prices were handled.

**State/output:** Page 2 signed.

## Mission outcome

Mission decision: Publish real GDP of 685.2 billion base-year crowns with the nominal total shown only as context. Prices caused much of the apparent growth. The board corrects the headline. The next question is whether the street price jump is broad or built into the basket.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a sharp decision. Your evidence supports a clear decision: Publish real GDP of 685.2 billion base-year crowns with the nominal total shown only as context. The Currency Board can now protect buying power with a sounder decision.

**Header:** MISSION 2 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 13:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The corrected real-output line replaces the false growth headline.

**Automatic bar change:** PRICES +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 54/60/68/61; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Growth On Paper. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Growth On Paper, a new decision at Halvern's currency changeover requires the team to distinguish Gross domestic product (GDP) from related macroeconomics ideas. Which statement correctly applies Gross domestic product (GDP)?

**Options - exact player copy:**

- A. Household spending on goods and services.
- B. The market value of final goods and services produced inside a country during a stated period.
- C. Business capital, inventory change, and new housing, not stock purchases.
- D. Exports minus imports.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Gross domestic product (GDP); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Consumption, not Gross domestic product (GDP). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Gross domestic product (GDP) applies because the market value of final goods and services produced inside a country during a stated period.
- C: This describes Investment, not Gross domestic product (GDP). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Net exports (NX), not Gross domestic product (GDP). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Growth On Paper, a new decision at Halvern's currency changeover requires the team to distinguish Consumption from related macroeconomics ideas. Which description of Consumption should guide the team's reasoning?

**Options - exact player copy:**

- A. The market value of final goods and services produced inside a country during a stated period.
- B. Business capital, inventory change, and new housing, not stock purchases.
- C. Household spending on goods and services.
- D. Exports minus imports.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Consumption; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Gross domestic product (GDP), not Consumption. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Investment, not Consumption. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Consumption applies because household spending on goods and services.
- D: This describes Net exports (NX), not Consumption. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Growth On Paper, a new decision at Halvern's currency changeover requires the team to distinguish Investment from related macroeconomics ideas. Which claim about Investment is scientifically defensible?

**Options - exact player copy:**

- A. The market value of final goods and services produced inside a country during a stated period.
- B. Household spending on goods and services.
- C. Exports minus imports.
- D. Business capital, inventory change, and new housing, not stock purchases.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Investment; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Gross domestic product (GDP), not Investment. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Consumption, not Investment. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Net exports (NX), not Investment. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Investment applies because business capital, inventory change, and new housing, not stock purchases.

### Review question 4

**Prompt - exact player copy:** After Growth On Paper, a new decision at Halvern's currency changeover requires the team to distinguish Net exports (NX) from related macroeconomics ideas. Which interpretation of Net exports (NX) is correct?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Value of RATE",
  "yLabel": "Net exports",
  "caption": "A stronger RATE reduces Halvern's net exports.",
  "series": [
    {
      "name": "NX",
      "points": [
        [
          2,
          80
        ],
        [
          3,
          65
        ],
        [
          4,
          50
        ],
        [
          5,
          35
        ],
        [
          6,
          20
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Exports minus imports.
- B. The market value of final goods and services produced inside a country during a stated period.
- C. Household spending on goods and services.
- D. Business capital, inventory change, and new housing, not stock purchases.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Net exports (NX); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. Net exports (NX) applies because exports minus imports.
- B: This describes Gross domestic product (GDP), not Net exports (NX). The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Consumption, not Net exports (NX). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Investment, not Net exports (NX). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Growth On Paper, a new decision at Halvern's currency changeover requires the team to distinguish GDP components from related macroeconomics ideas. Which statement about GDP components would earn course credit?

**Options - exact player copy:**

- A. The market value of final goods and services produced inside a country during a stated period.
- B. Correct labels prevent transfers and asset trades from masquerading as current production.
- C. Household spending on goods and services.
- D. Business capital, inventory change, and new housing, not stock purchases.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for GDP components; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Gross domestic product (GDP), not GDP components. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. GDP components applies because correct labels prevent transfers and asset trades from masquerading as current production.
- C: This describes Consumption, not GDP components. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Investment, not GDP components. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Growth On Paper, a new decision at Halvern's currency changeover requires the team to distinguish expenditure GDP from related macroeconomics ideas. Which use of expenditure GDP gives the strongest basis for a decision?

**Options - exact player copy:**

- A. The market value of final goods and services produced inside a country during a stated period.
- B. Household spending on goods and services.
- C. The component labels reveal which spending changed, not merely that “spending” changed.
- D. Business capital, inventory change, and new housing, not stock purchases.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for expenditure GDP; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Gross domestic product (GDP), not expenditure GDP. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Consumption, not expenditure GDP. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. expenditure GDP applies because the component labels reveal which spending changed, not merely that “spending” changed.
- D: This describes Investment, not expenditure GDP. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 3 - The Basket

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 13 DAYS TO CHANGEOVER

**Card title:** The Basket

**Go now:** Go to PRICES and meet Lina Saye, price statistics lead, at the basket table.

**Card body:** The official inflation figure may not reflect what families actually buy. It follows a fixed shopping list whose spending shares may be out of date. Recalculate the price changes and test different household purchases, then decide whether the published measure needs a companion measure or revision.

**Objective:** Test whether the fixed basket represents current household costs.

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
  - id: changeover_m03_we01
    title: Price a fixed basket
    problem: A fixed basket costs $50 in the base year and $60 now. Find the consumer price index.
    rule: CPI=current basket cost/base basket cost×100.
    steps:
    - 'Set up the relationship: CPI=current basket cost/base basket cost×100.'
    - CPI=60/50×100=120.
    answer: The fixed basket is 20% more expensive than in the base year.
    common_mistake: Keep basket quantities fixed when calculating this index.
  - id: changeover_m03_we02
    title: Inflation between two indexes
    problem: The price index rises from 120 to 126. Find inflation over the period.
    rule: Inflation=(new index-old index)/old index×100%.
    steps:
    - 'Set up the relationship: Inflation=(new index-old index)/old index×100%.'
    - inflation=(126-120)/120×100%=5%.
    answer: The price level rose 5%.
    common_mistake: Six index points are not automatically six percent.
  - id: changeover_m03_we03
    title: Find a weighted price change
    problem: Food is half of spending and transport is half. Food prices rise 10%; transport prices are unchanged. Find the fixed-weight price rise.
    rule: Weighted change=sum of spending share×category price change.
    steps:
    - 'Set up the relationship: Weighted change=sum of spending share×category price change.'
    - change=0.5(10%)+0.5(0%)=5%.
    answer: The fixed-weight price increase is 5%.
    common_mistake: Do not count a category's full increase as if it were the whole basket.
  - id: changeover_m03_we04
    title: Understand substitution bias
    problem: Apples become dearer and households buy cheaper pears instead. A fixed basket still requires the old apple quantity. What can happen?
    rule: A fixed basket does not reflect consumers switching toward relatively cheaper goods.
    steps:
    - Its cost includes buying the old apple quantity at the new higher price.
    - Actual households can partly reduce the cost increase by choosing pears.
    answer: The fixed-basket increase can overstate the change in the cost of maintaining a comparable standard of living.
    common_mistake: This does not mean the basket arithmetic was calculated incorrectly.
  - id: changeover_m03_we05
    title: Compare pay with prices
    problem: A wage rises from $10 to $11 per hour while the price index rises from 100 to 110. Did purchasing power rise?
    rule: Real wage in base-year dollars=nominal wage×100/price index.
    steps:
    - 'Set up the relationship: Real wage in base-year dollars=nominal wage×100/price index.'
    - old real wage=10×100/100=10; new real wage=11×100/110=10.
    answer: Purchasing power per hour is unchanged.
    common_mistake: A higher dollar wage need not buy more goods.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Consumer price index (CPI): the current cost of a fixed consumer basket relative to its base-year cost, times 100.

Inflation rate: the percent change in a price index.

Substitution bias: CPI overstatement when consumers switch away from goods whose prices rise.

#### Primer concepts

- Quality changes can also bias CPI; one relative-price change is not automatically broad inflation; fixed weights aid comparison but can become unrepresentative.

#### Equations first needed today
**Equation:** `CPI = current basket cost / base basket cost × 100`

**What it is for:** Measure a fixed basket's price level.

**Symbols:** `CPI` consumer price index; current-year basket cost is the fixed basket valued at current prices; base-year basket cost is the same basket valued at base-year prices.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.

**Equation:** `inflation = (CPI_new−CPI_old)/CPI_old ×100%`

**What it is for:** Find the index growth rate.

**Symbols:** CPI_new and CPI_old are consecutive indexes.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.

## Main story happening - designer summary

One-location PRICES. Lina defends the old basket. S1 prices it, S2 derives inflation, S3 stress-tests weights, S4 chooses a published pair. Arrival: “If we change the basket whenever it hurts, it is no index. If we never change it, it may be nobody's basket.” The `×4.00` stickers become mapped to imported-energy-heavy vendors. CPI uses a fixed basket; substitution and quality change explain bias; index revision must be transparent rather than convenient.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at PRICES | `basket-table` | automatic**

**World state:** Arrival | PRICES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Test whether the fixed basket represents current household costs.` Lina Saye points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Test whether the fixed basket represents current household costs.

**Dialogue bubbles -** Lina Saye: "Start with price the fixed basket. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `basket-table` in PRICES.

**Beat 2 - After Stop 9 | `price-history-board` | automatic**

**World state:** The price the fixed basket result remains visible while the calculate the printed inflation fixture lights.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Lina Saye: "Nice work. The fixed basket CPI is 108."

**Unlocks/waypoint:** Unlock Stop 10 at `price-history-board` in PRICES.

**Beat 3 - After Stop 10 | `basket-table` | automatic**

**World state:** The calculate the printed inflation result remains visible while the does the basket represent families? fixture lights.

**Panel/HUD text:** 108−100

**Dialogue bubbles -** Lina Saye: "Good thinking. The official basket reports 5.88% inflation."

**Unlocks/waypoint:** Unlock Stop 11 at `basket-table` in PRICES.

**Beat 4 - After Stop 11 | `basket-table` | automatic**

**World state:** The does the basket represent families? result remains visible while the keep history and repair representation fixture lights.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Lina Saye: "Exactly right. Inflation is positive, but 5.88% depends strongly on the stale energy weight."

**Unlocks/waypoint:** Unlock Stop 12 at `basket-table` in PRICES.

**Beat 5 - At mission end | `basket-table` | automatic**

**World state:** Mission outcome and hook | PRICES | automatic World state and dialogue:   State: Page 3 signed; port-energy clue logged; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Lina Saye: "Outstanding work. You solved the mission. The arithmetic stays. The claim gets narrower."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

One-location PRICES. Lina defends the old basket. S1 prices it, S2 derives inflation, S3 stress-tests weights, S4 chooses a published pair. Arrival: “If we change the basket whenever it hurts, it is no index. If we never change it, it may be nobody's basket.” The `×4.00` stickers become mapped to imported-energy-heavy vendors. CPI uses a fixed basket; substitution and quality change explain bias; index revision must be transparent rather than convenient.

## Key concepts, explained here

**Objective:** Test whether the fixed basket represents current household costs. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 9 - Price the fixed basket

**Format/placement:** DERIVE, at `basket-table`.

**Metadata:** Concept: 7 - CPI; Keystone: inflation; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the basket table, in Statistics Floor.

**Stop reason - exact player copy:** Shops have applied new labels, prompting a check of the unchanged household basket.

**Question card story setup - exact player copy:** The base basket cost 200 crowns; the identical quantities now cost 216 crowns after shops apply conversion labels. Build the CPI calculation first, so any later criticism begins from the official method rather than suspicion.

**Question card story-science connection - exact player copy:** The consumer price index measures the price change for fixed quantities before the board debates representation.

**Question card prompt - exact player copy:** Submit the index, no unit.

**Complete format-specific interaction block:** `derive:{left_side:"CPI",lines:["CPI=216/200×100","CPI=1.08×100","CPI=108"],licenses:["definition","division","scale"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `CPI=200/216×100`
2. `CPI=1.08`
3. `CPI=108% inflation`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The base basket cost 200 crowns; the identical quantities now cost 216 crowns after shops apply conversion labels.", "Use `CPI=current/base×100`; build the derivation and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Price the fixed basket in the form and units requested by the prompt"
  left_side: "CPI"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "CPI=216/200×100", correct: true}
        - {text: "CPI=200/216×100", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "CPI=1.08×100", correct: true}
        - {text: "CPI=1.08 index points", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "CPI=108", correct: true}
        - {text: "CPI=108, interpreted as 108% inflation", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 108 ±0.1.

**Answer text:** The fixed basket CPI is 108.

**Why:** Reproducing the index separates a calculation error from a design problem.

**Wrong-path feedback:** CPI is an index, not 8%.

**State/output:** S2.

## Stop 10 - Calculate the printed inflation

**Format/placement:** DERIVE, at `price-history-board`.

**Metadata:** Concept: 8 - inflation rate; Keystone: inflation; Area: Statistics Floor; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** The new index is calculated and needs comparison with the previous published index.

**Question card story setup - exact player copy:** With the new CPI fixed at 108 and last year's CPI at 102, calculate the percentage change the public bulletin will show. The board must know the exact headline before testing whether it represents households.

**Question card story-science connection - exact player copy:** The inflation rate establishes the official price-change headline that the household review will test.

**Question card prompt - exact player copy:** Submit the percentage.

**Complete format-specific interaction block:** `derive:{left_side:"inflation",lines:["ΔCPI=108-102=6","relative CPI change=6/102=0.0588235","inflation=5.88%"],licenses:["difference","relative change","percent"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `ΔCPI=108+102=210`
2. `6/108=0.05556`
3. `inflation=0.0588%`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["With the new CPI fixed at 108 and last year's CPI at 102, calculate the percentage change the public bulletin will show. The board must know the exact headline before testing whether it represents households.", "Start with inflation=(CPI_new-CPI_old)/CPI_old×100%, where inflation is the percentage rise in the cost of the fixed household basket. Substitute CPI_new=108 and CPI_old=102, keep inflation on the left, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Calculate the printed inflation in the form and units requested by the prompt"
  left_side: "inflation"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔCPI=108-102=6", correct: true}
        - {text: "ΔCPI=108+102=210 index points", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "relative CPI change=6/102=0.0588235", correct: true}
        - {text: "6/108=0.05556", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "inflation=5.88%", correct: true}
        - {text: "inflation=0.0588%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 5.88%, ±0.05.

**Answer text:** The official basket reports 5.88% inflation.

**Why:** Inflation is the percentage change in the index, not the index's distance from 100.

**Wrong-path feedback:** `108−100` is not the year-to-year rate.

**State/output:** headline posts; S3.

## Stop 11 - Does the basket represent families?

**Format/placement:** STRESS, asked by Lina Saye beside `basket-table`.

**Metadata:** Concept: 7 - CPI bias/weights; Keystone: Evidence integrity; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Talk to Lina Saye, at the basket table in Statistics Floor.

**Stop reason - exact player copy:** The official inflation rate is reproducible, but the basket's energy weight may not fit today's households.

**Question card story setup - exact player copy:** Because the official rate is 5.88%, Lina tests the old 30% imported-energy weight against current household shares of 15% to 25%. Move the weight through that range and watch which inflation conclusions survive.

**Question card story-science connection - exact player copy:** Weight sensitivity shows whether the inflation conclusion depends on an unrepresentative spending pattern.

**Question card prompt - exact player copy:** Move the weight from 15% through 30%, inspect every displayed inflation rate, and submit the conclusion that survives the full range.

**Complete format-specific interaction block:** `stress:{assumption:"imported-energy weight",min:0.15,max:0.30,step:0.05,candidates:[{id:"broad_5_88",survives:[0.30]},{id:"range",survives:[0.15,0.20,0.25,0.30]},{id:"zero",survives:[]}],readings:{0.15:3.1,0.20:3.7,0.25:4.4,0.30:5.88},correct:"range"}`

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 11 - Does the basket represent families?"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Move the weight from 15% through 30%, inspect every displayed inflation rate, and submit the conclusion that survives the full range."
  payload: "`stress:{assumption:\"imported-energy weight\",min:0.15,max:0.30,step:0.05,candidates:[{id:\"broad_5_88\",survives:[0.30]},{id:\"range\",survives:[0.15,0.20,0.25,0.30]},{id:\"zero\",survives:[]}],readings:{0.15:3.1,0.20:3.7,0.25:4.4,0.30:5.88},correct:\"range\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "imported-energy basket weight", min: 15, max: 30, nominal: 22.5, step: 5, unit: "%"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 22.5, max: 22.5}
      failsAt: 30
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 22.5, max: 30}
      failsAt: 15
    - id: robust_plan
      label: "The keyed result shown by the completed interaction."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 15, max: 30}
  robust: robust_plan
  question: "Move the weight from 15% through 30%, inspect every displayed inflation rate, and submit the conclusion that survives the full range."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Inflation is positive, but 5.88% depends strongly on the stale energy weight.

**Why:** Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.

**State/output:** revised basket unlocks.

## Stop 12 - Keep history and repair representation

**Format/placement:** VALUE, asked by Lina Saye beside `basket-table`.

**Metadata:** Concept: 7 - index publication; Keystone: Evidence/inflation; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Lina Saye, at the basket table in Statistics Floor.

**Stop reason - exact player copy:** The weighting test has exposed a representation problem without invalidating the historical calculation.

**Question card story setup - exact player copy:** The official method is reproducible, yet its energy weight overstates many households' current exposure. Choose the evidence package that preserves the historical series while revealing how a representative current basket changes the result.

**Question card story-science connection - exact player copy:** The evidence package preserves a comparable series while showing how a current household basket changes the estimate.

**Question card prompt - exact player copy:** Spend exactly 60 evidence points and submit the publication plan.

**Complete format-specific interaction block:** `value:{budget:60,options:[{id:"parallel",cost:45,required:true,axis:"fixed CPI plus current-weight companion"},{id:"audit",cost:15,required:true,axis:"weight audit"},{id:"ads",cost:30,axis:"publicity"},{id:"erase",cost:25,axis:"replace history"}],correct:["parallel","audit"]}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Keep the fixed CPI and publish a current-weight companion with the weight audit.

**Why:** Publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.

**State/output:** Page 3 signed; port-energy clue logged.

## Mission outcome

Mission decision: The gap is 34.8 billion RATE. Job data show weak demand. The fuel shock raised prices. Next, test how spending moves through the economy.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Outstanding reasoning. The key result is now settled: The gap is 34.8 billion RATE. Shops, banks, and workers have a safer path through the changeover.

**Header:** MISSION 3 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 14:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The parallel index improves representation, while the audit consumes staff capacity.

**Automatic bar change:** READINESS +4; RESERVE −2

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 62/67/66/61; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Basket. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After The Basket, a new decision at Halvern's currency changeover requires the team to distinguish Consumer price index (CPI) from related macroeconomics ideas. Which statement correctly applies Consumer price index (CPI)?

**Options - exact player copy:**

- A. The percent change in a price index.
- B. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- C. CPI overstatement when consumers switch away from goods whose prices rise.
- D. Reproducing the index separates a calculation error from a design problem.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Consumer price index (CPI); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Inflation rate, not Consumer price index (CPI). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Consumer price index (CPI) applies because the current cost of a fixed consumer basket relative to its base-year cost, times 100.
- C: This describes Substitution bias, not Consumer price index (CPI). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes CPI, not Consumer price index (CPI). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After The Basket, a new decision at Halvern's currency changeover requires the team to distinguish Inflation rate from related macroeconomics ideas. Which description of Inflation rate should guide the team's reasoning?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. CPI overstatement when consumers switch away from goods whose prices rise.
- C. The percent change in a price index.
- D. Reproducing the index separates a calculation error from a design problem.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Inflation rate; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Consumer price index (CPI), not Inflation rate. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Substitution bias, not Inflation rate. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Inflation rate applies because the percent change in a price index.
- D: This describes CPI, not Inflation rate. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After The Basket, a new decision at Halvern's currency changeover requires the team to distinguish Substitution bias from related macroeconomics ideas. Which claim about Substitution bias is scientifically defensible?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. The percent change in a price index.
- C. Reproducing the index separates a calculation error from a design problem.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Substitution bias; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Consumer price index (CPI), not Substitution bias. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Inflation rate, not Substitution bias. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes CPI, not Substitution bias. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Substitution bias applies because cPI overstatement when consumers switch away from goods whose prices rise.

### Review question 4

**Prompt - exact player copy:** After The Basket, a new decision at Halvern's currency changeover requires the team to distinguish CPI from related macroeconomics ideas. Which interpretation of CPI is correct?

**Options - exact player copy:**

- A. Reproducing the index separates a calculation error from a design problem.
- B. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- C. The percent change in a price index.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for CPI; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. CPI applies because reproducing the index separates a calculation error from a design problem.
- B: This describes Consumer price index (CPI), not CPI. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Inflation rate, not CPI. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Substitution bias, not CPI. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After The Basket, a new decision at Halvern's currency changeover requires the team to distinguish CPI bias/weights from related macroeconomics ideas. Which statement about CPI bias/weights would earn course credit?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.
- C. The percent change in a price index.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for CPI bias/weights; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Consumer price index (CPI), not CPI bias/weights. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. CPI bias/weights applies because sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.
- C: This describes Inflation rate, not CPI bias/weights. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Substitution bias, not CPI bias/weights. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After The Basket, a new decision at Halvern's currency changeover requires the team to distinguish index publication from related macroeconomics ideas. Which use of index publication gives the strongest basis for a decision?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. The percent change in a price index.
- C. Publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for index publication; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Consumer price index (CPI), not index publication. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Inflation rate, not index publication. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. index publication applies because publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.
- D: This describes Substitution bias, not index publication. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 4 - Jobs Behind The Number

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 12 DAYS TO CHANGEOVER

**Card title:** Jobs Behind the Number

**Go now:** Go to COUNTER and meet Eli Voss, counter operations lead, at the labor board.

**Card body:** Fewer people are finding work while prices keep rising. Some have stopped looking and no longer appear in the official unemployment count. Rebuild the jobs picture and compare actual production with what Halvern could produce, then decide whether the country needs a recession warning.

**Objective:** Diagnose labor-market weakness without losing excluded workers.

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
  - id: changeover_m04_we01
    title: Calculate unemployment
    problem: There are 90 employed people, 10 active job seekers, and 5 people who stopped looking. Find the official unemployment rate.
    rule: Labor force=employed+active unemployed; unemployment rate=active unemployed/labor force.
    steps:
    - 'Set up the relationship: Labor force=employed+active unemployed; unemployment rate=active unemployed/labor force.'
    - labor force=90+10=100; rate=10/100=10%.
    answer: The unemployment rate is 10%; the five discouraged workers are outside this denominator.
    common_mistake: People who stopped looking still matter, but are not counted as active unemployed.
  - id: changeover_m04_we02
    title: Find labor-force participation
    problem: A working-age population has 200 people and a labor force of 120. Find participation.
    rule: Participation rate=labor force/working-age population×100%.
    steps:
    - 'Set up the relationship: Participation rate=labor force/working-age population×100%.'
    - participation=120/200×100%=60%.
    answer: Sixty percent are working or actively seeking work.
    common_mistake: Participation and unemployment use different denominators.
  - id: changeover_m04_we03
    title: Measure an output gap
    problem: Actual real output is 95 billion and potential output is 100 billion. Find the signed gap and percent gap.
    rule: Gap=actual-potential; percent gap=gap/potential×100%.
    steps:
    - 'Set up the relationship: Gap=actual-potential; percent gap=gap/potential×100%.'
    - gap=95-100=-5 billion; percent gap=-5/100×100%=-5%.
    answer: The economy has a recessionary gap of 5 billion, or 5% below potential.
    common_mistake: Potential output is the reference denominator.
  - id: changeover_m04_we04
    title: Separate unemployment causes
    problem: One person is searching between jobs; another lost work because a skill became obsolete; a third was laid off when total spending fell. Classify them.
    rule: Frictional means job search; structural means mismatch; cyclical means weak aggregate demand.
    steps:
    - The job search is frictional; the obsolete skill is structural.
    - The spending-related layoff is cyclical.
    answer: Only the third is directly explained by the downturn in overall demand.
    common_mistake: Full employment does not mean zero frictional or structural unemployment.
  - id: changeover_m04_we05
    title: Calculate real growth
    problem: Real output rises from 100 to 105 billion. Find the growth rate.
    rule: Growth rate=(new-old)/old×100%.
    steps:
    - 'Set up the relationship: Growth rate=(new-old)/old×100%.'
    - growth=(105-100)/100×100%=5%.
    answer: Real output grew 5%.
    common_mistake: Use the old value as the denominator.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Labor force: employed people plus unemployed people actively seeking work.

Discouraged worker: a person who wants work but stopped searching and is outside the labor force.

Natural unemployment: frictional plus structural unemployment.

Recessionary gap: real output below full-employment output.

#### Primer concepts

- Full employment means zero cyclical unemployment, not zero unemployment; frictional is search, structural is mismatch, cyclical is weak demand.

#### Equations first needed today
`unemployment rate = unemployed / labor force ×100%`
**What it is for:** Measure active joblessness.
**Symbols:** unemployed actively seek; labor force equals employed plus active seekers. **Why needed:** The queue includes both counted and discouraged workers.

## Main story happening - designer summary

COUNTER only. S1 rebuilds labor force, S2 classifies causes, S3 computes gap, S4 diagnoses warning. Eli sees the line as transition labor; quiet “stopped searching” cards challenge that. Arrival bubble asks who disappears from a rate. A falling participation placard persists. Labor definitions prevent denominator errors; types separate normal churn from demand weakness; Y<Yf implies recessionary gap.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at COUNTER | `wage-notice-rail` | automatic**

**World state:** Arrival | COUNTER | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Diagnose labor-market weakness without losing excluded workers.` Eli Voss points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Diagnose labor-market weakness without losing excluded workers.

**Dialogue bubbles -** Eli Voss: "Start with rebuild the denominator. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 13 at `wage-notice-rail` in COUNTER.

**Beat 2 - After Stop 13 | `queue-board` | automatic**

**World state:** The rebuild the denominator result remains visible while the name the causes fixture lights.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. The labor force is 10.0 million and unemployment is 8.0%; 0.5 million discouraged workers remain outside."

**Unlocks/waypoint:** Unlock Stop 14 at `queue-board` in COUNTER.

**Beat 3 - After Stop 14 | `allocation-slate` | automatic**

**World state:** The name the causes result remains visible while the place the output gap fixture lights.

**Panel/HUD text:** COUNTER

**Dialogue bubbles -** Eli Voss: "Good thinking. Frictional and structural form the natural rate; recession layoffs are cyclical."

**Unlocks/waypoint:** Unlock Stop 15 at `allocation-slate` in COUNTER.

**Beat 4 - After Stop 15 | `wage-notice-rail` | automatic**

**World state:** The place the output gap result remains visible while the transition or warning fixture lights.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Halvern has a 34.8-billion recessionary gap."

**Unlocks/waypoint:** Unlock Stop 16 at `wage-notice-rail` in COUNTER.

**Beat 5 - At mission end | `wage-notice-rail` | automatic**

**World state:** Mission outcome and hook | COUNTER | automatic   State: Page 4 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Outstanding work. You solved the mission. The line is not only a changeover line. Some people have stopped looking for work."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

COUNTER only. S1 rebuilds labor force, S2 classifies causes, S3 computes gap, S4 diagnoses warning. Eli sees the line as transition labor; quiet “stopped searching” cards challenge that. Arrival bubble asks who disappears from a rate. A falling participation placard persists. Labor definitions prevent denominator errors; types separate normal churn from demand weakness; Y<Yf implies recessionary gap.

## Key concepts, explained here

**Objective:** Diagnose labor-market weakness without losing excluded workers. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 13 - Rebuild the denominator

**Format/placement:** DERIVE, at `wage-notice-rail`.

**Metadata:** Concept: 10 - unemployment rate; Keystone: labor/output gap; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the wage-notice rail, in Exchange Counter.

**Stop reason - exact player copy:** The employment report mixes active job seekers with people who have stopped looking.

**Question card story setup - exact player copy:** Halvern has 9.2 million employed people, 0.8 million active job seekers, and 0.5 million discouraged workers. Build the labor force and unemployment rate before comparing this month with the prior report.

**Question card story-science connection - exact player copy:** The labor-force denominator determines the official unemployment rate and makes the excluded group visible.

**Question card prompt - exact player copy:** Submit unemployment rate using active seekers only.

**Complete format-specific interaction block:** `derive:{left_side:"LF",lines:["LF=9.2+0.8=10.0 million","u=0.8/10.0×100%","u=8.0%"],licenses:["labor-force definition","rate definition","evaluation"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `LF=9.2 million employed only`
2. `u=0.8/9.2×100%`
3. `u=0.08%`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Halvern has 9.2 million employed people, 0.8 million active job seekers, and 0.5 million discouraged workers."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Rebuild the denominator in the form and units requested by the prompt"
  left_side: "LF"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "LF=9.2+0.8=10.0 million", correct: true}
        - {text: "LF=9.2 million employed only", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "u=0.8/10.0×100%", correct: true}
        - {text: "u=0.8/9.2×100%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "u=8.0%", correct: true}
        - {text: "u=0.08%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** LF 10.0m and 8.0%, ±0.1.

**Answer text:** The labor force is 10.0 million and unemployment is 8.0%; 0.5 million discouraged workers remain outside.

**Why:** Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

**State/output:** S2.

## Stop 14 - Name the causes

**Format/placement:** CHOICE, asked by Eli Voss beside `queue-board`.

**Metadata:** Concept: 11 - unemployment types; Keystone: labor gap; Area: Statistics Floor; Learning role: PRACTICE; Difficulty: L2; Story role: character.

**Call - exact player copy:** Talk to Eli Voss, at the queue board in Exchange Counter.

**Stop reason - exact player copy:** The unemployment rate is established, but the records point to several different causes.

**Question card story setup - exact player copy:** With unemployment at 8.0%, records show short job searches, obsolete dock skills, and layoffs from falling orders. Select the statement that correctly separates natural unemployment from the part caused by weak demand.

**Question card story-science connection - exact player copy:** Separating search, skill mismatch, and demand-related layoffs determines which unemployment policy could address.

**Question card prompt - exact player copy:** Select one submitted conclusion from the four distinct choices below.

1. All three types are natural.
2. Frictional and structural unemployment are natural; layoffs from falling demand are cyclical. **(correct)**
3. Structural unemployment is cyclical.
4. Full employment means zero unemployment.

**Choices:**

1. All three types are natural.

2. Frictional and structural unemployment are natural; layoffs from falling demand are cyclical. **(correct)**

3. Structural unemployment is cyclical.

4. Full employment means zero unemployment.

**Complete format-specific interaction block:** `choices:[{id:A,label:"All three types are natural"},{id:B,label:"Frictional and structural are natural; demand layoffs are cyclical"},{id:C,label:"Structural unemployment is cyclical"},{id:D,label:"Full employment means zero unemployment"}]; answer:B; rebuttals:{A:"Layoffs caused by weak aggregate demand are cyclical, not natural.",C:"A skill mismatch is structural unemployment, which belongs to the natural rate.",D:"Frictional and structural unemployment remain even at full employment."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Frictional and structural form the natural rate; recession layoffs are cyclical.

**Why:** Only cyclical unemployment signals output below its demand-supported potential.

**Wrong-path feedback:** (1) **All three are natural:** Cyclical unemployment rises when aggregate demand leaves output below potential. (3) **Structural is cyclical:** A skills or location mismatch is structural even if it lasts through a downturn. (4) **Full employment means zero:** Full employment still includes frictional and structural unemployment.

**State/output:** S3.

## Stop 15 - Place the output gap

**Format/placement:** DERIVE, at `allocation-slate`.

**Metadata:** Concept: 12 - output gap; Keystone: labor/GDP; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the allocation slate, in Exchange Counter.

**Stop reason - exact player copy:** The labor evidence suggests weak demand and now needs an output comparison.

**Question card story setup - exact player copy:** Because layoffs are cyclical, compare actual real GDP of 685.2 billion with full-employment output of 720.0 billion base-year crowns. Calculate the signed gap and label its type before policy staff move upstairs.

**Question card story-science connection - exact player copy:** The signed output gap measures the shortfall from potential production used to size a response.

**Question card prompt - exact player copy:** Submit billion crowns and label.

**Complete format-specific interaction block:** `derive:{left_side:"gap",lines:["gap=685.2−720.0","gap=−34.8 billion","gap classification=recessionary because gap<0"],licenses:["definition","arithmetic","Y<Yf rule"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `gap=720.0−685.2`
2. `gap=+34.8 billion`
3. `gap classification=inflationary even though gap<0`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Because layoffs are cyclical, compare actual real GDP of 685.2 billion with full-employment output of 720.0 billion base-year crowns.", "Use `gap=actual−potential`; derive and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Place the output gap in the form and units requested by the prompt"
  left_side: "gap"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "gap=685.2−720.0", correct: true}
        - {text: "gap=720.0−685.2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "gap=−34.8 billion", correct: true}
        - {text: "gap=+34.8 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "gap classification=recessionary because gap<0", correct: true}
        - {text: "gap classification=inflationary even though gap<0", correct: false, survives: true, reason: "This common mistake reverses the labels: actual output below potential is a recessionary gap, not an inflationary gap."}
```

**Correct result:** −34.8 billion, recessionary, ±0.1.

**Answer text:** Halvern has a 34.8-billion recessionary gap.

**Why:** A negative actual-minus-potential gap connects weak demand to excess unemployment.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A negative actual-minus-potential gap connects weak demand to excess unemployment.

**State/output:** S4.

## Stop 16 - Transition or warning

**Format/placement:** DIAGNOSIS, at `wage-notice-rail`.

**Metadata:** Concept: 12 - business cycle diagnosis; Keystone: labor/GDP/inflation; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the wage-notice rail, in Exchange Counter.

**Stop reason - exact player copy:** The output shortfall and layoffs agree, while the basket still reports rising prices.

**Question card story setup - exact player copy:** The negative output gap now agrees with cyclical layoffs and rising discouraged-worker counts, while the fixed basket still shows inflation. Select the diagnosis that fits every reading without pretending the price problem has vanished.

**Question card story-science connection - exact player copy:** The diagnosis must explain weak activity without dismissing the simultaneous inflation problem.

**Question card prompt - exact player copy:** Select one diagnosis and submit a conclusion.

**Complete format-specific interaction block:** `diagnosis:{headline:"Prices up, output below capacity",readings:["gap −34.8","cyclical layoffs","discouraged +0.5m","energy import +18%"],choices:[{id:"normal",mechanism:"natural churn only"},{id:"demand_boom",mechanism:"Y>Yf"},{id:"mixed",mechanism:"recessionary gap plus adverse supply pressure"},{id:"deflation",mechanism:"PL falling"}],answer:"mixed"}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Treat the labor data as a recessionary warning with an adverse supply shock.

**Why:** Weak output with rising prices can reflect a supply shock rather than healthy demand.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Weak output with rising prices can reflect a supply shock rather than healthy demand.

**State/output:** Page 4 signed.

## Mission outcome

Mission decision: Treat the job data as a recession warning. The output gap is 34.8 billion. Job loss backs the need to act. The energy shock explains much of the price rise. Now test the new spending plan.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You handled that beautifully. You gave the team its answer: Treat the job data as a recession warning. Your reasoning keeps one bad assumption from becoming national policy.

**Header:** MISSION 4 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 13:30

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The recession warning reaches the plaza before a response is ready.

**Automatic bar change:** PRICES −5; TRUST −3

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 71/62/68/58; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Jobs Behind The Number. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Jobs Behind The Number, a new decision at Halvern's currency changeover requires the team to distinguish Labor force from related macroeconomics ideas. Which statement correctly applies Labor force?

**Options - exact player copy:**

- A. A person who wants work but stopped searching and is outside the labor force.
- B. Employed people plus unemployed people actively seeking work.
- C. Frictional plus structural unemployment.
- D. Real output below full-employment output.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Labor force; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Discouraged worker, not Labor force. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Labor force applies because employed people plus unemployed people actively seeking work.
- C: This describes Natural unemployment, not Labor force. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Recessionary gap, not Labor force. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Jobs Behind The Number, a new decision at Halvern's currency changeover requires the team to distinguish Discouraged worker from related macroeconomics ideas. Which description of Discouraged worker should guide the team's reasoning?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. Frictional plus structural unemployment.
- C. A person who wants work but stopped searching and is outside the labor force.
- D. Real output below full-employment output.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Discouraged worker; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Labor force, not Discouraged worker. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Natural unemployment, not Discouraged worker. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Discouraged worker applies because a person who wants work but stopped searching and is outside the labor force.
- D: This describes Recessionary gap, not Discouraged worker. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Jobs Behind The Number, a new decision at Halvern's currency changeover requires the team to distinguish Natural unemployment from related macroeconomics ideas. Which claim about Natural unemployment is scientifically defensible?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. A person who wants work but stopped searching and is outside the labor force.
- C. Real output below full-employment output.
- D. Frictional plus structural unemployment.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Natural unemployment; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Labor force, not Natural unemployment. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Discouraged worker, not Natural unemployment. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Recessionary gap, not Natural unemployment. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Natural unemployment applies because frictional plus structural unemployment.

### Review question 4

**Prompt - exact player copy:** After Jobs Behind The Number, a new decision at Halvern's currency changeover requires the team to distinguish Recessionary gap from related macroeconomics ideas. Which interpretation of Recessionary gap is correct?

**Options - exact player copy:**

- A. Real output below full-employment output.
- B. Employed people plus unemployed people actively seeking work.
- C. A person who wants work but stopped searching and is outside the labor force.
- D. Frictional plus structural unemployment.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Recessionary gap; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. Recessionary gap applies because real output below full-employment output.
- B: This describes Labor force, not Recessionary gap. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Discouraged worker, not Recessionary gap. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Natural unemployment, not Recessionary gap. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Jobs Behind The Number, a new decision at Halvern's currency changeover requires the team to distinguish unemployment rate from related macroeconomics ideas. Which statement about unemployment rate would earn course credit?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.
- C. A person who wants work but stopped searching and is outside the labor force.
- D. Frictional plus structural unemployment.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for unemployment rate; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Labor force, not unemployment rate. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. unemployment rate applies because excluding discouraged workers follows the definition but can hide worsening conditions when read alone.
- C: This describes Discouraged worker, not unemployment rate. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Natural unemployment, not unemployment rate. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Jobs Behind The Number, a new decision at Halvern's currency changeover requires the team to distinguish unemployment types from related macroeconomics ideas. Which use of unemployment types gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. A person who wants work but stopped searching and is outside the labor force.
- C. Only cyclical unemployment signals output below its demand-supported potential.
- D. Frictional plus structural unemployment.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for unemployment types; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Labor force, not unemployment types. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Discouraged worker, not unemployment types. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. unemployment types applies because only cyclical unemployment signals output below its demand-supported potential.
- D: This describes Natural unemployment, not unemployment types. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 5 - The First Round

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 11 DAYS TO CHANGEOVER

**Card title:** The First Round

**Go now:** Go to PRICES and meet Rhea Dane, finance minister, at the spending board.

**Card body:** Halvern is producing less than it could, and the proposed spending package may be too small to help enough. Money paid to one person can become spending at another business. Calculate those further effects and choose a tax or spending change that addresses the shortfall.

**Objective:** Calculate the spending and tax changes that target the measured gap.

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
  - id: changeover_m05_we01
    title: Divide extra income
    problem: A household spends $80 of an additional $100 of disposable income. Find MPC and MPS.
    rule: Marginal propensity to consume MPC=extra consumption/extra income; MPS=1-MPC.
    steps:
    - 'Set up the relationship: Marginal propensity to consume MPC=extra consumption/extra income; MPS=1-MPC.'
    - MPC=80/100=0.8; MPS=1-0.8=0.2.
    answer: The household saves 20% of its extra income.
    common_mistake: Use changes in income and spending, not their total levels.
  - id: changeover_m05_we02
    title: Simple spending multiplier
    problem: In the simplified fixed-price spending model, MPC=0.75. Find the purchases multiplier.
    rule: Spending multiplier=1/(1-MPC), with no additional leakages in this model.
    steps:
    - 'Set up the relationship: Spending multiplier=1/(1-MPC), with no additional leakages in this model.'
    - multiplier=1/(1-0.75)=1/0.25=4.
    answer: A one-unit autonomous purchase increase produces four units of total output change in this model.
    common_mistake: This model result is not an unconditional real-world guarantee.
  - id: changeover_m05_we03
    title: Simple tax multiplier
    problem: Use MPC=0.75 in the simplified fixed-price model. Find the tax multiplier and effect of a $2 billion tax increase.
    rule: Tax multiplier=-MPC/(1-MPC).
    steps:
    - 'Set up the relationship: Tax multiplier=-MPC/(1-MPC).'
    - kT=-0.75/0.25=-3; ΔY=(-3)(+2)=-6 billion.
    answer: The modeled output change is -6 billion.
    common_mistake: A tax increase reduces disposable income, so its multiplier is negative.
  - id: changeover_m05_we04
    title: Size a purchase increase
    problem: A recessionary gap is 20 billion and the simplified spending multiplier is 4. Find the purchase increase needed to close it.
    rule: Required purchase increase=desired output increase/multiplier.
    steps:
    - 'Set up the relationship: Required purchase increase=desired output increase/multiplier.'
    - ΔG=20/4=5 billion.
    answer: The model calls for 5 billion in additional purchases.
    common_mistake: Do not multiply the gap by the multiplier.
  - id: changeover_m05_we05
    title: Balanced-budget change
    problem: Government purchases and taxes each rise by 5 billion. Use spending multiplier 4 and tax multiplier -3. Find the net output change.
    rule: Add the two modeled effects.
    steps:
    - 'Set up the relationship: Add the two modeled effects.'
    - ΔY=4(5)+(-3)(5)=20-15=5 billion.
    answer: Output rises 5 billion in this simplified model.
    common_mistake: Equal purchase and tax changes need not have cancelling demand effects.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Marginal propensity to consume (MPC): the fraction of an extra dollar of income consumed.

Marginal propensity to save (MPS): the fraction saved; MPC plus MPS equals one.

Multiplier: total demand change divided by the initial policy change.

#### Primer concepts

- Government purchases enter aggregate demand (AD) directly; a tax change first alters disposable income; the balanced-budget multiplier is one.

#### Equations first needed today
`MPC+MPS=1`; `spending multiplier=1/MPS`; `tax multiplier=−MPC/MPS`; `ΔG=gap/spending multiplier`. Jobs: derive the spending rounds and required policy. Symbols: MPC, MPS, ΔG, gap. Why needed: size the smallest package that closes 34.8 billion.

## Main story happening - designer summary

PRICES→RATE. Rhea wants an announcement now. S1 derives MPS, S2 both multipliers, and S3 calculates alternatives; that exact target unlocks RATE, where S4 selects the package because only the policy room can authorize it. The first-round tiles light successive spending rounds. Rhea's pressure is legitimate but ignores supply. Multipliers translate a first-round fiscal change into total AD; taxes have a smaller absolute multiplier because households save part of the tax change. Waypoint: “Take the 8.7-billion target to the Rate Room for authorization.”

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at PRICES | `calculating-desk` | automatic**

**World state:** Arrival | PRICES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Calculate the spending and tax changes that target the measured gap.` Rhea Dane points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Calculate the spending and tax changes that target the measured gap.

**Dialogue bubbles -** Rhea Dane: "Start with split the next crown. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 17 at `calculating-desk` in PRICES.

**Beat 2 - After Stop 17 | `calculating-desk` | automatic**

**World state:** The split the next crown result remains visible while the build both multipliers fixture lights.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Rhea Dane: "Nice work. MPS is 0.25, so one quarter leaks from each round."

**Unlocks/waypoint:** Unlock Stop 18 at `calculating-desk` in PRICES.

**Beat 3 - After Stop 18 | `calculating-desk` | automatic**

**World state:** The build both multipliers result remains visible while the size the alternatives fixture lights.

**Panel/HUD text:** PRICES → RATE

**Dialogue bubbles -** Rhea Dane: "Good thinking. The spending multiplier is 4; the tax multiplier is −3."

**Unlocks/waypoint:** Unlock Stop 19 at `calculating-desk` in PRICES.

**Beat 4 - After Stop 19 | `policy-wall` | automatic**

**World state:** The size the alternatives result remains visible while the choose the first-round plan fixture lights.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Rhea Dane: "Exactly right. Close the gap with 8.7 billion in purchases or an 11.6-billion tax cut."

**Unlocks/waypoint:** Unlock Stop 20 at `policy-wall` in Rate Room.

**Beat 5 - At mission end | `calculating-desk` | automatic**

**World state:** Mission outcome and hook | RATE | automatic World state and dialogue:   State: Page 5 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "Outstanding work. You solved the mission. You gave me a larger number and a slower announcement. Now prove the second test matters."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

PRICES→RATE. Rhea wants an announcement now. S1 derives MPS, S2 both multipliers, and S3 calculates alternatives; that exact target unlocks RATE, where S4 selects the package because only the policy room can authorize it. The first-round tiles light successive spending rounds. Rhea's pressure is legitimate but ignores supply. Multipliers translate a first-round fiscal change into total AD; taxes have a smaller absolute multiplier because households save part of the tax change. Waypoint: “Take the 8.7-billion target to the Rate Room for authorization.”

## Key concepts, explained here

**Objective:** Calculate the spending and tax changes that target the measured gap. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 17 - Split the next crown

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: 16 - MPC/MPS; Keystone: AD/multipliers; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** A spending response is under consideration, so household saving behavior must enter the model.

**Question card story setup - exact player copy:** Households spend 0.75 crown from each additional crown of disposable income and save the rest. Build the identity that fixes MPS, then show why each later spending round is three quarters of the prior round.

**Question card story-science connection - exact player copy:** The saving share determines how much of each extra income round does not return as consumption.

**Question card prompt - exact player copy:** Submit MPS.

**Complete format-specific interaction block:** `derive:{left_side:"MPS",lines:["MPC+MPS=1","MPS=1−0.75","MPS=0.25"],licenses:["income split","algebra","evaluation"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `MPC×MPS=1`
2. `MPS=0.75−1`
3. `MPS=0.75`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Households spend 0.75 crown from each additional crown of disposable income and save the rest.", "From MPC 0.75, derive and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Split the next crown in the form and units requested by the prompt"
  left_side: "MPS"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "MPC+MPS=1", correct: true}
        - {text: "MPC×MPS=1", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "MPS=1−0.75", correct: true}
        - {text: "MPS=0.75−1", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "MPS=0.25", correct: true}
        - {text: "MPS=0.75", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 0.25.

**Answer text:** MPS is 0.25, so one quarter leaks from each round.

**Why:** Saving is the leakage that limits the total demand response.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Saving is the leakage that limits the total demand response.

**State/output:** rounds animate; S2.

## Stop 18 - Build both multipliers

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: 16 - spending/tax multipliers; Keystone: AD; Area: Rate Room; Learning role: PRACTICE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** The household spending share is known and the board needs comparable purchase and tax effects.

**Question card story setup - exact player copy:** With MPS fixed at 0.25 and MPC at 0.75, derive the spending and tax multipliers side by side. The signs must show why higher taxes contract demand while purchases add directly.

**Question card story-science connection - exact player copy:** The two multipliers distinguish the size and direction of spending changes caused by each fiscal instrument.

**Question card prompt - exact player copy:** Submit the ordered pair (spending multiplier, tax multiplier).

**Complete format-specific interaction block:** `derive:{left_side:"multiplier",lines:["kG=1/0.25=4","kT=−0.75/0.25=−3","pair=(4,−3)"],licenses:["spending formula","tax formula","ordered pair"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `kG=1/0.75=1.33`
2. `kT=+0.75/0.25=+3`
3. `pair=(−3,4)`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["With MPS fixed at 0.25 and MPC at 0.75, derive the spending and tax multipliers side by side. The signs must show why higher taxes contract demand while purchases add directly.", "Start with k_G=1/MPS for the government-spending multiplier and k_T=-MPC/MPS for the tax multiplier."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Build both multipliers in the form and units requested by the prompt"
  left_side: "multiplier"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "kG=1/0.25=4", correct: true}
        - {text: "kG=1/0.75=1.33", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "kT=−0.75/0.25=−3", correct: true}
        - {text: "kT=+0.75/0.25=+3", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "pair=(4,−3)", correct: true}
        - {text: "pair=(−3,4)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** (4,−3).

**Answer text:** The spending multiplier is 4; the tax multiplier is −3.

**Why:** Choosing the wrong multiplier would miss the output target before conversion day.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Choosing the wrong multiplier would miss the output target before conversion day.

**State/output:** S3.

## Stop 19 - Size the alternatives

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: 16 - gap closing; Keystone: AD/fiscal; Area: Rate Room; Learning role: COMBINE; Difficulty: L3; Story role: consequence.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** The multipliers are ready and the measured output gap needs translating into policy amounts.

**Question card story setup - exact player copy:** Because the recessionary gap is 34.8 billion and the spending multiplier is 4, calculate the government-purchase increase that closes it. Also calculate the tax cut using multiplier −3, reporting a positive cut size.

**Question card story-science connection - exact player copy:** The purchase increase and tax-cut size let the board compare two ways to close the same modeled gap.

**Question card prompt - exact player copy:** Submit the purchase increase and positive tax-cut size in billion crowns.

**Complete format-specific interaction block:** `derive:{left_side:"ΔG",lines:["ΔG=34.8/4=8.7","ΔT=(+34.8)/(−3)=−11.6","tax cut size=11.6"],licenses:["gap equation","tax sign","magnitude"],correct_order:[1,2,3]}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `ΔG=34.8×4=139.2`
2. `ΔT=(+34.8)/(+3)=+11.6`
3. `tax cut size=−11.6`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Because the recessionary gap is 34.8 billion and the spending multiplier is 4, calculate the government-purchase increase that closes it. Also calculate the tax cut using multiplier −3, reporting a positive cut size.", "Start with gap=k_GΔG for a purchase change and gap=k_TΔT for a tax change, where the gap is 34.8 billion crowns, k_G=4, and k_T=-3."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Size the alternatives in the form and units requested by the prompt"
  left_side: "ΔG"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔG=34.8/4=8.7", correct: true}
        - {text: "ΔG=34.8×4=139.2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔT=(+34.8)/(−3)=−11.6", correct: true}
        - {text: "ΔT=(+34.8)/(+3)=+11.6", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "tax cut size=11.6", correct: true}
        - {text: "tax cut size=−11.6", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** (8.7,11.6) billion, ±0.1.

**Answer text:** Close the gap with 8.7 billion in purchases or an 11.6-billion tax cut.

**Why:** The gap determines the package; the package should not determine the claimed gap.

**Wrong-path feedback:** A different response does not fit the displayed evidence. The gap determines the package; the package should not determine the claimed gap.

**State/output:** 6b plan shows −10.8 residual gap; S4.

## Stop 20 - Choose the first-round plan

**Format/placement:** VALUE, asked by Rhea Dane beside `policy-wall`.

**Metadata:** Concept: 24 - fiscal choice; Keystone: AD/multipliers; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Rhea Dane, at the policy wall in Rate Room.

**Stop reason - exact player copy:** The announced package falls short of the measured target, leaving the funding decision open.

**Question card story setup - exact player copy:** The 6-billion announcement would add only 24 billion to demand and leave a 10.8-billion gap. Fund the option that reaches the measured target and preserves an independent supply-shock review before launch.

**Question card story-science connection - exact player copy:** The allocation identifies a package large enough for the modeled gap while retaining a separate supply-shock review.

**Question card prompt - exact player copy:** Spend exactly 100 plan points and submit the funded pair.

**Complete format-specific interaction block:** `value:{budget:100,options:[{id:"G8_7",cost:65,required:true,axis:"targeted purchases"},{id:"supply_review",cost:35,required:true,axis:"independent shock test"},{id:"G6",cost:45,axis:"fast announcement"},{id:"tax11_6",cost:80,axis:"tax alternative"},{id:"publicity",cost:25,axis:"message"}],correct:["G8_7","supply_review"]}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** Prepare 8.7 billion in purchases and preserve the supply-shock review.

**Why:** Demand stimulus can close a recessionary gap without proving that it can cure cost-push inflation.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Demand stimulus can close a recessionary gap without proving that it can cure cost-push inflation.

**State/output:** Page 5 signed.

## Mission outcome

Mission decision: Prepare an 8.7-billion purchase increase. And keep the supply-shock review. With a multiplier of 4, that package closes the 34.8-billion demand gap. It does not by itself fix rising input costs. The board must now place both forces on one model.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Superb work. The record now supports this decision: Prepare an 8.7-billion purchase increase. Halvern can move forward with clearer prices and fewer risks for ordinary families.

**Header:** MISSION 5 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 15:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The correctly sized package gives the board an executable option.

**Automatic bar change:** READINESS +5

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 76/70/68/61; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The First Round. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After The First Round, a new decision at Halvern's currency changeover requires the team to distinguish Marginal propensity to consume (MPC) from related macroeconomics ideas. Which statement correctly applies Marginal propensity to consume (MPC)?

**Options - exact player copy:**

- A. The fraction saved; MPC plus MPS equals one.
- B. The fraction of an extra dollar of income consumed.
- C. Total demand change divided by the initial policy change.
- D. Saving is the leakage that limits the total demand response.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Marginal propensity to consume (MPC); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Marginal propensity to save (MPS), not Marginal propensity to consume (MPC). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Marginal propensity to consume (MPC) applies because the fraction of an extra dollar of income consumed.
- C: This describes Multiplier, not Marginal propensity to consume (MPC). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes MPC/MPS, not Marginal propensity to consume (MPC). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After The First Round, a new decision at Halvern's currency changeover requires the team to distinguish Marginal propensity to save (MPS) from related macroeconomics ideas. Which description of Marginal propensity to save (MPS) should guide the team's reasoning?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. Total demand change divided by the initial policy change.
- C. The fraction saved; MPC plus MPS equals one.
- D. Saving is the leakage that limits the total demand response.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Marginal propensity to save (MPS); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Marginal propensity to consume (MPC), not Marginal propensity to save (MPS). The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Multiplier, not Marginal propensity to save (MPS). The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Marginal propensity to save (MPS) applies because the fraction saved; MPC plus MPS equals one.
- D: This describes MPC/MPS, not Marginal propensity to save (MPS). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After The First Round, a new decision at Halvern's currency changeover requires the team to distinguish Multiplier from related macroeconomics ideas. Which claim about Multiplier is scientifically defensible?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. The fraction saved; MPC plus MPS equals one.
- C. Saving is the leakage that limits the total demand response.
- D. Total demand change divided by the initial policy change.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Multiplier; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Marginal propensity to consume (MPC), not Multiplier. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Marginal propensity to save (MPS), not Multiplier. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes MPC/MPS, not Multiplier. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Multiplier applies because total demand change divided by the initial policy change.

### Review question 4

**Prompt - exact player copy:** After The First Round, a new decision at Halvern's currency changeover requires the team to distinguish MPC/MPS from related macroeconomics ideas. Which interpretation of MPC/MPS is correct?

**Options - exact player copy:**

- A. Saving is the leakage that limits the total demand response.
- B. The fraction of an extra dollar of income consumed.
- C. The fraction saved; MPC plus MPS equals one.
- D. Total demand change divided by the initial policy change.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for MPC/MPS; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. MPC/MPS applies because saving is the leakage that limits the total demand response.
- B: This describes Marginal propensity to consume (MPC), not MPC/MPS. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Marginal propensity to save (MPS), not MPC/MPS. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Multiplier, not MPC/MPS. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After The First Round, a new decision at Halvern's currency changeover requires the team to distinguish spending/tax multipliers from related macroeconomics ideas. Which statement about spending/tax multipliers would earn course credit?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. Choosing the wrong multiplier would miss the output target before conversion day.
- C. The fraction saved; MPC plus MPS equals one.
- D. Total demand change divided by the initial policy change.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for spending/tax multipliers; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Marginal propensity to consume (MPC), not spending/tax multipliers. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. spending/tax multipliers applies because choosing the wrong multiplier would miss the output target before conversion day.
- C: This describes Marginal propensity to save (MPS), not spending/tax multipliers. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Multiplier, not spending/tax multipliers. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After The First Round, a new decision at Halvern's currency changeover requires the team to distinguish gap closing from related macroeconomics ideas. Which use of gap closing gives the strongest basis for a decision?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. The fraction saved; MPC plus MPS equals one.
- C. The gap determines the package; the package should not determine the claimed gap.
- D. Total demand change divided by the initial policy change.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for gap closing; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Marginal propensity to consume (MPC), not gap closing. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Marginal propensity to save (MPS), not gap closing. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. gap closing applies because the gap determines the package; the package should not determine the claimed gap.
- D: This describes Multiplier, not gap closing. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 6 - Two Shifts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 10 DAYS

**Card title:** Two Shifts

**Go now:** Go to PRICES and meet Lina Saye, price statistics lead, at the AD-AS wall.

**Card body:** The spending plan may help businesses sell more, but it cannot by itself explain why prices rose while production fell. Compare weak customer spending with rising production costs. Decide which problem government spending can address and which needs a different response.

**Objective:** Separate weak demand from cost-push inflation.

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
  - id: changeover_m06_we01
    title: Movement along aggregate demand
    problem: Only the price level falls; government purchases, taxes, and other demand determinants are unchanged. Is this a shift of aggregate demand?
    rule: A change in the vertical-axis price level produces movement along a given aggregate-demand curve.
    steps:
    - The economy moves to a larger quantity of output demanded along that curve.
    - No independent demand determinant was changed to shift the curve itself.
    answer: This is movement along aggregate demand.
    common_mistake: Do not draw a new curve solely because its own axis variable changed.
  - id: changeover_m06_we02
    title: Identify a supply shock
    problem: Energy costs rise suddenly. Output falls while the price level rises. Which aggregate curve change fits?
    rule: Higher production costs shift short-run aggregate supply left, other things equal.
    steps:
    - At a given price level, firms are willing to supply less.
    - The new intersection gives lower output and higher prices.
    answer: A negative supply shock fits this combination, often called stagflation.
    common_mistake: A demand decrease alone would tend to lower both output and prices.
  - id: changeover_m06_we03
    title: Predict a supply decrease
    problem: Production costs rise while consumer demand is unchanged. What happens to competitive equilibrium?
    rule: Higher production costs shift supply left, other things equal.
    steps:
    - At the old price, sellers supply less, creating a shortage.
    - The new intersection has a higher price and lower quantity.
    answer: Price rises and equilibrium quantity falls.
    common_mistake: A price rise caused by supply is not evidence that demand increased.
  - id: changeover_m06_we04
    title: Measure an output gap
    problem: Actual real output is 95 billion and potential output is 100 billion. Find the signed gap and percent gap.
    rule: Gap=actual-potential; percent gap=gap/potential×100%.
    steps:
    - 'Set up the relationship: Gap=actual-potential; percent gap=gap/potential×100%.'
    - gap=95-100=-5 billion; percent gap=-5/100×100%=-5%.
    answer: The economy has a recessionary gap of 5 billion, or 5% below potential.
    common_mistake: Potential output is the reference denominator.
  - id: changeover_m06_we05
    title: Add final expenditures
    problem: An economy has consumption C=60, investment I=20, government purchases G=15, exports X=10 and imports M=5, all in billions. Find GDP.
    rule: Gross domestic product GDP=C+I+G+(X-M).
    steps:
    - 'Set up the relationship: Gross domestic product GDP=C+I+G+(X-M).'
    - net exports=10-5=5; GDP=60+20+15+5=100 billion.
    answer: GDP is 100 billion.
    common_mistake: Imports are subtracted to remove foreign production already included in spending.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Net exports (NX): exports minus imports.

Aggregate demand (AD): consumption plus investment plus government purchases plus net exports (`C+I+G+NX`) at each price level.

Short-run aggregate supply (SRAS): short-run production supplied at each price level.

Stagflation: higher prices with lower output.

#### Primer concepts

- AD slopes down through wealth, interest-rate, and exchange-rate effects; input costs, productivity, taxes, and shocks shift SRAS; demand-pull moves AD right; cost-push moves SRAS left.

#### Equations first needed today
Retrieve the gross domestic product (GDP) identity (`GDP=C+I+G+NX`) and the multipliers; the new work is graphical.

## Main story happening - designer summary

Route PRICES→RATE: S1–S2 at AD-AS wall; the confirmed supply shock unlocks RATE for S3–S4 because only that room can authorize policy. Arrival Lina: “One price can rise for two very different reasons.” Travel waypoint: “Take the two-shift model to the Rate Room.” Rhea concedes that fiscal action should target output, not promise lower energy prices.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at PRICES | `ad-as-wall` | automatic**

**World state:** Arrival | PRICES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Separate weak demand from cost-push inflation.` Lina Saye points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Separate weak demand from cost-push inflation.

**Dialogue bubbles -** Lina Saye: "Start with why ad slopes down. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 21 at `ad-as-wall` in PRICES.

**Beat 2 - After Stop 21 | `ad-as-wall` | automatic**

**World state:** Keep this labeled result visible; Lina Saye says,, and Stop 22 unlocks.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Lina Saye: "Nice work. Lower prices raise real wealth, reduce money demand and interest, and can depreciate the currency, increasing C, I, and NX."

**Unlocks/waypoint:** Unlock Stop 22 at `ad-as-wall` in Statistics Floor.

**Beat 3 - After Stop 22 | `gap-calculator` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `PRICES → RATE` only if the route requires travel, then.

**Panel/HUD text:** PRICES → RATE

**Dialogue bubbles -** Lina Saye: "Good thinking. The imported-energy shock shifts SRAS left."

**Unlocks/waypoint:** Unlock Stop 23 at `gap-calculator` in Rate Room.

**Beat 4 - After Stop 23 | `ad-as-wall` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 24 unlocks.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Lina Saye: "Exactly right. Halvern has a recessionary gap plus an adverse supply shock."

**Unlocks/waypoint:** Unlock Stop 24 at `ad-as-wall` in PRICES.

**Beat 5 - At mission end | `ad-as-wall` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Lina Saye: "Outstanding work. You solved the mission. Use fiscal policy to close the demand gap, not to promise lower supply-driven prices."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Route PRICES→RATE: S1–S2 at AD-AS wall; the confirmed supply shock unlocks RATE for S3–S4 because only that room can authorize policy. Arrival Lina: “One price can rise for two very different reasons.” Travel waypoint: “Take the two-shift model to the Rate Room.” Rhea concedes that fiscal action should target output, not promise lower energy prices.

## Key concepts, explained here

**Objective:** Separate weak demand from cost-push inflation. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 21 - Why AD slopes down

**Format/placement:** CHOICE, asked by Lina Saye beside `ad-as-wall`.

**Metadata:** Concept: 13 - AD slope; Keystone: AD; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Talk to Lina Saye, at the AD–AS wall in Statistics Floor.

**Stop reason - exact player copy:** The policy wall needs a baseline price-level response before staff diagnose a new shock.

**Question card story setup - exact player copy:** The price level falls while taxes, government purchases, and foreign conditions stay fixed. Identify the three channels that increase quantity demanded before moving any curve on the policy wall today.

**Question card story-science connection - exact player copy:** The demand channels explain movement along aggregate demand without inventing a shift in the curve.

**Question card prompt - exact player copy:** Select exactly one explanation from the four distinct choices below.

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "Aggregate demand slopes downward.",
  "series": [
    {
      "name": "AD",
      "points": [
        [
          20,
          95
        ],
        [
          40,
          80
        ],
        [
          60,
          64
        ],
        [
          80,
          49
        ],
        [
          100,
          35
        ]
      ]
    }
  ]
}
```


1. Wealth, interest-rate, and exchange-rate effects. **(correct)**
2. Higher taxes.
3. Higher productivity.
4. Higher wages.

**Choices:**

1. Wealth, interest-rate, and exchange-rate effects. **(correct)**

2. Higher taxes.

3. Higher productivity.

4. Higher wages.

**Complete format-specific interaction block:** `choices:[{id:A,label:"wealth, interest-rate, and exchange-rate effects"},{id:B,label:"higher taxes"},{id:C,label:"higher productivity"},{id:D,label:"higher wages"}]; answer:A; rebuttals:{B:"Higher taxes shift AD left; they do not explain its downward slope.",C:"Higher productivity shifts aggregate supply; it does not create movement along AD.",D:"Higher wages change costs and SRAS; they are not one of the three AD slope effects."}`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Lower prices raise real wealth, reduce money demand and interest, and can depreciate the currency, increasing C, I, and NX.”

**Why:** A price-level change moves along AD; spending conditions shift AD.

**Wrong-path feedback:** (2) **Higher taxes:** Taxes can shift aggregate demand; they do not explain movement along a fixed AD curve as the price level changes. (3) **Higher productivity:** Productivity shifts aggregate supply, not the downward slope of aggregate demand. (4) **Higher wages:** Wages affect costs and supply; they are not the three price-level channels behind AD slope.

**State/output:** slope labels appear.

## Stop 22 - Diagnose the shock

**Format/placement:** DIAGNOSIS, at `ad-as-wall`.

**Metadata:** Concept: 14 - SRAS shifters; Keystone: AD-AS; Area: Rate Room; Learning role: COMBINE; Difficulty: L4; Story role: Twist 1.

**Call - exact player copy:** Go to the AD–AS wall, in Statistics Floor.

**Stop reason - exact player copy:** New price and output readings have arrived and must be compared with the baseline model.

**Question card story setup - exact player copy:** With AD behavior fixed, the panel shows price level up, real output down, oil input cost up 18%, and government purchases unchanged. Select the curve change that fits every reading.

**Question card story-science connection - exact player copy:** The selected curve shift determines whether the shock comes from demand or production costs.

**Question card prompt - exact player copy:** Select one diagnosis and submit the curve change: AD right, AD left, SRAS right, or SRAS left.

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "An adverse supply shock shifts short-run aggregate supply left.",
  "series": [
    {
      "name": "Before",
      "points": [
        [
          25,
          35
        ],
        [
          45,
          48
        ],
        [
          65,
          63
        ],
        [
          85,
          82
        ]
      ]
    },
    {
      "name": "After shock",
      "points": [
        [
          15,
          48
        ],
        [
          35,
          61
        ],
        [
          55,
          76
        ],
        [
          75,
          95
        ]
      ]
    }
  ]
}
```


**Complete format-specific interaction block:** `readings:[PL↑,Y↓,oil↑18%,G flat]; choices:[AD_right,AD_left,SRAS_right,SRAS_left]; answer:SRAS_left`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The imported-energy shock shifts SRAS left.”

**Why:** A leftward SRAS shift explains stagflation without inventing a demand boom.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A leftward SRAS shift explains stagflation without inventing a demand boom.

**State/output:** RATE unlocks.

## Stop 23 - Place both gaps

**Format/placement:** BALLPARK, at `gap-calculator`.

**Metadata:** Concept: 12 - equilibrium/gaps; Keystone: AD-AS; Area: Rate Room; Learning role: RETRIEVE; Difficulty: L4; Story role: synthesis.

**Call - exact player copy:** Go to the gap calculator, in Rate Room.

**Stop reason - exact player copy:** The shock diagnosis must now be reconciled with the already measured output shortfall.

**Question card story setup - exact player copy:** Because SRAS moved left, current output is 685.2 while Yf remains 720.0 billion, and the price level is elevated. Close the model with one recessionary gap and one supply shock.

**Question card story-science connection - exact player copy:** Locating both effects prevents a recessionary gap and a supply disturbance from being treated as the same problem.

**Question card prompt - exact player copy:** Toggle relevant readings and submit the model conclusion.

**Complete format-specific interaction block:** `balance:{streams:[{id:"actual_output",value:685.2,unit:"billion RATE",counts:true},{id:"full_employment_output",value:720.0,unit:"billion RATE",counts:true},{id:"oil_cost_index",value:18,unit:"index points",counts:true},{id:"nominal_output",value:740,unit:"billion RATE",counts:false,reason:"price-level contaminated nominal measure"}],correct:{output_gap:-34.8,shock:"adverse supply shock"},answerText:"Real output is 34.8 billion below full employment while the oil-cost reading identifies an adverse supply shock; nominal output does not count in the real gap."}`

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 23 - Place both gaps"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Toggle relevant readings and submit the model conclusion."
  payload: "`balance:{streams:[{id:\"actual_output\",value:685.2,unit:\"billion RATE\",counts:true},{id:\"full_employment_output\",value:720.0,unit:\"billion RATE\",counts:true},{id:\"oil_cost_index\",value:18,unit:\"index points\",counts:true},{id:\"nominal_output\",value:740,unit:\"billion RATE\",counts:false,reason:\"price-level contaminated nominal measure\"}],correct:{output_gap:-34.8,shock:\"adverse supply shock\"},answerText:\"Real output is 34.8 billion below full employment while the oil-cost reading identifies an adverse supply shock; nominal output does not count in the real gap.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "signed real-output gap"
  unit: "billion RATE"
  inputs:
    - {label: "Actual real output", value: 685.2, unit: "billion RATE"}
    - {label: "Full-employment output", value: 720.0, unit: "billion RATE"}
    - {label: "Oil-cost change", value: 18, unit: "index points", contextOnly: true}
  operation: "actual real output minus full-employment output"
  formula: "output gap=685.2-720.0"
  start: 0
  correctResult: -34.8
  tolerance: 0.1
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Halvern has a recessionary gap plus an adverse supply shock.”

**Why:** One graph can show why lowering inflation and unemployment together is difficult.

**Wrong-path feedback:** A different response does not fit the displayed evidence. One graph can show why lowering inflation and unemployment together is difficult.

**State/output:** Record the result and unlock the next named stop.

## Stop 24 - Aim fiscal policy

**Format/placement:** STRESS, asked by Lina Saye beside `ad-as-wall`.

**Metadata:** Concept: 24 - fiscal dilemma; Keystone: fiscal/AD-AS; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Lina Saye, at the AD–AS wall in Statistics Floor.

**Stop reason - exact player copy:** Weak demand and cost pressure coexist, so the proposed package needs testing across oil-price outcomes.

**Question card story setup - exact player copy:** The model now contains weak demand and cost-push inflation at once. Stress the 8.7-billion package across oil-cost changes from 0% through 18%, then submit the claim that survives every case.

**Question card story-science connection - exact player copy:** The stress test identifies what fiscal expansion can support without promising to eliminate a supply-driven price rise.

**Question card prompt - exact player copy:** Inspect all four settings and submit one surviving conclusion.

**Complete format-specific interaction block:** `assumption:oil shock 0.18 step6; candidates:[closes_demand_gap survives all,lowers_prices survives none,cures_supply survives none]; correct:closes_demand_gap`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 24 - Aim fiscal policy"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Inspect all four settings and submit one surviving conclusion."
  payload: "`assumption:oil shock 0.18 step6; candidates:[closes_demand_gap survives all,lowers_prices survives none,cures_supply survives none]; correct:closes_demand_gap`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "oil shock", min: 0, max: 18, nominal: 9.0, step: 6, unit: "index points"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 9.0, max: 9.0}
      failsAt: 18
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 9.0, max: 18}
      failsAt: 0
    - id: robust_plan
      label: "The keyed result shown by the completed interaction."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 0, max: 18}
  robust: robust_plan
  question: "Inspect all four settings and submit one surviving conclusion."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Use fiscal policy to close the demand gap, not to promise lower supply-driven prices.”

**Why:** Fiscal expansion raises AD; it does not shift damaged SRAS right.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Fiscal expansion raises AD; it does not shift damaged SRAS right.

**State/output:** Page 6 signed.

## Mission outcome

Mission decision: Aim policy at the weak demand gap. Treat the energy shock on its own. More spending can raise output and prices. It cannot fix a fuel supply shock. The claim of broad price abuse does not hold.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was exactly the insight the team needed. You resolved the central question: Aim policy at the weak demand gap. Halvern's families are closer to a currency changeover they can trust.

**Header:** MISSION 6 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 15:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The board clears the profiteering claim and separates demand from supply.

**Automatic bar change:** RESERVE +3; TRUST +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/70/71/65; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Two Shifts. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Long-run aggregate supply (LRAS):** full-employment output, vertical at Yf.

### Review question 1

**Prompt - exact player copy:** After Two Shifts, a new decision at Halvern's currency changeover requires the team to distinguish Long-run aggregate supply (LRAS) from related macroeconomics ideas. Which statement correctly applies Long-run aggregate supply (LRAS)?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "Long-run aggregate supply at potential output.",
  "series": [
    {
      "name": "LRAS",
      "points": [
        [
          75,
          20
        ],
        [
          75,
          100
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Exports minus imports.
- B. Full-employment output, vertical at Yf.
- C. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.
- D. Short-run production supplied at each price level.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Long-run aggregate supply (LRAS); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Net exports (NX), not Long-run aggregate supply (LRAS). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Long-run aggregate supply (LRAS) applies because full-employment output, vertical at Yf.
- C: This describes Aggregate demand (AD), not Long-run aggregate supply (LRAS). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Short-run aggregate supply (SRAS), not Long-run aggregate supply (LRAS). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Two Shifts, a new decision at Halvern's currency changeover requires the team to distinguish Net exports (NX) from related macroeconomics ideas. Which description of Net exports (NX) should guide the team's reasoning?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Value of RATE",
  "yLabel": "Net exports",
  "caption": "A stronger RATE reduces Halvern's net exports.",
  "series": [
    {
      "name": "NX",
      "points": [
        [
          2,
          80
        ],
        [
          3,
          65
        ],
        [
          4,
          50
        ],
        [
          5,
          35
        ],
        [
          6,
          20
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Full-employment output, vertical at Yf.
- B. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.
- C. Exports minus imports.
- D. Short-run production supplied at each price level.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Net exports (NX); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Long-run aggregate supply (LRAS), not Net exports (NX). The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Aggregate demand (AD), not Net exports (NX). The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Net exports (NX) applies because exports minus imports.
- D: This describes Short-run aggregate supply (SRAS), not Net exports (NX). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Two Shifts, a new decision at Halvern's currency changeover requires the team to distinguish Aggregate demand (AD) from related macroeconomics ideas. Which claim about Aggregate demand (AD) is scientifically defensible?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "Aggregate demand slopes downward.",
  "series": [
    {
      "name": "AD",
      "points": [
        [
          20,
          95
        ],
        [
          40,
          80
        ],
        [
          60,
          64
        ],
        [
          80,
          49
        ],
        [
          100,
          35
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Full-employment output, vertical at Yf.
- B. Exports minus imports.
- C. Short-run production supplied at each price level.
- D. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Aggregate demand (AD); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Long-run aggregate supply (LRAS), not Aggregate demand (AD). The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Net exports (NX), not Aggregate demand (AD). The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Short-run aggregate supply (SRAS), not Aggregate demand (AD). The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Aggregate demand (AD) applies because consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

### Review question 4

**Prompt - exact player copy:** After Two Shifts, a new decision at Halvern's currency changeover requires the team to distinguish Short-run aggregate supply (SRAS) from related macroeconomics ideas. Which interpretation of Short-run aggregate supply (SRAS) is correct?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "An adverse supply shock shifts short-run aggregate supply left.",
  "series": [
    {
      "name": "Before",
      "points": [
        [
          25,
          35
        ],
        [
          45,
          48
        ],
        [
          65,
          63
        ],
        [
          85,
          82
        ]
      ]
    },
    {
      "name": "After shock",
      "points": [
        [
          15,
          48
        ],
        [
          35,
          61
        ],
        [
          55,
          76
        ],
        [
          75,
          95
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Short-run production supplied at each price level.
- B. Full-employment output, vertical at Yf.
- C. Exports minus imports.
- D. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Short-run aggregate supply (SRAS); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. Short-run aggregate supply (SRAS) applies because short-run production supplied at each price level.
- B: This describes Long-run aggregate supply (LRAS), not Short-run aggregate supply (SRAS). The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Net exports (NX), not Short-run aggregate supply (SRAS). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Aggregate demand (AD), not Short-run aggregate supply (SRAS). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Two Shifts, a new decision at Halvern's currency changeover requires the team to distinguish Stagflation from related macroeconomics ideas. Which statement about Stagflation would earn course credit?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "An adverse supply shock shifts short-run aggregate supply left.",
  "series": [
    {
      "name": "Before",
      "points": [
        [
          25,
          35
        ],
        [
          45,
          48
        ],
        [
          65,
          63
        ],
        [
          85,
          82
        ]
      ]
    },
    {
      "name": "After shock",
      "points": [
        [
          15,
          48
        ],
        [
          35,
          61
        ],
        [
          55,
          76
        ],
        [
          75,
          95
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Full-employment output, vertical at Yf.
- B. Higher prices with lower output.
- C. Exports minus imports.
- D. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Stagflation; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Long-run aggregate supply (LRAS), not Stagflation. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Stagflation applies because higher prices with lower output.
- C: This describes Net exports (NX), not Stagflation. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Aggregate demand (AD), not Stagflation. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Two Shifts, a new decision at Halvern's currency changeover requires the team to distinguish AD slope from related macroeconomics ideas. Which use of AD slope gives the strongest basis for a decision?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "Aggregate demand slopes downward.",
  "series": [
    {
      "name": "AD",
      "points": [
        [
          20,
          95
        ],
        [
          40,
          80
        ],
        [
          60,
          64
        ],
        [
          80,
          49
        ],
        [
          100,
          35
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Full-employment output, vertical at Yf.
- B. Exports minus imports.
- C. A price-level change moves along AD; spending conditions shift AD.
- D. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for AD slope; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Long-run aggregate supply (LRAS), not AD slope. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Net exports (NX), not AD slope. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. AD slope applies because a price-level change moves along AD; spending conditions shift AD.
- D: This describes Aggregate demand (AD), not AD slope. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 7 - Money That Moved

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 9 DAYS

**Card title:** Money That Moved

**Go now:** Go to NOTES and meet Tomas Arendt, bank supervision lead, at the note scale.

**Card body:** Sacks of old banknotes are returning to banks, making it look as though money is disappearing. But cash can become money in bank accounts. Follow the deposits and lending records, then decide whether Halvern has less money available or is holding it differently.

**Objective:** Trace old cash into deposits and lending capacity.

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
  - id: changeover_m07_we01
    title: Narrow and broader money
    problem: For this simplified classification, currency is 20, checking deposits 60, and additional savings-type balances 40 billion. Find narrow and broader totals.
    rule: Narrow total=currency+checking; broader total=narrow+the specified additional balances.
    steps:
    - 'Set up the relationship: Narrow total=currency+checking; broader total=narrow+the specified additional balances.'
    - narrow=20+60=80; broader=80+40=120 billion.
    answer: The two totals are 80 and 120 billion under the stated classification.
    common_mistake: Do not add a narrow total twice when constructing the broader one.
  - id: changeover_m07_we02
    title: Required and excess reserves
    problem: Deposits are 100 million, reserves 15 million, and the hypothetical required-reserve ratio is 10%. Find required and excess reserves.
    rule: Required reserves=ratio×deposits; excess=actual-required.
    steps:
    - 'Set up the relationship: Required reserves=ratio×deposits; excess=actual-required.'
    - required=0.10(100)=10; excess=15-10=5 million.
    answer: The bank has 5 million above its required reserve in this teaching model.
    common_mistake: The assumed reserve ratio is a problem input, not a claim about current policy.
  - id: changeover_m07_we03
    title: A theoretical lending ceiling
    problem: A simplified banking system has excess reserves of 4 million and reserve ratio 0.20, with no cash leakage or extra reserve holding. Find maximum new deposits.
    rule: Simple money multiplier=1/ratio; deposit expansion ceiling=excess×multiplier.
    steps:
    - 'Set up the relationship: Simple money multiplier=1/ratio; deposit expansion ceiling=excess×multiplier.'
    - multiplier=1/0.20=5; maximum expansion=4(5)=20 million.
    answer: The theoretical ceiling is 20 million under these assumptions.
    common_mistake: The ceiling is not a prediction that every possible loan will be made.
  - id: changeover_m07_we04
    title: Keep transfers out of production
    problem: The government pays $100 in benefits; the recipient buys a newly produced $100 domestic service. How much enters GDP?
    rule: Transfers are not payment for current production; final service purchases are.
    steps:
    - The benefit payment itself adds no production to GDP.
    - The service purchase contributes $100 as consumption.
    answer: Count $100 once, not $200.
    common_mistake: A transfer and the spending it finances are not two separate outputs.
  - id: changeover_m07_we05
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Narrow money (M1): cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.

Required reserves: deposits times reserve ratio.

Excess reserves: total minus required reserves.

#### Primer concepts

- cash is most liquid; bonds and stocks usually offer return with risk; bank assets include reserves and loans, liabilities include deposits; one bank lends excess reserves, the system creates the multiplied maximum.

#### Equations first needed today
`required=deposits×rr`; `excess=total reserves−required`; `money multiplier=1/rr`; `maximum new money=excess×multiplier`. Job: find the ceiling. Symbols: rr reserve ratio. Why: ensure changeover cash can return through deposits.

## Main story happening - designer summary

NOTES→BANKS, unlocked when S2 traces sacks to deposits. Tomas stops a truck from calling the money destroyed. S3–S4 use the ledger hall. Cash, checking, savings and funds establish aggregates; balance sheets and fractional reserves explain creation.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Note Hall | `note-scale` | automatic**

**World state:** Arrival | NOTES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Trace old cash into deposits and lending capacity.` Tomas Arendt points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Trace old cash into deposits and lending capacity.

**Dialogue bubbles -** Tomas Arendt: "Start with count m1 and m2. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `note-scale` in Note Hall.

**Beat 2 - After Stop 25 | `custody-desk` | automatic**

**World state:** Keep this labeled result visible; Tomas Arendt says,, and Stop 26 unlocks.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Tomas Arendt: "Nice work. M1 is 300 and M2 is 500 billion crowns."

**Unlocks/waypoint:** Unlock Stop 26 at `custody-desk` in Note Hall.

**Beat 3 - After Stop 26 | `balance-sheet-desk` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `NOTES → BANKS` only if the route requires travel, then.

**Panel/HUD text:** NOTES → BANKS

**Dialogue bubbles -** Tomas Arendt: "Good thinking. Most returned cash migrated into deposits; payment failures did not rise."

**Unlocks/waypoint:** Unlock Stop 27 at `balance-sheet-desk` in Bank Supervision.

**Beat 4 - After Stop 27 | `money-market-console` | automatic**

**World state:** Preserve this result on the BANKS decision fixture; The character asks for the promised mission decision, and Stop 28 unlocks.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Tomas Arendt: "Exactly right. Required reserves are 10, excess 8, multiplier 10, and maximum new money 80 billion."

**Unlocks/waypoint:** Unlock Stop 28 at `money-market-console` in Bank Supervision.

**Beat 5 - At mission end | `note-scale` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Arendt: "Outstanding work. You solved the mission. The returns show migration from cash into deposits, not a money-stock contraction."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** NOTES → BANKS. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

NOTES→BANKS, unlocked when S2 traces sacks to deposits. Tomas stops a truck from calling the money destroyed. S3–S4 use the ledger hall. Cash, checking, savings and funds establish aggregates; balance sheets and fractional reserves explain creation.

## Key concepts, explained here

**Objective:** Trace old cash into deposits and lending capacity. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 25 - Count M1 and M2

**Format/placement:** DERIVE, at `note-scale`.

**Metadata:** Concept: 18 - aggregates; Keystone: money; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the note scale, in Note Hall.

**Stop reason - exact player copy:** Returned-note sacks are arriving, but the money aggregates need a baseline before interpreting them.

**Question card story setup - exact player copy:** Halvern records cash 80, checking 220, savings 140, and money-market funds 60 billion crowns. Build M1 and M2 before interpreting the returned-note sacks clearly in the Rate Book before proceeding.

**Question card story-science connection - exact player copy:** The two money totals distinguish spendable balances from the broader stock that includes savings instruments.

**Question card prompt - exact player copy:** Submit the narrow money total M1 and the broader money total M2 in billions.

**Complete format-specific interaction block:** `derive:{left_side:"money total","goal":"M1 and M2 in billions","givens":["currency=80","checking deposits=220","savings=140","small time deposits=60"],"lines":[{"id":"L1","expression":"M1=80+220=300 billion","license":"state governing relationship"},{"id":"L2","expression":"M2=M1+140+60=500 billion","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["M1=80 billion","M2=420 billion"],"correct_result":"(300,500) billion","answerText":"M1 is 300 billion and M2 is 500 billion; savings and small time deposits enter M2, not M1."}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `M1=currency only=80 billion`
2. `M2=M1+140=440 billion`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["currency=80", "checking deposits=220", "savings=140", "small time deposits=60"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Count M1 and M2 in the form and units requested by the prompt"
  left_side: "money total"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "M1=80+220=300 billion", correct: true}
        - {text: "M1=currency only=80 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "M2=M1+140+60=500 billion", correct: true}
        - {text: "M2=M1+140=440 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** (300,500), ±0.1.

**Answer text:** “M1 is 300 and M2 is 500 billion crowns.”

**Why:** Cash can fall while deposits keep broader money available.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Cash can fall while deposits keep broader money available.

**State/output:** Record the result and unlock the next named stop.

## Stop 26 - Follow the sacks

**Format/placement:** TRACE, at `custody-desk`.

**Metadata:** Concept: 18 - money functions; Keystone: money; Area: Bank Supervision; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the custody desk, in Note Hall.

**Stop reason - exact player copy:** The money baseline is recorded and the destination of returned notes remains unclear.

**Question card story setup - exact player copy:** With M1 and M2 counted, trace the note-weight alarm, checking rise, savings rise, and payment failures to their upstream records. Decide whether returned notes vanished or entered bank liabilities today.

**Question card story-science connection - exact player copy:** Tracing bank entries determines whether the notes disappeared from money holdings or changed their form.

**Question card prompt - exact player copy:** Open all dependencies and submit the conclusion.

**Complete format-specific interaction block:** `trace:{channels:[{id:"note_weight",label:"returned-note weight",dependency:"conversion intake ledger",target_dependent:true},{id:"checking",label:"checking-deposit rise",dependency:"conversion intake ledger",target_dependent:true},{id:"savings",label:"savings-deposit rise",dependency:"bank account ledger",independent:true},{id:"payment_failures",label:"payment-failure count",dependency:"payment network",independent:true}],shared_upstream:"conversion intake ledger",correct_conclusion:"cash migrated to deposits while payment failures stayed flat",answerText:"The note and checking channels share the intake ledger; independent savings and payment data show money moved into deposits rather than vanishing."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 26 - Follow the sacks"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open all dependencies and submit the conclusion."
  payload: "`trace:{channels:[{id:\"note_weight\",label:\"returned-note weight\",dependency:\"conversion intake ledger\",target_dependent:true},{id:\"checking\",label:\"checking-deposit rise\",dependency:\"conversion intake ledger\",target_dependent:true},{id:\"savings\",label:\"savings-deposit rise\",dependency:\"bank account ledger\",independent:true},{id:\"payment_failures\",label:\"payment-failure count\",dependency:\"payment network\",independent:true}],shared_upstream:\"conversion intake ledger\",correct_conclusion:\"cash migrated to deposits while payment failures stayed flat\",answerText:\"The note and checking channels share the intake ledger; independent savings and payment data show money moved into deposits rather than vanishing.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: note_weight, label: "Returned-note weight", reading: "84 t received", dependency: conversion_intake_ledger}
    - {id: checking, label: "Checking-deposit rise", reading: "+84 million RATE", dependency: conversion_intake_ledger}
    - {id: savings, label: "Savings-deposit rise", reading: "+19 million RATE", dependency: bank_account_ledger, independent: true}
    - {id: payment_failures, label: "Payment-failure count", reading: "0.5% of payments, unchanged", dependency: payment_network, independent: true}
  sharedUpstream: conversion_intake_ledger
  correctConclusion: "Cash migrated to deposits while payment failures stayed flat."
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Most returned cash migrated into deposits; payment failures did not rise.”

**Why:** Agreement among cash-return channels is not independent proof of contraction.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Agreement among cash-return channels is not independent proof of contraction.

**State/output:** BANKS waypoint.

## Stop 27 - Bank ceiling

**Format/placement:** DERIVE, at `balance-sheet-desk`.

**Metadata:** Concept: 20 - reserves/multiplier; Keystone: money creation; Area: Rate Room; Learning role: PRACTICE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the balance-sheet desk, in Bank Supervision.

**Stop reason - exact player copy:** The deposit records are reconciled and the bank's lending ceiling needs checking.

**Question card story setup - exact player copy:** Because 100 billion in deposits reached the banks, total reserves are 18 billion and the required reserve ratio is 10%. Derive required reserves, excess reserves, multiplier, and maximum system creation.

**Question card story-science connection - exact player copy:** Required and excess reserves determine the simplified maximum deposit expansion, not a promise of actual lending.

**Question card prompt - exact player copy:** Submit required reserves, excess reserves, the multiplier, and maximum new money.

**Complete format-specific interaction block:** `derive:{left_side:"R","goal":"required reserves, excess reserves, multiplier, and maximum new money","givens":["deposits=100 billion","actual reserves=18 billion","reserve ratio=0.10"],"lines":[{"id":"L1","expression":"required reserves=100×0.10=10 billion","license":"state governing relationship"},{"id":"L2","expression":"excess reserves=18-10=8 billion","license":"substitute displayed values"},{"id":"L3","expression":"simple multiplier=1/0.10=10","license":"simplify with units"},{"id":"L4","expression":"maximum new money=8×10=80 billion","license":"simplify with units"}],"keyed_order":["L1","L2","L3","L4"],"decoys":["maximum new money=8 billion","multiplier=0.10"],"correct_result":"(10 billion,8 billion,10,80 billion)","answerText":"Required reserves are 10 billion, excess reserves 8 billion, the multiplier 10, and the theoretical maximum new money 80 billion."}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `required reserves=100/0.10=1,000 billion`
2. `excess reserves=18+10=28 billion`
3. `simple multiplier=0.10`
4. `maximum new money=8 billion`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["deposits=100 billion", "actual reserves=18 billion", "reserve ratio=0.10"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Bank ceiling in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "required reserves=100×0.10=10 billion", correct: true}
        - {text: "required reserves=100/0.10=1,000 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "excess reserves=18-10=8 billion", correct: true}
        - {text: "excess reserves=18+10=28 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "simple multiplier=1/0.10=10", correct: true}
        - {text: "simple multiplier=0.10", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "maximum new money=8×10=80 billion", correct: true}
        - {text: "maximum new money=8 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** (10b,8b,10,80b), ±0.1.

**Answer text:** “Required reserves are 10, excess 8, multiplier 10, and maximum new money 80 billion.”

**Why:** The maximum is a capacity ceiling, not a promise that borrowers will demand every loan.

**Wrong-path feedback:** A different response does not fit the displayed evidence. The maximum is a capacity ceiling, not a promise that borrowers will demand every loan.

**State/output:** Record the result and unlock the next named stop.

## Stop 28 - Migration or contraction

**Format/placement:** DIAGNOSIS, at `money-market-console`.

**Metadata:** Concept: 18 - money-stock diagnosis; Keystone: money/GDP; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the money-market console, in Bank Supervision.

**Stop reason - exact player copy:** The sacks and reserve calculations are complete, allowing the contraction claim to be tested.

**Question card story setup - exact player copy:** Deposit growth now matches returned cash, M1 remains stable, M2 rises, excess reserves are positive, and payment failures stay flat. Select the diagnosis that fits every reading in the Rate Book.

**Question card story-science connection - exact player copy:** The diagnosis distinguishes a shift between forms of money from a fall in the relevant money stock.

**Question card prompt - exact player copy:** Select one diagnosis - cash-to-deposit migration, money-stock contraction, bank run, or hyperinflation - and submit the conclusion.

**Complete format-specific interaction block:** `answer:migration; alternatives:[contraction,run,hyperinflation]`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The returns show migration from cash into deposits, not a money-stock contraction.”

**Why:** A visible fall in currency can be portfolio migration rather than a fall in spendable money.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A visible fall in currency can be portfolio migration rather than a fall in spendable money.

**State/output:** Page 7 signed.

## Mission outcome

Mission decision: Returned notes moved into bank deposits. They did not vanish from the money supply. Banks still have spare reserves. Payments remain sound. The board must now set the real cost of loans.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You saw through the trap. Your analysis established the point that matters: Returned notes moved into bank deposits. The Currency Board can now protect buying power with a sounder decision.

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 16:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Cash handling consumes staff while the deposit trail prevents a false alarm.

**Automatic bar change:** RESERVE −4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/74/67/72; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Money That Moved. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Money That Moved, a new decision at Halvern's currency changeover requires the team to distinguish Narrow money (M1) from related macroeconomics ideas. Which statement correctly applies Narrow money (M1)?

**Options - exact player copy:**

- A. Deposits times reserve ratio.
- B. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- C. Total minus required reserves.
- D. Cash can fall while deposits keep broader money available.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Narrow money (M1); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Required reserves, not Narrow money (M1). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Narrow money (M1) applies because cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- C: This describes Excess reserves, not Narrow money (M1). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes aggregates, not Narrow money (M1). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Money That Moved, a new decision at Halvern's currency changeover requires the team to distinguish Required reserves from related macroeconomics ideas. Which description of Required reserves should guide the team's reasoning?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Total minus required reserves.
- C. Deposits times reserve ratio.
- D. Cash can fall while deposits keep broader money available.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Required reserves; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Narrow money (M1), not Required reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Excess reserves, not Required reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Required reserves applies because deposits times reserve ratio.
- D: This describes aggregates, not Required reserves. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Money That Moved, a new decision at Halvern's currency changeover requires the team to distinguish Excess reserves from related macroeconomics ideas. Which claim about Excess reserves is scientifically defensible?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Deposits times reserve ratio.
- C. Cash can fall while deposits keep broader money available.
- D. Total minus required reserves.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Excess reserves; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Narrow money (M1), not Excess reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Required reserves, not Excess reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes aggregates, not Excess reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Excess reserves applies because total minus required reserves.

### Review question 4

**Prompt - exact player copy:** After Money That Moved, a new decision at Halvern's currency changeover requires the team to distinguish aggregates from related macroeconomics ideas. Which interpretation of aggregates is correct?

**Options - exact player copy:**

- A. Cash can fall while deposits keep broader money available.
- B. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- C. Deposits times reserve ratio.
- D. Total minus required reserves.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for aggregates; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. aggregates applies because cash can fall while deposits keep broader money available.
- B: This describes Narrow money (M1), not aggregates. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Required reserves, not aggregates. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Excess reserves, not aggregates. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Money That Moved, a new decision at Halvern's currency changeover requires the team to distinguish money functions from related macroeconomics ideas. Which statement about money functions would earn course credit?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Agreement among cash-return channels is not independent proof of contraction.
- C. Deposits times reserve ratio.
- D. Total minus required reserves.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for money functions; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Narrow money (M1), not money functions. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. money functions applies because agreement among cash-return channels is not independent proof of contraction.
- C: This describes Required reserves, not money functions. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Excess reserves, not money functions. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Money That Moved, a new decision at Halvern's currency changeover requires the team to distinguish reserves/multiplier from related macroeconomics ideas. Which use of reserves/multiplier gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Deposits times reserve ratio.
- C. The maximum is a capacity ceiling, not a promise that borrowers will demand every loan.
- D. Total minus required reserves.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for reserves/multiplier; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Narrow money (M1), not reserves/multiplier. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Required reserves, not reserves/multiplier. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. reserves/multiplier applies because the maximum is a capacity ceiling, not a promise that borrowers will demand every loan.
- D: This describes Excess reserves, not reserves/multiplier. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 8 - The Rate People Feel

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 8 DAYS

**Card title:** The Rate People Feel

**Go now:** Go to BANKS and meet Tomas Arendt at the bond-and-money panel.

**Card body:** Bank deposits are stable, but higher interest rates could make borrowing harder during the currency change. Rising prices also affect what borrowers really repay. Compare the stated rate with the cost after expected inflation, then decide whether a rate increase is justified now.

**Objective:** Distinguish nominal and real rates before tightening.

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
  - id: changeover_m08_we01
    title: Use Fisher's approximation
    problem: The nominal interest rate is 6% and expected inflation is 4%. Estimate the real rate.
    rule: Real rate≈nominal rate-expected inflation.
    steps:
    - 'Set up the relationship: Real rate≈nominal rate-expected inflation.'
    - real rate≈6%-4%=2%.
    answer: The approximate expected real borrowing rate is 2%.
    common_mistake: Use expected inflation for the expected real rate, not an unrelated past rate.
  - id: changeover_m08_we02
    title: Bond price and yield
    problem: A one-year bond pays $110 at maturity. Compare its return if purchased for $100 versus $110.
    rule: One-period yield=(maturity payment-purchase price)/purchase price.
    steps:
    - 'Set up the relationship: One-period yield=(maturity payment-purchase price)/purchase price.'
    - first yield=(110-100)/100=10%; second yield=(110-110)/110=0%.
    answer: With the same payment, a higher purchase price lowers the yield.
    common_mistake: A fixed bond payment does not imply a fixed yield at every market price.
  - id: changeover_m08_we03
    title: Trace expansionary policy
    problem: In a simplified money-market model, the central bank increases money supply while money demand is unchanged. Trace the usual demand channel.
    rule: A greater money supply lowers the equilibrium nominal interest rate in this model.
    steps:
    - Lower interest rates encourage interest-sensitive investment, other things equal.
    - Higher investment raises aggregate demand.
    answer: The modeled channel is money supply up → rate down → investment up → demand up.
    common_mistake: The transmission depends on the stated model and other conditions.
  - id: changeover_m08_we04
    title: Compare pay with prices
    problem: A wage rises from $10 to $11 per hour while the price index rises from 100 to 110. Did purchasing power rise?
    rule: Real wage in base-year dollars=nominal wage×100/price index.
    steps:
    - 'Set up the relationship: Real wage in base-year dollars=nominal wage×100/price index.'
    - old real wage=10×100/100=10; new real wage=11×100/110=10.
    answer: Purchasing power per hour is unchanged.
    common_mistake: A higher dollar wage need not buy more goods.
  - id: changeover_m08_we05
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

Money demand: desired liquid balances, lower at higher nominal interest.

Money supply: central-bank-set quantity, vertical in the model.

Real interest: nominal interest minus expected inflation.

#### Primer concepts

- above equilibrium, money surplus leads people to buy bonds and the rate falls; bond prices and interest rates move inversely; menu and shoe-leather costs accompany inflation; unexpected inflation helps borrowers and hurts lenders.

#### Equations first needed today
`nominal i = real i + expected inflation`. Job: recover real borrowing cost. Symbols: all rates annual percentages. Why: headline inflation may not equal expected inflation.

## Main story happening - designer summary

BANKS→RATE after the equilibrium simulation. Tomas wants a cushion; Mara wants the real burden measured. The route is causal because only RATE authorizes a change.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at BANKS | `money-market-console` | automatic**

**World state:** Arrival | BANKS | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Distinguish nominal and real rates before tightening.` Tomas Arendt points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Distinguish nominal and real rates before tightening.

**Dialogue bubbles -** Tomas Arendt: "Start with clear money surplus. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `money-market-console` in BANKS.

**Beat 2 - After Stop 29 | `balance-sheet-desk` | automatic**

**World state:** Keep this labeled result visible; Tomas Arendt says,, and Stop 30 unlocks.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Tomas Arendt: "Nice work. A 30-billion surplus clears through bond buying and a rate fall to 4%."

**Unlocks/waypoint:** Unlock Stop 30 at `balance-sheet-desk` in Bank Supervision.

**Beat 3 - After Stop 30 | `policy-wall` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `BANKS → RATE` only if the route requires travel, then.

**Panel/HUD text:** BANKS → RATE

**Dialogue bubbles -** Tomas Arendt: "Good thinking. The real rate is 1.5%, already 0.5 point tighter."

**Unlocks/waypoint:** Unlock Stop 31 at `policy-wall` in Rate Room.

**Beat 4 - After Stop 31 | `bond-panel` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 32 unlocks.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Tomas Arendt: "Exactly right. Sell bonds → Ms falls → i rises → I falls → AD shifts left → output and price level fall."

**Unlocks/waypoint:** Unlock Stop 32 at `bond-panel` in BANKS.

**Beat 5 - At mission end | `money-market-console` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Arendt: "Outstanding work. You solved the mission. Do not raise now; the hike tightens real borrowing conditions in every tested case."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** BANKS → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

BANKS→RATE after the equilibrium simulation. Tomas wants a cushion; Mara wants the real burden measured. The route is causal because only RATE authorizes a change.

## Key concepts, explained here

**Objective:** Distinguish nominal and real rates before tightening. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 29 - Clear money surplus

**Format/placement:** VERIFY, at `money-market-console`.

**Metadata:** Concept: 21 - money market; Keystone: interest markets; Area: Bank Supervision; Learning role: INTRODUCE; Difficulty: L3; Story role: experiment.

**Call - exact player copy:** Go to the money-market console, in Bank Supervision.

**Stop reason - exact player copy:** At the posted interest rate, money supplied exceeds the amount people want to hold.

**Question card story setup - exact player copy:** Money supplied is 300 billion, but at 5% people demand only 270 billion. Predict the bond trade and rate direction before operating the market panel clearly for the next board decision.

**Question card story-science connection - exact player copy:** The bond-market response determines the direction of the interest-rate adjustment needed to clear that surplus.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Subtract money demand of 270 billion from money supply of 300 billion and submit the surplus in billions. **OPERATE:** Run the bond-market adjustment. **MEASURE:** Read the new bond price and nominal rate. **INTERPRET:** Submit the trade direction and rate direction.

**Complete format-specific interaction block:** `verify:{prediction:{equation:"surplus=money supplied-money demanded",inputs:{Ms:300,Md:270,unit:"billion"},correct:30,tolerance:0.1,submit_unit:"billion"},lock:"bond-market action stays locked until 30 billion is committed",action:"run adjustment at the displayed 5% starting rate",measurements:{bond_price:"rises",nominal_rate:"falls from 5% to 4%"},conclusion:"surplus causes bond buying and a lower rate"}`

**Correct result:** A 30-billion money surplus causes bond buying, raises bond prices, and lowers the nominal rate from 5% to 4%.

**Answer text:** “A 30-billion surplus clears through bond buying and a rate fall to 4%.”

**Why:** A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**State/output:** Record the result and unlock the next named stop.

## Stop 30 - Real burden

**Format/placement:** DERIVE, at `balance-sheet-desk`.

**Metadata:** Concept: 23 - Fisher; Keystone: inflation/rates; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the balance-sheet desk, in Bank Supervision.

**Stop reason - exact player copy:** The nominal rate has changed, but borrowers' inflation-adjusted burden still needs comparison.

**Question card story setup - exact player copy:** With equilibrium nominal interest at 4.0% and expected inflation at 2.5%, rearrange Fisher's equation and calculate the real rate. Compare it with last month's 1.0% real rate.

**Question card story-science connection - exact player copy:** The real interest rate shows whether borrowing became more restrictive despite the nominal headline.

**Question card prompt - exact player copy:** Submit today's real rate and its change in percentage points.

**Complete format-specific interaction block:** `derive:{left_side:"real rate","goal":"real rate and monthly change","givens":["nominal rate=4.0%","expected inflation=2.5%","last real rate=1.0%"],"lines":[{"id":"L1","expression":"real rate=nominal rate-expected inflation","license":"state governing relationship"},{"id":"L2","expression":"real rate=4.0%-2.5%=1.5%","license":"substitute displayed values"},{"id":"L3","expression":"change=1.5%-1.0%=+0.5 percentage point","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["6.5%","-1.5%"],"correct_result":"1.5%, up 0.5 percentage point","answerText":"The real rate is 1.5%, which is 0.5 percentage point above last month."}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `real rate=nominal rate+expected inflation`
2. `real rate=4.0%+2.5%=6.5%`
3. `change=1.0%−1.5%=−0.5 percentage point`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["nominal rate=4.0%", "expected inflation=2.5%", "last real rate=1.0%"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Real burden in the form and units requested by the prompt"
  left_side: "real rate"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "real rate=nominal rate-expected inflation", correct: true}
        - {text: "real rate=nominal rate+expected inflation", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "real rate=4.0%-2.5%=1.5%", correct: true}
        - {text: "real rate=4.0%+2.5%=6.5%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "change=1.5%-1.0%=+0.5 percentage point", correct: true}
        - {text: "change=1.0%−1.5%=−0.5 percentage point", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 1.5%, +0.5 pp.

**Answer text:** “The real rate is 1.5%, already 0.5 point tighter.”

**Why:** Tightness depends on the real rate, not on whether the nominal number looks high or low.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Tightness depends on the real rate, not on whether the nominal number looks high or low.

**State/output:** Record the result and unlock the next named stop.

## Stop 31 - Tool transmission

**Format/placement:** SEQUENCE, at `policy-wall`.

**Metadata:** Concept: 25 - monetary chain; Keystone: AD; Area: Bank Supervision; Learning role: INTRODUCE; Difficulty: L3; Story role: travel payoff.

**Call - exact player copy:** Go to the policy wall, in Rate Room.

**Stop reason - exact player copy:** The board is considering a monetary tool and needs its route to spending made explicit.

**Question card story setup - exact player copy:** Include the money-market step and the investment response in the Rate Book.

**Question card story-science connection - exact player copy:** The transmission chain connects the money-market change to investment and aggregate demand.

**Question card prompt - exact player copy:** Place six cards in order and submit.

**Complete format-specific interaction block:** `cards:[sell bonds,Ms falls,nominal i rises,I falls,AD left,Y and PL fall]; order:same`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Sell bonds → Ms falls → i rises → I falls → AD shifts left → output and price level fall.”

**Why:** A tool matters only through the chain it sets off.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A tool matters only through the chain it sets off.

**State/output:** Record the result and unlock the next named stop.

## Stop 32 - Raise now

**Format/placement:** STRESS, asked by Tomas Arendt beside `bond-panel`.

**Metadata:** Concept: 25 - monetary choice; Keystone: AD-AS/Fisher; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Tomas Arendt, at the bond panel in Bank Supervision.

**Stop reason - exact player copy:** A proposed rate rise faces a recessionary gap and uncertain expected inflation.

**Question card story setup - exact player copy:** The recessionary gap remains 34.8 billion while expected inflation could be 2% to 3%. Stress a one-point nominal hike across that range and select the claim that always survives.

**Question card story-science connection - exact player copy:** The real-rate sensitivity test shows which effects of tightening persist across the stated inflation expectations.

**Question card prompt - exact player copy:** Inspect all settings and submit one policy choice: “do not raise now.”

**Complete format-specific interaction block:** `range:2.3 step.25; candidates:[hike tightens survives all,hike closes gap none,hike shifts SRAS none]; correct:hike tightens`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 32 - Raise now"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Inspect all settings and submit one policy choice: “do not raise now.”"
  payload: "`range:2.3 step.25; candidates:[hike tightens survives all,hike closes gap none,hike shifts SRAS none]; correct:hike tightens`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "inflation expectation", min: 2, max: 3, nominal: 2.5, step: 0.25, unit: "%"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 2.5, max: 2.5}
      failsAt: 3
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 2.5, max: 3}
      failsAt: 2
    - id: robust_plan
      label: "The keyed result shown by the completed interaction."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 2, max: 3}
  robust: robust_plan
  question: "Inspect all settings and submit one policy choice: “do not raise now.”"
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Do not raise now; the hike tightens real borrowing conditions in every tested case.”

**Why:** A hike raises the real rate across the range and worsens weak demand.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A hike raises the real rate across the range and worsens weak demand.

**State/output:** Page 8 signed.

## Mission outcome

Mission decision: Do not raise rates now. The real rate is already 1.5%. And a hike would reduce investment and AD while output is below capacity. The board holds the tool. Foreign buyers then flood the bond desk.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Impressive work under pressure. The team can now act on a firm conclusion: Do not raise rates now. Shops, banks, and workers have a safer path through the changeover.

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 15:30

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Avoiding an unnecessary hike protects price and output planning.

**Automatic bar change:** PRICES +3

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/80/75/75; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Rate People Feel. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After The Rate People Feel, a new decision at Halvern's currency changeover requires the team to distinguish Money demand from related macroeconomics ideas. Which statement correctly applies Money demand?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity of money",
  "yLabel": "Nominal interest rate (%)",
  "caption": "Money demand and the fixed money supply.",
  "series": [
    {
      "name": "Money demand",
      "points": [
        [
          20,
          8
        ],
        [
          40,
          6
        ],
        [
          60,
          4
        ],
        [
          80,
          2
        ]
      ]
    },
    {
      "name": "Money supply",
      "points": [
        [
          55,
          1
        ],
        [
          55,
          9
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Central-bank-set quantity, vertical in the model.
- B. Desired liquid balances, lower at higher nominal interest.
- C. Nominal interest minus expected inflation.
- D. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Money demand; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Money supply, not Money demand. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Money demand applies because desired liquid balances, lower at higher nominal interest.
- C: This describes Real interest, not Money demand. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes money market, not Money demand. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After The Rate People Feel, a new decision at Halvern's currency changeover requires the team to distinguish Money supply from related macroeconomics ideas. Which description of Money supply should guide the team's reasoning?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity of money",
  "yLabel": "Nominal interest rate (%)",
  "caption": "Money demand and the fixed money supply.",
  "series": [
    {
      "name": "Money demand",
      "points": [
        [
          20,
          8
        ],
        [
          40,
          6
        ],
        [
          60,
          4
        ],
        [
          80,
          2
        ]
      ]
    },
    {
      "name": "Money supply",
      "points": [
        [
          55,
          1
        ],
        [
          55,
          9
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Nominal interest minus expected inflation.
- C. Central-bank-set quantity, vertical in the model.
- D. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Money supply; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Money demand, not Money supply. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Real interest, not Money supply. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Money supply applies because central-bank-set quantity, vertical in the model.
- D: This describes money market, not Money supply. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After The Rate People Feel, a new decision at Halvern's currency changeover requires the team to distinguish Real interest from related macroeconomics ideas. Which claim about Real interest is scientifically defensible?

**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Central-bank-set quantity, vertical in the model.
- C. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.
- D. Nominal interest minus expected inflation.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Real interest; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Money demand, not Real interest. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Money supply, not Real interest. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes money market, not Real interest. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Real interest applies because nominal interest minus expected inflation.

### Review question 4

**Prompt - exact player copy:** After The Rate People Feel, a new decision at Halvern's currency changeover requires the team to distinguish money market from related macroeconomics ideas. Which interpretation of money market is correct?

**Options - exact player copy:**

- A. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.
- B. Desired liquid balances, lower at higher nominal interest.
- C. Central-bank-set quantity, vertical in the model.
- D. Nominal interest minus expected inflation.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for money market; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. money market applies because a money surplus produces bond buying, higher bond prices, and a lower nominal rate.
- B: This describes Money demand, not money market. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Money supply, not money market. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Real interest, not money market. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After The Rate People Feel, a new decision at Halvern's currency changeover requires the team to distinguish Fisher from related macroeconomics ideas. Which statement about Fisher would earn course credit?

**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Tightness depends on the real rate, not on whether the nominal number looks high or low.
- C. Central-bank-set quantity, vertical in the model.
- D. Nominal interest minus expected inflation.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Fisher; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Money demand, not Fisher. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Fisher applies because tightness depends on the real rate, not on whether the nominal number looks high or low.
- C: This describes Money supply, not Fisher. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Real interest, not Fisher. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After The Rate People Feel, a new decision at Halvern's currency changeover requires the team to distinguish monetary chain from related macroeconomics ideas. Which use of monetary chain gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Central-bank-set quantity, vertical in the model.
- C. A tool matters only through the chain it sets off.
- D. Nominal interest minus expected inflation.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for monetary chain; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Money demand, not monetary chain. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Money supply, not monetary chain. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. monetary chain applies because a tool matters only through the chain it sets off.
- D: This describes Real interest, not monetary chain. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 9 - Two Accounts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 7 DAYS

**Card title:** Two Accounts

**Go now:** Go to TRADE and meet Nia Corren, open-economy analyst, at the payment wires.

**Card body:** Foreign investors are buying Halvern's bonds, raising demand for its new currency, RATE. That helps finance the country but may make its exports more expensive abroad. Follow the payments and trade effects, then decide what benefits and costs the board should expect.

**Objective:** Connect balance of payments, exchange rates, and net exports.

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
  - id: changeover_m09_we01
    title: Close a current account
    problem: Net exports are -10, net foreign income +3, and net transfers -1 billion. Find the current account.
    rule: Current account=net exports+net income+net transfers.
    steps:
    - 'Set up the relationship: Current account=net exports+net income+net transfers.'
    - current account=-10+3-1=-8 billion.
    answer: The current account has a deficit of 8 billion.
    common_mistake: An asset purchase belongs in the financial account, not this sum.
  - id: changeover_m09_we02
    title: Balance external accounts
    problem: In a two-account teaching model with no statistical discrepancy, the current account is -8 billion. What is the financial account balance?
    rule: Current account+financial account=0 under the stated sign convention.
    steps:
    - 'Set up the relationship: Current account+financial account=0 under the stated sign convention.'
    - financial account=-(-8)=+8 billion.
    answer: A financial inflow balance of 8 billion offsets the current-account deficit.
    common_mistake: State the sign convention; financial-account presentations can differ.
  - id: changeover_m09_we03
    title: Convert a foreign purchase
    problem: An item costs 20 foreign currency units. The exchange rate changes from 2 to 4 foreign units per domestic unit. Compare the domestic cost.
    rule: Domestic cost=foreign price/(foreign units per domestic unit).
    steps:
    - 'Set up the relationship: Domestic cost=foreign price/(foreign units per domestic unit).'
    - old cost=20/2=10 domestic units; new cost=20/4=5.
    answer: The domestic currency appreciated, making this unchanged foreign price cheaper domestically.
    common_mistake: Read the exchange-rate quotation direction before deciding whether to multiply or divide.
  - id: changeover_m09_we04
    title: Trace appreciation
    problem: A domestic currency appreciates while foreign prices and incomes are fixed. What pressure does this put on net exports?
    rule: Appreciation makes domestic goods dearer to foreigners and foreign goods cheaper domestically, other things equal.
    steps:
    - Export demand tends to fall as foreigners face higher prices.
    - Import demand tends to rise as residents face lower foreign-goods prices.
    answer: Net exports tend to fall.
    common_mistake: This is a directional prediction, not an instantaneous fixed numerical change.
  - id: changeover_m09_we05
    title: Use Fisher's approximation
    problem: The nominal interest rate is 6% and expected inflation is 4%. Estimate the real rate.
    rule: Real rate≈nominal rate-expected inflation.
    steps:
    - 'Set up the relationship: Real rate≈nominal rate-expected inflation.'
    - real rate≈6%-4%=2%.
    answer: The approximate expected real borrowing rate is 2%.
    common_mistake: Use expected inflation for the expected real rate, not an unrelated past rate.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Appreciation: a currency buys more foreign currency.

Current account: net exports (NX) plus net income and net transfers.

Financial account: cross-border asset purchases and sales.

#### Primer concepts

- Accounts sum to zero in the simplified Advanced Placement model; a trade deficit pairs with capital surplus; foreigners demand RATE for Halvern goods or assets.

#### Equations first needed today
`current account + financial account = 0`. Job: close international payments. Symbols: signed balances in billions. Why: interpret the bond inflow.

## Main story happening - designer summary

TRADE→RATE when S2 proves appreciation. Nia initially calls it confidence; Soren's export orders add the cost. Only RATE has the money-supply record needed at S4.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Open-Economy Floor | `trade-ledger` | automatic**

**World state:** Arrival | TRADE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Connect balance of payments, exchange rates, and net exports.` Nia Corren points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Connect balance of payments, exchange rates, and net exports.

**Dialogue bubbles -** Nia Corren: "Start with close payments. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `trade-ledger` in Open-Economy Floor.

**Beat 2 - After Stop 33 | `forex-console` | automatic**

**World state:** Keep this labeled result visible; Nia Corren says,, and Stop 34 unlocks.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Nia Corren: "Nice work. Current account −17 and financial account +17 billion close at zero."

**Unlocks/waypoint:** Unlock Stop 34 at `forex-console` in Open-Economy Floor.

**Beat 3 - After Stop 34 | `forex-console` | automatic**

**World state:** Copy the result to the Rate Book; Activate RATE, then.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Nia Corren: "Good thinking. Foreign bond demand → demand for RATE shifts right → RATE appreciates → exports fall and imports rise → net exports fall."

**Unlocks/waypoint:** Unlock Stop 35 at `forex-console` in Open-Economy Floor.

**Beat 4 - After Stop 35 | `shipment-board` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 36 unlocks.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Nia Corren: "Exactly right. At fixed conditions, appreciation lowers exports and raises imports; restoration recovers baseline."

**Unlocks/waypoint:** Unlock Stop 36 at `shipment-board` in TRADE.

**Beat 5 - At mission end | `trade-ledger` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Corren: "Outstanding work. You solved the mission. The inflow finances the current deficit and appreciates RATE, but lower NX partly offsets demand."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** TRADE → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

TRADE→RATE when S2 proves appreciation. Nia initially calls it confidence; Soren's export orders add the cost. Only RATE has the money-supply record needed at S4.

## Key concepts, explained here

**Objective:** Connect balance of payments, exchange rates, and net exports. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 33 - Close payments

**Format/placement:** BALANCE, at `trade-ledger`.

**Metadata:** Concept: 29 - BOP; Keystone: open economy; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the trade ledger, in Open-Economy Floor.

**Stop reason - exact player copy:** Foreign-payment records have arrived and their accounts must balance before interpreting the inflow.

**Question card story setup - exact player copy:** Halvern has NX −18, net foreign income +2, net transfers −1, and foreign asset purchases +17 billion. Count the proper streams and close the simplified balance of payments for the board.

**Question card story-science connection - exact player copy:** The current and financial account totals show how the external deficit is financed in the simplified ledger.

**Question card prompt - exact player copy:** Toggle the correct streams, then submit the current account (CA) and financial account (FA) in billions. Use CA=-18+2-1 and the balance rule CA+FA=0.

**Complete format-specific interaction block:** `balance:{streams:[{id:"net_exports",value:-18,unit:"billion",count:true},{id:"net_foreign_income",value:2,unit:"billion",count:true},{id:"net_transfers",value:-1,unit:"billion",count:true},{id:"foreign_asset_purchases",value:17,unit:"billion",count:true},{id:"domestic_stock_trade",value:6,unit:"billion",count:false}],equations:["CA=NX+NFI+transfers","CA+FA=0"],correct:{CA:-17,FA:17,total:0},tolerance:0.1,submission:"numeric CA and FA pair in billions"}`

**Correct result:** The current account is -17 billion and the financial account is +17 billion, so the simplified balance closes at zero.

**Answer text:** “Current account −17 and financial account +17 billion close at zero.”

**Why:** A current deficit is financed by a financial surplus, not free money.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A current deficit is financed by a financial surplus, not free money.

**State/output:** Record the result and unlock the next named stop.

## Stop 34 - Clear forex

**Format/placement:** DERIVE, at `forex-console`.

**Metadata:** Concept: 30 - currency demand; Keystone: forex; Area: Open-Economy Floor; Learning role: PRACTICE; Difficulty: L3; Story role: consequence.

**Call - exact player copy:** Go to the forex console, in Open-Economy Floor.

**Stop reason - exact player copy:** The capital inflow is established and its effect on the new currency needs tracing.

**Question card story setup - exact player copy:** With a 17-billion capital inflow, foreigners must acquire RATE to buy Halvern bonds. Build the direction chain from asset demand to the currency's value and net exports in the Rate Book.

**Question card story-science connection - exact player copy:** The foreign-exchange chain links bond demand to currency appreciation and the direction of net exports.

**Question card prompt - exact player copy:** Complete the transmission chain and submit the predicted directions of the exchange rate and net exports.

**Complete format-specific interaction block:** `derive:{left_side:"exchange rate",candidate_lines:["Foreign investors buy Halvern bonds","Demand for RATE shifts right","RATE appreciates","Halvern exports become dearer abroad","Imports become cheaper in Halvern","Exports fall and imports rise","Net exports fall"],licenses:["asset purchase requires domestic currency","foreign-exchange demand shift","higher equilibrium currency price","relative-price effect","net-exports definition"],keyed_order:[1,2,3,4,5,6,7],decoys:["RATE supply shifts left because Halvern prints fewer notes","Appreciation raises net exports"],submission:"ordered line-and-rule chain"}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Foreign investors can buy Halvern bonds without acquiring RATE`
2. `Supply of RATE shifts right`
3. `RATE depreciates`
4. `Halvern exports become cheaper abroad`
5. `Imports become dearer in Halvern`
6. `Exports and imports both rise`
7. `Net exports rise`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Foreign investors increase their purchases of Halvern bonds. RATE is Halvern's currency; other determinants of trade are held fixed."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Clear forex in the form and units requested by the prompt"
  left_side: "exchange rate"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = Foreign investors buy Halvern bonds", correct: true}
        - {text: "exchange rate = Bond purchases rise while demand for RATE stays fixed", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = Demand for RATE shifts right", correct: true}
        - {text: "exchange rate = Supply of RATE shifts right", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = RATE appreciates", correct: true}
        - {text: "exchange rate = RATE depreciates", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = Halvern exports become dearer abroad", correct: true}
        - {text: "exchange rate = Halvern exports become cheaper abroad", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_5
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = Imports become cheaper in Halvern", correct: true}
        - {text: "exchange rate = Imports become dearer in Halvern", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_6
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = Exports fall and imports rise", correct: true}
        - {text: "exchange rate = Exports and imports both rise", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_7
      doing: "select the next licensed transformation"
      candidates:
        - {text: "exchange rate = Net exports fall", correct: true}
        - {text: "exchange rate = Net exports rise", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Foreign bond demand raises demand for RATE, RATE appreciates, exports fall, imports rise, and net exports fall.

**Answer text:** “Foreign bond demand → demand for RATE shifts right → RATE appreciates → exports fall and imports rise → net exports fall.”

**Why:** Appreciation makes exports dearer and imports cheaper.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Appreciation makes exports dearer and imports cheaper.

**State/output:** RATE waypoint.

## Stop 35 - Exporter effect

**Format/placement:** CONTROL, at `forex-console`.

**Metadata:** Concept: 30 - appreciation/NX; Keystone: forex; Area: Open-Economy Floor; Learning role: COMBINE; Difficulty: L4; Story role: test.

**Call - exact player copy:** Go to the forex console, in Open-Economy Floor.

**Stop reason - exact player copy:** The exchange-rate prediction is ready for a controlled check using trade flows.

**Question card story setup - exact player copy:** Because RATE appreciation should reduce net exports, change only the exchange quote from 1.00 to 1.10 foreign units per RATE. Hold foreign income, domestic income, tariffs, and shipping capacity fixed.

**Question card story-science connection - exact player copy:** Reversing the currency quote tests whether appreciation itself changes exports and imports under fixed conditions.

**Question card prompt - exact player copy:** Hold income, tariffs, and shipping capacity fixed. Change the quote from 1.00 to 1.10 foreign units per RATE, record exports and imports, restore the baseline, and submit what the comparison shows about net exports.

**Complete format-specific interaction block:** `control:{candidates:[{id:"exchange_quote",change:"1.00 to 1.10 foreign units per RATE"},{id:"tariff",change:"0% to 5%"},{id:"foreign_income",change:"index 100 to 105"}],selected:"exchange_quote",baseline:{quote:1.00,exports:90,imports:108,unit:"billion"},response:{quote:1.10,exports:84,imports:112},noise_band:0.01,fixed:["domestic income","foreign income","tariffs","shipping capacity"],measure:"exports and imports after the panel settles",restore:{quote:1.00,exports:90,imports:108,remeasure:true},correct:"appreciation lowers net exports",submission:"control choice, readings, and conclusion"}`

**Correct result:** Raising the quote from 1.00 to 1.10 lowers exports from 90 to 84 billion and raises imports from 108 to 112 billion; restoring 1.00 restores the baseline.

**Answer text:** “At fixed conditions, appreciation lowers exports and raises imports; restoration recovers baseline.”

**Why:** Reversing the quote tests whether currency value changes the export margin.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Reversing the quote tests whether currency value changes the export margin.

**State/output:** Record the result and unlock the next named stop.

## Stop 36 - Good news

**Format/placement:** CHOICE, asked by Nia Corren beside `shipment-board`.

**Metadata:** Concept: 29 - capital flows; Keystone: forex/BOP; Area: Open-Economy Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Nia Corren, at the shipment board in Open-Economy Floor.

**Stop reason - exact player copy:** Capital inflows and the trade response are known, but the board's headline must preserve both benefits and costs.

**Question card story setup - exact player copy:** Choose the statement that preserves all three facts for the next board decision.

**Question card story-science connection - exact player copy:** The selected statement distinguishes financing support from the pressure appreciation places on exporters.

**Question card prompt - exact player copy:** Select exactly one statement from the four distinct choices below.

1. The inflow is entirely beneficial.
2. The inflow is entirely harmful.
3. The inflow finances the deficit, but appreciation lowers net exports. **(correct)**
4. The two international accounts need not sum to zero.

**Choices:**

1. The inflow is entirely beneficial.

2. The inflow is entirely harmful.

3. The inflow finances the deficit, but appreciation lowers net exports. **(correct)**

4. The two international accounts need not sum to zero.

**Complete format-specific interaction block:** `choices:[{id:A,label:"The inflow is entirely beneficial"},{id:B,label:"The inflow is entirely harmful"},{id:C,label:"The inflow finances the deficit, but appreciation lowers net exports"},{id:D,label:"The two international accounts need not sum to zero"}]; answer:C; rebuttals:{A:"Appreciation reduces exports and raises imports, so the inflow has a cost.",B:"The financial surplus finances the current-account deficit, so the inflow has a benefit.",D:"In the simplified AP model, current and financial accounts sum to zero."}`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The inflow finances the current deficit and appreciates RATE, but lower NX partly offsets demand.”

**Why:** Financial confidence can strengthen the currency while weakening aggregate demand through NX.

**Wrong-path feedback:** (1) **Entirely beneficial:** Financing helps, but currency appreciation can reduce exports and aggregate demand. (2) **Entirely harmful:** The inflow finances the current-account deficit, so it has a real benefit as well as a cost. (4) **Accounts need not balance:** With consistent signs and measurement, the current and financial accounts offset.

**State/output:** Page 9 signed.

## Mission outcome

Mission decision: Do not call the cash inflow pure good news. It pays for the trade gap and lifts RATE. A stronger RATE cuts net exports. Export orders are now down. The output plan must change.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a careful and clever call. You replaced uncertainty with a defensible result: Do not call the cash inflow pure good news. Your reasoning keeps one bad assumption from becoming national policy.

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 16:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Closing both accounts restores intervention capacity.

**Automatic bar change:** RESERVE +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/88/79/79; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Two Accounts. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Two Accounts, a new decision at Halvern's currency changeover requires the team to distinguish Appreciation from related macroeconomics ideas. Which statement correctly applies Appreciation?

**Options - exact player copy:**

- A. Net exports (NX) plus net income and net transfers.
- B. A currency buys more foreign currency.
- C. Cross-border asset purchases and sales.
- D. A current deficit is financed by a financial surplus, not free money.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Appreciation; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Current account, not Appreciation. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Appreciation applies because a currency buys more foreign currency.
- C: This describes Financial account, not Appreciation. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes BOP, not Appreciation. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Two Accounts, a new decision at Halvern's currency changeover requires the team to distinguish Current account from related macroeconomics ideas. Which description of Current account should guide the team's reasoning?

**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Cross-border asset purchases and sales.
- C. Net exports (NX) plus net income and net transfers.
- D. A current deficit is financed by a financial surplus, not free money.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Current account; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Appreciation, not Current account. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Financial account, not Current account. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Current account applies because net exports (NX) plus net income and net transfers.
- D: This describes BOP, not Current account. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Two Accounts, a new decision at Halvern's currency changeover requires the team to distinguish Financial account from related macroeconomics ideas. Which claim about Financial account is scientifically defensible?

**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Net exports (NX) plus net income and net transfers.
- C. A current deficit is financed by a financial surplus, not free money.
- D. Cross-border asset purchases and sales.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Financial account; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Appreciation, not Financial account. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Current account, not Financial account. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes BOP, not Financial account. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Financial account applies because cross-border asset purchases and sales.

### Review question 4

**Prompt - exact player copy:** After Two Accounts, a new decision at Halvern's currency changeover requires the team to distinguish BOP from related macroeconomics ideas. Which interpretation of BOP is correct?

**Options - exact player copy:**

- A. A current deficit is financed by a financial surplus, not free money.
- B. A currency buys more foreign currency.
- C. Net exports (NX) plus net income and net transfers.
- D. Cross-border asset purchases and sales.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for BOP; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. BOP applies because a current deficit is financed by a financial surplus, not free money.
- B: This describes Appreciation, not BOP. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Current account, not BOP. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Financial account, not BOP. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Two Accounts, a new decision at Halvern's currency changeover requires the team to distinguish currency demand from related macroeconomics ideas. Which statement about currency demand would earn course credit?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity of RATE",
  "yLabel": "Crowns per RATE",
  "caption": "Demand for RATE in the foreign-exchange market.",
  "series": [
    {
      "name": "Demand for RATE",
      "points": [
        [
          20,
          8
        ],
        [
          40,
          6.5
        ],
        [
          60,
          5
        ],
        [
          80,
          3.5
        ],
        [
          100,
          2
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Appreciation makes exports dearer and imports cheaper.
- C. Net exports (NX) plus net income and net transfers.
- D. Cross-border asset purchases and sales.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for currency demand; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Appreciation, not currency demand. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. currency demand applies because appreciation makes exports dearer and imports cheaper.
- C: This describes Current account, not currency demand. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Financial account, not currency demand. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Two Accounts, a new decision at Halvern's currency changeover requires the team to distinguish appreciation/NX from related macroeconomics ideas. Which use of appreciation/NX gives the strongest basis for a decision?

**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Net exports (NX) plus net income and net transfers.
- C. Reversing the quote tests whether currency value changes the export margin.
- D. Cross-border asset purchases and sales.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for appreciation/NX; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Appreciation, not appreciation/NX. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Current account, not appreciation/NX. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. appreciation/NX applies because reversing the quote tests whether currency value changes the export margin.
- D: This describes Financial account, not appreciation/NX. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 10 - The Temporary Tradeoff

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 6 DAYS

**Card title:** The Temporary Tradeoff

**Go now:** Go to RATE and meet Mara Venn at the Phillips wall.

**Card body:** A stronger currency is hurting exports while expensive energy keeps prices rising. The board is considering keeping borrowing costs high indefinitely. Compare the short-term disruption with the longer-term evidence, then decide whether today's price rise justifies that lasting policy.

**Objective:** Separate a short-run shock from long-run inflation policy.

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
  - id: changeover_m10_we01
    title: Quantity-theory growth rates
    problem: Money grows 5%, velocity is unchanged, and real output grows 2%. Estimate inflation using the growth-rate approximation.
    rule: Inflation≈money growth+velocity growth-real output growth.
    steps:
    - 'Set up the relationship: Inflation≈money growth+velocity growth-real output growth.'
    - inflation≈5%+0%-2%=3%.
    answer: Estimated inflation is 3% under the stated approximation.
    common_mistake: Money growth need not equal inflation when real output also grows.
  - id: changeover_m10_we02
    title: Separate short and long run
    problem: Demand expansion temporarily lowers unemployment below its natural rate. Why is that not a permanent free tradeoff?
    rule: As inflation expectations and wages adjust, the short-run Phillips relationship can shift.
    steps:
    - The initial demand increase can lower unemployment while raising inflation.
    - Over time, adjustment returns unemployment toward its natural rate in the standard model.
    answer: A permanent reduction below the natural rate is not implied by the initial movement.
    common_mistake: Do not treat the short-run curve as a permanent menu.
  - id: changeover_m10_we03
    title: Identify a supply shock
    problem: Energy costs rise suddenly. Output falls while the price level rises. Which aggregate curve change fits?
    rule: Higher production costs shift short-run aggregate supply left, other things equal.
    steps:
    - At a given price level, firms are willing to supply less.
    - The new intersection gives lower output and higher prices.
    answer: A negative supply shock fits this combination, often called stagflation.
    common_mistake: A demand decrease alone would tend to lower both output and prices.
  - id: changeover_m10_we04
    title: Inflation between two indexes
    problem: The price index rises from 120 to 126. Find inflation over the period.
    rule: Inflation=(new index-old index)/old index×100%.
    steps:
    - 'Set up the relationship: Inflation=(new index-old index)/old index×100%.'
    - inflation=(126-120)/120×100%=5%.
    answer: The price level rose 5%.
    common_mistake: Six index points are not automatically six percent.
  - id: changeover_m10_we05
    title: Test a frozen prediction
    problem: Before seeing a new measurement, a model predicts 12 units with an allowed error of 1 unit. The new measurement is 15 units. Does it pass this test?
    rule: Absolute prediction error = |observed - predicted|.
    steps:
    - absolute error = |15-12| = 3 units. The prediction remains fixed.
    - comparison = 3 > 1. The error exceeds the prewritten tolerance.
    answer: The model fails this held-out test.
    common_mistake: Refitting to 15 before scoring would no longer test the original prediction.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Short-run Phillips curve (SRPC): short-run inverse inflation-unemployment relation.

Long-run Phillips curve (LRPC): vertical curve at the natural rate.

Money neutrality: long-run money changes alter prices, not real output.

Quantity theory of money: the relation `M×V=P×Y`, which connects the money supply and velocity to the price level and real output.

#### Primer concepts

- Aggregate-demand shifts move along SRPC; supply shocks shift SRPC; changes in the natural rate of unemployment (NRU) shift LRPC; velocity is circulation rate.

#### Equations first needed today
**Equation:** Quantity theory of money, `M×V=P×Y`.

**What it is for:** connecting money to nominal spending.

**Symbols:** `M` is money supply, `V` is velocity, `P` is price level, and `Y` is real output.

**Why this campaign needs it:** test whether the inflation print came from sustained money growth.

## Main story happening - designer summary

RATE→PRICES, because only the price history can test sustained money growth. Twist 2: the shock shifts SRPC; no money surge appears.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at RATE | `policy-wall` | automatic**

**World state:** Arrival | RATE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Separate a short-run shock from long-run inflation policy.` Mara Venn points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Separate a short-run shock from long-run inflation policy.

**Dialogue bubbles -** Mara Venn: "Start with move or shift. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `policy-wall` in RATE.

**Beat 2 - After Stop 37 | `gap-calculator` | automatic**

**World state:** Keep this labeled result visible; Mara Venn says,, and Stop 38 unlocks.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Mara Venn: "Nice work. The supply shock shifts SRPC right."

**Unlocks/waypoint:** Unlock Stop 38 at `gap-calculator` in Rate Room.

**Beat 3 - After Stop 38 | `price-history-board` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `RATE → PRICES` only if the route requires travel, then.

**Panel/HUD text:** RATE → PRICES

**Dialogue bubbles -** Mara Venn: "Good thinking. Estimated long-run inflation is 2%, far below the temporary 5.88% basket print."

**Unlocks/waypoint:** Unlock Stop 39 at `price-history-board` in Statistics Floor.

**Beat 4 - After Stop 39 | `forecast-table` | automatic**

**World state:** Preserve this result on the PRICES decision fixture; The character asks for the promised mission decision, and Stop 40 unlocks.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Mara Venn: "Exactly right. The temporary-supply model predicts the holdout; persistent monetary inflation does not."

**Unlocks/waypoint:** Unlock Stop 40 at `forecast-table` in RATE.

**Beat 5 - At mission end | `policy-wall` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Venn: "Outstanding work. You solved the mission. Do not justify permanent tightening from this temporary print; commit a reversible trigger."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** RATE → PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

RATE→PRICES, because only the price history can test sustained money growth. Twist 2: the shock shifts SRPC; no money surge appears.

## Key concepts, explained here

**Objective:** Separate a short-run shock from long-run inflation policy. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 37 - Move or shift

**Format/placement:** CHOICE, asked by Mara Venn beside `policy-wall`.

**Metadata:** Concept: 27 - Phillips curves; Keystone: long-run consequences; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Talk to Mara Venn, at the policy wall in Rate Room.

**Stop reason - exact player copy:** The latest inflation and unemployment pattern must be explained before demand is blamed again.

**Question card story setup - exact player copy:** Identify the change that fits this pattern before blaming excess demand today.

**Question card story-science connection - exact player copy:** Distinguishing a movement from a shifted relationship identifies whether the observed tradeoff itself has changed.

**Question card prompt - exact player copy:** Select exactly one change from the four distinct choices below.

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity of RATE",
  "yLabel": "Crowns per RATE",
  "caption": "A change in foreign demand shifts the currency-demand curve.",
  "series": [
    {
      "name": "Demand before",
      "points": [
        [
          20,
          7
        ],
        [
          40,
          5.5
        ],
        [
          60,
          4
        ],
        [
          80,
          2.5
        ]
      ]
    },
    {
      "name": "Demand after",
      "points": [
        [
          35,
          7
        ],
        [
          55,
          5.5
        ],
        [
          75,
          4
        ],
        [
          95,
          2.5
        ]
      ]
    }
  ]
}
```


1. Move upward along the existing SRPC.
2. Move downward along the existing SRPC.
3. Shift the SRPC right. **(correct)**
4. Shift the LRPC left.

**Choices:**

1. Move upward along the existing SRPC.

2. Move downward along the existing SRPC.

3. Shift the SRPC right. **(correct)**

4. Shift the LRPC left.

**Complete format-specific interaction block:** `choices:[{id:A,label:"Move upward along the existing SRPC"},{id:B,label:"Move downward along the existing SRPC"},{id:C,label:"Shift the SRPC right"},{id:D,label:"Shift the LRPC left"}]; answer:C; rebuttals:{A:"Movement upward along one SRPC pairs higher inflation with lower unemployment.",B:"Movement downward pairs lower inflation with higher unemployment.",D:"LRPC shifts only if the natural unemployment rate changes; the oil shock shifts the short-run curve."}`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The supply shock shifts SRPC right.”

**Why:** Adverse supply shifts SRPC right; AD changes move along it.

**Wrong-path feedback:** (1) **Move upward:** A movement along SRPC comes from an aggregate-demand change, not an adverse supply shock. (2) **Move downward:** This also describes movement along a fixed curve and has the wrong inflation-unemployment direction. (4) **Shift LRPC left:** The shock changes short-run inflation at each unemployment rate; it does not change the natural unemployment rate here.

**State/output:** Record the result and unlock the next named stop.

## Stop 38 - Quantity check

**Format/placement:** DERIVE, at `gap-calculator`.

**Metadata:** Concept: 8 - quantity theory; Keystone: neutrality; Area: Rate Room; Learning role: COMBINE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the gap calculator, in Rate Room.

**Stop reason - exact player copy:** The long-run price discussion needs a benchmark under fixed velocity and full employment.

**Question card story setup - exact player copy:** Money grows 3%, velocity is constant, and real output grows 1% at full employment. Use the growth-rate form of quantity theory to estimate long-run inflation clearly for the next board decision.

**Question card story-science connection - exact player copy:** The quantity-theory estimate relates money and real-output growth to the inflation rate the board should expect.

**Question card prompt - exact player copy:** Submit the long-run inflation estimate.

**Complete format-specific interaction block:** `derive:{left_side:"inflation",candidate_lines:["MV=PY","%ΔM+%ΔV≈π+%ΔY","π≈%ΔM+%ΔV−%ΔY","π≈3%+0%−1%","π≈2%"],licenses:["quantity identity","growth-rate form","solve for inflation","substitute displayed rates","arithmetic"],keyed_order:[1,2,3,4,5],decoys:["π≈3%+1%=4%","π≈%ΔY−%ΔM"],submission:"ordered line-and-rule derivation plus inflation rate in percent"}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `M+V=P+Y in levels, so add the four levels`
2. `%ΔM×%ΔV≈π×%ΔY`
3. `π≈%ΔY−%ΔM−%ΔV`
4. `π≈3%+0%+1%`
5. `π≈4%`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Money grows 3%, velocity is constant, and real output grows 1% at full employment. Use the growth-rate form of quantity theory to estimate long-run inflation clearly for the next board decision.", "Money grows 3%, velocity grows 0%, and real output grows 1%. Use `inflation rate≈money growth+velocity growth−real-output growth` and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Quantity check in the form and units requested by the prompt"
  left_side: "inflation"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "MV=PY", correct: true}
        - {text: "M+V=P+Y, so 104+1.02=106+0.98", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "%ΔM+%ΔV≈π+%ΔY", correct: true}
        - {text: "%ΔM×%ΔV≈π×%ΔY", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "π≈%ΔM+%ΔV−%ΔY", correct: true}
        - {text: "π≈%ΔY−%ΔM−%ΔV", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "π≈3%+0%−1%", correct: true}
        - {text: "π≈3%+0%+1%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_5
      doing: "select the next licensed transformation"
      candidates:
        - {text: "π≈2%", correct: true}
        - {text: "π≈4%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** The quantity equation gives estimated long-run inflation of 2%.

**Answer text:** “Estimated long-run inflation is 2%, far below the temporary 5.88% basket print.”

**Why:** Money growth above real growth sets long-run inflation when velocity is stable.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Money growth above real growth sets long-run inflation when velocity is stable.

**State/output:** Record the result and unlock the next named stop.

## Stop 39 - Test unseen prices

**Format/placement:** HOLDOUT, at `price-history-board`.

**Metadata:** Concept: 8 - temporary vs persistent inflation; Keystone: evidence; Area: Statistics Floor; Learning role: RETRIEVE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** Two price models fit the visible months and need a test they have not already seen.

**Question card story setup - exact player copy:** Because quantity theory predicts 2% long-run inflation, fit a “persistent money” and a “temporary supply” model through months one to four. Freeze both before months five and six appear today.

**Question card story-science connection - exact player copy:** Frozen predictions allow the later months to distinguish forecasting performance from fitting past observations.

**Question card prompt - exact player copy:** Fit, freeze, reveal both holdout months, and submit the better mechanism.

**Complete format-specific interaction block:** `train:[2.0,2.1,5.9,5.2]; models:[persistent5.5,temporary_to2]; holdout:[3.2,2.4]; correct:temporary_to2`.

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 39 - Test unseen prices"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Fit, freeze, reveal both holdout months, and submit the better mechanism."
  payload: "`train:[2.0,2.1,5.9,5.2]; models:[persistent5.5,temporary_to2]; holdout:[3.2,2.4]; correct:temporary_to2`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed monthly inflation prediction error", min: 0, max: 2, step: 0.5, unit: "percentage points"}
  fit: [{at: 0, value: 0.55}, {at: 0.5, value: 0.98}, {at: 1.0, value: 0.84}, {at: 1.5, value: 0.87}, {at: 2.0, value: 0.83}]
  test: [{at: 0, value: 0.38}, {at: 0.5, value: 0.44}, {at: 1.0, value: 0.76}, {at: 1.5, value: 0.86}, {at: 2.0, value: 0.84}]
  passScore: 0.80
  overfitAt: 0.5
  correctAt: 1.5
  models:
    - {id: persistent, prediction: 5.5, unit: "%"}
    - {id: temporary_supply, prediction: 2.0, unit: "%"}
  heldOutReadings: [3.2, 2.4]
  correctChoice: temporary_supply
  correctConclusion: "The temporary-supply model predicts the decline toward 2%; the persistent 5.5% model does not."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The temporary-supply model predicts the holdout; persistent monetary inflation does not.”

**Why:** Unseen normalization can reject a permanent-inflation story.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Unseen normalization can reject a permanent-inflation story.

**State/output:** Record the result and unlock the next named stop.

## Stop 40 - Tighten forever

**Format/placement:** STRESS, asked by Mara Venn beside `forecast-table`.

**Metadata:** Concept: 25 - policy horizon; Keystone: Phillips/neutrality; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Mara Venn, at the forecast table in Rate Room.

**Stop reason - exact player copy:** The unseen-price test is complete, but a permanent tightening commitment still faces uncertainty.

**Question card story setup - exact player copy:** The shock model wins on unseen data, but inflation expectations range from 1.8% to 2.4%. Stress permanent tightening across that range and compare it with a conditional trigger.

**Question card story-science connection - exact player copy:** Comparing permanent and conditional responses shows which policy remains justified across the tested inflation range.

**Question card prompt - exact player copy:** Inspect all settings and submit “conditional stance.”

**Complete format-specific interaction block:** `range:1.8.2.4 step.2; candidates:[permanent tighten,ignore,conditional]; correct:conditional`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 40 - Tighten forever"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Inspect all settings and submit “conditional stance.”"
  payload: "`range:1.8.2.4 step.2; candidates:[permanent tighten,ignore,conditional]; correct:conditional`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "inflation persistence", min: 1.8, max: 2.4, nominal: 2.1, step: 0.2, unit: "years"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 2.1, max: 2.1}
      failsAt: 2.4
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 2.1, max: 2.4}
      failsAt: 1.8
    - id: robust_plan
      label: "The keyed result shown by the completed interaction."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 1.8, max: 2.4}
  robust: robust_plan
  question: "Inspect all settings and submit “conditional stance.”"
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Do not justify permanent tightening from this temporary print; commit a reversible trigger.”

**Why:** Long-run neutrality does not make short-run output losses disappear.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Long-run neutrality does not make short-run output losses disappear.

**State/output:** Page 10 signed.

## Mission outcome

Mission decision: Do not tighten policy for a short price shock. New data support the supply-shock model. Slow money growth points to about 2% long-run inflation. Use set rules, not fear. Wage contracts will adjust later.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You gave the team the breakthrough it needed. The mission now has its answer: Do not tighten policy for a short price shock. Halvern can move forward with clearer prices and fewer risks for ordinary families.

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 16:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Rejecting panic is correct, but officials must explain a conditional stance.

**Automatic bar change:** TRUST −4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/88/86/75; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Temporary Tradeoff. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After The Temporary Tradeoff, a new decision at Halvern's currency changeover requires the team to distinguish Short-run Phillips curve (SRPC) from related macroeconomics ideas. Which statement correctly applies Short-run Phillips curve (SRPC)?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Unemployment rate (%)",
  "yLabel": "Inflation rate (%)",
  "caption": "A short-run Phillips curve showing a temporary inflation-unemployment tradeoff.",
  "series": [
    {
      "name": "SRPC",
      "points": [
        [
          3,
          6
        ],
        [
          4,
          4.5
        ],
        [
          5,
          3.3
        ],
        [
          6,
          2.4
        ],
        [
          7,
          1.8
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Vertical curve at the natural rate.
- B. Short-run inverse inflation-unemployment relation.
- C. Long-run money changes alter prices, not real output.
- D. Adverse supply shifts SRPC right; AD changes move along it.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Short-run Phillips curve (SRPC); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Long-run Phillips curve (LRPC), not Short-run Phillips curve (SRPC). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Short-run Phillips curve (SRPC) applies because short-run inverse inflation-unemployment relation.
- C: This describes Money neutrality, not Short-run Phillips curve (SRPC). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Phillips curves, not Short-run Phillips curve (SRPC). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After The Temporary Tradeoff, a new decision at Halvern's currency changeover requires the team to distinguish Long-run Phillips curve (LRPC) from related macroeconomics ideas. Which description of Long-run Phillips curve (LRPC) should guide the team's reasoning?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Unemployment rate (%)",
  "yLabel": "Inflation rate (%)",
  "caption": "The long-run Phillips curve at the natural rate of unemployment.",
  "series": [
    {
      "name": "LRPC",
      "points": [
        [
          5,
          1
        ],
        [
          5,
          7
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Short-run inverse inflation-unemployment relation.
- B. Long-run money changes alter prices, not real output.
- C. Vertical curve at the natural rate.
- D. Adverse supply shifts SRPC right; AD changes move along it.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Long-run Phillips curve (LRPC); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Short-run Phillips curve (SRPC), not Long-run Phillips curve (LRPC). The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Money neutrality, not Long-run Phillips curve (LRPC). The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Long-run Phillips curve (LRPC) applies because vertical curve at the natural rate.
- D: This describes Phillips curves, not Long-run Phillips curve (LRPC). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After The Temporary Tradeoff, a new decision at Halvern's currency changeover requires the team to distinguish Money neutrality from related macroeconomics ideas. Which claim about Money neutrality is scientifically defensible?

**Options - exact player copy:**

- A. Short-run inverse inflation-unemployment relation.
- B. Vertical curve at the natural rate.
- C. Adverse supply shifts SRPC right; AD changes move along it.
- D. Long-run money changes alter prices, not real output.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Money neutrality; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Short-run Phillips curve (SRPC), not Money neutrality. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Long-run Phillips curve (LRPC), not Money neutrality. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Phillips curves, not Money neutrality. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Money neutrality applies because long-run money changes alter prices, not real output.

### Review question 4

**Prompt - exact player copy:** After The Temporary Tradeoff, a new decision at Halvern's currency changeover requires the team to distinguish Phillips curves from related macroeconomics ideas. Which interpretation of Phillips curves is correct?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Unemployment rate (%)",
  "yLabel": "Inflation rate (%)",
  "caption": "A short-run Phillips curve showing a temporary inflation-unemployment tradeoff.",
  "series": [
    {
      "name": "SRPC",
      "points": [
        [
          3,
          6
        ],
        [
          4,
          4.5
        ],
        [
          5,
          3.3
        ],
        [
          6,
          2.4
        ],
        [
          7,
          1.8
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Adverse supply shifts SRPC right; AD changes move along it.
- B. Short-run inverse inflation-unemployment relation.
- C. Vertical curve at the natural rate.
- D. Long-run money changes alter prices, not real output.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Phillips curves; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. Phillips curves applies because adverse supply shifts SRPC right; AD changes move along it.
- B: This describes Short-run Phillips curve (SRPC), not Phillips curves. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Long-run Phillips curve (LRPC), not Phillips curves. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Money neutrality, not Phillips curves. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After The Temporary Tradeoff, a new decision at Halvern's currency changeover requires the team to distinguish quantity theory from related macroeconomics ideas. Which statement about quantity theory would earn course credit?

**Options - exact player copy:**

- A. Short-run inverse inflation-unemployment relation.
- B. Money growth above real growth sets long-run inflation when velocity is stable.
- C. Vertical curve at the natural rate.
- D. Long-run money changes alter prices, not real output.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for quantity theory; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Short-run Phillips curve (SRPC), not quantity theory. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. quantity theory applies because money growth above real growth sets long-run inflation when velocity is stable.
- C: This describes Long-run Phillips curve (LRPC), not quantity theory. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Money neutrality, not quantity theory. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After The Temporary Tradeoff, a new decision at Halvern's currency changeover requires the team to distinguish temporary vs persistent inflation from related macroeconomics ideas. Which use of temporary vs persistent inflation gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Short-run inverse inflation-unemployment relation.
- B. Vertical curve at the natural rate.
- C. Unseen normalization can reject a permanent-inflation story.
- D. Long-run money changes alter prices, not real output.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for temporary vs persistent inflation; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Short-run Phillips curve (SRPC), not temporary vs persistent inflation. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Long-run Phillips curve (LRPC), not temporary vs persistent inflation. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. temporary vs persistent inflation applies because unseen normalization can reject a permanent-inflation story.
- D: This describes Money neutrality, not temporary vs persistent inflation. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 11 - Too Late By Itself

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 5 DAYS

**Card title:** Too Late by Itself

**Go now:** Go to COUNTER and meet Eli Voss at the wage notices.

**Card body:** The currency launch is days away, but wages may take weeks to adjust to the downturn. Families cannot wait indefinitely for work and income to recover. Compare the timing of wage changes, taxes, and benefits, then decide whether temporary government support is needed.

**Objective:** Compare market adjustment with a temporary policy bridge.

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
  - id: changeover_m11_we01
    title: Measure a stabilizer effect
    problem: Market income falls 10 billion, taxes automatically fall 2 billion, and transfers rise 1 billion. Find the change in disposable income.
    rule: Disposable income change=market income change-tax change+transfer change.
    steps:
    - 'Set up the relationship: Disposable income change=market income change-tax change+transfer change.'
    - ΔYD=-10-(-2)+1=-7 billion.
    answer: Disposable income falls 7 billion, less than the original 10-billion shock.
    common_mistake: A tax decrease is subtracted as a negative change.
  - id: changeover_m11_we02
    title: Compare policy timing
    problem: A downturn requires action within two months; wage renegotiation occurs in six months. Can wage adjustment alone meet that deadline?
    rule: Distinguish eventual adjustment from the time needed to reach it.
    steps:
    - six months > two months, so the stated wage adjustment occurs after the deadline.
    - A separate temporary measure would need its own effect, cost, and timing assessment.
    answer: Wage adjustment alone does not meet the two-month target.
    common_mistake: A long-run prediction does not guarantee a short-run solution.
  - id: changeover_m11_we03
    title: Calculate real growth
    problem: Real output rises from 100 to 105 billion. Find the growth rate.
    rule: Growth rate=(new-old)/old×100%.
    steps:
    - 'Set up the relationship: Growth rate=(new-old)/old×100%.'
    - growth=(105-100)/100×100%=5%.
    answer: Real output grew 5%.
    common_mistake: Use the old value as the denominator.
  - id: changeover_m11_we04
    title: Measure an output gap
    problem: Actual real output is 95 billion and potential output is 100 billion. Find the signed gap and percent gap.
    rule: Gap=actual-potential; percent gap=gap/potential×100%.
    steps:
    - 'Set up the relationship: Gap=actual-potential; percent gap=gap/potential×100%.'
    - gap=95-100=-5 billion; percent gap=-5/100×100%=-5%.
    answer: The economy has a recessionary gap of 5 billion, or 5% below potential.
    common_mistake: Potential output is the reference denominator.
  - id: changeover_m11_we05
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

Self-correction: wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.

Automatic stabilizer: taxes or transfers that change without a new law.

Economic growth: rising real gross domestic product (GDP) per person.

#### Primer concepts

- Physical capital, human capital, and technology drive growth; long-run aggregate supply (LRAS) shifts with productive capacity.

#### Equations first needed today
retrieve gap and multiplier relationships.

## Main story happening - designer summary

COUNTER→PRICES→RATE. Wage notices establish six weeks; PRICES tests stabilizers; RATE authorizes a bridge. Each move carries evidence unavailable below. Eli wants relief, Idris protects long-run investment.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Exchange Counter | `queue-board` | automatic**

**World state:** Arrival | COUNTER | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Compare market adjustment with a temporary policy bridge.` Eli Voss points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Compare market adjustment with a temporary policy bridge.

**Dialogue bubbles -** Eli Voss: "Start with adjustment order. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `queue-board` in Exchange Counter.

**Beat 2 - After Stop 41 | `ad-as-wall` | automatic**

**World state:** Keep this labeled result visible; Eli Voss says,, and Stop 42 unlocks.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. Self-correction returns Y to Yf, but wage adjustment starts after launch."

**Unlocks/waypoint:** Unlock Stop 42 at `ad-as-wall` in Statistics Floor.

**Beat 3 - After Stop 42 | `forecast-table` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `COUNTER → PRICES → RATE` only if the route requires travel, then.

**Panel/HUD text:** COUNTER → PRICES → RATE

**Dialogue bubbles -** Eli Voss: "Good thinking. Automatic stabilizers shrink the loss from 10 to 7 billion."

**Unlocks/waypoint:** Unlock Stop 43 at `forecast-table` in Rate Room.

**Beat 4 - After Stop 43 | `allocation-slate` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 44 unlocks.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Fund clearing, training, port repair, and reserve."

**Unlocks/waypoint:** Unlock Stop 44 at `allocation-slate` in COUNTER.

**Beat 5 - At mission end | `queue-board` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Outstanding work. You solved the mission. Use a temporary bridge with a sunset review; self-correction alone is too slow."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** COUNTER → PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

COUNTER→PRICES→RATE. Wage notices establish six weeks; PRICES tests stabilizers; RATE authorizes a bridge. Each move carries evidence unavailable below. Eli wants relief, Idris protects long-run investment.

## Key concepts, explained here

**Objective:** Compare market adjustment with a temporary policy bridge. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 41 - Adjustment order

**Format/placement:** SEQUENCE, at `queue-board`.

**Metadata:** Concept: 12 - self-correction; Keystone: AD-AS; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the queue board, in Exchange Counter.

**Stop reason - exact player copy:** Currency launch is five days away, while wage contracts reset much later.

**Question card story setup - exact player copy:** Wage contracts reset in six weeks, but conversion begins in five days. Order the recessionary self-correction chain and mark which step misses the deadline clearly in the Rate Book for review.

**Question card story-science connection - exact player copy:** The adjustment sequence reveals whether self-correction can arrive in time to protect the launch.

**Question card prompt - exact player copy:** Order and mark.

**Complete format-specific interaction block:** `cards:[unemployment high,wage growth slows,input costs fall,SRAS right,Y returns Yf]; order:same; deadline_step:wage reset`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Self-correction returns Y to Yf, but wage adjustment starts after launch.”

**Why:** A correct long-run mechanism can still be too slow for a short-run emergency.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A correct long-run mechanism can still be too slow for a short-run emergency.

**State/output:** Record the result and unlock the next named stop.

## Stop 42 - Stabilizer response

**Format/placement:** DERIVE, at `ad-as-wall`.

**Metadata:** Concept: 24 - automatic stabilizers; Keystone: fiscal/AD; Area: Rate Room; Learning role: RETRIEVE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the AD–AS wall, in Statistics Floor.

**Stop reason - exact player copy:** Wage adjustment misses the deadline, leaving automatic stabilizers to absorb part of the income loss.

**Question card story setup - exact player copy:** Because self-correction is late, disposable income falls 10 billion, but taxes fall 2 billion and transfers rise 1 billion automatically. Calculate the net income loss before induced consumption for the board.

**Question card story-science connection - exact player copy:** The remaining income loss measures the shock households face before further consumption effects.

**Question card prompt - exact player copy:** Submit the net change in disposable income before induced consumption.

**Complete format-specific interaction block:** `derive:{left_side:"R","goal":"net output change from the shock and stabilizers","givens":["initial shock=-10 billion","tax stabilizer=+2 billion","transfer stabilizer=+1 billion"],"lines":[{"id":"L1","expression":"net change=-10+2+1","license":"state governing relationship"},{"id":"L2","expression":"net change=-7 billion","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["-13 billion","-10 billion"],"correct_result":"-7 billion","answerText":"Automatic stabilizers reduce the 10-billion decline to a 7-billion decline without a new vote."}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `net change=−10−2−1`
2. `net change=−13 billion`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["initial shock=-10 billion", "tax stabilizer=+2 billion", "transfer stabilizer=+1 billion"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Stabilizer response in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "net change=-10+2+1", correct: true}
        - {text: "net change=−10−2−1", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "net change=-7 billion", correct: true}
        - {text: "net change=−13 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** −7b ±0.1.

**Answer text:** “Automatic stabilizers shrink the loss from 10 to 7 billion.”

**Why:** Stabilizers reduce the initial shock without a new vote.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Stabilizers reduce the initial shock without a new vote.

**State/output:** Record the result and unlock the next named stop.

## Stop 43 - Protect growth engines

**Format/placement:** ALLOCATE, at `forecast-table`.

**Metadata:** Concept: 15 - growth resources; Keystone: growth; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L5; Story role: decision input.

**Call - exact player copy:** Go to the forecast table, in Rate Room.

**Stop reason - exact player copy:** Stabilizers reduce the immediate shock, leaving a limited fund for the temporary response.

**Question card story setup - exact player copy:** The smaller seven-billion shock leaves a limited bridge fund. Allocate 100 points across household clearing, worker retraining, port repair, publicity, and a protected reserve while preserving all required growth investments.

**Question card story-science connection - exact player copy:** The allocation protects household clearing while retaining training and port capacity needed for future output.

**Question card prompt - exact player copy:** Allocate all 100 and submit the four funded items.

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"clearing",label:"payment clearing",cost:30,required:true},{id:"training",label:"worker training",cost:25,required:true},{id:"port",label:"port repair",cost:25,required:true},{id:"reserve",label:"protected contingency reserve",cost:20,required:true,protected:true},{id:"publicity",label:"confidence publicity",cost:20,required:false}],questions:[{id:"payments",text:"Does the plan keep clearing operational?",required:true},{id:"growth",text:"Does it fund training and port capacity?",required:true},{id:"reserve",text:"Does it preserve the restart reserve?",required:true}],correct_allocation:{clearing:30,training:25,port:25,reserve:20},answerText:"Spend all 100 on clearing, training, port repair, and the protected reserve; publicity would crowd out a required growth or safety item."}`

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 43 - Protect growth engines"
  format: "ALLOCATE"
  source: "Handback 3 canonical interaction block"
  question: "Allocate all 100 and submit the four funded items."
  payload: "`allocate:{pool:100,items:[{id:\"clearing\",label:\"payment clearing\",cost:30,required:true},{id:\"training\",label:\"worker training\",cost:25,required:true},{id:\"port\",label:\"port repair\",cost:25,required:true},{id:\"reserve\",label:\"protected contingency reserve\",cost:20,required:true,protected:true},{id:\"publicity\",label:\"confidence publicity\",cost:20,required:false}],questions:[{id:\"payments\",text:\"Does the plan keep clearing operational?\",required:true},{id:\"growth\",text:\"Does it fund training and port capacity?\",required:true},{id:\"reserve\",text:\"Does it preserve the restart reserve?\",required:true}],correct_allocation:{clearing:30,training:25,port:25,reserve:20},answerText:\"Spend all 100 on clearing, training, port repair, and the protected reserve; publicity would crowd out a required growth or safety item.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - ALLOCATE:**

```yaml
allocate_patch:
  questions:
    - {id: payments, requires: [clearing], required: true}
    - {id: growth, requires: [training, port], required: true}
    - {id: reserve, requires: [reserve], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  decision_can_fail: true
  question: "Allocate all 100 and submit the four funded items."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Fund clearing, training, port repair, and reserve.”

**Why:** Human capital, physical capital, and technology shift productive capacity; publicity does not.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Human capital, physical capital, and technology shift productive capacity; publicity does not.

**State/output:** Record the result and unlock the next named stop.

## Stop 44 - Wait or bridge

**Format/placement:** VALUE, asked by Eli Voss beside `allocation-slate`.

**Metadata:** Concept: 26 - stabilization timing; Keystone: fiscal/growth; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Eli Voss, at the allocation slate in Exchange Counter.

**Stop reason - exact player copy:** The timing and funding checks are complete and the board must choose the response's duration.

**Question card story setup - exact player copy:** Wage adjustment begins after launch, automatic stabilizers cover part of the loss, and the protected plan preserves growth capacity. Choose whether to wait, make permanent stimulus, or use a temporary bridge with an end date.

**Question card story-science connection - exact player copy:** The choice determines whether support bridges the launch delay without becoming an unjustified permanent commitment.

**Question card prompt - exact player copy:** Spend 80 and submit the plan.

**Complete format-specific interaction block:** `value:{budget:80,options:[{id:"temporary_bridge",axis:"short-run demand support",cost:50,required:true},{id:"sunset_review",axis:"automatic exit discipline",cost:30,required:true},{id:"permanent_stimulus",axis:"permanent demand expansion",cost:80,required:false},{id:"wait",axis:"no immediate support",cost:0,required:false}],total_available_cost:160,correct_purchase:["temporary_bridge","sunset_review"],answerText:"Buy the temporary bridge and sunset review for 80; permanent stimulus outlasts the gap and waiting leaves the lag unaddressed."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Use a temporary bridge with a sunset review; self-correction alone is too slow.”

**Why:** Temporary support can span a lag without becoming a permanent demand expansion.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Temporary support can span a lag without becoming a permanent demand expansion.

**State/output:** Page 11.

## Mission outcome

Mission decision: Self-correction is too slow. Use automatic stabilizers and a short bridge for capital and training. End the plan when its trigger is met. Bank ledgers now show that 4.15 works only when reserves arrive on time.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Brilliant analysis. You found the result the team needed: Self-correction is too slow. Halvern's families are closer to a currency changeover they can trust.

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 17:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The temporary bridge covers the lag and protects launch planning.

**Automatic bar change:** PRICES +4; READINESS +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 91/92/86/86; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Too Late By Itself. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Too Late By Itself, a new decision at Halvern's currency changeover requires the team to distinguish Self-correction from related macroeconomics ideas. Which statement correctly applies Self-correction?

**Options - exact player copy:**

- A. Taxes or transfers that change without a new law.
- B. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- C. Rising real gross domestic product (GDP) per person.
- D. Stabilizers reduce the initial shock without a new vote.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Self-correction; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Automatic stabilizer, not Self-correction. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Self-correction applies because wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- C: This describes Economic growth, not Self-correction. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes automatic stabilizers, not Self-correction. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Too Late By Itself, a new decision at Halvern's currency changeover requires the team to distinguish Automatic stabilizer from related macroeconomics ideas. Which description of Automatic stabilizer should guide the team's reasoning?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Rising real gross domestic product (GDP) per person.
- C. Taxes or transfers that change without a new law.
- D. Stabilizers reduce the initial shock without a new vote.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Automatic stabilizer; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Self-correction, not Automatic stabilizer. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Economic growth, not Automatic stabilizer. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Automatic stabilizer applies because taxes or transfers that change without a new law.
- D: This describes automatic stabilizers, not Automatic stabilizer. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Too Late By Itself, a new decision at Halvern's currency changeover requires the team to distinguish Economic growth from related macroeconomics ideas. Which claim about Economic growth is scientifically defensible?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Taxes or transfers that change without a new law.
- C. Stabilizers reduce the initial shock without a new vote.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Economic growth; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Self-correction, not Economic growth. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Automatic stabilizer, not Economic growth. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes automatic stabilizers, not Economic growth. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Economic growth applies because rising real gross domestic product (GDP) per person.

### Review question 4

**Prompt - exact player copy:** After Too Late By Itself, a new decision at Halvern's currency changeover requires the team to distinguish automatic stabilizers from related macroeconomics ideas. Which interpretation of automatic stabilizers is correct?

**Options - exact player copy:**

- A. Stabilizers reduce the initial shock without a new vote.
- B. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- C. Taxes or transfers that change without a new law.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for automatic stabilizers; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. automatic stabilizers applies because stabilizers reduce the initial shock without a new vote.
- B: This describes Self-correction, not automatic stabilizers. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Automatic stabilizer, not automatic stabilizers. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Economic growth, not automatic stabilizers. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Too Late By Itself, a new decision at Halvern's currency changeover requires the team to distinguish growth resources from related macroeconomics ideas. Which statement about growth resources would earn course credit?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Human capital, physical capital, and technology shift productive capacity; publicity does not.
- C. Taxes or transfers that change without a new law.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for growth resources; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Self-correction, not growth resources. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. growth resources applies because human capital, physical capital, and technology shift productive capacity; publicity does not.
- C: This describes Automatic stabilizer, not growth resources. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Economic growth, not growth resources. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Too Late By Itself, a new decision at Halvern's currency changeover requires the team to distinguish stabilization timing from related macroeconomics ideas. Which use of stabilization timing gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Taxes or transfers that change without a new law.
- C. Temporary support can span a lag without becoming a permanent demand expansion.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for stabilization timing; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Self-correction, not stabilization timing. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Automatic stabilizer, not stabilization timing. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. stabilization timing applies because temporary support can span a lag without becoming a permanent demand expansion.
- D: This describes Economic growth, not stabilization timing. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 12 - 4.15 On The Clock

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 4 DAYS

**Card title:** 4.15 on the Clock

**Go now:** Go to NOTES and meet Eli Voss at the conversion trays.

**Card body:** The currency change is ready for a full rehearsal: 4.15 old crowns must become one new RATE. Check account balances and whether banks receive the required cash reserves in time. Decide whether the exchange can proceed without leaving customers unable to make payments.

**Objective:** Certify the conversion ratio with cash, bank, and foreign-market evidence.

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
  - id: changeover_m12_we01
    title: Convert currency balances
    problem: A fictional conversion exchanges 5 old units for 1 new unit. Convert 200 old units.
    rule: New units=old units/(old units per new unit).
    steps:
    - 'Set up the relationship: New units=old units/(old units per new unit).'
    - new balance=200/5=40 new units.
    answer: The new balance is 40 units.
    common_mistake: The balance number changes; that alone does not change purchasing power.
  - id: changeover_m12_we02
    title: Required and excess reserves
    problem: Deposits are 100 million, reserves 15 million, and the hypothetical required-reserve ratio is 10%. Find required and excess reserves.
    rule: Required reserves=ratio×deposits; excess=actual-required.
    steps:
    - 'Set up the relationship: Required reserves=ratio×deposits; excess=actual-required.'
    - required=0.10(100)=10; excess=15-10=5 million.
    answer: The bank has 5 million above its required reserve in this teaching model.
    common_mistake: The assumed reserve ratio is a problem input, not a claim about current policy.
  - id: changeover_m12_we03
    title: Convert a foreign purchase
    problem: An item costs 20 foreign currency units. The exchange rate changes from 2 to 4 foreign units per domestic unit. Compare the domestic cost.
    rule: Domestic cost=foreign price/(foreign units per domestic unit).
    steps:
    - 'Set up the relationship: Domestic cost=foreign price/(foreign units per domestic unit).'
    - old cost=20/2=10 domestic units; new cost=20/4=5.
    answer: The domestic currency appreciated, making this unchanged foreign price cheaper domestically.
    common_mistake: Read the exchange-rate quotation direction before deciding whether to multiply or divide.
  - id: changeover_m12_we04
    title: Read an inclusive threshold
    problem: A fictional laboratory rule permits a sample concentration at or below 5 mg/L. A sample measures exactly 5 mg/L. Classify it under that rule.
    rule: At or below means concentration ≤ limit.
    steps:
    - comparison = 5 ≤ 5, which is true. Equality is included.
    - classification = passes this concentration rule. No claim about other requirements follows.
    answer: This measurement passes the stated inclusive threshold.
    common_mistake: Replacing ≤ with < would wrongly exclude equality.
  - id: changeover_m12_we05
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Conversion ratio: old currency units exchanged for one new unit.

Reserve clock: timed schedule that keeps required reserves available.

#### Primer concepts

- Money creation is a ceiling; the money market uses nominal interest rate i; foreign exchange changes net exports (NX).

#### Equations first needed today
`RATE = crowns/4.15`. Job: convert balances. Symbols: crowns old units. Why: rehearse exact legal exchange.

## Main story happening - designer summary

NOTES→BANKS→TRADE. Converted tray result opens bank clock; verified reserve result opens trade desk.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Note Hall | `conversion-trays` | automatic**

**World state:** Arrival | NOTES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Certify the conversion ratio with cash, bank, and foreign-market evidence.` Eli Voss points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Certify the conversion ratio with cash, bank, and foreign-market evidence.

**Dialogue bubbles -** Eli Voss: "Start with convert the tray. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 45 at `conversion-trays` in Note Hall.

**Beat 2 - After Stop 45 | `reserve-clock` | automatic**

**World state:** Keep this labeled result visible; Eli Voss says,, and Stop 46 unlocks.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. The tray becomes 10,000 RATE."

**Unlocks/waypoint:** Unlock Stop 46 at `reserve-clock` in Bank Supervision.

**Beat 3 - After Stop 46 | `payment-wires` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `NOTES → BANKS → TRADE` only if the route requires travel, then.

**Panel/HUD text:** NOTES → BANKS → TRADE

**Dialogue bubbles -** Eli Voss: "Good thinking. The reserve arrives exactly at the inclusive 1,000-RATE requirement."

**Unlocks/waypoint:** Unlock Stop 47 at `payment-wires` in Open-Economy Floor.

**Beat 4 - After Stop 47 | `custody-desk` | automatic**

**World state:** Preserve this result on the TRADE decision fixture; The character asks for the promised mission decision, and Stop 48 unlocks.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Three channels share the 4.00 shortcut; independent customs supports 4.15."

**Unlocks/waypoint:** Unlock Stop 48 at `custody-desk` in NOTES.

**Beat 5 - At mission end | `conversion-trays` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Outstanding work. You solved the mission. Approve 4.15 after replacing every 4.00 shortcut."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** NOTES → BANKS → TRADE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

NOTES→BANKS→TRADE. Converted tray result opens bank clock; verified reserve result opens trade desk.

## Key concepts, explained here

**Objective:** Certify the conversion ratio with cash, bank, and foreign-market evidence. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 45 - Convert the tray

**Format/placement:** DERIVE, at `conversion-trays`.

**Metadata:** Concept: 30 - conversion arithmetic; Keystone: real/nominal; Area: Rate Room; Learning role: PRACTICE; Difficulty: L2; Story role: L2.

**Call - exact player copy:** Go to the conversion trays, in Note Hall.

**Stop reason - exact player copy:** A physical tray is ready for release and its legal conversion amount must be checked first.

**Question card story setup - exact player copy:** A tray contains 41,500 old crowns, and the legal ratio is 4.15 crowns per RATE. Calculate the new balance before the notes can leave custody in the Rate Book.

**Question card story-science connection - exact player copy:** The converted balance prevents the custody transfer from changing the tray's lawful value.

**Question card prompt - exact player copy:** Submit the new account balance in RATE.

**Complete format-specific interaction block:** `derive:{left_side:"RATE","goal":"new RATE balance","givens":["old balance=41,500 crowns","conversion=4.15 crowns per RATE"],"lines":[{"id":"L1","expression":"RATE=crowns/(crowns per RATE)","license":"state governing relationship"},{"id":"L2","expression":"RATE=41,500/4.15=10,000","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["172,225 RATE","9,638 RATE"],"correct_result":"10,000 RATE","answerText":"The tray converts to exactly 10,000 RATE; division by crowns per RATE cancels the old unit."}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `RATE=crowns×(crowns per RATE)`
2. `RATE=41,500×4.15=172,225`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["old balance=41,500 crowns", "conversion=4.15 crowns per RATE"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Convert the tray in the form and units requested by the prompt"
  left_side: "RATE"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "RATE=crowns/(crowns per RATE)", correct: true}
        - {text: "RATE=crowns×(crowns per RATE)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "RATE=41,500/4.15=10,000", correct: true}
        - {text: "RATE=41,500×4.15=172,225", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** 10,000 ±0.01.

**Answer text:** “The tray becomes 10,000 RATE.”

**Why:** Exact conversion prevents rounding from creating a false price jump.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Exact conversion prevents rounding from creating a false price jump.

**State/output:** Record the result and unlock the next named stop.

## Stop 46 - Reserve clock

**Format/placement:** VERIFY, at `reserve-clock`.

**Metadata:** Concept: 19 - reserve timing; Keystone: banking; Area: Bank Supervision; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the reserve clock, in Bank Supervision.

**Stop reason - exact player copy:** The tray balance is established, but the clearing gate depends on reserves arriving in time.

**Question card story setup - exact player copy:** The 10,000-RATE deposit requires 10% reserves, and 1,000 RATE is scheduled at minute 6. Predict the minimum reserve before opening the clearing gate clearly for the next board decision.

**Question card story-science connection - exact player copy:** The reserve comparison identifies the first moment the bank meets the inclusive clearing requirement.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use `required reserves=deposit×reserve ratio` with 10,000 RATE and 10% and submit the required reserve in RATE. **OPERATE:** Advance the clearing clock. **MEASURE:** Record reserves at minute 6. **INTERPRET:** Submit whether the inclusive reserve rule permits clearing.

**Complete format-specific interaction block:** `verify:{prediction:{equation:"required reserves=deposit×reserve ratio",inputs:{deposit:10000,unit:"RATE",reserve_ratio:0.10},correct:1000,tolerance:0.01,submit_unit:"RATE"},lock:"clock stays locked until 1,000 RATE is committed",action:"advance clock to minute 6",measurement:{minute:6,reserves:1000,unit:"RATE"},decision_rule:"clear if reserves are at least the requirement",correct_conclusion:"clear at minute 6"}`

**Correct result:** The bank needs 1,000 RATE and has exactly 1,000 RATE at minute 6, so the inclusive rule permits clearing then.

**Answer text:** “The reserve arrives exactly at the inclusive 1,000-RATE requirement.”

**Why:** Correct totals can still fail when their timing differs.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Correct totals can still fail when their timing differs.

**State/output:** Record the result and unlock the next named stop.

## Stop 47 - Foreign echo

**Format/placement:** TRACE, at `payment-wires`.

**Metadata:** Concept: 30 - conversion/forex; Keystone: open economy; Area: Open-Economy Floor; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the payment wires, in Open-Economy Floor.

**Stop reason - exact player copy:** The bank clock passes while conflicting conversion tables remain in circulation.

**Question card story setup - exact player copy:** Because the bank clock passes, trace the shop labels, bond quote, export invoice, and independent customs receipt. Determine which channels inherit the old 4.00 shortcut and which preserve 4.15.

**Question card story-science connection - exact player copy:** Tracing dependencies identifies which prices and invoices inherit the shortcut and which independently use the legal ratio.

**Question card prompt - exact player copy:** Open dependencies and submit conclusion.

**Complete format-specific interaction block:** `trace:{channels:[{id:"shops",label:"shop labels",dependency:"4.00 shortcut table",target_dependent:true},{id:"bond",label:"bond quote",dependency:"4.00 shortcut table",target_dependent:true},{id:"exports",label:"export invoice",dependency:"4.00 shortcut table",target_dependent:true},{id:"customs",label:"customs receipt",dependency:"direct 4.15 conversion",independent:true}],shared_upstream:"4.00 shortcut table",correct_conclusion:"three dependent channels are biased; customs supports 4.15",answerText:"Shop, bond, and export agreement is redundant because all use 4.00; the independent customs receipt supports 4.15."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 47 - Foreign echo"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open dependencies and submit conclusion."
  payload: "`trace:{channels:[{id:\"shops\",label:\"shop labels\",dependency:\"4.00 shortcut table\",target_dependent:true},{id:\"bond\",label:\"bond quote\",dependency:\"4.00 shortcut table\",target_dependent:true},{id:\"exports\",label:\"export invoice\",dependency:\"4.00 shortcut table\",target_dependent:true},{id:\"customs\",label:\"customs receipt\",dependency:\"direct 4.15 conversion\",independent:true}],shared_upstream:\"4.00 shortcut table\",correct_conclusion:\"three dependent channels are biased; customs supports 4.15\",answerText:\"Shop, bond, and export agreement is redundant because all use 4.00; the independent customs receipt supports 4.15.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: shops, label: "Shop labels", reading: "4.00 crowns per RATE", dependency: shortcut_table}
    - {id: bond, label: "Bond quote", reading: "4.00 crowns per RATE", dependency: shortcut_table}
    - {id: exports, label: "Export invoice", reading: "4.00 crowns per RATE", dependency: shortcut_table}
    - {id: customs, label: "Customs receipt", reading: "4.15 crowns per RATE", dependency: direct_conversion, independent: true}
  sharedUpstream: shortcut_table
  correctConclusion: "Three dependent channels use 4.00; independent customs supports 4.15."
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Three channels share the 4.00 shortcut; independent customs supports 4.15.”

**Why:** Shared conversion dependence can manufacture agreement across prices and assets.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Shared conversion dependence can manufacture agreement across prices and assets.

**State/output:** Record the result and unlock the next named stop.

## Stop 48 - Operationally safe

**Format/placement:** ATTEST, asked by Eli Voss beside `custody-desk`.

**Metadata:** Concept: 32 - certification; Keystone: evidence integrity; Area: Rate Room; Learning role: COMBINE; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Eli Voss, at the custody desk in Note Hall.

**Stop reason - exact player copy:** The legal conversion and timing checks pass, but one shop-label claim remains uncorrected.

**Question card story setup - exact player copy:** The tray converts exactly, reserves arrive at the inclusive threshold, and independent customs rejects the shortcut table. Verify those three claims and reject the uncorrected shop-label claim in the Rate Book.

**Question card story-science connection - exact player copy:** Attestation separates verified payment readiness from a price-label assertion that still lacks support.

**Question card prompt - exact player copy:** Spend three marks and submit certification.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"tray",label:"tray converts to 10,000 RATE",signed:true,backed:true,critical:true},{id:"reserve",label:"1,000 RATE reserve arrives at minute 6",signed:true,backed:true,critical:true},{id:"customs",label:"customs uses 4.15",signed:true,backed:true,critical:false},{id:"shop_labels",label:"uncorrected shop labels are safe",signed:true,backed:false,critical:true}],correct_verified:["tray","reserve","customs"],critical_unbacked:"shop_labels",answerText:"Verify the tray, reserve, and customs claims; reject the critical shop-label claim because its 4.00 source remains uncorrected."}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Operationally safe", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Approve 4.15 after replacing every 4.00 shortcut.”

**Why:** Operational safety requires arithmetic, timing, and independent market evidence.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Operational safety requires arithmetic, timing, and independent market evidence.

**State/output:** Page 12.

## Mission outcome

Mission decision: Use the 4.15 exchange rate. Exact tray math, reserve timing, and customs data agree. The full test now works. Yet new state debt is pushing real rates up.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You turned a difficult clue into a clear decision. Your work produced a sound decision: Use the 4.15 exchange rate. The Currency Board can now protect buying power with a sounder decision.

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 18:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The full rehearsal passes but consumes reserve capacity.

**Automatic bar change:** READINESS +8; RESERVE −3

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/98/83/91; bank 0.

**Lock result:** READINESS locks at 100. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed 4.15 On The Clock. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After 4.15 On The Clock, a new decision at Halvern's currency changeover requires the team to distinguish Conversion ratio from related macroeconomics ideas. Which statement correctly applies Conversion ratio?

**Options - exact player copy:**

- A. Timed schedule that keeps required reserves available.
- B. Old currency units exchanged for one new unit.
- C. Exact conversion prevents rounding from creating a false price jump.
- D. Correct totals can still fail when their timing differs.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Conversion ratio; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Reserve clock, not Conversion ratio. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Conversion ratio applies because old currency units exchanged for one new unit.
- C: This describes conversion arithmetic, not Conversion ratio. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes reserve timing, not Conversion ratio. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After 4.15 On The Clock, a new decision at Halvern's currency changeover requires the team to distinguish Reserve clock from related macroeconomics ideas. Which description of Reserve clock should guide the team's reasoning?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Exact conversion prevents rounding from creating a false price jump.
- C. Timed schedule that keeps required reserves available.
- D. Correct totals can still fail when their timing differs.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Reserve clock; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Conversion ratio, not Reserve clock. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes conversion arithmetic, not Reserve clock. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Reserve clock applies because timed schedule that keeps required reserves available.
- D: This describes reserve timing, not Reserve clock. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After 4.15 On The Clock, a new decision at Halvern's currency changeover requires the team to distinguish conversion arithmetic from related macroeconomics ideas. Which claim about conversion arithmetic is scientifically defensible?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Timed schedule that keeps required reserves available.
- C. Correct totals can still fail when their timing differs.
- D. Exact conversion prevents rounding from creating a false price jump.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for conversion arithmetic; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Conversion ratio, not conversion arithmetic. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Reserve clock, not conversion arithmetic. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes reserve timing, not conversion arithmetic. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. conversion arithmetic applies because exact conversion prevents rounding from creating a false price jump.

### Review question 4

**Prompt - exact player copy:** After 4.15 On The Clock, a new decision at Halvern's currency changeover requires the team to distinguish reserve timing from related macroeconomics ideas. Which interpretation of reserve timing is correct?

**Options - exact player copy:**

- A. Correct totals can still fail when their timing differs.
- B. Old currency units exchanged for one new unit.
- C. Timed schedule that keeps required reserves available.
- D. Exact conversion prevents rounding from creating a false price jump.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for reserve timing; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. reserve timing applies because correct totals can still fail when their timing differs.
- B: This describes Conversion ratio, not reserve timing. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Reserve clock, not reserve timing. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes conversion arithmetic, not reserve timing. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After 4.15 On The Clock, a new decision at Halvern's currency changeover requires the team to distinguish conversion/forex from related macroeconomics ideas. Which statement about conversion/forex would earn course credit?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Shared conversion dependence can manufacture agreement across prices and assets.
- C. Timed schedule that keeps required reserves available.
- D. Exact conversion prevents rounding from creating a false price jump.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for conversion/forex; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Conversion ratio, not conversion/forex. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. conversion/forex applies because shared conversion dependence can manufacture agreement across prices and assets.
- C: This describes Reserve clock, not conversion/forex. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes conversion arithmetic, not conversion/forex. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After 4.15 On The Clock, a new decision at Halvern's currency changeover requires the team to distinguish certification from related macroeconomics ideas. Which use of certification gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Timed schedule that keeps required reserves available.
- C. Operational safety requires arithmetic, timing, and independent market evidence.
- D. Exact conversion prevents rounding from creating a false price jump.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for certification; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Conversion ratio, not certification. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Reserve clock, not certification. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. certification applies because operational safety requires arithmetic, timing, and independent market evidence.
- D: This describes conversion arithmetic, not certification. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 13 - Crowded Out Twice

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 3 DAYS

**Card title:** Crowded Out Twice

**Go now:** Go to RATE and meet Rhea Dane at the loanable-funds board.

**Card body:** The rehearsal passed, but the government must borrow to pay for temporary support. That borrowing could leave businesses facing higher loan costs and exporters facing a stronger currency. Trace both effects and decide whether to keep the full support package or reduce it.

**Objective:** Measure domestic and foreign crowding out.

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
  - id: changeover_m13_we01
    title: Trace crowding out
    problem: Government borrowing rises while national saving is fixed in a loanable-funds model. What may happen to private investment?
    rule: More borrowing demand raises the equilibrium real interest rate, other things equal.
    steps:
    - The higher real rate makes some private investment projects less attractive.
    - Private investment falls relative to what it otherwise would have been.
    answer: Government borrowing crowds out some private investment in this model.
    common_mistake: Do not confuse the real loanable-funds rate with a simple nominal money balance.
  - id: changeover_m13_we02
    title: Trace appreciation
    problem: A domestic currency appreciates while foreign prices and incomes are fixed. What pressure does this put on net exports?
    rule: Appreciation makes domestic goods dearer to foreigners and foreign goods cheaper domestically, other things equal.
    steps:
    - Export demand tends to fall as foreigners face higher prices.
    - Import demand tends to rise as residents face lower foreign-goods prices.
    answer: Net exports tend to fall.
    common_mistake: This is a directional prediction, not an instantaneous fixed numerical change.
  - id: changeover_m13_we03
    title: Combine fiscal offsets
    problem: A package initially adds 20 billion to demand, while investment and net exports fall by 4 and 6 billion in the same simplified accounting comparison. Find the net change.
    rule: Net change=initial gain+each signed offset.
    steps:
    - 'Set up the relationship: Net change=initial gain+each signed offset.'
    - net change=20-4-6=10 billion.
    answer: The net increase is 10 billion before any further effects not specified.
    common_mistake: Do not count an offset as an additional gain.
  - id: changeover_m13_we04
    title: Use Fisher's approximation
    problem: The nominal interest rate is 6% and expected inflation is 4%. Estimate the real rate.
    rule: Real rate≈nominal rate-expected inflation.
    steps:
    - 'Set up the relationship: Real rate≈nominal rate-expected inflation.'
    - real rate≈6%-4%=2%.
    answer: The approximate expected real borrowing rate is 2%.
    common_mistake: Use expected inflation for the expected real rate, not an unrelated past rate.
  - id: changeover_m13_we05
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

Budget deficit: government spending above tax revenue.

Crowding out: government borrowing raises real interest and reduces private investment.

#### Primer concepts

- Loanable funds (LF) uses real interest rate i, while the money market uses nominal i; fiscal expansion can appreciate currency and reduce net exports (NX).

#### Equations first needed today
Retrieve the Fisher relation and the gross domestic product (GDP) identity `GDP=C+I+G+NX`.

## Main story happening - designer summary

RATE→BANKS→TRADE. Loanable-funds shift sends player to private loan denials, then export orders.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Rate Room | `policy-wall` | automatic**

**World state:** Arrival | RATE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Measure domestic and foreign crowding out.` Rhea Dane points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Measure domestic and foreign crowding out.

**Dialogue bubbles -** Rhea Dane: "Start with real-rate market. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `policy-wall` in Rate Room.

**Beat 2 - After Stop 49 | `money-market-console` | automatic**

**World state:** Keep this labeled result visible; Rhea Dane says,, and Stop 50 unlocks.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Rhea Dane: "Nice work. Borrowing raises real i 0.6 point and reduces I 6 billion."

**Unlocks/waypoint:** Unlock Stop 50 at `money-market-console` in Bank Supervision.

**Beat 3 - After Stop 50 | `payment-wires` | automatic**

**World state:** Copy the result to the Rate Book; Activate TRADE, then.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Rhea Dane: "Good thinking. Deficit → loanable-funds demand right → real interest rises → private investment falls → capital accumulation slows → long-run growth slows."

**Unlocks/waypoint:** Unlock Stop 51 at `payment-wires` in Open-Economy Floor.

**Beat 4 - After Stop 51 | `signing-desk` | automatic**

**World state:** Preserve this result on the TRADE decision fixture; The character asks for the promised mission decision, and Stop 52 unlocks.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Rhea Dane: "Exactly right. Fiscal expansion → real interest rises → capital inflow → demand for RATE right → appreciation → net exports fall → aggregate-demand offset."

**Unlocks/waypoint:** Unlock Stop 52 at `signing-desk` in RATE.

**Beat 5 - At mission end | `policy-wall` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "Outstanding work. You solved the mission. Keep the narrower bridge with training and port repair; reject the full debt plan."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** RATE → BANKS → TRADE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

RATE→BANKS→TRADE. Loanable-funds shift sends player to private loan denials, then export orders.

## Key concepts, explained here

**Objective:** Measure domestic and foreign crowding out. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 49 - Real-rate market

**Format/placement:** CONTROL, at `policy-wall`.

**Metadata:** Concept: 22 - loanable funds; Keystone: interest markets; Area: Bank Supervision; Learning role: INTRODUCE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the policy wall, in Rate Room.

**Stop reason - exact player copy:** The proposed bridge requires borrowing, so its effect on private investment needs measuring.

**Question card story setup - exact player copy:** Hold national saving and central-bank money fixed, then add 8.7 billion of government borrowing to loan demand. Measure the real rate and private investment, then restore baseline for the board.

**Question card story-science connection - exact player copy:** The reversible loanable-funds test estimates the real-rate increase and investment displacement caused by the borrowing.

**Question card prompt - exact player copy:** Change borrowing 0→8.7b; keep saving and Ms fixed; measure real i 1.5→2.1% and I 120→114b; restore and remeasure; submit conclusion. `noise:.05,response:.6,candidates:[borrowing,saving,Ms]`.

**Complete format-specific interaction block:** `control:{candidates:[{id:"government_borrowing",change:"0 to 8.7 billion"},{id:"national_saving",change:"hold or reduce"},{id:"money_supply",change:"hold or increase"}],selected:"government_borrowing",baseline:{borrowing:0,real_rate:1.5,private_investment:120},response:{borrowing:8.7,real_rate:2.1,private_investment:114},units:{borrowing:"billion",real_rate:"percent",private_investment:"billion"},noise_band:{real_rate:0.05},fixed:["national saving","central-bank money supply"],measure:"after the loanable-funds panel settles",restore:{borrowing:0,real_rate:1.5,private_investment:120,remeasure:true},correct:"government borrowing raises the real rate and crowds out investment"}`

**Correct result:** Adding 8.7 billion of borrowing raises the real rate by 0.6 percentage point and cuts private investment by 6 billion; restoration recovers the baseline.

**Answer text:** “Borrowing raises real i 0.6 point and reduces I 6 billion.”

**Why:** A rightward loan-demand shift raises real interest and crowds out private investment.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A rightward loan-demand shift raises real interest and crowds out private investment.

**State/output:** Record the result and unlock the next named stop.

## Stop 50 - Domestic chain

**Format/placement:** DERIVE, at `money-market-console`.

**Metadata:** Concept: 22 - crowding out; Keystone: fiscal/growth; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the money-market console, in Bank Supervision.

**Stop reason - exact player copy:** The borrowing test shows lower private investment, and its longer-term consequence needs tracing.

**Question card story setup - exact player copy:** With private investment down 6 billion, build the domestic crowding-out chain from deficit to slower capital accumulation. Do not substitute nominal money-market rates for the measured real rate for the board.

**Question card story-science connection - exact player copy:** The domestic chain connects crowding out to slower capital accumulation rather than confusing it with nominal money-market rates.

**Question card prompt - exact player copy:** Complete the domestic transmission chain and submit its implications for private investment and long-run growth.

**Complete format-specific interaction block:** `derive:{left_side:"R",candidate_lines:["Government deficit raises public borrowing","Loanable-funds demand shifts right","The real interest rate rises","Private investment falls","Capital accumulation slows","Long-run output growth slows"],licenses:["government budget identity","loanable-funds model","market equilibrium","interest-sensitive investment","capital formation","production capacity"],keyed_order:[1,2,3,4,5,6],decoys:["Money supply must fall","Higher real rates raise private investment"],submission:"ordered line-and-rule chain"}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Government deficit automatically reduces public borrowing`
2. `Loanable-funds supply shifts right`
3. `The real interest rate falls`
4. `Private investment rises`
5. `Capital accumulation accelerates`
6. `Long-run output growth rises`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Government borrowing increases while the supply of loanable funds is held fixed. Private investment responds to the real interest rate."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Domestic chain in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Government deficit raises public borrowing", correct: true}
        - {text: "R = Government deficit automatically reduces public borrowing", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Loanable-funds demand shifts right", correct: true}
        - {text: "R = Loanable-funds supply shifts right", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = The real interest rate rises", correct: true}
        - {text: "R = The real interest rate falls", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Private investment falls", correct: true}
        - {text: "R = Private investment rises", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_5
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Capital accumulation slows", correct: true}
        - {text: "R = Capital accumulation accelerates", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_6
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Long-run output growth slows", correct: true}
        - {text: "R = Long-run output growth rises", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** A deficit raises loan demand and the real rate, crowds out private investment, slows capital growth, and reduces long-run growth.

**Answer text:** “Deficit → loanable-funds demand right → real interest rises → private investment falls → capital accumulation slows → long-run growth slows.”

**Why:** Less investment today slows the growth of productive capacity.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Less investment today slows the growth of productive capacity.

**State/output:** Record the result and unlock the next named stop.

## Stop 51 - Foreign chain

**Format/placement:** DERIVE, at `payment-wires`.

**Metadata:** Concept: 30 - fiscal/forex; Keystone: open economy; Area: Open-Economy Floor; Learning role: COMBINE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the payment wires, in Open-Economy Floor.

**Stop reason - exact player copy:** The real-rate rise also attracts foreign capital, adding a second offset to the fiscal expansion.

**Question card story setup - exact player copy:** Because Halvern's real rate rises, foreign capital enters, demand for RATE rises, and the currency appreciates. Complete the chain through net exports and AD clearly in the Rate Book for review.

**Question card story-science connection - exact player copy:** The foreign chain shows how appreciation and weaker net exports reduce part of the demand gain.

**Question card prompt - exact player copy:** Complete the international transmission chain and submit how it changes the initial aggregate-demand effect.

**Complete format-specific interaction block:** `derive:{left_side:"R",candidate_lines:["Fiscal expansion raises domestic demand","Government borrowing raises the real interest rate","Foreign capital flows into Halvern","Demand for RATE shifts right","RATE appreciates","Net exports fall","The fall in net exports offsets part of the rise in aggregate demand"],licenses:["fiscal transmission","loanable-funds model","international return comparison","foreign-exchange demand","currency equilibrium","net-exports response","AD components"],keyed_order:[1,2,3,4,5,6,7],decoys:["Capital leaves Halvern","Appreciation raises net exports"],submission:"ordered line-and-rule chain"}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Fiscal expansion lowers domestic demand`
2. `Government borrowing lowers the real interest rate`
3. `Foreign capital flows out of Halvern`
4. `Supply of RATE shifts left`
5. `RATE depreciates`
6. `Net exports rise`
7. `The rise in net exports magnifies the rise in aggregate demand`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Halvern increases government spending financed by borrowing in an open economy. Capital can move between countries and the exchange rate floats."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Foreign chain in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Fiscal expansion raises domestic demand", correct: true}
        - {text: "R = Fiscal expansion lowers domestic demand", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Government borrowing raises the real interest rate", correct: true}
        - {text: "R = Government borrowing lowers the real interest rate", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Foreign capital flows into Halvern", correct: true}
        - {text: "R = Foreign capital flows out of Halvern", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Demand for RATE shifts right", correct: true}
        - {text: "R = Supply of RATE shifts left", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_5
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = RATE appreciates", correct: true}
        - {text: "R = RATE depreciates", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_6
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = Net exports fall", correct: true}
        - {text: "R = Net exports rise", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_7
      doing: "select the next licensed transformation"
      candidates:
        - {text: "R = The fall in net exports offsets part of the rise in aggregate demand", correct: true}
        - {text: "R = The rise in net exports magnifies the rise in aggregate demand", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Fiscal expansion raises real rates, draws in capital, appreciates RATE, lowers net exports, and offsets part of the aggregate-demand gain.

**Answer text:** “Fiscal expansion → real interest rises → capital inflow → demand for RATE right → appreciation → net exports fall → aggregate-demand offset.”

**Why:** Fiscal expansion crowds out NX as well as private investment.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Fiscal expansion crowds out NX as well as private investment.

**State/output:** Record the result and unlock the next named stop.

## Stop 52 - Keep full bridge

**Format/placement:** VALUE, asked by Rhea Dane beside `signing-desk`.

**Metadata:** Concept: 24 - fiscal redesign; Keystone: fiscal/forex/growth; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Rhea Dane, at the signing desk in Rate Room.

**Stop reason - exact player copy:** Domestic and foreign offsets are now measured, requiring a review of the full bridge package.

**Question card story setup - exact player copy:** Fund a narrower bridge, training, and port repair within 100 points.

**Question card story-science connection - exact player copy:** The revised allocation balances immediate support with training and port investment under the fixed budget.

**Question card prompt - exact player copy:** Spend exactly 100 and submit.

**Complete format-specific interaction block:** `value:{budget:100,options:[{id:"narrow_bridge",axis:"temporary demand support",cost:45,required:true},{id:"training",axis:"worker matching",cost:25,required:true},{id:"port",axis:"supply capacity",cost:30,required:true},{id:"full_bridge",axis:"large fiscal expansion",cost:80,required:false},{id:"publicity",axis:"communications",cost:20,required:false}],total_available_cost:200,correct_purchase:["narrow_bridge","training","port"],answerText:"Spend all 100 on the narrow bridge, training, and port capacity; they address demand, structural mismatch, and supply without the crowding out caused by the full bridge."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Keep the narrower bridge with training and port repair; reject the full debt plan.”

**Why:** Targeted temporary support reduces crowding out while preserving long-run growth.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Targeted temporary support reduces crowding out while preserving long-run growth.

**State/output:** Page 13.

## Mission outcome

Mission decision: Replace the full bridge with a smaller short-term plan. The full deficit raises real rates. It cuts private investment and net exports. The new plan protects both people and future growth.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was first-rate reasoning. You pinned down the governing result: Replace the full bridge with a smaller short-term plan. Shops, banks, and workers have a safer path through the changeover.

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 18:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The narrower bridge protects exporters and restores confidence.

**Automatic bar change:** PRICES +4; TRUST +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/100/89/95; bank 0.

**Lock result:** PRICES remains vulnerable until M15. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Crowded Out Twice. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Crowded Out Twice, a new decision at Halvern's currency changeover requires the team to distinguish Budget deficit from related macroeconomics ideas. Which statement correctly applies Budget deficit?

**Options - exact player copy:**

- A. Government borrowing raises real interest and reduces private investment.
- B. Government spending above tax revenue.
- C. A rightward loan-demand shift raises real interest and crowds out private investment.
- D. Fiscal expansion crowds out NX as well as private investment.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Budget deficit; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Crowding out, not Budget deficit. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Budget deficit applies because government spending above tax revenue.
- C: This describes loanable funds, not Budget deficit. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes fiscal/forex, not Budget deficit. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Crowded Out Twice, a new decision at Halvern's currency changeover requires the team to distinguish Crowding out from related macroeconomics ideas. Which description of Crowding out should guide the team's reasoning?

**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. A rightward loan-demand shift raises real interest and crowds out private investment.
- C. Government borrowing raises real interest and reduces private investment.
- D. Fiscal expansion crowds out NX as well as private investment.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Crowding out; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Budget deficit, not Crowding out. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes loanable funds, not Crowding out. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Crowding out applies because government borrowing raises real interest and reduces private investment.
- D: This describes fiscal/forex, not Crowding out. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Crowded Out Twice, a new decision at Halvern's currency changeover requires the team to distinguish loanable funds from related macroeconomics ideas. Which claim about loanable funds is scientifically defensible?

**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. Government borrowing raises real interest and reduces private investment.
- C. Fiscal expansion crowds out NX as well as private investment.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for loanable funds; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Budget deficit, not loanable funds. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Crowding out, not loanable funds. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes fiscal/forex, not loanable funds. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. loanable funds applies because a rightward loan-demand shift raises real interest and crowds out private investment.

### Review question 4

**Prompt - exact player copy:** After Crowded Out Twice, a new decision at Halvern's currency changeover requires the team to distinguish fiscal/forex from related macroeconomics ideas. Which interpretation of fiscal/forex is correct?

**Options - exact player copy:**

- A. Fiscal expansion crowds out NX as well as private investment.
- B. Government spending above tax revenue.
- C. Government borrowing raises real interest and reduces private investment.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for fiscal/forex; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. fiscal/forex applies because fiscal expansion crowds out NX as well as private investment.
- B: This describes Budget deficit, not fiscal/forex. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Crowding out, not fiscal/forex. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes loanable funds, not fiscal/forex. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Crowded Out Twice, a new decision at Halvern's currency changeover requires the team to distinguish fiscal redesign from related macroeconomics ideas. Which statement about fiscal redesign would earn course credit?

**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. Targeted temporary support reduces crowding out while preserving long-run growth.
- C. Government borrowing raises real interest and reduces private investment.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for fiscal redesign; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Budget deficit, not fiscal redesign. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. fiscal redesign applies because targeted temporary support reduces crowding out while preserving long-run growth.
- C: This describes Crowding out, not fiscal redesign. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes loanable funds, not fiscal redesign. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Crowded Out Twice, a new decision at Halvern's currency changeover requires the team to distinguish Production possibilities curve (PPC) from related macroeconomics ideas. Which use of Production possibilities curve (PPC) gives the strongest basis for a decision?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Exchange service",
  "yLabel": "Bank support",
  "caption": "A bowed production possibilities curve.",
  "series": [
    {
      "name": "PPC",
      "points": [
        [
          0,
          100
        ],
        [
          20,
          97
        ],
        [
          40,
          90
        ],
        [
          60,
          76
        ],
        [
          80,
          52
        ],
        [
          100,
          0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. Government borrowing raises real interest and reduces private investment.
- C. A graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Production possibilities curve (PPC); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Budget deficit, not Production possibilities curve (PPC). The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Crowding out, not Production possibilities curve (PPC). The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Production possibilities curve (PPC) applies because a graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- D: This describes loanable funds, not Production possibilities curve (PPC). The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 14 - First-Week Cover

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 2 DAYS

**Card title:** First-Week Cover

**Go now:** Go to TRADE and meet Nia Corren at the port wire.

**Card body:** An overnight fuel disruption has raised costs again, just as the currency launch approaches. The exchange arithmetic can be right while families and businesses still struggle. Test the updated forecast and decide whether to delay the change or add temporary protection for its first week.

**Objective:** Protect launch without confusing a supply shock with a broken currency.

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
  - id: changeover_m14_we01
    title: Find a weighted price change
    problem: Food is half of spending and transport is half. Food prices rise 10%; transport prices are unchanged. Find the fixed-weight price rise.
    rule: Weighted change=sum of spending share×category price change.
    steps:
    - 'Set up the relationship: Weighted change=sum of spending share×category price change.'
    - change=0.5(10%)+0.5(0%)=5%.
    answer: The fixed-weight price increase is 5%.
    common_mistake: Do not count a category's full increase as if it were the whole basket.
  - id: changeover_m14_we02
    title: Identify a supply shock
    problem: Energy costs rise suddenly. Output falls while the price level rises. Which aggregate curve change fits?
    rule: Higher production costs shift short-run aggregate supply left, other things equal.
    steps:
    - At a given price level, firms are willing to supply less.
    - The new intersection gives lower output and higher prices.
    answer: A negative supply shock fits this combination, often called stagflation.
    common_mistake: A demand decrease alone would tend to lower both output and prices.
  - id: changeover_m14_we03
    title: Compare policy timing
    problem: A downturn requires action within two months; wage renegotiation occurs in six months. Can wage adjustment alone meet that deadline?
    rule: Distinguish eventual adjustment from the time needed to reach it.
    steps:
    - six months > two months, so the stated wage adjustment occurs after the deadline.
    - A separate temporary measure would need its own effect, cost, and timing assessment.
    answer: Wage adjustment alone does not meet the two-month target.
    common_mistake: A long-run prediction does not guarantee a short-run solution.
  - id: changeover_m14_we04
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
  - id: changeover_m14_we05
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

Policy lag: delay between action and full economic effect.

Trigger: a precommitted threshold that activates action.

Aggregate demand (AD): total planned spending at each price level.

#### Primer concepts

- Short-run aggregate supply (SRAS) shocks change the price level (PL) and real output (Y); a sound conversion ratio does not prevent real shocks; rules should state objective, direction, and limit.

#### Equations first needed today
Retrieve the aggregate-demand–aggregate-supply (AD–AS) model, multiplier, Fisher relation, and foreign-exchange chains.

## Main story happening - designer summary

TRADE→PRICES→RATE. Port evidence identifies shock; index wall quantifies pass-through; RATE writes trigger. Apparent victory becomes Twist 3.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Open-Economy Floor | `trade-ledger` | automatic**

**World state:** Arrival | TRADE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Protect launch without confusing a supply shock with a broken currency.` Nia Corren points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Protect launch without confusing a supply shock with a broken currency.

**Dialogue bubbles -** Nia Corren: "Start with shock identity. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `trade-ledger` in Open-Economy Floor.

**Beat 2 - After Stop 53 | `price-history-board` | automatic**

**World state:** Keep this labeled result visible; Nia Corren says,, and Stop 54 unlocks.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Nia Corren: "Nice work. The fuel disruption shifts SRAS left; 4.15 and payments remain sound."

**Unlocks/waypoint:** Unlock Stop 54 at `price-history-board` in Statistics Floor.

**Beat 3 - After Stop 54 | `forecast-table` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `TRADE → PRICES → RATE` only if the route requires travel, then.

**Panel/HUD text:** TRADE → PRICES → RATE

**Dialogue bubbles -** Nia Corren: "Good thinking. The direct basket effect is 2.4%; restoration returns baseline."

**Unlocks/waypoint:** Unlock Stop 55 at `forecast-table` in Rate Room.

**Beat 4 - After Stop 55 | `threshold-rail` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 56 unlocks.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Nia Corren: "Exactly right. Proceed at 4.15 with temporary first-week cover."

**Unlocks/waypoint:** Unlock Stop 56 at `threshold-rail` in Rate Room.

**Beat 5 - At mission end | `trade-ledger` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Corren: "Outstanding work. You solved the mission. Proceed with cover; buy bonds only at the joint output/payment trigger and stop at the CPI limit."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** TRADE → PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

TRADE→PRICES→RATE. Port evidence identifies shock; index wall quantifies pass-through; RATE writes trigger. Apparent victory becomes Twist 3.

## Key concepts, explained here

**Objective:** Protect launch without confusing a supply shock with a broken currency. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 53 - Shock identity

**Format/placement:** DIAGNOSIS, at `trade-ledger`.

**Metadata:** Concept: 14 - supply shock; Keystone: AD-AS; Area: Rate Room; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the trade ledger, in Open-Economy Floor.

**Stop reason - exact player copy:** A fresh price disturbance has arrived just as the launch plan is being finalized.

**Question card story setup - exact player copy:** Fuel imports fall 12%, input prices rise, real output falls, the legal 4.15 ratio clears, and payment failures stay at zero. Select the diagnosis fitting every reading for the board.

**Question card story-science connection - exact player copy:** The diagnosis identifies the shock that must be included before the board changes its policy stance.

**Question card prompt - exact player copy:** Select one diagnosis - real supply shock, bad conversion ratio, aggregate-demand boom, or money run - and submit the conclusion.

**Complete format-specific interaction block:** `answer:SRAS_left_real_shock; alternatives:[bad_ratio,AD_boom,money_run]`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The fuel disruption shifts SRAS left; 4.15 and payments remain sound.”

**Why:** A real supply shock can hurt output without invalidating the currency conversion.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A real supply shock can hurt output without invalidating the currency conversion.

**State/output:** Record the result and unlock the next named stop.

## Stop 54 - Pass-through test

**Format/placement:** VERIFY, at `price-history-board`.

**Metadata:** Concept: 17 - CPI/supply; Keystone: inflation; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** The fuel shock is identified and its direct effect on the household basket needs a prediction.

**Question card story setup - exact player copy:** The basket gives fuel a 20% weight, and fuel prices are predicted to rise 12% while all other basket prices stay fixed. The consumer price index (CPI) tracks the cost of the fixed household basket, and fuel carries 20% of its weight. Predict the direct CPI effect of a 12% fuel-price increase before revealing the updated basket.

**Question card story-science connection - exact player copy:** The weighted price effect separates fuel's direct contribution from any wider changes in the inflation rate.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use `direct CPI effect=price change×basket weight` with 12% and 20% and submit the effect in percentage points. **OPERATE:** Reveal the new basket. **MEASURE:** Record its CPI change. **INTERPRET:** Submit whether the result is a bounded relative-price shock.

**Complete format-specific interaction block:** `verify:{prediction:{equation:"direct CPI effect=fuel weight×fuel price change",inputs:{weight:0.20,price_change:12,unit:"percent"},correct:2.4,tolerance:0.05,submit_unit:"percentage points"},lock:"basket reveal stays locked until 2.4 points is committed",action:"reveal first-week basket with other prices fixed",measurement:{CPI_change:2.4,unit:"percentage points"},restore:{fuel_price_change:0,CPI_change:0,remeasure:true},correct_conclusion:"bounded relative-price shock"}`

**Correct result:** The direct CPI effect is 2.4 percentage points; returning fuel to baseline returns the direct effect to zero.

**Answer text:** “The direct basket effect is 2.4%; restoration returns baseline.”

**Why:** A bounded relative-price shock should not be mistaken for unlimited inflation.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A bounded relative-price shock should not be mistaken for unlimited inflation.

**State/output:** Record the result and unlock the next named stop.

## Stop 55 - Full model stress

**Format/placement:** STRESS, asked by Nia Corren beside `forecast-table`.

**Metadata:** Concept: 24 - integrated policy; Keystone: all keystones; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Nia Corren, at the forecast table in Rate Room.

**Stop reason - exact player copy:** The fuel estimate is ready and the full plan must withstand the combined disturbances.

**Question card story setup - exact player copy:** Because the direct price effect is bounded, stress delay, unconditional easing, and conversion-plus-cover across fuel shocks of 8%, 12%, and 16%. Submit the plan that preserves payments and limits the output loss.

**Question card story-science connection - exact player copy:** The model stress test selects a response that keeps payments working while limiting the output loss.

**Question card prompt - exact player copy:** Inspect three settings and submit one plan.

**Complete format-specific interaction block:** `range:8.16 step4; candidates:[delay,unconditional_ease,conversion_cover]; correct:conversion_cover`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 55 - Full model stress"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Inspect three settings and submit one plan."
  payload: "`range:8.16 step4; candidates:[delay,unconditional_ease,conversion_cover]; correct:conversion_cover`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "conversion pressure", min: 8, max: 16, nominal: 12.0, step: 4, unit: "index points"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 12.0, max: 12.0}
      failsAt: 16
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 12.0, max: 16}
      failsAt: 8
    - id: robust_plan
      label: "The keyed result shown by the completed interaction."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 8, max: 16}
  robust: robust_plan
  question: "Inspect three settings and submit one plan."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Proceed at 4.15 with temporary first-week cover.”

**Why:** Robust policy preserves the sound ratio while treating the separate real shock.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Robust policy preserves the sound ratio while treating the separate real shock.

**State/output:** Record the result and unlock the next named stop.

## Stop 56 - Write thresholds first

**Format/placement:** TRIGGER, at `threshold-rail`.

**Metadata:** Concept: 26 - conditional policy; Keystone: policy lag; Area: Rate Room; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the threshold rail, in Rate Room.

**Stop reason - exact player copy:** The robust plan is chosen, but emergency action still needs rules written before the first-week data arrive.

**Question card story setup - exact player copy:** The robust plan proceeds, but emergency bond buying must not activate from one noisy price print. Write output and payment thresholds before the sealed first-week update appears in the Rate Book.

**Question card story-science connection - exact player copy:** Precommitted output and payment thresholds prevent a noisy price reading from triggering an improvised intervention.

**Question card prompt - exact player copy:** Enter all three numeric thresholds, submit the rule, then reveal the sealed update; expected response is a trigger plan.

**Complete format-specific interaction block:** `rule:"Buy bonds only if real-output nowcast ≤680b AND payment failures ≥2%; stop if CPI companion ≥6.5%"; scale:{min:0,max:10,anchors:[680,2,6.5]}; objective:"protect output/payments"; direction:"buy bonds"; consequence_limit:"CPI 6.5"`.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 56 - Write thresholds first"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Enter all three numeric thresholds, submit the rule, then reveal the sealed update; expected response is a trigger plan."
  payload: "`rule:\"Buy bonds only if real-output nowcast ≤680b AND payment failures ≥2%; stop if CPI companion ≥6.5%\"; scale:{min:0,max:10,anchors:[680,2,6.5]}; objective:\"protect output/payments\"; direction:\"buy bonds\"; consequence_limit:\"CPI 6.5\"`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "payment-failure rate", min: 0, max: 10, step: 0.25, unit: "%"}
  start: 0.5
  anchors:
    - {at: 1.5, means: "routine baseline, not the decision threshold"}
    - {at: 6.5, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 0.8, hoursLeft: 48}
    - {at: "T-24 h", value: 1.4, hoursLeft: 24}
    - {at: "T-12 h", value: 2.0, hoursLeft: 12}
    - {at: "T-6 h", value: 2.6, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 1.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 2, max: 10}, leadHours: 12}
  question: "Enter all three numeric thresholds, submit the rule, then reveal the sealed update; expected response is a trigger plan."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Proceed with cover; buy bonds only at the joint output/payment trigger and stop at the CPI limit.”

**Why:** Precommitment makes intervention reversible and evidence-based.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Precommitment makes intervention reversible and evidence-based.

**State/output:** Page 14; READINESS locks.

## Mission outcome

Mission decision: Do not delay conversion. add temporary first-week cover. The fuel shock is real. But the 4.15 ratio and payments remain sound. The board posts joint action.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You kept your head when the evidence became difficult. The evidence now points to one clear action: Do not delay conversion. Your reasoning keeps one bad assumption from becoming national policy.

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 19:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** First-week cover preserves launch, while the new shock tests confidence.

**Automatic bar change:** READINESS +12 capped; TRUST −5

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/100/95/95; bank 0.

**Lock result:** READINESS remains locked. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed First-Week Cover. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After First-Week Cover, a new decision at Halvern's currency changeover requires the team to distinguish Policy lag from related macroeconomics ideas. Which statement correctly applies Policy lag?

**Options - exact player copy:**

- A. A precommitted threshold that activates action.
- B. Delay between action and full economic effect.
- C. Total planned spending at each price level.
- D. A real supply shock can hurt output without invalidating the currency conversion.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Policy lag; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Trigger, not Policy lag. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Policy lag applies because delay between action and full economic effect.
- C: This describes Aggregate demand (AD), not Policy lag. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes supply shock, not Policy lag. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After First-Week Cover, a new decision at Halvern's currency changeover requires the team to distinguish Trigger from related macroeconomics ideas. Which description of Trigger should guide the team's reasoning?

**Options - exact player copy:**

- A. Delay between action and full economic effect.
- B. Total planned spending at each price level.
- C. A precommitted threshold that activates action.
- D. A real supply shock can hurt output without invalidating the currency conversion.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Trigger; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Policy lag, not Trigger. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Aggregate demand (AD), not Trigger. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Trigger applies because a precommitted threshold that activates action.
- D: This describes supply shock, not Trigger. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After First-Week Cover, a new decision at Halvern's currency changeover requires the team to distinguish Aggregate demand (AD) from related macroeconomics ideas. Which claim about Aggregate demand (AD) is scientifically defensible?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "Aggregate demand slopes downward.",
  "series": [
    {
      "name": "AD",
      "points": [
        [
          20,
          95
        ],
        [
          40,
          80
        ],
        [
          60,
          64
        ],
        [
          80,
          49
        ],
        [
          100,
          35
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Delay between action and full economic effect.
- B. A precommitted threshold that activates action.
- C. A real supply shock can hurt output without invalidating the currency conversion.
- D. Total planned spending at each price level.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Aggregate demand (AD); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Policy lag, not Aggregate demand (AD). The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Trigger, not Aggregate demand (AD). The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes supply shock, not Aggregate demand (AD). The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. Aggregate demand (AD) applies because total planned spending at each price level.

### Review question 4

**Prompt - exact player copy:** After First-Week Cover, a new decision at Halvern's currency changeover requires the team to distinguish supply shock from related macroeconomics ideas. Which interpretation of supply shock is correct?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "An adverse supply shock shifts short-run aggregate supply left.",
  "series": [
    {
      "name": "Before",
      "points": [
        [
          25,
          35
        ],
        [
          45,
          48
        ],
        [
          65,
          63
        ],
        [
          85,
          82
        ]
      ]
    },
    {
      "name": "After shock",
      "points": [
        [
          15,
          48
        ],
        [
          35,
          61
        ],
        [
          55,
          76
        ],
        [
          75,
          95
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. A real supply shock can hurt output without invalidating the currency conversion.
- B. Delay between action and full economic effect.
- C. A precommitted threshold that activates action.
- D. Total planned spending at each price level.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for supply shock; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. supply shock applies because a real supply shock can hurt output without invalidating the currency conversion.
- B: This describes Policy lag, not supply shock. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Trigger, not supply shock. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Aggregate demand (AD), not supply shock. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After First-Week Cover, a new decision at Halvern's currency changeover requires the team to distinguish CPI/supply from related macroeconomics ideas. Which statement about CPI/supply would earn course credit?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Real output",
  "yLabel": "Price level",
  "caption": "An adverse supply shock shifts short-run aggregate supply left.",
  "series": [
    {
      "name": "Before",
      "points": [
        [
          25,
          35
        ],
        [
          45,
          48
        ],
        [
          65,
          63
        ],
        [
          85,
          82
        ]
      ]
    },
    {
      "name": "After shock",
      "points": [
        [
          15,
          48
        ],
        [
          35,
          61
        ],
        [
          55,
          76
        ],
        [
          75,
          95
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Delay between action and full economic effect.
- B. A bounded relative-price shock should not be mistaken for unlimited inflation.
- C. A precommitted threshold that activates action.
- D. Total planned spending at each price level.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for CPI/supply; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Policy lag, not CPI/supply. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. CPI/supply applies because a bounded relative-price shock should not be mistaken for unlimited inflation.
- C: This describes Trigger, not CPI/supply. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes Aggregate demand (AD), not CPI/supply. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After First-Week Cover, a new decision at Halvern's currency changeover requires the team to distinguish integrated policy from related macroeconomics ideas. Which use of integrated policy gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Delay between action and full economic effect.
- B. A precommitted threshold that activates action.
- C. Robust policy preserves the sound ratio while treating the separate real shock.
- D. Total planned spending at each price level.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for integrated policy; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Policy lag, not integrated policy. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Trigger, not integrated policy. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. integrated policy applies because robust policy preserves the sound ratio while treating the separate real shock.
- D: This describes Aggregate demand (AD), not integrated policy. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 15 - Sign With Conditions

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** CHANGEOVER TOMORROW

**Card title:** Sign with Conditions

**Go now:** Go to COUNTER and meet Eli Voss at the live queue board.

**Card body:** The first week's results are in, and the board must set the interest rate that households and businesses will face. Check production, prices, bank cash reserves, and foreign payments against your agreed rules. Sign the final rate decision and the conditions that would require it to change.

**Objective:** Make the final integrated, reversible macroeconomic decision.

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
  - id: changeover_m15_we01
    title: Use Fisher's approximation
    problem: The nominal interest rate is 6% and expected inflation is 4%. Estimate the real rate.
    rule: Real rate≈nominal rate-expected inflation.
    steps:
    - 'Set up the relationship: Real rate≈nominal rate-expected inflation.'
    - real rate≈6%-4%=2%.
    answer: The approximate expected real borrowing rate is 2%.
    common_mistake: Use expected inflation for the expected real rate, not an unrelated past rate.
  - id: changeover_m15_we02
    title: Measure an output gap
    problem: Actual real output is 95 billion and potential output is 100 billion. Find the signed gap and percent gap.
    rule: Gap=actual-potential; percent gap=gap/potential×100%.
    steps:
    - 'Set up the relationship: Gap=actual-potential; percent gap=gap/potential×100%.'
    - gap=95-100=-5 billion; percent gap=-5/100×100%=-5%.
    answer: The economy has a recessionary gap of 5 billion, or 5% below potential.
    common_mistake: Potential output is the reference denominator.
  - id: changeover_m15_we03
    title: Required and excess reserves
    problem: Deposits are 100 million, reserves 15 million, and the hypothetical required-reserve ratio is 10%. Find required and excess reserves.
    rule: Required reserves=ratio×deposits; excess=actual-required.
    steps:
    - 'Set up the relationship: Required reserves=ratio×deposits; excess=actual-required.'
    - required=0.10(100)=10; excess=15-10=5 million.
    answer: The bank has 5 million above its required reserve in this teaching model.
    common_mistake: The assumed reserve ratio is a problem input, not a claim about current policy.
  - id: changeover_m15_we04
    title: Close a current account
    problem: Net exports are -10, net foreign income +3, and net transfers -1 billion. Find the current account.
    rule: Current account=net exports+net income+net transfers.
    steps:
    - 'Set up the relationship: Current account=net exports+net income+net transfers.'
    - current account=-10+3-1=-8 billion.
    answer: The current account has a deficit of 8 billion.
    common_mistake: An asset purchase belongs in the financial account, not this sum.
  - id: changeover_m15_we05
    title: Combine fiscal offsets
    problem: A package initially adds 20 billion to demand, while investment and net exports fall by 4 and 6 billion in the same simplified accounting comparison. Find the net change.
    rule: Net change=initial gain+each signed offset.
    steps:
    - 'Set up the relationship: Net change=initial gain+each signed offset.'
    - net change=20-4-6=10 billion.
    answer: The net increase is 10 billion before any further effects not specified.
    common_mistake: Do not count an offset as an additional gain.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

No new terms.

#### Primer concepts

- Retrieve every Rate Book page; distinguish nominal from real rates and short from long run; require all four bars and thresholds.

#### Equations first needed today
No new equation; retrieve gross domestic product (GDP), the consumer price index (CPI), unemployment, multipliers, reserves, the Fisher relation, the equation of exchange (`M V=P Y`, where M is money supply, V is velocity, P is the price level, and Y is real output), the balance of payments (BOP), and conversion relationships.

## Main story happening - designer summary

COUNTER→BANKS→RATE. S1 reads household case, S2 certifies reserves and rates, S3 applies all causal chains, S4 signs. Major characters contribute one constraint by radio; Mara alone asks the final decision.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Exchange Counter | `live-economy-panel` | automatic**

**World state:** Arrival | RATE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Make the final integrated, reversible macroeconomic decision.` Mara Venn points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Make the final integrated, reversible macroeconomic decision.

**Dialogue bubbles -** Eli Voss: "Start with live economy panel. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `live-economy-panel` in Exchange Counter.

**Beat 2 - After Stop 57 | `reserve-clock` | automatic**

**World state:** Keep this labeled result visible; Mara Venn says,, and Stop 58 unlocks.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. The gap is −38 billion; payment failures 0.5% do not meet the 2% trigger."

**Unlocks/waypoint:** Unlock Stop 58 at `reserve-clock` in Bank Supervision.

**Beat 3 - After Stop 58 | `threshold-rail` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `RATE → BANKS → COUNTER` only if the route requires travel, then.

**Panel/HUD text:** RATE → BANKS → COUNTER

**Dialogue bubbles -** Eli Voss: "Good thinking. At 3.25%, the real rate is 1.00% and banks retain 2 billion excess reserves."

**Unlocks/waypoint:** Unlock Stop 59 at `threshold-rail` in Rate Room.

**Beat 4 - After Stop 59 | `conversion-desk` | automatic**

**World state:** Preserve this result on the COUNTER decision fixture; The character asks for the promised mission decision, and Stop 60 unlocks.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. The real rate links investment, AD, capital flows, currency, NX, and growth; CPI and payment limits independently govern reversal."

**Unlocks/waypoint:** Unlock Stop 60 at `conversion-desk` in COUNTER.

**Beat 5 - At mission end | `live-economy-panel` | automatic**

**World state:** Mission outcome and hook | COUNTER | automatic   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Outstanding work. You solved the mission. The rate is not a promise that nothing will change. It is a promise that we know when we will."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** RATE → BANKS → COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

COUNTER→BANKS→RATE. S1 reads household case, S2 certifies reserves and rates, S3 applies all causal chains, S4 signs. Major characters contribute one constraint by radio; Mara alone asks the final decision.

## Key concepts, explained here

**Objective:** Make the final integrated, reversible macroeconomic decision. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 57 - Live economy panel

**Format/placement:** BALLPARK, at `live-economy-panel`.

**Metadata:** Concept: 32 - national snapshot; Keystone: GDP/inflation/labor; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Go to the live economy panel, in Exchange Counter.

**Stop reason - exact player copy:** The first-week readings are visible and must be assessed against the signed thresholds.

**Question card story setup - exact player copy:** Launch data show real GDP 682 billion, Yf 720, unemployment 8.2%, companion inflation 3.0%, payment failures 0.5%, and fuel costs easing. Count the readings relevant to the signed stance.

**Question card story-science connection - exact player copy:** The live output gap and payment evidence determine whether the agreed emergency condition has actually been met.

**Question card prompt - exact player copy:** Select all six readings, calculate gap `682−720`, and submit conclusion.

**Complete format-specific interaction block:** `balance:{streams:[{id:"actual_output",value:682,unit:"billion RATE",counts:true},{id:"full_employment_output",value:720,unit:"billion RATE",counts:true},{id:"unemployment",value:8.2,unit:"percent",counts:true},{id:"CPI_inflation",value:3.0,unit:"percent",counts:true},{id:"payment_failures",value:0.5,unit:"percent",counts:true},{id:"fuel_easing",value:1,unit:"status flag",counts:false,reason:"context, not an output-gap stream"}],correct:{gap:-38,trigger:"no joint inflation-payment trigger"},answerText:"The economy has a 38-billion recessionary gap, but the joint trigger is not met; fuel easing is context rather than a counted ledger stream."}`

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 57 - Live economy panel"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Select all six readings, calculate gap `682−720`, and submit conclusion."
  payload: "`balance:{streams:[{id:\"actual_output\",value:682,unit:\"billion RATE\",counts:true},{id:\"full_employment_output\",value:720,unit:\"billion RATE\",counts:true},{id:\"unemployment\",value:8.2,unit:\"percent\",counts:true},{id:\"CPI_inflation\",value:3.0,unit:\"percent\",counts:true},{id:\"payment_failures\",value:0.5,unit:\"percent\",counts:true},{id:\"fuel_easing\",value:1,unit:\"status flag\",counts:false,reason:\"context, not an output-gap stream\"}],correct:{gap:-38,trigger:\"no joint inflation-payment trigger\"},answerText:\"The economy has a 38-billion recessionary gap, but the joint trigger is not met; fuel easing is context rather than a counted ledger stream.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "signed real-output gap"
  unit: "billion RATE"
  inputs:
    - {label: "Actual real output", value: 682, unit: "billion RATE"}
    - {label: "Full-employment output", value: 720, unit: "billion RATE"}
    - {label: "CPI inflation", value: 3.0, unit: "%", contextOnly: true}
    - {label: "Payment failures", value: 0.5, unit: "%", contextOnly: true}
  operation: "actual real output minus full-employment output"
  formula: "output gap=682-720"
  start: 0
  correctResult: -38
  tolerance: 1
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** −38b; no trigger.

**Answer text:** “The gap is −38 billion; payment failures 0.5% do not meet the 2% trigger.”

**Why:** Output is weak, but the payment trigger has not fired and inflation is below its stop limit.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.

**State/output:** Record the result and unlock the next named stop.

## Stop 58 - Rate pair

**Format/placement:** DERIVE, at `reserve-clock`.

**Metadata:** Concept: 23 - Fisher and reserves; Keystone: rates/money; Area: Bank Supervision; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the reserve clock, in Bank Supervision.

**Stop reason - exact player copy:** The live panel is checked, leaving the real borrowing rate and reserve cushion to calculate.

**Question card story setup - exact player copy:** Expected inflation is 2.25%, the proposed nominal rate is 3.25%, deposits are 120 billion, reserves are 14 billion, and rr is 10%. Derive real rate and excess reserves.

**Question card story-science connection - exact player copy:** The rate-reserve pair tests the policy stance and bank liquidity using today's actual inputs.

**Question card prompt - exact player copy:** Submit the real rate and excess reserves.

**Complete format-specific interaction block:** `derive:{left_side:"policy pair","goal":"real rate and excess reserves","givens":["nominal rate=3.25%","expected inflation=2.25%","deposits=120 billion","reserve ratio=10%","actual reserves=14 billion"],"lines":[{"id":"L1","expression":"real rate=3.25%-2.25%=1.00%","license":"state governing relationship"},{"id":"L2","expression":"required reserves=120×0.10=12 billion","license":"substitute displayed values"},{"id":"L3","expression":"excess reserves=14-12=2 billion","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["real rate=5.50%","excess reserves=12 billion"],"correct_result":"(1.00%,2 billion)","answerText":"The real rate is 1.00% and banks hold 2 billion in excess reserves."}`

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `real rate=3.25%+2.25%=5.50%`
2. `required reserves=120/0.10=1,200 billion`
3. `excess reserves=14−2=12 billion`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["nominal rate=3.25%", "expected inflation=2.25%", "deposits=120 billion", "reserve ratio=10%", "actual reserves=14 billion"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Rate pair in the form and units requested by the prompt"
  left_side: "policy pair"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "real rate=3.25%-2.25%=1.00%", correct: true}
        - {text: "real rate=3.25%+2.25%=5.50%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "required reserves=120×0.10=12 billion", correct: true}
        - {text: "required reserves=120/0.10=1,200 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "excess reserves=14-12=2 billion", correct: true}
        - {text: "excess reserves=14−2=12 billion", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** (1.00%,2b).

**Answer text:** “At 3.25%, the real rate is 1.00% and banks retain 2 billion excess reserves.”

**Why:** A workable stance needs both borrowing conditions and bank capacity.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A workable stance needs both borrowing conditions and bank capacity.

**State/output:** Record the result and unlock the next named stop.

## Stop 59 - Consequence audit

**Format/placement:** TRACE, at `threshold-rail`.

**Metadata:** Concept: 24 - linked policy consequences; Keystone: AD/forex/growth; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Go to the threshold rail, in Rate Room.

**Stop reason - exact player copy:** The final numbers are ready, but the safeguards still need checking for shared dependencies.

**Question card story setup - exact player copy:** Because 3.25% yields a 1.00% real rate with positive reserves, trace its effects through investment, AD, capital flows, exchange value, NX, and growth. Separate independent price and payment safeguards.

**Question card story-science connection - exact player copy:** The consequence audit distinguishes independent protection of prices and payments from repeated versions of one check.

**Question card prompt - exact player copy:** Open every dependency and submit the complete consequence map.

**Complete format-specific interaction block:** `trace:{channels:[{id:"investment",label:"private investment",dependency:"real interest rate",target_dependent:true},{id:"aggregate_demand",label:"aggregate demand",dependency:"real interest rate",target_dependent:true},{id:"capital",label:"capital formation",dependency:"real interest rate",target_dependent:true},{id:"forex",label:"capital inflow and RATE demand",dependency:"real interest rate",target_dependent:true},{id:"net_exports",label:"net exports",dependency:"exchange-rate branch",target_dependent:true},{id:"growth",label:"long-run growth",dependency:"capital branch",target_dependent:true},{id:"CPI",label:"CPI check",dependency:"price survey",independent:true},{id:"payments",label:"payment failures",dependency:"payment network",independent:true}],shared_upstream:"real interest rate",correct_conclusion:"moderate stance with independent CPI and payment safeguards",answerText:"Six policy channels share the real-rate source; independent CPI and payment channels keep the final stance conditional."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 59 - Consequence audit"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open every dependency and submit the complete consequence map."
  payload: "`trace:{channels:[{id:\"investment\",label:\"private investment\",dependency:\"real interest rate\",target_dependent:true},{id:\"aggregate_demand\",label:\"aggregate demand\",dependency:\"real interest rate\",target_dependent:true},{id:\"capital\",label:\"capital formation\",dependency:\"real interest rate\",target_dependent:true},{id:\"forex\",label:\"capital inflow and RATE demand\",dependency:\"real interest rate\",target_dependent:true},{id:\"net_exports\",label:\"net exports\",dependency:\"exchange-rate branch\",target_dependent:true},{id:\"growth\",label:\"long-run growth\",dependency:\"capital branch\",target_dependent:true},{id:\"CPI\",label:\"CPI check\",dependency:\"price survey\",independent:true},{id:\"payments\",label:\"payment failures\",dependency:\"payment network\",independent:true}],shared_upstream:\"real interest rate\",correct_conclusion:\"moderate stance with independent CPI and payment safeguards\",answerText:\"Six policy channels share the real-rate source; independent CPI and payment channels keep the final stance conditional.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: investment, label: "Private investment", reading: "falls as the real rate rises", dependency: real_interest_rate}
    - {id: aggregate_demand, label: "Aggregate demand", reading: "falls with investment", dependency: real_interest_rate}
    - {id: capital, label: "Capital formation", reading: "slows after investment falls", dependency: real_interest_rate}
    - {id: forex, label: "Capital inflow and RATE demand", reading: "rise with the real rate", dependency: real_interest_rate}
    - {id: net_exports, label: "Net exports", reading: "fall after RATE appreciates", dependency: exchange_rate_branch}
    - {id: growth, label: "Long-run growth", reading: "slows with capital formation", dependency: capital_branch}
    - {id: cpi, label: "CPI check", reading: "3.0% inflation", dependency: price_survey, independent: true}
    - {id: payments, label: "Payment failures", reading: "0.5% of payments", dependency: payment_network, independent: true}
  sharedUpstream: real_interest_rate
  correctConclusion: "Use a moderate stance with independent CPI and payment safeguards."
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The real rate links investment, AD, capital flows, currency, NX, and growth; CPI and payment limits independently govern reversal.”

**Why:** The final rate is credible only if domestic and foreign consequences remain visible.

**Wrong-path feedback:** A different response does not fit the displayed evidence. The final rate is credible only if domestic and foreign consequences remain visible.

**State/output:** Record the result and unlock the next named stop.

## Stop 60 - Sign

**Format/placement:** TRIGGER, at `conversion-desk`.

**Metadata:** Concept: 24 - final policy; Keystone: all keystones; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Call - exact player copy:** Go to the conversion desk, in Exchange Counter.

**Stop reason - exact player copy:** All final checks are assembled and the currency plan is ready for authorization.

**Question card story setup - exact player copy:** Enter the final numbers and sign only if every bar is complete.

**Question card story-science connection - exact player copy:** The completed signature records whether every required economic and payment condition supports proceeding with conversion.

**Question card prompt - exact player copy:** Submit number pair `(4.15 crowns/RATE, 3.25%)`, then the three numeric conditions, then select SIGN; the panel blocks SIGN unless all four bars equal 100.

**Complete format-specific interaction block:** `rule:"conversion 4.15; policy rate 3.25%; buy bonds if Y≤680 AND failures≥2%; stop if companion CPI≥6.5%"; anchors:[4.15,3.25,680,2,6.5]; objective:"stable conversion with full employment and price guard"; direction:"conditional expansion"; consequence_limit:"CPI"`.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 60 - Sign"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Submit number pair `(4.15 crowns/RATE, 3.25%)`, then the three numeric conditions, then select SIGN; the panel blocks SIGN unless all four bars equal 100."
  payload: "`rule:\"conversion 4.15; policy rate 3.25%; buy bonds if Y≤680 AND failures≥2%; stop if companion CPI≥6.5%\"; anchors:[4.15,3.25,680,2,6.5]; objective:\"stable conversion with full employment and price guard\"; direction:\"conditional expansion\"; consequence_limit:\"CPI\"`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "payment-failure rate", min: 0, max: 10, step: 0.25, unit: "%"}
  start: 0.5
  anchors:
    - {at: 1.5, means: "routine baseline, not the decision threshold"}
    - {at: 6.5, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 0.7, hoursLeft: 48}
    - {at: "T-24 h", value: 1.3, hoursLeft: 24}
    - {at: "T-12 h", value: 2.0, hoursLeft: 12}
    - {at: "T-6 h", value: 2.4, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 1.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 2, max: 10}, leadHours: 12}
  question: "Submit number pair `(4.15 crowns/RATE, 3.25%)`, then the three numeric conditions, then select SIGN; the panel blocks SIGN unless all four bars equal 100."
```

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Signed: 4.15 conversion, 3.25% policy rate, with joint output/payment action trigger and CPI stop.”

**Why:** Conditions turn one rate choice into a testable policy rather than a guess.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Conditions turn one rate choice into a testable policy rather than a guess.

**State/output:** Page 15; all locks; no more quizzes.

## Mission outcome

Mission decision: Sign a 3.25% policy rate. And the 4.15 conversion with the posted conditions. The real rate is 1.00%, reserves stay positive. And neither emergency trigger has fired. Shops replace the last shortcut labels.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Exceptional work. You brought the campaign to a decisive conclusion: Sign a 3.25% policy rate. Halvern can move forward with clearer prices and fewer risks for ordinary families.

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 20:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Every independent threshold passes and the signed conditions are published.

**Automatic bar change:** CONVERSION READINESS `to 100`; HOUSEHOLD PRICE STABILITY `to 100`; BANK RESERVE COVER `to 100`; PUBLIC TRUST `to 100`

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/100/100/100; bank ≥1.

**Lock result:** All four lock; victory. If any bar is 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Sign With Conditions. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1

**Prompt - exact player copy:** After Sign With Conditions, a new decision at Halvern's currency changeover requires the team to distinguish national snapshot from related macroeconomics ideas. Which statement correctly applies national snapshot?

**Options - exact player copy:**

- A. A workable stance needs both borrowing conditions and bank capacity.
- B. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- C. The final rate is credible only if domestic and foreign consequences remain visible.
- D. Conditions turn one rate choice into a testable policy rather than a guess.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for national snapshot; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes Fisher and reserves, not national snapshot. The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. national snapshot applies because output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- C: This describes linked policy consequences, not national snapshot. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes final policy, not national snapshot. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 2

**Prompt - exact player copy:** After Sign With Conditions, a new decision at Halvern's currency changeover requires the team to distinguish Fisher and reserves from related macroeconomics ideas. Which description of Fisher and reserves should guide the team's reasoning?

**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. The final rate is credible only if domestic and foreign consequences remain visible.
- C. A workable stance needs both borrowing conditions and bank capacity.
- D. Conditions turn one rate choice into a testable policy rather than a guess.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Fisher and reserves; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes national snapshot, not Fisher and reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes linked policy consequences, not Fisher and reserves. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Fisher and reserves applies because a workable stance needs both borrowing conditions and bank capacity.
- D: This describes final policy, not Fisher and reserves. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 3

**Prompt - exact player copy:** After Sign With Conditions, a new decision at Halvern's currency changeover requires the team to distinguish linked policy consequences from related macroeconomics ideas. Which claim about linked policy consequences is scientifically defensible?

**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. A workable stance needs both borrowing conditions and bank capacity.
- C. Conditions turn one rate choice into a testable policy rather than a guess.
- D. The final rate is credible only if domestic and foreign consequences remain visible.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for linked policy consequences; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes national snapshot, not linked policy consequences. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Fisher and reserves, not linked policy consequences. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes final policy, not linked policy consequences. The two ideas use different relationships, mechanisms, or evidence limits.
- D: Correct. linked policy consequences applies because the final rate is credible only if domestic and foreign consequences remain visible.

### Review question 4

**Prompt - exact player copy:** After Sign With Conditions, a new decision at Halvern's currency changeover requires the team to distinguish final policy from related macroeconomics ideas. Which interpretation of final policy is correct?

**Options - exact player copy:**

- A. Conditions turn one rate choice into a testable policy rather than a guess.
- B. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- C. A workable stance needs both borrowing conditions and bank capacity.
- D. The final rate is credible only if domestic and foreign consequences remain visible.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for final policy; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: Correct. final policy applies because conditions turn one rate choice into a testable policy rather than a guess.
- B: This describes national snapshot, not final policy. The two ideas use different relationships, mechanisms, or evidence limits.
- C: This describes Fisher and reserves, not final policy. The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes linked policy consequences, not final policy. The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 5

**Prompt - exact player copy:** After Sign With Conditions, a new decision at Halvern's currency changeover requires the team to distinguish Production possibilities curve (PPC) from related macroeconomics ideas. Which statement about Production possibilities curve (PPC) would earn course credit?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Exchange service",
  "yLabel": "Bank support",
  "caption": "A bowed production possibilities curve.",
  "series": [
    {
      "name": "PPC",
      "points": [
        [
          0,
          100
        ],
        [
          20,
          97
        ],
        [
          40,
          90
        ],
        [
          60,
          76
        ],
        [
          80,
          52
        ],
        [
          100,
          0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. A graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- C. A workable stance needs both borrowing conditions and bank capacity.
- D. The final rate is credible only if domestic and foreign consequences remain visible.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Production possibilities curve (PPC); the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes national snapshot, not Production possibilities curve (PPC). The two ideas use different relationships, mechanisms, or evidence limits.
- B: Correct. Production possibilities curve (PPC) applies because a graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- C: This describes Fisher and reserves, not Production possibilities curve (PPC). The two ideas use different relationships, mechanisms, or evidence limits.
- D: This describes linked policy consequences, not Production possibilities curve (PPC). The two ideas use different relationships, mechanisms, or evidence limits.

### Review question 6

**Prompt - exact player copy:** After Sign With Conditions, a new decision at Halvern's currency changeover requires the team to distinguish Scarcity from related macroeconomics ideas. Which use of Scarcity gives the strongest basis for a decision?

**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. A workable stance needs both borrowing conditions and bank capacity.
- C. Limited resources cannot satisfy every want, so every choice gives up an alternative.
- D. The final rate is credible only if domestic and foreign consequences remain visible.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship, mechanism, or evidence limit for Scarcity; the other choices describe different course ideas.

**Option feedback - exact player copy:**

- A: This describes national snapshot, not Scarcity. The two ideas use different relationships, mechanisms, or evidence limits.
- B: This describes Fisher and reserves, not Scarcity. The two ideas use different relationships, mechanisms, or evidence limits.
- C: Correct. Scarcity applies because limited resources cannot satisfy every want, so every choice gives up an alternative.
- D: This describes linked policy consequences, not Scarcity. The two ideas use different relationships, mechanisms, or evidence limits.

**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# 9. Mission-at-a-glance production map

| Mission | Main event | Route | Core macroeconomics | Ending change |
|---:|---|---|---|---|
|1|Queue claim tested|COUNTER|scarcity, PPC, supply/demand|National cash-shortage claim rejected|
|2|Nominal headline rebuilt|PRICES|GDP categories, real/nominal|Real output replaces false growth claim|
|3|Official basket audited|PRICES|CPI, inflation, bias|Companion index authorized|
|4|Labor denominator restored|COUNTER|unemployment, output gap|Recession warning established|
|5|First-round package sized|PRICES → RATE|MPC/MPS, multipliers|8.7-billion option prepared|
|6|Twist 1|PRICES → RATE|AD-AS and fiscal limits|Broad profiteering cleared|
|7|Returned money traced|NOTES → BANKS|M1/M2, banks, multiplier|Migration replaces contraction story|
|8|Real rate measured|BANKS → RATE|money market, bonds, Fisher|Unnecessary hike rejected|
|9|Two accounts closed|TRADE → RATE|BOP, forex, NX|Capital benefit and export cost paired|
|10|Twist 2|RATE → PRICES|Phillips curves, MV=PY|Temporary shock wins holdout|
|11|Policy lag exposed|COUNTER → PRICES → RATE|self-correction, stabilizers, growth|Temporary bridge approved|
|12|4.15 rehearsal|NOTES → BANKS → TRADE|conversion, reserves, dependency|Ratio certified with conditions|
|13|Crowding out twice|RATE → BANKS → TRADE|loanable funds, growth, forex|Bridge narrowed|
|14|Twist 3|TRADE → PRICES → RATE|supply shock, stress, trigger|First-week cover added|
|15|Final synthesis|RATE → BANKS → COUNTER|full-course transfer|Rate Book signed conditionally|

# 10. Stop manifest

**Stops 1-4 - CHOICE, DERIVE, DIAGNOSIS, ATTEST:** Mission 1 progression from evidence to decision.

**Stops 5-8 - PROTOCOL, DERIVE, DERIVE, BALANCE:** Mission 2 progression from evidence to decision.

**Stops 9-12 - DERIVE, DERIVE, STRESS, VALUE:** Mission 3 progression from evidence to decision.

**Stops 13-16 - DERIVE, CHOICE, DERIVE, DIAGNOSIS:** Mission 4 progression from evidence to decision.

**Stops 17-20 - DERIVE, DERIVE, DERIVE, VALUE:** Mission 5 progression from evidence to decision.

**Stops 21-24 - CHOICE, DIAGNOSIS, BALANCE, STRESS:** Mission 6 progression from evidence to decision.

**Stops 25-28 - DERIVE, TRACE, DERIVE, DIAGNOSIS:** Mission 7 progression from evidence to decision.

**Stops 29-32 - VERIFY, DERIVE, SEQUENCE, STRESS:** Mission 8 progression from evidence to decision.

**Stops 33-36 - BALANCE, DERIVE, CONTROL, CHOICE:** Mission 9 progression from evidence to decision.

**Stops 37-40 - CHOICE, DERIVE, HOLDOUT, STRESS:** Mission 10 progression from evidence to decision.

**Stops 41-44 - SEQUENCE, DERIVE, ALLOCATE, VALUE:** Mission 11 progression from evidence to decision.

**Stops 45-48 - DERIVE, VERIFY, TRACE, ATTEST:** Mission 12 progression from evidence to decision.

**Stops 49-52 - CONTROL, DERIVE, DERIVE, VALUE:** Mission 13 progression from evidence to decision.

**Stops 53-56 - DIAGNOSIS, VERIFY, STRESS, TRIGGER:** Mission 14 progression from evidence to decision.

**Stops 57-60 - DIAGNOSIS, DERIVE, TRACE, TRIGGER:** Mission 15 progression from evidence to decision.

No format exceeds one third of scheduled stops. **DERIVE appears exactly 20 times**; CHOICE 5; DIAGNOSIS 5; STRESS 5; BALANCE 4; VALUE 4; TRACE 3; VERIFY 3; ATTEST 2; SEQUENCE 2; CONTROL 2; TRIGGER 2; PROTOCOL 1; HOLDOUT 1; ALLOCATE 1. PROBE 0 and DEGENERACY 0.

# 11. Narrative implementation notes

## Environmental state changes

- M1: queue evidence board gains dated-coverage tags; 4.00 stickers remain visible.
- M2: excluded transfers and asset trades turn gray; REAL replaces the growth headline.
- M3: the basket table splits fixed and current-weight views; the port-energy clue persists.
- M4: discouraged-worker cards remain beside the published labor-force denominator.
- M5: spending-round tiles illuminate and the 8.7-billion target travels to RATE.
- M6: PROFITEERING clears; SRAS SHOCK and ROUNDING remain active.
- M7: note sacks visibly route to deposit ledgers; bank assets and liabilities illuminate.
- M8: the bond-price arrow and 4% equilibrium remain on the money panel; the hike control stays held.
- M9: both international accounts close at zero and exporter orders fall under appreciation.
- M10: the persistent-inflation model receives a holdout FAIL; the temporary model remains.
- M11: the six-week wage marker sits beyond launch; the temporary bridge gains a sunset date.
- M12: corrected 4.15 tables replace every shared 4.00 shortcut; the reserve clock shows PASS.
- M13: private investment and export orders display both crowding-out routes.
- M14: the fuel shock card appears after rehearsal success; the joint trigger is sealed before updates.
- M15: all five policy anchors illuminate, counters open, and the completed Rate Book remains inspectable.

## Dialogue state

Wrong answers never branch the evidence order. Optional greetings reflect completed reversals: Eli stops calling returned notes “missing money”; Lina names the companion index; Tomas distinguishes lending capacity from actual lending; Nia names both financing and export effects; Rhea asks for the sunset and trigger; Mara asks what would reverse the decision.

## Mission endings

Each ending provides 45–90 seconds of non-quiz inspection, movement, argument, sample/record transfer, or persistent world change. The timer is stopped. The completed decision, stop results, metric event, and next waypoint copy into the Rate Book mission log. Mission 15 has no post-decision educational gate.

# 12. Content and UI acceptance tests

## Macroeconomic checks

- Recalculate all numerical truths from visible values and units.
- GDP excludes transfers and asset trades; imports are subtracted once in NX.
- CPI is an index and inflation is its percent change.
- Full employment retains frictional and structural unemployment.
- Spending and tax multipliers use the correct signs and MPC/MPS relationships.
- A price-level change moves along AD; spending conditions shift AD.
- An adverse supply shock shifts SRAS left and SRPC right.
- M1/M2 and bank balance sheets distinguish cash migration from contraction.
- Money market uses nominal rates; loanable funds uses real rates.
- Bond prices and interest rates move inversely; Fisher uses expected inflation.
- Current plus financial account closes to zero in the simplified AP model.
- Appreciation lowers NX; crowding out can reduce both I and NX.
- Long-run neutrality never erases short-run transition costs.

## Action-clarity and format-payload audit

- **PROBE:** zero authored. Any future PROBE must give every station its own `reading`, `expected`, and useful `load`/comparison.
- **CHOICE:** five authored. Each has four distinct items, a verbatim correct label, and three option-specific rebuttals. Slash-separated bundles: zero.
- **VERIFY:** three authored - Stops 29, 46, and 54. Each requires numerical commitment before equipment unlock, then explicit operation, measurement, interpretation, units, and restoration status.
- **CONTROL:** two authored - Stops 35 and 49. Each names the changed control, fixed variables, baseline and response measurements, mandatory restoration/remeasurement, and submitted numerical conclusion.
- **DEGENERACY:** zero authored. Any future instance must name two controls and require a numerical parameter pair.
- **Numerical tasks:** 36 inspected. Inputs, constants, units, equations/relationships, response type, truth, and tolerance are folded into the authoritative stop locations.
- Run the current canonical format documentation and importer against every operated payload before handoff. Document-level review is not a runtime pass.

## Metric-economy checks

- Exactly four bounded player-facing bars exist.
- Every mission uses its authored timer target and automatic delta.
- RP uses `clamp(4,12,11 + time_modifier − incorrect_submissions)`.
- READINESS locks after M14; the remaining bars lock only at final settlement.
- The reproducible accurate path reaches 100/100/100/100 with at least one RP banked.
- Stop 60 cannot sign or open counters until metric settlement and all five anchors pass.

## Story, tone, and accessibility checks

- Opening card is five sentences; every mission briefing has four body sentences ending in the promised decision.
- Route escalation is 1/2/3 meaningful locations, and each move follows evidence.
- Every twist pays off at least two earlier clues.
- Concrete nouns precede jargon; units appear in visible data.
- Color is never the only alarm/pass carrier.
- Incorrect feedback names the failed mechanism and retry direction.
- Mission 15 introduces no major concept and has no quiz after the final decision.

# 13. Suggested YAML assembly order for Claude Code

1. Preserve existing Changeover theme, area, fixture, and roster asset IDs where possible.
2. Build the six-room world and seven major speaking roles; retain Soren as a recurring liaison.
3. Import the 15 missions and 60 globally ordered lesson objects.
4. Implement CHOICE and all base formats with answer/rebuttal parity.
5. Implement VERIFY and CONTROL in mission order with locked precommit stages.
6. Add `takesAsRead`, evidence flags, dialogue conditions, metric deltas, and environmental state.
7. Run `node tools/import-book.mjs books/changeover.yml changeover --verify` in the target repository.
8. Run repository trap, lesson, drive, and accessibility suites without weakening authored interactions.
9. Play once wrong-first and once right-first.
10. Confirm the Rate Book opens immediately after Stop 60 and no question UI remains.

## Recommended content object shape

Use the repository's exact schema; this is a semantic checklist, not a replacement schema:

```yaml
- group: RATE
  task: player-facing action
  title: short dramatic title
  at: exact-fixture-id
  reason: exact player-facing reason
  concept: narrow AP concept
  keystone: recurring concept
  learningRole: INTRODUCE | PRACTICE | RETRIEVE | COMBINE | TRANSFER
  takesAsRead: [earlier concepts]
  scene: exactly two short sentences, 30-45 words total
  storyScienceConnection: one sentence
  format: CANONICAL_FORMAT
  question: exact prompt with submission type and units
  # complete canonical format-specific payload
  answerText: exact graded result
  why: mechanism explanation
  wrongPathFeedback: actionable retry guidance
```

Do not author deprecated question-card `guide`, `background`, or `takeaway` fields.

# 14. Final handoff checklist

- [x] 15 missions and 60 globally numbered scheduled stops.
- [x] Exactly 20 DERIVE stops; no format exceeds one third.
- [x] One typed challenge per lesson.
- [x] 1/2/3 location escalation preserved.
- [x] Distinct character wants, blind spots, verbal habits, and arcs preserved.
- [x] All three twists have multiple earlier clues and later payoffs.
- [x] Every mission has a briefing, primer, beat script, outcome, metric screen, and quick review.
- [x] Compact one-line glossary and clean equation entries used.
- [x] Numerical visibility is local to every applicable stop.
- [x] CHOICE, VERIFY, and CONTROL repairs are local to their stops.
- [x] PROBE and DEGENERACY counts are explicitly zero; their validation gates remain binding.
- [x] Later missions retrieve and combine earlier macroeconomic tools.
- [x] Final decision checks 4.15, 3.25%, output, payment-failure, CPI, reserve, and all four bars.
- [ ] Run current importer and repository test suites when the game repository is available.
- [ ] Complete wrong-first and right-first live playthroughs.

**Canonical ending line:** “A number is safe only when its consequences agree.”


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `BANKS` roster owner: Mara Venn.
- `NOTES` roster owner: Mara Venn.
- `PRICES` roster owner: Mara Venn.
- `TRADE` roster owner: Mara Venn.

- Warm-up title: `CHECK ALL 8 PLACED AREAS`; eight area items are placed and the title now matches the run.

### Warm-up run cast replacement

All six warm-up run variants must use only the eight shipped characters: Mara Venn, Eli Voss, Idris Pell, Lina Saye, Tomas Arendt, Nia Corren, Rhea Dane, and Soren Vale. Remove every legacy-cast reference from each find/follow/catch line.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
