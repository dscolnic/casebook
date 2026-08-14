// make-book.mjs — a printable book of a game, one question per page.
//
//   node tools/make-book.mjs <theme>            one game
//   node tools/make-book.mjs all                every registered game
//   node tools/make-book.mjs <theme> --no-answers    the student's copy
//   node tools/make-book.mjs <theme> --html          leave the HTML, skip the PDF
//
// Output: books/print/<theme>-book.pdf (and the .html it was rendered from).
//
// ## Why this exists
//
// The games are the campaign; this is the same content as something you can read
// away from a screen, hand to a teacher, or mark up. One question per page, the
// opening on its own page, and the answer and the reasoning with the question
// rather than in a key at the back — a wrong answer teaches nothing on the page
// after it.
//
// ## How the PDF is made
//
// HTML with print CSS, rendered by whatever Chrome is on this machine
// (`--headless --print-to-pdf`). No new dependency, and the typography is a
// browser's rather than a hand-rolled PDF writer's — which matters, because these
// pages are mostly prose and every one of them has a hanging indent or a rule in
// an area's own colour.
//
// ## What goes on a page
//
// One LESSON, not one call: the campaign schedules some lessons twice (a review
// variant, a callback), and printing the same page again teaches nobody anything.
// A repeated lesson says where else it comes up. Every field a format carries is
// rendered — cards, givens, readings, scenarios, proposals — because a book that
// silently drops the instrument panel is a book about a different question.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { themeDir as resolveTheme, themeNames } from '../engine/dev/registry.mjs';
import { SYLLABUS, EQUATIONS, equationCoverage } from './syllabus.js';

const args = process.argv.slice(2);
const wanted = args.filter(a => !a.startsWith('--'));
const noAnswers = args.includes('--no-answers');
const htmlOnly = args.includes('--html');
if(!wanted.length){
  console.error('usage: node tools/make-book.mjs <theme|all> [--no-answers] [--html]');
  process.exit(2);
}

const OUT = resolve('books/print');
mkdirSync(OUT, { recursive: true });

/** Chrome, wherever this machine keeps it. */
const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find(p => existsSync(p));

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Content may carry markup already (the bios are HTML). Keep it, escape the rest. */
const rich = (s) => String(s ?? '').includes('<') ? String(s) : esc(s);
const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
const label = (c) => (typeof c === 'string' ? c : c?.label ?? '');
const list = (items, cls = '') => items.length
  ? `<ul class="${cls}">${items.map(i => `<li>${i}</li>`).join('')}</ul>` : '';

/**
 * The answerable material, per format.
 *
 * Everything here is what the player is given BEFORE answering: cards to order,
 * givens to compute with, readings to interpret, options to choose between. The
 * answer itself is a separate block, so `--no-answers` can drop that and leave a
 * page that is still a whole question.
 */
function materialHTML(ch){
  const k = kindOf(ch);
  const out = [];
  const section = (title, body) => { if(body) out.push(`<div class="mat"><h3>${esc(title)}</h3>${body}</div>`); };

  if(ch.headline) section('On the panel', `<p class="headline">${esc(ch.headline)}</p>`);

  if(k === 'SEQUENCE' && ch.cards){
    // Alphabetical by nothing: the authored order IS the answer for most of these,
    // so the cards are listed as the game shuffles them — labelled, unordered, and
    // lettered so the answer block can refer to them.
    const letters = 'ABCDEFGH';
    section('Cards, in no order',
      list(ch.cards.map((c, i) => `<b>${letters[i]}</b>&nbsp; ${esc(label(c))}`), 'cards'));
  }
  if(ch.sweep){
    // The curve, on paper. The response is authored as sampled points precisely
    // so this can exist: a formula would give the book and the screen two
    // different questions, and a reader working from the printed page has to be
    // able to find the same feature the panel shows.
    const w = ch.sweep;
    const a = w.axis ?? {};
    const all = (w.series ?? [{ response: w.response ?? [] }]);
    const vals = all.flatMap(x => x.response.map(p => p.value)).concat([w.baseline ?? 0]);
    const lo = Math.min(...vals), hi = Math.max(...vals);
    const span = (a.max - a.min) || 1, range = (hi - lo) || 1;
    const px = (x) => (8 + ((x - a.min) / span) * 304).toFixed(1);
    const py = (v) => (96 - ((v - lo) / range) * 84).toFixed(1);
    const ink = ['#1d3f57', '#8a5a1e', '#2f6f4a'];
    const plot = `<svg class="sweepFig" viewBox="0 0 320 110" role="img">`
      + `<rect x="8" y="8" width="304" height="88" fill="#fbfaf6" stroke="#c9ccd2" stroke-width=".5"/>`
      + all.map((x, i) => `<polyline fill="none" stroke="${ink[i % ink.length]}" stroke-width="1.4" points="`
          + [...x.response].sort((m, n) => m.at - n.at).map(pt => `${px(pt.at)},${py(pt.value)}`).join(' ')
          + `"/>`).join('')
      + `<text x="8" y="107" class="axl">${esc(String(a.min))}</text>`
      + `<text x="312" y="107" class="axl" text-anchor="end">${esc(String(a.max))} ${esc(a.unit ?? '')}</text>`
      + `<text x="160" y="107" class="axl" text-anchor="middle">${esc(a.label ?? '')}</text>`
      + `</svg>`;
    const key = all.length > 1
      ? `<p class="sweepKey">${all.map((x, i) =>
          `<span style="color:${ink[i % ink.length]}">■</span> ${esc(x.label ?? '')}`).join(' &nbsp; ')}</p>`
      : '';
    section(`Sweep — ${esc(a.label ?? 'control')}`, plot + key
      + `<p class="mono">Reads ${esc(w.readout?.label ?? 'response')} against ${esc(a.label ?? 'the control')}`
      + `, from ${esc(String(w.start))} ${esc(a.unit ?? '')}.</p>`);
  }
  if(ch.givens) section('Given', list(ch.givens.map(g => esc(g)), 'givens'));
  if(ch.relationship) section('Relationship', `<p class="mono">${esc(ch.relationship)}</p>`);
  if(ch.readings){
    section('Instrument readings', `<table class="readings"><tbody>${ch.readings.map(r => `<tr>`
      + `<td class="zone">${esc(r.zone ?? '')}</td>`
      + `<td>${esc(r.label ?? '')}</td>`
      + `<td class="val ${esc(r.status ?? '')}">${esc(r.value ?? '')}</td>`
      + `<td class="note">${esc(r.note ?? '')}</td></tr>`).join('')}</tbody></table>`);
  }
  if(k === 'PROTOCOL' && ch.scenarios){
    const letters = 'ABCDEFGH';
    // An item may name its columns — "what we want to measure" against "how we
    // measure it" says more than "match each of these" does.
    section(ch.columns?.[0] ?? 'Match each of these', list(ch.scenarios.map((s, i) =>
      `<b>${i + 1}.</b>&nbsp; ${esc(label(s))}`), 'scenarios'));
    section(ch.columns?.[1] ?? '…to one of these', list((ch.choices ?? []).map((c, i) =>
      `<b>${letters[i]}</b>&nbsp; ${esc(label(c))}`), 'choices'));
  } else if(ch.choices && k !== 'SEQUENCE'){
    const letters = 'ABCDEFGH';
    section('Options', list(ch.choices.map((c, i) => {
      const mech = typeof c === 'object' && c?.mechanism ? `<div class="mech">${esc(c.mechanism)}</div>` : '';
      return `<b>${letters[i]}</b>&nbsp; ${esc(label(c))}${mech}`;
    }), 'choices'));
  }
  if(ch.proposals){
    section('Proposals', list(ch.proposals.map(p => typeof p === 'string' ? esc(p)
      : `<b>${esc(p.label ?? p.name ?? '')}</b>${p.detail ? `<div class="mech">${esc(p.detail)}</div>` : ''}`)));
  }
  if(ch.research) section('What the research says', `<p>${rich(ch.research)}</p>`);
  return out.join('');
}

// The height of one page's content box, in CSS pixels: Letter is 11in, the margins
// above take 16mm + 14mm off it, and a browser lays out print at 96 px to the inch.
const PAGE_PX = Math.floor((11 - (16 + 14) / 25.4) * 96);
/** And its width: Letter is 8.5in, less the 15mm side margins. */
const PAGE_W = Math.floor((8.5 - (15 + 15) / 25.4) * 96);

/**
 * Ask the browser which pages overflow, and shrink those until they do not.
 *
 * Estimating from the text did not work — three attempts, from a character count to
 * a line model, and Bring Them Home kept six questions on two pages each, because
 * what a page costs is wrapped lines, block margins, table rows and widow control,
 * and none of that is knowable from outside a layout engine. So the layout engine
 * is asked: Chrome loads the book at exactly the print content width, a script
 * shrinks any section taller than the page, and the sizes it settles on are read
 * back out of the DOM and baked into the file that gets printed.
 *
 * Returns a font-size per question section, in source order, or null if Chrome is
 * not available — in which case the book still prints, with a question or two over.
 */
function measureFit(html, tmpPath){
  if(!CHROME) return null;
  const probe = html.replace('</body>', `<script>
    (() => {
      const PAGE = ${PAGE_PX} - 2;
      // Measure, do not reflow-and-hope. Shrinking the type changes how the text
      // wraps, which changes the height, which is why fitting by font size took
      // three attempts and still left questions on two pages. Here each page is
      // laid out once at full size, its natural height is measured, and the whole
      // laid-out block is scaled by PAGE / height — a transform, so nothing reflows
      // and the result is exact. Two columns are tried as well, because a page of
      // options and rebuttals is list-shaped and columns cost less than shrinking.
      // Not scrollHeight. The fitted block is a flex column whose answer block has an auto
      // top margin; when the content overflows, flexbox pushes it past the box and
      // scrollHeight does not grow to match. Measuring where the children actually
      // ended up does, and the first PDF printed off this file had every long page's
      // answer block sliced off at the bottom edge because of it.
      const heightOf = (fit) => {
        const top = fit.getBoundingClientRect().top;
        let bottom = top + fit.scrollHeight;
        for(const c of fit.children) bottom = Math.max(bottom, c.getBoundingClientRect().bottom);
        return Math.ceil(bottom - top);
      };
      for(const el of document.querySelectorAll('section.page.q, section.page.mission, section.page.syllabus')){
        const fit = el.querySelector('.fit');
        el.classList.remove('twocol');
        const h1 = heightOf(fit);
        el.classList.add('twocol');
        const h2 = heightOf(fit);
        el.classList.remove('twocol');
        const s1 = Math.min(1, PAGE / h1);
        const s2 = Math.min(1, PAGE / h2);
        // Columns only when they actually buy something: a page that fits already
        // reads better in one column, and so does one that only just does not.
        const cols = el.classList.contains('q') && s2 > s1 * 1.06 && s1 < 1 ? 2 : 1;
        el.setAttribute('data-fs', (cols === 2 ? s2 : s1).toFixed(3));
        el.setAttribute('data-cols', String(cols));
      }
    })();
  </script></body>`);
  writeFileSync(tmpPath, probe);
  const res = spawnSync(CHROME, [
    '--headless', '--disable-gpu', '--dump-dom',
    `--window-size=${PAGE_W + 40},${PAGE_PX + 200}`, '--virtual-time-budget=8000',
    pathToFileURL(tmpPath).href,
  ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if(res.status !== 0) return null;
  const fits = [...(res.stdout ?? '').matchAll(
    /<section[^>]*data-fs="(?<fs>[0-9.]+)"[^>]*data-cols="(?<cols>\d)"/g)]
    .map(m => ({ size: Number(m.groups.fs), cols: Number(m.groups.cols) }));
  return fits.length ? fits : null;
}

/** The answer, the reasoning, and what the stop is for. */
function answerHTML(lesson, ch){
  const k = kindOf(ch);
  const rows = [];
  if(k === 'SEQUENCE' && ch.cards && ch.order){
    const letters = 'ABCDEFGH';
    rows.push(['Order', ch.order.map((ix, n) => `${n + 1}. <b>${letters[ix]}</b> ${esc(label(ch.cards[ix]))}`).join('<br>')]);
  } else if(ch.mapping && ch.scenarios){
    const letters = 'ABCDEFGH';
    rows.push(['Matches', ch.mapping.map((j, i) => `${i + 1} → <b>${letters[j]}</b>`).join(' &nbsp;·&nbsp; ')]);
  } else if(ch.correctChoice){
    rows.push(['Answer', esc(ch.correctChoice)]);
  } else if(ch.recommended){
    rows.push(['Recommended', esc(label(ch.recommended))]);
  }
  if(ch.answer && !rows.length) rows.push(['Answer', esc(ch.answer)]);
  else if(ch.answer && k === 'BALLPARK') rows.push(['Working', esc(ch.answer)]);
  if(ch.why) rows.push(['Why', rich(ch.why)]);
  if(ch.rebuttals?.length){
    rows.push(['On the others', `<ul>${ch.rebuttals.map(r => `<li>${esc(r)}</li>`).join('')}</ul>`]);
  }
  if(lesson.takeaway) rows.push(['Takeaway', esc(lesson.takeaway)]);
  if(lesson.assumes?.length){
    rows.push(['Assumes you know', `<ul>${lesson.assumes.map(a => `<li>${esc(a)}</li>`).join('')}</ul>`]);
  }
  if(!rows.length) return '';
  return `<div class="answer"><h3>Answer and reasoning</h3><dl>`
    + rows.map(([k2, v]) => `<dt>${esc(k2)}</dt><dd>${v}</dd>`).join('')
    + `</dl></div>`;
}

/** Build one game's book. */
async function build(themeName){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../engine/content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const GROUPS = content.GROUPS ?? [];
  const dayNoun = theme.dayNoun ?? 'Day';
  const groupOf = (id) => GROUPS.find(g => g.id === id);
  const JARGON = content.JARGON ?? [];
  const site = theme.site ?? {};
  const placeOf = (id) => (site.buildings ?? []).find(b => b.group === id)?.name
                       ?? (site.plan?.rooms ?? []).find(r => r.group === id)?.name ?? '';

  // Campaign order: each mission's own opening, then its questions, each lesson
  // once. `seen` maps group+index to the page already written, so a review variant
  // or a callback adds a line to that page instead of repeating the whole page.
  const sheets = [];
  const pages = [];
  const seen = new Map();
  MISSIONS.forEach((m, mi) => {
    const calls = [];
    const own = [];
    (m.stops ?? []).forEach((st) => {
      const lesson = CURRICULUM[st.group]?.[st.lesson];
      if(!lesson?.game) return;
      calls.push({ group: st.group, lesson: st.lesson, title: lesson.title, task: st.task });
      const key = `${st.group}:${st.lesson}`;
      if(seen.has(key)){ seen.get(key).again.push(mi + 1); return; }
      const page = { kind: 'q', lesson, ch: lesson.game, group: st.group, shift: mi + 1,
                     again: [], task: st.task };
      seen.set(key, page);
      pages.push(page);
      own.push(page);
    });
    // The mission's own opening page: what is happening, what is being decided, and
    // the calls it is made of — the plan card, on paper. A shift whose questions all
    // came up earlier still gets its page: the situation is new even when the
    // questions are revisited.
    sheets.push({ kind: 'm', mission: m, shift: mi + 1, calls });
    sheets.push(...own);
  });

  const accentOf = (id) => groupOf(id)?.color ?? '#5b6068';

  /**
   * Does this text use this concept's phrase?
   *
   * By default a phrase matches at a word START and allows a suffix, so 'catalys'
   * catches catalysis and catalytic. A phrase ending in '!' must match a WHOLE word,
   * which short ambiguous ones need: bare 'ph' otherwise matches "phase" and 'see'
   * matches "seems". Three characters or fewer are whole-word automatically.
   */
  const hitPhrase = (hay, phrase) => {
    const exact = phrase.endsWith('!') || phrase.replace(/!$/, '').trim().length <= 3;
    const w = phrase.replace(/!$/, '').toLowerCase().trim();
    const e = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${e}${exact ? '([^a-z0-9]|$)' : ''}`, 'i').test(hay);
  };

  /**
   * What a shift teaches, read out of its own calls.
   *
   * Nothing here is written by hand or inferred: the takeaways are the teaching
   * claim each lesson makes, `assumes` is the prior knowledge its author declared,
   * and the terms are the theme's own glossary entries whose words actually appear
   * in this shift's text. It is on the page so the intent can be checked against the
   * content — if a shift is supposed to be about spectra and the list says orbits,
   * the shift is wrong, not the list.
   */
  const teachingOf = (calls) => {
    const lessons = calls.map(c => CURRICULUM[c.group]?.[c.lesson]).filter(Boolean);
    const takeaways = [...new Set(lessons.map(l => l.takeaway).filter(Boolean))];
    const assumes = [...new Set(lessons.flatMap(l => l.assumes ?? []))];
    // Which of the course's concepts this shift actually touches, by the same
    // matching the syllabus page uses — so a teacher can see, before the shift,
    // which part of the syllabus it is for.
    const spec = SYLLABUS[themeName];
    const concepts = [];
    if(spec){
      const hay = ' ' + lessons.map(l => {
        const ch = l.game ?? {};
        return [l.title, l.scene, l.story, l.takeaway, ch.question, ch.task, ch.why, ch.headline,
          ch.relationship, ch.answer, ...(ch.cards ?? []).map(label), ...(ch.choices ?? []).map(label),
          ...(ch.scenarios ?? []).map(label), ...(ch.givens ?? []), ...(ch.rebuttals ?? []),
          ...(ch.readings ?? []).flatMap(r => [r.label, r.note, r.value, r.zone]),
          ...(ch.choices ?? []).map(x => (typeof x === 'object' ? x.mechanism : '')),
          ...(l.assumes ?? [])].filter(Boolean).join(' ');
      }).join(' ').toLowerCase().replace(/\s+/g, ' ') + ' ';
      spec.concepts.forEach((con, i) => {
        if(con.k.some(k => hitPhrase(hay, k))) concepts.push({ n: i + 1, c: con.c, m: !!con.m });
      });
    }
    const text = lessons.map(l => [l.scene, l.story, l.game?.why, l.game?.question,
      ...(l.game?.cards ?? []), ...(l.game?.choices ?? []).map(label)].join(' ')).join(' ').toLowerCase();
    // Word boundaries, not `includes`. Project Y's glossary carries aliases like
    // " z " and "a-z", and a substring match on those makes every page in the book
    // about atomic number.
    const terms = JARGON.filter(j => (j.aliases ?? [j.name]).some(a => {
      const w = String(a).toLowerCase().trim();
      if(w.length < 2) return false;
      return new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(text);
    }));
    return { takeaways, assumes, concepts, terms: terms.slice(0, 10) };
  };

  // Where each term was first printed with its definition. A book has no chips to
  // click: a term the reader meets has to be defined on the page, once, and
  // pointed back to after that. The game's own plan card supplies the order —
  // prerequisites before the terms built on them — and the rest of the day's
  // vocabulary follows it.
  const definedOn = new Map();
  // The docx importers wrote 73 of Riverton's definitions as "a course concept
  // used in Mission 3", which is a note to the author. A book that printed it
  // would be handing the reader a to-do list instead of a definition.
  const HOLLOW = /course concept used in|should be defined|in the game, the term/i;
  const hasDef = (j) => j?.def && !HOLLOW.test(j.def);

  /** A mission's opening page. */
  const missionSheet = (sh) => {
    const m = sh.mission;
    // Some books write the same sentence into two of these three fields, and the
    // page then said it twice. Print each distinct one, once, in this order.
    const said = new Set();
    const once = (v) => {
      const k = String(v ?? '').trim();
      if(!k || said.has(k)) return '';
      said.add(k);
      return k;
    };
    const blurb = once(m.stake) || once(m.briefing) || once(m.objective) || '';
    // The objective gets the labelled block below, so it is not spent here: when a
    // book writes the same sentence as briefing and objective, printing it bare and
    // unlabelled loses the one thing the label was for.
    const second = m.briefing && m.briefing !== m.objective ? once(m.briefing) : '';
    return `<section class="page mission">
      <div class="fit"FITSIZE>
        <header>
          <div class="eyebrow">${esc(dayNoun)} ${sh.shift} of ${MISSIONS.length}</div>
          <h2>${esc(m.title ?? '')}</h2>
        </header>
        ${blurb ? `<p class="lede">${rich(blurb)}</p>` : ''}
        ${second ? `<p>${rich(second)}</p>` : ''}
        ${(() => { const o = once(m.objective);
          return o ? `<p class="objective"><span>What you decide</span> ${rich(o)}</p>` : ''; })()}
        ${(() => {
          const t = teachingOf(sh.calls);
          if(!t.takeaways.length && !t.concepts.length) return '';
          return `<div class="teaches">
            <h3>What a student has to come away knowing</h3>
            ${t.takeaways.length ? `<ul>${t.takeaways.map(x => `<li>${rich(x)}</li>`).join('')}</ul>` : ''}
            ${t.concepts.length ? `<p class="terms"><span>Concepts on the syllabus (page 3)</span> ${
              t.concepts.map(x => `${x.n}. ${esc(x.c)}${x.m ? ' ▪' : ''}`).join(' · ')}</p>` : ''}
            ${(() => {
              // The plan card the player reads before the day, in the order the
              // game introduces it: a term never arrives before the term it is
              // defined with.
              const cardNames = new Set();
              const card = (m.primer ?? []).map((line) => {
                const [head, ...rest] = String(line).split(' — ');
                const j = JARGON.find(x => String(x.name).toLowerCase() === String(head).trim().toLowerCase());
                if(!j || !rest.length) return '';
                cardNames.add(j.name);
                if(!definedOn.has(j.name)) definedOn.set(j.name, sh.shift);
                return `<dt>${esc(j.name)}</dt><dd>${rich(rest.join(' — '))}</dd>`;
              }).filter(Boolean).join('');
              // Everything else this day says, defined here the first time and
              // pointed back to afterwards.
              const rest = t.terms.filter(j => !cardNames.has(j.name) && hasDef(j));
              const fresh = rest.filter(j => !definedOn.has(j.name));
              const again = rest.filter(j => definedOn.has(j.name));
              fresh.forEach(j => definedOn.set(j.name, sh.shift));
              const freshHtml = fresh.map(j => `<dt>${esc(j.name)}</dt><dd>${rich(j.def ?? '')}</dd>`).join('');
              // The equations this day is the first to need, printed the same way
              // the plan card shows them on screen — `normalize.js` puts each on
              // its first day, so the paper card and the screen card agree.
              const eqs = (m.equations ?? []).filter(x => x?.e);
              const eqHtml = eqs.length ? `<div class="mEqs">${eqs.map(x =>
                  `<div class="mEq"><div class="mEqHead"><code>${esc(x.e)}</code>`
                  + (x.c ? `<span>${esc(x.c)}</span>` : '') + `</div>`
                  + (Array.isArray(x.v) && x.v.length
                      ? `<p class="mEqV">${x.v.map(([sym, mean]) =>
                          `<span><b>${esc(sym)}</b> ${esc(mean)}</span>`).join(' · ')}</p>` : '')
                  + (x.s ? `<p class="mEqS">${esc(x.s)}</p>` : '')
                  + `</div>`).join('')}</div>` : '';
              // Vocabulary first and the equations under it, the same order the
              // screen card uses.
              return (card ? `<div class="vocab"><h4>Worth knowing first</h4><dl>${card}</dl></div>` : '')
                + (freshHtml ? `<div class="vocab"><h4>Also said on this ${dayNoun.toLowerCase()}</h4><dl>${freshHtml}</dl></div>` : '')
                + (again.length ? `<p class="terms"><span>Already defined</span> ${
                    again.map(j => `${esc(j.name)} (${dayNoun.toLowerCase()} ${definedOn.get(j.name)})`).join(' · ')}</p>` : '')
                + eqHtml;
            })()}
            ${t.assumes.length ? `<p class="terms"><span>Assumed already known</span> ${t.assumes.map(esc).join(' · ')}</p>` : ''}
          </div>`;
        })()}
        <div class="calls">
          <h3>${sh.calls.length} call${sh.calls.length === 1 ? '' : 's'}, in whatever order</h3>
          <ol>${sh.calls.map(c => {
            const place = placeOf(c.group);
            return `<li style="--accent:${esc(accentOf(c.group))}">`
              + `<b>${esc(c.title ?? '')}</b>`
              + `<span class="where">${esc(groupOf(c.group)?.name ?? c.group)}`
              + `${place ? ` · ${esc(place)}` : ''}</span>`
              + `${c.task && c.task.trim() !== String(c.title ?? '').trim()
                    ? `<span class="ct">${rich(c.task)}</span>` : ''}</li>`;
          }).join('')}</ol>
        </div>
        ${m.takeaway ? `<p class="mtakeaway">${rich(m.takeaway)}</p>` : ''}
        <footer>${esc(theme.title)}</footer>
      </div></section>`;
  };

  /**
   * Page three: the concepts of the senior-high course, and which questions
   * in this book teach each one.
   *
   * The concepts are authored (tools/syllabus.js); the mapping is not. Every
   * question's own words — title, scene, the ask, its cards or options, the verdict
   * and the takeaway — are searched for the concept's phrases, on word boundaries.
   * A concept with no questions is printed as a gap, which is the useful half of the
   * exercise: a game is not a course, and this says where it is not one.
   */
  const syllabusSheet = () => {
    const spec = SYLLABUS[themeName];
    if(!spec) return '';
    const haystacks = pages.map((p) => {
      const ch = p.ch;
      const parts = [p.lesson.title, p.lesson.scene, p.lesson.story, p.lesson.takeaway,
        ch.question, p.task, ch.task, ch.why, ch.headline, ch.relationship, ch.answer,
        ...(ch.cards ?? []).map(label), ...(ch.choices ?? []).map(label),
        ...(ch.scenarios ?? []).map(label), ...(ch.proposals ?? []).map(label),
        ...(ch.givens ?? []), ...(ch.rebuttals ?? []),
        ...(ch.readings ?? []).flatMap(r => [r.label, r.note, r.value, r.zone]),
        ...(ch.choices ?? []).map(c => (typeof c === 'object' ? c.mechanism : '')),
        ...(p.lesson.assumes ?? []),
      ];
      return ' ' + parts.filter(Boolean).join(' ').toLowerCase().replace(/\s+/g, ' ') + ' ';
    });
    // Two kinds of phrase. By default a phrase matches at a word START and allows a
    // suffix, so 'catalys' catches catalysis and catalytic. A phrase ending in '!'
    // must match a WHOLE word, which is what short ambiguous ones need: bare 'ph'
    // otherwise matches "phase", "see" matches "seems", and "fix" matches "fixed".
    // Anything three characters or shorter is treated as whole-word automatically.
    const hit = hitPhrase;
    const unusedHit = (hay, phrase) => {
      const exact = phrase.endsWith('!') || phrase.replace(/!$/, '').trim().length <= 3;
      const w = phrase.replace(/!$/, '').toLowerCase().trim();
      const esc2 = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const tail = exact ? '([^a-z0-9]|$)' : '';
      return new RegExp(`(^|[^a-z0-9])${esc2}${tail}`, 'i').test(hay);
    };
    const rows = spec.concepts.map((con, i) => {
      const groups = con.groups ? new Set(con.groups) : null;
      const which = [];
      pages.forEach((p, n) => {
        if(groups && !groups.has(p.group)) return;
        if(con.k.some(phrase => hit(haystacks[n], phrase))) which.push(n + 1);
      });
      return { n: i + 1, c: con.c, m: !!con.m, which };
    });
    const covered = rows.filter(r => r.which.length).length;
    const gaps = rows.filter(r => !r.which.length);
    // And the same audit the other way round. A question that matches nothing on the
    // list teaches none of the course; a question whose every match is a METHOD
    // concept teaches how to measure, order or report, and no mechanism of the
    // subject. Neither is automatically wrong — a course needs method — but both are
    // worth being able to see.
    const perQuestion = pages.map((p, n) => spec.concepts.filter((con, i) =>
      (!con.groups || con.groups.includes(p.group)) && con.k.some(k => hit(haystacks[n], k))));
    const teachesNothing = [];
    const methodOnly = [];
    perQuestion.forEach((matched, n) => {
      if(!matched.length) teachesNothing.push(n + 1);
      else if(matched.every(con => con.m)) methodOnly.push(n + 1);
    });
    // The equations, on the stricter test. A concept is touched when a question
    // talks about it; an equation is TAUGHT only when a question gets a number out
    // of it, which is why the arithmetic — the authored `relationship`, the
    // template the player fills, the worked solution and the givens — is searched
    // on its own and reported apart from the prose.
    const formulas = pages.map((p) => {
      const ch = p.ch;
      return ' ' + [ch.relationship, ch.template, ch.solution, ...(ch.givens ?? [])]
        .filter(Boolean).join(' ').toLowerCase().replace(/\s+/g, ' ') + ' ';
    });
    const eqRows = equationCoverage(themeName,
      pages.map((p, n) => ({ text: haystacks[n], formula: formulas[n] })), hit);
    const eqComputed = eqRows.filter(r => r.computes.length).length;
    const eqAbsent = eqRows.filter(r => !r.computes.length && !r.mentions.length).length;
    return `<section class="page syllabus">
      <div class="fit"FITSIZE>
        <header>
          <div class="eyebrow">Senior-high equivalent</div>
          <h2>${esc(spec.course)}</h2>
        </header>
        <p class="lede">The ${rows.length} concepts such a course has to cover, and the questions in
          this book that teach each one. The concepts are the syllabus, not this game's own
          contents list — so the blanks are real: ${covered} of ${rows.length} are taught here,
          ${gaps.length === 0 ? 'and none are missing' : `and ${gaps.length} are not`}.</p>
        <ol class="concepts">${rows.map(r => `<li${r.which.length ? '' : ' class="gap"'}>`
          + `<span class="cn">${r.n}</span><span class="cc">${esc(r.c)}`
          + `${r.m ? ' <span class="mm">▪</span>' : ''}</span>`
          + `<span class="cq">${r.which.length
              ? `${r.which.length === 1 ? 'question' : 'questions'} ${r.which.join(', ')}`
              : 'no question'}</span></li>`).join('')}</ol>
        ${eqRows.length ? `<div class="eqs">
          <h3>The ${eqRows.length} equations such a course cannot leave out</h3>
          <p class="eqlede">A question <b>computes</b> an equation when a number comes out of it —
            the estimate's own relationship, filled in. Anything else is a mention, and a mention
            is not teaching: ${eqComputed} of ${eqRows.length} are computed here${
              eqAbsent ? `, and ${eqAbsent} appear in no question at all` : ''}.</p>
          <ol class="eqlist">${eqRows.map(r => {
            const cls = r.computes.length ? 'has' : r.mentions.length ? 'weak' : 'gap';
            const where = r.computes.length
              ? `computed · question${r.computes.length === 1 ? '' : 's'} ${r.computes.join(', ')}`
              : r.mentions.length
                ? `mentioned only · question${r.mentions.length === 1 ? '' : 's'} ${r.mentions.slice(0, 6).join(', ')}${r.mentions.length > 6 ? '…' : ''}`
                : 'no question';
            return `<li class="${cls}"><span class="eqe">${esc(r.e)}</span>`
              + `<span class="eqc">${esc(r.c)}${r.v?.length
                  ? `<em class="eqv">${r.v.map(([sym, mean]) => `${esc(sym)} = ${esc(mean)}`).join(' · ')}</em>` : ''}</span>`
              + `<span class="eqq">${where}</span></li>`;
          }).join('')}</ol>
        </div>` : ''}
        <div class="flip">
          <p><span>Teaches nothing on this list</span> ${teachesNothing.length
            ? `question${teachesNothing.length === 1 ? '' : 's'} ${teachesNothing.join(', ')}`
            : 'no questions — every one of them teaches at least one concept above'}</p>
          <p><span>Method only, no mechanism of the subject</span> ${methodOnly.length
            ? `question${methodOnly.length === 1 ? '' : 's'} ${methodOnly.join(', ')}`
            : 'none'}</p>
        </div>
        <footer>${esc(theme.title)} · question numbers are the numbers on the pages that follow ·
          method concepts are marked ▪</footer>
      </div></section>`;
  };

  let qn = 0;
  const body = sheets.map((sh) => {
    if(sh.kind === 'm') return missionSheet(sh);
    const p = sh;
    const i = qn++;
    const g = groupOf(p.group);
    const scene = p.lesson.scene || p.lesson.story || '';
    const ask = p.ch.question || p.task || p.ch.task || p.ch.play || '';
    const place = placeOf(p.group);
    const inner = `
      <header>
        <div class="eyebrow"><span class="num">${i + 1}</span>
          ${esc(dayNoun)} ${p.shift} · ${esc(g?.name ?? p.group)}${place ? ` · ${esc(place)}` : ''}</div>
        <h2>${esc(p.lesson.title ?? '')}</h2>
      </header>
      ${scene ? `<p class="scene">${rich(scene)}</p>` : ''}
      ${ask ? `<p class="ask">${rich(ask)}</p>` : ''}
      <div class="body">
        ${materialHTML(p.ch)}
        ${noAnswers ? '' : answerHTML(p.lesson, p.ch)}
      </div>
      <footer>${esc(theme.title)} · ${esc(kindOf(p.ch).toLowerCase())}${
        p.again.length ? ` · revisited in ${esc(dayNoun.toLowerCase())} ${p.again.join(', ')}` : ''}</footer>`;
    return `<section class="page q" style="--accent:${esc(accentOf(p.group))}">`
      + `<div class="fit"FITSIZE>` + inner + `</div></section>`;
  }).join('\n');

  let cn = 0;
  const contents = sheets.map((sh) => sh.kind === 'm'
    ? `<li class="cm"><span class="ci"></span><span class="ct">${esc(dayNoun)} ${sh.shift} — ${esc(sh.mission.title ?? '')}</span></li>`
    : `<li><span class="ci">${++cn}</span><span class="ct">${esc(sh.lesson.title ?? '')}</span></li>`).join('');

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(theme.title)} — question book</title>
<style>
  @page { size: letter; margin: 16mm 15mm 14mm; }
  * { box-sizing: border-box; }
  html { font-size: 11.5pt; }
  body { margin: 0; color: #16181c; background: #fff;
         font: 400 1rem/1.5 "Charter", "Georgia", "Times New Roman", serif; }
  /* A sheet is exactly one page tall, and the block inside it is scaled by
     make-book.mjs to whatever fits. 'overflow: hidden' is a backstop, not the
     mechanism: the scale is computed from the measured height, so nothing reaches
     it — but a page that somehow did would be cropped rather than silently
     paginated into a second sheet, and cropping is visible. */
  .page { page-break-after: always; break-after: page;
          height: ${PAGE_PX}px; overflow: hidden; }
  .page:last-child { page-break-after: auto; break-after: auto; }
  .fit { width: ${PAGE_W}px; transform-origin: top left; }

  /* ---- the opening: its own page, and nothing else on it */
  .title { display: flex; flex-direction: column; justify-content: center; }
  .title h1 { font: 700 30pt/1.1 "Charter", Georgia, serif; margin: 0 0 6pt; letter-spacing: -0.01em; }
  .title .sub { font: 600 12pt/1.4 "Inter", system-ui, sans-serif; color: #5c6169;
                text-transform: uppercase; letter-spacing: .10em; margin: 0 0 22pt; }
  .title .opening p { font-size: 1.12rem; line-height: 1.62; margin: 0 0 10pt; max-width: 34em; }
  .title .meta { margin-top: 26pt; padding-top: 10pt; border-top: 1.5pt solid #16181c;
                 font: 500 9.5pt/1.5 "Inter", system-ui, sans-serif; color: #5c6169; }

  /* ---- the last page: how it ends. Set like the opening page, because it is its
     other half — the campaign used to finish without one. */
  .ending .fit { display: flex; flex-direction: column; justify-content: center;
                 min-height: ${PAGE_PX - 4}px; }
  .ending header { margin-bottom: 14pt; }
  .ending .opening p { font-size: 1.12rem; line-height: 1.62; margin: 0 0 10pt; max-width: 34em; }
  .ending footer { margin-top: 22pt; padding-top: 8pt; border-top: 1.5pt solid #16181c;
                   font: 500 9pt/1.5 "Inter", system-ui, sans-serif; color: #5c6169; }

  /* ---- contents */
  .toc h2, .q header h2 { font: 700 17pt/1.25 "Charter", Georgia, serif; margin: 0 0 12pt; }
  .toc ol { list-style: none; margin: 0; padding: 0; column-count: 2; column-gap: 14mm; }
  .toc li { display: flex; gap: 6pt; align-items: baseline; break-inside: avoid;
            font: 400 9.5pt/1.45 "Inter", system-ui, sans-serif; margin-bottom: 3.5pt; }
  .toc .ci { min-width: 2.2em; color: #8a8f97; font-variant-numeric: tabular-nums; }
  .toc .ct { flex: 1; }
  .toc .cs { color: #8a8f97; }

  /* ---- page three: the equations, on the stricter test. The equation itself is
     set in the serif at the weight of a heading, because it is the thing being
     looked up; computed is black, mentioned-only is grey, and a gap is the same
     red the concept list uses so both audits read the same way. */
  .syllabus .eqs { margin-top: 10pt; padding-top: 8pt; border-top: 1.5pt solid #16181c; }
  .syllabus .eqs h3 { font: 700 10.5pt/1.3 "Charter", Georgia, serif; margin: 0 0 4pt; }
  .syllabus .eqlede { font: 400 8.5pt/1.5 "Inter", system-ui, sans-serif; color: #4a4f57;
                      margin: 0 0 6pt; max-width: 46em; }
  .syllabus .eqlist { list-style: none; margin: 0; padding: 0; }
  .syllabus .eqlist li { display: flex; gap: 7pt; align-items: baseline; padding: 2.2pt 0;
                         border-bottom: 0.4pt solid #e4e1db; break-inside: avoid; }
  .syllabus .eqe { font: 700 9.5pt/1.4 "Charter", Georgia, serif; min-width: 13em; }
  .syllabus .eqc { flex: 1; font: 400 8.5pt/1.45 "Inter", system-ui, sans-serif; color: #4a4f57; }
  .syllabus .eqv { display: block; font: 400 7.5pt/1.4 "Inter", system-ui, sans-serif;
                   color: #6a6f77; font-style: normal; }
  .syllabus .eqq { font: 600 8pt/1.45 "Inter", system-ui, sans-serif; color: #4a4f57;
                   white-space: nowrap; }
  .syllabus .weak .eqe, .syllabus .weak .eqq { color: #6f747c; }
  .syllabus .gap .eqe, .syllabus .gap .eqq { color: #8a2d22; }

  /* ---- page three: the syllabus map */
  .syllabus .fit { display: flex; flex-direction: column; min-height: ${PAGE_PX - 4}px; }
  .syllabus header { border-top: 3pt solid #16181c; padding-top: 8pt; margin-bottom: 10pt; }
  .syllabus h2 { font: 700 18pt/1.2 "Charter", Georgia, serif; margin: 0; }
  .syllabus .lede { font-size: .97rem; margin: 0 0 10pt; max-width: 40em; }
  .syllabus .concepts { list-style: none; margin: 0; padding: 0; }
  .syllabus .concepts li { display: flex; gap: 7pt; align-items: baseline; padding: 2.6pt 0;
                           border-bottom: .5pt solid #e4e1db; break-inside: avoid; }
  .syllabus .cn { min-width: 1.6em; text-align: right; color: #8a8f97;
                  font: 500 9pt/1.5 "Inter", system-ui, sans-serif; font-variant-numeric: tabular-nums; }
  .syllabus .cc { flex: 1; }
  .syllabus .cq { font: 600 8.5pt/1.5 "Inter", system-ui, sans-serif; color: #4a4f57;
                  white-space: nowrap; }
  .syllabus .gap .cc { color: #8a2d22; }
  .syllabus .gap .cq { color: #8a2d22; }
  .syllabus .flip { margin-top: auto; padding: 8pt 10pt; background: #f4f2ee;
                    border-left: 3pt solid #16181c; }
  .syllabus .flip p { margin: 0 0 4pt; font-size: .95rem; }
  .syllabus .flip p:last-child { margin-bottom: 0; }
  .syllabus .flip span { display: block; font: 700 8pt/1.4 "Inter", system-ui, sans-serif;
                         text-transform: uppercase; letter-spacing: .08em; color: #5c6169; }
  .syllabus .mm { color: #8a8f97; }
  .syllabus footer { margin-top: 8pt; padding-top: 6pt; border-top: .5pt solid #d9dce1;
                     font: 500 8pt/1.4 "Inter", system-ui, sans-serif; color: #8a8f97; }

  /* ---- a mission's opening page. Sparser than a question page on purpose: this
     is the situation, and the situation is what the player reads before deciding
     anything. */
  .mission .fit { display: flex; flex-direction: column; min-height: ${PAGE_PX - 4}px; }
  .mission header { border-top: 3pt solid #16181c; padding-top: 8pt; margin-bottom: 12pt; }
  .mission h2 { font: 700 22pt/1.18 "Charter", Georgia, serif; margin: 0; letter-spacing: -0.01em; }
  .mission .lede { font-size: 1.12rem; line-height: 1.6; margin: 0 0 10pt; max-width: 33em; }
  .mission p { max-width: 33em; }
  .mission .objective { margin: 10pt 0 0; padding-left: 9pt; border-left: 2.5pt solid #16181c; }
  .mission .objective span { display: block; font: 700 8pt/1.4 "Inter", system-ui, sans-serif;
                             text-transform: uppercase; letter-spacing: .09em; color: #5c6169; }
  .mission .calls { margin-top: auto; padding-top: 12pt; }
  .mission .calls h3 { font: 700 8.5pt/1.4 "Inter", system-ui, sans-serif; text-transform: uppercase;
                       letter-spacing: .09em; color: #5c6169; margin: 0 0 7pt; }
  .mission .calls ol { list-style: none; margin: 0; padding: 0; }
  .mission .calls li { padding-left: 9pt; border-left: 3pt solid var(--accent);
                       margin-bottom: 8pt; break-inside: avoid; }
  .mission .calls b { display: block; }
  .mission .calls .where { display: block; font: 500 8.5pt/1.5 "Inter", system-ui, sans-serif;
                           text-transform: uppercase; letter-spacing: .07em; color: #5c6169; }
  .mission .calls .ct { display: block; font-size: .93rem; color: #35393f; }
  .mission .teaches { margin-top: 10pt; padding: 9pt 11pt; background: #f4f2ee;
                      border-left: 3pt solid #16181c; break-inside: avoid; }
  .mission .teaches h3 { font: 700 8.5pt/1.4 "Inter", system-ui, sans-serif; text-transform: uppercase;
                         letter-spacing: .09em; color: #5c6169; margin: 0 0 5pt; }
  .mission .teaches ul { margin: 0; padding-left: 1.1em; }
  .mission .teaches li { margin-bottom: 3pt; }
  .mission .teaches .vocab { margin: 7pt 0 0; }
  /* The equations this day is the first to need, above the vocabulary — the same
     order and the same boxed treatment the screen card uses. */
  .mission .mEqs { margin: 7pt 0 0; display: flex; flex-direction: column; gap: 2.5pt; }
  .mission .mEq { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6pt;
                  padding: 3pt 6pt; border: 0.5pt solid #b9c6cd; border-radius: 2pt;
                  background: #f4f8f9; break-inside: avoid; }
  .mission .mEq code { font: 700 9pt/1.3 ui-monospace, "SFMono-Regular", Menlo, monospace;
                       color: #2f4652; }
  .mission .mEqHead { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6pt; }
  .mission .mEqV { margin: 3pt 0 0; font: 400 7.5pt/1.45 "Inter", system-ui, sans-serif; color: #4a4f57; }
  .mission .mEqV b { font: 700 7.5pt/1.45 ui-monospace, "SFMono-Regular", Menlo, monospace; color: #2f4652; }
  .mission .mEqS { margin: 3pt 0 0; font: 400 7.5pt/1.4 "Inter", system-ui, sans-serif; color: #3f434a; }
  .mission .mEq span { font: 400 8pt/1.4 "Inter", system-ui, sans-serif; color: #55606a; }
  .mission .teaches .vocab h4 { font: 700 8pt/1.4 "Inter", system-ui, sans-serif; letter-spacing: .07em;
    text-transform: uppercase; color: #6b7280; margin: 0 0 3pt; }
  .mission .teaches .vocab dl { margin: 0; font-size: .93rem; color: #35393f; }
  .mission .teaches .vocab dt { font-weight: 700; float: left; clear: left; margin-right: 5pt; }
  .mission .teaches .vocab dt::after { content: " —"; }
  .mission .teaches .vocab dd { margin: 0 0 2pt; }
  .mission .teaches .terms { margin: 6pt 0 0; font-size: .93rem; color: #35393f; max-width: none; }
  .mission .teaches .terms span { font: 700 8pt/1.4 "Inter", system-ui, sans-serif;
                                  text-transform: uppercase; letter-spacing: .08em; color: #5c6169; }
  .mission .mtakeaway { margin: 12pt 0 0; padding-top: 8pt; border-top: .5pt solid #d9dce1;
                        font-style: italic; color: #35393f; }
  .mission footer { margin-top: 8pt; font: 500 8pt/1.4 "Inter", system-ui, sans-serif; color: #8a8f97; }
  .toc .cm { margin-top: 6pt; font-weight: 700; break-after: avoid; }

  /* ---- a question page */
  .q .fit { display: flex; flex-direction: column; min-height: ${PAGE_PX - 4}px; }
  .q header { border-top: 3pt solid var(--accent); padding-top: 8pt; margin-bottom: 10pt; }
  .eyebrow { font: 700 8.5pt/1.4 "Inter", system-ui, sans-serif; text-transform: uppercase;
             letter-spacing: .10em; color: #5c6169; margin-bottom: 5pt; }
  .eyebrow .num { display: inline-block; min-width: 1.6em; padding: 1pt 4pt; margin-right: 6pt;
                  background: var(--accent); color: #fff; border-radius: 3pt; text-align: center; }
  .scene { margin: 0 0 10pt; }
  .ask { margin: 0 0 12pt; padding-left: 9pt; border-left: 2.5pt solid var(--accent);
         font-weight: 600; }
  .mat { margin-bottom: 11pt; break-inside: avoid; }
  .mat h3, .answer h3 { font: 700 8.5pt/1.4 "Inter", system-ui, sans-serif; text-transform: uppercase;
                        letter-spacing: .09em; color: #5c6169; margin: 0 0 5pt; }
  .mat ul { margin: 0; padding-left: 0; list-style: none; }
  .mat li { margin-bottom: 4.5pt; padding-left: 1.7em; text-indent: -1.7em; }
  .mat .mech { padding-left: 0; text-indent: 0; color: #4a4f57; font-size: .93rem; }
  .mono, .givens li { font-family: "SF Mono", "Menlo", monospace; font-size: .92rem; }
  .headline { margin: 0; font-weight: 600; }
  table.readings { width: 100%; border-collapse: collapse; font-size: .93rem; }
  table.readings td { padding: 3pt 5pt; border-bottom: .5pt solid #d9dce1; vertical-align: top; }
  table.readings .zone { color: #5c6169; white-space: nowrap; }
  table.readings .val { font-family: "SF Mono", Menlo, monospace; white-space: nowrap; }
  .sweepFig { width: 100%; height: auto; display: block; }
  .sweepFig .axl { font: 400 6pt "Inter", system-ui, sans-serif; fill: #6a6f77; }
  .sweepKey { font: 400 8pt "Inter", system-ui, sans-serif; color: #4a4f57; margin: 2pt 0 0; }
  table.readings .val.alarm { font-weight: 700; }
  table.readings .note { color: #4a4f57; }

  /* ---- the answer block, last on the page */
  .answer { margin-top: auto; padding: 9pt 11pt; background: #f4f2ee;
            border-left: 3pt solid var(--accent); break-inside: avoid; }
  .answer dl { margin: 0; }
  .answer dt { font: 700 8pt/1.4 "Inter", system-ui, sans-serif; text-transform: uppercase;
               letter-spacing: .08em; color: #5c6169; margin-top: 6pt; }
  .answer dt:first-child { margin-top: 0; }
  .answer dd { margin: 1pt 0 0; font-size: .96rem; }
  .answer ul { margin: 2pt 0 0; padding-left: 1.1em; }
  .answer li { margin-bottom: 2.5pt; }
  /* ---- a long question: the lower half in two columns, chosen by the fitting pass
     in this file, because a browser is the only thing that knows how tall a page is.
     The answer block's auto top margin goes with it: an auto margin inside a column
     box pushes nothing anywhere. */
  .q.twocol .body { column-count: 2; column-gap: 9mm; }
  .q.twocol .answer { margin-top: 6pt; }
  .q.twocol .mat, .q.twocol .answer { break-inside: avoid; }

  .q footer { margin-top: 8pt; padding-top: 5pt; border-top: .5pt solid #d9dce1;
              font: 500 8pt/1.4 "Inter", system-ui, sans-serif; color: #8a8f97; }

</style></head><body>
<section class="page title">
  <h1>${esc(theme.title)}</h1>
  <p class="sub">${esc(theme.subtitle ?? '')}</p>
  <div class="opening">${(theme.opening ?? []).map(p => `<p>${rich(p)}</p>`).join('')}</div>
  <div class="meta">
    ${pages.length} questions · ${MISSIONS.length} ${esc(dayNoun.toLowerCase())}s ·
    ${GROUPS.length} areas of study${theme.audience?.grade ? ` · written for grade ${esc(theme.audience.grade)}` : ''}
    ${noAnswers ? '' : '<br>Answers and reasoning are printed with each question.'}
  </div>
</section>
<section class="page toc">
  <h2>The questions</h2>
  <ol>${contents}</ol>
</section>
${syllabusSheet()}
${body}
${(theme.ending ?? []).length ? `<section class="page ending">
  <div class="fit">
    <header><div class="eyebrow">How it ends</div></header>
    <div class="opening">${(theme.ending ?? []).map(p => `<p>${rich(p)}</p>`).join('')}</div>
    <footer>${esc(theme.title)}</footer>
  </div>
</section>` : ''}
</body></html>`;

  const stem = `${themeName}-book${noAnswers ? '-no-answers' : ''}`;
  const htmlPath = resolve(OUT, `${stem}.html`);

  // Pass one: let the browser lay the book out and tell us which pages overflow.
  // Pass two: print the same book with those pages set smaller.
  const fitted0 = htmlOnly ? null : measureFit(html, resolve(OUT, `.${stem}-probe.html`));
  let n = -1;
  // `\s*` matters: a mission page's markup has a newline between the section and the
  // block inside it, so without it the mission pages kept the literal placeholder and
  // every question after them was given the scale measured for a different page.
  const fitted = html.replace(/<section class="page (q|mission|syllabus)"([^>]*)>\s*<div class="fit"FITSIZE>/g,
    (m0, kind, attrs) => {
      n++;
      const f = fitted0?.[n] ?? { size: 1, cols: 1 };
      const cls = f.cols > 1 ? `page ${kind} twocol` : `page ${kind}`;
      const style = f.size < 1 ? ` style="transform:scale(${f.size})"` : '';
      return `<section class="${cls}"${attrs}><div class="fit"${style}>`;
    });
  writeFileSync(htmlPath, fitted);
  const shrunk = (fitted0 ?? []).filter(f => f.size < 1).length;
  const columned = (fitted0 ?? []).filter(f => f.cols > 1).length;
  let pdfPath = null;
  if(!htmlOnly && CHROME){
    pdfPath = resolve(OUT, `${stem}.pdf`);
    const res = spawnSync(CHROME, [
      '--headless', '--disable-gpu', '--no-pdf-header-footer',
      `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href,
    ], { encoding: 'utf8' });
    if(res.status !== 0) console.error(`  chrome: ${(res.stderr ?? '').trim().split('\n').slice(-1)[0]}`);
  }
  // Did it actually come out one question to a page? The fitting pass above should
  // guarantee it, and this is what says so rather than assuming it: title, contents,
  // and one page per question.
  let sheetCount = null;
  if(pdfPath && existsSync(pdfPath)){
    const raw = readFileSync(pdfPath, 'latin1');
    sheetCount = (raw.match(/\/Type\s*\/Page(?![sA-Za-z])/g) ?? []).length;
  }
  return { themeName, pages: pages.length, htmlPath, pdfPath, title: theme.title, sheets: sheetCount, missions: MISSIONS.length, shrunk, columned,
           hasEnding: !!(theme.ending ?? []).length };
}

const names = wanted[0] === 'all' ? themeNames() : wanted;
if(!CHROME && !htmlOnly){
  console.error('no Chrome or Chromium found — writing the HTML only. Print it to PDF from a browser.');
}
let overflowed = 0;
for(const n of names){
  try {
    const r = await build(n);
    const out = (r.pdfPath ?? r.htmlPath).replace(process.cwd() + '/', '');
    const want = r.pages + r.missions + 3 + (r.hasEnding ? 1 : 0);  // opening, contents, syllabus, per mission, per question, ending
    const fit = r.sheets == null ? ''
      : r.sheets === want ? ` · ${r.sheets} pages: ${r.missions} briefings, one page per question`
      : ` · ${r.sheets} pages for ${want} — ${r.sheets - want} question(s) ran over`;
    if(r.sheets != null && r.sheets !== want) overflowed++;
    const tight = [r.shrunk ? `${r.shrunk} set smaller` : '', r.columned ? `${r.columned} in two columns` : '']
      .filter(Boolean).join(', ');
    console.log(`${r.sheets == null || r.sheets === want ? '✓' : '·'} ${r.title}: ${r.pages} questions → ${out}${fit}${tight ? ` · ${tight} to fit` : ''}`);
  } catch (e) {
    console.error(`✗ ${n}: ${e.message}`);
  }
}
if(overflowed) console.log(`\n${overflowed} book(s) have a question over a page. Widen a density bucket in make-book.mjs.`);
