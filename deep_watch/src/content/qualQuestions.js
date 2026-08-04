/**
 * Qualification questions — the written half of qualifying on the boat.
 *
 * Three are posted at the desk each patrol day. They are not trivia: every one
 * asks about a piece of reasoning the boat has already made the player do, and
 * the explanation names the concept afterwards rather than before. That is the
 * spec's teaching order — experience first, term second.
 *
 * The `from` field says which system or mission the question is drawn from, so a
 * question can never test something the player has had no chance to meet.
 */
export const QUAL_QUESTIONS = [
  // ---- Day 1: the boat itself ----
  {
    id: 'q_hatch', from: 'Boat Walkdown',
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
    id: 'q_selfnoise', from: 'Sonar / Machinery',
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
    id: 'q_evidence', from: 'Instruments',
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
    id: 'q_relbearing', from: 'Contact in the Noise',
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
    id: 'q_chains', from: 'Contact in the Noise',
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
    id: 'q_unknown', from: 'Contact in the Noise',
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
    id: 'q_dr', from: 'Position Without a Trusted Fix',
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
    id: 'q_falsefix', from: 'Position Without a Trusted Fix',
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
    id: 'q_ring', from: 'Position Without a Trusted Fix',
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
    id: 'q_patch', from: 'Forward Flooding',
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
    id: 'q_isolate', from: 'Forward Flooding',
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
    id: 'q_pumps', from: 'Forward Flooding',
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
    id: 'q_dependents', from: 'Forward Flooding',
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
    id: 'q_verify', from: 'Forward Flooding',
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
    id: 'q_fatigue', from: 'The watch',
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
    id: 'q_transit', from: 'Passage',
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
    id: 'q_emcon', from: 'Silent Passage',
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
    id: 'q_boundaries', from: 'Damage control',
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
