import {JSDOM} from 'jsdom';
const dom = new JSDOM(`<!DOCTYPE html><html><body>
<canvas id="canvas"></canvas>
<div id="setupOverlay"></div><div id="blocker"><button id="enterTownBtn"></button></div>
<div id="interiorOverlay"><div id="interiorCard"></div></div>
<div id="dashboardOverlay"></div><div id="mapOverlay"><div id="miniMap"></div></div>
<div id="fallbackTown"></div><div id="assignGrid"></div><div id="roster"></div>
<div id="savedBox"></div><div id="missionCounter"></div><div id="missionTitle"></div>
<div id="missionObjective"></div><div id="missionRoute"></div><div id="missionProgress"></div>
<div id="gameClock"><div id="clockStat"><strong></strong><span id="clockSub"></span></div></div>
<div id="prompt"></div>
<div id="statsOverlay"><div id="statsBody"></div><button id="statsClose"></button></div>
<div id="overlay"><div id="modalTitle"></div><div id="modalEyebrow"></div><div id="modalBody"></div><button id="modalClose"></button></div>
<div id="endScreen"></div>
<button id="mapBtn"></button><button id="closeMapBtn"></button>
<button id="tabBtn"></button><button id="statsBtn"></button><button id="settingsBtn"></button>
<div id="settingsPanel"></div><button id="closeSettingsBtn"></button>
<select id="missionJumpSelect"><option value="1">1</option></select><button id="missionJumpBtn"></button>
<input id="sensRange"><input id="speedRange"><input id="volRange">
<input type="checkbox" id="reducedMotion"><input type="checkbox" id="highContrast">
<button id="fallbackBtn"></button><button id="resetBtn"></button>
<button id="startBtn"></button><span id="validation"></span>
</body></html>`, {url:"http://localhost/"});
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = { _d:{}, getItem(k){return this._d[k]||null}, setItem(k,v){this._d[k]=v}, removeItem(k){delete this._d[k]} };
global.requestAnimationFrame = (cb)=> setTimeout(cb,16);
global.cancelAnimationFrame = (id)=> clearTimeout(id);
// mock WebGL
const canvas = document.getElementById('canvas');
canvas.getContext = () => ({ getExtension:()=>null, getParameter:()=>null });
canvas.width=800; canvas.height=600;
global.THREE = await import('three');
const modules = ['divisions','leaders','missions','curriculum','simulation','gameState','world','npcs','player','dashboard','questionUI'];
for(const m of modules){
  try{ await import(`./src/${m}.js`); console.log(`✓ ${m}.js imports ok`); }catch(e){ console.error(`✗ ${m}.js FAILED`, e.message); console.error(e.stack?.split('\n').slice(0,8).join('\n'));}
}
try{ await import('./src/main.js'); console.log('✓ main.js imports ok'); }catch(e){ console.error('✗ main.js FAILED', e.message); console.error(e.stack?.split('\n').slice(0,20).join('\n'));}
