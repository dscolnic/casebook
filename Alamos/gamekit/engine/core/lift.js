// lift.js — the panel a stacked building is moved around in.
//
// `engine/world/interiorTower.js` puts four floor plates on one footprint and
// makes one of them active. This is the control that changes which: press E at
// the car, pick a floor, arrive. It is the only way up or down, which is what
// makes *which floor, in what order* the route decision that a corridor game
// gets from distance.
//
// Two things it deliberately does.
//
// **It names what is on every floor.** In a tower the plan card cannot help —
// four floors are the same rectangle, so a map of one is a map of all four, and
// the map only ever draws the floor you are standing on. The lift is the one
// place in the building where every floor is named at once, so it is the
// wayfinding: floor, what is on it, and whether the day has left a call open
// there. That is what a lift lobby directory is for in a real building.
//
// **The ride costs time, and says so before it is taken.** The clock exists to
// make the route a decision, and on one footprint every call is nine metres from
// every other: with a free lift the order they are taken in costs nothing and
// the day has no route in it at all. The charge is a lump, which is what the
// campaign clock was replaced for — but the objection to the old lumps was that
// the player could not see what a decision cost *until after making it*. The
// minutes are printed on the button.
//
// In a co-op room the countdown belongs to the server and this charge is
// ignored, the same as every other local charge. See `tickDay`.

/** How long a floor takes, in minutes of the day. */
export const MINUTES_PER_FLOOR = 1;

/**
 * @param opts {
 *   world,      the tower module: floorMenu(), setActiveFloor(id), activeFloorId()
 *   teleport,   (pos, yaw) -> void, from player.js
 *   charge,     (minutes) -> void; usually (m) => tickDay(m, 1)
 *   log,        (text) -> void, for the day log
 *   openGroups, () -> Set|string[] of group ids the day has open, for the badges
 * }
 */
export function createLift(opts){
  const overlay = document.getElementById('overlay');
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function close(){
    overlay.classList.remove('show');
    document.getElementById('modalBody').innerHTML = '';
  }

  function ride(id){
    const from = opts.world.activeFloorId();
    const menu = opts.world.floorMenu();
    const to = menu.find(f => f.id === id);
    if(!to || id === from) return;
    const mins = Math.abs(id - from) * MINUTES_PER_FLOOR;
    close();
    const landing = opts.world.setActiveFloor(id);
    if(landing) opts.teleport({ x: landing.x, y: landing.y, z: landing.z }, landing.yaw);
    if(mins > 0) opts.charge?.(mins);
    opts.log?.(`Rode to floor ${to.label} — ${to.name}.`);
  }

  function open(){
    const menu = opts.world.floorMenu();
    const here = menu.find(f => f.here);
    document.getElementById('modalEyebrow').textContent =
      here ? `Floor ${here.label} — ${here.name}` : '';
    document.getElementById('modalTitle').textContent = 'Lift';

    const rows = menu.map((f) => {
      const gap = here ? Math.abs(f.id - here.id) : 0;
      const mins = gap * MINUTES_PER_FLOOR;
      const calls = f.rooms.filter(r => r.open);
      const what = f.rooms.length
        ? f.rooms.map(r => esc(r.name)).join(' · ')
        : 'nothing open to you';
      return `<button class="btn liftBtn${f.here ? ' liftHere' : ''}" type="button"`
        + ` data-floor="${f.id}"${f.here ? ' disabled' : ''}>`
        + `<span class="liftNum">${esc(f.label)}</span>`
        + `<span class="liftWhat"><b>${esc(f.name)}</b><small>${what}</small></span>`
        + `<span class="liftCost">${f.here ? 'you are here'
            : calls.length ? `${calls.length} call${calls.length > 1 ? 's' : ''} open · ${mins} min`
            : `${mins} min`}</span>`
        + `</button>`;
    }).join('');

    document.getElementById('modalBody').innerHTML =
      '<div class="briefBox"><p>The car takes about a minute a floor, and the day '
      + 'is running while it does.</p></div>'
      + `<div class="liftPad">${rows}</div>`
      + `<div class="modalActions"><button class="btn" id="liftClose" type="button">Stay on this floor</button></div>`;
    overlay.classList.add('show');
    if(document.pointerLockElement) document.exitPointerLock();
    document.getElementById('liftClose').onclick = close;
    for(const b of document.querySelectorAll('.liftBtn')){
      b.onclick = () => ride(Number(b.dataset.floor));
    }
  }

  return { open, close, ride };
}
