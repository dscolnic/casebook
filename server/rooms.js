// Rooms — co-op for the First Person Learning games.
//
// A room is a shared campaign plus the people standing in it. The server is a
// relay, a clock and a lock table; it is NOT a second copy of the game.
//
// ## Why the server does not compute the campaign
//
// The obvious design is server-authoritative: clients send intents, the server
// applies them. That would mean the engine's rules — what a stop is, when a day
// ends, what a wrong call costs — living here as well as in Alamos/gamekit, and
// this repo already knows what a second copy of a decision costs. So the clients
// compute, and the server stores the last blob anybody sent.
//
// ## Why last-write-wins is safe here, and where it is not
//
// Concurrent writes to one campaign would normally corrupt it. What makes plain
// LWW workable is the CLAIM table below: the only mutation two players can
// realistically make at the same moment is answering, and a stop can only be
// answered by whoever holds its claim. Everything else — walking, opening a
// door, reading a bio — either does not touch the campaign or touches a part
// nobody else is in.
//
// It is not airtight. Two players spending money in the same second can lose one
// of the two debits. That is a known and accepted limit, not an oversight; the
// fix if it ever matters is a field-level merge, and it is not worth its
// complexity for a classroom of six.
//
// ## The clock is the exception
//
// `dayLeft` IS server-owned, because it is pure arithmetic with no game rules in
// it, and because the alternative is worse: a client-owned countdown stops when
// its tab is backgrounded (a background tab gets no requestAnimationFrame), and
// one player switching to another window would freeze or desync the room's day.
const { randomUUID } = require("crypto");
const { WebSocketServer } = require("ws");
const { loadRoom, saveRoom } = require("./storage");

// Codes are read aloud, same alphabet as a class join code: no I, O, 0 or 1.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 5;

const TICKET_TTL_MS = 60_000;      // a ticket is spent immediately or not at all
const EMPTY_ROOM_TTL_MS = 30 * 60_000;  // an empty room is kept this long
const CLOCK_TICK_MS = 1000;
const CLOCK_BROADCAST_MS = 2000;
const PERSIST_MS = 10_000;
const CLAIM_TTL_MS = 5 * 60_000;   // a claim whose holder went quiet

// One game minute a real second, and a quarter of that while anybody has a
// panel open. Both numbers are the engine's (engine/core/day.js); they are
// duplicated here only because the countdown itself is, and a mismatch would
// show up as a clock that runs at a different speed than the game says.
const MINUTES_PER_SECOND = 1;
const PANEL_PACE = 0.25;

/** @type {Map<string, Room>} */
const rooms = new Map();
/** @type {Map<string, {roomCode, userId, name, expires}>} */
const tickets = new Map();

function makeCode() {
  let out = "";
  for (let i = 0; i < CODE_LENGTH; i++) out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  return out;
}
const normaliseCode = (raw) => String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

function newRoom(code, theme, ownerId) {
  return {
    code, theme, ownerId,
    createdAt: Date.now(),
    members: new Map(),      // socketId -> { id, userId, name, colour, ws, pos, panel, lastSeen }
    state: null,             // the engine's save blob, opaque
    version: 0,
    claims: new Map(),       // stopKey -> { by, name, at }
    clock: { budget: 0, left: 0, running: false },
    lastClock: 0,
    dirty: false,
    lastPersist: 0,
    emptySince: Date.now(),
  };
}

// Six readable colours, handed out in order. The avatar's colour is the only
// thing that tells two players apart at fifty metres, so it is assigned by the
// server rather than derived from a name — two students called Sam would
// otherwise get the same one.
const COLOURS = ["#6fc7d8", "#e0868f", "#d8c46f", "#8f6fd0", "#7fd88f", "#e0a86f"];

async function createRoom(theme, ownerId) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = makeCode();
    if (rooms.has(code)) continue;
    if (await loadRoom(code)) continue;   // an old room with that code is still on disk
    const room = newRoom(code, String(theme), ownerId);
    rooms.set(code, room);
    await saveRoom(room);
    return { code, theme: room.theme };
  }
  throw new Error("could not allocate a room code");
}

// A room that fell out of memory on a restart comes back off disk with its
// campaign intact. Members and claims do not survive — they are about who is
// connected right now, and after a restart nobody is.
async function getRoom(code) {
  const key = normaliseCode(code);
  if (rooms.has(key)) return rooms.get(key);
  const row = await loadRoom(key);
  if (!row) return null;
  const room = newRoom(key, row.theme, row.owner_id);
  room.state = row.state;
  room.version = row.version || 0;
  room.clock = row.clock || room.clock;
  // A day that was running when the process died is not running now — nobody is
  // connected, so nobody has been spending it.
  room.clock.running = false;
  rooms.set(key, room);
  return room;
}

function issueTicket(roomCode, userId, name) {
  const id = randomUUID();
  tickets.set(id, { roomCode: normaliseCode(roomCode), userId, name, expires: Date.now() + TICKET_TTL_MS });
  return id;
}

function spendTicket(id) {
  const t = tickets.get(id);
  if (!t) return null;
  tickets.delete(id);
  if (t.expires < Date.now()) return null;
  return t;
}

// ---------------------------------------------------------------------------

function send(ws, msg) {
  if (ws.readyState === 1) {
    try { ws.send(JSON.stringify(msg)); } catch (e) { /* a closing socket */ }
  }
}

function broadcast(room, msg, exceptId) {
  for (const m of room.members.values()) {
    if (m.id === exceptId) continue;
    send(m.ws, msg);
  }
}

const publicMember = (m) => ({ id: m.id, name: m.name, colour: m.colour, pos: m.pos });
const publicClaims = (room) =>
  Object.fromEntries([...room.claims].map(([k, v]) => [k, { by: v.by, name: v.name }]));

/**
 * Free any claim whose holder has gone.
 *
 * A stop locked by somebody who closed their laptop is a stop the rest of the
 * room cannot answer, and there is no player-facing way to break it — so the
 * lock has to be able to break itself. Called on every disconnect and by the
 * clock tick.
 */
function reapClaims(room) {
  let changed = false;
  const now = Date.now();
  for (const [key, claim] of room.claims) {
    const holder = room.members.get(claim.by);
    if (!holder || now - claim.at > CLAIM_TTL_MS) {
      room.claims.delete(key);
      changed = true;
    }
  }
  if (changed) broadcast(room, { t: "claims", claims: publicClaims(room) });
  return changed;
}

// The room's day, ticked here so it does not stop when a tab goes to the back.
// Pace is the slowest anybody is going: if ANY player has a panel open the whole
// room's day runs at a quarter, because the panel is what the games are about
// and the alternative punishes the player doing the reading.
function tickClocks() {
  const now = Date.now();
  for (const [code, room] of rooms) {
    // Retire an empty room, but only after long enough for a class to come back
    // from a fire drill.
    if (room.members.size === 0) {
      if (!room.emptySince) room.emptySince = now;
      if (now - room.emptySince > EMPTY_ROOM_TTL_MS) { rooms.delete(code); continue; }
    } else {
      room.emptySince = 0;
    }

    reapClaims(room);

    if (room.clock.running && room.members.size > 0) {
      const elapsed = (now - (room.lastClock || now)) / 1000;
      room.lastClock = now;
      const slow = [...room.members.values()].some((m) => m.panel);
      room.clock.left = Math.max(0, room.clock.left - elapsed * MINUTES_PER_SECOND * (slow ? PANEL_PACE : 1));
      if (room.clock.left <= 0) {
        room.clock.running = false;
        broadcast(room, { t: "clock", ...room.clock, expired: true });
      }
    } else {
      room.lastClock = now;
    }

    if (now - (room.lastBroadcast || 0) > CLOCK_BROADCAST_MS && room.members.size > 0) {
      room.lastBroadcast = now;
      broadcast(room, { t: "clock", ...room.clock });
    }
    if (room.dirty && now - room.lastPersist > PERSIST_MS) {
      room.dirty = false;
      room.lastPersist = now;
      saveRoom(room).catch((e) => console.error("saveRoom:", e.message));
    }
  }
}

function attach(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", async (req, socket, head) => {
    let url;
    try { url = new URL(req.url, "http://localhost"); } catch (e) { return socket.destroy(); }
    if (url.pathname !== "/ws/room") return socket.destroy();
    // Authentication happened over HTTP, where Clerk's middleware runs. The
    // ticket is the proof it happened — validating a session cookie by hand on
    // an upgrade request would be a second, worse copy of the auth layer.
    const ticket = spendTicket(url.searchParams.get("ticket"));
    if (!ticket) return socket.destroy();
    const room = await getRoom(ticket.roomCode);
    if (!room) return socket.destroy();
    wss.handleUpgrade(req, socket, head, (ws) => join(room, ws, ticket));
  });

  setInterval(tickClocks, CLOCK_TICK_MS).unref?.();
  return wss;
}

function join(room, ws, ticket) {
  const id = randomUUID().slice(0, 8);
  const member = {
    id, userId: ticket.userId, name: ticket.name || "Player",
    colour: COLOURS[room.members.size % COLOURS.length],
    ws, pos: null, panel: false, lastSeen: Date.now(),
  };
  room.members.set(id, member);

  // Somebody is back. `bye` stops the clock when the last member goes, which is
  // what lets a class break for lunch mid-day — but nothing ever started it
  // again, so the first person back sat in a day whose countdown was frozen at
  // whatever second the room emptied. `dayRunning()` is true on their client
  // (there is time left), so `tickDay` keeps reading a number that never moves
  // and the day can neither be finished nor run out.
  //
  // It bites hardest on the case it was never meant to cover: two people on one
  // Wi-Fi that drops. Both sockets close, the room empties, the clock stops, and
  // both reconnect into a dead day.
  if (room.members.size === 1 && !room.clock.running && room.clock.left > 0
      && room.state?.dayStarted && !room.state?.dayEnded) {
    room.clock.running = true;
    room.lastClock = Date.now();
  }

  send(ws, {
    t: "welcome",
    you: publicMember(member),
    theme: room.theme,
    members: [...room.members.values()].filter((m) => m.id !== id).map(publicMember),
    state: room.state, version: room.version,
    claims: publicClaims(room),
    clock: room.clock,
  });
  broadcast(room, { t: "join", member: publicMember(member) }, id);

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch (e) { return; }
    member.lastSeen = Date.now();
    handle(room, member, msg);
  });

  const bye = () => {
    room.members.delete(id);
    reapClaims(room);
    broadcast(room, { t: "leave", id });
    // Nobody left to spend the day. Stopping the clock rather than letting it
    // run down to zero on an empty room is what makes a class able to break for
    // lunch mid-day.
    if (room.members.size === 0) room.clock.running = false;
  };
  ws.on("close", bye);
  ws.on("error", bye);
}

function handle(room, member, msg) {
  switch (msg.t) {
    // Ten a second, relayed untouched. The server has no opinion about where
    // anybody is: it cannot check a position against a world it does not have.
    case "pos":
      member.pos = { x: msg.x, y: msg.y, z: msg.z, yaw: msg.yaw, space: msg.space || "out", moving: !!msg.moving };
      broadcast(room, { t: "pos", id: member.id, ...member.pos }, member.id);
      break;

    // Whether this player has a question panel open, which is what the room's
    // clock pace is decided from.
    case "panel":
      member.panel = !!msg.open;
      break;

    // The campaign. Accepted unconditionally — see the LWW note at the top —
    // and stamped with a version so a client can ignore an echo of its own write
    // and spot one that arrived out of order.
    case "state":
      if (!msg.state) break;
      room.state = msg.state;
      room.version++;
      room.dirty = true;
      broadcast(room, { t: "state", state: room.state, version: room.version, from: member.id }, member.id);
      break;

    // A day started, or was restarted. The client computed the budget (it needs
    // the map to do that); the server takes over counting it down.
    case "clockStart":
      room.clock = { budget: Number(msg.budget) || 0, left: Number(msg.left ?? msg.budget) || 0, running: true };
      room.lastClock = Date.now();
      room.dirty = true;
      broadcast(room, { t: "clock", ...room.clock });
      break;

    case "clockStop":
      room.clock.running = false;
      broadcast(room, { t: "clock", ...room.clock });
      break;

    // The lock that makes last-write-wins safe. First asker holds it; everybody
    // else is told who, so their UI can say so rather than silently refusing.
    case "claim": {
      const key = String(msg.key || "");
      if (!key) break;
      const held = room.claims.get(key);
      if (held && held.by !== member.id) {
        send(member.ws, { t: "claimDenied", key, by: held.by, name: held.name });
        break;
      }
      room.claims.set(key, { by: member.id, name: member.name, at: Date.now() });
      send(member.ws, { t: "claimGranted", key });
      broadcast(room, { t: "claims", claims: publicClaims(room) });
      break;
    }

    case "release": {
      const key = String(msg.key || "");
      const held = room.claims.get(key);
      if (held && held.by === member.id) {
        room.claims.delete(key);
        broadcast(room, { t: "claims", claims: publicClaims(room) });
      }
      break;
    }

    // "Look at this" — a ping on the map, and the one piece of communication
    // the games have. Relayed, never stored.
    case "ping":
      broadcast(room, { t: "ping", id: member.id, name: member.name, x: msg.x, z: msg.z }, member.id);
      break;
  }
}

function roomSummary(room) {
  return {
    code: room.code, theme: room.theme,
    members: [...room.members.values()].map((m) => ({ id: m.id, name: m.name, colour: m.colour })),
    day: room.state?.week ?? null,
    clock: room.clock,
  };
}

// Drop every live trace of a user from the in-memory half of the rooms.
//
// The durable half is a foreign key and looks after itself; this does not. A
// deleted account with an open socket goes on relaying its position and holding
// its claims, and an unspent ticket is still a valid way in — so a deleted
// account could keep playing until the tab was closed. The database delete
// cannot see any of it, and nothing else would ever notice: from the outside it
// is just a player in a room.
//
// Rooms this user owns are left standing. See the note on deleteUserData: a room
// is a campaign several people share, and owner_id is ON DELETE SET NULL because
// taking it away would take away everybody else's game.
function forgetUser(userId) {
  let sockets = 0, revoked = 0;
  for (const [id, t] of tickets) {
    if (t.userId === userId) { tickets.delete(id); revoked++; }
  }
  for (const room of rooms.values()) {
    for (const [socketId, m] of room.members) {
      if (m.userId !== userId) continue;
      room.members.delete(socketId);
      sockets++;
      try { m.ws.close(4003, "account deleted"); } catch (e) {}
      broadcast(room, { t: "leave", id: socketId });
    }
    reapClaims(room);
    if (room.members.size === 0) room.clock.running = false;
    if (room.ownerId === userId) room.ownerId = null;
  }
  return { sockets, revoked };
}

module.exports = { attach, createRoom, getRoom, issueTicket, roomSummary, normaliseCode, forgetUser };
