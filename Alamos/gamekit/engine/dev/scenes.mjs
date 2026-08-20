// scenes.mjs — build a game's rooms in node, once, for every checker that needs them.
//
// `pieceDensity.mjs` worked out how to do this first: a stub canvas and a stub
// renderer are enough, because three.js does not touch the GPU until something
// renders and a scene graph is plain JavaScript. Then `placement.mjs` needed the
// same scenes to fire rays through, and the choice was two copies of the setup or
// one. Two copies of "how a room is built" is how the two checkers end up
// disagreeing about the room.
//
// WHAT IS REACHABLE FROM HERE. The two generated builders: `interiorSite` (the
// corridor games) and `interiorBuilding` (the room behind every outdoor game's
// door). A game that lays out its own world by hand — Bring Them Home, the
// submarine — is not built here and cannot be, so those are the ones a checker
// will always be blind to. Screenshots are what covers them; see `shots.mjs`.
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { installDom, stubRenderer } from './headless.mjs';

const here = dirname(new URL(import.meta.url).pathname);
export const gamekit = resolve(here, '..', '..');

installDom();
export const THREE = await import(
  pathToFileURL(resolve(gamekit, 'node_modules/three/build/three.module.js')).href);

const load = (path) => import(pathToFileURL(path).href);

/**
 * The whole floor of a corridor game: spine, rooms, fit-out.
 *
 * Returns null for a theme that has no `plan.js`, which is every outdoor game.
 */
export async function interiorScene(dir){
  const planPath = resolve(dir, 'plan.js');
  if(!existsSync(planPath)) return null;
  const { plan } = await load(planPath);
  const props = existsSync(resolve(dir, 'props.js')) ? await load(resolve(dir, 'props.js')) : {};
  const { buildInterior } = await load(resolve(gamekit, 'engine/world/interiorSite.js'));
  const scene = new THREE.Scene();

  /**
   * A plan may be more than one corridor.
   *
   * `plan.wings` is a theme whose own world module calls `buildInterior` once
   * per wing and slides each one sideways — Yellow Bay is two of them with a
   * crossing between. Handing the whole plan to one build instead produces a
   * single corridor with every room in the building stacked on top of itself:
   * it renders, it measures, and the numbers are about a place that does not
   * exist. That is the failure mode this repo has paid for more than any other,
   * so the shape of the plan decides how many builds it gets.
   */
  const wings = Array.isArray(plan.wings) && plan.wings.length ? plan.wings : null;
  if(wings){
    for(const wing of wings){
      const g = new THREE.Group();
      g.position.x = wing.x ?? 0;
      g.userData.wingGroup = true;
      scene.add(g);
      buildInterior(g, stubRenderer(), {
        metrics: wing.metrics ?? plan.metrics,
        spine: wing.spine,
        rooms: wing.rooms,
        bladeSigns: wing.bladeSigns ?? [],
        openEnds: wing.openEnds ?? {},
        glazedSide: wing.glazedSide,
        ceiling: wing.ceiling,
      }, { fitOutRoom: props.fitOutRoom, fitOutSpine: props.fitOutSpine });
    }
  } else {
    buildInterior(scene, stubRenderer(), plan, {
      fitOutRoom: props.fitOutRoom, fitOutSpine: props.fitOutSpine,
    });
  }
  scene.updateMatrixWorld(true);
  return { scene, plan, props };
}

/**
 * One scene per case room — the room an outdoor game's door opens onto.
 *
 * Each is built into its own scene because the builder places a room around the
 * origin: two in one scene would be the same room twice, on top of itself.
 * A room that throws is reported rather than dropped, since a room that cannot be
 * built is the most interesting thing a checker can find.
 */
export async function caseRoomScenes(dir){
  const path = resolve(dir, 'interiors.js');
  if(!existsSync(path)) return [];
  const mod = await load(path);
  const spec = mod.INTERIORS ?? mod.interiors ?? mod.default;
  if(!spec || !Object.keys(spec).length) return [];
  const { buildInteriorBuilding } = await load(resolve(gamekit, 'engine/world/interiorBuilding.js'));
  const out = [];
  let index = 0;
  for(const [id, s] of Object.entries(spec)){
    const scene = new THREE.Scene();
    try{
      const room = buildInteriorBuilding(scene, { id, index: index++, name: s.name ?? id, ...s });
      scene.updateMatrixWorld(true);
      out.push({ id, name: s.name ?? id, scene, group: room.group, room });
    }catch(err){
      out.push({ id, name: s.name ?? id, error: err });
    }
  }
  return out;
}
