// Loads + lightly validates Ballpark data packs (ballpark_build/pack_*.js).
function loadPacks(){
  const fs=require("fs"),path=require("path");
  const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,"manifest.json"),"utf8"));
  const packs=manifest.map(id=>require(path.join(__dirname,"pack_"+id+".js")).PACK);
  const passing=packs.filter(P=>{
    const e=[];
    ["id","title","eqs"].forEach(k=>{if(P[k]==null)e.push("missing "+k);});
    if(P.eqs&&!Array.isArray(P.eqs))e.push("eqs not array");
    if(e.length)console.log("INVALID",P&&P.id,"—",e.join("; "));
    return e.length===0;
  });
  return {packs,passing};
}
module.exports={loadPacks};
