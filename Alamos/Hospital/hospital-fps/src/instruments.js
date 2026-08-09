// instruments.js — the working instrument in each department room, and the
// case that is live on it.
//
// The rooms were already furnished: a couch, a monitor, a lightbox, a bench of
// microscopes. But every screen was a flat emissive panel and no room held a
// situation, so walking in showed a well-made showroom rather than a shift in
// progress. This module gives each department room one station that is doing
// something:
//
//   · a display on the exterior wall, in view the moment you walk in, painted
//     by engine/world/screens.js — a moving trace, a panel of readings, or a
//     plate on a lightbox;
//   · a printed plate beside it naming the patient and why they are here;
//   · the spots where that patient and the department lead stand, so npcs.js
//     can put them in the room instead of the corridor.
//
// The case is not new content. The patient is a roster member from this room's
// division, and the line under their name is the first sentence of the bio
// that was written for them, so the room and the passage can never drift apart.
import * as THREE from 'three';
import { ROOMS, roomBounds } from './plan.js';
import { GROUP_DEFS } from './divisions.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { instrumentScreen, printedSheet } from '../../../gamekit/engine/world/screens.js';

/**
 * What each department's station is, and what it reads.
 *
 * These are instrument readings in a fictional hospital, not a diagnosis and
 * not advice. They exist so the room states a situation the player can look at
 * — the numbers are the subject of the science, never a verdict on a person.
 */
const STATIONS = {
  TRI: {
    kind: 'vitals', animated: true, wave: 'ecg', rate: 6, title: 'Triage bay 1',
    rows: [
      { label: 'Heart rate', value: 128, unit: 'per minute', status: 'high' },
      { label: 'Breathing',  value: 34,  unit: 'per minute', status: 'high' },
      { label: 'Oxygen',     value: 95,  unit: '% saturation', status: 'normal' },
    ],
    caption: 'Sort by how fast someone could get worse. Breathing first.',
  },
  RESP: {
    kind: 'vitals', animated: true, wave: 'resp', rate: 3, title: 'Respiratory monitor',
    status: 'low',
    rows: [
      { label: 'Oxygen',    value: 91, unit: '% saturation', status: 'low' },
      { label: 'Breathing', value: 28, unit: 'per minute', status: 'high' },
      { label: 'Peak flow', value: 62, unit: '% of their best', status: 'low' },
    ],
    caption: 'One reading is a moment. The trend across the shift is the story.',
  },
  NUTR: {
    kind: 'panel', title: 'Fluid balance',
    rows: [
      { label: 'Taken in, this shift', value: '250 mL', status: 'low' },
      { label: 'Lost, this shift',     value: '900 mL', status: 'alarm' },
      { label: 'Weight change',        value: '-0.9 kg', status: 'high' },
      { label: 'Temperature',          value: '37.4 °C', status: 'normal' },
    ],
    caption: 'The body cannot store spare water. What is lost has to be replaced.',
  },
  MOVE: {
    kind: 'film', title: 'Left forearm — two views', finding: true,
    note: 'Held still, taken in under a second. Dense bone stops the beam.',
    caption: 'The cast holds the ends still. The healing is the body’s work.',
  },
  BRAIN: {
    kind: 'vitals', animated: true, wave: 'eeg', rate: 2, title: 'Signals & senses',
    rows: [
      { label: 'Hearing, high notes', value: 45, unit: 'dB before heard', status: 'high' },
      { label: 'Hearing, low notes',  value: 15, unit: 'dB before heard', status: 'normal' },
      { label: 'Vision, left',        value: 6,  unit: '/12 line read', status: 'low' },
    ],
    caption: 'Hearing is not one thing. High notes and low notes are tested apart.',
  },
  DEF: {
    kind: 'panel', title: 'Infection board',
    rows: [
      { label: 'Temperature',       value: '38.6 °C', status: 'high' },
      { label: 'White cells',       value: 'raised',  status: 'high' },
      { label: 'Culture',           value: 'pending', status: 'low' },
      { label: 'Room precautions',  value: 'gown, gloves, mask', status: 'normal' },
    ],
    caption: 'Gown and gloves go on before the door, and come off inside it.',
  },
};

const stations = new Map();      // group id -> { screen, plate, room }

/** The first sentence of a bio, which is where every patient's situation is. */
function situationOf(person){
  const text = String(person?.bio || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const first = text.split(/(?<=[.?!])\s/)[0] || '';
  return first.length > 150 ? first.slice(0, 147) + '…' : first;
}

/**
 * Who this room's case is. Deterministic per room so the patient in the bed is
 * the same person every time you walk in, and so npcs.js and the station agree
 * without having to talk to each other.
 */
export function caseFor(groupId){
  const patients = HISTORIC_CHARACTERS.filter(
    c => c.division === groupId && /patient/i.test(c.role || ''));
  const staff = HISTORIC_CHARACTERS.filter(
    c => c.division === groupId && !/patient/i.test(c.role || ''));
  const seed = [...groupId].reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    patient: patients.length ? patients[seed % patients.length] : null,
    staff: staff.length ? staff[seed % staff.length] : null,
  };
}

/**
 * Where the two people in this room stand.
 *
 * Derived from the same room geometry the props were placed with, so the
 * patient lands on the couch or the trolley rather than beside it. npcs.js
 * imports this — one source of truth for "who is in this room and where".
 */
export function occupantSpots(){
  const out = {};
  for(const r of ROOMS){
    if(!r.group) continue;
    const b = roomBounds(r);
    const f = b.sign;
    const facing = f > 0 ? -Math.PI / 2 : Math.PI / 2;
    // The seated pose in npcs.js is calibrated for a 0.485 m chair seat, so a
    // patient on anything taller needs lifting by the difference or they sit
    // through the furniture. Couch pad 0.70, trolley mattress ~0.79, table 0.78.
    let patient, staff, lift = 0;
    switch(r.kind){
      case 'ed':                                        // on the first trolley
        patient = [b.xOuter - f * 0.9, r.z0 + 2.6, facing]; lift = 0.31;
        staff   = [b.xInner + f * 1.9, r.z0 + 3.6, -facing];
        break;
      case 'imaging':                                   // sitting up on the table
        patient = [b.cx + f * 0.4, r.z0 + 3.0, facing]; lift = 0.30;
        staff   = [b.xInner + f * 1.5, r.z0 + 4.4, -facing];
        break;
      case 'senses':                                    // in the test chair
        patient = [b.cx, r.z0 + 5.2, f > 0 ? Math.PI / 2 : -Math.PI / 2];
        staff   = [b.cx - f * 1.2, r.z0 + 3.8, facing];
        break;
      case 'lab':                                       // at the bench, not on it
        patient = [b.cx - f * 0.6, b.cz + 1.9, facing];
        staff   = [b.xOuter - f * 1.1, b.cz - 1.0, -facing];
        break;
      default:                                          // exam couch
        patient = [b.cx + f * 0.6, b.cz, facing]; lift = 0.22;
        staff   = [b.xInner + f * 1.6, b.cz + 1.1, -facing];
    }
    out[r.group] = { patient, staff, seatedPatient: r.kind !== 'lab', lift };
  }
  return out;
}

/**
 * Build every department station. Called once, from initWorld, after the rooms
 * and their props exist.
 */
export function buildStations(scene){
  for(const r of ROOMS){
    if(!r.group || !STATIONS[r.group]) continue;
    const gdef = GROUP_DEFS.find(g => g.id === r.group);
    const b = roomBounds(r);
    const f = b.sign;
    const ry = f > 0 ? -Math.PI / 2 : Math.PI / 2;
    const spec = { ...STATIONS[r.group] };
    const { patient } = caseFor(r.group);
    if(patient) spec.patient = patient.name;

    // The display goes on the exterior wall, centred on the room, because that
    // is what the player is looking at the instant they step through the door.
    // The corridor wall is behind them and the side walls are at the edge of
    // vision — a screen on either was a screen nobody ever saw.
    const screen = instrumentScreen(spec, { w: 512, h: 320 });
    const W = 1.12, H = W * (320 / 512);
    // Far enough off the wall plane to clear it: the partition is 0.18 thick
    // and centred on xOuter, so anything within 0.09 of it is inside the wall.
    // The first attempt used 0.06 and the screens were invisible in every room.
    const wallX = b.xOuter - f * 0.145;
    const zz = b.cz - 0.2;
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(W, H),
      new THREE.MeshStandardMaterial({
        map: screen.texture, roughness: 0.28, metalness: 0.0,
        // Emissive so the screen still reads as switched on in a room lit for
        // a hospital rather than for a photograph.
        emissive: 0xffffff, emissiveMap: screen.texture, emissiveIntensity: 0.55,
        envMapIntensity: 0.4,
      })
    );
    face.position.set(wallX, 1.72, zz);
    face.rotation.y = ry;
    scene.add(face);

    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, H + 0.07, W + 0.07),
      new THREE.MeshStandardMaterial({ color: 0x20262b, roughness: 0.5, metalness: 0.3 })
    );
    bezel.position.set(b.xOuter - f * 0.115, 1.72, zz);
    bezel.rotation.y = 0;
    scene.add(bezel);

    // The plate beside it: who this is, and why they are here. Paper, because
    // it is the one thing in the room that is about a person rather than a
    // measurement, and it should not look like another readout.
    const plate = printedSheet({
      accent: gdef?.color || '#47606f',
      tag: gdef?.code || '',
      title: 'Case',
      heading: patient ? patient.name : r.name,
      body: patient ? situationOf(patient) : '',
      footer: spec.caption || '',
    }, { w: 512, h: 320 });
    const PW = 0.62, PH = PW * (320 / 512);
    const sheet = new THREE.Mesh(
      new THREE.PlaneGeometry(PW, PH),
      new THREE.MeshStandardMaterial({ map: plate.texture, roughness: 0.6, envMapIntensity: 0.6 })
    );
    // Directly under the screen rather than beside it. Beside it put the plate
    // through the sharps bin in one room and the casework in another; under it
    // is clear in every room and reads as the caption to the screen anyway.
    sheet.position.set(wallX, 1.72 - H / 2 - PH / 2 - 0.07, zz);
    sheet.rotation.y = ry;
    scene.add(sheet);

    stations.set(r.group, { screen, plate, room: r, face, sheet });
  }
  return stations.size;
}

/** Per-frame. Only the animated screens do any work. */
export function updateInstruments(delta){
  for(const s of stations.values()) s.screen.update(delta);
}

/** Where to stand to read this room's station — used to aim the player on entry. */
export function stationLookAt(groupId){
  const s = stations.get(groupId);
  if(!s) return null;
  const b = roomBounds(s.room);
  return { x: b.xOuter, z: b.cz - 0.2 };
}

export function getStation(groupId){ return stations.get(groupId) || null; }
