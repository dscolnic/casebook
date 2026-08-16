import * as THREE from 'three';
import { GROUP_DEFS } from './divisions.js';
import { MISSION_DEFS } from './missions.js';
import { getState } from './gameState.js';
import { def, groupPct, getCurrentMission, nextMissionStopIndex, completedMissionStops, missionStopForGroup } from './simulation.js';
import { renderCentralBoardTexture } from './dashboard.js';

export let scene, renderer, centralBoardMesh, centralBoardCanvas, centralBoardTexture;
export const buildingMeshes = new Map(); // id -> { mesh, doorMesh, signMesh, lightMesh, label }
export const interactables = []; // array of { mesh, type, id, prompt }
export const colliders = []; // THREE.Box3 for collision

const BUILDING_DATA = {
  T: { pos: [0, 0, 58], color: '#315c78', sign: 'T' },
  P: { pos: [-48, 0, -10], color: '#4b775f', sign: 'P' },
  X: { pos: [48, 0, -10], color: '#704f88', sign: 'X' },
  CM:{ pos: [-30, 0, 42], color: '#8a6921', sign: 'CM' },
  E: { pos: [30, 0, 42], color: '#865044', sign: 'E' },
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
const FILLER_BUILDINGS = [
  { id:'FULLER', name:'Fuller Lodge', code:'LODGE', pos:[0,0,-30], color:'#7a4a2e', w:22, d:12, h:8, log:true, info:HISTORIC_INFO.FULLER },
  { id:'BIG', name:'Big House', code:'BIG HOUSE', pos:[10,0,-38], color:'#6b3a1f', w:16, d:10, h:7.5, log:true, info:HISTORIC_INFO.BIG },
  { id:'POND', name:'Ashley Pond', code:'POND', pos:[0,0,-8], color:'#8fb5d6', w:14, d:14, h:0.2, pond:true, info:HISTORIC_INFO.POND },
  { id:'SUNDTS', name:'Sundt 4-Plex Row', code:'SUNDT', pos:[-48,0,-24], color:'#8a6a3a', w:18, d:9, h:7, row:true, info:HISTORIC_INFO.SUNDTS },
  { id:'SUNDTS2', name:'Sundt 4-Plex Row', code:'SUNDT', pos:[48,0,-24], color:'#8a6a3a', w:18, d:9, h:7, row:true, info:HISTORIC_INFO.SUNDTS },
  { id:'DUP', name:'Sundt Duplexes', code:'DUPLEX', pos:[-28,0,22], color:'#9a8a73', w:14, d:8, h:5.5, duplex:true, info:HISTORIC_INFO.DUP },
  { id:'MCKEE', name:'McKee Hutments', code:'HUTMENT', pos:[28,0,26], color:'#6b7a6b', w:16, d:8, h:4.5, hut:true, info:HISTORIC_INFO.MCKEE },
  { id:'DORMF', name:"Women's Dorm T-178", code:'DORM', pos:[-62,0,-6], color:'#d9d2c5', w:14, d:10, h:6, dorm:true, info:HISTORIC_INFO.DORMF },
  { id:'DORMM', name:"Men's Dorm", code:'DORM', pos:[-62,0,6], color:'#d9d2c5', w:14, d:10, h:6, dorm:true, info:HISTORIC_INFO.DORMM },
  { id:'WAC', name:'WAC Barracks', code:'WAC', pos:[-72,0,18], color:'#5a6a7a', w:16, d:9, h:5, barracks:true, info:HISTORIC_INFO.WAC },
  { id:'THEAT', name:'Theater No.2', code:'THEATER', pos:[62,0,-2], color:'#4a3d2e', w:16, d:12, h:8, theater:true, info:HISTORIC_INFO.THEAT },
  { id:'PX', name:'Post Exchange', code:'PX', pos:[58,0,10], color:'#9a741d', w:11, d:10, h:6, px:true, info:HISTORIC_INFO.PX },
  { id:'CHAPL', name:'Army Chapel', code:'CHAPEL', pos:[-48,0,34], color:'#f5f1e9', w:10, d:12, h:7, chapel:true, info:HISTORIC_INFO.CHAPL },
  { id:'INFIR', name:'Infirmary', code:'INFIRMARY', pos:[58,0,34], color:'#ffffff', w:12, d:10, h:6.5, infirmary:true, info:HISTORIC_INFO.INFIR },
  { id:'GUARD', name:'Main Gate House', code:'GATE', pos:[0,0,78], color:'#3a2e22', w:6, d:6, h:4, guard:true, info:HISTORIC_INFO.GUARD },
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
function metalRoofTexture(color){
  return makeCanvasTexture((g,s)=>{
    g.fillStyle=color; g.fillRect(0,0,s,s);
    g.strokeStyle='rgba(0,0,0,0.18)'; g.lineWidth=1;
    for(let x=0;x<s;x+=28){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,s); g.stroke(); g.fillStyle='rgba(255,255,255,0.07)'; g.fillRect(x,0,4,s); }
  },512);
}
let stuccoTex, woodTex;
export function initWorld(canvas){
  stuccoTex=stuccoTexture('#f0e6d2');
  woodTex=woodTexture();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfeaf3);
  scene.fog = new THREE.Fog(0xdfeaf3, 90, 180);

  // Renderer — PBR tone mapping
  renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Lights — will be driven by 24h cycle
  const ambient = new THREE.AmbientLight(0xffffff, 0.62);
  ambient.userData.baseIntensity=0.62;
  scene.add(ambient);
  scene.userData.ambient=ambient;
  const sun = new THREE.DirectionalLight(0xfff6d5, 1.0);
  sun.position.set(60, 80, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024,1024);
  sun.shadow.camera.near=0.5; sun.shadow.camera.far=200;
  sun.shadow.camera.left=-90; sun.shadow.camera.right=90; sun.shadow.camera.top=90; sun.shadow.camera.bottom=-90;
  sun.userData.baseIntensity=1.0;
  scene.add(sun);
  scene.userData.sun=sun;
  const hemi = new THREE.HemisphereLight(0xdfeaf3, 0xd9c7a7, 0.32);
  hemi.userData.baseIntensity=0.32;
  scene.add(hemi);
  scene.userData.hemi=hemi;
  // Night street lamps
  scene.userData.lamps=[];
  [[-22,-8],[22,8],[0,18]].forEach(([x,z])=>{
    const lamp=new THREE.PointLight(0xffcc77, 0, 22, 1.5);
    lamp.position.set(x, 4.2, z);
    lamp.visible=false;
    scene.add(lamp);
    scene.userData.lamps.push(lamp);
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.1,4.2,8), new THREE.MeshStandardMaterial({color:0x2b2b2b}));
    pole.position.set(x,2.1,z);
    scene.add(pole);
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.28,12,12), new THREE.MeshStandardMaterial({color:0xffcc77, emissive:0xffcc77, emissiveIntensity:0.9}));
    head.position.set(x,4.2,z);
    scene.add(head);
  });

  // Ground with subtle vertex noise for inhabited feel
  const groundGeo = new THREE.PlaneGeometry(220, 220, 48, 48);
  const gpos = groundGeo.attributes.position;
  for(let i=0;i<gpos.count;i++){
    const x=gpos.getX(i), y=gpos.getY(i);
    const dist=Math.hypot(x,y);
    if(dist>18){
      const n=Math.sin(x*0.07)*0.18 + Math.cos(y*0.08)*0.14 + Math.sin((x+y)*0.05)*0.12;
      gpos.setZ(i, n);
    }
  }
  gpos.needsUpdate=true; groundGeo.computeVertexNormals();
  const groundTex=makeCanvasTexture((g,s)=>{
    g.fillStyle='#d9c7a7'; g.fillRect(0,0,s,s);
    for(let i=0;i<1200;i++){ const x=Math.random()*s, y=Math.random()*s; g.fillStyle=Math.random()>0.5?'rgba(90,70,40,0.08)':'rgba(255,255,255,0.06)'; g.fillRect(x,y,2,2); }
  },512); groundTex.repeat.set(8,8);
  const groundMat = new THREE.MeshStandardMaterial({ map: groundTex, roughness: 0.96, metalness:0.02 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  ground.receiveShadow = true;
  scene.add(ground);
  // scatter rocks
  const rockGeo=new THREE.DodecahedronGeometry(0.5,0);
  const rockMat=new THREE.MeshStandardMaterial({color:0xc9b38d});
  for(let i=0;i<10;i++){
    const rx=(Math.random()-0.5)*180, rz=(Math.random()-0.5)*180;
    if(Math.hypot(rx,rz)<22) continue;
    const rock=new THREE.Mesh(rockGeo, rockMat);
    rock.position.set(rx,0.18,rz);
    rock.scale.setScalar(0.5+Math.random()*0.8);
    rock.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0);
    rock.castShadow=true;
    scene.add(rock);
  }

  // Roads (cross)
  const roadMat = new THREE.MeshStandardMaterial({ color: 0xb39f80, roughness: 0.9 });
  const roadH = new THREE.Mesh(new THREE.PlaneGeometry(14, 220), roadMat);
  roadH.rotation.x=-Math.PI/2; roadH.position.y=0.02;
  scene.add(roadH);
  const roadV = new THREE.Mesh(new THREE.PlaneGeometry(220, 14), roadMat);
  roadV.rotation.x=-Math.PI/2; roadV.position.y=0.021;
  scene.add(roadV);

  // Plaza
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(16, 32), new THREE.MeshStandardMaterial({ color: 0xe7e0d4, roughness:0.9 }));
  plaza.rotation.x=-Math.PI/2; plaza.position.y=0.03;
  scene.add(plaza);

  // Mountains backdrop (low poly)
  const mountainGeo = new THREE.PlaneGeometry(400, 90, 32, 1);
  const mountainMat = new THREE.MeshStandardMaterial({ color: 0x9aa7b5, roughness:1 });
  const mountains = new THREE.Mesh(mountainGeo, mountainMat);
  mountains.position.set(0, 45, -115);
  // displace vertices
  const pos = mountains.geometry.attributes.position;
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i);
    pos.setZ(i, Math.sin(x*0.03)*8 + Math.cos(x*0.05)*6);
  }
  pos.needsUpdate=true;
  scene.add(mountains);

  // Division buildings (billboard removed — mission shown in top bar)
  GROUP_DEFS.forEach(d=>{
    createBuilding(d);
  });
  // Filler town buildings (no entry)
  FILLER_BUILDINGS.forEach(f=>{
    createFillerBuilding(f);
  });

  addScatter();

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

  // Main box — PBR stucco + crisp edges
  const w=16, h=9, d=12;
  const baseGeo=new THREE.BoxGeometry(w, h, d);
  const tinted=new THREE.Color(0xfffefb).lerp(color, 0.04);
  const wallTex=stuccoTex; wallTex.repeat.set(1,0.7);
  const baseMat=new THREE.MeshStandardMaterial({ color: tinted, map: wallTex, roughness:0.88, metalness:0.02 });
  const mesh=new THREE.Mesh(baseGeo, baseMat);
  mesh.position.set(pos.x, h/2, pos.z);
  mesh.castShadow=true; mesh.receiveShadow=true;
  scene.add(mesh);
  // subtle edge bevel via thin dark strips at top
  const trim=new THREE.Mesh(new THREE.BoxGeometry(w+0.2,0.18,d+0.2), new THREE.MeshStandardMaterial({color:0x2b2418, roughness:0.9}));
  trim.position.set(pos.x, h-0.09, pos.z); scene.add(trim);

  // Roof — corrugated metal look
  const roofGeo=new THREE.ConeGeometry(w*0.62, 3.2, 4);
  roofGeo.rotateY(Math.PI/4);
  const roofTex=metalRoofTexture(color.getStyle()); roofTex.repeat.set(1,1);
  const roofMat=new THREE.MeshStandardMaterial({ color: color, map: roofTex, roughness:0.45, metalness:0.25 });
  const roof=new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(pos.x, h+1.2, pos.z);
  roof.castShadow=true;
  scene.add(roof);
  // Realistic fenestration — recessed windows on side walls (avoid door wall to prevent glitch)
  // Place 2 windows per side wall, inset 0.1 to avoid z-fighting, with frame + mullion
  const sideWalls=[angle+Math.PI/2, angle-Math.PI/2];
  sideWalls.forEach(sa=>{
    for(let k=-1;k<=1;k+=2){
      const along = k*3.2;
      const wx=pos.x + Math.sin(sa)*0.08 + Math.cos(sa)*along;
      const wz=pos.z + Math.cos(sa)*0.08 - Math.sin(sa)*along;
      // inset frame
      const frame=new THREE.Mesh(new THREE.BoxGeometry(1.42,1.72,0.06), new THREE.MeshStandardMaterial({color:0x1b1a17, roughness:0.92}));
      frame.position.set(wx, h/2+0.3, wz);
      frame.rotation.y=sa;
      scene.add(frame);
      const glass=new THREE.Mesh(new THREE.PlaneGeometry(1.18,1.48), new THREE.MeshStandardMaterial({color:0x8fb5d6, roughness:0.18, metalness:0.12, transparent:true, opacity:0.88}));
      glass.position.set(wx + Math.sin(sa)*0.04, h/2+0.3, wz + Math.cos(sa)*0.04);
      glass.rotation.y=sa;
      scene.add(glass);
      // mullion
      const mullV=new THREE.Mesh(new THREE.BoxGeometry(0.06,1.48,0.02), new THREE.MeshStandardMaterial({color:0x1b1a17}));
      mullV.position.set(wx + Math.sin(sa)*0.05, h/2+0.3, wz + Math.cos(sa)*0.05); mullV.rotation.y=sa; scene.add(mullV);
      const mullH=new THREE.Mesh(new THREE.BoxGeometry(1.18,0.06,0.02), new THREE.MeshStandardMaterial({color:0x1b1a17}));
      mullH.position.set(wx + Math.sin(sa)*0.05, h/2+0.3, wz + Math.cos(sa)*0.05); mullH.rotation.y=sa; scene.add(mullH);
      const sill=new THREE.Mesh(new THREE.BoxGeometry(1.54,0.1,0.14), new THREE.MeshStandardMaterial({color:0xdccbb0, roughness:0.9}));
      sill.position.set(wx + Math.sin(sa)*0.06, h/2-0.62, wz + Math.cos(sa)*0.06); sill.rotation.y=sa; scene.add(sill);
    }
  });

  // Door — clean, no Z-fighting: correct half-depth per cardinal wall
  const doorW=3.8, doorH=5.0;
  const doorGeo=new THREE.PlaneGeometry(doorW, doorH);
  const doorMat=new THREE.MeshStandardMaterial({ color: 0x4a2e12, roughness:0.85, metalness:0.02 });
  const door=new THREE.Mesh(doorGeo, doorMat);
  const toCenter=new THREE.Vector3(0,0,0).sub(pos).normalize();
  let angle=Math.atan2(toCenter.x, toCenter.z);
  if(Math.abs(toCenter.x) > Math.abs(toCenter.z)){
    angle = toCenter.x > 0 ? Math.PI/2 : -Math.PI/2;
  } else {
    angle = toCenter.z > 0 ? 0 : Math.PI;
  }
  const isEastWest = Math.abs(Math.sin(angle)) > 0.5;
  const half = isEastWest ? w/2 : d/2;
  const doorOff = half+0.06;
  const frameOff = half+0.048;
  const landOff = half+0.82;
  door.position.set(pos.x + Math.sin(angle)*doorOff, doorH/2+0.16, pos.z + Math.cos(angle)*doorOff);
  door.rotation.y=angle;
  scene.add(door);
  const frameMat=new THREE.MeshStandardMaterial({color:0x1b1a17});
  const frame=new THREE.Mesh(new THREE.PlaneGeometry(doorW+0.42, doorH+0.26), frameMat);
  frame.position.set(pos.x + Math.sin(angle)*frameOff, doorH/2+0.16, pos.z + Math.cos(angle)*frameOff);
  frame.rotation.y=angle; scene.add(frame);
  const handle=new THREE.Mesh(new THREE.SphereGeometry(0.11,12,12), new THREE.MeshStandardMaterial({color:0xdccb9f, metalness:0.55, roughness:0.32}));
  handle.position.set(pos.x + Math.sin(angle)*(half+0.085) + Math.cos(angle)*0.72, 1.02, pos.z + Math.cos(angle)*(half+0.085) - Math.sin(angle)*0.72);
  scene.add(handle);
  const landing=new THREE.Mesh(new THREE.PlaneGeometry(doorW+0.9, 1.35), new THREE.MeshStandardMaterial({color:0xe7e0d4, roughness:0.95}));
  landing.rotation.x=-Math.PI/2; landing.position.set(pos.x + Math.sin(angle)*landOff, 0.02, pos.z + Math.cos(angle)*landOff); landing.receiveShadow=true; scene.add(landing);

  // Sign — clean, large, under 2.8m tall, no overlap — short labels that always fit 1024
  const signCanvas=document.createElement('canvas');
  signCanvas.width=1024; signCanvas.height=256;
  const sctx=signCanvas.getContext('2d');
  sctx.fillStyle='#fffdf8'; sctx.fillRect(0,0,1024,256);
  sctx.fillStyle='#9a741d'; sctx.fillRect(0,0,1024,6);
  const SHORT_LABELS={T:'THEORY',P:'EXPERIMENTAL PHYSICS',CM:'CHEMISTRY & METALLURGY',E:'ORDNANCE',X:'IMPLOSION'};
  const SUB_LABELS={T:'NEUTRONICS & CALC.',P:'DIAGNOSTICS',CM:'MATERIALS',E:'ENGINEERING',X:'SYSTEMS INTEGRATION'};
  // left code block — solid, adjust font for 2-char CM
  sctx.fillStyle=color.getStyle(); sctx.fillRect(0,6,200,250);
  sctx.fillStyle='#fff'; sctx.textAlign='center'; sctx.textBaseline='middle';
  const codeFont = definition.code.length>1 ? '900 92px Georgia, serif' : '900 118px Georgia, serif';
  sctx.font=codeFont;
  sctx.fillText(definition.code, 100, 136);
  // name — use short label, truncate if needed
  const shortName = SHORT_LABELS[definition.id] || definition.name.toUpperCase();
  sctx.fillStyle='#1b1a17'; sctx.textAlign='left'; sctx.textBaseline='alphabetic';
  // auto-shrink if too long
  let nameFontSize=36;
  sctx.font=`900 ${nameFontSize}px Inter, sans-serif`;
  while(sctx.measureText(shortName).width > 740 && nameFontSize>22){ nameFontSize-=2; sctx.font=`900 ${nameFontSize}px Inter, sans-serif`; }
  sctx.fillText(shortName, 230, 108);
  sctx.fillStyle='#666158'; sctx.font='700 16px Inter, sans-serif';
  sctx.fillText(SUB_LABELS[definition.id]||'', 230, 138);
  sctx.fillStyle='#315c78'; sctx.font='700 13px Inter, sans-serif';
  sctx.fillText('E  TO  ENTER', 230, 168);
  const signTex=new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace=THREE.SRGBColorSpace; signTex.anisotropy=8; signTex.minFilter=THREE.LinearMipmapLinearFilter; signTex.generateMipmaps=true;
  const signGeo=new THREE.PlaneGeometry(9.2, 2.3);
  const signMat=new THREE.MeshStandardMaterial({ map: signTex, transparent:false, roughness:0.82, side:THREE.DoubleSide });
  const sign=new THREE.Mesh(signGeo, signMat);
  const signOff = half+0.14;
  sign.position.set(pos.x + Math.sin(angle)*signOff, 5.85, pos.z + Math.cos(angle)*signOff);
  sign.rotation.y=angle;
  scene.add(sign);

  // Status light beside door
  const lightGeo=new THREE.SphereGeometry(0.32, 16, 16);
  const lightMat=new THREE.MeshStandardMaterial({ color: 0x3d6f52, emissive: 0x3d6f52, emissiveIntensity: 0.9 });
  const light=new THREE.Mesh(lightGeo, lightMat);
  const sideOffset = new THREE.Vector3(Math.cos(angle),0,-Math.sin(angle)).multiplyScalar(2.2);
  const lightOff = half+0.04;
  light.position.set(pos.x + Math.sin(angle)*lightOff + sideOffset.x, 3.2, pos.z + Math.cos(angle)*lightOff + sideOffset.z);
  scene.add(light);

  // Small exterior board (budget/readiness) - plane with canvas
  const boardCanvas=document.createElement('canvas');
  boardCanvas.width=420; boardCanvas.height=220;
  boardCanvas._ctx=boardCanvas.getContext('2d');
  const boardTex=new THREE.CanvasTexture(boardCanvas);
  boardTex.colorSpace=THREE.SRGBColorSpace;
  const boardGeo=new THREE.PlaneGeometry(4.2, 2.2);
  const boardMat=new THREE.MeshStandardMaterial({ map: boardTex, side:THREE.DoubleSide });
  const board=new THREE.Mesh(boardGeo, boardMat);
  const boardOff = half+0.05;
  board.position.set(pos.x + sideOffset.x*1.15 + Math.sin(angle)*boardOff, 3.0, pos.z + sideOffset.z*1.15 + Math.cos(angle)*boardOff);
  board.rotation.y=angle;
  scene.add(board);

  // Equipment near entrance (distinct per division)
  addEquipment(definition.id, pos, angle, color);

  // Store
  buildingMeshes.set(definition.id, { mesh, doorMesh: door, signMesh: sign, lightMesh: light, boardCanvas, boardTex, boardMesh: board, pos, angle, color: data.color });
  interactables.push({ mesh: door, type:'door', id: definition.id, prompt:`E — Enter ${definition.name}` });

  // Collider for building
  const box=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(pos.x, h/2, pos.z), new THREE.Vector3(w+0.6, h, d+0.6));
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
  // Pond is special — low disc + water, no walls
  if(f.pond){
    const pondGeo=new THREE.CircleGeometry(f.w/2, 24);
    const pondMat=new THREE.MeshStandardMaterial({color:0x8fb5d6, roughness:0.3, metalness:0.1});
    const pond=new THREE.Mesh(pondGeo, pondMat);
    pond.rotation.x=-Math.PI/2; pond.position.set(f.pos[0], 0.04, f.pos[2]); pond.receiveShadow=true; scene.add(pond);
    const rim=new THREE.Mesh(new THREE.RingGeometry(f.w/2, f.w/2+0.6, 24), new THREE.MeshStandardMaterial({color:0x9a8a73, side:THREE.DoubleSide}));
    rim.rotation.x=-Math.PI/2; rim.position.set(f.pos[0], 0.05, f.pos[2]); scene.add(rim);
    // small sign by pond
    const cvs=document.createElement('canvas'); cvs.width=512; cvs.height=128;
    const ctx=cvs.getContext('2d'); ctx.fillStyle='#fffdf8'; ctx.fillRect(0,0,512,128);
    ctx.fillStyle='#315c78'; ctx.fillRect(0,0,512,8);
    ctx.fillStyle='#1b1a17'; ctx.font='900 18px Inter, sans-serif'; ctx.textAlign='center'; ctx.fillText(f.name.toUpperCase(),256,68);
    ctx.fillStyle='#666158'; ctx.font='600 12px Inter, sans-serif'; ctx.fillText('— TOWN —',256,92);
    const tex=new THREE.CanvasTexture(cvs); tex.colorSpace=THREE.SRGBColorSpace;
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(4,1), new THREE.MeshStandardMaterial({map:tex}));
    sign.position.set(f.pos[0], 1.2, f.pos[2]-f.w/2-0.6); scene.add(sign);
    if(f.info){
      const hit=new THREE.Mesh(new THREE.BoxGeometry(4,1.2,0.1), new THREE.MeshStandardMaterial({visible:false}));
      hit.position.copy(sign.position); scene.add(hit);
      interactables.push({ mesh: hit, type:'info', id:f.id, prompt:`E — Read: ${f.name}`, info:f.info });
    }
    return;
  }
  const pos=new THREE.Vector3(f.pos[0],0,f.pos[2]);
  const color=new THREE.Color(f.color);
  const w=f.w, d=f.d, h=f.h;
  const wallMat=new THREE.MeshStandardMaterial({color: new THREE.Color(0xfffefb).lerp(color,0.06), map: stuccoTex, roughness:0.88});
  const isLog=f.log || f.id==='BIG' || f.id==='FULLER';
  const mat=isLog? new THREE.MeshStandardMaterial({color: new THREE.Color(0xfffefb).lerp(color,0.06), map: woodTex, roughness:0.85}): wallMat;
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
  mesh.position.set(pos.x, h/2, pos.z);
  mesh.castShadow=true; mesh.receiveShadow=true;
  scene.add(mesh);
  // Roof + distinctive silhouette per building type
  if(f.log){
    // Fuller Lodge / Big House — horizontal log walls
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.8,0.6,d+0.6), new THREE.MeshStandardMaterial({color:0x4a2e12}));
    roof.position.set(pos.x, h+0.3, pos.z); scene.add(roof);
    for(let i=0;i<4;i++){
      const log=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.18,w+0.4,8), new THREE.MeshStandardMaterial({color:0x6b4226}));
      log.rotation.z=Math.PI/2; log.position.set(pos.x, 0.7+i*0.9, pos.z+d/2+0.12); scene.add(log);
    }
    const stone=new THREE.Mesh(new THREE.BoxGeometry(1.6,4,0.8), new THREE.MeshStandardMaterial({color:0x8a8a8a}));
    stone.position.set(pos.x+w/2-1.2, 2, pos.z); scene.add(stone);
    // windows — inset frames on front face, not overlapping logs (below logs)
    for(let i=-1;i<=1;i+=2){
      const wx=pos.x + i*4.0;
      const frame=new THREE.Mesh(new THREE.BoxGeometry(1.32,1.42,0.07), new THREE.MeshStandardMaterial({color:0x1b1a17, roughness:0.92}));
      frame.position.set(wx, h/2+0.3, pos.z + d/2+0.05); scene.add(frame);
      const glass=new THREE.Mesh(new THREE.PlaneGeometry(1.08,1.18), new THREE.MeshStandardMaterial({color:0x8fb5d6, roughness:0.2, metalness:0.12, transparent:true, opacity:0.86}));
      glass.position.set(wx, h/2+0.3, pos.z + d/2+0.09); scene.add(glass);
      const mullV=new THREE.Mesh(new THREE.BoxGeometry(0.05,1.18,0.02), new THREE.MeshStandardMaterial({color:0x1b1a17})); mullV.position.set(wx, h/2+0.3, pos.z + d/2+0.10); scene.add(mullV);
      const sill=new THREE.Mesh(new THREE.BoxGeometry(1.42,0.1,0.13), new THREE.MeshStandardMaterial({color:0xdccbb0})); sill.position.set(wx, h/2-0.48, pos.z + d/2+0.09); scene.add(sill);
    }
  } else if(f.id==='MESS'){
    // Long gable with chimney and double doors
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.6,0.7,d+0.4), new THREE.MeshStandardMaterial({color:0x6b4a2a, roughness:0.85}));
    roof.position.set(pos.x, h+0.35, pos.z); scene.add(roof);
    const chim=new THREE.Mesh(new THREE.BoxGeometry(1.0,2.2,1.0), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    chim.position.set(pos.x+ w/2-2, h+1.2, pos.z); scene.add(chim);
    const doors=new THREE.Mesh(new THREE.PlaneGeometry(3.2,3.2), new THREE.MeshStandardMaterial({color:0x4a2e12}));
    doors.position.set(pos.x, h/2-0.3, pos.z + d/2+0.02); scene.add(doors);
    for(let i=-1;i<=1;i+=2){
      const win=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.4), new THREE.MeshStandardMaterial({color:0xd9d2c5}));
      win.position.set(pos.x + i*4.2, h/2+0.6, pos.z + d/2+0.02); scene.add(win);
    }
  } else if(f.id==='HOSP'){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.5,d+0.4), new THREE.MeshStandardMaterial({color:0x9a3f36}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    const crossMat=new THREE.MeshStandardMaterial({color:0x9a3f36});
    const v=new THREE.Mesh(new THREE.BoxGeometry(2.2,2.2,0.08), crossMat);
    v.position.set(pos.x, h/2+0.2, pos.z + d/2+0.02); scene.add(v);
    const hv=new THREE.Mesh(new THREE.BoxGeometry(2.2,2.2,0.08), crossMat);
    hv.rotation.z=Math.PI/2; hv.position.set(pos.x, h/2+0.2, pos.z + d/2+0.02); scene.add(hv);
    // canopy
    const canopy=new THREE.Mesh(new THREE.BoxGeometry(5,0.25,2), new THREE.MeshStandardMaterial({color:0xfffefb}));
    canopy.position.set(pos.x, h/2+0.8, pos.z + d/2+1.1); scene.add(canopy);
    // roof cross visible from air
    const roofCrossV=new THREE.Mesh(new THREE.BoxGeometry(3,0.08,1), crossMat);
    roofCrossV.position.set(pos.x, h+0.55, pos.z); scene.add(roofCrossV);
    const roofCrossH=new THREE.Mesh(new THREE.BoxGeometry(1,0.08,3), crossMat);
    roofCrossH.position.set(pos.x, h+0.55, pos.z); scene.add(roofCrossH);
  } else if(f.id==='FIRE'){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.3,0.5,d+0.3), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    for(let i=-1;i<=1;i+=2){
      const bay=new THREE.Mesh(new THREE.PlaneGeometry(3.2,3.8), new THREE.MeshStandardMaterial({color:0x1b1a17}));
      bay.position.set(pos.x + i*3.1, 2.05, pos.z + d/2+0.02); scene.add(bay);
      const light=new THREE.Mesh(new THREE.SphereGeometry(0.18,8,8), new THREE.MeshStandardMaterial({color:0xff3b30, emissive:0xff3b30, emissiveIntensity:0.7}));
      light.position.set(pos.x + i*3.1, h-0.6, pos.z + d/2+0.14); scene.add(light);
    }
    const tower=new THREE.Mesh(new THREE.BoxGeometry(2.2,5,2.2), new THREE.MeshStandardMaterial({color:0x9a3f36}));
    tower.position.set(pos.x + w/2-1.8, h/2+1.2, pos.z - d/2+1.5); scene.add(tower);
  } else if(f.id==='SCHOOL'){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.5,0.6,d+0.5), new THREE.MeshStandardMaterial({color:0x5a6a7a}));
    roof.position.set(pos.x, h+0.3, pos.z); scene.add(roof);
    const towerBase=new THREE.Mesh(new THREE.BoxGeometry(2.0,3.2,2.0), new THREE.MeshStandardMaterial({color:0xfffefb}));
    towerBase.position.set(pos.x, h+1.6, pos.z - d/2+1.2); scene.add(towerBase);
    const bell=new THREE.Mesh(new THREE.SphereGeometry(0.42,10,10), new THREE.MeshStandardMaterial({color:0xdccb9f, metalness:0.6}));
    bell.position.set(pos.x, h+3.4, pos.z - d/2+1.2); scene.add(bell);
    const flagPole=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,4,6), new THREE.MeshStandardMaterial({color:0xfffefb}));
    flagPole.position.set(pos.x - w/2+1.2, h/2+1.2, pos.z + d/2+0.6); scene.add(flagPole);
    const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.4,0.8), new THREE.MeshStandardMaterial({color:0x315c78, side:THREE.DoubleSide}));
    flag.position.set(pos.x - w/2+1.9, h/2+2.8, pos.z + d/2+0.6); scene.add(flag);
    for(let i=-2;i<=2;i++){
      const win=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.8), new THREE.MeshStandardMaterial({color:0x8fb5d6}));
      win.position.set(pos.x + i*3.0, h/2+0.3, pos.z + d/2+0.02); scene.add(win);
    }
  } else if(f.id==='POST'){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.5,d+0.4), new THREE.MeshStandardMaterial({color:0x2b3a4a}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    const flagPole=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,3.2,6), new THREE.MeshStandardMaterial({color:0xfffefb}));
    flagPole.position.set(pos.x, h/2+0.6, pos.z + d/2+0.8); scene.add(flagPole);
    const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.7), new THREE.MeshStandardMaterial({color:0x9a3f36, side:THREE.DoubleSide}));
    flag.position.set(pos.x+0.6, h/2+1.9, pos.z + d/2+0.8); scene.add(flag);
    for(let i=-1;i<=1;i++){
      const box=new THREE.Mesh(new THREE.BoxGeometry(0.9,1.1,0.4), new THREE.MeshStandardMaterial({color:0x315c78}));
      box.position.set(pos.x + i*1.6, 1.1, pos.z + d/2+0.14); scene.add(box);
    }
  } else if(f.id==='BARR'){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.4,d+0.4), new THREE.MeshStandardMaterial({color:0x4a5a4a}));
    roof.position.set(pos.x, h+0.2, pos.z); scene.add(roof);
    for(let i=-2;i<=2;i++){
      const win=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1), new THREE.MeshStandardMaterial({color:0x8fb5d6}));
      win.position.set(pos.x + i*3.0, h/2+0.4, pos.z + d/2+0.02); scene.add(win);
      const door=new THREE.Mesh(new THREE.PlaneGeometry(0.9,1.8), new THREE.MeshStandardMaterial({color:0x4a2e12}));
      door.position.set(pos.x + i*3.0, -0.1, pos.z + d/2+0.02); scene.add(door);
    }
  } else if(f.row){
    // Sundt 4-plex — two-storey row, 4 doors — realistic with proper inset frames (no z-glitch)
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.6,0.6,d+0.4), new THREE.MeshStandardMaterial({color:0x6b4a2a, map: metalRoofTexture('#6b4a2a')}));
    roof.position.set(pos.x, h+0.3, pos.z); scene.add(roof);
    for(let i=-1.5;i<=1.5;i++){
      const cx=pos.x + i*4.0;
      const frame=new THREE.Mesh(new THREE.BoxGeometry(1.22,1.92,0.07), new THREE.MeshStandardMaterial({color:0x1b1a17})); frame.position.set(cx, 0.96, pos.z + d/2+0.05); scene.add(frame);
      const door=new THREE.Mesh(new THREE.PlaneGeometry(0.98,1.72), new THREE.MeshStandardMaterial({color:0x4a2e12})); door.position.set(cx, 0.96, pos.z + d/2+0.09); scene.add(door);
      const frame2=new THREE.Mesh(new THREE.BoxGeometry(1.12,1.12,0.06), new THREE.MeshStandardMaterial({color:0x1b1a17})); frame2.position.set(cx, h-1.2, pos.z + d/2+0.05); scene.add(frame2);
      const win=new THREE.Mesh(new THREE.PlaneGeometry(0.92,0.92), new THREE.MeshStandardMaterial({color:0x8fb5d6, transparent:true, opacity:0.88})); win.position.set(cx, h-1.2, pos.z + d/2+0.09); scene.add(win);
      const mull=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.92,0.02), new THREE.MeshStandardMaterial({color:0x1b1a17})); mull.position.set(cx, h-1.2, pos.z + d/2+0.10); scene.add(mull);
    }
    const chim=new THREE.Mesh(new THREE.BoxGeometry(0.8,2.4,0.8), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    chim.position.set(pos.x, h+1.2, pos.z); scene.add(chim);
  } else if(f.duplex){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.5,d+0.4), new THREE.MeshStandardMaterial({color:0x6b4a2a, map: metalRoofTexture('#6b4a2a')}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    for(let i=-1;i<=1;i+=2){
      const cx=pos.x + i*3.2;
      const dframe=new THREE.Mesh(new THREE.BoxGeometry(1.12,1.82,0.06), new THREE.MeshStandardMaterial({color:0x1b1a17})); dframe.position.set(cx, 0.92, pos.z + d/2+0.05); scene.add(dframe);
      const door=new THREE.Mesh(new THREE.PlaneGeometry(0.9,1.62), new THREE.MeshStandardMaterial({color:0x4a2e12})); door.position.set(cx, 0.92, pos.z + d/2+0.09); scene.add(door);
      const wframe=new THREE.Mesh(new THREE.BoxGeometry(1.22,1.22,0.06), new THREE.MeshStandardMaterial({color:0x1b1a17})); wframe.position.set(cx, h-1.0, pos.z + d/2+0.05); scene.add(wframe);
      const win=new THREE.Mesh(new THREE.PlaneGeometry(1.0,1.0), new THREE.MeshStandardMaterial({color:0x8fb5d6, transparent:true, opacity:0.88})); win.position.set(cx, h-1.0, pos.z + d/2+0.09); scene.add(win);
    }
  } else if(f.hut){
    const roof=new THREE.Mesh(new THREE.CylinderGeometry(d/2, d/2, w+0.4, 12,1,false,0,Math.PI), new THREE.MeshStandardMaterial({color:0x9a8a73, side:THREE.DoubleSide}));
    roof.rotation.z=Math.PI/2; roof.position.set(pos.x, h, pos.z); scene.add(roof);
    const stove=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.4,1.2,8), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    stove.position.set(pos.x+w/2-1, 0.6, pos.z); scene.add(stove);
  } else if(f.dorm || f.barracks){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.4,d+0.4), new THREE.MeshStandardMaterial({color:0x4a5a4a, map: metalRoofTexture('#4a5a4a')}));
    roof.position.set(pos.x, h+0.2, pos.z); scene.add(roof);
    for(let i=-2;i<=2;i++){
      const wx=pos.x + i*2.6;
      const frame=new THREE.Mesh(new THREE.BoxGeometry(1.18,1.18,0.06), new THREE.MeshStandardMaterial({color:0x1b1a17})); frame.position.set(wx, h/2+0.3, pos.z + d/2+0.05); scene.add(frame);
      const win=new THREE.Mesh(new THREE.PlaneGeometry(1.0,1.0), new THREE.MeshStandardMaterial({color:0x8fb5d6, transparent:true, opacity:0.88}));
      win.position.set(wx, h/2+0.3, pos.z + d/2+0.09); scene.add(win);
      const mull=new THREE.Mesh(new THREE.BoxGeometry(0.04,1.0,0.02), new THREE.MeshStandardMaterial({color:0x1b1a17})); mull.position.set(wx, h/2+0.3, pos.z + d/2+0.10); scene.add(mull);
      const sill=new THREE.Mesh(new THREE.BoxGeometry(1.26,0.08,0.12), new THREE.MeshStandardMaterial({color:0xdccbb0})); sill.position.set(wx, h/2-0.28, pos.z + d/2+0.09); scene.add(sill);
    }
    if(f.barracks){
      const flagPole=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,3,6), new THREE.MeshStandardMaterial({color:0xfffefb}));
      flagPole.position.set(pos.x+w/2-0.8, h/2+1, pos.z+d/2+0.6); scene.add(flagPole);
      const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.0,0.6), new THREE.MeshStandardMaterial({color:0x9a3f36, side:THREE.DoubleSide}));
      flag.position.set(pos.x+w/2-0.1, h/2+2.2, pos.z+d/2+0.6); scene.add(flag);
    }
  } else if(f.theater){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.6,0.5,d+0.6), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    const marquee=new THREE.Mesh(new THREE.BoxGeometry(w*0.7,0.8,d*0.1), new THREE.MeshStandardMaterial({color:0xd9d2c5}));
    marquee.position.set(pos.x, h-1.2, pos.z+d/2+0.14); scene.add(marquee);
    const doors=new THREE.Mesh(new THREE.PlaneGeometry(3,2.2), new THREE.MeshStandardMaterial({color:0x4a2e12}));
    doors.position.set(pos.x, 1.1, pos.z+d/2+0.02); scene.add(doors);
  } else if(f.px){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.5,d+0.4), new THREE.MeshStandardMaterial({color:0x6b4a2a}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    const aw=new THREE.Mesh(new THREE.BoxGeometry(w*0.9,0.28,2.0), new THREE.MeshStandardMaterial({color:0xc9b38d}));
    aw.position.set(pos.x, h-1.4, pos.z+d/2+1.0); scene.add(aw);
    const signPx=new THREE.Mesh(new THREE.PlaneGeometry(2.2,0.9), new THREE.MeshStandardMaterial({color:0xffffff}));
    signPx.position.set(pos.x, h-0.4, pos.z+d/2+0.08); scene.add(signPx);
  } else if(f.chapel || f.id==='CHAPL'){
    const roof=new THREE.Mesh(new THREE.ConeGeometry(w*0.42,2.2,4), new THREE.MeshStandardMaterial({color:0x5a6a7a}));
    roof.rotation.y=Math.PI/4; roof.position.set(pos.x, h+1.1, pos.z); scene.add(roof);
    const spire=new THREE.Mesh(new THREE.ConeGeometry(0.45,3.8,8), new THREE.MeshStandardMaterial({color:0xfffefb}));
    spire.position.set(pos.x, h+3.2, pos.z); scene.add(spire);
    const crossV=new THREE.Mesh(new THREE.BoxGeometry(0.14,1.0,0.08), new THREE.MeshStandardMaterial({color:0xdccb9f}));
    crossV.position.set(pos.x, h+5.4, pos.z); scene.add(crossV);
    const crossH=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.14,0.08), new THREE.MeshStandardMaterial({color:0xdccb9f}));
    crossH.position.set(pos.x, h+5.2, pos.z); scene.add(crossH);
    const stained=new THREE.Mesh(new THREE.PlaneGeometry(1.8,2.4), new THREE.MeshStandardMaterial({color:0x704f88, emissive:0x704f88, emissiveIntensity:0.22}));
    stained.position.set(pos.x, h/2+0.4, pos.z + d/2+0.02); scene.add(stained);
  } else if(f.infirmary){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.5,d+0.4), new THREE.MeshStandardMaterial({color:0x9a3f36}));
    roof.position.set(pos.x, h+0.25, pos.z); scene.add(roof);
    const crossMat=new THREE.MeshStandardMaterial({color:0x9a3f36});
    const v=new THREE.Mesh(new THREE.BoxGeometry(1.8,1.8,0.08), crossMat);
    v.position.set(pos.x, h/2+0.2, pos.z+d/2+0.02); scene.add(v);
    const hv=new THREE.Mesh(new THREE.BoxGeometry(1.8,1.8,0.08), crossMat);
    hv.rotation.z=Math.PI/2; hv.position.set(pos.x, h/2+0.2, pos.z+d/2+0.02); scene.add(hv);
    const canopy=new THREE.Mesh(new THREE.BoxGeometry(4,0.25,1.5), new THREE.MeshStandardMaterial({color:0xfffefb}));
    canopy.position.set(pos.x, h/2+0.7, pos.z+d/2+0.9); scene.add(canopy);
  } else if(f.guard){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.3,d+0.4), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    roof.position.set(pos.x, h+0.15, pos.z); scene.add(roof);
    const barrier=new THREE.Mesh(new THREE.BoxGeometry(7,0.12,0.12), new THREE.MeshStandardMaterial({color:0xfffefb}));
    barrier.position.set(pos.x, 1.0, pos.z+2); scene.add(barrier);
    const lamp=new THREE.Mesh(new THREE.SphereGeometry(0.18,8,8), new THREE.MeshStandardMaterial({color:0xffd27a, emissive:0xffd27a, emissiveIntensity:0.6}));
    lamp.position.set(pos.x, h+0.5, pos.z+d/2+0.2); scene.add(lamp);
  } else if(f.id==='REC'){
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.4,d+0.4), new THREE.MeshStandardMaterial({color:0x3a2e22}));
    roof.position.set(pos.x, h+0.2, pos.z); scene.add(roof);
    const banner=new THREE.Mesh(new THREE.PlaneGeometry(7,0.9), new THREE.MeshStandardMaterial({color:0x315c78}));
    banner.position.set(pos.x, h-0.4, pos.z + d/2+0.06); scene.add(banner);
    const hoopPole=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,2.2,6), new THREE.MeshStandardMaterial({color:0xfffefb}));
    hoopPole.position.set(pos.x+ w/2-1.5, 1.1, pos.z + d/2-1.5); scene.add(hoopPole);
    const boardHoop=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.6,0.08), new THREE.MeshStandardMaterial({color:0xfffefb}));
    boardHoop.position.set(pos.x+ w/2-1.5, 2.0, pos.z + d/2-1.5); scene.add(boardHoop);
  } else {
    const roof=new THREE.Mesh(new THREE.ConeGeometry(Math.max(w,d)*0.38, 1.8, 4), new THREE.MeshStandardMaterial({color: color, roughness:0.75}));
    roof.rotation.y=Math.PI/4; roof.position.set(pos.x, h+0.9, pos.z); scene.add(roof);
  }
  // Small sign — readable, with info hot-spot if historic
  const cvs=document.createElement('canvas'); cvs.width=512; cvs.height=128;
  const ctx=cvs.getContext('2d'); ctx.fillStyle='#fffdf8'; ctx.fillRect(0,0,512,128);
  ctx.fillStyle=color.getStyle(); ctx.fillRect(0,0,512,8);
  ctx.fillStyle='#1b1a17'; ctx.font='900 18px Inter, sans-serif'; ctx.textAlign='center';
  const label=f.name.toUpperCase().length>18?f.code:f.name.toUpperCase();
  ctx.fillText(label,256,70);
  ctx.fillStyle='#666158'; ctx.font='600 11px Inter, sans-serif'; ctx.fillText(f.info?'E — READ HISTORY':'— TOWN —',256,92);
  ctx.fillStyle='#315c78'; ctx.font='600 10px Inter, sans-serif'; if(f.info) ctx.fillText('HISTORIC',256,106);
  const tex=new THREE.CanvasTexture(cvs); tex.colorSpace=THREE.SRGBColorSpace;
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(6, w*0.85),1.4), new THREE.MeshStandardMaterial({map:tex}));
  sign.position.set(pos.x, h-0.8, pos.z + d/2+0.12); scene.add(sign);
  if(f.info){
    // Larger hitbox: whole front facade so you can read by looking at building, not just sign
    const hit=new THREE.Mesh(new THREE.BoxGeometry(w*1.15, h*0.85, 0.6), new THREE.MeshStandardMaterial({visible:false}));
    hit.position.set(pos.x, h*0.45, pos.z + d/2+0.35); scene.add(hit);
    // also keep sign hit for precision
    const hit2=new THREE.Mesh(new THREE.BoxGeometry(Math.min(6,w*0.85),1.4,0.12), new THREE.MeshStandardMaterial({visible:false}));
    hit2.position.copy(sign.position); scene.add(hit2);
    // use larger facade hit as primary
    interactables.push({ mesh: hit, type:'info', id:f.id, prompt:`E — Read history: ${f.name}`, info:f.info });
    interactables.push({ mesh: hit2, type:'info', id:f.id, prompt:`E — Read history: ${f.name}`, info:f.info });
  }
  // collider
  colliders.push(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(pos.x, h/2, pos.z), new THREE.Vector3(w+0.6,h,d+0.6)));
}

function addScatter(){
  // parked trucks
  const truckGeo=new THREE.BoxGeometry(2.2,1.2,1.4);
  const truckMat=new THREE.MeshStandardMaterial({color:0x6d6d6d});
  [[-18, -8],[18, 10]].forEach(([x,z])=>{
    const t=new THREE.Mesh(truckGeo, truckMat);
    t.position.set(x,0.6,z); scene.add(t);
    const box=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(x,0.6,z), new THREE.Vector3(2.6,1.2,1.8));
    colliders.push(box);
  });
  // distant desks/fences
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
    entry.lightMesh.material.color.setHex(lightColor);
    entry.lightMesh.material.emissive.setHex(lightColor);
    entry.lightMesh.material.emissiveIntensity=intensity;
    const isDoneStop = done;
    const dimOffRoute = isOffRoute && !isDoneStop;
    // dim sign for off-route (but not for completed stops)
    if(entry.signMesh) entry.signMesh.material.opacity = dimOffRoute ? 0.72 : 1.0;
    if(entry.mesh){ entry.mesh.material.opacity = dimOffRoute ? 0.88 : 1.0; entry.mesh.material.transparent = dimOffRoute; }
    // exterior board canvas — DPR-aware — no individual budgets, just readiness
    const dpr=Math.min(window.devicePixelRatio||1, 1.6);
    entry.boardCanvas.width=420*dpr; entry.boardCanvas.height=180*dpr;
    entry.boardCanvas.style.width='420px'; entry.boardCanvas.style.height='180px';
    entry.boardTex.center.set(0.5,0.5);
    const ctx=entry.boardCanvas._ctx;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const W=420, H=180;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#fffefb'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='#d9d2c5'; ctx.lineWidth=3; ctx.strokeRect(0,0,W,H);
    ctx.fillStyle=entry.color; ctx.fillRect(0,0,W,28);
    ctx.fillStyle='#fff'; ctx.font='900 13px Inter, sans-serif'; ctx.fillText(`${d.code} DIVISION`, 12, 19);
    const pct=Math.round(groupPct(gs));
    const forecast=Math.min(100, pct + Math.max(0, (15 - state.week)* (m?0: 2.5)) );
    ctx.fillStyle='#1b1a17'; ctx.font='700 13px Inter, sans-serif';
    ctx.fillText(`Readiness: ${pct}%`, 12, 56);
    ctx.fillStyle='#666158'; ctx.font='600 12px Inter, sans-serif';
    ctx.fillText(`Projected: ${Math.round(forecast)}%`, 12, 74);
    ctx.fillStyle='#e8e2d7'; ctx.fillRect(12, 84, W-24, 10);
    ctx.fillStyle=entry.color; ctx.fillRect(12,84,(W-24)*(pct/100),10);
    ctx.fillStyle=entry.color+'55'; ctx.fillRect(12+(W-24)*(pct/100),84,(W-24)*((forecast-pct)/100),10);
    // issue status
    if(gs.issue){
      ctx.fillStyle='#9a3f36'; ctx.font='700 11px Inter, sans-serif';
      ctx.fillText('Issue open', 12, 158);
      ctx.fillStyle='#59312d'; ctx.font='600 10px Inter, sans-serif';
      const short=gs.issue.length>42?gs.issue.slice(0,42)+'…':gs.issue;
      ctx.fillText(short, 12, 172);
    } else if(m){
      ctx.fillStyle='#3d6f52'; ctx.font='700 11px Inter, sans-serif';
      ctx.fillText('Complete', 12, 158);
    }
    entry.boardTex.needsUpdate=true;
  });
  // day/night cycle (billboard removed)
  updateDayNight();
}

export function updateDayNight(){
  const state=getState();
  if(!state || !scene.userData.sun) return;
  const t = state.timeHours ?? 8;
  const h = ((t%24)+24)%24;
  // sun arc: 6h rise east (-X), 12h overhead, 18h set west (+X)
  const sunProgress = (h-6)/12; // 0 at 6h, 1 at 18h, clamp
  const clamped = Math.max(0, Math.min(1, sunProgress));
  const sunAngle = (clamped* Math.PI) - Math.PI/2; // -90 to +90
  const sunX = Math.sin(sunAngle)*80;
  const sunY = Math.cos(sunAngle)*70 + 10;
  const sunZ = 30;
  const isDay = h>=6 && h<18;
  const isNight = !isDay;
  const nightFactor = isNight ? 1 : 0;
  // smooth transition 30min around dawn/dusk
  let dayBlend = 0;
  if(h>=6 && h<7) dayBlend = (h-6);
  else if(h>=7 && h<17) dayBlend = 1;
  else if(h>=17 && h<18) dayBlend = (18-h);
  else dayBlend = 0;

  const sun=scene.userData.sun, amb=scene.userData.ambient, hemi=scene.userData.hemi;
  sun.position.set(sunX, Math.max(4, sunY), sunZ);
  sun.intensity = 0.15 + 0.85*dayBlend;
  sun.visible = dayBlend>0.01;
  amb.intensity = amb.userData.baseIntensity * (0.35 + 0.65*dayBlend);
  hemi.intensity = hemi.userData.baseIntensity * (0.35 + 0.65*dayBlend);

  // sky & fog
  const daySky = new THREE.Color(0xdfeaf3);
  const nightSky = new THREE.Color(0x0a1020);
  const sky = new THREE.Color().copy(nightSky).lerp(daySky, dayBlend);
  scene.background = sky;
  scene.fog.color.copy(sky);
  scene.fog.near = 90 + 30*dayBlend;
  scene.fog.far = 180 + 40*dayBlend;

  // street lamps
  const lamps=scene.userData.lamps||[];
  lamps.forEach(l=>{ l.visible = isNight; l.intensity = isNight ? 1.2 : 0; });
  // building lights emissive boost at night
  buildingMeshes.forEach(entry=>{
    if(entry.lightMesh) entry.lightMesh.material.emissiveIntensity = isNight ? 1.6 : 0.9;
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
