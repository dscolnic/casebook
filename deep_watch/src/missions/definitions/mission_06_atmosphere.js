import { CO2_UNCOMFORTABLE, CO2_ROUTINE } from '../../simulation/AtmosphereSystem.js';

/**
 * Mission 6 — Atmosphere Degradation (Unit II: Keep the Boat Alive).
 *
 * Two compartments look wrong on the board, and they are wrong in opposite ways.
 * That pairing is the mission:
 *
 *   BERTHING     six people, a damper somebody shut during a drill, and CO₂ well
 *                over 1 % — while its installed sensor sits frozen at the value it
 *                had when it died, reporting a perfectly normal compartment. The
 *                board says fine. The people say headache. The board is wrong.
 *   RADIO ROOM   air that is genuinely fine, and a sensor biased high enough to
 *                look like a casualty. The board says bad. The air is fine.
 *
 * Only a handheld reading can separate them, because it is the one measurement
 * that does not come from the installed sensing layer. Calling a sensor fault on
 * the compartment that is really going bad leaves people breathing it, so that
 * error is allowed, and its consequence is the air itself.
 *
 * The cause is upstream of both: shut the damper and that compartment leaves the
 * ventilation loop, so the scrubber never sees its air. Tracing that is the
 * difference between treating a symptom and finding a fault.
 *
 * Source games transformed here:
 *   Diagnosis (`nc_flooding_diag`) — a cause has to explain every compartment,
 *             including the ones reading normal.
 *   Casebook  (`nc_greywake_case`) — an installed indication and its repeat are
 *             one witness; independence has to come from a different chain.
 *   Ballpark  (`nc_bp_depth`) — how long a sealed compartment takes to go bad,
 *             from the number of people in it.
 *
 * Six objectives.
 */

const BAD = 'berthing_mess';       // real degradation, lying sensor
const FALSE_ALARM = 'radio_room';  // fine air, biased sensor

export const mission06Atmosphere = {
  id: 'mission_06_atmosphere',
  title: 'Atmosphere Degradation',
  unit: 2,
  startLocation: 'control_room',
  sourceGames: ['Diagnosis', 'Casebook', 'Ballpark'],
  sourceIds: ['nc_flooding_diag', 'nc_greywake_case', 'nc_bp_depth'],
  learningObjectives: [
    'Treat a crew symptom as evidence about the air, not about the crew.',
    'Measure several compartments rather than trusting one ship-wide number.',
    'Tell a failed sensor from a real degradation, using a measurement that does not share the sensor.',
    'Trace an atmosphere problem upstream to the ventilation lineup that caused it.',
    'Verify a recovery over time instead of at the moment you fixed it.',
  ],

  onStart(rt) {
    const { state, atmosphere } = rt;
    state.depth = 70;
    state.orderedDepth = 70;
    state.speed = 4;
    state.atmosphereCalls = {};

    // Freeze the berthing sensor FIRST, while the air is still good — that is what
    // makes it lie convincingly afterwards.
    atmosphere.failSensor(BAD, { frozen: true });
    // Then shut the damper and let the compartment go bad: six people, no scrubber.
    atmosphere.setDamper(BAD, false);
    Object.assign(atmosphere.air(BAD), { co2: 1.45, o2: 20.1, co: 0, smoke: 0, tempC: 26 });
    // And a false alarm elsewhere: good air, bad instrument.
    atmosphere.failSensor(FALSE_ALARM, { bias: { co2: 0.95 } });

    const f = rt.flags;
    f.measured = new Set();
    rt.subscribe('instrument:measured', (m) => {
      if (m.instrument === 'gas_detector' && m.valid !== false) f.measured.add(m.compartment);
    });
    rt.subscribe('atmosphere:called', (p) => {
      f.calls = { ...(f.calls || {}), [p.compartment]: p };
      if (!p.correct) f.badCalls = (f.badCalls || 0) + 1;
      if (!p.measured) f.unmeasuredCalls = (f.unmeasuredCalls || 0) + 1;
    });
    rt.subscribe('atmosphere:damper', (p) => { if (p.compartment === BAD && p.open) f.damperOpened = true; });

    rt.toast('Atmosphere',
      'The messenger reports two hands in berthing with headaches and one of them unsteady on his feet. The atmosphere board in Machinery Control shows nothing wrong there.');
  },

  stages: [
    {
      id: 'symptoms',
      target: { compartment: BAD },
      label: 'The people',
      objective: 'Go to Berthing and see for yourself. A crew symptom is evidence about the air — take a gas-detector reading where the people actually are (draw one from a DC locker if you are not carrying it).',
      hints: [
        'There is a gas detector in DC Locker 0 in Control and in DC Locker 3 aft.',
        'Select it with [ and ], then press F in the compartment you are standing in.',
        'Headache and poor coordination with no other cause is a CO₂ symptom long before anybody falls over.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'carry a gas detector', done: (r) => r.inventory.has('gas_detector'), on: ['inventory:added', 'locker:taken'] },
        { label: 'take a reading in Berthing, where the symptoms are',
          done: (r) => r.flags.measured.has(BAD), on: ['instrument:measured'] },
      ], {
        note: `CO₂ over ${CO2_UNCOMFORTABLE} % in a compartment the board says is normal. The people were the accurate instrument.`,
      })(rt),
    },

    {
      id: 'survey',
      target: { interactable: 'atmosphere_control', compartment: 'machinery_control' },
      label: 'Survey the boat',
      objective: 'One compartment is not a picture. Measure the air by hand in at least four compartments, including the radio room, so you know which spaces are actually affected.',
      hints: [
        'Walk the boat and press F in each compartment. The reading is of the air where you are standing.',
        'Include the compartments the board is NOT complaining about — a cause has to explain those too.',
        'The radio room is the one the board is most worried about. Go and see.',
      ],
      arm: (rt) => rt.checklist([
        { label: (r) => `measure at least four compartments (${r.flags.measured.size} so far)`,
          done: (r) => r.flags.measured.size >= 4, on: ['instrument:measured'] },
        { label: 'measure the radio room, which the board says is bad',
          done: (r) => r.flags.measured.has(FALSE_ALARM), on: ['instrument:measured'] },
      ], {
        note: 'Two disagreements, in opposite directions: berthing is bad and reads fine, the radio room is fine and reads bad.',
      })(rt),
    },

    {
      id: 'call_them',
      target: { interactable: 'atmosphere_control', compartment: 'machinery_control' },
      label: 'Sensor or air?',
      objective: 'At Atmosphere & Ventilation Control, call both disagreements: which compartment has bad air, and which has a bad sensor. They need opposite responses.',
      hints: [
        'The board shows the installed reading beside your own handheld figure for each compartment.',
        'A frozen sensor reports a perfectly ordinary number for ever. That is what makes it dangerous.',
        'Calling a sensor fault where the air is genuinely bad leaves people breathing it.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'call Berthing correctly',
          done: (r) => r.flags.calls?.[BAD]?.correct && r.flags.calls[BAD].kind === 'real',
          on: ['atmosphere:called'] },
        { label: 'call the radio room correctly',
          done: (r) => r.flags.calls?.[FALSE_ALARM]?.correct && r.flags.calls[FALSE_ALARM].kind === 'sensor',
          on: ['atmosphere:called'] },
      ], {
        note: 'Berthing: real, and the sensor is frozen. Radio: a sensor reading high on perfectly good air. One is a ventilation job, the other is a work order.',
      })(rt),
    },

    {
      id: 'trace',
      target: { interactable: 'damper_berthing_mess', compartment: BAD },
      label: 'Trace it',
      objective: 'Find why that compartment went bad while the rest of the boat did not: check the ventilation lineup, find the compartment that is shut out of it, and open its damper.',
      hints: [
        'The board lists every compartment\'s damper. One of them is shut.',
        'A shut damper means the scrubber never sees that compartment\'s air, however well it is running.',
        'The damper itself is in the compartment, high on the starboard side.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'open the damper on the compartment that was shut out',
          done: (r) => !!r.flags.damperOpened || r.state.ventDampers[BAD] === 'open',
          on: ['atmosphere:damper'] },
      ], {
        note: 'That is the cause: six people sealed off from the ventilation loop. Nothing was broken — a boundary was left shut.',
      })(rt),
    },

    {
      id: 'restore',
      target: { interactable: 'atmosphere_control', compartment: 'machinery_control' },
      label: 'Restore',
      objective: 'Line the ventilation up to fix it: supply fan running, CO₂ scrubber running, and the affected compartment back in the loop.',
      hints: [
        'The scrubber only takes CO₂ out of air the fans actually move.',
        'Check the O₂ generator too — the compartment has been consuming oxygen with nothing replacing it.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'supply fan running', done: (r) => !!r.state.ventilationRoutes.supply, on: ['atmosphere:route'] },
        { label: 'CO₂ scrubber running', done: (r) => !!r.state.ventilationRoutes.scrubber, on: ['atmosphere:route'] },
        { label: 'the affected compartment back in the ventilation loop',
          done: (r) => r.state.ventDampers[BAD] === 'open', on: ['atmosphere:damper'] },
      ], {
        note: 'Lined up. Now it is a question of time — the air does not come back the moment you throw a switch.',
      })(rt),
    },

    {
      id: 'verify',
      target: { compartment: BAD },
      label: 'Verify over time',
      objective: `Prove the recovery rather than assuming it: wait, then measure Berthing by hand again and show CO₂ back under ${CO2_ROUTINE} %.`,
      hints: [
        'Scrubbing a compartment takes minutes, not seconds. Do something else and come back.',
        'Measure it by hand: the installed sensor in there is still the one that lied to you.',
        'A recovery you did not measure is a recovery you are guessing at.',
      ],
      arm: (rt) => rt.checklist([
        { label: `Berthing measured by hand, under ${CO2_ROUTINE} % CO₂`,
          done: (r) => {
            const last = (r.instruments.lastReadings || [])
              .filter((x) => x.instrument === 'gas_detector' && x.compartment === BAD).slice(-1)[0];
            return !!last && (r.atmosphere.air(BAD)?.co2 ?? 9) < CO2_ROUTINE && last.numeric < CO2_ROUTINE;
          },
          on: ['instrument:measured'] },
      ], {
        note: 'Under half a per cent and falling, measured by hand in the compartment that was bad. That is a recovery; the number on the board in there still is not.',
        pollMs: 900,
      })(rt),
    },
  ],

  scoring: (rt) => {
    const f = rt.flags;
    let score = 0;
    const parts = [];
    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    add('Went and looked', f.measured.has(BAD) ? 15 : 5, 15,
      f.measured.has(BAD) ? 'Measured the air where the symptoms were.' : 'Never measured the compartment people were ill in.');

    const n = f.measured.size;
    add('Survey breadth', Math.min(20, n * 4), 20, `${n} compartment${n === 1 ? '' : 's'} measured by hand.`);

    const bad = f.badCalls || 0;
    add('Sensor versus air', Math.max(0, 30 - bad * 10), 30,
      bad ? `${bad} call${bad > 1 ? 's' : ''} that the evidence did not support.` : 'Both disagreements called correctly.');

    const unmeasured = f.unmeasuredCalls || 0;
    add('Evidence before the call', Math.max(0, 15 - unmeasured * 7), 15,
      unmeasured ? `${unmeasured} call${unmeasured > 1 ? 's' : ''} made without a handheld reading — judging the sensor by the sensor.`
        : 'Every call was backed by a measurement that did not come from the installed sensor.');

    add('Found the cause', f.damperOpened ? 20 : 6, 20,
      f.damperOpened ? 'Traced it upstream to the damper that was left shut.' : 'Treated the symptom without finding the lineup that caused it.');

    const hints = rt.hintsUsed || 0;
    const skipped = rt.skipped || 0;
    const penalty = Math.min(12, hints * 2 + skipped * 4);
    score -= penalty;
    parts.push({ label: 'Independence', got: -penalty, max: 0,
      why: [hints ? `${hints} hint${hints > 1 ? 's' : ''} taken` : null,
        skipped ? `${skipped} objective${skipped > 1 ? 's' : ''} skipped` : null].filter(Boolean).join('; ')
        || 'No hints taken, nothing skipped.' });

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
