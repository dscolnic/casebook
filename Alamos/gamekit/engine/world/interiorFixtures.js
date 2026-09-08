// interiorFixtures.js — the thing the question is about, standing in the room.
//
// A question about holding a reactor at temperature should be asked at the
// reactor, not at the same wall panel that yesterday's question about the carbon
// ledger was asked at. Red Sand had 56 stops and six places, one panel each: the
// place was the *area's* subject, never the *question's* object.
//
// ## The pattern this follows, deliberately
//
// `interiorStations.js` already solved the same problem for one format. Its
// header is the rule:
//
//   "The stations are built from the lesson, not from the theme's `interiors`
//    block, because the chain belongs to the question."
//
// This is that sentence generalised. A fixture is built **on entry, from the open
// call**, and disposed the moment the open call changes — so a room only ever
// holds the object today needs, and the same room is a different room tomorrow.
//
// ## What a theme declares, and what it must not
//
// A theme declares fixtures by NAME and WALL, never by coordinate:
//
//   KINET: [{ id: 'bed', name: 'The Sabatier bed', build: 'vessel', wall: 'left' }]
//
// Coordinates are the engine's job, computed from `room.bounds`. This is not
// tidiness. `kit.js` placers take `(x, z, y)` with ground last and one call
// written `(x, y, z)` once put six display boards sixteen metres in the air; a
// theme that never writes a coordinate cannot make that mistake, and a fixture
// sized from the room it is standing in cannot be built inside the plaster.
//
// ## Why the fixture opens the call
//
// It registers as `type: 'case'` with the room's own id — the same type the case
// stand registers — so `main.js`'s existing `case: (t) => openVisit(t.id)` opens
// it with no new wiring at all. **The stand is left in place**: the fixture is a
// second way to open the same call, not a replacement, so a player who cannot
// find the object is never stuck and no campaign without fixtures changes.
import * as THREE from 'three';
import { printedSheet } from './screens.js';
// The same marker the case stand gets. A fixture with no marker is the defect
// this import exists for: the HUD said "Go to the conversion board", the board
// was one printed sheet among six in a furnished room, and nothing anywhere
// said which one it was.
import { addCaseBeacon } from './caseBeacon.js';

const STEEL = 0x8f9aa2;
const LAGGING = 0xd8d2c4;
const DARK = 0x4d565c;

/** A plain box, added to the group and returned. */
function box(group, w, h, d, x, y, z, colour, opts = {}){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color: colour, roughness: opts.roughness ?? 0.7, metalness: opts.metalness ?? 0.1 }));
  m.position.set(x, y, z);
  if(opts.rotY) m.rotation.y = opts.rotY;
  group.add(m);
  return m;
}
function cyl(group, rt, rb, h, x, y, z, colour, opts = {}){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, opts.seg ?? 16),
    new THREE.MeshStandardMaterial({ color: colour, roughness: opts.roughness ?? 0.65, metalness: opts.metalness ?? 0.25 }));
  m.position.set(x, y, z);
  if(opts.rotZ) m.rotation.z = opts.rotZ;
  group.add(m);
  return m;
}

/**
 * The four shapes. Each takes a local frame — `x`,`z` on the floor and a yaw that
 * faces the middle of the room — and returns its own height, so the label can be
 * hung above it without the caller knowing what was built.
 */
const BUILDERS = {
  /** A lagged vertical vessel: a reactor bed, a column, a stack. */
  vessel(g, x, z, yaw){
    cyl(g, 0.42, 0.46, 2.05, x, 1.03, z, LAGGING, { roughness: 0.9 });
    cyl(g, 0.30, 0.30, 0.12, x, 2.14, z, STEEL);
    cyl(g, 0.48, 0.48, 0.09, x, 0.05, z, DARK);
    // The thermowell line down the side — the detail that says this is a vessel
    // somebody takes temperatures along rather than a drum.
    for(let i = 0; i < 4; i++){
      const a = yaw + Math.PI / 2;
      cyl(g, 0.035, 0.035, 0.16, x + Math.cos(a) * 0.47, 0.5 + i * 0.42, z + Math.sin(a) * 0.47, STEEL);
    }
    return 2.2;
  },
  /** A rack of cells or bottles: an electrolysis stack, a sample rack. */
  rack(g, x, z, yaw){
    box(g, 1.35, 0.09, 0.7, x, 0.06, z, DARK, { rotY: yaw });
    for(let i = 0; i < 5; i++){
      box(g, 0.2, 1.25, 0.6, x + (i - 2) * 0.24, 0.73, z, i % 2 ? STEEL : 0x6f7b83, { rotY: yaw });
    }
    box(g, 1.35, 0.1, 0.7, x, 1.4, z, STEEL, { rotY: yaw });
    return 1.5;
  },
  /** A working surface with something on it: an assay bench, a sample bench. */
  bench(g, x, z, yaw){
    box(g, 1.7, 0.08, 0.78, x, 0.9, z, 0xb9a98c, { rotY: yaw, roughness: 0.85 });
    for(const s of [-1, 1]) box(g, 0.08, 0.9, 0.08, x + s * 0.75, 0.45, z, DARK, { rotY: yaw });
    box(g, 0.34, 0.26, 0.26, x - 0.45, 1.07, z, STEEL, { rotY: yaw });
    cyl(g, 0.07, 0.09, 0.22, x + 0.25, 1.05, z, 0x9fb6c2, { roughness: 0.25 });
    cyl(g, 0.06, 0.08, 0.18, x + 0.45, 1.03, z, 0x9fb6c2, { roughness: 0.25 });
    return 1.25;
  },
  /** A free-standing board or console: a load board, a gauge panel. */
  board(g, x, z, yaw){
    for(const s of [-1, 1]) box(g, 0.1, 1.05, 0.1, x + s * 0.62, 0.52, z, DARK, { rotY: yaw });
    box(g, 1.5, 0.95, 0.1, x, 1.5, z, 0x39424a, { rotY: yaw });
    box(g, 1.34, 0.8, 0.02, x + Math.sin(yaw) * 0.06, 1.5, z + Math.cos(yaw) * 0.06, 0x1d2a30, { rotY: yaw, roughness: 0.4 });
    return 2.05;
  },
};

/**
 * Build one fixture in a room.
 *
 * `room` is what `buildInteriorBuilding` returned. Returns `{ interactables,
 * dispose() }`, or null when there is nothing to build.
 */
/**
 * WHERE AN AUTHORED FIXTURE STANDS, from the room rather than from the theme.
 *
 * Exported because two things need it and a second copy of it would drift the
 * first time either was corrected: `addFixture` places the object, and
 * `interiorBuilding` has to reserve that patch of wall BEFORE the fit-out hangs
 * posters along it. The fit-out and the fixtures are different builders running
 * at different times, and neither could see the other — `npm run signs` found a
 * poster 96% inside a fixture board because of it.
 *
 * `flip` mirrors half the rooms, and `side()` in interiorBuilding swaps left and
 * right with it — the same swap has to happen here or a fixture declared on the
 * left stands on the right in half the campaign.
 *
 * `along` HAS TO MIRROR TOO, on the back wall. `flip` mirrors the whole room in
 * x, and on the BACK wall `along` *is* x, so a fixture authored at -0.75 landed
 * at +0.75 in half the campaign. That is how the Cold End's scaffolding ended up
 * standing inside the room's own shelving: the position was right and the room
 * was the other way round. Nothing threw, and it read as a prop clipping
 * furniture.
 */
export function fixtureSpot(b, fixture){
  const inset = b.wall / 2 + 0.95;
  const wall = fixture?.wall ?? 'back';
  const mirrored = b.flip > 0 ? wall : wall === 'left' ? 'right' : wall === 'right' ? 'left' : wall;
  const along = (fixture?.along ?? 0) * (mirrored === 'back' ? b.flip : 1);
  if(mirrored === 'left'){
    return { x: b.x0 + inset, z: along * (b.d / 2 - 1.6), yaw: Math.PI / 2, wall: mirrored };
  }
  if(mirrored === 'right'){
    return { x: b.x1 - inset, z: along * (b.d / 2 - 1.6), yaw: -Math.PI / 2, wall: mirrored };
  }
  return { x: along * (b.w / 2 - 1.6), z: b.z1 - inset, yaw: Math.PI, wall: mirrored };
}

export function addFixture(room, fixture, { openPrompt = 'Open the case', caseId = null, stopIndex = null, scenery = false } = {}){
  if(!fixture?.id) return null;
  const build = BUILDERS[fixture.build] ?? BUILDERS.vessel;
  const b = room.bounds;
  if(!b) return null;

  const g = new THREE.Group();
  room.group.add(g);

  // AN UNFINISHED THING HAS TO LOOK UNFINISHED. A `until:` fixture is scaffolding,
  // a capped stub, a crate still strapped — and built in the room's own materials
  // it reads as furniture: the Cold End is already full of racks, and the
  // scaffolding standing against its back wall was indistinguishable from the
  // shelving beside it in the first render. Site hazard yellow is what the eye
  // is for. The band is a ring at knee height rather than a repaint, so the shape
  // still says what the object is.
  if(fixture.until){
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.045, 6, 16),
      new THREE.MeshStandardMaterial({ color: 0xd8b23c, roughness: 0.6,
        emissive: 0x6a5410, emissiveIntensity: 0.35 }));
    band.rotation.x = Math.PI / 2;
    g.add(band);
    g.userData.unfinishedBand = band;
  }

  // Placement, from the room rather than from the theme. `flip` mirrors half the
  // rooms, and `side()` in interiorBuilding swaps left and right with it — the
  // same swap has to happen here or a fixture declared on the left stands on the
  // right in half the campaign.
  const { x, z, yaw } = fixtureSpot(b, fixture);

  const height = build(g, x, z, yaw);
  // ------------------------------------------------------- MARK THE OBJECT
  //
  // A ring on the floor, a column of light and a bobbing arrow, in the area's
  // own colour — the same marker the case stand carries, for the same reason it
  // carries one. `caseBeacon.js` says it in its own header: the thing that
  // starts a question looks exactly like the other paper in the room, so people
  // walked in, read the screen and walked out again without ever finding what
  // they came for. That was true of the case stand and it stayed true of the
  // fixture, which is the object the HUD actually names.
  //
  // Only on today's object. `scenery` is a capped stub or a strapped crate with
  // no question at it, and a beacon over one teaches the player that the beacon
  // means nothing — the note that file already makes.
  const beacon = scenery ? null : addCaseBeacon(g, {
    x: x + Math.sin(yaw) * 0.95, z: z + Math.cos(yaw) * 0.95, y: 0,
    colour: fixture.colour ?? 0xf0b429,
    height: Math.max(1.9, height + 0.5),
  });
  beacon?.setActive(true);
  // The band is built before the placement is known, so it is moved into place
  // here rather than positioned twice.
  if(g.userData.unfinishedBand) g.userData.unfinishedBand.position.set(x, 0.5, z);

  // The name plate, hung above whatever was built. A fixture the player cannot
  // name is scenery, and this room already has plenty of that.
  const sheet = printedSheet({
    tag: '', title: '', heading: fixture.name ?? fixture.id,
    body: fixture.caption ?? '', accent: '#2f6f8f', footer: openPrompt,
  }, { w: 512, h: 320 });
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.41),
    new THREE.MeshStandardMaterial({ map: sheet.texture, roughness: 0.85 }));
  plate.position.set(x + Math.sin(yaw) * 0.5, height + 0.32, z + Math.cos(yaw) * 0.5);
  plate.rotation.set(0, yaw, 0);
  g.add(plate);

  // The hit box stands in FRONT of the object, at eye height, because the player
  // walks up to a thing and looks at it rather than into it. A box on the object
  // itself reads as unclickable from the one place anybody stands.
  const hit = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.3, 1.5),
    new THREE.MeshBasicMaterial({ visible: false }));
  hit.position.set(x + Math.sin(yaw) * 0.85, 1.15, z + Math.cos(yaw) * 0.85);
  g.add(hit);

  // A real collider on the object, and none on the hit box. The object is
  // something you walk around; the approach is something you stand in.
  //
  // TAKEN THROUGH THE ROOM'S OWN MATRIX, not by adding its position. Every room
  // this was written for is axis-aligned and unrotated, so `position.x + x` was
  // the same answer and cheaper. A room off a corridor is not: its outward wall
  // faces along x rather than z, so its anchor is turned a quarter turn, and a
  // collider built by addition lands in the corridor instead of against the
  // wall. `localToWorld` is right for both, and identical for the first.
  room.group.updateWorldMatrix(true, false);
  const centre = room.group.localToWorld(new THREE.Vector3(x, height / 2, z));
  // WHICH WAY IT FACES, IN THE WORLD. `yaw` is the object's turn inside the
  // room and the room itself may be turned, so the two are composed by taking a
  // point half a metre in front of the face through the same matrix. A box
  // 1.5 m across the face and 1.0 m into the wall then lands the right way
  // round however the room is oriented — and the box used to be 1.5 × 1.0 for
  // every wall, so a fixture on a side wall reserved a metre and a half of the
  // room and half a metre of the wall, the wrong way about.
  const ahead = room.group.localToWorld(
    new THREE.Vector3(x + Math.sin(yaw) * 0.5, height / 2, z + Math.cos(yaw) * 0.5));
  const facesX = Math.abs(ahead.x - centre.x) > Math.abs(ahead.z - centre.z);
  const solid = new THREE.Box3().setFromCenterAndSize(centre,
    new THREE.Vector3(facesX ? 1.0 : 1.5, height, facesX ? 1.5 : 1.0));

  return {
    group: g,
    collider: solid,
    // The marker needs a frame: its arrow bobs and it turns to face the player.
    // Driven by the room's own `update`, which walks the fixtures it built.
    beacon,
    // `type: 'case'` with the room's id: main.js already routes that to
    // `openVisit(room.id)`, so the object opens the day's call with no new wiring.
    // `caseId` is the AREA whose call this opens, which is not always the room it
    // stands in. A stop SITED at a minor place — the tank farm, the array shed —
    // is still a question about its own area; it is only asked somewhere else. So
    // the id here is the group, and `openVisit` gets the same argument it always
    // did while the player is standing three hundred metres from the area's door.
    interactables: [scenery ? {
      // SCENERY IS NOT A CASE. A `from:`/`until:` fixture is the world growing or
      // still unfinished — a capped stub, a strapped crate, scaffolding — and no
      // question is asked at it. Registered as a case it took the room's own id
      // with no stop index, so pressing the Reactor Hall's capped recycle tie-in
      // on sol 4 opened whatever EQUIL call came first, which was that day's
      // PERSON stop, and the card read "no case open right now" at an object that
      // was never holding a call. It says what it is instead.
      mesh: hit, type: 'info', id: fixture.id, fixture: fixture.id,
      info: fixture.caption || openPrompt,
      prompt: `E — ${fixture.name ?? fixture.id}`,
    } : {
      // `stopIndex` addresses the CALL, not just its area. Two calls of one area
      // in one room — Red Sand's sol 294 has two — both register the same id, so
      // without this the object you press does not decide the question you get.
      mesh: hit, type: 'case', id: caseId ?? room.id, fixture: fixture.id, stopIndex,
      prompt: `E — ${fixture.name ?? fixture.id}`,
    }],
    dispose(){
      room.group.remove(g);
      g.traverse(o => {
        o.geometry?.dispose?.();
        if(o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose?.());
      });
    },
  };
}

/** Which fixture, if any, this room's open call is asked at. */
export function fixtureFor(theme, groupId, lesson){
  const at = lesson?.at;
  if(!at) return null;
  return (theme?.fixtures?.[groupId] ?? []).find(f => f.id === at) ?? null;
}

// `sitedAt` now lives in ./siting.js so `placement.mjs` can read the same rule.
// Re-exported here because five modules already import it from this file.
export { sitedAt } from './siting.js';

