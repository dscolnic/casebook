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
const idFor = (slug) => {
  const n = String(slug).replace(/-/g, ' ').toLowerCase();
  const hit = bible.cast.find(c => {
    const full = c.name.toLowerCase();
    return full === n || full.includes(n) || n.includes(full) || n.split(/\s+/).includes(c.id);
  });
  return hit?.id ?? null;
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
const nameIn = (text) => {
  const hit = bible.cast
    .map(c => ({ c, at: text.indexOf(c.name) }))
    .filter(x => x.at >= 0)
    .sort((a, b) => a.at - b.at)[0];
  return hit?.c.id ?? null;
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
    if(LABEL.test(slug)){
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
