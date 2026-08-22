# Blackout (grade 6 edition) — play-through review

*Theme `blackout_ms` · middle-school physical science, grade 6: circuits, energy and the grid · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/blackout-ms.yml` in full, working every board, and comparing against `blackout` and `blackout_fable`.*

## Verdict

The junior edition with the most arithmetic in it — nine of thirty-three stops are estimate boards, the highest count in the junior set — and all nine are correct and correctly pitched:

| Board | Arithmetic |
| --- | --- |
| How much went missing | 6,400 − 6,100 = 300 MW |
| The power that never arrives | 1,150 × 1.5 per hundred ≈ 17 MW |
| Why the far end sits low | 1.07 ÷ 11 ≈ 9.7% |
| Power for four hours | 5.6 × 4 = 22.4 MWh |
| What comes out against what went in | 187 ÷ 220 = 0.85 |
| What a short circuit is limited by | 6,350 ÷ 0.42 ≈ 15,000 A |
| The peak, and what the cold adds | 6,400 + 120 × 4 = 6,880 MW |
| What the dark hours cost | 300 × 2.5 = 750 MWh |
| The same line, busier | 1,280 × 1.6 per hundred ≈ 20 MW |

Two of those are worth naming as good grade-6 writing. **"The power that never arrives"** and **"The same line, busier"** are the same calculation at two loads — 17 MW against 20 MW — so the player discovers by arithmetic that a 11% busier line loses 20% more, which is the square in I²R without the square being mentioned. And the percentage boards are phrased as *"eleven and a half hundreds, and 1.5 lost from each hundred"*, which is how a sixth grader can actually do a percentage in their head.

The campaign's spine survives the derivation: four million people, one number, a corridor sensor that was confident and wrong, and a fortnight of holding two sides together. Chinelo Obi is named on the opening card with her job attached and her position stated — *"would rather switch off fourteen thousand homes than let the number fall"* — which is better than the fable edition manages.

**Answerable:** 33/33.
**Sense:** Strong. The number-that-is-a-balance framing on the opening card is the clearest statement of grid frequency at any level in this repo.
**Level:** Right. `questionLoad` reports 5 of 33 demanding stops (15%).
**Fun:** High. "A fault takes seconds. Getting the power back takes days."

## Implemented since this review

- **BM-01a is done and it went the other way from expected.** The general fix — an equation's own content words as keywords where its signature is unmatchable — was written, measured at **zero effect**, and reverted. What did work is one keyword: `the share`, added to fourteen lists, which makes the gate see *"Lost = what it carries × the share lost"* as `part = whole × share`. One row cleared, verified by hand against the board, with a before/after diff across all 42 themes confirming nothing else moved. **blackout_ms is 2 of 5 rather than 1 of 5**, and the other three rows are real.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| BM-01 | RECORDED | `engine/dev/curriculum-debt.json`, 4 rows — and the gate that produced them | The file records four of five syllabus relations as uncomputed: `how long = amount ÷ rate`, `part = whole × share`, `average = total ÷ how many`, `spare = what can be made − what is being used`. **At least two are false.** `part = whole × share` **is** computed, twice, by "The power that never arrives" and "The same line, busier", whose relationship reads *"Lost = what it carries × the share lost"* — whole × share, in the campaign's own words. The gate cannot see it because the equation has no symbols, so `symbolSignature` contributes nothing and everything rests on a five-word keyword list (`per cent`, `percent`, `percentage`, `share of`, `out of a hundred`) that does not contain the words the board actually uses. `spare = …` is arguably also computed, with the sign flipped, by "How much went missing". CLAUDE.md's own rule applies: **a debt file recording gaps that are not there is worse than no debt file**, because the work list is wrong and the two real gaps hide among the false ones. | Measured against the boards: of the four rows, `part = whole × share` was false and is cleared. The other three are real — no board computes `how long = amount ÷ rate` or `average = total ÷ how many`, and `spare = capacity − demand` is genuinely a different quantity from the shortfall "How much went missing" computes (6,400 − 6,100). Each wants one written stop, and this edition has no three-stop day free to put one on, so it is a day-count change as well. Recorded. |
| BM-02 | WORTH | Days 3, 8 and 10 | Three of ten days author 4 stops, so those three carry no callback. With zero `— Review` variants (BM-03) the point is moot today, but it will bind the moment variants exist. | Prefer a move to a delete. |
| BM-03 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. | Three or four variants. |
| BM-04 | WORTH | `engine/dev/concept-debt.json`, 7 rows | Seven ordering rows and no `takesAsRead` available at grade 6, so all seven are ordering or writing. Two point at the same base — *current is the flow, voltage is the push* and *something in the way makes it harder for current to flow* both precede the breaker concept — which suggests one early stop claiming both would clear several rows at once. | Write the one claim rather than moving three stops. CLAUDE.md records that two batches of concept work made the total *worse*, so re-measure after each. |
| BM-05 | TASTE | Numeral damage, 3 occurrences | "1 million", "1 place". Minimal — this book is among the cleanest. Note that the parent has the same three and the fable edition three more. | Editorial pass. Cross-campaign §1. |

## What the derivation did well

- **It kept the number that is a balance.** "That rate is not really a reading. It is a balance: how much power the stations make against how much everyone is using." That is the parent's physics in a sixth grader's sentence.
- **Two boards that are one calculation at two loads**, so the square in I²R arrives as a discovery rather than a formula.
- **The opening names a person with a position**, which two of the three Blackout editions do not.

## Opening and closing

Opening: 111 words in nine short sentences, all four beats, and Chinelo Obi's position stated rather than her title recited. Good.

Closing: three paragraphs. Inherits the parent's, including the best unfinished-business line in the set — "the practice that would have caught all of it … is a paragraph in a report until somebody on nights makes it a habit."

## Warm-ups

Authored for this edition. No findings.
