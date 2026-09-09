# The dressing pass — Overwind, Boomtown, Wildtype

Three campaigns whose ground is correct and empty. The buildings stand where the
bible puts them, the fixtures are inside, and between them is bare terrain: a
brown moor with one shed and a pole, a mesa road with a lodge on it, a dune
compound of four grey boxes. A player walks two hundred metres across nothing to
reach the next question.

**This is the list, not the work.** Every item below says where it goes, what it
is made of, and what it is *for* — because a prop that is only decoration is
weight the frame budget pays for and the player never reads.

---

## What the engine already gives you

Nothing on these lists needs new engine code. The vocabulary, so the lists can
be read as buildable rather than as wishes:

| From | What it gives |
| --- | --- |
| `engine/world/kit.js` | `box` `cyl` `sign` `post` `bench` `bin` `crateStack` `tank` `pipeRun` `fenceRun` `vehicle` `scooter` `bicycle` `quadBike` `utilityCart` `displayBoard` `windTurbine` `gableRoof` `plinth` `steps` `litWindow` `clearSpot` |
| `engine/world/animators.js` | `spin` `blink` `flicker` `sway` `bob` `scrollUV` `patrol` `wander` — `animate(fn)` runs `fn(t, dt, eye)` every frame |
| `engine/world/weather.js` | `rain` `drizzle` `snow` `dust`, set live through `ctx.weather.set(...)` |
| `site.js` | `furniture` (benches, bins, posts), `scrubCount` / `scrubColour` / `scrubBand`, `paths`, `water`, `horizon` |
| `decorate(scene, ctx)` | `ctx.stateHooks` — a callback per campaign state change, which is how a prop *changes* rather than just stands there |

**Three rules that apply to every item.** Placers take `(x, z, y)` with ground
last — house rule 7, six display boards sixteen metres in the air. Nothing goes
over the spawn or across a route — house rule 8, a prop over the spawn welds the
player in place. And every one of these is looked at with `npm run shots` before
it is believed, because *"exports present, meshes created, no errors and a clean
build have all coexisted with an inside-out roof"*.

**Dynamic** below means the item changes with the campaign through
`stateHooks` — it is different on day 12 from day 1 — and that is where most of
the life is. A moor with one thing moving on it reads better than a moor with
thirty things standing still.

---

# 1. Overwind — Kerrow No. 3, a headframe alone on a moor

The place has a headframe, a winder drum, a rope run and a conveyor, and they
are the best things in it. What is missing is everything a working mine puts
*around* those: the moor is a flat brown plane with a shift board on it, and the
290-metre walk out to the gravity station passes one post.

### The yard — what a pit yard has
1. **Spoil heap**, 40 m of it behind the tip, built as three overlapping low
   cones — the reason the tip and conveyor exist, and the only large silhouette
   the site has besides the headframe. *(box/cyl, one-time)*
2. **Tub road and standing tubs** — a narrow-gauge rail line from the shaft
   collar to the tip, with six mine tubs standing on it, two tipped. Rails as
   two long thin boxes; the tubs are `crateStack` with a steel lid.
3. **Rope drums and offcuts** — the rope shop's yard: four coils of used winding
   rope on their sides, one part-unwound, and a rack of test offcuts. The
   campaign's Mission 3 is about rope as a load; this is that argument outside.
4. **Timber stack and prop pile** — sawn pit props under a lean-to, banded in
   threes. Cheap, and it makes the ROPE shed read as a workshop.
5. **Weighbridge** at the yard entrance: a steel plate flush in the ground, a
   small kiosk, a painted stop line.
6. **Lamp room racks** — a wall of numbered lamp hooks visible through the
   change-house door, half of them empty, which says how many are underground.
7. **Fan house and its duct** — a squat brick box with a 1.5 m duct running to
   the collar, the loudest thing on a real pit and currently absent.
8. **Settling ponds**, two, downhill of the tip: shallow water rectangles with a
   dark rim. Uses `site.water`, which the site already supports.

### The moor — the 290 m walk
9. **Dry-stone wall** along the bench track, one course, with a gap and a stile
   where the path crosses it. **This is the single highest-value item on the
   list**: it gives the empty middle distance a line, and it makes the walk read
   as a journey rather than a field. *(A dark albedo here is house rule 6's trap
   — a stone wall taken too dark became a crash barrier once already.)*
10. **Sheep**, eight, `wander`ing inside a bounded band away from the path — the
    only moving thing on the moor, and the cheapest life in the list.
11. **Peat cuttings and stacked turves** beside the track, with a plank barrow
    run — a reason for the ground to be brown.
12. **Marker cairns**, five, at 60 m spacing on the gravity line, each with a
    painted number: the survey line the GRAV station's questions are about.
13. **Telegraph poles** with a real catenary sag between them, following the
    track to the gravity hut, replacing the single bare post.
14. **A wrecked winding drum**, half-buried, off the track — the previous
    engine, abandoned where it fell.

### Dynamic
15. **The cage moves.** A `bob`/`patrol` on the cage in the headframe between
    bank and shaft, with the sheave wheels `spin`ning while it does, stopping
    when it lands. The campaign is *about* cage motion; nothing on screen moves.
16. **The rope creeps** — `scrollUV` on the rope-run texture while the drum
    turns, so the rope is running rather than painted.
17. **Steam from the fan house**, a slow `sway`ing plume, thicker in cold
    weather.
18. **The shift board fills up.** Mission n hangs its evidence slip on the board
    outside the Bank — twelve slips by the end, which is the bible's own
    *"every completed stop slip stays in the log"* made visible. **Dynamic,
    stateHooks.**
19. **The passenger gate.** Shut and chained for eleven days; on day 12 the
    bible says *"the signed range and unoccupied acceptance unlock the passenger
    gate"* — so it opens, and a queue of six people forms at it. **Dynamic.**
20. **Weather that means something**: `drizzle` on the moor most days, lifting
    to clear on the inspection day. The atmosphere block already supports it.

---

# 2. Boomtown — a mesa town six weeks into a boom

The bible is emphatic that the footprint does not change: nineteen buildings,
the same roads, the same pond. But it also says the place is a town that has
just doubled, and none of that is on screen — Fuller Lodge sits on empty dirt
with one vehicle outside. Everything here is *between* the buildings.

### The boom itself
1. **Tent and trailer row** on the west ground beside the existing six trailers:
   twelve more, in two ragged lines with washing lines, a standpipe queue and
   duckboards. This is the housing shortage the campaign argues about, and it is
   the single biggest change to how the town reads.
2. **Construction site** at the P compound: a half-framed building — floor
   plates, stud walls, a stack of lumber, a cement mixer, a portable toilet, and
   a `sway`ing polythene sheet. Boomtown has a construction economy and no
   construction.
3. **Freight yard** at the E compound: pallets, shrink-wrapped stacks, a forklift,
   a container, and painted bay numbers on the ground. The freight agreement is
   the campaign's spine.
4. **Delivery trucks**, three, parked at the gatehouse checkpoint with a barrier
   and a clipboard desk — the "delivery and worksite access signage" the bible
   asks for, in objects.
5. **Modern utility pickups** replacing the jeep styling *within the identical
   colliders*, which the bible states outright and which is still undone. Four
   vehicles, plus the bicycles that stay.
6. **Market stalls** outside the exchange/convenience store: six trestle stalls
   with awnings, crates of produce, a chalk price board. **The price board is
   dynamic** — see below.
7. **Queues.** A line of nine people outside the diner at lunch, four at the
   standpipe, six at the parcel counter. The engine's crowd already places and
   walks people; these are seated/standing clusters with a `wander` radius of
   nearly zero.
8. **Site hoardings** along Trinity Drive: plywood boards with pasted bills —
   room-to-let cards, hiring notices, the hearing announcement.

### The town that was already there
9. **Pond life**: a jetty, two rowing boats, a heron, reeds along the north
   shore. Ashley Pond is a flat blue rectangle today.
10. **Fuller Lodge's porch** — benches, a coffee urn on a trestle, a dog, and
    people sitting. The lodge is the community dining lodge and reads as a shed.
11. **Pine windbreak** thickened on the two exposed sides, with fallen needles
    darkening the ground under them (`scrubBand` does this cheaply).
12. **A dust plume on the approach road**, `scrollUV` on a low plane, so the
    town looks like somewhere things arrive.

### Dynamic — the bible hands you fifteen of these
The Boomtown bible's §2.1 gives one *visible event per mission*, which is
exactly a dressing schedule. Wire these to `stateHooks`:

13. **M1** the diner reopens its lunch queue — the queue appears.
14. **M3** the vacant rooms open — shutters come off two 4-plex windows and a
    "ROOMS" card goes up.
15. **M4/M9** jobs are posted — cards accumulate on the hiring board, one per
    mission, four by the end.
16. **M8** new vendor permits — two more market stalls appear beside the diner's
    old menu.
17. **M10** the unused terminal slots are posted — a bay-number board at the
    freight yard fills in.
18. **M14** *"the new-line ribbon is taken down"* — a ribbon-and-post ceremonial
    setup that has been standing since M10 is struck, and the access retrofit
    board stays. This is the campaign's reversal, standing in the street.
19. **M15** the agreement is funded — the hearing board carries a signed sheet
    and the lamps outside stay lit into the evening.
20. **The price board changes** as the missions settle prices — chalk numbers on
    the market board rewritten per mission, which is a canvas texture repaint,
    the same mechanism the delivery board already uses.

---

# 3. Wildtype — Pellow Head, an island preparing a return

Currently four low grey sheds on sand, a road, and a dune track. The bible's
subject is *living things* and there is nothing alive on screen. This is the
campaign where dressing is not decoration — a biology campaign whose island has
no plants or animals in it argues against itself.

### The living island
1. **Nursery beds outside the Growth Hall** — eight raised beds under low hoop
   tunnels with polythene, half planted, trays of seedlings on trestles, hoses
   coiled. The campaign opens on pale seedlings; here they are.
2. **The marsh**, properly: a shallow water body north of MARSH with reed beds,
   boardwalk on piles, a bird hide, and standing water that catches the sky.
   `site.water` supports it and the bay is currently dry ground.
3. **Bird flocks** — two `patrol`ling flights that circle and settle, plus six
   waders standing in the shallows. The cheapest possible life, and the loudest.
4. **Grazing enclosure** with post-and-wire `fenceRun`, a gate, six sheep or
   goats `wander`ing, and a water trough. Also fixes the "empty middle" problem
   between the compound and the bay.
5. **Seed orchard** — thirty young trees in tree guards in a grid with mown
   lines between them, on the ground east of SEED.
6. **Rock pools and a strand line** along the shore: dark wet rock, kelp, a
   tide line of debris. A coastal island with a clean edge reads as a model.
7. **Insect life** — three or four `bob`bing sprite clusters over the flower
   trays, because the campaign has a pollinator mission.
8. **Windbreak hedging** on the seaward side, `sway`ing in the wind, which also
   gives the flat site a mid-height layer it entirely lacks.

### The working station
9. **Sample cart track** — a worn path with a cart on it between CLINIC and the
   jetty, which is the delivery route the campaign's last mission uses.
10. **Quarantine porch** at the Clinic: a boot-wash tray, a hanging-coat rail,
    a bin marked for waste, a hand-wash stand. Says "contained pilot" in objects.
11. **Cold frames and a potting bench** outside SEED, with labelled trays — the
    family labels the geneticist keeps insisting on.
12. **Water butts and a rain gauge** on the Growth Hall's gable.
13. **A weather mast** with a `spin`ning anemometer — the receiving-site
    conditions the bible says the manifest misses.
14. **The ship.** The campaign counts down fifteen days to a departure and there
    is no vessel: a coaster alongside a jetty, visible from most of the site,
    with a gangway and a deck light. **The single best silhouette available on
    this island.**

### Dynamic
15. **Trays go from pale to green.** The nursery's seedling colour follows the
    campaign's own bar — pale on day 1, green by the end. One material colour on
    a stateHook, and it is the campaign's entire story in one object.
16. **The cart fills.** Mission n adds a covered sample box to the cart by the
    jetty; on M15 the bible says *"the first covered sample cart reaches the
    waiting ship"* — so it moves down the track and up the gangway. **Dynamic.**
17. **Lamp trial** — M4's limited lamp trial turns on four grow lamps in one
    tunnel and leaves the rest dark; M5 halts the wider reset, so they stay that
    way. Visible, and it is the mission's own decision.
18. **Ventilated lids** appear on the pots after M3, which is that mission's
    persistent state and a two-line change.
19. **Tide.** A slow water-level cycle on the marsh and the shore, half a metre
    over the day, so the coast is not a painted line.
20. **Weather**: `drizzle` and a low sea haze on some mornings, clearing by
    midday, using the `dayWindow` the site already declares.

---

## What to build first, if the answer is not "all of it"

Six items, two per campaign, that change how the place reads for the least work:

| | | Why |
| --- | --- | --- |
| Overwind | the dry-stone wall (9) and the moving cage (15) | one gives the empty distance a line, the other makes the campaign's subject move |
| Boomtown | the tent and trailer row (1) and the diner queue (7) | the boom is the premise and neither is on screen |
| Wildtype | the marsh with birds (2, 3) and the ship (14) | the only living thing and the only silhouette |

Each is half a day's work in a theme's own `props.js`, none of it engine code,
and all six are the kind of thing a screenshot settles in one look.
