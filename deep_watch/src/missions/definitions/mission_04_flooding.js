import { BILGE_AREA, PANEL_THREAT_CM } from '../../simulation/FloodingSystem.js';
import { InstrumentManager, SOUNDING_INTERVAL_MIN } from '../../instruments/InstrumentManager.js';

/**
 * Mission 4 — Forward Flooding (Unit II: Keep the Boat Alive).
 *
 * The canonical full-loop mission. It follows the spec's causal structure exactly:
 *
 *   symptom in sonar → control-room evidence → instrument choice → spatial
 *   acoustic trace → physical discovery under a deck plate → estimate →
 *   report / boundaries / isolate / patch / dewater / protect electrics →
 *   verification in more than one compartment → notebook reconstruction.
 *
 * Source games transformed here:
 *   Diagnosis  (navy_course_package/diagnosis/nc_flooding_playable.html,
 *               pack `nc_flooding_diag`) — the candidate faults and the discipline
 *               of explaining every reading, including the calm ones. Distributed
 *               across sonar, control, the manifold, and the bilge instead of one panel.
 *   Ballpark   (ballpark.html, `nc_bp_depth`) — inflow from a measured rise and from
 *               head × hole area, against the pump capacity you actually have.
 *   Protocol   (protocol.html, `nc_fire_protocol`) — order-sensitive physical
 *               procedure with decoy gear that fails through system behaviour.
 *   Sequence   (sequence.html, `nc_sonar_path`) — tracing a physical chain: sea →
 *               outboard valve → rupture → inboard valve → header → what depends on it.
 *   Casebook   (casebook_static.html, `nc_greywake_case`) — the bilge alarm and its
 *               repeat are one sensor, not two independent witnesses.
 *
 * SEVEN pieces of work, nine objectives. The mission used to post nineteen, one per
 * physical action, which read as a wizard: the player was walked through a list
 * instead of handling a casualty. Each objective is now a piece of work with a
 * checklist inside it — the HUD names exactly what is still outstanding, so the
 * card is shorter without hiding anything. Nothing was cut; the beats are the
 * same, grouped the way a watchstander would actually think about them.
 *
 * Nothing in the mission moves the player or fixes anything for them. Every stage
 * completes because a physical fact became true in `SubmarineState`.
 */

const FWD = 'forward_equipment';

/** Readings this mission counts, pulled straight from the instrument log. */
const soundings = (rt) => rt.instruments.readingsTagged('sounding').filter((r) => r.compartment === FWD);
const ratePair = (rt) => {
  const s = soundings(rt);
  return s.length >= 2 && (s[s.length - 1].minutes - s[0].minutes) >= SOUNDING_INTERVAL_MIN;
};

export const mission04Flooding = {
  id: 'mission_04_flooding',
  title: 'Forward Flooding',
  unit: 2,
  startLocation: 'sonar_room',
  sourceGames: ['Diagnosis', 'Ballpark', 'Protocol', 'Sequence', 'Casebook'],
  sourceIds: ['nc_flooding_diag', 'nc_bp_depth', 'nc_fire_protocol', 'nc_sonar_path', 'nc_greywake_case'],
  learningObjectives: [
    'Tell an onboard noise source from a contact in the water using relative bearing.',
    'Read a casualty across several compartments instead of one panel.',
    'Trace a sound to its source by measurement, not by being told.',
    'Estimate an inflow two independent ways and compare it with real pump capacity.',
    'Isolate a branch at both ends, knowing what else those valves feed.',
    'Understand why a patch will not hold on a pressurised line.',
    'Verify recovery in more than one place before believing it.',
  ],

  /** Seed the casualty. Called by the runtime before the first stage arms. */
  onStart(rt) {
    const { state, flooding, world } = rt;
    state.depth = 62;
    state.orderedDepth = 60;
    state.speed = 4;
    state.heading = 275;
    state.orderedHeading = 275;
    state.compensatedMass_t = 0;

    const opening = world.bilges.get(FWD);
    const pos = opening
      ? { x: opening.rupturePoint.x, z: opening.rupturePoint.z }
      : { x: 0.2, z: 4.3 };

    flooding.addSource({
      id: 'fwd_sw_rupture',
      compartment: FWD,
      kind: 'seawater_pipe',
      line: 'fwd_sw_supply',
      nominal_m3h: 48,
      refDepth: 60,
      boundedBy: ['fwd_sw_supply_inbd', 'fwd_sw_supply_outbd'],
      position: pos,
    });
    // It has been running quietly for a couple of minutes before the watch notices.
    state.bilgeLevels[FWD] = 6;

    // Milestones are recorded for the whole mission, not per stage. A player who
    // does the right thing early — logs the indications on the way past, secures
    // the panel before it is asked for — gets the credit for it when the objective
    // that wants it comes round, instead of being told to do it again.
    const f = rt.flags;
    rt.subscribe('sonar:anomalyClassified', (p) => { if (p.internal) f.sonarSymptom = true; });
    rt.subscribe('control:indicationsLogged', () => { f.controlLogged = true; });
    rt.subscribe('flooding:discovered', () => { f.foundWater = true; });
    rt.subscribe('dc:reported', (p) => {
      if (p.discovered) f.reported = true;
      // Reporting after the boundary is already shut is late — Control was
      // fighting the boat blind while you worked. Scored, not punished in play.
      if (flooding.sources.some((s) => flooding.isIsolated(s))) f.reportedAfterIsolation = true;
    });
    rt.subscribe('electrical:panelSecured', () => { f.panelSafe = true; });
    rt.subscribe('electrical:panelTripped', () => { f.panelSafe = true; f.panelFaulted = true; });
    rt.subscribe('diagnosis:called', (p) => {
      if (p.correct) { f.diagnosisCorrect = true; f.diagnosisEvidence = p.evidenceCount; }
      else f.wrongCalls = (f.wrongCalls || 0) + 1;
    });
    rt.subscribe('estimate:submitted', (p) => {
      f.estimateInflow = p.inflow;
      if (p.correct) { f.estimateDone = true; f.estimateWithinRange = p.withinRange; }
      else f.badEstimates = (f.badEstimates || 0) + 1;
    });
    rt.subscribe('boundaries:acknowledged', () => { f.boundariesKnown = true; });
    rt.subscribe('flooding:sealed', () => { f.sealed = true; });
    rt.subscribe('flooding:repairFailed', () => {
      f.sealed = false;
      f.patchBlownOff = (f.patchBlownOff || 0) + 1;
    });
    rt.subscribe('pump:deployed', () => { f.pumpRunning = true; });
    rt.subscribe('notebook:reportSubmitted', () => { f.filed = true; });
    // The acoustic trace: which compartments have been read, and how loud.
    f.trace = new Map();
    rt.subscribe('instrument:measured', (m) => {
      if (m.instrument === 'acoustic_probe' && m.valid) f.trace.set(m.compartment, m.numeric);
      if (m.instrument === 'ir_thermometer' && m.compartment === 'sonar_electronics' && m.numeric < 42
          && (state.valveStates.sw_crossconnect === 'open' || state.valveStates.fwd_sw_supply_inbd === 'open')) {
        f.coolingRestored = true;
      }
      if (m.instrument === 'sounding_tape' && m.compartment === FWD && m.valid
          && m.numeric < 12 && flooding.riseRateCmPerMin() < 0) {
        f.bilgeFalling = true;
      }
    });

    rt.toast('Forward Flooding',
      'You have the sonar watch. Something new has appeared on broadband, and Control is quietly fighting the boat to hold depth.');
  },

  stages: [
    // ---------------- 1. SYMPTOMS ----------------
    {
      id: 'symptoms',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'Symptoms',
      objective: 'Something is wrong with the boat. Man a sonar console and decide whether the new broadband source is in the water or aboard, then go aft to Ship Control and log the watch indications.',
      hints: [
        'Own-ship head has come round about 20° in the last ten minutes. Watch what N01\'s bearing did.',
        'Nothing floating holds a constant RELATIVE bearing through a course change.',
        'Ship Control is on the port side of the control room. Read the whole board before you log it: depth against ordered, planes, speed, trim, ballast.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'classify the new broadband source at a sonar console',
          done: (r) => !!r.flags.sonarSymptom, on: ['sonar:anomalyClassified'] },
        { label: 'log the watch indications at Ship Control',
          done: (r) => !!r.flags.controlLogged, on: ['control:indicationsLogged'] },
      ], {
        note: 'A source aboard our own boat, and a boat making depth with nothing ordered and an increasing bow-down trim. We are taking on weight forward.',
      })(rt),
    },

    // ---------------- 2. LOCATE ----------------
    {
      id: 'locate',
      target: { interactable: 'locker_control', compartment: 'control_room' },
      label: 'Locate the flooding',
      objective: 'Find it. Draw the three tools from DC Locker 0 in Control (the red locker, starboard), trace the noise forward with the acoustic probe, and lift the deck plate where it is loudest.',
      hints: [
        'DC Locker 0 is the red locker on the STARBOARD side, near the forward end of the control room. Press E on it and take the three tools.',
        'Read as you move forward — control, sonar, sonar electronics, forward equipment. Each reading is louder or quieter than the last: follow the gradient.',
        'The removable plate is in the deck of the forward equipment space, near the manifold, with two lifting rings.',
      ],
      arm: (rt) => rt.checklist([
        {
          label: (r) => {
            const need = ['acoustic_probe', 'sounding_tape', 'salinity_probe'];
            const missing = need.filter((id) => !r.inventory.has(id));
            return `draw ${missing.map((id) => InstrumentManager.def(id).name).join(', ')} from a DC locker`;
          },
          done: (r) => ['acoustic_probe', 'sounding_tape', 'salinity_probe'].every((id) => r.inventory.has(id)),
          on: ['inventory:added', 'locker:taken'],
        },
        {
          label: (r) => `take acoustic readings in at least three compartments (${r.flags.trace.size} so far)`,
          done: (r) => r.flags.trace.size >= 3,
          on: ['instrument:measured'],
        },
        {
          label: 'work out which compartment is loudest, and lift its deck plate',
          done: (r) => !!r.flags.foundWater,
          on: ['flooding:discovered'],
        },
      ], {
        note: 'Standing water below the plates in the forward equipment space, and a jet coming off a line low on the inboard side. This is a flooding casualty.',
      })(rt),
    },

    // ---------------- 3. FIRST ACTIONS ----------------
    {
      id: 'first_actions',
      target: { interactable: 'handset_fwd', compartment: 'forward_equipment' },
      label: 'Report and bound it',
      objective: `Before you fix anything: report the casualty on the 7MC handset, and secure the forward power panel — its gland is about ${PANEL_THREAT_CM} cm above the bilge bottom and the water is rising.`,
      hints: [
        'The 7MC handset is on the port side near the aft hatch of this compartment. Control cannot help with what it does not know.',
        'The power panel is low on the port side, just forward of the deck opening. Secure it at the handle.',
        'It feeds the installed forward bilge pump, so securing it costs you that pump. Do it anyway: a ground fault costs you the pump AND the lighting.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'report the flooding to Control on the 7MC',
          done: (r) => !!r.flags.reported, on: ['dc:reported'] },
        { label: 'secure the forward power panel before the water reaches its gland',
          done: (r) => !!r.flags.panelSafe, on: ['electrical:panelSecured', 'electrical:panelTripped'] },
      ], {
        note: 'Control has it — they are compensating trim — and the electrical boundary is set. Now you can work the problem.',
      })(rt),
    },

    // ---------------- 4. MEASURE ----------------
    {
      id: 'measure',
      target: { interactable: 'locker_forward', compartment: 'forward_equipment' },
      label: 'Measure',
      objective: 'Measure the casualty rather than describing it: sound the bilge twice with an interval between, check whether the water is salt, and gauge the manifold pressures.',
      hints: [
        'Sound the bilge, then do something else for thirty seconds or so, then sound it again. Two soundings taken in the same breath give you two numbers and no rate.',
        'The salinity probe tells you whether this is the sea or condensate — the sea does not run out and it gets worse with depth.',
        'The pressure gauge is in DC Locker 1, here in this compartment. Gauge the manifold test points.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'a first sounding of this bilge', done: (r) => soundings(r).length >= 1, on: ['instrument:measured'] },
        { label: (r) => (soundings(r).length
            ? `a second sounding at least ${Math.round(SOUNDING_INTERVAL_MIN * 60)} s after the first`
            : 'a second sounding after an interval'),
          done: ratePair, on: ['instrument:measured'] },
        { label: 'the salinity of the water',
          done: (r) => r.instruments.readingsTagged('salinity').length > 0, on: ['instrument:measured'] },
        { label: 'the manifold pressures (pressure gauge, DC Locker 1)',
          done: (r) => r.instruments.readingsTagged('pressure').filter((x) => x.compartment === FWD).length > 0,
          on: ['instrument:measured'] },
      ], {
        note: 'Salty water, rising at a measurable rate, and the forward seawater supply header has lost pressure while everything else reads normal.',
      })(rt),
    },

    // ---------------- 5. WORK THE BOARD ----------------
    {
      id: 'work_the_board',
      target: { interactable: 'dc_board', compartment: 'forward_equipment' },
      label: 'The plotting board',
      objective: 'Take it to the DC plotting board: name the cause on the Diagnosis face, work the inflow out two ways on the Estimate face, and read what those valves also feed before you shut anything.',
      hints: [
        'A cause has to explain every line on the board — including the readings that are normal. Which seawater systems did NOT lose pressure?',
        `Rise in cm/min ÷ 100 × bilge area (m²) × 60 = m³/h. The forward bilge plan area is ${BILGE_AREA.forward_equipment} m².`,
        'Then add up the pumps that can actually reach this compartment and are actually powered. Two routes that agree are worth more than one exact-looking number.',
        'One of these valves takes sonar-array cooling with it. Better to know that now than to discover it in ten minutes.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'call the cause on the Diagnosis face',
          done: (r) => !!r.flags.diagnosisCorrect, on: ['diagnosis:called'] },
        { label: 'submit an inflow estimate on the Estimate face',
          done: (r) => !!r.flags.estimateDone, on: ['estimate:submitted'] },
        { label: 'acknowledge the system boundaries',
          done: (r) => !!r.flags.boundariesKnown, on: ['boundaries:acknowledged'] },
      ], {
        note: 'A ruptured forward seawater-supply branch, about 48 m³/h in against 45 of pumping, bounded by the two supply valves — and shutting them takes sonar-array cooling with them. Pumps buy time; only stopping the source fixes it.',
      })(rt),
    },

    // ---------------- 6. ISOLATE ----------------
    {
      id: 'isolate',
      target: { interactable: 'fwd_sw_supply_inbd', compartment: 'forward_equipment' },
      label: 'Isolation',
      objective: 'Isolate the branch: shut BOTH the inboard and outboard forward seawater supply valves on the manifold (E on each wheel).',
      hints: [
        'The manifold is on the starboard side, five tagged valves.',
        'Shutting one side only will ease the flow, not stop it.',
        'If you shut the wrong valve you can open it again — but you will have secured something you needed.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('flooding:isolationChanged', (p) => {
          if (p.isolated) rt.complete('Both sides shut. The jet has dropped to a dribble — that is the trapped section draining, not the sea.');
        });
        if (rt.flooding.sources.every((s) => rt.flooding.isIsolated(s))) {
          queueMicrotask(() => rt.complete('Branch already isolated.'));
        }
        return off;
      },
    },

    // ---------------- 7. PATCH ----------------
    {
      id: 'patch',
      target: { interactable: 'locker_forward', compartment: 'forward_equipment' },
      label: 'Temporary Patch',
      objective: 'Seal the rupture: take a soft patch or a split clamp from DC Locker 1 and apply it at the line (E on the rupture).',
      hints: [
        'DC Locker 1 is at the aft end of this compartment, starboard.',
        'A soft patch works on a dead line. Against sea pressure it will let go.',
        'If a patch blows off, there is another one in the locker — isolate first, then patch.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'get a repair on the rupture that is actually holding',
          done: (r) => !!r.flags.sealed, on: ['flooding:sealed', 'flooding:repairFailed'] },
      ], { note: 'Rupture sealed on a dead line. Inflow is stopped at the source.' })(rt),
    },

    // ---------------- 8. DEWATER ----------------
    {
      id: 'dewater',
      target: { interactable: 'sump_fwd', compartment: 'forward_equipment' },
      label: 'Dewatering',
      objective: 'Get the water out and prove it is going: rig the portable pump from DC Locker 1 on the sump, then sound the bilge again and show it below 12 cm and falling.',
      hints: [
        'The pump is in DC Locker 1. Carry it to the sump at the bottom of the recess — the suction has to be in the water or it loses prime.',
        'Sound it, wait, sound it again — the same discipline you used to get the rate.',
        'If it is still rising, the source is not stopped. Check both boundary valves and the patch.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'rig the portable pump on the sump and run it',
          done: (r) => !!r.flags.pumpRunning, on: ['pump:deployed'] },
        { label: 'sound the bilge below 12 cm and falling',
          done: (r) => !!r.flags.bilgeFalling, on: ['instrument:measured'] },
      ], {
        note: 'Down under 12 cm and still falling. The pump is gaining because the hole is shut, not because the pump got bigger.',
      })(rt),
    },

    // ---------------- 9. VERIFY ----------------
    {
      id: 'verify',
      target: { interactable: 'sw_crossconnect', compartment: 'forward_equipment' },
      label: 'Verify and report',
      objective: 'One indication is not proof. Restore what you secured and confirm the recovery in three places: sonar-array cooling on the IR thermometer, self-noise back under 50 dB at Sonar, trim inside 0.3° at Ship Control. Then file the report in your notebook (N).',
      hints: [
        'Open the aft seawater cross-connect — the fifth valve on the forward manifold — then read the cabinets with the IR thermometer in Sonar-Array Electronics. Below about 40 °C they are happy again.',
        'Secure the portable pump once the bilge is down: every running pump is about 3 dB you are giving away, and sonar needs the floor under 50 dB.',
        'Trim follows the water. Once the water is out it comes back on its own — go and look at Ship Control.',
        'Press N for the notebook, then the Mission report tab.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'restore sonar-array cooling and confirm the cabinets are cooling (IR thermometer)',
          done: (r) => !!r.flags.coolingRestored, on: ['instrument:measured'] },
        { label: 'at Sonar: flow noise gone and self-noise under 50 dB',
          done: (r) => r.compartments.currentId === 'sonar_room'
            && r.state.sonarNoiseFloor < 50
            && !r.state.machineryNoiseSources.some((n) => n.id === 'flood_flow'),
          on: ['station:opened', 'player:enteredCompartment'] },
        { label: 'at Ship Control: trim inside 0.3° and the planes no longer fighting',
          done: (r) => r.compartments.currentId === 'control_room'
            && Math.abs(r.state.trim) < 0.3 && r.state.depthControlEffort() < 32,
          on: ['station:opened', 'player:enteredCompartment'] },
        { label: 'file the casualty report from the notebook',
          done: (r) => !!r.flags.filed, on: ['notebook:reportSubmitted'] },
      ], {
        note: 'Verified at the casualty, at sonar, and at control — three places that do not share a sensor. Casualty report filed.',
        pollMs: 700,
      })(rt),
    },
  ],

  /**
   * Scoring — weighted toward reasoning quality, not speed. Mistakes cost points
   * and are all recoverable; nothing here can fail the mission outright.
   */
  scoring: (rt) => {
    const f = rt.flags;
    const dc = rt.dc;
    let score = 0;
    const parts = [];

    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    // Diagnosis quality.
    const wrong = f.wrongCalls || 0;
    add('Diagnosis', Math.max(0, 25 - wrong * 8), 25,
      wrong ? `${wrong} incorrect call${wrong > 1 ? 's' : ''} before the right one.` : 'Called correctly first time.');

    // Evidence gathered before the call.
    const ev = f.diagnosisEvidence ?? 0;
    add('Evidence before the call', Math.min(20, ev * 3), 20, `${ev} of 9 evidence lines on the board when you called it.`);

    // Estimation.
    add('Estimation', (f.estimateWithinRange ? 10 : 4) - Math.min(4, (f.badEstimates || 0) * 2), 10,
      f.estimateWithinRange ? 'Inflow estimate within a reasonable range of the true rate.' : 'Estimate was well off the true inflow.');

    // Procedure order.
    let proc = 20;
    const reasons = [];
    if (!dc?.reported) { proc -= 6; reasons.push('never reported the casualty'); }
    else if (f.reportedAfterIsolation) { proc -= 3; reasons.push('reported late'); }
    if (f.patchBlownOff) { proc -= 5 * Math.min(2, f.patchBlownOff); reasons.push('patched a pressurised line'); }
    if (f.panelFaulted) { proc -= 5; reasons.push('the power panel flooded before it was secured'); }
    add('Procedure', Math.max(0, proc), 20, reasons.length ? reasons.join('; ') + '.' : 'Reported, bounded, isolated, patched, dewatered — in order.');

    // Unnecessary actions.
    const un = dc?.unnecessary || 0;
    add('Restraint', Math.max(-15, -5 * un) + 15, 15,
      un ? `${un} valve operation${un > 1 ? 's' : ''} that did nothing for this casualty.` : 'No unnecessary system operations.');

    // How bad it got.
    const peak = rt.flooding?.peakLevelCm ?? 0;
    const peakScore = peak <= 40 ? 10 : peak >= 90 ? 0 : 10 * (1 - (peak - 40) / 50);
    add('Casualty control', peakScore, 10, `Water peaked at ${peak.toFixed(0)} cm in the forward bilge.`);

    // Hints.
    const hints = rt.hintsUsed || 0;
    const skipped = rt.skipped || 0;
    add('Independence', Math.max(0, 10 - hints * 2 - skipped * 4), 10,
      [hints ? `${hints} hint${hints > 1 ? 's' : ''} taken` : null,
       skipped ? `${skipped} objective${skipped > 1 ? 's' : ''} skipped` : null,
      ].filter(Boolean).join('; ') || 'No hints taken, nothing skipped.');

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
