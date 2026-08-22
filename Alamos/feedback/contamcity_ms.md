# The Contaminated City (grade 6 edition) — play-through review

*Theme `contamcity_ms` · middle-school physical science, grade 6 · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/contamcity-ms.yml` in full, working every board, and comparing against the parent `contamcity` and the AP edition `contamcity_hs`.*

## Verdict

A capable junior edition with the lowest question load in the set — `questionLoad` reports **2 of 33 demanding stops (6%)**, the joint lowest of the twelve — and seven correct boards pitched exactly where a sixth grader can reach them:

| Board | Arithmetic | Idea |
| --- | --- | --- |
| How long before it reaches the school | 2,000 ÷ 4 = 500 s, a little over eight minutes | a distance and a speed |
| Undo the dilution | 2.5 × 100 ÷ 10 = 25 mg/L | working a dilution backwards |
| How much heat is stored in there | 2,000 × 4.2 × 5 = 42,000 | mass, specific heat, temperature rise |
| Control the self-heating | 44 now plus 13 over eight hours ≈ 57 | a rate added to a level |
| How much more acidic | 10 × 10 × 10 = 1,000 times | a logarithmic scale as repeated tens |
| How fast is the wall going | 32 kg per mm at 2 kg a year ≈ 16 years | a rate turned into a lifetime |
| Did the cell do what it should? | 3.6 ÷ 4.5 × 100 = 80% | an efficiency |

**"How much more acidic"** is the best of them. pH is a logarithm, and the grade-6 version is *three steps of ten is a thousand times* — correct, memorable, and it does not require the word logarithm. **"Undo the dilution"** is the same calculation the AP edition does with the same numbers, which is the right kind of continuity between editions.

The campaign's spine survives: a freight yard burned, nobody can say what came off it, the intake is shut, and the city is drinking reserves measured in days. The ending's first claim is the parent's ethic — "the compound identified by two methods" — and the last paragraph gives the player the credit for it: "You checked the compound two ways instead of one."

**Answerable:** 33/33.
**Sense:** Good, with one significant gap that this edition inherits and that no gate can see (CM-04).
**Level:** Right, and the lowest load in the junior set.
**Fun:** Moderate. See CM-04 — this is the campaign where the missing people cost the most.

## Implemented since this review

- **CM-07**, the opening card now names Adaeze Okonjo.
- **CM-08**, the numeral damage.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| CM-01 | CLOSED | The syllabus: `depth lost each year = weight lost ÷ (how heavy it is × the area)` | The relation uses "weight" for mass twice in one line, and the second use — *"how heavy it is"* standing for density — makes the equation unreadable as well as wrong. A corrosion rate is mass lost ÷ (density × area). The register is fixable without the error: *depth lost each year = mass lost ÷ (density × area)*, or in the campaign's own words, *how much metal went ÷ (how heavy a lump of it is for its size × the area it went from)*. Four other junior syllabi carry the same substitution and two of those are outright wrong physics. | Rewrite the relation. Cross-campaign §11. |
| CM-02 | WORTH | `engine/dev/curriculum-debt.json`, 4 rows | Four relations recorded as uncomputed: `amount = concentration × volume`, `average = total ÷ how many`, the corrosion relation above, and `how many times = bigger ÷ smaller`. **At least two look false**: "How much more acidic" computes 10 × 10 × 10, which is `how many times = bigger ÷ smaller` restated, and "How fast is the wall going" computes the corrosion relation in the form the board actually uses. Same prose-equation matcher problem as `blackout_ms`'s BM-01. | Re-check before treating as content work. `average = total ÷ how many` is the recurring genuine gap across five junior editions and it wants one stop each. |
| CM-03 | WORTH | Days 2, 5 and 7 | Three of ten days author 4 stops, so those three carry no callback. | Prefer a move to a delete. |
| CM-04 | RECORDED | 1 of 33 scenes names a person | **This is the largest quality gap in the campaign and it is inherited.** The parent scores **0 of 48** and the AP edition 2 of 48; across all 42 campaigns the median is about 70% and Yellow Bay is 45 of 45. All three ContamCity editions name somebody in **every** day stake — so the cast exists, is introduced, and then every question is asked by nobody, in an institution rather than a room. The four affected campaigns are the four with a docx or first-generation origin: ContamCity, Bring Them Home, Planetary Defense and Project Y. At grade 6 the cost is highest, because a named person doing something is most of what makes a card readable at that age. | Put the day's named person into that day's three scenes. It is roughly 33 sentences for this edition and 48 for the parent, and it is the highest-value editorial work available on either. The other junior editions show what it looks like: *"Twill has the retained boxes and the certificates"*, *"Kovač has three seasons of station-return speeds on a clipboard"*. Cross-campaign §12. |
| CM-05 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. | Three or four variants. |
| CM-06 | WORTH | `engine/dev/concept-debt.json`, 6 rows | Six ordering rows, no `takesAsRead` at grade 6. Two point at *measuring the same thing several times, and averaging* — which is the `average = total ÷ how many` gap from CM-02, so writing that one stop would pay a curriculum row and two concept rows together. | Write the averaging stop. One stop, three rows. |
| CM-07 | WORTH | `opening:` | The card names nobody — only "the city's chief scientist". Same as both senior editions. | One clause. Cross-campaign §8. |
| CM-08 | TASTE | Numeral damage, 4 occurrences | "1 sitting", "1 million", "1 working", "1 dilution", "1 p". The parent has twelve and the AP edition eleven, including five "1 dilution" cases where the digit changes the meaning. | Editorial pass, all three editions together. Cross-campaign §1. |

## What the derivation did well

- **pH without the word logarithm.** Three steps of ten is a thousand times.
- **It kept "two methods, not one"** as the campaign's ethic and put it in the player's closing credit.
- **The reserves clock.** "The city is drinking what it has stored, and what it has stored is measured in days" is a deadline a child can feel.

## Opening and closing

Opening: 96 words, all beats except the person (CM-07).

Closing: three paragraphs. "A whole city is drinking its own water again, and that is your doing."

## Warm-ups

Authored for this edition. No findings.
