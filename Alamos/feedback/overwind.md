# Overwind — play-through review

*Theme `overwind` · AP Physics C: Mechanics, in derivations (grade 12) · 12 days, 36 stops, 12 DERIVE · reviewed 2026-08-21 by reading the full book (`books/overwind.yml`), working every derivation and every board, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The best-*plotted* campaign in the set, and the physics is the tightest. A mine winder, a proposal to cut twelve seconds off every trip, and an inquiry from March that cleared a driver without believing her. Over twelve days the player computes the machine — the velocity profile differentiated rather than assumed, the drum's inertia measured off the drum instead of read out of an eighteen-year-old file, the tension at the top of a rope that weighs eleven tonnes against a cage that weighs four — and then finds the thing the inquiry could not: **a brake stops the drum, and the cage is on a spring.**

The arithmetic that closes it is the most satisfying single result in the catalogue. The rope's stiffness is 110 kN/m and the cage is 4,000 kg, so ω = √(k/m) = √27.5 = **5.25 rad/s**, and a cage travels its own speed divided by 5.25 after the drum has stopped. That was a metre and six tenths in March, and **no pad ever made would have changed it.** The whole campaign is the derivation of that sentence, and the ending gives the credit to the player in the right terms: "a driver who had been cleared without being believed for eight months has an explanation with her name nowhere near the cause of it."

The internal consistency is the best I have measured. Day 5's board gives the cage's own potential energy as 4,000 × 9.81 × 1,240 = 48.7 MJ "of the 116 MJ total" — and the missing 67.3 MJ is a rope of 11 tonnes raised through its own centre of mass at 620 m, which is exactly the eleven tonnes day 2 established. Nothing on either card points at the other. Day 8's peak power is "a megawatt and a bit" against a 1.2 MW continuous rating, and the ending reports 86% of the power rating, which is 1.03 MW. Every number in this book was computed from every other one.

**Answerable:** 36/36 for the physics. But **21 of the 48 derivation steps ask a rule question with one possible answer** (OW-01), which is 44% — the worst in the set.
**Sense:** Excellent. Marchetti is right about the machine, Otieno is right about the rope, and the campaign says so in the ending rather than picking a winner.
**Level:** Right for Physics C Mechanics and demanding. Shell theorem, variable-mass flow, a rope as a distributed load, SHM on a spring you cannot see.
**Fun:** High. The inquiry gives the fortnight a reason that is about a person rather than a certificate.

## The questions, solved

Four boards, all verified: 4,000 × (9.81 + 1.2) = 44,040 N on the cage floor under ramp; 82 × (9.81 − 1.1) = 714 N on an 82 kg driver going up and slowing, against 804 standing still; 4,000 × 9.81 × 1,240 = 48.7 MJ of 116; and (0.3086 − 0.0849) ÷ 0.0838 = 2.67 g/cm³ by displacement.

The twelve derivations, and what each is for:

| Day | Derivation | Physics C topic |
| --- | --- | --- |
| 1 | Differentiate the submitted velocity profile → the ramp | kinematics from a curve, not a formula |
| 2 | 18 tonnes of drum → moment of inertia about its axis | rotational inertia |
| 3 | A rope heavier than its load → where the tension is worst | distributed load, tension as a function of position |
| 4 | What the motor is asked for | torque, and net torque on a rotating body |
| 5 | A force that falls all the way up | work by a position-dependent force |
| 6 | 320 t/h of ore in a stream | variable-mass momentum flow |
| 7 | 1,240 m of rock overhead → the shells above you | shell theorem, mass inside a radius |
| 8 | The worst instant → a megawatt and a bit | instantaneous power |
| 9 | 110 kN/m → what the rope does on its own | Hooke's law, elastic energy |
| 10 | What the brake does not stop | SHM: ω = √(k/m), and x = v/ω |
| 11 | 560 kJ into the pads | energy dissipation |
| 12 | Seven seconds, not twelve | the whole cycle, re-derived |

Day 10 is the payoff and days 1–9 are its prerequisites, in order, with no gaps. That is the cleanest dependency chain in the repo.

Three CHOICE stops worth naming. **"Both ends of one force"** — *equal and opposite, and on different bodies, so neither cancels the other* — is the correct statement of Newton's third law and the one students get wrong most often. **"Twelve hundred metres of spring"** — *its pull grows in proportion to how far it has been stretched* — is what makes day 10 available. And **"What the brake has hold of"** — *the drum, and everything else only through the rope* — is the whole campaign in nine words.

## Implemented since this review

- **OW-04** `dayNoun`.
- **OW-01 is corrected rather than fixed**, on the same grounds as Slack Water's SW-05: the 21 shared-rule steps are answerable from the chain's whole list. The real defect was that none of Overwind's 48 rule questions was being asked at all, because the importer dropped the flag. Fixed and gated.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| OW-01 | CLOSED | `askRule: true`, all twelve DERIVE stops | **Twenty-one of forty-eight derivation steps offer only one distinct `rule` among their candidates** — 44%, the worst of the three `askRule` campaigns (Slack Water 15/48, Dark Fibre 2/47). On those steps the second half of the answer is a click with one possible value, which is precisely the defect CLAUDE.md records as the reason `askRule` was switched off by default. The cause is visible in the rule vocabulary: **`substitution of the stated values` appears 35 times** and `rearrangement` 32, and those are not licences for a step, they are descriptions of typing. Examples of one-value steps: "Put that beside the motor's continuous rating of 1.2 MW" (every candidate `comparison of magnitudes`), "Work out the full-speed run" (every candidate `a distance divided by a speed`), and — the clearest case — "Write the tension at that position", where every candidate carries the rule **`the tension at that position`**, a rule name that restates the step's own instruction. | Two halves. **(a) Fix the vocabulary.** A rule should be a theorem or a technique the player could have chosen wrongly: the shell theorem, the no-slip relation, integration with respect to position rather than time, the choice of body for a free-body diagram. Overwind already has all four and they are the good ones. Retire `substitution of the stated values`, `rearrangement`, `comparison of magnitudes` and any rule that repeats the step's `ask` — 79 of roughly 192 candidate rules are one of those three. **(b) Do not ask on steps that cannot support it.** Substitution and arithmetic steps have one licence and always will. Since `askRule` is chain-level, that means either a per-step flag or folding those steps' rule into the `startNote`. **And make the count a check**: distinct rules per step is a fifteen-line measurement, and it is the only thing that distinguishes "naming the licence is the content" — which this book's own header comment claims — from a formality. |
| OW-02 | WITHDRAWN | Day 12 SCIENCETANK, "A hundred points before the inspection" | **This finding was wrong and is withdrawn.** I reported no `evidence`, having grepped for a book key that does not exist — the contract puts the evidence in `guide`. This stop's guide carries four facts, one per proposal: a pad coefficient measured cold on a bench and quoted for winds; a rope stiffness computed from the maker's modulus and never measured on this rope; a cage position tape at the inset that is the only instrument that saw March, with nothing like it at the bank; and a drum inertia now taken off the drum's own dimensions. Plus the line that prices the fourth: "the arrestors above the bank have never been used and have never been tested." | Nothing. |
| OW-03 | WORTH | Authored `background`, 24 of 36 stops | Twelve stops carry authored background; twenty-four do not. Same shape as Slack Water. The cost is highest on the derivations, where the wrong branches are the teaching and *why* a branch is physically wrong is often a fact about a mine rather than about algebra. | Add one paragraph per DERIVE answering "what does this let the inspector do that she could not do before". The day-7 shell-theorem stop is the case that needs it most: why the rock *above* you does not pull, stated once, would carry that whole day. |
| OW-04 | WORTH | `themes/overwind/theme.js` | No `dayNoun`, in a 12-day campaign whose clock is "the inspector who renews the winder's certificate in twelve working days". The plan card prints "Day N" and never says how many are left. Same finding as SW-03, CO-05, GL-02, CC-04, WM-03, IC-04 — cross-campaign §4. | Count down to the inspection. |
| OW-05 | TASTE | Day 11 "Four tonnes into a bin" | The key is *the bin takes it, and passes it to its bolts as an impulse*, which is right — but "four tonnes into a bin" is the only stop in the campaign that is not about the winder, and it lands on the day whose derivation is the pads' energy budget. It reads as a spare stop. | Optional: move it to day 6, where the ore stream is the subject. Day 11 would then be the pads' energy, the 0.9-second VERIFY and one of day 10's stops, which is a tighter day. |

## Day-by-day notes (short)

- **Day 1** — What the profile says. Differentiating a curve somebody submitted as a shape is the right first act, and the CHOICE about where the twelve seconds actually come from (*the ramps and the crawl at the end*) tells the player where the campaign is going.
- **Day 2** — What the drum is. Inertia measured rather than inherited, and the eleven tonnes of rope introduced as a load hung from the drum through the tension at the top.
- **Day 3** — The rope is heavier than the cage. Best mission title here, and the derivation finds the worst tension at the *top*, which is not where a student looks.
- **Days 4–5** — The torque is there, and where the work goes. The cold-measured friction figure is planted here and cashed in the ending's unfinished list.
- **Day 6** — Ore in a stream. Variable-mass momentum, and the third-law CHOICE.
- **Day 7** — A kilometre and a quarter of rock. Shell theorem, and a density by displacement.
- **Days 8–9** — The worst instant, and what the rope does on its own. 110 kN/m arrives here, and the CHOICE keys — *energy, which it will return to the cage as the stretch comes out*, and *letting the bounce on the rope die away before the stop* — are day 10 being assembled in front of the player.
- **Day 10** — A metre and six tenths. **The campaign.** The derivation, the DIAGNOSIS whose key is *the drum stopped and the cage did not*, and the CHOICE about what the brake has hold of.
- **Days 11–12** — Everything the pads have to take, and what gets signed. The final CASEBOOK on what the licence rests on is the right last question.

## Opening and closing

Opening: "Kerrow No. 3 is a mine, and everyone who works in it goes down twelve hundred and forty metres of shaft in a cage on a steel rope… Forty-one men a shift ride whatever gets signed." All four beats, both sides named with their arithmetic, and a consequence in people.

Closing: three paragraphs and the best in the catalogue. The first names the two limits nobody would have written a fortnight earlier, says **both experts were right about different things**, and puts the March stop in the file with an explanation attached. The second's unfinished list is specific and each item is a real gap. The third gives the player credit in physics terms and ends on the driver. Keep every word.

## Warm-ups

All seven authored and specific to a headframe alone on a moor. No findings.

## What to keep

- ω = √(110000 ÷ 4000) = 5.25, and "no pad ever made would have changed it."
- The 48.7 MJ of 116, with the missing 67.3 MJ being the rope day 2 weighed.
- Marchetti right about the machine, Otieno right about the rope, and the ending refusing to choose.
- "The drum, and everything else only through the rope."
- The driver. A campaign about a winder that is actually about somebody who was cleared without being believed.
