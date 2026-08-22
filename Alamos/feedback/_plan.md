# What is left, and the order to do it in

*2026-08-22 · after 42 campaign reviews, 45 closed FIX rows and six new gates. Everything here is work I chose not to do rather than work I could not find, and each item says why.*

## The state of the findings

| State | Rows | Meaning |
| --- | --- | --- |
| CLOSED / FIXED | 47 | fixed and verified; `npm run check` green |
| WITHDRAWN | 4 | I was wrong; the reasoning is in the row |
| RECORDED | 5 | measured, in a debt file that only shrinks, deliberately not done |
| PLAN | 2 | this document |
| WORTH | 146 | real improvements with a clear shape |
| TASTE | 66 | recorded so nobody "fixes" them by accident |

**No FIX row is open.** The four that were are now RECORDED or PLAN, each with the measurement behind the reclassification in its own row.

---

## 1. Spaced retrieval: 37 of 42 campaigns have none

**The finding.** The day model adds a callback from day 3 — CLAUDE.md calls it "the spaced retrieval that fixes" blocked practice and "why a day has a second building to walk to". But a callback requires an **unserved `— Review` variant**, and only five books author any: hospital 105, sightline 10, sightline_ms 9, redsand 9, redsand_ms 9. Measured off the normalised content, days carrying a callback are hospital 13, redsand 8, sightline 7, redsand_ms 8, sightline_ms 6, **and zero in the other thirty-seven.**

**Why it is this shape.** The 295-duplicate defect was fixed by making the callback conditional, which was right — 295 of 318 callbacks were byte-identical re-serves. The consequence nobody measured is that the mechanism then fired in 12% of campaigns.

**The work, cheapest first.**

1. **`the_trial_ms` is the best first target: ten days, every one of them three stops, zero variants.** Four variants would give it callbacks on four days immediately, with no restructuring. Then `the_trial`, `the_trial_hs`, `ghostlight`, `carrying`, `changeover`, `yellowbay`, `blackout_fable` — all of which are three stops a day throughout.
2. **A variant is a second question on a lesson already written**, so it is cheaper than it sounds: same concept, same equation, different numbers and a different discrimination. Red Sand and Sightline did nine each.
3. **Then decide the claim.** If most campaigns are going to have three or four variants rather than a hundred, CLAUDE.md's "from day 3, every day carries a callback" should say "where a review variant exists", and the day model's documentation should stop describing it as the answer to blocked practice.

**Do not** make the callback re-serve the same card to fill the slot. That is the defect that was fixed, and `dayCalls.mjs` will catch it.

---

## 2. The 296 scenes with nobody in them

**The finding.** `sceneCast.mjs` measures the share of stop scenes naming somebody from the roster. The median across 42 campaigns is about 70%; Yellow Bay is 45 of 45. Eight campaigns are under one in ten:

| Campaign | Scenes naming somebody |
| --- | --- |
| ContamCity | 0 of 48 |
| Bring Them Home | 0 of 48 |
| Planetary Defense | 0 of 48 |
| Project Y | 1 of 153 |
| `planetary_defense_ms` | 1 of 33 |
| `contamcity_ms` | 1 of 33 |
| `contamcity_hs` | 2 of 48 |
| `bring_them_home_ms` | 3 of 33 |

All eight name somebody in **every** day stake, so the cast exists and is properly introduced. What is missing is people in the room where the work happens: "The Theoretical Division needs a reaction rate" rather than "Palmer has fitted a smooth curve through the last twelve hours of fixes".

**Why it is recorded rather than done.** 296 sentences of real writing, and a name pasted mechanically onto forty-eight scenes is worse than none — it would satisfy the gate and improve nothing.

**The work.** One campaign at a time, day by day, using the person the day's own stake already names. Roughly one sitting per campaign. **Start with `bring_them_home`**, where the loss is sharpest: the place is a room full of named people at consoles and the opening card's last line is that the crew can hear every word anybody says.

---

## 3. Hospital's 51 four-card SEQUENCE boards, at grade 2

**The finding.** `questionLoad` now fails at grade 8 and below rather than only on derived editions, and Hospital's 110 rows are in `questionload-debt.json`. Fifty-one of them are one decision: a four-card SEQUENCE graded as one exact permutation with no feedback until commit is a **one-in-twenty-four guess** for a seven-year-old. Dropping one card takes it to one in six.

**Why it is recorded.** Thirteen base stops plus their review variants, and each removal is a pedagogical choice about which step of a sequence is not load-bearing. That is a decision for a person who knows the audience.

**The rest of the 110:** 15 are 13-to-16-word options (four held in mind at once, limit 12) and 13 are stops naming three or four people where two is the limit. Both are rewrites rather than decisions and could go first.

---

## 4. Two junior editions want a tenth day

`planetary_defense_ms` authors four stops on seven of nine days; `seedbank_ms` on six of nine. At 33 stops in 9 days that is 3.7 a day, against the 3.0–3.3 every other junior edition runs at.

**Corrected reasoning.** I first wrote that this is why neither has a callback. It is only half the reason — a callback also needs a variant, and neither authors one, so both would have no callback at three stops a day either. The day load is still worth fixing on its own terms.

**The work.** Split the two heaviest days in each, which needs a new mission title, objective, briefing, stake (80–110 words, four beats, `checkStory`'s sentence caps) and takeaway per split. Then re-run `warmupOrder` (the seven runs re-spread automatically), `equationOrder` and `conceptOrder` — **a re-day can create an ordering defect, which is a standing rule in this repo.** Do it in the same pass as item 1's variants for those two editions, so the freed days get callbacks.

---

## 5. Written stops for real curriculum gaps

Measured against the boards rather than taken from the debt file:

- **`blackout_ms`** — three real gaps: `how long = amount ÷ rate`, `average = total ÷ how many`, and `spare = capacity − demand` (the campaign computes the *shortfall*, 6,400 − 6,100, which is a different quantity from the headroom). `part = whole × share` was false and is cleared.
- **`bring_them_home_ms`** — four real gaps: `part = whole × share`, `speed = distance ÷ time`, `time = distance ÷ speed`, `change in position = change in speed × time`. `amount = rate × time` was false — "How much they breathe out" computes 3 × 20 × 6 from a per-person hourly rate.
- **`average = total ÷ how many` is the recurring one**, absent from five junior editions. Each has an obvious home: several readings of one gauge, which is also what most of those campaigns' instrument threads are about.

Each stop needs a three-stop day to sit on, so this is item 4's work as well.

---

## 6. STACK

`books/instruments.yml` was supposed to keep a commented STACK stop so that lifting the suspension would be a one-line change. It does not, and it cannot: the importer refuses a STACK stop at both ends while the format is suspended, so even a commented fixture could not be verified. The header now records that, so nobody discovers it by trying. Lifting the suspension means authoring one from scratch — which is exactly the outcome the commented stop was meant to prevent.

---

## Where the gates now stand

Six new ones, each with a selftest, each validated by reintroducing the defect and confirming only the right case failed:

| Gate | Catches |
| --- | --- |
| `boardAnswer.mjs` | an estimate board grading a different question from the one it asks |
| `deriveRules.mjs` | a `rules` list that reaches no screen; an unanswerable rule question |
| `numeralWords.mjs` | a digit standing in for the pronoun "one", in prose or in a title |
| `sceneCast.mjs` | a campaign whose scenes have stopped naming anybody |
| `checkStory` (extended) | the scaffold's own text shipping; an opening card naming nobody |
| `questionLoad` (retargeted) | fails on the reader's age rather than the file's provenance |

Plus two importer refusals with traps behind them: a STRESS criterion keyed to a score field nothing has, and — the one that mattered most — `askRule: true` now actually reaching the content.
