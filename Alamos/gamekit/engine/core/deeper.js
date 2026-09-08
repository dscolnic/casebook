// deeper.js — the optional review a player may open when a mission is finished.
//
// WHAT IT IS, in the bible's own words: "optional, ungraded for campaign
// progress, and does not change metrics, Recovery Points, or the next-mission
// unlock." Every line of this file has to keep that true, so it is worth saying
// what that rules out.
//
// NOTHING HERE IS SCORED AND NOTHING IS SAVED. There is no tally of right
// answers, no pass mark, no state written back, and no way to fail it. A player
// may click every wrong option in turn and read why each is wrong, which is the
// point: this is the place to be wrong safely, and the campaign's own questions
// are where being wrong costs something.
//
// AND IT IS A SCREEN, not a place. The rest of a campaign asks its questions
// where the equipment is; this one is read sitting down, after the shift, with
// nothing to walk to.
import { esc } from './utils.js';
import { renderFigure } from './figures.js';
// The review's own maths, set the same way the campaign's questions are —
// see engine/core/mathText.js. `mathHTML` escapes, so it REPLACES `esc`
// rather than wrapping it.
import { mathHTML } from './mathText.js';

/** Is there anything to open? */
export function hasDeeper(deeper){
  return !!(deeper && (String(deeper.intro ?? '').trim()
    || (deeper.concepts ?? []).length || (deeper.questions ?? []).length));
}

/**
 * The card.
 *
 * The concepts first, because they are what the questions lean on and the
 * bible's own heading calls them the ideas kept OUT of the required day card.
 * Then the questions, all of them open at once: a review nobody is timing does
 * not need to be paced one at a time, and seeing six at once says how long it
 * is before the player starts.
 */
export function deeperHTML(deeper){
  const intro = String(deeper?.intro ?? '').trim();
  const concepts = (deeper?.concepts ?? []).filter(c => c?.name || c?.say);
  const questions = (deeper?.questions ?? []).filter(q => q?.prompt && (q.options ?? []).length);

  const conceptHTML = !concepts.length ? '' :
    `<div class="deeperTerms"><h4>Worth knowing beyond the shift</h4>`
    + concepts.map(c => c.name
      ? `<p><b>${esc(c.name)}</b> — ${mathHTML(c.def ?? '')}</p>`
      : `<p>${mathHTML(c.say)}</p>`).join('')
    + `</div>`;

  const questionHTML = questions.map((q, i) => {
    const opts = q.options.map(o =>
      `<button class="deeperOpt" type="button" data-q="${i}" data-key="${esc(o.key)}"`
      + ` data-why="${esc(o.why ?? '')}">`
      + `<b>${esc(o.key)}</b><span>${mathHTML(o.text)}</span></button>`).join('');
    return `<div class="deeperQ" data-q="${i}" data-answer="${esc(q.answer ?? '')}">`
      + `<p class="deeperPrompt"><span class="deeperNum">${i + 1}</span>${mathHTML(q.prompt)}</p>`
      // THE CHART, BETWEEN THE QUESTION AND ITS OPTIONS, where the campaign's
      // own questions put theirs. Some of these ask about a shape — a bowed
      // curve, a shifted line, a distribution — and a shape described in a
      // sentence is a harder question about reading than about the course.
      // Nothing is drawn unless the book carries a `figure`; see
      // engine/core/figures.js for the kinds and tools/BOOK_TEMPLATE.md for how
      // one is authored.
      + (q.figure ? `<div class="deeperFig">${renderFigure(q.figure)}</div>` : '')
      + `<div class="deeperOpts">${opts}</div>`
      // The hint is behind a control rather than on the card: printed, it is the
      // first thing read and the question stops being one.
      + (q.hint ? `<details class="deeperHint"><summary>Give me a hint</summary>`
        + `<p>${mathHTML(q.hint)}</p></details>` : '')
      + `<p class="deeperWhy" hidden></p></div>`;
  }).join('');

  return `<div class="deeperCard">`
    + (intro ? `<p class="deeperIntro">${esc(intro)}</p>` : '')
    + conceptHTML
    + (questions.length ? `<div class="deeperQs">${questionHTML}</div>` : '')
    + `</div>`;
}

/**
 * Answering, which costs nothing.
 *
 * A click marks the option right or wrong and prints that option's own line of
 * feedback — the bible writes one per option, including for the correct one, so
 * a player who guesses right still reads why. Every option stays clickable
 * afterwards: reading all four is a legitimate way to use this, and disabling
 * them would turn a review into a test.
 */
export function bindDeeper(container){
  if(!container) return;
  for(const btn of container.querySelectorAll('.deeperOpt')){
    btn.onclick = () => {
      const box = btn.closest('.deeperQ');
      if(!box) return;
      const answer = box.dataset.answer ?? '';
      const key = btn.dataset.key ?? '';
      const right = !!answer && key === answer;
      for(const other of box.querySelectorAll('.deeperOpt')) other.classList.remove('picked');
      btn.classList.add('picked', right ? 'right' : 'wrong');
      btn.classList.toggle('right', right);
      btn.classList.toggle('wrong', !right);
      // The correct one is shown once anything has been tried, so a wrong pick
      // is never a dead end the player has to hunt out of.
      for(const other of box.querySelectorAll('.deeperOpt')){
        other.classList.toggle('isAnswer', !!answer && other.dataset.key === answer);
      }
      const why = box.querySelector('.deeperWhy');
      if(why){
        const said = btn.dataset.why ?? '';
        // innerHTML, not textContent: the option's own line of feedback may carry
        // an equation, and `mathHTML` has already escaped it.
        why.innerHTML = mathHTML(said || (right ? 'That is the one.' : 'Not that one.'));
        why.hidden = false;
        why.classList.toggle('right', right);
      }
    };
  }
}
