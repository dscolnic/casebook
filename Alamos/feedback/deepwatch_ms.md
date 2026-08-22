# Deep Watch (grade 6 edition) — play-through review

*Theme `deepwatch_ms` · middle-school physical science, grade 6 · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/deepwatch-ms.yml` in full, working every board, and comparing against the parent `deepwatch` and the AP edition `deepwatch_hs`.*

## Verdict

A well-made junior edition, and the one that accidentally proves a point about the whole set: **the grade-6 edition gets right the stop that both senior editions get wrong.**

Day 5 of `deepwatch` and day 5 of `deepwatch_hs` both ask "what ninety metres puts behind the valve", both state the relationship as p = ρgh, and both grade a board whose tiles are a bilge-flooding calculation returning **143 gallons per minute** (see the `deepwatch_hs` review, DH-01). The grade-6 version of the same stop is titled "What ninety metres puts behind the valve" and its board reads: *ninety divided by ten is nine atmospheres of added pressure.* Correct, in the right units, answering the question asked. Whoever wrote the junior edition rebuilt the board rather than carrying it across, and in doing so fixed a defect nobody had noticed in either parent.

The seven boards are all correct and all pitched properly: half a knot for three and a half hours is nearly two sea miles of set nobody has drawn; 1500 × 0.120 ÷ 2 = 90 metres against a chart that says 102; four miles of channel less two miles of doubt, halved, is one mile of margin; 360 ÷ (20 × 9) = 2 hours before the carbon dioxide reaches the limit; three hours at the slow speed against 1.1 at the fast one; and 150 − 147 = 3 swells a second. Every one is one operation or two, nothing over 9,999 or under 0.1, and every one is a decision somebody on the boat has to make.

**Answerable:** 33/33.
**Sense:** The parent's fifteen casualties compressed into ten days without losing the thread.
**Level:** Right. `questionLoad` reports 2 of 33 demanding stops (6%), the second-lowest of the twelve junior editions.
**Fun:** High for the age. A submarine where nobody can see out is the best-chosen place in the junior set.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| DM-01 | WORTH | `engine/dev/curriculum-debt.json`, 3 rows | Three of six syllabus relations are recorded as uncomputed: `density = weight ÷ volume`, `part = whole × share`, `average = total ÷ how many`. **At least one is a matcher artefact rather than a gap** — the same class I found in `blackout_ms`, where a prose equation's five keywords cannot see the board's own wording. And `density = weight ÷ volume` is a problem in itself: see DM-02. | Two things. Re-check each row against the boards before treating it as content work; the gate's keyword list is the only thing carrying a prose equation, because `symbolSignature` contributes nothing when there are no symbols. Then write the one or two that are real — an averaging stop is the obvious gap and this is a campaign where several readings of one gauge is the natural place for it. |
| DM-02 | CLOSED | The syllabus, `density = weight ÷ volume` | **The equation is wrong, and grade 6 is exactly where it does damage.** Density is mass ÷ volume; weight is a force. A student who learns "weight ÷ volume" will be marked wrong in two years, and the substitution is the single most-fought misconception in middle-school physical science. Four other junior syllabi carry the same substitution — `momentum = weight × speed` and `change in speed = momentum ÷ weight` in `planetary_defense_ms` and `bring_them_home_ms`, `load on each metre = total weight ÷ length`, and `depth lost each year = weight lost ÷ (…)` in `contamcity_ms` — and one of those, `momentum = weight × speed`, is wrong in the same way. | Use "how heavy it is" or "mass" and keep the register: *density = how heavy it is ÷ how much room it takes up*. That reads at grade 6 and is not wrong. The three genuinely-wrong ones (density, momentum, change in speed) matter more than the two where "weight" is loosely standing in for a load. Cross-campaign §11. |
| DM-03 | WORTH | Days 6, 7 and 9 | Three of ten days author 4 stops. In a ten-day campaign that is 30% of days at the loop's maximum, and it is why this edition has **no callbacks at all** — a fourth authored stop displaces the one the day model would have added. | Prefer a move to a delete: days 1–5 all carry three. Two moves would free two days for a callback, if there were a review variant to serve — which there is not (DM-04). |
| DM-04 | WORTH | Zero `— Review` variants | No spaced retrieval anywhere in the campaign. Thirty-seven of forty-two campaigns share this; `redsand_ms` and `sightline_ms` are the two junior editions that author variants, at nine each. For a grade-6 audience this matters more than for an AP one. | Three or four variants would give the back half of the campaign a callback on most days. Cross-campaign §9. |
| DM-05 | WORTH | `engine/dev/concept-debt.json`, 7 rows | Seven ordering rows, and the junior-edition policy correctly forbids `takesAsRead` — a grade-6 course has nothing in front of it to take anything as read from. So all seven are ordering or writing work. Two look like within-day inversions ("adding weight changes what floats" resting on density; "hearing something quiet next to something loud" resting on its base), which is the case `openStopIndices` makes real. | Read the two same-day pairs first: a prerequisite standing beside its dependent is met second by half the players, and moving one stop to an earlier day is cheaper than writing a claim. |
| DM-06 | TASTE | The opening card | Names Commander Iris Vance with the authority attached — *"Commander Iris Vance can order the boat up, where all of it stops being deadly. Somebody has to be willing to say so"* — which is better than either senior edition, both of which name nobody. Recording it as the model rather than as a defect. | Nothing. Copy this sentence's shape into the parent and the AP edition (DH-03). |

## What the derivation did well

- **It rebuilt the boards rather than copying them.** That is why DM-01's arithmetic is correct where the parent's is not, and it is the argument for `derive-edition` being followed by a real authoring pass rather than trusted.
- **Every board is a decision.** "Slowing down as a decision" — three hours at the slow speed against 1.1 at the fast one — is a grade-6 arithmetic problem that is also the campaign's whole dilemma.
- **The chart error is kept.** 1500 × 0.120 ÷ 2 = 90 metres against a chart that says 102 is the parent's dead-reckoning thread, intact and simplified.

## Opening and closing

Opening: 74 words, short sentences, one named person with the authority stated. The best junior opening in the set.

Closing: three paragraphs, the same as the parent's in substance and shorter in sentence. "The whole crew went up the ladder, and you are the reason they did."

## Warm-ups

Authored for this edition rather than inherited, which is the rule — a `why` written for an AP reader handed to a sixth grader is the demand-stays-put failure. No findings.
