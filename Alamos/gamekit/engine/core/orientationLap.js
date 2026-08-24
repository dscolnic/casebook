// orientationLap.js — the two runs that teach the ground before the work does.
//
// `orientation.js` decides *whether* a site has two tiers and *which* areas are
// in each. This decides what happens because of it: a lap of the near ground
// before day 1, and a lap of the far ground on the unlock day, when the vehicles
// come out with it.
//
// ## The gates are the day's own stop positions
//
// Not authored, and not new geometry. `budgetForRoute` already walks the day's
// stops from the spawn to price the day, and the map already draws them; a lap
// puts a gate at each area's entry, which is the same point. Move a building and
// the lap follows it, for the same reason the budget does — and the alternative,
// a `gates:` list in site.js, is a second description of where the buildings are.
//
// It also sidesteps the mistake TRIAL has already made once: a gate resolved to a
// building's *centre* renders under the floor with its beacon inside the roof,
// and a solid collider between the player and all of them. An entry point is
// outside the door by construction, because it is where the player is put when
// they arrive.
//
// ## The lap is a tour, not a test
//
// TRIAL as a *format* grades the order — that is its whole subject, and its trap
// is that the correct order must not be the nearest-neighbour route. An
// orientation lap grades nothing. It cannot: the player has not been taught
// anything yet on day 1, and there is no science in "which of these six sheds is
// which". Every gate is lit, any order finishes it, and the reward is that the
// player now knows where things are.
//
// Which means it must also be **skippable**, and skipping must not be punished.
// A player on their second campaign knows the site. Refusing to let them past a
// tutorial is the kind of thing that makes somebody stop playing on day 1, and
// the day model has a rule about this already: there is always a free way
// forward.

import { tiersFor, unlockDay } from './orientation.js';
import { wantsTouch } from '../device.js';

/** Which lap, if any, is owed before this day. Null on every other day. */
export function lapDue(site, day, done = {}) {
  const tiers = tiersFor(site);
  if (!tiers.hasFar) return null;
  const unlock = unlockDay(site);
  if (day === 1 && !done.near) {
    return {
      tier: 'near',
      groups: tiers.near,
      unlocksVehicles: false,
      title: 'Walk the site before you start',
      why: 'You have not been here before. This is a lap of the buildings you will be '
        + 'working in this week — every one is lit, take them in any order, and the run '
        + 'ends when you have been to all of them.',
    };
  }
  if (day === unlock && !done.far) {
    return {
      tier: 'far',
      groups: tiers.far,
      unlocksVehicles: true,
      title: 'The far end of the site opens today',
      why: 'The rest of the site is a long way out, and the keys come out with it. '
        + 'This is a run to the outstations — take the vehicle, learn the route, and '
        + 'from today the calls can send you there.',
    };
  }
  return null;
}

/**
 * Build the lap's gates from the areas it covers.
 *
 * `entryFor(group)` is the caller's — `createDay` already has it, because it is
 * the same function the route budget walks and the map draws.
 */
export function gatesFor(lap, entryFor) {
  return (lap?.groups ?? [])
    .map((group) => {
      const p = entryFor(group);
      // `y` travels with the gate. On a stacked plan it is the only thing that
      // separates one gate from another: a lap of four floors is six gates at six
      // (x, z) that repeat on every floor.
      return p ? { id: group, x: p.x, z: p.z, y: p.y ?? 0, level: p.level ?? null } : null;
    })
    .filter(Boolean);
}

/**
 * How to get about, on the card of the run whose subject is getting about.
 *
 * The controls were written down in exactly one place — the Controls note in
 * Settings — and Settings is behind a button a player has no reason to press on
 * their first morning. The lap is the run that asks them to walk somewhere
 * before they have walked anywhere, so it is where the note belongs.
 *
 * Two versions, because there are two input paths and each describes controls
 * the other device does not have: WASD and a mouse to lock on a desktop, a
 * floating thumb stick and a pad of buttons on a tablet. `wantsTouch()` is the
 * same predicate `touch.js` builds the thumb layer from, so the card cannot
 * describe a layer that is not there — asking for a coarse pointer that cannot
 * hover rather than for a touch API, which a touchscreen laptop also answers.
 * It is false in Node and on a page with no browser, so the keyboard text is
 * what a headless render gets.
 */
export function controlsNoteHTML() {
  const body = wantsTouch()
    ? '<b>Left half of the screen</b> — put a thumb down anywhere and a ring appears under it;'
      + ' drag to walk, and half way out is half speed. <b>Right half</b> — drag to look about,'
      + ' and a tap that does not drag uses whatever is in the middle of the screen.'
      + ' <b>Use</b>, bottom right, is the same thing as a button: it opens the room, the person'
      + ' or the vehicle you are facing. <b>Run</b> latches — it stays on until you tap it again.'
      + ' <b>Climb</b> and <b>Descend</b> appear only when you are flying something.'
      + ' The <b>Map</b> is top right, and it is the only one of these that is not a thumb.'
    : '<b>W A S D</b> walk — W forward, S back, A and D sideways.'
      + ' <b>The mouse</b> looks about, and the game holds onto it until you press <b>Esc</b>.'
      + ' <b>Shift</b> runs. <b>E</b> uses whatever the crosshair is on — a door, a person, a'
      + ' vehicle. <b>M</b> opens the map, <b>Tab</b> the summary.';
  return `<div class="controlsHelp"><h4>Getting about</h4><p>${body}</p></div>`;
}

/**
 * The card that offers the lap.
 *
 * Two buttons, and `createDay` owns both: "Take the run" is primary because it
 * is what a first player should do, and "Pay $10 and get on with the day" exists
 * because a second player should not be made to walk ground they know to reach
 * the lessons. The price is the point — a free skip taught that the map was
 * optional, and the map is what the day is planned from.
 */
export function lapCardHTML(lap, vehicleNote) {
  // No note about grading or the clock. It was two sentences of mechanics on the
  // card whose whole job is the reason for the run — and the second half of the
  // day model's own rule is that the player finds out what a thing costs by
  // doing it, not by being told in advance that it costs nothing.
  //
  // The controls, on the two cards where a player might not have them yet: the
  // very first morning of the campaign, whichever run that is, and the lap —
  // which on a one-tier site is the second morning, because there is no far
  // ground to learn and the round leads instead. Every later run gets nothing:
  // a paragraph of controls on all seven is the tutorial this model refuses.
  const first = lap?.day === 1 || lap?.slot === 'trial-near';
  return `<p>${lap.why}</p>`
    + (lap.unlocksVehicles && vehicleNote ? `<p>${vehicleNote}</p>` : '')
    + (first ? controlsNoteHTML() : '');
}
