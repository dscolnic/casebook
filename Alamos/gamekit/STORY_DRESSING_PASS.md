# The story dressing pass — Whiteout, Overwind, Boomtown, Wildtype

**Status (9 Sept 2026): implemented.** Every numbered item below is built, in
`themes/<t>/story.js` (outdoors in `storyOutdoors`, rooms in `dressRoom`, the
extra pass in `storyExtras`), on two engine additions: `engine/world/paper.js`
(`statusPanel`, `slip`, `tallyRail`, `fixturePlaces`, `missionsAccepted`) and the
interior state hook (`spec.dress` / `room.applyState` in
`engine/world/interiorBuilding.js`, wired from `createInteriors` in
`engine/core/app.js` through `theme.dressRoom`). Landmark rooms opened with
`enter:` and a `minors.js`: Whiteout's Mess & Bunks and Medical Bay, Overwind's
Lamp Room and Change House. Beyond the list, each campaign got an extra pass:
Whiteout plays an afternoon into polar dark with an aurora and a runway-control
beacon; Overwind has puddles, crows on the headframe and a chimney; Boomtown a
crane, a food truck, cook-fires and ravens; Wildtype a lighthouse with a turning
beam, seals, a buoy and rabbits. The list is kept as written, as the record of
what was asked for and why.

Read against the current bibles in `books/parts/bibles.json` (WHITEOUT v2.13,
OVERWIND v1.2, BOOMTOWN v1.2, WILDTYPE v1.2): every mission briefing, every
`**World state:**` and `**State/output:**` line, the §7.1 persistent ledgers, the
§3 landmark prose, the Physical-aftermath and Prop-state blocks, the opening and
ending cards. Then walked against what `themes/<t>/props.js` and `site.js` build
today.

**The diagnosis in one paragraph.** `DRESSING_PASS.md` filled the *places* — spoil
heaps, tent rows, reed beds — and they are better for it. But the bibles are not
about places; they are about a *situation that changes fifteen times*, and almost
none of that reaches the world. Overwind's bible writes twelve physical aftermaths,
each with a home fixture, a before and an after, and we render two. Wildtype names
fifteen prop states and nine "alive-world states" and we render trays greening and
a cart filling. Boomtown's fifteen world-state lines are a town visibly changing —
queues, shutters, placards, a ribbon — and the mesa looks the same on day 15 as on
day 1. Whiteout has a rescue window counting down from 36 hours, a storm, and an
aircraft, and the plateau is Ice Core's with the tower swapped for a mast. The
stories are set *indoors at fixtures*, and the interiors are the shared fit-out with
the bible's fixture names on them. That is where the gap is.

Two rules carried from the last pass. **Player-facing copy is the bible's**: a sign,
a slip, a board can print a line the bible wrote (`BRAKE PAGE OPEN`, `LIVE STABLE /
RECOVERY UNVERIFIED`, `TRIAL ONLY`) and nothing we compose. **Place, props and
motion are ours.** Everything below is one or the other.

Items are numbered per campaign, grouped by what drives them, and marked
**[static]**, **[ambient]** (moves every frame, no campaign state) or
**[M n]** (changes when mission n's decision is accepted — read from
`getState()` through `stateHooks`, the hook `campaignState()` in Overwind and
Boomtown already uses).

---

## 0. Cross-cutting — the engine gap this pass runs into

Read this first, because the biggest single item is not dressing.

- **Interiors have no campaign-state hook.** `outdoorTown.js` gives outdoor props
  `stateHooks` (line 65, run at 377). `interiorBuilding.js` and `interiorKit.js`
  have none — the only thing a room refreshes on entering is the delivery board
  (`app.js:364`). **Every one of the bibles' state changes is on an interior
  fixture** (the Winder desk, the Sample Bench, the Public Notice Board, the Load
  Board). Until a room's fit-out can read the campaign, all four campaigns' stories
  are invisible from inside the rooms where they happen. Recommend: `fitOutRoom`
  returns an optional `onState(state)` (or pushes into a `ctx.stateHooks` mirror),
  called from the same `onEnter` that refreshes the board, and again on day
  change while the player is inside. One engine change unlocks ~40 of the items
  below.
- **A fixture's face should be paintable.** `screens.js` has `plot`, `panel`,
  `vitals`, `film`. What the bibles want on a board is a *short authored line and
  a state* — `ALL GREEN` → `LIVE STABLE / RECOVERY UNVERIFIED`; `LOCKED` → `OPEN
  ON FINAL RELEASE`; `3 FILLED` → `4 FILLED`. One `status` painter — title, one
  big line, one small line, optional strike-through — repainted on state, covers
  Whiteout's incident boards, Overwind's shift board, Boomtown's notice board and
  Wildtype's pond panel.
- **A clipped slip is the unit of the Overwind and Wildtype stories** — "Ruth
  clips it behind the restricted sheet", "Nell clips each card to its packet",
  "Ada pins her signed check beside the traces". A tiny `slip(parent, x, y, z,
  {text, pinned, struck})` in `interiorKit` — a paper rectangle with a pin or clip
  and up to two lines — spent twelve times in Overwind and fifteen in Wildtype
  is more story than anything else in this document.
- **`fitOutRoom` is a stub in three of the four** (`export function fitOutRoom(){}`
  in Overwind, Boomtown, Wildtype). Whiteout's exists. The bibles wrote a physical
  appearance for every fixture (Whiteout's §3.1 has 33 one-line appearances:
  *"a sealed cabinet with a tethered identity strip and a guarded live
  connector"*). The rooms should be fitted from those descriptions rather than the
  shared generic set; that is the same kind of work as the outdoor dressing, one
  room at a time.
- **Doors that open on a campaign event exist** (`sealable`, `outdoorTown.js:380`)
  and are used by nobody in the four. Whiteout's Runway Door and Overwind's
  passenger gate are both written as doors that open on the last mission.
- **Weather kinds are `rain drizzle snow dust`.** Whiteout should be *in* the
  storm it is named for; Boomtown's mesa should have dust; nothing sets weather
  per mission yet, and Whiteout's bible has the storm *not* lifting at the end
  ("The storm has not gone").

---

## 1. Whiteout — Aster Station, 36 hours, a storm that does not lift

The bible's spine: every alarm is real to the eye and false in the code; the
rescue window ticks down two hours per mission on the briefing header (36 → 8);
Mission 15 opens the Runway Door and lands a plane. Today the site is Ice Core's
camp with the drill tower turned into a comms mast, plough banks, drums, two met
masts and a scooter. Nothing about it says *cut off*, *counting down*, or *rescue*.

### The storm and the window — the frame every mission sits in

1. **[ambient] Be in the whiteout.** `weather: 'snow'` at heavy density with a
   short fog distance (visibility 40–60 m) for M1–M14, so the modules loom out of
   the white as you walk. Ice Core is a clear-day plateau; this is a station
   nobody can reach. The ending card says the storm has not gone — so M15 lifts
   it only to *runway visibility*, not clear sky.
2. **[M n] Snow accumulates against the doors.** The `drift()` helper exists.
   Scale the drifts against each module's lee wall by mission number: M1 a skirt,
   M8 window-sill height, M14 a wall of it with a shovelled slot to the door.
   Reads "we have been shut in for a day and a half" without a word.
3. **[ambient] Blowing-snow ground streamers** — `scrollUV` on three long,
   low, half-transparent planes across the ring, so the ground itself moves. The
   most visible single motion on an outdoor snow site and we have none.
4. **[M n] The rescue-window clock outdoors.** A tall status board at the spawn
   (OPS's outer wall) that prints the bible's own header line for the current
   mission — `RESCUE WINDOW — ABOUT 36 HOURS REMAIN` … `ABOUT 8 HOURS REMAIN`.
   Bible copy, verbatim, one line per mission. The whole campaign's tension is
   that number and it appears only on a card.
5. **[ambient] Flag lines whipping.** Ice Core has flag lines (the Antarctic
   route markers); Whiteout inherited the geometry. Give the flags real `sway` at
   storm rate, tattered, and run them module to module — the only way you find
   the next door in a whiteout. They become the route markers the player uses.
6. **[ambient] Every window is lit, and lit warm.** Twenty-eight people are
   inside. `setWindowGlow` on all six modules plus MESS and MED at full, day and
   night; the storm makes it dusk at noon anyway. Modules dark inside read as
   abandoned.
7. **[ambient] Generator sound and exhaust.** POWER's stack with a `sway`ing
   heat-shimmer plume (unlit, half-alpha) and the low set running. M1 is about
   whether the generator is failing; it should be visibly, audibly *running*.

### The rooms — where the whole story happens

Whiteout's 33 fixtures each have an authored appearance (§3.1) and the
`**World state**` lines are almost all changes *on* those fixtures. This is the
campaign where item 0's interior hook pays most.

8. **[M1] Load Board**: `HEAT EMERGENCY` in red → `OUTPUT 83 kW / SOFTWARE ALARM
   CLEARED` (bible S/O line 1196). A big-line status panel; the red band goes.
9. **[M1→2] The Habitat tile flashes `SCRUBBER: 2 COMMANDS / 1 SENSOR`** on the
   OPS Systems Map after M1 (World state 943) — the next problem *announced on a
   board in a different room*, which is how the bible hands off every mission.
   The Systems Map should be the campaign's status wall: six module tiles, each
   printing the current bible-named state.
10. **[M2] Alarm Cabinet command counter**: two → one (World state 1518). The
    bible describes "a visible command counter and a sleeved shutdown handle" —
    build the counter as a mechanical digit that reads 2, then 1.
11. **[M3] Rover Three in the Vehicle Bay** — physically present, on the
    diagnostic cart's sockets, its status pane repeating `MARKER 3` (1518) until
    M3 accepts, then `HEALTHY / REPAIRED` (2342). After M13 it *leaves*: it is
    the relay on the four-waypoint route (8063, ledger 13) — see item 22.
12. **[M4] Code Review Wall turns amber** on the shared utility and the live
    patch queue freezes (2664). A wide monospace display — paint the bible's
    fragment `normalizeState(...)` highlighted; the wall is the one fixture with
    thirteen stops on it and should be the room's whole far wall.
13. **[M5] Version Rack**: two tagged controller replicas, `C17` labelled
    `SIMULATION OBJECT`, `P02` `LIVE OBJECT` (3320); after M11 the shared
    warning arrow between P02 and H04 is replaced by two separate cards (6739,
    6904). Physical: two small cabinets on a shelf with tags that change.
14. **[M6] Emergency Radio and the wall display disagree**: raw `08:07` beside
    display `08:0` (3248, 3776), corrected to `08:07` both after M6 (3814). Two
    small screens in COMMS, one wrong by a character. Perfect visible bug.
15. **[M7] Sensor Wall room labels**: Room 7 `4.1°C` beside a probe reading
    `20.9°C` (3814, 4341); corrected mapping after M7 (4372). The wall is "a room
    plan fitted with numbered sensor labels" — paint the plan with four rooms and
    their temperatures, one wrong then right.
16. **[M8] Shift Log Desk**: the processed timeline missing every second entry
    beside the raw roll (4905, 5015); six records restored after M8 (4943). A
    paper roll from a fixed reader with visible gaps, then no gaps.
17. **[M9] Route Table**: a gridded survey map with a magnetic crevasse marker
    at `[0][1]` and the rover display marking `[1][0]` (5469); both agree after
    M9 (5509). Two 4×4 grids side by side, one token moves.
18. **[M10] Message Queue Board pass clock** — a shrinking satellite-pass
    countdown (6039) and `RESCUE 122.3 MHz` locked after (6323). The board
    description has "a visible pass clock": a real countdown that runs while the
    player is in the mission.
19. **[M12] Rescue Board**: `10 SECOND BURST` limit and six candidate message
    fields (7189); four marked `SEND`, two `LOCAL ONLY` (7311). Magnetic board,
    six cards, tags flip.
20. **[M13→14] `ADJACENT CASES: UNTESTED`** stays on the rollback panel while
    every dashboard is green (7812, ledger 13). Then M14: Incident Console
    `ALL GREEN` → `LIVE STABLE / RECOVERY UNVERIFIED` "in text and icon form"
    (8665). The campaign's best beat — the whole room goes green and one panel
    says no — and it is a status painter and a colour.
21. **[M14] Weather Mast Console posts `PRIMARY ANTENNA ICING`** (7237) — and
    outside, the comms mast's dish and aerials *ice up*: a white shell mesh
    scaled up on the mast elements after M12, item 5's flags stiff. The
    External Mast Walk landmark exists in §3 for exactly this reason.

### The rescue — M13 to the ending

22. **[M13] Rover Three drives the relay route.** After M13 the rover leaves the
    bay and `patrol`s a four-waypoint loop out to the mast and back (8063: "Rover
    Three entering the four-waypoint route"), lamps on, in the snow. The only
    moving vehicle on the site, and it is the plot.
23. **[M15] The Runway Door.** §3: "stays shut until final rescue readiness and
    the canary gate are satisfied"; ledger 15: "the Runway Door opens"; World
    state 8998: "Runway lights switch on, the rescue aircraft appears through the
    doorway, touches down, and taxis into view". Use `sealable` on RUNWAY; on
    M15's acceptance: door slides, a line of runway edge lights `blink` on down
    the runway (the old skiway is already graded), an aircraft mesh `patrol`s
    from far end to the apron and stops with a beacon `blink`ing. The ending card
    then fires. Everything here is written in the bible and nothing is built.
24. **[M15] Indicator by the door**: `LOCKED` → `OPEN ON FINAL RELEASE` (8990),
    a status painter on the door frame, red then green.
25. **[static] Runway threshold markings and a wind sock** at the far end of the
    skiway, sock `sway`ing hard in the storm, so the runway reads as a runway
    before day 15 and the player knows where the plane will come from.

### Landmarks that carry the human stakes

26. **[static] Mess & Bunks**: "The crew eats, sleeps, and argues here." Twenty-
    eight bunks visible through the window, coats on hooks, a long table. Crowd
    seated (the seat convention exists). Today it is a closed box.
27. **[static] Medical Bay**: "Human consequences of cold or poor air are visible
    here" — two occupied cots, an oxygen bottle, a thermometer board. The bible
    forbids making it a quiz; it asks that it be *visible*.
28. **[M7] Room 7 stays occupied** (ledger 7) — a lit window on the HAB side
    labelled 7 whose light never goes off.

---

## 2. Overwind — Kerrow No. 3, twelve days to the inspector, forty-one tallies

The bible is the most physical of the four: twelve `### Physical aftermath`
blocks, each with a **Home** fixture, a **Before** and an **After — exact
action**; a brother's tally on a hook; a gate that opens on day 12. We built the
yard (spoil, tubs, ropes, timber, weighbridge, fan house, ponds), the moor
(wall, sheep, peat, cairns, telegraph, wreck), the cage bobbing, and two state
hooks (shift board slips, gate on day 12). The twelve aftermaths are the list.

### The twelve aftermaths — one per day, each a clipped paper

All are `slip()` items on an interior fixture (item 0). Bible copy is the label.

1. **[M1] `signal-board`** — Ruth removes the posted fast-start proposal and
   clips it behind the restricted sheet. Before: proposal posted. After: gone;
   restricted sheet on top.
2. **[M2] `drum`** — Ewan ties the superseded tag through the drawing clip. A tag
   reading `SUPERSEDED` appears on the drum drawing in the Winder House (World
   state 1501).
3. **[M3] `rope-bench`** — length tags loose beside measured rope ends → each tag
   attached to its sample record. Four rope-end samples on the bench, four tags
   that move from a pile to the samples.
4. **[M4] `winder-desk`** — the load-envelope card clipped to the system drawing.
5. **[M5] `pad-bench`** — the cold-test slip clipped to the worn-pad tray "with
   its limits visible". Also: the energy page accepted *while the brake page
   stays open* (3491) — two clipboards, one closed, one open.
6. **[M6] `bin-bolts`** — the staged-feed tag beside the fracture photographs.
   Build the broken bin bolts as a real thing: a tray of sheared bolts and two
   pinned photographs at the Tip.
7. **[M7] `level-book`** — Nia's reference tab against the corrected entry
   "without erasing the original" at the Gravity Station.
8. **[M8] `winder-desk`** — Ewan posts the power-only sheet; Ruth writes `BRAKE
   PAGE OPEN` across it (M8 outcome). One sheet, then a second layer of red text.
9. **[M9] `signal-board`** — a second box added beside the drum-check box for the
   cage trace (6484 "Record separate drum and cage stopping histories").
10. **[M10] `march-board`** — "The March board replaces the sealed inquiry
    drawer" (6835). Before M10 a locked drawer with a seal; after, a board with
    two traces and Ada's signed check pinned below (6953–7167).
11. **[M11] `test-trace`** — the transparent conditions sleeve closed around the
    warm-surrogate record.
12. **[M12] `winder-desk`** — the slower timetable pinned *above* the crossed-out
    overtime promise. A struck-through sheet is the most legible "we lost
    something to be safe" in the whole set.

### Finn's tally and the forty-one — the human thread

13. **[static→M12] The Lamp Room.** §3: "Forty-one numbered lamps record who is
    below"; site.js sub says "forty-one lamps, forty-one tallies" and the room is
    a closed landmark. Open it (`enter:`), build a wall of 41 numbered hooks with
    41 brass tallies hanging, lamps on a charging rack opposite. M1 outcome: "Her
    brother Finn's tally stays on the hook with the other forty; no one boards
    for a test." M12: the tallies *come off the hooks* — the shift goes below.
    This is the payoff of the entire campaign and it costs one room.
14. **[M12] The shift walks through the gate.** After the passenger gate opens,
    a `patrol` of eight miners with lamps from the Change House to the Bank and
    into the cage; the cage descends once. "Ruth can call the shift forward"
    (ledger 12).
15. **[M1–11] Nobody goes below.** Until M12 the crowd at the Bank stands
    *outside* the chained gate; a few sit on the timber stack. Waiting is the
    situation the stake lines keep naming ("the crew who need their shifts
    back"). Crowd seat points on the stack and the Change House step.
16. **[static] The Change House** (`enter:`): rows of pegs with coats hung high
    on chains — the real thing — and the shift board on the wall. Ownership of
    the "where a shift starts and ends" line.

### The machine and the March inquiry

17. **[M1→12] The start control gains a tested acceleration stop** (M4 ledger)
    — on the winder in the Winder House a red physical stop block fitted to the
    lever quadrant after M4. The winder itself: the drum with the rope *on* it,
    brake bands, the lever, the depth indicator dial (BANK fixture) whose needle
    moves with the cage.
18. **[ambient] The depth indicator tracks the cage.** The cage already bobs on
    a `patrol`. Drive the Bank's depth indicator needle and the Winder House's
    duplicate dial off the same clock. It is a graded fixture in M1, M9, M12.
19. **[M9] A hanging test mass that keeps bouncing** (5511: "A hanging test mass
    keeps bouncing after the support is still") — in the Rope Shop, a 1 m rope
    sample with a mass on it that `bob`s at the bible's ω = 1.25 rad/s (period
    5.03 s) from M9 onwards. The physics lesson, animated at its own number.
20. **[M10] The March tape.** "The March tape is unsealed for comparison"
    (6173). A sealed evidence drawer at the Shaft and Brake House with a wax seal
    and an inquiry label until M10; then open, tape spool out on the board.
21. **[static] The wrecked drum on the moor gets its meaning.** It is there as
    dressing; give it a small fenced enclosure and a dated plate — no invented
    copy, a plain date plate is a prop — so it reads as *the* earlier accident
    the inquiry is about rather than scrap.
22. **[M6] The staged chute appears** at the Tip bin after M6 ("A staged chute is
    marked for installation beside the bin", 4160) — first as a chalk outline and
    an `INSTALL` tag, and by M8 as steel: a two-step chute above the bin. The
    ore stream on the belt (item 23) then falls in two stages.
23. **[ambient] Ore on the belt.** The conveyor is a static mesh today — `scrollUV`
    is imported and unused. Run the belt, add lumps riding it and dropping into the bin with a dust puff; the
    belt *trips* (stops, restarts) every ~40 s until M6, then runs clean. World
    state 3491: "The conveyor trips even when the load on its belt is small."
24. **[ambient] The weightometer needle** on the belt bounces with each lump.

### Sky, weather, day

25. **[M n] The inspection countdown** on the shift board's header: `INSPECTION
    IN 12 DAYS` … `IN 1 DAYS` — bible header copy, verbatim, one line per day.
26. **[ambient] Moor weather that means something** was item 20 of the last pass
    and is still not set: drizzle on most days, clear on day 12.
27. **[ambient] Steam from the fan house and the compressor house exhaust
    beat** — the compressor is "air for the drills below": a rhythmic puff every
    2 s from a stack.

---

## 3. Boomtown — a mesa town six weeks into a boom, and the boom is the story

The bible's fifteen world-state lines (one per mission) are a town changing in
public: queues, shutters, placards, a ribbon, a job board. `campaignStreet()`
already does M3 shutters, an M10–14 ribbon and an M15 signed sheet; `queues()`
and `market()` are static. Twelve more state lines are unbuilt, and the town has
nothing that says *six weeks to the freight agreement*.

### The public board — the town's own status wall

The bible's `bt-public-notice-board` is "a cork board with fifteen labelled
agreement slots behind a clear cover" in the Civic Advice Office, and four of the
world-state lines are *about it*. Build it twice: inside T as the fixture, and a
copy outside T's door as the town's notice board (`site.js` board is already
'Town Notices').

1. **[M n] Fifteen slots fill.** One agreement card per mission, slotted in on
   acceptance; the card prints the mission's own recommendation line (bible "D."
   final answer — *"Trade two meal boxes for one repair hour"*). Fifteen cards
   by the end. This is the delivery board's story told on a board the player
   walks past every day.
2. **[M2] The old-price order count beside the new sales receipt** (1601) —
   two pinned papers.
3. **[M11] The pact's guaranteed-service stamp revoked, forecast relabelled
   conditional** (9111) — a stamp with a red line through it.
4. **[M14] The new-line ribbon disappears from the public board** (11615) — the
   ribbon is built at the street; put its twin on the board and take both down.
5. **[M15] The unsigned final agreement, `READY TO SIGN AFTER RESOURCE CHECK`**
   (12446), then signed.
6. **[M n] Header line:** `SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE n OF 15`
   at the top of the outdoor board, bible copy.

### The street changes — the twelve unbuilt world-state lines

7. **[M1] Nico marks two meal crates for the repair crew** (772) — two crates
   with a tag appear on the diner's bench outside CM; the lunch queue appears
   (M1 payoff "reopens its lunch queue"). `queues()` should be *off* before M1
   and on after.
8. **[M2] The queue grows past the door** (M2 briefing: "the lunch queue still
   stretches past the door") — queue length 4 → 9 → 14 between M1, M2, M4, and
   shrinks after M4's fourth cook.
9. **[M3] Guesthouse vacant-room cards flip to available** (2440) — the Mesa
   Guesthouse gets a rate board by the door: a `VACANCY` card that flips. The
   shutter work exists; add the board.
10. **[M4] One job card appears; a second stamped `HOLD FOR EQUIPMENT REVIEW`**
    (3274) — on the Job Board at P and on a copy outside the diner.
11. **[M4] The baker loses a worker** (M4 payoff: "The filled job draws a worker
    away from the bakery") — one crowd walker moves from the bakery stall to the
    diner queue's staff side. A person changing where they stand is dynamic
    dressing at zero mesh cost.
12. **[M5] One row of lease cards turns to reduced rent; forty application
    tokens remain waiting** (4103) — outside P, a rack of forty tokens that does
    *not* shrink. The M5 teaching is that the cap does not house them; the visual
    is forty tokens still there.
13. **[M6] The delivery board loses twenty bookings** (4946) — at the E freight
    yard, a slot board with fifty slots, thirty lit after M6, and twenty pallets
    fewer in the yard.
14. **[M7] The supplier's shutter stays open and the lease review appears beside
    it** (5779) — the Supplier Shelves; and outside, a small shopfront in the
    market row with its shutter *down* until M7, then up.
15. **[M8] Vendor permit placards appear at the supply shelves** (6611) — and
    two more market stalls (last pass item 16, not built). The mission is called
    A STREET FULL OF SIGNS: hoardings gain pasted bills each of M8–M10.
16. **[M9] The job board changes from three to four filled posts** (7441).
17. **[M10] The freight wall map keeps thirty unused slots lit beside the entry
    barrier** (8274) — the same slot board as item 13, now with the barrier.
18. **[M12] The catchment map adds the measured damage cost beside the pond
    photograph** (9944) — and *the pond itself*: Ashley Pond gets a discoloured
    inflow reach and a sampling post with a dated photograph on it. The Water
    Record Desk "has a rack for sample photographs".
19. **[M13] The untaxed filter quote pinned to the compliance plan; the tariff
    transfers gain their own column** (10777) — at X.
20. **[M14] The retrofit receives the full-range test label** (11615).

### What a boom looks like that we have not built

21. **[ambient] Freight arrives.** The bible: "Mine and railroad exist only in
    contracts, photographs and dispatch records, off-map." So the freight comes
    by road: a pickup and a box truck `patrol` the bridge road from the
    checkpoint to the E yard and back every few minutes, headlights at dusk. The
    approach dust plane exists; a truck should be making it.
22. **[ambient] People in a hurry.** Boom crowd: walkers between the modular
    homes, the diner and the offices at 1.4× speed, carrying things (a box, a
    tube). The current crowd is Project Y's stroll.
23. **[static] The clinic has a queue too** and a `CLINIC` cross; the theatre
    has a marquee with the meeting-hall hearing dates (bible copy: hearing
    records exist; the dates can be plain).
24. **[static] Modular homes have people living in them**: bikes against walls
    ("bicycles stay" — §3), washing lines, a barbecue, chairs out front.
25. **[static] Parcel collection** — "Censorship mail signage becomes parcel
    collection" (§3): a parcel shelf under a lean-to with a sign, at the old
    censorship-mail spot, packages stacking up by mission.
26. **[static] Delivery and worksite access signage** at the five compound
    gates (§3 says security signage becomes this) — the posts exist from Project
    Y; the sign faces should be the modern kind.
27. **[M4→] P and X open.** §3: "P and X task access opens after Mission 4,
    using the existing gate routes." Seal P and X (`sealable`) until M4; the
    two compounds' gates are chained and the doors dim, then open. Today all
    five are open on day 1.
28. **[ambient] Dust.** `weather: 'dust'` on the mesa afternoons; it is the one
    weather kind we have that nobody uses.

### The mesa itself

29. **[static] The canyon rim is the view** and the rail at radius 96 is a rail.
    Put three viewpoints on the rim with benches facing out; the horizon ranks
    exist. Cheap and the only place the site's geography reads.
30. **[static] Freight Contract Office wall map** — "a pinboard rail map with
    twine routes and removable capacity labels" — twine routes are three lines
    between pins; do it literally.

---

## 4. Wildtype — Pellow Head, fifteen days to a ship, an island that is alive

The bible names nine "alive-world states" in §3 and fifteen prop states (one per
mission, each at a named fixture). We built the marsh, grazing, orchard, shore,
insects, hedging, a ship and cart, and trays that green. The nine alive states
and the fifteen prop states are the list, and two of them — the pond tanks and
the ship offshore — are the campaign's climax.

### The nine alive-world states (§3, verbatim list)

1. **[M1] A bird feeds beside the sample cart.** One gull or wader on a `bob`
   pecking at the cart's wheel, from M1. Trivial, named, absent.
2. **[M3] Pond tanks carry visible DAY and NIGHT readings.** The Growth Hall
   needs the *pond tanks* — a row of glass tanks with a panel per tank reading
   `DAY` / `NIGHT` values (bible fixture `pond-tanks`). Missions 3, 13, 14 sit on
   them.
3. **[M5] Flowers near the nursery have few visitors while the dune trays remain
   visited.** The insect `bob` clusters exist; from M5, the clusters over the
   nursery beds thin to one and the clusters over the dune trays stay at four.
   The lesson, visible from the path.
4. **[M6] A held tissue tray behind a labelled barrier** — `held-tissue-box` at
   `culture-rack` in the Clinic: a tray behind a red tape barrier with the
   bible's `HOLD` label (4371).
5. **[M9] The same seed families display different leaf forms in adjacent
   pots.** In the Growth Hall, two pots side by side with the same family card
   and different leaf meshes — one lobed, one entire. After M9 the shape-only
   tags are gone and the ancestry cards remain (6542).
6. **[M10] Dated insect emergence strips inspectable** at the Marsh bay's
   `habitat-board` — a row of strips "pinned in generation order with the
   archive span left visible" (7252).
7. **[M12] Partner jars gain specific test labels** — at the `sample-cart`, the
   `partner-box`; and on the storage rack, jars.
8. **[M14] The dawn pond panel reads `LOW OXYGEN` and the ship appears
   offshore.** Two things: the pond tank panel goes to `LOW OXYGEN` (bible copy)
   with a `night-hold-seal` card under a seal (10151); and the ship — today it
   is built and static all campaign — should be **absent until M14**, then
   arrive offshore and hold at anchor, lights on at dusk. "The ship waits for a
   plan that covers the whole day" (10811).
9. **[M15] The island reserve remains visibly stocked after the cart leaves.**
   `reserve-jars` on the `storage-rack` stay full while the covered cart rolls
   from the Ship's Store down to the jetty (10864: "the covered cart moves to the
   ship; the reserve stays ashore"). The cart `patrol`s once, the ship's gangway
   takes it, and the ship *stays* — the ending card is written on the island.

### The fifteen prop states not covered above

10. **[M1] `feed-tin` at `sample-bench`** — the incomplete mix withdrawn, the
    tested tin on the handoff tray (745). Two tins, one moves to a `WITHDRAWN`
    side.
11. **[M2] `rinse-bottle`** — old bottle capped and on the withdrawn side, the
    matched rinse in the active tray (1474).
12. **[M3] `vent-lids` at `growth-bench`** — vented lids on the pots, "their
    open slots remain visible". Last pass item 18, still unbuilt.
13. **[M4] `lamp-lock-tag` at `light-panel`** — `TRIAL ONLY` tag on the handle;
    "only the existing trial remains lit": four grow lamps on in one bay, the
    rest off. Last pass item 17, still unbuilt — and the lamps make the Growth
    Hall glow at night from outside, which is the building's whole silhouette.
14. **[M5] `staggered-trays` at `field-bench`** — early and late flower trays set
    apart under date cards.
15. **[M7] `family-clips` at `seed-table`** — each card clipped to its packet.
16. **[M8] `enzyme-sleeve` at `dna-bench`** — the archived tube sleeved, sleeve
    reading `LEAD — CAUSE NOT COMPLETE` (5811).
17. **[M11] `reserve-jars`** — labelled reserve jars separated from travel jars;
    "the reserve shelf remains stocked" — two shelves, one grows, one does not.
18. **[M13] `receiving-core` at `field-bench`** — two soil cores side by side,
    island and receiving, with the preparation record clipped.

### The living island — what is alive and what is not

19. **[ambient] Tide.** Last pass item 19, unbuilt. Half a metre on the shore
    and the marsh over a slow cycle, the strand line wet then dry. The Field
    Notice Board (item 24) gives tide hours; the sea should keep them.
20. **[ambient] Birds that fly.** The bible says nesting state "without requiring
    bird animation" — but the flocks were built as `patrol`s; make sure they
    *land*: circle, settle on the marsh, lift when the player comes within 15 m.
21. **[static→M n] Fenced nesting patch** in the dune grass with text signs that
    "report the nesting state" (§3): the sign's state changes twice across the
    fortnight — plain state words, not composed prose.
22. **[static] Wrack along the beach with dated survey labels** (§3): the kelp
    strand exists; add three survey stakes with dated count labels that update
    on M10 and M13.
23. **[ambient] The Generator House "quiet running set"** — exhaust puff and a
    hum; the door open with the set visible.
24. **[static] The Field Notice Board** at (10, 54) — §3: "tide, nesting and
    visiting hours". Three columns on the station board; the tide column
    is the tide item's clock.
25. **[M1→15] Trays go from pale to green** is built — extend it: the *outdoor*
    nursery beds under hoops follow the same state, and after M5 half of them
    are in flower (flower sprites), which is what the insects in item 3 visit.
26. **[static] Quarantine porch at the Clinic** — boot-wash tray, coat rail,
    a `sample-cart` bay (last pass item 10). The Clinic is where six missions
    start and it has no threshold.
27. **[ambient] Sea haze mornings, `drizzle` some days**, clear on day 15 for the
    ship. Never set.

---

## 5. What to build first, if the answer is not "all of it"

In order of story-per-hour:

1. **The interior state hook and the `slip()`/`status` painters (§0).** Nothing
   else in this document works indoors without them, and the bibles put the
   story indoors.
2. **The four climaxes**: Whiteout's Runway Door + aircraft (1.23), Overwind's
   Lamp Room tallies + the shift going below (2.13–14), Boomtown's fifteen-slot
   public board (3.1), Wildtype's ship arriving on M14 and the cart leaving on
   M15 (4.8–9). Each is one hook and a `patrol`.
3. **The weather**: snow on Whiteout, dust on Boomtown, drizzle on the moor and
   the island. Four lines in four site files.
4. **Overwind's twelve aftermaths** as slips — a checklist, one an hour once
   the painter exists.
5. **Boomtown's street states** 3.7–3.20 — the town visibly changing is the
   whole point of a boom.
6. **Wildtype's nine alive states** 4.1–4.9.
7. **Whiteout's rooms** 1.8–1.21 — the one campaign whose fixtures were
   described object by object and are still the shared fit-out.
