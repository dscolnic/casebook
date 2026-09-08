// worked.js — the five worked examples behind the mission card's own button.
//
// WHAT THE BIBLE ASKS FOR, in its own words: "Place the 'Worked examples' button
// below the mission opening, without adding to its body. Open a separate panel
// with five selectable examples, numbered 1 to 5. Show the selected problem,
// rule, worked steps, answer, and common mistake together; render any figure
// beside its problem. This is reference material, not an interaction to grade: no
// answer input, points, metric changes, or unlock requirement. Pause any active
// countdown while this panel is open. 'Back to mission' restores the same mission
// card and progress."
//
// UNGRADED BY CONSTRUCTION, the same way `deeper.js` is. Nothing here reads the
// campaign state, nothing writes it, and there is no answer to submit — the whole
// module is a renderer and a click handler that changes which example is shown.
// The one thing it must not do is cost the player time, which is why the caller
// pauses the clock around it rather than this module trying to.
//
//   node engine/core/worked.js --selftest
import { esc } from './utils.js';
import { mathHTML } from './mathText.js';
import { renderFigure } from './figures.js';

/** Is there a panel to open? */
export function hasWorked(worked){
  return !!(worked?.examples ?? []).some(x => x?.problem);
}

/** The button that opens it, for the mission card. */
export function workedLabel(worked){
  return String(worked?.label ?? 'Worked examples');
}

/**
 * The panel: a numbered strip, then the selected example.
 *
 * All five are in the DOM and one is shown, rather than re-rendering on each
 * click. The examples are short, there are five of them, and a panel that rebuilds
 * itself loses the scroll position of the thing the reader was halfway through.
 */
export function workedHTML(worked, at = 0){
  const list = (worked?.examples ?? []).filter(x => x?.problem);
  if(!list.length) return '';
  const pick = list.map((x, i) =>
    `<button type="button" class="workedTab${i === at ? ' on' : ''}" data-worked="${i}">`
    + `<b>${i + 1}</b><span>${esc(x.title ?? '')}</span></button>`).join('');

  // A ONE-PART EXAMPLE IS NOT A PROBLEM. Most bibles write five parts and the
  // first is the question; Whiteout writes each example as a single worked
  // paragraph, and printing that under a "Problem" heading tells the reader to
  // solve something already solved in front of them. So the heading appears
  // only when there is a second part for it to be distinguished from.
  const parted = (x) => !!(x.rule || (x.steps ?? []).length || x.answer || x.mistake);
  const one = (x, i) => `<div class="workedOne" data-worked-panel="${i}"${i === at ? '' : ' hidden'}>`
    + `<div class="workedProblem">${parted(x) ? '<h4>Problem</h4>' : ''}`
    + `<p>${mathHTML(x.problem)}</p></div>`
    // The figure sits beside its problem, as asked. On a narrow card the grid
    // collapses and it lands under it, which is the same reading order.
    + (x.figure ? `<div class="workedFig">${renderFigure(x.figure)}</div>` : '')
    + (x.rule ? `<div class="workedRule"><h4>Rule</h4><p>${mathHTML(x.rule)}</p></div>` : '')
    + ((x.steps ?? []).length
        ? `<div class="workedSteps"><h4>Worked steps</h4><ol>${
            x.steps.map(s => `<li>${mathHTML(s)}</li>`).join('')}</ol></div>` : '')
    + (x.answer ? `<div class="workedAnswer"><h4>Answer</h4><p>${mathHTML(x.answer)}</p></div>` : '')
    // The mistake is last and marked, because it is the one part a reader should
    // not take away as the method.
    + (x.mistake ? `<div class="workedMistake"><h4>Common mistake</h4><p>${mathHTML(x.mistake)}</p></div>` : '')
    + `</div>`;

  return `<div class="workedCard"><div class="workedTabs">${pick}</div>`
    + list.map(one).join('') + `</div>`;
}

/** Switching between them. Nothing is scored and nothing is saved. */
export function bindWorked(container){
  if(!container) return;
  const tabs = [...container.querySelectorAll('.workedTab')];
  const panels = [...container.querySelectorAll('[data-worked-panel]')];
  for(const tab of tabs){
    tab.onclick = () => {
      const at = tab.dataset.worked;
      for(const t of tabs) t.classList.toggle('on', t === tab);
      for(const p of panels) p.hidden = p.dataset.workedPanel !== at;
    };
  }
}

// --------------------------------------------------------------- the selftest
//
// The cases are about what this must NOT do. It is opened from the one card the
// player reads before a timed shift, so a panel that loses an example, grades
// something, or comes up blank is worse than no button at all.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };
  const five = { label: 'Worked examples', title: 'Mission 1: worked examples',
    examples: [1, 2, 3, 4, 5].map(n => ({ title: `Example ${n}`, problem: `Find L for f(x)=${n}x+1.`,
      rule: 'lim(x→a) f(x)=f(a).', steps: [`L=${n}(2)+1`], answer: `The limit is ${2 * n + 1}.`,
      mistake: 'Substitution giving 0/0 is not an answer of zero.' })) };

  const html = workedHTML(five);
  check('all five are in the panel', (html.match(/workedOne/g) ?? []).length === 5);
  // Counted on the attribute, not the class: `workedTabs` (the strip) also
  // contains the string `workedTab`, so a class match says six.
  check('…and five tabs to choose between them',
        (html.match(/data-worked="/g) ?? []).length === 5,
        String((html.match(/data-worked="/g) ?? []).length));
  check('one is shown and four are hidden', (html.match(/ hidden/g) ?? []).length === 4);
  check('every part of an example is printed',
        /Problem/.test(html) && /Rule/.test(html) && /Worked steps/.test(html)
        && /Answer/.test(html) && /Common mistake/.test(html));
  check('the maths is set as maths', /<sup|√|≤|→/.test(workedHTML({ examples: [
    { problem: 'Find lim_(x->2) sqrt(x^2+1).', steps: [], answer: '' }] })),
        'the panel is mostly notation and reuses engine/core/mathText.js');

  // NOTHING IS GRADED. There is no input, no button that submits, and no state.
  check('there is nothing to submit', !/<input|type="submit"|deeperOpt|calcSubmit/.test(html),
        'the bible: "no answer input, points, metric changes, or unlock requirement"');
  check('a second example can be selected without losing the first',
        (workedHTML(five, 3).match(/workedOne/g) ?? []).length === 5);
  check('…and it is the fourth that is showing',
        /data-worked-panel="3"(?! hidden)/.test(workedHTML(five, 3)));

  // The empty cases: a button must never open a blank panel.
  check('no examples means no panel', workedHTML({ examples: [] }) === '');
  check('…and no button', hasWorked({ examples: [] }) === false);
  check('an example with no problem does not count',
        hasWorked({ examples: [{ title: 'x' }] }) === false,
        'a card offering a button that opens nothing is worse than no button');
  check('a mission with examples does', hasWorked(five) === true);
  check('the label is the bible\'s own', workedLabel(five) === 'Worked examples');
  check('…with a fallback when it writes none', workedLabel({ examples: [] }) === 'Worked examples');

  // A figure that cannot be drawn must not take the panel down with it — the
  // same guard `figures.js` has, checked from this side.
  // THE ONE-PART EXAMPLE. A whole worked paragraph is not a question, and the
  // heading over it would say it is.
  const solo = workedHTML({ examples: [{ title: 'Integer division',
    problem: 'With int a = 7; int b = 2;, Java evaluates a / b as 3.' }] });
  check('a one-part example prints without a "Problem" heading', !/<h4>Problem<\/h4>/.test(solo),
        'the paragraph is the worked example, not the question');
  check('…and still prints', /Java evaluates/.test(solo));
  check('…and still offers its tab', /data-worked="0"/.test(solo));
  check('a five-part example keeps the heading',
        /<h4>Problem<\/h4>/.test(workedHTML(five)));

  const bent = workedHTML({ examples: [{ problem: 'p', steps: [], answer: 'a',
    figure: { kind: 'bars', series: [{ points: [[1, 2]] }] } }] });
  check('a mis-shaped figure leaves the example readable', /workedProblem/.test(bent));

  console.log(fails.length
    ? `\nworked --selftest: ${fails.length} case(s) failed.\n  ${fails.join('\n  ')}`
    : `\nworked --selftest: ${ran} cases, five examples to read and nothing to answer.`);
  process.exitCode = fails.length ? 1 : 0;
}
