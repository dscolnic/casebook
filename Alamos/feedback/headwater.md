# Headwater — play-through review

*Theme `headwater` · AP Calculus AB (grade 12) · 15 days, 48 stops, 13 DERIVE · reviewed 2026-08-21 by reading the full book (`books/headwater.yml`), working every derivation and every board, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The campaign that makes the best case for teaching calculus at all. Every stop is a derivative or an integral that somebody has to have before nine o'clock, and the reason is always the same: **the gates take six hours to make any difference downstream, and the river can rise in two.** So the duty engineer is ordering water out on an extrapolation, every morning, for nine days of rain — which is exactly what a derivative is for.

The syllabus coverage is complete and the ordering is the point. Day 1 is a difference quotient becoming a derivative, and the CHOICE beside it is that at the instant the gate moved *the one-sided limits differ, so there is no rate of change at that instant* — differentiability introduced by a failure of it, on day 1, from a real event. Day 6 is where the curve turns and the observation that **the two peaks are not the same hour**: the level peaks when inflow falls back to equal the outflow, which is a critical point with a physical meaning nobody has to be told. Day 7 is "a maximum with no critical point" — an endpoint extremum, which the course usually presents as a technicality and here is the worst extent of the uplift. Day 11 is "Nothing over nothing", which is L'Hôpital arriving as a measurement problem. Day 14 is where the accumulation tops out, which is the Fundamental Theorem used forwards.

The internal consistency is on Overwind's level. Day 2's trapezoid gives (72 + 221) × 5,400 = **1,582,200 m³** through the site, and day 8 divides that same number by 21,600 s to get the one release rate that would have passed it in six hours: **73.25 m³/s**. Then the CHOICE beside it asks whether the river ever actually ran at 73, and the answer is the Mean Value Theorem — *at some instant in the 6 hours it ran at exactly 73*. Three stops, one number, and the theorem is the answer to a question somebody asked.

**Answerable:** 48/48.
**Sense:** Excellent, and the resurvey thread pays off properly — the 2003 survey moves every volume on the site by 11%, and the ending says the drawings still show the old one.
**Level:** Right for AB, and the mix is the best-balanced of the DERIVE campaigns: 13 DERIVE, 12 BALLPARK, 8 CHOICE, and one each of fifteen other formats.
**Fun:** Good. Nine days of rain and a decision every morning is a strong shape, and the gorge tower with one glazed wall onto the spillway is a distinctive place.

## The questions, solved

Twelve boards, all verified: (48 − 41) ÷ 2 = 3.5 m³/s per hour; (72 + 221) × 5,400 = 1,582,200 m³ by trapezoid; 28 ÷ 2,600,000 × 86,400 = 0.93 m a day; 8.6 × 46 × 0.31 = 123 kW·day; 12 ÷ 3 = 4 m where 12 − 3a first reaches zero; 1,582,200 ÷ 21,600 = 73.25 m³/s; 2 × (5 − 4) ÷ 0.10 = 20 hours of drawdown; 4.90 × 2 × 10⁶ = 9.8 million m³ from a stack of areas; 44.5 × 0.06 = 2.67 m³/s; 0.693 ÷ 0.22 = 3.15 days to halve; (96 − 62) × 21,600 = 734,400 m³ in the gap; and 47,200,000 ÷ 1,209,600 = 39.0 m³/s as the fortnight in one number.

Three stops I would keep above the rest. **"The curve that is already the answer"** — the key is *the inflow at four o'clock on Wednesday*, which is a derivative read straight off a graph of the thing itself, and it is the single hardest reading skill on the AB syllabus. **"What the correction does not touch"** — *every volume and every level forecast built from one* — which is what a systematic error in a survey actually costs, and it is the campaign's best moment of dread. And **"Rules on the rate, not the level"** (day 14, TRIGGER), which is the rule the ending says would have caught everything: *order against the rate, not the level.*

## Implemented since this review

- **HW-01**, the damaged title — now *Fourteen days, one number* — and eleven more numeral occurrences.
- **HW-02**, the opening card now names Bo Ferrand, who keeps the rating curves.
- **HW-06** `dayNoun`.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| HW-01 | CLOSED | Day 15, stop title **"14 days, 1 number"** | Numeral normalisation has damaged a **title**, which is the worst place for it — a title is read on the plan card, on the day plan, in the map label and at the top of the question. It should be "Fourteen days, one number". The same damage is in its scene ("47.2 million cubic metres through the site over 14 days and 1 line on") and in day 11's DERIVE ("its limit is 1 number"). | Three edits. Titles first — this is the only damaged *title* I have found in twenty-two books, so it is a one-line fix with disproportionate visibility. |
| HW-02 | WORTH | `opening:` | **The opening card names nobody.** Every other beat is there — what has happened (88% after the driest summer in nine years, nine days of rain from Thursday), the player's authority ("the amount of water let out each morning is ordered by you"), and the cost — but CLAUDE.md's third beat is "the clock or the argument, *with somebody from the roster in it*", and there is no person in this card. Ferrand carries the argument through the campaign and is not introduced until a stop. This is not unique to Headwater — see cross-campaign §8, where I list the campaigns whose opening cards name nobody — but Headwater is the case where it costs most, because the campaign's argument (extrapolate, or wait for the gauge) is genuinely between two people and the card presents it as a property of the dam. | One clause. "Marisol Ferrand, who has kept the storage curve since 2003, says the survey it is built on is the thing to fix first" — or whichever half of the argument she holds. The card is currently 82 words and has room. |
| HW-03 | WORTH | `engine/dev/concept-debt.json`, 2 rows | Concavity and the second derivative rests on critical points and the first-derivative test; reading a quantity off the graph of its own derivative rests on concavity. Both are genuine ordering rows in a course where the ordering *is* the syllabus, and CLAUDE.md records that Headwater swapped four stops to fix others of this kind. | These two are one swap: the day-6 "Where the curve turns" DERIVE claims the first-derivative material, and the day-4 "The curve that is already the answer" CHOICE claims reading off a derivative graph. Moving that CHOICE from day 4 to day 7 or later puts it after concavity and clears both rows. Check the day-4 stake first — if it names the Wednesday four o'clock reading as that day's event, the stop cannot move and the rows are paid by writing the missing claim instead. |
| HW-04 | WORTH | Days 5, 9 and 12 | Three days author 4 stops against the loop's 3. The extras are the level HOLD, the rising-or-reading-high BELT, the halving BALLPARK and the round-is-looking-at SPOT — all good, none a deletion candidate. | Prefer a move to a delete. Day 11 ("A day when nothing happens") is titled for spare capacity and would host the halving BALLPARK; day 13 would host the BELT. |
| HW-05 | WORTH | One stop with no authored `background` | Forty-seven of forty-eight stops carry authored background prose; one does not. In a campaign this consistent the single gap is worth closing rather than explaining. | Find it and write the paragraph. |
| HW-06 | WORTH | `themes/headwater/theme.js` | No `dayNoun`. The clock is nine days of rain starting Thursday inside a fifteen-day campaign, so the plan card's "Day N" and the rain's own day count are two different numbers the player has to hold apart with no help. This is the most confusing instance of the finding in the set, because both clocks are real. | Set `dayNoun` and have the stakes name the rain day explicitly ("day four of nine"). Cross-campaign §4. |
| HW-07 | TASTE | ~26 stops (51 collapsed paragraphs) | Repeated format boilerplate in `background`. Costly here because the DERIVE backgrounds that *are* specific are excellent — the one explaining why a one-sided limit failure is not a measurement error is the best short piece of writing about differentiability in the repo. | Keep each essay on first use per format. Cross-campaign §2. |

Notable: **`askRule` is off** in this book, which is correct — CLAUDE.md records that ten of Headwater's 33 steps had every candidate carrying the same rule, and the flag was introduced off by default because of it. Nothing to change; recording it because Overwind and Slack Water turned it on without doing the count (OW-01, SW-05).

## Day-by-day notes (short)

- **Day 1 ("88%")** — The slope between two readings, what the slope becomes, and the instant the gate moved. Difference quotient, limit, and a failure of differentiability, in that order, on the first morning.
- **Days 2–3** — The same water moving faster; what fell and what arrived. The trapezoid, the gate-is-not-a-tap DERIVE, and the CHOICE about which end of the interval you believed — *the opening-reading total is short and the closing-reading total is long* — which is left and right Riemann sums as a bracket on a real volume.
- **Day 4** — Two days of not deciding. The storage BALANCE and the schedule as a formula.
- **Day 5** — The last half metre. Why the same inflow moves the level differently (because area changes with depth) is the best physical motivation for a related rate here.
- **Day 6** — Has it peaked? The PROBE on the hour the increments turned, then the critical point, then the two peaks not being the same hour. **Best day in the campaign.**
- **Days 7–8** — What the wall is carrying, and the release that just clears it. Endpoint extremum, then the Mean Value Theorem on day 2's own volume.
- **Days 9–10** — The ledger that will not close, and every number again. The DEGENERACY (a reading that fits many curves) and the PROPAGATE (the exponent is not the whole story) are the right two instruments for a campaign about fitted relations.
- **Days 11–13** — A day when nothing happens; the front that never came; three things before nine. L'Hôpital, a HOLDOUT on a constant that fitted too well, and the integrand that had to be changed.
- **Days 14–15** — The last reversible moment, and what the fortnight is worth. The TRIGGER writing rules on the rate rather than the level is the campaign's thesis, arriving as an instrument on the second-to-last day.

## Opening and closing

Opening: "Ashfell Dam holds ninety-two million cubic metres of water in a gorge, with four villages along the river below it… You order it out of gauge readings taken hours ago and a survey of the reservoir's shape made in 2003. The gates take six hours to make any difference downstream. The river can rise in two." The last two sentences are the best statement of why a rate matters anywhere in this catalogue. One gap: no named person (HW-02).

Closing: three paragraphs. The first is specific — 91%, warned twice and flooded neither time, and a resurvey that moved every volume by 11%. The second's unfinished list names the rule that would have caught all of it and says it "is a line in a handover book until the next duty engineer makes it a habit", which is the most honest thing any of these endings says about institutional memory. The third ends "Four villages went to bed dry through nine days of rain. That was you, every morning of it." Keep all of it.

## Warm-ups

All seven authored and specific to a tower in a gorge. No findings.

## What to keep

- "The gates take six hours to make any difference downstream. The river can rise in two."
- 1,582,200 m³ appearing three times: as a trapezoid, as a release rate, and as a Mean Value Theorem.
- The two peaks not being the same hour.
- "Order against the rate, not the level" — a rule the campaign derives and then admits is only a line in a handover book.
- Day 1 introducing differentiability by breaking it.
