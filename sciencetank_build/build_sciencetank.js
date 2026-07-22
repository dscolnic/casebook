// Rebuilds ../sciencetank.html from self-contained packs. Packs are the source
// of truth. Each pack bundles its 3 rounds; shared config + round order live in
// config.js. Usage: node sciencetank_build/build_sciencetank.js
const fs=require("fs"),path=require("path");
const DIR=__dirname, HTML=path.join(DIR,"..","sciencetank.html");
function span(html,decl,open,close){const i=html.indexOf(decl);if(i<0)throw new Error("no "+decl);const a=html.indexOf(open,i);let d=0,q=false,e=false,end=-1;for(let k=a;k<html.length;k++){const c=html[k];if(q){if(e)e=false;else if(c==="\\")e=true;else if(c==='"')q=false;}else{if(c==='"')q=true;else if(c===open)d++;else if(c===close){d--;if(!d){end=k+1;break;}}}}return{start:a,end};}
function build(){
  const manifest=JSON.parse(fs.readFileSync(path.join(DIR,"manifest.json"),"utf8"));
  const cfg=require(path.join(DIR,"config.js"));
  const packs=manifest.map(id=>require(path.join(DIR,"pack_"+id+".js")).PACK);
  const GAME_SETS=packs.map(p=>({id:p.id,title:p.title,words:p.words,roundIds:p.rounds.map(r=>r.id)}));
  const roundMap={}; packs.forEach(p=>p.rounds.forEach(r=>{roundMap[r.id]=r;}));
  const order=cfg.roundOrder&&cfg.roundOrder.length?cfg.roundOrder:Object.keys(roundMap);
  const roundPackages=order.map(id=>roundMap[id]).filter(Boolean);
  const GAME_DATA={gameConfig:cfg.gameConfig,roundPackages,authoringValidation:cfg.authoringValidation};
  let html=fs.readFileSync(HTML,"utf8");
  let sp=span(html,"GAME_DATA =","{","}");
  html=html.slice(0,sp.start)+JSON.stringify(GAME_DATA).replace(/<\//g,"<\\/")+html.slice(sp.end);
  sp=span(html,"GAME_SETS = [","[","]");
  html=html.slice(0,sp.start)+JSON.stringify(GAME_SETS).replace(/<\//g,"<\\/")+html.slice(sp.end);
  fs.writeFileSync(HTML,html);
  console.log("built sciencetank.html from "+packs.length+" packs, "+roundPackages.length+" rounds");
}
if(require.main===module)build();
module.exports={build};
