---
name: alamos-checks
description: Every Alamos dev check and report: npm run check and the 30+ gates behind it, npm run traps/drive/laps/shots/lessons, pieceDensity, cardLoad, readerProbe, and the browser reportAudit call. What each asserts and why it exists. Read before running, adding, or changing a gate in engine/dev.
---

## Checks — one command, several tools

```sh
cd gamekit
npm run check              # every registered theme, every check
npm run check hospital     # one of them
```

`themes.json` maps a theme name to its directory, so a bare name works even for the games living in
their own package directories. Behind `check`:

```sh
node engine/dev/validateContent.mjs <theme>   # content agrees with itself + the contract
node engine/dev/smokeCampaign.mjs  <theme>    # the engine can reach and grade every stop
node engine/dev/probeQuestions.mjs <theme>    # no question answerable without the science
node engine/dev/answerShape.mjs    <theme>    # the longest option is not the answer key
node engine/dev/checkVoice.mjs    <theme>    # cards brief the player, they do not perform
node engine/dev/placeStory.mjs    <theme>    # the landscape matches the story told on it
node engine/dev/boardAnswer.mjs    <theme>    # the estimate board grades the question the stop asks
node engine/dev/boardAnswer.mjs --selftest    # and a solution showing a later stage of its own working is not a defect
node engine/dev/deriveRules.mjs    <theme>    # the rule half of a DERIVE reaches the screen and can be answered
node engine/dev/deriveRules.mjs --selftest    # and a step whose candidates share a rule is counted, not failed
node engine/dev/numeralWords.mjs   <theme>    # no digit stands in for the word "one"
node engine/dev/numeralWords.mjs --selftest   # and a unit, a count, an ordinal label and a ratio keep their digits
node engine/dev/sceneCast.mjs      <theme>    # somebody is in the room where the question is asked
node engine/dev/sceneCast.mjs --selftest      # and a first name alone is not a match — "Ines" is in two rosters
node engine/dev/checkPassages.mjs <theme>    # talking to somebody teaches something
node engine/dev/passageDepth.mjs   <theme>    # and there is a passage there to teach it
node engine/dev/passageDepth.mjs --selftest   # and an abbreviation is not a full stop
node engine/dev/personStops.mjs    <theme>    # every mission person opens their question
node engine/dev/equationOrder.mjs  <theme>    # nothing is asked before the equation it is built out of
node engine/dev/conceptOrder.mjs   <theme>    # and nothing is claimed before the concept it is built out of
node engine/dev/conceptOrder.mjs --selftest   # and it can tell an earlier day from the same day
node engine/dev/dayCalls.mjs       <theme>    # no day over four calls, and no card served twice
node engine/dev/dayCalls.mjs --selftest       # and it can tell a review variant from a duplicate
node engine/dev/dayDebrief.mjs     <theme>    # the day closes on something earned, and somebody says it
node engine/dev/dayDebrief.mjs --selftest     # and it can tell a byline from a sentence
node engine/dev/placement.mjs      <theme>    # everything hung is on a wall, not in it or over a doorway
node engine/dev/vehicleKinds.mjs   <theme>    # an outdoor site can be got about in two different ways
node engine/dev/vehicleKinds.mjs --selftest   # and three trucks under three names are one kind, not three
node engine/dev/discoveryHistory.mjs <theme>  # a game that re-enacts real work credits it, and the player is not a real person
node engine/dev/discoveryHistory.mjs --selftest # and it reads the nesting the claims are actually under
node engine/dev/questionLoad.mjs   <theme>    # the questions are as small as the sentences (grade 8 and below)
node engine/dev/questionLoad.mjs --sweep      # every game: estimates that smush two equations together
node engine/dev/questionLoad.mjs --selftest   # and that gate can tell a hard campaign from an easy one
node engine/dev/worldFormats.mjs --selftest    # the six world-graded formats measure the place correctly
node engine/dev/fieldCoverage.mjs  <theme>    # the sentences the book wrote that no panel prints
node engine/dev/fieldCoverage.mjs --selftest  # and it knows which end of an alias the engine reads
node engine/dev/instrumentGoals.mjs <theme>   # the panel says what counts as done before it is done
node engine/dev/instrumentGoals.mjs --selftest # and it can tell a panel that says so from one that does not
node engine/dev/curriculumDelivery.mjs <theme> # every equation on the syllabus is computed, not just mentioned
node engine/dev/curriculumDelivery.mjs --selftest # and it can tell computing one from talking about it
node engine/dev/curriculumDelivery.mjs <theme> --snapshot before.json   # the conversion invariant:
node engine/dev/curriculumDelivery.mjs <theme> --against  before.json   # objective fixed, format variable
node engine/dev/checkStyles.mjs               # no game stylesheet re-declares the engine's
node engine/dev/readabilityParity.mjs         # the reading grade cannot tell 11.4 from "eleven point four"
node engine/dev/worldParity.mjs               # every group has somewhere to happen in the data
```

Reports that are not part of `check`, because they answer "is this good enough" rather than "is this
broken":

```sh
npm run traps                                 # break every instrument trap; all 72 must fire
npm run drive <theme>                         # drive every live panel in Chrome, right and wrong
npm run laps <theme>                          # take every warm-up run in the real game, morning by morning
node engine/dev/pieceDensity.mjs --all        # how furnished every room is, thinnest first
node engine/dev/syllabusEquations.mjs quantum # which equations a question computes, and when
npm run shots <theme>                         # a picture of every room, and a contact sheet
npm run lessons                               # harvest two real stops of every format, then
                                              # /engine/dev/lessons.html — answer them yourself
node engine/dev/cardLoad.mjs --all            # how much a player reads before they can act
node engine/dev/cardLoad.mjs <theme>          # the sweep's work list, heaviest card first
node engine/dev/cardLoad.mjs --selftest       # and it can tell a heavy card from a light one
node engine/dev/readerProbe.mjs --harvest     # hand every answerable stop to a weaker model, with the card and without
node engine/dev/readerProbe.mjs --report      # and see which cards it cannot follow
node engine/dev/readerProbe.mjs --selftest    # and the prompts carry no verdict, no rebuttal, no worked solution
```

`smokeCampaign` exists because a theme once had entirely valid content and two thirds of its
campaign unreachable; `validateContent` cannot see that.

`placement` is the one that fires rays. Four rounds of play-testing went on the same defect — boards
floating in doorways, boards hung *inside* the wall so only the dark edge shows, a mural running past
the end of the wall — and every check passed each time, because they asked whether a *point* had a
wall behind it and a notice board is a metre wide. This asks through the whole face of a fitting,
from both sides. Anything on a wall goes up through `markWallMounted` in `interiorKit`, and anything
the walls are made of through `markStructure`, because guessing which meshes are walls from their
proportions is how a checker starts lying. It cannot see a hand-built world, and it cannot see a
fitting that never said it was one. Wall furniture is placed *proud* of the line a caller passes,
never on it: a wall is raised centred on that line, so a 0.18 m wall on x = 2.1 shows its face at
2.01 and anything hung at 2.07 is inside the plaster. `furnishRoom` takes `wallThickness` and does
that arithmetic once.

`drive` answers what a checker cannot judge about an *interactive* panel. The instruments can render,
print their question, expose a commit button and never reach the grade because one selector is wrong.
On its first run it found a TRACE whose resource container shared a class with its resource buttons —
a click bubbled to a handler reading `dataset.res` off a div, the selection silently became NaN, and
every right answer graded wrong.

`shots` runs vite, renders the game in headless Chrome through SwiftShader, drives the game's own
`teleport` to each viewpoint, and writes `shots/<theme>/index.html`: every room on one page, about
two minutes for fifty views. Views come from `--at x,y,z --yaw deg`, else `themes/<theme>/shots.js`,
else the theme's `plan.js`, else a turn on the spot at the spawn. A hand-built world should have a
`shots.js`; `themes/bring_them_home/shots.js` is the worked example, and that game has no other
automatic check on where anything is.

`lessons` answers "what does one of these actually feel like to answer", across all 35 formats.
`engine/dev/lessonGallery.mjs` reads every registered game, picks the best authored instance of each
format — the richest card, from a real game rather than from Meridian, senior rather than junior —
and writes `lessons.json`; `lessons.html` mounts one at a time, answerable and graded, with a tally.
**Every format is shown twice, the second card from a different campaign**, because one card cannot
separate the renderer from the book: a SEQUENCE ordered by time and one ordered by cost are the same
panel asking different questions. The pair must come from different *families*, not merely different
theme ids — a grade-6 edition is the senior book with shorter sentences, so ROUTE's pair was
deepwatch and deepwatch_ms until `editionBase` was folded into the choice. Where no other book
authors the format the second card comes from `instruments`; where there is no second stop at all
(TALLY) the page says so rather than inventing one — TRIANGULATE has a second stop now, in `qd_tectonics`. Six formats are authored nowhere:
BELT, TRIAL, HOLD, SPOT, STACK, LOB. **Nothing on that page renders or grades anything** —
`questionUI.mountStandalone` is one hook, so the card, panel, shuffle, grading, verdict figure and
reasoning are the engine's own code, and a panel broken there is broken in the game. The tempting
version is a harness with its own copy of eight renderers, which would pass while the game was
broken. What it lacks is the campaign half: no clock, no money, so no hint and no priced way out.
Three things it found on its first run: the verdict's CSS lived in `index.html` rather than the engine
sheet, the estimate's numeric spec was looked up from a key written out in five places (stamped once
on the active challenge now), and `themes/instruments` had been titled "Template" since scaffolding.

`pieceDensity` builds each place headless — `engine/dev/headless.mjs` stubs the canvas and renderer,
since three.js touches no GPU until something renders — and counts placed pieces per room against
floor area. It is how "the rooms feel empty" became a number: Quantum's rooms hold a median of 3
pieces where the engine's case rooms hold 9–15.

In the browser console, before judging how anything looks:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```
