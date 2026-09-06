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
    **Metadata:**
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

### The measured limits

| What | Limit |
| --- | --- |
| Campaign opening card | 5 sentences maximum |
| Briefing card body | 4 sentences, 30-70 words, sentence four opens "By the end of the mission" |
| Question card story setup | **exactly two sentences, 30-45 words total** |
| Mission outcome | begins with the plain text `Mission decision:`, and reads at **grade 6.5 or below** |
| Quick concept review | bullets, the last one labelled `**Mission takeaway:**` |
| CHOICE | 4 options as a numbered list, exactly one marked `**(correct)**`, one rebuttal each |
| Equation block | 4 lines: Equation, What it is for, Symbols (every letter), Why this campaign needs it |
| Glossary entry | one full sentence, using no undefined technical word |

Two of these fight each other and the resolution matters: a setup written as one
sentence carrying 30 words measures grade 14-18 and fails the reading gate. Two
short sentences satisfy both the word count and the harder rule — a fifth-grade
reader must follow the situation even when the reasoning is AP-level.

### Operated formats need their board written out

Only **CHOICE**, **BALLPARK** and **SEQUENCE** build from the shared fields.
Every other format needs `**Complete format-specific interaction block:**`
carrying the board's logic, its numbers and its correct answer. Write it in your
own field names — converting to the engine's schema is the implementation's job.
What cannot be done is invent a station, an item or a decoy that is not there. A
stop with a format name and no board is held back, not approximated.

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

**Beat 1 - Arrival \| Plant Control \| automatic when the player enters**

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

**Format/placement:** CHOICE, asked at Ada Vance beside the sample tray.

**Metadata:** Concept: particles; Keystone: particles and the mole; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

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

**Format/placement:** DERIVE, at the conversion board.

**Metadata:** Concept: dimensional analysis; Keystone: particles and the mole; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

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
