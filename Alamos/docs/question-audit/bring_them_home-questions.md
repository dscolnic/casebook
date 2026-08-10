# Bring Them Home — every question, with its answer

**Subject:** College physics — motion, circuits, thermal, waves, rotation  
**Audience:** Undergraduate  
**Content source:** `gamekit/themes/bring_them_home/content`  
**Shape:** 15 missions × 3 authored stops = 45 questions. (In play the engine also inserts a callback stop from day 3, drawn from these same lessons.)

---

## Mission 1 — The Failure

**Objective:** Create a trusted state vector and a prioritized anomaly list before commanding the crew.

**Stake:** A wrong early state estimate can turn a survivable failure into a fatal command sequence.

### M1.1 — What failed: the spacecraft or the sensors?

**Format:** DIAGNOSIS · **Area:** INTEG · **Place:** Mission Control

**Scene shown to the player**

> Nine minutes after the bang, several digital cabin-pressure channels drop together within the same second. The crew's mechanical gauge, which is plumbed to the cabin and needs no electronics, is steady. The acoustic leak monitor is quiet, the sensor reference voltage has shifted low, and the radio link is normal. Three readouts are not three independent measurements when they share a reference circuit — a shift in that one voltage moves all of them at once, in step, and that is what a genuine common-mode failure looks like as well. Before the crew spends scarce oxygen and time hunting a leak, the panel has to be read as one system.

**Question**  Which explanation fits the digital alarms, independent physical checks, and shared electronics?

**Panel headline**  Mission Control receives a sudden cabin-pressure warning on several digital channels.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Digital pressure channels | Digital pressure channels | All drop at the same second | alarm |
| Crew mechanical gauge | Crew mechanical gauge | Steady | normal |
| Acoustic leak monitor | Acoustic leak monitor | Quiet | normal |
| Sensor reference voltage | Sensor reference voltage | Shifted low | alarm |
| Radio link quality | Radio link quality | Normal | normal |

**Choices offered**

- Real cabin leak — _Cabin gas is escaping, so independent pressure evidence should also move._
- Common reference failure — _A shared electrical reference biases several digital sensors in the same direction._
- One bad pressure sensor — _A single sensor has failed while the others remain independent and correct._
- Communications corruption — _The radio link is scrambling otherwise valid spacecraft data._

**Correct answer**

**Common reference failure**

**Why (shown in verdict):** The digital channels move together because they share a shifted reference, while the mechanical gauge and leak monitor remain normal and the radio link is clean. The apparent multi-sensor event is actually one common-mode measurement failure.

**Takeaway:** Three readouts are not three independent measurements when they share the same electronics.

### M1.2 — Build the first state estimate

**Format:** SEQUENCE · **Area:** INTEG · **Place:** Telemetry Analysis Room

**Scene shown to the player**

> Nine minutes in, three consoles hold contradictory numbers. Pressure channels disagree with the mechanical gauge, one bus reads zero, the guidance platform has restarted with no record of what it saw, and nothing has been written down in an order anyone can reconstruct. The work now is producing a state estimate that survives being wrong: preserve the telemetry across the failure before it is overwritten, check that units, timestamps and calibration states agree, build position, velocity, attitude, power and pressure with uncertainties attached, and issue only commands whose benefit holds across the whole range of states still consistent with the data.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Freeze and preserve the pre- and post-failure telemetry.
- Verify units, timestamps, calibration states, and shared dependencies.
- Construct position, velocity, attitude, power, pressure, and temperature estimates with uncertainties.
- Issue only commands whose benefits remain robust across the plausible states.

**Correct answer**

1. **Freeze and preserve the pre- and post-failure telemetry.**
2. **Verify units, timestamps, calibration states, and shared dependencies.**
3. **Construct position, velocity, attitude, power, pressure, and temperature estimates with uncertainties.**
4. **Issue only commands whose benefits remain robust across the plausible states.**

**Why (shown in verdict):** Evidence preservation and metadata validation precede state estimation and action.

**Takeaway:** A good emergency command works across uncertainty rather than assuming it away.

### M1.3 — Spend the first ten minutes

**Format:** CHOICE · **Area:** INTEG · **Place:** Spacecraft Systems Console

**Scene shown to the player**

> Four controllers, a crew flying a vehicle that is venting something, and ten minutes before the next tracking pass. Every subsystem wants the loop and each believes their own problem is the one that kills the crew. Attention is a physical resource here in the same way propellant is: reconstructing the electrical and pressure timeline tells you what happened, verifying trajectory independently tells you whether the vehicle can still come home, and a single anomaly log with one command authority is what stops two rooms acting on different versions of the same number. Asking all six subsystems for complete reports at once spends the ten minutes and returns nothing usable.

**Question**  Ten minutes to the next tracking pass. What does the flight director do first?

**Choices offered**

- Establish a single anomaly log and one command authority.
- Reconstruct the electrical and pressure timeline.
- Verify the trajectory and attitude independently.
- Ask every subsystem for a complete report at once.

**Correct answer**

**Establish a single anomaly log and one command authority.**

**Why (shown in verdict):** Four controllers are already working the same failure from four sets of numbers. Until there is one record and one voice, every analysis that follows can be done twice and contradicted once — and the crew executes whichever version reaches them.

**Why the others do not hold**

- The electrical and pressure timeline is the first real analysis, and it is exactly what the log exists to hold. Start it second and it survives the shift change.
- Independent trajectory verification decides whether the vehicle can come home. It is needed before the burn, not before the room is organised.
- Six complete subsystem reports arrive after the tracking pass and consume the ten minutes that were supposed to prepare for it.

**Takeaway:** Attention is a scarce physical resource during a fast-moving systems failure.

---

## Mission 2 — Find the Spacecraft

**Objective:** Produce a consistent trajectory estimate and identify which new observation most reduces uncertainty.

**Stake:** Losing the spacecraft’s state by even a small amount can make a later engine burn miss the safe return corridor.

### M2.1 — Which measurement constrains what?

**Format:** PROTOCOL · **Area:** NAV · **Place:** Deep-Space Tracking Station

**Scene shown to the player**

> The onboard computer has restarted and the tracking is intermittent, so the state has to be rebuilt from whatever measurements exist. Each type constrains a different thing: two-way signal travel time fixes how far away the spacecraft is and says nothing about direction; Doppler shift measures the rate at which that distance is changing; an angular position against background stars fixes direction and not distance; repeated positions at known times give velocity by differencing. Navigation is reconstruction from partial projections — no single measurement type gives the full six-dimensional state, and knowing which is which decides what to schedule next.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Two-way signal travel time.
- Doppler frequency shift.
- Angular position against background stars.
- Repeated positions at known times.

**Choices offered**

- Range along the line of sight.
- Line-of-sight velocity.
- Direction on the sky.
- Velocity and acceleration trends.

**Correct answer**

1. Two-way signal travel time.  →  **Range along the line of sight.**
2. Doppler frequency shift.  →  **Line-of-sight velocity.**
3. Angular position against background stars.  →  **Direction on the sky.**
4. Repeated positions at known times.  →  **Velocity and acceleration trends.**

**Why (shown in verdict):** No single measurement supplies the full state vector; geometry and time combine complementary constraints.

**Takeaway:** Navigation is a reconstruction from partial projections.

### M2.2 — Reconstruct the state vector

**Format:** SEQUENCE · **Area:** NAV · **Place:** Guidance Room

**Scene shown to the player**

> The onboard computer restarted and lost its alignment. What is left is a range measurement from one station, two bearing angles taken ninety minutes apart, and a Doppler trace recorded in a different time standard from either. The burn that gets the crew home is planned from those three. A state estimate is only worth having if it predicts the next observation: transform everything into one coordinate and time system, fit a trajectory that reproduces range, angle and Doppler together, look at what the fit got wrong for structure that indicates an unmodelled force, and propagate both state and uncertainty forward to the moment the decision has to be made.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Transform all observations into one coordinate and time system.
- Fit a trajectory that predicts range, angle, and Doppler together.
- Examine residuals for bias or unmodeled acceleration.
- Propagate the state and uncertainty to the next decision time.

**Correct answer**

1. **Transform all observations into one coordinate and time system.**
2. **Fit a trajectory that predicts range, angle, and Doppler together.**
3. **Examine residuals for bias or unmodeled acceleration.**
4. **Propagate the state and uncertainty to the next decision time.**

**Why (shown in verdict):** Common coordinates and clocks are prerequisites for a joint fit.

**Takeaway:** A useful state estimate predicts future observations and exposes its own failures.

### M2.3 — Distance from signal delay

**Format:** BALLPARK · **Area:** NAV · **Place:** Navigation Computation Lab

**Scene shown to the player**

> A tracking pulse leaves the dish and the echo returns 2.6 seconds later. Radio travels at the speed of light and the pulse makes the trip twice, which is the only subtlety in the arithmetic and the one people drop. This single number is worth more than an hour of angular measurements right now, because range is exactly the quantity the restarted computer lost, and it is measured directly rather than inferred from a fit.

**Question**  Estimate the spacecraft range.

**Correct answer**

Equation shown: `{0} × {1} ÷ {2}`
Tiles offered: `3.0e8 m/s (speed of light)`, `2.6 s (round-trip time)`, `2 (out and back)`, `1.3 s (half the round trip)`, `343 m/s (speed of sound in air)`
Tiles that belong: `3.0e8 m/s (speed of light)`, `2.6 s (round-trip time)`, `2 (out and back)`
Decoy tiles: `1.3 s (half the round trip)`, `343 m/s (speed of sound in air)`
Formula: `a*b/c`
**Target: 390000000 m** (tolerance ±30000000)
Explanation shown: Halving the time and halving the answer come to the same thing, which is why the factor of two is the step people drop rather than get wrong. Sound has no part in it: the measurement is radio, in vacuum.

**Why (shown in verdict):** Range is the one quantity the restarted computer lost, and it is measured here directly rather than inferred from a fit — which is why one pulse is worth more than an hour of angles.

**Takeaway:** Travel time converts directly into range when the propagation speed is known.

---

## Mission 3 — The Wrong Trajectory

**Objective:** Choose a correction that restores a safe return while preserving fuel and engine options.

**Stake:** A failed correction can leave the crew without enough fuel or geometry to reenter Earth’s atmosphere.

### M3.1 — From force to trajectory change

**Format:** SEQUENCE · **Area:** INTEG · **Place:** Orbital Analysis Room

**Scene shown to the player**

> The spacecraft is drifting off the free-return path by an amount that is small today and fatal at the atmosphere. The crew wants to know why a few seconds of thrust now matters more than minutes of thrust tomorrow. The chain is Newtonian and worth stating in order: an engine produces a force for a measured time, the force gives the vehicle an acceleration set by its mass, that acceleration changes velocity by an amount proportional to the impulse, and the new velocity changes where the vehicle is hours later. Trajectory control acts on velocity now to move position much later — which is also why an early correction is cheap.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- An engine produces a force for a measured time.
- The force gives the spacecraft an acceleration.
- Acceleration changes velocity by an impulse-dependent amount.
- The new velocity changes the later orbit and encounter geometry.

**Correct answer**

1. **An engine produces a force for a measured time.**
2. **The force gives the spacecraft an acceleration.**
3. **Acceleration changes velocity by an impulse-dependent amount.**
4. **The new velocity changes the later orbit and encounter geometry.**

**Why (shown in verdict):** A short force changes velocity, and orbital motion amplifies that change over time.

**Takeaway:** Trajectory control acts on velocity now to change position much later.

### M3.2 — Small burn, large consequence

**Format:** BALLPARK · **Area:** NAV · **Place:** Guidance Console

**Scene shown to the player**

> A 30,000 kg spacecraft receives 6,000 N of thrust for 20 seconds, and the flight dynamics officer wants the resulting change in speed on the loop before the burn is approved. Force applied over time is impulse; impulse divided by mass is the velocity change. The number will look absurdly small next to an orbital speed measured in kilometres per second — and that is the point being taught, because a velocity change of a few metres per second applied days out moves the arrival point by hundreds of kilometres.

**Question**  Estimate the change in speed.

**Correct answer**

Equation shown: `{0} × {1} ÷ {2}`
Tiles offered: `6,000 N (thrust)`, `20 s (burn duration)`, `30,000 kg (vehicle mass)`, `9.81 m/s² (surface gravity)`, `1,500 s (specific impulse)`
Tiles that belong: `6,000 N (thrust)`, `20 s (burn duration)`, `30,000 kg (vehicle mass)`
Decoy tiles: `9.81 m/s² (surface gravity)`, `1,500 s (specific impulse)`
Formula: `a*b/c`
**Target: 4 m/s** (tolerance ±0.3)
Explanation shown: Force times time is impulse; impulse divided by mass is the velocity change. Surface gravity has no bearing on a vehicle in free flight, and specific impulse would tell you what the burn costs in propellant rather than what it achieves.

**Why (shown in verdict):** Four metres per second looks absurd beside an orbital speed in kilometres per second. Applied days out, it is hundreds of kilometres at arrival — which is why an early correction is cheap and a late one is not.

**Takeaway:** Orbital corrections often rely on small velocity changes applied early.

### M3.3 — Choose the correction strategy

**Format:** CHOICE · **Area:** NAV · **Place:** Propulsion Desk

**Scene shown to the player**

> The drift is real but the tracking is thin, and the propellant is not replaceable. Correcting now costs little and risks correcting toward a state that has been measured badly; waiting buys a better measurement and a much larger burn, because the same positional error costs more velocity to fix the closer you are to arrival. Preserving a backup engine and an alternate attitude plan costs capability that could have gone into the burn itself. The plan that wins is not the one that is cheapest against the current best estimate but the one that still works if that estimate is wrong.

**Question**  The drift is real and the tracking is thin. What do you do?

**Choices offered**

- Make an early modest correction, then track it hard.
- Wait for a better state estimate and accept a larger late burn.
- Preserve the backup engine and an alternate attitude plan instead.
- Correct now against the single best trajectory solution held.

**Correct answer**

**Make an early modest correction, then track it hard.**

**Why (shown in verdict):** The same positional error costs more velocity to remove the closer the vehicle is to arrival, so an early burn is cheap. What makes it safe rather than merely cheap is the tracking afterwards: a modest correction against an uncertain state can be measured and corrected again, and a large one cannot.

**Why the others do not hold**

- Waiting buys a better measurement and pays for it in propellant that cannot be replaced, at the point in the trajectory where propellant is worth most.
- Preserving a backup engine is a constraint on how you burn. It is not an alternative to burning, and the drift does not stop while it is being preserved.
- One unverified solution is how a correction is made confidently toward the wrong place. The burn is only as good as the state it was computed from.

**Takeaway:** The best trajectory plan balances efficiency with robustness to model and hardware uncertainty.

---

## Mission 4 — Turn Without Wasting Fuel

**Objective:** Develop a controlled reorientation procedure that stops the rotation at the required attitude.

**Stake:** An uncontrolled tumble can eliminate communications, solar power, and the precise attitude needed for a return burn.

### M4.1 — Read rotational motion

**Format:** PROTOCOL · **Area:** STRUCT · **Place:** Attitude Dynamics Lab

**Scene shown to the player**

> The main guidance platform is unavailable and the crew is about to fly the vehicle by hand, so the room needs the rotational mechanics stated plainly. Applying the same force farther from the centre of mass increases the torque; increasing the moment of inertia with the same torque reduces the angular acceleration; equal and opposite torques applied for equal times leave the angular momentum where it started; moving internal masses with no external torque acting changes the shape of the vehicle but not its total angular momentum. Attitude control is Newtonian mechanics about a centre of mass, and each of these has a consequence the crew will feel.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Apply the same force farther from the center of mass.
- Increase moment of inertia with the same torque.
- Apply equal and opposite torques for equal times.
- Move internal masses while no external torque acts.

**Choices offered**

- Larger torque.
- Smaller angular acceleration.
- Approximately cancel the net angular impulse.
- Total angular momentum remains conserved, though rotation distribution can change.

**Correct answer**

1. Apply the same force farther from the center of mass.  →  **Larger torque.**
2. Increase moment of inertia with the same torque.  →  **Smaller angular acceleration.**
3. Apply equal and opposite torques for equal times.  →  **Approximately cancel the net angular impulse.**
4. Move internal masses while no external torque acts.  →  **Total angular momentum remains conserved, though rotation distribution can change.**

**Why (shown in verdict):** Rotation depends on lever arm, inertia, and angular impulse.

**Takeaway:** Attitude control is Newtonian mechanics around a center of mass.

### M4.2 — Execute a manual attitude maneuver

**Format:** SEQUENCE · **Area:** INTEG · **Place:** Crew Procedures Room

**Scene shown to the player**

> The guidance platform is off and the crew must turn the spacecraft ninety degrees using two thruster pairs and a window. There is no rate display, no automatic attitude hold, and every pulse spends propellant the entry burn is counting on. In space nothing damps the rotation: a torque that starts the turn will keep it turning until an equal and opposite one stops it, which means the braking pulse has to be planned before the target attitude arrives, not when it does. Overshoot is paid for twice — once to stop and once to come back.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Identify current attitude and angular rate from independent cues.
- Apply a bounded torque to begin rotation.
- Coast while monitoring angular rate and target geometry.
- Apply counter-torque early enough to stop at the target.

**Correct answer**

1. **Identify current attitude and angular rate from independent cues.**
2. **Apply a bounded torque to begin rotation.**
3. **Coast while monitoring angular rate and target geometry.**
4. **Apply counter-torque early enough to stop at the target.**

**Why (shown in verdict):** Starting and stopping are separate impulse decisions; waiting until the target guarantees overshoot.

**Takeaway:** Rotational maneuvers require planning the braking phase before the target is reached.

### M4.3 — Torque from a thruster

**Format:** BALLPARK · **Area:** NAV · **Place:** Guidance Console

**Scene shown to the player**

> A 200 N thruster fires at right angles, three metres from the centre of mass, and the crew needs the torque before they can predict how fast the vehicle will start to turn. Torque is force times lever arm times the sine of the angle between them, which at ninety degrees is one. The same thruster mounted closer in would produce proportionally less turn for the same propellant — location matters as much as magnitude, and on a vehicle this size the lever arm is the term the crew can actually choose.

**Question**  Estimate the torque about the centre of mass.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `3 m (lever arm to the centre of mass)`, `200 N (thruster force)`, `1.5 m (distance to the docking ring)`, `30,000 kg (vehicle mass)`, `0.5 (cosine of 60°)`
Tiles that belong: `3 m (lever arm to the centre of mass)`, `200 N (thruster force)`
Decoy tiles: `1.5 m (distance to the docking ring)`, `30,000 kg (vehicle mass)`, `0.5 (cosine of 60°)`
Formula: `a*b`
**Target: 600 N m** (tolerance ±40)
Explanation shown: Torque is force times lever arm times the sine of the angle between them, and at right angles that last factor is one — which is why it does not appear. The lever arm has to be measured to the centre of mass, not to whatever structure is nearest.

**Why (shown in verdict):** The same thruster mounted closer in produces proportionally less turn for the same propellant. On a vehicle this size the lever arm is the term the crew can actually choose.

**Takeaway:** Force location matters as much as force magnitude in rotational control.

---

## Mission 5 — The Power Budget

**Objective:** Build a load-shedding plan that preserves essential functions through the next critical maneuver.

**Stake:** An apparently minor load can consume the reserve needed for the only safe course correction.

### M5.1 — How long can the battery last?

**Format:** BALLPARK · **Area:** ELEC · **Place:** Electrical Systems Room

**Scene shown to the player**

> The fuel cells are gone and the crew is on entry batteries days earlier than any plan allowed for. The flight surgeon wants an endurance number before the next powerdown decision. Energy and power are different quantities: the batteries hold about 18 kilowatt-hours of usable energy, and the essential loads draw about 3 kilowatts. Endurance is inventory divided by rate, and it is an ideal figure — it assumes the load stays flat and every last watt-hour is available, neither of which is true. It is still the number every other decision this shift will be argued against.

**Question**  Estimate the ideal endurance.

**Correct answer**

Equation shown: `{0} ÷ {1}`
Tiles offered: `18 kWh (usable energy)`, `3 kW (essential load)`, `28 V (bus voltage)`, `3.5 kW (peak load, briefly)`, `6 h (time to the next burn)`
Tiles that belong: `18 kWh (usable energy)`, `3 kW (essential load)`
Decoy tiles: `28 V (bus voltage)`, `3.5 kW (peak load, briefly)`, `6 h (time to the next burn)`
Formula: `a/b`
**Target: 6 h** (tolerance ±0.4)
Explanation shown: Energy is an inventory and power is the rate it is spent at; the hours come from dividing one by the other. Bus voltage describes how the energy is delivered and says nothing about how much there is.

**Why (shown in verdict):** It is an ideal figure — it assumes the load stays flat and every last watt-hour is available, and neither is true. It is still the number every other decision this shift gets argued against.

**Takeaway:** Power is the rate of energy use; endurance depends on both energy inventory and load.

### M5.2 — Why is bus voltage collapsing?

**Format:** DIAGNOSIS · **Area:** INTEG · **Place:** Spacecraft Load Panel

**Scene shown to the player**

> The power bus is sagging at 24 volts instead of 28 while the total load current sits near its planned value. Solar-array current is normal, so generation is healthy; battery current is higher than expected, and there is a hot spot at one junction. Voltage, current and heat are three views of one energy picture — a resistance somewhere in the path drops voltage in proportion to the current through it and dissipates that lost power as heat, exactly where the resistance is. The panel has enough in it to locate the fault rather than guess at it.

**Question**  Which fault fits the voltage, current, generation, and thermal evidence?

**Panel headline**  The spacecraft power bus sags under a normal load.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Main bus voltage | Main bus voltage | 24 V instead of 28 V | alarm |
| Battery current | Battery current | Higher than expected | alarm |
| Solar-array current | Solar-array current | Normal | normal |
| Total load current | Total load current | Near planned value | alarm |
| Connector temperature | Connector temperature | Hot spot at one junction | alarm |

**Choices offered**

- High-resistance connection — _A resistive junction drops voltage and converts electrical power to heat._
- Large hidden load — _An unexpected device draws much more current and pulls down the bus._
- Solar-array failure — _Generation falls sharply, forcing the battery to replace missing array current._
- Bad voltmeter only — _The bus is healthy and the low voltage exists only in one measurement channel._

**Correct answer**

**High-resistance connection**

**Why (shown in verdict):** Normal array and load currents rule against missing generation or a major new load, while the hot junction supplies the expected signature of resistive voltage drop and heating.

**Takeaway:** Electrical faults are easier to localize when voltage, current, and heat are treated as parts of one energy picture.

### M5.3 — Shed load without losing the mission

**Format:** CHOICE · **Area:** INTEG · **Place:** Mission Planning Desk

**Scene shown to the player**

> The energy inventory is fixed and the loads are not. Guidance needs power at known times and is useless outside them; communications wants it continuously and degrades gracefully; thermal control wants it before the cabin is cold rather than after, because reheating a cold cabin costs far more than holding a warm one; life support cannot be switched off at all. A power plan is an allocation across time as well as across systems, and the loads that look cheapest to shed are often the ones whose consequences arrive later and cost more.

**Question**  Which load comes off the bus first?

**Choices offered**

- Continuous high-bandwidth communications.
- Life support and cabin circulation.
- Guidance and the timed navigation windows.
- Thermal survival loads and battery conditioning.

**Correct answer**

**Continuous high-bandwidth communications.**

**Why (shown in verdict):** It is the only load on the bus that degrades gracefully. A lower rate and a narrower channel still get the numbers down; everything else on the list either cannot be switched off or costs more to restore than it saved.

**Why the others do not hold**

- Life support is not a load that can be traded. It is the reason the rest of the vehicle is powered.
- Guidance draws power at known times and none outside them, so it is scheduled rather than shed — and the window it needs is the burn that gets the crew home.
- [object Object]

**Takeaway:** A power plan matches load timing and consequence to a finite energy inventory.

---

## Mission 6 — A Dangerous Battery Configuration

**Objective:** Approve only a configuration whose voltage, current sharing, and failure behavior are understood.

**Stake:** A battery intended to save the spacecraft can become a fire source in a sealed cabin.

### M6.1 — Series or parallel?

**Format:** PROTOCOL · **Area:** ELEC · **Place:** Battery Test Bench

**Scene shown to the player**

> Engineers want to reconnect battery modules and the room needs the electrical consequences agreed before anything is wired. Equal cells in series add their voltages while carrying the same current; the same cells in parallel hold the voltage and share the current. A parallel branch that gains resistance stops carrying its share, and the other branches pick it up. A single open cell in a series string stops the whole string. Redundancy is only redundancy when the connection topology and the protection behaviour are both explicit — otherwise adding a module can remove capability.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Add equal cells in series.
- Add equal cells in parallel.
- One parallel branch gains resistance.
- One series cell opens.

**Choices offered**

- Total voltage increases.
- Current capacity can increase while voltage stays similar.
- That branch carries less current and sharing becomes unequal.
- The entire series path is interrupted.

**Correct answer**

1. Add equal cells in series.  →  **Total voltage increases.**
2. Add equal cells in parallel.  →  **Current capacity can increase while voltage stays similar.**
3. One parallel branch gains resistance.  →  **That branch carries less current and sharing becomes unequal.**
4. One series cell opens.  →  **The entire series path is interrupted.**

**Why (shown in verdict):** Circuit topology controls voltage, current sharing, and failure propagation.

**Takeaway:** Redundancy is useful only when connection and protection behavior are explicit.

### M6.2 — Heating at a bad connection

**Format:** BALLPARK · **Area:** ELEC · **Place:** Electrical Integration Room

**Scene shown to the player**

> A connector in the improvised path develops 0.05 ohms while carrying 20 amps, and somebody has to say whether that matters before it is bolted up inside a sealed cabin. Resistive heating is current squared times resistance, which means the current term dominates: the same connector at half the current would dissipate a quarter of the power. The resistance sounds negligible written down and the wattage it produces at this current is what decides whether the junction runs warm or starts a fire.

**Question**  Estimate the heating power at the connection.

**Correct answer**

Equation shown: `{0}² × {1}`
Tiles offered: `20 A (current through the joint)`, `0.05 Ω (joint resistance)`, `28 V (bus voltage)`, `0.5 Ω (resistance of the whole cable run)`, `10 A (half the current)`
Tiles that belong: `20 A (current through the joint)`, `0.05 Ω (joint resistance)`
Decoy tiles: `28 V (bus voltage)`, `0.5 Ω (resistance of the whole cable run)`, `10 A (half the current)`
Formula: `a*a*b`
**Target: 20 W** (tolerance ±2)
Explanation shown: The bus voltage is the wrong term: the power lost in a series joint depends on the current through it and the voltage across it, not the voltage of the system it sits in. Current enters squared, so the same joint at 10 A would dissipate a quarter as much.

**Why (shown in verdict):** Twenty watts sounds like nothing until you notice where it is going — into a connector, inside a sealed cabin, with no air moving over it.

**Takeaway:** Small resistances matter when current is large because heating scales with current squared.

### M6.3 — Qualify the emergency battery plan

**Format:** CHOICE · **Area:** INTEG · **Place:** Crew Procedure Simulator

**Scene shown to the player**

> Engineers want to reconnect a module from the damaged bus to buy hours of endurance. Nobody knows the module's state of charge, the connector was never designed for this current, and the crew is inside a sealed cabin with the hardware. A mismatched module connected in parallel with a charged one will equalise through whatever resistance lies between them, which can mean a large current through a connector chosen for a much smaller one. Improvisation in an emergency is legitimate; what makes it survivable is measuring the quantities that decide the outcome first, and providing protection that acts before anybody smells anything.

**Question**  Engineers want to bolt the module in now. What has to happen first?

**Choices offered**

- Verify the module's voltage and state of charge.
- Measure current sharing and connector temperature under load.
- Add independent fusing and an isolation procedure.
- Connect it and watch for smoke, with the crew standing by.

**Correct answer**

**Verify the module's voltage and state of charge.**

**Why (shown in verdict):** A mismatched module connected in parallel equalises through whatever resistance lies between the two, and the current that flows is set by the voltage difference. That difference is the one quantity nobody has measured, and it decides whether the connector runs warm or starts a fire in a sealed cabin.

**Why the others do not hold**

- Current sharing and connector temperature are measured under load — which is after the connection this decision is about.
- Independent fusing is required and is protection against being wrong. It is not a substitute for knowing, and a fuse chosen for the wrong current is not protection at all.
- Connecting first inside a sealed cabin makes the crew the instrument, and smoke is a reading that arrives too late to act on.

**Takeaway:** Emergency electrical improvisation should still be bounded by measurements and protection.

---

## Mission 7 — The Cabin Is Cooling

**Objective:** Create a thermal survival plan that protects crew, electronics, and batteries with minimal power.

**Stake:** Cold can disable batteries and electronics before average cabin temperature appears immediately dangerous.

### M7.1 — How much does the cabin cool?

**Format:** BALLPARK · **Area:** THERM · **Place:** Thermal Control Lab

**Scene shown to the player**

> With the systems powered down the cabin is losing about a kilowatt more than it generates, and the flight surgeon wants to know how long the crew has before the temperature becomes a medical problem. A lumped estimate treats the cabin and its contents as one thermal mass of about 12 million joules per kelvin: energy lost divided by heat capacity gives the temperature drop over three hours. Thermal inertia is why the cabin cools slowly rather than instantly when the power goes — and also why reheating it later is expensive.

**Question**  Estimate the temperature drop over three hours.

**Correct answer**

Equation shown: `{0} × {1} ÷ {2}`
Tiles offered: `1,000 W (net heat loss)`, `10,800 s (three hours)`, `12e6 J/K (heat capacity)`, `3 h (three hours, in hours)`, `4 °C (present cabin temperature)`
Tiles that belong: `1,000 W (net heat loss)`, `10,800 s (three hours)`, `12e6 J/K (heat capacity)`
Decoy tiles: `3 h (three hours, in hours)`, `4 °C (present cabin temperature)`
Formula: `a*b/c`
**Target: 0.9 K** (tolerance ±0.1)
Explanation shown: A watt is a joule per second, so the time has to be in seconds or the answer is out by 3,600. That is the arithmetic slip this problem exists to catch.

**Why (shown in verdict):** Thermal inertia is why the cabin cools slowly rather than instantly when the power goes — and it is also why reheating it later costs far more than holding it warm.

**Takeaway:** Thermal inertia can make temperature change slowly even when power is lost.

### M7.2 — Choose the heat-transfer mechanism

**Format:** PROTOCOL · **Area:** THERM · **Place:** Cabin Environment Console

**Scene shown to the player**

> The cabin is cooling and the crew is looking for what to do about it, which means first identifying how the heat is actually leaving. Crew huddling and sharing direct contact is conduction between bodies; air circulation moving warmth around the cabin is convection; a cold wall receiving infrared from warmer objects is radiation; a metal strut carrying heat to external structure is conduction to a sink. Each pathway has a different countermeasure — insulation, circulation, surface treatment, thermal isolation — so naming the dominant one is what makes an intervention more than a guess.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Crew huddle and share direct contact.
- Air circulation moves heat around the cabin.
- A cold wall receives infrared energy from warmer objects.
- A metal strut conducts heat to an external structure.

**Choices offered**

- Conduction between bodies.
- Convection or forced air transport.
- Radiation.
- Conduction through a solid path.

**Correct answer**

1. Crew huddle and share direct contact.  →  **Conduction between bodies.**
2. Air circulation moves heat around the cabin.  →  **Convection or forced air transport.**
3. A cold wall receives infrared energy from warmer objects.  →  **Radiation.**
4. A metal strut conducts heat to an external structure.  →  **Conduction through a solid path.**

**Why (shown in verdict):** Thermal management uses all three transfer modes and heat storage.

**Takeaway:** Identifying the pathway reveals which intervention can reduce loss.

### M7.3 — Keep the cabin survivable

**Format:** CHOICE · **Area:** INTEG · **Place:** Materials and Insulation Shop

**Scene shown to the player**

> With the systems powered down the cabin is at 4 degrees and falling, condensation is forming on the walls, and the crew is sleeping in their suits. Heating everything is not affordable on the remaining energy, so the question is what gets heated and when: insulating the crew zone and the critical batteries concentrates a fixed budget where the consequences are worst, short circulation periods limit the temperature gradients that drive the condensation, and monitoring several locations is what tells you whether either is working. Thermal survival is an allocation problem across space, time and consequence.

**Question**  Four degrees and falling, on a fixed energy budget. What do you spend it on?

**Choices offered**

- Insulate the crew zone and the critical batteries.
- Schedule short circulation periods to limit gradients.
- Heat the whole spacecraft continuously at a low level.
- Monitor temperature at several representative locations.

**Correct answer**

**Insulate the crew zone and the critical batteries.**

**Why (shown in verdict):** Insulation changes the rate at which heat leaves rather than replacing the heat that left, so it is the only option whose benefit does not stop when the energy does. Concentrating it on the crew and the batteries puts a fixed budget where the consequences of being cold are worst.

**Why the others do not hold**

- Short circulation periods limit the gradients that drive condensation and cost power every time they run. Worth doing; not what keeps anybody alive.
- Heating the whole vehicle spends the budget on volume nobody is in, and the loss scales with the surface it is heating.
- Monitoring is how you find out whether any of this worked. It warms nothing.

**Takeaway:** Thermal survival is an allocation problem across space, time, and consequence.

---

## Mission 8 — The Air Problem

**Objective:** Develop a safe temporary air-cleaning and circulation strategy using only validated physical principles and monitored limits.

**Stake:** A poorly designed improvised filter can reduce circulation enough to make the cabin less safe.

### M8.1 — Diagnose the air system

**Format:** DIAGNOSIS · **Area:** INTEG · **Place:** Life-Support Laboratory

**Scene shown to the player**

> Cabin carbon dioxide is rising even though the scrubber fan still draws normal current. Total cabin pressure is stable, so nothing is leaking. Airflow through the scrubber is low and the pressure drop across the filter is high. Powering a machine is not the same as achieving its function: a fan spinning against a blocked path draws its current and moves almost no air, and the CO2 it fails to carry to the sorbent goes on accumulating in the cabin regardless. The panel measures both the machine and the quantity it is supposed to transport, which is what makes the diagnosis possible.

**Question**  Which explanation fits the gas, pressure, flow, and electrical readings together?

**Panel headline**  Cabin carbon dioxide rises even though the scrubber fan still draws power.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Cabin CO2 | Cabin CO2 | Rising | alarm |
| Total cabin pressure | Total cabin pressure | Stable | normal |
| Scrubber fan current | Scrubber fan current | Normal | normal |
| Airflow through scrubber | Airflow through scrubber | Low | alarm |
| Pressure drop across filter | Pressure drop across filter | High | alarm |

**Choices offered**

- Blocked scrubber flow path — _High resistance restricts circulation through otherwise powered equipment._
- Fan power failure — _The motor is unpowered and therefore cannot move air._
- Cabin leak — _Gas escapes the spacecraft and total pressure should fall._
- CO2 sensor bias — _The gas is normal and only one concentration measurement is wrong._

**Correct answer**

**Blocked scrubber flow path**

**Why (shown in verdict):** The fan is powered but airflow is low and filter pressure drop is high. Stable cabin pressure argues against a leak, so a flow restriction best explains the rising CO2.

**Takeaway:** Powering a machine is not the same as achieving its function; measure the transported quantity as well as the motor.

### M8.2 — CO2 production scale

**Format:** BALLPARK · **Area:** THERM · **Place:** Cabin Air Console

**Scene shown to the player**

> Three crew members each exhale roughly 20 litres of carbon dioxide an hour, and the workshop needs to know what the improvised scrubber has to keep up with over the next six hours. Source rate sets the minimum removal requirement — a fix that removes CO2 more slowly than the crew produces it only changes how fast the concentration climbs, not whether it does. The estimate is crude and it is the number that decides whether the tape-and-hose solution is worth building at all.

**Question**  Estimate the carbon dioxide produced in six hours.

**Correct answer**

Equation shown: `{0} × {1} × {2}`
Tiles offered: `3 people`, `20 L/person/hour`, `6 hours`, `24 hours (a full day)`, `1.0 kg/person/day (mass basis)`
Tiles that belong: `3 people`, `20 L/person/hour`, `6 hours`
Decoy tiles: `24 hours (a full day)`, `1.0 kg/person/day (mass basis)`
Formula: `a*b*c`
**Target: 360 L** (tolerance ±25)
Explanation shown: A rate per person per hour needs a head count and an interval, and both have to match the question asked. A daily mass figure describes the same crew and cannot be multiplied into this one without a density and a different arithmetic.

**Why (shown in verdict):** Source rate sets the minimum the fix has to achieve. A scrubber that removes less than this only changes how fast the concentration climbs.

**Takeaway:** Source rate sets the minimum removal requirement.

### M8.3 — Restore breathable air

**Format:** CHOICE · **Area:** INTEG · **Place:** Crew Hardware Workshop

**Scene shown to the player**

> Carbon dioxide is climbing on the cabin sensor and the spare canisters are the wrong shape for the sockets in this module. There is tape, a suit hose, a sock and a flight-plan cover, and the fix has to work first time. Two things have to be true at once: enough sorbent surface exposed to take the CO2 chemically, and a sealed flow path that actually forces cabin air through it rather than around it. Bypass is the failure mode that looks like success — the fan runs, the crew hears it, and the concentration keeps rising.

**Question**  Tape, a suit hose, a sock and a flight-plan cover. What must the fix get right?

**Choices offered**

- A sealed flow path that forces cabin air through the sorbent.
- As much exposed sorbent area as the canister allows.
- A carbon dioxide reading taken at several cabin locations.
- Enough fan speed that the crew can hear it running.

**Correct answer**

**A sealed flow path that forces cabin air through the sorbent.**

**Why (shown in verdict):** Bypass is the failure mode that looks like success. The fan runs, the crew hears it, and the concentration keeps climbing — because sorbent only removes carbon dioxide from air that actually crosses it, and air takes the easiest path it is offered.

**Why the others do not hold**

- Exposed area helps only for the fraction of the air that reaches it. A large sorbent bed with a gap around it removes less than a small one with none.
- Measuring in several places is how the crew finds out whether the fix worked, which is necessary and is not the fix.
- An audible fan proves a motor is turning. It says nothing about how much air is moving, or where.

**Takeaway:** A life-support fix must manage both chemical uptake and fluid flow.

---

## Mission 9 — Communication Fades

**Objective:** Restore a reliable low-bandwidth link and use the signal itself as a navigation measurement.

**Stake:** Without communications, the crew may have to execute critical maneuvers with stale navigation and no ground support.

### M9.1 — Why did the signal fade?

**Format:** DIAGNOSIS · **Area:** COMMS · **Place:** Deep-Space Antenna

**Scene shown to the player**

> Voice and telemetry both go weak. Received power is down about 12 decibels, the transmitter reports normal output, the change in range would account for roughly 1 decibel, the antenna is off-point by about 6 degrees, and a second ground station on another continent sees the same weak signal. A link budget is a sum of gains and losses, and diagnosis means comparing the size of each proposed effect with the size of the loss actually observed. Two stations seeing it rules out something local to one dish; the arithmetic decides the rest.

**Question**  Which explanation fits the link budget and the independent stations?

**Panel headline**  Voice and telemetry suddenly become weak.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Received power | Received power | Down about 12 dB | alarm |
| Transmitter output | Transmitter output | Normal | normal |
| Range change | Range change | Would explain about 1 dB | alarm |
| Antenna pointing error | Antenna pointing error | About 6 degrees | alarm |
| Second ground station | Second ground station | Also sees weak signal | alarm |

**Choices offered**

- Antenna mispointing — _The directional beam is no longer centered on Earth, reducing received power at multiple stations._
- Transmitter power loss — _The spacecraft radio is emitting far less power than commanded._
- Increased distance — _Free-space spreading from the new range accounts for nearly all of the loss._
- One bad ground receiver — _A local receiver fault weakens the signal at only one station._

**Correct answer**

**Antenna mispointing**

**Why (shown in verdict):** The transmitter is normal, the range change is far too small, and two stations see the fade. The large pointing error provides the missing loss mechanism.

**Takeaway:** A link-budget diagnosis should compare the size of every proposed effect with the size of the observed loss.

### M9.2 — Wavelength of the radio link

**Format:** BALLPARK · **Area:** COMMS · **Place:** Communications Analysis Room

**Scene shown to the player**

> The link is fading and the antenna team needs to know how far the vehicle can be off-pointed before the signal is lost. That calculation starts with the physical size of the wave the antenna is working with: wavelength is the speed of light divided by frequency, and the carrier is at 2.0 gigahertz. Beam width scales with wavelength over aperture, so this number is the first term in every pointing tolerance the team will quote for the rest of the shift.

**Question**  Estimate the wavelength.

**Correct answer**

Equation shown: `{0} ÷ {1}`
Tiles offered: `3.0e8 m/s (speed of light)`, `2.0e9 Hz (carrier frequency)`, `2.0e6 Hz (the carrier, misread as megahertz)`, `343 m/s (speed of sound)`, `12 dB (the observed loss)`
Tiles that belong: `3.0e8 m/s (speed of light)`, `2.0e9 Hz (carrier frequency)`
Decoy tiles: `2.0e6 Hz (the carrier, misread as megahertz)`, `343 m/s (speed of sound)`, `12 dB (the observed loss)`
Formula: `a/b`
**Target: 0.15 m** (tolerance ±0.015)
Explanation shown: A factor of a thousand in the frequency is a factor of a thousand in the wavelength, and a 150-metre wave would need an antenna nobody could fly. Reading the exponent is most of this calculation.

**Why (shown in verdict):** Every pointing tolerance the team quotes for the rest of the shift starts from this number, because beam width goes as wavelength over aperture.

**Takeaway:** Frequency and wavelength are reciprocal descriptions of the same propagating wave.

### M9.3 — Recover the weak link

**Format:** SEQUENCE · **Area:** STRUCT · **Place:** Spacecraft Attitude Console

**Scene shown to the player**

> The carrier is down twelve decibels and drifting in frequency, and the crew is answering calls they can barely hear. Recovery combines three different disciplines in a fixed order: check attitude and antenna geometry, because pointing is the largest and cheapest term to fix; reduce the data rate and narrow the receiver bandwidth, because a slower signal needs less power to be read; coordinate the large ground antennas with predicted Doppler so the receiver is listening at the right frequency. The range and Doppler recovered in the process then feed straight back into navigation.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Verify spacecraft attitude and antenna geometry.
- Reduce data rate and narrow the receiver bandwidth.
- Coordinate high-gain ground antennas and predicted Doppler tracking.
- Use recovered range and Doppler data to refine navigation.

**Correct answer**

1. **Verify spacecraft attitude and antenna geometry.**
2. **Reduce data rate and narrow the receiver bandwidth.**
3. **Coordinate high-gain ground antennas and predicted Doppler tracking.**
4. **Use recovered range and Doppler data to refine navigation.**

**Why (shown in verdict):** Geometry is corrected before signal-processing gains are maximized and navigation information is extracted.

**Takeaway:** Communication recovery joins wave physics, control, and estimation.

---

## Mission 10 — A Blind Maneuver

**Objective:** Design a manual alignment procedure whose dominant angular errors are bounded.

**Stake:** A visually small pointing error can produce a trajectory miss too large to correct later.

### M10.1 — What shifts the apparent direction?

**Format:** PROTOCOL · **Area:** COMMS · **Place:** Optics Test Room

**Scene shown to the player**

> The crew will aim the burn by eye, so the room has to separate what the instrument does from what the spacecraft does. An eye moving relative to a nearby reticle shifts the apparent line of sight by parallax, and it is entirely an artefact of the observer; a changed focal setting alters sharpness and not direction; a nearby object shifting against distant stars as the viewpoint moves is real parallax carrying real distance information; the spacecraft rotating while the star field stays fixed is vehicle motion. Manual navigation is only trustworthy when instrument geometry and spacecraft motion are told apart.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- The eye moves relative to a nearby reticle.
- A lens focal setting changes image sharpness.
- A nearby object shifts against distant stars as viewpoint changes.
- The spacecraft rotates while the star field remains fixed inertially.

**Choices offered**

- Parallax between eye and reticle.
- Focus change.
- Geometric parallax.
- Change of body-frame orientation relative to the inertial frame.

**Correct answer**

1. The eye moves relative to a nearby reticle.  →  **Parallax between eye and reticle.**
2. A lens focal setting changes image sharpness.  →  **Focus change.**
3. A nearby object shifts against distant stars as viewpoint changes.  →  **Geometric parallax.**
4. The spacecraft rotates while the star field remains fixed inertially.  →  **Change of body-frame orientation relative to the inertial frame.**

**Why (shown in verdict):** Apparent direction depends on optics, viewpoint, and coordinate frame.

**Takeaway:** Manual navigation requires separating instrument geometry from spacecraft motion.

### M10.2 — Angular error to position error

**Format:** BALLPARK · **Area:** NAV · **Place:** Crew Navigation Trainer

**Scene shown to the player**

> A pointing error of 0.1 degrees at a range of 400,000 kilometres, and the guidance officer wants it in metres rather than degrees. Small angles convert to transverse distance by multiplying the angle in radians by the range, and 0.1 degrees is about 1.75 milliradians. The number that comes out is the reason a hand-held sighting is discussed so carefully: angular precision becomes position precision through geometry, and at lunar distances a fraction of a degree is hundreds of kilometres.

**Question**  Estimate the transverse offset at that range.

**Correct answer**

Equation shown: `{0} × {1} × {2}`
Tiles offered: `4.0e8 m (range)`, `0.1 degrees (pointing error)`, `0.01745 rad per degree`, `57.3 degrees per radian`, `1,000 m per km`
Tiles that belong: `4.0e8 m (range)`, `0.1 degrees (pointing error)`, `0.01745 rad per degree`
Decoy tiles: `57.3 degrees per radian`, `1,000 m per km`
Formula: `a*b*c`
**Target: 698000 m** (tolerance ±50000)
Explanation shown: Radians per degree and degrees per radian are reciprocals, and picking the wrong one puts the answer out by a factor of 3,300. The small-angle relation only holds in radians, which is the whole reason the conversion is here.

**Why (shown in verdict):** Angular precision becomes position precision through geometry alone. At lunar distance a tenth of a degree is hundreds of kilometres, which is why a hand-held sighting is discussed so carefully.

**Takeaway:** Angle precision becomes position precision through geometry.

### M10.3 — Bound the manual alignment

**Format:** CHOICE · **Area:** NAV · **Place:** Guidance Review Board

**Scene shown to the player**

> The burn will be aimed by a crew member sighting stars through a window reticle, with no platform to check them against, and nobody has measured how repeatable that is. Calibrating reticle and eye position in the simulator quantifies the systematic part; using multiple stars and repeated measurements quantifies the random part and averages it down; a timed attitude-rate check before ignition catches a vehicle that is still drifting when the sighting was taken. A manual procedure is not unreliable by nature — it is unreliable until its geometry and its repeatability have been measured.

**Question**  Nobody has measured how repeatable a hand sighting is. What do you require before the burn?

**Choices offered**

- Multiple stars, each sighted more than once.
- A reticle and eye-position calibration in the simulator.
- A timed attitude-rate check immediately before ignition.
- One careful alignment by the most practised crew member.

**Correct answer**

**Multiple stars, each sighted more than once.**

**Why (shown in verdict):** Repetition is the only thing that measures the scatter, and averaging is the only thing that reduces it. A procedure with no repeat has no error bar at all, which is what makes it impossible to say whether the burn is inside the corridor.

**Why the others do not hold**

- Simulator calibration removes the systematic part — the fixed offset between eye, reticle and axis — and tells you nothing about how much the answer moves from one sighting to the next.
- The attitude-rate check catches a vehicle still drifting when the sighting was taken. A real error source, and a different one.
- One alignment by the best crew member is a single sample. It may well be the most accurate one; nobody can demonstrate that it was.

**Takeaway:** A manual procedure becomes reliable when its geometry and repeatability are measured.

---

## Mission 11 — Crossing the Atmosphere

**Objective:** Choose a corridor and monitoring strategy robust to atmospheric and navigation uncertainty.

**Stake:** A small trajectory error can exchange recoverable energy dissipation for lethal heating or a missed Earth encounter.

### M11.1 — Where orbital energy goes

**Format:** SEQUENCE · **Area:** INTEG · **Place:** Entry Dynamics Room

**Scene shown to the player**

> The capsule arrives at the atmosphere carrying the kinetic energy of a hundred-tonne truck at orbital speed, and it has to arrive at the ocean carrying almost none of it. The chain is worth stating: the vehicle enters with large kinetic and gravitational energy, atmospheric drag does negative work on it, that energy becomes heat in the shocked gas ahead of the heat shield and in the wake behind it, and velocity and altitude fall while the thermal protection and the trajectory shape control how fast. Reentry is energy dissipation constrained by what the crew and the materials can take.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- The spacecraft enters with large kinetic and gravitational energy.
- Atmospheric drag performs negative work on the spacecraft.
- Energy becomes heat in shocked gas, the vehicle, and the wake.
- Velocity and altitude fall while thermal protection and trajectory shape control the rates.

**Correct answer**

1. **The spacecraft enters with large kinetic and gravitational energy.**
2. **Atmospheric drag performs negative work on the spacecraft.**
3. **Energy becomes heat in shocked gas, the vehicle, and the wake.**
4. **Velocity and altitude fall while thermal protection and trajectory shape control the rates.**

**Why (shown in verdict):** Drag converts organized mechanical energy into thermal and atmospheric energy.

**Takeaway:** Reentry is an energy-dissipation problem constrained by human and material limits.

### M11.2 — Kinetic-energy scale

**Format:** BALLPARK · **Area:** THERM · **Place:** Thermal Protection Lab

**Scene shown to the player**

> A 5,000 kg capsule returning from the Moon arrives at about 11,000 metres per second, and the thermal protection team needs the kinetic energy before it can argue about heat load. Kinetic energy is half the mass times the speed squared, and the squared term is why lunar return is a categorically harder problem than return from low orbit: an entry speed about 40 per cent higher carries roughly twice the energy to dispose of, through the same heat shield.

**Question**  Estimate the kinetic energy to be dissipated.

**Correct answer**

Equation shown: `0.5 × {0} × {1}²`
Tiles offered: `5.0e3 kg (capsule mass)`, `1.1e4 m/s (entry speed)`, `7.8e3 m/s (speed from low Earth orbit)`, `9.81 m/s² (surface gravity)`, `0.5 (the one-half in the formula)`
Tiles that belong: `5.0e3 kg (capsule mass)`, `1.1e4 m/s (entry speed)`
Decoy tiles: `7.8e3 m/s (speed from low Earth orbit)`, `9.81 m/s² (surface gravity)`, `0.5 (the one-half in the formula)`
Formula: `0.5*a*b*b`
**Target: 302500000000 J** (tolerance ±30000000000)
Explanation shown: The one-half is written into the template rather than offered as a tile, because it is part of the relationship and not a measured quantity. The low-orbit speed is there to be compared: 40 per cent slower is half the energy, through the same heat shield.

**Why (shown in verdict):** Speed enters squared, which is why lunar return is a categorically harder problem than return from low orbit rather than a slightly harder one.

**Takeaway:** Speed dominates kinetic energy because it enters squared.

### M11.3 — Protect the entry corridor

**Format:** CHOICE · **Area:** INTEG · **Place:** Crew G-Load Console

**Scene shown to the player**

> The corridor is about a degree wide. Too steep and the deceleration and heating exceed what the crew and the structure survive; too shallow and the capsule skips back out with no propellant left to return. The state estimate going into it carries real uncertainty in both directions, and the atmosphere itself varies from the model. Safety here does not come from optimising the nominal trajectory — it comes from checking that the plan still works across the range of atmospheres, entry angles and vehicle configurations that are actually consistent with what is known.

**Question**  The corridor is about a degree wide. What does the room do with the time left?

**Choices offered**

- Refine the position and velocity uncertainty before entry.
- Model steep and shallow atmospheric scenarios.
- Verify the heat-shield and centre-of-mass configuration.
- Optimise the nominal entry trajectory as far as it will go.

**Correct answer**

**Refine the position and velocity uncertainty before entry.**

**Why (shown in verdict):** The corridor is a constraint on where the vehicle actually is, and the uncertainty is what decides whether the whole distribution fits inside it. Shrinking it is the only action available that makes the same corridor easier to hit.

**Why the others do not hold**

- Steep and shallow atmospheres bound a variation nobody can reduce. Worth knowing; it changes what you can survive, not where you are.
- Verifying the shield and the centre of mass is required before commitment and moves the trajectory not at all.
- Optimising the nominal makes the best case better. The corridor is missed by the cases that are not nominal.

**Takeaway:** Entry safety comes from margins across plausible conditions, not perfection at one nominal point.

---

## Mission 12 — The Structure Is Vibrating

**Objective:** Move the system away from resonance and verify that the mitigation works across operating conditions.

**Stake:** A resonant vibration can fatigue a line or electrical connection that appears safe under static load.

### M12.1 — What is driving the vibration?

**Format:** DIAGNOSIS · **Area:** INTEG · **Place:** Structural Dynamics Lab

**Scene shown to the player**

> A structural vibration becomes severe only in a narrow band of reaction-wheel speed. Amplitude peaks sharply near 3,200 rpm, the measured vibration frequency matches a known structural mode, moving the wheel speed away from that band reduces it, a second accelerometer in a different location sees the same mode, and the impact monitor has recorded no impulse. Resonance is diagnosed by the relationships among forcing frequency, natural frequency and response — not by how large the amplitude is. A structure perfectly strong at rest can fail when driven at a frequency it happens to like.

**Question**  Which explanation fits the frequency, speed dependence, and independent accelerometers?

**Panel headline**  A structural vibration becomes severe only during a narrow band of reaction-wheel speed.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Vibration amplitude | Vibration amplitude | Sharp peak near 3200 rpm | alarm |
| Measured vibration frequency | Measured vibration frequency | Matches known structural mode | alarm |
| Wheel-speed change | Wheel-speed change | Moving away from 3200 rpm reduces vibration | alarm |
| Second accelerometer | Second accelerometer | Sees the same mode | alarm |
| Impact monitor | Impact monitor | No impulse recorded | normal |

**Choices offered**

- Resonance driven by wheel forcing — _A periodic forcing frequency approaches a structural natural frequency and amplifies motion._
- Loose accelerometer — _One sensor mechanically rattles while the spacecraft structure remains quiet._
- One-time impact — _A collision gives the structure an impulsive kick independent of wheel speed._
- Broad structural breakup — _Damage creates large vibration across a wide range of frequencies and operating states._

**Correct answer**

**Resonance driven by wheel forcing**

**Why (shown in verdict):** The vibration is narrow-band, repeatable, tied to wheel speed, matches a known structural mode, and appears on an independent accelerometer. That is the signature of resonance.

**Takeaway:** Resonance is diagnosed by relationships among forcing frequency, natural frequency, and response - not by amplitude alone.

### M12.2 — Spring-mass period

**Format:** BALLPARK · **Area:** STRUCT · **Place:** Spacecraft Vibration Console

**Scene shown to the player**

> A mounted component is modelled as a 4 kg mass on a 400 N/m spring, and the analyst wants its natural period before the pump speeds are set. Natural frequency comes out of inertia and stiffness alone — heavier is slower, stiffer is faster — and the period follows from it. The point of the calculation is what it lets you avoid: knowing where a structure's natural frequency sits tells you which operating speeds will drive it, before the hardware tells you the same thing much more expensively.

**Question**  Estimate the natural period.

**Correct answer**

Equation shown: `2π √({0} ÷ {1})`
Tiles offered: `4 kg (component mass)`, `400 N/m (mount stiffness)`, `3,200 rpm (reaction-wheel speed)`, `0.5 kg (the damper)`, `10 Hz (a nearby mode)`
Tiles that belong: `4 kg (component mass)`, `400 N/m (mount stiffness)`
Decoy tiles: `3,200 rpm (reaction-wheel speed)`, `0.5 kg (the damper)`, `10 Hz (a nearby mode)`
Formula: `2*Math.PI*Math.sqrt(a/b)`
**Target: 0.628 s** (tolerance ±0.05)
Explanation shown: Only inertia and stiffness set the natural frequency — heavier is slower, stiffer is faster. The wheel speed is what might drive this mode, which is the next question and not this one.

**Why (shown in verdict):** Knowing where a structure's natural frequency sits tells you which operating speeds will drive it, before the hardware tells you the same thing much more expensively.

**Takeaway:** Natural frequency emerges from inertia and stiffness.

### M12.3 — Stop the resonance

**Format:** CHOICE · **Area:** INTEG · **Place:** Operations Planning Room

**Scene shown to the player**

> A panel oscillates whenever the pump runs near one particular speed, and the amplitude has grown across three cycles. The pump is needed, the panel is structural, and nobody has measured the response anywhere except the one accelerometer that noticed. Shifting the operating speed moves the forcing away from the mode; adding damping bleeds energy out of it; measuring at several locations and configurations establishes whether the fix worked or merely moved the problem. Driving harder to pass through the resonance faster is a plan that depends on the structure surviving the passage.

**Question**  The panel oscillates whenever the pump runs near one speed. What do you do?

**Choices offered**

- Shift the pump's operating speed away from the measured resonance.
- Add or restore damping at the panel.
- Measure the response at several more locations first.
- Drive the pump harder to pass through the band faster.

**Correct answer**

**Shift the pump's operating speed away from the measured resonance.**

**Why (shown in verdict):** Resonance is a coincidence between a forcing frequency and a natural one, and only two things can change: the structure or the forcing. On a vehicle in flight, the forcing is the one that can be changed now, reversibly, without anybody touching the panel.

**Why the others do not hold**

- Damping bleeds energy out of the mode and is the right permanent fix. It needs hardware, access and a crew member with their hands on the structure.
- Measuring in more places is how you confirm the fix worked or merely moved the problem. It is the check, not the change.
- Passing through faster assumes the structure survives the passage, which is the assumption the growing amplitude across three cycles is calling into question.

**Takeaway:** A structural fix should change the dynamics and then demonstrate that the dangerous mode is controlled.

---

## Mission 13 — Choose the Return Path

**Objective:** Select a return plan with explicit margins and contingencies for the dominant uncertainties.

**Stake:** A locally optimal trajectory can fail the mission by consuming a different subsystem’s last margin.

### M13.1 — Name the binding constraint

**Format:** PROTOCOL · **Area:** INTEG · **Place:** Mission Design Center

**Scene shown to the player**

> Four return paths are on the board and each stresses a different subsystem, which is why the room cannot simply pick the fastest. A longer return time consumes consumables — oxygen, lithium hydroxide, water, power. A larger correction burn spends propellant and adds burn-execution uncertainty. A steeper entry raises peak heating and deceleration on the shield and the crew. A long communications blackout removes ground support at the moment it is most useful. The best physical solution is the one whose binding constraint the vehicle can actually meet.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Longer return time.
- Larger correction burn.
- Steeper atmospheric entry.
- Long communications blackout.

**Choices offered**

- Consumables and thermal survival.
- Fuel and propulsion reliability.
- Heating and deceleration.
- Crew autonomy and navigation confidence.

**Correct answer**

1. Longer return time.  →  **Consumables and thermal survival.**
2. Larger correction burn.  →  **Fuel and propulsion reliability.**
3. Steeper atmospheric entry.  →  **Heating and deceleration.**
4. Long communications blackout.  →  **Crew autonomy and navigation confidence.**

**Why (shown in verdict):** A trajectory is a system choice whose effects propagate across subsystems.

**Takeaway:** The best physical solution is not necessarily the shortest or lowest-fuel solution.

### M13.2 — Select the robust trajectory

**Format:** CHOICE · **Area:** INTEG · **Place:** Life-Support Desk

**Scene shown to the player**

> Four return paths, each best at something: fastest, least propellant, coolest entry, best tracking coverage. The consumables that decide it — carbon dioxide removal capacity, water, power — are known only to within about a day, and that uncertainty is larger than the differences between two of the options. Robust choice values margin and the ability to change your mind later, not nominal efficiency: a path that is optimal against the current best estimate and infeasible if that estimate is off by a day is not the safest thing on the board.

**Question**  Consumables are known only to within about a day. Which return do you fly?

**Choices offered**

- The moderate return, with balanced fuel, thermal and consumable margins.
- The fast return, accepting narrow entry and propulsion margins.
- The slow return, preserving fuel at the cost of life-support margin.
- Defer the choice and hold the propellant for a later correction.

**Correct answer**

**The moderate return, with balanced fuel, thermal and consumable margins.**

**Why (shown in verdict):** The uncertainty in the consumables is larger than the difference between the two fastest options, so choosing between them on nominal numbers is choosing on noise. The moderate path is the one that stays feasible across the whole range the crew might actually be in.

**Why the others do not hold**

- The fast return is optimal against an estimate carrying a day of uncertainty, and its margins are narrowest exactly where that uncertainty lands.
- The slow return preserves propellant and spends a life-support capacity nobody has bounded. It is optimal against the wrong constraint.
- Deferring is a rule about when to burn, not a trajectory. The vehicle is on one whether or not the choice is made.

**Takeaway:** Robust optimization values margin and adaptability, not only nominal efficiency.

### M13.3 — Commit to the path

**Format:** SEQUENCE · **Area:** THERM · **Place:** Thermal and Entry Review

**Scene shown to the player**

> The decision has to be made this shift, and once the burn is executed most of the alternatives close. What is not yet written down is which observations, at which times, would show the choice was wrong while there is still propellant to change it. A plan is a hypothesis about future physical states: list the hard constraints and quantify the margins now, compare the candidates under off- nominal as well as nominal conditions, define the abort and correction triggers before committing, and keep updating the margins as the vehicle flies.

**Question**  Order the commitment so the abort trigger still has something to act on.

**Cards to order** (presented shuffled)

- [object Object]
- Compare the candidates under the off-nominal cases, not the nominal one.
- Name the observation that would show the choice was wrong, and the time it arrives.
- Burn, and keep updating the margins against what the tracking returns.

**Correct answer**

1. **[object Object]**
2. **Compare the candidates under the off-nominal cases, not the nominal one.**
3. **Name the observation that would show the choice was wrong, and the time it arrives.**
4. **Burn, and keep updating the margins against what the tracking returns.**

**Why (shown in verdict):** The third card is the one that has to happen before the burn rather than after it: once the burn is executed most alternatives close, so an abort trigger defined afterwards is a trigger with nothing left to trigger. And the comparison has to be under off-nominal conditions, because the margins are what the decision is made of.

**Takeaway:** An abort trigger has to be defined while there is still propellant to act on it.

---

## Mission 14 — The Last Correction

**Objective:** Decide whether to burn using the expected benefit relative to navigation and propulsion uncertainty.

**Stake:** An unnecessary last burn can push a safe but uncertain trajectory into a genuinely unsafe one.

### M14.1 — Real trajectory error or common clock drift?

**Format:** DIAGNOSIS · **Area:** NAV · **Place:** Global Tracking Network

**Scene shown to the player**

> Several ground measurements suddenly place the spacecraft ahead of its predicted path. Range and Doppler residuals shift together; star-angle navigation, which uses no ground clock at all, matches the prediction; a ground timing reference is found to be offset; reprocessing with the corrected time makes most of the residual disappear; onboard dynamics show no unmodelled acceleration. When several measurements agree, the question is whether they agree independently or merely inherit the same clock, the same calibration and the same software. Correlated errors look exactly like a real signal until something outside the chain is consulted.

**Question**  Which explanation fits the ranging, angle, clock, and independent-time checks?

**Panel headline**  Several ground measurements suddenly place the spacecraft ahead of its predicted path.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Range/Doppler residuals | Range/Doppler residuals | Shift together | alarm |
| Star-angle navigation | Star-angle navigation | Matches predicted direction | normal |
| Ground timing reference | Ground timing reference | Offset detected | alarm |
| Reprocessed data | Reprocessed data | Residual largely disappears with corrected time | alarm |
| Onboard dynamics | Onboard dynamics | No unmodeled acceleration | normal |

**Choices offered**

- Real trajectory error — _The spacecraft has physically moved away from the predicted path._
- Common timing-reference error — _Shared timestamps bias several derived range and velocity measurements together._
- Independent sensor failures — _Multiple unrelated instruments happen to drift in the same direction at once._
- Star tracker failure — _The angular navigation system alone is producing the bad state estimate._

**Correct answer**

**Common timing-reference error**

**Why (shown in verdict):** The discrepant channels share one clock, the independent angular geometry is stable, and correcting the timestamps removes most of the residual without any physical maneuver. The error is common-mode measurement timing.

**Takeaway:** When several measurements agree, ask whether they agree independently or merely inherit the same clock, calibration, or model.

### M14.2 — Combine independent uncertainties

**Format:** BALLPARK · **Area:** NAV · **Place:** Navigation Covariance Room

**Scene shown to the player**

> Two independent one-sigma position errors, 6 km and 8 km, along perpendicular directions, and the navigation team needs a single number for the entry brief. Independent uncertainties along orthogonal axes combine in quadrature rather than by addition, which is why the combined figure is smaller than the sum and larger than either term. Getting this wrong in either direction matters here: overstated uncertainty argues for a burn that is not needed, and understated uncertainty hides a corridor violation.

**Question**  Estimate the combined two-dimensional uncertainty.

**Correct answer**

Equation shown: `√({0}² + {1}²)`
Tiles offered: `6 km (one-sigma, first axis)`, `8 km (one-sigma, second axis)`, `14 km (the two added)`, `7 km (their average)`, `2 (number of axes)`
Tiles that belong: `6 km (one-sigma, first axis)`, `8 km (one-sigma, second axis)`
Decoy tiles: `14 km (the two added)`, `7 km (their average)`, `2 (number of axes)`
Formula: `Math.sqrt(a*a+b*b)`
**Target: 10 km** (tolerance ±0.5)
Explanation shown: Independent errors along perpendicular axes combine in quadrature, so the total is smaller than the sum and larger than either term. Adding them is the common mistake and it overstates the uncertainty by forty per cent here.

**Why (shown in verdict):** Overstated uncertainty argues for a burn that is not needed; understated uncertainty hides a corridor violation. Both directions matter, which is why the combination rule has to be right.

**Takeaway:** Independent orthogonal uncertainties combine in quadrature.

### M14.3 — Burn or observe?

**Format:** CHOICE · **Area:** INTEG · **Place:** Flight Director Console

**Scene shown to the player**

> Two tracking stations disagree by slightly more than either one's stated error, and the errors are not independent — both use the same station clock model. A correction burn carries its own execution uncertainty, roughly the size of the disagreement being corrected, so a burn commanded on this data could move the vehicle by about as much as it might be wrong. One more high-leverage observation would separate the hypotheses; preserving propulsion keeps a later correction possible. A correction is worth making when it reduces total risk, not when it merely moves the nominal point.

**Question**  Two stations disagree by more than either one's stated error. Do you burn?

**Choices offered**

- No — obtain one more independent, high-leverage observation.
- Yes — execute the correction the current solution calls for.
- No — preserve propulsion and accept the corridor as it stands.
- No — update the entry predictions across the full covariance first.

**Correct answer**

**No — obtain one more independent, high-leverage observation.**

**Why (shown in verdict):** Both stations use the same clock model, so their agreement was never independent and their disagreement does not say which is wrong. Only a measurement that cannot fail the same way can settle it — and the correction being argued about is about the same size as the error it would be correcting.

**Why the others do not hold**

- A burn whose expected shift is smaller than its own execution uncertainty moves the nominal without reducing the risk, and spends propellant doing it.
- Preserving propulsion is the consequence of not burning rather than a decision in its own right, and it leaves the disagreement exactly where it was.
- Updating the predictions across the covariance says how bad the disagreement is. It adds no new information about which station is right.

**Takeaway:** Corrections should reduce total uncertainty and risk, not merely move the nominal trajectory.

---

## Mission 15 — Reentry

**Objective:** Conduct a claim-by-claim readiness review and execute entry with predefined triggers and authority.

**Stake:** The crew’s survival depends on hundreds of physical claims remaining true together during an irreversible sequence.

### M15.1 — Disposition final readiness

**Format:** PROTOCOL · **Area:** INTEG · **Place:** Integrated Flight Room

**Scene shown to the player**

> The final go/no-go, and the room has four claims of different quality in front of it. Each has to be dispositioned against pre-agreed criteria rather than against how confident the person presenting it sounds, because in the next eleven minutes nothing can be revisited: the vehicle enters, communications black out, and the crew is committed. Final authority follows traceable evidence and criteria written down before the pressure arrived — which is the only arrangement that survives a room where everyone wants to say yes.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Entry state lies inside the robust corridor across modeled uncertainty.
- Thermal-shield configuration is uncertain after an undocumented change.
- A minor communications loss is expected but autonomous guidance is verified.
- One tracking solution disagrees because of a known station bias.

**Choices offered**

- Approve the entry claim with continued tracking.
- Hold or resolve configuration before commitment if physically possible.
- Accept with a documented blackout procedure.
- Exclude or correct the biased data under the validated rule.

**Correct answer**

1. Entry state lies inside the robust corridor across modeled uncertainty.  →  **Approve the entry claim with continued tracking.**
2. Thermal-shield configuration is uncertain after an undocumented change.  →  **Hold or resolve configuration before commitment if physically possible.**
3. A minor communications loss is expected but autonomous guidance is verified.  →  **Accept with a documented blackout procedure.**
4. One tracking solution disagrees because of a known station bias.  →  **Exclude or correct the biased data under the validated rule.**

**Why (shown in verdict):** Readiness is granular: some claims can be approved while others require action.

**Takeaway:** Final authority should follow traceable evidence and pre-agreed criteria.

### M15.2 — Execute the final physical chain

**Format:** SEQUENCE · **Area:** INTEG · **Place:** Crew Capsule

**Scene shown to the player**

> Everything the last five days established comes down to the next eleven minutes, in an order that cannot be repeated. The approved attitude, configuration and state estimate all have to be established before the atmospheric interface, because there is no communication through the blackout to fix any of them; the roles of the onboard system and the ground have to be unambiguous before the vehicle is committed; deceleration, heating proxies and communications are then monitored against expected envelopes; and the transition to descent and recovery has to preserve the data the debrief will need.

**Question**  Order the entry around the four minutes with no communications.

**Cards to order** (presented shuffled)

- Set the approved attitude and configuration, because nothing can be changed through the blackout.
- Commit to the interface with the onboard and ground roles already unambiguous.
- Monitor deceleration and heating against the predicted envelope.
- Transition to descent, preserving the record of what the envelope actually did.

**Correct answer**

1. **Set the approved attitude and configuration, because nothing can be changed through the blackout.**
2. **Commit to the interface with the onboard and ground roles already unambiguous.**
3. **Monitor deceleration and heating against the predicted envelope.**
4. **Transition to descent, preserving the record of what the envelope actually did.**

**Why (shown in verdict):** The order is forced by the communications blackout: everything that needs a decision from the ground has to be finished before the interface, because for the next four minutes there is no ground. Monitoring cannot begin earlier — there is nothing to monitor — and the record matters because this is the only flight that will ever produce it.

**Takeaway:** Entry is ordered by the blackout: whatever needs the ground has to be settled before it starts.

### M15.3 — Fund the mission legacy

**Format:** CHOICE · **Area:** NAV · **Place:** Entry Tracking Network

**Scene shown to the player**

> The crew is aboard the recovery ship and the review board convenes on Monday. Preserving complete telemetry, configuration and decision logs is what makes the reconstruction possible at all; redesigning the common-mode electrical and sensor dependencies addresses the failure that started this; improving simulation and crew rehearsal for degraded modes addresses how it was survived. The fourth proposal is to celebrate the outcome and treat every anomaly as a one-off. A programme learns from the discrepancies it recorded, and only from those.

**Question**  The review board convenes on Monday. What does the programme commit to?

**Choices offered**

- Redesign the common-mode electrical and sensor dependencies.
- Preserve the complete telemetry, configuration and decision logs.
- Improve simulation and crew rehearsal for degraded modes.
- Record the outcome as a success and close the anomalies.

**Correct answer**

**Redesign the common-mode electrical and sensor dependencies.**

**Why (shown in verdict):** The failure that started this was three pressure readouts sharing one reference, and the near-miss at the end was two tracking stations sharing one clock. It is the only item here that removes a cause rather than improving the response to it.

**Why the others do not hold**

- Preserving telemetry and decision logs is what makes any reconstruction possible, and it should be finished before Monday rather than funded after it.
- Rehearsal for degraded modes improves how the next crew survives the same fault. Valuable, and it accepts the fault.
- Closing the anomalies as one-offs keeps every dependency that produced them, and the next mission inherits all of it.

**Takeaway:** The scientific obligation after a crisis is to learn from every discrepancy, not only the successful outcome.

---

## Grading

Three axes, 1–5 each; the rubric is in `README.md`. Rows marked **Fixed**, **Rebuilt**, **Rewritten** or **Correction** changed after the first audit.

- **Solv** — can a prepared student reach the keyed answer from the scene and panel alone?
- **Edu** — does getting it right require and build transferable subject knowledge?
- **Fit** — does it map onto a named topic in a standard course for the stated audience?

| ID | Format | Topic | Solv | Edu | Fit | Note |
| --- | --- | --- | :-: | :-: | :-: | --- |
| M1.1 | DIAGNOSIS | Common-mode sensor failure | 5 | 5 | 4 | A shared reference voltage moving three channels together, against a mechanical gauge that needs no electronics. Fully determined and genuinely instructive. |
| M1.2 | SEQUENCE | Building a state estimate | 3 | 3 | 2 | Generic incident procedure; only "preserve telemetry first" is forced. |
| M1.3 | CHOICE | Attention as a resource | 4 | 4 | 2 | One anomaly log and one command authority, before any analysis. A real failure mode, and still organisational rather than physical. |
| M2.1 | PROTOCOL | What each tracking observable constrains | 5 | 5 | 4 | Range / line-of-sight velocity / direction / velocity trends. Clean, and it sets up the whole navigation thread. |
| M2.2 | SEQUENCE | Fitting a trajectory | 4 | 3 | 3 | "Common coordinates before a joint fit" is forced; the rest is a standard recipe. |
| M2.3 | BALLPARK | Range from round-trip light time | 4 | 5 | 5 | Decoys added: the one-way time and the speed of sound. The factor of two is now a choice rather than an arrangement. |
| M3.1 | SEQUENCE | Force → acceleration → Δv → orbit | 5 | 4 | 5 | Newtonian and forced. |
| M3.2 | BALLPARK | Impulse–momentum | 4 | 5 | 5 | Decoys added — surface gravity and specific impulse — so the student has to know which quantities enter an impulse. |
| M3.3 | CHOICE | Early small burn vs late large burn | 4 | 4 | 3 | **Fixed.** The old funding round recommended fifteen credits for an unverified single solution, in a mission about independent verification. Now an early modest correction, with tracking as the reason it is safe. |
| M4.1 | PROTOCOL | Torque, moment of inertia, angular impulse, conservation | 5 | 5 | 5 | Four distinct rotational-mechanics facts, exactly as an intro course tests them. |
| M4.2 | SEQUENCE | Planning the braking pulse | 5 | 4 | 4 | "Nothing damps rotation, so plan the stop before the target" is real and non-obvious. |
| M4.3 | BALLPARK | τ = rF sin θ | 5 | 5 | 5 | **Rebuilt.** The pre-evaluated "sin 90° = 1" tile is gone; the decoys are a second distance and the vehicle mass, so the lever arm has to be measured to the centre of mass. |
| M5.1 | BALLPARK | Energy inventory ÷ power | 4 | 5 | 5 | Bus voltage and a peak load added as decoys, which is where the energy-versus-power confusion actually shows up. |
| M5.2 | DIAGNOSIS | Resistive drop and I²R heating | 5 | 5 | 5 | Normal array current, normal load current, a hot junction. Voltage, current and heat as one picture — textbook and fully determined. |
| M5.3 | CHOICE | Load shedding across time | 4 | 4 | 2 | High-bandwidth communications comes off first, because it is the only load that degrades gracefully. A real timing-and-consequence decision. |
| M6.1 | PROTOCOL | Series/parallel, current sharing, failure propagation | 5 | 5 | 5 | Four for four on standard circuit content, including the failure modes most courses skip. |
| M6.2 | BALLPARK | I²R at a bad connection | 4 | 5 | 5 | Bus voltage offered as a decoy — the classic wrong term for a series joint. |
| M6.3 | CHOICE | Qualifying an improvised battery path | 4 | 4 | 3 | Verify the module's voltage and state of charge, because the equalising current is set by the difference nobody measured. |
| M7.1 | BALLPARK | ΔT = Pt/C | 4 | 5 | 5 | Three hours offered both in hours and in seconds. A watt is a joule per second, and this is where that gets dropped. |
| M7.2 | PROTOCOL | Conduction, convection, radiation | 5 | 4 | 5 | Standard content, cleanly discriminated. Slightly definitional. |
| M7.3 | CHOICE | Thermal survival allocation | 4 | 4 | 2 | Insulate the crew zone: the only option whose benefit does not stop when the energy does. |
| M8.1 | DIAGNOSIS | Powered ≠ functioning (flow restriction) | 5 | 5 | 4 | Normal fan current, low flow, high ΔP, stable cabin pressure. Excellent, and the takeaway generalises well beyond spacecraft. |
| M8.2 | BALLPARK | Source rate × time | 4 | 3 | 3 | Decoys added, though the arithmetic remains one multiplication. |
| M8.3 | CHOICE | Sorbent area and bypass | 4 | 4 | 2 | A sealed flow path, because bypass is the failure that looks like success. The best-taught of this game's conversions. |
| M9.1 | DIAGNOSIS | Link budget arithmetic | 5 | 5 | 4 | The item works because the *sizes* are compared: 1 dB of range change cannot explain a 12 dB loss, and two stations rule out a local fault. |
| M9.2 | BALLPARK | λ = c/f | 4 | 5 | 5 | The carrier offered at 2.0e9 and at 2.0e6 Hz. Reading the exponent is most of this calculation. |
| M9.3 | SEQUENCE | Link recovery | 3 | 3 | 3 | The order of "reduce data rate" and "coordinate ground antennas" is a convention rather than a dependency. |
| M10.1 | PROTOCOL | Parallax, focus, reference frames | 4 | 4 | 4 | Separating instrument artefact from vehicle motion is a real optics/frames idea. |
| M10.2 | BALLPARK | Small-angle: transverse offset = θR | 5 | 5 | 5 | **Rebuilt.** The degree-to-radian conversion was pre-computed into a tile; it is now a choice, against the reciprocal — 57.3 degrees per radian — which is the error it invites. |
| M10.3 | CHOICE | Systematic vs random error in a manual procedure | 4 | 4 | 4 | Multiple stars repeated, because repetition is the only thing that measures the scatter. Systematic and random, kept apart. |
| M11.1 | SEQUENCE | Where orbital energy goes | 5 | 4 | 5 | Work–energy, forced order. |
| M11.2 | BALLPARK | ½mv² | 4 | 5 | 5 | Low-orbit entry speed offered as a decoy, which makes the squared term the point of the comparison. |
| M11.3 | CHOICE | Margin across plausible conditions | 4 | 4 | 3 | Refine the state uncertainty, because it is the only action that makes the same corridor easier to hit. |
| M12.1 | DIAGNOSIS | Resonance | 5 | 5 | 5 | Narrow band, matches a known mode, moves with wheel speed, seen on an independent accelerometer, no impulse. Textbook and airtight. |
| M12.2 | BALLPARK | T = 2π√(m/k) | 4 | 5 | 5 | The reaction-wheel speed offered as a decoy — the forcing frequency, against the natural one being computed. |
| M12.3 | CHOICE | Detune, damp, verify | 4 | 4 | 4 | Shift the operating speed: the only change that can be made now, reversibly, without touching the structure. |
| M13.1 | PROTOCOL | Which subsystem each choice stresses | 5 | 3 | 2 | Systems trade-off mapping; correct but not physics content. |
| M13.2 | CHOICE | Robust vs nominal-optimal | 4 | 4 | 3 | The moderate return, because the consumable uncertainty is larger than the difference between the two fastest options. |
| M13.3 | SEQUENCE | Commit to a plan with triggers | 4 | 4 | 3 | **Rewritten.** The abort trigger now has to be defined before the burn, because afterwards there is nothing left to trigger. |
| M14.1 | DIAGNOSIS | Common timing reference | 5 | 5 | 4 | Star-angle navigation uses no ground clock and agrees with prediction — a properly independent check. Pays off M1.1. |
| M14.2 | BALLPARK | Uncertainties in quadrature | 4 | 5 | 5 | The sum of the two errors offered as a tile. Adding rather than combining in quadrature overstates this by forty per cent. |
| M14.3 | CHOICE | Burn only if it reduces total risk | 4 | 5 | 4 | Do not burn — get an observation that cannot fail the way both stations already do. The campaign's independence thread, closed. |
| M15.1 | PROTOCOL | Readiness disposition | 4 | 3 | 2 | Claim-by-claim judgement, no physics. |
| M15.2 | SEQUENCE | Entry execution | 4 | 4 | 3 | **Rewritten.** Ordered by the blackout: everything needing a decision from the ground has to be settled before the interface, because for four minutes there is no ground. |
| M15.3 | CHOICE | Programme legacy | 4 | 4 | 2 | Redesign the common-mode dependencies, because it is the only item that removes a cause rather than improving the response. |

### Summary

**Averages: Solvability 4.3 · Educational value 4.3 · Curriculum fit 3.8**

Educational value 3.8 → 4.2 → **4.3**, on the back of twelve estimates that had no distractor tiles and two orderings that had no forced order. The commitment sequence now puts the abort trigger before the burn — because afterwards there is nothing left to trigger — and the entry sequence is ordered by the communications blackout.

The twelve estimates are the strongest block in the game at Edu 4.8 / Fit 4.8. The remaining Fit 2s are the readiness and legacy stops in the last third, which is where every college game here loses its subject.
