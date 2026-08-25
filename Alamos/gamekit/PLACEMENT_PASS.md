# The placement pass — matching the question to the place it is asked

**Status: all eight phases built, on `redsand`. 2026-08-25.** The plan is kept below
as written, because the argument for each phase is the reason the code looks the way
it does. What actually shipped, and what changed on the way, is here first.

## What shipped

| # | phase | outcome |
| --- | --- | --- |
| 1 | classify + gate | `stopKind()` in `normalize.js`; `shapeMissions` refuses an operated format as a person stop; `engine/dev/placement.mjs` with a 7-case selftest, wired into `npm run check` |
| 2 | fixture machinery | `engine/world/interiorFixtures.js` — four builders, placed from `room.bounds`, built on entry from the open call and disposed when it changes |
| 3 | catalogue | 15 fixtures across Red Sand's six areas, every operated stop covered |
| 4 | book wiring | `at:` on 31 lessons, carried by the importer and written back by the exporter |
| 5 | promote facades | five buildings that stood closed are enterable: Atmosphere Intake, Habitat, Vehicle Bay, Array Shed, Tank Farm |
| 6 | new sites | the **Pad Office** — the door onto the vehicle the whole campaign is about — and **The Ice Cut**, 338 m out |
| 7 | graded tiers | `tiersFor` ranks every walkable place, not only areas. Red Sand is two-tier for the first time: ratio 2.08, far lap on sol 4, rovers signed out with it |
| 8 | built-not-locked | fixtures carry `from: <day>`. The lag polishing column appears on sol 11 and the conductivity alarm on sol 12 — both already canon in the ending card, and neither ever shown |

**Red Sand went from 6 enterable places to 13, and from 6 question-places to 21.**

**This is one of a pair.** `BRIEFING_PASS.md` is the other: what the cards *say* — a
two-sentence stake, a reason under each objective, no delivery line, no word floors,
and the HUD down to three readings. They are independent, and the one join is that
placement moves which call is a person, so a reason opening *"She wants…"* on a call
that is now a room points at nobody. Whichever you do second, re-read the objective
lines afterwards.

---

## Doing this to the next campaign

**Most of it is already done for you.** The machinery below is engine-level and
applies to every campaign the moment you add its data. Nothing in this list has to be
built again.

| already engine-wide | what it does for any theme |
| --- | --- |
| `stopKind()` in `normalize.js` | sorts every format into decision / calculation / operated |
| `shapeMissions` | already refuses to make an operated format a person stop — **every campaign is fixed on this point today**, without you touching it |
| `engine/dev/placement.mjs` | in `npm run check`; fails an operated-at-a-person and a fixture that does not resolve |
| `engine/world/interiorFixtures.js` | four builders (`vessel`/`rack`/`bench`/`board`), placed from `room.bounds` |
| `enter:` on a site building | opens a place that is not an area — a door, a room, no case stand |
| `from:` on a fixture | something that gets built partway through a campaign |
| `tiersFor` | ranks every walkable place, not only areas |
| `shots.mjs --room` | photographs an outdoor game's interiors, which was impossible before |

### The per-campaign work, in order

```sh
cd gamekit
```

1. **Ask what is wrong.** `node engine/dev/placement.mjs <theme>`. It reports
   calculations at a person, areas with operated stops and no fixtures, and days with
   no decision-format call. Nothing fails yet, because `shapeMissions` has already
   moved the person stops.

2. **Write `themes/<theme>/fixtures.js`** — two or three per area, the objects the
   questions are actually about. **By name and wall, never by coordinate**: the engine
   computes the position from the room, and a theme that never writes a coordinate
   cannot put a prop sixteen metres in the air. Copy `themes/redsand/fixtures.js`.

3. **Point the lessons at them.** `at: <fixture-id>` on every calculation and operated
   stop in the book, then re-import. `placement.mjs` fails an `at:` that resolves in a
   different area — which is a *curriculum* finding, not a placement one: the stop is
   in the wrong room.

4. **Open what is already standing.** Look for buildings in `site.js` with no `group`
   — they are modelled, lit and shut. Add `enter: '<ID>'`, write
   `themes/<theme>/minors.js` with a caption and a panel for each, and merge it in
   `theme.js` as `interiors: { ...INTERIORS, ...MINOR_INTERIORS }`. **The bar is two
   authored stops about what happens inside**; below that, leave it a facade.

5. **Author what the fiction names and the map lacks.** Red Sand's was the ice cut.
   If you want it to earn a far tier, `tiersFor` needs a distance ratio of **2.0 or
   better** against the next place in and at least 120 m — check with a one-line
   script before you place it, because a compact site simply cannot earn one.
   **Raise `terrain.playerLimit` past your furthest new place**, or the player walks
   toward a building they can see and stops at nothing.

6. **Make the place start unfinished.** `until: <day>` on a fixture removes it when
   that day comes; `from: <day>` adds one. **Do this before anything else on the list
   above** — it is the strongest reading of "the world grew" per unit of work, it
   costs prop data rather than engine work, and it lands on ground the player already
   crosses daily. Look for scaffolding, capped stubs, crates, empty racks. Then add a
   `from:` for anything the ending card already claims got built: Red Sand's ending
   had said for the life of the game that the lead-and-lag columns were plumbed and
   the alarm was wired, and the rooms showed neither.

6b. **Give every opened place a reason to be entered**, or you have built rooms
   nobody entertained. Three ways, cheapest first: put the HUNT run's items there;
   move the delivery board there if the thing it counts lives there; and site a stop
   there by declaring its fixture under the place's key in `fixtures.js`. Check with
   the traffic table — every place should appear.

6c. **Seal what is not needed yet, and spread when it opens.** Nothing to author —
   `access.js` derives it from the campaign. What you control is the *spread*: run the
   traffic table, and if openings land on fewer than about eight sols, re-site a
   question or add a place. The ceiling is `2 + (non-area places)`.

6d. **Put the progress on the delivery's own object**, where the delivery is a physical
   thing — and check any gauge that already exists. Red Sand's rocket had one, and it
   was reading the calendar rather than the campaign.

7. **Check, then look.** `npm run check <theme>`, then
   `node engine/dev/shots.mjs <theme> --room all`, and `--sol N` for a later day:
   fixtures are built from the open call and `from:`/`until:` fixtures come and go, so
   a day-1 contact sheet only ever shows the first frame. A green check has never once
   caught a prop in a wall.

8. **Re-read the objective lines.** Moving person stops is what breaks them — see the
   second item below, and `BRIEFING_PASS.md` for the reason line's own bar.

---

## The follow-on: giving the seven places a reason to exist

**Measured after the first build, and it was the honest finding:** the seven opened
places were never called. Not once in fifteen sols. `callableOn` gates *groups*, and
the far ring contained no groups — so the sol-4 unlock changed the lap and the
vehicles and gated nothing about the route. A player could finish Red Sand having
never opened the Tank Farm, the Array Shed or the Pad Office.

That is the same defect as an objective line naming the area's job instead of saying
why you are walking there, built at world scale: **seven rooms nobody had a reason to
enter.** Four things fixed it.

### 1. A stop can be SITED at a place that is not its area

`theme.fixtures` may be keyed by a minor place. A lesson whose `at:` resolves under
one of those is asked *there* — the question still belongs to its own area and is
still about that area's subject, and the player is sent to the tank farm to answer it
because that is where the tanks are.

| sol | question | area | asked at |
| --- | --- | --- | --- |
| 7 | What the tank farm loses standing still | Cold End | **the Tank Farm** |
| 12 | What the dust leaves of the sun | Electrolysis Hall | **the Array Shed** |
| 14 | How much oxygen a tonne of methane needs | Cold End | **the Tank Farm**, at the umbilical |

`sitedAt()` resolves it, `callLabel` prints *"Go to the Tank Farm"*, and the fixture
registers its case against the **group** so `openVisit` gets the argument it always
did. `placement.mjs` now tells three cases apart, and the middle one is the feature:
a fixture in its own area (ordinary), under a minor place (**sited**), or under a
different *area* (the stop is in the wrong room — still a failure).

### 2. The delivery board moved to the Pad Office

It counts fuel, and the fuel goes into the vehicle standing thirty metres outside that
door. `delivery.where` accepts a minor place now. This is the one change that makes the
pad matter without adding a single question — you walk out to the vehicle to see the
fill, and the fill *is* the vehicle.

### 3. The HUNT run sweeps the opened places

`HUNT` falls back to one item per area, which sweeps ground the player already walks
four times a sol. Its six bins are now at the intake, the habitat, the vehicle bay,
the array shed, the tank farm and the pad — and it lands on sol 6, two sols after the
rovers sign out, which makes a bin at the pad a decision rather than a march.

### 4. `until:` — the plant starts unfinished

The mirror of `from:`, and the strongest of the four for the money. Red Sand was
complete on sol 1 and complete on sol 15. Now it opens with **five unfinished things**
and finishes six over the fortnight:

| sol | what changes, in a room you already walk |
| --- | --- |
| 1 | scaffolding on the cold line, a capped recycle tie-in, an empty stack frame, the spare charge still crated, instrument crates unpacked |
| 6 | the scaffolding comes down |
| 9 | the stack frame is filled |
| 10 | the crate is opened — the charge goes in |
| 11 | the lag polishing column is plumbed, the tie-in uncapped |
| 12 | the conductivity alarm is wired, the crates are fitted |
| 14 | the second radiator bank goes in |

**This is the mechanism to reach for first on the next campaign.** It costs prop data,
not engine work; it cannot read as fake, because on sol 9 the column genuinely is not
there; and it happens on ground the player crosses daily rather than 300 m away.

Two things it needed before it read at all, both found by looking rather than checking:

- **An unfinished thing has to look unfinished.** Built in the room's own materials the
  Cold End's scaffolding was indistinguishable from the shelving beside it. A `until:`
  fixture now wears a **site hazard-yellow band** at knee height — the shape still says
  what the object is, and the colour says it is not finished.
- **`along` was not mirrored with the room.** `flip` mirrors a room in x, and on the
  *back* wall `along` **is** x — so a fixture authored at −0.75 stood at +0.75 in half
  the campaign. That is how the scaffolding ended up inside the shelving: the position
  was right and the room was the other way round. Nothing threw, and it read as a prop
  clipping furniture.

**Where every place gets its traffic now:**

```
  Atmosphere Intake   sol 6 hunt
  Habitat             sol 6 hunt
  Vehicle Bay         sol 6 hunt
  Array Shed          sol 12 call, sol 6 hunt
  Tank Farm           sol 7 call, sol 14 call, sol 6 hunt
  Pad Office          the delivery board — every sol, sol 6 hunt
  The Ice Cut         sol 4 far lap + rovers
```

### 5. Sealed until needed — the world opens as the campaign reaches it

**This deliberately bends the repo's no-locking rule, and the line it draws matters
more than the feature.** A building the campaign has not needed yet stands with **no
name on it and a door that does not open**. It is named and opens on the sol something
first sends you, and stays open.

`orientation.js` says fencing ground "teaches the player the world is smaller than it
looks", and it is right. That objection is about **ground** — an invisible wall in the
open, nothing to see and nothing to read. This seals **doors**. Nothing stops the
player crossing any part of the plain, walking round any building, or looking at
anything; the crosshair on a sealed door reads *"Sealed. Nothing here is needed yet"*.

> **Seal doors, never ground.** A campaign that fences the plain has taken the world
> away. A campaign whose unopened doors are dark has given the player somewhere to
> arrive.

`engine/core/access.js` owns it. `openingSols(theme)` derives the sol each place is
first needed from the four things that can send a player somewhere — a stop in that
area, a stop *sited* there, the delivery board's room, and a warm-up that scatters
something at it. Three surfaces obey it: the 3D name plate, the map label, the door.

**Quick Discoveries are excluded**: `openingSols` returns `{}` for any theme with no
`delivery`. Nine stops in one sitting has no "not needed yet" to mean, and a sealed
door in a twenty-minute game is a door the player never sees open.

Two bugs it cost, both invisible without playing:

- **The warm-up fallback opened everything on sol 1.** For want of a day it defaulted
  to 1, which opened every building the HUNT touches on the first morning and made the
  whole feature invisible. It reads `warmupPlan`'s real day now.
- **`find` took the first building within range, not the nearest.** The Electrolysis
  Hall at 23 m stole the crate that was 8 m from the Vehicle Bay's door, so the bay
  never opened and the run scattered an item at a sealed building.

### 6. Spreading *when* the world opens

The first cut had openings on **4 of 15 sols** — the world arrived in two batches. The
ceiling is arithmetic and worth knowing before you start:

> **max distinct opening sols = 2 + (number of non-area places).** Every area is called
> by sol 2, because that is what a campaign about a working plant does. All the spread
> has to come from places that carry no lesson.

Red Sand went 4 → 7 → **11 of 15**, in two passes:

1. **Re-site and re-schedule what exists.** Sol 4's feed-sizing question moved to the
   Atmosphere Intake (the feed *is* the intake). Two HUNT bins came off the Tank Farm
   and the Array Shed, which now open later on their own sited calls — *a place opened
   by a crate on sol 6 cannot then be opened by its question on sol 12.* The far unlock
   moved to sol 5 (`site.orientation.unlockDay`) so the ice cut did not share sol 4.
2. **Add places, because spreading alone hits the ceiling.** Four more, each carrying a
   question that genuinely belongs in it: **Hydrogen Store** (sol 8, *From amps to
   kilograms*), **Machine Shop** (sol 10, *Bringing a charge into service* — nickel
   oxide becomes a catalyst in a furnace), **Battery Bank** (sol 11, *The bill for a
   kilogram of hydrogen*), **Assay Lab** (sol 14, *The line that fails*).

**Two candidates were dropped rather than faked.** A greenhouse appears only in
*callback* scenes, and callbacks are generated by `shapeMissions` after `openingSols`
reads the raw missions — siting a call there would never have opened the door. A comms
mast had no question that belonged in it. Both would have been doors with nothing
behind them.

### 7. The map had to be taught the same lesson

Putting a place 338 m out **broke the map**, and the fix took two goes:

- A far place carrying **no lesson** is dropped from the auto-fit and drawn as an edge
  pointer with its distance. **Every area stays in frame always** — Planetary Defense's
  far ring is four real areas with stops in them, and clipping those would hide where
  the player is being sent.
- **That did nothing on its own.** The 230 m *track* to the cut was still in the fit, so
  the map came out exactly as tall: the place was gone and the road to it was still
  there. Paths are clamped to what the places already cover. A road running off the
  edge of a map reads correctly as a road that continues.

399 × 746 thin strip → 727 wide. Four weights now: area solid, minor place between,
scenery faint, **sealed** fainter still and unlabelled. The corner minimap keeps the
pointer and drops the label — four words at 167 px is text nobody can resolve sitting
on top of the plant.

### 8. Put the progress on the biggest object in the world

Red Sand's ascent vehicle already had a propellant gauge, **and it was lying**: it read
`state.week`, so it filled on the calendar whether or not the player had settled a
single call, while the HUD meter beside it counted pieces earned and sat at zero. Two
readings of the same quantity disagreeing, and the one on the biggest object in the
world was the flattering one. Both read `deliveryProgress` now.

The old gauge is a 34 cm strip — legible at the pad, invisible from anywhere else. The
level is also a band right round the tank section, five metres across, with a frost
line at the top that rises with the fill and goes brighter at full. **Look for this on
any campaign whose delivery is a physical thing** — a tank, a wall, a stack, a board:
the object the fortnight fills should show how full it is.

One trap that takes a whole theme down: **do not import `engine/core/theme.js` into a
theme's `props.js`.** It resolves through the `@theme` vite alias and the dev checks
load props in plain node, so all 32 of Red Sand's checks failed with *"Cannot find
package '@theme/theme.js'"*. The theme arrives through `decorate`'s context —
`ctx.theme` — which is now passed for every outdoor campaign.

### What I would not do again

**Do not ramp a campaign's route by tier.** All six of Red Sand's areas are called by
sol 2 and that is *correct* for a plant you work in; forcing the first three sols to
be small would read as the game withholding itself. And **if everything changes every
sol, nothing reads as a change** — the lag column landing on sol 11 works because the
other fourteen fixtures are stable. Keep the background still so the foreground can
move.

---

## The two things that changed from the plan

**Phase 1's rule had to be softened, and the number is why.** The plan said a person
stop must be a *decision*. Built and measured, that took the person stop off eight of
Project Y's fifteen days and left **51 of 62 themes** with a day where the roster is
never met and no passage is read — a person stop is where the cast is met and where
the money comes from. The shipped rule is the hard half only: an **operated** format
may not be a person stop. That leaves 2 of 62 (one is the `instruments` test theme).
`placement.mjs` still reports a calculation at a person; it does not fail it.

**A reason may not lean on a pronoun where the call can move.** Changing which stop is
a person left three of Red Sand's objective lines opening *"She wants…"*, *"He
changes…"* on a call that is now a room. Nothing catches this. **Write the reason on
an operated stop call-neutral**, and keep the pronoun for a decision, which is the one
kind that stays with a person. See `BRIEFING_PASS.md` for the reason line's own bar.

---

## The original plan follows

**The rule this exists to enforce:** a question about a thing should be asked in front
of that thing. Decisions are put to people, calculations happen at a desk, and
anything the player *operates* belongs at the equipment it operates — never standing
in front of a colleague.

---

## The finding

Red Sand has **56 stops and six places.** Every area is one room with one wall panel,
so a question about holding the Sabatier bed and a question about closing the carbon
ledger are both asked at the same panel in Reactor Hall. The place is the area's
subject, not the question's object.

Worse, the split between *people* and *rooms* is decided by something that has never
looked at the question. `shapeMissions` marks the **second call on an area** as a
person stop — a rule about not walking into the same room twice, which is a good
rule and knows nothing about what is being asked there. The result, measured:

**8 of Red Sand's 15 person stops carry a format that is not a decision.**

| sol | format | kind | today | question |
| --- | --- | --- | --- | --- |
| 4 | HOLD | **instrument** | Talk to Dana Stern | Three hundred degrees, while the feed wanders |
| 12 | ALLOCATE | **instrument** | Talk to Marion Wells | What the station stops doing |
| 13 | SPOT | **instrument** | Talk to Yusuf Demir | What the plant is protecting now |
| 15 | TRIGGER | **instrument** | Talk to Femi Abiola | Write the rule before the trace moves |
| 2 | PROTOCOL | calculation | Talk to Iosif Petrov | Which electrode does which job |
| 3 | BALLPARK | calculation | Talk to Tomás Herrera | Why the hotter pass gave less |
| 8 | PROTOCOL | calculation | Talk to Dana Stern | Four lines off the assay bench |
| 14 | BALLPARK | calculation | Talk to Élodie Moreau | How much oxygen a tonne of methane needs |

The top four are the ones that read as broken. Sol 4 is the case in point: the player
holds a reactor at its working temperature through a wandering feed — a live control,
worked for a minute or more — while standing in a conversation with the analytical
chemist. Nothing about the fiction, the room or the person has anything to do with it.

**And the book already knows where every stop happens.** Every one of Red Sand's 48
authored stops carries a `place:` — `place: Reactor Hall`, `place: Cold End` — and
**nothing in the engine reads it.** It reaches `lesson.place`, is used once as a
fallback for an unrelated `setup:` string, and is displayed nowhere. 48 of 48 authored,
0 of 48 used. That field is the authoring surface this pass needs, already filled in.

---

## The rule, as a table

Three kinds of question, three kinds of place.

| kind | what the player is doing | where it belongs | formats |
| --- | --- | --- | --- |
| **decision** | weighing options, defending a call, being persuaded | **a person** | CHOICE, SCIENCETANK, CASEBOOK, TRIAGE, VALUE, ATTEST, DELEGATE, STRESS |
| **calculation** | working a number, ordering steps, closing a ledger | **a room** — a desk, a bench, a board | BALLPARK, PROTOCOL, SEQUENCE, BALANCE, DERIVE, PROPAGATE, TRIANGULATE, DEGENERACY |
| **instrument** | operating something that answers back | **a fixture** — the thing itself | HOLD, SPOT, TRIGGER, ALLOCATE, CONTROL, CHAIN, SWEEP, PROBE, TALLY, HOLDOUT, VERIFY, TRACE, CLOUD, RESIDUAL, INJECT, FLY, BELT, LOB, ROUTE |

One hard rule and one soft one:

- **Hard: an instrument is never a person.** There is no reading of the fiction where
  you drive a control panel at somebody. This one is a gate.
- **Soft: a calculation prefers a room, a decision prefers a person.** A calculation
  put to a person is a weaker version of the same defect but not an absurdity — an
  engineer can work a number with you at their bench. Report it, do not fail it.

*(The three-column assignment above is a proposal and should be read against
`alamos-formats` before it is coded — that skill owns the catalogue, and a format
whose kind is argued about is worth arguing about once, in one place.)*

---

## Do not build new machinery — two thirds of this already exists

This is the part that makes the plan cheap. The engine **already** re-dresses a room
per open call, in two separate places:

| existing | what it does |
| --- | --- |
| `stationForOpenCall` in `engine/core/app.js` | reads the open call's lesson, builds a panel spec from its format, and pushes it to `room.screen`. The wall screen already shows the instrument *this* call is about. |
| `addProbeStations` in `engine/world/interiorStations.js` | for a PROBE, builds **one physical post per station down the room's wall, from the lesson rather than the theme** — created on entry, disposed when the open call changes. |
| `theme.interiors[group].station` | the one static panel per area. This is the thing being demoted: it is the area's subject, and it is what every call falls back to. |

`addProbeStations` **is the pattern**. Its header already says the important half:

> *"The stations are built from the lesson, not from the theme's `interiors` block,
> because the chain belongs to the question."*

The pass generalises that one sentence from PROBE to every instrument format, and
gives it a declarative surface so a book can name the object rather than the engine
guessing it.

---

## The plan, in four phases

Each phase is shippable on its own and each leaves the game green.

### Phase 1 — classify, and stop the bleeding

No world work. Fixes the eight rows in the table above.

1. `stopKind(format) -> 'decision' | 'calculation' | 'instrument'` in **one** module —
   next to `kindOf()`, which is already the single place formats are compared. Two
   copies of this table would drift the first time a format is added.
2. `shapeMissions` learns it: a stop may only become the day's person stop **if its
   format is a decision**. It already has a preference order for which call becomes a
   person; this adds a filter in front of it. Where a day has no decision-format stop,
   it gets no person stop — which is correct, and rarer than it sounds.
3. New gate `engine/dev/placement.mjs`: **fails** on an instrument at a person, **reports**
   a calculation at a person and a decision in an empty room. With a selftest, per the
   measurement rule — including the inversion, that a day of three decisions still
   produces exactly one person stop.

**Risk:** re-shaping which stop is a person changes `getPersonIdForStop`'s arithmetic,
so the reasons written last week for person calls may point at a different person.
Re-run the reason pass on any day whose person stop moves. This is known and small —
it is eight days in Red Sand — but it is real and it is silent.

### Phase 2 — fixtures

The "add more things" half, and the only phase with world work in it.

A **fixture** is a named physical object inside an area that a lesson can be answered
at: the Sabatier bed, the polishing columns, the load board, the tank farm gauges.

```js
// themes/<theme>/fixtures.js — declarative, like site.js and plan.js
export const FIXTURES = {
  KINET: [
    { id: 'bed',    name: 'The Sabatier bed', build: 'vessel', at: [2.4, -1.1], facing: 90,
      caption: 'A lagged vessel with a thermowell line running down it.' },
    { id: 'bench',  name: 'The catalyst bench', build: 'bench', at: [-3.0, 1.6] },
  ],
  …
};
```

- A lesson points at one with a book key — `at: bed` — which is what the dead `place:`
  becomes.
- Built by the route `addProbeStations` already uses: **on entry, from the open call,
  disposed when the call changes.** A room only ever builds the fixture today needs.
- **Fallback is the current behaviour.** A lesson naming no fixture is answered at the
  room's stand exactly as now, so day one of this phase changes nothing and every
  campaign that has not been through it keeps working.
- Builders come from `interiorKit`; most fixtures are a box, a cylinder, a rack and a
  label. Three or four generic `build:` kinds cover almost everything —
  `vessel`, `rack`, `bench`, `board`.

**The world tripwires apply in full here** and all of them have been paid for already:
`kit.js` placers take `(x, z, y)` with ground last; keep the spawn point and the walk
route clear; and **screenshot before believing anything visual** — exports present, no
errors and a clean build have coexisted with a prop sixteen metres in the air.

### Phase 3 — the catalogue, per campaign

Roughly eight to twelve fixtures a game, two per area. Red Sand, worked:

| area | fixtures the questions are actually about |
| --- | --- |
| KINET Catalyst Bay | the Sabatier bed · the spent-charge bench · the fresh charge in its can |
| EQUIL Reactor Hall | the loop skid and recycle line · the gas analyser · the assay bench |
| PHASE Cold End | the cold line, drier and trap in a row · the tank farm gauges · the refrigerator and its radiator |
| ELEC Electrolysis Hall | the water stack · the 800 °C carbon dioxide stack · the current and collection panel |
| GIBBS Plant Control | the load board · the energy ledger desk · the array feed |
| SOIL Water Plant | the hopper · the lead and lag polishing columns · the conductivity recorder |

**One thing this surfaces immediately, and it is a curriculum finding rather than a
placement one.** Sol 4's *"Three hundred degrees, while the feed wanders"* — the
user's own example — is a stop in **EQUIL, Reactor Hall**, and its scene opens *"The
Sabatier bed has to sit at its working temperature…"*. The bed is a **KINET** object.
A fixture's `at:` must resolve inside its own stop's area, so this stop either wants
the loop skid (which is what it actually holds) or it is in the wrong area. Expect a
handful of these per campaign: pointing a question at an object is the first thing
that has ever asked whether the question is in the right room.

### Phase 4 — wire the book

`place:` stops being dead. `import-book.mjs` resolves it to a fixture id and fails a
`place:` that names nothing; `export-book.mjs` writes it back; `bookParity` then holds
it like every other field.

---

## Gates to add

| gate | fails on | reports |
| --- | --- | --- |
| `placement.mjs` | an instrument format at a person stop; an `at:` naming no declared fixture; a fixture outside its area's room | a calculation at a person; a fixture nothing points at; an area with instrument stops and no fixtures |
| existing walk check | — | already asserts every stop is reachable on foot; fixtures join it for free |

Every one gets a selftest with the inversion written first, per `alamos-measurement`:
**write the case where two inputs that should score the same actually do, then put the
bug back and watch that case, and only that case, fail.**

---

## Cost, honestly

| phase | work | world? |
| --- | --- | --- |
| 1 — classify + gate | half a day, engine only | no |
| 2 — fixture machinery | one to two days | yes, one builder |
| 3 — catalogue, per game | half a day a campaign × 25 | yes, placement and screenshots |
| 4 — book wiring | half a day | no |

Phase 1 is worth doing on its own even if nothing else follows: it costs no world work
and it removes the four stops that read as broken today.

---

# Part two — more places, and a world that grows

Added after the first draft. Phases 1–4 above make the *existing* six rooms match
their questions. These two sections are about there being more world to match to.

---

## A. More places, and more things in them

Two layers, and keeping them apart is what stops this becoming unbounded:

| layer | what it is | cost |
| --- | --- | --- |
| **fixtures** | objects *inside* an area's room — the Sabatier bed, the polishing columns | Phase 2 above |
| **sites** | whole places you walk into | this section |

### Red Sand already has six closed buildings and a rocket

The site declares eleven buildings for six areas. **Five are scenery**: modelled,
standing, lit, walkable up to — and not enterable, because an area is what gets an
interior and they are not areas. And out past all of them, behind a blast berm, is
the ascent vehicle.

| place | distance from spawn | enterable | questions already about it |
| --- | --- | --- | --- |
| Atmosphere Intake | 37 m | no | sol 4, the carbon dioxide feed the bed needs |
| Vehicle Bay | 49 m | no | the rovers; sol 12's drill |
| Habitat | 59 m | no | sol 2 and 5, the heat and the life-support margin |
| Array Shed | 85 m | no | sol 12, what the dust leaves of the sun |
| Tank Farm | 125 m | no | sol 7, what the tanks lose standing still |
| **the ascent vehicle** | **184 m** | **no — it is a prop** | sol 1, sol 14, and the reason the campaign exists |

That last row is the finding. **The thing the entire fortnight is about is a prop you
cannot interact with.** The player fills it for fifteen sols and never stands at it.

So "add more places" starts by opening what is already built. Promoting a facade is far
cheaper than authoring a site: the shell, the position, the lighting and the collision
already exist, and what is needed is an `interiors` entry and a reason to go.

### What earns a place an interior

A rule, so this stops somewhere:

> **A place earns an interior when at least two authored stops are about what happens
> inside it, and it earns a fixture when one is.** Everything else stays a facade, and
> a facade is not a failure — a plant that is all doors is a plant with no outside.

By that test Red Sand should open the **Tank Farm**, the **Array Shed** and the **pad**,
and leave the Habitat and the Intake as facades until the writing calls for them.

### Where new places come from

1. **Promote a facade.** Cheapest. The five above.
2. **Author a new site.** Needed where the fiction has somewhere the map does not — Red
   Sand's most obvious gap is **the ice cut**, the drill field the water comes from. It
   is named in sols 6, 11 and 12 and it is nowhere on the plan.
3. **Split an area.** Where one room is carrying two unrelated subjects, the honest fix
   is sometimes two rooms rather than two fixtures.

---

## B. A world that grows — and the rule this repo has already made twice

**Read this before designing anything here.** Two independent modules have already
decided that nothing is locked, and both wrote down why.

`engine/core/orientation.js`, on the far tier:

> *"Far ground is **walkable from day 1** — nothing is fenced, nothing is invisible…
> What it is not, before the unlock, is *called*. Locking the ground instead would be
> house rule 8 with a schedule attached — a player who walks somewhere and finds an
> invisible wall has learned that the world is smaller than it looks, which is the
> opposite of what a lap teaches."*

`engine/world/interiorLevels.js`, on the firewall at the head of the upper stair:

> *"It does not lock: every room in these games is walkable, and what is withheld above
> this line is the allocation, not the room."*

So a straight reading of "grow the enterable radius" — a fence that moves outward — is
the one design this codebase has explicitly refused, twice, in writing. **It should not
be overturned quietly.** The good news is that the feeling being asked for does not
need it.

### The world grows because more of it comes into use, not because a fence moves

Four mechanisms, cheapest first. They compose.

| # | mechanism | what the player sees | locks anything? |
| --- | --- | --- | --- |
| 1 | **called** | the route reaches further as the campaign goes on | no |
| 2 | **fitted** | the same room, more of it live — fixtures arriving as the questions need them | no |
| 3 | **built** | a place that genuinely is not there on sol 1 and is by sol 9 | no — you cannot enter what does not exist |
| 4 | **opened** | a place sealed for a visible in-fiction reason, which the player's own work removes | effectively, and so: strict rules below |

**1. Called — this already exists and Red Sand does not use it.** `tiersFor(site)` splits
the areas by distance from spawn, `unlockDay` opens the far ones on day 4, and a TRIAL
lap teaches the new ground. Twelve of sixty-two themes have a far tier. It is binary —
one split, one day — and the obvious extension is **graded**: three or four rings rather
than two, each opening on its own day with its own lap.

**2. Fitted** is Phase 2 of this document, seen from the other end. A room whose fixtures
arrive over a fortnight is a room that grows without anything unlocking.

**3. Built is the one that actually delivers "world building as the campaign goes on."**
A propellant plant against a transfer window is a construction site: a module lands, a
radiator field extends, scaffolding comes down, a second polishing column is plumbed —
*and the campaign already contains that event*. Sol 10 spends the one set of spare parts
on one of four improvements, and sol 15 decides what the next crew inherits. **Those
choices should change the world and currently change a number.** A player who funds the
lead-and-lag columns on sol 10 and walks into the Water Plant on sol 11 to find a second
column standing there has been told something no HUD can tell them.

This is the recommendation: it is the strongest version of what was asked for, it breaks
no rule, and its trigger is a decision the player already makes.

**4. Opened**, if it is wanted at all, needs three rules or it becomes the fence:

- the seal is **visible from outside** and its reason is legible — a frosted-over
  airlock, an unpressurised module with its hatch dogged, a bay behind a dust curtain;
- it is opened by **something the player did**, never by a day counter;
- and there is **no invisible wall anywhere** — the boundary is the sealed thing itself,
  which is a door you can walk up to and read.

### Red Sand, worked — and the number that says no

Today: one tier. Six areas at 36–102 m, largest gap 23 m, **ratio 1.66** against a
`FAR_RATIO` of 2. No far tier, no unlock, no lap.

Promoting the five facades does not change that — the whole site is compact:

```
  36m GIBBS   37m ELEC   37m Intake   49m Vehicle Bay   59m Habitat   62m SOIL
  67m KINET   85m Array Shed   90m EQUIL   102m PHASE   125m Tank Farm
  largest gap 23m -> ratio 1.23. Still one tier.
```

Even the **ascent vehicle at 184 m** only reaches ratio 1.80 against PHASE at 102 m. So:

> **Red Sand cannot earn a far tier by opening what it already has.** The geometry is
> right and the rule is right — it is a compact plant, and it is one tier.

Two ways forward, and the first is much better:

- **Put the new place genuinely far.** The **ice cut** at 250–300 m out on the plain is
  ratio 2.5+ against PHASE, clears `MIN_FAR_METRES` easily, and is where the fiction has
  always said the water comes from. It earns the tier honestly, and the existing
  machinery — the split, the unlock day, the TRIAL lap, the vehicles — switches on for
  free with no engine change at all.
- **Or relax `FAR_RATIO`** — which `orientation.js` argues against in its own header:
  *"a distinction to justify a feature"*. Do not do this first.

### Floors: the machinery exists, and its author refused to lock it

The building analogy is already built, twice:

- `interiorLevels.js` — floors stepped **along** the spine as well as up, because
  `groundHeight(x, z)` takes no floor argument. Has a `gate:` at the head of the upper
  stair that is posts and a reader and **does not lock**.
- `interiorTower.js` — four plates on **one** footprint, joined by a lift, one floor
  active at a time so `groundHeight` stays single valued. Changeover uses it.

So "more floors as the game goes on" needs no new world code — a plate that is not built
yet, or a lift button with no car behind it yet, is mechanism 3.

---

## Revised phase order

Phase 1 still goes first: it is half a day, needs no world work, and fixes four stops
that read as broken today.

| phase | what | new? |
| --- | --- | --- |
| 1 | classify + gate | above |
| 2 | fixture machinery | above |
| 3 | fixture catalogue per game | above |
| 4 | wire the book's dead `place:` | above |
| **5** | **promote facades** — `interiors` entries for places already standing, by the two-stop rule | new |
| **6** | **author the missing sites** — Red Sand's ice cut, placed far enough to earn a tier | new |
| **7** | **graded tiers** — `tiersFor` from binary to N rings, one lap each | new |
| **8** | **built-not-locked** — the sol-10 and sol-15 funding choices change the world | new |

5 and 6 are per-campaign content. 7 and 8 are engine, and 8 is the one worth doing for
the feeling that was asked for.

---

## What this does not do

- It does not move any question to a different day, or change any question's content.
  Where a stop turns out to be in the wrong *area*, that is reported and left for a
  curriculum pass — see `SEQUENCING_PASS.md`.
- It does not touch the Quick Discoveries. Nine stops in one sitting on a 3 × 3 spine
  is a different shape, and their places are already close to their questions.
