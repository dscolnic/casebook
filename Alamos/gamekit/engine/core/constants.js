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
const RETRY_COST=3;
const VISIT_BONUS=6;
const ISSUE_VISIT_BONUS=10;
export { KEY, WEEKS, STARTING_RESERVE, WEEKLY_APPROPRIATION, FUND_COST, HINT_COST, RETRY_COST, VISIT_BONUS, ISSUE_VISIT_BONUS };
