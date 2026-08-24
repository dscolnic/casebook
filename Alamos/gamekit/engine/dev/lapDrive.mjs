// lapDrive.mjs — boot a game for real and take every warm-up run in it.
//
//   node engine/dev/lapDrive.mjs blackout
//
// `warmupOrder.mjs` asserts the schedule and `worldFormats.mjs` asserts the
// formats against a fake world. Neither can see the wiring between them, which
// is `runLap` in src/main.js — and that is where the bug was: EVADE was handed a
// `quarry` where the format reads `pursuer`, so `npcById` found nobody, the run
// started and finished on its first frame, and the lap was marked done. From the
// plan card that is indistinguishable from a format that does not exist. Every
// check was green.
//
// So this loads the actual game in headless Chrome, sets the week, opens the plan
// on each of the first eight mornings, and for every run offered: reads the card
// the player would read, takes the run, checks a HUD appeared, and gives it up
// with Esc. Not part of `npm run check` — it needs Chrome and a dev server.
import { spawn } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');
const theme = process.argv[2] || 'blackout';
// `--shot <day>` pauses on that morning's run and writes a picture of it. The
// gates, the beacons and whether anything is standing inside a wall are the half
// of this that no HUD text can answer.
const SHOT = (() => { const i = process.argv.indexOf('--shot');
  return i > 0 ? Number(process.argv[i + 1]) : 0; })();
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const profile = resolve(tmpdir(), `lapdrive-${process.pid}`);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const freePort = () => new Promise((ok) => {
  const s = createServer();
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => ok(port)); });
});
async function until(url, what, tries = 150){
  for(let i = 0; i < tries; i++){
    try{ const r = await fetch(url); if(r.ok) return await r.json().catch(() => true); }catch{}
    await wait(200);
  }
  throw new Error(`${what} never came up (${url})`);
}
class CDP {
  constructor(ws){ this.ws = ws; this.id = 0; this.waiting = new Map();
    ws.addEventListener('message', (e) => { const m = JSON.parse(e.data);
      const p = this.waiting.get(m.id); if(!p) return; this.waiting.delete(m.id);
      m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); }); }
  static connect(url){ return new Promise((ok, no) => { const ws = new WebSocket(url);
    ws.addEventListener('open', () => ok(new CDP(ws)));
    ws.addEventListener('error', () => no(new Error('cannot reach Chrome'))); }); }
  send(method, params = {}){ const id = ++this.id;
    return new Promise((res, rej) => { this.waiting.set(id, { resolve: res, reject: rej });
      this.ws.send(JSON.stringify({ id, method, params })); }); }
  async eval(expression){
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if(r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result?.value; }
  close(){ try{ this.ws.close(); }catch{} }
}
let vite = null, chrome = null, cdp = null;
const stop = () => { cdp?.close(); chrome?.kill('SIGKILL'); vite?.kill('SIGKILL');
  try{ rmSync(profile, { recursive: true, force: true }); }catch{} };
process.on('exit', stop);
process.on('SIGINT', () => { stop(); process.exit(130); });

const PORT = await freePort(), DEBUG = await freePort();
let bad = 0;
try{
  vite = spawn(resolve(gamekit, 'node_modules/.bin/vite'),
    ['--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: gamekit, env: { ...process.env, THEME: theme }, stdio: ['ignore', 'ignore', 'inherit'] });
  await until(`http://127.0.0.1:${PORT}/`, 'the dev server');
  chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG}`,
    `--user-data-dir=${profile}`, '--window-size=1200,900', '--no-first-run',
    '--no-default-browser-check', '--mute-audio', '--hide-scrollbars', 'about:blank'],
    { stdio: ['ignore', 'ignore', 'ignore'] });
  const target = await (async () => {
    for(let i = 0; i < 100; i++){
      const list = await until(`http://127.0.0.1:${DEBUG}/json`, 'Chrome').catch(() => null);
      const page = (list ?? []).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if(page) return page;
      await wait(200);
    }
    throw new Error('Chrome opened no page');
  })();
  cdp = await CDP.connect(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
  const errs = [];
  cdp.ws.addEventListener('message', (e) => { const m = JSON.parse(e.data);
    if(m.method === 'Runtime.exceptionThrown')
      errs.push(m.params.exceptionDetails?.exception?.description ?? 'exception'); });
  cdp.ws.addEventListener('message', (e) => { const m = JSON.parse(e.data);
    if(m.method === 'Page.frameNavigated') errs.push('NAVIGATED to ' + m.params.frame.url); });
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
  await wait(6000);

  if(SHOT) await cdp.eval(`window.__lapShot = ${SHOT}`);
  const rows = await cdp.eval(String.raw`
  (async () => {
    const out = [];
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    document.getElementById('startBtn')?.click();
    await sleep(600);
    const g = window.gamekit;
    if(!g) return [{ fail: 'no window.gamekit — the game never booted' }];
    const st = g.getState();
    if(!st) return [{ fail: 'no state' }];
    const days = g.theme.content.MISSIONS.length;
    for(let w = 1; w <= days; w++){
      st.week = w; st.dayStarted = false; st.dayEnded = false;
      g.day.showPlan();
      await sleep(250);
      const ov = document.getElementById('overlay');
      const title = ov?.querySelector('.modalTitle, h2, h3')?.textContent?.trim() ?? '';
      const body = ov?.querySelector('.modalBody')?.textContent?.trim() ?? '';
      const go = [...(ov?.querySelectorAll('button') ?? [])].find(b => b.id === 'lapGo');
      const skip = [...(ov?.querySelectorAll('button') ?? [])].find(b => b.id === 'lapSkip');
      const pay = [...(ov?.querySelectorAll('button') ?? [])].find(b => b.id === 'lapPay');
      out.push({ day: w, lap: !!go, title, words: body.split(/\s+/).filter(Boolean).length,
                 opening: body.slice(0, 90), pay: !!pay });
      // Day 1 is taken rather than skipped: a card that reads well and a run
      // that never mounts look identical from the plan screen.
      if(go){
        go.click();
        await sleep(1200);
        // TRIAL builds its own HUD in engine/world/trial.js under its own id.
        const hud = document.getElementById('worldHUD') ?? document.getElementById('trialHUD');
        out[out.length - 1].ran = !!hud;
        out[out.length - 1].hud = hud?.textContent?.trim().slice(0, 90) ?? '';
        out[out.length - 1].markers = window.gamekit.scene.children.length;
        // A second reading five seconds later. A run whose HUD does not move is a
        // run that is not happening — which is how FOLLOW's guide walked into the
        // first building and stayed there, with a card and a HUD that both looked
        // exactly like a working format.
        await sleep(5000);
        if(!out[out.length - 1].ran){
          // Why it did not mount. Every default person comes off the roster, so
          // the first question is whether the crowd has them at all.
          const id = window.gamekit.theme.content.ROSTER?.[0]?.id;
          const npcs = window.gamekit.getNPCs?.() ?? [];
          out[out.length - 1].probe = { id,
            crowd: npcs.length,
            found: npcs.some(n => String(n.char?.id ?? n.id) === String(id)),
            ids: npcs.slice(0, 6).map(n => String(n.char?.id ?? n.id)) };
        }
        const hud2 = document.getElementById('worldHUD') ?? document.getElementById('trialHUD');
        out[out.length - 1].later = hud2?.textContent?.trim().slice(0, 90) ?? '(run over)';
        // Asked for a picture of this morning? Leave the run standing and hand
        // back — the screenshot is taken with the world still up, because a
        // torn-down run photographs as an empty street.
        if(w === Number(window.__lapShot ?? -1)) return out;
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
        await sleep(400);
        out[out.length - 1].tornDown =
          !document.getElementById('worldHUD') && !document.getElementById('trialHUD');
        continue;
      }
      (skip ?? [...(ov?.querySelectorAll('button') ?? [])].find(b => b.id === 'planStart'))?.click();
      await sleep(150);
    }
    return out;
  })()`);

  // ---- the priced way past a run
  //
  // The card's second button. Driven rather than reasoned about, because the run
  // itself is what the rest of this file exists to prove and a button that takes
  // the money and leaves the card up would look identical from a checker: the
  // lap is still due, the plan never opens, and nothing throws.
  const paid = await cdp.eval(String.raw`
  (async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const g = window.gamekit;
    const st = g.getState();
    const openCard = () => { st.dayStarted = false; st.dayEnded = false; g.day.showPlan(); };
    const btn = (id) => [...(document.getElementById('overlay')?.querySelectorAll('button') ?? [])]
      .find(b => b.id === id);
    // Rich: the button is offered, the money goes, the run is marked done, and
    // the plan card is what comes up next.
    st.week = 1; st.laps = {}; st.reserve = 30;
    openCard(); await sleep(250);
    const offered = !!btn('lapPay'), disabledRich = !!btn('lapPay')?.disabled;
    btn('lapPay')?.click(); await sleep(400);
    const title = document.querySelector('.modalTitle, #modalTitle')?.textContent?.trim() ?? '';
    // What the plan card is called is the THEME's word for a day, not a list kept
    // here. Bring Them Home says Watch, Red Sand says Sol, a Quick Discovery says
    // Level — and a hardcoded list reported "the plan card did not come up" for a
    // card that was on the screen with its title in the assertion's own message.
    // Compared by prefix rather than by regex: this whole block is inside a
    // String.raw template, so a character class with a dollar-brace in it closes
    // the template instead of escaping anything.
    const noun = (g.theme?.dayNoun ?? 'Day').trim();
    const after = { offered, disabledRich, reserve: st.reserve,
      lapsMarked: Object.keys(st.laps ?? {}).length, title, noun,
      planUp: title.toLowerCase().startsWith(noun.toLowerCase()) };
    // Broke: the same card, and the button is there but dead — a missing button
    // and a disabled one read very differently to somebody with no money.
    st.week = 2; st.laps = {}; st.reserve = 0;
    openCard(); await sleep(250);
    after.brokeOffered = !!btn('lapPay');
    after.brokeDisabled = !!btn('lapPay')?.disabled;
    after.brokeSaysWhy = /Director funds are \$0/.test(
      document.getElementById('modalBody')?.textContent ?? '');
    btn('lapPay')?.click(); await sleep(250);
    after.brokeStillDue = !!btn('lapGo');
    return after;
  })()`);
  console.log(`
paid way past a run:`);
  const payCases = [
    ['the card offers it', paid?.offered === true],
    ['…and it is live when the money is there', paid?.disabledRich === false],
    [`$10 comes off the reserve (30 → ${paid?.reserve})`, paid?.reserve === 20],
    ['the run is marked done, so it is not offered again', paid?.lapsMarked === 1],
    [`the plan card is what comes up ("${paid?.title ?? ''}")`, paid?.planUp === true],
    ['with no money it is still shown', paid?.brokeOffered === true],
    ['…disabled rather than missing', paid?.brokeDisabled === true],
    ['…and the card says what is missing', paid?.brokeSaysWhy === true],
    ['…and the run is still the way on', paid?.brokeStillDue === true],
  ];
  for(const [what, ok] of payCases){
    console.log(`  ${ok ? '✓' : '✗'} ${what}`);
    if(!ok) bad++;
  }

  if(SHOT){
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const out = `/tmp/lap-${theme}-d${SHOT}.png`;
    writeFileSync(out, Buffer.from(shot.data, 'base64'));
    console.log(`\npicture of day ${SHOT}'s run: ${out}`);
  }
  console.log(`\nlapdrive: ${theme}\n`);
  for(const r of rows){
    if(r.fail){ console.log(`  ✗ ${r.fail}`); bad++; continue; }
    if(!r.lap){ console.log(`  · day ${r.day}: no run offered — ${r.title}`); continue; }
    console.log(`  ✓ day ${r.day}: ${r.title}`);
    console.log(`      ${r.words} words — ${r.opening}…`);
    if(r.ran !== undefined){
      console.log(`      run mounted: ${r.ran ? 'yes' : 'NO'} — HUD "${r.hud.replace(/\s+/g, ' ')}"`);
      if(r.probe) console.log(`      probe: ${JSON.stringify(r.probe)}`);
      console.log(`      five seconds on: ${r.later.replace(/\s+/g, ' ')}`);
      console.log(`      Esc tore it down: ${r.tornDown ? 'yes' : 'NO'}`);
      if(!r.ran || !r.tornDown) bad++;
    }
  }
  for(const e of errs.slice(0, 5)){ if(!e.startsWith('NAVIGATED')){ console.log(`  ✗ page error: ${e.split('\n')[0]}`); bad++; } }
}catch(e){ console.error(e.message); bad++; }
stop();
process.exit(bad ? 1 : 0);
