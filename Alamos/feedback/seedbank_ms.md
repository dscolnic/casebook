# Wellmere (grade 6 edition) — play-through review

*Theme `seedbank_ms` · middle-school life science, grade 6: heredity and plant breeding · 9 days, 33 stops · reviewed 2026-08-21 by reading `books/seedbank-ms.yml` in full, working every board, and comparing against the parent `seedbank`.*

## Verdict

The junior edition that teaches the most, and the nine boards are the reason. All nine are correct and every one is a decision the breeding station has to make:

| Board | Arithmetic | Idea |
| --- | --- | --- |
| Counting a generation | 400 × 0.75 = 300 expected against 306 counted | a ratio as a prediction |
| Where a tonne of grain comes from | 11 × 0.9 ≈ 9.9 tonnes out of the air | photosynthesis as mass |
| What the trial can actually claim | 11 ÷ 2 = 5.5 times bigger in a dry season | an effect that depends on the year |
| Short is not simply worse | 8.6 ÷ 19.6 ≈ 0.45 against 0.33 for tall wheat | a ratio beats a total |
| Not the number of plants | 18 ÷ 120 × 100 = 15% | effective population as a share |
| What one round returns | 7.4 + 0.3 × 1.7 ≈ 7.9 t/ha | the breeder's equation |
| What was lost, and when | 30 × 5 ÷ 100 = 1.5 plants — one or two, often none | why a small grow-out loses things |
| What the catalogue says and what is there | 9,000 × 0.33 ≈ 3,000; on 41,000 that is 13,500 | scaling a sample to a collection |
| Twelve years, and what they are for | 2,352 ÷ 12 = 196 mm against 118 this summer | an average against one year |

Three of those are better teaching than the parent's equivalents. **"What was lost, and when"** — thirty plants at five per cent gives 1.5 expected, "one or two, often none", where two hundred plants would give ten — is genetic drift explained by an expected count, which is exactly how it should be explained and almost never is. **"Short is not simply worse"** turns a yield comparison into a ratio, which is the move the whole campaign is about. And **"Counting a generation"** predicts 300 and reports 306, so the ratio is evidence rather than a rule.

**Answerable:** 33/33. The mis-keyed DNA-marker stop this edition shared with the parent was fixed earlier in this review; both are green.
**Sense:** Excellent. Three people want the same ground and none of them is wrong.
**Level:** Right. `questionLoad` reports 4 of 33 demanding stops (12%), and the campaign computes 4 of 4 syllabus relations — one of only four junior editions at 100%.
**Fun:** Good, and the rings are the best-conceived place in the junior set: the geography *is* the genetics.

## Implemented since this review

- **WM-01's arithmetic** (16 of 400, not 11) in this edition too.
- **SM-02** `dayNoun`.
- Numeral damage.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| SM-01 | PLAN | Six of nine days author 4 stops | `per-day` is `[4,4,4,3,3,4,4,4,3]`. Six of nine days at the loop's maximum, second only to `planetary_defense_ms`, and it means six of nine days carry no callback. Thirty-three stops in nine days is 3.7 a day: the content wants ten days. | **Reclassified for the same reason as `planetary_defense_ms`'s PM-02** — six four-stop days is a real load problem, and it is not on its own why this edition has no callback. See `_plan.pdf`. |
| SM-02 | WORTH | `themes/seedbank_ms/theme.js` | **No `dayNoun`.** Three junior editions are missing it — this, `aftershock_ms` and `icecore_ms`. The clock here is "sowing starts in three weeks" and the plan card prints "Day N". | One line. Cross-campaign §4. |
| SM-03 | WORTH | `engine/dev/concept-debt.json`, 5 rows | Five ordering rows, no `takesAsRead` at grade 6. CLAUDE.md records that moving Wellmere's bagging stop to day 1 made `jargonDepth` fire, because that card defines *Pollen* with *Chromosome*, unseen until day 4 — so this campaign has already had one move rejected on a vocabulary ground, which is worth noting in the debt file so it is not retried. Three of the five point at *variety inside a collection, and why losing it is hard to undo*, which is what "What was lost, and when" teaches. | Claim it explicitly at that stop rather than moving anything. One `concept:` line may clear three rows. |
| SM-04 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. This edition has the strongest case of the twelve: the drift idea on day 6 or 7 is the one a child will not hold from a single serving. | Three or four variants, best added with SM-01's extra day. |
| SM-05 | TASTE | Numeral damage, 3 occurrences | "1 field", "1 door", "1 plant". Minimal — the parent has twenty. | Editorial pass. Cross-campaign §1. |
| SM-06 | TASTE | The opening card | Names both Dr. Chiara Volpe and Dr. Nasrin Qureshi with their jobs and their positions — *"wants a new wheat sent out to farmers this year"* against *"the oldest samples must be grown again first, while enough of them still come up"*. Both sides of the argument, on the card, at grade 6. Recording it as the model. | Nothing. This is what the eleven campaigns whose opening cards name nobody should look like. |

## What the derivation did well

- **It kept the three-way argument over ground**, and it kept all three people right.
- **Drift as an expected count.** 30 × 5 ÷ 100 = 1.5 is the best single idea in the junior set.
- **The label.** "WM-712 went to the merchant with its weakness written on the label" survives into the ending, which is the campaign's ethical position and a sixth grader can hold it.
- **"The records still disagree with the markers on 60 samples."** An unfinished item that is a number.

## Opening and closing

Opening: 108 words, both sides named with positions. Best junior opening in the set alongside `icecore_ms`.

Closing: three paragraphs. "What is in the ground this year is what you…" — the last paragraph is addressed to the player and gives the credit in the campaign's own terms.

## Warm-ups

Authored for this edition. This is a two-tier site, so `trial-far` is present. No findings.
