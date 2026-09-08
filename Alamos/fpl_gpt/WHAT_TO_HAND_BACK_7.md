# What the eight bibles owe now — six lines

**11 refusals down to 6.** Three stops out of 480 are still held back.
**Five of the eight campaigns are completely clean**: Ground Truth, Red Sand,
Midway / Safety Factor, The Trial and Changeover's boards.

| campaign | refusals |
| --- | ---: |
| Ground Truth | 0 |
| Red Sand | 0 |
| The Trial | 0 |
| Carrying Capacity | 1 |
| Changeover | 1 |
| Headwater | 1 |
| Midway / Safety Factor | 1 |
| Planetary Defense | 2 |

The sixth round's TALLY-to-CHOICE conversion, the two chain distractors and the
group-id prefixes all landed. The only thing that did not read on the first pass
was the new CHOICE shape — the key marked `correct: true` on the option and the
rebuttal written beside it as `feedback`, rather than as an `answer` and a
`rebuttals` map. Both are read now, so keep writing them that way.

---

## The six

**1. Carrying, mission 1, BELT — four more items.** The bank has 20 and the belt
needs 24. It is shuffled and only part of it is played, so a short bank makes
every run the same run. Four more items, and mind the earlier note: give both
bins items that use the same words, or the belt is sorted by spelling.

**2. Headwater, mission 6, SWEEP — take the number out of the prose.** The target,
4, is printed in the stop's own scene or question. The player is meant to find it
on the axis.

**3 and 4. Planetary Defense, mission 4, PROPAGATE — one root, two refusals.**
Every input is written `sigmaFrac: 1.0` with the real width in `value`, in
kilometres:

```yaml
- {id: angular_arc, value: 6200, sigmaFrac: 1.0, exponent: 2, ...}
- {id: range,       value: 13800, sigmaFrac: 1.0, exponent: 1, ...}
```

`sigmaFrac` is a **fraction** — how wide a term is known to, relative to the term
itself — and the panel ranks by `|exponent| × sigmaFrac`. With every fraction set
to one, that ranking is just the exponent, so `angular_arc` comes out dominant
where the board names `range`, and the budget then looks like it covers
everything. Both refusals go together.

Either write the fractional widths directly, or add the quantity the terms
propagate into and give the widths against it:

```yaml
output: {label: "forecast corridor width", value: <km>, unit: "km"}
```

Two other things on that board worth a look while you are in it. `correctUpgrade`
is `radar_plus_dawn` and `dominant` is `range`, which are different terms — the
panel grades the buy against `dominant`, so those have to agree. And
`radar_plus_dawn` costs exactly the whole budget of 65, which makes it the only
purchase the player can afford.

**5. Changeover — one word.** `COUNTER` has nobody. Two people land in `STATS`,
because *"price statistics lead"* names the Price Room and the Statistics Floor
equally and the build refuses to guess between them. Put a group id at the front
of that role, the way the other seven are written, and both problems close.

**6. Safety Factor — one word.** `TOWER` has nobody, and *"COASTER and FLUME
mechanical lead"* and *"COASTER geometry engineer"* both start with `COASTER`.
Change one prefix.

---

That is everything. Five campaigns are green now, and the other three are one
line each apart from the Planetary Defense error budget, which is one number per
input.
