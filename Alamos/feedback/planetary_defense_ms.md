# Planetary Defense (grade 6 edition) — play-through review

*Theme `planetary_defense_ms` · middle-school space science, grade 6 · 9 days, 33 stops · reviewed 2026-08-21 by reading `books/planetary-defense-ms.yml` in full, working every board, and comparing against the parent `planetary_defense`.*

## Verdict

The junior edition with the most ambitious arithmetic, and it mostly earns it. Eight boards, all correct:

| Board | Arithmetic | Idea |
| --- | --- | --- |
| How fast is it moving? | 12 ÷ 20 = 0.6 arcsec/min, so ~36 an hour | an angular rate |
| Same brightness, different size | a quarter of the area, so half the width | area against length |
| How far away, from the echo? | 4 s × 300,000 km/s = 1,200,000; half is 600,000 | radar ranging |
| How much energy does it carry? | 1,600 shared at 4 per megaton ≈ 400 megatons | energy in familiar units |
| Twice as fast | 0.5 × 7.9 × 10⁹ × (12² + 11.2²) × 10⁶ ≈ 1.06 × 10¹⁸ J | the square on speed |
| Thirty-seven paths in a hundred thousand | 37 in 100,000 ≈ a third of one in a thousand | a probability restated |
| How much does the push move it? | 475 km/yr × 8 years ≈ 3,800 km | an early push does more |
| How many people is that share? | 9,000,000 × 0.005 = 45,000 | a percentage of a population |

Two are unusually good for the age. **"Same brightness, different size"** — a quarter of the area means half the width — is the inverse-square-and-albedo degeneracy reduced to one sentence a child can hold, and it is the campaign's central ambiguity ("nobody knows yet whether this rock is the width of a street or of a town"). And **"Thirty-seven paths in a hundred thousand"** restates a probability rather than computing one, which is the right move: the difficulty at grade 6 is not the division, it is knowing that 37 in 100,000 is small *and not zero*.

**Answerable:** 33/33.
**Sense:** Excellent. Four hours of observation, some paths going through the Earth, and a radar window that comes once in eleven years.
**Level:** Right. `questionLoad` reports 4 of 33 demanding stops (12%).
**Fun:** High. The parent's night-time ridge is the best-looking place in the junior set.

## Implemented since this review

- **PM-05**, the opening card now names Dr. Anna Fischer.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| PM-01 | CLOSED | The syllabus: `momentum = weight × speed`, `change in speed = momentum ÷ weight` | **Two syllabus equations use weight where mass belongs, and one of them is the campaign's headline calculation.** Momentum is mass × velocity; weight is a force in newtons. A sixth grader who learns "momentum = weight × speed" has to unlearn it, and the deflection thread — which is the whole campaign — rests on it. The impact-energy board's own prompt reads *"energy = ½ × weight × speed × speed"*, which is the same substitution in the formula a physics teacher fights hardest over. Note the inconsistency inside one syllabus: the sibling equation is written `KE = ½ × m × v²`, in symbols, with `m` — so the register is not even consistent about it. | Use "how heavy it is", which reads at grade 6 and is not wrong: *momentum = how heavy it is × how fast it is going*, *change in speed = momentum ÷ how heavy it is*, and *energy = ½ × how heavy it is × speed × speed*. Then make `KE = ½ × m × v²` match the register instead of standing out in symbols. Four other junior syllabi carry the same substitution — cross-campaign §11. |
| PM-02 | PLAN | Seven of nine days author 4 stops | `per-day` is `[4,4,3,3,4,4,4,4,3]`. **Seven of nine days at the loop's maximum is the highest density in the catalogue**, and it means seven of nine days carry no callback. A nine-day campaign with 33 stops is 3.7 a day, so this is a length problem rather than an authoring accident: the content wants ten or eleven days. | **Reclassified, and the reasoning corrected.** I wrote that seven four-stop days are "why this edition has no callback". That is only half true: a callback also needs an unserved `— Review` variant, and this edition authors none — so it would have no callback at three stops a day either. The day load is still worth fixing and it is now one half of a two-part plan; see `_plan.pdf`. |
| PM-03 | WORTH | `engine/dev/curriculum-debt.json`, 5 rows | Five of eight syllabus relations recorded as uncomputed: `average = total ÷ how many`, `KE = ½ × m × v²`, `momentum = weight × speed`, `change in speed = momentum ÷ weight`, `change in position = change in speed × time`. **At least two look false** — "Twice as fast" computes ½mv² explicitly and "How much does the push move it?" computes a change in position from a rate and a time. Same prose-and-symbol matcher problem as `blackout_ms`'s BM-01, compounded here because this syllabus mixes symbols and prose in one list. | Re-check each row against the boards before treating it as content work, then fix the matcher (BM-01a) rather than writing stops that already exist. `average = total ÷ how many` looks like the one genuine gap, and a campaign whose whole subject is *more observation separates two candidate paths* has an obvious home for it. |
| PM-04 | WORTH | `engine/dev/concept-debt.json`, 5 rows | Five ordering rows, no `takesAsRead` at grade 6. CLAUDE.md records that moving the risk-cloud stop off day 2 cleared a row and put it after the concept it rests on — so this campaign has already been re-ordered once and these five are the residue. Two point at *impact energy: mass and speed, and why speed matters more*, which the "Twice as fast" board teaches. | If PM-02 adds a day, do the concept work in the same pass — the re-day is a chance to place the five bases before their dependents at no extra cost. |
| PM-05 | WORTH | `opening:` | The card names nobody. It is otherwise the sharpest junior opening in the set — *"Nobody knows yet whether this rock is the width of a street or of a town. That is the difference between one city and one country"* — and the person missing is whoever is arguing for the radar window against whoever wants a number today. | One clause. Cross-campaign §8. |
| PM-06 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. Worth more here than in most: this campaign's ideas (albedo against size, a probability that is small and not zero, an early push doing more) are exactly the kind a child needs to meet twice. | Three or four variants, best added in the same pass as PM-02. |

## What the derivation did well

- **It kept the ambiguity.** A rock the width of a street or of a town, and the campaign refuses to resolve it early.
- **The radar window.** One chance in eleven years is a deadline a child understands, and the ending says the window "is what proved it had worked".
- **"None of that quiet was luck."** The closing paragraph's first line, and the best statement in the junior set of why a right decision looks like nothing happening.

## Opening and closing

Opening: 96 words. All four beats except the person (PM-05).

Closing: three paragraphs. "Nobody evacuated Valle Seco. The school there reopened on the Monday" is the right way to state a non-event as an achievement.

## Warm-ups

Authored for this edition. This is one of the four two-tier junior sites, so it carries `trial-far` as well. No findings.
