**FIRST PERSON LEARNING**

**Editorial revision:** Character profiles, evidence-driven scenes and biography checks; 2026-09-09. All prior copy and opening-quote fixes retained.

**Player-copy editing rule:** Raise a blocking `REPETITION_FLAG` for unresolved duplicated meaning within a displayed passage, including paraphrases, repeated formulas/definitions and concatenated setup/source copy. Review candidate matches semantically and document any separate-surface exception. Apply REP-001–REP-005 in Giant Gate v2.8.  Within each displayed passage, state each fact, equation, variable definition, and instruction once. Integrate new givens into the existing wording; do not append a paraphrase of the setup. A source panel may repeat essential inputs so it stands alone, but render it as its own surface rather than concatenating it with the question setup. Go Deeper questions must still supply their own context and data without referring to earlier cases.

**CHANGEOVER**

AP Macroeconomics Campaign Implementation Bible

**15 missions | 60 graded stops | Halvern | Implementation-ready**

**REVISION - HANDBACK 1: SCENES, PERSISTENT WORLD, AND WALKABLE ENDINGS**

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

You are the changeover analyst, which means you check the rules that turn old crowns into new money. At Kesteven House, you will use macroeconomics to make the call. The new currency starts in fifteen days. Families need wages that buy food; shops and banks need payments that clear. Board Chair Mara Venn hands you the empty Rate Book and says, “When we open those counters, people will hand us their life savings.”

**Opening-card requirement:** The character quote is the final player-visible text on this card; place no explanatory sentence after it. Keep it brief and natural: it should add the speaker’s concern or commitment rather than summarize the preceding setup. Show the whole opening together with one Continue action.


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


### Landmark-only spaces and visible scene objects

These spaces are walkable and ungraded. They never add a required tour, question, or travel cost. Their access follows existing mission access; final routes open only after the completion gate below. Each object remains inspectable after its trigger.

| Space ID | Place | Before | Visible change |
|---|---|---|---|
| `street-balcony` | Street Balcony | Shop windows carry hurried price stickers. | After Stop 12, price notices show both measures; after Stop 60, the shops display new-currency prices with the official conversion. |
| `clerks-break-room` | Clerks’ Break Room | Tea goes cold beside a chalked shift rota. | After Stop 44, temporary cover fills the gaps; after Stop 60, the opening team returns its night-shift mugs. |
| `cash-loading-bay` | Cash Loading Bay | Empty cages wait for sealed old-note bundles. | After Stop 28, old notes fill tagged cages; after Stop 60, the cages move out as new notes reach the trays. |

### Persistent prop and scene contract

The exchange shutters are scene components of `conversion-desk`. Street price signs and note-cage movement follow its final opening event.

Each mission below declares one Physical aftermath with a home in the existing fixture table. Its dated prop occupies its own place on that fixture; later pages never erase earlier evidence. All scene actions fire once from the accepted stop, persist through revisits, and restore from the mission-start snapshot on failure. Replaying a completed stop never repeats an action or grants resources. Labels always include text, not color alone. New observations remain hidden until the relevant measurement; accepted-answer labels appear only after acceptance. No prop change substitutes for the existing grading, timing, or evidence checks.

Keep the conversion orientation and units exactly as taught in Stop 48; never imply that the policy interest rate is the conversion ratio. Post 3.25% POLICY RATE beside 4.15 CONVERSION and copy the signed Stop 60 conditions to the policy wall. Mission 14 first-week cover and Mission 15 first-week cases are forecasts or rehearsals before opening, not evidence from a week that has already happened. Queue changes are crowd staging, not national economic measurements: one rope lane at M1, two at M4, an assisted-service lane at M11, and an orderly moving queue at M15.

## 4. Character bible

### Profile and scene delivery contract

The compact material below is a designer reference. The individual Character ID entries are the authoritative full profiles; reference rows and headings are not additional people. Render only the explicitly labeled bio fields in the optional roster. Wants, blind spots and future arc descriptions are designer-only. Keep the existing names, role aliases and division assignments; the explicit profiles add ownership and scene bindings without changing any person-stop owner.

Each character has an entrance/evidence encounter, a required evidence-triggered turn and a later demonstrated change, embedded at the relevant mission stops below. These scenes are part of the story route, not prerequisites added by the roster. Opening handovers and established entrances play once. When an existing beat already supplies the same action or sentence at that trigger, render that action or sentence once and use this exact reaction as its character component; retain all distinct travel, science and outcome content. Sequence multiple scenes by their order in the chapter. Do not concatenate setup/source panels or duplicate the accepted answer in dialogue.

All physical actions use the existing fixture and its records. A radio speaker can direct the player’s visible record handling; no new carried item, prop, fixture, resource or measurement is implied. Preserve original lock and release conditions, including partial clearance and no-go endings. The roster can be skipped in full with no effect on progress. The three greeting variants are state-selected optional conversations, not an automatic speech queue.

### Compact designer reference

**Mara Venn - Board Chair and mission authority**

**Wants:** A credible on-time conversion. **Blind spot:** Equates decisiveness with a high rate. **Gameplay use:** Forces policy commitments and asks, “What would make us reverse?” **Arc:** Learns that a defensible rule includes conditions for changing course.

**Eli Voss - NOTES counter operations lead**

**Division:** `NOTES`.

**Wants:** Keep families moving. **Blind spot:** Treats every queue as a cash shortage. **Gameplay use:** Scarcity, labor definitions, conversion operations. **Arc:** Learns to separate visible congestion from national monetary evidence.

**Idris Pell - PRICES national accounts chief**

**Division:** `PRICES`.

**Wants:** Publish defensible output data. **Blind spot:** Trusts aggregates before composition. **Gameplay use:** GDP, output gaps, growth, and ledger closure. **Arc:** Moves from exact totals to transparent scope and dependency.

**Lina Saye - price statistics lead**

**Wants:** Protect the basket's integrity. **Blind spot:** Defends fixed weights too long. **Gameplay use:** CPI, inflation, basket bias, and holdout evidence. **Arc:** Preserves history while publishing a representative companion measure.

**Tomas Arendt - BANKS bank supervision lead**

**Division:** `BANKS`.

**Wants:** Prevent a bank run. **Blind spot:** Focuses on maximum lending rather than willing lending. **Gameplay use:** Money aggregates, bank creation, reserves, bonds, and rates. **Arc:** Learns that capacity, timing, and behavior are separate constraints.

**Nia Corren - TRADE open-economy analyst**

**Division:** `TRADE`.

**Wants:** Keep payments and trade clearing. **Blind spot:** Initially treats appreciation as strength alone. **Gameplay use:** Balance of payments, forex, and net exports. **Arc:** Makes the financing benefit and export cost visible together.

**Rhea Dane - finance minister**

**Wants:** Show control before launch. **Blind spot:** Underweights lags and crowding out. **Gameplay use:** Fiscal multipliers, stabilizers, policy allocation. **Arc:** Replaces an announcement-first plan with a smaller conditional bridge.

**Soren Vale - OPENEC export council liaison**

**Division:** `OPENEC`.

**Wants:** Protect orders and jobs. **Blind spot:** Treats depreciation as costless. **Gameplay use:** Supplies exporter consequences and tests one-sided currency claims. **Arc:** Accepts a stable conversion with targeted first-week cover.

### Relationship evidence map

| People | Planted commitment | Evidence-driven turn | Later changed practice |
|---|---|---|---|
| Lina Saye / Idris Pell | `changeover-lina-entrance`: “I need a way to repair representation without making our old comparisons disappear.” | Stop 12, `changeover-lina-turn` | Stop 54, `changeover-lina-payoff` |
| Rhea Dane / Eli Voss | `changeover-rhea-entrance`: “Tell me when the promised support can actually reach the people at your counters.” | Stop 44, `changeover-rhea-turn` | Stop 52, `changeover-rhea-payoff` |
| Nia Corren / Soren Vale | `changeover-nia-entrance`: “Bring me the orders behind the exchange-rate argument so I can show the board both consequences.” | Stop 36, `changeover-nia-turn` | Stop 55, `changeover-nia-payoff` |

### Mara Venn

- **Character ID:** `person-mara-venn`
- **Display name:** Mara Venn
- **Role:** Board Chair
- **Pronouns:** she/her
- **Allowed short name:** Mara
- **Area ownership:** Exchange Counter; Rate Room. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Hands the player the empty Rate Book at arrival. The existing opening card supplies this entrance; the mission encounter below continues it without replaying the handover. Binding: `changeover-mara-entrance`, On arrival at Exchange Counter during Mission 1, when Stop 4 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `wage-notice-rail`.
- **Wants and personal stake:** Her public promise is an orderly conversion on the announced date; revising a policy can look like losing control.
- **Blind spot:** A forceful interest-rate move can feel more credible than a conditional rule.
- **Scientific domain:** policy commitments and reversal thresholds.
- **Decision function:** Supplies the policy commitments and reversal thresholds constraint to the existing decisions at Stops 40 and 60; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What would make us reverse?”
- **Relationship pressure:** The player relies on Mara for policy commitments and reversal thresholds; their shared working assumption is challenged in `changeover-mara-turn`.
- **Arc, with source evidence:** After Stop 40 (Tighten forever), `changeover-mara-turn` makes the accepted evidence personally consequential. After Stop 60 (Sign), `changeover-mara-payoff` shows the resulting change in practice: Signs the accepted conversion rule with its reversal conditions intact.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of policy commitments and reversal thresholds, the commitment above, and the witnessed correction in `changeover-mara-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** Her public promise is an orderly conversion on the announced date; revising a policy can look like losing control. A forceful interest-rate move can feel more credible than a conditional rule.

**Bio reflection question - exact player copy:** Why might Mara favor a forceful policy announcement?

**Bio reveal answer - exact player copy:** She is accountable for an orderly launch and may mistake visible decisiveness for a policy that fits the evidence.

**Bio feedback - exact player copy:** Public confidence matters, but the chosen action still needs a defensible causal basis.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Mara after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 60 accepted | “Publish the conditions too; changing course under that rule is part of keeping our promise.” |
| 20 | Stop 40 accepted; Stop 60 not accepted | “I wanted one firm answer; that does not make one rate right for every condition.” |
| 10 | Introduced; Stop 40 not accepted; fallback | “What would make us reverse?” |

### Eli Voss

- **Character ID:** `person-eli-voss`
- **Display name:** Eli Voss
- **Role:** counter operations lead
- **Pronouns:** he/him
- **Allowed short name:** Eli
- **Area ownership:** Exchange Counter; Bank Supervision; Note Hall. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Moves between the queue board and the counter allocation slate, checking where work is stalled. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-eli-entrance`, On arrival at Exchange Counter during Mission 1, when Stop 1 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `queue-board`.
- **Wants and personal stake:** He faces the families waiting at the counters and has to explain delays in person.
- **Blind spot:** A visible queue looks like evidence that the country needs more cash.
- **Scientific domain:** queues, staffing and conversion custody.
- **Decision function:** Supplies the queues, staffing and conversion custody constraint to the existing decisions at Stops 28 and 48; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “Which part of the queue is waiting on us?”
- **Relationship pressure:** The player relies on Eli for queues, staffing and conversion custody; their shared working assumption is challenged in `changeover-eli-turn`.
- **Arc, with source evidence:** After Stop 28 (Migration or contraction), `changeover-eli-turn` makes the accepted evidence personally consequential. After Stop 48 (Operationally safe), `changeover-eli-payoff` shows the resulting change in practice: Keeps the accepted custody and timing checks with the operating roster.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of queues, staffing and conversion custody, the commitment above, and the witnessed correction in `changeover-eli-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** He faces the families waiting at the counters and has to explain delays in person. A visible queue looks like evidence that the country needs more cash.

**Bio reflection question - exact player copy:** Why does Eli’s view of the queue differ from a national money-supply measure?

**Bio reveal answer - exact player copy:** He sees a local service delay directly; its cause need not be a nationwide shortage of money.

**Bio feedback - exact player copy:** A local bottleneck needs its own diagnosis before it becomes a national claim.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Eli after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 48 accepted | “I can open a counter on this evidence, with the cash and staff due at the right time.” |
| 20 | Stop 28 accepted; Stop 48 not accepted | “The line outside is real; it does not tell us what happened to the whole money supply.” |
| 10 | Introduced; Stop 28 not accepted; fallback | “Which part of the queue is waiting on us?” |

### Idris Pell

- **Character ID:** `person-idris-pell`
- **Display name:** Idris Pell
- **Role:** national accounts chief
- **Pronouns:** he/him
- **Allowed short name:** Idris
- **Area ownership:** Statistics Floor; Exchange Counter. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Separates the eligible output entries from transfers before totaling the ledger. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-idris-entrance`, On arrival at Statistics Floor during Mission 2, when Stop 5 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `output-ledger`.
- **Wants and personal stake:** His office must publish a total that other policy teams will treat as the state of the economy.
- **Blind spot:** An exactly balanced aggregate can conceal a misleading interpretation of its parts.
- **Scientific domain:** output composition and real growth.
- **Decision function:** Supplies the output composition and real growth constraint to the existing decisions at Stops 8 and 57; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What is inside that total?”
- **Relationship pressure:** The player relies on Idris for output composition and real growth; their shared working assumption is challenged in `changeover-idris-turn`.
- **Arc, with source evidence:** After Stop 8 (Publish the output line), `changeover-idris-turn` makes the accepted evidence personally consequential. After Stop 57 (Live economy panel), `changeover-idris-payoff` shows the resulting change in practice: Checks that the live-economy panel uses the accepted definitions and real measures.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of output composition and real growth, the commitment above, and the witnessed correction in `changeover-idris-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** His office must publish a total that other policy teams will treat as the state of the economy. An exactly balanced aggregate can conceal a misleading interpretation of its parts.

**Bio reflection question - exact player copy:** Why is a correct total not enough for Idris’s job?

**Bio reveal answer - exact player copy:** Policy teams need to know what the total includes and whether its change represents output or prices.

**Bio feedback - exact player copy:** The interpretation must distinguish composition and prices from real production.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Idris after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 57 accepted | “Use the same scope here as in the ledger; a new headline does not change what we counted.” |
| 20 | Stop 8 accepted; Stop 57 not accepted | “The arithmetic closes; the growth claim still has to survive the price correction.” |
| 10 | Introduced; Stop 8 not accepted; fallback | “What is inside that total?” |

### Lina Saye

- **Character ID:** `person-lina-saye`
- **Display name:** Lina Saye
- **Role:** price statistics lead
- **Pronouns:** she/her
- **Allowed short name:** Lina
- **Area ownership:** Statistics Floor. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Places the fixed basket beside the household purchase evidence. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-lina-entrance`, On arrival at Statistics Floor during Mission 3, when Stop 9 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `basket-table`.
- **Wants and personal stake:** She has protected a continuous price history that wage negotiators rely on; revising the basket risks breaking that comparison.
- **Blind spot:** Preserving fixed weights can overshadow households whose purchases no longer resemble the basket.
- **Scientific domain:** price baskets, inflation and representative evidence.
- **Decision function:** Supplies the price baskets, inflation and representative evidence constraint to the existing decisions at Stops 12 and 54; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “Whose basket is this?”
- **Relationship pressure:** Idris Pell: She has protected a continuous price history that wage negotiators rely on; revising the basket risks breaking that comparison.
- **Arc, with source evidence:** After Stop 12 (Keep history and repair representation), `changeover-lina-turn` makes the accepted evidence personally consequential. After Stop 54 (Pass-through test), `changeover-lina-payoff` shows the resulting change in practice: Attaches the independently tested pass-through result to the price record.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player and Idris Pell; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of price baskets, inflation and representative evidence, the commitment above, and the witnessed correction in `changeover-lina-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** She has protected a continuous price history that wage negotiators rely on; revising the basket risks breaking that comparison. Preserving fixed weights can overshadow households whose purchases no longer resemble the basket.

**Bio reflection question - exact player copy:** Why does Lina resist simply replacing the old price series?

**Bio reveal answer - exact player copy:** People rely on its consistent history; she needs to improve representation without silently changing past comparisons.

**Bio feedback - exact player copy:** Preserving comparison and improving representation are both legitimate goals.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Lina after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 54 accepted | “This estimate has faced new prices; the old series alone could not answer that question.” |
| 20 | Stop 12 accepted; Stop 54 not accepted | “I will not rewrite the past, but I will not ask these families to disappear from the present.” |
| 10 | Introduced; Stop 12 not accepted; fallback | “Whose basket is this?” |

### Tomas Arendt

- **Character ID:** `person-tomas-arendt`
- **Display name:** Tomas Arendt
- **Role:** bank supervision lead
- **Pronouns:** he/him
- **Allowed short name:** Tomas
- **Area ownership:** Note Hall; Bank Supervision. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Checks the bank balance sheets against the money-market console. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-tomas-entrance`, On arrival at Note Hall during Mission 7, when Stop 25 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `note-scale`.
- **Wants and personal stake:** Banks expect him to prevent a run, while the counters need usable funds at a particular hour.
- **Blind spot:** Maximum lending capacity can look like a promise that banks will lend immediately.
- **Scientific domain:** reserves, lending capacity and payment timing.
- **Decision function:** Supplies the reserves, lending capacity and payment timing constraint to the existing decisions at Stops 32 and 46; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “When can the funds be used?”
- **Relationship pressure:** The player relies on Tomas for reserves, lending capacity and payment timing; their shared working assumption is challenged in `changeover-tomas-turn`.
- **Arc, with source evidence:** After Stop 32 (Raise now), `changeover-tomas-turn` makes the accepted evidence personally consequential. After Stop 46 (Reserve clock), `changeover-tomas-payoff` shows the resulting change in practice: Keeps the measured reserve-arrival time beside the opening schedule.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of reserves, lending capacity and payment timing, the commitment above, and the witnessed correction in `changeover-tomas-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** Banks expect him to prevent a run, while the counters need usable funds at a particular hour. Maximum lending capacity can look like a promise that banks will lend immediately.

**Bio reflection question - exact player copy:** What distinction can Tomas miss when he focuses on maximum lending?

**Bio reveal answer - exact player copy:** The amount a bank could lend does not establish its willingness to lend or when funds will become usable.

**Bio feedback - exact player copy:** A ceiling is a possibility, not a timed transfer or a lending commitment.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Tomas after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 46 accepted | “These funds arrive in time for this operation; that is a claim we have actually tested.” |
| 20 | Stop 32 accepted; Stop 46 not accepted | “Room to lend is not a commitment to lend; we cannot book it as money already moving.” |
| 10 | Introduced; Stop 32 not accepted; fallback | “When can the funds be used?” |

### Nia Corren

- **Character ID:** `person-nia-corren`
- **Display name:** Nia Corren
- **Role:** open-economy analyst
- **Pronouns:** she/her
- **Allowed short name:** Nia
- **Area ownership:** Open-Economy Floor; Rate Room. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Checks foreign-payment entries against the shipment board. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-nia-entrance`, On arrival at Open-Economy Floor during Mission 9, when Stop 33 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `trade-ledger`.
- **Wants and personal stake:** She has presented incoming capital as a sign of confidence and must now explain what the same exchange-rate move costs exporters.
- **Blind spot:** Appreciation initially looks like strength without its trade consequences.
- **Scientific domain:** foreign exchange, capital flows and exports.
- **Decision function:** Supplies the foreign exchange, capital flows and exports constraint to the existing decisions at Stops 36 and 55; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “Who gains at this exchange rate?”
- **Relationship pressure:** Soren Vale: She has presented incoming capital as a sign of confidence and must now explain what the same exchange-rate move costs exporters.
- **Arc, with source evidence:** After Stop 36 (Good news), `changeover-nia-turn` makes the accepted evidence personally consequential. After Stop 55 (Full model stress), `changeover-nia-payoff` shows the resulting change in practice: Retains the stressed exchange-rate consequences in the final forecast.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player and Soren Vale; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of foreign exchange, capital flows and exports, the commitment above, and the witnessed correction in `changeover-nia-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** She has presented incoming capital as a sign of confidence and must now explain what the same exchange-rate move costs exporters. Appreciation initially looks like strength without its trade consequences.

**Bio reflection question - exact player copy:** Why should Nia compare capital inflows with exporter effects?

**Bio reveal answer - exact player copy:** The same currency movement can make financing easier while making domestic exports more expensive abroad.

**Bio feedback - exact player copy:** Include the financing benefit and the trade cost in the same explanation.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Nia after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 55 accepted | “The board gets both sides of the currency move before it chooses.” |
| 20 | Stop 36 accepted; Stop 55 not accepted | “The financing gain and the lost orders belong in the same report.” |
| 10 | Introduced; Stop 36 not accepted; fallback | “Who gains at this exchange rate?” |

### Rhea Dane

- **Character ID:** `person-rhea-dane`
- **Display name:** Rhea Dane
- **Role:** finance minister
- **Pronouns:** she/her
- **Allowed short name:** Rhea
- **Area ownership:** Statistics Floor; Exchange Counter; Rate Room. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Places the proposed support package beside the multiplier calculation. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-rhea-entrance`, On arrival at Statistics Floor during Mission 5, when Stop 17 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `calculating-desk`.
- **Wants and personal stake:** She has backed a support package that people expect to see quickly; shrinking it carries a visible political cost.
- **Blind spot:** The announcement is immediate while implementation lags and displaced investment are less visible.
- **Scientific domain:** fiscal support, policy lags and crowding out.
- **Decision function:** Supplies the fiscal support, policy lags and crowding out constraint to the existing decisions at Stops 44 and 52; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “When does the help arrive?”
- **Relationship pressure:** Eli Voss: She has backed a support package that people expect to see quickly; shrinking it carries a visible political cost.
- **Arc, with source evidence:** After Stop 44 (Wait or bridge), `changeover-rhea-turn` makes the accepted evidence personally consequential. After Stop 52 (Keep full bridge), `changeover-rhea-payoff` shows the resulting change in practice: Amends the proposed bridge to the accepted smaller conditional package.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player and Eli Voss; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of fiscal support, policy lags and crowding out, the commitment above, and the witnessed correction in `changeover-rhea-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** She has backed a support package that people expect to see quickly; shrinking it carries a visible political cost. The announcement is immediate while implementation lags and displaced investment are less visible.

**Bio reflection question - exact player copy:** Why might Rhea underweight policy lags?

**Bio reveal answer - exact player copy:** A public announcement shows action immediately, but the economic help and its costs arrive on different schedules.

**Bio feedback - exact player copy:** Follow the funds to their recipient rather than stopping at the announcement.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Rhea after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 52 accepted | “I will explain the smaller package myself, including why keeping the larger promise would cost more.” |
| 20 | Stop 44 accepted; Stop 52 not accepted | “An announcement does not pay a wage before the funds reach it.” |
| 10 | Introduced; Stop 44 not accepted; fallback | “When does the help arrive?” |

### Soren Vale

- **Character ID:** `person-soren-vale`
- **Display name:** Soren Vale
- **Role:** export council liaison
- **Pronouns:** he/him
- **Allowed short name:** Soren
- **Area ownership:** Open-Economy Floor; Rate Room. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Places the current shipment orders beside the foreign-payment record. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `changeover-soren-entrance`, On arrival at Open-Economy Floor during Mission 9, when Stop 33 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `trade-ledger`.
- **Wants and personal stake:** He represents firms trying to keep orders and jobs through the conversion and wants the board to hear their losses.
- **Blind spot:** A cheaper currency can look costless when only export sales are considered.
- **Scientific domain:** export orders and imported-input costs.
- **Decision function:** Supplies the export orders and imported-input costs constraint to the existing decisions at Stops 35 and 59; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What happens to the next order?”
- **Relationship pressure:** The player relies on Soren for export orders and imported-input costs; their shared working assumption is challenged in `changeover-soren-turn`.
- **Arc, with source evidence:** After Stop 35 (Exporter effect), `changeover-soren-turn` makes the accepted evidence personally consequential. After Stop 59 (Consequence audit), `changeover-soren-payoff` shows the resulting change in practice: Retains the exporter consequences beside the final threshold audit.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of export orders and imported-input costs, the commitment above, and the witnessed correction in `changeover-soren-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** He represents firms trying to keep orders and jobs through the conversion and wants the board to hear their losses. A cheaper currency can look costless when only export sales are considered.

**Bio reflection question - exact player copy:** Why can Soren not treat depreciation as an unqualified benefit?

**Bio reveal answer - exact player copy:** Exporters may gain sales while paying more for imported inputs; both affect the jobs he is trying to protect.

**Bio feedback - exact player copy:** The export selling price and the imported-input bill can move against each other.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Soren after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 59 accepted | “Keep the first-week cover tied to the costs we can show.” |
| 20 | Stop 35 accepted; Stop 59 not accepted | “A cheaper selling price abroad does not make our imported supplies cheaper.” |
| 10 | Introduced; Stop 35 not accepted; fallback | “What happens to the next order?” |


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


## 7.1 Persistent world-state ledger

| Mission | Accepted trigger | Home fixture | State that persists | Next visible problem |
|---|---|---|---|---|
| 1 | `accepted_stop_4` | `queue-board` | Eli Voss clips the dated national figures beside the queue tally. | At `output-ledger`, a stock-sale slip sits in the same tray as factory orders. |
| 2 | `accepted_stop_8` | `output-ledger` | Idris Pell stamps the corrected output sheet REAL OUTPUT: 685.2 BILLION. | At `price-history-board`, an old basket sits beside a family's crossed-out shopping list. |
| 3 | `accepted_stop_12` | `price-history-board` | Lina Saye pins the companion price measure beside the unchanged historical series. | At `wage-notice-rail`, a job notice curls over an empty search card. |
| 4 | `accepted_stop_16` | `wage-notice-rail` | Eli Voss clips the participation warning to the wage rail. | At `policy-wall`, an unsigned spending order sits under a press deadline. |
| 5 | `accepted_stop_20` | `policy-wall` | Rhea Dane pins the 8.7-BILLION PURCHASE OPTION to the policy wall. | At `ad-as-wall`, two red pins pull the wall's price and output tracks apart. |
| 6 | `accepted_stop_24` | `ad-as-wall` | Rhea Dane pins the separate demand and supply responses to the model wall. | At `conversion-trays`, old-crown bundles fill a tray beside deposit receipts. |
| 7 | `accepted_stop_28` | `conversion-trays` | Eli Voss seals the counted old-note bundle with its deposit receipt. | At `bond-panel`, a loan quote waits beside the expected-price sheet. |
| 8 | `accepted_stop_32` | `bond-panel` | Tomas Arendt clips the HOLD RATE decision beneath the bond-price rail. | At `payment-wires`, a payment lamp lights while an export order is crossed out. |
| 9 | `accepted_stop_36` | `payment-wires` | Nia Corren pins the paired financing and export-cost entries beside the payment wires. | At `price-history-board`, the long money-growth strip lies beneath today's fuel alert. |
| 10 | `accepted_stop_40` | `price-history-board` | Lina Saye pins the 2% LONG-RUN INFLATION estimate beside the shock record. | At `threshold-rail`, a wage contract's six-week date extends past changeover day. |
| 11 | `accepted_stop_44` | `threshold-rail` | Rhea Dane clips the temporary bridge and expiry rule onto the threshold rail. | At `reserve-clock`, the reserve hands approach the payment mark from different sides. |
| 12 | `accepted_stop_48` | `reserve-clock` | Tomas Arendt pins the verified 4.15 timing strip beneath the reserve clock. | At `policy-wall`, loan refusals and lost export orders share the spending folder. |
| 13 | `accepted_stop_52` | `policy-wall` | Rhea Dane replaces the full bridge order with the smaller temporary plan. | At `threshold-rail`, a fuel bulletin lands beside a completed conversion test. |
| 14 | `accepted_stop_56` | `threshold-rail` | Mara Venn pins the first-week cover card beside the emergency triggers. | At `conversion-desk`, new notes wait under a cloth behind the closed counter. |
| 15 | `accepted_stop_60` | `conversion-desk` | Mara Venn turns the counter-opening key. | At `conversion-desk`, the signed operating conditions remain beside the final status. |

## 8. Mission content contract

Every mission below supplies a briefing promise, compact glossary, primer, equations, designer summary, implementable beat script, route, character beat, concepts, four globally numbered stops, outcome, metric settlement, and review. A mission outcome begins with “Mission decision:” and directly answers sentence four of its briefing. Later missions retrieve earlier tools rather than repeat isolated definitions.

### Revision 10.2 presentation and validation cleanup

Glossary entries use compact `Term: definition` lines. Equation entries contain equation, purpose, symbols, and campaign reason without “Also called” or “Concept” lines. PROBE, CHOICE, VERIFY, CONTROL, DEGENERACY, and all numerical formats must pass the action-clarity and payload audit in Section 12 before handoff. This campaign intentionally uses no PROBE or DEGENERACY stops; it does not relabel another interaction to evade those requirements.



## 8.1 Final playable scene and ending card

**Completion gate:** accepted_stop_60 AND every existing final scientific/evidence requirement AND the existing final metric target. Acceptance arms the scene; if metric allocation is still required, play it once that allocation passes. A wrong answer, missing proof, or failed check never starts the success animation.

**One visible change:** The exchange-counter shutters rise for the first public conversion.

**The next sixty seconds:** 0–15 seconds: the shutters rise and sealed old-note cages roll toward the loading bay. 15–40 seconds: the player walks to the existing conversion desk as Eli uncovers the new-note trays. 40–60 seconds: the first exchange uses the verified 4.15 orientation from Stop 48; the street signs change in view.

**Ending card - exact player copy:** The first customer slides old crowns across the counter. Eli counts out the new notes. Outside, the shop boards turn to the new currency. The signed rate and its review rules stay on the wall as the next person steps forward.

**Delivery:** Keep player control and normal world view. No new graded stop follows the final accepted decision. The ending card appears after the player reaches the payoff view, or through an accessible View ending control that skips movement without skipping any scientific gate. Optional review and worked examples remain available through the completed mission menu.


### Standalone Go Deeper question contract

Each optional review question must work when copied out on its own. Supply its setting, givens, units, definitions, and any required figure within that question. Do not mention a mission title, a prior case, a teammate rechecking earlier work, a completed plan, or unseen cards, observations, or results. Do not assume that another review question was read. Choices, hints, and feedback obey the same rule. Use brief conceptual questions or complete applied problems; figures must match the question rather than merely share its course.

# Mission 1 - What Counts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 1 - 15 DAYS UNTIL CHANGEOVER.

**Card title:** What Counts

**Go now:** Go to COUNTER and meet Eli Voss, counter operations lead, at the queue board.

**Card body:** 15 days until changeover. A queue bends past a shop window with fresh price stickers. Today you decide what the line at the counter really proves.

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

**Trigger:** mission_1_arrival.

**World state:** A queue bends past a shop window with fresh price stickers.

**Panel/HUD text:** Separate useful economic measures from alarming but incomplete signals.

**Dialogue bubbles -** Eli Voss: "Start with signal or statistic. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 1 at `queue-board` in Exchange Counter.

**Beat 2 - After Stop 1 | `allocation-slate` | automatic**

**Trigger:** accepted_stop_1.

**World state:** At `queue-board`, the dated accepted-result slip for Stop 1 reads: "C. “Count the nationwide transactions, date them, and state coverage.”". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. Count the nationwide transactions, date them, and state coverage."

**Unlocks/waypoint:** Unlock Stop 2 at `allocation-slate` in COUNTER.

**Beat 3 - After Stop 2 | `queue-board` | automatic**

**Trigger:** accepted_stop_2.

**World state:** At `allocation-slate`, the dated accepted-result slip for Stop 2 reads: "40 calls total, or 1 call per extra exchange. tolerance:0.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** COUNTER

**Dialogue bubbles -** Eli Voss: "Good thinking. Forty extra exchanges cost forty bank calls: one call per exchange."

**Unlocks/waypoint:** Unlock Stop 3 at `queue-board` in COUNTER.

**Beat 4 - After Stop 3 | `wage-notice-rail` | automatic**

**Trigger:** accepted_stop_3.

**World state:** At `queue-board`, the dated accepted-result slip for Stop 3 reads: "Supply shifted left.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Eli Voss: "That check holds. The street diagnosis is ready, but the first official record still contains an unsupported shortage claim."

**Unlocks/waypoint:** Unlock Stop 4 at `wage-notice-rail` in COUNTER.

**Beat 5 - At mission end | `queue-board` | automatic**

**Trigger:** accepted_stop_4.

**World state:** At `queue-board`, Eli Voss clips the dated national figures beside the queue tally. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "I can count the line. I cannot call it the whole country. But Idris finds trades that do not belong in the output total; the headline must wait for his ledger."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m01

**Home:** `queue-board`. **Before:** The dated mission-1 evidence holder at this fixture has no accepted record. A queue bends past a shop window with fresh price stickers.
**After — exact action:** Eli Voss clips the dated national figures beside the queue tally.
**Trigger:** accepted_stop_4. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `output-ledger`, a stock-sale slip sits in the same tray as factory orders.
**Segue - exact player copy:** But Idris finds trades that do not belong in the output total; the headline must wait for his ledger.

## Location plan

**Route:** COUNTER. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Eli is rationing counter windows while Lina's first price marks appear outside. Stop 1 separates symptoms from measures; Stop 2 exposes the staff tradeoff; Stop 3 reconstructs a market shift; Stop 4 selects the dated evidence. The one-location route is COUNTER; the window makes the queue visible. Eli wants more cashiers and assumes the line proves a cash shortage. Scarcity governs the staffing tradeoff, opportunity cost records the bank-call capacity given up, and supply-demand reasoning distinguishes a price rise caused by demand from one caused by reduced supply.

**Beat script:** Arrival - nearby bubble, timer paused: Eli: “I can open exchange windows or answer bank calls, not both. Tell me what this line proves.” After S2, the allocation slate records the bank calls given up. After S3, `×4.00` stickers remain visible outside. Final bubble: “The line is real. Its cause is not settled.” Unlock Rate Book page 1.

## Key concepts, explained here

**Objective:** Separate useful economic measures from alarming but incomplete signals. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


### Character scene: changeover-eli-entrance

**Trigger:** On arrival at Exchange Counter during Mission 1, when Stop 1 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `queue-board` in Exchange Counter. Eli Voss, counter operations lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Moves between the queue board and the counter allocation slate, checking where work is stalled.
**Exact dialogue:**
- Eli Voss, counter operations lead: “I have to explain this delay to the next family at the counter; tell me which part of it we can fix.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-eli-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

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

**Fixture source panel - exact player copy:** With the evidence standard set, Eli can move four clerks from bank calls to exchange windows. Build the opportunity-cost statement before changing the roster, so the board records both added service and the lost alternative. Baseline output is 120 exchanges and 80 bank calls per hour; after transfer it is 160 and 40.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

### Character scene: changeover-mara-entrance

**Trigger:** On arrival at Exchange Counter during Mission 1, when Stop 4 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `wage-notice-rail` in Exchange Counter. Mara Venn, Board Chair, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the material from the opening handover available beside the current evidence.
**Exact dialogue:**
- Mara Venn, Board Chair: “I gave the public a date; help me keep it without promising a policy we cannot defend.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-mara-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 4 - Page one standard

**Format/placement:** ATTEST, asked by Eli Voss beside `wage-notice-rail`.

**Metadata:** Concept: 32 - measurement/claims; Keystone: Evidence integrity; Area: Rate Room; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Eli Voss, at the wage-notice rail in Exchange Counter.

**Stop reason - exact player copy:** The street diagnosis is ready, but the first official record still contains an unsupported shortage claim.

**Question card story setup - exact player copy:** The plaza is busy, but a national claim requires a national record. Check what the dated transactions and staffing records actually establish.

**Question card prompt - exact player copy:** National conclusions need dated coverage; observations of a queue cannot establish a nationwide cash shortage. Read the displayed source excerpts, then select every supported claim and leave unsupported claims unsigned.

**Complete format-specific interaction block - canonical source:**

```json
{
  "attest": {
    "claims": [
      {
        "id": "national_tx",
        "label": "The transaction record supports national coverage",
        "evidence": "The dated nationwide transaction ledger identifies its reporting coverage and counted transactions."
      },
      {
        "id": "staff_tradeoff",
        "label": "Staffing involves a documented tradeoff",
        "evidence": "The staffing record shows that moving workers to one service removes them from the other."
      },
      {
        "id": "price_quantity",
        "label": "Prices and quantities are paired evidence",
        "evidence": "The same-period sales record contains both posted price and traded quantity."
      },
      {
        "id": "cash_shortage",
        "label": "The plaza crowd proves a national cash shortage",
        "evidence": "The crowd observation has no nationwide cash-supply or cash-demand measurement."
      }
    ],
    "selection_rule": "Support must be present in the displayed source excerpt and within its scope; a signature or repeated copy alone is insufficient.",
    "correct_signed": [
      "national_tx",
      "staff_tradeoff",
      "price_quantity"
    ],
    "checks": 3
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** Sign national_tx, staff_tradeoff, price_quantity; leave the other claims unsigned.

**Answer text:** Each signature is limited to what its source establishes. The unsupported claims lack the specific date, physical condition, independence or scope they assert.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 1 signed.

## Mission outcome

Mission decision: Use the national count, not the loudest queue. Real output is 700 billion RATE. Prices rose 2.5%. The board now needs the production gap.

**Segue - exact player copy:** But Idris finds trades that do not belong in the output total; the headline must wait for his ledger.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Eli Voss clips the dated national figures beside the queue tally. But Idris finds trades that do not belong in the output total; the headline must wait for his ledger.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Production possibilities curve (PPC):** a graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- A bowed PPC shows rising opportunity cost; a straight PPC shows constant cost.
- A point inside a PPC means resources are underused; better resources, technology, or productivity shift it outward.

### Review question 1

**Prompt - exact player copy:** A country can move five clerks from bank calls to exchange windows. Exchanges rise from 100 to 150 per hour while bank calls fall from 90 to 40. What is the opportunity cost of each additional exchange?

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

**Prompt - exact player copy:** A market reports a price increase and a quantity decrease, unchanged household income, and delayed deliveries. Which change best explains the pattern?

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

**Prompt - exact player copy:** A currency-exchange counter is processing fewer customers today. Which evidence would best support a claim that the slowdown affects the country nationally?

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

**Prompt - exact player copy:** A country is producing at a point inside its production possibilities curve for exchange service and bank support. What is the best interpretation?

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

**Prompt - exact player copy:** A country installs software that lets the same clerks process more exchanges and more bank calls per hour. How should the production possibilities curve change?

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

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 2 - Growth On Paper

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 2 - 14 DAYS UNTIL CHANGEOVER.

**Card title:** Growth on Paper

**Go now:** Go to PRICES and meet Idris Pell, national accounts chief, at the output ledger.

**Card body:** 14 days until changeover. A stock-sale slip sits in the same tray as factory orders. Today you decide how much output grew after prices are removed.

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

**Trigger:** mission_2_arrival.

**World state:** A stock-sale slip sits in the same tray as factory orders.

**Panel/HUD text:** Build GDP correctly and separate nominal growth from real growth.

**Dialogue bubbles -** Idris Pell: "Start with classify the ledger. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `output-ledger` in PRICES.

**Beat 2 - After Stop 5 | `calculating-desk` | automatic**

**Trigger:** accepted_stop_5.

**World state:** At `output-ledger`, the dated accepted-result slip for Stop 5 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Idris Pell: "Nice work. Only purchases of current final output enter GDP; transfers and asset trades do not."

**Unlocks/waypoint:** Unlock Stop 6 at `calculating-desk` in PRICES.

**Beat 3 - After Stop 6 | `price-history-board` | automatic**

**Trigger:** accepted_stop_6.

**World state:** At `calculating-desk`, the dated accepted-result slip for Stop 6 reads: "740 billion crowns, ±0.5.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** PRICES

**Dialogue bubbles -** Idris Pell: "Good thinking. Nominal GDP is 740 billion crowns."

**Unlocks/waypoint:** Unlock Stop 7 at `price-history-board` in PRICES.

**Beat 4 - After Stop 7 | `output-ledger` | automatic**

**Trigger:** accepted_stop_7.

**World state:** At `price-history-board`, the dated accepted-result slip for Stop 7 reads: "685.2, ±0.2.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 7 RECORDED - STOP 8 OPEN

**Dialogue bubbles -** Idris Pell: "Exactly right. Real GDP is about 685.2 billion base-year crowns."

**Unlocks/waypoint:** Unlock Stop 8 at `output-ledger` in PRICES.

**Beat 5 - At mission end | `output-ledger` | automatic**

**Trigger:** accepted_stop_8.

**World state:** At `output-ledger`, Idris Pell stamps the corrected output sheet REAL OUTPUT: 685.2 BILLION. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Idris Pell: "The sum was right. Some of the rows were wrong. But Lina's basket costs more at the street stalls; families need to know which price measure fits their lives."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m02

**Home:** `output-ledger`. **Before:** The dated mission-2 evidence holder at this fixture has no accepted record. A stock-sale slip sits in the same tray as factory orders.
**After — exact action:** Idris Pell stamps the corrected output sheet REAL OUTPUT: 685.2 BILLION.
**Trigger:** accepted_stop_8. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `price-history-board`, an old basket sits beside a family's crossed-out shopping list.
**Segue - exact player copy:** But Lina's basket costs more at the street stalls; families need to know which price measure fits their lives.

## Location plan

**Route:** PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

Idris has a nominal ledger that includes transfers and securities. The one-location PRICES route uses S1 classification, S2 identity, S3 deflator, and S4 reconciliation. Arrival: Idris, national accounts chief: “The total is exact. The contents may not be.” After S2 the invalid rows turn gray with text labels. Final panel stamps REAL. GDP measures production; the expenditure identity sorts demand components; real GDP answers whether output changed.

## Key concepts, explained here

**Objective:** Build GDP correctly and separate nominal growth from real growth. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


### Character scene: changeover-idris-entrance

**Trigger:** On arrival at Statistics Floor during Mission 2, when Stop 5 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `output-ledger` in Statistics Floor. Idris Pell, national accounts chief, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Separates the eligible output entries from transfers before totaling the ledger.
**Exact dialogue:**
- Idris Pell, national accounts chief: “Other teams will use our total to choose policy; I need them to understand what went into it.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-idris-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

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

**Fixture source panel - exact player copy:** With excluded rows removed, the ledger shows C = 480, I = 120, G = 160, exports = 90, and imports = 110 billion crowns. Build the identity and close the total in the Rate Book.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** Because nominal GDP is 740 billion crowns, the headline looks strong; the deflator is 108.0. Rearrange the recorded deflator relationship and calculate real GDP before the board calls the rise economic growth.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

### Character scene: changeover-idris-turn

**Trigger:** After Stop 8 is accepted.
**Location and presence:** `output-ledger` in Statistics Floor. Idris Pell, national accounts chief, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the real-output line beside the nominal sales figure.
**Exact dialogue:**
- Idris Pell, national accounts chief: “The arithmetic closes; the growth claim still has to survive the price correction.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-idris-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Publish real GDP of 685.2 billion base-year crowns with the nominal total shown only as context. Prices caused much of the apparent growth. The board corrects the headline. The next question is whether the street price jump is broad or built into the basket.

**Segue - exact player copy:** But Lina's basket costs more at the street stalls; families need to know which price measure fits their lives.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Idris Pell stamps the corrected output sheet REAL OUTPUT: 685.2 BILLION. But Lina's basket costs more at the street stalls; families need to know which price measure fits their lives.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains gross domestic product (GDP)?

**Options - exact player copy:**

- A. Household spending on goods and services.
- B. Business capital, inventory change, and new housing, not stock purchases.
- C. Exports minus imports.
- D. The market value of final goods and services produced inside a country during a stated period.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for gross domestic product (gdp). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes consumption. It does not answer the question about gross domestic product (gdp).
- B: This describes investment. It does not answer the question about gross domestic product (gdp).
- C: This describes net exports (NX). It does not answer the question about gross domestic product (gdp).
- D: Correct. The market value of final goods and services produced inside a country during a stated period.

### Review question 2


**Prompt - exact player copy:** Which statement best explains consumption?

**Options - exact player copy:**

- A. Household spending on goods and services.
- B. The market value of final goods and services produced inside a country during a stated period.
- C. Business capital, inventory change, and new housing, not stock purchases.
- D. Exports minus imports.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for consumption. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Household spending on goods and services.
- B: This describes gross domestic product (GDP). It does not answer the question about consumption.
- C: This describes investment. It does not answer the question about consumption.
- D: This describes net exports (NX). It does not answer the question about consumption.

### Review question 3


**Prompt - exact player copy:** Which statement best explains investment?

**Options - exact player copy:**

- A. The market value of final goods and services produced inside a country during a stated period.
- B. Business capital, inventory change, and new housing, not stock purchases.
- C. Household spending on goods and services.
- D. Exports minus imports.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for investment. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes gross domestic product (GDP). It does not answer the question about investment.
- B: Correct. Business capital, inventory change, and new housing, not stock purchases.
- C: This describes consumption. It does not answer the question about investment.
- D: This describes net exports (NX). It does not answer the question about investment.

### Review question 4


**Prompt - exact player copy:** Exports are 90 billion and imports are 110 billion currency units. What are net exports?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Category",
  "yLabel": "Billions of currency units",
  "caption": "Trade during one year",
  "bars": [
    {
      "name": "Exports",
      "value": 90
    },
    {
      "name": "Imports",
      "value": 110
    }
  ]
}
```

**Options - exact player copy:**

- A. 200 billion.
- B. 20 billion.
- C. -20 billion currency units.
- D. 90 billion.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for net exports (nx). All needed information is in this question.

**Option feedback - exact player copy:**

- A: Net exports subtract imports from exports; they do not add them.
- B: Imports exceed exports, so the balance is negative.
- C: Correct. -20 billion currency units.
- D: This omits imports.

### Review question 5


**Prompt - exact player copy:** Why must transfers and purchases of existing financial assets be distinguished from newly produced goods and services when measuring gross domestic product?

**Options - exact player copy:**

- A. The market value of final goods and services produced inside a country during a stated period.
- B. Household spending on goods and services.
- C. Business capital, inventory change, and new housing, not stock purchases.
- D. Transfers and existing-asset trades are not themselves current production, so counting them as output would distort GDP.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for the components of gross domestic product. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes gross domestic product (GDP). It does not answer the question about the components of gross domestic product.
- B: This describes consumption. It does not answer the question about the components of gross domestic product.
- C: This describes investment. It does not answer the question about the components of gross domestic product.
- D: Correct. Transfers and existing-asset trades are not themselves current production, so counting them as output would distort GDP.

### Review question 6


**Prompt - exact player copy:** Which statement best explains the expenditure approach to gross domestic product?

**Options - exact player copy:**

- A. The component labels reveal which spending changed, not merely that “spending” changed.
- B. The market value of final goods and services produced inside a country during a stated period.
- C. Household spending on goods and services.
- D. Business capital, inventory change, and new housing, not stock purchases.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for the expenditure approach to gross domestic product. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The component labels reveal which spending changed, not merely that “spending” changed.
- B: This describes gross domestic product (GDP). It does not answer the question about the expenditure approach to gross domestic product.
- C: This describes consumption. It does not answer the question about the expenditure approach to gross domestic product.
- D: This describes investment. It does not answer the question about the expenditure approach to gross domestic product.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 3 - The Basket

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 3 - 13 DAYS UNTIL CHANGEOVER.

**Card title:** The Basket

**Go now:** Go to PRICES and meet Lina Saye, price statistics lead, at the basket table.

**Card body:** 13 days until changeover. An old basket sits beside a family's crossed-out shopping list. Today you decide how to report the old and new price baskets.

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

**Trigger:** mission_3_arrival.

**World state:** An old basket sits beside a family's crossed-out shopping list.

**Panel/HUD text:** Test whether the fixed basket represents current household costs.

**Dialogue bubbles -** Lina Saye: "Start with price the fixed basket. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `basket-table` in PRICES.

**Beat 2 - After Stop 9 | `price-history-board` | automatic**

**Trigger:** accepted_stop_9.

**World state:** At `basket-table`, the dated accepted-result slip for Stop 9 reads: "108 ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Lina Saye: "Nice work. The fixed basket CPI is 108."

**Unlocks/waypoint:** Unlock Stop 10 at `price-history-board` in PRICES.

**Beat 3 - After Stop 10 | `basket-table` | automatic**

**Trigger:** accepted_stop_10.

**World state:** At `price-history-board`, the dated accepted-result slip for Stop 10 reads: "5.88%, ±0.05.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** 108−100

**Dialogue bubbles -** Lina Saye: "Good thinking. The official basket reports 5.88% inflation."

**Unlocks/waypoint:** Unlock Stop 11 at `basket-table` in PRICES.

**Beat 4 - After Stop 11 | `basket-table` | automatic**

**Trigger:** accepted_stop_11.

**World state:** At `basket-table`, the dated accepted-result slip for Stop 11 reads: "Inflation stays positive but changes with the energy weight.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Lina Saye: "Exactly right. Inflation is positive, but 5.88% depends strongly on the stale energy weight."

**Unlocks/waypoint:** Unlock Stop 12 at `basket-table` in PRICES.

**Beat 5 - At mission end | `basket-table` | automatic**

**Trigger:** accepted_stop_12.

**World state:** At `price-history-board`, Lina Saye pins the companion price measure beside the unchanged historical series. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Lina Saye: "Keep the old line. Put the change where people can see it. But Eli's job sheets show people who have stopped looking for work; the price story cannot explain that away."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m03

**Home:** `price-history-board`. **Before:** The dated mission-3 evidence holder at this fixture has no accepted record. An old basket sits beside a family's crossed-out shopping list.
**After — exact action:** Lina Saye pins the companion price measure beside the unchanged historical series.
**Trigger:** accepted_stop_12. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `wage-notice-rail`, a job notice curls over an empty search card.
**Segue - exact player copy:** But Eli's job sheets show people who have stopped looking for work; the price story cannot explain that away.

## Location plan

**Route:** PRICES. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

One-location PRICES. Lina defends the old basket. S1 prices it, S2 derives inflation, S3 stress-tests weights, S4 chooses a published pair. Arrival: “If we change the basket whenever it hurts, it is no index. If we never change it, it may be nobody's basket.” The `×4.00` stickers become mapped to imported-energy-heavy vendors. CPI uses a fixed basket; substitution and quality change explain bias; index revision must be transparent rather than convenient.

## Key concepts, explained here

**Objective:** Test whether the fixed basket represents current household costs. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


### Character scene: changeover-lina-entrance

**Trigger:** On arrival at Statistics Floor during Mission 3, when Stop 9 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `basket-table` in Statistics Floor. Lina Saye, price statistics lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Places the fixed basket beside the household purchase evidence.
**Exact dialogue:**
- Lina Saye, price statistics lead: “I need a way to repair representation without making our old comparisons disappear.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-lina-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 9 - Price the fixed basket

**Format/placement:** DERIVE, at `basket-table`.

**Metadata:** Concept: 7 - CPI; Keystone: inflation; Area: Statistics Floor; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the basket table, in Statistics Floor.

**Stop reason - exact player copy:** Shops have applied new labels, prompting a check of the unchanged household basket.

**Question card story setup - exact player copy:** The base basket cost 200 crowns; the identical quantities now cost 216 crowns after shops apply conversion labels. Build the CPI calculation first, so any later criticism begins from the official method rather than suspicion.

**Question card story-science connection - exact player copy:** The consumer price index measures the price change for fixed quantities before the board debates representation.

**Fixture source panel - exact player copy:** The base basket cost 200 crowns; the identical quantities now cost 216 crowns after shops apply conversion labels. Build the CPI calculation first, so any later criticism begins from the official method rather than suspicion.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** With the new CPI fixed at 108 and last year's CPI at 102, calculate the percentage change the public bulletin will show. The board must know the exact headline before testing whether it represents households.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Question card story setup - exact player copy:** The published price index uses an old energy weight. Lina checks how the conclusion changes when the household share changes.

**Question card prompt - exact player copy:** Inspect the four supplied index recalculations from 15% to 30% energy weight. Select the conclusion true for every recalculation.

**Complete format-specific interaction block - canonical source:**

```json
{
  "stress": {
    "model": {
      "weight_percent": [
        15,
        20,
        25,
        30
      ],
      "inflation_percent": [
        3.1,
        3.7,
        4.4,
        5.88
      ],
      "criterion": "statement must fit all four supplied readings"
    },
    "candidates": [
      {
        "id": "fixed",
        "label": "Inflation is exactly 5.88% for every weight"
      },
      {
        "id": "range",
        "label": "Inflation stays positive, but its size depends on the weight"
      },
      {
        "id": "zero",
        "label": "Inflation is zero at current weights"
      }
    ],
    "correct": "range",
    "public_rule": "Use the displayed model and criterion over the entire stated range; no hidden preference scores."
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** All four rates are positive. The size varies from 3.1% to 5.88%, so the historical weight cannot be presented as representative of every household.

**Answer text:** All four rates are positive. The size varies from 3.1% to 5.88%, so the historical weight cannot be presented as representative of every household.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** revised basket unlocks.

## Stop 12 - Keep history and repair representation

**Format/placement:** VALUE, asked by Lina Saye beside `basket-table`.

**Metadata:** Concept: 7 - index publication; Keystone: Evidence/inflation; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Lina Saye, at the basket table in Statistics Floor.

**Stop reason - exact player copy:** The weighting test has exposed a representation problem without invalidating the historical calculation.

**Question card story setup - exact player copy:** The historical price index is reproducible, but its old energy weight may misrepresent current households. Lina needs a publication plan that preserves comparability and exposes that limitation.

**Decision evidence - exact player copy:** Required outcomes: retain the fixed historical index and publish a current-weight companion; verify and disclose the current weights.

**Question card prompt - exact player copy:** You have 60 evidence points. Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "value": {
    "budget": {
      "value": 60,
      "unit": "evidence points"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "retain the fixed historical index and publish a current-weight companion"
      },
      {
        "id": "r2",
        "text": "verify and disclose the current weights"
      }
    ],
    "selection_rule": "Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve.",
    "options": [
      {
        "id": "parallel",
        "label": "Parallel index publication",
        "cost": 45.0,
        "information": "Keeps the historical series and adds a separately labelled current-weight series.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "audit",
        "label": "Household-weight audit",
        "cost": 15.0,
        "information": "Checks the weights used in the new companion and publishes the method.",
        "covers": [
          "r2"
        ]
      },
      {
        "id": "ads",
        "label": "Publicity campaign",
        "cost": 30.0,
        "information": "Increases awareness without checking weights or preserving comparability.",
        "covers": []
      },
      {
        "id": "erase",
        "label": "Replace the historical series",
        "cost": 25.0,
        "information": "Substitutes new weights into history, losing the original comparable series.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "parallel",
        "audit"
      ]
    ],
    "example_total": 60.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** parallel, audit = 60 evidence points; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 3 signed; port-energy clue logged.

### Character scene: changeover-lina-turn

**Trigger:** After Stop 12 is accepted.
**Location and presence:** `basket-table` in Statistics Floor. Lina Saye, price statistics lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the historical index and the representative companion measure visibly distinct.
**Exact dialogue:**
- Lina Saye, price statistics lead: “I will not rewrite the past, but I will not ask these families to disappear from the present.”
- Idris Pell, national accounts chief (radio): “Keep both series named; I can carry that distinction into the output report.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-lina-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Preserve the historical fixed-basket price series and publish the representative companion measure with its changed weights disclosed. The price gap is concentrated in energy-heavy purchases; a street sticker is not the national price index.

**Segue - exact player copy:** But Eli's job sheets show people who have stopped looking for work; the price story cannot explain that away.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Lina Saye pins the companion price measure beside the unchanged historical series. But Eli's job sheets show people who have stopped looking for work; the price story cannot explain that away.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains consumer price index (CPI)?

**Options - exact player copy:**

- A. The percent change in a price index.
- B. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- C. CPI overstatement when consumers switch away from goods whose prices rise.
- D. Reproducing the index separates a calculation error from a design problem.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for consumer price index (cpi). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes inflation rate. It does not answer the question about consumer price index (cpi).
- B: Correct. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- C: This describes substitution bias. It does not answer the question about consumer price index (cpi).
- D: This describes the consumer price index. It does not answer the question about consumer price index (cpi).

### Review question 2


**Prompt - exact player copy:** Which statement best explains inflation rate?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. CPI overstatement when consumers switch away from goods whose prices rise.
- C. The percent change in a price index.
- D. Reproducing the index separates a calculation error from a design problem.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for inflation rate. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes consumer price index (CPI). It does not answer the question about inflation rate.
- B: This describes substitution bias. It does not answer the question about inflation rate.
- C: Correct. The percent change in a price index.
- D: This describes the consumer price index. It does not answer the question about inflation rate.

### Review question 3


**Prompt - exact player copy:** Which statement best explains substitution bias?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. The percent change in a price index.
- C. Reproducing the index separates a calculation error from a design problem.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for substitution bias. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes consumer price index (CPI). It does not answer the question about substitution bias.
- B: This describes inflation rate. It does not answer the question about substitution bias.
- C: This describes the consumer price index. It does not answer the question about substitution bias.
- D: Correct. CPI overstatement when consumers switch away from goods whose prices rise.

### Review question 4


**Prompt - exact player copy:** Which statement best explains the consumer price index?

**Options - exact player copy:**

- A. Reproducing the index separates a calculation error from a design problem.
- B. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- C. The percent change in a price index.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for the consumer price index. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Reproducing the index separates a calculation error from a design problem.
- B: This describes consumer price index (CPI). It does not answer the question about the consumer price index.
- C: This describes inflation rate. It does not answer the question about the consumer price index.
- D: This describes substitution bias. It does not answer the question about the consumer price index.

### Review question 5


**Prompt - exact player copy:** Which statement best explains the effect of basket weights on a consumer price index?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.
- C. The percent change in a price index.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for the effect of basket weights on a consumer price index. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes consumer price index (CPI). It does not answer the question about the effect of basket weights on a consumer price index.
- B: Correct. Sensitivity to a stale weight requires disclosure and a companion measure, not silent replacement.
- C: This describes inflation rate. It does not answer the question about the effect of basket weights on a consumer price index.
- D: This describes substitution bias. It does not answer the question about the effect of basket weights on a consumer price index.

### Review question 6


**Prompt - exact player copy:** Which statement best explains index publication?

**Options - exact player copy:**

- A. The current cost of a fixed consumer basket relative to its base-year cost, times 100.
- B. The percent change in a price index.
- C. Publishing the historical price index alongside a clearly labeled revised index preserves continuity while exposing the effect of changed weights.
- D. CPI overstatement when consumers switch away from goods whose prices rise.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for index publication. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes consumer price index (CPI). It does not answer the question about index publication.
- B: This describes inflation rate. It does not answer the question about index publication.
- C: Correct. Publishing the historical price index alongside a clearly labeled revised index preserves continuity while exposing the effect of changed weights.
- D: This describes substitution bias. It does not answer the question about index publication.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 4 - Jobs Behind The Number

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 4 - 12 DAYS UNTIL CHANGEOVER.

**Card title:** Jobs Behind the Number

**Go now:** Go to COUNTER and meet Eli Voss, counter operations lead, at the labor board.

**Card body:** 12 days until changeover. A job notice curls over an empty search card. Today you decide whether the job figures call for action.

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

**Trigger:** mission_4_arrival.

**World state:** A job notice curls over an empty search card.

**Panel/HUD text:** Diagnose labor-market weakness without losing excluded workers.

**Dialogue bubbles -** Eli Voss: "Start with rebuild the denominator. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 13 at `wage-notice-rail` in COUNTER.

**Beat 2 - After Stop 13 | `queue-board` | automatic**

**Trigger:** accepted_stop_13.

**World state:** At `wage-notice-rail`, the dated accepted-result slip for Stop 13 reads: "LF 10.0m and 8.0%, ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. The labor force is 10.0 million and unemployment is 8.0%; 0.5 million discouraged workers remain outside."

**Unlocks/waypoint:** Unlock Stop 14 at `queue-board` in COUNTER.

**Beat 3 - After Stop 14 | `allocation-slate` | automatic**

**Trigger:** accepted_stop_14.

**World state:** At `queue-board`, the dated accepted-result slip for Stop 14 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** COUNTER

**Dialogue bubbles -** Eli Voss: "Good thinking. Frictional and structural form the natural rate; recession layoffs are cyclical."

**Unlocks/waypoint:** Unlock Stop 15 at `allocation-slate` in COUNTER.

**Beat 4 - After Stop 15 | `wage-notice-rail` | automatic**

**Trigger:** accepted_stop_15.

**World state:** At `allocation-slate`, the dated accepted-result slip for Stop 15 reads: "−34.8 billion, recessionary, ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Halvern has a 34.8-billion recessionary gap."

**Unlocks/waypoint:** Unlock Stop 16 at `wage-notice-rail` in COUNTER.

**Beat 5 - At mission end | `wage-notice-rail` | automatic**

**Trigger:** accepted_stop_16.

**World state:** At `wage-notice-rail`, Eli Voss clips the participation warning to the wage rail. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "That blank card is a person the rate stopped counting. Therefore Rhea must price a spending plan for the 34.8-billion gap; calling this normal churn costs jobs."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m04

**Home:** `wage-notice-rail`. **Before:** The dated mission-4 evidence holder at this fixture has no accepted record. A job notice curls over an empty search card.
**After — exact action:** Eli Voss clips the participation warning to the wage rail.
**Trigger:** accepted_stop_16. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `policy-wall`, an unsigned spending order sits under a press deadline.
**Segue - exact player copy:** Therefore Rhea must price a spending plan for the 34.8-billion gap; calling this normal churn costs jobs.

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

**Fixture source panel - exact player copy:** Halvern has 9.2 million employed people, 0.8 million active job seekers, and 0.5 million discouraged workers. Build the labor force and unemployment rate before comparing this month with the prior report.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** Because layoffs are cyclical, compare actual real GDP of 685.2 billion with full-employment output of 720.0 billion base-year crowns. Calculate the signed gap and label its type before policy staff move upstairs.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Segue - exact player copy:** Therefore Rhea must price a spending plan for the 34.8-billion gap; calling this normal churn costs jobs.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Eli Voss clips the participation warning to the wage rail. Therefore Rhea must price a spending plan for the 34.8-billion gap; calling this normal churn costs jobs.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains labor force?

**Options - exact player copy:**

- A. A person who wants work but stopped searching and is outside the labor force.
- B. Frictional plus structural unemployment.
- C. Real output below full-employment output.
- D. Employed people plus unemployed people actively seeking work.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for labor force. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes discouraged worker. It does not answer the question about labor force.
- B: This describes natural unemployment. It does not answer the question about labor force.
- C: This describes recessionary gap. It does not answer the question about labor force.
- D: Correct. Employed people plus unemployed people actively seeking work.

### Review question 2


**Prompt - exact player copy:** Which statement best explains discouraged worker?

**Options - exact player copy:**

- A. A person who wants work but stopped searching and is outside the labor force.
- B. Employed people plus unemployed people actively seeking work.
- C. Frictional plus structural unemployment.
- D. Real output below full-employment output.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for discouraged worker. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A person who wants work but stopped searching and is outside the labor force.
- B: This describes labor force. It does not answer the question about discouraged worker.
- C: This describes natural unemployment. It does not answer the question about discouraged worker.
- D: This describes recessionary gap. It does not answer the question about discouraged worker.

### Review question 3


**Prompt - exact player copy:** Which statement best explains natural unemployment?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. Frictional plus structural unemployment.
- C. A person who wants work but stopped searching and is outside the labor force.
- D. Real output below full-employment output.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for natural unemployment. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes labor force. It does not answer the question about natural unemployment.
- B: Correct. Frictional plus structural unemployment.
- C: This describes discouraged worker. It does not answer the question about natural unemployment.
- D: This describes recessionary gap. It does not answer the question about natural unemployment.

### Review question 4


**Prompt - exact player copy:** Which statement best explains recessionary gap?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. A person who wants work but stopped searching and is outside the labor force.
- C. Real output below full-employment output.
- D. Frictional plus structural unemployment.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for recessionary gap. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes labor force. It does not answer the question about recessionary gap.
- B: This describes discouraged worker. It does not answer the question about recessionary gap.
- C: Correct. Real output below full-employment output.
- D: This describes natural unemployment. It does not answer the question about recessionary gap.

### Review question 5


**Prompt - exact player copy:** Which statement best explains unemployment rate?

**Options - exact player copy:**

- A. Employed people plus unemployed people actively seeking work.
- B. A person who wants work but stopped searching and is outside the labor force.
- C. Frictional plus structural unemployment.
- D. Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for unemployment rate. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes labor force. It does not answer the question about unemployment rate.
- B: This describes discouraged worker. It does not answer the question about unemployment rate.
- C: This describes natural unemployment. It does not answer the question about unemployment rate.
- D: Correct. Excluding discouraged workers follows the definition but can hide worsening conditions when read alone.

### Review question 6


**Prompt - exact player copy:** Which statement best explains unemployment types?

**Options - exact player copy:**

- A. Only cyclical unemployment signals output below its demand-supported potential.
- B. Employed people plus unemployed people actively seeking work.
- C. A person who wants work but stopped searching and is outside the labor force.
- D. Frictional plus structural unemployment.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for unemployment types. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Only cyclical unemployment signals output below its demand-supported potential.
- B: This describes labor force. It does not answer the question about unemployment types.
- C: This describes discouraged worker. It does not answer the question about unemployment types.
- D: This describes natural unemployment. It does not answer the question about unemployment types.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 5 - The First Round

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 5 - 11 DAYS UNTIL CHANGEOVER.

**Card title:** The First Round

**Go now:** Go to PRICES and meet Rhea Dane, finance minister, at the spending board.

**Card body:** 11 days until changeover. An unsigned spending order sits under a press deadline. Today you decide which spending plan could close the gap.

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

**Trigger:** mission_5_arrival.

**World state:** An unsigned spending order sits under a press deadline.

**Panel/HUD text:** Calculate the spending and tax changes that target the measured gap.

**Dialogue bubbles -** Rhea Dane: "Start with split the next crown. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 17 at `calculating-desk` in PRICES.

**Beat 2 - After Stop 17 | `calculating-desk` | automatic**

**Trigger:** accepted_stop_17.

**World state:** At `calculating-desk`, the dated accepted-result slip for Stop 17 reads: "0.25.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Rhea Dane: "Nice work. MPS is 0.25, so one quarter leaks from each round."

**Unlocks/waypoint:** Unlock Stop 18 at `calculating-desk` in PRICES.

**Beat 3 - After Stop 18 | `calculating-desk` | automatic**

**Trigger:** accepted_stop_18.

**World state:** At `calculating-desk`, the dated accepted-result slip for Stop 18 reads: "(4,−3).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** PRICES → RATE

**Dialogue bubbles -** Rhea Dane: "Good thinking. The spending multiplier is 4; the tax multiplier is −3."

**Unlocks/waypoint:** Unlock Stop 19 at `calculating-desk` in PRICES.

**Beat 4 - After Stop 19 | `policy-wall` | automatic**

**Trigger:** accepted_stop_19.

**World state:** At `calculating-desk`, the dated accepted-result slip for Stop 19 reads: "(8.7,11.6) billion, ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Rhea Dane: "Exactly right. Close the gap with 8.7 billion in purchases or an 11.6-billion tax cut."

**Unlocks/waypoint:** Unlock Stop 20 at `policy-wall` in Rate Room.

**Beat 5 - At mission end | `calculating-desk` | automatic**

**Trigger:** accepted_stop_20.

**World state:** At `policy-wall`, Rhea Dane pins the 8.7-BILLION PURCHASE OPTION to the policy wall. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "I can fund demand. I cannot vote more fuel into the tank. But Lina's fuel shock can still raise prices; Rhea cannot promise cheaper fuel with the same spending order."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m05

**Home:** `policy-wall`. **Before:** The dated mission-5 evidence holder at this fixture has no accepted record. An unsigned spending order sits under a press deadline.
**After — exact action:** Rhea Dane pins the 8.7-BILLION PURCHASE OPTION to the policy wall.
**Trigger:** accepted_stop_20. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `ad-as-wall`, two red pins pull the wall's price and output tracks apart.
**Segue - exact player copy:** But Lina's fuel shock can still raise prices; Rhea cannot promise cheaper fuel with the same spending order.

## Location plan

**Route:** PRICES → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

PRICES→RATE. Rhea wants an announcement now. S1 derives MPS, S2 both multipliers, and S3 calculates alternatives; that exact target unlocks RATE, where S4 selects the package because only the policy room can authorize it. The first-round tiles light successive spending rounds. Rhea's pressure is legitimate but ignores supply. Multipliers translate a first-round fiscal change into total AD; taxes have a smaller absolute multiplier because households save part of the tax change. Waypoint: “Take the 8.7-billion target to the Rate Room for authorization.”

## Key concepts, explained here

**Objective:** Calculate the spending and tax changes that target the measured gap. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


### Character scene: changeover-rhea-entrance

**Trigger:** On arrival at Statistics Floor during Mission 5, when Stop 17 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `calculating-desk` in Statistics Floor. Rhea Dane, finance minister, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Places the proposed support package beside the multiplier calculation.
**Exact dialogue:**
- Rhea Dane, finance minister: “Tell me when the promised support can actually reach the people at your counters.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-rhea-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 17 - Split the next crown

**Format/placement:** DERIVE, at `calculating-desk`.

**Metadata:** Concept: 16 - MPC/MPS; Keystone: AD/multipliers; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the calculating desk, in Statistics Floor.

**Stop reason - exact player copy:** A spending response is under consideration, so household saving behavior must enter the model.

**Question card story setup - exact player copy:** Households spend 0.75 crown from each additional crown of disposable income and save the rest. Build the identity that fixes MPS, then show why each later spending round is three quarters of the prior round.

**Question card story-science connection - exact player copy:** The saving share determines how much of each extra income round does not return as consumption.

**Fixture source panel - exact player copy:** Households spend 0.75 crown from each additional crown of disposable income and save the rest. Build the identity that fixes MPS, then show why each later spending round is three quarters of the prior round.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** With MPS fixed at 0.25 and MPC at 0.75, derive the spending and tax multipliers side by side. The signs must show why higher taxes contract demand while purchases add directly. Start with k_G=1/MPS for the government-spending multiplier and k_T=-MPC/MPS for the tax multiplier.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** The recessionary gap is 34.8 billion crowns. Use gap=k_GΔG with spending multiplier k_G=4 to find the government-purchase increase that closes it. Then use gap=k_TΔT with tax multiplier k_T=-3 to find the alternative tax cut; report the cut as a positive size.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Question card story setup - exact player copy:** The announced purchases are too small for the measured demand gap. Rhea must also preserve a separate review of the supply shock.

**Decision evidence - exact player copy:** Required outcomes: provide modeled demand support of at least 34.8 billion; retain an independent supply-shock review.

**Question card prompt - exact player copy:** You have 100 plan points. Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "value": {
    "budget": {
      "value": 100,
      "unit": "plan points"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "provide modeled demand support of at least 34.8 billion"
      },
      {
        "id": "r2",
        "text": "retain an independent supply-shock review"
      }
    ],
    "selection_rule": "Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve.",
    "options": [
      {
        "id": "G8_7",
        "label": "8.7-billion purchase package",
        "cost": 65.0,
        "information": "With a spending multiplier of 4, adds 4×8.7 billion to demand.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "supply_review",
        "label": "Independent supply-shock review",
        "cost": 35.0,
        "information": "Tests oil-cost effects separately from demand support.",
        "covers": [
          "r2"
        ]
      },
      {
        "id": "G6",
        "label": "6-billion purchase package",
        "cost": 45.0,
        "information": "With the same multiplier, adds 24 billion to demand.",
        "covers": []
      },
      {
        "id": "tax11_6",
        "label": "11.6-billion tax-cut package",
        "cost": 80.0,
        "information": "With a tax-cut multiplier magnitude of 3, adds 34.8 billion to demand.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "publicity",
        "label": "Announcement campaign",
        "cost": 25.0,
        "information": "Publishes the announcement without adding modeled demand or a supply test.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "G8_7",
        "supply_review"
      ]
    ],
    "example_total": 100.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** G8_7, supply_review = 100 plan points; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 5 signed.

## Mission outcome

Mission decision: Prepare an 8.7-billion purchase increase, and keep the supply-shock review. With a multiplier of 4, that package closes the 34.8-billion demand gap. It does not by itself fix rising input costs. The board must now place both forces on one model.

**Segue - exact player copy:** But Lina's fuel shock can still raise prices; Rhea cannot promise cheaper fuel with the same spending order.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Rhea Dane pins the 8.7-BILLION PURCHASE OPTION to the policy wall. But Lina's fuel shock can still raise prices; Rhea cannot promise cheaper fuel with the same spending order.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains marginal propensity to consume (MPC)?

**Options - exact player copy:**

- A. The fraction saved; MPC plus MPS equals one.
- B. The fraction of an extra dollar of income consumed.
- C. Total demand change divided by the initial policy change.
- D. Saving is the leakage that limits the total demand response.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for marginal propensity to consume (mpc). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marginal propensity to save (MPS). It does not answer the question about marginal propensity to consume (mpc).
- B: Correct. The fraction of an extra dollar of income consumed.
- C: This describes multiplier. It does not answer the question about marginal propensity to consume (mpc).
- D: This describes the marginal propensities to consume and save. It does not answer the question about marginal propensity to consume (mpc).

### Review question 2


**Prompt - exact player copy:** Which statement best explains marginal propensity to save (MPS)?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. Total demand change divided by the initial policy change.
- C. The fraction saved; MPC plus MPS equals one.
- D. Saving is the leakage that limits the total demand response.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for marginal propensity to save (mps). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marginal propensity to consume (MPC). It does not answer the question about marginal propensity to save (mps).
- B: This describes multiplier. It does not answer the question about marginal propensity to save (mps).
- C: Correct. The fraction saved; MPC plus MPS equals one.
- D: This describes the marginal propensities to consume and save. It does not answer the question about marginal propensity to save (mps).

### Review question 3


**Prompt - exact player copy:** Which statement best explains multiplier?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. The fraction saved; MPC plus MPS equals one.
- C. Saving is the leakage that limits the total demand response.
- D. Total demand change divided by the initial policy change.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for multiplier. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marginal propensity to consume (MPC). It does not answer the question about multiplier.
- B: This describes marginal propensity to save (MPS). It does not answer the question about multiplier.
- C: This describes the marginal propensities to consume and save. It does not answer the question about multiplier.
- D: Correct. Total demand change divided by the initial policy change.

### Review question 4


**Prompt - exact player copy:** Which statement best explains the marginal propensities to consume and save?

**Options - exact player copy:**

- A. Saving is the leakage that limits the total demand response.
- B. The fraction of an extra dollar of income consumed.
- C. The fraction saved; MPC plus MPS equals one.
- D. Total demand change divided by the initial policy change.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for the marginal propensities to consume and save. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Saving is the leakage that limits the total demand response.
- B: This describes marginal propensity to consume (MPC). It does not answer the question about the marginal propensities to consume and save.
- C: This describes marginal propensity to save (MPS). It does not answer the question about the marginal propensities to consume and save.
- D: This describes multiplier. It does not answer the question about the marginal propensities to consume and save.

### Review question 5


**Prompt - exact player copy:** In a simple closed-economy model with no proportional taxes, the marginal propensity to consume is 0.75. How do the spending and tax multipliers compare?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. The spending multiplier is 4 and the tax multiplier is -3.
- C. The fraction saved; MPC plus MPS equals one.
- D. Total demand change divided by the initial policy change.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for spending and tax multipliers. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marginal propensity to consume (MPC). It does not answer the question about spending and tax multipliers.
- B: Correct. The spending multiplier is 4 and the tax multiplier is -3.
- C: This describes marginal propensity to save (MPS). It does not answer the question about spending and tax multipliers.
- D: This describes multiplier. It does not answer the question about spending and tax multipliers.

### Review question 6


**Prompt - exact player copy:** Which statement best explains gap closing?

**Options - exact player copy:**

- A. The fraction of an extra dollar of income consumed.
- B. The fraction saved; MPC plus MPS equals one.
- C. The gap determines the reportage; the reportage should not determine the claimed gap.
- D. Total demand change divided by the initial policy change.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for gap closing. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marginal propensity to consume (MPC). It does not answer the question about gap closing.
- B: This describes marginal propensity to save (MPS). It does not answer the question about gap closing.
- C: Correct. The gap determines the reportage; the reportage should not determine the claimed gap.
- D: This describes multiplier. It does not answer the question about gap closing.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 6 - Two Shifts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 6 - 10 DAYS UNTIL CHANGEOVER.

**Card title:** Two Shifts

**Go now:** Go to PRICES and meet Lina Saye, price statistics lead, at the AD-AS wall.

**Card body:** 10 days until changeover. Two red pins pull the wall's price and output tracks apart. Today you decide how policy should treat weak demand and dear fuel.

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

**Trigger:** mission_6_arrival.

**World state:** Two red pins pull the wall's price and output tracks apart.

**Panel/HUD text:** Separate weak demand from cost-push inflation.

**Dialogue bubbles -** Lina Saye: "Start with why ad slopes down. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 21 at `ad-as-wall` in PRICES.

**Beat 2 - After Stop 21 | `ad-as-wall` | automatic**

**Trigger:** accepted_stop_21.

**World state:** At `ad-as-wall`, the dated accepted-result slip for Stop 21 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Lina Saye: "Nice work. Lower prices raise real wealth, reduce money demand and interest, and can depreciate the currency, increasing C, I, and NX."

**Unlocks/waypoint:** Unlock Stop 22 at `ad-as-wall` in Statistics Floor.

**Beat 3 - After Stop 22 | `gap-calculator` | automatic**

**Trigger:** accepted_stop_22.

**World state:** At `ad-as-wall`, the dated accepted-result slip for Stop 22 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** PRICES → RATE

**Dialogue bubbles -** Lina Saye: "Good thinking. The imported-energy shock shifts SRAS left."

**Unlocks/waypoint:** Unlock Stop 23 at `gap-calculator` in Rate Room.

**Beat 4 - After Stop 23 | `ad-as-wall` | automatic**

**Trigger:** accepted_stop_23.

**World state:** At `gap-calculator`, the dated accepted-result slip for Stop 23 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Lina Saye: "Exactly right. Halvern has a recessionary gap plus an adverse supply shock."

**Unlocks/waypoint:** Unlock Stop 24 at `ad-as-wall` in PRICES.

**Beat 5 - At mission end | `ad-as-wall` | automatic**

**Trigger:** accepted_stop_24.

**World state:** At `ad-as-wall`, Rhea Dane pins the separate demand and supply responses to the model wall. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "One lever cannot undo both shifts. But Tomas hears that returned banknotes mean money has vanished; the Note Hall must show where it went."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m06

**Home:** `ad-as-wall`. **Before:** The dated mission-6 evidence holder at this fixture has no accepted record. Two red pins pull the wall's price and output tracks apart.
**After — exact action:** Rhea Dane pins the separate demand and supply responses to the model wall.
**Trigger:** accepted_stop_24. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `conversion-trays`, old-crown bundles fill a tray beside deposit receipts.
**Segue - exact player copy:** But Tomas hears that returned banknotes mean money has vanished; the Note Hall must show where it went.

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

**Question card story setup - exact player copy:** The output report arrives alongside a fuel-cost shock. The policy desk must separate the real production gap from the price disturbance.

**Question card prompt - exact player copy:** Real output is 685.2 billion and full-employment output is 720 billion; nominal output is 740 billion. Select the two real quantities and calculate actual minus full-employment output. Oil costs have risen 18 index points.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Place both gaps",
    "labels": [
      "685.2",
      "720",
      "740",
      "18"
    ],
    "values": [
      685.2,
      720,
      740,
      18
    ],
    "slots": 2,
    "template": "{a}-{b} = ? billion real-output units",
    "formula": "a-b",
    "correct": [
      0,
      1
    ],
    "target": -34.8,
    "tolerance": 0.01,
    "units": "billion real-output units",
    "correctResult": -34.8
  },
  "answerText": "The real output gap is −34.8 billion. The oil-cost increase is an adverse supply shock; it is not another real-output term to subtract from this gap.",
  "wrongFeedback": [
    "Nominal output includes price effects and cannot replace real output in this comparison."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** The real output gap is −34.8 billion. The oil-cost increase is an adverse supply shock; it is not another real-output term to subtract from this gap.

**Wrong-path feedback:** Nominal output includes price effects and cannot replace real output in this comparison.

**State/output:** Record the result and unlock the next named stop.

## Stop 24 - Aim fiscal policy

**Format/placement:** STRESS, asked by Lina Saye beside `ad-as-wall`.

**Metadata:** Concept: 24 - fiscal dilemma; Keystone: fiscal/AD-AS; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Lina Saye, at the AD–AS wall in Statistics Floor.

**Stop reason - exact player copy:** Weak demand and cost pressure coexist, so the proposed package needs testing across oil-price outcomes.

**Question card story setup - exact player copy:** Weak demand and an oil-cost shock coexist. The model separates how purchases affect demand from how oil affects costs.

**Question card prompt - exact player copy:** Sweep the oil shock through 0, 6, 12 and 18 index points. In this model ΔAD=4ΔG, ΔG=8.7 billion and the measured demand gap is 34.8 billion; select the claim that survives all settings.

**Complete format-specific interaction block - canonical source:**

```json
{
  "stress": {
    "model": {
      "oil_cost_index_points": [
        0,
        6,
        12,
        18
      ],
      "G_billion": 8.7,
      "multiplier": 4,
      "demand_gap_billion": 34.8,
      "oil_effect": "changes production costs, not this fixed demand multiplier",
      "spending_effect": "changes demand; no direct repair of oil supply"
    },
    "candidates": [
      {
        "id": "demand",
        "label": "The package supplies the modeled demand-gap amount"
      },
      {
        "id": "prices",
        "label": "The package guarantees lower prices"
      },
      {
        "id": "supply",
        "label": "The package repairs oil supply"
      }
    ],
    "correct": "demand",
    "public_rule": "Use the displayed model and criterion over the entire stated range; no hidden preference scores."
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** 4×8.7=34.8 billion at each setting in this simplified model. This does not promise unchanged equilibrium output, lower prices or a repaired supply curve.

**Answer text:** 4×8.7=34.8 billion at each setting in this simplified model. This does not promise unchanged equilibrium output, lower prices or a repaired supply curve.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 6 signed.

## Mission outcome

Mission decision: Aim policy at the weak demand gap. Treat the energy shock on its own. More spending can raise output and prices. It cannot fix a fuel supply shock. The claim of broad price abuse does not hold.

**Segue - exact player copy:** But Tomas hears that returned banknotes mean money has vanished; the Note Hall must show where it went.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Rhea Dane pins the separate demand and supply responses to the model wall. But Tomas hears that returned banknotes mean money has vanished; the Note Hall must show where it went.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Long-run aggregate supply (LRAS):** full-employment output, vertical at Yf.

### Review question 1


**Prompt - exact player copy:** Which statement best explains long-run aggregate supply (LRAS)?

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
- B. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.
- C. Short-run production supplied at each price level.
- D. Full-employment output, vertical at Yf.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for long-run aggregate supply (lras). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes net exports (NX). It does not answer the question about long-run aggregate supply (lras).
- B: This describes aggregate demand (AD). It does not answer the question about long-run aggregate supply (lras).
- C: This describes short-run aggregate supply (SRAS). It does not answer the question about long-run aggregate supply (lras).
- D: Correct. Full-employment output, vertical at Yf.

### Review question 2


**Prompt - exact player copy:** Exports are 90 billion and imports are 110 billion currency units. What are net exports?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Category",
  "yLabel": "Billions of currency units",
  "caption": "Trade during one year",
  "bars": [
    {
      "name": "Exports",
      "value": 90
    },
    {
      "name": "Imports",
      "value": 110
    }
  ]
}
```

**Options - exact player copy:**

- A. -20 billion currency units.
- B. 200 billion.
- C. 20 billion.
- D. 90 billion.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for net exports (nx). All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. -20 billion currency units.
- B: Net exports subtract imports from exports; they do not add them.
- C: Imports exceed exports, so the balance is negative.
- D: This omits imports.

### Review question 3


**Prompt - exact player copy:** Which statement best explains aggregate demand (AD)?

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
- B. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.
- C. Exports minus imports.
- D. Short-run production supplied at each price level.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for aggregate demand (ad). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes long-run aggregate supply (LRAS). It does not answer the question about aggregate demand (ad).
- B: Correct. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.
- C: This describes net exports (NX). It does not answer the question about aggregate demand (ad).
- D: This describes short-run aggregate supply (SRAS). It does not answer the question about aggregate demand (ad).

### Review question 4


**Prompt - exact player copy:** Which statement best explains short-run aggregate supply (SRAS)?

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
- B. Exports minus imports.
- C. Short-run production supplied at each price level.
- D. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for short-run aggregate supply (sras). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes long-run aggregate supply (LRAS). It does not answer the question about short-run aggregate supply (sras).
- B: This describes net exports (NX). It does not answer the question about short-run aggregate supply (sras).
- C: Correct. Short-run production supplied at each price level.
- D: This describes aggregate demand (AD). It does not answer the question about short-run aggregate supply (sras).

### Review question 5


**Prompt - exact player copy:** Which statement best explains stagflation?

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
- B. Exports minus imports.
- C. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.
- D. Higher prices with lower output.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for stagflation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes long-run aggregate supply (LRAS). It does not answer the question about stagflation.
- B: This describes net exports (NX). It does not answer the question about stagflation.
- C: This describes aggregate demand (AD). It does not answer the question about stagflation.
- D: Correct. Higher prices with lower output.

### Review question 6


**Prompt - exact player copy:** Which statement best explains the slope of aggregate demand?

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

- A. A price-level change moves along AD; spending conditions shift AD.
- B. Full-employment output, vertical at Yf.
- C. Exports minus imports.
- D. Consumption plus investment plus government purchases plus net exports (C+I+G+NX) at each price level.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for the slope of aggregate demand. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A price-level change moves along AD; spending conditions shift AD.
- B: This describes long-run aggregate supply (LRAS). It does not answer the question about the slope of aggregate demand.
- C: This describes net exports (NX). It does not answer the question about the slope of aggregate demand.
- D: This describes aggregate demand (AD). It does not answer the question about the slope of aggregate demand.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 7 - Money That Moved

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 7 - 9 DAYS UNTIL CHANGEOVER.

**Card title:** Money That Moved

**Go now:** Go to NOTES and meet Tomas Arendt, bank supervision lead, at the note scale.

**Card body:** Nine days remain. Old notes fill a tray beside bank slips. Today you decide if the returned cash is still part of the money supply.

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

**Trigger:** mission_7_arrival.

**World state:** Old-crown bundles fill a tray beside deposit receipts.

**Panel/HUD text:** Trace old cash into deposits and lending capacity.

**Dialogue bubbles -** Tomas Arendt: "Start with count m1 and m2. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `note-scale` in Note Hall.

**Beat 2 - After Stop 25 | `custody-desk` | automatic**

**Trigger:** accepted_stop_25.

**World state:** At `note-scale`, the dated accepted-result slip for Stop 25 reads: "(300,500), ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Tomas Arendt: "Nice work. M1 is 300 and M2 is 500 billion crowns."

**Unlocks/waypoint:** Unlock Stop 26 at `custody-desk` in Note Hall.

**Beat 3 - After Stop 26 | `balance-sheet-desk` | automatic**

**Trigger:** accepted_stop_26.

**World state:** At `custody-desk`, the dated accepted-result slip for Stop 26 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NOTES → BANKS

**Dialogue bubbles -** Tomas Arendt: "Good thinking. Most returned cash migrated into deposits; payment failures did not rise."

**Unlocks/waypoint:** Unlock Stop 27 at `balance-sheet-desk` in Bank Supervision.

**Beat 4 - After Stop 27 | `money-market-console` | automatic**

**Trigger:** accepted_stop_27.

**World state:** At `balance-sheet-desk`, the dated accepted-result slip for Stop 27 reads: "(10b,8b,10,80b), ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Tomas Arendt: "Exactly right. Required reserves are 10, excess 8, multiplier 10, and maximum new money 80 billion."

**Unlocks/waypoint:** Unlock Stop 28 at `money-market-console` in Bank Supervision.

**Beat 5 - At mission end | `note-scale` | automatic**

**Trigger:** accepted_stop_28.

**World state:** At `conversion-trays`, Eli Voss seals the counted old-note bundle with its deposit receipt. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Voss: "The notes came here. Their owners still have deposits. Therefore Tomas must set the real cost of credit; full trays do not tell him what borrowers pay."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m07

**Home:** `conversion-trays`. **Before:** The dated mission-7 evidence holder at this fixture has no accepted record. Old-crown bundles fill a tray beside deposit receipts.
**After — exact action:** Eli Voss seals the counted old-note bundle with its deposit receipt.
**Trigger:** accepted_stop_28. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `bond-panel`, a loan quote waits beside the expected-price sheet.
**Segue - exact player copy:** Therefore Tomas must set the real cost of credit; full trays do not tell him what borrowers pay.

## Location plan

**Route:** NOTES → BANKS. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

NOTES→BANKS, unlocked when S2 traces sacks to deposits. Tomas stops a truck from calling the money destroyed. S3–S4 use the ledger hall. Cash, checking, savings and funds establish aggregates; balance sheets and fractional reserves explain creation.

## Key concepts, explained here

**Objective:** Trace old cash into deposits and lending capacity. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


### Character scene: changeover-tomas-entrance

**Trigger:** On arrival at Note Hall during Mission 7, when Stop 25 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `note-scale` in Note Hall. Tomas Arendt, bank supervision lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Checks the bank balance sheets against the money-market console.
**Exact dialogue:**
- Tomas Arendt, bank supervision lead: “The counters need usable funds at opening time; a lending ceiling on my sheet cannot stand in for that.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-tomas-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 25 - Count M1 and M2

**Format/placement:** DERIVE, at `note-scale`.

**Metadata:** Concept: 18 - aggregates; Keystone: money; Area: Rate Room; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the note scale, in Note Hall.

**Stop reason - exact player copy:** Returned-note sacks are arriving, but the money aggregates need a baseline before interpreting them.

**Question card story setup - exact player copy:** Halvern records cash 80, checking deposits 220, savings 140, and small time deposits 60 billion crowns. Calculate M1 and M2 in the Rate Book before interpreting the returned-note sacks.

**Question card story-science connection - exact player copy:** The two money totals distinguish spendable balances from the broader stock that includes savings instruments.

**Fixture source panel - exact player copy:** Halvern records cash 80, checking deposits 220, savings 140, and small time deposits 60 billion crowns. Calculate M1 and M2 in the Rate Book before interpreting the returned-note sacks.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** Because 100 billion in deposits reached the banks, total reserves are 18 billion and the required reserve ratio is 10%. Derive required reserves, excess reserves, multiplier, and maximum system creation.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

### Character scene: changeover-eli-turn

**Trigger:** After Stop 28 is accepted.
**Location and presence:** `money-market-console` in Bank Supervision. Eli Voss, counter operations lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Sets the note-return trail beside the queue record.
**Exact dialogue:**
- Eli Voss, counter operations lead: “The line outside is real; it does not tell us what happened to the whole money supply.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-eli-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Returned notes moved into bank deposits. They did not vanish from the money supply. Banks still have spare reserves. Payments remain sound. The board must now set the real cost of loans.

**Segue - exact player copy:** Therefore Tomas must set the real cost of credit; full trays do not tell him what borrowers pay.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Eli Voss seals the counted old-note bundle with its deposit receipt. Therefore Tomas must set the real cost of credit; full trays do not tell him what borrowers pay.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains narrow money (M1)?

**Options - exact player copy:**

- A. Deposits times reserve ratio.
- B. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- C. Total minus required reserves.
- D. Cash can fall while deposits keep broader money available.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for narrow money (m1). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes required reserves. It does not answer the question about narrow money (m1).
- B: Correct. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- C: This describes excess reserves. It does not answer the question about narrow money (m1).
- D: This describes aggregates. It does not answer the question about narrow money (m1).

### Review question 2


**Prompt - exact player copy:** Which statement best explains required reserves?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Total minus required reserves.
- C. Deposits times reserve ratio.
- D. Cash can fall while deposits keep broader money available.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for required reserves. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes narrow money (M1). It does not answer the question about required reserves.
- B: This describes excess reserves. It does not answer the question about required reserves.
- C: Correct. Deposits times reserve ratio.
- D: This describes aggregates. It does not answer the question about required reserves.

### Review question 3


**Prompt - exact player copy:** Which statement best explains excess reserves?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Deposits times reserve ratio.
- C. Cash can fall while deposits keep broader money available.
- D. Total minus required reserves.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for excess reserves. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes narrow money (M1). It does not answer the question about excess reserves.
- B: This describes required reserves. It does not answer the question about excess reserves.
- C: This describes aggregates. It does not answer the question about excess reserves.
- D: Correct. Total minus required reserves.

### Review question 4


**Prompt - exact player copy:** Which statement best explains aggregates?

**Options - exact player copy:**

- A. Cash can fall while deposits keep broader money available.
- B. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- C. Deposits times reserve ratio.
- D. Total minus required reserves.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for aggregates. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Cash can fall while deposits keep broader money available.
- B: This describes narrow money (M1). It does not answer the question about aggregates.
- C: This describes required reserves. It does not answer the question about aggregates.
- D: This describes excess reserves. It does not answer the question about aggregates.

### Review question 5


**Prompt - exact player copy:** Which statement best explains money functions?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Agreement among cash-return channels is not independent proof of contraction.
- C. Deposits times reserve ratio.
- D. Total minus required reserves.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for money functions. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes narrow money (M1). It does not answer the question about money functions.
- B: Correct. Agreement among cash-return channels is not independent proof of contraction.
- C: This describes required reserves. It does not answer the question about money functions.
- D: This describes excess reserves. It does not answer the question about money functions.

### Review question 6


**Prompt - exact player copy:** A simple deposit-multiplier model gives a maximum possible expansion under its assumptions. Must actual lending reach that maximum?

**Options - exact player copy:**

- A. Cash plus checking deposits. Broad money (M2): M1 plus savings and money-market funds.
- B. Deposits times reserve ratio.
- C. No. It is a capacity ceiling; bank choices, borrower demand, and other constraints may reduce actual expansion.
- D. Total minus required reserves.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for reserves and multiplier. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes narrow money (M1). It does not answer the question about reserves and multiplier.
- B: This describes required reserves. It does not answer the question about reserves and multiplier.
- C: Correct. No. It is a capacity ceiling; bank choices, borrower demand, and other constraints may reduce actual expansion.
- D: This describes excess reserves. It does not answer the question about reserves and multiplier.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 8 - The Rate People Feel

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 8 - 8 DAYS UNTIL CHANGEOVER.

**Card title:** The Rate People Feel

**Go now:** Go to BANKS and meet Tomas Arendt at the bond-and-money panel.

**Card body:** 8 days until changeover. A loan quote waits beside the expected-price sheet. Today you decide whether rates should rise while output is weak.

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

**Trigger:** mission_8_arrival.

**World state:** A loan quote waits beside the expected-price sheet.

**Panel/HUD text:** Distinguish nominal and real rates before tightening.

**Dialogue bubbles -** Tomas Arendt: "Start with clear money surplus. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `money-market-console` in BANKS.

**Beat 2 - After Stop 29 | `balance-sheet-desk` | automatic**

**Trigger:** accepted_stop_29.

**World state:** At `money-market-console`, the dated accepted-result slip for Stop 29 reads: "A 30-billion money surplus causes bond buying, raises bond prices, and lowers the nominal rate from 5% to 4%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Tomas Arendt: "Nice work. A 30-billion surplus clears through bond buying and a rate fall to 4%."

**Unlocks/waypoint:** Unlock Stop 30 at `balance-sheet-desk` in Bank Supervision.

**Beat 3 - After Stop 30 | `policy-wall` | automatic**

**Trigger:** accepted_stop_30.

**World state:** At `balance-sheet-desk`, the dated accepted-result slip for Stop 30 reads: "1.5%, +0.5 pp.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** BANKS → RATE

**Dialogue bubbles -** Tomas Arendt: "Good thinking. The real rate is 1.5%, already 0.5 point tighter."

**Unlocks/waypoint:** Unlock Stop 31 at `policy-wall` in Rate Room.

**Beat 4 - After Stop 31 | `bond-panel` | automatic**

**Trigger:** accepted_stop_31.

**World state:** At `policy-wall`, the dated accepted-result slip for Stop 31 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Tomas Arendt: "Exactly right. Sell bonds → Ms falls → i rises → I falls → AD shifts left → output and price level fall."

**Unlocks/waypoint:** Unlock Stop 32 at `bond-panel` in BANKS.

**Beat 5 - At mission end | `money-market-console` | automatic**

**Trigger:** accepted_stop_32.

**World state:** At `bond-panel`, Tomas Arendt clips the HOLD RATE decision beneath the bond-price rail. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Arendt: "A high rate is not the same as a strong household. But Nia's foreign bond orders arrive before the ink dries; the stronger currency brings a cost to exporters."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m08

**Home:** `bond-panel`. **Before:** The dated mission-8 evidence holder at this fixture has no accepted record. A loan quote waits beside the expected-price sheet.
**After — exact action:** Tomas Arendt clips the HOLD RATE decision beneath the bond-price rail.
**Trigger:** accepted_stop_32. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `payment-wires`, a payment lamp lights while an export order is crossed out.
**Segue - exact player copy:** But Nia's foreign bond orders arrive before the ink dries; the stronger currency brings a cost to exporters.

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

**Fixture source panel - exact player copy:** With equilibrium nominal interest at 4.0% and expected inflation at 2.5%, rearrange Fisher's equation and calculate the real rate. Compare it with last month's 1.0% real rate.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Question card story setup - exact player copy:** The economy still has a demand shortfall. Test the borrowing-cost effect of a proposed one-percentage-point nominal rate rise before treating it as a recovery measure.

**Question card prompt - exact player copy:** Sweep expected inflation from 2% to 3% in 0.25-point steps. Use r=i−πe and compare before and after a one-point rise in i with πe fixed within each run; select the statement that always holds.

**Complete format-specific interaction block - canonical source:**

```json
{
  "stress": {
    "model": {
      "expected_inflation_percent": [
        2,
        2.25,
        2.5,
        2.75,
        3
      ],
      "nominal_change_pp": 1,
      "formula": "delta_r=delta_i when expectations held fixed",
      "criterion": "must hold for every expectation setting"
    },
    "candidates": [
      {
        "id": "tightens",
        "label": "The hike raises the real rate by one percentage point"
      },
      {
        "id": "closes",
        "label": "The hike directly closes the demand shortfall"
      },
      {
        "id": "supply",
        "label": "The hike directly repairs supply capacity"
      }
    ],
    "correct": "tightens",
    "public_rule": "Use the displayed model and criterion over the entire stated range; no hidden preference scores."
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** The real borrowing rate rises by one percentage point in every run. Under the stated weak-demand objective, that is a tightening effect, not evidence that the hike closes the gap.

**Answer text:** The real borrowing rate rises by one percentage point in every run. Under the stated weak-demand objective, that is a tightening effect, not evidence that the hike closes the gap.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 8 signed.

### Character scene: changeover-tomas-turn

**Trigger:** After Stop 32 is accepted.
**Location and presence:** `bond-panel` in Bank Supervision. Tomas Arendt, bank supervision lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Leaves the stressed rate proposal beside the reserve calculation.
**Exact dialogue:**
- Tomas Arendt, bank supervision lead: “Room to lend is not a commitment to lend; we cannot book it as money already moving.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-tomas-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Do not raise rates now. The real rate is already 1.5%, and a hike would reduce investment and AD while output is below capacity. The board holds the tool. Foreign buyers then flood the bond desk.

**Segue - exact player copy:** But Nia's foreign bond orders arrive before the ink dries; the stronger currency brings a cost to exporters.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Tomas Arendt clips the HOLD RATE decision beneath the bond-price rail. But Nia's foreign bond orders arrive before the ink dries; the stronger currency brings a cost to exporters.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains money demand?

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
- B. Nominal interest minus expected inflation.
- C. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.
- D. Desired liquid balances, lower at higher nominal interest.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for money demand. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes money supply. It does not answer the question about money demand.
- B: This describes real interest. It does not answer the question about money demand.
- C: This describes money market. It does not answer the question about money demand.
- D: Correct. Desired liquid balances, lower at higher nominal interest.

### Review question 2


**Prompt - exact player copy:** Which statement best explains money supply?

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

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for money supply. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Central-bank-set quantity, vertical in the model.
- B: This describes money demand. It does not answer the question about money supply.
- C: This describes real interest. It does not answer the question about money supply.
- D: This describes money market. It does not answer the question about money supply.

### Review question 3


**Prompt - exact player copy:** Which statement best explains real interest?

**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Nominal interest minus expected inflation.
- C. Central-bank-set quantity, vertical in the model.
- D. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for real interest. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes money demand. It does not answer the question about real interest.
- B: Correct. Nominal interest minus expected inflation.
- C: This describes money supply. It does not answer the question about real interest.
- D: This describes money market. It does not answer the question about real interest.

### Review question 4


**Prompt - exact player copy:** Which statement best explains money market?

**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Central-bank-set quantity, vertical in the model.
- C. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.
- D. Nominal interest minus expected inflation.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for money market. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes money demand. It does not answer the question about money market.
- B: This describes money supply. It does not answer the question about money market.
- C: Correct. A money surplus produces bond buying, higher bond prices, and a lower nominal rate.
- D: This describes real interest. It does not answer the question about money market.

### Review question 5


**Prompt - exact player copy:** Which statement best explains the relationship between nominal interest, expected inflation, and real interest?

**Options - exact player copy:**

- A. Desired liquid balances, lower at higher nominal interest.
- B. Central-bank-set quantity, vertical in the model.
- C. Nominal interest minus expected inflation.
- D. Tightness depends on the real rate, not on whether the nominal number looks high or low.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for the relationship between nominal interest, expected inflation, and real interest. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes money demand. It does not answer the question about the relationship between nominal interest, expected inflation, and real interest.
- B: This describes money supply. It does not answer the question about the relationship between nominal interest, expected inflation, and real interest.
- C: This describes real interest. It does not answer the question about the relationship between nominal interest, expected inflation, and real interest.
- D: Correct. Tightness depends on the real rate, not on whether the nominal number looks high or low.

### Review question 6


**Prompt - exact player copy:** Which statement best explains monetary chain?

**Options - exact player copy:**

- A. A tool matters only through the chain it sets off.
- B. Desired liquid balances, lower at higher nominal interest.
- C. Central-bank-set quantity, vertical in the model.
- D. Nominal interest minus expected inflation.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for monetary chain. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A tool matters only through the chain it sets off.
- B: This describes money demand. It does not answer the question about monetary chain.
- C: This describes money supply. It does not answer the question about monetary chain.
- D: This describes real interest. It does not answer the question about monetary chain.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 9 - Two Accounts

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 9 - 7 DAYS UNTIL CHANGEOVER.

**Card title:** Two Accounts

**Go now:** Go to TRADE and meet Nia Corren, open-economy analyst, at the payment wires.

**Card body:** 7 days until changeover. A payment lamp lights while an export order is crossed out. Today you decide what the cash inflow costs as well as funds.

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

**Trigger:** mission_9_arrival.

**World state:** A payment lamp lights while an export order is crossed out.

**Panel/HUD text:** Connect balance of payments, exchange rates, and net exports.

**Dialogue bubbles -** Nia Corren: "Start with close payments. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `trade-ledger` in Open-Economy Floor.

**Beat 2 - After Stop 33 | `forex-console` | automatic**

**Trigger:** accepted_stop_33.

**World state:** At `trade-ledger`, the dated accepted-result slip for Stop 33 reads: "The current account is -17 billion and the financial account is +17 billion, so the simplified balance closes at zero.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Nia Corren: "Nice work. Current account −17 and financial account +17 billion close at zero."

**Unlocks/waypoint:** Unlock Stop 34 at `forex-console` in Open-Economy Floor.

**Beat 3 - After Stop 34 | `forex-console` | automatic**

**Trigger:** accepted_stop_34.

**World state:** At `forex-console`, the dated accepted-result slip for Stop 34 reads: "Foreign bond demand raises demand for RATE, RATE appreciates, exports fall, imports rise, and net exports fall.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Nia Corren: "Good thinking. Foreign bond demand → demand for RATE shifts right → RATE appreciates → exports fall and imports rise → net exports fall."

**Unlocks/waypoint:** Unlock Stop 35 at `forex-console` in Open-Economy Floor.

**Beat 4 - After Stop 35 | `shipment-board` | automatic**

**Trigger:** accepted_stop_35.

**World state:** At `forex-console`, the dated accepted-result slip for Stop 35 reads: "Raising the quote from 1.00 to 1.10 lowers exports from 90 to 84 billion and raises imports from 108 to 112 billion; restoring 1.00 restores the baseline.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Nia Corren: "Exactly right. At fixed conditions, appreciation lowers exports and raises imports; restoration recovers baseline."

**Unlocks/waypoint:** Unlock Stop 36 at `shipment-board` in TRADE.

**Beat 5 - At mission end | `trade-ledger` | automatic**

**Trigger:** accepted_stop_36.

**World state:** At `payment-wires`, Nia Corren pins the paired financing and export-cost entries beside the payment wires. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Corren: "Both wires belong in the story. But Mara sees prices rise as orders fall; the board must test the short-run tradeoff before it tightens."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m09

**Home:** `payment-wires`. **Before:** The dated mission-9 evidence holder at this fixture has no accepted record. A payment lamp lights while an export order is crossed out.
**After — exact action:** Nia Corren pins the paired financing and export-cost entries beside the payment wires.
**Trigger:** accepted_stop_36. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `price-history-board`, the long money-growth strip lies beneath today's fuel alert.
**Segue - exact player copy:** But Mara sees prices rise as orders fall; the board must test the short-run tradeoff before it tightens.

## Location plan

**Route:** TRADE → RATE. Each move occurs only after a stop establishes why the next room owns the needed evidence or authority.

## Characters and dramatic beat

TRADE→RATE when S2 proves appreciation. Nia initially calls it confidence; Soren's export orders add the cost. Only RATE has the money-supply record needed at S4.

## Key concepts, explained here

**Objective:** Connect balance of payments, exchange rates, and net exports. The glossary, primer, equations, and stop connections above define the exact AP Macroeconomics concepts used here.


### Character scene: changeover-nia-entrance

**Trigger:** On arrival at Open-Economy Floor during Mission 9, when Stop 33 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `trade-ledger` in Open-Economy Floor. Nia Corren, open-economy analyst, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Checks foreign-payment entries against the shipment board.
**Exact dialogue:**
- Nia Corren, open-economy analyst: “Bring me the orders behind the exchange-rate argument so I can show the board both consequences.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-nia-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

### Character scene: changeover-soren-entrance

**Trigger:** On arrival at Open-Economy Floor during Mission 9, when Stop 33 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `trade-ledger` in Open-Economy Floor. Soren Vale, export council liaison, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Places the current shipment orders beside the foreign-payment record.
**Exact dialogue:**
- Soren Vale, export council liaison: “These orders mean work for the firms I represent; I need the board to see the costs behind the currency headline.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-soren-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

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

**Fixture source panel - exact player copy:** With a 17-billion capital inflow, foreigners must acquire RATE to buy Halvern bonds. Build the direction chain from asset demand to the currency's value and net exports in the Rate Book.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

### Character scene: changeover-soren-turn

**Trigger:** After Stop 35 is accepted.
**Location and presence:** `forex-console` in Open-Economy Floor. Soren Vale, export council liaison, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Adds imported-input costs beside the export response from the controlled comparison.
**Exact dialogue:**
- Soren Vale, export council liaison: “A cheaper selling price abroad does not make our imported supplies cheaper.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-soren-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


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

### Character scene: changeover-nia-turn

**Trigger:** After Stop 36 is accepted.
**Location and presence:** `shipment-board` in Open-Economy Floor. Nia Corren, open-economy analyst, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the exporter response beside the capital-inflow result.
**Exact dialogue:**
- Nia Corren, open-economy analyst: “The financing gain and the lost orders belong in the same report.”
- Soren Vale, export council liaison (radio): “Then keep our imported-input costs on that page too.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-nia-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Do not call the cash inflow pure good news. It pays for the trade gap and lifts RATE. A stronger RATE cuts net exports. Export orders are now down. The output plan must change.

**Segue - exact player copy:** But Mara sees prices rise as orders fall; the board must test the short-run tradeoff before it tightens.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Nia Corren pins the paired financing and export-cost entries beside the payment wires. But Mara sees prices rise as orders fall; the board must test the short-run tradeoff before it tightens.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains appreciation?

**Options - exact player copy:**

- A. Net exports (NX) plus net income and net transfers.
- B. A currency buys more foreign currency.
- C. Cross-border asset purchases and sales.
- D. A current deficit is financed by a financial surplus, not free money.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for appreciation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current account. It does not answer the question about appreciation.
- B: Correct. A currency buys more foreign currency.
- C: This describes financial account. It does not answer the question about appreciation.
- D: This describes the balance of payments. It does not answer the question about appreciation.

### Review question 2


**Prompt - exact player copy:** Which statement best explains current account?

**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Cross-border asset purchases and sales.
- C. Net exports (NX) plus net income and net transfers.
- D. A current deficit is financed by a financial surplus, not free money.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for current account. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes appreciation. It does not answer the question about current account.
- B: This describes financial account. It does not answer the question about current account.
- C: Correct. Net exports (NX) plus net income and net transfers.
- D: This describes the balance of payments. It does not answer the question about current account.

### Review question 3


**Prompt - exact player copy:** Which statement best explains financial account?

**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Net exports (NX) plus net income and net transfers.
- C. A current deficit is financed by a financial surplus, not free money.
- D. Cross-border asset purchases and sales.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for financial account. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes appreciation. It does not answer the question about financial account.
- B: This describes current account. It does not answer the question about financial account.
- C: This describes the balance of payments. It does not answer the question about financial account.
- D: Correct. Cross-border asset purchases and sales.

### Review question 4


**Prompt - exact player copy:** Which statement best explains the balance of payments?

**Options - exact player copy:**

- A. A current deficit is financed by a financial surplus, not free money.
- B. A currency buys more foreign currency.
- C. Net exports (NX) plus net income and net transfers.
- D. Cross-border asset purchases and sales.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for the balance of payments. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A current deficit is financed by a financial surplus, not free money.
- B: This describes appreciation. It does not answer the question about the balance of payments.
- C: This describes current account. It does not answer the question about the balance of payments.
- D: This describes financial account. It does not answer the question about the balance of payments.

### Review question 5


**Prompt - exact player copy:** Which statement best explains currency demand?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Quantity of currency A",
  "yLabel": "Units of currency B per unit of A",
  "caption": "Demand for currency A in the foreign-exchange market.",
  "series": [
    {
      "name": "Demand for currency A",
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

**Hint - exact player copy:** Identify the defining relationship or mechanism for currency demand. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes appreciation. It does not answer the question about currency demand.
- B: Correct. Appreciation makes exports dearer and imports cheaper.
- C: This describes current account. It does not answer the question about currency demand.
- D: This describes financial account. It does not answer the question about currency demand.

### Review question 6


**Prompt - exact player copy:** Which statement best explains appreciation and NX?

**Options - exact player copy:**

- A. A currency buys more foreign currency.
- B. Net exports (NX) plus net income and net transfers.
- C. Reversing the quote tests whether currency value changes the export margin.
- D. Cross-border asset purchases and sales.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for appreciation and nx. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes appreciation. It does not answer the question about appreciation and nx.
- B: This describes current account. It does not answer the question about appreciation and nx.
- C: Correct. Reversing the quote tests whether currency value changes the export margin.
- D: This describes financial account. It does not answer the question about appreciation and nx.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 10 - The Temporary Tradeoff

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 10 - 6 DAYS UNTIL CHANGEOVER.

**Card title:** The Temporary Tradeoff

**Go now:** Go to RATE and meet Mara Venn at the Phillips wall.

**Card body:** 6 days until changeover. The long money-growth strip lies beneath today's fuel alert. Today you decide whether a short price shock warrants tighter policy.

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

**Trigger:** mission_10_arrival.

**World state:** The long money-growth strip lies beneath today's fuel alert.

**Panel/HUD text:** Separate a short-run shock from long-run inflation policy.

**Dialogue bubbles -** Mara Venn: "Start with move or shift. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `policy-wall` in RATE.

**Beat 2 - After Stop 37 | `gap-calculator` | automatic**

**Trigger:** accepted_stop_37.

**World state:** At `policy-wall`, the dated accepted-result slip for Stop 37 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Mara Venn: "Nice work. The supply shock shifts SRPC right."

**Unlocks/waypoint:** Unlock Stop 38 at `gap-calculator` in Rate Room.

**Beat 3 - After Stop 38 | `price-history-board` | automatic**

**Trigger:** accepted_stop_38.

**World state:** At `gap-calculator`, the dated accepted-result slip for Stop 38 reads: "The quantity equation gives estimated long-run inflation of 2%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** RATE → PRICES

**Dialogue bubbles -** Mara Venn: "Good thinking. Estimated long-run inflation is 2%, far below the temporary 5.88% basket print."

**Unlocks/waypoint:** Unlock Stop 39 at `price-history-board` in Statistics Floor.

**Beat 4 - After Stop 39 | `forecast-table` | automatic**

**Trigger:** accepted_stop_39.

**World state:** At `price-history-board`, the dated accepted-result slip for Stop 39 reads: "The temporary model has lower held-out forecast error.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Mara Venn: "Exactly right. The temporary-supply model predicts the holdout; persistent monetary inflation does not."

**Unlocks/waypoint:** Unlock Stop 40 at `forecast-table` in RATE.

**Beat 5 - At mission end | `policy-wall` | automatic**

**Trigger:** accepted_stop_40.

**World state:** At `price-history-board`, Lina Saye pins the 2% LONG-RUN INFLATION estimate beside the shock record. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Lina Saye: "A sharp rise today does not draw the whole future line. But Eli's wage contracts cannot reset for six weeks; self-correction may arrive after the families need help."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m10

**Home:** `price-history-board`. **Before:** The dated mission-10 evidence holder at this fixture has no accepted record. The long money-growth strip lies beneath today's fuel alert.
**After — exact action:** Lina Saye pins the 2% LONG-RUN INFLATION estimate beside the shock record.
**Trigger:** accepted_stop_40. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `threshold-rail`, a wage contract's six-week date extends past changeover day.
**Segue - exact player copy:** But Eli's wage contracts cannot reset for six weeks; self-correction may arrive after the families need help.

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

**Fixture source panel - exact player copy:** Money grows 3%, velocity is constant, and real output grows 1% at full employment. Use the growth-rate form of quantity theory to estimate long-run inflation clearly for the next board decision.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Question card story setup - exact player copy:** Both inflation models have fixed forecasts for the next two months. Freeze them before opening the withheld readings.

**Question card prompt - exact player copy:** Commit the supplied forecasts, reveal months five and six, then select the model with smaller mean absolute error. Forecast accuracy alone does not prove the cause of inflation.

**Complete format-specific interaction block - canonical source:**

```json
{
  "holdout": {
    "freeze_required": true,
    "training": [
      2,
      2.1,
      5.9,
      5.2
    ],
    "models": [
      {
        "id": "persistent",
        "predictions": [
          5.5,
          5.5
        ]
      },
      {
        "id": "temporary_supply",
        "predictions": [
          2,
          2
        ]
      }
    ],
    "reveal_after_commit": [
      3.2,
      2.4
    ],
    "criterion": "smaller mean absolute error",
    "correctChoice": "temporary_supply"
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** Temporary-supply model: mean absolute error 0.8 percentage point, versus 2.7 for persistent inflation.

**Answer text:** The temporary model predicts the withheld observations more closely. Retain it provisionally; this two-observation comparison is not a causal proof.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Record the result and unlock the next named stop.

## Stop 40 - Tighten forever

**Format/placement:** STRESS, asked by Mara Venn beside `forecast-table`.

**Metadata:** Concept: 25 - policy horizon; Keystone: Phillips/neutrality; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Mara Venn, at the forecast table in Rate Room.

**Stop reason - exact player copy:** The unseen-price test is complete, but a permanent tightening commitment still faces uncertainty.

**Question card story setup - exact player copy:** The withheld prices favor a temporary shock, while inflation expectations remain uncertain. The board’s policy requires review before making a permanent commitment.

**Question card prompt - exact player copy:** Inspect expectations from 1.8% to 2.4% in 0.2-point steps. Choose the plan that keeps monitoring active, permits reversal and does not claim that these expectations establish a permanent inflation shock.

**Complete format-specific interaction block - canonical source:**

```json
{
  "stress": {
    "model": {
      "expectations_percent": [
        1.8,
        2,
        2.2,
        2.4
      ],
      "evidence": "temporary model has lower held-out forecast error",
      "policy": "retain monitoring and reversibility until persistence is independently supported"
    },
    "candidates": [
      {
        "id": "permanent",
        "label": "Commit permanent tightening from the current print"
      },
      {
        "id": "ignore",
        "label": "Ignore future inflation evidence"
      },
      {
        "id": "conditional",
        "label": "Maintain a monitored conditional stance"
      }
    ],
    "correct": "conditional",
    "public_rule": "Use the displayed model and criterion over the entire stated range; no hidden preference scores."
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** A monitored conditional stance meets all three published requirements throughout the stated expectations range. This is a decision under the board’s policy, not an unstated numerical welfare optimum.

**Answer text:** A monitored conditional stance meets all three published requirements throughout the stated expectations range. This is a decision under the board’s policy, not an unstated numerical welfare optimum.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 10 signed.

### Character scene: changeover-mara-turn

**Trigger:** After Stop 40 is accepted.
**Location and presence:** `forecast-table` in Rate Room. Mara Venn, Board Chair, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Leaves the failed permanent-tightening claim visible beside the forecast.
**Exact dialogue:**
- Mara Venn, Board Chair: “I wanted one firm answer; that does not make one rate right for every condition.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-mara-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Do not tighten policy for a short price shock. New data support the supply-shock model. Slow money growth points to about 2% long-run inflation. Use set rules, not fear. Wage contracts will adjust later.

**Segue - exact player copy:** But Eli's wage contracts cannot reset for six weeks; self-correction may arrive after the families need help.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Lina Saye pins the 2% LONG-RUN INFLATION estimate beside the shock record. But Eli's wage contracts cannot reset for six weeks; self-correction may arrive after the families need help.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains short-run Phillips curve (SRPC)?

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
- B. Long-run money changes alter prices, not real output.
- C. Adverse supply shifts SRPC right; AD changes move along it.
- D. Short-run inverse inflation-unemployment relation.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for short-run phillips curve (srpc). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes long-run Phillips curve (LRPC). It does not answer the question about short-run phillips curve (srpc).
- B: This describes money neutrality. It does not answer the question about short-run phillips curve (srpc).
- C: This describes phillips curves. It does not answer the question about short-run phillips curve (srpc).
- D: Correct. Short-run inverse inflation-unemployment relation.

### Review question 2


**Prompt - exact player copy:** Which statement best explains long-run Phillips curve (LRPC)?

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

- A. Vertical curve at the natural rate.
- B. Short-run inverse inflation-unemployment relation.
- C. Long-run money changes alter prices, not real output.
- D. Adverse supply shifts SRPC right; AD changes move along it.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for long-run phillips curve (lrpc). All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Vertical curve at the natural rate.
- B: This describes short-run Phillips curve (SRPC). It does not answer the question about long-run phillips curve (lrpc).
- C: This describes money neutrality. It does not answer the question about long-run phillips curve (lrpc).
- D: This describes phillips curves. It does not answer the question about long-run phillips curve (lrpc).

### Review question 3


**Prompt - exact player copy:** Which statement best explains money neutrality?

**Options - exact player copy:**

- A. Short-run inverse inflation-unemployment relation.
- B. Long-run money changes alter prices, not real output.
- C. Vertical curve at the natural rate.
- D. Adverse supply shifts SRPC right; AD changes move along it.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for money neutrality. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes short-run Phillips curve (SRPC). It does not answer the question about money neutrality.
- B: Correct. Long-run money changes alter prices, not real output.
- C: This describes long-run Phillips curve (LRPC). It does not answer the question about money neutrality.
- D: This describes phillips curves. It does not answer the question about money neutrality.

### Review question 4


**Prompt - exact player copy:** Which statement best explains phillips curves?

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

- A. Short-run inverse inflation-unemployment relation.
- B. Vertical curve at the natural rate.
- C. Adverse supply shifts SRPC right; AD changes move along it.
- D. Long-run money changes alter prices, not real output.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for phillips curves. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes short-run Phillips curve (SRPC). It does not answer the question about phillips curves.
- B: This describes long-run Phillips curve (LRPC). It does not answer the question about phillips curves.
- C: Correct. Adverse supply shifts SRPC right; AD changes move along it.
- D: This describes money neutrality. It does not answer the question about phillips curves.

### Review question 5


**Prompt - exact player copy:** Which statement best explains quantity theory?

**Options - exact player copy:**

- A. Short-run inverse inflation-unemployment relation.
- B. Vertical curve at the natural rate.
- C. Long-run money changes alter prices, not real output.
- D. Money growth above real growth sets long-run inflation when velocity is stable.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for quantity theory. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes short-run Phillips curve (SRPC). It does not answer the question about quantity theory.
- B: This describes long-run Phillips curve (LRPC). It does not answer the question about quantity theory.
- C: This describes money neutrality. It does not answer the question about quantity theory.
- D: Correct. Money growth above real growth sets long-run inflation when velocity is stable.

### Review question 6


**Prompt - exact player copy:** Which statement best explains temporary vs persistent inflation?

**Options - exact player copy:**

- A. If a temporary supply disruption ends and price growth slows in new data, that evidence weakens a claim of permanently elevated inflation.
- B. Short-run inverse inflation-unemployment relation.
- C. Vertical curve at the natural rate.
- D. Long-run money changes alter prices, not real output.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for temporary vs persistent inflation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. If a temporary supply disruption ends and price growth slows in new data, that evidence weakens a claim of permanently elevated inflation.
- B: This describes short-run Phillips curve (SRPC). It does not answer the question about temporary vs persistent inflation.
- C: This describes long-run Phillips curve (LRPC). It does not answer the question about temporary vs persistent inflation.
- D: This describes money neutrality. It does not answer the question about temporary vs persistent inflation.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 11 - Too Late By Itself

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 11 - 5 DAYS UNTIL CHANGEOVER.

**Card title:** Too Late by Itself

**Go now:** Go to COUNTER and meet Eli Voss at the wage notices.

**Card body:** Five days remain. The wage deal will not change for six weeks. Today you decide which short-term help can arrive in time.

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

**Trigger:** mission_11_arrival.

**World state:** A wage contract's six-week date extends past changeover day.

**Panel/HUD text:** Compare market adjustment with a temporary policy bridge.

**Dialogue bubbles -** Eli Voss: "Start with adjustment order. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `queue-board` in Exchange Counter.

**Beat 2 - After Stop 41 | `ad-as-wall` | automatic**

**Trigger:** accepted_stop_41.

**World state:** At `queue-board`, the dated accepted-result slip for Stop 41 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. Self-correction returns Y to Yf, but wage adjustment starts after launch."

**Unlocks/waypoint:** Unlock Stop 42 at `ad-as-wall` in Statistics Floor.

**Beat 3 - After Stop 42 | `forecast-table` | automatic**

**Trigger:** accepted_stop_42.

**World state:** At `ad-as-wall`, the dated accepted-result slip for Stop 42 reads: "−7b ±0.1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** COUNTER → PRICES → RATE

**Dialogue bubbles -** Eli Voss: "Good thinking. Automatic stabilizers shrink the loss from 10 to 7 billion."

**Unlocks/waypoint:** Unlock Stop 43 at `forecast-table` in Rate Room.

**Beat 4 - After Stop 43 | `allocation-slate` | automatic**

**Trigger:** accepted_stop_43.

**World state:** At `forecast-table`, the dated accepted-result slip for Stop 43 reads: "Clearing, training, port repair and reserve funded within 100 points.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Fund clearing, training, port repair, and reserve."

**Unlocks/waypoint:** Unlock Stop 44 at `allocation-slate` in COUNTER.

**Beat 5 - At mission end | `queue-board` | automatic**

**Trigger:** accepted_stop_44.

**World state:** At `threshold-rail`, Rhea Dane clips the temporary bridge and expiry rule onto the threshold rail. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "Then write the end of the bridge before its first payment. But Tomas's reserve clock exposes a timing condition for 4.15; the conversion must work at the hour cash is due."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m11

**Home:** `threshold-rail`. **Before:** The dated mission-11 evidence holder at this fixture has no accepted record. A wage contract's six-week date extends past changeover day.
**After — exact action:** Rhea Dane clips the temporary bridge and expiry rule onto the threshold rail.
**Trigger:** accepted_stop_44. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `reserve-clock`, the reserve hands approach the payment mark from different sides.
**Segue - exact player copy:** But Tomas's reserve clock exposes a timing condition for 4.15; the conversion must work at the hour cash is due.

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

**Fixture source panel - exact player copy:** Because self-correction is late, disposable income falls 10 billion, but taxes fall 2 billion and transfers rise 1 billion automatically. Calculate the net income loss before induced consumption for the board. initial shock=-10 billion tax stabilizer=+2 billion transfer stabilizer=+1 billion

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Question card story setup - exact player copy:** The temporary response still needs payments to clear while people and the port recover capacity. The fund cannot cover every proposal.

**Decision evidence - exact player copy:** Required outcomes: keep household payments clearing; fund worker retraining; repair port capacity; protect contingency capacity.

**Question card prompt - exact player copy:** You have 100 bridge-fund points. Cover every required outcome and allocate the whole budget. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "allocate": {
    "budget": {
      "value": 100,
      "unit": "bridge-fund points"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "keep household payments clearing"
      },
      {
        "id": "r2",
        "text": "fund worker retraining"
      },
      {
        "id": "r3",
        "text": "repair port capacity"
      },
      {
        "id": "r4",
        "text": "protect contingency capacity"
      }
    ],
    "selection_rule": "Cover every required outcome and allocate the whole budget.",
    "options": [
      {
        "id": "clearing",
        "label": "Payment clearing",
        "cost": 30.0,
        "information": "Maintains household payment processing.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "training",
        "label": "Worker training",
        "cost": 25.0,
        "information": "Funds retraining for changed job requirements.",
        "covers": [
          "r2"
        ]
      },
      {
        "id": "port",
        "label": "Port repair",
        "cost": 25.0,
        "information": "Restores productive port infrastructure.",
        "covers": [
          "r3"
        ]
      },
      {
        "id": "reserve",
        "label": "Protected contingency reserve",
        "cost": 20.0,
        "information": "Keeps capacity for payment or restart failures.",
        "covers": [
          "r4"
        ]
      },
      {
        "id": "publicity",
        "label": "Confidence publicity",
        "cost": 20.0,
        "information": "Changes messaging without providing these services.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "clearing",
        "training",
        "port",
        "reserve"
      ]
    ],
    "example_total": 100.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** clearing, training, port, reserve = 100 bridge-fund points; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Record the result and unlock the next named stop.

## Stop 44 - Wait or bridge

**Format/placement:** VALUE, asked by Eli Voss beside `allocation-slate`.

**Metadata:** Concept: 26 - stabilization timing; Keystone: fiscal/growth; Area: Statistics Floor; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Eli Voss, at the allocation slate in Exchange Counter.

**Stop reason - exact player copy:** The timing and funding checks are complete and the board must choose the response's duration.

**Question card story setup - exact player copy:** Support is needed before wage adjustment can close the temporary gap. Eli needs an exit rule so a bridge does not become an indefinite commitment.

**Decision evidence - exact player copy:** Required outcomes: provide support during the adjustment delay; set an enforceable end date and review.

**Question card prompt - exact player copy:** You have 80 plan points. Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "value": {
    "budget": {
      "value": 80,
      "unit": "plan points"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "provide support during the adjustment delay"
      },
      {
        "id": "r2",
        "text": "set an enforceable end date and review"
      }
    ],
    "selection_rule": "Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve.",
    "options": [
      {
        "id": "temporary_bridge",
        "label": "Temporary demand bridge",
        "cost": 50.0,
        "information": "Provides support during the documented adjustment delay.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "sunset_review",
        "label": "Sunset and review clause",
        "cost": 30.0,
        "information": "Sets an end date and requires evidence before renewal.",
        "covers": [
          "r2"
        ]
      },
      {
        "id": "permanent_stimulus",
        "label": "Permanent stimulus",
        "cost": 80.0,
        "information": "Supports demand without an end date.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "wait",
        "label": "Wait without support",
        "cost": 0.0,
        "information": "Commits no temporary support or exit review; this standalone alternative cannot be combined with purchases.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "temporary_bridge",
        "sunset_review"
      ]
    ],
    "example_total": 80.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** temporary_bridge, sunset_review = 80 plan points; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 11.

### Character scene: changeover-rhea-turn

**Trigger:** After Stop 44 is accepted.
**Location and presence:** `allocation-slate` in Exchange Counter. Rhea Dane, finance minister, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Marks the bridge plan’s timing limits rather than repeating the announcement date.
**Exact dialogue:**
- Rhea Dane, finance minister: “An announcement does not pay a wage before the funds reach it.”
- Eli Voss, counter operations lead (radio): “The queue will still be here while an announcement works through the system.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-rhea-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Self-correction is too slow. Use automatic stabilizers and a short bridge for capital and training. End the plan when its trigger is met. Bank ledgers now show that 4.15 works only when reserves arrive on time.

**Segue - exact player copy:** But Tomas's reserve clock exposes a timing condition for 4.15; the conversion must work at the hour cash is due.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Rhea Dane clips the temporary bridge and expiry rule onto the threshold rail. But Tomas's reserve clock exposes a timing condition for 4.15; the conversion must work at the hour cash is due.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains self-correction?

**Options - exact player copy:**

- A. Taxes or transfers that change without a new law.
- B. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- C. Rising real gross domestic product (GDP) per person.
- D. Stabilizers reduce the initial shock without a new vote.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for self-correction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes automatic stabilizer. It does not answer the question about self-correction.
- B: Correct. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- C: This describes economic growth. It does not answer the question about self-correction.
- D: This describes automatic stabilizers. It does not answer the question about self-correction.

### Review question 2


**Prompt - exact player copy:** Which statement best explains automatic stabilizer?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Rising real gross domestic product (GDP) per person.
- C. Taxes or transfers that change without a new law.
- D. Stabilizers reduce the initial shock without a new vote.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for automatic stabilizer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes self-correction. It does not answer the question about automatic stabilizer.
- B: This describes economic growth. It does not answer the question about automatic stabilizer.
- C: Correct. Taxes or transfers that change without a new law.
- D: This describes automatic stabilizers. It does not answer the question about automatic stabilizer.

### Review question 3


**Prompt - exact player copy:** Which statement best explains economic growth?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Taxes or transfers that change without a new law.
- C. Stabilizers reduce the initial shock without a new vote.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for economic growth. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes self-correction. It does not answer the question about economic growth.
- B: This describes automatic stabilizer. It does not answer the question about economic growth.
- C: This describes automatic stabilizers. It does not answer the question about economic growth.
- D: Correct. Rising real gross domestic product (GDP) per person.

### Review question 4


**Prompt - exact player copy:** Which statement best explains automatic stabilizers?

**Options - exact player copy:**

- A. Stabilizers reduce the initial shock without a new vote.
- B. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- C. Taxes or transfers that change without a new law.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for automatic stabilizers. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Stabilizers reduce the initial shock without a new vote.
- B: This describes self-correction. It does not answer the question about automatic stabilizers.
- C: This describes automatic stabilizer. It does not answer the question about automatic stabilizers.
- D: This describes economic growth. It does not answer the question about automatic stabilizers.

### Review question 5


**Prompt - exact player copy:** Which statement best explains growth resources?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Human capital, physical capital, and technology shift productive capacity; publicity does not.
- C. Taxes or transfers that change without a new law.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for growth resources. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes self-correction. It does not answer the question about growth resources.
- B: Correct. Human capital, physical capital, and technology shift productive capacity; publicity does not.
- C: This describes automatic stabilizer. It does not answer the question about growth resources.
- D: This describes economic growth. It does not answer the question about growth resources.

### Review question 6


**Prompt - exact player copy:** Which statement best explains stabilization timing?

**Options - exact player copy:**

- A. Wage and input-cost adjustment that shifts short-run aggregate supply (SRAS) toward long-run equilibrium.
- B. Taxes or transfers that change without a new law.
- C. Temporary support can span a lag without becoming a permanent demand expansion.
- D. Rising real gross domestic product (GDP) per person.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for stabilization timing. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes self-correction. It does not answer the question about stabilization timing.
- B: This describes automatic stabilizer. It does not answer the question about stabilization timing.
- C: Correct. Temporary support can span a lag without becoming a permanent demand expansion.
- D: This describes economic growth. It does not answer the question about stabilization timing.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 12 - 4.15 On The Clock

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 12 - 4 DAYS UNTIL CHANGEOVER.

**Card title:** 4.15 on the Clock

**Go now:** Go to NOTES and meet Eli Voss at the conversion trays.

**Card body:** Four days remain. The bank clock nears the time when cash is due. Today you decide if the 4.15 exchange can clear on time.

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

**Trigger:** mission_12_arrival.

**World state:** The reserve hands approach the payment mark from different sides.

**Panel/HUD text:** Certify the conversion ratio with cash, bank, and foreign-market evidence.

**Dialogue bubbles -** Eli Voss: "Start with convert the tray. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 45 at `conversion-trays` in Note Hall.

**Beat 2 - After Stop 45 | `reserve-clock` | automatic**

**Trigger:** accepted_stop_45.

**World state:** At `conversion-trays`, the dated accepted-result slip for Stop 45 reads: "10,000 ±0.01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. The tray becomes 10,000 RATE."

**Unlocks/waypoint:** Unlock Stop 46 at `reserve-clock` in Bank Supervision.

**Beat 3 - After Stop 46 | `payment-wires` | automatic**

**Trigger:** accepted_stop_46.

**World state:** At `reserve-clock`, the dated accepted-result slip for Stop 46 reads: "The bank needs 1,000 RATE and has exactly 1,000 RATE at minute 6, so the inclusive rule permits clearing then.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NOTES → BANKS → TRADE

**Dialogue bubbles -** Eli Voss: "Good thinking. The reserve arrives exactly at the inclusive 1,000-RATE requirement."

**Unlocks/waypoint:** Unlock Stop 47 at `payment-wires` in Open-Economy Floor.

**Beat 4 - After Stop 47 | `custody-desk` | automatic**

**Trigger:** accepted_stop_47.

**World state:** At `payment-wires`, the dated accepted-result slip for Stop 47 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. Three channels share the 4.00 shortcut; independent customs supports 4.15."

**Unlocks/waypoint:** Unlock Stop 48 at `custody-desk` in NOTES.

**Beat 5 - At mission end | `conversion-trays` | automatic**

**Trigger:** accepted_stop_48.

**World state:** At `reserve-clock`, Tomas Arendt pins the verified 4.15 timing strip beneath the reserve clock. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Arendt: "The ratio passes only if the money arrives when the tray opens. But Soren brings lost export orders and refused loans; the full deficit may crowd out the recovery twice."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m12

**Home:** `reserve-clock`. **Before:** The dated mission-12 evidence holder at this fixture has no accepted record. The reserve hands approach the payment mark from different sides.
**After — exact action:** Tomas Arendt pins the verified 4.15 timing strip beneath the reserve clock.
**Trigger:** accepted_stop_48. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `policy-wall`, loan refusals and lost export orders share the spending folder.
**Segue - exact player copy:** But Soren brings lost export orders and refused loans; the full deficit may crowd out the recovery twice.

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

**Fixture source panel - exact player copy:** A tray contains 41,500 old crowns, and the legal ratio is 4.15 crowns per RATE. Calculate the new balance before the notes can leave custody in the Rate Book.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

### Character scene: changeover-tomas-payoff

**Trigger:** After Stop 46 is accepted.
**Location and presence:** `reserve-clock` in Bank Supervision. Tomas Arendt, bank supervision lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the measured reserve-arrival time beside the opening schedule.
**Exact dialogue:**
- Tomas Arendt, bank supervision lead: “These funds arrive in time for this operation; that is a claim we have actually tested.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-tomas-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


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

**Question card story setup - exact player copy:** Conversion, reserve timing and the customs rate have separate records. Check each before signing the first-week file.

**Question card prompt - exact player copy:** Use the validated 4.15 crowns/RATE conversion; reserve requirements are inclusive. Read the displayed source excerpts, then select every supported claim and leave unsupported claims unsigned.

**Complete format-specific interaction block - canonical source:**

```json
{
  "attest": {
    "claims": [
      {
        "id": "tray",
        "label": "The tray converts to 10,000 RATE",
        "evidence": "The audited tray contains 41,500 crowns; its conversion rate is 4.15 crowns per RATE."
      },
      {
        "id": "reserve",
        "label": "The bank can clear at minute 6",
        "evidence": "The reserve ledger records 1,000 RATE at minute 6 against a requirement of at least 1,000 RATE."
      },
      {
        "id": "customs",
        "label": "Customs uses the validated conversion",
        "evidence": "The independent customs rate record states 4.15 crowns per RATE."
      },
      {
        "id": "shop_labels",
        "label": "The unchanged shop labels are safe",
        "evidence": "The shop labels still use 4.00 crowns per RATE."
      }
    ],
    "selection_rule": "Support must be present in the displayed source excerpt and within its scope; a signature or repeated copy alone is insufficient.",
    "correct_signed": [
      "tray",
      "reserve",
      "customs"
    ],
    "checks": 3
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** Sign tray, reserve, customs; leave the other claims unsigned.

**Answer text:** Each signature is limited to what its source establishes. The unsupported claims lack the specific date, physical condition, independence or scope they assert.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 12.

### Character scene: changeover-eli-payoff

**Trigger:** After Stop 48 is accepted.
**Location and presence:** `custody-desk` in Note Hall. Eli Voss, counter operations lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the accepted custody and timing checks with the operating roster.
**Exact dialogue:**
- Eli Voss, counter operations lead: “I can open a counter on this evidence, with the cash and staff due at the right time.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-eli-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Use the 4.15 exchange rate. Exact tray math, reserve timing, and customs data agree. The full test now works. Yet new state debt is pushing real rates up.

**Segue - exact player copy:** But Soren brings lost export orders and refused loans; the full deficit may crowd out the recovery twice.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Tomas Arendt pins the verified 4.15 timing strip beneath the reserve clock. But Soren brings lost export orders and refused loans; the full deficit may crowd out the recovery twice.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains conversion ratio?

**Options - exact player copy:**

- A. Timed schedule that keeps required reserves available.
- B. Exact conversion prevents rounding from creating a false price jump.
- C. Correct totals can still fail when their timing differs.
- D. Old currency units exchanged for one new unit.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for conversion ratio. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes reserve clock. It does not answer the question about conversion ratio.
- B: This describes conversion arithmetic. It does not answer the question about conversion ratio.
- C: This describes reserve timing. It does not answer the question about conversion ratio.
- D: Correct. Old currency units exchanged for one new unit.

### Review question 2


**Prompt - exact player copy:** Which statement best explains reserve clock?

**Options - exact player copy:**

- A. Timed schedule that keeps required reserves available.
- B. Old currency units exchanged for one new unit.
- C. Exact conversion prevents rounding from creating a false price jump.
- D. Correct totals can still fail when their timing differs.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for reserve clock. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Timed schedule that keeps required reserves available.
- B: This describes conversion ratio. It does not answer the question about reserve clock.
- C: This describes conversion arithmetic. It does not answer the question about reserve clock.
- D: This describes reserve timing. It does not answer the question about reserve clock.

### Review question 3


**Prompt - exact player copy:** Which statement best explains conversion arithmetic?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Exact conversion prevents rounding from creating a false price jump.
- C. Timed schedule that keeps required reserves available.
- D. Correct totals can still fail when their timing differs.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for conversion arithmetic. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conversion ratio. It does not answer the question about conversion arithmetic.
- B: Correct. Exact conversion prevents rounding from creating a false price jump.
- C: This describes reserve clock. It does not answer the question about conversion arithmetic.
- D: This describes reserve timing. It does not answer the question about conversion arithmetic.

### Review question 4


**Prompt - exact player copy:** Which statement best explains reserve timing?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Timed schedule that keeps required reserves available.
- C. Correct totals can still fail when their timing differs.
- D. Exact conversion prevents rounding from creating a false price jump.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for reserve timing. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conversion ratio. It does not answer the question about reserve timing.
- B: This describes reserve clock. It does not answer the question about reserve timing.
- C: Correct. Correct totals can still fail when their timing differs.
- D: This describes conversion arithmetic. It does not answer the question about reserve timing.

### Review question 5


**Prompt - exact player copy:** Which statement best explains conversion and forex?

**Options - exact player copy:**

- A. Old currency units exchanged for one new unit.
- B. Timed schedule that keeps required reserves available.
- C. Exact conversion prevents rounding from creating a false price jump.
- D. Shared conversion dependence can manufacture agreement across prices and assets.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for conversion and forex. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conversion ratio. It does not answer the question about conversion and forex.
- B: This describes reserve clock. It does not answer the question about conversion and forex.
- C: This describes conversion arithmetic. It does not answer the question about conversion and forex.
- D: Correct. Shared conversion dependence can manufacture agreement across prices and assets.

### Review question 6


**Prompt - exact player copy:** Which statement best explains certification?

**Options - exact player copy:**

- A. Operational safety requires arithmetic, timing, and independent market evidence.
- B. Old currency units exchanged for one new unit.
- C. Timed schedule that keeps required reserves available.
- D. Exact conversion prevents rounding from creating a false price jump.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for certification. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Operational safety requires arithmetic, timing, and independent market evidence.
- B: This describes conversion ratio. It does not answer the question about certification.
- C: This describes reserve clock. It does not answer the question about certification.
- D: This describes conversion arithmetic. It does not answer the question about certification.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 13 - Crowded Out Twice

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 13 - 3 DAYS UNTIL CHANGEOVER.

**Card title:** Crowded Out Twice

**Go now:** Go to RATE and meet Rhea Dane at the loanable-funds board.

**Card body:** 3 days until changeover. Loan refusals and lost export orders share the spending folder. Today you decide how much of the bridge the economy can bear.

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

**Trigger:** mission_13_arrival.

**World state:** Loan refusals and lost export orders share the spending folder.

**Panel/HUD text:** Measure domestic and foreign crowding out.

**Dialogue bubbles -** Rhea Dane: "Start with real-rate market. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `policy-wall` in Rate Room.

**Beat 2 - After Stop 49 | `money-market-console` | automatic**

**Trigger:** accepted_stop_49.

**World state:** At `policy-wall`, the dated accepted-result slip for Stop 49 reads: "Adding 8.7 billion of borrowing raises the real rate by 0.6 percentage point and cuts private investment by 6 billion; restoration recovers the baseline.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Rhea Dane: "Nice work. Borrowing raises real i 0.6 point and reduces I 6 billion."

**Unlocks/waypoint:** Unlock Stop 50 at `money-market-console` in Bank Supervision.

**Beat 3 - After Stop 50 | `payment-wires` | automatic**

**Trigger:** accepted_stop_50.

**World state:** At `money-market-console`, the dated accepted-result slip for Stop 50 reads: "A deficit raises loan demand and the real rate, crowds out private investment, slows capital growth, and reduces long-run growth.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Rhea Dane: "Good thinking. Deficit → loanable-funds demand right → real interest rises → private investment falls → capital accumulation slows → long-run growth slows."

**Unlocks/waypoint:** Unlock Stop 51 at `payment-wires` in Open-Economy Floor.

**Beat 4 - After Stop 51 | `signing-desk` | automatic**

**Trigger:** accepted_stop_51.

**World state:** At `payment-wires`, the dated accepted-result slip for Stop 51 reads: "Fiscal expansion raises real rates, draws in capital, appreciates RATE, lowers net exports, and offsets part of the aggregate-demand gain.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Rhea Dane: "Exactly right. Fiscal expansion → real interest rises → capital inflow → demand for RATE right → appreciation → net exports fall → aggregate-demand offset."

**Unlocks/waypoint:** Unlock Stop 52 at `signing-desk` in RATE.

**Beat 5 - At mission end | `policy-wall` | automatic**

**Trigger:** accepted_stop_52.

**World state:** At `policy-wall`, Rhea Dane replaces the full bridge order with the smaller temporary plan. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Rhea Dane: "That smaller order hurts to sign. The larger one would hurt twice. But Nia's port call brings a fresh fuel shock before launch; the first week needs its own cover."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m13

**Home:** `policy-wall`. **Before:** The dated mission-13 evidence holder at this fixture has no accepted record. Loan refusals and lost export orders share the spending folder.
**After — exact action:** Rhea Dane replaces the full bridge order with the smaller temporary plan.
**Trigger:** accepted_stop_52. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `threshold-rail`, a fuel bulletin lands beside a completed conversion test.
**Segue - exact player copy:** But Nia's port call brings a fresh fuel shock before launch; the first week needs its own cover.

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

**Fixture source panel - exact player copy:** With private investment down 6 billion, build the domestic crowding-out chain from deficit to slower capital accumulation. Do not substitute nominal money-market rates for the measured real rate for the board.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Fixture source panel - exact player copy:** Because Halvern's real rate rises, foreign capital enters, demand for RATE rises, and the currency appreciates. Complete the chain through net exports and AD clearly in the Rate Book for review.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

**Question card story setup - exact player copy:** Domestic and foreign offsets weaken the case for a large debt-financed package. Rhea needs temporary support alongside repair of the two remaining capacity constraints.

**Decision evidence - exact player copy:** Required outcomes: supply the narrowed temporary bridge; address worker mismatch; restore port supply capacity. The adopted policy is to fund the remaining gap, not the superseded gross gap; all three outcomes are required.

**Question card prompt - exact player copy:** You have 100 plan points. Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "value": {
    "budget": {
      "value": 100,
      "unit": "plan points"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "supply the narrowed temporary bridge"
      },
      {
        "id": "r2",
        "text": "address worker mismatch"
      },
      {
        "id": "r3",
        "text": "restore port supply capacity"
      }
    ],
    "selection_rule": "Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve.",
    "options": [
      {
        "id": "narrow_bridge",
        "label": "Narrow temporary bridge",
        "cost": 45.0,
        "information": "Targets the remaining demand gap after the measured offsets.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "training",
        "label": "Worker training",
        "cost": 25.0,
        "information": "Addresses the documented mismatch between skills and jobs.",
        "covers": [
          "r2"
        ]
      },
      {
        "id": "port",
        "label": "Port repair",
        "cost": 30.0,
        "information": "Restores the documented port capacity constraint.",
        "covers": [
          "r3"
        ]
      },
      {
        "id": "full_bridge",
        "label": "Full debt-financed bridge",
        "cost": 80.0,
        "information": "Funds the original larger demand package, with no training or port work.",
        "covers": []
      },
      {
        "id": "publicity",
        "label": "Publicity campaign",
        "cost": 20.0,
        "information": "Changes messaging without repairing the demand or capacity constraints.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "narrow_bridge",
        "training",
        "port"
      ]
    ],
    "example_total": 100.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** narrow_bridge, training, port = 100 plan points; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Page 13.

### Character scene: changeover-rhea-payoff

**Trigger:** After Stop 52 is accepted.
**Location and presence:** `signing-desk` in Rate Room. Rhea Dane, finance minister, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Amends the proposed bridge to the accepted smaller conditional package.
**Exact dialogue:**
- Rhea Dane, finance minister: “I will explain the smaller package myself, including why keeping the larger promise would cost more.”
- Eli Voss, counter operations lead (radio): “I can explain the bridge you can deliver more honestly than the larger one you cannot.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-rhea-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Replace the full bridge with a smaller short-term plan. The full deficit raises real rates. It cuts private investment and net exports. The new plan protects both people and future growth.

**Segue - exact player copy:** But Nia's port call brings a fresh fuel shock before launch; the first week needs its own cover.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Rhea Dane replaces the full bridge order with the smaller temporary plan. But Nia's port call brings a fresh fuel shock before launch; the first week needs its own cover.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains budget deficit?

**Options - exact player copy:**

- A. Government borrowing raises real interest and reduces private investment.
- B. Government spending above tax revenue.
- C. A rightward loan-demand shift raises real interest and crowds out private investment.
- D. Fiscal expansion crowds out NX as well as private investment.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for budget deficit. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes crowding out. It does not answer the question about budget deficit.
- B: Correct. Government spending above tax revenue.
- C: This describes loanable funds. It does not answer the question about budget deficit.
- D: This describes fiscal and forex. It does not answer the question about budget deficit.

### Review question 2


**Prompt - exact player copy:** Which statement best explains crowding out?

**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. A rightward loan-demand shift raises real interest and crowds out private investment.
- C. Government borrowing raises real interest and reduces private investment.
- D. Fiscal expansion crowds out NX as well as private investment.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for crowding out. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes budget deficit. It does not answer the question about crowding out.
- B: This describes loanable funds. It does not answer the question about crowding out.
- C: Correct. Government borrowing raises real interest and reduces private investment.
- D: This describes fiscal and forex. It does not answer the question about crowding out.

### Review question 3


**Prompt - exact player copy:** Which statement best explains loanable funds?

**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. Government borrowing raises real interest and reduces private investment.
- C. Fiscal expansion crowds out NX as well as private investment.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for loanable funds. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes budget deficit. It does not answer the question about loanable funds.
- B: This describes crowding out. It does not answer the question about loanable funds.
- C: This describes fiscal and forex. It does not answer the question about loanable funds.
- D: Correct. A rightward loan-demand shift raises real interest and crowds out private investment.

### Review question 4


**Prompt - exact player copy:** Which statement best explains fiscal and forex?

**Options - exact player copy:**

- A. Fiscal expansion crowds out NX as well as private investment.
- B. Government spending above tax revenue.
- C. Government borrowing raises real interest and reduces private investment.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for fiscal and forex. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Fiscal expansion crowds out NX as well as private investment.
- B: This describes budget deficit. It does not answer the question about fiscal and forex.
- C: This describes crowding out. It does not answer the question about fiscal and forex.
- D: This describes loanable funds. It does not answer the question about fiscal and forex.

### Review question 5


**Prompt - exact player copy:** Which statement best explains fiscal redesign?

**Options - exact player copy:**

- A. Government spending above tax revenue.
- B. Targeted temporary support reduces crowding out while preserving long-run growth.
- C. Government borrowing raises real interest and reduces private investment.
- D. A rightward loan-demand shift raises real interest and crowds out private investment.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for fiscal redesign. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes budget deficit. It does not answer the question about fiscal redesign.
- B: Correct. Targeted temporary support reduces crowding out while preserving long-run growth.
- C: This describes crowding out. It does not answer the question about fiscal redesign.
- D: This describes loanable funds. It does not answer the question about fiscal redesign.

### Review question 6


**Prompt - exact player copy:** Which statement best explains production possibilities curve (PPC)?

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

**Hint - exact player copy:** Identify the defining relationship or mechanism for production possibilities curve (ppc). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes budget deficit. It does not answer the question about production possibilities curve (ppc).
- B: This describes crowding out. It does not answer the question about production possibilities curve (ppc).
- C: Correct. A graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- D: This describes loanable funds. It does not answer the question about production possibilities curve (ppc).

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 14 - First-Week Cover

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 14 - 2 DAYS UNTIL CHANGEOVER.

**Card title:** First-Week Cover

**Go now:** Go to TRADE and meet Nia Corren at the port wire.

**Card body:** Two days remain. A new fuel alert lands beside the passed cash test. Today you decide whether to delay the launch or add short-term help.

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

**Trigger:** mission_14_arrival.

**World state:** A fuel bulletin lands beside a completed conversion test.

**Panel/HUD text:** Protect launch without confusing a supply shock with a broken currency.

**Dialogue bubbles -** Nia Corren: "Start with shock identity. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `trade-ledger` in Open-Economy Floor.

**Beat 2 - After Stop 53 | `price-history-board` | automatic**

**Trigger:** accepted_stop_53.

**World state:** At `trade-ledger`, the dated accepted-result slip for Stop 53 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Nia Corren: "Nice work. The fuel disruption shifts SRAS left; 4.15 and payments remain sound."

**Unlocks/waypoint:** Unlock Stop 54 at `price-history-board` in Statistics Floor.

**Beat 3 - After Stop 54 | `forecast-table` | automatic**

**Trigger:** accepted_stop_54.

**World state:** At `price-history-board`, the dated accepted-result slip for Stop 54 reads: "The direct CPI effect is 2.4 percentage points; returning fuel to baseline returns the direct effect to zero.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** TRADE → PRICES → RATE

**Dialogue bubbles -** Nia Corren: "Good thinking. The direct basket effect is 2.4%; restoration returns baseline."

**Unlocks/waypoint:** Unlock Stop 55 at `forecast-table` in Rate Room.

**Beat 4 - After Stop 55 | `threshold-rail` | automatic**

**Trigger:** accepted_stop_55.

**World state:** At `forecast-table`, the dated accepted-result slip for Stop 55 reads: "Conversion proceeds with temporary cover and the inflation guard.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Nia Corren: "Exactly right. Proceed at 4.15 with temporary first-week cover."

**Unlocks/waypoint:** Unlock Stop 56 at `threshold-rail` in Rate Room.

**Beat 5 - At mission end | `trade-ledger` | automatic**

**Trigger:** accepted_stop_56.

**World state:** At `threshold-rail`, Mara Venn pins the first-week cover card beside the emergency triggers. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Venn: "Keep the date. Keep the promise to review the cost. Therefore Tomas must prove reserves once more before tomorrow's opening; the fuel shock cannot excuse a broken payment."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m14

**Home:** `threshold-rail`. **Before:** The dated mission-14 evidence holder at this fixture has no accepted record. A fuel bulletin lands beside a completed conversion test.
**After — exact action:** Mara Venn pins the first-week cover card beside the emergency triggers.
**Trigger:** accepted_stop_56. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `conversion-desk`, new notes wait under a cloth behind the closed counter.
**Segue - exact player copy:** Therefore Tomas must prove reserves once more before tomorrow's opening; the fuel shock cannot excuse a broken payment.

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

### Character scene: changeover-lina-payoff

**Trigger:** After Stop 54 is accepted.
**Location and presence:** `price-history-board` in Statistics Floor. Lina Saye, price statistics lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Attaches the independently tested pass-through result to the price record.
**Exact dialogue:**
- Lina Saye, price statistics lead: “This estimate has faced new prices; the old series alone could not answer that question.”
- Idris Pell, national accounts chief (radio): “I will keep the tested price effect separate from real output.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-lina-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 55 - Full model stress

**Format/placement:** STRESS, asked by Nia Corren beside `forecast-table`.

**Metadata:** Concept: 24 - integrated policy; Keystone: all keystones; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: L5.

**Call - exact player copy:** Talk to Nia Corren, at the forecast table in Rate Room.

**Stop reason - exact player copy:** The fuel estimate is ready and the full plan must withstand the combined disturbances.

**Question card story setup - exact player copy:** The conversion ratio has passed its accounting checks, but a fuel shock can still raise household costs. The board requires payment continuity and temporary cover without abandoning its inflation guard.

**Question card prompt - exact player copy:** Sweep fuel prices through increases of 8%, 12% and 16%. With basket weight 20%, compute the direct price contribution and select the plan preserving conversion, temporary cover and the review guard in every case.

**Complete format-specific interaction block - canonical source:**

```json
{
  "stress": {
    "model": {
      "fuel_percent": [
        8,
        12,
        16
      ],
      "weight": 0.2,
      "direct_CPI_pp": [
        1.6,
        2.4,
        3.2
      ],
      "policy": "retain validated conversion; keep payments operating; use temporary cover with an inflation stop rule",
      "options_effects": {
        "delay": "postpones conversion and payment clearing",
        "unconditional_ease": "expands support without a stop rule",
        "conversion_cover": "retains conversion 4.15, temporary first-week cover and the committed inflation guard"
      }
    },
    "candidates": [
      {
        "id": "delay",
        "label": "Delay conversion and clearing"
      },
      {
        "id": "unconditional_ease",
        "label": "Ease without a stopping rule"
      },
      {
        "id": "conversion_cover",
        "label": "Proceed with conversion and temporary guarded cover"
      }
    ],
    "correct": "conversion_cover",
    "public_rule": "Use the displayed model and criterion over the entire stated range; no hidden preference scores."
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** Direct contributions are 1.6, 2.4 and 3.2 percentage points. Conversion with temporary guarded cover meets the stated requirements; this limited model does not quantify total output or establish a universal policy optimum.

**Answer text:** Direct contributions are 1.6, 2.4 and 3.2 percentage points. Conversion with temporary guarded cover meets the stated requirements; this limited model does not quantify total output or establish a universal policy optimum.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Record the result and unlock the next named stop.

### Character scene: changeover-nia-payoff

**Trigger:** After Stop 55 is accepted.
**Location and presence:** `forecast-table` in Rate Room. Nia Corren, open-economy analyst, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Retains the stressed exchange-rate consequences in the final forecast.
**Exact dialogue:**
- Nia Corren, open-economy analyst: “The board gets both sides of the currency move before it chooses.”
- Soren Vale, export council liaison (radio): “That gives us a case for specific cover instead of a promise that one currency move helps everyone.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-nia-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 56 - Write thresholds first

**Format/placement:** TRIGGER, at `threshold-rail`.

**Metadata:** Concept: 26 - conditional policy; Keystone: policy lag; Area: Rate Room; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the threshold rail, in Rate Room.

**Stop reason - exact player copy:** The robust plan is chosen, but emergency action still needs rules written before the first-week data arrive.

**Question card story setup - exact player copy:** The robust plan proceeds, but emergency bond buying must not activate from one noisy price print. Write output and payment thresholds before the sealed first-week update appears in the Rate Book.

**Question card story-science connection - exact player copy:** Precommitted output and payment thresholds prevent a noisy price reading from triggering an improvised intervention.

**Decision evidence - exact player copy:** Published emergency policy: buy bonds only when real-output nowcast≤680 billion AND payment failures≥2%; CPI companion≥6.5% stops buying and overrides both entry conditions. Freeze the three thresholds before opening the update.

**Question card prompt - exact player copy:** Enter all three numeric thresholds, submit the rule, then reveal the sealed update; expected response is a trigger plan.

**Complete format-specific interaction block:** `rule:"Buy bonds only if real-output nowcast ≤680b AND payment failures ≥2%; stop if CPI companion ≥6.5%"; scale:{min:0,max:10,anchors:[680,2,6.5]}; objective:"protect output/payments"; direction:"buy bonds"; consequence_limit:"CPI 6.5"`.


**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Proceed with cover; buy bonds only at the joint output/payment trigger and stop at the CPI limit.”

**Why:** Precommitment makes intervention reversible and evidence-based.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Precommitment makes intervention reversible and evidence-based.

**State/output:** Page 14; READINESS locks.

## Mission outcome

Mission decision: Do not delay conversion. add temporary first-week cover. The fuel shock is real. But the 4.15 ratio and payments remain sound. The board posts joint action.

**Segue - exact player copy:** Therefore Tomas must prove reserves once more before tomorrow's opening; the fuel shock cannot excuse a broken payment.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Mara Venn pins the first-week cover card beside the emergency triggers. Therefore Tomas must prove reserves once more before tomorrow's opening; the fuel shock cannot excuse a broken payment.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Which statement best explains policy lag?

**Options - exact player copy:**

- A. A precommitted threshold that activates action.
- B. Total planned spending at each price level.
- C. A real supply shock can hurt output without invalidating the currency conversion.
- D. Delay between action and full economic effect.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for policy lag. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes trigger. It does not answer the question about policy lag.
- B: This describes aggregate demand (AD). It does not answer the question about policy lag.
- C: This describes supply shock. It does not answer the question about policy lag.
- D: Correct. Delay between action and full economic effect.

### Review question 2


**Prompt - exact player copy:** Which statement best explains trigger?

**Options - exact player copy:**

- A. A precommitted threshold that activates action.
- B. Delay between action and full economic effect.
- C. Total planned spending at each price level.
- D. A real supply shock can hurt output without invalidating the currency conversion.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for trigger. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A precommitted threshold that activates action.
- B: This describes policy lag. It does not answer the question about trigger.
- C: This describes aggregate demand (AD). It does not answer the question about trigger.
- D: This describes supply shock. It does not answer the question about trigger.

### Review question 3


**Prompt - exact player copy:** Which statement best explains aggregate demand (AD)?

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
- B. Total planned spending at each price level.
- C. A precommitted threshold that activates action.
- D. A real supply shock can hurt output without invalidating the currency conversion.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for aggregate demand (ad). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes policy lag. It does not answer the question about aggregate demand (ad).
- B: Correct. Total planned spending at each price level.
- C: This describes trigger. It does not answer the question about aggregate demand (ad).
- D: This describes supply shock. It does not answer the question about aggregate demand (ad).

### Review question 4


**Prompt - exact player copy:** A currency conversion is arithmetically correct and payments clear, but a shortage raises imported fuel prices. What follows?

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
- B. A precommitted threshold that activates action.
- C. The real supply shock can hurt output without proving that the currency conversion is wrong.
- D. Total planned spending at each price level.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for supply shock. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes policy lag. It does not answer the question about supply shock.
- B: This describes trigger. It does not answer the question about supply shock.
- C: Correct. The real supply shock can hurt output without proving that the currency conversion is wrong.
- D: This describes aggregate demand (AD). It does not answer the question about supply shock.

### Review question 5


**Prompt - exact player copy:** Which statement best explains CPI and supply?

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
- B. A precommitted threshold that activates action.
- C. Total planned spending at each price level.
- D. A bounded relative-price shock should not be mistaken for unlimited inflation.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for cpi and supply. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes policy lag. It does not answer the question about cpi and supply.
- B: This describes trigger. It does not answer the question about cpi and supply.
- C: This describes aggregate demand (AD). It does not answer the question about cpi and supply.
- D: Correct. A bounded relative-price shock should not be mistaken for unlimited inflation.

### Review question 6


**Prompt - exact player copy:** A currency conversion passes independent arithmetic and payment tests, but imported fuel becomes more expensive. Which policy distinction matters?

**Options - exact player copy:**

- A. A valid conversion can be retained while the separate supply shock is addressed on its own evidence.
- B. Delay between action and full economic effect.
- C. A precommitted threshold that activates action.
- D. Total planned spending at each price level.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for integrated policy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A valid conversion can be retained while the separate supply shock is addressed on its own evidence.
- B: This describes policy lag. It does not answer the question about integrated policy.
- C: This describes trigger. It does not answer the question about integrated policy.
- D: This describes aggregate demand (AD). It does not answer the question about integrated policy.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 15 - Sign With Conditions

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 15 - 1 DAY UNTIL CHANGEOVER.

**Card title:** Sign with Conditions

**Go now:** Go to COUNTER and meet Eli Voss at the live queue board.

**Card body:** One day remains. New notes wait under a cloth at the shut counter. Today you decide whether to open with the signed rules.

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

**Trigger:** mission_15_arrival.

**World state:** New notes wait under a cloth behind the closed counter.

**Panel/HUD text:** Make the final integrated, reversible macroeconomic decision.

**Dialogue bubbles -** Eli Voss: "Start with live economy panel. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `live-economy-panel` in Exchange Counter.

**Beat 2 - After Stop 57 | `reserve-clock` | automatic**

**Trigger:** accepted_stop_57.

**World state:** At `live-economy-panel`, the dated accepted-result slip for Stop 57 reads: "−38b; no trigger.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Eli Voss: "Nice work. The gap is −38 billion; payment failures 0.5% do not meet the 2% trigger."

**Unlocks/waypoint:** Unlock Stop 58 at `reserve-clock` in Bank Supervision.

**Beat 3 - After Stop 58 | `threshold-rail` | automatic**

**Trigger:** accepted_stop_58.

**World state:** At `reserve-clock`, the dated accepted-result slip for Stop 58 reads: "(1.00%,2b).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** RATE → BANKS → COUNTER

**Dialogue bubbles -** Eli Voss: "Good thinking. At 3.25%, the real rate is 1.00% and banks retain 2 billion excess reserves."

**Unlocks/waypoint:** Unlock Stop 59 at `threshold-rail` in Rate Room.

**Beat 4 - After Stop 59 | `conversion-desk` | automatic**

**Trigger:** accepted_stop_59.

**World state:** At `threshold-rail`, the dated accepted-result slip for Stop 59 reads: "The keyed result shown by the completed interaction.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Eli Voss: "Exactly right. The real rate links investment, AD, capital flows, currency, NX, and growth; CPI and payment limits independently govern reversal."

**Unlocks/waypoint:** Unlock Stop 60 at `conversion-desk` in COUNTER.

**Beat 5 - At mission end | `live-economy-panel` | automatic**

**Trigger:** accepted_stop_60.

**World state:** At `conversion-desk`, Mara Venn turns the counter-opening key. The final scene follows the completion gate below.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Venn: "You gave us conditions we can live by after the cameras leave. Therefore Eli can make the first exchange at 4.15 while the signed 3.25% policy rate and reversal rules stay on the wall."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — changeover-m15

**Home:** `conversion-desk`. **Before:** The dated mission-15 evidence holder at this fixture has no accepted record. New notes wait under a cloth behind the closed counter.
**After — exact action:** Mara Venn turns the counter-opening key.
**Trigger:** accepted_stop_60; final scene requires the completion gate in section 8.1. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `conversion-desk`, the signed operating conditions remain beside the final status.
**Segue - exact player copy:** Therefore Eli can make the first exchange at 4.15 while the signed 3.25% policy rate and reversal rules stay on the wall.

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

**Question card story setup - exact player copy:** The final dashboard shows weak output while the fuel shock eases. The team must read the indicators separately before choosing its response.

**Question card prompt - exact player copy:** Real output is 682 billion against full employment of 720 billion. Unemployment is 8.2%, inflation 3%, payment failures 0.5%, and fuel costs are easing. Calculate actual minus full-employment output using the two output levels.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Live economy panel",
    "labels": [
      "682",
      "720",
      "8.2",
      "3",
      "0.5"
    ],
    "values": [
      682,
      720,
      8.2,
      3,
      0.5
    ],
    "slots": 2,
    "template": "{a}-{b} = ? billion real-output units",
    "formula": "a-b",
    "correct": [
      0,
      1
    ],
    "target": -38,
    "tolerance": 0.01,
    "units": "billion real-output units",
    "correctResult": -38
  },
  "answerText": "The output gap is −38 billion. The other readings do not establish a joint inflation-and-payment-failure trigger; the gap alone does not authorize a policy choice.",
  "wrongFeedback": [
    "Do not mix a percentage indicator into a difference between output levels."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** The output gap is −38 billion. The other readings do not establish a joint inflation-and-payment-failure trigger; the gap alone does not authorize a policy choice.

**Wrong-path feedback:** Do not mix a percentage indicator into a difference between output levels.

**State/output:** Record the result and unlock the next named stop.

### Character scene: changeover-idris-payoff

**Trigger:** After Stop 57 is accepted.
**Location and presence:** `live-economy-panel` in Exchange Counter. Idris Pell, national accounts chief, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Checks that the live-economy panel uses the accepted definitions and real measures.
**Exact dialogue:**
- Idris Pell, national accounts chief: “Use the same scope here as in the ledger; a new headline does not change what we counted.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-idris-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 58 - Rate pair

**Format/placement:** DERIVE, at `reserve-clock`.

**Metadata:** Concept: 23 - Fisher and reserves; Keystone: rates/money; Area: Bank Supervision; Learning role: RETRIEVE; Difficulty: L4; Story role: L4.

**Call - exact player copy:** Go to the reserve clock, in Bank Supervision.

**Stop reason - exact player copy:** The live panel is checked, leaving the real borrowing rate and reserve cushion to calculate.

**Question card story setup - exact player copy:** Expected inflation is 2.25%, the proposed nominal rate is 3.25%, deposits are 120 billion, reserves are 14 billion, and rr is 10%. Derive real rate and excess reserves.

**Question card story-science connection - exact player copy:** The rate-reserve pair tests the policy stance and bank liquidity using today's actual inputs.

**Fixture source panel - exact player copy:** Expected inflation is 2.25%, the proposed nominal rate is 3.25%, deposits are 120 billion, reserves are 14 billion, and rr is 10%. Derive real rate and excess reserves.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

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

### Character scene: changeover-soren-payoff

**Trigger:** After Stop 59 is accepted.
**Location and presence:** `threshold-rail` in Rate Room. Soren Vale, export council liaison, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Retains the exporter consequences beside the final threshold audit.
**Exact dialogue:**
- Soren Vale, export council liaison: “Keep the first-week cover tied to the costs we can show.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-soren-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 60 - Sign

**Format/placement:** TRIGGER, at `conversion-desk`.

**Metadata:** Concept: 24 - final policy; Keystone: all keystones; Area: Rate Room; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Call - exact player copy:** Go to the conversion desk, in Exchange Counter.

**Stop reason - exact player copy:** All final checks are assembled and the currency plan is ready for authorization.

**Question card story setup - exact player copy:** Enter the final numbers and sign only if every bar is complete.

**Question card story-science connection - exact player copy:** The completed signature records whether every required economic and payment condition supports proceeding with conversion.

**Decision evidence - exact player copy:** Signed plan: conversion 4.15 crowns per RATE and policy rate 3.25%. Emergency bond buying requires output≤680 billion AND payment failures≥2%; stop buying at companion CPI≥6.5%. SIGN is available only when all four campaign bars are 100%. These are the adopted institutional settings, not uniquely optimal values derived from the last card.

**Question card prompt - exact player copy:** Submit number pair `(4.15 crowns/RATE, 3.25%)`, then the three numeric conditions, then select SIGN; the panel blocks SIGN unless all four bars equal 100.

**Complete format-specific interaction block:** `rule:"conversion 4.15; policy rate 3.25%; buy bonds if Y≤680 AND failures≥2%; stop if companion CPI≥6.5%"; anchors:[4.15,3.25,680,2,6.5]; objective:"stable conversion with full employment and price guard"; direction:"conditional expansion"; consequence_limit:"CPI"`.


**Correct result:** The keyed result shown by the completed interaction.

**Answer text:** “Signed: 4.15 conversion, 3.25% policy rate, with joint output/payment action trigger and CPI stop.”

**Why:** Conditions turn one rate choice into a testable policy rather than a guess.

**Wrong-path feedback:** A different response does not fit the displayed evidence. Conditions turn one rate choice into a testable policy rather than a guess.

**State/output:** Page 15; all locks; no more quizzes.

### Character scene: changeover-mara-payoff

**Trigger:** After Stop 60 is accepted.
**Location and presence:** `conversion-desk` in Exchange Counter. Mara Venn, Board Chair, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Signs the accepted conversion rule with its reversal conditions intact.
**Exact dialogue:**
- Mara Venn, Board Chair: “Publish the conditions too; changing course under that rule is part of keeping our promise.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `changeover-mara-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Whether to open exchange with the signed conditions. Apply the existing final evidence and metric gates before the world payoff below.

The first customer slides old crowns across the counter. Eli counts out the new notes. Outside, the shop boards turn to the new currency. The signed rate and its review rules stay on the wall as the next person steps forward.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** The first customer slides old crowns across the counter. Eli counts out the new notes. Outside, the shop boards turn to the new currency. The signed rate and its review rules stay on the wall as the next person steps forward.

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

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These optional questions revisit the mission's evidence, calculations, mechanisms, and final decision.

### Review question 1


**Prompt - exact player copy:** Real output is below potential. Payment failures remain below an announced action threshold, and inflation remains below its intervention limit. Which summary matches these facts?

**Options - exact player copy:**

- A. A workable stance needs both borrowing conditions and bank capacity.
- B. Output is weak, but neither the payment nor inflation trigger has fired.
- C. An interest-rate assessment should include domestic investment and international capital and trade effects.
- D. Conditions turn one rate choice into a testable policy rather than a guess.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for national snapshot. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes fisher and reserves. It does not answer the question about national snapshot.
- B: Correct. Output is weak, but neither the payment nor inflation trigger has fired.
- C: This describes linked policy consequences. It does not answer the question about national snapshot.
- D: This describes final policy. It does not answer the question about national snapshot.

### Review question 2


**Prompt - exact player copy:** Why should a credit-policy assessment consider both the real interest rate and banks' available reserves?

**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. An interest-rate assessment should include domestic investment and international capital and trade effects.
- C. Borrowing conditions and banking capacity are separate constraints on lending.
- D. Conditions turn one rate choice into a testable policy rather than a guess.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for fisher and reserves. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes national snapshot. It does not answer the question about fisher and reserves.
- B: This describes linked policy consequences. It does not answer the question about fisher and reserves.
- C: Correct. Borrowing conditions and banking capacity are separate constraints on lending.
- D: This describes final policy. It does not answer the question about fisher and reserves.

### Review question 3


**Prompt - exact player copy:** Which statement best explains linked policy consequences?

**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. A workable stance needs both borrowing conditions and bank capacity.
- C. Conditions turn one rate choice into a testable policy rather than a guess.
- D. An interest-rate assessment should include domestic investment and international capital and trade effects.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for linked policy consequences. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes national snapshot. It does not answer the question about linked policy consequences.
- B: This describes fisher and reserves. It does not answer the question about linked policy consequences.
- C: This describes final policy. It does not answer the question about linked policy consequences.
- D: Correct. An interest-rate assessment should include domestic investment and international capital and trade effects.

### Review question 4


**Prompt - exact player copy:** Why state the evidence conditions that would cause an interest-rate decision to be revised?

**Options - exact player copy:**

- A. They make the policy testable and revisable instead of leaving its continuation to an unstated preference.
- B. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- C. A workable stance needs both borrowing conditions and bank capacity.
- D. An interest-rate assessment should include domestic investment and international capital and trade effects.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for final policy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. They make the policy testable and revisable instead of leaving its continuation to an unstated preference.
- B: This describes national snapshot. It does not answer the question about final policy.
- C: This describes fisher and reserves. It does not answer the question about final policy.
- D: This describes linked policy consequences. It does not answer the question about final policy.

### Review question 5


**Prompt - exact player copy:** Which statement best explains production possibilities curve (PPC)?

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
- D. An interest-rate assessment should include domestic investment and international capital and trade effects.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for production possibilities curve (ppc). All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes national snapshot. It does not answer the question about production possibilities curve (ppc).
- B: Correct. A graph of the maximum combinations of two outputs an economy can produce with current resources and technology.
- C: This describes fisher and reserves. It does not answer the question about production possibilities curve (ppc).
- D: This describes linked policy consequences. It does not answer the question about production possibilities curve (ppc).

### Review question 6


**Prompt - exact player copy:** Which statement best explains scarcity?

**Options - exact player copy:**

- A. Output is weak, but the payment trigger has not fired and inflation is below its stop limit.
- B. A workable stance needs both borrowing conditions and bank capacity.
- C. Limited resources cannot satisfy every want, so every choice gives up an alternative.
- D. An interest-rate assessment should include domestic investment and international capital and trade effects.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for scarcity. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes national snapshot. It does not answer the question about scarcity.
- B: This describes fisher and reserves. It does not answer the question about scarcity.
- C: Correct. Limited resources cannot satisfy every want, so every choice gives up an alternative.
- D: This describes linked policy consequences. It does not answer the question about scarcity.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

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

# Decision-card evidence contract

Every decision card must expose the exact evidence and public rule that distinguish its accepted answers from plausible alternatives. Render the local Data/readings/options, Decision evidence, public constraints and option effects before selection; keep them available while the player chooses. Use plain-language descriptions, not internal axis names. Show one speaker header from the stop’s placement and Call, and one coherent setup and prompt. Never substitute a discovery-stage explanation into a later allocation, release or certification task.

Resource tasks distinguish a budget from the goal. Display the required outcomes, each option’s contribution, costs, reserve rules and any priority or tie-breaker. Accept every plan satisfying the published rule. A recommended split is not an exclusive key unless the visible constraints uniquely determine it. Policies are identified as policies; the player must not derive an institutional preference from a scientific formula.

For staged tests, show hypotheses, model inputs and acceptance rules before commitment, but keep held-out results hidden until the specified test or reveal. No grade may depend on guessing a future result. A signed claim requires a readable source excerpt or an explicit inspection, not a hidden backed flag. Copied records retain their shared-source identity.

No importer fallback may borrow another stop’s data, speaker, threshold or generic mission text. Missing required local evidence is an import error. Before release, inspect the rendered card, prove the accepted response from visible information alone, try a plausible wrong answer, and test a different valid answer where the rule admits one. This document revision is source work; rendered-game verification still requires the actual implementation.
