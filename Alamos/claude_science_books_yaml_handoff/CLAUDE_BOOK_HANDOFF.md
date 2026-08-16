# Claude handoff: four college science mission books

These YAML files follow the repository book schema used by `tools/import-book.mjs`. Each game contains exactly 15 missions and 3 stops per mission. The curriculum books now use five available formats: `PROTOCOL`, `SEQUENCE`, `BALLPARK`, `SCIENCETANK`, and `DIAGNOSIS`; each mission still selects only the best three.

## Files

- `outbreak_riverton_claude_book.yml`
- `contaminated_city_claude_book.yml`
- `bring_them_home_claude_book.yml`
- `planetary_defense_claude_book.yml`

## Import workflow

```sh
node tools/import-book.mjs outbreak_riverton_claude_book.yml outbreak_riverton --dry
node tools/import-book.mjs outbreak_riverton_claude_book.yml outbreak_riverton --verify
```

Repeat with the corresponding YAML and theme id for the other games. Do not silently coerce an unknown format. `DIAGNOSIS` must render as a full-panel root-cause activity, not as a multiple-choice card. `BALLPARK` stops include explicit `estimate` blocks. Every roster entry includes `division`. Each lesson is embedded directly in its mission stop so no external curriculum index can drift.

## Diagnosis contract used here

A Diagnosis stop gives the player the full panel before answering. The headline symptom is not enough. At least one quiet or normal reading should defeat a plausible rival. Choices state mechanisms, not labels alone. After submission, preserve the panel and explain why the winning mechanism fits the complete pattern and why major rivals fail.

## Build instruction to Claude

Treat each YAML file as the content source of truth. Preserve the order of missions and stops, exact format names, answers, numerical estimates, and learning takeaways. Build the environment/geometry separately in `site.js` or `plan.js`; do not move lesson content out of the book. Run the importer in dry mode first, fix schema failures rather than bypassing them, then run verify and manually walk every room/stop after import.
