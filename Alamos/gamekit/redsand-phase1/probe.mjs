import { scoreTheme, cardUnits, score, sentences } from '../engine/dev/plainQuestions.mjs';
import { CURRICULUM as C } from '../themes/redsand/content/curriculum.js';
const { rows } = scoreTheme(C);
const want = process.argv.slice(2);
for(const r of rows){
  if(want.length && !want.includes(r.id)) continue;
  if(!want.length && r.grade <= 6.5 && r.long === 0) continue;
  console.log(`${r.id}\tgrade ${r.grade.toFixed(2)}\tw/s ${r.wps.toFixed(1)}\tsyl/w ${r.spw.toFixed(2)}\twords ${r.words}\tlong ${r.long}\tlongest ${r.longest}\t${r.title}`);
  if(r.worstSentence) console.log(`   LONG(${r.worstSentence.split(/\s+/).length}): ${r.worstSentence}`);
}
