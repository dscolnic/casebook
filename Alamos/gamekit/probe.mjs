import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { installDom } from './engine/dev/headless.mjs';
installDom();
const THREE = await import(pathToFileURL(resolve('node_modules/three/build/three.module.js')).href);
const props = await import('./themes/midway/props.js');
const scene = new THREE.Scene();
props.decorate(scene, { groundHeight: () => 0, colliders: [], softColliders: [], interactables: [],
  blocked: () => false, sign: () => ({}), MATERIALS: {}, lightPanels: [], areaScreens: new Map(), stateHooks: [] });
scene.updateMatrixWorld(true);
const bb = new THREE.Box3();
let tall = [];
for(const o of scene.children){
  bb.setFromObject(o);
  if(!Number.isFinite(bb.min.y) || bb.isEmpty()) continue;
  const h = bb.max.y - bb.min.y;
  if(h > 8) tall.push(`${o.type} h=${h.toFixed(0)} x[${bb.min.x.toFixed(0)},${bb.max.x.toFixed(0)}] z[${bb.min.z.toFixed(0)},${bb.max.z.toFixed(0)}]`);
}
console.log('top-level children:', scene.children.length);
console.log('objects over 8 m tall:'); tall.forEach(t => console.log('  ' + t));
