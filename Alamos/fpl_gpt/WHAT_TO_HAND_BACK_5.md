# What the eight bibles owe now — fifth pass

**181 refusals down to 139**, and the number of stops still held back is **47 of
480**, from 66. Four formats came off the list completely: TRACE, DIAGNOSIS,
VALUE and all but one ALLOCATE. The HOLD boards went from empty to authored, and
the failures against them are now about how the board *plays* rather than about
fields nobody wrote — which is a much later stage of the same job.

`prompts_payloads/<campaign>_PAYLOADS.md` was regenerated after all of this and
names all 47 stops with the sentence each was refused with.

**Two of the eight bibles came back unchanged**, and they are now more than half
of everything left.

| campaign | refusals | stops | revised this round |
| --- | ---: | ---: | --- |
| Planetary Defense | 52 | 15 | no |
| Safety Factor | 24 | 8 | no |
| Headwater | 14 | 7 | yes |
| Red Sand | 13 | 5 | yes |
| Carrying Capacity | 10 | 5 | yes |
| Changeover | 10 | 3 | yes |
| The Trial | 8 | 2 | yes |
| Ground Truth | 8 | 2 | yes |

Planetary Defense and Safety Factor still carry the third round's stub blocks,
down to the line `valueSource: "No structured payload was present; this block
supplies it."` Everything below applies to them exactly as it did a round ago.

---

## 1. HOLD is authored now, and it is still the wrong instrument — 37 of 139

Nine stops, six campaigns, and the largest item for the third round running. The
blocks are no longer empty: Headwater's names a quantity, a control, a target, a
band, a `narrowTo` and four disturbances. The disturbances are the problem, and
they are the same in all nine.

Every one is written as a **reading**:

```yaml
disturbances:
  - {id: h1, label: "Full-radiator interval", value: 566, unit: "K"}
```

The engine's HOLD is a live run against a clock. A disturbance is **a step in the
rate at a moment in the run** — a load comes on and the quantity keeps moving
until the player answers it. So each one needs a `label`, an `at` in seconds from
the start of the run, and a non-zero `amount`, and the board around them needs a
`duration` between 20 and 120 seconds, a `direction` of `raise` or `lower`, an
`authority` saying how hard the control can push, and a `pass` fraction above a
half. The importer then simulates a do-nothing run: if the needle stays inside
the band without the player touching anything, the board is scenery.

**Which is the finding, and it is not a field.** A held-back measurement revealed
after a commitment is not a disturbance arriving at second 12. These nine stops
are freeze-and-reveal, they have been freeze-and-reveal since the first round,
and the engine has exactly one format for that: **HOLDOUT**.

**So retype the nine back to HOLDOUT and write them the way you wrote The Trial's.**
That block is the model, and it is very close to right:

```yaml
holdout:
  axis: {label: "allowed prediction error", min: 0, max: 5, step: 0.5, unit: "%"}
  fit:   [{at: 0.5, value: 0.62}, ... five points]
  test:  [{at: 0.5, value: 0.40}, ... five points]
  passScore: 0.80
```

Two notes on it. `passScore` is fine — I read that spelling now. But **the board
has no trap**: both curves climb to their best at the widest tolerance, so the
position that scores best on the calibration set also passes on the held-out set.
The whole point of the format is that it must not. The calibration curve needs a
**narrow spike** that the held-out curve does not have, so a player who chases the
sample is punished for it. Everything else in that block is exactly right.

## 2. BALLPARK: eleven stops, unchanged — 11 of 139

The one item from the fourth handback that nothing moved. Eleven stops declare
BALLPARK and carry prose where the arithmetic should be. Each needs an `estimate`
block: a quantity, a unit, the visible inputs, the operation, a numeric
`correctResult` and a tolerance. Three are in Safety Factor and two in Planetary
Defense, so five of the eleven are in the two bibles that were not revised.

## 3. Three formats owe a field on every board — 32 of 139

- **PROPAGATE, 3 stops.** All three budgets still read `NaN undefined`. Each needs
  a `costUnit`, a positive budget in that unit, and a positive cost on every
  measurable candidate. As written, buying everything is the winning play.
- **SWEEP, 3 stops.** A numeric `target`, a positive `tolerance`, a target inside
  its own axis, a start away from the answer, four response points.
- **CONTROL, 3 stops.** Three candidates, a truth that is one of the board's own
  variables, and a response clear of the noise.

## 4. Two blocks are complete and the format cannot hold them — 2 of 139

Both are well authored. Neither fits, and the fix is a decision rather than a
field.

- **Carrying, SEQUENCE.** The block writes eight cards in two named routes,
  primary and secondary, and an `order` naming four of them. SEQUENCE is one
  rail: every card in the board goes in the order, exactly once. A board
  comparing two routes is not an ordering, it is a comparison — either cut it to
  the one route the order names, or change the format.
- **Ground Truth, PROTOCOL.** Seven situations, six actions, and a mapping written
  as `situation: action`. PROTOCOL is a matching board: one response per
  situation, and the mapping is a permutation. Two situations share
  `force_cross`, which the format cannot express. Give each situation its own
  response, or merge the two that share one.

## 5. Fifteen groups have nobody on the roster — unchanged

Still the second-largest item, and untouched for three rounds.

| campaign | groups | roster vs groups |
| --- | --- | --- |
| Changeover | PRICES, NOTES, BANKS, TRADE | 8 people, 8 groups |
| The Trial | STAT, SITE, REG | 8 people |
| Ground Truth | SCREEN, EARTH, COUPLE | 5 people, 7 groups |
| Safety Factor | WORKSHOP, COASTER, FLUME | 5 people, 8 groups |
| Planetary Defense | TOWN | 8 people |
| Headwater | STORE | 6 people, 7 groups |

Ground Truth and Safety Factor need people added — five for seven areas and five
for eight. Changeover has enough people and four of them are doubled up, because
a person is placed from the words in their own role and *"price statistics lead"*
names two areas at once. Four roles there need one word that settles it.

## 6. Everything else — 30 of 139, all named in the payload files

DEGENERACY 2 stops, PROBE 4, CHAIN 2, TRIANGULATE 1, TALLY 1, BELT 2, LOB 1,
INJECT 1, ALLOCATE 1. Each is a floor the format sets and the board falls under —
four candidates, four stations, four links, two axes. The two BELT boards are
still winnable by spelling rather than by category.

Two one-off defects also stand: Safety Factor mission 8 has two beats sharing the
id `after-stop-32`, and The Trial mission 4 has a bubble spoken by `ii`, in a
campaign whose roster also carries an entry named *"Numerical visibility manifest"*.

---

## Two things about how the blocks are written

**Number your blocks, and I will read the newest.** Six blocks came back headed
*"Handback 4 canonical interaction block"*. My reader matched the literal string
*"Handback 3"*, so those six were invisible and the build silently used the older
board underneath them. That is fixed — the round number is read now, and the
highest round present wins — so a fifth round can be headed *"Handback 5"* and it
will be preferred over everything before it. Keep the earlier blocks in place;
they are what the prose is held to.

**Do not add markup to a line labelled "exact player copy".** Seventy-six scenes
in Headwater and Ground Truth came back with backticks added around the maths —
`` `(t^2-36)/(t-6)` `` where the last round had none. The game draws those cards
as plain text, so a backtick is a backtick on screen. I kept the unmarked
version, so nothing is lost; but the two files now disagree with the game about
what the exact player copy is, and the next comparison will report seventy-six
differences that are not differences.

## How to check your own work before sending it back

1. **Does this format's data match this format's instrument?** A reading is not a
   disturbance; a comparison of two routes is not an ordering; seven situations
   do not match six responses. This is now the whole of items 1 and 4.
2. **Can the board be got wrong?** Both HOLDOUT curves peaking in the same place,
   a budget that buys everything, a sweep starting on its answer — each renders a
   panel the player cannot fail.
3. **Is every person named in this campaign on this campaign's roster?** Fifteen
   groups still have nobody in them.
