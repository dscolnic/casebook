# Outbreak: Riverton (grade 6 edition) — play-through review

*Theme `outbreak_riverton_ms` · middle-school life science, grade 6: germs, spread and evidence · 10 days, 33 stops · reviewed 2026-08-21 by reading `books/outbreak-riverton-ms.yml` in full, working every board, and comparing against the parent `outbreak_riverton`.*

## Verdict

A well-judged junior edition of a campaign whose subject is unusually well suited to the age: three hospitals, the same strange illness, and nobody yet able to say whether seven cases is a lot. The opening card's best line is a piece of epidemiology a sixth grader can carry for life — *"Sofia Morales, the epidemiology lead, will not yet say whether seven is a lot, because nobody wrote down what a normal week looks like."*

The boards are correct and the best of them is the hardest idea in the subject:

| Board | Arithmetic | Idea |
| --- | --- | --- |
| What does a positive mean? | 90 ÷ (90 + 99) × 100 ≈ 48 in every hundred | positive predictive value |
| Carrying is not delivering | 3 × 0.20 = 0.6 L of oxygen a minute against 1.0 | a rate is not a concentration |
| How many doublings by morning | 480 ÷ 40 = 12 doublings | a doubling time |

**"What does a positive mean?"** is the stop I would keep above every other in the junior set. A test that is right most of the time, applied to a population where the illness is rare, gives a positive that is *wrong more often than not* — 48 in a hundred — and a sixth grader gets there with one division. That is the single most useful thing anybody can be taught about testing, and almost no curriculum at any level asks it as arithmetic.

**Answerable:** 33/33. One stop and its guide were recovered earlier in this review — a missing `- ` had silently merged two entries, deleting the "say why only some cells make the landing site" stop and leaving the doubling board's guide attached to the wrong question. Restored, re-imported, green.
**Sense:** Strong. The case definition holding from the third week to the last is the campaign's spine in both editions.
**Level:** Right. `questionLoad` reports 4 of 33 demanding stops (12%).
**Fun:** Good. "An outbreak can only be stopped while it is small, and this one has had four days."

## Implemented since this review

- **OM-01, partly.** One of the four rows was already cleared during the review when the deleted doubling stop was recovered; the `the share` keyword fix cleared none here, so the remaining rows are real content gaps.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| OM-01 | WORTH | `engine/dev/curriculum-debt.json`, 4 rows | Four of five syllabus relations recorded as uncomputed: `rate = cases ÷ people`, `part = whole × share`, `average = total ÷ how many`, `how many times = bigger ÷ smaller`. **At least two look false.** "What does a positive mean?" computes 90 ÷ 189, which is `rate = cases ÷ people` in the form the subject actually uses, and "Carrying is not delivering" computes 3 × 0.20, which is whole × share. Same prose-equation matcher problem as `blackout_ms`'s BM-01. One row here was legitimately cleared earlier in this review when the deleted doubling stop was restored. | Re-check each row before treating it as content work, and fix the matcher rather than writing stops that exist. `average = total ÷ how many` looks like the genuine gap, and a campaign about whether seven cases is a lot has the obvious home for it: what a normal week looks like, averaged over several. |
| OM-02 | WORTH | Days 3, 5 and 8 | Three of ten days author 4 stops, so those three carry no callback. | Prefer a move to a delete. |
| OM-03 | WORTH | Zero `— Review` variants | No spaced retrieval. Cross-campaign §9. The positive-predictive-value idea is the strongest candidate for a variant in the whole junior set. | Three or four variants. |
| OM-04 | WORTH | `engine/dev/concept-debt.json`, 6 rows | Six ordering rows, no `takesAsRead` at grade 6. One row — *counting cases as a rate, not just as a number* before *a test can be wrong in two different directions* — was added earlier in this review when the recovered stop restored a claim. Two others point at *some illnesses are caused by living things too small to see*, which is a day-1 concept and should be claimed there. | Claim the day-1 base explicitly; that may clear two rows at once. |
| OM-05 | WORTH | One stop with no authored `background` | Thirty-three guides, thirty-two backgrounds. | Close the gap. |
| OM-06 | TASTE | Format mix | Eight SEQUENCE stops of thirty-three, the highest SEQUENCE share in the catalogue. `formatMix` passes. But CLAUDE.md records that SEQUENCE prints a hardcoded "put the 4 steps in order, earliest first" over the author's own instruction unless `axis` and `ends` are authored — and about one ordering item in nine is graded on something other than time. With eight SEQUENCE stops, this is the campaign most exposed to that. | Check whether any of the eight orders by something other than time (a chain-of-transmission stop is often ordered by *what has to be broken first*, not by *what happens first*), and author `axis` and `ends` on those. |

## What the derivation did well

- **"Nobody wrote down what a normal week looks like."** The whole of surveillance, in one clause, on the opening card.
- **The positive-predictive-value board.** One division, and the most counter-intuitive true thing in the subject.
- **The case definition as a thread.** "The case definition held from the third week to the last" is the ending's second claim, and it is what the campaign spent ten days earning.
- **The ending's honesty about who settled it**: "the animal reservoir was settled in the end — not by the briefing, but by the survey the briefing said was still needed."

## Opening and closing

Opening: 104 words, names Sofia Morales with the job attached and gives her the campaign's methodological position.

Closing: three paragraphs. "Somebody bent that curve, and it was you" is the right last claim.

## Warm-ups

Authored for this edition. This is a two-tier site, so `trial-far` is present. No findings.
