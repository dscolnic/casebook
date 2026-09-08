// beats.js — the things that happen when a player walks in, and after each stop.
//
// A campaign bible can describe a mission as a *beat script*: arrive at Plant
// Control and the shortfall warning flashes, a commander steps between two
// technicians and speaks, a panel changes, the next stop unlocks. None of that
// is a question and none of it was authorable. The engine had a plan card, a
// question panel and a debrief card, and between them a silence — the player
// answered four questions in a room where nothing ever happened.
//
// WHAT A BEAT IS. One moment, fired by one trigger, made of up to four things:
//
//   nearby_character_bubble   speech, anchored to a named person in the world
//   equipment_panel_update    a line of panel/HUD text that stays up
//   persistent_world_change   a CHANGE TO THE ROOM, shown on the control wall
//   waypoint_notification     the next destination, named
//
// The list is the bible's own vocabulary, and the constraint it states is the
// one that makes this cheap: "no beat requires a pre-rendered sequence, forced
// viewpoint change, voice acting, or bespoke character animation." So a bubble
// is a DOM element tracked to a projected head position, and a world change is
// rows on a board `stageWall.js` already built. Nothing here builds geometry.
//
// A WORLD CHANGE IS NOT A SENTENCE. It was: `world:` became a card in the middle
// of the screen reading "the four sample labels separate into ATOM, MOLECULE and
// ION columns", which is a stage direction read aloud instead of performed.
// Reported in exactly those words — "you aren't showing the world states, you
// are just saying them as text". So the change goes to the wall, and the bible's
// own sentence is a caption under it saying what just happened, the way a
// subtitle labels a thing you can see rather than replacing it.
//
// AND NOTHING STOPS. Every beat used to take the pointer, put a Continue button
// up and hold the player still until they clicked it, so the reward for closing
// a call was a modal. The player keeps control the whole time: the bubble hangs
// beside whoever is speaking, follows them, and clears itself on a dwell timer
// while the player walks to the next call. "After you get a question correct and
// are looking for the next thing, you see the dialogue bubble and the world
// state thing going on" is the requirement, and a modal cannot meet it.
//
// SO THE SPEECH IS ALWAYS ATTACHED TO A SPEAKER. With nothing blocking, a
// bubble parked in the middle of the screen belongs to nobody. Three cases and
// all three point at a face: in view, it sits beside their head with a tail; out
// of view, it pins to the edge they are past with an arrow that way; on the
// radio, the speaker's portrait is in the bubble and the tail points at that.
//
// WHY THE BUBBLE IS DOM AND NOT A SPRITE. A canvas texture in the scene is what
// `crowd.js` does for a nameplate, and a nameplate is two words. Forty words of
// dialogue on a plane at four metres is unreadable at any texture size that
// does not blow the atlas — and it would inherit the tone mapping, which on
// Mars means speech tinted butterscotch. The bubble is over the scene, in the
// card typography, and it points at the person.
//
// PLAYED ONCE. A beat that repeats every time the player walks back through the
// door is worse than no beat: the second hearing tells the player the world is
// a loop. `state.beatsPlayed` records them by `week:id`, so it survives a save
// and a re-entry, and `--selftest` covers the case that matters — the same beat
// asked for twice fires once.
// NO gameState IMPORT. The state accessors arrive through `initBeats` instead,
// for the reason the selftest at the foot of this file exists: everything a
// beat does is DOM and input, a hidden tab can verify neither, and a module that
// reaches for `@theme/theme.js` through gameState cannot be loaded in node at
// all. Taking them as dependencies is also how `createDay` and
// `createInteriors` are written, so this is the house shape rather than a
// concession to a test.
import { esc } from './utils.js';
// The same face the question panel puts beside the person asking. Its own module
// for this import: questionUI reaches the theme, the state and the DOM when it
// loads, and this file has a node selftest.
import { portraitSvg } from './portrait.js';

let ctx = null;
const getState = () => ctx?.getState?.() ?? null;
const save = () => ctx?.save?.();
let layer = null;
/** The queue of bubbles in the beat now playing, and where we are in it. */
let queue = [];
let anchorOf = null;
let radioNow = false;
let onDone = null;
/** The dwell timer for the card on screen, and the caption's own. */
let timer = null;
let capTimer = null;
/**
 * THE LAST LINE STAYS.
 *
 * A run's closing bubble is not cleared on its dwell timer. It — and the world
 * caption under the change it describes — stay on screen until the player opens
 * their next call, which is `dismiss()`. Read speed is a fine estimate of how
 * long a line takes to read and a bad one for how long a player takes to walk
 * across a plant, and a beat that has timed out before they arrive is a beat
 * that never happened. The intermediate bubbles of a run still advance on the
 * timer: a two-line exchange has to play as an exchange.
 */
let held = null;
/** The card most recently rendered, so `finish` knows what to leave up. */
let shown = null;
/**
 * IS THE SPEAKER ACTUALLY IN FRONT OF THE PLAYER?
 *
 * A balloon pinned to the edge of the screen for somebody standing behind the
 * player is a quote attributed to an empty margin — reported as "don't show the
 * quote from a person unless the person is in the field of view". So a bubble
 * whose speaker is off-frame is taken down and put back when they come into
 * view, and `place()` — which already runs every frame — is what decides.
 *
 * The dwell timer stops with it. A line that ran out while the player was
 * looking the other way is a line they never got, and read speed is not a
 * reason to lose one.
 */
let seen = false;
/** Speakers already complained about, so the warning is once and not per frame. */
const warnedNoRig = new Set();
/**
 * WHICH SIDE THE CARD SITS ON — one side, for the whole campaign.
 *
 * Three passes narrowed this and the third was still not flat enough. Decided
 * per line, a run whose speaker crossed the middle of the frame put its second
 * bubble on the other side of the screen, so the card moved between lines of one
 * conversation — and the ask was one position, full stop: "Dialogue bubble
 * should stay pinned to one position that only can change with zoom in/out."
 *
 * So the side is a constant. Right of the middle, because the four campaign bars
 * and the objective card are both top left and a balloon over them is a balloon
 * over the readings it is about. The tail stays on the near edge, which is the
 * only thing left pointing anywhere.
 *
 * `side` survives as the historical name; nothing computes it any more.
 *
 * It used to be recomputed every frame from "whichever side has more room", so
 * turning a few degrees moved the speaker's head past the middle of the frame
 * and the balloon jumped across their face to the other side. Reported as
 * "don't flip position of dialogue box relative to head based on angle I am
 * looking, its annoying when it moves". The card still follows the speaker; what
 * it no longer does is change which shoulder it hangs off while doing it.
 *
 * 'right' means the card sits to the right of the head. Reset in `render`, so a
 * new line gets a fresh decision and the same line never gets a second one.
 */
const side = 'right';
/**
 * THE CARD DOES NOT MOVE ON SCREEN. AT ALL.
 *
 * Three passes at this, each looser than the last, and each still moved:
 * re-projected from the speaker's head every frame, then frozen per line, then
 * frozen until the speaker left frame. The answer asked for is the flat one —
 * "I dont want the dialogue bubble to move on the screen at all, it should just
 * be at same position next to head, and can only zoom in/out as get closer."
 *
 * So the position is a function of the viewport and nothing else: a fixed offset
 * from the middle, on the side the line started on. The speaker stands in the
 * middle of the view while you talk to them, so a fixed spot beside the middle
 * *is* beside their head, and it stays there whatever they or the camera do.
 *
 * What still answers to the world is SIZE. Closer speaker, bigger card — the one
 * cue that says the conversation is at arm's length rather than across the room,
 * and the one change that does not drag the text out from under the reader.
 */
const SCALE_NEAR = 1.18, SCALE_FAR = 0.86;
/** Where the last `place()` put the card, and relative to what. See `placement`. */
let lastPlace = null;

/**
 * @param opts {
 *   theme,
 *   camera,          for projecting a chest position to the screen
 *   renderer,        for the canvas size
 *   npcByCharId,     (id) -> { pos } or null. crowd.js's own lookup.
 *   stage,           (rows, {flash}) -> void. The control wall in the room the
 *                    player is standing in. See engine/world/stageWall.js — a
 *                    persistent_world_change is rows on that board, not prose.
 *   caption,         (text) -> void. The bible's own sentence for what changed,
 *                    under the change itself, fading on its own.
 *   panel,           (text) -> void. Where equipment_panel_update text goes.
 *   waypoint,        (text) -> void. Where waypoint_notification text goes.
 *   getState, save,  the campaign state and its writer. Injected rather than
 *                    imported — see the note on the imports above.
 * }
 */
export function initBeats(opts){
  ctx = opts;
  layer = document.getElementById('beatLayer');
  return { fire, playing, advance, dismiss };
}

/**
 * Is a beat on screen right now? Input and interaction ask this — and so does
 * the per-frame `place()`, which is why a held card counts. The speaker keeps
 * walking after their last line, and a balloon that stops tracking them points
 * at whoever took their place.
 */
export function playing(){ return queue.length > 0 || held !== null; }

/**
 * How many bubbles are still waiting. The selftest's own handle: `playing()`
 * counts the held card and `advance()` past the end of the queue is a no-op, so
 * a loop driven by `playing()` would spin.
 */
export function queued(){ return queue.length; }

/**
 * Whether a dwell timer is pending. The selftest's own handle, and the only way
 * to state the rule that matters: a last line out of view keeps its timer, so
 * the beat chained behind it can still fire its world change.
 */
export function timerRunning(){ return timer !== null; }

/**
 * The beats a trigger asks for, in book order, skipping any already played.
 *
 * `on:` is matched exactly, so a book says `stop: 1` or `stops: [2, 3]` or
 * `enter` or `mission-end` and gets what it asked for. Numbering is the book's
 * — stop 1 is the mission's first stop, not a campaign-wide index — because
 * that is how the bible is written and a translation layer is somewhere for an
 * off-by-one to live.
 */
export function fire(trigger, { done } = {}){
  if(!ctx) return false;
  const state = getState();
  const beats = beatsForDay(state);
  if(!beats.length) return false;
  const want = beats.filter(b => matches(b, trigger) && !alreadyPlayed(state, b));
  if(!want.length) return false;
  // THE WORLD CHANGES FIRST, AND FOR REAL.
  //
  // Before a word is spoken: the wall takes its new rows, the panel line goes
  // up, the waypoint is named, and the bible's sentence captions it. On the last
  // card of the run is where the panel and the waypoint used to land, because
  // the world line was itself a card and would have wiped them. It is not a card
  // any more, so the reason is gone — and holding the new state back until the
  // player has read three bubbles is holding back the thing the bubbles are
  // about.
  for(const b of want) applyStage(b);
  // A held card belongs to the run that just ended. This run owns the screen.
  held = null;
  const said = want.flatMap(b => expand(b));
  // ---- ON A CARD, IF THERE IS ONE. See `cardHost`.
  const host = cardHost();
  if(host && said.length){
    renderToCard(host, said);
    markPlayed(state, want);
    // The chain runs straight away: there is no dwell to wait for, and an
    // arrival beat handing over to a stop beat should put both on the same card.
    const cb = done ?? null;
    cb?.();
    return true;
  }
  queue = said;
  markPlayed(state, want);
  onDone = done ?? null;
  step();
  return true;
}

/**
 * WHICH AREA'S WALL A BEAT'S CHANGE BELONGS TO.
 *
 * The beat says so, and the player's whereabouts do not. This was read off the
 * room the player happened to be standing in, and a person stop is answered
 * wherever the person is standing — which for the cast met at their own door is
 * outdoors. So closing the day's first call in the open fired the beat, showed
 * its caption, and filed its rows against no room at all: walk into the room
 * afterwards and the board is blank, which is the whole of "im not seeing the
 * the four sample sign".
 *
 * `enter` beats name their area outright. An `after:` beat belongs to the area
 * of the stops it waits on, and a `missionEnd` beat to the area of the day's
 * last stop, which is where the day finished.
 */
function areaOf(beat, state){
  const on = beat.on ?? {};
  if(on.at) return on.at;
  const missions = ctx.theme?.content?.MISSIONS ?? [];
  const stops = missions[(state?.week ?? 1) - 1]?.stops ?? [];
  if(Array.isArray(on.after) && on.after.length){
    // The last of them, because that is the one whose closing fires the beat.
    const n = Math.max(...on.after);
    return stops[n - 1]?.group ?? null;
  }
  if(on.missionEnd === true) return stops[stops.length - 1]?.group ?? null;
  return null;
}

/**
 * What a beat does to the room. All of it persistent except the caption, which
 * is a label on a change rather than the change.
 */
function applyStage(beat){
  const stage = beat.stage ?? null;
  /** Did the change actually reach a board the player can see? */
  let onScreen = false;
  if(stage && Array.isArray(stage.wall)){
    onScreen = ctx.stage?.(stage.wall, {
      flash: stage.flash === true, at: areaOf(beat, getState()),
    }) === true;
  }
  if(beat.panel) ctx.panel?.(String(beat.panel));
  if(beat.waypoint) ctx.waypoint?.(String(beat.waypoint));
  // THE CAPTION IS THE FALLBACK, NOT THE COMPANION.
  //
  // `world` is the bible's sentence for what changed. When the change is on a
  // board in front of the player, printing the sentence as well says the same
  // thing twice — "If you are showing the world states, dont have another text
  // box that says what is in the world states" — and the board is the half that
  // stays true after the caption would have faded.
  //
  // It still goes up when nothing showed it: a beat for a room the player is
  // not standing in, or one with no `stage` rows at all. That is the case the
  // caption was written for, and the alternative there is a change nobody is
  // told about.
  /**
   * AND THE WORLD LINE IS NEVER PRINTED, because it is not player copy.
   *
   * Every line a bible means for the player is labelled "exact player copy" —
   * the call, the setup, the prompt, the bubbles. `World state` is not: it is a
   * stage direction written for whoever builds the room, and it reads like one.
   * "The classify the ledger result remains visible while the close the output
   * identity fixture lights" is an instruction about two fixtures, in the
   * stops' own titles, addressed to nobody in the game.
   *
   * It used to be captioned whenever no `stage` rows had put anything on a
   * board — which is every beat in the campaigns that author no stage rows at
   * all, so those players got a text box after every call describing furniture.
   * Reported as exactly that: "I dont want to see text boxes, just things in
   * the world."
   *
   * What the beat still does is unchanged: `stage` moves the boards, `panel`
   * writes the HUD line, and the bubbles are spoken. The world line is read by
   * `areaOf` and by the book, and shown nowhere.
   */
  ctx.caption?.('');
}

/** Which beats belong to the day the player is on. */
function beatsForDay(state){
  const missions = ctx.theme?.content?.MISSIONS ?? [];
  const m = missions[(state?.week ?? 1) - 1];
  return Array.isArray(m?.beats) ? m.beats : [];
}

function matches(beat, trigger){
  const on = beat.on ?? {};
  if(trigger.kind === 'enter'){
    return on.enter === true && (!on.at || on.at === trigger.at);
  }
  if(trigger.kind === 'stop'){
    // `after` is a list of the mission's own stop numbers. A beat that waits on
    // two stops fires when the last of them closes, not when the first does —
    // which is the whole of the bible's "After Stops 2 and 3".
    const after = on.after ?? [];
    if(!after.length) return false;
    if(!after.includes(trigger.stop)) return false;
    return after.every(n => trigger.closed.includes(n));
  }
  if(trigger.kind === 'mission-end') return on.missionEnd === true;
  return false;
}

const keyOf = (state, beat) => `${state?.week ?? 1}:${beat.id}`;
function alreadyPlayed(state, beat){
  return Array.isArray(state?.beatsPlayed) && state.beatsPlayed.includes(keyOf(state, beat));
}
function markPlayed(state, beats){
  if(!state) return;
  if(!Array.isArray(state.beatsPlayed)) state.beatsPlayed = [];
  for(const b of beats){
    const k = keyOf(state, b);
    if(!state.beatsPlayed.includes(k)) state.beatsPlayed.push(k);
  }
  save();
}

/**
 * One beat becomes a run of bubbles — and nothing else.
 *
 * There is no world card any more, and no panel card. A beat's non-speech parts
 * are applied to the world by `applyStage` the moment it fires; what is left to
 * queue is the speech, because speech is the only part of a beat that has to be
 * taken in turn.
 *
 * A beat with no bubbles queues nothing, which is correct: its wall has already
 * changed and `step` will call `done` on the next line.
 */
function expand(beat){
  const bubbles = Array.isArray(beat.bubbles) ? beat.bubbles : [];
  return bubbles.map(b => ({
    kind: 'bubble', who: b.who, name: b.name,
    say: String(b.say ?? ''), radio: b.radio === true,
  }));
}

/**
 * How long a bubble stays up.
 *
 * Read speed, floored and capped. Two and a half seconds is the floor because a
 * six-word line still has to be noticed; eleven is the cap because the player is
 * walking and a bubble that outlives the walk arrives at the next room with
 * them. 340 ms a word is a slow read, deliberately — this is peripheral text
 * over a moving world, not a page.
 */
const DWELL_MIN = 2600, DWELL_MAX = 11000, DWELL_PER_WORD = 340;
export function dwellFor(say){
  const words = String(say ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.min(DWELL_MAX, Math.max(DWELL_MIN, words * DWELL_PER_WORD));
}

function step(){
  if(timer){ clearTimeout(timer); timer = null; }
  const card = queue[0];
  if(!card){ finish(); return; }
  render(card);
  // ASSUMED IN FRAME, and corrected by `place()` on the very next frame. The
  // other way round — starting nothing until `place()` says the speaker is
  // visible — leaves a bubble up forever in any state where the frame loop is
  // not calling `place()` at all, which is a worse failure than a line that
  // ran a sixtieth of a second early.
  seen = true;
  // ON A TIMER, NOT ON A KEY. A key press to advance means either the player
  // stops walking to read, or W skips the line — and W is held down for most of
  // the walk the bubble is meant to play over.
  timer = setTimeout(() => advance(), dwellFor(card.say));
}

/** Onto the next bubble, or off the screen. The dwell timer's callback. */
export function advance(){
  if(!queue.length) return;
  queue.shift();
  step();
}

function finish(){
  if(timer){ clearTimeout(timer); timer = null; }
  const last = shown;
  // THE CHAIN RUNS FIRST. `fire` passes `done` so an arrival beat can hand over
  // to the stop beat behind it, and holding the last line before that callback
  // would hold the handover with it — the second beat would never play.
  const cb = onDone; onDone = null;
  cb?.();
  // Something followed: it has already rendered its own first line, and this
  // run's last one is gone whether it was held or not.
  if(queue.length) return;
  if(last){ held = last; render(last); return; }
  wipe();
}

/**
 * Off-frame: down it goes, and the dwell stops where it is.
 *
 * The card stays in the DOM and stays the head of the queue. Nothing about the
 * run has changed — only whether there is a face for the balloon to point at.
 */
function unsee(card){
  seen = false;
  card.classList.add('beatUnseen');
  card.classList.remove('tailLeft', 'tailRight', 'beatOffscreen', 'beatCentre', 'beatRadioFixed');
  card.style.left = ''; card.style.top = '';
  // THE LAST CARD'S TIMER IS LEFT RUNNING, and only the last card's.
  //
  // Pausing it buys nothing — the card is not cleared when it expires, it
  // becomes the held card and stays on screen — and it costs the handover:
  // `finish` is where a chained beat gets fired, so an unseen last line stalls
  // the next beat's world change indefinitely. That is how the four-sample rows
  // never reached the wall when the day's first call was answered in the open
  // and the player walked off: the arrival beat's bubble went unseen behind
  // them, its timer stopped, and the beat waiting on it never played.
  //
  // An intermediate card is a different matter: expiry there really does
  // replace it, and a line replaced while nobody could see it is a line lost.
  if(timer && queue.length > 1){ clearTimeout(timer); timer = null; }
}

/**
 * Back in frame. The dwell starts again from the top rather than resuming from
 * where it stopped: the alternative is bookkeeping a remainder across an
 * arbitrary number of frames to save a second or two on a line the player has
 * only just this moment been able to read.
 *
 * A held card is never given a timer — it is waiting for the player to open
 * their next call, which is `dismiss()`.
 */
function see(card){
  card.classList.remove('beatUnseen');
  if(seen) return;
  seen = true;
  if(!timer && !held && queue.length) timer = setTimeout(() => advance(), dwellFor(queue[0].say));
}

/** Take the layer down and forget who was speaking. */
function wipe(){
  anchorOf = null; radioNow = false; shown = null; seen = false;
  if(layer){ layer.innerHTML = ''; layer.classList.remove('show'); }
}

/**
 * The player has opened their next call, so the beat that sent them there is
 * done being read. Clears the held line and the world caption under it.
 *
 * Returns whether anything was up, so a caller can tell "dismissed" from
 * "there was nothing to dismiss" — it is wired to opening a stop, which happens
 * far more often than a beat plays.
 */
export function dismiss(){
  if(held === null && !queue.length) return false;
  // A RUN STILL PLAYING IS ALSO DISMISSED.
  //
  // This cleared only a HELD line, so a bubble still working through its dwell
  // survived the player opening their next call — measured as an arrival
  // bubble sitting behind the verdict card of the stop that had just been
  // answered. An arrival line has an eleven-second dwell and a player can be
  // through the door and into the question inside one.
  //
  // The chain still runs. Whatever beat was waiting behind this one owns a world
  // change, and dropping it because the player was quick would strand the board.
  const cb = queue.length ? onDone : null;
  onDone = null;
  queue.length = 0;
  if(timer){ clearTimeout(timer); timer = null; }
  held = null;
  wipe();
  ctx?.caption?.('');
  cb?.();
  return true;
}

/**
 * WHERE THIS BEAT'S DIALOGUE BELONGS.
 *
 * A card if one is open, the world otherwise.
 *
 * An after-stop beat fires within a second of the verdict card appearing, and it
 * used to speak in a balloon out in the world — behind the card the player is
 * reading, pointing at a head the card is covering. So when the entry point
 * offers a host (the verdict card's own dialogue slot), the whole run is printed
 * there at once with each speaker's face beside their words, and the world
 * balloon never appears.
 *
 * Arrival beats and the mission-outcome beat still use the world, because there
 * is no card open when they fire: the player has just walked through a door.
 */
function cardHost(){
  return ctx?.hostFor?.() ?? null;
}

/**
 * Print the whole run into a card, faces and all, and be done with it.
 *
 * NOT one bubble at a time. On a card there is nothing to walk past and nothing
 * to read over, so a dwell timer would only make the player wait for words that
 * are already on screen — the reason the world bubbles are timed is that they
 * play over a moving world.
 */
function renderToCard(host, cards){
  const rows = cards.map((c) => {
    const person = (ctx.theme?.content?.ROSTER ?? []).find(p => p.id === c.who);
    const name = c.name || person?.name || c.who || '';
    const role = person?.role ? `<span class="beatRole">${esc(person.role)}</span>` : '';
    return `<div class="beatSaid${c.radio ? ' beatSaidRadio' : ''}">`
      + `<span class="beatFace" aria-hidden="true">${portraitSvg({ id: c.who, name }, person?.color)}</span>`
      + `<div class="beatBody"><div class="beatWho">${esc(name)}${role}</div>`
      + `<p class="beatSay beatQuote">${esc(c.say)}</p></div></div>`;
  }).join('');
  host.innerHTML = (host.innerHTML || '') + rows;
  host.classList.add('show');
}

function render(card){
  if(!layer) { advance(); return; }
  // NO SIDE DECISION HERE ANY MORE. The card sits in one place for the whole
  // campaign, so a new line does not get a new position — see `side` above.
  shown = card;
  layer.classList.add('show');
  const who = card.who;
  const person = (ctx.theme?.content?.ROSTER ?? []).find(p => p.id === who);
  const name = card.name || person?.name || who || '';
  const role = person?.role ? `<span class="beatRole">${esc(person.role)}</span>` : '';
  // THE FACE IN THE BUBBLE. On a radio call it is the whole of the connection —
  // the bible asks for "Sundqvist's static portrait in the radio-bubble HUD" and
  // the speaker is four kilometres away. In the room it is a second confirmation
  // beside the tail, which matters when two of the cast are standing together.
  const face = `<span class="beatFace" aria-hidden="true">${portraitSvg({ id: who, name }, person?.color)}</span>`;
  layer.innerHTML =
    `<div class="beatBubble${card.radio ? ' beatRadio' : ''}" id="beatCard">`
    + face
    + `<div class="beatBody"><div class="beatWho">${esc(name)}${role}</div>`
    + `<p class="beatSay beatQuote">${esc(card.say)}</p></div>`
    + `<span class="beatTail" aria-hidden="true"></span></div>`;
  anchorOf = who ?? null;
  radioNow = card.radio === true;
  place();
}

/**
 * Put the bubble where the speaker is. Three cases, and every one of them ends
 * with the balloon pointing at a face.
 *
 * Projected each frame rather than once, because the crowd walks: somebody who
 * spoke while standing at the door has taken two steps by the time the player
 * reads the second sentence, and a bubble pinned to where they *were* points at
 * nobody.
 *
 * WHAT USED TO HAPPEN OFF-SCREEN. `loose()` parked the card in the middle of the
 * screen — which, with the game paused behind a Continue button, was at least
 * unambiguous. Nothing is paused now, the player is turning and walking, and a
 * card in the middle of a moving screen is a card belonging to nobody. So an
 * off-screen speaker pins the balloon to the edge they are past, with the tail
 * on that side: "the dialogue should always be connected to the speaker".
 */
export function place(){
  if(!layer || !playing()) return;
  const card = layer.firstElementChild;
  if(!card) return;
  const w = card.offsetWidth || 320, h = card.offsetHeight || 120;
  const pad = 12;
  const cw = layer.clientWidth, ch = layer.clientHeight;

  // ------------------------------------------------------------ ON THE RADIO
  //
  // The speaker is not in the building. The portrait in the balloon is the
  // speaker as far as this screen is concerned, so the balloon is pinned where
  // a radio panel goes and the tail points back into its own portrait. Fixed,
  // not projected: there is nothing in the scene to project.
  if(radioNow){
    // EXEMPT FROM THE FIELD-OF-VIEW RULE, and the only exemption. A radio
    // speaker is four kilometres away and never in frame by construction; the
    // portrait in the balloon is the whole of the connection. Holding a radio
    // call back until its speaker is visible would hold it back forever.
    see(card);
    card.classList.add('beatRadioFixed');
    card.classList.remove('tailLeft', 'tailRight', 'beatOffscreen');
    card.style.left = ''; card.style.top = '';
    return;
  }
  card.classList.remove('beatRadioFixed');

  const npc = anchorOf ? ctx.npcByCharId?.(anchorOf) : null;
  const pos = npc?.pos;
  if(!pos || !ctx.camera){
    // No rig for this id at all — a roster person the crowd never placed. There
    // is no face anywhere on screen for the balloon to belong to, so under the
    // field-of-view rule it does not go up. `beatCentre` used to catch this and
    // park the card in the middle of the screen, which is the shape the rule was
    // written against.
    //
    // SAID OUT LOUD, ONCE. Hidden and silent, a beat whose speaker the crowd
    // never placed is a line of the campaign that no player will ever see and
    // no gate reports. This is the only thing standing in for that gate.
    if(anchorOf && !warnedNoRig.has(anchorOf)){
      warnedNoRig.add(anchorOf);
      console.warn(`beats: "${anchorOf}" speaks but the crowd placed no rig for them —`
        + ' the bubble stays down, because there is no face for it to point at.');
    }
    unsee(card);
    return;
  }

  // THE TOP OF THE HEAD, not the chest. The rig stands 1.775 m and the head is
  // the last 0.25 of it, so this is the crown — the bubble hangs off that.
  const world = { x: pos.x, y: (pos.y ?? 0) + 1.72, z: pos.z };
  const head = project(world);

  if(!head){
    // ------------------------------------------------- BEHIND OR PAST THE EDGE
    //
    // Pinned to the edge they were past is what this did, with the tail on that
    // side — "the dialogue should always be connected to the speaker", and a
    // balloon on the margin was as connected as it could get. It is not enough:
    // the speaker is not on screen, so what the player reads is a quote hanging
    // off an empty edge. Down it goes, and the dwell stops with it, until they
    // turn far enough to see who is talking.
    unsee(card);
    return;
  }
  see(card);
  card.classList.remove('beatOffscreen');

  // ------------------------------------------------------- BESIDE THE FACE
  //
  // Centred over the anchor is what this did, and at conversational range a
  // 28 rem card centred on somebody's head is a card over their face. A speech
  // balloon does not sit on the speaker: it sits to one side with a tail
  // pointing back, and you can see who is talking.
  //
  // Which side: whichever has more room. `SHOULDER` clears the rig's own width
  // at close range, and the tail is moved to the near edge to match — see
  // `.beatTail` in styles.css, which reads the side off the class.
  const SHOULDER = 54;
  const toRight = side === 'right';
  card.classList.toggle('tailLeft', toRight);
  card.classList.toggle('tailRight', !toRight);

  // ZOOM FIRST, because the offset is measured in the card's own scaled pixels.
  // Distance to the speaker in a straight line, over a range narrow enough that
  // the card never becomes unreadable at the far end or overbearing at the near
  // one.
  const cam = toCamera(world);
  const dist = cam ? Math.hypot(cam.x, cam.y, cam.z) : 6;
  const t = Math.max(0, Math.min(1, (dist - 1.5) / 8.5));
  const k = SCALE_NEAR + (SCALE_FAR - SCALE_NEAR) * t;
  card.style.transformOrigin = toRight ? 'left center' : 'right center';
  card.style.transform = `scale(${k.toFixed(3)})`;

  // BESIDE THIS HEAD, AT A CONSTANT OFFSET FROM IT.
  //
  // Pinned to the head, and the offset from it never changes — that is the whole
  // rule, and the three things that used to break it are all gone:
  //
  //   the side flipped        when the head crossed the middle of the frame, so
  //                           the card jumped across the speaker's face. The
  //                           side is a constant now (see `side`).
  //   the offset was clamped  to the viewport, so a speaker walking toward an
  //                           edge dragged the card off their shoulder and left
  //                           it stuck against the frame. No clamp at all now:
  //                           the card belongs to the head, and if the head is
  //                           near the edge the card is near the edge with it.
  //   the offset was in       unscaled pixels, so zooming in moved the card
  //   screen pixels           closer to the ear and out at range it drifted off
  //                           the shoulder. Scaled with the card.
  //
  // A fixed spot on the screen was the over-correction for all three, and it
  // detached the balloon from the person speaking, which is the one thing it
  // has to stay attached to.
  const offX = SHOULDER * k;
  const left = toRight ? head.x + offX : head.x - offX - w * k;
  const top = head.y - 26 * k;
  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(top)}px`;
  lastPlace = { headX: head.x, headY: head.y, k, left, top, gap: left - head.x, side };
}

/**
 * What the last placement did, for the selftest.
 *
 * The rule worth asserting is not "the card is at x pixels" — that is whatever
 * the projection happens to give — but "the card is a constant distance from the
 * head", and that cannot be checked from the outside without the head's own
 * screen position. So it is reported.
 */
export function placement(){ return lastPlace; }

/**
 * A world point in the camera's own axes, or null with no camera.
 *
 * Split out of `project` because the two questions are different and only one
 * of them has an answer everywhere: "where on screen" is undefined for a point
 * behind the camera, "which side of me" is not. The off-screen branch above
 * needs the second, and computing it from a projection that already returned
 * null is how a bubble ends up pinned to the wrong edge.
 */
function toCamera({ x, y, z }){
  const cam = ctx.camera;
  const w = cam?.matrixWorld?.elements;
  if(!w) return null;
  cam.updateMatrixWorld?.();
  const tx = x - w[12], ty = y - w[13], tz = z - w[14];
  return {
    x: tx * w[0] + ty * w[1] + tz * w[2],
    y: tx * w[4] + ty * w[5] + tz * w[6],
    z: tx * w[8] + ty * w[9] + tz * w[10],
  };
}

/** World point to screen pixels, or null if it is off the frame or behind. */
function project(v){
  const cam = ctx.camera;
  if(!cam) return null;
  // No three.js import here: this module is loaded by a node selftest with no
  // scene in it, and a Vector3 would drag the whole library onto that path.
  const e = cam.projectionMatrix?.elements;
  const c = toCamera(v);
  if(!e || !c) return null;
  const clipW = -c.z;
  if(clipW <= 0.01) return null;
  const px = (c.x * e[0] + c.z * e[8]) / clipW;
  const py = (c.y * e[5] + c.z * e[9]) / clipW;
  if(Math.abs(px) > 1.6 || Math.abs(py) > 1.6) return null;
  return { x: (px * 0.5 + 0.5) * layer.clientWidth, y: (-py * 0.5 + 0.5) * layer.clientHeight };
}

// --------------------------------------------------------------- selftest
//
//   node engine/core/beats.js --selftest
//
// WHY THIS FILE HAS ONE. Everything a beat does is input and DOM, and both are
// exactly what a browser harness could not verify here: a hidden tab dispatches
// no synthetic click and gets no animation frame, so "does pressing a key
// advance the card" came back false whether it worked or not. CLAUDE.md's rule
// about a measurement that produces a plausible answer applies to the absence of
// one too — the honest move is a case that runs without a browser.
//
// Each case is a defect this module could ship:
//   · a beat that fires twice, so walking back through a door replays the scene
//   · a two-stop beat that fires on the first of them
//   · a world line that becomes a card instead of changing the room — the
//     defect this pass was written to fix, and the one a refactor would undo
//   · wall rows, panel and waypoint arriving after the speech they explain
//   · a card run that never ends, so `done` is never called and the mission
//     outcome beat never fires
//   · a bubble with no anchor, which is speech belonging to nobody
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  // Counted rather than written down: the tally in the closing line was a
  // literal, and a literal is a second description of how many cases there are.
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };

  // The smallest DOM these functions touch. `firstElementChild` is a live-ish
  // stand-in: `render` writes innerHTML and `place` reads the child it wrote, so
  // the fake returns one whose classList is inspectable.
  const classList = () => ({ _s: new Set(),
    add(...c){ for(const x of c) this._s.add(x); },
    remove(...c){ for(const x of c) this._s.delete(x); },
    toggle(c, on){ on ? this._s.add(c) : this._s.delete(c); },
    contains(c){ return this._s.has(c); } });
  const child = { style: {}, classList: classList(), offsetWidth: 320, offsetHeight: 120 };
  const layerEl = { _html: '', className: '', style: {}, onclick: null,
    clientWidth: 1200, clientHeight: 800, classList: classList(),
    get innerHTML(){ return this._html; },
    set innerHTML(v){ this._html = v; this.firstElementChild = v ? child : null; },
    firstElementChild: null,
    querySelector: () => null };
  const bodyEl = { classList: classList() };
  globalThis.document = {
    getElementById: (id) => (id === 'beatLayer' ? layerEl : null),
    body: bodyEl,
    createElement: () => ({ getContext: () => null }),
  };

  const state = { week: 1, beatsPlayed: [] };
  const theme = { content: { ROSTER: [{ id: 'a', name: 'A', role: 'R' }], MISSIONS: [{
    // Stops, so `areaOf` has something to read: an `after:` beat belongs to the
    // area of the stop that closes it, not to wherever the player is standing.
    stops: [{ group: 'G' }, { group: 'H' }, { group: 'H' }],
    beats: [
    { id: 'arrive', on: { enter: true, at: 'G' },
      world: 'the wall goes red',
      stage: { flash: true, wall: [{ text: 'SHORTFALL 18.0%', tone: 'alarm' }] },
      bubbles: [{ who: 'a', say: 'one two three four five six' }] },
    // TWO bubbles, deliberately. With one, the first card and the last are the
    // same object and a case about ordering cannot tell them apart — the shape
    // that let the old case 5 pass with its bug put back.
    { id: 'pair', on: { after: [2, 3] },
      world: 'the streams close',
      panel: 'PANEL', waypoint: 'WAY',
      stage: { wall: [{ text: 'CARBON 99.8%', tone: 'warn' }] },
      bubbles: [{ who: 'a', say: 'first line' }, { who: 'a', say: 'second line' }] },
  ] }] } };

  let panelText = null, wayText = null, capText = null;
  let wall = null, wallFlash = null, wallSets = 0, wallAt = null;
  /** Is there a board in the room the player is standing in? */
  let boardVisible = false;
  /** The verdict card's dialogue slot, when a case is testing that path. */
  let hostEl = null;
  const api = initBeats({
    theme,
    // A camera whose world matrix is the identity looking down -z, so a person
    // at z = -4 projects and a person at z = +4 is behind it.
    camera: {
      matrixWorld: { elements: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1] },
      projectionMatrix: { elements: [1.3,0,0,0, 0,1.7,0,0, 0,0,-1,-1, 0,0,-0.2,0] },
      updateMatrixWorld(){},
    },
    npcByCharId: (id) => (id === 'a' ? { pos: npcPos } : null),
    getState: () => state, save: () => {},
    // Returns whether a board in the room actually took the rows, which is what
    // the entry point returns. `boardVisible` is what these cases drive.
    stage: (rows, o) => { wall = rows; wallFlash = o?.flash; wallAt = o?.at ?? null; wallSets++;
                          return boardVisible; },
    // Null for every case above, so those exercise the world path. The card
    // cases at the foot of this file set it.
    hostFor: () => hostEl,
    caption: (t) => { capText = t; },
    panel: (t) => { panelText = t; },
    waypoint: (t) => { wayText = t; },
  });
  let npcPos = { x: 0, y: 0, z: -4 };
  const queueLen = () => queued();

  // 1 — fires once
  check('an arrival beat fires', api.fire({ kind: 'enter', at: 'G' }) === true);
  check('the same beat does not fire a second time',
        api.fire({ kind: 'enter', at: 'G' }) === false,
        'a beat that replays on re-entry tells the player the world is a loop');

  // 2 — the room changed, and it changed BEFORE the speech
  check('the wall took the beat’s rows', wall?.[0]?.text === 'SHORTFALL 18.0%',
        'a persistent_world_change that reaches no wall is a stage direction read aloud');
  check('…and flashed, because the beat asked it to', wallFlash === true);
  check('the rows are filed against the beat’s own area', wallAt === 'G',
        'filed against wherever the player stood, a stop answered outdoors set no board at all');
  // NO BOARD IN THIS ROOM, and the world line STILL does not print. It is a
  // stage direction — the bibles never mark it "exact player copy" the way they
  // do the call, the setup, the prompt and the bubbles — so the player reads the
  // change off the world or does not read it at all.
  check('the world line is never printed, with a board or without one',
        capText === '' && !/beatWorld/.test(layerEl.innerHTML),
        'a text box describing the room is the thing the room was built to say');
  check('the card on screen is the speech', /beatBubble/.test(layerEl.innerHTML));

  // 3 — nothing is blocked and nothing is modal
  check('the player is not pinned by a beat', !bodyEl.classList.contains('beatOpen'),
        'a modal after every correct answer is the reward this pass removed');
  check('there is no Continue button', !/beatGo/.test(layerEl.innerHTML),
        'a button to dismiss speech means the player stops walking to read it');

  // 4 — the bubble is attached to the speaker
  check('a speaker in view gets a tail toward them',
        child.classList.contains('tailLeft') || child.classList.contains('tailRight'));
  check('…and is not parked in the middle', !child.classList.contains('beatCentre'));
  // A SPEAKER OUT OF FRAME TAKES THE BUBBLE WITH THEM.
  //
  // Pinning it to the edge they were past is what this did, and the edge is not
  // a face. The card stays in the DOM and stays the head of the queue — only its
  // visibility changes — so turning back brings the same line back.
  npcPos = { x: 3, y: 0, z: 4 };            // behind the camera, to its right
  place();
  check('a speaker out of frame takes the bubble down',
        child.classList.contains('beatUnseen'),
        'a quote on the margin is attributed to an empty edge');
  check('…and it is not pinned to an edge instead',
        !child.classList.contains('beatOffscreen'));
  check('the line is still the head of the queue', /beatBubble/.test(layerEl.innerHTML),
        'taken down is not the same as skipped');
  // A run of one, out of view, must still be able to hand over: the world
  // change of the beat behind it may not wait on a line nobody is looking at.
  check('a last line out of view keeps its timer, so the chain can still fire',
        queueLen() !== 1 || timerRunning(),
        'an unseen last line stalled the next beat’s world change for good');
  npcPos = { x: 0, y: 0, z: -4 };           // back in front of the camera
  place();
  check('turning back brings the same line back', !child.classList.contains('beatUnseen'));
  check('…with its tail on the speaker again',
        child.classList.contains('tailLeft') || child.classList.contains('tailRight'));

  // THE SIDE DOES NOT FLIP WHILE THE PLAYER TURNS.
  //
  // Same card, speaker moved across the frame. The balloon follows them, and the
  // shoulder it hangs off is the one it started on.
  const sideFirst = child.classList.contains('tailLeft') ? 'tailLeft' : 'tailRight';
  npcPos = { x: -3.4, y: 0, z: -4 };
  place();
  check('the bubble keeps the side it started on', child.classList.contains(sideFirst),
        'recomputed per frame it jumps across the speaker’s face as the player turns');
  npcPos = { x: 3.4, y: 0, z: -4 };
  place();
  check('…and still keeps it turning the other way',
        child.classList.contains(sideFirst));
  npcPos = { x: 0, y: 0, z: -4 };
  place();

  // AND IT DOES NOT SLIDE ABOUT WHILE IT IS BEING READ.
  //
  // The speaker moves across the frame; the card stays put. Only going out of
  // view and coming back gives it a new spot, because by then the player was
  // not looking at it.
  // PINNED TO THE HEAD, AT A CONSTANT OFFSET FROM IT.
  //
  // The card follows the speaker — it is their balloon — and what may never
  // change is the gap between the two. Asserted against the head's own
  // projected position rather than against a pixel column, because "the card is
  // at 640px" is a fact about the projection and not about the rule.
  const gapAt = () => placement().gap;
  const kAt = () => placement().k;

  npcPos = { x: 0, y: 0, z: -4 };
  place();
  const gap0 = gapAt();
  check('the card sits a whole card-width clear of the head', gap0 > 40 && gap0 < 90,
        'centred on the head it covers the face of whoever is talking');

  // The offset is a constant number of the CARD's own pixels, so the thing that
  // must not change as the speaker walks is `gap / k`. Walking sideways changes
  // their distance as well as their bearing — which is why comparing the raw
  // gap fails here, and why comparing it was the wrong assertion rather than
  // the wrong code.
  const shoulder0 = gap0 / kAt();
  npcPos = { x: -2.2, y: 0, z: -4 };        // walked left
  place();
  const headLeft = placement().headX;
  check('…and keeps the same offset from it, in the card’s own pixels',
        Math.abs(gapAt() / kAt() - shoulder0) < 0.001,
        'the clamp used to drag it off the shoulder as the speaker neared an edge');
  npcPos = { x: 2.2, y: 0, z: -4 };         // and right
  place();
  check('…on the other side of the frame too',
        Math.abs(gapAt() / kAt() - shoulder0) < 0.001);
  check('and the card went with them', placement().headX !== headLeft
        && placement().left !== undefined,
        'a card that stays put while the speaker walks is not their balloon');
  check('and always on the same side of the head', placement().side === 'right',
        'a side that flips throws the balloon across the speaker’s face');

  // SIZE, AND THE OFFSET WITH IT.
  npcPos = { x: 0, y: 0, z: -2 };           // right in front of the player
  place();
  const kNear = kAt(), gapNear = gapAt();
  npcPos = { x: 0, y: 0, z: -9 };           // across the room
  place();
  const kFar = kAt(), gapFar = gapAt();
  check('a nearer speaker gets a bigger card', kNear > kFar,
        'zoom is what says the conversation is at arm’s length');
  check('…and the gap scales with the card, so it stays on the shoulder',
        Math.abs(gapNear / kNear - gapFar / kFar) < 0.001,
        'an unscaled offset sits by the ear close up and off the shoulder at range');
  npcPos = { x: 0, y: 0, z: -4 };
  place();

  // A SPEAKER THE CROWD NEVER PLACED gets no bubble either — there is no face
  // for it anywhere on screen. It is warned about instead, once.
  const noRig = npcPos; npcPos = null;
  place();
  check('a speaker with no rig gets no bubble', child.classList.contains('beatUnseen'),
        'parked in the middle of the screen is the shape the rule was written against');
  npcPos = noRig;
  place();

  // 5 — THE RUN DOES NOT END ON ITS OWN ANY MORE.
  //
  // Its bubbles advance on the dwell timer as they always did, and the last one
  // stays. `advance()` past the end is what the dwell callback does, so this is
  // the timer running out with nobody having opened anything.
  let ended = false;
  let guard = 0;
  while(queueLen() > 0 && guard++ < 10) api.advance();
  check('the last line of a run stays up', api.playing(),
        'on a read-speed fade the beat is gone before the player has walked to the thing it is about');
  check('…and it is the last line, not the first',
        /one two three four five six/.test(layerEl.innerHTML));
  // Nothing opened and nothing dismissed, and there is still no caption: the
  // world line is not printed at any point in a run.
  check('…and no world caption came up under it', capText === '');
  check('dismiss takes the held line down', api.dismiss() === true);
  check('…and empties the layer', layerEl.innerHTML === '');
  check('…and clears the caption', capText === '');
  check('dismiss on an empty screen is a no-op', api.dismiss() === false,
        'it is wired to opening a stop, which happens far more often than a beat plays');

  // 6 — a two-stop beat waits for both
  check('a beat waiting on two stops does not fire on the first',
        api.fire({ kind: 'stop', stop: 2, closed: [2] }) === false);
  const both = api.fire({ kind: 'stop', stop: 3, closed: [2, 3] }, { done: () => { ended = true; } });
  check('…and does fire when the second closes', both === true);

  // 7 — panel and waypoint are up with the first word, not after the last
  check('panel text is up on the first card', panelText === 'PANEL',
        'held to the end, the player reads three bubbles about a reading they cannot see');
  check('and so is the waypoint', wayText === 'WAY');
  check('and the wall took the second beat’s rows', wall?.[0]?.text === 'CARBON 99.8%');
  check('…filed against the area of the stop that closed it', wallAt === 'H',
        'a beat waiting on stops 2 and 3 belongs to their room, not to the door the player came in by');
  check('the second beat did not re-flash a wall it did not ask to', wallFlash !== true);

  // 8 — `done` is called when the speech runs out, so mission-end can chain.
  // THE HOLD MUST NOT SWALLOW THE HANDOVER: `finish` runs the callback before it
  // decides to hold, because an arrival beat hands over to the stop beat behind
  // it and a held last line would hold the handover with it.
  guard = 0;
  while(queueLen() > 0 && guard++ < 10) api.advance();
  check('done fires when the last bubble clears', ended === true,
        'without it the mission outcome beat never plays');
  // ONE POSITION FOR THE WHOLE CAMPAIGN, across lines and across runs.
  //
  // The per-line decision passed every case above and still threw the card
  // across the speaker's face between the two lines of this run whenever the
  // head crossed the middle of the frame. So the comparison has to be between
  // two DIFFERENT cards with the speaker moved between them.
  check('the second run holds its own last line too', api.playing());
  check('…and it is the second of the two, not the first',
        /second line/.test(layerEl.innerHTML),
        'holding the first line would mean the run never played');
  // A SECOND LINE HANGS OFF THE SAME SHOULDER AS THE FIRST. Not at the same
  // pixel — the card is pinned to the head and the head has moved — but at the
  // same offset from it, and on the same side.
  place();
  check('a second line keeps the first line’s offset from the head',
        Math.abs(placement().gap / placement().k - shoulder0) < 0.001,
        'a different card is a different decision only if the side is still computed');
  check('…and hangs off the same side', child.classList.contains(sideFirst)
        && placement().side === 'right');
  api.dismiss();
  check('the layer is emptied once the player moves on', layerEl.innerHTML === '');

  // 9 — the dwell timer is read speed, floored and capped
  check('a short line still gets the floor', dwellFor('yes') === 2600);
  check('a long line is capped', dwellFor(new Array(200).fill('word').join(' ')) === 11000);
  check('and a normal line scales with its length',
        dwellFor(new Array(20).fill('word').join(' ')) === 20 * 340);

  // ---- ON A CARD, the whole run at once and no world balloon.
  //
  // The world path above is what an arrival beat uses. This is what an after-stop
  // beat uses, because a verdict card is on screen when it fires.
  const cardEl = { _html: '', classList: classList(),
    get innerHTML(){ return this._html; }, set innerHTML(v){ this._html = v; } };
  hostEl = cardEl;
  state.beatsPlayed = [];
  api.dismiss();
  let chained = false;
  check('a beat with a card to print on returns true',
        api.fire({ kind: 'stop', stop: 3, closed: [2, 3] }, { done: () => { chained = true; } }) === true);
  check('both of the run\'s lines are on the card at once',
        /first line/.test(cardEl.innerHTML) && /second line/.test(cardEl.innerHTML),
        'on a card there is nothing to walk past, so a dwell timer only makes the player wait');
  check('each line carries its speaker\'s face and name',
        (cardEl.innerHTML.match(/beatFace/g) ?? []).length === 2
        && /beatWho/.test(cardEl.innerHTML));
  check('nothing is queued for the world layer', queued() === 0,
        'a balloon behind the card is pointing at a head the card is covering');
  check('the card is shown', cardEl.classList.contains('show'));
  check('the chain still runs', chained === true,
        'there is no dwell to wait for, so the handover happens at once');
  hostEl = null;

  // ---- A RUN STILL PLAYING IS DISMISSED TOO, and its chain still runs. Placed
  // here with the other replaying cases: it clears `beatsPlayed` and fires the
  // pair beat itself, which the sequenced cases above need to fire for
  // themselves. Mid-sequence it broke four of them.
  // A RUN STILL PLAYING IS DISMISSED TOO, and its chain still runs.
  state.beatsPlayed = [];
  let chainRan = false;
  api.fire({ kind: 'stop', stop: 3, closed: [2, 3] }, { done: () => { chainRan = true; } });
  check('a run mid-play has more than one line queued', queued() >= 1);
  check('dismiss takes down a line that is still playing', api.dismiss() === true,
        'an arrival bubble outlived the player opening the next call and sat behind its card');
  check('…and the layer is empty', layerEl.innerHTML === '');
  check('…and the chain behind it still ran', chainRan === true,
        'the beat waiting behind it owns a world change; dropping it strands the board');

  // ---- LAST, because it replays a beat and clears `beatsPlayed` to do it.
  //
  // WITH A BOARD IN THE ROOM, THE SENTENCE DOES NOT GO UP. Placed mid-sequence
  // this clobbered the state four later cases were reading — a case that breaks
  // its neighbours is a case that gets deleted rather than read.
  boardVisible = true;
  capText = 'left over from before';
  state.beatsPlayed = [];
  api.dismiss();
  api.fire({ kind: 'enter', at: 'G' });
  check('with the change on a board, no caption is printed', capText === '',
        'the board is the half that stays true after the caption would have faded');
  check('…and the rows still reached the wall', wall?.[0]?.text === 'SHORTFALL 18.0%');

  console.log(fails.length ? `\nbeats --selftest: ${fails.length} case(s) failed.`
                           : `\nbeats --selftest: ${ran} cases, the room changes, the speech has a speaker `
                             + 'and the last line waits for the player.');
  process.exit(fails.length ? 1 : 0);
}
