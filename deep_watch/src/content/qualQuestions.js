/**
 * Qualification questions — the written half of qualifying on the boat.
 *
 * Three are posted at the desk each patrol day. They are not trivia: every one
 * asks about the science or the engineering of a specific piece of equipment the
 * player has handled, and the explanation names the concept afterwards rather
 * than before. That is the spec's teaching order — experience first, term second.
 *
 * The `from` field says which system or mission the question is drawn from, so a
 * question can never test something the player has had no chance to meet. The
 * `science` field links to the science-codex entry that explains the underlying
 * physics in full, so a wrong answer has somewhere to go.
 *
 * Order matters: `questionsAvailable(day)` posts them three at a time from the
 * top, so the instrument and sensor physics comes first — those are the tools the
 * player is holding from the first walkdown — and the mission-level reasoning
 * questions follow once the equipment makes sense.
 */
export const QUAL_QUESTIONS = [
  // ---- Instrument physics: what the tools in your hands actually measure ----
  {
    id: 'q_db_ratio', from: 'Acoustic Probe', science: 'instrument:acoustic_probe',
    q: 'The probe reads 52 dB in one compartment and 58 dB in the next. What does the 6 dB mean physically?',
    options: [
      'The second reading is 6 % louder',
      'The second reading is about twice the sound pressure of the first',
      'The second reading is six times louder',
      'Nothing — decibels are an arbitrary scale',
    ],
    answer: 1,
    why: 'A decibel is a ratio on a log scale: 20·log₁₀(pressure ratio). +6 dB is a doubling of pressure, +3 dB a doubling of power. That is why a "small" dB step is a big physical step.',
    concept: 'Decibels are logarithmic ratios',
  },
  {
    id: 'q_probe_structure', from: 'Acoustic Probe', science: 'instrument:acoustic_probe',
    q: 'The acoustic probe is pressed against a frame rather than held in the air. Why?',
    options: [
      'To keep it dry',
      'It measures structure-borne sound — vibration carried through the steel from the source',
      'Air readings are too loud to be useful',
      'It only works while touching a painted surface',
    ],
    answer: 1,
    why: 'Turbulent flow beats on the pipe wall, the pipe passes that into the structure, and the structure carries it through the boat. You are listening THROUGH the ship, which is why each bulkhead in between costs you about 1.5 dB.',
    concept: 'Structure-borne sound',
  },
  {
    id: 'q_probe_walk', from: 'Acoustic Probe', science: 'instrument:acoustic_probe',
    q: 'One acoustic reading of 61 dB, on its own, tells you…',
    options: [
      'how far away the source is',
      'very little — you need a second reading somewhere else to get a gradient',
      'the flow rate in m³/h',
      'which pipe has failed',
    ],
    answer: 1,
    why: 'There is no "correct" absolute level to compare against. What localises a source is the DIRECTION the level increases as you walk, which is why you take readings in several compartments.',
    concept: 'Gradient, not absolute value',
  },

  {
    id: 'q_tape_arith', from: 'Sounding Tape', science: 'instrument:sounding_tape',
    q: 'The forward bilge (plan area 11 m²) rises 1.5 cm/min. What is the inflow?',
    options: ['about 1.7 m³/h', 'about 9.9 m³/h', 'about 16.5 m³/h', 'about 99 m³/h'],
    answer: 1,
    why: '1.5 cm/min is 0.015 m/min. Times 11 m² is 0.165 m³/min, times 60 is 9.9 m³/h. Depth becomes volume through the plan area — a narrow bilge rises fast on very little water.',
    concept: 'Rate × area = volume flow',
  },
  {
    id: 'q_tape_independent', from: 'Sounding Tape', science: 'instrument:sounding_tape',
    q: 'The panel shows the bilge at 30 cm. Why bother with a weighted tape?',
    options: [
      'The tape is more precise',
      'The tape depends on no sensor, transmitter or power supply — a failed indication still shows a plausible number',
      'The panel only updates once a minute',
      'You need the tape to start the pump',
    ],
    answer: 1,
    why: 'Every remote level indication runs through a float, a transducer or a wire, and any of those can fail while still reading something believable. The tape depends on gravity and the fact that water is wet.',
    concept: 'Independent measurement',
  },
  {
    id: 'q_tape_interval', from: 'Sounding Tape', science: 'instrument:sounding_tape',
    q: 'Why must two soundings be separated in time before you divide them into a rate?',
    options: [
      'The tape needs to dry',
      'Over too short an interval the level has barely moved, so measurement error dominates the answer',
      'The bilge level oscillates on a fixed cycle',
      'It does not matter; any two readings work',
    ],
    answer: 1,
    why: 'A rate is a difference divided by an interval. Shrink both and you are dividing your own reading error by a small number — which magnifies it instead of averaging it out.',
    concept: 'Measurement error in a rate',
  },

  {
    id: 'q_orifice_depth', from: 'Damage Control', science: 'fitting:rupture',
    q: 'You are flooding through a fixed hole and you go from 30 m to 60 m. The flow…',
    options: [
      'stays the same — the hole has not changed',
      'goes up by about 41 % — flow follows the square root of the head',
      'doubles',
      'quadruples',
    ],
    answer: 1,
    why: 'Q = Cd·A·√(2gh). Double h and flow rises by √2 ≈ 1.41. Depth is a term in the flooding rate, which is why coming shallow is a damage-control action.',
    concept: 'Torricelli — flow follows √depth',
  },
  {
    id: 'q_orifice_area', from: 'Damage Control', science: 'station:dc_board',
    q: 'Your estimate of the hole diameter turns out to have been half the real size. Your flow estimate was wrong by a factor of…',
    options: ['2', '4', '1.4', 'it does not change the flow'],
    answer: 1,
    why: 'Flow goes as area, and area goes as diameter squared. Doubling the diameter quadruples the flow — which is why the hole estimate is the most sensitive input in the whole calculation.',
    concept: 'Area goes as diameter squared',
  },
  {
    id: 'q_cd', from: 'Damage Control', science: 'station:dc_board',
    q: 'The flooding equation uses a discharge coefficient of about 0.62. What is that for?',
    options: [
      'A safety margin for the estimate',
      'The jet contracts as it leaves the hole, so less flows than the hole area alone suggests',
      'Friction inside the pipe',
      'Correcting for seawater density',
    ],
    answer: 1,
    why: 'Streamlines cannot turn a sharp corner, so the jet necks down to about 62 % of the hole area. It is physics, not padding — and leaving it out overestimates the flooding by more than half.',
    concept: 'Discharge coefficient',
  },

  {
    id: 'q_pump_prime', from: 'Portable Pump', science: 'instrument:portable_pump',
    q: 'The portable pump stops moving water at about 4 cm of bilge, though the impeller is still turning. Why?',
    options: [
      'The strainer has blocked',
      'The suction is pulling air. A centrifugal pump works on water, and air has almost no mass to throw',
      'The discharge head is too high',
      'The motor has overloaded',
    ],
    answer: 1,
    why: 'It has lost prime. That is also why the suction goes in the sump — the deliberate low point that keeps it submerged as the level falls.',
    concept: 'Priming a centrifugal pump',
  },
  {
    id: 'q_pump_subtract', from: 'Portable Pump', science: 'instrument:portable_pump',
    q: 'Inflow is 48 m³/h and the pump moves 45 m³/h. The level is nearly steady. What is the correct reading of that?',
    options: [
      'You are winning slowly',
      'You are losing slowly, with no path to winning — and the next 10 m of depth makes it worse',
      'It is exactly balanced, so it is stable',
      'The estimate must be wrong',
    ],
    answer: 1,
    why: 'A near-flat level with a running pump means you are matched, not safe. Inflow grows with depth; pump capacity does not care about the situation at all. Only closing the boundary ends it.',
    concept: 'Removal versus inflow',
  },
  {
    id: 'q_cavitation_pump', from: 'Portable Pump', science: 'instrument:portable_pump',
    q: 'A pump suddenly gets noisy and the flow collapses. Most likely:',
    options: [
      'The bearings have failed',
      'It has cavitated or lost prime — vapour bubbles forming and collapsing at the impeller',
      'The discharge valve shut itself',
      'The motor is running backwards',
    ],
    answer: 1,
    why: 'If suction pressure falls below the vapour pressure of water, water boils at the impeller and the collapsing bubbles hammer the metal. Loud and useless is the signature.',
    concept: 'Cavitation',
  },

  {
    id: 'q_emissivity', from: 'IR Thermometer', science: 'instrument:ir_thermometer',
    q: 'You point the IR thermometer at bare polished stainless and get an implausibly low reading. Why?',
    options: [
      'The surface really is cold',
      'Low emissivity — a shiny surface radiates poorly and reflects the room instead',
      'The instrument needs recalibrating',
      'Stainless conducts heat away too fast',
    ],
    answer: 1,
    why: 'Emissivity is how efficiently a surface radiates: painted or oxidised steel is about 0.95 and reads true; polished metal can be 0.1 and reads far too cold. Aim at painted steel next to it.',
    concept: 'Emissivity',
  },
  {
    id: 'q_spot_ratio', from: 'IR Thermometer', science: 'instrument:ir_thermometer',
    q: 'At a 12:1 distance-to-spot ratio, standing 1.2 m back, you are measuring…',
    options: [
      'a pinpoint',
      'the average temperature of a circle about 10 cm across',
      'the whole cabinet face',
      'whatever is hottest in view',
    ],
    answer: 1,
    why: 'The optics average everything in the spot. Stand back far enough and a genuinely hot terminal gets averaged in with the cool panel around it and disappears.',
    concept: 'Distance-to-spot ratio',
  },
  {
    id: 'q_thermal_waterline', from: 'Thermal Camera', science: 'instrument:thermal_camera',
    q: 'A bulkhead shows a sharp horizontal boundary, cold below and warm above. That is…',
    options: [
      'a reflection',
      'the water level in the flooded space on the other side',
      'a weld seam',
      'insulation that has come loose',
    ],
    answer: 1,
    why: 'Water is a huge thermal mass at sea temperature and it holds the plating above it at that temperature. The line where it stops is the level — and you got it without opening the compartment.',
    concept: 'Thermal mass as an indicator',
  },

  {
    id: 'q_salinity', from: 'Salinity Probe', science: 'instrument:salinity_probe',
    q: 'The salinity probe reads 34 PSU in the bilge. What has that ruled out?',
    options: [
      'Nothing — all bilge water reads similar',
      'Every freshwater source. This is the sea, so it scales with depth and will not run out',
      'A ruptured seawater line',
      'That the level will keep rising',
    ],
    answer: 1,
    why: 'Open ocean is about 35 PSU; condensate and potable systems are near zero. Salt water means a sea connection, which behaves completely differently from a tank that can empty.',
    concept: 'Conductivity as source discrimination',
  },
  {
    id: 'q_megger', from: 'Multimeter', science: 'instrument:multimeter',
    q: 'A panel reads a healthy 120 V. What does that NOT tell you?',
    options: [
      'That the circuit is available',
      'Whether the insulation is still any good — that needs an insulation-resistance test',
      'Whether the breaker is closed',
      'Whether the bus is energized',
    ],
    answer: 1,
    why: 'Voltage says the supply is there. Rising damp and seawater drop insulation resistance to the hull long before anything trips, and the multimeter will read a cheerful 120 V the whole way down.',
    concept: 'Voltage versus insulation resistance',
  },
  {
    id: 'q_i2r', from: 'Electrical', science: 'display:distribution',
    q: 'A conductor is run 20 % over its rated current. How much more heat is it making?',
    options: ['20 % more', 'about 44 % more', 'twice as much', 'no more — heat depends on voltage'],
    answer: 1,
    why: 'Heating goes as current squared (I²R). 1.2² = 1.44, so a 20 % overload is a 44 % heating increase. Small overloads are not small.',
    concept: 'I²R heating',
  },

  {
    id: 'q_bladerate', from: 'Vibration Meter', science: 'display:narrowband',
    q: 'A five-bladed propeller turns at 120 rpm. Where is the blade-rate line?',
    options: ['2 Hz', '10 Hz', '120 Hz', '600 Hz'],
    answer: 1,
    why: 'Blade rate = blades × rpm ÷ 60 = 5 × 2 = 10 Hz. Harmonics land at 20, 30, 40 Hz. Exact multiples of a rotation are the signature of a machine rather than of the sea.',
    concept: 'Blade rate and harmonics',
  },
  {
    id: 'q_vib_units', from: 'Vibration Meter', science: 'instrument:vibration_meter',
    q: 'The vibration meter reads in mm/s rather than in displacement. Why?',
    options: [
      'It is easier to measure',
      'Velocity is roughly proportional to the energy the machine puts into its structure across a wide frequency band, so one number compares different machines',
      'Displacement cannot be measured on a running machine',
      'Because vibration is always sinusoidal',
    ],
    answer: 1,
    why: 'That is the reason the ISO machinery bands are written in mm/s: it makes a big slow pump and a small fast one comparable. It also means the same displacement at twice the frequency reads twice as high.',
    concept: 'Velocity as a severity measure',
  },
  {
    id: 'q_flow_vs_tone', from: 'Vibration Meter', science: 'instrument:vibration_meter',
    q: 'In a machinery space you find broadband hiss with no dominant tone. That points to…',
    options: [
      'a failing bearing',
      'flow — water moving where it should not be, rather than a rotating machine',
      'electrical noise',
      'an imbalance at shaft rate',
    ],
    answer: 1,
    why: 'Machinery makes discrete tones at multiples of rotation. Turbulent flow makes broadband noise with no line structure — which is exactly how a flooding source hides inside a noisy compartment.',
    concept: 'Tonal versus broadband sources',
  },

  {
    id: 'q_beamform', from: 'Sonar', science: 'station:sonar',
    q: 'How does a line of hydrophones work out which DIRECTION a sound came from?',
    options: [
      'The loudest hydrophone points at it',
      'Each signal is delayed by the time sound needs to cross the array, then added — one direction reinforces and the rest partly cancel',
      'It compares the frequency at each end of the array',
      'By transmitting a pulse and timing the echo',
    ],
    answer: 1,
    why: 'Delay-and-sum beamforming. Do it for every bearing at once and you have the waterfall — and nothing was transmitted, so nobody knows you listened.',
    concept: 'Beamforming',
  },
  {
    id: 'q_spreading', from: 'Sonar', science: 'station:sonar',
    q: 'A contact doubles its range from you. Under spherical spreading, the received level drops by…',
    options: ['3 dB', '6 dB', '12 dB', '20 dB'],
    answer: 1,
    why: 'Transmission loss goes as 20·log₁₀(range), and 20·log₁₀(2) ≈ 6 dB. So received level says as much about range as about how loud the contact is — which is why loud does not mean close.',
    concept: 'Spreading loss',
  },
  {
    id: 'q_harmonic_family', from: 'Sonar', science: 'display:narrowband',
    q: 'The narrowband analyser shows lines at 41, 82, 123 and 164 Hz. What is that?',
    options: [
      'Four separate contacts',
      'One machine — a 41 Hz fundamental with its harmonics, which is why the spacing is constant',
      'Biological noise',
      'Instrument interference',
    ],
    answer: 1,
    why: 'Evenly spaced lines are a harmonic family: the same event repeating exactly once per rotation. Machines do that; the sea and biology do not.',
    concept: 'Harmonic family',
  },

  {
    id: 'q_bar_per_10m', from: 'Pressure Gauge', science: 'instrument:pressure_gauge',
    q: 'You are at 60 m. Roughly how much pressure is the sea putting on the hull, above the inside?',
    options: ['0.6 bar', '6 bar', '60 bar', 'It depends on speed'],
    answer: 1,
    why: 'p = ρgh with seawater at about 1025 kg/m³ gives roughly 1 bar per 10 m. Which is also why a depth gauge is really a pressure gauge with a different scale printed on it.',
    concept: 'Hydrostatic pressure',
  },
  {
    id: 'q_gauge_position', from: 'Pressure Gauge', science: 'instrument:pressure_gauge',
    q: 'Pressure upstream of a valve, none downstream. What have you proved?',
    options: [
      'Nothing — gauges lag',
      'That the valve is actually holding, whatever its handwheel says',
      'That the line is drained',
      'That the leak has stopped',
    ],
    answer: 1,
    why: 'A differential across a shut valve is the direct evidence that the boundary exists. Equal pressure both sides means it is passing, however far the handwheel was wound.',
    concept: 'Verifying an isolation',
  },
  {
    id: 'q_o2_limit', from: 'Gas Detector', science: 'instrument:gas_detector',
    q: 'Which number on the gas detector is the recognised oxygen-deficiency threshold?',
    options: ['20.9 %', '19.5 %', '16 %', '4 %'],
    answer: 1,
    why: '20.9 % is normal air; 19.5 % is the deficiency threshold; 4 % is the lower explosive limit for hydrogen, which is a battery question, not a breathing one. Judgement degrades before you notice it.',
    concept: 'Atmosphere limits',
  },
  {
    id: 'q_patch_physics', from: 'Damage Control', science: 'instrument:soft_patch',
    q: 'Physically, why does a clamp hold sea pressure where a soft patch and banding do not?',
    options: [
      'The clamp is made of steel',
      'The gasket is captured on all sides and bolts generate far more force than banding, so nothing can extrude',
      'The clamp is bonded to the pipe',
      'The patch is only rated for fresh water',
    ],
    answer: 1,
    why: 'The soft patch is held by friction on rubber; put sea pressure behind it and the rubber extrudes out from under the band. The clamp puts the load through steel with the gasket trapped.',
    concept: 'Why a repair holds',
  },

  // ---- The boat itself ----
  {
    id: 'q_hatch', from: 'Boat Walkdown', science: 'fitting:hatch',
    q: 'You are in the forward equipment space and need to reach Machinery Control. Which is true?',
    options: [
      'Every compartment connects directly to every other',
      'You pass aft through the compartments in order, operating a hatch at each bulkhead',
      'The escape trunks are the normal route between compartments',
      'Machinery Control can only be reached from the control room',
    ],
    answer: 1,
    why: 'The boat is a line of compartments, bow to stern, separated by watertight bulkheads with one hatch each. That layout is also why a casualty can be BOUNDED — you can shut a compartment off.',
    concept: 'Watertight subdivision',
  },
  {
    id: 'q_selfnoise', from: 'Sonar / Machinery', science: 'station:sonar',
    q: 'You start a second pump. What happens to what sonar can hear?',
    options: [
      'Nothing — pumps are inside the hull',
      'The noise floor rises about 3 dB and the weakest contacts disappear',
      'Contacts get louder because the boat is more active',
      'Only active sonar is affected',
    ],
    answer: 1,
    why: 'Your own machinery sets the floor that everything else has to be heard above. Roughly 3 dB per running pump — which is often the difference between holding a faint contact and losing it.',
    concept: 'Self-noise and masking',
  },
  {
    id: 'q_evidence', from: 'Instruments', science: 'station:dc_board',
    q: 'An instrument in this game reports…',
    options: [
      'the fault, once you point it at the right thing',
      'evidence — a physical quantity you still have to interpret',
      'whether you are doing the mission correctly',
      'the next objective',
    ],
    answer: 1,
    why: 'Nothing aboard names a fault for you. A probe gives a sound level, a tape gives a depth, a gauge gives a pressure. The diagnosis is yours.',
    concept: 'Evidence versus answers',
  },

  // ---- Day 2: sonar ----
  {
    id: 'q_relbearing', from: 'Contact in the Noise', science: 'display:btr',
    q: 'A broadband source holds exactly the same RELATIVE bearing while own-ship turns 20°. What is it?',
    options: [
      'A contact steering a parallel course',
      'Something aboard your own boat',
      'A contact closing on a steady bearing',
      'A biologic',
    ],
    answer: 1,
    why: 'Nothing in the water can hold a relative bearing through your own turn. Only a source bolted to your hull turns with you.',
    concept: 'Relative versus true bearing',
  },
  {
    id: 'q_chains', from: 'Contact in the Noise', science: 'station:sonar',
    q: 'The broadband waterfall and the auto-detect list agree on a contact. How much does that agreement prove?',
    options: [
      'Two independent displays agree, so the call is solid',
      'Nothing much — both are fed by the same beamformer',
      'It proves the contact is real but not its class',
      'It doubles the confidence',
    ],
    answer: 1,
    why: 'They are one measurement rendered twice. If the beamformer is wrong they are wrong together. Corroboration needs a different chain — the narrowband analyser, or your own manoeuvre.',
    concept: 'Common-mode error',
  },
  {
    id: 'q_unknown', from: 'Contact in the Noise', science: 'display:narrowband',
    q: 'The narrowband analyser shows one uncertain line on a faint contact. The right call is:',
    options: [
      'Whichever class that frequency usually belongs to',
      'Unknown — the signature will not support a classification',
      'Merchant, since most contacts are merchants',
      'Biologic, since it is faint',
    ],
    answer: 1,
    why: 'One line is not a family. A watch that guesses is a watch nobody downstream can use; "unknown" is a real, useful answer.',
    concept: 'Calibrated confidence',
  },

  // ---- Day 3: navigation ----
  {
    id: 'q_dr', from: 'Position Without a Trusted Fix', science: 'station:navigation',
    q: 'A dead-reckoned position is worked from…',
    options: [
      'course and speed only',
      'course, speed, and the current',
      'the inertial navigator',
      'the last three fixes averaged',
    ],
    answer: 0,
    why: 'That is exactly the gap. Dead reckoning knows where you pointed the boat and how fast — not what the water did to you underneath.',
    concept: 'Dead reckoning',
  },
  {
    id: 'q_falsefix', from: 'Position Without a Trusted Fix', science: 'station:navigation',
    q: 'You take a fix from the electronic plot repeat. The uncertainty ring shrinks and the position does not move. Why?',
    options: [
      'The fix confirmed the plot was already right',
      'The repeat is fed by the same inertial unit as the plot, so it cannot check it',
      'The ring always shrinks after any fix',
      'The fix failed',
    ],
    answer: 1,
    why: 'You measured the same source twice and told yourself you were more certain. Precision went up; accuracy did not move.',
    concept: 'Precision versus accuracy',
  },
  {
    id: 'q_ring', from: 'Position Without a Trusted Fix', science: 'display:nav_chart',
    q: 'Your position ring is 1.5 nm and the bank ahead shoals about 95 m per nautical mile. What does the ring mean for the route?',
    options: [
      'Nothing — the charted depth is the charted depth',
      'You could have roughly 140 m less water than the chart promises',
      'It only matters on the surface',
      'It means the chart is wrong',
    ],
    answer: 1,
    why: 'A position uncertainty on shoaling ground converts straight into water you might not have. Pick the route that survives being at the WORST edge of the ring.',
    concept: 'Uncertainty as clearance',
  },

  // ---- Day 4: damage control ----
  {
    id: 'q_patch', from: 'Forward Flooding', science: 'instrument:soft_patch',
    q: 'Why will a soft patch not hold on a ruptured seawater line that is still lined up to the sea?',
    options: [
      'Soft patches are only for fresh water',
      'Sea pressure behind the hole lifts it straight off',
      'It needs to dry first',
      'It will hold, but only below 30 metres',
    ],
    answer: 1,
    why: 'You are working against full sea pressure. Isolate the branch at both ends first — a patch seals a dead line, it does not fight one.',
    concept: 'Isolate, then repair',
  },
  {
    id: 'q_isolate', from: 'Forward Flooding', science: 'valve:generic',
    q: 'You shut one of the two valves bounding a ruptured branch. What happens?',
    options: [
      'The flooding stops',
      'The flow eases but continues — the branch is still open to the sea at the other end',
      'The flow doubles',
      'Nothing at all',
    ],
    answer: 1,
    why: 'A branch is isolated only when it is shut at BOTH ends. One valve leaves a path.',
    concept: 'Two-sided isolation',
  },
  {
    id: 'q_pumps', from: 'Forward Flooding', science: 'instrument:portable_pump',
    q: 'Inflow is about 48 m³/h and you have 45 m³/h of pumping. What does that tell you?',
    options: [
      'Keep pumping; you will win eventually',
      'Pumping buys time but cannot fix it — the source has to be stopped',
      'Add the after bilge pump and the numbers work',
      'The estimate must be wrong',
    ],
    answer: 1,
    why: 'That subtraction is the whole decision. Dewatering is a holding action; the casualty ends when the hole does.',
    concept: 'Rate estimation drives the plan',
  },

  // ---- Day 5: consequences ----
  {
    id: 'q_dependents', from: 'Forward Flooding', science: 'valve:fwd_sw_supply_inbd',
    q: 'Shutting the forward seawater supply header also secures…',
    options: [
      'nothing else',
      'cooling water to the sonar-array electronics',
      'the trim system',
      'the after bilge pump',
    ],
    answer: 1,
    why: 'Every isolation takes something else with it. Knowing what BEFORE you shut the valve is the difference between a controlled action and a surprise.',
    concept: 'Dependent systems',
  },
  {
    id: 'q_verify', from: 'Forward Flooding', science: 'display:fwd_dc_status',
    q: 'The bilge level is falling. Is the casualty over?',
    options: [
      'Yes — falling water is the definition of fixed',
      'Not until it is verified somewhere else as well: trim at control, noise at sonar',
      'Yes, once the pump is secured',
      'Only the plotting board can say',
    ],
    answer: 1,
    why: 'One indication can be a lying indication. Verification means the same recovery showing up in independent places.',
    concept: 'Cross-compartment verification',
  },
  {
    id: 'q_fatigue', from: 'The watch', science: 'fitting:bunk',
    q: 'You have been awake 22 hours and there is no casualty in progress. The professional move is:',
    options: [
      'Push on — you feel fine',
      'Sleep now, while the boat is quiet',
      'Sleep only after the next event',
      'Drink coffee and stand another watch',
    ],
    answer: 1,
    why: 'Rest is a resource you spend on purpose. Taken before it is needed it costs nothing; taken after, it was already too late.',
    concept: 'Fatigue management',
  },

  // ---- Day 6: the passage ----
  {
    id: 'q_transit', from: 'Passage', science: 'station:passage_chart',
    q: 'The crossing is about 12 000 nm. Why is the planned transit speed only around 4 knots?',
    options: [
      'The boat cannot go faster submerged',
      'Speed is noise — a fast transit is a loud one',
      'To save fuel',
      'Because of the current',
    ],
    answer: 1,
    why: 'Shaft rpm is the biggest term in the noise floor. Every knot you add gets you there sooner and announces you further. That trade is the whole of transit planning.',
    concept: 'Speed versus discretion',
  },
  {
    id: 'q_emcon', from: 'Silent Passage', science: 'station:radio',
    q: 'Transmitting on the radio costs you…',
    options: [
      'nothing, it is a receiver',
      'exposure — an emission somebody else can hear',
      'battery only',
      'depth control',
    ],
    answer: 1,
    why: 'Receiving is free; transmitting is not. Weigh the message against being located.',
    concept: 'Emissions control',
  },
  {
    id: 'q_boundaries', from: 'Damage control', science: 'panel:fwd_power_2f',
    q: 'Water reaches 45 cm in the forward space and the power panel there is still energized. What happens?',
    options: [
      'Nothing, the panel is sealed',
      'It grounds out and trips, taking the pump it was feeding with it',
      'The lights get brighter',
      'The water is pumped out automatically',
    ],
    answer: 1,
    why: 'Electrical boundaries are set BEFORE the water arrives. Secure it in time and you lose one pump on your terms; leave it and you lose the pump and the panel on the water\'s terms.',
    concept: 'Electrical boundaries',
  },
];

/** Three questions become available each patrol day. */
export const PER_DAY = 3;

export function questionsAvailable(day) {
  return QUAL_QUESTIONS.slice(0, Math.min(QUAL_QUESTIONS.length, day * PER_DAY));
}

export function totalDaysOfQuestions() {
  return Math.ceil(QUAL_QUESTIONS.length / PER_DAY);
}
