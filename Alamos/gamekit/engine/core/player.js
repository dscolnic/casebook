import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { colliders, softColliders } from './world.js';

export let controls, camera, velocity, moveState, isLocked=false, playerHeight=1.7;
let onGround=true;

// Set by initPlayer from the theme. Indoors the ground is flat and `GROUND`
// returns 0, which is why this used to be a constant — and why everyone stood
// at a fixed height the moment the same code met a heightfield.
let GROUND = () => 0;
let BOUNDS = 105;
// How wide the player is, for collision. 0.45 suits a street; a submarine's
// hatch is a 1.1 m opening, which left a twelve-centimetre slot that only a
// perfectly centred approach fitted through. A theme that has doorways says so.
let RADIUS = 0.45;

/**
 * @param opts { fov, near, far, start:{x,z,yaw}, bounds, groundHeight }
 *   `groundHeight` must be the world's single height function. Passing a second
 *   opinion about the floor is the bug THEME_CONTRACT.md § rule 3 is about.
 */
export function initPlayer(canvas, scene, renderer, opts = {}){
  // 66° by default: a 72° field distorts badly down a corridor or a street.
  camera = new THREE.PerspectiveCamera(
    opts.fov ?? 66, window.innerWidth/window.innerHeight, opts.near ?? 0.08, opts.far ?? 160);
  if(typeof opts.groundHeight === 'function') GROUND = opts.groundHeight;
  if(typeof opts.bounds === 'number') BOUNDS = opts.bounds;
  if(typeof opts.radius === 'number') RADIUS = opts.radius;
  const s = opts.start ?? { x: 0, z: 14 };
  camera.position.set(s.x, GROUND(s.x, s.z) + playerHeight, s.z);

  controls = new PointerLockControls(camera, renderer.domElement);
  velocity = new THREE.Vector3();

  moveState = { forward:0, right:0, sprint:false };

  controls.addEventListener('lock', ()=>{ isLocked=true; document.body.classList.add('locked'); });
  controls.addEventListener('unlock', ()=>{ isLocked=false; document.body.classList.remove('locked'); });

  // Click to lock
  renderer.domElement.addEventListener('click', ()=>{
    const overlay=document.getElementById('overlay');
    if(overlay && overlay.classList.contains('show')) return;
    const setup=document.getElementById('setupOverlay');
    if(setup && !setup.classList.contains('hidden')) return;
    if(!isLocked) controls.lock();
  });

  window.addEventListener('resize', ()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  scene.add(controls.getObject());
  return { camera, controls };
}

function onKeyDown(e){
  if(e.code==='KeyW' || e.code==='ArrowUp'){ moveState.forward=1; }
  if(e.code==='KeyS' || e.code==='ArrowDown'){ moveState.forward=-1; }
  if(e.code==='KeyA'){ moveState.right=-1; }
  if(e.code==='KeyD'){ moveState.right=1; }
  if(e.code==='ShiftLeft' || e.code==='ShiftRight'){ moveState.sprint=true; }
  if(e.code==='Escape'){
    if(document.getElementById('overlay')?.classList.contains('show')){
      // let overlay handle it
    } else {
      controls.unlock();
    }
  }
  if(e.code==='KeyM'){
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('projecty:togglemap'));
  }
  if(e.code==='Tab'){
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('projecty:toggletab'));
  }
}
function onKeyUp(e){
  if((e.code==='KeyW' || e.code==='ArrowUp') && moveState.forward===1) moveState.forward=0;
  if((e.code==='KeyS' || e.code==='ArrowDown') && moveState.forward===-1) moveState.forward=0;
  if(e.code==='KeyA' && moveState.right===-1) moveState.right=0;
  if(e.code==='KeyD' && moveState.right===1) moveState.right=0;
  if(e.code==='ShiftLeft' || e.code==='ShiftRight'){ moveState.sprint=false; }
}

export function updatePlayer(delta){
  if(!isLocked) return;
  const speed = moveState.sprint? 8.5 : 4.2;
  const forward = moveState.forward;
  const right = moveState.right;
  if(forward===0 && right===0) return;

  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  dir.y=0; dir.normalize();
  const rightDir = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0,1,0)).normalize();

  // compute desired move
  const move = new THREE.Vector3();
  if(forward) move.addScaledVector(dir, forward * speed * delta);
  if(right) move.addScaledVector(rightDir, -right * speed * delta);

  const oldPos = controls.getObject().position.clone();
  const newPos = oldPos.clone().add(move);

  // Simple AABB collision against colliders
  const playerRadius=RADIUS;
  const nextBox=new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(newPos.x, playerHeight/2, newPos.z),
    new THREE.Vector3(playerRadius*2, playerHeight, playerRadius*2)
  );
  // Trolleys, IV poles and chairs are cylinders — a squared-distance test, so
  // hundreds of them cost far less than adding each one to `colliders`.
  const hitsSoft=(x,z)=>{
    for(let i=0;i<softColliders.length;i++){
      const c=softColliders[i];
      const dx=x-c.x, dz=z-c.z, rr=c.r+playerRadius;
      if(dx*dx+dz*dz < rr*rr) return true;
    }
    return false;
  };
  let blocked=false;
  for(const box of colliders){
    if(nextBox.intersectsBox(box)){ blocked=true; break; }
  }
  if(!blocked && hitsSoft(newPos.x, newPos.z)) blocked=true;
  // keep inside world bounds
  if(Math.abs(newPos.x)>BOUNDS || Math.abs(newPos.z)>BOUNDS) blocked=true;

  if(!blocked){
    controls.getObject().position.copy(newPos);
  } else {
    // try slide along X then Z
    const tryX=new THREE.Vector3(oldPos.x+move.x, oldPos.y, oldPos.z);
    const boxX=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(tryX.x, playerHeight/2, tryX.z), new THREE.Vector3(playerRadius*2, playerHeight, playerRadius*2));
    let blockX=false;
    for(const b of colliders) if(boxX.intersectsBox(b)) blockX=true;
    if(!blockX && hitsSoft(tryX.x, tryX.z)) blockX=true;
    if(!blockX && Math.abs(tryX.x)<=BOUNDS) controls.getObject().position.x=tryX.x;
    const tryZ=new THREE.Vector3(controls.getObject().position.x, oldPos.y, oldPos.z+move.z);
    const boxZ=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(tryZ.x, playerHeight/2, tryZ.z), new THREE.Vector3(playerRadius*2, playerHeight, playerRadius*2));
    let blockZ=false;
    for(const b of colliders) if(boxZ.intersectsBox(b)) blockZ=true;
    if(!blockZ && hitsSoft(tryZ.x, tryZ.z)) blockZ=true;
    if(!blockZ && Math.abs(tryZ.z)<=BOUNDS) controls.getObject().position.z=tryZ.z;
  }
  // Eye height follows the ground, from the world's own height function.
  const p2=controls.getObject().position;
  p2.y=GROUND(p2.x, p2.z)+playerHeight;
}

/**
 * Swap the floor and the leash at runtime.
 *
 * Both are set once by initPlayer from the theme, which is right while there is
 * one world. Walking into an interior is a second world: the floor is flat
 * rather than terrain, and the room is built far outside the town's own limit,
 * so a fixed BOUNDS would stop the player dead at the door. The caller puts
 * both back on the way out.
 */
export function setGround(fn){ if(typeof fn === 'function') GROUND = fn; }
export function setRadius(r){ if(typeof r === 'number') RADIUS = r; }
export function setBounds(n){ if(typeof n === 'number') BOUNDS = n; }
export function getGround(){ return GROUND; }
export function getBounds(){ return BOUNDS; }

/**
 * Move the player, optionally turning them to face a given yaw. Walking into a
 * room should leave you looking at the case, not at the wall you came through.
 */
export function teleport(pos, yaw){
  controls.getObject().position.set(pos.x, GROUND(pos.x, pos.z)+playerHeight, pos.z);
  if(typeof yaw === 'number'){
    camera.rotation.set(0, yaw, 0);
    camera.updateMatrixWorld(true);
  }
}

export function getPosition(){
  return controls ? controls.getObject().position.clone() : new THREE.Vector3(0,playerHeight,14);
}
