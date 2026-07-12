// Assembles all game packs, validates them, and injects `const PACKS=[...]`
// into casebook.html at the /*__GAMES__*/ marker.
const fs=require('fs');
const path=require('path');
const HTML='/Users/scolnic/code/Nuclear/casebook.html';

// ---- load the CRISPR topics block (emits TOPICMAP, TOPICS) ----
function loadBlock(file){
  const txt=fs.readFileSync(file,'utf8');
  const sandbox={};
  new Function('S', txt+';S.TOPICMAP=TOPICMAP;S.TOPICS=TOPICS;')(sandbox);
  return sandbox;
}
const crisprBlk=loadBlock(path.join(__dirname,'crispr_topics_block.js'));

// ---- CRISPR pack (game 0), composed from the finished germline game ----
const crispr={
  id:"crispr", title:"The Germline Witness", discipline:"CRISPR & Gene Editing",
  teaser:"A celebrated gene-therapy institute hides a line no one was meant to cross. Go in as an auditor; leave with the truth.",
  overclaimTag:"an engineered bioweapon", truthTag:"undeclared human germline editing",
  venue:"The Halden Institute", agent:{name:"Dr. Lena Cho", role:"Investigator's Notepad"},
  standingLabel:"Scientific reputation", readingShort:"Pioneers",
  readingLabel:"Gene-Editing Pioneers", dossierName:"GENE-EDITING PIONEERS",
  enterLabel:"Arrive at the Institute",
  subt:"A deduction game inside the Halden Institute for Advanced Genomics",
  DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your certification visit ends. A hop across the campus costs a day or two; each stop is one appointment. All three informants move throughout the institute — travel to a wing, and choose whom to meet there.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"And beware the tabloid conclusion: the evidence points not to a bioweapon, but to something quieter and real.",
  story:[
    "The <b>Halden Institute for Advanced Genomics</b> runs one of the world's most celebrated gene-therapy programs — approved, published, praised on every magazine cover. But a coded message reached the Bureau: somewhere inside those glass corridors, someone has crossed the one line the whole world agreed never to cross. You are <b>Dr. Lena Cho</b>, and the badge on your coat says <i>biosafety auditor</i>. It's a lie you'll need.",
    "<b>Three people inside will help you</b> — each for their own reasons, and only if you earn it. <b>Nadia Sarto</b>, a bench technician who sees what the sequencers see. <b>The Registrar</b>, keeper of the drawings, logs, and change-orders no one's meant to read twice. And <b>Emil</b>, a cold-chain courier who knows exactly what moves between buildings, and when. None of them is the culprit; each holds only fragments of it.",
    "<b>Someone here is behind it.</b> Three names sit in your notepad: <b>Prof. Aris Vane</b>, the charismatic gene-therapy PI; <b>Dr. Sable</b>, the embryologist; and <b>Director Kessler</b>, who runs the Institute and chairs its ethics board. Each column of the case — <b>who</b> is behind it, <b>where</b> it culminates, <b>what</b> is truly happening — hides a tempting wrong answer. The tabloids already smell an engineered bioweapon. The Institute swears it's nothing but the therapy on the label. The truth is quieter than the first and graver than the second — and someone inside has bet everything on your not finding it.",
    "You have <b>8 days</b> and a single accusation. Get it right and a witness becomes proof; get it wrong and a scandal becomes a smear."
  ],
  CATS:{
    who:{ title:"Who is behind it", truth:"kessler", items:[
      {id:"vane",    label:"Prof. Aris Vane — gene-therapy PI"},
      {id:"sable",   label:"Dr. Sable — embryologist"},
      {id:"kessler", label:"Director Kessler — institute head & ethics chair"} ]},
    where:{ title:"Where it culminates", truth:"clinic", items:[
      {id:"genomics", label:"Genomics & Sequencing Core"},
      {id:"hq",       label:"Institute HQ & Bioethics Office"},
      {id:"clinic",   label:"IVF & Embryology Clinic"} ]},
    what:{ title:"What is happening", truth:"germline", items:[
      {id:"bioweapon", label:"An engineered-pathogen bioweapon"},
      {id:"somatic",   label:"An approved somatic gene-therapy program, only"},
      {id:"germline",  label:"Undeclared human germline editing, behind a cover-up"} ]},
  },
  PLACES:{
    hq:       {name:"Institute HQ & Bioethics Office", xy:[140,90]},
    genomics: {name:"Genomics & Sequencing Core",      xy:[330,240]},
    clinic:   {name:"IVF & Embryology Clinic",         xy:[520,90]},
  },
  EDGES:[["hq","genomics"],["genomics","clinic"]],
  CHARACTERS:{
    nadia:{ name:"Nadia Sarto", role:"Bench technician", face:"⚗", badge:"N", legend:"the bench",
      hint:"Runs the sequencers and the edits at the bench; frightened, and looking for someone she can trust." },
    registrar:{ name:"The Registrar", role:"Records & compliance clerk", face:"▤", badge:"R", legend:"records",
      hint:"Keeps the approvals, consent forms, and sample manifests; understanding is the credential she can't be shown a forgery of." },
    emil:{ name:"Emil", role:"Cold-chain courier", face:"✦", badge:"E", legend:"the loading bay",
      hint:"Moves samples, vectors, and cryo-dewars to the institute's quiet corners; hears everything and trusts no one." },
  },
  STORIES:{
   nadia:{
    hq:"On the glass-walled administration floor Nadia looks like she might bolt. \"They parade us through here for the funders,\" she whispers. \"Down at the bench it's different. Ask me something real, and be quick about it.\"",
    genomics:"Nadia meets you between the sequencers, badge turned backward. \"This is where I actually work — where the reads come out. Some of them I was told to delete. Ask what you need to, quietly.\"",
    clinic:"Nadia will barely step inside the clinic wing. \"I came in here once, to run a sample I wish I hadn't seen. Whatever you want to know, ask fast — I don't want to be found here.\"",
   },
   registrar:{
    hq:"The Registrar is at home in the HQ file room, surrounded by binders. \"I hold every approval this institute ever filed,\" they say evenly, \"and I know exactly which ones were never filed at all.\"",
    genomics:"The Registrar has tracked a chain-of-custody form down to the sequencing core. \"Every sample here is meant to have a matching entry. Some don't. Show me you'd grasp the discrepancy first.\"",
    clinic:"In the clinic's records alcove the Registrar folds their hands. \"The consent forms in this wing are immaculate — for the wrong procedure. Prove you see the difference, and I'll let you read them.\"",
   },
   emil:{
    hq:"Emil is conspicuously out of place in the HQ atrium, cap in hand. \"They don't like the help up here,\" he mutters. \"But I hear the directors talk down in the loading bay. Prove you're worth repeating it to.\"",
    genomics:"Emil wheels a dry-ice cart past the sequencers. \"I deliver what these machines read — and half of it isn't on any manifest. You want the real inventory? Show me you'd know what you're looking at.\"",
    clinic:"Emil lingers by the clinic's cryo-store, uneasy. \"Some of my three-in-the-morning drop-offs come here, and they aren't reagents. Show me you understand what that means, and I'll give you the route.\"",
   },
  },
  TOPICMAP:crisprBlk.TOPICMAP, TOPICS:crisprBlk.TOPICS,
  endings:{
    overclaimWhat:"bioweapon", dismissalWhat:"somatic",
    win:{
      expertTitle:"What the Evidence Supports, and No More",
      expert:["Cho names it exactly: Director Kessler orchestrating the concealment; the work culminating in the IVF & Embryology Clinic; an undeclared human germline-editing program hidden behind the approved somatic-therapy trial — and a buried off-target injury. Not a bioweapon.",
        "Every card accounted for. She kept her cover, worked her informants, and claimed precisely what she could defend — refusing the tabloid word. Lena Cho files a compliance report, exactly as her visa said she would, which is the whole point."],
      soundTitle:"Right — but Lightly Proven",
      sound:["Cho names the right three — Kessler, the Clinic, the undeclared germline program behind a cover-up. The shape is correct and her restraint exactly right.",
        "But she left too many cards unturned; the Bureau's lawyers will have to firm up the chain. Close and honest — a few more days of legwork would have made it unassailable."],
      namedTitle:"The Right Answer, Unearned",
      named:["Cho names the truth — Kessler, the Clinic, the germline program — but gathered too few clues to back it. It reads like a guess.",
        "The Bureau cannot act on an accusation this thin, however correct. Being right is not the same as being able to prove it."],
    },
    overclaim:{ title:"The Auditor Who Cried Bioweapon",
      body:["Cho reports a covert engineered-pathogen bioweapon — lurid, and not what the evidence shows.",
        "Nothing she gathered was pathogen work; the machinery for editing a person's DNA is not the machinery for a weapon. The overclaim collapses into human embryo editing plus a safety cover-up, and the real, provable violation is discredited by association with the fantasy stacked on top of it."] },
    dismissal:{ title:"The Compliance Sign-Off",
      body:["Cho certifies an approved somatic gene-therapy program and stops there. She is half right, and the graver half is missing.",
        "The mosaic edits across every tissue, the approvals that never existed, the injection rigs in the clinic — all point past the sanctioned therapy to an undeclared germline program. She saw the cover story and never what it was sheltering."] },
    wrongNames:{ title:"So Close",
      body:["Cho understands what is happening — an undeclared human germline-editing program behind a safety cover-up, not a bioweapon and not routine research. The science, she has cold."] },
  },
};

// ---- load any additional authored packs: pack_*.js exporting {PACK} ----
const extra=fs.readdirSync(__dirname).filter(f=>/^pack_.*\.js$/.test(f)).sort();
const packs=[crispr];
for(const f of extra){
  try{ const m=require(path.join(__dirname,f)); if(m&&m.PACK) packs.push(m.PACK); }
  catch(e){ console.log("SKIP",f,"—",e.message); }
}

// ---- validate ----
const V=['who','where','what'];
const key=b=>b.cat+":"+b.id;
function validate(P){
  const errs=[];
  ['id','title','discipline','teaser','venue','agent','CATS','PLACES','EDGES','CHARACTERS','STORIES','TOPICMAP','TOPICS','endings','story'].forEach(k=>{ if(P[k]==null) errs.push('missing '+k); });
  if(!P.CATS) return errs;
  V.forEach(c=>{ const cat=P.CATS[c]; if(!cat){errs.push('no CAT '+c);return;} if(!cat.items||cat.items.length!==3)errs.push(c+' needs 3 items'); if(!cat.items.find(i=>i.id===cat.truth))errs.push(c+' truth not in items'); });
  const places=Object.keys(P.PLACES||{}); if(places.length!==3)errs.push('need 3 places');
  const infs=Object.keys(P.CHARACTERS||{}); if(infs.length!==3)errs.push('need 3 informants');
  // TOPICMAP: every place x informant -> 2 topic ids, all present in TOPICS, 18 unique
  const seen=new Set();
  places.forEach(pl=>{ infs.forEach(inf=>{ const arr=((P.TOPICMAP||{})[pl]||{})[inf]; if(!arr||arr.length!==2){errs.push('TOPICMAP '+pl+'/'+inf+' needs 2');return;} arr.forEach(t=>{ if(!P.TOPICS[t])errs.push('missing TOPIC '+t); seen.add(t); }); }); });
  if(seen.size!==18)errs.push('need 18 unique topics, got '+seen.size);
  // questions
  let longest=0,total=0;
  Object.entries(P.TOPICS||{}).forEach(([id,t])=>{
    ['sci','topic','lede','profile','frame','q'].forEach(k=>{ if(t[k]==null)errs.push(id+' missing '+k); });
    if(!/\(/.test(t.sci||''))errs.push(id+' sci not a person "Name (…)"');
    const wc=(t.profile||'').split(/\s+/).length; if(wc<180)errs.push(id+' profile too short ('+wc+'w)');
    if(!Array.isArray(t.q)||t.q.length!==3){errs.push(id+' needs 3 questions');return;}
    t.q.forEach((it,i)=>{ if(!it.o||it.o.length!==4){errs.push(id+'.q'+i+' needs 4 opts');return;}
      if(it.o.filter(o=>o.v==='expert').length!==1)errs.push(id+'.q'+i+' needs exactly 1 expert');
      it.o.forEach(o=>{ if(!['expert','partial','wrong','danger'].includes(o.v))errs.push(id+'.q'+i+' bad verdict'); if(!o.t||!o.fb)errs.push(id+'.q'+i+' opt missing t/fb'); });
      total++; const L=it.o.map(o=>o.t.length); if(it.o.find(o=>o.v==='expert').t.length===Math.max(...L))longest++;
    });
  });
  const pct=total?Math.round(100*longest/total):0;
  if(pct>45)errs.push('correct-is-longest '+pct+'% (>45 — length tell)');
  // endings
  const E=P.endings||{};
  if(!E.win||!E.win.expert||!E.overclaim||!E.dismissal||!E.wrongNames)errs.push('endings incomplete');
  if(!P.CATS.what.items.find(i=>i.id===E.overclaimWhat))errs.push('overclaimWhat not a what-id');
  return errs;
}

// ---- solvability sim (greedy): can a knowledgeable player collect all 6? ----
function solvable(P){
  // deterministic deal: each informant gets a slice of the 6 non-truth clues
  const pool=[]; V.forEach(c=>P.CATS[c].items.forEach(it=>{ if(it.id!==P.CATS[c].truth) pool.push({cat:c,id:it.id}); }));
  const infs=Object.keys(P.CHARACTERS); const per=Math.floor(pool.length/infs.length);
  const hands={}; infs.forEach((inf,k)=>hands[inf]=pool.slice(k*per,(k+1)*per));
  // greedy: for each informant, at each of the 3 places, suggest to reveal held clues (assume all Qs aced -> 2/visit)
  const revealed=new Set(); const places=Object.keys(P.PLACES);
  // A perfect player visits informants until all their held clues are revealed. Each meeting reveals up to 2 held+matching.
  // Because WHERE is fixed to current place, a clue {where:X} needs meeting someone AT X; {who}/{what} need suggesting that id.
  let days=P.DAYS_TOTAL, loc=places[0], visits=0;
  const need=new Set(pool.map(key)); // all 6 must be revealed by their holders
  // simple upper-bound sim: repeatedly pick the meeting (place,inf) that reveals the most new clues
  while(need.size>0 && days>0 && visits<20){
    let best=null,bestGain=-1,bestLoc=loc;
    places.forEach(pl=>{ infs.forEach(inf=>{
      const gain=hands[inf].filter(b=>!revealed.has(key(b)) && (b.cat!=='where'||b.id===pl)).slice(0,2);
      const cost=(pl===loc?1:1); // adjacency ~1-2; approximate
      if(gain.length>bestGain){ bestGain=gain.length; best={pl,inf,gain}; bestLoc=pl; }
    }); });
    if(!best||bestGain<=0) break;
    const cost=(bestLoc===loc)?1:(P.EDGES.some(e=>(e[0]===loc&&e[1]===bestLoc)||(e[1]===loc&&e[0]===bestLoc))?1:2);
    days-=cost; loc=bestLoc; visits++;
    best.gain.forEach(b=>revealed.add(key(b)));
  }
  return {won:need.size===[...need].filter(k=>revealed.has(k)).length && [...need].every(k=>revealed.has(k)), revealed:revealed.size, days:P.DAYS_TOTAL-days, visits};
}

console.log('=== Casebook build ===');
const passing=[];
packs.forEach(P=>{
  const errs=validate(P);
  const sol=P.CATS?solvable(P):{won:false};
  const status=(errs.length===0 && sol.won)?'OK ':'FAIL';
  if(status==='OK ') passing.push(P);
  console.log(`[${status}] ${P.id.padEnd(12)} "${P.title}" — ${Object.keys(P.TOPICS||{}).length} topics · solve ${sol.revealed||0}/6 in ${sol.visits||'-'} visits/${sol.days||'-'}d`);
  if(errs.length) errs.slice(0,10).forEach(e=>console.log('       - '+e));
});

// ---- inject the PASSING packs (idempotent: matches the stub OR a prior build) ----
const packsJson=JSON.stringify(passing);
let html=fs.readFileSync(HTML,'utf8');
const re=/\/\*__GAMES__\*\/[\s\S]*?const GAMES = (?:PACKS|\(typeof PACKS!=="undefined"\) \? PACKS : \[\]);/;
if(!re.test(html)){ console.log('\nERROR: could not find the GAMES injection marker in casebook.html'); process.exit(1); }
html=html.replace(re, '/*__GAMES__*/\nconst PACKS = '+packsJson+';\nconst GAMES = PACKS;');
fs.writeFileSync(HTML,html);
console.log('\nInjected '+passing.length+' passing pack(s) into casebook.html: '+passing.map(p=>p.id).join(', '));
if(passing.length<packs.length) console.log('('+(packs.length-passing.length)+' pack(s) still failing — fix and re-run.)');
