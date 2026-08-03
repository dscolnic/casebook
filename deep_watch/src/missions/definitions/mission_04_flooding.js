import { BILGE_AREA, PANEL_THREAT_CM } from '../../simulation/FloodingSystem.js';
import { InstrumentManager } from '../../instruments/InstrumentManager.js';

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
 * Nothing in the mission moves the player or fixes anything for them. Every stage
 * completes because a physical fact became true in `SubmarineState`.
 */

const FWD = 'forward_equipment';

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

    // Reporting after the boundary is already shut is late — Control was fighting
    // the boat blind while you worked. Recorded for scoring, not punished in play.
    rt.subscribe('dc:reported', () => {
      if (flooding.sources.some((s) => flooding.isIsolated(s))) rt.flags.reportedAfterIsolation = true;
    });

    rt.toast('Forward Flooding',
      'You have the sonar watch. Something new has appeared on broadband, and Control is quietly fighting the boat to hold depth.');
  },

  stages: [
    // ---------------- SYMPTOM ----------------
    {
      id: 'sonar_symptom',
      label: 'Sonar',
      objective: 'Man a sonar console. A new broadband source has appeared — decide whether it is a contact in the water or something aboard.',
      hints: [
        'Own-ship head has come round about 20° in the last ten minutes. Watch what N01\'s bearing did.',
        'Nothing floating holds a constant RELATIVE bearing through a course change.',
        'A ship has a blade rate and a harmonic family. Look at the narrowband display for N01.',
      ],
      arm: (rt) => rt.onEvent('sonar:anomalyClassified',
        'Logged as an own-ship source. Broadband, no blade rate, and a locked relative bearing: that noise is being made aboard this boat.',
        (p) => p.internal)(rt),
    },
    {
      id: 'control_evidence',
      label: 'Control Room',
      objective: 'Go aft to Control, man Ship Control, and log the watch indications.',
      hints: [
        'Ship Control is on the port side of the control room.',
        'Read the whole board before you log it: depth against ordered, planes, speed, trim, ballast.',
      ],
      arm: (rt) => rt.onEvent('control:indicationsLogged',
        'Depth making with nothing ordered, bow-down trim increasing, planes and speed normal, ballast on plan. The boat is taking on weight forward.')(rt),
    },

    // ---------------- INSTRUMENT + TRACE ----------------
    {
      id: 'retrieve_probe',
      label: 'Instrument',
      objective: 'Carry three tools: an Acoustic Probe, a Sounding Tape and a Salinity Probe. All three are in DC Locker 0 — the red locker on the starboard side of Control (E to open it). A probe is also on the port shelf aft.',
      hints: [
        'DC Locker 0 is the red locker on the STARBOARD side, near the forward end of the control room. Press E on it and take the three tools.',
        'The objective card lists whichever tools you are still missing.',
        'You need something to hear the noise with, something to measure water depth with, and something to tell seawater from condensate.',
      ],
      arm: (rt) => {
        const need = ['acoustic_probe', 'sounding_tape', 'salinity_probe'];
        const check = () => {
          const missing = need.filter((id) => !rt.inventory.has(id));
          rt.bus.emit('mission:progress', {
            have: need.length - missing.length,
            need: need.length,
            // Name what is still missing — a player who cannot find one small
            // object on a bulkhead must never be stuck guessing which one it is.
            detail: missing.length
              ? `Still needed: ${missing.map((id) => InstrumentManager.def(id).name).join(', ')}`
              : null,
          });
          if (!missing.length) {
            rt.complete('Probe, tape, and salinity probe in hand. The probe reports a sound level — it will not tell you what is making it.');
          }
        };
        const offs = [rt.bus.on('inventory:added', check), rt.bus.on('locker:taken', check)];
        queueMicrotask(check);
        return () => offs.forEach((o) => o());
      },
    },
    {
      id: 'trace_acoustic',
      label: 'Acoustic Trace',
      objective: 'Trace the noise. Take an acoustic-probe reading (F) in at least three compartments, working toward the loudest.',
      hints: [
        'Start where you are and read as you move forward: control, sonar, sonar electronics, forward equipment.',
        'Each reading tells you louder or quieter than the last one. Follow the gradient.',
        'The probe reads structure-borne sound. Bulkheads attenuate it — that is why the trend matters more than any single number.',
      ],
      arm: (rt) => {
        const seen = new Map();
        const off = rt.bus.on('instrument:measured', (m) => {
          if (m.instrument !== 'acoustic_probe' || !m.valid) return;
          seen.set(m.compartment, m.numeric);
          rt.bus.emit('mission:progress', { have: seen.size, need: 3 });
          const loudest = [...seen.entries()].sort((a, b) => b[1] - a[1])[0];
          if (seen.size >= 3 && loudest[0] === FWD) {
            rt.flags.traceReadings = seen.size;
            rt.complete(`Loudest in the forward equipment space at ${loudest[1].toFixed(0)} dB — and it is coming from below the deck.`);
          } else if (seen.size >= 3 && loudest[0] !== FWD) {
            rt.toast('Keep tracing', 'Your loudest reading so far is not the last compartment you tried. Keep working toward the maximum.');
          }
        });
        return off;
      },
    },
    {
      id: 'discover_bilge',
      label: 'Discovery',
      objective: 'Find the water. Lift the deck plate in the forward equipment space (E on the plate).',
      hints: [
        'The removable plate is in the deck near the forward manifold, with two lifting rings.',
        'The flashlight helps down there.',
      ],
      arm: (rt) => rt.onEvent('flooding:discovered',
        'Standing water below the plates, and a jet coming off a line low on the inboard side. This is a flooding casualty.')(rt),
    },

    // ---------------- IMMEDIATE ACTIONS ----------------
    {
      id: 'report_flooding',
      label: 'Report',
      objective: 'Report it. Use the 7MC handset by the aft hatch (E) — Control cannot help with what it does not know.',
      hints: [
        'The 7MC handset is on the port side near the aft hatch of this compartment.',
        'You report a casualty before you start fixing it. Control will begin compensating trim.',
      ],
      arm: (rt) => rt.onEvent('dc:reported',
        'Control has it. They are compensating trim and have the boundary and a pump ordered — you have the compartment.',
        (p) => p.discovered)(rt),
    },
    {
      id: 'secure_panel',
      label: 'Electrical Boundary',
      objective: `Protect the forward power panel — its lower gland is about ${PANEL_THREAT_CM} cm above the bilge bottom and the water is rising. Secure it at the handle (E).`,
      hints: [
        'The panel is low on the port side, just forward of the deck opening.',
        'You can also confirm it is dead with the multimeter afterwards.',
        'It feeds the installed forward bilge pump — securing it costs you that pump. Do it anyway; a ground fault costs you the pump AND the lighting.',
      ],
      arm: (rt) => {
        const done = (note) => rt.complete(note);
        const offs = [
          rt.bus.on('electrical:panelSecured', () => done('Panel secured at the handle before the water got to it. That is a boundary, not a repair.')),
          rt.bus.on('electrical:panelTripped', () => {
            rt.flags.panelFaulted = true;
            done('The water got there first and the panel tripped on a ground fault. Recoverable — but you have lost the installed pump until you dewater and reset it.');
          }),
        ];
        return () => offs.forEach((o) => o());
      },
    },

    // ---------------- MEASURE + DIAGNOSE ----------------
    {
      id: 'measure_water',
      label: 'Measure',
      objective: 'Measure the casualty: two soundings of the forward bilge (a rate needs two), the salinity of the water, and the manifold pressures.',
      hints: [
        'Sound the bilge, do something else for a minute, then sound it again. That gives you a rate.',
        'The salinity probe tells you whether this is the sea or condensate.',
        'The pressure gauge is in DC Locker 1, here in this compartment. Gauge the manifold test points.',
        'Sound the next compartment aft too — you want to know whether the boundary is holding.',
      ],
      arm: (rt) => {
        const need = () => {
          const inst = rt.instruments;
          const soundings = inst.readingsTagged('sounding').filter((r) => r.compartment === FWD);
          const spread = soundings.length >= 2
            && (soundings[soundings.length - 1].minutes - soundings[0].minutes) > 0.4;
          return {
            soundings: spread,
            salinity: inst.readingsTagged('salinity').length > 0,
            pressure: inst.readingsTagged('pressure').filter((r) => r.compartment === FWD).length > 0,
          };
        };
        const check = () => {
          const n = need();
          const have = Object.values(n).filter(Boolean).length;
          rt.bus.emit('mission:progress', { have, need: 3 });
          if (have === 3) {
            rt.complete('Salty water, rising at a measurable rate, and the forward seawater supply header has lost pressure while everything else reads normal.');
          }
        };
        const off = rt.bus.on('instrument:measured', check);
        queueMicrotask(check);
        return off;
      },
    },
    {
      id: 'diagnose',
      label: 'Diagnosis',
      objective: 'Take it to the DC plotting board (starboard, aft end of the compartment) and call the cause on the Diagnosis face.',
      hints: [
        'A cause has to explain every line on the board — including the readings that are normal.',
        'Which seawater systems did NOT lose pressure? What does that eliminate?',
        'The water is salty and the trim is real, so this is not a sensor fault and it is not condensate.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('diagnosis:called', (p) => {
          if (p.correct) {
            rt.flags.diagnosisCorrect = true;
            rt.flags.diagnosisEvidence = p.evidenceCount;
            rt.complete('Ruptured forward seawater-supply branch. The pressure loss named the system; the calm readings eliminated the others.');
          } else {
            rt.flags.wrongCalls = (rt.flags.wrongCalls || 0) + 1;
          }
        });
        return off;
      },
    },
    {
      id: 'estimate',
      label: 'Estimate',
      objective: 'On the Estimate face of the board, work out the inflow — from your soundings and from head × hole — and decide whether pumping alone can hold it.',
      hints: [
        'Rise in cm/min ÷ 100 × bilge area (m²) × 60 = m³/h.',
        `The forward bilge plan area is ${BILGE_AREA.forward_equipment} m².`,
        'Then add up the pumps that can actually reach this compartment and are actually powered.',
        'Two routes that agree to the same order of magnitude are worth more than one exact-looking number.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('estimate:submitted', (p) => {
          rt.flags.estimateWithinRange = p.withinRange;
          rt.flags.estimateInflow = p.inflow;
          if (p.correct) {
            rt.complete(`About ${p.inflow.toFixed(0)} m³/h in against ${p.capacity.toFixed(0)} m³/h of pumping. Pumps buy time. Only stopping the source fixes it.`);
          } else {
            rt.flags.badEstimates = (rt.flags.badEstimates || 0) + 1;
          }
        });
        return off;
      },
    },

    // ---------------- PROCEDURE ----------------
    {
      id: 'boundaries',
      label: 'Boundaries',
      objective: 'Before you shut anything: read the System boundaries face of the board and acknowledge what those valves also feed.',
      hints: [
        'A branch is isolated only when it is shut at both ends.',
        'One of these valves takes sonar-array cooling with it. Better to know that now than to discover it in ten minutes.',
      ],
      arm: (rt) => rt.onEvent('boundaries:acknowledged',
        'Branch bounded by the inboard and outboard supply valves. Shutting them also secures sonar-array cooling — the aft cross-connect can restore it later.')(rt),
    },
    {
      id: 'isolate',
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
        if (rt.flooding.stopped) queueMicrotask(() => rt.complete('Branch already isolated.'));
        return off;
      },
    },
    {
      id: 'patch',
      label: 'Temporary Patch',
      objective: 'Seal the rupture: take a soft patch or a split clamp from DC Locker 1 and apply it at the line (E on the rupture).',
      hints: [
        'DC Locker 1 is at the aft end of this compartment, starboard.',
        'A soft patch works on a dead line. Against sea pressure it will let go.',
        'If a patch blows off, there is another one in the locker — isolate first, then patch.',
      ],
      arm: (rt) => {
        const offs = [
          rt.bus.on('flooding:sealed', () => rt.complete('Rupture sealed on a dead line. Inflow is stopped at the source.')),
          rt.bus.on('flooding:repairFailed', () => { rt.flags.patchBlownOff = (rt.flags.patchBlownOff || 0) + 1; }),
        ];
        return () => offs.forEach((o) => o());
      },
    },
    {
      id: 'dewater',
      label: 'Dewatering',
      objective: 'Get the water out: rig the portable pump from DC Locker 1, set its suction in the sump (E), and run it.',
      hints: [
        'The pump is in DC Locker 1. Carry it to the sump at the bottom of the recess.',
        'The installed forward bilge pump needs the forward power panel back — you can reset the panel once the level is below 30 cm.',
        'Every running pump is about 3 dB on the self-noise floor. Sonar will notice.',
      ],
      arm: (rt) => rt.onEvent('pump:deployed', 'Portable pump rigged and running on the sump.')(rt),
    },

    // ---------------- VERIFICATION ----------------
    {
      id: 'verify_bilge',
      label: 'Verify — the casualty',
      objective: 'Prove it here: sound the bilge again and show the level is falling, below 12 cm.',
      hints: [
        'Sound it, wait, sound it again — the same discipline you used to get the rate.',
        'If it is still rising, the source is not stopped. Check both boundary valves and the patch.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('instrument:measured', (m) => {
          if (m.instrument !== 'sounding_tape' || m.compartment !== FWD || !m.valid) return;
          if (m.numeric < 12 && rt.flooding.riseRateCmPerMin() < 0) {
            rt.complete(`Down to ${m.numeric.toFixed(1)} cm and still falling. The pump is gaining because the hole is shut, not because the pump got bigger.`);
          }
        });
        return off;
      },
    },
    {
      id: 'restore_cooling',
      label: 'Verify — the dependency',
      objective: 'You secured sonar-array cooling to isolate the branch. Open the aft seawater cross-connect, then confirm with the IR thermometer in Sonar-Array Electronics that the cabinets are coming back down.',
      hints: [
        'The cross-connect is the fifth valve on the forward manifold.',
        'The IR thermometer is on the starboard shelf in Sonar-Array Electronics.',
        'Below about 40 °C the cabinets are happy again.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('instrument:measured', (m) => {
          if (m.instrument !== 'ir_thermometer' || m.compartment !== 'sonar_electronics') return;
          const cooled = rt.state.valveStates.sw_crossconnect === 'open'
            || rt.state.valveStates.fwd_sw_supply_inbd === 'open';
          if (cooled && m.numeric < 42) {
            rt.complete('Cabinet temperature falling with cooling restored from the aft header. Isolating a system means owning what it fed.');
          } else if (!cooled) {
            rt.toast('Still hot', 'Cooling is still secured. Open the aft cross-connect on the forward manifold.');
          }
        });
        return off;
      },
    },
    {
      id: 'verify_sonar',
      label: 'Verify — sonar',
      objective: 'Go to Sonar. Confirm the internal flow noise is gone and the boat is quiet enough to hold the weak contact again (self-noise under 50 dB).',
      hints: [
        'The flow noise disappears when the source stops — but your pumps are still running.',
        'Secure the portable pump once the bilge is down; a running pump is 3 dB you are giving away.',
        'S03 is the faint one. It comes back when the floor drops.',
      ],
      arm: (rt) => {
        const check = () => {
          const quiet = rt.state.sonarNoiseFloor < 50;
          const noFlow = !rt.state.machineryNoiseSources.some((n) => n.id === 'flood_flow');
          if (quiet && noFlow && rt.compartments.currentId === 'sonar_room') {
            rt.complete('Flow noise gone, floor back under 50 dB, and S03 is back on the waterfall. Fixing the boat gave sonar its ears back.');
            return true;
          }
          return false;
        };
        const id = setInterval(check, 700);
        const off = rt.bus.on('station:opened', () => check());
        return () => { clearInterval(id); off(); };
      },
    },
    {
      id: 'verify_control',
      label: 'Verify — control',
      objective: 'Finally, back to Ship Control: confirm trim is back inside 0.3° and the depth-control effort has come down.',
      hints: [
        'Trim follows the water. Once the water is out, it comes back on its own.',
        'Log the indications again so the recovery is in the notebook next to the casualty.',
      ],
      arm: (rt) => {
        const check = () => {
          if (Math.abs(rt.state.trim) < 0.3 && rt.state.depthControlEffort() < 32
              && rt.compartments.currentId === 'control_room') {
            rt.complete('Trim back on an even keel and the planes no longer fighting. Verified at the casualty, at sonar, and here.');
            return true;
          }
          return false;
        };
        const id = setInterval(check, 700);
        return () => clearInterval(id);
      },
    },
    {
      id: 'file_report',
      label: 'Report',
      objective: 'Open the notebook (N), read back the chain of evidence on the Mission report tab, and file the casualty report.',
      hints: ['Press N for the notebook, then the Mission report tab.'],
      arm: (rt) => rt.onEvent('notebook:reportSubmitted', 'Casualty report filed.')(rt),
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
    add('Independence', Math.max(0, 10 - hints * 2), 10, hints ? `${hints} hint${hints > 1 ? 's' : ''} taken.` : 'No hints taken.');

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
