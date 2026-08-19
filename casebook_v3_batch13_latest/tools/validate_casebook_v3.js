const fs = require('fs');
const files = process.argv.slice(2);
const banned = [
  'quieter and graver','quieter than the first and graver than the second','three people will help you',
  'each carrying a piece','none the whole','hides a tempting wrong answer',"it's important to note",
  'plays a crucial role','plays a vital role','a testament to','rich tapestry','delve into',
  'navigate the complexities','stands as a','serves as a reminder','in the world of','when it comes to'
];
function words(s){ return (s.match(/[A-Za-z0-9’'-]+/g)||[]).length; }
function norm(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
function walk(v, path=[], out=[]){
  if (typeof v === 'string') out.push([path.join('.'),v]);
  else if (Array.isArray(v)) v.forEach((x,i)=>walk(x,path.concat(i),out));
  else if (v && typeof v === 'object') Object.entries(v).forEach(([k,x])=>walk(x,path.concat(k),out));
  return out;
}
let allOK=true;
for (const file of files){
  delete require.cache[require.resolve(file)];
  const p=require(file).PACK;
  const errs=[];
  if(p.schemaVersion!==3) errs.push('schemaVersion');
  if(p.mode!=='three_informants_three_readings') errs.push('mode');
  if(p.DAYS_TOTAL!==3) errs.push('DAYS_TOTAL');
  const topics=Object.values(p.TOPICS||{});
  if(topics.length!==3) errs.push(`topics=${topics.length}`);
  if((p.READING_ORDER||[]).length!==3) errs.push('reading order');
  for(const c of p.READING_ORDER||[]){ if(!p.CHARACTERS[c] || !p.TOPICS[p.CHARACTERS[c].reading]) errs.push(`bad reading ref ${c}`); }
  const stems=[], opts=[], fbs=[]; let qCount=0,aCount=0,longestExpert=0,maxSpread=0;
  for(const t of topics){
    const wc=words(t.profile||''); if(wc<250||wc>330) errs.push(`${t.sci} profile ${wc}w`);
    if((t.q||[]).length!==3) errs.push(`${t.sci} q=${(t.q||[]).length}`);
    const cats=[];
    for(const q of t.q||[]){
      qCount++; stems.push(norm(q.q)); cats.push(q.clue?.category);
      if(!q.clue || !['who','what','where'].includes(q.clue.category)) errs.push(`${t.sci} bad clue`);
      if((q.o||[]).length!==4) errs.push(`${t.sci} option count`);
      const experts=(q.o||[]).filter(o=>o.v==='expert').length; if(experts!==1) errs.push(`${t.sci} experts=${experts}`);
      const lens=(q.o||[]).map(o=>o.t.length); maxSpread=Math.max(maxSpread,Math.max(...lens)-Math.min(...lens));
      const e=(q.o||[]).find(o=>o.v==='expert'); if(e && e.t.length===Math.max(...lens)) longestExpert++;
      for(const o of q.o||[]){ aCount++; opts.push(norm(o.t)); fbs.push(norm(o.fb)); if(!['expert','partial','wrong','danger'].includes(o.v)) errs.push('bad verdict'); }
    }
    if([...cats].sort().join(',')!=='what,where,who') errs.push(`${t.sci} clue cats ${cats}`);
  }
  const dup=(arr)=>arr.length-new Set(arr).size;
  if(dup(stems)) errs.push(`duplicate stems=${dup(stems)}`);
  if(dup(opts)) errs.push(`duplicate options=${dup(opts)}`);
  if(dup(fbs)) errs.push(`duplicate feedback=${dup(fbs)}`);
  const strings=walk(p);
  for(const [path,s] of strings){ if(s==='') errs.push(`empty ${path}`); for(const b of banned){ if(s.toLowerCase().includes(b)) errs.push(`banned '${b}' at ${path}`); } }
  const whatLens=p.CATS.what.items.map(x=>x.label.length);
  const summary={id:p.id,topics:topics.length,questions:qCount,answers:aCount,profileWords:topics.map(t=>words(t.profile)),expertLongest:`${longestExpert}/${qCount} (${Math.round(100*longestExpert/qCount)}%)`,maxOptionSpread:maxSpread,whatLabelLengths:whatLens,errors:errs};
  console.log(JSON.stringify(summary,null,2));
  if(errs.length){allOK=false;}
}
process.exit(allOK?0:1);
