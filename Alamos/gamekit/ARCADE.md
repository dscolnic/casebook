# ARCADE.md — seven more formats, the fun ones

These are not a subsystem. They are seven more entries in `INSTRUMENTS`, in
`engine/core/instruments.js`, under the contract that file already states, reached
the way every other format is reached: a stop in `book.yml`, walked to, opened,
graded, handed off.

The only thing that distinguishes them is what they are *for*. The twenty
existing formats each render a move a scientist makes. These seven render a move
a **player** makes, and carry one bit of subject matter while doing it — a
category, an order, a direction, a unit. Sorting conductors from insulators
against a rising belt speed is not a laboratory procedure and never will be. It
is the stop a twelve-year-old replays.

That difference is a difference in *authoring*, not in code. Nothing below asks
for a second registry, a second contract, a second `ctx`, a second dev page or a
second checker, and the moment any of those appears this document has failed —
that is how the engine got forked three ways the first time.

---

## 1. Where the code goes

`engine/core/instruments.js`, in `INSTRUMENTS`, beside the other twenty.

That file is 3,090 lines and seven canvas games will not fit in it. When it stops
being readable, split it the way it was split out of `questionUI.js` — by file,
**never by registry**:

```js
// instruments.js
import { ARCADE_FORMATS } from './instrumentsPlay.js';
export const INSTRUMENTS = { …, ...ARCADE_FORMATS };
```

One `INSTRUMENTS` object, one contract, one import path for every caller. A
second exported registry is a second thing `questionUI.js`, `fieldCoverage.mjs`,
`instrumentGoals.mjs`, `instrumentTraps.mjs`, `instruments.html` and
`instrumentDrive.mjs` all have to learn about, and six tools learning about a
special case is the fork starting quietly.

The one genuinely new file is a shared surface:

```
engine/core/playSurface.js    a 2D canvas, a frame loop, dpr, pause on visibilitychange,
                              and a keyboard + touch input snapshot
```

Six of the seven draw on a canvas that redraws every frame, which nothing in
`figures.js` does — `figures.js` draws a picture once. That is a real gap in the
engine and it is worth one file. It is not an arcade file: any existing format
that wants a live readout can use it.

---

## 2. The contract — there is no new one

Straight out of `instruments.js`:

```js
INSTRUMENTS[NAME] = {
  html(ch)                  // the panel
  bind(container, ch, ctx)  // wire it; call ctx.commit(...) when answered
  verdict(ch, result)       // the picture the panel cannot show afterwards
  facts(game)               // one line for engine/dev/instruments.html
  tag(game)                 // the mode chip on that page
}
```

`ctx.commit(ok, answerText, extra)` is the only way out, exactly as it is for
TRACE and BALANCE. `questionUI` supplies the campaign's `ctx`; the dev harness
supplies one that does nothing, which is what lets all twenty-seven be drawn on
one page with no campaign behind them.

`METHOD[NAME]` gets a line for each, same as the others — what the player is
doing, one sentence, format-level. A player who has never seen a conveyor needs
that sentence as much as one who has never seen a TRACE board.

### The four rules still apply

1. **Nothing marks the answer.** Free here — no belt highlights a bin.
2. **The panel never prints the target.** `instrumentGoals.mjs` already draws the
   distinction these seven need: print the **goal** — "hold within ± 0.5 Hz",
   "three misses ends the run" — never the graded value. HOLD is the one that
   will get this wrong.
3. **Difficulty is judgment, never dexterity.** See §4. This is the rule these
   seven are in tension with, and it is yours to amend, keep or scope.
4. **A wrong action produces a consequence with physics in it.** Every one of
   these has that for free: the belt jams, the needle leaves the band, the flow
   spills, the shot falls short. That is what `verdict` shows.

---

## 3. Authoring — a stop, like any other stop

In `book.yml` under `missions:`, with `format: BELT`. No `arcade:` block, no
separate pack, no cabinet. `import-book.mjs` `need()`s the format's own keys and
refuses anything it does not know, and `bookParity.mjs` fails the game if the
book stops regenerating the content.

```yaml
- format: BELT
  scene: The store has been re-racked and nothing is labelled.   # 30–45 words, situation only
  question: Sort what comes down the belt.
  why: …                                                          # 70–90 words, the mechanism
  belt:
    left:  { name: Conductor, colour: '#c8a24a' }
    right: { name: Insulator, colour: '#5c6f86' }
    items:
      - { name: Copper busbar,  bin: left }
      - { name: Porcelain post, bin: right }
      # … ≥ 24, ≥ 8 per bin
```

Everything a stop already carries still applies and is still checked: `scene` is
the situation, `why` is the teaching, `assumes` names the prior knowledge,
`figure` is optional, the reading level is measured against `audience.grade`, and
`questionLoad.mjs` applies at grade 8 and below. **These are not exempt from any
of it.** An item name is an option the player reads at speed, so the twelve-word
option limit is generous and three words is the real limit; a stop with 24 item
names is 24 things to hold, which is exactly what `questionLoad` was written to
measure, and the counting rule for these formats has to be added there rather
than waived.

---

## 4. The open question: rule 3

`instruments.js` rule 3 says difficulty is judgment, never dexterity — nothing is
timed, nothing needs a cursor inside three pixels, every control can be re-set
until commit. Six of the seven below break it, and the belt breaks it hardest.

That rule was written for twenty formats that render laboratory judgment. It is
not obviously right for a format whose *point* is that a sixth grader wants
another go. But it is load-bearing in a way worth being careful about: it is what
keeps a science grade from being a reflex test, and it is what makes these games
fair to a player on a tablet, on a trackpad, or with a motor impairment.

Three ways to scope it, in the order I would try them:

- **Separate what is timed from what is graded.** The belt runs, the pressure is
  real, and `ctx.commit(ok)` is called on *accuracy*, not on score. A slow player
  sorts twenty items correctly and passes; a fast one sorts forty and passes with
  a better number on the card. Rule 3 survives intact — the grade is judgment —
  and the fun is entirely preserved. **This is the version §5 is written
  against.**
- **Amend rule 3 with a named exception.** "Timed where the format's subject is
  itself speed" — which is honest for SPOT, whose whole content is the cost of a
  rule switch, and dishonest for the other six.
- **Let the theme decide.** `audience.dexterity: false` turns every ramp off and
  every clock into a counter. Cheap, and it means a difficulty setting exists in
  a repo that currently has none, which is a bigger decision than it looks.

Whatever you choose, write it into `instruments.js`'s header next to the other
four, not here. A rule that lives in a design document is a rule the next
importer will not find.

---

## 5. The seven

Each gives: the verb, the controls, what `ctx.commit` is called with, the one bit
of subject matter, and the trap.

**The trap is the part that matters.** Every instrument in this repo carries an
importer check that refuses a stop which renders perfectly, plays perfectly and
teaches the opposite of what it was written for; `npm run traps` breaks all 35
and asserts each refusal. Seven more, in `instrumentTraps.mjs`, alongside the
rest — not in a file of their own.

---

### 5.1 BELT — the conveyor

**Verb.** Items ride in from the right. Flick each into the top bin or the bottom
bin before it reaches the end. Speed rises every ten items.

**Controls.** ↑/↓ or W/S; swipe on touch. One item in play, then two.

**Commit.** `ok` = accuracy over the run ≥ the format's floor (start at 80% over
≥ 20 items). Score goes in `extra` and onto the verdict card, and grades nothing.

**The bit.** A binary category at speed, with no time to reason it out. Acid and
base, conductor and insulator, dominant and recessive, ionizing and not, sterile
and contaminated, signal and noise. All eighteen games have one.

**Build it first.** No world, no question bank, ~250 lines, thirty lines of book
per stop. It is the format that proves `playSurface.js`.

**The trap: a token that predicts the bin.** If a single word appearing in ≥ 4
item names sorts them one way more than 80% of the time, the stop is winnable by
keyword and the category is never learned. The importer computes it and refuses.
This is `answerShape.mjs` — the longest option is not the answer key — arriving
in a new format.

---

### 5.2 TRIAL — the time trial

**Verb.** Drive or fly the theme's own world through a set of gates against the
clock, with the ghost of your best run.

**Controls.** Whatever already drives the scooter. `driving.js` and `flying.js`
read the player's key state through an `input()` callback, so touch drives both
without knowing they exist.

**Commit.** `ok` = every gate taken, in the authored order. The clock is the
pressure and the leaderboard; the order is the grade.

**The bit.** The gate order *is* a sequence the campaign already teaches — an
energisation order, a decontamination order, a sample-handling order. Right order
is also the fast line, which is the entire lesson.

**The exception, and it is real.** TRIAL is the only format whose panel is not a
panel: it hands the player back to the world with gates in it. `html()` returns
the briefing and the leaderboard, `bind()` starts a world run and resolves
`ctx.commit` when it ends. That needs `positionOf`, the colliders and the ground
function, which `instruments.js` has never imported.

Two ways to pay for it, and the second is right: **either** `instruments.js`
imports the world (no — it is the file every dev tool loads headless, and
`instruments.html` would need a scene), **or** the theme passes a `world` handle
through `ctx` the way `questionUI` already passes everything else, and the dev
harness passes `null` and TRIAL renders its briefing with the run button
disabled. One optional field on `ctx`, and every existing tool keeps working.

**Not every theme can race.** Deep Watch is a line of compartments, Bring Them
Home is one room; neither authors a TRIAL and nothing complains, exactly as
fourteen games author no instruments today. Blackout, Red Sand, Project Y,
Planetary Defense, Midway, Ice Core, Wellmere and Ground Truth already read as
tracks.

**The trap: an order the map gives away.** If the authored gate order matches the
nearest-neighbour route from the spawn — the walk `budgetForRoute()` already
computes — the fastest line is the correct line by geometry and the sequence is
free. Refuse; shuffle the gates or move one.

---

### 5.3 STACK — falling blocks with a question rail

**Verb.** `spectrum_stack.html` in the parent repo, ported: pieces fall, a
question sits on the rail, the rotate key doubles as the answer pick
(`answerOrRotate`), and a wrong answer pushes a pressure row up from the floor.

**Controls.** ←/→ move, ↓ soft drop, space hard drop, 1–4 answer. It already has
`enableBoardSwipes` for touch.

**Commit.** `ok` = questions answered correctly ≥ the floor. Lines cleared are
score and pressure, not grade — which is what stops it being a Tetris exam.

**The bit.** Heaviest of the seven: one four-option question per piece. Which
makes it the one to author where a theme wants drill, and the one to leave out
otherwise.

**Porting notes.** Keep the pressure row. Drop its chapter and course menus — the
campaign is the course. The bank comes from the stop, not a `CHAPTERS` constant.

**The trap: an answer key that is not shuffled.** If `correct` is the same index
for more than 40% of the bank, the rail is winnable by position. Refuse, and
shuffle at runtime regardless — `shuffleSeeded` is already imported.

---

### 5.4 HOLD — keep the needle in the band

**Verb.** One quantity drifts under noise and scripted disturbances, one control
moves it, keep it inside the band. The band narrows. Late in the run a second
quantity appears and both must be held.

**Controls.** ←/→ or a drag on the dial, analogue — a half-pushed thumb is a half
correction.

**Commit.** `ok` = inside the band for ≥ 80% of the run. Seconds held is score.

**The bit.** The unit, and which way the control moves the quantity. `hold: 50.0`,
`unit: Hz`, `direction: raise`. Every theme has a quantity that wants holding:
bus frequency, reservoir head, drill torque, cabin pressure, reactor temperature,
mean arterial pressure.

**Watch rule 2 here.** The band is a **goal** and must be printed; the 80% is a
grading tolerance and must not be, for the same reason a BALLPARK tolerance is
not printed — knowing it changes nothing about how you hold the needle and
invites aiming at the edge of it. `instrumentGoals.mjs` fired on four panels the
first time it ran and this is the fifth if it is written carelessly.

**The trap: a band a do-nothing run survives.** The importer simulates 60 s of
the authored noise with the control untouched. If that passes, the band is
decoration. Refuse.

---

### 5.5 FLOW — complete the path before it arrives

**Verb.** Pipe Dream: a grid of tiles, a source, a sink, and something already
moving. Rotate tiles to complete the path ahead of the flow.

**Controls.** Click or tap a tile to rotate; arrows and space on keyboard.

**Commit.** `ok` = the flow reached the sink.

**The bit.** Conservation and bottleneck — whatever the path carries has to be
handed on by every link. Which is CHAIN's own sentence, played instead of
argued. Natural for Blackout, Red Sand, Headwater, Deep Watch, Ice Core and
ContamCity; a stretch elsewhere, and a stretch is a reason not to author one.

**The honest objection.** CHAIN exists, works, and has fourteen authored stops.
If FLOW turns out to be CHAIN with a timer, it should not ship — see §4, and see
`FORMATS.md`, which got to twenty by *counting* rather than by inventing.

**The trap: a board already solved.** If a source-to-sink path exists at spawn
with no rotation, the first run teaches that the game plays itself. Refuse any
layout completable in zero moves.

---

### 5.6 LOB — angle, power, wind

**Verb.** Set an angle and a power, account for wind, hit the target. Three
targets at increasing range, three shots each.

**Controls.** ↑/↓ angle, ←/→ power, space fire; drag and release on touch.

**Commit.** `ok` = all three targets hit inside the shot allowance.

**The bit.** Projectile intuition with no formula printed anywhere: range peaks
near 45°, wind costs more at long range than short, and both are learned by
missing. Planetary Defense, Midway (it is that game's own syllabus), Aftershock,
Ground Truth.

**The trap: a target any angle reaches.** If ≥ 3 of 5 sampled angles at full
power land inside the target radius, aiming is decoration. Refuse.

---

### 5.7 SPOT — hit the ones the rule wants

**Verb.** Targets appear across the panel. A rule at the top says which to hit.
The rule changes mid-run without an announcement.

**Controls.** Click or tap.

**Commit.** `ok` = accuracy over the run, weighted toward the four seconds after
each rule change — which is the only interval that measures anything.

**The bit.** Attention and rule-switching. For **Sightline** that is not flavour,
it is the AP Psychology syllabus, and this is the one format whose subject *is*
speed. Outbreak's triage rule changing under the player is the other honest fit.

**And therefore the one that argues for amending rule 3.** Take the clock out of
SPOT and there is no switch cost to notice, which is the content. If rule 3 gets
a named exception, this is the format it is named for.

**The trap: a flip that changes nothing.** If two consecutive rules select the
same set from the authored targets, nothing flipped and the player is rewarded
for not noticing. Refuse any rule pair with identical selections.

---

## 6. What has to be wired, and what will be forgotten

The formats inherit the campaign's plumbing. These four are what a live canvas
adds on top, and each has already cost somebody a session somewhere in this repo.

- **The loop must stop when the tab does.** A background tab gets no
  `requestAnimationFrame`. The belt does not pause, it *freezes*, and a player
  returning to another tab's run cannot tell that from a crash. `playSurface.js`
  pauses on `visibilitychange` and says so on the canvas.
- **Every one of these must be playable with one thumb.** The casebook app opens
  on tablets and these are the stops a child will replay. `playSurface.js`
  provides tap zones, swipe and one analogue stick, and **anything positioned
  from a `Touch`'s `clientX/clientY` must be a child of `#touchLayer`** — the
  only element whose origin is the top left of the window. The last thing that
  got this wrong drew several hundred pixels below the fold and was
  indistinguishable from not working.
- **`vh` needs a `dvh` line after it.** A canvas sized in `vh` on iOS runs its
  own bottom, and `.modalActions` with it, under the browser chrome.
- **A panel that runs must stop when the panel closes.** `closeModal()` releases
  the held stop; a frame loop nobody cancelled keeps drawing into a detached
  canvas for the rest of the session. `bind()` returns nothing today, so the
  cleanest hook is `ctx.onClose(fn)` — one more optional field, registered by
  `questionUI` where it already calls `closeModal`.

---

## 7. Checks — the existing ones, with these in them

No new tools. Every check in `npm run check` already runs over whatever is in
`INSTRUMENTS`, which is the return on not building a second registry:

- **`instrumentTraps.mjs`** grows from 35 traps to 42 — §5's seven.
- **`instrumentGoals.mjs`** already asks whether a panel says what counts as done
  before it is done. HOLD and BELT both need it.
- **`instrumentDrive.mjs`** (`npm run drive <theme>`) drives every live panel in
  Chrome right and wrong. It found a TRACE whose resource container shared a
  class with its buttons; a canvas game where the click target is computed from
  `getBoundingClientRect` is the same failure waiting.
- **`instruments.html`** draws all twenty-seven on one page. Still the only sane
  way to look at these — reaching one in the game means playing to the right day
  with time on the clock.
- **`fieldCoverage.mjs`** reads the renderers and reports fields no panel prints.
  Seven new formats with a dozen new keys each is precisely what it is for, and
  it will catch the first `axis`/`ends` mistake before a stop ships with it.
- **`questionLoad.mjs`** needs a counting rule for these before any junior
  edition authors one. Twenty-four item names is a load and nobody has decided
  what its number is.

The one thing to add is a **selftest**, because every new trap in §5 asserts
something about a stop and nothing yet asserts anything about the trap. Run each
against a stop known to be sound and one known to be broken, and fail if either
verdict is wrong. This repo has paid three times for skipping that, most recently
when nine editions shipped too hard with every number green.

---

## 8. Order of work

1. ~~**`playSurface.js` + BELT, in `instruments.js`, one stop in one book.**~~
   **Done.** See §10.
2. ~~**The belt traps.**~~ **Done** — four of them, in `instrumentTraps.mjs`,
   and `npm run traps` is 50/50.
3. ~~**TRIAL**, with the `ctx.world` field.~~ **Done.** See §11.
4. **Decide rule 3** (§4) and write it into `instruments.js`. BELT is built
   against the first option — speed is the pressure, accuracy is the grade — but
   the rule itself is still only written here, and a rule that lives in a design
   document is a rule the next author will not find.
5. ~~**HOLD, SPOT.**~~ **Done.** See §12 and §13.
6. ~~**STACK.**~~ **Done.** See §14.
7. ~~**LOB.**~~ **Done.** See §15. **FLOW** is not built, and §16 is why.

Author them one stop at a time, in one book, with `npm run check` green before
the next. That is how the twenty got here.

---

## 10. What BELT actually cost

Built end to end and green: `npm run check` across every theme, `npm run traps`
at 50/50, `npm run drive instruments` at 21/21 with the belt playing right
(20 of 20) and wrong (three misses, run stopped).

**The files.** `engine/core/playSurface.js` is new. `instruments.js` gains
`METHOD.BELT` and the format; `questionUI.js` gains the freeze flag and the
cleanup list; `room.js`, `gameState.js`, `src/main.js`, `styles.css`,
`import-book.mjs`, `normalize.js`, `validateContent.mjs`, `smokeCampaign.mjs`,
`instrumentTraps.mjs`, `instruments.html` and `instrumentDrive.mjs` each gain
between one line and one block. Nothing else moved, and no existing format was
touched — which is the return on the registry decision in §1.

**Three things the build found that the spec had not.**

- **`tickDay` read `pace > 0 ? pace : 1`.** The one value that means *stop the
  clock* was the one value that ran it at full speed, so the freeze would have
  made the day drain four times faster behind an open panel than it did while
  walking — and every caller would have looked correct. Zero is a rate; negative
  and non-finite are mistakes, and only those two fall back now.
- **`bind()` returns nothing, and always has.** No panel in this engine has ever
  had a teardown hook, because until now none of them owned anything that
  outlives the DOM node. A frame loop nobody cancels keeps drawing into a
  detached canvas and keeps eating the arrow keys that belong to the world.
  `ctx.onClose(fn)` is the hook, and `closeModal` runs the list before anything
  else it does, because the rest of that function can throw.
- **`drive` could only play a synchronous format.** A belt only advances on a
  frame, so `PLAY[kind]` is awaited now and the sweep is a `for` loop rather than
  a `forEach` — which turned a `return` that skipped one lesson into a `return`
  that would have ended the sweep at the first non-instrument stop and reported
  whatever it had. Every format that runs on its own clock will need this.

**One thing the screenshot found that no check could.** The bin names were
printed twice — an HTML strip above the canvas and again inside each tinted
zone — and the strip carried the ▲/▼ keys while the zones carried the names, so
the two halves of what a player needs were in different places and free to
disagree. The strip is gone and the arrows moved onto the canvas labels. Every
check was green both before and after, which is house rule "screenshot before
believing anything visual" arriving on schedule.

**And then the decision generalised.** `PANEL_PACE` is 0 now, for every panel in
every game: the clock exists to make the *route* a decision, and no route
decision is being made while a question is open. What the quarter rate charged
was reading the evidence, hardest of all to the player who most needed to
re-read the scene. BELT's `pausesClock` is redundant as a result and is kept on
purpose — restoring the global rate must not silently un-fix the format the
decision was made for.

**Still open.** The casebook server does not yet honour `frozen` on the `panel`
message, so in a room the day still runs at the server's own panel rate while
somebody reads; the field is sent and ignored. And `questionLoad.mjs` has no
counting rule for a 24-item bank, so no junior edition should author a BELT
until it does.


---

## 11. What TRIAL cost

Green: `npm run check` across 28 themes, `npm run traps` at 55/55,
`npm run drive instruments` at 22/22, and one real run driven in the game — five
gates built, taken in order, HUD correct, markers and listener cleaned up.

**The shape it needed, and none of it leaked into the other twenty.** Three
optional fields on `ctx`: `world`, `suspend()` and `resume(html)`. With no
`world` — every harness — the briefing renders and the run button is disabled
with a line saying why, which is what keeps the format inspectable on
`instruments.html` beside panels that need nothing. `engine/world/trial.js` owns
the gates, the proximity test, the HUD and the teardown, and knows nothing about
what the right order is; `instruments.js` never imports three.js, which is what
`instrumentGoals.mjs` (Node) and `instruments.html` (no scene) both require.

**The clock.** A trial's pressure continues after the overlay closes, so
`panelFreezesClock()` is now tested *before* the overlay check in `pace()` —
otherwise the one run that must not be charged is the one happening with the
panel down. `closeVerdict` clears the freeze as well as `closeModal`, because a
suspended panel's freeze outlives the panel.

**The screenshot found the bug, again, and it was the whole feature.** Gates
resolved by building id were placed at the building's *centre*. A building's
`x, z` is the middle of it and a gate is 7 m across, so every ring came out under
the floor with its beacon inside the roof: invisible, and — since a building is a
solid collider — unreachable on foot. Nothing caught it. The importer's own
geometry check passed, the drive passed, the run completed, and the recorded
order was correct, **because the harness teleports**. `posOf` now stands a gate
off the door on `kit.js`'s own `facing` convention, `d / 2 + 10`, far enough that
the whole ring clears the wall.

**The trap reads the place.** It is the only check in the repo that loads a
theme's `site.js` to grade its content, and it has to: an order that is also the
nearest-neighbour walk from the spawn is perfect on the page and free on the
ground. Four more went in beside it — two gates inside one another, a gate
outside the world's own fence, a self-numbering label, an order that is not a
permutation.

**What `drive` can and cannot reach.** It plays TRIAL through a stub `world` that
hands back whatever order the play asks for, which exercises the suspend, the
resume, the re-bind and the grading — everything a selector can break. What it
cannot test is whether a gate is where the book says it is. That is the
importer's geometric trap and a screenshot, and this section is what happens when
only one of the two exists.


---

## 12. What HOLD cost

Green: 28 themes, `npm run traps` at 59/59, `npm run drive instruments` at 23/23
— right at 100% of the run inside the band, wrong (the do-nothing run) at 72%,
under the 80% it is graded on.

**The physics is one line and the trap follows from it.** A disturbance is a step
in the **rate**, not in the value: a door opens, the room starts cooling, and it
goes on cooling until the trim answers it. That is what makes it a hold rather
than a whack-a-mole, and it is what lets the importer settle the trap in closed
form — integrate the authored steps with the control untouched and measure the
*fraction* of the run that stays inside the corridor.

**The first version of that trap was too weak, and it is the same mistake this
repo keeps paying for.** It asked "does the needle ever leave the band". A board
the needle steps out of for two seconds at the very end passes that and is still
a board a player passes by doing nothing at all. The check compares against the
pass mark now, which is the thing that actually decides the stop.

**Two things printed and two things not.** The corridor and the length of the run
are goals — constraints the player works against — and are printed.
`instrumentGoals.mjs` is the file that draws that line. Not printed: the pass
fraction, which is grading slack on a value the player is producing, and **the
direction**, which is the bit of subject matter the stop is teaching. A panel
that says "raise increases the temperature" has answered its own question; a
player finds it in the first second by moving the control, and that is the
lesson.

**Three bugs, two of them in the harness rather than the format.**

- **The noise was scaled by the frame, not by its square root.** A random walk's
  step goes as √dt. Scaled linearly it looks identical on screen and accumulates
  completely differently: at 60 fps a ±0.01 per-frame wobble is half a degree of
  drift across a 45-second run, which swamps every disturbance the stop authored.
- **`drive` budgeted the run in frames.** 4200 of them, on the assumption of 60
  fps. Headless Chrome ran at 123, so the budget bought 34 seconds of a
  45-second run and the format "never reached commit" — with nothing wrong with
  the format. **A frame count is not a clock.** The loop is bounded by wall time
  now, and time-based formats are driven on a *rescaled copy*: HOLD's physics is
  rate × time, so dividing every time by 15 and multiplying every rate by 15
  traces the same curve through the same band in three seconds instead of
  forty-five. Real html, real bind, real grading.
- **A bare `await` on a requestAnimationFrame promise can never resolve.** A
  headless page that has been sitting behind twenty mounted panels stops being
  given frames, the page-side promise never settles, and the driver hangs at 0%
  CPU with nothing printed — which is how it presents, and it took two twenty-
  minute runs to see. The wait is raced against a 200 ms timer, so a stalled
  frame becomes a reported failure instead of a hang.

**And one the panel-width check caught before a player could.** The range input's
own UA margin pushed it two pixels past the panel; `drive` reports that as an
overflow, and a player sees a slider whose right-hand end is under the card edge.


---

## 13. What SPOT cost

Green: 28 themes, `npm run traps` at 64/64, `npm run drive instruments` at 24/24
— right at 100%, wrong (keep applying the withdrawn instruction) at 55%, under
the 80% it is graded on.

**The board is DOM, not canvas**, and that was the right call for a reason beyond
taste: real buttons mean touch and the keyboard work without being
reimplemented, the labels are real text at whatever size `typography.js` gives
the audience, and `npm run drive` can click them. A canvas board would have
needed a hit-test mirror published somewhere purely so the harness could reach
it — test scaffolding in shipped code. `createPlaySurface` takes a null canvas
now and runs the clock, the pause and the keyboard without one; that
generalisation is worth having for any format that draws in the DOM.

**The driver found the defect that mattered, on the first run.** Scoring every
item, a run that went on applying the *withdrawn* instruction scored **86% and
passed**. Most of what arrives is wanted by neither the instruction in force nor
the one it replaced, so leaving it alone is correct whatever the player
understands, and that filler drowned the signal. Only the **discriminating**
items are counted now: the ones the current instruction wants, the ones the
previous one wanted — the perseveration probes, whose correct handling changed at
the switch — and anything the player took. The same run now scores 55%.

That is the third time in this file that a measurement was too generous in
exactly the same way: BELT's keyword trap, HOLD's do-nothing run, and now this.
The pattern is worth naming — **ask what score a player who understood nothing
would get, before believing any pass mark** — and the wrong-answer path in
`instrumentDrive` is the thing that keeps answering it.

**And a second harness lesson, after HOLD's.** SPOT's clock is structure rather
than physics, so `PREP` divides every quantity with a unit of seconds by four:
the same number of switches over the same items, four times faster. The driver's
budget is also three times the run rather than the run plus a margin, because a
page that has stopped being given frames advances the panel at a fraction of real
time and a run that has not finished reports as "never reached commit" — true,
and silent about the format.

**Its trap is the sharpest of the set**, because the defect makes the format
measure the opposite of its own subject: two consecutive instructions that select
the same items are not a change, and the player is rewarded for not noticing.
Four more beside it — an instruction wanting the whole board, one wanting none of
it, an item every instruction wants (always safe to take), and a run with fewer
than two changes in it.


---

## 14. What STACK cost

Green: 28 themes, `npm run traps` at 68/68, `npm run drive instruments` at 25/25
— right at 8 of 8, wrong at 0 of 8.

**The port kept one thing and dropped two.** Kept: the pressure row. A wrong
answer packs a row in *under* the stack, and it is the only mechanic tying the
two halves together — without it the questions are a sidebar and the game is
Tetris with reading next to it. Dropped: the chapter and course menus, because
the campaign is the course, and the hard-coded `CHAPTERS` constant, because the
bank belongs to the stop.

**The options are DOM buttons and only the well is painted** — the third format
in a row to land there, and by now it is the default rather than a decision.
Touch works without being reimplemented, the text is real text at the audience's
own size, and `drive` can click it. The driver matches options **by text rather
than by index**, because the panel shuffles them, which also makes it the only
test that the shuffle did not break the key.

**Its traps are `answerShape.mjs` arriving in a format that file cannot see.** A
bank whose key sits at one index is answerable by position; one whose key is
reliably the longest option is answerable by length. Both are refused, and the
panel shuffles every question at runtime anyway — belt and braces, because a bank
is authored once and read for years. Two more beside them: a question that
repeats an option, so one of its wrong answers cannot be wrong, and an option
nobody can read while a piece is falling (eight words, against the twelve every
other format gets).

**One bug worth writing down because it would have been silent.** The importer
block opened with `const need = …` for the run length — shadowing `need()`, this
file's own validator, so every check after that line would have thrown *inside a
try that reports problems as content errors*. Caught by reading it back rather
than by running it. A validator named after a common noun is a trap of its own.


---

## 15. What LOB cost

Green: 28 themes, `npm run traps` at 72/72, `npm run drive instruments` at 26/26
— right at 3 of 3 marks, wrong at 0 of 3.

**One number is withheld and that is the whole design.** The ranges are on the
marks, the wind is on the flag, and the launch speed is nowhere. Print it and
this becomes an arithmetic exercise — a perfectly good one, and not this one.
Without it the only way through is to watch where the short shot landed and move
one control at a time.

**Its trap runs the physics.** The importer flies the same integration the panel
does and refuses a mark that three of five sampled angles reach at full charge —
aiming would be decoration — and then sweeps the whole control space to refuse a
mark nothing reaches at all, because a stop nobody can pass is not difficulty.
The flight is duplicated in `import-book.mjs` rather than imported: eleven lines
against a shared physics module that Node and the browser would both have to
reach, and a third place to look when a number moves.

**Two bugs, one visible only in a screenshot and one only to the driver.**

- **The vertical scale was twice what any shot needed.** Height was scaled off
  the *range*, so every arc sat in the bottom fifth of the canvas and read as
  flat — in a format whose entire subject is that the arc is not flat. It is
  scaled off the apex of a 45° shot to the farthest mark now, which is range over
  four.
- **The fire button was never disabled while a shot was in the air.** A player
  leaning on it lost shots to a guard that silently returned, and the driver
  could not tell a shot in flight from one that never left — it reported "never
  reached commit" on a panel that worked. Locked for the flight, released on
  landing, and the driver waits for the release.

---

## 16. FLOW: not built, and the argument against it

§5.5 recorded an objection to FLOW and asked it to be settled before building.
Settling it honestly: **as specified, FLOW does not carry its bit.**

The claimed subject was conservation and bottleneck — "whatever the path carries
has to be handed on by every link". Nothing in the design tests that. Rotating
tiles to complete a source-to-sink path before the flow arrives is pipe-fitting
under time pressure: the player who has never heard of a bottleneck completes the
path exactly as fast as the one who has. The bit was decoration, and CHAIN
already asks the real question with fourteen authored stops behind it.

**What would fix it, if it is wanted.** Give each tile a *capacity* and require a
throughput rather than a connection. Completing the path is then not enough — the
path is worth its narrowest tile, so the player has to notice that the elegant
short route through the small-bore section delivers less than the ugly long one,
and has to find that while the flow is coming. That is a construction move CHAIN
does not have (CHAIN hands you the links; this makes you choose them), and it
tests the thing the format claims to be about.

Traps for that version, ready to write: a board whose shortest path is also its
highest-capacity one (the bottleneck never costs anything); a required throughput
no layout can reach; and a board completable in zero moves. Until it is built
this way, FLOW should not ship — a format that renders well and teaches nothing
is the exact failure every trap in this repo exists to catch.

## 17. The rollout — three arcade stops in every campaign

**The quota.** Each of the nine grade-6 editions and each senior campaign carries at
least three stops drawn from BELT, HOLD, SPOT and LOB. TRIAL is not in the quota: it
is the orientation lap, generated by the engine from the areas' own entry points —
near ground before day 1, far ground on the unlock day with the vehicles — and it runs
in the eight campaigns whose geometry has two tiers (Outbreak, Planetary Defense,
Aftershock, Wellmere, and their four editions).

**`books/instruments.yml` day 8 is the reference.** BELT, TRIAL, HOLD, SPOT and LOB,
one each, in the Meridian Verification Office. Until it existed **seventeen of their
importer traps were skipped rather than passing**, because the strings they patch were
in no book — `npm run traps` went 63/87 to 82/87 the moment the day landed, and two
TRIAL fixtures had to be repointed at the gates a book actually authors (they had been
written against a pairing of `at:` and note that never existed).

### The recipe, per campaign

1. **Pick three by subject, not by rota.** The bin, the band and the instruction have to
   be the course's own: shed-or-not for a grid, selfed-or-open for a breeding station,
   the rogueing rule that changes when the rust arrives.
2. **Author, and expect these four refusals.** An unquoted comma inside a `{ … }` value
   (`{ name: Selfed, line kept }` splits and the parser refuses the half with no colon —
   quote it). A BELT item name over three words. A HOLD whose disturbances out-push the
   control — `authority` has to exceed the *peak sustained* rate, not the largest single
   step. A HOLD whose do-nothing run stays in the band, which is the trap and means the
   band is decoration.
3. **Pin `concept:` on all three.** A new stop takes a claim from somewhere, and the
   rarity term moves other stops' claims with it — Wellmere needed a fourth pin on a
   stop nobody had touched, because nothing claimed *dominance* any more.
4. **Run `conceptOrder`.** An arcade stop claims a real concept, so it can land before
   the concept's base. Blackout's frequency HOLD had to move from day 6 to day 13, which
   is where that course teaches the balance — the fix was the day, not the claim.
5. **Do not trust `--against` for an added stop.** `diffSnapshots` keys by
   `group:index`, and inserting a stop shifts every later lesson in that group: Wellmere
   reported nineteen losses and had none. Check the delivery counts instead — equations
   computed and concepts touched, before and after.

---

## 17. The world-graded six — GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG

TRIAL was the exception in §5.2: the one format whose panel is not a panel,
because it hands the player back to the place they are standing in. It is not
the exception any more. Six more formats are graded against the site, they came
from asking what else the world can be asked to grade, and everything §5.2 says
about `ctx.world` / `ctx.suspend()` / `ctx.resume()` holds for all six.

- **GREET** — a round of the site: say hello to `target` of a longer list before
  the hour is out. A greeting is proximity, deliberately: the panel is suspended
  during a run, so `E` is still the world's own activate, and walking up to
  somebody and pressing it would open their passage instead — a different
  feature with a dollar attached.
- **FOLLOW** — stay inside a band behind somebody walking a route. Both edges
  are a way of losing them, and the near edge is the one that feels like doing
  well.
- **HUNT** — find `target` of the same thing, scattered, all of them drawn on
  the map. Nothing is hidden, so what is graded is which ones are worth the walk
  and when to stop.
- **CANVASS** — ask a yes-or-no question and then answer it yourself. Everybody
  answers; nobody says when the sample is enough.
- **EVADE** — hold a clear radius for a stretch of time while somebody walks at
  you. The count runs only while you are clear.
- **TAG** — the same distance test the other way round: close on somebody who is
  walking away. They flee from the player and nowhere else, which is what keeps
  it out of rule 3's territory — there is no behaviour to read at speed, only a
  line to take.

### What they share, and why it is one file

`engine/world/worldFormats.js`. All five teleport to the spawn, hang something in
the scene, run a clock, watch a distance and tear it down however it ends — and
five copies of that lifecycle is house rule 1 arriving in a new directory. The
runner is `begin/update/finish`; a format is a `build`, a `tick`, a `hud` and a
`timeout`. Nothing in the file knows what the right answer is, which is the same
argument `trial.js` states and the cheapest way to be sure nothing there can leak
it: the grading is in `instruments.js`, off what the run reports.

**Four of them are about people, and people already exist.** The guide in a
FOLLOW and the pursuer in an EVADE are members of the crowd with a body, a
nameplate, a soft collider and a walk. A run takes them over — `npc.scripted`,
which `crowd.js` honours by leaving them alone — and hands them back afterwards
with `home` moved to wherever they finished, because a guide released at the far
end of a route otherwise walks back across the site all game. **Building a second
figure instead was the wrong answer twice over**: it would draw a look from the
world's own seeded generator, which moves every later draw (the trap `room.js`
already documents), and it would put a stranger in a game whose cast is named.

**HUNT draws on the map through a callback**, not an import. `engine/world` has
never imported `engine/core`, so `main.js` hands the runner `setMapPins`. Same
direction of dependency as `ctx.world` itself.

### The trap, five times

Every one of them is one sentence in a different currency: **a run whose goal is
reached by standing still, or by walking to whatever is nearest, is a run that
asks nothing.** All five traps read the theme's own `site.js`, as TRIAL's does,
and settle it in closed form the way HOLD's does.

| | what is refused |
| --- | --- |
| GREET | the nearest `target` people, walked from the spawn at 4.2 m/s, fitting comfortably inside the hour — or not fitting at all. A target equal to the list, which is a route somebody else planned. Everybody in one area |
| FOLLOW | a guide at or above the player's own pace, which cannot be followed. A band the whole route stays inside from where it started, which standing still holds. A walk the guide cannot finish in the time allowed |
| HUNT | the nearest `target` items fitting inside the time. Two items under 12 m apart, collected in one pass. An item outside the theme's `playerLimit` |
| CANVASS | a split past 75/25, which any three answers settle, or inside 55/45, which is a coin toss. An `answer` the population does not give. **The five people nearest the spawn already giving the true answer four to one** — the sample is then free |
| EVADE | a pursuer at or above the player's pace, and one so slow that the seconds banked while they walk in already satisfy the drill. A radius under 6 m, which is measured in reaction time |
| TAG | **a run long enough for a straight chase to work**. Two people walking the same way close at the *difference* of their paces, so `gap / (4.2 − speed)` is the time a formality takes and the run has to be shorter than it — and at least 0.4 of it, or no cut corner makes the difference up. A quarry at or above the player's pace, one under 1.5 m/s, a reach under 2 m, and a theme with no `playerLimit`, where there is no fence to catch anybody against |

Eighteen cases in `npm run traps`, and all eighteen fire.

### Rule 3, and where these sit against it

The clock is the pressure and coverage is the grade — who you reached, what you
found, whether the call you made was right. **EVADE is the closest to the line**
and stays behind it two ways: nobody in the drill is faster than the player, so
being caught is about ground rather than reflexes; and the count **stops** while
you are caught rather than resetting, so the cost of losing the radius is the
time it takes to get it back. A version that ended the run on contact would be
measuring reaction time, which is the thing rule 3 exists to keep out of a
science grade.

### The measurement, which is the part worth copying

`npm run drive` plays all five in a real browser through a **stub world** that
hands back whatever result the play asked for. That is the right test of the
suspend, the resume, the re-bind and the grading — and it is blind to the half
that decides whether the format works at all: whether walking up to somebody
counts as a greeting, whether a distance inside the near edge is measured as
outside the band, whether EVADE's clock really stops.

`engine/dev/worldFormats.mjs --selftest` is that half, in node against a stub
DOM, on runs whose answer is known — eighteen cases, inside `npm run check`. It
earned its place immediately: its first FOLLOW case asserted that a player
standing still scores badly, and a player standing still while the guide walks
*away* is inside the band for half the run, so the case was measuring the wrong
thing and passing. The case that survives is walking at the guide's shoulder,
and putting the near edge back into `d >= near && d <= far` fails that case and
only that case. Dropping EVADE's `if(d >= clear)` fails one case and only one.
Every check in this repo should be able to show that.

### The rollout, finished

**26 campaigns × 3 = 78 arcade stops**, plus the five in the Meridian bank. Every senior
campaign and every grade-6 edition carries at least three of BELT, HOLD, SPOT and LOB.
`npm run traps` went **63/87 → 97/102** across the pass: the seventeen arcade traps that
had been skipping for want of an authored stop now fire, and fifteen more arrived with
the campaigns themselves.

**Two bugs in the tooling, both of which shipped silently.**

1. **`addstop.py` appended past the end of the final mission.** For the last mission the
   "end of the stops list" scan ran on into `copy:`, so the stop was written into that
   section instead. It imports, it renders, `bookParity` is happy — and **no day ever
   schedules it**. Three junior editions carried a SPOT nobody could reach, and the only
   evidence was an arcade count of 2 where the book plainly held three `format:` lines.
   The scan stops at the first top-level key now.
2. **The trap fixtures were written against a book nobody had authored.** Two TRIAL cases
   patched an `at:`/note pairing Meridian never had, so they skipped rather than firing.
   A fixture anchored on prose is a fixture that goes quiet exactly when the content
   moves.

**What the traps caught in the content, campaign by campaign.** The BELT spelling trap
fired on seven books and every catch was real: *track* on Planetary Defense, *plutonium*
and *enriched* on Project Y, *with* on Headwater, *same/only/one* on Sightline, *the* on
Midway. Each fix is the same move — give the other bin items that use the word — and each
one makes the sort harder in the right way. HOLD refused two boards whose disturbances
out-pushed the control and one a do-nothing run survived. And `yaml-lite` refused an
apostrophe inside a `{ … }` value on The Trial, which is the comma rule wearing a
different hat: **quote any inline value containing punctuation the parser might own.**

### What playing them changed, and it was four rules

A player walked one of these before anything else did, and every one of the
findings is the kind no checker in this repo could have had an opinion about.

- **The guide walked backwards through parked cars.** Two bugs in one figure.
  The rig faces **+Z** at yaw zero — `FACE` in `rig.js` puts the eyes and nose at
  positive z — so the yaw that faces a heading is `atan2(dx, dz)` and nothing
  else; `driveTo` carried a `+ PI` copied from the crowd's *placement*
  convention, where somebody is turned to face back toward the station they
  belong to. And it consulted no colliders at all, where `crowd.js` `walk()`
  always has. A driven person now takes the caller's own `blocked` predicate and
  tries a fan of bearings either side of the straight line, which is enough to
  round a building and cannot walk into one. A wanderer who meets a wall can give
  up for a second; somebody a run is driving cannot, or the guide stops at the
  first parked car and the walk never ends.
- **Too close now ENDS a follow.** It used to cost the fraction of the run spent
  outside the band, which is the right treatment for dropping behind and the
  wrong one for walking into the back of somebody: being in front of them when
  they stop is not a worse follow, it is a failed one. The far edge is
  recoverable and the near edge is not, so they are graded differently.
- **A run you did not finish cannot be handed in.** The commit button is dead
  until the goal is met and the way out is to run it again — a round you
  abandoned is not a round to report. Closing the card leaves the stop open, so
  nobody is locked in a panel; it is simply still there. What this must not do is
  gate on grading slack, so FOLLOW's gate is the two facts the player can already
  see — they arrived, and they did not crowd her — and never the pass fraction,
  which stays unprinted. `successGated` on the format, and `npm run drive` asserts
  the gate rather than a grade on its wrong pass, because a gate that stopped
  working would otherwise read as a format that simply never commits.
- **A run owns the world and the map.** Walking up to somebody during a GREET
  *is* the greeting, and the passage panel opening their three-paragraph
  biography over it answers a question nobody asked — so interaction is off for
  the duration, prompt and key alike (`runActive()` in `main.js`). The map goes
  the same way: while a run is on it draws that format's own business and nothing
  else — the gates still to take, the people still to greet, the items still out
  there — and the day's open calls and wanted-person markers come off it. Pins
  are a **function**, not a list, because four of these formats pin people and
  people walk; a list captured at the start draws everybody where they were a
  minute ago, which is the exact lie the wanted marker was rewritten to stop
  telling.

Nothing counts twice, at either end: the importer refuses a name written twice on
a round or in a canvass, and the run marks each person, item and gate once — with
a selftest case for going back to somebody you have already said hello to.
