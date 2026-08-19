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
// The TRIGGER play is computed with the panel's own grader rather than a second
// copy of the rule. The first version of this file hardcoded "slide it to the
// bottom, that fires with every hour in hand" as the RIGHT answer — which was
// true under the old grade and was exactly the bug that made the format free.
// A driver that describes the rule itself will describe the next bug too.
import { INSTRUMENTS } from '../core/instruments.js';

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
  // BELT shuffles its bank from a seed, and the driver has to know the running
  // order to play the right answer. Same function, not a copy of it.
  const { shuffleSeeded } = await import('/engine/core/utils.js');
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
  /**
   * One frame — or 200 ms, whichever comes first.
   *
   * A format that runs on its own clock advances on requestAnimationFrame, and a
   * headless page that has been sitting behind twenty other mounted panels stops
   * being given frames. A bare await on a requestAnimationFrame promise
   * then never resolves, the page-side promise never settles, and the whole
   * driver hangs at 0% CPU with nothing printed. Racing it against a timer turns
   * that into a format that reports "never reached commit", which is a result.
   */
  const frame = () => Promise.race([
    new Promise(r => requestAnimationFrame(r)),
    new Promise(r => setTimeout(r, 200)),
  ]);
  const tick = (el, on = true) => {
    if(!el || el.disabled || el.checked === on) return;   // a player cannot tick a disabled box
    el.checked = on; set(el, el.value);
  };

  /**
   * A format whose panel runs for authored seconds, rescaled so the driver does
   * not have to sit through it.
   *
   * HOLD's physics is rate × time, so dividing every time by k and multiplying
   * every rate by k traces exactly the same curve through exactly the same band
   * — the corridor closes on t/duration, which is unchanged. A 45-second run is
   * driven in three. This is a rescaling, not a stub: the real html, the real
   * bind and the real grading all run.
   */
  const K = 15;
  const PREP = {
    // SPOT's clock is not physics, it is structure: the same number of switches
    // over the same items, four times faster. Everything with a unit of seconds
    // is divided by the same number, so the run keeps its shape — which matters,
    // because the shape is the thing being graded.
    SPOT: (g) => { const k = 4; return { ...g, spot: { ...g.spot,
      duration: +g.spot.duration / k,
      switchEvery: +g.spot.switchEvery / k,
      spawnEvery: (+g.spot.spawnEvery || 0.9) / k,
      life: (+g.spot.life || 1.9) / k,
      window: (+g.spot.window || 4) / k,
    } }; },
    HOLD: (g) => ({ ...g, hold: { ...g.hold,
      duration: +g.hold.duration / K,
      authority: +g.hold.authority * K,
      noise: (+g.hold.noise || 0.02) * Math.sqrt(K),
      disturbances: g.hold.disturbances.map(e => ({ ...e, at: +e.at / K, amount: +e.amount * K })),
    } }),
  };

  // How to answer each format right, and how to answer it wrong. The wrong path
  // is always the plausible mistake the format was built to catch.
  const PLAY = {
    TRIGGER: (p, g, right) => {
      const t = g.trigger, sc = t.scale;
      const grade = INSTRUMENTS.TRIGGER.grade.bind(INSTRUMENTS.TRIGGER);
      // Both plays are searched with the panel's own grader. The wrong one used to
      // be "the last value in the stream", on the assumption that the readings end
      // at their extreme — Headwater's rise falls back on the final update, so that
      // threshold fired inside the window and the driver played a RIGHT answer while
      // calling it wrong. A rule stated about the data is a rule that breaks on the
      // next campaign shaped differently.
      //
      // Preference among the wrong plays is deliberate: a rule that fires too late
      // is the mistake these stops are written against, a rule that fires too early
      // is the second, and a rule that never fires at all is the least interesting.
      [...p.querySelectorAll('.trigRange')].forEach((r, i) => {
        const c = t.conditions[i];
        let ok = null, late = null, soon = null, never = null;
        for(let v = +sc.min; v <= +sc.max + 1e-9; v += sc.step){
          const at = +v.toFixed(6);
          const g2 = grade(t, c, at);
          if(g2.ok){ if(ok === null) ok = at; continue; }
          if(!g2.fired){ if(never === null) never = at; }
          else if(!g2.inTime){ if(late === null) late = at; }
          else if(soon === null) soon = at;
        }
        const pick = right ? ok : (late ?? soon ?? never);
        set(r, String(pick ?? (right ? sc.min : sc.max)));
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
      const c = g.cloud;
      const lo = +c.bounds.min, hi = +c.bounds.max;
      // The panel's own arithmetic, followed rather than copied from the book: the
      // report is graded against the cloud the actions leave behind, so the driver
      // has to know where that cloud ended up.
      let centre = +c.centre, spread = +c.spread;
      c.actions.forEach((a, i) => {
        if(!(right || a.effect === 'shift')) return;
        click(p.querySelector('[data-act="' + i + '"]'));
        if(a.effect === 'narrow') spread *= +a.amount;
        else centre += ((lo + hi) / 2 - centre) * Math.min(1, Math.max(0, +a.amount));
      });
      // Wrong: the middle where it was aimed and a band a third of its real width —
      // a confident report of a measurement nobody took, which is the mistake this
      // format is about.
      set(p.querySelector('#cloudMu'), String(right ? centre : (lo + hi) / 2));
      set(p.querySelector('#cloudSig'), String(right ? spread : spread / 3));
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
      // Secure the machine about to be named, measure, restore it, measure — the
      // reversal the commit button will not enable without. It has to be the
      // NAMED one on both paths: the gate is about the experiment the player ran
      // on their own candidate, not about the culprit, or a disabled button
      // would announce which machine is the answer.
      const pick = right ? truth : other;
      tick(box(pick), true);  click(p.querySelector('#ctrlRun'));
      tick(box(pick), false); click(p.querySelector('#ctrlRun'));
      click(p.querySelectorAll('.ctrlName')[pick]);
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
      // Take-back, driven on the right-answer run: place the LAST link first,
      // drop it off the rail, then build the real path. If the take-back does not remove
      // it the path is one link long-and-wrong and this run grades incorrect,
      // which is the only way anything watches that button work.
      if(right && ids.length > 1){
        const stray = g.chain.links.findIndex(l => String(l.id) === String(ids[ids.length - 1]));
        click(p.querySelector('[data-add="' + stray + '"]'));
        click(p.querySelector('[data-drop="0"]'));
      }
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
      // Fly a deliberately bad plan first, then the real one, because the panel
      // is a plan-then-run and the whole of what it teaches is the second run.
      // It shipped disabling its own Run button and both sliders after one
      // click, so the player found out what they were aiming at and then could
      // not aim at it. Driving one run would never see that.
      set(burn, String(+f.pulse.min));
      set(brake, String(+f.target));
      click(p.querySelector('#flyRun'));
      const afterFirst = p.querySelector('.flyEnd').textContent;
      set(burn, String(right ? best.t : +f.pulse.min));
      set(brake, String(right ? best.at : +f.target));
      click(p.querySelector('#flyRun'));
      if(right && p.querySelector('.flyEnd').textContent === afterFirst){
        throw new Error('the second run changed nothing — FLY is one-shot again');
      }
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
    // The one format that cannot be played by a synchronous function: the belt
    // only advances on a frame, and a tile is only resolvable while it is on
    // screen. So this waits for frames and presses a real key each time, which
    // is also the only way to find out whether the key listener is attached to
    // anything, which is the whole reason this file exists.
    BELT: async (p, g, right) => {
      click(p.querySelector('#beltStart'));
      const key = (code) => window.dispatchEvent(
        new KeyboardEvent('keydown', { code, bubbles: true }));
      // Enough passes to resolve the whole run, plus slack: an item that has
      // just been sorted is replaced on the same frame, but the very first one
      // needs a frame to exist at all.
      const need = +(g.belt.need ?? 20);
      for(let n = 0; n < need * 3 + 8; n++){
        await frame();
        // Which bin this tile wants is read off the model the panel is playing,
        // not off the screen — the screen deliberately does not say.
        const shown = p.querySelector('.beltCanvas');
        if(!shown) break;
        // The panel keeps no DOM record of the item in play, so the count strip
        // is the only honest handle on progress. Press on every frame: a press
        // with no tile under it is discarded by the panel, which is the
        // behaviour a player leaning on the key gets too.
        // The bank is shuffled from a seed derived from the stop, so that a
        // retry meets the same line. The seed formula is duplicated here on
        // purpose — the panel must not publish the running order, because
        // publishing it would put the answer in the DOM, which is rule 1. If
        // the two ever drift apart this reports a failed right-hand run, which
        // is the loudest way for a duplicated constant to announce itself.
        const items = shuffleSeeded(g.belt.items.slice(),
          String(g.id ?? g.question ?? 'belt').length * 31 + need);
        const done = +(p.querySelector('#beltCount')?.textContent ?? '0').split('/')[0];
        const item = items[done % items.length];
        const wantUp = item.bin === 'left';
        key(right ? (wantUp ? 'ArrowUp' : 'ArrowDown') : (wantUp ? 'ArrowDown' : 'ArrowUp'));
        window.dispatchEvent(new KeyboardEvent('keyup',
          { code: wantUp ? 'ArrowUp' : 'ArrowDown', bubbles: true }));
        window.dispatchEvent(new KeyboardEvent('keyup',
          { code: wantUp ? 'ArrowDown' : 'ArrowUp', bubbles: true }));
        if(p.querySelector('#beltStart')?.textContent === 'Line stopped') break;
      }
    },
    // LOB is two sliders and a button, so the driver can solve it the way the
    // importer does — search the settings for one that lands inside the mark.
    // Wrong: fire every shot at the same setting, which is what a player who has
    // not noticed that range peaks near forty-five does.
    LOB: async (p, g, right) => {
      const lob = g.lob;
      const land = (deg, power) => {
        const th = deg * Math.PI / 180;
        const v = power * lob.maxSpeed;
        let x = 0, y = +lob.height || 1.5, vx = v * Math.cos(th), vy = v * Math.sin(th);
        for(let n = 0; n < 4000 && y >= 0; n++){
          vx += (+lob.wind || 0) * 0.01; vy -= lob.gravity * 0.01;
          x += vx * 0.01; y += vy * 0.01;
        }
        return x;
      };
      const angle = p.querySelector('.lobAngle');
      const power = p.querySelector('.lobPower');
      for(let n = 0; n < lob.targets.length * lob.shots + 4; n++){
        if(p.querySelector('#lobFire')?.textContent === 'Done') break;
        const shown = p.querySelector('.lobShot')?.textContent ?? '';
        const mark = lob.targets.find(m => shown.startsWith(m.label)) ?? lob.targets[0];
        let best = { a: 45, p: 0.5, off: Infinity };
        for(let a = 10; a <= 80; a += 1){
          for(let q = 0.2; q <= 1.0001; q += 0.01){
            const off = Math.abs(land(a, q) - +mark.distance);
            if(off < best.off) best = { a, p: q, off };
          }
        }
        set(angle, right ? String(best.a) : '20');
        set(power, right ? best.p.toFixed(2) : '0.35');
        click(p.querySelector('#lobFire'));
        // The shot has to finish flying before the next one is allowed. The
        // panel disables the button for exactly that interval, so waiting for
        // it to come back is waiting for the shot to land.
        await frame();
        for(let f = 0; f < 600; f++){
          await frame();
          const btn2 = p.querySelector('#lobFire');
          if(!btn2 || (!btn2.disabled && btn2.textContent !== 'Done')) break;
          if(btn2.textContent === 'Done') break;
        }
      }
      // The flight of the last shot still has to land for the run to commit.
      for(let f = 0; f < 400; f++){
        await frame();
        if(p.querySelector('#lobFire')?.textContent === 'Done') break;
      }
    },
    // STACK's options are real DOM buttons, so the driver reads them and clicks.
    // It answers immediately and never moves a piece: the run ends on the
    // question count long before the well fills, which is what makes a format
    // with a falling block drivable at all. Right: the keyed option. Wrong: the
    // first option that is not it.
    STACK: async (p, g, right) => {
      const qs = g.stack.questions;
      const runLen = +g.stack.need;
      click(p.querySelector('#stackStart'));
      for(let n = 0; n < runLen * 40 + 40; n++){
        await frame();
        if(p.querySelector('#stackStart')?.textContent === 'Run over') break;
        const asked = p.querySelector('.stackQ')?.textContent ?? '';
        const q = qs.find(x => x.q === asked);
        const opts = [...p.querySelectorAll('.stackOpt')];
        if(!q || opts.length !== 4) continue;
        // The panel shuffles the options, so the driver matches on TEXT rather
        // than on index — which is also the only honest way to test that the
        // shuffle did not break the key.
        const keyText = q.a[+q.correct];
        const wantKey = right;
        const pick = opts.find(el => (el.querySelector('span')?.textContent === keyText) === wantKey);
        if(pick) pick.click();
      }
    },
    // SPOT's board is real DOM, so the driver clicks the same buttons a player
    // does. Right: read the instruction off the board every pass and take only
    // what it wants — which is the whole skill, since the instruction is
    // replaced mid-run. Wrong: keep applying the FIRST instruction after it has
    // been withdrawn, which is the mistake the format exists to measure rather
    // than some other kind of failure.
    SPOT: async (p, g, right) => {
      const s2 = g.spot;
      const byId = Object.fromEntries(s2.targets.map(t => [String(t.id), t]));
      const wants = (rule, item) => rule.want.some(x => item.tags.includes(x));
      click(p.querySelector('#spotStart'));
      const started = performance.now();
      // Generous: a page that has stopped being given frames advances the panel
      // at a fraction of real time, and a run that has not finished reports as
      // "never reached commit" — which is true but says nothing about the
      // format. Three times the run, plus a margin.
      const budget = (+s2.duration * 3 + 10) * 1000;
      while(performance.now() - started < budget){
        await frame();
        if(p.querySelector('#spotStart')?.textContent === 'Board closed') break;
        const said = p.querySelector('.spotRule')?.textContent ?? '';
        const live = s2.rules.find(r => r.say === said) ?? s2.rules[0];
        const rule = right ? live : s2.rules[0];
        for(const el of [...p.querySelectorAll('.spotTarget')]){
          const item = byId[el.dataset.id];
          if(item && wants(rule, item)) el.click();
        }
      }
    },
    // HOLD runs on frames like the belt, so it is awaited too. Right: answer
    // each step by counter-deflecting the control the way the board's own
    // direction field says. Wrong: leave it alone, which is the mistake the trap
    // exists to make expensive.
    // (No backticks anywhere in this object: the whole driver is one String.raw
    // template, so a backtick in a comment ends it and the file stops parsing.)
    HOLD: async (p, g, right) => {
      const h = g.hold;
      const sign = h.direction === 'lower' ? -1 : 1;
      const range = p.querySelector('.holdRange');
      click(p.querySelector('#holdStart'));
      // The disturbances are steps in the rate and the driver knows the
      // schedule, so it can hold the sum at zero — which is what a player who
      // has understood the format does by watching the needle.
      // Bounded by WALL TIME, not by a frame count. The panel advances on real
      // seconds, and headless Chrome runs rAF at whatever rate it likes — 123
      // fps here — so a budget of 4200 frames bought 34 seconds of a 45-second
      // run and the format never reached commit. A frame count is not a clock.
      const started = performance.now();
      const budget = (+h.duration + 12) * 1000;
      while(performance.now() - started < budget){
        await frame();
        if(p.querySelector('#holdStart')?.textContent === 'Run over') break;
        if(!right) continue;
        const t = (performance.now() - started) / 1000;
        const rate = h.disturbances.filter(e => +e.at <= t)
          .reduce((a, e) => a + +e.amount, 0);
        // Cancel the rate, and lean a little against whatever error has built up.
        const want = -rate / h.authority * sign;
        set(range, String(Math.max(-1, Math.min(1, want))));
      }
    },
    // The world-graded five. Each hands the stub the run it wants graded — right
    // is the goal met, wrong is the same run one short of it, which is the
    // mistake each format exists to catch rather than an empty result.
    GREET: (p, g, right) => {
      const ids = (g.greet.roster ?? []).map(x => x.id);
      window.__worldRun = { met: ids.slice(0, +g.greet.target - (right ? 0 : 1)),
        seconds: 41, out: !right, abandoned: false };
      click(p.querySelector('#greetGo'));
      click(p.querySelector('#greetCommit'));
    },
    FOLLOW: (p, g, right) => {
      window.__worldRun = { inside: right ? 95 : 40, total: 100, arrived: true,
        seconds: 95, abandoned: false };
      click(p.querySelector('#followGo'));
      click(p.querySelector('#followCommit'));
    },
    HUNT: (p, g, right) => {
      window.__worldRun = { got: +g.hunt.target - (right ? 0 : 1), seconds: 52,
        out: !right, abandoned: false };
      click(p.querySelector('#huntGo'));
      click(p.querySelector('#huntCommit'));
    },
    CANVASS: (p, g, right) => {
      const pop = g.canvass.population ?? [];
      window.__worldRun = { asked: pop.slice(0, 9).map((x, i) => ({ id: x.id, said: !!x.says,
        name: 'person ' + i })), seconds: 55, out: false, abandoned: false };
      click(p.querySelector('#canvassGo'));
      const want = right ? !!g.canvass.answer : !g.canvass.answer;
      click(p.querySelector(want ? '#canvassTrue' : '#canvassFalse'));
    },
    EVADE: (p, g, right) => {
      window.__worldRun = { held: right ? +g.evade.seconds : +g.evade.seconds / 2,
        need: +g.evade.seconds, caught: right ? 4 : 22, seconds: 60, abandoned: false };
      click(p.querySelector('#evadeGo'));
      click(p.querySelector('#evadeCommit'));
    },
    TAG: (p, g, right) => {
      window.__worldRun = { caught: !!right, closest: right ? 2.1 : 11.4,
        seconds: 24, abandoned: false };
      click(p.querySelector('#tagGo'));
      click(p.querySelector('#tagCommit'));
    },
    TRIAL: (p, g, right) => {
      // Right: the authored order. Wrong: the same gates, reversed — a route
      // that visits everything and gets the sequence backwards, which is the
      // mistake the format exists to catch.
      window.__trialOrder = right ? g.trial.order.slice() : g.trial.order.slice().reverse();
      click(p.querySelector('#trialGo'));
      click(p.querySelector('#trialCommit'));
    },
  };

  // for/await rather than forEach: a format that runs on its own clock — a belt
  // that moves, a needle that drifts — cannot be played by a synchronous
  // function, because the thing being driven only advances on a frame. A PLAY
  // entry may therefore return a promise, and the ones that do not are awaited
  // harmlessly.
  for(const [group, lessons] of Object.entries(CURRICULUM)){
    for(let li = 0; li < lessons.length; li++){
      const l = lessons[li];
      const kind = String(l.game?.type ?? '').toUpperCase();
      // continue, not return: this was a forEach callback, where returning
      // skipped one lesson. In a for loop the same word would end the sweep at
      // the first non-instrument stop and report whatever it had.
      if(!INSTRUMENTS[kind] || !PLAY[kind]) continue;
      const g = PREP[kind] ? PREP[kind](l.game) : l.game;
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
            onClose(){},
            // TRIAL is graded against the world and there is no world on this
            // page. A stub that hands back whatever order the play asked for
            // drives everything else about it — the suspend, the resume, the
            // re-bind and the grading — which is the part a selector can break.
            // What it cannot test is whether a gate is where the book says it
            // is; that is the importer's geometric trap, not this file's.
            world: { run: (spec, done) => done({
              order: window.__trialOrder ?? [], seconds: 12.3, abandoned: false }),
              // The five that came after TRIAL are stubbed the same way and for
              // the same reason: what a browser driver can test about a world
              // format is the suspend, the resume, the re-bind and the grading.
              // Whether the run itself counts a greeting or measures a distance
              // is worldFormats.js's own selftest, which runs in Node.
              greet: (spec, done) => done(window.__worldRun ?? {}),
              follow: (spec, done) => done(window.__worldRun ?? {}),
              hunt: (spec, done) => done(window.__worldRun ?? {}),
              canvass: (spec, done) => done(window.__worldRun ?? {}),
              evade: (spec, done) => done(window.__worldRun ?? {}),
              tag: (spec, done) => done(window.__worldRun ?? {}),
              abort(){} },
            suspend(){},
            resume(html){ host.innerHTML = html; },
          });
          const panel = host.firstElementChild.parentElement;
          await PLAY[kind](host, g, right);
        }catch(e){ row.errors.push((right ? 'right: ' : 'wrong: ') + (e.message ?? String(e))); }
        // The five world-graded formats whose commit button is dead until the
        // goal is met. There is no wrong answer to drive them to: a run that
        // fell short cannot be handed in at all, which is the whole rule. So the
        // wrong pass asserts the gate instead of asserting a grade — and it has
        // to, because a gate that quietly stopped working would otherwise show
        // up here as a format that simply never commits.
        const gated = !!INSTRUMENTS[kind].successGated;
        if(!right && gated && !result){
          const dead = [...host.querySelectorAll('button.primary')].some(b => b.disabled);
          result = dead ? { gated: true, ok: false, answerText: 'not finished — commit refused' }
            : null;
          if(!dead) row.errors.push('wrong: the run fell short and commit was still live');
        }
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
            // className on an SVG element is an SVGAnimatedString and offsetWidth
            // is undefined there, so an overflowing plot used to report itself as
            // "[object SVGAnimatedString] undefinedpx". No backticks in here: this
            // whole driver is one template literal.

            .map(el => (el.getAttribute('class') || el.tagName) + ' '
              + Math.round(el.offsetWidth ?? el.getBoundingClientRect().width)
              + 'px in ' + w + 'px');
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
    }
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
    const w = Math.ceil(width), h = Math.ceil(height);
    // SLICES, because a screenshot has a maximum height and a page of thirty
    // panels is past it. This used to clamp at 30,000 px and say nothing, so the
    // formats at the bottom of the page were simply not in the picture — and the
    // picture is the only thing here that says a panel can be READ rather than
    // that it works. A truncated contact sheet is the screenshot rule failing in
    // the file written to enforce it.
    const SLICE = 16000;
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: w, height: Math.min(h, 2000), deviceScaleFactor: 1, mobile: false });
    mkdirSync(resolve(gamekit, 'shots', theme), { recursive: true });
    const outs = [];
    for(let off = 0, i = 0; off < h; off += SLICE, i++){
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png',
        captureBeyondViewport: true,
        clip: { x: 0, y: off, width: w, height: Math.min(SLICE, h - off), scale: 1 } });
      const out = resolve(gamekit, 'shots', theme,
        i ? `instruments-${i + 1}.png` : 'instruments.png');
      writeFileSync(out, Buffer.from(shot.data, 'base64'));
      outs.push(out);
    }
    console.log(`\n  picture: ${outs[0]} (${w}x${h}`
      + (outs.length > 1 ? ` in ${outs.length} slices)` : ')'));
  }catch(e){ console.log('\n  (no screenshot: ' + e.message + ')'); }

  if(console_.length){
    console.log(`\n  ${console_.length} uncaught page exception(s):`);
    for(const e of console_.slice(0, 6)) console.log('    · ' + String(e).split('\n')[0]);
    bad += console_.length;
  }
  console.log(`\n${rows.length - bad > 0 ? rows.length - bad : 0}/${rows.length} panels drive correctly.`);
} finally { stop(); }
process.exit(bad ? 1 : 0);
