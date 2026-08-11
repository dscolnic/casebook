// normalize.js — make a theme's content mean the same thing whichever book it
// came from.
//
// Content is generated from design documents by importers that have to map
// every activity onto a format the engine knows. They guess, and they spell
// things differently, and the guesses used to be repaired by hand inside each
// game's theme.js — two files carrying near-identical repair code, which is how
// a repair reaches one game and not the next.
//
// This runs once, in engine/core/theme.js, before any core module reads the
// content. After it, every game's content obeys the same rules:
//
//   · `game.type` is one of the canonical tokens below
//   · a lesson that referenced a diagnosis pack carries the panel itself
//   · a format with no data for its format has been retyped to what it is
//   · every estimate lesson has an entry in BALLPARK_CALCS
//   · every roster entry has a division, or the theme said which one
//
// It reports rather than throws. A theme with a genuine hole should fail its
// conformance check with a sentence a person can act on, not a stack trace at
// the first question panel.

/** The formats the question UI can render. Everything maps onto one of these. */
export const FORMATS = new Set([
  'PROTOCOL', 'SEQUENCE', 'BALLPARK', 'SCIENCETANK',
  'DIAGNOSIS', 'TRIAGE', 'CASEBOOK', 'CHOICE',
]);

/** 'Science Tank' | 'sciencetank' | 'SCIENCE_TANK' -> 'SCIENCETANK'. */
export function canonicalType(type){
  return String(type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
}

const baseTitle = (t) => String(t ?? '').replace(/ — Review \d+$/, '');

/**
 * Normalise in place. Returns `{ changes, problems }` — changes for the log,
 * problems for the conformance check.
 *
 * `content` is the theme's own content block. The optional pieces it may carry:
 *
 *   DIAGNOSIS_PACKS    id -> authored panel, for lessons that reference `pack`
 *   BALLPARK_BY_TITLE  lesson title -> number-tile spec, applied to its reviews
 *   DIVISION_BY_PERSON person id -> group id, for a roster that omits it
 */
export function normalizeContent(content = {}){
  const changes = [];
  const problems = [];
  const curriculum = content.CURRICULUM ?? {};
  // Applied after the lessons are canonical, at the bottom of this function.
  const calcs = content.BALLPARK_CALCS ?? {};
  const packs = content.DIAGNOSIS_PACKS ?? {};
  const specs = content.BALLPARK_BY_TITLE ?? {};

  for(const [group, lessons] of Object.entries(curriculum)){
    if(!Array.isArray(lessons)) continue;
    for(const lesson of lessons){
      const ch = lesson?.game;
      if(!ch) continue;
      const at = `${group} "${lesson.title ?? '?'}"`;

      // ---- 1. one spelling per format
      const kind = canonicalType(ch.type);
      if(ch.type !== kind) changes.push(`${at}: type "${ch.type}" -> ${kind}`);
      ch.type = kind;

      // ---- 2. a pack reference becomes the panel it names
      if(ch.pack){
        const pack = packs[ch.pack];
        if(!pack){
          problems.push(`${at}: references diagnosis pack "${ch.pack}", which the theme does not supply`);
        } else {
          applyPack(ch, pack);
          changes.push(`${at}: expanded pack ${ch.pack}`);
        }
      }

      // ---- 3. a format with no data for its format is not that format
      if(ch.type === 'DIAGNOSIS' && !(ch.readings || []).length && !ch.figure){
        ch.type = 'CHOICE';
        changes.push(`${at}: DIAGNOSIS with no panel -> CHOICE`);
      }
      if(ch.type === 'CASEBOOK'){
        const rows = ch.scenarios || ch.cards;
        const hasMapping = rows?.length && ch.mapping?.length === rows.length;
        const hasRealProposals = ch.proposals?.length > 1
          && ch.proposals.every(p => Number.isFinite(+p.target));
        if(!hasMapping && !hasRealProposals){
          ch.type = 'CHOICE';
          // The placeholders an importer leaves behind — "Other pattern",
          // "Third pattern" — would otherwise be rendered as a funding round.
          delete ch.proposals;
          delete ch.recommended;
          changes.push(`${at}: CASEBOOK with no mapping and no real proposals -> CHOICE`);
        }
      }

      // ---- 4. every estimate has a spec, across its review lessons too
      if(ch.type === 'BALLPARK'){
        const key = `${group}-${lesson.day}`;
        if(!calcs[key]){
          const spec = specs[baseTitle(lesson.title)];
          if(spec){ calcs[key] = spec; changes.push(`${at}: registered estimate spec at ${key}`); }
          else problems.push(`${at}: BALLPARK with no entry in BALLPARK_CALCS and no spec for its title`);
        }
      }

      if(!FORMATS.has(ch.type)){
        problems.push(`${at}: format "${ch.type}" has no renderer`);
      }
    }
  }

  // ---- 5. a person stop needs somebody in that group
  const roster = content.ROSTER ?? [];
  const byPerson = content.DIVISION_BY_PERSON ?? {};
  for(const person of roster){
    if(!person.division && byPerson[person.id]){
      person.division = byPerson[person.id];
      changes.push(`roster "${person.id}": division ${person.division} from the theme's map`);
    }
  }
  const covered = new Set(roster.map(p => p.division).filter(Boolean));
  for(const g of content.GROUPS ?? []){
    if(!covered.has(g.id)){
      problems.push(`group "${g.id}" has nobody on the roster — every person stop there is unreachable`);
    }
  }

  // ---- last: the shape of the days themselves
  shapeMissions(content.MISSIONS ?? [], curriculum, changes);

  return { changes, problems };
}

/**
 * A pack is authored richer than the panel needs: zones keyed by id, readings
 * keyed by id with an observed value and a reference, and hypotheses carrying
 * both a short label and the mechanism behind it. Map it down.
 *
 * `salient` is which readings are drawn as the loud ones. It is authored, and
 * it is deliberately not the answer — the exercise is that the loud readings do
 * not settle it.
 */
function applyPack(ch, pack){
  const salient = new Set(pack.salient ?? []);
  ch.type = 'DIAGNOSIS';
  ch.headline = pack.hook ?? ch.headline;
  ch.play = pack.riddle ?? ch.play;
  // A pack's `salient` list names the readings the puzzle turns on. That is not
  // a severity, and rendering it as one told the player the opposite of the
  // truth: "counts with the detector high voltage off: 0" is the reading that
  // clears the electronics, and it was arriving in alarm red.
  ch.readings = Object.entries(pack.readings ?? {}).map(([id, r]) => ({
    zone: pack.zones?.[r.zone] ?? r.zone,
    label: r.name,
    value: r.observed,
    status: r.status ?? (salient.has(id) ? 'key' : 'normal'),
    note: r.reference ? `Expected: ${r.reference}` : r.purpose,
  }));
  ch.choices = Object.values(pack.hypotheses ?? {})
    .map(h => ({ label: h.label, mechanism: h.choice }));
  // An L4 pack is one no single cause fits: the answer arrives as "A + B" and
  // the panel grades it as a set.
  const answers = String(ch.answer ?? '').split(' + ').map(a => a.trim()).filter(Boolean);
  if(answers.length > 1) ch.correctChoices = answers;
  else ch.correctChoice = answers[0] ?? ch.answer;
  // A pack's `reasons` say why each hypothesis that is not the answer fails,
  // keyed the same way as `hypotheses`. Nothing read them. They are exactly what
  // the verdict's rebuttal list is for, and Project Y authored nine packs' worth
  // — every one of them written, shipped, and never once shown to a player.
  if(pack.reasons && !ch.rebuttals){
    const keyed = new Set(answers);
    const rebuttals = Object.entries(pack.hypotheses ?? {})
      .filter(([, h]) => !keyed.has(h.label))
      .map(([id]) => pack.reasons[id])
      .filter(r => typeof r === 'string' && r.trim());
    if(rebuttals.length) ch.rebuttals = rebuttals;
  }
}

/**
 * The shape of a teaching day, applied to whatever the book wrote.
 *
 * Two things were wrong with the days as authored, and both are structural
 * rather than editorial, so they are fixed here rather than in four books.
 *
 * ## Nobody should walk into the same room three times
 *
 * The design books write a day as one unit on one topic — "The Unknown
 * Containers", "Breathing Room" — and an area is a building, so all three calls
 * landed in the same building. Riverton and the hospital did it on 15 days out
 * of 15. The fix keeps the unit intact: the *first* call on an area is at its
 * room, and any repeat of that area the same day is a person stop, which is
 * somebody standing somewhere else in the town. The lesson is unchanged; only
 * where you answer it moves.
 *
 * ## A unit that closes is never asked about again
 *
 * That is the bigger problem. Blocked practice — all of one topic, then all of
 * the next — is how these books are written and it is how people forget: the
 * material is never retrieved once its unit ends, until the capstone fifteen
 * days later. Spaced retrieval is the best-evidenced intervention in the
 * literature, and the content for it already exists, so from the third day on
 * every day carries one extra call that revisits an area taught earlier.
 *
 * A callback prefers a `— Review` variant of the lesson where the theme has one
 * (the hospital has 105 of them, none of which were reachable), and otherwise
 * re-asks the lesson itself, which is what spacing means.
 *
 * Deep Watch needs almost none of the first rule — it was authored interleaved
 * — and Project Y needs none of it. Both still get the callbacks.
 */
export function shapeMissions(missions = [], curriculum = {}, changes = []){
  if(!Array.isArray(missions) || !missions.length) return missions;
  /** Lessons already taught, oldest first: [group, lessonIndex, title]. */
  const taught = [];
  const calledBack = new Set();

  missions.forEach((mission, day) => {
    if(!Array.isArray(mission.stops) || !mission.stops.length) return;
    // Drop any callback a previous run added, so this is idempotent under HMR.
    mission.stops = mission.stops.filter(s => !s.callback);

    // ---- who is a person stop, decided here rather than by a campaign-wide
    // "every third one" rule that knows nothing about the day it lands in.
    //
    // A repeat of an area has to be a person, or the day sends the player into
    // the same room twice. Beyond that every day wants exactly one person stop:
    // the rosters carry three-paragraph teaching bios and a quiz each, and a
    // day with none never opens one. Leaving it to the old rule stacked the two
    // and made 34 of Riverton's 58 calls a person hunt.
    const seen = new Set();
    for(const stop of mission.stops){
      if(seen.has(stop.group)){
        if(stop.person !== true){
          stop.person = true;
          changes.push(`day ${day + 1}: second call on ${stop.group} becomes a person stop`);
        }
      } else {
        seen.add(stop.group);
        stop.person = false;
      }
    }
    if(!mission.stops.some(s => s.person)){
      // The middle of the day, so it is neither the opening nor the close.
      const at = Math.min(1, mission.stops.length - 1);
      mission.stops[at].person = true;
      changes.push(`day ${day + 1}: call ${at + 1} becomes the day's person stop`);
    }

    // ---- the callback, from the third day on
    if(day >= 2){
      // Oldest first, and something not already revisited if there is one —
      // but with six areas and three in the day, the early days can run out of
      // fresh material, and a second retrieval of the same lesson is worth more
      // than no retrieval at all.
      const candidate = taught.find(t => !calledBack.has(`${t.group}:${t.lesson}`) && !seen.has(t.group))
                     ?? taught.find(t => !seen.has(t.group));
      if(candidate){
        calledBack.add(`${candidate.group}:${candidate.lesson}`);
        const lessons = curriculum[candidate.group] ?? [];
        const base = lessons[candidate.lesson];
        // A review variant if the theme wrote one, the lesson itself otherwise.
        const reviewAt = lessons.findIndex(l =>
          typeof l?.title === 'string' && base?.title
          && l.title.startsWith(base.title) && /review/i.test(l.title));
        const lessonIdx = reviewAt >= 0 ? reviewAt : candidate.lesson;
        mission.stops.push({
          group: candidate.group,
          lesson: lessonIdx,
          task: `Second look — ${base?.title ?? 'earlier work'}`,
          title: base?.title ?? '',
          // A callback is a room: it is the day's other building, and the point
          // of it is partly that the player goes somewhere else.
          person: false,
          callback: true,
        });
        changes.push(`day ${day + 1}: callback to ${candidate.group} lesson ${lessonIdx}`);
      }
    }

    for(const stop of mission.stops){
      if(!stop.callback) taught.push({ group: stop.group, lesson: stop.lesson });
    }
  });
  return missions;
}
