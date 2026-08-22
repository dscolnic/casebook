# The Trial (AP Statistics edition) — play-through review

*Theme `the_trial_hs` · AP Statistics, retargeted from clinical epidemiology · grade 12 · 15 days, 48 stops · reviewed 2026-08-21 by reading `books/the-trial-hs.yml` in full, working every board, and comparing against the parent `the_trial`.*

## Verdict

The most complete AP Statistics course in the catalogue, and I would be surprised if a stats teacher could name a topic it misses. Fifteen estimate boards, and between them they cover the syllabus:

| Board | Statistic | AP Stats topic |
| --- | --- | --- |
| 546 ÷ 9 = 60.7 years | mean | one-variable data |
| √(1156 ÷ 4) = 17 m | sample standard deviation | spread, and n − 1 |
| (148 − 34) ÷ 19 = 6.0 | z-score | standardising |
| 0.001 + 0.004 + 0.020 = 0.025 | α-spending | multiplicity |
| 18 ÷ 24 = 0.75 | conditional probability | probability |
| 610 × 0.042 + 604 × 0.061 = 62.5 | expected count | expected value |
| 96 ÷ √900 = 3.2 m | standard error of a mean | sampling distributions |
| 1.4 × 10²⁰ × 1.5 × 10⁻¹⁹ × 0.0026 = 0.055 | binomial, exactly twelve of 240 | binomial distribution |
| √(0.064 × 0.936 ÷ 140) = 0.021 | standard error of a proportion | sampling distributions |
| 214 + 16.5 × 11.8 = 409 m | least-squares prediction | regression |
| 0.189 − 0.147 = 0.042; 1 ÷ 0.042 = 24 | risk difference and NNT | two-proportion inference |
| 0.42 × 96 ÷ 3.1 = 13 | regression slope from r, sx, sy | regression |
| (0.195 − 0.13) ÷ 0.0232 = 2.8 | one-proportion z | inference |
| 0.31 + 2.94 + 0.08 + 1.12 = 4.45 against 7.81 at 3 df | chi-square | categorical inference |
| 29 ÷ √(14.6 + 15.7) = 5.2 | two-sample t | inference |

I worked all fifteen and every one is correct, including the two that are easy to get wrong: the sample SD divides by n − 1, and the χ² is compared against the right critical value for three degrees of freedom.

What the retarget bought is worth naming. The parent is a campaign about a **standard of proof** — what a trial promised before it had data and what it is therefore entitled to say — and every statistic here is attached to a decision somebody in the building has to make. That is the thing an AP Stats course almost never has. The α-spending board survives from the parent unchanged and is still the best stop in either edition: 0.001 + 0.004 + 0.020 is the whole budget, and the unplanned look costs 0.015 with no room for it.

**Answerable:** 48/48.
**Sense:** The parent's plot survives intact, and the retarget added a regression thread that fits it.
**Level:** Right for AP Statistics and a fair way past it — a binomial with n = 240 and a χ² on a four-cell table are both at the top of the course.
**Fun:** Inherits Feldman versus Balogun, which is the best-sustained argument in the set.

## Implemented since this review

- **TH-04**, the two damaged titles, in all three editions.
- **TH-02**, the opening card now names Dr. Miriam Feldman.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| TH-01 | CLOSED | 14 of 48 stops | **The title is the parent's and the question is not.** `derive-edition` carries titles across and `editionParity` deliberately does not compare content, so a retarget can keep a title whose subject has moved. On several the title now describes something the stop no longer does: **"A trial ends at a number of events"** → *estimate the mean age of the nine randomised at Lisbon*; **"What has to be told, and how fast"** → *estimate the z-score of the reported liver value* (the parent's version is a PROTOCOL about reporting timelines); **"Everyone as assigned"** → *estimate the probability of exactly twelve errors in 240 dispensings* (the parent's is the intention-to-treat stop, which is what that phrase means in a trial); **"Kit that cannot be vouched for"** → *estimate the standard error of the observed failure proportion*; **"Who a wider door lets in"** → *estimate the standard error of the mean at 900 people*. A title is read on the plan card, on the map and above the question, and "Everyone as assigned" over a binomial calculation is actively misleading — it names a named methodological principle and asks something else. | Retitle the fourteen after what each question now asks. Several are one phrase away: "A trial ends at a number of events" → "Nine ages, and their middle"; "Everyone as assigned" → "Twelve of two hundred and forty". Same finding in `deepwatch_hs` (16 stops) and `contamcity_hs` (6) — cross-campaign §10, with the shared fix. |
| TH-02 | WORTH | `opening:` | The card names nobody. The parent's does not either. Both are excellent otherwise — the parent's two-sentence statement of symmetric risk is the best in the set — and CLAUDE.md's third beat asks for a person in the clock or the argument. Feldman and Balogun run the whole fortnight and neither is on the card. | One clause. "Marisa Feldman, who chairs the committee, holds that a result this size will not get larger" — or whichever side she takes. Cross-campaign §8. |
| TH-03 | WORTH | Days 1, 6 and 12 | Three days author 4 stops against the loop's 3, matching the parent. The parent's TT-01 finding also applies: the `# day` banner comments sit above the fourth stop of the previous day, so an author editing day 6 edits day 5's stop. | Move the banner comments down past the stop they precede, in both books. |
| TH-04 | WORTH | Numeral damage, 8 occurrences plus 2 titles | Two damaged stop titles — **"40 hours before the lock"** and **"3 days, 41 queries"** — both inherited from the parent, which has the same two, as does `the_trial_ms`. Six titles across three editions from one pair of sentences. | "Forty hours before the lock", "Three days, forty-one queries". Six edits across three books. Cross-campaign §1. |
| TH-05 | TASTE | Format mix | 15 of 48 stops are BALLPARK and the retarget made almost every conversion in that direction — six stops changed format from the parent and five of the six became BALLPARK. `formatMix` passes and every equation is computed, so nothing is broken. But an AP Stats course's characteristic move is *deciding what a number licenses*, and the parent's TRACE, CLOUD, ATTEST and DEGENERACY are where that happens. | Nothing needs fixing. Recording it because the parent's mix is better and this edition kept fewer of its instruments than `deepwatch_hs` did. |

## What the retarget did well, and worth copying

- **One long floor, and the walk down it is distance from the patient.** The place is unchanged and it still means what it meant.
- **Every statistic is attached to a decision.** A standard error is what a board is about to act on, not an exercise.
- **The α-spending stop survives the retarget untouched**, because it was always the best statistics teaching in the repo.
- **The `same-grade-retarget:` marker** names AP Statistics against the parent's clinical epidemiology on one line in `themes/the_trial_hs/theme.js`.

## Opening and closing

Opening: inherits the parent's symmetric-risk framing in shorter sentences. TH-02 is its one gap.

Closing: three paragraphs, and the second is as brave as the parent's — it names the dropped symptom score as a cost and the nine patients told they may have had weakened doses. Keep.

## Warm-ups

Authored for this edition rather than inherited, which is the rule. No findings.
