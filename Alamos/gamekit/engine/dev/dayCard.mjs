// dayCard.mjs — the day-opening blurb a player actually reads, and how many
// sentences it runs to.
//
// `missionSheet` in tools/make-book.mjs and this file used to carry two copies
// of the same dedup rule ("some books write the same sentence into two of
// `stake`/`briefing`/`objective`; print each distinct one once") — the exact
// mistake alamos-measurement warns about. This is the one copy; the print book
// and the shape gate both import it.
//
// What counts as "the opening blurb": `stake` (or `briefing`/`objective` if a
// book has no `stake`), plus `briefing` again only when it says something
// `stake` did not already say. `objective` gets its own labelled "What you
// decide" block on the page and in the game, so it is never counted here even
// when it is the thing a book leans on.

/** `stake` and `briefing`, deduped against each other and against `objective`. */
export function dayBlurb(m) {
  const said = new Set();
  const once = (v) => {
    const k = String(v ?? '').trim();
    if (!k || said.has(k)) return '';
    said.add(k);
    return k;
  };
  const stake = once(m.stake) || once(m.briefing) || once(m.objective) || '';
  const briefing = m.briefing && m.briefing !== m.objective ? once(m.briefing) : '';
  return { stake, briefing };
}

/** Sentences, split the same way THREE_PASS_BRIEF.md's own counting script does. */
export function sentencesOf(text) {
  const s = String(text ?? '').trim();
  if (!s) return [];
  return s.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
}

/** How many sentences the opening blurb (stake + any distinct briefing) runs to. */
export function blurbSentenceCount(m) {
  const { stake, briefing } = dayBlurb(m);
  return sentencesOf([stake, briefing].filter(Boolean).join(' ')).length;
}
