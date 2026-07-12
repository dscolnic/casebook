// Assembles the 7 per-day design files (batch/gen_<day>.js) into 50 starter
// packs + a day-tagged manifest for the batch driver. Idempotent; safe to re-run
// (re-run only overwrites STUBS — never authored prose, because it refuses to
// rewrite a pack whose first topic already has a profile).
//
//   node generate_batch50.js            # assemble + report
//   node generate_batch50.js --write    # actually write stubs + manifest
const fs = require('fs'), path = require('path');
const XY = [[140,90],[330,240],[520,90]];
const DAYS = ['mon','tue','wed','thu','fri','sat','sun'];
const DAY_LABEL = { mon:'Machines & Structures', tue:'Energy & Matter', wed:'Body & Medicine',
  thu:'Earth & Sky', fri:'Code & Signals', sat:'Law, Money & Power', sun:'Mind & Culture' };
const WRITE = process.argv.includes('--write');

// ---- load day files ----
const games = [];
for (const d of DAYS) {
  const f = path.join(__dirname, 'batch', `gen_${d}.js`);
  if (!fs.existsSync(f)) { console.log(`  (missing gen_${d}.js — skipped)`); continue; }
  let arr; try { arr = require(f); } catch (e) { console.log(`  gen_${d}.js BROKEN: ${e.message}`); continue; }
  arr.forEach(g => { g._day = d; games.push(g); });
}
console.log(`loaded ${games.length} games from ${DAYS.filter(d=>fs.existsSync(path.join(__dirname,'batch',`gen_${d}.js`))).length} day-files`);

// ---- collision + shape checks ----
const used = new Set(fs.readFileSync(path.join(__dirname,'batch','used_figures.txt'),'utf8').split('\n').map(s=>s.trim()).filter(Boolean));
const gameIds = new Map(), topicIds = new Map(), figs = new Map();
const existing = fs.readdirSync(__dirname).filter(f=>/^pack_.*\.js$/.test(f)).map(f=>f.replace(/^pack_|\.js$/g,''));
let hard = 0, warn = 0;
for (const g of games) {
  if (!g.id || !g.topics || g.topics.length !== 18) { console.log(`  HARD ${g.id}: not 18 topics`); hard++; continue; }
  if (gameIds.has(g.id) || existing.includes(g.id)) { console.log(`  HARD dup game id: ${g.id}`); hard++; }
  gameIds.set(g.id, g._day);
  const seenT = new Set();  // topic ids only need to be unique WITHIN a pack
  for (const [tid, sci] of g.topics.map(t=>[t[0], t[1]])) {
    if (seenT.has(tid)) { console.log(`  HARD dup topic id within ${g.id}: ${tid}`); hard++; }
    seenT.add(tid);
    if (!/\(/.test(sci||'')) { console.log(`  HARD ${g.id}: sci without paren: ${sci}`); hard++; }
    const name = (sci||'').replace(/\s*\(.*/,'').trim();
    if (used.has(name)) { console.log(`  WARN reuse of existing figure: ${name} (${g.id})`); warn++; }
    if (figs.has(name)) { console.log(`  WARN figure in 2 new games: ${name} (${g.id} & ${figs.get(name)})`); warn++; }
    figs.set(name, g.id);
  }
}
console.log(`checks: ${hard} hard problem(s), ${warn} warning(s). distinct new figures: ${figs.size}`);
const byDay = {}; games.forEach(g=>byDay[g._day]=(byDay[g._day]||0)+1);
console.log('per day:', DAYS.map(d=>`${d}:${byDay[d]||0}`).join(' '));
if (hard) { console.log('\nFix hard problems before writing.'); if (WRITE) process.exit(1); }
if (!WRITE) { console.log('\n(dry run — pass --write to generate stubs + manifest)'); return; }

// ---- starter() — same shape as generate_more.js ----
function esc(s){ return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"'); }
function catBlock(name,c){
  const items=c.items.map(([id,label])=>`      {id:"${id}", label:"${esc(label)}"}`).join(",\n");
  const title=name==="who"?"Who is behind it":name==="where"?"Where it culminates":"What is happening";
  return `    ${name}:{ title:"${title}", truth:"${c.truth}", items:[\n${items} ]}`;
}
function starter(g){
  const P=[];
  P.push(`// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.`);
  P.push(`module.exports = { PACK: {`);
  P.push(`  id:"${g.id}", title:"${esc(g.title)}", discipline:"${esc(g.discipline)}",`);
  P.push(`  teaser:"${esc(g.teaser)}", overclaimTag:"${esc(g.overclaimTag)}", truthTag:"${esc(g.truthTag)}",`);
  P.push(`  venue:"${esc(g.venue)}", agent:{name:"${esc(g.agent)}", role:"Investigator's Notepad"},`);
  P.push(`  standingLabel:"${esc(g.standingLabel)}", readingShort:"${esc(g.readingShort)}", readingLabel:"${esc(g.readingLabel)}",`);
  P.push(`  dossierName:"${esc(g.dossierName)}", enterLabel:"${esc(g.enterLabel)}", subt:"${esc(g.subt)}", DAYS_TOTAL:8,`);
  P.push(`  boardNarr:"You have \${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",`);
  P.push(`  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",`);
  P.push(`  overclaimTease:"FILL: one italic sentence warning off the overclaim (${esc(g.overclaimTag)}) toward the truth, WITHOUT naming the true WHAT.",`);
  P.push(`  CATS:{`);
  P.push(catBlock("who",g.who)+",");
  P.push(catBlock("where",g.where)+",");
  P.push(catBlock("what",g.what));
  P.push(`  },`);
  const pl=g.places.map((id,i)=>{ const label=g.where.items.find(it=>it[0]===id)[1]; return `    ${id}:{name:"${esc(label)}", xy:[${XY[i][0]},${XY[i][1]}]}`; }).join(",\n");
  P.push(`  PLACES:{\n${pl}\n  },`);
  P.push(`  EDGES:[["${g.places[0]}","${g.places[1]}"],["${g.places[1]}","${g.places[2]}"]],`);
  const ch=g.chars.map(([id,name,role,face,badge,legend,hint])=>`    ${id}:{ name:"${esc(name)}", role:"${esc(role)}", face:"${face}", badge:"${badge}", legend:"${esc(legend)}", hint:"${esc(hint)}" }`).join(",\n");
  P.push(`  CHARACTERS:{\n${ch}\n  },`);
  const cells=[]; g.places.forEach(pl=>g.chars.forEach(c=>cells.push([pl,c[0]])));
  const tm={}; g.places.forEach(pl=>{tm[pl]={};});
  g.topics.forEach((t,idx)=>{ const [pl,inf]=cells[Math.floor(idx/2)]; (tm[pl][inf]=tm[pl][inf]||[]).push(t[0]); });
  const tmLines=g.places.map(pl=>`    ${pl}:{ ${g.chars.map(c=>`${c[0]}:["${tm[pl][c[0]][0]}","${tm[pl][c[0]][1]}"]`).join(", ")} }`).join(",\n");
  P.push(`  TOPICMAP:{\n${tmLines}\n  },`);
  const cellFor={}; g.topics.forEach((t,idx)=>{ cellFor[t[0]]=cells[Math.floor(idx/2)]; });
  const topicStubs=g.topics.map((t,i)=>{
    const [id,pioneer,concept]=t; const [pl,inf]=cellFor[id];
    const infName=g.chars.find(c=>c[0]===inf)[1]; const plName=g.where.items.find(it=>it[0]===pl)[1];
    return `    // cell: ${infName} @ ${plName}\n    ${id}:{ sci:"${esc(pioneer)}", topic:"${esc(concept)}", lede:"", no:${i+1}, profile:"",\n      frame:"", q:[] }`;
  }).join(",\n");
  P.push(`  TOPICS:{\n${topicStubs}\n  },`);
  const st=g.chars.map(c=>`    ${c[0]}:{ ${g.places.map(pl=>`${pl}:""`).join(", ")} }`).join(",\n");
  P.push(`  STORIES:{\n${st}\n  },`);
  P.push(`  story:[ "", "", "", "" ],`);
  P.push(`  endings:{ overclaimWhat:"${g.what.overclaim}", dismissalWhat:"${g.what.dismissal}",`);
  P.push(`    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },`);
  P.push(`    overclaim:{ title:"", body:["",""] },`);
  P.push(`    dismissal:{ title:"", body:["",""] },`);
  P.push(`    wrongNames:{ title:"", body:[""] } },`);
  P.push(`}};`);
  return P.join("\n");
}

// ---- write stubs (never clobber authored prose) ----
let wrote=0, skipped=0;
for (const g of games) {
  const f = path.join(__dirname, `pack_${g.id}.js`);
  if (fs.existsSync(f)) {
    try { const P=require(f).PACK; const first=Object.values(P.TOPICS)[0]; if (first && first.profile) { skipped++; continue; } } catch(e){}
  }
  fs.writeFileSync(f, starter(g)); wrote++;
}
console.log(`stubs: wrote ${wrote}, skipped ${skipped} (already authored)`);

// ---- manifest: keep existing 'passed', add the 50 as pending, day-tagged ----
const mPath = path.join(__dirname, 'batch', 'manifest.json');
let man = { games: [] };
try { man = JSON.parse(fs.readFileSync(mPath,'utf8')); } catch(e){}
const keep = (man.games||[]).filter(x => x.status === 'passed');
const keepIds = new Set(keep.map(x=>x.id));
const entries = [...keep];
for (const g of games) {
  if (keepIds.has(g.id)) continue;
  const w = g.what.items;
  entries.push({
    id: g.id, title: g.title, discipline: g.discipline, day: g._day, status: 'pending',
    mystery: {
      overclaim: w[0][1], dismissal: w[1][1], truth: w[2][1],
      guilty_who: g.who.truth, true_where: g.where.truth
    }
  });
}
const out = { _readme: man._readme || ["batch driver source of truth; see batch_driver.py"], games: entries };
fs.writeFileSync(mPath, JSON.stringify(out, null, 2));
console.log(`manifest: ${entries.length} games (${keep.length} passed + ${entries.length-keep.length} pending), day-tagged.`);
