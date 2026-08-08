// parse-missionbook.mjs — read a *mission-shaped* curriculum design book.
//
// The hospital book (tools/parse-designbook.mjs) numbers its work in SHIFTs and
// puts each activity behind its own Heading1 plus a separate answer page. The
// contaminated-city book uses a different, flatter structure, so it gets its own
// parser rather than a pile of conditionals in the old one:
//
//   <table>    Mission | High-stakes problem | Route | Core concepts | Selected games
//   Normal     MISSION n
//   Normal     <mission title>
//   MissionQuote <briefing>
//   Heading2   Mission route            -> "A  →  B  →  C"
//   Heading2   Curriculum purpose       -> "Core concepts: …" / "Mission outcome: …"
//   Heading2   Scene progression        -> ListNumber "Stop k: <place> — <what happens>"
//   Heading2   Activity n.m: <title>
//   Normal       SELECTED FORMAT  <Protocol|Sequence|Ballpark|Science Tank>
//   Heading3     Scene setup            -> the situation the player reasons from
//   Heading3     Player-facing task     -> the instruction, plus the format's own data
//   Heading3     Complete solution      -> the answer, in the format's own shape
//   Heading3     Why the solution works -> why
//   Heading3     Why tempting alternatives fail -> rebuttals
//   Heading3     Teaching takeaway      -> one sentence
//   Heading3     Implementation notes   -> bullets
//
// Nothing is inferred from prose: the format comes from the SELECTED FORMAT
// line, and the mission/activity numbers come from the Activity heading.
import { loadDocx, findTableByHeader } from './docx.mjs';

const H = (n) => (b) => b.type === 'p' && b.style === `Heading${n}`;
const H1 = H(1), H2 = H(2), H3 = H(3), H4 = H(4);
const isHeading = (b) => H1(b) || H2(b) || H3(b);

const ARROW = /\s*(?:→|->|—>|>>)\s*/;
/** Word writes "×" and "^" in prose; normalise only what the parser compares on. */
const norm = (s) => String(s || '').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").trim();
/** Compare option text without punctuation or case, so a trailing full stop never breaks a match. */
const key = (s) => norm(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * The blocks of one Heading3 section, by label, from within an activity slice.
 * Heading4 blocks (Given / Question) stay inside their parent section.
 */
function section(slice, label){
  const at = slice.findIndex(b => H3(b) && norm(b.text).toLowerCase().startsWith(label.toLowerCase()));
  if(at < 0) return [];
  const out = [];
  for(let i = at + 1; i < slice.length; i++){
    if(isHeading(slice[i])) break;
    out.push(slice[i]);
  }
  return out;
}
const textOf = (blocks) => blocks.filter(b => b.text).map(b => norm(b.text)).join(' ');
const bulletsOf = (blocks) => blocks.filter(b => b.style === 'ListBullet' && b.text).map(b => norm(b.text));
const numbersOf = (blocks) => blocks.filter(b => b.style === 'ListNumber' && b.text).map(b => norm(b.text));

/** A Heading4 subsection (Given, Question) inside an already-extracted section. */
function sub(blocks, label){
  const at = blocks.findIndex(b => H4(b) && norm(b.text).toLowerCase().startsWith(label.toLowerCase()));
  if(at < 0) return [];
  const out = [];
  for(let i = at + 1; i < blocks.length; i++){
    if(H4(blocks[i])) break;
    out.push(blocks[i]);
  }
  return out;
}

// ---------------------------------------------------------------- formats

/**
 * PROTOCOL. The prompt carries a two-column table of situations and lettered
 * choices; the solution restates each pairing as "situation  →  choice".
 *
 * The book contains at least one activity whose choices are not textually
 * unique (Mission 2 offers "Ideal volume tends to increase." as both A and B).
 * Matching a duplicate by text alone would produce a mapping like [0,0,2,3],
 * which is not a permutation — the player could pick the identically-worded
 * option and be marked wrong. Indices are therefore assigned greedily among the
 * still-unused equal-text choices, and the collision is reported.
 */
function parseProtocol(slice, warn, id){
  const task = section(slice, 'Player-facing task');
  const table = task.find(b => b.type === 'table' && b.rows.length > 1);
  const scenarios = [], choices = [];
  if(table){
    for(const row of table.rows.slice(1)){
      const s = norm(row[0]).replace(/^\d+[.)]\s*/, '');
      const c = norm(row[1] || '').replace(/^[A-Z][.)]\s*/, '');
      if(s) scenarios.push(s);
      if(c) choices.push(c);
    }
  }
  const mapping = [];
  const used = new Set();
  for(const line of numbersOf(section(slice, 'Complete solution'))){
    const [, right] = norm(line).replace(/^\d+[.)]\s*/, '').split(ARROW);
    if(right === undefined) continue;
    const want = key(right);
    let idx = choices.findIndex((c, i) => !used.has(i) && key(c) === want);
    if(idx < 0) idx = choices.findIndex(c => key(c) === want);   // all copies already used
    mapping.push(idx);
    if(idx >= 0) used.add(idx);
  }
  const dupes = choices.filter((c, i) => choices.findIndex(o => key(o) === key(c)) !== i);
  if(dupes.length) warn(`${id}: choices are not textually unique (${dupes.length} duplicate) — ` +
                        `matching was resolved by position; consider rewording in the book`);
  if(scenarios.length !== 4 || choices.length !== 4){
    warn(`${id}: parsed ${scenarios.length} situations and ${choices.length} choices, expected 4 of each`);
  }
  if(mapping.length !== scenarios.length || mapping.includes(-1)){
    warn(`${id}: could not map every situation to a choice`);
  }
  return { scenarios, choices, mapping };
}

/**
 * SEQUENCE. The prompt lists the four cards as "A. …" bullets; the solution is
 * one line of "step → step → step → step". The order is read from the solution
 * rather than assumed to match the bullet order.
 */
function parseSequence(slice, warn, id){
  const cards = bulletsOf(section(slice, 'Player-facing task'))
    .map(b => norm(b).replace(/^[A-Z][.)]\s*/, ''));
  const solutionLine = textOf(section(slice, 'Complete solution'));
  const wanted = solutionLine.split(ARROW).map(norm).filter(Boolean);
  const order = [];
  const used = new Set();
  for(const w of wanted){
    const i = cards.findIndex((c, n) => !used.has(n) && key(c) === key(w));
    if(i >= 0){ order.push(i); used.add(i); }
  }
  if(cards.length !== 4) warn(`${id}: parsed ${cards.length} sequence cards, expected 4`);
  if(order.length !== cards.length){
    warn(`${id}: the solution names ${order.length} of ${cards.length} cards — order fell back to book order`);
    return { cards, order: cards.map((_, i) => i) };
  }
  return { cards, order };
}

/**
 * SCIENCE TANK. Proposals are "A: text" bullets; the solution is
 * "A: 30 credits — text" per proposal. A proposal recommended zero credits is
 * left out of `recommended` entirely, which is how the engine's grader learns
 * it is unsupported rather than merely cheap.
 */
function parseTank(slice, warn, id){
  const proposals = bulletsOf(section(slice, 'Player-facing task')).map(b => {
    const m = /^([A-Z])\s*[:.)]\s*(.+)$/.exec(norm(b));
    return m ? { label: m[1], text: m[2] } : null;
  }).filter(Boolean);
  const recommended = {};
  let total = 0;
  for(const line of bulletsOf(section(slice, 'Complete solution'))){
    const m = /^([A-Z])\s*[:.)]\s*([\d.]+)\s*credits?/i.exec(norm(line));
    if(!m) continue;
    const credits = +m[2];
    total += credits;
    if(credits > 0) recommended[m[1]] = credits;
  }
  if(proposals.length !== 4) warn(`${id}: parsed ${proposals.length} proposals, expected 4`);
  if(!Object.keys(recommended).length) warn(`${id}: no recommended allocation could be read`);
  else if(total !== 100) warn(`${id}: recommended credits total ${total}, not 100`);
  return { proposals, recommended };
}

/**
 * BALLPARK. The book supplies the givens, the governing relationship and the
 * question as prose. Turning that into the engine's number-tile spec needs
 * numeric values and an evaluable formula, which prose relationships such as
 * "Two moles A are required per mole B" do not provide — so the prose is
 * carried here and the executable spec lives in the theme's ballpark overrides,
 * keyed by activity id. Anything without an override is reported, never faked.
 */
function parseBallpark(slice){
  const task = section(slice, 'Player-facing task');
  const givens = bulletsOf(sub(task, 'Given'));
  // Like the other callouts, the label and the relationship share one cell:
  // "Governing relationshipV = nRT/P."
  let relationship = '';
  for(const b of task){
    const m = /^Governing relationship\s*(.+)$/i.exec(norm(b.text));
    if(m){ relationship = m[1].trim(); break; }
  }
  const question = textOf(sub(task, 'Question'));
  return { givens, relationship, question };
}

const FORMATS = {
  'protocol': 'Protocol',
  'sequence': 'Sequence',
  'ballpark': 'Ballpark',
  'science tank': 'Science Tank',
};

/**
 * @returns {{missions: Array, activities: Array, glossary: Array, report: object}}
 */
export function parseMissionBook(path){
  const blocks = loadDocx(path);
  const report = { unmapped: [], warnings: [], counts: {} };
  const warn = (m) => report.warnings.push(m);

  // ------------------------------------------------------------ the map table
  const mapTable = findTableByHeader(blocks, ['mission']);
  if(!mapTable){
    throw new Error('could not find the curriculum map table (a table whose first column is "Mission")');
  }
  const header = mapTable.rows[0].map(h => h.toLowerCase());
  const col = (name) => header.findIndex(h => h.includes(name));
  const cProblem = col('problem'), cRoute = col('route'), cConcepts = col('concept'), cGames = col('game');
  const missions = mapTable.rows.slice(1).map((r, i) => {
    const m = /^\s*(\d+)\s*[.)]\s*(.+)$/.exec(norm(r[0]));
    return {
      number: m ? +m[1] : i + 1,
      title: (m ? m[2] : norm(r[0])).trim(),
      problem: cProblem >= 0 ? norm(r[cProblem]) : '',
      route: cRoute >= 0 ? norm(r[cRoute]).split(ARROW).map(norm).filter(Boolean) : [],
      concepts: cConcepts >= 0 ? norm(r[cConcepts]).split(/,\s*/).filter(Boolean) : [],
      formats: cGames >= 0 ? norm(r[cGames]).split(/,\s*/).filter(Boolean) : [],
      stake: '', outcome: '', stops: [], activities: [],
    };
  });
  report.counts.missions = missions.length;
  const byNumber = new Map(missions.map(m => [m.number, m]));

  // --------------------------------------------------------- mission sections
  // "MISSION n" is a bare paragraph, and everything up to the next one belongs
  // to that mission. The map table already supplied route and concepts; this
  // pass adds what only the body carries — the stake, the outcome and the stops.
  const missionStarts = [];
  blocks.forEach((b, i) => {
    const m = b.type === 'p' && /^MISSION\s+(\d+)$/i.exec(norm(b.text));
    if(m) missionStarts.push({ number: +m[1], at: i });
  });
  for(let s = 0; s < missionStarts.length; s++){
    const { number, at } = missionStarts[s];
    const end = s + 1 < missionStarts.length ? missionStarts[s + 1].at : blocks.length;
    const slice = blocks.slice(at, end);
    const mission = byNumber.get(number);
    if(!mission){ warn(`body has MISSION ${number}, which is not in the map table`); continue; }
    mission.blockRange = [at, end];

    const quote = slice.find(b => b.style === 'MissionQuote');
    if(quote) mission.briefing = norm(quote.text);
    // The stake is a callout box, so its label runs into its body in one cell.
    for(const b of slice){
      const m = /^What is at stake\s*(.+)$/i.exec(norm(b.text));
      if(m){ mission.stake = m[1].trim(); break; }
    }

    const purposeAt = slice.findIndex(b => H2(b) && /^Curriculum purpose/i.test(norm(b.text)));
    if(purposeAt >= 0){
      for(let i = purposeAt + 1; i < slice.length && !isHeading(slice[i]); i++){
        const t = norm(slice[i].text);
        const outcome = /^Mission outcome:\s*(.+)$/i.exec(t);
        if(outcome) mission.outcome = outcome[1];
      }
    }
    const progressAt = slice.findIndex(b => H2(b) && /^Scene progression/i.test(norm(b.text)));
    if(progressAt >= 0){
      for(let i = progressAt + 1; i < slice.length && !isHeading(slice[i]); i++){
        const m = /^Stop\s+(\d+):\s*(.+?)\s*—\s*(.+)$/.exec(norm(slice[i].text));
        if(m) mission.stops.push({ index: +m[1], place: m[2], beat: m[3] });
      }
    }
  }

  // ---------------------------------------------------------------- activities
  const activities = [];
  const activityHeads = [];
  blocks.forEach((b, i) => {
    const m = H2(b) && /^Activity\s+(\d+)\.(\d+)\s*:\s*(.+)$/.exec(norm(b.text));
    if(m) activityHeads.push({ mission: +m[1], index: +m[2], title: m[3], at: i });
  });
  for(let a = 0; a < activityHeads.length; a++){
    const head = activityHeads[a];
    // An activity ends at the next Heading2 or Heading1 — the debrief section
    // that follows the third activity is a Heading2, so this terminates cleanly.
    let end = blocks.length;
    for(let j = head.at + 1; j < blocks.length; j++){
      if(H1(blocks[j]) || H2(blocks[j])){ end = j; break; }
    }
    const slice = blocks.slice(head.at, end);
    const id = `${head.mission}.${head.index}`;

    const formatLine = slice.find(b => /^SELECTED FORMAT/i.test(norm(b.text)));
    const rawFormat = formatLine ? norm(formatLine.text).replace(/^SELECTED FORMAT\s*/i, '') : '';
    const format = FORMATS[rawFormat.toLowerCase()];
    if(!format){
      report.unmapped.push({ id, title: head.title, reason: `unknown SELECTED FORMAT "${rawFormat}"` });
      continue;
    }
    const whyFormatLine = slice.find(b => /^WHY THIS FORMAT BELONGS HERE/i.test(norm(b.text)));

    const activity = {
      mission: head.mission, index: head.index, id, title: head.title, format,
      whyFormat: whyFormatLine ? norm(whyFormatLine.text).replace(/^WHY THIS FORMAT BELONGS HERE\s*/i, '') : '',
      scene: textOf(section(slice, 'Scene setup')),
      // The bullets and tables belong to the format parsers; the play instruction
      // is the plain paragraph text at the head of the task section.
      play: textOf(section(slice, 'Player-facing task').filter(b => b.type === 'p' && b.style === 'Normal')),
      solution: textOf(section(slice, 'Complete solution')),
      why: textOf(section(slice, 'Why the solution works')),
      interpretation: textOf(section(slice, 'Mission interpretation')),
      rebuttals: (() => {
        const s = section(slice, 'Why tempting alternatives fail');
        const bullets = bulletsOf(s);
        return bullets.length ? bullets : (textOf(s) ? [textOf(s)] : []);
      })(),
      // "Teaching takeaway" is a callout box whose fixed heading runs straight
      // into the sentence: "What the player should leave understandingChemical
      // identity begins with…". Strip the heading rather than the whole cell.
      takeaway: (() => {
        const lines = section(slice, 'Teaching takeaway').filter(b => b.text).map(b => norm(b.text));
        for(const l of lines){
          const m = /^What the player should leave understanding\s*(.+)$/i.exec(l);
          if(m) return m[1].trim();
        }
        return lines[0] || '';
      })(),
      notes: bulletsOf(section(slice, 'Implementation notes')),
    };

    if(format === 'Protocol') Object.assign(activity, parseProtocol(slice, warn, id));
    else if(format === 'Sequence') Object.assign(activity, parseSequence(slice, warn, id));
    else if(format === 'Science Tank') Object.assign(activity, parseTank(slice, warn, id));
    else if(format === 'Ballpark') Object.assign(activity, { ballpark: parseBallpark(slice) });

    if(!activity.scene) warn(`${id}: no scene setup — the pre-question panel would have nothing to reason from`);
    if(!activity.takeaway) warn(`${id}: no teaching takeaway`);
    if(activity.takeaway && activity.why && key(activity.takeaway) === key(activity.why)){
      warn(`${id}: takeaway repeats the "why", which gives the answer away in the intro`);
    }
    activities.push(activity);
  }
  report.counts.activities = activities.length;

  for(const a of activities){
    const m = byNumber.get(a.mission);
    if(m) m.activities.push(a);
    else warn(`activity ${a.id} references mission ${a.mission}, which is not in the map`);
  }
  for(const m of missions){
    m.activities.sort((x, y) => x.index - y.index);
    if(m.activities.length !== 3){
      warn(`mission ${m.number} ("${m.title}") parsed ${m.activities.length} activities, expected 3`);
    }
  }

  // ------------------------------------------------------------------ glossary
  // Appendix D is one paragraph per term: "Term. definition". Entries whose
  // definition is the book's placeholder ("A course concept used in Mission n")
  // are kept — they still tell the player which mission defines the term.
  const glossary = [];
  const glossaryAt = blocks.findIndex(b => H1(b) && /Appendix D/i.test(norm(b.text)));
  if(glossaryAt >= 0){
    for(let i = glossaryAt + 1; i < blocks.length; i++){
      if(H1(blocks[i])) break;
      const m = /^([^.]{2,60})\.\s+(.+)$/.exec(norm(blocks[i].text));
      if(m) glossary.push({ name: m[1].trim(), definition: m[2].trim() });
    }
  }
  report.counts.glossary = glossary.length;

  return { missions, activities, glossary, report, blocks };
}
