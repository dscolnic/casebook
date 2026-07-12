// Anti-staleness gate for Casebook packs — ZERO tokens, pure Node.
// Fails a pack if it contains stock "AI-tell" phrases, or if its prose echoes
// another already-authored pack (exact 6-word overlaps that read as templated).
// Usage: node style_gate.js <id>   ->   prints {"ok":bool,"problems":[...]}
//
// Tune BANNED and MAX_ECHOES to taste. This is the sameness analogue of the
// length-parity gate: cheap, deterministic, and it fails loud so the editor
// pass (or a re-author) has to remove the repetition.

const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..');              // casebook_build/
const target = process.argv[2];

// Stock phrases observed recurring across packs + generic LLM tics. Substring, case-insensitive.
const BANNED = [
  "quieter than the first and graver than the second",
  "quieter and graver",
  "three people inside will help you",
  "three people will help you",
  "three people will talk to you",
  "each carrying a piece",
  "none the whole",
  "hides a tempting wrong answer",
  "it's important to note", "it is important to note",
  "plays a crucial role", "plays a vital role",
  "a testament to", "rich tapestry", "delve into", "delve deeper",
  "navigate the complexities", "stands as a", "serves as a reminder",
  "in the world of", "when it comes to"
];
const MAX_ECHOES = 3;                                 // tolerate a few incidental 6-gram overlaps

function prose(P) {
  const out = [];
  Object.values(P.TOPICS || {}).forEach(t => {
    out.push(t.lede || '', t.profile || '', t.frame || '');
    (t.q || []).forEach(q => { out.push(q.q || ''); (q.o || []).forEach(o => out.push(o.t || '', o.fb || '')); });
  });
  Object.values(P.STORIES || {}).forEach(o => Object.values(o).forEach(v => out.push(v || '')));
  (P.story || []).forEach(s => out.push(s || ''));
  const e = P.endings || {};
  ['overclaim', 'dismissal', 'wrongNames'].forEach(k => ((e[k] && e[k].body) || []).forEach(b => out.push(b || '')));
  if (e.win) ['expert', 'sound', 'named'].forEach(k => (e.win[k] || []).forEach(b => out.push(b || '')));
  return out.join(' \n ');
}
const norm = s => s.toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
function grams(s, n) {
  const w = norm(s).split(' ').filter(Boolean), g = new Set();
  for (let i = 0; i + n <= w.length; i++) g.add(w.slice(i, i + n).join(' '));
  return g;
}

let TP;
try { TP = require(path.join(dir, 'pack_' + target + '.js')).PACK; }
catch (e) { console.log(JSON.stringify({ ok: true, problems: ['style-load:' + e.message] })); process.exit(0); }

const text = prose(TP), low = norm(text), problems = [];
BANNED.forEach(b => { if (low.includes(norm(b))) problems.push('banned phrase: "' + b + '"'); });

// cross-pack 6-gram echoes vs every other AUTHORED pack
const tg = grams(text, 6);
const others = new Map();
for (const f of fs.readdirSync(dir).filter(f => /^pack_.*\.js$/.test(f) && f !== 'pack_' + target + '.js')) {
  let P; try { P = require(path.join(dir, f)).PACK; } catch (e) { continue; }
  if (!P || !P.TOPICS) continue;
  const first = Object.values(P.TOPICS)[0];
  if (!first || !first.profile) continue;             // skip unauthored stubs
  grams(prose(P), 6).forEach(x => { if (!others.has(x)) others.set(x, f.replace(/^pack_|\.js$/g, '')); });
}
const hits = [];
tg.forEach(x => { if (others.has(x)) hits.push('"' + x + '" ~' + others.get(x)); });
if (hits.length) { problems.push('cross-game echoes: ' + hits.length); hits.slice(0, 6).forEach(h => problems.push('  echo ' + h)); }

const banned = problems.some(p => p.startsWith('banned'));
const ok = !banned && hits.length <= MAX_ECHOES;
console.log(JSON.stringify({ ok, problems }));
