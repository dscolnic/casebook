// doors.mjs — every room on a floor plan is behind a door the player has to open.
//
//   node engine/dev/doors.mjs <theme> | --all
//
// WHAT THIS IS FOR. The interior builder used to leave every leaf ajar with no
// collider in the opening, so the doors were scenery and the rooms were alcoves.
// Now the leaf is shut and its collider stands in the doorway until the player
// presses E. Three things have to hold at once, and the middle one is the whole
// reason this file exists:
//
//   1. shut, the doorway blocks the player
//   2. the collider is FLAGGED, so the crowd and the reachability fill ignore it
//      — a door counted as a wall strands every walker and reports every stop in
//      the game as unreachable
//   3. opened, the doorway lets the player through
//
// The second cannot be seen by looking at the game: a walker that never leaves
// its room looks like a walker that has nowhere to go.
import { resolve, dirname } from 'node:path';
import { themeDir, themeNames } from './registry.mjs';
import { interiorScene, THREE } from './scenes.mjs';
import { existsSync } from 'node:fs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');
const { blockedBy } = await import('../world/interiorSite.js');

const args = process.argv.slice(2);
const wanted = args.includes('--all') ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!wanted.length){ console.error('usage: node engine/dev/doors.mjs <theme> | --all'); process.exit(2); }

let failed = 0, floors = 0;
for(const name of wanted){
  const dir = themeDir(name);
  if(!dir || !existsSync(resolve(dir, 'plan.js'))) continue;
  let built; try { built = await interiorScene(dir); } catch(e){
    console.log(`  ✗ ${name}: interior would not build — ${e.message}`); failed++; continue;
  }
  if(!built) continue;
  floors++;

  // A plan may be several floors or several wings, and EACH IS CHECKED AGAINST
  // ITS OWN COLLIDERS. Pooling them is wrong twice over: a tower's floors sit on
  // one footprint, and a two-wing plan is built in local coordinates and slid
  // sideways by the theme's own world — so in the pooled list every door on floor
  // 45 has three other floors' walls lying exactly on top of it. Yellow Bay
  // reported "a shut door blocks the crowd" for precisely that reason, and its
  // doors are fine.
  const parts = built.builds ?? [];
  const rooms = (built.plan?.rooms ?? []).length;
  const problems = [];
  let doors = 0;

  for(const part of parts){
    const opens = (part.interactables ?? []).filter(i => i.type === 'roomdoor');
    const walls = part.colliders ?? [];
    const boxes = walls.filter(c => c.isDoor);
    doors += opens.length;
    if(boxes.length !== opens.length){
      problems.push(`${opens.length} door(s) to open but ${boxes.length} collider(s) in a doorway`);
    }
    // A person may stand in a doorway; the player may not.
    const stands = blockedBy(walls);
    const box = boxes[0];
    if(box){
      const c = box.getCenter(new THREE.Vector3());
      const stops = walls.some(b => !b.isEmpty()
        && c.x > b.min.x - 0.3 && c.x < b.max.x + 0.3 && c.z > b.min.z - 0.3 && c.z < b.max.z + 0.3);
      if(!stops) problems.push('a shut door does not block the player');
      if(stands(c.x, c.z, 0.2)) problems.push('a shut door blocks the crowd and the reachability fill');
    }
    // AND IT OPENS — the collider, not the prompt.
    //
    // This gate passed on a build where pressing E did nothing at all: the swing
    // was registered as an animator, all three interior worlds call
    // `clearAnimators()` after the shell is built, and so the leaf never moved and
    // the doorway stayed blocked. The prompt still flipped, because the prompt was
    // the only thing being asserted. What has to be true is that the way through
    // is open on the same tick the player presses the key.
    const first = opens[0];
    if(first){
      const before = walls.filter(c => c.isDoor && !c.isEmpty()).length;
      first.toggle();
      const after = walls.filter(c => c.isDoor && !c.isEmpty()).length;
      if(after !== before - 1) problems.push('opening a door does not clear the way through it');
      if(!/close/i.test(first.prompt)) problems.push('opening a door does not change its prompt');
      first.toggle();
      if(walls.filter(c => c.isDoor && !c.isEmpty()).length !== before){
        problems.push('closing a door does not put its collider back');
      }
      if(!/open/i.test(first.prompt)) problems.push('closing it again does not change back');
    }
  }
  if(!doors) problems.push('no room door can be opened at all');

  if(problems.length){ failed++; console.log(`  ✗ ${name}: ${problems.join('; ')}`); }
  else console.log(`  ✓ ${name.padEnd(22)} ${doors} door(s) shut across ${rooms} room(s)`);
}

console.log(failed
  ? `\n✗ doors: ${failed} interior(s) whose rooms are not behind a door.`
  : `\n✓ doors: ${floors} floor plan(s), every room behind a door the player opens.`);
process.exit(failed ? 1 : 0);
