# The Trial — play-through review

*Theme `the_trial` · AP Statistics via clinical epidemiology (grade 12) · 15 days, ~46 stops · reviewed 2026-08-21 by reading the full book (`books/the_trial.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The best-argued campaign in the catalogue, and the one I would hand to a statistician. Its subject is not a disaster but a **standard of proof**: what a trial promised before it had data, and what it is therefore entitled to say. Every day is a different way of losing that entitlement — a readable pharmacy diary, an unplanned look, a widened criterion, a warm fridge, a drug that announces itself — and the campaign never once resolves a day by finding a villain.

Three things nothing else here does. First, the **α-spending stop**: 0.001 + 0.004 + 0.020 = 0.025, the whole budget, with the unplanned look priced at 0.015 and no room for it. That turns an abstract multiplicity rule into arithmetic a player performs. Second, the **amendment stop**, where widening entry criteria moves the expected hazard ratio from 0.75 to 0.85 and the events required from 380 to 1,190 — three times the trial for the same question, because the effect size sits squared in the denominator, "and neither effect was on the form that authorised it." Third, the campaign is **honest about what it costs**: the closing card says the symptom score — the outcome participants cared most about — was dropped because the trial could no longer defend it.

**Answerable:** 46/46. I found nothing a player cannot settle from the card.
**Sense:** Excellent. The blinding leak on day 9 explains the day-2 argument, the day-5 site offset and the day-13 subgroup, and the campaign says so.
**Level:** Right for AP Statistics and then some — α-spending, information fraction, ITT vs per-protocol, multiplicity across 14 subgroups, and a CLOUD panel about inter-rater drift.
**Fun:** High if you like arguments. Feldman vs Balogun runs the whole fortnight and neither is a fool.

No defects were found that need fixing. That is the first campaign of nine where I can write that sentence.

## The questions, solved

All verified: 380 ÷ (2400 × 0.08) = 1.98 years; 0.001 + 0.004 + 0.020 = 0.025; 246 ÷ 380 = 0.647; 31.4 ÷ 0.0264 = 1,189 events (and 31.4 ÷ 0.0828 = 379 under the original criteria — the comparison lands exactly on the design's 380); 0.140 ÷ 0.200 = 0.70 as assigned against 0.121 ÷ 0.201 = 0.60 among completers; NNT = 1/(0.189 − 0.147) = 23.8; SE of 0.189 on n ≈ 1,200 = √(0.189 × 0.811 / 1200) = 1.13 pp; 1 − 0.95¹⁴ = 0.512.

The day-1 STRESS is correctly built — criteria keys (`blur`, `answers`) match the score keys, and at the pessimistic 1.6% event rate only the composite endpoint survives while cardiovascular death alone (feasible at 2.9) goes dark. That is the format working exactly as intended, and it is the counter-example to the same panel's failure in Bring Them Home.

The day-9 TRACE is the best in the repo alongside Aftershock's: the symptom score and the returned-kit adherence both have a path through the visible flush, the adjudicated admission goes through a blinded committee, and all-cause death comes from a national register. Four results pointing the same way, two of them independent.

## Implemented since this review

- **TT-03**, the numeral damage, including the two damaged titles *Forty hours before the lock* and *Three days, forty-one queries* — which were in all three Trial editions.
- **The opening card** now names Dr. Miriam Feldman with her position.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| TT-01 | WORTH | Book structure, days 5 and 6 | The `# day 6` and `# day 7` banner comments sit **above** the fourth stop of the previous day rather than below it. So the HOLD stop on recruitment rate reads as day 6's first stop and is actually day 5's fourth; the eligibility BELT reads as day 7's and is day 6's. The importer confirms it: missions 5 and 6 each carry 4 stops. Comments do not affect parsing, so nothing is broken — but an author editing day 6 will edit day 5's stop. | Move the two banner comments down past the stop they precede. Two lines. |
| TT-02 | WORTH | Missions 5, 6 and 12 | Three days author 4 stops against the loop's 3. The importer warns and `dayCalls` passes, so no callback is being added on those days — but CLAUDE.md records that a fifth call is answered against the same hours as the fourth, and a 4-stop day is one callback away from that. The three extra stops are all good (the recruitment HOLD, the eligibility BELT, and day 12's fourth) and none is a candidate for deletion. | Prefer a move to a delete, per the house rule: day 11 ("The quiet day") is a natural home for the recruitment HOLD, and day 7 for the eligibility BELT — both are about the funnel. That takes three days off the warning list without losing a stop. |
| TT-03 | WORTH | ~11 stakes | Numeral normalisation, the same catalogue-wide class: "the second interim analysis is **21** days away" is fine, but "Feldman's instinct is that **2** is a number you see in a trial this size" (day 3), "**1** patient is still on the ward" (day 3), "which **1** governs the interim" (day 2), "the score Iriarte and Doyle have both called the **1** patients care about" (day 9), "whether the **2** of them are disagreeing about anything real" (day 6), "**48** of the **91** stopped attending" (fine), "site 12 screens **11** and enters **9**" (fine). The damaged ones are where the digit replaced *one* as a pronoun. | Editorial pass; see the cross-campaign document §1. This campaign is among the least affected. |
| TT-04 | TASTE | Day 12 "Three things at once" | The fifth campaign to use this mission title, and the eighth book to carry a "Which of the three cannot wait" stop. The Trial's version is well-adapted (a cut fibre is a clock, a drifting reference contaminates decisions) but the title is shared with Blackout, Aftershock, Midway, Red Sand and Quantum. | Retitle. Cross-campaign §6. |
| TT-05 | TASTE | ~26 stops | Repeated format boilerplate in `background`. Notable here because this campaign's stop-specific backgrounds are consistently excellent — "why the logger trace is not automatically the strongest evidence", "why 'nearly' is the dangerous pile", "why the smaller effect is the honest one" — and they are third in a list. | Keep each essay on first use per format. Cross-campaign §2. |

## Day-by-day notes (short)

- **Day 1** — Concealment against blinding (they "fail separately" is the whole lesson), the endpoint STRESS, and the events-not-dates estimate. A model opening day.
- **Day 2** — Where a number is made. The four-measurement PROTOCOL grades on *how much trial judgement each passes through*, which is the right axis and not an obvious one. The prespecification SEQUENCE's argument — "prespecification is a claim about time" — is the campaign's thesis.
- **Day 3** — Two liver cases. Two clocks running, and a VALUE stop where the ten minutes buy the exposure timeline rather than the investigator's opinion.
- **Day 4** — The α-spending day. Best single stop in the campaign, and the individual-unblinding SEQUENCE beside it is ordered by *what cannot be reconstructed afterwards*, with authored `axis`/`ends` saying so.
- **Day 5** — Site 12. The DIAGNOSIS turns on the nearly-empty reasons column rather than the high entry rate; the CONTROL then proves the symptom-score offset is the *reader* by swapping one factor and putting it back. Two of the best stops here.
- **Day 6** — The amendment. The hazard-ratio dilution stop is the single most valuable piece of statistics teaching in the catalogue.
- **Day 7** — Missing data sorted by whether the reason is tied to the outcome, then ITT vs per-protocol, then an ALLOCATE that correctly protects validity before precision.
- **Day 8** — The warm fridge. "Heat has nothing to damage in a comparator" is a lovely one-line argument for a one-sided error, and the ATTEST correctly targets *scope* rather than duration.
- **Day 9** — The guessing survey. 71% across 1,180 guesses, the flush as mechanism, the TRACE sorting what survives, and a PROTOCOL about where in the pack a limitation has to sit so the board reads it *before* the estimate it qualifies. The best day in the campaign.
- **Day 10** — The CLOUD on first-minus-second reading differences, where re-centring moves the middle and only a rule change narrows the spread. That is the CLOUD format used better than anywhere else.
- **Days 11–15** — The quiet day, triage, the subgroup day (1 − 0.95¹⁴ = 51%), the last reversible moment, and a close that sorts claims by evidence.

## Opening and closing

Opening: "Stop it early on a result that turns out to be noise, and a drug that works is buried for a decade. Carry on past the point the evidence was in, and every patient who joined after today was in a trial that already had its answer." Both errors named, both costed, in two sentences. The best statement of a symmetric-risk decision anywhere in the set.

Closing: three paragraphs, and the middle one is unusually brave — it names the dropped symptom score as a cost, "a year in which half of those recruited went on receiving the arm that lost", and a subgroup finding two other groups have since failed to reproduce. The last is addressed to the player. Keep all three.

## Warm-ups

Present and specific to a coordinating centre. No findings.

## What to keep

- The α-spending arithmetic, and the sentence that follows it: "Nothing about the data changes when somebody looks. What changes is the number of chances the trial has taken to be fooled, and that number is in the denominator of every claim it goes on to make."
- The amendment's two compounding costs, and the observation that neither was on the authorising form.
- Day 9's placement rule: a limitations paragraph goes *before* the tables, because "a board that reads an estimate and then learns the blind may have leaked has already formed a view."
- Feldman and Balogun. Neither wins, and the stakes say which of them is right on which day.
