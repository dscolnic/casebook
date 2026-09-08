import { CURRICULUM as C } from '../themes/redsand/content/curriculum.js';
import { sentences } from '../engine/dev/plainQuestions.mjs';
const [area, n] = process.argv[2].split(/-(?=\d+$)/);
const l = C[area][+n-1];
const g = l.game ?? {};
const show = (k, v) => {
  if(!v) return;
  console.log(`--- ${k}`);
  for(const s of sentences(v)) console.log(`  [${s.split(/\s+/).length}] ${s}`);
};
show('scene', l.scene); show('guide', l.guide);
show('question', g.question ?? g.task); show('why', g.why);
show('takeaway', l.takeaway);
(l.background??[]).forEach((b,i)=>show('bg'+(i+1), b));
(g.choices??[]).forEach((c,i)=>show('choice'+(i+1), c));
