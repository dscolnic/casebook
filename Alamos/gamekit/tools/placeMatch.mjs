// placeMatch.mjs — which room of a theme a name from the bible refers to.
//
// ONE COPY, because there were two and only one of them got fixed. `stop-map`
// resolves the room an arrival beat fires in; `stop-groups` resolves the area a
// stop belongs to. Both answer "which room is the bible talking about", and both
// had their own matcher — so the stemming fix, the match-against-rooms fix and
// the index-the-building-name fix all landed in one of them and left the other
// answering "automatic" and leaving 45 arrival beats unplaced across three
// campaigns. CLAUDE.md names this exactly: two copies of one rule drift the
// first time either is corrected.
//
// The order is deliberate and is the whole of the rule:
//
//   1. the id or the name, exactly
//   2. one containing the other — "Storage & Level Board" is "Storage & Level"
//   3. the significant words in common, stemmed — "Gate House" is the Gates area
//
// A place with nothing in common with anything is returned as null and reported
// by the caller, never guessed at.

/** Words that name no room on their own. Every campaign has four of each. */
const FILLER = new Set(['the', 'and', 'of', 'room', 'office', 'desk', 'board', 'bay',
  'house', 'yard', 'station', 'area', 'control', 'centre', 'center', 'floor', 'hall']);

// Strip the plural `s` and nothing else. Stripping `es` turned `gates` into
// `gat` while `gate` stayed `gate`, so a room literally named Gate House did not
// match the Gates area. `ss` is left alone so `press` does not become `pres`.
export const stemOf = (w) => w.replace(/ies$/, 'y').replace(/([^s])s$/, '$1');

export const sig = (x) => new Set((String(x).toLowerCase().match(/[a-z]{3,}/g) ?? [])
  .filter(w => !FILLER.has(w)).map(stemOf));

/**
 * Every name a theme's rooms answer to, as name -> the id that owns it.
 *
 * Groups, site buildings and interior-plan rooms all count, and a name is
 * indexed even when its id is already an area — a group and the building it
 * stands in can be called different things, and the building's name is often the
 * one the bible uses.
 */
export function placeIndex(theme){
  const byName = new Map();
  const notAnArea = new Map();
  const areas = new Set((theme.content?.GROUPS ?? []).map(g => g.id));
  const add = (name, id) => { const k = String(name ?? '').toLowerCase().trim(); if(k && !byName.has(k)) byName.set(k, id); };

  for(const g of theme.content?.GROUPS ?? []){ add(g.id, g.id); add(g.name, g.id); }
  for(const b of theme.site?.buildings ?? []){
    add(b.id, b.id); add(b.name, b.id);
    if(!areas.has(b.id)) notAnArea.set(b.id, b.name ?? b.id);
  }
  const plan = theme.site?.plan ?? theme.plan ?? {};
  const rooms = [...(plan.rooms ?? []),
    ...(plan.levels ?? plan.plates ?? plan.floors ?? []).flatMap(l => l.rooms ?? [])];
  for(const r of rooms){
    if(!r?.id) continue;
    const owner = r.group ?? r.id;
    add(r.id, owner); add(r.name, owner);
    if(!areas.has(r.id) && !r.group) notAnArea.set(r.id, r.name ?? r.id);
  }
  return { byName, areas, notAnArea };
}

/** The id a name resolves to, or null. */
export function placeFor(name, index){
  const k = String(name ?? '').toLowerCase().trim();
  if(!k) return null;
  if(index.byName.has(k)) return index.byName.get(k);
  for(const [n, id] of index.byName)
    if(n.length > 3 && (k.includes(n) || n.includes(k))) return id;
  const want = sig(k);
  if(!want.size) return null;
  let best = null, score = 0;
  for(const [n, id] of index.byName){
    if(n.length <= 3) continue;
    const s = [...sig(n)].filter(w => want.has(w)).length;
    if(s > score){ score = s; best = id; }
  }
  return score ? best : null;
}
