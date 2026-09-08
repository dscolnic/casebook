# What the eight bibles owe now — fourth pass

The third handback asked for boards that *decide* something, and for a concept
number on every stop. Both landed. **258 of 480 stops now build a real panel**,
up from 239, and only **two** stops would render an empty panel, down from three.
All 480 concept tags now carry the course's own numbered entry.

What is left is 181 refusals, and they sit in a much smaller place than before:
**66 stops out of 480**, plus fifteen empty groups and three one-off defects.
`prompts_payloads/<campaign>_PAYLOADS.md` was regenerated after everything below
and names all 66, each with the sentence the build refused it with. **Those eight
files are the work.** This page is only what is true across all of them.

| campaign | refusals | stops involved |
| --- | ---: | ---: |
| Planetary Defense | 52 | 15 |
| Headwater | 27 | 9 |
| Safety Factor | 24 | 8 |
| Carrying Capacity | 19 | 10 |
| Ground Truth | 17 | 7 |
| Red Sand | 17 | 7 |
| Changeover | 13 | 6 |
| The Trial | 12 | 4 |

---

## 1. Three formats were relabelled, and the relabel needs finishing — 51 of 181

This is the biggest item, and it needs a decision before it needs authoring.

Round three changed some stops' format and wrote a canonical block for the **new**
format whose every value is a placeholder. HOLD's `reveal` entries carry the old
payload string as their `valueSource`, twice over. BALLPARK's `correctResult`
reads *"The keyed result shown by the completed interaction."* Meanwhile the
stop's own payload line still holds the **original** board, complete and numeric.

| relabel | stops | what the payload still holds |
| --- | ---: | --- |
| HOLDOUT → HOLD | 9 | training points, two models' predictions, a keyed answer |
| BALANCE → BALLPARK | 11 | a ledger of streams with `counts: true/false` and a keyed total |
| CLOUD → CHOICE | 4 | a settings-and-readings table |

The 9 HOLD stops and the 11 BALLPARK stops account for **51 of the 181** refusals
between them — HOLDOUT's own three included. The four CLOUD-to-CHOICE stops build
and are not among the 181; they are listed because the same thing happened to them
and a CHOICE made from a cloud is a decision worth reading before it ships.

**I tested putting the old format back, and it does not work either.** Every one
of those payloads was run through the original format's reader:

- The HOLDOUT payloads owe seven fields each. This engine's HOLDOUT is a *scored
  curve over a threshold axis* — `axis.min`, `axis.max`, five points in `fit` and
  five in `test`, each an `at` and a `value`. A training set plus two models'
  predictions is a different instrument wearing the same word.
- The BALANCE payloads owe between three and nine. Their stream values are
  compositions, ranges and ICE-table rows rather than single numbers, and **not
  one stream is marked `hidden`** — which is the whole of that format.

So the relabel was not a mistake to undo. **It is a move that was made and not
finished**, and finishing it is authoring nine HOLD blocks, eleven BALLPARK
estimates and four CHOICE boards from data that is already sitting on those
stops. Concretely:

- **A HOLD** needs a `prediction` to commit to, a named `disturbance` to hold it
  against, a numeric `tolerance`, and a band at the end of the run that is
  positive and no wider than the band at the start. Nine stops owe all four.
- **A BALLPARK** needs an `estimate` block: a quantity, a unit, the visible
  inputs, the operation, a numeric `correctResult` and a tolerance. Eleven stops
  carry prose where the arithmetic should be, and prose carries no arithmetic.
- **A CHOICE** made from a CLOUD payload needs options and a keyed choice, not a
  centre and a spread.

If you would rather put HOLDOUT and BALANCE back, that is fine too — but then the
boards have to be authored to those formats' real shapes, listed above. Either
direction is roughly the same amount of writing. What cannot work is the current
state, which declares one format and carries another format's data.

## 2. Four formats owe a field on every board they have — 57 of 181

Small counts, dense failures. Each of these is one missing field repeated.

| format | stops | what every board owes |
| --- | ---: | --- |
| PROPAGATE | 3 | a `costUnit`, a positive budget in that unit, and a positive cost on every measurable candidate. All three budgets currently read `NaN undefined`, so buying everything is the winning play. |
| SWEEP | 4 | a numeric `target`, a positive `tolerance`, a target inside its own axis, a start away from the answer, and at least four authored response points. Two of the four could not be read at all — the payload is still in the bible's own field names. |
| ALLOCATE | 2 | a numeric cost or a stated pair on every item, and at least one answer the plan is allowed to forgo. As written every answer is required and everything is affordable, so nothing is traded away. |
| TRACE | 9 | a label and a reading on every channel. Two channels read as a bare number with no quantity and no unit — a dimensionless ratio has to say that it is one. |

## 3. Nine formats owe a floor they fall short of — 31 of 181

These are countable and quick. Each format has a minimum below which the
instrument has nothing to do.

- **DIAGNOSIS, 4 stops** — four candidates to rule out. All four boards have fewer.
- **PROBE, 4 stops** — four stations. A pattern needs somewhere to break.
- **CONTROL, 3 stops** — three candidates, a truth that is one of its own
  variables, and a response clear of the noise. One trial as written is a coin toss.
- **CHAIN, 3 stops** — four links, each named once, each with what it carries.
- **DEGENERACY, 2 stops** — `min`, `max` and `step` on every control, and a truth
  inside their range.
- **VALUE, 2 stops** — a label, an axis and a numeric cost per option, and at
  least two axes on the board. Buying more of the same is the trap.
- **INJECT, 2 stops** — a population with a numeric size.
- **TALLY, 1** · **TRIANGULATE, 1** · **LOB, 1** · **SEQUENCE, 1** · **PROTOCOL, 1**
  — see the named lines in the payload files.

Three of these also print their own answer, which is the standing rule: **a panel
states the goal, never the target.** One sweep target appears in its own scene
text; one PROPAGATE budget covers the dominant term and the cheapest other
measurement together; one board leaves exactly one affordable candidate, so
affordability names the answer before the arithmetic does.

## 4. Two BELT boards are winnable by spelling

A word appears in enough items on one side that sorting by that word beats sorting
by the category. Give the other bin some items that use the same word. One BELT
item is also five words long; belt names are read at speed and must be three or
fewer.

## 5. Fifteen groups have nobody on the roster

Unchanged, and now the second-largest item. A group with no one posted to it has
unreachable person stops **and** a group leader the game invents from the group's
own name.

| campaign | groups | roster |
| --- | --- | ---: |
| Changeover | PRICES, NOTES, BANKS, TRADE | 8 people, 8 groups |
| The Trial | STAT, SITE, REG | 8 people |
| Ground Truth | SCREEN, EARTH, COUPLE | 5 people, 7 groups |
| Safety Factor | WORKSHOP, COASTER, FLUME | 5 people, 8 groups |
| Planetary Defense | TOWN | 8 people |
| Headwater | STORE | 6 people, 7 groups |

Three of those rosters are simply smaller than the number of places the campaign
sends the player: Ground Truth has five people for seven areas, Safety Factor five
for eight. Those need people added. Changeover is the different case — eight
people for eight groups, four of them doubled up, because the build places a
person from the words in their own role and **"price statistics lead" names two
areas at once**, the Price Room and the Statistics Floor. Four roles need one
word each that settles it, or a `division` stated outright.

## 6. Two campaigns' warm-up runs are staffed by a cast that does not exist

Carrying Capacity and Changeover are the only two of the eight with warm-up runs,
and both blocks were carried over from the shipped edition whole, down to the
character. Nothing checks this, and nothing failed.

- **Carrying** names Dan Pike, Mairead Sorley, Petra Rask, Grace Nkemdi and Ewan
  Hollis. The roster is Voss, Reed, Okafor, Vale, Shaw, Chen, Noor, Costa, Pell.
  Note that *Nkemdi* is on the roster — as Nkemdi Okafor's **first** name.
- **Changeover** names Ngozi Okonjo, Bram Tulloch, Kata Novotny, Emil Radic, Femi
  Adeyinka, Josiah Mbeya and Levon Sarkis. The roster is Venn, Voss, Pell, Saye,
  Arendt, Corren, Dane, Vale.

Every one of those is a person the player is told to find, follow or catch. Six
warm-up runs per campaign need their copy re-pointed at the cast the campaign
actually ships. **I corrected the two item counts myself** — the hunt said six and
the run places one per area, which is seven on Vellan and eight in Kesteven House
— but a name in a character's mouth is yours.

## 7. Two one-off defects

- Safety Factor mission 8: two beats share the id `after-stop-32`, so one of them
  plays once for both.
- The Trial mission 4: a bubble is spoken by `ii`, who is nobody. The same
  campaign's roster carries an entry named *"Numerical visibility manifest"*,
  which is not a person either.

---

## What I fixed on this side, so you do not author it again

- **The concept numbers for The Trial and Changeover** were spliced but never
  assembled into their books. 120 refusals, all of them mine.
- **A card that names somebody by one name.** Eleven beat bubbles spoke as
  `mission-lead` or `arrival-lina` on missions whose cards read *"Waterworks,
  Nkemdi at store-gauges"*. The resolver matched full names only. It now takes a
  single name part when exactly one person on the roster carries it, and refuses a
  name two people share.
- **A group leader who is not on the roster.** Seven of the eight campaigns keep
  the shipped edition's `groups:` block, so every `defaultLeader` still names the
  old cast — Carrying's six leaders are berhane, calloway, ferris, pike and
  sorley, and only okafor exists in the book that ships them. Nothing failed,
  because the leader roster falls back to whoever works in the group; but the
  group kept the stale id, and that is the field the game assigns from. Resolved
  now to whoever the roster says works there.

## How to check your own work before sending it back

1. **Can this board be got wrong?** If every candidate survives, if nothing is
   required, if the budget buys everything, or if the answer is the opening
   position, the panel is scenery.
2. **Does the format's own data exist?** A stop that says HOLD and carries a
   `holdout:` payload declares one instrument and ships another. This is the
   whole of item 1 and a quarter of everything left.
3. **Is every person named in this campaign on this campaign's roster?** Warm-up
   copy, beat bubbles and group leaders all failed this, in three different ways,
   and only one of the three was caught by a gate.
