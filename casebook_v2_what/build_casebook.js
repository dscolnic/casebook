const fs=require('fs');
const path=require('path');
const DIR=__dirname;
const files=fs.readdirSync(DIR).filter(f=>/^pack_.*\.js$/.test(f)).sort();
const allowedColors=new Set(['#121212','#e2e2d8','#326891','#b3261e']);
const banned=[
  'quieter and graver','quieter than the first and graver than the second','three people will help you',
  'each carrying a piece','none the whole','hides a tempting wrong answer',"it's important to note",
  'plays a crucial role','plays a vital role','a testament to','rich tapestry','delve into',
  'navigate the complexities','stands as a','serves as a reminder','in the world of','when it comes to'
];
const norm=s=>(s||'').toLowerCase().replace(/<[^>]*>/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
const words=s=>norm(s).split(/\s+/).filter(Boolean);
const wc=s=>(s||'').trim().split(/\s+/).filter(Boolean).length;
function walkStrings(x,out=[],p=''){
  if(typeof x==='string')out.push([p,x]);
  else if(Array.isArray(x))x.forEach((v,i)=>walkStrings(v,out,`${p}[${i}]`));
  else if(x&&typeof x==='object')Object.entries(x).forEach(([k,v])=>walkStrings(v,out,p?`${p}.${k}`:k));
  return out;
}
function sixRuns(s){const w=words(s),r=[];for(let i=0;i+5<w.length;i++)r.push(w.slice(i,i+6).join(' '));return r;}
function clueSolvability(P){
  const wrongWho=P.CATS.who.items.filter(x=>x.id!==P.CATS.who.truth).map(x=>({cat:'who',id:x.id}));
  const wrongWhere=P.CATS.where.items.filter(x=>x.id!==P.CATS.where.truth).map(x=>({cat:'where',id:x.id}));
  const pool=[...wrongWho,...wrongWhere];
  const witnesses=Object.keys(P.CHARACTERS), places=Object.keys(P.PLACES);
  // Deterministic 2-1-1 distribution, matching the engine's fixed daily model assumption.
  const hands={[witnesses[0]]:pool.slice(0,2),[witnesses[1]]:pool.slice(2,3),[witnesses[2]]:pool.slice(3,4)};
  const states=new Set(['|']);
  let frontier=[{day:0,revealed:new Set()}];
  for(let day=0;day<P.DAYS_TOTAL;day++){
    const next=[];
    for(const st of frontier){
      for(const w of witnesses)for(const pl of places)for(const who of P.CATS.who.items){
        const rev=new Set(st.revealed);
        for(const c of hands[w]){
          if(c.cat==='where'&&c.id===pl)rev.add(`where:${c.id}`);
          if(c.cat==='who'&&c.id===who.id)rev.add(`who:${c.id}`);
        }
        if(rev.size===4)return {pass:true,days:day+1};
        const key=[...rev].sort().join('|');
        if(!states.has(`${day+1}|${key}`)){states.add(`${day+1}|${key}`);next.push({day:day+1,revealed:rev});}
      }
    }
    frontier=next;
  }
  return {pass:false,days:null};
}
function validate(P){
  const e=[];
  for(const k of ['id','title','discipline','teaser','emblem','CATS','PLACES','CHARACTERS','TOPICMAP','TOPICS','STORIES','story','endings'])if(P[k]==null)e.push(`missing ${k}`);
  if(P.DAYS_TOTAL!==5)e.push('DAYS_TOTAL must be 5');
  const places=Object.keys(P.PLACES||{}), witnesses=Object.keys(P.CHARACTERS||{}), topics=Object.keys(P.TOPICS||{});
  if(places.length!==3)e.push('need 3 PLACES'); if(witnesses.length!==3)e.push('need 3 CHARACTERS'); if(topics.length!==9)e.push('need 9 TOPICS');
  const whereIds=(P.CATS?.where?.items||[]).map(x=>x.id).sort();
  if(JSON.stringify(whereIds)!==JSON.stringify([...places].sort()))e.push('CATS.where ids must equal PLACES ids');
  const seen=[];
  for(const pl of places)for(const w of witnesses){const a=P.TOPICMAP?.[pl]?.[w];if(!Array.isArray(a)||a.length!==1)e.push(`TOPICMAP ${pl}/${w} must contain exactly 1 id`);else seen.push(a[0]);}
  if(seen.length!==9||new Set(seen).size!==9||topics.some(t=>!seen.includes(t)))e.push('TOPICMAP must reference all 9 topics once');
  const svg=P.emblem||'';if(!svg.includes('<svg')||svg.includes('<text'))e.push('invalid emblem');
  for(const c of svg.match(/#[0-9a-fA-F]{6}/g)||[])if(!allowedColors.has(c.toLowerCase()))e.push(`emblem color ${c}`);
  const what=P.CATS?.what; if(!what||what.items?.length!==3)e.push('WHAT needs 3 choices'); else {
    const L=what.items.map(x=>x.label.length), truth=what.items.find(x=>x.id===what.truth);
    if(Math.max(...L)-Math.min(...L)>12)e.push(`WHAT length spread ${L}`);
    if(truth&&truth.label.length===Math.max(...L))e.push('WHAT truth may not be longest');
  }
  const stems=[],opts=[],fbs=[];let longest=0,total=0,maxSpread=0;
  for(const [id,t] of Object.entries(P.TOPICS||{})){
    for(const k of ['sci','topic','lede','profile','frame','whatHint','q'])if(t[k]==null)e.push(`${id} missing ${k}`);
    const n=wc(t.profile);if(n<250||n>330)e.push(`${id} profile ${n} words`);
    const surname=(t.sci||'').split('(')[0].trim().split(/\s+/).pop().toLowerCase();if(!norm(t.whatHint).includes(norm(surname)))e.push(`${id} whatHint does not name figure`);
    if(!Array.isArray(t.q)||t.q.length!==3){e.push(`${id} needs 3 questions`);continue;}
    t.q.forEach((q,qi)=>{
      total++;stems.push(norm(q.q));if(!Array.isArray(q.o)||q.o.length!==4){e.push(`${id}.q${qi+1} needs 4 options`);return;}
      if(q.o.filter(o=>o.v==='expert').length!==1)e.push(`${id}.q${qi+1} needs 1 expert`);
      const L=q.o.map(o=>o.t.length);maxSpread=Math.max(maxSpread,Math.max(...L)-Math.min(...L));
      const ex=q.o.find(o=>o.v==='expert');if(ex&&ex.t.length===Math.max(...L))longest++;
      q.o.forEach(o=>{if(!['expert','partial','wrong','danger'].includes(o.v))e.push(`${id}.q${qi+1} bad verdict`);if(!o.fb)e.push(`${id}.q${qi+1} missing feedback`);if(!/[.!?…]$/.test(o.t.trim()))e.push(`${id}.q${qi+1} option punctuation`);if(!/[.!?…]$/.test((o.fb||'').trim()))e.push(`${id}.q${qi+1} feedback punctuation`);opts.push(norm(o.t));fbs.push(norm(o.fb));});
    });
  }
  if(total!==27)e.push(`need 27 questions, got ${total}`);if(maxSpread>12)e.push(`max quiz spread ${maxSpread}`);if(longest>12)e.push(`expert longest ${longest}/27`);
  if(new Set(stems).size!==stems.length)e.push('duplicate question stems');if(new Set(opts).size!==opts.length)e.push('duplicate options');if(new Set(fbs).size!==fbs.length)e.push('duplicate feedback');
  const corpus=walkStrings(P).map(x=>x[1]).join('\n').toLowerCase();for(const b of banned)if(corpus.includes(b))e.push(`banned phrase: ${b}`);
  const truthLabel=what?.items?.find(x=>x.id===what.truth)?.label||'';const pre=[P.teaser,P.overclaimTease,...(P.story||[])].join(' ').toLowerCase();if(truthLabel&&pre.includes(truthLabel.toLowerCase()))e.push('pre-play truth-label spoiler');
  const sol=clueSolvability(P);if(!sol.pass)e.push('WHO/WHERE clues not solvable within 5 days');
  return {errors:e,stats:{longest,total,maxSpread,profiles:[Math.min(...Object.values(P.TOPICS).map(t=>wc(t.profile))),Math.max(...Object.values(P.TOPICS).map(t=>wc(t.profile)))],solveDays:sol.days}};
}
const packs=[];let failed=false;
for(const f of files){delete require.cache[require.resolve(path.join(DIR,f))];const P=require(path.join(DIR,f)).PACK;packs.push(P);const r=validate(P);const ok=!r.errors.length;failed||=!ok;console.log(`[${ok?'OK':'FAIL'}] ${P.id}: 9 topics · 27 questions · hints 9 · expert-longest ${r.stats.longest}/27 · spread ${r.stats.maxSpread} · profiles ${r.stats.profiles[0]}-${r.stats.profiles[1]}w · clues ${r.stats.solveDays||'-'}d`);for(const x of r.errors)console.log('  - '+x);}
// Cross-pack anti-templating: exact duplicates and six-word runs in authored categories.
const categories={profile:[],frame:[],hint:[],question:[],option:[],feedback:[],story:[]};
for(const P of packs){for(const [tid,t] of Object.entries(P.TOPICS)){categories.profile.push([P.id,tid,t.profile]);categories.frame.push([P.id,tid,t.frame]);categories.hint.push([P.id,tid,t.whatHint]);for(let qi=0;qi<3;qi++){const q=t.q[qi];categories.question.push([P.id,`${tid}.${qi}`,q.q]);q.o.forEach((o,oi)=>{categories.option.push([P.id,`${tid}.${qi}.${oi}`,o.t]);categories.feedback.push([P.id,`${tid}.${qi}.${oi}`,o.fb]);});}}for(const [w,pm] of Object.entries(P.STORIES))for(const [pl,s] of Object.entries(pm))categories.story.push([P.id,`${w}.${pl}`,s]);}
for(const [cat,items] of Object.entries(categories)){
  const exact=new Map(),runs=new Map();
  for(const [pid,key,s] of items){const n=norm(s);if(!exact.has(n))exact.set(n,[]);exact.get(n).push([pid,key]);for(const r of new Set(sixRuns(s))){if(!runs.has(r))runs.set(r,[]);runs.get(r).push([pid,key]);}}
  const d=[...exact.values()].filter(x=>x.length>1),r=[...runs.values()].filter(x=>x.length>1);
  if(d.length||r.length){failed=true;console.log(`[FAIL] cross-pack ${cat}: exact=${d.length}, repeated-six-word-runs=${r.length}`);}else console.log(`[OK] cross-pack ${cat}: no exact duplicates or repeated six-word runs`);
}
if(failed)process.exit(1);
