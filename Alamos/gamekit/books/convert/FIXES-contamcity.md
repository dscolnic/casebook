# The Contaminated City — fix list

**Four instruments went in** — the fewest of the seven, because eight of your
twelve conversions were short of numbers. The prose edits went in fine, 19 stops.

## 1. "kinetic" is never introduced

First used on **day 8**, in `contamcity.m08.s1` ("What changes the rate?"), with
no glossary entry and no definition in place. In a stop about reaction rates the
word is load-bearing.

## 2. Eight conversions not applied

Three were rejected on their own arithmetic:

### `contamcity.m08.s3` — `STRESS`

**Nothing survives the pessimistic end of the range.** Exactly one candidate must
still be possible there, and it must be the one named `robust`. As written the
stop has no right answer.

### `contamcity.m09.s3` — `TRIGGER`

Only two updates in the stream. It needs **three** — one update is not a stream,
and two do not let a threshold fire late enough to be interesting.

### `contamcity.m14.s3` — `CLOUD`

No narrowing action, and `pass` is not a fraction between 0 and 1. A `CLOUD`
where nothing narrows the spread cannot be answered: shifting the centre is the
trap, not the solution.

Five more were rejected by the importer:

- **`contamcity.m04.s2`** `TRACE` — a channel is listed as independent *and*
  depends on the target. Independence means it does not touch the shared source.
- **`contamcity.m05.s2`** `VERIFY` — no prediction range with min/max/step, and
  no `measurement` with a label. The measurement is the thing the player can skip,
  so it has to exist.
- **`contamcity.m06.s3`**, **`m10.s3`**, **`m15.2`** — `BALLPARK` retypes with no
  `estimate` block. All three need tiles, values, correct, target, tolerance,
  units, relationship and solution.

## Worth saying

The conversions you chose are well judged — a `STRESS` on scale-up, a `TRIGGER`
on release criteria, a `CLOUD` on a concentration against a limit are all exactly
right for this game. It is the numbers underneath that did not arrive. Four of
the eight need only one or two figures.

---

## How to send it back

Work from your own `contamcity-stops-edited.jsonl`, change only the rows named above, and return the
whole file the same way. Every row, changed or not.
