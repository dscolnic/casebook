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
  ch.readings = Object.entries(pack.readings ?? {}).map(([key, r]) => ({
    zone: pack.zones?.[r.zone] ?? r.zone,
    label: r.name,
    value: r.observed,
    status: salient.has(key) ? 'alarm' : 'normal',
    note: r.reference ? `Expected: ${r.reference}` : r.purpose,
  }));
  ch.choices = Object.values(pack.hypotheses ?? {})
    .map(h => ({ label: h.label, mechanism: h.choice }));
  // An L4 pack is one no single cause fits: the answer arrives as "A + B" and
  // the panel grades it as a set.
  const answers = String(ch.answer ?? '').split(' + ').map(a => a.trim()).filter(Boolean);
  if(answers.length > 1) ch.correctChoices = answers;
  else ch.correctChoice = answers[0] ?? ch.answer;
}
