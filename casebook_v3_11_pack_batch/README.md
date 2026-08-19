# Casebook V3 — Eleven-Pack Conversion Batch

This bundle contains eleven older Casebook cases converted to the three-reading V3 format.

## Packs

- `pack_w_water_v3.js` — The Tap
- `pack_w_surg_v3.js` — The Wrong Side
- `pack_w_compound_v3.js` — The Compounding Room
- `pack_t_transformer_v3.js` — The Aldergate Substation Fire
- `pack_t_pipeline_v3.js` — The Brant Hollow Pipeline
- `pack_m_tunnel_v3.js` — The Kingsgate Bore
- `pack_m_stadium_v3.js` — The Coronet Arena Roof
- `pack_m_bridge_v3.js` — The Halloway Span
- `pack_j_press_v3.js` — The Ashford Dispatch
- `pack_f_privacy_v3.js` — The Beacon Consent Scandal
- `pack_f_crypto_v3.js` — The Cipher at Meridian Bank

## V3 structure

Each pack has three informants and three scientist passages. Every passage contains three questions and awards one WHO, one WHAT, and one WHERE clue according to the questions answered correctly. The nine clues are ordered to build from suggestive to corroborating to decisive evidence.

## Validation

Run:

```bash
node tools/validate_casebook_v3.js packs/*.js
```

All eleven included files pass the supplied V3 validator. The audit also reports 99 unique stems, 396 unique choices, 396 unique feedback messages, profile lengths of 250–330 words, expert-longest rates no higher than 4/9, and option-length spreads no greater than 15 characters.

The `audit/CASEBOOK_V3_BATCH_AUDIT.md` file includes the complete nine-clue cohesion sheet for every case. The “solvable from any 6 of 9” standard remains a semantic playtest judgment rather than something the validator can formally prove, so these should be treated as playtest-ready drafts.
