// delivery.js — what the fortnight is FOR, and where the parts of it are kept.
//
// A campaign was fifteen days of correct answers with nothing between them. The
// opening card said what was at stake, each day's card said what was owed that
// morning, and the ending said how it turned out — and in between, a day that
// closed left behind nothing the player could go and look at. The only record of
// twelve days of work was the week number in the corner of the HUD.
//
// So a campaign now names one thing it is building. `theme.delivery` in the
// manifest:
//
//   delivery: {
//     name:   'The Winter Readiness Case',      // the thing itself
//     what:   'one sentence: who receives it, and what it lets them do',
//     where:  'OPS',                            // group id — whose room holds it
//     pieces: [ 'The reserve margin page', ... ] // one per mission, in order
//   }
//
// Three surfaces read it, and each answers a different question:
//
//   · the opening card names the delivery, so day 1 knows what day 15 produces;
//   · the day-close card hands over that day's piece, so a day amounts to
//     something that outlives its own debrief;
//   · one room holds all of them, so "how far through this am I" is answered by
//     walking somewhere and looking rather than by counting days.
//
// **Nothing here is stored.** A piece is earned when its day's calls are all
// answered, which `missionResults` already records — keyed `${week}-${stop}`,
// cleared for a day that is retaken or jumped to. Adding `state.pieces` would be
// a second description of the same fact, and the two would disagree the first
// time a day was retaken: this repo's rule about two copies of one rule, arriving
// through a save file rather than through a checker.
//
// Pure: no DOM, no `getState`, no theme import, so `engine/dev/delivery.mjs` can
// walk every campaign and every day of each without a browser.
import { esc } from './utils.js';
// The same three registers the debrief uses, and from the same place: two copies
// of "who is this written for" drift the first time either is corrected.
import { registerFor } from './debrief.js';

/**
 * Every piece of the delivery, in order, with what the player has done about it.
 *
 * `earned` is the day having been closed out — every call answered. `held` is the
 * stronger claim that every one of them was right, and the two are deliberately
 * separate for the reason `debrief.js` keeps `clean` and `worked` apart: a day
 * carried by two wrong calls produced its page, and saying so is not the same as
 * saying the page is sound. The exhibit prints the difference; nothing is
 * withheld for it, because the day is over and the work went in.
 */
/**
 * Is this takeaway a sentence, or a stub?
 *
 * The same five-word floor `debrief.js` uses, and for the same reason: fifteen
 * days of "Shift complete" printed under fifteen piece names is a board that
 * teaches the player to stop reading it.
 */
function takeawayFits(t){
  return String(t ?? '').trim().split(/\s+/).filter(Boolean).length >= 5;
}

export function deliveryPieces(theme, state){
  const spec = theme?.delivery;
  if(!spec?.pieces?.length) return [];
  const missions = theme?.content?.MISSIONS ?? [];
  const res = state?.missionResults ?? {};
  return spec.pieces.map((name, i) => {
    const week = i + 1;
    const stops = missions[i]?.stops ?? [];
    const rows = stops.map((_, s) => res[`${week}-${s}`]);
    const earned = stops.length > 0 && rows.every(Boolean);
    return {
      n: week,
      name: String(name ?? ''),
      // The day's own authored sentence. It is what the piece is worth knowing
      // for, and it is already written — a `note:` per piece would be 375 lines
      // of second-guessing the takeaway that is on the day's closing card.
      //
      // Taken only when there is a sentence there, for the reason `debrief.js`
      // refuses the same field: Hospital's fifteen mission takeaways all read
      // "Shift complete", and a board whose every filled cell says that is worse
      // than a board with nothing under the names.
      takeaway: takeawayFits(missions[i]?.takeaway) ? String(missions[i].takeaway) : '',
      title: String(missions[i]?.title ?? ''),
      earned,
      held: earned && rows.every(r => r?.correct),
    };
  });
}

/** How many are in, out of how many there will be. */
export function deliveryProgress(theme, state){
  const pieces = deliveryPieces(theme, state);
  return { got: pieces.filter(p => p.earned).length, total: pieces.length };
}

/** The area, and the place inside it, where the pieces are kept. */
export function deliveryRoom(theme){
  const where = theme?.delivery?.where;
  if(!where) return null;
  const group = (theme?.content?.GROUPS ?? []).find(g => g.id === where) ?? null;
  const site = theme?.site ?? {};
  const place = (site.buildings ?? []).find(b => b.group === where)
             ?? (site.plan?.rooms ?? []).find(r => r.group === where)
             ?? null;
  return { id: where, group, place, name: place?.name || group?.name || where };
}

/**
 * The piece a day produces, before it has been produced.
 *
 * One line at the foot of the plan card. It is the answer to "why am I doing
 * today at all", which the day's stake gives in the fiction and nothing gave in
 * the campaign: the fortnight has a product and this morning is one page of it.
 */
export function deliveryPlanLine(theme, state, { dayNoun = 'Day' } = {}){
  const spec = theme?.delivery;
  const week = state?.week ?? 1;
  const piece = deliveryPieces(theme, state)[week - 1];
  if(!spec || !piece) return '';
  const { got, total } = deliveryProgress(theme, state);
  const room = deliveryRoom(theme)?.name ?? 'the case room';
  const named = piece.name.replace(/^The /, 'the ');
  // Two short sentences, at every reading level. The first version said "Today's
  // work is the parallel path flow map — piece 7 of 15 of The Winter Operating
  // Case", which is three prepositional phrases and a dash before the player has
  // learnt anything: what the line is for is what today adds and how much is
  // already in, and both of those are a count.
  return `Today you add ${named} to ${spec.name}.`
    + ` ${got} of ${total} are on the board in ${room}.`;
}

/**
 * The handover, on the card that closes a day.
 *
 * Under the debrief rather than inside it: the debrief is about how the day went
 * and is composed from the day's results, and this is about what the day left
 * behind, which is true whichever way it went. It is also the one place the
 * campaign's own arithmetic is worth printing — "9 of 15" a fortnight into a
 * campaign is the sentence the week number in the HUD corner never managed to be.
 */
export function deliveryGainHTML(theme, state, { dayNoun = 'Day', grade } = {}){
  const spec = theme?.delivery;
  if(!spec?.pieces?.length) return '';
  const week = state?.week ?? 1;
  const pieces = deliveryPieces(theme, state);
  const piece = pieces[week - 1];
  if(!piece?.earned) return '';
  const got = pieces.filter(p => p.earned).length;
  const total = pieces.length;
  const room = deliveryRoom(theme);
  const day = String(dayNoun).toLowerCase();
  const reg = registerFor(Number.isFinite(grade) ? grade : 13);
  // One clause a sentence below grade 8, and no subordination at all below grade
  // 4. The senior caveat — "what rests on a call that did not hold is marked on
  // the board, and marked again when it is worked through" — is 23 words of
  // subordinate clause, and it went out over Hospital's grade-2 card first time
  // out. This is the same failure as the debrief's, one surface over.
  const caveat = piece.held ? ''
    : `<p class="deliverCaveat">${esc(reg === 'senior'
        ? 'It goes in as it stands. What rests on a call that did not hold is marked on the'
          + ' board, and marked again when it is worked through.'
        : reg === 'junior'
          ? 'One call today did not hold. That part is marked on the board until it is put right.'
          : 'One call did not hold. That part is marked on the board.')}</p>`;
  const left = total - got;
  const count = reg === 'senior'
    ? `${got} of ${total} gathered`
      + (left ? `, ${left} ${day}${left === 1 ? '' : 's'} still to work` : ', and that is the whole of it')
      + `. It is on the board in ${room?.name ?? 'the case room'}.`
    : `${got} of ${total} are on the board in ${room?.name ?? 'the case room'}.`;
  return `<div class="briefBox deliver">`
    + `<p class="deliverLede"><b>${esc(piece.name)}</b> goes into ${esc(spec.name)}.</p>`
    + caveat
    + `<p class="deliverCount">${esc(count)}</p>`
    + `</div>`;
}

/**
 * The board itself, as the panel the player reads standing in front of it.
 *
 * Every piece, earned or not, because a list of nine is a list of what has been
 * done and a list of fifteen with six blanks is a plan. The blanks name their day
 * and nothing else: printing the piece a future day produces is printing the
 * ending of a story the player is halfway through, and printing its takeaway
 * would answer questions they have not been asked yet.
 */
export function deliveryCaseHTML(theme, state, { dayNoun = 'Day', grade } = {}){
  const spec = theme?.delivery;
  if(!spec?.pieces?.length) return '';
  const pieces = deliveryPieces(theme, state);
  const got = pieces.filter(p => p.earned).length;
  const day = String(dayNoun);
  const reg = registerFor(Number.isFinite(grade) ? grade : 13);
  const rows = pieces.map(p => {
    if(!p.earned){
      return `<li class="deliverRow deliverOpen"><span class="deliverNum">${p.n}</span>`
        + `<span class="deliverName">Not yet — ${esc(day.toLowerCase())} ${p.n}</span></li>`;
    }
    return `<li class="deliverRow${p.held ? '' : ' deliverFlagged'}">`
      + `<span class="deliverNum">${p.held ? '✓' : '!'}</span>`
      + `<span class="deliverName"><b>${esc(p.name)}</b>`
      + (p.takeaway ? `<small>${esc(p.takeaway)}</small>` : '')
      + (p.held ? '' : `<small class="deliverWarn">${esc(reg === 'senior'
          ? `${day} ${p.n} closed with a call that did not hold.`
          : `One call on ${day.toLowerCase()} ${p.n} did not hold.`)}</small>`)
      + `</span></li>`;
  }).join('');
  return `<div class="briefBox deliverCase">`
    + (spec.what ? `<p class="deliverWhat">${esc(spec.what)}</p>` : '')
    + `<p class="deliverCount">${got} of ${pieces.length} gathered.</p>`
    + `<ol class="deliverList">${rows}</ol>`
    + `</div>`;
}
