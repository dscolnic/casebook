# Whiteout — round 2

v2.8 fixed almost everything from round 1. **The lint went 16 blocking → 1**: all
twelve VERIFY blocks now carry a range, a truth and a measurement, the double-keyed
CHOICE has one key, both Symbols lines name their symbols, and M1's outcome came
down under the reading ceiling.

The campaign is now scaffolded and the whole pipeline runs on it — 15 missions, 60
stops, 6 areas, 6 people, 60 of 60 boards converted. **It does not import yet**, and
what stops it is 57 findings in three shapes, all in the DERIVE stops and two
instruments.

---

## 1. The derivations have no starting line and no goal — 24 findings

Every DERIVE writes its steps and nothing around them:

```yaml
derive:
  steps:
    - id: cast
      prompt: "Choose the division that preserves the fraction."
      choices:
        - {line: "double fraction = (double) delivered / requested;", correct: true}
        - {line: "double fraction = (double) (delivered / requested);", correct: false, survives: true}
```

The panel draws a rail: line 0 is where the derivation begins, and a goal states
where it is going without printing where it ends up. Both are missing on all
twelve.

```yaml
derive:
  start: "int delivered = 83; int requested = 100;"     # the line it begins from
  goal:  "percent as a double, from int inputs"          # the form, not the answer
  steps: [...]
```

`start` matters more here than in the maths campaigns: a code trace begins from
**the declarations**, and without them the first step asks the player to choose a
transformation of something they have not been shown.

---

## 2. Every wrong line needs its own `why` — 27 findings

With two candidates a step is a coin flip, so the distractor has to be wrong in a
way that survives a glance — and the sentence saying *why* it is wrong is the only
teaching that step carries. They are marked `survives: true`, which is right, but
none carries a reason:

```yaml
choices:
  - {line: "double fraction = (double) delivered / requested;", correct: true}
  - {line: "double fraction = (double) (delivered / requested);", correct: false,
     survives: true,
     why: "The cast applies after the integer division has already thrown the
           fraction away — the parentheses decide which happens first."}
```

That example is the campaign's own best teaching point and it is currently unsaid.

---

## 3. TRACE and PROBE name a target that is not on their board — 6 findings

**M5 s3, M6 s1 and four others.** The board declares its resources or stations, and
then the target reads `undefined`:

```
✗ M5 stop 3: the trace target "undefined" is not one of its resources
✗ M5 stop 3: fewer than two channels depend on the trace target — with only one
             there is no common mode, and the agreement the stop is about never happens
```

A TRACE needs `target:` naming one of its own resources, and at least two channels
that depend on it — the whole point is that several readings agree because they
share a source. A PROBE needs `target:` naming one of its stations.

---

## 4. Fixed on our side since round 1 — no action

The build learned six things from this bible, all of them ours:

- **A stop's own interaction block is its board.** The other eight bibles answered
  handback after handback by adding §7 blocks beside their payload, so "board" and
  "payload" are two things in them. Whiteout was written after all of that and just
  puts one `**Format-specific interaction block:**` per stop in the game's own field
  names. Read as though §7 were mandatory that was sixty stops with no board.
- **A board is wrapped or it is not.** `verify:` and `derive:` name themselves; a
  CHOICE writes `question`, `code`, `choices`, `answer` at the top because those
  belong on the stop. Taking the first key either way keyed a CHOICE board to the
  text of its question.
- **VERIFY and DERIVE now have canonical converters** — `predictionRange` → the
  importer's `prediction`, and `{id, prompt, choices[line]}` → `{ask, answer,
  candidates[text]}`. Both are renames, not rewrites.
- **A YAML sequence at its key's own indent is still that key's block.** This one
  was a real bug in our writer, not a Whiteout thing: the fix stops a rebuilt stop
  keeping its old options below its new ones.
- **The roster reads a name-only heading** with `**Role:**` and `**Area
  ownership:**` beneath it, which is your shape and is more explicit than the
  eight's.
- **The concept spine is now the syllabus.** All 38 numbered concepts from §5, in
  your order and your words, are what every stop's `concept:` resolves against.

---

## 5. The place

Whiteout is built on Ice Core's Antarctic plateau, reshaped to Aster Station: six
working modules — **OPS, CODE, POWER, HAB, VEH, COMMS** — in a ring around the
spawn, with **Mess & Bunks**, the **Medical Bay** and the **Runway Door** as
landmarks carrying no graded stop, exactly as §3 specifies. All 33 declared
fixtures are the ids the stops resolve against, and all 60 placements resolved
from your own placement lines with none left to guess.

Two things it would help to hear on:

- **The Runway Door.** §3 says it "stays shut until final rescue readiness and the
  canary gate are satisfied". The engine can open a door on a campaign event —
  should it visibly open in Mission 15, and does the aircraft arrive on screen? An
  ending you walk out of is worth more than an ending card.
- **The code blocks.** A stop that shows three lines of Java and asks what
  `percent` holds is new to this repo and right for the course. The block carries
  it; nothing renders it yet. That is our work, and it is next.
