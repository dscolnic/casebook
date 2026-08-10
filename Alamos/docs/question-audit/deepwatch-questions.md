# Deep Watch — every question, with its answer

**Subject:** Applied physics of sound, buoyancy, gases, navigation; reasoning under pressure  
**Audience:** High school / early undergraduate  
**Content source:** `gamekit/themes/deepwatch/content`  
**Shape:** 15 missions × 3 authored stops = 45 questions. (In play the engine also inserts a callback stop from day 3, drawn from these same lessons.)

---

## Mission 1 — Boat Walkdown

**Objective:** Learn the boat as a system of spaces, not a list of names.

**Stake:** A watchstander who has to think about where the locker is has already lost the minutes that mattered.

### M1.1 — What a walkdown is for

**Format:** SEQUENCE · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> Chief Ferro walks you into the forward space and asks you to learn it. There is equipment down both sides, deck plates over a recess, a hose reel on the bulkhead and two ways out. A submarine survives casualties by being divided: watertight bulkheads keep a fire or a flood inside one compartment instead of letting it have the whole boat, and every space is stored so the people already in it can fight what happens there. Learning a compartment is not sightseeing. It is building the map you will be using by feel, in the dark, with the lighting gone and somebody shouting. Ferro is not telling you what to take in first — that is what he is asking.

**Question**  Learn a compartment in the order the facts depend on each other

**Cards to order** (presented shuffled)

- Find where the pressure boundary runs, because that is what decides whether a casualty is yours or the next compartment's.
- Find both ways out through that boundary, and prove they still open.
- Find what in here could start a casualty — sea connections, cables, stores.
- Judge whether what is in here can fight the casualty those things would start.

**Correct answer**

1. **Find where the pressure boundary runs, because that is what decides whether a casualty is yours or the next compartment's.**
2. **Find both ways out through that boundary, and prove they still open.**
3. **Find what in here could start a casualty — sea connections, cables, stores.**
4. **Judge whether what is in here can fight the casualty those things would start.**

**Why (shown in verdict):** The last card depends on the third: a locker is only the right locker once you know what this compartment can do to you. And the boundary comes first because it is what makes the space a space — at ninety metres it is the difference between a flooded compartment and a flooded boat.

**Takeaway:** A compartment is a pressure boundary first; everything you learn about it hangs off that.

### M1.2 — Every fitting is an argument

**Format:** PROTOCOL · **Area:** ENG · **Place:** Propulsion Machinery

**Scene shown to the player**

> Chief Haruki stops beside four fittings on the same bulkhead and asks you what each one is for. None of them is labelled with its purpose, only with its number. That is normal: the tag says which valve it is, not what happens when you turn it. What a fitting does comes from what it is connected to, and the shape of it — a wheel, a manifold, a locker, a reel — is most of the clue you get when there is no time to trace a line. At depth the sea is on the other side of some of these, at several atmospheres, and opening one you meant to shut is a casualty you created yourself.

**Question**  Match each fitting to what it is there to do.

**Situations to match**

- A wheel valve on a line that passes through the pressure hull.
- A manifold at head height with quick-connect couplings.
- A strapped steel locker with a quick-release catch.
- A flat-folded hose on a reel, beside a small isolating valve.

**Choices offered**

- Opening it at ninety metres admits the sea at ten atmospheres.
- It supplies breathing air, so a space can be entered before its atmosphere is fit to breathe.
- It holds the shoring and plugs that let this compartment fight its own casualty.
- It puts water on a fire, and only once the circuit has been proved dead.

**Correct answer**

1. A wheel valve on a line that passes through the pressure hull.  →  **Opening it at ninety metres admits the sea at ten atmospheres.**
2. A manifold at head height with quick-connect couplings.  →  **It supplies breathing air, so a space can be entered before its atmosphere is fit to breathe.**
3. A strapped steel locker with a quick-release catch.  →  **It holds the shoring and plugs that let this compartment fight its own casualty.**
4. A flat-folded hose on a reel, beside a small isolating valve.  →  **It puts water on a fire, and only once the circuit has been proved dead.**

**Why (shown in verdict):** Each fitting is defined by what happens when it is wrong. The hull valve is the only one with the sea behind it, and the pressure behind it is set by depth — ten atmospheres at ninety metres, which is what makes it the one you never open to find out.

**Takeaway:** What a fitting is for is decided by what is on the other side of it, and at what pressure.

### M1.3 — The trip back without a waypoint

**Format:** CHOICE · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The navigator hands you a written message for machinery control and tells you the marker will be switched off for the walk back. You have been through the boat once. Submerged there are no windows and no landmarks: everything anybody aboard knows about where they are comes from keeping track since the last thing they were sure of. That is dead reckoning, and it is exactly what the boat does with its own position between fixes. Whatever you decide to carry in your head has to work on a real boat — somebody stopping you in a passage, a hatch shut, the lights out.

**Question**  What should you fix in your head before you set off?

**Choices offered**

- The order of the compartments, because a sequence survives being interrupted.
- The number of paces between each hatch, counted on the way forward.
- The route as a series of turns, memorised in order.
- The compartment numbers stencilled on each bulkhead, read as you pass.

**Correct answer**

**The order of the compartments, because a sequence survives being interrupted.**

**Why (shown in verdict):** Dead reckoning fails at the interruption, and a boat is full of interruptions. A pace count does not survive stepping round somebody; a list of turns does not survive taking one extra; a stencilled number cannot be read with the lighting gone. An ordered list of spaces survives all three, because you can rejoin it anywhere.

**Why the others do not hold**

- Paces stop being useful the moment you have to step around somebody.
- Deck colours vanish with the lighting, which is exactly when you need this.
- Wandering works until the boat is dark or on fire, which is when it is asked for.

**Takeaway:** Dead reckoning fails at the interruption, so carry the thing that survives one.

---

## Mission 2 — Contact in the Noise

**Objective:** Work out what is out there before the boat commits to anything.

**Stake:** A contact called wrong is a boat that manoeuvres into the thing it was avoiding.

### M2.1 — Four traces, one of them ours

**Format:** PROTOCOL · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> Four traces are on the broadband display. The watch has been on for six minutes, the boat slowed four minutes ago, and one trace changed when it did. Broadband sonar is passive listening: it hears everything radiating into the water, which includes the ocean itself, the animals in it, the ships on it, and always the boat you are standing in. Sorting them is the first job of the room, because nothing can be tracked until it is identified, and the sea is full of noise that looks like a contact for a few minutes. Commander Vance wants a picture of what is out there, not a count of lines.

**Question**  Match each trace to what is making it.

**Situations to match**

- A steady hiss whose level rises and falls with our own turn count.
- A narrow line at a fixed frequency, drifting slowly in bearing.
- Short chirps with no bearing rate at all, gone within a minute.
- Two lines an octave apart, bearing barely moving, growing louder.

**Choices offered**

- Own-ship machinery, because it follows our own throttle.
- A merchant on a steady course, her blade rate showing as a line.
- Biologic — it does not behave the way a hull has to.
- A contact closing on a steady bearing, which is the dangerous one.

**Correct answer**

1. A steady hiss whose level rises and falls with our own turn count.  →  **Own-ship machinery, because it follows our own throttle.**
2. A narrow line at a fixed frequency, drifting slowly in bearing.  →  **A merchant on a steady course, her blade rate showing as a line.**
3. Short chirps with no bearing rate at all, gone within a minute.  →  **Biologic — it does not behave the way a hull has to.**
4. Two lines an octave apart, bearing barely moving, growing louder.  →  **A contact closing on a steady bearing, which is the dangerous one.**

**Why (shown in verdict):** Own noise moves with own machinery, and biologics ignore the rules a ship obeys.

**Takeaway:** A source that changes when the boat changes belongs to the boat.

### M2.2 — The trace that will not resolve

**Format:** DIAGNOSIS · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> The fourth trace is faint, has held nearly the same bearing for eleven minutes, and does not appear on the narrowband display at all. The boat has not changed speed or depth since it appeared. Broadband hears the total sound a thing makes; narrowband picks out the pure tones machinery produces at fixed frequencies, which is usually how a contact gets a name. Sound in the ocean does not travel in straight lines — temperature layers bend it, and the path a sound took shapes what survives of it by the time it arrives. So a missing line is evidence too, not a blank space where evidence should be.

**Question**  Which explanation fits every reading, not just the loudest one?

**Panel headline**  A faint trace has held the same bearing for eleven minutes and shows nothing on narrowband.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Broadband | The trace | faint, persistent | alarm |
| Narrowband | Lines at that bearing | none | normal |
| Own ship | Speed and depth | unchanged 11 min | normal |
| Own ship | Machinery started | none | normal |
| Environment | Layer depth | 40 m, we are below it | normal |

**Choices offered**

- A quiet contact beyond the layer — _Sound from above the layer bends away, arriving faint and without its machinery lines._
- Own-ship noise — _Something aboard is making it, and it would have changed when we did._
- Biologic — _A living source, which would come and go rather than hold a bearing for eleven minutes._
- A display artefact — _The processor drawing a line where there is no sound at all._
- Nothing to explain — _Ordinary noise that happens to look like a line._

**Correct answer**

**A quiet contact beyond the layer**

**Why (shown in verdict):** Persistence rules out noise and biologics; the absence of narrowband lines fits a path bent through the layer, which strips the detail; and nothing of ours changed, so it is not ours.

**Takeaway:** Evidence that survives a change in your own state is evidence about the world.

### M2.3 — The bearing that does not move

**Format:** CHOICE · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The contact's bearing has changed by less than half a degree in six minutes, and it is getting louder. The officer of the deck asks you what that means for the boat. Passive sonar gives you direction and nothing else: no range, no closing speed, nothing but a bearing and how it behaves as time passes. That makes relative motion the whole trade — the way a bearing moves, or refuses to, is the only ranging instrument a quiet boat has. You are submerged, you cannot see the thing, and the answer decides whether the boat manoeuvres now or in ten minutes.

**Question**  What does a steady bearing and a rising level tell you?

**Choices offered**

- We are on a collision course, or close to it, and the range is closing.
- The contact is stopped, since its bearing is not changing.
- The contact is opening, and the level is rising for another reason.
- Nothing until a range is available.

**Correct answer**

**We are on a collision course, or close to it, and the range is closing.**

**Why (shown in verdict):** Two ships whose relative bearing does not change are closing along a straight line between them. It is the oldest rule at sea and it does not need a range.

**Why the others do not hold**

- A stopped contact's bearing would change as we moved past it.
- An opening contact gets quieter, not louder.
- Waiting for a range wastes the six minutes the geometry just gave you.

**Takeaway:** A constant bearing with a rising level is a collision geometry, not a quiet one.

---

## Mission 3 — Position Without a Trusted Fix

**Objective:** Work out not where the boat is, but how well that is known.

**Stake:** A route chosen from a plot that is two miles wrong is a route into the bottom.

### M3.1 — How far the water has carried us

**Format:** BALLPARK · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The last trusted fix was three and a half hours ago. The forecast set for this area is about half a knot, and nobody has applied it to the plot because nobody has measured it. Between fixes the boat's position is dead reckoning: course, speed and time worked forward from the last certainty. But the water moves as well, and a current carries the entire boat sideways without registering on a single instrument aboard — the log measures speed through the water, not over the ground. The error grows every hour it goes unmeasured, and this plot is what the route through the narrows will be drawn on.

**Question**  Estimate how far the boat could be from where the plot says it is.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `0.55 kn  (the set, forecast)`, `3.5 h  (since the last fix)`, `8 kn  (own speed)`, `70 m  (depth)`, `021°  (course made good)`
Tiles that belong: `0.55 kn  (the set, forecast)`, `3.5 h  (since the last fix)`
Decoy tiles: `8 kn  (own speed)`, `70 m  (depth)`, `021°  (course made good)`
Formula: `a*b`
**Target: 1.925 nautical miles** (tolerance ±0.35)
Explanation shown: Distance is rate times time, and the rate here is the water, not the boat. Own speed is what the plot already knows about; it is not part of the error.

**Why (shown in verdict):** The water has been carrying the boat sideways the whole time, and a plot drawn from course and speed cannot see it.

**Takeaway:** Dead reckoning tells you where you would be if nothing pushed you.

### M3.2 — Two displays, one source

**Format:** DIAGNOSIS · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The chart overlay and the electronic plot repeat agree to within a hundred yards. The fathometer says the water is twelve metres shallower than the chart shows for the plotted position. Agreement between instruments feels like confirmation, but it is only worth something when the two could have failed in different ways. The fathometer is not part of that arrangement at all — it is looking straight down at something outside the boat. There is a bank ahead, and the boat is about to act on whichever of these three things you decide to believe.

**Question**  Which explanation accounts for every reading here?

**Panel headline**  The two navigation displays agree exactly, and the bottom does not agree with either.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Plot | Chart overlay | agrees with repeat | normal |
| Plot | Electronic repeat | agrees with overlay | normal |
| Plot | Common source | inertial navigator | alarm |
| Sounding | Depth under keel | 12 m shallower than charted | alarm |
| Log | Time since a fix | 3 h 30 m | high |

**Choices offered**

- The plot is wrong and the sounding is the only real measurement — _Both displays repeat one degraded source, so they cannot disagree; the bottom is independent._
- The fathometer has failed — _A single instrument fault, with the two agreeing displays correct._
- The chart is out of date here — _The survey is old and the bottom has changed._
- The boat is where the plot says and the water is unusually shallow today — _Tide and pressure moving the surface, not the bottom._
- Nothing to explain — _Twelve metres is within ordinary sounding scatter._

**Correct answer**

**The plot is wrong and the sounding is the only real measurement**

**Why (shown in verdict):** Two displays fed by one navigator agree by construction. The disagreement with the bottom is the only new information on the table, and it points at the plot.

**Takeaway:** Independent confirmation only counts when the second source can fail differently.

### M3.3 — What the bottom is good for

**Format:** CHOICE · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> Ahead the charted bottom rises steeply toward the bank. Rask offers to run a line of soundings across the contour as the boat closes it. The seabed has been surveyed and printed, so depth under the keel is an independent measurement — it fails for entirely different reasons than a plot does. One sounding is a weak clue, because many places on a chart are twelve metres deep. A profile taken while moving is a shape, and shapes can be matched against the chart. With the plot in doubt and a bank ahead, that difference is worth the time it costs to run.

**Question**  What does a run of soundings across a rising contour give you?

**Choices offered**

- A line of position, independent of the plot, from where the depths match the chart.
- A range to the bank, from how long the sound took to return.
- Confirmation of the plot, since the depths came from the same chart.
- Nothing useful until the boat surfaces for a proper fix.

**Correct answer**

**A line of position, independent of the plot, from where the depths match the chart.**

**Why (shown in verdict):** Matching a measured depth profile against a charted one says where you crossed it. It cannot be wrong for the same reason the plot is, which is the whole point of it.

**Why the others do not hold**

- A fathometer measures the depth under the keel, not the range to anything ahead.
- The chart is a record of the bottom; comparing a measurement to it is not circular.
- Surfacing for a fix is a decision about exposure, and the bottom is already here.

**Takeaway:** A contour crossing turns a depth into a position line.

---

## Mission 4 — Silent Passage

**Objective:** Cross a constrained area without losing contact awareness or making unnecessary noise.

**Stake:** Every machine running is a sentence the boat is saying out loud to anybody listening.

### M4.1 — What has to be true before the boat commits

**Format:** SEQUENCE · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> Rask lays out what the sonar room needs before the boat enters the narrows: the picture built, the layer known, the own-noise baseline taken, and an agreement about what happens if contact is lost. A passage plan is not a list of jobs for later. It is a set of conditions that have to be true at the moment the boat commits, because inside a constrained channel there is no room to go back and collect one you skipped. Some of these are measurements and some are agreements, and Rask wants them in the order they have to happen in.

**Question**  Order the passage

**Cards to order** (presented shuffled)

- Take the own-noise baseline, because nothing new can be recognised as new without it.
- Find the layer depth, because it decides which of the missing lines are missing for a reason.
- Hold the contacts long enough to have bearing rates, which the baseline and the layer let you interpret.
- Agree what the boat does if contact is lost, while there is still contact to lose.

**Correct answer**

1. **Take the own-noise baseline, because nothing new can be recognised as new without it.**
2. **Find the layer depth, because it decides which of the missing lines are missing for a reason.**
3. **Hold the contacts long enough to have bearing rates, which the baseline and the layer let you interpret.**
4. **Agree what the boat does if contact is lost, while there is still contact to lose.**

**Why (shown in verdict):** Each card is a prerequisite for reading the next one. Without the baseline a new sound is just a sound; without the layer a missing narrowband line looks like an absent contact rather than a bent path; and bearing rates take time, which is why they cannot be the thing you start collecting at the entrance. The last is agreed early for a different reason — afterwards, everybody is busy.

**Takeaway:** A passage plan is ordered by what each measurement needs in order to mean anything.

### M4.2 — The margin that survives being wrong

**Format:** BALLPARK · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The narrows are four miles across. The plot's uncertainty is a circle about two miles wide, and the bank is on the left-hand side of the channel. A plotted position is the centre of a probability, not a fact; the circle drawn round it is the honest width of where the boat might actually be. Planning a route is arithmetic done on that circle rather than on the pencil line — the whole circle has to stay in water the boat can survive, not just its middle. Four miles sounds like plenty until the numbers are written down.

**Question**  How much clear water is left if the boat runs the middle of the channel?

**Correct answer**

Equation shown: `{0} ÷ {2} − {1} ÷ {2}`
Tiles offered: `4 nm  (channel width)`, `2 nm  (uncertainty diameter)`, `8 kn  (own speed)`, `2  (halves of the channel)`
Tiles that belong: `4 nm  (channel width)`, `2 nm  (uncertainty diameter)`, `2  (halves of the channel)`
Decoy tiles: `8 kn  (own speed)`
Formula: `a/c - b/c`
**Target: 1 nautical miles** (tolerance ±0.2)
Explanation shown: Running the centre puts two miles between the plotted position and each side, and the position could be a mile off toward either. What is left is the margin, and it is what the route has to survive on.

**Why (shown in verdict):** The uncertainty is not a decoration on the plot; it is the width of the boat's real position.

**Takeaway:** A route is chosen against the uncertainty, not against the plotted line.

### M4.3 — What the boat can afford to stop

**Format:** CHOICE · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> Haruki lists what could be secured or slowed for the passage. Everything aboard radiates: pumps, fans, turbines, and above all the propeller, which is the loudest thing a submarine does at any speed worth making. Quieting the boat means giving up the work those machines were doing, so every line on his list is a trade — acoustic gain now against a capability the boat may badly want inside the next two hours. He wants one of them, and he wants it before the boat is in the narrows rather than after.

**Question**  Haruki can make one change before the narrows. Which?

**Choices offered**

- Come down in turns and accept a slower passage.
- Secure one of the two seawater cooling pumps.
- Stop the ventilation fans in the crew spaces.
- Shut down the sonar processors that are not being used.

**Correct answer**

**Come down in turns and accept a slower passage.**

**Why (shown in verdict):** Cavitation off the propeller dominates every other source at this depth and speed, so turns are where the whole signature is, and slowing costs only time — which the boat has and can get back.

**Why the others do not hold**

- The cooling pump is the one machine on the list whose loss starts a clock on a bearing, and a bearing run hot for an hour is a shipyard visit. It is the worst bargain here.
- The fans are genuinely noisy and stopping them costs only stale air, but they are not where the noise is. Do it as well if you like; it will not change what anybody hears.
- Unused processors radiate almost nothing acoustically, and shutting them down costs the contact picture the passage depends on.

**Takeaway:** Silence is not free, and the bill is paid by whatever the machine was doing.

---

## Mission 5 — Forward Flooding

**Objective:** Find the water, decide whether pumping can win, and stop the source.

**Stake:** Pumping is a way of buying minutes, and the minutes are worth nothing if they are not spent finding the source.

### M5.1 — Under the deck plates

**Format:** DIAGNOSIS · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> Water is over the bilge in the forward space and the level is still rising with the drain pump running. The space carries a seawater supply header, a fresh water line and the sonar cooling return: three systems, one puddle. Water aboard is not only weight — it is a leak whose behaviour depends on where it came from, and a sea connection at depth is fed by the entire ocean at roughly one extra atmosphere for every ten metres down. What the water is, and what has and has not changed on the systems around it, is the evidence that names the source. Pumping without naming it is just a slower flood.

**Question**  Which source fits every reading on the board?

**Panel headline**  The forward bilge is rising with the drain pump already running.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Bilge | Level | 31 cm and rising | alarm |
| Bilge | Salinity | salt | alarm |
| Systems | Fresh water tank level | unchanged | normal |
| Systems | Sonar cooling flow | normal | normal |
| Boat | Depth | 90 m, unchanged | normal |
| Boat | Trim | 1.4° bow down and increasing | high |

**Choices offered**

- A hull fitting on the seawater supply header — _Sea pressure driving salt water in at a rate set by depth, taking bow trim as the space fills._
- A split in the fresh water line — _A domestic line emptying into the bilge; the tank level would fall._
- The sonar cooling return — _Cooling water escaping; flow through the system would drop._
- Condensation and normal drainage — _Ordinary accumulation, which the drain pump would be winning against._
- Back-flooding through the drain pump — _The pump running backwards, which would show as a falling discharge pressure._

**Correct answer**

**A hull fitting on the seawater supply header**

**Why (shown in verdict):** Salt rules out the fresh water line. Unchanged cooling flow rules out the sonar return. Only a sea connection explains water arriving faster than the pump can remove it at this depth.

**Takeaway:** What the water is tells you which system it came from.

### M5.2 — Gallons in against gallons out

**Format:** BALLPARK · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> Hallam reads the bilge level twice, one minute apart, and reports the drain pump's rate at this head. Both numbers are on the board. Flooding is a race between two rates: what the sea is putting in against what the pump is taking out, and both of them can be measured rather than argued about. Pump output is not a fixed number either — it falls as the head it works against rises, so "the drain pump is running" answers nothing on its own. If the inflow is the bigger number, pumping is buying minutes, and command has to know how many before it decides whether to change depth.

**Question**  How fast is the sea actually coming in?

**Correct answer**

Equation shown: `{0} × {1} + {2}`
Tiles offered: `8 cm  (rise in one minute)`, `11 gallons per cm  (this bilge)`, `55 gpm  (drain pump at this head)`, `90 m  (depth)`, `31 cm  (level at the first reading)`
Tiles that belong: `8 cm  (rise in one minute)`, `11 gallons per cm  (this bilge)`, `55 gpm  (drain pump at this head)`
Decoy tiles: `90 m  (depth)`, `31 cm  (level at the first reading)`
Formula: `a*b + c`
**Target: 143 gallons per minute** (tolerance ±12)
Explanation shown: The rise is what is left after the pump has done its work, so the leak is the rise plus the pump — well over a hundred gallons a minute. The pump is not going to win, and knowing that is what sends somebody to the hull valve instead of for another pump.

**Why (shown in verdict):** A rate you have not measured is a hope, and hoping is not a damage control action.

**Takeaway:** A flooding casualty is a race between two rates, and you can measure both.

### M5.3 — What else that valve feeds

**Format:** PROTOCOL · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> Two valves will stop the water: the outboard hull valve and the inboard supply valve. The header they sit on also feeds the sonar- array cooling. Isolation is never free — every valve shut takes a system away from somebody else, and on a boat where one header serves both the sea and the sonar, stopping the flooding and blinding the array can be the same movement of the same wheel. Haruki wants each action matched to what it actually achieves. "Shut everything" is what people say when they have not worked out what each thing costs.

**Question**  Match each action to what it actually achieves.

**Situations to match**

- Shut the outboard hull valve first.
- Shut the inboard supply valve only.
- Start a second portable pump before isolating.
- Tell sonar before the header is isolated.

**Choices offered**

- Stops the sea at the hull, which is the only cut that ends it.
- Stops flow to the break but leaves the sea connected to the header.
- Buys minutes without changing the outcome.
- Gives the array's operators warning before their cooling stops.

**Correct answer**

1. Shut the outboard hull valve first.  →  **Stops the sea at the hull, which is the only cut that ends it.**
2. Shut the inboard supply valve only.  →  **Stops flow to the break but leaves the sea connected to the header.**
3. Start a second portable pump before isolating.  →  **Buys minutes without changing the outcome.**
4. Tell sonar before the header is isolated.  →  **Gives the array's operators warning before their cooling stops.**

**Why (shown in verdict):** Only the hull valve separates the boat from the sea. The rest are useful, and none of them is a substitute for it.

**Takeaway:** Every isolation stops something else, and the order decides what that is.

---

## Mission 6 — Electrical Fire

**Objective:** Put out a fire whose ignition source is electrical, in the order that makes it stay out.

**Stake:** A fire that is fought without removing its source is a fire you will fight twice.

### M6.1 — Three legs, three different actions

**Format:** PROTOCOL · **Area:** FIRE · **Place:** Electrical Distribution

**Scene shown to the player**

> Chief Okonkwo puts the three legs of the fire on the board — the fault that keeps lighting it, the insulation that burns, and the air in the compartment — and asks what each one is removed by. Fire needs fuel, oxygen and energy, and an electrical fire is the awkward case, because the energy keeps arriving down a cable from somewhere else in the boat. Submerged there is nowhere to vent to, and the air feeding the fire is also the air the crew is breathing for the rest of the patrol. Every leg has its own action and none of them substitutes for another.

**Question**  Match each leg of the fire to the action that removes it.

**Situations to match**

- The energized fault that keeps re-igniting the cable.
- The cable insulation that is actually burning.
- The air in the compartment feeding the flame.
- The heat conducting through the bulkhead to the next space.

**Choices offered**

- Open the breaker, then prove the cable dead with a meter.
- Cool it below the temperature at which it re-lights.
- Shut the ventilation to the space so the fire stops being fed.
- Set and read boundaries with an infrared thermometer.

**Correct answer**

1. The energized fault that keeps re-igniting the cable.  →  **Open the breaker, then prove the cable dead with a meter.**
2. The cable insulation that is actually burning.  →  **Cool it below the temperature at which it re-lights.**
3. The air in the compartment feeding the flame.  →  **Shut the ventilation to the space so the fire stops being fed.**
4. The heat conducting through the bulkhead to the next space.  →  **Set and read boundaries with an infrared thermometer.**

**Why (shown in verdict):** Removing the ignition source is what makes the rest hold. Everything else is fighting the symptom of a circuit that is still live.

**Takeaway:** Each leg of a fire is a different action, and they are not interchangeable.

### M6.2 — What a lamp is worth

**Format:** SEQUENCE · **Area:** FIRE · **Place:** Electrical Distribution

**Scene shown to the player**

> The switchboard indicator shows the bus open. A meter on the cable in the compartment reads four hundred and forty volts. The team is at the door with a hose, waiting on you. An indicator lamp reports what the switchboard believes: a contact somewhere, a lamp that can fail, a bus that can be back-fed from another source. A meter on the conductor reports the condition of that conductor and nothing else. Water on an energised cable puts the fault straight into the people holding the hose, which is why the order these things happen in is the entire question.

**Question**  Prove it before you fight it

**Cards to order** (presented shuffled)

- Open the breaker for the affected bus.
- Meter the cable in the compartment and confirm it is dead.
- Enter with breathing protection and fight the fire.
- Set boundaries and read them until the seat is cold.
- Restore loads in dependency order, once the seat is proved cold.

**Correct answer**

1. **Open the breaker for the affected bus.**
2. **Meter the cable in the compartment and confirm it is dead.**
3. **Enter with breathing protection and fight the fire.**
4. **Set boundaries and read them until the seat is cold.**
5. **Restore loads in dependency order, once the seat is proved cold.**

**Why (shown in verdict):** Metering between opening and entering is the whole lesson: the lamp and the cable disagreed, and the team that trusts the lamp goes in with the fault still live.

**Takeaway:** An indicator reports a belief; a meter reports a condition.

### M6.3 — Smoke is not only a breathing problem

**Format:** CHOICE · **Area:** ATMO · **Place:** Auxiliary Machinery & Bilge

**Scene shown to the player**

> The compartment is full of smoke. The team can breathe on air masks, but nobody can see the far bulkhead and the fire is behind a panel. Breathing apparatus solves exactly one problem, which is the air, and leaves every other one untouched. Smoke takes away the instrument the team had actually been using to find the fire — their own eyes — and a fire burning inside a structure will not show you where it is, whatever the visibility. Searching a compartment by hand is slow, and everything burning behind that panel is getting worse while it happens.

**Question**  What does the smoke change about how the casualty is fought?

**Choices offered**

- The space can no longer be read by eye, so the boundaries have to be measured instead.
- Nothing, as long as everybody is on breathing protection.
- The fire will go out on its own once the smoke displaces the air.
- The compartment must be abandoned until the smoke clears.

**Correct answer**

**The space can no longer be read by eye, so the boundaries have to be measured instead.**

**Why (shown in verdict):** Breathing gear solves breathing. It does not tell you where the heat is, and in a space you cannot see, an infrared reading on the bulkhead is the only thing that does.

**Why the others do not hold**

- Masks keep the team working; they do not restore the information the smoke took away.
- A fire consuming the air also produces carbon monoxide, which is worse, not self-solving.
- Abandoning it hands the compartment to the fire, and the boundaries still need reading.

**Takeaway:** Smoke removes the instrument you were relying on, which is your own eyes.

---

## Mission 7 — Atmosphere Degradation

**Objective:** Tell a failing sensor from failing air, and find where the air stopped moving.

**Stake:** The air is the one system where the crew notices the problem before the instruments do.

### M7.1 — The compartment the scrubber cannot reach

**Format:** DIAGNOSIS · **Area:** ATMO · **Place:** Auxiliary Machinery & Bilge

**Scene shown to the player**

> The scrubber plant is running and its outlet reads clean. A handheld meter in berthing reads far higher than the sensor installed there, while control and machinery both read normal on handhelds. A submarine's atmosphere is a closed system: the crew puts carbon dioxide into it every minute of the patrol and the plant takes it back out — but only out of air that actually reaches the plant. The ducting, the dampers and the fans decide which compartments are in that loop at all. And an installed sensor is one more instrument that can be wrong, which is exactly why handhelds exist.

**Question**  Which explanation accounts for every reading?

**Panel headline**  Berthing is high on a handheld and normal on its installed sensor, and the plant says it is fine.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Plant | Scrubber outlet CO₂ | 0.4 % | normal |
| Berthing | Handheld CO₂ | 2.1 % | alarm |
| Berthing | Installed sensor | 0.5 % | alarm |
| Berthing | Supply damper | shut | alarm |
| Control | Handheld CO₂ | 0.5 % | normal |
| Crew | Symptoms | berthing only | high |

**Choices offered**

- Berthing is isolated from the ventilation and its sensor has failed — _A shut damper leaves the space unscrubbed, and the installed sensor is reporting a level that is not there._
- The whole boat is degrading — _A plant-wide failure, which would show on every handheld and not just one space._
- The scrubber has failed — _The plant not removing CO₂, which its own outlet reading would show._
- The handheld is faulty — _A single instrument reading high, with the installed sensor correct._
- Nothing to explain — _Headaches in a crowded space with no cause in the air at all._

**Correct answer**

**Berthing is isolated from the ventilation and its sensor has failed**

**Why (shown in verdict):** Two things are wrong at once, which is why no single reading settles it: the damper explains the level, and the symptoms in that space alone say the level is real, which is what convicts the sensor.

**Takeaway:** Ventilation decides which compartments the plant is actually treating.

### M7.2 — Nine people and a shut damper

**Format:** BALLPARK · **Area:** ATMO · **Place:** Berthing, Mess & Medical

**Scene shown to the player**

> Navarro wants to know how long the space can be left before she pulls people out of it. Berthing holds nine people off watch and the compartment's volume is on the board. A person at rest produces carbon dioxide at a rate you can put a number to, and a sealed volume divided by that rate is a deadline in hours instead of an argument about whether it feels stuffy. Concentration matters earlier than most people expect: the air stays breathable long after it starts making judgement and reaction time worse, which is the part that hurts submariners.

**Question**  Roughly how long until berthing doubles its carbon dioxide?

**Correct answer**

Equation shown: `{2} × {3} ÷ ({0} × {1})`
Tiles offered: `9  (people off watch)`, `0.04 m³/h  (CO₂ per person)`, `36 m³  (compartment volume)`, `0.01  (one per cent, as a fraction)`, `1  (one per cent, written as a percentage)`, `70 m  (depth)`
Tiles that belong: `9  (people off watch)`, `0.04 m³/h  (CO₂ per person)`, `36 m³  (compartment volume)`, `0.01  (one per cent, as a fraction)`
Decoy tiles: `1  (one per cent, written as a percentage)`, `70 m  (depth)`
Formula: `c*d/(a*b)`
**Target: 1 hours** (tolerance ±0.2)
Explanation shown: The volume and the target concentration give how much gas it takes; the people and their rate give how fast it arrives. An hour is not an emergency and it is not comfortable either, which is exactly the kind of answer that changes what you do next.

**Why (shown in verdict):** A deadline turns an argument about whether to act into a decision about when.

**Takeaway:** A closed space with people in it has a rate, and a rate gives you a deadline.

### M7.3 — Opening the damper is not the whole job

**Format:** CHOICE · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> The damper to berthing is shut and can be opened from the machinery space. The ventilation fan that serves that branch was stopped during the last drill and never restarted. Ventilation aboard is a branched system — every compartment hangs off a branch that can be closed, and the scrubbers only ever treat the air that actually passes through them. Whatever gets done here has to be proved afterwards with the same handheld that found the problem, because a compartment that is still not in the loop reads exactly like one that is until somebody measures it. Berthing is on a deadline that was worked out an hour ago.

**Question**  What restores berthing to the scrubber?

**Choices offered**

- Open the damper and start the branch fan, then measure the space again.
- Open the damper — the plant will do the rest.
- Start the fan; the damper will lift with the flow.
- Move the crew out and leave the ventilation as it is.

**Correct answer**

**Open the damper and start the branch fan, then measure the space again.**

**Why (shown in verdict):** A damper is a hole and a fan is the reason air goes through it. Neither on its own moves the compartment's air, and the measurement afterwards is what proves it did.

**Why the others do not hold**

- The plant can only treat air that reaches it, and nothing is pushing this air anywhere.
- A damper is a mechanical valve; flow does not open it.
- Moving the crew treats the symptom and leaves the compartment unventilated.

**Takeaway:** A path needs both a way through and something moving the air along it.

---

## Mission 8 — Compound Casualty

**Objective:** Prioritise and delegate when there are more casualties than there are people.

**Stake:** A boat that fights every casualty at once is a boat with nobody watching where it is going.

### M8.1 — Four casualties, one crew

**Format:** TRIAGE · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> Water forward, a bus lost aft, the plot degraded by the power loss, and a crewman with a broken wrist in the passage. Every one of them has somebody standing in front of you asking about it. Casualties do not queue by how loudly they are being reported; they queue by how fast they get worse if nobody touches them, and some of them have already done all the getting worse they are going to do. This is the part of having the watch that is not about knowing the systems at all: four people want a decision, and the seconds spent choosing are the cheapest seconds on offer.

**Question**  What gets the first team?

**Choices offered**

- The flooding, because it is the only one that gets worse by itself and can sink the boat.
- The injured crewman, because a person comes before equipment.
- The lost bus, because everything else depends on power.
- The plot, because the boat is still moving toward a bank.

**Correct answer**

**The flooding, because it is the only one that gets worse by itself and can sink the boat.**

**Why (shown in verdict):** Water comes in whether or not anybody is watching it. The injury is stable, the bus is already lost, and the plot can be frozen by slowing the boat — which is itself a decision you can make in four seconds.

**Takeaway:** You order casualties by how fast they get worse, not by how loud they are.

### M8.2 — Who does the things you are not doing

**Format:** PROTOCOL · **Area:** FIRE · **Place:** Electrical Distribution

**Scene shown to the player**

> You have the flooding. Whitfield is waiting for the rest of the casualty organisation and he will not invent it for you. The watch bill exists so that one person's attention is never the thing that limits the boat: every casualty aboard has somebody qualified who can start on it inside the next minute. What that person needs from you is not a description of the problem — a problem handed to a volunteer is a problem nobody owns. Get this wrong and you will spend the next twenty minutes supervising four things and completing none of them, with the water still coming in.

**Question**  Match each remaining casualty to the right assignment.

**Situations to match**

- The lost bus, and everything that was fed from it.
- The crewman with a broken wrist, in the passage.
- The plot, degraded since the power went.
- The bulkheads either side of the flooded space.

**Choices offered**

- Prove what is actually dead with a meter, because the switchboard only reports what it believes.
- Treat him where he lies and clear the passage, because the passage is a damage-control route.
- Slow the boat first, which freezes the error before anybody tries to rebuild the position.
- Read temperature and level on both sides, because that is how you learn the boundary is holding.

**Correct answer**

1. The lost bus, and everything that was fed from it.  →  **Prove what is actually dead with a meter, because the switchboard only reports what it believes.**
2. The crewman with a broken wrist, in the passage.  →  **Treat him where he lies and clear the passage, because the passage is a damage-control route.**
3. The plot, degraded since the power went.  →  **Slow the boat first, which freezes the error before anybody tries to rebuild the position.**
4. The bulkheads either side of the flooded space.  →  **Read temperature and level on both sides, because that is how you learn the boundary is holding.**

**Why (shown in verdict):** Each assignment is a first action rather than a subject. The pairings are not obvious from the department: the plot is fixed by slowing down before anybody plots anything, and the injured man is moved because the passage is a route, not because he is uncomfortable.

**Takeaway:** Delegation is a person and a first action, and the first action is rarely the obvious one.

### M8.3 — Slowing down as a decision

**Format:** BALLPARK · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The boat is making eight knots toward a bank nine miles away, with a plot that has been degraded for six minutes. Time is the only resource in a casualty that can be manufactured, and speed is the price list: distance divided by speed is how long there is before the geometry makes the decision instead of you. Slowing costs progress and buys everything else — the plot can be rebuilt, the flooding can be fought, the passage will still be there. Work out what eight knots is actually spending, in minutes, before deciding whether the boat can afford it.

**Question**  How much time does coming down to three knots buy?

**Correct answer**

Equation shown: `{0} ÷ {2} − {0} ÷ {1}`
Tiles offered: `9 nm  (to the bank)`, `8 kn  (present speed)`, `3 kn  (the slow option)`, `6 min  (since the plot degraded)`, `5 kn  (the difference between the two speeds)`
Tiles that belong: `9 nm  (to the bank)`, `8 kn  (present speed)`, `3 kn  (the slow option)`
Decoy tiles: `6 min  (since the plot degraded)`, `5 kn  (the difference between the two speeds)`
Formula: `a/c - a/b`
**Target: 1.875 hours** (tolerance ±0.2)
Explanation shown: An hour is not enough time to fight a flooding casualty and rebuild a plot. Three hours is. The boat's speed is the one number on this list that you control, and it is worth two hours.

**Why (shown in verdict):** Time is the only resource in a casualty that can be manufactured, and speed is how you buy it.

**Takeaway:** Slowing the boat converts a distance problem into a time budget.

---

## Mission 9 — Sonar Blinded by the Boat

**Objective:** Find the noise the boat is making about itself, and prove which machine it is.

**Stake:** A boat that cannot hear is a boat that is being heard.

### M9.1 — The rise on every bearing

**Format:** DIAGNOSIS · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> Broadband is up across the whole display rather than in one sector. A new narrowband line has appeared at a frequency that is not a round number, and it moved slightly when the plant changed. A contact out in the water has a direction; something the boat is carrying does not, because it is radiating into the array from the hull the array is mounted on. Machinery tones sit at frequencies tied to the rate a thing turns, which is why they shift when the plant does. A boat that cannot hear is also a boat that is being heard, and right now this one may be both.

**Question**  Which explanation fits the whole picture?

**Panel headline**  Broadband is up on every bearing at once and a new narrowband line has appeared.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Broadband | Rise | all bearings | alarm |
| Narrowband | New line | 113 Hz | alarm |
| Narrowband | Line behaviour | shifts with shaft speed | alarm |
| Environment | Sea state and layer | unchanged | normal |
| Plant | Machinery started recently | seawater pump, 20 min ago | high |

**Choices offered**

- A machinery fault aboard — _A source we carry radiates in every direction at once, and its line follows our own machinery._
- A close contact — _Another vessel nearby, which would appear in one sector and have its own bearing rate._
- A change in the sea — _Weather or a layer shift, which would change with the environment and not with our shaft._
- A failing hydrophone — _A defective element, which would degrade one part of the array rather than all bearings._
- Nothing to explain — _Ordinary variation in a noisy ocean._

**Correct answer**

**A machinery fault aboard**

**Why (shown in verdict):** Direction is the whole clue: a contact has a bearing and a fault does not. The line moving with shaft speed ties it to our own plant.

**Takeaway:** A source everywhere at once is a source you are carrying.

### M9.2 — Narrowing it to one mount

**Format:** SEQUENCE · **Area:** ENG · **Place:** Propulsion Machinery

**Scene shown to the player**

> Four machines were running when the noise appeared, and only one of them was started in the last half hour. Haruki wants it narrowed down without stopping things at random. Finding a noise source is an experiment rather than a search: change one thing, listen to what the change did, and let that decide the next move. Securing machinery in bunches proves nothing and costs the boat capability it may need in the next ten minutes. Meanwhile every minute the mount runs, the boat is broadcasting a line that anybody listening can write down and keep.

**Question**  Find which machine

**Cards to order** (presented shuffled)

- Ask sonar for the frequency and whether it tracks a shaft or a pump speed.
- List what was started or changed in the window when the noise appeared.
- Change one machine's state and have sonar report before changing another.
- Confirm by restoring the suspect machine and hearing the noise return.

**Correct answer**

1. **Ask sonar for the frequency and whether it tracks a shaft or a pump speed.**
2. **List what was started or changed in the window when the noise appeared.**
3. **Change one machine's state and have sonar report before changing another.**
4. **Confirm by restoring the suspect machine and hearing the noise return.**

**Why (shown in verdict):** Restoring it is what turns a correlation into a cause. Everything before that is a list of suspects.

**Takeaway:** You find a noise source by changing one thing at a time and listening.

### M9.3 — A line that is not a round number

**Format:** CHOICE · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> The line sits at a hundred and thirteen hertz, which is roughly twice the shaft rate, and it grows when turns increase. Rotating machinery writes its own rate into the water: a shaft turning so many times a second radiates at that frequency and at whole multiples of it, and which multiple stands out says something about the kind of fault underneath. A mass out of balance pulls once per revolution, so it shows at shaft rate; a shaft out of line is loaded twice in every turn, once at each extreme of its wobble. This is how anybody at sea identifies anybody else, which is the uncomfortable half of it — the same line is being written into somebody else's display right now, with our name attached to it.

**Question**  What does a line at twice shaft rate suggest?

**Choices offered**

- Something turning with the shaft that is doing it twice per revolution — a misalignment or a damaged mount.
- A contact whose engine happens to run at that frequency.
- An electrical harmonic, unrelated to anything rotating.
- Nothing — frequencies drift, and the number is a coincidence.

**Correct answer**

**Something turning with the shaft that is doing it twice per revolution — a misalignment or a damaged mount.**

**Why (shown in verdict):** A rotating fault repeats at a multiple of its rotation. Twice per turn is the signature of something out of line rather than out of balance.

**Why the others do not hold**

- A contact's frequency would not follow our own throttle.
- An electrical harmonic sits on a supply frequency and stays there.
- A line that tracks shaft speed is the opposite of a coincidence.

**Takeaway:** A frequency that is a multiple of a rotation belongs to the thing that rotates.

---

## Mission 10 — Uncontrolled Depth Change

**Objective:** Tell a symptom from a cause when the boat is going somewhere you did not order.

**Stake:** A boat that treats a symptom keeps sinking while everybody watches the wrong gauge.

### M10.1 — Three gauges, one problem

**Format:** DIAGNOSIS · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> Depth is increasing slowly with the planes already at rise. The trim shows the boat heavy forward, speed is unchanged, and the depth gauge in control disagrees with the one aft by four metres. A submarine holds its depth two ways at once: buoyancy, which is weight against displacement, and dynamics, which is the planes working against water flowing past the hull. When the two fight each other the boat still moves, slowly, in whichever direction is winning. And two gauges a hundred feet apart on a boat that is not level are not measuring the same column of water, so the odd one out is a suspect and not yet a verdict.

**Question**  Which cause accounts for every reading?

**Panel headline**  The boat is going deeper with the planes at rise, and the two depth gauges disagree.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Depth | Control gauge | 94 m, increasing | alarm |
| Depth | After gauge | 98 m, increasing | alarm |
| Trim | Bubble | 1.2° bow down | alarm |
| Trim | Trim tank levels | unchanged | normal |
| Plant | Speed | 8 kn, unchanged | normal |
| DC | Forward bilge | wet, level unread | high |

**Choices offered**

- Water coming aboard forward — _Weight added at the bow explains the trim, the depth and the wet bilge, and the gauges disagree because they are at different depths in a boat that is down by the bow._
- A depth-gauge fault — _One instrument reading wrong, which would not make the boat heavy or bow-down._
- Trim water transferred aft by mistake — _Weight moved inside the boat, which the tank levels would show._
- A planes-control failure — _Control surfaces not doing what is ordered, which would show as an angle without added weight._
- Speed loss reducing lift — _Less flow over the planes, which the unchanged speed rules out._

**Correct answer**

**Water coming aboard forward**

**Why (shown in verdict):** The two gauges disagree by exactly what a bow-down boat would produce, and only added weight explains trim, depth and a wet bilge together.

**Takeaway:** The instrument that disagrees is a candidate, not automatically the culprit.

### M10.2 — What a metre of depth costs in tonnes

**Format:** BALLPARK · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> Ferro wants to know how much water is aboard before deciding whether to blow anything. The boat's tonnes-per-metre figure is on the board: it says how many tonnes of added weight take the boat one metre deeper. Weight aboard can be worked out from the boat's own behaviour instead of guessed at, and the number decides the action — pumping is quiet, slow, and enough if the amount is small, while blowing ballast is fast, spends air the boat cannot replace submerged, and can be heard a long way off. Two very different decisions, one arithmetic problem between them.

**Question**  About how much water has come aboard?

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `4 m  (depth gained)`, `1.6 t/m  (this boat, at this speed)`, `8 kn  (speed)`, `90 m  (starting depth)`
Tiles that belong: `4 m  (depth gained)`, `1.6 t/m  (this boat, at this speed)`
Decoy tiles: `8 kn  (speed)`, `90 m  (starting depth)`
Formula: `a*b`
**Target: 6.4 tonnes** (tolerance ±0.8)
Explanation shown: Six tonnes is inside what the drain pump can handle if the source is stopped, and well outside what it can handle if it is not. The number is what turns "pump or blow" from an argument into a decision.

**Why (shown in verdict):** How much is aboard decides whether pumping is enough or the boat has to blow.

**Takeaway:** A trim change is a weight, and a weight can be estimated rather than guessed.

### M10.3 — What each control actually does

**Format:** PROTOCOL · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> Four things can be done in the next thirty seconds. Each of them changes the boat, and two of them are hard to undo at this depth. Speed and plane angle work through the water flowing past the hull: cheap, reversible, and effective only while the boat is making way. Blowing ballast works through buoyancy: immediate, powerful, expensive in high-pressure air that cannot be made back submerged, and the loudest thing a submarine can do short of an emergency surface. Every one of them is the right answer in some situation, which is exactly why this one has to be reasoned.

**Question**  Match each action to what it actually achieves.

**Situations to match**

- Increase speed with the planes at rise.
- Blow the forward main ballast.
- Pump the forward trim tank to sea.
- Slow down and hold the depth with the planes.

**Choices offered**

- More flow over the planes, so the same angle lifts harder — buys minutes.
- Removes weight fast, and is heard for miles.
- Removes weight slowly, quietly, and only if the pump can beat the leak.
- Reduces the lift available, which is the wrong way at this moment.

**Correct answer**

1. Increase speed with the planes at rise.  →  **More flow over the planes, so the same angle lifts harder — buys minutes.**
2. Blow the forward main ballast.  →  **Removes weight fast, and is heard for miles.**
3. Pump the forward trim tank to sea.  →  **Removes weight slowly, quietly, and only if the pump can beat the leak.**
4. Slow down and hold the depth with the planes.  →  **Reduces the lift available, which is the wrong way at this moment.**

**Why (shown in verdict):** Every one of these is correct in some situation. The question is which costs you least right now, and blowing is the loudest thing the boat can do short of an emergency surface.

**Takeaway:** Speed and angle buy time; blowing buys depth and gives away position.

---

## Mission 11 — The Cooling Path

**Objective:** Trace one cooling path end to end and find where it stopped.

**Stake:** A bearing that runs hot for an hour is a bearing that will be replaced in a shipyard.

### M11.1 — From the sea to the bearing

**Format:** SEQUENCE · **Area:** ENG · **Place:** Propulsion Machinery

**Scene shown to the player**

> Haruki wants the path written down in order before anybody touches a valve. Heat made in a bearing has exactly one place to go — the sea outside the hull — and it gets there through a chain of handovers, each one a heat exchanger with its own flow, its own temperature difference and its own way of failing. Write the chain down and a hot bearing becomes a question about which link stopped passing heat along. Leave it unwritten and it stays a guess, made under time pressure, while the bearing carries on making heat at the same rate it always did.

**Question**  Trace the path

**Cards to order** (presented shuffled)

- The bearing makes heat, and the lube oil carries it away.
- The lube oil gives its heat to the oil cooler.
- The oil cooler gives its heat to the fresh water loop.
- The fresh water loop gives its heat to the seawater, which goes over the side.

**Correct answer**

1. **The bearing makes heat, and the lube oil carries it away.**
2. **The lube oil gives its heat to the oil cooler.**
3. **The oil cooler gives its heat to the fresh water loop.**
4. **The fresh water loop gives its heat to the seawater, which goes over the side.**

**Why (shown in verdict):** Heat moves from where it is made to the sea through three handovers, and each handover is a place the chain can break.

**Takeaway:** You cannot find the broken link in a chain you have not written down.

### M11.2 — One link is not handing the heat on

**Format:** DIAGNOSIS · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> The oil is hot and the fresh water loop is hot. The seawater outlet is barely warmer than the inlet, and one of the two seawater pumps was secured during the last quiet run. A heat exchanger only moves heat when there is a temperature difference across it and something on the far side able to carry heat away as fast as it arrives. Any link can fail, and each one fails in its own way. That gives you a method rather than a guess: walk the temperatures along the chain and find where the difference across a stage has gone. A bearing run hot for an hour is a shipyard visit.

**Question**  Which link in the chain has failed?

**Panel headline**  The oil is hot, the fresh water is hot, and the seawater is leaving barely warmer than it arrived.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Bearing | Lube oil | 71 °C, rising | alarm |
| Fresh water | Loop temperature | 64 °C, rising | alarm |
| Seawater | Inlet | 9 °C | normal |
| Seawater | Outlet | 11 °C | alarm |
| Plant | Seawater pumps running | one of two | high |

**Choices offered**

- Not enough seawater flow to carry the heat away — _One pump cannot move enough water, so it leaves nearly as cold as it arrived while everything upstream heats up._
- The oil cooler is fouled — _Heat not crossing from oil to fresh water — the fresh water loop would be cool, not hot._
- The bearing is failing and making more heat — _A mechanical fault adding heat, which the seawater side would still be carrying away._
- A faulty oil temperature sensor — _One instrument wrong, which does not explain the fresh water loop._
- Nothing to explain — _Normal warming at this power._

**Correct answer**

**Not enough seawater flow to carry the heat away**

**Why (shown in verdict):** The heat has reached the seawater, which clears both the oil cooler and the sensor. It is not leaving, and the only thing that carries it out of the boat is flow.

**Takeaway:** The link that broke is the one where the temperature difference disappears.

### M11.3 — The breaker nobody logged

**Format:** CHOICE · **Area:** FIRE · **Place:** Electrical Distribution

**Scene shown to the player**

> The second seawater pump did not trip; its breaker is open at the switchboard. The quiet-running lineup from two watches ago is still in force and nobody wrote down what it turned off. Every configuration change aboard is a trade somebody made for a reason, and the reason usually expires long before the configuration does. The log is the only thing that carries that reason across a watch change — without it, three watches later, a perfectly sensible decision is indistinguishable from a fault, and it gets diagnosed as one while a bearing heats up.

**Question**  What does this say about the quiet-running lineup?

**Choices offered**

- Securing a machine needs a record of what it was cooling and when it must come back.
- The quiet-running lineup should be restored automatically when the transit ends.
- The bearing should have a high-temperature alarm that trips the pump back on.
- Nothing — the watch that secured it made a reasonable trade at the time.

**Correct answer**

**Securing a machine needs a record of what it was cooling and when it must come back.**

**Why (shown in verdict):** The trade was reasonable and the record was not made, which is why it survived two watch changes. An automatic restore and a temperature alarm are both real engineering answers and both arrive after the heat has: an alarm tells you a bearing is already hot, and neither tells the next watch why the pump was off.

**Why the others do not hold**

- Quiet running is a legitimate reason to secure a pump; the fault is in the handover.
- An automatic restart would defeat the point of a deliberately quiet lineup.
- It was reasonable at the time and stopped being reasonable an hour later, which is the whole problem.

**Takeaway:** A configuration nobody recorded is a configuration nobody will restore.

---

## Mission 12 — Silent-Running Configuration

**Objective:** Decide what may be secured, reduced or rescheduled while keeping the boat alive.

**Stake:** Quiet is bought with capability, and the bill arrives after the transit.

### M12.1 — Four hours of quiet

**Format:** CHOICE · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> Haruki lists what can be secured for the transit. Four hours, and every item saves noise while costing something that will come due before the end of it. Some machines can be restarted the moment they are wanted; others take a plant with them, or leave something quietly heating up while they are off. Radiated noise is what makes a submarine findable, so quiet is worth real money — but it is bought on credit, and the bill arrives at a time you do not choose. Haruki intends to take everything on his list. He wants to know which item you will strike off it.

**Question**  Which of these does the boat refuse, whatever quiet it buys?

**Choices offered**

- Secure the second seawater cooling pump, accepting a rising bearing temperature.
- Come down in turns and accept a longer transit.
- Stop the galley and laundry machinery, which nobody needs for four hours.
- Secure one of two scrubber trains, accepting a slow rise in carbon dioxide.

**Correct answer**

**Secure the second seawater cooling pump, accepting a rising bearing temperature.**

**Why (shown in verdict):** Three of these are reversible the moment somebody wants them back. The cooling pump is not: it starts a clock on a bearing that nobody in the control room can read, and the damage is done before the gauge says so.

**Why the others do not hold**

- Coming down in turns costs time and returns the moment turns are increased. It is the cheapest quiet aboard.
- Galley and laundry are pure noise with no consequence at all in four hours.
- One scrubber train can be spared for a while, because carbon dioxide rises slowly and — unlike a bearing temperature nobody is watching — it is measured continuously.

**Takeaway:** Every quiet decision has an expiry time attached to it.

### M12.2 — How long one scrubber lasts

**Format:** BALLPARK · **Area:** ATMO · **Place:** Auxiliary Machinery & Bilge

**Scene shown to the player**

> With one scrubber train secured, the remaining train removes less carbon dioxide than the crew produces. Lindqvist wants the number of hours before the boat has to make a noise to fix that. A closed atmosphere with a production rate and a removal rate has a net rate, and a net rate measured against a limit is a deadline expressed in hours rather than an argument in the wardroom. Command can plan a transit around a number of hours. It cannot plan around "soon", and it will not slow the boat for a feeling about the air.

**Question**  How long can the boat run on one scrubber train?

**Correct answer**

Equation shown: `{2} ÷ ({0} − {1})`
Tiles offered: `1.4 m³/h  (crew production)`, `1.1 m³/h  (one train removes)`, `6.0 m³  (a one per cent rise, boat-wide)`, `4 h  (the transit)`
Tiles that belong: `1.4 m³/h  (crew production)`, `1.1 m³/h  (one train removes)`, `6.0 m³  (a one per cent rise, boat-wide)`
Decoy tiles: `4 h  (the transit)`
Formula: `c/(a-b)`
**Target: 20 hours** (tolerance ±2)
Explanation shown: Twenty hours against a four-hour transit is a comfortable margin, and knowing it is what makes securing the train a decision rather than a gamble. Had the answer been three hours, the same action would have been reckless.

**Why (shown in verdict):** A rate and a limit give an hour, and an hour is something command can plan a transit around.

**Takeaway:** A slow problem with a known rate is a deadline, and a deadline can be planned around.

### M12.3 — What you give up by being silent

**Format:** CHOICE · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> Rask points out that a quiet boat is also a slow boat, and a slow boat takes longer to build a bearing rate on anything it finds. Passive sonar gives bearing alone, so everything the room knows about where a contact is and where it is going has to be assembled out of how that bearing changes while your own boat moves. Slowing does help the array — much of what it fights is the boat's own machinery. Rask is asking what the same decision costs on the other side of the ledger, before the boat commits to four hours of it.

**Question**  What does slowing down do to the sonar picture?

**Choices offered**

- It makes the boat quieter to listen with, but a track takes longer to develop.
- It has no effect; sonar is passive and does not care about own speed.
- It improves the track, because a slower boat gets more bearings.
- It removes the need for a track, since a slow boat cannot be hit.

**Correct answer**

**It makes the boat quieter to listen with, but a track takes longer to develop.**

**Why (shown in verdict):** Own noise falls, so the array hears more. But a track is built from how the bearing changes as you move, and moving less means waiting longer for the same answer.

**Why the others do not hold**

- Passive sonar hears own-ship noise louder than anything else, so speed matters a great deal.
- More bearings from the same place are not more information about range.
- A slow boat is easier to hit, not harder, because it has fewer options.

**Takeaway:** Quiet buys concealment and spends time, and time is what a track is made of.

---

## Mission 13 — Rig for Dive

**Objective:** Prove the boat is ready before the last patrol, rather than assuming it.

**Stake:** A check skipped alongside is a casualty at depth.

### M13.1 — What the checklist is actually asking

**Format:** PROTOCOL · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> Four items off the rig-for-dive list. A checklist is compressed language: each line is a claim about something that must be true when the boat submerges, written short enough to be read aloud on a busy deck by somebody who already knows what it means. The check is the evidence for the claim. The failures it is guarding against are not variations on one theme either — something that will not move, something nobody has looked at, something that runs and achieves nothing are three different casualties with three different consequences at depth.

**Question**  Match each check to what it proves.

**Situations to match**

- Operate every hull valve through its full travel.
- Read every bilge and log the level.
- Test the drain pump against a closed discharge.
- Walk the compartment and confirm both escape routes are clear.

**Choices offered**

- That the valve will move when it is needed, not just that it exists.
- That the starting level is known, so a rise can be recognised as a rise.
- That the pump can build pressure, not merely turn.
- That the way out is a way out today, and not where the stores were left.

**Correct answer**

1. Operate every hull valve through its full travel.  →  **That the valve will move when it is needed, not just that it exists.**
2. Read every bilge and log the level.  →  **That the starting level is known, so a rise can be recognised as a rise.**
3. Test the drain pump against a closed discharge.  →  **That the pump can build pressure, not merely turn.**
4. Walk the compartment and confirm both escape routes are clear.  →  **That the way out is a way out today, and not where the stores were left.**

**Why (shown in verdict):** Each of these is a different failure: seized, unknown, spinning uselessly, and blocked. One list, four claims.

**Takeaway:** A checklist item is a claim; the check is the evidence for it.

### M13.2 — Dampers before dive

**Format:** SEQUENCE · **Area:** ATMO · **Place:** Auxiliary Machinery & Bilge

**Scene shown to the player**

> The ventilation has been open to the surface all week. Before diving, the boat has to be closed up and the internal air path lined up, and the order of those two things matters. Once the hull is sealed the atmosphere aboard is the only atmosphere there is: what the plant treats, where air can move, and what the readings were before anything went wrong all become fixed facts the crew lives inside for weeks. Some of it is very cheap to get right while there is still a hatch open, and very expensive afterwards.

**Question**  Line up the air before you need it

**Cards to order** (presented shuffled)

- Line up the internal ventilation so every compartment reaches the plant.
- Start the scrubber and oxygen plant and prove they are working.
- Take a handheld reading in each compartment as a starting baseline.
- Shut the boat off from the surface and dive.

**Correct answer**

1. **Line up the internal ventilation so every compartment reaches the plant.**
2. **Start the scrubber and oxygen plant and prove they are working.**
3. **Take a handheld reading in each compartment as a starting baseline.**
4. **Shut the boat off from the surface and dive.**

**Why (shown in verdict):** Once the boat is shut, a damper you forgot is a compartment nobody is treating, and a missing baseline means the first bad reading has nothing to be compared against.

**Takeaway:** The air path has to be proved before the boat is sealed, not after.

### M13.3 — What the last watch left open

**Format:** CHOICE · **Area:** FIRE · **Place:** Electrical Distribution

**Scene shown to the player**

> The switchboard shows two breakers open from maintenance last week. The log says one of them was restored. The lamps and the log disagree, and you are about to send people to work on that cable. A log records what somebody intended to do at the end of a long watch. An indicator records what the switchboard believes about itself. Neither of them is in contact with the conductor your team will have their hands on, and isolation inherited from a watch that has gone to bed has hurt more electricians than faults have.

**Question**  What settles the disagreement?

**Choices offered**

- Meter the circuits and record what you actually find.
- Believe the log, because a person wrote it deliberately.
- Believe the lamps, because they show the present state.
- Close both breakers, since one of them is meant to be closed anyway.

**Correct answer**

**Meter the circuits and record what you actually find.**

**Why (shown in verdict):** The log records an intention and the lamp records what the switchboard thinks. The meter is the only one of the three that is looking at the cable.

**Why the others do not hold**

- A written record is a claim about the past, and the past is what is in dispute.
- An indicator lamp has its own failure modes, which is why this check exists.
- Closing a breaker to resolve an argument is how a fault gets energised.

**Takeaway:** A record and an indicator are two beliefs; a meter is a measurement.

---

## Mission 14 — Refit Decision

**Objective:** Choose what to improve before the last patrol, on evidence rather than preference.

**Stake:** The wrong refit is a patrol spent wishing for the thing you did not buy.

### M14.1 — What the boat should buy

**Format:** CHOICE · **Area:** ENG · **Place:** Machinery Control Room

**Scene shown to the player**

> Four refit proposals, each with a real cost and an honest uncertainty about what it buys. Ahead is a long transit with a constrained passage in the middle of it. Money spent on a boat is really spent on the decisions the boat will have to make: an improvement that makes an already-good number better changes nothing anybody does, while a modest one that removes a blind spot changes what command can risk. You have stood fourteen watches on this boat and you know which arguments kept coming back. The yard will fit two of the four, and Sowande wants your first.

**Question**  Which refit goes first on the yard list?

**Choices offered**

- Re-mount the seawater pumps on new isolators.
- A second independent depth sounder.
- Faster scrubber media, for a wider air margin.
- A larger drain pump, for a worse flooding casualty.

**Correct answer**

**Re-mount the seawater pumps on new isolators.**

**Why (shown in verdict):** After cavitation, the pumps are the largest recorded contributor to the boat's signature — and the signature is what decides whether the boat is found at all in the passage this patrol is built around.

**Why the others do not hold**

- The second sounder is the right next buy and Sowande argues for it two stops from here. What puts the mounts ahead of it is that the array's noise floor is the boat's own machinery, so every contact the passage depends on is limited by the pumps first.
- Faster media improves an air margin that has never come within twenty hours of a limit. A better number nobody was waiting on.
- A larger drain pump has never been the binding constraint in a drill, because the source was always stopped first. It buys minutes in a casualty the boat has not had.

**Takeaway:** You fund what changes a decision, not what improves a number.

### M14.2 — Why isolators and not a better array

**Format:** CHOICE · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> The alternative proposal was a more sensitive array. Rask argues for the pump mounts instead, and the reason is not about the array's quality. Every sonar has a noise floor, and on a submarine that floor is usually set by the boat's own machinery, conducted into the water through the mountings that hold it down. Sensitivity and noise are separate quantities, and only one of them is what the room has been complaining about since the first transit. Say what the mounts buy that a better ear would not.

**Question**  Why do the mounts beat a better array?

**Choices offered**

- The array's limit is our own noise, so removing noise helps more than more sensitivity.
- A new array would not fit the existing hull opening.
- Sensitivity is already perfect and cannot be improved.
- Mounts are cheaper, and cost is the only criterion.

**Correct answer**

**The array's limit is our own noise, so removing noise helps more than more sensitivity.**

**Why (shown in verdict):** When the noise floor is set by the boat itself, a better ear hears that floor more clearly and nothing else.

**Why the others do not hold**

- Fit is an engineering detail, not the reason one buys more than the other.
- No instrument is perfect; this one is limited by its surroundings.
- Cost matters, but it is not why this is the better buy.

**Takeaway:** A more sensitive instrument in a noisier boat hears its own boat better.

### M14.3 — The value of a different failure

**Format:** CHOICE · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> The second depth sounder costs as much as the pump mounts and improves no number on the plot. Sowande wants it anyway. A spare is only worth what it costs when it fails differently from the thing it backs up — two instruments sharing a sensor, a power supply or a source of data also share their mistakes, and they will agree with each other confidently while both being wrong. This boat has been misled twice this patrol by exactly that. Say what the second sounder actually buys, given that it makes nothing on the chart more precise.

**Question**  What does the second sounder actually buy?

**Choices offered**

- A measurement that cannot be wrong for the same reason as the plot.
- A more precise depth, which improves the plot's accuracy.
- A backup for when the first sounder is broken, and nothing more.
- Confirmation of the existing sounder, which builds confidence.

**Correct answer**

**A measurement that cannot be wrong for the same reason as the plot.**

**Why (shown in verdict):** Independence is the whole product. The boat has twice been misled by two displays sharing one source, and this is the fix for that.

**Why the others do not hold**

- Precision is not the problem; the plot has been precisely wrong before.
- It is a backup too, but that is not what makes it worth the money.
- Confirmation from a source that fails the same way is not confirmation.

**Takeaway:** A second instrument is worth having when it fails differently, not when it agrees.

---

## Mission 15 — Deep Watch

**Objective:** Run the whole boat at once, with everything degraded a little and nothing decided for you.

**Stake:** This is the watch the whole campaign has been for, and every department will ask you for something at once.

### M15.1 — Five small problems

**Format:** DIAGNOSIS · **Area:** NAV · **Place:** Control Room

**Scene shown to the player**

> Nothing on the board is red. The plot is four hours old, the contact is faint and unresolved, the forward bilge is wet, one scrubber train is down and a bearing is warm. The boat is closing a constrained passage. A set of small problems is more dangerous than one big one, because none of them is loud enough to demand attention — the watch attends to whatever is shouting, and meanwhile some of these are stable and will keep, while others get quietly worse on their own with nobody touching them. Where the boat is about to be is what turns one of them urgent.

**Question**  What is the first thing that has to change?

**Panel headline**  Nothing on the board is red, and the boat is an hour from a passage it cannot take twice.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Plot | Age of position | 4 h | alarm |
| Sonar | Contact | faint, unresolved | high |
| DC | Forward bilge | wet, not rising | normal |
| Atmosphere | CO₂ | 0.7 %, slowly rising | normal |
| Plant | Bearing temperature | 68 °C, steady | normal |

**Choices offered**

- The age of the position — _Everything else is stable and measured; the plot is the only thing getting worse on its own, and the passage depends on it._
- The unresolved contact — _A faint contact that may be nothing, and can be watched while something else is fixed._
- The wet bilge — _Water that is not rising, which is a note in the log rather than a casualty._
- The carbon dioxide — _A slow rise with twenty hours of margin behind it._
- The warm bearing — _A steady temperature, which is a watch item and not a fault._

**Correct answer**

**The age of the position**

**Why (shown in verdict):** Four of these are stable and one of them degrades every minute without anybody touching it. The passage is what makes it urgent.

**Takeaway:** A set of small problems can be worse than a big one, because none of them demands attention.

### M15.2 — Everything you are not doing yourself

**Format:** PROTOCOL · **Area:** DC · **Place:** Forward Equipment & Handling

**Scene shown to the player**

> You are taking the plot yourself. Four other things need somebody, and Whitfield is waiting with the watch bill. This is the last watch of the patrol and there is more happening than one person can hold in their head: what you assign now is what will actually get done, and an assignment that does not say who has it, what they do first and when they come back is a wish rather than an order. Everything you keep for yourself is attention taken away from the plot you just decided was the priority.

**Question**  Match each item to the assignment that fits it.

**Situations to match**

- The forward bilge, wet but not rising.
- The faint contact nobody has resolved.
- The scrubber train that is down.
- The bearing running warm.

**Choices offered**

- Log the level every ten minutes and report a change, not a number.
- Hold it and get a bearing rate, and report before it resolves rather than after.
- Restore it, or name the hour at which the air stops being optional.
- Restore the second cooling pump, and say what that costs acoustically.

**Correct answer**

1. The forward bilge, wet but not rising.  →  **Log the level every ten minutes and report a change, not a number.**
2. The faint contact nobody has resolved.  →  **Hold it and get a bearing rate, and report before it resolves rather than after.**
3. The scrubber train that is down.  →  **Restore it, or name the hour at which the air stops being optional.**
4. The bearing running warm.  →  **Restore the second cooling pump, and say what that costs acoustically.**

**Why (shown in verdict):** Every one of these asks for a threshold rather than a watch. "Report a change" and "name the hour" are instructions somebody can act on alone; "keep an eye on it" is how four things get watched and none of them gets decided.

**Takeaway:** An assignment that names a threshold can be acted on alone; one that says watch it cannot.

### M15.3 — The report the captain asked for

**Format:** CHOICE · **Area:** SONAR · **Place:** Sonar Room

**Scene shown to the player**

> Commander Vance wants your assessment before the boat enters the passage, and she has been clear all patrol about what she expects in one. Everything you know down here arrived through an instrument with a limit on it — a bearing with no range, a plot with an age, a level read four minutes ago. The person acting on your words cannot see any of those limits unless you put them there. A report is not a summary of your evidence; it is the raw material somebody else makes a decision out of, at speed, without the time to come back and ask what you meant.

**Question**  What belongs in the assessment?

**Choices offered**

- What is known, what is not, and which of the two is about to change.
- The most likely case, stated plainly, without hedging it.
- Every reading from every department, so nothing is left out.
- A recommendation, since the captain has to decide anyway.

**Correct answer**

**What is known, what is not, and which of the two is about to change.**

**Why (shown in verdict):** It is the only form that lets somebody else make a decision. A single likely case hides the error, and a list of readings hands the work back to the person who asked.

**Why the others do not hold**

- A likely case with the uncertainty stripped out is what puts a boat into a bank.
- Everything you know is not a report; it is the raw material for one.
- A recommendation is welcome after the assessment, not instead of it.

**Takeaway:** A report that hides its uncertainty is worse than no report, because it will be acted on.

---

## Grading

Three axes, 1–5 each; the rubric is in `README.md`. Rows marked **Fixed**, **Rebuilt**, **Rewritten** or **Correction** changed after the first audit.

- **Solv** — can a prepared student reach the keyed answer from the scene and panel alone?
- **Edu** — does getting it right require and build transferable subject knowledge?
- **Fit** — does it map onto a named topic in a standard course for the stated audience?

| ID | Format | Topic | Solv | Edu | Fit | Note |
| --- | --- | --- | :-: | :-: | :-: | --- |
| M1.1 | SEQUENCE | Compartment familiarisation | 4 | 4 | 2 | **Rewritten.** The last card now depends on the third: a locker is only the right locker once you know what this compartment can do to you. The boundary comes first because it is a pressure boundary. |
| M1.2 | PROTOCOL | Reading hardware from its form | 4 | 3 | 2 | **Rewritten.** Each fitting is now identified by what happens when it is wrong, and the hull valve by the ten atmospheres behind it at ninety metres. |
| M1.3 | CHOICE | Dead reckoning as a memory task | 5 | 3 | 2 | **Rewritten.** The distractors are now three things that genuinely fail at an interruption — a pace count, a list of turns, a stencil you cannot read in the dark. |
| M2.1 | PROTOCOL | Passive sonar source identification | 4 | 3 | 2 | The discriminators (tracks own throttle / fixed line / no bearing rate) are all supplied in the scene, so it is inference rather than recall. |
| M2.2 | DIAGNOSIS | Sound refraction across a layer | 4 | 4 | 3 | Teaches "a missing narrowband line is evidence, not an absence of evidence" — genuinely transferable. Requires accepting the scene's statement about layer refraction. |
| M2.3 | CHOICE | Constant bearing, decreasing range | 5 | 4 | 3 | Real relative-motion physics, and the classic seamanship rule. Solvable from the scene. |
| M3.1 | BALLPARK | Set × elapsed time | 5 | 3 | 3 | Decoys (own speed, depth, course) are present and appropriate. Arithmetic is one multiplication; the drift is treated as a scalar rather than a vector. |
| M3.2 | DIAGNOSIS | Common-mode failure, independence | 5 | 5 | 3 | The single best idea in the game: two displays fed by one navigator agree *by construction*. Reappears at M14.3 and pays off. |
| M3.3 | CHOICE | Bathymetric line of position | 4 | 3 | 2 | Distractors are weak but the concept (a profile is a shape; shapes can be matched) is real. |
| M4.1 | SEQUENCE | Passage prerequisites | 4 | 4 | 2 | **Rewritten.** Each card states what the next one needs: without the baseline a new sound is just a sound, without the layer a missing line looks like an absent contact. |
| M4.2 | BALLPARK | Uncertainty against a channel width | 5 | 4 | 3 | **Fixed.** The template referenced a slot the player could not fill and the panel returned NaN. Now three slots, three tiles, and a speed decoy. |
| M4.3 | CHOICE | Acoustic vs capability trade | 4 | 4 | 2 | One change before the narrows. Cavitation dominates, so turns are the answer, and each rebuttal concedes what the rival buys. |
| M5.1 | DIAGNOSIS | Source identification by fluid properties | 5 | 4 | 2 | Salinity kills the fresh-water line, unchanged cooling flow kills the sonar return. Cleanly determined. |
| M5.2 | BALLPARK | Inflow rate vs pump rate | 5 | 5 | 3 | **Fixed.** The question asked what the panel never computed. It now computes the sea's actual inflow — the rise plus what the pump is already removing — which is the point the explanation was making all along. |
| M5.3 | PROTOCOL | Isolation and its costs | 4 | 3 | 1 | Sound systems thinking; not a curriculum topic. |
| M6.1 | PROTOCOL | Fire triangle + electrical isolation | 5 | 4 | 3 | Four legs, four non-interchangeable actions. The chemistry (removing fuel/oxidiser/energy) is real, if light. |
| M6.2 | SEQUENCE | Indicator vs measurement | 5 | 4 | 2 | Five cards, and the order is genuinely forced by safety. "An indicator reports a belief; a meter reports a condition" is the game's second-best idea. |
| M6.3 | CHOICE | Smoke removes the instrument | 4 | 3 | 1 | Neat framing; no science content. |
| M7.1 | DIAGNOSIS | Ventilation topology + a failed sensor | 4 | 5 | 3 | The only panel in the repository whose answer is *two simultaneous faults*, and the candidate label states both, so it is still solvable. Excellent reasoning content. |
| M7.2 | BALLPARK | CO₂ production rate → time to a limit | 4 | 4 | 4 | Decoy tiles added: one per cent written as a percentage rather than a fraction, and the depth. The unit trap is the error this problem invites. |
| M7.3 | CHOICE | A path needs an opening and a driver | 5 | 3 | 2 | Solvable directly from the scene. |
| M8.1 | TRIAGE | Prioritise by rate of deterioration | 5 | 3 | 1 | The principle is good and it is stated in the scene, so nothing has to be worked out. |
| M8.2 | PROTOCOL | Delegation | 4 | 3 | 1 | **Rewritten.** The pairings are no longer readable off the department — the plot is fixed by slowing the boat before anybody plots anything. |
| M8.3 | BALLPARK | Distance ÷ speed | 5 | 4 | 3 | **Fixed.** Now computes what slowing actually buys — three hours against one — rather than the time at present speed alone. |
| M9.1 | DIAGNOSIS | Own-noise vs a contact (bearing independence) | 5 | 4 | 3 | "A source everywhere at once is a source you are carrying" — a real localisation principle, fully determined by the panel. |
| M9.2 | SEQUENCE | Change one thing; confirm by restoring | 4 | 5 | 4 | The best methodology item in the game: the fourth card (restore the suspect and hear it return) is what turns correlation into cause. |
| M9.3 | CHOICE | Harmonic order of a rotating fault | 5 | 4 | 3 | **Fixed.** The scene now supplies the rule the question needs: a mass out of balance pulls once per revolution, a shaft out of line twice. |
| M10.1 | DIAGNOSIS | Buoyancy vs dynamic lift; gauge geometry | 5 | 4 | 3 | The two depth gauges disagreeing *by exactly what a bow-down boat produces* is an elegant piece of evidence. |
| M10.2 | BALLPARK | Tonnes per metre × depth gained | 5 | 3 | 3 | Clean, with decoys. One multiplication. |
| M10.3 | PROTOCOL | Dynamic lift vs buoyancy, and their costs | 4 | 4 | 3 | Each of the four is right in some situation, which is exactly what makes it worth asking. |
| M11.1 | SEQUENCE | Heat-transfer chain to the sink | 5 | 4 | 4 | Physically forced order; a genuine thermal-resistance-in-series model. |
| M11.2 | DIAGNOSIS | Where the ΔT disappears | 5 | 5 | 4 | The best physics item in the game. Seawater leaving 2 °C warmer while everything upstream heats proves the flow, not the exchangers, is the broken link. |
| M11.3 | CHOICE | Configuration control | 5 | 3 | 1 | **Rewritten.** The rivals are now real engineering answers — an automatic restore, a high-temperature trip — that both arrive after the heat has. |
| M12.1 | CHOICE | Reversible vs irreversible savings | 5 | 4 | 2 | "Which do you refuse?" — and the criterion is reversibility, which is the takeaway. The cleanest of the three conversions. |
| M12.2 | BALLPARK | Net rate against a limit | 5 | 4 | 4 | 6.0 ÷ (1.4 − 1.1). A genuine production-minus-removal problem with a decoy. |
| M12.3 | CHOICE | Quiet costs bearing rate | 4 | 3 | 2 | A real trade-off with a non-obvious answer. |
| M13.1 | PROTOCOL | A check is evidence for a claim | 4 | 3 | 1 | Four distinct failure modes; good framing, no curriculum content. |
| M13.2 | SEQUENCE | Baseline before the event | 4 | 3 | 2 | The "take a baseline before you seal" card carries real measurement thinking. |
| M13.3 | CHOICE | Record vs indicator vs measurement | 5 | 3 | 2 | Restates M6.2's lesson; still worth having. |
| M14.1 | CHOICE | Fund what changes a decision | 4 | 4 | 2 | Which refit goes first. The rebuttal for the depth sounder is honest: it is the right next buy, and the noise floor is what the passage depends on. |
| M14.2 | CHOICE | Noise floor vs sensitivity | 4 | 5 | 4 | Genuinely good measurement physics: a more sensitive instrument in a noisier system hears the noise better. Transfers to every lab course. |
| M14.3 | CHOICE | Independent failure modes | 5 | 5 | 3 | The campaign's central idea, asked cleanly at the end. |
| M15.1 | DIAGNOSIS | Which problem degrades on its own | 4 | 3 | 1 | Judgement rather than deduction, but the rivals are each killed by a stated reading. |
| M15.2 | PROTOCOL | Delegation, again | 4 | 3 | 1 | **Rewritten.** Every assignment now names a threshold rather than a subject: "report a change", "name the hour it stops being optional". |
| M15.3 | CHOICE | What belongs in a report | 5 | 3 | 2 | Sound; the game's thesis stated plainly. |

### Summary

**Averages: Solvability 4.5 · Educational value 3.7 · Curriculum fit 2.4**

Seven stops taught nothing; none does now. The walkdown, the fittings, the passage prerequisites and both delegation stops were orderings and matchings whose answers were readable off the card text. Each now turns on a dependency: the last card of the walkdown cannot be judged until the third is known, a hull valve is defined by the ten atmospheres behind it at ninety metres, and every delegation names a threshold instead of a subject.

**Curriculum fit stays at 2.4, and that is the game rather than a defect.** Ten stops still score 1 — walkdowns, checklists, watch handover, configuration control. What Deep Watch teaches is reasoning under instrument uncertainty and the cost of a configuration nobody logged. It is the best-written game here and the one hardest to attach to a syllabus, and forcing chemistry into a damage-control locker would have damaged both.
