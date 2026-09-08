// sciencetank.mjs — the proposals board, from the bible's ids to the panel's labels.
//
// The panel offers several proposals and asks the player to weight them, and the
// board says what each one is worth. The bible identifies a proposal twice — an
// `id` for its own cross-references and a `label` the player reads — and keys its
// recommendation by the id:
//
//   proposals:  [{id: canary, label: "Canary monitoring", max: 30}, …]
//   recommended: {canary: 30, restart: 0, …}
//
// `tools/import-book.mjs` reads `recommended` by LABEL, because that is what a
// verdict prints and what a player picked. Refused for the difference, Whiteout's
// finale reported five proposals "not offered" about a board that offers exactly
// those five — which reads as a bible that recommended something it never wrote.
//
// So this is a rename and nothing else: no weight is changed, no proposal is
// added, and a board already keyed by label passes through untouched.
export const FORMAT = 'SCIENCETANK';

export const convertCanonical = (b, stop) => {
  const owes = [];
  const proposals = (b.proposals ?? []).map(p => ({
    ...p, label: String(p.label ?? p.id ?? ''),
  }));
  const byId = new Map(proposals.map(p => [String(p.id ?? p.label), p.label]));
  const labels = new Set(proposals.map(p => p.label));

  const rec = {};
  for(const [k, v] of Object.entries(b.recommended ?? {})){
    // Already a label, or an id this board knows. Anything else is a genuine
    // finding and is left as written so the importer reports it.
    const label = labels.has(k) ? k : byId.get(k);
    if(!label){ owes.push(`recommends "${k}", which is neither a proposal id nor a label`); }
    rec[label ?? k] = v;
  }
  if(proposals.length < 3) owes.push('fewer than three proposals');
  return { key: 'proposals', value: proposals,
    extra: { ...(Object.keys(rec).length ? { recommended: rec } : {}) }, owes };
};
