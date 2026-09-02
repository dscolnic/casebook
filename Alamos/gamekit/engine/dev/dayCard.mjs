// dayCard.mjs — the day-opening blurb a player actually reads, and how many
// sentences it runs to.
//
// `missionSheet` in tools/make-book.mjs and this file used to carry two copies
// of the same dedup rule ("some books write the same sentence into two of
// `stake`/`briefing`/`objective`; print each distinct one once") — the exact
// mistake alamos-measurement warns about. This is the one copy; the print book
// and the shape gate both import it.
//
// What counts as "the opening blurb": `stake` (or `briefing`/`objective` if a
// book has no `stake`), plus `briefing` again only when it says something
// `stake` did not already say. `objective` gets its own labelled "What you
// decide" block on the page and in the game, so it is never counted here even
// when it is the thing a book leans on.

/** `stake` and `briefing`, deduped against each other and against `objective`. */
export function dayBlurb(m) {
  const said = new Set();
  const once = (v) => {
    const k = String(v ?? '').trim();
    if (!k || said.has(k)) return '';
    said.add(k);
    return k;
  };
  const stake = once(m.stake) || once(m.briefing) || once(m.objective) || '';
  const briefing = m.briefing && m.briefing !== m.objective ? once(m.briefing) : '';
  return { stake, briefing };
}

/** Sentences, split the same way THREE_PASS_BRIEF.md's own counting script does. */
export function sentencesOf(text) {
  const s = String(text ?? '').trim();
  if (!s) return [];
  return s.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
}

/** How many sentences the opening blurb (stake + any distinct briefing) runs to. */
export function blurbSentenceCount(m) {
  const { stake, briefing } = dayBlurb(m);
  return sentencesOf([stake, briefing].filter(Boolean).join(' ')).length;
}

/** How many sentences an opening card runs to. `opening` is an array of paragraphs. */
export function openingSentenceCount(paras) {
  const card = (paras ?? []).filter((p) => String(p ?? '').trim()).join(' ').trim();
  return sentencesOf(card).length;
}

/** How many sentences a warm-up card runs to. Its `why` is the card. */
export function warmupSentenceCount(w) {
  return sentencesOf(String(w?.why ?? '')).length;
}

/**
 * The three card caps, in one place so a reader can see they are one rule with
 * three settings. They step down with how often the card is read and how little
 * of the player's attention it is entitled to: the opening card is read once and
 * carries four beats, a day card is read fifteen times and carries one, and a
 * warm-up card is read standing in the world with a run about to start.
 */
export const DAY_BLURB_SENTENCE_CAP = 4;
export const OPENING_SENTENCE_CAP = 5;
export const WARMUP_SENTENCE_CAP = 1;

/**
 * The selftest, and the pairs are the whole point.
 *
 * Two caps count sentences here: the day blurb's four and the opening card's
 * five. They lived in two files with two regexes, and the failure that shape
 * produces is a card that passes one gate and fails the other on nothing but
 * punctuation — so the equality cases below are the ones that matter, not the
 * boundaries.
 *
 * Both counters are exported from here for that reason — `openingSentenceCount`
 * for the card and `blurbSentenceCount` for the day — so there is no second
 * regex for either to drift from.
 *
 * PUT THE BUG BACK to see it work. Split on a bare `.` instead of
 * `(?<=[.!?])\s+` and "3.9 tonnes" becomes two sentences: the decimal case
 * fails and only it. Give `openingSentenceCount` its own splitter and the
 * "one splitter, two caps" case fails and only it.
 */
export function cardCapsSelftest() {
  const cases = [];
  const eq = (name, a, b) => cases.push({ name, ok: a === b, saw: `${a} vs ${b}` });
  const is = (name, got, want) => cases.push({ name, ok: got === want, saw: `${got}, wanted ${want}` });

  const five = 'The intake is shut. Nobody knows what burned. You are the officer who decides '
    + 'what gets measured. Fifteen days, and the state has to accept one package. The city is '
    + 'drinking its reserves.';

  // The pair the split exists for: the opening counter and the day counter are
  // the same function, so identical prose has to score identically.
  eq('one splitter, two caps: the same prose scores the same',
    openingSentenceCount([five]), blurbSentenceCount({ stake: five }));

  // And a paragraph list is not a sentence boundary: the card the gate reads is
  // the paragraphs joined, so splitting one card into two paragraphs at a
  // sentence end cannot change the count.
  eq('two paragraphs count as the sentences they contain',
    openingSentenceCount([five]),
    openingSentenceCount([five.slice(0, five.indexOf('. ') + 1), five.slice(five.indexOf('. ') + 2)]));
  // And a paragraph break is not itself a full stop. Joining the paragraphs with
  // anything but a space invents a sentence here, which would let a one-sentence
  // card in two paragraphs read as two.
  is('a paragraph break is not a sentence boundary',
    openingSentenceCount(['The intake is shut and nobody', 'knows what burned']), 1);

  // A number is not a full stop.
  is('a decimal does not end a sentence', sentencesOf('It holds 3.9 tonnes today.').length, 1);
  // Neither does a colon — the pile-up gate learned this the expensive way.
  is('a colon does not end a sentence', sentencesOf('Two things are true: it is late.').length, 1);
  // Whitespace is not content: the same five sentences wrapped over lines are five.
  eq('wrapping does not add sentences',
    sentencesOf(five).length, sentencesOf(five.replace(/ /g, '\n')).length);
  // A briefing that only repeats the stake adds nothing, so the count cannot move.
  eq('a briefing that repeats the stake is not counted twice',
    blurbSentenceCount({ stake: five }), blurbSentenceCount({ stake: five, briefing: five }));

  // And the boundaries, in the direction each cap fails.
  is('five sentences is at the opening cap', openingSentenceCount([five]), OPENING_SENTENCE_CAP);
  cases.push({ name: 'six sentences is over it',
    ok: sentencesOf(`${five} Somebody has to sign it.`).length > OPENING_SENTENCE_CAP,
    saw: String(sentencesOf(`${five} Somebody has to sign it.`).length) });
  cases.push({ name: 'a five-sentence day blurb is over the day cap',
    ok: blurbSentenceCount({ stake: five }) > DAY_BLURB_SENTENCE_CAP,
    saw: String(blurbSentenceCount({ stake: five })) });

  // The warm-up card, counted the same way. Its `why` is the whole card, and one
  // long sentence is at the cap while two short ones are over it — the cap is
  // about how many things the reader is asked to hold, not how many words.
  const oneLong = 'Farrow wants you known to both gate crews before the first switching order '
    + 'goes out tonight, because a stranger in the yard at three in the morning is a delay.';
  is('one long sentence is at the warm-up cap',
    warmupSentenceCount({ why: oneLong }), WARMUP_SENTENCE_CAP);
  cases.push({ name: 'two short sentences are over it',
    ok: warmupSentenceCount({ why: 'Meet the crews. It matters tonight.' }) > WARMUP_SENTENCE_CAP,
    saw: String(warmupSentenceCount({ why: 'Meet the crews. It matters tonight.' })) });
  is('a warm-up with no why counts nothing rather than one',
    warmupSentenceCount({ title: 'Known to both crews' }), 0);
  eq('a warm-up card is counted by the same splitter as the others',
    warmupSentenceCount({ why: five }), openingSentenceCount([five]));

  for (const c of cases) console.log(`  ${c.ok ? '✓' : '✗'} ${c.name}`);
  const bad = cases.filter((c) => !c.ok);
  if (bad.length) {
    console.log(`\n✗ card caps: ${bad.length} of ${cases.length} case(s) wrong`);
    for (const c of bad) console.log(`  ✗ ${c.name}: ${c.saw}`);
    process.exit(1);
  }
  console.log(`dayCard --selftest: ${cases.length} cases, and one splitter serves all three caps.`);
}

if (process.argv.includes('--selftest')) cardCapsSelftest();
