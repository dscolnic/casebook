import { MISSION2_PICTURE } from '../../simulation/SonarSystem.js';

/**
 * Mission 2 — Contact in the Noise (Unit I: Qualify on the Boat).
 *
 * The sonar watch, rebuilt as a watch rather than a game. Four things are audible
 * and each demands a different kind of evidence:
 *
 *   S01  a merchant — a full harmonic family and a steady bearing rate;
 *   S02  a biologic chorus — no propulsion lines at all, bearing wanders;
 *   N01  an own-ship source — holds a constant RELATIVE bearing through a turn;
 *   S03  a fishing boat too faint to name — the player is meant to leave it Unknown.
 *
 * The Casebook lesson is carried by the processing chains: the broadband
 * waterfall, the auto-detect list and the bearing-time record are one beamformer
 * shown three ways. Agreement among them is one measurement repeated. Only the
 * narrowband analyser (its own chain) or manoeuvring own-ship corroborates.
 *
 * Source games: Sonar Spy (`nc_sonar_spy_1`) and Casebook (`nc_greywake_case`).
 */
export const mission02Contact = {
  id: 'mission_02_contact',
  title: 'Contact in the Noise',
  unit: 1,
  startLocation: 'sonar_room',
  sourceGames: ['Sonar Spy', 'Casebook'],
  sourceIds: ['nc_sonar_spy_1', 'nc_greywake_case'],
  learningObjectives: [
    'Detect several sources against a noise floor you partly control.',
    'Classify from a signature, and decline to classify when the signature will not carry it.',
    'Tell an own-ship source from a contact using relative bearing through a turn.',
    'Hold a track: bearing history is evidence, a single bearing is not.',
    'Know which of your displays are independent and which are one measurement drawn twice.',
  ],

  onStart(rt) {
    const { state, sonar } = rt;
    state.depth = 90;
    state.orderedDepth = 90;
    state.speed = 6;
    state.heading = 275;
    state.orderedHeading = 275;
    state.propulsionState.shaftRpm = 78;
    // The boat starts noisy: two pumps running for no reason anybody remembers.
    state.pumpStates.seawaterPump.on = true;
    state.pumpStates.trimPump.on = true;
    // A shaft harmonic of our own, so one of the four "contacts" is the boat.
    state.machineryNoiseSources.push({
      id: 'ownship_hum', freqHz: 24, level: 6, compartment: 'propulsion',
      relativeBearing: 195, label: 'Shaft harmonic (own-ship)',
    });
    sonar.seed(MISSION2_PICTURE);
    state.settleNoise();

    rt.toast('Contact in the Noise',
      'You have the sonar watch on a routine transit. Build the picture: what is out there, what is aboard, and how sure are you of each?');
  },

  stages: [
    {
      id: 'man_sonar',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'Sonar',
      objective: 'Man a sonar console and look at the broadband picture.',
      hints: ['The three sonar consoles are along the sides of the sonar room. Press E on one.'],
      arm: (rt) => rt.onEvent('station:opened', 'Broadband up. Every vertical streak on the waterfall is energy on a bearing — nothing more than that yet.',
        (p) => p.stationId === 'sonar')(rt),
    },
    {
      id: 'quiet_ship',
      target: { interactable: 'engineering', compartment: 'machinery_control' },
      label: 'Quiet the Boat',
      objective: 'You cannot hear past your own boat. Get the self-noise floor under 48 dB — secure machinery you do not need at Machinery Control, or slow down.',
      hints: [
        'Every running pump is about 3 dB. The trim pump is doing nothing for you right now.',
        'Shaft rpm drives the floor too: order a slower speed at Ship Control.',
        'Machinery Control is aft, past berthing. The status line shows the floor as you change things.',
      ],
      arm: (rt) => {
        const check = () => {
          rt.bus.emit('mission:progress', {
            have: rt.state.sonarNoiseFloor < 48 ? 1 : 0, need: 1,
            detail: `Self-noise floor ${Math.round(rt.state.sonarNoiseFloor)} dB — needs to be under 48 dB`,
          });
          if (rt.state.sonarNoiseFloor < 48) {
            rt.complete('Floor down. A third source came up out of the noise the moment the boat got quiet — it was always there.');
            return true;
          }
          return false;
        };
        const id = setInterval(check, 700);
        return () => clearInterval(id);
      },
    },
    {
      id: 'designate',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'Hold the Picture',
      objective: 'Back at sonar: designate every source you can hear as a track (select it in the auto-detect list, then Designate). There are four.',
      hints: [
        'Click a row in the auto-detect list to select it, then press Designate.',
        'One of the four is not in the water at all. Designate it anyway — it is part of the picture.',
        'If you can only find three, the boat is still too loud.',
      ],
      arm: (rt) => {
        const check = () => {
          const n = rt.sonar.tracks.size;
          const audible = rt.sonar.audible().length;
          rt.bus.emit('mission:progress', { have: n, need: 4, detail: n < audible ? `${audible} audible, ${n} held` : null });
          if (n >= 4) rt.complete('Four tracks held. A track is a thing you keep looking at; a blip is a thing you noticed once.');
        };
        const off = rt.bus.on('sonar:trackDesignated', check);
        queueMicrotask(check);
        return off;
      },
    },
    {
      id: 'classify_merchant',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'The Merchant',
      objective: 'Classify the strong, steady track — and cite two INDEPENDENT displays for the call.',
      hints: [
        'The narrowband analyser shows its harmonic family: a blade line and its multiples. That is a ship with a screw.',
        'The waterfall, the auto-detect list and the bearing-time record are all fed by beamformer A. Citing two of them is citing one thing twice.',
        'Narrowband is a separate chain. So is turning the boat and watching the bearing.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('sonar:classified', (p) => {
          if (p.id !== 'S01') return;
          if (p.correct && p.independent) {
            rt.flags.merchantClean = true;
            rt.complete('Merchant, corroborated across two chains. The harmonic family named it; the second chain is what makes the call worth anything.');
          } else if (p.correct && !p.independent) {
            rt.flags.sharedChainCalls = (rt.flags.sharedChainCalls || 0) + 1;
          } else {
            rt.flags.wrongClass = (rt.flags.wrongClass || 0) + 1;
          }
        });
        return off;
      },
    },
    {
      id: 'classify_biologic',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'The Chorus',
      objective: 'Classify the near, low, wandering track.',
      hints: [
        'Look for what is NOT there: no blade rate, no harmonic family, and a bearing that will not sit still.',
        'Nothing with a propeller wanders in bearing like that at close range.',
      ],
      arm: (rt) => rt.onEvent('sonar:classified',
        'Biologics. The absence of a blade rate is evidence — a negative is a reading too.',
        (p) => p.id === 'S02' && p.correct)(rt),
    },
    {
      id: 'classify_ownship',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'Aboard, Not Abeam',
      objective: 'One track is not in the water. Find it and call it.',
      hints: [
        'Watch the bearing-time record: own-ship head has been wandering. Which track came round with it?',
        'A source aboard your own boat holds a constant RELATIVE bearing no matter what you steer.',
      ],
      arm: (rt) => {
        const offs = [
          rt.bus.on('sonar:classified', (p) => {
            if (p.id === 'N01' && p.correct) rt.complete('Own-ship. It never had a bearing rate because it never had anywhere to go.');
          }),
          rt.bus.on('sonar:anomalyClassified', (p) => {
            if (p.internal) rt.complete('Own-ship. It never had a bearing rate because it never had anywhere to go.');
          }),
        ];
        return () => offs.forEach((o) => o());
      },
    },
    {
      id: 'decline_uncertain',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'The One You Cannot Name',
      objective: 'The faint track will not support a classification. Log it honestly.',
      hints: [
        'Check the narrowband analyser on it: one line, no family. One line is not a signature.',
        '"Unknown" is a real answer. Guessing a class you cannot support is worse than admitting you cannot.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('sonar:classified', (p) => {
          if (p.id !== 'S03') return;
          if (p.correct) {
            rt.complete('Logged Unknown. One line without a family is a hint, not an identification — and a watch that guesses is a watch nobody can use.');
          } else {
            rt.flags.overclaimed = (rt.flags.overclaimed || 0) + 1;
            rt.toast('Over-claimed', 'You have named a class off a single uncertain line. Look at what the analyser actually resolved.');
          }
        });
        return off;
      },
    },
    {
      id: 'report_picture',
      target: { interactable: 'control', compartment: 'control_room' },
      label: 'Report',
      objective: 'Take the picture to Control: report the contact situation to the officer of the watch.',
      hints: ['Man Ship Control in the control room and use "Report a casualty to damage control" — the same circuit carries a contact report.'],
      arm: (rt) => rt.onEvent('dc:reported', 'Picture passed: one merchant opening slowly, biologics close aboard, one unidentified faint contact, and a noise of our own we have now accounted for.')(rt),
    },
    {
      id: 'file_report',
      label: 'Notebook',
      objective: 'Open the notebook (N) and file the watch report.',
      hints: ['Press N, then the Mission report tab.'],
      arm: (rt) => rt.onEvent('notebook:reportSubmitted', 'Watch report filed.')(rt),
    },
  ],

  scoring: (rt) => {
    const f = rt.flags;
    const parts = [];
    let score = 0;
    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    const solid = rt.sonar.solidTracks.length;
    add('Classification', Math.min(35, solid * 10), 35,
      `${solid} track${solid === 1 ? '' : 's'} called correctly and backed by two independent chains.`);

    const shared = f.sharedChainCalls || 0;
    add('Evidence independence', Math.max(0, 25 - shared * 8), 25,
      shared ? `${shared} call${shared > 1 ? 's' : ''} rested on a single processing chain.` : 'No call rested on one chain alone.');

    const over = f.overclaimed || 0;
    add('Restraint', Math.max(0, 20 - over * 7), 20,
      over ? `${over} attempt${over > 1 ? 's' : ''} to name a class the signature could not support.` : 'Declined to name the contact that could not be named.');

    const wrong = f.wrongClass || 0;
    add('Accuracy', Math.max(0, 10 - wrong * 5), 10, wrong ? `${wrong} misclassification.` : 'No misclassifications.');

    const hints = rt.hintsUsed || 0, skipped = rt.skipped || 0;
    add('Independence', Math.max(0, 10 - hints * 2 - skipped * 4), 10,
      [hints ? `${hints} hint${hints > 1 ? 's' : ''}` : null, skipped ? `${skipped} skipped` : null]
        .filter(Boolean).join('; ') || 'No hints taken, nothing skipped.');

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
