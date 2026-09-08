// derive.mjs — the bible's DERIVE board into the importer's.
//
// 86 stops, the largest group by a factor of four. See `_shared.mjs` for the
// contract every converter in this directory keeps.
import { keyOf } from './_shared.mjs';

export const FORMAT = 'DERIVE';

// The bible writes a step as `{id, doing, candidates:[{text, correct, rule,
// reason}]}` and the importer reads `{ask, answer, candidates:[{text, note,
// why, survives}]}`. `doing` is the ask, `rule` is the label the rail prints
// once a line is taken, and `reason` is the teaching on the wrong line.
//
// `survives` is the one thing not carried across, for the reason in _shared.
// So is a distractor shorter than the keyed line by more than six characters,
// which is the shape tell — shortening the answer or lengthening the distractor
// is writing algebra into somebody else's derivation.
export const convert = (b) => {
  const owes = [];
  const steps = (b.steps ?? []).map((st, i) => {
    const cands = st.candidates ?? [];
    const key = keyOf(cands);
    if(cands.length !== 2) owes.push(`step ${i + 1} has ${cands.length} candidates, not two`);
    if(key < 0) owes.push(`step ${i + 1} marks no single \`correct: true\` candidate`);
    const ask = String(st.doing ?? st.ask ?? '').trim();
    if(!ask) owes.push(`step ${i + 1} has no \`doing\``);
    cands.forEach((c, j) => {
      if(j === key) return;
      if(!String(c.reason ?? c.why ?? '').trim()) owes.push(`step ${i + 1}'s wrong line has no \`reason\``);
      if(c.survives !== true) owes.push(`step ${i + 1}'s wrong line is not marked \`survives\``);
      if(key >= 0 && String(c.text ?? '').length < String(cands[key].text ?? '').length - 6){
        owes.push(`step ${i + 1}'s keyed line is longer than its distractor`);
      }
    });
    return {
      ask, answer: key < 0 ? 0 : key,
      candidates: cands.map(c => ({
        text: String(c.text ?? ''),
        ...(c.rule || c.note ? { note: String(c.rule ?? c.note) } : {}),
        ...(c.reason || c.why ? { why: String(c.reason ?? c.why) } : {}),
        ...(c.survives === true ? { survives: true } : {}),
      })),
    };
  });
  if(!String(b.start ?? '').trim()) owes.push('no `start`');
  if(!String(b.goal ?? '').trim()) owes.push('no `goal`');
  if(steps.length < 2) owes.push('fewer than two steps');
  return { key: 'derive', value: { start: String(b.start ?? ''), goal: String(b.goal ?? ''), steps }, owes };
};

/**
 * WHITEOUT'S DERIVATION, which is a code trace rather than an algebra chain.
 *
 * Its steps are `{id, prompt, choices: [{line, correct, survives, why}]}` where the
 * panel reads `{ask, answer, candidates: [{text, note, why, survives}]}` — the same
 * board, three renames apart. `id` is the step's slug and `prompt` is what the step
 * is doing, which is exactly what the rail prints as `ask`.
 *
 * The keyed candidate's INDEX is what the panel grades on, so it is computed here
 * rather than carried as a flag: a board with two `correct: true` lines, or none,
 * owes rather than silently keying the first.
 */
export const convertCanonical = (b, stop) => {
  const owes = [];
  const steps = (b.steps ?? []).map((st, i) => {
    const cands = st.candidates ?? st.choices ?? [];
    const key = cands.findIndex(c => c?.correct === true);
    if(cands.length !== 2) owes.push(`step ${i + 1} has ${cands.length} candidates, not two`);
    if(key < 0) owes.push(`step ${i + 1} marks no \`correct: true\` candidate`);
    if(cands.filter(c => c?.correct === true).length > 1) owes.push(`step ${i + 1} marks two`);
    const ask = String(st.ask ?? st.prompt ?? st.doing ?? '').trim();
    if(!ask) owes.push(`step ${i + 1} has no \`prompt\``);
    return {
      ask, answer: key < 0 ? 0 : key,
      candidates: cands.map(c => ({
        text: String(c.text ?? c.line ?? ''),
        ...(c.note || c.rule ? { note: String(c.note ?? c.rule) } : {}),
        ...(c.why || c.reason ? { why: String(c.why ?? c.reason) } : {}),
        ...(c.survives === true ? { survives: true } : {}),
      })),
    };
  });
  if(steps.length < 2) owes.push('fewer than two steps');
  const value = { start: String(b.start ?? b.given ?? ''), goal: String(b.goal ?? ''),
    ...(b.startNote ? { startNote: String(b.startNote) } : {}), steps };
  return { key: 'derive', value, owes };
};
