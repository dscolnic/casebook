// signs.mjs — no two signs on one patch of wall, in every room of every theme.
//
//   node engine/dev/signs.mjs redsand_v5
//   node engine/dev/signs.mjs --all
//   npm run signs redsand_v5
//
// WHY THIS IS A BROWSER SCRIPT AND NOT A CHECKER. Nothing in the content says
// where a board ends up. `interiorFixtures.js`, `interiorKit.js`, each theme's
// `props.js` and `stageWall.js` all hang things on walls from four different
// sets of coordinates, and the only place all four are true at once is the built
// room. `placement.mjs` reads books and cannot see this; a node checker cannot
// build a room either, because the fit-out paints its screens onto a canvas.
//
// THE DEFECT IT WAS WRITTEN FOR. The beat board took the centre of the back wall
// and the room's instrument screen takes the centre of the back wall, so in
// every room of every theme with a beat script the two were coplanar and
// overlapping — PLANT SUMMARY and a sort into ATOM/MOLECULE/ION on one screen,
// found by eye and not by any gate.
//
// The rule itself is `overlappingFaces` in audit.js, with its own selftest. This
// is only the machinery that walks the rooms and puts the scene in front of it.
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import { themeNames } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const args = process.argv.slice(2);
const themes = args.includes('--all')
  ? themeNames()
  : args.filter(a => !a.startsWith('--'));
if(!themes.length){
  console.error('usage: node engine/dev/signs.mjs <theme> [<theme> …] | --all');
  process.exit(2);
}

const freePort = () => new Promise((ok, no) => {
  const srv = createServer();
  srv.on('error', no);
  srv.listen(0, '127.0.0.1', () => { const { port } = srv.address(); srv.close(() => ok(port)); });
});
const wait = (ms) => new Promise(r => setTimeout(r, ms));
async function until(url, what, tries = 150){
  for(let i = 0; i < tries; i++){
    try{ const res = await fetch(url); if(res.ok) return await res.json().catch(() => true); }catch{}
    await wait(200);
  }
  throw new Error(`${what} never came up (${url})`);
}

/** Chrome's own protocol, the same forty lines `shots.mjs` uses. */
class CDP {
  constructor(ws){
    this.ws = ws; this.id = 0; this.waiting = new Map();
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      const p = this.waiting.get(msg.id);
      if(!p) return;
      this.waiting.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
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
    return new Promise((res, rej) => {
      this.waiting.set(id, { resolve: res, reject: rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression, awaitPromise = true){
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
    if(r.exceptionDetails){
      throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    }
    return r.result?.value;
  }
  close(){ try{ this.ws.close(); }catch{} }
}

/** Every room of one theme, judged. Returns `{ rooms, clashes }`. */
async function judgeTheme(theme){
  const profile = resolve(tmpdir(), `gamekit-signs-${process.pid}-${theme}`);
  const PORT = await freePort(), DEBUG_PORT = await freePort();
  let vite = null, chrome = null, cdp = null;
  const stop = () => {
    cdp?.close(); chrome?.kill('SIGKILL'); vite?.kill('SIGKILL');
    try{ rmSync(profile, { recursive: true, force: true }); }catch{}
  };
  try{
    vite = spawn(resolve(gamekit, 'node_modules/.bin/vite'),
      ['--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
      { cwd: gamekit, env: { ...process.env, THEME: theme }, stdio: ['ignore', 'ignore', 'inherit'] });
    await until(`http://127.0.0.1:${PORT}/`, 'the dev server');

    chrome = spawn(CHROME, [
      '--headless=new', `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${profile}`, '--window-size=1280,720',
      // Software GL, for the same reason shots.mjs needs it: without WebGL the
      // world never builds and every room comes back empty, which reads exactly
      // like a room with no signs in it.
      '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      '--no-first-run', '--no-default-browser-check', '--mute-audio', 'about:blank',
    ], { stdio: 'ignore' });

    const target = await (async () => {
      for(let i = 0; i < 150; i++){
        const list = await until(`http://127.0.0.1:${DEBUG_PORT}/json`, 'Chrome').catch(() => null);
        const page = (list ?? []).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
        if(page) return page;
        await wait(200);
      }
      throw new Error('Chrome came up but never opened a page');
    })();

    cdp = await CDP.connect(target.webSocketDebuggerUrl);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });

    let ready = false;
    for(let i = 0; i < 300 && !ready; i++){
      try{ ready = !!(await cdp.eval('!!(window.gamekit && window.gamekit.scene)')); }catch{}
      if(!ready) await wait(200);
    }
    if(!ready) throw new Error('the game never finished loading');

    // The day has to be running, or a room built for an unstarted day has no
    // beat board on it at all and the clash it was written for cannot appear.
    await cdp.eval(`(() => { const st = window.gamekit.getState();
      if(st){ st.status = 'playing'; st.week = 1; if(!st.dayLeft) st.dayLeft = 6 * 3600; }
      return true; })()`);
    // A promise, not `await`: `Runtime.evaluate` runs a script and not a module,
    // so top-level await is a syntax error there. `awaitPromise` is on.
    await cdp.eval(`import('/engine/dev/audit.js')`
      + `.then(m => { window.__signs = m; return true; })`);

    const rooms = await cdp.eval('Object.keys(window.gamekit.theme.interiors || {})');
    const found = [], boards = [];
    // OUTDOORS FIRST. A town's own boards and signs hang on building faces and
    // clash there exactly as they do indoors.
    const outdoor = await cdp.eval('window.__signs.overlappingFaces(window.gamekit.scene)');
    for(const c of outdoor ?? []) found.push({ where: '(outdoors)', ...c });

    for(const id of rooms ?? []){
      const ok = await cdp.eval(`(() => { const g = window.gamekit;
        try { return !!(g.interiors && g.interiors.enter && g.interiors.enter(${JSON.stringify(id)})); }
        catch(e){ return 'ERR ' + (e && e.message); } })()`);
      if(ok !== true) continue;
      await wait(260);
      // Judged on the room's own group, so one room's boards are never compared
      // against the next room's four kilometres away.
      const clashes = await cdp.eval(`(() => {
        const g = window.gamekit, r = g.interiors.current;
        // interiors.current is { id, room } and the group belongs to room.
        // Reading r.group finds nothing, falls back to the whole scene, and
        // reports every clash in the interior district once per room.
        const root = (r && r.room && r.room.group) || g.scene;
        return window.__signs.overlappingFaces(root);
      })()`);
      for(const c of clashes ?? []) found.push({ where: id, ...c });
      // HOW READABLE THIS ROOM'S BEAT BOARD IS. Carried on the spot the room
      // saved when it placed it — see `addStageWall`. A room with no board
      // reports nothing, which is most of them.
      const board = await cdp.eval(`(() => {
        const st = window.gamekit.getState();
        const s = st && st.stageWallSpots && st.stageWallSpots[${JSON.stringify(id)}];
        return s ? { wall: s.id, w: s.w, blocked: s.blocked, readable: s.readable } : null;
      })()`);
      if(board) boards.push({ where: id, ...board });
      await cdp.eval('(() => { try { window.gamekit.interiors.exit(); } catch(e){} return true; })()');
      await wait(120);
    }
    return { rooms: (rooms ?? []).length, clashes: found, boards };
  } finally {
    stop();
  }
}

let total = 0, broke = 0, boardsBad = 0;
for(const theme of themes){
  let out;
  try{
    out = await judgeTheme(theme);
  }catch(e){
    // COUNTED SEPARATELY. A theme that would not load is not a theme with one
    // overlapping sign in it, and reporting it as one is how a gate starts
    // lying about what it found.
    console.log(`✗ ${theme}: could not be judged — ${e.message}`);
    broke++;
    continue;
  }
  // ---- the beat boards, room by room
  //
  // A FLOOR AND A BAND. Under 1.4 readable metres the labels on a 1024 px board
  // cannot be read from the doorway at all, and over half of it hidden is a
  // board the player will not find — both fail. Between that and clear is worth
  // knowing and not worth blocking: Plant Control is the best-furnished room in
  // its theme and the best it can do is 2.9 m at 15% hidden.
  const BOARD_MIN = 1.4, BOARD_BLOCKED_MAX = 0.5;
  for(const b of out.boards ?? []){
    const line = `${b.where}: beat board on the ${b.wall} wall — ${b.w.toFixed(2)} m,`
      + ` ${Math.round(b.blocked * 100)}% hidden, ${b.readable.toFixed(2)} m readable`;
    if(b.readable < BOARD_MIN || b.blocked > BOARD_BLOCKED_MAX){
      console.log(`✗ ${theme}: ${line}`);
      boardsBad++;
    } else if(b.blocked > 0.02){
      console.log(`  · ${line}`);
    }
  }
  if(!out.clashes.length){
    console.log(`✓ ${theme.padEnd(20)} ${out.rooms} room(s), no two signs share a patch of wall`);
    continue;
  }
  console.log(`✗ ${theme}: ${out.clashes.length} overlapping sign(s)`);
  for(const c of out.clashes){
    console.log(`  · ${c.where}: ${c.a} over ${c.b} — ${Math.round(c.frac * 100)}%`
      + ` of the smaller one, ${c.gap.toFixed(2)} m apart on ${c.axis}`);
  }
  total += out.clashes.length;
}

if(total || broke || boardsBad){
  const said = [];
  if(total) said.push(`${total} overlap(s)`);
  if(boardsBad) said.push(`${boardsBad} unreadable beat board(s)`);
  if(broke) said.push(`${broke} theme(s) that would not load`);
  console.log(`\nsigns: ${said.join(', ')}.`
    + (total ? ' A screen shows one thing — move one of them along the wall.' : ''));
  process.exitCode = 1;
} else {
  console.log(`\nsigns: ${themes.length} theme(s) clean.`);
}
