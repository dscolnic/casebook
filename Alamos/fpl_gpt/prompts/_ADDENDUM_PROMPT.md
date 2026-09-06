# Six things the bible has to say that it currently does not

Building a campaign from your bible reached the point where the implementation
had to start inventing, and it is not allowed to. Everything a player reads, and
everything that decides where they go and what owns a lesson, has to come from
you. Below is every place the build had to make a decision, what was decided, and
what to add so it does not happen again.

Add these to the bible you have. They are all small, and none of them changes the
story.

---

## 1. `Area:` names a PLACE, not a subject

**This is a correction to the previous round, and the wording was mine.** The
last version of this document said "area of study — the campaign's subject
buckets", and then gave Red Sand's *places* as the example. Both readings were
fair. Two bibles read it as a place and six read it as a subject — Motion and
Measurement, Work and Energy, Forces and Equilibrium — and named nine of those
against a park with seven rides.

**The engine buckets a campaign's curriculum by PLACE.** A campaign has a handful
of places where its teaching happens — Plant Control, the Reactor Hall, the
Coaster Station, the Drop Tower — and every lesson belongs to one of them. There
is nowhere for a subject heading to go.

**So `Area:` must name one of the places you declare in section 3**, spelled the
same way:

    **Metadata:** Concept: kinetic molecular theory; Keystone: gas behavior and
    partial pressure; Area: Reactor Hall; Learning role: INTRODUCE;
    Difficulty: L1; Story role: character.

**It is still not the same as where the stop is asked.** A Catalyst Bay question
asked at the Atmosphere Intake reads `Area: Catalyst Bay` and the player is still
sent to the intake — the subject lives in the Catalyst Bay, the compressors are
at the intake. In Red Sand 36 of 60 stops have them the same and 24 differ, so it
is worth stating on every stop rather than assumed.

**Mark which places are areas.** In section 3's table, say which places host
teaching and which are rooms the campaign only passes through:

    | Place | Area of study? | Fixture | Kind | What it is |
    | --- | --- | --- | --- | --- |
    | Reactor Hall | yes | `skid` | vessel | The reactor loop skid, and the gauge nobody trusts. |
    | Atmosphere Intake | no | `log-desk` | bench | A full shift of capture, logged by hand. |

**The subject is not lost.** That is what `Keystone:` is for, and yours already
recur properly across missions — Red Sand's evidence-independence keystone runs
through six of them. Keep the keystones exactly as they are.

## 2. A fixture is an object in a room, not one row per stop

**Name whatever the stop needs, including objects that do not exist yet.** The
bible is the design source: if a stop is answered at a fit-board, a fit-board
gets built. Do not repoint a stop at some object that happens to already be in
the room — that is the design being decided by what was convenient.

**What happened.** Asked to declare every fixture, five of the eight bibles
minted one per stop, named after the stop — `s01-name-the-data`,
`s02-describe-before-judging`, `s03-...` — each captioned "The name the data
board presents the evidence and controls for this stop." Sixty objects in a
building, every one touched once, every caption the same sentence with a
different noun in it. That is the stop list with furniture drawn round it.

**What a fixture actually is.** A thing standing in a room that a player walks up
to. It exists whether or not a question is being asked at it, it has a name
somebody in the world would use, and **several stops can be asked at the same
one** — Red Sand's carbon ledger is where four different stops are answered
across fifteen missions, which is what makes Plant Control a place the player
knows rather than a backdrop. Three of the eight already do this:
`chronology-wall`, `scopeboard`, `gondola-shell`, `hub-schedule`.

**What to add.** In section 3, a table of the objects your places contain:

    | Place | Area of study? | Fixture | Kind | What it is |
    | --- | --- | --- | --- | --- |
    | Statistical Analysis | yes | `analysis-bench` | bench | Two laptops, a locked randomisation envelope, and the log nobody has countersigned. |
    | Statistical Analysis | yes | `interim-board` | board | Every look taken so far, and the alpha each one spent. |

- **Kind** is one of `vessel`, `rack`, `bench`, `board`. A vessel is something
  you stand at, a rack something you pull from, a bench something you work on, a
  board something you read.
- **What it is** is the caption a player reads on the object — what is on it,
  in that room, in this campaign's voice. Not what the stop asks.
- Expect roughly **three to six objects per place**, not one per question, and
  expect stops to share them.
- Then every `**Format/placement:**` names one of those ids.

## 3. Write the call line for every stop

**What happened.** The plan card lists the day's calls — *"Go to the conversion
board, in Plant Control"*, *"Talk to Ingrid Sundqvist, on the compressor
platform"* — and that is the first player-facing sentence about a stop, read
before anything else. The bible writes a `**Go now:**` line for the mission and
nothing per stop, so the calls fell back to bare stop titles.

**What to add**, per stop:

    **Call - exact player copy:** Go to the conversion board, in Plant Control.

For a person stop it names the person and where they are standing: *"Talk to Dr.
Tomás Herrera, at the store scales in the Hydrogen Store."*

## 4. Say what fires every beat, in one of three ways

**What happened.** Beats headed `Travel trigger \| Plant Control to Tank Farm`,
`Battery Gallery \| automatic constraint reveal` and `Epilogue \| Ascent Pad`
have no equivalent in the game. There is no travel event; a beat fires when the
player **arrives somewhere**, when **a stop closes**, or at **mission end**.
Four beats were mapped by hand — travel became arrival at the destination, the
epilogue became mission end.

**What to add.** Every beat heading states exactly one of these:

    **Beat 1 - On arrival at Plant Control \| automatic**
    **Beat 3 - After Stops 2 and 3 \| conversion board \| automatic**
    **Beat 5 - At mission end \| Plant Control \| automatic**

A beat that fires when the player reaches a new room is an arrival beat at that
room, however the fiction describes the journey.

## 5. One named person per person stop

**What happened.** Stop 60 is `SCIENCETANK, asked at the assembled crew in Pad
Office`. A stop is answered by walking up to one person, so one had to be
chosen — the commander, because she is who commits.

**What to add.** Name the single person the player walks up to, from the
character bible. The rest of the crew can be in the scene and in the dialogue;
the stop belongs to one of them.

## 6. Two fields that must not repeat each other

**`**Answer text:**` must differ from `**Correct result:**`.** The correct
result is the grading truth — a value, a choice number, a tolerance. The answer
text is the sentence the verdict card prints. On **217 stops across seven
bibles** they are the same string, so the card shows the marking key where it
should say what a right answer was. Write the second as a sentence.

**`**Wrong-path feedback:**` must give one rebuttal per wrong option, as separate
items.** A single paragraph covering three wrong options has to be split by hand,
and splitting somebody else's prose is writing it. Number them to match:

    **Wrong-path feedback:** (2) A formula can name an atom, molecule or ion.
    (3) H+ is charged, while CH4 and CO2 have no net charge. (4) One written
    formula can contain several atoms.

---

## And one thing that is not a field

Four of the eight bibles write every beat as a single line of intent —
`**Beat 2 - After Stop 1:** Keep the new evidence visible and unlock Stop 2.` —
with no world change, no panel line and nobody speaking. There is nothing there
to build, and those missions play as four questions with nothing happening
between them. Per beat, the game needs: what changes in the world as one
sentence, the panel or HUD line, who speaks and what they say, and the waypoint
if the beat names the next destination.

---

## What to hand back

The complete bible as one Markdown document, with these six additions made
throughout — every stop carrying an Area and a Call line, every placement naming
a real fixture, every beat stating its trigger, every person stop naming one
person, and no stop repeating its correct result as its answer text. Same story,
same missions, same stops.
