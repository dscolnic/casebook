// Loads and validates Casebook V3 packs (three informants, three readings,
// three questions per reading, one WHO/WHAT/WHERE clue per reading).
//
// Discovers casebook_build/pack_*.js files that export { PACK }. Only packs
// that declare schemaVersion 3 (or mode "three_informants_three_readings")
// AND pass validation are returned in `passing`; anything else (old-engine
// packs, malformed drafts) is skipped so it can never reach the client.
//
// Used by the server at startup to build the case bank, and by
// casebook_build/build_casebook.js as a standalone authoring sanity-check.

function loadPacks() {
  const fs = require("fs");
  const path = require("path");

  const files = fs
    .readdirSync(__dirname)
    .filter((f) => /^pack_.*\.js$/.test(f))
    .sort();

  const packs = [];
  for (const f of files) {
    try {
      const m = require(path.join(__dirname, f));
      if (m && m.PACK) packs.push(m.PACK);
    } catch (e) {
      console.log("SKIP", f, "—", e.message);
    }
  }

  const CATS = ["who", "where", "what"];
  const VERDICTS = ["expert", "partial", "wrong", "danger"];

  function isV3(P) {
    return P && (P.schemaVersion === 3 || P.mode === "three_informants_three_readings");
  }

  function validate(P) {
    const errs = [];
    ["id", "title", "discipline", "teaser", "READING_ORDER", "CHARACTERS", "TOPICS", "CATS", "endings"].forEach((k) => {
      if (P[k] == null) errs.push("missing " + k);
    });
    if (errs.length) return errs;

    if (!Array.isArray(P.READING_ORDER) || P.READING_ORDER.length !== 3) errs.push("READING_ORDER must list 3 informants");
    (P.READING_ORDER || []).forEach((k) => {
      const c = P.CHARACTERS[k];
      if (!c) errs.push("READING_ORDER id not in CHARACTERS: " + k);
      else if (!P.TOPICS[c.reading]) errs.push("character " + k + " reading not in TOPICS");
    });
    if (Object.keys(P.TOPICS || {}).length !== 3) errs.push("need exactly 3 TOPICS");

    CATS.forEach((c) => {
      const cat = (P.CATS || {})[c];
      if (!cat) { errs.push("no CAT " + c); return; }
      if (!cat.items || cat.items.length !== 3) errs.push(c + " needs 3 items");
      if (!cat.items || !cat.items.find((i) => i.id === cat.truth)) errs.push(c + " truth not in items");
    });

    Object.entries(P.TOPICS || {}).forEach(([id, t]) => {
      ["sci", "topic", "profile", "q"].forEach((k) => { if (t[k] == null) errs.push(id + " missing " + k); });
      if (!Array.isArray(t.q) || t.q.length !== 3) { errs.push(id + " needs 3 questions"); return; }
      const clueCats = [];
      t.q.forEach((it, i) => {
        if (!it.o || it.o.length !== 4) { errs.push(id + ".q" + i + " needs 4 options"); return; }
        if (it.o.filter((o) => o.v === "expert").length !== 1) errs.push(id + ".q" + i + " needs exactly 1 expert");
        it.o.forEach((o) => {
          if (!VERDICTS.includes(o.v)) errs.push(id + ".q" + i + " bad verdict " + o.v);
          if (!o.t || !o.fb) errs.push(id + ".q" + i + " option missing t/fb");
        });
        if (!it.clue || !CATS.includes(it.clue.category)) errs.push(id + ".q" + i + " clue category invalid");
        else clueCats.push(it.clue.category);
      });
      if (clueCats.slice().sort().join(",") !== "what,where,who") errs.push(id + " clues must cover one who/one where/one what");
    });

    const E = P.endings || {};
    if (!E.win || !E.win.expertTitle || !E.win.soundTitle || !E.win.namedTitle) errs.push("endings.win needs expert/sound/named tiers");
    ["overclaim", "dismissal", "wrongNames"].forEach((k) => { if (!E[k] || !E[k].title || !E[k].body) errs.push("endings." + k + " incomplete"); });
    const whatIds = (P.CATS.what.items || []).map((x) => x.id);
    if (!whatIds.includes(E.overclaimWhat) || E.overclaimWhat === P.CATS.what.truth) errs.push("overclaimWhat must be a non-truth what-id");
    if (!whatIds.includes(E.dismissalWhat) || E.dismissalWhat === P.CATS.what.truth) errs.push("dismissalWhat must be a non-truth what-id");
    if (E.overclaimWhat === E.dismissalWhat) errs.push("overclaimWhat and dismissalWhat must differ");

    return errs;
  }

  const passing = packs.filter((P) => {
    if (!isV3(P)) return false; // old-engine packs are silently excluded
    const errs = validate(P);
    if (errs.length) console.log("INVALID pack", P.id || "(no id)", "—", errs.join("; "));
    return errs.length === 0;
  });

  return { packs, passing };
}

module.exports = { loadPacks };
