# Changeover — play-through review

*Theme `changeover` · AP Macroeconomics (grade 12) · 15 days, 45 stops · reviewed 2026-08-21 by reading the full book (`books/changeover.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The best-*argued* campaign in the set on the question this document keeps asking about every other one: **why does this place have to be this place?** Halvern's currency board sits on the top four floors of Kesteven House, and the queue for the counter is on the plaza a hundred and eighty metres below. The player spends fifteen days computing what the money is worth while looking down at the people who need the answer. That is not decoration — the tower is the argument. A statistic computed on floor 48 is a decision about a queue on the ground, and the building makes the player hold both at once.

The economics is the most complete AP Macro treatment I have seen in a game, and it is unusually honest about the one thing the course tends to skip: **a level and a rate are different things**, which is day 3's own title, and half the campaign's mistakes are people confusing them. The price index goes 248 → 275, which is 10.9% *for the month*; the nominal interest rate is 9% *a year*; and day 8's real-interest stop resolves it as 9 − 250 = −241% a year, because 11% a month is 250% a year. Nothing else here does that arithmetic and it is the single most useful thing a macro student can be shown.

Three structural achievements. **The ALLOCATE pool is the number the player computed a week earlier** — 187 million marks of reserves, from day 7's `stock ÷ outflow` board, reappearing on day 14 as the pool. Nothing else in the repo binds an instrument to the campaign's own arithmetic like that. **The exchange rate is derived, not chosen**: the board wants 3.60, the player computes that the reserves hold 4.15 for 134 days, and the ending says in terms that 4.15 "is not the rate the board wanted and is the rate the reserves could hold." And **the money-multiplier thread pays off as policy**: 1 ÷ 0.02 = 50 at the current reserve requirement means 12 million of base becomes 600 million of deposits, which is why the requirement goes to 8% and why three of eleven regional banks cannot meet it — which is the ending's unfinished business.

**Answerable:** 44/45. One ALLOCATE answer is wired to the wrong item (CO-01).
**Sense:** Excellent. Every thread — the index, the rate, the reserves, the banks — resolves and they resolve into each other.
**Level:** Right for AP Macroeconomics and more rigorous than the exam.
**Fun:** Good. The tower, the lift, and a fixed date are strong; the register is quieter than most here.

## The questions, solved

All fifteen boards verified: 231 ÷ 84 × 100 = 275 for the index; 412 + 96 + 178 + 64 − 121 = 629 million for expenditure GDP; 41,000 ÷ 486,000 = 8.4% unemployment; (275 − 248) ÷ 248 = 10.9% monthly inflation; 2,180 ÷ 2.75 = 793 base-year marks for the deflated wage; 64 − 121 − 8 + 19 = −46 million on the current account; 1 ÷ 0.08 = 12.5 against 1 ÷ 0.02 = 50 for the money multiplier; 12 × 50 = 600 million of deposits; MPC = 30 ÷ 40 = 0.75; k = 1 ÷ (1 − 0.75) = 4, so 84 × 4 = 336 million; 187 ÷ 5.2 = 36 days of reserves against the 96 the rate has to hold for; 9 − 250 = −241% real; (629 − 712) ÷ 712 = −11.7% output gap; 2,180 ÷ 4.15 = 525 new marks a month; and 986,000 ÷ 0.94 = 1,049,000 returned, so 3,127,000 old notes still out.

Every one is right, every one uses the correct convention, and the last is a lovely piece of practical arithmetic — you cannot count what has not come back, so you infer it from a sample return rate.

## Implemented since this review

- **CO-01, the ALLOCATE.** The required answer is now *"Is the announced rate defended through the first week?"* — which is what it actually grades — and the note float has an answer of its own.
- **CO-02**, the title: *Nine a year, against eleven a month*, which is the arithmetic the stop performs.
- **CO-03**, the answer text now states the constraint (142 million between two jobs against 135 to spend) rather than the residue.
- **CO-05** `dayNoun` and **CO-06** the HUNT item name.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| CO-01 | CLOSED | Day 14 ALLOCATE, "What the first week has to cover" | **The one `required: true` answer is wired to the wrong item.** The question is *"Can the counter pay out new marks all week?"* and it `requires: [defend]` — "Defending the rate for the first week", 10 million. But the item that lets the counter pay out new marks is `float` — "New note float at the counter for the first week", 42 million, and `protected: true`. The stop's own `why` says so: *"The float is not a choice: a counter that cannot pay out new marks on the fifteenth makes every other decision irrelevant."* So the panel prints a question about the counter and grades it on the rate defence, and a player reading the answers list is told that funding the defence is what keeps the counter open. | Retitle the question to what it actually tests: **"Is the announced rate defended through the first week?"** — one line, and it makes the required answer true. Optionally add a second, non-required answer for the float ("Can the counter pay out new marks at all?") so the protected item appears in the list it belongs to. Do not move `required` onto `float`: it is protected, so requiring it would grade a decision nobody makes. |
| CO-02 | WORTH | Day 8 "Nine per cent, less eleven" | The title states an arithmetic the stop does not perform. Nine less eleven is −2; the board computes 9 − 250 = −241, because the 11% is *monthly* and the 9% is *annual*. That annualisation is the whole point of the stop and the best piece of teaching in the campaign — and the title hides it behind a subtraction that gives the wrong answer. A student who does the title's arithmetic gets −2% and thinks they have understood. | Retitle to make the mismatch the subject: **"Nine a year, against eleven a month."** Same length, and it puts the trap on the card instead of behind it. |
| CO-03 | WORTH | Day 14 ALLOCATE, `answerText` | *"That is 128 million, which leaves the banks or the wages and not both."* The global claim is true — banks (58) plus wages (84) is 142 against 135 discretionary after the float and the defence — but read in sequence after "that is 128 million", it implies both are still available from the remaining 59, and wages at 84 is not. | Reword to state the constraint rather than the residue: "The banks and the early wages come to 142 million between them and there are 135 to spend, so the decision is which of the two is not funded." Same fact, and it cannot be misread. |
| CO-04 | WORTH | Concept coverage | **Eight mechanism concepts are reached only at select tier** — the highest count of any campaign reviewed — and the campaign has **one** stop at operate tier against 22 select and 22 construct. Scarcity, comparative advantage, market clearing, short-run aggregate supply, demand-pull versus cost-push, what counts as money, policy lags, and the inflation–unemployment trade-off are all things the player only ever picks off a list. Some of that is correct: "identify which side the shock came from" *is* a discrimination, the way Sightline's "identify the bias" is. But eight is too many for a course whose central skills are diagrammatic, and the format mix says why — 15 BALLPARK, 15 CHOICE, 7 TRIAGE, and one each of VERIFY, BALANCE, ALLOCATE and SEQUENCE. `formatMix` passes because nothing exceeds the cap; the shape is nonetheless flat. | Two conversions would fix most of it, and neither needs new content. **(a)** Day 10's "Demand, or capacity" CHOICE (*a supply shock, with demand weak as well*) is a CONTROL: change one thing — the price level, the wage, the import cost — see what moves, put it back. That is the AD/AS diagram as an instrument and it clears three of the eight rows. **(b)** Day 11's "Prices against jobs" CHOICE (*a worse trade-off: the curve itself has moved*) is a SWEEP: one control, a response plotted only where the player looks, and the Phillips curve shifting is exactly what a SWEEP shows that a picture cannot. Note that this stop is also the campaign's one board with **no `target` in the solution** — its solution text runs into prose rather than a number — which is a second reason to look at it. |
| CO-05 | WORTH | `themes/changeover/theme.js` | No `dayNoun`. The plan card prints "Day N" while the campaign counts down to *the fifteenth*, which is the title of its last mission and the date the mark stops being money. The clock is the best in the set after Red Sand's transfer window, and the plan card does not carry it. | Same finding as CC-04, GL-02, WM-03, IC-04. Cross-campaign §4. |
| CO-06 | WORTH | `warmups.hunt` | No `item: { name, plural }`, so the HUD counts generic items. One of three books missing it, with `carrying` and `ghostlight`. | One line. |
| CO-07 | TASTE | The tower | Not a finding — a note for whoever touches it next. Changeover is the only stacked-floor world in the repo, and the working tree currently carries uncommitted changes to `interiorTower.js`, `interiorKit.js`, `trial.js`, `worldFormats.js`, `interactions.js`, `main.js` and this theme's props and manifest. CLAUDE.md documents six distinct ways a stacked building goes silently wrong — a distance in (x, z) that ignores height, `plan.rooms` built flat, floor arrays cleared rather than spliced, spandrels missing so the floors float, and a city that stops short of nine hundred metres being invisible from every room. Every one of those renders. | Screenshot from outside and from inside a room on floor 45 before committing, per the standing rule. Nothing in `npm run check` can see any of it. |

Notable: **zero rows in every debt file**, and effectively **no numeral damage** (four occurrences, all "1 million" where one million is correct).

## Day-by-day notes (short)

- **Day 1** — Fourteen days and no rate. The index from a basket, what forty people have heard (*expectations are the answer*, on day 1, which is correct and brave), and a VERIFY on money on a platform scale.
- **Day 2** — What Halvern actually makes. Expenditure GDP, the unemployment rate falling in a bad month, and the CHOICE that most of the money supply was created by lending. Three stops, three of the course's hardest ideas, no diagram needed.
- **Day 3** — A level and a rate are different things. The campaign's thesis as a mission title.
- **Days 4–5** — The city the basket prices, and a column that multiplies. The reweighting TRIAGE (*reweight it and price both baskets this month*) is the right answer and the only honest one. The queue's CHOICE — *that the old currency will be worth less later* — is expectations arriving as behaviour rather than as a definition.
- **Days 6–7** — The multiplier, and what the reserves can hold. Day 7 is the campaign's hinge: 36 days of reserves against 96 needed, and a rate of 4.15 that holds for 134.
- **Day 8** — Who the difference falls on. The −241% real rate, the debt that has become cheap and cannot be repeated, and one index across many households.
- **Days 9–11** — How much money there is, how far from capacity, three tools and a lag. The lag CHOICE — *the impact lag, and it is about a month* — is the thing that makes a correct policy arrive as the wrong one, and it is on the card rather than in a footnote.
- **Days 12–13** — A number and what it is written against, and what the wires say. The terms-of-trade CHOICE (*both effects are one fact, so helping either harms the other*) is the best-stated trade-off in the campaign.
- **Days 14–15** — The day before the fifteenth, and the fifteenth. The final CHOICE is *publish the float and set no limit*, which is a genuine and defensible reversal of everything the board wanted on day 1.

## Opening and closing

Opening: "Halvern is a country of nine hundred thousand people, and in fourteen days its shops and banks stop taking the mark, the money it has always used. Nobody has agreed what the new one is worth… The board sits on the top four floors of Kesteven House, and the queue for the counter is on the plaza a hundred and eighty metres below." All four beats, and the fourth is the building. Excellent.

Closing: three paragraphs. The first names the rate and says it is not the one the board wanted. The second is the banks, in three sentences, ending "That is next quarter, and it is somebody's problem" — the driest unfinished-business line in the set and one of the best. The third is addressed to the player: *"you put a defensible index in front of the board before the rate was argued, so the rate was set against measured prices rather than against the fear in the room."* Keep all of it.

## Warm-ups

All seven authored. One defect, CO-06. Worth noting that this is the campaign where the warm-ups do the most work, because a four-floor tower with a lift is the hardest place in the repo to learn — and TRIAL runs on floor plates rather than on ground, which is the one lap in the catalogue where the format is teaching the *building* rather than the site.

## What to keep

- The tower, and the queue a hundred and eighty metres below it.
- 4.15. A rate the board did not want, derived from a reserve position, and the campaign never pretends anybody was pleased.
- Day 3's title. "A level and a rate are different things" is the whole course.
- The 187 million appearing twice — once as a computed reserve position and once as a pool to spend.
- "That is next quarter, and it is somebody's problem."
