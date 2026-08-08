import * as THREE from 'three';
import { GROUP_DEFS } from './divisions.js';
import { MISSION_DEFS } from './missions.js';
import { getState } from './gameState.js';
import { def, groupPct, getCurrentMission, nextMissionStopIndex, completedMissionStops, missionStopForGroup } from './simulation.js';
import { renderCentralBoardTexture } from './dashboard.js';
import {
  initSky, updateSky, buildTerrain, buildRoads, buildRidges, plantTrees,
  terrainHeight, setTerrainPads, resetSeed, srand, srandRange,
} from './env.js';
import { buildProps } from './props.js';

export let scene, renderer, centralBoardMesh, centralBoardCanvas, centralBoardTexture;
export const buildingMeshes = new Map(); // id -> { mesh, doorMesh, signMesh, lightMesh, label }
export const interactables = []; // array of { mesh, type, id, prompt }
export const colliders = []; // THREE.Box3 for collision — buildings, vehicles, fence runs
export const softColliders = []; // {x,z,r} cylinders — trees, poles, barrels (player only)
const windowMeshes = []; // panes that light up after dark

// Divisions keep their identity colour for signage and the HUD, but the walls
// wear what the mesa actually wore: Army green, weathered gray, unpainted board.
// Footprints vary — the Sundt crews built to program, not to a grid.
const BUILDING_DATA = {
  T: { pos: [0, 0, 58],    color: '#315c78', sign: 'T',  wall: '#3d4a3a', w: 20, d: 11, h: 5.4 },
  P: { pos: [-48, 0, -10], color: '#4b775f', sign: 'P',  wall: '#8b8375', w: 15, d: 13, h: 6.2 },
  X: { pos: [48, 0, -10],  color: '#704f88', sign: 'X',  wall: '#5c5347', w: 18, d: 12, h: 5.8 },
  CM:{ pos: [-30, 0, 42],  color: '#8a6921', sign: 'CM', wall: '#6f6a5c', w: 16, d: 14, h: 6.6 },
  E: { pos: [32, 0, 42],   color: '#865044', sign: 'E',  wall: '#44503c', w: 20, d: 10, h: 5.2 },
};
const HISTORIC_INFO={
  FULLER:'<b>Fuller Lodge (1928)</b> — Built by Santa Fe architect John Gaw Meem from 700+ Ponderosa pines for the Los Alamos Ranch School. The boys’ dining hall and teachers’ quarters, with massive log hall and stone fireplace. U.S. Army bought the school Dec 1942 for $350k. As Project Y community center it hosted Groves-Oppenheimer staff meetings, Saturday dances, colloquia, and the Army-Navy E-Award ceremony 16 Oct 1945. Now Los Alamos County community center on Ashley Pond, National Register.',
  BIG:'<b>Big House (1917)</b> — Two-story log dormitory of the Ranch School — 46 boys slept year-round on unheated open porches (winter temps −15°C). Cranberry-colored chinking, 70-ft long. Kept in 1943 as VIP/general quarters for Groves, visitors, and WAC overflow. Demolished 1959 after wartime overuse; flagstone footprint remains at Fuller Lodge lawn.',
  POND:'<b>Ashley Pond (c.1900-1928)</b> — Originally a small stock pond, dammed and enlarged by Ranch School boys to cut ice and for fishing. At 2,200 m elevation, center of the mesa. Fenced and patrolled during war — children caught ice-skating at noon would get a note from MPs. Everyone walked past it going Tech Area ↔ housing. Now unfenced park with geese, summer concerts.',
  SUNDTS:'<b>Sundt 4-Plex Apartments (Spring 1943)</b> — M.M. Sundt Construction’s two-storey, 4-family houses: most coveted family housing. Each 2-3 bed, kitchen with black coal stove, small bath, porch. Built in rows north of Trinity Drive (Bathtub Row west was better still). Rent $50-70 deducted from wartime salary. Only senior staff/large families got them; queue was months.',
  DUP:'<b>Sundt Duplex & 8-Plex (1943)</b> — One-bedroom duplexes and double 8-family barrack-type blocks — tighter, thin plywood walls you could hear through, shared entry. Still highly desired vs hutments. Lined the short roads south of Trinity. Coal bin outside; ash collection Mon/Wed.',
  MCKEE:'<b>McKee / Pacific Hutments & Trailers (1944)</b> — Pacific Hut plywood, expansible trailers, and Victory houses thrown up in weeks for the 1944 influx (pop. 3,500→6,000). Single-room, pot-belly stove, no foundation — winter wind whistled through. South and east mesa. “Better than Frijoles Canyon tent camp” (June-Oct 43 overflow).',
  DORMF:'<b>Civilian Women’s Dorm T-178 (Aug 1943)</b> — Willard C. Kruger design, among earliest mesa buildings. Two women’s + two men’s dorms housed single civilians: 8-12 to barracks room, communal bath, coal heat, curfew. T-178 women’s dorm survives in fragment near 14th St. Later became apartments. Morale: hot water limited to 2 hours.',
  DORMM:'<b>Men’s Dorm (1943)</b> — Mirror of women’s: wood frame, tar-paper roof, 16 cots per wing. Later partitioned into family apartments/offices post-war; some footings still visible behind PE teachers’ housing. Occupancy assigned by Housing Office lottery.',
  WAC:'<b>WAC Barracks (Western Technical Area, 1943)</b> — Wooden barracks for Women’s Army Corps (WAC) — 80+ WACs as drivers, technicians, MPs. Separate fenced military enclave west of town with own mess hall and rec. Curfew 22:00, uniforms required off-mesa. Crucial to site operation.',
  THEAT:'<b>Theater No.2 (1944)</b> — 500-seat wooden “Theater” — biggest morale building. Movies Mon-Wed-Fri (war bonds), USO shows, and classified lectures (Bethe on implosion here Feb 44). Red-curtain stage, coal-stove side rooms. Adjacent to PX; line stretched around block Saturday nights.',
  PX:'<b>Post Exchange (PX) (1943)</b> — General store + PX + Post Office combined. Rationed goods, canned milk, Victory suits, mail (censored), soda fountain and beer garden (3.2%). Paid in scrip at first. Next to pond — where you learned your mail box number and housing assignment.',
  CHAPL:'<b>Army Chapel (1943)</b> — White clapboard chapel with tall steeple and stained (paper) window. Dual Protestant/Catholic services Sun 0900/1100, also weddings, funerals, choir. Built in 10 days by Sundt. Ministers lived in Bathtub Row. Bell called workers from Tech Area.',
  INFIR:'<b>Infirmary → Hospital (1943→44)</b> — Started 12-bed infirmary behind Tech fence for burns, acid spills, dust, then expanded to 30-bed hospital 1944. H.S. Zimmerman and chief nurse. Handled TB screening, plutonium nose counts, maternity (80 babies born on hill in 44). Pass required to visit.',
  SCHOL:'<b>Community School</b> — One-room log school north of pond expanded to two rooms as children →150 by 44. Teachers were scientists’ wives (e.g., Elsie McMillan). Recess on pond ice. Classes in same building as Housing Office overflow.',
  GUARD:'<b>Main Gate & Guard House (1943)</b> — Single bridge over Los Alamos Canyon, MP checkpoint with barrier arm, badge and colored pass (blue civilian, white military). All arrivals via Lamy rail → Santa Fe 109 → winding dirt road. Curiosity seekers turned back daily. Gate log still archived.',
  HOUSG:'<b>Housing Office</b> — Former Ranch School admin log building north of Fuller. Assigned Sundt vs hutment strictly by rank + family size + arrival date. Queue 3-6 months in 43-44; Housing Officer’s “no” was final. Posted daily bulletin board.',
  ANCH:'<b>Anchor Ranch / Gun Site TA-8 (1943)</b> — Off-mesa 3 mi south on West Jemez Road — Little Boy gun-type assembly buildings (Gun Site, preserved National Park). Separate from main Tech Area for safety. Crews bussed daily.'
};
// Positions are laid out around the real road plan in env.js: nothing sits in a
// roadbed, and only CM/E/T fall inside the Tech Area wire.
const FILLER_BUILDINGS = [
  { id:'FULLER', name:'Fuller Lodge', code:'LODGE', pos:[0,0,-30], color:'#7a4a2e', w:22, d:12, h:8, log:true, info:HISTORIC_INFO.FULLER },
  { id:'BIG', name:'Big House', code:'BIG HOUSE', pos:[10,0,-38], color:'#6b3a1f', w:16, d:10, h:7.5, log:true, info:HISTORIC_INFO.BIG },
  { id:'POND', name:'Ashley Pond', code:'POND', pos:[0,0,-8], color:'#8fb5d6', w:14, d:14, h:0.2, pond:true, info:HISTORIC_INFO.POND },
  { id:'SUNDTS', name:'Sundt 4-Plex Row', code:'SUNDT', pos:[-48,0,-26], color:'#8a6a3a', w:18, d:9, h:7, row:true, info:HISTORIC_INFO.SUNDTS },
  { id:'SUNDTS2', name:'Sundt 4-Plex Row', code:'SUNDT', pos:[44,0,-26], color:'#8a6a3a', w:18, d:9, h:7, row:true, info:HISTORIC_INFO.SUNDTS },
  { id:'DUP', name:'Sundt Duplexes', code:'DUPLEX', pos:[-28,0,24], color:'#9a8a73', w:14, d:8, h:5.5, duplex:true, info:HISTORIC_INFO.DUP },
  { id:'MCKEE', name:'McKee Hutments', code:'HUTMENT', pos:[30,0,26], color:'#6b7a6b', w:16, d:8, h:4.5, hut:true, info:HISTORIC_INFO.MCKEE },
  { id:'DORMF', name:"Women's Dorm T-178", code:'DORM', pos:[-66,0,-6], color:'#d9d2c5', w:14, d:10, h:6, dorm:true, info:HISTORIC_INFO.DORMF },
  { id:'DORMM', name:"Men's Dorm", code:'DORM', pos:[-80,0,-6], color:'#d9d2c5', w:14, d:10, h:6, dorm:true, info:HISTORIC_INFO.DORMM },
  { id:'WAC', name:'WAC Barracks', code:'WAC', pos:[-76,0,26], color:'#5a6a7a', w:16, d:9, h:5, barracks:true, info:HISTORIC_INFO.WAC },
  { id:'THEAT', name:'Theater No.2', code:'THEATER', pos:[68,0,-6], color:'#4a3d2e', w:16, d:12, h:8, theater:true, info:HISTORIC_INFO.THEAT },
  { id:'PX', name:'Post Exchange', code:'PX', pos:[58,0,24], color:'#9a741d', w:11, d:10, h:6, px:true, info:HISTORIC_INFO.PX },
  { id:'CHAPL', name:'Army Chapel', code:'CHAPEL', pos:[-48,0,34], color:'#f5f1e9', w:10, d:12, h:7, chapel:true, info:HISTORIC_INFO.CHAPL },
  { id:'INFIR', name:'Infirmary', code:'INFIRMARY', pos:[58,0,38], color:'#ffffff', w:12, d:10, h:6.5, infirmary:true, info:HISTORIC_INFO.INFIR },
  { id:'GUARD', name:'Main Gate House', code:'GATE', pos:[27,0,88], color:'#3a2e22', w:6, d:6, h:4, guard:true, info:HISTORIC_INFO.GUARD },
];

function makeCanvasTexture(draw, size=512){
  const c=document.createElement('canvas'); c.width=c.height=size;
  const g=c.getContext('2d'); draw(g,size);
  const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace;
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.anisotropy=4;
  return t;
}
function stuccoTexture(base='#e8e0c8'){
  return makeCanvasTexture((g,s)=>{
    g.fillStyle=base; g.fillRect(0,0,s,s);
    for(let i=0;i<900;i++){ const x=Math.random()*s, y=Math.random()*s, r=Math.random()*1.8; g.fillStyle=Math.random()>0.5?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.08)'; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
    g.strokeStyle='rgba(0,0,0,0.06)'; g.lineWidth=1;
    for(let i=0;i<4;i++){ g.beginPath(); g.moveTo(0,i*s/4); g.lineTo(s,i*s/4); g.stroke(); g.beginPath(); g.moveTo(i*s/4,0); g.lineTo(i*s/4,s); g.stroke(); }
  },512);
}
function woodTexture(){
  return makeCanvasTexture((g,s)=>{
    g.fillStyle='#6b4226'; g.fillRect(0,0,s,s);
    g.strokeStyle='rgba(40,22,10,0.35)'; g.lineWidth=2;
    for(let y=0;y<s;y+=14){ g.beginPath(); g.moveTo(0,y+Math.sin(y*0.02)*6); g.bezierCurveTo(s*0.33,y, s*0.66,y+8, s,y+Math.sin(y*0.02+1)*6); g.stroke(); }
    for(let i=0;i<30;i++){ const x=Math.random()*s, y=Math.random()*s; g.fillStyle='rgba(20,12,6,0.45)'; g.beginPath(); g.ellipse(x,y,2+Math.random()*3,1,0,0,Math.PI*2); g.fill(); }
  },512);
}
// Tar paper: what almost every roof on the mesa actually was — dark, matte,
// laid in overlapping rolls with battens over the seams.
function tarPaperTexture(){
  return makeCanvasTexture((g,s)=>{
    // Weathered, not fresh: sun-bleached roll roofing reads mid-gray, and a
    // near-black albedo would just punch holes in the skyline.
    g.fillStyle='#575349'; g.fillRect(0,0,s,s);
    for(let i=0;i<4000;i++){
      const x=Math.random()*s, y=Math.random()*s;
      g.fillStyle=Math.random()>0.5?'rgba(30,28,24,0.20)':'rgba(160,154,140,0.20)';
      g.fillRect(x,y,1.6,1.6);
    }
    // roll seams and batten strips
    for(let y=0;y<s;y+=64){
      g.fillStyle='rgba(30,28,24,0.26)'; g.fillRect(0,y,s,3);
      g.fillStyle='rgba(168,162,148,0.20)'; g.fillRect(0,y+3,s,2);
    }
    // patched blisters where the sun cooked it
    for(let i=0;i<22;i++){
      const x=Math.random()*s, y=Math.random()*s;
      g.fillStyle='rgba(112,104,90,0.30)';
      g.beginPath(); g.ellipse(x,y,8+Math.random()*20,5+Math.random()*12,Math.random(),0,Math.PI*2); g.fill();
    }
  },512);
}
// Board-and-batten siding, vertical boards with battens over the joints.
function boardTexture(base){
  return makeCanvasTexture((g,s)=>{
    g.fillStyle=base; g.fillRect(0,0,s,s);
    for(let i=0;i<2600;i++){
      const x=Math.random()*s, y=Math.random()*s;
      g.fillStyle=Math.random()>0.5?'rgba(0,0,0,0.055)':'rgba(255,255,255,0.05)';
      g.fillRect(x,y,2,1);
    }
    for(let x=0;x<s;x+=32){
      g.fillStyle='rgba(0,0,0,0.20)'; g.fillRect(x,0,2,s);           // joint shadow
      g.fillStyle='rgba(0,0,0,0.10)'; g.fillRect(x+3,0,5,s);         // batten shadow
      g.fillStyle='rgba(255,255,255,0.045)'; g.fillRect(x+8,0,3,s);  // batten highlight
    }
    // grain and a few nail-rust streaks
    g.strokeStyle='rgba(0,0,0,0.07)'; g.lineWidth=1;
    for(let i=0;i<130;i++){
      const x=Math.random()*s, y=Math.random()*s;
      g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+8+Math.random()*40); g.stroke();
    }
    for(let i=0;i<40;i++){
      const x=Math.floor(Math.random()*(s/32))*32+16, y=Math.random()*s;
      g.fillStyle='rgba(110,62,32,0.30)'; g.fillRect(x,y,2,6+Math.random()*14);
    }
  },512);
}

// Dark glass reads as real glass; a pale blue plane reads as paint. Windows are
// opaque and reflective, and a share of them warm up after dark.
function glassMaterial(){
  return new THREE.MeshStandardMaterial({
    color:0x14181c, roughness:0.06, metalness:0.9, envMapIntensity:1.5,
    emissive:0xffb460, emissiveIntensity:0,
  });
}
function registerWindow(mesh, lightChance=0.5){
  mesh.userData.nightLit = srand() < lightChance;
  mesh.userData.nightWarmth = srandRange(0.5, 1.4);
  windowMeshes.push(mesh);
  return mesh;
}

/**
 * Low-pitch gable roof: two sloped slabs, two end gables, fascia and a ridge
 * cap. Replaces the four-sided pyramid, which no building on the mesa had.
 * @param ridgeAlongX true when the ridge runs with the building's width
 */
function addGableRoof(scene, pos, w, d, wallTop, opts={}){
  const alongX = opts.ridgeAlongX !== false;
  const span = alongX ? d : w;            // the direction that slopes
  const runLen = alongX ? w : d;          // the direction the ridge runs
  const overhang = opts.overhang ?? 0.55;
  const rise = opts.rise ?? span * 0.19;
  const halfSpan = span / 2 + overhang;
  const slopeLen = Math.hypot(halfSpan, rise);
  const pitch = Math.atan2(rise, halfSpan);
  const thick = 0.16;
  const tex = tarPaperTexture();
  tex.repeat.set(Math.max(1, runLen / 5), Math.max(1, slopeLen / 4));
  const roofMat = new THREE.MeshStandardMaterial({
    // The map already carries the roofing colour; tint only when asked.
    color: opts.color ?? 0xffffff, map: tex, roughness:0.93, metalness:0.02,
  });
  const group = new THREE.Group();
  for(const side of [-1, 1]){
    const slab = new THREE.Mesh(new THREE.BoxGeometry(runLen + overhang*2, thick, slopeLen), roofMat);
    slab.position.set(0, rise/2, side * (halfSpan/2));
    slab.rotation.x = -side * pitch;
    slab.castShadow = true; slab.receiveShadow = true;
    group.add(slab);
  }
  // gable end triangles close the roof off
  const gableMat = new THREE.MeshStandardMaterial({ color: opts.gableColor ?? 0x6b5f4e, roughness:0.92 });
  for(const end of [-1, 1]){
    const shape = new THREE.Shape();
    shape.moveTo(-span/2, 0); shape.lineTo(span/2, 0); shape.lineTo(0, rise); shape.closePath();
    const tri = new THREE.Mesh(new THREE.ShapeGeometry(shape), gableMat);
    tri.position.set(end * runLen/2, 0, 0);
    tri.rotation.y = Math.PI/2;
    tri.castShadow = true;
    group.add(tri);
  }
  // fascia boards under the eaves — the shadow line they cast is what sells depth
  const fasciaMat = new THREE.MeshStandardMaterial({ color:0x53483a, roughness:0.93 });
  for(const side of [-1, 1]){
    const f = new THREE.Mesh(new THREE.BoxGeometry(runLen + overhang*2, 0.24, 0.1), fasciaMat);
    f.position.set(0, -0.06, side * halfSpan);
    f.castShadow = true;
    group.add(f);
  }
  // ridge cap
  const cap = new THREE.Mesh(new THREE.BoxGeometry(runLen + overhang*2, 0.1, 0.34), fasciaMat);
  cap.position.set(0, rise + 0.06, 0);
  group.add(cap);
  group.position.set(pos.x, wallTop, pos.z);
  if(!alongX) group.rotation.y = Math.PI/2;
  scene.add(group);
  return { group, rise, ridgeY: wallTop + rise };
}

/** Concrete pier plinth plus a skirt board — buildings never sit flush on dirt. */
function addPlinth(scene, pos, w, d, height=0.5){
  const skirt = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.14, height, d + 0.14),
    new THREE.MeshStandardMaterial({ color:0x4a443c, roughness:0.95 })
  );
  skirt.position.set(pos.x, height/2, pos.z);
  skirt.castShadow = true; skirt.receiveShadow = true;
  scene.add(skirt);
  // corner piers poking out of the ground
  const pierMat = new THREE.MeshStandardMaterial({ color:0x8a857c, roughness:0.94 });
  for(const sx of [-1,1]) for(const sz of [-1,1]){
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.5,height+0.12,0.5), pierMat);
    p.position.set(pos.x + sx*(w/2-0.4), (height+0.12)/2-0.06, pos.z + sz*(d/2-0.4));
    p.receiveShadow = true;
    scene.add(p);
  }
  return height;
}

/** Two-tread stoop up to a raised threshold. */
function addSteps(scene, x, z, angle, width, baseY){
  const mat = new THREE.MeshStandardMaterial({ color:0x6b5844, roughness:0.94 });
  for(let i=0;i<2;i++){
    const y = baseY * (1 - (i+1)/3);
    const depth = 0.42;
    const off = 0.55 + i*depth;
    const s = new THREE.Mesh(new THREE.BoxGeometry(width, Math.max(0.1, baseY/3), depth), mat);
    s.position.set(x + Math.sin(angle)*off, y + baseY/6, z + Math.cos(angle)*off);
    s.rotation.y = angle;
    s.castShadow = true; s.receiveShadow = true;
    scene.add(s);
  }
}

let stuccoTex, woodTex;
export function initWorld(canvas){
  resetSeed(20250716); // Trinity date — keeps the town identical every reload
  stuccoTex=stuccoTexture('#f0e6d2');
  woodTex=woodTexture();
  scene = new THREE.Scene();
  // Fog is aerial haze, not a draw-distance trick: on the mesa you can see
  // thirty miles, so it starts far out and only tints the ridges.
  scene.fog = new THREE.Fog(0xc8d6e2, 190, 640);

  // Renderer — PBR tone mapping
  renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Sky dome + image-based lighting. scene.environment is what gives every PBR
  // material something to reflect; without it the whole town reads as plastic.
  initSky(scene, renderer);
  buildRidges(scene);

  // Light rig. High-desert sun at 2200 m is hard and contrasty — a strong
  // directional with very little fill, not the flat 0.62 ambient wash.
  const ambient = new THREE.AmbientLight(0xffffff, 0.05);
  ambient.userData.baseIntensity=0.05;
  scene.add(ambient);
  scene.userData.ambient=ambient;
  const sun = new THREE.DirectionalLight(0xfff2d8, 4.4);
  sun.position.set(60, 80, 30);
  sun.castShadow = true;
  const shadowRes = (renderer.capabilities.maxTextureSize >= 8192) ? 4096 : 2048;
  sun.shadow.mapSize.set(shadowRes, shadowRes);
  sun.shadow.camera.near=0.5; sun.shadow.camera.far=340;
  sun.shadow.camera.left=-96; sun.shadow.camera.right=96; sun.shadow.camera.top=96; sun.shadow.camera.bottom=-96;
  sun.shadow.bias=-0.00022;
  sun.shadow.normalBias=0.022;
  sun.userData.baseIntensity=4.4;
  scene.add(sun);
  scene.userData.sun=sun;
  // Sky fill only — the ground bounce comes from the environment map now.
  const hemi = new THREE.HemisphereLight(0xbcd4ea, 0xa08a68, 0.12);
  hemi.userData.baseIntensity=0.12;
  scene.add(hemi);
  scene.userData.hemi=hemi;

  // Night lighting: bare bulbs on wooden poles along the two main roads.
  scene.userData.lamps=[];
  [[-24,19.2],[4,19.2],[26,19.2],[17.6,50],[17.6,80],[-48,-20]].forEach(([x,z])=>{
    const lamp=new THREE.PointLight(0xffc272, 0, 20, 1.8);
    lamp.position.set(x, 4.4, z);
    lamp.visible=false;
    scene.add(lamp);
    scene.userData.lamps.push(lamp);
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.14,4.6,7), new THREE.MeshStandardMaterial({color:0x4a3a2a, roughness:0.94}));
    pole.position.set(x,2.3,z); pole.castShadow=true;
    scene.add(pole);
    // enamel shade over a single bulb
    const shade=new THREE.Mesh(new THREE.ConeGeometry(0.44,0.3,12,1,true), new THREE.MeshStandardMaterial({color:0x2e2e2c, side:THREE.DoubleSide, roughness:0.6, metalness:0.3}));
    shade.position.set(x,4.62,z);
    scene.add(shade);
    const bulb=new THREE.Mesh(new THREE.SphereGeometry(0.13,10,8), new THREE.MeshStandardMaterial({color:0xffe0b0, emissive:0xffc272, emissiveIntensity:0}));
    bulb.position.set(x,4.4,z);
    bulb.userData.isLampBulb=true;
    scene.add(bulb);
    scene.userData.lamps.push(bulb);
    softColliders.push({x, z, r:0.4});
  });

  buildRoads(scene);

  // Division buildings (billboard removed — mission shown in top bar)
  GROUP_DEFS.forEach(d=>{
    createBuilding(d);
  });
  // Filler town buildings (no entry)
  FILLER_BUILDINGS.forEach(f=>{
    createFillerBuilding(f);
  });

  // Register the graded benches before anything else asks for a ground height,
  // so props, people and the terrain mesh all agree on where the ground is.
  setTerrainPads(colliders.slice());

  // Wire, towers, water tank, power lines, coal bins, laundry, vehicles.
  const props = buildProps(scene);
  props.hard.forEach(b=>colliders.push(b));
  props.soft.forEach(c=>softColliders.push(c));

  buildTerrain(scene);

  // Ponderosa forest — thinned in town, dense to the rim and down the canyons.
  const isBlocked=(x,z,pad)=>{
    for(const b of colliders){
      if(x > b.min.x-pad && x < b.max.x+pad && z > b.min.z-pad && z < b.max.z+pad) return true;
    }
    return false;
  };
  plantTrees(scene, isBlocked).forEach(c=>softColliders.push(c));

  addScatter();

  // three r160 has no scene.environmentIntensity, and a full-strength sky IBL
  // on every diffuse surface flattens the sun's shadows into nothing. Damp the
  // environment on matte materials only; glass, water and metal keep theirs.
  const damped=new Set();
  scene.traverse(o=>{
    const mats = Array.isArray(o.material) ? o.material : (o.material ? [o.material] : []);
    mats.forEach(m=>{
      if(!m.isMeshStandardMaterial || damped.has(m)) return;
      damped.add(m);
      if(m.roughness > 0.55) m.envMapIntensity = 0.40;
    });
  });

  // Bake the environment map once up front so materials have something to
  // reflect before the first game state exists.
  const h0=updateSky(scene, sun.position, 1);
  if(h0) scene.fog.color.copy(h0);

  // Resize handler
  window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createCentralBoard(){
  const w=13, h=7;
  centralBoardCanvas=document.createElement('canvas');
  centralBoardCanvas.width=900;
  centralBoardCanvas.height=420;
  centralBoardTexture=new THREE.CanvasTexture(centralBoardCanvas);
  centralBoardTexture.colorSpace=THREE.SRGBColorSpace;
  const geo=new THREE.BoxGeometry(w, h, 0.4);
  const matSide=new THREE.MeshStandardMaterial({ color: 0x2b2b2b });
  const matFront=new THREE.MeshStandardMaterial({ map: centralBoardTexture, side:THREE.DoubleSide });
  const matBack=new THREE.MeshStandardMaterial({ map: centralBoardTexture, side:THREE.DoubleSide });
  const mesh=new THREE.Mesh(geo, [matSide,matSide,matSide,matSide, matFront, matBack]);
  const boardX=8, boardZ=-2;
  mesh.position.set(boardX, h/2+0.8, boardZ);
  mesh.castShadow=true;
  mesh.userData={ type:'board', id:'central' };
  scene.add(mesh);
  centralBoardMesh=mesh;
  const legGeo=new THREE.BoxGeometry(0.25, h+0.6, 0.25);
  const legMat=new THREE.MeshStandardMaterial({ color: 0x3a2e22 });
  [[-w/2+0.5,0],[w/2-0.5,0]].forEach(([x,z])=>{
    const leg=new THREE.Mesh(legGeo, legMat);
    leg.position.set(boardX+x, (h+0.6)/2 -0.2, boardZ+z);
    scene.add(leg);
  });
  interactables.push({ mesh, type:'board', id:'central', prompt:'E — View Project Dashboard' });
  colliders.push(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(boardX, h/2+0.8, boardZ), new THREE.Vector3(w, h, 0.8)));
}

function createBuilding(definition){
  const data=BUILDING_DATA[definition.id];
  if(!data) return;
  const color=new THREE.Color(data.color);
  const pos=new THREE.Vector3(data.pos[0], 0, data.pos[2]);

  // Footprint per division — single storey, board-and-batten, on piers.
  const w=data.w, h=data.h, d=data.d;
  const baseY=addPlinth(scene, pos, w, d, 0.5);
  const wallTop=baseY+h;
  const wallTex=boardTexture(data.wall);
  wallTex.repeat.set(Math.max(1, w/4.2), Math.max(1, h/4.2));
  const baseMat=new THREE.MeshStandardMaterial({ map: wallTex, roughness:0.93, metalness:0.0 });
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w, h, d), baseMat);
  mesh.position.set(pos.x, baseY+h/2, pos.z);
  mesh.castShadow=true; mesh.receiveShadow=true;
  scene.add(mesh);
  // corner boards, as every wood-frame building on the mesa had
  const cornerMat=new THREE.MeshStandardMaterial({ color:new THREE.Color(data.wall).multiplyScalar(0.78), roughness:0.94 });
  for(const sx of [-1,1]) for(const sz of [-1,1]){
    const c=new THREE.Mesh(new THREE.BoxGeometry(0.22,h,0.22), cornerMat);
    c.position.set(pos.x + sx*(w/2-0.05), baseY+h/2, pos.z + sz*(d/2-0.05));
    c.castShadow=true; scene.add(c);
  }

  // Low-pitch gable, ridge along whichever way the building is longer.
  addGableRoof(scene, pos, w, d, wallTop, {
    ridgeAlongX: w>=d,
    gableColor: new THREE.Color(data.wall).multiplyScalar(0.9).getHex(),
  });
  // stovepipe, offset from the ridge
  const pipe=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.19,2.1,9), new THREE.MeshStandardMaterial({color:0x3a3632, roughness:0.85, metalness:0.25}));
  pipe.position.set(pos.x + w*0.24, wallTop + 1.5, pos.z + d*0.1);
  pipe.castShadow=true; scene.add(pipe);
  const cowl=new THREE.Mesh(new THREE.ConeGeometry(0.3,0.24,9), new THREE.MeshStandardMaterial({color:0x3a3632, roughness:0.8, metalness:0.3}));
  cowl.position.set(pos.x + w*0.24, wallTop + 2.65, pos.z + d*0.1); scene.add(cowl);

  // Door angle — cardinal snap (must be before sideWalls)
  const toCenter=new THREE.Vector3(0,0,0).sub(pos).normalize();
  let angle=Math.atan2(toCenter.x, toCenter.z);
  if(Math.abs(toCenter.x) > Math.abs(toCenter.z)){
    angle = toCenter.x > 0 ? Math.PI/2 : -Math.PI/2;
  } else {
    angle = toCenter.z > 0 ? 0 : Math.PI;
  }
  const isEastWest = Math.abs(Math.sin(angle)) > 0.5;
  const half = isEastWest ? w/2 : d/2;          // distance out to the door wall
  const wallHalf = isEastWest ? d/2 : w/2;      // half-width of the door wall

  // Fenestration: six-over-six sash along both side walls and the rear.
  // Each wall is described by its outward normal, how far that face sits from
  // the centre, and how far the run of windows may spread along it. The old
  // code offset windows 0.08 from the building *centre*, which buried every
  // one of them inside the walls, and left the back elevation blank besides.
  const walls=[
    { na: angle+Math.PI/2, out: wallHalf, spanHalf: half },
    { na: angle-Math.PI/2, out: wallHalf, spanHalf: half },
    { na: angle+Math.PI,   out: half,     spanHalf: wallHalf },
  ];
  const winY=baseY + h*0.55;
  const frameMatShared=new THREE.MeshStandardMaterial({color:0x24211c, roughness:0.9});
  const sashMat=new THREE.MeshStandardMaterial({color:0xd8d2c4, roughness:0.86});
  const sillMat=new THREE.MeshStandardMaterial({color:0xc9c0ac, roughness:0.9});
  walls.forEach(({na, out, spanHalf})=>{
    const usable=spanHalf*2 - 2.4;
    const nWin=Math.max(2, Math.floor(usable/3.2));
    const sn=Math.sin(na), cs=Math.cos(na);
    for(let k=0;k<nWin;k++){
      const along = nWin===1 ? 0 : (k - (nWin-1)/2) * (usable/(nWin-1));
      const at=(o)=>[pos.x + sn*(out+o) + cs*along, pos.z + cs*(out+o) - sn*along];
      const [fx,fz]=at(0.045);
      const frame=new THREE.Mesh(new THREE.BoxGeometry(1.24,1.62,0.09), frameMatShared);
      frame.position.set(fx, winY, fz); frame.rotation.y=na;
      frame.castShadow=true; scene.add(frame);
      const [gx,gz]=at(0.10);
      const glass=new THREE.Mesh(new THREE.PlaneGeometry(1.04,1.42), glassMaterial());
      glass.position.set(gx, winY, gz); glass.rotation.y=na;
      scene.add(glass);
      registerWindow(glass, 0.45);
      // six-over-six muntins: two vertical, three horizontal
      const [mxp,mzp]=at(0.115);
      for(const mx of [-0.35,0.35]){
        const mv=new THREE.Mesh(new THREE.BoxGeometry(0.035,1.42,0.02), sashMat);
        mv.position.set(mxp + cs*mx, winY, mzp - sn*mx);
        mv.rotation.y=na; scene.add(mv);
      }
      for(const my of [-0.45,0,0.45]){
        const mh=new THREE.Mesh(new THREE.BoxGeometry(1.04,0.035,0.02), sashMat);
        mh.position.set(mxp, winY+my, mzp);
        mh.rotation.y=na; scene.add(mh);
      }
      const [sx,sz]=at(0.09);
      const sill=new THREE.Mesh(new THREE.BoxGeometry(1.36,0.09,0.16), sillMat);
      sill.position.set(sx, winY-0.85, sz);
      sill.rotation.y=na; sill.castShadow=true; scene.add(sill);
    }
  });

  // Door — human scale, on the raised threshold, with a stoop.
  const doorW=1.7, doorH=2.35;
  const doorMat=new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness:0.88, metalness:0.02 });
  const door=new THREE.Mesh(new THREE.PlaneGeometry(doorW, doorH), doorMat);
  const doorOff = half+0.07;
  const doorBaseY = baseY;
  door.position.set(pos.x + Math.sin(angle)*doorOff, doorBaseY + doorH/2, pos.z + Math.cos(angle)*doorOff);
  door.rotation.y=angle;
  scene.add(door);
  // recessed casing
  const casing=new THREE.Mesh(new THREE.BoxGeometry(doorW+0.3, doorH+0.24, 0.1), frameMatShared);
  casing.position.set(pos.x + Math.sin(angle)*(half+0.03), doorBaseY + doorH/2, pos.z + Math.cos(angle)*(half+0.03));
  casing.rotation.y=angle; casing.castShadow=true; scene.add(casing);
  // four raised panels
  for(const py of [-0.55, 0.55]) for(const px of [-0.34, 0.34]){
    const p=new THREE.Mesh(new THREE.BoxGeometry(0.52,0.78,0.02), new THREE.MeshStandardMaterial({color:0x3d2b1c, roughness:0.9}));
    p.position.set(pos.x + Math.sin(angle)*(doorOff+0.02) + Math.cos(angle)*px, doorBaseY + doorH/2 + py, pos.z + Math.cos(angle)*(doorOff+0.02) - Math.sin(angle)*px);
    p.rotation.y=angle; scene.add(p);
  }
  const handle=new THREE.Mesh(new THREE.SphereGeometry(0.055,10,8), new THREE.MeshStandardMaterial({color:0x8f7c52, metalness:0.7, roughness:0.35}));
  handle.position.set(pos.x + Math.sin(angle)*(half+0.12) + Math.cos(angle)*0.62, doorBaseY+1.05, pos.z + Math.cos(angle)*(half+0.12) - Math.sin(angle)*0.62);
  scene.add(handle);
  addSteps(scene, pos.x + Math.sin(angle)*half, pos.z + Math.cos(angle)*half, angle, doorW+0.7, baseY);
  // small shed hood over the door
  const hood=new THREE.Mesh(new THREE.BoxGeometry(doorW+1.1, 0.11, 1.0), new THREE.MeshStandardMaterial({color:0x3a3630, roughness:0.92}));
  hood.position.set(pos.x + Math.sin(angle)*(half+0.5), doorBaseY+doorH+0.4, pos.z + Math.cos(angle)*(half+0.5));
  hood.rotation.set(0, angle, 0);
  hood.rotation.x = -0.16*Math.cos(angle); hood.rotation.z = 0.16*Math.sin(angle);
  hood.castShadow=true; scene.add(hood);

  // Sign — stencilled board. The keypress hint lives in the HUD, not the world.
  const signCanvas=document.createElement('canvas');
  signCanvas.width=1024; signCanvas.height=256;
  const sctx=signCanvas.getContext('2d');
  sctx.fillStyle='#e6dfcd'; sctx.fillRect(0,0,1024,256);
  // painted board grain + weathering
  for(let i=0;i<900;i++){
    sctx.fillStyle=Math.random()>0.5?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.05)';
    sctx.fillRect(Math.random()*1024, Math.random()*256, 6, 1);
  }
  sctx.fillStyle='#2c2822'; sctx.fillRect(0,0,1024,5); sctx.fillRect(0,251,1024,5);
  const SHORT_LABELS={T:'THEORY',P:'EXPERIMENTAL PHYSICS',CM:'CHEMISTRY & METALLURGY',E:'ORDNANCE',X:'IMPLOSION'};
  const SUB_LABELS={T:'NEUTRONICS & CALC.',P:'DIAGNOSTICS',CM:'MATERIALS',E:'ENGINEERING',X:'SYSTEMS INTEGRATION'};
  sctx.fillStyle=color.getStyle(); sctx.fillRect(0,5,190,246);
  sctx.fillStyle='#f2ece0'; sctx.textAlign='center'; sctx.textBaseline='middle';
  sctx.font = definition.code.length>1 ? '900 88px Georgia, serif' : '900 112px Georgia, serif';
  sctx.fillText(definition.code, 95, 132);
  const shortName = SHORT_LABELS[definition.id] || definition.name.toUpperCase();
  sctx.fillStyle='#231f19'; sctx.textAlign='left'; sctx.textBaseline='alphabetic';
  let nameFontSize=44;
  sctx.font=`900 ${nameFontSize}px Georgia, serif`;
  while(sctx.measureText(shortName).width > 760 && nameFontSize>22){ nameFontSize-=2; sctx.font=`900 ${nameFontSize}px Georgia, serif`; }
  sctx.fillText(shortName, 224, 126);
  sctx.fillStyle='#5b544a'; sctx.font='700 20px Georgia, serif';
  sctx.fillText(SUB_LABELS[definition.id]||'', 224, 166);
  const signTex=new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace=THREE.SRGBColorSpace; signTex.anisotropy=8; signTex.minFilter=THREE.LinearMipmapLinearFilter; signTex.generateMipmaps=true;
  const signW=Math.min(8.0, wallHalf*2 - 1.2);
  const sign=new THREE.Mesh(
    new THREE.PlaneGeometry(signW, signW*0.25),
    new THREE.MeshStandardMaterial({ map: signTex, transparent:false, roughness:0.88, side:THREE.DoubleSide })
  );
  const signOff = half+0.14;
  const signY = wallTop-1.15;
  sign.position.set(pos.x + Math.sin(angle)*signOff, signY, pos.z + Math.cos(angle)*signOff);
  sign.rotation.y=angle;
  scene.add(sign);

  // Status: a hooded signal lamp over the door, not a floating orb.
  const sideOffset = new THREE.Vector3(Math.cos(angle),0,-Math.sin(angle));
  const lampY = doorBaseY + doorH + 0.75;
  const lightMat=new THREE.MeshStandardMaterial({ color: 0x3d6f52, emissive: 0x3d6f52, emissiveIntensity: 0.12, roughness:0.35, metalness:0.1 });
  const light=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.42,0.1), lightMat);
  light.position.set(pos.x + Math.sin(angle)*(half+0.1), lampY, pos.z + Math.cos(angle)*(half+0.1));
  light.rotation.y=angle;
  scene.add(light);
  const lampHood=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.08,0.2), new THREE.MeshStandardMaterial({color:0x2e2b26, roughness:0.8, metalness:0.2}));
  lampHood.position.set(pos.x + Math.sin(angle)*(half+0.14), lampY+0.26, pos.z + Math.cos(angle)*(half+0.14));
  lampHood.rotation.y=angle; scene.add(lampHood);

  // Readiness board — a chalked status slate beside the door, as posted daily.
  const boardCanvas=document.createElement('canvas');
  boardCanvas.width=420; boardCanvas.height=220;
  boardCanvas._ctx=boardCanvas.getContext('2d');
  const boardTex=new THREE.CanvasTexture(boardCanvas);
  boardTex.colorSpace=THREE.SRGBColorSpace;
  const boardW=3.4, boardH=1.8;
  const board=new THREE.Mesh(
    new THREE.PlaneGeometry(boardW, boardH),
    new THREE.MeshStandardMaterial({ map: boardTex, side:THREE.DoubleSide, roughness:0.95 })
  );
  const boardLateral=Math.min(3.4, wallHalf - boardW/2 - 0.2);
  board.position.set(
    pos.x + sideOffset.x*boardLateral + Math.sin(angle)*(half+0.06), 2.2,
    pos.z + sideOffset.z*boardLateral + Math.cos(angle)*(half+0.06)
  );
  board.rotation.y=angle;
  scene.add(board);
  // slate frame
  const bFrame=new THREE.Mesh(new THREE.BoxGeometry(boardW+0.16, boardH+0.16, 0.07), new THREE.MeshStandardMaterial({color:0x4a3a2a, roughness:0.93}));
  bFrame.position.copy(board.position).addScaledVector(new THREE.Vector3(Math.sin(angle),0,Math.cos(angle)), -0.03);
  bFrame.rotation.y=angle; bFrame.castShadow=true; scene.add(bFrame);

  // Equipment near entrance (distinct per division)
  addEquipment(definition.id, pos, angle, color);

  // Store
  buildingMeshes.set(definition.id, { mesh, doorMesh: door, signMesh: sign, lightMesh: light, boardCanvas, boardTex, boardMesh: board, pos, angle, color: data.color });
  interactables.push({ mesh: door, type:'door', id: definition.id, prompt:`E — Enter ${definition.name}` });

  // Collider for building
  const box=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(pos.x, (baseY+h)/2, pos.z), new THREE.Vector3(w+0.6, baseY+h, d+0.6));
  colliders.push(box);
}

function addEquipment(id, pos, angle, color){
  // Different equipment visible near entrance
  const offset = new THREE.Vector3(Math.cos(angle),0,-Math.sin(angle)).multiplyScalar(3.5);
  const basePos=new THREE.Vector3(pos.x+offset.x+ Math.sin(angle)*2, 0, pos.z+offset.z+ Math.cos(angle)*2);
  if(id==='T'){
    // blackboard + papers
    const board=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.4,0.08), new THREE.MeshStandardMaterial({color:0x2e3d2e}));
    board.position.set(basePos.x,1.1,basePos.z); board.rotation.y=angle+0.4; scene.add(board);
    const desk=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.7,0.9), new THREE.MeshStandardMaterial({color:0x8a6a3a}));
    desk.position.set(basePos.x+1.0,0.35,basePos.z); scene.add(desk);
  } else if(id==='P'){
    const scope=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1.0,12), new THREE.MeshStandardMaterial({color:0x5a6a7a}));
    scope.position.set(basePos.x,0.8,basePos.z); scope.rotation.z=0.2; scene.add(scope);
    const bench=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.6,0.9), new THREE.MeshStandardMaterial({color:0xd0d0d0}));
    bench.position.set(basePos.x+0.6,0.3,basePos.z); scene.add(bench);
  } else if(id==='CM'){
    const furnace=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.2,1.1), new THREE.MeshStandardMaterial({color:0x8a6921}));
    furnace.position.set(basePos.x,0.6,basePos.z); scene.add(furnace);
    const micro=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.3,0.7,10), new THREE.MeshStandardMaterial({color:0x333333}));
    micro.position.set(basePos.x+1.1,0.9,basePos.z); scene.add(micro);
  } else if(id==='E'){
    const casing=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,1.6,12), new THREE.MeshStandardMaterial({color:0x865044}));
    casing.rotation.z=Math.PI/2; casing.position.set(basePos.x,0.7,basePos.z); scene.add(casing);
    const bench=new THREE.Mesh(new THREE.BoxGeometry(1.7,0.6,1.0), new THREE.MeshStandardMaterial({color:0x9a8a73}));
    bench.position.set(basePos.x+0.5,0.3,basePos.z); scene.add(bench);
  } else if(id==='X'){
    const lens=new THREE.Mesh(new THREE.SphereGeometry(0.55,12,12), new THREE.MeshStandardMaterial({color:0x704f88, transparent:true, opacity:0.7}));
    lens.position.set(basePos.x,0.9,basePos.z); scene.add(lens);
    const diag=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.7,0.05), new THREE.MeshStandardMaterial({color:0xfffefb}));
    diag.position.set(basePos.x+1.0,1.0,basePos.z); diag.rotation.y=angle+0.2; scene.add(diag);
  }
  // fences around
  const fenceGeo=new THREE.BoxGeometry(0.08,1.0,6);
  const fenceMat=new THREE.MeshStandardMaterial({color:0x9a8a73});
  for(let i=-1;i<=1;i+=2){
    const fence=new THREE.Mesh(fenceGeo, fenceMat);
    fence.position.set(basePos.x + i*3.2,0.5,basePos.z + (i*0.6));
    fence.rotation.y=angle;
    scene.add(fence);
  }
}

function createFillerBuilding(f){
  // Ashley Pond — dark reflective water, gravel rim, cut-ice edge
  if(f.pond){
    const pond=new THREE.Mesh(
      new THREE.CircleGeometry(f.w/2, 40),
      // Rough enough that the grazing-angle Fresnel reads as water sheen
      // rather than blowing the whole surface out to white.
      new THREE.MeshStandardMaterial({ color:0x22333a, roughness:0.22, metalness:0.06, envMapIntensity:0.45 })
    );
    pond.rotation.x=-Math.PI/2; pond.position.set(f.pos[0], -0.12, f.pos[2]); pond.receiveShadow=true; scene.add(pond);
    // dug bank: a shallow cone shell so the water sits below grade
    const bank=new THREE.Mesh(
      new THREE.CylinderGeometry(f.w/2+0.1, f.w/2-1.4, 0.9, 40, 1, true),
      new THREE.MeshStandardMaterial({ color:0x6b5f4a, roughness:0.96, side:THREE.DoubleSide })
    );
    bank.position.set(f.pos[0], -0.45, f.pos[2]); bank.receiveShadow=true; scene.add(bank);
    const rim=new THREE.Mesh(
      new THREE.RingGeometry(f.w/2, f.w/2+1.5, 40),
      new THREE.MeshStandardMaterial({color:0x8a7f68, roughness:0.95, side:THREE.DoubleSide})
    );
    rim.rotation.x=-Math.PI/2; rim.position.set(f.pos[0], 0.015, f.pos[2]); rim.receiveShadow=true; scene.add(rim);
    // a few stones set into the bank
    const stoneMat=new THREE.MeshStandardMaterial({color:0x8d8477, roughness:0.93});
    for(let i=0;i<18;i++){
      const a=srand()*Math.PI*2, r=f.w/2+srandRange(0.2,1.2);
      const s=new THREE.Mesh(new THREE.DodecahedronGeometry(srandRange(0.18,0.42),0), stoneMat);
      s.position.set(f.pos[0]+Math.cos(a)*r, 0.08, f.pos[2]+Math.sin(a)*r);
      s.rotation.set(srand()*3, srand()*3, srand()*3);
      s.castShadow=true; scene.add(s);
    }
    // low post-and-rail sign, not a floating placard
    const cvs=document.createElement('canvas'); cvs.width=512; cvs.height=128;
    const ctx=cvs.getContext('2d'); ctx.fillStyle='#e6dfcd'; ctx.fillRect(0,0,512,128);
    ctx.fillStyle='#2c2822'; ctx.fillRect(0,0,512,4); ctx.fillRect(0,124,512,4);
    ctx.fillStyle='#231f19'; ctx.font='900 26px Georgia, serif'; ctx.textAlign='center'; ctx.fillText(f.name.toUpperCase(),256,72);
    const tex=new THREE.CanvasTexture(cvs); tex.colorSpace=THREE.SRGBColorSpace; tex.anisotropy=8;
    const signZ=f.pos[2]-f.w/2-1.8;
    // Front face only, on a plain board — a double-sided map shows the legend
    // mirrored when you walk behind the sign.
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(3.2,0.8), new THREE.MeshStandardMaterial({map:tex, roughness:0.9}));
    sign.position.set(f.pos[0], 1.15, signZ); scene.add(sign);
    const backer=new THREE.Mesh(new THREE.BoxGeometry(3.3,0.9,0.08), new THREE.MeshStandardMaterial({color:0x6b5844, roughness:0.94}));
    backer.position.set(f.pos[0], 1.15, signZ-0.05); backer.castShadow=true; scene.add(backer);
    for(const dx of [-1.5,1.5]){
      const post=new THREE.Mesh(new THREE.BoxGeometry(0.11,1.5,0.11), new THREE.MeshStandardMaterial({color:0x4a3a2a, roughness:0.94}));
      post.position.set(f.pos[0]+dx, 0.75, signZ); post.castShadow=true; scene.add(post);
    }
    if(f.info){
      const hit=new THREE.Mesh(new THREE.BoxGeometry(3.4,1.4,0.2), new THREE.MeshStandardMaterial({visible:false}));
      hit.position.set(f.pos[0], 1.15, signZ); scene.add(hit);
      interactables.push({ mesh: hit, type:'info', id:f.id, prompt:`E — Read: ${f.name}`, info:f.info });
    }
    return;
  }

  const pos=new THREE.Vector3(f.pos[0],0,f.pos[2]);
  const color=new THREE.Color(f.color);
  const w=f.w, d=f.d, h=f.h;
  const isLog=!!f.log;
  // Everything sits on piers; only the Ranch School buildings are log.
  const plinthH=f.hut ? 0.22 : (isLog ? 0.6 : 0.45);
  const baseY=addPlinth(scene, pos, w, d, plinthH);
  const wallTop=baseY+h;
  let mat;
  if(isLog){
    const t=woodTexture(); t.repeat.set(Math.max(1,w/5), Math.max(1,h/5));
    mat=new THREE.MeshStandardMaterial({ map:t, roughness:0.9, metalness:0 });
  } else {
    const t=boardTexture(color.getStyle()); t.repeat.set(Math.max(1,w/4.0), Math.max(1,h/4.0));
    mat=new THREE.MeshStandardMaterial({ map:t, roughness:0.93, metalness:0 });
  }
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
  mesh.position.set(pos.x, baseY+h/2, pos.z);
  mesh.castShadow=true; mesh.receiveShadow=true;
  scene.add(mesh);
  // corner boards
  if(!isLog && !f.hut){
    const cornerMat=new THREE.MeshStandardMaterial({ color:color.clone().multiplyScalar(0.74), roughness:0.94 });
    for(const sx of [-1,1]) for(const sz of [-1,1]){
      const c=new THREE.Mesh(new THREE.BoxGeometry(0.2,h,0.2), cornerMat);
      c.position.set(pos.x + sx*(w/2-0.04), baseY+h/2, pos.z + sz*(d/2-0.04));
      c.castShadow=true; scene.add(c);
    }
  }

  // A shared six-over-six sash window on the front elevation.
  const frameMat=new THREE.MeshStandardMaterial({color:0x24211c, roughness:0.9});
  const sashMat=new THREE.MeshStandardMaterial({color:0xd8d2c4, roughness:0.86});
  const sillMat=new THREE.MeshStandardMaterial({color:0xc9c0ac, roughness:0.9});
  function frontWindow(wx, wy, ww=1.06, wh=1.34, lightChance=0.5){
    const fr=new THREE.Mesh(new THREE.BoxGeometry(ww+0.2, wh+0.2, 0.09), frameMat);
    fr.position.set(wx, wy, pos.z + d/2+0.045); fr.castShadow=true; scene.add(fr);
    const glass=new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), glassMaterial());
    glass.position.set(wx, wy, pos.z + d/2+0.10); scene.add(glass);
    registerWindow(glass, lightChance);
    const mv=new THREE.Mesh(new THREE.BoxGeometry(0.035, wh, 0.02), sashMat);
    mv.position.set(wx, wy, pos.z + d/2+0.115); scene.add(mv);
    for(const my of [-wh*0.3, wh*0.3]){
      const mh=new THREE.Mesh(new THREE.BoxGeometry(ww, 0.035, 0.02), sashMat);
      mh.position.set(wx, wy+my, pos.z + d/2+0.115); scene.add(mh);
    }
    const sill=new THREE.Mesh(new THREE.BoxGeometry(ww+0.32, 0.09, 0.16), sillMat);
    sill.position.set(wx, wy-wh/2-0.16, pos.z + d/2+0.09); sill.castShadow=true; scene.add(sill);
    return glass;
  }
  function frontDoor(dx, dw=1.6, dh=2.2){
    const casing=new THREE.Mesh(new THREE.BoxGeometry(dw+0.26, dh+0.22, 0.1), frameMat);
    casing.position.set(dx, baseY+dh/2, pos.z + d/2+0.04); casing.castShadow=true; scene.add(casing);
    const door=new THREE.Mesh(new THREE.PlaneGeometry(dw, dh), new THREE.MeshStandardMaterial({color:0x4a3524, roughness:0.88}));
    door.position.set(dx, baseY+dh/2, pos.z + d/2+0.10); scene.add(door);
    const knob=new THREE.Mesh(new THREE.SphereGeometry(0.05,10,8), new THREE.MeshStandardMaterial({color:0x8f7c52, metalness:0.7, roughness:0.35}));
    knob.position.set(dx+dw/2-0.16, baseY+1.02, pos.z + d/2+0.14); scene.add(knob);
    if(baseY>0.2) addSteps(scene, dx, pos.z + d/2, 0, dw+0.5, baseY);
  }

  // Roof and the silhouette details that tell the building types apart.
  if(isLog){
    // Fuller Lodge and the Big House: John Gaw Meem ponderosa log, steeper roof
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.30, overhang:0.9, color:0xc8a882, gableColor:0x6b4226 });
    // projecting log ends at the corners
    for(let i=0;i<Math.floor(h/0.95);i++){
      for(const sz of [-1,1]){
        for(const sx of [-1,1]){
          const log=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.17,0.9,7), new THREE.MeshStandardMaterial({color:0x6b4226, roughness:0.92}));
          log.rotation.z=Math.PI/2;
          log.position.set(pos.x + sx*(w/2+0.28), baseY+0.6+i*0.95, pos.z + sz*(d/2-0.1));
          log.castShadow=true; scene.add(log);
        }
      }
    }
    // river-stone chimney
    const stone=new THREE.Mesh(new THREE.BoxGeometry(1.7,h+2.6,1.0), new THREE.MeshStandardMaterial({color:0x8a8478, roughness:0.95}));
    stone.position.set(pos.x+w/2-1.4, (h+2.6)/2, pos.z); stone.castShadow=true; scene.add(stone);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(1.95,0.2,1.25), new THREE.MeshStandardMaterial({color:0x5f5a50, roughness:0.94}));
    cap.position.set(pos.x+w/2-1.4, h+2.7, pos.z); scene.add(cap);
    // porch across the front
    const porchD=2.2;
    const deck=new THREE.Mesh(new THREE.BoxGeometry(w*0.8, 0.16, porchD), new THREE.MeshStandardMaterial({color:0x6b5844, roughness:0.94}));
    deck.position.set(pos.x, baseY-0.08, pos.z+d/2+porchD/2); deck.castShadow=true; deck.receiveShadow=true; scene.add(deck);
    const porchRoof=new THREE.Mesh(new THREE.BoxGeometry(w*0.84, 0.14, porchD+0.4), new THREE.MeshStandardMaterial({color:0x3a3630, roughness:0.93}));
    porchRoof.position.set(pos.x, baseY+2.6, pos.z+d/2+porchD/2); porchRoof.rotation.x=-0.1; porchRoof.castShadow=true; scene.add(porchRoof);
    for(let k=-2;k<=2;k++){
      const p=new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.15,2.6,8), new THREE.MeshStandardMaterial({color:0x6b4226, roughness:0.92}));
      p.position.set(pos.x + k*(w*0.19), baseY+1.3, pos.z+d/2+porchD-0.25); p.castShadow=true; scene.add(p);
    }
    addSteps(scene, pos.x, pos.z+d/2+porchD, 0, 3.0, baseY);
    for(let i=-1;i<=1;i+=2) frontWindow(pos.x + i*4.6, baseY+h*0.55, 1.2, 1.5, 0.75);
  } else if(f.row){
    // Sundt 4-plex: two storeys, four front doors, two chimneys
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.22, gableColor:0x7a6a4e });
    for(let i=-1.5;i<=1.5;i++){
      const cx=pos.x + i*4.0;
      frontDoor(cx, 1.0, 1.95);
      frontWindow(cx, wallTop-1.5, 0.92, 1.0, 0.55);
      frontWindow(cx-1.5, baseY+1.1, 0.8, 0.9, 0.35);
    }
    for(const dx of [-w*0.26, w*0.26]){
      const chim=new THREE.Mesh(new THREE.BoxGeometry(0.85,2.5,0.85), new THREE.MeshStandardMaterial({color:0x554a3c, roughness:0.94}));
      chim.position.set(pos.x+dx, wallTop+1.4, pos.z); chim.castShadow=true; scene.add(chim);
    }
  } else if(f.duplex){
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.22, gableColor:0x8a7c66 });
    for(let i=-1;i<=1;i+=2){
      const cx=pos.x + i*3.2;
      frontDoor(cx, 0.95, 1.9);
      frontWindow(cx+1.5, baseY+1.35, 0.95, 1.0, 0.5);
    }
    const chim=new THREE.Mesh(new THREE.BoxGeometry(0.8,2.2,0.8), new THREE.MeshStandardMaterial({color:0x554a3c, roughness:0.94}));
    chim.position.set(pos.x, wallTop+1.2, pos.z); chim.castShadow=true; scene.add(chim);
  } else if(f.hut){
    // Pacific Hut: half-cylinder plywood arch, pot-belly stovepipe, no foundation
    const arch=new THREE.Mesh(
      new THREE.CylinderGeometry(d/2, d/2, w+0.5, 16, 1, false, 0, Math.PI),
      new THREE.MeshStandardMaterial({color:0x8a8272, roughness:0.94, side:THREE.DoubleSide, flatShading:true})
    );
    arch.rotation.z=Math.PI/2; arch.position.set(pos.x, baseY+h, pos.z);
    arch.castShadow=true; arch.receiveShadow=true; scene.add(arch);
    // ribs
    for(let i=-2;i<=2;i++){
      const rib=new THREE.Mesh(new THREE.TorusGeometry(d/2+0.04, 0.05, 4, 14, Math.PI), new THREE.MeshStandardMaterial({color:0x5f5949, roughness:0.93}));
      rib.rotation.y=Math.PI/2; rib.position.set(pos.x+i*(w/5), baseY+h, pos.z); scene.add(rib);
    }
    // flat end walls with a door and one small window
    for(const sz of [-1,1]){
      const endShape=new THREE.Shape();
      endShape.absarc(0,0,d/2,0,Math.PI,false);
      const end=new THREE.Mesh(new THREE.ShapeGeometry(endShape), new THREE.MeshStandardMaterial({color:0x7d7566, roughness:0.94, side:THREE.DoubleSide}));
      end.position.set(pos.x + sz*(w/2+0.26), baseY+h, pos.z);
      end.rotation.y=Math.PI/2; scene.add(end);
    }
    frontDoor(pos.x, 0.9, 1.85);
    const pipe=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.13,1.6,8), new THREE.MeshStandardMaterial({color:0x3a3632, roughness:0.85, metalness:0.25}));
    pipe.position.set(pos.x+w*0.3, baseY+h+d/2*0.8, pos.z); pipe.castShadow=true; scene.add(pipe);
  } else if(f.dorm || f.barracks){
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.19, gableColor: f.barracks?0x4e5a4c:0xbdb6a6 });
    const nWin=5;
    for(let i=0;i<nWin;i++){
      const wx=pos.x + (i-(nWin-1)/2)*((w-2.6)/(nWin-1));
      frontWindow(wx, baseY+h*0.55, 1.0, 1.1, 0.6);
    }
    frontDoor(pos.x + w/2-1.6, 1.1, 2.05);
    if(f.barracks){
      const flagPole=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,7.5,7), new THREE.MeshStandardMaterial({color:0xe4dfd2, roughness:0.8}));
      flagPole.position.set(pos.x, 3.75, pos.z+d/2+3.2); flagPole.castShadow=true; scene.add(flagPole);
      const flag=new THREE.Mesh(new THREE.PlaneGeometry(2.0,1.15,6,4), new THREE.MeshStandardMaterial({color:0x8d3a34, roughness:0.92, side:THREE.DoubleSide}));
      const fp=flag.geometry.attributes.position;
      for(let v=0;v<fp.count;v++) fp.setZ(v, Math.sin(fp.getX(v)*2.4)*0.13);
      fp.needsUpdate=true; flag.geometry.computeVertexNormals();
      flag.position.set(pos.x+1.05, 6.5, pos.z+d/2+3.2); flag.castShadow=true; scene.add(flag);
    }
  } else if(f.theater){
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.17, gableColor:0x554a3c });
    // marquee: box with a lamp valance
    const marquee=new THREE.Mesh(new THREE.BoxGeometry(w*0.72,1.0,1.6), new THREE.MeshStandardMaterial({color:0xcfc7b4, roughness:0.9}));
    marquee.position.set(pos.x, wallTop-1.5, pos.z+d/2+0.8); marquee.castShadow=true; scene.add(marquee);
    const valance=new THREE.Mesh(new THREE.BoxGeometry(w*0.74,0.16,1.8), new THREE.MeshStandardMaterial({color:0x8d3a34, roughness:0.9}));
    valance.position.set(pos.x, wallTop-2.06, pos.z+d/2+0.85); scene.add(valance);
    for(let i=0;i<9;i++){
      const bulb=new THREE.Mesh(new THREE.SphereGeometry(0.075,8,6), new THREE.MeshStandardMaterial({color:0xfff0cf, emissive:0xffc272, emissiveIntensity:0}));
      bulb.position.set(pos.x + (i-4)*(w*0.08), wallTop-2.16, pos.z+d/2+1.7);
      bulb.userData.isMarqueeBulb=true; scene.add(bulb);
      windowMeshes.push(bulb); bulb.userData.nightLit=true; bulb.userData.nightWarmth=1.6;
    }
    // double entrance doors
    frontDoor(pos.x-0.85, 1.3, 2.3);
    frontDoor(pos.x+0.85, 1.3, 2.3);
    for(const i of [-1,1]) frontWindow(pos.x + i*(w*0.36), baseY+h*0.62, 0.9, 1.0, 0.3);
  } else if(f.px){
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.18, gableColor:0x8a7440 });
    // shop awning on posts
    const aw=new THREE.Mesh(new THREE.BoxGeometry(w*0.94,0.16,2.4), new THREE.MeshStandardMaterial({color:0xb8a882, roughness:0.93}));
    aw.position.set(pos.x, baseY+2.9, pos.z+d/2+1.2); aw.rotation.x=-0.11; aw.castShadow=true; scene.add(aw);
    for(const dx of [-w*0.4, 0, w*0.4]){
      const p=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.08,2.8,6), new THREE.MeshStandardMaterial({color:0x4a3a2a, roughness:0.94}));
      p.position.set(pos.x+dx, baseY+1.4, pos.z+d/2+2.3); p.castShadow=true; scene.add(p);
    }
    // shop windows, then the door
    for(const i of [-1,1]) frontWindow(pos.x + i*2.9, baseY+1.7, 2.0, 1.5, 0.85);
    frontDoor(pos.x, 1.5, 2.2);
    // mail boxes beside the door
    for(let i=-1;i<=1;i++){
      const bx=new THREE.Mesh(new THREE.BoxGeometry(0.8,1.0,0.36), new THREE.MeshStandardMaterial({color:0x2f4552, roughness:0.7, metalness:0.3}));
      bx.position.set(pos.x + w/2 + 1.4, baseY+0.5, pos.z + d/2 - 1 + i*1.0);
      bx.castShadow=true; scene.add(bx);
    }
  } else if(f.chapel){
    // white clapboard chapel: steeper roof, square belfry, spire, cross
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:false, rise:w*0.42, overhang:0.4, gableColor:0xe8e4da });
    const belfry=new THREE.Mesh(new THREE.BoxGeometry(2.1,2.4,2.1), new THREE.MeshStandardMaterial({color:0xefebe1, roughness:0.9}));
    belfry.position.set(pos.x, wallTop+w*0.42+1.2, pos.z-d/2+2.2); belfry.castShadow=true; scene.add(belfry);
    for(const [ax,az,ry] of [[0,-1.06,0],[0,1.06,0],[-1.06,0,Math.PI/2],[1.06,0,Math.PI/2]]){
      const louvre=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.6), new THREE.MeshStandardMaterial({color:0x2a2620, roughness:0.9}));
      louvre.position.set(pos.x+ax, wallTop+w*0.42+1.25, pos.z-d/2+2.2+az); louvre.rotation.y=ry; scene.add(louvre);
    }
    const bell=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.42,0.55,10), new THREE.MeshStandardMaterial({color:0x8f7c52, metalness:0.65, roughness:0.4}));
    bell.position.set(pos.x, wallTop+w*0.42+1.15, pos.z-d/2+2.2); scene.add(bell);
    const spire=new THREE.Mesh(new THREE.ConeGeometry(1.5,3.4,4), new THREE.MeshStandardMaterial({color:0x4a5560, roughness:0.85}));
    spire.rotation.y=Math.PI/4;
    spire.position.set(pos.x, wallTop+w*0.42+4.1, pos.z-d/2+2.2); spire.castShadow=true; scene.add(spire);
    const crossV=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.95,0.08), new THREE.MeshStandardMaterial({color:0xdccb9f, metalness:0.4, roughness:0.5}));
    crossV.position.set(pos.x, wallTop+w*0.42+6.25, pos.z-d/2+2.2); scene.add(crossV);
    const crossH=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.1,0.08), crossV.material);
    crossH.position.set(pos.x, wallTop+w*0.42+6.4, pos.z-d/2+2.2); scene.add(crossH);
    // paper "stained" lancet over the door
    const lancet=new THREE.Mesh(new THREE.PlaneGeometry(1.5,2.1), new THREE.MeshStandardMaterial({color:0x3b2a4a, emissive:0x6a4a86, emissiveIntensity:0.14, roughness:0.6}));
    lancet.position.set(pos.x, baseY+h*0.62, pos.z+d/2+0.06); scene.add(lancet);
    windowMeshes.push(lancet); lancet.userData.nightLit=true; lancet.userData.nightWarmth=0.8;
    frontDoor(pos.x, 1.5, 2.3);
  } else if(f.infirmary){
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.19, gableColor:0xe6e2d8 });
    const crossMat=new THREE.MeshStandardMaterial({color:0x9a3f36, roughness:0.85});
    const v=new THREE.Mesh(new THREE.BoxGeometry(0.55,1.9,0.07), crossMat);
    v.position.set(pos.x, wallTop-1.2, pos.z+d/2+0.06); scene.add(v);
    const hv=new THREE.Mesh(new THREE.BoxGeometry(1.9,0.55,0.07), crossMat);
    hv.position.set(pos.x, wallTop-1.2, pos.z+d/2+0.06); scene.add(hv);
    // ambulance canopy on posts
    const canopy=new THREE.Mesh(new THREE.BoxGeometry(4.4,0.16,2.6), new THREE.MeshStandardMaterial({color:0xe6e2d8, roughness:0.9}));
    canopy.position.set(pos.x, baseY+3.0, pos.z+d/2+1.3); canopy.rotation.x=-0.08; canopy.castShadow=true; scene.add(canopy);
    for(const dx of [-1.9,1.9]){
      const p=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.09,2.9,6), new THREE.MeshStandardMaterial({color:0xd6d1c4, roughness:0.9}));
      p.position.set(pos.x+dx, baseY+1.45, pos.z+d/2+2.4); p.castShadow=true; scene.add(p);
    }
    for(const i of [-1,1]) frontWindow(pos.x + i*3.6, baseY+h*0.55, 1.0, 1.2, 0.7);
    frontDoor(pos.x, 1.5, 2.2);
    // roof cross for the air ambulance
    const rcV=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.06,3.0), crossMat);
    rcV.position.set(pos.x, wallTop+d*0.19+0.1, pos.z); scene.add(rcV);
    const rcH=new THREE.Mesh(new THREE.BoxGeometry(3.0,0.06,0.9), crossMat);
    rcH.position.set(pos.x, wallTop+d*0.19+0.1, pos.z); scene.add(rcH);
  } else if(f.guard){
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:true, rise:d*0.22, overhang:0.85, gableColor:0x4a3d30 });
    // glazed on three sides so the MP can see the road
    for(const [ax,az,ry] of [[0,d/2+0.06,0],[-w/2-0.06,0,Math.PI/2],[w/2+0.06,0,Math.PI/2]]){
      const g=new THREE.Mesh(new THREE.PlaneGeometry(w*0.7,1.3), glassMaterial());
      g.position.set(pos.x+ax, baseY+h*0.6, pos.z+az); g.rotation.y=ry; scene.add(g);
      registerWindow(g, 1.0);
    }
    // barrier arm across the road, and a stop sign
    const armPivot=pos.x - w/2 - 1.0;
    const arm=new THREE.Mesh(new THREE.BoxGeometry(9.0,0.12,0.12), new THREE.MeshStandardMaterial({color:0xe8e3d4, roughness:0.9}));
    arm.position.set(armPivot-4.4, 1.15, pos.z); arm.castShadow=true; scene.add(arm);
    for(let i=0;i<5;i++){
      const stripe=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.13,0.13), new THREE.MeshStandardMaterial({color:0x8d3a34, roughness:0.9}));
      stripe.position.set(armPivot-0.9-i*1.9, 1.15, pos.z); scene.add(stripe);
    }
    const post=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.11,1.6,7), new THREE.MeshStandardMaterial({color:0x4a3a2a, roughness:0.94}));
    post.position.set(armPivot, 0.8, pos.z); post.castShadow=true; scene.add(post);
    const lamp=new THREE.Mesh(new THREE.SphereGeometry(0.16,10,8), new THREE.MeshStandardMaterial({color:0xffe0b0, emissive:0xffc272, emissiveIntensity:0}));
    lamp.position.set(pos.x, wallTop+d*0.22+0.3, pos.z+d/2);
    lamp.userData.isLampBulb=true; scene.add(lamp);
    windowMeshes.push(lamp); lamp.userData.nightLit=true; lamp.userData.nightWarmth=1.5;
  } else {
    addGableRoof(scene, pos, w, d, wallTop, { ridgeAlongX:w>=d, rise:Math.min(w,d)*0.2 });
  }

  // Stencilled identification board. The keypress hint lives in the HUD.
  const cvs=document.createElement('canvas'); cvs.width=512; cvs.height=128;
  const ctx=cvs.getContext('2d'); ctx.fillStyle='#e6dfcd'; ctx.fillRect(0,0,512,128);
  for(let i=0;i<400;i++){
    ctx.fillStyle=Math.random()>0.5?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.05)';
    ctx.fillRect(Math.random()*512, Math.random()*128, 5, 1);
  }
  ctx.fillStyle='#2c2822'; ctx.fillRect(0,0,512,4); ctx.fillRect(0,124,512,4);
  ctx.fillStyle=color.getStyle(); ctx.fillRect(0,4,10,120);
  ctx.fillStyle='#231f19'; ctx.textAlign='center';
  const label=f.name.toUpperCase().length>18?f.code:f.name.toUpperCase();
  let fs=30; ctx.font=`900 ${fs}px Georgia, serif`;
  while(ctx.measureText(label).width>460 && fs>14){ fs-=2; ctx.font=`900 ${fs}px Georgia, serif`; }
  ctx.fillText(label,256,72);
  const tex=new THREE.CanvasTexture(cvs); tex.colorSpace=THREE.SRGBColorSpace; tex.anisotropy=8;
  const signW=Math.min(5.2, w*0.7);
  const sign=new THREE.Mesh(
    new THREE.PlaneGeometry(signW, signW*0.25),
    new THREE.MeshStandardMaterial({map:tex, roughness:0.9, side:THREE.DoubleSide})
  );
  const signY=Math.min(wallTop-0.5, baseY+h*0.9);
  sign.position.set(pos.x, signY, pos.z + d/2+0.14); scene.add(sign);
  if(f.info){
    // Whole front facade is the hot-spot, so you can read by facing the building
    const hit=new THREE.Mesh(new THREE.BoxGeometry(w*1.05, (baseY+h)*0.85, 0.6), new THREE.MeshStandardMaterial({visible:false}));
    hit.position.set(pos.x, (baseY+h)*0.45, pos.z + d/2+0.4); scene.add(hit);
    const hit2=new THREE.Mesh(new THREE.BoxGeometry(signW, signW*0.3, 0.12), new THREE.MeshStandardMaterial({visible:false}));
    hit2.position.copy(sign.position); scene.add(hit2);
    interactables.push({ mesh: hit, type:'info', id:f.id, prompt:`E — Read history: ${f.name}`, info:f.info });
    interactables.push({ mesh: hit2, type:'info', id:f.id, prompt:`E — Read history: ${f.name}`, info:f.info });
  }
  // collider
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(pos.x, (baseY+h)/2, pos.z),
    new THREE.Vector3(w+0.6, baseY+h, d+0.6)
  ));
}

// Vehicles, wire and utilities now live in props.js. What is left here is the
// fine ground litter that reads as occupation: stones, stumps, cigarette ends.
function addScatter(){
  const stoneGeo=new THREE.DodecahedronGeometry(0.4,0);
  const stoneMat=new THREE.MeshStandardMaterial({color:0xa39880, roughness:0.94});
  const stones=[];
  for(let i=0;i<90;i++){
    const a=srand()*Math.PI*2, r=srandRange(24,120);
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    if(Math.abs(x)>100||Math.abs(z)>100) continue;
    stones.push({x, z, s:srandRange(0.4,1.5)});
  }
  const stoneInst=new THREE.InstancedMesh(stoneGeo, stoneMat, stones.length);
  stoneInst.castShadow=true; stoneInst.receiveShadow=true;
  const m4=new THREE.Matrix4(), q=new THREE.Quaternion(), e=new THREE.Euler();
  stones.forEach((p,i)=>{
    e.set(srand()*3, srand()*3, srand()*3); q.setFromEuler(e);
    m4.compose(new THREE.Vector3(p.x, terrainHeight(p.x,p.z)+0.12*p.s, p.z), q, new THREE.Vector3(p.s,p.s*0.7,p.s));
    stoneInst.setMatrixAt(i,m4);
  });
  stoneInst.instanceMatrix.needsUpdate=true;
  scene.add(stoneInst);

  // Cut stumps — the Ranch School and then the Army cleared this ground.
  const stumpGeo=new THREE.CylinderGeometry(0.42,0.5,0.5,9);
  const stumpMat=new THREE.MeshStandardMaterial({color:0x7a6244, roughness:0.95});
  for(let i=0;i<26;i++){
    const a=srand()*Math.PI*2, r=srandRange(28,105);
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    const st=new THREE.Mesh(stumpGeo, stumpMat);
    st.position.set(x, terrainHeight(x,z)+0.2, z);
    st.rotation.set(srandRange(-0.1,0.1), srand()*3, srandRange(-0.1,0.1));
    st.castShadow=true; st.receiveShadow=true;
    scene.add(st);
    // sawn face, paler than the bark
    const face=new THREE.Mesh(new THREE.CircleGeometry(0.41,10), new THREE.MeshStandardMaterial({color:0xc4ab84, roughness:0.9}));
    face.rotation.x=-Math.PI/2; face.position.set(x, terrainHeight(x,z)+0.46, z); scene.add(face);
  }

  // Cigarette ends outside the doorways people queued at.
  const buttGeo=new THREE.CylinderGeometry(0.018,0.018,0.075,4);
  const buttMat=new THREE.MeshStandardMaterial({color:0xe8e2cf, roughness:0.95});
  const doorSteps=[[0,50.5],[-40.5,-10],[40.5,-10],[-30,34],[32,36],[58,18],[68,-12],[0,-16]];
  const butts=[];
  doorSteps.forEach(([bx,bz])=>{
    for(let i=0;i<14;i++) butts.push({x:bx+srandRange(-2.2,2.2), z:bz+srandRange(-2.2,2.2)});
  });
  const buttInst=new THREE.InstancedMesh(buttGeo, buttMat, butts.length);
  butts.forEach((p,i)=>{
    e.set(Math.PI/2, srand()*3, 0); q.setFromEuler(e);
    m4.compose(new THREE.Vector3(p.x, terrainHeight(p.x,p.z)+0.02, p.z), q, new THREE.Vector3(1,1,1));
    buttInst.setMatrixAt(i,m4);
  });
  buttInst.instanceMatrix.needsUpdate=true;
  scene.add(buttInst);
}

export function getWaypointMesh(){ return waypointMesh || ensureWaypoint(); }
export function setWaypointPosition(x,z){ const w=getWaypointMesh(); w.position.x=x; w.position.z=z; w.visible=true; }
let waypointMesh=null;
function ensureWaypoint(){
  if(waypointMesh) return waypointMesh;
  const geo=new THREE.ConeGeometry(0.9,1.8,4);
  geo.rotateX(Math.PI);
  const mat=new THREE.MeshStandardMaterial({color:0x315c78, emissive:0x315c78, emissiveIntensity:0.8});
  const mesh=new THREE.Mesh(geo, mat);
  mesh.position.y=13;
  mesh.visible=false;
  // beam
  const beamGeo=new THREE.CylinderGeometry(0.06,0.06,12,6);
  const beamMat=new THREE.MeshBasicMaterial({color:0x315c78, transparent:true, opacity:0.22});
  const beam=new THREE.Mesh(beamGeo, beamMat);
  beam.position.y=-6;
  mesh.add(beam);
  // ring
  const ringGeo=new THREE.TorusGeometry(1.2,0.07,8,24);
  const ringMat=new THREE.MeshBasicMaterial({color:0x9a741d, transparent:true, opacity:0.9});
  const ring=new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x=Math.PI/2;
  ring.position.y=-1.2;
  mesh.add(ring);
  mesh.userData.beam=beam; mesh.userData.ring=ring;
  scene.add(mesh);
  waypointMesh=mesh;
  // pulse
  const clock=new THREE.Clock();
  function pulse(){
    requestAnimationFrame(pulse);
    const t=clock.getElapsedTime();
    if(!waypointMesh.visible) return;
    waypointMesh.position.y=13+Math.sin(t*1.6)*0.45;
    waypointMesh.rotation.y+=0.008;
    waypointMesh.userData.ring.rotation.z+=0.02;
    waypointMesh.userData.beam.material.opacity=0.18+Math.sin(t*1.2)*0.08;
  }
  pulse();
  return mesh;
}
export function updateWorldFromState(){
  const state=getState();
  if(!state) return;
  // waypoint for next mission building (week is mission number)
  const curMission = getCurrentMission(state);
  const nextIdx = nextMissionStopIndex(state);
  const nextStop = curMission && nextIdx>=0 ? curMission.stops[nextIdx] : null;
  const wp=ensureWaypoint();
  if(nextStop){
    const entry=buildingMeshes.get(nextStop.group);
    if(entry){
      wp.position.x=entry.pos.x;
      wp.position.z=entry.pos.z;
      wp.visible=true;
    } else wp.visible=false;
  } else {
    wp.visible=false;
  }
  // update building lights and exterior boards
  const nextStopGroup = nextStop?.group;
  buildingMeshes.forEach((entry, id)=>{
    const gs=state.groups.find(g=>g.id===id);
    if(!gs) return;
    const d=def(id);
    const m= (gs.milestone>=d.milestones.length);
    const isNext = id===nextStopGroup;
    const isOffRoute = nextStop && id!==nextStopGroup;
    const stop=missionStopForGroup(state, id);
    const done=stop ? completedMissionStops(state).includes(stop.index) : false;
    const isNextMission = isNext && !done;
    // light color — mission priority overrides
    let lightColor=0x3d6f52; // green normal
    let intensity=0.9;
    if(done){ lightColor=0x3d6f52; intensity=1.0; }
    else if(isNextMission){ lightColor=0x315c78; intensity=1.4; }
    else if(m){ lightColor=0x3d6f52; intensity=0.9; }
    else if(gs.issue){ lightColor=0x9a3f36; intensity=1.1; }
    else if(isOffRoute){ lightColor=0x8a8a8a; intensity=0.45; }
    else {
      const pct=groupPct(gs);
      const expected = 30 + (state.week/15)*50;
      if(pct < expected - 12){ lightColor=0xd4a017; }
    }
    // An unresolved call outranks the other lamp states — it is the one thing
    // the player has to go back and put right, so it must be visible from the
    // street rather than only inside the results panel.
    const verdict = state.areaVerdict?.[gs.id];
    if(verdict === "unresolved"){ lightColor = 0xc0392b; }
    else if(verdict === "clear"){ lightColor = 0x1f8a4c; }
    entry.lightMesh.material.color.setHex(lightColor);
    entry.lightMesh.material.emissive.setHex(lightColor);
    // A hooded lamp reads dim in daylight and bright at night, like a real one.
    entry.lightMesh.userData.statusIntensity=intensity;
    const night = isNightNow();
    entry.lightMesh.material.emissiveIntensity=intensity*(night?0.95:0.14);
    const isDoneStop = done;
    const dimOffRoute = isOffRoute && !isDoneStop;
    // Off-route buildings read as "not your stop" by going shadowed, not
    // transparent — opacity here turned solid walls into glass you could see
    // the interior framing through.
    if(entry.signMesh) entry.signMesh.material.color.setScalar(dimOffRoute ? 0.62 : 1);
    if(entry.mesh) entry.mesh.material.color.setScalar(dimOffRoute ? 0.58 : 1);
    // exterior board canvas — DPR-aware — no individual budgets, just readiness
    const dpr=Math.min(window.devicePixelRatio||1, 1.6);
    entry.boardCanvas.width=420*dpr; entry.boardCanvas.height=180*dpr;
    entry.boardCanvas.style.width='420px'; entry.boardCanvas.style.height='180px';
    entry.boardTex.center.set(0.5,0.5);
    const ctx=entry.boardCanvas._ctx;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const W=420, H=180;
    // Chalked slate, as posted on every division door each morning.
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#25292a'; ctx.fillRect(0,0,W,H);
    for(let i=0;i<700;i++){
      ctx.fillStyle=Math.random()>0.5?'rgba(255,255,255,0.028)':'rgba(0,0,0,0.06)';
      ctx.fillRect(Math.random()*W, Math.random()*H, 3, 2);
    }
    ctx.strokeStyle='rgba(233,229,216,0.22)'; ctx.lineWidth=2; ctx.strokeRect(7,7,W-14,H-14);
    const chalk='#e9e5d8', chalkDim='rgba(233,229,216,0.62)';
    ctx.fillStyle=chalk; ctx.font='700 17px Georgia, serif';
    ctx.fillText(`${d.code} DIVISION`, 18, 33);
    ctx.fillStyle=entry.color; ctx.fillRect(18, 41, W-36, 3);
    const pct=Math.round(groupPct(gs));
    const forecast=Math.min(100, pct + Math.max(0, (15 - state.week)* (m?0: 2.5)) );
    ctx.fillStyle=chalk; ctx.font='700 16px Georgia, serif';
    ctx.fillText(`READINESS   ${pct}%`, 18, 71);
    ctx.fillStyle=chalkDim; ctx.font='600 14px Georgia, serif';
    ctx.fillText(`PROJECTED   ${Math.round(forecast)}%`, 18, 93);
    // hand-drawn tally bar
    ctx.strokeStyle=chalkDim; ctx.lineWidth=2; ctx.strokeRect(18,104,W-36,14);
    ctx.fillStyle=entry.color; ctx.fillRect(20,106,(W-40)*(pct/100),10);
    ctx.fillStyle='rgba(233,229,216,0.20)';
    ctx.fillRect(20+(W-40)*(pct/100),106,(W-40)*Math.max(0,(forecast-pct)/100),10);
    if(gs.issue){
      ctx.fillStyle='#e79b90'; ctx.font='700 14px Georgia, serif';
      ctx.fillText('ISSUE OPEN', 18, 145);
      ctx.fillStyle='rgba(231,155,144,0.75)'; ctx.font='600 12px Georgia, serif';
      const short=gs.issue.length>44?gs.issue.slice(0,44)+'…':gs.issue;
      ctx.fillText(short, 18, 164);
    } else if(m){
      ctx.fillStyle='#a8d0ac'; ctx.font='700 14px Georgia, serif';
      ctx.fillText('COMPLETE', 18, 145);
    } else {
      ctx.fillStyle=chalkDim; ctx.font='600 12px Georgia, serif';
      ctx.fillText(`WEEK ${state.week} OF 15`, 18, 158);
    }
    entry.boardTex.needsUpdate=true;
  });
  // day/night cycle (billboard removed)
  updateDayNight();
}

export function isNightNow(){
  const state=getState();
  const h=((((state?.timeHours ?? 8)%24)+24)%24);
  return h<6 || h>=18;
}

export function updateDayNight(){
  const state=getState();
  if(!state || !scene.userData.sun) return;
  const t = state.timeHours ?? 8;
  const h = ((t%24)+24)%24;
  // Sun arc over the whole 24 h: rises east (+X) at 06:00, overhead at noon,
  // sets west (-X) at 18:00 and keeps going below the horizon. The sky shader
  // needs the true direction — clamping it to the horizon overnight is what
  // kept the night sky pale blue.
  const solar = (h-6)/12 * Math.PI;
  const skyDir = new THREE.Vector3(Math.cos(solar), Math.sin(solar), -0.30).normalize();
  const isNight = h<6 || h>=18;
  // Longer, softer twilight than a 30-minute cut — the mesa held colour a while.
  let dayBlend = 0;
  if(h>=5.2 && h<7.2) dayBlend = (h-5.2)/2;
  else if(h>=7.2 && h<16.8) dayBlend = 1;
  else if(h>=16.8 && h<19.0) dayBlend = (19.0-h)/2.2;
  else dayBlend = 0;
  dayBlend = Math.max(0, Math.min(1, dayBlend));

  const sun=scene.userData.sun, amb=scene.userData.ambient, hemi=scene.userData.hemi;
  // The shadow-casting light stays just above the horizon even after the real
  // sun has set, so shadows never flip upward during twilight.
  sun.position.set(skyDir.x*160, Math.max(6, skyDir.y*160), skyDir.z*160);
  sun.intensity = sun.userData.baseIntensity * (0.02 + 0.98*Math.pow(dayBlend, 0.75));
  sun.visible = dayBlend>0.005;
  // Warm the sun and drop it toward the horizon colour through twilight.
  const warmth=1-Math.min(1, dayBlend*1.6);
  sun.color.setRGB(1, 0.95-warmth*0.20, 0.85-warmth*0.36);
  amb.intensity = amb.userData.baseIntensity * (0.55 + 0.45*dayBlend);
  hemi.intensity = hemi.userData.baseIntensity * (0.10 + 0.90*dayBlend);

  // Sky dome, image-based lighting, stars and ridge haze follow the *true* sun.
  const horizon = updateSky(scene, skyDir, dayBlend);
  if(horizon){
    scene.fog.color.copy(horizon);
    scene.fog.near = 150 + 60*dayBlend;
    scene.fog.far  = 420 + 240*dayBlend;
  }
  renderer.toneMappingExposure = 0.95 + (1-dayBlend)*0.55;

  // Street lamps: point lights plus their bulb meshes.
  (scene.userData.lamps||[]).forEach(l=>{
    if(l.isLight){ l.visible=isNight; l.intensity=isNight?1.5:0; }
    else if(l.material) l.material.emissiveIntensity = isNight?1.5:0;
  });
  // Lit windows after dark — only the share flagged at build time, so the same
  // rooms are occupied each night rather than the whole town blazing.
  const lit = 1-dayBlend;
  windowMeshes.forEach(wm=>{
    if(!wm.material) return;
    wm.material.emissiveIntensity = wm.userData.nightLit ? lit*(wm.userData.nightWarmth ?? 1) : 0;
  });
  // Status lamps beside each door.
  buildingMeshes.forEach(entry=>{
    if(entry.lightMesh){
      const base=entry.lightMesh.userData.statusIntensity ?? 1;
      entry.lightMesh.material.emissiveIntensity = base*(isNight?0.95:0.14);
    }
  });
}

export function getBuildingPosition(id){
  const entry=buildingMeshes.get(id);
  return entry?entry.pos.clone():null;
}

export function createInteriorScene(id){
  // Create a simple interior room for a division
  // We will reuse the main scene but move player inside a box room
  // For simplicity, hide exterior and show interior walls when inside
  // Caller should manage visibility
}
