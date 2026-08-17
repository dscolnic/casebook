import theme from './theme.js';

// The save slot is per theme. This was one hardcoded string, which meant every
// game built on the engine wrote over the same slot — starting a second theme
// silently loaded the first one's campaign.
//
// A co-op room gets a slot of its own. `?room=CODE` is a shared campaign several
// people are writing, and pointing it at the theme's own slot would overwrite
// the player's solo game the first time they joined somebody else's — the same
// class of bug as house rule 14, arriving through a different door. This is the
// only place that decides it, so nothing downstream has to know a room exists.
const ROOM = (() => {
  if(typeof location === 'undefined') return null;
  const code = new URLSearchParams(location.search).get('room');
  return code ? code.toUpperCase().replace(/[^A-Z0-9]/g, '') : null;
})();
const KEY = ROOM ? `gamekit_${theme.id}_room_${ROOM}_v1` : `gamekit_${theme.id}_v1`;
// The campaign is as long as the book: one mission is one working day, and the
// last one won is the end of it. This was 15, which is what all four shipped
// games happen to have — a theme with any other number could never reach 'won',
// and its HUD counted toward a day that did not exist.
const WEEKS=theme.content?.MISSIONS?.length || 15;
// What one mission is called, in this game's own words. A mission is a working
// day in the engine and that is what most of them are — but Deep Watch runs
// watches, the hospital runs shifts, and Planetary Defense spans eight years,
// where "Day 12" sat directly against a card that opens "four months after the
// pass". The label is the theme's; the model underneath is unchanged.
const DAY_NOUN=theme.dayNoun || 'Day';
const STARTING_RESERVE=20;
const WEEKLY_APPROPRIATION=5;
const FUND_COST=1;
const HINT_COST=2;
// A wrong call costs money, and only money. Time is no longer a currency —
// the day runs down by itself now, so charging hours for a mistake would be
// charging twice. Answer again for $5, accept the miss and move on for $10.
//
// If neither is affordable the day restarts. That is the floor of the design:
// a player can always earn their way back by talking to people, and the price
// of being both wrong and broke is the day rather than the campaign.
const MIN_ALLOTMENT_HOURS=0;
// A wrong call is a penalty box, not a toll.
//
// It used to be $5 to answer again and $10 to walk away from the stop, which
// made being wrong a purchase and made a rich player immune to it. Now there is
// one free way forward and one paid one, and the free one costs the thing the
// day is actually made of: the call closes for an hour of game time and reopens
// on its own. Pay $10 and it reopens now.
const RETRY_COST=10;
const RETRY_HOURS=0;
// How long the box lasts, in minutes of the day's own countdown.
const PENALTY_MINUTES=60;
// Kept so a save written before the penalty box still loads.
const SKIP_COST=10;
const SKIP_HOURS=0;
// Paid each morning, so a day never opens with no way out of a wrong answer.
const DAILY_STIPEND=8;
const VISIT_BONUS=6;
const ISSUE_VISIT_BONUS=10;
export { KEY, ROOM, WEEKS, DAY_NOUN, STARTING_RESERVE, WEEKLY_APPROPRIATION, FUND_COST, HINT_COST,
         MIN_ALLOTMENT_HOURS, RETRY_COST, RETRY_HOURS, PENALTY_MINUTES, SKIP_COST, SKIP_HOURS,
         DAILY_STIPEND, VISIT_BONUS, ISSUE_VISIT_BONUS };
