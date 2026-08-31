// checkVoice.mjs — does the card brief the player, or perform at them?
//
//   node engine/dev/checkVoice.mjs <theme>
//   node engine/dev/checkVoice.mjs --demo     the paragraph this was written for
//
// The complaint this exists for, about Blackout's opening card: "phrases of 'one
// number that has to stay inside half a hertz of fifty' — 'Generation you do not
// own' — 'the load answers to nobody' — it's a strange vibe."
//
// It was, and it was in every game, because it is one writer's tic rather than
// one card's mistake. Three devices, all of which make a briefing sound like a
// trailer:
//
//   WITHHELD   the noun is replaced by a riddle. "one number that has to stay
//              inside half a hertz of fifty" is the frequency. The player has to
//              solve a small puzzle to receive a fact the card exists to hand
//              over.
//   PERFORMED  an abstraction is given a will. "the load answers to nobody",
//              "nothing aboard waits for you". Never carries information a plain
//              sentence would not.
//   MAXIM      the paragraph ends on an aphorism instead of on today. "When it
//              goes wrong it goes wrong in seconds and is put back over days."
//
// The first two are gates: there is no case in these games where they are the
// right way to say something. The third is a note, because a short closing
// sentence is also how a plain teaching line looks — "The loudest patient is not
// always the one in the most trouble" is Hospital Heroes writing correctly for a
// nine-year-old, not writing a slogan. So the maxim rule counts, exempts the
// primary-school editions, and reports rather than fails.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const arg = process.argv[2];

/** The two devices that are always wrong, with the shape that finds them. */
const GATES = [
  { id: 'WITHHELD',
    // "one number that…", "the one thing that…" — a noun deliberately not said.
    // The relative pronoun has to arrive immediately: "one number that…" is the
    // tic, while "if one thing went" is an operator saying N-1 and "one thing
    // said in public early" is a sentence about a thing that was said.
    re: /\b(one|a single|the one) (number|thing|word|figure|line|question|fact|quantity|name) (that|which)\b/i,
    say: 'a riddle where the noun should be — name the quantity' },
  { id: 'PERFORMED',
    // An abstraction given a will. The subject list is deliberately short and
    // concrete: these are the nouns these games actually personify.
    re: new RegExp('\\b(the (load|water|clock|river|sea|weather|market|disease|fire|plume|budget|'
      + 'money|schedule|physics|system|grid|boat|sky)|nothing|nobody|it)\\b[^.?!]{0,24}\\b'
      + '(answers to (nobody|you|no one)|does not (wait|care|forgive|negotiate|argue)|'
      + 'will not (wait|care|forgive|negotiate)|waits for (you|nobody|no one)|'
      + 'has no opinion|does not ask|never asks)\\b', 'i'),
    say: 'an abstraction given a will — say who does what instead' },
  { id: 'UNWATCHED',
    re: /whether (or not )?(anyone|anybody|somebody|someone) is (watching|looking|there)/i,
    say: 'the nobody-is-watching flourish — cut it' },
  { id: 'CHIASMUS',
    // "when it goes wrong it goes wrong in", "it fails the way it fails" — the
    // same words back to front, which is a cadence rather than a claim.
    re: /\b(when|if) it ([a-z]+s) (wrong|badly)?,? ?it \2\b/i,
    say: 'a phrase folded back on itself for rhythm — state the fact once' },
];

/** Is this short closing sentence a maxim rather than a fact about today? */
function isMaxim(sentence){
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  if(!words.length || words.length > 13) return false;
  if(/\d/.test(sentence)) return false;                       // a number is a fact
  // A sentence addressing the player, or dated to the shift, is about today by
  // construction — which is the opposite of a maxim.
  if(/\b(you|your|today|tonight|this morning|this afternoon|by (six|noon|midnight))\b/i.test(sentence)) return false;
  // A capitalised word that is not the first is a name or a place, which also
  // makes it about today rather than about life.
  if(words.slice(1).some(w => /^[A-Z][a-z]{2,}/.test(w))) return false;
  return true;
}

function scanText(where, text, out, { maxims = true } = {}){
  const s = String(text ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if(!s) return;
  for(const g of GATES){
    const m = s.match(g.re);
    if(m) out.fails.push({ where, id: g.id, say: g.say, quote: m[0].trim() });
  }
  const parts = s.split(/(?<=[.?!])\s+/).filter(Boolean);
  const last = parts[parts.length - 1] ?? '';
  if(maxims && parts.length > 1 && isMaxim(last)) out.maxims.push({ where, quote: last.trim() });
}

/** The paragraph this file was written for, kept as its own test. */
if(arg === '--demo'){
  const out = { fails: [], maxims: [] };
  scanText('the original Blackout opening',
    'The Calder interconnection is four million people, six thousand megawatts and one number '
    + 'that has to stay inside half a hertz of fifty. You are the system operator on nights. '
    + 'Generation you do not own answers to you by contract, the load answers to nobody, and the '
    + 'balance between them is settled every second whether anyone is watching or not. When it '
    + 'goes wrong it goes wrong in seconds and is put back over days.', out);
  console.log(`\nthe paragraph this check was written for: ${out.fails.length} gate(s) fire`);
  for(const f of out.fails) console.log(`  ✗ ${f.id}: "${f.quote}" — ${f.say}`);
  process.exit(out.fails.length >= 3 ? 0 : 1);
}

if(!arg){
  console.error('usage: node engine/dev/checkVoice.mjs <theme> | --demo');
  process.exit(2);
}

const dir = resolveTheme(arg);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});

const out = { fails: [], maxims: [] };
(theme.opening ?? []).forEach((l, i) => scanText(`opening ${i + 1}`, l, out));
(theme.ending ?? []).forEach((l, i) => scanText(`ending ${i + 1}`, l, out));
(content.MISSIONS ?? []).forEach((m, i) => {
  // `briefing` is not authored prose in the older games — the docx importers
  // wrote it as "The player must…", which is instruction to the author rather
  // than a card anybody reads. Gates still see it; the maxim heuristic would
  // only report the importer's own voice back.
  scanText(`day ${i + 1} briefing`, m.briefing, out, { maxims: false });
  for(const k of ['stake', 'objective']) scanText(`day ${i + 1} ${k}`, m[k], out);
});
for(const [group, lessons] of Object.entries(content.CURRICULUM ?? {})){
  for(const [id, l] of Object.entries(lessons ?? {})){
    scanText(`${group}/${id} scene`, l.scene ?? l.story, out);
  }
}

// A plain closing sentence is how a young-reader edition teaches. Hospital
// Heroes' "The loudest patient is not always the one in the most trouble" is
// correct writing, and a rule that failed it would be wrong about the audience
// rather than about the prose.
const grade = Number(theme.audience?.grade);
const juniorEdition = Number.isFinite(grade) && grade <= 6;

console.log(`\n${out.fails.length ? '✗' : '✓'} theme "${arg}": the cards brief rather than perform`);
for(const f of out.fails) console.log(`  ✗ ${f.where} [${f.id}] "${f.quote}" — ${f.say}`);
if(out.maxims.length && !juniorEdition){
  console.log(`  · ${out.maxims.length} card(s) end on a short general sentence rather than on today:`);
  for(const m of out.maxims.slice(0, 5)) console.log(`      ${m.where}: "${m.quote}"`);
  if(out.maxims.length > 5) console.log(`      … ${out.maxims.length - 5} more`);
  console.log('    Fine when it carries a fact; a slogan when it does not.');
}else if(out.maxims.length){
  console.log(`  · ${out.maxims.length} short closing sentence(s), allowed: this edition is written for grade ${grade}`);
}
if(out.fails.length) process.exit(1);
