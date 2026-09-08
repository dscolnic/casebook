# Whiteout — round 3

v2.9 cleared both of round 2's big items outright.

```
                                        round 2    now
derivations with no `start`                12        0
derivations with no `goal`                 12        0
wrong lines with no `why`                  27        0   (all 27 now carry one)
TRACE/PROBE naming an undefined target      6        0
                                          ─────    ────
                                            57       37
```

All 13 VERIFY boards carry a prediction range and a truth; all 12 derivations
carry a start line, a goal and a reason on every distractor. `bible-lint` is at
**1 blocking** — M15's outcome at grade 6.5.

What is left is **37 findings on eleven instrument boards**. No shared cause: each
is one board missing one field the panel needs. They are listed here in the order
a player would meet them.

---

## M4 stop 1 — VALUE needs two axes and a cost per option

```
✗ every value option needs a label, an `axis` and a numeric cost
✗ every value option asks about the same axis — buying more of the same is the trap
```

VALUE is a spending decision: the player cannot buy everything, so the question is
which evidence would *change* the decision. That only works if the options buy
different kinds of thing.

```yaml
value:
  budget: 3
  options:
    - {label: "Re-run the controller trace",   axis: "software",  cost: 1}
    - {label: "Read the exhaust thermocouple", axis: "physical",  cost: 2}
    - {label: "Pull the last shift's log",     axis: "history",   cost: 1}
```

At least two distinct `axis` values, or the board is "buy more of the same".

## M4 stop 3 — ATTEST needs a verification budget

```
✗ an attest board needs a numeric `checks` budget
✗ the board allows undefined verifications for 4 claims
✗ 1 critical claim is unbacked and only undefined verifications are allowed
```

`checks: 2` — how many of the four claims the player may verify. The whole format
is that there are not enough checks for every claim, so the player has to spend
them on the ones that would hurt if wrong.

## M5 stop 1 and M8 stop 1 — CASEBOOK mapping must cover every clue

```
✗ casebook mapping does not cover every clue
```

Every clue on the board needs an entry in `mapping` saying which conclusion it
supports. A clue with no mapping is a card the player can never place.

## M5 stop 3 and M6 stop 1 — TRACE needs two channels on its target

```
✗ fewer than two channels depend on the trace target — with only one there is no
  common mode, and the agreement the stop is about never happens
```

The target is named now, which was round 2's finding. What is missing is the
point of the format: **at least two channels have to depend on it**, because the
teaching is that several readings agree for a reason other than reality agreeing.
This is Mei Alvarez's own arc — *"Do these instruments agree because reality
agrees, or because they share code?"* — so the board should show two that do.

## M14 stop 2 — STRESS criteria need their score keys

```
✗ every stress criterion needs a `key` naming the score field it reads
✗ the stress criterion "" is keyed to "", which no candidate has a score for
✗ the stress robust candidate "undefined" is not one of its candidates
```

```yaml
stress:
  criteria:
    - {name: "Holds at the low estimate", key: "margin"}
    - {name: "Survives the retry storm",  key: "retries"}
  candidates:
    - {name: "Staged canary", scores: {margin: 0.8, retries: 0.9}}
    - {name: "Full restart",  scores: {margin: 0.4, retries: 0.2}}
  robust: "Staged canary"        # must be one of the candidate names
```

Two more on the same stop say the payload is still in the bible's own field names
— fixing the keys above will resolve those too.

## M15 stop 4 — the last VERIFY cannot be failed

```
✗ the verify truth is outside the range the player can predict
✗ every prediction in the range passes — widen the range or tighten the ratio
```

The finale's own measurement: the truth sits outside the min/max the player can
dial, and the pass band is wide enough that any dial position counts as a hit. One
of those makes it unanswerable and the other makes it unlosable, and together they
make the campaign's last graded action decide nothing.

---

## Still to hear on

- **The Runway Door.** §3 says it stays shut until the canary gate passes. Should
  it visibly open in Mission 15, with the aircraft arriving on screen? The engine
  can open a door on a campaign event.
- **M15's outcome** is grade 6.5 against a 6.5 ceiling — one sentence split would
  clear the last lint finding in the bible.

## On our side

The place is built — Aster Station's six modules on Ice Core's plateau, all 33
declared fixtures wired, all 60 placements resolved from your own placement lines.
The code blocks still do not render; that is next and it is ours.

One thing this round taught the reader: `### Optional worked examples — exact
player copy` reads exactly like `### Name — job`, so it went onto the roster as a
person called "Optional worked examples" whose job was "exact player copy". A
heading whose words only ever describe part of a document is no longer a person.
