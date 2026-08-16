// instrumentDrive.mjs — open every live panel in a theme, operate it, and say
// what happened.
//
//   node engine/dev/instrumentDrive.mjs instruments
//
// This exists because of the most expensive lesson in the repo: a gable roof was
// inside out in a shipped game and passed every assertion available — exports
// present, meshes created, no errors, builds clean. The twelve formats in
// `engine/core/instruments.js` are worse than a roof for this, because they are
// interactive: a panel can render perfectly, print its question, expose its
// commit button, and still never reach `ctx.commit` because one selector is
// wrong. Nothing in `npm run check` can see it. The book is green either way.
//
// So this drives them. It loads `engine/dev/instruments.html` in headless
// Chrome, and for each panel found it clicks and drags the way a player would,
// takes the correct path through, and asserts that the format committed and
// graded it right. Then it takes the wrong path and asserts it graded that
// wrong. A format that cannot distinguish the two is the failure this catches.
//
// It is NOT part of `npm run check`: it needs Chrome and a dev server, and check
// has to stay a thing that runs on a laptop with no browser. Run it after
// touching instruments.js, and before believing anything about a new format.

import { spawn } from 'node:child_process';
import { rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import { themeDir } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');
const theme = process.argv[2] || 'instruments';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const wait = (ms) => new Promise(r => setTimeout(r, ms));
const freePort = () => new Promise((ok) => {
  const s = createServer();
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => ok(port)); });
});
async function until(url, what, tries = 120){
  for(let i = 0; i < tries; i++){
    try{ const r = await fetch(url); if(r.ok) return await r.json().catch(() => true); }catch{}
    await wait(200);
  }
  throw new Error(`${what} never came up (${url})`);
}

// Chrome's own protocol over the WebSocket node has had since 22, the same forty
// lines shots.mjs uses. A dependency for this would be a Chromium per checkout.
class CDP {
  constructor(ws){
    this.ws = ws; this.id = 0; this.waiting = new Map();
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      const p = this.waiting.get(m.id);
      if(!p) return;
      this.waiting.delete(m.id);
      m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result);
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
  async eval(expression){
    const r = await this.send('Runtime.evaluate',
      { expression, awaitPromise: true, returnByValue: true });
    if(r.exceptionDetails){
      throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    }
    return r.result?.value;
  }
  close(){ try{ this.ws.close(); }catch{} }
}

// ---------------------------------------------------------------- the driver
//
// Runs inside the page. Each entry mounts one panel on a scratch node with a
// recording context, plays the right answer, then plays the wrong one, and
// reports both verdicts. The right/wrong pairs are written from the format's own
// data rather than hard-coded, so this follows a book that changes.
const DRIVER = String.raw`
(async () => {
  const { INSTRUMENTS } = await import('/engine/core/instruments.js');
  // The page has already imported the theme's content through vite's '@theme'
  // alias and put it on the window. Importing it here instead fails two ways:
  // the alias means nothing to a runtime import(), and the served-path fallback
  // cannot reach a theme that lives in its own package directory outside
  // gamekit — which two of the games do.
  const CURRICULUM = window.__CURRICULUM;
  if(!CURRICULUM) throw new Error('instruments.html did not expose __CURRICULUM');
  const out = [];
  const set = (el, v) => {
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const click = (el) => el && !el.disabled && el.click();
  const tick = (el, on = true) => {
    if(!el || el.disabled || el.checked === on) return;   // a player cannot tick a disabled box
    el.checked = on; set(el, el.value);
  };

  // How to answer each format right, and how to answer it wrong. The wrong path
  // is always the plausible mistake the format was built to catch.
  const PLAY = {
    TRIGGER: (p, g, right) => {
      const top = Math.max(...g.trigger.stream.map(s => +s.value));
      [...p.querySelectorAll('.trigRange')].forEach((r, i) => {
        // Right: below everything, so each stage fires on the first update, with
        // all of its lead time in hand. Wrong: above the stream, never fires.
        set(r, right ? String(g.trigger.scale.min) : String(g.trigger.scale.max));
      });
      click(p.querySelector('#trigRelease'));
      click(p.querySelector('#trigCommit'));
    },
    VALUE: (p, g, right) => {
      g.value.options.forEach((o, i) => {
        if(right ? o.decisive : !o.decisive) click(p.querySelector('[data-buy="' + i + '"]'));
      });
      click(p.querySelector('#valCommit'));
    },
    CLOUD: (p, g, right) => {
      g.cloud.actions.forEach((a, i) => {
        if(right || a.effect === 'shift') click(p.querySelector('[data-act="' + i + '"]'));
      });
      click(p.querySelector('#cloudCommit'));
    },
    ALLOCATE: (p, g, right) => {
      const needed = new Set(g.allocate.answers.filter(q => q.required)
        .flatMap(q => q.requires.map(String)));
      // Wrong: buy coverage and skip whatever the required answer needs, which
      // is the plan that comes back reassuring and cannot be defended.
      g.allocate.items.forEach((it, i) => {
        if(it.protected) return;
        const box = p.querySelector('[data-pick="' + i + '"]');
        const wanted = needed.has(String(it.id));
        if(right ? wanted : !wanted) tick(box, true);
      });
      click(p.querySelector('#allocCommit'));
    },
    TRACE: (p, g, right) => {
      g.trace.channels.forEach((c, i) => click(p.querySelector('[data-open="' + i + '"]')));
      const keep = new Set(g.trace.independent.map(String));
      g.trace.channels.forEach((c, i) => {
        if(right && keep.has(String(c.id))) tick(p.querySelector('[data-keep="' + i + '"]'), true);
      });
      const ix = g.trace.resources.findIndex(r => String(r.id) === String(g.trace.target));
      click(p.querySelector('[data-res="' + (right ? ix : (ix + 1) % g.trace.resources.length) + '"]'));
      click(p.querySelector('#traceCommit'));
    },
    ATTEST: (p, g, right) => {
      g.attest.claims.forEach((c, i) => {
        if(!(c.critical && !c.backed)) return;
        click(p.querySelector('[data-check="' + i + '"]'));
        if(right) click(p.querySelector('[data-hold="' + i + '"]'));
      });
      click(p.querySelector('#attCommit'));
    },
    CONTROL: (p, g, right) => {
      const truth = g.control.variables.findIndex(v => String(v.id) === String(g.control.truth));
      const other = (truth + 1) % g.control.variables.length;
      const box = (i) => p.querySelector('[data-set="' + i + '"]');
      // Secure the suspect alone, measure, restore it, measure — the reversal the
      // commit button will not enable without.
      tick(box(truth), true);  click(p.querySelector('#ctrlRun'));
      tick(box(truth), false); click(p.querySelector('#ctrlRun'));
      click(p.querySelectorAll('.ctrlName')[right ? truth : other]);
      click(p.querySelector('#ctrlCommit'));
    },
    TRIANGULATE: (p, g, right) => {
      g.triangulate.stations.forEach((s, i) => tick(p.querySelector('[data-on="' + i + '"]'), true));
      const fix = p.querySelector('#triFix');
      if(fix && right) tick(fix, true);
      // Click the map at the truth. The panel maps client pixels back to world
      // units itself, so the event has to carry a real rect position.
      const map = p.querySelector('.triMap');
      const r = map.getBoundingClientRect();
      const t = g.triangulate;
      const xs = t.stations.map(s => +s.x).concat([+t.truth.x]);
      const ys = t.stations.map(s => +s.y).concat([+t.truth.y]);
      const rmax = Math.max(...t.stations.map(s => +s.distance));
      const lo = { x: Math.min(...xs) - rmax * 0.25, y: Math.min(...ys) - rmax * 0.25 };
      const hi = { x: Math.max(...xs) + rmax * 0.25, y: Math.max(...ys) + rmax * 0.25 };
      const span = Math.max(hi.x - lo.x, hi.y - lo.y) || 1;
      const want = right ? t.truth : { x: +t.truth.x + +t.tolerance * 6, y: +t.truth.y };
      const px = 20 + ((want.x - lo.x) / span) * 280;
      const py = 200 - ((want.y - lo.y) / span) * 180;
      map.dispatchEvent(new MouseEvent('click', { bubbles: true,
        clientX: r.left + (px / 320) * r.width, clientY: r.top + (py / 220) * r.height }));
      click(p.querySelector('#triCommit'));
    },
    DEGENERACY: (p, g, right) => {
      const [a, b] = [p.querySelector('[data-ctl="0"]'), p.querySelector('[data-ctl="1"]')];
      if(right){
        click(p.querySelector('#degApply'));
        set(a, String(g.degeneracy.truth.a)); set(b, String(g.degeneracy.truth.b));
      } else {
        const off = g.degeneracy.locus[0];
        set(a, String(off.a)); set(b, String(off.b));
      }
      click(p.querySelector('#degCommit'));
    },
    CHAIN: (p, g, right) => {
      const ids = right ? g.chain.order : [...g.chain.order].reverse();
      for(const id of ids){
        const i = g.chain.links.findIndex(l => String(l.id) === String(id));
        click(p.querySelector('[data-add="' + i + '"]'));
      }
      // Only a link that was actually placed can be named, so a decoy sitting in
      // the bank and not in the path is not a selectable wrong answer — the
      // wrong pick has to be a link on the rail.
      const inPath = (id) => g.chain.order.map(String).includes(String(id));
      const govId = right ? g.chain.governing
        : (inPath(g.chain.distractor) ? g.chain.distractor
           : g.chain.order.find(id => String(id) !== String(g.chain.governing)));
      const gi = g.chain.links.findIndex(l => String(l.id) === String(govId));
      click(p.querySelector('[data-gov="' + gi + '"]'));
      click(p.querySelector('#chainCommit'));
    },
    DERIVE: (p, g, right) => {
      // Right: the keyed line and the rule that licenses it, every step. Wrong:
      // the branch the author marked as surviving — the one that stays
      // algebraically respectable, which is the failure the format is about.
      for(const st of g.derive.steps){
        const key = +st.answer;
        const wrongIdx = st.candidates.findIndex((c, i) => i !== key && c.survives);
        const pick = right ? key : (wrongIdx >= 0 ? wrongIdx : (key === 0 ? 1 : 0));
        click(p.querySelector('[data-cand="' + pick + '"]'));
        const rule = st.candidates[pick]?.rule ?? g.derive.rules[0];
        click(p.querySelector('[data-rule="' + rule + '"]'));
        click(p.querySelector('#deriveTake'));
      }
      click(p.querySelector('#deriveTake'));
    },
    BALANCE: (p, g, right) => {
      g.balance.streams.forEach((s, i) => {
        if(!right && s.hidden) return;
        click(p.querySelector('[data-read="' + i + '"]'));
        tick(p.querySelector('[data-count="' + i + '"]'), true);
      });
      click(p.querySelector('#balCommit'));
    },
    PROPAGATE: (p, g, right) => {
      // Right: buy the dominant term. Wrong: buy the largest exponent, which is
      // the shortcut the format exists to break.
      const want = right ? String(g.propagate.dominant)
        : String(g.propagate.inputs.reduce((a, x) =>
            (Math.abs(+x.exponent) > Math.abs(+a.exponent) ? x : a)).id);
      const i = g.propagate.improvable.findIndex(m => String(m.id) === want);
      if(i >= 0) click(p.querySelector('[data-buy="' + i + '"]'));
      click(p.querySelector('#propCommit'));
    },
    STRESS: (p, g, right) => {
      const a = g.stress.assumption;
      const range = p.querySelector('.stressRange');
      // Wrong: choose at the nominal without ever moving the slider.
      if(right) set(range, String(a.min));
      const want = right ? String(g.stress.robust)
        : g.stress.candidates.map(c => String(c.id))
            .reduce((x, y) => (+g.stress.scores[y][g.stress.optimiseOn]
              < +g.stress.scores[x][g.stress.optimiseOn] ? y : x));
      const i = g.stress.candidates.findIndex(c => String(c.id) === want);
      click(p.querySelector('[data-pick="' + i + '"]'));
      click(p.querySelector('#stressCommit'));
    },
    DELEGATE: (p, g, right) => {
      const probs = g.delegate.problems;
      const truth = probs.findIndex(x => String(x.id) === String(g.delegate.first));
      // Wrong: take the loud one, which is the whole mistake.
      const loud = probs.findIndex(x => x.loud);
      const first = right ? truth : (loud >= 0 ? loud : (truth + 1) % probs.length);
      click(p.querySelector('[data-first="' + first + '"]'));
      probs.forEach((x, i) => {
        if(i === first) return;
        set(p.querySelector('[data-owner="' + i + '"]'), g.delegate.team[i % g.delegate.team.length].id);
        set(p.querySelector('[data-action="' + i + '"]'), g.delegate.firstActions[0].id);
        set(p.querySelector('[data-threshold="' + i + '"]'), 'it crosses the mark');
      });
      click(p.querySelector('#delCommit'));
    },
    FLY: (p, g, right) => {
      const f = g.fly;
      const burn = p.querySelector('[data-ctl="burn"]');
      const brake = p.querySelector('[data-ctl="brake"]');
      // The plan that lands on target: brake early by exactly the distance the
      // pulse carries it. Wrong: brake at the target itself.
      let best = null;
      for(let t = +f.pulse.min; t <= +f.pulse.max + 1e-9; t += +f.pulse.step){
        if(2 * t > +f.budget) continue;
        for(let at = +f.brake.min; at <= +f.brake.max + 1e-9; at += +f.brake.step){
          const end = at + (+f.accel * t * t) / 2;
          const miss = Math.abs(end - +f.target);
          if(!best || miss < best.miss) best = { t, at, miss };
        }
      }
      set(burn, String(right ? best.t : +f.pulse.min));
      set(brake, String(right ? best.at : +f.target));
      click(p.querySelector('#flyRun'));
      click(p.querySelector('#flyCommit'));
    },
    RESIDUAL: (p, g, right) => {
      // Wrong: take the lowest RMS without looking at the field.
      const want = right ? String(g.residual.accept)
        : String(g.residual.fits.reduce((a, f) => (+f.rms < +a.rms ? f : a)).id);
      const i = g.residual.fits.findIndex(f => String(f.id) === want);
      click(p.querySelector('[data-fit="' + i + '"]'));
      click(p.querySelector('#resCommit'));
    },
    INJECT: (p, g, right) => {
      g.inject.configs.forEach((c, i) => click(p.querySelector('[data-run="' + i + '"]')));
      // Wrong: fund the one with the most detections.
      const want = right ? String(g.inject.best)
        : String(g.inject.configs.reduce((a, c) => (+c.detections > +a.detections ? c : a)).id);
      const i = g.inject.configs.findIndex(c => String(c.id) === want);
      click(p.querySelector('[data-pick="' + i + '"]'));
      click(p.querySelector('#injCommit'));
    },
    ROUTE: (p, g, right) => {
      click(p.querySelector('#routeGo'));
      const stops = g.route.stops;
      const ids = right ? g.route.order : [...g.route.order].reverse();
      for(const id of ids){
        const i = stops.findIndex(x => String(x.id) === String(id));
        const b = p.querySelector('[data-add="' + i + '"]');
        if(b) b.click();          // the bank re-renders each time, so re-query
      }
      // Where the detour put them. Wrong: name the compartment they had reached.
      const want = right ? String(g.route.resumeAt)
        : String(g.route.order[Math.max(0, +g.route.interruptAfter - 1)]);
      const ni = stops.findIndex(x => String(x.id) === String(want));
      click(p.querySelector('[data-name="' + ni + '"]'));
      click(p.querySelector('#routeCommit'));
    },
    VERIFY: (p, g, right) => {
      set(p.querySelector('.verRange'), String(g.verify.truth));
      click(p.querySelector('#verLock'));
      click(p.querySelector('#verRun'));
      if(right) click(p.querySelector('#verMeasure'));  // wrong path: never measure
      click(p.querySelector('#verCommit'));
    },
  };

  for(const [group, lessons] of Object.entries(CURRICULUM)){
    lessons.forEach((l, li) => {
      const kind = String(l.game?.type ?? '').toUpperCase();
      if(!INSTRUMENTS[kind] || !PLAY[kind]) return;
      const g = l.game;
      const row = { kind, title: l.title ?? '', group, li, errors: [] };
      for(const right of [true, false]){
        const host = document.createElement('div');
        host.className = 'modalBody';
        document.body.append(host);
        let result = null;
        try{
          host.innerHTML = INSTRUMENTS[kind].html(g);
          INSTRUMENTS[kind].bind(host, g, {
            commit(ok, answerText, extra){ result = { ok, answerText, extra }; },
          });
          const panel = host.firstElementChild.parentElement;
          PLAY[kind](host, g, right);
        }catch(e){ row.errors.push((right ? 'right: ' : 'wrong: ') + (e.message ?? String(e))); }
        row[right ? 'onRight' : 'onWrong'] = result ? { ok: result.ok, answer: result.answerText } : null;
        // The verdict has to render from whatever the play recorded, or a wrong
        // answer shows the player an empty box.
        try{
          const v = INSTRUMENTS[kind].verdict(g, result?.extra ?? {});
          row[right ? 'verdictRight' : 'verdictWrong'] = (v ?? '').length;
        }catch(e){ row.errors.push('verdict(' + (right ? 'right' : 'wrong') + '): ' + e.message); }
        host.remove();
      }
      // Any panel wider than the box it sits in. A control pushed past the card
      // edge is invisible and unclickable, and no assertion above can see it.
      {
        const probe2 = document.createElement('div');
        probe2.className = 'modalBody';
        probe2.style.width = '776px';
        document.body.append(probe2);
        probe2.innerHTML = INSTRUMENTS[kind].html(g);
        const host2 = probe2.firstElementChild?.parentElement ?? probe2;
        const box = probe2.querySelector('.instPanel');
        if(box){
          const w = box.clientWidth;
          const over = [...box.querySelectorAll('*')]
            .filter(el => el.scrollWidth > el.clientWidth + 2 || el.offsetWidth > w + 2)
            .map(el => (el.className || el.tagName) + ' ' + el.offsetWidth + 'px in ' + w + 'px');
          if(over.length) row.overflow = [...new Set(over)].slice(0, 4);
        }
        probe2.remove();
      }
      // Did the panel print its own question? A format that leaves it to the
      // caller is a format the game shows a slider and no criterion for.
      const probe = document.createElement('div');
      probe.innerHTML = INSTRUMENTS[kind].html(g);
      row.printsQuestion = !g.question
        || probe.textContent.includes(String(g.question).trim().slice(0, 36));
      out.push(row);
    });
  }
  return out;
})()`;

// ----------------------------------------------------------------------- run
const profile = resolve(tmpdir(), `gamekit-drive-${process.pid}`);
let vite = null, chrome = null, cdp = null;
const stop = () => {
  cdp?.close(); chrome?.kill('SIGKILL'); vite?.kill('SIGKILL');
  try{ rmSync(profile, { recursive: true, force: true }); }catch{}
};
process.on('exit', stop);
process.on('SIGINT', () => { stop(); process.exit(130); });

const PORT = await freePort();
const DEBUG = await freePort();
let bad = 0;

try{
  vite = spawn(resolve(gamekit, 'node_modules/.bin/vite'),
    ['--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: gamekit, env: { ...process.env, THEME: theme }, stdio: ['ignore', 'ignore', 'inherit'] });
  await until(`http://127.0.0.1:${PORT}/`, 'the dev server');

  chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG}`,
    `--user-data-dir=${profile}`, '--window-size=1200,900',
    '--no-first-run', '--no-default-browser-check', '--mute-audio', '--hide-scrollbars',
    'about:blank'], { stdio: ['ignore', 'ignore', 'ignore'] });

  const target = await (async () => {
    for(let i = 0; i < 100; i++){
      const list = await until(`http://127.0.0.1:${DEBUG}/json`, 'Chrome').catch(() => null);
      const page = (list ?? []).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if(page) return page;
      await wait(200);
    }
    throw new Error('Chrome came up but never opened a page');
  })();

  cdp = await CDP.connect(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  // Console errors are collected too. A panel that throws on a listener still
  // renders, and the throw is the only sign.
  const console_ = [];
  cdp.ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if(m.method === 'Runtime.exceptionThrown'){
      console_.push(m.params.exceptionDetails?.exception?.description ?? 'exception');
    }
  });
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/engine/dev/instruments.html` });
  await wait(2500);

  const rows = await cdp.eval(DRIVER);
  console.log(`\ninstrumentDrive: ${theme} — ${rows.length} live panel(s)\n`);
  for(const r of rows){
    const notes = [];
    if(r.errors.length) notes.push(...r.errors);
    if(!r.onRight) notes.push('the right answer never reached commit');
    else if(!r.onRight.ok) notes.push('the right answer was graded wrong');
    if(!r.onWrong) notes.push('the wrong answer never reached commit');
    else if(r.onWrong.ok) notes.push('the wrong answer was graded RIGHT — the format cannot tell them apart');
    if(!r.printsQuestion) notes.push('the panel does not print its own question');
    if(!r.verdictWrong) notes.push('a wrong answer draws no verdict figure');
    for(const o of r.overflow ?? []) notes.push(`overflows its panel: ${o}`);
    const ok = notes.length === 0;
    if(!ok) bad++;
    console.log(`  ${ok ? '✓' : '✗'} ${r.kind.padEnd(12)} ${r.title}`);
    if(r.onRight) console.log(`      right → ${r.onRight.ok ? 'correct' : 'INCORRECT'}: ${r.onRight.answer}`);
    if(r.onWrong) console.log(`      wrong → ${r.onWrong.ok ? 'CORRECT' : 'incorrect'}: ${r.onWrong.answer}`);
    for(const n of notes) console.log(`      ✗ ${n}`);
  }
  // The picture. Everything above says the panels work; only this says they can
  // be read — a sweep once shipped with its slider and all three readouts below
  // the fold, which looks exactly like a broken format.
  try{
    const metrics = await cdp.send('Page.getLayoutMetrics');
    const { width, height } = metrics.cssContentSize ?? metrics.contentSize;
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: Math.ceil(width), height: Math.min(Math.ceil(height), 30000),
        deviceScaleFactor: 1, mobile: false });
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const out = resolve(gamekit, 'shots', theme, 'instruments.png');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(shot.data, 'base64'));
    console.log(`\n  picture: ${out} (${Math.ceil(width)}x${Math.ceil(height)})`);
  }catch(e){ console.log('\n  (no screenshot: ' + e.message + ')'); }

  if(console_.length){
    console.log(`\n  ${console_.length} uncaught page exception(s):`);
    for(const e of console_.slice(0, 6)) console.log('    · ' + String(e).split('\n')[0]);
    bad += console_.length;
  }
  console.log(`\n${rows.length - bad > 0 ? rows.length - bad : 0}/${rows.length} panels drive correctly.`);
} finally { stop(); }
process.exit(bad ? 1 : 0);
