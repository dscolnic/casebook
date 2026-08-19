# Claude Handoff

## App architecture (relevant to current work)

`navy_course.html` is a 15-week static course hub. Completion tracking lives in
`reckon_course.js` (`window.ReckonCourse` / `RC`); its `paint()` routine iterates
`li.wk` elements to compute the "X of 15 weeks" counter.

Three multi-chapter game modules are embedded as extra rows in the same week list:

| Game | File | Accent |
|------|------|--------|
| Dead Reckoning | `dead_reckoning_three_chapter_course_edition.html` | `#2f5d86` |
| Spectrum Stack | `spectrum_stack.html` | `#6a4fb0` |
| Strait Support | `strait_support_navy_course_relationship_v8.html` | `#1e7a4d` |

Games are self-contained HTML (no build step). They deep-link via URL params:
`?chapter=N`, `?locked=1`, `?return=navy_course.html`. Each game reads `return`
and shows a "Return to course" link; `chapter` jumps straight to that chapter,
otherwise the chapter menu shows.

All games share the RECKON light-editorial palette: paper `#f4f2ec`, white `#fff`,
ink `#1a1a17`, muted `#565651`, hairline `#e4e4e2`, accent blue `#2f5d86`,
green `#2f6d4f`, gold `#8a6a12`; Georgia serif headings, Inter/system-ui body.

Note: Dead Reckoning keeps a **dark canvas scene** (`--scene:#06101a`,
`--scene-ink:#eef5fb`, `--scene-muted:#98adc0`, legend colors `--blue/--green/--amber/--red`).
Chrome tokens (`--ink/--accent/--gold`) were decoupled from scene tokens so a global
dark→light flip did not make dark-background overlay text unreadable.

## What was just changed

- Integrated the three game modules into `navy_course.html` as 10 interleaved
  `li.wk.gm` rows (rotating game order across insertion points, honoring each
  game's own declared chapter placements).
- Added `.gm` CSS block after the `.bs` rules; added a `paint()` guard
  (`if(li.classList.contains("gm"))return;`) so module rows do NOT affect the
  15-week counter.
- Reskinned all three games to the editorial palette; added `?return=` handling
  and chapter deep-link logic to Spectrum Stack and Dead Reckoning; renamed display
  text "Battleship" → "SensorShip" where it appeared.

### Row placement order (interleaved)
- After Wk5: Spectrum Ch.I → Dead Reckoning Ch.1
- After SensorShip Easy: Strait Ch.1
- After Wk10: Spectrum Ch.II
- After Wk11: Dead Reckoning Ch.2
- After Wk12: Strait Ch.2
- After Wk14: Dead Reckoning Ch.3 → Spectrum Ch.III
- After Wk15: Strait Ch.3 → Spectrum Ch.IV

## Files involved
- `navy_course.html`
- `dead_reckoning_three_chapter_course_edition.html`
- `spectrum_stack.html`
- `strait_support_navy_course_relationship_v8.html`
- `reckon_course.js` (unchanged, but drives the hub)

## Unresolved issues
- None known. If the live page fails to update, it is the GitHub Pages build
  cache (hard-refresh Cmd-Shift-R). Pages serves from `main`/root of
  `dscolnic/casebook` — a feature branch will NOT update the live site.

## Exact next task
None outstanding. Both explicit requests are complete: games integrated + reskinned,
and pushed to `main` (commit `20fec8d`), live at
`https://dscolnic.github.io/casebook/navy_course.html`. Await user direction before
staging any of the other untracked specs/prototypes.
