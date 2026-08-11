// personStops.mjs — walk up to every mission person, in every order, and check
// that the mission question opens rather than the passage.
//
//   node engine/dev/personStops.mjs <theme>
//
// The bug this exists for: a day with two person stops served the mission
// question to one of them and the character passage to the other, and which one
// depended on the order the player walked. Nothing threw, nothing logged — the
// caller asks "did a panel open?" by looking at the overlay, and when the answer
// is no it shows the passage instead. Every silent failure lands there.
//
// So this drives the real `openPersonOrPassage` against a DOM stub thin enough
// to run in node, for both people and both orders, and reports which branch
// fired. Like smokeCampaign, it tests the engine rather than the content.
import { register } from 'node:module';
import { resolve, dirname } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';
import { pathToFileURL } from 'node:url';

const here = dirname(new URL(import.meta.url).pathname);
const themeName = process.argv[2] || 'contamcity';
register('./themeResolver.mjs', pathToFileURL(here + '/'), { data: { themeDir: resolveTheme(themeName) } });

// ---- the smallest DOM openModal and the challenge renderers will accept.
class El {
  constructor(id){
    this.id = id; this._cls = new Set(); this.children = []; this.dataset = {};
    this.style = { setProperty(){}, removeProperty(){}, getPropertyValue: () => '' };
  }
  get classList(){
    const s = this._cls;
    return { add: (c) => s.add(c), remove: (c) => s.delete(c), contains: (c) => s.has(c), toggle: (c, on) => on ? s.add(c) : s.delete(c) };
  }
  set innerHTML(v){ this._html = String(v); }
  get innerHTML(){ return this._html ?? ''; }
  set textContent(v){ this._text = String(v); }
  get textContent(){ return this._text ?? ''; }
  querySelectorAll(){ return []; }
  querySelector(){ return null; }
  appendChild(c){ this.children.push(c); return c; }
  addEventListener(){}
  removeEventListener(){}
  focus(){}
  getBoundingClientRect(){ return { width: 800, height: 600, top: 0, left: 0 }; }
}
const els = new Map();
const el = (id) => { if(!els.has(id)) els.set(id, new El(id)); return els.get(id); };
globalThis.document = {
  getElementById: (id) => el(id),
  createElement: (t) => new El(t),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener(){}, removeEventListener(){},
  body: new El('body'),
  documentElement: new El('html'),
  pointerLockElement: null,
  exitPointerLock(){},
  visibilityState: 'visible',
};
globalThis.window = { innerWidth: 1280, innerHeight: 800, addEventListener(){}, removeEventListener(){}, dispatchEvent(){}, localStorage: { getItem: () => null, setItem(){} } };
globalThis.localStorage = window.localStorage;
globalThis.alert = () => {};
globalThis.requestAnimationFrame = () => 0;

const { getState, createFresh } = await import('../core/gameState.js');
const { openPersonVisit } = await import('../core/questionUI.js');
const { openPersonOrPassage } = await import('../core/app.js');
const { openStopIndices, isPersonStopForIdx, getPersonIdForStop, getCurrentMission,
        divisionForCharacter } = await import('../core/simulation.js');
// Through the same modules the engine reads them: a theme is free to call its
// exports GROUPS or ROSTER, and these three normalise that.
const { HISTORIC_CHARACTERS } = await import('../core/historicCharacters.js');
const { GROUP_DEFS } = await import('../core/divisions.js');
const { LEADERS } = await import('../core/leaders.js');
const { MISSION_DEFS } = await import('../core/missions.js');

const problems = [];
const byId = new Map((HISTORIC_CHARACTERS ?? []).map(c => [c.id, c]));
if(!byId.size) throw new Error('no roster — this check cannot see anybody');

// Whoever leads each area; the campaign normally picks these on the first
// screen, and nothing here depends on the choice.
const assign = Object.fromEntries((GROUP_DEFS ?? []).map(d => {
  const first = (LEADERS ?? []).find(l => l.division === d.id || l.group === d.id);
  return [d.id, first?.id ?? (LEADERS ?? [])[0]?.id ?? null];
}));
createFresh(assign);
const state = getState();
const missions = (MISSION_DEFS ?? []).length || 15;

for(let week = 1; week <= missions; week++){
  state.week = week;
  state.missionStopsCompleted = [];
  const m = getCurrentMission(state);
  if(!m) continue;
  const people = openStopIndices(state)
    .filter(i => isPersonStopForIdx(state, i))
    .map(i => ({ i, id: getPersonIdForStop(state, i) }));
  if(!people.length) continue;
  for(const p of people){
    if(!p.id){ problems.push(`day ${week} stop ${p.i}: no person id — nobody to walk to`); continue; }
    if(!byId.has(p.id)) problems.push(`day ${week} stop ${p.i}: person "${p.id}" is not on the roster`);
  }
  // Every order, so an order-dependent failure cannot hide behind the lucky one.
  for(const first of people){
    state.missionStopsCompleted = [];
    const order = [first, ...people.filter(p => p !== first)];
    for(const p of order){
      const char = byId.get(p.id);
      if(!char) continue;
      const npc = { char, id: char.id, division: char.division ?? divisionForCharacter(char.id) };
      let passage = null, threw = null;
      let opened;
      // Deliberately NOT clearing the overlay between calls. That is the state
      // the bug lived in: a panel left flagged open made the caller's "did a
      // panel open?" test answer no, and the next mission person got their
      // character passage. Leaving it stale is the regression test.
      try{
        opened = openPersonOrPassage(npc, char, (who) => { passage = who; }, { openPersonVisit });
      }catch(e){ threw = e; }
      const label = `day ${week}, walking to ${p.id} ${order[0] === p ? 'first' : 'second'}`;
      if(threw) problems.push(`${label}: threw ${threw.message}`);
      else if(!opened || passage) problems.push(`${label}: showed the character passage instead of the mission question`);
      // Whatever happened, that call is spent for the rest of this order.
      const idx = openStopIndices(state).find(i => isPersonStopForIdx(state, i) && getPersonIdForStop(state, i) === p.id);
      if(idx !== undefined) state.missionStopsCompleted.push(idx);
    }
  }
}

if(problems.length){
  console.log(`\n${problems.length} problem(s) in theme "${themeName}":`);
  for(const p of problems.slice(0, 25)) console.log('  ✗ ' + p);
  if(problems.length > 25) console.log(`  … and ${problems.length - 25} more`);
  process.exit(1);
}
console.log(`\n✓ theme "${themeName}": every mission person opens their mission question, in every order`);
