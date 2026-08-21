// cloudSave.js — the campaign, kept against an account instead of a browser.
//
// The games are served two ways and both have to keep working. From
// `gamekit/dist` behind a plain static server there is no account and no API:
// every call here fails once, the module turns itself off, and the game runs on
// localStorage exactly as it always did. Served from the casebook app there is
// a signed-in Clerk user and four endpoints, and the same campaign follows the
// player between devices.
//
// WHY THE PROBE IS ONE REQUEST AND NEVER REPEATED. A 404 from a static server
// and a 401 from a signed-out session mean the same thing to a game — there is
// no account, carry on — and retrying either on every autosave would put a
// failed request behind every answer the player gives. `available` is decided
// by the first call and never reconsidered inside a session.
//
// WHY WRITES ARE DEBOUNCED AND READS ARE NOT. `saveState` is called on every
// clock tick, every stop, every wrong answer; the engine treats it as free.
// A POST per call is a request every second or so. Reads happen once, at boot,
// before the game has drawn anything, so they are awaited plainly.
import { KEY } from './constants.js';
import theme from './theme.js';

const THEME = theme.id;
// When the local copy was last written. Kept beside the save rather than inside
// it, because the state object is the engine's and adding a field to it would
// reach every check that walks a saved campaign.
const STAMP_KEY = `${KEY}_savedAt`;
const PUSH_DELAY_MS = 1500;

// null = not yet asked. false = no account here; every entry point returns
// immediately from then on.
//
// The dev checkers run the engine under node, where there is no origin for a
// relative URL to be relative to and a pending timer keeps the process alive
// past the end of the check. Off before it starts, there.
let available = typeof window === 'undefined' ? false : null;
let pending = null;
let timer = null;

function stampLocal(t = Date.now()){
  try{ localStorage.setItem(STAMP_KEY, String(t)); }catch(e){}
}
function localStamp(){
  try{ return Number(localStorage.getItem(STAMP_KEY)) || 0; }catch(e){ return 0; }
}

// One place that decides whether there is an account, so a 401 anywhere turns
// the whole module off rather than only the call that saw it.
async function call(path, opts = {}){
  if(available === false) return null;
  try{
    // api-base.js when the page has it (the casebook app, and the iOS app
    // where it is the difference between a request and a 404 in the bundle);
    // a plain relative fetch otherwise, which is what a static host wants.
    const res = await (window.FPL_API
      ? window.FPL_API.fetch(path, opts)
      : fetch(path, { credentials: 'same-origin', ...opts }));
    if(res.status === 401 || res.status === 404){ available = false; return null; }
    if(!res.ok) return null;
    available = true;
    return res.status === 204 ? {} : await res.json();
  }catch(e){
    // A network error at boot is not proof there is no account — but it is
    // proof this call cannot be answered, and a game that waits on the network
    // to start is worse than a game that starts on the local save.
    available = false;
    return null;
  }
}

// Read the account's copy and, if it is the newer one, write it into
// localStorage before anything reads from there. Returns true when it did.
//
// Awaited at boot from index.html rather than from main.js: the entry point
// reads the save during module evaluation, so hydrating from inside it would
// be a top-level await in the middle of the graph and every theme would inherit
// the ordering bug.
export async function hydrate(){
  const out = await call(`/api/save?theme=${encodeURIComponent(THEME)}`);
  if(!out || !out.state) return false;
  const remote = Number(out.savedAt) || 0;
  if(remote <= localStamp()) return false;
  try{
    localStorage.setItem(KEY, JSON.stringify(out.state));
    stampLocal(remote);
    return true;
  }catch(e){ return false; }
}

// Called from saveState on every write. Coalesces a burst into one request and
// keeps only the last state — an autosave from four seconds ago has nothing in
// it the current one does not.
export function push(state){
  if(available === false) return;
  stampLocal();
  pending = state;
  if(timer) return;
  timer = setTimeout(async () => {
    timer = null;
    const body = pending; pending = null;
    if(!body) return;
    const out = await call('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: THEME, state: body }),
    });
    // Re-stamp in the server's clock, not this device's.
    //
    // The stamp is only ever compared against a timestamp the server wrote, and
    // two browsers signed into one account do not agree about what time it is.
    // A laptop five minutes fast would write a local stamp that no later save
    // from the phone could beat, and that device would quietly stop pulling the
    // account's campaign — with nothing broken to see. Taking the server's own
    // savedAt back puts both sides of every comparison on one clock.
    if(out && out.savedAt) stampLocal(Number(out.savedAt));
  }, PUSH_DELAY_MS);
}

// Restarting the campaign has to clear the account's copy too, or the next boot
// hydrates the run the player just threw away.
export function wipe(){
  if(timer){ clearTimeout(timer); timer = null; }
  pending = null;
  try{ localStorage.removeItem(STAMP_KEY); }catch(e){}
  call(`/api/save?theme=${encodeURIComponent(THEME)}`, { method: 'DELETE' });
}

// A finished campaign is a row in the account's history — the same table the
// casebook games write, so one streak covers both. Fire-and-forget: a game that
// refused to show its ending because a POST failed would be a worse game.
export function postResult({ won, score, missions, hours }){
  if(available === false) return;
  call('/api/results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      gameId: THEME,
      gameTitle: theme.title || THEME,
      rank: won ? 'complete' : 'incomplete',
      won: !!won,
      daysUsed: missions ?? null,
      solveSeconds: hours != null ? Math.round(hours * 3600) : null,
      game: 'fpl',
      score: score ?? null,
    }),
  });
}

// ------------------------------------------------------------------ ratings
//
// One rating per account per game, offered on the card that closes a campaign
// and averaged on the shelf. Kept here rather than beside `postResult` because
// it is the one call in this file whose answer the game *reads*: the ending
// card has to know whether there is an account at all (no account, no rating
// row), and what this player said last time, or a second campaign would offer
// an empty set of stars over a rating they have already given.

/**
 * This account's rating of this game and where the game currently stands, or
 * null when there is no account — a static host, a signed-out session, the
 * checkers under node. Null means "do not offer to rate", not "unrated".
 */
export async function readRating(){
  const out = await call('/api/ratings');
  if(!out) return null;
  const here = out.ratings?.[THEME] ?? null;
  return {
    mine: out.mine?.[THEME] ?? null,
    avg: here ? Number(here.avg) : null,
    count: here ? Number(here.count) : 0,
  };
}

/**
 * Send a rating and take back what the game now averages.
 *
 * Awaited rather than fired and forgotten, unlike `postResult`: the player has
 * just pressed a star and is owed an answer, and a rating that silently failed
 * to send looks exactly like one that landed.
 */
export async function postRating(stars){
  const out = await call('/api/ratings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId: THEME, stars }),
  });
  if(!out) return null;
  return { mine: Number(out.stars), avg: Number(out.avg), count: Number(out.count) };
}
