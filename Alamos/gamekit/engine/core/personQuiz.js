// personQuiz.js — ask someone about what they just told you.
//
// Every named person in the town carries a passage: a couple of paragraphs
// about who they are and what they know. Players skim it, because nothing ever
// depended on it. Now something does — read the passage, answer one question
// about it, earn a dollar.
//
// The questions are generated rather than authored, for two reasons. There are
// roughly eighty named people across the three games, so authoring is eighty
// questions that then have to be maintained alongside every bio edit. And a
// generated question is guaranteed to be about the passage actually on screen:
// the correct answer is a sentence lifted from it, and the distractors are
// sentences lifted from other people's. Nothing can drift out of sync.
//
// A dollar is deliberately small. The reserve starts at 20 and a wrong call now
// costs 5 or 10, so a full sweep of the town is worth roughly one recovered
// mistake — a reason to talk to people, not a way to farm.
import { getState, save } from './gameState.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { esc, seeded } from './utils.js';

export const PASSAGE_REWARD = 1;

/** Bios are HTML. Strip it, then split into sentences worth quoting. */
function sentences(bio){
  return String(bio || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    // Very short fragments make trivially guessable distractors, and very long
    // ones wrap into a wall. Both hurt the question.
    .filter(s => s.length >= 45 && s.length <= 190);
}

/**
 * One question about this person's passage, stable for a given person so the
 * answer cannot be rerolled by walking away and coming back.
 *
 * Falls back to a role question when a bio is too short to quote from — some
 * roster entries are a single line.
 */
export function questionFor(person){
  const roster = HISTORIC_CHARACTERS || [];
  const mine = sentences(person.bio);
  const others = roster.filter(p => p.id !== person.id);
  const seed = [...person.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const pick = (arr, n) => arr[Math.floor(seeded(seed + n * 31) * arr.length)];

  if(mine.length){
    const correct = pick(mine, 1);
    const distractors = [];
    for(let i = 0; distractors.length < 3 && i < others.length * 3; i++){
      const other = pick(others, i + 2);
      const pool = sentences(other?.bio).filter(s => s !== correct && !distractors.includes(s));
      if(pool.length) distractors.push(pick(pool, i + 7));
    }
    if(distractors.length === 3){
      return {
        kind: 'passage',
        prompt: `Which of these did ${person.name} tell you?`,
        correct,
        choices: shuffle([correct, ...distractors], seed),
      };
    }
  }

  // Fallback: who is this, among people who do genuinely different jobs.
  const roles = [...new Set(others.map(p => p.role).filter(Boolean))];
  const distractors = [];
  for(let i = 0; distractors.length < 3 && roles.length; i++){
    const r = pick(roles, i + 3);
    if(r && r !== person.role && !distractors.includes(r)) distractors.push(r);
  }
  return {
    kind: 'role',
    prompt: `What is ${person.name}'s role here?`,
    correct: person.role,
    choices: shuffle([person.role, ...distractors], seed),
  };
}

/** Deterministic shuffle, so the correct answer does not sit in one position. */
function shuffle(arr, seed){
  return arr
    .map((v, i) => ({ v, k: seeded(seed + i * 17) }))
    .sort((a, b) => a.k - b.k)
    .map(x => x.v);
}

/** 'unasked' | 'earned' | 'missed' — one payment per person, ever. */
export function passageState(personId){
  const s = getState();
  return s?.passages?.[personId] ?? 'unasked';
}

/** The panel: the passage, then the question about it. */
export function passageHTML(person){
  const status = passageState(person.id);
  const q = questionFor(person);
  const head =
    `<div class="passageHead"><b>${esc(person.name)}</b>` +
    `<span>${esc(person.role || '')}</span></div>`;
  const body = `<div class="passageBody">${person.bio || ''}</div>`;

  if(status === 'earned'){
    return head + body +
      `<div class="passageDone">You have already answered ${esc(person.name)}’s question.</div>`;
  }
  const opts = q.choices.map((c, i) =>
    `<button class="passageChoice" data-passage="${i}" type="button">` +
    `<b>${String.fromCharCode(65 + i)}.</b><span>${esc(c)}</span></button>`).join('');
  return head + body +
    `<div class="passageQ"><div class="passageQPrompt">${esc(q.prompt)}</div>` +
    (status === 'missed'
      ? `<div class="passageNote">You missed this one. Answering now costs nothing and pays nothing.</div>`
      : `<div class="passageNote">Answer correctly and ${esc(person.name)} signs off $${PASSAGE_REWARD} of expenses.</div>`) +
    `<div class="passageChoices">${opts}</div>` +
    `<div id="passageResult"></div></div>`;
}

/**
 * Wire the choices. `onDone` lets the caller refresh whatever shows money.
 * Pays once: a second correct answer to the same person earns nothing, so this
 * is an errand rather than an income.
 */
export function bindPassage(container, person, onDone){
  const q = questionFor(person);
  const result = container.querySelector('#passageResult');
  container.querySelectorAll('[data-passage]').forEach(btn => {
    btn.onclick = () => {
      const picked = q.choices[+btn.dataset.passage];
      const ok = picked === q.correct;
      const state = getState();
      state.passages = state.passages || {};
      const first = passageState(person.id) === 'unasked';
      container.querySelectorAll('[data-passage]').forEach(b => { b.disabled = true; });
      btn.classList.add(ok ? 'right' : 'wrong');

      if(ok){
        const paid = first ? PASSAGE_REWARD : 0;
        if(paid){
          state.reserve += paid;
          state.log.push({ week: state.week, text: `${person.name} signed off $${paid} of expenses.` });
        }
        state.passages[person.id] = 'earned';
        result.innerHTML = `<div class="feedback good"><h4>Correct</h4><p>` +
          (paid ? `${esc(person.name)} signs off $${paid}.` : `No further payment for this one.`) +
          `</p></div>`;
      } else {
        if(first) state.passages[person.id] = 'missed';
        result.innerHTML = `<div class="feedback bad"><h4>Not that one</h4><p>` +
          `${esc(person.name)} actually said: “${esc(q.correct)}”</p></div>`;
      }
      save();
      onDone?.();
    };
  });
}
