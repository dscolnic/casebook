import { QUAL_QUESTIONS, PER_DAY, questionsAvailable, totalDaysOfQuestions } from '../content/qualQuestions.js';
import { guideStrip } from './StationGuide.js';

/**
 * StudyDesk — the fold-down desk in the berthing space, where qualification is
 * written down rather than done.
 *
 * Three questions are posted each patrol day, and none of them asks about
 * anything the boat has not already made the player do. A wrong answer is not
 * punished: it shows the explanation and stays open, because the point is the
 * concept, not the score. Ten correct earns the Dolphins.
 *
 * Progress lives in `deepwatch.progress.v1` alongside missions, so it survives a
 * restart the same way a real qualification card would.
 */
const AWARD_AT = 10;

export class StudyDesk {
  constructor(ctx) {
    this.state = ctx.state;
    this.bus = ctx.bus;
    this.save = ctx.save;
    this.crew = ctx.crew;
    this._open = null;      // question currently being answered
  }

  get progress() { return this.save.qualProgress(); }

  render(container) {
    this.container = container;
    this._render();
  }

  _render() {
    const day = this.crew?.day ?? 1;
    const available = questionsAvailable(day);
    const p = this.progress;
    const answered = available.filter((q) => p.answers[q.id]);
    const correct = Object.values(p.answers).filter((a) => a.correct).length;
    const unanswered = available.filter((q) => !p.answers[q.id]);
    const postedToday = QUAL_QUESTIONS.slice((day - 1) * PER_DAY, day * PER_DAY);
    const moreDays = Math.max(0, totalDaysOfQuestions() - day);

    this.container.innerHTML = `
      ${guideStrip({
        what: 'Your qualification card. Three more questions are posted here every patrol day, and they only ever ask about something you have already had to do aboard.',
        doNow: unanswered.length
          ? `${unanswered.length} question${unanswered.length === 1 ? '' : 's'} outstanding. Work them; a wrong answer costs nothing but the explanation.`
          : moreDays
            ? `Everything posted so far is answered. Three more go up tomorrow — ${moreDays} more day${moreDays === 1 ? '' : 's'} of questions after today.`
            : 'Every question on the card is answered.',
        why: `Qualification is written as well as practical. ${AWARD_AT} correct earns your Dolphins.`,
      })}

      <div class="qual-header">
        <div class="qual-score ${correct >= AWARD_AT ? 'earned' : ''}">
          <span class="qs-num">${correct}</span><span class="qs-of">/ ${AWARD_AT}</span>
          <span class="qs-label">${correct >= AWARD_AT ? 'Dolphins earned' : 'correct toward your Dolphins'}</span>
        </div>
        <div class="qual-meta">
          <div>Patrol day <b>${day}</b> · <b>${postedToday.length}</b> posted today</div>
          <div>${answered.length} of ${available.length} available questions answered</div>
          ${p.awards.includes('dolphins') ? '<div class="qual-badge">⬥ SUBMARINE QUALIFIED</div>' : ''}
        </div>
      </div>

      <div id="qual-list" class="qual-list"></div>`;

    this._renderList(available);
  }

  _renderList(available) {
    const list = this.container.querySelector('#qual-list');
    const p = this.progress;
    if (!available.length) {
      list.innerHTML = '<div class="notebook-empty">Nothing posted yet.</div>';
      return;
    }
    list.innerHTML = available.map((q, i) => {
      const a = p.answers[q.id];
      const openThis = this._open === q.id;
      return `<div class="qual-item ${a ? (a.correct ? 'right' : 'wrong') : ''} ${openThis ? 'open' : ''}">
        <div class="qi-head" data-open="${q.id}">
          <span class="qi-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="qi-q">${q.q}</span>
          <span class="qi-state">${a ? (a.correct ? '✓ correct' : '✗ answered') : 'unanswered'}</span>
        </div>
        ${openThis || a ? `
          <div class="qi-body">
            <div class="qi-from">from: ${q.from}</div>
            ${q.options.map((opt, oi) => {
              const chosen = a && a.choice === oi;
              const isAnswer = oi === q.answer;
              const cls = a ? (isAnswer ? 'is-answer' : chosen ? 'is-chosen' : '') : '';
              return `<button class="qi-opt ${cls}" data-q="${q.id}" data-opt="${oi}" ${a ? 'disabled' : ''}>
                <span class="qi-letter">${'ABCD'[oi]}</span>${opt}</button>`;
            }).join('')}
            ${a ? `<div class="qi-why"><span class="qi-concept">${q.concept}</span>${q.why}</div>` : ''}
          </div>` : ''}
      </div>`;
    }).join('');

    list.querySelectorAll('[data-open]').forEach((el) => el.addEventListener('click', () => {
      this._open = this._open === el.dataset.open ? null : el.dataset.open;
      this._renderList(available);
    }));
    list.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => {
      this._answer(b.dataset.q, +b.dataset.opt, available);
    }));
  }

  _answer(id, choice, available) {
    const q = QUAL_QUESTIONS.find((x) => x.id === id);
    if (!q || this.progress.answers[id]) return;
    const correct = choice === q.answer;
    this.save.recordQualAnswer(id, choice, correct);
    this._open = id;

    const total = Object.values(this.progress.answers).filter((a) => a.correct).length;
    this.bus.emit('qual:answered', { id, correct, total });
    this.bus.emit('hud:toast', {
      concept: correct ? q.concept : 'Not quite',
      text: correct ? q.why : `${q.why} (The card stays open — read it and move on.)`,
    });

    if (total >= AWARD_AT && !this.progress.awards.includes('dolphins')) {
      this.save.grantAward('dolphins');
      this.bus.emit('qual:award', { award: 'dolphins', total });
      this.bus.emit('hud:toast', {
        concept: '⬥ Submarine Qualified',
        text: `${AWARD_AT} correct. Your Dolphins are awarded — you are qualified in submarines.`,
      });
    }
    this._render();
    void available;
  }

  dispose() {}
}
