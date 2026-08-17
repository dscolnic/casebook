// coopHUD.js — who else is in the room, and what they are on.
//
// The panel exists because of a rule this repo keeps: nothing draws through a
// wall except the cone over somebody the day wants. That is right — a second
// see-through marker and the first one stops meaning anything — but it leaves
// co-op with a real problem, which is that a teammate one bulkhead away is
// completely invisible. So the thing that says where everybody is is text: a
// bearing, a distance, and what they are doing.
//
// It is also the only place the claim table is visible. "Maya is on the flow
// gauge" is the whole of the co-op protocol, and if it is only ever said in a
// modal at the moment of collision, the player learns it by being refused.
import { esc } from './utils.js';
import { def } from './simulation.js';
import { getCurrentMission } from './simulation.js';

// The panel is text over a rendered scene and re-rendering it per frame is
// pointless — nobody reads a bearing that fast, and it is a full innerHTML.
const EVERY_MS = 400;

/**
 * @param opts {
 *   room,        the room module
 *   getState,
 *   getPosition, () -> Vector3, the player's own
 *   getYaw,      () -> radians, for the bearing
 * }
 */
export function createCoopHUD({ room, getState, getPosition, getYaw }){
  if(typeof document === 'undefined' || !room.isRoom()) return null;

  const el = document.createElement('div');
  el.className = 'coopPanel';
  document.body.appendChild(el);

  let last = 0;
  // Two sources, and both are needed. The socket is opened from index.html
  // BEFORE the entry point is imported — that ordering is what puts the room's
  // campaign in the slot in time — so by the time this panel exists the 'open'
  // event has already been and gone and no listener can catch it. The live flag
  // covers that; the listener covers everything that happens afterwards, which
  // is the half a flag cannot express (a wrong code is not a closed socket).
  let link = 'connecting';
  room.onLink((s) => { link = s.state; last = 0; });
  const linkState = () =>
    (link === 'unavailable' || link === 'wrong-theme') ? link
      : room.isConnected() ? 'open' : link;
  // A member list or a claim table that changed should show immediately rather
  // than up to four hundred milliseconds later — somebody arriving is exactly
  // the moment the panel is worth looking at.
  room.onMembers(() => { last = 0; });
  room.onClaims(() => { last = 0; });

  /**
   * Which call somebody has claimed, in the words the plan card uses.
   *
   * The claim key is `${week}-${stopIndex}`, so this is a lookup into today's
   * own mission rather than a label sent over the wire — the wire carries the
   * key, and the two clients may not agree on much else, but they are playing
   * the same book.
   */
  function doingOf(memberId){
    const state = getState();
    const m = state ? getCurrentMission(state) : null;
    if(!m) return null;
    for(const [key, claim] of Object.entries(room.allClaims())){
      if(claim.by !== memberId) continue;
      const [week, idx] = key.split('-');
      if(Number(week) !== state.week) continue;
      const stop = m.stops[Number(idx)];
      if(!stop) return 'answering';
      return def(stop.group)?.name ?? 'a call';
    }
    return null;
  }

  /** A compass arrow, relative to where the player is looking. */
  const ARROWS = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
  function bearing(from, to, yaw){
    // Screen-space, not world-space: an arrow that means "north" is useless to
    // somebody who does not know which way they are facing.
    const world = Math.atan2(to.x - from.x, to.z - from.z);
    let rel = world - (yaw + Math.PI);
    while(rel > Math.PI) rel -= Math.PI * 2;
    while(rel < -Math.PI) rel += Math.PI * 2;
    const i = Math.round(((rel + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 4)) % 8;
    return ARROWS[i];
  }

  function draw(){
    const me = room.me();
    const others = room.members();
    const from = getPosition();
    const yaw = getYaw();

    const rows = others.map((m) => {
      const doing = doingOf(m.id);
      const where = m.pos
        ? `${bearing(from, m.pos, yaw)} ${Math.round(Math.hypot(m.pos.x - from.x, m.pos.z - from.z))} m`
        : '—';
      return `<div class="coopWho"><i style="background:${esc(m.colour || '#6fc7d8')}"></i>`
        + `<b>${esc(m.name)}</b><span>${esc(where)}</span></div>`
        + (doing ? `<div class="coopDoing">on ${esc(doing)}</div>` : '');
    }).join('');

    const mine = me ? doingOf(me.id) : null;
    el.innerHTML = `<h5>Room ${esc(room.roomCode() ?? '')}</h5>`
      + (rows || `<div class="coopAlone">Nobody else here yet.</div>`)
      + (mine ? `<div class="coopDoing">you: ${esc(mine)}</div>` : '')
      + (() => { const s = linkState(); return `<div class="coopLink${s === 'open' ? ' hidden' : ''}">`
        + (s === 'closed' ? 'Disconnected — trying again…'
          : s === 'unavailable' ? 'No room server. Playing solo.'
          : s === 'wrong-theme' ? 'That room is playing a different game.'
          : 'Connecting…')
      + `</div>`; })();
  }

  return {
    el,
    /** Called from the frame loop; throttled internally. */
    update(nowMs = performance.now()){
      if(nowMs - last < EVERY_MS) return;
      last = nowMs;
      draw();
    },
    setVisible(v){ el.classList.toggle('hidden', !v); },
  };
}
