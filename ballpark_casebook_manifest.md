# Ballpark ← Casebook — source manifest (61 games, equation-chain format)

One block per Casebook case. For each, author **one Ballpark `GAMES` object** (id `bp_<casebook-id>`)
per `BALLPARK_CASEBOOK_HANDOFF_CURRENT.md`: **four independent estimation questions** on one topic, with
**exactly two 2-factor and two 3-factor** equations and **10 unique numbers** in one shared bank.

The four **Suggested estimands** below already span different dimensions (scale · rate/throughput · time ·
resource/consequence) and roughly target the `[2,2,3,3]` split — use them as the four questions, but **finalise
the factor counts to exactly two 2-factor + two 3-factor, keep all 10 bank values distinct (no factor shared
between equations), and never let one equation's answer become another's input.** Draw extra factor ideas and
vocabulary from **Science taught**. The **Internal** line is authoring-only spoiler guidance — never surface it.

---

## Earth & Natural Hazards  (7)

### bp_e_asteroid — “The Hollow Vale Impact”
- **Discipline:** Planetary Defense & Impact Science
- **Scenario:** A fireball flattened a valley without a moment's warning.
- **Science taught:** Meteorites & their cosmic origin; Near-Earth asteroids & meteors; Comets & the dirty snowball; Craters as impact scars; Impact cratering & astrogeology; Near-Earth asteroid surveys; The iridium layer & the impact hypothesis; Assessing the asteroid hazard; Asteroid sizes & impact risk
- **Internal (spoiler — do NOT surface):** real cause = a downplayed impact detection; tabloid bait = a weapon from orbit
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Impact kinetic energy (joules): impactor mass (kg) × impact speed squared (m²/s²) × one-half (constant)
    2. SIZE — Impactor mass (kg): impactor volume (m³) × rock density (kg/m³)
    3. TIME — Warning time before impact (hours): detection distance (km) ÷ approach speed (km/h)
    4. CONSEQUENCE — People within the blast-damage zone (people): damage-zone area (km²) × population density (people/km²) × exposed fraction (fraction)

### bp_e_avalanche — “The Whitewall Slide”
- **Discipline:** Snow, Avalanche & Glacier Science
- **Scenario:** A wall of snow buried a packed resort run at noon.
- **Science taught:** Glaciers & the ice age; Glacier motion & regelation; The science of avalanches; Avalanche dynamics & runout; Snow, avalanches & the slope; Snow classification & avalanche release; Glacier sliding & ice flow; Snow mechanics & the avalanche handbook; Snow-slab stability & forecasting
- **Internal (spoiler — do NOT surface):** real cause = ignored snowpack warnings; tabloid bait = a deliberate blast
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Snow mass in the slide (tonnes): release-slab area (m²) × slab thickness (m) × snow density (tonnes/m³)
    2. TIME — Time to reach the resort run (seconds): path length (m) ÷ avalanche speed (m/s)
    3. ENERGY — Impact force on the barrier (newtons): flow density (kg/m³) × flow speed squared (m²/s²) × contact area (m²)
    4. CONSEQUENCE — People on the run at the time (people): run area (m²) × skier density (people/m²)

### bp_e_flood — “The Rossmere Flood”
- **Discipline:** Hydrology & Flood Science
- **Scenario:** Rossmere was struck by a steep flood wave below the reservoir.
- **Science taught:** Hydrodynamics & Bernoulli's principle; Urban storm drainage & runoff; The unit hydrograph; Open-channel hydraulics; The synthetic unit hydrograph; Floodplain management & flood risk; Hydrologic forecasting; Hydraulics & flood routing; Sediment transport in rivers
- **Internal (spoiler — do NOT surface):** real cause = a reservoir release synchronized with the flood crest; tabloid bait = a structural dam breach
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Total floodwater past the town (m³): average flood discharge (m³/s) × flood duration (s)
    2. TIME — Flood-wave travel time through the reach (hours): river-reach length (km) ÷ flood-wave speed (km/h)
    3. RESOURCE — Storm runoff from the catchment (m³): catchment area (m²) × rainfall depth (m) × runoff coefficient (fraction)
    4. RESOURCE — Suspended sediment moved (tonnes): sediment mass flow (kg/s) × transport duration (s) ÷ kilograms per tonne (kg/tonne)

### bp_e_quake — “Nine Seconds to Cordera”
- **Discipline:** Seismology & Earthquake Science
- **Scenario:** Cordera's shaking began with an unusual compact source.
- **Science taught:** The founding of seismology; The seismograph & Earth's interior; Elastic rebound & fault rupture; Earth's core & the magnitude scale; The layered model of the Earth; First motions & fault planes; The moment magnitude scale; Strong ground motion & stress drop; Probabilistic seismic hazard
- **Internal (spoiler — do NOT surface):** real cause = tectonic double-couple fault rupture; tabloid bait = an underground explosion
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Seismic moment (newton·metres): rupture area (m²) × average fault slip (m) × crustal rigidity (Pa)
    2. ENERGY — Radiated seismic energy (joules): seismic moment (N·m) × apparent-stress efficiency (fraction)
    3. TIME — Time for shaking to reach a distant city (s): epicentral distance (km) ÷ seismic-wave speed (km/s)
    4. CONSEQUENCE — People in the strong-shaking zone (people): strong-shaking area (km²) × population density (people/km²) × urbanized fraction (fraction)

### bp_e_storm — “The Halloway Landfall”
- **Discipline:** Meteorology & Storm Forecasting
- **Scenario:** Halloway's hurricane killed along the coast and inland.
- **Science taught:** The wind-force scale; The circulation of the atmosphere; Dynamic meteorology & the upper air; The Bergen school & precipitation; Rossby waves & the jet stream; Hurricanes & weather satellites; Hurricane wind & structural damage; Chaos & the limits of prediction; Hurricane structure & cloud towers
- **Internal (spoiler — do NOT surface):** real cause = storm-surge mortality before peak winds; tabloid bait = category-wind destruction
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Seawater driven inland (m³): inundated area (m²) × mean surge depth (m)
    2. TIME — Time for the surge to travel inland (hours): inland penetration distance (km) ÷ surge advance speed (km/h)
    3. CONSEQUENCE — People in the inundation zone (people): inundated area (km²) × coastal population density (people/km²) × fraction below surge height (fraction)
    4. RESOURCE — Rain mass dropped by the storm (tonnes): footprint area (m²) × rainfall depth (m) × water density (tonnes/m³)

### bp_e_tsunami — “The Sable Point Wave”
- **Discipline:** Tsunami Science & Oceanography
- **Scenario:** The sea drew back, then took the shore.
- **Science taught:** The dynamical theory of tides; Hydrodynamics & water waves; Elastic waves & Earth tides; Dynamical oceanography & tides; Marine geology & tsunami deposits; Tsunami research & the Pacific warning system; Tsunami hydrodynamics & wave runup; Tsunami source & propagation; The DART deep-ocean buoy network
- **Internal (spoiler — do NOT surface):** real cause = a neglected warning-buoy network; tabloid bait = a blast beneath the sea
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Water volume in the inundation (m³): inundated area (m²) × mean inundation depth (m)
    2. TIME — Trans-ocean travel time (hours): ocean distance (km) ÷ deep-water wave speed (km/h)
    3. CONSEQUENCE — People in the inundation zone (people): coastline length (km) × inland reach (km) × coastal population density (people/km²)
    4. RESOURCE — Debris deposited onshore (tonnes): inundated area (m²) × deposit thickness (m) × deposit density (tonnes/m³)

### bp_e_wildfire — “The Pinehaven Fire”
- **Discipline:** Wildfire & Combustion Science
- **Scenario:** A firestorm erased a mountain town in an afternoon.
- **Science taught:** Flame propagation & combustion theory; The physics of fire; Modeling the spread of fire; The fire environment & fire weather; The fire-spread model; Prescribed burning & fuel management; The history of wildfire; Combustion theory; Flame spread & fire growth
- **Internal (spoiler — do NOT surface):** real cause = deferred fuel management; tabloid bait = coordinated arson
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Vegetation consumed (tonnes): burned area (hectares) × surface fuel load (tonnes/hectare) × fuel-consumption fraction (fraction)
    2. TIME — Time for the front to reach town (hours): distance to town (km) ÷ rate of spread (km/h)
    3. ENERGY — Total heat released (joules): burned area (hectares) × energy released per hectare (joules/hectare)
    4. CONSEQUENCE — Residents ordered to evacuate (people): evacuation-zone area (km²) × population density (people/km²) × warned fraction (fraction)

---

## Structures, Vehicles & Machines  (14)

### bp_dam — “The Marrow Valley Dam”
- **Discipline:** Hydraulics & Geotechnics
- **Scenario:** An earth dam let go at midnight and took the town below.
- **Science taught:** Hydrostatic pressure & head; Darcy's law & seepage; Filters, grain size & piping; Soil mechanics & pore pressure; The shallow-water equations; The St. Francis Dam & the duty to warn; Infiltration & runoff; Earthquake design of dams; Hydraulics & dam safety
- **Internal (spoiler — do NOT surface):** real cause = a concealed internal erosion; tabloid bait = sabotage or an earthquake
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Water stored at failure (m³): reservoir length (m) × mean width (m) × mean depth (m)
    2. RATE — Breach outflow (m³/s): breach cross-section area (m²) × outflow velocity (m/s)
    3. TIME — Time for the flood wave to reach the town below (hours): distance downstream (km) ÷ wave speed (km/h)
    4. CONSEQUENCE — People in the downstream flood zone (people): flooded area (km²) × population density (people/km²) × inundated fraction (fraction)

### bp_m_adas — “The Autopilot on Vane Street”
- **Discipline:** Vehicle Automation & Safety
- **Scenario:** A self-driving car ran down a pedestrian at night, its autopilot engaged.
- **Science taught:** Automobile safety & crashworthiness; The crumple zone & passive safety; Human tolerance to deceleration; Radar & obstacle detection; The CMOS camera sensor; Machine vision & the first self-driving car; Autonomous driving & the DARPA challenge; Automation complacency & vigilance; Situation awareness
- **Internal (spoiler — do NOT surface):** real cause = a sensor blind spot and a disabled driver-monitor; tabloid bait = a hack or remote hijack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Fleet distance driven per year (km): fleet size (cars) × annual distance per car (km/car)
    2. RATE — Sensor data generated per day (gigabytes): cameras per car (cameras) × data rate per camera (GB/h) × operating hours per day (hours)
    3. TIME — Vehicle stopping distance (metres): travel speed (m/s) × total reaction-plus-braking time (s)
    4. EXPOSURE — Pedestrian crossings encountered per day (crossings): route length (km) × crossings per km-hour (crossings/km/h) × operating hours (hours)

### bp_m_bridge — “The Halloway Span”
- **Discipline:** Structural & Fracture Mechanics
- **Scenario:** A long river bridge dropped a span into the water at rush hour.
- **Science taught:** The energy theory of fracture; The law of fatigue-crack growth; Stress concentration at a crack; Plasticity at the crack tip; Long-span suspension bridges; Early American suspension bridges; Deflection theory & the Tacoma Narrows lesson; The Forth Bridge & the cantilever; Influence lines & structural analysis
- **Internal (spoiler — do NOT surface):** real cause = a fatigue crack past a skipped inspection; tabloid bait = a barge strike or attack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Steel in the failed span (tonnes): deck area (m²) × steel mass per unit deck area (tonnes/m²)
    2. LOAD — Rush-hour vehicle load on the span (tonnes): vehicles on the span (vehicles) × mean vehicle mass (tonnes/vehicle)
    3. THROUGHPUT — Vehicles crossing per day (vehicles): number of lanes (lanes) × vehicles per lane-hour (vehicles/lane/h) × hours per day (hours)
    4. ENDURANCE — Fatigue load cycles accumulated (cycles): heavy trucks per day (trucks/day) × operating days per year (days/year) × years in service (years)

### bp_m_heli — “The Ridgeline Rotor”
- **Discipline:** Rotorcraft & Aeromechanics
- **Scenario:** A charter helicopter dropped out of a clear sky onto the ridge.
- **Science taught:** The single main-rotor helicopter; The first practical helicopter; Rotor control & the servo-flap; The tandem-rotor helicopter; Blade-element & airscrew theory; The gear-tooth strength equation; Bearing friction & lubrication; Low-cycle fatigue; Mechanical vibration & resonance
- **Internal (spoiler — do NOT surface):** real cause = a deferred gearbox flaw flown anyway; tabloid bait = a bird strike or sabotage
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Rotor lift needed to hover (newtons): aircraft mass (kg) × gravitational acceleration (m/s²)
    2. POWER — Engine shaft power (watts): fuel burn rate (kg/s) × fuel energy density (J/kg) × engine efficiency (fraction)
    3. ENDURANCE — Flight time on full fuel (hours): usable fuel mass (kg) × energy per kg (J/kg) ÷ power required (W)
    4. GEOMETRY — Rotor disk area (m²): rotor radius squared (m²) × pi (constant)

### bp_m_railx — “The Marsh Lane Crossing”
- **Discipline:** Railway Signalling & Interlocking
- **Scenario:** An express struck a stopped train although the route displayed clear.
- **Science taught:** The electric telegraph & railway signalling; The semaphore railway signal; The single-line token & tablet; The closed track circuit; Early automatic train control; Signalling principles & accident lessons; The first steam locomotive; Locomotive engineering & the broad gauge; The railway timetable & scheduling
- **Internal (spoiler — do NOT surface):** real cause = an interlocking that permitted a false clear; tabloid bait = a failed track circuit
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. THROUGHPUT — Passengers carried through the junction per day (passengers): trains per hour (trains/h) × operating hours (hours) × passengers per train (passengers/train)
    2. DELAY — Vehicle-hours lost at the crossing per day (vehicle-hours): closures per day (closures) × mean queue length (vehicles) × mean wait per closure (hours)
    3. TIME — Barrier-down time per closure (seconds): warning approach distance (m) ÷ train speed (m/s)
    4. SAFETY — Train stopping distance (metres): approach speed (m/s) × reaction-plus-braking time (s)

### bp_m_rig — “The Deepwater Meridian”
- **Discipline:** Drilling & Well Control
- **Scenario:** An offshore rig blew out and burned at the wellhead.
- **Science taught:** Fluid pressure & flow in the well; The gas law & expanding gas; Subsurface pressure & rock fracture; Petroleum geology & the reservoir; The roller-cone drill bit; Oil-well cementing; Blowout-preventer engineering; Offshore blowout firefighting; The floating offshore rig
- **Internal (spoiler — do NOT surface):** real cause = a skipped cement test and a disabled preventer; tabloid bait = an attack on the rig
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Recoverable oil in the reservoir (barrels): reservoir area (m²) × net pay thickness (m) × oil yield per volume (barrels/m³)
    2. RATE — Well flow rate (barrels/day): productivity index (barrels/day/psi) × drawdown pressure (psi)
    3. PRESSURE — Bottom-hole pressure (pascals): mud density (kg/m³) × gravitational acceleration (m/s²) × well depth (m)
    4. TIME — Time to drill the well (days): well depth (m) ÷ drilling rate (m/day)

### bp_m_stadium — “The Coronet Arena Roof”
- **Discipline:** Structures & Crowd Dynamics
- **Scenario:** An arena roof folded onto a packed stand during a sell-out.
- **Science taught:** Steel lattice shells & tension roofs; The geodesic dome; Thin-shell concrete roofs; The cable-net stadium roof; The cable-dome & air-supported roof; Space-frame joints & prefabrication; Limit analysis & plastic collapse; Space trusses & framework analysis; The social-force model of crowd flow
- **Internal (spoiler — do NOT surface):** real cause = a cheapened connection under an ignored load; tabloid bait = a bomb or explosion
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Spectators the stand holds (people): stand floor area (m²) × spectators per m² (people/m²)
    2. LOAD — Roof self-weight on the connections (tonnes): roof area (m²) × roof mass per area (tonnes/m²)
    3. DYNAMIC — Crowd-bounce force on the stand (newtons): number of people (people) × mass per person (kg/person) × bounce acceleration (m/s²)
    4. EGRESS — Time to evacuate the stand (seconds): occupants (people) ÷ number of exits (exits) ÷ flow per exit (people/s)

### bp_m_sub — “The Carrow Deep Implosion”
- **Discipline:** Deep Submergence & the Physics of Pressure
- **Scenario:** The Sirena vanished on descent, leaving one acoustic pulse and a field of fragments.
- **Science taught:** Why thin shells buckle and collapse; Echo-ranging and the birth of sonar; Fatigue and the life of a cyclically loaded part; Building a hull for the crushing deep; The deep sound channel of the sea; Materials that crackle before they break; Breathing, carbon dioxide, and sealed spaces; The violent collapse of a cavity; High-strength fibres and the composites they build
- **Internal (spoiler — do NOT surface):** real cause = a hull fatigued by one dive too many; tabloid bait = a collision with the wreck
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Water pressure at implosion depth (pascals): seawater density (kg/m³) × gravitational acceleration (m/s²) × depth (m)
    2. FORCE — Crushing force on the end dome (newtons): depth (m) × pressure per metre (Pa/m) × dome area (m²)
    3. TIME — Descent time to depth (minutes): target depth (m) ÷ descent rate (m/min)
    4. ENDURANCE — Breathable-air duration (hours): oxygen stored (litres) ÷ crew oxygen use (litres/hour)

### bp_m_tailings — “The Serra Verde Tailings Dam”
- **Discipline:** Slope Stability & Soil Liquefaction
- **Scenario:** A mine's tailings dam liquefied in seconds and buried the works below.
- **Science taught:** The slip-circle method; Generalized slope-stability analysis; Soft-clay strength & landslides; The liquefaction of sands; The steady-state strength line; Critical-state soil mechanics; Critical-state soil behaviour; The piezometer & slope inclinometer; Geotechnical risk & reliability
- **Internal (spoiler — do NOT surface):** real cause = liquefaction the piezometers foretold; tabloid bait = a blast or an earthquake
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Tailings mass released (tonnes): breach cross-section area (m²) × released depth (m) × tailings density (tonnes/m³)
    2. RUNOUT — Distance the mudflow travelled (km): dam height (m) × empirical runout ratio (km/m)
    3. CAPACITY — Volume impounded behind the dam (m³): pond surface area (m²) × mean depth (m) × storage fraction (fraction)
    4. TIME — Time for the flow to reach the village (seconds): runout distance (m) ÷ mudflow speed (m/s)

### bp_m_tunnel — “The Kingsgate Bore”
- **Discipline:** Tunnelling & Ground Engineering
- **Scenario:** A metro tunnel under the city caved in and swallowed the street above.
- **Science taught:** The tunnelling shield; The shield & compressed-air tunnelling; The New Austrian Tunnelling Method; Engineering geology for tunnels; Soft-ground tunnelling; Pressure grouting of ground; The Q-system for rock tunnels; Earth pressure & deep foundations; Rock-mass strength & the Hoek-Brown criterion
- **Internal (spoiler — do NOT surface):** real cause = cut grouting and ignored settlement gauges; tabloid bait = a gas explosion
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Ground excavated (m³): tunnel face area (m²) × tunnel length (m)
    2. RATE — Spoil trucks per day (trucks): advance rate (m/day) × face area (m²) ÷ truck volume (m³/truck)
    3. TIME — Time to bore the tunnel (days): tunnel length (m) ÷ advance rate (m/day)
    4. SETTLEMENT — Surface settlement volume (m³): tunnel length (m) × settlement trough width (m) × maximum settlement depth (m)

### bp_marine — “The Kestrel's Roll”
- **Discipline:** Marine & Naval Architecture
- **Scenario:** A packed ferry rolled over in calm water minutes from port.
- **Science taught:** Buoyancy & displacement; The stability of floating bodies; Naval architecture & hull form; The ship model basin; Waves & the wave-line hull; Viscosity & water resistance; Turbulence & scale models; Wind & current charts; The gyrocompass & ship stabilizer
- **Internal (spoiler — do NOT surface):** real cause = a concealed loss of stability; tabloid bait = a torpedo or attack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Displacement fully loaded (tonnes): submerged hull volume (m³) × seawater density (tonnes/m³)
    2. STABILITY — Righting moment at heel (newton·metres): displacement weight (N) × metacentric height (m) × sine of heel angle (fraction)
    3. CAPACITY — Passengers and crew aboard (people): decks (decks) × area per deck (m²) × people per m² (people/m²)
    4. TIME — Crossing time to port (hours): route distance (km) ÷ service speed (km/h)

### bp_rail — “The 8:14 to Ardenmoor”
- **Discipline:** Railway Safety Engineering
- **Scenario:** A commuter train left the rails on a straight.
- **Science taught:** The Rocket & the birth of railways; Locomotives & rail bridges; The flat-bottom rail; Steel & the durable rail; Fatigue & the failure of axles; Electric railways & multiple-unit control; Strength of materials & vibration; Brittle fracture & cold rails; Speed, streamlining & the locomotive
- **Internal (spoiler — do NOT surface):** real cause = concealed deferred maintenance; tabloid bait = sabotage on the line
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Passengers carried per day (passengers): trains per day (trains) × passengers per train (passengers/train)
    2. ENERGY — Kinetic energy at line speed (joules): train mass (kg) × speed squared (m²/s²) × one-half (constant)
    3. TIME — Stopping distance from line speed (metres): line speed (m/s) × braking time (s)
    4. THROUGHPUT — Seat-kilometres supplied per day (seat-km): trains per day (trains) × seats per train (seats) × route length (km)

### bp_rocket — “Meridian-1”
- **Discipline:** Rocketry & Spaceflight
- **Scenario:** A rocket tore apart on ascent, live on every screen.
- **Science taught:** The rocket equation; Spaceflight theory; Orbital launch & the chief designer; Combustion instability & JPL; Rocketry & systems engineering; Propulsion & station-keeping; The O-ring, cold & the commission; Multistage rockets & clustering; Flight software & Apollo
- **Internal (spoiler — do NOT surface):** real cause = a known flaw flown anyway; tabloid bait = sabotage or a strike
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Propellant mass (kg): tank volume (m³) × propellant density (kg/m³) × number of tanks (tanks)
    2. THRUST — Liftoff thrust (newtons): propellant mass flow (kg/s) × exhaust velocity (m/s)
    3. SPEED — Ideal burnout velocity (m/s): exhaust velocity (m/s) × natural log of mass ratio (dimensionless)
    4. ENERGY — Payload orbital kinetic energy (joules): payload mass (kg) × orbital speed squared (m²/s²) × one-half (constant)

### bp_tower — “The Verrin Tower”
- **Discipline:** Structural Engineering
- **Scenario:** A record-breaking tower has begun to groan in the wind.
- **Science taught:** Dead, live & wind loads; Tension, compression & elasticity; Beams & bending; The arch & thin-shell concrete; Resonance & aeroelastic flutter; Brittle fracture; Redundancy & progressive collapse; Reinforced concrete; Engineering ethics & the whistle
- **Internal (spoiler — do NOT surface):** real cause = a concealed cut to the safety margin; tabloid bait = deliberate sabotage
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Building mass (tonnes): total floor area (m²) × mass per unit floor area (tonnes/m²)
    2. WIND — Wind force on the face (newtons): face width (m) × building height (m) × wind pressure (Pa)
    3. SWAY — Natural sway period (seconds): building height (m) × period per metre (s/m)
    4. CAPACITY — Occupants at full load (people): total floor area (m²) × usable fraction (fraction) × people per m² (people/m²)

---

## Energy & Industrial Safety  (9)

### bp_blackout — “The Cascade”
- **Discipline:** Electrical Engineering & the Grid
- **Scenario:** Fifty million people went dark in nine seconds.
- **Science taught:** Electric charge & force; Potential & the battery; Electromagnetic induction; AC vs DC & the War of Currents; Three-phase power; Reactance & reactive power; Network analysis; Stability & cascading failure; Control & cybernetics
- **Internal (spoiler — do NOT surface):** real cause = a cascading failure with a hidden alarm bug; tabloid bait = a cyberattack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — People who lost power (people): substations tripped (substations) × customers per substation (customers) × people per customer (people/customer)
    2. LOAD — Electrical load dropped (megawatts): customers affected (customers) × average demand per customer (megawatts/customer)
    3. ENERGY — Energy not served during the outage (megawatt-hours): peak load lost (megawatts) × outage duration (hours) × unserved fraction (fraction)
    4. TIME — Time to restore all customers (hours): customers affected (customers) ÷ restoration rate (customers/hour)

### bp_chemplant — “The Ardsley Works”
- **Discipline:** Chemical & Process Engineering
- **Scenario:** A gas cloud rolled out of a chemical plant at midnight.
- **Science taught:** Conservation of mass & stoichiometry; Reaction rate & activation energy; Catalysis; High-pressure vessels & relief; Separation & distillation; Gas dispersion & the plume; Inherently safer design; The accident triangle & near-misses; The Haber process & dual-use
- **Internal (spoiler — do NOT surface):** real cause = disabled safety systems, to cut costs; tabloid bait = sabotage
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Toxic gas released (kg): tank volume vented (m³) × gas density (kg/m³)
    2. RATE — Leak rate through the hole (kg/s): hole area (m²) × gas velocity (m/s) × gas density (kg/m³)
    3. DISPERSION — Downwind reach of the danger cloud (km): wind speed (km/h) × time to disperse (hours)
    4. CONSEQUENCE — People in the exposure footprint (people): cloud footprint area (km²) × population density (people/km²) × exposed fraction (fraction)

### bp_reactor — “The Thornbury Reactor”
- **Discipline:** Nuclear Reactor Safety
- **Scenario:** A reactor ran wild during a night-shift test.
- **Science taught:** Radioactivity; The neutron; The chemistry of fission; The first controlled pile; Reactor physics & the Wigner effect; Beta decay & precision measurement; Reactor design & inherent safety; Health physics & radiation dose; Reactor risk assessment
- **Internal (spoiler — do NOT surface):** real cause = a concealed reactor design flaw; tabloid bait = sabotage or an attack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Thermal energy released in the excursion (joules): reactor thermal power (watts) × excursion duration (seconds)
    2. OUTPUT — Electricity generated per day (megawatt-hours): thermal power (megawatts) × thermal efficiency (fraction) × hours per day (hours)
    3. DECAY — Decay heat just after shutdown (watts): reactor power (megawatts) × decay-heat fraction (fraction) × watts per megawatt (watts/megawatt)
    4. TIME — Time to boil off coolant on decay heat (seconds): coolant heat capacity to boiling (joules) ÷ decay power (watts)

### bp_t_battery — “The Kelso Grid-Battery Fire”
- **Discipline:** Electrochemistry & Battery Safety
- **Scenario:** One rack ignited before fire spread through the storage yard.
- **Science taught:** Galvanic action & the cell; The fuel cell; The dry cell; The nickel-iron battery; Electrode kinetics & the Tafel equation; Intercalation & the lithium battery; The lithium-ion battery; Electrolytes & battery materials; Battery modeling & thermal runaway
- **Internal (spoiler — do NOT surface):** real cause = a separator defect followed by thermal propagation; tabloid bait = a lithium-dendrite short
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Energy stored in the yard (joules): number of cells (cells) × energy per cell (joules/cell)
    2. POWER — Rated discharge power (watts): pack voltage (volts) × pack current (amperes)
    3. ENDURANCE — Backup runtime at site load (hours): usable energy per cell (watt-hours/cell) × number of cells (cells) ÷ site load (watts)
    4. THERMAL — Heat released if a rack goes into thermal runaway (joules): cells per rack (cells) × energy per cell (joules/cell) × runaway heat fraction (fraction)

### bp_t_dust — “The Corriston Mill Blast”
- **Discipline:** Combustion & Dust-Explosion Engineering
- **Scenario:** The Corriston mill failed in a sequence of blasts.
- **Science taught:** Air, pressure & combustion; The discovery of oxygen; Gas pressure, temperature & explosion; Flame propagation in gases; Shock waves; Dust-explosion severity & venting; Coal-dust explosions; The physics of blown particles; Static discharge
- **Internal (spoiler — do NOT surface):** real cause = secondary dust explosions through suspended deposits; tabloid bait = a confined gas deflagration
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Combustible dust suspended in the air (kg): building air volume (m³) × dust concentration (kg/m³)
    2. SETTLED — Dust lying on surfaces (kg): floor area (m²) × dust layer thickness (m) × dust density (kg/m³)
    3. ENERGY — Energy in the dust explosion (joules): cloud volume (m³) × dust concentration (kg/m³) × heat of combustion (joules/kg)
    4. TIME — Time for the flame front to cross the mill (seconds): mill length (m) ÷ flame-front speed (m/s)

### bp_t_pipeline — “The Brant Hollow Pipeline”
- **Discipline:** Pipeline Integrity & Fluid Mechanics
- **Scenario:** The Brant Hollow pipe opened through a wall defect.
- **Science taught:** Flow, pressure & Bernoulli's principle; Viscous flow in pipes; The Moody friction chart; Water hammer & pressure surge; Gas diffusion & leakage; Corrosion engineering; Pipeline cathodic protection; Brittle fracture & crack growth; Ultrasonic flaw detection
- **Internal (spoiler — do NOT surface):** real cause = external corrosion beneath failed coating; tabloid bait = microbial internal corrosion
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Product spilled before shutdown (barrels): leak rate (barrels/hour) × time to shutdown (hours)
    2. DRAINDOWN — Extra oil that drained after shutdown (barrels): pipe length (m) × pipe cross-section area (m²) × barrels per m³ (barrels/m³)
    3. FLOW — Normal throughput (barrels/day): flow velocity (m/s) × pipe area (m²) × conversion factor (barrel·s per m³·day)
    4. TIME — Time for the pressure drop to reach the control room (seconds): pipe length (m) ÷ pressure-wave speed (m/s)

### bp_t_refinery — “The Halden Refinery Fire”
- **Discipline:** Process Safety & Combustion Engineering
- **Scenario:** A refinery unit erupted after pressure rose and hydrocarbons escaped.
- **Science taught:** Heat engines & the second law; The mechanical equivalent of heat; Vapor pressure & the Clausius-Clapeyron relation; Thermochemistry & explosives; The safety lamp & flame arrest; Detonation & flame theory; Corrosion & potential-pH diagrams; Oil refining & thermal cracking; Catalytic cracking
- **Internal (spoiler — do NOT surface):** real cause = a confined vapor-cloud explosion; tabloid bait = a vessel BLEVE
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Fuel in the vapour cloud (kg): cloud volume (m³) × fuel concentration (kg/m³)
    2. ENERGY — Explosion energy (joules): cloud volume (m³) × energy density of the cloud (joules/m³)
    3. BLAST — Damage-zone area (m²): blast radius (m) × blast radius (m) × pi (constant)
    4. CONSEQUENCE — Workers within the blast zone (people): damage-zone area (m²) × worker density (people/m²) × shift-occupancy fraction (fraction)

### bp_t_transformer — “The Aldergate Substation Fire”
- **Discipline:** Power Engineering & Dielectrics
- **Scenario:** The Aldergate transformer burned after alarms and a citywide outage.
- **Science taught:** Magnetic circuits & transformer theory; AC distribution & the transformer; The ZBD transformer & AC; High-voltage AC & the Ferranti effect; Magnetization & core losses; Dielectric polarization; Gas discharge & avalanche breakdown; Dielectric field control; Heat transfer & thermal analysis
- **Internal (spoiler — do NOT surface):** real cause = thermal aging of internal paper insulation; tabloid bait = a lightning-impulse puncture
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Insulating oil in the transformer (litres): tank volume (m³) × litres per m³ (litres/m³)
    2. ENERGY — Energy in an internal arc fault (joules): fault current (amperes) × arc voltage (volts) × fault duration (seconds)
    3. THERMAL — Heat the oil must absorb (joules): oil mass (kg) × oil heat capacity (joules/kg/°C) × temperature rise (°C)
    4. LOAD — Power the transformer serves (megawatts): rated capacity (MVA) × power factor (fraction)

### bp_t_wind — “The Fenmark Turbine Collapse”
- **Discipline:** Wind Energy & Fatigue Engineering
- **Scenario:** The Fenmark rotor separated during high wind.
- **Science taught:** The Betz limit & wind-turbine theory; The first automatic wind generator; Modern wind-turbine blade design; The Savonius rotor; Airfoil lift theory; Turbine blades & vibration; Hysteresis & metal fatigue; Bearing life & cumulative fatigue; Fatigue crack growth
- **Internal (spoiler — do NOT surface):** real cause = hub-bolt fatigue after preload loss; tabloid bait = a blade-root fatigue crack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Wind power available to the rotor (watts): swept area (m²) × wind power density (watts/m²)
    2. THRUST — Thrust on the rotor in high wind (newtons): swept area (m²) × wind dynamic pressure (Pa) × thrust coefficient (fraction)
    3. ENERGY — Energy generated per year (megawatt-hours): rated power (megawatts) × capacity factor (fraction) × hours per year (hours)
    4. ENDURANCE — Fatigue cycles on a hub bolt per year (cycles): rotor speed (rev/min) × minutes per year (minutes/year)

---

## Medicine & Public Health  (8)

### bp_t_oncology — “The Meredith Clinic Overdose”
- **Discipline:** Radiation Physics & Medical Dosimetry
- **Scenario:** Several patients received excessive radiation after machine service.
- **Science taught:** The discovery of X-rays; Ionization & the Bragg peak; The linear accelerator concept; Cobalt-60 radiotherapy & medical physics; The gray & absorbed dose; Radiation dosimetry; The Paterson-Parker dose system; Chemical (Fricke) dosimetry; Radiation measurement & dosimetry
- **Internal (spoiler — do NOT surface):** real cause = uncalibrated machine output after service; tabloid bait = a planning-system dose error
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Total radiation treatments delivered per year (treatments): treatment days per year (days) × treatments per day (treatments/day)
    2. DOSE — Dose delivered to the tumour (gray): dose rate (gray/minute) × minutes per fraction (minutes) × number of fractions (fractions)
    3. THROUGHPUT — Patients treated per year (patients): machines (machines) × patients per machine per day (patients/day) × operating days per year (days)
    4. ENERGY — Radiation energy deposited in a fraction (joules): dose per fraction (gray) × irradiated tissue mass (kg)

### bp_w_anes — “The Silent Theatre”
- **Discipline:** Anesthesiology & Patient Safety
- **Scenario:** A healthy patient deteriorated soon after induction.
- **Science taught:** Ether anesthesia; Nitrous oxide; The chloroform inhaler & patient safety; The stages & depth of anesthesia; The anesthesia machine; The laryngoscope; Scoring the newborn's vital signs; The blood-gas electrode; Anesthesia mishaps & human factors
- **Internal (spoiler — do NOT surface):** real cause = unrecognized esophageal intubation; tabloid bait = excess anesthetic depth
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — General anaesthetics per year (anaesthetics): operating rooms (rooms) × cases per room per day (cases/day) × operating days per year (days)
    2. RATE — Oxygen used per case (litres): fresh-gas flow (litres/min) × case duration (minutes)
    3. DRUG — Induction drug dose (milligrams): patient weight (kg) × dose per kilogram (mg/kg)
    4. MONITORING — Data points recorded per case (readings): monitored parameters (parameters) × readings per minute (readings/min) × case duration (minutes)

### bp_w_blood — “The Crossmatch”
- **Discipline:** Transfusion & Blood Banking
- **Scenario:** The patient collapsed minutes after transfusion began.
- **Science taught:** The circulation of the blood; Early transfusion & its dangers; Compatibility testing & the crossmatch; The four blood groups; Citrate anticoagulation; Blood preservation for storage; The 'blood bank'; Blood plasma & banking; Hepatitis B & blood screening
- **Internal (spoiler — do NOT surface):** real cause = acute ABO hemolysis from incompatible blood; tabloid bait = transfusion-related acute lung injury
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Units transfused per year (units): inpatients per year (patients) × transfusion rate (fraction) × units per transfused patient (units/patient)
    2. VOLUME — Blood volume in a patient (litres): patient weight (kg) × blood volume per kilogram (litres/kg)
    3. TIME — Time to transfuse one unit (minutes): unit volume (millilitres) ÷ infusion rate (millilitres/min)
    4. SCREENING — Screening tests run per year (tests): donations per year (donations) × tests per donation (tests) × repeat-test factor (factor)

### bp_w_compound — “The Compounding Room”
- **Discipline:** Pharmacy & Sterile Compounding
- **Scenario:** Patients in several states fell ill after injections from one pharmacy.
- **Science taught:** Materia medica & compounding; Dosage & the therapeutic dose; The founding of pharmacy practice; Germ theory & sterilization; Bacterial spores; The founding of medical mycology; Chemotherapy & the 'magic bullet'; Pharmacology & drug standardization; Fungal taxonomy & the mycoses
- **Internal (spoiler — do NOT surface):** real cause = fungal contamination from the clean-room environment; tabloid bait = a chemical compounding impurity
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Sterile doses shipped per year (doses): batches per year (batches) × doses per batch (doses/batch)
    2. CONTAMINATION — Airborne particles in the clean room (particles): room volume (m³) × particle concentration (particles/m³)
    3. THROUGHPUT — Doses compounded per year (doses): compounders (compounders) × doses per compounder per day (doses/day) × working days (days)
    4. EXPOSURE — Patients potentially exposed to a bad lot (patients): clinics served (clinics) × patients per clinic (patients/clinic) × affected-lot fraction (fraction)

### bp_w_hai — “The Ward Cluster”
- **Discipline:** Hospital Epidemiology & Microbiology
- **Scenario:** A resistant infection appeared across one ward within days.
- **Science taught:** The first sight of microbes; E. coli & the gut flora; The culture plate; The Gram stain; Anaerobic culture & pathogens; Penicillin; Isolating penicillin; Hospital antibiotic resistance; Hospital infection control
- **Internal (spoiler — do NOT surface):** real cause = a common contaminated device; tabloid bait = hand-to-hand transmission
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Hospital-acquired infections per year (infections): patient-days per year (patient-days) × infection rate per patient-day (infections/patient-day)
    2. CAPACITY — Patient-days per year (patient-days): staffed beds (beds) × occupancy fraction (fraction) × days per year (days)
    3. SPREAD — New cases from one source in a week (cases): contacts per day (contacts/day) × transmission probability (fraction) × days (days)
    4. RESOURCE — Antibiotic doses used on the ward per week (doses): patients on antibiotics (patients) × doses per patient per week (doses/patient)

### bp_w_surg — “The Wrong Side”
- **Discipline:** Surgery & Patient Safety
- **Scenario:** A routine operation ended in catastrophic harm.
- **Science taught:** Battlefield surgery & the ligature; Surgery in the age before anesthesia; The birth of abdominal surgery; Precision thyroid surgery; The aseptic operating room; The 'end result' & surgical accountability; Measuring the quality of care; The checklist in intensive care; Wrong-site surgery & 'never events'
- **Internal (spoiler — do NOT surface):** real cause = wrong-site surgery after identification failure; tabloid bait = a retained surgical instrument
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Surgical procedures per year (procedures): operating rooms (rooms) × procedures per room per day (procedures/day) × operating days per year (days)
    2. STAFF — Operating-room nurse-hours per year (nurse-hours): operating-room nurses (nurses) × hours worked per year (hours/nurse)
    3. CONSUMABLES — Instruments sterilised per year (instruments): instrument trays per day (trays) × instruments per tray (instruments) × operating days (days)
    4. TIME — Time to complete the safety checklist (minutes): checklist items (items) × minutes per item (minutes/item)

### bp_w_trial — “The Trial Data”
- **Discipline:** Clinical Trials & Biostatistics
- **Scenario:** A blockbuster drug sailed through its trials, then patients began dying of its side effects.
- **Science taught:** The first controlled trial; Small samples & the t-test; Confidence intervals & hypothesis testing; The design of experiments; Cohort studies & causation; Evidence-based medicine; Trial ethics & informed consent; Clinical epidemiology; Honest reporting of trials
- **Internal (spoiler — do NOT surface):** real cause = suppressed adverse-event data; tabloid bait = a rogue trial investigator
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Patient-years of exposure (patient-years): patients enrolled (patients) × mean follow-up (years/patient)
    2. POWER — Participants the trial needs (participants): required per arm (participants/arm) × number of arms (arms)
    3. EVENTS — Adverse events expected (events): patients (patients) × mean follow-up (years/patient) × event rate (events/patient-year)
    4. COST — Trial monitoring visits (visits): sites (sites) × patients per site (patients/site) × visits per patient (visits/patient)

### bp_w_water — “The Tap”
- **Discipline:** Water Supply & Environmental Health
- **Scenario:** A city switched its water source and children started turning up sick.
- **Science taught:** Water analysis & purity; Sanitary chemistry & water quality; Water filtration & treatment; Controlled water chlorination; Wastewater treatment; Corrosion control; The industry threshold for lead; Environmental lead contamination; Corrosion control & the Flint crisis
- **Internal (spoiler — do NOT surface):** real cause = skipped corrosion control; tabloid bait = a rogue plant operator
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — People served by the water system (people): service area (km²) × population density (people/km²) × served fraction (fraction)
    2. THROUGHPUT — Water delivered per day (m³): connections (connections) × water use per connection (m³/connection)
    3. DOSE — Lead a child ingests per day (micrograms): water drunk per day (litres) × lead concentration (µg/litre) × absorbed fraction (fraction)
    4. TREATMENT — Corrosion-control chemical needed per day (kg): water treated per day (m³) × dose (kg/m³)

---

## Computing & Cyber  (8)

### bp_f_ai — “The Aegis Model”
- **Discipline:** Artificial Intelligence & Machine Learning
- **Scenario:** A hiring model quietly rejected thousands who never had a chance.
- **Science taught:** Artificial intelligence, named & founded; Machine learning from data; The artificial neuron; Hebbian learning; Backprop & connectionism; Convolutional networks; Bayesian networks & causal inference; Random forests & the two cultures of modelling; Algorithmic bias in face recognition
- **Internal (spoiler — do NOT surface):** real cause = biased data and a buried warning; tabloid bait = a runaway self-learning intelligence
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Applicants screened per year (applicants): job openings (openings) × applicants per opening (applicants/opening)
    2. COMPUTE — Model training operations (FLOPs): parameters (params) × training tokens (tokens) × operations per parameter-token (FLOPs)
    3. THROUGHPUT — Screening decisions per day (decisions): API servers (servers) × decisions per server per second (decisions/s) × seconds per day (s)
    4. IMPACT — Qualified applicants wrongly rejected per year (people): rejections per year (rejections) × wrongful-rejection fraction (fraction)

### bp_f_breach — “The Halcyon Data Breach”
- **Discipline:** Computer Security & Information Systems
- **Scenario:** Ninety million records walked out the door overnight.
- **Science taught:** Computer-security threat monitoring; The security kernel & trusted systems; Protection & least privilege; The Bell-LaPadula confidentiality model; The integrity model; Worms, malware & incident analysis; Trusting trust & Unix security; Computer security & privacy safeguards; Tracking the intruder through the logs
- **Internal (spoiler — do NOT surface):** real cause = a known-unpatched flaw and a silenced alarm; tabloid bait = a nation-state mastermind
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Records exposed (records): user accounts (accounts) × records per account (records/account)
    2. DATA — Data exfiltrated (gigabytes): records (records) × bytes per record (bytes) ÷ bytes per gigabyte (bytes/GB)
    3. TIME — Time to exfiltrate at the observed rate (hours): data volume (GB) ÷ exfiltration rate (GB/h)
    4. EXPOSURE — Accounts needing a password reset (accounts): affected users (users) × accounts per user (accounts/user) × reset-required fraction (fraction)

### bp_f_crypto — “The Cipher at Meridian Bank”
- **Discipline:** Cryptography & Information Security
- **Scenario:** Millions drained from accounts thought mathematically safe.
- **Science taught:** Kerckhoffs's principle of cipher design; The Vigenère cipher; Breaking the polyalphabetic cipher; Modern cryptanalysis; The Feistel cipher & DES; The Diffie-Hellman key exchange; The RSA cipher; The RSA algorithm; The AES / Rijndael cipher
- **Internal (spoiler — do NOT surface):** real cause = a deprecated cipher kept in service; tabloid bait = an unbreakable-code genius
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Authentications using the deprecated cipher per day (authentications): active users (users) × logins per user per day (logins/user)
    2. STRENGTH — Time to brute-force a key (years): number of possible keys (keys) ÷ keys tried per year (keys/year)
    3. THROUGHPUT — Encryption operations per day (operations): servers (servers) × operations per second (operations/s) × seconds per day (seconds)
    4. EXPOSURE — Vulnerable sessions in a month (sessions): sessions per day (sessions/day) × days in the month (days) × unpatched fraction (fraction)

### bp_f_firmware — “The Halden Infusion Pump”
- **Discipline:** Embedded & Firmware Engineering
- **Scenario:** A drug pump delivered a lethal dose to a sleeping patient.
- **Science taught:** Error-detecting & correcting codes; Information & coding theory; Reed-Solomon codes; Low-density parity-check codes; The integrated circuit; The microprocessor; VLSI design methodology; Fault-tolerant computing; Dependable & fault-tolerant systems
- **Internal (spoiler — do NOT surface):** real cause = a hidden firmware defect and a deleted hardware check; tabloid bait = a tampered device
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Infusion pumps in service (pumps): hospitals (hospitals) × beds per hospital (beds) × pumps per bed (pumps/bed)
    2. DOSE — Drug delivered per hour (milligrams): flow rate (millilitres/hour) × drug concentration (mg/millilitre)
    3. EXPOSURE — Patients on the pumps per day (patients): pumps (pumps) × patients per pump per day (patients/pump)
    4. RISK — Overdose events expected per year (events): pumps (pumps) × infusions per pump per year (infusions) × defect-trigger rate (fraction)

### bp_f_netout — “The Great Grey-Out”
- **Discipline:** Computer Networks & the Internet
- **Scenario:** Half the web went dark in twenty minutes.
- **Science taught:** The vision of networked computing; Packet switching, named; Building the ARPANET; TCP/IP & internetworking; The Domain Name System; The spanning-tree protocol; Congestion control & active queue management; The datagram; The Border Gateway Protocol
- **Internal (spoiler — do NOT surface):** real cause = a misconfiguration and a removed safeguard; tabloid bait = a coordinated cyber-attack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Failed web requests during the outage (requests): normal request rate (requests/second) × outage duration (seconds)
    2. REACH — Users affected (users): data centres down (data centres) × users per data centre (users/centre)
    3. TRAFFIC — Data not delivered (gigabytes): request rate (requests/second) × outage seconds (seconds) × data per request (GB/request)
    4. COST — Lost transactions (transactions): normal transactions per minute (transactions/min) × outage minutes (min) × failure fraction (fraction)

### bp_f_privacy — “The Beacon Consent Scandal”
- **Discipline:** Data Privacy & Information Systems
- **Scenario:** A billion intimate records turned up for sale.
- **Science taught:** Informational privacy & self-determination; Differential privacy; De-anonymizing large datasets; The failure of anonymization; The Tor anonymity network; Security & privacy economics; The relational database; The entity-relationship model; Transactions & data at scale
- **Internal (spoiler — do NOT surface):** real cause = anonymization defeated and data monetized; tabloid bait = a criminal data theft
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Location records in the dataset (records): users tracked (users) × pings per user per day (pings/day) × days of history (days)
    2. STORAGE — Storage the dataset needs (gigabytes): records (records) × bytes per record (bytes/record) ÷ bytes per gigabyte (bytes/GB)
    3. REVENUE — Ad revenue from the data per year (dollars): users (users) × revenue per user per year (dollars/user)
    4. REIDENTIFY — People re-identifiable (people): users (users) × unique-trace fraction (fraction)

### bp_f_robot — “The Cell-9 Robot”
- **Discipline:** Robotics & Autonomous Systems
- **Scenario:** A robot arm killed a technician inside its safety cage.
- **Science taught:** The first industrial robot; The programmable robotic arm; Robot planning & the A* search; Dynamic & legged robots; Active perception; Robot motion & obstacle avoidance; Self-driving & probabilistic robotics; Field & autonomous vehicles; Fuzzy logic & control
- **Internal (spoiler — do NOT surface):** real cause = a bypassed safety interlock and a known fault; tabloid bait = a hacked machine
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Cycles the robot ran before the fault (cycles): operating days (days) × cycles per day (cycles/day)
    2. SPEED — Arm-tip speed (m/s): arm length (m) × rotation rate (radians/second)
    3. ENERGY — Kinetic energy of the moving arm (joules): arm mass (kg) × tip speed squared (m²/s²) × one-half (constant)
    4. THROUGHPUT — Parts produced per year (parts): cycles per hour (cycles/hour) × operating hours per day (hours) × operating days per year (days)

### bp_software — “Fatal Exception”
- **Discipline:** Software & Systems Safety
- **Scenario:** A radiation machine gave patients a hundredfold overdose.
- **Science taught:** The first algorithm; Boolean logic; Compilers & the first 'bug'; Concurrency & race conditions; Integer overflow & the Ariane 5 inquiry; Testing & its limits; Software safety engineering; Robust error handling & Apollo; The analysis of algorithms
- **Internal (spoiler — do NOT surface):** real cause = a fatal software defect, concealed; tabloid bait = a malicious hack
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Patients treated before the flaw was caught (patients): months in service (months) × patients per month (patients/month)
    2. DOSE — Intended radiation dose (gray): dose rate (gray/minute) × exposure time (minutes)
    3. OVERDOSE — Energy from a hundredfold overdose (joules): intended dose (gray) × overdose factor (factor) × tissue mass (kg)
    4. EXPOSURE — Affected treatments across sites (treatments): clinics with the machine (clinics) × patients per clinic per month (patients/month) × months exposed (months)

---

## Law, Finance & Institutions  (7)

### bp_j_bank — “The Sterling Trust Collapse”
- **Discipline:** Banking & Systemic Risk
- **Scenario:** A pillar bank that passed every stress test failed in a single weekend.
- **Science taught:** Popular delusions & the madness of crowds; Debt-deflation; Liquidity & animal spirits; The financial-instability hypothesis; Fat tails & the misbehavior of markets; Bubbles & irrational exuberance; 'This time is different'; The 2005 warning on hidden risk; The black swan & tail risk
- **Internal (spoiler — do NOT surface):** real cause = hidden leverage & gamed models; tabloid bait = an attack on the currency
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Assets held at failure (dollars): number of loans (loans) × average loan size (dollars/loan)
    2. LEVERAGE — Assets from equity and leverage (dollars): equity (dollars) × leverage ratio (ratio)
    3. RISK — Losses in a bad quarter (dollars): loan book (dollars) × default rate (fraction) × loss-given-default (fraction)
    4. RUN — Deposits withdrawn in a run (dollars): depositors (depositors) × average balance (dollars/depositor) × withdrawing fraction (fraction)

### bp_j_capture — “The Halcyon Grid”
- **Discipline:** Regulation & Public Choice
- **Scenario:** A power utility keeps winning every rate case while the lights keep failing.
- **Science taught:** Bureaucracy & rational-legal authority; The 'sunshine' railroad commission; The administrative process & its capture; The political history of rail regulation; The FCC & the case for markets; The logic of concentrated interests; Rent-seeking; The pricing of regulation; The modern theory of regulatory capture
- **Internal (spoiler — do NOT surface):** real cause = a captured oversight board; tabloid bait = a shadowy cabal
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Revenue collected from ratepayers per year (dollars): customers (customers) × average monthly bill (dollars/month) × months per year (months)
    2. ENERGY-SALES — Revenue from energy sold (dollars): energy sold (megawatt-hours) × price (dollars/megawatt-hour)
    3. PROFIT — Allowed profit per year (dollars): rate base (dollars) × allowed return rate (fraction)
    4. OVERCHARGE — Excess billed over fair cost per year (dollars): customers (customers) × monthly overcharge (dollars/month) × months per year (months)

### bp_j_convict — “The Vale Conviction”
- **Discipline:** Law: Criminal Evidence & Due Process
- **Scenario:** A man is doing life for a killing he swears he never did.
- **Science taught:** Due process & the law of the land; The presumption of innocence; The caution against easy accusation; The criminal law & the burden of proof; The psychology of the witness stand; The exclusionary rule & the constable's blunder; Brady v. Maryland & the duty to disclose; The malleability of memory; DNA exoneration & the Innocence Project
- **Internal (spoiler — do NOT surface):** real cause = a buried exculpatory file; tabloid bait = a vast frame-up conspiracy
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — People in the state's prisons (people): prisons (prisons) × average population per prison (people/prison)
    2. RATE — Convictions per year (convictions): courts (courts) × trials per court per year (trials/court) × conviction rate (fraction)
    3. ERROR — Possible wrongful convictions among them (people): prison population (people) × estimated wrongful-conviction rate (fraction)
    4. COST — Person-years wrongly served (person-years): convictions per year (convictions/year) × wrongful rate (fraction) × average sentence (years)

### bp_j_fraud — “The Amberline Collapse”
- **Discipline:** Accounting & Corporate Finance
- **Scenario:** A high-flying energy trader went from market darling to dust in a month.
- **Science taught:** Double-entry bookkeeping; The auditor's duty; Accounting theory & the going concern; Reading the financial statements; The crash & 'the bezzle'; Unaccountable, creative accounting; Asymmetric information & 'lemons'; Financial shenanigans; The internal auditor's discovery
- **Internal (spoiler — do NOT surface):** real cause = losses hidden off the books; tabloid bait = a short-seller raid
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Losses hidden off the books (dollars): off-book entities (entities) × deals per entity (deals) × loss per deal (dollars/deal)
    2. TIME — Quarters the concealment lasted (quarters): total hidden loss (dollars) ÷ hidden loss per quarter (dollars/quarter)
    3. OVERSTATEMENT — Overstated earnings (dollars): reported revenue (dollars) × overstatement fraction (fraction)
    4. MARKETCAP — Shareholder value wiped out (dollars): shares outstanding (shares) × pre-collapse price (dollars/share) × fraction of value lost (fraction)

### bp_j_press — “The Ashford Dispatch”
- **Discipline:** Journalism Ethics & Verification
- **Scenario:** A prize-winning series turns out to rest on a source no one can find.
- **Science taught:** Truth & the free press; The standard of the record; Muckraking & the shame of the cities; Press criticism; Broadcast integrity; Four theories of the press; The editor & the fabricated story; Objectivity as strategic ritual; The origins of objectivity
- **Internal (spoiler — do NOT surface):** real cause = fabricated sourcing; tabloid bait = a plot against the paper
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Articles in the series (articles): months of the series (months) × articles per month (articles/month)
    2. REACH — Readers reached (readers): print circulation (copies) × readers per copy (readers/copy)
    3. EFFORT — Reporter-hours on the series (hours): reporters (reporters) × hours per week (hours/week) × weeks (weeks)
    4. VERIFY — Sources that should have been checked (sources): articles (articles) × claims per article (claims) × sources per claim (sources/claim)

### bp_j_trust — “The Cygnet Standard”
- **Discipline:** Antitrust & Industrial Organization
- **Scenario:** A tech giant's rivals keep dying just as they start to win.
- **Science taught:** The theory of monopoly; The Antitrust Act; The control of the trusts; Creative destruction & monopoly; Imperfect competition; The modern corporation & control; Structure, conduct & performance; Trustbusting & enforcement; The antitrust paradox
- **Internal (spoiler — do NOT surface):** real cause = concealed predatory pricing; tabloid bait = an all-controlling conspiracy
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Below-cost losses absorbed to undercut rivals (dollars): contested markets (markets) × units sold per market (units) × loss per unit (dollars/unit)
    2. MARKET — Market share captured (customers): total market (customers) × share gained (fraction)
    3. DURATION — Months of predatory pricing (months): total loss (dollars) ÷ loss per month (dollars/month)
    4. RECOUP — Extra profit after rivals exit (dollars): customers (customers) × annual price increase (dollars/customer/year) × years (years)

### bp_j_vote — “The Kessler County Count”
- **Discipline:** Elections & Democratic Theory
- **Scenario:** A knife-edge election, and half a county's votes seem to vanish into the margins.
- **Science taught:** The forms of government & citizenship; The voting paradox; The original gerrymander; The tyranny of the majority; Social choice & the manipulation of agendas; Southern politics & disenfranchisement; Polyarchy & who governs; The impossibility theorem; Parties & the counting of votes
- **Internal (spoiler — do NOT surface):** real cause = a documented gerrymander & purge; tabloid bait = a foreign plot
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Voters removed by the purge (voters): registered voters (voters) × purge fraction (fraction)
    2. PROCESS — Purge notices mailed (notices): precincts (precincts) × registered per precinct (voters/precinct) × flagged fraction (fraction)
    3. MARGIN — Election margin (votes): votes cast (votes) × margin fraction (fraction)
    4. IMPACT — Eligible votes lost (votes): purged voters (voters) × turnout rate (fraction) × wrongly-purged fraction (fraction)

---

## History, Culture & Forensics  (8)

### bp_c_arch — “The Cranmoor Skull”
- **Discipline:** Archaeology & Scientific Dating
- **Scenario:** A gravel pit gave up the missing link.
- **Science taught:** Seriation & scientific excavation; Troy & the perils of the eager digger; The grid method & stratigraphic rigor; Palaeolithic prehistory & method; Dendrochronology: tree-ring dating; The exposure of the Piltdown hoax; Economic prehistory & method; Stratigraphic excavation; Radiocarbon calibration
- **Internal (spoiler — do NOT surface):** real cause = a planted, doctored artifact; tabloid bait = the discovery of the century
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Age of the skull (years): radiocarbon half-lives elapsed (half-lives) × years per half-life (years/half-life)
    2. EXCAVATION — Sediment removed to expose the find (m³): pit area (m²) × excavation depth (m)
    3. ASSEMBLAGE — Bone fragments a full dig would yield (fragments): grid squares (squares) × area per square (m²) × fragments per m² (fragments/m²)
    4. DATING — Carbon-14 atoms left in the sample (atoms): sample mass (grams) × carbon fraction (fraction) × carbon-14 atoms remaining per gram (atoms/gram)

### bp_c_art — “The Halberstadt Panel”
- **Discipline:** Art History & Authentication
- **Scenario:** A lost masterpiece surfaced from nowhere and sold for a fortune.
- **Science taught:** The Morellian method: the telltale detail; The trained connoisseur's eye; The Vermeer authority who was deceived; The laboratory that unmasked the forgery; The connoisseur & the fake; The technical analysis of pigments; The pigment archive & conservation; 'Pictology': the science of authenticity; The forger & the deliberate 'time bomb'
- **Internal (spoiler — do NOT surface):** real cause = a forgery with a hidden tell; tabloid bait = a priceless lost masterpiece
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Hours of work in the panel (hours): panel area (m²) × painting hours per m² (hours/m²)
    2. MATERIAL — Gold leaf used for gilding (grams): gilded area (cm²) × gold per unit area (grams/cm²)
    3. VALUE — Auction value (dollars): price per unit size (dollars/m²) × panel area (m²) × condition factor (factor)
    4. DETAIL — Brushstrokes in the work (strokes): painted area (cm²) × stroke density (strokes/cm²) × number of paint layers (layers)

### bp_c_doping — “The Verano Ascent”
- **Discipline:** Sports Science & Anti-Doping
- **Scenario:** A champion rewrote the record books and passed every test.
- **Science taught:** VO2 max & muscle physiology; The textbook of work physiology; GC/MS steroid testing & the T/E ratio; The lab that caught the designer steroid THG; Blood doping & the physiology of EPO; The urine test for EPO; Exposing the East German state doping program; The spread of steroid use; The muscle-biopsy needle & glycogen
- **Internal (spoiler — do NOT surface):** real cause = a systematic doping program; tabloid bait = a once-in-a-century clean champion
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Drug tests the lab runs per year (tests): athletes in the pool (athletes) × tests per athlete per year (tests/athlete)
    2. PHYSIOLOGY — Extra oxygen delivery from doping (millilitres/min): added red-cell volume (millilitres) × oxygen carried per millilitre (mL O₂/mL) × circulation turnover (per minute)
    3. PERFORMANCE — Time saved over the race (seconds): race distance (km) × time saved per km (seconds/km)
    4. DETECTION — Samples stored for re-testing (samples): events per year (events) × athletes tested per event (athletes) × years stored (years)

### bp_c_fall — “The Last Council of Vellano”
- **Discipline:** History & Historical Method
- **Scenario:** A proud republic fell in a single night.
- **Science taught:** Inquiry & the first histories; Why states rise and fall; The corruption of a republic; Philology & exposing the Donation of Constantine; The archive as living narrative; The historian's craft & source criticism; Structures & the long duration; Microhistory & archival reconstruction; Historical evidence & re-enactment
- **Internal (spoiler — do NOT surface):** real cause = a documented contingent decision; tabloid bait = one great traitor
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Defenders manning the walls (soldiers): wall circuit length (m) × defenders per metre (soldiers/m)
    2. POPULATION — City population (people): built-up area (hectares) × population density (people/hectare)
    3. SUPPLY — Days the city could hold out (days): stored grain (kg) ÷ people (people) ÷ daily ration (kg/person/day)
    4. TREASURY — Cost to keep the garrison paid (silver coins): soldiers (soldiers) × daily pay (coins/day) × days under arms (days)

### bp_c_fraud — “The Lindqvist Result”
- **Discipline:** Research Integrity & Scientific Method
- **Scenario:** One lab announced the breakthrough of the decade — and no one else could reproduce it.
- **Science taught:** The inductive experimental method; Induction & the consilience of evidence; Falsifiability & conjectures; Paradigms, anomalies & revolutions; Degenerating research programmes; 'Pathological science'; 'On Fact and Fraud'; How faked results collapse; Detecting invented data
- **Internal (spoiler — do NOT surface):** real cause = fabricated results; tabloid bait = the breakthrough of the decade
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Data points the paper claimed (points): experiments (experiments) × trials per experiment (trials) × measurements per trial (points/trial)
    2. REPLICATION — Labs that tried to reproduce it (labs): fields citing it (fields) × labs per field attempting (labs/field)
    3. EFFORT — Bench hours the claimed work needed (hours): experiments (experiments) × hours per experiment (hours/experiment)
    4. IMPACT — Follow-on studies built on it (studies): citations (citations) × experimental fraction (fraction) × new studies per such citation (studies/citation)

### bp_c_psych — “The Mimicry Effect”
- **Discipline:** Psychology & Research Method
- **Scenario:** A dazzling result took the field by storm — then no one could repeat it.
- **Science taught:** The first experimental psychology laboratory; Correlation & the measurement of mind; Significance testing & experimental design; Clinical versus statistical prediction; Judgment under uncertainty; Why most published findings may be false; Detecting p-hacking in results; Implicit measures & the replication debate; How fabricated datasets were exposed
- **Internal (spoiler — do NOT surface):** real cause = fabricated data; tabloid bait = a landmark discovery
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Participants across the original studies (participants): studies (studies) × participants per study (participants/study)
    2. POWER — Participants a proper replication needs (participants): per-condition sample (participants/condition) × conditions (conditions) × replication factor (factor)
    3. EFFECT — Expected positive results if the effect is real (people): sample size (participants) × effect rate (fraction)
    4. EFFORT — Researcher-hours to run the replication (hours): participants (participants) × sessions per participant (sessions) × hours per session (hours)

### bp_c_script — “The Karnos Tablets”
- **Discipline:** Linguistics & Decipherment
- **Scenario:** A forgotten script gave up its secret: a lost royal epic, one scholar swore.
- **Science taught:** The decipherment of hieroglyphs; The first cuneiform readings; Akkadian cuneiform; The decipherment of Linear B; Documents in Mycenaean Greek; Reading Maya historical inscriptions; The linguistic sign & structure; Comparative grammar & sound laws; Grammatology & the theory of writing
- **Internal (spoiler — do NOT surface):** real cause = a fabricated decipherment; tabloid bait = a lost royal epic
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Symbols in the tablet corpus (symbols): tablets (tablets) × lines per tablet (lines) × symbols per line (symbols/line)
    2. VOCABULARY — Distinct signs in the script (signs): tablets (tablets) × new signs per tablet (signs/tablet)
    3. DECIPHER — Sign-to-word matches to test (pairs): known-language words (words) × candidate matches per word (matches/word)
    4. EFFORT — Scholar-years to catalogue the corpus (scholar-years): tablets (tablets) × hours per tablet (hours/tablet) ÷ working hours per year (hours/year)

### bp_gmtroy — “The Fall of Ilios”
- **Discipline:** Greek Myth & the Archaeology of Troy
- **Scenario:** Schliemann tore into the mound at Hisarlik and pulled out a hoard of gold he crowned 'Priam's Treasure.
- **Science taught:** The Iliad and the oral epic of the wrath; Digging for Troy — discovery and self-mythologizing; Inquiry — sifting legend for what can be checked; Oral-formulaic composition — how epics were built to be sung; Troy VIIa — a layer destroyed by war; Euhemerism — gods as remembered mortals; Translation — how each age remakes the myth; Deciphering Linear B — the Greeks behind the legend; 1177 BC and the Late Bronze Age collapse
- **Internal (spoiler — do NOT surface):** real cause = the plain, burnt city that actually fell in war; tabloid bait = Schliemann's gold — 'Priam's Treasure'
- **Four suggested estimands (scale · rate · time · resource — finalise to [2,2,3,3]):**
    1. SCALE — Defenders the walls could hold (defenders): wall circuit length (m) × defenders per metre (defenders/m)
    2. POPULATION — People inside the walls (people): enclosed area (hectares) × houses per hectare (houses/hectare) × people per house (people/house)
    3. SIEGE — Days to starve the city (days): stored food (kg) ÷ people (people) ÷ daily ration (kg/person/day)
    4. FLEET — Ships to carry the attacking army (ships): warriors (warriors) ÷ warriors per ship (warriors/ship)
