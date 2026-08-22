# Slack Water — play-through review

*Theme `slackwater` · AP Calculus BC, the back half — parametric, polar and series (grade 12) · 12 days, 36 stops, 12 DERIVE · reviewed 2026-08-21 by reading the full book (`books/slackwater.yml`), working every derivation and every board, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most mathematically ambitious campaign in the catalogue, and the syllabus coverage is exact. Twelve DERIVE stops, one a day, all with `askRule: true`, and between them they cover Calculus BC's back forty per cent with nothing left over and nothing repeated:

| Day | Derivation | BC topic |
| --- | --- | --- |
| 1 | Two cosines at nearby frequencies → the spring-to-spring interval | beats, trigonometric identity |
| 2 | x(t), y(t) → speed as ‖⟨x′, y′⟩‖ | parametric velocity |
| 3 | x = 300t², y = 200t³ → path length | parametric arc length |
| 4 | Σ of 29 harmonic terms → a ceiling on the residual | bounding a finite sum |
| 5 | r(θ) = 1.4 + 0.9 cos θ → enclosed area | polar area |
| 6 | a₀ = 0.34, ratio 0.62 → total at the wall head | infinite geometric series |
| 7 | dh/dt = k√(H − h) → time to close the head | separable ODE |
| 8 | ∫₀^∞ 48 e^(−t/6.2) dt → total exposure | improper integral |
| 9 | C(H + η)^{3/2} → the second-order term | binomial / Taylor expansion |
| 10 | \|R₂\| ≤ M\|η\|³/3! → an error ceiling | Lagrange error bound |
| 11 | ∫₀^T t·q₀ cos(ωt) dt → flow-weighted mean time | integration by parts |
| 12 | cₙ₊₁/cₙ = (3/2 − n)/(n + 1) → where the expansion stops having a total | ratio test, radius of convergence |

I worked all twelve independently. **Every one is correct**, every one arrives at a number the fiction actually needs, and several are elegant: the geometric series titled "Nine tenths out of a third" gives 0.34 ÷ (1 − 0.62) = 0.895 m; the arc length titled "Two thousand metres in two hours" gives 200(5^{3/2} − 1) = 2,036 m; the Lagrange bound titled "One more derivative, over six" is literally M|η|³/6; and the ratio test's limit is −1, so the expansion has a total exactly while the tidal movement stays below the mean depth — which is the physically meaningful answer and the one the barrage master needs.

The frame is the best-conceived in the set for a mathematics course. **The campaign's argument is about whether a computed number may be acted on**: Calloway holds that a prediction with a stated error can be acted on, Oyelaran holds that the gates come down on what the gauge reads, and the resolution on the last afternoon is that neither of the two bounds the player has built covers weather — so the gate comes down on the gauge, forty minutes late, and the marsh stays dry by about a foot. A campaign about series convergence ends by saying out loud what the convergence does not cover. That is the correct moral and almost nothing else here reaches for it.

**Answerable:** 36/36 for the mathematics. But on 15 of the 48 derivation steps the rule question has one possible answer (SW-05).
**Sense:** Excellent. Twelve days, one thread, and the shallow-water term the residuals had been carrying for nine years is the payoff.
**Level:** Right for BC and genuinely hard. Twelve derivations with the rule asked at every step is the heaviest load in the catalogue.
**Fun:** Good if you like this, which is the honest answer. The place does a lot of work — six sluice gates, mud at low water, a training wall 300 m out — but the pleasure is the mathematics.

## The boards

Six estimate boards, all verified: 6.10 + 2.41 − 0.62 − 4.30 = 3.59 m of head; 324 ÷ 1501 = 0.216 as dy/dx on the float's track; √(3,900² + 4,800²) = 6,185 m displacement against 6 km of path; 0.9 × ⅔ = 0.60 m of level while the stilling well settles; ½(12.47 − 8.10) = 2.19 for the area between two roses; and 0.30 + 0.375 × 0.5 = 0.4875 m for one tangent-line step.

The day-2 pair is worth recording as the campaign's method in miniature. The DERIVE computes the components — 1,501 m/h east and 324 m/h north — and the speed as their magnitude, 1,536 m/h = 0.43 m/s. The board beside it then takes the *same two rates* and asks for the slope of the track, 324 ÷ 1,501 = 0.216, with the speed and its SI conversion sitting on the tile row as decoys. Same instant, same two numbers, two different questions, and the distractors are the answers to the other one. I checked the chain rule factor by hand — 5600 × π/6.2 × cos(2π/6.2) = 1,500.7 — and the book's 1,501 is right.

## Implemented since this review

- **SW-03** `dayNoun`.
- **SW-05 is corrected rather than fixed.** The 15 single-rule steps are *not* "a click with one possible value": the panel offers the chain's whole `rules` list, so the question is answerable and what it loses is the coupling between the two halves. The real defect was underneath — `askRule: true` never reached the content, so all 48 of Slack Water's rule questions were inert. Fixed in the importer; `deriveRules.mjs` now asserts it and prints the coupling figure without failing it.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

One FIX-level finding, and it is a measurement rather than a wrong answer (SW-05). No rows in `curriculum-debt`, `concept-debt`, `equation-debt`, `format-debt`, `daycalls-debt` or `warmup-debt`. Every day carries exactly three stops.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| SW-01 | WORTH | Authored `background`, 24 of 36 stops | Twelve stops carry authored background prose; twenty-four do not. Every stop has a `guide`, so the card is complete — but this is the campaign where the door matters most, because a DERIVE's wrong branches are the teaching and the *reason* a branch is wrong is often a fact about the estuary rather than about the algebra. Day 12's ratio-test stop is the case: the expansion has a total while η < H, and *why that is the physically right answer* — a tidal movement bigger than the mean depth is not a wave, it is a dry bed — is the sentence that makes the mathematics mean something, and it is not on the card. | Add background to the twelve DERIVE stops specifically, one paragraph each answering "what does this bound let the barrage master do that she could not do before". Leave the other stops as they are; Slack Water reads fast and should keep that. |
| SW-02 | WITHDRAWN | Day 12 SCIENCETANK, "A hundred points of survey money" | **This finding was wrong and is withdrawn.** I reported no `evidence`, having grepped for a book key that does not exist — the contract puts the evidence in `guide`. This stop's guide carries four facts, one per proposal: a returned fraction of 0.62 worked out of gauge records rather than measured off the wall; a shallow-water term fitted to six stations, two unlevelled since commissioning; a stilling well that needs forty minutes and is the reason the gate call cannot wait for a reading; and two flats stations that need the launch and were missed last quarter. | Nothing. |
| SW-03 | WORTH | `themes/slackwater/theme.js` | No `dayNoun`, and this is the campaign where it costs most: the clock is "in twelve working days the biggest tides of the year arrive", the campaign is **twelve days long**, and the plan card prints "Day N" without ever saying how many are left. A player on day 8 cannot read the one number the whole fortnight is about. | Count down rather than up, or at minimum set `dayNoun` and let the stakes carry "four working days to the springs". Same finding as CC-04, GL-02, CO-05, WM-03, IC-04 — cross-campaign §4, and Slack Water is the strongest case for it. |
| SW-04 | WORTH | The twelve-day campaign against seven warm-ups | `warmupOrder` passes, so the schedule fits — but twelve days is the shortest campaign in the set and it still carries all seven runs plus a `trial-far` if the site is two-tier. That leaves very little room for the tail runs to spread, which is the property the schedule exists to have. | Nothing needs fixing; recording it because a future thirteenth day would help this campaign more than any other, and because if Slack Water ever loses a day the warm-up schedule is the thing that breaks first. |
| SW-05 | CLOSED | `askRule: true`, all twelve DERIVE stops | **Fifteen of Slack Water's forty-eight derivation steps offer only one distinct `rule` among their candidates**, so on nearly a third of the steps the second half of the answer is a click with one possible value. This is the exact defect CLAUDE.md records as the reason `askRule` was switched off by default — *"in five of Midway's 29 steps and ten of Headwater's 33 every candidate carried the same rule, so the second half was a click with one possible value"* — and Slack Water turns it back on for every derivation. I measured it directly off the generated content: 15 of 48. Examples: "Bound the size of one dropped term" (every candidate `the size of a cosine`), "Put the fitted amplitudes in" (every candidate `substitution of the fitted values`), "Take the first two derivatives at mean head" (every candidate `the power rule`). Across the three `askRule` campaigns the counts are **Slack Water 15/48 (31%), Overwind 21/48 (44%), Dark Fibre 2/47 (4%)** — so it is fixable, and Dark Fibre shows what fixed looks like. | Two ways, and both are cheap. **(a)** Give each single-rule step a second plausible rule on at least one distractor: a step whose real licence is the power rule should have a branch someone would reach by the chain rule, and naming it is the point of asking. **(b)** Where the step genuinely has one rule — substitution and unit conversion often do — that step should not ask for it. Since `askRule` is currently chain-level rather than per-step, the honest short-term fix is to strip the rule question from the steps that cannot support it, which means either a per-step flag or moving those steps' rule into the `startNote`. Either way, **run the count as a gate**: the measurement above is fifteen lines of script and it is the one thing that separates "the rule question is the teaching" from "the rule question is a formality". |


Notable: **effectively no numeral damage** — the occurrences my detector found are all real decimals ("11.6 m", "0.19 m") or correct uses of *one*.

## Day-by-day notes (short)

- **Day 1** — The board and the gauge. The beats derivation on the first morning is the right opening: two terms, a fortnight, and the campaign's whole method (a prediction is a sum of terms) established before anything is argued.
- **Day 2** — A path, not a shape. The parametric pair described above, plus a PROTOCOL on eight terms of thirty-seven — which is the shallow-water problem being set up nine days before it is solved.
- **Days 3–4** — How far it went and how far away it is; what the tail can be worth. The CHOICE about assuming the flow held at its top-of-the-hour value for a whole half hour is the best small statement of quadrature error here.
- **Day 5** — Speed against bearing. Polar area, and a disturbance travelling out along the wall and coming back — which is day 6's geometric series arriving as an observation first.
- **Day 6** — What comes back, and comes back again. The geometric series, and a CHOICE whose key is *nothing on its own, though terms that did not go to zero would settle it* — the divergence test stated correctly, which is rarer than it should be.
- **Day 7** — The impoundment fills. A separable ODE whose subject is that the rate closes its own head, plus a tangent-line step and a CASEBOOK.
- **Days 8–9** — The tail nobody measures, and the residual has a shape. The improper integral and the RESIDUAL panel back to back is the right pairing: one bounds the tail, the other finds structure in what a fit left over.
- **Day 10** — An honest bound on the wrong quantity. Best mission title in the repo, and the Lagrange bound is what makes it true.
- **Days 11–12** — Two integrals that will not come out, and the gate programme. The final DIAGNOSIS — *the level tomorrow has a term in it that no bound on the desk covers* — is the campaign resolving against its own mathematics, which is the correct ending.

## Opening and closing

Opening: "Sarn Barrage is six gates across the neck of an estuary, holding four hundred hectares of water. In twelve working days the biggest tides of the year arrive, with half a metre of surge. The gates work to a timetable written from predicted levels, not measured ones… Ninety graziers move stock off the marsh on one number you signed." All four beats, and the last clause is the best statement of a signature's weight in the set.

Closing: three paragraphs. The first is specific — 11.6 m against a predicted 11.4, with the surge accounting for the difference almost exactly, and three things the prediction now carries that it did not a fortnight ago. The second's unfinished list is the best-engineered in the catalogue: armour on the last forty metres sized for a first arrival rather than a total, two of six stations unlevelled since commissioning, and a stilling well that still needs forty minutes, "which is the whole reason any of this had to be argued." The third is addressed to the player and ends on the last afternoon's decision. Keep all of it.

## Warm-ups

All seven authored and specific to an estuary neck with mud at low water. No findings.

## What to keep

- The twelve derivations. This is the syllabus, done once each, arriving where the fiction needs them.
- "An honest bound on the wrong quantity."
- The ending's resolution: the gate comes down on the gauge, and the campaign says why the mathematics did not settle it.
- The day-2 tile row, where the decoys are the answers to the other question about the same instant.
- The ratio test giving η < H, which is a convergence condition that is also a physical fact about a tide.
