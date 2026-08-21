import * as THREE from 'three';
import { camera } from './player.js';
import { interactables, scene } from './world.js';

const raycaster = new THREE.Raycaster();
const center = new THREE.Vector2(0,0);
let currentTarget=null;

/**
 * What the player is looking at, and the prompt for it.
 *
 * `only` is an optional set of interaction types. A caller passes one when the
 * world is not the player's to poke at: during a warm-up run every other kind of
 * interaction is off — walking up to somebody during a GREET *is* the greeting,
 * and opening their biography over it answers a question nobody asked — but
 * **locomotion is not content**. In a stacked building the lift is the only way
 * to another floor, so a blanket refusal makes any run that spans floors
 * unfinishable; the same is true of the vehicle a far lap is explicitly taken in.
 * So the run allows the types that move you and nothing else.
 */
export function updateInteractions(promptEl, only = null){
  if(!camera || !promptEl) return null;
  raycaster.setFromCamera(center, camera);
  raycaster.far = 12; // nothing is interactable past 10 — skip the rest of the floor
  const meshes = interactables.map(i=>i.mesh);
  const hits = raycaster.intersectObjects(meshes, false);
  let target=null;
  if(hits.length>0){
    const hitMesh=hits[0].object;
    const found = interactables.find(i=> i.mesh===hitMesh);
    const limit = found?.type==='door' ? 6
                : found?.type==='board' ? 7
                : found?.type==='info' ? 8
                : found?.type==='case' ? 5
                : found?.type==='roomexit' ? 3.4
                : 4.5;
    if(hits[0].distance >= limit || (only && !only.has(found?.type))) {
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
