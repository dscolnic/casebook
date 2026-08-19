# Casebook V3 — 15-pack latest-spec remake

This bundle contains fifteen older Casebook packs rebuilt for the three-informant / three-reading V3 player and the latest anti-archetype requirements.

## Contents

- `packs/` — 15 complete CommonJS V3 pack files
- `docs/BATCH15_CHANGELOG.md` — solution-archetype and truth-slot matrix
- `docs/BATCH15_COHESION_SHEETS.md` — all nine clues in notepad order, reading arcs, and six-of-nine rationale
- `docs/BATCH15_AUDIT.md` — structural and length audit
- `docs/BATCH15_QUALITY_AUDIT.md` — uniqueness, anti-templating, padding, and answer-position audit
- `docs/VALIDATOR_OUTPUT.txt` — full output from the supplied V3 validator
- `docs/` — current V3 specifications and revision notes
- `tools/validate_casebook_v3.js` — supplied V3 validator

## Validate

From the unzipped bundle directory:

```bash
ROOT="$PWD"
node "$ROOT/tools/validate_casebook_v3.js" "$ROOT"/packs/*.js
```

All fifteen included files pass the validator at packaging time.
