---
name: alamos-warmups
description: The seven world-graded warm-up runs (TRIAL, GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG) — the spread schedule, the authored reason per slot, warmupOrder and npm run laps; the two-tier ground rule and orientation.js's far-tier split; and the two-vehicle-kinds rule per outdoor site. Read before touching warm-ups, world formats, tiers, or vehicles.
---

## Every outdoor site can be got about two ways

**Seven of the eight two-tier campaigns promised a vehicle that did not exist.**
`orientation.js` opens the far tier on the unlock day and `src/main.js` signs the
vehicles out on the same morning, and the warm-up card the player reads before
anything else that day says so out loud — *"they are far enough out that transport
is signed out to reach them. Drive the route once before somebody is waiting at
the other end."* Outbreak, Aftershock, Wellmere, Carrying Capacity, Slack Water,
Overwind and Dark Fibre shipped with **no driveable vehicle in the world at all**,
the far ground 190–320 m out and nothing to take. Only Planetary Defense had any.
Every content gate was green, because the book was right: this is the HUNT-count
defect in a different currency, and only a person walking out of the plan card and
looking would ever have seen it.

**The second half is about the place rather than the promise.** A site whose only
transport is a truck asks nothing about how to get about — there is one answer and
it is always the same answer, which is the argument the countdown rests on with the
route taken out of it. So **two kinds, chosen from what the site is already about**:
Slack Water's van has the barrage road and its quad crosses the mud to the training
wall; Corbin Park's flatbed carries and its cart fits down a three-metre midway a
flatbed is three-point-turned on; Red Sand's rover is a habitat that costs the power
budget sol 12 is an ALLOCATE about, and its buggy is a frame you ride in the suit you
are already wearing. **Period, not just function** — Project Y gets bicycles because
the Hill ran on them, the 1919 eclipse camp gets a spoked-wheel motor lorry, and the
1964 antenna site gets a Bell service van and a staff car.

`engine/dev/vehicleKinds.mjs` is the gate, inside `npm run check`. **18 outdoor
sites, all at two kinds, no debt file** — the gap was closed in the same pass the
gate was written, so there is nothing to record.

- **It builds the world and reads `ctx.interactables`, never the source.** Three
  trucks in three colours are three `driveable(` calls and **one** kind: Red Sand
  parks "pressurised rover", "plant rover" and "excavation rover", Ice Core three
  tractors under three names, and a grep would have called both sites varied.
  `kind` is a field on the call, and **an unstated kind is one bucket rather than a
  guess off the label** — two vehicles that decline to say what they are must not
  count as two because they are spelled differently. Both are selftest cases, and
  the third is that the rule still separates a van from a quad, without which the
  first two pass by the counter being broken in the safe direction.
- **A vehicle parked inside a collider is one you get into and cannot move** —
  house rule 16 reached from the other side, and the symptom is identical: you press
  W and nothing happens. `kit.clearSpot` walks a deterministic spiral (never the
  world's seeded generator, which hands out faces) and the spawn is always in its
  avoid list. The gate reports anything inside 10 m of the spawn as well, and both
  assertions were verified by putting the bug back — a same-kind pair fails exactly
  that theme, and a vehicle placed on the spawn fires exactly that line.
- **Interiors are skipped on what the site says it is, not which file builds it.**
  Five interiors bring their own world module, so testing `world:` would have
  excluded an *outdoor* theme that did the same. An outdoor theme with its own world
  module and no vehicles found is a **failure**, not a pass: "this cannot see your
  motor pool" and "you have no motor pool" are the same output, and passing on the
  ambiguity is how a gate reports all-clear on the one theme it cannot read.

**What the pass added to the kit**, because eight themes were about to write it
each: `bicycle` + `BICYCLE_DRIVE`, `quadBike` + `QUAD_DRIVE`, `utilityCart` +
`CART_DRIVE`, `VEHICLE_DRIVE` for `kit.vehicle`, `bicycleRack`, and `clearSpot`.
Five are theme-local because only one place has one — Ice Core's skidoo, Red Sand's
open buggy, the eclipse camp's 1919 lorry, the CMB site's staff car.

**And the screenshots found three things no number would have.** Ice Core's three
skidoos were `kit.scooter` calls — **kick scooters, on a polar plateau, under a
comment calling them skidoos**, and none of them takeable; the comment had been
right about what the camp needs since the day it was written. The new bicycle drew
its spokes as a thin steel *disc*, which renders as a solid grey wheel: a moped, and
from ten metres the wheel is the only thing telling you which of the two is parked
there — eight boxes cost eight meshes and read correctly. And the basket floated a
hand's width clear of the bike in two directions at once. **The bicycle passed its
own headless test all three times**, because that test asks whether the hubs are on
the ground.

## Two tiers of ground, and the two laps that teach them

**A site with a far half opens it on day 4, with the keys.** `engine/core/orientation.js` measures every
area from the spawn, and a **far tier exists only when the split is real**: the nearest far area must be
at least twice the distance of the furthest near one *and* at least 120 m out. Both terms are
load-bearing — the ratio alone called Calder two-tier, where the "far" metering hut is 48 m from the gate
and visible from it; the distance alone would split a uniformly spread site. Nothing is authored: move a
building and the split follows, and a `tier: 'far'` in site.js is a second description of the map.

Eight themes have a far tier: Outbreak, Planetary Defense, Aftershock, Wellmere and their four grade-6
editions. **Every other theme is untouched with no flag to set** — there is no far ground on a submarine
and no vehicle to unlock in Mission Control.

- **Before day 1, a lap of the near ground; on day 4, a lap of the far ground.** Both are TRIAL, the one
  format graded against the world. The gates are the areas' own entry points — the same positions the
  budget walks and the map draws — so a lap needs no authoring.
- **The lap grades nothing and can be skipped.** TRIAL-the-format grades order because order is its
  subject; there is no science in "which of these six sheds is which", and on day 1 the player has been
  taught nothing to order it by. A second-campaign player made to sit through a tutorial is a player who
  stops on day 1. Skipping marks it done; so does abandoning half way.
- **The far ground is walkable from the first morning — it is just not *called*.** Locking it would be
  house rule 8 with a schedule attached.
- **The vehicles come out on the same day.** `AIRCRAFT_FROM_DAY` existed for one theme's helicopter;
  scooters and cars were never gated. Both are `VEHICLES_FROM_DAY` now, driven by the tier rule. Signing
  them out earlier would let a player drive to ground with nothing open on it. **Seven of the eight
  two-tier sites had no vehicle to sign out** — see the section above.
- **`shapeMissions` trades far calls out of the opening days rather than moving them.** Every two-tier
  campaign teaches in its far half on day 1 — Wellmere had seven of its first ten calls out past the
  glasshouses. A far call on day 2 swaps with a near call from a later day: both days keep their stop
  count, every lesson is still taught, the books are untouched, and only the order two lessons are met in
  changes. Wellmere 7 far calls in days 1–3 → 4, Aftershock 6 → 1, Planetary Defense 3 → 2, Outbreak was
  already 0.
- **It reasons about equations not at all, deliberately.** A second dependency solver in `normalize.js`
  would be a second description of a rule `equationOrder` owns. So the swap is conservative — it prefers
  the *latest* partner, pushing lessons later rather than earlier, because a course is written so later
  work depends on earlier — and `equationOrder` is the guard. It passes on all four.
- **What cannot be traded is reported, not dropped.** Wellmere's spawn sits beside the vault and the lab
  and everything else is out in the rings, so only two areas are near: a day can hold at most two near
  calls before the third becomes a person hunt. That is a limit of the place, it is printed as a change,
  and **a silent exception is how a rule stops meaning anything.**
- **The tiers are stamped on the content, not passed at each call site.** `theme.js` normalises once with
  the site; every checker that re-normalises reads the same `content.TIERS`.

## A campaign short enough to finish in one sitting has none

**`WARMUP_MIN_DAYS` is 4, and a campaign under it schedules nothing.** The schedule below is
written for a fortnight of mornings. A Quick Discovery is three levels and nine stops in one
sitting, so the two openers alone would be two thirds of the campaign — read before a single
stop, by a player who came for nine questions. All twenty short campaigns open on their first
plan card now, and their books' `warmups:` blocks are deleted rather than left unreachable.

**Derived, not authored.** A `quick: true` on twenty themes is a second description of a shape
the missions file already states, so the rule reads the day count — move a campaign to four days
and it gets its runs back. Three places know it, all from the one constant: `warmupPlan` returns
`[]`, `warmupOrder` judges a short campaign on having *no* schedule (and reports a book that
authors runs nobody will be offered, the length twin of `trial-far` on one tier), and
`import-book` refuses the block outright.

**And `npm run laps` threw on the first one it was pointed at.** `TypeError: Cannot read
properties of undefined (reading 'getState')` — its priced-way-past-a-run pass assumed a run
existed, and the whole report, rows included, was lost to a campaign behaving exactly as
specified. A harness that cannot describe a legal campaign is the failure, not the campaign.

## Seven runs open the campaign, and each needs a reason

**`engine/core/warmups.js` is the schedule and the only copy of it.** The seven world-graded formats —
TRIAL, GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG — run *before* a day's plan card, and which runs when is
a property of the campaign rather than the ground:

    before day 1 and day 2   TRIAL and GREET, in either order
    before the unlock day    TRIAL again, and only where there is far ground
    after that               FOLLOW, HUNT, CANVASS, EVADE, TAG, one a day, in
                             order, spread evenly over every morning that is
                             left — first as early as it can be, last on the
                             final day of the campaign

**Spread, not stacked.** Handing the five out on the next five free mornings put all seven inside the
first week of a fifteen-day campaign and left the back half opening on nothing — blocked practice in the
one part of the day a player meets before anything else, the mistake `shapeMissions` already fixes for
lessons. Blackout now runs on days 1, 2, 3, 6, 9, 12, 15. Three selftest cases hold it: the last run lands
on the last day, no two land on consecutive days, at least two fall in the second half.

**Either order is decided rather than left open.** A two-tier site opens on TRIAL, because what a player
cannot read on that first plan card is the ground; a one-tier site opens on GREET, because its ground is
one building and what they cannot read is who everybody is. **The save key is the slot, not the format** —
`trial-near` and `trial-far` are separate keys because the old two-key scheme would let one lap mark the
other done the moment a third existed.

**The schedule is engine logic; the reason is authored.** `warmups:` in the book gives each slot a title
and a `why` — worried about spies, six earths and a log that says five, catch Whitlock before she drives
off. A run with no reason is a tutorial, and the day model has a rule against those. The importer refuses a
slot name that is not one of the seven, a `why` under twelve words, and a `trial-far` on a one-tier site.
Everything the run needs defaults from the campaign's own data.

**`engine/dev/warmupOrder.mjs` checks both halves, and only one can be in debt** — the authoring, in `warmup-debt.json`. It asserts the
*properties* the schedule has to have rather than comparing against a table, because a table would be a
second description of the rule. Fifteen selftest cases, including the two that would otherwise invert
silently — the two laps sharing a save slot, and a five-day campaign asked for five tail runs it has no
room for. **The debt is paid: 204 slots across 28 campaigns → nothing.** Every campaign that is offered runs authors all seven
(eight where there is far ground), so an unwritten slot fails immediately. What the writing turned up is
that the reason is campaign-specific in a way the schedule is not: HUNT is six earths at Calder, eleven
bagged heads at Wellmere, fourteen ventilators at Riverton, nine spare tapes in Mission Control. That is
the argument for authoring it at all — the generic `DEFAULT_WORDS` render a run that works and a run
nobody is doing for a reason. **The junior editions do not inherit the senior's warm-ups**, and
`derive-edition` does not carry the block across: a `why` written for an AP reader is the
demand-stays-put failure this file records three times over.

**`npm run laps <theme>` drives them in the real game, and found three things no check could.**
`warmupOrder` asserts the schedule and `worldFormats` asserts the formats against a fake world; neither can
see `runLap` in `src/main.js`, which is the wiring between them. `engine/dev/lapDrive.mjs` boots the actual
game in headless Chrome, opens the plan on every morning, reads the card, takes the run, checks a HUD
appeared and gives it up with Esc.

- **EVADE was handed a `quarry` where the format reads `pursuer`.** So `npcById` found nobody, the run
  started and finished on its first frame, and the lap was marked done — from the plan card
  indistinguishable from a format that does not exist. One word. Both EVADE and TAG now **refuse to start**
  with nobody in them, because a run that ends immediately and a run that never mounted look the same. The
  TAG selftest case needs its **own rig**: `begin` also refuses while a run is already going, so on the
  shared rig it passed for that reason instead of its own.
- **The story named a count the run cannot place.** HUNT puts one item at each area entry, so "Eleven
  bagged heads" on a six-area site is a card that lies about its own run; **twenty of twenty-nine campaigns
  were wrong**, and only the HUD ever put the two numbers side by side. All twenty rewritten, the count is
  an importer refusal, and `item: { name, plural }` is authorable so the HUD reads "0 of 6 earths".

**Ten things a person found by playing the runs, none of which a check could see.** One lesson: a warm-up is
read and walked, and everything wrong with it was wrong in a way only that tells you.

- A finished run said "That is the round" and a summary; it says *Congrats! You are now ready to start the
  day* and nothing else, because the tally is already on the HUD. And the card offering a run no longer
  carries "nothing here is graded, the clock does not start until you take the plan" — two sentences of
  mechanics on the one card whose job is the reason for the run.
- **TRIAL's gates carried a name board four metres up.** A panel with no post under it reads as a hoarding
  on the roof of the building it names. Gone; putting the name on the beacon instead only printed it under
  the building's own sign, so the gate says "here" and the HUD and map carry the names.
- **The clock ran up.** A stopwatch with no number to beat is a readout, so TRIAL counts **down**, from the
  route the gates actually make: nearest-neighbour from the spawn at walking pace with half again on top,
  capped at fifteen minutes, driven pace on the far lap. Nothing authored. A run that ends on the clock is
  short of gates, and `instruments.js` refuses to commit a partial order as a route.
- **The near lap was handed the whole site.** At Planetary Defense — base camp inside 200 m, outstations
  1.6 km down the ridge — the first morning's countdown came out at **eighty-one minutes**. The near lap is
  `TIERS.near` and the far lap `TIERS.far`, which is what makes the second lap worth taking.
- **A windowed map drew nothing for the gates it had cut off.** `mapRadius` is 170 m at Planetary Defense,
  so the far lap's four gates were simply absent — a lap of ground the map denied existed. A running
  format's pins now get the edge arrows buildings and wanted people already had, first in the queue.
- **The day's own markers stayed up during a run** — the waypoint post, the cones over the next person (the
  one thing allowed to draw through walls) and the "Still open" banner, all pointing at work with nothing to
  do with the run. `showDayMarkers(false)` for the length of it, in one call because there are three of them
  in three files and a fourth would be forgotten. Both run HUDs also moved out of the stat bar.
- **GREET labelled people with a four-letter area code** — `OPS`, `TRI`, `SONAR`: what the save file needs,
  not what a person would say about themselves. The subtitle over somebody's head is their `role`. Two
  roster entries had a department where the job should be (*Metering & Standards*, *Load Forecasting*) and
  read as nonsense the moment anything printed them in a sentence.
- **The cards promised everybody.** GREET's target is about 70% of the roster and eighteen books said "put a
  name to everybody", so the run ends with the job apparently half done. All ask for as many as you can get
  round.
- **A card named a stranger.** "Farrow wants you known to both" is read on the first morning, when nobody is
  anybody yet. Every name a warm-up uses is introduced on that card, with the job beside it, and
  `warmupOrder` fails a campaign that does not — four accepted shapes (apposition, full name, role-then-name,
  or a verb stating the job). Two selftest cases exist because the first version passed for the wrong reason:
  `Dr.` read as a first name, so "Dr. Patel has the notes" counted as a full-name introduction while saying
  nothing about what she does.
- **TAG and EVADE inherited whatever gap the crowd had wandered into.** On Blackout's day 15 the quarry stood
  two metres from the spawn, so the run was won on its first frame — the same "already over" failure as the
  wrong spec key, arriving through geometry. Both set the gap up: a quarry too close is stood back to twelve
  metres, a pursuer who starts clear is brought inside the ring, and a person already at a fair distance is
  left alone, because teleporting somebody the player can see is worse than the problem.

**`export-book.mjs` was lossy in a way that only shows when you need it.** It knew the six formats predating
the instrument registry, so a book recovered from a game came back with **every instrument board deleted** —
and no `guide`, no `background`, no `warmups`, which is the whole of the card sweep and the whole of the run
stories. Found the worst way: `git checkout` on a book with a day's uncommitted work in it. ContamCity was
recovered and is parity-clean, at the cost of the book's comments and line wrapping. The exporter writes each
format's own block by name — `g[format]`, so a twenty-first instrument exports the day it is authored — plus
`guide`, `background`, `rules`, `hint`, `goals`, `concept` and `warmups`. **A recovery path nobody has
exercised is not a recovery path**, and the way to exercise this one is export → import → `bookParity`.
