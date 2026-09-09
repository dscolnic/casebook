// fix-speakers.mjs — point a book fragment's beat bubbles at real roster ids.
//
//   node tools/fix-speakers.mjs <bible.md> <theme>
//
// IN PLACE, because re-extracting would throw away the payload conversion that
// has been done on top. The extractor now emits the roster id directly; this is
// for fragments written before it did.
//
// Two things it fixes, both of which made a beat unplayable rather than merely
// wrong. A bubble slugged from the spoken name — `imani-okoro` — names nobody:
// the roster id is the surname the stop placements use. And a bubble whose
// speaker is a panel label ("Panel/HUD text:" followed by a quoted string has
// exactly the shape of somebody speaking) is not a bubble at all.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { readBible } from './bibleRead.mjs';

const [file, theme] = process.argv.slice(2);
if(!file || !theme){ console.error('usage: node tools/fix-speakers.mjs <bible.md> <theme>'); process.exit(2); }

const bible = readBible(file);
const LABEL = /^(text|panel|hud|state|unlocks|waypoint|presentation|world-state|player-control)$/i;
// THE IDS ARE THE HEAD'S, NOT THE BIBLE'S. `bible.cast` carries the ids the
// reader slugged from the bible's own headings — `eli-voss` for `### Eli Voss -
// NOTES counter operations lead` — while the book's roster in `_book.yml` keeps
// the surname ids the stop placements and the engine use (`voss`). Resolving a
// bubble against the bible's cast returned the slug it started with and called it
// resolved; the importer then refused every beat in Changeover as spoken by
// nobody. So the roster the ids come from is the head's, and the bible's cast is
// the fallback for a name the head does not carry.
const headRoster = (() => {
  try{
    const head = readFileSync(resolve('books/parts', theme, '_book.yml'), 'utf8').split('\n');
    const a = head.findIndex(l => /^roster:\s*$/.test(l));
    if(a < 0) return [];
    const out = [];
    for(let i = a + 1; i < head.length && !/^[a-zA-Z_]+:\s*$/.test(head[i]); i++){
      const id = head[i].match(/^- id:\s*([\w-]+)/);
      if(id) out.push({ id: id[1], name: '' });
      const nm = head[i].match(/^  name:\s*"?([^"]+?)"?\s*$/);
      if(nm && out.length) out[out.length - 1].name = nm[1];
    }
    return out.filter(c => c.name);
  }catch{ return []; }
})();
const cast = [...headRoster, ...bible.cast.filter(c => !headRoster.some(h => h.name.toLowerCase() === String(c.name).toLowerCase()))];

const idFor = (slug) => {
  const n = String(slug).replace(/-/g, ' ').toLowerCase();
  const hit = cast.find(c => {
    const full = c.name.toLowerCase();
    return full === n || full.includes(n) || n.includes(full) || n.split(/\s+/).includes(c.id);
  });
  if(hit) return hit.id;
  // A SLUG MAY BE A ROLE AND A NAME AT ONCE — `arrival-lina` is the arrival
  // bubble, spoken by Lina Saye. Neither half matches on its own: "arrival lina"
  // is not a full name, and the ROLE list below is exact. The unique-name-part
  // rule reads it, and refuses a name two people share.
  for(const word of n.split(/\s+/)){
    const id = PARTS.get(word);
    if(id) return id;
  }
  return null;
};

// Four of the bibles write a beat's speaker as a ROLE rather than a name —
// `Mission lead:`, `Arrival bubble:`, `Final bubble:` — and a role is not on any
// roster, so eighty-nine bubbles reached the importer speaking as nobody. The
// mission itself says who that is: its card's `goNow` line is the bible's own
// instruction to go and meet a named person, and that person is the mission's
// lead by construction. So a role resolves to whoever the card sends the player
// to, and to nothing at all when the card names no one — which is a gap to report
// rather than a name to invent.
const ROLE = /^(mission-lead|mission-leader|lead|arrival|arrival-bubble|final-bubble|travel-waypoint|closing-bubble)$/i;
//
// A CARD MAY NAME SOMEBODY BY ONE NAME. Ten of the twelve bubbles left over
// after the role rule are two Carrying missions whose cards read "Waterworks,
// Nkemdi at store-gauges" and "Tip, Mei at weighbridge". Both name a person on
// the roster; neither writes the full name, and matching on the full string
// finds nobody. So a single name part counts too — but ONLY when it belongs to
// exactly one person in the cast. Two people called Mei is a card that has not
// said which, and guessing there would put words in the wrong mouth silently,
// which is worse than the gap it would close.
const PARTS = new Map();
for(const c of bible.cast){
  for(const part of String(c.name).split(/\s+/)){
    if(part.length < 3) continue;
    const k = part.toLowerCase();
    PARTS.set(k, PARTS.has(k) ? null : c.id);   // null marks the name as shared
  }
}
const nameIn = (text) => {
  const hit = bible.cast
    .map(c => ({ c, at: text.indexOf(c.name) }))
    .filter(x => x.at >= 0)
    .sort((a, b) => a.at - b.at)[0];
  if(hit) return hit.c.id;
  for(const word of String(text).match(/[A-Z][a-z]{2,}/g) ?? []){
    const id = PARTS.get(word.toLowerCase());
    if(id) return id;
  }
  return null;
};

let renamed = 0, dropped = 0, roled = 0, orphan = 0;
const dir = `books/parts/${theme}`;
for(const f of readdirSync(dir).filter(x => /^m\d+\.ya?ml$/i.test(x))){
  const p = resolve(dir, f);
  const lines = readFileSync(p, 'utf8').split('\n');
  // The mission's own card, read before the beats that will need it.
  const goNow = lines.find(l => /^\s*goNow: /.test(l)) ?? '';
  const lead = nameIn(goNow);
  const out = [];
  for(let i = 0; i < lines.length; i++){
    const m = lines[i].match(/^(\s*)- who: ([\w-]+)(.*)$/);
    if(!m){ out.push(lines[i]); continue; }
    const [, indent, slug, rest] = m;
    /**
     * A SPEAKER OF ONE OR TWO LETTERS IS NOT A PERSON, it is the extractor
     * having cut a sentence in the wrong place. The Trial's mission 4 ended on
     * `- who: ii / say: "continue a harmful trial"` — the tail of a line about a
     * Type II error, read as somebody's name and their words.
     *
     * ASKED OF THE ROSTER FIRST, and that is not a detail: The Trial's cast
     * includes Lena Wu, whose id is `wu`. A length rule alone deleted five of
     * her lines on the first run. Short is only evidence when the roster has
     * never heard the name.
     *
     * Dropped with its `say`, the same way a panel label is, and counted. What
     * is lost is a fragment that named nobody and would have been printed by
     * nobody; what is kept is the bubble above it, which is the beat's real
     * line.
     */
    if(LABEL.test(slug) || (slug.replace(/-/g, '').length < 3 && !idFor(slug))){
      // Drop the whole bubble: its `who`, and the `radio`/`say` lines under it.
      let j = i + 1;
      while(j < lines.length && /^\s+(radio|say):/.test(lines[j])) j++;
      i = j - 1; dropped++;
      continue;
    }
    const id = idFor(slug);
    if(id && id !== slug){ out.push(`${indent}- who: ${id}${rest}`); renamed++; }
    else if(!id && ROLE.test(slug)){
      if(lead){ out.push(`${indent}- who: ${lead}   # the bible's "${slug.replace(/-/g, ' ')}", from this mission's own goNow line`); roled++; }
      else { out.push(lines[i]); orphan++; }
    }
    else out.push(lines[i]);
  }
  writeFileSync(p, out.join('\n'));
}
console.log(`${theme}: ${renamed} speaker(s) pointed at a roster id, ${roled} role(s) resolved`
  + ` from the mission card, ${dropped} panel label(s) dropped as bubbles.`);
if(orphan) console.log(`${theme}: ${orphan} bubble(s) speak as a role on a mission whose card names`
  + ' nobody — the bible has to say who talks.');
