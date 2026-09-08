# Whiteout — round 5

**v2.11 imports.** The campaign is built, walkable and photographed: fifteen
missions, sixty stops, six modules on Aster Station's plateau, and Mission 1
Stop 1 now shows its three lines of Java on the card. Every one of round 4's
nine blocking findings is gone.

```
                                round 3   round 4   now
findings blocking the import       37        9        0
```

What follows is **not** blocking. It is what a first play-through and the
repo's own gates turn up, in the order they matter.

---

## 1. The campaign builds nothing — the one real gap

Every course adventure in this set builds **one named thing, a piece a day**,
and it is the spine the cards hang off: the opening card names it, each mission
hands over that day's piece, and a board in one room shows all fifteen at once.
Red Sand builds a fuel load. Ice Core builds the Vestri Record. Whiteout builds
— nothing the bible names, so the board in the Operations Module is **still
showing Ice Core's**, which is the one visibly wrong thing in the game.

What is needed is a name and fifteen pieces, one per mission. Your own §7 table
already has the material — every mission's "Decision delivered" is a piece —
so this is a naming pass rather than new writing. A first cut, to argue with
rather than adopt:

```yaml
delivery:
  name: "The Recovery Record"
  what: "What the next crew needs to trust this station: which failures were
         software, what proves it, and which repairs survive inputs that did not
         shape them."
  pieces:
    - "The integer-arithmetic alarm"          # M1
    - "The two branches that both fired"      # M2
    - "The loop that never advanced"          # M3
    - "The shared utility, isolated"          # M4
    - "The reference that reached P02"        # M5
    - "The timestamp cut one character short" # M6
    - "The transposed room index"             # M7
    - "The skipped-record signature"          # M8
    - "The corrected hazard map"              # M9
    - "The search that fits the window"       # M10
    - "The static field, separated"           # M11
    - "The four-item rescue message"          # M12
    - "The terminating route builder"         # M13
    - "The holdout that revoked ALL GREEN"    # M14
    - "The signed staged release"             # M15
```

**Please name it yourselves.** The opening card has to say it — the check that
found this says exactly that: *"the opening card never names it: the player is
told what is at stake and not what they are building."*

## 2. Nothing closes the campaign

The bible writes no **ending card** — no `**Campaign ending card — exact player
copy:**` line anywhere — so the last thing the player reads is still Ice Core's
closing paragraphs about a hole at 2,470 metres. Mission 15's outcome is written
and good; what is missing is the two or three paragraphs after it: what
happened, what it cost, what is unfinished. The aircraft lands in your §3 answer
— that ending should be readable as well as walkable.

## 3. Fifteen mission cards never say what the player decides

Every stake in the set is written so the player can see their own job in it:
*"Today you decide whether a leak explains the shortage."* Whiteout's fifteen
say what is happening and what is at stake and never turn to the player. The
objective line is close — *"Gather enough code and station evidence to decide
whether the generator is actually under-delivering heat…"* — and one clause
would do it:

> Today you decide whether the generator is failing or the controller is
> calculating the percentage wrongly.

## 4. Nine segues do not turn, and three repeat the takeaway

The segue is the line that carries one mission into the next, and its job is a
**complication**: *but*, *yet*, *so*, *now*, *that leaves*. Six of the fifteen
state a fact and stop. Three others (M2, M7, M11) repeat that day's takeaway
word for word — the takeaway is the principle, the segue is the drama, and they
are not the same job.

## 5. No question scene names anybody

**0 of 60.** Six people are introduced on the calls and then never appear in a
question again: the scenes describe boards and readings with nobody standing at
them. The cast is one of the best things in this bible — Mei Alvarez's *"Do
these instruments agree because reality agrees, or because they share code?"* is
the whole of Mission 6 — and a scene that says *Priya has the mirror open beside
the live controller* costs four words and puts her in the room.

## 6. Five primer lines run 41–49 words

Under "Worth knowing first", a line that long is reference rather than prose;
the card is read in about fifteen seconds. Two sentences each.

## 7. Two equations are shown and never computed

- **M1** shows `percent = 100.0 × delivered / requested` and no stop that day
  computes it (Stop 1 traces it as code, which is the right question and not a
  calculation).
- **M10** shows `binary-search work ≈ log₂(n)` and no stop computes it either.

Either is fine to fix by adding the arithmetic to a stop, or by not printing the
equation on the card.

## 8. Ten terms are used and never introduced

`scrubber`, `ppm`, `rms`, `hab`, `vent`, `lock`, `shut`, `delay`, `abort`, `go` —
no glossary entry, no primer line, no gloss in place. Three days leave two or
more of them unexplained and the primer names none. Several are panel labels
(GO, LOCK, VENT, ABORT), which is exactly where a word needs a gloss the first
time: a button is not a definition.

*(Our side: the checker was reporting twenty-two, and twelve of those were
ordinary English words shouted on a button — KEEP, GREEN, LIVE. Fixed here; the
ten above are real.)*

## 9. One derivation substitutes a number the player was never given

The measurement is `deriveGivens`: a derivation step that puts a numeral into a
line where that numeral appears in none of the givens, the question, or an
earlier line. One of Whiteout's twelve does it. We can name the step if that is
easier than finding it.

## 10. Twenty-five calculations are asked at a person

Not wrong, and worth knowing: a stop placed at a named person is a stop the
player answers over somebody's shoulder, which suits a judgement and reads oddly
for a trace or a calculation ("it wants a bench, not a shoulder"). Your
placements are otherwise precise — all 60 resolve to a declared fixture.

---

## What we fixed on our side this round

No action wanted; recorded so a later revision does not "fix" them back.

- **`code:` blocks now render.** The block was being dropped in conversion and
  again at import, so Mission 1 Stop 1 said "Read the three displayed lines"
  over a card carrying none. The three Java lines are on the card, in monospace,
  unaltered — a program is not set as maths.
- **A stop retyped between revisions kept its old board.** Stop 53 went HOLDOUT
  to VERIFY and arrived carrying both, still declaring HOLDOUT.
- **Seventy-five worked examples were read as none** — the heading is
  `### Optional worked examples` and the content is a numbered list rather than
  YAML. Both read now, and a one-part example is printed as itself rather than
  under a "Problem" heading.
- **The four-bar table, the fifteen post-mission screens and the opening card**
  were all read as absent: blank lines between table rows, a `## J.` prefix on a
  heading, and `## Opening card` where the others write `### Opening sequence`.
- **The STRESS slider assumed the range gets worse downwards.** Yours gets worse
  upwards, so `feasible: 1 / 3 / 4` read as "everyone survives everything". The
  panel now reads which end is the hard one.
- **Aster Station's own leads, rooms and place copy.** The six areas were still
  led by Ice Core's drill engineer and chronology lead, which crashed every
  room-answered question as it opened, and the rooms were still described as a
  drill trench and a gas line.
- **No warm-up runs.** The bible says so outright; the engine was scheduling one
  before Mission 1 and three more on days 4, 8 and 13. Gone, and the campaign
  now declares it rather than relying on a side effect.

## Still open from earlier rounds

- **The Runway Door** answer is in and being built.
- **The mission cards read at grade 9.3 against a 6.5 ceiling** (16 of 16 over).
  That is the accessibility pass and it is a whole round of its own — worth
  doing after the items above, not instead of them.
