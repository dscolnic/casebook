# Ice Core (grade 6 edition) — play-through review

*Theme `icecore_ms` · middle-school earth science, grade 6 · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/icecore-ms.yml` in full, working every board, and comparing against the parent `icecore`.*

## Verdict

The junior edition with the most arithmetic done *in words*, and it works. Eight boards, and the solutions are written the way a sixth grader would say them aloud — *"Minus fifty-four divided by thirty is minus 1.8 degrees"*, *"Eighty-eight ÷ 0.32 is about 275 years"*, *"Sixteen ÷ twelve is about 1.3 years"*. All eight are correct:

| Board | Arithmetic | Idea |
| --- | --- | --- |
| How thick a year is here | 0.32 × 340 ÷ 917 ≈ 0.12 m | snow to ice equivalent |
| One year proves nothing | −54 ÷ 30 = −1.8 °C | an average of thirty readings |
| How old the bottom of the snow is | 88 ÷ 0.32 ≈ 275 years | a depth divided by a rate |
| What the ratio says in degrees | 1.8 ÷ 0.67 ≈ 2.7 °C | a proxy turned into a temperature |
| How much younger the air is | 88 × 0.62 ÷ 0.119 ≈ 460 years | the gas–ice age difference |
| How much more carbon dioxide | 90 ÷ 190 × 100 ≈ 47% | a percentage increase |
| The clock that does not need layers | 5,730 × 2 = 11,460 years | two half-lives |
| The shortest thing this ice can show | 16 ÷ 12 ≈ 1.3 years | resolution as a ratio |

The gas–ice age difference survives the derivation, which is the surprising part: the parent's whole resolution is that two records were compared on two different clocks because a bubble and the ice around it are 458 years apart, and the junior edition computes 460 with one multiplication and one division. That is a genuinely subtle finding delivered at grade 6 without softening it.

**Answerable:** 33/33.
**Sense:** Strong. The disagreement with a camp four hundred kilometres away drives all ten days.
**Level:** Right. `questionLoad` reports 3 of 33 demanding stops (9%).
**Fun:** Good. A plane in fifteen days and "anything not measured by then waits two years" is a clean deadline.

## Implemented since this review

- **IM-01** was fixed during the review.
- **IM-02** `dayNoun`.
- Numeral damage.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| IM-01 | FIXED | Two passages | The brittle-zone depth range had been destroyed by numeral normalisation — *"Ice between **51200** metres holds bubbles at pressures the surface cannot support"*, where "500 and 1," had been swallowed. Repaired to "between 500 and 1,200 metres" earlier in this review, in this book and twice in the parent. Re-imported, both themes green. | Done. |
| IM-02 | WORTH | `themes/icecore_ms/theme.js` | **No `dayNoun`.** The plan card prints "Day N" while the campaign's clock is "the plane comes in fifteen days" — and the campaign is ten days long, so the plan card's number and the aircraft's number are two different counts with no help telling them apart. This is the most confusing instance of the finding in the junior set. | Count down to the plane. Cross-campaign §4. |
| IM-03 | WORTH | Days 2, 3 and 6 | Three of ten days author 4 stops, so those three carry no callback. | Prefer a move to a delete: days 7–10 all carry three. |
| IM-04 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. | Three or four variants. |
| IM-05 | WORTH | `engine/dev/concept-debt.json`, 7 rows | Seven ordering rows, no `takesAsRead` at grade 6. Two are within-day pairs — *a ratio can be turned into a temperature* resting on *something measured today can stand in for something nobody measured then*, and *averages, and why one year proves nothing* resting on graph reading — and a prerequisite beside its dependent is met second by half the players. | Read the two same-day pairs first; a move is cheaper than a written claim. |
| IM-06 | WORTH | `engine/dev/curriculum-debt.json`, 2 rows | `speed = distance ÷ time` and `time = distance ÷ speed` recorded as uncomputed. Same prose-equation matcher caveat as `blackout_ms`'s BM-01: check the boards before treating these as content work. "How old the bottom of the snow is" computes 88 ÷ 0.32, which is a depth divided by a rate — arguably the second of the two. | Re-check, then write whichever is genuinely absent. |
| IM-07 | TASTE | Numeral damage, 2 occurrences | "1 of", "1 cm". The parent has eleven, including the two that were fixed. | Editorial pass. |

## What the derivation did well

- **It kept the gas–ice age difference.** The hardest idea in the parent, computed at grade 6, with the right answer.
- **It kept the disagreement as the plot.** "A disagreement kept quiet is a decision made for everybody else" is Marit Halvorsen's line on the opening card and it is a better statement of scientific ethics than most of the senior campaigns attempt.
- **The prose is written to be read aloud.** "Minus fifty-four divided by thirty is minus 1.8 degrees" is how the arithmetic should look at this level, and eight boards do it consistently.

## Opening and closing

Opening: 111 words, names Marit Halvorsen with the job attached and gives her the campaign's ethical position. The best-argued junior opening in the set.

Closing: three paragraphs, inheriting the parent's hedged-sentence ending — "the report said so in the hedged sentence rather than the confident one" — which is a remarkable thing to keep at grade 6 and the right thing to keep.

## Warm-ups

Authored for this edition. No findings.
