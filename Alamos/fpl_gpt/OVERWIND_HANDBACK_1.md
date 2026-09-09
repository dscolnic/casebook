# Overwind — first read

`OVERWIND_AP_Physics_C_Mechanics_Campaign_Implementation_Bible_v1.0.md`, built
and imported. **It plays.** Twelve missions, forty-eight stops, six areas on
Kerrow No. 3, the four bars on the card, the worked examples behind their
button, and every stop reachable on foot.

This is short because the bible is in good shape. Two things are missing that
only you can write, and a handful of card-level notes after them.

---

## 1. The twelve pieces of the Safe Winding Plan

The bible names the artifact seventeen times and calls it a **twelve-part**
plan, which is exactly right: one part a mission, and the board in the winder
house shows all twelve at once. What it does not do is name the twelve.

Right now the game is showing the **previous** Overwind campaign's list — "The
counting notebook", "The mass defect calculation" — which is nothing to do with
a mine hoist. Your §7.1 ledger already has the twelve, one per day:

> | 1 | The fast start is removed from the passenger schedule. |
> | 2 | The old drum drawing receives a superseded tag. |
> | 3 | The rope limit is written beside the measured length. |

Each of those is a piece; each needs a **name**, three to six words, the way a
document's contents page names a section:

```yaml
delivery:
  pieces:
    - "The measured cage stop"          # M1
    - "The drum's true inertia"         # M2
    - "The rope's own weight"           # M3
    - …twelve in all, one per mission
```

## 2. Nothing closes the campaign

There is no **ending card** — no line anywhere the build can read as one — so
the last thing a player reads is the previous campaign's closing paragraphs.
Mission 12's outcome is written and good; what is missing is the two or three
paragraphs after it: the inspection happened, this is what the plan said, this
is what is still open. The passenger gate opening on day twelve is already in
the world and it deserves a page.

---

## 3. Twelve mission cards never say what the player decides

Every stake in the set is written so the player can see their own job in it —
*"Today you decide whether the proposed start can be used for passenger
trips."* Twelve of yours say what is happening and never turn to the player.
The objective line is close; one clause does it.

## 4. Ten segues do not turn

The segue carries one mission into the next and its job is a **complication** —
*but*, *yet*, *so*, *now*, *that leaves*. Ten of the twelve state a fact and
stop. One (M5) repeats the next mission's stake word for word, and one names no
number, clock or person.

## 5. No question scene names anybody

**0 of 48.** Ruth Bell, Ewan Price, Mara Shaw, Ada Kerr, Ivo Reed and Nia Cole
are introduced on the calls and never appear in a question again — the scenes
describe desks and dials with nobody standing at them. *Ada Kerr has the fast
control locked and the March tape beside it* costs six words.

## 6. Eight of the twelve derivations never substitute a number

`deriveGivens` reads every DERIVE line and asks whether the arithmetic is
actually done. Eight of yours are algebra all the way down: symbols rearranged,
no number ever put in. That is a legitimate way to derive and it means the
player never computes, on a course whose exam is computed. One numeric line per
derivation would settle it.

## 7. Six passages, no questions

The roster's six bios are passages a player can read and none carries a
question, so reading them is optional in the way that means nobody does it.

## 8. Two cards over the reading ceiling

Mean 5.8, worst 7.2, two of thirteen above 6.5. Close, and both are one long
sentence.

---

## On our side, no action wanted

The place is dressed since the first build: the spoil heap, the tub road, the
rope coils, the fan house, the settling ponds and the weighbridge in the yard,
and out on the moor a dry-stone wall with a stile, sheep, peat cuttings, the
survey cairns and the telegraph line. The cage runs the frame with the sheave
wheels turning, the shift board gains a slip a mission, and the passenger gate
opens on day twelve.

Four things the build learned from this bible, all fixed here:

- a Symbols line may spell its subscripts out — `Mtotal`, `Tperiod`, `bmin` —
  and three of your equation blocks were read as naming no symbol at all;
- `### Course supplement — transparent ungraded reference` was being read as a
  member of the cast;
- a wrapped board may have a field beside it (`estimate:` next to `answerText:`)
  and five complete BALLPARK boards came through empty;
- `template: "Use the labeled quantities to fill 2 blanks."` is an instruction
  where the printed row goes. We build the row from your `formula` for now —
  `a/b` becomes `{0} / {1}` — but a written row would read better.
