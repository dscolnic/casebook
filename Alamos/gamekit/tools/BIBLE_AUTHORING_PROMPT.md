# Write a campaign bible in this exact format

You are writing a Campaign Implementation Bible for First Person Learning. It
becomes a playable game, and the implementation is **not allowed to write
player-facing prose** — so every word a player reads has to come from you, in a
shape a parser can lift without guessing.

**The format is not a preference. It is a contract.** Eight bibles arrived in
three different house styles and the difference cost more than any single defect
in them. Follow the skeleton below literally: the same headings, the same bold
labels including the long ones, one label per line, a blank line between fields.

Then check your work: every rule here is measured by a linter, and the fully
worked Mission 1 at the end of this document passes it with zero findings. Copy
its shape.

---

## Part A — the rules, with numbers

### Labels

Use these exact strings. Do not shorten them, do not invent synonyms, do not
combine two fields into one label.

    **Format/placement:**
    **Metadata:**            Concept; Keystone; Area; Learning role; Difficulty; Story role
    **Call - exact player copy:**
    **Stop reason - exact player copy:**
    **Question card story setup - exact player copy:**
    **Question card story-science connection - exact player copy:**
    **Question card prompt - exact player copy:**
    **Choices:**
    **Complete format-specific interaction block:**
    **Correct result:**
    **Answer text:**
    **Why:**
    **Wrong-path feedback:**
    **State/output:**

Never: `**Setup:**`, `**Reason:**`, `**Connection:**`, `**Prompt:**`,
`**Prompt/data:**`, `**answerText:**`, `**Result:**`, `**Result/answerText:**`,
`**Mechanism:**`, `**Correct mechanism:**`, `**Answer text and mechanism:**`,
`**Why alternatives fail:**`, `**Feedback:**`, `**Payload:**`, `**State:**`.

### Structure

- **One bold label per line.** Never two on the same line.
- **A blank line between fields.**
- **Stop headings use a plain hyphen:** `## Stop 12 - Title`. Not an em dash.
- **Metadata is labelled**, never six bare values in a fixed order.
- **Stop numbers run across the campaign.** Mission 5 owns Stops 17-20, and its
  beats wait on "Stops 17 and 18" — not "Stops 1 and 2".
- **15 missions, 4 stops each, 60 stops**, numbered 1 to 60 without gaps.
- **Declare the objects your places contain, in section 3.** New objects are
  expected: the bible is the design source, and a stop answered at a fit-board
  gets a fit-board built. A fixture is a table row — place, id, kind (`vessel` /
  `rack` / `bench` / `board`), and the caption a player reads on it, which is
  player-facing copy and so has to be written here.
- **A fixture is a thing in a room, not one row per stop.** It exists whether or
  not a question is being asked at it, and **several stops can be asked at the
  same one** — Red Sand's carbon ledger answers four stops across fifteen
  missions, which is what makes Plant Control somewhere the player knows. Expect
  three to six objects per place, never `s01-…`, `s02-…` named after the stops.
- **`Area:` names one of the PLACES declared in section 3** — the place that owns
  the lesson, which is not always where the stop is asked. A Catalyst Bay
  question asked at the Atmosphere Intake reads `Area: Catalyst Bay`, and the
  player is still sent to the intake. It is a place and never a subject heading:
  the engine buckets the curriculum by place, and there is nowhere for "Work and
  Energy" to go. The subject is what `Keystone:` is for. Mark in section 3 which
  places host teaching and which are only passed through.
- **Every beat states what fires it**, in one of exactly three ways: `On arrival
  at <PLACE>`, `After Stop N` / `After Stops N and M`, or `At mission end`. There
  is no travel event — a beat that fires when the player reaches a new room is an
  arrival beat at that room, however the fiction describes the journey.
- **A person stop names one person** from the character bible. "The assembled
  crew" is not somebody the player can walk up to.
- **`Answer text` must not repeat `Correct result`**, and **`Wrong-path
  feedback` gives one rebuttal per wrong option**, numbered to match.

### The measured limits

| What | Limit |
| --- | --- |
| Campaign opening card | 5 sentences maximum |
| Briefing card body | 4 sentences, sentence four opens "By the end of the mission" |
| Question card story setup | **exactly two sentences** |
| Mission outcome | begins with the plain text `Mission decision:`, and reads at **grade 6.5 or below** |
| Quick concept review | bullets, the last one labelled `**Mission takeaway:**` |
| CHOICE | 4 options as a numbered list, exactly one marked `**(correct)**`, one rebuttal each |
| Equation block | 4 lines: Equation, What it is for, Symbols (every letter), Why this campaign needs it |
| Glossary entry | one full sentence, using no undefined technical word |

There is deliberately no word count on any of these. What matters is the reading:
a setup written as one long sentence measures grade 14-18 whatever its length,
and two short sentences fix that. A fifth-grade reader must be able to follow the
situation even when the reasoning is AP-level.

### Operated formats need their board written out

Only **CHOICE**, **BALLPARK** and **SEQUENCE** build from the shared fields.
Every other format needs `**Complete format-specific interaction block:**`
carrying the board's logic, its numbers and its correct answer. Write it in your
own field names — converting to the engine's schema is the implementation's job.
What cannot be done is invent a station, an item or a decoy that is not there. A
stop with a format name and no board is held back, not approximated.

    DERIVE     a start line; a goal stated AS A FORM ("dQ/dt in terms of dH/dt"),
               never as the answer; >=2 steps, and PER STEP: what that line is
               doing, >=3 candidate lines, which one is right, a reason on EVERY
               wrong one, and >=1 wrong one that is not obviously wrong. Name the
               licensing rule for all three candidates or for none - a rule on the
               correct line only answers the step by elimination. The right line
               must not be the longest one on the panel.
               A list of correct lines with one decoy for the whole derivation is
               NOT a board. This is the single biggest gap in the current bibles.
    PROBE      >=4 stations, each with a reading AND an expected value; which
               station breaks the pattern. No station note may state the cause.
    ALLOCATE   a pool; >=4 costed items; >=3 questions, each naming the items that
               answer it; >=1 required and >=1 not; all items together costing
               MORE than the pool. An item is protected or required, never both.
    VALUE      a budget and >=4 costed options on different axes (name the axis on
               each), totalling over budget; what buying each one reveals
    CONTROL    >=3 candidates, a numeric baseline, a response given as the SIGNED
               CHANGE, a noise band the right answer clears by 3x. One variable,
               not an interaction between two.
    VERIFY     ONE quantity; the range the prediction is dialled on (min, max,
               step); what the measurement finds; the tolerance as a fraction of
               it. A truth of zero cannot be graded. Two quantities is two stops.
    BALANCE    >=3 countable streams with numeric values, a numeric total, and >=1
               HIDDEN stream. The visible rows alone must NOT close on the total -
               the missing term is the finding.
    TRACE      >=4 labelled channels, EACH WITH ITS CURRENT READING in units; a
               named shared upstream source; >=1 independent channel
    ATTEST     >=4 signed claims, EACH WITH AN EVIDENCE LINE saying what a check
               would actually turn up; a verification limit below the claim count;
               >=1 critical claim unbacked and >=1 critical claim backed
    DIAGNOSIS  a headline; the readings LISTED with zone and status (not described
               by count); >=4 candidates; one keyed diagnosis
    CHAIN      >=4 transfers with unique ids, the quantity each carries and its
               reading; <=2 decoys, each still carrying something; the GOVERNING
               LINK'S ID - one of the transfers, not an equation; a distractor
    STRESS     >=3 candidates x >=2 criteria with A NUMERIC SCORE IN EVERY CELL;
               one assumption with min, max, step and a nominal inside it; a
               feasibility threshold per candidate; which criterion the nominal
               makes look best. Exactly one candidate survives the whole range and
               it is NOT the one that wins at the nominal. Booleans are not scores.
    RESIDUAL   >=2 fits, each with an RMS and >=5 residuals carrying x, y and
               value. The fit to accept must NOT be the lowest-RMS one; the
               lowest-RMS one is the patterned one. The format exists because the
               best number is the wrong answer.
    TRIGGER    ONE rule on ONE quantity; a scale with min and max; <=4 anchors,
               each SAYING WHAT A READING THERE MEANS; a lead time and a firing
               window; and a STREAM OF >=3 UPDATES, each with a time, a value and
               the hours still left. A four-stage ladder is a condition table.
    HOLDOUT    a threshold axis; TWO CURVES OF >=5 POINTS - calibration and held
               out - each point an (at, value); a pass score the best calibration
               position FAILS on the held-out curve
    SWEEP      an axis; >=4 numeric response points per series; a numeric target
               ON the axis and a tolerance; a starting position outside it.
               A boundary sweep needs >=2 series. Booleans are not responses and
               "the whole axis" is not a target.
    CLOUD      bounds; a centre and a spread; the fraction that must finish inside;
               >=2 actions, EACH shifting or narrowing by a stated amount, at least
               one of them narrowing. Shifting alone must NOT be enough.
    PROPAGATE  >=3 inputs, each with a value, a fractional width and an exponent;
               >=2 buyable measurements naming an input, each with a price; a
               budget and its unit. The dominant term must NOT be the one with the
               biggest exponent - that is the whole point.
    TRIANGULATE >=3 stations with x, y and a distance ring; a truth position in the
               same plane; a tolerance. Bearings without coordinates cannot be drawn.
    INJECT     a population size; >=3 configurations each with a detection count
               AND a separate metric; what never comes back. The configuration with
               the most detections must NOT be the best on the metric.
    BELT       two named bins; >=24 items, >=8 per bin, neither over 65%; every
               item name three words or fewer
    HOLD       a quantity, the control that moves it, a target and a band, a run of
               20-120 s, how far the control can push, and >=1 disturbance with a
               time and a signed size
    LOB        2-5 marks in increasing distance, each with a distance and a radius
    SEQUENCE   ONE order using every card exactly once. Two parallel orders is two
               stops.
    BALLPARK   ONE target and ONE relationship; tiles whose labels and values agree
               number for number; a tolerance as an ABSOLUTE BAND in the answer's
               units, not a percentage. Every constant the calculation divides by is
               a tile. Three targets on one board is three stops.
    PROTOCOL   both columns NAMED AND ENUMERATED, and a mapping covering every row
    STACK      suspended - do not use it

### The two rules worth more than the rest

**The verdict is the teaching.** `**Answer text:**` says what a right answer was.
`**Why:**` says why, in terms of mechanism. `**Wrong-path feedback:**` names what
each wrong option got wrong. Three different jobs. A stop that folds them
together, or drops the middle one, is a stop a student can pass without
understanding anything.

**Each setup after Stop 1 names what the previous stop established** — "With the
samples labelled correctly...", "Because a deleted formula could create a false
shortage...". Four independent situations that share a topic is the failure mode.

---

## Part B — the document skeleton

Write these sections in this order. Front matter once, then fifteen missions.

    # <TITLE>
    ## <Course> Campaign Implementation Bible
    ## 1. One-page implementation brief
    ### Non-negotiable engine rules
    ## 2. Campaign promise, clock, and player experience
    ### Opening sequence - no movie required, maximum five sentences
    ### Concrete stakes
    ### Three major reversals
    ### Four campaign metrics and recovery economy
    ## 3. World and location plan
    ### Location escalation
    ## 4. Character bible
    ### <Name> - <their job>          (one per major character, then "Minor voices")
    ## 5. Character direction and dialogue rules
    ## 6. <Subject> spine and recurring concepts
    ## 7. Clue ledger
    ## 8. Mission content contract

    # Mission 1 - <Title>            (then Missions 2-15, same shape)
    ### Worth knowing first - exact player copy
    #### Glossary terms
    #### Primer concepts
    #### Equations first needed today
    ## Main story happening - designer summary
    ## Player-facing beat script - dialogue bubbles and world changes
    ## Location plan
    ## Characters and dramatic beat
    ## Key concepts, explained here
    ## Stop 1 - <Title>              (four stops per mission)
    ## Mission outcome
    ### Post-mission metric screen - exact player copy
    ## Quick concept review

---

## Part C — one worked mission, which passes the linter with zero findings

Everything below is the format. Copy it exactly and change only the content.
Two stops are shown — one plain (CHOICE) and one operated (DERIVE, with its
board). A real mission has four.

## 3. World and location plan

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Plant Control | yes | `sample-tray` | bench | Yesterday's samples, and four sealed cards beside them. |
| Plant Control | yes | `conv-board` | board | Kilograms on the left, molecules on the right, and nothing joining them. |
| Atmosphere Intake | no | `log-desk` | bench | A full shift of capture, logged by hand because the feed dropped out. |

### Opening sequence - no movie required, maximum five sentences

The plant is behind. You are the new lead. Find out why. Fix it before the window shuts.

# Mission 1 - The Shortfall

**Header:** 15 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE SHORTFALL

**Go now:** Go to Plant Control and meet Ada Vance, the shift lead, at the carbon ledger.

**Card body:** The plant is short of fuel and nobody knows where it went. The crew blames a leak, but sealing valves at random would waste a shift. At Plant Control, sort the samples and add up the carbon. By the end of the mission, decide whether a leak explains the shortage.

**Objective:** Decide whether a leak explains the shortage.

### Worth knowing first - exact player copy

#### Glossary terms

Atom: the smallest piece of one kind of matter that keeps that identity. Counting atoms shows whether matter has gone.

Mole: a fixed count of particles, the same count for every substance. One mole contains 6.022 x 10^23 particles.

#### Primer concepts

- Atoms are not made or destroyed by a reaction.
- A mass shortage is not automatically a leak; first ask whether the count closes.

#### Equations first needed today

**Equation:** moles = grams / molar mass
**What it is for:** turning a mass on a scale into a count of particles
**Symbols:** grams is the measured mass; molar mass is the grams in one mole.
**Why this campaign needs it:** The scale reports mass and the reactor model counts particles, so every figure in the plant is one of those two steps.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Plant Control \| automatic when the player enters**

**World state:** The wall board lights up and two technicians reach for the valve controls.

**Panel/HUD text:** CARBON LEDGER: OPEN

**Dialogue bubbles -** Vance: "Those valves stay shut until we know whether anything is actually missing. Start with the ledger."

**Unlocks:** Stop 1.

**Beat 2 - After Stops 1 and 2 \| conversion board \| automatic transition**

**World state:** The sample labels sort themselves into three columns and the scale reading connects to a molecule count.

**Panel/HUD text:** MASS -> MOLES -> MOLECULES

**Dialogue bubbles -** Vance: "Now the scale and the model are speaking the same language. Open the ledger."

**Unlocks:** Stop 3.

## Stop 1 - Sorting the tray

**Format/placement:** CHOICE, asked at Ada Vance beside `sample-tray`.

**Metadata:** Concept: particles; Keystone: particles and the mole; Area: Plant Control; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Ada Vance, at the sample tray in Plant Control.

**Stop reason - exact player copy:** The ledger cannot be read until the samples are sorted.

**Question card story setup - exact player copy:** Before the plant can compare its records, sort the four sample symbols so the ledger counts them correctly. This gives every one of the later calculations a trustworthy place to start from.

**Question card story-science connection - exact player copy:** Correct labels stop the plant counting unlike things as the same.

**Question card prompt - exact player copy:** Which sorting is correct?

**Choices:**

1.  Ar is an atom and CH4 is a molecule. **(correct)**

2.  Both are molecules.

3.  Both are atoms.

4.  Neither is either.

**Correct result:** Choice 1.

**Answer text:** Ar is an atom and CH4 is a molecule.

**Why:** Ar is one neutral atom. CH4 is several atoms bonded together with no net charge, which is what makes it a molecule rather than an atom.

**Wrong-path feedback:** (2) A formula can name a single atom. (3) CH4 holds more than one atom. (4) Both are particles, and particle is the umbrella word.

**State/output:** Unlock the conversion board.

## Stop 2 - Rebuild the conversion

**Format/placement:** DERIVE, at `conv-board`.

**Metadata:** Concept: dimensional analysis; Keystone: particles and the mole; Area: Plant Control; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the conversion board, in Plant Control.

**Stop reason - exact player copy:** A deleted conversion could create the shortage the crew thinks it sees.

**Question card story setup - exact player copy:** With the samples sorted correctly, rebuild the whole mass-to-molecules conversion before anyone trusts yesterday's estimate. A complete unit path will show whether the shortage is real or only an arithmetic hole.

**Question card story-science connection - exact player copy:** A broken unit chain invents a shortfall and sends technicians after a leak that was never there.

**Question card prompt - exact player copy:** Build and license each line to convert 1.60 x 10^3 kg of methane into molecules; submit one number.

**Complete format-specific interaction block:** `derive: {goal:"molecules of CH4", givens:["1.60 x 10^3 kg CH4","16.04 g/mol","6.022 x 10^23 /mol"], lines:[{expressions:["1.60 x 10^6 g","1.60 x 10^3 g"],correct:"1.60 x 10^6 g",rules:["kilograms to grams","grams to kilograms"],correct_rule:"kilograms to grams"},{expressions:["9.98 x 10^4 mol","2.57 x 10^7 mol"],correct:"9.98 x 10^4 mol",rules:["divide by molar mass","multiply by molar mass"],correct_rule:"divide by molar mass"},{expressions:["6.01 x 10^28 molecules","1.66 x 10^-19 molecules"],correct:"6.01 x 10^28 molecules",rules:["multiply by Avogadro's number","divide by Avogadro's number"],correct_rule:"multiply by Avogadro's number"}], decoys:["multiply mass by Avogadro's number directly"], answerText:"About 6.01 x 10^28 methane molecules."}`

**Correct result:** `6.01 x 10^28 molecules`, tolerance 6%.

**Answer text:** The shortfall stands for about 6.01 x 10^28 methane molecules.

**Why:** Kilograms have to become grams before they can cancel against grams per mole. Dividing by molar mass leaves moles, and multiplying by Avogadro's number leaves molecules; the unit trail is also the error detector.

**Wrong-path feedback:** Multiplying by molar mass inverts the step and leaves grams squared per mole. Stopping at 9.98 x 10^4 reports moles, not molecules. Multiplying mass by Avogadro's number skips molar mass entirely.

**State/output:** Set conversion_rebuilt; the carbon ledger becomes interactable.

## Mission outcome

Mission decision: A leak does not explain the gap. The new count finds the carbon. Work on the valves stops. The next test looks at the air.

### Post-mission metric screen - exact player copy

**Header:** MISSION 1 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 06:00

**Story event:** A shift is spent rebuilding the ledger.

**Automatic bar change:** Methane -2 | Oxygen 0 | Power -2 | Integrity +4

## Quick concept review

- Atom, molecule and ion describe different kinds of particle.

- Follow the units through every conversion.

- **Mission takeaway:** A closed ledger weakens the leak story; it does not say what the real cause is.

---

## What to hand back

The complete bible as one Markdown document: front matter, then fifteen
missions, sixty stops. Do not summarise and do not hand back an outline.
