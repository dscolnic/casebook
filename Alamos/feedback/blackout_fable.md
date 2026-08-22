# Blackout (Fable edition) — play-through review

*Theme `blackout_fable` · senior-high electrical engineering — a second authoring of the same course, for comparison with `blackout` · grade 12 · 15 days, 45 stops · reviewed 2026-08-21 by reading `books/blackout-fable.yml` in full, working every board, and comparing against `blackout`.*

## Verdict

The only `same-grade-rewrite:` in the repo — the same course, the same place, written a second time — and the useful thing about it is what the second authoring fixed without being told to.

**It is the tidiest campaign in the catalogue on structure.** Fifteen days, three stops each, no exceptions: `per-day` is `[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]`, where the parent has three four-stop days. All 45 stops carry a `guide` and an authored `background`. It carries **zero rows in `curriculum-debt`, `equation-debt`, `format-debt`, `daycalls-debt` and `warmup-debt`**, and 11 of 11 syllabus equations are computed against the parent's 9 of 11. And I ran the scene-cast measurement: **39 of 45 scenes name somebody from the roster (87%)** against the parent's 39 of 48 (81%) — both good, and the rewrite is better.

The eleven estimate boards are the same physics as the parent's and all eleven reproduce: the swing equation at 2 × 25,000 × 0.30 ÷ 50 = 300 MW; I²R losses at 3 × 1150² × 4.2 = 16.7 MW and again at 1280² for 20.6 MW; three-phase power at 1.732 × 11,000 × 310 × 0.95 = 5.6 MW; round-trip efficiency 187 ÷ 220 = 0.85; a transformer current ratio giving 750 A; a current divider giving 300 A; a two-term volt drop of 617 V per phase; fault current 6,350 ÷ 0.42 = 15.1 kA; a temperature-sensitive peak at 6,400 + 120 × 4 = 6,880 MW; and unserved energy at 300 × 2.5 = 750 MWh.

**Answerable:** 45/45. Note that this edition does **not** inherit the parent's two mis-keyed answers — those were fixed in `blackout` earlier in this review and this book never had them.
**Sense:** The corridor sensor thread — the instrument that was confident and wrong — is the best-constructed argument in the repo and it survives the rewrite intact.
**Level:** Right, and it opens on the swing equation, which is the right first question.
**Fun:** High. Four million people and one number.

## What the second authoring changed, and what that teaches

This is the campaign's real value, so it is worth stating plainly.

- **It stopped writing four-stop days.** The parent has three; this has none. That is the whole of `dayCalls`' over-4 half, avoided by authoring rather than by re-daying afterwards.
- **It computed two more of its own equations.** 11 of 11 against 9 of 11, and the parent's two gaps are recorded debt. The rewrite did not need the debt file.
- **It carries 22 `takesAsRead` declarations** against the parent's set, and every one is printed to the player as an `assumes` line. That is a senior course saying out loud what it leans on.
- **It has less numeral damage** — three occurrences against the parent's three, on 45 stops rather than 48.
- **It kept 44 of 45 titles from the parent** and changed the question on only four. Where the other three editions' shared titles drift (`deepwatch_hs` 16, `the_trial_hs` 14, `contamcity_hs` 6), this one is 4 — because it is a rewrite of the same course rather than a retarget to a different one, so a shared title is *meant* to be the same lesson.

**The lesson for the next book is the first bullet.** Nothing in `npm run check` forced the three-stops-a-day discipline; the author simply did it, and it removed a whole class of downstream work. Writing the day shape down before writing 45 stops is the same mechanism the diversity pass found for format mix.

## Implemented since this review

- **BF-01**, the opening card now names Chinelo Obi with her position — the fable was the one Blackout edition that had dropped the person.
- **BF-03**, the numeral damage.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| BF-01 | WORTH | `opening:` | The card names nobody. The parent's names Chinelo Obi — and so does `blackout_ms` — so of the three Blackout editions the fable is the one that dropped the person. Its card is otherwise the strongest of the three: "The power stations belong to companies you can instruct under contract and cannot order about" is the best single sentence about the job in any of them. | Put Obi back, or whoever holds the other side. One clause. Cross-campaign §8. |
| BF-02 | WORTH | `engine/dev/concept-debt.json`, 6 rows | Six ordering rows, all pointing at one concept: *cascading failure and the sequence of events* rests on N−1 contingency, on fault current, and on transmission losses, none claimed earlier. It is a genuine dependency knot rather than six separate problems — a cascade is downstream of everything. | One move or one declaration. This is a senior campaign, so `takesAsRead` is available and the edition already uses it 22 times; a cascade stop declaring N−1 and fault current as taken-as-read is honest and clears most of the six. Check first whether the cascade stop can simply move later — if its scene names the day's event, it cannot. |
| BF-03 | WORTH | Numeral damage, 3 occurrences | "1 pole" twice, "1 is" twice, "1 check" twice, "1 rule", "1 place". Small, and two are in a phrase that repeats. | Editorial pass. Cross-campaign §1. |
| BF-04 | TASTE | Its purpose is not written down anywhere the player can see | The `same-grade-rewrite:` marker is a comment in `themes/blackout_fable/theme.js`. `tools/games.js` presumably lists it as a game, so a player on the shelf sees two Blackouts with no way to tell which is which — and this one is the better-structured of the two. | A one-line `subtitle` distinction, or a note on the shelf row. If both are meant to ship, the shelf has to say what the difference is; if only one is, this is the one whose *structure* the other should be brought up to. |

## Day-by-day notes (short)

The days follow the parent's arc — the frequency balance, the corridor, the sensor that was confident and wrong, the conductor quietly losing strength, the trip with no proven cause — and the stops are re-authored versions of the parent's rather than new questions. The differences worth naming: two boards the parent does not have (the current divider at 300 A, and the transformer ratio at 750 A) close the parent's two recorded equation gaps, and the DEGENERACY and SWEEP stops are placed a day earlier, which puts the instrument work before the argument it settles.

## Opening and closing

Opening: the best of the three Blackout cards, with one gap (BF-01).

Closing: three paragraphs, identical in substance to the parent's, and the second is one of the best in the catalogue — 750 MWh never delivered, a fifth of an island shed, ninety hours of a conductor quietly losing strength nobody had added up, and the practice that would have caught it all "is a paragraph in a report until somebody on nights makes it a habit."

## Warm-ups

Authored for this edition. No findings.

## What to keep

- Three stops a day, fifteen days, no exceptions. This is the shape.
- 11 of 11 equations computed, with no debt file.
- "The power stations belong to companies you can instruct under contract and cannot order about."
- The corridor sensor. Confident, wrong, and only caught by something independent.
