import * as THREE from 'three';
import { scene, colliders } from './world.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { interactables } from './world.js';
import { CHARACTER_DIVISION } from './simulation.js';

let npcs=[]; // {mesh, hit, char, pos, target, speed, bobPhase}
let npcGroup=null;

function rand(min,max){ return min + Math.random()*(max-min); }
function isOutsideBuildings(x,z, pad=1.2){
  for(const b of colliders){
    if(x > b.min.x-pad && x < b.max.x+pad && z > b.min.z-pad && z < b.max.z+pad) return false;
  }
  // also keep inside town bounds
  if(Math.abs(x)>62 || Math.abs(z)>82) return false;
  return true;
}
function pickSafePos(baseX, baseZ, tries=20){
  for(let i=0;i<tries;i++){
    const x=baseX + rand(-4,4);
    const z=baseZ + rand(-2,2);
    if(isOutsideBuildings(x,z)) return new THREE.Vector3(x,0,z);
  }
  // fallback: search random safe on roads
  for(let i=0;i<60;i++){
    const x=rand(-60,60);
    const z=(Math.random()<0.5? rand(-14,14) : rand(20,38));
    // bias to roads: x near 0 or z near 0
    const candX = Math.abs(x) < 15 ? x : (Math.random()<0.5? rand(-7,7) : x);
    const candZ = Math.abs(z) < 15 ? z : z;
    if(isOutsideBuildings(candX,candZ)) return new THREE.Vector3(candX,0,candZ);
  }
  return new THREE.Vector3(baseX,0,baseZ);
}

export function spawnNPCs(count=20){
  if(npcGroup) return;
  npcGroup=new THREE.Group();
  scene.add(npcGroup);
  // sidewalk waypoints — linear Trinity corridor
  const waypoints=[
    [-60,-10],[ -40,-22],[ -20,-8],[ 0,-12],[ 20,-8],[ 40,-22],[ 60,-6],
    [-60,6],[ -40,20],[ -20,34],[ 0,22],[ 20,34],[ 40,20],[ 60,6],
    [-30,-30],[ 10,-38],[ 0,34],[ 58,34],[ -48,34],[ 0,78],
  ];
  // Spawn all historic characters when count >= roster size so every field-question target exists; otherwise pick distinct random subset.
  let spawnList;
  if(count >= HISTORIC_CHARACTERS.length){
    spawnList = [...HISTORIC_CHARACTERS];
  } else {
    const shuffled=[...HISTORIC_CHARACTERS].sort(()=>Math.random()-0.5);
    spawnList = shuffled.slice(0, count);
  }
  for(let i=0;i<spawnList.length;i++){
    const ch=spawnList[i];
    const color=new THREE.Color(ch.color);
    // --- realistic low-poly human: torso + limbs + head ---
    const group=new THREE.Group();
    const bodyMat=new THREE.MeshStandardMaterial({color: color, roughness:0.85});
    const skinMat=new THREE.MeshStandardMaterial({color: 0xf0c8a0, roughness:0.8});
    const pantsMat=new THREE.MeshStandardMaterial({color: 0x2b2b2b, roughness:0.9});
    // torso (tilted box for shoulders)
    const torso=new THREE.Mesh(new THREE.BoxGeometry(0.48,0.62,0.26), bodyMat);
    torso.position.y=0.62; torso.castShadow=true; group.add(torso);
    // collar
    const collar=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.08,0.05), new THREE.MeshStandardMaterial({color:0xfaf8f2}));
    collar.position.set(0,0.92,0.13); group.add(collar);
    // head
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.22,14,12), skinMat);
    head.position.y=1.08; head.castShadow=true; group.add(head);
    // hair / hat
    if(ch.hat && ch.hat!=='none'){
      const hat=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.26,0.11,12), new THREE.MeshStandardMaterial({color: 0x1a1a1a, roughness:0.9}));
      hat.position.y=1.23; group.add(hat);
      const brim=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.32,0.02,12), new THREE.MeshStandardMaterial({color: 0x1a1a1a}));
      brim.position.y=1.18; group.add(brim);
    } else if(Math.random()<0.5){
      const hair=new THREE.Mesh(new THREE.SphereGeometry(0.23,12,10,0,Math.PI*2,0,Math.PI*0.55), new THREE.MeshStandardMaterial({color: 0x3a2a1a, roughness:1}));
      hair.position.y=1.14; hair.rotation.x=Math.PI; group.add(hair);
    }
    // arms
    const armGeo=new THREE.CapsuleGeometry(0.07,0.45,4,8);
    const leftArm=new THREE.Mesh(armGeo, skinMat); leftArm.position.set(-0.32,0.62,0); leftArm.userData.isArm=true; leftArm.userData.side=-1; group.add(leftArm);
    const rightArm=new THREE.Mesh(armGeo, skinMat); rightArm.position.set(0.32,0.62,0); rightArm.userData.isArm=true; rightArm.userData.side=1; group.add(rightArm);
    // legs
    const legGeo=new THREE.CapsuleGeometry(0.09,0.48,4,8);
    const leftLeg=new THREE.Mesh(legGeo, pantsMat); leftLeg.position.set(-0.13,0.14,0); leftLeg.userData.isLeg=true; leftLeg.userData.side=-1; group.add(leftLeg);
    const rightLeg=new THREE.Mesh(legGeo, pantsMat); rightLeg.position.set(0.13,0.14,0); rightLeg.userData.isLeg=true; rightLeg.userData.side=1; group.add(rightLeg);
    // shoes
    const shoeGeo=new THREE.BoxGeometry(0.14,0.08,0.22);
    const shoeMat=new THREE.MeshStandardMaterial({color:0x3a2e22});
    const ls=new THREE.Mesh(shoeGeo, shoeMat); ls.position.set(-0.13, -0.18, 0.04); group.add(ls);
    const rs=new THREE.Mesh(shoeGeo, shoeMat); rs.position.set(0.13, -0.18, 0.04); group.add(rs);
    const body=group;
    // name plate — slightly higher for taller model
    const cvs=document.createElement('canvas'); cvs.width=512; cvs.height=96;
    const ctx=cvs.getContext('2d'); ctx.fillStyle='rgba(255,253,248,0.96)'; ctx.fillRect(0,0,512,96);
    ctx.fillStyle='#1b1a17'; ctx.font='800 17px Inter, sans-serif'; ctx.textAlign='center'; ctx.fillText(ch.name,256,36);
    ctx.fillStyle='#666158'; ctx.font='600 12px Inter, sans-serif'; ctx.fillText(ch.role,256,62);
    ctx.fillStyle='#9a741d'; ctx.font='700 10px Inter, sans-serif'; ctx.fillText('E — TALK',256,84);
    const tex=new THREE.CanvasTexture(cvs); tex.colorSpace=THREE.SRGBColorSpace;
    const plate=new THREE.Mesh(new THREE.PlaneGeometry(1.4,0.26), new THREE.MeshStandardMaterial({map:tex, transparent:true}));
    plate.position.set(0,1.62,0); body.add(plate);
    plate.userData.isPlate=true;

    const start=waypoints[i % waypoints.length];
    const pos=pickSafePos(start[0], start[1]);
    body.position.set(pos.x, 0, pos.z);
    // shadow disc
    const shadow=new THREE.Mesh(new THREE.CircleGeometry(0.28,10), new THREE.MeshBasicMaterial({color:0x000000, transparent:true, opacity:0.14}));
    shadow.rotation.x=-Math.PI/2; shadow.position.set(pos.x,0.02,pos.z); scene.add(shadow);

    // hitbox for E
    const hit=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.55,1.6,10), new THREE.MeshStandardMaterial({visible:false}));
    hit.position.copy(body.position); hit.position.y=0.85;
    scene.add(hit);

    const division = CHARACTER_DIVISION[ch.id] || 'T';
    ch.division = division;
    // add division to plate
    const cvs2 = cvs; // reuse for division badge
    ctx.fillStyle='#315c78'; ctx.font='700 9px Inter, sans-serif'; ctx.fillText(`[${division}]`, 500, 18);

    npcGroup.add(body);
    interactables.push({ mesh: hit, type:'npc', id:ch.id, prompt:`E — Talk to ${ch.name} [${division}] — ${ch.role}`, info: `<b>${ch.name}</b> — ${ch.role}<br><br>${ch.bio}`, char:ch, hit, body, shadow });

    npcs.push({
      char:ch, body, hit, shadow,
      pos, target: new THREE.Vector3(rand(-60,60),0,rand(-30, 40)),
      speed: rand(0.55,1.15),
      bobPhase: rand(0, Math.PI*2),
      pause:0,
      plate, division,
    });
    const nxt=waypoints[Math.floor(Math.random()*waypoints.length)];
    const safeT=pickSafePos(nxt[0], nxt[1]);
    npcs[i].target.set(safeT.x,0,safeT.z);
  }
}

export function updateNPCs(delta, playerPos){
  if(!npcs.length) return;
  for(const n of npcs){
    if(n.pause>0){ n.pause-=delta; continue; }
    const dir=new THREE.Vector3().subVectors(n.target, n.pos);
    const dist=dir.length();
    if(dist<0.6){
      // pick new waypoint that is outside buildings
      let ntries=0; let cand=null;
      while(ntries<20){
        const cx=rand(-62,62);
        const cz = Math.random()<0.55 ? ((Math.random()<0.5? -12: 12)+rand(-6,6)) : rand(-28,34);
        if(isOutsideBuildings(cx,cz)){ cand=new THREE.Vector3(cx,0,cz); break; }
        ntries++;
      }
      if(cand) n.target.copy(cand);
      else {
        const wp=waypoints[Math.floor(Math.random()*waypoints.length)];
        const safe=pickSafePos(wp[0], wp[1]);
        n.target.copy(safe);
      }
      n.pause=rand(0.6,2.2);
      continue;
    }
    dir.y=0; dir.normalize();
    const step=n.speed*delta;
    const move=dir.multiplyScalar(step);
    const nextPos=new THREE.Vector3().copy(n.pos).add(move);
    // simple collider avoidance (check against static colliders)
    let blocked=false;
    for(const b of colliders){
      if(nextPos.x > b.min.x-0.6 && nextPos.x < b.max.x+0.6 && nextPos.z > b.min.z-0.6 && nextPos.z < b.max.z+0.6){ blocked=true; break; }
    }
    if(blocked){
      // pick a safe alternative
      let ntries=0; let cand=null;
      while(ntries<20){
        const cx=rand(-62,62); const cz=rand(-28,34);
        if(isOutsideBuildings(cx,cz)){ cand=new THREE.Vector3(cx,0,cz); break; }
        ntries++;
      }
      if(cand) n.target.copy(cand);
      else {
        const wp=waypoints[Math.floor(Math.random()*waypoints.length)];
        const safe=pickSafePos(wp[0], wp[1]);
        n.target.copy(safe);
      }
      continue;
    }
    n.pos.copy(nextPos);
    n.body.position.set(n.pos.x, 0, n.pos.z);
    n.hit.position.set(n.pos.x,0.85,n.pos.z);
    n.shadow.position.set(n.pos.x,0.02,n.pos.z);
    // face movement
    const ang=Math.atan2(dir.x, dir.z);
    n.body.rotation.y=ang;
    // walk cycle — swing legs/arms
    n.bobPhase+=delta*5.5*n.speed;
    const swing=Math.sin(n.bobPhase)*0.42;
    const swing2=Math.sin(n.bobPhase+Math.PI)*0.42;
    n.body.traverse(obj=>{
      if(obj.userData.isLeg){
        obj.rotation.x = obj.userData.side===-1 ? swing : swing2;
      }
      if(obj.userData.isArm){
        obj.rotation.x = obj.userData.side===-1 ? swing2*0.7 : swing*0.7;
      }
    });
    n.body.position.y=Math.abs(Math.sin(n.bobPhase))*0.06;
    // plate billboard — keep facing player
    if(n.plate){
      const wp=n.plate.getWorldPosition(new THREE.Vector3());
      n.plate.lookAt(playerPos.x, wp.y, playerPos.z);
    }
  }
}

export function getNPCForDivision(division){
  // find first NPC with that division, prefer not paused
  return npcs.find(n=>n.division===division) || npcs.find(n=>n.char.id==='oppenheimer') || npcs[0];
}
export function getNPCByCharId(charId){
  return npcs.find(n=>n.char.id===charId) || null;
}
export function highlightNPCForDivision(division, on=true){
  for(const n of npcs){
    const isTarget = n.division===division;
    if(n.plate){
      // tint plate border
      n.plate.material.color?.set?.(isTarget && on ? 0x315c78 : 0xffffff);
    }
    if(n.body){
      n.body.material.emissive?.setHex(isTarget && on ? 0x315c78 : 0x000000);
      n.body.material.emissiveIntensity = isTarget && on ? 0.35 : 0;
    }
  }
}
export function pauseNPC(id, secs=6){
  const n=npcs.find(x=>x.char.id===id);
  if(n){ n.pause=Math.max(n.pause, secs); n.target.copy(n.pos); }
}
export function getNPCs(){ return npcs; }
