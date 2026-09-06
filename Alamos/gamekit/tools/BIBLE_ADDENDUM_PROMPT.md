# Seven things the bible has to say that it currently does not

Building a campaign from your bible reached the point where the implementation
had to start inventing, and it is not allowed to. Everything a player reads, and
everything that decides where they go and what owns a lesson, has to come from
you. Below is every place the build had to make a decision, what was decided, and
what to add so it does not happen again.

Add these to the bible you have. The first six are small and none of them
changes the story. **The seventh is the big one** — it is why roughly half the
stops across the eight campaigns are currently held back and unplayable.

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

## 7. Operated boards need the numbers a board actually needs

**This is the largest gap by far.** Across the eight campaigns, **around half of
every stop that is not a CHOICE is held back** — the format is named, the science
is right, and the board still cannot be built because a field the panel is made
of is not there. Nothing here is a style note; each one is the difference between
a playable instrument and a paragraph.

The five that account for most of it:

**DERIVE — over seventy stops, on the campaigns whose derivations are the course.**
Every one of these currently lists the *correct* line per step and, at best, one
decoy for the whole derivation. That is a solution, not a board. The player is
shown one line at a time and picks the next one, so **per step** it needs:

- what that line is doing (one clause);
- **three or more candidate lines**, written out in full — `E_y = 3.0 - 1.5`
  is shorthand, and the panel prints exactly what you write;
- which one is right;
- **a reason on every wrong one** saying what it gets wrong — a distractor that
  is merely wrong teaches nothing, and the reason is the whole value of writing it;
- **at least one wrong line that is not obviously wrong** — a step whose every
  wrong branch dies immediately is passed by elimination rather than by
  differentiating.

Plus a start line and a goal stated **as a form** — *"dQ/dt in terms of dH/dt"* —
never as the answer. If you name the rule that licenses a line, name one for all
three candidates; a rule on the correct line only answers the step by elimination.

**ATTEST — the cheapest fix in the whole set.** The claims, the signatures, the
critical flags and the check budget are all correct. What is missing on every
board is **one line per claim saying what a verification would actually turn up**.
That is one sentence each, and it makes seventeen stops playable.

**STRESS.** A robustness board is a **grid**: three or more candidates down the
side, two or more criteria across the top, and **a number in every cell**. Also
needed: one assumption with a range and a nominal inside it, a feasibility line
per candidate, and which criterion the nominal makes look best. Booleans at a few
bias values are not scores. And the point of the format is that **the candidate
that survives the whole range is not the one that wins at the nominal** — if they
are the same candidate, there is nothing to teach.

**TRIGGER.** A trigger board is **one rule, on one quantity, watched as readings
arrive.** What is written instead is a condition table — four-stage ladders, nine
conditions on nine quantities, dual limits. It needs: the one quantity and its
scale, anchors that **say what a reading there means** rather than being bare
numbers, the lead time the rule has to buy, the firing window, and **a stream of
at least three timed updates, each with a reading and the hours still left**.
Without the feed there is nothing to watch and no moment to fire.

**RESIDUAL.** Two candidate fits, each with an RMS **and at least five residuals
carrying an x, a y and a value** — they are plotted in a field, so a bare list of
four numbers has nowhere to go. And the trap runs one way only: **the fit to
accept must not be the one with the lowest RMS**, and the lowest-RMS one is the
one with the pattern in it. Several boards currently have it backwards, which
makes "take the smallest number" the right answer.

The rest, in one line each — these appear less often but fail the same way:

    CLOUD       bounds, a centre, a spread, the fraction that must finish inside,
                and >=2 actions that shift or narrow by a stated amount, at least
                one of them narrowing. Shifting alone must not be enough.
    HOLDOUT     TWO CURVES OF >=5 POINTS over one threshold axis - calibration and
                held out - and a pass score the best calibration position fails.
                An acceptance window with one revealed measurement is not a holdout.
    BALANCE     >=3 countable streams with numbers, a total, and one HIDDEN stream.
                Three visible rows that already close is a subtraction, not a board.
    TRACE       every channel's CURRENT READING, in units. Ids and dependencies
                alone render an empty panel.
    PROBE       every station's reading AND what it was supposed to read, and which
                station breaks the pattern.
    SWEEP       numeric responses (not booleans) and a numeric target ON the axis.
    BALLPARK    ONE target per board and a tolerance as an absolute band, not a
                percentage. Three targets is three stops.
    VERIFY      ONE quantity, and the range the prediction is dialled on. A pair or
                a triple is two or three stops. A truth of zero cannot be graded.
    CHAIN       the governing LINK - one of your own transfers - not a governing
                relationship or an equation.
    ALLOCATE    one question the plan is allowed to forgo, and item costs that
                together exceed the pool.
    DIAGNOSIS   >=4 candidates, and the readings listed rather than counted.
    PROTOCOL    both columns named and enumerated, and a mapping covering every row.
    SEQUENCE    ONE order using every card once. Two parallel orders is two stops.
    BELT        >=24 items. Six is not a sorting belt.

Where a board genuinely cannot carry these — three quantities that must all be
predicted, an order that really does branch — **split it into two stops or change
the format**. Do not thin the science to fit; say what the stop is for and pick
the instrument that asks it.

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

The complete bible as one Markdown document, with these seven additions made
throughout — every stop carrying an Area and a Call line, every placement naming
a real fixture, every beat stating its trigger, every person stop naming one
person, no stop repeating its correct result as its answer text, and every
operated board carrying the numbers its panel is made of. Same story, same
missions, same stops.
