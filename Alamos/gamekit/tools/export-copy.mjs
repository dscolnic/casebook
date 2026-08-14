// export-copy.mjs — pull every editable sentence out of a book, for a copy-edit
// round somewhere else, and keep enough bookkeeping to put it back.
//
//   node tools/export-copy.mjs <theme>
//
// Writes two files next to the book:
//
//   books/copy/<theme>-copy.jsonl       give this to the editor
//   books/copy/<theme>-copy.manifest.json   keep this; `apply-copy.mjs` needs it
//
// Why not hand over the book itself: `books/*.yml` is the single source of truth
// and it is full of things an editor should not touch and will — block scalars
// that must keep their indentation, a `answer:` that has to stay byte-identical
// to one of its `choices`, targets and tolerances, group ids, `mapping` arrays.
// One reflowed paragraph or one smart quote and the importer refuses the book.
//
// So the sheet is one line per editable string, keyed by a stable id, with the
// structure stripped out. The editor changes `text` and nothing else. The
// manifest holds the original of every line so `apply-copy.mjs` can find it in
// the book again by exact match and refuse anything ambiguous.
//
// What is deliberately NOT exported, because editing it breaks the game rather
// than improving it: ids, group codes, `answer` (it is re-synced from its
// choice), `mapping`, `order`, `correct`, every number in an estimate, and the
// equation table in tools/syllabus.js.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
// The book's own parser, not js-yaml: it is what `import-book.mjs` uses, so this
// sees exactly what the importer sees — including the places its dialect differs.
import { parseYaml } from './yaml-lite.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '..');

const theme = process.argv[2];
if(!theme){
  console.error('usage: node tools/export-copy.mjs <theme>');
  process.exit(2);
}
const BOOKS = { deepwatch: 'deep-watch', bring_them_home: 'bring-them-home',
  outbreak_riverton: 'outbreak-riverton', planetary_defense: 'planetary-defense',
  projecty: 'project-y' };
const bookName = BOOKS[theme] ?? theme;
const bookPath = resolve(root, 'books', `${bookName}.yml`);
if(!existsSync(bookPath)){
  console.error(`no book at ${bookPath}`);
  process.exit(2);
}
const raw = readFileSync(bookPath, 'utf8');
const book = parseYaml(raw);

const rows = [];
/**
 * One editable string.
 *
 * `note` is guidance the editor needs to avoid breaking a check — the word
 * budgets and the traps — and it rides along on the row rather than living only
 * in a preamble nobody scrolls back to.
 */
const add = (id, text, note) => {
  const t = String(text ?? '').trim();
  if(!t) return;
  // A string that occurs more than once in the book cannot be replaced safely
  // by exact match, so it is exported as read-only context instead.
  const occurrences = raw.split(t).length - 1;
  rows.push({ id, text: t, note, ...(occurrences === 1 ? {} : { readOnly: true }) });
};

add('theme.subtitle', book.theme?.subtitle, 'the player’s role and the place, one line');
(book.theme?.opening ?? []).forEach((l, i) => add(`theme.opening.${i}`, l,
  'ONE paragraph of situation: no mechanics, no controls, and never what the player does not do'));
(book.theme?.ending ?? []).forEach((l, i) => add(`theme.ending.${i}`, l,
  'what happened, what it cost, what is unfinished'));

(book.groups ?? []).forEach(g => add(`group.${g.id}.desc`, g.desc, 'one line: what this area is about'));

(book.roster ?? []).forEach(p => {
  add(`roster.${p.id}.role`, p.role, 'job title as somebody would say it');
  add(`roster.${p.id}.bio`, p.bio, 'two short paragraphs; keep the HTML <p> tags exactly as they are');
  (p.quiz ?? []).forEach((q, qi) => {
    add(`roster.${p.id}.quiz.${qi}.q`, q.q, 'asks about the WHY of the passage, never its wording');
    add(`roster.${p.id}.quiz.${qi}.a`, q.a,
      'must NOT repeat six consecutive words of the bio, and must not be the longest option');
    (q.wrong ?? []).forEach((w, wi) => add(`roster.${p.id}.quiz.${qi}.wrong.${wi}`, w,
      'wrong for a stated reason; at least one of these should be longer than the right answer'));
  });
});

(book.glossary ?? []).forEach(g => add(`glossary.${g.name}.def`, g.def,
  'plain words only: a definition may not lean on another undefined technical word'));

(book.missions ?? []).forEach((m, mi) => {
  const M = `m${String(mi + 1).padStart(2, '0')}`;
  add(`${M}.title`, m.title, 'the day’s name, a few words');
  add(`${M}.objective`, m.objective, 'one line: what the day is for');
  add(`${M}.briefing`, m.briefing, 'one line the HUD can carry');
  add(`${M}.stake`, m.stake,
    'at least 90 words, names the cast, says when, and contains a "Today you …" clause');
  add(`${M}.takeaway`, m.takeaway, 'the principle of the day, not the answer to any question');
  (m.stops ?? []).forEach((s, si) => {
    const S = `${M}.s${si + 1}`;
    add(`${S}.title`, s.title, 'the question’s name');
    add(`${S}.task`, s.task, 'what the player is being asked to do');
    add(`${S}.place`, s.place, 'the room name as the map spells it — usually leave alone');
    add(`${S}.scene`, s.scene, '30–45 words of SITUATION only; must not contain the reasoning');
    add(`${S}.takeaway`, s.takeaway,
      'the principle; shown BEFORE the question, so it must not repeat the answer’s words');
    (s.assumes ?? []).forEach((a, ai) => add(`${S}.assumes.${ai}`, a,
      'the prior knowledge this question is entitled to expect'));
    const g = s;
    add(`${S}.question`, g.question, 'the question itself');
    add(`${S}.headline`, g.headline, 'the one-line framing above an instrument panel');
    add(`${S}.why`, g.why, '70–90 words of MECHANISM — this is where the teaching lives');
    add(`${S}.answerText`, g.answerText, 'the short form of the answer');
    (g.choices ?? []).forEach((c, ci) => {
      const label = typeof c === 'string' ? c : c?.label;
      add(`${S}.choices.${ci}`, label,
        'if this is the right answer, keep it SHORTER than the longest wrong one');
      if(typeof c === 'object' && c?.mechanism) add(`${S}.choices.${ci}.mechanism`, c.mechanism,
        'why somebody would believe this candidate');
    });
    (g.rebuttals ?? []).forEach((r, ri) => add(`${S}.rebuttals.${ri}`, r,
      'why THAT option fails — one per wrong option, in order'));
    (g.cards ?? []).forEach((c, ci) => add(`${S}.cards.${ci}`, typeof c === 'string' ? c : c?.label,
      'a step; must not refer to another step’s output'));
    (g.scenarios ?? []).forEach((c, ci) => add(`${S}.scenarios.${ci}`, typeof c === 'string' ? c : c?.label,
      'the left column of a matching question'));
    (g.proposals ?? []).forEach((p, pi) => add(`${S}.proposals.${pi}`, p?.text,
      'a proposal the player allocates to'));
    if(g.evidence) add(`${S}.evidence`, g.evidence, 'the numbers on the table — do not change any figure');
    const e = g.estimate;
    if(e){
      add(`${S}.estimate.prompt`, e.prompt, 'the setup — do not change any number');
      add(`${S}.estimate.question`, e.question, 'what to choose');
      add(`${S}.estimate.explanation`, e.explanation, 'what the answer means — do not change any number');
      add(`${S}.estimate.relationship`, e.relationship, 'the relation in words, naming every variable');
      (e.givens ?? []).forEach((x, xi) => add(`${S}.estimate.givens.${xi}`, x, 'a given — do not change the number'));
    }
  });
});

for(const [k, v] of Object.entries(book.copy ?? {})){
  add(`copy.${k}`, v, 'what this place says when you walk in; keep the HTML <p> tags');
}
for(const [k, v] of Object.entries(book.interiors ?? {})){
  add(`interiors.${k}.caption`, v?.caption, 'one line on the wall of the room');
  add(`interiors.${k}.standLine`, v?.standLine, 'one line on the case stand');
}

const editable = rows.filter(r => !r.readOnly);
const outDir = resolve(root, 'books', 'copy');
mkdirSync(outDir, { recursive: true });
const sheet = resolve(outDir, `${bookName}-copy.jsonl`);
const manifest = resolve(outDir, `${bookName}-copy.manifest.json`);

writeFileSync(sheet, rows.map(r => JSON.stringify(
  r.readOnly ? { id: r.id, text: r.text, note: r.note, readOnly: true }
             : { id: r.id, text: r.text, note: r.note })).join('\n') + '\n');
writeFileSync(manifest, JSON.stringify(
  { theme, book: `books/${bookName}.yml`, rows: rows.map(r => ({ id: r.id, original: r.text, readOnly: !!r.readOnly })) },
  null, 1));

console.log(`\n${rows.length} line(s) exported for "${theme}" (${editable.length} editable, ${rows.length - editable.length} read-only)`);
console.log(`  sheet     books/copy/${bookName}-copy.jsonl        → give this to the editor`);
console.log(`  manifest  books/copy/${bookName}-copy.manifest.json → keep, apply-copy.mjs needs it`);
console.log(`\nWhen it comes back: node tools/apply-copy.mjs ${theme} <edited.jsonl>`);
