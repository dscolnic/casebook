# Outbreak: Riverton — play-through review

*Theme `outbreak_riverton` · college biology / epidemiology (grade 12 manifest) · 15 missions, ~46 stops · reviewed 2026-08-21 by reading the full book (`books/outbreak-riverton.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The best-*structured* campaign of the three reviewed so far. Every mission is one link in an evidence chain and the chain actually holds: the case definition on stage 1 is still the thing being defended on stage 15; the sewer sample on stage 8 retracts a public statement made in week one, and the closing stake says so. Three formats do work here that no other campaign gets from them — the TRACE (a positive no-template control invalidating a run 3,000 people are already isolating on), the ATTEST (two checks, four signed claims, and the *right* answer is not the shakiest claim), and the ALLOCATE (a field campaign whose value is the comparisons it preserves, not the animals it samples). Level is right and the arithmetic is honest.

Two things need fixing. Several DIAGNOSIS panels mark their reassuring readings `alarm`, which contradicts the whole "the quiet readings decide it" method the campaign teaches five times over. And one BALLPARK is wearing another stop's multiple-choice question. Beyond that: a numeral-normalisation pass has mangled about a dozen sentences ("the 1 Health lead", "the region's hundred and 20 beds").

**Answerable:** 43/46 clean. One stop carries two questions (OR-02); two stops' panels fight their own guides (OR-01, OR-03).
**Sense:** Strong across missions. Damage is local and mechanical.
**Level:** Right. PPV from a 2×2, NNT, doubling time, Henderson–Hasselbalch — all first-year-college, all one relationship.
**Fun:** High. The "stage" day-noun is a good call, and the stake dates (Day 1 → Day 140) give the campaign a shape the others don't have.

## Opening blurb

> "Three hospitals in one river city reported the same unusual illness inside a day of each other… An outbreak is only stoppable while it is still small, and this one has been running for four days."

Four beats, Morales named with her job, the clock last. One of the best in the set. Keep.

Also worth recording: `dayNoun: 'Stage'` means the plan card reads "Stage 5" while the stake reads "Day 33", and the two never collide. This is the fix the calendar-day campaigns (contamcity, deepwatch) need — same device, no contradiction.

## The questions, solved

All arithmetic verified: PPV = 90/(90+99) = 47.6% with sensitivity 90% and specificity 99% from the same 2×2; 500 × 2^(480/40) ≈ 2.05 M cells; 3 × 0.20 = 0.6 L O₂/min against 1.0; pH = 6.1 + log₁₀(14/(0.03×31)) = 7.28; (180/600 − 40/400)×100 = 20 percentage points; NNT = 1/(0.10−0.05) = 20; 30/8 = 3.75 days to capacity. Distractor tiles are consistently the *same quantity in the wrong grouping* (pooled weeks, pooled arms, total beds instead of free beds, 8 h beside 480 min beside the conversion) — which is the right trap for this course, because pooling is the error the campaign is about.

The TRACE solves uniquely: patient wells and the NTC share `workflow_carryover`, the positive control shares only chemistry, the orthogonal platform shares nothing — so keep two, untick two, name carryover. The CONTROL solves with the reversal (100 → 22 → 96 on washout, matched antibody 97, noise 5). CHAIN's governing link is gas exchange and `circulation` is a fair distractor because 5.2 L/min is the largest number on screen.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| OR-01 | CLOSED | Stage 11 "Why did the therapy fail?" (DIAGNOSIS) | The panel marks its two exculpatory readings as alarms: `Reference isolate — remains drug-sensitive: alarm` and `Administration record — doses documented: alarm`. Both are *normal* findings, and the stop's own guide says so ("the normal ones do the work… the administration record is complete"). A player reading statuses sees five alarms and no discriminators, which destroys the method this campaign teaches on five separate DIAGNOSIS stops. Same defect, milder, on stage 7 (`Neutralizing antibody — present: alarm`). | Set both to `normal` with their existing notes (they already read as clearances: "The assay can still detect drug activity", "No major missed-dose pattern"). On stage 7, `Neutralizing antibody` is defensible as `high` — notable, not alarming. Worth a sweep of every `status:` in this book against its own guide text. |
| OR-02 | CLOSED | Stage 6 "Read the downstream acid–base signal" (BALLPARK) | The stop carries a complete second question grafted on: `choices` / `answer: Tissue lactate and acid-base status` / three rebuttals — which belong to a "what do you measure next" CHOICE, not to a pH estimate. Either the player sees two questions on one card, or (if the renderer ignores them) four authored rebuttals reach no screen. The `question`, `guide` and `estimate` block are all about pH. | Decide which stop this is. Recommended: keep the pH estimate, move the four "what next" lines into `background` as a closing paragraph ("what this settles and what it does not"), delete `choices`/`answer`. If the CHOICE is wanted, it deserves its own stop — the day has room. |
| OR-03 | WORTH | Stage 6, across all three stops | Three descriptions of the same patient disagree. The stake says the failing patient's "oxygen saturation reads normal" and that "the second patient's heart rate has not moved all morning"; the CHAIN panel says "arterial oxygen low"; the delivery BALLPARK's distractor tile says "86 % (arterial saturation)". Also the CHAIN's `headline` is "Two patients have severe fatigue and low tissue oxygen delivery" over a console showing one patient. | Pick one clinical picture. The interesting version is the stake's: saturation *looks* acceptable and delivery is halved — that is the day's lesson. Then the CHAIN's abnormal reading should be "arterial oxygen 86 % with diffuse alveolar involvement on imaging", and the headline should name the one patient the console belongs to. The unmoving heart rate is a nice detail but nothing on any panel reports it; either add the row or drop the sentence. |
| OR-04 | WORTH | ~12 stakes and scenes | Numeral normalisation has damaged sentences that read as nonsense: "Dr. Arjun Singh, the 1 Health lead" (stage 9); "Day 121 districts are on visibly different paths and the council wants 1 policy" (stage 14, missing the sentence break and "Three"); "90 of the region's hundred and 20 critical-care beds" (same); "in 4 weeks, in 1 district" (stage 10); "1 of them at 40 times the level" (stage 4); "It also supplies much of the apparent benefit… positive four days before" is fine but "3000 people have already been told to isolate" wants a comma (stage 5). | One editorial pass restoring words where the numeral is doing no work: *One Health*, *one policy*, *one hundred and twenty*, *one district*, *one of them*. The books are free to spell numbers either way — the failure is only where the digit replaced a word that was not a count. |
| OR-05 | WORTH | Stage 13 "Did the comparison stay fair?" (CHOICE) | The three distractors are self-incriminating in their own labels: "Delete the young site **because it makes the treatment look too effective**", "Ignore site entirely **because randomization guarantees identical groups everywhere**", "Create new age cutoffs after seeing the result **until the treatment effect becomes stable**". Nobody who has read the phrase "after seeing the result" picks it. The key is also the longest option. | Neutralise the labels to what a real analyst would say: "Exclude the atypical site and report the remaining eight", "Report the pooled estimate — randomisation handles site", "Re-band age until the subgroups are large enough to compare". The rebuttals already carry the reasons; the options should not. |
| OR-06 | WORTH | Stage 1 "Signal or noise?" (DIAGNOSIS) | The `Reporting` reading says "5 by one alert rule" and the guide/why both hang the answer on "two of the seven were found on manual chart review". The player is asked to do 7 − 5 = 2 and then infer a *method* for those two, which the panel never states. It is the panel's decisive reading and it is the only one that has to be reconstructed. | Make the row say what it means: value "5 by the alert rule, 2 on manual chart review", status `key`. Nothing else changes and the stop becomes settleable from the panel alone. |
| OR-07 | TASTE | Stage 3 "Separate binding from entry" (CONTROL) | The block carries two parallel descriptions of the same experiment — `variables[].result` / `deltaFromBaseline` *and* a full `states` table, plus top-level `baseline`, `response`, `changedReading`. If the panel reads one and the exporter reads the other, they can drift. | Keep whichever the panel reads and delete the other; if both are load-bearing, add a comment saying which is authoritative. (Worth checking against the other CONTROL stop in `books/instruments.yml`.) |
| OR-08 | TASTE | Stage 8 BELT "Clean side, dirty side" | Two items are conditions rather than objects on a tray — "Filtered air line" (clean) and "Room air exposure" (dirty). On a belt of physical items they read as category labels that fell into the item list. | Replace with objects that carry the same lesson: "Cabinet air inlet filter" and "Tube left open on the bench". |
| OR-09 | TASTE | ~24 stops | The repeated format essays in `background` (matching-board, sequence-graded-whole, distractor-shape) — same as contamcity and deepwatch. Notable here because the *stop-specific* backgrounds are excellent (the ALLOCATE's "why comparisons rather than counts", the ATTEST's "what proposed strength means"), and the boilerplate is what trains the player to stop opening the door. | Keep the essay on first use of each format; elsewhere leave only the stop-specific paragraphs. |

## Stage-by-stage notes (short)

- **Stage 1** — The baseline argument ("seven against two a year") is the right first question for the whole discipline. OR-06 is the one reconstruction the player shouldn't have to do.
- **Stages 2–4** — Agent classification off *negatives* is a genuinely good hard question. The CONTROL's matched-antibody arm is the format used properly.
- **Stage 5** — The TRACE is the best stop in the campaign: a contaminated run, a ward already clearing isolation rooms, and the correct answer is to throw away results everyone wants. The SPOT (triage rule rewritten mid-afternoon) is well-matched to a marquee.
- **Stage 6** — Strongest content, weakest bookkeeping (OR-02, OR-03).
- **Stages 7–8** — Late deterioration with falling pathogen burden is exactly the timing lesson this course needs; the wastewater PROTOCOL's "prevalence stays high after incidence falls" pairing is subtle and fair.
- **Stages 9–10** — The heron colony being the *wrong* animal, with a council order already signed, is the best political stake in the set. The ALLOCATE and the selection-vs-sampling DIAGNOSIS reinforce each other properly.
- **Stages 11–13** — Resistance arc lands; the "organism learned to resist it" line in the scene, refuted by the SEQUENCE beside it, is good teaching. OR-01 and OR-05 sit here.
- **Stages 14–15** — TRIGGER's lead-time reasoning (fire at 80% because staffing takes a day) is clean. The ATTEST close is the right final exam, and choosing checks by *consequence* rather than by shakiness is the campaign's thesis restated.

## Closing blurb

Three paragraphs, last addressed to the player and specific ("you built a case definition that survived from the third week to the last, you tested what would change a decision rather than what was easy to test"). Earned. Keep.

## Warm-ups

All eight authored (this is a two-tier site, so it carries `trial-far` as well) and all specific: six ventilators with the board accounting for four; the journalist at the gate who wants an unconfirmed case count; catching Patel before he gowns into the container lab, because his run sheet is the only record of which plates were re-tested. `trial-far` is correctly written around the containment ward opening and transport being signed out the same day. Names arrive with jobs. No findings.

## What to keep

- `dayNoun: 'Stage'` beside calendar-day stakes — the pattern the other campaigns should copy.
- Cross-stage retraction (the sewer sample overturning the hospital-cluster story) named in the closing stake.
- The ATTEST's rule that the last two checks go where a wrong claim does lasting damage, not where the evidence is thinnest.
- Distractor tiles built from pooled denominators. That is the discipline's central error and it appears four times in four disguises.
