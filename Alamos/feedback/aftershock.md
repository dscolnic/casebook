# Aftershock — play-through review

*Theme `aftershock` · senior-high / early-college earthquake engineering (grade 12 manifest) · 15 days, ~45 stops · reviewed 2026-08-21 by reading the full book (`books/aftershock.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most *humane* campaign in the set, and the one whose subject is best matched to its formats. Every day is a decision about who gets to go home, and the science is what makes that decision defensible rather than decorative. It also has the cleanest arithmetic I have checked: every BALLPARK is correct, every distractor tile is the same quantity in the wrong role, and the two hardest ones (the seismic-moment build and the base-shear comparison) carry their own limits in the verdict — "0.82 is not a factor of safety, and calling it one claims far more than two pulls can carry" is the best sentence about measurement in any of these books.

It shares Blackout's wrong-number spine and uses it better in one respect: the reference station on weathered granite invalidates *some* conclusions and not others, and the TRACE makes the player sort them. But the follow-on stop that restates the corrected amplification does not agree with the TRACE that derived it, and that is the one finding worth fixing before anything else.

**Answerable:** 44/45. One stop's arithmetic contradicts the reveal it belongs to (AS-01).
**Sense:** Excellent. The placard/cordon/school/hospital threads all resolve.
**Level:** Right, and unusually well-calibrated — the stops that could over-claim say so themselves.
**Fun:** High. Marina Court (a building that failed without breaking) and the resident's photograph are the two best single scenes in the catalogue.

## Opening blurb

> "…you decide which buildings people are allowed back into: green to enter, yellow for restricted use, red for nobody. Four hundred households are sleeping in halls waiting on those decisions… Upper Town sits on granite and lost its chimneys. The Flats sit on eighty-year-old fill and lost their streets."

Authority stated as a decision, the cost in people, and the campaign's central contrast in the last two sentences. Keep.

## The questions, solved

Verified: (32−19)×8 = 104 km; M₀ = 3.0e10 × 6.0e8 × 1.1 = 1.98e19 N·m and M_w = ⅔·log₁₀(1.98e19) − 6.06 = 6.80; 25.5/31 = 0.82; 0.31 × 85 = 26.4 MN against 29.8; Omori day 8 = 26/2 = 13; Omori day 30 = 84 ÷ 30.2^1.05 = 84/35.8 = 2.35/day; σ = 244,000/0.00785 = 31.1 MPa; σ' at 3 m = 54 − 14.7 = 39.3 kPa; cone-resistance factor 2.75; amplification 0.41/0.082 = 5.0. The CHAIN (panel inertia → tie → diaphragm → end wall → foundation, governed by the small tie against a large-panel distractor) is the best CHAIN in the repo. Both ATTEST stops solve by consequence rather than by doubt, which is the harder and correct rule.

## Implemented since this review

- **The opening card** now names Rei Tanaka, who forecasts the sequence.
- Numeral damage.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| AS-01 | CLOSED | Day 12 "Five times, not three" (BALLPARK), against day 12's TRACE and day 1's CHOICE | Three incompatible amplification figures. **Day 1** reports the two records as giving "A_soft/A_rock ≈ 3". **Day 12's TRACE** — the reveal — states the published ×3.0, the reference station's ×1.6 site response, and computes the corrected value as "3.0 × 1.6 ≈ **4.8** relative to competent rock". **Day 12's BALLPARK** then divides the two raw peaks, 0.41 g ÷ 0.082 g = **5.0**, and presents that as the corrected number replacing 3. But dividing those two raw records is exactly the calculation day 1 said gives 3 — so the same two instruments yield 3 on day 1 and 5 on day 12 with no correction applied, and the answer disagrees with the 4.8 the TRACE just derived. | Make the BALLPARK compute the correction the TRACE set up, not a fresh raw division. Labels: `3.0 (the published Flats ratio)`, `1.6 (the reference station's measured site response)`, plus decoys `0.41 g`, `0.082 g`, `0.31 g`; template `{0} × {1}`, target `4.8`. Retitle to "Four point eight, not three" and update `answerText`/`why`. That also makes the stop teach the multiplication the reveal turns on rather than re-deriving a ratio the player already has. |
| AS-02 | WORTH | Day 12 "Five times, not three" scene and guide | Second half of the same problem: the guide instructs the player to "pick the two peak accelerations and divide", and the scene says "If the Flats amplify by five rather than three". Both describe the raw-division reading that AS-01 replaces. | Rewrite alongside AS-01: the scene should say the reference station's own response has been measured, and the guide should point at the two terms of the correction. |
| AS-03 | WORTH | Day 15, shared with Blackout | Day 15's three stops — an ATTEST titled "Measured, inferred, assumed", a CHOICE titled "The number that has to be a range", and a closer titled "What outlives the emergency" — appear with the same titles and the same argument in `blackout.yml` (and both junior editions and `blackout_fable`). The "Three things at once" mission and its DELEGATE stop "Which of the three cannot wait" are also shared, and that DELEGATE title appears in eight books. A player who plays both campaigns meets an identical closing triple with different nouns. | The shape is a good spine and worth keeping; the *titles and framing* are what make the repetition visible. Retitle and re-angle Aftershock's to its own subject — the range stop is about a design value rather than a winter peak, and "what outlives the emergency" here is a recording practice, not a cross-check. The DELEGATE is defensible as a recurring format; the two ATTEST/CHOICE closers read as copied. |
| AS-04 | WORTH | ~12 stakes and scenes | Numeral-normalisation damage, the fourth campaign with it: "**1** agency said 6.6 within 20 minutes" (day 2); "another said 6.8 **6** hours later"; "**1** side has gone down 340 millimetres" (day 4); "an audience that has heard **2** numbers and a rumour about a bigger **1** coming" (day 2); "**3** engineers have looked at it" (day 8); "**4** cores, 100 mm across" (day 8); "The **2** anchors tested at 24 kN" (day 5). "a rumour about a bigger 1 coming" is the worst — it is unreadable. | Editorial pass restoring the word where the digit replaced one that is not a count. |
| AS-05 | TASTE | Day 6 hospital ATTEST | `takesAsRead:` is present but empty (`takesAsRead:` followed directly by `assumes:`). Harmless if the importer tolerates it, but it is an authored key with no value in a book where every other stop's list is deliberate. | Delete the key or fill it (`Peak ground acceleration and what a building feels` is the obvious candidate, and it is used on the sibling stop). |
| AS-06 | TASTE | Day 4 "What eight degrees does" (CHOICE) | The key ("the weight now acts off-centre, adding bending to columns built to be squashed") is right, and the distractor "the lean will keep increasing on its own until the building falls over" is refuted in the rebuttal by a fact the card never gives the player — that the lean stops when pore pressure dissipates. The day-10 stop teaches that; this one is three days earlier. | One clause in the scene: "the lean has not changed in three days of readings" — which the day-4 VALUE stop already states in its `evidence` field, so it is only a matter of putting it where the CHOICE can see it. |
| AS-07 | TASTE | ~24 stops | Repeated format boilerplate in `background`. As everywhere. Notable here because Aftershock's stop-specific backgrounds are the strongest of the six campaigns read — "why the tanks matter", "why the unwritten leg is not automatically the answer", "what a core does not settle" — and they are third in a list the player has learned to skip. | Keep each essay on first use per format. |

## Day-by-day notes (short)

- **Day 1** — Two records of one earthquake, then the ground that produced the difference, then where the first assessor-day goes. A near-perfect opening day; the ALLOCATE's zero-cost "existing cordons" item is a lovely piece of design (a package on the board that answers nothing, there to be noticed).
- **Day 2** — The magnitude revision explained as a moment calculation is exactly the right way to teach "the number moved and the earthquake did not". The notice SEQUENCE (action, reason, revision, rate) is the best public-communication stop in the repo.
- **Day 3** — "Green does not mean safe" and the second-visit TRIAGE. The CASEBOOK on what six minutes outside a building can reach is the campaign's thesis.
- **Day 4** — Marina Court. A building that failed without anything in it breaking, and a VALUE stop whose right answer is to investigate the *twelve neighbours* rather than the famous building. AS-06 sits here.
- **Day 5** — Bay Road School. The CHAIN, the anchor pull tests at 0.82, and a partial-occupancy decision for 400 children. Best-integrated day in the campaign.
- **Day 6** — The hospital. ATTEST on the one unvisited room with two full water tanks over ninety patients; the basement accelerograph turning 0.31 g into 26 MN. AS-05 here.
- **Days 7–9** — Aftershock decay, then material testing, then the cordon. "A cordon is a claim, not a decision" is the right frame and the ATTEST on the southern leg with no logged reason is excellent.
- **Day 10** — The resident's photograph. Evidence arriving from outside the process, in public, with the correct answer being that six identical cracks are a construction joint. The best single mission in the set.
- **Days 11–13** — The quiet day on the bench, then the reference-station reveal. The TRACE is right; AS-01 is the stop after it.
- **Days 14–15** — Ground improvement vs foundation design, the acceptance target, and the closing triple (AS-03).

## Closing blurb

Three paragraphs. The middle one names what is unfinished — "the vault on the bench is still the reference station and still on weathered granite, the corrected amplification is a projection from nine boreholes" — which is unusually honest for a closing card, and the third is specific to the player's own calls. Keep unchanged.

## Warm-ups

Present and specific to a damaged town. No findings.

## What to keep

- Marina Court and the basement photograph. Two missions where the science is genuinely in service of a human decision.
- Every stop that states its own limit: "two pulls are not a factor of safety", "one number is not a spectrum", "a core does not reach the column".
- The TRACE that makes the player *keep* three conclusions and revise two. Withdrawing everything is the wrong answer and the panel says so.
- The zero-cost item on the day-1 ALLOCATE board.
