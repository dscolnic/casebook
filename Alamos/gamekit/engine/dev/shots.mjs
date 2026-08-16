// shots.mjs — a picture of every room, from one command.
//
//   node engine/dev/shots.mjs quantum
//   node engine/dev/shots.mjs bring_them_home --hud
//   node engine/dev/shots.mjs quantum --at -6,0,32 --yaw 90 --name cryostat
//   npm run shots quantum
//
// WHY THIS EXISTS. Everything about how a place *looks* has been found by a
// person launching the game, walking to the room, and saying what was wrong with
// it — floating boards, sterile walls, a mural clipped by the ceiling, a seal hung
// where the gallery hides it. Every one of those cost a round trip through a human
// being, and most of them were obvious in a still. A checker cannot judge whether
// a room looks lived in. It can put the picture in front of somebody who can, for
// every room at once, in about a minute.
//
// HOW. Vite serves the theme, headless Chrome renders it through SwiftShader, and
// the game's own `teleport` puts the camera where each shot wants it. The HUD and
// the day's opening panel are hidden so the shot is of the room. Output is a
// folder of PNGs and a contact sheet — one page, every room, opened with `open`.
//
// WHERE THE VIEWS COME FROM, in order of preference:
//   1. `--at`/`--yaw` on the command line, for one specific thing.
//   2. `themes/<theme>/shots.js`, exporting VIEWS — for a hand-built world, which
//      has no plan to read and is exactly the case `placement.mjs` cannot check.
//   3. The theme's `plan.js`: each room from its own middle, facing each wall.
//   4. The spawn point, turned all the way round.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import { themeDir, placeDir } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/**
 * A port nothing is listening on.
 *
 * Fixed ports meant a run that died without cleaning up blocked the next one, and
 * two themes could not be shot at the same time. The kernel already knows which
 * ports are free; asking it for one and letting it go is the whole trick.
 */
function freePort(){
  return new Promise((ok, no) => {
    const srv = createServer();
    srv.on('error', no);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => ok(port));
    });
  });
}

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);
const theme = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--at'
  && args[args.indexOf(a) - 1] !== '--yaw' && args[args.indexOf(a) - 1] !== '--name'
  && args[args.indexOf(a) - 1] !== '--out');
if(!theme){
  console.error('usage: node engine/dev/shots.mjs <theme> [--hud] [--at x,y,z --yaw deg] [--out dir]');
  process.exit(2);
}
const W = Number(flag('width', 1280));
const H = Number(flag('height', 800));
const outDir = resolve(gamekit, flag('out', `shots/${theme}`));

/** Yaw, in the game's convention: forward is (−sin θ, 0, −cos θ). */
const FACING = { northMinusZ: 0, west: Math.PI / 2, south: Math.PI, east: -Math.PI / 2 };

// ------------------------------------------------------------------- views

async function viewsFor(dir){
  const at = flag('at');
  if(at){
    const [x, y, z] = at.split(',').map(Number);
    return [{ name: flag('name', 'view'), at: { x, y: y || 0, z },
      yaw: (Number(flag('yaw', 0)) * Math.PI) / 180, note: 'from the command line' }];
  }

  // A world nobody generated has to say where to stand.
  const own = resolve(dir, 'shots.js');
  if(existsSync(own)){
    const mod = await import(pathToFileURL(own).href);
    const list = mod.VIEWS ?? mod.default ?? [];
    // A theme writes `yaw: 90` and means ninety degrees. The engine's own views
    // are built in radians, so a theme file was being read as 90 radians —
    // which is 5.13 after wrapping, about 294°, and every hand-placed viewpoint
    // in three games was aimed somewhere nobody chose. It went unnoticed because
    // a flat plateau and an ice sheet look much the same on any bearing, and it
    // was found the first time a viewpoint was aimed at something as specific as
    // a roller-coaster loop. Nobody writes 90 radians on purpose, so anything
    // past a full turn is taken as degrees.
    const asRadians = (y) => (Math.abs(y ?? 0) > Math.PI * 2 ? ((y ?? 0) * Math.PI) / 180 : (y ?? 0));
    if(list.length) return list.map(v => ({ note: 'from the theme', ...v, yaw: asRadians(v.yaw) }));
  }

  const planPath = resolve(dir, 'plan.js');
  if(existsSync(planPath)){
    const { plan } = await import(pathToFileURL(planPath).href);
    const M = plan.metrics ?? {};
    const half = M.corridorHalfWidth ?? 2.1;
    const depth = M.roomDepth ?? 8.4;
    const views = [];
    for(const r of plan.rooms ?? []){
      const sgn = r.side === 'e' ? 1 : -1;
      const cz = (r.z0 + r.z1) / 2;
      // Stand at the wall opposite whichever wall the shot is of. Photographing a
      // wall from the middle of the room fills the frame with two metres of it and
      // crops off everything hung at either end — which is where the doorways are,
      // and the doorways are where the mistakes are.
      const near = sgn * (half + 1.1);
      const far = sgn * (half + depth - 1.1);
      const name = (r.name ?? r.id).replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      views.push({ name: `${name}--far-wall`, at: { x: near, z: cz },
        yaw: sgn > 0 ? FACING.east : FACING.west, note: `${r.name ?? r.id}, the outer wall` });
      views.push({ name: `${name}--doorway`, at: { x: far, z: cz },
        yaw: sgn > 0 ? FACING.west : FACING.east, note: `${r.name ?? r.id}, back toward the corridor` });
      views.push({ name: `${name}--end`, at: { x: (near + far) / 2, z: r.z0 + 1.2 },
        yaw: FACING.south, note: `${r.name ?? r.id}, down the length of the room` });
    }
    // And the corridor, both ways, at intervals — where the signage lives.
    const sp = plan.spine ?? { z0: 0, z1: 0 };
    const steps = Math.max(2, Math.round((sp.z1 - sp.z0) / 14));
    for(let i = 0; i <= steps; i++){
      const z = sp.z0 + ((sp.z1 - sp.z0) * i) / steps;
      views.push({ name: `corridor-${String(Math.round(z)).padStart(3, '0')}-north`,
        at: { x: 0, z: Math.min(z, sp.z1 - 1) }, yaw: FACING.south,
        note: `corridor at z ${Math.round(z)}, looking north` });
      views.push({ name: `corridor-${String(Math.round(z)).padStart(3, '0')}-south`,
        at: { x: 0, z: Math.max(z, sp.z0 + 1) }, yaw: FACING.northMinusZ,
        note: `corridor at z ${Math.round(z)}, looking south` });
    }
    return views;
  }

  // Nothing to go on: stand where the player starts and turn all the way round.
  return [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({
    name: `spawn-${i}`, at: null, yaw: (i * Math.PI) / 4,
    note: `from the spawn, ${i * 45}°`,
  }));
}

// --------------------------------------------------------------------- CDP
//
// Chrome's own protocol, over the WebSocket node has had built in since 22. A
// dependency for this would be a Chromium download per checkout, to do what forty
// lines do.

class CDP {
  constructor(ws){
    this.ws = ws; this.id = 0; this.waiting = new Map();
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      const pending = this.waiting.get(msg.id);
      if(!pending) return;
      this.waiting.delete(msg.id);
      msg.error ? pending.reject(new Error(msg.error.message)) : pending.resolve(msg.result);
    });
  }
  static connect(url){
    return new Promise((ok, no) => {
      const ws = new WebSocket(url);
      ws.addEventListener('open', () => ok(new CDP(ws)));
      ws.addEventListener('error', () => no(new Error(`cannot reach Chrome at ${url}`)));
    });
  }
  send(method, params = {}){
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.waiting.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  /** Run an expression in the page and return its value. Throws what it throws. */
  async eval(expression, awaitPromise = true){
    const r = await this.send('Runtime.evaluate',
      { expression, awaitPromise, returnByValue: true });
    if(r.exceptionDetails){
      throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    }
    return r.result?.value;
  }
  close(){ try{ this.ws.close(); }catch{} }
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));

/** Poll a URL until it answers, or give up with something readable. */
async function until(url, what, tries = 100){
  for(let i = 0; i < tries; i++){
    try{
      const res = await fetch(url);
      if(res.ok) return await res.json().catch(() => true);
    }catch{}
    await wait(200);
  }
  throw new Error(`${what} never came up (${url})`);
}

// --------------------------------------------------------------------- run
// The viewpoints belong to the place, so an edition takes the base theme's.
const dir = placeDir(theme);
const views = await viewsFor(dir);
mkdirSync(outDir, { recursive: true });

const profile = resolve(tmpdir(), `gamekit-shots-${process.pid}`);
let vite = null, chrome = null, cdp = null;

const stop = () => {
  cdp?.close();
  chrome?.kill('SIGKILL');
  vite?.kill('SIGKILL');
  try{ rmSync(profile, { recursive: true, force: true }); }catch{}
};
process.on('exit', stop);
process.on('SIGINT', () => { stop(); process.exit(130); });

const PORT = await freePort();
const DEBUG_PORT = await freePort();

try{
  console.log(`shots: ${theme} — ${views.length} view(s)`);

  // Pinned to the v4 loopback address on purpose: left alone, vite binds the name
  // `localhost`, which on this machine resolves to ::1 and nothing else — so the
  // server is up, and every v4 request to it is refused.
  vite = spawn(resolve(gamekit, 'node_modules/.bin/vite'),
    ['--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: gamekit, env: { ...process.env, THEME: theme }, stdio: ['ignore', 'ignore', 'inherit'] });
  await until(`http://127.0.0.1:${PORT}/`, 'the dev server');

  chrome = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    `--window-size=${W},${H}`,
    // Software GL. Without it headless Chrome has no WebGL and every shot is the
    // clear colour — which looks exactly like a broken world, and is not one.
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--no-first-run', '--no-default-browser-check', '--mute-audio', '--hide-scrollbars',
    // Started blank and navigated below, rather than launched at the game. Chrome
    // opens about:blank first either way, and a page that navigates out from under
    // an attached client destroys the execution context mid-call.
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  const targets = await (async () => {
    for(let i = 0; i < 100; i++){
      const list = await until(`http://127.0.0.1:${DEBUG_PORT}/json`, 'Chrome').catch(() => null);
      const page = (list ?? []).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if(page) return page;
      await wait(200);
    }
    throw new Error('Chrome came up but never opened a page');
  })();

  cdp = await CDP.connect(targets.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });

  // The world builds asynchronously, and the debug handle is the signal that it is
  // up. Retried rather than awaited once: the page is still settling, and an
  // evaluate that lands mid-navigation comes back "Execution context was
  // destroyed" — which is the load working, not failing.
  const ready = await (async () => {
    for(let i = 0; i < 300; i++){
      try{
        if(await cdp.eval('!!(window.gamekit && window.gamekit.teleport)')) return true;
      }catch{}
      await wait(200);
    }
    return false;
  })();
  if(!ready) throw new Error('the game never finished loading (no window.gamekit after 60 s)');

  // Put the clock in the middle of the working day before anything is rendered.
  //
  // The day's countdown has not started when the harness arrives — the plan card
  // is still up and `dayLeft` is 0 — and `hourOfDay()` derives the sun angle
  // from how much of the day is *gone*, so an unstarted day reads as a finished
  // one and the sun sits at the end of `look.dayWindow`. Every outdoor
  // screenshot this tool has ever taken was at dusk or after it: Riverton at
  // night, the mesa under a black sky, and a real clipped-dome bug that took an
  // hour to tell apart from this.
  //
  // Midday rather than dawn, because both ends of the window are a low sun and
  // the point of a screenshot is to see the place.
  const clock = await cdp.eval(`(() => {
    const g = window.gamekit;
    const st = g && g.getState && g.getState();
    if(!st) return null;
    const w = (g.theme && g.theme.look && g.theme.look.dayWindow) || [8, 18];
    const hour = (w[0] + w[1]) / 2;
    if(st.dayBudget) st.dayLeft = st.dayBudget * 0.5;
    st.timeHours = hour;
    if(g.world && g.world.updateTimeOfDay) g.world.updateTimeOfDay(hour % 24);
    return hour;
  })()`);
  if(clock) console.log(`  clock: ${String(clock).slice(0, 5)}h — mid-window, so the sun is up`);

  // The shot is of the room, so everything that is not the room goes. Hiding a
  // list of ids missed a widget drawn by script that has no id in the markup at
  // all; hiding every child of body except the canvas cannot, and does not need
  // updating when the HUD grows a part.
  const hideChrome = `(() => {
    for(const el of document.body.children){
      if(el.id !== 'canvas') el.style.display = 'none';
    }
    return true;
  })()`;
  if(!has('hud')) await cdp.eval(hideChrome);

  const written = [];
  for(const v of views){
    const at = v.at
      ? `{x:${v.at.x},y:${v.at.y ?? 0},z:${v.at.z}}`
      : 'window.gamekit.theme.start';
    // Two frames after the move: one to render the new position, one because a
    // texture or a light that arrived with it lands on the frame after.
    await cdp.eval(`new Promise(ok => {
      window.gamekit.teleport(${at}, ${v.yaw});
      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => ok(true), 60)));
    })`);
    if(!has('hud')) await cdp.eval(hideChrome);
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const file = `${v.name}.png`;
    writeFileSync(resolve(outDir, file), Buffer.from(shot.data, 'base64'));
    written.push({ ...v, file });
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  // The contact sheet. The point of the whole tool is one thing to open.
  const esc = (s) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const sheet = `<!doctype html><meta charset="utf-8"><title>${esc(theme)} — rooms</title>
<style>
  body { margin: 0; padding: 24px; background: #14161a; color: #e8eaed;
         font: 14px/1.5 Inter, system-ui, sans-serif; }
  h1 { font-size: 18px; font-weight: 600; margin: 0 0 4px; }
  p.sub { margin: 0 0 24px; color: #98a0aa; }
  .grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); }
  figure { margin: 0; background: #1c1f24; border-radius: 8px; overflow: hidden; }
  img { display: block; width: 100%; height: auto; }
  figcaption { padding: 10px 12px; }
  b { font-weight: 600; }
  small { display: block; color: #98a0aa; }
</style>
<h1>${esc(theme)}</h1>
<p class="sub">${written.length} views, ${W}×${H}. Rebuild with <code>npm run shots ${esc(theme)}</code>.</p>
<div class="grid">
${written.map(v => `  <figure><img src="${esc(v.file)}" alt="${esc(v.note ?? v.name)}" loading="lazy">
    <figcaption><b>${esc(v.name)}</b><small>${esc(v.note ?? '')}</small></figcaption></figure>`).join('\n')}
</div>`;
  writeFileSync(resolve(outDir, 'index.html'), sheet);
  console.log(`${written.length} shots → ${outDir}`);
  console.log(`open ${resolve(outDir, 'index.html')}`);
}catch(err){
  console.error(`shots failed: ${err.message}`);
  stop();
  process.exit(1);
}
stop();
process.exit(0);
