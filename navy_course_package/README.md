# Reasoning for Naval Science — package

## Contents

- `navy_course.html` — self-contained 15-week syllabus page.
- `navy_course_mapping.js/json` — `course` object and week-to-puzzle mapping.
- `navy_course_puzzles.js/json` — all course puzzle objects grouped by game.
- `nc_*_puzzles.json` — per-game merge files.
- `nc_sciencetank_game_sets.json` — the new Science Tank three-round group.
- `diagnosis/nc_flooding_playable.html` — standalone Diagnosis puzzle required by that game’s deep-link model.

## Distribution

{
  "Sequence": 4,
  "Ballpark": 4,
  "Protocol": 4,
  "Diagnosis": 1,
  "Casebook": 1,
  "Science Tank": 1
}

## Verification notes

- Automated checks passed for `nc_` IDs, collisions within the package, top-level template fields, Sequence chapter/card counts, Protocol decoy counts, Ballpark arithmetic and shared-bank display uniqueness, Diagnosis reading/signature consistency, Casebook expert-option counts, Science Tank round/idea counts, and all week mappings.
- Ballpark constants and conversions include source metadata; fictional exercise values are explicitly labeled as defined course scenarios.
- The Diagnosis readings are fictional training data and the layered-defense Sequence stays at public system level.
- Science Tank impact claims are historically sourced, but the return multipliers are intentionally pedagogical proxies and should receive the same editorial/economic review used for the main Science Tank catalog.
