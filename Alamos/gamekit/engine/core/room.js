// room.js — several people, one campaign, one place.
//
// Inert unless the page was opened with `?room=CODE`. Every export below is a
// no-op or an empty answer without one, so the fifteen games are unchanged and
// nothing here has to be turned off for a solo player.
//
// ## What is shared and what is not
//
// Shared: the campaign (`state`), the day's countdown, and which stop somebody
// has claimed. Not shared: where the camera is looking, which room you have
// walked into, whether your map is open. A co-op session is several people
// working one day, not several people driving one avatar.
//
// ## The claim is the whole concurrency story
//
// The server accepts campaign writes last-write-wins (see server/rooms.js for
// why it cannot compute them itself). That is only safe because a stop can be
// answered by exactly one player at a time: `claim()` has to be granted before a
// question panel opens, and the grant comes from the server, so two people who
// press the same door in the same second get one panel and one "Maya is on it".
//
// Everything else two players can do at once — walking, reading a bio, opening a
// map — either does not write the campaign or writes a part nobody else is in.
//
// ## Why the clock is not ours
//
// `dayLeft` comes from the server on a two-second heartbeat and is interpolated
// between them. A client-side countdown would stop dead when its tab went to the
// back — a background tab gets no requestAnimationFrame — so whoever alt-tabbed
// would come back to a day that had not moved while everybody else's had.
import { KEY, ROOM } from './constants.js';
import theme from './theme.js';

const RECONNECT_MS = 2000;
const POS_HZ = 10;

let ws = null;
let self = null;
let connected = false;
let closing = false;
let version = 0;
let joinedOnce = false;          // has a `welcome` ever landed? see receive()
const peers = new Map();          // id -> { id, name, colour, pos, seenAt }
let claims = {};                  // stopKey -> { by, name }
let clock = { budget: 0, left: 0, running: false };
let clockStamp = 0;               // performance.now() when `clock` last arrived
let lastPos = 0;
const pendingClaims = new Map();  // stopKey -> resolve

const listeners = { state: [], members: [], clock: [], claims: [], ping: [], link: [] };
const emit = (kind, ...args) => { for(const fn of listeners[kind]) { try{ fn(...args); }catch(e){ console.warn(e); } } };

/** Is this page a co-op session at all? Everything else keys off this. */
export function isRoom(){ return !!ROOM; }
export function roomCode(){ return ROOM; }
export function me(){ return self; }
export function isConnected(){ return connected; }
export function members(){ return [...peers.values()]; }

export const onState   = (fn) => listeners.state.push(fn);
export const onMembers = (fn) => listeners.members.push(fn);
export const onClock   = (fn) => listeners.clock.push(fn);
export const onClaims  = (fn) => listeners.claims.push(fn);
export const onPing    = (fn) => listeners.ping.push(fn);
export const onLink    = (fn) => listeners.link.push(fn);

function send(msg){
  if(ws && ws.readyState === 1){
    try{ ws.send(JSON.stringify(msg)); }catch(e){}
  }
}

// The ticket and the socket both go to the server, and inside the iOS app these
// pages are loaded from the app bundle — so a relative /api/ or /ws/ path
// resolves into the bundle, where there is no server. api-base.js is that one
// decision (and the Bearer token that replaces the cookie there); absent, this
// falls back to what a static host wants.
const ticketFetch = (path) => (window.FPL_API
  ? window.FPL_API.fetch(path, { method: 'POST' })
  : fetch(path, { method: 'POST', credentials: 'same-origin' }));

const wsURL = (path) => {
  if(window.FPL_API) return window.FPL_API.socketURL(path);
  const scheme = location.protocol === 'https:' ? 'wss' : 'ws';
  return `${scheme}://${location.host}${path}`;
};

/**
 * Join the room, and put its campaign into localStorage before anything reads
 * from there.
 *
 * Awaited from index.html for exactly the reason `cloudSave.hydrate` is: the
 * entry point calls `tryLoadSaved()` during module evaluation, so a campaign
 * that arrives after that is a campaign nobody loads. Writing it into the slot
 * and letting the ordinary load path find it means main.js needs no new branch.
 *
 * A room that has no campaign yet — the first player through the door — resolves
 * with nothing, the game creates a fresh one, and the first save publishes it.
 */
export async function connect(){
  if(!ROOM) return false;
  let ticket;
  try{
    const res = await ticketFetch(`/api/rooms/${encodeURIComponent(ROOM)}/ticket`);
    if(!res.ok) throw new Error(`ticket ${res.status}`);
    ticket = await res.json();
  }catch(e){
    // No room server (a static host, a signed-out session, a wrong code). The
    // game still runs — as a solo campaign in the room's own save slot, which
    // is the least surprising thing that can happen.
    console.warn('co-op unavailable:', e.message);
    emit('link', { state: 'unavailable' });
    return false;
  }
  if(ticket.theme && ticket.theme !== theme.id){
    console.warn(`room ${ROOM} is playing ${ticket.theme}, this page is ${theme.id}`);
    emit('link', { state: 'wrong-theme', theme: ticket.theme });
    return false;
  }
  // Bounded, always. This promise gates the entry point's import — a socket that
  // opens and then never says `welcome` would leave the player looking at a
  // title card forever, which is a worse failure than starting without co-op and
  // letting the reconnect loop pick it up.
  return new Promise((resolve) => {
    let done = false;
    const once = (v) => { if(!done){ done = true; resolve(v); } };
    setTimeout(() => once(false), 6000);
    open(ticket.ticket, once);
  });
}

function open(ticket, resolveFirst){
  ws = new WebSocket(wsURL(`/ws/room?ticket=${encodeURIComponent(ticket)}`));

  ws.onopen = () => { connected = true; emit('link', { state: 'open' }); };

  ws.onmessage = (ev) => {
    let msg;
    try{ msg = JSON.parse(ev.data); }catch(e){ return; }
    receive(msg, resolveFirst);
    resolveFirst = null;
  };

  ws.onclose = () => {
    connected = false;
    emit('link', { state: 'closed' });
    resolveFirst?.(false);
    resolveFirst = null;
    if(closing) return;
    // A dropped socket is a dropped Wi-Fi far more often than a dead server, so
    // it reconnects rather than ending the session. A new ticket is needed each
    // time: they are single-use by design.
    setTimeout(() => { if(!closing) reconnect(); }, RECONNECT_MS);
  };
  ws.onerror = () => { /* onclose follows */ };
}

async function reconnect(){
  try{
    const res = await ticketFetch(`/api/rooms/${encodeURIComponent(ROOM)}/ticket`);
    if(!res.ok) throw new Error(String(res.status));
    const t = await res.json();
    open(t.ticket, null);
  }catch(e){
    setTimeout(() => { if(!closing) reconnect(); }, RECONNECT_MS * 2);
  }
}

function receive(msg, resolveFirst){
  switch(msg.t){
    case 'welcome': {
      self = msg.you;
      peers.clear();
      for(const m of msg.members) peers.set(m.id, { ...m, seenAt: performance.now() });
      claims = msg.claims ?? {};
      setClock(msg.clock ?? clock);
      version = msg.version ?? 0;
      // The room's campaign, into the slot, before the entry point reads it.
      if(msg.state){
        try{ localStorage.setItem(KEY, JSON.stringify(msg.state)); }catch(e){}
      }
      emit('members', members());
      emit('claims', claims);
      // ——— a rejoin is not a join ———————————————————————————————————
      //
      // Writing the slot is enough on the FIRST welcome, because the entry point
      // has not read it yet. On a reconnect — a dropped Wi-Fi, a phone changing
      // cell — the game has been running for an hour and nothing reads that slot
      // again, so the room's campaign arrived and was thrown away. This client
      // then kept its own copy and republished it on the next autosave, which
      // silently overwrote whatever the rest of the room had done in the
      // meantime: two people who had been playing one campaign were now playing
      // two, and the only symptom was progress quietly going missing.
      //
      // The room's copy wins, always. Anything this client did while the socket
      // was down was never published and is discarded here — that is a real
      // loss, and it is the cheaper of the two: the alternative erases everybody
      // else's work instead of one person's last thirty seconds.
      if(joinedOnce && msg.state) emit('state', msg.state);
      joinedOnce = true;
      resolveFirst?.(!!msg.state);
      break;
    }
    case 'join':
      peers.set(msg.member.id, { ...msg.member, seenAt: performance.now() });
      emit('members', members());
      break;
    case 'leave':
      peers.delete(msg.id);
      emit('members', members());
      break;
    case 'pos': {
      const p = peers.get(msg.id);
      if(!p) break;
      p.pos = { x: msg.x, y: msg.y, z: msg.z, yaw: msg.yaw, space: msg.space, moving: msg.moving };
      p.seenAt = performance.now();
      break;
    }
    case 'state':
      // An update older than what we already have is an out-of-order delivery,
      // not news. Applying it would walk the campaign backwards.
      if((msg.version ?? 0) <= version) break;
      version = msg.version;
      emit('state', msg.state);
      break;
    case 'clock':
      setClock(msg);
      if(msg.expired) emit('clock', { ...clock, expired: true });
      break;
    case 'claims':
      claims = msg.claims ?? {};
      emit('claims', claims);
      break;
    case 'claimGranted': {
      const r = pendingClaims.get(msg.key);
      pendingClaims.delete(msg.key);
      claims[msg.key] = { by: self?.id, name: self?.name };
      r?.({ ok: true });
      break;
    }
    case 'claimDenied': {
      const r = pendingClaims.get(msg.key);
      pendingClaims.delete(msg.key);
      claims[msg.key] = { by: msg.by, name: msg.name };
      r?.({ ok: false, name: msg.name });
      break;
    }
    case 'ping':
      emit('ping', msg);
      break;
  }
}

function setClock(c){
  clock = { budget: c.budget ?? clock.budget, left: c.left ?? clock.left, running: !!c.running };
  clockStamp = performance.now();
  emit('clock', clock);
}

// ---------------------------------------------------------------- campaign

/**
 * Publish the campaign. Called from `save.js`, which is the one funnel every
 * mutation in the engine already goes through.
 *
 * Coalesced the same way the cloud save is and for the same reason: the engine
 * treats saving as free and calls it on every tick.
 */
let pushTimer = null;
let pending = null;
export function pushState(state){
  if(!ROOM || !connected) return;
  pending = state;
  if(pushTimer) return;
  pushTimer = setTimeout(() => {
    pushTimer = null;
    const body = pending; pending = null;
    if(body) send({ t: 'state', state: body });
  }, 400);
}

// ------------------------------------------------------------------- clock

/**
 * The room's countdown, interpolated between heartbeats.
 *
 * `gameState.tickDay` reads this instead of counting down itself when a room is
 * live. Interpolating rather than stepping every two seconds is the difference
 * between a clock and a slideshow.
 */
export function clockLeft(){
  if(!clock.running) return clock.left;
  const since = (performance.now() - clockStamp) / 1000;
  // One game minute a real second. The pace factor is deliberately NOT applied
  // here: the server knows whether anybody has a panel open and this does not,
  // so guessing would make the local clock disagree with the room's every time
  // somebody else opened a question.
  return Math.max(0, clock.left - since);
}
export function clockBudget(){ return clock.budget; }
export function clockRunning(){ return clock.running; }
export function startClock(budget, left){ send({ t: 'clockStart', budget, left: left ?? budget }); }
export function stopClock(){ send({ t: 'clockStop' }); }

/** Whether this player has a panel open — the room's clock pace comes from it. */
/**
 * Somebody has a panel open, and whether that panel stops the clock outright.
 *
 * The server applies the panel rate because it is the only party that knows
 * whether *anybody* is reading — see `tickDay`. A client that stops the day
 * locally has to say so here too, or one player's stopped clock runs against
 * everybody else's countdown and the two numbers part company.
 *
 * `frozen` is additive and a server that has not been taught it ignores it, so
 * this is safe to send at a casebook that has not deployed the other half yet:
 * the room falls back to its own panel rate, which is the behaviour before the
 * clock was stopped.
 */
export function setPanel(open, frozen = false){
  send({ t: 'panel', open: !!open, frozen: !!frozen });
}

// ------------------------------------------------------------------ claims

/**
 * Ask for a stop. Resolves `{ ok }`, and `{ ok: false, name }` when somebody
 * else already has it.
 *
 * Never resolves optimistically: the point of the lock is that the server, not
 * the client, decides who got there first.
 */
export function claim(key){
  if(!ROOM || !connected) return Promise.resolve({ ok: true });
  return new Promise((resolve) => {
    // A second ask for a key already in flight joins the first rather than
    // racing it.
    const prior = pendingClaims.get(key);
    pendingClaims.set(key, (r) => { prior?.(r); resolve(r); });
    send({ t: 'claim', key });
    // A server that never answers must not leave a player unable to open
    // anything. Falling open is the right failure: the worst case is the LWW
    // the whole design already tolerates.
    setTimeout(() => {
      if(pendingClaims.has(key)){ pendingClaims.delete(key); resolve({ ok: true }); }
    }, 3000);
  });
}
export function release(key){ if(ROOM && connected) send({ t: 'release', key }); }
export function claimedBy(key){ return claims[key] ?? null; }
export function heldByMe(key){ return !!self && claims[key]?.by === self.id; }
export function allClaims(){ return claims; }

// ---------------------------------------------------------------- presence

/**
 * Where this player is, ten times a second.
 *
 * `space` is not decoration. Interiors are built in a district four kilometres
 * along +x and entering one teleports the player there, so a position alone
 * would draw a teammate standing in the open air of a town they are not in.
 * Peers are only drawn by callers whose `space` matches.
 */
export function sendPos(x, y, z, yaw, space, moving){
  if(!ROOM || !connected) return;
  const now = performance.now();
  if(now - lastPos < 1000 / POS_HZ) return;
  lastPos = now;
  send({ t: 'pos',
    x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100, z: Math.round(z * 100) / 100,
    yaw: Math.round(yaw * 1000) / 1000, space, moving });
}

/** "Look at this" — the only message these games can send. */
export function ping(x, z){ if(ROOM && connected) send({ t: 'ping', x, z }); }

export function leave(){
  closing = true;
  try{ ws?.close(); }catch(e){}
}
