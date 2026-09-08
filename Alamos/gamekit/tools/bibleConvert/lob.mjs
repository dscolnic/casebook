// lob.mjs — the bible's authored LOB board into the importer's.
//
// One stop: midway M11 S44, the flume's water arc used as a speed check. No §7
// board for LOB exists in any bible, so this module exports `convertCanonical`
// only.
//
// THE RENAMES. The board's `marks` are the importer's `lob.targets`; a mark's
// `range` is a target's `distance`; and the radius a shot has to land inside is
// the board's `tolerance.range`, which is one number for the whole board rather
// than one per mark. `charge.max` is the importer's `maxSpeed` — the fastest the
// control can throw — and getting that across is the difference between a
// playable board and one the importer refuses twice over. Left at the default
// 40 m/s, a mark at 3.6 m is reached at full charge by every sampled angle, so
// aiming is decoration; the bible's own charge range tops out at 7 m/s, which is
// the arc this stop is actually about.
//
// WHAT IS DROPPED, said rather than owed. `correct: {angle, charge}` is the
// author's own solution, and the panel has no field for one: a LOB is graded by
// flying the shot and seeing where it lands, so a keyed pair of control
// positions would be a second description of the physics that the first
// correction to either would separate. `target` names which mark to aim at, and
// the panel works the marks outward in order. `tolerance.speed` prices a control
// the importer does not model.
import { pathToFileURL } from 'node:url';
import { num, str, pick, list } from './_shared.mjs';

export const FORMAT = 'LOB';

export const convertCanonical = (b, stop = {}) => {
  const board = (b && typeof b === 'object' && !Array.isArray(b)) ? b : {};
  const owes = [];

  const radius = num(pick(pick(board, 'tolerance') ?? {}, 'range', 'distance'));
  if(radius === undefined){
    owes.push('the board authors no `tolerance.range` — the distance a shot may miss a mark by,'
      + ' and every mark needs one or nothing can be judged a hit');
  }

  const raw = list(pick(board, 'marks', 'targets'));
  const targets = [];
  raw.forEach((m, i) => {
    const label = str(pick(m ?? {}, 'label', 'id'));
    const distance = num(pick(m ?? {}, 'range', 'distance'));
    const own = num(pick(m ?? {}, 'radius'));
    const r = own !== undefined ? own : radius;
    if(!label || distance === undefined || !(distance > 0)){
      owes.push(`mark ${i + 1} needs a label and a positive \`range\` — the panel draws it on the`
        + ' ground at that distance');
      return;
    }
    targets.push({ label, distance, ...(r !== undefined ? { radius: r } : {}) });
  });
  if(targets.length < 2 || targets.length > 5){
    owes.push(`the board authors ${targets.length} mark(s), and a lob runs between two and five`);
  }
  // The panel works outward, so the marks are read in the order the board wrote
  // them and a board that wrote them out of order is told rather than sorted:
  // which mark comes first is the shape of the run.
  for(let i = 1; i < targets.length; i++){
    if(!(targets[i].distance > targets[i - 1].distance)){
      owes.push(`mark "${targets[i].label}" at ${targets[i].distance} is not further out than`
        + ` "${targets[i - 1].label}" at ${targets[i - 1].distance} — the run works outward`);
      break;
    }
  }

  const maxSpeed = num(pick(pick(board, 'charge', 'power', 'speed') ?? {}, 'max'));
  if(maxSpeed === undefined){
    owes.push('the board authors no `charge.max` — the fastest the control can throw. Without it'
      + ' the panel assumes forty metres a second, which reaches a three-metre mark at every'
      + ' angle, and aiming stops mattering');
  }

  const value = {
    targets,
    ...(maxSpeed !== undefined ? { maxSpeed } : {}),
    ...(num(pick(board, 'gravity')) !== undefined ? { gravity: num(pick(board, 'gravity')) } : {}),
    ...(num(pick(board, 'height')) !== undefined ? { height: num(pick(board, 'height')) } : {}),
    ...(num(pick(board, 'shots')) !== undefined ? { shots: num(pick(board, 'shots')) } : {}),
    ...(num(pick(board, 'wind')) !== undefined ? { wind: num(pick(board, 'wind')) } : {}),
    ...(str(pick(board, 'projectile')) ? { projectile: str(pick(board, 'projectile')) } : {}),
    ...(str(pick(board, 'hint')) ? { hint: str(pick(board, 'hint')) } : {}),
    ...(str(pick(board, 'moral')) ? { moral: str(pick(board, 'moral')) } : {}),
  };
  const extra = {};
  const said = str(pick(board, 'answerText', 'correctConclusion', 'correctResult'));
  if(said && !String(stop.answerText ?? '').trim()) extra.answerText = said;

  return { key: 'lob', value, owes, extra };
};

// ------------------------------------------------------------------ selftest
export function selftest(){
  const fails = [];
  const ok = (c, m) => { if(!c) fails.push(m); };
  const FIX = () => ({
    angle: { min: 20, max: 70, step: 1, unit: 'degrees' },
    charge: { min: 3.0, max: 7.0, step: 0.1, unit: 'm/s' },
    marks: [{ id: 'short', label: 'Short marker', range: 3.0 },
      { id: 'target', label: 'Target marker', range: 3.6 },
      { id: 'long', label: 'Long marker', range: 4.2 }],
    target: 'target',
    correct: { angle: 45, charge: 5.94 },
    tolerance: { range: 0.12, speed: 0.09 },
  });

  let r = convertCanonical(FIX());
  ok(r.key === 'lob', 'the board is placed under `lob`');
  ok(r.owes.length === 0, `a complete board owes nothing: ${r.owes.join(' | ')}`);
  ok(r.value.targets.length === 3, `three marks: ${JSON.stringify(r.value.targets)}`);
  ok(r.value.targets.every(t => t.radius === 0.12), 'the board tolerance becomes each mark radius');
  ok(r.value.maxSpeed === 7, `charge.max is maxSpeed: ${r.value.maxSpeed}`);

  // THE CASE THIS CONVERTER EXISTS FOR, and the one that decides the board is
  // playable. Without `charge.max` the panel throws at 40 m/s.
  const noCharge = FIX();
  delete noCharge.charge;
  r = convertCanonical(noCharge);
  ok(r.value.maxSpeed === undefined, 'no charge means no maxSpeed rather than an invented one');
  ok(r.owes.some(o => /charge\.max/.test(o)), `and it is said: ${r.owes.join(' | ')}`);

  const noTol = FIX();
  delete noTol.tolerance;
  ok(convertCanonical(noTol).owes.some(o => /tolerance\.range/.test(o)), 'a missing radius is said');

  const backwards = FIX();
  backwards.marks = [backwards.marks[2], backwards.marks[0], backwards.marks[1]];
  ok(convertCanonical(backwards).owes.some(o => /works outward/.test(o)),
    'marks out of order are reported, not silently sorted');

  const one = FIX();
  one.marks = [one.marks[0]];
  ok(convertCanonical(one).owes.some(o => /between two and five/.test(o)), 'one mark is not a run');

  // A mark carrying its own radius keeps it; two boards describing one run agree.
  const own = FIX();
  own.marks = own.marks.map(m => ({ ...m, radius: 0.12 }));
  ok(JSON.stringify(convertCanonical(own).value.targets)
    === JSON.stringify(convertCanonical(FIX()).value.targets),
    'a per-mark radius and a board tolerance describe one run');

  if(fails.length){ console.error(`LOB selftest: ${fails.length} failure(s)`); for(const f of fails) console.error('  ' + f); process.exitCode = 1; }
  else console.log('LOB selftest: ok');
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) selftest();
