import theme from './theme.js';

// The save slot is per theme. This was one hardcoded string, which meant every
// game built on the engine wrote over the same slot — starting a second theme
// silently loaded the first one's campaign.
const KEY=`gamekit_${theme.id}_v1`;
const WEEKS=15;
const STARTING_RESERVE=20;
const WEEKLY_APPROPRIATION=5;
const FUND_COST=1;
const HINT_COST=2;
// A wrong call is no longer punished automatically. The player is charged a
// minimum allotment and then chooses how to pay for what happens next: answer
// again, or accept the miss and move on. Each is priced in money or in time, so
// nobody is ever stuck for want of funds — time is always affordable.
const MIN_ALLOTMENT_HOURS=3;
const RETRY_COST=5;
const RETRY_HOURS=12;
const SKIP_COST=10;
const SKIP_HOURS=24;
const VISIT_BONUS=6;
const ISSUE_VISIT_BONUS=10;
export { KEY, WEEKS, STARTING_RESERVE, WEEKLY_APPROPRIATION, FUND_COST, HINT_COST,
         MIN_ALLOTMENT_HOURS, RETRY_COST, RETRY_HOURS, SKIP_COST, SKIP_HOURS,
         VISIT_BONUS, ISSUE_VISIT_BONUS };
