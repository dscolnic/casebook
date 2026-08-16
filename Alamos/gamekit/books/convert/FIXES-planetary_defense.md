# Planetary Defense — fix list

**This one is green.** Every check passes.

It went from twelve blocked conversions to zero: all fourteen usable, both
incomplete blocks completed, all five over-level passages brought inside grade
12, and "spectrum" now introduced. **Seven instruments in the book.** This is
what a finished pass looks like.

Two rows are still out, and both are small.

## `planetary_defense.m04.s1` — `CLOUD` · not applied

Even with **every** action applied, only 98.6% of the distribution finishes
inside the corridor, and `pass` is set higher than that. The stop cannot be
answered correctly by anybody.

Either lower `pass`, or make one of the narrowing actions stronger. The rule the
format needs is: re-centring alone must fall short, and applying everything must
clear it. You have the first half right.

## `planetary_defense.m09.s2` — `BALLPARK` retype · not applied

Still no `estimate` block. A `BALLPARK` needs `labels` (the number tiles),
`values`, `correct` (which tiles are the right ones), `target`, `tolerance`,
`units`, `relationship` and `solution`.

Impact energy from mass and speed is a good fit for the format — it is worth
writing rather than reverting to `CHOICE`.

---

## How to send it back

Work from your own `planetary_defense-stops-edited.jsonl`, change only the rows named above, and return the
whole file the same way. Every row, changed or not.
