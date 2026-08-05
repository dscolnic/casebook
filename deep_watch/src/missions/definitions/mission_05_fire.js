import { REFLASH_TEMP_C } from '../../simulation/FireSystem.js';

/**
 * Mission 5 — Electrical Fire (Unit II: Keep the Boat Alive).
 *
 * One idea, taught by the simulation rather than by text: an electrical fire is
 * put out by DE-ENERGIZING it. The extinguisher only removes the flame that
 * exists at that instant. Leave the circuit alive and the fault re-ignites the
 * same insulation, and the boat does exactly that, on a timer, without ever
 * printing "wrong".
 *
 * Everything the player can get wrong here fails physically:
 *   - working in smoke without going on air makes the compartment unreadable;
 *   - AFFF or water on a live circuit conducts, trips the breaker through the
 *     stream, and leaves the fire burning;
 *   - securing the wrong zone kills something you needed and not the fault;
 *   - trusting the switchboard lamp instead of a meter means "isolated" is a
 *     belief rather than a measurement;
 *   - restoring loads before the seat is cold puts energy back into the fault.
 *
 * Source games transformed here:
 *   Protocol  (protocol.html, `nc_fire_protocol`) — the order-sensitive casualty
 *             procedure and its decoy equipment, rebuilt as physical actions.
 *   Diagnosis (`nc_flooding_diag`) — identifying which zone is involved from
 *             evidence spread across compartments instead of one panel.
 *   Sequence  (`nc_sonar_path`) — electrical restoration as a dependency chain:
 *             source → main bus → vital bus → the loads that keep people alive.
 *
 * Eight objectives, each a piece of work rather than a keystroke.
 */

const ELEC = 'electrical';
const NON_CONDUCTIVE = ['ext_co2', 'ext_dry'];

export const mission05Fire = {
  id: 'mission_05_fire',
  title: 'Electrical Fire',
  unit: 2,
  startLocation: 'machinery_control',
  sourceGames: ['Protocol', 'Diagnosis', 'Sequence'],
  sourceIds: ['nc_fire_protocol', 'nc_flooding_diag', 'nc_sonar_path'],
  learningObjectives: [
    'Protect yourself before the casualty: breathing gear goes on before the smoke, not after.',
    'Identify the electrical zone feeding a casualty, rather than the nearest switch.',
    'Understand why a conductive agent on a live circuit is a shock hazard and not a suppression.',
    'Prove an isolation with a measurement instead of an indicator lamp.',
    'Hold a reflash watch: a fire is out when it is cold, not when it is dark.',
    'Restore power in dependency order, life-safety loads first.',
  ],

  onStart(rt) {
    const { state, fire, atmosphere } = rt;
    state.depth = 55;
    state.orderedDepth = 55;
    state.speed = 4;
    state.restoredLoads = [];

    // A chafed cable in the after distribution zone, arcing into its own
    // insulation. It is fed from Aft Distribution Panel 2A, off the starboard main.
    fire.add({
      id: 'fire_2a',
      compartment: ELEC,
      kind: 'electrical',
      energizedBy: 'aft_dist_2a',
      seat: 'cable run 2F-J',
      seatId: 'fire_seat_electrical',
      intensity: 0.3,
    });
    // It has been burning for a minute or two: there is already smoke in there.
    atmosphere.inject(ELEC, { smoke: 0.35, co: 90, heat: 22, o2burn: 0.6 });

    const f = rt.flags;
    rt.subscribe('atmosphere:onAir', (p) => { if (p.onAir) f.onAir = true; });
    rt.subscribe('electrical:zoneIdentified', (p) => { if (p.correct) f.zoneFound = true; else f.wrongZone = (f.wrongZone || 0) + 1; });
    rt.subscribe('fire:shockHazard', () => { f.shocks = (f.shocks || 0) + 1; });
    rt.subscribe('fire:wrongAgent', () => { f.wrongAgents = (f.wrongAgents || 0) + 1; });
    rt.subscribe('fire:knockedDown', (p) => { if (!p.energized) f.knockedDown = true; });
    rt.subscribe('fire:reflash', () => { f.reflashes = (f.reflashes || 0) + 1; f.knockedDown = false; });
    rt.subscribe('fire:out', () => { f.fireOut = true; });
    rt.subscribe('fire:boundaryCooled', () => { f.boundaryCooled = true; });
    rt.subscribe('electrical:loadRestored', (p) => {
      f.restored = p.order.slice();
      if (!p.inOrder) f.outOfOrder = (f.outOfOrder || 0) + 1;
    });
    rt.subscribe('electrical:restoreUnsafe', () => { f.restoredWhileBurning = (f.restoredWhileBurning || 0) + 1; });
    rt.subscribe('instrument:measured', (m) => {
      // Proving the isolation: a meter reading of zero in the fire compartment,
      // taken after the zone was opened. An indicator lamp is not evidence.
      if (m.instrument === 'multimeter' && m.compartment === ELEC && (m.numeric ?? 1) < 1) f.provedDead = true;
      // Boundary temperature, read from the cool side.
      if ((m.instrument === 'ir_thermometer' || m.instrument === 'thermal_camera')
          && (m.compartment === 'propulsion' || m.compartment === 'auxiliary')) f.boundaryRead = true;
      // The reflash watch: the seat itself, cold.
      if ((m.instrument === 'ir_thermometer' || m.instrument === 'thermal_camera') && m.compartment === ELEC) {
        f.seatRead = true;
        if ((m.numeric ?? 999) < REFLASH_TEMP_C) f.seatCold = true;
      }
    });

    rt.toast('Fire in the after distribution zone',
      'Smoke reported in Electrical Distribution and the board is showing a ground on the starboard main. You are the nearest qualified hand.');
  },

  stages: [
    {
      id: 'protect_yourself',
      target: { interactable: 'eab_machinery_control', compartment: 'machinery_control' },
      label: 'Air first',
      objective: 'Before you go anywhere near it: go on air at an EAB manifold, and take a CO₂ or dry-chemical bottle and a meter from DC Locker 2 here in Machinery Control.',
      hints: [
        'The EAB manifold is on the port side of each compartment — press E to plug in.',
        'DC Locker 2 is on the starboard side of Machinery Control. It has all three extinguisher types in it; only two of them are non-conductive.',
        'A multimeter is how you will prove the circuit is dead later. An indicator lamp is not proof.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'go on air at an EAB manifold', done: (r) => !!r.flags.onAir, on: ['atmosphere:onAir'] },
        { label: 'carry a non-conductive extinguisher (CO₂ or dry chemical)',
          done: (r) => NON_CONDUCTIVE.some((id) => r.inventory.has(id)),
          on: ['inventory:added', 'locker:taken'] },
        { label: 'carry a multimeter and an IR thermometer',
          done: (r) => r.inventory.has('multimeter') && (r.inventory.has('ir_thermometer') || r.inventory.has('thermal_camera')),
          on: ['inventory:added', 'locker:taken'] },
      ], {
        note: 'On air, with a bottle that will not conduct and something to prove the circuit dead with. Now you can go and look at it.',
      })(rt),
    },

    {
      id: 'find_the_zone',
      target: { interactable: 'electrical', compartment: 'electrical' },
      label: 'Identify the zone',
      objective: 'Find what is burning and what is feeding it: get eyes on the seat in Electrical Distribution, then mark the casualty zone on the switchboard\'s Zones face.',
      hints: [
        'The seat is the cable-run junction box on the starboard side of Electrical Distribution.',
        'A compartment is not fed by "the electrics" — it is fed by a named panel off a named bus. The switchboard\'s Zones face lists them.',
        'Aft Distribution Panel 2A feeds Electrical Distribution from the starboard main.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'get to the compartment that is burning',
          done: (r) => r.compartments.currentId === ELEC || !!r.flags.sawSeat,
          on: ['player:enteredCompartment'],
          watch: (r, changed) => r.bus.on('player:enteredCompartment', ({ compartment }) => {
            if (compartment.id === ELEC) { r.flags.sawSeat = true; changed(); }
          }) },
        { label: 'mark the panel that feeds it on the switchboard Zones face',
          done: (r) => !!r.flags.zoneFound, on: ['electrical:zoneIdentified'] },
      ], {
        note: 'Aft Distribution Panel 2A, fed from the starboard main, feeding the compartment that is on fire. That is the thing to open.',
      })(rt),
    },

    {
      id: 'isolate',
      target: { interactable: 'aft_dist_2a', compartment: 'electrical' },
      label: 'De-energize',
      objective: 'Take the ignition source away: open the panel feeding the fire — at its handle in the compartment, or on the switchboard.',
      hints: [
        'The panel handle is on the port side of Electrical Distribution, opposite the seat.',
        'Opening the starboard main above it would also work, and would cost you more.',
        'Until this is done, an extinguisher buys you seconds and nothing else.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'open the zone feeding the fire',
          done: (r) => !r.fire.active.some((f) => r.fire.isEnergized(f)),
          on: ['electrical:panelSecured', 'electrical:busChanged', 'electrical:panelTripped'],
        },
      ], {
        note: 'The fault is dead. The fire is still burning — it has fuel and it is hot — but nothing is feeding it any more.',
      })(rt),
    },

    {
      id: 'prove_it',
      target: { interactable: 'fire_seat_electrical', compartment: 'electrical' },
      label: 'Prove it is dead',
      objective: 'Do not take the board\'s word for it: prove the circuit is dead with the multimeter, in this compartment (F to read).',
      hints: [
        'Select the multimeter with [ and ], then press F in Electrical Distribution.',
        'An indicator lamp tells you what a relay thinks. A meter tells you what the conductor is doing.',
        'Zero volts is the reading you want before anyone touches it.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'read 0 V in the fire compartment with the multimeter',
          done: (r) => !!r.flags.provedDead, on: ['instrument:measured'] },
      ], {
        note: 'Zero volts at the panel. Isolation is now a measurement rather than a belief.',
      })(rt),
    },

    {
      id: 'attack',
      target: { interactable: 'fire_seat_electrical', compartment: 'electrical' },
      label: 'Put it out',
      objective: 'Fight the fire: with a non-conductive bottle in hand, discharge it at the seat (E on the cable run).',
      hints: [
        'Make sure the extinguisher is the item in your hands — [ and ] cycle what you are carrying.',
        'CO₂ and dry chemical are non-conductive. AFFF and water are not, and the circuit was only just made dead.',
        'If it comes back, something is still feeding it.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'knock the fire down with a non-conductive agent on a dead circuit',
          done: (r) => !!r.flags.knockedDown, on: ['fire:knockedDown', 'fire:reflash'] },
      ], {
        note: 'Flame out on a dead circuit. That is not the same as out — hot insulation relights itself.',
      })(rt),
    },

    {
      id: 'boundaries',
      target: { interactable: 'hose_propulsion', compartment: 'propulsion' },
      label: 'Boundaries',
      objective: 'Keep it to one compartment: read the bulkhead temperature next door with the IR thermometer, and run a hose on it from the cool side.',
      hints: [
        'Go into Propulsion Machinery or Auxiliary — the compartments either side — and read the bulkhead.',
        'The firemain hose reel is on the port side of every compartment.',
        'Boundary cooling is done from the COOL side. That is the whole point of it.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'read the bulkhead temperature from an adjacent compartment',
          done: (r) => !!r.flags.boundaryRead, on: ['instrument:measured'] },
        { label: 'run a hose on the boundary from the cool side',
          done: (r) => !!r.flags.boundaryCooled, on: ['fire:boundaryCooled'] },
      ], {
        note: 'Boundary cooled and holding. The fire stays one compartment\'s problem.',
      })(rt),
    },

    {
      id: 'reflash_watch',
      target: { interactable: 'fire_seat_electrical', compartment: 'electrical' },
      label: 'Reflash watch',
      objective: `A fire is out when it is COLD, not when it is dark. Watch the seat with the IR thermometer until it is under ${REFLASH_TEMP_C} °C and the casualty is declared out.`,
      hints: [
        'Read the seat itself with the IR thermometer, in Electrical Distribution.',
        'Cooling takes time. Boundary cooling makes it quicker.',
        'If it relights, nothing had actually removed the ignition source — check the panel and the bus above it.',
      ],
      arm: (rt) => rt.checklist([
        { label: `read the seat below ${REFLASH_TEMP_C} °C`, done: (r) => !!r.flags.seatCold, on: ['instrument:measured'] },
        { label: 'the fire declared out', done: (r) => !!r.flags.fireOut, on: ['fire:out'] },
      ], {
        note: 'Cold and out. The reflash watch is the part everyone wants to skip, and it is the part that decides whether you fight it twice.',
        pollMs: 900,
      })(rt),
    },

    {
      id: 'restore',
      target: { interactable: 'electrical', compartment: 'electrical' },
      label: 'Restore',
      objective: 'Bring the boat back: clear the smoke, then restore power on the switchboard in dependency order — a main bus, the vital bus, then lighting and ventilation before anything else.',
      hints: [
        'Open the compartment\'s vent damper and make sure the supply fan is running, or the smoke has nowhere to go.',
        'Loads face: nothing will hold in until the bus above it is closed. That is protection doing its job.',
        'Lighting and ventilation are life-safety loads. The galley is not.',
      ],
      arm: (rt) => rt.checklist([
        { label: 'clear the smoke out of the compartment (under 10 %)',
          done: (r) => (r.atmosphere.air(ELEC)?.smoke ?? 1) < 0.1, on: ['atmosphere:damper', 'atmosphere:route'] },
        { label: 'restore a main bus and the vital bus',
          done: (r) => r.state.electricalBuses.vital.energized
            && (r.state.electricalBuses.portMain.energized || r.state.electricalBuses.stbdMain.energized),
          on: ['electrical:busChanged'] },
        { label: 'restore lighting and ventilation',
          done: (r) => ['lighting', 'vent_fans'].every((l) => (r.state.restoredLoads || []).includes(l)),
          on: ['electrical:loadRestored'] },
      ], {
        note: 'Smoke clearing, power back in the order that keeps people alive first, and one compartment\'s worth of damage instead of two.',
        pollMs: 900,
      })(rt),
    },
  ],

  scoring: (rt) => {
    const f = rt.flags;
    let score = 0;
    const parts = [];
    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    add('Self-protection', f.onAir ? 20 : 6, 20,
      f.onAir ? 'Went on air before entering the smoke.' : 'Worked the casualty without breathing protection.');

    const wrongZone = f.wrongZone || 0;
    add('Zone identification', Math.max(0, 15 - wrongZone * 5), 15,
      wrongZone ? `${wrongZone} wrong zone${wrongZone > 1 ? 's' : ''} marked before the right one.` : 'Named the feeding panel first time.');

    const shocks = f.shocks || 0;
    add('Agent selection', Math.max(0, 20 - shocks * 10 - (f.wrongAgents || 0) * 4), 20,
      shocks ? `${shocks} conductive discharge${shocks > 1 ? 's' : ''} onto a live circuit.`
        : f.wrongAgents ? 'Used an agent that does not suit an electrical fire.' : 'Non-conductive agent, on a circuit already proved dead.');

    add('Isolation proved', f.provedDead ? 15 : 4, 15,
      f.provedDead ? 'Proved the circuit dead with a meter rather than a lamp.' : 'Never measured the circuit — isolation was taken on trust.');

    const reflashes = f.reflashes || 0;
    add('Reflash discipline', Math.max(0, 15 - reflashes * 7), 15,
      reflashes ? `Reflashed ${reflashes} time${reflashes > 1 ? 's' : ''} — the ignition source was still live.`
        : 'No reflash: the source was dead before the agent went on.');

    add('Boundaries', f.boundaryCooled ? 10 : 3, 10,
      f.boundaryCooled ? 'Boundary cooled from the adjacent compartment.' : 'Boundaries never cooled — the next compartment was on its own.');

    const outOfOrder = f.outOfOrder || 0;
    const unsafe = f.restoredWhileBurning || 0;
    add('Restoration order', Math.max(0, 15 - outOfOrder * 5 - unsafe * 5), 15,
      [outOfOrder ? `${outOfOrder} load${outOfOrder > 1 ? 's' : ''} restored out of order` : null,
       unsafe ? 'attempted to restore power while the fault was still live' : null,
      ].filter(Boolean).join('; ') || 'Source, bus, then life-safety loads first.');

    const hints = rt.hintsUsed || 0;
    const skipped = rt.skipped || 0;
    score -= Math.min(10, hints * 2 + skipped * 4);
    parts.push({ label: 'Independence', got: -Math.min(10, hints * 2 + skipped * 4), max: 0,
      why: [hints ? `${hints} hint${hints > 1 ? 's' : ''} taken` : null,
        skipped ? `${skipped} objective${skipped > 1 ? 's' : ''} skipped` : null].filter(Boolean).join('; ')
        || 'No hints taken, nothing skipped.' });

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
