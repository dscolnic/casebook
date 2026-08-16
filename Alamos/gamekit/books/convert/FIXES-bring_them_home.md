# Bring Them Home — fix list

**Five instruments went in** and 28 stops took rewritten prose. The conversions
you attempted were ambitious — `FLY`, `STRESS`, `CLOUD`, `ALLOCATE` in one pass —
and five of them are short of the numbers they need.

## 1. One scene is above the reading level

`bring_them_home.m14.s2` — "Combine independent uncertainties" · **scene, 14.3**

## 2. Five conversions not applied

### `bring_them_home.m04.s2` — `FLY`

Missing almost everything the format runs on: no `accel`, no `target`, no
`tolerance`, no `rateTolerance`, no `budget`.

`FLY` simulates a real trajectory: accelerate for a pulse, coast, brake for the
same pulse. It needs the acceleration, the target attitude, how close counts,
how much residual rate is allowed, and the pulse budget. And braking *at* the
target must overshoot by more than the tolerance — that is the whole lesson, so
it has to be true in the numbers.

### `bring_them_home.m05.s3` — `ALLOCATE`

**The whole board costs 0 against a pool of 41 Ah.** The items carry a `rate` and
`maxHours` but the arithmetic comes out empty — check that every item has both,
as numbers.

The integrated variant is the right choice here (amp-hours are rate × time, which
is exactly the lesson), so this is worth fixing rather than abandoning.

### `bring_them_home.m06.s3` — `VERIFY`

The truth sits outside the range the player can predict, so no prediction can be
right. `truth` must be inside `prediction.min`–`max`, and some prediction inside
that range must still fail the accepted ratio.

### `bring_them_home.m11.s3` — `CLOUD`

**Re-centring alone reaches 100% inside**, clearing the 99.5% needed. That
teaches that moving the dot works, which is the exact opposite of the format.
Either widen the starting spread or raise the bar so that only a narrowing action
gets there.

### `bring_them_home.m13.s2` — `STRESS`

The assumption has `min`, `max` and `nominal` but no **`step`** — the slider has
no increment. Add one.

Everything else about this block was good, including deriving the feasibility
from criteria rather than a table.

---

## How to send it back

Work from your own `bring_them_home-stops-edited.jsonl`, change only the rows named above, and return the
whole file the same way. Every row, changed or not.
