// story.js — the Fenwick Coordinating Centre changing, mission by mission.
//
// The bible (../fpl_gpt/TRIAL.md) writes fifteen "Physical aftermath" blocks —
// one per mission, each with a home fixture, a Before, an After and a trigger —
// a §7.1 world-state ledger, three landmark-only spaces (the visitor alcove, the
// courier bay, the board antechamber) and a §8.1 finale in which the pack lies
// open before the board and the site wall shows what the board signed. Every one
// of those is a prop here, keyed to the mission that writes it.
//
// Every word on a slip or a panel is the bible's own: an After line, a Before
// line, a ledger cell, the mission header, a status word from the site-wall
// paragraph in §3. Place, props and motion are ours. See
// gamekit/STORY_DRESSING_PASS.md §0 for the pass this belongs to.
//
// ## How the campaign reaches a room in this world
//
// This building is `engine/world/interiorLevels.js`, built through
// `interiorSite.js`, whose fit-out hooks get no `stateHooks` — the outdoor world
// gives its props one, and `interiorBuilding.js` rooms get `applyState`, but a
// plan game's rooms are the shell itself and had no way to read the campaign.
// So `world.js` (this theme's own shim over the engine world) wraps
// `updateWorldFromState`: the engine's runs first, then `applyStoryState` below
// runs every hook the fit-out registered in `stateHooks`. Nothing in `engine/`
// changes. `props.js` calls `dressRoom` and `dressSpine` from its own hooks.
//
// Coordinates: the fit-out ctx's `scene` is the level's holder group, already at
// that floor's height, so y = 0 here is always the floor the room stands on.
import * as THREE from 'three';
import { animate, blink, patrol, scrollUV, flicker } from '../../engine/world/animators.js';
import { statusPanel, slip, missionsAccepted } from '../../engine/world/paper.js';
import { fixtureSpot } from '../../engine/world/interiorFixtures.js';
import { markWallMounted } from '../../engine/world/interiorKit.js';
import { FIXTURES } from './fixtures.js';
import { LANDMARKS } from './minors.js';

// ------------------------------------------------------------- the state hook

/** Every `(state, n, ctx)` the fit-out registered. `n` is missions accepted. */
export const stateHooks = [];

/**
 * Run from `world.js` after the engine's own `updateWorldFromState`. One hook
 * throwing must not take the rest of the building with it.
 */
export function applyStoryState(state, theme, extra = {}){
  if(!state) return;
  const n = missionsAccepted(state, theme);
  const day = Math.max(1, state.week ?? 1);
  const won = state.status === 'won' || n >= 15;
  for(const hook of stateHooks){
    try{ hook(state, n, { day, won, ...extra }); }
    catch(err){ console.warn('[the_trial_v2/story] state hook failed:', err); }
  }
}

/** Forget every hook — `initWorld` rebuilds the building and re-registers. */
export function resetStoryHooks(){ stateHooks.length = 0; }

// ------------------------------------------------------------------ helpers

/** The bible's mission header, verbatim: `MISSION 1 - 15 DAYS UNTIL THE BOARD MEETS.` */
const HEADER = (d) => {
  const m = Math.min(15, Math.max(1, d));
  const left = 16 - m;
  return `MISSION ${m} - ${left} DAY${left === 1 ? '' : 'S'} UNTIL THE BOARD MEETS.`;
};

let MATS = null;
const mats = () => (MATS ??= {
  card:   new THREE.MeshStandardMaterial({ color: 0xe6e0d0, roughness: 0.92 }),
  dark:   new THREE.MeshStandardMaterial({ color: 0x2e343a, roughness: 0.6, metalness: 0.2 }),
  steel:  new THREE.MeshStandardMaterial({ color: 0x8a9096, roughness: 0.4, metalness: 0.6 }),
  binder: new THREE.MeshStandardMaterial({ color: 0x1f4e6b, roughness: 0.7 }),
  folder: [0xb8352a, 0x2f8a4c, 0xc9962a].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 })),
  tray:   new THREE.MeshStandardMaterial({ color: 0x4e5a63, roughness: 0.55, metalness: 0.2 }),
  paper:  new THREE.MeshStandardMaterial({ color: 0xf1efe6, roughness: 0.9 }),
  cover:  new THREE.MeshStandardMaterial({ color: 0x23303a, roughness: 0.6 }),
  coat:   [0x3a3f48, 0x5b4a3a, 0x2f4a52, 0x6b6b6b, 0x4a3a5b, 0x3d5a3a, 0x7a4a3a]
    .map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 })),
  bag:    new THREE.MeshStandardMaterial({ color: 0x4a3a2c, roughness: 0.9 }),
  skin:   new THREE.MeshStandardMaterial({ color: 0x9c7a5a, roughness: 0.8 }),
  leaf:   new THREE.MeshStandardMaterial({ color: 0x3f7a45, roughness: 0.9 }),
  pot:    new THREE.MeshStandardMaterial({ color: 0x8a5a3a, roughness: 0.85 }),
  glass:  new THREE.MeshStandardMaterial({ color: 0xdfeaf0, roughness: 0.1, metalness: 0.05, transparent: true, opacity: 0.35 }),
  // Lamps. Text carries the state on every card (the bible: "no reliance on
  // color"); the colour is what reads from the far end of the corridor.
  lampOk:    new THREE.MeshStandardMaterial({ color: 0x2fd98c, emissive: 0x2fd98c, emissiveIntensity: 1.4, roughness: 0.4 }),
  lampAmber: new THREE.MeshStandardMaterial({ color: 0xffb02e, emissive: 0xffb02e, emissiveIntensity: 1.6, roughness: 0.4 }),
  lampRed:   new THREE.MeshStandardMaterial({ color: 0xe0453a, emissive: 0xe0453a, emissiveIntensity: 1.4, roughness: 0.4 }),
  lampOff:   new THREE.MeshStandardMaterial({ color: 0x3a3f45, emissive: 0x000000, roughness: 0.5 }),
  lampBlue:  new THREE.MeshStandardMaterial({ color: 0x5ab8ff, emissive: 0x5ab8ff, emissiveIntensity: 1.5, roughness: 0.4 }),
  sky:       new THREE.MeshStandardMaterial({ color: 0xc9d6de, emissive: 0xc9d6de, emissiveIntensity: 0.7, roughness: 0.15 }),
});

/** A box in a group, `(w, h, d, x, y, z, material, rotY)` — the fit-out ctx's own order. */
function bx(parent, w, h, d, x, y, z, material, rotY = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z); m.rotation.y = rotY;
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}
function cy(parent, r, h, x, y, z, material, rTop = r){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, r, h, 14), material);
  m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}

/** The fixtures a room's group declares, by id. */
function byId(group){
  const out = {};
  for(const f of FIXTURES[group] ?? []) if(f?.id) out[f.id] = f;
  return out;
}

/**
 * The frame the engine builds a room's fixtures in — an anchor at the room's
 * middle turned so local +z points out of the corridor — rebuilt here so a slip
 * pinned "beside the analysis board" lands beside the board the engine built.
 * See `buildInterior` in interiorSite.js.
 */
function anchorFor(room, ctx){
  const b = ctx.bounds;
  const g = new THREE.Group();
  g.position.set(b.cx, 0, b.cz);
  g.rotation.y = b.sign * Math.PI / 2;
  ctx.scene.add(g);
  const w = Math.abs(room.z1 - room.z0), d = Math.abs(b.xOuter - b.xInner);
  return { group: g, bounds: { w, d, x0: -w / 2, x1: w / 2, z0: -d / 2, z1: d / 2, wall: ctx.P.wall ?? 0.18, flip: 1 } };
}

/**
 * A point on the wall behind a fixture, `along` metres along that wall (in the
 * fixture's own left-to-right) and `y` up. Its own rather than
 * `fixturePlaces.wallPanel`, because that one lifts every back-wall panel to
 * y = 2.85 for rooms whose back wall carries screens — and this building's
 * ceiling is at 3.0, so a panel there is half inside the tiles.
 */
function wallAt(anchor, fixture, along = 0, y = 2.3){
  const s = fixtureSpot(anchor.bounds, fixture);
  const fx = Math.sin(s.yaw), fz = Math.cos(s.yaw);
  const lx = Math.cos(s.yaw), lz = -Math.sin(s.yaw);
  return { x: s.x - fx * 0.9 + lx * along, y, z: s.z - fz * 0.9 + lz * along, rotY: s.yaw, spot: s };
}

/** A hospital-visitor sized figure: a coat, a head, a stance. Nobody animated. */
function figure(parent, x, z, yaw, coat){
  const M = mats();
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = yaw;
  cy(g, 0.2, 1.05, 0, 0.55, 0, coat, 0.17);
  cy(g, 0.13, 0.22, 0, 1.2, 0, coat);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), M.skin); head.position.y = 1.5; g.add(head);
  for(const s of [-1, 1]) cy(g, 0.045, 0.6, s * 0.24, 0.85, 0.02, coat);
  parent.add(g);
  return g;
}

// ============================================================ the rooms

/**
 * Dress one room. Called from `props.js`'s `fitOutRoom` before the generic
 * furniture fills in. Returns `{ reserve, keepClear }` — wall rectangles and
 * floor circles the kit should stay off — so a notice does not land on the
 * evidence cabinet.
 */
export function dressRoom(id, room, ctx){
  const none = { reserve: [], keepClear: [] };
  if(!ctx?.scene || !ctx.bounds || !Number.isFinite(ctx.bounds.cx) || !ctx.P) return none;
  const { scene, bounds: b, hard, soft } = ctx;
  const M = mats();
  const f = b.sign;
  const F = byId(room.group);
  const anchor = anchorFor(room, ctx);
  const G = anchor.group;
  const reserve = [], keepClear = [];
  const hooks = [];

  /** A slip on the wall behind fixture `fid`, `along` metres over, `y` up. */
  const pin = (fid, along, y, spec) => {
    if(!F[fid]) return null;
    const p = wallAt(anchor, F[fid], along, y);
    return slip(G, { x: p.x, y: p.y, z: p.z, rotY: p.rotY, ...spec });
  };
  /** A status panel on the wall behind fixture `fid`. */
  const panel = (fid, along, y, spec) => {
    if(!F[fid]) return null;
    const p = wallAt(anchor, F[fid], along, y);
    return statusPanel(G, { x: p.x, y: p.y, z: p.z, rotY: p.rotY, w: 1.3, h: 0.6, lit: true, ...spec });
  };
  /** The After line of mission `m`, pinned by its home. Visible once accepted. */
  const after = (fid, m, text, along = 0.95, y = 2.32, extra = {}) => {
    const s = pin(fid, along, y, { w: 0.62, h: 0.34, text, pin: 'clip', visible: false, ...extra });
    if(s) hooks.push((state, n) => s.set({ visible: n >= m }));
    return s;
  };

  switch(id){
    // ------------------------------------------------ Regulatory & Registry
    case 'REG': {
      // M1 home. Before: "An empty board binder sits below the dated registry
      // pages." — a binder on a low shelf under the records wall, always.
      if(F['records-wall']){
        // +0.95 along, not −0.95: that side of this wall is the delivery board.
        const p = wallAt(anchor, F['records-wall'], 0.95, 1.05);
        bx(G, 0.5, 0.04, 0.26, p.x, p.y, p.z, M.steel, p.rotY);
        bx(G, 0.28, 0.32, 0.07, p.x, p.y + 0.18, p.z, M.binder, p.rotY);
      }
      after('records-wall', 1, 'Lena Wu clips the three registered claims to the first binder sleeve.', 0.95);
      // M13 home. Before (from M12): "ten claim slips crowd the registered-test
      // rail." Ten small slips on a rail above the claim ledger; then one of
      // them is stamped.
      const rail = F['claim-ledger'] ? wallAt(anchor, F['claim-ledger'], 0, 2.62) : null;
      const claims = [];
      if(rail){
        const lx = Math.cos(rail.rotY), lz = -Math.sin(rail.rotY);
        bx(G, 2.1, 0.03, 0.03, rail.x, rail.y + 0.12, rail.z, M.steel, rail.rotY);
        for(let i = 0; i < 10; i++){
          const a = -0.9 + i * 0.2;
          claims.push(slip(G, { x: rail.x + lx * a, y: rail.y, z: rail.z + lz * a, rotY: rail.rotY,
            w: 0.16, h: 0.2, text: [`${i + 1}`], pin: 'clip', visible: false, tilt: (i % 3 - 1) * 0.04 }));
        }
        hooks.push((state, n) => {
          claims.forEach((c, i) => c.set({ visible: n >= 12, stamp: n >= 13 && i === 6 ? 'EXPLORATORY' : '' }));
        });
      }
      after('claim-ledger', 13, 'Lena Wu stamps the unsupported marker claim EXPLORATORY.', -1.2, 2.2, { stamp: 'EXPLORATORY' });
      break;
    }

    // ------------------------------------------------ Adjudication Room
    case 'ADJUD': {
      // M1's next problem: "two flagged patient packets sit apart from the
      // ordinary files." Two FLAGGED cards on the wall above Amina's desk.
      const packets = [-0.55, -0.32].map(a => pin('adjudication-desk', a, 2.12,
        { w: 0.2, h: 0.26, text: ['FLAGGED'], tone: 'card', pin: true, visible: false }));
      hooks.push((state, n) => packets.forEach(p => p?.set({ visible: n >= 1 })));
      after('adjudication-desk', 2, 'Amina Okafor clips the MEDIAN AND MIDDLE-HALF SPREAD summary to the verified records.', 0.7);
      // M11's next problem / M12 home: three trays on a shelf under the matched
      // record table's wall, and the three labeled folders that go into them.
      const t = F['matched-record-table'] ? wallAt(anchor, F['matched-record-table'], 0, 1.24) : null;
      const trays = [], folders = [];
      if(t){
        const lx = Math.cos(t.rotY), lz = -Math.sin(t.rotY);
        const fx = Math.sin(t.rotY), fz = Math.cos(t.rotY);
        bx(G, 1.5, 0.04, 0.34, t.x + fx * 0.12, t.y, t.z + fz * 0.12, M.steel, t.rotY);
        for(let i = 0; i < 3; i++){
          const a = (i - 1) * 0.46;
          const tr = bx(G, 0.36, 0.08, 0.3, t.x + lx * a + fx * 0.12, t.y + 0.06, t.z + lz * a + fz * 0.12, M.tray, t.rotY);
          tr.visible = false; trays.push(tr);
          const fo = bx(G, 0.26, 0.03, 0.22, t.x + lx * a + fx * 0.12, t.y + 0.12, t.z + lz * a + fz * 0.12, M.folder[i], t.rotY);
          fo.visible = false; folders.push(fo);
        }
      }
      const pairs = panel('matched-record-table', 0, 2.45, { title: 'matched-record-table', big: '', small: '', tone: 'plain' });
      if(pairs) pairs.visible = false;
      hooks.push((state, n) => {
        trays.forEach(tr => { tr.visible = n >= 11; });
        folders.forEach(fo => { fo.visible = n >= 12; });
        if(pairs){
          pairs.visible = n >= 11;
          pairs.set(n >= 12
            ? { big: 'SEPARATE TRAYS', small: 'Amina Okafor places the three labeled test folders in separate trays.', tone: 'ok' }
            : { big: 'THREE TRAYS', small: 'Three trays hold three different kinds of record pairing.', tone: 'warn' });
        }
      });
      after('matched-record-table', 12, 'Amina Okafor places the three labeled test folders in separate trays.', 1.1, 2.2);
      break;
    }

    // ------------------------------------------------ Statistics & Analysis
    case 'STATS': {
      // The analysis board is home to two missions (4 and 10) and the "next
      // problem" of two more (3 and 9). One panel above it carries the state;
      // the envelope beside it is torn, then sealed.
      const ab = panel('analysis-board', 0, 2.5, { title: 'analysis-board', big: '', small: '', tone: 'plain' });
      if(ab) ab.visible = false;
      let env = null, flap = null, strip = null;
      if(F['analysis-board']){
        const p = wallAt(anchor, F['analysis-board'], 1.1, 2.15);
        const lx = Math.cos(p.rotY), lz = -Math.sin(p.rotY);
        env = bx(G, 0.34, 0.22, 0.012, p.x, p.y, p.z, M.card, p.rotY);
        env.visible = false;
        // The flap: hinged along the envelope's top edge, hanging open when torn.
        flap = bx(G, 0.34, 0.12, 0.01, p.x, p.y + 0.11, p.z, M.card, p.rotY);
        flap.geometry = flap.geometry.clone().translate(0, -0.06, 0);
        flap.rotation.x = 0.9; flap.visible = false;
        strip = slip(G, { x: p.x + lx * 0.02, y: p.y - 0.02, z: p.z + lz * 0.02, rotY: p.rotY,
          w: 0.3, h: 0.1, text: ['DISCLOSED'], sub: 'Lena Wu', pin: false, visible: false });
      }
      hooks.push((state, n) => {
        if(env){ env.visible = n >= 3; flap.visible = n >= 3; flap.rotation.x = n >= 4 ? 0 : 0.9; }
        strip?.set({ visible: n >= 4 });
        if(!ab) return;
        ab.visible = n >= 3;
        if(n >= 10) ab.set({ big: 'FOUR UNITS', small: 'Tomas Reed redraws the benefit line at FOUR UNITS.', tone: 'ok', struck: false });
        else if(n >= 9) ab.set({ big: 'the old large benefit', small: 'still chalked above the new paired records', tone: 'warn', struck: true });
        else if(n >= 4) ab.set({ big: 'DISCLOSED', small: 'Tomas Reed seals the opened analysis envelope with a signed DISCLOSED strip.', tone: 'ok', struck: false });
        else ab.set({ big: 'unplanned analysis', small: 'A torn envelope lies beside the unplanned analysis timestamp.', tone: 'alert', struck: false });
      });
      after('analysis-board', 4, 'Tomas Reed seals the opened analysis envelope with a signed DISCLOSED strip.', -1.1, 2.15);
      after('analysis-board', 10, 'Tomas Reed redraws the benefit line at FOUR UNITS.', -1.1, 2.55);
      break;
    }

    // ------------------------------------------------ Monitors’ Room
    case 'MONITOR': {
      // The enrollment wall — the bible's site wall keeps this fixture id. The
      // big wall of cards is on the working floor's corridor (dressSpine); the
      // fixture itself carries the two sites' state in words.
      const ew = panel('enrollment-wall', 0, 2.45, { title: 'enrollment-wall', big: '31 SITES', small: '', tone: 'plain', w: 1.5, h: 0.7 });
      hooks.push((state, n) => {
        if(!ew) return;
        if(n >= 15) ew.set({ big: 'SITE 12: CLEARED FOLLOW-UP / SAFEGUARDS ACTIVE', small: 'SITE 19: PAUSED / RELEASE CHECKS PENDING', tone: 'ok' });
        else if(n >= 14) ew.set({ big: 'SITE 12: LIMITED FOLLOW-UP AUTHORIZED', small: 'SITE 19: PAUSED', tone: 'warn' });
        else if(n >= 3) ew.set({ big: 'SITE 12 AND SITE 19: PAUSED', small: '', tone: 'alert' });
        else if(n >= 2) ew.set({ big: 'HOSPITAL 12 · HOSPITAL 19', small: 'FLAGGED', tone: 'warn' });
        else ew.set({ big: '31 SITES', small: '', tone: 'plain' });
      });
      // M5 home: the fast-site card, the travel roster the visiting investigator
      // grips beneath it (M4's next problem), and the NARROW SAMPLE finding
      // pinned beside the card.
      const fast = pin('site-comparison-board', 1.1, 2.3, { w: 0.34, h: 0.24, text: ['fast-site card'], tone: 'card' });
      void fast;
      const roster = pin('site-comparison-board', 1.1, 2.02, { w: 0.34, h: 0.18, text: ['travel roster'], pin: 'clip', visible: false });
      const narrow = pin('site-comparison-board', 0.7, 2.3, { w: 0.34, h: 0.24, text: ['NARROW SAMPLE'], visible: false });
      hooks.push((state, n) => { roster?.set({ visible: n >= 4 }); narrow?.set({ visible: n >= 5 }); });
      after('site-comparison-board', 5, 'Eli Navarro pins the NARROW SAMPLE finding beside the fast-site card.', -1.05, 2.32);
      // M6's next problem: "unanswered query slips hang at the ends of the
      // longest cords." Four slips on cords above the query map; M7 pins the rota.
      const cords = [];
      if(F['query-map']){
        const p = wallAt(anchor, F['query-map'], 0, 2.62);
        const lx = Math.cos(p.rotY), lz = -Math.sin(p.rotY);
        for(let i = 0; i < 4; i++){
          const a = -0.75 + i * 0.5;
          const cord = bx(G, 0.01, 0.34, 0.01, p.x + lx * a, p.y - 0.17, p.z + lz * a, M.dark, p.rotY);
          cord.visible = false;
          const s = slip(G, { x: p.x + lx * a, y: p.y - 0.42, z: p.z + lz * a, rotY: p.rotY,
            w: 0.14, h: 0.18, text: ['?'], pin: false, visible: false, tilt: (i % 2 ? 1 : -1) * 0.08 });
          cords.push({ cord, s });
        }
        hooks.push((state, n) => cords.forEach(({ cord, s }) => { cord.visible = n >= 6; s.set({ visible: n >= 6 }); }));
      }
      after('query-map', 7, 'Eli Navarro pins the distance-band follow-up rota to the query map.', 1.1, 2.2);
      // Extra: a pager on its charger by the door, its light blinking.
      {
        const px = b.xInner + f * (ctx.P.wall / 2 + 0.03);
        const pz = room.z0 + 1.0;
        const charger = bx(scene, 0.05, 0.16, 0.1, px, 1.25, pz, M.dark);
        const led = bx(scene, 0.012, 0.02, 0.02, px + f * 0.02, 1.31, pz + 0.03, M.lampRed.clone());
        markWallMounted([charger, led], true, f, 'pager charger');
        animate(blink(led.material, 2.4, 0.06, { on: 2.5, off: 0.05 }));
        reserve.push([px - 0.3, px + 0.3, pz - 0.3, pz + 0.3]);
      }
      break;
    }

    // ------------------------------------------------ Kit Warehouse & Cold Room
    case 'KIT': {
      // The randomisation board (M6 home) stands where props.js builds the cold
      // room, so its papers go on the outer wall just south of it, above the
      // racking: M5's next problem and M6's After.
      const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.05);
      const wr = f > 0 ? -Math.PI / 2 : Math.PI / 2;      // facing back into the room
      const map = slip(scene, { x: wx, y: 2.55, z: room.z0 + 5.0, rotY: wr, w: 0.5, h: 0.34, text: ['map of the missing rural routes'], visible: false });
      const plan6 = slip(scene, { x: wx, y: 2.55, z: room.z0 + 5.65, rotY: wr, w: 0.62, h: 0.34, pin: 'clip', visible: false,
        text: 'Priya Shah pins the revised within-group assignment plan beside the screening budget.' });
      hooks.push((state, n) => { map.set({ visible: n >= 5 }); plan6.set({ visible: n >= 6 }); });
      reserve.push([b.xOuter - f * 0.6, b.xOuter + f * 0.3, room.z0 + 4.4, room.z0 + 6.2]);
      // M9 home, the blind ledger: two unequal survey columns, then the seal.
      const bl = panel('blind-ledger', 0, 2.45, { title: 'blind-ledger', big: '', small: '', tone: 'plain' });
      if(bl) bl.visible = false;
      hooks.push((state, n) => {
        if(!bl) return;
        bl.visible = n >= 8;
        bl.set(n >= 9
          ? { big: 'CONCEALMENT AUDIT INTACT', small: 'Priya Shah clips the CONCEALMENT AUDIT INTACT seal beside the guess results.', tone: 'ok' }
          : { big: 'two unequal survey columns', small: 'An intact kit sequence lies beside two unequal survey columns.', tone: 'warn' });
      });
      after('blind-ledger', 9, 'Priya Shah clips the CONCEALMENT AUDIT INTACT seal beside the guess results.', 1.1, 2.2);
      // M8 home is `exposure-logger`, a fixture the bible files under the cold
      // room and no group builds — so it lives on the cold room's own door face,
      // which props.js builds at (xOuter − 3.3f, z1 − 3.8). The log panel, the
      // kit release hook, and the QUARANTINED COHORT tag that hangs on it.
      {
        const cx = b.xOuter - f * 3.3 - f * 0.08;
        const cz = room.z1 - 2.6;
        const log = statusPanel(scene, { x: cx, y: 1.95, z: cz + 0.9, rotY: wr, w: 1.0, h: 0.55, lit: true,
          title: 'exposure-logger', big: '', small: '', tone: 'plain' });
        log.visible = false;
        const hook = cy(scene, 0.012, 0.09, cx, 1.55, cz + 1.55, M.steel);
        hook.rotation.x = Math.PI / 2;
        const tag = slip(scene, { x: cx, y: 1.38, z: cz + 1.55, rotY: wr, w: 0.26, h: 0.3, text: ['QUARANTINED', 'COHORT'], tone: 'card', pin: true, visible: false });
        hooks.push((state, n) => {
          log.visible = n >= 7;
          log.set(n >= 8
            ? { big: 'QUARANTINED COHORT', small: 'Amina Okafor hangs a QUARANTINED COHORT tag on the kit release hook.', tone: 'warn' }
            : { big: 'warm span', small: 'The cold-room log shows a warm span beside a stack of sealed boxes.', tone: 'alert' });
          tag.set({ visible: n >= 8 });
        });
      }
      break;
    }

    // ------------------------------------------------ Monitoring Board Room
    case 'BOARD': {
      // M2's next problem → M3 home: two hospital cards blink amber on the site
      // display above the event console; then the PAUSED card slides into the
      // console rail.
      const amber = M.lampAmber.clone();
      const cards = [];
      if(F['event-console']){
        const p = wallAt(anchor, F['event-console'], 0, 2.45);
        const lx = Math.cos(p.rotY), lz = -Math.sin(p.rotY);
        for(const [a, label] of [[-0.25, '12'], [0.25, '19']]){
          const s = slip(G, { x: p.x + lx * a, y: p.y, z: p.z + lz * a, rotY: p.rotY, w: 0.24, h: 0.2, text: [label], pin: false, visible: false });
          const lamp = bx(G, 0.06, 0.06, 0.03, p.x + lx * a, p.y + 0.15, p.z + lz * a, amber, p.rotY);
          lamp.visible = false;
          cards.push({ s, lamp });
        }
        bx(G, 1.2, 0.03, 0.05, p.x, p.y - 0.27, p.z, M.steel, p.rotY);      // the console rail
      }
      const paused = pin('event-console', 0, 2.31, { w: 0.62, h: 0.24, text: ['SITE 12 AND SITE 19: PAUSED'], pin: false, tone: 'card', visible: false });
      let blinking = true;
      animate((t) => { amber.emissiveIntensity = blinking ? ((t % 1.2) < 0.5 ? 2.2 : 0.15) : 1.4; });
      hooks.push((state, n) => {
        cards.forEach(({ s, lamp }) => { s.set({ visible: n >= 2 }); lamp.visible = n >= 2; });
        blinking = n < 3;
        paused?.set({ visible: n >= 3 });
      });
      after('event-console', 3, 'Jonas Berg slides the SITE 12 AND SITE 19: PAUSED card into the console rail.', 1.2, 2.2);
      // M13's next problem → M14 home → the §8.1 decision: the trigger rail.
      const tr = panel('trigger-rail', 0, 2.5, { title: 'trigger-rail', big: '', small: '', tone: 'plain', w: 1.5, h: 0.7 });
      if(tr) tr.visible = false;
      hooks.push((state, n, x) => {
        if(!tr) return;
        tr.visible = n >= 13;
        if(x.won) tr.set({ big: 'CONTINUE WITH SAFEGUARDS', small: 'The decision reads CONTINUE WITH SAFEGUARDS.', tone: 'ok' });
        else if(n >= 14) tr.set({ big: 'bounded follow-up order', small: 'Jonas Berg clips the bounded follow-up order onto the prewritten trigger rail.', tone: 'warn' });
        else tr.set({ big: 'stop mark', small: 'The benefit sheet passes while the harm band still touches the stop mark.', tone: 'alert' });
      });
      after('trigger-rail', 14, 'Jonas Berg clips the bounded follow-up order onto the prewritten trigger rail.', 1.25, 2.2);
      // The board pack, assembling page by page on the table props.js builds at
      // (−6, 77.6): a sheet a mission, and on the fifteenth the signed pack lies
      // open before the board.
      const tx = -6.0, tz = 77.6, top = 0.795;
      const pages = [];
      for(let i = 0; i < 15; i++){
        const pg = bx(scene, 0.21, 0.004, 0.3, tx - 1.1 + (i % 3) * 0.02, top + 0.003 + i * 0.004, tz - 0.25 + (i % 2) * 0.015, M.paper, (i % 3 - 1) * 0.03);
        pg.visible = false; pages.push(pg);
      }
      const pack = new THREE.Group(); pack.position.set(tx + 0.9, top, tz - 0.2); pack.visible = false; scene.add(pack);
      bx(pack, 0.23, 0.02, 0.32, -0.125, 0.01, 0, M.cover);
      bx(pack, 0.23, 0.02, 0.32, 0.125, 0.01, 0, M.cover);
      bx(pack, 0.21, 0.03, 0.3, -0.115, 0.035, 0, M.paper);
      bx(pack, 0.21, 0.03, 0.3, 0.115, 0.035, 0, M.paper);
      // M14's next problem: "two paused-site cards" on the wall behind the table,
      // and the §8.1 states they end on.
      const wz = room.z1 - ctx.P.wall / 2 - 0.05;
      const site12 = slip(scene, { x: tx - 1.9, y: 1.7, z: wz, rotY: Math.PI, w: 0.5, h: 0.34, text: ['SITE 12'], sub: 'PAUSED', visible: false });
      const site19 = slip(scene, { x: tx + 1.9, y: 1.7, z: wz, rotY: Math.PI, w: 0.5, h: 0.34, text: ['SITE 19'], sub: 'PAUSED', visible: false });
      reserve.push([tx - 2.3, tx + 2.3, room.z1 - 0.7, room.z1 + 0.3]);
      const packSlip = slip(scene, { x: tx + 1.25, y: 2.2, z: wz, rotY: Math.PI, w: 0.62, h: 0.34, pin: 'clip', visible: false,
        text: 'Jonas Berg sets the signed continuation pack on the board table.' });
      hooks.push((state, n, x) => {
        pages.forEach((pg, i) => { pg.visible = n >= i + 1 && !x.won; });
        pack.visible = x.won;
        packSlip.set({ visible: x.won });
        site12.set({ visible: n >= 14, sub: x.won ? 'CLEARED FOLLOW-UP / SAFEGUARDS ACTIVE' : 'PAUSED' });
        site19.set({ visible: n >= 14, sub: x.won ? 'PAUSED / RELEASE CHECKS PENDING' : 'PAUSED' });
      });
      // §8.1: "The board-room door opens onto the assembled monitoring board."
      // The leaf is the engine's, hung at (xInner, doorH/2, cz + dw/2); its
      // collider is the Box3 flagged `isDoor` in the world's list, handed to the
      // hook by world.js. Both are opened here; the door's own E still works.
      const op = ctx.opening;
      hooks.push((state, n, x) => {
        if(!x.won || !op) return;
        const leaf = scene.children.find(o => o.isGroup && o.children?.length
          && Math.abs(o.position.x - op.x) < 0.02 && Math.abs(o.position.z - (op.cz + op.dw / 2)) < 0.02);
        if(leaf) leaf.rotation.y = f * 1.42;
        const boxes = x.colliders ?? [];
        for(const c of boxes){
          if(!c?.isDoor || typeof c.makeEmpty !== 'function' || c.isEmpty()) continue;
          const cx = (c.min.x + c.max.x) / 2, cz = (c.min.z + c.max.z) / 2;
          if(Math.abs(cx - op.x) < 0.5 && Math.abs(cz - op.cz) < 1.2) c.makeEmpty();
        }
      });
      break;
    }

    // ------------------------------------------------ Trial Master File
    case 'ARCHIVE': {
      // M11 home is `evidence-locker`, a fixture no group builds. The cabinet is
      // here, in the master file, against the far cross-wall outside the cage:
      // M10's next problem sets three matching reports on a table in front of it
      // beside an independent file hash; M11 puts them inside and closes the
      // door with its dated lock seal.
      const cx = b.xInner + f * 1.2, cz = room.z1 - ctx.P.wall / 2 - 0.36;
      bx(scene, 0.9, 1.9, 0.5, cx, 0.95, cz, M.dark);
      for(const sy of [0.45, 0.95, 1.45]) bx(scene, 0.8, 0.02, 0.42, cx, sy, cz, M.steel);
      hard(cx, cz, 0.95, 0.55, 1.9);
      // The leaf, hinged on the corridor side, standing open until mission 11.
      const hingeX = cx - f * 0.44, faceZ = cz - 0.26;
      const leaf = new THREE.Group(); leaf.position.set(hingeX, 0.95, faceZ); scene.add(leaf);
      const panelMesh = bx(leaf, 0.86, 1.86, 0.03, f * 0.44, 0, 0, M.dark);
      void panelMesh;
      bx(leaf, 0.03, 0.2, 0.03, f * 0.8, 0, -0.03, M.steel);
      const OPEN = f * 1.3;
      leaf.rotation.y = OPEN;
      let want = OPEN;
      animate((t, dt) => { leaf.rotation.y += (want - leaf.rotation.y) * Math.min(1, (dt ?? 0.016) * 2.6); });
      const seal = slip(scene, { x: cx + f * 0.1, y: 1.3, z: faceZ - 0.02, rotY: Math.PI, w: 0.22, h: 0.12, text: ['dated lock seal'], pin: false, visible: false, tone: 'card' });
      // Inside: the reports go in when the cabinet closes.
      const inside = [0, 1, 2].map(i => { const m = bx(scene, 0.22, 0.05, 0.3, cx - 0.26 + i * 0.26, 0.98, cz, M.paper); m.visible = false; return m; });
      // The table in front, and what sits on it before the lock.
      const tz = cz - 1.05;
      bx(scene, 0.8, 0.05, 0.5, cx, 0.74, tz, M.steel);
      for(const sx of [-0.35, 0.35]) for(const sz of [-0.2, 0.2]) bx(scene, 0.04, 0.72, 0.04, cx + sx, 0.36, tz + sz, M.dark);
      hard(cx, tz, 0.85, 0.55, 0.78);
      const reports = [0, 1, 2].map(i => { const m = bx(scene, 0.22, 0.03, 0.3, cx - 0.26 + i * 0.26, 0.78, tz, M.paper); m.visible = false; return m; });
      const hash = slip(scene, { x: cx + f * 0.55, y: 1.7, z: room.z1 - ctx.P.wall / 2 - 0.05, rotY: Math.PI, w: 0.34, h: 0.2, text: ['independent file hash'], visible: false });
      const closed = slip(scene, { x: cx - f * 0.75, y: 1.7, z: room.z1 - ctx.P.wall / 2 - 0.05, rotY: Math.PI, w: 0.62, h: 0.34, pin: 'clip', visible: false,
        text: 'Lena Wu closes the evidence cabinet with its dated lock seal.' });
      hooks.push((state, n) => {
        reports.forEach(r => { r.visible = n >= 10 && n < 11; });
        inside.forEach(r => { r.visible = n >= 11; });
        hash.set({ visible: n >= 10 });
        want = n >= 11 ? 0 : OPEN;
        seal.set({ visible: n >= 11 });
        closed.set({ visible: n >= 11 });
      });
      reserve.push([cx - 1.3, cx + 1.3, room.z1 - 1.6, room.z1 + 0.3]);
      keepClear.push({ x: cx, z: cz - 0.6, r: 1.4 });
      break;
    }

    // ------------------------------------------------ Goods In: the courier bay
    case 'GOODS': {
      // §3 landmark `courier-bay`. Before: "Sealed hospital cases wait on
      // separate shelves." After Stop 32: "the exposed-kit shelf carries
      // QUARANTINED; its boxes stay there until their own release checks pass."
      const L = LANDMARKS['courier-bay'];
      const sz = room.z1 - ctx.P.wall / 2 - 0.3;
      const sx = b.xInner + f * 4.5;
      for(const sy of [0.4, 0.95, 1.5]) bx(scene, 2.6, 0.04, 0.46, sx, sy, sz, M.steel);
      for(const dx of [-1.3, 1.3]) bx(scene, 0.05, 1.6, 0.46, sx + dx, 0.8, sz, M.dark);
      for(let i = 0; i < 12; i++){
        const shelf = (i / 4) | 0, k = i % 4;
        bx(scene, 0.5, 0.36, 0.38, sx - 0.9 + k * 0.6, [0.4, 0.95, 1.5][shelf] + 0.2, sz, M.card);
      }
      hard(sx, sz, 2.7, 0.55, 1.7);
      const q = slip(scene, { x: sx, y: 1.85, z: sz - 0.24, rotY: Math.PI, w: 0.5, h: 0.24, text: ['QUARANTINED'], tone: 'card', visible: false });
      const before = slip(scene, { x: sx + 1.0, y: 2.2, z: room.z1 - ctx.P.wall / 2 - 0.05, rotY: Math.PI, w: 0.62, h: 0.3, text: L.before, pin: 'clip' });
      hooks.push((state, n) => { q.set({ visible: n >= 8 }); before.set({ text: n >= 8 ? L.after : L.before }); });
      reserve.push([sx - 1.6, sx + 1.6, room.z1 - 0.8, room.z1 + 0.3]);
      keepClear.push({ x: sx, z: sz - 0.5, r: 1.6 });
      break;
    }

    // ------------------------------------------------ Screening: the visitor alcove
    case 'SCREEN': {
      // §3 landmark `visitor-alcove`. Before: "A travel bag rests beside a
      // hospital visitor badge." After Stop 16, Dr. Samira Holt arrives from the
      // fast site; after Stop 20, her blank rural route map has a signed audit plan.
      const L = LANDMARKS['visitor-alcove'];
      const wx = b.xInner + f * (ctx.P.wall / 2 + 0.03);
      const az = room.z1 - 0.9;
      const bench = bx(scene, 0.45, 0.06, 1.3, wx + f * 0.35, 0.46, az, M.steel);
      void bench;
      for(const dz of [-0.55, 0.55]) bx(scene, 0.4, 0.44, 0.06, wx + f * 0.35, 0.22, az + dz, M.dark);
      hard(wx + f * 0.35, az, 0.5, 1.4, 0.5);
      bx(scene, 0.4, 0.3, 0.24, wx + f * 0.35, 0.64, az + 0.3, M.bag);                    // the travel bag
      bx(scene, 0.22, 0.04, 0.03, wx + f * 0.35, 0.81, az + 0.3, M.steel);
      const badge = slip(scene, { x: wx + f * 0.02, y: 1.25, z: az - 0.3, rotY: f > 0 ? -Math.PI / 2 : Math.PI / 2, w: 0.14, h: 0.18, text: ['hospital', 'visitor badge'], tone: 'card', pin: 'clip' });
      void badge;
      const holt = figure(scene, wx + f * 1.1, az + 0.1, f > 0 ? Math.PI / 2 : -Math.PI / 2, M.coat[2]);
      holt.visible = false;
      soft(wx + f * 1.1, az + 0.1, 0.35);
      const map = slip(scene, { x: wx + f * 0.02, y: 1.7, z: az + 0.2, rotY: f > 0 ? -Math.PI / 2 : Math.PI / 2, w: 0.5, h: 0.34, text: ['rural route map'], visible: false });
      const before = slip(scene, { x: wx + f * 0.02, y: 1.7, z: az - 0.5, rotY: f > 0 ? -Math.PI / 2 : Math.PI / 2, w: 0.62, h: 0.3, text: L.before, pin: 'clip' });
      hooks.push((state, n) => {
        holt.visible = n >= 4 && n < 6;
        map.set({ visible: n >= 4, text: n >= 5 ? ['signed audit plan'] : ['rural route map'], stamp: n >= 5 ? 'SIGNED' : '' });
        before.set({ text: n >= 5 ? L.after2 : n >= 4 ? L.after1 : L.before });
      });
      reserve.push([b.xInner - 0.3, b.xInner + f * 1.8, az - 1.0, room.z1 + 0.3]);
      keepClear.push({ x: wx + f * 0.7, z: az, r: 1.6 });
      break;
    }

    // ------------------------------------------------ Kitchen: the coffee machine
    case 'TEA': {
      // Extra: a coffee machine on the counter props.js builds at x = −9.35,
      // its ready light slowly breathing.
      const mx = -9.3, mz = room.z0 + 0.5;
      bx(scene, 0.3, 0.38, 0.34, mx, 1.13, mz, M.dark);
      bx(scene, 0.2, 0.06, 0.2, mx, 0.97, mz + 0.12, M.steel);
      const led = bx(scene, 0.02, 0.02, 0.02, mx + 0.16, 1.24, mz - 0.08, M.lampBlue.clone());
      animate(flicker(led.material, 1.4, 0.9, 0.7));
      break;
    }
    default: break;
  }

  stateHooks.push(...hooks);
  return { reserve, keepClear };
}

// ============================================================ the corridor

/**
 * Dress one level's corridor. Called from `props.js`'s `fitOutSpine` BEFORE
 * `furnishCorridor`, and returns `{ taken, keepClear }` — spine spans and floor
 * circles the corridor kit must stay off — so a fire notice does not land on
 * the site wall.
 */
export function dressSpine(ctx){
  const { plan, P, scene } = ctx;
  const M = mats();
  const sp = plan.spine ?? { z0: -8, z1: 22 };
  const hw = plan.metrics?.corridorHalfWidth ?? 2.0;
  const onFace = hw - P.wall / 2 - 0.03;
  const taken = [], keepClear = [];
  const hooks = [];

  // ---------------------------------------- level 1: the site wall
  //
  // "Extend enrollment-wall as the site wall": one card per hospital, a lamp on
  // each, on the working floor's west wall between the Statistics door and the
  // kitchen — the stretch the player walks every morning. Above it, the clock:
  // the bible's mission header, verbatim, counting the board meeting down.
  if(sp.z0 >= 27 && sp.z0 < 55){
    const x = -onFace, z = 47.6, rotY = Math.PI / 2;
    const back = bx(scene, 0.04, 1.42, 3.1, x, 1.75, z, M.dark);
    markWallMounted([back], true, 1, 'site wall');
    const header = statusPanel(scene, { x: x + 0.05, y: 2.72, z, rotY, w: 3.0, h: 0.42, lit: true,
      title: 'enrollment-wall', big: HEADER(1), tone: 'plain' });
    const lamps = [], cards = [];
    for(let i = 0; i < 31; i++){
      const col = i % 8, row = (i / 8) | 0;
      const cz = z - 1.3 + col * 0.36, cy2 = 2.25 - row * 0.32;
      cards.push(slip(scene, { x: x + 0.035, y: cy2, z: cz, rotY, w: 0.3, h: 0.26, text: [`${i + 1}`], sub: 'enrolling', pin: false }));
      lamps.push(bx(scene, 0.025, 0.05, 0.05, x + 0.05, cy2 + 0.1, cz + 0.11, M.lampOk));
    }
    const amber = M.lampAmber.clone();
    let blinking = false;
    animate((t) => { amber.emissiveIntensity = blinking ? ((t % 1.2) < 0.5 ? 2.2 : 0.15) : 1.6; });
    const set = (i, mat, sub) => { lamps[i].material = mat; cards[i].set({ sub }); };
    hooks.push((state, n, s) => {
      header.set({ big: HEADER(s.day), tone: s.won ? 'ok' : s.day >= 13 ? 'warn' : 'plain' });
      blinking = n === 2;
      for(const i of [11, 18]){
        if(n < 2){ set(i, M.lampOk, 'enrolling'); continue; }
        if(n < 3){ set(i, amber, 'FLAGGED'); continue; }
        if(i === 11 && s.won){ set(i, M.lampOk, 'CLEARED FOLLOW-UP / SAFEGUARDS ACTIVE'); continue; }
        if(i === 11 && n >= 14){ set(i, amber, 'LIMITED FOLLOW-UP AUTHORIZED'); continue; }
        if(i === 18 && s.won){ set(i, M.lampRed, 'PAUSED / RELEASE CHECKS PENDING'); continue; }
        set(i, M.lampRed, 'PAUSED');
      }
    });
    taken.push({ side: 'w', z0: 45.6, z1: 49.6 });
    keepClear.push({ x: -1.4, z: 47.6, r: 2.4 });
  }

  storyExtras(ctx, { taken, keepClear });
  stateHooks.push(...hooks);
  return { taken, keepClear };
}

// ============================================================ alive, no campaign

/**
 * The building running: a printer, a trolley, a clock, rain on the end window,
 * a plant, coat hooks that fill on the last two days. Called per level from
 * `dressSpine`; `out.taken` / `out.keepClear` get what it hangs on the walls.
 */
export function storyExtras(ctx, out = { taken: [], keepClear: [] }){
  const { plan, P, scene, soft } = ctx;
  const M = mats();
  const sp = plan.spine ?? { z0: -8, z1: 22 };
  const hw = plan.metrics?.corridorHalfWidth ?? 2.0;
  const onFace = hw - P.wall / 2 - 0.03;
  const level = sp.z0 >= 55 ? 2 : sp.z0 >= 27 ? 1 : 0;

  if(level === 1){
    // The photocopier props.js parks at (1.56, 41.0) runs: a strip of print
    // scrolling out of its front, and a ready light.
    {
      const c = document.createElement('canvas'); c.width = 64; c.height = 256;
      const g = c.getContext('2d');
      g.fillStyle = '#f1efe6'; g.fillRect(0, 0, 64, 256);
      g.fillStyle = '#5b6a72';
      for(let y = 8; y < 256; y += 14) g.fillRect(8, y, 20 + (y * 7) % 28, 3);
      const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.14),
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
      strip.position.set(1.19, 0.86, 41.0); strip.rotation.y = -Math.PI / 2; strip.rotation.x = -0.35;
      scene.add(strip);
      animate(scrollUV(tex, 0, -0.6));
      const led = bx(scene, 0.01, 0.02, 0.02, 1.19, 1.0, 40.7, M.lampOk.clone());
      animate(blink(led.material, 1.6, 0.5, { on: 1.8, off: 0.2 }));
    }
    // A wall clock on the adjudication room's corridor wall, keeping real time.
    {
      const cx = onFace, cz = 30.6;
      const face = cy(scene, 0.22, 0.03, cx - 0.03, 2.3, cz, M.paper);
      face.rotation.z = Math.PI / 2;
      const rim = cy(scene, 0.235, 0.02, cx - 0.01, 2.3, cz, M.dark);
      rim.rotation.z = Math.PI / 2;
      markWallMounted([face, rim], true, -1, 'wall clock');
      const hour = bx(scene, 0.012, 0.11, 0.012, cx - 0.06, 2.3, cz, M.dark);
      const minute = bx(scene, 0.008, 0.17, 0.008, cx - 0.07, 2.3, cz, M.dark);
      hour.geometry = hour.geometry.clone().translate(0, 0.05, 0);
      minute.geometry = minute.geometry.clone().translate(0, 0.08, 0);
      animate(() => {
        const d = new Date();
        const mins = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
        // Facing −x, a hand at rotation.x = 0 points up; clockwise for the viewer is −x rotation.
        minute.rotation.x = -(mins % 60) / 60 * Math.PI * 2;
        hour.rotation.x = -(mins % 720) / 720 * Math.PI * 2;
      });
      out.taken.push({ side: 'e', z0: 30.1, z1: 31.1 });
    }
    // A records trolley on its rounds: down the corridor's east lane and back,
    // clear of the standing spots at x = ±1.4 and the copier at x ≥ 1.2.
    {
      const tr = new THREE.Group(); scene.add(tr);
      bx(tr, 0.42, 0.04, 0.62, 0, 0.32, 0, M.steel);
      bx(tr, 0.42, 0.04, 0.62, 0, 0.72, 0, M.steel);
      for(const sx of [-0.19, 0.19]) for(const sz of [-0.29, 0.29]) bx(tr, 0.02, 0.72, 0.02, sx, 0.4, sz, M.steel);
      for(let i = 0; i < 5; i++) bx(tr, 0.3, 0.06, 0.08, 0, 0.78, -0.22 + i * 0.1, M.binder);
      bx(tr, 0.34, 0.02, 0.5, 0, 0.36, 0, M.card);
      const y = 0;
      animate(patrol(tr, [{ x: 0.7, y, z: 30.5 }, { x: 0.7, y, z: 51.5 }, { x: 0.78, y, z: 51.5 }, { x: 0.78, y, z: 30.5 }], 0.9));
    }
  }

  if(level === 2){
    // Rain on the end window: the unblinded floor's north end is the one closed
    // end the corridor looks straight at, and it had no window in it. A pane,
    // registered as a light panel so it dims with the clock, and rain streaking
    // down it.
    {
      const zf = sp.z1 - P.wall / 2 - 0.05;
      const pane = bx(scene, 3.4, 1.9, 0.02, 0, 1.62, zf, M.sky);
      pane.castShadow = false;
      const fr = [];
      for(const sx of [-1.75, 1.75]) fr.push(bx(scene, 0.08, 2.06, 0.05, sx, 1.62, zf, M.steel));
      for(const sy of [-1.0, 1.0]) fr.push(bx(scene, 3.58, 0.08, 0.05, 0, 1.62 + sy, zf, M.steel));
      fr.push(bx(scene, 3.58, 0.05, 0.05, 0, 1.62, zf, M.steel));
      markWallMounted([pane, ...fr], false, -1, 'end window');
      ctx.lightPanels?.push(pane);
      const c = document.createElement('canvas'); c.width = 128; c.height = 256;
      const g = c.getContext('2d');
      g.clearRect(0, 0, 128, 256);
      g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 1.2;
      for(let i = 0; i < 26; i++){
        const x = (i * 37) % 128, y0 = (i * 91) % 256;
        g.beginPath(); g.moveTo(x, y0); g.lineTo(x + 1.5, y0 + 18 + (i % 5) * 6); g.stroke();
      }
      const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 1.5);
      const rain = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.9),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.7, depthWrite: false }));
      rain.position.set(0, 1.62, zf - 0.03); rain.rotation.y = Math.PI;
      rain.userData.ignoreAudit = true;
      scene.add(rain);
      animate(scrollUV(tex, 0.02, -1.6));
    }
    // A plant by the board room door, on the antechamber side of it.
    {
      const px = -1.55, pz = 73.0;
      cy(scene, 0.17, 0.34, px, 0.17, pz, M.pot, 0.14);
      for(let i = 0; i < 7; i++){
        const a = (i / 7) * Math.PI * 2;
        const leaf = bx(scene, 0.09, 0.5, 0.02, px + Math.cos(a) * 0.1, 0.62, pz + Math.sin(a) * 0.1, M.leaf, -a);
        leaf.rotation.z = 0.35 * (i % 2 ? 1 : -1);
      }
      soft(px, pz, 0.32);
      out.taken.push({ side: 'w', z0: 72.5, z1: 73.5 });
      out.keepClear.push({ x: px, z: pz, r: 0.9 });
    }
    // §3 landmark `board-antechamber`: "Seven empty coat hooks face a shut
    // meeting door. After Stop 56, coats arrive and the lamps come on; after
    // Stop 60, the door opens onto the meeting." The hooks are on the corridor
    // wall north of the board room door; the door itself is opened by the
    // BOARD room's hook above.
    {
      const L = LANDMARKS['board-antechamber'];
      const x = -onFace, rotY = Math.PI / 2;
      const rail = bx(scene, 0.04, 0.06, 2.0, x, 1.75, 77.6, M.dark);
      markWallMounted([rail], true, 1, 'coat rail');
      const coats = [];
      for(let i = 0; i < 7; i++){
        const z = 76.7 + i * 0.3;
        const hook = cy(scene, 0.012, 0.08, x + 0.05, 1.72, z, M.steel);
        hook.rotation.z = Math.PI / 2;
        const coat = bx(scene, 0.12, 0.9, 0.22, x + 0.12, 1.25, z, M.coat[i]);
        coat.visible = false; coats.push(coat);
      }
      const lamps = [76.9, 78.3].map(z => bx(scene, 0.05, 0.08, 0.2, x + 0.05, 2.45, z, M.lampOff.clone()));
      const lit = new THREE.MeshStandardMaterial({ color: 0xfff1c8, emissive: 0xfff1c8, emissiveIntensity: 1.3, roughness: 0.4 });
      const card = slip(scene, { x: x + 0.035, y: 2.15, z: 77.6, rotY, w: 0.62, h: 0.3, text: L.before, pin: 'clip' });
      stateHooks.push((state, n, s) => {
        coats.forEach(c => { c.visible = n >= 14; });
        lamps.forEach(l => { l.material = n >= 14 ? lit : M.lampOff; });
        card.set({ text: s.won ? L.after2 : n >= 14 ? L.after1 : L.before });
      });
      out.taken.push({ side: 'w', z0: 76.3, z1: 79.0 });
      out.keepClear.push({ x: -1.4, z: 77.6, r: 1.6 });
    }
  }
  return out;
}
