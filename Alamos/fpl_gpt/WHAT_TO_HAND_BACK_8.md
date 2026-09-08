# Nothing left to hand back

**All eight campaigns import clean.** 0 refusals, 0 stops held back, 480 of 480
stops building. The `prompts_payloads/` files are all empty, and every theme's
content has been written for the first time.

| campaign | refusals |
| --- | ---: |
| Carrying Capacity | 0 |
| Changeover | 0 |
| Ground Truth | 0 |
| Headwater | 0 |
| Midway / Safety Factor | 0 |
| Planetary Defense | 0 |
| Red Sand | 0 |
| The Trial | 0 |

The seventh round's blocks all read. The last six items were closed here rather
than sent back, and four of the six were edits to the bibles, so they are worth
knowing about.

## What I changed in the bibles

- **Carrying, mission 1, BELT.** Four items added — `sulfur` and `potassium` to
  the matter bin, `electrical work` and `infrared radiation` to the energy bin —
  taking the bank from 20 to the 24 the belt shuffles from. The bins stay twelve
  and twelve, and no word now appears in four items and sorts them one way: the
  `heat` split you wrote in the sixth round is four each side and stays that way.
- **Safety Factor, cast.** Luka Kovač was headed `COASTER and FLUME mechanical
  lead`, and both of those posts already had somebody — Priya Nair on coaster
  geometry, Mateo Ruiz on flume hydraulics — while Drop Tower Control had five
  stops and nobody. He is now `TOWER mechanical lead, working the coaster and the
  flume`, which is what his own entry describes him doing.
- **Planetary Defense, mission 4, PROPAGATE.** Rewritten as a Handback 7 block,
  with the earlier ones left in place. Every input had `sigmaFrac: 1.0` and its
  real width in `value`, in kilometres, so the panel's ranking of
  `|exponent| × sigmaFrac` was just the exponent. The widths are now fractions of
  a named corridor:

  ```yaml
  output: {label: "b-plane corridor width", value: 16000, unit: "km"}
  ```

  which makes range the widest contribution at 0.863 against angular arc's 0.776,
  even though angular arc carries the larger exponent. That is the shortcut the
  format exists to break, and it now breaks. The costs are yours, unchanged, and
  they work: the range fix is affordable at 50 of 65, and 65 will not buy it plus
  anything else. `radar_plus_dawn` is gone from the input list, because it is the
  purchase that narrows the range term rather than a fifth source of error; the
  corridor still closes to about 4,600 km.
- **Changeover** needed nothing. `COUNTER` was reported empty and the campaign
  writes no stops into it at all, so there were never any person stops there to be
  unreachable. That refusal was mine and the check has been corrected.

## What I changed on this side

- **The empty-group check** now fires only for a group the campaign actually
  writes stops into. Changeover declares eight groups because the shipped edition
  it was built from has eight, and uses four.
- **A prose refresh.** 34 player-facing lines across seven campaigns were still
  the wording of an earlier round, because the build rewrites boards and had never
  copied a corrected sentence forward. One of them mattered: Headwater's sweep
  stop printed `S(t)=18+12 arctan(t-4)` in its own scene while asking the player
  to find the time of maximum slope, and your later rewrite had already removed
  the formula. All 34 now match the bibles.

## One thing still open, and it is not yours

Eleven true defects in the **already-shipped** games, in seven campaigns, turned
up when the stress gate was fixed during this work: a board where the robust
candidate also wins at the nominal has nothing to trade away. Sightline also
writes a direction of `lower_is_better` where the field takes `maximise` or
`minimise`. Those are separate games and are being handled here.
