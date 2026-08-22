# Aftershock (grade 6 edition) — play-through review

*Theme `aftershock_ms` · middle-school earth science, grade 6 · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/aftershock-ms.yml` in full, working every board, and comparing against the parent `aftershock`.*

## Verdict

The junior edition with the best-preserved *argument*. Kestrel Bay three days after an earthquake, Upper Town on granite with lost chimneys and the Flats on made ground with lost streets, and four hundred families in halls waiting on a green, yellow or red card. The whole campaign is one decision repeated — which buildings people may go back into — and at grade 6 that is a better frame than most of the senior campaigns manage.

Five boards, all correct and all pitched at one or two operations:

| Board | Arithmetic | Idea |
| --- | --- | --- |
| How far away it started | 32 − 19 = 13 s; 13 × 8 = 104 km | S−P time as a distance |
| The same event, recorded twice | 1,100 ÷ 0.4 = 2,750 m/s | wave speed tells you the ground |
| What the tested fixings actually carried | (24 + 27) ÷ 2 = 25.5, then ÷ 13 | average, then a ratio |
| Five times, not three | 41 ÷ 8.2 = 5 times, against the 3 on the map | measurement beats the published figure |
| A smaller shake against a weaker building | 650 ÷ 12 ≈ 54 kN/m against about 90 it was built for | demand against capacity |

"Five times, not three" is the campaign's hinge and the best junior stop in the set: the amplification the hazard map publishes is three, the measurement says five, and a sixth grader gets there with one division. The parent's whole argument — the reference station is on weathered granite, so everything referred to it is understated — arrives as 41 ÷ 8.2.

**Answerable:** 33/33.
**Sense:** Excellent. The granite/made-ground split is geography a child can see out of a window.
**Level:** Right. `questionLoad` reports 6 of 33 demanding stops (18%), the joint highest of the junior editions, but every one is a board-size note rather than a reading-level problem.
**Fun:** High, and the stake is unusually real for the age — people sleeping in halls.

## Implemented since this review

- **AM-01** `dayNoun`.
- **AM-06**, the opening card now names Rei Tanaka.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| AM-01 | WORTH | `themes/aftershock_ms/theme.js` | **No `dayNoun`.** The plan card prints "Day N" while the campaign opens "An earthquake hit Kestrel Bay three days ago" and runs ten days on a nine-week recovery. Two junior editions are missing it — this one and `icecore_ms` — where the other ten have it. | One line. Cross-campaign §4. |
| AM-02 | WORTH | Days 4, 7 and 9 | Three of ten days author 4 stops, so those three carry no callback. | Prefer a move to a delete: days 1–3 all carry three. |
| AM-03 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. This edition would benefit as much as any: the amplification finding on day 4 or 5 is exactly the sort of thing a child should meet again on day 9. | Three or four variants. |
| AM-04 | WORTH | `engine/dev/concept-debt.json`, 6 rows | Six ordering rows, no `takesAsRead` available at grade 6. CLAUDE.md records that the pairwise swap search was run on this campaign and **lost all four proposals** because "what eight degrees does" *is* Marina Court, which is day 4, and a stop whose scene names the day's event cannot move. So these six are writing work, not permutation work, and that is worth stating in the debt file so nobody re-runs the search. | Write the missing claims. Two of the six point at the same base — *plates move and a fault is where they slip past each other* — so one early stop claiming it clears more than one row. |
| AM-05 | WORTH | `engine/dev/curriculum-debt.json`, 1 row | `distance = speed × time` recorded as uncomputed. **Check it before treating it as work**: "The same event, recorded twice" computes 1,100 ÷ 0.4 = 2,750 m/s, which is that relation rearranged, and "How far away it started" computes 13 × 8 = 104 km, which is that relation directly. This is the same prose-equation matcher problem as `blackout_ms`'s BM-01 — the equation has no symbols, so a short keyword list is carrying the whole test. | Re-check, and if the boards do compute it, delete the row. The gate change proposed in BM-01 would settle it. |
| AM-06 | WORTH | `opening:` | The card names nobody. Six of the twelve junior editions name somebody; this is one of the six that do not. It is otherwise the best-structured junior opening — the granite/made-ground contrast is the last sentence and it is the whole campaign. | One clause naming whoever is arguing for speed against whoever is arguing for measurement. Cross-campaign §8. |
| AM-07 | TASTE | Numeral damage, 2 occurrences | "1 earthquake", "1 who". Minimal. The parent has five. | Editorial pass. |

## What the derivation did well

- **It kept the geography as the argument.** Granite above, liquefied fill below, and a fault scarp walked between them.
- **It kept the reference-station finding** and reduced it to one division. That is the model for what a junior edition is for.
- **The ending's unfinished list survives at grade 6**: the vault on the bench is still the reference station and still on weathered granite, and the corrected amplification is a projection from nine boreholes. A sixth grader can hold that.

## Opening and closing

Opening: 110 words, and the last sentence does the work. One gap (AM-06).

Closing: three paragraphs, and the middle is the best cost paragraph in the junior set — two weeks of a town living in halls, a six-storey block coming down in the spring, and a ground-improvement clause four hundred households have to find the money for.

## Warm-ups

Authored for this edition. No findings.
