// split-book.mjs — a book back into its head and per-mission fragments.
//
//   node tools/split-book.mjs books/<theme>.yml books/parts/<theme>
//
// The inverse of assemble-book.mjs, for the case that tool's header warns
// against and that happened anyway: a book edited directly (boards repaired by
// hand in books/changeover_v2.yml, headwater_v2, redsand_v5, the_trial_v2) while
// its fragments kept the raw first-extraction boards. Every copy layer —
// bible-prose, bible-beats, bible-copy — writes into the fragments, so with the
// two out of step a rebuild threw the hand repairs away and the importer refused
// sixty boards it had accepted the day before.
//
// The book is split on the `# ==== MISSION n` banner lines assemble-book writes;
// everything before `missions:` becomes the head with the marker line restored.
// Fragments are written as m01.yml … with a one-line provenance comment. Nothing
// is reformatted: the text of every mission is the book's own, byte for byte.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const [bookPath, dir] = process.argv.slice(2);
if(!bookPath || !dir){
  console.error('usage: node tools/split-book.mjs books/<theme>.yml books/parts/<theme>');
  process.exit(2);
}
const text = readFileSync(bookPath, 'utf8');
const lines = text.split('\n');
const at = lines.findIndex(l => /^missions:\s*$/.test(l));
if(at < 0){ console.error(`${bookPath} has no top-level "missions:" line`); process.exit(2); }
const BANNER = /^#\s*=+\s*MISSION\s+(\d+)\s*$/;
const starts = [];
lines.forEach((l, i) => { if(i > at && BANNER.test(l)) starts.push(i); });
if(!starts.length){ console.error(`${bookPath} has no "# ==== MISSION n" banners after missions:`); process.exit(2); }

mkdirSync(dir, { recursive: true });
const head = [...lines.slice(0, at + 1), '# <<< MISSIONS >>>', ''].join('\n');
writeFileSync(resolve(dir, '_book.yml'), head);
starts.forEach((s, k) => {
  const e = k + 1 < starts.length ? starts[k + 1] : lines.length;
  const n = +BANNER.exec(lines[s])[1];
  // Drop assemble-book's own preamble comments between banners (there are none
  // inside a mission), keep the banner, and trim trailing blank lines.
  let body = lines.slice(s, e);
  while(body.length && !body[body.length - 1].trim()) body.pop();
  const out = [body[0], `# Split back out of ${bookPath} by tools/split-book.mjs; the book's text, verbatim.`, ...body.slice(1), ''].join('\n');
  writeFileSync(resolve(dir, `m${String(n).padStart(2, '0')}.yml`), out);
});
console.log(`${dir}: head + ${starts.length} fragment(s) from ${bookPath}`);
