# What the eight bibles owe now — sixth pass, and it is a short page

**139 refusals down to 11.** Six stops out of 480 are still held back, from 47.
Two campaigns are completely clean: **Ground Truth and Red Sand have nothing
left.**

| campaign | refusals | stops held back |
| --- | ---: | ---: |
| Ground Truth | 0 | 0 |
| Red Sand | 0 | 0 |
| Carrying Capacity | 1 | 1 |
| Changeover | 1 | 0 |
| Headwater | 2 | 1 |
| Planetary Defense | 2 | 2 |
| Midway / Safety Factor | 2 | 1 |
| The Trial | 3 | 1 |

The fifth round's work landed almost whole. Everything that did not was a name on
my side rather than a gap on yours, and all of it is fixed: the fifth round's
BALLPARK, PROPAGATE and ALLOCATE blocks were being read against older shapes and
losing their numbers on the way in, and SEQUENCE, PROTOCOL and LOB had no reader
at all. Those six now convert exactly as written.

`prompts_payloads/<campaign>_PAYLOADS.md` names the six remaining stops.

---

## 1. The Trial, TALLY — the one board that is still a different instrument

Mission 4, "The Opened Envelope". The block is complete and it is not a tally:

```yaml
settingPairs:
  - {id: registered, label: "p=.04, n=20", pair: [0.04, 20], expected: 0.558}
  - {id: too_few_patients, label: "p=.04, n=10", pair: [0.04, 10], expected: 0.335}
  - {id: doubled_risk, label: "p=.08, n=20", pair: [0.08, 20], expected: 0.811}
target: 0.558
correctSetting: registered
```

That is *choose the setting whose expected value is the keyed one*. The engine's
TALLY is a different thing: several settings run **at once**, each with a `pSame`
between 0 and 1, and the statistic is the sum of `2·pSame − 1` across all of them.
The player's decision is **when there is enough data to report** — that is the
whole of the format — so a board where one setting carries the answer has nothing
for the player to decide.

Two ways out, and either is fine:

- **Author it as a tally.** Two or more settings, each with a `pSame`, whose
  combined statistic lands on the target within the tolerance, and a `minShots`
  low enough that reporting early is genuinely wrong.
- **Change the format.** What is written is a clean four-option CHOICE or a SWEEP
  over `n`, and the statistics being taught survives either.

## 2. Two CHAIN boards need a distractor

Safety Factor mission 12 and Planetary Defense mission 8. Both boards are
otherwise complete — links, transfers, order and a governing link. Each needs one
more field:

```yaml
distractor: <the id of a link on this board>
```

It is the large obvious member somebody names instead of the governing one — the
rider's weight rather than the impulse, the loudest signal rather than the shared
clock. It has to be one of the links and it may not be the governing link.

## 3. Three boards can be got right without doing the work

- **Carrying, mission 1, BELT.** The word *heat* is in four items and all four go
  to the same bin, so the belt is sorted by spelling rather than by category. Give
  the other bin some items that use the word.
- **Headwater, mission 6, SWEEP.** The target, 4, is printed in the stop's own
  scene or question. Take the number out of the prose; the player is meant to find
  it on the axis.
- **Planetary Defense, mission 4, PROPAGATE.** The board names `range` as the
  dominant term and the arithmetic makes it `angular_arc`: contribution is
  exponent times fractional width, and `angular_arc` is widest. One of the two has
  to move — either name `angular_arc` as dominant, or change the widths so `range`
  really is.

## 4. Three groups still have nobody

`OPENEC` in Changeover, `INFLOW` in Headwater, `SHIP` in Safety Factor.

This was fifteen. Twelve were resolved by reading the roles you wrote: a role that
begins with a group id — "WORKSHOP reliability engineer", "NOTES counter
operations lead" — now places that person in that group, which is what the prefix
was for. **The same trick closes these three**: put `OPENEC`, `INFLOW` or `SHIP`
at the front of one existing person's role, or add somebody. Nothing else is
needed.

---

## What changed on my side, so you do not re-author it

Everything in this list was your work arriving correctly and being read wrongly.

- **BALLPARK.** The fifth round writes the arithmetic — a quantity, inputs, an
  operation, a formula, a result. The panel is a bank of number tiles. All eleven
  boards now convert: each input becomes a tile captioned with its own value, a
  `contextOnly` input becomes a distractor, and the printed row is read off the
  formula, with a number no input carries left as a literal. Safety Factor's
  divide-by-1000 stays a constant rather than becoming a sixth tile nobody
  measured.
- **PROPAGATE.** The board named its `costUnit` and the converter checked for one
  and never wrote it, so three boards that priced everything arrived priced in
  nothing. Each candidate's cost now comes off the input it names.
- **ALLOCATE.** Your complete board was being read as a patch and merged onto an
  older one, which kept the old items and threw the costs away. A block carrying
  `items` is now read as the board it is.
- **SEQUENCE, PROTOCOL and LOB** had no reader. All three now convert, including
  the two renames that matter: a protocol mapping written as `situation: response`
  becomes the permutation the panel grades, and a lob's `charge.max` becomes the
  panel's throwing speed. Left at the default, that panel throws at forty metres a
  second and hits a three-metre mark at every angle.
- **The beat that played twice.** Safety Factor's mission 8 fires two beats after
  stop 32, both correctly authored, and both were headed "After Stop 32" so both
  got the same id. The engine keys a beat by its id, so one replaced the other:
  one beat played twice and the other never played at all. The extractor now
  numbers a repeated heading.
- **A bubble spoken by nobody.** The Trial's mission 4 ended on a line whose
  speaker was `ii` — the tail of a sentence about a Type II error, read as a name.
  A speaker of one or two letters that the roster has never heard of is now
  dropped as what it is.

## One thing worth knowing that is not yours

Fixing the STRESS gate earlier in this work turned up eleven true defects in the
**already-shipped** games, in seven campaigns: a stress board where the robust
candidate also wins at the nominal has nothing to trade away, so moving the slider
teaches nothing. Sightline also writes a direction of `lower_is_better` where the
field takes `maximise` or `minimise`. Those are separate from the eight bibles and
are being handled here.
