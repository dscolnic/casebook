// dayDebrief.mjs — the day-close card, checked on every day of every campaign.
//
//   node engine/dev/dayDebrief.mjs <theme>
//   node engine/dev/dayDebrief.mjs --selftest
//   node engine/dev/dayDebrief.mjs --show <theme>     print the cards
//
// `engine/core/debrief.js` composes a closing card from the day's own results
// and puts a named person's compliment on it. Nothing about that is authored, so
// no content gate reads it: this is the only thing that does.
//
// **Four properties, not a table of expected strings.** A table would be a
// second copy of the wording and would have to be edited every time a line is
// improved, which is how a gate stops being read.
//
//   1. **Every day of every campaign produces a whole card** — a lede, at least
//      one quote, and a speaker cited with the job attached. `introRule` is the
//      rule for authored prose and this is a surface with names on it.
//   2. **The praise matches what happened.** A day where nothing held must not
//      carry a line from the clean bank, and the count in the lede must be the
//      count of calls that actually held. This is the whole reason the file
//      exists: a card that congratulates every day teaches a player that the
//      praise is noise, and a child praised for a wrong answer has been taught
//      the same thing about being right.
//   3. **The register follows `audience.grade`.** At grade 8 and below the card
//      reads at or under the theme's own grade, no sentence runs long, and no
//      question title is interpolated — the titles are written at the parent
//      course's level and one of them undoes the register on its own. This is
//      the failure this repo has paid for nine times: the prose comes down and
//      the demand stays where an AP course put it.
//   4. **It varies over a campaign.** Fifteen identical cards is one card shown
//      fifteen times. A campaign of clean days has to reach several speakers and
//      several lines, or the acknowledgement is wallpaper by day 3.
//
// It also refuses an unfilled slot (`{n}` reaching a screen) and the word
// "tomorrow", because a submarine runs watches and Red Sand runs sols.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeNames, themeDir } from './registry.mjs';
import { dayDebrief, tierOf, citeRole, dayRows, fillSlots } from '../core/debrief.js';
import { readingStats } from '../../tools/readability.js';

const JUNIOR_AT_OR_BELOW = 8;
const PRIMARY_AT_OR_BELOW = 3;
// A card is 30–70 words, and `fleschKincaid` declines under 25 — so the grade is
// read off the card's prose as a whole and the per-sentence rule is a word count,
// which is the term that actually bites (see the opening-card sweep).
const JUNIOR_MAX_SENTENCE = 18;
const PRIMARY_MAX_SENTENCE = 14;

const strip = (html) => String(html ?? '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim();

/**
 * A campaign's state at the close of day `week`, with a chosen outcome.
 *
 * The four tiers are the four things a day can be, and every one of them has to
 * be checked on every real campaign: `mixed` and `rough` are the ones an author
 * never sees while testing, because a person checking their own game answers
 * their own questions correctly.
 */
export function stateFor(content, week, tier){
  const stops = ((content.MISSIONS ?? [])[week - 1]?.stops ?? []);
  const missionResults = {};
  const hints = {};
  stops.forEach((s, i) => {
    const correct = tier === 'clean' || tier === 'worked' ? true
      : tier === 'rough' ? false
      : i > 0;                                  // mixed: the first call missed
    missionResults[`${week}-${i}`] = { group: s.group, correct, lesson: s.lesson };
    if(tier === 'worked' && i === 0) hints[`${week}-${s.group}`] = true;
  });
  return { week, status: 'playing', missionResults, hints, retries: {} };
}

/** Every complaint about one campaign's closing cards. */
export function debriefRows(content, opts){
  const rows = [];
  const grade = Number.isFinite(opts?.grade) ? opts.grade : 13;
  const junior = grade <= JUNIOR_AT_OR_BELOW;
  const maxSentence = grade <= PRIMARY_AT_OR_BELOW ? PRIMARY_MAX_SENTENCE : JUNIOR_MAX_SENTENCE;
  const dayNoun = opts?.dayNoun ?? 'Day';
  const days = (content.MISSIONS ?? []).length;
  const titles = new Set();
  for(const list of Object.values(content.CURRICULUM ?? {}))
    for(const l of (list ?? [])) if(l?.title) titles.add(String(l.title));

  const seenClean = new Set();
  for(let week = 1; week <= days; week++){
    for(const tier of ['clean', 'worked', 'mixed', 'rough']){
      const state = stateFor(content, week, tier);
      const stops = (content.MISSIONS ?? [])[week - 1]?.stops ?? [];
      // A one-call day cannot be mixed, and a day with no calls is not a day.
      if(!stops.length) continue;
      if(tier === 'mixed' && stops.length < 2) continue;
      const d = dayDebrief(content, state, { dayNoun, grade, lastDay: week >= days });
      const text = strip(d.html);
      const where = `${dayNoun.toLowerCase()} ${week}, ${tier}`;

      // 1 — a whole card
      if(!d.lede) rows.push({ where, why: 'no lede' });
      if(!d.quotes.length) rows.push({ where, why: 'nobody says anything' });
      for(const q of d.quotes){
        if(!q.name) rows.push({ where, why: 'a quote with no speaker' });
        if(!q.role) rows.push({ where, why: `"${q.name}" is cited without the job attached` });
        if(!q.line) rows.push({ where, why: `${q.name} is cited saying nothing` });
        if(!/[.!?]$/.test(q.line.trim()))
          rows.push({ where, why: `${q.name}'s line does not end in a full stop: "${q.line}"` });
      }
      if(/[{}]/.test(text)) rows.push({ where, why: `an unfilled slot reached the card: ${text.match(/\{[^}]*\}?/)?.[0]}` });
      if(/\btomorrow\b/i.test(text))
        rows.push({ where, why: `"tomorrow" on a card in a game that counts in ${dayNoun.toLowerCase()}s` });

      // 2 — the praise matches the day
      const expect = tierOf(dayRows(content, state));
      if(expect !== tier) rows.push({ where, why: `graded ${expect}, not ${tier}` });
      const held = dayRows(content, state).filter(r => r.correct).length;
      if(d.right !== held) rows.push({ where, why: `card says ${d.right} held, ${held} did` });
      if(tier === 'rough' && /\bwell done\b|\bgood work\b|\bevery one right\b|\bhold\b/i.test(text))
        rows.push({ where, why: `a day where nothing held reads as praise: "${text.slice(0, 90)}"` });
      if(tier === 'mixed' && new RegExp(`\\b${d.total} of ${d.total}\\b`).test(text))
        rows.push({ where, why: 'a mixed day claims every call held' });
      // A four-call day can miss two, so a line naming "the other one" is a
      // sentence that is true on a three-call day and wrong on the next one.
      if(tier === 'mixed' && d.total - d.right > 1 && /\bthe other one\b/i.test(text))
        rows.push({ where, why: `${d.total - d.right} calls missed, and the card names "the other one"` });

      // 3 — the register.
      //
      // Measured over the card's *prose* — the lede, what each person says, and
      // the carry line — never over the concatenated card. The first version
      // stripped the markup and measured the string, and a `<cite>` carries no
      // full stop, so "That is a good watch." + "Machinist's Mate Ruth Hallam,
      // Auxiliary Division, Pumps & Patches" + the next paragraph read as one
      // 25-word sentence. Every junior edition failed on prose whose longest
      // real sentence is nine words. A byline is not a sentence, and a person's
      // rank is not something a reading level may ask to be simplified.
      if(junior){
        const prose = [d.lede, ...d.quotes.map(q => q.line), d.carry].filter(Boolean);
        const st = readingStats(prose.join(' '));
        if(st.fk != null && st.fk > grade + 1)
          rows.push({ where, why: `reads at grade ${st.fk.toFixed(1)} for a grade-${grade} audience` });
        for(const line of prose){
          const one = readingStats(line);
          if(one.longestSentence > maxSentence)
            rows.push({ where, why: `a ${one.longestSentence}-word sentence on a grade-${grade} card: "${line}"` });
        }
        for(const t of titles)
          if(t.length > 12 && text.includes(t))
            rows.push({ where, why: `a question title written for the parent course is quoted on a junior card: "${t}"` });
      }

      // 4 — variation, gathered over the clean days and judged after the loop
      if(tier === 'clean' && d.quotes[0])
        seenClean.add(`${d.quotes[0].name}|${d.quotes[0].line}`);
    }
  }
  // Three is the floor rather than `days`, because a campaign whose every day
  // works one area honestly has one person to hear from — the card should still
  // not be the same sentence every time.
  const want = Math.min(3, days);
  if(days >= 3 && seenClean.size < want)
    rows.push({ where: 'the campaign', why: `${days} clean days produce only ${seenClean.size} distinct compliment${seenClean.size === 1 ? '' : 's'}` });
  return rows;
}

async function themeOf(name){
  const theme = (await import(pathToFileURL(resolve(themeDir(name), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return { theme, content };
}

async function show(names){
  for(const name of names){
    const { theme, content } = await themeOf(name);
    console.log(`\n=== ${name} (grade ${theme.audience?.grade ?? '?'}) ===`);
    const days = (content.MISSIONS ?? []).length;
    for(const week of [1, Math.ceil(days / 2), days]){
      for(const tier of ['clean', 'worked', 'mixed', 'rough']){
        const d = dayDebrief(content, stateFor(content, week, tier), {
          dayNoun: theme.dayNoun ?? 'Day', grade: theme.audience?.grade, lastDay: week >= days });
        console.log(`\n-- ${theme.dayNoun ?? 'Day'} ${week} · ${tier}`);
        console.log(`   ${d.lede}`);
        for(const q of d.quotes) console.log(`   “${q.line}” — ${q.name}, ${q.role}`);
        if(d.carry) console.log(`   ${d.carry}`);
      }
    }
  }
}

async function run(){
  const args = process.argv.slice(2);
  if(args.includes('--selftest')) return selftest();
  const only = args.filter(a => !a.startsWith('--'));
  const names = only.length ? only : themeNames();
  if(args.includes('--show')) return show(names.length ? names : themeNames());

  let failed = 0;
  for(const name of names){
    let loaded;
    try{ loaded = await themeOf(name); }
    catch(e){ console.log(`${name}: could not load — ${e.message}`); failed++; continue; }
    const rows = debriefRows(loaded.content, {
      grade: loaded.theme.audience?.grade,
      dayNoun: loaded.theme.dayNoun ?? 'Day',
    });
    if(rows.length){
      failed++;
      console.log(`\n${name}: ${rows.length} problem${rows.length > 1 ? 's' : ''} with the closing card`);
      for(const r of rows.slice(0, 12)) console.log(`  ${r.where}: ${r.why}`);
      if(rows.length > 12) console.log(`  … ${rows.length - 12} more`);
    }
  }
  if(!failed) console.log(`dayDebrief: ${names.length} theme${names.length > 1 ? 's' : ''} — every day closes on an earned card, and somebody says so`);
  process.exit(failed ? 1 : 0);
}

// ----------------------------------------------------------------- selftest
//
// Each case was verified by putting the bug back and watching that case, and
// only that case, fail:
//
//   * `tierOf` ignoring `helped` makes a day carried by three hints read as the
//     day nobody had to check (case 2)
//   * bending the authored job into a lowercase sentence turns "NASA Flight
//     Director" into "nASA flight director", which is why the cite takes the
//     role verbatim (case 4)
//   * interpolating a question title into a junior line drags the card two
//     grades and is invisible to every content gate, because the title is
//     correct where it was authored (case 6)
//   * picking the speaker at index 0 gives one voice for fifteen days, which
//     every other property in this file passes (case 7)
//   * a rough day drawing from the clean bank — the defect the whole file is
//     against — passes cases 1 through 5 (case 5)
function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push([name, ok, detail]);

  const lesson = (title) => ({ title, scene: 'x', choices: ['a'], correctChoice: 'a' });
  const content = {
    GROUPS: [{ id: 'A', name: 'Reactor Hall' }, { id: 'B', name: 'Metering' }],
    CURRICULUM: {
      A: [lesson('What the reserve has to cover'), lesson('Second')],
      B: [lesson('Third')],
    },
    ROSTER: [
      { id: 'p1', name: 'Dolores Reyes', role: 'Shift Supervisor, System Operations', division: 'A' },
      { id: 'p2', name: 'Ada Okonkwo', role: 'Metering Technician', division: 'A' },
      { id: 'p3', name: 'Piotr Novak', role: 'NASA Flight Director', division: 'B' },
    ],
    MISSIONS: Array.from({ length: 6 }, (_, i) => ({
      title: `Day ${i + 1}`,
      takeaway: 'A reserve is bought with something.',
      stops: [{ group: 'A', lesson: 0 }, { group: 'A', lesson: 1 }, { group: 'B', lesson: 0 }],
    })),
  };
  const card = (week, tier, grade) => dayDebrief(content, stateFor(content, week, tier),
    { dayNoun: 'Day', grade, lastDay: false });

  // 1 — a whole card on every tier
  const whole = ['clean', 'worked', 'mixed', 'rough'].every(t => {
    const d = card(1, t, 13);
    return d.lede && d.quotes.length && d.quotes[0].name && !!d.quotes[0].role;
  });
  check('every tier produces a lede, a quote and a cited job', whole);

  // 2 — a hinted day is not a clean day
  const clean = card(1, 'clean', 13);
  const worked = card(1, 'worked', 13);
  check('a day carried by a hint is graded "worked", not "clean"',
    clean.tier === 'clean' && worked.tier === 'worked' && clean.lede !== worked.lede,
    `${clean.tier}/${worked.tier}`);

  // 3 — the count in the lede is the count that held
  const mixed = card(1, 'mixed', 13);
  check('a mixed day reports the calls that actually held',
    mixed.right === 2 && mixed.total === 3 && strip(mixed.html).includes('2 of 3'),
    `${mixed.right} of ${mixed.total}`);

  // 4 — the authored job survives into the cite untouched
  check('the cite carries the authored job verbatim, acronyms and all',
    citeRole('NASA Flight Director') === 'NASA Flight Director'
    && citeRole('  Shift Supervisor, System Operations ') === 'Shift Supervisor, System Operations'
    && (() => { const d = card(1, 'clean', 13);
                return strip(d.html).includes(d.quotes[0].role); })(),
    citeRole('NASA Flight Director'));

  // 5 — a bad day is not congratulated
  const rough = strip(card(1, 'rough', 13).html);
  check('a day where nothing held carries no praise from the clean bank',
    !/\bstands\b|\bthat hold\b|nobody had to check/i.test(rough), rough.slice(0, 60));

  // 6 — the junior register quotes no question title.
  //
  // Asserted against `fillSlots` directly rather than against the shipped banks,
  // because no junior line uses `{title}` today: read through the banks the case
  // passes for the wrong reason and goes on passing after the guard is deleted.
  // The sweep over the real campaigns below is the backstop; this is the rule.
  const AP = 'What the reserve has to cover';
  const facts = { n: 3, total: 3, day: 'day', area: 'Reactor Hall', title: AP, missed: AP };
  check('a junior line interpolates no question title from the parent course',
    !fillSlots('You had {title} settled, and {missed} with it.', { ...facts, junior: true }).includes(AP)
    && fillSlots('You had {title} settled.', { ...facts, junior: false }).includes(AP),
    fillSlots('You had {title} settled.', { ...facts, junior: true }));
  const jr = ['clean', 'worked', 'mixed', 'rough'].map(t => strip(card(2, t, 6).html));
  check('and no shipped junior card carries one either',
    jr.every(t => !t.includes(AP)), jr.find(t => t.includes(AP)) ?? '');
  const jrLines = ['clean', 'worked', 'mixed', 'rough']
    .flatMap(t => { const d = card(2, t, 6); return [d.lede, ...d.quotes.map(q => q.line), d.carry]; })
    .filter(Boolean);
  check('every junior sentence is short',
    jrLines.every(l => readingStats(l).longestSentence <= JUNIOR_MAX_SENTENCE),
    String(Math.max(...jrLines.map(l => readingStats(l).longestSentence))));
  // The byline is not prose. Measuring the stripped card instead of its lines
  // reads a rank and a division as the front of the next sentence, which failed
  // all thirteen junior editions on nine-word prose.
  const longRole = {
    ...content,
    ROSTER: content.ROSTER.map(p => ({ ...p, role: "Machinist's Mate Second Class, Auxiliary Division, Pumps and Patches" })),
  };
  const lr = dayDebrief(longRole, stateFor(longRole, 2, 'clean'), { dayNoun: 'Day', grade: 6, lastDay: false });
  check('a cited rank is not measured as part of a sentence',
    readingStats(strip(lr.html)).longestSentence
      > Math.max(...[lr.lede, ...lr.quotes.map(q => q.line)].map(l => readingStats(l).longestSentence)),
    `${readingStats(strip(lr.html)).longestSentence} vs `
      + `${Math.max(...[lr.lede, ...lr.quotes.map(q => q.line)].map(l => readingStats(l).longestSentence))}`);

  // 7 — six clean days are not six copies of one card
  const said = new Set(Array.from({ length: 6 }, (_, i) => {
    const d = card(i + 1, 'clean', 13);
    return `${d.quotes[0].name}|${d.quotes[0].line}`;
  }));
  check('a campaign of clean days reaches several compliments', said.size >= 3, `${said.size} of 6`);

  // 8a — a day that asked nothing is not congratulated. `tierOf` calls it clean
  //      because nothing is wrong with it, which is not somebody having done well.
  const empty = { ...content, MISSIONS: [{ title: 'x', takeaway: content.MISSIONS[0].takeaway, stops: [] }] };
  const none = dayDebrief(empty, { week: 1, missionResults: {} }, { dayNoun: 'Day', grade: 13, lastDay: false });
  check('a day with no calls is not told every call held',
    none.lede === '' && !none.quotes.length && !/held|right/i.test(none.html), strip(none.html));

  // 8 — the last day hands over no takeaway to carry into a day that does not exist
  const last = dayDebrief(content, stateFor(content, 6, 'clean'), { dayNoun: 'Day', grade: 13, lastDay: true });
  check('the final card carries nothing forward', last.carry === '', last.carry);

  // 9 — the sweep itself finds a real defect. Without this the file could pass
  //     every campaign by measuring nothing, which is the mistake this repo has
  //     made often enough to write down.
  const broken = { ...content, ROSTER: content.ROSTER.map(p => ({ ...p, role: '' })) };
  check('the sweep fails a campaign whose roster carries no jobs',
    debriefRows(broken, { grade: 13, dayNoun: 'Day' }).some(r => /without the job attached|no speaker|says nothing|nobody says/.test(r.why)));
  check('the sweep passes the campaign that is right',
    debriefRows(content, { grade: 13, dayNoun: 'Day' }).length === 0,
    JSON.stringify(debriefRows(content, { grade: 13, dayNoun: 'Day' }).slice(0, 3)));

  let bad = 0;
  for(const [name, ok, detail] of cases){
    if(!ok) bad++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail && !ok ? ` — ${detail}` : ''}`);
  }
  console.log(bad ? `\n${bad} of ${cases.length} failed` : `\nall ${cases.length} cases pass`);
  process.exit(bad ? 1 : 0);
}

run();
