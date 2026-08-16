// personQuiz.js — ask someone about what they just told you.
//
// Every named person in the town carries a passage: a couple of paragraphs
// about who they are and what they know. Players skim it, because nothing ever
// depended on it. Now something does — read the passage, answer one question
// about it, earn a dollar.
//
// There are two sources of question, tried in order.
//
// **Authored** — a `quiz` array on the roster entry. Each item is a real
// comprehension question: something the passage explains, with three wrong
// answers that are wrong about the same subject rather than about a different
// person. This is what a bio written as a teaching passage deserves; a lifted
// sentence only ever tests whether you recognise a sentence.
//
// **Generated** — the fallback for rosters with no `quiz` yet. The correct
// answer is a sentence lifted from this passage and the distractors are
// sentences lifted from other people's, so it cannot drift out of sync with a
// bio edit. Below that sits a role question for bios too short to quote.
//
// Three dollars a conversation. A wrong call is a penalty box: free to wait out
// for an hour of game time, or $10 to have the stop back now — so three or four
// conversations buy one recovered mistake outright, and the evening of a day is
// worth walking without a player being able to farm the town instead of
// thinking.
import { getState, save } from './gameState.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { esc, seeded } from './utils.js';

// A conversation is now the only way to earn, and a wrong call costs $5. One
// dollar a person made the earning phase of a day take longer than the day.
// `state.passages` is cleared each morning (see startDay), so the same people
// are worth talking to again tomorrow.
export const PASSAGE_REWARD = 3;

/**
 * Bios are HTML. Strip it, then split into sentences worth quoting.
 *
 * The floor is adaptive because the three games write bios at very different
 * lengths: the chemistry and Los Alamos casts get paragraphs, while the
 * hospital's are one-liners with a median of fourteen characters. A fixed
 * 45-character minimum silently excluded every hospital bio and dropped all 37
 * of them to the role fallback — a question that is not about the passage at
 * all, and barely a question when 37 people share 8 roles.
 */
function sentences(bio){
  const all = String(bio || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    // The ceiling stays fixed: a very long sentence wraps into a wall of text.
    .filter(s => s.length <= 190);
  // Prefer substantial sentences; accept short ones only when there is nothing
  // else, so the games with real prose are unaffected.
  const full = all.filter(s => s.length >= 45);
  return full.length ? full : all.filter(s => s.length >= 18);
}

/**
 * An authored question, if the roster entry carries any.
 *
 * Shape: `quiz: [{ q, a, wrong: [three strings] }]`. Anything malformed is
 * dropped rather than shown, so a half-written entry degrades to the generated
 * question instead of rendering a two-choice question or a blank button.
 */
function authoredQuestion(person, seed){
  const bank = (Array.isArray(person.quiz) ? person.quiz : []).filter(q =>
    q && typeof q.q === 'string' && typeof q.a === 'string' &&
    Array.isArray(q.wrong) && q.wrong.filter(w => typeof w === 'string' && w !== q.a).length >= 3);
  if(!bank.length) return null;
  const item = bank[Math.floor(seeded(seed + 5) * bank.length)];
  const wrong = item.wrong.filter(w => w !== item.a).slice(0, 3);
  return {
    kind: 'authored',
    prompt: item.q,
    correct: item.a,
    choices: shuffle([item.a, ...wrong], seed),
  };
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

  const written = authoredQuestion(person, seed);
  if(written) return written;

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

/**
 * The panel, in two stages. The passage is on screen while you read it and
 * gone once the question appears — otherwise this is recognition, not recall:
 * the answer is a sentence sitting six lines above the choices and you can
 * simply scan for it.
 *
 * Looking again is allowed and costs the dollar. That keeps the honest reader
 * rewarded without ever stranding someone who genuinely forgot.
 */
export function passageHTML(person, opts = {}){
  const ownBio = opts.ownBio !== false;
  const status = passageState(person.id);
  const q = questionFor(person);
  const head =
    '<div class="passageHead"><b>' + esc(person.name) + '</b>' +
    '<span>' + esc(person.role || '') + '</span></div>';

  if(status === 'earned'){
    return (ownBio ? head + '<div class="passageBody">' + (person.bio || '') + '</div>' : '') +
      '<div class="passageDone">You have already answered ' + esc(person.name) + '\u2019s question.</div>';
  }

  const choiceHTML = q.choices.map((c, i) =>
    '<button class="passageChoice" data-passage="' + i + '" type="button">' +
    '<b>' + String.fromCharCode(65 + i) + '.</b><span>' + esc(c) + '</span></button>').join('');

  return (ownBio ? head + '<div class="passageBody" id="passageText">' + (person.bio || '') + '</div>' : '') +
    '<div class="passageGate" id="passageGate">' +
      // No note here. It used to say "The passage closes when the question
      // opens", which is a description of the interface rather than anything
      // happening in the world \u2014 and the button already says what it does.
      '<button class="btn primary" id="passageAsk" type="button">Ready \u2014 ask me</button>' +
    '</div>' +
    '<div class="passageQ hidden" id="passageQ">' +
      '<div class="passageQPrompt">' + esc(q.prompt) + '</div>' +
      '<div class="passageNote" id="passageStake">' +
        (status === 'missed'
          ? 'You missed this one before. Answering now costs nothing and pays nothing.'
          : 'Answer from memory and ' + esc(person.name) + ' signs off $' + PASSAGE_REWARD + '.') +
      '</div>' +
      '<div class="passageChoices">' + choiceHTML + '</div>' +
      '<button class="passagePeek" id="passagePeek" type="button">Read it again \u2014 gives up the $' + PASSAGE_REWARD + '</button>' +
      '<div id="passageResult"></div>' +
    '</div>';
}
/**
 * Wire the choices. `onDone` lets the caller refresh whatever shows money.
 * Pays once: a second correct answer to the same person earns nothing, so this
 * is an errand rather than an income.
 */
export function bindPassage(container, person, onDone, opts = {}){
  const q = questionFor(person);
  const result = container.querySelector('#passageResult');
  // The passage element may belong to the host panel rather than to us.
  const text = opts.textEl || container.querySelector('#passageText');
  const gate = container.querySelector('#passageGate');
  const quiz = container.querySelector('#passageQ');
  let peeked = false;

  // Stage one: they read it, then close it themselves.
  const ask = container.querySelector('#passageAsk');
  if(ask) ask.onclick = () => {
    text?.classList.add('hidden');
    gate?.classList.add('hidden');
    quiz?.classList.remove('hidden');
  };
  const peek = container.querySelector('#passagePeek');
  if(peek) peek.onclick = () => {
    peeked = true;
    text?.classList.remove('hidden');
    peek.remove();
    const stake = container.querySelector('#passageStake');
    if(stake) stake.textContent = 'You looked again, so this one pays nothing. Answer it anyway.';
  };
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
        const paid = (first && !peeked) ? PASSAGE_REWARD : 0;
        if(paid){
          state.reserve += paid;
          state.log.push({ week: state.week, text: `${person.name} signed off $${paid} of expenses.` });
        }
        state.passages[person.id] = 'earned';
        result.innerHTML = `<div class="feedback good"><h4>Correct</h4><p>` +
          (paid ? `${esc(person.name)} signs off ${paid}.`
                : `Right answer — but no payment for this one.`) +
          `</p></div>`;
      } else {
        if(first) state.passages[person.id] = 'missed';
        // A lifted sentence really was said; an authored answer is a fact from
        // the passage, and quoting it as speech would be putting words in a
        // mouth that never formed them.
        result.innerHTML = `<div class="feedback bad"><h4>Not that one</h4><p>` +
          (q.kind === 'authored'
            ? `The answer was: ${esc(q.correct)}`
            : `${esc(person.name)} actually said: “${esc(q.correct)}”`) +
          `</p></div>`;
      }
      save();
      onDone?.();
    };
  });
}
