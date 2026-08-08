// parse-designbook.mjs — read a curriculum design book into structured data.
//
// The parsing lives here so both the content importer and any repair tool work
// from one implementation. See import-designbook.mjs for the document shape.
import { loadDocx, findTableByHeader, splitCallout } from './docx.mjs';

/**
 * @returns {{shifts: Array, activities: Array, report: {unmapped: Array, warnings: Array, counts: object}}}
 */
export function parseDesignBook(path){
  const blocks = loadDocx(path);
  const report = { unmapped: [], warnings: [], counts: {} };
  const warn = (m) => report.warnings.push(m);

  // ---------------------------------------------------------------- the map
  const mapTable = findTableByHeader(blocks, ['shift']);
  if(!mapTable){
    throw new Error('could not find the curriculum map table (a table whose first column is "Shift")');
  }
  const header = mapTable.rows[0].map(h => h.toLowerCase());
  const col = (name) => header.findIndex(h => h.includes(name));
  const cFocus = col('focus'), cGames = col('game'), cRooms = col('room');
  const shifts = mapTable.rows.slice(1).map((r, i) => {
    const rawTitle = r[0] || '';
    const t = /^\s*(\d+)\s*[.)]\s*(.+)$/.exec(rawTitle);
    return {
      number: t ? +t[1] : i + 1,
      title: (t ? t[2] : rawTitle).trim(),
      focus: cFocus >= 0 ? r[cFocus] : '',
      formats: cGames >= 0 ? r[cGames].split(/[,/]/).map(s => s.trim()).filter(Boolean) : [],
      rooms: cRooms >= 0 ? r[cRooms].split(/[,/]/).map(s => s.trim()).filter(Boolean) : [],
      activities: [],
    };
  });
  report.counts.shifts = shifts.length;

  // ------------------------------------------------------------- the activities
  const H1 = (b) => b.type === 'p' && b.style === 'Heading1';
  const H2 = (b) => b.type === 'p' && b.style === 'Heading2';
  const MARKER = /SHIFT\s+(\d+)\s*[•·]\s*(?:PATIENT\s+)?CASE\s+(\d+)(?:\s*[•·]\s*([A-Z][A-Z /&-]+))?/i;

  /** Text of the paragraphs following a Heading2, up to the next heading. */
  function afterHeading(from, label, { bullets = false } = {}){
    // Start past `from`: it is the section's own Heading1, and breaking on the
    // first H1 seen would abort before scanning anything.
    for(let i = from + 1; i < Math.min(from + 60, blocks.length); i++){
      const b = blocks[i];
      if(H1(b)) break;
      if(H2(b) && b.text.toLowerCase().startsWith(label.toLowerCase())){
        const out = [];
        for(let j = i + 1; j < blocks.length; j++){
          const n = blocks[j];
          if(H1(n) || H2(n)) break;
          if(n.type === 'table'){
            const { body } = splitCallout(n.text);
            if(body) out.push(body);
            continue;
          }
          if(!n.text) continue;
          if(bullets && n.style !== 'ListBullet' && out.length) break;
          out.push(n.text);
        }
        return bullets ? out : out.join(' ');
      }
    }
    return bullets ? [] : '';
  }

  /** Split "A…B…C…D…" run-together option cells into an ordered list. */
  function parseOptions(table){
    if(!table) return [];
    // Usual shape: one row per option, letter in its own cell.
    const byRow = table.rows
      .map(r => {
        if(r.length >= 2 && /^[A-D][.)]?$/.test(r[0].trim())) {
          return { letter: r[0].trim()[0], text: r.slice(1).join(' ').trim() };
        }
        const m = r.length === 1 ? /^([A-D])[.)]\s*(.+)$/.exec(r[0].trim()) : null;
        return m ? { letter: m[1], text: m[2].trim() } : null;
      })
      .filter(o => o && o.text);
    if(byRow.length >= 2) return byRow;
    // Fallback: everything in one blob, split where a letter begins an option.
    const parts = table.text.split(/(?=[A-D](?=[A-Z][a-z]))/).filter(Boolean);
    return parts.map(p => ({ letter: p[0], text: p.slice(1).trim() })).filter(o => o.text);
  }

  /**
   * SEQUENCE activities have no A-D options: the steps are a run of single-cell
   * tables after the prompt, already in the right order. Callout boxes (SCENE,
   * REAL-LIFE RULE, REMEMBER) sit in tables too, so they are excluded by label.
   */
  function parseSequence(slice){
    const promptIdx = slice.findIndex(b => b.style === 'KidCallout');
    if(promptIdx < 0) return [];
    const steps = [];
    for(let i = promptIdx + 1; i < slice.length; i++){
      const b = slice[i];
      if(b.type === 'p' && (b.style === 'Heading1' || b.style === 'Heading2')) break;
      if(b.type !== 'table') continue;
      if(b.rows.length !== 1 || b.rows[0].length !== 1) continue;
      const { label, body } = splitCallout(b.text);
      if(label && /SCENE|RULE|REMEMBER|SITUATION/i.test(label)) continue;
      steps.push(body || b.text);
    }
    return steps;
  }

  const activities = [];
  for(let i = 0; i < blocks.length; i++){
    if(!H1(blocks[i])) continue;
    const title = blocks[i].text;
    if(/—\s*Answer Page$/i.test(title)) continue;          // handled with its question
    if(/^Close the Shift/i.test(title)) continue;
    if(shifts.some(s => s.title === title)) continue;      // a shift heading, not an activity

    // Everything up to the next Heading1 is this activity.
    let end = blocks.length;
    for(let j = i + 1; j < blocks.length; j++) if(H1(blocks[j])){ end = j; break; }
    const slice = blocks.slice(i, end);
    const tables = slice.filter(b => b.type === 'table');

    const scene = tables.map(t => splitCallout(t.text))
      .find(c => c.label && /SCENE|SITUATION/i.test(c.label))?.body || '';
    const prompt = slice.find(b => b.style === 'KidCallout')?.text || '';
    const castLine = slice.find(b => b.type === 'p' && b.style === 'Normal' && /[•·]/.test(b.text))?.text || '';
    const optionTable = tables.find(t => parseOptions(t).length >= 3);
    const options = parseOptions(optionTable);
    const steps = options.length ? [] : parseSequence(slice);

    // The answer page is the next Heading1 with the same title.
    let ansStart = -1;
    for(let j = end; j < Math.min(end + 4, blocks.length); j++){
      if(H1(blocks[j]) && blocks[j].text.replace(/\s*—\s*Answer Page$/i, '') === title){ ansStart = j; break; }
    }
    // The marker line is authoritative for shift / case / format. Front matter has
    // none, so establish it before warning about anything.
    const preMarker = [...slice, ...(ansStart >= 0 ? blocks.slice(ansStart, ansStart + 40) : [])]
      .map(b => MARKER.exec(b.text || '')).find(Boolean);
    if(!preMarker){ report.unmapped.push({ title, reason: 'no SHIFT n / CASE m marker (front matter?)' }); continue; }

    let answer = '', why = '', rebuttals = [], takeaway = '', notes = [], teacher = '';
    if(ansStart >= 0){
      answer = afterHeading(ansStart, 'Correct answer');
      why = afterHeading(ansStart, 'Why it is correct');
      rebuttals = afterHeading(ansStart, 'Why the tempting answers fail', { bullets: true });
      takeaway = afterHeading(ansStart, 'One-sentence takeaway');
      notes = afterHeading(ansStart, 'Implementation notes', { bullets: true });
      teacher = afterHeading(ansStart, 'Teacher');
    } else {
      warn(`no answer page found for activity "${title}"`);
    }

    const marker = preMarker;
    const shiftNo = marker ? +marker[1] : null;
    const caseNo = marker ? +marker[2] : null;
    const format = marker && marker[3] ? marker[3].trim().toLowerCase() : null;

    if(!options.length && !steps.length) warn(`activity "${title}" has neither options nor ordered steps`);
    if(!answer && !steps.length) warn(`activity "${title}" has no correct answer`);

    const correctIndex = options.findIndex(o =>
      answer && o.text.toLowerCase().slice(0, 40) === answer.toLowerCase().slice(0, 40));

    activities.push({
      shift: shiftNo, case: caseNo, format, title,
      cast: castLine, scene, objective: afterHeading(i, 'What you are learning'),
      prompt,
      options: options.map(o => o.text),
      steps,                                  // ordered steps for sequence formats
      correctIndex: correctIndex >= 0 ? correctIndex : null,
      correctText: answer,
      why, rebuttals, takeaway, notes, teacher,
    });
  }
  report.counts.activities = activities.length;
  for(const a of activities){
    const s = shifts.find(s => s.number === a.shift);
    if(s) s.activities.push(a); else warn(`activity "${a.title}" references shift ${a.shift}, not in the map`);
  }
  for(const s of shifts){
    s.activities.sort((x, y) => (x.case ?? 0) - (y.case ?? 0));
    if(s.activities.length !== 3){
      warn(`shift ${s.number} ("${s.title}") parsed ${s.activities.length} activities, expected 3`);
    }
    for(const a of s.activities){
      if(a.correctIndex === null && a.options.length){
        warn(`shift ${s.number} "${a.title}": could not match the correct answer to an option — set correctIndex by hand`);
      }
    }
  }

  return { shifts, activities, report, blocks };
}
