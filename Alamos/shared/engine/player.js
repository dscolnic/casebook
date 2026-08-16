import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { colliders } from './world.js';

export let controls, camera, velocity, moveState, isLocked=false, playerHeight=1.7;
let onGround=true;

export function initPlayer(canvas, scene, renderer){
  camera = new THREE.PerspectiveCamera(72, window.innerWidth/window.innerHeight, 0.1, 300);
  camera.position.set(0, playerHeight, 14);

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
  const playerRadius=0.45;
  const nextBox=new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(newPos.x, playerHeight/2, newPos.z),
    new THREE.Vector3(playerRadius*2, playerHeight, playerRadius*2)
  );
  let blocked=false;
  for(const box of colliders){
    if(nextBox.intersectsBox(box)){ blocked=true; break; }
  }
  // keep inside world bounds
  if(Math.abs(newPos.x)>105 || Math.abs(newPos.z)>105) blocked=true;

  if(!blocked){
    controls.getObject().position.copy(newPos);
  } else {
    // try slide along X then Z
    const tryX=new THREE.Vector3(oldPos.x+move.x, oldPos.y, oldPos.z);
    const boxX=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(tryX.x, playerHeight/2, tryX.z), new THREE.Vector3(playerRadius*2, playerHeight, playerRadius*2));
    let blockX=false;
    for(const b of colliders) if(boxX.intersectsBox(b)) blockX=true;
    if(!blockX && Math.abs(tryX.x)<=105) controls.getObject().position.x=tryX.x;
    const tryZ=new THREE.Vector3(controls.getObject().position.x, oldPos.y, oldPos.z+move.z);
    const boxZ=new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(tryZ.x, playerHeight/2, tryZ.z), new THREE.Vector3(playerRadius*2, playerHeight, playerRadius*2));
    let blockZ=false;
    for(const b of colliders) if(boxZ.intersectsBox(b)) blockZ=true;
    if(!blockZ && Math.abs(tryZ.z)<=105) controls.getObject().position.z=tryZ.z;
  }
  // keep y fixed
  controls.getObject().position.y=playerHeight;
}

export function teleport(pos){
  controls.getObject().position.set(pos.x, playerHeight, pos.z);
}

export function getPosition(){
  return controls ? controls.getObject().position.clone() : new THREE.Vector3(0,playerHeight,14);
}
