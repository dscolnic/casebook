import * as THREE from 'three';
import { camera } from './player.js';
import { interactables, scene } from './world.js';

const raycaster = new THREE.Raycaster();
const center = new THREE.Vector2(0,0);
let currentTarget=null;

export function updateInteractions(promptEl){
  if(!camera || !promptEl) return null;
  raycaster.setFromCamera(center, camera);
  const meshes = interactables.map(i=>i.mesh);
  const hits = raycaster.intersectObjects(meshes, false);
  let target=null;
  if(hits.length>0){
    const hitMesh=hits[0].object;
    const found = interactables.find(i=> i.mesh===hitMesh);
    const limit = found?.type==='door' ? 10 : found?.type==='board' ? 9 : found?.type==='info' ? 10 : 6;
    if(hits[0].distance >= limit) {
      target = null;
    } else {
      target = found;
    }
  }
  // Hide previous
  if(target!==currentTarget){
    currentTarget=target;
  }
  if(target){
    promptEl.textContent=target.prompt;
    promptEl.classList.remove('hidden');
  } else {
    promptEl.classList.add('hidden');
  }
  return target;
}

export function getCurrentTarget(){
  return currentTarget;
}

// For interior: separate interactables
export const interiorInteractables=[];
export function updateInteriorInteractions(promptEl, cam){
  if(!cam || !promptEl) return null;
  raycaster.setFromCamera(center, cam);
  const meshes=interiorInteractables.map(i=>i.mesh);
  const hits=raycaster.intersectObjects(meshes, false);
  let target=null;
  if(hits.length>0 && hits[0].distance < 4){
    target=interiorInteractables.find(i=> i.mesh===hits[0].object);
  }
  if(target){
    promptEl.textContent=target.prompt;
    promptEl.classList.remove('hidden');
  } else {
    promptEl.classList.add('hidden');
  }
  return target;
}
