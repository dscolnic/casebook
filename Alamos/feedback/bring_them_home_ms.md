# Bring Them Home (grade 6 edition) — play-through review

*Theme `bring_them_home_ms` · middle-school physical science, grade 6 · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/bring-them-home-ms.yml` in full, working every board, and comparing against the parent `bring_them_home`.*

## Verdict

The junior edition with the strongest opening card in the set and the weakest cards underneath it.

The opening is eight sentences and every one lands: *"Three people are in a spacecraft, a quarter of a million miles from home, and something on board has just exploded. You are the flight director. Every call is yours to make. The power is falling. The cabin is getting cold. The ship is drifting off the one path that brings it back. The air they are breathing will run out at an hour somebody has already worked out."* Then Dr. Evelyn Carter, named with her job, has to fit every repair into one plan that still adds up — and the last sentence is the thing that makes this campaign different from every other: **"And the crew can hear every word anybody says on the radio loop."**

The seven boards are correct and well pitched: 200 × 3 = 600 units of turning effect; 18 ÷ 3 = 6 hours of battery; 11 million shared at 12 million per degree is a bit under one degree of cabin cooling; 3 × 20 × 6 = 360 litres breathed out; 300 ÷ 2,000 = 0.15 m per wave; 3,100 − 200 = 2,900 rpm to stay clear of a resonance; and 40 − 10 = 30, halved, is 15 km of clearance each side. Mission Control is a good place for arithmetic because every number in it is read out loud to somebody.

**Answerable:** 33/33.
**Sense:** Strong day by day, and the entry-day ending is the best in the junior set.
**Level:** Right. `questionLoad` reports 5 of 33 demanding stops (15%).
**Fun:** High premise, muted delivery — see BH-01.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| BH-01 | RECORDED | 3 of 33 scenes name a person | **The parent scores 0 of 48 and this edition 3 of 33**, against a corpus median of about 70% and Yellow Bay's 45 of 45. Every day stake names somebody — 15 of 15 in the parent — and then the questions are asked by nobody. In *this* campaign it is the sharpest possible loss, because the place is a room full of named people at consoles and the opening card's own last line is that the crew can hear every word anybody says. A card that says "the flight dynamics officer needs a number" instead of "Carter needs a number" throws away the one thing Mission Control has. `themes/bring_them_home/shots.js` exists because that game has no other automatic check on where anything is; the same is true of its cast in the scenes. | Put the day's named person into the day's three scenes, in both editions — 33 sentences here and 48 in the parent. Cross-campaign §12. This is the highest-value editorial work available on either. |
| BH-02 | RECORDED | `engine/dev/curriculum-debt.json`, 5 rows | Five of eight relations recorded as uncomputed: `speed = distance ÷ time`, `time = distance ÷ speed`, `amount = rate × time`, `part = whole × share`, `change in position = change in speed × time`. **Several look false**: "How long can the battery last?" computes 18 ÷ 3, which is `time = amount ÷ rate`; "How much they breathe out" computes 3 × 20 × 6, which is `amount = rate × time`. Same prose-equation matcher problem as `blackout_ms`'s BM-01, and five rows is the joint-highest count in the junior set, so the work list this file presents is largely wrong. | Measured against the boards: `amount = rate × time` **is** computed — "How much they breathe out" works 3 × 20 × 6 from a per-person hourly rate — so that row is false. The other four are real: no board computes `part = whole × share`, `speed = distance ÷ time`, `time = distance ÷ speed` or `change in position = change in speed × time`. "How long can the battery last?" is amount ÷ rate, not distance ÷ speed. Four written stops, and no three-stop day free. Recorded. |
| BH-03 | WORTH | Days 3, 5 and 8 | Three of ten days author 4 stops, so those three carry no callback. | Prefer a move to a delete. |
| BH-04 | CLOSED | The syllabus: `change in speed = momentum ÷ weight` | Momentum ÷ weight is not a speed; momentum ÷ mass is. At grade 6 this is the substitution that has to be unlearned later, and `planetary_defense_ms` carries the same pair. | *change in speed = momentum ÷ how heavy it is*. Cross-campaign §11. |
| BH-05 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. | Three or four variants. |
| BH-06 | WORTH | `engine/dev/concept-debt.json`, 8 rows | Eight ordering rows — the highest in the junior set — and no `takesAsRead` at grade 6. Three point at *rates: how fast something is used up, and how long it lasts*, which the battery board teaches, so claiming it there may clear three rows at once. | Claim the rates base at the battery stop. Re-measure after, since CLAUDE.md records two batches that made the total worse. |
| BH-07 | TASTE | Numeral damage, 1 occurrence | "1 working". The cleanest book in the corpus on this measure alongside `sightline_ms`. | Nothing urgent. |
| BH-08 | TASTE | The `FLY` stop | The junior edition keeps the parent's FLY panel — bounded commands on undamped dynamics, so the brake has to lead. CLAUDE.md records that the parent's FLY graded a plan against four criteria and printed none of them until after the single run it allowed, with the target line parked off-canvas, and that `instrumentGoals` now catches it. Worth confirming the junior version prints its goals, because a sixth grader given one run and no stated criteria learns nothing from failing it. | Run `node engine/dev/instrumentGoals.mjs bring_them_home_ms` and check the FLY line specifically. |

## What the derivation did well

- **The opening card.** Eight sentences, all four beats, a named person, and the radio loop.
- **"Every claim this room made about that vehicle was written down before entry, and every one of them was still standing afterwards. That is the whole job."** The ending's second paragraph, and the best one-sentence statement of the campaign's subject at any level.
- **Arithmetic that is read out loud.** Mission Control is the right place for a grade-6 numbers game because every number there is spoken to somebody who has to act on it.

## Opening and closing

Opening: the best in the junior set.

Closing: three paragraphs. "Three people are home tonight, and you brought them home."

## Warm-ups

Authored for this edition. No findings.
