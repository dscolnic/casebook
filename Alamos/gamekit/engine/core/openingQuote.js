// openingQuote.js — the last line of an opening card, said by somebody.
//
// Every one of the eight bibles ends its opening sequence the same way: a named
// person hands the player the thing the campaign produces, and says one sentence
// about who is depending on it.
//
//   Board Chair Mara Venn hands you the empty Rate Book and says, "Fifteen days
//   from now, every family in Halvern must wake to wages, savings, prices, and
//   payments they can trust: build the changeover that gets them there."
//
// Printed as the fourth paragraph of a block of prose that is the only thing on
// the screen, it is a sentence about a person. Printed the way the game prints
// every other line of speech — a face, a name, a job, the words — it is the
// person, and it is the last thing read before the first day starts.
//
// NOTHING IS REWRITTEN. The words are the bible's, the name is the bible's, and
// a card whose last sentence is not somebody speaking is left exactly as it was.
//
//   node engine/core/openingQuote.js --selftest
import { esc } from './utils.js';
import { portraitSvg } from './portrait.js';

/**
 * Sentences, split the way `bible-lint` splits them: a terminator followed by a
 * capital or an opening quote. The closing quote counts as a terminator, because
 * these sentences END in one and the next paragraph would otherwise be glued on.
 */
const sentences = (s) => String(s ?? '')
  .split(/(?<=[.!?][”"']?)\s+(?=[A-Z"“(])/)
  .map(x => x.trim()).filter(Boolean);

/** The quoted span, in either kind of quotation mark. */
const QUOTED = /[“"]([^”"]{20,})[”"]\s*$/;

/**
 * Who is speaking, out of the words in front of the quote.
 *
 * THE ROSTER IS ASKED FIRST, and that is the whole of the matching. The lead-in
 * carries a job title as often as not — "Board Chair Mara Venn", "Mara Vale, dam
 * operations chief" — so a rule that takes the capitalised words gets "Board
 * Chair" as readily as the name. Every one of the eight names somebody who is on
 * the roster, which makes the roster both the correct answer and the check: a
 * lead-in naming nobody the game knows is left as prose rather than guessed at,
 * because a portrait over the wrong name is worse than no portrait.
 */
function speakerIn(lead, roster){
  let best = null;
  for(const p of roster ?? []){
    const name = String(p?.name ?? '').trim();
    if(!name || !lead.includes(name)) continue;
    if(!best || name.length > String(best.name).length) best = p;
  }
  return best;
}

/**
 * An opening, split into what stays prose and what is said.
 *
 * Returns `{ body, said }`. `said` is null whenever anything is not as expected —
 * no quote, no roster name, a quote that is the whole paragraph — and then `body`
 * is the opening exactly as it arrived. Every caller has to handle that, because
 * it is the normal case for any campaign whose bible ends differently.
 */
export function splitOpening(paragraphs, roster){
  const body = (paragraphs ?? []).map(p => String(p ?? ''));
  if(!body.length) return { body, said: null };

  const last = body[body.length - 1];
  const parts = sentences(last);
  if(!parts.length) return { body, said: null };

  const tail = parts[parts.length - 1];
  const m = QUOTED.exec(tail);
  if(!m) return { body, said: null };

  const lead = tail.slice(0, m.index);
  const person = speakerIn(lead, roster);
  if(!person) return { body, said: null };

  // The paragraph without its last sentence. A paragraph that was ONLY the
  // quote leaves nothing behind, and an empty paragraph is dropped rather than
  // printed as a gap.
  const rest = parts.slice(0, -1).join(' ').trim();
  const kept = body.slice(0, -1);
  if(rest) kept.push(rest);

  return { body: kept, said: { person, say: m[1].trim() } };
}

/**
 * The speech, as the game draws speech everywhere else: `beatSaid` markup, so it
 * inherits the same face, name, role and italic quote the verdict card uses. One
 * description of what a person saying something looks like.
 */
export function quoteHTML(said){
  if(!said?.person) return '';
  const p = said.person;
  const role = p.role ? `<span class="beatRole">${esc(String(p.role).split(';')[0].trim())}</span>` : '';
  return `<div class="beatSaid openingSaid">`
    + `<span class="beatFace" aria-hidden="true">${portraitSvg({ id: p.id, name: p.name }, p.color)}</span>`
    + `<div class="beatBody"><div class="beatWho">${esc(p.name)}${role}</div>`
    + `<p class="beatSay beatQuote">${esc(said.say)}</p></div></div>`;
}

// --------------------------------------------------------------- the selftest
//
// The cases that matter are the ones where this must do NOTHING. A card whose
// last sentence is not speech, or whose speaker is not on the roster, has to come
// back whole — a split that half-fires would drop a sentence off the only screen
// the player reads before the campaign starts.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };
  const ROSTER = [{ id: 'venn', name: 'Mara Venn', role: 'Board Chair and mission authority' },
                  { id: 'hart', name: 'Maya Hart', role: 'park operations lead' }];

  // 1 — the shape all eight bibles write
  const one = splitOpening([
    'Kesteven House holds the Currency Board.',
    'Board Chair Mara Venn hands you the empty Rate Book and says, “Fifteen days from now, every family must wake to prices they can trust.”',
  ], ROSTER);
  check('the speaker is found on the roster', one.said?.person?.id === 'venn');
  check('the quote is the words inside the marks',
        one.said?.say === 'Fifteen days from now, every family must wake to prices they can trust.',
        JSON.stringify(one.said?.say));
  check('the paragraph that was only the quote is gone', one.body.length === 1,
        `${one.body.length} paragraph(s) left`);
  check('and the prose before it is untouched', one.body[0] === 'Kesteven House holds the Currency Board.');

  // 2 — a lead-in in the middle of a paragraph keeps the rest of it
  const two = splitOpening([
    'The park has been shut for a year. Maya Hart, the park operations lead, hands you the keys and says, "Every family at that gate is trusting us with someone they love."',
  ], ROSTER);
  check('a mid-paragraph quote still splits', two.said?.person?.id === 'hart');
  check('…and the sentence before it stays', two.body[0] === 'The park has been shut for a year.',
        JSON.stringify(two.body[0]));

  // 3 — THE CASES THAT MUST DO NOTHING
  const noQuote = ['One paragraph.', 'A second one that simply ends.'];
  const a = splitOpening(noQuote, ROSTER);
  check('a card with no quote is returned whole', a.said === null && a.body.length === 2);
  check('…with its last sentence still in it', a.body[1] === 'A second one that simply ends.');

  const stranger = splitOpening(['Director Someone Else hands you the file and says, “A line nobody on the roster said.”'], ROSTER);
  check('a speaker nobody knows is left as prose', stranger.said === null,
        'a portrait over the wrong name is worse than no portrait');
  check('…and the sentence is still on the card', stranger.body.length === 1);

  const empty = splitOpening([], ROSTER);
  check('an empty opening is not an error', empty.said === null && empty.body.length === 0);

  const noRoster = splitOpening(['Board Chair Mara Venn says, “Something.”'], []);
  check('no roster at all means no quote', noRoster.said === null);

  // 4 — the markup is the same one the verdict card uses
  const html = quoteHTML(one.said);
  check('the quote is drawn as speech, with a face',
        /beatSaid/.test(html) && /beatFace/.test(html) && /beatQuote/.test(html));
  check('the job title is trimmed at the semicolon',
        /Board Chair and mission authority/.test(html) === true);
  check('nothing is drawn for a card with no quote', quoteHTML(null) === '');

  console.log(fails.length
    ? `\nopeningQuote --selftest: ${fails.length} case(s) failed.\n  ${fails.join('\n  ')}`
    : `\nopeningQuote --selftest: ${ran} cases, the last line is said by somebody or the card is left alone.`);
  process.exitCode = fails.length ? 1 : 0;
}
