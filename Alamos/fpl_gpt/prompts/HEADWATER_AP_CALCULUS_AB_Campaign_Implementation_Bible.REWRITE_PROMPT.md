# Rewrite this campaign bible into the buildable house style

You wrote this bible. It is being turned into a playable game, and the
implementation is not allowed to rewrite player-facing prose — so anything the
game needs has to be in the bible, in one predictable shape. Rewrite the whole
document to the rules below. Keep the story, the science, the cast and the
mission structure exactly as they are. Change the labels, the shapes and the
specific defects listed at the end.

## 1. Use these field labels exactly, one per line, blank line between fields

Per stop, in this order:

    ## Stop <N> - <Title>

    **Format/placement:** <FORMAT>, asked at <person or fixture>.

    **Metadata:** Concept: <x>; Keystone: <y>; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

    **Stop reason - exact player copy:** <one line: why this, now>

    **Question card story setup - exact player copy:** <exactly two sentences>

    **Question card story-science connection - exact player copy:** <one sentence>

    **Question card prompt - exact player copy:** <the task>

    **Choices:**

    1.  <option> **(correct)**

    2.  <option>

    3.  <option>

    4.  <option>

    **Correct result:** <the keyed result>

    **Answer text:** <one sentence saying what a right answer was>

    **Why:** <the mechanism — this is the teaching>

    **Wrong-path feedback:** (2) … (3) … (4) — one rebuttal per wrong option

    **State/output:** <flags set, things unlocked>

Do NOT use any of these instead. Each one had to be special-cased:

    **Setup:**  **Story setup:**              -> **Question card story setup - exact player copy:**
    **Reason:**  **Stop reason:**             -> **Stop reason - exact player copy:**
    **Connection:**  **Story-science connection:** -> **Question card story-science connection - exact player copy:**
    **Prompt:**  **Prompt/data:**             -> **Question card prompt - exact player copy:**
    **answerText:**  **Result/answerText:**   -> **Answer text:**
    **Mechanism:**  **Correct mechanism:**    -> **Why:**
    **Answer text and mechanism:**            -> split into **Answer text:** and **Why:**
    **Why alternatives fail:**  **Feedback:** -> **Wrong-path feedback:**
    **Payload:**                              -> **Complete format-specific interaction block:**
    **Result:**  **Lock/result:**             -> **Correct result:**
    **State:**                                -> **State/output:**

## 2. Four structural rules

- ONE label per line. Never put two or more bold labels on the same line.
- Stop headings use a plain hyphen: `## Stop 12 - Title`. Not an em dash.
- Metadata is labelled (`Concept: x; Keystone: y; …`), never six bare
  semicolon-separated values in a fixed order.
- Stop numbers run across the whole campaign: mission 5 owns Stops 17-20, and
  its beats wait on "Stops 17 and 18", not "Stops 1 and 2".

## 3. The numbers. All of these are measured, not judged

- **Question card story setup:** exactly two sentences. There is no word count —
  but one long sentence carrying the whole setup measures grade 14-18 and fails
  the reading gate, however many words it has.
- **Mission outcome:** must begin with the plain text `Mission decision:` at the
  very start of the section — not as a bold label, and not after a pre-card beat.
  It must read at **grade 6.5 or below** (Flesch-Kincaid). Short, plain sentences.
- **Briefing card body:** four sentences, and sentence four begins
  "By the end of the mission".
- **Campaign opening card:** five sentences maximum.
- **Quick concept review:** bullets, and the last one is labelled
  `**Mission takeaway:**`. That line is what the game carries into the next shift.
- **CHOICE:** exactly four options as a NUMBERED LIST, exactly one marked
  `**(correct)**`, and one rebuttal per wrong option. Never a single
  slash-separated line — options containing "/" make that unreadable.
- **Every equation block:** four lines — `**Equation:**`, `**What it is for:**`,
  `**Symbols:**` (naming every letter), `**Why this campaign needs it:**`.
- **Every glossary entry:** one full sentence, and no undefined technical word
  inside another definition.

## 4. Operated formats need their board written out

Only CHOICE, BALLPARK and SEQUENCE build from the shared fields. Every other
format needs `**Complete format-specific interaction block:**` carrying the
board's logic, its numbers and its correct answer. Write it in your own field
names — converting to the engine's schema is the implementation's job. What
cannot be done is invent a station, an item or a decoy that is not there. A stop
with a format name and no board is held back, not approximated.

    DERIVE     candidate expression lines, the rule licensing each, the keyed order, decoys
    PROBE      >=4 stations, each with a reading AND an expected value
    ALLOCATE   a pool; >=4 costed items; >=3 questions; >=1 required and >=1 not;
               all items together costing MORE than the pool
    VALUE      a budget and >=4 costed options on different axes, totalling over budget
    CONTROL    >=3 candidates, a numeric baseline, a non-zero response, a noise band
    VERIFY     a numeric prediction locked before the action, then the action, then the measurement
    BALANCE    the streams, at least one of which must NOT count
    TRACE      >=4 labelled channels, a named shared upstream source, >=1 independent channel
    ATTEST     >=4 signed claims, a verification limit, >=1 critical claim unbacked
    DIAGNOSIS  a headline, mixed quiet and alarm readings, candidates, one keyed diagnosis
    CHAIN      >=4 transfers with unique ids and the quantity each carries, <=2 decoys
    CLOUD / RESIDUAL / STRESS / TRIGGER / HOLDOUT / SWEEP
               the settings or points available, what each reads, the keyed conclusion
    STACK      suspended — do not use it

## 5. The two rules worth more than the rest

**The verdict is the teaching.** `**Answer text:**` says what a right answer was.
`**Why:**` says why, in terms of mechanism. `**Wrong-path feedback:**` names what
each wrong option got wrong. Three different jobs. A stop that folds them
together, or drops the middle one, is a stop a student can pass without
understanding anything.

**A format name plus prose is not a playable board.** See section 4.

---

## 6. What THIS bible specifically needs fixed

Measured on 2026-09-05 by the project's own linter. Each line is a rule
above, a count, and the missions and stops it fires on. Fix all of them.

```
✗   1 ×  N of N are named after a stop rather than an object (s01-cancel-the-false-zero, s02-rationalize-the-float-transform, s03-check-the-indeterminate-rate…) — a fixture is a thing standing in a room, and more than one stop should be able to be asked at it
          fixtures

15 mission(s), 60 stop(s) read — 1 blocking, 2 worth a look.
```

## 7. What to hand back

The complete rewritten bible as one Markdown document, same missions, same
stops, same story. Do not summarise, do not hand back a diff, and do not drop
sections you did not change. If a stop needs a board you cannot invent from what
is already written, write the board from the science of that stop rather than
leaving the field out — an operated stop without one cannot be built at all.
