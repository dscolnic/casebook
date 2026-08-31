// debrief.js — the card that closes a day, and the people who say something
// about it.
//
// Fifteen days of a campaign used to end on one sentence — "Every call made.
// The team writes it up overnight." — identical on day 1 and day 15, identical
// after three right answers and after three wrong ones. The only
// acknowledgement anywhere in a campaign was the two-word kicker on a verdict
// card ("The call holds") and, once, the authored `ending`. A game whose
// youngest audience is in the third grade closed fifteen working days without
// ever telling the player they had done well.
//
// So: a debrief, composed here rather than authored, and a named person from the
// area the player actually worked in saying one thing about it.
//
// **Three rules this file exists to keep.**
//
//   1. **The praise is earned or it is not given.** The tier is read off
//      `missionResults`, `hints` and `retries` — what actually happened — so a
//      day on which nothing held cannot be told it went well. A card that
//      congratulates every day is a card nobody reads by day 3, and a child who
//      is praised for a wrong answer has been taught that the praise is noise.
//   2. **A name arrives with the job attached.** `engine/dev/introRule.mjs` is
//      the rule for authored prose and this is a new player-facing surface with
//      names on it, so every speaker is cited as "Name, Job" — never a bare
//      surname. A compliment from somebody the player cannot place is a
//      compliment from nobody.
//   3. **The register follows `audience.grade`.** Hospital Heroes is grades 3–4
//      and got the same terse `Correct` as college chemistry. Below grade 8 the
//      lines are one clause per sentence with no subordination and no question
//      title interpolated — a title like "What the reserve has to cover" is
//      written for an AP reader and drags the whole card up two grades. This is
//      the same failure this repo has already paid for nine times: the prose
//      comes down and the demand stays where it was.
//
// The compliment is not authored per day, deliberately. The alternative was a
// `praise:` key on every mission — 435 lines of writing across 29 campaigns, and
// a new book key that `import-book.mjs` would have to map or silently drop. What
// makes a generated line specific is that every slot in it is a fact about the
// day just played: who was in the area, what the call was called, how many held.
//
// `segue` is the one exception, and it is a different kind of content: not
// praise, which the engine can compose from `missionResults`, but story — what
// happened and what it forces tomorrow, which no formula can compose because the
// engine does not know the plot. See rule 11 in STORY_SPEC.md. It is optional
// and read first, before the compliment; a mission with none keeps this card
// exactly as it always was.
import { esc, seeded } from './utils.js';

// The line between "a young player" and "everybody else", and the same number
// `questionLoad` gates on. Below it, one clause per sentence.
const JUNIOR_AT_OR_BELOW = 8;
// And below *this*, a different language again. Hospital Heroes is grade 2 and
// the junior lines measured at grade 3–5 on it — "nobody had to fix your work"
// is three clauses' worth of syllables in nine words. The primary bank is one
// short clause per sentence and words of one or two syllables.
const PRIMARY_AT_OR_BELOW = 3;
export const registerFor = (grade) => (grade <= PRIMARY_AT_OR_BELOW ? 'primary'
  : grade <= JUNIOR_AT_OR_BELOW ? 'junior' : 'senior');

/**
 * What each of today's calls did.
 *
 * `missionResults` is keyed `${week}-${stopIndex}` and `hints`/`retries` are
 * keyed `${week}-${groupId}` — two different keys for the same day because they
 * were written years apart, so both are read here rather than in the caller.
 */
export function dayRows(content, state){
  const week = state?.week ?? 1;
  const m = (content?.MISSIONS ?? [])[week - 1];
  const res = state?.missionResults ?? {};
  const cur = content?.CURRICULUM ?? {};
  return (m?.stops ?? []).map((s, i) => {
    const row = res[`${week}-${i}`];
    return {
      idx: i,
      group: s.group,
      lesson: s.lesson,
      title: String((cur[s.group] ?? [])[s.lesson]?.title ?? ''),
      answered: !!row,
      correct: !!row?.correct,
      // A hint bought or a second attempt taken. Either one means the answer
      // arrived the long way, which is worth saying and is not worth hiding.
      helped: !!(state?.hints?.[`${week}-${s.group}`] || state?.retries?.[`${week}-${s.group}`]),
    };
  });
}

/**
 * Which of the four things today was.
 *
 * `clean` and `worked` are deliberately separate. A day carried by three hints
 * is not the day where nobody had to check anything, and telling a player it was
 * is how the card stops meaning anything.
 */
export function tierOf(rows){
  const total = rows.length;
  const right = rows.filter(r => r.correct).length;
  if(!total) return 'clean';
  if(right === total) return rows.some(r => r.helped) ? 'worked' : 'clean';
  return right === 0 ? 'rough' : 'mixed';
}

/**
 * The job, as the roster wrote it.
 *
 * Verbatim, and that is a decision rather than laziness. The first version bent
 * the role into a sentence — "Dolores Reyes, the shift supervisor" — which meant
 * lowercasing it, and a job title is not reliably lowercase: `NASA Flight
 * Director`, `EVA Lead`, `Riverton Water Authority Chemist`. Every rule that
 * gets "shift supervisor" right gets one of those wrong, and "the nASA flight
 * director" is worse than the problem. A cite is a byline, so it takes title
 * case the way a byline does and the authored string survives untouched.
 */
export function citeRole(role){
  return String(role ?? '').trim();
}

/**
 * Who speaks, in the order they get to.
 *
 * Somebody from an area whose call held first, because the first line on the
 * card is the compliment; then somebody from an area that did not. A day whose
 * areas have nobody on the roster still gets a voice rather than a silent card.
 *
 * Chosen from `(week, area)` through the pure hash in `utils.js` — not from the
 * world's seeded generator, which hands out looks and moves every later draw.
 */
export function speakersFor(content, state, rows){
  const roster = (content?.ROSTER ?? []).filter(p => p?.name && p?.role);
  if(!roster.length) return [];
  const week = state?.week ?? 1;
  const groups = content?.GROUPS ?? [];
  const gi = (id) => Math.max(0, groups.findIndex(g => g.id === id));
  const leaders = new Set((content?.LEADERS ?? []).map(l => l?.id).filter(Boolean));

  // **The crowd is not the staff, and the first version could not tell.**
  // Hospital Heroes has 38 people on its roster and 30 of them are the children
  // being treated, so the first card that ran said "Nobody had to fix your work
  // today" over the byline `Lena, Patient`. Nothing in the data says "staff":
  // what it does say is that one role is held by a crowd and the rest are held
  // by one person each. A role more than a quarter of the roster shares is the
  // crowd — the patients, the evacuees, the trial participants — and the area's
  // own leader is kept whatever their role is called.
  const counts = new Map();
  for(const p of roster) counts.set(p.role, (counts.get(p.role) ?? 0) + 1);
  const crowd = new Set(roster.length >= 8
    ? [...counts].filter(([, n]) => n > roster.length / 4).map(([r]) => r)
    : []);
  const named = (g) => {
    const inArea = roster.filter(p => p.division === g);
    const staff = inArea.filter(p => leaders.has(p.id) || !crowd.has(p.role));
    return staff.length ? staff : inArea;
  };

  const order = [
    ...new Set([
      ...rows.filter(r => r.correct).map(r => r.group),
      ...rows.filter(r => !r.correct).map(r => r.group),
    ]),
  ];
  const picked = [];
  for(const g of order){
    const list = named(g);
    if(!list.length) continue;
    const p = list[Math.floor(seeded(week * 31 + gi(g) * 7 + 3) * list.length) % list.length];
    if(p && !picked.some(q => q.id === p.id)) picked.push({ ...p, group: g });
  }
  if(!picked.length){
    const pool = roster.filter(p => leaders.has(p.id) || !crowd.has(p.role));
    const list = pool.length ? pool : roster;
    const p = list[Math.floor(seeded(week * 17 + 5) * list.length) % list.length];
    picked.push({ ...p, group: p.division });
  }
  return picked;
}

// ----------------------------------------------------------------- the words
//
// Every line is a slot fill over facts about the day. `{n}` is how many held,
// `{total}` how many there were, `{title}` a call that held, `{missed}` one that
// did not, `{area}` the speaker's own area and `{day}` whatever the theme calls
// a mission — a submarine runs watches and Red Sand runs sols, so "tomorrow" is
// never written here.
const LINES = {
  senior: {
    clean: [
      'Every call you made today stands. I have written the {area} note up the way you called it.',
      'Nobody had to check your work today. That is not how most {day}s here go.',
      'You had {title} settled before I had the file open.',
      '{n} calls, {n} that hold. Your name is against all of them in the log.',
    ],
    worked: [
      'You went back at {missed} rather than leaving it. That is the habit this job runs on.',
      'A second look, and then the right answer. I will take that over a fast wrong one.',
      'You asked for help and then did the work. Both of those were the right move.',
    ],
    mixed: [
      'What held, held because of you. {missed} goes back on the board, and that is ordinary.',
      '{n} of {total} settled today. Nobody settles all of them.',
      'You called what the evidence supported and left the rest open. That is the honest way round.',
    ],
    rough: [
      'Hard {day}. You made every call rather than leaving one open, and I can build on that.',
      'None of it landed today. You were in the right places, asking the right people.',
      'You stayed to the end of a bad {day}. Plenty of people here have not.',
    ],
  },
  primary: {
    clean: [
      'You got them all right. I checked. Good job.',
      'You looked at the clues. Then you got it right. Nice work.',
      'All of it was right. That helps us a lot.',
    ],
    worked: [
      'You tried again. That was the right thing to do. Good job.',
      'You asked for help. Then you got it. That was smart.',
    ],
    mixed: [
      'You got {n} right. That is good. We can do more later.',
      'Some of it was right. That part was yours.',
    ],
    rough: [
      'It was a hard {day}. You did not give up.',
      'None of it went right. You kept going. That is good.',
    ],
  },
  junior: {
    clean: [
      'You got every one right. I checked them all. Good work today.',
      'You looked carefully. That is how we do this job. Well done.',
      'Nobody had to fix your work today. That is a good {day}.',
    ],
    worked: [
      'You went back and tried again. That is the right thing to do. Well done.',
      'You asked for help. Then you got it right. Both were good choices.',
    ],
    mixed: [
      'You got {n} right. That is good work. We can look at the rest later.',
      'Some of it held. That part is yours. The rest can wait.',
    ],
    rough: [
      'Today was hard. You stayed with it. That matters here.',
      'None of it worked out today. You were in the right places. The next {day} starts closer.',
    ],
  },
};

// The second voice is short on purpose. Two full compliments read as a wall and
// the first one stops counting; a corroboration from somebody else in the
// building is the thing a player cannot get from a scoreboard.
const SECOND = {
  primary: {
    clean: ['Thank you. That helped us.', 'Thanks for your help today.'],
    worked: ['Thanks for finishing it.'],
    mixed: ['The part you got right helped.'],
    rough: [],
  },
  senior: {
    clean: ['I will not need to re-run any of it. Thank you.', 'You saved me an evening.'],
    worked: ['You did not leave it half done. Noted.', 'Finished is finished. Thank you.'],
    mixed: ['The part that landed is the part I needed today.', 'I can work with what you got.'],
    rough: [],
  },
  junior: {
    clean: ['Thank you. That helped a lot.', 'Thank you for your good work.'],
    worked: ['Thank you for finishing it.'],
    mixed: ['The part you got right helped me.'],
    rough: [],
  },
};

const LEDE = {
  primary: {
    clean: 'You got them all right today.',
    worked: 'You got them all right. One took two goes.',
    mixed: 'You got {n} of {total} right today.',
    rough: 'Today was hard. You still finished it.',
  },
  senior: {
    clean: 'Every call you made today held, and not one of them needed a second attempt.',
    worked: 'Every call held. One of them took a second look, which is what a second look is for.',
    mixed: '{n} of {total} held. The rest goes back on the board and gets worked again.',
    rough: 'None of today\'s calls held. You made all {total} of them, so the {day} is closed rather than abandoned.',
  },
  junior: {
    clean: 'You got every question right today.',
    worked: 'You got them all right. One took two tries.',
    mixed: 'You got {n} of {total} right today.',
    rough: 'Today did not go your way. You finished it anyway.',
  },
};

const pick = (bank, seed) => (bank.length ? bank[Math.floor(seeded(seed) * bank.length) % bank.length] : '');

/**
 * Whether the mission's own takeaway can be the last line of this card.
 *
 * **Senior only, and that is the considered answer rather than the easy one.**
 * The takeaway is the one sentence on this card written for a different surface
 * — the plan and the log — at the demand its own course sets, and 41 of the 143
 * junior takeaways carry a 19-to-23-word sentence, usually joined on a
 * semicolon. Printing one undoes the register the rest of the card is written
 * in: rule 3 arriving through authored content instead of through a bank of
 * lines, which is this repo's nine-times-paid-for failure exactly.
 *
 * The tempting fix is to take it when it measures short enough. That needs a
 * syllable count inside `engine/core`, and the engine deliberately imports
 * nothing from `tools/` — a second copy of `SYL` drifts from the first the day
 * either is corrected. So the junior and primary cards end on the compliment,
 * which for a seven-year-old is the better last line anyway; the day's teaching
 * is in the verdicts, where this engine already puts it.
 *
 * `words < 5` is the other refusal, and it is not hypothetical: Hospital's
 * fifteen mission takeaways all read "Shift complete", and "Carry this into
 * shift 4: Shift complete" is worse than ending on what somebody just said.
 */
export function carryFits(takeaway, reg){
  if(reg !== 'senior') return false;
  return String(takeaway ?? '').trim().split(/\s+/).filter(Boolean).length >= 5;
}

/**
 * One line, with the day's facts in it.
 *
 * Exported because the one rule in here that a bank of strings cannot enforce
 * is rule 3: **a junior card interpolates no question title.** The titles are
 * written at the parent course's reading level, and one of them dropped into a
 * short sentence undoes the register on its own — invisible to every content
 * gate, because the title is perfectly correct where it was authored. Keeping
 * that decision in the banks would mean the guard is only exercised when
 * somebody happens to write a junior line with `{title}` in it, and a refusal
 * nothing exercises is a comment.
 */
export function fillSlots(template, f = {}){
  const quoted = (t) => (f.junior ? 'it' : (t ? `"${t}"` : 'it'));
  return String(template ?? '')
    .replace(/\{n\}/g, String(f.n ?? 0))
    .replace(/\{total\}/g, String(f.total ?? 0))
    .replace(/\{day\}/g, String(f.day ?? 'day'))
    .replace(/\{area\}/g, String(f.area ?? ''))
    .replace(/\{title\}/g, quoted(f.title))
    .replace(/\{missed\}/g, quoted(f.missed));
}

/**
 * The whole card, as data and as markup.
 *
 * Pure: no DOM, no `getState`, no theme import — so `engine/dev/dayDebrief.mjs`
 * can walk all 29 campaigns and every day of each without a browser.
 *
 * @param content  the theme's normalised content block
 * @param state    the campaign, at the moment the day closes
 * @param opts     { dayNoun, grade, lastDay }
 */
export function dayDebrief(content, state, opts = {}){
  const rows = dayRows(content, state);
  const tier = tierOf(rows);
  const week = state?.week ?? 1;
  const total = rows.length;
  const right = rows.filter(r => r.correct).length;
  const grade = Number.isFinite(opts.grade) ? opts.grade : 13;
  const reg = registerFor(grade);
  const day = String(opts.dayNoun ?? 'day').toLowerCase();
  const mission = (content?.MISSIONS ?? [])[week - 1];

  const held = rows.find(r => r.correct);
  const lost = rows.find(r => !r.correct);
  const groups = content?.GROUPS ?? [];
  const areaOf = (id) => String(groups.find(g => g.id === id)?.name ?? id ?? '');

  const people = speakersFor(content, state, rows);

  const fill = (s, who) => fillSlots(s, {
    n: right, total, day, junior: reg !== 'senior',
    area: areaOf(who?.group ?? held?.group ?? lost?.group),
    title: held?.title || lost?.title || '',
    missed: lost?.title || held?.title || '',
  });

  // A day that asked nothing has nothing to say about how it went, and every
  // lede here is a claim about calls that were made. `tierOf` calls it clean
  // because there is nothing wrong with it, which is not the same as somebody
  // having done well — so the card carries the day's own lesson and no praise.
  // What happened today, and what it forces tomorrow — authored, and read
  // first, before a word of compliment. See rule 11 in STORY_SPEC.md: a segue
  // is a But or a Therefore, never an "and then", and the thing pushing back
  // is the situation the player is in, never another named person.
  const segue = !opts.lastDay ? String(mission?.segue ?? '').trim() : '';
  const segueHTML = segue ? `<p class="debriefSegue">${esc(segue)}</p>` : '';

  if(!total){
    const only = carryFits(mission?.takeaway, reg) && !opts.lastDay
      ? `Carry this into ${day} ${week + 1}: ${mission.takeaway}` : '';
    const body = segueHTML + (only ? `<p class="debriefCarry">${esc(only)}</p>` : '');
    return { tier, right: 0, total: 0, lede: '', quotes: [], carry: only, segue,
             html: body ? `<div class="briefBox debrief debrief-${tier}">${body}</div>` : '' };
  }

  const lede = fill(LEDE[reg][tier]);
  const quotes = [];
  if(people[0]){
    quotes.push({
      name: people[0].name,
      role: citeRole(people[0].role),
      line: fill(pick(LINES[reg][tier], week * 13 + 1), people[0]),
    });
  }
  const secondBank = SECOND[reg][tier] ?? [];
  if(people[1] && secondBank.length){
    quotes.push({
      name: people[1].name,
      role: citeRole(people[1].role),
      line: fill(pick(secondBank, week * 23 + 7), people[1]),
    });
  }

  // The last thing read is what the day was for, not a number. A card that ends
  // on "2 of 3" has not said what the two bought anybody. On the final day it
  // ends on nothing: the campaign's own `ending` is the next card up.
  //
  // The takeaway is the mission's own authored sentence and it is the one thing
  // on this card written for a different surface, so it is taken only when it
  // fits. Two refusals, both found by the sweep:
  //
  //   * Hospital's fifteen mission takeaways read "Shift complete" — a stub, and
  //     "Remember this: Shift complete" is worse than ending on the compliment.
  //   * 41 of 143 junior takeaways carry a sentence of 19 to 23 words, usually
  //     joined on a semicolon. Printing one undoes the register the rest of the
  //     card is written in, which is rule 3 arriving through authored content
  //     rather than through a bank of lines.
  //
  // Dropped rather than shortened, because shortening somebody's sentence by
  // rule is how a takeaway stops saying what it was written to say.
  const carry = opts.lastDay || !carryFits(mission?.takeaway, reg)
    ? ''
    : `${reg === 'senior' ? 'Carry this into ' + day + ' ' + (week + 1) : 'Remember this'}: ${mission.takeaway}`;

  const html =
    `<div class="briefBox debrief debrief-${tier}">`
    + segueHTML
    + `<p class="debriefLede">${esc(lede)}</p>`
    + quotes.map(q =>
        `<blockquote class="debriefQuote"><p>${esc(q.line)}</p>`
        + `<cite>${esc(q.name)}, ${esc(q.role)}</cite></blockquote>`).join('')
    + (carry ? `<p class="debriefCarry">${esc(carry)}</p>` : '')
    + `</div>`;

  return { tier, right, total, lede, quotes, carry, segue, html };
}
