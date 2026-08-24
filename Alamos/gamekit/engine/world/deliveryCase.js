// deliveryCase.js — the board and the plinth where a campaign's product is kept.
//
// One room in every campaign holds what the fortnight is building. The room is
// the theme's choice (`delivery.where`), the thing is the theme's (`delivery.name`)
// and the parts of it are the theme's (`delivery.pieces`); what is here is the
// furniture that makes fifteen days of work something the player can walk up to
// and look at.
//
// Two objects, because they answer two different questions:
//
//   · a **board** on the wall — every piece, one cell each, in order, so the ones
//     still to come are as visible as the ones already in. A player nine days
//     into a campaign can see six blanks.
//   · a **plinth** in front of it, and one solid block on it per piece earned. The
//     board is a list and reads as a list; the row of blocks is the thing that
//     visibly grows, and it grows toward a shape with a gap in it.
//
// The board is a canvas texture repainted on `setEarned`, not fifteen meshes with
// fifteen labels. A room is entered often and the count changes once a day.
//
// **The room places this, not this module.** `interiorBuilding.js` is the only
// thing that knows where its own furniture is, and the first version of the probe
// station posts guessed a wall and put six of them through the shelving.
import * as THREE from 'three';
import { mat } from './materials.js';

/** How the cells lay out: at most five across, so a 15-piece board is 3 × 5. */
function gridFor(total){
  const cols = Math.min(5, Math.max(3, Math.ceil(Math.sqrt(Math.max(1, total)))));
  return { cols, rows: Math.max(1, Math.ceil(total / cols)) };
}

/**
 * The face of the board.
 *
 * Drawn rather than assembled, and the numbers are on it whether the cell is
 * filled or not: the shape of what is still owed is the whole point of putting a
 * board on the wall instead of a shelf that gets longer.
 */
function boardFace(spec, { w = 1024, h = 560 } = {}){
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const state = { name: spec.name ?? '', total: spec.total ?? 0, pieces: [] };

  const paint = () => {
    const { cols, rows } = gridFor(state.total);
    // Board, not paper: a dark ground with the cells cut into it reads as a
    // fixture at four metres, where a white sheet reads as a notice.
    ctx.fillStyle = '#22262b'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, 0, w, 6);

    ctx.fillStyle = '#f1efe8';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 38px Georgia, "Times New Roman", serif';
    ctx.fillText(String(state.name).toUpperCase(), 30, 50);
    const got = state.pieces.filter(p => p.earned).length;
    ctx.fillStyle = '#9aa4ae';
    ctx.font = '24px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(`${got} of ${state.total} gathered`, 30, 92);

    const padX = 30, top = 126, gap = 11;
    const cw = (w - padX * 2 - gap * (cols - 1)) / cols;
    const ch = (h - top - 24 - gap * (rows - 1)) / rows;
    for(let i = 0; i < state.total; i++){
      const p = state.pieces[i] ?? { earned: false };
      const cx = padX + (i % cols) * (cw + gap);
      const cy = top + Math.floor(i / cols) * (ch + gap);
      if(p.earned){
        // Filled in the area's own colour, with the day's number kept on it: a
        // cell that loses its number stops being the third of fifteen.
        ctx.fillStyle = p.held ? spec.colour ?? '#4f7f6a' : '#8a6a2c';
        ctx.fillRect(cx, cy, cw, ch);
        ctx.fillStyle = 'rgba(0,0,0,0.28)';
        ctx.fillRect(cx, cy + ch - 8, cw, 8);
        ctx.fillStyle = '#fdfcf7';
        ctx.font = 'bold 28px "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(String(i + 1), cx + 11, cy + 26);
        ctx.font = '19px "Helvetica Neue", Arial, sans-serif';
        // The name, wrapped to the cell and CLIPPED, not overprinted. The first
        // version drew a line and then went on measuring against the same y when
        // it ran out of room, so a four-word piece came out as two names on top of
        // each other — legible in the panel, unreadable on the wall, and exactly
        // the kind of thing only a screenshot shows.
        const room = p.held ? ch - 46 : ch - 66;
        const maxLines = Math.max(1, Math.floor(room / 21));
        const lines = [];
        for(const word of String(p.name ?? '').split(/\s+/).filter(Boolean)){
          const next = lines.length ? `${lines[lines.length - 1]} ${word}` : word;
          if(lines.length && ctx.measureText(next).width <= cw - 22) lines[lines.length - 1] = next;
          else if(lines.length < maxLines) lines.push(word);
          else { lines[lines.length - 1] += '…'; break; }
        }
        lines.forEach((line, k) => ctx.fillText(line, cx + 11, cy + 54 + k * 21));
        if(!p.held){
          ctx.fillStyle = '#f7e6bd';
          ctx.font = 'bold 16px "Helvetica Neue", Arial, sans-serif';
          ctx.fillText('to check again', cx + 11, cy + ch - 20);
        }
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.16)';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx + 1, cy + 1, cw - 2, ch - 2);
        ctx.fillStyle = 'rgba(255,255,255,0.30)';
        ctx.font = 'bold 28px "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(String(i + 1), cx + 11, cy + 26);
      }
    }
    texture.needsUpdate = true;
  };

  paint();
  return {
    texture,
    set(pieces){ state.pieces = pieces ?? []; paint(); },
  };
}

/**
 * Build the fixture into a room.
 *
 * @param parent   the room's group; everything is added to it, in room space
 * @param spec.at  { x, y, z, rotY } the point on the wall and the way it faces —
 *                 `rotY` is the yaw that turns a plane into the room, so the
 *                 inward normal is (sin rotY, cos rotY) and the plinth stands
 *                 along it. Comes from the room's own `onWall`.
 * @param spec.hard(cx, cz, w, d, h)  the room's collider callback, in room space
 * @returns { objects, wallObjects, interactables, setPieces } — `wallObjects` is
 *          what `markWallMounted` is told about, so `placement.mjs` can see the
 *          board has width; `objects` is the plinth and what stands on it.
 */
export function buildDeliveryCase(parent, spec = {}){
  const { x = 0, y = 1.6, z = 0, rotY = Math.PI } = spec.at ?? {};
  // WHERE THE FLOOR IS, which is not zero everywhere. The engine's own rooms are
  // built on a flat floor at y = 0, but Mission Control and the theatre both put
  // their rooms on a raised tier — so the first version of this stood the case a
  // metre and a half *below* the boards' own floor, out of sight under it, while
  // the board on the wall looked perfect. A screenshot is the only thing that
  // showed it, which is this repo's rule about believing anything visual.
  const floorY = spec.floorY ?? 0;
  const total = Math.max(1, spec.total ?? 15);
  const colour = spec.colour ?? '#4f7f6a';
  const nx = Math.sin(rotY), nz = Math.cos(rotY);   // into the room
  const tx = Math.cos(rotY), tz = -Math.sin(rotY);  // along the wall
  // Two lists, because they answer to different audits: `wallObjects` is what
  // hangs on the wall and is what `markWallMounted` has to be told about, and the
  // plinth is furniture standing on the floor.
  const wallObjects = [];
  const objects = [];
  const add = (m, onWall = false) => {
    parent.add(m);
    (onWall ? wallObjects : objects).push(m);
    return m;
  };

  const W = 3.0, H = 1.64;
  const face = boardFace({ name: spec.name, total, colour });
  const frame = add(new THREE.Mesh(new THREE.BoxGeometry(W + 0.1, H + 0.1, 0.06),
    mat('deliver-frame', () => new THREE.MeshStandardMaterial({ color: 0x2b2f34, roughness: 0.6 }))), true);
  frame.position.set(x, y, z);
  frame.rotation.y = rotY;
  // Faintly emissive, and no more than faintly. Three of the four room styles are
  // dark — painted steel, board walls under a hanging bulb, and an observatory lit
  // red to keep night vision — and a matte board on a dark wall four metres away
  // is a rectangle you can tell is a board. It is NOT a light: nothing in a room
  // may be one (see the light budget in CLAUDE.md), and 0.22 lifts the face
  // without putting anything on the wall around it.
  const board = add(new THREE.Mesh(new THREE.PlaneGeometry(W, H),
    new THREE.MeshStandardMaterial({ map: face.texture, emissive: 0xffffff,
      emissiveMap: face.texture, emissiveIntensity: 0.22,
      roughness: 0.7, envMapIntensity: 0.35 })), true);
  board.position.set(x + nx * 0.04, y, z + nz * 0.04);
  board.rotation.y = rotY;

  // The plinth: a case of the kind a museum uses, because that is what this is —
  // work already done, kept where the people who did it can see it.
  // Out from the wall and DELIBERATELY LOW. The first version stood a 0.92 m case
  // 0.62 m off the wall under a board hung at 1.62, and from four metres away the
  // plinth top cut the bottom row of cells off — the row with the last three days
  // of the campaign on it. The board goes higher, the case lower and further out.
  const px = x + nx * 0.78, pz = z + nz * 0.78;
  const PW = 2.2, PD = 0.66, PH = 0.82;
  const woodMat = mat('deliver-plinth', () => new THREE.MeshStandardMaterial({
    color: 0x6d6459, roughness: 0.78 }));
  const plinth = add(new THREE.Mesh(new THREE.BoxGeometry(PW, PH, PD), woodMat));
  plinth.position.set(px, floorY + PH / 2, pz);
  plinth.rotation.y = rotY;
  plinth.castShadow = true; plinth.receiveShadow = true;
  const topMat = mat('deliver-plinth-top', () => new THREE.MeshStandardMaterial({
    color: 0x8b8177, roughness: 0.5 }));
  const top = add(new THREE.Mesh(new THREE.BoxGeometry(PW + 0.08, 0.05, PD + 0.08), topMat));
  top.position.set(px, floorY + PH + 0.02, pz);
  top.rotation.y = rotY;
  spec.hard?.(px, pz, Math.abs(PW * tx) + Math.abs(PD * nx) + 0.1,
    Math.abs(PW * tz) + Math.abs(PD * nz) + 0.1, PH);

  // One block per piece, laid out along the plinth in the board's own order, and
  // hidden until its day is closed. Two rows on a fifteen-piece campaign, so the
  // gap is legible: a row that simply gets longer says "some" and two rows with
  // four missing says "four to go".
  const perRow = Math.ceil(total / 2);
  const pitch = (PW - 0.3) / Math.max(1, perRow - 1);
  const blocks = [];
  // Faintly emissive, for the same reason the board's face is: Mission Control is
  // lit by its own displays and the observatory is lit red, and an unlit block in
  // either of those rooms is not a piece anybody can see they have earned.
  const heldMat = mat(`deliver-block-${colour}`, () => new THREE.MeshStandardMaterial({
    color: new THREE.Color(colour), emissive: new THREE.Color(colour), emissiveIntensity: 0.18,
    roughness: 0.55, envMapIntensity: 0.4 }));
  const flagMat = mat('deliver-block-flagged', () => new THREE.MeshStandardMaterial({
    color: 0x8a6a2c, emissive: 0x8a6a2c, emissiveIntensity: 0.18, roughness: 0.62 }));
  for(let i = 0; i < total; i++){
    const row = i < perRow ? 0 : 1;
    const col = i - row * perRow;
    // The back row is offset half a pitch as well as further back, or from square
    // on the ninth block stands exactly behind the first and the row that is
    // supposed to say "nine" says "eight and something".
    const along = -(PW - 0.3) / 2 + col * pitch + (row ? pitch / 2 : 0);
    const across = row === 0 ? -0.17 : 0.19;
    const b = add(new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.2, 0.09), heldMat));
    b.position.set(px + tx * along + nx * across, floorY + PH + 0.15, pz + tz * along + nz * across);
    b.rotation.y = rotY + (i % 2 ? 0.05 : -0.04);
    b.castShadow = true;
    b.visible = false;
    blocks.push(b);
  }

  const hit = new THREE.Mesh(new THREE.BoxGeometry(PW + 0.4, 1.9, PD + 0.8),
    new THREE.MeshBasicMaterial({ visible: false }));
  hit.position.set(px, floorY + 0.95, pz);
  hit.rotation.y = rotY;
  parent.add(hit);

  return {
    objects, wallObjects,
    interactables: [{ mesh: hit, type: 'delivery', id: spec.id ?? 'delivery',
      prompt: `E — ${spec.name ? `Look over ${spec.name}` : 'Look over the case'}` }],
    /** Called on every entry: the board and the blocks say what is in today. */
    setPieces(pieces = []){
      face.set(pieces);
      blocks.forEach((b, i) => {
        const p = pieces[i];
        b.visible = !!p?.earned;
        b.material = p?.earned && !p.held ? flagMat : heldMat;
      });
    },
  };
}

/**
 * The manifest's delivery, in the shape a world builder wants it.
 *
 * Every builder that puts a board up needs the same four things and none of them
 * needs the campaign's content, so this is the one place that reads `theme` — a
 * second copy of "which group's colour is it" in four world modules is four
 * things to correct the day a group grows a second colour.
 *
 * `undefined` for a theme with no delivery, which is what the builders check.
 */
export function deliveryHook(theme){
  const d = theme?.delivery;
  if(!d?.pieces?.length || !d.where) return undefined;
  const g = (theme?.content?.GROUPS ?? []).find(x => x.id === d.where);
  return { where: d.where, name: d.name, total: d.pieces.length, colour: g?.color ?? '#4f7f6a' };
}
