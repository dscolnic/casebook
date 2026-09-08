import { CURRICULUM as C } from '../themes/overwind/content/curriculum.js';
import { sentences } from '../engine/dev/plainQuestions.mjs';
const LONGEST = 28;
for(const [area, lessons] of Object.entries(C)){
  (lessons||[]).forEach((l,i)=>{
    const id = `${area}-${i+1}`;
    const g = l.game||{};
    const blocks = [['scene',l.scene],['guide',l.guide],['question',g.question??g.task],['why',g.why],['takeaway',l.takeaway],
      ...(l.background||[]).map((b,n)=>[`background[${n}]`,b]),
      ...(g.choices||[]).map((c,n)=>[`choice[${n}]`,String(c)])];
    for(const [k,v] of blocks){
      if(!v) continue;
      for(const s of sentences(v)){
        const w = s.split(/\s+/).filter(Boolean).length;
        if(w > LONGEST) console.log(`\n### ${id} ${k} (${w}w)\n${s}`);
      }
    }
  });
}
