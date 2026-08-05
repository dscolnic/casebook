/**
 * scienceNotes.js — the physics behind every instrument, screen and fitting.
 *
 * Deep Watch shows a player a lot of live numbers. A watchstander arrives knowing
 * what those numbers ARE; the player does not, and a game that only says "bilge
 * 42 cm" teaches nothing about why 42 cm matters, how the tape measured it, or
 * what arithmetic turns it into a flooding rate. So every interactable object,
 * every wall panel and every console has an entry here, reachable with one key.
 *
 * Each entry answers the same five questions in the same order:
 *
 *   oneLine   what this thing is, in one sentence
 *   how       how it physically works — the actual mechanism, not a metaphor
 *   numbers   each quantity on its face, and what the value means
 *   math      (optional) the relationship, with every term named
 *   read      how to read it: what a change means, what to compare it against
 *   trap      the misreading that costs people boats
 *
 * The numbers quoted here are the numbers the simulation actually uses, so a
 * player can check the model against the explanation and find them consistent.
 * Where a figure is a real-world reference value (seawater density, the decibel
 * reference pressure, ISO vibration bands) it is a real figure; where it is this
 * fictional boat's design value it is named as such.
 */

import { BILGE_AREA, BILGE_DEPTH_CM, PANEL_THREAT_CM, VALVES } from '../simulation/FloodingSystem.js';
import { TOTAL_NM, PLANNED_SPEED_KN } from '../simulation/VoyageSystem.js';
import { SOUNDING_INTERVAL_MIN } from '../instruments/InstrumentManager.js';

/* ---------------------------------------------------------------------------
 * Instruments — the things you carry and point at the boat
 * ------------------------------------------------------------------------- */

const INSTRUMENTS = {
  'instrument:acoustic_probe': {
    kind: 'Instrument', title: 'Acoustic Probe',
    oneLine: 'A contact microphone on a handle: it measures how loudly the steel itself is ringing, in decibels.',
    how: `Water forced through a hole does not flow smoothly — it tears into turbulent eddies, and those
      eddies beat on the pipe wall. The pipe passes that vibration into whatever it is bolted to, and the
      structure carries it through the boat as *structure-borne* sound. The probe's piezoelectric element
      is squeezed by that vibration and produces a voltage proportional to it. You are not listening
      through the air; you are listening through the ship.`,
    numbers: [
      ['43–45 dB', 'quiet ambient. Pumps, fans and the plant running normally. This is the floor, not silence.'],
      ['+3 to +10 dB over ambient', 'something is flowing somewhere in this compartment or the next one.'],
      ['+10 to +22 dB', 'strong continuous rush. Close — usually one deck below you.'],
      ['+22 dB or more', 'you are standing on top of it.'],
      ['dB', 'a ratio, not an amount. 20·log₁₀(pressure ÷ reference). +6 dB is twice the pressure; +3 dB is twice the power.'],
    ],
    math: {
      expr: 'level ≈ ambient + gain·e^(−d/10) − 1.5·(bulkheads between)',
      terms: [
        ['gain', 'grows with flow rate — faster water, more violent turbulence, louder pipe'],
        ['d', 'metres from you to the source'],
        ['e^(−d/10)', 'structure-borne sound dies away with distance as it is absorbed and re-radiated'],
        ['1.5 dB', 'roughly what each bulkhead you are listening through costs you'],
      ],
    },
    read: `Never read one number — read the *gradient*. Take a level, walk one compartment, take another.
      The direction the level increases is the direction of the source, and that works even though you have
      no idea what the absolute figure "should" be. Two readings 6 dB apart mean the near one is twice the
      pressure of the far one, which is a big step, not a rounding difference.`,
    trap: `A bulkhead between you and the noise steals about 1.5 dB, so a loud source two compartments away
      can read the same as a modest one next door. That is why you triangulate by walking instead of trusting
      a single loudest reading. Also: standing over an open deck plate you hear the source *directly* rather
      than through steel, which adds about 5 dB — so compare like with like.`,
    see: ['station:sonar', 'instrument:vibration_meter', 'fitting:rupture'],
  },

  'instrument:sounding_tape': {
    kind: 'Instrument', title: 'Sounding Tape',
    oneLine: 'A weighted steel tape you lower into the bilge — the one bilge measurement that cannot lie to you.',
    how: `You drop the weight until it touches the bottom of the bilge, pull it back and read where the water
      wetted the tape. There is no sensor, no transmitter and no power supply anywhere in the chain, which is
      exactly why it exists: every remote bilge level indication on the boat depends on a float, a
      pressure transducer or a wire, and any of those can fail while still showing you a comforting number.
      The tape depends on gravity and the fact that water is wet.`,
    numbers: [
      ['cm', `centimetres of water in the bilge, measured from the bilge floor. The forward bilge is
        ${BILGE_DEPTH_CM} cm deep to the deck plates.`],
      [`${PANEL_THREAT_CM} cm`, 'the height of the forward power panel cable gland. Water above this line reaches live conductors.'],
      [`${BILGE_AREA.forward_equipment} m²`, 'plan area of the forward bilge — the number that turns a depth into a volume.'],
      [`${BILGE_DEPTH_CM} cm`, 'full. Above this it stops being one compartment\'s problem and progresses into the next.'],
    ],
    math: {
      expr: 'inflow (m³/h) = rise (cm/min) ÷ 100 × area (m²) × 60',
      terms: [
        ['rise', 'change in level divided by the minutes between the two soundings'],
        ['÷ 100', 'centimetres to metres'],
        ['× area', 'depth becomes volume — a narrow bilge rises fast on very little water'],
        ['× 60', 'per minute to per hour'],
      ],
    },
    read: `One sounding is a level. Two soundings are a *rate*, and the rate is what tells you whether you
      are winning. Leave at least ${SOUNDING_INTERVAL_MIN} watch-minutes between them: closer together and the
      level has barely moved, so dividing a tiny change by a tiny interval multiplies your reading error
      instead of averaging it out.`,
    trap: `A falling level does not mean the leak stopped. It means removal currently beats inflow — and
      inflow depends on depth, so the same hole floods harder the deeper you go. Isolated and patched is
      stopped; "pump is keeping up" is not.`,
    see: ['station:dc_board', 'instrument:portable_pump', 'display:fwd_dc_status'],
  },

  'instrument:pressure_gauge': {
    kind: 'Instrument', title: 'Pressure Gauge',
    oneLine: 'A Bourdon-tube gauge for system pressure — and, on the sea side, a direct read of how hard the ocean is pushing.',
    how: `Inside is a flattened metal tube coiled into a C. Pressure inside it tries to straighten it out,
      the tip moves a few tenths of a millimetre, and a rack-and-pinion multiplies that into needle sweep.
      It is purely mechanical and it reads *gauge* pressure — the difference between inside and the
      surrounding air, so it reads zero when open to the compartment.`,
    numbers: [
      ['psi', 'pounds per square inch, which is what these gauges are calibrated in. 14.5 psi is 1 bar, and 1 psi is about 0.69 m of seawater.'],
      ['40–50 psi', 'the normal band for a seawater supply branch on this boat. Below about 35 and something upstream is wrong.'],
      ['135–165 psi', 'the normal band for trim and drain.'],
      ['0 psi', 'no pressure at all: that branch is shut in, or you are on the wrong side of a shut valve.'],
      ['sea pressure', 'follows depth exactly. At 60 m the sea presses on the hull at about 6 bar — roughly 87 psi — above the inside.'],
    ],
    math: {
      expr: 'p = ρ·g·h        1 psi ≈ 0.69 m of seawater',
      terms: [
        ['ρ', 'seawater density, about 1025 kg/m³ — 2.5 % denser than fresh, which is why a boat trimmed in a river floats differently at sea'],
        ['g', '9.81 m/s²'],
        ['h', 'depth in metres. 1 m of seawater ≈ 10.05 kPa, so 10 m ≈ 1 bar ≈ 14.5 psi'],
        ['reading it back', 'a branch at 45 psi is carrying about 31 m of head; trim and drain at 147 psi is carrying about 100 m'],
      ],
    },
    read: `Compare each branch against its own normal band, not against the others — a seawater supply and
      the trim system are meant to sit at completely different pressures. Pressure upstream of a shut valve
      and none downstream is proof the valve is actually holding; the same pressure both sides means it is
      passing, whatever the handwheel position says.`,
    trap: `A gauge reads the pressure at the tapping point, not the pressure at the leak. Between the two
      there may be a shut valve, a strainer or fifteen metres of pipe with its own losses.`,
    see: ['valve:generic', 'fitting:rupture'],
  },

  'instrument:salinity_probe': {
    kind: 'Instrument', title: 'Salinity Probe',
    oneLine: 'Two electrodes and a resistance measurement — it tells you whether the water on your deck came from the ocean.',
    how: `Dissolved salt splits into ions, and ions carry current. The probe passes a small alternating
      current between electrodes and measures how easily it flows. Alternating, not direct, so the ions do
      not pile up on the electrodes and give a drifting reading. Conductivity is then converted to practical
      salinity units (PSU).`,
    numbers: [
      ['~35 PSU', 'open-ocean seawater. If the bilge reads this, the sea is coming in.'],
      ['0–2 PSU', 'condensate, potable water, a leaking freshwater system. Bad, but not the ocean, and it does not get worse with depth.'],
      ['5–25 PSU', 'a mixture — often means an old freshwater leak with a new seawater one on top, or the reverse.'],
    ],
    read: `This is the single fastest way to cut your hypothesis list in half. Sea-connected sources scale
      with depth and never run out; internal sources are bounded by a tank and can be isolated without
      touching the hull boundary.`,
    trap: `Salt gets left behind. A bilge that flooded with seawater last month and dried has salt residue
      that will read high on a fresh puddle. Read flowing water, not a stain.`,
    see: ['station:dc_board', 'instrument:sounding_tape'],
  },

  'instrument:multimeter': {
    kind: 'Instrument', title: 'Multimeter',
    oneLine: 'Voltage, and therefore the answer to "is this thing going to kill me if I put water near it".',
    how: `In voltage mode the meter puts a very high resistance across two points and measures the tiny
      current that flows through it — high resistance so that measuring the circuit does not change it.
      The boat's local panels run a nominal 120 V; the mains bus is fed from turbine generators or, on the
      battery, from an inverter.`,
    numbers: [
      ['118–122 V', 'energized and normal. Live conductors.'],
      ['0 V', 'dead. Either secured at the handle or tripped.'],
      ['a drifting low reading', 'often a poor connection or a partially tripped breaker rather than a healthy circuit.'],
    ],
    read: `Voltage tells you the circuit is *available*; it says nothing about how good the insulation is.
      For that you need insulation resistance — a megger — because seawater rising toward a cable gland
      drops insulation resistance long before it causes a visible fault.`,
    trap: `Seawater is conductive and grounded to the hull. A 120 V panel with its gland underwater is a
      ground fault waiting to trip, and a shock hazard for anyone standing in that bilge. De-energize
      *before* the water reaches ${PANEL_THREAT_CM} cm, not after the breaker decides for you.`,
    see: ['panel:fwd_power_2f', 'station:electrical', 'display:distribution'],
  },

  'instrument:vibration_meter': {
    kind: 'Instrument', title: 'Vibration Meter',
    oneLine: 'Machinery health in millimetres per second, plus the frequency of whatever is complaining.',
    how: `An accelerometer measures acceleration; the meter integrates it once to get velocity, because
      velocity in mm/s RMS is roughly proportional to the energy the machine is putting into its own
      structure across a wide band of frequencies. That makes one number comparable between a big slow
      pump and a small fast one. The same signal, run through an FFT, gives you the dominant tone.`,
    numbers: [
      ['about 1.1 mm/s', 'a quiet compartment with no big rotating machine in it.'],
      ['about 4.2 mm/s', 'normal alongside running propulsion or auxiliary machinery.'],
      ['over 6 mm/s', 'rough. On the ISO 10816 scale for machines this size that is the band where you start planning maintenance.'],
      ['Hz', 'cycles per second of the dominant tone. Shaft rate, blade rate and their harmonics all live at exact multiples of a rotation.'],
    ],
    read: `The frequency identifies the culprit. A tone at exactly shaft rate is usually imbalance; at blade
      rate (blades × shaft rate) it is flow over the propeller; at twice line frequency it is electrical.
      Broadband hiss with no dominant tone is flow, not machinery — which is how a flooding source hides
      inside a machinery space.`,
    trap: `mm/s is a *velocity*, so the same displacement at twice the frequency reads twice as high.
      Comparing raw numbers between machines running at different speeds is meaningless unless you also
      compare the tones.`,
    see: ['instrument:acoustic_probe', 'display:propulsion', 'station:engineering'],
  },

  'instrument:ir_thermometer': {
    kind: 'Instrument', title: 'Infrared Thermometer',
    oneLine: 'Surface temperature without touching anything — it reads the infrared light a hot surface emits.',
    how: `Everything above absolute zero radiates, and the power it radiates rises with the fourth power
      of temperature. A thermopile in the instrument absorbs that infrared and warms slightly; the resulting
      voltage is compared with a reference to give a temperature. There is no contact, so you can read a
      cable, a bearing or a cabinet you must not touch.`,
    numbers: [
      ['°C of the surface', 'not of the air, and not of the inside.'],
      ['emissivity', `how efficiently a surface radiates. Painted or oxidised steel is about 0.95, so it reads
        true. Bare polished metal can be 0.1, and will read far too cold because it reflects the room instead.`],
      ['distance-to-spot ratio', 'at 12:1, from 1.2 m away you are averaging a 10 cm circle. Aim close or you average in the wall.'],
    ],
    math: {
      expr: 'radiated power ∝ ε·σ·T⁴',
      terms: [
        ['ε', 'emissivity, 0–1'],
        ['σ', 'Stefan–Boltzmann constant'],
        ['T⁴', 'absolute temperature to the fourth power — which is why a small temperature rise is easy to see'],
      ],
    },
    read: `Differences, not absolutes. Two identical cabinets side by side, one 15 °C hotter, is a finding.
      One cabinet at 48 °C on its own means nothing until you know its limit — the sonar cabinets on this
      boat are limited to 55 °C.`,
    trap: `Point it at shiny stainless and it lies low. Point it through a window and you read the window.`,
    see: ['display:sonar_array_electronics', 'instrument:thermal_camera'],
  },

  'instrument:thermal_camera': {
    kind: 'Instrument', title: 'Thermal Camera',
    oneLine: 'The infrared thermometer as a picture, so you can find *where* the heat is instead of hunting spot by spot.',
    how: `A microbolometer array: thousands of tiny elements whose electrical resistance changes as
      absorbed infrared warms them. Each element becomes a pixel of temperature. The colour scale is
      arbitrary — it maps whatever range is in frame, which is why the same scene can look alarming or calm
      depending on the span.`,
    numbers: [
      ['hot spot', 'a connection with resistance in it, an overloaded conductor, a failing bearing, a fire behind a bulkhead.'],
      ['cold spot', 'often seawater. A pipe carrying sea temperature through a warm space shows up cold, and so does a flooded void behind a bulkhead.'],
    ],
    read: `Behind-the-bulkhead work is what this is for: you cannot see a flooded void, but water is a huge
      thermal mass at sea temperature and the bulkhead over it reads cold in a clean horizontal line. That
      line is the water level.`,
    trap: `It sees surfaces only. A hot cable inside a cold conduit is invisible, and reflections off glossy
      paint can look like hot spots.`,
    see: ['instrument:ir_thermometer', 'fitting:deckplate'],
  },

  'instrument:gas_detector': {
    kind: 'Instrument', title: 'Gas Detector',
    oneLine: 'Oxygen, carbon dioxide and hydrogen — the three numbers that decide whether a compartment is habitable.',
    how: `Three different sensors in one case. Oxygen: an electrochemical cell where O₂ is reduced at an
      electrode and the current is proportional to concentration. CO₂: infrared absorption, because CO₂
      absorbs strongly at 4.26 µm and the amount of that wavelength that survives the cell tells you the
      concentration. Hydrogen: a catalytic bead that burns the gas and gets warmer.`,
    numbers: [
      ['20.9 % O₂', 'normal air.'],
      ['below 19.5 % O₂', 'the standard threshold for oxygen deficiency. Judgement degrades before you notice it doing so.'],
      ['0.04 % CO₂', 'atmospheric. On a submarine, 0.5 % is routine and tolerated for a whole patrol.'],
      ['above 1 % CO₂', 'headache and reduced concentration. This is a *cognitive* casualty long before it is a physical one.'],
      ['4 % H₂', 'the lower explosive limit for hydrogen. Batteries make hydrogen when they charge; that is why battery ventilation is not optional.'],
    ],
    read: `Read the trend against ventilation state. CO₂ climbing with scrubbers running means the scrubber
      is not working; climbing with them secured means only that people are breathing.`,
    trap: `An O₂ reading is a reading *where you are standing*. Heavy gases pool low, hydrogen collects at
      the top of a compartment, and a void that has been shut for a week can be lethal a metre inside the hatch.`,
    see: ['fitting:eab', 'display:plan_of_day'],
  },

  'instrument:flashlight': {
    kind: 'Instrument', title: 'Flashlight',
    oneLine: 'A battery, an LED and a reflector — and, in the dark parts of the boat, the difference between evidence and guesswork.',
    how: `An LED converts current straight into light with no filament, so it is efficient and it survives
      shock, which matters on a boat that gets shaken. The reflector trades width for reach: a tight beam
      throws further but shows you less at once.`,
    numbers: [
      ['lumens', 'total light emitted. Doubling lumens does not double how well you see — the eye responds roughly logarithmically.'],
      ['dark adaptation', 'takes 20–30 minutes to build and about a second of white light to destroy.'],
    ],
    read: `Light across a surface at a shallow angle, not straight at it. Raking light throws shadows off
      a crack, a weld or a trickle of water; head-on light flattens everything into one bright smear.`,
    trap: `Rig for black and then blind yourself and everyone else with a white beam, and the compartment
      is useless for half an hour. Red light preserves adaptation because rod cells barely respond to it.`,
    see: ['fitting:deckplate'],
  },

  'instrument:portable_pump': {
    kind: 'Instrument', title: 'Portable Pump',
    oneLine: 'A centrifugal pump on a frame: it buys you time, and time is the only thing it buys.',
    how: `An impeller spins water outward; the water leaves the tip fast, and the volute converts that speed
      into pressure. Because it works on water and not on air, the suction has to be *primed* — full of water
      — before it does anything. Lose prime and the impeller spins in air, which has almost no mass, so it
      generates almost no pressure.`,
    numbers: [
      ['45 m³/h', 'this pump\'s capacity on this boat, at the head it is working against.'],
      ['4 cm', 'the level below which the suction starts pulling air and the pump loses prime.'],
      ['head', 'how high it must lift the water. A centrifugal pump trades flow for head — the higher the lift, the less it moves.'],
    ],
    math: {
      expr: 'net rate = inflow − pump capacity',
      terms: [
        ['inflow', 'set by hole size and depth, and it grows as you go deeper'],
        ['pump capacity', 'fixed. It does not care how bad the situation is'],
        ['net', 'if this is positive you are losing, and no amount of pumping changes that — only isolation does'],
      ],
    },
    read: `Do the subtraction before you commit to a plan. 48 m³/h in against 45 m³/h out is not "nearly
      keeping up", it is losing slowly with no path to winning. Pumping is what you do *while* somebody
      isolates and patches.`,
    trap: `Cavitation: if suction pressure falls below the vapour pressure of water, bubbles form at the
      impeller and collapse violently, which destroys the impeller and collapses the flow. A pump that
      suddenly gets noisy and stops moving water has usually cavitated or lost prime, not "broken".`,
    see: ['fitting:sump', 'instrument:sounding_tape', 'station:dc_board'],
  },

  'instrument:soft_patch': {
    kind: 'Instrument', title: 'Soft Patch & Band-It',
    oneLine: 'Rubber sheet and steel banding wrapped around a rupture — fast, and not pressure-tight.',
    how: `The rubber conforms to the pipe and bridges the hole; the band puts the rubber under enough
      compression that friction holds it. Nothing here is bonded, so what resists the water is the
      compressive force you managed to apply with a hand tool.`,
    numbers: [
      ['minutes to fit', 'its whole reason for existing.'],
      ['holds pressure: no', 'it will slow a flooded, isolated line. Put sea pressure behind it and it extrudes and blows off.'],
    ],
    read: `A soft patch is a *bridge to a proper repair*, and it is only honest once the line is isolated.
      Fit it on a live line and you will believe the leak is fixed for about ninety seconds.`,
    trap: `The dangerous failure is not the patch coming off — it is you writing "sealed" on the board and
      going somewhere else.`,
    see: ['instrument:pipe_clamp', 'fitting:rupture', 'valve:generic'],
  },

  'instrument:pipe_clamp': {
    kind: 'Instrument', title: 'Split Pipe Clamp',
    oneLine: 'A two-piece steel collar with a gasket — the repair that actually holds sea pressure.',
    how: `Two half-shells bolt around the pipe and squeeze a moulded gasket into the defect. The bolts
      generate far more clamping force than banding can, and the gasket is captured on all sides so it
      cannot extrude. The load path runs through steel, not through friction on rubber.`,
    numbers: [
      ['holds pressure: yes', 'rated to the system it is fitted to.'],
      ['longer to fit', 'you need the right size, both shells, the bolts, and room to swing a spanner.'],
    ],
    read: `This is what turns "isolated and controlled" into "repaired". The order matters: isolate, drain
      the differential, fit the clamp, then re-pressurise slowly and watch it.`,
    trap: `Bolting it over an unsupported, cracked section can propagate the crack. If the pipe is losing
      its shape, shoring takes the load first.`,
    see: ['instrument:soft_patch', 'instrument:shoring', 'fitting:rupture'],
  },

  'instrument:shoring': {
    kind: 'Instrument', title: 'Shoring Wedges & Battens',
    oneLine: 'Timber and wedges that press a plate or patch against a leak using the ship\'s own structure as the anvil.',
    how: `You build a strut between the leak and something strong — a frame, a deck, a bulkhead — and drive
      wedges to put it in compression. Wood is used deliberately: it is stiff enough to carry the load,
      soft enough to conform, it does not spark, and when it gets wet it swells and tightens itself.`,
    numbers: [
      ['closes about 45 %', 'shoring reduces a leak. It rarely stops one.'],
      ['holds pressure: yes', 'as long as the structure you braced against holds.'],
    ],
    read: `Use shoring when the geometry is wrong for a clamp: a hull fitting, a distorted flange, a hole in
      a plate. It is also the right first move when a component is moving, because pressure and vibration
      together open a crack faster than pressure alone.`,
    trap: `Brace against something that will not move. Shoring against a light joiner bulkhead just relocates
      the problem, usually noisily.`,
    see: ['instrument:pipe_clamp', 'fitting:rupture'],
  },

  'instrument:eab': {
    kind: 'Instrument', title: 'Emergency Air Breathing Mask',
    oneLine: 'A mask on a hose that plugs into air manifolds all over the boat, so you can work in an atmosphere you cannot breathe.',
    how: `The mask is fed from the ship's low-pressure air system through manifolds spaced so you can always
      reach the next one. It is a *supplied-air* system, not a self-contained one: you have as much air as
      the ship has, but you are tethered, and moving means unplugging, holding your breath and plugging in
      again at the next manifold.`,
    numbers: [
      ['positive pressure inside the mask', 'so leaks blow outward and smoke does not get drawn in.'],
      ['manifold spacing', 'short enough to cross on one held breath. That is the design constraint.'],
    ],
    read: `Fit it before the atmosphere goes bad, not while it is going bad. Smoke and CO₂ both degrade
      judgement first, and the person deciding whether to don a mask is the person already impaired.`,
    trap: `A beard, a bad seal or a hose fouled on a valve handwheel all fail quietly at the worst moment.`,
    see: ['instrument:gas_detector', 'instrument:extinguisher'],
  },

  'instrument:extinguisher': {
    kind: 'Instrument', title: 'Portable Extinguisher',
    oneLine: 'A pressurised cylinder that attacks one leg of the fire triangle — which leg depends on which bottle you grabbed.',
    how: `Fire needs fuel, oxygen and heat. Water and AFFF foam remove heat (water absorbs an enormous
      amount of energy turning to steam) and foam also blankets fuel from air. CO₂ and dry chemical displace
      or interrupt the oxygen side; CO₂ leaves nothing conductive behind, which is why it goes on electrical
      fires. Get this wrong and you make things worse: water on an energized panel conducts, and water on
      burning oil floats the oil somewhere new.`,
    numbers: [
      ['CO₂', 'electrical fires. Non-conductive, leaves no residue, and displaces oxygen — including yours.'],
      ['AFFF', 'oil and fuel. Blankets the surface and stops vapour rising.'],
      ['water', 'ordinary combustibles. Best heat sink there is, worst choice near electricity.'],
    ],
    read: `De-energize first where you can. A fire fed by electricity restarts as soon as the agent
      disperses, and you will be told you "put it out" three times.`,
    trap: `In a sealed compartment, CO₂ that puts out the fire also removes your oxygen and raises pressure.
      A submarine cannot open a window.`,
    see: ['instrument:eab', 'station:electrical'],
  },
};

/* ---------------------------------------------------------------------------
 * Stations — the consoles you man
 * ------------------------------------------------------------------------- */

const STATIONS = {
  'station:sonar': {
    kind: 'Station', title: 'Sonar — Passive Listening',
    oneLine: 'Four displays fed by three different processing chains, all trying to answer "what is out there" from sound alone.',
    how: `Passive sonar transmits nothing. A hydrophone array picks up pressure fluctuations in the water,
      and the processor delays each hydrophone's signal by the time sound would take to cross the array from
      a given direction. Add the delayed signals and everything from that direction reinforces while
      everything else partly cancels — that is *beamforming*, and it is how a line of microphones acquires
      a direction. Do it for every bearing at once and you get the waterfall.`,
    numbers: [
      ['bearing, 000–360°', 'the direction the sound arrives from. Passive sonar gives you this cheaply and range only with work.'],
      ['dB', 'received level. Source level minus everything the sea took away on the trip.'],
      ['Hz', 'frequency. Machinery makes discrete tones at exact multiples of rotation; the sea and biology make broadband noise.'],
      ['bearing rate, °/min', 'how fast the bearing is changing. Close and fast contacts sweep; distant ones crawl.'],
    ],
    math: {
      expr: 'received = SL − TL   ·   detect when received − NL + DI ≥ DT',
      terms: [
        ['SL', 'source level: how loud the contact is at one metre. A merchant is around 150 dB; biologics much less'],
        ['TL', 'transmission loss. Spherical spreading costs 20·log₁₀(range) — double the range, lose 6 dB'],
        ['NL', 'noise level: sea state, biology, and your own boat. Your own noise is the part you control'],
        ['DI', 'directivity index: what the array gains by listening in one direction instead of all of them'],
        ['DT', 'detection threshold: how much signal-to-noise the processor needs before it calls something a contact'],
      ],
    },
    read: `Classify by KIND of evidence, not by loudness. A merchant shows a blade line with a harmonic
      family (a fundamental and clean multiples of it) and a steady bearing rate. Biologics show broadband
      chorus with no propulsion lines and a bearing that wanders. Your own boat's noise holds a *constant
      relative bearing* through a turn, because it is bolted to you. Something too faint to show lines is
      genuinely Unknown, and leaving it Unknown is the correct answer, not a failure.`,
    trap: `Common-mode error. Broadband, auto-detect and the bearing-time record all come off the same
      beamformer — three windows onto one measurement. Agreeing with itself is not confirmation. Real
      independence means the narrowband analyser (its own acquisition and FFT) or own-ship manoeuvre (pure
      geometry, no processing at all).`,
    see: ['display:broadband_waterfall', 'station:navigation', 'instrument:acoustic_probe'],
  },

  'station:navigation': {
    kind: 'Station', title: 'Navigation Table — Dead Reckoning',
    oneLine: 'Where you are, computed from where you were plus what you have done since — and an honest circle around it.',
    how: `Dead reckoning takes your last trusted position and advances it by course and speed over elapsed
      time. It is entirely self-contained, which is why a submarine can use it, and its error grows without
      bound, which is why you cannot use it forever. The error grows because every input is slightly wrong
      and the wrongness accumulates: a half-knot speed error is a mile every two hours, and it never
      cancels out.`,
    numbers: [
      ['position', 'the estimate. Not a fact — a computation.'],
      ['error ring', 'the radius inside which you probably are. It grows with time since your last independent fix.'],
      ['set and drift', 'the current\'s direction and speed. The water you are moving through is itself moving.'],
      ['sounding vs charted depth', 'measured bottom depth compared with what the chart says should be under you.'],
    ],
    math: {
      expr: 'new position = old position + (course, speed × time) + (set, drift × time)',
      terms: [
        ['course and speed', 'what you ordered, through the water'],
        ['set and drift', 'what the ocean added, over the ground. Ignore it and your track is wrong in a consistent direction'],
        ['time', 'the multiplier on every error you have'],
      ],
    },
    read: `A depth sounding is an independent check that owes nothing to your track. If the bottom under you
      is 46 m and the chart says you should be over 90 m, your position is wrong — and that is a *finding*,
      not a nuisance. Matching a measured depth profile against charted contours is how you fix a position
      without surfacing.`,
    trap: `Two navigation displays can look like two opinions and be one. The inertial repeater and the plot
      repeat are both driven by inertial unit A: if it has drifted, they have both drifted identically and
      they will agree beautifully. Only the bottom contour is a genuinely separate source, because it comes
      from the sea rather than from the boat.`,
    see: ['station:passage_chart', 'station:sonar', 'display:ship_control_repeater'],
  },

  'station:control': {
    kind: 'Station', title: 'Ship Control — Depth, Course and Trim',
    oneLine: 'Two ways of controlling depth — dynamic, using speed and planes, and static, using weight.',
    how: `A submarine at depth is near neutral buoyancy: it displaces almost exactly its own weight. The
      planes then work like small wings, using forward speed to generate a force up or down. That is
      *dynamic* control and it dies with speed — at one knot the planes are nearly useless. *Static* control
      is buoyancy itself: pump water out and you weigh less and rise. Trim is the fore-and-aft balance, and
      it changes the moment any weight moves, including water flooding into a compartment forward.`,
    numbers: [
      ['depth, m', 'and the pressure that comes with it. Deeper is quieter for you and harder on every leak you have.'],
      ['trim, degrees', 'bow-up positive. Beyond about 1° you are noticeably out of balance and the planes are fighting it.'],
      ['speed, knots', 'the currency of dynamic control, and also the loudest thing about you.'],
      ['control effort', 'how hard the planes are working to hold ordered depth. A rising effort at steady depth means weight is changing somewhere.'],
    ],
    read: `Watch control effort, not just depth. Holding depth is not the same as being in balance: the
      planes can mask a lot of added weight right up to the moment they cannot, and then depth changes fast.
      Every tonne of flood water forward is a bow-down moment that somebody has to compensate.`,
    trap: `Compensating for flooding hides it. Pump out to stay in trim and the trim gauge looks lovely
      while the boat quietly gets heavier. The bilge level is the honest number.`,
    see: ['display:ship_control_repeater', 'station:dc_board', 'instrument:sounding_tape'],
  },

  'station:engineering': {
    kind: 'Station', title: 'Machinery Control',
    oneLine: 'The plant: what is making power, what is turning the shaft, and what all of that is costing you acoustically.',
    how: `Energy runs one way — reactor heat into steam, steam through turbines into rotation, rotation into
      the shaft and into generators. Every conversion loses some, and every rotating component announces
      itself at a frequency related to its speed. Managing the plant on a submarine is therefore never only
      about power: it is about which tones you are radiating into the water.`,
    numbers: [
      ['shaft rpm', 'and with it blade rate — blades × rpm ÷ 60 Hz — which is one of the loudest lines you make.'],
      ['bearing temperatures', 'friction becoming heat. A rising bearing is a failing bearing.'],
      ['cooling water flow', 'the boundary between "hot" and "damaged". No flow means a clock starts.'],
      ['load, kW', 'what the electrical plant is being asked for.'],
    ],
    read: `Read the plant as a chain and look for the first link that is off-normal. A hot cabinet with no
      cooling flow is not a cabinet problem; it is a valve lineup problem two compartments away.`,
    trap: `Speed is a decision about noise. Radiated noise rises steeply with speed — cavitation onset
      depends on both speed and depth, and once the propeller cavitates you are audible over an enormous area.`,
    see: ['display:plant_mimic', 'display:propulsion', 'station:passage_chart'],
  },

  'station:electrical': {
    kind: 'Station', title: 'Electrical Switchboard',
    oneLine: 'Where power is generated, split up, and — when something goes wrong — deliberately given away.',
    how: `Generators feed buses; buses feed panels; panels feed loads. Protection is arranged so a fault
      trips the smallest breaker that can clear it, isolating the fault without dropping the ship. A
      submarine's distribution is ungrounded by design, so a single earth fault does not trip anything —
      it is detected and hunted instead, because the *second* fault is the one that becomes a short circuit.`,
    numbers: [
      ['bus voltage, V', 'about 120 V nominal on the local panels here.'],
      ['load, A', 'current drawn. Heat in a conductor goes as current squared, so a 20 % overload is a 44 % heating increase.'],
      ['ground detection', 'insulation resistance to the hull. Falling steadily usually means water somewhere.'],
      ['load shed', 'choosing what to lose. Made in advance, in writing, not during the casualty.'],
    ],
    read: `A tripped breaker is data. Something drew more current than the circuit allows, or insulation
      failed. Reset it once without knowing why and you may re-energize a fault into a flooded bilge.`,
    trap: `Water and electricity fail *together*. Flooding causes electrical faults, and electrical faults
      take out the pumps you were counting on to fight the flooding. Sequence the casualty accordingly:
      de-energize what the water is about to reach, before it reaches it.`,
    see: ['panel:fwd_power_2f', 'instrument:multimeter', 'display:distribution'],
  },

  'station:radio': {
    kind: 'Station', title: 'Radio & Communications',
    oneLine: 'Talking to the world without coming up — which is mostly a story about how badly radio waves handle seawater.',
    how: `Seawater is conductive, so it absorbs radio energy. How deep a signal penetrates depends on
      frequency: the lower the frequency, the further down it reaches. Very low frequency reaches tens of
      metres and can be received on a towed or floating wire; anything at normal communication frequencies
      needs an antenna essentially out of the water. Low frequency also means low bandwidth — a very deep
      signal carries very few characters per minute.`,
    numbers: [
      ['VLF, 3–30 kHz', 'received at depth on a wire. Slow, one-way, always available.'],
      ['comms depth', 'shallow enough to expose an antenna. Also shallow enough to be seen, heard and run into.'],
      ['bandwidth', 'inversely related to how deep you can be. Depth costs data.'],
    ],
    read: `Every transmission is a decision with a cost: coming shallow, exposing a mast, and radiating.
      Receiving is free and silent; transmitting is not.`,
    trap: `"No message" is ambiguous. It can mean nothing was sent, or that you were too deep, or that the
      wire is not streamed. Silence is never confirmation.`,
    see: ['display:comms_status', 'station:passage_chart'],
  },

  'station:dc_board': {
    kind: 'Station', title: 'Damage-Control Plotting Board',
    oneLine: 'Where readings become an estimate, and an estimate becomes a plan — the reasoning surface of the whole game.',
    how: `The board does no measuring. It holds what you actually observed, in the order you observed it,
      and forces two things: an estimate of the leak arrived at two independent ways, and a hypothesis
      list where each candidate must be *eliminated by an observation* rather than by preference. That is
      the difference between diagnosis and guessing.`,
    numbers: [
      ['rate estimate 1 — measured rise', `two soundings, an interval, and ${BILGE_AREA.forward_equipment} m² of bilge area. Depends on your tape and your clock.`],
      ['rate estimate 2 — orifice flow', 'hole size and depth through the flow equation. Depends on your judgement of the hole, not on your tape.'],
      ['agreement', 'two methods sharing no inputs landing in the same region is real confirmation.'],
      ['boundaries', 'what a given valve actually isolates. A plan that does not close the boundary does not work.'],
    ],
    math: {
      expr: 'Q = Cd · A · √(2gh)',
      terms: [
        ['Q', 'volumetric flow, m³/s — multiply by 3600 for m³/h'],
        ['Cd', 'discharge coefficient, about 0.62 for a sharp-edged hole. Real jets contract, so less flows than the area suggests'],
        ['A', 'hole area in m². Area goes as diameter squared: double the diameter, four times the flow'],
        ['√(2gh)', 'the velocity a fall of h metres would give — Torricelli. At 60 m that is about 34 m/s'],
        ['h', 'pressure head in metres of seawater, i.e. your depth. Going deeper makes an unchanged hole flood harder'],
      ],
    },
    read: `Compute before you commit. If inflow exceeds the pump's 45 m³/h, no combination of pumping wins
      and the only answer is to close the boundary. That conclusion comes from arithmetic done in advance,
      not from watching the level rise for ten minutes.`,
    trap: `Two estimates that agree because they share an input are one estimate. If you used the same
      sounding twice you have measured your own tape twice.`,
    see: ['instrument:sounding_tape', 'instrument:portable_pump', 'valve:generic'],
  },

  'station:dc_locker': {
    kind: 'Station', title: 'Damage-Control Locker',
    oneLine: 'The stowage that decides what repairs are physically possible in the next five minutes.',
    how: `Lockers are placed so that everything is within reach of where it might be needed, and stocked so
      that no single flooded compartment takes all of one kind of gear. Each item embodies a different
      trade of speed against durability: banding is fast and temporary, clamps are slow and permanent,
      shoring works where nothing else fits.`,
    numbers: [
      ['what is in this locker', 'not the same as what is in the others. Knowing the difference is part of qualifying.'],
      ['carrying capacity', 'you have two hands. Journey planning is a real constraint in a casualty.'],
    ],
    read: `Take what the plan needs, and take the instruments to *verify* the repair as well as the gear to
      make it. A repair you cannot confirm is a rumour.`,
    trap: `The nearest locker is not always the right one — and finding out mid-casualty costs a round trip
      through a flooding compartment.`,
    see: ['instrument:pipe_clamp', 'instrument:soft_patch', 'instrument:shoring'],
  },

  'station:study_desk': {
    kind: 'Station', title: 'Qualification Card',
    oneLine: 'Three new questions a patrol day — the written half of learning the boat.',
    how: `Retrieval practice: being made to *produce* an answer from memory strengthens it far more than
      re-reading it does, and spacing those retrievals over days beats cramming them into one session. That
      is why the card posts three a day instead of eighteen at once, and why a wrong answer shows you the
      reasoning rather than just the letter.`,
    numbers: [
      ['3 per patrol day', 'spacing, deliberately.'],
      ['10 correct', 'the award. Not a score — a threshold that says you can be trusted with a watch.'],
    ],
    read: `Answer from the boat, not from the wording. Most questions are about a relationship you have
      already seen on a gauge somewhere.`,
    trap: `Guessing to clear the card gets you the ten and teaches you nothing, and the casualties do not
      grade on a curve.`,
    see: ['fitting:bunk'],
  },

  'station:passage_chart': {
    kind: 'Station', title: 'Passage Plot',
    oneLine: 'The crossing: how far, how fast, how long, and what speed costs you in noise.',
    how: `Distance divided by speed is time, and on this scale that arithmetic dominates everything else
      about the patrol. Radiated noise, meanwhile, rises steeply with speed — so the plot is really a
      display of one trade: arrive sooner and be heard, or stay quiet and be at sea for months.`,
    numbers: [
      [`${TOTAL_NM.toLocaleString()} nm`, 'the whole crossing. A nautical mile is one minute of latitude, about 1852 m.'],
      [`${PLANNED_SPEED_KN} kn`, `the quiet transit speed. At this speed the crossing takes about
        ${Math.round(TOTAL_NM / PLANNED_SPEED_KN / 24)} days — roughly four months.`],
      ['13 kn', 'a fast transit: under 45 days, and many decibels louder.'],
      ['days to landfall', 'recomputed from your actual speed made good, not from the plan.'],
    ],
    math: {
      expr: 'days = distance ÷ (speed × 24)',
      terms: [
        ['distance', 'nautical miles remaining'],
        ['speed', 'knots — nautical miles per hour, so the units cancel cleanly'],
        ['× 24', 'hours per day'],
      ],
    },
    read: `Speed is not free and it is not linear. Look at what the same distance costs in noise at each
      speed before ordering more turns, and remember that going faster also blinds your own sonar by
      raising your self-noise.`,
    trap: `Averages hide behaviour. Speed made good over a month can look fine while a single loud sprint
      in a constrained area is the thing that mattered.`,
    see: ['display:passage_plot', 'station:engineering', 'station:navigation'],
  },
};

/* ---------------------------------------------------------------------------
 * Wall displays — the mimic panels that make a compartment legible
 * ------------------------------------------------------------------------- */

const DISPLAYS = {
  'display:fwd_dc_status': {
    kind: 'Display', title: 'Forward Damage-Control Status',
    oneLine: 'Bilge level, its trend, the seawater valve lineup, and what electricity is doing near the water.',
    how: `A repeater, not an instrument: it shows the level a bilge sensor reports, the valve positions the
      manifold reports, and the panel states the switchboard reports. Everything on it is second-hand, which
      is precisely why the sounding tape exists.`,
    numbers: [
      ['FORWARD BILGE LEVEL, cm', `how deep the water is in the forward bilge, out of ${BILGE_DEPTH_CM} cm to the deck plates.`, 'FORWARD BILGE LEVEL'],
      [`red mark at ${PANEL_THREAT_CM} cm`, 'the forward power panel cable gland. Above this line, water is at live conductors.', 'red mark'],
      ['cm/min', 'rate of rise. Positive is losing, negative is winning, near zero is holding.', 'cm/min'],
      [`bilge plan area ${BILGE_AREA.forward_equipment} m²`, 'multiply by the rise to get volume flow in m³/h.', 'bilge plan area'],
      ['level trend', 'the last minute or so of history. Shape matters more than the instantaneous value.', 'level trend'],
      ['SEAWATER MANIFOLD LINEUP', 'OPEN or SHUT for each seawater valve. This is the boundary you are trying to close.', 'SEAWATER MANIFOLD LINEUP'],
      ['fwd power panel 2F', 'ENERGIZED, SECURED or TRIPPED — the electrical boundary, next to the water level that threatens it.', 'fwd power panel 2F'],
      ['source', 'no casualty, OPEN TO SEA, isolated, or SEALED. Isolated is not the same as sealed.', 'source'],
      ['portable pump', 'RUNNING or stopped. Removal, to be subtracted from inflow — not a fix.', 'portable pump'],
    ],
    read: `The trend line answers the only question that matters: is the gap between inflow and removal
      opening or closing? A flat trace with a running pump means you are exactly matched and one more
      metre of depth will break the tie.`,
    trap: `A remote level indication and a rate computed from it are both downstream of one sensor. Confirm
      with the tape before you bet a plan on the shape of this trace.`,
    see: ['instrument:sounding_tape', 'station:dc_board', 'panel:fwd_power_2f'],
  },

  'display:sonar_array_electronics': {
    kind: 'Display', title: 'Sonar-Array Electronics',
    oneLine: 'Cabinet temperature and the cooling water that is supposed to be keeping it down.',
    how: `Signal processing dissipates real power as heat in a sealed cabinet, and seawater-cooled heat
      exchangers carry it away. Semiconductor failure rate climbs steeply with junction temperature — the
      familiar rule of thumb is that life roughly halves for every 10 °C rise — so "hot but working" is a
      countdown, not a state.`,
    numbers: [
      ['CABINET TEMPERATURE, °C', 'the air inside the electronics cabinet.', 'CABINET TEMPERATURE'],
      ['red mark at 55 °C', 'the cabinet limit on this boat. Beyond it, processing is derated to protect the hardware.', 'cabinet limit'],
      ['temperature trend', 'the slope tells you how long you have. A steady climb of 1 °C/min from 40 °C gives you fifteen minutes.', 'temperature trend'],
      ['cooling water flow', 'FLOWING or NO FLOW. This is the cause; temperature is the effect.', 'cooling water flow'],
      ['supply header', 'whether the forward header is feeding this loop.', 'supply header'],
      ['aft cross-connect', 'the alternative cooling path, if the forward supply has been shut to stop a leak.', 'aft cross-connect'],
      ['array processing', 'nominal or DERATED. A derated array is a sonar picture you cannot trust.', 'array processing'],
    ],
    read: `Read cause before effect. If flow has stopped, the temperature reading only tells you how far
      into the problem you already are — and a derated array is a sonar picture you cannot trust.`,
    trap: `Shutting a seawater valve to stop a leak can also shut the cooling supply for something else.
      Isolation always has a second bill, and this panel is where it arrives.`,
    see: ['valve:sonar_cooling_supply', 'valve:sw_crossconnect', 'station:sonar'],
  },

  'display:broadband_waterfall': {
    kind: 'Display', title: 'Broadband Waterfall',
    oneLine: 'Sound energy against bearing, scrolling down over time — the sonar picture in one image.',
    how: `Every horizontal line is one moment: bearing runs left to right across 360°, and brightness is how
      much acoustic energy came from that direction. The newest line is drawn at the top and everything
      shifts down, so time runs downward and history is visible at a glance. Nothing here is a "contact"
      yet — it is energy, and interpreting it is your job.`,
    numbers: [
      ['000 … 360 along the top', 'bearing. The scale runs left to right across the whole horizon.', '000'],
      ['floor, dB', 'your own self-noise. Everything out in the water has to be heard above this line.', 'floor'],
      ['own-ship line', 'whether you are quiet enough to hold weak contacts, or masking them yourself.', 'own-ship'],
      ['top to bottom', 'time, newest first. A minute or so of history.', 'graphic'],
      ['brightness', 'received level. Brighter is louder at your hydrophones, which is not the same as bigger or closer.', 'graphic'],
      ['a vertical bright line', 'a contact holding steady bearing. Either far away, or on a collision course — the display cannot tell you which.', 'graphic'],
      ['a slanting line', 'bearing changing steadily. The slope is the bearing rate.', 'graphic'],
      ['a broad smear', 'noise: sea state, biology, or your own boat when you speed up.', 'graphic'],
    ],
    read: `Track the *shape* over time. Straight and vertical means constant bearing; a slant means relative
      motion; a wander means something biological or a very weak signal being pushed around by noise. A
      contact fading as you speed up has not gone away — you have gone deaf.`,
    trap: `This display, the auto-detect list and the bearing-time record all come from the same beamformer.
      When they agree, that is one measurement agreeing with itself.`,
    see: ['station:sonar', 'display:ship_control_repeater'],
  },

  'display:autodetect': {
    kind: 'Display', title: 'Auto-Detect List',
    oneLine: 'A threshold detector: everything the processor thinks is louder than the noise, listed with its level.',
    how: `The processor compares each bearing's energy with an estimate of the background and flags anything
      that exceeds it by a set margin. That margin is the detection threshold, and it is a *choice*: set it
      low and you get every wave crest and shrimp bed as a "contact"; set it high and you miss the quiet
      submarine. There is no setting that avoids both errors, which is why a human still classifies.`,
    numbers: [
      ['bearing, °', 'where the detector thinks the energy came from.'],
      ['strength, dB', 'received level. Loud can mean close, or loud, or favourably placed in the sound channel.'],
      ['a contact appearing and vanishing between sweeps', 'a signal sitting right at threshold, not a manoeuvring target.'],
    ],
    read: `Use the list to point your attention, then confirm on a display that shows you the raw evidence.
      A detection is a hypothesis generated by an algorithm with fixed settings.`,
    trap: `It runs on the beamformer output — same chain as the waterfall and the bearing-time record. It
      cannot independently confirm anything either of those shows.`,
    see: ['station:sonar', 'display:broadband_waterfall', 'display:narrowband'],
  },

  'display:narrowband': {
    kind: 'Display', title: 'Narrowband Analyser',
    oneLine: 'A frequency spectrum of one bearing: the discrete tones a machine cannot help making.',
    how: `A Fourier transform decomposes a time signal into the frequencies inside it. Rotating machinery
      produces energy at exact multiples of its rotation rate — a fundamental and its harmonics — because
      the same event (a blade passing, a piston firing, a gear tooth meshing) repeats precisely once per
      turn. Broadband noise has no such structure. That difference is what makes classification possible
      from sound alone, and this display is where you see it.`,
    numbers: [
      ['Hz', 'frequency of each line.'],
      ['blade rate', 'blades × shaft revolutions per second. A merchant might sit at 82 Hz with clean harmonics above it.'],
      ['harmonic family', 'a fundamental plus multiples of it — strong evidence of a machine.'],
      ['a single unexplained line', 'not a family, and not a classification. This is what "Unknown" looks like.'],
    ],
    math: {
      expr: 'blade rate (Hz) = blades × rpm ÷ 60',
      terms: [
        ['blades', 'number of propeller blades'],
        ['rpm ÷ 60', 'revolutions per second'],
        ['harmonics', 'appear at 2×, 3×, 4× the fundamental. Their spacing tells you the fundamental even if it is masked'],
      ],
    },
    read: `Count lines and check their spacing. Evenly spaced lines are one machine; unrelated lines are
      several sources or noise. Frequency also *shifts* with speed, so a family sliding together is one
      contact changing revolutions.`,
    trap: `This is the analyser's own acquisition and FFT chain, which makes it genuinely independent of the
      beamformer — that independence is the point of it, and it is wasted if you only ever look here after
      you have already decided.`,
    see: ['station:sonar', 'display:autodetect', 'instrument:vibration_meter'],
  },

  'display:btr': {
    kind: 'Display', title: 'Bearing-Time Record',
    oneLine: 'One contact\'s bearing plotted against time — the display that turns bearings into motion.',
    how: `Passive sonar gives bearing but not range. Bearing *history*, though, contains geometry: how fast
      a bearing changes depends on the contact's speed across your line of sight and its range. A close
      contact sweeps quickly; a distant one crawls, even at the same speed. Manoeuvre your own boat and the
      change in bearing rate lets you solve for range — target motion analysis, done with a plot and
      patience rather than a rangefinder.`,
    numbers: [
      ['°/min', 'bearing rate. Steady rate means steady geometry.'],
      ['a flat trace', 'constant bearing. Either very distant, or on a constant-bearing closing course.'],
      ['a curving trace', 'the geometry is changing — the contact is manoeuvring, or you are.'],
      ['a kink at your own turn', 'the useful moment: the size of the kink is information about range.'],
    ],
    read: `Read it together with your own course history, because half of what this display shows is your
      own motion. A bearing that changed when you turned tells you about geometry; a bearing that changed
      when you did not tells you about the contact.`,
    trap: `Constant bearing is the dangerous case, not the boring one — it is what a collision course looks
      like. And this trace comes off the same beamformer as the waterfall.`,
    see: ['station:sonar', 'display:broadband_waterfall', 'station:navigation'],
  },

  'display:nav_chart': {
    kind: 'Display', title: 'Navigation Chart & Depth Contours',
    oneLine: 'The sea bottom drawn in depth bands, with your dead-reckoned track and the routes across it.',
    how: `Contours join points of equal depth, so their spacing *is* the slope: tightly packed lines mean
      the bottom is climbing fast. Charted depths come from surveys of varying age and density, so a chart
      is a model of the sea floor rather than a photograph of it. Your track, meanwhile, is a computation.
      Two models, and the interesting moments are where they disagree.`,
    numbers: [
      ['depth bands, m', 'darker is deeper. The band edges are the contours.'],
      ['contour spacing', 'slope. Close together on your route means a bank, and banks are what you hit.'],
      ['shoaling rate, m/nm', 'how much water you lose per mile along track — about 95 m/nm over the bank here.'],
      ['error ring', 'your position uncertainty. Lay it over the contours to see the worst case you have accepted.'],
    ],
    math: {
      expr: 'worst-case depth ≈ charted depth − (ring radius × shoaling rate)',
      terms: [
        ['ring radius', 'nautical miles of position uncertainty'],
        ['shoaling rate', 'metres of depth lost per nautical mile of position error'],
        ['result', 'the depth you must actually plan for, not the one printed on the chart'],
      ],
    },
    read: `Choose the route that survives being at the *worst* edge of your error ring, then use soundings
      along the way to check the chart against the sea. A measured depth that matches the contour you expect
      is a position fix that owes nothing to your inertial unit.`,
    trap: `Treating the charted depth as the depth you will have. Position uncertainty over sloping ground
      is depth uncertainty, and a 1.5 nm ring on this bank is well over a hundred metres of water you may
      not have.`,
    see: ['station:navigation', 'station:passage_chart', 'display:passage_plot'],
  },

  'display:ship_control_repeater': {
    kind: 'Display', title: 'Ship Control Repeater',
    oneLine: 'Depth, course, speed, trim and how hard the planes are working, repeated where everyone can see it.',
    how: `Depth comes from a pressure transducer — the sea's own pressure converted into metres using
      seawater density. Course comes from the inertial unit or the gyro. Trim comes from an inclinometer,
      which is a damped pendulum: it measures the direction of "down" relative to the boat.`,
    numbers: [
      ['DEPTH, m', 'from sea pressure. About 1 bar per 10 m.', 'DEPTH'],
      ['ordered depth, m', 'what was asked for. The gap between ordered and actual is the interesting number.', 'ordered'],
      ['rate, m/min', 'how fast depth is changing. Zero at the wrong depth is a different problem from moving at the right one.', 'rate'],
      ['TRIM, °', 'fore-and-aft angle. Bow-down as water collects forward.', 'TRIM'],
      ['HEAD, °', 'true heading.', 'HEAD'],
      ['SPEED, kn', 'through the water. Over the ground differs by the current.', 'SPEED'],
      ['WATER EMBARKED, t', 'tonnes of flood water aboard. Weight you did not plan to carry.', 'WATER EMBARKED'],
      ['DEPTH-CONTROL EFFORT, %', 'how hard the planes are working to hold ordered depth. This is where hidden weight shows up first.', 'DEPTH-CONTROL EFFORT'],
      ['depth trend', 'the last minute of depth history.', 'depth trend'],
      ['planes', 'responding normally, or fighting something.', 'planes'],
      ['main ballast', 'whether the static side of depth control is still on plan.', 'main ballast'],
    ],
    read: `Depth steady with rising control effort means the boat is getting heavier and being flown, not
      floated. That is an early flooding indication and it appears before any bilge alarm.`,
    trap: `An inclinometer measures acceleration as well as gravity, so it also responds to manoeuvring.
      Read trim while steady, not in a turn.`,
    see: ['station:control', 'display:fwd_dc_status', 'station:navigation'],
  },

  'display:passage_plot': {
    kind: 'Display', title: 'Passage Plot',
    oneLine: 'The whole crossing on one board: legs done, distance to go, days to landfall.',
    how: `Distance made good is speed integrated over time — the plot accumulates it as the patrol clock
      runs, so it reflects what you actually did rather than what was planned. Days remaining are recomputed
      from your current speed, which is why they move when you change turns.`,
    numbers: [
      [`x of ${TOTAL_NM.toLocaleString()} nm · % across`, 'distance made good against the whole crossing, and the same thing as a percentage.', `of ${TOTAL_NM.toLocaleString()} nm`],
      ['making … kn', 'speed made good right now. Everything else on this board is computed from it.', 'making'],
      ['days to landfall', 'remaining distance at present speed — recomputed, not the plan.', 'days to landfall'],
      ['patrol day', 'days since sailing, so the crossing and the watch bill share one clock.', 'patrol day'],
      ['the legs', 'the passage divided into named segments, each with its own constraints.', 'Shelf Edge'],
    ],
    read: `Compare planned against actual. A percentage that has stopped moving means you are slow, stopped,
      or going somewhere other than the plan.`,
    trap: `Distance made good is over the ground, so a current you have not accounted for shows up here as
      progress you did not make.`,
    see: ['station:passage_chart', 'station:navigation'],
  },

  'display:comms_status': {
    kind: 'Display', title: 'Communications Status',
    oneLine: 'What is streamed, what depth you would need, and when you last heard anything.',
    how: `Reception depends on frequency and depth: low frequencies penetrate seawater and high ones do not.
      The panel therefore reports the physical prerequisites — antenna or wire streamed, depth — as well as
      traffic, because with the prerequisites unmet, silence means nothing at all.`,
    numbers: [
      ['EMCON STATE', 'the emissions-control condition you are keeping. It says what you may radiate, not what you may hear.', 'EMCON STATE'],
      ['antenna', 'available or housed. A housed antenna cannot receive, so silence proves nothing.', 'antenna'],
      ['traffic pending', 'messages waiting for you to be shallow enough to take them.', 'traffic pending'],
      ['depth for mast, m', 'how shallow you would have to come. At 60 m you are simply too deep for it.', 'depth for mast'],
    ],
    read: `Treat time since last receipt as an expiry date on your orders and your threat picture, not as a
      curiosity.`,
    trap: `Transmitting to check comms is not a free test. It radiates.`,
    see: ['station:radio'],
  },

  'display:plan_of_day': {
    kind: 'Display', title: 'Plan of the Day',
    oneLine: 'Watch rotation, patrol day, drills, and the atmosphere numbers everyone lives inside.',
    how: `Submarine watch rotations are built to give continuous coverage with a fixed number of people, so
      they rarely line up with a 24-hour circadian cycle. That mismatch is a known performance hazard:
      sleep debt degrades reaction time and judgement in the same way as alcohol, and it does so without
      the person noticing.`,
    numbers: [
      ['the watch bill, 0400–2000', 'when watches turn over and what evolutions are planned.', 'Watch relief'],
      ['patrol day', 'days since sailing.', 'patrol day'],
      ['h awake', 'hours since you last slept. Past about 18, measurable impairment; the boat expects you down before then.', 'h awake'],
      ['O₂ %', 'about 20.9 % normally; below 19.5 % is deficient.', 'O₂'],
      ['CO₂ %', '0.5 % is routine at sea; above 1 % costs you concentration.', 'CO₂'],
    ],
    read: `Read this as a limit on *you*, alongside the plant limits everywhere else on the boat.`,
    trap: `Fatigue and CO₂ both impair the judgement being used to decide whether you are impaired.`,
    see: ['fitting:bunk', 'instrument:gas_detector'],
  },

  'display:plant_mimic': {
    kind: 'Display', title: 'Plant Mimic',
    oneLine: 'The propulsion and electrical plant drawn as it is connected, with live values on the lines.',
    how: `A mimic diagram maps the physical plant onto a picture, so a lineup can be read as a shape rather
      than as a list of valve positions. Follow the energy: heat to steam, steam to turbines, turbines to
      shaft and generators, generators to buses.`,
    numbers: [
      ['ELECTRICAL — bus voltage, V', 'each bus with its voltage and what is feeding it. 450 V mains, 120 V vital.', 'ELECTRICAL'],
      ['COOLING — °C and flow %', 'loop temperature and how much flow it is getting. Flow is the cause, temperature the effect.', 'COOLING'],
      ['PUMPS', 'what is running. Each running pump is both work being done and noise being made.', 'PUMPS'],
      ['SELF-NOISE FLOOR, dB', 'the acoustic bill for the plant lineup — about 3 dB per running pump.', 'SELF-NOISE FLOOR'],
      ['BILGES', 'dry, or the level in each compartment that is not.', 'BILGES'],
    ],
    read: `Trace the path rather than scanning for red. Most plant faults are a break in one chain, and the
      alarm usually fires downstream of the actual cause.`,
    trap: `A mimic shows *reported* positions. A valve indicating shut and a valve that is shut are the same
      thing right up until they are not.`,
    see: ['station:engineering', 'display:propulsion', 'display:distribution'],
  },

  'display:propulsion': {
    kind: 'Display', title: 'Propulsion',
    oneLine: 'Shaft speed, bearing temperatures, and the acoustic bill for the speed you have ordered.',
    how: `Torque on the shaft turns the propeller, which accelerates water aft. Each blade passing a fixed
      point generates a pressure pulse, so the propeller radiates a strong tone at blade rate — blades times
      shaft rpm divided by 60. Push harder and pressure on the blade backs falls until water flashes to
      vapour: cavitation, whose collapsing bubbles are broadband and extremely loud.`,
    numbers: [
      ['SHAFT, rpm', 'shaft speed, and therefore blade rate in hertz: blades × rpm ÷ 60.', 'SHAFT'],
      ['mode · online', 'what is driving the shaft and whether it is answering.', 'mode'],
      ['shaft trend', 'recent rpm history — a speed change is an acoustic event, not just a navigational one.', 'shaft trend'],
      ['lube oil', 'the film that keeps metal off metal. Lose it and the bearing temperature follows immediately.', 'lube oil'],
      ['thrust bearing, °C', 'friction becoming heat, at the bearing taking the propeller thrust. Trend matters more than value.', 'thrust bearing'],
      ['cavitation', 'none, or RISK. Depends on speed AND depth: pressure suppresses cavitation, so shallow and fast is the loud corner.', 'cavitation'],
    ],
    read: `Depth and speed together decide whether you cavitate. The same rpm can be quiet deep and very
      loud shallow, which makes depth a tactical choice and not just a safety one.`,
    trap: `Once cavitating, you are loud over a huge area and you may be the only one who does not know it,
      because your own sonar is now swamped by your own noise.`,
    see: ['station:engineering', 'instrument:vibration_meter', 'station:passage_chart'],
  },

  'display:distribution': {
    kind: 'Display', title: 'Electrical Distribution',
    oneLine: 'Buses, breakers and loads — where the power is going and what is protecting it.',
    how: `Power flows from generators through switchboards to panels and loads, with protection graded so
      the smallest breaker able to clear a fault is the one that opens. That is why a whole bus dropping is
      a much worse finding than one panel tripping: the grading failed, or the fault was upstream.`,
    numbers: [
      ['bus voltage, V', 'health of each supply — 450 V mains, 120 V vital — and what is feeding it.', 'portMain'],
      ['bus load, A', 'current drawn. Heating goes as current squared, so a 20 % overload is 44 % more heat.', 'bus load'],
      ['ground detector', 'clear, or EARTH FAULT. This distribution is ungrounded, so the FIRST fault does not trip — it is hunted.', 'ground detector'],
      ['local panels', 'energized, secured, or TRIPPED. Tripped is not the same as secured: something happened.', 'local panels'],
    ],
    read: `Read the tripped breaker as evidence about the load behind it, and ask what else that breaker
      was feeding before you close it again.`,
    trap: `Restoring power into a flooded space energizes a fault, and the second earth fault on an
      ungrounded system is the one that becomes a short circuit.`,
    see: ['station:electrical', 'panel:fwd_power_2f', 'instrument:multimeter'],
  },

  'display:auxiliary_bilge': {
    kind: 'Display', title: 'Auxiliary & Bilge',
    oneLine: 'The pumping and drain systems: what can move water, from where, to where.',
    how: `The drain system is arranged so that any compartment can be pumped either by installed pumps or
      by portable ones through a common main. Suction lift and pipe friction limit what any pump can do, so
      the practical question is never "can we pump" but "can we pump *this* compartment, at *this* depth,
      fast enough".`,
    numbers: [
      ['AFTER BILGE LEVEL, cm', 'how much water is in the after bilge, on the same scale as the forward one.', 'AFTER BILGE LEVEL'],
      ['after bilge pump / seawater pump', 'RUNNING or stopped, per pump.', 'after bilge pump'],
      ['air compressor', 'standby or running — the ship\'s air, which is also what the breathing manifolds run on.', 'air compressor'],
      ['heat exchanger, °C', 'where the secondary loop dumps its heat into the sea.', 'heat exchanger'],
      ['dewatering capacity, m³/h', 'installed 60 and portable 45. This is the number you subtract inflow from.', 'dewatering capacity'],
    ],
    read: `Removal capacity is only a number until you subtract inflow from it. Do the subtraction at the
      plotting board first; line up the pump second.`,
    trap: `A pump lined up to the wrong bilge runs beautifully and empties nothing, and the level trace
      looks exactly like a pump that is losing.`,
    see: ['instrument:portable_pump', 'station:dc_board', 'fitting:sump'],
  },
};

/* ---------------------------------------------------------------------------
 * Fittings — valves, panels, hatches and the rest of the hardware
 * ------------------------------------------------------------------------- */

const FITTINGS = {
  'valve:generic': {
    kind: 'Fitting', title: 'Hand-Operated Valve',
    oneLine: 'A handwheel, a stem and a disc — the thing that decides where water is allowed to be.',
    how: `Turning the handwheel drives a threaded stem that pushes a disc onto a seat. The screw thread is
      a force multiplier: many turns of a light hand load become enough seating force to hold a system at
      pressure. Which is also why a valve takes real time to operate, and why "shut" is a process rather
      than a switch.`,
    numbers: [
      ['open / shut', 'and, in between, throttling — which erodes seats and is not what these are for.'],
      ['turns to shut', 'the reason isolation is measured in tens of seconds, not instantly.'],
      ['inboard / outboard', 'where the valve sits relative to the hull. Outboard valves are closer to the sea.'],
    ],
    read: `Isolation is about *boundaries*, not about individual valves. Ask what a valve separates: if
      water can still reach the leak by another path, shutting this one changes nothing. Then check the
      boundary held — pressure upstream and none downstream.`,
    trap: `Every isolation has a second effect. The same seawater system that is flooding you is cooling
      something, and shutting the supply starts a different clock two compartments away.`,
    see: ['station:dc_board', 'display:sonar_array_electronics', 'instrument:pressure_gauge'],
  },

  'panel:generic': {
    kind: 'Fitting', title: 'Local Electrical Panel',
    oneLine: 'A local distribution panel with a main breaker handle — 120 V, and a cable gland close to the deck.',
    how: `The panel takes a feed from a switchboard and splits it among local loads, each behind its own
      protective device. The handle opens the main breaker mechanically, which is the one way to be certain
      the panel is dead regardless of what any indicator claims.`,
    numbers: [
      ['energized / secured / tripped', 'live; deliberately opened at the handle; opened by protection because of a fault.'],
      ['120 V nominal', 'enough to be lethal through wet skin.'],
      [`gland height ${PANEL_THREAT_CM} cm`, 'where the cables enter. Water above this line is at live conductors.'],
    ],
    read: `A tripped panel is telling you something failed. Secured is a decision you made. The two look
      identical on a mimic and mean opposite things.`,
    trap: `De-energizing costs you whatever the panel feeds — possibly lighting or a pump you were relying
      on. Decide *before* the water arrives, so it is a choice rather than an accident.`,
    see: ['instrument:multimeter', 'station:electrical', 'display:distribution'],
  },

  'fitting:hatch': {
    kind: 'Fitting', title: 'Watertight Hatch',
    oneLine: 'A dogged steel door in a bulkhead: the boat\'s ability to lose one compartment and survive.',
    how: `Subdivision is what makes a flooded compartment survivable. Each watertight bulkhead limits how
      much water one hole can admit and therefore how much buoyancy and trim moment you can lose. The dogs
      pull the door onto a gasket hard enough that sea pressure cannot open a path; pressure then helps hold
      the door shut on the flooded side — which is also why a door with water behind it can be impossible
      to open.`,
    numbers: [
      ['open / shut', 'and shut means dogged, not just closed.'],
      ['time to shut', 'seconds you may not have. Which is why the order is given early.'],
    ],
    read: `Shutting a boundary early costs you access and costs the compartment its people's help. Shutting
      it late costs you the next compartment. That decision is the whole reason bulkheads exist.`,
    trap: `Progressive flooding does not respect a shut hatch if there is a cable penetration, a ventilation
      duct or a drain line through the same bulkhead. The boundary is the whole bulkhead, not just the door.`,
    see: ['fitting:deckplate', 'station:dc_board', 'station:control'],
  },

  'fitting:deckplate': {
    kind: 'Fitting', title: 'Deck Plate',
    oneLine: 'A removable steel panel over the bilge — the only way to see and reach what is underneath the deck.',
    how: `The bilge is the lowest part of the compartment, where anything liquid ends up. Deck plates cover
      it so people can walk, and lift out so the space can be sounded, pumped and repaired. With the plate
      down you have remote indications only; with it up you have your eyes, a tape and your hands.`,
    numbers: [
      ['plate down', 'you are working from sensors and inference.'],
      ['plate up', 'you can sound the bilge, see the source and hear it directly — worth about 5 dB on the acoustic probe.'],
      ['coaming lips', 'the raised edges. They keep water in the bilge and they are a genuine trip hazard.'],
    ],
    read: `Lifting the plate converts second-hand indications into first-hand evidence, which is nearly
      always the right trade when a level indication and a symptom disagree.`,
    trap: `An open hole in the deck, in a compartment with rising water and possibly live electrics. Know
      where it is before you need to move quickly.`,
    see: ['instrument:sounding_tape', 'fitting:rupture', 'instrument:flashlight'],
  },

  'fitting:rupture': {
    kind: 'Fitting', title: 'Ruptured Seawater Line',
    oneLine: 'The hole itself: a failed section of seawater pipe, flooding at a rate the ocean sets.',
    how: `Seawater piping fails from the inside out. Flow erodes protective films, dissimilar metals set up
      galvanic cells, and turbulence downstream of a bend or a fitting thins the wall in a preferred spot —
      erosion-corrosion. When the wall can no longer take the hoop stress it goes, usually at a fitting or
      a weld rather than in the middle of a straight run. The jet that comes out is fast enough to cut.`,
    numbers: [
      ['hole area', 'the dominant term. Flow goes as area, and area goes as diameter squared.'],
      ['depth', 'the driving head. The same hole floods harder deeper, and this is not gradual — it goes as √depth.'],
      ['jet velocity', 'at 60 m, about 34 m/s. That is a cutting tool, not a spray.'],
    ],
    math: {
      expr: 'Q = 0.62 · A · √(2gh)',
      terms: [
        ['0.62', 'discharge coefficient for a sharp-edged hole — the jet contracts, so less flows than area alone suggests'],
        ['A', 'hole area, m²'],
        ['h', 'depth, m. Doubling depth multiplies flow by √2 ≈ 1.41'],
      ],
    },
    read: `Estimate the hole, compute the flow, compare it with removal capacity. That arithmetic decides
      whether this is a pumping problem or an isolation problem, and it takes about twenty seconds.`,
    trap: `Working on a live line is how people get hurt: the jet, and the fact that any patch you apply is
      being pushed off by sea pressure. Isolate first, and treat "the level stopped rising" as a hypothesis
      to test rather than a result.`,
    see: ['valve:generic', 'instrument:pipe_clamp', 'station:dc_board'],
  },

  'fitting:sump': {
    kind: 'Fitting', title: 'Bilge Sump',
    oneLine: 'The deliberate low point where a pump suction can stay underwater.',
    how: `A centrifugal pump only moves water while its suction is full of water. The sump is dug lower
      than the surrounding bilge so that the last few centimetres collect in one place and the suction stays
      submerged as the level falls. A strainer over it keeps rags and debris out of the impeller, at the
      cost of blocking if the water is dirty — which, in a damaged compartment, it is.`,
    numbers: [
      ['4 cm', 'below this the suction pulls air and the pump loses prime.'],
      ['strainer', 'protects the pump, and is the first thing to clog.'],
    ],
    read: `Set the suction in the sump, not wherever it happens to reach. A suction lying on the bilge floor
      will lose prime with useful water still in the compartment.`,
    trap: `A pump that has lost prime sounds like it is working. Confirm with the level, not the noise.`,
    see: ['instrument:portable_pump', 'display:auxiliary_bilge'],
  },

  'fitting:comms': {
    kind: 'Fitting', title: '7MC Announcing Circuit',
    oneLine: 'A handset on the bulkhead: how a casualty in this compartment becomes the ship\'s problem.',
    how: `A dedicated wired circuit with its own amplifier and speakers, deliberately separate from the
      telephone system so that it survives when other things do not. It is one-to-many: you report, Control
      hears, and so does everyone else — which is the point, because damage control is a whole-ship
      response and rumour is the alternative.`,
    numbers: [
      ['what, where, what you are doing', 'the report. In that order, in one breath.'],
      ['seconds', 'how long a good report takes, and how much earlier it starts the response.'],
    ],
    read: `Report early with an incomplete picture rather than late with a tidy one. Control can start
      pumps, shift the load and change depth while you are still finding the hole.`,
    trap: `Fixing it yourself and reporting afterwards is the classic error. The ship needed to change depth
      five minutes ago and only Control can do that.`,
    see: ['station:dc_board', 'station:control'],
  },

  'fitting:bunk': {
    kind: 'Fitting', title: 'Your Bunk',
    oneLine: 'Six hours off the watch bill — the maintenance interval for the instrument doing all the reasoning.',
    how: `Sleep is when memory is consolidated and when the adenosine that has been accumulating all day is
      cleared. Losing it degrades reaction time, working memory and risk judgement in a graded way, and
      crucially the self-assessment goes first: a tired watchstander rates their own performance as normal.
      Submarine watch rotations often do not match a 24-hour day, which makes the debt easy to build.`,
    numbers: [
      ['6 hours', 'one sleep period here.'],
      ['18 hours awake', 'measurable impairment.'],
      ['20+ hours awake', 'the view itself starts to go. That is the game showing you what you cannot self-report.'],
    ],
    read: `Turn in before a casualty, not after. You do not get to choose when the next one happens, and
      the reasoning it demands is exactly what fatigue takes away first.`,
    trap: `You cannot sleep through an active casualty, so "I will rest when this is over" is how a
      twenty-hour watch happens.`,
    see: ['display:plan_of_day', 'station:study_desk'],
  },
};

export const SCIENCE_NOTES = { ...INSTRUMENTS, ...STATIONS, ...DISPLAYS, ...FITTINGS };

/* Per-valve and per-panel notes: the generic entry, specialised with what this
 * particular fitting isolates. Written from VALVES so a new valve cannot be added
 * to the simulation without an explanation appearing with it. */
for (const [id, v] of Object.entries(VALVES)) {
  SCIENCE_NOTES[`valve:${id}`] = {
    ...FITTINGS['valve:generic'],
    title: v.label || id.replace(/_/g, ' '),
    oneLine: `${v.feeds} Everything about hand valves applies here — this entry adds what THIS valve isolates.`,
    numbers: [
      ['what it feeds', v.feeds],
      ['what you lose by shutting it', (v.dependents || []).join('; ') || 'nothing else on this boat'],
      ...FITTINGS['valve:generic'].numbers,
    ],
  };
}

SCIENCE_NOTES['panel:fwd_power_2f'] = {
  ...FITTINGS['panel:generic'],
  title: 'Forward Power Panel 2F',
  oneLine: `The forward compartment's 120 V panel, with its cable gland ${PANEL_THREAT_CM} cm above the bilge floor.`,
};

/**
 * Which entry belongs to a thing the player is looking at. `type` and `id` are the
 * interactable's own fields, so this is the single place that knows how world
 * objects map onto explanations.
 */
export function resolveScienceKey(type, id) {
  if (!type) return null;
  const direct = {
    instrument: `instrument:${id}`,
    station: `station:${id}`,
    valve: `valve:${id}`,
    panel: `panel:${id}`,
    locker: 'station:dc_locker',
    hatch: 'fitting:hatch',
    deckplate: 'fitting:deckplate',
    rupture: 'fitting:rupture',
    sump: 'fitting:sump',
    comms: 'fitting:comms',
    bunk: 'fitting:bunk',
    display: `display:${String(id).replace(/^display_/, '')}`,
  }[type];
  if (direct && SCIENCE_NOTES[direct]) return direct;
  // Fall back to the family entry, so a new valve or panel is still explained.
  const family = { valve: 'valve:generic', panel: 'panel:generic' }[type];
  return family && SCIENCE_NOTES[family] ? family : null;
}

/** Everything, grouped for the browsable index. */
export function scienceIndex() {
  const groups = new Map();
  for (const [key, entry] of Object.entries(SCIENCE_NOTES)) {
    const g = groups.get(entry.kind) || [];
    g.push({ key, title: entry.title, oneLine: entry.oneLine });
    groups.set(entry.kind, g);
  }
  for (const g of groups.values()) g.sort((a, b) => a.title.localeCompare(b.title));
  return ['Instrument', 'Station', 'Display', 'Fitting']
    .filter((k) => groups.has(k))
    .map((k) => ({ kind: k, items: groups.get(k) }));
}

export function scienceEntry(key) {
  return SCIENCE_NOTES[key] || null;
}
