# What the eight bibles still owe

Three things, in this order. The first is one document for all eight; the other
two are one document per campaign.

---

## 1. `tools/BIBLE_ADDENDUM_PROMPT.md` — §7, and it is the big one

**257 stops out of 480 cannot be built.** Every one names a format the game has,
every one has the science right, and every one is missing a number or a line the
board is physically made of.

| format | stops held back | what is missing |
| --- | ---: | --- |
| **DERIVE** | **86** | only the correct line per step is written. The player picks a line at a time, so each step needs three or more candidates, a reason on every wrong one, and one wrong line that is not obviously wrong |
| STRESS | 22 | a grid with a number in every cell, not booleans at a few bias values |
| TRIGGER | 20 | a stream of timed readings. One rule on one quantity, not a four-stage ladder |
| ATTEST | 15 | one sentence per claim saying what a check would turn up. **The cheapest fix here** |
| VERIFY | 14 | one quantity, and the range the prediction is dialled on |
| RESIDUAL | 13 | five residuals with coordinates per fit — and the fit to accept must not be the lowest-RMS one |
| BALANCE | 11 | a hidden stream. Three visible rows that already close is a subtraction |
| TRACE | 9 | every channel's current reading, in units |
| HOLDOUT | 9 | two curves of five points, not one acceptance window |
| CLOUD | 8 | bounds, centre, spread, and actions that narrow |
| the other fifteen formats | 50 | in `_PAYLOADS.md`, per stop |

§7 of the addendum says all of it in one place, in the terms the game uses.

## 2. `prompts_payloads/<campaign>_PAYLOADS.md` — the stop-by-stop list

Generated from the build's own refusals, not written by hand, so it is exactly
true on the day it was made. Each stop, grouped by format, with the sentences the
importer turned it down with. Fix a format once and the whole group goes.

    node tools/payload-prompt.mjs <theme> --out <dir>     # regenerates one

## 3. `prompts_concepts/<campaign>_CONCEPTS.md` — a number per stop

**480 stops, all eight campaigns.** Every stop names its concept in the bible's
own words (`rational limit`, `L'Hopital`). The game needs the course's own entry
as well, because the sequencing checks grade *when* each idea is first taught and
can only do that against one fixed list. Your words stay; this adds the number
beside them.

Each file prints the course's numbered spine once, then every stop with its
current tag and the three entries that tag comes closest to — **ranked, never
chosen**. Where the ranking is right, take it.

    node tools/concept-prompt.mjs <theme> --out <dir>     # regenerates one

---

## What is already paid

For contrast, and so none of it comes back: every stop's area, call line, fixture,
beat trigger and person now resolve from the bible — 480 of 480, no placeholders.
So do the groups, the beat rooms and the rosters, on all eight. What is left is
the three lists above.

## One thing that is not on any list

Twelve beat bubbles speak as a role — `Mission lead:`, `Arrival bubble:` — on a
mission whose card names nobody to meet. Where the card does name someone, the
build reads the speaker off it, which is why this is twelve and not eighty-nine.
Those twelve missions need a name on the card or on the bubble.
