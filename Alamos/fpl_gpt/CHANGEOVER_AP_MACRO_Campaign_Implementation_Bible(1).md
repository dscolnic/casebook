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

Kesteven House holds Halvern's Currency Board, four floors above the crowds waiting to exchange old crowns for the new RATE. In fifteen days, shops, banks, wages, and foreign payments must all switch without cutting what families can buy. If the conversion or interest policy is wrong, prices may jump, jobs may vanish, or banks may run short of cash. Board Chair Mara Venn hands you the empty Rate Book and says, “A number is safe only when its consequences agree.” The plaza price board flashes its first warning.

**Delivery:** Show all five sentences together on one full-screen text card over the normal Kesteven House view. Continue reveals the four-bar HUD and Mission 1 briefing.

### Concrete stakes

Every wage, price, bank balance, and foreign payment must convert on the same day. A wrong ratio quietly cuts buying power; a mistimed reserve shipment can stop payments; an unnecessary rate hike can deepen unemployment; an unconditional stimulus can prolong inflation and crowd out investment. The player protects households by signing a rule whose numbers and reversal conditions agree across independent evidence.

### Three major reversals

1. **Twist 1 - The profiteers who were not:** the broad surge is largely a 4.00 shortcut plus an imported-energy supply shock, not economy-wide demand pressure.
2. **Twist 2 - Inflation that does not justify permanent tightening:** holdout prices normalize toward the 2% quantity-theory path while recession risk remains real.
3. **Twist 3 - Ready does not mean shock-proof:** the 4.15 rehearsal passes, then an overnight fuel disruption requires temporary first-week cover and precommitted triggers.

### Four campaign metrics and recovery economy

| Metric | Start | Meaning | Lock |
|---|---:|---|---|
| Conversion Readiness | 42% | Systems, contracts, notes, and Rate Book pages are ready | Locks after M14 |
| Price Continuity | 56% | Ordinary buying power survives conversion | Locks after M15 |
| Operating Reserve | 68% | Staff, cash, and intervention capacity remain | Finale only |
| Public Trust | 61% | Published rules and evidence are believed | Locks after M15 |

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

### Eli Voss - counter operations lead

**Wants:** Keep families moving. **Blind spot:** Treats every queue as a cash shortage. **Gameplay use:** Scarcity, labor definitions, conversion operations. **Arc:** Learns to separate visible congestion from national monetary evidence.

### Idris Pell - national accounts chief

**Wants:** Publish defensible output data. **Blind spot:** Trusts aggregates before composition. **Gameplay use:** GDP, output gaps, growth, and ledger closure. **Arc:** Moves from exact totals to transparent scope and dependency.

### Lina Saye - price statistics lead

**Wants:** Protect the basket's integrity. **Blind spot:** Defends fixed weights too long. **Gameplay use:** CPI, inflation, basket bias, and holdout evidence. **Arc:** Preserves history while publishing a representative companion measure.

### Tomas Arendt - bank supervision lead

**Wants:** Prevent a bank run. **Blind spot:** Focuses on maximum lending rather than willing lending. **Gameplay use:** Money aggregates, bank creation, reserves, bonds, and rates. **Arc:** Learns that capacity, timing, and behavior are separate constraints.

### Nia Corren - open-economy analyst

**Wants:** Keep payments and trade clearing. **Blind spot:** Initially treats appreciation as strength alone. **Gameplay use:** Balance of payments, forex, and net exports. **Arc:** Makes the financing benefit and export cost visible together.

### Rhea Dane - finance minister

**Wants:** Show control before launch. **Blind spot:** Underweights lags and crowding out. **Gameplay use:** Fiscal multipliers, stabilizers, policy allocation. **Arc:** Replaces an announcement-first plan with a smaller conditional bridge.

### Soren Vale - export council liaison

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

**Card body:** The plaza queue is growing, but a long line does not prove that Halvern lacks money. Scarcity means limited resources force choices, while a market price balances buyers and sellers. You will sort evidence, map tradeoffs, and test the queue's cause. By the end of the mission, decide which statistics belong in the first Rate Book page.

**Objective:** Separate useful economic measures from alarming but incomplete signals.

### Worth knowing first - exact player copy

#### Glossary terms

Scarcity: limited resources cannot satisfy every want, so every choice gives up an alternative.

Opportunity cost: the value of the best alternative given up.

Equilibrium: the price and quantity where planned buying equals planned selling.

#### Primer concepts

- A bowed PPC shows rising opportunity cost; a straight PPC shows constant cost.
- A point inside a PPC means resources are underused; better resources, technology, or productivity shift it outward.
- Price changes move along supply or demand; other causes shift a curve.

#### Equations first needed today
No new numerical equation is needed; use the PPC and supply-demand relationships shown on the boards.

## Main story happening - designer summary

Eli is rationing counter windows while Lina's first price marks appear outside. Stop 1 separates symptoms from measures; Stop 2 exposes the staff tradeoff; Stop 3 reconstructs a market shift; Stop 4 selects the dated evidence. The one-location route is COUNTER; the window makes the queue visible. Eli wants more cashiers and assumes the line proves a cash shortage. Scarcity governs the staffing tradeoff, the PPC separates capacity from inefficiency, and supply-demand reasoning distinguishes a price rise caused by demand from one caused by reduced supply.

**Beat script:** Arrival—nearby bubble, timer paused: Eli: “I can open exchange windows or answer bank calls, not both. Tell me what this line proves.” After S2, queue board shows the PPC point moving inside the curve. After S3, `×4.00` stickers remain visible outside. Final bubble: “The line is real. Its cause is not settled.” Unlock Rate Book page 1.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Exchange Counter | `queue-board` | automatic**

**World state:** Arrival | COUNTER | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Separate useful economic measures from alarming but incomplete signals.` Eli Voss points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Separate useful economic measures from alarming but incomplete signals.

**Dialogue bubbles -** Eli Voss: "Start with signal or statistic. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 1 at `queue-board` in Exchange Counter.

**Beat 2 - After Stop 1 | `allocation-slate` | automatic**

**World state:** The signal or statistic result remains visible while the counter tradeoff fixture lights.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Eli Voss: "Count the nationwide transactions, date them, and state coverage."

**Unlocks/waypoint:** Unlock Stop 2 at `allocation-slate` in COUNTER.

**Beat 3 - After Stop 2 | `queue-board` | automatic**

**World state:** The counter tradeoff result remains visible while the why did the street price rise? fixture lights.

**Panel/HUD text:** COUNTER

**Dialogue bubbles -** Eli Voss: "Forty extra exchanges cost forty bank calls: one call per exchange."

**Unlocks/waypoint:** Unlock Stop 3 at `queue-board` in COUNTER.

**Beat 4 - After Stop 3 | `wage-notice-rail` | automatic**

**World state:** The why did the street price rise? result remains visible while the page one standard fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Eli Voss: "Use the Stop 3 result to settle page one standard."

**Unlocks/waypoint:** Unlock Stop 4 at `wage-notice-rail` in COUNTER.

**Beat 5 - At mission end | `queue-board` | automatic**

**World state:** Mission outcome and hook | COUNTER | automatic World state and dialogue:   Feedback: A conclusion is not backed because it sounds urgent; State: Page 1 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "We can shorten the line, but I will stop calling it a national shortage."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Eli is rationing counter windows while Lina's first price marks appear outside. Stop 1 separates symptoms from measures; Stop 2 exposes the staff tradeoff; Stop 3 reconstructs a market shift; Stop 4 selects the dated evidence. The one-location route is COUNTER; the window makes the queue visible. Eli wants more cashiers and assumes the line proves a cash shortage. Scarcity governs the staffing tradeoff, the PPC separates capacity from inefficiency, and supply-demand reasoning distinguishes a price rise caused by demand from one caused by reduced supply.

**Beat script:** Arrival—nearby bubble, timer paused: Eli: “I can open exchange windows or answer bank calls, not both. Tell me what this line proves.” After S2, queue board shows the PPC point moving inside the curve. After S3, `×4.00` stickers remain visible outside. Final bubble: “The line is real. Its cause is not settled.” Unlock Rate Book page 1.

## Key concepts, explained here

**Objective:** Separate useful economic measures from alarming but incomplete signals. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 1 - Signal or statistic

**Format/placement:** CHOICE, asked by Eli Voss beside `queue-board`.

**Metadata:** Concept: evidence quality; Keystone: Evidence/index integrity; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L1; Story role: clue.

**Call - exact player copy:** Talk to Eli Voss, at the queue board in Exchange Counter.

**Stop reason - exact player copy:** Eli needs one defensible measure before moving staff.

**Question card story setup - exact player copy:** The queue has doubled since dawn, yet completed exchanges per cashier are unchanged. Choose the observation that can support a national claim before the board treats one crowded plaza as the whole economy.

**Question card story-science connection - exact player copy:** A visible crowd is a sample, while a dated nationwide count can support a policy decision.

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

**Metadata:** Concept: PPC/opportunity cost; Keystone: scarcity; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the allocation slate, in Exchange Counter.

**Stop reason - exact player copy:** The staff move must reveal what the counter gives up.

**Question card story setup - exact player copy:** With the evidence standard set, Eli can move four clerks from bank calls to exchange windows. Build the opportunity-cost statement before changing the roster, so the board records both added service and the lost alternative.

**Question card story-science connection - exact player copy:** A staffing choice is not free merely because no money changes hands.

**Question card prompt - exact player copy:** Baseline output is 120 exchanges and 80 bank calls per hour; after transfer it is 160 and 40. Build the derivation and submit the opportunity cost of 40 extra exchanges.

**Complete format-specific interaction block:** `derive:{lines:["Δexchanges=160−120=40","Δcalls=40−80=−40","OC=40 bank calls/40 exchanges=1 call per exchange"],licenses:["difference","foregone alternative","unit rate"],correct_order:[1,2,3]}`

**Correct result:** 40 calls total, or 1 call per extra exchange. `tolerance:0`. **answerText:** “Forty extra exchanges cost forty bank calls: one call per exchange.”

**Answer text:** The completed check shows 40 calls total, or 1 call per extra exchange. tolerance:0. **answerText:** “Forty extra exchanges cost forty bank calls: one call per exchange.”.

**Why:** A staffing choice is not free merely because no money changes hands.

**Wrong-path feedback:** Staff time, not cash, is scarce.

**State/output:** roster plan posted; unlock S3.

## Stop 3 - Why did the street price rise?

**Format/placement:** DIAGNOSIS, at `queue-board`.

**Metadata:** Concept: supply-demand shifts; Keystone: equilibrium; Area: Rate Room; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the queue board, in Exchange Counter.

**Stop reason - exact player copy:** The price stickers may identify what is driving the crowd.

**Question card story setup - exact player copy:** Because extra windows cost bank support, the board must know whether the line comes from buying pressure or reduced supply. Read the street panel and select the one shift that fits every active and quiet reading.

**Question card story-science connection - exact player copy:** The cause of a higher equilibrium price determines whether more demand or less supply should be investigated.

**Question card prompt - exact player copy:** Select one diagnosis.

**Complete format-specific interaction block:** `diagnosis:{headline:"Price up, quantity down",readings:[{zone:"price",value:"+6%"},{zone:"quantity",value:"−9%"},{zone:"income",value:"unchanged"},{zone:"delivery",value:"late"}],choices:[{id:"D_right",mechanism:"demand rises: P↑ Q↑"},{id:"S_left",mechanism:"supply falls: P↑ Q↓"},{id:"D_left",mechanism:"demand falls: P↓ Q↓"},{id:"ceiling",mechanism:"binding ceiling lowers legal P"}],answer:"S_left"}`

**Correct result:** Supply shifted left.

**Answer text:** The completed check shows supply shifted left.

**Why:** The cause of a higher equilibrium price determines whether more demand or less supply should be investigated.

**Wrong-path feedback:** A demand increase cannot explain falling quantity.

**State/output:** port delivery clue logged; unlock S4.

## Stop 4 - Page one standard

**Format/placement:** ATTEST, asked by Eli Voss beside `wage-notice-rail`.

**Metadata:** Concept: measurement/claims; Keystone: Evidence integrity; Area: Rate Room; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Eli Voss, at the wage-notice rail in Exchange Counter.

**Stop reason - exact player copy:** Only backed claims may enter the Rate Book.

**Question card story setup - exact player copy:** The supply diagnosis explains today's street pattern but still does not justify a national shortage claim. Verify the records that identify dated quantities, coverage, and tradeoffs, then reject any claim resting only on the plaza crowd.

**Question card story-science connection - exact player copy:** The first page must preserve what is known without turning an incomplete clue into policy.

**Question card prompt - exact player copy:** Spend three verification marks; submit the three backed claims and reject the unbacked conclusion. **answerText:** “Record dated national transactions, the staffing cost, and the price-quantity pattern; do not claim a cash shortage.”

**Complete format-specific interaction block:** `attest:{limit:3,claims:[{id:"national_tx",backed:true,critical:true},{id:"staff_tradeoff",backed:true},{id:"price_quantity",backed:true},{id:"cash_shortage",backed:false,critical:true}],correct_verified:["national_tx","staff_tradeoff","price_quantity"],reject:["cash_shortage"]}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** The first page must preserve what is known without turning an incomplete clue into policy.

**Wrong-path feedback:** A conclusion is not backed because it sounds urgent.

**State/output:** Page 1 signed.

## Mission outcome

Mission decision: Use the national count, not the loudest queue. Real output is 700 billion RATE. Prices rose 2.5%. The board now needs the production gap.

### Post-mission metric screen - exact player copy

**Header:** MISSION 1 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The evidence rule improves readiness, but the crowd hears that a shortage claim was rejected.

**Automatic bar change:** READINESS +3; TRUST −2

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 45/56/68/59; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 2 - Growth On Paper

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 14 DAYS TO CHANGEOVER

**Card title:** Growth on Paper

**Go now:** Go to PRICES and meet Idris Pell, national accounts chief, at the output ledger.

**Card body:** The first page rejected the queue as proof, but the new sales total still claims strong growth. Gross domestic product counts final goods and services made inside Halvern, while price changes can lift money totals without lifting output. You will classify spending and remove the price effect. By the end of the mission, decide which output aggregate the board should publish.

**Objective:** Build GDP correctly and separate nominal growth from real growth.

### Worth knowing first - exact player copy

#### Glossary terms

GDP: the market value of final goods and services produced inside a country during a stated period.

Consumption: household spending on goods and services.

Investment: business capital, inventory change, and new housing, not stock purchases.

Net exports: exports minus imports.

#### Primer concepts

Transfers are not government purchases; intermediate goods are excluded to avoid double counting; real GDP removes price changes.

#### Equations first needed today
**Equation:** `GDP = C + I + G + NX`

**What it is for:** Add final spending.

**Symbols:** C consumption; I investment; G government purchases; NX exports minus imports.

**Why this campaign needs it:** The board must identify which reported transactions are domestic final output.

**Equation:** `GDP deflator = nominal GDP / real GDP × 100`

**What it is for:** Separate prices from production.

**Symbols:** nominal GDP current-price output; real GDP base-price output.

**Why this campaign needs it:** A conversion can raise listed money values without creating goods.## Main story happening - designer summary

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

**Dialogue bubbles -** Idris Pell: "Only purchases of current final output enter GDP; transfers and asset trades do not."

**Unlocks/waypoint:** Unlock Stop 6 at `calculating-desk` in PRICES.

**Beat 3 - After Stop 6 | `price-history-board` | automatic**

**World state:** The close the output identity result remains visible while the remove the price effect fixture lights.

**Panel/HUD text:** PRICES

**Dialogue bubbles -** Idris Pell: "Nominal GDP is 740 billion crowns."

**Unlocks/waypoint:** Unlock Stop 7 at `price-history-board` in PRICES.

**Beat 4 - After Stop 7 | `output-ledger` | automatic**

**World state:** The remove the price effect result remains visible while the publish the output line fixture lights.

**Panel/HUD text:** STOP 7 RECORDED - STOP 8 OPEN

**Dialogue bubbles -** Idris Pell: "Real GDP is about 685.2 billion base-year crowns."

**Unlocks/waypoint:** Unlock Stop 8 at `output-ledger` in PRICES.

**Beat 5 - At mission end | `output-ledger` | automatic**

**World state:** Mission outcome and hook | PRICES | automatic World state and dialogue:   State: Page 2 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Idris Pell: "The report was not false. Its growth claim was."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Idris has a nominal ledger that includes transfers and securities. The one-location PRICES route uses S1 classification, S2 identity, S3 deflator, and S4 reconciliation. Arrival: Idris, national accounts chief: “The total is exact. The contents may not be.” After S2 the invalid rows turn gray with text labels. Final panel stamps REAL. GDP measures production; the expenditure identity sorts demand components; real GDP answers whether output changed.

## Key concepts, explained here

**Objective:** Build GDP correctly and separate nominal growth from real growth. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 5 - Classify the ledger

**Format/placement:** PROTOCOL, at `output-ledger`.

**Metadata:** Concept: GDP components; Keystone: GDP; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the output ledger, in Statistics Floor.

**Stop reason - exact player copy:** The headline total contains items that may not be production.

**Question card story setup - exact player copy:** Idris's ledger mixes household purchases, factory equipment, public wages, exports, imports, welfare checks, and stock trades. Match every row to C, I, G, NX, or excluded before any sum can enter the book.

**Question card story-science connection - exact player copy:** Correct labels prevent transfers and asset trades from masquerading as current production.

**Question card prompt - exact player copy:** Draw one line from each transaction to its category and submit the complete mapping. **answerText:** “Only purchases of current final output enter GDP; transfers and asset trades do not.”

**Complete format-specific interaction block:** `scenarios:[groceries,machine,teacher_salary,exports,imports,welfare,stock];choices:[C,I,G,NX_plus,NX_minus,excluded_transfer,excluded_asset];mapping:{groceries:C,machine:I,teacher_salary:G,exports:NX_plus,imports:NX_minus,welfare:excluded_transfer,stock:excluded_asset}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** Correct labels prevent transfers and asset trades from masquerading as current production.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Correct labels prevent transfers and asset trades from masquerading as current production.

**State/output:** valid rows unlock S2.

## Stop 6 - Close the output identity

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: expenditure GDP; Keystone: GDP; Area: Statistics Floor; Learning role: PRACTICE; Difficulty: L2; Story role: calculation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** The board needs one reproducible nominal GDP total.

**Question card story setup - exact player copy:** With excluded rows removed, the ledger shows C = 480, I = 120, G = 160, exports = 90, and imports = 110 billion crowns. Build the identity and close the total in the Rate Book.

**Question card story-science connection - exact player copy:** The component labels reveal which spending changed, not merely that “spending” changed.

**Question card prompt - exact player copy:** Build and submit nominal GDP in billion crowns using `GDP=C+I+G+(X−M)`.

**Complete format-specific interaction block:** `derive:{lines:["NX=90−110=−20","GDP=480+120+160−20","GDP=740 billion crowns"],licenses:["net exports","expenditure identity","arithmetic"],correct_order:[1,2,3]}`

**Correct result:** 740 billion crowns, ±0.5. **answerText:** “Nominal GDP is 740 billion crowns.”

**Answer text:** The completed check shows 740 billion crowns, ±0.5. **answerText:** “Nominal GDP is 740 billion crowns.”.

**Why:** The component labels reveal which spending changed, not merely that “spending” changed.

**Wrong-path feedback:** Imports are subtracted within NX, not from C again.

**State/output:** total posts; S3.

## Stop 7 - Remove the price effect

**Format/placement:** DERIVE, at `price-history-board`.

**Metadata:** Concept: nominal/real GDP; Keystone: GDP/inflation; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** The money total cannot tell whether factories made more.

**Question card story setup - exact player copy:** Because nominal GDP is 740 billion crowns, the headline looks strong; the deflator is 108.0. Rearrange the recorded deflator relationship and calculate real GDP before the board calls the rise economic growth.

**Question card story-science connection - exact player copy:** Real GDP, not nominal GDP, measures the change in produced output.

**Question card prompt - exact player copy:** Using `deflator=nominal/real×100`, derive and submit real GDP in billion base-year crowns.

**Complete format-specific interaction block:** `derive:{lines:["108=740/real×100","real=740×100/108","real=685.19"],licenses:["substitution","algebra","evaluation"],correct_order:[1,2,3]}`

**Correct result:** 685.2, ±0.2. **answerText:** “Real GDP is about 685.2 billion base-year crowns.”

**Answer text:** The completed check shows 685.2, ±0.2. **answerText:** “Real GDP is about 685.2 billion base-year crowns.”.

**Why:** Real GDP, not nominal GDP, measures the change in produced output.

**Wrong-path feedback:** Dividing by 108 without multiplying by 100 misreads the index.

**State/output:** GROWTH label changes to PRICE EFFECT; S4.

## Stop 8 - Publish the output line

**Format/placement:** BALANCE, at `output-ledger`.

**Metadata:** Concept: GDP scope; Keystone: GDP; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the output ledger, in Statistics Floor.

**Stop reason - exact player copy:** The Rate Book must carry one total and its limits.

**Question card story setup - exact player copy:** Real output is far below the nominal headline, and the component audit excludes two tempting rows. Close the output ledger by counting only valid flows and naming the price adjustment that makes the total comparable.

**Question card story-science connection - exact player copy:** A defensible aggregate states both what it counts and how prices were handled.

**Question card prompt - exact player copy:** Toggle counted streams, close nominal GDP at 740, enter deflator 108, and submit “publish real GDP 685.2 with nominal context.” **answerText:** “Publish real GDP of 685.2 billion and retain nominal GDP of 740 billion as context.”

**Complete format-specific interaction block:** `balance:{streams:[{id:C,value:480,count:true},{id:I,value:120,count:true},{id:G,value:160,count:true},{id:X,value:90,count:true},{id:M,value:-110,count:true},{id:transfers,value:35,count:false},{id:stocks,value:22,count:false}],closure:740,adjustment:{deflator:108,real:685.19},correct_conclusion:"publish_real_with_nominal_context"}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** A defensible aggregate states both what it counts and how prices were handled.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A defensible aggregate states both what it counts and how prices were handled.

**State/output:** Page 2 signed.

## Mission outcome

Mission decision: Publish real GDP of 685.2 billion base-year crowns with the nominal total shown only as context. Prices caused much of the apparent growth. The board corrects the headline. The next question is whether the street price jump is broad or built into the basket.

### Post-mission metric screen - exact player copy

**Header:** MISSION 2 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 13:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The corrected real-output line replaces the false growth headline.

**Automatic bar change:** PRICES +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 54/60/68/61; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 3 - The Basket

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 13 DAYS TO CHANGEOVER

**Card title:** The Basket

**Go now:** Go to PRICES and meet Lina Saye, price statistics lead, at the basket table.

**Card body:** Real GDP showed that prices, not output, drove the headline, but the price measure may overstate what families face. A consumer price index prices the same basket over time, so old weights and forced substitutions can distort it. You will rebuild the basket and calculate inflation. By the end of the mission, decide whether to keep or revise the official index.

**Objective:** Test whether the fixed basket represents current household costs.

### Worth knowing first - exact player copy

#### Glossary terms

CPI: the current cost of a fixed consumer basket relative to its base-year cost, times 100.

Inflation rate: the percent change in a price index.

Substitution bias: CPI overstatement when consumers switch away from goods whose prices rise.

#### Primer concepts

Quality changes can also bias CPI; one relative-price change is not automatically broad inflation; fixed weights aid comparison but can become unrepresentative.

#### Equations first needed today
**Equation:** `CPI = current basket cost / base basket cost × 100`

**What it is for:** Measure a fixed basket's price level.

**Symbols:** current and base costs use the same quantities.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.

**Equation:** `inflation = (CPI_new−CPI_old)/CPI_old ×100%`

**What it is for:** Find the index growth rate.

**Symbols:** CPI_new and CPI_old are consecutive indexes.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.## Main story happening - designer summary

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

**Dialogue bubbles -** Lina Saye: "The fixed basket CPI is 108."

**Unlocks/waypoint:** Unlock Stop 10 at `price-history-board` in PRICES.

**Beat 3 - After Stop 10 | `basket-table` | automatic**

**World state:** The calculate the printed inflation result remains visible while the does the basket represent families? fixture lights.

**Panel/HUD text:** 108−100

**Dialogue bubbles -** Lina Saye: "The official basket reports 5.88% inflation."

**Unlocks/waypoint:** Unlock Stop 11 at `basket-table` in PRICES.

**Beat 4 - After Stop 11 | `basket-table` | automatic**

**World state:** The does the basket represent families? result remains visible while the keep history and repair representation fixture lights.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Lina Saye: "Inflation is positive, but 5.88% depends strongly on the stale energy weight."

**Unlocks/waypoint:** Unlock Stop 12 at `basket-table` in PRICES.

**Beat 5 - At mission end | `basket-table` | automatic**

**World state:** Mission outcome and hook | PRICES | automatic World state and dialogue:   State: Page 3 signed; port-energy clue logged; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Lina Saye: "The arithmetic stays. The claim gets narrower."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

One-location PRICES. Lina defends the old basket. S1 prices it, S2 derives inflation, S3 stress-tests weights, S4 chooses a published pair. Arrival: “If we change the basket whenever it hurts, it is no index. If we never change it, it may be nobody's basket.” The `×4.00` stickers become mapped to imported-energy-heavy vendors. CPI uses a fixed basket; substitution and quality change explain bias; index revision must be transparent rather than convenient.

## Key concepts, explained here

**Objective:** Test whether the fixed basket represents current household costs. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 9 - Price the fixed basket

**Format/placement:** DERIVE, at `basket-table`.

**Metadata:** Concept: CPI; Keystone: inflation; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the basket table, in Statistics Floor.

**Stop reason - exact player copy:** Lina needs the official price level reproduced before its weights are challenged.

**Question card story setup - exact player copy:** The base basket cost 200 crowns; the identical quantities now cost 216 crowns after shops apply conversion labels. Build the CPI calculation first, so any later criticism begins from the official method rather than suspicion.

**Question card story-science connection - exact player copy:** Reproducing the index separates a calculation error from a design problem.

**Question card prompt - exact player copy:** Use `CPI=current/base×100`; build the derivation and submit the index, no unit.

**Complete format-specific interaction block:** `derive:{lines:["CPI=216/200×100","CPI=1.08×100","CPI=108"],licenses:["definition","division","scale"],correct_order:[1,2,3]}`

**Correct result:** 108 ±0.1. **answerText:** “The fixed basket CPI is 108.”

**Answer text:** The completed check shows 108 ±0.1. **answerText:** “The fixed basket CPI is 108.”.

**Why:** Reproducing the index separates a calculation error from a design problem.

**Wrong-path feedback:** CPI is an index, not 8%.

**State/output:** S2.

## Stop 10 - Calculate the printed inflation

**Format/placement:** DERIVE, at `price-history-board`.

**Metadata:** Concept: inflation rate; Keystone: inflation; Area: Statistics Floor; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** The warning needs a rate, not just an index level.

**Question card story setup - exact player copy:** With the new CPI fixed at 108 and last year's CPI at 102, calculate the percentage change the public bulletin will show. The board must know the exact headline before testing whether it represents households.

**Question card story-science connection - exact player copy:** Inflation is the percentage change in the index, not the index's distance from 100.

**Question card prompt - exact player copy:** Use `(108−102)/102×100%`; derive and submit the inflation rate in percent.

**Complete format-specific interaction block:** `derive:{lines:["ΔCPI=6","6/102=0.0588235","inflation=5.88%"],licenses:["difference","relative change","percent"],correct_order:[1,2,3]}`

**Correct result:** 5.88%, ±0.05. **answerText:** “The official basket reports 5.88% inflation.”

**Answer text:** The completed check shows 5.88%, ±0.05. **answerText:** “The official basket reports 5.88% inflation.”.

**Why:** Inflation is the percentage change in the index, not the index's distance from 100.

**Wrong-path feedback:** `108−100` is not the year-to-year rate.

**State/output:** headline posts; S3.

## Stop 11 - Does the basket represent families?

**Format/placement:** STRESS, asked by Lina Saye beside `basket-table`.

**Metadata:** Concept: CPI bias/weights; Keystone: Evidence integrity; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Talk to Lina Saye, at the basket table in Statistics Floor.

**Stop reason - exact player copy:** A valid calculation may still answer the wrong household question.

**Question card story setup - exact player copy:** Because the official rate is 5.88%, Lina tests the old 30% imported-energy weight against current household shares of 15% to 25%. Move the weight through that range and watch which inflation conclusions survive.

**Question card story-science connection - exact player copy:** Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.

**Question card prompt - exact player copy:** Move the weight from 15% through 30%, inspect every displayed inflation rate, and submit the conclusion that survives the full range. **answerText:** “Inflation is positive, but 5.88% depends strongly on the stale energy weight.”

**Complete format-specific interaction block:** `stress:{assumption:"imported-energy weight",min:0.15,max:0.30,step:0.05,candidates:[{id:"broad_5_88",survives:[0.30]},{id:"range",survives:[0.15,0.20,0.25,0.30]},{id:"zero",survives:[]}],readings:{0.15:3.1,0.20:3.7,0.25:4.4,0.30:5.88},correct:"range"}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.

**State/output:** revised basket unlocks.

## Stop 12 - Keep history and repair representation

**Format/placement:** VALUE, asked by Lina Saye beside `basket-table`.

**Metadata:** Concept: index publication; Keystone: Evidence/inflation; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Lina Saye, at the basket table in Statistics Floor.

**Stop reason - exact player copy:** The board can fund only one publication repair before tomorrow's bulletin.

**Question card story setup - exact player copy:** The official method is reproducible, yet its energy weight overstates many households' current exposure. Choose the evidence package that preserves the historical series while revealing how a representative current basket changes the result.

**Question card story-science connection - exact player copy:** Publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.

**Question card prompt - exact player copy:** Spend exactly 60 evidence points and submit the publication plan. **answerText:** “Keep the fixed CPI and publish a current-weight companion with the weight audit.”

**Complete format-specific interaction block:** `value:{budget:60,options:[{id:"parallel",cost:45,required:true,axis:"fixed CPI plus current-weight companion"},{id:"audit",cost:15,required:true,axis:"weight audit"},{id:"ads",cost:30,axis:"publicity"},{id:"erase",cost:25,axis:"replace history"}],correct:["parallel","audit"]}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** Publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Publishing both measures prevents a convenient revision from erasing history or a stale basket from hiding bias.

**State/output:** Page 3 signed; port-energy clue logged.

## Mission outcome

Mission decision: The gap is 34.8 billion RATE. Job data show weak demand. The fuel shock raised prices. Next, test how spending moves through the economy.

### Post-mission metric screen - exact player copy

**Header:** MISSION 3 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 14:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The parallel index improves representation, while the audit consumes staff capacity.

**Automatic bar change:** READINESS +4; RESERVE −2

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 62/67/66/61; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 4 - Jobs Behind The Number

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 12 DAYS TO CHANGEOVER

**Card title:** Jobs Behind the Number

**Go now:** Go to COUNTER and meet Eli Voss, counter operations lead, at the labor board.

**Card body:** The basket audit narrowed the inflation claim, but hiring is weakening while prices still rise. The unemployment rate counts active job seekers in the labor force and leaves discouraged workers outside it. You will rebuild the rate, classify unemployment, and place output against capacity. By the end of the mission, decide whether Halvern faces a normal labor transition or a recessionary warning.

**Objective:** Diagnose labor-market weakness without losing excluded workers.

### Worth knowing first - exact player copy

#### Glossary terms

Labor force: employed people plus unemployed people actively seeking work.

Discouraged worker: a person who wants work but stopped searching and is outside the labor force.

Natural unemployment: frictional plus structural unemployment.

Recessionary gap: real output below full-employment output.

#### Primer concepts

Full employment means zero cyclical unemployment, not zero unemployment; frictional is search, structural is mismatch, cyclical is weak demand.

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

**Dialogue bubbles -** Eli Voss: "The labor force is 10.0 million and unemployment is 8.0%; 0.5 million discouraged workers remain outside."

**Unlocks/waypoint:** Unlock Stop 14 at `queue-board` in COUNTER.

**Beat 3 - After Stop 14 | `allocation-slate` | automatic**

**World state:** The name the causes result remains visible while the place the output gap fixture lights.

**Panel/HUD text:** COUNTER

**Dialogue bubbles -** Eli Voss: "Frictional and structural form the natural rate; recession layoffs are cyclical."

**Unlocks/waypoint:** Unlock Stop 15 at `allocation-slate` in COUNTER.

**Beat 4 - After Stop 15 | `wage-notice-rail` | automatic**

**World state:** The place the output gap result remains visible while the transition or warning fixture lights.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Eli Voss: "Halvern has a 34.8-billion recessionary gap."

**Unlocks/waypoint:** Unlock Stop 16 at `wage-notice-rail` in COUNTER.

**Beat 5 - At mission end | `wage-notice-rail` | automatic**

**World state:** Mission outcome and hook | COUNTER | automatic   State: Page 4 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "The line is not only a changeover line. Some people have stopped looking for work."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

COUNTER only. S1 rebuilds labor force, S2 classifies causes, S3 computes gap, S4 diagnoses warning. Eli sees the line as transition labor; quiet “stopped searching” cards challenge that. Arrival bubble asks who disappears from a rate. A falling participation placard persists. Labor definitions prevent denominator errors; types separate normal churn from demand weakness; Y<Yf implies recessionary gap.

## Key concepts, explained here

**Objective:** Diagnose labor-market weakness without losing excluded workers. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 13 - Rebuild the denominator

**Format/placement:** DERIVE, at `wage-notice-rail`.

**Metadata:** Concept: unemployment rate; Keystone: labor/output gap; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the wage-notice rail, in Exchange Counter.

**Stop reason - exact player copy:** The published rate may look better because people stopped searching.

**Question card story setup - exact player copy:** Halvern has 9.2 million employed people, 0.8 million active job seekers, and 0.5 million discouraged workers. Build the labor force and unemployment rate before comparing this month with the prior report.

**Question card story-science connection - exact player copy:** Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

**Question card prompt - exact player copy:** Derive labor force and submit unemployment rate using active seekers only.

**Complete format-specific interaction block:** `derive:{lines:["LF=9.2+0.8=10.0 million","u=0.8/10.0×100%","u=8.0%"],licenses:["labor-force definition","rate definition","evaluation"],correct_order:[1,2,3]}`

**Correct result:** LF 10.0m and 8.0%, ±0.1. **answerText:** “The labor force is 10.0 million and unemployment is 8.0%; 0.5 million discouraged workers remain outside.”

**Answer text:** The completed check shows lF 10.0m and 8.0%, ±0.1. **answerText:** “The labor force is 10.0 million and unemployment is 8.0%; 0.5 million discouraged workers remain outside.”.

**Why:** Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

**State/output:** S2.

## Stop 14 - Name the causes

**Format/placement:** CHOICE, asked by Eli Voss beside `queue-board`.

**Metadata:** Concept: unemployment types; Keystone: labor gap; Area: Statistics Floor; Learning role: PRACTICE; Difficulty: L2; Story role: character.

**Call - exact player copy:** Talk to Eli Voss, at the queue board in Exchange Counter.

**Stop reason - exact player copy:** Different unemployment causes imply different remedies.

**Question card story setup - exact player copy:** With unemployment at 8.0%, records show short job searches, obsolete dock skills, and layoffs from falling orders. Select the statement that correctly separates natural unemployment from the part caused by weak demand.

**Question card story-science connection - exact player copy:** Only cyclical unemployment signals output below its demand-supported potential.

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

**Complete format-specific interaction block:** `choices:[{id:A,label:"All three types are natural"},{id:B,label:"Frictional and structural are natural; demand layoffs are cyclical"},{id:C,label:"Structural unemployment is cyclical"},{id:D,label:"Full employment means zero unemployment"}]; answer:B; rebuttals:{A:"Layoffs caused by weak aggregate demand are cyclical, not natural.",C:"A skill mismatch is structural unemployment, which belongs to the natural rate.",D:"Frictional and structural unemployment remain even at full employment."}` **answerText:** “Frictional and structural form the natural rate; recession layoffs are cyclical.”

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** Only cyclical unemployment signals output below its demand-supported potential.

**Wrong-path feedback:** (1) **All three are natural:** Cyclical unemployment rises when aggregate demand leaves output below potential. (3) **Structural is cyclical:** A skills or location mismatch is structural even if it lasts through a downturn. (4) **Full employment means zero:** Full employment still includes frictional and structural unemployment.

**State/output:** S3.

## Stop 15 - Place the output gap

**Format/placement:** DERIVE, at `allocation-slate`.

**Metadata:** Concept: output gap; Keystone: labor/GDP; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the allocation slate, in Exchange Counter.

**Stop reason - exact player copy:** The labor diagnosis must agree with the real-output ledger.

**Question card story setup - exact player copy:** Because layoffs are cyclical, compare actual real GDP of 685.2 billion with full-employment output of 720.0 billion base-year crowns. Calculate the signed gap and label its type before policy staff move upstairs.

**Question card story-science connection - exact player copy:** A negative actual-minus-potential gap connects weak demand to excess unemployment.

**Question card prompt - exact player copy:** Use `gap=actual−potential`; derive and submit billion crowns and label.

**Complete format-specific interaction block:** `derive:{lines:["gap=685.2−720.0","gap=−34.8 billion","negative ⇒ recessionary"],licenses:["definition","arithmetic","Y<Yf rule"],correct_order:[1,2,3]}`

**Correct result:** −34.8 billion, recessionary, ±0.1. **answerText:** “Halvern has a 34.8-billion recessionary gap.”

**Answer text:** The completed check shows −34.8 billion, recessionary, ±0.1. **answerText:** “Halvern has a 34.8-billion recessionary gap.”.

**Why:** A negative actual-minus-potential gap connects weak demand to excess unemployment.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A negative actual-minus-potential gap connects weak demand to excess unemployment.

**State/output:** S4.

## Stop 16 - Transition or warning

**Format/placement:** DIAGNOSIS, at `wage-notice-rail`.

**Metadata:** Concept: business cycle diagnosis; Keystone: labor/GDP/inflation; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the wage-notice rail, in Exchange Counter.

**Stop reason - exact player copy:** The board must decide whether to prepare stabilization policy.

**Question card story setup - exact player copy:** The negative output gap now agrees with cyclical layoffs and rising discouraged-worker counts, while the fixed basket still shows inflation. Select the diagnosis that fits every reading without pretending the price problem has vanished.

**Question card story-science connection - exact player copy:** Weak output with rising prices can reflect a supply shock rather than healthy demand.

**Question card prompt - exact player copy:** Select one diagnosis and submit a conclusion. **answerText:** “Treat the labor data as a recessionary warning with an adverse supply shock.”

**Complete format-specific interaction block:** `diagnosis:{headline:"Prices up, output below capacity",readings:["gap −34.8","cyclical layoffs","discouraged +0.5m","energy import +18%"],choices:[{id:"normal",mechanism:"natural churn only"},{id:"demand_boom",mechanism:"Y>Yf"},{id:"mixed",mechanism:"recessionary gap plus adverse supply pressure"},{id:"deflation",mechanism:"PL falling"}],answer:"mixed"}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** Weak output with rising prices can reflect a supply shock rather than healthy demand.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Weak output with rising prices can reflect a supply shock rather than healthy demand.

**State/output:** Page 4 signed.

## Mission outcome

Mission decision: Treat the job data as a recession warning. The output gap is 34.8 billion. Job loss backs the need to act. The energy shock explains much of the price rise. Now test the new spending plan.

### Post-mission metric screen - exact player copy

**Header:** MISSION 4 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 13:30

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The recession warning reaches the plaza before a response is ready.

**Automatic bar change:** PRICES −5; TRUST −3

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 71/62/68/58; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 5 - The First Round

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 11 DAYS TO CHANGEOVER

**Card title:** The First Round

**Go now:** Go to PRICES and meet Rhea Dane, finance minister, at the spending board.

**Card body:** The labor audit found a 34.8-billion recessionary gap, and the finance ministry offers a smaller spending package. Each new dollar becomes income, then further consumption or saving, so the total demand change can exceed the first round. You will derive the multipliers and test the package. By the end of the mission, decide which fiscal change can close the gap.

**Objective:** Calculate the spending and tax changes that target the measured gap.

### Worth knowing first - exact player copy

#### Glossary terms

MPC: the fraction of an extra dollar of income consumed.

MPS: the fraction saved; MPC plus MPS equals one.

Multiplier: total demand change divided by the initial policy change.

#### Primer concepts

Government purchases enter AD directly; a tax change first alters disposable income; the balanced-budget multiplier is one.

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

**Dialogue bubbles -** Rhea Dane: "MPS is 0.25, so one quarter leaks from each round."

**Unlocks/waypoint:** Unlock Stop 18 at `calculating-desk` in PRICES.

**Beat 3 - After Stop 18 | `calculating-desk` | automatic**

**World state:** The build both multipliers result remains visible while the size the alternatives fixture lights.

**Panel/HUD text:** PRICES → RATE

**Dialogue bubbles -** Rhea Dane: "The spending multiplier is 4; the tax multiplier is −3."

**Unlocks/waypoint:** Unlock Stop 19 at `calculating-desk` in PRICES.

**Beat 4 - After Stop 19 | `policy-wall` | automatic**

**World state:** The size the alternatives result remains visible while the choose the first-round plan fixture lights.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Rhea Dane: "Close the gap with 8.7 billion in purchases or an 11.6-billion tax cut."

**Unlocks/waypoint:** Unlock Stop 20 at `policy-wall` in Rate Room.

**Beat 5 - At mission end | `calculating-desk` | automatic**

**World state:** Mission outcome and hook | RATE | automatic World state and dialogue:   State: Page 5 signed; Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "You gave me a larger number and a slower announcement. Now prove the second test matters."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

PRICES→RATE. Rhea wants an announcement now. S1 derives MPS, S2 both multipliers, and S3 calculates alternatives; that exact target unlocks RATE, where S4 selects the package because only the policy room can authorize it. The first-round tiles light successive spending rounds. Rhea's pressure is legitimate but ignores supply. Multipliers translate a first-round fiscal change into total AD; taxes have a smaller absolute multiplier because households save part of the tax change. Waypoint: “Take the 8.7-billion target to the Rate Room for authorization.”

## Key concepts, explained here

**Objective:** Calculate the spending and tax changes that target the measured gap. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 17 - Split the next crown

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: MPC/MPS; Keystone: AD/multipliers; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** No package can be sized until the spending leak is known.

**Question card story setup - exact player copy:** Households spend 0.75 crown from each additional crown of disposable income and save the rest. Build the identity that fixes MPS, then show why each later spending round is three quarters of the prior round.

**Question card story-science connection - exact player copy:** Saving is the leakage that limits the total demand response.

**Question card prompt - exact player copy:** From MPC 0.75, derive and submit MPS.

**Complete format-specific interaction block:** `derive:{lines:["MPC+MPS=1","MPS=1−0.75","MPS=0.25"],licenses:["income split","algebra","evaluation"],correct_order:[1,2,3]}`

**Correct result:** 0.25. **answerText:** “MPS is 0.25, so one quarter leaks from each round.”

**Answer text:** The completed check shows 0.25. **answerText:** “MPS is 0.25, so one quarter leaks from each round.”.

**Why:** Saving is the leakage that limits the total demand response.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Saving is the leakage that limits the total demand response.

**State/output:** rounds animate; S2.

## Stop 18 - Build both multipliers

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: spending/tax multipliers; Keystone: AD; Area: Rate Room; Learning role: PRACTICE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** Spending and tax plans must not share the wrong multiplier.

**Question card story setup - exact player copy:** With MPS fixed at 0.25 and MPC at 0.75, derive the spending and tax multipliers side by side. The signs must show why higher taxes contract demand while purchases add directly.

**Question card story-science connection - exact player copy:** Choosing the wrong multiplier would miss the output target before conversion day.

**Question card prompt - exact player copy:** Build both formulas and submit the ordered pair `(spending multiplier, tax multiplier)`.

**Complete format-specific interaction block:** `derive:{lines:["kG=1/0.25=4","kT=−0.75/0.25=−3","pair=(4,−3)"],licenses:["spending formula","tax formula","ordered pair"],correct_order:[1,2,3]}`

**Correct result:** (4,−3). **answerText:** “The spending multiplier is 4; the tax multiplier is −3.”

**Answer text:** The completed check shows (4,−3). **answerText:** “The spending multiplier is 4; the tax multiplier is −3.”.

**Why:** Choosing the wrong multiplier would miss the output target before conversion day.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Choosing the wrong multiplier would miss the output target before conversion day.

**State/output:** S3.

## Stop 19 - Size the alternatives

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: gap closing; Keystone: AD/fiscal; Area: Rate Room; Learning role: COMBINE; Difficulty: L3; Story role: consequence.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** Rhea's 6-billion proposal must be compared with the measured gap.

**Question card story setup - exact player copy:** Because the recessionary gap is 34.8 billion and the spending multiplier is 4, calculate the government-purchase increase that closes it. Also calculate the tax cut using multiplier −3, reporting a positive cut size.

**Question card story-science connection - exact player copy:** The gap determines the package; the package should not determine the claimed gap.

**Question card prompt - exact player copy:** Submit `(ΔG increase, tax-cut size)` in billion crowns.

**Complete format-specific interaction block:** `derive:{lines:["ΔG=34.8/4=8.7","ΔT=(+34.8)/(−3)=−11.6","tax cut size=11.6"],licenses:["gap equation","tax sign","magnitude"],correct_order:[1,2,3]}`

**Correct result:** (8.7,11.6) billion, ±0.1. **answerText:** “Close the gap with 8.7 billion in purchases or an 11.6-billion tax cut.”

**Answer text:** The completed check shows (8.7,11.6) billion, ±0.1. **answerText:** “Close the gap with 8.7 billion in purchases or an 11.6-billion tax cut.”.

**Why:** The gap determines the package; the package should not determine the claimed gap.

**Wrong-path feedback:** A different response does not fit the displayed evidence. The gap determines the package; the package should not determine the claimed gap.

**State/output:** 6b plan shows −10.8 residual gap; S4.

## Stop 20 - Choose the first-round plan

**Format/placement:** VALUE, asked by Rhea Dane beside `policy-wall`.

**Metadata:** Concept: fiscal choice; Keystone: AD/multipliers; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Rhea Dane, at the policy wall in Rate Room.

**Stop reason - exact player copy:** The ministry can prepare only one defensible package today.

**Question card story setup - exact player copy:** The 6-billion announcement would add only 24 billion to demand and leave a 10.8-billion gap. Fund the option that reaches the measured target and preserves an independent supply-shock review before launch.

**Question card story-science connection - exact player copy:** Demand stimulus can close a recessionary gap without proving that it can cure cost-push inflation.

**Question card prompt - exact player copy:** Spend exactly 100 plan points and submit the funded pair. **answerText:** “Prepare 8.7 billion in purchases and preserve the supply-shock review.”

**Complete format-specific interaction block:** `value:{budget:100,options:[{id:"G8_7",cost:65,required:true,axis:"targeted purchases"},{id:"supply_review",cost:35,required:true,axis:"independent shock test"},{id:"G6",cost:45,axis:"fast announcement"},{id:"tax11_6",cost:80,axis:"tax alternative"},{id:"publicity",cost:25,axis:"message"}],correct:["G8_7","supply_review"]}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** The completed check shows the keyed result shown by the completed interaction.

**Why:** Demand stimulus can close a recessionary gap without proving that it can cure cost-push inflation.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Demand stimulus can close a recessionary gap without proving that it can cure cost-push inflation.

**State/output:** Page 5 signed.

## Mission outcome

Mission decision: Prepare an 8.7-billion purchase increase. And keep the supply-shock review. With a multiplier of 4, that package closes the 34.8-billion demand gap. It does not by itself fix rising input costs. The board must now place both forces on one model.

### Post-mission metric screen - exact player copy

**Header:** MISSION 5 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 15:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The correctly sized package gives the board an executable option.

**Automatic bar change:** READINESS +5

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 76/70/68/61; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 6 - Two Shifts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 10 DAYS

**Card title:** Two Shifts

**Go now:** Go to PRICES and meet Lina Saye, price statistics lead, at the AD-AS wall.

**Card body:** The fiscal package can close the demand gap, but it cannot explain why prices rose while output fell. Aggregate demand is total planned spending, while short-run aggregate supply rises with output because many wages adjust slowly. You will locate equilibrium, shift both curves, and test policy. By the end of the mission, decide which problem fiscal policy should target.

**Objective:** Separate weak demand from cost-push inflation.

### Worth knowing first - exact player copy

#### Glossary terms

AD: `C+I+G+NX` at each price level.

SRAS: short-run production supplied at each price level.

LRAS: full-employment output, vertical at Yf.

Stagflation: higher prices with lower output.

#### Primer concepts

AD slopes down through wealth, interest-rate, and exchange-rate effects; input costs, productivity, taxes, and shocks shift SRAS; demand-pull moves AD right; cost-push moves SRAS left.

#### Equations first needed today
Retrieve `GDP=C+I+G+NX` and the multipliers; the new work is graphical.

## Main story happening - designer summary

Route PRICES→RATE: S1–S2 at AD-AS wall; the confirmed supply shock unlocks RATE for S3–S4 because only that room can authorize policy. Arrival Lina: “One price can rise for two very different reasons.” Travel waypoint: “Take the two-shift model to the Rate Room.” Rhea concedes that fiscal action should target output, not promise lower energy prices.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at PRICES | `ad-as-wall` | automatic**

**World state:** Arrival | PRICES | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Separate weak demand from cost-push inflation.` Lina Saye points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Separate weak demand from cost-push inflation.

**Dialogue bubbles -** Lina Saye: "Start with why ad slopes down. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 21 at `ad-as-wall` in PRICES.

**Beat 2 - After Stop 21 | `ad-as-wall` | automatic**

**World state:** Keep this labeled result visible; Lina Saye says, , and Stop 22 unlocks.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Lina Saye: "Lower prices raise real wealth, reduce money demand and interest, and can depreciate the currency, increasing C, I, and NX."

**Unlocks/waypoint:** Unlock Stop 22 at `ad-as-wall` in Statistics Floor.

**Beat 3 - After Stop 22 | `gap-calculator` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `PRICES → RATE` only if the route requires travel, then.

**Panel/HUD text:** PRICES → RATE

**Dialogue bubbles -** Lina Saye: "The imported-energy shock shifts SRAS left."

**Unlocks/waypoint:** Unlock Stop 23 at `gap-calculator` in Rate Room.

**Beat 4 - After Stop 23 | `ad-as-wall` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 24 unlocks.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Lina Saye: "Halvern has a recessionary gap plus an adverse supply shock."

**Unlocks/waypoint:** Unlock Stop 24 at `ad-as-wall` in PRICES.

**Beat 5 - At mission end | `ad-as-wall` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Lina Saye: "Use fiscal policy to close the demand gap, not to promise lower supply-driven prices."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Route PRICES→RATE: S1–S2 at AD-AS wall; the confirmed supply shock unlocks RATE for S3–S4 because only that room can authorize policy. Arrival Lina: “One price can rise for two very different reasons.” Travel waypoint: “Take the two-shift model to the Rate Room.” Rhea concedes that fiscal action should target output, not promise lower energy prices.

## Key concepts, explained here

**Objective:** Separate weak demand from cost-push inflation. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 21 - Why AD slopes down

**Format/placement:** CHOICE, asked by Lina Saye beside `ad-as-wall`.

**Metadata:** Concept: AD slope; Keystone: AD; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Talk to Lina Saye, at the AD–AS wall in Statistics Floor.

**Stop reason - exact player copy:** The wall must distinguish movement along AD from a shift.

**Question card story setup - exact player copy:** The price level falls while taxes, government purchases, and foreign conditions stay fixed. Identify the three channels that increase quantity demanded before moving any curve on the policy wall today.

**Question card story-science connection - exact player copy:** A price-level change moves along AD; spending conditions shift AD.

**Question card prompt - exact player copy:** Select exactly one explanation from the four distinct choices below.

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

**Metadata:** Concept: SRAS shifters; Keystone: AD-AS; Area: Rate Room; Learning role: COMBINE; Difficulty: L4; Story role: Twist 1.

**Call - exact player copy:** Go to the AD–AS wall, in Statistics Floor.

**Stop reason - exact player copy:** The port wire can now be tested against both curves.

**Question card story setup - exact player copy:** With AD behavior fixed, the panel shows price level up, real output down, oil input cost up 18%, and government purchases unchanged. Select the curve change that fits every reading.

**Question card story-science connection - exact player copy:** A leftward SRAS shift explains stagflation without inventing a demand boom.

**Question card prompt - exact player copy:** Select one diagnosis and submit the curve change: AD right, AD left, SRAS right, or SRAS left.

**Complete format-specific interaction block:** `readings:[PL↑,Y↓,oil↑18%,G flat]; choices:[AD_right,AD_left,SRAS_right,SRAS_left]; answer:SRAS_left`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The imported-energy shock shifts SRAS left.”

**Why:** A leftward SRAS shift explains stagflation without inventing a demand boom.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A leftward SRAS shift explains stagflation without inventing a demand boom.

**State/output:** RATE unlocks.

## Stop 23 - Place both gaps

**Format/placement:** BALANCE, at `gap-calculator`.

**Metadata:** Concept: equilibrium/gaps; Keystone: AD-AS; Area: Rate Room; Learning role: RETRIEVE; Difficulty: L4; Story role: synthesis.

**Call - exact player copy:** Go to the gap calculator, in Rate Room.

**Stop reason - exact player copy:** Policy must count demand weakness without double-counting supply damage.

**Question card story setup - exact player copy:** Because SRAS moved left, current output is 685.2 while Yf remains 720.0 billion, and the price level is elevated. Close the model with one recessionary gap and one supply shock.

**Question card story-science connection - exact player copy:** One graph can show why lowering inflation and unemployment together is difficult.

**Question card prompt - exact player copy:** Toggle relevant readings and submit the model conclusion.

**Complete format-specific interaction block:** `balance:{streams:[{id:"actual_output",value:685.2,unit:"billion RATE",counts:true},{id:"full_employment_output",value:720.0,unit:"billion RATE",counts:true},{id:"oil_cost_index",value:18,unit:"index points",counts:true},{id:"nominal_output",value:740,unit:"billion RATE",counts:false,reason:"price-level contaminated nominal measure"}],correct:{output_gap:-34.8,shock:"adverse supply shock"},answerText:"Real output is 34.8 billion below full employment while the oil-cost reading identifies an adverse supply shock; nominal output does not count in the real gap."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Halvern has a recessionary gap plus an adverse supply shock.”

**Why:** One graph can show why lowering inflation and unemployment together is difficult.

**Wrong-path feedback:** A different response does not fit the displayed evidence. One graph can show why lowering inflation and unemployment together is difficult.

**State/output:** Record the result and unlock the next named stop.

## Stop 24 - Aim fiscal policy

**Format/placement:** STRESS, asked by Lina Saye beside `ad-as-wall`.

**Metadata:** Concept: fiscal dilemma; Keystone: fiscal/AD-AS; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Lina Saye, at the AD–AS wall in Statistics Floor.

**Stop reason - exact player copy:** The minister must state what the package can and cannot do.

**Question card story setup - exact player copy:** The model now contains weak demand and cost-push inflation at once. Stress the 8.7-billion package across oil-cost changes from 0% through 18%, then submit the claim that survives every case.

**Question card story-science connection - exact player copy:** Fiscal expansion raises AD; it does not shift damaged SRAS right.

**Question card prompt - exact player copy:** Inspect all four settings and submit one surviving conclusion.

**Complete format-specific interaction block:** `assumption:oil shock 0..18 step6; candidates:[closes_demand_gap survives all,lowers_prices survives none,cures_supply survives none]; correct:closes_demand_gap`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Use fiscal policy to close the demand gap, not to promise lower supply-driven prices.”

**Why:** Fiscal expansion raises AD; it does not shift damaged SRAS right.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Fiscal expansion raises AD; it does not shift damaged SRAS right.

**State/output:** Page 6 signed.

## Mission outcome

Mission decision: Aim policy at the weak demand gap. Treat the energy shock on its own. More spending can raise output and prices. It cannot fix a fuel supply shock. The claim of broad price abuse does not hold.

### Post-mission metric screen - exact player copy

**Header:** MISSION 6 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 15:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The board clears the profiteering claim and separates demand from supply.

**Automatic bar change:** RESERVE +3; TRUST +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/70/71/65; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 7 - Money That Moved

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 9 DAYS

**Card title:** Money That Moved

**Go now:** Go to NOTES and meet Tomas Arendt, bank supervision lead, at the note scale.

**Card body:** The price surge is not broad profiteering, but heavy note returns still look like disappearing money. Money serves exchange, accounting, and saving, while bank deposits can replace cash and support new loans. You will count M1 and M2, rebuild a bank balance sheet, and derive its lending limit. By the end of the mission, decide whether the returns signal contraction or migration.

**Objective:** Trace old cash into deposits and lending capacity.

### Worth knowing first - exact player copy

#### Glossary terms

M1: cash plus checking deposits. M2: M1 plus savings and money-market funds.

Required reserves: deposits times reserve ratio.

Excess reserves: total minus required reserves.

#### Primer concepts

cash is most liquid; bonds and stocks usually offer return with risk; bank assets include reserves and loans, liabilities include deposits; one bank lends excess reserves, the system creates the multiplied maximum.

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

**World state:** Keep this labeled result visible; Tomas Arendt says, , and Stop 26 unlocks.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Tomas Arendt: "M1 is 300 and M2 is 500 billion crowns."

**Unlocks/waypoint:** Unlock Stop 26 at `custody-desk` in Note Hall.

**Beat 3 - After Stop 26 | `balance-sheet-desk` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `NOTES → BANKS` only if the route requires travel, then.

**Panel/HUD text:** NOTES → BANKS

**Dialogue bubbles -** Tomas Arendt: "Most returned cash migrated into deposits; payment failures did not rise."

**Unlocks/waypoint:** Unlock Stop 27 at `balance-sheet-desk` in Bank Supervision.

**Beat 4 - After Stop 27 | `money-market-console` | automatic**

**World state:** Preserve this result on the BANKS decision fixture; The character asks for the promised mission decision, and Stop 28 unlocks.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Tomas Arendt: "Required reserves are 10, excess 8, multiplier 10, and maximum new money 80 billion."

**Unlocks/waypoint:** Unlock Stop 28 at `money-market-console` in Bank Supervision.

**Beat 5 - At mission end | `note-scale` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Arendt: "The returns show migration from cash into deposits, not a money-stock contraction."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** NOTES → BANKS. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

NOTES→BANKS, unlocked when S2 traces sacks to deposits. Tomas stops a truck from calling the money destroyed. S3–S4 use the ledger hall. Cash, checking, savings and funds establish aggregates; balance sheets and fractional reserves explain creation.

## Key concepts, explained here

**Objective:** Trace old cash into deposits and lending capacity. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 25 - Count M1 and M2

**Format/placement:** DERIVE, at `note-scale`.

**Metadata:** Concept: aggregates; Keystone: money; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the note scale, in Note Hall.

**Stop reason - exact player copy:** The note scale measures cash, not the whole money stock.

**Question card story setup - exact player copy:** Halvern records cash 80, checking 220, savings 140, and money-market funds 60 billion crowns. Build M1 and M2 before interpreting the returned-note sacks clearly in the Rate Book before proceeding.

**Question card story-science connection - exact player copy:** Cash can fall while deposits keep broader money available.

**Question card prompt - exact player copy:** Submit `(M1,M2)` in billions. `lines:[M1=80+220=300,M2=300+140+60=500]`.

**Complete format-specific interaction block:** `derive:{"goal":"M1 and M2 in billions","givens":["currency=80","checking deposits=220","savings=140","small time deposits=60"],"lines":[{"id":"L1","expression":"M1=80+220=300 billion","license":"state governing relationship"},{"id":"L2","expression":"M2=M1+140+60=500 billion","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["M1=80 billion","M2=420 billion"],"correct_result":"(300,500) billion","answerText":"M1 is 300 billion and M2 is 500 billion; savings and small time deposits enter M2, not M1."}`

**Correct result:** (300,500), ±0.1.

**Answer text:** “M1 is 300 and M2 is 500 billion crowns.”

**Why:** Cash can fall while deposits keep broader money available.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Cash can fall while deposits keep broader money available.

**State/output:** Record the result and unlock the next named stop.

## Stop 26 - Follow the sacks

**Format/placement:** TRACE, at `custody-desk`.

**Metadata:** Concept: money functions; Keystone: money; Area: Bank Supervision; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the custody desk, in Note Hall.

**Stop reason - exact player copy:** Shared processing may make several alarms look independent.

**Question card story setup - exact player copy:** With M1 and M2 counted, trace the note-weight alarm, checking rise, savings rise, and payment failures to their upstream records. Decide whether returned notes vanished or entered bank liabilities today.

**Question card story-science connection - exact player copy:** Agreement among cash-return channels is not independent proof of contraction.

**Question card prompt - exact player copy:** Open all dependencies and submit the conclusion.

**Complete format-specific interaction block:** `trace:{channels:[{id:"note_weight",label:"returned-note weight",dependency:"conversion intake ledger",target_dependent:true},{id:"checking",label:"checking-deposit rise",dependency:"conversion intake ledger",target_dependent:true},{id:"savings",label:"savings-deposit rise",dependency:"bank account ledger",independent:true},{id:"payment_failures",label:"payment-failure count",dependency:"payment network",independent:true}],shared_upstream:"conversion intake ledger",correct_conclusion:"cash migrated to deposits while payment failures stayed flat",answerText:"The note and checking channels share the intake ledger; independent savings and payment data show money moved into deposits rather than vanishing."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Most returned cash migrated into deposits; payment failures did not rise.”

**Why:** Agreement among cash-return channels is not independent proof of contraction.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Agreement among cash-return channels is not independent proof of contraction.

**State/output:** BANKS waypoint.

## Stop 27 - Bank ceiling

**Format/placement:** DERIVE, at `balance-sheet-desk`.

**Metadata:** Concept: reserves/multiplier; Keystone: money creation; Area: Rate Room; Learning role: PRACTICE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the balance-sheet desk, in Bank Supervision.

**Stop reason - exact player copy:** Deposit migration matters only if banks can meet reserves.

**Question card story setup - exact player copy:** Because 100 billion in deposits reached the banks, total reserves are 18 billion and the required reserve ratio is 10%. Derive required reserves, excess reserves, multiplier, and maximum system creation.

**Question card story-science connection - exact player copy:** The maximum is a capacity ceiling, not a promise that borrowers will demand every loan.

**Question card prompt - exact player copy:** Submit `(required,excess,multiplier,max new money)`. `lines:[10,8,10,80]`.

**Complete format-specific interaction block:** `derive:{"goal":"required reserves, excess reserves, multiplier, and maximum new money","givens":["deposits=100 billion","actual reserves=18 billion","reserve ratio=0.10"],"lines":[{"id":"L1","expression":"required reserves=100×0.10=10 billion","license":"state governing relationship"},{"id":"L2","expression":"excess reserves=18-10=8 billion","license":"substitute displayed values"},{"id":"L3","expression":"simple multiplier=1/0.10=10","license":"simplify with units"},{"id":"L4","expression":"maximum new money=8×10=80 billion","license":"simplify with units"}],"keyed_order":["L1","L2","L3","L4"],"decoys":["maximum new money=8 billion","multiplier=0.10"],"correct_result":"(10 billion,8 billion,10,80 billion)","answerText":"Required reserves are 10 billion, excess reserves 8 billion, the multiplier 10, and the theoretical maximum new money 80 billion."}`

**Correct result:** (10b,8b,10,80b), ±0.1.

**Answer text:** “Required reserves are 10, excess 8, multiplier 10, and maximum new money 80 billion.”

**Why:** The maximum is a capacity ceiling, not a promise that borrowers will demand every loan.

**Wrong-path feedback:** A different response does not fit the displayed evidence. The maximum is a capacity ceiling, not a promise that borrowers will demand every loan.

**State/output:** Record the result and unlock the next named stop.

## Stop 28 - Migration or contraction

**Format/placement:** DIAGNOSIS, at `money-market-console`.

**Metadata:** Concept: money-stock diagnosis; Keystone: money/GDP; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the money-market console, in Bank Supervision.

**Stop reason - exact player copy:** Page 7 must decide whether emergency contraction is real.

**Question card story setup - exact player copy:** Deposit growth now matches returned cash, M1 remains stable, M2 rises, excess reserves are positive, and payment failures stay flat. Select the diagnosis that fits every reading in the Rate Book.

**Question card story-science connection - exact player copy:** A visible fall in currency can be portfolio migration rather than a fall in spendable money.

**Question card prompt - exact player copy:** Select one diagnosis—cash-to-deposit migration, money-stock contraction, bank run, or hyperinflation—and submit the conclusion.

**Complete format-specific interaction block:** `answer:migration; alternatives:[contraction,run,hyperinflation]`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The returns show migration from cash into deposits, not a money-stock contraction.”

**Why:** A visible fall in currency can be portfolio migration rather than a fall in spendable money.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A visible fall in currency can be portfolio migration rather than a fall in spendable money.

**State/output:** Page 7 signed.

## Mission outcome

Mission decision: Returned notes moved into bank deposits. They did not vanish from the money supply. Banks still have spare reserves. Payments remain sound. The board must now set the real cost of loans.

### Post-mission metric screen - exact player copy

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 16:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Cash handling consumes staff while the deposit trail prevents a false alarm.

**Automatic bar change:** RESERVE −4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/74/67/72; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 8 - The Rate People Feel

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 8 DAYS

**Card title:** The Rate People Feel

**Go now:** Go to BANKS and meet Tomas Arendt at the bond-and-money panel.

**Card body:** Deposits are stable, but a proposed nominal rate rise may still tighten borrowing more than intended. The money market sets a nominal rate, while expected inflation separates that quote from the real purchasing-power cost. You will clear money demand, connect bond prices, and apply Fisher's equation. By the end of the mission, decide whether the board should raise rates now.

**Objective:** Distinguish nominal and real rates before tightening.

### Worth knowing first - exact player copy

#### Glossary terms

Money demand: desired liquid balances, lower at higher nominal interest.

Money supply: central-bank-set quantity, vertical in the model.

Real interest: nominal interest minus expected inflation.

#### Primer concepts

above equilibrium, money surplus leads people to buy bonds and the rate falls; bond prices and interest rates move inversely; menu and shoe-leather costs accompany inflation; unexpected inflation helps borrowers and hurts lenders.

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

**World state:** Keep this labeled result visible; Tomas Arendt says, , and Stop 30 unlocks.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Tomas Arendt: "A 30-billion surplus clears through bond buying and a rate fall to 4%."

**Unlocks/waypoint:** Unlock Stop 30 at `balance-sheet-desk` in Bank Supervision.

**Beat 3 - After Stop 30 | `policy-wall` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `BANKS → RATE` only if the route requires travel, then.

**Panel/HUD text:** BANKS → RATE

**Dialogue bubbles -** Tomas Arendt: "The real rate is 1.5%, already 0.5 point tighter."

**Unlocks/waypoint:** Unlock Stop 31 at `policy-wall` in Rate Room.

**Beat 4 - After Stop 31 | `bond-panel` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 32 unlocks.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Tomas Arendt: "Sell bonds → Ms falls → i rises → I falls → AD shifts left → output and price level fall."

**Unlocks/waypoint:** Unlock Stop 32 at `bond-panel` in BANKS.

**Beat 5 - At mission end | `money-market-console` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Arendt: "Do not raise now; the hike tightens real borrowing conditions in every tested case."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** BANKS → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

BANKS→RATE after the equilibrium simulation. Tomas wants a cushion; Mara wants the real burden measured. The route is causal because only RATE authorizes a change.

## Key concepts, explained here

**Objective:** Distinguish nominal and real rates before tightening. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 29 - Clear money surplus

**Format/placement:** VERIFY, at `money-market-console`.

**Metadata:** Concept: money market; Keystone: interest markets; Area: Bank Supervision; Learning role: INTRODUCE; Difficulty: L3; Story role: experiment.

**Call - exact player copy:** Go to the money-market console, in Bank Supervision.

**Stop reason - exact player copy:** The board needs the direction of adjustment before setting a tool.

**Question card story setup - exact player copy:** Money supplied is 300 billion, but at 5% people demand only 270 billion. Predict the bond trade and rate direction before operating the market panel clearly for the next board decision.

**Question card story-science connection - exact player copy:** A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Subtract money demand of 270 billion from money supply of 300 billion and submit the surplus in billions. **OPERATE:** Run the bond-market adjustment. **MEASURE:** Read the new bond price and nominal rate. **INTERPRET:** Submit the trade direction and rate direction.

**Complete format-specific interaction block:** `verify:{prediction:{equation:"surplus=money supplied-money demanded",inputs:{Ms:300,Md:270,unit:"billion"},correct:30,tolerance:0.1,submit_unit:"billion"},lock:"bond-market action stays locked until 30 billion is committed",action:"run adjustment at the displayed 5% starting rate",measurements:{bond_price:"rises",nominal_rate:"falls from 5% to 4%"},conclusion:"surplus causes bond buying and a lower rate"}`

**Correct result:** A 30-billion money surplus causes bond buying, raises bond prices, and lowers the nominal rate from 5% to 4%.

**Answer text:** “A 30-billion surplus clears through bond buying and a rate fall to 4%.”

**Why:** A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**State/output:** Record the result and unlock the next named stop.

## Stop 30 - Real burden

**Format/placement:** DERIVE, at `balance-sheet-desk`.

**Metadata:** Concept: Fisher; Keystone: inflation/rates; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the balance-sheet desk, in Bank Supervision.

**Stop reason - exact player copy:** A nominal quote alone cannot show purchasing-power cost.

**Question card story setup - exact player copy:** With equilibrium nominal interest at 4.0% and expected inflation at 2.5%, rearrange Fisher's equation and calculate the real rate. Compare it with last month's 1.0% real rate.

**Question card story-science connection - exact player copy:** Tightness depends on the real rate, not on whether the nominal number looks high or low.

**Question card prompt - exact player copy:** Submit real rate and change. `lines:[r=4.0−2.5=1.5,change=+0.5pp]`.

**Complete format-specific interaction block:** `derive:{"goal":"real rate and monthly change","givens":["nominal rate=4.0%","expected inflation=2.5%","last real rate=1.0%"],"lines":[{"id":"L1","expression":"real rate=nominal rate-expected inflation","license":"state governing relationship"},{"id":"L2","expression":"real rate=4.0%-2.5%=1.5%","license":"substitute displayed values"},{"id":"L3","expression":"change=1.5%-1.0%=+0.5 percentage point","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["6.5%","-1.5%"],"correct_result":"1.5%, up 0.5 percentage point","answerText":"The real rate is 1.5%, which is 0.5 percentage point above last month."}`

**Correct result:** 1.5%, +0.5 pp.

**Answer text:** “The real rate is 1.5%, already 0.5 point tighter.”

**Why:** Tightness depends on the real rate, not on whether the nominal number looks high or low.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Tightness depends on the real rate, not on whether the nominal number looks high or low.

**State/output:** Record the result and unlock the next named stop.

## Stop 31 - Tool transmission

**Format/placement:** SEQUENCE, at `policy-wall`.

**Metadata:** Concept: monetary chain; Keystone: AD; Area: Bank Supervision; Learning role: INTRODUCE; Difficulty: L3; Story role: travel payoff.

**Call - exact player copy:** Go to the policy wall, in Rate Room.

**Stop reason - exact player copy:** Mara needs the full consequence before changing the rate.

**Question card story setup - exact player copy:** Because the real rate is already tighter, order the causal chain from a bond sale to output and prices. Include the money-market step and the investment response in the Rate Book.

**Question card story-science connection - exact player copy:** A tool matters only through the chain it sets off.

**Question card prompt - exact player copy:** Place six cards in order and submit.

**Complete format-specific interaction block:** `cards:[sell bonds,Ms falls,nominal i rises,I falls,AD left,Y and PL fall]; order:same`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Sell bonds → Ms falls → i rises → I falls → AD shifts left → output and price level fall.”

**Why:** A tool matters only through the chain it sets off.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A tool matters only through the chain it sets off.

**State/output:** Record the result and unlock the next named stop.

## Stop 32 - Raise now

**Format/placement:** STRESS, asked by Tomas Arendt beside `bond-panel`.

**Metadata:** Concept: monetary choice; Keystone: AD-AS/Fisher; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Tomas Arendt, at the bond panel in Bank Supervision.

**Stop reason - exact player copy:** The chair needs a reversible choice under uncertain expected inflation.

**Question card story setup - exact player copy:** The recessionary gap remains 34.8 billion while expected inflation could be 2% to 3%. Stress a one-point nominal hike across that range and select the claim that always survives.

**Question card story-science connection - exact player copy:** A hike raises the real rate across the range and worsens weak demand.

**Question card prompt - exact player copy:** Inspect all settings and submit one policy choice: “do not raise now.”

**Complete format-specific interaction block:** `range:2..3 step.25; candidates:[hike tightens survives all,hike closes gap none,hike shifts SRAS none]; correct:hike tightens`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Do not raise now; the hike tightens real borrowing conditions in every tested case.”

**Why:** A hike raises the real rate across the range and worsens weak demand.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A hike raises the real rate across the range and worsens weak demand.

**State/output:** Page 8 signed.

## Mission outcome

Mission decision: Do not raise rates now. The real rate is already 1.5%. And a hike would reduce investment and AD while output is below capacity. The board holds the tool. Foreign buyers then flood the bond desk.

### Post-mission metric screen - exact player copy

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 15:30

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Avoiding an unnecessary hike protects price and output planning.

**Automatic bar change:** PRICES +3

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/80/75/75; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 9 - Two Accounts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 7 DAYS

**Card title:** Two Accounts

**Go now:** Go to TRADE and meet Nia Corren, open-economy analyst, at the payment wires.

**Card body:** Holding the rate avoids extra tightening, but foreign bond orders are strengthening the future RATE. International goods, income, and transfers enter the current account, while asset purchases enter the financial account. You will close both accounts, clear foreign exchange, and test exporter effects. By the end of the mission, decide whether the capital inflow is unqualified good news.

**Objective:** Connect balance of payments, exchange rates, and net exports.

### Worth knowing first - exact player copy

#### Glossary terms

Appreciation: a currency buys more foreign currency.

Current account: NX plus net income and net transfers.

Financial account: cross-border asset purchases and sales.

#### Primer concepts

accounts sum to zero in the simplified AP model; a trade deficit pairs with capital surplus; foreigners demand RATE for Halvern goods or assets.

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

**World state:** Keep this labeled result visible; Nia Corren says, , and Stop 34 unlocks.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Nia Corren: "Current account −17 and financial account +17 billion close at zero."

**Unlocks/waypoint:** Unlock Stop 34 at `forex-console` in Open-Economy Floor.

**Beat 3 - After Stop 34 | `forex-console` | automatic**

**World state:** Copy the result to the Rate Book; Activate RATE, then.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Nia Corren: "Foreign bond demand → demand for RATE shifts right → RATE appreciates → exports fall and imports rise → net exports fall."

**Unlocks/waypoint:** Unlock Stop 35 at `forex-console` in Open-Economy Floor.

**Beat 4 - After Stop 35 | `shipment-board` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 36 unlocks.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Nia Corren: "At fixed conditions, appreciation lowers exports and raises imports; restoration recovers baseline."

**Unlocks/waypoint:** Unlock Stop 36 at `shipment-board` in TRADE.

**Beat 5 - At mission end | `trade-ledger` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Corren: "The inflow finances the current deficit and appreciates RATE, but lower NX partly offsets demand."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** TRADE → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

TRADE→RATE when S2 proves appreciation. Nia initially calls it confidence; Soren's export orders add the cost. Only RATE has the money-supply record needed at S4.

## Key concepts, explained here

**Objective:** Connect balance of payments, exchange rates, and net exports. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 33 - Close payments

**Format/placement:** BALANCE, at `trade-ledger`.

**Metadata:** Concept: BOP; Keystone: open economy; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the trade ledger, in Open-Economy Floor.

**Stop reason - exact player copy:** The inflow must be placed in the correct account.

**Question card story setup - exact player copy:** Halvern has NX −18, net foreign income +2, net transfers −1, and foreign asset purchases +17 billion. Count the proper streams and close the simplified balance of payments for the board.

**Question card story-science connection - exact player copy:** A current deficit is financed by a financial surplus, not free money.

**Question card prompt - exact player copy:** Toggle streams; submit CA and FA. `CA=−18+2−1=−17; FA=+17; sum0`.

**Complete format-specific interaction block:** `balance:{streams:[{id:"net_exports",value:-18,unit:"billion",count:true},{id:"net_foreign_income",value:2,unit:"billion",count:true},{id:"net_transfers",value:-1,unit:"billion",count:true},{id:"foreign_asset_purchases",value:17,unit:"billion",count:true},{id:"domestic_stock_trade",value:6,unit:"billion",count:false}],equations:["CA=NX+NFI+transfers","CA+FA=0"],correct:{CA:-17,FA:17,total:0},tolerance:0.1,submission:"numeric CA and FA pair in billions"}`

**Correct result:** The current account is -17 billion and the financial account is +17 billion, so the simplified balance closes at zero.

**Answer text:** “Current account −17 and financial account +17 billion close at zero.”

**Why:** A current deficit is financed by a financial surplus, not free money.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A current deficit is financed by a financial surplus, not free money.

**State/output:** Record the result and unlock the next named stop.

## Stop 34 - Clear forex

**Format/placement:** DERIVE, at `forex-console`.

**Metadata:** Concept: currency demand; Keystone: forex; Area: Open-Economy Floor; Learning role: PRACTICE; Difficulty: L3; Story role: consequence.

**Call - exact player copy:** Go to the forex console, in Open-Economy Floor.

**Stop reason - exact player copy:** Asset purchases reveal which curve shifts.

**Question card story setup - exact player copy:** With a 17-billion capital inflow, foreigners must acquire RATE to buy Halvern bonds. Build the direction chain from asset demand to the currency's value and net exports in the Rate Book.

**Question card story-science connection - exact player copy:** Appreciation makes exports dearer and imports cheaper.

**Question card prompt - exact player copy:** Order/build `foreign bond demand→demand for RATE right→RATE appreciates→X falls,M rises→NX falls`.

**Complete format-specific interaction block:** `derive:{candidate_lines:["Foreign investors buy Halvern bonds","Demand for RATE shifts right","RATE appreciates","Halvern exports become dearer abroad","Imports become cheaper in Halvern","Exports fall and imports rise","Net exports fall"],licenses:["asset purchase requires domestic currency","foreign-exchange demand shift","higher equilibrium currency price","relative-price effect","net-exports definition"],keyed_order:[1,2,3,4,5,6,7],decoys:["RATE supply shifts left because Halvern prints fewer notes","Appreciation raises net exports"],submission:"ordered line-and-rule chain"}`

**Correct result:** Foreign bond demand raises demand for RATE, RATE appreciates, exports fall, imports rise, and net exports fall.

**Answer text:** “Foreign bond demand → demand for RATE shifts right → RATE appreciates → exports fall and imports rise → net exports fall.”

**Why:** Appreciation makes exports dearer and imports cheaper.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Appreciation makes exports dearer and imports cheaper.

**State/output:** RATE waypoint.

## Stop 35 - Exporter effect

**Format/placement:** CONTROL, at `forex-console`.

**Metadata:** Concept: appreciation/NX; Keystone: forex; Area: Open-Economy Floor; Learning role: COMBINE; Difficulty: L4; Story role: test.

**Call - exact player copy:** Go to the forex console, in Open-Economy Floor.

**Stop reason - exact player copy:** Soren wants the currency effect isolated from port volume.

**Question card story setup - exact player copy:** Because RATE appreciation should reduce net exports, change only the exchange quote from 1.00 to 1.10 foreign units per RATE. Hold foreign income, domestic income, tariffs, and shipping capacity fixed.

**Question card story-science connection - exact player copy:** Reversing the quote tests whether currency value changes the export margin.

**Question card prompt - exact player copy:** Change quote to 1.10, measure X and M; restore 1.00 and measure again; submit conclusion. `control:{baseline:1,response:.10,noise:.01,candidates:[quote,tariff,income],fixed:[income,tariffs,capacity],readings:{1.00:{X90,M108},1.10:{X84,M112}},correct:"appreciation lowers NX"}`.

**Complete format-specific interaction block:** `control:{candidates:[{id:"exchange_quote",change:"1.00 to 1.10 foreign units per RATE"},{id:"tariff",change:"0% to 5%"},{id:"foreign_income",change:"index 100 to 105"}],selected:"exchange_quote",baseline:{quote:1.00,exports:90,imports:108,unit:"billion"},response:{quote:1.10,exports:84,imports:112},noise_band:0.01,fixed:["domestic income","foreign income","tariffs","shipping capacity"],measure:"exports and imports after the panel settles",restore:{quote:1.00,exports:90,imports:108,remeasure:true},correct:"appreciation lowers net exports",submission:"control choice, readings, and conclusion"}`

**Correct result:** Raising the quote from 1.00 to 1.10 lowers exports from 90 to 84 billion and raises imports from 108 to 112 billion; restoring 1.00 restores the baseline.

**Answer text:** “At fixed conditions, appreciation lowers exports and raises imports; restoration recovers baseline.”

**Why:** Reversing the quote tests whether currency value changes the export margin.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Reversing the quote tests whether currency value changes the export margin.

**State/output:** Record the result and unlock the next named stop.

## Stop 36 - Good news

**Format/placement:** CHOICE, asked by Nia Corren beside `shipment-board`.

**Metadata:** Concept: capital flows; Keystone: forex/BOP; Area: Open-Economy Floor; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Nia Corren, at the shipment board in Open-Economy Floor.

**Stop reason - exact player copy:** Page 9 must record benefit and cost.

**Question card story setup - exact player copy:** The accounts close, foreign asset demand supports RATE, and the controlled comparison shows net exports falling under appreciation. Choose the statement that preserves all three facts for the next board decision.

**Question card story-science connection - exact player copy:** Financial confidence can strengthen the currency while weakening aggregate demand through NX.

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

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 16:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Closing both accounts restores intervention capacity.

**Automatic bar change:** RESERVE +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/88/79/79; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 10 - The Temporary Tradeoff

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 6 DAYS

**Card title:** The Temporary Tradeoff

**Go now:** Go to RATE and meet Mara Venn at the Phillips wall.

**Card body:** Appreciation is weakening exports while the energy shock keeps the inflation print high. In the short run, lower unemployment can accompany higher inflation, but the long-run curve is vertical at the natural rate. You will connect curve movements, money growth, and output. By the end of the mission, decide whether high current inflation justifies permanent tightening.

**Objective:** Separate a short-run shock from long-run inflation policy.

### Worth knowing first - exact player copy

#### Glossary terms

SRPC: short-run inverse inflation-unemployment relation.

LRPC: vertical curve at the natural rate.

Money neutrality: long-run money changes alter prices, not real output.

#### Primer concepts

AD shifts move along SRPC; supply shocks shift SRPC; NRU changes shift LRPC; velocity is circulation rate.

#### Equations first needed today
`M×V=P×Y`. Job: connect money to nominal spending. Symbols: money, velocity, price level, real output. Why: test whether the inflation print came from sustained money growth.

## Main story happening - designer summary

RATE→PRICES, because only the price history can test sustained money growth. Twist 2: the shock shifts SRPC; no money surge appears.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at RATE | `policy-wall` | automatic**

**World state:** Arrival | RATE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Separate a short-run shock from long-run inflation policy.` Mara Venn points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Separate a short-run shock from long-run inflation policy.

**Dialogue bubbles -** Mara Venn: "Start with move or shift. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `policy-wall` in RATE.

**Beat 2 - After Stop 37 | `gap-calculator` | automatic**

**World state:** Keep this labeled result visible; Mara Venn says, , and Stop 38 unlocks.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Mara Venn: "The supply shock shifts SRPC right."

**Unlocks/waypoint:** Unlock Stop 38 at `gap-calculator` in Rate Room.

**Beat 3 - After Stop 38 | `price-history-board` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `RATE → PRICES` only if the route requires travel, then.

**Panel/HUD text:** RATE → PRICES

**Dialogue bubbles -** Mara Venn: "Estimated long-run inflation is 2%, far below the temporary 5.88% basket print."

**Unlocks/waypoint:** Unlock Stop 39 at `price-history-board` in Statistics Floor.

**Beat 4 - After Stop 39 | `forecast-table` | automatic**

**World state:** Preserve this result on the PRICES decision fixture; The character asks for the promised mission decision, and Stop 40 unlocks.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Mara Venn: "The temporary-supply model predicts the holdout; persistent monetary inflation does not."

**Unlocks/waypoint:** Unlock Stop 40 at `forecast-table` in RATE.

**Beat 5 - At mission end | `policy-wall` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Venn: "Do not justify permanent tightening from this temporary print; commit a reversible trigger."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** RATE → PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

RATE→PRICES, because only the price history can test sustained money growth. Twist 2: the shock shifts SRPC; no money surge appears.

## Key concepts, explained here

**Objective:** Separate a short-run shock from long-run inflation policy. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 37 - Move or shift

**Format/placement:** CHOICE, asked by Mara Venn beside `policy-wall`.

**Metadata:** Concept: Phillips curves; Keystone: long-run consequences; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Talk to Mara Venn, at the policy wall in Rate Room.

**Stop reason - exact player copy:** The wall must classify the shock.

**Question card story setup - exact player copy:** Unemployment rises while inflation also rises after the oil wire, rather than moving oppositely along one short-run curve. Identify the change that fits this pattern before blaming excess demand today.

**Question card story-science connection - exact player copy:** Adverse supply shifts SRPC right; AD changes move along it.

**Question card prompt - exact player copy:** Select exactly one change from the four distinct choices below.

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

**Metadata:** Concept: quantity theory; Keystone: neutrality; Area: Rate Room; Learning role: COMBINE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the gap calculator, in Rate Room.

**Stop reason - exact player copy:** Sustained inflation needs a long-run nominal explanation.

**Question card story setup - exact player copy:** Money grows 3%, velocity is constant, and real output grows 1% at full employment. Use the growth-rate form of quantity theory to estimate long-run inflation clearly for the next board decision.

**Question card story-science connection - exact player copy:** Money growth above real growth sets long-run inflation when velocity is stable.

**Question card prompt - exact player copy:** derive `π≈%ΔM+%ΔV−%ΔY`; submit. `3+0−1=2%`.

**Complete format-specific interaction block:** `derive:{candidate_lines:["MV=PY","%ΔM+%ΔV≈π+%ΔY","π≈%ΔM+%ΔV−%ΔY","π≈3%+0%−1%","π≈2%"],licenses:["quantity identity","growth-rate form","solve for inflation","substitute displayed rates","arithmetic"],keyed_order:[1,2,3,4,5],decoys:["π≈3%+1%=4%","π≈%ΔY−%ΔM"],submission:"ordered line-and-rule derivation plus inflation rate in percent"}`

**Correct result:** The quantity equation gives estimated long-run inflation of 2%.

**Answer text:** “Estimated long-run inflation is 2%, far below the temporary 5.88% basket print.”

**Why:** Money growth above real growth sets long-run inflation when velocity is stable.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Money growth above real growth sets long-run inflation when velocity is stable.

**State/output:** Record the result and unlock the next named stop.

## Stop 39 - Test unseen prices

**Format/placement:** HOLDOUT, at `price-history-board`.

**Metadata:** Concept: temporary vs persistent inflation; Keystone: evidence; Area: Statistics Floor; Learning role: RETRIEVE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** The model must face data not used to fit it.

**Question card story setup - exact player copy:** Because quantity theory predicts 2% long-run inflation, fit a “persistent money” and a “temporary supply” model through months one to four. Freeze both before months five and six appear today.

**Question card story-science connection - exact player copy:** Unseen normalization can reject a permanent-inflation story.

**Question card prompt - exact player copy:** Fit, freeze, reveal both holdout months, and submit the better mechanism.

**Complete format-specific interaction block:** `train:[2.0,2.1,5.9,5.2]; models:[persistent5.5,temporary_to2]; holdout:[3.2,2.4]; correct:temporary_to2`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The temporary-supply model predicts the holdout; persistent monetary inflation does not.”

**Why:** Unseen normalization can reject a permanent-inflation story.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Unseen normalization can reject a permanent-inflation story.

**State/output:** Record the result and unlock the next named stop.

## Stop 40 - Tighten forever

**Format/placement:** STRESS, asked by Mara Venn beside `forecast-table`.

**Metadata:** Concept: policy horizon; Keystone: Phillips/neutrality; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Mara Venn, at the forecast table in Rate Room.

**Stop reason - exact player copy:** The signed stance must separate weeks from years.

**Question card story setup - exact player copy:** The shock model wins on unseen data, but inflation expectations range from 1.8% to 2.4%. Stress permanent tightening across that range and compare it with a conditional trigger.

**Question card story-science connection - exact player copy:** Long-run neutrality does not make short-run output losses disappear.

**Question card prompt - exact player copy:** Inspect all settings and submit “conditional stance.”

**Complete format-specific interaction block:** `range:1.8..2.4 step.2; candidates:[permanent tighten,ignore,conditional]; correct:conditional`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Do not justify permanent tightening from this temporary print; commit a reversible trigger.”

**Why:** Long-run neutrality does not make short-run output losses disappear.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Long-run neutrality does not make short-run output losses disappear.

**State/output:** Page 10 signed.

## Mission outcome

Mission decision: Do not tighten policy for a short price shock. New data support the supply-shock model. Slow money growth points to about 2% long-run inflation. Use set rules, not fear. Wage contracts will adjust later.

### Post-mission metric screen - exact player copy

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 16:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Rejecting panic is correct, but officials must explain a conditional stance.

**Automatic bar change:** TRUST −4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 87/88/86/75; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 11 - Too Late By Itself

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 5 DAYS

**Card title:** Too Late by Itself

**Go now:** Go to COUNTER and meet Eli Voss at the wage notices.

**Card body:** Temporary inflation does not justify permanent tightening, but waiting for wages to adjust would leave families exposed through launch. In the long run, flexible wages return output to Yf; automatic taxes and transfers can soften a downturn sooner. You will time adjustment, test stabilizers, and protect growth. By the end of the mission, decide whether self-correction alone is fast enough.

**Objective:** Compare market adjustment with a temporary policy bridge.

### Worth knowing first - exact player copy

#### Glossary terms

Self-correction: wage and input-cost adjustment that shifts SRAS toward long-run equilibrium.

Automatic stabilizer: taxes or transfers that change without a new law.

Economic growth: rising real GDP per person.

#### Primer concepts

physical capital, human capital, and technology drive growth; LRAS shifts with productive capacity.

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

**World state:** Keep this labeled result visible; Eli Voss says, , and Stop 42 unlocks.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Eli Voss: "Self-correction returns Y to Yf, but wage adjustment starts after launch."

**Unlocks/waypoint:** Unlock Stop 42 at `ad-as-wall` in Statistics Floor.

**Beat 3 - After Stop 42 | `forecast-table` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `COUNTER → PRICES → RATE` only if the route requires travel, then.

**Panel/HUD text:** COUNTER → PRICES → RATE

**Dialogue bubbles -** Eli Voss: "Automatic stabilizers shrink the loss from 10 to 7 billion."

**Unlocks/waypoint:** Unlock Stop 43 at `forecast-table` in Rate Room.

**Beat 4 - After Stop 43 | `allocation-slate` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 44 unlocks.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Eli Voss: "Fund clearing, training, port repair, and reserve."

**Unlocks/waypoint:** Unlock Stop 44 at `allocation-slate` in COUNTER.

**Beat 5 - At mission end | `queue-board` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Use a temporary bridge with a sunset review; self-correction alone is too slow."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** COUNTER → PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

COUNTER→PRICES→RATE. Wage notices establish six weeks; PRICES tests stabilizers; RATE authorizes a bridge. Each move carries evidence unavailable below. Eli wants relief, Idris protects long-run investment.

## Key concepts, explained here

**Objective:** Compare market adjustment with a temporary policy bridge. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 41 - Adjustment order

**Format/placement:** SEQUENCE, at `queue-board`.

**Metadata:** Concept: self-correction; Keystone: AD-AS; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the queue board, in Exchange Counter.

**Stop reason - exact player copy:** The conversion deadline must be compared with wage timing.

**Question card story setup - exact player copy:** Wage contracts reset in six weeks, but conversion begins in five days. Order the recessionary self-correction chain and mark which step misses the deadline clearly in the Rate Book for review.

**Question card story-science connection - exact player copy:** A correct long-run mechanism can still be too slow for a short-run emergency.

**Question card prompt - exact player copy:** Order and mark.

**Complete format-specific interaction block:** `cards:[unemployment high,wage growth slows,input costs fall,SRAS right,Y returns Yf]; order:same; deadline_step:wage reset`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Self-correction returns Y to Yf, but wage adjustment starts after launch.”

**Why:** A correct long-run mechanism can still be too slow for a short-run emergency.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A correct long-run mechanism can still be too slow for a short-run emergency.

**State/output:** Record the result and unlock the next named stop.

## Stop 42 - Stabilizer response

**Format/placement:** DERIVE, at `ad-as-wall`.

**Metadata:** Concept: automatic stabilizers; Keystone: fiscal/AD; Area: Rate Room; Learning role: RETRIEVE; Difficulty: L3; Story role: calculation.

**Call - exact player copy:** Go to the AD–AS wall, in Statistics Floor.

**Stop reason - exact player copy:** The bridge must distinguish automatic support from new spending.

**Question card story setup - exact player copy:** Because self-correction is late, disposable income falls 10 billion, but taxes fall 2 billion and transfers rise 1 billion automatically. Calculate the net income loss before induced consumption for the board.

**Question card story-science connection - exact player copy:** Stabilizers reduce the initial shock without a new vote.

**Question card prompt - exact player copy:** derive `−10+2+1=−7` billion.

**Complete format-specific interaction block:** `derive:{"goal":"net output change from the shock and stabilizers","givens":["initial shock=-10 billion","tax stabilizer=+2 billion","transfer stabilizer=+1 billion"],"lines":[{"id":"L1","expression":"net change=-10+2+1","license":"state governing relationship"},{"id":"L2","expression":"net change=-7 billion","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["-13 billion","-10 billion"],"correct_result":"-7 billion","answerText":"Automatic stabilizers reduce the 10-billion decline to a 7-billion decline without a new vote."}`

**Correct result:** −7b ±0.1.

**Answer text:** “Automatic stabilizers shrink the loss from 10 to 7 billion.”

**Why:** Stabilizers reduce the initial shock without a new vote.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Stabilizers reduce the initial shock without a new vote.

**State/output:** Record the result and unlock the next named stop.

## Stop 43 - Protect growth engines

**Format/placement:** ALLOCATE, at `forecast-table`.

**Metadata:** Concept: growth resources; Keystone: growth; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L5; Story role: decision input.

**Call - exact player copy:** Go to the forecast table, in Rate Room.

**Stop reason - exact player copy:** Short-run support must not consume long-run capacity.

**Question card story setup - exact player copy:** The smaller seven-billion shock leaves a limited bridge fund. Allocate 100 points across household clearing, worker retraining, port repair, publicity, and a protected reserve while preserving all required growth investments.

**Question card story-science connection - exact player copy:** Human capital, physical capital, and technology shift productive capacity; publicity does not.

**Question card prompt - exact player copy:** Allocate all 100 and submit the four funded items.

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"clearing",label:"payment clearing",cost:30,required:true},{id:"training",label:"worker training",cost:25,required:true},{id:"port",label:"port repair",cost:25,required:true},{id:"reserve",label:"protected contingency reserve",cost:20,required:true,protected:true},{id:"publicity",label:"confidence publicity",cost:20,required:false}],questions:[{id:"payments",text:"Does the plan keep clearing operational?",required:true},{id:"growth",text:"Does it fund training and port capacity?",required:true},{id:"reserve",text:"Does it preserve the restart reserve?",required:true}],correct_allocation:{clearing:30,training:25,port:25,reserve:20},answerText:"Spend all 100 on clearing, training, port repair, and the protected reserve; publicity would crowd out a required growth or safety item."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Fund clearing, training, port repair, and reserve.”

**Why:** Human capital, physical capital, and technology shift productive capacity; publicity does not.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Human capital, physical capital, and technology shift productive capacity; publicity does not.

**State/output:** Record the result and unlock the next named stop.

## Stop 44 - Wait or bridge

**Format/placement:** VALUE, asked by Eli Voss beside `allocation-slate`.

**Metadata:** Concept: stabilization timing; Keystone: fiscal/growth; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Eli Voss, at the allocation slate in Exchange Counter.

**Stop reason - exact player copy:** The chair must choose before contracts can adjust.

**Question card story setup - exact player copy:** Wage adjustment begins after launch, automatic stabilizers cover part of the loss, and the protected plan preserves growth capacity. Choose whether to wait, make permanent stimulus, or use a temporary bridge with an end date.

**Question card story-science connection - exact player copy:** Temporary support can span a lag without becoming a permanent demand expansion.

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

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 17:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The temporary bridge covers the lag and protects launch planning.

**Automatic bar change:** PRICES +4; READINESS +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 91/92/86/86; bank 0.

**Lock result:** No lock. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 12 - 4.15 On The Clock

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 4 DAYS

**Card title:** 4.15 on the Clock

**Go now:** Go to NOTES and meet Eli Voss at the conversion trays.

**Card body:** The temporary bridge covers the policy lag, and the legal conversion must now survive a full rehearsal. At 4.15 old crowns per RATE, timing across notes, reserves, and foreign dealing matters as much as the arithmetic. You will convert balances, verify reserve arrival, and trace appreciation. By the end of the mission, decide whether 4.15 is operationally safe.

**Objective:** Certify the conversion ratio with cash, bank, and foreign-market evidence.

### Worth knowing first - exact player copy

#### Glossary terms

Conversion ratio: old currency units exchanged for one new unit.

Reserve clock: timed schedule that keeps required reserves available.

#### Primer concepts

money creation is a ceiling; money market uses nominal i; forex changes NX.

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

**World state:** Keep this labeled result visible; Eli Voss says, , and Stop 46 unlocks.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Eli Voss: "The tray becomes 10,000 RATE."

**Unlocks/waypoint:** Unlock Stop 46 at `reserve-clock` in Bank Supervision.

**Beat 3 - After Stop 46 | `payment-wires` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `NOTES → BANKS → TRADE` only if the route requires travel, then.

**Panel/HUD text:** NOTES → BANKS → TRADE

**Dialogue bubbles -** Eli Voss: "The reserve arrives exactly at the inclusive 1,000-RATE requirement."

**Unlocks/waypoint:** Unlock Stop 47 at `payment-wires` in Open-Economy Floor.

**Beat 4 - After Stop 47 | `custody-desk` | automatic**

**World state:** Preserve this result on the TRADE decision fixture; The character asks for the promised mission decision, and Stop 48 unlocks.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Eli Voss: "Three channels share the 4.00 shortcut; independent customs supports 4.15."

**Unlocks/waypoint:** Unlock Stop 48 at `custody-desk` in NOTES.

**Beat 5 - At mission end | `conversion-trays` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "Approve 4.15 after replacing every 4.00 shortcut."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** NOTES → BANKS → TRADE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

NOTES→BANKS→TRADE. Converted tray result opens bank clock; verified reserve result opens trade desk.

## Key concepts, explained here

**Objective:** Certify the conversion ratio with cash, bank, and foreign-market evidence. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 45 - Convert the tray

**Format/placement:** DERIVE, at `conversion-trays`.

**Metadata:** Concept: conversion arithmetic; Keystone: real/nominal; Area: Rate Room; Learning role: PRACTICE; Difficulty: L2; Story role: L2.

**Call - exact player copy:** Go to the conversion trays, in Note Hall.

**Stop reason - exact player copy:** The physical tray must equal the legal ledger.

**Question card story setup - exact player copy:** A tray contains 41,500 old crowns, and the legal ratio is 4.15 crowns per RATE. Calculate the new balance before the notes can leave custody in the Rate Book.

**Question card story-science connection - exact player copy:** Exact conversion prevents rounding from creating a false price jump.

**Question card prompt - exact player copy:** derive `41,500/4.15=10,000 RATE`; submit RATE.

**Complete format-specific interaction block:** `derive:{"goal":"new RATE balance","givens":["old balance=41,500 crowns","conversion=4.15 crowns per RATE"],"lines":[{"id":"L1","expression":"RATE=crowns/(crowns per RATE)","license":"state governing relationship"},{"id":"L2","expression":"RATE=41,500/4.15=10,000","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["172,225 RATE","9,638 RATE"],"correct_result":"10,000 RATE","answerText":"The tray converts to exactly 10,000 RATE; division by crowns per RATE cancels the old unit."}`

**Correct result:** 10,000 ±0.01.

**Answer text:** “The tray becomes 10,000 RATE.”

**Why:** Exact conversion prevents rounding from creating a false price jump.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Exact conversion prevents rounding from creating a false price jump.

**State/output:** Record the result and unlock the next named stop.

## Stop 46 - Reserve clock

**Format/placement:** VERIFY, at `reserve-clock`.

**Metadata:** Concept: reserve timing; Keystone: banking; Area: Bank Supervision; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the reserve clock, in Bank Supervision.

**Stop reason - exact player copy:** The converted deposit cannot clear before required reserves arrive.

**Question card story setup - exact player copy:** The 10,000-RATE deposit requires 10% reserves, and 1,000 RATE is scheduled at minute 6. Predict the minimum reserve before opening the clearing gate clearly for the next board decision.

**Question card story-science connection - exact player copy:** Correct totals can still fail when their timing differs.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use `required reserves=deposit×reserve ratio` with 10,000 RATE and 10% and submit the required reserve in RATE. **OPERATE:** Advance the clearing clock. **MEASURE:** Record reserves at minute 6. **INTERPRET:** Submit whether the inclusive reserve rule permits clearing.

**Complete format-specific interaction block:** `verify:{prediction:{equation:"required reserves=deposit×reserve ratio",inputs:{deposit:10000,unit:"RATE",reserve_ratio:0.10},correct:1000,tolerance:0.01,submit_unit:"RATE"},lock:"clock stays locked until 1,000 RATE is committed",action:"advance clock to minute 6",measurement:{minute:6,reserves:1000,unit:"RATE"},decision_rule:"clear if reserves are at least the requirement",correct_conclusion:"clear at minute 6"}`

**Correct result:** The bank needs 1,000 RATE and has exactly 1,000 RATE at minute 6, so the inclusive rule permits clearing then.

**Answer text:** “The reserve arrives exactly at the inclusive 1,000-RATE requirement.”

**Why:** Correct totals can still fail when their timing differs.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Correct totals can still fail when their timing differs.

**State/output:** Record the result and unlock the next named stop.

## Stop 47 - Foreign echo

**Format/placement:** TRACE, at `payment-wires`.

**Metadata:** Concept: conversion/forex; Keystone: open economy; Area: Open-Economy Floor; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the payment wires, in Open-Economy Floor.

**Stop reason - exact player copy:** A domestic pass must not hide a shared foreign quote error.

**Question card story setup - exact player copy:** Because the bank clock passes, trace the shop labels, bond quote, export invoice, and independent customs receipt. Determine which channels inherit the old 4.00 shortcut and which preserve 4.15.

**Question card story-science connection - exact player copy:** Shared conversion dependence can manufacture agreement across prices and assets.

**Question card prompt - exact player copy:** Open dependencies and submit conclusion.

**Complete format-specific interaction block:** `trace:{channels:[{id:"shops",label:"shop labels",dependency:"4.00 shortcut table",target_dependent:true},{id:"bond",label:"bond quote",dependency:"4.00 shortcut table",target_dependent:true},{id:"exports",label:"export invoice",dependency:"4.00 shortcut table",target_dependent:true},{id:"customs",label:"customs receipt",dependency:"direct 4.15 conversion",independent:true}],shared_upstream:"4.00 shortcut table",correct_conclusion:"three dependent channels are biased; customs supports 4.15",answerText:"Shop, bond, and export agreement is redundant because all use 4.00; the independent customs receipt supports 4.15."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Three channels share the 4.00 shortcut; independent customs supports 4.15.”

**Why:** Shared conversion dependence can manufacture agreement across prices and assets.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Shared conversion dependence can manufacture agreement across prices and assets.

**State/output:** Record the result and unlock the next named stop.

## Stop 48 - Operationally safe

**Format/placement:** ATTEST, asked by Eli Voss beside `custody-desk`.

**Metadata:** Concept: certification; Keystone: evidence integrity; Area: Rate Room; Learning role: COMBINE; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Eli Voss, at the custody desk in Note Hall.

**Stop reason - exact player copy:** Three systems must back the rehearsal certificate.

**Question card story setup - exact player copy:** The tray converts exactly, reserves arrive at the inclusive threshold, and independent customs rejects the shortcut table. Verify those three claims and reject the uncorrected shop-label claim in the Rate Book.

**Question card story-science connection - exact player copy:** Operational safety requires arithmetic, timing, and independent market evidence.

**Question card prompt - exact player copy:** Spend three marks and submit certification.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"tray",label:"tray converts to 10,000 RATE",signed:true,backed:true,critical:true},{id:"reserve",label:"1,000 RATE reserve arrives at minute 6",signed:true,backed:true,critical:true},{id:"customs",label:"customs uses 4.15",signed:true,backed:true,critical:false},{id:"shop_labels",label:"uncorrected shop labels are safe",signed:true,backed:false,critical:true}],correct_verified:["tray","reserve","customs"],critical_unbacked:"shop_labels",answerText:"Verify the tray, reserve, and customs claims; reject the critical shop-label claim because its 4.00 source remains uncorrected."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Approve 4.15 after replacing every 4.00 shortcut.”

**Why:** Operational safety requires arithmetic, timing, and independent market evidence.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Operational safety requires arithmetic, timing, and independent market evidence.

**State/output:** Page 12.

## Mission outcome

Mission decision: Use the 4.15 exchange rate. Exact tray math, reserve timing, and customs data agree. The full test now works. Yet new state debt is pushing real rates up.

### Post-mission metric screen - exact player copy

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 18:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The full rehearsal passes but consumes reserve capacity.

**Automatic bar change:** READINESS +8; RESERVE −3

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/98/83/91; bank 0.

**Lock result:** READINESS locks at 100. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 13 - Crowded Out Twice

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 3 DAYS

**Card title:** Crowded Out Twice

**Go now:** Go to RATE and meet Rhea Dane at the loanable-funds board.

**Card body:** The conversion rehearsal passed, but the temporary bridge is being financed through new government borrowing. In loanable funds, national saving supplies funds and borrowers demand them at a real interest rate. You will trace borrowing through investment, capital flows, and net exports. By the end of the mission, decide whether to keep the full bridge plan.

**Objective:** Measure domestic and foreign crowding out.

### Worth knowing first - exact player copy

#### Glossary terms

Budget deficit: government spending above tax revenue.

Crowding out: government borrowing raises real interest and reduces private investment.

#### Primer concepts

LF uses real i, money market nominal i; fiscal expansion can appreciate currency and reduce NX.

#### Equations first needed today
retrieve Fisher and `GDP=C+I+G+NX`.

## Main story happening - designer summary

RATE→BANKS→TRADE. Loanable-funds shift sends player to private loan denials, then export orders.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Rate Room | `policy-wall` | automatic**

**World state:** Arrival | RATE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Measure domestic and foreign crowding out.` Rhea Dane points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Measure domestic and foreign crowding out.

**Dialogue bubbles -** Rhea Dane: "Start with real-rate market. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `policy-wall` in Rate Room.

**Beat 2 - After Stop 49 | `money-market-console` | automatic**

**World state:** Keep this labeled result visible; Rhea Dane says, , and Stop 50 unlocks.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Rhea Dane: "Borrowing raises real i 0.6 point and reduces I 6 billion."

**Unlocks/waypoint:** Unlock Stop 50 at `money-market-console` in Bank Supervision.

**Beat 3 - After Stop 50 | `payment-wires` | automatic**

**World state:** Copy the result to the Rate Book; Activate TRADE, then.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Rhea Dane: "Deficit → loanable-funds demand right → real interest rises → private investment falls → capital accumulation slows → long-run growth slows."

**Unlocks/waypoint:** Unlock Stop 51 at `payment-wires` in Open-Economy Floor.

**Beat 4 - After Stop 51 | `signing-desk` | automatic**

**World state:** Preserve this result on the TRADE decision fixture; The character asks for the promised mission decision, and Stop 52 unlocks.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Rhea Dane: "Fiscal expansion → real interest rises → capital inflow → demand for RATE right → appreciation → net exports fall → aggregate-demand offset."

**Unlocks/waypoint:** Unlock Stop 52 at `signing-desk` in RATE.

**Beat 5 - At mission end | `policy-wall` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "Keep the narrower bridge with training and port repair; reject the full debt plan."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** RATE → BANKS → TRADE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

RATE→BANKS→TRADE. Loanable-funds shift sends player to private loan denials, then export orders.

## Key concepts, explained here

**Objective:** Measure domestic and foreign crowding out. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 49 - Real-rate market

**Format/placement:** CONTROL, at `policy-wall`.

**Metadata:** Concept: loanable funds; Keystone: interest markets; Area: Bank Supervision; Learning role: INTRODUCE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the policy wall, in Rate Room.

**Stop reason - exact player copy:** Isolate government borrowing from money supply.

**Question card story setup - exact player copy:** Hold national saving and central-bank money fixed, then add 8.7 billion of government borrowing to loan demand. Measure the real rate and private investment, then restore baseline for the board.

**Question card story-science connection - exact player copy:** A rightward loan-demand shift raises real interest and crowds out private investment.

**Question card prompt - exact player copy:** Change borrowing 0→8.7b; keep saving and Ms fixed; measure real i 1.5→2.1% and I 120→114b; restore and remeasure; submit conclusion. `noise:.05,response:.6,candidates:[borrowing,saving,Ms]`.

**Complete format-specific interaction block:** `control:{candidates:[{id:"government_borrowing",change:"0 to 8.7 billion"},{id:"national_saving",change:"hold or reduce"},{id:"money_supply",change:"hold or increase"}],selected:"government_borrowing",baseline:{borrowing:0,real_rate:1.5,private_investment:120},response:{borrowing:8.7,real_rate:2.1,private_investment:114},units:{borrowing:"billion",real_rate:"percent",private_investment:"billion"},noise_band:{real_rate:0.05},fixed:["national saving","central-bank money supply"],measure:"after the loanable-funds panel settles",restore:{borrowing:0,real_rate:1.5,private_investment:120,remeasure:true},correct:"government borrowing raises the real rate and crowds out investment"}`

**Correct result:** Adding 8.7 billion of borrowing raises the real rate by 0.6 percentage point and cuts private investment by 6 billion; restoration recovers the baseline.

**Answer text:** “Borrowing raises real i 0.6 point and reduces I 6 billion.”

**Why:** A rightward loan-demand shift raises real interest and crowds out private investment.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A rightward loan-demand shift raises real interest and crowds out private investment.

**State/output:** Record the result and unlock the next named stop.

## Stop 50 - Domestic chain

**Format/placement:** DERIVE, at `money-market-console`.

**Metadata:** Concept: crowding out; Keystone: fiscal/growth; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the money-market console, in Bank Supervision.

**Stop reason - exact player copy:** The investment loss must enter the growth warning.

**Question card story setup - exact player copy:** With private investment down 6 billion, build the domestic crowding-out chain from deficit to slower capital accumulation. Do not substitute nominal money-market rates for the measured real rate for the board.

**Question card story-science connection - exact player copy:** Less investment today slows the growth of productive capacity.

**Question card prompt - exact player copy:** Build chain `deficit→LF demand right→real i↑→private I↓→capital growth↓→LR growth↓`.

**Complete format-specific interaction block:** `derive:{candidate_lines:["Government deficit raises public borrowing","Loanable-funds demand shifts right","The real interest rate rises","Private investment falls","Capital accumulation slows","Long-run output growth slows"],licenses:["government budget identity","loanable-funds model","market equilibrium","interest-sensitive investment","capital formation","production capacity"],keyed_order:[1,2,3,4,5,6],decoys:["Money supply must fall","Higher real rates raise private investment"],submission:"ordered line-and-rule chain"}`

**Correct result:** A deficit raises loan demand and the real rate, crowds out private investment, slows capital growth, and reduces long-run growth.

**Answer text:** “Deficit → loanable-funds demand right → real interest rises → private investment falls → capital accumulation slows → long-run growth slows.”

**Why:** Less investment today slows the growth of productive capacity.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Less investment today slows the growth of productive capacity.

**State/output:** Record the result and unlock the next named stop.

## Stop 51 - Foreign chain

**Format/placement:** DERIVE, at `payment-wires`.

**Metadata:** Concept: fiscal/forex; Keystone: open economy; Area: Open-Economy Floor; Learning role: COMBINE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the payment wires, in Open-Economy Floor.

**Stop reason - exact player copy:** Export losses may be a second offset.

**Question card story setup - exact player copy:** Because Halvern's real rate rises, foreign capital enters, demand for RATE rises, and the currency appreciates. Complete the chain through net exports and AD clearly in the Rate Book for review.

**Question card story-science connection - exact player copy:** Fiscal expansion crowds out NX as well as private investment.

**Question card prompt - exact player copy:** Build `fiscal expansion→real i↑→capital inflow→RATE demand right→appreciation→NX↓→AD offset`.

**Complete format-specific interaction block:** `derive:{candidate_lines:["Fiscal expansion raises domestic demand","Government borrowing raises the real interest rate","Foreign capital flows into Halvern","Demand for RATE shifts right","RATE appreciates","Net exports fall","The fall in net exports offsets part of the rise in aggregate demand"],licenses:["fiscal transmission","loanable-funds model","international return comparison","foreign-exchange demand","currency equilibrium","net-exports response","AD components"],keyed_order:[1,2,3,4,5,6,7],decoys:["Capital leaves Halvern","Appreciation raises net exports"],submission:"ordered line-and-rule chain"}`

**Correct result:** Fiscal expansion raises real rates, draws in capital, appreciates RATE, lowers net exports, and offsets part of the aggregate-demand gain.

**Answer text:** “Fiscal expansion → real interest rises → capital inflow → demand for RATE right → appreciation → net exports fall → aggregate-demand offset.”

**Why:** Fiscal expansion crowds out NX as well as private investment.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Fiscal expansion crowds out NX as well as private investment.

**State/output:** Record the result and unlock the next named stop.

## Stop 52 - Keep full bridge

**Format/placement:** VALUE, asked by Rhea Dane beside `signing-desk`.

**Metadata:** Concept: fiscal redesign; Keystone: fiscal/forex/growth; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Rhea Dane, at the signing desk in Rate Room.

**Stop reason - exact player copy:** The bridge must protect households without funding low-value borrowing.

**Question card story setup - exact player copy:** Domestic investment and exports both fall under the full debt plan, while automatic stabilizers already absorb three billion of the shock. Fund a narrower bridge, training, and port repair within 100 points.

**Question card story-science connection - exact player copy:** Targeted temporary support reduces crowding out while preserving long-run growth.

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

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 18:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The narrower bridge protects exporters and restores confidence.

**Automatic bar change:** PRICES +4; TRUST +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/100/89/95; bank 0.

**Lock result:** PRICES remains vulnerable until M15. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 14 - First-Week Cover

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 2 DAYS

**Card title:** First-Week Cover

**Go now:** Go to TRADE and meet Nia Corren at the port wire.

**Card body:** The narrower bridge limits crowding out, and the campaign appears ready, but an overnight fuel disruption shifts short-run supply again. The legal ratio can remain sound even when an imported input raises prices and cuts output. You will stress the full model and precommit action thresholds. By the end of the mission, decide whether to delay conversion or add first-week cover.

**Objective:** Protect launch without confusing a supply shock with a broken currency.

### Worth knowing first - exact player copy

#### Glossary terms

Policy lag: delay between action and full economic effect.

Trigger: a precommitted threshold that activates action.

#### Primer concepts

SRAS shocks change PL and Y; a sound conversion ratio does not prevent real shocks; rules should state objective, direction, and limit.

#### Equations first needed today
retrieve AD-AS, multiplier, Fisher, and forex chains.

## Main story happening - designer summary

TRADE→PRICES→RATE. Port evidence identifies shock; index wall quantifies pass-through; RATE writes trigger. Apparent victory becomes Twist 3.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Open-Economy Floor | `trade-ledger` | automatic**

**World state:** Arrival | TRADE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Protect launch without confusing a supply shock with a broken currency.` Nia Corren points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Protect launch without confusing a supply shock with a broken currency.

**Dialogue bubbles -** Nia Corren: "Start with shock identity. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `trade-ledger` in Open-Economy Floor.

**Beat 2 - After Stop 53 | `price-history-board` | automatic**

**World state:** Keep this labeled result visible; Nia Corren says, , and Stop 54 unlocks.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Nia Corren: "The fuel disruption shifts SRAS left; 4.15 and payments remain sound."

**Unlocks/waypoint:** Unlock Stop 54 at `price-history-board` in Statistics Floor.

**Beat 3 - After Stop 54 | `forecast-table` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `TRADE → PRICES → RATE` only if the route requires travel, then.

**Panel/HUD text:** TRADE → PRICES → RATE

**Dialogue bubbles -** Nia Corren: "The direct basket effect is 2.4%; restoration returns baseline."

**Unlocks/waypoint:** Unlock Stop 55 at `forecast-table` in Rate Room.

**Beat 4 - After Stop 55 | `threshold-rail` | automatic**

**World state:** Preserve this result on the RATE decision fixture; The character asks for the promised mission decision, and Stop 56 unlocks.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Nia Corren: "Proceed at 4.15 with temporary first-week cover."

**Unlocks/waypoint:** Unlock Stop 56 at `threshold-rail` in Rate Room.

**Beat 5 - At mission end | `trade-ledger` | automatic**

**World state:** Mission outcome and hook |   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Corren: "Proceed with cover; buy bonds only at the joint output/payment trigger and stop at the CPI limit."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** TRADE → PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

TRADE→PRICES→RATE. Port evidence identifies shock; index wall quantifies pass-through; RATE writes trigger. Apparent victory becomes Twist 3.

## Key concepts, explained here

**Objective:** Protect launch without confusing a supply shock with a broken currency. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 53 - Shock identity

**Format/placement:** DIAGNOSIS, at `trade-ledger`.

**Metadata:** Concept: supply shock; Keystone: AD-AS; Area: Rate Room; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the trade ledger, in Open-Economy Floor.

**Stop reason - exact player copy:** Delay is justified only if the currency caused the failure.

**Question card story setup - exact player copy:** Fuel imports fall 12%, input prices rise, real output falls, the legal 4.15 ratio clears, and payment failures stay at zero. Select the diagnosis fitting every reading for the board.

**Question card story-science connection - exact player copy:** A real supply shock can hurt output without invalidating the currency conversion.

**Question card prompt - exact player copy:** Select one diagnosis—real supply shock, bad conversion ratio, aggregate-demand boom, or money run—and submit the conclusion.

**Complete format-specific interaction block:** `answer:SRAS_left_real_shock; alternatives:[bad_ratio,AD_boom,money_run]`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The fuel disruption shifts SRAS left; 4.15 and payments remain sound.”

**Why:** A real supply shock can hurt output without invalidating the currency conversion.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A real supply shock can hurt output without invalidating the currency conversion.

**State/output:** Record the result and unlock the next named stop.

## Stop 54 - Pass-through test

**Format/placement:** VERIFY, at `price-history-board`.

**Metadata:** Concept: CPI/supply; Keystone: inflation; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the price-history board, in Statistics Floor.

**Stop reason - exact player copy:** First-week cover needs a measured price corridor.

**Question card story setup - exact player copy:** The basket gives fuel a 20% weight, and fuel prices are predicted to rise 12% while all other basket prices stay fixed. Predict the direct CPI effect before revealing the new basket.

**Question card story-science connection - exact player copy:** A bounded relative-price shock should not be mistaken for unlimited inflation.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use `direct CPI effect=price change×basket weight` with 12% and 20% and submit the effect in percentage points. **OPERATE:** Reveal the new basket. **MEASURE:** Record its CPI change. **INTERPRET:** Submit whether the result is a bounded relative-price shock.

**Complete format-specific interaction block:** `verify:{prediction:{equation:"direct CPI effect=fuel weight×fuel price change",inputs:{weight:0.20,price_change:12,unit:"percent"},correct:2.4,tolerance:0.05,submit_unit:"percentage points"},lock:"basket reveal stays locked until 2.4 points is committed",action:"reveal first-week basket with other prices fixed",measurement:{CPI_change:2.4,unit:"percentage points"},restore:{fuel_price_change:0,CPI_change:0,remeasure:true},correct_conclusion:"bounded relative-price shock"}`

**Correct result:** The direct CPI effect is 2.4 percentage points; returning fuel to baseline returns the direct effect to zero.

**Answer text:** “The direct basket effect is 2.4%; restoration returns baseline.”

**Why:** A bounded relative-price shock should not be mistaken for unlimited inflation.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A bounded relative-price shock should not be mistaken for unlimited inflation.

**State/output:** Record the result and unlock the next named stop.

## Stop 55 - Full model stress

**Format/placement:** STRESS, asked by Nia Corren beside `forecast-table`.

**Metadata:** Concept: integrated policy; Keystone: all keystones; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Nia Corren, at the forecast table in Rate Room.

**Stop reason - exact player copy:** The plan must survive fuel shocks from 8% to 16%.

**Question card story setup - exact player copy:** Because the direct price effect is bounded, stress delay, unconditional easing, and conversion-plus-cover across fuel shocks of 8%, 12%, and 16%. Submit the plan that preserves payments and limits the output loss.

**Question card story-science connection - exact player copy:** Robust policy preserves the sound ratio while treating the separate real shock.

**Question card prompt - exact player copy:** Inspect three settings and submit one plan.

**Complete format-specific interaction block:** `range:8..16 step4; candidates:[delay,unconditional_ease,conversion_cover]; correct:conversion_cover`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Proceed at 4.15 with temporary first-week cover.”

**Why:** Robust policy preserves the sound ratio while treating the separate real shock.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Robust policy preserves the sound ratio while treating the separate real shock.

**State/output:** Record the result and unlock the next named stop.

## Stop 56 - Write thresholds first

**Format/placement:** TRIGGER, at `threshold-rail`.

**Metadata:** Concept: conditional policy; Keystone: policy lag; Area: Rate Room; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the threshold rail, in Rate Room.

**Stop reason - exact player copy:** The board must commit rules before launch data arrive.

**Question card story setup - exact player copy:** The robust plan proceeds, but emergency bond buying must not activate from one noisy price print. Write output and payment thresholds before the sealed first-week update appears in the Rate Book.

**Question card story-science connection - exact player copy:** Precommitment makes intervention reversible and evidence-based.

**Question card prompt - exact player copy:** Enter all three numeric thresholds, submit the rule, then reveal the sealed update; expected response is a trigger plan.

**Complete format-specific interaction block:** `rule:"Buy bonds only if real-output nowcast ≤680b AND payment failures ≥2%; stop if CPI companion ≥6.5%"; scale:{min:0,max:10,anchors:[680,2,6.5]}; objective:"protect output/payments"; direction:"buy bonds"; consequence_limit:"CPI 6.5"`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Proceed with cover; buy bonds only at the joint output/payment trigger and stop at the CPI limit.”

**Why:** Precommitment makes intervention reversible and evidence-based.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Precommitment makes intervention reversible and evidence-based.

**State/output:** Page 14; READINESS locks.

## Mission outcome

Mission decision: Do not delay conversion. add temporary first-week cover. The fuel shock is real. But the 4.15 ratio and payments remain sound. The board posts joint action.

### Post-mission metric screen - exact player copy

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 19:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** First-week cover preserves launch, while the new shock tests confidence.

**Automatic bar change:** READINESS +12 capped; TRUST −5

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/100/95/95; bank 0.

**Lock result:** READINESS remains locked. If any bar is 0%, restore the mission-start snapshot.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 15 - Sign With Conditions

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** CHANGEOVER TOMORROW

**Card title:** Sign with Conditions

**Go now:** Go to COUNTER and meet Eli Voss at the live queue board.

**Card body:** First-week cover protects the sound conversion, and every major clue now has an economic cause. The final rate must balance real borrowing costs, the output gap, bank reserves, price limits, and foreign effects. You will carry one live case through all four floors and apply the precommitted rule. By the end of the mission, choose and sign Halvern's policy rate and conditions.

**Objective:** Make the final integrated, reversible macroeconomic decision.

### Worth knowing first - exact player copy

#### Glossary terms

No new terms.

#### Primer concepts

Retrieve every Rate Book page; distinguish nominal from real rates and short from long run; require all four bars and thresholds.

#### Equations first needed today
No new equation; retrieve GDP, CPI, unemployment, multipliers, reserves, Fisher, MV=PY, BOP, and conversion relationships.

## Main story happening - designer summary

COUNTER→BANKS→RATE. S1 reads household case, S2 certifies reserves and rates, S3 applies all causal chains, S4 signs. Major characters contribute one constraint by radio; Mara alone asks the final decision.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Exchange Counter | `live-economy-panel` | automatic**

**World state:** Arrival | RATE | automatic after accepting the briefing World state and dialogue: The destination fixture displays `Make the final integrated, reversible macroeconomic decision.` Mara Venn points to the first unresolved reading and asks the player to establish the first defensible result.

**Panel/HUD text:** Make the final integrated, reversible macroeconomic decision.

**Dialogue bubbles -** Eli Voss: "Start with live economy panel. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `live-economy-panel` in Exchange Counter.

**Beat 2 - After Stop 57 | `reserve-clock` | automatic**

**World state:** Keep this labeled result visible; Mara Venn says, , and Stop 58 unlocks.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Eli Voss: "The gap is −38 billion; payment failures 0.5% do not meet the 2% trigger."

**Unlocks/waypoint:** Unlock Stop 58 at `reserve-clock` in Bank Supervision.

**Beat 3 - After Stop 58 | `threshold-rail` | automatic**

**World state:** Copy the result to the Rate Book; Activate the next named room in `RATE → BANKS → COUNTER` only if the route requires travel, then.

**Panel/HUD text:** RATE → BANKS → COUNTER

**Dialogue bubbles -** Eli Voss: "At 3.25%, the real rate is 1.00% and banks retain 2 billion excess reserves."

**Unlocks/waypoint:** Unlock Stop 59 at `threshold-rail` in Rate Room.

**Beat 4 - After Stop 59 | `conversion-desk` | automatic**

**World state:** Preserve this result on the COUNTER decision fixture; The character asks for the promised mission decision, and Stop 60 unlocks.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Eli Voss: "The real rate links investment, AD, capital flows, currency, NX, and growth; CPI and payment limits independently govern reversal."

**Unlocks/waypoint:** Unlock Stop 60 at `conversion-desk` in COUNTER.

**Beat 5 - At mission end | `live-economy-panel` | automatic**

**World state:** Mission outcome and hook | COUNTER | automatic   Stop the timer and keep the next unresolved consequence visible.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "The rate is not a promise that nothing will change. It is a promise that we know when we will."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**Route:** RATE → BANKS → COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

COUNTER→BANKS→RATE. S1 reads household case, S2 certifies reserves and rates, S3 applies all causal chains, S4 signs. Major characters contribute one constraint by radio; Mara alone asks the final decision.

## Key concepts, explained here

**Objective:** Make the final integrated, reversible macroeconomic decision. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


## Stop 57 - Live economy panel

**Format/placement:** BALANCE, at `live-economy-panel`.

**Metadata:** Concept: national snapshot; Keystone: GDP/inflation/labor; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Go to the live economy panel, in Exchange Counter.

**Stop reason - exact player copy:** The final policy must begin from one internally consistent snapshot.

**Question card story setup - exact player copy:** Launch data show real GDP 682 billion, Yf 720, unemployment 8.2%, companion inflation 3.0%, payment failures 0.5%, and fuel costs easing. Count the readings relevant to the signed stance.

**Question card story-science connection - exact player copy:** Output is weak, but the payment trigger has not fired and inflation is below its stop limit.

**Question card prompt - exact player copy:** Select all six readings, calculate gap `682−720`, and submit conclusion.

**Complete format-specific interaction block:** `balance:{streams:[{id:"actual_output",value:682,unit:"billion RATE",counts:true},{id:"full_employment_output",value:720,unit:"billion RATE",counts:true},{id:"unemployment",value:8.2,unit:"percent",counts:true},{id:"CPI_inflation",value:3.0,unit:"percent",counts:true},{id:"payment_failures",value:0.5,unit:"percent",counts:true},{id:"fuel_easing",value:1,unit:"status flag",counts:false,reason:"context, not an output-gap stream"}],correct:{gap:-38,trigger:"no joint inflation-payment trigger"},answerText:"The economy has a 38-billion recessionary gap, but the joint trigger is not met; fuel easing is context rather than a counted ledger stream."}`

**Correct result:** −38b; no trigger.

**Answer text:** “The gap is −38 billion; payment failures 0.5% do not meet the 2% trigger.”

**Why:** Output is weak, but the payment trigger has not fired and inflation is below its stop limit.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.

**State/output:** Record the result and unlock the next named stop.

## Stop 58 - Rate pair

**Format/placement:** DERIVE, at `reserve-clock`.

**Metadata:** Concept: Fisher and reserves; Keystone: rates/money; Area: Bank Supervision; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the reserve clock, in Bank Supervision.

**Stop reason - exact player copy:** The nominal rate must deliver a tolerable real rate while banks clear.

**Question card story setup - exact player copy:** Expected inflation is 2.25%, the proposed nominal rate is 3.25%, deposits are 120 billion, reserves are 14 billion, and rr is 10%. Derive real rate and excess reserves.

**Question card story-science connection - exact player copy:** A workable stance needs both borrowing conditions and bank capacity.

**Question card prompt - exact player copy:** Submit `(real rate %, excess reserves billion)`. `r=3.25−2.25=1.00%; required=12; excess=2`.

**Complete format-specific interaction block:** `derive:{"goal":"real rate and excess reserves","givens":["nominal rate=3.25%","expected inflation=2.25%","deposits=120 billion","reserve ratio=10%","actual reserves=14 billion"],"lines":[{"id":"L1","expression":"real rate=3.25%-2.25%=1.00%","license":"state governing relationship"},{"id":"L2","expression":"required reserves=120×0.10=12 billion","license":"substitute displayed values"},{"id":"L3","expression":"excess reserves=14-12=2 billion","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["real rate=5.50%","excess reserves=12 billion"],"correct_result":"(1.00%,2 billion)","answerText":"The real rate is 1.00% and banks hold 2 billion in excess reserves."}`

**Correct result:** (1.00%,2b).

**Answer text:** “At 3.25%, the real rate is 1.00% and banks retain 2 billion excess reserves.”

**Why:** A workable stance needs both borrowing conditions and bank capacity.

**Wrong-path feedback:** A different response does not fit the displayed evidence. A workable stance needs both borrowing conditions and bank capacity.

**State/output:** Record the result and unlock the next named stop.

## Stop 59 - Consequence audit

**Format/placement:** TRACE, at `threshold-rail`.

**Metadata:** Concept: linked policy consequences; Keystone: AD/forex/growth; Area: Statistics Floor; Learning role: COMBINE; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Go to the threshold rail, in Rate Room.

**Stop reason - exact player copy:** Every final claim must expose its dependencies.

**Question card story setup - exact player copy:** Because 3.25% yields a 1.00% real rate with positive reserves, trace its effects through investment, AD, capital flows, exchange value, NX, and growth. Separate independent price and payment safeguards.

**Question card story-science connection - exact player copy:** The final rate is credible only if domestic and foreign consequences remain visible.

**Question card prompt - exact player copy:** Open every dependency and submit the complete consequence map.

**Complete format-specific interaction block:** `trace:{channels:[{id:"investment",label:"private investment",dependency:"real interest rate",target_dependent:true},{id:"aggregate_demand",label:"aggregate demand",dependency:"real interest rate",target_dependent:true},{id:"capital",label:"capital formation",dependency:"real interest rate",target_dependent:true},{id:"forex",label:"capital inflow and RATE demand",dependency:"real interest rate",target_dependent:true},{id:"net_exports",label:"net exports",dependency:"exchange-rate branch",target_dependent:true},{id:"growth",label:"long-run growth",dependency:"capital branch",target_dependent:true},{id:"CPI",label:"CPI check",dependency:"price survey",independent:true},{id:"payments",label:"payment failures",dependency:"payment network",independent:true}],shared_upstream:"real interest rate",correct_conclusion:"moderate stance with independent CPI and payment safeguards",answerText:"Six policy channels share the real-rate source; independent CPI and payment channels keep the final stance conditional."}`

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “The real rate links investment, AD, capital flows, currency, NX, and growth; CPI and payment limits independently govern reversal.”

**Why:** The final rate is credible only if domestic and foreign consequences remain visible.

**Wrong-path feedback:** A different response does not fit the displayed evidence. The final rate is credible only if domestic and foreign consequences remain visible.

**State/output:** Record the result and unlock the next named stop.

## Stop 60 - Sign

**Format/placement:** TRIGGER, at `conversion-desk`.

**Metadata:** Concept: final policy; Keystone: all keystones; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Call - exact player copy:** Go to the conversion desk, in Exchange Counter.

**Stop reason - exact player copy:** Mara needs one numeric rate, conversion, and reversible rule.

**Question card story setup - exact player copy:** The live gap argues against tightening, reserves remain positive, conversion passes, and neither joint action trigger nor inflation stop has fired. Enter the final numbers and sign only if every bar is complete.

**Question card story-science connection - exact player copy:** Conditions turn one rate choice into a testable policy rather than a guess.

**Question card prompt - exact player copy:** Submit number pair `(4.15 crowns/RATE, 3.25%)`, then the three numeric conditions, then select SIGN; the panel blocks SIGN unless all four bars equal 100.

**Complete format-specific interaction block:** `rule:"conversion 4.15; policy rate 3.25%; buy bonds if Y≤680 AND failures≥2%; stop if companion CPI≥6.5%"; anchors:[4.15,3.25,680,2,6.5]; objective:"stable conversion with full employment and price guard"; direction:"conditional expansion"; consequence_limit:"CPI"`.

**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Signed: 4.15 conversion, 3.25% policy rate, with joint output/payment action trigger and CPI stop.”

**Why:** Conditions turn one rate choice into a testable policy rather than a guess.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Conditions turn one rate choice into a testable policy rather than a guess.

**State/output:** Page 15; all locks; no more quizzes.

## Mission outcome

Mission decision: Sign a 3.25% policy rate. And the 4.15 conversion with the posted conditions. The real rate is 1.00%, reserves stay positive. And neither emergency trigger has fired. Shops replace the last shortcut labels.

### Post-mission metric screen - exact player copy

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 20:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Every independent threshold passes and the signed conditions are published.

**Automatic bar change:** Validated remaining bars top to 100

**Recovery Point line template:** RECOVERY POINTS = clamp(4,12,11 + {time_modifier} − {incorrect_submissions}) = {awarded}

**Allocation prompt:** Spend now: 1 point raises one unlocked bar by 1%. Or save points in the Recovery Bank (30 maximum).

**Canonical QA after automatic change, before current RP:** READINESS / PRICES / RESERVE / TRUST = 100/100/100/100; bank ≥1.

**Lock result:** All four lock; victory. If any bar is 0%, restore the mission-start snapshot.

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

**Stops 1-4 — CHOICE, DERIVE, DIAGNOSIS, ATTEST:** Mission 1 progression from evidence to decision.

**Stops 5-8 — PROTOCOL, DERIVE, DERIVE, BALANCE:** Mission 2 progression from evidence to decision.

**Stops 9-12 — DERIVE, DERIVE, STRESS, VALUE:** Mission 3 progression from evidence to decision.

**Stops 13-16 — DERIVE, CHOICE, DERIVE, DIAGNOSIS:** Mission 4 progression from evidence to decision.

**Stops 17-20 — DERIVE, DERIVE, DERIVE, VALUE:** Mission 5 progression from evidence to decision.

**Stops 21-24 — CHOICE, DIAGNOSIS, BALANCE, STRESS:** Mission 6 progression from evidence to decision.

**Stops 25-28 — DERIVE, TRACE, DERIVE, DIAGNOSIS:** Mission 7 progression from evidence to decision.

**Stops 29-32 — VERIFY, DERIVE, SEQUENCE, STRESS:** Mission 8 progression from evidence to decision.

**Stops 33-36 — BALANCE, DERIVE, CONTROL, CHOICE:** Mission 9 progression from evidence to decision.

**Stops 37-40 — CHOICE, DERIVE, HOLDOUT, STRESS:** Mission 10 progression from evidence to decision.

**Stops 41-44 — SEQUENCE, DERIVE, ALLOCATE, VALUE:** Mission 11 progression from evidence to decision.

**Stops 45-48 — DERIVE, VERIFY, TRACE, ATTEST:** Mission 12 progression from evidence to decision.

**Stops 49-52 — CONTROL, DERIVE, DERIVE, VALUE:** Mission 13 progression from evidence to decision.

**Stops 53-56 — DIAGNOSIS, VERIFY, STRESS, TRIGGER:** Mission 14 progression from evidence to decision.

**Stops 57-60 — DIAGNOSIS, DERIVE, TRACE, TRIGGER:** Mission 15 progression from evidence to decision.

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
- **VERIFY:** three authored—Stops 29, 46, and 54. Each requires numerical commitment before equipment unlock, then explicit operation, measurement, interpretation, units, and restoration status.
- **CONTROL:** two authored—Stops 35 and 49. Each names the changed control, fixed variables, baseline and response measurements, mandatory restoration/remeasurement, and submitted numerical conclusion.
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
