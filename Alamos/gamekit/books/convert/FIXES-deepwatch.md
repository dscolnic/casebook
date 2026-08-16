# Deep Watch — fix list

Thirteen changes apply: eight new instruments — ROUTE, BALANCE, DELEGATE,
CONTROL, CHAIN, STRESS, ATTEST, ALLOCATE, eight distinct formats on eight
separate days — six of which land, plus seven DIAGNOSIS screens retyped to
CHOICE. The spread is right and the judgement about which stops deserved an
instrument is good.

Four rows are out, and one thing about the file itself needs saying first.

## 0. Sixteen of the forty-five stops never came back

The file has 29 rows. Missing:

```
m01.s1  m01.s2  m03.s1  m04.s2  m05.s3  m06.s2  m06.s3  m07.s3
m08.s1  m08.s3  m10.s3  m11.s3  m12.s2  m13.s2  m13.s3  m15.s2
```

Nothing was lost — a stop that does not appear is left exactly as it was — but a
third of the game got no editorial pass at all, and there is no way to tell
whether those stops were read and judged fine or never opened. **Return every
row, changed or not.** An unchanged row costs nothing; a missing one is
ambiguous.

Also: this sheet keyed the new format `to`, with `from` beside it. That is a
perfectly reasonable way to write it and it is now read, so no change is needed —
but `format` is the field the sheet ships with and the one that cannot be
misread.

## 1. `deepwatch.m08.s2` — "What the nine are owed" · `DELEGATE`

**No problem is both loud and stable.** Four problems, and their flags are:

| problem | trend | irreversible | loud |
| --- | --- | --- | --- |
| Aft fire boundary | rising | yes | — |
| Forward flooding | falling | no | — |
| Atmosphere | stable | no | — |
| Fractured wrist | stable | no | — |

The format's whole lesson is that the loudest thing is not the most urgent thing.
With nothing marked `loud`, the alarm and the priority are the same object and
the player cannot get it wrong.

**Fix:** mark the fractured wrist `loud: true`. It is the one that will pull a
watchstander's attention and the one that changes nothing if it waits twenty
minutes. Everything else on this block is right — the roster, the three first
actions, the return conditions and the boundary as the problem command keeps.

## 2. `deepwatch.m12.s1` — "What survives the assumption moving" · `STRESS`

The block is well-built and the reasoning is exactly right: at four hours the
Maximum Quiet option wins, at six hours its equipment endurance runs out, and
Balanced Quiet is the one you would actually commit to. **The instrument cannot
express it in this direction.**

STRESS models the assumption as a **resource**: `feasible[id]` is the *lowest*
value of the assumption at which that candidate is still possible, and a
candidate survives the range when that value sits at or below the assumption's
minimum. Your assumption — transit duration — gets *harsher* as it grows, so
every candidate reads as surviving and the trap fires with three survivors.

**Fix, either way round:**

- **Restate the slider as the margin, not the demand.** Something like "hours of
  equipment endurance the passage will still leave you", which shrinks as the
  transit grows. Then `feasible` is each option's minimum endurance and the
  arithmetic falls out unchanged.
- **Or give `feasible` explicitly** in the engine's terms: one number per
  candidate, being the least amount of the assumption at which it still works,
  with `robust` naming the survivor and `optimiseOn` naming the criterion the
  survivor must *not* win at the nominal.

The second requirement matters as much as the first: if the robust candidate is
also the best at the nominal, choosing well costs nothing and the slider is
scenery. Yours passes that — Maximum Quiet wins on noise at four hours — so keep
that structure.

## 3 & 4. Two retypes to `BALLPARK` with no arithmetic

`deepwatch.m12.s3` (passive sonar signal excess) and `deepwatch.m15.s3` (beat
frequency). Both carry `prompt`, `question`, `relationship`, `explanation`,
`solution` and `labels` — and no `values`, `target` or `correct`. That is a panel
of tiles with nothing behind them: the player can click but nothing can be
graded, and the importer refuses the stop.

**A `BALLPARK` needs all of:**

| field | what it is |
| --- | --- |
| `labels` | the tile captions you already wrote |
| `values` | the number behind each tile, same length and order as `labels` |
| `correct` | the indices of the tiles that belong in the calculation |
| `target` | the answer, as a number |
| `tolerance` | how close counts |
| `units` | what the answer is in |

Your own worked solutions already contain every number. For `m12.s3`:
`values: [145, 55, 85, 20, 10]`, `correct: [0, 1, 2, 3, 4]`, `target: 15`,
`units: "dB"`, and a tolerance you choose.

**One thing to change while you are in `m15.s3`.** Its tiles are 147 Hz, 150 Hz,
1500 m/s and **3 Hz (difference)** — and 3 Hz is the answer. A tile that is the
answer turns the estimate into a spot-the-label exercise. Drop it, and let the
player subtract.

## What is already right, so nothing is spent re-checking it

Your `compartments` / `route` / `blockedDoor` / `detour` shape for ROUTE, the
`people` roster and `keepYourself` on DELEGATE, `items[].answers` on the
ALLOCATE, and the per-variable readings on the CONTROL were all read correctly
after normalisation. Do not rename any of them.

## How to send it back

Work from your own `deepwatch-stops-edited.jsonl`, fix the four rows named above,
and return **all forty-five rows** this time — including the sixteen that have
not been looked at yet.
